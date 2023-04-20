import React from 'react';
export interface CopyButtonProps {
    /** Function called with current status */
    children(payload: {
        copied: boolean;
        copy(): void;
    }): React.ReactNode;
    /** Value that should be copied to the clipboard */
    value: string;
    /** Copied status timeout in ms */
    timeout?: number;
}
export declare function CopyButton(props: CopyButtonProps): JSX.Element;
export declare namespace CopyButton {
    var displayName: string;
}
//# sourceMappingURL=CopyButton.d.ts.map