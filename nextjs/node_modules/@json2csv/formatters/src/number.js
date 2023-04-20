export default function numberFormatter(opts = {}) {
  if (opts.separator) {
    if (opts.decimals) {
      return (value) =>
        value.toFixed(opts.decimals).replace('.', opts.separator);
    }

    return (value) => `${value}`.replace('.', opts.separator);
  }

  if (opts.decimals) {
    return (value) => value.toFixed(opts.decimals);
  }

  return (value) => `${value}`;
}
