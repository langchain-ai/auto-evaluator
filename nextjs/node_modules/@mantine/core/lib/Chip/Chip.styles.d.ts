import { MantineNumberSize, MantineColor, MantineTheme } from '@mantine/styles';
export declare const sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export interface ChipStylesParams {
    radius: MantineNumberSize;
    color: MantineColor;
}
declare const _default: (params: ChipStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        label: string;
        iconWrapper: string;
        checkIcon: string;
        input: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Chip.styles.d.ts.map