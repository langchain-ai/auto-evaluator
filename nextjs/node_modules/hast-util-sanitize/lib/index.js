/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Properties} Properties
 * @typedef {Content | Root} Node
 *
 * @typedef {Properties[string]} PropertyValue
 *   Possible property values.
 * @typedef {string | number | boolean} PrimitivePropertyValue
 *   Possible primitive HTML attribute values.
 *
 * @typedef {Record<string, Array<string | [string, ...Array<PrimitivePropertyValue | RegExp>]>>} Attributes
 *  Map of tag names to allow lists for each property.
 * @typedef {Record<string, Array<PrimitivePropertyValue | RegExp>>} AttributeClean
 *   Normalized input.
 *
 * @typedef Schema
 *   Sanitization configuration.
 * @property {Attributes | undefined} [attributes]
 *   Map of tag names to allowed properties.
 *
 *   The special `'*'` key defines property names allowed on all elements.
 * @property {Record<string, Record<string, PropertyValue>> | undefined} [required]
 *   Map of tag names to required property names and their default property value.
 * @property {Array<string> | undefined} [tagNames]
 *   List of allowed tag names.
 * @property {Record<string, Array<string>> | undefined} [protocols]
 *   Map of protocols to allow in property values.
 * @property {Record<string, Array<string>> | undefined} [ancestors]
 *   Map of tag names to their required ancestor elements.
 * @property {Array<string> | undefined} [clobber]
 *   List of allowed property names which can clobber.
 * @property {string | undefined} [clobberPrefix]
 *   Prefix to use before potentially clobbering property names.
 * @property {Array<string> | undefined} [strip]
 *   Names of elements to strip from the tree.
 * @property {boolean | undefined} [allowComments]
 *   Whether to allow comments.
 * @property {boolean | undefined} [allowDoctypes]
 *   Whether to allow doctypes.
 *
 * @typedef {(schema: Schema, value: any, node: any, stack: Array<string>) => unknown} Handler
 * @typedef {Record<string, Handler>} NodeDefinition
 * @typedef {((schema: Schema, node: Node) => NodeDefinition | undefined)} NodeDefinitionGetter
 * @typedef {Record<string, NodeDefinition | NodeDefinitionGetter>} NodeSchema
 */

import {defaultSchema} from './schema.js'

const own = {}.hasOwnProperty

/** @type {NodeSchema} */
const nodeSchema = {
  root: {children: all},
  doctype: handleDoctype,
  comment: handleComment,
  element: {
    tagName: handleTagName,
    properties: handleProperties,
    children: all
  },
  text: {value: handleValue},
  '*': {data: allow, position: allow}
}

/**
 * Utility to sanitize a tree
 *
 * @param {Node} node
 *   Hast tree to sanitize
 * @param {Schema} [schema]
 *   Schema defining how to sanitize - defaults to Github style sanitation
 */
export function sanitize(node, schema) {
  /** @type {Node} */
  let ctx = {type: 'root', children: []}

  if (node && typeof node === 'object' && node.type) {
    const replace = one(
      Object.assign({}, defaultSchema, schema || {}),
      node,
      []
    )

    if (replace) {
      if (Array.isArray(replace)) {
        if (replace.length === 1) {
          ctx = replace[0]
        } else {
          // @ts-expect-error Assume `root` is not a child.
          ctx.children = replace
        }
      } else {
        ctx = replace
      }
    }
  }

  return ctx
}

/**
 * Sanitize `node`.
 *
 * @param {Schema} schema
 * @param {Node} node
 * @param {Array<string>} stack
 * @returns {Node | Array<Node> | undefined}
 */
