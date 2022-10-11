import { CB } from 'vest-utils';
/**
 * Base context interface.
 */
declare function createContext<T extends unknown>(defaultContextValue?: T): CtxApi<T>;
/**
 * Cascading context - another implementation of context, that assumes the context value is an object.
 * When nesting context runs, the the values of the current layer merges with the layers above it.
 */
declare function createCascade<T extends Record<string, unknown>>(init?: (value: Partial<T>, parentContext: T | void) => T | null): CtxCascadeApi<T>;
type ContextConsumptionApi<T> = {
    use: () => T;
    useX: (errorMessage?: string) => T;
};
type CtxApi<T> = ContextConsumptionApi<T> & {
    run: <R>(value: T, cb: () => R) => R;
};
type CtxCascadeApi<T> = ContextConsumptionApi<T> & {
    run: <R>(value: Partial<T>, fn: () => R) => R;
    bind: <Fn extends CB>(value: Partial<T>, fn: Fn) => Fn;
};
export { createContext, createCascade, CtxApi, CtxCascadeApi };
//# sourceMappingURL=context.d.ts.map