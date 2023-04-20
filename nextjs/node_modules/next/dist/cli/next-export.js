#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nextExport = void 0;
var _path = require("path");
var _fs = require("fs");
var _indexJs = _interopRequireDefault(require("next/dist/compiled/arg/index.js"));
var _export = _interopRequireWildcard(require("../export"));
var Log = _interopRequireWildcard(require("../build/output/log"));
var _utils = require("../server/lib/utils");
var _trace = require("../trace");
var _isError = _interopRequireDefault(require("../lib/is-error"));
var _getProjectDir = require("../lib/get-project-dir");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const nextExport = (argv)=>{
    const nextExportCliSpan = (0, _trace).trace("next-export-cli");
    const validArgs = {
        // Types
        "--help": Boolean,
        "--silent": Boolean,
        "--outdir": String,
        "--threads": Number,
        // Aliases
        "-h": "--help",
        "-s": "--silent",
        "-o": "--outdir"
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
        Exports the application for production deployment

      Usage
        $ next export [options] <dir>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        -h - list this help
        -o - set the output dir (defaults to 'out')
        -s - do not print any messages to console
    `);
        process.exit(0);
    }
    const dir = (0, _getProjectDir).getProjectDir(args._[0]);
    // Check if pages dir exists and warn if not
    if (!(0, _fs).existsSync(dir)) {
        (0, _utils).printAndExit(`> No such directory exists as the project root: ${dir}`);
    }
    const options = {
        silent: args["--silent"] || false,
        threads: args["--threads"],
        outdir: args["--outdir"] ? (0, _path).resolve(args["--outdir"]) : (0, _path).join(dir, "out"),
        isInvokedFromCli: true,
        hasAppDir: false
    };
    (0, _export).default(dir, options, nextExportCliSpan).then(()=>{
        nextExportCliSpan.stop();
        (0, _utils).printAndExit(`Export successful. Files written to ${options.outdir}`, 0);
    }).catch((err)=>{
        nextExportCliSpan.stop();
        if (err instanceof _export.ExportError || err.code === "NEXT_EXPORT_ERROR") {
            Log.error(err.message);
        } else {
            console.error(err);
        }
        process.exit(1);
    });
};
exports.nextExport = nextExport;

//# sourceMappingURL=next-export.js.map