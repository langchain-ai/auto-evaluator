import { MantineNumberSize } from '@mantine/styles';
export interface SimpleGridBreakpoint {
    maxWidth?: MantineNumberSize;
    minWidth?: MantineNumberSize;
    cols: number;
    spacing?: MantineNumberSize;
    verticalSpacing?: MantineNumberSize;
}
export interface SimpleGridStylesParams {
    spacing: MantineNumberSize;
    verticalSpacing: MantineNumberSize;
    breakpoints: SimpleGridBreakpoint[];
    cols: number;
}
declare const _default: (params: SimpleGridStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=SimpleGrid.styles.d.ts.map