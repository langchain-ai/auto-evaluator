"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.refreshReducer = refreshReducer;
var _fetchServerResponse = require("../fetch-server-response");
var _createRecordFromThenable = require("../create-record-from-thenable");
var _readRecordValue = require("../read-record-value");
var _createHrefFromUrl = require("../create-href-from-url");
var _applyRouterStatePatchToTree = require("../apply-router-state-patch-to-tree");
var _isNavigatingToNewRootLayout = require("../is-navigating-to-new-root-layout");
var _navigateReducer = require("./navigate-reducer");
function refreshReducer(state, action) {
    const { cache , mutable , origin  } = action;
    const href = state.canonicalUrl;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _navigateReducer).handleMutable(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createRecordFromThenable).createRecordFromThenable((0, _fetchServerResponse).fetchServerResponse(new URL(href, origin), [
            state.tree[0],
            state.tree[1],
            state.tree[2],
            'refetch', 
        ]));
    }
    const [flightData, canonicalUrlOverride] = (0, _readRecordValue).readRecordValue(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === 'string') {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
    const flightDataPath = flightData[0];
    // FlightDataPath with more than two items means unexpected Flight data was returned
    if (flightDataPath.length !== 3) {
        // TODO-APP: handle this case better
        console.log('REFRESH FAILED');
        return state;
    }
    // Given the path can only have two items the items are only the router state and subTreeData for the root.
    const [treePatch] = flightDataPath;
    const newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree(// TODO-APP: remove ''
    [
        ''
    ], state.tree, treePatch);
    if (newTree === null) {
        throw new Error('SEGMENT MISMATCH');
    }
    if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, href, state.pushRef.pendingPush);
    }
    const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createHrefFromUrl).createHrefFromUrl(canonicalUrlOverride) : undefined;
    if (canonicalUrlOverride) {
        mutable.canonicalUrl = canonicalUrlOverrideHref;
    }
    const applied = (0, _navigateReducer).applyFlightData(state, cache, flightDataPath);
    if (applied) {
        mutable.cache = cache;
    }
    mutable.previousTree = state.tree;
    mutable.patchedTree = newTree;
    mutable.canonicalUrl = href;
    return (0, _navigateReducer).handleMutable(state, mutable);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=refresh-reducer.js.map