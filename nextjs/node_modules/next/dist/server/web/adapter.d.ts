import type { NextMiddleware, RequestData, FetchEventResult } from './types';
export declare type AdapterOptions = {
    handler: NextMiddleware;
    page: string;
    request: RequestData;
};
export declare function adapter(params: AdapterOptions): Promise<FetchEventResult>;
export declare function enhanceGlobals(): void;
