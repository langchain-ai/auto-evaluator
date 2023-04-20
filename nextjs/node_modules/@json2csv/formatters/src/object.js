import defaulStringFormatter from './string.js';

export default function objectFormatter(
  opts = { stringFormatter: defaulStringFormatter() }
) {
  return (value) => {
    if (value === null) return '';

    value = JSON.stringify(value);

    if (value === undefined) return '';

    if (value[0] === '"') value = value.replace(/^"(.+)"$/, '$1');

    return opts.stringFormatter(value);
  };
}
