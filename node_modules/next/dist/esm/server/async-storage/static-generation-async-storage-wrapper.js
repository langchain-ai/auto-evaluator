export class StaticGenerationAsyncStorageWrapper {
    wrap(storage, context, callback) {
        return StaticGenerationAsyncStorageWrapper.wrap(storage, context, callback);
    }
    /**
   * @deprecated instance method should be used in favor of the static method
   */ static wrap(storage, { pathname , renderOpts  }, callback) {
        /**
     * Rules of Static & Dynamic HTML:
     *
     *    1.) We must generate static HTML unless the caller explicitly opts
     *        in to dynamic HTML support.
     *
     *    2.) If dynamic HTML support is requested, we must honor that request
     *        or throw an error. It is the sole responsibility of the caller to
     *        ensure they aren't e.g. requesting dynamic HTML for an AMP page.
     *
     * These rules help ensure that other existing features like request caching,
     * coalescing, and ISR continue working as intended.
     */ const isStaticGeneration = !renderOpts.supportsDynamicHTML && !renderOpts.isBot;
        const store = {
            isStaticGeneration,
            pathname,
            incrementalCache: renderOpts.incrementalCache,
            isRevalidate: renderOpts.isRevalidate,
            isPrerendering: renderOpts.nextExport
        };
        renderOpts.store = store;
        return storage.run(store, callback, store);
    }
}

//# sourceMappingURL=static-generation-async-storage-wrapper.js.map