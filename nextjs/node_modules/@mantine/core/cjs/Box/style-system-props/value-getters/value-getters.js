'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getColorValue = require('./get-color-value.js');
var getDefaultValue = require('./get-default-value.js');
var getFontSizeValue = require('./get-font-size-value.js');
var getSpacingValue = require('./get-spacing-value.js');

const valueGetters = {
  identity: getDefaultValue.identity,
  color: getColorValue.getColorValue,
  size: getDefaultValue.getSizeValue,
  fontSize: getFontSizeValue.getFontSizeValue,
  spacing: getSpacingValue.getSpacingValue
};

exports.valueGetters = valueGetters;
//# sourceMappingURL=value-getters.js.map
