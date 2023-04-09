"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _utils = require("./utils");
function nextFlightActionEntryLoader() {
    const { actions  } = this.getOptions();
    const actionList = JSON.parse(actions);
    return `
const actions = {
${actionList.map(([path, names])=>{
        return names.map((name)=>`  '${(0, _utils).generateActionId(path, name)}': () => import(/* webpackMode: "eager" */ ${JSON.stringify(path)}).then(mod => mod[${JSON.stringify(name)}]),`).join("\n");
    }).join("\n")}
}

async function endpoint(id, bound) {
  const action = await actions[id]()
  return action.apply(null, bound)
}

// Using "export default" will cause this to be tree-shaken away due to unused exports.
module.exports = endpoint
`;
}
var _default = nextFlightActionEntryLoader;
exports.default = _default;

//# sourceMappingURL=next-flight-action-entry-loader.js.map