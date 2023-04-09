import { NextConfigComplete, NextConfig } from './config-shared';
export { DomainLocale, NextConfig, normalizeConfig } from './config-shared';
export declare function setHttpClientAndAgentOptions(config: {
    httpAgentOptions?: NextConfig['httpAgentOptions'];
    experimental?: {
        enableUndici?: boolean;
    };
}, silent?: boolean): void;
export declare function warnOptionHasBeenMovedOutOfExperimental(config: NextConfig, oldKey: string, newKey: string, configFileName: string, silent?: boolean): NextConfig;
export default function loadConfig(phase: string, dir: string, customConfig?: object | null, rawConfig?: boolean, silent?: boolean): Promise<NextConfigComplete>;
