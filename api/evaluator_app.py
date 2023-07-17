"""
This is an API to support the LLM QA chain auto-evaluator. 
"""

import io
import itertools
import json
import logging
import os
import random
import time
from json import JSONDecodeError
from typing import Dict, List
from uuid import uuid4

import openai
import pandas as pd
import pinecone
import pypdf
import sentry_sdk
from dotenv import load_dotenv

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from langchain.chains import QAGenerationChain, RetrievalQA
from langchain.chains.query_constructor.ir import Comparator, Comparison
from langchain.chains.query_constructor.schema import AttributeInfo
from langchain.chains.question_answering import load_qa_chain
from langchain.chat_models import AzureChatOpenAI
from langchain.embeddings import (
    LlamaCppEmbeddings,
    MosaicMLInstructorEmbeddings)
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.evaluation.qa import QAEvalChain
from langchain.llms import Anthropic, MosaicML, Replicate
from langchain.retrievers import SVMRetriever, TFIDFRetriever
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain.schema import Document
from langchain.text_splitter import (
    CharacterTextSplitter,
    RecursiveCharacterTextSplitter)
from langchain.vectorstores import Pinecone
from sse_starlette.sse import EventSourceResponse

from text_utils import (GRADE_ANSWER_PROMPT, GRADE_ANSWER_PROMPT_BIAS_CHECK,
                        GRADE_ANSWER_PROMPT_FAST, GRADE_ANSWER_PROMPT_OPENAI,
                        GRADE_DOCS_PROMPT, GRADE_DOCS_PROMPT_FAST,
                        QA_CHAIN_PROMPT, QA_CHAIN_PROMPT_LLAMA)


def generate_eval(text, chunk, logger):
    """
    Generate question answer pair from input text 
    @param text: text to generate eval set from
    @param chunk: chunk size to draw question from text
    @param logger: logger
    @return: dict with keys "question" and "answer"
    """

    logger.info("`Generating eval QA pair ...`")
    # Generate random starting index in the doc to draw question from
    num_of_chars = len(text)
    starting_index = random.randint(0, num_of_chars-chunk)
    sub_sequence = text[starting_index:starting_index+chunk]
    # Set up QAGenerationChain chain using GPT 3.5 as default
    chain = QAGenerationChain.from_llm(
        AzureChatOpenAI(
            openai_api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
            openai_api_base=os.environ.get("AZURE_OPENAI_API_BASE"),
            openai_api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
            temperature=0,
            deployment_name="gpt-35-turbo"
        )
    )
    eval_set = []
    # Catch any QA generation errors and re-try until QA pair is generated
    awaiting_answer = True
    while awaiting_answer:
        try:
            qa_pair = chain.run(sub_sequence)
            eval_set.append(qa_pair)
            awaiting_answer = False
        except JSONDecodeError:
            logger.error("Error on question")
            starting_index = random.randint(0, num_of_chars-chunk)
            sub_sequence = text[starting_index:starting_index+chunk]
    return list(itertools.chain.from_iterable(eval_set))


def split_texts(text, chunk_size, overlap, split_method, logger):
    """
    Split text into chunks
    @param text: text to split
    @param chunk_size: characters per split
    @param overlap: character overlap between splits
    @param split_method: method used to split text
    @param logger: logger
    @return: list of str splits
    """

    logger.info("`Splitting doc ...`")
    if split_method == "RecursiveTextSplitter":
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=overlap
    )
    elif split_method == "CharacterTextSplitter":
        text_splitter = CharacterTextSplitter(
            separator=" ",
            chunk_size=chunk_size,
            chunk_overlap=overlap
    )
    return text_splitter.split_text(text)

