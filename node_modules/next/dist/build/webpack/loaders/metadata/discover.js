"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.discoverStaticMetadataFiles = discoverStaticMetadataFiles;
exports.buildMetadata = buildMetadata;
exports.METADATA_IMAGE_RESOURCE_QUERY = void 0;
var _path = _interopRequireDefault(require("path"));
var _querystring = require("querystring");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const METADATA_TYPE = "metadata";
const METADATA_IMAGE_RESOURCE_QUERY = "?__next_metadata";
exports.METADATA_IMAGE_RESOURCE_QUERY = METADATA_IMAGE_RESOURCE_QUERY;
const staticAssetIconsImage = {
    icon: {
        filename: "icon",
        extensions: [
            "ico",
            "jpg",
            "jpeg",
            "png",
            "svg"
        ]
    },
    apple: {
        filename: "apple-icon",
        extensions: [
            "jpg",
            "jpeg",
            "png"
        ]
    },
    favicon: {
        filename: "favicon",
        extensions: [
            "ico"
        ]
    },
    opengraph: {
        filename: "opengraph-image",
        extensions: [
            "jpg",
            "jpeg",
            "png",
            "gif"
        ]
    },
    twitter: {
        filename: "twitter-image",
        extensions: [
            "jpg",
            "jpeg",
            "png",
            "gif"
        ]
    }
};
// Produce all compositions with filename (icon, apple-icon, etc.) with extensions (png, jpg, etc.)
async function enumMetadataFiles(dir, filename, extensions, { resolvePath , loaderContext  }) {
    const collectedFiles = [];
    // Possible filename without extension could: icon, icon0, ..., icon9
    const possibleFileNames = [
        filename
    ].concat(Array(10).fill(0).map((_, index)=>filename + index));
    for (const name of possibleFileNames){
        for (const ext of extensions){
            const pathname = _path.default.join(dir, `${name}.${ext}`);
            try {
                const resolved = await resolvePath(pathname);
                loaderContext.addDependency(resolved);
                collectedFiles.push(resolved);
            } catch (err) {
                if (!err.message.includes("Can't resolve")) {
                    throw err;
                }
                loaderContext.addMissingDependency(pathname);
            }
        }
    }
    return collectedFiles;
}
async function discoverStaticMetadataFiles(resolvedDir, { resolvePath , isRootLayer , loaderContext , loaderOptions  }) {
    let hasStaticMetadataFiles = false;
    const staticImagesMetadata = {
        icon: [],
        apple: [],
        twitter: [],
        opengraph: []
    };
    const opts = {
        resolvePath,
        loaderContext
    };
    const metadataImageLoaderOptions = {
        isDev: loaderOptions.isDev,
        assetPrefix: loaderOptions.assetPrefix
    };
    async function collectIconModuleIfExists(type) {
        const resolvedMetadataFiles = await enumMetadataFiles(resolvedDir, staticAssetIconsImage[type].filename, staticAssetIconsImage[type].extensions, opts);
        resolvedMetadataFiles.sort((a, b)=>a.localeCompare(b)).forEach((filepath)=>{
            const imageModule = `() => import(/* webpackMode: "eager" */ ${JSON.stringify(`next-metadata-image-loader?${(0, _querystring).stringify({
                ...metadataImageLoaderOptions,
                numericSizes: type === "twitter" || type === "opengraph" ? "1" : undefined
            })}!` + filepath + METADATA_IMAGE_RESOURCE_QUERY)})`;
            hasStaticMetadataFiles = true;
            if (type === "favicon") {
                staticImagesMetadata.icon.unshift(imageModule);
            } else {
                staticImagesMetadata[type].push(imageModule);
            }
        });
    }
    await Promise.all([
        collectIconModuleIfExists("icon"),
        collectIconModuleIfExists("apple"),
        collectIconModuleIfExists("opengraph"),
        collectIconModuleIfExists("twitter"),
        isRootLayer && collectIconModuleIfExists("favicon"), 
    ]);
    return hasStaticMetadataFiles ? staticImagesMetadata : null;
}
function buildMetadata(metadata) {
    return metadata ? `${METADATA_TYPE}: {
    icon: [${metadata.icon.join(",")}],
    apple: [${metadata.apple.join(",")}],
    opengraph: [${metadata.opengraph.join(",")}],
    twitter: [${metadata.twitter.join(",")}],
  }` : "";
}

//# sourceMappingURL=discover.js.map