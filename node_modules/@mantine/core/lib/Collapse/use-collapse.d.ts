import React from 'react';
export declare function getElementHeight(el: React.RefObject<HTMLElement> | {
    current?: {
        scrollHeight: number;
    };
}): number | "auto";
interface UseCollapse {
    opened: boolean;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    onTransitionEnd?: () => void;
}
interface GetCollapseProps {
    [key: string]: unknown;
    style?: React.CSSProperties;
    onTransitionEnd?: (e: TransitionEvent) => void;
    refKey?: string;
    ref?: React.MutableRefObject<HTMLDivElement> | ((node: HTMLDivElement) => void);
}
export declare function useCollapse({ transitionDuration, transitionTimingFunction, onTransitionEnd, opened, }: UseCollapse): (props: GetCollapseProps) => Record<string, any>;
export {};
//# sourceMappingURL=use-collapse.d.ts.map