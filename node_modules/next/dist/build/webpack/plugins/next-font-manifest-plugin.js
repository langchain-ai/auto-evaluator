"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _webpack = require("next/dist/compiled/webpack/webpack");
var _getRouteFromEntrypoint = _interopRequireDefault(require("../../../server/get-route-from-entrypoint"));
var _constants = require("../../../shared/lib/constants");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PLUGIN_NAME = "NextFontManifestPlugin";
/**
 * When calling font functions with next/font, you can specify if you'd like the font to be preloaded (true by default).
 * e.g.: const inter = Inter({ subsets: ['latin'], preload: true })
 *
 * In that case, next-font-loader will emit the font file as [name].p.[ext] instead of [name].[ext]
 * This function returns those files from an array that can include both preloaded and non-preloaded files.
 */ function getPreloadedFontFiles(fontFiles) {
    return fontFiles.filter((file)=>/\.p.(woff|woff2|eot|ttf|otf)$/.test(file));
}
/**
 * Similarly to getPreloadedFontFiles, but returns true if some of the files includes -s in the name.
 * This means that a font is using size adjust in its fallback font.
 * This was added to enable adding data-size-adjust="true" to the dom, used by the Google Aurora team to collect statistics.
 */ function getPageIsUsingSizeAdjust(fontFiles) {
    return fontFiles.some((file)=>file.includes("-s"));
}
class NextFontManifestPlugin {
    constructor(options){
        this.appDirEnabled = options.appDirEnabled;
    }
    apply(compiler) {
        compiler.hooks.make.tap(PLUGIN_NAME, (compilation)=>{
            let nextFontModules;
            // After all modules are created, we collect the modules that was created by next-font-loader.
            if (this.appDirEnabled) {
                compilation.hooks.finishModules.tap(PLUGIN_NAME, (modules)=>{
                    const modulesArr = Array.from(modules);
                    nextFontModules = modulesArr.filter((mod)=>{
                        var ref;
                        return mod == null ? void 0 : (ref = mod.loaders) == null ? void 0 : ref.some(({ loader  })=>loader.includes("next-font-loader/index.js"));
                    });
                });
            }
            compilation.hooks.processAssets.tap({
                name: PLUGIN_NAME,
                stage: _webpack.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            }, (assets)=>{
                const nextFontManifest = {
                    pages: {},
                    app: {},
                    appUsingSizeAdjust: false,
                    pagesUsingSizeAdjust: false
                };
                if (this.appDirEnabled) {
                    // In this stage the font files are emitted and we can collect all files emitted by each next/font module.
                    for (const mod of nextFontModules){
                        var ref;
                        if (!((ref = mod.buildInfo) == null ? void 0 : ref.assets)) continue;
                        const modAssets = Object.keys(mod.buildInfo.assets);
                        const fontFiles = modAssets.filter((file)=>/\.(woff|woff2|eot|ttf|otf)$/.test(file));
                        // Look if size-adjust fallback font is being used
                        if (!nextFontManifest.appUsingSizeAdjust) {
                            nextFontManifest.appUsingSizeAdjust = getPageIsUsingSizeAdjust(fontFiles);
                        }
                        const preloadedFontFiles = getPreloadedFontFiles(fontFiles);
                        // Add an entry of the module's font files in the manifest.
                        // We'll add an entry even if no files should preload.
                        // When an entry is present but empty, instead of preloading the font files, a preconnect tag is added.
                        if (fontFiles.length > 0) {
                            nextFontManifest.app[mod.userRequest] = preloadedFontFiles;
                        }
                    }
                }
                // Look at all the entrypoints created for pages/.
                for (const entrypoint of compilation.entrypoints.values()){
                    const pagePath = (0, _getRouteFromEntrypoint).default(entrypoint.name);
                    if (!pagePath) {
                        continue;
                    }
                    // Get font files from the chunks included in the entrypoint.
                    const fontFiles = entrypoint.chunks.flatMap((chunk)=>[
                            ...chunk.auxiliaryFiles
                        ]).filter((file)=>/\.(woff|woff2|eot|ttf|otf)$/.test(file));
                    // Look if size-adjust fallback font is being used
                    if (!nextFontManifest.pagesUsingSizeAdjust) {
                        nextFontManifest.pagesUsingSizeAdjust = getPageIsUsingSizeAdjust(fontFiles);
                    }
                    const preloadedFontFiles = getPreloadedFontFiles(fontFiles);
                    // Add an entry of the route's font files in the manifest.
                    // We'll add an entry even if no files should preload.
                    // When an entry is present but empty, instead of preloading the font files, a preconnect tag is added.
                    if (fontFiles.length > 0) {
                        nextFontManifest.pages[pagePath] = preloadedFontFiles;
                    }
                }
                const manifest = JSON.stringify(nextFontManifest, null, 2);
                // Create manifest for edge
                assets[`server/${_constants.NEXT_FONT_MANIFEST}.js`] = new _webpack.sources.RawSource(`self.__NEXT_FONT_MANIFEST=${manifest}`);
                // Create manifest for server
                assets[`server/${_constants.NEXT_FONT_MANIFEST}.json`] = new _webpack.sources.RawSource(manifest);
            });
        });
        return;
    }
}
exports.NextFontManifestPlugin = NextFontManifestPlugin;

//# sourceMappingURL=next-font-manifest-plugin.js.map