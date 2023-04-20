"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _nodeModuleLoader = require("./node-module-loader");
class RouteModuleLoader {
    static load(id, loader = new _nodeModuleLoader.NodeModuleLoader()) {
        if (process.env.NEXT_RUNTIME !== "edge") {
            const { routeModule  } = loader.load(id);
            return routeModule;
        }
        throw new Error("RouteModuleLoader is not supported in edge runtime.");
    }
}
exports.RouteModuleLoader = RouteModuleLoader;

//# sourceMappingURL=route-module-loader.js.map