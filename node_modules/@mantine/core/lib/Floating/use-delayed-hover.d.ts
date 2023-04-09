interface UseDelayedHoverInput {
    open(): void;
    close(): void;
    openDelay: number;
    closeDelay: number;
}
export declare function useDelayedHover({ open, close, openDelay, closeDelay }: UseDelayedHoverInput): {
    openDropdown: () => void;
    closeDropdown: () => void;
};
export {};
//# sourceMappingURL=use-delayed-hover.d.ts.map