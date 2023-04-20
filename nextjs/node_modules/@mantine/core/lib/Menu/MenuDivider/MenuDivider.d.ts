import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './MenuDivider.styles';
export type MenuDividerStylesNames = Selectors<typeof useStyles>;
export interface MenuDividerProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
}
export declare const MenuDivider: React.ForwardRefExoticComponent<MenuDividerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MenuDivider.d.ts.map