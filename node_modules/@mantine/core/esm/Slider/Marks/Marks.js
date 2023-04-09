import React from 'react';
import { getPosition } from '../utils/get-position/get-position.js';
import { isMarkFilled } from './is-mark-filled.js';
import useStyles from './Marks.styles.js';
import { Box } from '../../Box/Box.js';

function Marks({
  marks,
  color,
  size,
  min,
  max,
  value,
  classNames,
  styles,
  offset,
  onChange,
  disabled,
  unstyled,
  inverted,
  variant
}) {
  const { classes, cx } = useStyles({ color, disabled }, { name: "Slider", classNames, styles, unstyled, variant, size });
  const items = marks.map((mark, index) => /* @__PURE__ */ React.createElement(Box, {
    className: classes.markWrapper,
    sx: { left: `${getPosition({ value: mark.value, min, max })}%` },
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.mark, {
      [classes.markFilled]: isMarkFilled({ mark, value, offset, inverted })
    })
  }), mark.label && /* @__PURE__ */ React.createElement("div", {
    className: classes.markLabel,
    onMouseDown: (event) => {
      event.stopPropagation();
      !disabled && onChange(mark.value);
    },
    onTouchStart: (event) => {
      event.stopPropagation();
      !disabled && onChange(mark.value);
    }
  }, mark.label)));
  return /* @__PURE__ */ React.createElement("div", null, items);
}
Marks.displayName = "@mantine/core/SliderMarks";

export { Marks };
//# sourceMappingURL=Marks.js.map
