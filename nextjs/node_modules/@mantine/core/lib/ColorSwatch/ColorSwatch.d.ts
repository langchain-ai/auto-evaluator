import React from 'react';
import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/styles';
import useStyles, { ColorSwatchStylesParams } from './ColorSwatch.styles';
export type ColorSwatchStylesNames = Selectors<typeof useStyles>;
export interface ColorSwatchProps extends DefaultProps<ColorSwatchStylesNames, ColorSwatchStylesParams> {
    variant?: string;
    /** Swatch background-color in any css valid format (hex, rgb, etc.) */
    color: string;
    /** Width and height */
    size?: number | string;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** ColorSwatch children */
    children?: React.ReactNode;
    /** Determines whether swatch should have inner shadow */
    withShadow?: boolean;
}
export declare const _ColorSwatch: React.ForwardRefExoticComponent<ColorSwatchProps & React.RefAttributes<HTMLDivElement>>;
export declare const ColorSwatch: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, ColorSwatchProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(ColorSwatchProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof ColorSwatchProps> & {
    ref?: any;
}) | (ColorSwatchProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=ColorSwatch.d.ts.map