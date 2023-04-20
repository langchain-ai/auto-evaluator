import { MantineColor, MantineNumberSize, MantineTheme } from '@mantine/styles';
export type AlertVariant = 'filled' | 'outline' | 'light';
export interface AlertStylesParams {
    color: MantineColor;
    radius: MantineNumberSize;
}
declare const _default: (params: AlertStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        wrapper: string;
        body: string;
        title: string;
        label: string;
        icon: string;
        message: string;
        closeButton: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Alert.styles.d.ts.map