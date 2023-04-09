import React from 'react';
import { DefaultProps, MantineColor, MantineNumberSize, Selectors, Variants } from '@mantine/styles';
import useStyles, { NavLinkStylesParams } from './NavLink.styles';
export type NavLinkStylesNames = Selectors<typeof useStyles>;
export interface NavLinkProps extends DefaultProps<NavLinkStylesNames, NavLinkStylesParams> {
    /** Main link content */
    label?: React.ReactNode;
    /** Secondary link description */
    description?: React.ReactNode;
    /** Icon displayed on the left side of the label */
    icon?: React.ReactNode;
    /** Section displayed on the right side of the label */
    rightSection?: React.ReactNode;
    /** Determines whether link should have active styles */
    active?: boolean;
    /** Key of theme.colors, active link color */
    color?: MantineColor;
    /** Active link variant */
    variant?: Variants<'filled' | 'light' | 'subtle'>;
    /** If prop is set then label and description will not wrap on the next line */
    noWrap?: boolean;
    /** Child links */
    children?: React.ReactNode;
    /** Controlled nested items collapse state */
    opened?: boolean;
    /** Uncontrolled nested items collapse initial state */
    defaultOpened?: boolean;
    /** Called when open state changes */
    onChange?(opened: boolean): void;
    /** If set to true, right section will not rotate when collapse is opened */
    disableRightSectionRotation?: boolean;
    /** Key of theme.spacing or any valid CSS value to set collapsed links padding-left */
    childrenOffset?: MantineNumberSize;
    /** Adds disabled styles to root element */
    disabled?: boolean;
}
export declare const _NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLButtonElement>>;
export declare const NavLink: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, NavLinkProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(NavLinkProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof NavLinkProps> & {
    ref?: any;
}) | (NavLinkProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=NavLink.d.ts.map