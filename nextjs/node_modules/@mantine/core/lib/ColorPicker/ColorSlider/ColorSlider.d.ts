import React from 'react';
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import { ThumbStylesNames } from '../Thumb/Thumb';
import useStyles from './ColorSlider.styles';
export type ColorSliderStylesNames = Exclude<Selectors<typeof useStyles>, 'sliderThumb'> | ThumbStylesNames;
export interface BaseColorSliderProps extends DefaultProps<ColorSliderStylesNames>, Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
    variant?: string;
    value: number;
    onChange(value: number): void;
    onChangeEnd(value: number): void;
    size?: MantineSize;
    focusable?: boolean;
    __staticSelector?: string;
}
export interface ColorSliderProps extends BaseColorSliderProps {
    maxValue: number;
    overlays: React.CSSProperties[];
    round: boolean;
    thumbColor?: string;
}
export declare const ColorSlider: React.ForwardRefExoticComponent<ColorSliderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ColorSlider.d.ts.map