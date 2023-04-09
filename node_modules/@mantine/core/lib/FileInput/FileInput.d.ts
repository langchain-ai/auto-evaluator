import React from 'react';
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import { InputSharedProps, InputStylesNames, InputWrapperBaseProps, InputWrapperStylesNames } from '../Input';
import useStyles from './FileInput.styles';
export type FileInputStylesNames = InputStylesNames | InputWrapperStylesNames | Selectors<typeof useStyles>;
export interface FileInputProps<Multiple extends boolean = false> extends DefaultProps<FileInputStylesNames>, InputSharedProps, InputWrapperBaseProps, Omit<React.ComponentPropsWithoutRef<'button'>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
    /** Props passed to root element (InputWrapper component) */
    wrapperProps?: Record<string, any>;
    /** Called when user picks files */
    onChange?(payload: Multiple extends true ? File[] : File | null): void;
    /** Controlled input value */
    value?: Multiple extends true ? File[] : File | null;
    /** Uncontrolled input default value */
    defaultValue?: Multiple extends true ? File[] : File | null;
    /** Input size */
    size?: MantineSize;
    /** Determines whether user can pick more than one file */
    multiple?: Multiple;
    /** File input accept attribute, for example, "image/png,image/jpeg" */
    accept?: string;
    /** Input name attribute */
    name?: string;
    /** Input form attribute */
    form?: string;
    /** Current value renderer */
    valueComponent?: React.FC<{
        value: null | File | File[];
    }>;
    /** Allow to clear value */
    clearable?: boolean;
    /** Props added to clear button */
    clearButtonProps?: React.ComponentPropsWithoutRef<'button'>;
    /** Determines whether the user can change value */
    readOnly?: boolean;
    /** Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. */
    capture?: boolean | 'user' | 'environment';
    /** Spreads props to input element used to capture files */
    fileInputProps?: React.ComponentPropsWithoutRef<'input'>;
}
export declare const _FileInput: React.ForwardRefExoticComponent<FileInputProps<false> & React.RefAttributes<HTMLButtonElement>>;
type FileInputComponent = <Multiple extends boolean = false>(props: FileInputProps<Multiple> & {
    ref?: React.ForwardedRef<HTMLButtonElement>;
}) => JSX.Element;
export declare const FileInput: FileInputComponent;
export {};
//# sourceMappingURL=FileInput.d.ts.map