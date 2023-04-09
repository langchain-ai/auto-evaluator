/// <reference types="react" />
export declare function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): import("react").MutableRefObject<T>;
//# sourceMappingURL=use-event-listener.d.ts.map