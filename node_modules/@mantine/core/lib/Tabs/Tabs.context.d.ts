import { MantineColor, MantineNumberSize, ClassNames, Styles } from '@mantine/styles';
import { TabsOrientation, TabsPlacement, TabsValue, TabsVariant, TabsStylesParams } from './Tabs.types';
import type { TabsStylesNames } from './Tabs';
interface TabsContext {
    id: string;
    value: TabsValue;
    orientation: TabsOrientation;
    loop: boolean;
    activateTabWithKeyboard: boolean;
    allowTabDeactivation: boolean;
    onTabChange(value: TabsValue): void;
    getTabId(value: string): string;
    getPanelId(value: string): string;
    variant: TabsVariant;
    color: MantineColor;
    radius: MantineNumberSize;
    inverted: boolean;
    keepMounted: boolean;
    placement: TabsPlacement;
    classNames: ClassNames<TabsStylesNames>;
    styles: Styles<TabsStylesNames, TabsStylesParams>;
    unstyled: boolean;
}
export declare const TabsContextProvider: ({ children, value }: {
    value: TabsContext;
    children: import("react").ReactNode;
}) => JSX.Element, useTabsContext: () => TabsContext;
export {};
//# sourceMappingURL=Tabs.context.d.ts.map