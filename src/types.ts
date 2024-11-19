/**
 * Valid key type for an object (i.e. dictionary).
 */
export type DictKey = string | number | symbol;

/**
 * Key/value pair with key of valid {@link DictKey}.
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
