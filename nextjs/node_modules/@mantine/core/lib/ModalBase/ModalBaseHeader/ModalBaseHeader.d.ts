import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './ModalBaseHeader.styles';
export type ModalBaseHeaderStylesNames = Selectors<typeof useStyles>;
export interface ModalBaseHeaderProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
}
export declare const ModalBaseHeader: React.ForwardRefExoticComponent<ModalBaseHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ModalBaseHeader.d.ts.map