'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var react = require('@floating-ui/react');
var hooks = require('@mantine/hooks');
var TooltipGroup_context = require('./TooltipGroup/TooltipGroup.context.js');
var useFloatingAutoUpdate = require('../Floating/use-floating-auto-update.js');

function useTooltip(settings) {
  const [uncontrolledOpened, setUncontrolledOpened] = React.useState(false);
  const controlled = typeof settings.opened === "boolean";
  const opened = controlled ? settings.opened : uncontrolledOpened;
  const withinGroup = TooltipGroup_context.useTooltipGroupContext();
  const uid = hooks.useId();
  const { delay: groupDelay, currentId, setCurrentId } = react.useDelayGroupContext();
  const onChange = React.useCallback((_opened) => {
    setUncontrolledOpened(_opened);
    if (_opened) {
      setCurrentId(uid);
    }
  }, [setCurrentId, uid]);
  const {
    x,
    y,
    reference,
    floating,
    context,
    refs,
    update,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = react.useFloating({
    placement: settings.position,
    open: opened,
    onOpenChange: onChange,
    middleware: [
      react.offset(settings.offset),
      react.shift({ padding: 8 }),
      react.flip(),
      react.arrow({ element: settings.arrowRef, padding: settings.arrowOffset }),
      ...settings.inline ? [react.inline()] : []
    ]
  });
  const { getReferenceProps, getFloatingProps } = react.useInteractions([
    react.useHover(context, {
      enabled: settings.events.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events.touch
    }),
    react.useFocus(context, { enabled: settings.events.focus, keyboardOnly: true }),
    react.useRole(context, { role: "tooltip" }),
    react.useDismiss(context, { enabled: typeof settings.opened === void 0 }),
    react.useDelayGroup(context, { id: uid })
  ]);
  useFloatingAutoUpdate.useFloatingAutoUpdate({
    opened,
    position: settings.position,
    positionDependencies: settings.positionDependencies,
    floating: { refs, update }
  });
  hooks.useDidUpdate(() => {
    var _a;
    (_a = settings.onPositionChange) == null ? void 0 : _a.call(settings, placement);
  }, [placement]);
  const isGroupPhase = opened && currentId && currentId !== uid;
  return {
    x,
    y,
    arrowX,
    arrowY,
    reference,
    floating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase,
    opened,
    placement
  };
}

exports.useTooltip = useTooltip;
//# sourceMappingURL=use-tooltip.js.map
