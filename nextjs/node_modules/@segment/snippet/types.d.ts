declare module '@segment/snippet' {
    interface PageOptions {
        category?: string
        name?: string
        properties?: {
            [key: string]: string | number
        }
    }

    interface LoadOptions {
        integrations?: {
            All?: boolean
            [key: string]: boolean
        }
    }

    interface Options {
        /** The domain name where the analytics.js script is hosted. */
        host?: string
        /** The apiKey to load in the snippet. */
        apiKey?: string
        ajsPath?: string
        /**
         * The options to pass to `analytics.page`. if page is false, then the
         * `page()` call will be omitted.
         */
        page?: boolean | PageOptions
        /**
         * If set to false the `load()` call will be omitted. This is useful for if
         * you want dynamically control the load process on the client-side for
         * things like GDPR.
         */
        load?: boolean | LoadOptions
        /**
         * If useHostForBundles is set, the snippet will include the `_cdn` property
         * to tell Analytics JS where to fetch bundles from.
         */
        useHostForBundles?: boolean
    }

    /**
     * Returns the maxified version of the analytics.js snippet given a set of
     * options.
     */
    export function max(options?: Options): string

    /**
     * Returns the minified version of the snippet.
     */
    export function min(options?: Options): string
}

