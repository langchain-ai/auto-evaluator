"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class ServerManifestLoader {
    constructor(getter){
        this.getter = getter;
    }
    load(name) {
        return this.getter(name);
    }
}
exports.ServerManifestLoader = ServerManifestLoader;

//# sourceMappingURL=server-manifest-loader.js.map