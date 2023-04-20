import React from 'react';
import { VerticalSectionSharedProps } from '../VerticalSection/VerticalSection';
export interface FooterProps extends VerticalSectionSharedProps, React.ComponentPropsWithoutRef<'nav'> {
    /** Footer content */
    children: React.ReactNode;
}
export declare const Footer: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Footer.d.ts.map