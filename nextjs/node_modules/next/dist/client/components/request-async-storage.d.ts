/// <reference types="node" />
import type { AsyncLocalStorage } from 'async_hooks';
import type { PreviewData } from '../../../types';
import type { ReadonlyHeaders } from '../../server/web/spec-extension/adapters/headers';
import type { ReadonlyRequestCookies } from '../../server/web/spec-extension/adapters/request-cookies';
export interface RequestStore {
    readonly headers: ReadonlyHeaders;
    readonly cookies: ReadonlyRequestCookies;
    readonly previewData: PreviewData;
}
export declare type RequestAsyncStorage = AsyncLocalStorage<RequestStore>;
export declare const requestAsyncStorage: RequestAsyncStorage;
