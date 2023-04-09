import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './Breadcrumbs.styles';
export type BreadcrumbsStylesNames = Selectors<typeof useStyles>;
export interface BreadcrumbsProps extends DefaultProps<BreadcrumbsStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Separator between breadcrumbs */
    separator?: React.ReactNode;
    /** React nodes that should be separated */
    children: React.ReactNode;
}
export declare const Breadcrumbs: React.ForwardRefExoticComponent<BreadcrumbsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Breadcrumbs.d.ts.map