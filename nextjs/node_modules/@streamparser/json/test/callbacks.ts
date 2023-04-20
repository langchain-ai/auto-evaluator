import JSONParser from "../src/jsonparser.js";
import Tokenizer from "../src/tokenizer.js";
import TokenParser from "../src/tokenparser.js";
import TokenType from "../src/utils/types/tokenType.js";

describe("callback", () => {
  test("should error on missing onToken callback", () => {
    const p = new Tokenizer();

    try {
      p.write('"test"');
      fail("Expected to fail(");
    } catch (e) {
      // Expected error
    }
  });

  test("should throw if missing onError callback", () => {
    const p = new TokenParser();
    p.end();

    try {
      p.write({ token: TokenType.TRUE, value: true });
      fail("Expected to fail(");
    } catch (e) {
      // Expected error
    }
  });

  test("should error on missing onValue callback", () => {
    const p = new JSONParser();

    try {
      p.write('"test"');
      fail("Expected to fail(");
    } catch (e) {
      // Expected error
    }
  });

  test("should handle invalid input using the onError callback if set", () => {
    const p = new JSONParser();
    p.onValue = () => {
      /* Do nothing */
    };
    p.onError = (err) =>
      expect(err.message).toEqual(
        "Unexpected type. The `write` function only accepts Arrays, TypedArrays and Strings."
      );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p.write(745674 as any);
  });

  test("should handle parsing errors using the onError callback if set", () => {
    const p = new JSONParser();
    p.onValue = () => {
      /* Do nothing */
    };
    p.onError = (err) =>
      expect(err.message).toEqual(
        'Unexpected "t" at position "2" in state ENDED'
      );

    p.write('""test""');
  });

  test("should handle errors on callbacks using the onError callback if set", () => {
    const p = new JSONParser();
    p.onValue = () => {
      throw new Error("Unexpected error in onValue callback");
    };
    p.onError = (err) =>
      expect(err.message).toEqual("Unexpected error in onValue callback");

    p.write('"test"');
  });

  test("should handle errors on callbacks using the onError callback if set (tokenizer)", () => {
    const p = new Tokenizer();
    p.onToken = () => {
      throw new Error("Unexpected error in onValue callback");
    };
    p.onError = (err) =>
      expect(err.message).toEqual("Unexpected error in onValue callback");

    p.write('"test"');
  });

  test("should handle processing end using the onEnd callback if set", (done) => {
    const p = new JSONParser();
    p.onValue = () => {
      /* Do nothing */
    };
    p.onEnd = () => done();

    p.write('"test"');
  });

  test("should use default onEnd callback if none set up", () => {
    const p = new Tokenizer();
    p.onToken = () => {
      /* Do nothing */
    };

    p.write("1");
    p.end();

    expect(p.isEnded).toBeTruthy();
  });

  test("should not fail if ending while the underlying tokenizer is already ended", () => {
    const separator = "\n";

    const p = new JSONParser({ separator });
    p.onValue = () => {
      /* Do nothing */
    };
    p.onEnd = () => {
      /* Do nothing */
    };

    p.write("{}");
    p.end();

    expect(p.isEnded).toBeTruthy();
  });
});
