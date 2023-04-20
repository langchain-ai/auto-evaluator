import React from 'react';
import { DefaultProps, MantineSize, Selectors, MantineColor } from '@mantine/styles';
import { RatingItemStylesNames } from './RatingItem/RatingItem';
import useStyles from './Rating.styles';
export type RatingStylesNames = Selectors<typeof useStyles> | RatingItemStylesNames;
export interface RatingProps extends DefaultProps<RatingStylesNames>, Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
    variant?: string;
    /** Default value for uncontrolled component */
    defaultValue?: number;
    /** Value for controlled component */
    value?: number;
    /** Called when value changes */
    onChange?(value: number): void;
    /** The icon that is displayed when symbol is empty */
    emptySymbol?: React.ReactNode | ((value: number) => React.ReactNode);
    /** This icon that is displayed when symbol is full */
    fullSymbol?: React.ReactNode | ((value: number) => React.ReactNode);
    /** Number of fractions each item can be divided into, 1 by default */
    fractions?: number;
    /** Controls component size */
    size?: MantineSize;
    /** Number of controls that should be rendered */
    count?: number;
    /** Called when item is hovered */
    onHover?(value: number): void;
    /** Function should return labelText for the symbols */
    getSymbolLabel?: (value: number) => string;
    /** Name of rating, should be unique within the page */
    name?: string;
    /** If true, you won't be able to interact */
    readOnly?: boolean;
    /** If true, only the selected symbol will change to full symbol */
    highlightSelectedOnly?: boolean;
    /** Key of theme.colors or any CSS color value, yellow by default */
    color?: MantineColor;
}
export declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Rating.d.ts.map