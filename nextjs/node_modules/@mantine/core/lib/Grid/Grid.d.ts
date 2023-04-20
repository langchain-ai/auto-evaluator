import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { Col } from './Col/Col';
export interface GridProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
    variant?: string;
    /** <Col /> components only */
    children: React.ReactNode;
    /** Spacing between columns, key of theme.spacing or number for value */
    gutter?: MantineNumberSize;
    /** Gutter when screen size is larger than theme.breakpoints.xs */
    gutterXs?: MantineNumberSize;
    /** Gutter when screen size is larger than theme.breakpoints.sm */
    gutterSm?: MantineNumberSize;
    /** Gutter when screen size is larger than theme.breakpoints.md */
    gutterMd?: MantineNumberSize;
    /** Gutter when screen size is larger than theme.breakpoints.lg */
    gutterLg?: MantineNumberSize;
    /** Gutter when screen size is larger than theme.breakpoints.xl */
    gutterXl?: MantineNumberSize;
    /** Should columns in the last row take 100% of grid width */
    grow?: boolean;
    /** Set grid justify-content property */
    justify?: React.CSSProperties['justifyContent'];
    /** Set grid align-content property */
    align?: React.CSSProperties['alignContent'];
    /** Amount of columns in each row */
    columns?: number;
}
type GridComponent = ForwardRefWithStaticComponents<GridProps, {
    Col: typeof Col;
}>;
export declare const Grid: GridComponent;
export {};
//# sourceMappingURL=Grid.d.ts.map