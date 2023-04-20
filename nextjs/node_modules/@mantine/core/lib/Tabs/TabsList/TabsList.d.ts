import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import { TabsPosition } from '../Tabs.types';
import useStyles from './TabsList.styles';
export type TabsListStylesNames = Selectors<typeof useStyles>;
export interface TabsListProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    /** <Tabs.Tab /> components */
    children: React.ReactNode;
    /** Determines whether tabs should take the whole space */
    grow?: boolean;
    /** Tabs alignment */
    position?: TabsPosition;
}
export declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TabsList.d.ts.map