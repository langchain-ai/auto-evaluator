import React from 'react';
import { DefaultProps, MantineSize } from '@mantine/styles';
import { InputWrapperBaseProps, InputWrapperStylesNames } from '../../Input';
export type RadioGroupStylesNames = InputWrapperStylesNames;
export interface RadioGroupProps extends DefaultProps<RadioGroupStylesNames>, InputWrapperBaseProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
    /** <Radio /> components */
    children: React.ReactNode;
    /** Value of currently selected radio */
    value?: string;
    /** Initial value for uncontrolled component */
    defaultValue?: string;
    /** Called when value changes */
    onChange?(value: string): void;
    /** Predefined label fontSize, radio width, height and border-radius */
    size?: MantineSize;
    /** Props spread to root element */
    wrapperProps?: Record<string, any>;
    /** Name attribute of radio inputs */
    name?: string;
}
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RadioGroup.d.ts.map