export declare function useCounter(initialValue?: number, options?: Partial<{
    min: number;
    max: number;
}>): readonly [number, {
    readonly increment: () => void;
    readonly decrement: () => void;
    readonly set: (value: number) => void;
    readonly reset: () => void;
}];
//# sourceMappingURL=use-counter.d.ts.map