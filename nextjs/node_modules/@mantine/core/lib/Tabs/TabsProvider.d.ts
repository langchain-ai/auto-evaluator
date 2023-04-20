import React from 'react';
import { ClassNames, MantineColor, MantineNumberSize, Styles } from '@mantine/styles';
import { TabsValue, TabsOrientation, TabsVariant, TabsPlacement, TabsStylesParams } from './Tabs.types';
import type { TabsStylesNames } from './Tabs';
export interface TabsProviderProps {
    /** Default value for uncontrolled component */
    defaultValue?: TabsValue;
    /** Value for controlled component */
    value?: TabsValue;
    /** Callback for controlled component */
    onTabChange?(value: TabsValue): void;
    /** Tabs orientation, vertical or horizontal */
    orientation?: TabsOrientation;
    /** Tabs.List placement relative to Tabs.Panel, applicable only for orientation="vertical", left by default */
    placement?: TabsPlacement;
    /** Base id, used to generate ids that connect labels with controls, by default generated randomly */
    id?: string;
    /** Determines whether arrow key presses should loop though items (first to last and last to first) */
    loop?: boolean;
    /** Determines whether tab should be activated with arrow key press, defaults to true */
    activateTabWithKeyboard?: boolean;
    /** Determines whether tab can be deactivated, defaults to false */
    allowTabDeactivation?: boolean;
    /** Tabs content */
    children: React.ReactNode;
    /** Controls component visuals */
    variant?: TabsVariant;
    /** Key of theme.colors */
    color?: MantineColor;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Determines whether tabs should have inverted styles */
    inverted?: boolean;
    /** If set to false, Tabs.Panel content will not stay mounted when tab is not active */
    keepMounted?: boolean;
}
interface _TabsProviderProps extends TabsProviderProps {
    classNames?: ClassNames<TabsStylesNames>;
    styles?: Styles<TabsStylesNames, TabsStylesParams>;
    unstyled?: boolean;
}
export declare function TabsProvider({ defaultValue, value, onTabChange, orientation, children, loop, id, activateTabWithKeyboard, allowTabDeactivation, variant, color, radius, inverted, placement, keepMounted, classNames, styles, unstyled, }: _TabsProviderProps): JSX.Element;
export declare namespace TabsProvider {
    var displayName: string;
}
export {};
//# sourceMappingURL=TabsProvider.d.ts.map