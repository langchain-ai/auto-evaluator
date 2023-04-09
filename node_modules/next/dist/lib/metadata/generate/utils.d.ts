declare function resolveArray<T>(value: T): T[];
declare function resolveAsArrayOrUndefined<T extends unknown | readonly unknown[]>(value: T | T[] | undefined | null): undefined | T[];
export { resolveAsArrayOrUndefined, resolveArray };
