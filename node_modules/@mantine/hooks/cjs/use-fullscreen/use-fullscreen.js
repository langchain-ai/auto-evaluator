'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function getFullscreenElement() {
  const _document = window.document;
  const fullscreenElement = _document.fullscreenElement || _document.webkitFullscreenElement || _document.mozFullScreenElement || _document.msFullscreenElement;
  return fullscreenElement;
}
async function exitFullscreen() {
  const _document = window.document;
  if (typeof _document.exitFullscreen === "function")
    return _document.exitFullscreen();
  if (typeof _document.msExitFullscreen === "function")
    return _document.msExitFullscreen();
  if (typeof _document.webkitExitFullscreen === "function")
    return _document.webkitExitFullscreen();
  if (typeof _document.mozCancelFullScreen === "function")
    return _document.mozCancelFullScreen();
  return null;
}
async function enterFullScreen(element) {
  var _a, _b, _c, _d, _e;
  const _element = element;
  return ((_a = _element.requestFullscreen) == null ? void 0 : _a.call(_element)) || ((_b = _element.msRequestFullscreen) == null ? void 0 : _b.call(_element)) || ((_c = _element.webkitEnterFullscreen) == null ? void 0 : _c.call(_element)) || ((_d = _element.webkitRequestFullscreen) == null ? void 0 : _d.call(_element)) || ((_e = _element.mozRequestFullscreen) == null ? void 0 : _e.call(_element));
}
const prefixes = ["", "webkit", "moz", "ms"];
function addEvents(element, {
  onFullScreen,
  onError
}) {
  prefixes.forEach((prefix) => {
    element.addEventListener(`${prefix}fullscreenchange`, onFullScreen);
    element.addEventListener(`${prefix}fullscreenerror`, onError);
  });
  return () => {
    prefixes.forEach((prefix) => {
      element.removeEventListener(`${prefix}fullscreenchange`, onFullScreen);
      element.removeEventListener(`${prefix}fullscreenerror`, onError);
    });
  };
}
function useFullscreen() {
  const [fullscreen, setFullscreen] = React.useState(false);
  const _ref = React.useRef();
  const handleFullscreenChange = React.useCallback((event) => {
    setFullscreen(event.target === getFullscreenElement());
  }, [setFullscreen]);
  const handleFullscreenError = React.useCallback((event) => {
    setFullscreen(false);
    console.error(`[@mantine/hooks] use-fullscreen: Error attempting full-screen mode method: ${event} (${event.target})`);
  }, [setFullscreen]);
  const toggle = React.useCallback(async () => {
    if (!getFullscreenElement()) {
      await enterFullScreen(_ref.current);
    } else {
      await exitFullscreen();
    }
  }, []);
  const ref = React.useCallback((element) => {
    if (element === null) {
      _ref.current = window.document.documentElement;
    } else {
      _ref.current = element;
    }
  }, []);
  React.useEffect(() => {
    if (!_ref.current && window.document) {
      _ref.current = window.document.documentElement;
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError
      });
    }
    if (_ref.current) {
      return addEvents(_ref.current, {
        onFullScreen: handleFullscreenChange,
        onError: handleFullscreenError
      });
    }
    return void 0;
  }, []);
  return { ref, toggle, fullscreen };
}

exports.useFullscreen = useFullscreen;
//# sourceMappingURL=use-fullscreen.js.map
