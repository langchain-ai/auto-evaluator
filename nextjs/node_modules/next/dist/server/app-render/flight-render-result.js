"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appRouterHeaders = require("../../client/components/app-router-headers");
var _renderResult = _interopRequireDefault(require("../render-result"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class FlightRenderResult extends _renderResult.default {
    constructor(response){
        super(response, {
            contentType: _appRouterHeaders.RSC_CONTENT_TYPE_HEADER
        });
    }
}
exports.FlightRenderResult = FlightRenderResult;

//# sourceMappingURL=flight-render-result.js.map