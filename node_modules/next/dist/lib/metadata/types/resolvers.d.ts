import { Metadata, ResolvedMetadata } from './metadata-interface';
export declare type FieldResolver<Key extends keyof Metadata> = (T: Metadata[Key]) => ResolvedMetadata[Key];
export declare type FieldResolverWithMetadataBase<Key extends keyof Metadata> = (T: Metadata[Key], metadataBase: ResolvedMetadata['metadataBase']) => ResolvedMetadata[Key];
