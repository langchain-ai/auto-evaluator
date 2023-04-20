import React from 'react';

function isElement(value) {
  if (Array.isArray(value) || value === null) {
    return false;
  }
  if (typeof value === "object") {
    if (value.type === React.Fragment) {
      return false;
    }
    return true;
  }
  return false;
}

export { isElement };
//# sourceMappingURL=is-element.js.map
