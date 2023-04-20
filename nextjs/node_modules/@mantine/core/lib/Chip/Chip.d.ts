import React from 'react';
import { DefaultProps, MantineNumberSize, MantineColor, Selectors, Variants } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { ChipGroup } from './ChipGroup/ChipGroup';
import useStyles, { ChipStylesParams } from './Chip.styles';
export type ChipStylesNames = Selectors<typeof useStyles>;
export interface ChipProps extends DefaultProps<ChipStylesNames, ChipStylesParams>, Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'onChange'> {
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** Predefined chip size */
    size?: MantineNumberSize;
    /** Chip input type */
    type?: 'radio' | 'checkbox';
    /** Controls chip appearance, defaults to filled with dark theme and to outline in light theme */
    variant?: Variants<'outline' | 'filled' | 'light'>;
    /** Chip label */
    children: React.ReactNode;
    /** Checked state for controlled component */
    checked?: boolean;
    /** Default value for uncontrolled component */
    defaultChecked?: boolean;
    /** Calls when checked state changes */
    onChange?(checked: boolean): void;
    /** Active color from theme, defaults to theme.primaryColor */
    color?: MantineColor;
    /** Static id to bind input with label */
    id?: string;
    /** Props spread to wrapper element */
    wrapperProps?: Record<string, any>;
}
type ChipComponent = ForwardRefWithStaticComponents<ChipProps, {
    Group: typeof ChipGroup;
}>;
export declare const Chip: ChipComponent;
export {};
//# sourceMappingURL=Chip.d.ts.map