import React, { createContext, useContext } from 'react';

const ColorSchemeContext = createContext(null);
function useMantineColorScheme() {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx) {
    throw new Error("useMantineColorScheme hook was called outside of context, make sure your app is wrapped with ColorSchemeProvider component");
  }
  return ctx;
}
function ColorSchemeProvider({
  colorScheme,
  toggleColorScheme,
  children
}) {
  return /* @__PURE__ */ React.createElement(ColorSchemeContext.Provider, {
    value: { colorScheme, toggleColorScheme }
  }, children);
}
ColorSchemeProvider.displayName = "@mantine/core/ColorSchemeProvider";

export { ColorSchemeProvider, useMantineColorScheme };
//# sourceMappingURL=ColorSchemeProvider.js.map
