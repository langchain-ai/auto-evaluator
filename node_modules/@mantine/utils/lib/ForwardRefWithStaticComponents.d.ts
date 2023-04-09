/// <reference types="react" />
export type ForwardRefWithStaticComponents<Props extends Record<string, any>, Static extends Record<string, any>> = ((props: Props) => React.ReactElement) & Static & {
    displayName: string;
};
//# sourceMappingURL=ForwardRefWithStaticComponents.d.ts.map