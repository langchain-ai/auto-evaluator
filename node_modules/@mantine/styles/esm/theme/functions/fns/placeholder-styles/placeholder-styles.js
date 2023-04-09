function placeholderStyles(theme) {
  return () => ({
    userSelect: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  });
}

export { placeholderStyles };
//# sourceMappingURL=placeholder-styles.js.map
