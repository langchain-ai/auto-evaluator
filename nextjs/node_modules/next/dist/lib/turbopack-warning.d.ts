import { NextConfig } from '../server/config-shared';
export declare function validateTurboNextConfig({ dir, isCustomTurbopack, }: {
    allowRetry?: boolean;
    isCustomTurbopack?: boolean;
    dir: string;
    port: number;
    hostname?: string;
}): Promise<NextConfig>;
