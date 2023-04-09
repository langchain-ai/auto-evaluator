import { MantineNumberSize, MantineColor } from '@mantine/styles';
export interface ProgressStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
}
declare const _default: (params: ProgressStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        bar: string;
        label: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Progress.styles.d.ts.map