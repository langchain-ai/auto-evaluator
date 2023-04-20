import { createHrefFromUrl } from '../create-href-from-url';
export function restoreReducer(state, action) {
    const { url , tree  } = action;
    const href = createHrefFromUrl(url);
    return {
        // Set canonical url
        canonicalUrl: href,
        pushRef: state.pushRef,
        focusAndScrollRef: state.focusAndScrollRef,
        cache: state.cache,
        prefetchCache: state.prefetchCache,
        // Restore provided tree
        tree: tree,
        nextUrl: url.pathname
    };
}

//# sourceMappingURL=restore-reducer.js.map