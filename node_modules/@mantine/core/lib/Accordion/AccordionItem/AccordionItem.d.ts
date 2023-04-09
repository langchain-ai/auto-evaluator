import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './AccordionItem.styles';
export type AccordionItemStylesNames = Selectors<typeof useStyles>;
export interface AccordionItemProps extends DefaultProps<AccordionItemStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    /** Value that is used to manage accordion state */
    value: string;
}
export declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AccordionItem.d.ts.map