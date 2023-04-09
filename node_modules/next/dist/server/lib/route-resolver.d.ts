import type { IncomingMessage, ServerResponse } from 'http';
import type { NextConfig } from '../config';
declare type MiddlewareConfig = {
    matcher: string[];
    files: string[];
};
export declare function makeResolver(dir: string, nextConfig: NextConfig, middleware: MiddlewareConfig): Promise<(_req: IncomingMessage, _res: ServerResponse) => Promise<void>>;
export {};
