/** @type {import('unified').Plugin<[Options]|void[], Node, string>} */
export default function remarkStringify(options: void | Options): void
export type Node = import('mdast').Root | import('mdast').Content
export type ToMarkdownOptions = import('mdast-util-to-markdown').Options
export type Options = Omit<ToMarkdownOptions, 'extensions'>
