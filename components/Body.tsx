import React, { useMemo, useState } from "react";
import {
  Group,
  Text,
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
import axios from "axios";
import { API_URL, TEXT_PLAIN } from "../utils/variables";

const Body = ({ form }: { form: Form }) => {
  const { setValue, watch, getValues, handleSubmit } = form;
  const watchFiles = watch("files");
  const theme = useMantineTheme();
  const [output, setOutput] = useState(null);
  const submit = handleSubmit(async (data) => {
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

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    setOutput(response.data["output dataframe"]);
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
      <Text>{JSON.stringify(output)}</Text>
      <Button
        type="submit"
        onClick={submit}
        style={{ position: "absolute", bottom: 25 }}
      >
        Submit
      </Button>
    </>
  );
};
export default Body;
