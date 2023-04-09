import React from 'react';
import { MantineNumberSize } from '@mantine/styles';
export declare function getIconSize(size: MantineNumberSize): string;
interface _PaginationIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    size?: string;
    path: string;
}
export type PaginationIconProps = Omit<_PaginationIconProps, 'path'>;
export type PaginationIcon = React.FC<PaginationIconProps>;
export declare const PaginationNextIcon: (props: PaginationIconProps) => JSX.Element;
export declare const PaginationPreviousIcon: (props: PaginationIconProps) => JSX.Element;
export declare const PaginationFirstIcon: (props: PaginationIconProps) => JSX.Element;
export declare const PaginationLastIcon: (props: PaginationIconProps) => JSX.Element;
export declare const PaginationDotsIcon: (props: PaginationIconProps) => JSX.Element;
export {};
//# sourceMappingURL=Pagination.icons.d.ts.map