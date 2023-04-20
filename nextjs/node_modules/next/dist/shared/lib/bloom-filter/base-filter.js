"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _hashing = _interop_require_default(require("./hashing"));
var _utils = require("./utils");
function randomInt32() {
    if (typeof window === 'undefined' && process.env.NEXT_RUNTIME === 'nodejs') {
        return require('crypto').randomBytes(4).readUInt32BE(0);
    }
    return crypto.getRandomValues(new Uint32Array(1))[0];
}
function seedrandom() {
    return {
        int32: randomInt32,
        quick: randomInt32
    };
}
class BaseFilter {
    /**
   * Get the seed used in this structure
   */ get seed() {
        return this._seed;
    }
    /**
   * Set the seed for this structure
   * @param  seed the new seed that will be used in this structure
   */ set seed(seed) {
        this._seed = seed;
        this._rng = seedrandom();
    }
    /**
   * Get a function used to draw random number
   * @return A factory function used to draw random integer
   */ get random() {
        return this._rng;
    }
    /**
   * Return a next random seeded int32 integer
   * @returns
   */ nextInt32() {
        return this._rng.int32();
    }
    /**
   * Save the current structure as a JSON
   */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveAsJSON() {
        throw new Error('not-implemented');
    }
    /**
   * Load an Object from a provided JSON object
   * @param json the JSON object to load
   * @return Return the Object loaded from the provided JSON object
   */ // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    static fromJSON(json) {
        throw new Error(`not-implemented`);
    }
    constructor(){
        this._seed = (0, _utils).getDefaultSeed();
        this._rng = seedrandom();
        this._hashing = new _hashing.default();
    }
}
exports.default = BaseFilter;

//# sourceMappingURL=base-filter.js.map