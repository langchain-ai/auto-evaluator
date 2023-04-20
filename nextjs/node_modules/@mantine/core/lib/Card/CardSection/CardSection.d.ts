import React from 'react';
import { DefaultProps } from '@mantine/styles';
export interface CardSectionProps extends DefaultProps {
    variant?: string;
    /** Determines whether section should have border */
    withBorder?: boolean;
    /** Determines whether section from inherit padding from Card */
    inheritPadding?: boolean;
}
export declare const _CardSection: React.ForwardRefExoticComponent<CardSectionProps & React.RefAttributes<HTMLDivElement>>;
export declare const CardSection: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, CardSectionProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(CardSectionProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof CardSectionProps> & {
    ref?: any;
}) | (CardSectionProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=CardSection.d.ts.map