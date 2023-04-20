import * as React from 'react';
import { UnhandledErrorAction, UnhandledRejectionAction } from '../error-overlay-reducer';
import type { VersionInfo } from '../../../../../server/dev/parse-version-info';
export declare type SupportedErrorEvent = {
    id: number;
    event: UnhandledErrorAction | UnhandledRejectionAction;
};
export declare type ErrorsProps = {
    errors: SupportedErrorEvent[];
    initialDisplayState: DisplayState;
    versionInfo?: VersionInfo;
};
declare type DisplayState = 'minimized' | 'fullscreen' | 'hidden';
export declare const Errors: React.FC<ErrorsProps>;
export declare const styles: string;
export {};
