export declare function useValidatedState<T>(initialValue: T, validation: (value: T) => boolean, initialValidationState?: boolean): readonly [{
    readonly value: T;
    readonly lastValidValue: T;
    readonly valid: boolean;
}, (val: T) => void];
//# sourceMappingURL=use-validated-state.d.ts.map