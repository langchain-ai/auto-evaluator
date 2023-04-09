'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function filterData({
  data,
  searchable,
  limit,
  searchValue,
  filter,
  value,
  disableSelectedItemFiltering
}) {
  if (!searchable && value.length === 0) {
    return data;
  }
  if (!searchable) {
    const result2 = [];
    for (let i = 0; i < data.length; i += 1) {
      if (!!disableSelectedItemFiltering || !value.some((val) => val === data[i].value && !data[i].disabled)) {
        result2.push(data[i]);
      }
    }
    return result2;
  }
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    if (filter(searchValue, !disableSelectedItemFiltering && value.some((val) => val === data[i].value && !data[i].disabled), data[i])) {
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
