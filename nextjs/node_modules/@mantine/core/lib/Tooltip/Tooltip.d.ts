import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { TooltipGroup } from './TooltipGroup/TooltipGroup';
import { TooltipFloating } from './TooltipFloating/TooltipFloating';
import { FloatingPosition, ArrowPosition } from '../Floating';
import { TransitionOverride } from '../Transition';
import { TooltipBaseProps } from './Tooltip.types';
export interface TooltipProps extends TooltipBaseProps {
    variant?: string;
    /** Called when tooltip position changes */
    onPositionChange?(position: FloatingPosition): void;
    /** Open delay in ms */
    openDelay?: number;
    /** Close delay in ms */
    closeDelay?: number;
    /** Controls opened state */
    opened?: boolean;
    /** Space between target element and tooltip */
    offset?: number;
    /** Determines whether component should have an arrow */
    withArrow?: boolean;
    /** Arrow size */
    arrowSize?: number;
    /** Arrow offset */
    arrowOffset?: number;
    /** Arrow radius */
    arrowRadius?: number;
    /** Arrow position **/
    arrowPosition?: ArrowPosition;
    /** Props added to Transition component that used to animate tooltip presence, use to configure duration and animation type, { duration: 100, transition: 'fade' } by default */
    transitionProps?: TransitionOverride;
    /** Determines which events will be used to show tooltip */
    events?: {
        hover: boolean;
        focus: boolean;
        touch: boolean;
    };
    /** useEffect dependencies to force update tooltip position */
    positionDependencies?: any[];
    /** Set if tooltip is attached to an inline element */
    inline?: boolean;
    /** If set tooltip will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean;
}
export declare const Tooltip: ForwardRefWithStaticComponents<TooltipProps, {
    Group: typeof TooltipGroup;
    Floating: typeof TooltipFloating;
}>;
//# sourceMappingURL=Tooltip.d.ts.map