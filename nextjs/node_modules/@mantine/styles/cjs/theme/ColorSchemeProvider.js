'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ColorSchemeContext = React.createContext(null);
function useMantineColorScheme() {
  const ctx = React.useContext(ColorSchemeContext);
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
  return /* @__PURE__ */ React__default.createElement(ColorSchemeContext.Provider, {
    value: { colorScheme, toggleColorScheme }
  }, children);
}
ColorSchemeProvider.displayName = "@mantine/core/ColorSchemeProvider";

exports.ColorSchemeProvider = ColorSchemeProvider;
exports.useMantineColorScheme = useMantineColorScheme;
//# sourceMappingURL=ColorSchemeProvider.js.map
