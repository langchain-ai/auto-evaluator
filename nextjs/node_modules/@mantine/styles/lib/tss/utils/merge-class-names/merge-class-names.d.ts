import type { EmotionCache } from '@emotion/cache';
import { useMantineProviderStyles } from '../../../theme/MantineProvider';
interface Input<T extends Record<string, string>> {
    cx(...classNames: any): string;
    classes: T;
    context: ReturnType<typeof useMantineProviderStyles>;
    classNames: Partial<T>;
    name: string | string[];
    cache: EmotionCache;
}
export declare function mergeClassNames<T extends Record<string, string>>({ cx, classes, context, classNames, name, cache, }: Input<T>): T;
export {};
//# sourceMappingURL=merge-class-names.d.ts.map