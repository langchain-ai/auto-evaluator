import React from 'react';
import { Selectors } from '@mantine/styles';
import { PaperProps } from '../../Paper';
import { TransitionOverride } from '../../Transition';
import useStyles from './ModalBaseContent.styles';
export type ModalBaseContentStylesNames = Selectors<typeof useStyles>;
export interface ModalBaseContentProps extends PaperProps, Omit<React.ComponentPropsWithoutRef<'div'>, keyof PaperProps> {
    /** Props added to Transition component */
    transitionProps?: TransitionOverride;
}
export declare const ModalBaseContent: React.ForwardRefExoticComponent<ModalBaseContentProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ModalBaseContent.d.ts.map