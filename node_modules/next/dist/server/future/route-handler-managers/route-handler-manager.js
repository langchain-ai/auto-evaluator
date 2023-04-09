"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class RouteHandlerManager {
    handlers = {};
    set(kind, handler) {
        if (kind in this.handlers) {
            throw new Error("Invariant: duplicate route handler added for kind");
        }
        this.handlers[kind] = handler;
    }
    async handle(match, req, res, context, bubbleResult) {
        const handler = this.handlers[match.definition.kind];
        if (!handler) return false;
        const result = await handler.handle(match, req, res, context, bubbleResult);
        if (bubbleResult) {
            return result;
        }
        return true;
    }
}
exports.RouteHandlerManager = RouteHandlerManager;

//# sourceMappingURL=route-handler-manager.js.map