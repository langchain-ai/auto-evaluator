import React from 'react';
import { DefaultProps, MantineNumberSize, MantineSize } from '@mantine/styles';
export interface ContainerProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Predefined container max-width or number for max-width */
    size?: MantineNumberSize;
    /** If fluid is set to true, size prop is ignored and Container can expand to 100% of width */
    fluid?: boolean;
    /** Container sizes */
    sizes?: Record<MantineSize, number | string>;
}
export declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Container.d.ts.map