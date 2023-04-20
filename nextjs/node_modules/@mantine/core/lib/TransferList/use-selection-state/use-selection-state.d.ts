export type Selection = [string[], string[]];
export declare function useSelectionState(initialSelection?: Selection): readonly [Selection, {
    select: (listIndex: 0 | 1, value: string) => void;
    deselect: (listIndex: 0 | 1, values: string[]) => void;
    deselectAll: (listIndex: 0 | 1) => void;
}];
//# sourceMappingURL=use-selection-state.d.ts.map