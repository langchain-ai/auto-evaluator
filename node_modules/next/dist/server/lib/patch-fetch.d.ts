import type { StaticGenerationAsyncStorage } from '../../client/components/static-generation-async-storage';
import type * as ServerHooks from '../../client/components/hooks-server-context';
export declare function patchFetch({ serverHooks, staticGenerationAsyncStorage, }: {
    serverHooks: typeof ServerHooks;
    staticGenerationAsyncStorage: StaticGenerationAsyncStorage;
}): void;
