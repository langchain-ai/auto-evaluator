import React from 'react';
import { DefaultProps, MantineNumberSize, MantineGradient, MantineColor, Variants } from '@mantine/styles';
import { ThemeIconStylesParams } from './ThemeIcon.styles';
export interface ThemeIconProps extends DefaultProps<never, ThemeIconStylesParams>, React.ComponentPropsWithoutRef<'div'> {
    /** Icon */
    children: React.ReactNode;
    /** Width and height of theme icon */
    size?: MantineNumberSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Icon color from theme */
    color?: MantineColor;
    /** Controls appearance */
    variant?: Variants<'filled' | 'light' | 'gradient' | 'outline' | 'default'>;
    /** Controls gradient settings in gradient variant only */
    gradient?: MantineGradient;
}
export declare const ThemeIcon: React.ForwardRefExoticComponent<ThemeIconProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ThemeIcon.d.ts.map