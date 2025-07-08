/**
 * Valid key type for an object (i.e., dictionary).
 *
 * @category Types
 */
export type DictKey = string | number | symbol;

/**
 * Key/value pair with a key of valid {@linkcode DictKey}.
 *
 * @template V Type of value in the object.
 * @template K Type of key in the object.
 *
 * @category Types
 */
export type Dict<V, K extends DictKey = string> = Record<K, V>;

/**
 * Object with a key of {@linkcode DictKey} and any value.
 *
 * @category Types
 */
export type AnyDict = Record<DictKey, any>;

/**
 * Function that takes any variable arguments and returns any value.
 *
 * @category Types
 */
export type AnyFunc = (...args: any[]) => any;

/**
 * Extracts the **string** keys of the specified object into an array.
 *
 * @remarks
 * The reason this isn't called `StringKeysOf` is because 99% of the time, I
 * need the string keys to iterate over an object or access a value, and I
 * don't want to cast the key to a `string`.
 *
 * @template T Object with keys to extract.
 *
 * @category Types
 */
export type KeysOf<T extends Record<string, any>> = Extract<keyof T, string>[];

/**
 * Type is either a single item or array of items of type `T`.
 *
 * @template T Type of item or items.
 *
 * @category Types
 */
export type OneOrManyOf<T> = T | T[];

/**
 * Adds `null` as the possible type for the fields in the specified type.
 *
 * @template T Type of object to add `null` to fields.
 *
 * @category Types
 */
export type WithNullValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Adds `undefined` as the possible type for the fields in the specified type.
 *
 * @template T Type of object to add `undefined` to fields.
 *
 * @category Types
 */
export type WithUndefinedValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | undefined;
};

/**
 * Represents a value that could be of type `T` or `null` or `undefined`.
 *
 * @template T Type that could be `null` or `undefined`.
 *
 * @category Types
 */
export type Maybe<T> = T | null | undefined;

/**
 * Represents primitive values (i.e., booleans, numbers, and strings).
 *
 * @category Types
 */
export type Primitive = boolean | number | string;
