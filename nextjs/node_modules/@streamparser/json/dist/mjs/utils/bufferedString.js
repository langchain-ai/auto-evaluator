export class NonBufferedString {
    constructor() {
        this.decoder = new TextDecoder("utf-8");
        this.string = "";
        this.byteLength = 0;
    }
    appendChar(char) {
        this.string += String.fromCharCode(char);
        this.byteLength += 1;
    }
    appendBuf(buf, start = 0, end = buf.length) {
        this.string += this.decoder.decode(buf.subarray(start, end));
        this.byteLength += end - start;
    }
    reset() {
        this.string = "";
        this.byteLength = 0;
    }
    toString() {
        return this.string;
    }
}
export class BufferedString {
    constructor(bufferSize) {
        this.decoder = new TextDecoder("utf-8");
        this.bufferOffset = 0;
        this.string = "";
        this.byteLength = 0;
        this.buffer = new Uint8Array(bufferSize);
    }
    appendChar(char) {
        if (this.bufferOffset >= this.buffer.length)
            this.flushStringBuffer();
        this.buffer[this.bufferOffset++] = char;
        this.byteLength += 1;
    }
    appendBuf(buf, start = 0, end = buf.length) {
        const size = end - start;
        if (this.bufferOffset + size > this.buffer.length)
            this.flushStringBuffer();
        this.buffer.set(buf.subarray(start, end), this.bufferOffset);
        this.bufferOffset += size;
        this.byteLength += size;
    }
    flushStringBuffer() {
        this.string += this.decoder.decode(this.buffer.subarray(0, this.bufferOffset));
        this.bufferOffset = 0;
    }
    reset() {
        this.string = "";
        this.bufferOffset = 0;
        this.byteLength = 0;
    }
    toString() {
        this.flushStringBuffer();
        return this.string;
    }
}
//# sourceMappingURL=bufferedString.js.map