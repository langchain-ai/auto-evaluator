import { MantineTheme } from '@mantine/styles';
import { TabsStylesParams } from '../Tabs.types';
interface TabStylesParams extends TabsStylesParams {
    withIcon: boolean;
    withRightSection: boolean;
}
declare const _default: (params: TabStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        tabLabel: string;
        tab: string;
        tabRightSection: string;
        tabIcon: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Tab.styles.d.ts.map