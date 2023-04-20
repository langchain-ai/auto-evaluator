"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GroupedStackFrames = GroupedStackFrames;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _callStackFrame = require("./CallStackFrame");
var _frameworkIcon = require("./FrameworkIcon");
function FrameworkGroup({ framework , stackFrames , all  }) {
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("details", {
        "data-nextjs-collapsed-call-stack-details": true
    }, /*#__PURE__*/ _react.default.createElement("summary", {
        tabIndex: 10
    }, /*#__PURE__*/ _react.default.createElement("svg", {
        "data-nextjs-call-stack-chevron-icon": true,
        fill: "none",
        height: "20",
        width: "20",
        shapeRendering: "geometricPrecision",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/ _react.default.createElement("path", {
        d: "M9 18l6-6-6-6"
    })), /*#__PURE__*/ _react.default.createElement(_frameworkIcon.FrameworkIcon, {
        framework: framework
    }), framework === 'react' ? 'React' : 'Next.js'), stackFrames.map((frame, index)=>/*#__PURE__*/ _react.default.createElement(_callStackFrame.CallStackFrame, {
            key: `call-stack-${index}-${all}`,
            frame: frame
        }))));
}
function GroupedStackFrames({ groupedStackFrames , all  }) {
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, groupedStackFrames.map((stackFramesGroup, groupIndex)=>{
        // Collapse React and Next.js frames
        if (stackFramesGroup.framework) {
            return /*#__PURE__*/ _react.default.createElement(FrameworkGroup, {
                key: `call-stack-framework-group-${groupIndex}-${all}`,
                framework: stackFramesGroup.framework,
                stackFrames: stackFramesGroup.stackFrames,
                all: all
            });
        }
        return(// Don't group non React and Next.js frames
        stackFramesGroup.stackFrames.map((frame, frameIndex)=>/*#__PURE__*/ _react.default.createElement(_callStackFrame.CallStackFrame, {
                key: `call-stack-${groupIndex}-${frameIndex}-${all}`,
                frame: frame
            })));
    }));
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=GroupedStackFrames.js.map