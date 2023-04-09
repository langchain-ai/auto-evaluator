export type StorageType = 'localStorage' | 'sessionStorage';
export interface IStorageProperties<T> {
    /** Storage key */
    key: string;
    /** Default value that will be set if value is not found in storage */
    defaultValue?: T;
    /** If set to true, value will be updated in useEffect after mount */
    getInitialValueInEffect?: boolean;
    /** Function to serialize value into a string to be saved in storage */
    serialize?(value: T): string;
    /** Function to deserialize string value from storage to value */
    deserialize?(value: string): T;
}
export declare function createStorage<T>(type: StorageType, hookName: string): ({ key, defaultValue, getInitialValueInEffect, deserialize, serialize, }: IStorageProperties<T>) => readonly [T, (val: T | ((prevState: T) => T)) => void, () => void];
//# sourceMappingURL=create-storage.d.ts.map