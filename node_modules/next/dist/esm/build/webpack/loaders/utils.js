import { createHash } from "crypto";
import { RSC_MODULE_TYPES } from "../../../shared/lib/constants";
const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "avif"
];
const imageRegex = new RegExp(`\\.(${imageExtensions.join("|")})$`);
export function isClientComponentModule(mod) {
    var ref;
    const hasClientDirective = ((ref = mod.buildInfo.rsc) == null ? void 0 : ref.type) === RSC_MODULE_TYPES.client;
    return hasClientDirective || imageRegex.test(mod.resource);
}
export const regexCSS = /\.(css|scss|sass)(\?.*)?$/;
export function getActions(mod) {
    var ref;
    return (ref = mod.buildInfo.rsc) == null ? void 0 : ref.actions;
}
export function generateActionId(filePath, exportName) {
    return createHash("sha1").update(filePath + ":" + exportName).digest("hex");
}

//# sourceMappingURL=utils.js.map