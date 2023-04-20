import React, { FunctionComponent } from 'react';
import { DefaultProps, MantineColor, Selectors, MantineSize, MantineNumberSize } from '@mantine/styles';
import useStyles from './Step.styles';
export type StepStylesNames = Selectors<typeof useStyles>;
export type StepFragmentComponent = FunctionComponent<{
    step: number;
}>;
export interface StepProps extends DefaultProps<StepStylesNames>, React.ComponentPropsWithoutRef<'button'> {
    variant?: string;
    /** Step index, controlled by Steps component **/
    step?: number;
    /** Step state, controlled by Steps component */
    state?: 'stepInactive' | 'stepProgress' | 'stepCompleted';
    /** Step color from theme.colors */
    color?: MantineColor;
    /** Should icon be displayed */
    withIcon?: boolean;
    /** Step icon, defaults to step index + 1 when rendered within Stepper */
    icon?: React.ReactNode | StepFragmentComponent;
    /** Step icon displayed when step is completed */
    completedIcon?: React.ReactNode | StepFragmentComponent;
    /** Step icon displayed when step is in progress */
    progressIcon?: React.ReactNode | StepFragmentComponent;
    /** Step label, render after icon */
    label?: React.ReactNode | StepFragmentComponent;
    /** Step description */
    description?: React.ReactNode | StepFragmentComponent;
    /** Icon wrapper size */
    iconSize?: number;
    /** Icon position relative to step body */
    iconPosition?: 'right' | 'left';
    /** Component size */
    size?: MantineSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** Indicates loading state on step */
    loading?: boolean;
    /** Set to false to disable clicks on step */
    allowStepClick?: boolean;
    /** Should step selection be allowed */
    allowStepSelect?: boolean;
    /** Static selector base */
    __staticSelector?: string;
    /** Component orientation */
    orientation?: 'vertical' | 'horizontal';
}
export declare const Step: React.ForwardRefExoticComponent<StepProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Step.d.ts.map