import React from 'react';
import { DefaultProps, MantineColor } from '@mantine/styles';
export interface MarkProps extends DefaultProps, React.ComponentPropsWithoutRef<'mark'> {
    variant?: string;
    /** Background color from theme.colors */
    color?: MantineColor;
}
export declare const Mark: React.ForwardRefExoticComponent<MarkProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Mark.d.ts.map