import React from 'react';
export declare function createSafeContext<ContextValue>(errorMessage: string): readonly [({ children, value }: {
    value: ContextValue;
    children: React.ReactNode;
}) => JSX.Element, () => ContextValue];
//# sourceMappingURL=create-safe-context.d.ts.map