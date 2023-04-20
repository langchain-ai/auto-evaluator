import React from 'react';
import { ModalBaseOverlayProps, ModalBaseCloseButtonProps } from '../ModalBase';
import { DrawerRoot, DrawerRootProps } from './DrawerRoot/DrawerRoot';
export interface DrawerProps extends Omit<DrawerRootProps, 'title'> {
    /** Modal title */
    title?: React.ReactNode;
    /** Determines whether overlay should be rendered, true by default */
    withOverlay?: boolean;
    /** Props added to Overlay component, use configure opacity, background color, styles and other properties */
    overlayProps?: ModalBaseOverlayProps;
    /** Modal content */
    children?: React.ReactNode;
    /** Determines whether close button should be rendered, true by default */
    withCloseButton?: boolean;
    /** Props added to close button */
    closeButtonProps?: ModalBaseCloseButtonProps;
}
export declare function Drawer(props: DrawerProps): JSX.Element;
export declare namespace Drawer {
    var Root: typeof DrawerRoot;
    var CloseButton: React.ForwardRefExoticComponent<ModalBaseCloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
    var Overlay: React.ForwardRefExoticComponent<ModalBaseOverlayProps & React.RefAttributes<HTMLDivElement>>;
    var Content: React.ForwardRefExoticComponent<import("./DrawerContent/DrawerContent").DrawerContentProps & React.RefAttributes<HTMLElement>>;
    var Header: React.ForwardRefExoticComponent<import("../ModalBase").ModalBaseHeaderProps & React.RefAttributes<HTMLDivElement>>;
    var Title: React.ForwardRefExoticComponent<import("../ModalBase").ModalBaseTitleProps & React.RefAttributes<HTMLHeadingElement>>;
    var Body: React.ForwardRefExoticComponent<import("../ModalBase").ModalBaseBodyProps & React.RefAttributes<HTMLHeadingElement>>;
    var NativeScrollArea: typeof import("../ModalBase/NativeScrollArea/NativeScrollArea").NativeScrollArea;
}
//# sourceMappingURL=Drawer.d.ts.map