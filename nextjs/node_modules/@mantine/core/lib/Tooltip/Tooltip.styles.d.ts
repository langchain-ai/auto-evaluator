import { MantineColor, MantineNumberSize, MantineTheme } from '@mantine/styles';
export interface TooltipStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    width: number | 'auto';
    multiline: boolean;
}
declare const _default: (params: TooltipStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        tooltip: string;
        arrow: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Tooltip.styles.d.ts.map