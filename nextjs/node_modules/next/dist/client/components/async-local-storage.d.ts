/// <reference types="node" />
import { AsyncLocalStorage } from 'async_hooks';
export declare function createAsyncLocalStorage<Store extends {}>(): AsyncLocalStorage<Store>;
