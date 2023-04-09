/// <reference types="node" />
import type { AsyncLocalStorage } from 'async_hooks';
import { PreviewData } from '../../../types';
import type { ReadonlyHeaders, ReadonlyRequestCookies } from '../../server/app-render';
export interface RequestStore {
    readonly headers: ReadonlyHeaders;
    readonly cookies: ReadonlyRequestCookies;
    readonly previewData: PreviewData;
}
export declare type RequestAsyncStorage = AsyncLocalStorage<RequestStore>;
export declare const requestAsyncStorage: RequestAsyncStorage;
