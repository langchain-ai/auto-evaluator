/// <reference types="react" />
import { MantineNumberSize } from '@mantine/styles';
export interface StackStylesParams {
    spacing: MantineNumberSize;
    align: React.CSSProperties['alignItems'];
    justify: React.CSSProperties['justifyContent'];
}
declare const _default: (params: StackStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Stack.styles.d.ts.map