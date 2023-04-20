"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenizerError = void 0;
const utf_8_js_1 = require("./utils/utf-8.js");
const bufferedString_js_1 = require("./utils/bufferedString.js");
// Tokenizer States
var TokenizerStates;
(function (TokenizerStates) {
    TokenizerStates[TokenizerStates["START"] = 0] = "START";
    TokenizerStates[TokenizerStates["ENDED"] = 1] = "ENDED";
    TokenizerStates[TokenizerStates["ERROR"] = 2] = "ERROR";
    TokenizerStates[TokenizerStates["TRUE1"] = 3] = "TRUE1";
    TokenizerStates[TokenizerStates["TRUE2"] = 4] = "TRUE2";
    TokenizerStates[TokenizerStates["TRUE3"] = 5] = "TRUE3";
    TokenizerStates[TokenizerStates["FALSE1"] = 6] = "FALSE1";
    TokenizerStates[TokenizerStates["FALSE2"] = 7] = "FALSE2";
    TokenizerStates[TokenizerStates["FALSE3"] = 8] = "FALSE3";
    TokenizerStates[TokenizerStates["FALSE4"] = 9] = "FALSE4";
    TokenizerStates[TokenizerStates["NULL1"] = 10] = "NULL1";
    TokenizerStates[TokenizerStates["NULL2"] = 11] = "NULL2";
    TokenizerStates[TokenizerStates["NULL3"] = 12] = "NULL3";
    TokenizerStates[TokenizerStates["STRING_DEFAULT"] = 13] = "STRING_DEFAULT";
    TokenizerStates[TokenizerStates["STRING_AFTER_BACKSLASH"] = 14] = "STRING_AFTER_BACKSLASH";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_1"] = 15] = "STRING_UNICODE_DIGIT_1";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_2"] = 16] = "STRING_UNICODE_DIGIT_2";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_3"] = 17] = "STRING_UNICODE_DIGIT_3";
    TokenizerStates[TokenizerStates["STRING_UNICODE_DIGIT_4"] = 18] = "STRING_UNICODE_DIGIT_4";
    TokenizerStates[TokenizerStates["STRING_INCOMPLETE_CHAR"] = 19] = "STRING_INCOMPLETE_CHAR";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_INITIAL_MINUS"] = 20] = "NUMBER_AFTER_INITIAL_MINUS";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_INITIAL_ZERO"] = 21] = "NUMBER_AFTER_INITIAL_ZERO";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_INITIAL_NON_ZERO"] = 22] = "NUMBER_AFTER_INITIAL_NON_ZERO";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_FULL_STOP"] = 23] = "NUMBER_AFTER_FULL_STOP";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_DECIMAL"] = 24] = "NUMBER_AFTER_DECIMAL";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_E"] = 25] = "NUMBER_AFTER_E";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_E_AND_SIGN"] = 26] = "NUMBER_AFTER_E_AND_SIGN";
    TokenizerStates[TokenizerStates["NUMBER_AFTER_E_AND_DIGIT"] = 27] = "NUMBER_AFTER_E_AND_DIGIT";
    TokenizerStates[TokenizerStates["SEPARATOR"] = 28] = "SEPARATOR";
})(TokenizerStates || (TokenizerStates = {}));
function TokenizerStateToString(tokenizerState) {
    return [
        "START",
        "ENDED",
        "ERROR",
        "TRUE1",
        "TRUE2",
        "TRUE3",
        "FALSE1",
        "FALSE2",
        "FALSE3",
        "FALSE4",
        "NULL1",
        "NULL2",
        "NULL3",
        "STRING_DEFAULT",
        "STRING_AFTER_BACKSLASH",
        "STRING_UNICODE_DIGIT_1",
        "STRING_UNICODE_DIGIT_2",
        "STRING_UNICODE_DIGIT_3",
        "STRING_UNICODE_DIGIT_4",
        "STRING_INCOMPLETE_CHAR",
        "NUMBER_AFTER_INITIAL_MINUS",
        "NUMBER_AFTER_INITIAL_ZERO",
        "NUMBER_AFTER_INITIAL_NON_ZERO",
        "NUMBER_AFTER_FULL_STOP",
        "NUMBER_AFTER_DECIMAL",
        "NUMBER_AFTER_E",
        "NUMBER_AFTER_E_AND_SIGN",
        "NUMBER_AFTER_E_AND_DIGIT",
        "SEPARATOR",
    ][tokenizerState];
}
const defaultOpts = {
    stringBufferSize: 0,
    numberBufferSize: 0,
    separator: undefined,
};
class TokenizerError extends Error {
    constructor(message) {
        super(message);
        // Typescript is broken. This is a workaround
        Object.setPrototypeOf(this, TokenizerError.prototype);
    }
}
exports.TokenizerError = TokenizerError;
class Tokenizer {
    constructor(opts) {
        this.state = 0 /* TokenizerStates.START */;
        this.separatorIndex = 0;
        this.bytes_remaining = 0; // number of bytes remaining in multi byte utf8 char to read after split boundary
        this.bytes_in_sequence = 0; // bytes in multi byte utf8 char to read
        this.char_split_buffer = new Uint8Array(4); // for rebuilding chars split before boundary is reached
        this.encoder = new TextEncoder();
        this.offset = -1;
        opts = Object.assign(Object.assign({}, defaultOpts), opts);
        this.bufferedString =
            opts.stringBufferSize && opts.stringBufferSize > 4
                ? new bufferedString_js_1.BufferedString(opts.stringBufferSize)
                : new bufferedString_js_1.NonBufferedString();
        this.bufferedNumber =
            opts.numberBufferSize && opts.numberBufferSize > 0
                ? new bufferedString_js_1.BufferedString(opts.numberBufferSize)
                : new bufferedString_js_1.NonBufferedString();
        this.separator = opts.separator;
        this.separatorBytes = opts.separator
            ? this.encoder.encode(opts.separator)
            : undefined;
    }
    get isEnded() {
        return this.state === 1 /* TokenizerStates.ENDED */;
    }
    write(input) {
        try {
            let buffer;
            if (input instanceof Uint8Array) {
                buffer = input;
            }
            else if (typeof input === "string") {
                buffer = this.encoder.encode(input);
            }
            else if ((typeof input === "object" && "buffer" in input) ||
                Array.isArray(input)) {
                buffer = Uint8Array.from(input);
            }
            else {
                throw new TypeError("Unexpected type. The `write` function only accepts Arrays, TypedArrays and Strings.");
            }
            for (let i = 0; i < buffer.length; i += 1) {
                const n = buffer[i]; // get current byte from buffer
                switch (this.state) {
                    case 0 /* TokenizerStates.START */:
                        this.offset += 1;
                        if (this.separatorBytes && n === this.separatorBytes[0]) {
                            if (this.separatorBytes.length === 1) {
                                this.state = 0 /* TokenizerStates.START */;
                                this.onToken({
                                    token: 11 /* TokenType.SEPARATOR */,
                                    value: this.separator,
                                    offset: this.offset + this.separatorBytes.length - 1,
                                });
                                continue;
                            }
                            this.state = 28 /* TokenizerStates.SEPARATOR */;
                            continue;
                        }
                        if (n === 32 /* charset.SPACE */ ||
                            n === 10 /* charset.NEWLINE */ ||
                            n === 13 /* charset.CARRIAGE_RETURN */ ||
                            n === 9 /* charset.TAB */) {
                            // whitespace
                            continue;
                        }
                        if (n === 123 /* charset.LEFT_CURLY_BRACKET */) {
                            this.onToken({
                                token: 0 /* TokenType.LEFT_BRACE */,
                                value: "{",
                                offset: this.offset,
                            });
                            continue;
                        }
                        if (n === 125 /* charset.RIGHT_CURLY_BRACKET */) {
                            this.onToken({
                                token: 1 /* TokenType.RIGHT_BRACE */,
                                value: "}",
                                offset: this.offset,
                            });
                            continue;
                        }
                        if (n === 91 /* charset.LEFT_SQUARE_BRACKET */) {
                            this.onToken({
                                token: 2 /* TokenType.LEFT_BRACKET */,
                                value: "[",
                                offset: this.offset,
                            });
                            continue;
                        }
                        if (n === 93 /* charset.RIGHT_SQUARE_BRACKET */) {
                            this.onToken({
                                token: 3 /* TokenType.RIGHT_BRACKET */,
                                value: "]",
                                offset: this.offset,
                            });
                            continue;
                        }
                        if (n === 58 /* charset.COLON */) {
                            this.onToken({
                                token: 4 /* TokenType.COLON */,
                                value: ":",
                                offset: this.offset,
                            });
                            continue;
                        }
                        if (n === 44 /* charset.COMMA */) {
                            this.onToken({
                                token: 5 /* TokenType.COMMA */,
                                value: ",",
                                offset: this.offset,
                            });
                            continue;
                        }
                        if (n === 116 /* charset.LATIN_SMALL_LETTER_T */) {
                            this.state = 3 /* TokenizerStates.TRUE1 */;
                            continue;
                        }
                        if (n === 102 /* charset.LATIN_SMALL_LETTER_F */) {
                            this.state = 6 /* TokenizerStates.FALSE1 */;
                            continue;
                        }
                        if (n === 110 /* charset.LATIN_SMALL_LETTER_N */) {
                            this.state = 10 /* TokenizerStates.NULL1 */;
                            continue;
                        }
                        if (n === 34 /* charset.QUOTATION_MARK */) {
                            this.bufferedString.reset();
                            this.state = 13 /* TokenizerStates.STRING_DEFAULT */;
                            continue;
                        }
                        if (n >= 49 /* charset.DIGIT_ONE */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.reset();
                            this.bufferedNumber.appendChar(n);
                            this.state = 22 /* TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO */;
                            continue;
                        }
                        if (n === 48 /* charset.DIGIT_ZERO */) {
                            this.bufferedNumber.reset();
                            this.bufferedNumber.appendChar(n);
                            this.state = 21 /* TokenizerStates.NUMBER_AFTER_INITIAL_ZERO */;
                            continue;
                        }
                        if (n === 45 /* charset.HYPHEN_MINUS */) {
                            this.bufferedNumber.reset();
                            this.bufferedNumber.appendChar(n);
                            this.state = 20 /* TokenizerStates.NUMBER_AFTER_INITIAL_MINUS */;
                            continue;
                        }
                        break;
                    // STRING
                    case 13 /* TokenizerStates.STRING_DEFAULT */:
                        if (n === 34 /* charset.QUOTATION_MARK */) {
                            const string = this.bufferedString.toString();
                            this.state = 0 /* TokenizerStates.START */;
                            this.onToken({
                                token: 9 /* TokenType.STRING */,
                                value: string,
                                offset: this.offset,
                            });
                            this.offset += this.bufferedString.byteLength + 1;
                            continue;
                        }
                        if (n === 92 /* charset.REVERSE_SOLIDUS */) {
                            this.state = 14 /* TokenizerStates.STRING_AFTER_BACKSLASH */;
                            continue;
                        }
                        if (n >= 128) {
                            // Parse multi byte (>=128) chars one at a time
                            if (n >= 194 && n <= 223) {
                                this.bytes_in_sequence = 2;
                            }
                            else if (n <= 239) {
                                this.bytes_in_sequence = 3;
                            }
                            else {
                                this.bytes_in_sequence = 4;
                            }
                            if (this.bytes_in_sequence <= buffer.length - i) {
                                // if bytes needed to complete char fall outside buffer length, we have a boundary split
                                this.bufferedString.appendBuf(buffer, i, i + this.bytes_in_sequence);
                                i += this.bytes_in_sequence - 1;
                                continue;
                            }
                            this.bytes_remaining = i + this.bytes_in_sequence - buffer.length;
                            this.char_split_buffer.set(buffer.subarray(i));
                            i = buffer.length - 1;
                            this.state = 19 /* TokenizerStates.STRING_INCOMPLETE_CHAR */;
                            continue;
                        }
                        if (n >= 32 /* charset.SPACE */) {
                            this.bufferedString.appendChar(n);
                            continue;
                        }
                        break;
                    case 19 /* TokenizerStates.STRING_INCOMPLETE_CHAR */:
                        // check for carry over of a multi byte char split between data chunks
                        // & fill temp buffer it with start of this data chunk up to the boundary limit set in the last iteration
                        this.char_split_buffer.set(buffer.subarray(i, i + this.bytes_remaining), this.bytes_in_sequence - this.bytes_remaining);
                        this.bufferedString.appendBuf(this.char_split_buffer, 0, this.bytes_in_sequence);
                        i = this.bytes_remaining - 1;
                        this.state = 13 /* TokenizerStates.STRING_DEFAULT */;
                        continue;
                    case 14 /* TokenizerStates.STRING_AFTER_BACKSLASH */:
                        const controlChar = utf_8_js_1.escapedSequences[n];
                        if (controlChar) {
                            this.bufferedString.appendChar(controlChar);
                            this.state = 13 /* TokenizerStates.STRING_DEFAULT */;
                            continue;
                        }
                        if (n === 117 /* charset.LATIN_SMALL_LETTER_U */) {
                            this.unicode = "";
                            this.state = 15 /* TokenizerStates.STRING_UNICODE_DIGIT_1 */;
                            continue;
                        }
                        break;
                    case 15 /* TokenizerStates.STRING_UNICODE_DIGIT_1 */:
                    case 16 /* TokenizerStates.STRING_UNICODE_DIGIT_2 */:
                    case 17 /* TokenizerStates.STRING_UNICODE_DIGIT_3 */:
                        if ((n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) ||
                            (n >= 65 /* charset.LATIN_CAPITAL_LETTER_A */ &&
                                n <= 70 /* charset.LATIN_CAPITAL_LETTER_F */) ||
                            (n >= 97 /* charset.LATIN_SMALL_LETTER_A */ &&
                                n <= 102 /* charset.LATIN_SMALL_LETTER_F */)) {
                            this.unicode += String.fromCharCode(n);
                            this.state += 1;
                            continue;
                        }
                        break;
                    case 18 /* TokenizerStates.STRING_UNICODE_DIGIT_4 */:
                        if ((n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) ||
                            (n >= 65 /* charset.LATIN_CAPITAL_LETTER_A */ &&
                                n <= 70 /* charset.LATIN_CAPITAL_LETTER_F */) ||
                            (n >= 97 /* charset.LATIN_SMALL_LETTER_A */ &&
                                n <= 102 /* charset.LATIN_SMALL_LETTER_F */)) {
                            const intVal = parseInt(this.unicode + String.fromCharCode(n), 16);
                            if (this.highSurrogate === undefined) {
                                if (intVal >= 0xd800 && intVal <= 0xdbff) {
                                    //<55296,56319> - highSurrogate
                                    this.highSurrogate = intVal;
                                }
                                else {
                                    this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(intVal)));
                                }
                            }
                            else {
                                if (intVal >= 0xdc00 && intVal <= 0xdfff) {
                                    //<56320,57343> - lowSurrogate
                                    this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(this.highSurrogate, intVal)));
                                }
                                else {
                                    this.bufferedString.appendBuf(this.encoder.encode(String.fromCharCode(this.highSurrogate)));
                                }
                                this.highSurrogate = undefined;
                            }
                            this.state = 13 /* TokenizerStates.STRING_DEFAULT */;
                            continue;
                        }
                    // Number
                    case 20 /* TokenizerStates.NUMBER_AFTER_INITIAL_MINUS */:
                        if (n === 48 /* charset.DIGIT_ZERO */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 21 /* TokenizerStates.NUMBER_AFTER_INITIAL_ZERO */;
                            continue;
                        }
                        if (n >= 49 /* charset.DIGIT_ONE */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 22 /* TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO */;
                            continue;
                        }
                        break;
                    case 21 /* TokenizerStates.NUMBER_AFTER_INITIAL_ZERO */:
                        if (n === 46 /* charset.FULL_STOP */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 23 /* TokenizerStates.NUMBER_AFTER_FULL_STOP */;
                            continue;
                        }
                        if (n === 101 /* charset.LATIN_SMALL_LETTER_E */ ||
                            n === 69 /* charset.LATIN_CAPITAL_LETTER_E */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 25 /* TokenizerStates.NUMBER_AFTER_E */;
                            continue;
                        }
                        i -= 1;
                        this.state = 0 /* TokenizerStates.START */;
                        this.emitNumber();
                        continue;
                    case 22 /* TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO */:
                        if (n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.appendChar(n);
                            continue;
                        }
                        if (n === 46 /* charset.FULL_STOP */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 23 /* TokenizerStates.NUMBER_AFTER_FULL_STOP */;
                            continue;
                        }
                        if (n === 101 /* charset.LATIN_SMALL_LETTER_E */ ||
                            n === 69 /* charset.LATIN_CAPITAL_LETTER_E */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 25 /* TokenizerStates.NUMBER_AFTER_E */;
                            continue;
                        }
                        i -= 1;
                        this.state = 0 /* TokenizerStates.START */;
                        this.emitNumber();
                        continue;
                    case 23 /* TokenizerStates.NUMBER_AFTER_FULL_STOP */:
                        if (n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 24 /* TokenizerStates.NUMBER_AFTER_DECIMAL */;
                            continue;
                        }
                        break;
                    case 24 /* TokenizerStates.NUMBER_AFTER_DECIMAL */:
                        if (n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.appendChar(n);
                            continue;
                        }
                        if (n === 101 /* charset.LATIN_SMALL_LETTER_E */ ||
                            n === 69 /* charset.LATIN_CAPITAL_LETTER_E */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 25 /* TokenizerStates.NUMBER_AFTER_E */;
                            continue;
                        }
                        i -= 1;
                        this.state = 0 /* TokenizerStates.START */;
                        this.emitNumber();
                        continue;
                    case 25 /* TokenizerStates.NUMBER_AFTER_E */:
                        if (n === 43 /* charset.PLUS_SIGN */ || n === 45 /* charset.HYPHEN_MINUS */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 26 /* TokenizerStates.NUMBER_AFTER_E_AND_SIGN */;
                            continue;
                        }
                    // Allow cascading
                    case 26 /* TokenizerStates.NUMBER_AFTER_E_AND_SIGN */:
                        if (n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.appendChar(n);
                            this.state = 27 /* TokenizerStates.NUMBER_AFTER_E_AND_DIGIT */;
                            continue;
                        }
                        break;
                    case 27 /* TokenizerStates.NUMBER_AFTER_E_AND_DIGIT */:
                        if (n >= 48 /* charset.DIGIT_ZERO */ && n <= 57 /* charset.DIGIT_NINE */) {
                            this.bufferedNumber.appendChar(n);
                            continue;
                        }
                        i -= 1;
                        this.state = 0 /* TokenizerStates.START */;
                        this.emitNumber();
                        continue;
                    // TRUE
                    case 3 /* TokenizerStates.TRUE1 */:
                        if (n === 114 /* charset.LATIN_SMALL_LETTER_R */) {
                            this.state = 4 /* TokenizerStates.TRUE2 */;
                            continue;
                        }
                        break;
                    case 4 /* TokenizerStates.TRUE2 */:
                        if (n === 117 /* charset.LATIN_SMALL_LETTER_U */) {
                            this.state = 5 /* TokenizerStates.TRUE3 */;
                            continue;
                        }
                        break;
                    case 5 /* TokenizerStates.TRUE3 */:
                        if (n === 101 /* charset.LATIN_SMALL_LETTER_E */) {
                            this.state = 0 /* TokenizerStates.START */;
                            this.onToken({
                                token: 6 /* TokenType.TRUE */,
                                value: true,
                                offset: this.offset,
                            });
                            this.offset += 3;
                            continue;
                        }
                        break;
                    // FALSE
                    case 6 /* TokenizerStates.FALSE1 */:
                        if (n === 97 /* charset.LATIN_SMALL_LETTER_A */) {
                            this.state = 7 /* TokenizerStates.FALSE2 */;
                            continue;
                        }
                        break;
                    case 7 /* TokenizerStates.FALSE2 */:
                        if (n === 108 /* charset.LATIN_SMALL_LETTER_L */) {
                            this.state = 8 /* TokenizerStates.FALSE3 */;
                            continue;
                        }
                        break;
                    case 8 /* TokenizerStates.FALSE3 */:
                        if (n === 115 /* charset.LATIN_SMALL_LETTER_S */) {
                            this.state = 9 /* TokenizerStates.FALSE4 */;
                            continue;
                        }
                        break;
                    case 9 /* TokenizerStates.FALSE4 */:
                        if (n === 101 /* charset.LATIN_SMALL_LETTER_E */) {
                            this.state = 0 /* TokenizerStates.START */;
                            this.onToken({
                                token: 7 /* TokenType.FALSE */,
                                value: false,
                                offset: this.offset,
                            });
                            this.offset += 4;
                            continue;
                        }
                        break;
                    // NULL
                    case 10 /* TokenizerStates.NULL1 */:
                        if (n === 117 /* charset.LATIN_SMALL_LETTER_U */) {
                            this.state = 11 /* TokenizerStates.NULL2 */;
                            continue;
                        }
                        break;
                    case 11 /* TokenizerStates.NULL2 */:
                        if (n === 108 /* charset.LATIN_SMALL_LETTER_L */) {
                            this.state = 12 /* TokenizerStates.NULL3 */;
                            continue;
                        }
                        break;
                    case 12 /* TokenizerStates.NULL3 */:
                        if (n === 108 /* charset.LATIN_SMALL_LETTER_L */) {
                            this.state = 0 /* TokenizerStates.START */;
                            this.onToken({
                                token: 8 /* TokenType.NULL */,
                                value: null,
                                offset: this.offset,
                            });
                            this.offset += 3;
                            continue;
                        }
                        break;
                    case 28 /* TokenizerStates.SEPARATOR */:
                        this.separatorIndex += 1;
                        if (!this.separatorBytes ||
                            n !== this.separatorBytes[this.separatorIndex]) {
                            break;
                        }
                        if (this.separatorIndex === this.separatorBytes.length - 1) {
                            this.state = 0 /* TokenizerStates.START */;
                            this.onToken({
                                token: 11 /* TokenType.SEPARATOR */,
                                value: this.separator,
                                offset: this.offset + this.separatorIndex,
                            });
                            this.separatorIndex = 0;
                        }
                        continue;
                    case 1 /* TokenizerStates.ENDED */:
                        if (n === 32 /* charset.SPACE */ ||
                            n === 10 /* charset.NEWLINE */ ||
                            n === 13 /* charset.CARRIAGE_RETURN */ ||
                            n === 9 /* charset.TAB */) {
                            // whitespace
                            continue;
                        }
                }
                throw new TokenizerError(`Unexpected "${String.fromCharCode(n)}" at position "${i}" in state ${TokenizerStateToString(this.state)}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            this.error(err);
        }
    }
    emitNumber() {
        this.onToken({
            token: 10 /* TokenType.NUMBER */,
            value: this.parseNumber(this.bufferedNumber.toString()),
            offset: this.offset,
        });
        this.offset += this.bufferedNumber.byteLength - 1;
    }
    parseNumber(numberStr) {
        return Number(numberStr);
    }
    error(err) {
        if (this.state !== 1 /* TokenizerStates.ENDED */) {
            this.state = 2 /* TokenizerStates.ERROR */;
        }
        this.onError(err);
    }
    end() {
        switch (this.state) {
            case 21 /* TokenizerStates.NUMBER_AFTER_INITIAL_ZERO */:
            case 22 /* TokenizerStates.NUMBER_AFTER_INITIAL_NON_ZERO */:
            case 24 /* TokenizerStates.NUMBER_AFTER_DECIMAL */:
            case 27 /* TokenizerStates.NUMBER_AFTER_E_AND_DIGIT */:
                this.state = 1 /* TokenizerStates.ENDED */;
                this.emitNumber();
                this.onEnd();
                break;
            case 0 /* TokenizerStates.START */:
            case 2 /* TokenizerStates.ERROR */:
            case 28 /* TokenizerStates.SEPARATOR */:
                this.state = 1 /* TokenizerStates.ENDED */;
                this.onEnd();
                break;
            default:
                this.error(new TokenizerError(`Tokenizer ended in the middle of a token (state: ${TokenizerStateToString(this.state)}). Either not all the data was received or the data was invalid.`));
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onToken(parsedToken) {
        // Override me
        throw new TokenizerError('Can\'t emit tokens before the "onToken" callback has been set up.');
    }
    onError(err) {
        // Override me
        throw err;
    }
    onEnd() {
        // Override me
    }
}
exports.default = Tokenizer;
//# sourceMappingURL=tokenizer.js.map