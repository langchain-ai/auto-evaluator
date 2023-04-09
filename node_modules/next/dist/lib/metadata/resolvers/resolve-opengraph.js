"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveTwitter = exports.resolveOpenGraph = void 0;
var _utils = require("../generate/utils");
var _resolveUrl = require("./resolve-url");
const OgTypeFields = {
    article: [
        "authors",
        "tags"
    ],
    song: [
        "albums",
        "musicians"
    ],
    playlist: [
        "albums",
        "musicians"
    ],
    radio: [
        "creators"
    ],
    video: [
        "actors",
        "directors",
        "writers",
        "tags"
    ],
    basic: [
        "emails",
        "phoneNumbers",
        "faxNumbers",
        "alternateLocale",
        "audio",
        "videos", 
    ]
};
function resolveImages(images, metadataBase) {
    const resolvedImages = (0, _utils).resolveAsArrayOrUndefined(images);
    resolvedImages == null ? void 0 : resolvedImages.forEach((item, index, array)=>{
        if ((0, _resolveUrl).isStringOrURL(item)) {
            array[index] = {
                url: (0, _resolveUrl).resolveUrl(item, metadataBase)
            };
        } else {
            // Update image descriptor url
            item.url = (0, _resolveUrl).resolveUrl(item.url, metadataBase);
        }
    });
    return resolvedImages;
}
function getFieldsByOgType(ogType) {
    switch(ogType){
        case "article":
        case "book":
            return OgTypeFields.article;
        case "music.song":
        case "music.album":
            return OgTypeFields.song;
        case "music.playlist":
            return OgTypeFields.playlist;
        case "music.radio_station":
            return OgTypeFields.radio;
        case "video.movie":
        case "video.episode":
            return OgTypeFields.video;
        default:
            return OgTypeFields.basic;
    }
}
const resolveOpenGraph = (openGraph, metadataBase)=>{
    if (!openGraph) return null;
    const url = (0, _resolveUrl).resolveUrl(openGraph.url, metadataBase);
    const resolved = {
        ...openGraph
    };
    function assignProps(og) {
        const ogType = og && "type" in og ? og.type : undefined;
        const keys = getFieldsByOgType(ogType);
        for (const k of keys){
            const key = k;
            if (key in og && key !== "url") {
                const value = og[key];
                if (value) {
                    const arrayValue = (0, _utils).resolveAsArrayOrUndefined(value);
                    resolved[key] = arrayValue;
                }
            }
        }
        resolved.images = resolveImages(og.images, metadataBase);
    }
    assignProps(openGraph);
    resolved.url = url;
    return resolved;
};
exports.resolveOpenGraph = resolveOpenGraph;
const TwitterBasicInfoKeys = [
    "site",
    "siteId",
    "creator",
    "creatorId",
    "description", 
];
const resolveTwitter = (twitter, metadataBase)=>{
    if (!twitter) return null;
    const resolved = {
        ...twitter,
        card: "card" in twitter ? twitter.card : "summary"
    };
    for (const infoKey of TwitterBasicInfoKeys){
        resolved[infoKey] = twitter[infoKey] || null;
    }
    resolved.images = resolveImages(twitter.images, metadataBase);
    if ("card" in resolved) {
        switch(resolved.card){
            case "player":
                {
                    resolved.players = (0, _utils).resolveAsArrayOrUndefined(resolved.players) || [];
                    break;
                }
            case "app":
                {
                    resolved.app = resolved.app || {};
                    break;
                }
            default:
                break;
        }
    }
    return resolved;
};
exports.resolveTwitter = resolveTwitter;

//# sourceMappingURL=resolve-opengraph.js.map