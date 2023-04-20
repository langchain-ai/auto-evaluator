"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _reflect = require("./reflect");
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("ReadonlyRequestCookies cannot be modified. Read more: https://nextjs.org/docs/api-reference/cookies");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
exports.ReadonlyRequestCookiesError = ReadonlyRequestCookiesError;
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
exports.RequestCookiesAdapter = RequestCookiesAdapter;

//# sourceMappingURL=request-cookies.js.map