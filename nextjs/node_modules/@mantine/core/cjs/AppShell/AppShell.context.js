'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const AppShellContext = React.createContext({
  zIndex: 1e3,
  fixed: false,
  layout: "default"
});
const AppShellProvider = AppShellContext.Provider;
function useAppShellContext() {
  return React.useContext(AppShellContext);
}

exports.AppShellProvider = AppShellProvider;
exports.useAppShellContext = useAppShellContext;
//# sourceMappingURL=AppShell.context.js.map
