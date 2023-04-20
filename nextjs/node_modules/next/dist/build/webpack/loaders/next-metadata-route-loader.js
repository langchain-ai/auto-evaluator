"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _discover = require("./metadata/discover");
var _mimeType = require("../../../lib/mime-type");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const cacheHeader = {
    none: "no-cache, no-store",
    longCache: "public, immutable, no-transform, max-age=31536000",
    revalidate: "public, max-age=0, must-revalidate"
};
function getFilenameAndExtension(resourcePath) {
    const filename = _path.default.basename(resourcePath);
    const [name, ext] = filename.split(".");
    return {
        name,
        ext
    };
}
function getContentType(resourcePath) {
    let { name , ext  } = getFilenameAndExtension(resourcePath);
    if (ext === "jpg") ext = "jpeg";
    if (name === "favicon" && ext === "ico") return "image/x-icon";
    if (name === "sitemap") return "application/xml";
    if (name === "robots") return "text/plain";
    if (name === "manifest") return "application/manifest+json";
    if (ext === "png" || ext === "jpeg" || ext === "ico" || ext === "svg") {
        return _mimeType.imageExtMimeTypeMap[ext];
    }
    return "text/plain";
}
// Strip metadata resource query string from `import.meta.url` to make sure the fs.readFileSync get the right path.
function getStaticRouteCode(resourcePath, fileBaseName) {
    const cache = fileBaseName === "favicon" ? "public, max-age=0, must-revalidate" : process.env.NODE_ENV !== "production" ? cacheHeader.none : cacheHeader.longCache;
    return `\
import fs from 'fs'
import { fileURLToPath } from 'url'
import { NextResponse } from 'next/server'

const contentType = ${JSON.stringify(getContentType(resourcePath))}
const resourceUrl = new URL(import.meta.url)
const filePath = fileURLToPath(resourceUrl).replace(${JSON.stringify(_discover.METADATA_RESOURCE_QUERY)}, '')
const buffer = fs.readFileSync(filePath)

export function GET() {
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': ${JSON.stringify(cache)},
    },
  })
}

export const dynamic = 'force-static'
`;
}
function getDynamicTextRouteCode(resourcePath) {
    return `\
import { NextResponse } from 'next/server'
import handler from ${JSON.stringify(resourcePath)}
import { resolveRouteData } from 'next/dist/build/webpack/loaders/metadata/resolve-route-data'

const contentType = ${JSON.stringify(getContentType(resourcePath))}
const fileType = ${JSON.stringify(getFilenameAndExtension(resourcePath).name)}

export async function GET() {
  const data = await handler()
  const content = resolveRouteData(data, fileType)

  return new NextResponse(content, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': ${JSON.stringify(cacheHeader.revalidate)},
    },
  })
}
`;
}
function getDynamicImageRouteCode(resourcePath) {
    return `\
import { NextResponse } from 'next/server'
import handler from ${JSON.stringify(resourcePath)}

export function GET(req, ctx) {
  return handler({ params: ctx.params })
}
`;
}
// `import.meta.url` is the resource name of the current module.
// When it's static route, it could be favicon.ico, sitemap.xml, robots.txt etc.
// TODO-METADATA: improve the cache control strategy
const nextMetadataRouterLoader = function() {
    const { resourcePath  } = this;
    const { pageExtensions  } = this.getOptions();
    const { name: fileBaseName , ext  } = getFilenameAndExtension(resourcePath);
    const isDynamic = pageExtensions.includes(ext);
    let code = "";
    if (isDynamic) {
        if (fileBaseName === "sitemap" || fileBaseName === "robots" || fileBaseName === "manifest") {
            code = getDynamicTextRouteCode(resourcePath);
        } else {
            code = getDynamicImageRouteCode(resourcePath);
        }
    } else {
        code = getStaticRouteCode(resourcePath, fileBaseName);
    }
    return code;
};
var _default = nextMetadataRouterLoader;
exports.default = _default;

//# sourceMappingURL=next-metadata-route-loader.js.map