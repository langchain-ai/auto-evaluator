var TokenType;
(function (TokenType) {
    TokenType[TokenType["LEFT_BRACE"] = 0] = "LEFT_BRACE";
    TokenType[TokenType["RIGHT_BRACE"] = 1] = "RIGHT_BRACE";
    TokenType[TokenType["LEFT_BRACKET"] = 2] = "LEFT_BRACKET";
    TokenType[TokenType["RIGHT_BRACKET"] = 3] = "RIGHT_BRACKET";
    TokenType[TokenType["COLON"] = 4] = "COLON";
    TokenType[TokenType["COMMA"] = 5] = "COMMA";
    TokenType[TokenType["TRUE"] = 6] = "TRUE";
    TokenType[TokenType["FALSE"] = 7] = "FALSE";
    TokenType[TokenType["NULL"] = 8] = "NULL";
    TokenType[TokenType["STRING"] = 9] = "STRING";
    TokenType[TokenType["NUMBER"] = 10] = "NUMBER";
    TokenType[TokenType["SEPARATOR"] = 11] = "SEPARATOR";
})(TokenType || (TokenType = {}));
export function TokenTypeToString(tokenType) {
    return [
        "LEFT_BRACE",
        "RIGHT_BRACE",
        "LEFT_BRACKET",
        "RIGHT_BRACKET",
        "COLON",
        "COMMA",
        "TRUE",
        "FALSE",
        "NULL",
        "STRING",
        "NUMBER",
        "SEPARATOR",
    ][tokenType];
}
export default TokenType;
//# sourceMappingURL=tokenType.js.map