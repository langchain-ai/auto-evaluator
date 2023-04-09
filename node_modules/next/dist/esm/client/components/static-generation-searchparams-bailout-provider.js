"use client";
import React from 'react';
import { createSearchParamsBailoutProxy } from './searchparams-bailout-proxy';

export default function StaticGenerationSearchParamsBailoutProvider({ Component , propsForComponent  }) {
    const searchParams = createSearchParamsBailoutProxy();
    return /*#__PURE__*/ React.createElement(Component, Object.assign({
        searchParams: searchParams
    }, propsForComponent));
};

//# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map