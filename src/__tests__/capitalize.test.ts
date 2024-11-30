import { capitalize } from "../capitalize.js";

describe.concurrent("the capitalize function", () => {
  it("capitalizes the first letter of a lowercase string", async () => {
    const result = capitalize("test");

    expect(result).toBe("Test");
  });

  it("capitalizes the first letter and leave the rest unchanged in a mixed-case string", async () => {
    const result = capitalize("tEsT");

    expect(result).toBe("TEsT");
  });

  it("returns the same string if the first letter is already capitalized", async () => {
    const result = capitalize("Test");

    expect(result).toBe("Test");
  });

  it("handles a single lowercase character", async () => {
    const result = capitalize("a");

    expect(result).toBe("A");
  });

  it("handles a single uppercase character", async () => {
    const result = capitalize("A");

    expect(result).toBe("A");
  });

  it("returns an empty string if the input is empty", async () => {
    const result = capitalize("");

    expect(result).toBe("");
  });
});
