import React, { useEffect, useState } from "react";
import {
  Group,
  Text,
  Loader,
  useMantineTheme,
  rem,
  Alert,
  Table,
  Button,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Dropzone, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Form } from "../utils/types";
import { notifications } from "@mantine/notifications";
import { API_URL, TEXT_PLAIN } from "../utils/variables";

enum ResponseStatus {
  WIP = "WIP",
  DONE = "DONE",
}

enum ResponseType {
  Message = "message",
  Table = "table",
}

const Body = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const theme = useMantineTheme();
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const submit = handleSubmit(async (data) => {
    setLoading(true);
    setOutput(null);
    const formData = new FormData();
    data.files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("num_eval_questions", data.evalQuestionsCount.toString());
    formData.append("chunk_chars", data.chunkSize.toString());
    formData.append("overlap", data.overlap.toString());
    formData.append("split_method", data.splitMethod);
    formData.append("retriver_type", data.retriever);
    formData.append("embeddings", data.embeddingAlgorithm);
    formData.append("model", data.model);

    const response = await fetch(API_URL + "/evaluator-stream", {
      method: "POST",
      body: formData,
    });

    const reader = response.body.getReader();

    let done, value;
    while (!done) {
      ({ value, done } = await reader.read());
      const decoder = new TextDecoder();
      if (done) {
        break;
      }
      try {
        setOutput(JSON.parse(decoder.decode(value)));
      } catch (e) {
        notifications.show({
          title: "Error",
          message: "Error parsing API response",
          color: "red",
        });
        break;
      }
    }

    setLoading(false);
  });

  return (
    <>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Instructions"
        color="teal"
      >
        Provide your PDFs and/or Docx files, evaluator will build the QA eval
        data set for you.
      </Alert>
      <br />
      <Dropzone
        onDrop={(files) => {
          setValue("files", [...(getValues("files") ?? []), ...files]);
        }}
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
        accept={TEXT_PLAIN && PDF_MIME_TYPE && MS_WORD_MIME_TYPE}
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
              Drag and Drop PDFs, Docx.
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
          <Button type="submit" onClick={submit} disabled={loading}>
            {loading ? <Loader size="sm" /> : "Submit"}
          </Button>
          <br />
          <br />
        </>
      )}
      {output?.type === ResponseType.Message && (
        <Text>{output?.data + "..."}</Text>
      )}
      {output?.status === ResponseStatus.DONE && (
        <Table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Result</th>
              <th>Score</th>
              <th>Latency</th>
            </tr>
          </thead>
          <tbody>
            {output?.data?.map((response, index) => (
              <tr key={index}>
                <td>{response.question}</td>
                <td>{response.answer}</td>
                <td>{response.result}</td>
                <td>{response.score}</td>
                <td>{response.latency}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default Body;
