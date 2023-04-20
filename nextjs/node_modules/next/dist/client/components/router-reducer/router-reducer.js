"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = void 0;
var _routerReducerTypes = require("./router-reducer-types");
var _navigateReducer = require("./reducers/navigate-reducer");
var _serverPatchReducer = require("./reducers/server-patch-reducer");
var _restoreReducer = require("./reducers/restore-reducer");
var _refreshReducer = require("./reducers/refresh-reducer");
var _prefetchReducer = require("./reducers/prefetch-reducer");
var _fastRefreshReducer = require("./reducers/fast-refresh-reducer");
/**
 * Reducer that handles the app-router state updates.
 */ function clientReducer(state, action) {
    switch(action.type){
        case _routerReducerTypes.ACTION_NAVIGATE:
            {
                return (0, _navigateReducer).navigateReducer(state, action);
            }
        case _routerReducerTypes.ACTION_SERVER_PATCH:
            {
                return (0, _serverPatchReducer).serverPatchReducer(state, action);
            }
        case _routerReducerTypes.ACTION_RESTORE:
            {
                return (0, _restoreReducer).restoreReducer(state, action);
            }
        case _routerReducerTypes.ACTION_REFRESH:
            {
                return (0, _refreshReducer).refreshReducer(state, action);
            }
        case _routerReducerTypes.ACTION_FAST_REFRESH:
            {
                return (0, _fastRefreshReducer).fastRefreshReducer(state, action);
            }
        case _routerReducerTypes.ACTION_PREFETCH:
            {
                return (0, _prefetchReducer).prefetchReducer(state, action);
            }
        // This case should never be hit as dispatch is strongly typed.
        default:
            throw new Error('Unknown action');
    }
}
function serverReducer(state, _action) {
    return state;
}
const reducer = typeof window === 'undefined' ? serverReducer : clientReducer;
exports.reducer = reducer;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=router-reducer.js.map