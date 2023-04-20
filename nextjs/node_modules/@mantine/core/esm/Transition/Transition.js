import React from 'react';
import { getTransitionStyles } from './get-transition-styles/get-transition-styles.js';
import { useTransition } from './use-transition.js';

function Transition({
  keepMounted,
  transition,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited
}) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited
  });
  if (transitionDuration === 0) {
    return mounted ? /* @__PURE__ */ React.createElement(React.Fragment, null, children({})) : keepMounted ? children({ display: "none" }) : null;
  }
  return transitionStatus === "exited" ? keepMounted ? children({ display: "none" }) : null : /* @__PURE__ */ React.createElement(React.Fragment, null, children(getTransitionStyles({
    transition,
    duration: transitionDuration,
    state: transitionStatus,
    timingFunction: transitionTimingFunction
  })));
}
Transition.displayName = "@mantine/core/Transition";

export { Transition };
//# sourceMappingURL=Transition.js.map
