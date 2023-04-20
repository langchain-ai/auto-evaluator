import { JsonKey, JsonStruct } from "./jsonTypes.ts";

export const enum TokenParserMode {
  OBJECT,
  ARRAY,
}

export interface StackElement {
  key: JsonKey;
  value: JsonStruct;
  mode?: TokenParserMode;
  emit: boolean;
}
