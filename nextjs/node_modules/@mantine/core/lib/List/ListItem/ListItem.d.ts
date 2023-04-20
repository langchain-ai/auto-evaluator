import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './ListItem.styles';
export type ListItemStylesNames = Selectors<typeof useStyles>;
export interface ListItemProps extends DefaultProps<ListItemStylesNames>, React.ComponentPropsWithoutRef<'li'> {
    /** Icon to replace bullet */
    icon?: React.ReactNode;
    /** Item content */
    children: React.ReactNode;
}
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
//# sourceMappingURL=ListItem.d.ts.map