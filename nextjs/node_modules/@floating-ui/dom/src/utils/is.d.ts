declare global {
    interface Window {
        HTMLElement: any;
        Element: any;
        Node: any;
        ShadowRoot: any;
    }
}
export declare function isHTMLElement(value: any): value is HTMLElement;
export declare function isElement(value: any): value is Element;
export declare function isShadowRoot(node: Node): node is ShadowRoot;
export declare function isOverflowElement(element: Element): boolean;
export declare function isTableElement(element: Element): boolean;
export declare function isContainingBlock(element: Element): boolean;
/**
 * Determines whether or not `.getBoundingClientRect()` is affected by visual
 * viewport offsets. In Safari, the `x`/`y` offsets are values relative to the
 * visual viewport, while in other engines, they are values relative to the
 * layout viewport.
 */
export declare function isClientRectVisualViewportBased(): boolean;
export declare function isLastTraversableNode(node: Node): boolean;
