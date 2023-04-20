import React from 'react';
import { DefaultProps, MantineColor, Selectors, MantineNumberSize } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { InlineInputStylesNames } from '../InlineInput';
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup';
import useStyles, { CheckboxStylesParams } from './Checkbox.styles';
export type CheckboxStylesNames = Selectors<typeof useStyles> | InlineInputStylesNames;
export interface CheckboxProps extends DefaultProps<CheckboxStylesNames, CheckboxStylesParams>, Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'size'> {
    variant?: string;
    /** Key of theme.colors */
    color?: MantineColor;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Controls label font-size and checkbox width and height */
    size?: MantineNumberSize;
    /** Checkbox label */
    label?: React.ReactNode;
    /** Indeterminate state of checkbox, if set, `checked` prop is ignored */
    indeterminate?: boolean;
    /** Props added to the root element */
    wrapperProps?: Record<string, any>;
    /** Transition duration in ms */
    transitionDuration?: number;
    /** Icon rendered when checkbox has checked or indeterminate state */
    icon?: React.FC<{
        indeterminate: boolean;
        className: string;
    }>;
    /** Position of the label */
    labelPosition?: 'left' | 'right';
    /** Description, displayed after the label */
    description?: React.ReactNode;
    /** Error message displayed after the input */
    error?: React.ReactNode;
}
type CheckboxComponent = ForwardRefWithStaticComponents<CheckboxProps, {
    Group: typeof CheckboxGroup;
}>;
export declare const Checkbox: CheckboxComponent;
export {};
//# sourceMappingURL=Checkbox.d.ts.map