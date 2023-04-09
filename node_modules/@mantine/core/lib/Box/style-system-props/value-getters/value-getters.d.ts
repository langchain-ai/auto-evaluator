import { getColorValue } from './get-color-value';
import { getSizeValue, identity } from './get-default-value';
import { getFontSizeValue } from './get-font-size-value';
import { getSpacingValue } from './get-spacing-value';
export declare const valueGetters: {
    identity: typeof identity;
    color: typeof getColorValue;
    size: typeof getSizeValue;
    fontSize: typeof getFontSizeValue;
    spacing: typeof getSpacingValue;
};
export type SystemValueType = keyof typeof valueGetters;
//# sourceMappingURL=value-getters.d.ts.map