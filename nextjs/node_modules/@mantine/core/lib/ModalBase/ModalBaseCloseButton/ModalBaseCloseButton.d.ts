import React from 'react';
import { Selectors } from '@mantine/styles';
import { CloseButtonProps } from '../../CloseButton';
import useStyles from './ModalBaseCloseButton.styles';
export type ModalBaseCloseButtonStylesNames = Selectors<typeof useStyles>;
export interface ModalBaseCloseButtonProps extends CloseButtonProps, Omit<React.ComponentPropsWithoutRef<'button'>, keyof CloseButtonProps> {
}
export declare const ModalBaseCloseButton: React.ForwardRefExoticComponent<ModalBaseCloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ModalBaseCloseButton.d.ts.map