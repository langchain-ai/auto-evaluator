/// <reference types="react" />
import { MantineTheme, MantineColor, MantineGradient } from '@mantine/styles';
export interface TextStylesParams {
    color: 'dimmed' | MantineColor;
    lineClamp: number;
    truncate: 'end' | 'start' | boolean;
    inline: boolean;
    inherit: boolean;
    underline: boolean;
    strikethrough: boolean;
    italic: boolean;
    gradient: MantineGradient;
    transform: React.CSSProperties['textTransform'];
    align: React.CSSProperties['textAlign'];
    weight: React.CSSProperties['fontWeight'];
}
declare const _default: (params: TextStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        gradient: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Text.styles.d.ts.map