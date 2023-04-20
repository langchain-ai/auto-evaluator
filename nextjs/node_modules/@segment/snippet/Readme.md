[![Circle CI](https://circleci.com/gh/segmentio/snippet.svg?style=svg&circle-token=07550326ba99d575a07600ec4d8a9593120ef509)](https://circleci.com/gh/segmentio/snippet)

# snippet

  Render the analytics.js snippet.

  The recommended way to use analytics.js is to follow the [analytics.js quickstart guide](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/). If you absolutely need to generate a snippet dynamically, this is an alternate solution. Note that when using this in-browser, the global `analytics` object will not be defined until the snippet is rendered and executed.

  This package is supported on IE8+, Chrome, Firefox, Safari 9, Microsoft Edge, Node.js 0.10+

  For IE7 support, install a global `JSON` polyfill on the page prior to loading this package.

## Example

```js
var snippet = require('@segment/snippet');

var contents = snippet.max({
  host: 'cdn.segment.com',
  apiKey: '03fwkuu3',
  page: {
    category: 'Docs',
    name: 'Integrations',
    properties: {
      foo: 'bar'
    }
  }
});
```

## API

### snippet.max(options)

  Returns the maxified version of the analytics.js snippet given a set of `options`:

  * `host`: the domain name where the analytics.js script is hosted.
  * `apiKey`: the `apiKey` to load in the snippet.
  * `page`: the options to pass to `analytics.page`. if `page` is `false`, then the `page()` call will be omitted.
  * `load`: if set to `false` the `load()` call will be omitted. This is useful for if you want dynamically control the load process on the client-side for things like GDPR.
  * `ajsPath`: override the default analytics.min.js location


### snippet.min(options)

  Returns the minified version of the snippet.
