import React from 'react';
import { MantineTransition } from './transitions';
export interface TransitionProps {
    /** If set element will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean;
    /** Predefined transition name or transition styles */
    transition: MantineTransition;
    /** Transition duration in ms */
    duration?: number;
    /** Exit transition duration in ms */
    exitDuration?: number;
    /** Transition timing function, defaults to theme.transitionTimingFunction */
    timingFunction?: string;
    /** When true, component will be mounted */
    mounted: boolean;
    /** Render function with transition styles argument */
    children(styles: React.CSSProperties): React.ReactElement<any, any>;
    /** Calls when exit transition ends */
    onExited?: () => void;
    /** Calls when exit transition starts */
    onExit?: () => void;
    /** Calls when enter transition starts */
    onEnter?: () => void;
    /** Calls when enter transition ends */
    onEntered?: () => void;
}
export type TransitionOverride = Partial<Omit<TransitionProps, 'mounted'>>;
export declare function Transition({ keepMounted, transition, duration, exitDuration, mounted, children, timingFunction, onExit, onEntered, onEnter, onExited, }: TransitionProps): JSX.Element;
export declare namespace Transition {
    var displayName: string;
}
//# sourceMappingURL=Transition.d.ts.map