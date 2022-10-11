(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["vest-utils"] = {}));
})(this, (function (exports) { 'use strict';

  function bindNot(fn) {
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return !fn.apply(void 0, args);
      };
  }

  function isNumeric(value) {
      var str = String(value);
      var num = Number(value);
      var result = !isNaN(parseFloat(str)) && !isNaN(Number(value)) && isFinite(num);
      return Boolean(result);
  }
  var isNotNumeric = bindNot(isNumeric);

  function numberEquals(value, eq) {
      return isNumeric(value) && isNumeric(eq) && Number(value) === Number(eq);
  }
  var numberNotEquals = bindNot(numberEquals);

  function lengthEquals(value, arg1) {
      return numberEquals(value.length, arg1);
  }
  var lengthNotEquals = bindNot(lengthEquals);

  function greaterThan(value, gt) {
      return isNumeric(value) && isNumeric(gt) && Number(value) > Number(gt);
  }

  function longerThan(value, arg1) {
      return greaterThan(value.length, arg1);
  }

  /**
   * Creates a cache function
   */
  function createCache(maxSize) {
      if (maxSize === void 0) { maxSize = 1; }
      var cacheStorage = [];
      var cache = function (deps, cacheAction) {
          var cacheHit = cache.get(deps);
          // cache hit is not null
          if (cacheHit)
              return cacheHit[1];
          var result = cacheAction();
          cacheStorage.unshift([deps.concat(), result]);
          if (longerThan(cacheStorage, maxSize))
              cacheStorage.length = maxSize;
          return result;
      };
      // invalidate an item in the cache by its dependencies
      cache.invalidate = function (deps) {
          var index = findIndex(deps);
          if (index > -1)
              cacheStorage.splice(index, 1);
      };
      // Retrieves an item from the cache.
      cache.get = function (deps) {
          return cacheStorage[findIndex(deps)] || null;
      };
      return cache;
      function findIndex(deps) {
          return cacheStorage.findIndex(function (_a) {
              var cachedDeps = _a[0];
              return lengthEquals(deps, cachedDeps.length) &&
                  deps.every(function (dep, i) { return dep === cachedDeps[i]; });
          });
      }
  }

  function isNull(value) {
      return value === null;
  }
  var isNotNull = bindNot(isNull);

  function isUndefined(value) {
      return value === undefined;
  }
  var isNotUndefined = bindNot(isUndefined);

  function isNullish(value) {
      return isNull(value) || isUndefined(value);
  }
  var isNotNullish = bindNot(isNullish);

  function asArray(possibleArg) {
      return [].concat(possibleArg);
  }

  function isFunction(value) {
      return typeof value === 'function';
  }

  function optionalFunctionValue(value) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
      }
      return isFunction(value) ? value.apply(void 0, args) : value;
  }

  function defaultTo(value, defaultValue) {
      var _a;
      return (_a = optionalFunctionValue(value)) !== null && _a !== void 0 ? _a : optionalFunctionValue(defaultValue);
  }

  // The module is named "isArrayValue" since it
  // is conflicting with a nested npm dependency.
  // We may need to revisit this in the future.
  function isArray(value) {
      return Boolean(Array.isArray(value));
  }
  var isNotArray = bindNot(isArray);

  function last(values) {
      var valuesArray = asArray(values);
      return valuesArray[valuesArray.length - 1];
  }

  // This is kind of a map/filter in one function.
  // Normally, behaves like a nested-array map,
  // but returning `null` will drop the element from the array
  function transform(array, cb) {
      var res = [];
      for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
          var v = array_1[_i];
          if (isArray(v)) {
              res.push(transform(v, cb));
          }
          else {
              var output = cb(v);
              if (isNotNull(output)) {
                  res.push(output);
              }
          }
      }
      return res;
  }
  function valueAtPath(array, path) {
      return getCurrent(array, path)[last(path)];
  }
  function setValueAtPath(array, path, value) {
      var current = getCurrent(array, path);
      current[last(path)] = value;
      return array;
  }
  function flatten(values) {
      return asArray(values).reduce(function (acc, value) {
          if (isArray(value)) {
              return acc.concat(flatten(value));
          }
          return asArray(acc).concat(value);
      }, []);
  }
  function getCurrent(array, path) {
      var current = array;
      for (var _i = 0, _a = path.slice(0, -1); _i < _a.length; _i++) {
          var p = _a[_i];
          current[p] = defaultTo(current[p], []);
          current = current[p];
      }
      return current;
  }

  var nestedArray = /*#__PURE__*/Object.freeze({
    __proto__: null,
    transform: transform,
    valueAtPath: valueAtPath,
    setValueAtPath: setValueAtPath,
    flatten: flatten,
    getCurrent: getCurrent
  });

  function callEach(arr) {
      return arr.forEach(function (fn) { return fn(); });
  }

  /**
   * A safe hasOwnProperty access
   */
  function hasOwnProperty(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function isPromise(value) {
      return value && isFunction(value.then);
  }

  var assign = Object.assign;

  function invariant(condition, 
  // eslint-disable-next-line @typescript-eslint/ban-types
  message) {
      if (condition) {
          return;
      }
      // If message is a string object (rather than string literal)
      // Throw the value directly as a string
      // Alternatively, throw an error with the message
      throw message instanceof String
          ? message.valueOf()
          : new Error(message ? optionalFunctionValue(message) : message);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  function StringObject(value) {
      return new String(optionalFunctionValue(value));
  }

  function isStringValue(v) {
      return String(v) === v;
  }

  function either(a, b) {
      return !!a !== !!b;
  }

  function isBoolean(value) {
      return !!value === value;
  }

  function deferThrow(message) {
      setTimeout(function () {
          throw new Error(message);
      }, 0);
  }

  function createBus() {
      var listeners = {};
      return {
          emit: function (event, data) {
              listener(event).forEach(function (handler) {
                  handler(data);
              });
          },
          on: function (event, handler) {
              listeners[event] = listener(event).concat(handler);
              return {
                  off: function () {
                      listeners[event] = listener(event).filter(function (h) { return h !== handler; });
                  }
              };
          }
      };
      function listener(event) {
          return listeners[event] || [];
      }
  }

  var bus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createBus: createBus
  });

  /**
   * @returns a unique numeric id.
   */
  var seq = (function (n) { return function () {
      return "".concat(n++);
  }; })(0);

  function mapFirst(array, callback) {
      var broke = false;
      var breakoutValue = null;
      for (var i = 0; i < array.length; i++) {
          callback(array[i], breakout, i);
          if (broke) {
              return breakoutValue;
          }
      }
      function breakout(conditional, value) {
          if (conditional) {
              broke = true;
              breakoutValue = value;
          }
      }
  }

  function isEmpty(value) {
      if (!value) {
          return true;
      }
      else if (hasOwnProperty(value, 'length')) {
          return lengthEquals(value, 0);
      }
      else if (typeof value === 'object') {
          return lengthEquals(Object.keys(value), 0);
      }
      return false;
  }
  var isNotEmpty = bindNot(isEmpty);

  function isPositive(value) {
      return greaterThan(value, 0);
  }

  exports.StringObject = StringObject;
  exports.asArray = asArray;
  exports.assign = assign;
  exports.bindNot = bindNot;
  exports.bus = bus;
  exports.cache = createCache;
  exports.callEach = callEach;
  exports.defaultTo = defaultTo;
  exports.deferThrow = deferThrow;
  exports.either = either;
  exports.greaterThan = greaterThan;
  exports.hasOwnProperty = hasOwnProperty;
  exports.invariant = invariant;
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isNotArray = isNotArray;
  exports.isNotEmpty = isNotEmpty;
  exports.isNotNull = isNotNull;
  exports.isNotNullish = isNotNullish;
  exports.isNotNumeric = isNotNumeric;
  exports.isNotUndefined = isNotUndefined;
  exports.isNull = isNull;
  exports.isNullish = isNullish;
  exports.isNumeric = isNumeric;
  exports.isPositive = isPositive;
  exports.isPromise = isPromise;
  exports.isStringValue = isStringValue;
  exports.isUndefined = isUndefined;
  exports.last = last;
  exports.lengthEquals = lengthEquals;
  exports.lengthNotEquals = lengthNotEquals;
  exports.longerThan = longerThan;
  exports.mapFirst = mapFirst;
  exports.nestedArray = nestedArray;
  exports.numberEquals = numberEquals;
  exports.numberNotEquals = numberNotEquals;
  exports.optionalFunctionValue = optionalFunctionValue;
  exports.seq = seq;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
