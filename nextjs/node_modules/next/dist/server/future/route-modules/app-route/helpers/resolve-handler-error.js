"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveHandlerError = resolveHandlerError;
var _notFound = require("../../../../../client/components/not-found");
var _redirect = require("../../../../../client/components/redirect");
var _responseHandlers = require("../../helpers/response-handlers");
function resolveHandlerError(err) {
    if ((0, _redirect).isRedirectError(err)) {
        const redirect = (0, _redirect).getURLFromRedirectError(err);
        if (!redirect) {
            throw new Error("Invariant: Unexpected redirect url format");
        }
        // This is a redirect error! Send the redirect response.
        return (0, _responseHandlers).handleTemporaryRedirectResponse(redirect);
    }
    if ((0, _notFound).isNotFoundError(err)) {
        // This is a not found error! Send the not found response.
        return (0, _responseHandlers).handleNotFoundResponse();
    }
    // Return false to indicate that this is not a handled error.
    return false;
}

//# sourceMappingURL=resolve-handler-error.js.map