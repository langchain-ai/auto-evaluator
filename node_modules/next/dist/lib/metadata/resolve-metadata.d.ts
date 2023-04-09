import type { Metadata, ResolvedMetadata, ResolvingMetadata } from './types/metadata-interface';
import type { MetadataImageModule } from '../../build/webpack/loaders/metadata/types';
import { LoaderTree } from '../../server/lib/app-dir-module';
import { ComponentsType } from '../../build/webpack/loaders/next-app-loader';
declare type StaticMetadata = Awaited<ReturnType<typeof resolveStaticMetadata>>;
declare type MetadataResolver = (_parent: ResolvingMetadata) => Metadata | Promise<Metadata>;
export declare type MetadataItems = [
    Metadata | MetadataResolver | null,
    StaticMetadata
][];
declare function resolveStaticMetadata(components: ComponentsType): Promise<{
    icon: MetadataImageModule[] | undefined;
    apple: MetadataImageModule[] | undefined;
    opengraph: MetadataImageModule[] | undefined;
    twitter: MetadataImageModule[] | undefined;
} | null>;
export declare function collectMetadata(loaderTree: LoaderTree, props: any, array: MetadataItems): Promise<void>;
export declare function accumulateMetadata(metadataItems: MetadataItems): Promise<ResolvedMetadata>;
export {};
