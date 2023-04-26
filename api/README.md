# `auto-evaluator-api`

This API includes much of the functionality of the [auto-evaluator Streamlit app](https://github.com/PineappleExpress808/auto-evaluator).

And it is the back-end for [the hosted app](https://autoevaluator.langchain.com/).

### `Test locally` - 

Set API keys: 
```
export OPENAI_API_KEY=
export ANTHROPIC_API_KEY=
```

Start local server:
```
uvicorn evaluator_app:app
```

`Disclaimer: You will not be able to use all the models unless you have the corresponding API key (e.g., Anthropic).`

Test:
```
curl -X POST -F "files=@docs/karpathy-lex-pod/karpathy-pod.txt" -F "num_eval_questions=1" -F "chunk_chars=1000" -F "overlap=100" -F "split_method=RecursiveTextSplitter" -F "retriever_type=similarity-search" -F "embeddings=OpenAI" -F "model_version=gpt-3.5-turbo" -F "grade_prompt=Fast" -F "num_neighbors=3" http://localhost:8000/evaluator-stream
```

### `Test deployed API -`  

This API is deployed to [Railway](https://railway.app/).
 
```
curl -X POST -F "files=@docs/karpathy-lex-pod/karpathy-pod.txt" -F "num_eval_questions=1" -F "chunk_chars=1000" -F "overlap=100" -F "split_method=RecursiveTextSplitter" -F "retriever_type=similarity-search" -F "embeddings=OpenAI" -F "model_version=gpt-3.5-turbo" -F "grade_prompt=Fast" -F "num_neighbors=3" https://auto-evaluator-production.up.railway.app/evaluator-stream

```