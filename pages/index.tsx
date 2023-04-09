import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Slider,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import Body from "../components/Body";

const HomePage = () => {
  const [opened, setOpened] = useState(false);
  const mobileWidth = useMediaQuery("(max-width: 390px)");
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text fz="xl">Inputs Pane</Text>
          <Text fz="md">Number of eval questions</Text>
          <Slider
            // label="Number of eval questions"
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
              Evaluator AI - evaluate your QA chains.
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
      <Body />
    </AppShell>
  );
};
export default HomePage;
