"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseVersionInfo = parseVersionInfo;
var semver = _interopRequireWildcard(require("next/dist/compiled/semver"));
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
function parseVersionInfo(o) {
    const latest = semver.parse(o.latest);
    const canary = semver.parse(o.canary);
    const installedParsed = semver.parse(o.installed);
    const installed = o.installed;
    if (installedParsed && latest && canary) {
        if (installedParsed.major < latest.major) {
            // Old major version
            return {
                staleness: "stale-major",
                expected: latest.raw,
                installed
            };
        } else if (installedParsed.prerelease[0] === "canary" && semver.lt(installedParsed, canary)) {
            // Matching major, but old canary
            return {
                staleness: "stale-prerelease",
                expected: canary.raw,
                installed
            };
        } else if (!installedParsed.prerelease.length && semver.lt(installedParsed, latest)) {
            // Stable, but not the latest
            if (installedParsed.minor === latest.minor) {
                // Same major and minor, but not the latest patch
                return {
                    staleness: "stale-patch",
                    expected: latest.raw,
                    installed
                };
            }
            return {
                staleness: "stale-minor",
                expected: latest.raw,
                installed
            };
        } else if (semver.gt(installedParsed, latest) && installedParsed.version !== canary.version) {
            // Newer major version
            return {
                staleness: "newer-than-npm",
                installed
            };
        } else {
            // Latest and greatest
            return {
                staleness: "fresh",
                installed
            };
        }
    }
    return {
        installed: (installedParsed == null ? void 0 : installedParsed.raw) ?? "0.0.0",
        staleness: "unknown"
    };
}

//# sourceMappingURL=parse-version-info.js.map