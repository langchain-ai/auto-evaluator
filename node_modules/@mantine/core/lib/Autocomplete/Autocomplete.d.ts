import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { InputWrapperBaseProps, InputSharedProps } from '../Input';
import { SelectStylesNames } from '../Select';
import { SelectSharedProps } from '../Select/Select';
export type AutocompleteStylesNames = SelectStylesNames;
export interface AutocompleteItem {
    value: string;
    [key: string]: any;
}
export interface AutocompleteProps extends DefaultProps<AutocompleteStylesNames>, InputSharedProps, InputWrapperBaseProps, SelectSharedProps<AutocompleteItem, string>, Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
    /** Maximum dropdown height */
    maxDropdownHeight?: number | string;
    /** Change dropdown component, can be used to add native scrollbars */
    dropdownComponent?: any;
    /** Called when item from dropdown was selected */
    onItemSubmit?(item: AutocompleteItem): void;
    /** Hovers the first result when input changes */
    hoverOnSearchChange?: boolean;
}
export declare function defaultFilter(value: string, item: AutocompleteItem): boolean;
export declare const Autocomplete: React.ForwardRefExoticComponent<AutocompleteProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Autocomplete.d.ts.map