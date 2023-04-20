# Evaluator

Use this app to evaluate Question Answering systems and build confidence in your application:

- Generates a test dataset of Q and A pairs
- Builds a QA chain based on your inputs
- Grades the test dataset against the QA chain

## Contributing

Run the frontend from `nextjs` folder:
`yarn dev`

Run the backend from `api` folder:
`uvicorn evaluator_app:app`

## Deployment

Doppler auth:

```
doppler login // scope to dir
doppler config // select evaluator-ui project, environment dev
```
