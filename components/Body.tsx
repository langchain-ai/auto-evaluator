import React, { useCallback, useState } from "react";
import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Alert,
  Table,
  Button,
  Title,
  Loader,
  Flex,
  Stack,
  Spoiler,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { Form } from "../utils/types";
import { notifications } from "@mantine/notifications";
import { API_URL } from "../utils/variables";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Parser } from "@json2csv/plainjs";
import Papa from "papaparse";

type Result = {
  question: string;
  answer: string;
  result: string;
  retrievalScore: number;
  answerScore: number;
  latency: number;
};

type QAPair = {
  question: string;
  answer: string;
};

type Experiment = {
  evalQuestionsCount: number;
  chunkSize: number;
  overlap: number;
  splitMethod: string;
  retriever: string;
  embeddingAlgorithm: string;
  model: string;
  // gradingPrompt: string;
  numNeighbors: number;
  avgRelevancyScore: number;
  avgAnswerScore: number;
  avgLatency: number;
};

const Body = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [testDataset, setTestDataset] = useState<QAPair[]>([]);
  const [evalQuestionsCount, setEvalQuestionsCount] = useState(-1);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [didUploadTestDataset, setDidUploadTestDataset] = useState(false);

  const submit = handleSubmit(async (data) => {
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
    // formData.append("grade_prompt", data.gradingPrompt);
    formData.append("num_neighbors", data.numNeighbors.toString());
    formData.append("test_dataset", JSON.stringify(testDataset));

    setEvalQuestionsCount(data.evalQuestionsCount);

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
        console.log("raw input", ev.data);
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
    const experiment: Experiment = {
      evalQuestionsCount: data.evalQuestionsCount,
      chunkSize: data.chunkSize,
      overlap: data.overlap,
      splitMethod: data.splitMethod,
      retriever: data.retriever,
      embeddingAlgorithm: data.embeddingAlgorithm,
      model: data.model,
      // gradingPrompt: data.gradingPrompt,
      numNeighbors: data.numNeighbors,
      avgRelevancyScore:
        localResults.reduce((acc, curr) => acc + curr.retrievalScore, 0) /
        localResults.length,
      avgAnswerScore:
        localResults.reduce((acc, curr) => acc + curr.answerScore, 0) /
        localResults.length,
      avgLatency:
        localResults.reduce((acc, curr) => acc + curr.latency, 0) /
        localResults.length,
    };
    setExperiments((experiments) => [...experiments, experiment]);
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

  return (
    <Stack>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Instructions"
        color="teal"
      >
        Upload some sample text files and choose the input parameters for your
        QA chain. This evaluator will generate a test dataset (if not provided)
        and grade the performance of the QA chain.
      </Alert>
      <Flex direction="row" gap="md">
        <Dropzone
          onDrop={(files) => {
            setValue("files", [...(getValues("files") ?? []), ...files]);
            setExperiments([]);
            setResults([]);
          }}
          accept={[
            MIME_TYPES.pdf,
            MIME_TYPES.docx,
            MIME_TYPES.doc,
            "text/plain",
          ]}
          onReject={(files) =>
            notifications.show({
              title: "Error",
              message: `File type(s) not supported ${files.map(
                (file) => file.file.type
              )}`,
              color: "red",
            })
          }
          maxSize={3 * 1024 ** 2}
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
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline align="center">
                Upload Text for QA
              </Text>
              <Text size="sm" color="dimmed" mt={7} align="center">
                {"Attach files (.txt, .pdf, .doc, .docx) up to 5 MB"}
              </Text>
            </div>
          </Stack>
        </Dropzone>
        <Dropzone
          onDrop={(files) =>
            files.forEach((file) =>
              Papa.parse(file, {
                header: false,
                complete: (results: { data: string[][] }) => {
                  const datasetArray = results?.data;
                  if (
                    datasetArray?.[0]?.[0]?.toLowerCase() === "question" ||
                    datasetArray?.[0]?.[0]?.toLowerCase() === "answer"
                  ) {
                    datasetArray.shift();
                  }
                  const newTestDataset = datasetArray.map((row) => ({
                    question: row?.[0],
                    answer: row?.[1],
                  }));
                  setTestDataset((testDataset) => [
                    ...newTestDataset,
                    ...testDataset,
                  ]);
                  setDidUploadTestDataset(true);
                },
                error: () => {
                  notifications.show({
                    title: "Error",
                    message: "Error parsing test dataset CSV",
                    color: "red",
                  });
                },
              })
            )
          }
          maxFiles={1}
          multiple={false}
          disabled={didUploadTestDataset}
          accept={[MIME_TYPES.csv]}
          onReject={(files) =>
            notifications.show({
              title: "Error",
              message: `File type(s) not supported ${files.map(
                (file) => file.file.type
              )}`,
              color: "red",
            })
          }
          maxSize={3 * 1024 ** 2}
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
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>
            <div>
              <Text size="xl" inline align="center">
                Upload Test Dataset (Optional)
              </Text>
              <Text size="sm" color="dimmed" inline mt={7} align="center">
                Attach a single csv containing up to 15 QA pairs, with the
                columns: "question", "answer"
              </Text>
            </div>
          </Stack>
        </Dropzone>
      </Flex>
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
            <Button
              style={{ marginBottom: "18px" }}
              type="submit"
              onClick={submit}
              disabled={loading}
            >
              {loading ? <Loader size="sm" /> : "Submit"}
            </Button>
          </Flex>
        </>
      )}
      {!!testDataset.length && (
        <Spoiler
          maxHeight={0}
          showLabel="Show available test dataset"
          hideLabel="Hide available test dataset"
          transitionDuration={500}
        >
          <Flex direction="row" gap="md">
            <Title order={3}>Test Dataset</Title>
            <Button
              style={{ marginBottom: "18px" }}
              type="button"
              onClick={() => download(testDataset, "test_dataset")}
            >
              Download
            </Button>
            <Button
              style={{ marginBottom: "18px" }}
              type="button"
              onClick={() => {
                setTestDataset([]);
                setDidUploadTestDataset(false);
                notifications.show({
                  title: "Success",
                  message: "The test dataset has been cleared.",
                  color: "green",
                });
              }}
            >
              Reset
            </Button>
          </Flex>
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
      )}
      {!!experiments.length && (
        <Spoiler
          maxHeight={0}
          showLabel="Show summary"
          hideLabel="Hide summary"
          transitionDuration={500}
        >
          <Flex direction="row" gap="md">
            <Title order={3}>Summary</Title>
            <Button
              style={{ marginBottom: "18px" }}
              type="button"
              onClick={() => download(experiments, "summary")}
            >
              Download
            </Button>
          </Flex>
          <Table withBorder withColumnBorders striped highlightOnHover>
            <thead>
              <tr>
                <th># of Eval Questions</th>
                <th>Chunk Size</th>
                <th>Overlap</th>
                <th>Split Method</th>
                <th>Retriever</th>
                <th>Embedding Algorithm</th>
                <th>Model</th>
                {/* <th>Grading Prompt Style</th> */}
                <th># of Chunks Retrieved</th>
                <th>Avg Retrieval Relevancy Score</th>
                <th>Avg Answer Similarity Score</th>
                <th>Avg Latency (s)</th>
              </tr>
            </thead>
            <tbody>
              {experiments?.map((result: Experiment, index: number) => (
                <tr key={index}>
                  <td>{result?.evalQuestionsCount}</td>
                  <td>{result?.chunkSize}</td>
                  <td>{result?.overlap}</td>
                  <td>{result?.splitMethod}</td>
                  <td>{result?.retriever}</td>
                  <td>{result?.embeddingAlgorithm}</td>
                  <td>{result?.model}</td>
                  {/* <td>{result?.gradingPrompt}</td> */}
                  <td>{result?.numNeighbors}</td>
                  <td>{result?.avgRelevancyScore}</td>
                  <td>{result?.avgAnswerScore}</td>
                  <td>{result?.avgLatency.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Spoiler>
      )}
      {!!results.length && (
        <Spoiler
          maxHeight={0}
          showLabel="Show results"
          hideLabel="Hide results"
          transitionDuration={500}
          initialState={true}
        >
          <Flex direction="row" gap="md">
            <Title order={3}>Results</Title>
            {evalQuestionsCount === results.length && (
              <Button
                style={{ marginBottom: "18px" }}
                type="button"
                onClick={() => download(results, "results")}
              >
                Download
              </Button>
            )}
          </Flex>
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
                  <td>{result?.retrievalScore}</td>
                  <td>{result?.answerScore}</td>
                  <td>{result?.latency?.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Spoiler>
      )}
    </Stack>
  );
};
export default Body;
