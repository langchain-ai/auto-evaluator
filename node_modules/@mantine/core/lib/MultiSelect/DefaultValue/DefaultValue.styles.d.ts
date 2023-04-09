import { MantineNumberSize } from '@mantine/styles';
interface DefaultLabelStyles {
    radius: MantineNumberSize;
    disabled: boolean;
    readOnly: boolean;
}
export declare const sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
declare const _default: (params: DefaultLabelStyles, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        defaultValue: string;
        defaultValueRemove: string;
        defaultValueLabel: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=DefaultValue.styles.d.ts.map