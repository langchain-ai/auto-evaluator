#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nextDev = void 0;
var _indexJs = _interopRequireDefault(require("next/dist/compiled/arg/index.js"));
var _startServer = require("../server/lib/start-server");
var _utils = require("../server/lib/utils");
var Log = _interopRequireWildcard(require("../build/output/log"));
var _isError = _interopRequireDefault(require("../lib/is-error"));
var _getProjectDir = require("../lib/get-project-dir");
var _constants = require("../shared/lib/constants");
var _path = _interopRequireDefault(require("path"));
var _shared = require("../trace/shared");
var _storage = require("../telemetry/storage");
var _config = _interopRequireDefault(require("../server/config"));
var _findPagesDir = require("../lib/find-pages-dir");
var _fileExists = require("../lib/file-exists");
var _getNpxCommand = require("../lib/helpers/get-npx-command");
var _watchpack = _interopRequireDefault(require("next/dist/compiled/watchpack"));
var _stripAnsi = _interopRequireDefault(require("next/dist/compiled/strip-ansi"));
var _worker = require("../build/worker");
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
let dir;
let isTurboSession = false;
let sessionStopHandled = false;
let sessionStarted = Date.now();
const handleSessionStop = async ()=>{
    if (sessionStopHandled) return;
    sessionStopHandled = true;
    try {
        const { eventCliSession  } = require("../telemetry/events/session-stopped");
        const config = await (0, _config).default(_constants.PHASE_DEVELOPMENT_SERVER, dir, undefined, undefined, true);
        let telemetry = _shared.traceGlobals.get("telemetry") || new _storage.Telemetry({
            distDir: _path.default.join(dir, config.distDir)
        });
        let pagesDir = !!_shared.traceGlobals.get("pagesDir");
        let appDir = !!_shared.traceGlobals.get("appDir");
        if (typeof _shared.traceGlobals.get("pagesDir") === "undefined" || typeof _shared.traceGlobals.get("appDir") === "undefined") {
            const pagesResult = (0, _findPagesDir).findPagesDir(dir, !!config.experimental.appDir);
            appDir = !!pagesResult.appDir;
            pagesDir = !!pagesResult.pagesDir;
        }
        telemetry.record(eventCliSession({
            cliCommand: "dev",
            turboFlag: isTurboSession,
            durationMilliseconds: Date.now() - sessionStarted,
            pagesDir,
            appDir
        }), true);
        telemetry.flushDetached("dev", dir);
    } catch (_) {
    // errors here aren't actionable so don't add
    // noise to the output
    }
    // ensure we re-enable the terminal cursor before exiting
    // the program, or the cursor could remain hidden
    process.stdout.write("\x1b[?25h");
    process.stdout.write("\n");
    process.exit(0);
};
process.on("SIGINT", handleSessionStop);
process.on("SIGTERM", handleSessionStop);
let unwatchConfigFiles;
function watchConfigFiles(dirToWatch, onChange = (filename)=>Log.warn(`\n> Found a change in ${_path.default.basename(filename)}. Restart the server to see the changes in effect.`)) {
    if (unwatchConfigFiles) {
        unwatchConfigFiles();
    }
    const wp = new _watchpack.default();
    wp.watch({
        files: _constants.CONFIG_FILES.map((file)=>_path.default.join(dirToWatch, file))
    });
    wp.on("change", onChange);
    unwatchConfigFiles = ()=>wp.close();
}
const nextDev = async (argv)=>{
    const validArgs = {
        // Types
        "--help": Boolean,
        "--port": Number,
        "--hostname": String,
        "--turbo": Boolean,
        // To align current messages with native binary.
        // Will need to adjust subcommand later.
        "--show-all": Boolean,
        "--root": String,
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
        Starts the application in development mode (hot-code reloading, error
        reporting, etc.)

      Usage
        $ next dev <dir> -p <port number>

      <dir> represents the directory of the Next.js application.
      If no directory is provided, the current directory will be used.

      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application (default: 0.0.0.0)
        --help, -h      Displays this message
    `);
        process.exit(0);
    }
    dir = (0, _getProjectDir).getProjectDir(process.env.NEXT_PRIVATE_DEV_DIR || args._[0]);
    // Check if pages dir exists and warn if not
    if (!await (0, _fileExists).fileExists(dir, "directory")) {
        (0, _utils).printAndExit(`> No such directory exists as the project root: ${dir}`);
    }
    async function preflight() {
        const { getPackageVersion , getDependencies  } = await Promise.resolve(require("../lib/get-package-version"));
        const [sassVersion, nodeSassVersion] = await Promise.all([
            getPackageVersion({
                cwd: dir,
                name: "sass"
            }),
            getPackageVersion({
                cwd: dir,
                name: "node-sass"
            }), 
        ]);
        if (sassVersion && nodeSassVersion) {
            Log.warn("Your project has both `sass` and `node-sass` installed as dependencies, but should only use one or the other. " + "Please remove the `node-sass` dependency from your project. " + " Read more: https://nextjs.org/docs/messages/duplicate-sass");
        }
        const { dependencies , devDependencies  } = await getDependencies({
            cwd: dir
        });
        // Warn if @next/font is installed as a dependency. Ignore `workspace:*` to not warn in the Next.js monorepo.
        if (dependencies["@next/font"] || devDependencies["@next/font"] && devDependencies["@next/font"] !== "workspace:*") {
            const command = (0, _getNpxCommand).getNpxCommand(dir);
            Log.warn("Your project has `@next/font` installed as a dependency, please use the built-in `next/font` instead. " + "The `@next/font` package will be removed in Next.js 14. " + `You can migrate by running \`${command} @next/codemod@latest built-in-next-font .\`. Read more: https://nextjs.org/docs/messages/built-in-next-font`);
        }
    }
    const port = (0, _utils).getPort(args);
    // If neither --port nor PORT were specified, it's okay to retry new ports.
    const allowRetry = args["--port"] === undefined && process.env.PORT === undefined;
    // We do not set a default host value here to prevent breaking
    // some set-ups that rely on listening on other interfaces
    const host = args["--hostname"];
    const devServerOptions = {
        dir,
        port,
        allowRetry,
        isDev: true,
        hostname: host,
        useWorkers: !process.env.__NEXT_DISABLE_MEMORY_WATCHER
    };
    if (args["--turbo"]) {
        var ref;
        isTurboSession = true;
        const { validateTurboNextConfig  } = require("../lib/turbopack-warning");
        const { loadBindings , __isCustomTurbopackBinary  } = require("../build/swc");
        const { eventCliSession  } = require("../telemetry/events/version");
        const { setGlobal  } = require("../trace");
        require("../telemetry/storage");
        const findUp = require("next/dist/compiled/find-up");
        const isCustomTurbopack = await __isCustomTurbopackBinary();
        const rawNextConfig = await validateTurboNextConfig({
            isCustomTurbopack,
            ...devServerOptions
        });
        const distDir = _path.default.join(dir, rawNextConfig.distDir || ".next");
        const { pagesDir , appDir  } = (0, _findPagesDir).findPagesDir(dir, !!((ref = rawNextConfig.experimental) == null ? void 0 : ref.appDir));
        const telemetry = new _storage.Telemetry({
            distDir
        });
        setGlobal("appDir", appDir);
        setGlobal("pagesDir", pagesDir);
        setGlobal("telemetry", telemetry);
        if (!isCustomTurbopack) {
            telemetry.record(eventCliSession(distDir, rawNextConfig, {
                webpackVersion: 5,
                cliCommand: "dev",
                isSrcDir: _path.default.relative(dir, pagesDir || appDir || "").startsWith("src"),
                hasNowJson: !!await findUp("now.json", {
                    cwd: dir
                }),
                isCustomServer: false,
                turboFlag: true,
                pagesDir: !!pagesDir,
                appDir: !!appDir
            }));
        }
        const turboJson = findUp.sync("turbo.json", {
            cwd: dir
        });
        // eslint-disable-next-line no-shadow
        const packagePath = findUp.sync("package.json", {
            cwd: dir
        });
        let bindings = await loadBindings();
        let server = bindings.turbo.startDev({
            ...devServerOptions,
            showAll: args["--show-all"] ?? false,
            root: args["--root"] ?? (turboJson ? _path.default.dirname(turboJson) : packagePath ? _path.default.dirname(packagePath) : undefined)
        });
        // Start preflight after server is listening and ignore errors:
        preflight().catch(()=>{});
        if (!isCustomTurbopack) {
            await telemetry.flush();
        }
        return server;
    } else {
        let cleanupFns = [];
        const runDevServer = async ()=>{
            const oldCleanupFns = cleanupFns;
            cleanupFns = [];
            await Promise.allSettled(oldCleanupFns.map((fn)=>fn()));
            try {
                var ref1;
                let shouldFilter = false;
                let devServerTeardown;
                let config;
                watchConfigFiles(devServerOptions.dir, (filename)=>{
                    Log.warn(`\n> Found a change in ${_path.default.basename(filename)}. Restarting the server to apply the changes...`);
                    runDevServer();
                });
                cleanupFns.push(unwatchConfigFiles);
                const setupFork = async (newDir)=>{
                    // if we're using workers we can auto restart on config changes
                    if (!devServerOptions.useWorkers && devServerTeardown) {
                        Log.info(`Detected change, manual restart required due to '__NEXT_DISABLE_MEMORY_WATCHER' usage`);
                        return;
                    }
                    const startDir = dir;
                    if (newDir) {
                        dir = newDir;
                    }
                    if (devServerTeardown) {
                        await devServerTeardown();
                        devServerTeardown = undefined;
                    }
                    if (newDir) {
                        dir = newDir;
                        process.env = Object.keys(process.env).reduce((newEnv, key)=>{
                            var ref;
                            newEnv[key] = (ref = process.env[key]) == null ? void 0 : ref.replace(startDir, newDir);
                            return newEnv;
                        }, {});
                        process.chdir(newDir);
                        devServerOptions.dir = newDir;
                        devServerOptions.prevDir = startDir;
                    }
                    // since errors can start being logged from the fork
                    // before we detect the project directory rename
                    // attempt suppressing them long enough to check
                    const filterForkErrors = (chunk, fd)=>{
                        const cleanChunk = (0, _stripAnsi).default(chunk + "");
                        if (cleanChunk.match(/(ENOENT|Module build failed|Module not found|Cannot find module|Can't resolve)/)) {
                            if (startDir === dir) {
                                try {
                                    var ref;
                                    // check if start directory is still valid
                                    const result = (0, _findPagesDir).findPagesDir(startDir, !!(config == null ? void 0 : (ref = config.experimental) == null ? void 0 : ref.appDir));
                                    shouldFilter = !Boolean(result.pagesDir || result.appDir);
                                } catch (_) {
                                    shouldFilter = true;
                                }
                            }
                            if (shouldFilter || startDir !== dir) {
                                shouldFilter = true;
                                return;
                            }
                        }
                        process[fd].write(chunk);
                    };
                    devServerOptions.onStdout = (chunk)=>{
                        filterForkErrors(chunk, "stdout");
                    };
                    devServerOptions.onStderr = (chunk)=>{
                        filterForkErrors(chunk, "stderr");
                    };
                    shouldFilter = false;
                    devServerTeardown = await (0, _startServer).startServer(devServerOptions);
                    if (!config) {
                        config = await (0, _config).default(_constants.PHASE_DEVELOPMENT_SERVER, dir, undefined, undefined, true);
                    }
                };
                cleanupFns.push(()=>{
                    return devServerTeardown == null ? void 0 : devServerTeardown();
                });
                await setupFork();
                await preflight();
                const parentDir = _path.default.join("/", dir, "..");
                const watchedEntryLength = parentDir.split("/").length + 1;
                const previousItems = new Set();
                const instrumentationFilePaths = !!(config == null ? void 0 : (ref1 = config.experimental) == null ? void 0 : ref1.instrumentationHook) ? (0, _worker).getPossibleInstrumentationHookFilenames(dir, config.pageExtensions) : [];
                const instrumentationFileWatcher = new _watchpack.default({});
                cleanupFns.push(()=>instrumentationFileWatcher.close());
                instrumentationFileWatcher.watch({
                    files: instrumentationFilePaths,
                    startTime: 0
                });
                let instrumentationFileLastHash = undefined;
                const previousInstrumentationFiles = new Set();
                instrumentationFileWatcher.on("aggregated", async ()=>{
                    var ref;
                    const knownFiles = instrumentationFileWatcher.getTimeInfoEntries();
                    const instrumentationFile = (ref = [
                        ...knownFiles.entries()
                    ].find(([key, value])=>instrumentationFilePaths.includes(key) && value)) == null ? void 0 : ref[0];
                    if (instrumentationFile) {
                        const fs = require("fs");
                        const instrumentationFileHash = require("crypto").createHash("sha256").update(await fs.promises.readFile(instrumentationFile, "utf8")).digest("hex");
                        if (instrumentationFileLastHash && instrumentationFileHash !== instrumentationFileLastHash) {
                            Log.warn(`The instrumentation file has changed, restarting the server to apply changes.`);
                            return setupFork();
                        } else {
                            if (!instrumentationFileLastHash && previousInstrumentationFiles.size !== 0) {
                                Log.warn("The instrumentation file was added, restarting the server to apply changes.");
                                return setupFork();
                            }
                            instrumentationFileLastHash = instrumentationFileHash;
                        }
                    } else if ([
                        ...previousInstrumentationFiles.keys()
                    ].find((key)=>instrumentationFilePaths.includes(key))) {
                        Log.warn(`The instrumentation file has been removed, restarting the server to apply changes.`);
                        instrumentationFileLastHash = undefined;
                        return setupFork();
                    }
                    previousInstrumentationFiles.clear();
                    knownFiles.forEach((_, key)=>previousInstrumentationFiles.add(key));
                });
                const projectFolderWatcher = new _watchpack.default({
                    ignored: (entry)=>{
                        return !(entry.split("/").length <= watchedEntryLength);
                    }
                });
                cleanupFns.push(()=>projectFolderWatcher.close());
                projectFolderWatcher.watch({
                    directories: [
                        parentDir
                    ],
                    startTime: 0
                });
                projectFolderWatcher.on("aggregated", async ()=>{
                    const knownFiles = projectFolderWatcher.getTimeInfoEntries();
                    const newFiles = [];
                    let hasPagesApp = false;
                    // if the dir still exists nothing to check
                    try {
                        var ref;
                        const result = (0, _findPagesDir).findPagesDir(dir, !!(config == null ? void 0 : (ref = config.experimental) == null ? void 0 : ref.appDir));
                        hasPagesApp = Boolean(result.pagesDir || result.appDir);
                    } catch (err) {
                        var ref3;
                        // if findPagesDir throws validation error let this be
                        // handled in the dev-server itself in the fork
                        if ((ref3 = err.message) == null ? void 0 : ref3.includes("experimental")) {
                            return;
                        }
                    }
                    // try to find new dir introduced
                    if (previousItems.size) {
                        for (const key of knownFiles.keys()){
                            if (!previousItems.has(key)) {
                                newFiles.push(key);
                            }
                        }
                        previousItems.clear();
                    }
                    for (const key of knownFiles.keys()){
                        previousItems.add(key);
                    }
                    if (hasPagesApp) {
                        return;
                    }
                    // if we failed to find the new dir it may have been moved
                    // to a new parent directory which we can't track as easily
                    // so exit gracefully
                    try {
                        var ref4;
                        const result = (0, _findPagesDir).findPagesDir(newFiles[0], !!(config == null ? void 0 : (ref4 = config.experimental) == null ? void 0 : ref4.appDir));
                        hasPagesApp = Boolean(result.pagesDir || result.appDir);
                    } catch (_) {}
                    if (hasPagesApp && newFiles.length === 1) {
                        Log.info(`Detected project directory rename, restarting in new location`);
                        setupFork(newFiles[0]);
                        watchConfigFiles(newFiles[0]);
                    } else {
                        Log.error(`Project directory could not be found, restart Next.js in your new directory`);
                        process.exit(0);
                    }
                });
            } catch (err) {
                console.error(err);
                process.exit(1);
            }
        };
        await runDevServer();
    }
};
exports.nextDev = nextDev;

//# sourceMappingURL=next-dev.js.map