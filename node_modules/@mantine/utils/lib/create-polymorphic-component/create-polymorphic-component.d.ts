import React from 'react';
type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps & Omit<Props, keyof OverrideProps>;
type ElementType = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
type PropsOf<C extends ElementType> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;
type ComponentProp<C> = {
    component?: C;
};
type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<PropsOf<C>, Props>;
export type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>['ref'] : never;
export type PolymorphicComponentProps<C, Props = {}> = C extends React.ElementType ? InheritedProps<C, Props & ComponentProp<C>> & {
    ref?: PolymorphicRef<C>;
} : Props & {
    component: React.ElementType;
};
export declare function createPolymorphicComponent<ComponentDefaultType, Props, StaticComponents = Record<string, never>>(component: any): (<C = ComponentDefaultType>(props: PolymorphicComponentProps<C, Props>) => React.ReactElement) & Omit<React.FunctionComponent<(Props & ComponentProp<any> & Omit<Pick<any, string | number | symbol>, "component" | keyof Props> & {
    ref?: any;
}) | (Props & {
    component: React.ElementType<any>;
})>, never> & StaticComponents;
export {};
//# sourceMappingURL=create-polymorphic-component.d.ts.map