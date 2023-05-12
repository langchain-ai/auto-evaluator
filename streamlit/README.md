# `VectorDB Auto-evaluator` :brain: :memo:

This is a lightweight evaluation tool connected to a Pinecone vectorDB that uses Langchain to test different question answering configurations:

- Pass in a test set of question/answer pairs: see `eval_sets/lex-pod-eval.json`

- Specify a retrieval method, the number of chunks to retrieve, VectorDB embeddings, a model for answer synthesis, and the model-graded evaluation prompt

- The app will use an LLM (`GPT-4`) to score the response relative to the correct `answer`

**Run as Streamlit app**

`pip install -r requirements.txt`

`streamlit run auto-evaluator.py`

**Inputs**
 
`retriever_type` - Chunk retrieval method

`num_neighbors` - Neighbors for retrieval 

`embeddings` - Embeddings in your Pinecone vectorDB

`model` - LLM for summarization of retrieved chunks 

`grade_prompt` - Prompt choice for model self-grading

**Retrievers**

`Pinecone w/ metadata filtering`

* Hard-code the metadata fileter you want to use: `metadata_filter = {'id':"0252"}`

`Pinecone w/ self-querying`

* Specify the `metadata_field_info` (see: `self_query_retriever_lex.py`) and the `SelfQueryRetriever` will try to extract metadata filters from the question

`Kor filtering`

* Specify the `schema` for Kor (see: `kor_retriever_lex.py`) and define a `kor_retriever` that will try to extract metadata filters from the question

**Blog**

https://rlancemartin.notion.site/Auto-Evaluation-of-Metadata-Filtering-18502448c85240828f33716740f9574b

**UI**

**Disclaimer**

```You will need an OpenAI API key with access to `GPT-4` for the default grading, but this can be modified in grade_model_retrieval and grade_model_answer if needed.```
