import React from 'react';
import { MantineNumberSize, CSSObject, MantineTheme } from '@mantine/styles';
export interface MediaQueryProps {
    className?: string;
    /** Child that should be shown at given breakpoint, it must accept className prop */
    children: React.ReactNode;
    /** Styles applied to child when viewport is smaller than given breakpoint */
    smallerThan?: MantineNumberSize;
    /** Styles applied to child when viewport is larger than given breakpoint */
    largerThan?: MantineNumberSize;
    /** Any other media query */
    query?: string;
    /** Styles applied to child when breakpoint matches */
    styles: CSSObject | ((theme: MantineTheme) => CSSObject);
}
export declare function MediaQuery(props: MediaQueryProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export declare namespace MediaQuery {
    var displayName: string;
}
//# sourceMappingURL=MediaQuery.d.ts.map