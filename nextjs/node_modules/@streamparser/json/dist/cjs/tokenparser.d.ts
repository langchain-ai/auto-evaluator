import { ParsedTokenInfo } from "./utils/types/parsedTokenInfo.js";
import { ParsedElementInfo } from "./utils/types/parsedElementInfo.js";
export interface TokenParserOptions {
    paths?: string[];
    keepStack?: boolean;
    separator?: string;
}
export declare class TokenParserError extends Error {
    constructor(message: string);
}
export default class TokenParser {
    private readonly paths?;
    private readonly keepStack;
    private readonly separator?;
    private state;
    private mode;
    private key;
    private value;
    private stack;
    constructor(opts?: TokenParserOptions);
    private shouldEmit;
    private push;
    private pop;
    private emit;
    get isEnded(): boolean;
    write({ token, value }: Omit<ParsedTokenInfo, "offset">): void;
    error(err: Error): void;
    end(): void;
    onValue(parsedElementInfo: ParsedElementInfo): void;
    onError(err: Error): void;
    onEnd(): void;
}
