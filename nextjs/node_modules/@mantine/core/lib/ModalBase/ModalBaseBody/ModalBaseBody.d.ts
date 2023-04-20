import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './ModalBaseBody.styles';
export type ModalBaseBodyStylesNames = Selectors<typeof useStyles>;
export interface ModalBaseBodyProps extends DefaultProps, React.ComponentPropsWithoutRef<'h2'> {
}
export declare const ModalBaseBody: React.ForwardRefExoticComponent<ModalBaseBodyProps & React.RefAttributes<HTMLHeadingElement>>;
//# sourceMappingURL=ModalBaseBody.d.ts.map