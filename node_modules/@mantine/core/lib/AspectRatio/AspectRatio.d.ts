import React from 'react';
import { DefaultProps } from '@mantine/styles';
export interface AspectRatioProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Aspect ratio, e.g. 16 / 9, 4 / 3, 1920 / 1080 */
    ratio: number;
}
export declare const AspectRatio: React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AspectRatio.d.ts.map