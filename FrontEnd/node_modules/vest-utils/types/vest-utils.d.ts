/**
 * Creates a cache function
 */
declare function createCache(maxSize?: number): {
    <T>(deps: unknown[], cacheAction: (...args: unknown[]) => T): T;
    get(deps: unknown[]): any;
    invalidate(item: any): void;
};
declare function isNullish(value: any): value is null | undefined;
declare const isNotNullish: (value: any) => boolean;
declare namespace nestedArray {
    type NestedArray<T> = Array<NestedArray<T> | T>;
    // This is kind of a map/filter in one function.
    // Normally, behaves like a nested-array map,
    // but returning `null` will drop the element from the array
    function transform<T>(array: NestedArray<T>, cb: (value: T) => NestedArray<T> | T | null): NestedArray<T>;
    function valueAtPath<T>(array: NestedArray<T>, path: number[]): T | NestedArray<T>;
    function setValueAtPath<T>(array: NestedArray<T>, path: number[], value: NestedArray<T> | T): NestedArray<T>;
    function flatten<T>(values: NestedArray<T> | T): T[];
    function getCurrent<T>(array: NestedArray<T>, path: number[]): NestedArray<T>;
}
declare function asArray<T>(possibleArg: T | T[]): T[];
type DropFirst<T extends unknown[]> = T extends [
    unknown,
    ...infer U
] ? U : never;
type Stringable = string | ((...args: any[]) => string);
type CB = (...args: any[]) => any;
type ValueOf<T> = T[keyof T];
declare function callEach(arr: CB[]): void;
/**
 * A safe hasOwnProperty access
 */
declare function hasOwnProperty<T>(obj: T, key: string | number | symbol): key is keyof T;
declare function isPromise(value: any): value is Promise<unknown>;
declare function optionalFunctionValue<T>(value: T | ((...args: any[]) => T), ...args: unknown[]): T;
declare const _default: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T_1 extends {}, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2 extends {}, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
declare function defaultTo<T>(value: T | ((...args: any[]) => T), defaultValue: T | (() => T)): T;
declare function invariant(condition: any, 
// eslint-disable-next-line @typescript-eslint/ban-types
message?: String | Stringable): asserts condition;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function StringObject(value?: Stringable): String;
declare function isStringValue(v: unknown): v is string;
declare function bindNot<T extends (...args: any[]) => unknown>(fn: T): (...args: Parameters<T>) => boolean;
declare function either(a: unknown, b: unknown): boolean;
declare function isBoolean(value: unknown): value is boolean;
declare function last<T>(values: T | T[]): T;
declare function deferThrow(message?: string): void;
declare namespace bus {
    type DropFirst<T extends unknown[]> = T extends [
        unknown,
        ...infer U
    ] ? U : never;
    type Stringable = string | ((...args: any[]) => string);
    type CB = (...args: any[]) => any;
    type ValueOf<T> = T[keyof T];
    function createBus(): {
        on: (event: string, handler: CB) => OnReturn;
        emit: (event: string, ...args: any[]) => void;
    };
    type OnReturn = {
        off: () => void;
    };
}
/**
 * @returns a unique numeric id.
 */
declare const seq: () => string;
declare function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
declare function mapFirst<T>(array: T[], callback: (item: T, breakout: (conditional: boolean, value: unknown) => void, index: number) => unknown): any;
declare function greaterThan(value: number | string, gt: number | string): boolean;
declare function longerThan(value: string | unknown[], arg1: string | number): boolean;
declare function isNumeric(value: string | number): boolean;
declare const isNotNumeric: (value: string | number) => boolean;
declare function lengthEquals(value: string | unknown[], arg1: string | number): boolean;
declare const lengthNotEquals: (value: string | unknown[], arg1: string | number) => boolean;
declare function numberEquals(value: string | number, eq: string | number): boolean;
declare const numberNotEquals: (value: string | number, eq: string | number) => boolean;
declare function isNull(value: unknown): value is null;
declare const isNotNull: (value: unknown) => boolean;
declare function isUndefined(value?: unknown): value is undefined;
declare const isNotUndefined: (value?: unknown) => boolean;
// The module is named "isArrayValue" since it
// is conflicting with a nested npm dependency.
// We may need to revisit this in the future.
declare function isArray(value: unknown): value is Array<unknown>;
declare const isNotArray: (value: unknown) => boolean;
declare function isEmpty(value: unknown): boolean;
declare const isNotEmpty: (value: unknown) => boolean;
declare function isPositive(value: number | string): boolean;
export { createCache as cache, isNullish, isNotNullish, nestedArray, asArray, callEach, hasOwnProperty, isPromise, optionalFunctionValue, _default as assign, defaultTo, invariant, StringObject, isStringValue, bindNot, either, isBoolean, last, deferThrow, bus, seq, isFunction, mapFirst, greaterThan, longerThan, isNumeric, isNotNumeric, lengthEquals, lengthNotEquals, numberEquals, numberNotEquals, isNull, isNotNull, isUndefined, isNotUndefined, isArray, isNotArray, isEmpty, isNotEmpty, isPositive };
export type { DropFirst, Stringable, CB, ValueOf };
//# sourceMappingURL=vest-utils.d.ts.map