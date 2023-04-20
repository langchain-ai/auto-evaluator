const quote = '"';
const escapedQuote = '""""';

export default function stringExcel(value) {
  return `"=""${value.replace(new RegExp(quote, 'g'), escapedQuote)}"""`;
}
