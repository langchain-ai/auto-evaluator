import type { MantineTheme, ContextStylesParams } from '../theme';
import type { CSSObject } from './types';
export interface UseStylesOptions<Key extends string> {
    classNames?: Partial<Record<Key, string>>;
    styles?: Partial<Record<Key, CSSObject>> | ((theme: MantineTheme, params: any, context: ContextStylesParams) => Partial<Record<Key, CSSObject>>);
    name: string | string[];
    unstyled?: boolean;
    variant?: string;
    size?: number | string;
}
interface Variations {
    variant?: string;
    size: string | number;
}
export declare function createStyles<Key extends string = string, Params = void, Input extends Record<Key, CSSObject> = Record<Key, CSSObject>>(input: ((theme: MantineTheme, params: Params, variations: Variations) => Input) | Input): (params: Params, options?: UseStylesOptions<Key>) => {
    classes: { [key in keyof Input]: string; };
    cx: (...args: any) => string;
    theme: MantineTheme;
};
export {};
//# sourceMappingURL=create-styles.d.ts.map