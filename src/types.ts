/**
 * Valid key type for an object (i.e. dictionary).
 *
 * @category Object
 */
export type DictKey = string | number | symbol;

/**
 * Key/value pair with key of valid {@link DictKey}.
 *
 * @template V Type of value in the object.
 * @template K Type of key in the object.
 *
 * @category Object
 */
export type Dict<V, K extends DictKey = string> = Record<K, V>;

/**
 * Object with key of {@link DictKey} and any value.
 *
 * @category Object
 */
export type AnyDict = Record<DictKey, any>;

/**
 * Function that takes any variable arguments and returns any value.
 *
 * @category Function
 */
export type AnyFunc = (...args: any[]) => any;

/**
 * Any plain object with key/value pair of any type.
 *
 * @category Object
 */
export type AnyPlainObject = Record<any, any>;

/**
 * Extracts the keys of the specified object into an array.
 *
 * @template T Object with keys to extract.
 *
 * @category Object
 */
export type KeysOf<T extends Record<string, any>> = Extract<keyof T, string>[];

/**
 * Type is either a single item or array of items of type `T`.
 *
 * @template T Type of item or items.
 *
 * @category Utility
 */
export type OneOrManyOf<T> = T | T[];
