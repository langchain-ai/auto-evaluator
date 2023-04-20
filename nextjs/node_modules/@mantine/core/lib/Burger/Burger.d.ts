import React from 'react';
import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/styles';
import useStyles, { BurgerStylesParams } from './Burger.styles';
export type BurgerStylesNames = Selectors<typeof useStyles>;
export interface BurgerProps extends DefaultProps<BurgerStylesNames, BurgerStylesParams>, React.ComponentPropsWithoutRef<'button'> {
    variant?: string;
    /** Burger state: true for cross, false for burger */
    opened: boolean;
    /** Burger color value, not connected to theme.colors, defaults to theme.black with light color scheme and theme.white with dark */
    color?: string;
    /** Predefined burger size or number to set width and height */
    size?: MantineNumberSize;
    /** Transition duration in ms */
    transitionDuration?: number;
}
export declare const Burger: React.ForwardRefExoticComponent<BurgerProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Burger.d.ts.map