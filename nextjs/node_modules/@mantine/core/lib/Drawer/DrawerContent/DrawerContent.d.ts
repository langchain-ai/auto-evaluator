import React from 'react';
import { ModalBaseContentProps } from '../../ModalBase';
import { ScrollAreaComponent } from '../Drawer.context';
export interface DrawerContentProps extends ModalBaseContentProps {
    /** Component used as scroll area, ScrollArea.Autosize by default */
    scrollAreaComponent?: ScrollAreaComponent;
}
export declare const DrawerContent: React.ForwardRefExoticComponent<DrawerContentProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=DrawerContent.d.ts.map