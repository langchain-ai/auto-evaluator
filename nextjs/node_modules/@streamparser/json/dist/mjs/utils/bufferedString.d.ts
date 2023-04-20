export interface StringBuilder {
    byteLength: number;
    appendChar: (char: number) => void;
    appendBuf: (buf: Uint8Array, start?: number, end?: number) => void;
    reset: () => void;
    toString: () => string;
}
export declare class NonBufferedString implements StringBuilder {
    private decoder;
    private string;
    byteLength: number;
    appendChar(char: number): void;
    appendBuf(buf: Uint8Array, start?: number, end?: number): void;
    reset(): void;
    toString(): string;
}
export declare class BufferedString implements StringBuilder {
    private decoder;
    private buffer;
    private bufferOffset;
    private string;
    byteLength: number;
    constructor(bufferSize: number);
    appendChar(char: number): void;
    appendBuf(buf: Uint8Array, start?: number, end?: number): void;
    private flushStringBuffer;
    reset(): void;
    toString(): string;
}
