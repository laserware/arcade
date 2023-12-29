export type DictKey = string | number | symbol;

export type Dict<V, K extends DictKey = string> = Record<K, V>;

export type AnyDict = Record<DictKey, any>;

export type AnyFunc = (...args: any[]) => any;
