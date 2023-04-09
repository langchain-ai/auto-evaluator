import React from 'react';
import { MantineColor, DefaultProps, MantineNumberSize, MantineSize, Selectors } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { Step, StepStylesNames, StepFragmentComponent } from './Step/Step';
import { StepCompleted } from './StepCompleted/StepCompleted';
import useStyles from './Stepper.styles';
export type StepperStylesNames = Selectors<typeof useStyles> | StepStylesNames;
export interface StepperProps extends DefaultProps<StepperStylesNames>, React.ComponentPropsWithRef<'div'> {
    variant?: string;
    /** <Stepper.Step /> components only */
    children: React.ReactNode;
    /** Called when step is clicked */
    onStepClick?(stepIndex: number): void;
    /** Active step index */
    active: number;
    /** Step icon, defaults to step index + 1 when rendered within Stepper */
    icon?: React.ReactNode | StepFragmentComponent;
    /** Step icon displayed when step is completed */
    completedIcon?: React.ReactNode | StepFragmentComponent;
    /** Step icon displayed when step is in progress */
    progressIcon?: React.ReactNode | StepFragmentComponent;
    /** Active and progress Step colors from theme.colors */
    color?: MantineColor;
    /** Step icon size */
    iconSize?: number;
    /** Key of theme.spacing or any valid CSS value to set content padding-top */
    contentPadding?: MantineNumberSize;
    /** Component orientation */
    orientation?: 'vertical' | 'horizontal';
    /** Icon position relative to step body */
    iconPosition?: 'right' | 'left';
    /** Component size */
    size?: MantineSize;
    /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
    radius?: MantineNumberSize;
    /** Breakpoint at which orientation will change from horizontal to vertical */
    breakpoint?: MantineNumberSize;
    /** Whether to enable click on upcoming steps by default. Defaults to true **/
    allowNextStepsSelect?: boolean;
}
type StepperComponent = ForwardRefWithStaticComponents<StepperProps, {
    Step: typeof Step;
    Completed: typeof StepCompleted;
}>;
export declare const Stepper: StepperComponent;
export {};
//# sourceMappingURL=Stepper.d.ts.map