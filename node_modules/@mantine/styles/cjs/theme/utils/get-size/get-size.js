'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rem = require('../rem/rem.js');

function getSize({
  size,
  sizes,
  units
}) {
  if (size in sizes) {
    return sizes[size];
  }
  if (typeof size === "number") {
    return units === "em" ? rem.em(size) : rem.rem(size);
  }
  return size || sizes.md;
}

exports.getSize = getSize;
//# sourceMappingURL=get-size.js.map
