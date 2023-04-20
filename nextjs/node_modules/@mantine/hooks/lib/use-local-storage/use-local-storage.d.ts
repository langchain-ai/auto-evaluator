import { IStorageProperties } from './create-storage';
export declare function useLocalStorage<T = string>(props: IStorageProperties<T>): readonly [T, (val: T | ((prevState: T) => T)) => void, () => void];
//# sourceMappingURL=use-local-storage.d.ts.map