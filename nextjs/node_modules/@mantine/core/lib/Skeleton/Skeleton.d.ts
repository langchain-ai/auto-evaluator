import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { SkeletonStylesParams } from './Skeleton.styles';
export interface SkeletonProps extends DefaultProps<never, SkeletonStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Should skeleton overlay be displayed */
    visible?: boolean;
    /** Skeleton height */
    height?: number | string;
    /** Skeleton width */
    width?: number | string;
    /** If Skeleton is a circle, it's width and border-radius will be equal to height */
    circle?: boolean;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Whether to show the animation effect */
    animate?: boolean;
}
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Skeleton.d.ts.map