/// <reference types="react" />
import type { CSSObject } from './types';
import type { MantineTheme } from '../theme/types';
type EmotionStyles = CSSObject | CSSObject[];
interface GlobalStylesProps {
    styles: EmotionStyles | ((theme: MantineTheme) => EmotionStyles);
}
export declare function Global({ styles }: GlobalStylesProps): JSX.Element;
export {};
//# sourceMappingURL=Global.d.ts.map