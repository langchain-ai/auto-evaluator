import { MantineTheme } from '@mantine/styles';
import { TabsStylesParams, TabsPosition } from '../Tabs.types';
interface TabsListStylesParams extends TabsStylesParams {
    grow: boolean;
    position: TabsPosition;
}
declare const _default: (params: TabsListStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        tabsList: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=TabsList.styles.d.ts.map