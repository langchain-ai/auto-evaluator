import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { PaginationIconProps } from '../Pagination.icons';
export interface CreateEdgeComponent {
    icon: React.FC<PaginationIconProps>;
    name: string;
    action: 'onNext' | 'onPrevious' | 'onFirst' | 'onLast';
    type: 'next' | 'previous';
}
export interface PaginationEdgeProps extends DefaultProps {
    icon?: React.FC<PaginationIconProps>;
}
export declare function createEdgeComponent({ icon, name, action, type }: CreateEdgeComponent): (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(PaginationEdgeProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof PaginationEdgeProps> & {
    ref?: any;
}) | (PaginationEdgeProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
export declare const PaginationNext: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(PaginationEdgeProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof PaginationEdgeProps> & {
    ref?: any;
}) | (PaginationEdgeProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
export declare const PaginationPrevious: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(PaginationEdgeProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof PaginationEdgeProps> & {
    ref?: any;
}) | (PaginationEdgeProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
export declare const PaginationFirst: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(PaginationEdgeProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof PaginationEdgeProps> & {
    ref?: any;
}) | (PaginationEdgeProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
export declare const PaginationLast: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(PaginationEdgeProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof PaginationEdgeProps> & {
    ref?: any;
}) | (PaginationEdgeProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=PaginationEdges.d.ts.map