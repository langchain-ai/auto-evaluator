import { MantineNumberSize } from '@mantine/styles';
export interface SkeletonStylesParams {
    height: number | string;
    width: number | string;
    circle: boolean;
    radius: MantineNumberSize;
    animate: boolean;
}
export declare const fade: import("@emotion/react").Keyframes;
declare const _default: (params: SkeletonStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        visible: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Skeleton.styles.d.ts.map