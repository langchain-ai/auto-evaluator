import React from 'react';
import { ModalBaseContentProps } from '../../ModalBase';
import { ScrollAreaComponent } from '../Modal.context';
export interface ModalContentProps extends ModalBaseContentProps {
    /** Component used as scroll area, ScrollArea.Autosize by default */
    scrollAreaComponent?: ScrollAreaComponent;
}
export declare const ModalContent: React.ForwardRefExoticComponent<ModalContentProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ModalContent.d.ts.map