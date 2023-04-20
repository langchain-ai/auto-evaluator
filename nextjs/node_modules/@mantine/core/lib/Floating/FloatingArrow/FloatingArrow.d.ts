import React from 'react';
import { ArrowPosition, FloatingPosition } from '../types';
interface FloatingArrowProps extends React.ComponentPropsWithoutRef<'div'> {
    position: FloatingPosition;
    arrowSize: number;
    arrowOffset: number;
    arrowRadius: number;
    arrowPosition: ArrowPosition;
    arrowX: number;
    arrowY: number;
    visible: boolean;
}
export declare const FloatingArrow: React.ForwardRefExoticComponent<FloatingArrowProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=FloatingArrow.d.ts.map