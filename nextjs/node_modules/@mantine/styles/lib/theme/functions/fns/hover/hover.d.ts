import type { CSSObject } from '../../../../tss';
export declare function hover(hoverStyle: CSSObject): {
    '@media (hover: hover)': {
        '&:hover': CSSObject;
    };
    '@media (hover: none)': {
        '&:active': CSSObject;
    };
};
//# sourceMappingURL=hover.d.ts.map