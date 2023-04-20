import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { TableStylesParams } from './Table.styles';
export interface TableProps extends DefaultProps<never, TableStylesParams>, React.ComponentPropsWithoutRef<'table'> {
    variant?: string;
    /** If true every odd row of table will have gray background color */
    striped?: boolean;
    /** If true row will have hover color */
    highlightOnHover?: boolean;
    /** Table caption position */
    captionSide?: 'top' | 'bottom';
    /** Horizontal cells spacing from theme.spacing or any valid CSS value */
    horizontalSpacing?: MantineNumberSize;
    /** Vertical cells spacing from theme.spacing or any valid CSS value */
    verticalSpacing?: MantineNumberSize;
    /** Sets font size of all text inside table */
    fontSize?: MantineNumberSize;
    /** Add border to table */
    withBorder?: boolean;
    /** Add border to columns */
    withColumnBorders?: boolean;
}
export declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
//# sourceMappingURL=Table.d.ts.map