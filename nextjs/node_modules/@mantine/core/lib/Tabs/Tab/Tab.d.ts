import React from 'react';
import { DefaultProps, Selectors, MantineColor } from '@mantine/styles';
import useStyles from './Tab.styles';
export type TabStylesNames = Selectors<typeof useStyles>;
export interface TabProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
    /** Value that is used to connect Tab with associated panel */
    value: string;
    /** Tab label */
    children?: React.ReactNode;
    /** Section of content displayed after label */
    rightSection?: React.ReactNode;
    /** Section of content displayed before label */
    icon?: React.ReactNode;
    /** Key of theme.colors */
    color?: MantineColor;
}
export declare const Tab: React.ForwardRefExoticComponent<TabProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Tab.d.ts.map