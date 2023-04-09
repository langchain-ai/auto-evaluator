/// <reference types="react" />
import { MetadataItems } from './resolve-metadata';
export declare function MetadataTree({ metadata, pathname, }: {
    metadata: MetadataItems;
    pathname: string;
    allowFallbackMetadataBase: boolean;
}): Promise<JSX.Element>;
