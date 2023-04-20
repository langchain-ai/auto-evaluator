import { NotificationProps } from '../../types';
export default function useNotificationsState({ limit }: {
    limit: number;
}): {
    notifications: NotificationProps[];
    queue: NotificationProps[];
    showNotification: (notification: NotificationProps) => string;
    updateNotification: (notification: NotificationProps) => void;
    hideNotification: (id: string) => void;
    cleanQueue: () => void;
    clean: () => void;
};
//# sourceMappingURL=use-notifications-state.d.ts.map