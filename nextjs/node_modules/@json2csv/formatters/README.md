# @json2csv/formatters

[![npm version](https://badge.fury.io/js/@json2csv%2Fformatters.svg)](https://badge.fury.io/js/@json2csv%2Fformatters)
[![npm monthly downloads](https://img.shields.io/npm/dm/@json2csv/transforms.svg)](https://badge.fury.io/js/@json2csv%2Fformatters)
[![Node.js CI](https://github.com/juanjoDiaz/json2csv/actions/workflows/on-push.yaml/badge.svg)](https://github.com/juanjoDiaz/json2csv/actions/workflows/on-push.yaml)
[![Coverage Status](https://coveralls.io/repos/github/juanjoDiaz/json2csv/badge.svg?branch=main)](https://coveralls.io/github/juanjoDiaz/json2csv?branch=main)
[![license](https://img.shields.io/npm/l/@json2csv/plainjs)](https://raw.githubusercontent.com/juanjoDiaz/json2csv/main/LICENSE.md)

A formatter is function a used by `json2csv` (in any of its flavours) to convert javascript values into plain text before adding it into the CSV as a cell.
Supported formatters are given by the types returned by `typeof`:
* `undefined`
* `boolean`
* `number`
* `bigint`
* `string`
* `symbol`
* `function`
* `object`
  
And a special type that only applies to headers:
* `headers`

Pay special attention to the `string` formatter since other formatters like the `headers` or `object` formatters, rely on the `string` formatter for the stringification of their value..

### json2csv ecosystem

There are multiple flavours of json2csv where you can use formatters:

* **[Plainjs](https://www.npmjs.com/package/@json2csv/plainjs):** Includes the `Parser` API and a new `StreamParser` API which doesn't the conversion in a streaming fashion in pure js.
* **[Node](https://www.npmjs.com/package/@json2csv/node):** Includes the `Node Transform` and `Node Async Parser` APIs for Node users.
* **[WHATWG](https://www.npmjs.com/package/@json2csv/whatwg):** Includes the `WHATWG Transform Stream` and `WHATWG Async Parser` APIs for users of WHATWG streams (browser, Node or Deno).
* **[CLI](https://www.npmjs.com/package/@json2csv/cli):** Includes the `CLI` interface.

## Built-in formatters

There is a number of built-in formatters provided by this package.

```js
import {
  default as defaultFormatter,
  number as numberFormatter,
  string as stringFormatter,
  stringQuoteOnlyIfNecessary as stringQuoteOnlyIfNecessaryFormatter,
  stringExcel as stringExcelFormatter,
  symbol as symbolFormatter,
  object as objectFormatter,
} from '@json2csv/formatters';
```

### Default

This formatter just relies on standard JavaScript stringification.
This is the default formatter for `undefined`, `boolean`, `number` and `bigint` elements.

It's not a factory but the formatter itself.

```js
{
  undefined: defaultFormatter,
  boolean: defaultFormatter,
  number: defaultFormatter,
  bigint: defaultFormatter,
}
```

### Number

Format numbers with a fixed amount of decimals

The formatter needs to be instantiated and takes an options object as arguments containing:

- `separator` - String, separator to use between integer and decimal digits. Defaults to `.`. It's crucial that the decimal separator is not the same character as the CSV delimiter or the result CSV will be incorrect.
- `decimals` - Number, amount of decimals to keep. Defaults to all the available decimals.

```js
{
  // 2 decimals
  number: numberFormatter(),

  // 3 decimals
  number: numberFormatter(3)
}
```

### String

Format strings quoting them and escaping illegal characters if needed.

The formatter needs to be instantiated and takes an options object as arguments containing:

- `quote` - String, quote around cell values and column names. Defaults to `"`.
- `escapedQuote` - String, the value to replace escaped quotes in strings. Defaults to double-quotes (for example `""`).

This is the default for `string` elements.

```js
{
  // Uses '"' as quote and '""' as escaped quote
  string: stringFormatter(),

  // Use single quotes `'` as quotes and `''` as escaped quote
  string: stringFormatter({ quote: '\'' }),

  // Never use quotes
  string: stringFormatter({ quote: '' }),

  // Use '\"' as escaped quotes
  string: stringFormatter({ escapedQuote: '\"' }),
}
```

### String Quote Only Necessary

The default string formatter quote all strings. This is consistent but it is not mandatory according to the CSV standard. This formatter only quote strings if they don't contain quotes (by default `"`), the CSV separator character (by default `,`) or the end-of-line (by default `\n` or `\r\n` depending on you operating system).

The formatter needs to be instantiated and takes an options object as arguments containing:

- `quote` - String, quote around cell values and column names. Defaults to `"`.
- `escapedQuote` - String, the value to replace escaped quotes in strings. Defaults to 2x`quotes` (for example `""`).
- `eol` - String, overrides the default OS line ending (i.e. `\n` on Unix and `\r\n` on Windows). Ensure that you use the same `eol` here as in the json2csv options.

```js
{
  // Uses '"' as quote, '""' as escaped quote and your OS eol
  string: stringQuoteOnlyIfNecessaryFormatter(),

  // Use single quotes `'` as quotes, `''` as escaped quote and your OS eol
  string: stringQuoteOnlyIfNecessaryFormatter({ quote: '\'' }),

  // Never use quotes
  string: stringQuoteOnlyIfNecessaryFormatter({ quote: '' }),

  // Use '\"' as escaped quotes
  string: stringQuoteOnlyIfNecessaryFormatter({ escapedQuote: '\"' }),

  // Use linux EOL regardless of your OS
  string: stringQuoteOnlyIfNecessaryFormatter({ eol: '\n' }),
}
```

### String Excel

Converts string data into normalized Excel style data after formatting it using the given string formatter.

The formatter needs to be instantiated and takes no arguments.

```js
{
  string: stringExcelFormatter,
}
```

### Symbol

Format the symbol as its string value and then use the given string formatter i.e. `Symbol('My Symbol')` is formatted as `"My Symbol"`.

The formatter needs to be instantiated and takes an options object as arguments containing:

- `stringFormatter` - String formatter to use to stringify the symbol name. Defaults to the built-in `stringFormatter`.

This is the default for `symbol` elements.

```js
{
  // Uses the default string formatter
  symbol: symbolFormatter(),

  // Uses custom string formatter
  // You rarely need to this since the symbol formatter will use the string formatter that you set.
  symbol: symbolFormatter(myStringFormatter()),
}
```

### Object

Format the object using `JSON.stringify` and then the given string formatter.
Some object types likes `Date` or Mongo's `ObjectId` are automatically quoted by `JSON.stringify`. This formatter, remove those quotes and uses the given string formatter for correct quoting and escaping.

The formatter needs to be instantiated and takes an options object as arguments containing:

- `stringFormatter` - tring formatter to use to stringify the symbol name. Defaults to our built-in `stringFormatter`.

This is the default for `function` and `object` elements. `function`'s are formatted as empty ``.

```js
{
  // Uses the default string formatter
  object: objectFormatter(),

  // Uses custom string formatter
  // You rarely need to this since the object formatter will use the string formatter that you set.
  object: objectFormatter(myStringFormatter()),
}
```


## Custom formatters

Users can create their own formatters as simple functions.

```js
function formatType(itemOfType) {
  // format type
  return formattedItem;
}
```

or using ES6

```js
const formatType = (itemOfType) => {
  // format type
  return itemOfType;
};
```

For example, let's format functions as their name or 'unknown'.

```js
const functionNameFormatter = (item) => item.name || 'unknown';
```

Then you can add `{ function: functionNameFormatter }` to the `formatters` object.

A less trivial example would be to ensure that string cells never take more than 20 characters.

```js
const fixedLengthStringFormatter = (stringLength, ellipsis = '...') =>
  (item) =>
    item.length <= stringLength
      ? item
      : `${item.slice(0, stringLength - ellipsis.length)}${ellipsis}`;
```

Then you can add `{ string: fixedLengthStringFormatter(20) }` to the `formatters` object.
Or `fixedLengthStringFormatter(20, '')` to not use the ellipsis and just clip the text.
As with the sample transform in the previous section, the reason to wrap the actual formatter in a factory function is so it can be parameterized easily.

Keep in mind that the above example doesn't quote or escape the string which is problematic. A more realistic example could use our built-in string formatted to do the quoting and escaping like:

```js
import { string as defaultStringFormatter } from 'json2csv/formatters';

const fixedLengthStringFormatter = (stringLength, ellipsis = '...', stringFormatter = defaultStringFormatter()) =>
  (item) =>
    item.length <= stringLength
      ? item
      : stringFormatter(`${item.slice(0, stringLength - ellipsis.length)}${ellipsis})`;
```

## How to use formatters

Formatters are configured in the `formatters` option when creating a parser.

### Programmatic APIs

```js
import { Parser } from '@json2csv/plainjs';
import { number as numberFormatter } from '@json2csv/formatters';
import { fixedLengthStringFormatter } from './custom-formatters';

try {
  const opts = {
    formatters: {
      number: numberFormatter({ decimals: 3, separator: ',' }),
      string: fixedLengthStringFormatter(20)
    }
  };
  const parser = new Parser(opts);
  const csv = parser.parse(myData);
  console.log(csv);
} catch (err) {
  console.error(err);
}
```

### CLI
At the moment, only some options of the `string` built-in formatters are supported by the CLI interface.

```bash
$ json2csv -i input.json --quote '"' --escaped-quote '\"'
```

or if you want to use the `String Excel` instead:

```bash
$ json2csv -i input.json --excel-strings
``` 

### Complete Documentation

See [https://juanjodiaz.github.io/json2csv/#/advanced-options/formatters](https://juanjodiaz.github.io/json2csv/#/advanced-options/formatters).

## License

See [LICENSE.md](https://github.com/juanjoDiaz/json2csv/blob/main/LICENSE.md).
