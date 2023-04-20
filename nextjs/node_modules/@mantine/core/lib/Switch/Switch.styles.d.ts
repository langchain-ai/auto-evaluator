import { MantineNumberSize, MantineColor } from '@mantine/styles';
export interface SwitchStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
    labelPosition: 'left' | 'right';
    error: boolean;
}
declare const _default: (params: SwitchStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        input: string;
        track: string;
        thumb: string;
        trackLabel: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Switch.styles.d.ts.map