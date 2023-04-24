import {
  ScrollArea,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { Form } from "../utils/types";
import { Controller } from "react-hook-form";

const Sidebar = ({ form }: { form: Form }) => {
  const { control } = form;

  return (
    <>
      <ScrollArea scrollbarSize={0}>
        <Text fz="xl">Parameters</Text>
        <br />
        <Stack
          spacing="30px"
          style={{ overflowX: "hidden", height: "100%", paddingRight: "15px" }}
        >
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
                    { value: 1, label: "1" },
                    { value: 5, label: "5" },
                    { value: 10, label: "10" },
                    { value: 15, label: "15" },
                  ]}
                  max={15}
                  min={1}
                  step={1}
                />
              )}
            />
          </div>
          <div>
            <Text fz="md">Chunk size</Text>
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
                  step={100}
                />
              )}
            />
          </div>
          <div>
            <Text fz="md">Chunk overlap</Text>
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
                  step={10}
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
                <Select
                  {...field}
                  data={[
                    { label: "GPT 3.5 Turbo", value: "gpt-3.5-turbo" },
                    { label: "GPT 4", value: "gpt4" },
                    { label: "Anthropic", value: "anthropic" },
                  ]}
                />
              )}
            />
          </div>
          <div>
            <Text fz="md">Split method</Text>
            <Controller
              name="splitMethod"
              control={control}
              render={({ field }) => (
                <SegmentedControl
                  {...field}
                  data={[
                    {
                      label: "CharacterTextSplitter",
                      value: "CharacterTextSplitter",
                    },
                    {
                      label: "RecursiveTextSplitter",
                      value: "RecursiveTextSplitter",
                    },
                  ]}
                />
              )}
            />
          </div>
          <div>
            <Text fz="md">Embedding algorithm</Text>
            <Controller
              name="embeddingAlgorithm"
              control={control}
              render={({ field }) => (
                <SegmentedControl
                  {...field}
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
              )}
            />
          </div>
          <div>
            <Text fz="md">Retriever</Text>
            <Controller
              name="retriever"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  data={[
                    {
                      label: "Similarity Search",
                      value: "similarity-search",
                    },
                    {
                      label: "SVM",
                      value: "SVM",
                    },
                    { label: "LlamaIndex", value: "Llama-Index" },
                    { label: "TF-IDF", value: "TF-IDF" },
                  ]}
                />
              )}
            />
          </div>
          <div>
            <Text fz="md">Number of chunks to retrieve</Text>
            <Controller
              name="numNeighbors"
              control={control}
              render={({ field }) => (
                <Slider
                  {...field}
                  labelTransition="skew-down"
                  marks={[
                    { value: 3, label: "3" },
                    { value: 4, label: "4" },
                    { value: 5, label: "5" },
                  ]}
                  max={5}
                  min={3}
                  step={1}
                />
              )}
            />
          </div>
          <div>
            <Text fz="md">Grading prompt style</Text>
            <Controller
              name="gradingPrompt"
              control={control}
              render={({ field }) => (
                <SegmentedControl
                  {...field}
                  data={[
                    {
                      label: "Fast",
                      value: "Fast",
                    },
                    {
                      label: "Descriptive",
                      value: "Descriptive",
                    },
                  ]}
                />
              )}
            />
          </div>
        </Stack>
      </ScrollArea>
    </>
  );
};
export default Sidebar;
