import React from 'react';
import { DefaultProps, MantineSize } from '@mantine/styles';
export interface KbdProps extends DefaultProps, React.ComponentPropsWithoutRef<'kbd'> {
    variant?: string;
    /** Keyboard key */
    children: React.ReactNode;
    /** Controls component size, 'sm' by default */
    size?: MantineSize;
}
export declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Kbd.d.ts.map