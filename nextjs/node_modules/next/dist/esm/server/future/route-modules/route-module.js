// These are imported weirdly like this because of the way that the bundling
// works. We need to import the built files from the dist directory, but we
// can't do that directly because we need types from the source files. So we
// import the types from the source files and then import the built files.
const { requestAsyncStorage  } = require("next/dist/client/components/request-async-storage");
const { staticGenerationAsyncStorage  } = require("next/dist/client/components/static-generation-async-storage");
const serverHooks = require("next/dist/client/components/hooks-server-context");
const headerHooks = require("next/dist/client/components/headers");
const { staticGenerationBailout  } = require("next/dist/client/components/static-generation-bailout");
/**
 * RouteModule is the base class for all route modules. This class should be
 * extended by all route modules.
 */ export class RouteModule {
    /**
   * A reference to the request async storage.
   */ requestAsyncStorage = requestAsyncStorage;
    /**
   * A reference to the static generation async storage.
   */ staticGenerationAsyncStorage = staticGenerationAsyncStorage;
    /**
   * An interface to call server hooks which interact with the underlying
   * storage.
   */ serverHooks = serverHooks;
    /**
   * An interface to call header hooks which interact with the underlying
   * request storage.
   */ headerHooks = headerHooks;
    /**
   * An interface to call static generation bailout hooks which interact with
   * the underlying static generation storage.
   */ staticGenerationBailout = staticGenerationBailout;
    constructor({ userland  }){
        this.userland = userland;
    }
}

//# sourceMappingURL=route-module.js.map