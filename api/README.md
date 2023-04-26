# `auto-evaluator-api`

This is an API that mirrors functionality of the auto-evaluator Streamlit app:

https://github.com/PineappleExpress808/auto-evaluator

It will support the UI (https://evaluator-ui.vercel.app/), which we plan to host.

Start local server:

```
uvicorn evaluator_app:app
```

Test locally:

Cmd -

```
curl -X POST -F "files=@Docs/0333_text.txt" -F "num_eval_questions=1" -F "chunk_chars=1000" -F "overlap=100" -F "split_method=RecursiveTextSplitter" -F "retriever_type=similarity-search" -F "embeddings=OpenAI" -F "model_version=gpt-3.5-turbo" -F "grade_prompt=Fast" -F "num_neighbors=3" http://localhost:8000/evaluator-stream
```

Out -

```
data: {"data": {"loadingState": "Done", "data": {"qaTable": [{"question": "According to the text, what is the thought experiment about mortality supposed to tell humans?", "answer": "That becoming immortal may lead to deep unhappiness", "result": "The thought experiment suggests that if humans become immortal, they will become deeply unhappy. The purpose of this experiment is to make humans aware that they don't have to die, but they may not like the consequences of immortality. The AGI system is trying to empathize with humans and provide them with practical information.", "answer score": "Correct", "docs score": "Context is relevant: True.", "latency": 4.270477056503296, "answer correct": "TRUE", "docs relevant": "TRUE"}]}}}
```

Test `Llama-Index` input locally:

Cmd -

```
curl -X POST -F "files=@Docs/0333_text.txt" -F "num_eval_questions=1" -F "chunk_chars=1000" -F "overlap=100" -F "split_method=RecursiveTextSplitter" -F "retriever_type=Llama-Index" -F "embeddings=OpenAI" -F "model_version=gpt-3.5-turbo" -F "grade_prompt=Fast" -F "num_neighbors=3" http://localhost:8000/evaluator-stream
```

Out -

```
data: {"data": {"loadingState": "Done", "data": {"qaTable": [{"question": "What is the author's main area of interest in the story?", "answer": "As an artificial intelligence researcher, the author is most interested in the emergence of human-level intelligence and whether it was a rare event or a continuation of a natural algorithm.", "result": "The context is not useful in refining the original answer as it does not provide any information about the author's main area of interest in the story. Therefore, the original answer still stands.", "answer score": "Incorrect", "docs score": "Context is relevant: True.", "latency": 10.400768995285034, "answer correct": "FALSE", "docs relevant": "TRUE"}]}}}
```

Should be deployed (to Railway) from here.
