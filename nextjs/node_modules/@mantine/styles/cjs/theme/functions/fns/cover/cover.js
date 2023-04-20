'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rem = require('../../../utils/rem/rem.js');

function cover(offset = 0) {
  return {
    position: "absolute",
    top: rem.rem(offset),
    right: rem.rem(offset),
    left: rem.rem(offset),
    bottom: rem.rem(offset)
  };
}

exports.cover = cover;
//# sourceMappingURL=cover.js.map
