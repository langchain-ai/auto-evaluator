import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './MenuLabel.styles';
export type MenuLabelStylesName = Selectors<typeof useStyles>;
export interface MenuLabelProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    /** Label content */
    children?: React.ReactNode;
}
export declare const MenuLabel: React.ForwardRefExoticComponent<MenuLabelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MenuLabel.d.ts.map