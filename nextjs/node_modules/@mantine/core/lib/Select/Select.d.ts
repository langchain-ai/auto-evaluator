import React from 'react';
import { DefaultProps, MantineSize, MantineShadow } from '@mantine/styles';
import { PortalProps } from '../Portal';
import { TransitionOverride } from '../Transition';
import { SelectItem, BaseSelectStylesNames, BaseSelectProps } from './types';
export interface SelectSharedProps<Item, Value> {
    /** Select data used to render items in dropdown */
    data: ReadonlyArray<string | Item>;
    /** Controlled input value */
    value?: Value;
    /** Uncontrolled input defaultValue */
    defaultValue?: Value;
    /** Controlled input onChange handler */
    onChange?(value: Value): void;
    /** Function based on which items in dropdown are filtered */
    filter?(value: string, item: Item): boolean;
    /** Input size */
    size?: MantineSize;
    /** Props added to Transition component that used to animate dropdown presence, use to configure duration and animation type, { duration: 0, transition: 'fade' } by default */
    transitionProps?: TransitionOverride;
    /** Dropdown shadow from theme or any value to set box-shadow */
    shadow?: MantineShadow;
    /** Initial dropdown opened state */
    initiallyOpened?: boolean;
    /** Change item renderer */
    itemComponent?: React.FC<any>;
    /** Called when dropdown is opened */
    onDropdownOpen?(): void;
    /** Called when dropdown is closed */
    onDropdownClose?(): void;
    /** Whether to render the dropdown in a Portal */
    withinPortal?: boolean;
    /** Props to pass down to the portal when withinPortal is true */
    portalProps?: PortalProps;
    /** Limit amount of items displayed at a time for searchable select */
    limit?: number;
    /** Nothing found label */
    nothingFound?: React.ReactNode;
    /** Dropdown z-index */
    zIndex?: React.CSSProperties['zIndex'];
    /** Dropdown positioning behavior */
    dropdownPosition?: 'bottom' | 'top' | 'flip';
    /** Whether to switch item order and keyboard navigation on dropdown position flip */
    switchDirectionOnFlip?: boolean;
    /** useEffect dependencies to force update dropdown position */
    positionDependencies?: any[];
}
export interface SelectProps extends DefaultProps<BaseSelectStylesNames>, BaseSelectProps, SelectSharedProps<SelectItem, string | null> {
    /** Maximum dropdown height */
    maxDropdownHeight?: number;
    /** Set to true to enable search */
    searchable?: boolean;
    /** Allow to clear item */
    clearable?: boolean;
    /** Called each time search value changes */
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
    /** Change dropdown component, can be used to add native scrollbars */
    dropdownComponent?: any;
    /** Select highlighted item on blur */
    selectOnBlur?: boolean;
    /** Allow deselecting items on click */
    allowDeselect?: boolean;
    /** Should data be filtered when search value exactly matches selected item */
    filterDataOnExactSearchMatch?: boolean;
    /** Props added to clear button */
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>;
}
export declare function defaultFilter(value: string, item: SelectItem): boolean;
export declare function defaultShouldCreate(query: string, data: SelectItem[]): boolean;
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Select.d.ts.map