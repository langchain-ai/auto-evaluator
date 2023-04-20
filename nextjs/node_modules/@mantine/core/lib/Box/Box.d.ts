import React from 'react';
import { DefaultProps } from '@mantine/styles';
export interface BoxProps extends DefaultProps {
    children?: React.ReactNode;
}
export declare const _Box: React.ForwardRefExoticComponent<BoxProps & {
    component: any;
} & React.RefAttributes<HTMLDivElement>>;
export declare const Box: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, BoxProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(BoxProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof BoxProps> & {
    ref?: any;
}) | (BoxProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Box.d.ts.map