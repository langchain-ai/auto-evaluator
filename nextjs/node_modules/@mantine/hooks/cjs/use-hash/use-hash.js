'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useWindowEvent = require('../use-window-event/use-window-event.js');

function useHash() {
  const [hash, setHashValue] = React.useState("");
  const setHash = (value) => {
    const valueWithHash = value.startsWith("#") ? value : `#${value}`;
    window.location.hash = valueWithHash;
    setHashValue(valueWithHash);
  };
  useWindowEvent.useWindowEvent("hashchange", () => {
    const newHash = window.location.hash;
    if (hash !== newHash) {
      setHashValue(newHash);
    }
  });
  React.useEffect(() => {
    setHashValue(window.location.hash);
  }, []);
  return [hash, setHash];
}

exports.useHash = useHash;
//# sourceMappingURL=use-hash.js.map
