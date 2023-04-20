interface ScrollIntoViewAnimation {
    /** target element alignment relatively to parent based on current axis */
    alignment?: 'start' | 'end' | 'center';
}
interface ScrollIntoViewParams {
    /** callback fired after scroll */
    onScrollFinish?: () => void;
    /** duration of scroll in milliseconds */
    duration?: number;
    /** axis of scroll */
    axis?: 'x' | 'y';
    /** custom mathematical easing function */
    easing?: (t: number) => number;
    /** additional distance between nearest edge and element */
    offset?: number;
    /** indicator if animation may be interrupted by user scrolling */
    cancelable?: boolean;
    /** prevents content jumping in scrolling lists with multiple targets */
    isList?: boolean;
}
export declare function useScrollIntoView<Target extends HTMLElement, Parent extends HTMLElement | null = null>({ duration, axis, onScrollFinish, easing, offset, cancelable, isList, }?: ScrollIntoViewParams): {
    scrollableRef: import("react").MutableRefObject<Parent>;
    targetRef: import("react").MutableRefObject<Target>;
    scrollIntoView: ({ alignment }?: ScrollIntoViewAnimation) => void;
    cancel: () => void;
};
export {};
//# sourceMappingURL=use-scroll-into-view.d.ts.map