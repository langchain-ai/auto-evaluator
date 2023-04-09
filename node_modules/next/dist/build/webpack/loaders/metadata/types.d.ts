export declare type ComponentModule = () => any;
export declare type ModuleReference = [
    componentModule: ComponentModule,
    filePath: string
];
export declare type CollectingMetadata = {
    icon: string[];
    apple: string[];
    twitter: string[];
    opengraph: string[];
};
export declare type CollectedMetadata = {
    icon: ComponentModule[];
    apple: ComponentModule[];
    twitter: ComponentModule[] | null;
    opengraph: ComponentModule[] | null;
};
export declare type MetadataImageModule = {
    url: string;
    type?: string;
} & ({
    sizes?: string;
} | {
    width?: number;
    height?: number;
});
