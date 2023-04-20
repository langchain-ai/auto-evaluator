"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _utils = require("./utils");
function nextFlightActionEntryLoader() {
    const { actions  } = this.getOptions();
    const actionList = JSON.parse(actions);
    const individualActions = actionList.map(([path, names])=>{
        return names.map((name)=>{
            const id = (0, _utils).generateActionId(path, name);
            return [
                id,
                path,
                name
            ];
        });
    }).flat();
    return `
const actions = {
${individualActions.map(([id, path, name])=>{
        return `'${id}': () => import(/* webpackMode: "eager" */ ${JSON.stringify(path)}).then(mod => mod[${JSON.stringify(name)}]),`;
    }).join("\n")}
}

async function endpoint(id, ...args) {
  const action = await actions[id]()

  if (action.$$with_bound === false) {
    return action.apply(null, args)
  }

  return action.call(null, args)
}

// Using CJS to avoid this to be tree-shaken away due to unused exports.
module.exports = {
${individualActions.map(([id])=>{
        return `  '${id}': endpoint.bind(null, '${id}'),`;
    }).join("\n")}
}
`;
}
var _default = nextFlightActionEntryLoader;
exports.default = _default;

//# sourceMappingURL=next-flight-action-entry-loader.js.map