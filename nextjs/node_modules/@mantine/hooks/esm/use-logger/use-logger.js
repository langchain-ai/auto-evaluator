import { useEffect } from 'react';
import { useDidUpdate } from '../use-did-update/use-did-update.js';

function useLogger(componentName, props) {
  useEffect(() => {
    console.log(`${componentName} mounted`, ...props);
    return () => console.log(`${componentName} unmounted`);
  }, []);
  useDidUpdate(() => {
    console.log(`${componentName} updated`, ...props);
  }, props);
  return null;
}

export { useLogger };
//# sourceMappingURL=use-logger.js.map
