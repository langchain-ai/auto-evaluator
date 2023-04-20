import React from 'react';
import { FileRejection, Accept, FileWithPath, DropEvent, FileError } from 'react-dropzone';
import { DefaultProps, Selectors, MantineNumberSize } from '@mantine/core';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { DropzoneAccept, DropzoneIdle, DropzoneReject } from './DropzoneStatus';
import type { DropzoneFullScreenType } from './DropzoneFullScreen';
import useStyles from './Dropzone.styles';
export type DropzoneStylesNames = Selectors<typeof useStyles>;
export interface DropzoneProps extends DefaultProps<DropzoneStylesNames>, Omit<React.ComponentPropsWithRef<'div'>, 'onDrop'> {
    variant?: string;
    /** Padding from theme.spacing, or any valid CSS value to set padding */
    padding?: MantineNumberSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Dropzone statues */
    children: React.ReactNode;
    /** Disable files capturing */
    disabled?: boolean;
    /** Called when any files are dropped into dropzone */
    onDropAny?(files: FileWithPath[], fileRejections: FileRejection[]): void;
    /** Called when valid files are dropped into dropzone */
    onDrop(files: FileWithPath[]): void;
    /** Called when selected files don't meet file restrictions */
    onReject?(fileRejections: FileRejection[]): void;
    /** Display loading overlay over dropzone */
    loading?: boolean;
    /** File types to accept  */
    accept?: Accept | string[];
    /** Get open function as ref */
    openRef?: React.ForwardedRef<() => void | undefined>;
    /** Allow selection of multiple files */
    multiple?: boolean;
    /** Set maximum file size in bytes */
    maxSize?: number;
    /** Name of the form control. Submitted with the form as part of a name/value pair. */
    name?: string;
    /** Number of files that user can pick */
    maxFiles?: number;
    /** Set to true to autofocus the root element */
    autoFocus?: boolean;
    /** If false, disables click to open the native file selection dialog */
    activateOnClick?: boolean;
    /** If false, disables drag 'n' drop */
    activateOnDrag?: boolean;
    /** If false, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. */
    activateOnKeyboard?: boolean;
    /** If false, stops drag event propagation to parents */
    dragEventsBubbling?: boolean;
    /** Called when the `dragenter` event occurs */
    onDragEnter?(event: React.DragEvent<HTMLElement>): void;
    /** Called when the `dragleave` event occurs */
    onDragLeave?(event: React.DragEvent<HTMLElement>): void;
    /** Called when the `dragover` event occurs */
    onDragOver?(event: React.DragEvent<HTMLElement>): void;
    /** Called when user closes the file selection dialog with no selection */
    onFileDialogCancel?(): void;
    /** Called when user opens the file selection dialog */
    onFileDialogOpen?(): void;
    /** If false, allow dropped items to take over the current browser window */
    preventDropOnDocument?: boolean;
    /** Set to true to use the File System Access API to open the file picker instead of using an <input type="file"> click event, defaults to true */
    useFsAccessApi?: boolean;
    /** Use this to provide a custom file aggregator */
    getFilesFromEvent?: (event: DropEvent) => Promise<Array<File | DataTransferItem>>;
    /** Custom validation function. It must return null if there's no errors. */
    validator?: <T extends File>(file: T) => FileError | FileError[] | null;
}
export declare const defaultProps: Partial<DropzoneProps>;
export declare function _Dropzone(props: DropzoneProps): JSX.Element;
export declare namespace _Dropzone {
    var displayName: string;
    var Accept: {
        (props: import("./DropzoneStatus").DropzoneStatusProps): JSX.Element;
        displayName: string;
    };
    var Reject: {
        (props: import("./DropzoneStatus").DropzoneStatusProps): JSX.Element;
        displayName: string;
    };
    var Idle: {
        (props: import("./DropzoneStatus").DropzoneStatusProps): JSX.Element;
        displayName: string;
    };
}
export declare const Dropzone: ForwardRefWithStaticComponents<DropzoneProps, {
    Accept: typeof DropzoneAccept;
    Reject: typeof DropzoneReject;
    Idle: typeof DropzoneIdle;
    FullScreen: DropzoneFullScreenType;
}>;
//# sourceMappingURL=Dropzone.d.ts.map