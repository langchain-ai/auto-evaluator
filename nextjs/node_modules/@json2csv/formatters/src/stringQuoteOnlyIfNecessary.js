import defaulStringFormatter from './string.js';

export default function stringQuoteOnlyIfNecessaryFormatter(opts = {}) {
  const quote = typeof opts.quote === 'string' ? opts.quote : '"';
  const escapedQuote =
    typeof opts.escapedQuote === 'string'
      ? opts.escapedQuote
      : `${quote}${quote}`;
  const separator = typeof opts.separator === 'string' ? opts.separator : ',';
  const eol = typeof opts.eol === 'string' ? opts.eol : '\n';

  const stringFormatter = defaulStringFormatter({ quote, escapedQuote });

  return (value) => {
    if ([quote, separator, eol].some((char) => value.includes(char))) {
      return stringFormatter(value);
    }

    return value;
  };
}
