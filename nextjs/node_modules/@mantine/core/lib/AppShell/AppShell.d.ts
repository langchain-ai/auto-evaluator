import React from 'react';
import { MantineNumberSize, DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './AppShell.styles';
export type AppShellStylesNames = Selectors<typeof useStyles>;
export interface AppShellProps extends DefaultProps<AppShellStylesNames> {
    variant?: string;
    /** Determines how Navbar and Aside components are positioned relative to Header and Footer components */
    layout?: 'default' | 'alt';
    /** <Navbar /> component */
    navbar?: React.ReactElement;
    /** <Aside /> component */
    aside?: React.ReactElement;
    /** <Header /> component */
    header?: React.ReactElement;
    /** <Footer /> component */
    footer?: React.ReactElement;
    /** zIndex prop passed to Navbar and Header components */
    zIndex?: React.CSSProperties['zIndex'];
    /** true to switch from static layout to fixed */
    fixed?: boolean;
    /** true to hide all AppShell parts and render only children */
    hidden?: boolean;
    /** AppShell content */
    children: React.ReactNode;
    /** Content padding */
    padding?: MantineNumberSize;
    /** Breakpoint at which Navbar component should no longer be offset with padding-left, applicable only for fixed position */
    navbarOffsetBreakpoint?: MantineNumberSize;
    /** Breakpoint at which Aside component should no longer be offset with padding-right, applicable only for fixed position */
    asideOffsetBreakpoint?: MantineNumberSize;
}
export declare const AppShell: React.ForwardRefExoticComponent<AppShellProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AppShell.d.ts.map