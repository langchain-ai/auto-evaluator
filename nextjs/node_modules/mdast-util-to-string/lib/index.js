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
export function toString(value, options) {
  const includeImageAlt = (options || {}).includeImageAlt
  return one(
    value,
    typeof includeImageAlt === 'boolean' ? includeImageAlt : true
  )
}

/**
 * One node or several nodes.
 *
 * @param {unknown} value
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @returns {string}
 *   Serialized node.
 */
function one(value, includeImageAlt) {
  return (
    (node(value) &&
      (('value' in value && value.value) ||
        (includeImageAlt && 'alt' in value && value.alt) ||
        ('children' in value && all(value.children, includeImageAlt)))) ||
    (Array.isArray(value) && all(value, includeImageAlt)) ||
    ''
  )
}

/**
 * Serialize a list of nodes.
 *
 * @param {Array<unknown>} values
 *   Thing to serialize.
 * @param {boolean} includeImageAlt
 *   Include image `alt`s.
 * @returns {string}
 *   Serialized nodes.
 */
function all(values, includeImageAlt) {
  /** @type {Array<string>} */
  const result = []
  let index = -1

  while (++index < values.length) {
    result[index] = one(values[index], includeImageAlt)
  }

  return result.join('')
}

/**
 * Check if `value` looks like a node.
 *
 * @param {unknown} value
 *   Thing.
 * @returns {value is Node}
 *   Whether `value` is a node.
 */
function node(value) {
  return Boolean(value && typeof value === 'object')
}
