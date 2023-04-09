"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findPageFile = findPageFile;
exports.createValidFileMatcher = createValidFileMatcher;
var _fileExists = require("../../lib/file-exists");
var _getPagePaths = require("../../shared/lib/page-path/get-page-paths");
var _nonNullable = require("../../lib/non-nullable");
var _path = require("path");
var _fs = require("fs");
var _log = require("../../build/output/log");
var _chalk = _interopRequireDefault(require("../../lib/chalk"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function isTrueCasePagePath(pagePath, pagesDir) {
    const pageSegments = (0, _path).normalize(pagePath).split(_path.sep).filter(Boolean);
    const segmentExistsPromises = pageSegments.map(async (segment, i)=>{
        const segmentParentDir = (0, _path).join(pagesDir, ...pageSegments.slice(0, i));
        const parentDirEntries = await _fs.promises.readdir(segmentParentDir);
        return parentDirEntries.includes(segment);
    });
    return (await Promise.all(segmentExistsPromises)).every(Boolean);
}
async function findPageFile(pagesDir, normalizedPagePath, pageExtensions, isAppDir) {
    const pagePaths = (0, _getPagePaths).getPagePaths(normalizedPagePath, pageExtensions, isAppDir);
    const [existingPath, ...others] = (await Promise.all(pagePaths.map(async (path)=>{
        const filePath = (0, _path).join(pagesDir, path);
        try {
            return await (0, _fileExists).fileExists(filePath) ? path : null;
        } catch (err) {
            var ref;
            if (!(err == null ? void 0 : (ref = err.code) == null ? void 0 : ref.includes("ENOTDIR"))) throw err;
        }
        return null;
    }))).filter(_nonNullable.nonNullable);
    if (!existingPath) {
        return null;
    }
    if (!await isTrueCasePagePath(existingPath, pagesDir)) {
        return null;
    }
    if (others.length > 0) {
        (0, _log).warn(`Duplicate page detected. ${_chalk.default.cyan((0, _path).join("pages", existingPath))} and ${_chalk.default.cyan((0, _path).join("pages", others[0]))} both resolve to ${_chalk.default.cyan(normalizedPagePath)}.`);
    }
    return existingPath;
}
function createValidFileMatcher(pageExtensions, appDirPath) {
    const validExtensionFileRegex = new RegExp(`\\.+(?:${pageExtensions.join("|")})$`);
    const leafOnlyPageFileRegex = new RegExp(`(^(page|route)|[\\\\/](page|route))\\.(?:${pageExtensions.join("|")})$`);
    // TODO: support other metadata routes
    // regex for /robots.txt|((j|t)sx?)
    // regex for /sitemap.xml|((j|t)sx?)
    const metadataRoutesRelativePathRegex = new RegExp(`^[\\\\/](robots)\\.(?:${pageExtensions.concat("txt").join("|")})$` + "|" + `^[\\\\/](sitemap)\\.(?:${pageExtensions.concat("xml").join("|")})$`);
    function isMetadataRouteFile(filePath) {
        if (!appDirPath) return false;
        const relativePath = filePath.replace(appDirPath, "");
        return metadataRoutesRelativePathRegex.test(relativePath);
    }
    // Determine if the file is leaf node page file or route file under layouts,
    // 'page.<extension>' | 'route.<extension>'
    function isAppRouterPage(filePath) {
        return leafOnlyPageFileRegex.test(filePath) || isMetadataRouteFile(filePath);
    }
    function isPageFile(filePath) {
        return validExtensionFileRegex.test(filePath) || isMetadataRouteFile(filePath);
    }
    return {
        isPageFile,
        isAppRouterPage,
        isMetadataRouteFile
    };
}

//# sourceMappingURL=find-page-file.js.map