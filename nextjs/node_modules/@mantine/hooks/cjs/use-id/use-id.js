'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useIsomorphicEffect = require('../use-isomorphic-effect/use-isomorphic-effect.js');
var useReactId = require('./use-react-id.js');
var randomId = require('../utils/random-id/random-id.js');

function useId(staticId) {
  const reactId = useReactId.useReactId();
  const [uuid, setUuid] = React.useState(reactId);
  useIsomorphicEffect.useIsomorphicEffect(() => {
    setUuid(randomId.randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}

exports.useId = useId;
//# sourceMappingURL=use-id.js.map
