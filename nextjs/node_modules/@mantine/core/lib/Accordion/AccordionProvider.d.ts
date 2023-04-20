import React from 'react';
import { MantineNumberSize, ClassNames, Styles } from '@mantine/styles';
import { AccordionValue, AccordionChevronPosition, AccordionHeadingOrder, AccordionVariant } from './Accordion.types';
import type { AccordionStylesNames } from './Accordion';
export interface AccordionProviderProps<Multiple extends boolean = false> {
    /** Base id, used to generate ids that connect labels with controls, by default generated randomly */
    id?: string;
    /** Determines whether arrow key presses should loop though items (first to last and last to first) */
    loop?: boolean;
    /** Accordion content */
    children: React.ReactNode;
    /** Determines whether multiple items can be opened at a time */
    multiple?: Multiple;
    /** Value for controlled component */
    value?: AccordionValue<Multiple>;
    /** Default value for uncontrolled component */
    defaultValue?: AccordionValue<Multiple>;
    /** Callback for controlled component */
    onChange?(value: AccordionValue<Multiple>): void;
    /** Transition duration in ms, set 0 to disable transitions */
    transitionDuration?: number;
    /** Determines whether chevron rotation should be disabled */
    disableChevronRotation?: boolean;
    /** Determines position of the chevron */
    chevronPosition?: AccordionChevronPosition;
    /** Chevron size */
    chevronSize?: number | string;
    /** Heading order, has no effect on visuals */
    order?: AccordionHeadingOrder;
    /** Replaces chevron on all items */
    chevron?: React.ReactNode;
    /** Controls visuals */
    variant?: AccordionVariant;
    /** Key of theme.radius or any valid CSS value to set border-radius, ignored when variant="default" */
    radius?: MantineNumberSize;
}
interface _AccordionProviderProps<Multiple extends boolean = false> extends AccordionProviderProps<Multiple> {
    classNames?: ClassNames<AccordionStylesNames>;
    styles?: Styles<AccordionStylesNames>;
    unstyled?: boolean;
}
export declare function AccordionProvider<Multiple extends boolean = false>({ children, multiple, value, defaultValue, onChange, id, loop, transitionDuration, disableChevronRotation, chevronPosition, chevronSize, order, chevron, variant, radius, classNames, styles, unstyled, }: _AccordionProviderProps<Multiple>): JSX.Element;
export {};
//# sourceMappingURL=AccordionProvider.d.ts.map