import { invariant, defaultTo, assign, optionalFunctionValue } from 'vest-utils';

var USEX_DEFAULT_ERROR_MESSAGE = 'Not inside of a running context.';
var EMPTY_CONTEXT = Symbol();
/**
 * Base context interface.
 */
function createContext(defaultContextValue) {
    var contextValue = EMPTY_CONTEXT;
    return {
        run: run,
        use: use,
        useX: useX
    };
    function use() {
        return (isInsideContext() ? contextValue : defaultContextValue);
    }
    function useX(errorMessage) {
        invariant(isInsideContext(), defaultTo(errorMessage, USEX_DEFAULT_ERROR_MESSAGE));
        return contextValue;
    }
    function run(value, cb) {
        var parentContext = isInsideContext() ? use() : EMPTY_CONTEXT;
        contextValue = value;
        var res = cb();
        contextValue = parentContext;
        return res;
    }
    function isInsideContext() {
        return contextValue !== EMPTY_CONTEXT;
    }
}
/**
 * Cascading context - another implementation of context, that assumes the context value is an object.
 * When nesting context runs, the the values of the current layer merges with the layers above it.
 */
function createCascade(init) {
    var ctx = createContext();
    return {
        bind: bind,
        run: run,
        use: ctx.use,
        useX: ctx.useX
    };
    function run(value, fn) {
        var _a;
        var parentContext = ctx.use();
        var out = assign({}, parentContext ? parentContext : {}, (_a = optionalFunctionValue(init, value, parentContext)) !== null && _a !== void 0 ? _a : value);
        return ctx.run(Object.freeze(out), fn);
    }
    function bind(value, fn) {
        return function () {
            var runTimeArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                runTimeArgs[_i] = arguments[_i];
            }
            return run(value, function () {
                return fn.apply(void 0, runTimeArgs);
            });
        };
    }
}

export { createCascade, createContext };
