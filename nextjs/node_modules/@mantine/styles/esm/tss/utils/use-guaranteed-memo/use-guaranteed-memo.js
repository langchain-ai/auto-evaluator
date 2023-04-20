import { useRef } from 'react';

function useGuaranteedMemo(fn, deps) {
  const ref = useRef();
  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0) {
    ref.current = {
      v: fn(),
      prevDeps: [...deps]
    };
  }
  return ref.current.v;
}

export { useGuaranteedMemo };
//# sourceMappingURL=use-guaranteed-memo.js.map
