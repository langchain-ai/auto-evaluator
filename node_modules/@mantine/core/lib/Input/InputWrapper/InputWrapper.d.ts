import React from 'react';
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import { InputLabelStylesNames } from '../InputLabel/InputLabel';
import { InputErrorStylesNames } from '../InputError/InputError';
import { InputDescriptionStylesNames } from '../InputDescription/InputDescription';
import useStyles from './InputWrapper.styles';
export type InputWrapperStylesNames = Selectors<typeof useStyles> | InputLabelStylesNames | InputErrorStylesNames | InputDescriptionStylesNames;
export interface InputWrapperBaseProps {
    /** Input label, displayed before input */
    label?: React.ReactNode;
    /** Input description, displayed after label */
    description?: React.ReactNode;
    /** Displays error message after input */
    error?: React.ReactNode;
    /** Adds required attribute to the input and red asterisk on the right side of label */
    required?: boolean;
    /** Determines whether required asterisk should be rendered, overrides required prop, does not add required attribute to the input */
    withAsterisk?: boolean;
    /** Props spread to label element */
    labelProps?: Record<string, any>;
    /** Props spread to description element */
    descriptionProps?: Record<string, any>;
    /** Props spread to error element */
    errorProps?: Record<string, any>;
    /** Input container component, defaults to React.Fragment */
    inputContainer?(children: React.ReactNode): React.ReactNode;
    /** Controls order of the Input.Wrapper elements */
    inputWrapperOrder?: ('label' | 'input' | 'description' | 'error')[];
}
export interface InputWrapperProps extends DefaultProps<InputWrapperStylesNames>, InputWrapperBaseProps, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Input that should be wrapped */
    children: React.ReactNode;
    /** htmlFor label prop */
    id?: string;
    /** Render label as label with htmlFor or as div */
    labelElement?: 'label' | 'div';
    /** Controls all elements font-size */
    size?: MantineSize;
    /** Static css selector base */
    __staticSelector?: string;
}
export declare const InputWrapper: React.ForwardRefExoticComponent<InputWrapperProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InputWrapper.d.ts.map