import { runJSONParserTest } from "../utils/testRunner.js";
import JSONParser from "../../src/jsonparser.js";

describe("number", () => {
  const values = [
    "0",
    "0e1",
    "0e+1",
    "0e-1",
    "0.123",
    "0.123e00",
    "0.123e+1",
    "0.123e-1",
    "0.123E00",
    "0.123E+1",
    "0.123E-1",
    "-0",
    "-0e1",
    "-0e+1",
    "-0e-1",
    "-0.123",
    "-0.123e00",
    "-0.123e+1",
    "-0.123e-1",
    "-0.123E00",
    "-0.123E+1",
    "-0.123E-1",
    "-123",
    "-123e1",
    "-123e+1",
    "-123e-1",
    "-123.123",
    "-123.123e00",
    "-123.123e+1",
    "-123.123e-1",
    "-123.123E00",
    "-123.123E+1",
    "-123.123E-1",
    "123",
    "123e1",
    "123e+1",
    "123e-1",
    "123.123",
    "123.123e00",
    "123.123e+1",
    "123.123e-1",
    "123.123E00",
    "123.123E+1",
    "123.123E-1",
    "7161093205057351174",
    "21e999",
  ];

  const bufferSizes = [0, 64 * 1024];

  bufferSizes.forEach((numberBufferSize) => {
    values.forEach((stringValue) => {
      test(`${stringValue} (bufferSize ${numberBufferSize})`, async () => {
        await runJSONParserTest(
          new JSONParser({ numberBufferSize }),
          [stringValue],
          ({ value }) => {
            expect(value).toEqual(JSON.parse(stringValue));
          }
        );
      });

      test(`${stringValue} (chunked, bufferSize ${numberBufferSize})`, async () => {
        await runJSONParserTest(
          new JSONParser({ numberBufferSize }),
          (stringValue as string).split(""),
          ({ value }) => {
            expect(value).toEqual(JSON.parse(stringValue));
          }
        );
      });
    });
  });

  const invalidValues = [
    "-a",
    "-e",
    "1a",
    "1.a",
    "1.e",
    "1.-",
    "1.0ea",
    "1.0e1.2",
  ];

  invalidValues.forEach((value) => {
    test("fail on invalid values", async () => {
      try {
        await runJSONParserTest(new JSONParser(), [value]);
        fail(`Expected to fail on value "${value}"`);
      } catch (e) {
        // Expected error
      }
    });
  });
});
