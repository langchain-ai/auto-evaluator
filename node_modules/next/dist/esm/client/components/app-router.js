"use client";
import _async_to_generator from "@swc/helpers/src/_async_to_generator.mjs";
import _object_without_properties_loose from "@swc/helpers/src/_object_without_properties_loose.mjs";
import React, { useEffect, useMemo, useCallback } from 'react';
import { AppRouterContext, LayoutRouterContext, GlobalLayoutRouterContext, CacheStates } from '../../shared/lib/app-router-context';
import { reducer } from './router-reducer/router-reducer';
import { ACTION_NAVIGATE, ACTION_PREFETCH, ACTION_REFRESH, ACTION_RESTORE, ACTION_SERVER_PATCH } from './router-reducer/router-reducer-types';
import { createHrefFromUrl } from './router-reducer/create-href-from-url';
import { SearchParamsContext, // ParamsContext,
PathnameContext } from '../../shared/lib/hooks-client-context';
import { useReducerWithReduxDevtools } from './use-reducer-with-devtools';
import { ErrorBoundary } from './error-boundary';
import { createInitialRouterState } from './router-reducer/create-initial-router-state';
import { fetchServerResponse } from './router-reducer/fetch-server-response';
import { isBot } from '../../shared/lib/router/utils/is-bot';
import { addBasePath } from '../add-base-path';

