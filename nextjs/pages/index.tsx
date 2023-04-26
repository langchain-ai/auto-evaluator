import { AppShell, Navbar } from "@mantine/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import HeaderEvaluator, { MenuItem } from "../components/HeaderEvaluator";
import Sidebar from "../components/Sidebar";
import { FormValues } from "../utils/types";
import Demo from "../components/Demo";

const DemoPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      evalQuestionsCount: 5,
      chunkSize: 1000,
      overlap: 100,
      splitMethod: "RecursiveTextSplitter",
      embeddingAlgorithm: "OpenAI",
      model: "gpt-3.5-turbo",
      retriever: "similarity-search",
      gradingPrompt: "Descriptive",
      numNeighbors: 3,
      files: [],
    },
  });

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" width={{ base: "30%" }}>
          <Sidebar form={form} />
          <br />
        </Navbar>
      }
      header={<HeaderEvaluator activeTab={MenuItem.Demo} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Demo form={form} />
    </AppShell>
  );
};
export default DemoPage;
