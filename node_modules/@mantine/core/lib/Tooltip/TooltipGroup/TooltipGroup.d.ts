import React from 'react';
export interface TooltipGroupProps {
    /** <Tooltip /> components */
    children: React.ReactNode;
    /** Open delay in ms */
    openDelay?: number;
    /** Close delay in ms */
    closeDelay?: number;
}
export declare function TooltipGroup({ children, openDelay, closeDelay }: TooltipGroupProps): JSX.Element;
export declare namespace TooltipGroup {
    var displayName: string;
}
//# sourceMappingURL=TooltipGroup.d.ts.map