import React from 'react';
import { DefaultProps, MantineNumberSize, MantineShadow } from '@mantine/styles';
import { PaperStylesParams } from './Paper.styles';
export interface PaperProps extends DefaultProps<never, PaperStylesParams> {
    variant?: string;
    /** Predefined box-shadow from theme.shadows (xs, sm, md, lg, xl) or any valid css box-shadow property */
    shadow?: MantineShadow;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Adds border styles */
    withBorder?: boolean;
    /** Paper children */
    children?: React.ReactNode;
}
export declare const _Paper: React.ForwardRefExoticComponent<PaperProps & React.RefAttributes<HTMLDivElement>>;
export declare const Paper: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, PaperProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(PaperProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof PaperProps> & {
    ref?: any;
}) | (PaperProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Paper.d.ts.map