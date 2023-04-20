import React from 'react';
type Ref<T> = React.Dispatch<React.SetStateAction<T>> | React.ForwardedRef<T>;
export declare function mergeRefs<T = any>(...refs: Ref<T>[]): (node: T | null) => void;
export declare function useMergedRef<T = any>(...refs: Ref<T>[]): (node: T) => void;
export {};
//# sourceMappingURL=use-merged-ref.d.ts.map