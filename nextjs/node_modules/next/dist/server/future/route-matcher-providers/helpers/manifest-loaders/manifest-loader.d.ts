export declare type Manifest = Record<string, string>;
export interface ManifestLoader {
    load(name: string): Manifest | null;
}
