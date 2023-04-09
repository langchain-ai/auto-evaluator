"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normalizeAppPath = normalizeAppPath;
exports.normalizeRscPath = normalizeRscPath;
var _ensureLeadingSlash = require("../../page-path/ensure-leading-slash");
function normalizeAppPath(route) {
    return (0, _ensureLeadingSlash).ensureLeadingSlash(route.split('/').reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (segment.startsWith('(') && segment.endsWith(')')) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment.startsWith('@')) {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return `${pathname}/${segment}`;
    }, ''));
}
function normalizeRscPath(pathname, enabled) {
    return enabled ? pathname.replace(/\.rsc($|\?)/, // $1 ensures `?` is preserved
    '$1') : pathname;
}

//# sourceMappingURL=app-paths.js.map