/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('hast-util-sanitize').Schema} Schema
 *
 * @typedef ExtraOptionsFields
 *   Configuration (optional).
 * @property {boolean|Schema|null} [sanitize]
 *   How to sanitize the output.
 * @property {import('mdast-util-to-hast').Handlers} [handlers={}]
 *   Object mapping mdast nodes to functions handling them.
 *
 * @typedef {import('hast-util-to-html').Options & ExtraOptionsFields} Options
 */

import {toHtml} from 'hast-util-to-html'
import {sanitize} from 'hast-util-sanitize'
import {toHast} from 'mdast-util-to-hast'

/**
 * Plugin to serialize markdown as HTML.
 *
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[Options?] | [], Root, string>}
 */
export default function remarkHtml(settings = {}) {
  const options = {...settings}
  /** @type {boolean|undefined} */
  let clean

  if (typeof options.sanitize === 'boolean') {
    clean = options.sanitize
    options.sanitize = undefined
  }

  if (typeof clean !== 'boolean') {
    clean = true
  }

  Object.assign(this, {Compiler: compiler})

  /**
   * @type {import('unified').CompilerFunction<Root, string>}
   */
  function compiler(node, file) {
    const hast = toHast(node, {
      allowDangerousHtml: !clean,
      handlers: options.handlers
    })
    // @ts-expect-error: assume root.
    const cleanHast = clean ? sanitize(hast, options.sanitize) : hast
    const result = toHtml(
      // @ts-expect-error: assume root.
      cleanHast,
      Object.assign({}, options, {allowDangerousHtml: !clean})
    )

    if (file.extname) {
      file.extname = '.html'
    }

    // Add an eof eol.
    return node &&
      node.type &&
      node.type === 'root' &&
      result &&
      /[^\r\n]/.test(result.charAt(result.length - 1))
      ? result + '\n'
      : result
  }
}
