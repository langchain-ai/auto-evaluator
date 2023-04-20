"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderToHTMLOrFlight = renderToHTMLOrFlight;
exports.isEdgeRuntime = void 0;
var _react = _interopRequireDefault(require("next/dist/compiled/react"));
var _serverBrowser = _interopRequireDefault(require("next/dist/compiled/react-dom/server.browser"));
var _error = require("../../client/components/error");
var _renderResult = _interopRequireDefault(require("../render-result"));
var _nodeWebStreamsHelper = require("../node-web-streams-helper");
var _matchSegments = require("../../client/components/match-segments");
var _serverInsertedHtml = require("../../shared/lib/server-inserted-html");
var _internalUtils = require("../internal-utils");
var _headManagerContext = require("../../shared/lib/head-manager-context");
var _appRouterHeaders = require("../../client/components/app-router-headers");
var _metadata = require("../../lib/metadata/metadata");
var _requestAsyncStorageWrapper = require("../async-storage/request-async-storage-wrapper");
var _staticGenerationAsyncStorageWrapper = require("../async-storage/static-generation-async-storage-wrapper");
var _resolveMetadata = require("../../lib/metadata/resolve-metadata");
var _clientReference = require("../../lib/client-reference");
var _appDirModule = require("../lib/app-dir-module");
var _notFound = require("../../client/components/not-found");
var _redirect = require("../../client/components/redirect");
var _patchFetch = require("../lib/patch-fetch");
var _constants = require("../lib/trace/constants");
var _tracer = require("../lib/trace/tracer");
var _interopDefault = require("./interop-default");
var _preloadComponent = require("./preload-component");
var _flightRenderResult = require("./flight-render-result");
var _createErrorHandler = require("./create-error-handler");
var _createServerComponentsRenderer = require("./create-server-components-renderer");
var _getShortDynamicParamType = require("./get-short-dynamic-param-type");
var _getSegmentParam = require("./get-segment-param");
var _getCssInlinedLinkTags = require("./get-css-inlined-link-tags");
var _getServerCssForEntries = require("./get-server-css-for-entries");
var _getPreloadedFontFilesInlineLinkTags = require("./get-preloaded-font-files-inline-link-tags");
var _getScriptNonceFromHeader = require("./get-script-nonce-from-header");
var _renderToString = require("./render-to-string");
var _parseAndValidateFlightRouterState = require("./parse-and-validate-flight-router-state");
var _validateUrl = require("./validate-url");
var _createFlightRouterStateFromLoaderTree = require("./create-flight-router-state-from-loader-tree");
var _actionHandler = require("./action-handler");
var _constants1 = require("../../shared/lib/constants");
var _noSsrError = require("../../shared/lib/lazy-dynamic/no-ssr-error");
var _log = require("../../build/output/log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const isEdgeRuntime = process.env.NEXT_RUNTIME === "edge";
exports.isEdgeRuntime = isEdgeRuntime;
/* This method is important for intercepted routes to function:
 * when a route is intercepted, e.g. /blog/[slug], it will be rendered
 * with the layout of the previous page, e.g. /profile/[id]. The problem is
 * that the loader tree needs to know the dynamic param in order to render (id and slug in the example).
 * Normally they are read from the path but since we are intercepting the route, the path would not contain id,
 * so we need to read it from the router state.
 */ function findDynamicParamFromRouterState(providedFlightRouterState, segment) {
    if (!providedFlightRouterState) {
        return null;
    }
    const treeSegment = providedFlightRouterState[0];
    if ((0, _matchSegments).canSegmentBeOverridden(segment, treeSegment)) {
        if (!Array.isArray(treeSegment) || Array.isArray(segment)) {
            return null;
        }
        return {
            param: treeSegment[0],
            value: treeSegment[1],
            treeSegment: treeSegment,
            type: treeSegment[2]
        };
    }
    for (const parallelRouterState of Object.values(providedFlightRouterState[1])){
        const maybeDynamicParma = findDynamicParamFromRouterState(parallelRouterState, segment);
        if (maybeDynamicParma) {
            return maybeDynamicParma;
        }
    }
    return null;
}
async function renderToHTMLOrFlight(req, res, pathname, query, renderOpts) {
    const isFlight = req.headers[_appRouterHeaders.RSC.toLowerCase()] !== undefined;
    const { buildManifest , subresourceIntegrityManifest , serverActionsManifest , ComponentMod , dev , nextFontManifest , supportsDynamicHTML , nextConfigOutput ,  } = renderOpts;
    const clientReferenceManifest = renderOpts.clientReferenceManifest;
    const serverCSSManifest = renderOpts.serverCSSManifest;
    const capturedErrors = [];
    const allCapturedErrors = [];
    const isNextExport = !!renderOpts.nextExport;
    const serverComponentsErrorHandler = (0, _createErrorHandler).createErrorHandler({
        _source: "serverComponentsRenderer",
        dev,
        isNextExport,
        errorLogger: renderOpts.appDirDevErrorLogger,
        capturedErrors
    });
    const flightDataRendererErrorHandler = (0, _createErrorHandler).createErrorHandler({
        _source: "flightDataRenderer",
        dev,
        isNextExport,
        errorLogger: renderOpts.appDirDevErrorLogger,
        capturedErrors
    });
    const htmlRendererErrorHandler = (0, _createErrorHandler).createErrorHandler({
        _source: "htmlRenderer",
        dev,
        isNextExport,
        errorLogger: renderOpts.appDirDevErrorLogger,
        capturedErrors,
        allCapturedErrors
    });
    (0, _patchFetch).patchFetch(ComponentMod);
    /**
   * Rules of Static & Dynamic HTML:
   *
   *    1.) We must generate static HTML unless the caller explicitly opts
   *        in to dynamic HTML support.
   *
   *    2.) If dynamic HTML support is requested, we must honor that request
   *        or throw an error. It is the sole responsibility of the caller to
   *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
   *
   * These rules help ensure that other existing features like request caching,
   * coalescing, and ISR continue working as intended.
   */ const generateStaticHTML = supportsDynamicHTML !== true;
    const staticGenerationAsyncStorage = ComponentMod.staticGenerationAsyncStorage;
    const requestAsyncStorage = ComponentMod.requestAsyncStorage;
    const staticGenerationBailout = ComponentMod.staticGenerationBailout;
    // we wrap the render in an AsyncLocalStorage context
    const wrappedRender = async ()=>{
        var ref1;
        const staticGenerationStore = staticGenerationAsyncStorage.getStore();
        if (!staticGenerationStore) {
            throw new Error(`Invariant: Render expects to have staticGenerationAsyncStorage, none found`);
        }
        // don't modify original query object
        query = {
            ...query
        };
        (0, _internalUtils).stripInternalQueries(query);
        const isPrefetch = req.headers[_appRouterHeaders.NEXT_ROUTER_PREFETCH.toLowerCase()] !== undefined;
        /**
     * Router state provided from the client-side router. Used to handle rendering from the common layout down.
     */ let providedFlightRouterState = isFlight ? (0, _parseAndValidateFlightRouterState).parseAndValidateFlightRouterState(req.headers[_appRouterHeaders.NEXT_ROUTER_STATE_TREE.toLowerCase()]) : undefined;
        /**
     * The tree created in next-app-loader that holds component segments and modules
     */ const loaderTree = ComponentMod.tree;
        /**
     * The metadata items array created in next-app-loader with all relevant information
     * that we need to resolve the final metadata.
     */ const requestId = process.env.NEXT_RUNTIME === "edge" ? crypto.randomUUID() : require("next/dist/compiled/nanoid").nanoid();
        const LayoutRouter = ComponentMod.LayoutRouter;
        const RenderFromTemplateContext = ComponentMod.RenderFromTemplateContext;
        const createSearchParamsBailoutProxy = ComponentMod.createSearchParamsBailoutProxy;
        const StaticGenerationSearchParamsBailoutProvider = ComponentMod.StaticGenerationSearchParamsBailoutProvider;
        const isStaticGeneration = staticGenerationStore.isStaticGeneration;
        // During static generation we need to call the static generation bailout when reading searchParams
        const providedSearchParams = isStaticGeneration ? createSearchParamsBailoutProxy() : query;
        const searchParamsProps = {
            searchParams: providedSearchParams
        };
        /**
     * Server Context is specifically only available in Server Components.
     * It has to hold values that can't change while rendering from the common layout down.
     * An example of this would be that `headers` are available but `searchParams` are not because that'd mean we have to render from the root layout down on all requests.
     */ const serverContexts = [
            [
                "WORKAROUND",
                null
            ]
        ];
        /**
     * Dynamic parameters. E.g. when you visit `/dashboard/vercel` which is rendered by `/dashboard/[slug]` the value will be {"slug": "vercel"}.
     */ const pathParams = renderOpts.params;
        /**
     * Parse the dynamic segment and return the associated value.
     */ const getDynamicParamFromSegment = (// [slug] / [[slug]] / [...slug]
        segment)=>{
            const segmentParam = (0, _getSegmentParam).getSegmentParam(segment);
            if (!segmentParam) {
                return null;
            }
            const key = segmentParam.param;
            let value = pathParams[key];
            // this is a special marker that will be present for interception routes
            if (value === "__NEXT_EMPTY_PARAM__") {
                value = undefined;
            }
            if (Array.isArray(value)) {
                value = value.map((i)=>encodeURIComponent(i));
            } else if (typeof value === "string") {
                value = encodeURIComponent(value);
            }
            if (!value) {
                // Handle case where optional catchall does not have a value, e.g. `/dashboard/[...slug]` when requesting `/dashboard`
                if (segmentParam.type === "optional-catchall") {
                    const type = (0, _getShortDynamicParamType).getShortDynamicParamType(segmentParam.type);
                    return {
                        param: key,
                        value: null,
                        type: type,
                        // This value always has to be a string.
                        treeSegment: [
                            key,
                            "",
                            type
                        ]
                    };
                }
                return findDynamicParamFromRouterState(providedFlightRouterState, segment);
            }
            const type = (0, _getShortDynamicParamType).getShortDynamicParamType(segmentParam.type);
            return {
                param: key,
                // The value that is passed to user code.
                value: value,
                // The value that is rendered in the router tree.
                treeSegment: [
                    key,
                    Array.isArray(value) ? value.join("/") : value,
                    type, 
                ],
                type: type
            };
        };
        async function resolveMetadata({ tree , parentParams , metadataItems , treePrefix =[]  }) {
            const [segment, parallelRoutes, { page  }] = tree;
            const currentTreePrefix = [
                ...treePrefix,
                segment
            ];
            const isPage = typeof page !== "undefined";
            // Handle dynamic segment params.
            const segmentParam = getDynamicParamFromSegment(segment);
            /**
       * Create object holding the parent params and current params
       */ const currentParams = // Handle null case where dynamic param is optional
            segmentParam && segmentParam.value !== null ? {
                ...parentParams,
                [segmentParam.param]: segmentParam.value
            } : parentParams;
            const layerProps = {
                params: currentParams,
                ...isPage && searchParamsProps
            };
            await (0, _resolveMetadata).collectMetadata({
                loaderTree: tree,
                metadataItems,
                props: layerProps,
                route: currentTreePrefix// __PAGE__ shouldn't be shown in a route
                .filter((s)=>s !== _constants1.PAGE_SEGMENT_KEY).join("/")
            });
            for(const key in parallelRoutes){
                const childTree = parallelRoutes[key];
                await resolveMetadata({
                    tree: childTree,
                    metadataItems,
                    parentParams: currentParams,
                    treePrefix: currentTreePrefix
                });
            }
            return metadataItems;
        }
        let defaultRevalidate = false;
        // Collect all server CSS imports used by this specific entry (or entries, for parallel routes).
        // Not that we can't rely on the CSS manifest because it tracks CSS imports per module,
        // which can be used by multiple entries and cannot be tree-shaked in the module graph.
        // More info: https://github.com/vercel/next.js/issues/41018
        const serverCSSForEntries = (0, _getServerCssForEntries).getServerCSSForEntries(serverCSSManifest, ComponentMod.pages);
        const assetPrefix = renderOpts.assetPrefix || "";
        const createComponentAndStyles = async ({ filePath , getComponent , shouldPreload , injectedCSS  })=>{
            const cssHrefs = (0, _getCssInlinedLinkTags).getCssInlinedLinkTags(clientReferenceManifest, serverCSSManifest, filePath, serverCSSForEntries, injectedCSS);
            const styles = cssHrefs ? cssHrefs.map((href, index)=>/*#__PURE__*/ _react.default.createElement("link", {
                    rel: "stylesheet",
                    // In dev, Safari will wrongly cache the resource if you preload it:
                    // - https://github.com/vercel/next.js/issues/5860
                    // - https://bugs.webkit.org/show_bug.cgi?id=187726
                    // We used to add a `?ts=` query for resources in `pages` to bypass it,
                    // but in this case it is fine as we don't need to preload the styles.
                    href: `${assetPrefix}/_next/${href}`,
                    // @ts-ignore
                    precedence: shouldPreload ? "high" : undefined,
                    key: index
                })) : null;
            const Comp = (0, _interopDefault).interopDefault(await getComponent());
            return [
                Comp,
                styles
            ];
        };
        const createStaticAssets = async ({ layoutOrPagePath , injectedCSS: injectedCSSWithCurrentLayout , injectedFontPreloadTags: injectedFontPreloadTagsWithCurrentLayout  })=>{
            const stylesheets = layoutOrPagePath ? (0, _getCssInlinedLinkTags).getCssInlinedLinkTags(clientReferenceManifest, serverCSSManifest, layoutOrPagePath, serverCSSForEntries, injectedCSSWithCurrentLayout, true) : [];
            const preloadedFontFiles = layoutOrPagePath ? (0, _getPreloadedFontFilesInlineLinkTags).getPreloadedFontFilesInlineLinkTags(serverCSSManifest, nextFontManifest, serverCSSForEntries, layoutOrPagePath, injectedFontPreloadTagsWithCurrentLayout) : [];
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, (preloadedFontFiles == null ? void 0 : preloadedFontFiles.length) === 0 ? /*#__PURE__*/ _react.default.createElement("link", {
                "data-next-font": (nextFontManifest == null ? void 0 : nextFontManifest.appUsingSizeAdjust) ? "size-adjust" : "",
                rel: "preconnect",
                href: "/",
                crossOrigin: "anonymous"
            }) : null, preloadedFontFiles ? preloadedFontFiles.map((fontFile)=>{
                const ext = /\.(woff|woff2|eot|ttf|otf)$/.exec(fontFile)[1];
                return /*#__PURE__*/ _react.default.createElement("link", {
                    key: fontFile,
                    rel: "preload",
                    href: `${assetPrefix}/_next/${fontFile}`,
                    as: "font",
                    type: `font/${ext}`,
                    crossOrigin: "anonymous",
                    "data-next-font": fontFile.includes("-s") ? "size-adjust" : ""
                });
            }) : null, stylesheets ? stylesheets.map((href, index)=>/*#__PURE__*/ _react.default.createElement("link", {
                    rel: "stylesheet",
                    // In dev, Safari will wrongly cache the resource if you preload it:
                    // - https://github.com/vercel/next.js/issues/5860
                    // - https://bugs.webkit.org/show_bug.cgi?id=187726
                    // We used to add a `?ts=` query for resources in `pages` to bypass it,
                    // but in this case it is fine as we don't need to preload the styles.
                    href: `${assetPrefix}/_next/${href}`,
                    // `Precedence` is an opt-in signal for React to handle
                    // resource loading and deduplication, etc:
                    // https://github.com/facebook/react/pull/25060
                    // @ts-ignore
                    precedence: "next.js",
                    key: index
                })) : null);
        };
        /**
     * Use the provided loader tree to create the React Component tree.
     */ const createComponentTree = async ({ createSegmentPath , loaderTree: tree , parentParams , firstItem , rootLayoutIncluded , injectedCSS , injectedFontPreloadTags , asNotFound  })=>{
            const [segment, parallelRoutes, components] = tree;
            const { layout , template , error , loading , "not-found": notFound ,  } = components;
            let { page  } = components;
            // a __DEFAULT__ segment means that this route didn't match any of the
            // segments in the route, so we should use the default page
            page = segment === "__DEFAULT__" ? components.defaultPage : page;
            const layoutOrPagePath = (layout == null ? void 0 : layout[1]) || (page == null ? void 0 : page[1]);
            const injectedCSSWithCurrentLayout = new Set(injectedCSS);
            const injectedFontPreloadTagsWithCurrentLayout = new Set(injectedFontPreloadTags);
            const assets = createStaticAssets({
                layoutOrPagePath,
                injectedCSS: injectedCSSWithCurrentLayout,
                injectedFontPreloadTags: injectedFontPreloadTagsWithCurrentLayout
            });
            const [Template, templateStyles] = template ? await createComponentAndStyles({
                filePath: template[1],
                getComponent: template[0],
                shouldPreload: true,
                injectedCSS: injectedCSSWithCurrentLayout
            }) : [
                _react.default.Fragment
            ];
            const [ErrorComponent, errorStyles] = error ? await createComponentAndStyles({
                filePath: error[1],
                getComponent: error[0],
                injectedCSS: injectedCSSWithCurrentLayout
            }) : [];
            const [Loading, loadingStyles] = loading ? await createComponentAndStyles({
                filePath: loading[1],
                getComponent: loading[0],
                injectedCSS: injectedCSSWithCurrentLayout
            }) : [];
            const isLayout = typeof layout !== "undefined";
            const isPage = typeof page !== "undefined";
            const [layoutOrPageMod] = await (0, _appDirModule).getLayoutOrPageModule(tree);
            /**
       * Checks if the current segment is a root layout.
       */ const rootLayoutAtThisLevel = isLayout && !rootLayoutIncluded;
            /**
       * Checks if the current segment or any level above it has a root layout.
       */ const rootLayoutIncludedAtThisLevelOrAbove = rootLayoutIncluded || rootLayoutAtThisLevel;
            const [NotFound, notFoundStyles] = notFound ? await createComponentAndStyles({
                filePath: notFound[1],
                getComponent: notFound[0],
                injectedCSS: injectedCSSWithCurrentLayout
            }) : rootLayoutAtThisLevel ? [
                _error.NotFound
            ] : [];
            let dynamic = layoutOrPageMod == null ? void 0 : layoutOrPageMod.dynamic;
            if (nextConfigOutput === "export") {
                if (!dynamic || dynamic === "auto") {
                    dynamic = "error";
                } else if (dynamic === "force-dynamic") {
                    staticGenerationStore.forceDynamic = true;
                    staticGenerationStore.dynamicShouldError = true;
                    staticGenerationBailout(`output: export`, {
                        dynamic,
                        link: "https://nextjs.org/docs/advanced-features/static-html-export"
                    });
                }
            }
            if (typeof dynamic === "string") {
                // the nested most config wins so we only force-static
                // if it's configured above any parent that configured
                // otherwise
                if (dynamic === "error") {
                    staticGenerationStore.dynamicShouldError = true;
                } else if (dynamic === "force-dynamic") {
                    staticGenerationStore.forceDynamic = true;
                    staticGenerationBailout(`force-dynamic`, {
                        dynamic
                    });
                } else {
                    staticGenerationStore.dynamicShouldError = false;
                    if (dynamic === "force-static") {
                        staticGenerationStore.forceStatic = true;
                    } else {
                        staticGenerationStore.forceStatic = false;
                    }
                }
            }
            if (typeof (layoutOrPageMod == null ? void 0 : layoutOrPageMod.fetchCache) === "string") {
                staticGenerationStore.fetchCache = layoutOrPageMod == null ? void 0 : layoutOrPageMod.fetchCache;
            }
            if (typeof (layoutOrPageMod == null ? void 0 : layoutOrPageMod.revalidate) === "number") {
                defaultRevalidate = layoutOrPageMod.revalidate;
                if (typeof staticGenerationStore.revalidate === "undefined" || staticGenerationStore.revalidate > defaultRevalidate) {
                    staticGenerationStore.revalidate = defaultRevalidate;
                }
                if (staticGenerationStore.isStaticGeneration && defaultRevalidate === 0) {
                    const { DynamicServerError  } = ComponentMod.serverHooks;
                    const dynamicUsageDescription = `revalidate: 0 configured ${segment}`;
                    staticGenerationStore.dynamicUsageDescription = dynamicUsageDescription;
                    throw new DynamicServerError(dynamicUsageDescription);
                }
            }
            /**
       * The React Component to render.
       */ let Component = layoutOrPageMod ? (0, _interopDefault).interopDefault(layoutOrPageMod) : undefined;
            if (dev) {
                var ref;
                const { isValidElementType  } = require("next/dist/compiled/react-is");
                if ((isPage || typeof Component !== "undefined") && !isValidElementType(Component)) {
                    throw new Error(`The default export is not a React Component in page: "${pathname}"`);
                }
                if (typeof ErrorComponent !== "undefined" && !isValidElementType(ErrorComponent)) {
                    throw new Error(`The default export of error is not a React Component in page: ${segment}`);
                }
                if (typeof Loading !== "undefined" && !isValidElementType(Loading)) {
                    throw new Error(`The default export of loading is not a React Component in ${segment}`);
                }
                if (typeof NotFound !== "undefined" && !isValidElementType(NotFound)) {
                    throw new Error(`The default export of notFound is not a React Component in ${segment}`);
                }
                if (!(0, _clientReference).isClientReference(layoutOrPageMod) && (layoutOrPageMod == null ? void 0 : (ref = layoutOrPageMod.config) == null ? void 0 : ref.amp)) {
                    throw new Error("AMP is not supported in the app directory. If you need to use AMP it will continue to be supported in the pages directory.");
                }
            }
            // Handle dynamic segment params.
            const segmentParam = getDynamicParamFromSegment(segment);
            /**
       * Create object holding the parent params and current params
       */ const currentParams = // Handle null case where dynamic param is optional
            segmentParam && segmentParam.value !== null ? {
                ...parentParams,
                [segmentParam.param]: segmentParam.value
            } : parentParams;
            // Resolve the segment param
            const actualSegment = segmentParam ? segmentParam.treeSegment : segment;
            // This happens outside of rendering in order to eagerly kick off data fetching for layouts / the page further down
            const parallelRouteMap = await Promise.all(Object.keys(parallelRoutes).map(async (parallelRouteKey)=>{
                const currentSegmentPath = firstItem ? [
                    parallelRouteKey
                ] : [
                    actualSegment,
                    parallelRouteKey
                ];
                const parallelRoute = parallelRoutes[parallelRouteKey];
                const childSegment = parallelRoute[0];
                const childSegmentParam = getDynamicParamFromSegment(childSegment);
                if (isPrefetch && Loading) {
                    const childProp = {
                        // Null indicates the tree is not fully rendered
                        current: null,
                        segment: (0, _createFlightRouterStateFromLoaderTree).addSearchParamsIfPageSegment(childSegmentParam ? childSegmentParam.treeSegment : childSegment, query)
                    };
                    // This is turned back into an object below.
                    return [
                        parallelRouteKey,
                        /*#__PURE__*/ _react.default.createElement(LayoutRouter, {
                            parallelRouterKey: parallelRouteKey,
                            segmentPath: createSegmentPath(currentSegmentPath),
                            loading: Loading ? /*#__PURE__*/ _react.default.createElement(Loading, null) : undefined,
                            loadingStyles: loadingStyles,
                            hasLoading: Boolean(Loading),
                            error: ErrorComponent,
                            errorStyles: errorStyles,
                            template: /*#__PURE__*/ _react.default.createElement(Template, null, /*#__PURE__*/ _react.default.createElement(RenderFromTemplateContext, null)),
                            templateStyles: templateStyles,
                            notFound: NotFound ? /*#__PURE__*/ _react.default.createElement(NotFound, null) : undefined,
                            notFoundStyles: notFoundStyles,
                            childProp: childProp
                        }), 
                    ];
                }
                // Create the child component
                const { Component: ChildComponent  } = await createComponentTree({
                    createSegmentPath: (child)=>{
                        return createSegmentPath([
                            ...currentSegmentPath,
                            ...child
                        ]);
                    },
                    loaderTree: parallelRoute,
                    parentParams: currentParams,
                    rootLayoutIncluded: rootLayoutIncludedAtThisLevelOrAbove,
                    injectedCSS: injectedCSSWithCurrentLayout,
                    injectedFontPreloadTags: injectedFontPreloadTagsWithCurrentLayout,
                    asNotFound
                });
                const childProp = {
                    current: /*#__PURE__*/ _react.default.createElement(ChildComponent, null),
                    segment: (0, _createFlightRouterStateFromLoaderTree).addSearchParamsIfPageSegment(childSegmentParam ? childSegmentParam.treeSegment : childSegment, query)
                };
                const segmentPath = createSegmentPath(currentSegmentPath);
                // This is turned back into an object below.
                return [
                    parallelRouteKey,
                    /*#__PURE__*/ _react.default.createElement(LayoutRouter, {
                        parallelRouterKey: parallelRouteKey,
                        segmentPath: segmentPath,
                        error: ErrorComponent,
                        errorStyles: errorStyles,
                        loading: Loading ? /*#__PURE__*/ _react.default.createElement(Loading, null) : undefined,
                        loadingStyles: loadingStyles,
                        // TODO-APP: Add test for loading returning `undefined`. This currently can't be tested as the `webdriver()` tab will wait for the full page to load before returning.
                        hasLoading: Boolean(Loading),
                        template: /*#__PURE__*/ _react.default.createElement(Template, null, /*#__PURE__*/ _react.default.createElement(RenderFromTemplateContext, null)),
                        templateStyles: templateStyles,
                        notFound: NotFound ? /*#__PURE__*/ _react.default.createElement(NotFound, null) : undefined,
                        notFoundStyles: notFoundStyles,
                        asNotFound: asNotFound,
                        childProp: childProp
                    }), 
                ];
            }));
            // Convert the parallel route map into an object after all promises have been resolved.
            const parallelRouteComponents = parallelRouteMap.reduce((list, [parallelRouteKey, Comp])=>{
                list[parallelRouteKey] = Comp;
                return list;
            }, {});
            // When the segment does not have a layout or page we still have to add the layout router to ensure the path holds the loading component
            if (!Component) {
                return {
                    Component: ()=>/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, parallelRouteComponents.children)
                };
            }
            const isClientComponent = (0, _clientReference).isClientReference(layoutOrPageMod);
            // If it's a not found route, and we don't have any matched parallel
            // routes, we try to render the not found component if it exists.
            let notFoundComponent = {};
            if (asNotFound && !parallelRouteMap.length && NotFound) {
                notFoundComponent = {
                    children: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("meta", {
                        name: "robots",
                        content: "noindex"
                    }), notFoundStyles, /*#__PURE__*/ _react.default.createElement(NotFound, null))
                };
            }
            const props = {
                ...parallelRouteComponents,
                ...notFoundComponent,
                // TODO-APP: params and query have to be blocked parallel route names. Might have to add a reserved name list.
                // Params are always the current params that apply to the layout
                // If you have a `/dashboard/[team]/layout.js` it will provide `team` as a param but not anything further down.
                params: currentParams,
                // Query is only provided to page
                ...(()=>{
                    if (isClientComponent && isStaticGeneration) {
                        return {};
                    }
                    if (isPage) {
                        return searchParamsProps;
                    }
                })()
            };
            // Eagerly execute layout/page component to trigger fetches early.
            if (!isClientComponent) {
                Component = await Promise.resolve().then(()=>(0, _preloadComponent).preloadComponent(Component, props));
            }
            return {
                Component: ()=>{
                    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, isPage && isClientComponent && isStaticGeneration ? /*#__PURE__*/ _react.default.createElement(StaticGenerationSearchParamsBailoutProvider, {
                        propsForComponent: props,
                        Component: Component
                    }) : /*#__PURE__*/ _react.default.createElement(Component, Object.assign({}, props)), assets);
                }
            };
        };
        // Handle Flight render request. This is only used when client-side navigating. E.g. when you `router.push('/dashboard')` or `router.reload()`.
        const generateFlight = async ()=>{
            /**
       * Use router state to decide at what common layout to render the page.
       * This can either be the common layout between two pages or a specific place to start rendering from using the "refetch" marker in the tree.
       */ const walkTreeWithFlightRouterState = async ({ createSegmentPath , loaderTreeToFilter , parentParams , isFirst , flightRouterState , parentRendered , rscPayloadHead , injectedCSS , injectedFontPreloadTags , rootLayoutIncluded , asNotFound  })=>{
                const [segment, parallelRoutes, components] = loaderTreeToFilter;
                const parallelRoutesKeys = Object.keys(parallelRoutes);
                const { layout  } = components;
                const isLayout = typeof layout !== "undefined";
                /**
         * Checks if the current segment is a root layout.
         */ const rootLayoutAtThisLevel = isLayout && !rootLayoutIncluded;
                /**
         * Checks if the current segment or any level above it has a root layout.
         */ const rootLayoutIncludedAtThisLevelOrAbove = rootLayoutIncluded || rootLayoutAtThisLevel;
                // Because this function walks to a deeper point in the tree to start rendering we have to track the dynamic parameters up to the point where rendering starts
                const segmentParam = getDynamicParamFromSegment(segment);
                const currentParams = // Handle null case where dynamic param is optional
                segmentParam && segmentParam.value !== null ? {
                    ...parentParams,
                    [segmentParam.param]: segmentParam.value
                } : parentParams;
                const actualSegment = (0, _createFlightRouterStateFromLoaderTree).addSearchParamsIfPageSegment(segmentParam ? segmentParam.treeSegment : segment, query);
                /**
         * Decide if the current segment is where rendering has to start.
         */ const renderComponentsOnThisLevel = // No further router state available
                !flightRouterState || // Segment in router state does not match current segment
                !(0, _matchSegments).matchSegment(actualSegment, flightRouterState[0]) || // Last item in the tree
                parallelRoutesKeys.length === 0 || // Explicit refresh
                flightRouterState[3] === "refetch";
                if (!parentRendered && renderComponentsOnThisLevel) {
                    const overriddenSegment = flightRouterState && (0, _matchSegments).canSegmentBeOverridden(actualSegment, flightRouterState[0]) ? flightRouterState[0] : null;
                    return [
                        overriddenSegment ?? actualSegment,
                        (0, _createFlightRouterStateFromLoaderTree).createFlightRouterStateFromLoaderTree(// Create router state using the slice of the loaderTree
                        loaderTreeToFilter, getDynamicParamFromSegment, query),
                        // Check if one level down from the common layout has a loading component. If it doesn't only provide the router state as part of the Flight data.
                        isPrefetch && !Boolean(components.loading) ? null : // @ts-expect-error TODO-APP: fix async component type
                        _react.default.createElement(async ()=>{
                            const { Component  } = await createComponentTree(// This ensures flightRouterPath is valid and filters down the tree
                            {
                                createSegmentPath: (child)=>{
                                    return createSegmentPath(child);
                                },
                                loaderTree: loaderTreeToFilter,
                                parentParams: currentParams,
                                firstItem: isFirst,
                                injectedCSS,
                                injectedFontPreloadTags,
                                // This is intentionally not "rootLayoutIncludedAtThisLevelOrAbove" as createComponentTree starts at the current level and does a check for "rootLayoutAtThisLevel" too.
                                rootLayoutIncluded: rootLayoutIncluded,
                                asNotFound
                            });
                            return /*#__PURE__*/ _react.default.createElement(Component, null);
                        }),
                        isPrefetch && !Boolean(components.loading) ? null : rscPayloadHead, 
                    ];
                }
                // If we are not rendering on this level we need to check if the current
                // segment has a layout. If so, we need to track all the used CSS to make
                // the result consistent.
                const layoutPath = layout == null ? void 0 : layout[1];
                const injectedCSSWithCurrentLayout = new Set(injectedCSS);
                const injectedFontPreloadTagsWithCurrentLayout = new Set(injectedFontPreloadTags);
                if (layoutPath) {
                    (0, _getCssInlinedLinkTags).getCssInlinedLinkTags(clientReferenceManifest, serverCSSManifest, layoutPath, serverCSSForEntries, injectedCSSWithCurrentLayout, true);
                    (0, _getPreloadedFontFilesInlineLinkTags).getPreloadedFontFilesInlineLinkTags(serverCSSManifest, nextFontManifest, serverCSSForEntries, layoutPath, injectedFontPreloadTagsWithCurrentLayout);
                }
                // Walk through all parallel routes.
                for (const parallelRouteKey of parallelRoutesKeys){
                    const parallelRoute = parallelRoutes[parallelRouteKey];
                    const currentSegmentPath = isFirst ? [
                        parallelRouteKey
                    ] : [
                        actualSegment,
                        parallelRouteKey
                    ];
                    const path = await walkTreeWithFlightRouterState({
                        createSegmentPath: (child)=>{
                            return createSegmentPath([
                                ...currentSegmentPath,
                                ...child
                            ]);
                        },
                        loaderTreeToFilter: parallelRoute,
                        parentParams: currentParams,
                        flightRouterState: flightRouterState && flightRouterState[1][parallelRouteKey],
                        parentRendered: parentRendered || renderComponentsOnThisLevel,
                        isFirst: false,
                        rscPayloadHead,
                        injectedCSS: injectedCSSWithCurrentLayout,
                        injectedFontPreloadTags: injectedFontPreloadTagsWithCurrentLayout,
                        rootLayoutIncluded: rootLayoutIncludedAtThisLevelOrAbove,
                        asNotFound
                    });
                    if (typeof path[path.length - 1] !== "string") {
                        return [
                            actualSegment,
                            parallelRouteKey,
                            ...path
                        ];
                    }
                }
                return [
                    actualSegment
                ];
            };
            const metadataItems = await resolveMetadata({
                tree: loaderTree,
                parentParams: {},
                metadataItems: []
            });
            // Flight data that is going to be passed to the browser.
            // Currently a single item array but in the future multiple patches might be combined in a single request.
            const flightData = [
                (await walkTreeWithFlightRouterState({
                    createSegmentPath: (child)=>child,
                    loaderTreeToFilter: loaderTree,
                    parentParams: {},
                    flightRouterState: providedFlightRouterState,
                    isFirst: true,
                    // For flight, render metadata inside leaf page
                    rscPayloadHead: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_metadata.MetadataTree, {
                        key: requestId,
                        metadata: metadataItems,
                        pathname: pathname
                    })),
                    injectedCSS: new Set(),
                    injectedFontPreloadTags: new Set(),
                    rootLayoutIncluded: false,
                    asNotFound: pathname === "/404"
                })).slice(1), 
            ];
            // For app dir, use the bundled version of Fizz renderer (renderToReadableStream)
            // which contains the subset React.
            const readable = ComponentMod.renderToReadableStream(flightData, clientReferenceManifest.clientModules, {
                context: serverContexts,
                onError: flightDataRendererErrorHandler
            }).pipeThrough((0, _nodeWebStreamsHelper).createBufferedTransformStream());
            return new _flightRenderResult.FlightRenderResult(readable);
        };
        if (isFlight && !staticGenerationStore.isStaticGeneration) {
            return generateFlight();
        }
        // Below this line is handling for rendering to HTML.
        // AppRouter is provided by next-app-loader
        const AppRouter = ComponentMod.AppRouter;
        const GlobalError = (0, _interopDefault).interopDefault(/** GlobalError can be either the default error boundary or the overwritten app/global-error.js **/ ComponentMod.GlobalError);
        let serverComponentsInlinedTransformStream = new TransformStream();
        const initialCanonicalUrl = (0, _validateUrl).validateURL(req.url);
        // Get the nonce from the incoming request if it has one.
        const csp = req.headers["content-security-policy"];
        let nonce;
        if (csp && typeof csp === "string") {
            nonce = (0, _getScriptNonceFromHeader).getScriptNonceFromHeader(csp);
        }
        const serverComponentsRenderOpts = {
            transformStream: serverComponentsInlinedTransformStream,
            clientReferenceManifest,
            serverContexts,
            rscChunks: []
        };
        const validateRootLayout = dev ? {
            validateRootLayout: {
                assetPrefix: renderOpts.assetPrefix,
                getTree: ()=>(0, _createFlightRouterStateFromLoaderTree).createFlightRouterStateFromLoaderTree(loaderTree, getDynamicParamFromSegment, query)
            }
        } : {};
        const metadataItems1 = await resolveMetadata({
            tree: loaderTree,
            parentParams: {},
            metadataItems: []
        });
        /**
     * A new React Component that renders the provided React Component
     * using Flight which can then be rendered to HTML.
     */ const ServerComponentsRenderer = (0, _createServerComponentsRenderer).createServerComponentRenderer(async (props)=>{
            // Create full component tree from root to leaf.
            const injectedCSS = new Set();
            const injectedFontPreloadTags = new Set();
            const { Component: ComponentTree  } = await createComponentTree({
                createSegmentPath: (child)=>child,
                loaderTree,
                parentParams: {},
                firstItem: true,
                injectedCSS,
                injectedFontPreloadTags,
                rootLayoutIncluded: false,
                asNotFound: props.asNotFound
            });
            const { "not-found": notFound , layout  } = loaderTree[2];
            const isLayout = typeof layout !== "undefined";
            const rootLayoutModule = layout == null ? void 0 : layout[0];
            const RootLayout = rootLayoutModule ? (0, _interopDefault).interopDefault(await rootLayoutModule()) : null;
            const rootLayoutAtThisLevel = isLayout;
            const [NotFound, notFoundStyles] = notFound ? await createComponentAndStyles({
                filePath: notFound[1],
                getComponent: notFound[0],
                injectedCSS
            }) : rootLayoutAtThisLevel ? [
                _error.NotFound
            ] : [];
            const assets = createStaticAssets({
                layoutOrPagePath: layout == null ? void 0 : layout[1],
                injectedCSS,
                injectedFontPreloadTags
            });
            const initialTree = (0, _createFlightRouterStateFromLoaderTree).createFlightRouterStateFromLoaderTree(loaderTree, getDynamicParamFromSegment, query);
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(AppRouter, {
                assetPrefix: assetPrefix,
                initialCanonicalUrl: initialCanonicalUrl,
                initialTree: initialTree,
                initialHead: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_metadata.MetadataTree, {
                    key: requestId,
                    metadata: metadataItems1,
                    pathname: pathname
                })),
                globalErrorComponent: GlobalError,
                notFound: NotFound && RootLayout ? /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, assets, /*#__PURE__*/ _react.default.createElement(RootLayout, {
                    params: {}
                }, notFoundStyles, /*#__PURE__*/ _react.default.createElement(NotFound, null))) : undefined,
                asNotFound: props.asNotFound
            }, /*#__PURE__*/ _react.default.createElement(ComponentTree, null)));
        }, ComponentMod, serverComponentsRenderOpts, serverComponentsErrorHandler, nonce);
        const serverInsertedHTMLCallbacks = new Set();
        function InsertedHTML({ children  }) {
            // Reset addInsertedHtmlCallback on each render
            serverInsertedHTMLCallbacks.clear();
            const addInsertedHtml = _react.default.useCallback((handler)=>{
                serverInsertedHTMLCallbacks.add(handler);
            }, []);
            return /*#__PURE__*/ _react.default.createElement(_headManagerContext.HeadManagerContext.Provider, {
                value: {
                    appDir: true,
                    nonce
                }
            }, /*#__PURE__*/ _react.default.createElement(_serverInsertedHtml.ServerInsertedHTMLContext.Provider, {
                value: addInsertedHtml
            }, children));
        }
        (ref1 = (0, _tracer).getTracer().getRootSpanAttributes()) == null ? void 0 : ref1.set("next.route", pathname);
        const bodyResult = (0, _tracer).getTracer().wrap(_constants.AppRenderSpan.getBodyResult, {
            spanName: `render route (app) ${pathname}`,
            attributes: {
                "next.route": pathname
            }
        }, async ({ asNotFound  })=>{
            const polyfills = buildManifest.polyfillFiles.filter((polyfill)=>polyfill.endsWith(".js") && !polyfill.endsWith(".module.js")).map((polyfill)=>{
                return {
                    src: `${assetPrefix}/_next/${polyfill}`,
                    integrity: subresourceIntegrityManifest == null ? void 0 : subresourceIntegrityManifest[polyfill]
                };
            });
            const content = /*#__PURE__*/ _react.default.createElement(InsertedHTML, null, /*#__PURE__*/ _react.default.createElement(ServerComponentsRenderer, {
                asNotFound: !!asNotFound
            }));
            let polyfillsFlushed = false;
            let flushedErrorMetaTagsUntilIndex = 0;
            const getServerInsertedHTML = ()=>{
                // Loop through all the errors that have been captured but not yet
                // flushed.
                const errorMetaTags = [];
                for(; flushedErrorMetaTagsUntilIndex < allCapturedErrors.length; flushedErrorMetaTagsUntilIndex++){
                    const error = allCapturedErrors[flushedErrorMetaTagsUntilIndex];
                    if ((0, _notFound).isNotFoundError(error)) {
                        errorMetaTags.push(/*#__PURE__*/ _react.default.createElement("meta", {
                            name: "robots",
                            content: "noindex",
                            key: error.digest
                        }));
                    } else if ((0, _redirect).isRedirectError(error)) {
                        const redirectUrl = (0, _redirect).getURLFromRedirectError(error);
                        if (redirectUrl) {
                            errorMetaTags.push(/*#__PURE__*/ _react.default.createElement("meta", {
                                httpEquiv: "refresh",
                                content: `0;url=${redirectUrl}`,
                                key: error.digest
                            }));
                        }
                    }
                }
                const flushed = (0, _renderToString).renderToString(/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, Array.from(serverInsertedHTMLCallbacks).map((callback)=>callback()), polyfillsFlushed ? null : polyfills == null ? void 0 : polyfills.map((polyfill)=>{
                    return /*#__PURE__*/ _react.default.createElement("script", {
                        key: polyfill.src,
                        src: polyfill.src,
                        integrity: polyfill.integrity,
                        noModule: true,
                        nonce: nonce
                    });
                }), errorMetaTags));
                polyfillsFlushed = true;
                return flushed;
            };
            try {
                const renderStream = await (0, _nodeWebStreamsHelper).renderToInitialStream({
                    ReactDOMServer: _serverBrowser.default,
                    element: content,
                    streamOptions: {
                        onError: htmlRendererErrorHandler,
                        nonce,
                        // Include hydration scripts in the HTML
                        bootstrapScripts: [
                            ...subresourceIntegrityManifest ? buildManifest.rootMainFiles.map((src)=>({
                                    src: `${assetPrefix}/_next/` + src,
                                    integrity: subresourceIntegrityManifest[src]
                                })) : buildManifest.rootMainFiles.map((src)=>`${assetPrefix}/_next/` + src), 
                        ]
                    }
                });
                const result = await (0, _nodeWebStreamsHelper).continueFromInitialStream(renderStream, {
                    dataStream: serverComponentsInlinedTransformStream == null ? void 0 : serverComponentsInlinedTransformStream.readable,
                    generateStaticHTML: staticGenerationStore.isStaticGeneration || generateStaticHTML,
                    getServerInsertedHTML,
                    serverInsertedHTMLToHead: true,
                    ...validateRootLayout
                });
                return result;
            } catch (err) {
                var ref;
                if (err.code === "NEXT_STATIC_GEN_BAILOUT" || ((ref = err.message) == null ? void 0 : ref.includes("https://nextjs.org/docs/advanced-features/static-html-export"))) {
                    // Ensure that "next dev" prints the red error overlay
                    throw err;
                }
                if (err.digest === _noSsrError.NEXT_DYNAMIC_NO_SSR_CODE) {
                    (0, _log).warn(`Entire page ${pathname} deopted into client-side rendering. https://nextjs.org/docs/messages/deopted-into-client-rendering`, pathname);
                }
                if ((0, _notFound).isNotFoundError(err)) {
                    res.statusCode = 404;
                }
                if ((0, _redirect).isRedirectError(err)) {
                    res.statusCode = 307;
                }
                const renderStream = await (0, _nodeWebStreamsHelper).renderToInitialStream({
                    ReactDOMServer: _serverBrowser.default,
                    element: /*#__PURE__*/ _react.default.createElement("html", {
                        id: "__next_error__"
                    }, /*#__PURE__*/ _react.default.createElement("head", null, /*#__PURE__*/ _react.default.createElement(_metadata.MetadataTree, {
                        key: requestId,
                        metadata: [],
                        pathname: pathname
                    })), /*#__PURE__*/ _react.default.createElement("body", null)),
                    streamOptions: {
                        nonce,
                        // Include hydration scripts in the HTML
                        bootstrapScripts: subresourceIntegrityManifest ? buildManifest.rootMainFiles.map((src)=>({
                                src: `${assetPrefix}/_next/` + src,
                                integrity: subresourceIntegrityManifest[src]
                            })) : buildManifest.rootMainFiles.map((src)=>`${assetPrefix}/_next/` + src)
                    }
                });
                return await (0, _nodeWebStreamsHelper).continueFromInitialStream(renderStream, {
                    dataStream: serverComponentsInlinedTransformStream == null ? void 0 : serverComponentsInlinedTransformStream.readable,
                    generateStaticHTML: staticGenerationStore.isStaticGeneration,
                    getServerInsertedHTML,
                    serverInsertedHTMLToHead: true,
                    ...validateRootLayout
                });
            }
        });
        // For action requests, we handle them differently with a special render result.
        const actionRequestResult = await (0, _actionHandler).handleAction({
            req,
            res,
            ComponentMod,
            pathname: renderOpts.pathname,
            serverActionsManifest
        });
        if (actionRequestResult === "not-found") {
            return new _renderResult.default(await bodyResult({
                asNotFound: true
            }));
        } else if (actionRequestResult) {
            return actionRequestResult;
        }
        const renderResult = new _renderResult.default(await bodyResult({
            asNotFound: pathname === "/404"
        }));
        if (staticGenerationStore.pendingRevalidates) {
            await Promise.all(staticGenerationStore.pendingRevalidates);
        }
        if (staticGenerationStore.isStaticGeneration) {
            const htmlResult = await (0, _nodeWebStreamsHelper).streamToBufferedResult(renderResult);
            // if we encountered any unexpected errors during build
            // we fail the prerendering phase and the build
            if (capturedErrors.length > 0) {
                throw capturedErrors[0];
            }
            // TODO-APP: derive this from same pass to prevent additional
            // render during static generation
            const filteredFlightData = await (0, _nodeWebStreamsHelper).streamToBufferedResult(await generateFlight());
            if (staticGenerationStore.forceStatic === false) {
                staticGenerationStore.revalidate = 0;
            }
            const extraRenderResultMeta = {
                pageData: filteredFlightData,
                revalidate: staticGenerationStore.revalidate ?? defaultRevalidate
            };
            // provide bailout info for debugging
            if (extraRenderResultMeta.revalidate === 0) {
                extraRenderResultMeta.staticBailoutInfo = {
                    description: staticGenerationStore.dynamicUsageDescription,
                    stack: staticGenerationStore.dynamicUsageStack
                };
            }
            return new _renderResult.default(htmlResult, {
                ...extraRenderResultMeta
            });
        }
        return renderResult;
    };
    return _requestAsyncStorageWrapper.RequestAsyncStorageWrapper.wrap(requestAsyncStorage, {
        req,
        res,
        renderOpts
    }, ()=>_staticGenerationAsyncStorageWrapper.StaticGenerationAsyncStorageWrapper.wrap(staticGenerationAsyncStorage, {
            pathname,
            renderOpts
        }, ()=>wrappedRender()));
}

//# sourceMappingURL=app-render.js.map