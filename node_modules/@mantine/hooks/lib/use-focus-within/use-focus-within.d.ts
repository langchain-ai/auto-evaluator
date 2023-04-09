/// <reference types="react" />
export interface UseFocusWithinOptions {
    onFocus?(event: FocusEvent): void;
    onBlur?(event: FocusEvent): void;
}
export declare function useFocusWithin<T extends HTMLElement = any>({ onBlur, onFocus, }?: UseFocusWithinOptions): {
    ref: React.MutableRefObject<T>;
    focused: boolean;
};
//# sourceMappingURL=use-focus-within.d.ts.map