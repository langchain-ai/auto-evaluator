import { TypeCheckResult } from './typescript/runTypeCheck';
export declare function verifyTypeScriptSetup({ dir, distDir, cacheDir, intentDirs, tsconfigPath, typeCheckPreflight, disableStaticImages, isAppDirEnabled, hasPagesDir, }: {
    dir: string;
    distDir: string;
    cacheDir?: string;
    tsconfigPath: string;
    intentDirs: string[];
    typeCheckPreflight: boolean;
    disableStaticImages: boolean;
    isAppDirEnabled: boolean;
    hasPagesDir: boolean;
}): Promise<{
    result?: TypeCheckResult;
    version: string | null;
}>;
