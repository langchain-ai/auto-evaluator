import React from 'react';
export interface PopoverTargetProps {
    /** Target element */
    children: React.ReactNode;
    /** Key of the prop that should be used to get element ref */
    refProp?: string;
    /** Popup accessible type, 'dialog' by default */
    popupType?: string;
}
export declare const PopoverTarget: React.ForwardRefExoticComponent<PopoverTargetProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=PopoverTarget.d.ts.map