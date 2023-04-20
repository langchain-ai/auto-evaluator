import React from "react";
function AlternateLink({ descriptor , ...props }) {
    if (!descriptor.url) return null;
    return /*#__PURE__*/ React.createElement("link", Object.assign({}, props, descriptor.title && {
        title: descriptor.title
    }, {
        href: descriptor.url.toString()
    }));
}
export function AlternatesMetadata({ alternates  }) {
    if (!alternates) return null;
    const { canonical , languages , media , types  } = alternates;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, canonical ? /*#__PURE__*/ React.createElement(AlternateLink, {
        rel: "canonical",
        descriptor: canonical
    }) : null, languages ? Object.entries(languages).map(([locale, descriptors])=>{
        return descriptors == null ? void 0 : descriptors.map((descriptor, index)=>/*#__PURE__*/ React.createElement(AlternateLink, {
                rel: "alternate",
                key: index,
                hrefLang: locale,
                descriptor: descriptor
            }));
    }) : null, media ? Object.entries(media).map(([mediaName, descriptors])=>{
        return descriptors == null ? void 0 : descriptors.map((descriptor, index)=>/*#__PURE__*/ React.createElement(AlternateLink, {
                rel: "alternate",
                key: index,
                media: mediaName,
                descriptor: descriptor
            }));
    }) : null, types ? Object.entries(types).map(([type, descriptors])=>{
        return descriptors == null ? void 0 : descriptors.map((descriptor, index)=>/*#__PURE__*/ React.createElement(AlternateLink, {
                rel: "alternate",
                key: index,
                type: type,
                descriptor: descriptor
            }));
    }) : null);
}

//# sourceMappingURL=alternate.js.map