def make_llm(model):
    """
    Make LLM
    @param model: LLM to use
    @return: LLM
    """

    if model == "gpt-3.5-turbo":
        llm = AzureChatOpenAI(
            openai_api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
            openai_api_base=os.environ.get("AZURE_OPENAI_API_BASE"),
            openai_api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
            deployment_name="gpt-35-turbo",
            temperature=0,)
    if model == "gpt-4":
        pass
    elif model == "anthropic":
        llm = Anthropic(temperature=0)
    elif model == "Anthropic-100k":
        llm = Anthropic(model="claude-v1-100k",temperature=0)
    elif model == "vicuna-13b":
        llm = Replicate(model="replicate/vicuna-13b:e6d469c2b11008bb0e446c3e9629232f9674581224536851272c54871f84076e",
                input={"temperature": 0.75, "max_length": 3000, "top_p":0.25})
    elif model == "mosaic":
        llm = MosaicML(inject_instruction_format=True,model_kwargs={'do_sample': False, 'max_length': 3000})
    return llm

def insert_documents(splits, embedding, vector_store, logger):
    """
    Insert documents into vector store
    @param splits: list of extracted strings
    @param embedding: embedding algorithm
    @param vector_store: vector store
    @param logger: logger
    @return: None
    """

    logger.info("`Inserting documents into vectorstore ...`")
    if vector_store == "pinecone":
        pinecone.init(
            api_key=os.environ.get("PINECONE_API_KEY"),
            environment=os.environ.get("PINECONE_ENVIRONMENT"),
        )

        index_name = os.environ.get("PINECONE_INDEX")
        index = pinecone.Index(index_name)

        ids = [str(uuid4()) for _ in range(len(splits))]

        document_embeddings = embedding.embed_documents(splits)
        source_id = f"auto_evaluator_{random.randint(0, 1000)}"
        metadata = [
            {
                "id": id, 
                "text": text, 
                "source_id": source_id,
                "author": "auto_evaluator",
            } for id, text in zip(ids, splits)
        ]
        index.upsert(vectors=zip(ids, document_embeddings, metadata))
        return source_id

def make_embeddings(embeddings, logger):
    """
    Make embeddings
    @param embedding_type: embedding type
    @param logger: logger
    @return: embeddings
    """
    
    logger.info("`Making embeddings ...`")
    if embeddings == "OpenAI":
        openai_api_key = os.environ.get("AZURE_OPENAI_API_KEY")
        openai_api_base = os.environ.get("AZURE_OPENAI_API_BASE")

        embd = OpenAIEmbeddings(
            deployment="text-embedding-ada-002",
            openai_api_key=openai_api_key,
            openai_api_type="azure",
            openai_api_base=openai_api_base,
            openai_api_version="2023-05-15",
            chunk_size=1,
        )
    # Note: Still WIP (can't be selected by user yet)
    elif embeddings == "LlamaCppEmbeddings":
        embd = LlamaCppEmbeddings(model="replicate/vicuna-13b:e6d469c2b11008bb0e446c3e9629232f9674581224536851272c54871f84076e")
    # Note: Test
    elif embeddings == "Mosaic":
        embd = MosaicMLInstructorEmbeddings(query_instruction="Represent the query for retrieval: ")
    
    return embd

def generate_similarity_search_vectorstore(embeddings, eval_qa_pair):
    """
    Generate similarity search vectorstore
    @param embeddings: embeddings
    @param eval_qa_pair: evaluation question-answer pair
    @return: vectorstore
    """
    index_name = os.environ.get("PINECONE_INDEX")
    index = pinecone.Index(index_name)

    vectorstore = Pinecone(index, embeddings.embed_query, text_key='text')
    retriever = vectorstore.as_retriever()
    
    docs = retriever.get_relevant_documents(
        query=eval_qa_pair["question"],
        filter=Comparison(
            comparator=Comparator.EQ, 
            attribute="author", 
            value="auto_evaluator"
        )
    )
    return Pinecone.from_documents(docs, embeddings, index_name=index_name)

