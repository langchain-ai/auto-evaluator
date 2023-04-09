import React from 'react';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { HorizontalSectionSharedProps } from '../HorizontalSection/HorizontalSection';
import { Section } from '../HorizontalSection/Section/Section';
export interface NavbarProps extends HorizontalSectionSharedProps, React.ComponentPropsWithRef<'nav'> {
    /** Navbar content */
    children: React.ReactNode;
}
type NavbarComponent = ForwardRefWithStaticComponents<NavbarProps, {
    Section: typeof Section;
}>;
export declare const Navbar: NavbarComponent;
export {};
//# sourceMappingURL=Navbar.d.ts.map