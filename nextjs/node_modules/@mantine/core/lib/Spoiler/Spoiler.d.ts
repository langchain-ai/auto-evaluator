import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles, { SpoilerStylesParams } from './Spoiler.styles';
export type SpoilerStylesNames = Selectors<typeof useStyles>;
export interface SpoilerProps extends DefaultProps<SpoilerStylesNames, SpoilerStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Max height of visible content, when this point is reached spoiler appears */
    maxHeight: number;
    /** Label for close spoiler action */
    hideLabel: React.ReactNode;
    /** Label for open spoiler action */
    showLabel: React.ReactNode;
    /** Get ref of spoiler toggle button */
    controlRef?: React.ForwardedRef<HTMLButtonElement>;
    /** Initial spoiler state, true to wrap content in spoiler, false to show content without spoiler, opened state will be updated on mount */
    initialState?: boolean;
    /** Spoiler reveal transition duration in ms, 0 or null to turn off animation */
    transitionDuration?: number;
}
export declare const Spoiler: React.ForwardRefExoticComponent<SpoilerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Spoiler.d.ts.map