def make_retriever(splits, retriever_type, embeddings, llm, eval_qa_pair, logger):
    """
    Make document retriever
    @param splits: list of str splits
    @param retriever_type: retriever type
    @param embedding_type: embedding type
    @param num_neighbors: number of neighbors for retrieval
    @param _llm: model
    @param logger: logger
    @return: retriever
    """

    logger.info("`Making retriever ...`")
    if retriever_type == "similarity-search":
        docsearch = generate_similarity_search_vectorstore(embeddings, eval_qa_pair)
        retriever = docsearch.as_retriever(search_type="similarity")
    elif retriever_type == "SVM":
        retriever = SVMRetriever.from_texts(splits, embeddings)
    elif retriever_type == "TF-IDF":
        retriever = TFIDFRetriever.from_texts(splits)
    elif retriever_type == "Anthropic-100k":
        retriever = llm
    return retriever

def make_chain(llm, retriever, retriever_type, model):

    """
    Make retrieval chain
    @param llm: model
    @param retriever: retriever
    @param retriever_type: retriever type
    @return: QA chain
    """

    # Note: Better answer quality using default prompt 
    # chain_type_kwargs = {"prompt": QA_CHAIN_PROMPT_LLAMA}
    chain_type_kwargs = {"prompt": QA_CHAIN_PROMPT}
    return (
        load_qa_chain(llm, chain_type="stuff", prompt=QA_CHAIN_PROMPT)
        if retriever_type == "Anthropic-100k"
        else RetrievalQA.from_chain_type(
            llm,
            chain_type="stuff",
            retriever=retriever,
            chain_type_kwargs=chain_type_kwargs,
            input_key="question",
        )
    )


def grade_model_answer(predicted_dataset, predictions, grade_answer_prompt, logger):
    """
    Grades the answer based on ground truth and model predictions.
    @param predicted_dataset: A list of dictionaries containing ground truth questions and answers.
    @param predictions: A list of dictionaries containing model predictions for the questions.
    @param grade_answer_prompt: The prompt level for the grading. Either "Fast" or "Full".
    @param logger: logger
    @return: A list of scores for the distilled answers.
    """

    logger.info("`Grading model answer ...`")
    if grade_answer_prompt == "Descriptive w/ bias check":
        prompt = GRADE_ANSWER_PROMPT_BIAS_CHECK
    elif grade_answer_prompt == "Fast":
        prompt = GRADE_ANSWER_PROMPT_FAST
    elif grade_answer_prompt == "OpenAI grading prompt":
        prompt = GRADE_ANSWER_PROMPT_OPENAI
    else:
        prompt = GRADE_ANSWER_PROMPT

    # Note: GPT-4 grader is advised by OAI 
    eval_chain = QAEvalChain.from_llm(
        llm=AzureChatOpenAI(
            deployment_name="gpt-4",
            openai_api_version="2023-03-15-preview",
            temperature=0,
            openai_api_key=os.environ.get("GPT4_OPENAI_API_KEY"),
            openai_api_base=os.environ.get("GPT4_OPENAI_API_BASE"),
        ),
        prompt=prompt
    )
    return eval_chain.evaluate(
        predicted_dataset,
        predictions,
        question_key="question",
        prediction_key="result",
    )


def grade_model_retrieval(gt_dataset, predictions, grade_docs_prompt, logger):
    """
    Grades the relevance of retrieved documents based on ground truth and model predictions.
    @param gt_dataset: list of dictionaries containing ground truth questions and answers.
    @param predictions: list of dictionaries containing model predictions for the questions
    @param grade_docs_prompt: prompt level for the grading.
    @return: list of scores for the retrieved documents.
    """

    logger.info("`Grading relevance of retrieved docs ...`")
    if grade_docs_prompt == "Fast":
        prompt = GRADE_DOCS_PROMPT_FAST
    else:
        prompt = GRADE_DOCS_PROMPT

    # Note: GPT-4 grader is advised by OAI
    eval_chain = QAEvalChain.from_llm(
        llm=AzureChatOpenAI(
            deployment_name="gpt-4",
            openai_api_version="2023-03-15-preview",
            temperature=0,
            openai_api_key=os.environ.get("GPT4_OPENAI_API_KEY"),
            openai_api_base=os.environ.get("GPT4_OPENAI_API_BASE"),
        ),
        prompt=prompt
    )
    return eval_chain.evaluate(
        gt_dataset,
        predictions,
        question_key="question",
        prediction_key="result",
    )


