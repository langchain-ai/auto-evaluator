'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var react = require('@emotion/react');
var defaultTheme = require('./default-theme.js');
var GlobalStyles = require('./GlobalStyles.js');
var MantineCssVariables = require('./MantineCssVariables.js');
var mergeTheme = require('./utils/merge-theme/merge-theme.js');
var filterProps = require('./utils/filter-props/filter-props.js');
var NormalizeCSS = require('./NormalizeCSS.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const MantineProviderContext = React.createContext({
  theme: defaultTheme.DEFAULT_THEME
});
function useMantineTheme() {
  var _a;
  return ((_a = React.useContext(MantineProviderContext)) == null ? void 0 : _a.theme) || defaultTheme.DEFAULT_THEME;
}
function useMantineProviderStyles(component) {
  const theme = useMantineTheme();
  const getStyles = (name) => {
    var _a, _b, _c, _d;
    return {
      styles: ((_a = theme.components[name]) == null ? void 0 : _a.styles) || {},
      classNames: ((_b = theme.components[name]) == null ? void 0 : _b.classNames) || {},
      variants: (_c = theme.components[name]) == null ? void 0 : _c.variants,
      sizes: (_d = theme.components[name]) == null ? void 0 : _d.sizes
    };
  };
  if (Array.isArray(component)) {
    return component.map(getStyles);
  }
  return [getStyles(component)];
}
function useMantineEmotionCache() {
  var _a;
  return (_a = React.useContext(MantineProviderContext)) == null ? void 0 : _a.emotionCache;
}
function useComponentDefaultProps(component, defaultProps, props) {
  var _a;
  const theme = useMantineTheme();
  const contextPropsPayload = (_a = theme.components[component]) == null ? void 0 : _a.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return __spreadValues(__spreadValues(__spreadValues({}, defaultProps), contextProps), filterProps.filterProps(props));
}
function MantineProvider({
  theme,
  emotionCache,
  withNormalizeCSS = false,
  withGlobalStyles = false,
  withCSSVariables = false,
  inherit = false,
  children
}) {
  const ctx = React.useContext(MantineProviderContext);
  const mergedTheme = mergeTheme.mergeThemeWithFunctions(defaultTheme.DEFAULT_THEME, inherit ? __spreadValues(__spreadValues({}, ctx.theme), theme) : theme);
  return /* @__PURE__ */ React__default.createElement(react.ThemeProvider, {
    theme: mergedTheme
  }, /* @__PURE__ */ React__default.createElement(MantineProviderContext.Provider, {
    value: { theme: mergedTheme, emotionCache }
  }, withNormalizeCSS && /* @__PURE__ */ React__default.createElement(NormalizeCSS.NormalizeCSS, null), withGlobalStyles && /* @__PURE__ */ React__default.createElement(GlobalStyles.GlobalStyles, {
    theme: mergedTheme
  }), withCSSVariables && /* @__PURE__ */ React__default.createElement(MantineCssVariables.MantineCssVariables, {
    theme: mergedTheme
  }), typeof mergedTheme.globalStyles === "function" && /* @__PURE__ */ React__default.createElement(react.Global, {
    styles: mergedTheme.globalStyles(mergedTheme)
  }), children));
}
MantineProvider.displayName = "@mantine/core/MantineProvider";

exports.MantineProvider = MantineProvider;
exports.useComponentDefaultProps = useComponentDefaultProps;
exports.useMantineEmotionCache = useMantineEmotionCache;
exports.useMantineProviderStyles = useMantineProviderStyles;
exports.useMantineTheme = useMantineTheme;
//# sourceMappingURL=MantineProvider.js.map
