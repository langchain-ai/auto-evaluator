import { MantineSize } from '@mantine/styles';
export interface ContainerStylesParams {
    fluid: boolean;
    sizes: Record<MantineSize, number | string>;
}
declare const _default: (params: ContainerStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=Container.styles.d.ts.map