def run_eval(chain, retriever, eval_qa_pair, grade_prompt, retriever_type, num_neighbors, text, logger):
    """
    Runs evaluation on a model's performance on a given evaluation dataset.
    @param chain: Model chain used for answering questions
    @param retriever:  Document retriever used for retrieving relevant documents
    @param eval_set: List of dictionaries containing questions and corresponding ground truth answers
    @param grade_prompt: String prompt used for grading model's performance
    @param retriever_type: String specifying the type of retriever used
    @param num_neighbors: Number of neighbors to retrieve using the retriever
    @param text: full document text
    @return: A tuple of four items:
    - answers_grade: A dictionary containing scores for the model's answers.
    - retrieval_grade: A dictionary containing scores for the model's document retrieval.
    - latencies_list: A list of latencies in seconds for each question answered.
    - predictions_list: A list of dictionaries containing the model's predicted answers and relevant documents for each question.
    """

    logger.info("`Running eval ...`")
    predictions = []

    # Get answer and log latency
    start_time = time.time()
    if retriever_type == "Anthropic-100k":
        docs=[Document(page_content=text)]
        answer = chain.run(input_documents=docs, question=eval_qa_pair["question"])
        predictions.append(
            {
                "question": eval_qa_pair["question"], 
                "answer": eval_qa_pair["answer"], 
                "result": answer
            }
        )
    else:
        predictions.append(chain(eval_qa_pair))
    gt_dataset = [eval_qa_pair]

    end_time = time.time()
    elapsed_time = end_time - start_time
    latency = [elapsed_time]

    # Extract text from retrieved docs
    retrieved_doc_text = ""
    if retriever_type == "Anthropic-100k":
        retrieved_doc_text = f'Doc {str(eval_qa_pair["answer"])}: '
    else:
        docs = retriever.get_relevant_documents(
            query=eval_qa_pair["question"],
            filter=Comparison(
                comparator=Comparator.EQ, 
                attribute="author", 
                value="auto_evaluator"
            )
        )
        for i, doc in enumerate(docs):
            retrieved_doc_text += ((f"Doc {str(i + 1)}: " + doc.page_content) + " ")

    # Log
    retrieved = {
        "question": eval_qa_pair["question"],
        "answer": eval_qa_pair["answer"], "result": retrieved_doc_text
    }
    retrieved_docs = [retrieved]
    # Grade
    graded_answers = grade_model_answer(
        gt_dataset, predictions, grade_prompt, logger)
    graded_retrieval = grade_model_retrieval(
        gt_dataset, retrieved_docs, grade_prompt, logger)
    return graded_answers, graded_retrieval, latency, predictions

def delete_documents(id, retriever, logger):
    """
    Deletes all documents from the retriever.
    @param retriever: Document retriever used for retrieving relevant documents
    @return: None
    """
    logger.info("`Deleting documents ...`")
    
    if retriever == 'pinecone':
        index_name = os.environ.get("PINECONE_INDEX")
        index = pinecone.Index(index_name) 

        index.delete(filter={
            "author":"auto_evaluator",
            "source_id": id
        })

load_dotenv()

if os.environ.get("ENVIRONMENT") != "development":
    sentry_sdk.init(
    dsn="https://065aa152c4de4e14af9f9e7335c8eae4@o4505106202820608.ingest.sentry.io/4505106207735808",
    traces_sample_rate=1.0,
    )

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "https://evaluator-ui.vercel.app/"
    "https://evaluator-ui.vercel.app"
    "evaluator-ui.vercel.app/"
    "evaluator-ui.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Auto Evaluator!"}


