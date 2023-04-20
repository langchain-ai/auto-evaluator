/// <reference types="react" />
import type { ResolvedMetadata } from '../types/metadata-interface';
export declare function OpenGraphMetadata({ openGraph, }: {
    openGraph: ResolvedMetadata['openGraph'];
}): JSX.Element | null;
export declare function TwitterMetadata({ twitter, }: {
    twitter: ResolvedMetadata['twitter'];
}): JSX.Element | null;
export declare function AppLinksMeta({ appLinks, }: {
    appLinks: ResolvedMetadata['appLinks'];
}): JSX.Element | null;
