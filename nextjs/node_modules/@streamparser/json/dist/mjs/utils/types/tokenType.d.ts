declare const enum TokenType {
    LEFT_BRACE = 0,
    RIGHT_BRACE = 1,
    LEFT_BRACKET = 2,
    RIGHT_BRACKET = 3,
    COLON = 4,
    COMMA = 5,
    TRUE = 6,
    FALSE = 7,
    NULL = 8,
    STRING = 9,
    NUMBER = 10,
    SEPARATOR = 11
}
export declare function TokenTypeToString(tokenType: TokenType): string;
export default TokenType;
