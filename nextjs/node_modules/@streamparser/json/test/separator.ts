import {
  runJSONParserTest,
  runTokenParserTest,
  TestData,
} from "./utils/testRunner.js";
import JSONParser from "../src/jsonparser.js";
import TokenParser from "../src/tokenparser.js";
import TokenType from "../src/utils/types/tokenType.js";

describe("separator", () => {
  const testData: TestData[] = [
    { value: "true", expected: [true] },
    { value: "false", expected: [false] },
    { value: "null", expected: [null] },
    { value: '"string"', expected: ["string"] },
    { value: "[1,2,3]", expected: [1, 2, 3, [1, 2, 3]] },
    {
      value: '{ "a": 0, "b": 1, "c": -1 }',
      expected: [0, 1, -1, { a: 0, b: 1, c: -1 }],
    },
  ];

  const expected = testData
    .map(({ expected }) => expected)
    .reduce((acc, val) => [...acc, ...val], []);

  const separators = ["", "\n", "\t\n", "abc", "SEPARATOR"];
  separators.forEach((separator) => {
    test(`separator: ${separator}`, async () => {
      let i = 0;

      await runJSONParserTest(
        new JSONParser({ separator }),
        testData.flatMap(({ value }) => [value, separator]),
        ({ value }) => {
          expect(value).toEqual(expected[i]);
          i += 1;
        }
      );
    });
  });

  test(`separator: fail on invalid value`, async () => {
    try {
      await runJSONParserTest(new JSONParser({ separator: "abc" }), ["abe"]);
    } catch (err: any) {
      expect(err.message).toEqual(
        'Unexpected "e" at position "2" in state SEPARATOR'
      );
    }
  });

  test(`fail on invalid token type`, async () => {
    try {
      await runTokenParserTest(new TokenParser({ separator: "\n" }), [
        { token: TokenType.TRUE, value: true },
        { token: TokenType.TRUE, value: true },
      ]);
      fail("Error expected on invalid selector");
    } catch (err: any) {
      expect(err.message).toEqual("Unexpected TRUE (true) in state SEPARATOR");
    }
  });

  test("fail on invalid value passed to TokenParser", async () => {
    try {
      await runTokenParserTest(new TokenParser({ separator: "\n" }), [
        { token: TokenType.TRUE, value: true },
        { token: TokenType.SEPARATOR, value: "\r\n" },
      ]);
      fail("Error expected on invalid selector");
    } catch (err: any) {
      expect(err.message).toEqual(
        'Unexpected SEPARATOR ("\\r\\n") in state SEPARATOR'
      );
    }
  });
});
