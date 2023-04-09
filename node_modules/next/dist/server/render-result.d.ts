/// <reference types="node" />
/// <reference types="node" />
import type { ServerResponse } from 'http';
import { Writable } from 'stream';
declare type ContentTypeOption = string | undefined;
export declare type RenderResultMetadata = {
    pageData?: any;
    revalidate?: any;
    staticBailoutInfo?: any;
    devOnlyCacheBusterQueryString?: string;
    isNotFound?: boolean;
    isRedirect?: boolean;
};
export default class RenderResult {
    private _result;
    private _contentType;
    private _metadata;
    constructor(response: string | ReadableStream<Uint8Array> | null, { contentType, ...metadata }?: {
        contentType?: ContentTypeOption;
    } & RenderResultMetadata);
    metadata(): RenderResultMetadata;
    isNull(): boolean;
    contentType(): ContentTypeOption;
    toUnchunkedString(): string;
    pipe(res: ServerResponse | Writable): Promise<void>;
    isDynamic(): boolean;
    static fromStatic(value: string): RenderResult;
    static empty: RenderResult;
}
export {};
