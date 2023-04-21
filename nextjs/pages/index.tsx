import {
  AppShell,
  Burger,
  Group,
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
import Image from "next/image";
import { useRouter } from "next/router";
import githubIcon from "../public/github-mark.svg";
import slackIcon from "../public/slack-mark.svg";
import Link from "next/link";

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

  const router = useRouter();

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
        <Header height={{ base: 50, md: 70 }}>
          <Group position="apart" pr={40} pl={20}>
            <Text size={mobileWidth === true ? "14px" : "xl"}>Evaluator</Text>
            <Group>
              <Link
                href={"https://github.com/dankolesnikov/evaluator-app"}
                target="_blank"
              >
                <Image src={githubIcon} alt="github" width={30} height={30} />
              </Link>
              <Link
                href={
                  "https://join.slack.com/t/slack-ttf2018/shared_invite/zt-1toh7vyoy-pdo7LR15NlYhUWbuTS44cg"
                }
                target="_blank"
              >
                <Image src={slackIcon} alt="slack" width={60} height={60} />
              </Link>
            </Group>
          </Group>
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
