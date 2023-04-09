import React from "react";
import { Meta, MultiMeta } from "./meta";
export function BasicMetadata({ metadata  }) {
    var ref, ref1, ref2;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("meta", {
        charSet: "utf-8"
    }), metadata.title !== null && metadata.title.absolute ? /*#__PURE__*/ React.createElement("title", null, metadata.title.absolute) : null, /*#__PURE__*/ React.createElement(Meta, {
        name: "description",
        content: metadata.description
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "application-name",
        content: metadata.applicationName
    }), metadata.authors ? metadata.authors.map((author, index)=>/*#__PURE__*/ React.createElement(React.Fragment, {
            key: index
        }, author.url && /*#__PURE__*/ React.createElement("link", {
            rel: "author",
            href: author.url.toString()
        }), /*#__PURE__*/ React.createElement(Meta, {
            name: "author",
            content: author.name
        }))) : null, metadata.manifest ? /*#__PURE__*/ React.createElement("link", {
        rel: "manifest",
        href: metadata.manifest.toString()
    }) : null, /*#__PURE__*/ React.createElement(Meta, {
        name: "generator",
        content: metadata.generator
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "keywords",
        content: (ref = metadata.keywords) == null ? void 0 : ref.join(",")
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "referrer",
        content: metadata.referrer
    }), metadata.themeColor ? metadata.themeColor.map((themeColor, index)=>/*#__PURE__*/ React.createElement(Meta, {
            key: index,
            name: "theme-color",
            content: themeColor.color,
            media: themeColor.media
        })) : null, /*#__PURE__*/ React.createElement(Meta, {
        name: "color-scheme",
        content: metadata.colorScheme
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "viewport",
        content: metadata.viewport
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "creator",
        content: metadata.creator
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "publisher",
        content: metadata.publisher
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "robots",
        content: (ref1 = metadata.robots) == null ? void 0 : ref1.basic
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "googlebot",
        content: (ref2 = metadata.robots) == null ? void 0 : ref2.googleBot
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "abstract",
        content: metadata.abstract
    }), metadata.archives ? metadata.archives.map((archive)=>/*#__PURE__*/ React.createElement("link", {
            rel: "archives",
            href: archive,
            key: archive
        })) : null, metadata.assets ? metadata.assets.map((asset)=>/*#__PURE__*/ React.createElement("link", {
            rel: "assets",
            href: asset,
            key: asset
        })) : null, metadata.bookmarks ? metadata.bookmarks.map((bookmark)=>/*#__PURE__*/ React.createElement("link", {
            rel: "bookmarks",
            href: bookmark,
            key: bookmark
        })) : null, /*#__PURE__*/ React.createElement(Meta, {
        name: "category",
        content: metadata.category
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "classification",
        content: metadata.classification
    }), metadata.other ? Object.entries(metadata.other).map(([name, content])=>/*#__PURE__*/ React.createElement(Meta, {
            key: name,
            name: name,
            content: Array.isArray(content) ? content.join(",") : content
        })) : null);
}
export function ItunesMeta({ itunes  }) {
    if (!itunes) return null;
    const { appId , appArgument  } = itunes;
    let content = `app-id=${appId}`;
    if (appArgument) {
        content += `, app-argument=${appArgument}`;
    }
    return /*#__PURE__*/ React.createElement("meta", {
        name: "apple-itunes-app",
        content: content
    });
}
const formatDetectionKeys = [
    "telephone",
    "date",
    "address",
    "email",
    "url", 
];
export function FormatDetectionMeta({ formatDetection  }) {
    if (!formatDetection) return null;
    let content = "";
    for (const key of formatDetectionKeys){
        if (key in formatDetection) {
            if (content) content += ", ";
            content += `${key}=no`;
        }
    }
    return /*#__PURE__*/ React.createElement("meta", {
        name: "format-detection",
        content: content
    });
}
export function AppleWebAppMeta({ appleWebApp  }) {
    if (!appleWebApp) return null;
    const { capable , title , startupImage , statusBarStyle  } = appleWebApp;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, capable ? /*#__PURE__*/ React.createElement("meta", {
        name: "apple-mobile-web-app-capable",
        content: "yes"
    }) : null, /*#__PURE__*/ React.createElement(Meta, {
        name: "apple-mobile-web-app-title",
        content: title
    }), startupImage ? startupImage.map((image, index)=>/*#__PURE__*/ React.createElement("link", {
            key: index,
            href: image.url,
            media: image.media,
            rel: "apple-touch-startup-image"
        })) : null, statusBarStyle ? /*#__PURE__*/ React.createElement("meta", {
        name: "apple-mobile-web-app-status-bar-style",
        content: statusBarStyle
    }) : null);
}
export function VerificationMeta({ verification  }) {
    if (!verification) return null;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(MultiMeta, {
        namePrefix: "google-site-verification",
        contents: verification.google
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        namePrefix: "y_key",
        contents: verification.yahoo
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        namePrefix: "yandex-verification",
        contents: verification.yandex
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        namePrefix: "me",
        contents: verification.me
    }), verification.other ? Object.entries(verification.other).map(([key, value], index)=>/*#__PURE__*/ React.createElement(MultiMeta, {
            key: key + index,
            namePrefix: key,
            contents: value
        })) : null);
}

//# sourceMappingURL=basic.js.map