import React from 'react';
import { DefaultProps } from '@mantine/core';
import { NotificationProps } from '../types';
export interface NotificationContainerProps extends DefaultProps {
    notification: NotificationProps;
    onHide(id: string): void;
    autoClose: false | number;
    innerRef: React.ForwardedRef<HTMLDivElement>;
}
declare function NotificationContainer({ notification, autoClose, onHide, innerRef, ...others }: NotificationContainerProps): JSX.Element;
declare namespace NotificationContainer {
    var displayName: string;
}
export default NotificationContainer;
//# sourceMappingURL=NotificationContainer.d.ts.map