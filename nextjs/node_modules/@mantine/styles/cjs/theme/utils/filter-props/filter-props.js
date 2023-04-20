'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}

exports.filterProps = filterProps;
//# sourceMappingURL=filter-props.js.map
