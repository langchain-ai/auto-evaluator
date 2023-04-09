# remark-html

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to add support for serializing HTML.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkHtml[, options])`](#unifieduseremarkhtml-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin that compiles markdown to
HTML.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**rehype** adds support for HTML to unified.
**mdast** is the markdown AST that remark uses.
**hast** is the HTML AST that rehype uses.
This is a remark plugin that adds a compiler to compile mdast to hast and then
to a string.

## When should I use this?

This plugin is useful when you want to turn markdown into HTML.
It’s a shortcut for `.use(remarkRehype).use(rehypeStringify)`.

The reason that there are different ecosystems for markdown and HTML is that
turning markdown into HTML is, while frequently needed, not the only purpose of
markdown.
Checking (linting) and formatting markdown are also common use cases for
remark and markdown.
There are several aspects of markdown that do not translate 1-to-1 to HTML.
In some cases markdown contains more information than HTML: for example, there
are several ways to add a link in markdown (as in, autolinks: `<https://url>`,
resource links: `[label](url)`, and reference links with definitions:
`[label][id]` and `[id]: url`).
In other cases HTML contains more information than markdown: there are many
tags, which add new meaning (semantics), available in HTML that aren’t available
in markdown.
If there was just one AST, it would be quite hard to perform the tasks that
several remark and rehype plugins currently do.

This plugin is useful when you want to quickly turn markdown into HTML.
In most cases though, it’s recommended to use [`remark-rehype`][remark-rehype]
instead and finally use [`rehype-stringify`][rehype-stringify] to serialize
HTML.
The reason using both ecosystems instead of this plugin is recommended, is that
there are many useful rehype plugins that you can then use.
For example, you can [minify HTML][rehype-minify], [format HTML][rehype-format],
[highlight code][rehype-highlight], [add metadata][rehype-meta], and a lot more.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-html
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkHtml from 'https://esm.sh/remark-html@15'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkHtml from 'https://esm.sh/remark-html@15?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
# Hello & World

> A block quote.

* Some _emphasis_, **importance**, and `code`.
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

main()

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```html
<h1>Hello &#x26; World</h1>
<blockquote>
<p>A block quote.</p>
</blockquote>
<ul>
<li>Some <em>emphasis</em>, <strong>importance</strong>, and <code>code</code>.</li>
</ul>
```

## API

This package exports no identifiers.
The default export is `remarkHtml`.

### `unified().use(remarkHtml[, options])`

Add support for serializing HTML.

##### `options`

Configuration (optional).
All options other than `sanitize` and `handlers` are passed to
[`hast-util-to-html`][hast-util-to-html].

###### `options.handlers`

This option is a bit advanced as it requires knowledge of ASTs, so we defer
to the documentation available in
[`mdast-util-to-hast`][mdast-util-to-hast].

###### `options.sanitize`

How to sanitize the output (`Object` or `boolean`, default: `true`):

*   `false`
    — output is not sanitized, dangerous raw HTML persists
*   `true`
    — output is sanitized according to [GitHub’s sanitation rules][github],
    dangerous raw HTML is dropped
*   `Object`
    — `schema` that defines how to sanitize output with
    [`hast-util-sanitize`][sanitize], dangerous raw HTML is dropped

## Types

This package is fully typed with [TypeScript][].
It exports an `Options` type, which specifies the interface of the accepted
options.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 6+ and `remark` version 7+.

## Security

Use of `remark-html` is **unsafe** by default and opens you up to
[cross-site scripting (XSS)][xss] attacks.
Pass `sanitize: true` to prevent attacks.
Setting `sanitize` to anything else can be unsafe.

## Related

*   [`remark-rehype`](https://github.com/remarkjs/remark-rehype)
    — turn markdown into HTML to support rehype
*   [`rehype-sanitize`](https://github.com/rehypejs/rehype-sanitize)
    — sanitize HTML

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-html/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-html/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-html.svg

[coverage]: https://codecov.io/github/remarkjs/remark-html

[downloads-badge]: https://img.shields.io/npm/dm/remark-html.svg

[downloads]: https://www.npmjs.com/package/remark-html

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-html.svg

[size]: https://bundlephobia.com/result?p=remark-html

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/main/contributing.md

[support]: https://github.com/remarkjs/.github/blob/main/support.md

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[remark]: https://github.com/remarkjs/remark

[github]: https://github.com/syntax-tree/hast-util-sanitize#schema

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[remark-rehype]: https://github.com/remarkjs/remark-rehype

[rehype-minify]: https://github.com/rehypejs/rehype-minify

[rehype-format]: https://github.com/rehypejs/rehype-format

[rehype-highlight]: https://github.com/rehypejs/rehype-highlight

[rehype-meta]: https://github.com/rehypejs/rehype-meta

[rehype-stringify]: https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html

[mdast-util-to-hast]: https://github.com/syntax-tree/mdast-util-to-hast
