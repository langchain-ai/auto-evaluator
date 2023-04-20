export declare type CssVariable = `--${string}`;
export declare type Display = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
export declare type NextFont = {
    className: string;
    style: {
        fontFamily: string;
        fontWeight?: number;
        fontStyle?: string;
    };
};
export declare type NextFontWithVariable = NextFont & {
    variable: string;
};
