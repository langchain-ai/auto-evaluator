import { runJSONParserTest, TestData } from "./utils/testRunner.js";
import JSONParser from "../src/jsonparser.js";

describe("selectors", () => {
  const testData: TestData[] = [
    { value: "[0,1,-1]", paths: ["$"], expected: [[0, 1, -1]] },
    { value: "[0,1,-1]", paths: ["$.*"], expected: [0, 1, -1] },
    { value: "[0,1,-1]", expected: [0, 1, -1, [0, 1, -1]] },
    { value: "[0,1,-1]", paths: ["$*"], expected: [0, 1, -1, [0, 1, -1]] },
    {
      value: "[0,1,[-1, 2]]",
      paths: ["$", "$.*"],
      expected: [0, 1, [-1, 2], [0, 1, [-1, 2]]],
    },
    { value: "[0,1,-1]", paths: ["$.1"], expected: [1] },
    {
      value: '{ "a": { "b": 1, "c": 2 } }',
      paths: ["$.a.*"],
      expected: [1, 2],
    },
    { value: '{ "a": { "b": 1, "c": 2 } }', paths: ["$.a.c"], expected: [2] },
    {
      value: '{ "a": { "b": [1,2], "c": [3, 4] } }',
      paths: ["$.a.*.*"],
      expected: [1, 2, 3, 4],
    },
    {
      value: '{ "a": { "b": [1,2], "c": [3, 4] } }',
      paths: ["$.a.*.1"],
      expected: [2, 4],
    },
    {
      value: '{ "a": { "b": [1,2], "c": [3, 4] } }',
      paths: ["$.a.c.*"],
      expected: [3, 4],
    },
    {
      value: '{ "a": { "b": [1,2], "c": [3, 4] } }',
      paths: ["$.a.c.1"],
      expected: [4],
    },
  ];

  testData.forEach(({ value, paths, expected }) => {
    test(`Using selector ${paths} should emit only selected values`, async () => {
      let i = 0;

      await runJSONParserTest(
        new JSONParser({ paths }),
        [value],
        ({ value }) => {
          expect(value).toEqual(expected[i]);
          i += 1;
        }
      );
    });
  });

  const invalidTestData = [
    {
      paths: ["*"],
      expectedError: 'Invalid selector "*". Should start with "$".',
    },
    {
      paths: [".*"],
      expectedError: 'Invalid selector ".*". Should start with "$".',
    },
    {
      paths: ["$..*"],
      expectedError: 'Invalid selector "$..*". ".." syntax not supported.',
    },
  ];

  invalidTestData.forEach(({ paths, expectedError }) => {
    test(`fail on invalid selector ${paths}`, () => {
      try {
        new JSONParser({ paths });
        fail("Error expected on invalid selector");
      } catch (err: any) {
        expect(err.message).toEqual(expectedError);
      }
    });
  });
});
