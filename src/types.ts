export type DictKey = string | number | symbol;

export type Dict<T, K extends DictKey = string> = Record<K, T>;

export type AnyDict = Record<DictKey, any>;

export type AnyFunc = (...args: any[]) => any;
