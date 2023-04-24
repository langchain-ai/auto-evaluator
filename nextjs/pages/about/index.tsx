import React from "react";
import HeaderEvaluator, { MenuItem } from "../../components/HeaderEvaluator";
import { UserCardImage } from "../../components/PersonCard";
import { Center, Group } from "@mantine/core";

const AboutPage = () => {
  return (
    <>
      <HeaderEvaluator activeTab={MenuItem.About} />
      <Center>
        <Group pt={100}>
          <UserCardImage
            avatar="https://avatars.githubusercontent.com/u/122662504?v=4"
            name="Lance"
            job="Tech Lead @ Nuro"
            twitterHandle="RLanceMartin"
            githubHandle="PineappleExpress808"
          />
          <UserCardImage
            avatar="https://avatars.githubusercontent.com/u/10562358?v=4"
            name="Danil"
            job="Founding Eng @ Shepherd"
            twitterHandle="sfgunslinger"
            githubHandle="dankolesnikov"
          />
          <UserCardImage
            avatar="https://pbs.twimg.com/profile_images/1508934858990505986/-bPAFfFU_400x400.png"
            name="Ben"
            job="Software @ Rainbow"
            twitterHandle="thebengoldberg"
            githubHandle="benisgold"
          />
        </Group>
      </Center>
    </>
  );
};
export default AboutPage;
