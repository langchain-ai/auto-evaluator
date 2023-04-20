"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _requestMeta = require("../../../request-meta");
var _utils = require("../../utils");
var _request = require("../request");
class NextRequestAdapter {
    static fromBaseNextRequest(request) {
        // TODO: look at refining this check
        if ("request" in request && request.request) {
            return NextRequestAdapter.fromWebNextRequest(request);
        }
        return NextRequestAdapter.fromNodeNextRequest(request);
    }
    static fromNodeNextRequest(request) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
            // @ts-expect-error - this is handled by undici, when streams/web land use it instead
            body = request.body;
        }
        let url;
        if (request.url.startsWith("http")) {
            url = new URL(request.url);
        } else {
            // Grab the full URL from the request metadata.
            const base = (0, _requestMeta).getRequestMeta(request, "__NEXT_INIT_URL");
            if (!base) throw new Error("Invariant: missing url on request");
            url = new URL(request.url, base);
        }
        return new _request.NextRequest(url, {
            body,
            method: request.method,
            headers: (0, _utils).fromNodeHeaders(request.headers),
            // @ts-expect-error - see https://github.com/whatwg/fetch/pull/1457
            duplex: "half"
        });
    }
    static fromWebNextRequest(request) {
        // HEAD and GET requests can not have a body.
        let body = null;
        if (request.method !== "GET" && request.method !== "HEAD") {
            body = request.body;
        }
        return new _request.NextRequest(request.url, {
            body,
            method: request.method,
            headers: (0, _utils).fromNodeHeaders(request.headers),
            // @ts-expect-error - see https://github.com/whatwg/fetch/pull/1457
            duplex: "half"
        });
    }
}
exports.NextRequestAdapter = NextRequestAdapter;

//# sourceMappingURL=next-request.js.map