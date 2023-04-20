import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { LoaderProps } from '../Loader';
export interface LoadingOverlayProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** If set loading overlay will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean;
    /** Provide custom loader */
    loader?: React.ReactNode;
    /** Loader component props */
    loaderProps?: LoaderProps;
    /** Sets overlay opacity */
    overlayOpacity?: number;
    /** Sets overlay color, defaults to theme.white in light theme and to theme.colors.dark[5] in dark theme */
    overlayColor?: string;
    /** Sets overlay blur */
    overlayBlur?: number | string;
    /** Loading overlay z-index */
    zIndex?: React.CSSProperties['zIndex'];
    /** If visible overlay will take 100% width and height of first parent with relative position and overlay all of its content */
    visible: boolean;
    /** Animation duration in ms */
    transitionDuration?: number;
    /** Exit transition duration in ms */
    exitTransitionDuration?: number;
    /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
    radius?: MantineNumberSize;
}
export declare const LoadingOverlay: React.ForwardRefExoticComponent<LoadingOverlayProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoadingOverlay.d.ts.map