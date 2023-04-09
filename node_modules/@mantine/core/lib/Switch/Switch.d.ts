import React from 'react';
import { DefaultProps, MantineNumberSize, MantineSize, MantineColor, Selectors } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { SwitchGroup } from './SwitchGroup/SwitchGroup';
import { InlineInputStylesNames } from '../InlineInput';
import useStyles, { SwitchStylesParams } from './Switch.styles';
export type SwitchStylesNames = Selectors<typeof useStyles> | InlineInputStylesNames;
export interface SwitchProps extends DefaultProps<SwitchStylesNames, SwitchStylesParams>, Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'size'> {
    variant?: string;
    /** Id is used to bind input and label, if not passed unique id will be generated for each input */
    id?: string;
    /** Switch label */
    label?: React.ReactNode;
    /** Inner label when Switch is in unchecked state */
    offLabel?: React.ReactNode;
    /** Inner label when Switch is in checked state */
    onLabel?: React.ReactNode;
    /** Switch checked state color from theme.colors, defaults to theme.primaryColor */
    color?: MantineColor;
    /** Predefined size value */
    size?: MantineSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** Props spread to wrapper element */
    wrapperProps?: Record<string, any>;
    /** Icon inside the thumb of switch */
    thumbIcon?: React.ReactNode;
    /** Position of label */
    labelPosition?: 'left' | 'right';
    /** description, displayed after label */
    description?: React.ReactNode;
    /** Displays error message after input */
    error?: React.ReactNode;
}
type SwitchComponent = ForwardRefWithStaticComponents<SwitchProps, {
    Group: typeof SwitchGroup;
}>;
export declare const Switch: SwitchComponent;
export {};
//# sourceMappingURL=Switch.d.ts.map