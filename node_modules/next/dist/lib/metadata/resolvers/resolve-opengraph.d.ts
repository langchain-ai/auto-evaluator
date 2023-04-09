import type { Metadata, ResolvedMetadata } from '../types/metadata-interface';
import type { FieldResolverWithMetadataBase } from '../types/resolvers';
export declare function resolveOpenGraph(openGraph: Metadata['openGraph'], metadataBase: ResolvedMetadata['metadataBase']): ResolvedMetadata['openGraph'];
export declare const resolveTwitter: FieldResolverWithMetadataBase<'twitter'>;
