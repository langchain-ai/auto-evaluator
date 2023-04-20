import React from 'react';
import { Selectors, DefaultProps } from '@mantine/styles';
import useStyles from './TabsPanel.styles';
export type TabsPanelStylesNames = Selectors<typeof useStyles>;
export interface TabsPanelProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    /** Panel content */
    children: React.ReactNode;
    /** Value of associated control */
    value: string;
}
export declare const TabsPanel: React.ForwardRefExoticComponent<TabsPanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TabsPanel.d.ts.map