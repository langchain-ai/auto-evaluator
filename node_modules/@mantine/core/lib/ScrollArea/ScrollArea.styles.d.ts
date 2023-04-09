export interface ScrollAreaStylesParams {
    scrollbarSize: number | string;
    offsetScrollbars: boolean;
    scrollbarHovered: boolean;
    hidden: boolean;
}
declare const _default: (params: ScrollAreaStylesParams, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
        viewport: string;
        scrollbar: string;
        thumb: string;
        corner: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=ScrollArea.styles.d.ts.map