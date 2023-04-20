import { MantineNumberSize, MantineColor, MantineGradient, MantineTheme } from '@mantine/styles';
export interface BadgeStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    gradient: MantineGradient;
    fullWidth: boolean;
}
declare const _default: (params: BadgeStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        leftSection: string;
        rightSection: string;
        inner: string;
        root: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Badge.styles.d.ts.map