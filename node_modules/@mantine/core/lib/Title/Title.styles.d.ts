/// <reference types="react" />
import { MantineTheme } from '@mantine/styles';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export interface TitleStylesParams {
    element: HeadingElement;
    weight: React.CSSProperties['fontWeight'];
    inline: boolean;
}
declare const _default: (params: TitleStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Title.styles.d.ts.map