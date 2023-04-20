import { JsonKey, JsonStruct } from "./jsonTypes.js";
export declare const enum TokenParserMode {
    OBJECT = 0,
    ARRAY = 1
}
export interface StackElement {
    key: JsonKey;
    value: JsonStruct;
    mode?: TokenParserMode;
    emit: boolean;
}
