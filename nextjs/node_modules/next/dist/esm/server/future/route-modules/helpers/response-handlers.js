export function handleTemporaryRedirectResponse(url) {
    return new Response(null, {
        status: 302,
        statusText: "Found",
        headers: {
            location: url
        }
    });
}
export function handleBadRequestResponse() {
    return new Response(null, {
        status: 400,
        statusText: "Bad Request"
    });
}
export function handleNotFoundResponse() {
    return new Response(null, {
        status: 404,
        statusText: "Not Found"
    });
}
export function handleMethodNotAllowedResponse() {
    return new Response(null, {
        status: 405,
        statusText: "Method Not Allowed"
    });
}
export function handleInternalServerErrorResponse() {
    return new Response(null, {
        status: 500,
        statusText: "Internal Server Error"
    });
}

//# sourceMappingURL=response-handlers.js.map