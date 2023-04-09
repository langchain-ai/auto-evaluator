"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createClientRouterFilter = createClientRouterFilter;
var _bloomFilter = require("../shared/lib/bloom-filter");
var _utils = require("../shared/lib/router/utils");
var _removeTrailingSlash = require("../shared/lib/router/utils/remove-trailing-slash");
var _tryToParsePath = require("./try-to-parse-path");
const POTENTIAL_ERROR_RATE = 0.01;
function createClientRouterFilter(paths, redirects, allowedErrorRate = POTENTIAL_ERROR_RATE) {
    const staticPaths = new Set();
    const dynamicPaths = new Set();
    for (const path of paths){
        if ((0, _utils).isDynamicRoute(path)) {
            let subPath = "";
            const pathParts = path.split("/");
            // start at 1 since we split on '/' and the path starts
            // with this so the first entry is an empty string
            for(let i = 1; i < pathParts.length + 1; i++){
                const curPart = pathParts[i];
                if (curPart.startsWith("[")) {
                    break;
                }
                subPath = `${subPath}/${curPart}`;
            }
            if (subPath) {
                dynamicPaths.add(subPath);
            }
        } else {
            staticPaths.add(path);
        }
    }
    for (const redirect of redirects){
        const { source  } = redirect;
        const path = (0, _removeTrailingSlash).removeTrailingSlash(source);
        let tokens = [];
        try {
            tokens = (0, _tryToParsePath).tryToParsePath(source).tokens || [];
        } catch (_) {}
        if (tokens.every((token)=>typeof token === "string")) {
            // only include static redirects initially
            staticPaths.add(path);
        }
    }
    const staticFilter = _bloomFilter.BloomFilter.from([
        ...staticPaths
    ], allowedErrorRate);
    const dynamicFilter = _bloomFilter.BloomFilter.from([
        ...dynamicPaths
    ], allowedErrorRate);
    const data = {
        staticFilter: staticFilter.export(),
        dynamicFilter: dynamicFilter.export()
    };
    return data;
}

//# sourceMappingURL=create-client-router-filter.js.map