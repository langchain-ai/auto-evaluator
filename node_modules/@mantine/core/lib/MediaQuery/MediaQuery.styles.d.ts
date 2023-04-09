import { MantineNumberSize, CSSObject, MantineTheme } from '@mantine/styles';
export interface MediaQueryStylesParams {
    smallerThan: MantineNumberSize;
    largerThan: MantineNumberSize;
    styles: CSSObject | ((theme: MantineTheme) => CSSObject);
    query: string;
}
declare const _default: (params: MediaQueryStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        media: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=MediaQuery.styles.d.ts.map