def run_evaluator(
    files,
    num_eval_questions,
    chunk_chars,
    overlap,
    split_method,
    retriever_type,
    embeddings,
    model_version,
    grade_prompt,
    num_neighbors,
    test_dataset
):

    # Set up logging
    logging.config.fileConfig('logging.conf', disable_existing_loggers=False)
    logger = logging.getLogger(__name__)

    # Read content of files
    texts = []
    fnames = []
    for file in files:
        logger.info(f"Reading file: {file.filename}")
        contents = file.file.read()
        # PDF file
        if file.content_type == 'application/pdf':
            logger.info(f"File {file.filename} is a PDF")
            pdf_reader = pypdf.PdfReader(io.BytesIO(contents))
            text = "".join(page.extract_text() for page in pdf_reader.pages)
            texts.append(text)
            fnames.append(file.filename)
        elif file.content_type == 'text/plain':
            logger.info(f"File {file.filename} is a TXT")
            texts.append(contents.decode())
            fnames.append(file.filename)
        else:
            logger.warning(f"Unsupported file type for file: {file.filename}")
    text = " ".join(texts)

    if retriever_type == "Anthropic-100k":
        splits = ""
        model_version = "Anthropic-100k"
    else:
        logger.info("Splitting texts")
        splits = split_texts(text, chunk_chars, overlap, split_method, logger)

    logger.info("Make LLM")
    llm = make_llm(model_version)

    logger.info("Make Embeddings")
    emb=make_embeddings(embeddings, logger)

    if retriever_type == "similarity-search":
        source_id = insert_documents(splits, emb, 'pinecone', logger)

    for i in range(num_eval_questions):

        # Generate one question
        if i < len(test_dataset):
            eval_pair = test_dataset[i]
        else:
            eval_pair = generate_eval(text, 3000, logger)
            if len(eval_pair) == 0:
                # Error in eval generation
                continue
            else:
                # This returns a list, so we unpack to dict
                eval_pair = eval_pair[0]

        logger.info("Make retriever")
        retriever = make_retriever(
            splits, retriever_type, emb, llm, eval_pair, logger)

        logger.info("Make chain")
        qa_chain = make_chain(llm, retriever, retriever_type, model_version)

        # Run eval
        graded_answers, graded_retrieval, latency, predictions = run_eval(
            qa_chain, retriever, eval_pair, grade_prompt, retriever_type, num_neighbors, text, logger)

        # Assemble output
        d = pd.DataFrame(predictions)
        d['answerScore'] = [g['results'] for g in graded_answers]
        d['retrievalScore'] = [g['results'] for g in graded_retrieval]
        d['latency'] = latency

        # Summary statistics
        d['answerScore'] = [
            {
                'score': 1 if "Incorrect" not in text else 0,
                'justification': text
            } for text in d['answerScore']
        ]
        d['retrievalScore'] = [
            {
                'score': 1 if "Incorrect" not in text else 0,
                'justification': text
            } 
            for text in d['retrievalScore']
        ]

        # Convert dataframe to dict
        d_dict = d.to_dict('records')
        if len(d_dict) == 1:
            yield json.dumps({"data":  d_dict[0]})
        else:
            logger.warn(
                "A QA pair was not evaluated correctly. Skipping this pair.")
        
        # Delete the document if it was inserted
        if retriever_type == "similarity-search":
            delete_documents(source_id, 'pinecone', logger)


@app.post("/evaluator-stream")
async def create_response(
    files: List[UploadFile] = File(...),
    num_eval_questions: int = Form(5),
    chunk_chars: int = Form(1000),
    overlap: int = Form(100),
    split_method: str = Form("RecursiveTextSplitter"),
    retriever_type: str = Form("similarity-search"),
    embeddings: str = Form("OpenAI"),
    model_version: str = Form("gpt-3.5-turbo"),
    grade_prompt: str = Form("Fast"),
    num_neighbors: int = Form(3),
    test_dataset: str = Form("[]"),
):
    test_dataset = json.loads(test_dataset)
    return EventSourceResponse(
        run_evaluator(
            files, num_eval_questions, chunk_chars, overlap, 
            split_method, retriever_type, embeddings, 
            model_version, grade_prompt, num_neighbors, test_dataset
        ), 
        headers={
            "Content-Type": "text/event-stream",
            "Connection": "keep-alive",
            "Cache-Control": "no-cache"
        }
    )
