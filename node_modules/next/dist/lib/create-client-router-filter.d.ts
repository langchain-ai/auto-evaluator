import { BloomFilter } from '../shared/lib/bloom-filter';
import { Redirect } from './load-custom-routes';
export declare function createClientRouterFilter(paths: string[], redirects: Redirect[]): {
    staticFilter: ReturnType<BloomFilter['export']>;
    dynamicFilter: ReturnType<BloomFilter['export']>;
};
