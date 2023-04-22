# `Auto-evaluator` :brain: :memo:

`Context`

[Question-Answering](https://python.langchain.com/en/latest/use_cases/question_answering.html) over documents is a popular use-case for LLMs. LLM ops platforms, such as LangChain, make it easy to assemble LLM components (e.g., models, document retrievers, data loaders) into chains that support question answering. 

These workflow involove a number of parameters and stages. In particular, input documents are split into chunks (given a split size and overlap), embedded, and stored in a retriver. Relevant chunks are retrived given a user `question`. These chunks are passed to an LLM for synthesis into an `answer`.
 
But it is often not always obvious to determine how to grade these systems and, as a result, how to determine the parameters (e.g., chunk size) or components (e.g., model choice, retriver choice) that yield the best QA performance. This app aims to address these limitations, making it easy to evaluate QA chain.

`Usage`

Inputs:
* `Documents`: Input a set of documents that you want to ask questions over.
* `(Optional) Test set`: Input a test set of question-answer pairs that you want to evaluate.

`Stages`

The app performs several steps:

* `Test set generation`: The app will auto-generate a test set of question-answer pair on the doc(s). To do this, it uses the Langchain `QAGenerationChain`. You can see the promp used for this chain [here](https://github.com/hwchase17/langchain/blob/master/langchain/chains/qa_generation/prompt.py). Recent [work](https://arxiv.org/abs/2212.09251) on model-written evals from research organization like Anthropic presents opportunity for improvement. 

* `Building a document retriver`: The app will build a [retriver](https://blog.langchain.dev/retrieval/). This is simply an abstraction that accepts a question and returns a set of relevant documents. Under the hood, it uses a few different possible mechanisms, such as embedding similarity search over the vector database, SVM, TF-IDF, [Llama-Index](https://gpt-index.readthedocs.io/en/latest/), etc. The user can select the desired retriver method as well as document indexing parameters (e.g., split size, overlap, etc).The documents returned by the retriver are fed to the LLM for final answer generation.

* `Model-graded evaluation`: OpenAI and others [have shown](https://github.com/openai/evals/blob/main/evals/registry/modelgraded/closedqa.yaml) that model-graded evaluation is an effective way to evaluate models. We use two different evals: (1) we evaluate the relevance of the retrived documents relative to the question and (2) we evaluate the similarity of the LLM generated answer relative to ground truth answer. 

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