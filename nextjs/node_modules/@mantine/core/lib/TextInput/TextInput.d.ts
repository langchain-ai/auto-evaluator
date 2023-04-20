import React from 'react';
import { DefaultProps, MantineSize } from '@mantine/styles';
import { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input';
export type TextInputStylesNames = InputStylesNames | InputWrapperStylesNames;
export interface TextInputProps extends DefaultProps<TextInputStylesNames>, InputSharedProps, InputWrapperBaseProps, Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
    /** Input element type */
    type?: React.HTMLInputTypeAttribute;
    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>;
    /** Input size */
    size?: MantineSize;
    __staticSelector?: string;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=TextInput.d.ts.map