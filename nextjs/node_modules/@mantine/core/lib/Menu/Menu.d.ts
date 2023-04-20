import React from 'react';
import { ClassNames, Styles } from '@mantine/styles';
import { PopoverBaseProps, PopoverStylesNames } from '../Popover';
import { MenuDividerStylesNames } from './MenuDivider/MenuDivider';
import { MenuDropdown } from './MenuDropdown/MenuDropdown';
import { MenuItemStylesNames } from './MenuItem/MenuItem';
import { MenuLabelStylesName } from './MenuLabel/MenuLabel';
import { MenuTriggerEvent } from './Menu.types';
export type MenuStylesNames = MenuItemStylesNames | MenuLabelStylesName | MenuDividerStylesNames | PopoverStylesNames;
export interface MenuProps extends PopoverBaseProps {
    variant?: string;
    /** Menu content */
    children?: React.ReactNode;
    /** Controlled menu opened state */
    opened?: boolean;
    /** Uncontrolled menu initial opened state */
    defaultOpened?: boolean;
    /** Called when menu opened state changes */
    onChange?(opened: boolean): void;
    /** Called when Menu is opened */
    onOpen?(): void;
    /** Called when Menu is closed */
    onClose?(): void;
    /** Determines whether Menu should be closed when item is clicked */
    closeOnItemClick?: boolean;
    /** Determines whether arrow key presses should loop though items (first to last and last to first) */
    loop?: boolean;
    /** Determines whether dropdown should be closed when Escape key is pressed, defaults to true */
    closeOnEscape?: boolean;
    /** Event which should open menu */
    trigger?: MenuTriggerEvent;
    /** Open delay in ms, applicable only to trigger="hover" variant */
    openDelay?: number;
    /** Close delay in ms, applicable only to trigger="hover" variant */
    closeDelay?: number;
    /** Determines whether dropdown should be closed on outside clicks, default to true */
    closeOnClickOutside?: boolean;
    /** Events that trigger outside clicks */
    clickOutsideEvents?: string[];
    /** id base to create accessibility connections */
    id?: string;
    unstyled?: boolean;
    classNames?: ClassNames<MenuStylesNames>;
    styles?: Styles<MenuStylesNames>;
}
export declare function Menu(props: MenuProps): JSX.Element;
export declare namespace Menu {
    var displayName: string;
    var Item: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, import("./MenuItem/MenuItem").MenuItemProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(import("./MenuItem/MenuItem").MenuItemProps & {
        component?: any;
    } & Omit<Pick<any, string | number | symbol>, "component" | keyof import("./MenuItem/MenuItem").MenuItemProps> & {
        ref?: any;
    }) | (import("./MenuItem/MenuItem").MenuItemProps & {
        component: React.ElementType<any>;
    })>, never> & Record<string, never>;
    var Label: React.ForwardRefExoticComponent<import("./MenuLabel/MenuLabel").MenuLabelProps & React.RefAttributes<HTMLDivElement>>;
    var Dropdown: typeof MenuDropdown;
    var Target: React.ForwardRefExoticComponent<import("./MenuTarget/MenuTarget").MenuTargetProps & React.RefAttributes<HTMLElement>>;
    var Divider: React.ForwardRefExoticComponent<import("./MenuDivider/MenuDivider").MenuDividerProps & React.RefAttributes<HTMLDivElement>>;
}
//# sourceMappingURL=Menu.d.ts.map