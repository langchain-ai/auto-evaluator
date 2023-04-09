import { CSSProperties } from 'react';
import type { MantineColor, MantineGradient, MantineThemeBase } from '../../../types';
export interface VariantInput {
    variant: string;
    color?: MantineColor;
    gradient?: MantineGradient;
    primaryFallback?: boolean;
}
export interface VariantOutput {
    border: CSSProperties['borderColor'];
    background: CSSProperties['backgroundColor'];
    color: CSSProperties['color'];
    hover: CSSProperties['backgroundColor'];
}
export declare function variant(theme: MantineThemeBase): ({ variant, color, gradient, primaryFallback }: VariantInput) => VariantOutput;
//# sourceMappingURL=variant.d.ts.map