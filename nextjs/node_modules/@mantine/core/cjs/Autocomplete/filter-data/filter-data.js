'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function filterData({ data, limit, value, filter }) {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    if (filter(value, data[i])) {
      result.push(data[i]);
    }
    if (result.length >= limit) {
      break;
    }
  }
  return result;
}

exports.filterData = filterData;
//# sourceMappingURL=filter-data.js.map
