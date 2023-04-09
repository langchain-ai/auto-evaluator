"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MetadataTree = MetadataTree;
var _react = _interopRequireDefault(require("react"));
var _basic = require("./generate/basic");
var _alternate = require("./generate/alternate");
var _opengraph = require("./generate/opengraph");
var _icons = require("./generate/icons");
var _resolveMetadata = require("./resolve-metadata");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function MetadataTree({ metadata , pathname  }) {
    const options = {
        pathname
    };
    const resolved = await (0, _resolveMetadata).accumulateMetadata(metadata, options);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_basic.BasicMetadata, {
        metadata: resolved
    }), /*#__PURE__*/ _react.default.createElement(_alternate.AlternatesMetadata, {
        alternates: resolved.alternates
    }), /*#__PURE__*/ _react.default.createElement(_basic.ItunesMeta, {
        itunes: resolved.itunes
    }), /*#__PURE__*/ _react.default.createElement(_basic.FormatDetectionMeta, {
        formatDetection: resolved.formatDetection
    }), /*#__PURE__*/ _react.default.createElement(_basic.VerificationMeta, {
        verification: resolved.verification
    }), /*#__PURE__*/ _react.default.createElement(_basic.AppleWebAppMeta, {
        appleWebApp: resolved.appleWebApp
    }), /*#__PURE__*/ _react.default.createElement(_opengraph.OpenGraphMetadata, {
        openGraph: resolved.openGraph
    }), /*#__PURE__*/ _react.default.createElement(_opengraph.TwitterMetadata, {
        twitter: resolved.twitter
    }), /*#__PURE__*/ _react.default.createElement(_opengraph.AppLinksMeta, {
        appLinks: resolved.appLinks
    }), /*#__PURE__*/ _react.default.createElement(_icons.IconsMetadata, {
        icons: resolved.icons
    }));
}

//# sourceMappingURL=metadata.js.map