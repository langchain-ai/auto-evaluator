import React from 'react';
import { DefaultProps } from '@mantine/styles';
export interface CenterProps extends DefaultProps {
    variant?: string;
    /** Content that should be centered vertically and horizontally */
    children: React.ReactNode;
    /** Set to true to use inline-flex instead of flex */
    inline?: boolean;
}
export declare const _Center: React.ForwardRefExoticComponent<CenterProps & React.RefAttributes<HTMLDivElement>>;
export declare const Center: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, CenterProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(CenterProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof CenterProps> & {
    ref?: any;
}) | (CenterProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Center.d.ts.map