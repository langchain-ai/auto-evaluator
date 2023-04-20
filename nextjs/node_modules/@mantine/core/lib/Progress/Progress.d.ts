import React from 'react';
import { DefaultProps, MantineNumberSize, MantineColor, Selectors } from '@mantine/styles';
import useStyles, { ProgressStylesParams } from './Progress.styles';
export type ProgressStylesNames = Selectors<typeof useStyles>;
interface ProgressSection extends React.ComponentPropsWithRef<'div'> {
    value: number;
    color: MantineColor;
    label?: string;
    tooltip?: React.ReactNode;
}
export interface ProgressProps extends DefaultProps<ProgressStylesNames, ProgressStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Percent of filled bar (0-100) */
    value?: number;
    /** Progress color from theme */
    color?: MantineColor;
    /** Height of progress bar */
    size?: MantineNumberSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Adds stripes */
    striped?: boolean;
    /** Whether to animate striped progress bars */
    animate?: boolean;
    /** Text to be placed inside the progress bar */
    label?: string;
    /** Replaces value if present, renders multiple sections instead of single one */
    sections?: ProgressSection[];
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Progress.d.ts.map