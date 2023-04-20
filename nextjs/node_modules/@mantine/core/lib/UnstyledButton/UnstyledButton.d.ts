import React from 'react';
import { DefaultProps } from '@mantine/styles';
export interface UnstyledButtonProps extends DefaultProps {
    variant?: string;
    children?: React.ReactNode;
}
export declare const _UnstyledButton: React.ForwardRefExoticComponent<UnstyledButtonProps & {
    component?: any;
} & React.RefAttributes<HTMLDivElement>>;
export declare const UnstyledButton: (<C = "button">(props: import("@mantine/utils").PolymorphicComponentProps<C, UnstyledButtonProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(UnstyledButtonProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof UnstyledButtonProps> & {
    ref?: any;
}) | (UnstyledButtonProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=UnstyledButton.d.ts.map