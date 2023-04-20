import React from 'react';
interface ChipGroupContextValue {
    isChipSelected(value: string): boolean;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    multiple: boolean;
}
export declare const ChipGroupProvider: React.Provider<ChipGroupContextValue>;
export declare const useChipGroup: () => ChipGroupContextValue;
export {};
//# sourceMappingURL=ChipGroup.context.d.ts.map