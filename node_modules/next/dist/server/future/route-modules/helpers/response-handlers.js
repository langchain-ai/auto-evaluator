"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleTemporaryRedirectResponse = handleTemporaryRedirectResponse;
exports.handleBadRequestResponse = handleBadRequestResponse;
exports.handleNotFoundResponse = handleNotFoundResponse;
exports.handleMethodNotAllowedResponse = handleMethodNotAllowedResponse;
exports.handleInternalServerErrorResponse = handleInternalServerErrorResponse;
function handleTemporaryRedirectResponse(url) {
    return new Response(null, {
        status: 302,
        statusText: "Found",
        headers: {
            location: url
        }
    });
}
function handleBadRequestResponse() {
    return new Response(null, {
        status: 400,
        statusText: "Bad Request"
    });
}
function handleNotFoundResponse() {
    return new Response(null, {
        status: 404,
        statusText: "Not Found"
    });
}
function handleMethodNotAllowedResponse() {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed"
    });
}
function handleInternalServerErrorResponse() {
    return new Response(null, {
        status: 500,
        statusText: "Internal Server Error"
    });
}

//# sourceMappingURL=response-handlers.js.map