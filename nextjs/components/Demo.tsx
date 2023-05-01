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
import { API_URL, IS_DEV } from "../utils/variables";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Parser } from "@json2csv/plainjs";
import { isEmpty, isNil, orderBy } from "lodash";
import sampleResults from "../public/testData/results.json";
import sampleTestDataset from "../public/testData/testDataset.json";
import sampleExperiments from "../public/testData/experiments.json";
import SummaryChart from "./SummaryChart";
import ExperimentSummaryTable from "./ExperimentSummaryTable";
import FilesTable from "./tables/FilesTable";
import ExperimentResultTable from "./tables/ExperimentResultTable";
import sampleText from "../public/testData/karpathy-pod.json";
import LogRocket from "logrocket";

const Demo = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [testDataset, setTestDataset] = useState<QAPair[]>([]);
  const [evalQuestionsCount, setEvalQuestionsCount] = useState(5);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [gradingPromptStyle, setGradingPromptStyle] = useState(undefined);
  const experimentsResultsSpoilerRef = useRef<HTMLButtonElement>(null);
  const summarySpoilerRef = useRef<HTMLButtonElement>(null);
  const testDatasetSpoilerRef = useRef<HTMLButtonElement>(null);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const alertStyle = { backgroundColor: `rgba(193,194,197,0.38)` };
  useEffect(() => {
    setValue("files", [
      new File(
        [new Blob([sampleText.text], { type: "text/plain" })],
        "karpathy-pod.txt",
        {
          type: "text/plain",
        }
      ),
    ]);
    setResults(sampleResults);
    setTestDataset(sampleTestDataset);
    setExperiments(sampleExperiments);
  }, []);

  const runExperimentButtonLabel =
    experiments.length > 1 ? "Re-run experiment" : "Run Experiment";

  const initialProgress = {
    value: 15,
    color: "purple",
    label: "Building Index ...",
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

  const chartData = experiments.map((experiment) => ({
    id: "Expt #" + experiment.id,
    data: [
      {
        x: experiment.avgAnswerScore,
        y: experiment.avgLatency,
      },
    ],
  }));

  const submit = handleSubmit(async (data) => {
    setShouldShowProgress(true);
    setLoading(true);
    setResults([]);

    const resetExpts = data.evalQuestionsCount !== evalQuestionsCount;
    if (resetExpts) {
      setExperiments([]);
    }

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

    if (!IS_DEV) {
      LogRocket.track("DemoSubmission", {
        numQuestions: data.evalQuestionsCount,
        overlap: data.overlap,
        split: data.splitMethod,
        retriever: data.retriever,
        embedding: data.embeddingAlgorithm,
        model: data.model,
        promptStyle: data.gradingPrompt,
        numNeighbors: data.numNeighbors,
      });
    }

    setEvalQuestionsCount(data.evalQuestionsCount);
    setGradingPromptStyle(data.gradingPrompt);

    const controller = new AbortController();

    let localResults = [];
    let rowCount = 0;

    try {
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
          throw err;
        },
      });
    } catch (e) {
      notifications.show({
        title: "Error",
        message: "There was an error from the server.",
        color: "red",
      });
      setShouldShowProgress(false);
      setLoading(false);
      return;
    }
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
      id: resetExpts ? 1 : experiments.length + 1,
    };
    setExperiments((experiments) =>
      resetExpts ? [newExperiment] : [...experiments, newExperiment]
    );
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
      <Title order={3}>Get Started</Title>
      <Alert style={alertStyle}>
        Welcome to the auto-evaluator! This is an app to evaluate the
        performance of question-answering LLM chains. This demo has pre-loaded
        two things: (1) a document (the Lex Fridman podcast with Andrej
        Karpathy) and (2) a "test set" of question-answer pairs for this
        episode. The aim is to evaluate the performance of various
        question-answering LLM chain configurations against the test set. You
        can build any QA chain using the components and score its performance.
        <br />
        <br />
        <Text>
          Choose the question-answering chain configuration (left) and launch an
          experiment using the button below. For more detail on each setting,
          see full the documentation{" "}
          <a
            style={{ color: "blue" }}
            href="https://github.com/dankolesnikov/auto-evaluator-app"
          >
            here
          </a>
          .
        </Text>
      </Alert>
      {!!watchFiles?.length && (
        <>
          <FilesTable files={watchFiles} />
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
                    <Group spacing={0}>
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
          <Flex direction="row" gap="md">
            {!loading || isFirstRun ? (
              <Stack>
                <Button
                  style={{ marginBottom: "18px", width: 170 }}
                  type="submit"
                  onClick={submit}
                  disabled={loading}
                >
                  {runExperimentButtonLabel}
                </Button>
              </Stack>
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
                <Alert style={alertStyle}>
                  This table shows the each question-answer pair from the test
                  set along with the model's answer to the question. The app
                  will score two things: (1) the relevance of the retrieved
                  documents relative to the question and (2) the similarity of
                  the LLM generated answer relative to ground truth answer. The
                  prompts for both can be seen{" "}
                  <a
                    style={{ color: "blue" }}
                    href="https://github.com/dankolesnikov/auto-evaluator-app/blob/main/api/text_utils.py"
                  >
                    here
                  </a>{" "}
                  and can be chosen by the user in the drop-down list "Grading
                  prompt style". The "Fast" prompt will only have the LLM grader
                  output the score. The other prompts will also produce an
                  explanation.
                </Alert>
                <Group spacing={0}>
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
            <ExperimentResultTable
              results={results}
              isFastGradingPrompt={isFastGradingPrompt}
            />
          </Spoiler>
        </Card>
      ) : null}
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
                <Title order={3}>Summary</Title>
                <Group spacing={0}>
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
            <ExperimentSummaryTable experiments={experiments} />
            <div style={{ height: 500 }}>
              <SummaryChart chartData={chartData} />
            </div>
          </Spoiler>
        </Card>
      )}
    </Stack>
  );
};
export default Demo;
