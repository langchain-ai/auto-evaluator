import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { ColSpan } from './Col.styles';
export interface ColProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Default col span */
    span?: ColSpan;
    /** Column left offset */
    offset?: number;
    /** Default col order */
    order?: React.CSSProperties['order'];
    /** Col order at (min-width: theme.breakpoints.xs) */
    orderXs?: React.CSSProperties['order'];
    /** Col order at (min-width: theme.breakpoints.sm) */
    orderSm?: React.CSSProperties['order'];
    /** Col order at (min-width: theme.breakpoints.md) */
    orderMd?: React.CSSProperties['order'];
    /** Col order at (min-width: theme.breakpoints.lg) */
    orderLg?: React.CSSProperties['order'];
    /** Col order at (min-width: theme.breakpoints.xl) */
    orderXl?: React.CSSProperties['order'];
    /** Column left offset at (min-width: theme.breakpoints.xs) */
    offsetXs?: number;
    /** Column left offset at (min-width: theme.breakpoints.sm) */
    offsetSm?: number;
    /** Column left offset at (min-width: theme.breakpoints.md) */
    offsetMd?: number;
    /** Column left offset at (min-width: theme.breakpoints.lg) */
    offsetLg?: number;
    /** Column left offset at (min-width: theme.breakpoints.xl) */
    offsetXl?: number;
    /** Col span at (min-width: theme.breakpoints.xs) */
    xs?: ColSpan;
    /** Col span at (min-width: theme.breakpoints.sm) */
    sm?: ColSpan;
    /** Col span at (min-width: theme.breakpoints.md) */
    md?: ColSpan;
    /** Col span at (min-width: theme.breakpoints.lg) */
    lg?: ColSpan;
    /** Col span at (min-width: theme.breakpoints.xl) */
    xl?: ColSpan;
}
export declare const Col: React.ForwardRefExoticComponent<ColProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Col.d.ts.map