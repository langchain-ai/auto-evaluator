import React from 'react';
import { DefaultProps, MantineSize } from '@mantine/styles';
import { InputWrapperBaseProps, InputWrapperStylesNames } from '../../Input';
export type CheckboxGroupStylesNames = InputWrapperStylesNames;
export interface CheckboxGroupProps extends DefaultProps<CheckboxGroupStylesNames>, InputWrapperBaseProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
    variant?: string;
    /** <Checkbox /> components */
    children: React.ReactNode;
    /** Value of selected checkboxes, use for controlled components */
    value?: string[];
    /** Initial selected checkboxes, use for uncontrolled components, overridden by value prop */
    defaultValue?: string[];
    /** Called when value changes */
    onChange?(value: string[]): void;
    /** Controls label font-size and checkbox width and height */
    size?: MantineSize;
    /** Props added to Input.Wrapper component (root element) */
    wrapperProps?: Record<string, any>;
}
export declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CheckboxGroup.d.ts.map