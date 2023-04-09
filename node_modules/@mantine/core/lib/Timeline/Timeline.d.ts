import React from 'react';
import { DefaultProps, MantineColor, MantineNumberSize, Selectors } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { TimelineItem, TimelineItemStylesNames } from './TimelineItem/TimelineItem';
import useStyles from './Timeline.styles';
export type TimelineStylesNames = Selectors<typeof useStyles> | TimelineItemStylesNames;
export interface TimelineProps extends DefaultProps<TimelineStylesNames>, React.ComponentPropsWithRef<'div'> {
    variant?: string;
    /** <Timeline.Item /> components only */
    children: React.ReactNode;
    /** Index of active element */
    active?: number;
    /** Active color from theme */
    color?: MantineColor;
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** Bullet size */
    bulletSize?: number | string;
    /** Timeline alignment */
    align?: 'right' | 'left';
    /** Line width */
    lineWidth?: number | string;
    /** Reverse active direction without reversing items */
    reverseActive?: boolean;
}
type TimelineComponent = ForwardRefWithStaticComponents<TimelineProps, {
    Item: typeof TimelineItem;
}>;
export declare const Timeline: TimelineComponent;
export {};
//# sourceMappingURL=Timeline.d.ts.map