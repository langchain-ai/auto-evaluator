import type { AbsoluteTemplateString, TemplateString } from './metadata-types';
export declare type Twitter = TwitterSummary | TwitterSummaryLargeImage | TwitterPlayer | TwitterApp | TwitterMetadata;
declare type TwitterMetadata = {
    site?: string;
    siteId?: string;
    creator?: string;
    creatorId?: string;
    description?: string;
    title?: string | TemplateString;
    images?: TwitterImage | Array<TwitterImage>;
};
declare type TwitterSummary = TwitterMetadata & {
    card: 'summary';
};
declare type TwitterSummaryLargeImage = TwitterMetadata & {
    card: 'summary_large_image';
};
declare type TwitterPlayer = TwitterMetadata & {
    card: 'player';
    players: TwitterPlayerDescriptor | Array<TwitterPlayerDescriptor>;
};
declare type TwitterApp = TwitterMetadata & {
    card: 'app';
    app: TwitterAppDescriptor;
};
export declare type TwitterAppDescriptor = {
    id: {
        iphone?: string | number;
        ipad?: string | number;
        googleplay?: string;
    };
    url?: {
        iphone?: string | URL;
        ipad?: string | URL;
        googleplay?: string | URL;
    };
    name?: string;
};
declare type TwitterImage = string | TwitterImageDescriptor | URL;
declare type TwitterImageDescriptor = {
    url: string | URL;
    alt?: string;
    secureUrl?: string | URL;
    type?: string;
    width?: string | number;
    height?: string | number;
};
declare type TwitterPlayerDescriptor = {
    playerUrl: string | URL;
    streamUrl: string | URL;
    width: number;
    height: number;
};
declare type ResolvedTwitterImage = {
    url: string | URL;
    alt?: string;
    secureUrl?: string | URL;
    type?: string;
    width?: string | number;
    height?: string | number;
};
declare type ResolvedTwitterSummary = {
    site: string | null;
    siteId: string | null;
    creator: string | null;
    creatorId: string | null;
    description: string | null;
    title: AbsoluteTemplateString;
    images?: Array<ResolvedTwitterImage>;
};
declare type ResolvedTwitterPlayer = ResolvedTwitterSummary & {
    players: Array<TwitterPlayerDescriptor>;
};
declare type ResolvedTwitterApp = ResolvedTwitterSummary & {
    app: TwitterAppDescriptor;
};
export declare type ResolvedTwitterMetadata = ({
    card: 'summary';
} & ResolvedTwitterSummary) | ({
    card: 'summary_large_image';
} & ResolvedTwitterSummary) | ({
    card: 'player';
} & ResolvedTwitterPlayer) | ({
    card: 'app';
} & ResolvedTwitterApp);
export {};
