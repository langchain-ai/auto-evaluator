import { MantineNumberSize, MantineTheme } from '@mantine/styles';
export interface AppShellStylesParams {
    padding: MantineNumberSize;
    fixed: boolean;
    navbarOffsetBreakpoint: MantineNumberSize;
    asideOffsetBreakpoint: MantineNumberSize;
}
declare const _default: (params: AppShellStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        body: string;
        main: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=AppShell.styles.d.ts.map