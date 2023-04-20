import { Selectors } from '@mantine/styles';
import React from 'react';
import { TransitionOverride } from '../../Transition';
import { OverlayProps } from '../../Overlay';
import useStyles from './ModalBaseOverlay.styles';
export type ModalBaseOverlayStylesNames = Selectors<typeof useStyles>;
export interface ModalBaseOverlayProps extends OverlayProps, Omit<React.ComponentPropsWithoutRef<'div'>, keyof OverlayProps> {
    /** Props added to Transition component */
    transitionProps?: TransitionOverride;
}
export declare const ModalBaseOverlay: React.ForwardRefExoticComponent<ModalBaseOverlayProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ModalBaseOverlay.d.ts.map