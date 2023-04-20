"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flushAndExit = flushAndExit;
var _shared = require("../trace/shared");
async function flushAndExit(code) {
    let telemetry = _shared.traceGlobals.get("telemetry");
    if (telemetry) {
        await telemetry.flush();
    }
    process.exit(code);
}

//# sourceMappingURL=flush-and-exit.js.map