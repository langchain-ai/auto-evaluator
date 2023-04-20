export default function remarkHtml(
  this: import('unified').Processor<
    void,
    import('mdast').Root,
    import('mdast').Root,
    string
  >,
  ...settings: [(Options | undefined)?] | []
): void
export type Root = import('mdast').Root
export type Schema = import('hast-util-sanitize').Schema
/**
 * Configuration (optional).
 */
export type ExtraOptionsFields = {
  /**
   * How to sanitize the output.
   */
  sanitize?:
    | boolean
    | import('hast-util-sanitize/lib').Schema
    | null
    | undefined
  /**
   * Object mapping mdast nodes to functions handling them.
   */
  handlers?: import('mdast-util-to-hast').Handlers | undefined
}
export type Options = import('hast-util-to-html').Options & ExtraOptionsFields
