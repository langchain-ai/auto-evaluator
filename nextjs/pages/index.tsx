import { AppShell, Navbar } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import Body from "../components/Body";
import HeaderEvaluator from "../components/HeaderEvaluator";
import Sidebar from "../components/Sidebar";
import { FormValues } from "../utils/types";

const HomePage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      evalQuestionsCount: 5,
      chunkSize: 1000,
      overlap: 100,
      splitMethod: "RecursiveTextSplitter",
      embeddingAlgorithm: "OpenAI",
      model: "gpt-3.5-turbo",
      retriever: "similarity-search",
      gradingPrompt: "Fast",
      numNeighbors: 3,
      files: [],
    },
  });

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }}>
          <Sidebar form={form} />
          <br />
        </Navbar>
      }
      header={<HeaderEvaluator />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Body form={form} />
    </AppShell>
  );
};
export default HomePage;
