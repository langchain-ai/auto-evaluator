import defaulStringFormatter from './string.js';

export default function symbolFormatter(
  opts = { stringFormatter: defaulStringFormatter() }
) {
  return (value) => opts.stringFormatter(value.toString().slice(7, -1));
}
