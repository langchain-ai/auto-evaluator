import React from 'react';
import { Selectors, DefaultProps } from '@mantine/styles';
import useStyles from './PaginationControl.styles';
export type PaginationControlStylesNames = Selectors<typeof useStyles>;
export interface PaginationControlProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
    /** Determines whether control should have active styles */
    active?: boolean;
    /** Determines whether control should have padding, true by default */
    withPadding?: boolean;
}
export declare const PaginationControl: React.ForwardRefExoticComponent<PaginationControlProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=PaginationControl.d.ts.map