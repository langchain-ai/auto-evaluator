import React from 'react';
import { TextProps } from '../Text/Text';
export interface AnchorProps extends Omit<TextProps, 'variant'> {
    variant?: string;
    children?: React.ReactNode;
}
export declare const _Anchor: React.ForwardRefExoticComponent<AnchorProps & {
    component: any;
} & React.RefAttributes<HTMLAnchorElement>>;
export declare const Anchor: (<C = "a">(props: import("@mantine/utils").PolymorphicComponentProps<C, AnchorProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(AnchorProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof AnchorProps> & {
    ref?: any;
}) | (AnchorProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Anchor.d.ts.map