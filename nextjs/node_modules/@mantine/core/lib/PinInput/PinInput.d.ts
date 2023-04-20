import React from 'react';
import { DefaultProps, MantineNumberSize, MantineSize, Selectors } from '@mantine/styles';
import { InputSharedProps, InputStylesNames } from '../Input';
import useStyles from './PinInput.styles';
export type PinInputStylesNames = Selectors<typeof useStyles> | InputStylesNames;
export interface PinInputProps extends DefaultProps<PinInputStylesNames>, InputSharedProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
    /** Hidden input name attribute */
    name?: string;
    /** Hidden input form attribute */
    form?: string;
    /** Key of theme.spacing or any valid CSS value to set spacing between inputs */
    spacing?: MantineNumberSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Input width and height */
    size?: MantineSize;
    /** If set, first input is focused when component is mounted */
    autoFocus?: boolean;
    /** Value for controlled component */
    value?: string;
    /** Default value for uncontrolled component */
    defaultValue?: string;
    /** Called when value changes */
    onChange?: (value: string) => void;
    /** Called when user enters value to all inputs */
    onComplete?(value: string): void;
    /** Placeholder for every input field */
    placeholder?: string;
    /** Determines whether focus should be moved automatically to the next input once filled */
    manageFocus?: boolean;
    /** Determines whether autocomplete="one-time-code" attribute should be set on all inputs */
    oneTimeCode?: boolean;
    /** The top-level id that is used as a base in all input fields */
    id?: string;
    /** Sets inputs disabled attribute */
    disabled?: boolean;
    /** Adds error styles to all inputs */
    error?: boolean;
    /** The type of allowed values */
    type?: 'alphanumeric' | 'number' | RegExp;
    /** Changes input type to "password" */
    mask?: boolean;
    /** Number of input boxes */
    length?: number;
    /** Determines whether the user can edit input content */
    readOnly?: boolean;
    /** Inputs type attribute, inferred from type prop if not specified */
    inputType?: React.HTMLInputTypeAttribute;
    /** inputmode attr, inferred from type prop if not specified */
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
}
export declare const PinInput: React.ForwardRefExoticComponent<PinInputProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PinInput.d.ts.map