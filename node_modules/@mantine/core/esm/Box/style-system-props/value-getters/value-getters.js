import { getColorValue } from './get-color-value.js';
import { identity, getSizeValue } from './get-default-value.js';
import { getFontSizeValue } from './get-font-size-value.js';
import { getSpacingValue } from './get-spacing-value.js';

const valueGetters = {
  identity,
  color: getColorValue,
  size: getSizeValue,
  fontSize: getFontSizeValue,
  spacing: getSpacingValue
};

export { valueGetters };
//# sourceMappingURL=value-getters.js.map
