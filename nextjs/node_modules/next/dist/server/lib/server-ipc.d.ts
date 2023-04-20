/// <reference types="node" />
import type NextServer from '../next-server';
import { IncomingMessage } from 'http';
export declare function createIpcServer(server: InstanceType<typeof NextServer>): Promise<{
    ipcPort: number;
    ipcServer: import('http').Server;
}>;
export declare const createWorker: (serverPort: number, ipcPort: number, isNodeDebugging: boolean | 'brk' | undefined, type: string) => any;
export declare const filterReqHeaders: (headers: Record<string, undefined | string | string[]>) => Record<string, string | string[] | undefined>;
export declare const invokeRequest: (targetUrl: string, requestInit: {
    headers: IncomingMessage['headers'];
    method: IncomingMessage['method'];
}, readableBody?: import('stream').Readable) => Promise<IncomingMessage>;
