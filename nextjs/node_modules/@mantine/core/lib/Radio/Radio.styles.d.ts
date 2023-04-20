import { MantineColor } from '@mantine/styles';
export interface RadioStylesParams {
    color: MantineColor;
    transitionDuration: number;
    labelPosition: 'left' | 'right';
    error: boolean;
}
declare const _default: (params: RadioStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        inner: string;
        icon: string;
        radio: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Radio.styles.d.ts.map