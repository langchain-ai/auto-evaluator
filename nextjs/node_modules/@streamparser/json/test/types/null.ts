import { runJSONParserTest } from "../utils/testRunner.js";
import JSONParser from "../../src/jsonparser.js";

describe("null", () => {
  const values = ["null"];

  values.forEach((stringValue) => {
    test(stringValue, async () => {
      await runJSONParserTest(new JSONParser(), [stringValue], ({ value }) => {
        expect(value).toEqual(JSON.parse(stringValue));
      });
    });

    test(`${stringValue} (chuncked)`, async () => {
      await runJSONParserTest(
        new JSONParser(),
        (stringValue as string).split(""),
        ({ value }) => {
          expect(value).toEqual(JSON.parse(stringValue));
        }
      );
    });
  });

  const invalidValues = ["nUll", "nuLl", "nulL"];

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
