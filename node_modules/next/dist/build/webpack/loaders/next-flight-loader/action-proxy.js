"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ensureServerEntryExports;
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== "function") {
            throw new Error(`A "use server" file can only export async functions, found ${typeof action}.`);
        }
    }
}

//# sourceMappingURL=action-proxy.js.map