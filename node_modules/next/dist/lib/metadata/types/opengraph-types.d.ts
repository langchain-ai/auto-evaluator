import type { AbsoluteTemplateString, TemplateString } from './metadata-types';
export declare type OpenGraphType = 'article' | 'book' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'profile' | 'website' | 'video.tv_show' | 'video.other' | 'video.movie' | 'video.episode';
export declare type OpenGraph = OpenGraphWebsite | OpenGraphArticle | OpenGraphBook | OpenGraphProfile | OpenGraphMusicSong | OpenGraphMusicAlbum | OpenGraphMusicPlaylist | OpenGraphRadioStation | OpenGraphVideoMovie | OpenGraphVideoEpisode | OpenGraphVideoTVShow | OpenGraphVideoOther | OpenGraphMetadata;
declare type Locale = string;
declare type OpenGraphMetadata = {
    determiner?: 'a' | 'an' | 'the' | 'auto' | '';
    title?: string | TemplateString;
    description?: string;
    emails?: string | Array<string>;
    phoneNumbers?: string | Array<string>;
    faxNumbers?: string | Array<string>;
    siteName?: string;
    locale?: Locale;
    alternateLocale?: Locale | Array<Locale>;
    images?: OGImage | Array<OGImage>;
    audio?: OGAudio | Array<OGAudio>;
    videos?: OGVideo | Array<OGVideo>;
    url?: string | URL;
    countryName?: string;
    ttl?: number;
};
declare type OpenGraphWebsite = OpenGraphMetadata & {
    type: 'website';
};
declare type OpenGraphArticle = OpenGraphMetadata & {
    type: 'article';
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    authors?: null | string | URL | Array<string | URL>;
    section?: null | string;
    tags?: null | string | Array<string>;
};
declare type OpenGraphBook = OpenGraphMetadata & {
    type: 'book';
    isbn?: null | string;
    releaseDate?: null | string;
    authors?: null | string | URL | Array<string | URL>;
    tags?: null | string | Array<string>;
};
declare type OpenGraphProfile = OpenGraphMetadata & {
    type: 'profile';
    firstName?: null | string;
    lastName?: null | string;
    username?: null | string;
    gender?: null | string;
};
declare type OpenGraphMusicSong = OpenGraphMetadata & {
    type: 'music.song';
    duration?: null | number;
    albums?: null | string | URL | OGAlbum | Array<string | URL | OGAlbum>;
    musicians?: null | string | URL | Array<string | URL>;
};
declare type OpenGraphMusicAlbum = OpenGraphMetadata & {
    type: 'music.album';
    songs?: null | string | URL | OGSong | Array<string | URL | OGSong>;
    musicians?: null | string | URL | Array<string | URL>;
    releaseDate?: null | string;
};
declare type OpenGraphMusicPlaylist = OpenGraphMetadata & {
    type: 'music.playlist';
    songs?: null | string | URL | OGSong | Array<string | URL | OGSong>;
    creators?: null | string | URL | Array<string | URL>;
};
declare type OpenGraphRadioStation = OpenGraphMetadata & {
    type: 'music.radio_station';
    creators?: null | string | URL | Array<string | URL>;
};
declare type OpenGraphVideoMovie = OpenGraphMetadata & {
    type: 'video.movie';
    actors?: null | string | URL | OGActor | Array<string | URL | OGActor>;
    directors?: null | string | URL | Array<string | URL>;
    writers?: null | string | URL | Array<string | URL>;
    duration?: null | number;
    releaseDate?: null | string;
    tags?: null | string | Array<string>;
};
declare type OpenGraphVideoEpisode = OpenGraphMetadata & {
    type: 'video.episode';
    actors?: null | string | URL | OGActor | Array<string | URL | OGActor>;
    directors?: null | string | URL | Array<string | URL>;
    writers?: null | string | URL | Array<string | URL>;
    duration?: null | number;
    releaseDate?: null | string;
    tags?: null | string | Array<string>;
    series?: null | string | URL;
};
declare type OpenGraphVideoTVShow = OpenGraphMetadata & {
    type: 'video.tv_show';
};
declare type OpenGraphVideoOther = OpenGraphMetadata & {
    type: 'video.other';
};
declare type OGImage = string | OGImageDescriptor | URL;
declare type OGImageDescriptor = {
    url: string | URL;
    secureUrl?: string | URL;
    alt?: string;
    type?: string;
    width?: string | number;
    height?: string | number;
};
declare type OGAudio = string | OGAudioDescriptor | URL;
declare type OGAudioDescriptor = {
    url: string | URL;
    secure_url?: string | URL;
    type?: string;
};
declare type OGVideo = string | OGVideoDescriptor | URL;
declare type OGVideoDescriptor = {
    url: string | URL;
    secureUrl?: string | URL;
    type?: string;
    width?: string | number;
    height?: string | number;
};
export declare type ResolvedOpenGraph = ResolvedOpenGraphWebsite | ResolvedOpenGraphArticle | ResolvedOpenGraphBook | ResolvedOpenGraphProfile | ResolvedOpenGraphMusicSong | ResolvedOpenGraphMusicAlbum | ResolvedOpenGraphMusicPlaylist | ResolvedOpenGraphRadioStation | ResolvedOpenGraphVideoMovie | ResolvedOpenGraphVideoEpisode | ResolvedOpenGraphVideoTVShow | ResolvedOpenGraphVideoOther | ResolvedOpenGraphMetadata;
declare type ResolvedOpenGraphMetadata = {
    determiner?: 'a' | 'an' | 'the' | 'auto' | '';
    title?: AbsoluteTemplateString;
    description?: string;
    emails?: Array<string>;
    phoneNumbers?: Array<string>;
    faxNumbers?: Array<string>;
    siteName?: string;
    locale?: Locale;
    alternateLocale?: Array<Locale>;
    images?: Array<OGImage>;
    audio?: Array<OGAudio>;
    videos?: Array<OGVideo>;
    url: null | URL | string;
    countryName?: string;
    ttl?: number;
};
declare type ResolvedOpenGraphWebsite = ResolvedOpenGraphMetadata & {
    type: 'website';
};
declare type ResolvedOpenGraphArticle = ResolvedOpenGraphMetadata & {
    type: 'article';
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    authors?: Array<string>;
    section?: string;
    tags?: Array<string>;
};
declare type ResolvedOpenGraphBook = ResolvedOpenGraphMetadata & {
    type: 'book';
    isbn?: string;
    releaseDate?: string;
    authors?: Array<string>;
    tags?: Array<string>;
};
declare type ResolvedOpenGraphProfile = ResolvedOpenGraphMetadata & {
    type: 'profile';
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
};
declare type ResolvedOpenGraphMusicSong = ResolvedOpenGraphMetadata & {
    type: 'music.song';
    duration?: number;
    albums?: Array<OGAlbum>;
    musicians?: Array<string | URL>;
};
declare type ResolvedOpenGraphMusicAlbum = ResolvedOpenGraphMetadata & {
    type: 'music.album';
    songs?: Array<string | URL | OGSong>;
    musicians?: Array<string | URL>;
    releaseDate?: string;
};
declare type ResolvedOpenGraphMusicPlaylist = ResolvedOpenGraphMetadata & {
    type: 'music.playlist';
    songs?: Array<string | URL | OGSong>;
    creators?: Array<string | URL>;
};
declare type ResolvedOpenGraphRadioStation = ResolvedOpenGraphMetadata & {
    type: 'music.radio_station';
    creators?: Array<string | URL>;
};
declare type ResolvedOpenGraphVideoMovie = ResolvedOpenGraphMetadata & {
    type: 'video.movie';
    actors?: Array<string | URL | OGActor>;
    directors?: Array<string | URL>;
    writers?: Array<string | URL>;
    duration?: number;
    releaseDate?: string;
    tags?: Array<string>;
};
declare type ResolvedOpenGraphVideoEpisode = ResolvedOpenGraphMetadata & {
    type: 'video.episode';
    actors?: Array<string | URL | OGActor>;
    directors?: Array<string | URL>;
    writers?: Array<string | URL>;
    duration?: number;
    releaseDate?: string;
    tags?: Array<string>;
    series?: string | URL;
};
declare type ResolvedOpenGraphVideoTVShow = ResolvedOpenGraphMetadata & {
    type: 'video.tv_show';
};
declare type ResolvedOpenGraphVideoOther = ResolvedOpenGraphMetadata & {
    type: 'video.other';
};
declare type OGSong = {
    url: string | URL;
    disc?: number;
    track?: number;
};
declare type OGAlbum = {
    url: string | URL;
    disc?: number;
    track?: number;
};
declare type OGActor = {
    url: string | URL;
    role?: string;
};
export {};
