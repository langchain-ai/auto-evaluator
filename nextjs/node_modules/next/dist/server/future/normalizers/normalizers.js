"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class Normalizers {
    constructor(normalizers = []){
        this.normalizers = normalizers;
    }
    push(normalizer) {
        this.normalizers.push(normalizer);
    }
    normalize(pathname) {
        return this.normalizers.reduce((normalized, normalizer)=>normalizer.normalize(normalized), pathname);
    }
}
exports.Normalizers = Normalizers;

//# sourceMappingURL=normalizers.js.map