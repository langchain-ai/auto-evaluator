"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class NodeModuleLoader {
    load(id) {
        if (process.env.NEXT_RUNTIME !== "edge") {
            return require(id);
        }
        throw new Error("NodeModuleLoader is not supported in edge runtime.");
    }
}
exports.NodeModuleLoader = NodeModuleLoader;

//# sourceMappingURL=node-module-loader.js.map