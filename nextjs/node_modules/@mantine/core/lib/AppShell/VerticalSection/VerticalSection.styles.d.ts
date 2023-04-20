/// <reference types="react" />
export type VerticalSectionHeight = number | string | Partial<Record<string, string | number>>;
export interface VerticalSectionPosition {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}
interface VerticalSectionStyles {
    height: VerticalSectionHeight;
    fixed: boolean;
    position: VerticalSectionPosition;
    zIndex: React.CSSProperties['zIndex'];
    borderPosition: 'top' | 'bottom' | 'none';
    layout: 'default' | 'alt';
}
declare const _default: (params: VerticalSectionStyles, options?: import("@mantine/styles").UseStylesOptions<string>) => {
    classes: {
        root: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/styles").MantineTheme;
};
export default _default;
//# sourceMappingURL=VerticalSection.styles.d.ts.map