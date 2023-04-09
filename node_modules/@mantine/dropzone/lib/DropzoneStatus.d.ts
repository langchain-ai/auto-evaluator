import React from 'react';
export interface DropzoneStatusProps {
    children: React.ReactNode;
}
export declare const DropzoneAccept: {
    (props: DropzoneStatusProps): JSX.Element;
    displayName: string;
};
export declare const DropzoneReject: {
    (props: DropzoneStatusProps): JSX.Element;
    displayName: string;
};
export declare const DropzoneIdle: {
    (props: DropzoneStatusProps): JSX.Element;
    displayName: string;
};
export type DropzoneAcceptProps = DropzoneStatusProps;
export type DropzoneRejectProps = DropzoneStatusProps;
export type DropzoneIdleProps = DropzoneStatusProps;
//# sourceMappingURL=DropzoneStatus.d.ts.map