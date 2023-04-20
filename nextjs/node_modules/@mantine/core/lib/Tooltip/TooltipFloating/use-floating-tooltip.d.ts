import { FloatingPosition } from '../../Floating';
interface UseFloatingTooltip {
    offset: number;
    position: FloatingPosition;
}
export declare function useFloatingTooltip<T extends HTMLElement = any>({ offset, position, }: UseFloatingTooltip): {
    handleMouseMove: ({ clientX, clientY }: MouseEvent | React.MouseEvent<T, MouseEvent>) => void;
    x: number;
    y: number;
    opened: boolean;
    setOpened: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    boundaryRef: import("react").MutableRefObject<T>;
    floating: (node: HTMLElement) => void;
};
export {};
//# sourceMappingURL=use-floating-tooltip.d.ts.map