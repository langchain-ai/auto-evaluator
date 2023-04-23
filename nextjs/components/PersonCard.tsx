import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  rem,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import githubIcon from "../public/github-mark.svg";
import twitterBlackIcon from "../public/twitter-black.svg";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  avatar: string;
  name: string;
  job: string;
  twitterHandle: string;
  githubHandle: string;
}

export function UserCardImage({
  avatar,
  name,
  job,
  twitterHandle,
  githubHandle,
}: UserCardImageProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Stack>
        <Avatar
          src={avatar}
          size={185}
          radius={80}
          mx="auto"
          className={classes.avatar}
        />
        <div>
          <Text ta="center" fz="lg" fw={500} mt="sm">
            {name}
          </Text>
          <Text ta="center" fz="sm" c="dimmed">
            {job}
          </Text>
        </div>
        <Group position="center">
          <Link href={`https://twitter.com/${twitterHandle}`} target="_blank">
            <Image src={twitterBlackIcon} alt="github" width={30} height={30} />
          </Link>
          <Link href={`https://github.com/${githubHandle}`} target="_blank">
            <Image src={githubIcon} alt="github" width={30} height={30} />
          </Link>
        </Group>
      </Stack>
    </Card>
  );
}
