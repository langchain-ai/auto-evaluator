"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _nodeModuleLoader = require("../helpers/module-loader/node-module-loader");
var _routeModuleLoader = require("../helpers/module-loader/route-module-loader");
var _nextRequest = require("../../web/spec-extension/adapters/next-request");
class RouteHandlerManager {
    constructor(moduleLoader = new _nodeModuleLoader.NodeModuleLoader()){
        this.moduleLoader = moduleLoader;
    }
    async handle(match, req, context) {
        // The module supports minimal mode, load the minimal module.
        const module = _routeModuleLoader.RouteModuleLoader.load(match.definition.filename, this.moduleLoader);
        // Setup the handler. It is the responsibility of the module to ensure that
        // this is only called once. If this is in development mode, the require
        // cache will be cleared and the module will be re-created.
        module.setup();
        // Convert the BaseNextRequest to a NextRequest.
        const request = _nextRequest.NextRequestAdapter.fromBaseNextRequest(req);
        // Get the response from the handler and send it back.
        return await module.handle(request, context);
    }
}
exports.RouteHandlerManager = RouteHandlerManager;

//# sourceMappingURL=route-handler-manager.js.map