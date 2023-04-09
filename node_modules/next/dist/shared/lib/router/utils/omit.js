"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.omit = omit;
function omit(object, keys) {
    const omitted = {};
    Object.keys(object).forEach((key)=>{
        if (!keys.includes(key)) {
            omitted[key] = object[key];
        }
    });
    return omitted;
}

//# sourceMappingURL=omit.js.map