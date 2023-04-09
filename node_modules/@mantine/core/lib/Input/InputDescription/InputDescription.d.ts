import React from 'react';
import { DefaultProps, MantineSize, Selectors } from '@mantine/styles';
import useStyles from './InputDescription.styles';
export type InputDescriptionStylesNames = Selectors<typeof useStyles>;
export interface InputDescriptionProps extends DefaultProps<InputDescriptionStylesNames>, React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    /** Description content */
    children?: React.ReactNode;
    /** Predefined size */
    size?: MantineSize;
    __staticSelector?: string;
}
export declare const InputDescription: React.ForwardRefExoticComponent<InputDescriptionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InputDescription.d.ts.map