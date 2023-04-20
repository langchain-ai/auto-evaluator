'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useGuaranteedMemo(fn, deps) {
  const ref = React.useRef();
  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0) {
    ref.current = {
      v: fn(),
      prevDeps: [...deps]
    };
  }
  return ref.current.v;
}

exports.useGuaranteedMemo = useGuaranteedMemo;
//# sourceMappingURL=use-guaranteed-memo.js.map
