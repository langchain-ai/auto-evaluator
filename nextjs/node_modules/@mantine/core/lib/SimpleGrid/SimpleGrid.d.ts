import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { SimpleGridBreakpoint, SimpleGridStylesParams } from './SimpleGrid.styles';
export interface SimpleGridProps extends DefaultProps<never, SimpleGridStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Breakpoints data to change items per row and spacing based on max-width */
    breakpoints?: SimpleGridBreakpoint[];
    /** Default amount of columns, used when none of breakpoints can be applied  */
    cols?: number;
    /** Spacing between columns, used when none of breakpoints can be applied */
    spacing?: MantineNumberSize;
    /** Vertical spacing between columns, used when none of breakpoints can be applied  */
    verticalSpacing?: MantineNumberSize;
}
export declare const SimpleGrid: React.ForwardRefExoticComponent<SimpleGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SimpleGrid.d.ts.map