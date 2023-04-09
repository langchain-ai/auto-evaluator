"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FLIGHT_PARAMETERS = exports.RSC_VARY_HEADER = exports.RSC_CONTENT_TYPE_HEADER = exports.FETCH_CACHE_HEADER = exports.NEXT_URL = exports.NEXT_ROUTER_PREFETCH = exports.NEXT_ROUTER_STATE_TREE = exports.ACTION = exports.RSC = void 0;
const RSC = 'RSC';
exports.RSC = RSC;
const ACTION = 'Next-Action';
exports.ACTION = ACTION;
const NEXT_ROUTER_STATE_TREE = 'Next-Router-State-Tree';
exports.NEXT_ROUTER_STATE_TREE = NEXT_ROUTER_STATE_TREE;
const NEXT_ROUTER_PREFETCH = 'Next-Router-Prefetch';
exports.NEXT_ROUTER_PREFETCH = NEXT_ROUTER_PREFETCH;
const NEXT_URL = 'Next-Url';
exports.NEXT_URL = NEXT_URL;
const FETCH_CACHE_HEADER = 'x-vercel-sc-headers';
exports.FETCH_CACHE_HEADER = FETCH_CACHE_HEADER;
const RSC_CONTENT_TYPE_HEADER = 'text/x-component';
exports.RSC_CONTENT_TYPE_HEADER = RSC_CONTENT_TYPE_HEADER;
const RSC_VARY_HEADER = `${RSC}, ${NEXT_ROUTER_STATE_TREE}, ${NEXT_ROUTER_PREFETCH}`;
exports.RSC_VARY_HEADER = RSC_VARY_HEADER;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ], 
];
exports.FLIGHT_PARAMETERS = FLIGHT_PARAMETERS;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=app-router-headers.js.map