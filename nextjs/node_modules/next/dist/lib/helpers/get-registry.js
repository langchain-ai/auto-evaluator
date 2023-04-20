"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRegistry = getRegistry;
var _childProcess = require("child_process");
var _getPkgManager = require("./get-pkg-manager");
function getRegistry(baseDir = process.cwd()) {
    let registry = `https://registry.npmjs.org/`;
    try {
        const pkgManager = (0, _getPkgManager).getPkgManager(baseDir);
        const output = (0, _childProcess).execSync(`${pkgManager} config get registry`).toString().trim();
        if (output.startsWith("http")) {
            registry = output.endsWith("/") ? output : `${output}/`;
        }
    } finally{
        return registry;
    }
}

//# sourceMappingURL=get-registry.js.map