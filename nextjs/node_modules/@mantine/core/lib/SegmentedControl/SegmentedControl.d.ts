import React from 'react';
import { DefaultProps, MantineNumberSize, MantineSize, MantineColor, Selectors } from '@mantine/styles';
import useStyles, { SegmentedControlStylesParams } from './SegmentedControl.styles';
export interface SegmentedControlItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
export type SegmentedControlStylesNames = Selectors<typeof useStyles>;
export interface SegmentedControlProps extends DefaultProps<SegmentedControlStylesNames, SegmentedControlStylesParams>, Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
    variant?: string;
    /** Data based on which controls are rendered */
    data: string[] | SegmentedControlItem[];
    /** Current selected value */
    value?: string;
    /** Disabled input state */
    disabled?: boolean;
    /** Called when value changes */
    onChange?(value: string): void;
    /** Name of the radio group, default to random id */
    name?: string;
    /** True if component should have 100% width */
    fullWidth?: boolean;
    /** Active control color from theme.colors, defaults to white in light color scheme and theme.colors.dark[9] in dark */
    color?: MantineColor;
    /** Controls font-size, paddings and height */
    size?: MantineSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Transition duration in ms, set to 0 to turn off transitions */
    transitionDuration?: number;
    /** Transition timing function for all transitions, defaults to theme.transitionTimingFunction */
    transitionTimingFunction?: string;
    /** Default value for uncontrolled component */
    defaultValue?: string;
    /** Display Vertically */
    orientation?: 'vertical' | 'horizontal';
    /** Determines whether the user can change value */
    readOnly?: boolean;
}
export declare const SegmentedControl: React.ForwardRefExoticComponent<SegmentedControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SegmentedControl.d.ts.map