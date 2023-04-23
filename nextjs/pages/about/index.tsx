import React from "react";
import HeaderEvaluator from "../../components/HeaderEvaluator";
import { UserCardImage } from "../../components/PersonCard";
import { Group } from "@mantine/core";
import Danil from "../../public/team/danil.jpg";

const AboutPage = () => {
  return (
    <>
      <HeaderEvaluator />
      <Group>
        <UserCardImage
          avatar="../../public/team/danil.jpg"
          name="Danil"
          job="Founding Eng @ Shepherd"
          twitterHandle="sfgunslinger"
          githubHandle="dankolesnikov"
        />
      </Group>
    </>
  );
};
export default AboutPage;
