"use strict";
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _storage = require("./storage");
var _config = _interopRequireDefault(require("../server/config"));
var _getProjectDir = require("../lib/get-project-dir");
var _constants = require("../shared/lib/constants");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(async ()=>{
    const args = [
        ...process.argv
    ];
    let dir = args.pop();
    const mode = args.pop();
    if (!dir || mode !== "dev") {
        throw new Error(`Invalid flags should be run as node detached-flush dev ./path-to/project`);
    }
    dir = (0, _getProjectDir).getProjectDir(dir);
    const config = await (0, _config).default(_constants.PHASE_DEVELOPMENT_SERVER, dir, undefined, undefined, true);
    const distDir = _path.default.join(dir, config.distDir || ".next");
    const eventsPath = _path.default.join(distDir, "_events.json");
    let events;
    try {
        events = JSON.parse(_fs.default.readFileSync(eventsPath, "utf8"));
    } catch (err) {
        if (err.code === "ENOENT") {
            // no events to process we can exit now
            process.exit(0);
        }
        throw err;
    }
    const telemetry = new _storage.Telemetry({
        distDir
    });
    await telemetry.record(events);
    await telemetry.flush();
    // finished flushing events clean-up/exit
    _fs.default.unlinkSync(eventsPath);
    process.exit(0);
})();

//# sourceMappingURL=detached-flush.js.map