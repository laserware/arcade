import { camelCase } from "../camelCase.js";

describe.concurrent("the camelCase function", () => {
  it("transforms hyphenated string to camelCase", async () => {
    expect(camelCase("background-color")).toBe("backgroundColor");
  });

  it("handles multiple hyphens correctly", async () => {
    expect(camelCase("border-top-left-radius")).toBe("borderTopLeftRadius");
  });

  it("returns the same string if there are no hyphens", async () => {
    expect(camelCase("color")).toBe("color");
  });

  it("transforms uppercase letters after hyphen", async () => {
    expect(camelCase("text-transform")).toBe("textTransform");
  });

  it("handles strings starting with a hyphen", async () => {
    expect(camelCase("-webkit-transition")).toBe("webkitTransition");
  });

  it("returns an empty string if input is empty", async () => {
    expect(camelCase("")).toBe("");
  });

  it("handles TitleCase strings", async () => {
    expect(camelCase("TitleCase")).toBe("titleCase");
  });

  it("handles strings with last character uppercase", async () => {
    expect(camelCase("some-value___AAA")).toBe("someValueAaa");
  });

  it("handles single characters", async () => {
    expect(camelCase("_")).toBe("");
    expect(camelCase("A")).toBe("a");
  });

  it("handles single hyphen correctly", async () => {
    expect(camelCase("-")).toBe("");
  });

  it("throws an error if the input value is not a string", async () => {
    expect(() => {
      // @ts-ignore
      camelCase(24);
    }).toThrow(TypeError);
  });
});
