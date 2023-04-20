"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNpxCommand = getNpxCommand;
var _childProcess = require("child_process");
var _getPkgManager = require("./get-pkg-manager");
function getNpxCommand(baseDir) {
    const pkgManager = (0, _getPkgManager).getPkgManager(baseDir);
    let command = "npx";
    if (pkgManager === "pnpm") {
        command = "pnpm dlx";
    } else if (pkgManager === "yarn") {
        try {
            (0, _childProcess).execSync("yarn dlx --help", {
                stdio: "ignore"
            });
            command = "yarn dlx";
        } catch  {}
    }
    return command;
}

//# sourceMappingURL=get-npx-command.js.map