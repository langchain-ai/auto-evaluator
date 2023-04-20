interface UseUncontrolledInput<T> {
    /** Value for controlled state */
    value?: T;
    /** Initial value for uncontrolled state */
    defaultValue?: T;
    /** Final value for uncontrolled state when value and defaultValue are not provided */
    finalValue?: T;
    /** Controlled state onChange handler */
    onChange?(value: T): void;
}
export declare function useUncontrolled<T>({ value, defaultValue, finalValue, onChange, }: UseUncontrolledInput<T>): [T, (value: T) => void, boolean];
export {};
//# sourceMappingURL=use-uncontrolled.d.ts.map