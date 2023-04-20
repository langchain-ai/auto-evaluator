function dimmed(theme) {
  return () => theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
}

export { dimmed };
//# sourceMappingURL=dimmed.js.map
