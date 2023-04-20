import React from 'react';
import { DefaultProps, MantineColor, Selectors } from '@mantine/styles';
import useStyles from './RingProgress.styles';
export type RingProgressStylesNames = Selectors<typeof useStyles>;
interface RingProgressSection extends React.ComponentPropsWithRef<'circle'> {
    value: number;
    color: MantineColor;
    tooltip?: React.ReactNode;
}
export interface RingProgressProps extends DefaultProps<RingProgressStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Label displayed in the center of the ring */
    label?: React.ReactNode;
    /** Ring thickness */
    thickness?: number;
    /** Width and height of the progress ring */
    size?: number;
    /** Sets whether the edges of the progress circle are rounded */
    roundCaps?: boolean;
    /** Ring sections */
    sections: RingProgressSection[];
    /** Color of the root section, key of theme.colors or CSS color value */
    rootColor?: MantineColor;
}
export declare const RingProgress: React.ForwardRefExoticComponent<RingProgressProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=RingProgress.d.ts.map