import { MantineNumberSize } from '@mantine/styles';
export interface TableStylesParams {
    captionSide: 'top' | 'bottom';
    horizontalSpacing: MantineNumberSize;
    verticalSpacing: MantineNumberSize;
    fontSize: MantineNumberSize;
    withBorder: boolean;
    withColumnBorders: boolean;
}
declare const _default: (params: TableStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Table.styles.d.ts.map