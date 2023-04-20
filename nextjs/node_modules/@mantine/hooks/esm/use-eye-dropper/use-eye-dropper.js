import { useState, useCallback } from 'react';
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect.js';

function useEyeDropper() {
  const [supported, setSupported] = useState(false);
  useIsomorphicEffect(() => {
    setSupported(typeof window !== "undefined" && "EyeDropper" in window);
  }, []);
  const open = useCallback((options = {}) => {
    if (supported) {
      const eyeDropper = new window.EyeDropper();
      return eyeDropper.open(options);
    }
    return void 0;
  }, [supported]);
  return { supported, open };
}

export { useEyeDropper };
//# sourceMappingURL=use-eye-dropper.js.map
