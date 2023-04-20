import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './AccordionControl.styles';
export type AccordionControlStylesNames = Selectors<typeof useStyles>;
export interface AccordionControlProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
    /** Disables control button */
    disabled?: boolean;
    /** Custom chevron icon */
    chevron?: React.ReactNode;
    /** Control label */
    children?: React.ReactNode;
    /** Icon rendered next to label */
    icon?: React.ReactNode;
}
export declare const AccordionControl: React.ForwardRefExoticComponent<AccordionControlProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=AccordionControl.d.ts.map