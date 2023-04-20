# @json2csv/plainjs

[![npm version](https://badge.fury.io/js/@json2csv%2Fplainjs.svg)](https://badge.fury.io/js/@json2csv%2Fplainjs)
[![npm monthly downloads](https://img.shields.io/npm/dm/@json2csv/plainjs.svg)](https://badge.fury.io/js/@json2csv%2Fplainjs)
[![Node.js CI](https://github.com/juanjoDiaz/json2csv/actions/workflows/on-push.yaml/badge.svg)](https://github.com/juanjoDiaz/json2csv/actions/workflows/on-push.yaml)
[![Coverage Status](https://coveralls.io/repos/github/juanjoDiaz/json2csv/badge.svg?branch=main)](https://coveralls.io/github/juanjoDiaz/json2csv?branch=main)
[![license](https://img.shields.io/npm/l/@json2csv/plainjs)](https://raw.githubusercontent.com/juanjoDiaz/json2csv/main/LICENSE.md)

Fast and highly configurable JSON to CSV converter.
It fully support conversion following the [RFC4180](https://datatracker.ietf.org/doc/html/rfc4180) specification as well as other similar text delimited formats as TSV.

`@json2csv/plainjs` exposes plain JavasScript modules of `json2csv` which can be used in Node.js, the browser or Deno.

This package includes two modules:
  * **[Parser](#parser):** A synchronous JSON to CSV converter written in plain js. It's fast and simple, but it loads the entire dataset in memory and block the event loop. So it's not advisable for big dataset or the browser.
  * **[Stream Parser](#stream-parser):** An asynchronous JSON to CSV converter written in plain js. Ideal for large dataset and the browser.

### Features

- Fast and lightweight
- Support for standard JSON as well as NDJSON
- Scalable to infinitely large datasets (using stream processing)
- Advanced data selection (automatic field discovery, underscore-like selectors, custom data getters, default values for missing fields, ...)
- Support for custom input data transformation
- Support for custom csv cell formatting.
- Highly customizable (supportting custom quotation marks, delimiters, eol values, etc.)
- Automatic escaping (preserving new lines, quotes, etc.)
- Optional headers
- Unicode encoding support
- Pretty printing in table format to stdout

### Other json2csv packages

There are multiple flavours of json2csv:

* **[Plainjs](https://www.npmjs.com/package/@json2csv/plainjs):** Includes the `Parser` API and a new `StreamParser` API which doesn't the conversion in a streaming fashion in pure js.
* **[Node](https://www.npmjs.com/package/@json2csv/node):** Includes the `Node Transform` and `Node Async Parser` APIs for Node users.
* **[WHATWG](https://www.npmjs.com/package/@json2csv/whatwg):** Includes the `WHATWG Transform Stream` and `WHATWG Async Parser` APIs for users of WHATWG streams (browser, Node or Deno).
* **[CLI](https://www.npmjs.com/package/@json2csv/cli):** Includes the `CLI` interface.

And a couple of libraries that enable additional configurations:

* **[Transforms](https://www.npmjs.com/package/@json2csv/transforms):** Includes the built-in `transforms` for json2csv (unwind and flatten) allowing the using to transform data before is parsed.
* **[Formatters](https://www.npmjs.com/package/@json2csv/formatters):** Includes the built-in `formatters` for json2csv (one for each data type, an excel-specific one, etc.). Formatters convert JSON data types into CSV-compatible strings.

## Requirements

- None

## Installation

### **NPM**

You can install json2csv as a dependency using NPM.

```bash
$ npm install --save @json2csv/plainjs
```

### **Yarn**

You can install json2csv as a dependency using Yarn.

```bash
$ yarn add --save @json2csv/plainjs
```

### **CDN**

json2csv plainjs modules is packaged as an ES6 modules.
If your browser supports modules, you can load json2csv plainjs modules directly on the browser from the CDN.

You can import the latest version:

```html
<script type="module">
  import { Parser } from 'https://cdn.jsdelivr.net/npm/@json2csv/plainjs/src/Parser.js';
  import { StreamParser } from 'https://cdn.jsdelivr.net/npm/@json2csv/plainjs/src/StreamParser.js';
</script>
```

You can also select a specific version:

```html
<script type="module">
  import { Parser } from 'https://cdn.jsdelivr.net/npm/@json2csv/plainjs@6.0.0/src/Parser.js';
  import { StreamParser } from 'https://cdn.jsdelivr.net/npm/@json2csv/plainjs@6.0.0/src/StreamParser.js';
</script>
```

## Parser

`json2csv` can be used programmatically as a synchronous converter.

This loads the entire JSON in memory and do the whole processing in-memory while blocking Javascript event loop. For that reason is rarely a good reason to use it until your data is very small or your application doesn't do anything else.

### Usage

```js
import { Parser } from '@json2csv/plainjs';

try {
  const opts = {};
  const parser = new Parser(opts);
  const csv = parser.parse(myData);
  console.log(csv);
} catch (err) {
  console.error(err);
}
```

#### Parameters

##### Options

* `fields` [&lt;DataSelector[]&gt;](advanced-options/data-selection.md)) Defaults to toplevel JSON attributes. See 
* `transforms` [&lt;Transform[]&gt;](advanced-options/transforms.md) Array of transforms to apply to the data. A transform is a function that receives a data recod and returns a transformed record. Transforms are executed in order.
* `formatters` [&lt;Formatters&gt;](advanced-options/formatters.md) Object where the each key is a Javascript data type and its associated value is a formatters for the given type.
* `defaultValue` [&lt;Any&gt;]() value to use when missing data. Defaults to `<empty>` if not specified. (Overridden by `fields[].default`)
* `delimiter` [&lt;String&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  delimiter of columns. Defaults to `,` if not specified.
* `eol` [&lt;String&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  overrides the default OS line ending (i.e. `\n` on Unix and `\r\n` on Windows).
* `header` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)  determines whether or not CSV file will contain a title column. Defaults to `true` if not specified.
* `includeEmptyRows` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)  includes empty rows. Defaults to `false`.
* `withBOM` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)  with BOM character. Defaults to `false`.

### Complete Documentation

See [https://juanjodiaz.github.io/json2csv/#/parsers/parser](https://juanjodiaz.github.io/json2csv/#/parsers/parser).

## Stream Parser

The synchronous API has the downside of loading the entire JSON array in memory and blocking JavaScript's event loop while processing the data. This means that your server won't be able to process more request or your UI will become irresponsive while data is being processed. For those reasons, it is rarely a good reason to use it unless your data is very small or your application doesn't do anything else.

The async parser processes the data as a it comes in so you don't need the entire input data set loaded in memory and you can avoid blocking the event loop for too long. Thus, it's better suited for large datasets or system with high concurrency.

The streaming API takes a second options argument to configure `objectMode` and `ndjson` mode. These options also support fine-tunning the underlying [JSON parser](https://github.com/juanjoDiaz/streamparser-json).

The streaming API support multiple callbacks to get the resulting CSV, errors, etc.

### Usage

```js
import { StreamParser } from '@json2csv/plainjs';

const opts = {};
const asyncOpts = {};
const parser = new StreamParser(opts, asyncOpts);

let csv = '';
parser.onData = (chunk) => (csv += chunk.toString()));
parser.onEnd = () => console.log(csv));
parser.onError = (err) => console.error(err));

// You can also listen for events on the conversion and see how the header or the lines are coming out.
parser.onHeader = (header) => console.log(header));
parser.onLine = (line) => console.log(line));
```

#### Parameters

##### Options

* `ndjson` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) indicates that the data is in NDJSON format. Only effective when using the streaming API and not in object mode.
* `fields` [&lt;DataSelector[]&gt;](advanced-options/data-selection.md)) Defaults to toplevel JSON attributes.
* `transforms` [&lt;Transform[]&gt;](advanced-options/transforms.md) Array of transforms to apply to the data. A transform is a function that receives a data recod and returns a transformed record. Transforms are executed in order.
* `formatters` [&lt;Formatters&gt;](advanced-options/formatters.md) Object where the each key is a Javascript data type and its associated value is a formatters for the given type.
* `defaultValue` [&lt;Any&gt;]() value to use when missing data. Defaults to `<empty>` if not specified. (Overridden by `fields[].default`)
* `delimiter` [&lt;String&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  delimiter of columns. Defaults to `,` if not specified.
* `eol` [&lt;String&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  overrides the default OS line ending (i.e. `\n` on Unix and `\r\n` on Windows).
* `header` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)  determines whether or not CSV file will contain a title column. Defaults to `true` if not specified.
* `includeEmptyRows` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) includes empty rows. Defaults to `false`.
* `withBOM` [&lt;Boolean&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) with BOM character. Defaults to `false`.

##### Async Options

Options used by the underlying parsing library to process the binary or text stream.
Not relevant when running in `objectMode`.
Buffering is only relevant if you expect very large strings/numbers in your JSON.
See [@streamparser/json](https://github.com/juanjoDiaz/streamparser-json#buffering) for more details about buffering.

* `stringBufferSize` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Size of the buffer used to parse strings. Defaults to 0 which means to don't buffer. Min valid value is 4.
* `numberBufferSize` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) Size of the buffer used to parse numbers. Defaults to 0 to don't buffer.

### Complete Documentation

See [https://juanjodiaz.github.io/json2csv/#/parsers/stream-parser](https://juanjodiaz.github.io/json2csv/#/parsers/stream-parser).

## License

See [LICENSE.md](https://github.com/juanjoDiaz/json2csv/blob/main/LICENSE.md).
