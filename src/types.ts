/**
 * Valid key type for an object (i.e. dictionary).
 */
export type DictKey = string | number | symbol;

/**
 * Key/value pair with key of valid {@link DictKey}.
 *
 * @template V Type of value in the object.
 * @template K Type of key in the object.
 */
export type Dict<V, K extends DictKey = string> = Record<K, V>;

/**
 * Object with key of {@link DictKey} and any value.
 */
export type AnyDict = Record<DictKey, any>;

/**
 * Function that takes any variable arguments and returns any value.
 */
export type AnyFunc = (...args: any[]) => any;

/**
 * Any plain object with key/value pair of any type.
 */
export type AnyPlainObject = Record<any, any>;

/**
 * Returns the keys of the specified object as an array.
 *
 * @template T Object with keys to extract.
 */
export type KeysOf<T extends Record<string, any>> = Extract<keyof T, string>[];

/**
 * Type is either a single item or array of items of type `T`.
 *
 * @template T Type of item or items.
 */
export type OneOrManyOf<T> = T | T[];
