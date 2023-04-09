import React from 'react';
import { Selectors, DefaultProps } from '@mantine/styles';
import { PaginationIconProps } from '../Pagination.icons';
import useStyles from './PaginationDots.styles';
export type PaginationDotsStylesNames = Selectors<typeof useStyles>;
export interface PaginationDotsProps extends DefaultProps<PaginationDotsStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    /** Custom dots icon component, must accept svg element props and size prop */
    icon?: React.FC<PaginationIconProps>;
}
export declare const PaginationDots: React.ForwardRefExoticComponent<PaginationDotsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PaginationDots.d.ts.map