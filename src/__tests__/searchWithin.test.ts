import { searchWithin } from "../searchWithin.js";

interface TestItem {
  name: string;
  age: number;
  city: string;
}

describe("the searchWithin function", () => {
  const collection: TestItem[] = [
    { name: "Alice", age: 30, city: "New York" },
    { name: "Bob", age: 25, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "New York" },
  ];

  it("returns items matching the search term in the specified field", () => {
    const result = searchWithin(collection, "New York", "city");

    expect(result).toEqual([
      { name: "Alice", age: 30, city: "New York" },
      { name: "Charlie", age: 35, city: "New York" },
    ]);
  });

  it("returns an empty array when no items match the search term", () => {
    const result = searchWithin(collection, "Chicago", "city");

    expect(result).toEqual([]);
  });

  it("is case insensitive when searching", () => {
    const result = searchWithin(collection, "new york", "city");

    expect(result).toEqual([
      { name: "Alice", age: 30, city: "New York" },
      { name: "Charlie", age: 35, city: "New York" },
    ]);
  });

  it("returns all items when the search term is an empty string", () => {
    const result = searchWithin(collection, "", "name");

    expect(result).toEqual(collection);
  });

  it("returns an empty array if field name does not exist in items", () => {
    const result = searchWithin(collection, "35", "height");

    expect(result).toEqual([]);
  });
});
