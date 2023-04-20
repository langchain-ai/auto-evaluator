import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { VerticalSectionHeight, VerticalSectionPosition } from './VerticalSection.styles';
export interface VerticalSectionSharedProps extends DefaultProps {
    variant?: string;
    /** Section content */
    children: React.ReactNode;
    /** Component height with breakpoints */
    height: VerticalSectionHeight;
    /** Determines whether the element should have border */
    withBorder?: boolean;
    /** Changes position to fixed, controlled by AppShell component if rendered inside */
    fixed?: boolean;
    /** Control top, left, right or bottom position values, controlled by AppShell component if rendered inside */
    position?: VerticalSectionPosition;
    /** z-index */
    zIndex?: React.CSSProperties['zIndex'];
}
interface VerticalSectionProps extends VerticalSectionSharedProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
    section: 'header' | 'footer';
    __staticSelector: string;
}
export declare const VerticalSection: React.ForwardRefExoticComponent<VerticalSectionProps & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=VerticalSection.d.ts.map