const isServer = typeof window === 'undefined';
// Ensure the initialParallelRoutes are not combined because of double-rendering in the browser with Strict Mode.
let initialParallelRoutes = isServer ? null : new Map();
export function urlToUrlWithoutFlightMarker(url) {
    const urlWithoutFlightParameters = new URL(url, location.origin);
    // TODO-APP: handle .rsc for static export case
    return urlWithoutFlightParameters;
}
const HotReloader = process.env.NODE_ENV === 'production' ? null : require('./react-dev-overlay/hot-reloader-client').default;
const prefetched = new Set();
function isExternalURL(url) {
    return url.origin !== window.location.origin;
}
/**
 * The global router that wraps the application components.
 */ function Router({ initialHead , initialTree , initialCanonicalUrl , children , assetPrefix  }) {
    const initialState = useMemo(()=>createInitialRouterState({
            children,
            initialCanonicalUrl,
            initialTree,
            initialParallelRoutes,
            isServer,
            location: !isServer ? window.location : null,
            initialHead
        }), [
        children,
        initialCanonicalUrl,
        initialTree,
        initialHead
    ]);
    const [{ tree , cache , prefetchCache , pushRef , focusAndScrollRef , canonicalUrl  }, dispatch, sync, ] = useReducerWithReduxDevtools(reducer, initialState);
    useEffect(()=>{
        // Ensure initialParallelRoutes is cleaned up from memory once it's used.
        initialParallelRoutes = null;
    }, []);
    // Add memoized pathname/query for useSearchParams and usePathname.
    const { searchParams , pathname  } = useMemo(()=>{
        const url = new URL(canonicalUrl, typeof window === 'undefined' ? 'http://n' : window.location.href);
        return {
            // This is turned into a readonly class in `useSearchParams`
            searchParams: url.searchParams,
            pathname: url.pathname
        };
    }, [
        canonicalUrl
    ]);
    /**
   * Server response that only patches the cache and tree.
   */ const changeByServerResponse = useCallback((previousTree, flightData, overrideCanonicalUrl)=>{
        dispatch({
            type: ACTION_SERVER_PATCH,
            flightData,
            previousTree,
            overrideCanonicalUrl,
            cache: {
                status: CacheStates.LAZY_INITIALIZED,
                data: null,
                subTreeData: null,
                parallelRoutes: new Map()
            },
            mutable: {}
        });
    }, [
        dispatch
    ]);
    /**
   * The app router that is exposed through `useRouter`. It's only concerned with dispatching actions to the reducer, does not hold state.
   */ const appRouter = useMemo(()=>{
        const navigate = (href, navigateType, forceOptimisticNavigation)=>{
            const url = new URL(addBasePath(href), location.origin);
            return dispatch({
                type: ACTION_NAVIGATE,
                url,
                isExternalUrl: isExternalURL(url),
                locationSearch: location.search,
                forceOptimisticNavigation,
                navigateType,
                cache: {
                    status: CacheStates.LAZY_INITIALIZED,
                    data: null,
                    subTreeData: null,
                    parallelRoutes: new Map()
                },
                mutable: {}
            });
        };
        const routerInstance = {
            back: ()=>window.history.back(),
            forward: ()=>window.history.forward(),
            prefetch: _async_to_generator(function*(href) {
                const hrefWithBasePath = addBasePath(href);
                // If prefetch has already been triggered, don't trigger it again.
                if (prefetched.has(hrefWithBasePath) || typeof window !== 'undefined' && isBot(window.navigator.userAgent)) {
                    return;
                }
                prefetched.add(hrefWithBasePath);
                const url = new URL(hrefWithBasePath, location.origin);
                // External urls can't be prefetched in the same way.
                if (isExternalURL(url)) {
                    return;
                }
                try {
                    var ref;
                    const routerTree = ((ref = window.history.state) == null ? void 0 : ref.tree) || initialTree;
                    const serverResponse = yield fetchServerResponse(url, // initialTree is used when history.state.tree is missing because the history state is set in `useEffect` below, it being missing means this is the hydration case.
                    routerTree, true);
                    // @ts-ignore startTransition exists
                    React.startTransition(()=>{
                        dispatch({
                            type: ACTION_PREFETCH,
                            url,
                            tree: routerTree,
                            serverResponse
                        });
                    });
                } catch (err) {
                    console.error('PREFETCH ERROR', err);
                }
            }),
            replace: (href, options = {})=>{
                // @ts-ignore startTransition exists
                React.startTransition(()=>{
                    navigate(href, 'replace', Boolean(options.forceOptimisticNavigation));
                });
            },
            push: (href, options = {})=>{
                // @ts-ignore startTransition exists
                React.startTransition(()=>{
                    navigate(href, 'push', Boolean(options.forceOptimisticNavigation));
                });
            },
            refresh: ()=>{
                // @ts-ignore startTransition exists
                React.startTransition(()=>{
                    dispatch({
                        type: ACTION_REFRESH,
                        cache: {
                            status: CacheStates.LAZY_INITIALIZED,
                            data: null,
                            subTreeData: null,
                            parallelRoutes: new Map()
                        },
                        mutable: {},
                        origin: window.location.origin
                    });
                });
            }
        };
        return routerInstance;
    }, [
        dispatch,
        initialTree
    ]);
    useEffect(()=>{
        // When mpaNavigation flag is set do a hard navigation to the new url.
        if (pushRef.mpaNavigation) {
            const location = window.location;
            if (pushRef.pendingPush) {
                location.assign(canonicalUrl);
            } else {
                location.replace(canonicalUrl);
            }
            return;
        }
        // Identifier is shortened intentionally.
        // __NA is used to identify if the history entry can be handled by the app-router.
        // __N is used to identify if the history entry can be handled by the old router.
        const historyState = {
            __NA: true,
            tree
        };
        if (pushRef.pendingPush && createHrefFromUrl(new URL(window.location.href)) !== canonicalUrl) {
            // This intentionally mutates React state, pushRef is overwritten to ensure additional push/replace calls do not trigger an additional history entry.
            pushRef.pendingPush = false;
            window.history.pushState(historyState, '', canonicalUrl);
        } else {
            window.history.replaceState(historyState, '', canonicalUrl);
        }
        sync();
    }, [
        tree,
        pushRef,
        canonicalUrl,
        sync
    ]);
    // Add `window.nd` for debugging purposes.
    // This is not meant for use in applications as concurrent rendering will affect the cache/tree/router.
    if (typeof window !== 'undefined') {
        // @ts-ignore this is for debugging
        window.nd = {
            router: appRouter,
            cache,
            prefetchCache,
            tree
        };
    }
    /**
   * Handle popstate event, this is used to handle back/forward in the browser.
   * By default dispatches ACTION_RESTORE, however if the history entry was not pushed/replaced by app-router it will reload the page.
   * That case can happen when the old router injected the history entry.
   */ const onPopState = useCallback(({ state  })=>{
        if (!state) {
            // TODO-APP: this case only happens when pushState/replaceState was called outside of Next.js. It should probably reload the page in this case.
            return;
        }
        // This case happens when the history entry was pushed by the `pages` router.
        if (!state.__NA) {
            window.location.reload();
            return;
        }
        // @ts-ignore useTransition exists
        // TODO-APP: Ideally the back button should not use startTransition as it should apply the updates synchronously
        // Without startTransition works if the cache is there for this path
        React.startTransition(()=>{
            dispatch({
                type: ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: state.tree
            });
        });
    }, [
        dispatch
    ]);
    // Register popstate event to call onPopstate.
    useEffect(()=>{
        window.addEventListener('popstate', onPopState);
        return ()=>{
            window.removeEventListener('popstate', onPopState);
        };
    }, [
        onPopState
    ]);
    const content = /*#__PURE__*/ React.createElement(React.Fragment, null, cache.subTreeData);
    return /*#__PURE__*/ React.createElement(PathnameContext.Provider, {
        value: pathname
    }, /*#__PURE__*/ React.createElement(SearchParamsContext.Provider, {
        value: searchParams
    }, /*#__PURE__*/ React.createElement(GlobalLayoutRouterContext.Provider, {
        value: {
            changeByServerResponse,
            tree,
            focusAndScrollRef
        }
    }, /*#__PURE__*/ React.createElement(AppRouterContext.Provider, {
        value: appRouter
    }, /*#__PURE__*/ React.createElement(LayoutRouterContext.Provider, {
        value: {
            childNodes: cache.parallelRoutes,
            tree: tree,
            // Root node always has `url`
            // Provided in AppTreeContext to ensure it can be overwritten in layout-router
            url: canonicalUrl,
            headRenderedAboveThisLevel: false
        }
    }, HotReloader ? /*#__PURE__*/ React.createElement(HotReloader, {
        assetPrefix: assetPrefix
    }, content) : content)))));
}
export default function AppRouter(props) {
    const { globalErrorComponent  } = props, rest = _object_without_properties_loose(props, [
        "globalErrorComponent"
    ]);
    return /*#__PURE__*/ React.createElement(ErrorBoundary, {
        errorComponent: globalErrorComponent
    }, /*#__PURE__*/ React.createElement(Router, Object.assign({}, rest)));
};

//# sourceMappingURL=app-router.js.map