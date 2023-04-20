'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function createSafeContext(errorMessage) {
  const Context = React.createContext(null);
  const useSafeContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };
  const Provider = ({ children, value }) => /* @__PURE__ */ React__default.createElement(Context.Provider, {
    value
  }, children);
  return [Provider, useSafeContext];
}

exports.createSafeContext = createSafeContext;
//# sourceMappingURL=create-safe-context.js.map
