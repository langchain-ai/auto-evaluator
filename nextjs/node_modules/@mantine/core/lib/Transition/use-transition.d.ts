export type TransitionStatus = 'entered' | 'exited' | 'entering' | 'exiting' | 'pre-exiting' | 'pre-entering';
interface UseTransition {
    duration: number;
    exitDuration: number;
    timingFunction: string;
    mounted: boolean;
    onEnter?(): void;
    onExit?(): void;
    onEntered?(): void;
    onExited?(): void;
}
export declare function useTransition({ duration, exitDuration, timingFunction, mounted, onEnter, onExit, onEntered, onExited, }: UseTransition): {
    transitionDuration: number;
    transitionStatus: TransitionStatus;
    transitionTimingFunction: string;
};
export {};
//# sourceMappingURL=use-transition.d.ts.map