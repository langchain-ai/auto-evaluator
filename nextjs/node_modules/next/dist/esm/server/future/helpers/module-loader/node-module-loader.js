/**
 * Loads a module using `require(id)`.
 */ export class NodeModuleLoader {
    load(id) {
        if (process.env.NEXT_RUNTIME !== "edge") {
            return require(id);
        }
        throw new Error("NodeModuleLoader is not supported in edge runtime.");
    }
}

//# sourceMappingURL=node-module-loader.js.map