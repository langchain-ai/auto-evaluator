import React from 'react';
import { ActionIconProps } from '../ActionIcon/ActionIcon';
export interface CloseButtonProps extends Omit<ActionIconProps, 'children'>, Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
    /** Width and height of X icon */
    iconSize?: number | string;
}
export declare const _CloseButton: React.ForwardRefExoticComponent<CloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const CloseButton: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, CloseButtonProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(CloseButtonProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof CloseButtonProps> & {
    ref?: any;
}) | (CloseButtonProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=CloseButton.d.ts.map