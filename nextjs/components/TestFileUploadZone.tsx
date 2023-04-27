import { Stack, createStyles, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconFile, IconUpload, IconX } from "@tabler/icons-react";
import Papa from "papaparse";
import { QAPair } from "../utils/types";

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

const TestFileUploadZone = ({
  disabled,
  setTestDataset,
  setDidUploadTestDataset,
}: {
  disabled: boolean;
  setTestDataset: React.Dispatch<React.SetStateAction<QAPair[]>>;
  setDidUploadTestDataset: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Dropzone
      disabled={disabled}
      className={disabled ? classes.disabled : null}
      onDrop={(files) =>
        files.forEach((file) =>
          Papa.parse(file, {
            header: false,
            beforeFirstChunk: (chunk) => chunk.replace(/, /g, ","),
            complete: (results: { data: string[][] }) => {
              const datasetArray = results?.data;
              if (
                datasetArray?.[0]?.[0]?.toLowerCase() === "question" ||
                datasetArray?.[0]?.[0]?.toLowerCase() === "answer"
              ) {
                datasetArray.shift();
              }
              const cappedDatasetArray = datasetArray.slice(
                0,
                Math.min(15, datasetArray.length)
              );
              const uploadedTestDataset = cappedDatasetArray.map((row) => ({
                question: row?.[0],
                answer: row?.[1],
              }));
              setTestDataset((testDataset) => [
                ...uploadedTestDataset,
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
      // maxSize={3 * 1024 ** 2}
      style={{ width: "40%" }}
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
            Upload Test Dataset (Optional)
          </Text>
          <Text size="sm" color="dimmed" inline mt={7} align="center">
            Single CSV containing QA pairs (shape: [question, answer])
          </Text>
        </div>
      </Stack>
    </Dropzone>
  );
};
export default TestFileUploadZone;
