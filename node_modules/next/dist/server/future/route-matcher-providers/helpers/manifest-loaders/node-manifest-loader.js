"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _constants = require("../../../../../shared/lib/constants");
var _path = _interopRequireDefault(require("../../../../../shared/lib/isomorphic/path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class NodeManifestLoader {
    constructor(distDir){
        this.distDir = distDir;
    }
    static require(id) {
        try {
            return require(id);
        } catch  {
            return null;
        }
    }
    load(name) {
        return NodeManifestLoader.require(_path.default.join(this.distDir, _constants.SERVER_DIRECTORY, name));
    }
}
exports.NodeManifestLoader = NodeManifestLoader;

//# sourceMappingURL=node-manifest-loader.js.map