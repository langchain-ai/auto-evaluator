"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.raw = void 0;
var _loaderUtils3 = _interopRequireDefault(require("next/dist/compiled/loader-utils3"));
var _imageOptimizer = require("../../../server/image-optimizer");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const mimeTypeMap = {
    jpeg: "image/jpeg",
    png: "image/png",
    ico: "image/x-icon",
    svg: "image/svg+xml",
    avif: "image/avif",
    webp: "image/webp"
};
async function nextMetadataImageLoader(content) {
    const options = this.getOptions();
    const { assetPrefix , isDev , numericSizes  } = options;
    const context = this.rootContext;
    const opts = {
        context,
        content
    };
    // e.g. icon.png -> server/static/media/metadata/icon.399de3b9.png
    const interpolatedName = _loaderUtils3.default.interpolateName(this, "/static/media/metadata/[name].[hash:8].[ext]", opts);
    const outputPath = assetPrefix + "/_next" + interpolatedName;
    let extension = _loaderUtils3.default.interpolateName(this, "[ext]", opts);
    if (extension === "jpg") {
        extension = "jpeg";
    }
    const imageSize = await (0, _imageOptimizer).getImageSize(content, extension).catch((err)=>err);
    if (imageSize instanceof Error) {
        const err = imageSize;
        err.name = "InvalidImageFormatError";
        throw err;
    }
    const imageData = {
        url: outputPath,
        ...extension in mimeTypeMap && {
            type: mimeTypeMap[extension]
        },
        ...numericSizes ? {
            width: imageSize.width,
            height: imageSize.height
        } : {
            sizes: extension === "ico" ? "any" : `${imageSize.width}x${imageSize.height}`
        }
    };
    const stringifiedData = JSON.stringify(imageData);
    this.emitFile(`../${isDev ? "" : "../"}${interpolatedName}`, content, null);
    return `export default ${stringifiedData};`;
}
const raw = true;
exports.raw = raw;
var _default = nextMetadataImageLoader;
exports.default = _default;

//# sourceMappingURL=next-metadata-image-loader.js.map