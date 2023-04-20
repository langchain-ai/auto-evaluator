import type { BaseNextRequest } from '../../../base-http';
import type { NodeNextRequest } from '../../../base-http/node';
import type { WebNextRequest } from '../../../base-http/web';
import { NextRequest } from '../request';
export declare class NextRequestAdapter {
    static fromBaseNextRequest(request: BaseNextRequest): NextRequest;
    static fromNodeNextRequest(request: NodeNextRequest): NextRequest;
    static fromWebNextRequest(request: WebNextRequest): NextRequest;
}
