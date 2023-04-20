export function getProp(obj, path, defaultValue) {
  const value = obj[path];
  return value === undefined ? defaultValue : value;
}

export function flattenReducer(acc, arr) {
  try {
    // This is faster but susceptible to `RangeError: Maximum call stack size exceeded`
    Array.isArray(arr) ? acc.push(...arr) : acc.push(arr);
    return acc;
  } catch (err) {
    // Fallback to a slower but safer option
    return acc.concat(arr);
  }
}

export function fastJoin(arr, separator) {
  let isFirst = true;
  return arr.reduce((acc, elem) => {
    if (elem === null || elem === undefined) {
      elem = '';
    }

    if (isFirst) {
      isFirst = false;
      return `${elem}`;
    }

    return `${acc}${separator}${elem}`;
  }, '');
}
