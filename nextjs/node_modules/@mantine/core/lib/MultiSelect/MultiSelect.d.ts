import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import { DefaultValueStylesNames } from './DefaultValue/DefaultValue';
import { SelectItem, BaseSelectProps, BaseSelectStylesNames } from '../Select/types';
import useStyles from './MultiSelect.styles';
import { SelectSharedProps } from '../Select/Select';
export type MultiSelectStylesNames = DefaultValueStylesNames | Exclude<Selectors<typeof useStyles>, 'searchInputEmpty' | 'searchInputInputHidden' | 'searchInputPointer'> | Exclude<BaseSelectStylesNames, 'selected'>;
export interface MultiSelectProps extends DefaultProps<MultiSelectStylesNames>, BaseSelectProps, Omit<SelectSharedProps<SelectItem, string[]>, 'filter'> {
    /** Component used to render values */
    valueComponent?: React.FC<any>;
    /** Maximum dropdown height */
    maxDropdownHeight?: number | string;
    /** Enable items searching */
    searchable?: boolean;
    /** Function based on which items in dropdown are filtered */
    filter?(value: string, selected: boolean, item: SelectItem): boolean;
    /** Clear search value when item is selected */
    clearSearchOnChange?: boolean;
    /** Allow to clear item */
    clearable?: boolean;
    /** Disable removing selected items from the list */
    disableSelectedItemFiltering?: boolean;
    /** Clear search field value on blur */
    clearSearchOnBlur?: boolean;
    /** Called each time search query changes */
    onSearchChange?(query: string): void;
    /** Controlled search input value */
    searchValue?: string;
    /** Hovers the first result when search query changes */
    hoverOnSearchChange?: boolean;
    /** Allow creatable option  */
    creatable?: boolean;
    /** Function to get create Label */
    getCreateLabel?(query: string): React.ReactNode;
    /** Function to determine if create label should be displayed */
    shouldCreate?(query: string, data: SelectItem[]): boolean;
    /** Called when create option is selected */
    onCreate?(query: string): SelectItem | string | null | undefined;
    /** Change dropdown component, can be used to add custom scrollbars */
    dropdownComponent?: any;
    /** Limit amount of items selected */
    maxSelectedValues?: number;
    /** Select highlighted item on blur */
    selectOnBlur?: boolean;
    /** Props added to clear button */
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>;
}
export declare function defaultFilter(value: string, selected: boolean, item: SelectItem): boolean;
export declare function defaultShouldCreate(query: string, data: SelectItem[]): boolean;
export declare const MultiSelect: React.ForwardRefExoticComponent<MultiSelectProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=MultiSelect.d.ts.map