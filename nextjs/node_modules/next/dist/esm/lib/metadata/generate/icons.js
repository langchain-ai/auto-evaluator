import React from "react";
function IconDescriptorLink({ icon  }) {
    const { url , rel ="icon" , ...props } = icon;
    return /*#__PURE__*/ React.createElement("link", Object.assign({
        rel: rel,
        href: url.toString()
    }, props));
}
function IconLink({ rel , icon  }) {
    if (typeof icon === "object" && !(icon instanceof URL)) {
        if (rel) icon.rel = rel;
        return /*#__PURE__*/ React.createElement(IconDescriptorLink, {
            icon: icon
        });
    } else {
        const href = icon.toString();
        return /*#__PURE__*/ React.createElement("link", {
            rel: rel,
            href: href
        });
    }
}
export function IconsMetadata({ icons  }) {
    if (!icons) return null;
    const shortcutList = icons.shortcut;
    const iconList = icons.icon;
    const appleList = icons.apple;
    const otherList = icons.other;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, shortcutList ? shortcutList.map((icon, index)=>/*#__PURE__*/ React.createElement(IconLink, {
            key: `shortcut-${index}`,
            rel: "shortcut icon",
            icon: icon
        })) : null, iconList ? iconList.map((icon, index)=>/*#__PURE__*/ React.createElement(IconLink, {
            key: `shortcut-${index}`,
            rel: "icon",
            icon: icon
        })) : null, appleList ? appleList.map((icon, index)=>/*#__PURE__*/ React.createElement(IconLink, {
            key: `apple-${index}`,
            rel: "apple-touch-icon",
            icon: icon
        })) : null, otherList ? otherList.map((icon, index)=>/*#__PURE__*/ React.createElement(IconDescriptorLink, {
            key: `other-${index}`,
            icon: icon
        })) : null);
}

//# sourceMappingURL=icons.js.map