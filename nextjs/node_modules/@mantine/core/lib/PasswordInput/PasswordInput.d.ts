import React from 'react';
import { Selectors, DefaultProps } from '@mantine/styles';
import { TextInputProps, TextInputStylesNames } from '../TextInput';
import useStyles from './PasswordInput.styles';
export type PasswordInputStylesNames = Selectors<typeof useStyles> | TextInputStylesNames;
export interface PasswordInputProps extends DefaultProps<PasswordInputStylesNames>, Omit<TextInputProps, 'classNames' | 'styles'> {
    /** Toggle button tabIndex, set to 0 to make button focusable with tab key */
    toggleTabIndex?: -1 | 0;
    /** Provide your own visibility toggle icon */
    visibilityToggleIcon?: React.FC<{
        reveal: boolean;
        size: number | string;
    }>;
    /** aria-label for visibility toggle button */
    visibilityToggleLabel?: string;
    /** Determines whether input content should be visible (controlled) */
    visible?: boolean;
    /** Determines whether input content should be visible (uncontrolled) */
    defaultVisible?: boolean;
    /** Called when visibility changes */
    onVisibilityChange?(visible: boolean): void;
}
export declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=PasswordInput.d.ts.map