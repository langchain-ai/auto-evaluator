'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useIsomorphicEffect = require('../use-isomorphic-effect/use-isomorphic-effect.js');

function useEyeDropper() {
  const [supported, setSupported] = React.useState(false);
  useIsomorphicEffect.useIsomorphicEffect(() => {
    setSupported(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);
  const open = React.useCallback((options = {}) => {
    if (supported) {
      const eyeDropper = new window.EyeDropper();
      return eyeDropper.open(options);
    }
    return void 0;
  }, [supported]);
  return { supported, open };
}

exports.useEyeDropper = useEyeDropper;
//# sourceMappingURL=use-eye-dropper.js.map
