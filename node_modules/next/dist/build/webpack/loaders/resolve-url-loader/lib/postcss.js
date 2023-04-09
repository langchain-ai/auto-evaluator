"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = process;
var _path = _interopRequireDefault(require("path"));
var _fileProtocol = require("./file-protocol");
function process(postcss, sourceFile, sourceContent, params) {
    // #107 libsass emits orphan CR not considered newline, postcss does consider newline (content vs source-map mismatch)
    // prepend file protocol to all sources to avoid problems with source map
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return postcss([
        postcss.plugin("postcss-resolve-url", postcssPlugin)
    ]).process(sourceContent, {
        from: (0, _fileProtocol).prepend(sourceFile),
        map: params.outputSourceMap && {
            prev: !!params.inputSourceMap && (0, _fileProtocol).prepend(params.inputSourceMap),
            inline: false,
            annotation: false,
            sourcesContent: true
        }
    }).then((result)=>({
            content: result.css,
            map: params.outputSourceMap ? (0, _fileProtocol).remove(result.map.toJSON()) : null
        }));
    /**
   * Plugin for postcss that follows SASS transpilation.
   */ function postcssPlugin() {
        return function(styles) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            styles.walkDecls(eachDeclaration);
        };
        /**
     * Process a declaration from the syntax tree.
     * @param declaration
     */ function eachDeclaration(declaration) {
            const isValid = declaration.value && declaration.value.indexOf("url") >= 0;
            if (isValid) {
                // reverse the original source-map to find the original source file before transpilation
                const startPosApparent = declaration.source.start, startPosOriginal = params.sourceMapConsumer && params.sourceMapConsumer.originalPositionFor(startPosApparent);
                // we require a valid directory for the specified file
                const directory = startPosOriginal && startPosOriginal.source && (0, _fileProtocol).remove(_path.default.dirname(startPosOriginal.source));
                if (directory) {
                    declaration.value = params.transformDeclaration(declaration.value, directory);
                } else if (params.sourceMapConsumer) {
                    throw new Error("source-map information is not available at url() declaration " + (ORPHAN_CR_REGEX.test(sourceContent) ? "(found orphan CR, try removeCR option)" : "(no orphan CR found)"));
                }
            }
        }
    }
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ORPHAN_CR_REGEX = /\r(?!\n)(.|\n)?/g;

//# sourceMappingURL=postcss.js.map