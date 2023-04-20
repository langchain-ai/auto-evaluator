import type { NotificationProps } from './types';
export type NotificationsEvents = {
    show(notification: NotificationProps): void;
    hide(id: string): void;
    update(notification: NotificationProps & {
        id: string;
    }): void;
    clean(): void;
    cleanQueue(): void;
};
export declare const useNotificationsEvents: (events: NotificationsEvents) => void, createEvent: <EventKey extends keyof NotificationsEvents>(event: EventKey) => (...payload: Parameters<NotificationsEvents[EventKey]>[0] extends undefined ? [undefined?] : [Parameters<NotificationsEvents[EventKey]>[0]]) => void;
export declare const showNotification: (payload_0: NotificationProps) => void;
export declare const hideNotification: (payload_0: string) => void;
export declare const cleanNotifications: (payload_0?: undefined) => void;
export declare const cleanNotificationsQueue: (payload_0?: undefined) => void;
export declare const updateNotification: (payload_0: NotificationProps & {
    id: string;
}) => void;
export declare const notifications: NotificationsEvents;
//# sourceMappingURL=events.d.ts.map