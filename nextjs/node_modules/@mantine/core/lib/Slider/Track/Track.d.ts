import React from 'react';
import { DefaultProps, MantineNumberSize, MantineColor, Selectors } from '@mantine/styles';
import { MarksStylesNames } from '../Marks/Marks';
import useStyles from './Track.styles';
export type TrackStylesNames = Selectors<typeof useStyles> | MarksStylesNames;
export interface TrackProps extends DefaultProps<TrackStylesNames> {
    filled: number;
    offset?: number;
    marksOffset?: number;
    marks: {
        value: number;
        label?: React.ReactNode;
    }[];
    size: MantineNumberSize;
    radius: MantineNumberSize;
    color: MantineColor;
    min: number;
    max: number;
    value: number;
    children: React.ReactNode;
    onChange(value: number): void;
    onMouseEnter?(event?: React.MouseEvent<HTMLDivElement>): void;
    onMouseLeave?(event?: React.MouseEvent<HTMLDivElement>): void;
    disabled: boolean;
    inverted?: boolean;
    variant: string;
}
export declare function Track({ filled, size, color, classNames, styles, radius, children, offset, onMouseLeave, onMouseEnter, disabled, marksOffset, unstyled, inverted, variant, ...others }: TrackProps): JSX.Element;
export declare namespace Track {
    var displayName: string;
}
//# sourceMappingURL=Track.d.ts.map