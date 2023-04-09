import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { TabsList, TabsListStylesNames } from './TabsList/TabsList';
import { TabsPanel, TabsPanelStylesNames } from './TabsPanel/TabsPanel';
import { Tab, TabStylesNames } from './Tab/Tab';
import { TabsProviderProps } from './TabsProvider';
import { TabsStylesParams } from './Tabs.types';
import useStyles from './Tabs.styles';
export type TabsStylesNames = Selectors<typeof useStyles> | TabsListStylesNames | TabsPanelStylesNames | TabStylesNames;
export interface TabsProps extends TabsProviderProps, DefaultProps<TabsStylesNames, TabsStylesParams>, Omit<React.ComponentPropsWithRef<'div'>, keyof TabsProviderProps> {
}
type TabsComponent = ForwardRefWithStaticComponents<TabsProps, {
    List: typeof TabsList;
    Tab: typeof Tab;
    Panel: typeof TabsPanel;
}>;
export declare const Tabs: TabsComponent;
export {};
//# sourceMappingURL=Tabs.d.ts.map