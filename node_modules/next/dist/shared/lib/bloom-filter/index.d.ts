import BaseFilter from './base-filter';
import BitSet from './bit-set';
import { HashableInput } from './hashing';
/**
 * A Bloom filter is a space-efficient probabilistic data structure, conceived by Burton Howard Bloom in 1970,
 * that is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not.
 *
 * Reference: Bloom, B. H. (1970). Space/time trade-offs in hash coding with allowable errors. Communications of the ACM, 13(7), 422-426.
 * @see {@link http://crystal.uta.edu/~mcguigan/cse6350/papers/Bloom.pdf} for more details about classic Bloom Filters.
 * @author Thomas Minier
 * @author Arnaud Grall
 */
export declare class BloomFilter extends BaseFilter {
    _size: number;
    _nbHashes: number;
    _filter: BitSet;
    /**
     * Constructor
     * @param size - The number of cells
     * @param nbHashes - The number of hash functions used
     */
    constructor(size: number, nbHashes: number);
    /**
     * Create an optimal bloom filter providing the maximum of elements stored and the error rate desired
     * @param  nbItems      - The maximum number of item to store
     * @param  errorRate  - The error rate desired for a maximum of items inserted
     * @return A new {@link BloomFilter}
     */
    static create(nbItems: number, errorRate: number): BloomFilter;
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
     */
    static from(items: Iterable<HashableInput>, errorRate: number, seed?: number): BloomFilter;
    /**
     * Get the optimal size of the filter
     * @return The size of the filter
     */
    get size(): number;
    /**
     * Get the number of bits currently set in the filter
     * @return The filter length
     */
    get length(): number;
    /**
     * Add an element to the filter
     * @param element - The element to add
     * @example
     * ```js
     * const filter = new BloomFilter(15, 0.1);
     * filter.add('foo');
     * ```
     */
    add(element: HashableInput): void;
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
     */
    has(element: HashableInput): boolean;
    /**
     * Get the current false positive rate (or error rate) of the filter
     * @return The current false positive rate of the filter
     * @example
     * ```js
     * const filter = new BloomFilter(15, 0.1);
     * console.log(filter.rate()); // output: something around 0.1
     * ```
     */
    rate(): number;
    /**
     * Check if another Bloom Filter is equal to this one
     * @param  other - The filter to compare to this one
     * @return True if they are equal, false otherwise
     */
    equals(other: BloomFilter): boolean;
    export(): {
        bitset: {
            size: number;
            content: string;
        };
        hashes: number;
        size: number;
    };
    import(data: ReturnType<typeof this.export>): void;
}
