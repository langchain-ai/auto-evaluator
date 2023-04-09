import React from "react";
import { Meta, MultiMeta } from "./meta";
export function OpenGraphMetadata({ openGraph  }) {
    var ref, ref1, ref2;
    if (!openGraph) {
        return null;
    }
    let typedOpenGraph;
    if ("type" in openGraph) {
        switch(openGraph.type){
            case "website":
                typedOpenGraph = /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "website"
                });
                break;
            case "article":
                var ref3, ref4, ref5;
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "article"
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "article:published_time",
                    content: (ref3 = openGraph.publishedTime) == null ? void 0 : ref3.toString()
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "article:modified_time",
                    content: (ref4 = openGraph.modifiedTime) == null ? void 0 : ref4.toString()
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "article:expiration_time",
                    content: (ref5 = openGraph.expirationTime) == null ? void 0 : ref5.toString()
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "article:author",
                    contents: openGraph.authors
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "article:section",
                    content: openGraph.section
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "article:tag",
                    contents: openGraph.tags
                }));
                break;
            case "book":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "book"
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "book:isbn",
                    content: openGraph.isbn
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "book:release_date",
                    content: openGraph.releaseDate
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "book:author",
                    contents: openGraph.authors
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "book:tag",
                    contents: openGraph.tags
                }));
                break;
            case "profile":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "profile"
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "profile:first_name",
                    content: openGraph.firstName
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "profile:last_name",
                    content: openGraph.lastName
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "profile:username",
                    content: openGraph.username
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "profile:gender",
                    content: openGraph.gender
                }));
                break;
            case "music.song":
                var ref6;
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "music.song"
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "music:duration",
                    content: (ref6 = openGraph.duration) == null ? void 0 : ref6.toString()
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:album",
                    contents: openGraph.albums
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:musician",
                    contents: openGraph.musicians
                }));
                break;
            case "music.album":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "music.album"
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:song",
                    contents: openGraph.songs
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:musician",
                    contents: openGraph.musicians
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "music:release_date",
                    content: openGraph.releaseDate
                }));
                break;
            case "music.playlist":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "music.playlist"
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:song",
                    contents: openGraph.songs
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:creator",
                    contents: openGraph.creators
                }));
                break;
            case "music.radio_station":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "music.radio_station"
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "music:creator",
                    contents: openGraph.creators
                }));
                break;
            case "video.movie":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "video.movie"
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:actor",
                    contents: openGraph.actors
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:director",
                    contents: openGraph.directors
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:writer",
                    contents: openGraph.writers
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "video:duration",
                    content: openGraph.duration
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "video:release_date",
                    content: openGraph.releaseDate
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:tag",
                    contents: openGraph.tags
                }));
                break;
            case "video.episode":
                typedOpenGraph = /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "video.episode"
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:actor",
                    contents: openGraph.actors
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:director",
                    contents: openGraph.directors
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:writer",
                    contents: openGraph.writers
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "video:duration",
                    content: openGraph.duration
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "video:release_date",
                    content: openGraph.releaseDate
                }), /*#__PURE__*/ React.createElement(MultiMeta, {
                    propertyPrefix: "video:tag",
                    contents: openGraph.tags
                }), /*#__PURE__*/ React.createElement(Meta, {
                    property: "video:series",
                    content: openGraph.series
                }));
                break;
            case "video.tv_show":
                typedOpenGraph = /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "video.tv_show"
                });
                break;
            case "video.other":
                typedOpenGraph = /*#__PURE__*/ React.createElement(Meta, {
                    property: "og:type",
                    content: "video.other"
                });
                break;
            default:
                throw new Error("Invalid OpenGraph type: " + openGraph.type);
        }
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
        property: "og:determiner",
        content: openGraph.determiner
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:title",
        content: (ref = openGraph.title) == null ? void 0 : ref.absolute
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:description",
        content: openGraph.description
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:url",
        content: (ref1 = openGraph.url) == null ? void 0 : ref1.toString()
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:site_name",
        content: openGraph.siteName
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:locale",
        content: openGraph.locale
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:country_name",
        content: openGraph.countryName
    }), /*#__PURE__*/ React.createElement(Meta, {
        property: "og:ttl",
        content: (ref2 = openGraph.ttl) == null ? void 0 : ref2.toString()
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:image",
        contents: openGraph.images
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:video",
        contents: openGraph.videos
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:audio",
        contents: openGraph.audio
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:email",
        contents: openGraph.emails
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:phone_number",
        contents: openGraph.phoneNumbers
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:fax_number",
        contents: openGraph.faxNumbers
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "og:locale:alternate",
        contents: openGraph.alternateLocale
    }), typedOpenGraph);
}
function TwitterAppItem({ app , type  }) {
    var ref, ref7;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
        name: `twitter:app:name:${type}`,
        content: app.name
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: `twitter:app:id:${type}`,
        content: app.id[type]
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: `twitter:app:url:${type}`,
        content: (ref = app.url) == null ? void 0 : (ref7 = ref[type]) == null ? void 0 : ref7.toString()
    }));
}
export function TwitterMetadata({ twitter  }) {
    var ref;
    if (!twitter) return null;
    const { card  } = twitter;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:card",
        content: card
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:site",
        content: twitter.site
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:site:id",
        content: twitter.siteId
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:creator",
        content: twitter.creator
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:creator:id",
        content: twitter.creatorId
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:title",
        content: (ref = twitter.title) == null ? void 0 : ref.absolute
    }), /*#__PURE__*/ React.createElement(Meta, {
        name: "twitter:description",
        content: twitter.description
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        namePrefix: "twitter:image",
        contents: twitter.images
    }), card === "player" ? twitter.players.map((player, index)=>/*#__PURE__*/ React.createElement(React.Fragment, {
            key: index
        }, /*#__PURE__*/ React.createElement(Meta, {
            name: "twitter:player",
            content: player.playerUrl.toString()
        }), /*#__PURE__*/ React.createElement(Meta, {
            name: "twitter:player:stream",
            content: player.streamUrl.toString()
        }), /*#__PURE__*/ React.createElement(Meta, {
            name: "twitter:player:width",
            content: player.width
        }), /*#__PURE__*/ React.createElement(Meta, {
            name: "twitter:player:height",
            content: player.height
        }))) : null, card === "app" ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(TwitterAppItem, {
        app: twitter.app,
        type: "iphone"
    }), /*#__PURE__*/ React.createElement(TwitterAppItem, {
        app: twitter.app,
        type: "ipad"
    }), /*#__PURE__*/ React.createElement(TwitterAppItem, {
        app: twitter.app,
        type: "googleplay"
    })) : null);
}
export function AppLinksMeta({ appLinks  }) {
    if (!appLinks) return null;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:ios",
        contents: appLinks.ios
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:iphone",
        contents: appLinks.iphone
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:ipad",
        contents: appLinks.ipad
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:android",
        contents: appLinks.android
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:windows_phone",
        contents: appLinks.windows_phone
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:windows",
        contents: appLinks.windows
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:windows_universal",
        contents: appLinks.windows_universal
    }), /*#__PURE__*/ React.createElement(MultiMeta, {
        propertyPrefix: "al:web",
        contents: appLinks.web
    }));
}

//# sourceMappingURL=opengraph.js.map