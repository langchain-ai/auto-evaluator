import type { EmotionCache } from '@emotion/cache';
import type { CSS } from './types';
export declare const cssFactory: (params: {
    cache: EmotionCache;
}) => {
    css: CSS;
    cx: (...args: any) => string;
};
export declare function useCss(): {
    css: CSS;
    cx: (...args: any) => string;
};
//# sourceMappingURL=use-css.d.ts.map