/// <reference types="react" />
import { PortalProps } from './Portal';
export interface OptionalPortalProps extends PortalProps {
    /** Determines if children should be rendered in Portal */
    withinPortal?: boolean;
}
export declare function OptionalPortal({ withinPortal, children, ...others }: OptionalPortalProps): JSX.Element;
export declare namespace OptionalPortal {
    var displayName: string;
}
//# sourceMappingURL=OptionalPortal.d.ts.map