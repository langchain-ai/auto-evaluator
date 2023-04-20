import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input';
export type InputBaseStylesNames = InputStylesNames | InputWrapperStylesNames;
export interface InputBaseProps extends DefaultProps<InputBaseStylesNames>, InputSharedProps, InputWrapperBaseProps {
    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>;
    __staticSelector?: string;
}
export declare const _InputBase: React.ForwardRefExoticComponent<InputBaseProps & React.RefAttributes<HTMLInputElement>>;
export declare const InputBase: (<C = "input">(props: import("@mantine/utils").PolymorphicComponentProps<C, InputBaseProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(InputBaseProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof InputBaseProps> & {
    ref?: any;
}) | (InputBaseProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=InputBase.d.ts.map