"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _routeMatcher = require("./route-matcher");
class AppPageRouteMatcher extends _routeMatcher.RouteMatcher {
    get identity() {
        return `${this.definition.pathname}?__nextPage=${this.definition.page}}`;
    }
}
exports.AppPageRouteMatcher = AppPageRouteMatcher;

//# sourceMappingURL=app-page-route-matcher.js.map