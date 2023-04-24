import { Group, Header, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import githubIcon from "../public/github-mark.svg";
// import slackIcon from "../public/slack-mark.svg";
import { useMediaQuery } from "@mantine/hooks";

export enum MenuItem {
  Demo = "Demo",
  Playground = "Playground",
  About = "About",
}

const HeaderEvaluator = ({ activeTab }: { activeTab: MenuItem }) => {
  const mobileWidth = useMediaQuery("(max-width: 390px)");
  // const [activeTab, setActive] = React.useState<MenuItem>(null);
  const borderBottom = "1px solid #000";

  return (
    <Header height={{ base: "75px" }}>
      <Stack justify="center" p="15px" pr={"25px"}>
        <Group position="apart">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text
              variant="gradient"
              gradient={{ from: "blue", to: "#bf2015" }}
              size={mobileWidth === true ? "14px" : "28px"}
            >
              Auto-Evaluator
            </Text>
          </Link>
          <Group>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                borderBottom: activeTab === MenuItem.Demo ? borderBottom : null,
              }}
              // onClick={() => setActive(MenuItem.Demo)}
            >
              <Text c="black">Demo</Text>
            </Link>
            <Link
              href="/playground"
              style={{
                textDecoration: "none",
                borderBottom:
                  activeTab === MenuItem.Playground ? borderBottom : null,
              }}
              // onClick={() => setActive(MenuItem.Playground)}
            >
              <Text c="black">Playground</Text>
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
            <Link
              style={{
                textDecoration: "none",
                borderBottom:
                  activeTab === MenuItem.About ? borderBottom : null,
              }}
              // onClick={() => setActive(MenuItem.About)}
              href="/about"
            >
              <Text c="black">About</Text>
            </Link>
            {/* <Group spacing={0}> */}
            <Link
              href={"https://github.com/dankolesnikov/evaluator-app"}
              target="_blank"
            >
              <Image src={githubIcon} alt="github" width={30} height={30} />
            </Link>
            {/* <Link
              href={
                "https://join.slack.com/t/slack-ttf2018/shared_invite/zt-1toh7vyoy-pdo7LR15NlYhUWbuTS44cg"
              }
              target="_blank"
              >
              <Image src={slackIcon} alt="slack" width={60} height={60} />
            </Link> */}
            {/* </Group> */}
          </Group>
        </Group>
      </Stack>
    </Header>
  );
};
export default HeaderEvaluator;
