/// <reference types="react" />
import { ModalBaseSettings } from '../../ModalBase';
import { ScrollAreaComponent } from '../Drawer.context';
export type DrawerPosition = 'bottom' | 'left' | 'right' | 'top';
export interface DrawerRootProps extends ModalBaseSettings {
    /** Scroll area component, ScrollArea.Autosize by default */
    scrollAreaComponent?: ScrollAreaComponent;
    /** Side of the screen where drawer will be opened, 'left' by default */
    position?: 'bottom' | 'left' | 'right' | 'top';
}
export declare function DrawerRoot(props: DrawerRootProps): JSX.Element;
//# sourceMappingURL=DrawerRoot.d.ts.map