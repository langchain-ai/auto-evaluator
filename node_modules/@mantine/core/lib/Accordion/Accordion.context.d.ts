/// <reference types="react" />
import { MantineNumberSize, ClassNames, Styles } from '@mantine/styles';
import { AccordionChevronPosition, AccordionHeadingOrder, AccordionVariant } from './Accordion.types';
import type { AccordionStylesNames } from './Accordion';
interface AccordionContext {
    loop: boolean;
    transitionDuration: number;
    disableChevronRotation: boolean;
    chevronPosition: AccordionChevronPosition;
    chevronSize: number | string;
    order: AccordionHeadingOrder;
    chevron: React.ReactNode;
    variant: AccordionVariant;
    radius: MantineNumberSize;
    onChange(value: string): void;
    isItemActive(value: string): boolean;
    getControlId(value: string): string;
    getRegionId(value: string): string;
    classNames: ClassNames<AccordionStylesNames>;
    styles: Styles<AccordionStylesNames>;
    unstyled: boolean;
}
export declare const AccordionContextProvider: ({ children, value }: {
    value: AccordionContext;
    children: import("react").ReactNode;
}) => JSX.Element, useAccordionContext: () => AccordionContext;
export {};
//# sourceMappingURL=Accordion.context.d.ts.map