# `Auto-evaluator` :brain: :memo:

`Context`

[Question-Answering](https://python.langchain.com/en/latest/use_cases/question_answering.html) over documents is a popular use-case for LLMs. LangChain  makes it easy to assemble LLM components (e.g., models and retrievers) into chains that support question answering: input documents are split into chunks and stored in a retriver. Relevant chunks are retrived given a user `question`. These chunks are then passed to an LLM for synthesis into an `answer`.

![image](https://user-images.githubusercontent.com/122662504/233764113-f0f55ffd-49cc-4b61-b371-1afb1c644a1f.png)
 
 `Challenge`
  
It is not always obvious to determine how to grade these systems and, as a result, how to determine the parameters (e.g., chunk size) or components (e.g., model choice, retriver choice) that yield the best QA performance. This app aims to address these limitations.

`Usage`

Inputs:

* `Documents`: Input a set of documents that you want to ask questions about.
* `(Optional) Test set`: Input a test set of question-answer pairs that you want to evaluate on the input documents.

![image](https://user-images.githubusercontent.com/122662504/233764159-ba75a90d-a76e-43ea-8484-05c864f798ef.png)

`Building the document retriver`:

* The app will build a [retriver](https://blog.langchain.dev/retrieval/) on the input documents. 
* This is an abstraction that accepts a question and returns a set of relevant documents. 
* The retriver can be selected by the user, e.g., embedding similarity search over the vector database, SVM, TF-IDF, or [Llama-Index](https://gpt-index.readthedocs.io/en/latest/).

![image](https://user-images.githubusercontent.com/122662504/233764422-b149f05f-2a3e-4b02-806d-fa33e7d8bcaa.png)

`Test set generation`:

* The app will auto-generate a test set of question-answer pair on the doc(s). 
* To do this, it uses the Langchain `QAGenerationChain`. 
* You can see the promp used for this chain [here](https://github.com/hwchase17/langchain/blob/master/langchain/chains/qa_generation/prompt.py). 
* Recent [work](https://arxiv.org/abs/2212.09251) on model-written evals from research organization like Anthropic offer opportunity for improvement. 

![image](https://user-images.githubusercontent.com/122662504/233764320-ea47a992-8523-4207-945a-2ae51876a78e.png)

`Model-graded evaluation`: 

* OpenAI and others [have shown](https://github.com/openai/evals/blob/main/evals/registry/modelgraded/closedqa.yaml) that model-graded evaluation is an effective way to evaluate models.
* We use two different evals: 
(1) we evaluate the relevance of the retrived documents relative to the question 
(2) we evaluate the similarity of the LLM generated answer relative to ground truth answer

* The prompts for both can be seen [here](https://github.com/dankolesnikov/evaluator-app/blob/main/api/text_utils.py)
* Users can select which grading promp to use: 
(1) the `GRADE_ANSWER_PROMPT_FAST` and `GRADE_DOCS_PROMPT_FAST` do not ask the model to explain itself
(2) the other prompts explicity ask the LLM grader to explain itself, resulting in higher latency 

Experimental results are summarized for the user:

![image](https://user-images.githubusercontent.com/122662504/233764970-be7f43ac-9df1-43d4-97e1-b089c69e7dc3.png)

## Contributing

Run the frontend from `nextjs` folder:
`yarn dev`

Run the backend from `api` folder:
`uvicorn evaluator_app:app`

Test the `api` locally:
```
curl -X POST -F "files=@Docs/0333_text.txt" -F "num_eval_questions=1" -F "chunk_chars=1000" -F "overlap=100" -F "split_method=RecursiveTextSplitter" -F "retriver_type=similarity-search" -F "embeddings=OpenAI" -F "model_version=gpt-3.5-turbo" -F "grade_prompt=Fast" -F "num_neighbors=3" http://localhost:8000/evaluator-stream
 ```

## Deployment

Doppler auth:

```
doppler login // scope to dir
doppler config // select evaluator-ui project, environment dev
```
