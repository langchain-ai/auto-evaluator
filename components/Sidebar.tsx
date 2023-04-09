import { SegmentedControl, Slider, Stack, Text } from "@mantine/core";
import React from "react";
import { Form } from "../utils/types";

const Sidebar = ({ form }: { form: Form }) => {
  const { register } = form;

  return (
    <>
      <Text fz="xl">Inputs Pane</Text>
      <br />
      <Stack spacing={"30px"}>
        <div>
          <Text fz="md">Number of eval questions</Text>
          <Slider
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
            labelTransition="skew-down"
            marks={[
              { value: 50, label: "50" },
              { value: 100, label: "100" },
              { value: 150, label: "150" },
            ]}
            max={150}
            min={50}
            step={50}
          />
        </div>
        <div>
          <Text fz="md">Model</Text>
          <SegmentedControl
            // {...register("model")}
            data={[
              { label: "GPT 3.5 Turbo", value: "gpt3" },
              { label: "GPT 4", value: "gpt4" },
            ]}
          />
        </div>
        <div>
          <Text fz="md">Split Method</Text>
          <SegmentedControl
            data={[
              {
                label: "RecursiveTextSplitter",
                value: "RecursiveTextSplitter",
              },
              {
                label: "CharacterTextSplitter",
                value: "CharacterTextSplitter",
              },
            ]}
          />
        </div>
        <div>
          <Text fz="md">Embedding Algorithm</Text>
          <SegmentedControl
            data={[
              {
                label: "OpenAI",
                value: "OpenAI",
              },
              {
                label: "HuggingFace",
                value: "HuggingFace",
              },
            ]}
          />
        </div>
        <div>
          <Text fz="md">Retriever</Text>
          <SegmentedControl
            data={[
              {
                label: "TF-IDF",
                value: "tf_idf",
              },
              {
                label: "Vector Store",
                value: "vector_store",
              },
            ]}
          />
        </div>
      </Stack>
    </>
  );
};
export default Sidebar;
