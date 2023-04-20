import { MantineNumberSize, MantineColor, MantineTheme, MantineGradient } from '@mantine/styles';
export declare const AVATAR_VARIANTS: string[];
export interface AvatarStylesParams {
    radius: MantineNumberSize;
    color: MantineColor;
    withinGroup: boolean;
    spacing: MantineNumberSize;
    gradient: MantineGradient;
}
export declare const sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
declare const _default: (params: AvatarStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        image: string;
        placeholder: string;
        placeholderIcon: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Avatar.styles.d.ts.map