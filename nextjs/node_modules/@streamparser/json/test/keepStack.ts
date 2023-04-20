import JSONParser from "../src/jsonparser.js";
import { runJSONParserTest } from "./utils/testRunner.js";

describe("keepStack", () => {
  const testData = [
    {
      value: '{ "a": { "b": 1, "c": 2, "d": 3, "e": 4 } }',
      paths: ["$"],
    },
    {
      value: '{ "a": { "b": 1, "c": 2, "d": 3, "e": 4 } }',
      paths: ["$.a.*"],
    },
    {
      value: '{ "a": { "b": 1, "c": 2, "d": 3, "e": 4 } }',
      paths: ["$.a.e"],
    },
    {
      value: '{ "a": { "b": [1,2,3,4,5,6] } }',
      paths: ["$.a.b.*"],
      expected: 6,
    },
    {
      value: '[{ "a": 1 }, { "a": 2 }, { "a": 3 }]',
      paths: ["$.*"],
    },
  ];

  testData.forEach(({ value, paths }) => {
    test(`should keep parent empty if keepStack === false (${value} - ${paths})`, async () => {
      await runJSONParserTest(
        new JSONParser({ paths, keepStack: false }),
        [value],
        ({ parent }) => {
          if (parent === undefined) return;
          expect(Object.keys(parent).length).toEqual(0);
        }
      );
    });
  });
});
