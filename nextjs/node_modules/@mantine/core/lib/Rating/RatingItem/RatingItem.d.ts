import React from 'react';
import { MantineSize, Selectors, DefaultProps, MantineColor } from '@mantine/styles';
import useStyles from './RatingItem.styles';
export type RatingItemStylesNames = Selectors<typeof useStyles>;
export interface RatingItemProps extends DefaultProps<RatingItemStylesNames>, Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'size'> {
    variant: string;
    size: MantineSize;
    getSymbolLabel: (value: number) => string;
    emptyIcon?: React.ReactNode | ((value: number) => React.ReactNode);
    fullIcon?: React.ReactNode | ((value: number) => React.ReactNode);
    color: MantineColor;
    full: boolean;
    active: boolean;
    fractionValue: number;
    value: number;
    id: string;
    onChange(event: React.ChangeEvent<HTMLInputElement> | number): void;
}
export declare function RatingItem({ size, getSymbolLabel, emptyIcon, fullIcon, full, active, value, readOnly, fractionValue, classNames, styles, unstyled, color, id, variant, onChange, ...others }: RatingItemProps): JSX.Element;
export declare namespace RatingItem {
    var displayName: string;
}
//# sourceMappingURL=RatingItem.d.ts.map