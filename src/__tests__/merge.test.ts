// noinspection SpellCheckingInspection
import { describe, expect, it } from "bun:test";

import { merge, mergeAll } from "../merge.js";

describe("within merge", () => {
  describe("the merge function", () => {
    it("add keys in target that do not exist at the root", () => {
      const source = { key1: "value1", key2: "value2" };
      const target = {};

      const result = merge(target, source);

      expect(target).toEqual({});
      expect(result).toEqual(source);
    });

    it("merges existing simple keys in target at the roots", () => {
      const source = { key1: "changed", key2: "value2" };
      const target = { key1: "value1", key3: "value3" };

      const expected = {
        key1: "changed",
        key2: "value2",
        key3: "value3",
      };

      expect(target).toEqual({ key1: "value1", key3: "value3" });
      expect(merge(target, source)).toEqual(expected);
    });

    it("merges nested objects into target", () => {
      const source = { key1: { subkey1: "changed", subkey3: "added" } };
      const target = { key1: { subkey1: "value1", subkey2: "value2" } };

      const expected = {
        key1: {
          subkey1: "changed",
          subkey2: "value2",
          subkey3: "added",
        },
      };

      const result = merge(target, source);

      expect(target).toEqual({ key1: { subkey1: "value1", subkey2: "value2" } });
      expect(result).toEqual(expected);
    });

    it("replaces simple key with nested object in target", () => {
      const source = {
        key1: {
          subkey1: "subvalue1",
          subkey2: "subvalue2",
        },
      };
      const target = {
        key1: "value1",
        key2: "value2",
      };

      const expected = {
        key1: {
          subkey1: "subvalue1",
          subkey2: "subvalue2",
        },
        key2: "value2",
      };

      expect(target).toEqual({ key1: "value1", key2: "value2" });
      expect(merge(target, source)).toEqual(expected as any);
    });

    it("adds nested object in target", () => {
      const source = { b: { c: {} } };

      const target = { a: {} };

      const expected = { a: {}, b: { c: {} } };

      expect(merge(target, source)).toEqual(expected);
    });

    it("replaces object with simple key in target", () => {
      const source = { key1: "value1" };
      const target = {
        key1: {
          subkey1: "subvalue1",
          subkey2: "subvalue2",
        },
        key2: "value2",
      };

      const expected = { key1: "value1", key2: "value2" };

      expect(target).toEqual({
        key1: {
          subkey1: "subvalue1",
          subkey2: "subvalue2",
        },
        key2: "value2",
      });
      expect(merge(target, source)).toEqual(expected as any);
    });

    it("replaces objects with arrays", () => {
      const target = { key1: { subkey: "one" } };

      const source = { key1: ["subkey"] };

      const expected = { key1: ["subkey"] };

      expect(merge(target, source)).toEqual(expected as any);
    });

    it("replaces arrays with objects", () => {
      const target = { key1: ["subkey"] };

      const source = { key1: { subkey: "one" } };

      const expected = { key1: { subkey: "one" } };

      expect(merge(target, source)).toEqual(expected as any);
    });

    it("replaces dates with arrays", () => {
      const target = { key1: new Date() };

      const source = { key1: ["subkey"] };

      const expected = { key1: ["subkey"] };

      expect(merge(target, source)).toEqual(expected as any);
    });

    it("replaces null with arrays", () => {
      const target = { key1: null };

      const source = { key1: ["subkey"] };

      const expected = { key1: ["subkey"] };

      expect(merge(target, source)).toEqual(expected as any);
    });

    it("works on simple array", () => {
      const source = ["one", "three"];
      const target = ["one", "two"];

      const expected = ["one", "two", "one", "three"];

      expect(merge(target, source)).toEqual(expected);
      expect(merge(target, source)).toBeInstanceOf(Array);
    });

    it("works on another simple array", () => {
      const target = ["a1", "a2", "c1", "f1", "p1"];
      const source = ["t1", "s1", "c2", "r1", "p2", "p3"];

      const expected = ["a1", "a2", "c1", "f1", "p1", "t1", "s1", "c2", "r1", "p2", "p3"];

      expect(merge(target, source)).toEqual(expected);
      expect(target).toEqual(["a1", "a2", "c1", "f1", "p1"]);
      expect(merge(target, source)).toBeInstanceOf(Array);
    });

    it("works on array properties", () => {
      const source = {
        key1: ["one", "three"],
        key2: ["four"],
      };
      const target = {
        key1: ["one", "two"],
      };

      const expected = {
        key1: ["one", "two", "one", "three"],
        key2: ["four"],
      };

      expect(merge(target, source)).toEqual(expected);
      expect(Array.isArray(merge(target, source).key1)).toBeTruthy();
      expect(Array.isArray(merge(target, source).key2)).toBeTruthy();
    });

    it("works on array of objects", () => {
      const source = [{ key1: ["one", "three"], key2: ["one"] }, { key3: ["five"] }];
      const target = [{ key1: ["one", "two"] }, { key3: ["four"] }];

      const expected = [
        { key1: ["one", "two"] },
        { key3: ["four"] },
        { key1: ["one", "three"], key2: ["one"] },
        { key3: ["five"] },
      ];

      expect(merge(target, source)).toEqual(expected as any);
      expect(Array.isArray(merge(target, source))).toBeTruthy();
      expect(Array.isArray(merge(target, source)[0].key1)).toBeTruthy();
    });

    it("treats regular expressions like primitive values", () => {
      const target = { key1: /abc/ };
      const source = { key1: /efg/ };
      const expected = { key1: /efg/ };

      expect(merge(target, source)).toEqual(expected);
      expect(merge(target, source).key1.test("efg")).toBeTruthy();
    });

    it("treats dates like primitives", () => {
      const monday = new Date("2016-09-27T01:08:12.761Z");
      const tuesday = new Date("2016-09-28T01:18:12.761Z");

      const target = { key: monday };
      const source = { key: tuesday };

      const expected = { key: tuesday };
      const actual = merge(target, source);

      expect(actual).toEqual(expected);
      expect(actual.key.valueOf()).toEqual(tuesday.valueOf());
    });

    it("works on array with null in it", () => {
      const target: any[] = [];

      const source = [null];

      const expected = [null];

      expect(merge(target, source)).toEqual(expected);
    });

    it("overwrites values when property is initialised but undefined", () => {
      const source = { value: undefined };

      const hasUndefinedProperty = (object: Record<any, any>): void => {
        expect(Object.hasOwn(object, "value")).toBeTruthy();
        expect(typeof object.value).toBe("undefined");
      };

      hasUndefinedProperty(merge({ value: [] }, source));
      hasUndefinedProperty(merge({ value: null }, source));
      hasUndefinedProperty(merge({ value: 2 }, source));
    });

    it("copies dates correctly in an array", () => {
      const monday = new Date("2016-09-27T01:08:12.761Z");
      const tuesday = new Date("2016-09-28T01:18:12.761Z");

      const target = [monday, "dude"];
      const source = [tuesday, "lol"];

      const expected = [monday, "dude", tuesday, "lol"];
      const actual = merge(target, source);

      expect(actual).toEqual(expected);
    });

    it("copies symbol keys in target that do not exist on the target", () => {
      const SYMBOL_FAKE = Symbol();

      const source = { [SYMBOL_FAKE]: "value1" };
      const target = {};

      const result = merge(target, source);

      expect(result[SYMBOL_FAKE]).toBe("value1");
      expect(Object.getOwnPropertySymbols(result)).toEqual(Object.getOwnPropertySymbols(source));
    });

    it("copies symbol keys in target that do exist on the target", () => {
      const SYMBOL_FAKE = Symbol();

      const source = { [SYMBOL_FAKE]: "value1" };
      const target = { [SYMBOL_FAKE]: "wat" };

      const result = merge(target, source);

      expect(result[SYMBOL_FAKE]).toBe("value1");
    });
  });

  describe("the mergeAll function", () => {
    it("merges an array of items", () => {
      const first = { key1: ["one", "three"], key2: ["one"], key3: ["five"] };
      const second = { key1: ["one", "two"], key3: ["four"] };
      const third = { key1: ["three", "four"], key3: ["six"] };

      const expected = {
        key1: ["one", "three", "one", "two", "three", "four"],
        key2: ["one"],
        key3: ["five", "four", "six"],
      };

      const actual = mergeAll(first, second, third);

      expect(actual).toEqual(expected);
    });
  });
});
