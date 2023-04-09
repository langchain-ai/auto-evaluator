import type { AppType, DocumentType, NextComponentType } from '../shared/lib/utils';
import type { PageConfig, GetStaticPaths, GetServerSideProps, GetStaticProps } from 'next/types';
import { BuildManifest } from './get-page-files';
export declare type ManifestItem = {
    id: number | string;
    files: string[];
};
export declare type ReactLoadableManifest = {
    [moduleId: string]: ManifestItem;
};
export declare type LoadComponentsReturnType = {
    Component: NextComponentType;
    pageConfig: PageConfig;
    buildManifest: BuildManifest;
    subresourceIntegrityManifest?: Record<string, string>;
    reactLoadableManifest: ReactLoadableManifest;
    serverComponentManifest?: any;
    serverActionsManifest?: any;
    Document: DocumentType;
    App: AppType;
    getStaticProps?: GetStaticProps;
    getStaticPaths?: GetStaticPaths;
    getServerSideProps?: GetServerSideProps;
    ComponentMod: any;
    isAppPath?: boolean;
    pathname: string;
};
declare function loadDefaultErrorComponentsImpl(distDir: string): Promise<{
    App: any;
    Document: any;
    Component: any;
    pageConfig: {};
    buildManifest: any;
    reactLoadableManifest: {};
    ComponentMod: any;
    pathname: string;
}>;
declare function loadComponentsImpl({ distDir, pathname, hasServerComponents, isAppPath, }: {
    distDir: string;
    pathname: string;
    hasServerComponents: boolean;
    isAppPath: boolean;
}): Promise<LoadComponentsReturnType>;
export declare const loadComponents: typeof loadComponentsImpl;
export declare const loadDefaultErrorComponents: typeof loadDefaultErrorComponentsImpl;
export {};
