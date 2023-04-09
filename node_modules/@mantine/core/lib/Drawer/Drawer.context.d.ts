/// <reference types="react" />
export type ScrollAreaComponent = React.FC<{
    mah: React.CSSProperties['maxHeight'];
    children: React.ReactNode;
}>;
interface DrawerContext {
    scrollAreaComponent: ScrollAreaComponent;
}
export declare const DrawerProvider: ({ children, value }: {
    value: DrawerContext;
    children: import("react").ReactNode;
}) => JSX.Element, useDrawerContext: () => DrawerContext;
export {};
//# sourceMappingURL=Drawer.context.d.ts.map