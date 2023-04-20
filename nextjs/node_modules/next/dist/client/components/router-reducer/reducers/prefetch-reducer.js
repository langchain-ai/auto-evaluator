"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prefetchReducer = prefetchReducer;
var _createHrefFromUrl = require("../create-href-from-url");
var _fetchServerResponse = require("../fetch-server-response");
var _createRecordFromThenable = require("../create-record-from-thenable");
function prefetchReducer(state, action) {
    const { url  } = action;
    const href = (0, _createHrefFromUrl).createHrefFromUrl(url, // Ensures the hash is not part of the cache key as it does not affect fetching the server
    false);
    // If the href was already prefetched it is not necessary to prefetch it again
    if (state.prefetchCache.has(href)) {
        return state;
    }
    // fetchServerResponse is intentionally not awaited so that it can be unwrapped in the navigate-reducer
    const serverResponse = (0, _createRecordFromThenable).createRecordFromThenable((0, _fetchServerResponse).fetchServerResponse(url, // initialTree is used when history.state.tree is missing because the history state is set in `useEffect` below, it being missing means this is the hydration case.
    state.tree, state.nextUrl, true));
    // Create new tree based on the flightSegmentPath and router state patch
    state.prefetchCache.set(href, {
        // Create new tree based on the flightSegmentPath and router state patch
        treeAtTimeOfPrefetch: state.tree,
        data: serverResponse
    });
    return state;
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=prefetch-reducer.js.map