import { CamelCaseOptions } from './utilities';
declare type StyleObject = Record<string, string>;
interface StyleToJSOptions extends CamelCaseOptions {
}
export default function StyleToJS(style: string, options?: StyleToJSOptions): StyleObject;
export {};
