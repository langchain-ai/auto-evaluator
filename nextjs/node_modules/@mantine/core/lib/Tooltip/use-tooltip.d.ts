/// <reference types="react" />
import { FloatingPosition } from '../Floating';
interface UseTooltip {
    position: FloatingPosition;
    closeDelay: number;
    openDelay: number;
    onPositionChange?(position: FloatingPosition): void;
    opened?: boolean;
    offset: number;
    arrowRef?: React.RefObject<HTMLDivElement>;
    arrowOffset: number;
    events: {
        hover: boolean;
        focus: boolean;
        touch: boolean;
    };
    positionDependencies: any[];
    inline: boolean;
}
export declare function useTooltip(settings: UseTooltip): {
    x: number;
    y: number;
    arrowX: number;
    arrowY: number;
    reference: (node: import("@floating-ui/react").ReferenceType) => void;
    floating: (node: HTMLElement) => void;
    getFloatingProps: (userProps?: import("react").HTMLProps<HTMLElement>) => Record<string, unknown>;
    getReferenceProps: (userProps?: import("react").HTMLProps<Element>) => Record<string, unknown>;
    isGroupPhase: boolean;
    opened: boolean;
    placement: import("@floating-ui/react").Placement;
};
export {};
//# sourceMappingURL=use-tooltip.d.ts.map