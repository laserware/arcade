import { keyBy } from "../keyBy.js";

describe("the keyBy function", () => {
  it("converts an array of objects to an object keyed by the specified field", () => {
    const input = [
      { id: "a", value: "A" },
      { id: "b", value: "B" },
    ];
    const result = keyBy(input, "id");

    const expected = {
      a: { id: "a", value: "A" },
      b: { id: "b", value: "B" },
    };

    expect(result).toEqual(expected);
  });

  it("throws an error if the key field is invalid", () => {
    const input = [
      { id: "a", value: "A" },
      { id: "b", value: "B" },
    ];

    expect(() => {
      keyBy(input, "invalid");
    }).toThrow(/unable to convert/gi);
  });
});
