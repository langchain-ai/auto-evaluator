"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.styles = void 0;
var _noopTemplate = require("../../helpers/noop-template");
const styles = _noopTemplate.noop`
  [data-nextjs-terminal] {
    border-radius: var(--size-gap-half);
    background-color: var(--color-ansi-bg);
    color: var(--color-ansi-fg);
  }
  [data-nextjs-terminal]::selection,
  [data-nextjs-terminal] *::selection {
    background-color: var(--color-ansi-selection);
  }
  [data-nextjs-terminal] * {
    color: inherit;
    background-color: transparent;
    font-family: var(--font-stack-monospace);
  }
  [data-nextjs-terminal] > * {
    margin: 0;
    padding: calc(var(--size-gap) + var(--size-gap-half))
      calc(var(--size-gap-double) + var(--size-gap-half));
  }

  [data-nextjs-terminal] pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  [data-with-open-in-editor-link] svg {
    width: auto;
    height: var(--size-font-small);
    margin-left: var(--size-gap);
  }
  [data-with-open-in-editor-link] {
    cursor: pointer;
  }
  [data-with-open-in-editor-link]:hover {
    text-decoration: underline dotted;
  }
  [data-with-open-in-editor-link] {
    margin-left: var(--size-gap-double);
  }
  [data-nextjs-terminal] a {
    color: inherit;
  }
`;
exports.styles = styles;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=styles.js.map