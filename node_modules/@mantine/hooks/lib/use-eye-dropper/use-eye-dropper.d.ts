interface EyeDropperOpenOptions {
    signal?: AbortSignal;
}
export interface EyeDropperOpenReturnType {
    sRGBHex: string;
}
export declare function useEyeDropper(): {
    supported: boolean;
    open: (options?: EyeDropperOpenOptions) => Promise<EyeDropperOpenReturnType>;
};
export {};
//# sourceMappingURL=use-eye-dropper.d.ts.map