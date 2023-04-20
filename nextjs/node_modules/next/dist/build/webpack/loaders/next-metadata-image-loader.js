"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.raw = void 0;
var _path = _interopRequireDefault(require("path"));
var _loaderUtils3 = _interopRequireDefault(require("next/dist/compiled/loader-utils3"));
var _imageOptimizer = require("../../../server/image-optimizer");
var _mimeType = require("../../../lib/mime-type");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function nextMetadataImageLoader(content) {
    const options = this.getOptions();
    const { type , route , segment , pageExtensions  } = options;
    const numericSizes = type === "twitter" || type === "openGraph";
    const { resourcePath , rootContext: context  } = this;
    const { name: fileNameBase , ext  } = _path.default.parse(resourcePath);
    let extension = ext.slice(1);
    if (extension === "jpg") {
        extension = "jpeg";
    }
    const opts = {
        context,
        content
    };
    // No hash query for favicon.ico
    const contentHash = type === "favicon" ? "" : _loaderUtils3.default.interpolateName(this, "[contenthash]", opts);
    const interpolatedName = _loaderUtils3.default.interpolateName(this, "[name].[ext]", opts);
    const isDynamicResource = pageExtensions.includes(extension);
    const pageRoute = isDynamicResource ? fileNameBase : interpolatedName;
    const hashQuery = contentHash ? "?" + contentHash : "";
    if (isDynamicResource) {
        // re-export and spread as `exportedImageData` to avoid non-exported error
        return `\
    import path from 'next/dist/shared/lib/isomorphic/path'
    import * as exported from ${JSON.stringify(resourcePath)}
    import { interpolateDynamicPath } from 'next/dist/server/server-utils'
    import { getNamedRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex'
    import { getMetadataRouteSuffix } from 'next/dist/lib/metadata/get-metadata-route'

    const exportedImageData = { ...exported }
    export default (props) => {
      const pathname = ${JSON.stringify(route)}
      const routeRegex = getNamedRouteRegex(pathname, false)
      const segment = ${JSON.stringify(segment)}
      const route = interpolateDynamicPath(pathname, props.params, routeRegex)
      const suffix = getMetadataRouteSuffix(segment)
      const routeSuffix = suffix ? \`-\${suffix}\` : ''

      const imageData = {
        alt: exportedImageData.alt,
        type: exportedImageData.contentType || 'image/png',
        url: path.join(route, ${JSON.stringify(pageRoute)} + routeSuffix + ${JSON.stringify(hashQuery)}),
      }
      const { size } = exportedImageData
      if (size) {
        ${type === "twitter" || type === "openGraph" ? "imageData.width = size.width; imageData.height = size.height;" : 'imageData.sizes = size.width + "x" + size.height;'}
      }
      return imageData
    }`;
    }
    const imageSize = await (0, _imageOptimizer).getImageSize(content, extension).catch((err)=>err);
    if (imageSize instanceof Error) {
        const err = imageSize;
        err.name = "InvalidImageFormatError";
        throw err;
    }
    const imageData = {
        ...extension in _mimeType.imageExtMimeTypeMap && {
            type: _mimeType.imageExtMimeTypeMap[extension]
        },
        ...numericSizes ? {
            width: imageSize.width,
            height: imageSize.height
        } : {
            sizes: extension === "ico" ? "any" : `${imageSize.width}x${imageSize.height}`
        }
    };
    return `\
  import path from 'next/dist/shared/lib/isomorphic/path'
  import { interpolateDynamicPath } from 'next/dist/server/server-utils'
  import { getNamedRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex'

  export default (props) => {
    const pathname = ${JSON.stringify(route)}
    const routeRegex = getNamedRouteRegex(pathname, false)
    const route = interpolateDynamicPath(pathname, props.params, routeRegex)

    const imageData = ${JSON.stringify(imageData)};

    return {
      ...imageData,
      url: path.join(route, ${JSON.stringify(pageRoute)} + ${JSON.stringify(hashQuery)}),
    }
  }`;
}
const raw = true;
exports.raw = raw;
var _default = nextMetadataImageLoader;
exports.default = _default;

//# sourceMappingURL=next-metadata-image-loader.js.map