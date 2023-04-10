import { SegmentedControl, Slider, Stack, Text } from "@mantine/core";
import React from "react";
import { Form } from "../utils/types";
import { Controller } from "react-hook-form";

const Sidebar = ({ form }: { form: Form }) => {
  const { setValue, getValues, control } = form;

  return (
    <>
      <Text fz="xl">Inputs Pane</Text>
      <br />
      <Stack spacing={"30px"}>
        <div>
          <Text fz="md">Number of eval questions</Text>
          <Controller
            name="evalQuestionsCount"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
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
            )}
          />
        </div>
        <div>
          <Text fz="md">Chunk Size</Text>
          <Controller
            name="chunkSize"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
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
            )}
          />
        </div>
        <div>
          <Text fz="md">Overlap</Text>
          <Controller
            name="overlap"
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
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
            )}
          />
        </div>
        <div>
          <Text fz="md">Model</Text>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <SegmentedControl
                {...field}
                data={[
                  { label: "GPT 3.5 Turbo", value: "gpt3" },
                  { label: "GPT 4", value: "gpt4" },
                ]}
              />
            )}
          />
        </div>
        <div>
          <Text fz="md">Split Method</Text>
          <Controller
            name="splitMethod"
            control={control}
            render={({ field }) => (
              <SegmentedControl
                {...field}
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
            )}
          />
        </div>
        <div>
          <Text fz="md">Embedding Algorithm</Text>
          <Controller
            name="embeddingAlgorithm"
            control={control}
            render={({ field }) => (
              <SegmentedControl
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
            )}
          />
        </div>
        <div>
          <Text fz="md">Retriever</Text>
          <Controller
            name="retriever"
            control={control}
            render={({ field }) => (
              <SegmentedControl
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
            )}
          />
        </div>
      </Stack>
    </>
  );
};
export default Sidebar;
