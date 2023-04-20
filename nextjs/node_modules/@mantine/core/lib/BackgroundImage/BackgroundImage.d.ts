import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { BackgroundImageStylesParams } from './BackgroundImage.styles';
export interface BackgroundImageProps extends DefaultProps<never, BackgroundImageStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Image url */
    src: string;
    /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
    radius?: MantineNumberSize;
}
export declare const _BackgroundImage: React.ForwardRefExoticComponent<BackgroundImageProps & React.RefAttributes<HTMLDivElement>>;
export declare const BackgroundImage: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, BackgroundImageProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(BackgroundImageProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof BackgroundImageProps> & {
    ref?: any;
}) | (BackgroundImageProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=BackgroundImage.d.ts.map