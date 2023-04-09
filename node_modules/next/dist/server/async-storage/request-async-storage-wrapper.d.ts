/// <reference types="node" />
/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import type { AsyncLocalStorage } from 'async_hooks';
import type { RequestStore } from '../../client/components/request-async-storage';
import { type RenderOpts } from '../app-render';
import { AsyncStorageWrapper } from './async-storage-wrapper';
import type { BaseNextRequest, BaseNextResponse } from '../base-http';
export declare type RequestContext = {
    req: IncomingMessage | BaseNextRequest;
    res: ServerResponse | BaseNextResponse;
    renderOpts?: RenderOpts;
};
export declare class RequestAsyncStorageWrapper implements AsyncStorageWrapper<RequestStore, RequestContext> {
    /**
     * Tries to get the preview data on the request for the given route. This
     * isn't enabled in the edge runtime yet.
     */
    private static readonly tryGetPreviewData;
    /**
     * Wrap the callback with the given store so it can access the underlying
     * store using hooks.
     *
     * @param storage underlying storage object returned by the module
     * @param context context to seed the store
     * @param callback function to call within the scope of the context
     * @returns the result returned by the callback
     */
    wrap<Result>(storage: AsyncLocalStorage<RequestStore>, context: RequestContext, callback: (store: RequestStore) => Result): Result;
    /**
     * @deprecated instance method should be used in favor of the static method
     */
    static wrap<Result>(storage: AsyncLocalStorage<RequestStore>, { req, res, renderOpts }: RequestContext, callback: (store: RequestStore) => Result): Result;
}
