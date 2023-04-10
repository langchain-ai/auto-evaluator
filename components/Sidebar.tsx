import { SegmentedControl, Slider, Stack, Text } from "@mantine/core";
import React from "react";
import { Form } from "../utils/types";

const Sidebar = ({ form }: { form: Form }) => {
  const { setValue, getValues } = form;

  return (
    <>
      <Text fz="xl">Inputs Pane</Text>
      <br />
      <Stack spacing={"30px"}>
        <div>
          <Text fz="md">Number of eval questions</Text>
          <Slider
            value={getValues("evalQuestionsCount")}
            onChange={(value) => setValue("chunkSize", value)}
            labelTransition="skew-down"
            marks={[
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 15, label: "15" },
            ]}
            max={15}
            min={5}
            step={1}
          />
        </div>
        <div>
          <Text fz="md">Chunk Size</Text>
          <Slider
            value={getValues("chunkSize")}
            onChange={(value) => setValue("chunkSize", value)}
            labelTransition="skew-down"
            marks={[
              { value: 500, label: "500" },
              { value: 1000, label: "1000" },
              { value: 1500, label: "1500" },
              { value: 2000, label: "2000" },
            ]}
            max={2000}
            min={500}
            step={500}
          />
        </div>
        <div>
          <Text fz="md">Overlap</Text>
          <Slider
            value={getValues("overlap")}
            onChange={(value) => setValue("overlap", value)}
            labelTransition="skew-down"
            marks={[
              { value: 0, label: "0" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
              { value: 150, label: "150" },
            ]}
            max={150}
            min={0}
            step={50}
          />
        </div>
        <div>
          <Text fz="md">Model</Text>
          <SegmentedControl
            value={getValues("model")}
            onChange={(value) => setValue("model", value)}
            data={[
              { label: "GPT 3.5 Turbo", value: "gpt3" },
              { label: "GPT 4", value: "gpt4" },
            ]}
          />
        </div>
        <div>
          <Text fz="md">Split Method</Text>
          <SegmentedControl
            value={getValues("splitMethod")}
            onChange={(value) => setValue("splitMethod", value)}
            data={[
              {
                label: "CharacterTextSplitter",
                value: "characterTextSplitter",
              },
              {
                label: "RecursiveTextSplitter",
                value: "recursiveTextSplitter",
              },
            ]}
          />
        </div>
        <div>
          <Text fz="md">Embedding Algorithm</Text>
          <SegmentedControl
            value={getValues("embeddingAlgorithm")}
            onChange={(value) => setValue("embeddingAlgorithm", value)}
            data={[
              {
                label: "OpenAI",
                value: "openAI",
              },
              {
                label: "HuggingFace",
                value: "huggingFace",
              },
            ]}
          />
        </div>
        <div>
          <Text fz="md">Retriever</Text>
          <SegmentedControl
            value={getValues("retriever")}
            onChange={(value) => setValue("retriever", value)}
            data={[
              {
                label: "TF-IDF",
                value: "tfIdf",
              },
              {
                label: "Vector Store",
                value: "vectorStore",
              },
            ]}
          />
        </div>
      </Stack>
    </>
  );
};
export default Sidebar;
