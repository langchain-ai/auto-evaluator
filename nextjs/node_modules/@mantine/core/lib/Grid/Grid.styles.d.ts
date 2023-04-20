/// <reference types="react" />
import { MantineNumberSize, MantineTheme } from '@mantine/styles';
export interface GridStylesParams {
    gutter: MantineNumberSize;
    gutterXs: MantineNumberSize;
    gutterSm: MantineNumberSize;
    gutterMd: MantineNumberSize;
    gutterLg: MantineNumberSize;
    gutterXl: MantineNumberSize;
    justify?: React.CSSProperties['justifyContent'];
    align?: React.CSSProperties['alignContent'];
}
declare const _default: (params: GridStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export default _default;
//# sourceMappingURL=Grid.styles.d.ts.map