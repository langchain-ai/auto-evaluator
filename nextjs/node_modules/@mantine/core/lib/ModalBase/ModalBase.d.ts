import React from 'react';
import { MantineNumberSize, ClassNames, Styles, MantineShadow, Selectors } from '@mantine/styles';
import { PortalProps } from '../Portal';
import { TransitionOverride } from '../Transition';
import { ModalBaseCloseButtonStylesNames } from './ModalBaseCloseButton/ModalBaseCloseButton';
import { ModalBaseOverlayStylesNames } from './ModalBaseOverlay/ModalBaseOverlay';
import { ModalBaseContentStylesNames } from './ModalBaseContent/ModalBaseContent';
import { ModalBaseHeaderStylesNames } from './ModalBaseHeader/ModalBaseHeader';
import { ModalBaseTitleStylesNames } from './ModalBaseTitle/ModalBaseTitle';
import { ModalBaseBodyStylesNames } from './ModalBaseBody/ModalBaseBody';
import useStyles from './ModalBase.styles';
export type ModalBaseStylesNames = Selectors<typeof useStyles> | ModalBaseCloseButtonStylesNames | ModalBaseOverlayStylesNames | ModalBaseContentStylesNames | ModalBaseHeaderStylesNames | ModalBaseTitleStylesNames | ModalBaseBodyStylesNames;
export interface ModalBaseSettings extends React.ComponentPropsWithoutRef<'div'> {
    variant?: string;
    classNames?: ClassNames<ModalBaseStylesNames>;
    styles?: Styles<ModalBaseStylesNames>;
    unstyled?: boolean;
    /** If set modal/drawer will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
    keepMounted?: boolean;
    /** Determines whether modal/drawer is opened */
    opened: boolean;
    /** Called when modal/drawer is closed */
    onClose(): void;
    /** Child component */
    children?: React.ReactNode;
    /** Determines whether the modal/drawer should be closed when user clicks on the overlay, true by default */
    closeOnClickOutside?: boolean;
    /** Props added to Transition component that used to animate overlay and body, use to configure duration and animation type, { duration: 200, transition: 'pop' } by default */
    transitionProps?: TransitionOverride;
    /** Determines whether component should be rendered inside Portal, true by default */
    withinPortal?: boolean;
    /** Props to pass down to the portal when withinPortal is true */
    portalProps?: Omit<PortalProps, 'target'>;
    /** Target element or selector where Portal should be rendered, by default new element is created and appended to the document.body */
    target?: HTMLElement | string;
    /** Determines whether scroll should be locked when opened={true}, defaults to true */
    lockScroll?: boolean;
    /** Determines whether focus should be trapped, true by default */
    trapFocus?: boolean;
    /** z-index CSS property of root element, 200 by default */
    zIndex?: number;
    /** Key of theme.spacing or any valid CSS value to set content, header and footer padding, 'md' by default */
    padding?: MantineNumberSize;
    /** Id used to connect modal/drawer with body and title */
    id?: string;
    /** Determines whether focus should be returned to the last active element onClose is called, true by default */
    returnFocus?: boolean;
    /** Determines whether onClose should be called when user presses escape key, true by default */
    closeOnEscape?: boolean;
    /** Controls content width, 'md' by default */
    size?: MantineNumberSize;
    /** Key of theme.shadows or any valid css box-shadow value, 'xl' by default */
    shadow?: MantineShadow;
}
export interface ModalBaseProps extends ModalBaseSettings {
    /** Base component name for styles and components default props */
    __staticSelector: string;
}
export declare const ModalBaseDefaultProps: Partial<ModalBaseProps>;
export declare function ModalBase(props: ModalBaseProps): JSX.Element;
export declare namespace ModalBase {
    var CloseButton: React.ForwardRefExoticComponent<import("./ModalBaseCloseButton/ModalBaseCloseButton").ModalBaseCloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
    var Overlay: React.ForwardRefExoticComponent<import("./ModalBaseOverlay/ModalBaseOverlay").ModalBaseOverlayProps & React.RefAttributes<HTMLDivElement>>;
    var Content: React.ForwardRefExoticComponent<import("./ModalBaseContent/ModalBaseContent").ModalBaseContentProps & React.RefAttributes<HTMLElement>>;
    var Header: React.ForwardRefExoticComponent<import("./ModalBaseHeader/ModalBaseHeader").ModalBaseHeaderProps & React.RefAttributes<HTMLDivElement>>;
    var Title: React.ForwardRefExoticComponent<import("./ModalBaseTitle/ModalBaseTitle").ModalBaseTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    var Body: React.ForwardRefExoticComponent<import("./ModalBaseBody/ModalBaseBody").ModalBaseBodyProps & React.RefAttributes<HTMLHeadingElement>>;
    var NativeScrollArea: typeof import("./NativeScrollArea/NativeScrollArea").NativeScrollArea;
}
//# sourceMappingURL=ModalBase.d.ts.map