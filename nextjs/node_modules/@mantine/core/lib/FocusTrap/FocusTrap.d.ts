import React from 'react';
export interface FocusTrapProps {
    /** Element at which focus should be trapped, should support ref prop */
    children: any;
    /** Determines whether focus should be trapped within child element */
    active?: boolean;
    /** Prop that should be used to access component ref */
    refProp?: string;
}
export declare function FocusTrap({ children, active, refProp, }: FocusTrapProps): React.ReactElement;
export declare namespace FocusTrap {
    var displayName: string;
}
//# sourceMappingURL=FocusTrap.d.ts.map