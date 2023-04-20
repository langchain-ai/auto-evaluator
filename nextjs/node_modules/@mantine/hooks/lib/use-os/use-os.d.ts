export type OS = 'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux';
interface UseOsOptions {
    getValueInEffect: boolean;
}
export declare function useOs(options?: UseOsOptions): OS;
export {};
//# sourceMappingURL=use-os.d.ts.map