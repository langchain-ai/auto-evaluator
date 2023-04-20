"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HotlinkedText = void 0;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _getWordsAndWhitespaces = require("./get-words-and-whitespaces");
const linkRegex = /https?:\/\/[^\s/$.?#].[^\s"]*/i;
const HotlinkedText = function HotlinkedText(props) {
    const { text  } = props;
    const wordsAndWhitespaces = (0, _getWordsAndWhitespaces).getWordsAndWhitespaces(text);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, linkRegex.test(text) ? wordsAndWhitespaces.map((word, index)=>{
        if (linkRegex.test(word)) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, {
                key: `link-${index}`
            }, /*#__PURE__*/ _react.default.createElement("a", {
                href: word
            }, word));
        }
        return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, {
            key: `text-${index}`
        }, word);
    }) : text);
};
exports.HotlinkedText = HotlinkedText;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=index.js.map