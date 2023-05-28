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
  ScrollArea,
  createStyles,
} from "@mantine/core";
import { IconUpload, IconX, IconAlertCircle } from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Experiment, Form, QAPair, Result } from "../utils/types";
import { notifications } from "@mantine/notifications";
import { API_URL, IS_DEV } from "../utils/variables";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Parser } from "@json2csv/plainjs";
import { IconFile } from "@tabler/icons-react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { isEmpty, isNil, orderBy } from "lodash";
import TestFileUploadZone from "./TestFileUploadZone";
import LogRocket from "logrocket";

const MAX_FILE_SIZE_MB = 50;

enum DropZoneErrorCode {
  FileTooLarge = "file-too-large",
  FileInvalidType = "file-invalid-type",
}

const useStyles = createStyles((theme) => ({
  disabled: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    cursor: "not-allowed",

    "& *": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
    },
  },
}));

const Playground = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [testDataset, setTestDataset] = useState<QAPair[]>([]);
  const [evalQuestionsCount, setEvalQuestionsCount] = useState(-1);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [didUploadTestDataset, setDidUploadTestDataset] = useState(false);
  const [shouldShowProgress, setShouldShowProgress] = useState(false);
  const [gradingPromptStyle, setGradingPromptStyle] = useState(undefined);
  const experimentsResultsSpoilerRef = useRef<HTMLButtonElement>(null);
  const summarySpoilerRef = useRef<HTMLButtonElement>(null);
  const testDatasetSpoilerRef = useRef<HTMLButtonElement>(null);
  const [testFilesDropzoneDisabled, setTestFilesDropzoneDisabled] =
    useState(true);
  const [fileUploadDisabled, setFileUploadDisabled] = useState(false);

  const { classes } = useStyles();

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

    const resetExpts =
      data.evalQuestionsCount !== evalQuestionsCount || didUploadTestDataset;
    if (resetExpts) {
      setExperiments([]);
    }

    setDidUploadTestDataset(false);

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
      LogRocket.track("PlaygroundSubmission", {
        fileSizes: data.files.map((file) => file.size),
        fileTypes: data.files.map((file) => file.type),
        numQuestions: data.evalQuestionsCount,
        overlap: data.overlap,
        split: data.splitMethod,
        retriever: data.retriever,
        embedding: data.embeddingAlgorithm,
        model: data.model,
        promptStyle: data.gradingPrompt,
        numNeighbors: data.numNeighbors,
        uploadedTestDataset: !!testDataset.length,
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
          Connection: "keep-alive", // Add the keep-alive header
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
          if (!rowCount) {
            throw new Error("No results were returned from the server.");
          }
        },
        onerror(err) {
          console.log("There was an error from server", err);
          throw new Error(err);
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

  const runExperimentButtonLabel = experiments.length
    ? "Re-run experiment"
    : "Run Experiment";

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
  const alertStyle = { backgroundColor: `rgba(193,194,197,0.38)` };

  return (
    <Stack>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Instructions"
        style={alertStyle}
      >
        Upload a file (up to 50 MB) and choose the parameters for your QA
        chain. This evaluator will generate a test dataset of QA pairs and grade
        the performance of the QA chain. You can experiment with different
        parameters and evaluate the performance.
      </Alert>
      <Flex direction="row" gap="md">
        <Dropzone
          disabled={fileUploadDisabled}
          className={fileUploadDisabled ? classes.disabled : null}
          onDrop={(files) => {
            setValue("files", [...(getValues("files") ?? []), ...files]);
            setExperiments([]);
            setResults([]);
            setShouldShowProgress(false);
            setTestFilesDropzoneDisabled(false);
            setFileUploadDisabled(true);
          }}
          maxFiles={1}
          multiple={false}
          maxSize={MAX_FILE_SIZE_MB * 1024 ** 2} // 50 MB
          accept={[
            MIME_TYPES.pdf,
            MIME_TYPES.docx,
            MIME_TYPES.doc,
            "text/plain",
          ]}
          onReject={(files) => {
            const errorCode = files?.[0]?.errors?.[0]?.code;
            let message = files?.[0]?.errors?.[0]?.message;
            switch (errorCode) {
              case DropZoneErrorCode.FileTooLarge:
                message = `File size too large. Max file size is ${MAX_FILE_SIZE_MB} MB.`;
                break;
              case DropZoneErrorCode.FileInvalidType:
                message = "File type not supported";
                break;
              default:
                break;
            }
            notifications.show({
              title: "Error",
              message,
              color: "red",
            });
          }}
          // maxSize={3 * 1024 ** 2}
          style={{ width: "100%" }}
        >
          <Stack align="center">
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFile size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline align="center">
                Upload Text for QA Eval
              </Text>
              <Text size="sm" color="dimmed" mt={7} align="center">
                {"Attach a file (.txt, .pdf, .doc, .docx)"}
              </Text>
            </div>
          </Stack>
        </Dropzone>
        <TestFileUploadZone
          disabled={testFilesDropzoneDisabled}
          setTestDataset={setTestDataset}
          setDidUploadTestDataset={setDidUploadTestDataset}
        />
      </Flex>
      {!!watchFiles?.length && (
        <>
          <Table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size (MB)</th>
              </tr>
            </thead>
            <tbody>
              {watchFiles?.map((file, id) => (
                <tr key={id}>
                  <td>{file?.name}</td>
                  <td>{(file?.size / 1024 ** 2).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
          <Flex direction="row" gap="md">
            <Button
              style={{ marginBottom: "18px" }}
              type="submit"
              onClick={submit}
              disabled={loading}
            >
              {runExperimentButtonLabel}
            </Button>
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
                <Title order={3}>Summary</Title>
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
            <ScrollArea scrollbarSize={0}>
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
            </ScrollArea>
            <div style={{ height: 500 }}>
              <ResponsiveScatterPlot
                data={chartData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: "linear", min: 0, max: 1 }}
                xFormat=">-.2f"
                yScale={{ type: "linear", min: 0, max: "auto" }}
                yFormat=">-.2f"
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                nodeSize={25}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Avg Answer Similarity Score",
                  legendPosition: "middle",
                  legendOffset: 46,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Avg Latency (s)",
                  legendPosition: "middle",
                  legendOffset: -60,
                }}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemsSpacing: 5,
                    itemDirection: "left-to-right",
                    symbolSize: 12,
                    symbolShape: "circle",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
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
            <ScrollArea scrollbarSize={0}>
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
                      <td style={{ whiteSpace: "pre-wrap" }}>
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
                      <td style={{ whiteSpace: "pre-wrap" }}>
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
            </ScrollArea>
          </Spoiler>
        </Card>
      ) : null}
    </Stack>
  );
};
export default Playground;
