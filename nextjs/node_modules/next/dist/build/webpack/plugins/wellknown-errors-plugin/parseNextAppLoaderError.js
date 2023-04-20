"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNextAppLoaderError = getNextAppLoaderError;
var _path = require("path");
var _simpleWebpackError = require("./simpleWebpackError");
function getNextAppLoaderError(err, module, compiler) {
    try {
        if (!module.loaders[0].loader.includes("next-app-loader.js")) {
            return false;
        }
        const file = (0, _path).relative(compiler.context, module.buildInfo.route.absolutePagePath);
        return new _simpleWebpackError.SimpleWebpackError(file, err.message);
    } catch  {
        return false;
    }
}

//# sourceMappingURL=parseNextAppLoaderError.js.map