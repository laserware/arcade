import { cast } from "../cast.js";

describe("the cast function", () => {
  it("casts a number to a string", () => {
    const value: unknown = 123;

    const result = cast<string>(value);

    expect(result).toBeTypeOf("number");
  });

  it("casts a string to a number", () => {
    const value: unknown = "456";

    const result = cast<number>(value);

    expect(result).toBeTypeOf("string");
  });

  it("casts an object to a specific shape", () => {
    type Person = { name: string; age: number };

    const value: unknown = { name: "Alice", age: 30 };

    const result = cast<Person>(value);

    expect(result).toEqual({ name: "Alice", age: 30 });
  });

  it("casts an array to a tuple", () => {
    const value: unknown = [true, "test", 42];

    const result = cast<[boolean, string, number]>(value);

    expect(result).toEqual([true, "test", 42]);
  });

  it("casts a value to an extended type", () => {
    const value: unknown = { id: 1, active: true };

    interface Base {
      id: number;
    }

    interface Extended extends Base {
      active: boolean;
    }

    const result = cast<Extended>(value);

    expect(result).toEqual({ id: 1, active: true });
  });
});
