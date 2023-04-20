import { runJSONParserTest, TestData } from "../utils/testRunner.js";
import JSONParser from "../../src/jsonparser.js";

describe("arrays", () => {
  const testData: TestData[] = [
    { value: "[]", expected: [[[], []]] },
    {
      value: "[0,1,-1]",
      expected: [
        [[0], 0],
        [[1], 1],
        [[2], -1],
        [[], [0, 1, -1]],
      ],
    },
    {
      value: "[1.0,1.1,-1.1,-1.0]",
      expected: [
        [[0], 1],
        [[1], 1.1],
        [[2], -1.1],
        [[3], -1],
        [[], [1, 1.1, -1.1, -1]],
      ],
    },
    {
      value: "[-1]",
      expected: [
        [[0], -1],
        [[], [-1]],
      ],
    },
    {
      value: "[-0.1]",
      expected: [
        [[0], -0.1],
        [[], [-0.1]],
      ],
    },
    {
      value: "[6.02e23, 6.02e+23, 6.02e-23, 0e23]",
      expected: [
        [[0], 6.02e23],
        [[1], 6.02e23],
        [[2], 6.02e-23],
        [[3], 0e23],
        [[], [6.02e23, 6.02e23, 6.02e-23, 0e23]],
      ],
    },
    {
      value: "[7161093205057351174]",
      expected: [
        [[0], 7161093205057352000],
        [[], [7161093205057352000]],
      ],
    },
  ];

  testData.forEach(({ value, expected }) => {
    test(value as string, async () => {
      let i = 0;

      await runJSONParserTest(
        new JSONParser(),
        [value],
        ({ value, key, stack }) => {
          const keys = stack
            .slice(1)
            .map((item) => item.key)
            .concat(key !== undefined ? key : []);

          expect([keys, value]).toEqual(expected[i]);
          i += 1;
        }
      );
    });

    test("chuncked", async () => {
      let i = 0;

      await runJSONParserTest(
        new JSONParser(),
        (value as string).split(""),
        ({ value, key, stack }) => {
          const keys = stack
            .slice(1)
            .map((item) => item.key)
            .concat(key !== undefined ? key : []);

          expect([keys, value]).toEqual(expected[i]);
          i += 1;
        }
      );
    });
  });

  const invalidValues = ["[,", "[1, eer]", "[1,]", "[1;", "[1}"];

  invalidValues.forEach((value) => {
    test(`fail on invalid values: ${value}`, async () => {
      try {
        await runJSONParserTest(new JSONParser(), [value]);
        fail(`Expected to fail on value "${value}"`);
      } catch (e) {
        // Expected error
      }
    });
  });
});
