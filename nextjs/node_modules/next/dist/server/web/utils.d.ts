/// <reference types="node" />
import type { OutgoingHttpHeaders } from 'http';
export declare function fromNodeHeaders(object: OutgoingHttpHeaders): Headers;
export declare function splitCookiesString(cookiesString: string): string[];
export declare function toNodeHeaders(headers?: Headers): OutgoingHttpHeaders;
/**
 * Validate the correctness of a user-provided URL.
 */
export declare function validateURL(url: string | URL): string;
