import React from 'react';
import { Selectors, DefaultProps, MantineColor, MantineNumberSize } from '@mantine/styles';
import { IndicatorPosition } from './Indicator.types';
import useStyles, { IndicatorStylesParams } from './Indicator.styles';
export type IndicatorStylesNames = Selectors<typeof useStyles>;
export interface IndicatorProps extends DefaultProps<IndicatorStylesNames, IndicatorStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Element that should have an indicator */
    children: React.ReactNode;
    /** Indicator position relative to child element */
    position?: IndicatorPosition;
    /** Changes position offset, usually used when element has border-radius */
    offset?: number;
    /** Determines whether indicator container should be an inline element */
    inline?: boolean;
    /** Indicator width and height */
    size?: number | string;
    /** Indicator label */
    label?: React.ReactNode;
    /** Key of theme.radius or any valid CSS value to set border-radius, 1000rem by default */
    radius?: MantineNumberSize;
    /** Color from theme.colors or any other valid CSS color value */
    color?: MantineColor;
    /** Determines whether indicator should have border */
    withBorder?: boolean;
    /** When component is disabled it renders children without indicator */
    disabled?: boolean;
    /** Indicator processing animation */
    processing?: boolean;
    /** Indicator z-index */
    zIndex?: React.CSSProperties['zIndex'];
}
export declare const Indicator: React.ForwardRefExoticComponent<IndicatorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Indicator.d.ts.map