function one(schema, node, stack) {
  const type = node && node.type
  /** @type {Node} */
  // @ts-expect-error rest of props added later.
  const replacement = {type: node.type}
  /** @type {boolean | undefined} */
  let replace

  if (own.call(nodeSchema, type)) {
    /** @type {NodeDefinition | NodeDefinitionGetter | undefined} */
    let definition = nodeSchema[type]

    if (typeof definition === 'function') {
      definition = definition(schema, node)
    }

    if (definition) {
      const allowed = Object.assign({}, definition, nodeSchema['*'])
      /** @type {string} */
      let key

      replace = true

      for (key in allowed) {
        if (own.call(allowed, key)) {
          // @ts-expect-error: fine.
          // type-coverage:ignore-next-line
          const result = allowed[key](schema, node[key], node, stack)

          // eslint-disable-next-line max-depth
          if (result === false) {
            replace = undefined
            // Set the non-safe value.
            // @ts-expect-error: fine.
            // type-coverage:ignore-next-line
            replacement[key] = node[key]
          } else if (result !== undefined && result !== null) {
            // @ts-expect-error: fine.
            // type-coverage:ignore-next-line
            replacement[key] = result
          }
        }
      }
    }
  }

  if (replace) {
    return replacement
  }

  return replacement.type === 'element' &&
    schema.strip &&
    !schema.strip.includes(replacement.tagName)
    ? replacement.children
    : undefined
}

/**
 * Sanitize `children`.
 *
 * @type {Handler}
 * @param {Array<Node>} children
 * @param {Node} node
 * @returns {Array<Node>}
 */
function all(schema, children, node, stack) {
  /** @type {Array<Node>} */
  const results = []

  if (Array.isArray(children)) {
    let index = -1

    if (node.type === 'element') {
      stack.push(node.tagName)
    }

    while (++index < children.length) {
      const value = one(schema, children[index], stack)

      if (value) {
        if (Array.isArray(value)) {
          results.push(...value)
        } else {
          results.push(value)
        }
      }
    }

    if (node.type === 'element') {
      stack.pop()
    }
  }

  return results
}

/** @type {NodeDefinitionGetter} */
function handleDoctype(schema) {
  return schema.allowDoctypes ? {name: handleDoctypeName} : undefined
}

/** @type {NodeDefinitionGetter} */
function handleComment(schema) {
  return schema.allowComments ? {value: handleCommentValue} : undefined
}

/**
 * Sanitize `properties`.
 *
 * @type {Handler}
 * @param {Properties} properties
 * @param {Element} node
 * @returns {Properties}
 */
function handleProperties(schema, properties, node, stack) {
  const name = handleTagName(schema, node.tagName, node, stack)
  /* c8 ignore next */
  const attrs = schema.attributes || {}
  /* c8 ignore next */
  const reqs = schema.required || {}
  const props = properties || {}
  const allowed = Object.assign(
    {},
    toPropertyValueMap(attrs['*']),
    toPropertyValueMap(name && own.call(attrs, name) ? attrs[name] : [])
  )
  /** @type {Properties} */
  const result = {}
  /** @type {string} */
  let key

  for (key in props) {
    if (own.call(props, key)) {
      let value = props[key]
      /** @type {AttributeClean[string]} */
      let definition

      if (own.call(allowed, key)) {
        definition = allowed[key]
      } else if (data(key) && own.call(allowed, 'data*')) {
        definition = allowed['data*']
      } else {
        continue
      }

      value = Array.isArray(value)
        ? handlePropertyValues(schema, value, key, definition)
        : handlePropertyValue(schema, value, key, definition)

      if (value !== undefined && value !== null) {
        result[key] = value
      }
    }
  }

  if (name && own.call(reqs, name)) {
    for (key in reqs[name]) {
      if (!own.call(result, key)) {
        result[key] = reqs[name][key]
      }
    }
  }

  return result
}

/**
 * Always return a valid HTML5 doctype.
 *
 * @type {Handler}
 * @returns {string}
 */
function handleDoctypeName() {
  return 'html'
}

/**
 * Sanitize `tagName`.
 *
 * @param {Schema} schema
 * @param {string} tagName
 * @param {Node} _
 * @param {Array<string>} stack
 * @returns {string | false}
 */
function handleTagName(schema, tagName, _, stack) {
  const name = typeof tagName === 'string' ? tagName : ''
  let index = -1

  if (
    !name ||
    name === '*' ||
    (schema.tagNames && !schema.tagNames.includes(name))
  ) {
    return false
  }

  // Some nodes can break out of their context if they don’t have a certain
  // ancestor.
  if (schema.ancestors && own.call(schema.ancestors, name)) {
    while (++index < schema.ancestors[name].length) {
      if (stack.includes(schema.ancestors[name][index])) {
        return name
      }
    }

    return false
  }

  return name
}

