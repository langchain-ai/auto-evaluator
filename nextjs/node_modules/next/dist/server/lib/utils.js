"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.printAndExit = printAndExit;
exports.getNodeOptionsWithoutInspect = getNodeOptionsWithoutInspect;
exports.getPort = getPort;
exports.genExecArgv = void 0;
function printAndExit(message, code = 1) {
    if (code === 0) {
        console.log(message);
    } else {
        console.error(message);
    }
    process.exit(code);
}
const genExecArgv = (enabled, debugPort)=>{
    const execArgv = process.execArgv.filter((localArg)=>{
        return !localArg.startsWith("--inspect") && !localArg.startsWith("--inspect-brk");
    });
    if (enabled) {
        execArgv.push(`--inspect${enabled === "brk" ? "-brk" : ""}=${debugPort + 1}`);
    }
    return execArgv;
};
exports.genExecArgv = genExecArgv;
function getNodeOptionsWithoutInspect() {
    const NODE_INSPECT_RE = /--inspect(-brk)?(=\S+)?( |$)/;
    return (process.env.NODE_OPTIONS || "").replace(NODE_INSPECT_RE, "");
}
function getPort(args) {
    if (typeof args["--port"] === "number") {
        return args["--port"];
    }
    const parsed = process.env.PORT && parseInt(process.env.PORT, 10);
    if (typeof parsed === "number" && !Number.isNaN(parsed)) {
        return parsed;
    }
    return 3000;
}

//# sourceMappingURL=utils.js.map