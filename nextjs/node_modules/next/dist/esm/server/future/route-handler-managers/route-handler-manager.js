import { NodeModuleLoader } from "../helpers/module-loader/node-module-loader";
import { RouteModuleLoader } from "../helpers/module-loader/route-module-loader";
import { NextRequestAdapter } from "../../web/spec-extension/adapters/next-request";
export class RouteHandlerManager {
    constructor(moduleLoader = new NodeModuleLoader()){
        this.moduleLoader = moduleLoader;
    }
    async handle(match, req, context) {
        // The module supports minimal mode, load the minimal module.
        const module = RouteModuleLoader.load(match.definition.filename, this.moduleLoader);
        // Setup the handler. It is the responsibility of the module to ensure that
        // this is only called once. If this is in development mode, the require
        // cache will be cleared and the module will be re-created.
        module.setup();
        // Convert the BaseNextRequest to a NextRequest.
        const request = NextRequestAdapter.fromBaseNextRequest(req);
        // Get the response from the handler and send it back.
        return await module.handle(request, context);
    }
}

//# sourceMappingURL=route-handler-manager.js.map