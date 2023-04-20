"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGlobal = exports.traceGlobals = void 0;
let _traceGlobals = global._traceGlobals;
if (!_traceGlobals) {
    _traceGlobals = new Map();
}
global._traceGlobals = _traceGlobals;
const traceGlobals = _traceGlobals;
exports.traceGlobals = traceGlobals;
const setGlobal = (key, val)=>{
    traceGlobals.set(key, val);
};
exports.setGlobal = setGlobal;

//# sourceMappingURL=shared.js.map