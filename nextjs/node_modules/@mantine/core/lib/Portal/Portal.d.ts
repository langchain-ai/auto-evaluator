import React, { ReactPortal } from 'react';
export interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
    /** Portal children, for example, modal or popover */
    children: React.ReactNode;
    /** Element where portal should be rendered, by default new div element is created and appended to document.body */
    target?: HTMLElement | string;
    /** Root element className */
    className?: string;
    /** Root element ref */
    innerRef?: React.MutableRefObject<HTMLDivElement>;
}
export declare function Portal(props: PortalProps): ReactPortal;
export declare namespace Portal {
    var displayName: string;
}
//# sourceMappingURL=Portal.d.ts.map