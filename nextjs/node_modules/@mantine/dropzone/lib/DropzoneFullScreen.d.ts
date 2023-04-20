import React from 'react';
import { DefaultProps, Selectors, PortalProps } from '@mantine/core';
import { DropzoneStylesNames, DropzoneProps } from './Dropzone';
import useFullScreenStyles from './DropzoneFullScreen.styles';
export type DropzoneFullScreenStylesName = DropzoneStylesNames | Exclude<Selectors<typeof useFullScreenStyles>, 'dropzone'>;
export interface DropzoneFullScreenProps extends Omit<DropzoneProps, 'styles' | 'classNames'>, DefaultProps<DropzoneFullScreenStylesName> {
    /** Determines whether user can drop files to browser window, true by default */
    active?: boolean;
    /** z-index value, 9999 by default */
    zIndex?: React.CSSProperties['zIndex'];
    /** Determines whether component should be rendered within Portal, true by default */
    withinPortal?: boolean;
    /** Props to pass down to the portal when withinPortal is true */
    portalProps?: PortalProps;
}
export declare function DropzoneFullScreen(props: DropzoneFullScreenProps): JSX.Element;
export declare namespace DropzoneFullScreen {
    var displayName: string;
}
export type DropzoneFullScreenType = typeof DropzoneFullScreen;
//# sourceMappingURL=DropzoneFullScreen.d.ts.map