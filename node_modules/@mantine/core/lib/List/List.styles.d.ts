import { MantineNumberSize } from '@mantine/styles';
export interface ListStylesParams {
    withPadding: boolean;
    listStyleType: string;
    spacing: MantineNumberSize;
    center: boolean;
}
declare const _default: (params: ListStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=List.styles.d.ts.map