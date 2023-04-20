import { MantineNumberSize } from '@mantine/styles';
export interface OverlayStylesParams {
    color: string;
    opacity: number;
    blur: number | string;
    radius: MantineNumberSize;
    gradient: string;
    fixed: boolean;
    zIndex: any;
}
declare const _default: (params: OverlayStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Overlay.styles.d.ts.map