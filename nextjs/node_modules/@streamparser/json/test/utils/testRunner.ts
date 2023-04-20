import JSONParser from "../../src/jsonparser.js";
import Tokenizer from "../../src/tokenizer.js";
import TokenParser from "../../src/tokenparser.js";
import { ParsedTokenInfo } from "../../src/utils/types/parsedTokenInfo.js";
import { ParsedElementInfo } from "../../src/utils/types/parsedElementInfo.js";

export type TestData = {
  value: string | Iterable<number>;
  paths?: string[];
  expected: any[];
};

type ParseableData = string | Iterable<number>;
type InputData<T> = T | T[] | (() => Generator<T>);

function iterableData<T>(data: InputData<T>): Iterable<T> {
  if (typeof data === "function") return (data as () => Generator<T>)();
  if (Array.isArray(data)) return data;
  return [data];
}

export function runJSONParserTest(
  jsonparser: JSONParser,
  data: InputData<ParseableData>,
  onValue: (parsedElementInfo: ParsedElementInfo) => void = () => {
    /* Do nothing */
  }
) {
  jsonparser.onValue = onValue;
  for (const value of iterableData(data)) {
    jsonparser.write(value);
  }
  // jsonparser.end();
}

export function runTokenizerTest(
  tokenizer: Tokenizer,
  data: InputData<ParseableData>,
  onToken: (parsedElementInfo: ParsedTokenInfo) => void = () => {
    /* Do nothing */
  }
) {
  tokenizer.onToken = onToken;
  for (const value of iterableData(data)) {
    tokenizer.write(value);
  }
  tokenizer.end();
}

export function runTokenParserTest(
  tokenParser: TokenParser,
  data: InputData<Omit<ParsedTokenInfo, "offset">>,
  onValue: (parsedElementInfo: ParsedElementInfo) => void = () => {
    /* Do nothing */
  }
) {
  tokenParser.onValue = onValue;
  for (const value of iterableData(data)) {
    tokenParser.write(value);
  }
  tokenParser.end();
}
