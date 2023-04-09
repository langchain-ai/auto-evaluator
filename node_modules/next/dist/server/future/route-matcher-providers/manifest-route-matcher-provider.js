"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _cachedRouteMatcherProvider = require("./helpers/cached-route-matcher-provider");
class ManifestRouteMatcherProvider extends _cachedRouteMatcherProvider.CachedRouteMatcherProvider {
    constructor(manifestName, manifestLoader){
        super({
            load: async ()=>manifestLoader.load(manifestName),
            compare: (left, right)=>left === right
        });
    }
}
exports.ManifestRouteMatcherProvider = ManifestRouteMatcherProvider;

//# sourceMappingURL=manifest-route-matcher-provider.js.map