/// <reference types="react" />
import type { ResolvedMetadata } from '../types/metadata-interface';
export declare function BasicMetadata({ metadata }: {
    metadata: ResolvedMetadata;
}): JSX.Element;
export declare function ItunesMeta({ itunes }: {
    itunes: ResolvedMetadata['itunes'];
}): JSX.Element | null;
export declare function FormatDetectionMeta({ formatDetection, }: {
    formatDetection: ResolvedMetadata['formatDetection'];
}): JSX.Element | null;
export declare function AppleWebAppMeta({ appleWebApp, }: {
    appleWebApp: ResolvedMetadata['appleWebApp'];
}): JSX.Element | null;
export declare function VerificationMeta({ verification, }: {
    verification: ResolvedMetadata['verification'];
}): JSX.Element | null;
