import React from 'react';
import { MantineColor, MantineNumberSize, ClassNames, Styles } from '@mantine/styles';
import type { PaginationControlStylesNames } from '../PaginationControl/PaginationControl';
import type { PaginationDotsStylesNames } from '../PaginationDots/PaginationDots';
export type PaginationStylesNames = PaginationControlStylesNames | PaginationDotsStylesNames;
export interface PaginationRootSettings {
    classNames?: ClassNames<PaginationStylesNames>;
    styles?: Styles<PaginationStylesNames>;
    unstyled?: boolean;
    variant?: string;
    /** Controls height and min-width */
    size?: MantineNumberSize;
    /** Total number of pages, must be an integer */
    total: number;
    /** Active page for controlled component, must be an integer in [0, total] interval */
    value?: number;
    /** Active page for uncontrolled component, must be an integer in [0, total] interval */
    defaultValue?: number;
    /** Called when page changes */
    onChange?(value: number): void;
    /** Determines whether all controls should be disabled, false by default */
    disabled?: boolean;
    /** Number of siblings displayed on the left/right side of selected page, 1 by default */
    siblings?: number;
    /** Number of elements visible on the left/right edges, 1 by default */
    boundaries?: number;
    /** Key of theme.colors, active item color, theme.primaryColor by default */
    color?: MantineColor;
    /** Key of theme.radius, border-radius of items and controls, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Called when next page control is clicked */
    onNextPage?(): void;
    /** Called when previous page control is clicked */
    onPreviousPage?(): void;
    /** Called when first page control is clicked */
    onFirstPage?(): void;
    /** Called when last page control is clicked */
    onLastPage?(): void;
    /** Add additional props to items */
    getItemProps?(page: number): Record<string, any>;
}
export interface PaginationRootProps extends PaginationRootSettings {
    /** Pagination content */
    children?: React.ReactNode;
}
export declare function PaginationRoot(props: PaginationRootProps): JSX.Element;
//# sourceMappingURL=PaginationRoot.d.ts.map