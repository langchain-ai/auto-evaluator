import React from 'react';
import { ClassNames, MantineShadow, Styles, Selectors, DefaultProps } from '@mantine/styles';
import { PortalProps } from '../../Portal';
import { TransitionOverride } from '../../Transition';
import useStyles from './SelectPopover.styles';
export type SelectPopoverStylesNames = Selectors<typeof useStyles>;
interface SelectPopoverDropdownProps extends DefaultProps<SelectPopoverStylesNames> {
    children: React.ReactNode;
    id: string;
    component?: any;
    maxHeight?: number | string;
    direction?: React.CSSProperties['flexDirection'];
    innerRef?: React.MutableRefObject<HTMLDivElement>;
    __staticSelector?: string;
}
declare function SelectPopoverDropdown({ children, component, maxHeight, direction, id, innerRef, __staticSelector, styles, classNames, unstyled, ...others }: SelectPopoverDropdownProps): JSX.Element;
interface SelectPopoverProps {
    opened: boolean;
    transitionProps: TransitionOverride;
    shadow?: MantineShadow;
    withinPortal?: boolean;
    portalProps?: PortalProps;
    children: React.ReactNode;
    __staticSelector?: string;
    onDirectionChange?(direction: React.CSSProperties['flexDirection']): void;
    switchDirectionOnFlip?: boolean;
    zIndex?: React.CSSProperties['zIndex'];
    dropdownPosition?: 'bottom' | 'top' | 'flip';
    positionDependencies?: any[];
    classNames?: ClassNames<SelectPopoverStylesNames>;
    styles?: Styles<SelectPopoverStylesNames>;
    unstyled?: boolean;
    readOnly?: boolean;
    variant: string;
}
export declare function SelectPopover({ opened, transitionProps, shadow, withinPortal, portalProps, children, __staticSelector, onDirectionChange, switchDirectionOnFlip, zIndex, dropdownPosition, positionDependencies, classNames, styles, unstyled, readOnly, variant, }: SelectPopoverProps): JSX.Element;
export declare namespace SelectPopover {
    var Target: React.ForwardRefExoticComponent<import("../../Popover").PopoverTargetProps & React.RefAttributes<HTMLElement>>;
    var Dropdown: typeof SelectPopoverDropdown;
}
export {};
//# sourceMappingURL=SelectPopover.d.ts.map