import React from "react";
import { Group, Text, useMantineTheme, rem, Alert } from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Dropzone, MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Form } from "../utils/types";
import { notifications } from "@mantine/notifications";

const Body = ({ form }: { form: Form }) => {
  const { register, setValue } = form;

  const theme = useMantineTheme();

  return (
    <>
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Instructions"
        color="teal"
      >
        Provide your PDFs and/or Docx files, evaluator will build the QA eval
        data set. for you.
      </Alert>
      <br />
      <Dropzone
        onDrop={(files) => {
          setValue("files", files);
          console.log("accepted files", files);
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
        accept={PDF_MIME_TYPE && MS_WORD_MIME_TYPE}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
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
    </>
  );
};
export default Body;
