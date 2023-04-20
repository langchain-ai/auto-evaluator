import { MantineNumberSize, MantineColor } from '@mantine/styles';
export declare const WRAPPER_PADDING = 4;
export interface SegmentedControlStylesParams {
    fullWidth: boolean;
    color: MantineColor;
    radius: MantineNumberSize;
    shouldAnimate: boolean;
    transitionDuration: number;
    transitionTimingFunction: string;
    orientation: 'vertical' | 'horizontal';
}
declare const _default: (params: SegmentedControlStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        label: string;
        control: string;
        input: string;
        root: string;
        controlActive: string;
        indicator: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=SegmentedControl.styles.d.ts.map