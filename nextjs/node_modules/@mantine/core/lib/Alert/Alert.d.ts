import React from 'react';
import { DefaultProps, MantineColor, Selectors, MantineNumberSize, Variants } from '@mantine/styles';
import useStyles, { AlertStylesParams } from './Alert.styles';
export type AlertStylesNames = Selectors<typeof useStyles>;
export interface AlertProps extends DefaultProps<AlertStylesNames, AlertStylesParams>, Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    /** Alert title */
    title?: React.ReactNode;
    /** Controls Alert background, color and border styles, "light" by default */
    variant?: Variants<'filled' | 'outline' | 'light'>;
    /** Alert message */
    children: React.ReactNode;
    /** Key of theme.colors */
    color?: MantineColor;
    /** Icon displayed next to the title */
    icon?: React.ReactNode;
    /** Determines whether close button should be displayed, false by default */
    withCloseButton?: boolean;
    /** Called when close button is clicked */
    onClose?(): void;
    /** Close button aria-label */
    closeButtonLabel?: string;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
}
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Alert.d.ts.map