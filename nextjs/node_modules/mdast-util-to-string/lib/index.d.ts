/**
 * @typedef {import('mdast').Root|import('mdast').Content} Node
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [includeImageAlt=true]
 *   Whether to use `alt` for `image`s.
 */
/**
 * Get the text content of a node or list of nodes.
 *
 * Prefers the node’s plain-text fields, otherwise serializes its children,
 * and if the given value is an array, serialize the nodes in it.
 *
 * @param {unknown} value
 *   Thing to serialize, typically `Node`.
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {string}
 *   Serialized `value`.
 */
export function toString(
  value: unknown,
  options?: Options | null | undefined
): string
export type Node = import('mdast').Root | import('mdast').Content
/**
 * Configuration (optional).
 */
export type Options = {
  /**
   * Whether to use `alt` for `image`s.
   */
  includeImageAlt?: boolean | null | undefined
}
