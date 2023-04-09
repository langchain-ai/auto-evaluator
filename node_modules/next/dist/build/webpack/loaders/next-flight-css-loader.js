"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pitch = pitch;
exports.default = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function pitch() {
    if (process.env.NODE_ENV !== "production") {
        const content = this.fs.readFileSync(this.resourcePath);
        this.data.__checksum = _crypto.default.createHash("sha256").update(typeof content === "string" ? Buffer.from(content) : content).digest().toString("hex");
    }
}
const NextServerCSSLoader = function(content) {
    this.cacheable && this.cacheable();
    // Only add the checksum during development.
    if (process.env.NODE_ENV !== "production") {
        const isCSSModule = this.resourcePath.match(/\.module\.(css|sass|scss)$/);
        const checksum = _crypto.default.createHash("sha256").update(this.data.__checksum + (typeof content === "string" ? Buffer.from(content) : content)).digest().toString("hex").substring(0, 12);
        if (isCSSModule) {
            return content + "\nmodule.exports.__checksum = " + JSON.stringify(checksum);
        }
        return `export default ${JSON.stringify(checksum)}`;
    }
    return content;
};
var _default = NextServerCSSLoader;
exports.default = _default;

//# sourceMappingURL=next-flight-css-loader.js.map