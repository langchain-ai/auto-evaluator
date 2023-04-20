import React from 'react';
import { DefaultProps, MantineNumberSize, MantineColor, Selectors } from '@mantine/styles';
import { MantineTransition } from '../../Transition';
import useStyles from './Thumb.styles';
export type ThumbStylesNames = Selectors<typeof useStyles>;
export interface ThumbProps extends DefaultProps<ThumbStylesNames> {
    max: number;
    min: number;
    value: number;
    position: number;
    dragging: boolean;
    color: MantineColor;
    size: MantineNumberSize;
    label: React.ReactNode;
    onMouseDown(event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void;
    labelTransition?: MantineTransition;
    labelTransitionDuration?: number;
    labelTransitionTimingFunction?: string;
    labelAlwaysOn: boolean;
    thumbLabel: string;
    onFocus?(): void;
    onBlur?(): void;
    showLabelOnHover?: boolean;
    isHovered?: boolean;
    children?: React.ReactNode;
    disabled: boolean;
    thumbSize: number;
    variant: string;
}
export declare const Thumb: React.ForwardRefExoticComponent<ThumbProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Thumb.d.ts.map