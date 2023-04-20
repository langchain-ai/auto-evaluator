"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _renderResult = _interopRequireDefault(require("../render-result"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class ActionRenderResult extends _renderResult.default {
    constructor(response){
        super(response, {
            contentType: "application/json"
        });
    }
}
exports.ActionRenderResult = ActionRenderResult;

//# sourceMappingURL=action-render-result.js.map