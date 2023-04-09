interface ScrollPosition {
    x: number;
    y: number;
}
declare function scrollTo({ x, y }: Partial<ScrollPosition>): void;
export declare function useWindowScroll(): readonly [ScrollPosition, typeof scrollTo];
export {};
//# sourceMappingURL=use-window-scroll.d.ts.map