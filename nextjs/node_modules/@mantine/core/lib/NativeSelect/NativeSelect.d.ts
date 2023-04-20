import React from 'react';
import { DefaultProps, MantineSize } from '@mantine/styles';
import { InputWrapperBaseProps, InputWrapperStylesNames, InputSharedProps, InputStylesNames } from '../Input';
import { SelectItem } from '../Select/types';
export type NativeSelectStylesNames = InputStylesNames | InputWrapperStylesNames;
export interface NativeSelectProps extends DefaultProps<NativeSelectStylesNames>, InputWrapperBaseProps, InputSharedProps, Omit<React.ComponentPropsWithoutRef<'select'>, 'size'> {
    /** id is used to bind input and label, if not passed unique id will be generated for each input */
    id?: string;
    /** Data used to render options */
    data: (string | SelectItem)[];
    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>;
    /** Input size */
    size?: MantineSize;
}
export declare const NativeSelect: React.ForwardRefExoticComponent<NativeSelectProps & React.RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=NativeSelect.d.ts.map