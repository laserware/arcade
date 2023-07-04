export type RecordKey = string | number | symbol;

export type AnyDictionary = Record<RecordKey, any>;

export type AnyFunc = (...args: any[]) => any;
