import { MantineNumberSize } from '@mantine/styles';
export interface NumberInputStylesParams {
    radius: MantineNumberSize;
}
export declare const CONTROL_SIZES: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
declare const _default: (params: NumberInputStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        rightSection: string;
        control: string;
        controlUp: string;
        controlDown: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=NumberInput.styles.d.ts.map