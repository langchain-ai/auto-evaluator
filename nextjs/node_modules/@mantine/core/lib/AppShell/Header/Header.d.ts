import React from 'react';
import { VerticalSectionSharedProps } from '../VerticalSection/VerticalSection';
export interface HeaderProps extends VerticalSectionSharedProps, React.ComponentPropsWithoutRef<'nav'> {
    /** Header content */
    children: React.ReactNode;
}
export declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Header.d.ts.map