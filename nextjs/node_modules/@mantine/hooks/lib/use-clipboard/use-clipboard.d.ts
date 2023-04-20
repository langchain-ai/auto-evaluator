export declare function useClipboard({ timeout }?: {
    timeout?: number;
}): {
    copy: (valueToCopy: any) => void;
    reset: () => void;
    error: Error;
    copied: boolean;
};
//# sourceMappingURL=use-clipboard.d.ts.map