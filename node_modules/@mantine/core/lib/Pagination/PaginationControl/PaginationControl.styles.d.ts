import { MantineColor, MantineNumberSize } from '@mantine/styles';
export declare const sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
interface PaginationControlStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    withPadding: boolean;
}
declare const _default: (params: PaginationControlStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        control: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=PaginationControl.styles.d.ts.map