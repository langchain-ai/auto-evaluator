/**
 * Return a number to its Hex format by padding zeroes if length mod 4 != 0
 * @param elem the element to transform in HEX
 * @returns the HEX number padded of zeroes
 */ export function numberToHex(elem) {
    let e = Number(elem).toString(16);
    if (e.length % 4 !== 0) {
        e = '0'.repeat(4 - e.length % 4) + e;
    }
    return e;
}
/**
 * Generate a random int between two bounds (included)
 * @param min - The lower bound
 * @param max - The upper bound
 * @param random - Function used to generate random floats
 * @return A random int bewteen lower and upper bound (included)
 * @memberof Utils
 * @author Thomas Minier
 */ export function randomInt(min, max, random) {
    if (random === undefined) {
        random = Math.random;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    const rn = random();
    return Math.floor(rn * (max - min + 1)) + min;
}
/**
 * Return the default seed used in the package
 * @return A seed as a floating point number
 * @author Arnaud Grall
 */ export function getDefaultSeed() {
    return 0x1234567890;
}

//# sourceMappingURL=utils.js.map