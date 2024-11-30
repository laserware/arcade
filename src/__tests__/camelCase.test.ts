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
    expect(camelCase("-webkit-transition")).toBe("WebkitTransition");
  });

  it("returns an empty string if input is empty", async () => {
    expect(camelCase("")).toBe("");
  });

  it("handles single hyphen correctly", async () => {
    expect(camelCase("-")).toBe("");
  });
});
