import { MantineNumberSize, MantineColor } from '@mantine/styles';
export interface StepperStylesParams {
    contentPadding: MantineNumberSize;
    iconSize?: number;
    color: MantineColor;
    orientation: 'vertical' | 'horizontal';
    iconPosition: 'right' | 'left';
    breakpoint: MantineNumberSize;
}
declare const _default: (params: StepperStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        steps: string;
        separator: string;
        separatorActive: string;
        content: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Stepper.styles.d.ts.map