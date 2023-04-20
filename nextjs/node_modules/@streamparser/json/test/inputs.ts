import { runJSONParserTest, TestData } from "./utils/testRunner.js";
import JSONParser from "../src/jsonparser.js";
import { charset } from "../src/utils/utf-8.js";

const quote = String.fromCharCode(charset.QUOTATION_MARK);

describe("inputs", () => {
  const testData: TestData[] = [
    {
      value: "test",
      expected: ["test"],
    },
    {
      value: new Uint8Array([116, 101, 115, 116]),
      expected: ["test"],
    },
    {
      value: new Uint16Array([116, 101, 115, 116]),
      expected: ["test"],
    },
    {
      value: new Uint32Array([116, 101, 115, 116]),
      expected: ["test"],
    },
    {
      value: [116, 101, 115, 116],
      expected: ["test"],
    },
  ];

  testData.forEach(({ value, expected: [expected] }) => {
    test(`write accept ${value}`, async () => {
      await runJSONParserTest(
        new JSONParser(),
        [quote, value, quote],
        ({ value }) => expect(value).toEqual(expected)
      );
    });
  });

  test("write throw on invalid type", async () => {
    try {
      await runJSONParserTest(
        new JSONParser(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [745674 as any]
      );
      fail("Expected to fail!");
    } catch (e) {
      // Expected error
    }
  });
});
