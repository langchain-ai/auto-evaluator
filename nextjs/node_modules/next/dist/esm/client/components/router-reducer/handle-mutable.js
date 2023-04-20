import { computeChangedPath } from './compute-changed-path';
export function handleMutable(state, mutable) {
    var ref;
    return {
        // Set href.
        canonicalUrl: typeof mutable.canonicalUrl !== 'undefined' ? mutable.canonicalUrl === state.canonicalUrl ? state.canonicalUrl : mutable.canonicalUrl : state.canonicalUrl,
        pushRef: {
            pendingPush: typeof mutable.pendingPush !== 'undefined' ? mutable.pendingPush : state.pushRef.pendingPush,
            mpaNavigation: typeof mutable.mpaNavigation !== 'undefined' ? mutable.mpaNavigation : state.pushRef.mpaNavigation
        },
        // All navigation requires scroll and focus management to trigger.
        focusAndScrollRef: {
            apply: typeof mutable.applyFocusAndScroll !== 'undefined' ? mutable.applyFocusAndScroll : state.focusAndScrollRef.apply,
            hashFragment: // Empty hash should trigger default behavior of scrolling layout into view.
            // #top is handled in layout-router.
            mutable.hashFragment && mutable.hashFragment !== '' ? decodeURIComponent(mutable.hashFragment.slice(1)) : null
        },
        // Apply cache.
        cache: mutable.cache ? mutable.cache : state.cache,
        prefetchCache: mutable.prefetchCache ? mutable.prefetchCache : state.prefetchCache,
        // Apply patched router state.
        tree: typeof mutable.patchedTree !== 'undefined' ? mutable.patchedTree : state.tree,
        nextUrl: typeof mutable.patchedTree !== 'undefined' ? (ref = computeChangedPath(state.tree, mutable.patchedTree)) != null ? ref : state.canonicalUrl : state.nextUrl
    };
}

//# sourceMappingURL=handle-mutable.js.map