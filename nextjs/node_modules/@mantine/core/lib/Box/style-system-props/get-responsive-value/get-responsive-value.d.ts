import { MantineTheme } from '@mantine/styles';
export type StyleProperty = string | string[];
interface GetResponsiveStyles {
    value: any;
    theme: MantineTheme;
    getValue: (value: any, theme: MantineTheme) => any;
    property: StyleProperty;
}
export declare function getResponsiveValue({ value, theme, getValue, property }: GetResponsiveStyles): {};
export {};
//# sourceMappingURL=get-responsive-value.d.ts.map