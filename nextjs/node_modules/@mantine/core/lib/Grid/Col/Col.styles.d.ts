/// <reference types="react" />
import { MantineNumberSize, MantineTheme } from '@mantine/styles';
export type ColSpan = number | 'auto' | 'content';
interface ColStyles {
    gutter: MantineNumberSize;
    gutterXs: MantineNumberSize;
    gutterSm: MantineNumberSize;
    gutterMd: MantineNumberSize;
    gutterLg: MantineNumberSize;
    gutterXl: MantineNumberSize;
    columns: number;
    grow: boolean;
    offset: number;
    offsetXs: number;
    offsetSm: number;
    offsetMd: number;
    offsetLg: number;
    offsetXl: number;
    span: ColSpan;
    xs: ColSpan;
    sm: ColSpan;
    md: ColSpan;
    lg: ColSpan;
    xl: ColSpan;
    order: React.CSSProperties['order'];
    orderXs: React.CSSProperties['order'];
    orderSm: React.CSSProperties['order'];
    orderMd: React.CSSProperties['order'];
    orderLg: React.CSSProperties['order'];
    orderXl: React.CSSProperties['order'];
}
declare const _default: (params: ColStyles, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        col: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Col.styles.d.ts.map