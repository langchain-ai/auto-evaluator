import React from 'react';
import { DefaultProps, MantineColor, Selectors, MantineNumberSize } from '@mantine/styles';
import useStyles, { NotificationStylesParams } from './Notification.styles';
export type NotificationStylesNames = Selectors<typeof useStyles>;
export interface NotificationProps extends DefaultProps<NotificationStylesNames, NotificationStylesParams>, Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    variant?: string;
    /** Called when close button is clicked */
    onClose?(): void;
    /** Notification line or icon color */
    color?: MantineColor;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Notification icon, replaces color line */
    icon?: React.ReactNode;
    /** Notification title, displayed before body */
    title?: React.ReactNode;
    /** Notification body, place main text here */
    children?: React.ReactNode;
    /** Replaces colored line or icon with Loader component */
    loading?: boolean;
    /** Determines whether close button should be visible, true by default */
    withCloseButton?: boolean;
    /** Props spread to close button */
    closeButtonProps?: Record<string, any>;
}
export declare const Notification: React.ForwardRefExoticComponent<NotificationProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Notification.d.ts.map