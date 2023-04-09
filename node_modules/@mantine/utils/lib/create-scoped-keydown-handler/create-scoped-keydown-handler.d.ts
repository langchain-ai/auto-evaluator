/// <reference types="react" />
interface GetElementsSiblingsInput {
    /** Selector used to find parent node, e.g. '[role="tablist"]', '.mantine-Text-root' */
    parentSelector: string;
    /** Selector used to find element siblings, e.g. '[data-tab]' */
    siblingSelector: string;
    /** Determines whether next/previous indices should loop */
    loop?: boolean;
    /** Determines which arrow keys will be used */
    orientation: 'vertical' | 'horizontal';
    /** Text direction */
    dir?: 'rtl' | 'ltr';
    /** Determines whether element should be clicked when focused with keyboard event */
    activateOnFocus?: boolean;
    /** External keydown event */
    onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void;
}
export declare function createScopedKeydownHandler({ parentSelector, siblingSelector, onKeyDown, loop, activateOnFocus, dir, orientation, }: GetElementsSiblingsInput): (event: React.KeyboardEvent<HTMLButtonElement>) => void;
export {};
//# sourceMappingURL=create-scoped-keydown-handler.d.ts.map