declare type FontOptions = {
    fontFamily: string;
    weights: string[];
    styles: string[];
    display: string;
    preload: boolean;
    selectedVariableAxes?: string[];
    fallback?: string[];
    adjustFontFallback: boolean;
    variable?: string;
    subsets: string[];
};
/**
 * Validate the data recieved from next-swc next_font_loaders on next/font/google calls
 */
export declare function validateGoogleFontFunctionCall(functionName: string, fontFunctionArgument: any, config: any): FontOptions;
export {};
