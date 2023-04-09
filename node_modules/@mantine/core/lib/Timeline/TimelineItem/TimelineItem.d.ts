import React from 'react';
import { DefaultProps, MantineColor, Selectors, MantineNumberSize } from '@mantine/styles';
import useStyles from './TimelineItem.styles';
export type TimelineItemStylesNames = Selectors<typeof useStyles>;
export interface TimelineItemProps extends DefaultProps<TimelineItemStylesNames>, Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    variant?: string;
    /** Item title, rendered next to bullet */
    title?: React.ReactNode;
    /** React node that should be rendered inside bullet – icon, image, avatar, etc. */
    bullet?: React.ReactNode;
    /** Bullet width, height and border-radius, controlled by Timeline component */
    bulletSize?: number;
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** React node that will be rendered after title */
    children?: React.ReactNode;
    /** Should this item be highlighted, controlled by Timeline component */
    active?: boolean;
    /** Should line of this item be highlighted, controlled by Timeline component */
    lineActive?: boolean;
    /** Highlight color for active item */
    color?: MantineColor;
    /** Line and bullet position relative to item content, controlled by Timeline component */
    align?: 'right' | 'left';
    /** Line border style */
    lineVariant?: 'solid' | 'dashed' | 'dotted';
    /** Line border width, controlled by Timeline component */
    lineWidth?: number;
}
export declare const TimelineItem: React.ForwardRefExoticComponent<TimelineItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TimelineItem.d.ts.map