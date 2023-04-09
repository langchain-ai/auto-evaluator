"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Meta = Meta;
exports.MultiMeta = MultiMeta;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function Meta({ name , property , content , media  }) {
    if (typeof content !== "undefined" && content !== null && content !== "") {
        return /*#__PURE__*/ _react.default.createElement("meta", Object.assign({}, name ? {
            name
        } : {
            property
        }, media ? {
            media
        } : undefined, {
            content: typeof content === "string" ? content : content.toString()
        }));
    }
    return null;
}
function camelToSnake(camelCaseStr) {
    return camelCaseStr.replace(/([A-Z])/g, function(match) {
        return "_" + match.toLowerCase();
    });
}
function getMetaKey(prefix, key) {
    // Use `twitter:image` and `og:image` instead of `twitter:image:url` and `og:image:url`
    // to be more compatible as it's a more common format
    if ((prefix === "og:image" || prefix === "twitter:image") && key === "url") {
        return prefix;
    }
    if (prefix.startsWith("og:") || prefix.startsWith("twitter:")) {
        key = camelToSnake(key);
    }
    return prefix + ":" + key;
}
function ExtendMeta({ content , namePrefix , propertyPrefix  }) {
    const keyPrefix = namePrefix || propertyPrefix;
    if (!content) return null;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, Object.entries(content).map(([k, v], index)=>{
        return typeof v === "undefined" ? null : /*#__PURE__*/ _react.default.createElement(Meta, Object.assign({
            key: keyPrefix + ":" + k + "_" + index
        }, propertyPrefix && {
            property: getMetaKey(propertyPrefix, k)
        }, namePrefix && {
            name: getMetaKey(namePrefix, k)
        }, {
            content: typeof v === "string" ? v : v == null ? void 0 : v.toString()
        }));
    }));
}
function MultiMeta({ propertyPrefix , namePrefix , contents  }) {
    if (typeof contents === "undefined" || contents === null) {
        return null;
    }
    const keyPrefix = propertyPrefix || namePrefix;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, contents.map((content, index)=>{
        if (typeof content === "string" || typeof content === "number" || content instanceof URL) {
            return /*#__PURE__*/ _react.default.createElement(Meta, Object.assign({
                key: keyPrefix + "_" + index
            }, propertyPrefix ? {
                property: propertyPrefix
            } : {
                name: namePrefix
            }, {
                content: content
            }));
        } else {
            return /*#__PURE__*/ _react.default.createElement(ExtendMeta, {
                key: keyPrefix + "_" + index,
                namePrefix: namePrefix,
                propertyPrefix: propertyPrefix,
                content: content
            });
        }
    }));
}

//# sourceMappingURL=meta.js.map