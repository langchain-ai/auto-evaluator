'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hooks = require('@mantine/hooks');
var react = require('@floating-ui/react');
var useFloatingAutoUpdate = require('../Floating/use-floating-auto-update.js');

function getPopoverMiddlewares(options) {
  const middlewares = [react.offset(options.offset)];
  if (options.middlewares.shift) {
    middlewares.push(react.shift({ limiter: react.limitShift() }));
  }
  if (options.middlewares.flip) {
    middlewares.push(react.flip());
  }
  if (options.middlewares.inline) {
    middlewares.push(react.inline());
  }
  middlewares.push(react.arrow({ element: options.arrowRef, padding: options.arrowOffset }));
  return middlewares;
}
function usePopover(options) {
  const [_opened, setOpened] = hooks.useUncontrolled({
    value: options.opened,
    defaultValue: options.defaultOpened,
    finalValue: false,
    onChange: options.onChange
  });
  const onClose = () => {
    var _a;
    (_a = options.onClose) == null ? void 0 : _a.call(options);
    setOpened(false);
  };
  const onToggle = () => {
    var _a, _b;
    if (_opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
      setOpened(false);
    } else {
      (_b = options.onOpen) == null ? void 0 : _b.call(options);
      setOpened(true);
    }
  };
  const floating = react.useFloating({
    placement: options.position,
    middleware: [
      ...getPopoverMiddlewares(options),
      ...options.width === "target" ? [
        react.size({
          apply({ rects }) {
            var _a, _b;
            Object.assign((_b = (_a = floating.refs.floating.current) == null ? void 0 : _a.style) != null ? _b : {}, {
              width: `${rects.reference.width}px`
            });
          }
        })
      ] : []
    ]
  });
  useFloatingAutoUpdate.useFloatingAutoUpdate({
    opened: options.opened,
    position: options.position,
    positionDependencies: options.positionDependencies,
    floating
  });
  hooks.useDidUpdate(() => {
    var _a;
    (_a = options.onPositionChange) == null ? void 0 : _a.call(options, floating.placement);
  }, [floating.placement]);
  hooks.useDidUpdate(() => {
    var _a, _b;
    if (!options.opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
    } else {
      (_b = options.onOpen) == null ? void 0 : _b.call(options);
    }
  }, [options.opened]);
  return {
    floating,
    controlled: typeof options.opened === "boolean",
    opened: _opened,
    onClose,
    onToggle
  };
}

exports.usePopover = usePopover;
//# sourceMappingURL=use-popover.js.map
