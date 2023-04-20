import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { TextareaProps } from '../Textarea';
import { TextInputStylesNames } from '../TextInput';
export type JsonInputStylesNames = TextInputStylesNames;
export interface JsonInputProps extends DefaultProps<JsonInputStylesNames>, Omit<TextareaProps, 'onChange'> {
    /** Value for controlled input */
    value?: string;
    /** Default value for uncontrolled input */
    defaultValue?: string;
    /** Called when value changes */
    onChange?(value: string): void;
    /** Format JSON on blur */
    formatOnBlur?: boolean;
    /** Error message shown when JSON is not valid */
    validationError?: React.ReactNode;
    /** Function to serialize value into a string, used for value formatting, JSON.stringify by default */
    serialize?: typeof JSON.stringify;
    /** Function to deserialize string value, used for value formatting and input JSON validation, must throw error if string cannot be processed, JSON.parse by default */
    deserialize?: typeof JSON.parse;
}
export declare const JsonInput: React.ForwardRefExoticComponent<JsonInputProps & React.RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=JsonInput.d.ts.map