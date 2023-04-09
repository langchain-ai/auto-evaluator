import React from "react";
export function Meta({ name , property , content , media  }) {
    if (typeof content !== "undefined" && content !== null && content !== "") {
        return /*#__PURE__*/ React.createElement("meta", Object.assign({}, name ? {
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
function ExtendMeta({ content , namePrefix , propertyPrefix  }) {
    const keyPrefix = namePrefix || propertyPrefix;
    if (!content) return null;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, Object.entries(content).map(([k, v], index)=>{
        return typeof v === "undefined" ? null : /*#__PURE__*/ React.createElement(Meta, Object.assign({
            key: keyPrefix + ":" + k + "_" + index
        }, propertyPrefix ? {
            property: propertyPrefix === "og:image" && k === "url" ? "og:image" : propertyPrefix + ":" + k
        } : {
            name: namePrefix + ":" + k
        }, {
            content: typeof v === "string" ? v : v == null ? void 0 : v.toString()
        }));
    }));
}
export function MultiMeta({ propertyPrefix , namePrefix , contents  }) {
    if (typeof contents === "undefined" || contents === null) {
        return null;
    }
    const keyPrefix = propertyPrefix || namePrefix;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, contents.map((content, index)=>{
        if (typeof content === "string" || typeof content === "number" || content instanceof URL) {
            return /*#__PURE__*/ React.createElement(Meta, Object.assign({
                key: keyPrefix + "_" + index
            }, propertyPrefix ? {
                property: propertyPrefix
            } : {
                name: namePrefix
            }, {
                content: content
            }));
        } else {
            return /*#__PURE__*/ React.createElement(ExtendMeta, {
                key: keyPrefix + "_" + index,
                namePrefix: namePrefix,
                propertyPrefix: propertyPrefix,
                content: content
            });
        }
    }));
}

//# sourceMappingURL=meta.js.map