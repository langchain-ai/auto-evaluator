/// <reference types="react" />
type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;
export declare function useResizeObserver<T extends HTMLElement = any>(): readonly [import("react").MutableRefObject<T>, ObserverRect];
export declare function useElementSize<T extends HTMLElement = any>(): {
    ref: import("react").MutableRefObject<T>;
    width: number;
    height: number;
};
export {};
//# sourceMappingURL=use-resize-observer.d.ts.map