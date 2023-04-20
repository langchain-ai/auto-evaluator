"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditorLink = EditorLink;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _useOpenInEditor = require("../../helpers/use-open-in-editor");
function EditorLink({ file  }) {
    const open = (0, _useOpenInEditor).useOpenInEditor({
        file,
        column: 1,
        lineNumber: 1
    });
    return /*#__PURE__*/ _react.default.createElement("div", {
        "data-with-open-in-editor-link": true,
        tabIndex: 10,
        role: 'link',
        onClick: open,
        title: 'Click to open in your editor'
    }, file, /*#__PURE__*/ _react.default.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, /*#__PURE__*/ _react.default.createElement("path", {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }), /*#__PURE__*/ _react.default.createElement("polyline", {
        points: "15 3 21 3 21 9"
    }), /*#__PURE__*/ _react.default.createElement("line", {
        x1: "10",
        y1: "14",
        x2: "21",
        y2: "3"
    })));
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=EditorLink.js.map