/**
 * See <https://html.spec.whatwg.org/multipage/parsing.html#serialising-html-fragments>
 *
 * @type {Handler}
 * @param {unknown} value
 * @returns {string}
 */
function handleCommentValue(_, value) {
  /** @type {string} */
  const result = typeof value === 'string' ? value : ''
  const index = result.indexOf('-->')
  return index < 0 ? result : result.slice(0, index)
}

/**
 * Sanitize `value`.
 *
 * @type {Handler}
 * @param {unknown} value
 * @returns {string}
 */
function handleValue(_, value) {
  return typeof value === 'string' ? value : ''
}

/**
 * Allow `value`.
 *
 * @type {Handler}
 * @param {unknown} value
 */
function allow(_, value) {
  return value
}

/**
 * Sanitize a property value which is a list.
 *
 * @param {Schema} schema
 * @param {Array<unknown>} values
 * @param {string} prop
 * @param {AttributeClean[string]} definition
 * @returns {Array<string | number>}
 */
function handlePropertyValues(schema, values, prop, definition) {
  let index = -1
  /** @type {Array<string | number>} */
  const result = []

  while (++index < values.length) {
    const value = handlePropertyValue(schema, values[index], prop, definition)

    if (value !== undefined && value !== null) {
      // @ts-expect-error Assume no booleans were in arrays.
      result.push(value)
    }
  }

  return result
}

/**
 * Sanitize a property value.
 *
 * @param {Schema} schema
 * @param {unknown} value
 * @param {string} prop
 * @param {AttributeClean[string]} definition
 * @returns {PropertyValue}
 */
function handlePropertyValue(schema, value, prop, definition) {
  if (
    (typeof value === 'boolean' ||
      typeof value === 'number' ||
      typeof value === 'string') &&
    safeProtocol(schema, value, prop) &&
    (definition.length === 0 ||
      definition.some((allowed) =>
        allowed && typeof allowed === 'object' && 'flags' in allowed
          ? allowed.test(String(value))
          : allowed === value
      ))
  ) {
    return schema.clobberPrefix &&
      schema.clobber &&
      schema.clobber.includes(prop)
      ? schema.clobberPrefix + value
      : value
  }
}

/**
 * Check whether `value` is a safe URL.
 *
 * @param {Schema} schema
 * @param {unknown} value
 * @param {string} prop
 * @returns {boolean}
 */
function safeProtocol(schema, value, prop) {
  const url = String(value)
  const colon = url.indexOf(':')
  const questionMark = url.indexOf('?')
  const numberSign = url.indexOf('#')
  const slash = url.indexOf('/')
  const protocols =
    schema.protocols && own.call(schema.protocols, prop)
      ? schema.protocols[prop].concat()
      : []
  let index = -1

  if (
    protocols.length === 0 ||
    colon < 0 ||
    // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    (slash > -1 && colon > slash) ||
    (questionMark > -1 && colon > questionMark) ||
    (numberSign > -1 && colon > numberSign)
  ) {
    return true
  }

  while (++index < protocols.length) {
    if (
      colon === protocols[index].length &&
      url.slice(0, protocols[index].length) === protocols[index]
    ) {
      return true
    }
  }

  return false
}

/**
 * Create a map from a list of props or a list of properties and values.
 *
 * @param {Attributes[string]} values
 * @returns {AttributeClean}
 */
function toPropertyValueMap(values) {
  /** @type {AttributeClean} */
  const result = {}
  let index = -1

  while (++index < values.length) {
    const value = values[index]

    if (Array.isArray(value)) {
      result[value[0]] = value.slice(1)
    } else {
      result[value] = []
    }
  }

  return result
}

/**
 * Check if `prop` is a data property.
 *
 * @param {string} prop
 * @returns {boolean}
 */
function data(prop) {
  return prop.length > 4 && prop.slice(0, 4).toLowerCase() === 'data'
}
