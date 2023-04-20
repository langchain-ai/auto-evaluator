import { MantineNumberSize, MantineColor, MantineTheme, MantineGradient } from '@mantine/styles';
export declare const ACTION_ICON_VARIANTS: string[];
export interface ActionIconStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    gradient: MantineGradient;
}
export declare const sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
declare const _default: (params: ActionIconStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=ActionIcon.styles.d.ts.map