/// <reference types="node" />
/**
 * Utilitaries functions
 * @namespace Utils
 * @private
 */
/**
 * @typedef {TwoHashes} Two hashes of the same value, as computed by {@link hashTwice}.
 * @property {number} first - The result of the first hashing function applied to a value
 * @property {number} second - The result of the second hashing function applied to a value
 * @memberof Utils
 */
export interface TwoHashes {
    first: number;
    second: number;
}
/**
 * Templated TwoHashes type
 */
export interface TwoHashesTemplated<T> {
    first: T;
    second: T;
}
/**
 * TwoHashes type in number and int format
 */
export interface TwoHashesIntAndString {
    int: TwoHashesTemplated<number>;
    string: TwoHashesTemplated<string>;
}
/**
 * Data type of an hashable value, must be string, ArrayBuffer or Buffer.
 */
export declare type HashableInput = string | ArrayBuffer | Buffer;
/**
 * Return a number to its Hex format by padding zeroes if length mod 4 != 0
 * @param elem the element to transform in HEX
 * @returns the HEX number padded of zeroes
 */
export declare function numberToHex(elem: number): string;
/**
 * Generate a random int between two bounds (included)
 * @param min - The lower bound
 * @param max - The upper bound
 * @param random - Function used to generate random floats
 * @return A random int bewteen lower and upper bound (included)
 * @memberof Utils
 * @author Thomas Minier
 */
export declare function randomInt(min: number, max: number, random?: () => number): number;
/**
 * Return the default seed used in the package
 * @return A seed as a floating point number
 * @author Arnaud Grall
 */
export declare function getDefaultSeed(): number;
