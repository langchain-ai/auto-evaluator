"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const staticFileRegex = /[\\/](robots\.txt|sitemap\.xml)/;
function isStaticRoute(resourcePath) {
    return staticFileRegex.test(resourcePath);
}
function getContentType(resourcePath) {
    const filename = _path.default.basename(resourcePath);
    const [name] = filename.split(".");
    if (name === "sitemap") return "application/xml";
    if (name === "robots") return "text/plain";
    return "text/plain";
}
const nextMetadataRouterLoader = function(content) {
    const { resourcePath  } = this;
    const code = isStaticRoute(resourcePath) ? `import { NextResponse } from 'next/server'

const content = ${JSON.stringify(content)}
const contentType = ${JSON.stringify(getContentType(resourcePath))}
export function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': contentType,
    },
  })
}

export const dynamic = 'force-static'
` : `export { default as GET } from ${JSON.stringify(resourcePath)}`;
    return code;
};
var _default = nextMetadataRouterLoader;
exports.default = _default;

//# sourceMappingURL=next-metadata-route-loader.js.map