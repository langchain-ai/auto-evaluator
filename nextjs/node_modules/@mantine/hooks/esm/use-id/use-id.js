import { useState } from 'react';
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect.js';
import { useReactId } from './use-react-id.js';
import { randomId } from '../utils/random-id/random-id.js';

function useId(staticId) {
  const reactId = useReactId();
  const [uuid, setUuid] = useState(reactId);
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}

export { useId };
//# sourceMappingURL=use-id.js.map
