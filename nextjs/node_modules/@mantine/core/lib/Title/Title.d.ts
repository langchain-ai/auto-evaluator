import React from 'react';
import { DefaultProps } from '@mantine/styles';
import { TextProps } from '../Text';
import { TitleStylesParams } from './Title.styles';
export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize = `h${TitleOrder}` | React.CSSProperties['fontSize'];
export interface TitleProps extends Omit<TextProps, 'size' | 'styles' | 'classNames' | 'span'>, DefaultProps<never, TitleStylesParams>, Omit<React.ComponentPropsWithoutRef<'h1'>, 'color'> {
    variant?: string;
    /** Defines component and styles which will be used */
    order?: TitleOrder;
    /** Title font-size: h1-h6 or any valid CSS font-size value */
    size?: TitleSize;
}
export declare const Title: React.ForwardRefExoticComponent<TitleProps & React.RefAttributes<HTMLHeadingElement>>;
//# sourceMappingURL=Title.d.ts.map