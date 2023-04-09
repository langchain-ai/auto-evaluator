import React from 'react';
import { ClassNames, Styles } from '@mantine/styles';
import { PopoverBaseProps, PopoverStylesNames, PopoverStylesParams } from '../Popover';
import { HoverCardDropdown } from './HoverCardDropdown/HoverCardDropdown';
export interface HoverCardProps extends PopoverBaseProps {
    variant?: string;
    /** HoverCard.Target and HoverCard.Dropdown components */
    children?: React.ReactNode;
    /** Initial opened state */
    initiallyOpened?: boolean;
    /** Called when dropdown is opened */
    onOpen?(): void;
    /** Called when dropdown is closed */
    onClose?(): void;
    /** Open delay in ms */
    openDelay?: number;
    /** Close delay in ms */
    closeDelay?: number;
    unstyled?: boolean;
    classNames?: ClassNames<PopoverStylesNames>;
    styles?: Styles<PopoverStylesNames, PopoverStylesParams>;
}
export declare function HoverCard(props: HoverCardProps): JSX.Element;
export declare namespace HoverCard {
    var displayName: string;
    var Target: React.ForwardRefExoticComponent<import("./HoverCardTarget/HoverCardTarget").HoverCardTargetProps & React.RefAttributes<HTMLElement>>;
    var Dropdown: typeof HoverCardDropdown;
}
//# sourceMappingURL=HoverCard.d.ts.map