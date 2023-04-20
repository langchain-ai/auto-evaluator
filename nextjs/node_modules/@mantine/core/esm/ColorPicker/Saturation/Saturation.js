import React, { useState, useRef, useEffect } from 'react';
import { useMove, clampUseMovePosition } from '@mantine/hooks';
import { Thumb } from '../Thumb/Thumb.js';
import useStyles from './Saturation.styles.js';
import { convertHsvaTo } from '../converters/converters.js';

function Saturation({
  value,
  onChange,
  onChangeEnd,
  focusable = true,
  __staticSelector = "saturation",
  size,
  color,
  saturationLabel,
  classNames,
  styles,
  unstyled,
  variant
}) {
  const { classes } = useStyles(null, {
    classNames,
    styles,
    name: __staticSelector,
    unstyled,
    variant,
    size
  });
  const [position, setPosition] = useState({ x: value.s / 100, y: 1 - value.v / 100 });
  const positionRef = useRef(position);
  const { ref } = useMove(({ x, y }) => {
    positionRef.current = { x, y };
    onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
  }, {
    onScrubEnd: () => {
      const { x, y } = positionRef.current;
      onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
    }
  });
  useEffect(() => {
    setPosition({ x: value.s / 100, y: 1 - value.v / 100 });
  }, [value.s, value.v]);
  const handleArrow = (event, pos) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
    onChangeEnd({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp": {
        handleArrow(event, { y: position.y - 0.05, x: position.x });
        break;
      }
      case "ArrowDown": {
        handleArrow(event, { y: position.y + 0.05, x: position.x });
        break;
      }
      case "ArrowRight": {
        handleArrow(event, { x: position.x + 0.05, y: position.y });
        break;
      }
      case "ArrowLeft": {
        handleArrow(event, { x: position.x - 0.05, y: position.y });
        break;
      }
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.saturation,
    ref,
    role: "slider",
    "aria-label": saturationLabel,
    "aria-valuenow": position.x,
    "aria-valuetext": convertHsvaTo("rgba", value),
    tabIndex: focusable ? 0 : -1,
    onKeyDown: handleKeyDown
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.saturationOverlay,
    style: { backgroundColor: `hsl(${value.h}, 100%, 50%)` }
  }), /* @__PURE__ */ React.createElement("div", {
    className: classes.saturationOverlay,
    style: { backgroundImage: "linear-gradient(90deg, #fff, transparent)" }
  }), /* @__PURE__ */ React.createElement("div", {
    className: classes.saturationOverlay,
    style: { backgroundImage: "linear-gradient(0deg, #000, transparent)" }
  }), /* @__PURE__ */ React.createElement(Thumb, {
    __staticSelector,
    classNames,
    styles,
    position,
    className: classes.saturationThumb,
    style: { backgroundColor: color },
    size
  }));
}
Saturation.displayName = "@mantine/core/Saturation";

export { Saturation };
//# sourceMappingURL=Saturation.js.map
