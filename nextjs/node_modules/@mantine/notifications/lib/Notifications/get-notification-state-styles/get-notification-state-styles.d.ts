import { TransitionStatus } from 'react-transition-group';
import { CSSObject } from '@mantine/core';
import { NotificationsPositioning } from '../../types';
interface NotificationStateStylesProps {
    state: TransitionStatus;
    maxHeight: number | string;
    positioning: NotificationsPositioning;
    transitionDuration: number;
}
export default function getNotificationStateStyles({ state, maxHeight, positioning, transitionDuration, }: NotificationStateStylesProps): CSSObject;
export {};
//# sourceMappingURL=get-notification-state-styles.d.ts.map