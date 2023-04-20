"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createErrorHandler = createErrorHandler;
var _hooksServerContext = require("../../client/components/hooks-server-context");
var _stringHash = _interopRequireDefault(require("next/dist/compiled/string-hash"));
var _formatServerError = require("../../lib/format-server-error");
var _notFound = require("../../client/components/not-found");
var _redirect = require("../../client/components/redirect");
var _noSsrError = require("../../shared/lib/lazy-dynamic/no-ssr-error");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createErrorHandler({ /**
   * Used for debugging
   */ _source , dev , isNextExport , errorLogger , capturedErrors , allCapturedErrors  }) {
    return (err)=>{
        var ref;
        if (allCapturedErrors) allCapturedErrors.push(err);
        if (err && (err.digest === _hooksServerContext.DYNAMIC_ERROR_CODE || (0, _notFound).isNotFoundError(err) || err.digest === _noSsrError.NEXT_DYNAMIC_NO_SSR_CODE || (0, _redirect).isRedirectError(err))) {
            return err.digest;
        }
        // Format server errors in development to add more helpful error messages
        if (dev) {
            (0, _formatServerError).formatServerError(err);
        }
        // Used for debugging error source
        // console.error(_source, err)
        // Don't log the suppressed error during export
        if (!(isNextExport && (err == null ? void 0 : (ref = err.message) == null ? void 0 : ref.includes("The specific message is omitted in production builds to avoid leaking sensitive details.")))) {
            if (errorLogger) {
                errorLogger(err).catch(()=>{});
            } else {
                // The error logger is currently not provided in the edge runtime.
                // Use `log-app-dir-error` instead.
                // It won't log the source code, but the error will be more useful.
                if (process.env.NODE_ENV !== "production") {
                    const { logAppDirError  } = require("../dev/log-app-dir-error");
                    logAppDirError(err);
                }
                if (process.env.NODE_ENV === "production") {
                    console.error(err);
                }
            }
        }
        capturedErrors.push(err);
        // TODO-APP: look at using webcrypto instead. Requires a promise to be awaited.
        return (0, _stringHash).default(err.message + err.stack + (err.digest || "")).toString();
    };
}

//# sourceMappingURL=create-error-handler.js.map