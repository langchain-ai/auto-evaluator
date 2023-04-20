export declare function useTimeout(callback: (...callbackParams: any[]) => void, delay: number, options?: {
    autoInvoke: boolean;
}): {
    start: (...callbackParams: any[]) => void;
    clear: () => void;
};
//# sourceMappingURL=use-timeout.d.ts.map