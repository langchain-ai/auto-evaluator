export interface UseMovePosition {
    x: number;
    y: number;
}
export declare const clampUseMovePosition: (position: UseMovePosition) => {
    x: number;
    y: number;
};
interface useMoveHandlers {
    onScrubStart?(): void;
    onScrubEnd?(): void;
}
export declare function useMove<T extends HTMLElement = HTMLDivElement>(onChange: (value: UseMovePosition) => void, handlers?: useMoveHandlers, dir?: 'ltr' | 'rtl'): {
    ref: import("react").MutableRefObject<T>;
    active: boolean;
};
export {};
//# sourceMappingURL=use-move.d.ts.map