import { Group, Header, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import githubIcon from "../public/github-mark.svg";
import slackIcon from "../public/slack-mark.svg";
import { useMediaQuery } from "@mantine/hooks";

const HeaderEvaluator = () => {
  const mobileWidth = useMediaQuery("(max-width: 390px)");

  return (
    <Header height={{ base: 50, md: 70 }}>
      <Group position="apart" pr={40} pl={20} pt={4}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text
            variant="gradient"
            gradient={{ from: "blue", to: "#bf2015" }}
            size={mobileWidth === true ? "14px" : "28px"}
          >
            Evaluator
          </Text>
        </Link>
        <Group>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text c="black">Home</Text>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            href={
              "https://github.com/dankolesnikov/evaluator-app/blob/main/README.md"
            }
            target="_blank"
          >
            <Text c="black">Docs</Text>
          </Link>
          <Link style={{ textDecoration: "none" }} href="/about">
            <Text c="black">About</Text>
          </Link>
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
  );
};
export default HeaderEvaluator;
