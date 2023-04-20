import React from 'react';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { HorizontalSectionSharedProps } from '../HorizontalSection/HorizontalSection';
import { Section } from '../HorizontalSection/Section/Section';
export interface AsideProps extends HorizontalSectionSharedProps, React.ComponentPropsWithRef<'nav'> {
    /** Aside content */
    children: React.ReactNode;
}
type AsideComponent = ForwardRefWithStaticComponents<AsideProps, {
    Section: typeof Section;
}>;
export declare const Aside: AsideComponent;
export {};
//# sourceMappingURL=Aside.d.ts.map