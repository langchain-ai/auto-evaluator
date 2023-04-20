/// <reference types="node" />
import type { IncomingHttpHeaders } from 'http';
export declare type ReadonlyHeaders = Omit<Headers, 'append' | 'delete' | 'set'>;
export declare class HeadersAdapter extends Headers {
    private readonly headers;
    constructor(headers: IncomingHttpHeaders);
    /**
     * Seals a Headers instance to prevent modification by throwing an error when
     * any mutating method is called.
     */
    static seal(headers: Headers): ReadonlyHeaders;
    /**
     * Merges a header value into a string. This stores multiple values as an
     * array, so we need to merge them into a string.
     *
     * @param value a header value
     * @returns a merged header value (a string)
     */
    private merge;
    /**
     * Creates a Headers instance from a plain object or a Headers instance.
     *
     * @param headers a plain object or a Headers instance
     * @returns a headers instance
     */
    static from(headers: IncomingHttpHeaders | Headers): Headers;
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, name: string, parent: Headers) => void, thisArg?: any): void;
    entries(): IterableIterator<[string, string]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
}
