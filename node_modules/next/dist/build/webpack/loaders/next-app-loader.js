"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _chalk = _interopRequireDefault(require("next/dist/compiled/chalk"));
var _webpackConfig = require("../../webpack-config");
var _getModuleBuildInfo = require("./get-module-build-info");
var _verifyRootLayout = require("../../../lib/verifyRootLayout");
var Log = _interopRequireWildcard(require("../../../build/output/log"));
var _constants = require("../../../lib/constants");
var _discover = require("./metadata/discover");
var _isAppRouteRoute = require("../../../lib/is-app-route-route");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const isNotResolvedError = (err)=>err.message.includes("Can't resolve");
const FILE_TYPES = {
    layout: "layout",
    template: "template",
    error: "error",
    loading: "loading",
    head: "head",
    "not-found": "not-found"
};
const GLOBAL_ERROR_FILE_TYPE = "global-error";
const PAGE_SEGMENT = "page$";
async function createAppRouteCode({ name , pagePath , resolver  }) {
    // Split based on any specific path separators (both `/` and `\`)...
    const routeName = name.split("/").pop();
    const splittedPath = pagePath.split(/[\\/]/);
    // Then join all but the last part with the same separator, `/`...
    const segmentPath = splittedPath.slice(0, -1).join("/");
    // Then add the `/route` suffix...
    const matchedPagePath = `${segmentPath}/${routeName}`;
    // This, when used with the resolver will give us the pathname to the built
    // route handler file.
    let resolvedPagePath = await resolver(matchedPagePath);
    if ((0, _isAppRouteRoute).isMetadataRoute(name)) {
        resolvedPagePath = `next-metadata-route-loader!${resolvedPagePath}`;
    }
    // TODO: verify if other methods need to be injected
    // TODO: validate that the handler exports at least one of the supported methods
    return `
    import 'next/dist/server/node-polyfill-headers'

    export * as handlers from ${JSON.stringify(resolvedPagePath)}
    export const resolvedPagePath = ${JSON.stringify(resolvedPagePath)}

    export { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage'
  
    export * as serverHooks from 'next/dist/client/components/hooks-server-context'
    
    export { staticGenerationBailout } from 'next/dist/client/components/static-generation-bailout'
    
    export * as headerHooks from 'next/dist/client/components/headers'
  
    export { requestAsyncStorage } from 'next/dist/client/components/request-async-storage'
  `;
}
async function createTreeCodeFromPath(pagePath, { resolver , resolvePath , resolveParallelSegments , loaderContext , loaderOptions  }) {
    const splittedPath = pagePath.split(/[\\/]/);
    const appDirPrefix = splittedPath[0];
    const pages = [];
    let rootLayout;
    let globalError;
    async function createSubtreePropsFromSegmentPath(segments) {
        const segmentPath = segments.join("/");
        // Existing tree are the children of the current segment
        const props = {};
        const isRootLayer = segments.length === 0;
        // We need to resolve all parallel routes in this level.
        const parallelSegments = [];
        if (isRootLayer) {
            parallelSegments.push([
                "children",
                ""
            ]);
        } else {
            parallelSegments.push(...resolveParallelSegments(segmentPath));
        }
        let metadata = null;
        try {
            const routerDirPath = `${appDirPrefix}${segmentPath}`;
            const resolvedRouteDir = await resolver(routerDirPath, true);
            if (resolvedRouteDir) {
                metadata = await (0, _discover).discoverStaticMetadataFiles(resolvedRouteDir, {
                    resolvePath,
                    isRootLayer,
                    loaderContext,
                    loaderOptions
                });
            }
        } catch (err) {
            if (isNotResolvedError(err)) {
                throw err;
            }
        }
        for (const [parallelKey, parallelSegment] of parallelSegments){
            if (parallelSegment === PAGE_SEGMENT) {
                const matchedPagePath = `${appDirPrefix}${segmentPath}${parallelKey === "children" ? "" : `/@${parallelKey}`}/page`;
                const resolvedPagePath = await resolver(matchedPagePath);
                if (resolvedPagePath) pages.push(resolvedPagePath);
                // Use '' for segment as it's the page. There can't be a segment called '' so this is the safest way to add it.
                props[parallelKey] = `['', {}, {
          page: [() => import(/* webpackMode: "eager" */ ${JSON.stringify(resolvedPagePath)}), ${JSON.stringify(resolvedPagePath)}],
          ${(0, _discover).buildMetadata(metadata)}
        }]`;
                continue;
            }
            const parallelSegmentPath = segmentPath + "/" + parallelSegment;
            const { treeCode: subtreeCode  } = await createSubtreePropsFromSegmentPath([
                ...segments,
                ...parallelKey === "children" ? [] : [
                    `@${parallelKey}`
                ],
                Array.isArray(parallelSegment) ? parallelSegment[0] : parallelSegment, 
            ]);
            // `page` is not included here as it's added above.
            const filePaths = await Promise.all(Object.values(FILE_TYPES).map(async (file)=>{
                return [
                    file,
                    await resolver(`${appDirPrefix}${// TODO-APP: parallelSegmentPath sometimes ends in `/` but sometimes it doesn't. This should be consistent.
                    parallelSegmentPath.endsWith("/") ? parallelSegmentPath : parallelSegmentPath + "/"}${file}`), 
                ];
            }));
            if (!rootLayout) {
                var ref;
                const layoutPath = (ref = filePaths.find(([type, filePath])=>type === "layout" && !!filePath)) == null ? void 0 : ref[1];
                rootLayout = layoutPath;
                if (layoutPath) {
                    globalError = await resolver(`${_path.default.dirname(layoutPath)}/${GLOBAL_ERROR_FILE_TYPE}`);
                }
            }
            const definedFilePaths = filePaths.filter(([, filePath])=>filePath !== undefined);
            props[parallelKey] = `[
        '${Array.isArray(parallelSegment) ? parallelSegment[0] : parallelSegment}',
        ${subtreeCode},
        {
          ${definedFilePaths.map(([file, filePath])=>{
                return `'${file}': [() => import(/* webpackMode: "eager" */ ${JSON.stringify(filePath)}), ${JSON.stringify(filePath)}],`;
            }).join("\n")}
          ${definedFilePaths.length ? (0, _discover).buildMetadata(metadata) : ""}
        }
      ]`;
        }
        return {
            treeCode: `{
        ${Object.entries(props).map(([key, value])=>`${key}: ${value}`).join(",\n")}
      }`
        };
    }
    const { treeCode  } = await createSubtreePropsFromSegmentPath([]);
    return {
        treeCode: `const tree = ${treeCode}.children;`,
        pages: `const pages = ${JSON.stringify(pages)};`,
        rootLayout,
        globalError
    };
}
function createAbsolutePath(appDir, pathToTurnAbsolute) {
    return pathToTurnAbsolute// Replace all POSIX path separators with the current OS path separator
    .replace(/\//g, _path.default.sep).replace(/^private-next-app-dir/, appDir);
}
const nextAppLoader = async function nextAppLoader() {
    const loaderOptions = this.getOptions() || {};
    const { name , appDir , appPaths , pagePath , pageExtensions , rootDir , tsconfigPath , isDev ,  } = loaderOptions;
    const buildInfo = (0, _getModuleBuildInfo).getModuleBuildInfo(this._module);
    buildInfo.route = {
        page: name.replace(/^app/, ""),
        absolutePagePath: createAbsolutePath(appDir, pagePath)
    };
    const extensions = pageExtensions.map((extension)=>`.${extension}`);
    const resolveOptions = {
        ..._webpackConfig.NODE_RESOLVE_OPTIONS,
        extensions
    };
    const resolve = this.getResolve(resolveOptions);
    const normalizedAppPaths = typeof appPaths === "string" ? [
        appPaths
    ] : appPaths || [];
    const resolveParallelSegments = (pathname)=>{
        const matched = {};
        for (const appPath of normalizedAppPaths){
            if (appPath.startsWith(pathname + "/")) {
                const rest = appPath.slice(pathname.length + 1).split("/");
                // It is the actual page, mark it specially.
                if (rest.length === 1 && rest[0] === "page") {
                    matched.children = PAGE_SEGMENT;
                    continue;
                }
                const isParallelRoute = rest[0].startsWith("@");
                if (isParallelRoute && rest.length === 2 && rest[1] === "page") {
                    matched[rest[0].slice(1)] = PAGE_SEGMENT;
                    continue;
                }
                if (isParallelRoute) {
                    matched[rest[0].slice(1)] = rest.slice(1);
                    continue;
                }
                matched.children = rest[0];
            }
        }
        return Object.entries(matched);
    };
    const resolver = async (pathname, resolveDir)=>{
        if (resolveDir) {
            return createAbsolutePath(appDir, pathname);
        }
        try {
            const resolved = await resolve(this.rootContext, pathname);
            this.addDependency(resolved);
            return resolved;
        } catch (err) {
            const absolutePath = createAbsolutePath(appDir, pathname);
            for (const ext of extensions){
                const absolutePathWithExtension = `${absolutePath}${ext}`;
                this.addMissingDependency(absolutePathWithExtension);
            }
            if (isNotResolvedError(err)) {
                return undefined;
            }
            throw err;
        }
    };
    if ((0, _isAppRouteRoute).isAppRouteRoute(name) || (0, _isAppRouteRoute).isMetadataRoute(name)) {
        return createAppRouteCode({
            name,
            pagePath,
            resolver
        });
    }
    const { treeCode , pages: pageListCode , rootLayout , globalError ,  } = await createTreeCodeFromPath(pagePath, {
        resolver,
        resolvePath: (pathname)=>resolve(this.rootContext, pathname),
        resolveParallelSegments,
        loaderContext: this,
        loaderOptions: loaderOptions
    });
    if (!rootLayout) {
        if (!isDev) {
            // If we're building and missing a root layout, exit the build
            Log.error(`${_chalk.default.bold(pagePath.replace(`${_constants.APP_DIR_ALIAS}/`, ""))} doesn't have a root layout. To fix this error, make sure every page has a root layout.`);
            process.exit(1);
        } else {
            // In dev we'll try to create a root layout
            const [createdRootLayout, rootLayoutPath] = await (0, _verifyRootLayout).verifyRootLayout({
                appDir: appDir,
                dir: rootDir,
                tsconfigPath: tsconfigPath,
                pagePath,
                pageExtensions
            });
            if (!createdRootLayout) {
                let message = `${_chalk.default.bold(pagePath.replace(`${_constants.APP_DIR_ALIAS}/`, ""))} doesn't have a root layout. `;
                if (rootLayoutPath) {
                    var ref;
                    message += `We tried to create ${_chalk.default.bold(_path.default.relative(((ref = this._compiler) == null ? void 0 : ref.context) ?? "", rootLayoutPath))} for you but something went wrong.`;
                } else {
                    message += "To fix this error, make sure every page has a root layout.";
                }
                throw new Error(message);
            }
        }
    }
    const result = `
    export ${treeCode}
    export ${pageListCode}

    export { default as AppRouter } from 'next/dist/client/components/app-router'
    export { default as LayoutRouter } from 'next/dist/client/components/layout-router'
    export { default as RenderFromTemplateContext } from 'next/dist/client/components/render-from-template-context'
    export { default as GlobalError } from ${JSON.stringify(globalError || "next/dist/client/components/error-boundary")}

    export { staticGenerationAsyncStorage } from 'next/dist/client/components/static-generation-async-storage'
    
    export { requestAsyncStorage } from 'next/dist/client/components/request-async-storage'

    export * as serverHooks from 'next/dist/client/components/hooks-server-context'

    export { renderToReadableStream } from 'next/dist/compiled/react-server-dom-webpack/server.edge'
    export const __next_app_webpack_require__ = __webpack_require__
  `;
    return result;
};
var _default = nextAppLoader;
exports.default = _default;

//# sourceMappingURL=next-app-loader.js.map