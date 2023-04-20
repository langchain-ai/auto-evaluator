// original source: https://github.com/niklasvh/base64-arraybuffer/blob/master/src/index.ts
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for(let i = 0; i < chars.length; i++){
    lookup[chars.charCodeAt(i)] = i;
}
export const encode = (arraybuffer)=>{
    let bytes = new Uint8Array(arraybuffer), i1, len = bytes.length, base64 = '';
    for(i1 = 0; i1 < len; i1 += 3){
        base64 += chars[bytes[i1] >> 2];
        base64 += chars[(bytes[i1] & 3) << 4 | bytes[i1 + 1] >> 4];
        base64 += chars[(bytes[i1 + 1] & 15) << 2 | bytes[i1 + 2] >> 6];
        base64 += chars[bytes[i1 + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
export const decode = (base64)=>{
    let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for(i2 = 0; i2 < len; i2 += 4){
        encoded1 = lookup[base64.charCodeAt(i2)];
        encoded2 = lookup[base64.charCodeAt(i2 + 1)];
        encoded3 = lookup[base64.charCodeAt(i2 + 2)];
        encoded4 = lookup[base64.charCodeAt(i2 + 3)];
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
};

//# sourceMappingURL=base64-arraybuffer.js.map