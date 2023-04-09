import { resolveAsArrayOrUndefined } from "../generate/utils";
import { isStringOrURL, resolveUrl } from "./resolve-url";
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
    const resolvedImages = resolveAsArrayOrUndefined(images);
    resolvedImages == null ? void 0 : resolvedImages.forEach((item, index, array)=>{
        if (isStringOrURL(item)) {
            array[index] = {
                url: metadataBase ? resolveUrl(item, metadataBase) : item
            };
        } else {
            // Update image descriptor url
            item.url = metadataBase ? resolveUrl(item.url, metadataBase) : item.url;
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
export function resolveOpenGraph(openGraph, metadataBase) {
    if (!openGraph) return null;
    const url = resolveUrl(openGraph.url, metadataBase);
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
                    const arrayValue = resolveAsArrayOrUndefined(value);
                    resolved[key] = arrayValue;
                }
            }
        }
        resolved.images = resolveImages(og.images, metadataBase);
    }
    assignProps(openGraph);
    resolved.url = url;
    return resolved;
}
const TwitterBasicInfoKeys = [
    "site",
    "siteId",
    "creator",
    "creatorId",
    "description", 
];
export const resolveTwitter = (twitter, metadataBase)=>{
    if (!twitter) return null;
    const resolved = {
        title: twitter.title
    };
    for (const infoKey of TwitterBasicInfoKeys){
        resolved[infoKey] = twitter[infoKey] || null;
    }
    resolved.images = resolveImages(twitter.images, metadataBase);
    if ("card" in twitter) {
        resolved.card = twitter.card;
        switch(twitter.card){
            case "player":
                {
                    // @ts-ignore
                    resolved.players = resolveAsArrayOrUndefined(twitter.players) || [];
                    break;
                }
            case "app":
                {
                    // @ts-ignore
                    resolved.app = twitter.app || {};
                    break;
                }
            default:
                break;
        }
    } else {
        resolved.card = "summary";
    }
    return resolved;
};

//# sourceMappingURL=resolve-opengraph.js.map