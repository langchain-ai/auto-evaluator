"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nodeFs = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const nodeFs = {
    readFile: (f)=>_fs.default.promises.readFile(f, "utf8"),
    readFileSync: (f)=>_fs.default.readFileSync(f, "utf8"),
    writeFile: (f, d)=>_fs.default.promises.writeFile(f, d, "utf8"),
    mkdir: (dir)=>_fs.default.promises.mkdir(dir, {
            recursive: true
        }),
    stat: (f)=>_fs.default.promises.stat(f)
};
exports.nodeFs = nodeFs;

//# sourceMappingURL=node-fs-methods.js.map