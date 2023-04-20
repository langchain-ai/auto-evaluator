import { DropzoneFullScreen } from './DropzoneFullScreen';
export declare const Dropzone: import("@mantine/utils").ForwardRefWithStaticComponents<import("./Dropzone").DropzoneProps, {
    Accept: {
        (props: import("./DropzoneStatus").DropzoneStatusProps): JSX.Element;
        displayName: string;
    };
    Reject: {
        (props: import("./DropzoneStatus").DropzoneStatusProps): JSX.Element;
        displayName: string;
    };
    Idle: {
        (props: import("./DropzoneStatus").DropzoneStatusProps): JSX.Element;
        displayName: string;
    };
    FullScreen: typeof DropzoneFullScreen;
}>;
export type { DropzoneStylesNames, DropzoneProps } from './Dropzone';
export type { DropzoneFullScreenProps, DropzoneFullScreenStylesName } from './DropzoneFullScreen';
export type { DropzoneStylesParams } from './Dropzone.styles';
export type { DropzoneAcceptProps, DropzoneRejectProps, DropzoneIdleProps } from './DropzoneStatus';
export * from './mime-types';
export type { FileWithPath } from 'react-dropzone';
//# sourceMappingURL=index.d.ts.map