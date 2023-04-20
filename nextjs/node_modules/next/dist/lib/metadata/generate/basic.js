"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicMetadata = BasicMetadata;
exports.ItunesMeta = ItunesMeta;
exports.FormatDetectionMeta = FormatDetectionMeta;
exports.AppleWebAppMeta = AppleWebAppMeta;
exports.VerificationMeta = VerificationMeta;
var _react = _interopRequireDefault(require("react"));
var _meta = require("./meta");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function BasicMetadata({ metadata  }) {
    var ref, ref1, ref2;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("meta", {
        charSet: "utf-8"
    }), metadata.title !== null && metadata.title.absolute ? /*#__PURE__*/ _react.default.createElement("title", null, metadata.title.absolute) : null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "description",
        content: metadata.description
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "application-name",
        content: metadata.applicationName
    }), metadata.authors ? metadata.authors.map((author, index)=>/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, {
            key: index
        }, author.url && /*#__PURE__*/ _react.default.createElement("link", {
            rel: "author",
            href: author.url.toString()
        }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            name: "author",
            content: author.name
        }))) : null, metadata.manifest ? /*#__PURE__*/ _react.default.createElement("link", {
        rel: "manifest",
        href: metadata.manifest.toString()
    }) : null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "generator",
        content: metadata.generator
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "keywords",
        content: (ref = metadata.keywords) == null ? void 0 : ref.join(",")
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "referrer",
        content: metadata.referrer
    }), metadata.themeColor ? metadata.themeColor.map((themeColor, index)=>/*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            key: index,
            name: "theme-color",
            content: themeColor.color,
            media: themeColor.media
        })) : null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "color-scheme",
        content: metadata.colorScheme
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "viewport",
        content: metadata.viewport
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "creator",
        content: metadata.creator
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "publisher",
        content: metadata.publisher
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "robots",
        content: (ref1 = metadata.robots) == null ? void 0 : ref1.basic
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "googlebot",
        content: (ref2 = metadata.robots) == null ? void 0 : ref2.googleBot
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "abstract",
        content: metadata.abstract
    }), metadata.archives ? metadata.archives.map((archive)=>/*#__PURE__*/ _react.default.createElement("link", {
            rel: "archives",
            href: archive,
            key: archive
        })) : null, metadata.assets ? metadata.assets.map((asset)=>/*#__PURE__*/ _react.default.createElement("link", {
            rel: "assets",
            href: asset,
            key: asset
        })) : null, metadata.bookmarks ? metadata.bookmarks.map((bookmark)=>/*#__PURE__*/ _react.default.createElement("link", {
            rel: "bookmarks",
            href: bookmark,
            key: bookmark
        })) : null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "category",
        content: metadata.category
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "classification",
        content: metadata.classification
    }), metadata.other ? Object.entries(metadata.other).map(([name, content])=>/*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            key: name,
            name: name,
            content: Array.isArray(content) ? content.join(",") : content
        })) : null);
}
function ItunesMeta({ itunes  }) {
    if (!itunes) return null;
    const { appId , appArgument  } = itunes;
    let content = `app-id=${appId}`;
    if (appArgument) {
        content += `, app-argument=${appArgument}`;
    }
    return /*#__PURE__*/ _react.default.createElement("meta", {
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
function FormatDetectionMeta({ formatDetection  }) {
    if (!formatDetection) return null;
    let content = "";
    for (const key of formatDetectionKeys){
        if (key in formatDetection) {
            if (content) content += ", ";
            content += `${key}=no`;
        }
    }
    return /*#__PURE__*/ _react.default.createElement("meta", {
        name: "format-detection",
        content: content
    });
}
function AppleWebAppMeta({ appleWebApp  }) {
    if (!appleWebApp) return null;
    const { capable , title , startupImage , statusBarStyle  } = appleWebApp;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, capable ? /*#__PURE__*/ _react.default.createElement("meta", {
        name: "apple-mobile-web-app-capable",
        content: "yes"
    }) : null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "apple-mobile-web-app-title",
        content: title
    }), startupImage ? startupImage.map((image, index)=>/*#__PURE__*/ _react.default.createElement("link", {
            key: index,
            href: image.url,
            media: image.media,
            rel: "apple-touch-startup-image"
        })) : null, statusBarStyle ? /*#__PURE__*/ _react.default.createElement("meta", {
        name: "apple-mobile-web-app-status-bar-style",
        content: statusBarStyle
    }) : null);
}
function VerificationMeta({ verification  }) {
    if (!verification) return null;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        namePrefix: "google-site-verification",
        contents: verification.google
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        namePrefix: "y_key",
        contents: verification.yahoo
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        namePrefix: "yandex-verification",
        contents: verification.yandex
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        namePrefix: "me",
        contents: verification.me
    }), verification.other ? Object.entries(verification.other).map(([key, value], index)=>/*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
            key: key + index,
            namePrefix: key,
            contents: value
        })) : null);
}

//# sourceMappingURL=basic.js.map