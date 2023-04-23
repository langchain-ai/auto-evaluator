import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Group,
  Text,
  useMantineTheme,
  Alert,
  Table,
  Button,
  Title,
  Flex,
  Stack,
  Spoiler,
  Progress,
  Card,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { Experiment, Form, QAPair, Result } from "../utils/types";
import { notifications } from "@mantine/notifications";
import { API_URL } from "../utils/variables";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Parser } from "@json2csv/plainjs";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { isEmpty, isNil, orderBy } from "lodash";

import sampleResults from "../public/testData/results.json";
import sampleTestDataset from "../public/testData/testDataset.json";
import sampleExperiments from "../public/testData/experiments.json";
import SummaryChart from "./SummaryChart";

const Demo = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [testDataset, setTestDataset] = useState<QAPair[]>([]);
  const [evalQuestionsCount, setEvalQuestionsCount] = useState(-1);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [gradingPromptStyle, setGradingPromptStyle] = useState(undefined);
  const experimentsResultsSpoilerRef = useRef<HTMLButtonElement>(null);
  const summarySpoilerRef = useRef<HTMLButtonElement>(null);
  const testDatasetSpoilerRef = useRef<HTMLButtonElement>(null);
  const [isFirstRun, setIsFirstRun] = useState(true);

  useEffect(() => {
    setResults(sampleResults);
    setTestDataset(sampleTestDataset);
    setExperiments(sampleExperiments);
  });

  const bestExperiment = useMemo(() => {
    if (isEmpty(experiments) || experiments.length === 1) {
      return null;
    }
    return orderBy(experiments, "performance", "desc")[0].id;
  }, [experiments]);

  const runExperimentButtonLabel = useMemo(() => {
    if (isEmpty(experiments)) {
      return "Run Experiment";
    }
    return "Re-run experiment";
  }, [experiments]);

  const initialProgress = {
    value: 15,
    color: "purple",
    label: "Processing Files",
  };

  const finishedProgress = {
    value: 100,
    color: "green",
    label: "Completed",
  };

  const experimentProgress = useMemo(() => {
    if (results.length === 0) {
      return [initialProgress];
    }

    const res = 15 + Math.floor((results?.length / evalQuestionsCount) * 85);

    if (res === 100) {
      return [finishedProgress];
    }
    const ret = [
      initialProgress,
      {
        value: res,
        color: "blue",
        label: "Generating Evals & Grading",
      },
    ];
    return ret;
  }, [results, evalQuestionsCount]);

  const chartData = experiments.map((experiment, index) => ({
    id: "Expt #" + (index + 1),
    data: [
      {
        x: experiment.avgAnswerScore,
        y: experiment.avgLatency,
      },
    ],
  }));

  const renderPassFail = (data: any) => {
    if (data.score === 0) {
      return "Incorrect";
    }
    if (data.score === 1) {
      return "Correct";
    }
    throw new Error(`Problem parsing ${data}`);
  };

  const submit = handleSubmit(async (data) => {
    setShouldShowProgress(true);
    setLoading(true);
    setResults([]);
    const formData = new FormData();
    data.files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("num_eval_questions", data.evalQuestionsCount.toString());
    formData.append("chunk_chars", data.chunkSize.toString());
    formData.append("overlap", data.overlap.toString());
    formData.append("split_method", data.splitMethod);
    formData.append("retriever_type", data.retriever);
    formData.append("embeddings", data.embeddingAlgorithm);
    formData.append("model_version", data.model);
    formData.append("grade_prompt", data.gradingPrompt);
    formData.append("num_neighbors", data.numNeighbors.toString());
    formData.append("test_dataset", JSON.stringify(testDataset));

    setEvalQuestionsCount(data.evalQuestionsCount);
    setGradingPromptStyle(data.gradingPrompt);

    const controller = new AbortController();

    let localResults = [];
    let rowCount = 0;

    await fetchEventSource(API_URL + "/evaluator-stream", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "text/event-stream",
      },
      openWhenHidden: true,
      signal: controller.signal,
      onmessage(ev) {
        try {
          const row: Result = JSON.parse(ev.data)?.data;
          setResults((results) => [...results, row]);
          localResults = [...localResults, row];
          rowCount += 1;
          if (rowCount > testDataset.length) {
            setTestDataset((testDataset) => [
              ...testDataset,
              {
                question: row.question,
                answer: row.answer,
              },
            ]);
          }
          if (rowCount === data.evalQuestionsCount) {
            controller.abort();
          }
        } catch (e) {
          console.warn("Error parsing data", e);
        }
      },
      onclose() {
        console.log("Connection closed by the server");
        setLoading(false);
      },
      onerror(err) {
        console.log("There was an error from server", err);
        throw new Error(err);
      },
    });
    setLoading(false);
    setIsFirstRun(false);
    const avgAnswerScore =
      localResults.reduce((acc, curr) => acc + curr.answerScore.score, 0) /
      localResults.length;
    const avgRelevancyScore =
      localResults.reduce((acc, curr) => acc + curr.retrievalScore.score, 0) /
      localResults.length;
    const avgLatency =
      localResults.reduce((acc, curr) => acc + curr.latency, 0) /
      localResults.length;
    const newExperiment: Experiment = {
      evalQuestionsCount: data.evalQuestionsCount,
      chunkSize: data.chunkSize,
      overlap: data.overlap,
      splitMethod: data.splitMethod,
      retriever: data.retriever,
      embeddingAlgorithm: data.embeddingAlgorithm,
      model: data.model,
      gradingPrompt: data.gradingPrompt,
      numNeighbors: data.numNeighbors,
      avgRelevancyScore,
      avgAnswerScore,
      avgLatency,
      performance: avgAnswerScore / avgLatency,
      id: experiments.length + 1,
    };
    setExperiments((experiments) => [...experiments, newExperiment]);
  });

  const download = useCallback(
    (data: any[], filename: string) => {
      const parser = new Parser();
      const csv = parser.parse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename + ".csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [results]
  );

  const isFastGradingPrompt = gradingPromptStyle === "Fast";

  return (
    <Stack>
      <Flex direction="row" gap="md"></Flex>
      {!!watchFiles?.length && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size (KB)</th>
              </tr>
            </thead>
            <tbody>
              {watchFiles?.map((file, id) => (
                <tr key={id}>
                  <td>{file?.name}</td>
                  <td>{(file?.size / 1000).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Flex direction="row" gap="md">
            {!loading || setIsFirstRun ? (
              <Button
                style={{ marginBottom: "18px" }}
                type="submit"
                onClick={submit}
                disabled={loading}
              >
                {runExperimentButtonLabel}
              </Button>
            ) : null}
          </Flex>
        </>
      )}
      {shouldShowProgress && (
        <Progress
          // value={percentLoaded}
          // label={percentLoaded + "%"}
          size="xl"
          radius="xl"
          sections={experimentProgress}
          color={loading ? "blue" : "green"}
        />
      )}
      {!!experiments.length && (
        <Card>
          <Spoiler
            maxHeight={0}
            showLabel="Show summary"
            hideLabel={null}
            transitionDuration={500}
            initialState={true}
            controlRef={summarySpoilerRef}
          >
            <Stack>
              <Group position="apart">
                <Title order={3}>Experiment Summary</Title>
                <Group>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="secondary"
                    onClick={() => download(experiments, "summary")}
                  >
                    Download
                  </Button>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="subtle"
                    onClick={() => {
                      if (summarySpoilerRef.current)
                        summarySpoilerRef.current.click();
                    }}
                  >
                    Hide
                  </Button>
                </Group>
              </Group>
            </Stack>
            <Table withBorder withColumnBorders striped highlightOnHover>
              <thead>
                <tr>
                  <th>Experiment #</th>
                  <th># of Eval Questions</th>
                  <th>Chunk Size</th>
                  <th>Overlap</th>
                  <th>Split Method</th>
                  <th>Retriever</th>
                  <th>Embedding Algorithm</th>
                  <th>Model</th>
                  <th>Grading Prompt Style</th>
                  <th># of Chunks Retrieved</th>
                  <th>Avg Retrieval Relevancy Score</th>
                  <th>Avg Answer Similarity Score</th>
                  <th>Avg Latency (s)</th>
                </tr>
              </thead>
              <tbody>
                {experiments?.map((result: Experiment, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result?.evalQuestionsCount}</td>
                    <td>{result?.chunkSize}</td>
                    <td>{result?.overlap}</td>
                    <td>{result?.splitMethod}</td>
                    <td>{result?.retriever}</td>
                    <td>{result?.embeddingAlgorithm}</td>
                    <td>{result?.model}</td>
                    <td>{result?.gradingPrompt}</td>
                    <td>{result?.numNeighbors}</td>
                    <td>{result?.avgRelevancyScore}</td>
                    <td>{result?.avgAnswerScore}</td>
                    <td>{result?.avgLatency.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div style={{ height: 500 }}>
              <SummaryChart chartData={chartData} />
            </div>
            <br />
            {!isNil(bestExperiment) && (
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Insight"
                color="blue"
              >
                The experiment that performed the best was Experiment #
                {bestExperiment} due to combination of accuracy and latency.
              </Alert>
            )}
          </Spoiler>
        </Card>
      )}
      {!isEmpty(results) ? (
        <Card>
          <Spoiler
            maxHeight={0}
            showLabel="Show results"
            hideLabel={null}
            transitionDuration={500}
            initialState={true}
            controlRef={experimentsResultsSpoilerRef}
          >
            <Stack>
              <Group position="apart">
                <Title order={3}>Experiment Results</Title>
                <br />
                <br />
                <Group>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="subtle"
                    onClick={() => download(results, "results")}
                  >
                    Download
                  </Button>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="subtle"
                    onClick={() => {
                      if (experimentsResultsSpoilerRef.current)
                        experimentsResultsSpoilerRef.current.click();
                    }}
                  >
                    Hide
                  </Button>
                </Group>
              </Group>
            </Stack>
            <Table withBorder withColumnBorders striped highlightOnHover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Expected Answer</th>
                  <th>Observed Answer</th>
                  <th>Retrieval Relevancy Score</th>
                  <th>Answer Similarity Score</th>
                  <th>Latency (s)</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((result: Result, index: number) => (
                  <tr key={index}>
                    <td>{result?.question}</td>
                    <td>{result?.answer}</td>
                    <td>{result?.result}</td>
                    <td>
                      {isFastGradingPrompt ? (
                        renderPassFail(result.retrievalScore)
                      ) : (
                        <Spoiler
                          maxHeight={150}
                          hideLabel={
                            <Text weight="bold" color="blue">
                              Show less
                            </Text>
                          }
                          showLabel={
                            <Text weight="bold" color="blue">
                              Show more
                            </Text>
                          }
                        >
                          {result?.retrievalScore.justification}
                        </Spoiler>
                      )}
                    </td>
                    <td>
                      {isFastGradingPrompt ? (
                        renderPassFail(result?.answerScore)
                      ) : (
                        <Spoiler
                          maxHeight={150}
                          hideLabel={
                            <Text weight="bold" color="blue">
                              Show less
                            </Text>
                          }
                          showLabel={
                            <Text weight="bold" color="blue">
                              Show more
                            </Text>
                          }
                        >
                          {result?.answerScore.justification}
                        </Spoiler>
                      )}
                    </td>
                    <td>{result?.latency?.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Spoiler>
        </Card>
      ) : null}
      {!!testDataset.length && (
        <Card>
          <Spoiler
            maxHeight={0}
            showLabel="Show available test dataset"
            hideLabel={null}
            transitionDuration={500}
            controlRef={testDatasetSpoilerRef}
          >
            <Stack>
              <Group position="apart">
                <Title order={3}>Test Dataset</Title>
                <Group>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="secondary"
                    onClick={() => download(testDataset, "test_dataset")}
                  >
                    Download
                  </Button>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="subtle"
                    onClick={() => {
                      setTestDataset([]);
                      notifications.show({
                        title: "Success",
                        message: "The test dataset has been cleared.",
                        color: "green",
                      });
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    style={{ marginBottom: "18px" }}
                    type="button"
                    variant="subtle"
                    onClick={() => {
                      if (testDatasetSpoilerRef.current)
                        testDatasetSpoilerRef.current.click();
                    }}
                  >
                    Hide
                  </Button>
                </Group>
              </Group>
            </Stack>
            <Table withBorder withColumnBorders striped highlightOnHover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                {testDataset?.map((result: QAPair, index: number) => (
                  <tr key={index}>
                    <td>{result?.question}</td>
                    <td>{result?.answer}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Spoiler>
        </Card>
      )}
    </Stack>
  );
};
export default Demo;
