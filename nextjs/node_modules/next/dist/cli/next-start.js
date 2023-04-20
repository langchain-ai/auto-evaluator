#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nextStart = void 0;
var _indexJs = _interopRequireDefault(require("next/dist/compiled/arg/index.js"));
var _startServer = require("../server/lib/start-server");
var _utils = require("../server/lib/utils");
var _isError = _interopRequireDefault(require("../lib/is-error"));
var _getProjectDir = require("../lib/get-project-dir");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const nextStart = async (argv)=>{
    const validArgs = {
        // Types
        "--help": Boolean,
        "--port": Number,
        "--hostname": String,
        "--keepAliveTimeout": Number,
        // Aliases
        "-h": "--help",
        "-p": "--port",
        "-H": "--hostname"
    };
    let args;
    try {
        args = (0, _indexJs).default(validArgs, {
            argv
        });
    } catch (error) {
        if ((0, _isError).default(error) && error.code === "ARG_UNKNOWN_OPTION") {
            return (0, _utils).printAndExit(error.message, 1);
        }
        throw error;
    }
    if (args["--help"]) {
        console.log(`
      Description
        Starts the application in production mode.
        The application should be compiled with \`next build\` first.

      Usage
        $ next start <dir> -p <port>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application (default: 0.0.0.0)
        --keepAliveTimeout  Max milliseconds to wait before closing inactive connections
        --help, -h      Displays this message
    `);
        process.exit(0);
    }
    const dir = (0, _getProjectDir).getProjectDir(args._[0]);
    const host = args["--hostname"] || "0.0.0.0";
    const port = (0, _utils).getPort(args);
    const keepAliveTimeoutArg = args["--keepAliveTimeout"];
    if (typeof keepAliveTimeoutArg !== "undefined" && (Number.isNaN(keepAliveTimeoutArg) || !Number.isFinite(keepAliveTimeoutArg) || keepAliveTimeoutArg < 0)) {
        (0, _utils).printAndExit(`Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`, 1);
    }
    const keepAliveTimeout = keepAliveTimeoutArg ? Math.ceil(keepAliveTimeoutArg) : undefined;
    await (0, _startServer).startServer({
        dir,
        isDev: false,
        hostname: host,
        port,
        keepAliveTimeout,
        useWorkers: false
    });
};
exports.nextStart = nextStart;

//# sourceMappingURL=next-start.js.map