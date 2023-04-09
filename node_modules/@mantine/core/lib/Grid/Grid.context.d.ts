import type { MantineNumberSize } from '@mantine/styles';
interface GridContextValue {
    gutter: MantineNumberSize;
    gutterXs: MantineNumberSize;
    gutterSm: MantineNumberSize;
    gutterMd: MantineNumberSize;
    gutterLg: MantineNumberSize;
    gutterXl: MantineNumberSize;
    grow: boolean;
    columns: number;
}
export declare const GridProvider: ({ children, value }: {
    value: GridContextValue;
    children: import("react").ReactNode;
}) => JSX.Element, useGridContext: () => GridContextValue;
export {};
//# sourceMappingURL=Grid.context.d.ts.map