export default function defaultFormatter(value) {
  if (value === null || value === undefined) return '';

  return `${value}`;
}
