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
var _isMetadataRoute = require("../../lib/metadata/is-metadata-route");
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
    const getExtensionRegexString = (extensions)=>`(?:${extensions.join("|")})`;
    const validExtensionFileRegex = new RegExp("\\." + getExtensionRegexString(pageExtensions) + "$");
    const leafOnlyPageFileRegex = new RegExp(`(^(page|route)|[\\\\/](page|route))\\.${getExtensionRegexString(pageExtensions)}$`);
    const leafOnlyNotFoundFileRegex = new RegExp(`^not-found\\.${getExtensionRegexString(pageExtensions)}$`);
    /** TODO-METADATA: support other metadata routes
   *  regex for:
   *
   * /robots.txt|<ext>
   * /sitemap.xml|<ext>
   * /favicon.ico
   * /manifest.json|<ext>
   * <route>/icon.png|jpg|<ext>
   * <route>/apple-touch-icon.png|jpg|<ext>
   *
   */ /**
   * Match the file if it's a metadata route file, static: if the file is a static metadata file.
   * It needs to be a file which doesn't match the custom metadata routes e.g. `app/robots.txt/route.js`
   */ function isMetadataFile(filePath) {
        const appDirRelativePath = appDirPath ? filePath.replace(appDirPath, "") : filePath;
        return (0, _isMetadataRoute).isMetadataRouteFile(appDirRelativePath, pageExtensions, true);
    }
    // Determine if the file is leaf node page file or route file under layouts,
    // 'page.<extension>' | 'route.<extension>'
    function isAppRouterPage(filePath) {
        return leafOnlyPageFileRegex.test(filePath) || isMetadataFile(filePath);
    }
    function isPageFile(filePath) {
        return validExtensionFileRegex.test(filePath) || isMetadataFile(filePath);
    }
    function isRootNotFound(filePath) {
        if (!appDirPath) {
            return false;
        }
        if (!filePath.startsWith(appDirPath + _path.sep)) {
            return false;
        }
        const rest = filePath.slice(appDirPath.length + 1);
        return leafOnlyNotFoundFileRegex.test(rest);
    }
    return {
        isPageFile,
        isAppRouterPage,
        isMetadataFile,
        isRootNotFound
    };
}

//# sourceMappingURL=find-page-file.js.map