import {
  createStyles,
  Card,
  Avatar,
  Text,
  Group,
  Button,
  rem,
} from "@mantine/core";

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
      <Card.Section sx={{ height: 140 }} />
      <Avatar
        src={avatar}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {job}
      </Text>
      {/* <Group mt="md" position="center" spacing={30}>
        {items}
      </Group> */}
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
      >
        {twitterHandle}
      </Button>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
      >
        {githubHandle}
      </Button>
    </Card>
  );
}
