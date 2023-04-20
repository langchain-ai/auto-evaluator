import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import Body from "../components/Body";
import Sidebar from "../components/Sidebar";
import { useForm } from "react-hook-form";
import { FormValues } from "../utils/types";

const HomePage = () => {
  const [opened, setOpened] = useState(false);
  const mobileWidth = useMediaQuery("(max-width: 390px)");
  const form = useForm<FormValues>({
    defaultValues: {
      evalQuestionsCount: 5,
      chunkSize: 1000,
      overlap: 100,
      splitMethod: "RecursiveTextSplitter",
      embeddingAlgorithm: "OpenAI",
      model: "gpt-3.5-turbo",
      retriever: "similarity-search",
      // gradingPrompt: "Fast",
      numNeighbors: 3,
      files: [],
    },
  });

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 400 }}
        >
          <Sidebar form={form} />
          <br />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color="gray"
                mr="xl"
              />
            </MediaQuery>
            <Text size={mobileWidth === true ? "14px" : "xl"}>
              Auto Evaluator
            </Text>
          </div>
        </Header>
      }
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
