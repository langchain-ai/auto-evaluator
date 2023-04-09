import React from 'react';
import { MantineColor, MantineTheme, CSSObject } from '@mantine/styles';
import { TextProps } from '../Text/Text';
export interface HighlightProps extends TextProps {
    /** Substring or an array of substrings to highlight in children */
    highlight: string | string[];
    /** Color from theme that is used for highlighting */
    highlightColor?: MantineColor;
    /** Styles applied to highlighted part */
    highlightStyles?: CSSObject | ((theme: MantineTheme) => CSSObject);
    /** Full string part of which will be highlighted */
    children: string;
}
export declare const _Highlight: React.ForwardRefExoticComponent<HighlightProps & React.RefAttributes<HTMLDivElement>>;
export declare const Highlight: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, HighlightProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(HighlightProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof HighlightProps> & {
    ref?: any;
}) | (HighlightProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Highlight.d.ts.map