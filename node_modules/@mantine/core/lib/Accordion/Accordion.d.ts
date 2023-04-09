import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { AccordionProviderProps } from './AccordionProvider';
import { AccordionItemStylesNames } from './AccordionItem/AccordionItem';
import { AccordionControlStylesNames } from './AccordionControl/AccordionControl';
import { AccordionPanel, AccordionPanelStylesNames } from './AccordionPanel/AccordionPanel';
import { AccordionStylesParams } from './Accordion.types';
export type AccordionStylesNames = AccordionItemStylesNames | AccordionPanelStylesNames | AccordionControlStylesNames;
export interface AccordionProps<Multiple extends boolean = false> extends AccordionProviderProps<Multiple>, DefaultProps<AccordionStylesNames, AccordionStylesParams>, Omit<React.ComponentPropsWithoutRef<'div'>, keyof AccordionProviderProps<Multiple>> {
}
export declare function Accordion<Multiple extends boolean = false>(props: AccordionProps<Multiple>): JSX.Element;
export declare namespace Accordion {
    var Item: React.ForwardRefExoticComponent<import("./AccordionItem/AccordionItem").AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
    var Control: React.ForwardRefExoticComponent<import("./AccordionControl/AccordionControl").AccordionControlProps & React.RefAttributes<HTMLButtonElement>>;
    var Panel: typeof AccordionPanel;
    var displayName: string;
}
//# sourceMappingURL=Accordion.d.ts.map