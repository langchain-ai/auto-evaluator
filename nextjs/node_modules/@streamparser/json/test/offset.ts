import { runTokenizerTest } from "./utils/testRunner.js";
import { Tokenizer } from "../src/index.js";
import TokenType from "../src/utils/types/tokenType.js";

const input1 = '{\n  "string": "value",\n  "number": 3,\n  "object"';
const input2 = ': {\n  "key": "vд"\n  },\n  "array": [\n  -1,\n  12\n  ]\n  ';
const input3 = '"null": null, "true": true, "false": false, "frac": 3.14 }';

const offsets = [
  [0, TokenType.LEFT_BRACE],
  [4, TokenType.STRING],
  [12, TokenType.COLON],
  [14, TokenType.STRING],
  [21, TokenType.COMMA],
  [25, TokenType.STRING],
  [33, TokenType.COLON],
  [35, TokenType.NUMBER],
  [36, TokenType.COMMA],
  [40, TokenType.STRING],
  [48, TokenType.COLON],
  [50, TokenType.LEFT_BRACE],
  [54, TokenType.STRING],
  [59, TokenType.COLON],
  [61, TokenType.STRING],
  [69, TokenType.RIGHT_BRACE],
  [70, TokenType.COMMA],
  [74, TokenType.STRING],
  [81, TokenType.COLON],
  [83, TokenType.LEFT_BRACKET],
  [87, TokenType.NUMBER],
  [89, TokenType.COMMA],
  [93, TokenType.NUMBER],
  [98, TokenType.RIGHT_BRACKET],
  [102, TokenType.STRING],
  [108, TokenType.COLON],
  [110, TokenType.NULL],
  [114, TokenType.COMMA],
  [116, TokenType.STRING],
  [122, TokenType.COLON],
  [124, TokenType.TRUE],
  [128, TokenType.COMMA],
  [130, TokenType.STRING],
  [137, TokenType.COLON],
  [139, TokenType.FALSE],
  [144, TokenType.COMMA],
  [146, TokenType.STRING],
  [152, TokenType.COLON],
  [154, TokenType.NUMBER],
  [159, TokenType.RIGHT_BRACE],
];

test("offset", async () => {
  let i = 0;

  await runTokenizerTest(
    new Tokenizer(),
    [input1, input2, input3],
    ({ token, offset }) => {
      expect(offset).toEqual(offsets[i][0]);
      expect(token).toEqual(offsets[i][1]);
      i += 1;
    }
  );
});
