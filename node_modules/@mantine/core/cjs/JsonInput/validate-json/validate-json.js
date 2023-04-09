'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function validateJson(value, deserialize) {
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }
  try {
    deserialize(value);
    return true;
  } catch (e) {
    return false;
  }
}

exports.validateJson = validateJson;
//# sourceMappingURL=validate-json.js.map
