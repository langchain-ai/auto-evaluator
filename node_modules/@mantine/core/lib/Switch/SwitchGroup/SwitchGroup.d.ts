import React from 'react';
import { DefaultProps, MantineSize } from '@mantine/styles';
import { InputWrapperBaseProps, InputWrapperStylesNames } from '../../Input';
export type SwitchGroupStylesNames = InputWrapperStylesNames;
export interface SwitchGroupProps extends DefaultProps<SwitchGroupStylesNames>, InputWrapperBaseProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
    /** <Checkbox /> components only */
    children: React.ReactNode;
    /** Value of currently selected checkbox */
    value?: string[];
    /** Initial value for uncontrolled component */
    defaultValue?: string[];
    /** Called when value changes */
    onChange?(value: string[]): void;
    /** Predefined label fontSize, checkbox width, height and border-radius */
    size?: MantineSize;
    /** Props spread to InputWrapper */
    wrapperProps?: Record<string, any>;
}
export declare const SwitchGroup: React.ForwardRefExoticComponent<SwitchGroupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwitchGroup.d.ts.map