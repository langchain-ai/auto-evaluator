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
var _output = require("../build/output");
var _isError = _interopRequireDefault(require("../lib/is-error"));
var _getProjectDir = require("../lib/get-project-dir");
var _constants = require("../shared/lib/constants");
var _path = _interopRequireDefault(require("path"));
var _shared = require("../trace/shared");
var _net = require("net");
var _childProcess = require("child_process");
var _storage = require("../telemetry/storage");
var _config = _interopRequireDefault(require("../server/config"));
var _findPagesDir = require("../lib/find-pages-dir");
var _fileExists = require("../lib/file-exists");
var _watchpack = _interopRequireDefault(require("next/dist/compiled/watchpack"));
var _stripAnsi = _interopRequireDefault(require("next/dist/compiled/strip-ansi"));
var _utils1 = require("../build/utils");
var _getNpxCommand = require("../lib/helpers/get-npx-command");
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
let isTurboSession = false;
let sessionStopHandled = false;
let sessionStarted = Date.now();
let dir;
let unwatchConfigFiles;
const isChildProcess = !!process.env.__NEXT_DEV_CHILD_PROCESS;
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
if (!isChildProcess) {
    process.on("SIGINT", handleSessionStop);
    process.on("SIGTERM", handleSessionStop);
} else {
    process.on("SIGINT", ()=>process.exit(0));
    process.on("SIGTERM", ()=>process.exit(0));
}
function watchConfigFiles(dirToWatch) {
    if (unwatchConfigFiles) {
        unwatchConfigFiles();
    }
    const wp = new _watchpack.default();
    wp.watch({
        files: _constants.CONFIG_FILES.map((file)=>_path.default.join(dirToWatch, file))
    });
    wp.on("change", (filename)=>{
        console.log(`\n> Found a change in ${_path.default.basename(filename)}. Restart the server to see the changes in effect.`);
    });
    return ()=>wp.close();
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
    unwatchConfigFiles = watchConfigFiles(dir);
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
        allowRetry,
        dev: true,
        dir,
        hostname: host,
        isNextDevCommand: true,
        port
    };
    const supportedTurbopackNextConfigOptions = [
        "configFileName",
        "env",
        "experimental.appDir",
        "experimental.serverComponentsExternalPackages",
        "experimental.turbo",
        "images",
        "pageExtensions",
        "onDemandEntries",
        "rewrites",
        "redirects",
        "headers",
        "reactStrictMode",
        "swcMinify",
        "transpilePackages", 
    ];
    // check for babelrc, swc plugins
    async function validateNextConfig(isCustomTurbopack) {
        const { getPkgManager  } = require("../lib/helpers/get-pkg-manager");
        const { getBabelConfigFile  } = require("../build/webpack-config");
        const { defaultConfig  } = require("../server/config-shared");
        const chalk = require("next/dist/compiled/chalk");
        const { interopDefault  } = require("../lib/interop-default");
        // To regenerate the TURBOPACK gradient require('gradient-string')('blue', 'red')('>>> TURBOPACK')
        const isTTY = process.stdout.isTTY;
        const turbopackGradient = `${chalk.bold(isTTY ? "\x1b[38;2;0;0;255m>\x1b[39m\x1b[38;2;23;0;232m>\x1b[39m\x1b[38;2;46;0;209m>\x1b[39m \x1b[38;2;70;0;185mT\x1b[39m\x1b[38;2;93;0;162mU\x1b[39m\x1b[38;2;116;0;139mR\x1b[39m\x1b[38;2;139;0;116mB\x1b[39m\x1b[38;2;162;0;93mO\x1b[39m\x1b[38;2;185;0;70mP\x1b[39m\x1b[38;2;209;0;46mA\x1b[39m\x1b[38;2;232;0;23mC\x1b[39m\x1b[38;2;255;0;0mK\x1b[39m" : ">>> TURBOPACK")} ${chalk.dim("(alpha)")}\n\n`;
        let thankYouMsg = `Thank you for trying Next.js v13 with Turbopack! As a reminder,\nTurbopack is currently in alpha and not yet ready for production.\nWe appreciate your ongoing support as we work to make it ready\nfor everyone.\n`;
        let unsupportedParts = "";
        let babelrc = await getBabelConfigFile(dir);
        if (babelrc) babelrc = _path.default.basename(babelrc);
        let nonSupportedConfig = [];
        let rawNextConfig = {};
        try {
            rawNextConfig = interopDefault(await (0, _config).default(_constants.PHASE_DEVELOPMENT_SERVER, dir, undefined, true));
            if (typeof rawNextConfig === "function") {
                rawNextConfig = rawNextConfig(_constants.PHASE_DEVELOPMENT_SERVER, {
                    defaultConfig
                });
            }
            const checkUnsupportedCustomConfig = (configKey = "", parentUserConfig, parentDefaultConfig)=>{
                try {
                    // these should not error
                    if (// we only want the key after the dot for experimental options
                    supportedTurbopackNextConfigOptions.map((key)=>key.split(".").splice(-1)[0]).includes(configKey)) {
                        return false;
                    }
                    let userValue = parentUserConfig == null ? void 0 : parentUserConfig[configKey];
                    let defaultValue = parentDefaultConfig == null ? void 0 : parentDefaultConfig[configKey];
                    if (typeof defaultValue !== "object") {
                        return defaultValue !== userValue;
                    }
                    return Object.keys(userValue || {}).some((key)=>{
                        return checkUnsupportedCustomConfig(key, userValue, defaultValue);
                    });
                } catch (e) {
                    console.error(`Unexpected error occurred while checking ${configKey}`, e);
                    return false;
                }
            };
            nonSupportedConfig = Object.keys(rawNextConfig).filter((key)=>checkUnsupportedCustomConfig(key, rawNextConfig, defaultConfig));
        } catch (e) {
            console.error("Unexpected error occurred while checking config", e);
        }
        const hasWarningOrError = babelrc || nonSupportedConfig.length;
        if (!hasWarningOrError) {
            thankYouMsg = chalk.dim(thankYouMsg);
        }
        if (!isCustomTurbopack) {
            console.log(turbopackGradient + thankYouMsg);
        }
        let feedbackMessage = `Learn more about Next.js v13 and Turbopack: ${chalk.underline("https://nextjs.link/with-turbopack")}\nPlease direct feedback to: ${chalk.underline("https://nextjs.link/turbopack-feedback")}\n`;
        if (!hasWarningOrError) {
            feedbackMessage = chalk.dim(feedbackMessage);
        }
        if (babelrc) {
            unsupportedParts += `\n- Babel detected (${chalk.cyan(babelrc)})\n  ${chalk.dim(`Babel is not yet supported. To use Turbopack at the moment,\n  you'll need to remove your usage of Babel.`)}`;
        }
        if (nonSupportedConfig.length) {
            unsupportedParts += `\n\n- Unsupported Next.js configuration option(s) (${chalk.cyan("next.config.js")})\n  ${chalk.dim(`The only configurations options supported are:\n${supportedTurbopackNextConfigOptions.map((name)=>`    - ${chalk.cyan(name)}\n`).join("")}  To use Turbopack, remove the following configuration options:\n${nonSupportedConfig.map((name)=>`    - ${chalk.red(name)}\n`)}`)}   `;
        }
        if (unsupportedParts && !isCustomTurbopack) {
            const pkgManager = getPkgManager(dir);
            console.error(`${chalk.bold.red("Error:")} You are using configuration and/or tools that are not yet\nsupported by Next.js v13 with Turbopack:\n${unsupportedParts}\n
If you cannot make the changes above, but still want to try out\nNext.js v13 with Turbopack, create the Next.js v13 playground app\nby running the following commands:

  ${chalk.bold.cyan(`${pkgManager === "npm" ? "npx create-next-app" : `${pkgManager} create next-app`} --example with-turbopack with-turbopack-app`)}\n  cd with-turbopack-app\n  ${pkgManager} run dev
        `);
            if (!isCustomTurbopack) {
                console.warn(feedbackMessage);
                process.exit(1);
            } else {
                console.warn(`\n${chalk.bold.yellow("Warning:")} Unsupported config found; but continuing with custom Turbopack binary.\n`);
            }
        }
        if (!isCustomTurbopack) {
            console.log(feedbackMessage);
        }
        return rawNextConfig;
    }
    if (args["--turbo"]) {
        var ref;
        isTurboSession = true;
        const { loadBindings , __isCustomTurbopackBinary  } = require("../build/swc");
        const { eventCliSession  } = require("../telemetry/events/version");
        const { setGlobal  } = require("../trace");
        require("../telemetry/storage");
        const findUp = require("next/dist/compiled/find-up");
        const isCustomTurbopack = await __isCustomTurbopackBinary();
        const rawNextConfig = await validateNextConfig(isCustomTurbopack);
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
        // we're using a sub worker to avoid memory leaks. When memory usage exceeds 90%, we kill the worker and restart it.
        // this is a temporary solution until we can fix the memory leaks.
        // the logic for the worker killing itself is in `packages/next/server/lib/start-server.ts`
        if (!process.env.__NEXT_DISABLE_MEMORY_WATCHER && !isChildProcess) {
            var ref1, ref2, ref3;
            let config;
            let childProcess = null;
            const isDebugging = process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((ref1 = process.env.NODE_OPTIONS) == null ? void 0 : ref1.match == null ? void 0 : ref1.match(/--inspect(=\S+)?( |$)/));
            const isDebuggingWithBrk = process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((ref2 = process.env.NODE_OPTIONS) == null ? void 0 : ref2.match == null ? void 0 : ref2.match(/--inspect-brk(=\S+)?( |$)/));
            const debugPort = (()=>{
                var ref, ref4, ref5;
                const debugPortStr = ((ref = process.execArgv.find((localArg)=>localArg.startsWith("--inspect") || localArg.startsWith("--inspect-brk"))) == null ? void 0 : ref.split("=")[1]) ?? ((ref4 = process.env.NODE_OPTIONS) == null ? void 0 : ref4.match == null ? void 0 : (ref5 = ref4.match(/--inspect(-brk)?(=(\S+))?( |$)/)) == null ? void 0 : ref5[3]);
                return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
            })();
            if (isDebugging || isDebuggingWithBrk) {
                (0, Log).warn(`the --inspect${isDebuggingWithBrk ? "-brk" : ""} option was detected, the Next.js server should be inspected at port ${debugPort + 1}.`);
            }
            const genExecArgv = ()=>{
                const execArgv = process.execArgv.filter((localArg)=>{
                    return !localArg.startsWith("--inspect") && !localArg.startsWith("--inspect-brk");
                });
                if (isDebugging || isDebuggingWithBrk) {
                    execArgv.push(`--inspect${isDebuggingWithBrk ? "-brk" : ""}=${debugPort + 1}`);
                }
                return execArgv;
            };
            let childProcessExitUnsub = null;
            const setupFork = (env, newDir)=>{
                var ref7, ref6;
                childProcessExitUnsub == null ? void 0 : childProcessExitUnsub();
                childProcess == null ? void 0 : childProcess.kill();
                const startDir = dir;
                const [, script, ...nodeArgs] = process.argv;
                let shouldFilter = false;
                childProcess = (0, _childProcess).fork(newDir ? script.replace(startDir, newDir) : script, nodeArgs, {
                    env: {
                        ...env ? env : process.env,
                        FORCE_COLOR: "1",
                        __NEXT_DEV_CHILD_PROCESS: "1"
                    },
                    // @ts-ignore TODO: remove ignore when types are updated
                    windowsHide: true,
                    stdio: [
                        "ipc",
                        "pipe",
                        "pipe"
                    ],
                    execArgv: genExecArgv()
                });
                // since errors can start being logged from the fork
                // before we detect the project directory rename
                // attempt suppressing them long enough to check
                const filterForkErrors = (chunk, fd)=>{
                    const cleanChunk = (0, _stripAnsi).default(chunk + "");
                    if (cleanChunk.match(/(ENOENT|Module build failed|Module not found|Cannot find module)/)) {
                        if (startDir === dir) {
                            try {
                                var ref;
                                // check if start directory is still valid
                                const result = (0, _findPagesDir).findPagesDir(startDir, !!((ref = config.experimental) == null ? void 0 : ref.appDir));
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
                childProcess == null ? void 0 : (ref7 = childProcess.stdout) == null ? void 0 : ref7.on("data", (chunk)=>{
                    filterForkErrors(chunk, "stdout");
                });
                childProcess == null ? void 0 : (ref6 = childProcess.stderr) == null ? void 0 : ref6.on("data", (chunk)=>{
                    filterForkErrors(chunk, "stderr");
                });
                const callback = async (code)=>{
                    if (code === _startServer.WORKER_SELF_EXIT_CODE) {
                        setupFork();
                    } else if (!sessionStopHandled) {
                        await handleSessionStop();
                        process.exit(1);
                    }
                };
                childProcess == null ? void 0 : childProcess.addListener("exit", callback);
                childProcessExitUnsub = ()=>{
                    return childProcess == null ? void 0 : childProcess.removeListener("exit", callback);
                };
            };
            setupFork();
            config = await (0, _config).default(_constants.PHASE_DEVELOPMENT_SERVER, dir, undefined, undefined, true);
            const handleProjectDirRename = (newDir)=>{
                process.chdir(newDir);
                setupFork({
                    ...Object.keys(process.env).reduce((newEnv, key)=>{
                        var ref;
                        newEnv[key] = (ref = process.env[key]) == null ? void 0 : ref.replace(dir, newDir);
                        return newEnv;
                    }, {}),
                    NEXT_PRIVATE_DEV_DIR: newDir
                }, newDir);
            };
            const parentDir = _path.default.join("/", dir, "..");
            const watchedEntryLength = parentDir.split("/").length + 1;
            const previousItems = new Set();
            const instrumentationFilePaths = !!((ref3 = config.experimental) == null ? void 0 : ref3.instrumentationHook) ? (0, _utils1).getPossibleInstrumentationHookFilenames(dir, config.pageExtensions) : [];
            const instrumentationFileWatcher = new _watchpack.default({});
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
                        (0, Log).warn(`The instrumentation file has changed, restarting the server to apply changes.`);
                        return setupFork();
                    } else {
                        if (!instrumentationFileLastHash && previousInstrumentationFiles.size !== 0) {
                            (0, Log).warn("The instrumentation file was added, restarting the server to apply changes.");
                            return setupFork();
                        }
                        instrumentationFileLastHash = instrumentationFileHash;
                    }
                } else if ([
                    ...previousInstrumentationFiles.keys()
                ].find((key)=>instrumentationFilePaths.includes(key))) {
                    (0, Log).warn(`The instrumentation file has been removed, restarting the server to apply changes.`);
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
                    const result = (0, _findPagesDir).findPagesDir(dir, !!((ref = config.experimental) == null ? void 0 : ref.appDir));
                    hasPagesApp = Boolean(result.pagesDir || result.appDir);
                } catch (err) {
                    var ref8;
                    // if findPagesDir throws validation error let this be
                    // handled in the dev-server itself in the fork
                    if ((ref8 = err.message) == null ? void 0 : ref8.includes("experimental")) {
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
                    var ref9;
                    const result = (0, _findPagesDir).findPagesDir(newFiles[0], !!((ref9 = config.experimental) == null ? void 0 : ref9.appDir));
                    hasPagesApp = Boolean(result.pagesDir || result.appDir);
                } catch (_) {}
                if (hasPagesApp && newFiles.length === 1) {
                    Log.info(`Detected project directory rename, restarting in new location`);
                    handleProjectDirRename(newFiles[0]);
                    watchConfigFiles(newFiles[0]);
                    dir = newFiles[0];
                } else {
                    Log.error(`Project directory could not be found, restart Next.js in your new directory`);
                    process.exit(0);
                }
            });
        } else {
            (0, _startServer).startServer(devServerOptions).then(async (app)=>{
                const appUrl = `http://${app.hostname}:${app.port}`;
                const hostname = host || "0.0.0.0";
                (0, _output).startedDevelopmentServer(appUrl, `${(0, _net).isIPv6(hostname) ? `[${hostname}]` : hostname}:${app.port}`);
                // Start preflight after server is listening and ignore errors:
                preflight().catch(()=>{});
                // Finalize server bootup:
                await app.prepare();
            }).catch((err)=>{
                if (err.code === "EADDRINUSE") {
                    let errorMessage = `Port ${port} is already in use.`;
                    const pkgAppPath = require("next/dist/compiled/find-up").sync("package.json", {
                        cwd: dir
                    });
                    const appPackage = require(pkgAppPath);
                    if (appPackage.scripts) {
                        const nextScript = Object.entries(appPackage.scripts).find((scriptLine)=>scriptLine[1] === "next");
                        if (nextScript) {
                            errorMessage += `\nUse \`npm run ${nextScript[0]} -- -p <some other port>\`.`;
                        }
                    }
                    console.error(errorMessage);
                } else {
                    console.error(err);
                }
                process.nextTick(()=>process.exit(1));
            });
        }
    }
};
exports.nextDev = nextDev;

//# sourceMappingURL=next-dev.js.map