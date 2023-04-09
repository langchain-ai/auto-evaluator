"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.numberToHex = numberToHex;
exports.randomInt = randomInt;
exports.getDefaultSeed = getDefaultSeed;
function numberToHex(elem) {
    let e = Number(elem).toString(16);
    if (e.length % 4 !== 0) {
        e = '0'.repeat(4 - e.length % 4) + e;
    }
    return e;
}
function randomInt(min, max, random) {
    if (random === undefined) {
        random = Math.random;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    const rn = random();
    return Math.floor(rn * (max - min + 1)) + min;
}
function getDefaultSeed() {
    return 0x1234567890;
}

//# sourceMappingURL=utils.js.map