"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.raw = void 0;
var _loaderUtils3 = _interopRequireDefault(require("next/dist/compiled/loader-utils3"));
var _imageOptimizer = require("../../../../server/image-optimizer");
var _blur = require("./blur");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function nextImageLoader(content) {
    const imageLoaderSpan = this.currentTraceSpan.traceChild("next-image-loader");
    return imageLoaderSpan.traceAsyncFn(async ()=>{
        const options = this.getOptions();
        const { isServer , isDev , assetPrefix , basePath  } = options;
        const context = this.rootContext;
        const opts = {
            context,
            content
        };
        const interpolatedName = _loaderUtils3.default.interpolateName(this, "/static/media/[name].[hash:8].[ext]", opts);
        const outputPath = assetPrefix + "/_next" + interpolatedName;
        let extension = _loaderUtils3.default.interpolateName(this, "[ext]", opts);
        if (extension === "jpg") {
            extension = "jpeg";
        }
        const imageSizeSpan = imageLoaderSpan.traceChild("image-size-calculation");
        const imageSize = await imageSizeSpan.traceAsyncFn(()=>(0, _imageOptimizer).getImageSize(content, extension).catch((err)=>err));
        if (imageSize instanceof Error) {
            const err = imageSize;
            err.name = "InvalidImageFormatError";
            throw err;
        }
        const { dataURL: blurDataURL , width: blurWidth , height: blurHeight ,  } = await (0, _blur).getBlurImage(content, extension, imageSize, {
            basePath,
            outputPath,
            isDev,
            tracing: imageLoaderSpan.traceChild.bind(imageLoaderSpan)
        });
        const stringifiedData = imageLoaderSpan.traceChild("image-data-stringify").traceFn(()=>JSON.stringify({
                src: outputPath,
                height: imageSize.height,
                width: imageSize.width,
                blurDataURL,
                blurWidth,
                blurHeight
            }));
        if (isServer) {
            this.emitFile(`../${isDev ? "" : "../"}${interpolatedName}`, content, null);
        } else {
            this.emitFile(interpolatedName, content, null);
        }
        return `export default ${stringifiedData};`;
    });
}
const raw = true;
exports.raw = raw;
var _default = nextImageLoader;
exports.default = _default;

//# sourceMappingURL=index.js.map