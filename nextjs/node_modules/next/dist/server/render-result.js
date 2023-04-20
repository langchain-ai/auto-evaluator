"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
class RenderResult {
    constructor(response, { contentType , ...metadata } = {}){
        this._result = response;
        this._contentType = contentType;
        this._metadata = metadata;
    }
    metadata() {
        return this._metadata;
    }
    isNull() {
        return this._result === null;
    }
    contentType() {
        return this._contentType;
    }
    toUnchunkedString() {
        if (typeof this._result !== "string") {
            throw new Error("invariant: dynamic responses cannot be unchunked. This is a bug in Next.js");
        }
        return this._result;
    }
    pipe(res) {
        if (this._result === null) {
            throw new Error("invariant: response is null. This is a bug in Next.js");
        }
        if (typeof this._result === "string") {
            throw new Error("invariant: static responses cannot be piped. This is a bug in Next.js");
        }
        const response = this._result;
        const flush = typeof res.flush === "function" ? ()=>res.flush() : ()=>{};
        return (async ()=>{
            const reader = response.getReader();
            let fatalError = false;
            try {
                while(true){
                    const { done , value  } = await reader.read();
                    if (done) {
                        res.end();
                        return;
                    }
                    fatalError = true;
                    res.write(value);
                    flush();
                }
            } catch (err) {
                if (fatalError) {
                    res.destroy(err);
                }
                throw err;
            }
        })();
    }
    isDynamic() {
        return typeof this._result !== "string";
    }
    static fromStatic(value) {
        return new RenderResult(value);
    }
    static empty = RenderResult.fromStatic("");
}
exports.default = RenderResult;

//# sourceMappingURL=render-result.js.map