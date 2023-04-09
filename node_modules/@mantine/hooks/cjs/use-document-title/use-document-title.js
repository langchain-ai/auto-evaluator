'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useIsomorphicEffect = require('../use-isomorphic-effect/use-isomorphic-effect.js');

function useDocumentTitle(title) {
  useIsomorphicEffect.useIsomorphicEffect(() => {
    if (typeof title === "string" && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}

exports.useDocumentTitle = useDocumentTitle;
//# sourceMappingURL=use-document-title.js.map
