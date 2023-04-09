import React from 'react';
import { DefaultProps, MantineColor } from '@mantine/styles';
import { CodeStylesParams } from './Code.styles';
export interface CodeProps extends DefaultProps<never, CodeStylesParams>, React.ComponentPropsWithoutRef<'code'> {
    variant?: string;
    /** Code content */
    children: React.ReactNode;
    /** Code color and background from theme, defaults to gray in light theme and to dark in dark theme */
    color?: MantineColor;
    /** True for code block, false for inline code */
    block?: boolean;
}
export declare const Code: React.ForwardRefExoticComponent<CodeProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Code.d.ts.map