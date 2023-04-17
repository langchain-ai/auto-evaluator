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

type QATableEntry = {
  question: string;
  answer: string;
  result: string;
  retrievalScore: true;
  answerScore: string;
  latency: string;
};

type QATable = QATableEntry[];

const Body = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [qaTable, setQATable] = useState<QATable>([]);
  const [evalQuestionsCount, setEvalQuestionsCount] = useState(-1);

  const submit = handleSubmit(async (data) => {
    setLoading(true);
    setQATable([]);
    const formData = new FormData();
    data.files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("num_eval_questions", data.evalQuestionsCount.toString());
    setEvalQuestionsCount(data.evalQuestionsCount);
    formData.append("chunk_chars", data.chunkSize.toString());
    formData.append("overlap", data.overlap.toString());
    formData.append("split_method", data.splitMethod);
    formData.append("retriver_type", data.retriever);
    formData.append("embeddings", data.embeddingAlgorithm);
    formData.append("model", data.model);
    const controller = new AbortController();
    console.log(qaTable, "qaTable");
    await fetchEventSource(API_URL + "/evaluator-stream", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "text/event-stream",
      },
      signal: controller.signal,
      onmessage(ev) {
        console.log("raw input", ev.data);
        let parsedData;
        let rowCount = 0;
        try {
          parsedData = JSON.parse(ev.data);
          setQATable((qaTable) => [...qaTable, parsedData?.data?.qaTable]);
          rowCount += 1;
          if (rowCount === evalQuestionsCount) {
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
  });

  const download = useCallback(() => {
    const parser = new Parser();
    const csv = parser.parse(qaTable);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "qa_evaluation.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qaTable]);

  return (
    <Stack>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Instructions"
        color="teal"
      >
        Provide your PDFs, TXT, Docx files alongside the input parameters and
        evaluator will generate the test dataset with a QA chain and will
        provide you with test results.
      </Alert>
      <Dropzone
        onDrop={(files) =>
          setValue("files", [...(getValues("files") ?? []), ...files])
        }
        accept={[MIME_TYPES.pdf, MIME_TYPES.docx, MIME_TYPES.doc, "text/plain"]}
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
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(125), pointerEvents: "none" }}
        >
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
            <Text size="xl" inline>
              Drag and Drop PDFs, Docx, TXT
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {!!watchFiles?.length && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {watchFiles?.map((file, id) => (
                <tr key={id}>
                  <td>{file.name}</td>
                  <td>{file.size}</td>
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
            {evalQuestionsCount === qaTable.length && (
              <Button
                style={{ marginBottom: "18px" }}
                type="button"
                onClick={download}
              >
                Download CSV
              </Button>
            )}
          </Flex>
        </>
      )}
      {evalQuestionsCount !== -1 && (
        <>
          <Title order={3}>Results</Title>
          <Table>
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
              {qaTable?.map((response: QATableEntry, index: number) => (
                <tr key={index}>
                  <td>{response.question}</td>
                  <td>{response.answer}</td>
                  <td>{response.result}</td>
                  <td>{response.retrievalScore}</td>
                  <td>{response.answerScore}</td>
                  <td>{parseFloat(response.latency).toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Stack>
  );
};
export default Body;
