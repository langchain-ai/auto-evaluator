import React from 'react';
import { Selectors, DefaultProps } from '@mantine/styles';
import useStyles from './AccordionPanel.styles';
export type AccordionPanelStylesNames = Selectors<typeof useStyles>;
export interface AccordionPanelProps extends DefaultProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'onTransitionEnd'> {
    /** Panel content */
    children?: React.ReactNode;
}
export declare function AccordionPanel(props: AccordionPanelProps): JSX.Element;
export declare namespace AccordionPanel {
    var displayName: string;
}
//# sourceMappingURL=AccordionPanel.d.ts.map