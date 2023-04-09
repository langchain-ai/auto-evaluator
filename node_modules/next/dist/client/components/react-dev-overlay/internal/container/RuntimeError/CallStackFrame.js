"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CallStackFrame = void 0;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _stackFrame = require("../../helpers/stack-frame");
var _useOpenInEditor = require("../../helpers/use-open-in-editor");
const CallStackFrame = function CallStackFrame({ frame  }) {
    var _originalStackFrame;
    // TODO: ability to expand resolved frames
    // TODO: render error or external indicator
    const f = (_originalStackFrame = frame.originalStackFrame) != null ? _originalStackFrame : frame.sourceStackFrame;
    const hasSource = Boolean(frame.originalCodeFrame);
    const open = (0, _useOpenInEditor).useOpenInEditor(hasSource ? {
        file: f.file,
        lineNumber: f.lineNumber,
        column: f.column
    } : undefined);
    return /*#__PURE__*/ _react.default.createElement("div", {
        "data-nextjs-call-stack-frame": true
    }, /*#__PURE__*/ _react.default.createElement("h6", {
        "data-nextjs-frame-expanded": Boolean(frame.expanded)
    }, f.methodName), /*#__PURE__*/ _react.default.createElement("div", {
        "data-has-source": hasSource ? 'true' : undefined,
        tabIndex: hasSource ? 10 : undefined,
        role: hasSource ? 'link' : undefined,
        onClick: open,
        title: hasSource ? 'Click to open in your editor' : undefined
    }, /*#__PURE__*/ _react.default.createElement("span", null, (0, _stackFrame).getFrameSource(f)), /*#__PURE__*/ _react.default.createElement("svg", {
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
    }))));
};
exports.CallStackFrame = CallStackFrame;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=CallStackFrame.js.map