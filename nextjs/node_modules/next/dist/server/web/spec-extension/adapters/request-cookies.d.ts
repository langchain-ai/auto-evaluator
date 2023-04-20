import type { RequestCookies } from '../cookies';
export declare type ReadonlyRequestCookies = Omit<RequestCookies, 'clear' | 'delete' | 'set'>;
export declare class RequestCookiesAdapter {
    static seal(cookies: RequestCookies): ReadonlyRequestCookies;
}
