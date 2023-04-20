"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _baseFilter = _interop_require_default(require("./base-filter"));
var _bitSet = _interop_require_default(require("./bit-set"));
var _formulas = require("./formulas");
class BloomFilter extends _baseFilter.default {
    /**
   * Create an optimal bloom filter providing the maximum of elements stored and the error rate desired
   * @param  nbItems      - The maximum number of item to store
   * @param  errorRate  - The error rate desired for a maximum of items inserted
   * @return A new {@link BloomFilter}
   */ static create(nbItems, errorRate) {
        const size = (0, _formulas).optimalFilterSize(nbItems, errorRate);
        const hashes = (0, _formulas).optimalHashes(size, nbItems);
        return new this(size, hashes);
    }
    /**
   * Build a new Bloom Filter from an existing iterable with a fixed error rate
   * @param items - The iterable used to populate the filter
   * @param errorRate - The error rate, i.e. 'false positive' rate, targeted by the filter
   * @param seed - The random number seed (optional)
   * @return A new Bloom Filter filled with the iterable's elements
   * @example
   * ```js
   * // create a filter with a false positive rate of 0.1
   * const filter = BloomFilter.from(['alice', 'bob', 'carl'], 0.1);
   * ```
   */ static from(items, errorRate, seed) {
        const array = Array.from(items);
        const filter = BloomFilter.create(array.length, errorRate);
        if (typeof seed === 'number') {
            filter.seed = seed;
        }
        array.forEach((element)=>filter.add(element));
        return filter;
    }
    /**
   * Get the optimal size of the filter
   * @return The size of the filter
   */ get size() {
        return this._size;
    }
    /**
   * Get the number of bits currently set in the filter
   * @return The filter length
   */ get length() {
        return this._filter.bitCount();
    }
    /**
   * Add an element to the filter
   * @param element - The element to add
   * @example
   * ```js
   * const filter = new BloomFilter(15, 0.1);
   * filter.add('foo');
   * ```
   */ add(element) {
        const indexes = this._hashing.getIndexes(element, this._size, this._nbHashes, this.seed);
        for(let i = 0; i < indexes.length; i++){
            this._filter.add(indexes[i]);
        }
    }
    /**
   * Test an element for membership
   * @param element - The element to look for in the filter
   * @return False if the element is definitively not in the filter, True is the element might be in the filter
   * @example
   * ```js
   * const filter = new BloomFilter(15, 0.1);
   * filter.add('foo');
   * console.log(filter.has('foo')); // output: true
   * console.log(filter.has('bar')); // output: false
   * ```
   */ has(element) {
        const indexes = this._hashing.getIndexes(element, this._size, this._nbHashes, this.seed);
        for(let i = 0; i < indexes.length; i++){
            if (!this._filter.has(indexes[i])) {
                return false;
            }
        }
        return true;
    }
    /**
   * Get the current false positive rate (or error rate) of the filter
   * @return The current false positive rate of the filter
   * @example
   * ```js
   * const filter = new BloomFilter(15, 0.1);
   * console.log(filter.rate()); // output: something around 0.1
   * ```
   */ rate() {
        return Math.pow(1 - Math.exp(-this.length / this._size), this._nbHashes);
    }
    /**
   * Check if another Bloom Filter is equal to this one
   * @param  other - The filter to compare to this one
   * @return True if they are equal, false otherwise
   */ equals(other) {
        if (this._size !== other._size || this._nbHashes !== other._nbHashes) {
            return false;
        }
        return this._filter.equals(other._filter);
    }
    export() {
        return {
            bitset: this._filter.export(),
            hashes: this._nbHashes,
            size: this._size
        };
    }
    import(data) {
        this._filter = _bitSet.default.import(data.bitset);
    }
    /**
   * Constructor
   * @param size - The number of cells
   * @param nbHashes - The number of hash functions used
   */ constructor(size, nbHashes){
        super();
        if (nbHashes < 1) {
            throw new Error(`A BloomFilter cannot uses less than one hash function, while you tried to use ${nbHashes}.`);
        }
        this._size = size;
        this._nbHashes = nbHashes;
        this._filter = new _bitSet.default(size);
    }
}
exports.BloomFilter = BloomFilter;

//# sourceMappingURL=index.js.map