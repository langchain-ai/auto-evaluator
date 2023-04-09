import Hashing from './hashing';
/**
 * Exported prng type because it is not from seedrandom
 * Orignal type can be found in: @types/seedrandom
 */
export interface prng {
    (): number;
    int32(): number;
    quick(): number;
}
/**
 * A base class for implementing probailistic filters
 * @author Thomas Minier
 * @author Arnaud Grall
 */
export default abstract class BaseFilter {
    _seed: number;
    _rng: prng;
    _hashing: Hashing;
    constructor();
    /**
     * Get the seed used in this structure
     */
    get seed(): number;
    /**
     * Set the seed for this structure
     * @param  seed the new seed that will be used in this structure
     */
    set seed(seed: number);
    /**
     * Get a function used to draw random number
     * @return A factory function used to draw random integer
     */
    get random(): prng;
    /**
     * Return a next random seeded int32 integer
     * @returns
     */
    nextInt32(): number;
    /**
     * Save the current structure as a JSON
     */
    saveAsJSON(): any;
    /**
     * Load an Object from a provided JSON object
     * @param json the JSON object to load
     * @return Return the Object loaded from the provided JSON object
     */
    static fromJSON(json: JSON): any;
}
