import { runJSONParserTest } from "../utils/testRunner.js";
import JSONParser from "../../src/jsonparser.js";
import { charset } from "../../src/utils/utf-8.js";

const quote = String.fromCharCode(charset.QUOTATION_MARK);

describe("string", () => {
  const values = [
    "Hello world!",
    '\\r\\n\\f\\t\\\\\\/\\"',
    "\\u039b\\u03ac\\u03bc\\u03b2\\u03b4\\u03b1",
    "☃",
    "├──",
    "snow: ☃!",
    "õ",
  ];

  const bufferSizes = [0, 64 * 1024];

  bufferSizes.forEach((stringBufferSize) => {
    values.forEach((stringValue) => {
      test(`${stringValue} (bufferSize ${stringBufferSize})`, async () => {
        await runJSONParserTest(
          new JSONParser({ stringBufferSize }),
          [quote, stringValue, quote],
          ({ value }) => expect(value).toEqual(JSON.parse(`"${stringValue}"`))
        );
      });

      test(`${stringValue} (chunked, bufferSize ${stringBufferSize})`, async () => {
        await runJSONParserTest(
          new JSONParser({ stringBufferSize }),
          [quote, ...(stringValue as string).split(""), quote],
          ({ value }) => expect(value).toEqual(JSON.parse(`"${stringValue}"`))
        );
      });
    });

    describe("multibyte characters", () => {
      test("2 byte utf8 'De' character: д", async () => {
        await runJSONParserTest(
          new JSONParser({ stringBufferSize }),
          [quote, new Uint8Array([0xd0, 0xb4]), quote],
          ({ value }) => expect(value).toEqual("д")
        );
      });

      test("3 byte utf8 'Han' character: 我", async () => {
        await runJSONParserTest(
          new JSONParser({ stringBufferSize }),
          [quote, new Uint8Array([0xe6, 0x88, 0x91]), quote],
          ({ value }) => expect(value).toEqual("我")
        );
      });

      test("4 byte utf8 character (unicode scalar U+2070E): 𠜎", async () => {
        await runJSONParserTest(
          new JSONParser({ stringBufferSize }),
          [quote, new Uint8Array([0xf0, 0xa0, 0x9c, 0x8e]), quote],
          ({ value }) => expect(value).toEqual("𠜎")
        );
      });

      describe("chunking", () => {
        test("2 byte utf8 'De' character chunked inbetween 1st and 3nd byte: д", async () => {
          await runJSONParserTest(
            new JSONParser({ stringBufferSize }),
            [quote, new Uint8Array([0xd0]), new Uint8Array([0xb4]), quote],
            ({ value }) => expect(value).toEqual("д")
          );
        });

        test("3 byte utf8 'Han' character chunked inbetween 2nd and 3rd byte: 我", async () => {
          await runJSONParserTest(
            new JSONParser({ stringBufferSize }),
            [
              quote,
              new Uint8Array([0xe6, 0x88]),
              new Uint8Array([0x91]),
              quote,
            ],
            ({ value }) => expect(value).toEqual("我")
          );
        });

        test("4 byte utf8 character (unicode scalar U+2070E) chunked inbetween 2nd and 3rd byte: 𠜎", async () => {
          await runJSONParserTest(
            new JSONParser({ stringBufferSize }),
            [
              quote,
              new Uint8Array([0xf0, 0xa0]),
              new Uint8Array([0x9c, 0x8e]),
              quote,
            ],
            ({ value }) => expect(value).toEqual("𠜎")
          );
        });

        test("1-4 byte utf8 character string chunked inbetween random bytes: Aж文𠜱B", async () => {
          const eclectic_buffer = new Uint8Array([
            0x41, // A
            0xd0,
            0xb6, // ж
            0xe6,
            0x96,
            0x87, // 文
            0xf0,
            0xa0,
            0x9c,
            0xb1, // 𠜱
            0x42,
          ]); // B

          for (let i = 0; i < 11; i++) {
            const firstBuffer = eclectic_buffer.slice(0, i);
            const secondBuffer = eclectic_buffer.slice(i);
            await runJSONParserTest(
              new JSONParser({ stringBufferSize }),
              [quote, firstBuffer, secondBuffer, quote],
              ({ value }) => expect(value).toEqual("Aж文𠜱B")
            );
          }
        });
      });

      describe("surrogate", () => {
        test("parse surrogate pair", async () => {
          await runJSONParserTest(
            new JSONParser({ stringBufferSize }),
            [quote, "\\uD83D\\uDE0B", quote],
            ({ value }) => expect(value).toEqual("😋")
          );
        });

        test("surrogate pair (chunked)", async () => {
          await runJSONParserTest(
            new JSONParser({ stringBufferSize }),
            [quote, "\\uD83D", "\\uDE0B", quote],
            ({ value }) => expect(value).toEqual("😋")
          );
        });

        test("not error on broken surrogate pair", async () => {
          await runJSONParserTest(
            new JSONParser({ stringBufferSize }),
            [quote, "\\uD83D\\uEFFF", quote],
            ({ value }) => expect(value).toEqual("�")
          );
        });
      });
    });
  });

  test("should flush the buffer if there is not space for incoming data", async () => {
    await runJSONParserTest(
      new JSONParser({ stringBufferSize: 1 }),
      [quote, "aaaa", "𠜎", quote],
      ({ value }) => expect(value).toEqual("aaaa𠜎")
    );
  });

  const invalidValues = ["\n", "\\j", "\\ua", "\\u1*", "\\u12*", "\\u123*"];

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
