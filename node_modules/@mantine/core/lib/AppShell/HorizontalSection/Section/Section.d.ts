import React from 'react';
import { DefaultProps } from '@mantine/styles';
export interface SectionProps extends DefaultProps {
    /** Section children */
    children: React.ReactNode;
    /** Force section to take all available height */
    grow?: boolean;
}
export declare const _Section: React.ForwardRefExoticComponent<SectionProps & React.RefAttributes<HTMLDivElement>>;
export declare const Section: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, SectionProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(SectionProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof SectionProps> & {
    ref?: any;
}) | (SectionProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Section.d.ts.map