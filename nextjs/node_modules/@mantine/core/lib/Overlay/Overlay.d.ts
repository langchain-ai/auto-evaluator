import React from 'react';
import { DefaultProps, MantineNumberSize } from '@mantine/styles';
import { OverlayStylesParams } from './Overlay.styles';
export interface OverlayProps extends DefaultProps<never, OverlayStylesParams> {
    variant?: string;
    /** Overlay background-color opacity 0–1, disregarded when gradient prop is set, 0.6 by default */
    opacity?: number;
    /** Overlay background-color, #000 by default */
    color?: React.CSSProperties['backgroundColor'];
    /** Overlay background blur, 0 by default */
    blur?: number | string;
    /** Changes overlay to gradient, if set color prop is ignored */
    gradient?: string;
    /** Overlay z-index, 200 by default */
    zIndex?: React.CSSProperties['zIndex'];
    /** Key of theme.radius or any valid CSS value to set border-radius, theme.defaultRadius by default */
    radius?: MantineNumberSize;
    /** Content rendered inside overlay */
    children?: React.ReactNode;
    /** Determines whether content inside overlay should be vertically and horizontally centered, false by default */
    center?: boolean;
    /** Determines whether overlay should have fixed position instead of absolute, false by default */
    fixed?: boolean;
}
export declare const Overlay: (<C = "div">(props: import("@mantine/utils").PolymorphicComponentProps<C, OverlayProps>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>) & Omit<React.FunctionComponent<(OverlayProps & {
    component?: any;
} & Omit<Pick<any, string | number | symbol>, "component" | keyof OverlayProps> & {
    ref?: any;
}) | (OverlayProps & {
    component: React.ElementType<any>;
})>, never> & Record<string, never>;
//# sourceMappingURL=Overlay.d.ts.map