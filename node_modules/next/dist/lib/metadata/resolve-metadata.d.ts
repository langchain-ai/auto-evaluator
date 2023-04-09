import type { Metadata, ResolvedMetadata, ResolvingMetadata } from './types/metadata-interface';
import { LoaderTree } from '../../server/lib/app-dir-module';
import { ComponentsType } from '../../build/webpack/loaders/next-app-loader';
declare type StaticMetadata = Awaited<ReturnType<typeof resolveStaticMetadata>>;
declare type MetadataResolver = (_parent: ResolvingMetadata) => Metadata | Promise<Metadata>;
export declare type MetadataItems = [
    Metadata | MetadataResolver | null,
    StaticMetadata
][];
declare function resolveStaticMetadata(components: ComponentsType, props: any): Promise<{
    icon: any[] | undefined;
    apple: any[] | undefined;
    openGraph: any[] | undefined;
    twitter: any[] | undefined;
} | null>;
export declare function collectMetadata({ loaderTree, metadataItems: array, props, route, }: {
    loaderTree: LoaderTree;
    metadataItems: MetadataItems;
    props: any;
    route: string;
}): Promise<void>;
declare type MetadataAccumulationOptions = {
    pathname: string;
};
export declare function accumulateMetadata(metadataItems: MetadataItems, options: MetadataAccumulationOptions): Promise<ResolvedMetadata>;
export {};
