import path from "path";
export class PrefixingNormalizer {
    constructor(prefix){
        this.prefix = prefix;
    }
    normalize(pathname) {
        return path.posix.join(this.prefix, pathname);
    }
}

//# sourceMappingURL=prefixing-normalizer.js.map