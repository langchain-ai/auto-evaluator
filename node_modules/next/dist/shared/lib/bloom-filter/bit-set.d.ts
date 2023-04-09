/**
 * A memory-efficient Boolean array. Contains just the minimal operations needed for our Bloom filter implementation.
 *
 * @author David Leppik
 */
export default class BitSet {
    readonly size: number;
    array: Uint8Array;
    /**
     * Constructor. All bits are initially set to false.
     * @param size the number of bits that can be stored. (This is NOT required to be a multiple of 8.)
     */
    constructor(size: number);
    /**
     * Returns the value of the bit at the given index
     * @param index position of the bit, zero-indexed
     */
    has(index: number): boolean;
    /**
     * Set the bit to true
     * @param index position of the bit, zero-indexed
     */
    add(index: number): void;
    /**
     * Returns the maximum true bit.
     */
    max(): number;
    /**
     * Returns the number of true bits.
     */
    bitCount(): number;
    /**
     * Returns true if the size and contents are identical.
     * @param other another BitSet
     */
    equals(other: BitSet): boolean;
    /**
     * Returns a JSON-encodable object readable by {@link import}.
     */
    export(): {
        size: number;
        content: string;
    };
    /**
     * Returns an object written by {@link export}.
     * @param data an object written by {@link export}
     */
    static import(data: {
        size: number;
        content: string;
    }): BitSet;
    /**
     * Returns the index of the maximum bit in the number, or -1 for 0
     * @bits an unsigned 8-bit number
     * ```js
     * @example
     * BitSet.highBit(0) // returns -1
     * BitSet.highBit(5) // returns 2
     * ```
     */
    static highBit(bits: number): number;
    /**
     * Returns the number of true bits in the number
     * @bits an unsigned 8-bit number
     * @example
     * ```js
     * BitSet.countBits(0) // returns 0
     * BitSet.countBits(3) // returns 2
     * ```
     */
    static countBits(bits: number): number;
}
