import React from 'react';
import { DefaultProps, MantineNumberSize, MantineColor, Selectors } from '@mantine/styles';
import useStyles from './Marks.styles';
export type MarksStylesNames = Selectors<typeof useStyles>;
export interface MarksProps extends DefaultProps<MarksStylesNames> {
    marks: {
        value: number;
        label?: React.ReactNode;
    }[];
    size: MantineNumberSize;
    color: MantineColor;
    min: number;
    max: number;
    value: number;
    onChange(value: number): void;
    offset?: number;
    disabled: boolean;
    inverted?: boolean;
    variant: string;
}
export declare function Marks({ marks, color, size, min, max, value, classNames, styles, offset, onChange, disabled, unstyled, inverted, variant, }: MarksProps): JSX.Element;
export declare namespace Marks {
    var displayName: string;
}
//# sourceMappingURL=Marks.d.ts.map