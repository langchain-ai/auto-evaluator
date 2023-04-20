import React from 'react';
import { DefaultProps, MantineNumberSize, MantineSize, Selectors, Variants } from '@mantine/styles';
import { InputWrapper } from './InputWrapper/InputWrapper';
import { InputDescription } from './InputDescription/InputDescription';
import { InputLabel } from './InputLabel/InputLabel';
import { InputError } from './InputError/InputError';
import { InputPlaceholder } from './InputPlaceholder/InputPlaceholder';
import useStyles from './Input.styles';
export type InputStylesNames = Selectors<typeof useStyles>;
export interface InputSharedProps {
    /** Adds icon on the left side of input */
    icon?: React.ReactNode;
    /** Width of icon section */
    iconWidth?: React.CSSProperties['width'];
    /** Right section of input, similar to icon but on the right */
    rightSection?: React.ReactNode;
    /** Width of right section, is used to calculate input padding-right */
    rightSectionWidth?: React.CSSProperties['width'];
    /** Props spread to rightSection div element */
    rightSectionProps?: Record<string, any>;
    /** Properties spread to root element */
    wrapperProps?: Record<string, any>;
    /** Sets required on input element */
    required?: boolean;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Defines input appearance, defaults to default in light color scheme and filled in dark */
    variant?: Variants<'default' | 'filled' | 'unstyled'>;
    /** Disabled input state */
    disabled?: boolean;
    /** Input size */
    size?: MantineSize;
}
export interface InputProps extends InputSharedProps, DefaultProps<InputStylesNames> {
    /** Static css selector base */
    __staticSelector?: string;
    /** Determines whether input has error styles */
    error?: React.ReactNode;
    /** Will input have multiple lines? */
    multiline?: boolean;
    /** Determines whether cursor on input should be pointer */
    pointer?: boolean;
}
export declare const _Input: any;
export declare const Input: (<C = "input">(props: import("@mantine/utils").PolymorphicComponentProps<C, InputProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(InputProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof InputProps> & {
    ref?: any;
}) | (InputProps & {
    component: React.ElementType<any>;
})>, never> & {
    Wrapper: typeof InputWrapper;
    Label: typeof InputLabel;
    Description: typeof InputDescription;
    Error: typeof InputError;
    Placeholder: typeof InputPlaceholder;
};
//# sourceMappingURL=Input.d.ts.map