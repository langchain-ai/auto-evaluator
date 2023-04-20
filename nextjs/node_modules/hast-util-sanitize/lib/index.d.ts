/**
 * Utility to sanitize a tree
 *
 * @param {Node} node
 *   Hast tree to sanitize
 * @param {Schema} [schema]
 *   Schema defining how to sanitize - defaults to Github style sanitation
 */
export function sanitize(node: Node, schema?: Schema | undefined): Node
export type Root = import('hast').Root
export type Content = import('hast').Content
export type Element = import('hast').Element
export type Properties = import('hast').Properties
export type Node = Content | Root
/**
 * Possible property values.
 */
export type PropertyValue = Properties[string]
/**
 * Possible primitive HTML attribute values.
 */
export type PrimitivePropertyValue = string | number | boolean
/**
 * Map of tag names to allow lists for each property.
 */
export type Attributes = Record<
  string,
  Array<string | [string, ...Array<PrimitivePropertyValue | RegExp>]>
>
/**
 * Normalized input.
 */
export type AttributeClean = Record<
  string,
  Array<PrimitivePropertyValue | RegExp>
>
/**
 * Sanitization configuration.
 */
export type Schema = {
  /**
   * Map of tag names to allowed properties.
   *
   * The special `'*'` key defines property names allowed on all elements.
   */
  attributes?: Attributes | undefined
  /**
   * Map of tag names to required property names and their default property value.
   */
  required?: Record<string, Record<string, PropertyValue>> | undefined
  /**
   * List of allowed tag names.
   */
  tagNames?: Array<string> | undefined
  /**
   * Map of protocols to allow in property values.
   */
  protocols?: Record<string, Array<string>> | undefined
  /**
   * Map of tag names to their required ancestor elements.
   */
  ancestors?: Record<string, Array<string>> | undefined
  /**
   * List of allowed property names which can clobber.
   */
  clobber?: Array<string> | undefined
  /**
   * Prefix to use before potentially clobbering property names.
   */
  clobberPrefix?: string | undefined
  /**
   * Names of elements to strip from the tree.
   */
  strip?: Array<string> | undefined
  /**
   * Whether to allow comments.
   */
  allowComments?: boolean | undefined
  /**
   * Whether to allow doctypes.
   */
  allowDoctypes?: boolean | undefined
}
export type Handler = (
  schema: Schema,
  value: any,
  node: any,
  stack: Array<string>
) => unknown
export type NodeDefinition = Record<string, Handler>
export type NodeDefinitionGetter = (
  schema: Schema,
  node: Node
) => NodeDefinition | undefined
export type NodeSchema = Record<string, NodeDefinition | NodeDefinitionGetter>
