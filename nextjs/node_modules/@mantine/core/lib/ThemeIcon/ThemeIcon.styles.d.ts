import { MantineNumberSize, MantineColor, MantineGradient, MantineTheme } from '@mantine/styles';
export interface ThemeIconStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    variant: string;
    gradient: MantineGradient;
}
declare const _default: (params: ThemeIconStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=ThemeIcon.styles.d.ts.map