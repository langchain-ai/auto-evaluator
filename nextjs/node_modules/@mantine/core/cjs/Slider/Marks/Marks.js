'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var getPosition = require('../utils/get-position/get-position.js');
var isMarkFilled = require('./is-mark-filled.js');
var Marks_styles = require('./Marks.styles.js');
var Box = require('../../Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  const { classes, cx } = Marks_styles['default']({ color, disabled }, { name: "Slider", classNames, styles, unstyled, variant, size });
  const items = marks.map((mark, index) => /* @__PURE__ */ React__default.createElement(Box.Box, {
    className: classes.markWrapper,
    sx: { left: `${getPosition.getPosition({ value: mark.value, min, max })}%` },
    key: index
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: cx(classes.mark, {
      [classes.markFilled]: isMarkFilled.isMarkFilled({ mark, value, offset, inverted })
    })
  }), mark.label && /* @__PURE__ */ React__default.createElement("div", {
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
  return /* @__PURE__ */ React__default.createElement("div", null, items);
}
Marks.displayName = "@mantine/core/SliderMarks";

exports.Marks = Marks;
//# sourceMappingURL=Marks.js.map
