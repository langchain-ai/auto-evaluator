import React from 'react';
import { MantineNumberSize, DefaultProps, Selectors } from '@mantine/styles';
import useStyles from './SliderRoot.styles';
export type SliderRootStylesNames = Selectors<typeof useStyles>;
export interface SliderRootProps extends DefaultProps<SliderRootStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    size: MantineNumberSize;
    children: React.ReactNode;
    disabled: boolean;
    variant: string;
}
export declare const SliderRoot: React.ForwardRefExoticComponent<SliderRootProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SliderRoot.d.ts.map