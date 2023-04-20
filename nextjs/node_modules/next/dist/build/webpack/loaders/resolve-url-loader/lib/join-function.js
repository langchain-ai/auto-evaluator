"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultJoin = void 0;
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const compose = (f, g)=>(...args)=>f(g(...args));
const simpleJoin = compose(_path.default.normalize, _path.default.join);
const defaultJoin = createJoinForPredicate(function predicate(_, uri, base, i, next) {
    const absolute = simpleJoin(base, uri);
    return _fs.default.existsSync(absolute) ? absolute : next(i === 0 ? absolute : null);
}, "defaultJoin");
exports.defaultJoin = defaultJoin;
function* createIterator(arr) {
    for (const i of arr){
        yield i;
    }
}
/**
 * Define a join function by a predicate that tests possible base paths from an iterator.
 *
 * The `predicate` is of the form:
 *
 * ```
 * function(filename, uri, base, i, next):string|null
 * ```
 *
 * Given the uri and base it should either return:
 * - an absolute path success
 * - a call to `next(null)` as failure
 * - a call to `next(absolute)` where absolute is placeholder and the iterator continues
 *
 * The value given to `next(...)` is only used if success does not eventually occur.
 *
 * The `file` value is typically unused but useful if you would like to differentiate behaviour.
 *
 * You can write a much simpler function than this if you have specific requirements.
 *
 */ function createJoinForPredicate(/** predicate A function that tests values */ predicate, /** Optional name for the resulting join function */ name) {
    /**
   * A factory for a join function with logging.
   */ function join(/** The current file being processed */ filename, /** An options hash */ options) {
        const log = createDebugLogger(options.debug);
        /**
     * Join function proper.
     *
     * For absolute uri only `uri` will be provided. In this case we substitute any `root` given in options.
     *
     * Returns Just the uri where base is empty or the uri appended to the base
     */ return function joinProper(/** A uri path, relative or absolute */ uri, /** Optional absolute base path or iterator thereof */ baseOrIteratorOrAbsent) {
            const iterator = typeof baseOrIteratorOrAbsent === "undefined" && createIterator([
                options.root
            ]) || typeof baseOrIteratorOrAbsent === "string" && createIterator([
                baseOrIteratorOrAbsent
            ]) || baseOrIteratorOrAbsent;
            const result = runIterator([]);
            log(createJoinMsg, [
                filename,
                uri,
                result,
                result.isFound
            ]);
            return typeof result.absolute === "string" ? result.absolute : uri;
            function runIterator(accumulator) {
                const nextItem = iterator.next();
                var base = !nextItem.done && nextItem.value;
                if (typeof base === "string") {
                    const element = predicate(filename, uri, base, accumulator.length, next);
                    if (typeof element === "string" && _path.default.isAbsolute(element)) {
                        return Object.assign(accumulator.concat(base), {
                            isFound: true,
                            absolute: element
                        });
                    } else if (Array.isArray(element)) {
                        return element;
                    } else {
                        throw new Error("predicate must return an absolute path or the result of calling next()");
                    }
                } else {
                    return accumulator;
                }
                function next(fallback) {
                    return runIterator(Object.assign(accumulator.concat(base), typeof fallback === "string" && {
                        absolute: fallback
                    }));
                }
            }
        };
    }
    function toString() {
        return "[Function: " + name + "]";
    }
    return Object.assign(join, name && {
        valueOf: toString,
        toString: toString
    });
}
/**
 * Format a debug message.
 * Return Formatted message
 */ function createJoinMsg(/** The file being processed by webpack */ file, /**  A uri path, relative or absolute */ uri, /** Absolute base paths up to and including the found one */ bases, /** Indicates the last base was correct */ isFound) {
    return [
        "resolve-url-loader: " + pathToString(file) + ": " + uri,
        //
        ...bases.map(pathToString).filter(Boolean),
        ...isFound ? [
            "FOUND"
        ] : [
            "NOT FOUND"
        ], 
    ].join("\n  ");
    /**
   * If given path is within `process.cwd()` then show relative posix path, otherwise show absolute posix path.
   *
   * Returns A relative or absolute path
   */ function pathToString(/** An absolute path */ absolute) {
        if (!absolute) {
            return null;
        } else {
            const relative = _path.default.relative(process.cwd(), absolute).split(_path.default.sep);
            return (relative[0] === ".." ? absolute.split(_path.default.sep) : [
                "."
            ].concat(relative).filter(Boolean)).join("/");
        }
    }
}
exports.createJoinMsg = createJoinMsg;
/**
 * A factory for a log function predicated on the given debug parameter.
 *
 * The logging function created accepts a function that formats a message and parameters that the function utilises.
 * Presuming the message function may be expensive we only call it if logging is enabled.
 *
 * The log messages are de-duplicated based on the parameters, so it is assumed they are simple types that stringify
 * well.
 *
 * Returns A logging function possibly degenerate
 */ function createDebugLogger(/** A boolean or debug function */ debug) {
    const log = !!debug && (typeof debug === "function" ? debug : console.log);
    const cache = {};
    return log ? actuallyLog : noop;
    function noop() {}
    function actuallyLog(msgFn, params) {
        const key = JSON.stringify(params);
        if (!cache[key]) {
            cache[key] = true;
            log(msgFn.apply(null, params));
        }
    }
}
exports.createDebugLogger = createDebugLogger;

//# sourceMappingURL=join-function.js.map