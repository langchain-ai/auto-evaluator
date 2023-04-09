import React from 'react';
import { GroupProps } from '../Group';
import { PaginationRoot, PaginationRootSettings } from './PaginationRoot/PaginationRoot';
import { PaginationItems } from './PaginationItems/PaginationItems';
import { PaginationIcon } from './Pagination.icons';
export interface PaginationProps extends PaginationRootSettings, Omit<GroupProps, keyof PaginationRootSettings> {
    /** Determines whether first/last controls should be rendered, false by default */
    withEdges?: boolean;
    /** Determines whether next/previous controls should be rendered, true by default */
    withControls?: boolean;
    /** Adds props to next/previous/first/last controls */
    getControlProps?(control: 'first' | 'previous' | 'last' | 'next'): Record<string, any>;
    /** Next control icon component */
    nextIcon?: PaginationIcon;
    /** Previous control icon component */
    previousIcon?: PaginationIcon;
    /** Last control icon component */
    lastIcon?: PaginationIcon;
    /** First control icon component */
    firstIcon?: PaginationIcon;
    /** Dots icon component */
    dotsIcon?: PaginationIcon;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
export declare namespace Pagination {
    var displayName: string;
    var Root: typeof PaginationRoot;
    var Items: typeof PaginationItems;
    var Control: React.ForwardRefExoticComponent<import("./PaginationControl/PaginationControl").PaginationControlProps & React.RefAttributes<HTMLButtonElement>>;
    var Dots: React.ForwardRefExoticComponent<import("./PaginationDots/PaginationDots").PaginationDotsProps & React.RefAttributes<HTMLDivElement>>;
    var Next: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, import("./PaginationEdges/PaginationEdges").PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component?: any;
    } & Omit<Pick<any, string | number | symbol>, "component" | keyof import("./PaginationEdges/PaginationEdges").PaginationEdgeProps> & {
        ref?: any;
    }) | (import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component: React.ElementType<any>;
    })>, never> & Record<string, never>;
    var Previous: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, import("./PaginationEdges/PaginationEdges").PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component?: any;
    } & Omit<Pick<any, string | number | symbol>, "component" | keyof import("./PaginationEdges/PaginationEdges").PaginationEdgeProps> & {
        ref?: any;
    }) | (import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component: React.ElementType<any>;
    })>, never> & Record<string, never>;
    var Last: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, import("./PaginationEdges/PaginationEdges").PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component?: any;
    } & Omit<Pick<any, string | number | symbol>, "component" | keyof import("./PaginationEdges/PaginationEdges").PaginationEdgeProps> & {
        ref?: any;
    }) | (import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component: React.ElementType<any>;
    })>, never> & Record<string, never>;
    var First: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, import("./PaginationEdges/PaginationEdges").PaginationEdgeProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component?: any;
    } & Omit<Pick<any, string | number | symbol>, "component" | keyof import("./PaginationEdges/PaginationEdges").PaginationEdgeProps> & {
        ref?: any;
    }) | (import("./PaginationEdges/PaginationEdges").PaginationEdgeProps & {
        component: React.ElementType<any>;
    })>, never> & Record<string, never>;
}
//# sourceMappingURL=Pagination.d.ts.map