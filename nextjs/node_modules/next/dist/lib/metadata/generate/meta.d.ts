import React from 'react';
export declare function Meta({ name, property, content, media, }: {
    name?: string;
    property?: string;
    media?: string;
    content: string | number | URL | null | undefined;
}): React.ReactElement | null;
declare type ExtendMetaContent = Record<string, undefined | string | URL | number | boolean | null | undefined>;
declare type MultiMetaContent = (ExtendMetaContent | string | URL | number)[] | null | undefined;
export declare function MultiMeta({ propertyPrefix, namePrefix, contents, }: {
    propertyPrefix?: string;
    namePrefix?: string;
    contents?: MultiMetaContent | null;
}): JSX.Element | null;
export {};
