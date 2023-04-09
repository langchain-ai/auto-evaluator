/// <reference types="react" />
import { FloatingAxesOffsets, FloatingPosition } from '../Floating';
import { PopoverWidth, PopoverMiddlewares } from './Popover.types';
interface UsePopoverOptions {
    offset: number | FloatingAxesOffsets;
    position: FloatingPosition;
    positionDependencies: any[];
    onPositionChange?(position: FloatingPosition): void;
    opened: boolean;
    defaultOpened: boolean;
    onChange(opened: boolean): void;
    onClose?(): void;
    onOpen?(): void;
    width: PopoverWidth;
    middlewares: PopoverMiddlewares;
    arrowRef: React.RefObject<HTMLDivElement>;
    arrowOffset: number;
}
export declare function usePopover(options: UsePopoverOptions): {
    floating: import("@floating-ui/react").UseFloatingReturn<import("@floating-ui/react").ReferenceType>;
    controlled: boolean;
    opened: boolean;
    onClose: () => void;
    onToggle: () => void;
};
export {};
//# sourceMappingURL=use-popover.d.ts.map