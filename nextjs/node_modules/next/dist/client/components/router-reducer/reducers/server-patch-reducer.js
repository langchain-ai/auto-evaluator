"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverPatchReducer = serverPatchReducer;
var _createHrefFromUrl = require("../create-href-from-url");
var _applyRouterStatePatchToTree = require("../apply-router-state-patch-to-tree");
var _isNavigatingToNewRootLayout = require("../is-navigating-to-new-root-layout");
var _navigateReducer = require("./navigate-reducer");
var _applyFlightData = require("../apply-flight-data");
var _handleMutable = require("../handle-mutable");
function serverPatchReducer(state, action) {
    const { flightData , previousTree , overrideCanonicalUrl , cache , mutable  } = action;
    const isForCurrentTree = JSON.stringify(previousTree) === JSON.stringify(state.tree);
    // When a fetch is slow to resolve it could be that you navigated away while the request was happening or before the reducer runs.
    // In that case opt-out of applying the patch given that the data could be stale.
    if (!isForCurrentTree) {
        // TODO-APP: Handle tree mismatch
        console.log('TREE MISMATCH');
        // Keep everything as-is.
        return state;
    }
    if (mutable.previousTree) {
        return (0, _handleMutable).handleMutable(state, mutable);
    }
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === 'string') {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // TODO-APP: Currently the Flight data can only have one item but in the future it can have multiple paths.
    const flightDataPath = flightData[0];
    // Slices off the last segment (which is at -4) as it doesn't exist in the tree yet
    const flightSegmentPath = flightDataPath.slice(0, -4);
    const [treePatch] = flightDataPath.slice(-3, -2);
    const newTree = (0, _applyRouterStatePatchToTree).applyRouterStatePatchToTree(// TODO-APP: remove ''
    [
        '',
        ...flightSegmentPath
    ], state.tree, treePatch);
    if (newTree === null) {
        throw new Error('SEGMENT MISMATCH');
    }
    if ((0, _isNavigatingToNewRootLayout).isNavigatingToNewRootLayout(state.tree, newTree)) {
        return (0, _navigateReducer).handleExternalUrl(state, mutable, state.canonicalUrl, state.pushRef.pendingPush);
    }
    const canonicalUrlOverrideHref = overrideCanonicalUrl ? (0, _createHrefFromUrl).createHrefFromUrl(overrideCanonicalUrl) : undefined;
    if (canonicalUrlOverrideHref) {
        mutable.canonicalUrl = canonicalUrlOverrideHref;
    }
    (0, _applyFlightData).applyFlightData(state, cache, flightDataPath);
    mutable.previousTree = state.tree;
    mutable.patchedTree = newTree;
    mutable.cache = cache;
    return (0, _handleMutable).handleMutable(state, mutable);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=server-patch-reducer.js.map