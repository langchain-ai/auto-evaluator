import { IStorageProperties } from '../use-local-storage/create-storage';
export declare function useSessionStorage<T = string>(props: IStorageProperties<T>): readonly [T, (val: T | ((prevState: T) => T)) => void, () => void];
//# sourceMappingURL=use-session-storage.d.ts.map