import React from 'react';
import { DefaultProps, PortalProps } from '@mantine/core';
import { NotificationsEvents } from '../events';
type NotificationsStaticMethods = NotificationsEvents;
export interface NotificationsProps extends Omit<DefaultProps, 'style'>, React.ComponentPropsWithoutRef<'div'> {
    /** Notifications position */
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    /** Auto close timeout for all notifications, false to disable auto close, can be overwritten for individual notifications by notifications.show function */
    autoClose?: number | false;
    /** Notification transitions duration, 0 to turn transitions off */
    transitionDuration?: number;
    /** Notification width, cannot exceed 100% */
    containerWidth?: number | string;
    /** Notification max-height, used for transitions */
    notificationMaxHeight?: number | string;
    /** Maximum amount of notifications displayed at a time, other new notifications will be added to queue */
    limit?: number;
    /** Notifications container z-index */
    zIndex?: React.CSSProperties['zIndex'];
    /** Target element of Portal component */
    target?: PortalProps['target'];
}
export declare const Notifications: React.FC<NotificationsProps> & NotificationsStaticMethods;
export {};
//# sourceMappingURL=Notifications.d.ts.map