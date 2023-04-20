"use client";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchServerResponse = fetchServerResponse;
var _async_to_generator = require("@swc/helpers/lib/_async_to_generator.js").default;
var _client = require("next/dist/compiled/react-server-dom-webpack/client");
var _appRouterHeaders = require("../app-router-headers");
var _appRouter = require("../app-router");
var _appCallServer = require("../../app-call-server");

function fetchServerResponse(url, flightRouterState, nextUrl, prefetch) {
    return _fetchServerResponse.apply(this, arguments);
}
function _fetchServerResponse() {
    _fetchServerResponse = _async_to_generator(function*(url, flightRouterState, nextUrl, prefetch) {
        const headers = {
            // Enable flight response
            [_appRouterHeaders.RSC]: '1',
            // Provide the current router state
            [_appRouterHeaders.NEXT_ROUTER_STATE_TREE]: JSON.stringify(flightRouterState)
        };
        if (prefetch) {
            // Enable prefetch response
            headers[_appRouterHeaders.NEXT_ROUTER_PREFETCH] = '1';
        }
        if (nextUrl) {
            headers[_appRouterHeaders.NEXT_URL] = nextUrl;
        }
        try {
            let fetchUrl = url;
            if (process.env.NODE_ENV === 'production') {
                if (process.env.__NEXT_CONFIG_OUTPUT === 'export') {
                    fetchUrl = new URL(url) // clone
                    ;
                    if (fetchUrl.pathname.endsWith('/')) {
                        fetchUrl.pathname += 'index.txt';
                    } else {
                        fetchUrl.pathname += '.txt';
                    }
                }
            }
            const res = yield fetch(fetchUrl, {
                // Backwards compat for older browsers. `same-origin` is the default in modern browsers.
                credentials: 'same-origin',
                headers
            });
            const canonicalUrl = res.redirected ? (0, _appRouter).urlToUrlWithoutFlightMarker(res.url) : undefined;
            const contentType = res.headers.get('content-type') || '';
            let isFlightResponse = contentType === _appRouterHeaders.RSC_CONTENT_TYPE_HEADER;
            if (process.env.NODE_ENV === 'production') {
                if (process.env.__NEXT_CONFIG_OUTPUT === 'export') {
                    if (!isFlightResponse) {
                        isFlightResponse = contentType.startsWith('text/plain');
                    }
                }
            }
            // If fetch returns something different than flight response handle it like a mpa navigation
            if (!isFlightResponse) {
                return [
                    res.url,
                    undefined
                ];
            }
            // Handle the `fetch` readable stream that can be unwrapped by `React.use`.
            const flightData = yield (0, _client).createFromFetch(Promise.resolve(res), {
                callServer: _appCallServer.callServer
            });
            return [
                flightData,
                canonicalUrl
            ];
        } catch (err) {
            console.error('Failed to fetch RSC payload. Falling back to browser navigation.', err);
            // If fetch fails handle it like a mpa navigation
            // TODO-APP: Add a test for the case where a CORS request fails, e.g. external url redirect coming from the response.
            // See https://github.com/vercel/next.js/issues/43605#issuecomment-1451617521 for a reproduction.
            return [
                url.toString(),
                undefined
            ];
        }
    });
    return _fetchServerResponse.apply(this, arguments);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=fetch-server-response.js.map