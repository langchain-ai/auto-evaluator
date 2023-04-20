"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
class ImageResponse {
    constructor(...args){
        // @ts-expect-error - process.turbopack is a custom property
        if (process.turbopack) {
            // TODO(sokra) enable this again when turbopack supports wasm
            throw new Error("Turbopack doesn't support ImageResponse currently");
        } else {
            const readable = new ReadableStream({
                async start (controller) {
                    const OGImageResponse = // So far we have to manually determine which build to use,
                    // as the auto resolving is not working
                    (await import(process.env.NEXT_RUNTIME === "edge" ? "next/dist/compiled/@vercel/og/index.edge" : "next/dist/compiled/@vercel/og/index.node")).ImageResponse;
                    const imageResponse = new OGImageResponse(...args);
                    if (!imageResponse.body) {
                        return controller.close();
                    }
                    const reader = imageResponse.body.getReader();
                    while(true){
                        const { done , value  } = await reader.read();
                        if (done) {
                            return controller.close();
                        }
                        controller.enqueue(value);
                    }
                }
            });
            const options = args[1] || {};
            return new Response(readable, {
                headers: {
                    "content-type": "image/png",
                    "cache-control": process.env.NODE_ENV === "development" ? "no-cache, no-store" : "public, immutable, no-transform, max-age=31536000",
                    ...options.headers
                },
                status: options.status,
                statusText: options.statusText
            });
        }
    }
}
exports.ImageResponse = ImageResponse;

//# sourceMappingURL=image-response.js.map