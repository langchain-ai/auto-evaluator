import React from 'react';
import { DefaultProps, MantineColor, MantineNumberSize } from '@mantine/styles';
import { MantineTransition } from '../../Transition';
import { ThumbStylesNames } from '../Thumb/Thumb';
import { TrackStylesNames } from '../Track/Track';
import { MarksStylesNames } from '../Marks/Marks';
import { SliderRootStylesNames } from '../SliderRoot/SliderRoot';
export type SliderStylesNames = SliderRootStylesNames | ThumbStylesNames | TrackStylesNames | MarksStylesNames;
export interface SliderProps extends DefaultProps<SliderStylesNames>, Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
    variant?: string;
    /** Color from theme.colors */
    color?: MantineColor;
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** Controls size of track and thumb */
    size?: MantineNumberSize;
    /** Minimal possible value */
    min?: number;
    /** Maximum possible value */
    max?: number;
    /** Number by which value will be incremented/decremented with thumb drag and arrows */
    step?: number;
    /** Amount of digits after the decimal point */
    precision?: number;
    /** Current value for controlled slider */
    value?: number;
    /** Default value for uncontrolled slider */
    defaultValue?: number;
    /** Called each time value changes */
    onChange?(value: number): void;
    /** Called when user stops dragging slider or changes value with arrows */
    onChangeEnd?(value: number): void;
    /** Hidden input name, use with uncontrolled variant */
    name?: string;
    /** Marks which will be placed on the track */
    marks?: {
        value: number;
        label?: React.ReactNode;
    }[];
    /** Function to generate label or any react node to render instead, set to null to disable label */
    label?: React.ReactNode | ((value: number) => React.ReactNode);
    /** Label appear/disappear transition */
    labelTransition?: MantineTransition;
    /** Label appear/disappear transition duration in ms */
    labelTransitionDuration?: number;
    /** Label appear/disappear transition timing function, defaults to theme.transitionRimingFunction */
    labelTransitionTimingFunction?: string;
    /** If true label will be not be hidden when user stops dragging */
    labelAlwaysOn?: boolean;
    /** Thumb aria-label */
    thumbLabel?: string;
    /** If true slider label will appear on hover */
    showLabelOnHover?: boolean;
    /** Thumb children, can be used to add icon */
    thumbChildren?: React.ReactNode;
    /** Disables slider */
    disabled?: boolean;
    /** Thumb width and height */
    thumbSize?: number;
    /** A transformation function, to change the scale of the slider */
    scale?: (value: number) => number;
    /** Allows the track to be inverted */
    inverted?: boolean;
}
export declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Slider.d.ts.map