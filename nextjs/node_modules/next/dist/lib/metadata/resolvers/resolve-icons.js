"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveIcon = resolveIcon;
exports.resolveIcons = void 0;
var _utils = require("../generate/utils");
var _resolveUrl = require("./resolve-url");
var _constants = require("../constants");
function resolveIcon(icon) {
    if ((0, _resolveUrl).isStringOrURL(icon)) return {
        url: icon
    };
    else if (Array.isArray(icon)) return icon;
    return icon;
}
const resolveIcons = (icons)=>{
    if (!icons) {
        return null;
    }
    const resolved = {
        icon: [],
        apple: []
    };
    if (Array.isArray(icons)) {
        resolved.icon = icons.map(resolveIcon).filter(Boolean);
    } else if ((0, _resolveUrl).isStringOrURL(icons)) {
        resolved.icon = [
            resolveIcon(icons)
        ];
    } else {
        for (const key of _constants.IconKeys){
            const values = (0, _utils).resolveAsArrayOrUndefined(icons[key]);
            if (values) resolved[key] = values.map(resolveIcon);
        }
    }
    return resolved;
};
exports.resolveIcons = resolveIcons;

//# sourceMappingURL=resolve-icons.js.map