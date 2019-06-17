(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PersonalityTraitInfo = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],2:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;

},{}],3:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],4:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":1,"lodash.isarguments":2,"lodash.isarray":3}],5:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"lodash.keys":4}],6:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = baseRest(function(object, props) {
  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
});

module.exports = pick;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
  text: /^[^\n]+/
};

block._label = /(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b';

block.html = edit(block.html)
  .replace('comment', /<!--[\s\S]*?-->/)
  .replace('closed', /<(tag)[\s\S]+?<\/\1>/)
  .replace('closing', /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/)
  .replace(/tag/g, block._tag)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', '<' + block._tag)
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      space,
      i,
      tag,
      l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase();
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;

inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex()

inline._inside = /(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = edit(inline.link)
  .replace('inside', inline._inside)
  .replace('href', inline._href)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('inside', inline._inside)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
    .replace('email', inline._email)
    .getRegex(),
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: edit(inline.text)
    .replace(']|', '~]|')
    .replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|')
    .getRegex()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      cap[0] = this.rules._backpedal.exec(cap[0])[0];
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href),
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
}

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
}

TextRenderer.prototype.br = function() {
  return '';
}

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)));
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer(),
  xhtml: false,
  baseUrl: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  root.marked = marked;
}
})(this || (typeof window !== 'undefined' ? window : global));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = {
  en: require('./en'),
  es: require('./es'),
  ja: require('./ja'),
  ko: require('./ko')
};
},{"./en":9,"./es":10,"./ja":12,"./ko":13}],9:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v2/en.json');
},{"../../../locales/v2/en.json":22}],10:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v2/es.json');
},{"../../../locales/v2/es.json":23}],11:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore'),
    contains = _.contains,
    extend = _.extend,
    keys = _.keys;

var dictionaries = require('./dictionaries');

var I18nData = function () {
  function I18nData(locale) {
    _classCallCheck(this, I18nData);

    this._locale = contains(keys(dictionaries), locale) ? locale : 'en';
    this._dictionary = dictionaries[this._locale];
  }

  _createClass(I18nData, [{
    key: 'data',
    value: function data() {
      //return keys(this._dictionary).reduce((res, k) => extend(res, this._dictionary[k]), {});
      return extend({}, this._dictionary);
    }
  }]);

  return I18nData;
}();

module.exports = I18nData;
},{"./dictionaries":8,"underscore":80}],12:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v2/ja.json');
},{"../../../locales/v2/ja.json":24}],13:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v2/ko.json');
},{"../../../locales/v2/ko.json":25}],14:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"./en":15,"./es":16,"./ja":18,"./ko":19,"dup":8}],15:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v3/en.json');
},{"../../../locales/v3/en.json":26}],16:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v3/es.json');
},{"../../../locales/v3/es.json":27}],17:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./dictionaries":14,"dup":11,"underscore":80}],18:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v3/ja.json');
},{"../../../locales/v3/ja.json":28}],19:[function(require,module,exports){
'use strict';
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../../locales/v3/ko.json');
},{"../../../locales/v3/ko.json":29}],20:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');
var extend = _.extend;
var pick = _.pick;
var pairs = _.pairs;

var format = require('./utilities/format-text');

var I18nDataV2 = require('./i18n/v2');
var I18nDataV3 = require('./i18n/v3');
var defaultVersion = 'v2';

var PersonalityTraitDescriptions = function () {
  function PersonalityTraitDescriptions(options) {
    _classCallCheck(this, PersonalityTraitDescriptions);

    this._options = extend(this.defaultOptions(), pick(options, 'locale', 'format', 'version'));
    this._version = typeof this._options.version !== 'undefined' ? this._options.version : defaultVersion;

    if (this._version === 'v3') {
      this._i18n = new I18nDataV3(this._options.locale);
    } else {
      this._i18n = new I18nDataV2(this._options.locale);
    }
    this._descriptions = this._i18n.data();

    this._descriptions = this._i18n.data();
  }

  _createClass(PersonalityTraitDescriptions, [{
    key: 'defaultOptions',
    value: function defaultOptions() {
      return {
        locale: 'en',
        format: 'plain',
        version: 'v2'
      };
    }
  }, {
    key: 'description',
    value: function description(traitId) {
      return format(this._descriptions[traitId], this._options);
    }
  }, {
    key: 'descriptions',
    value: function descriptions() {
      return pairs(this._descriptions).map(function (p) {
        return p[1];
      });
    }
  }]);

  return PersonalityTraitDescriptions;
}();

module.exports = PersonalityTraitDescriptions;
},{"./i18n/v2":11,"./i18n/v3":17,"./utilities/format-text":21,"underscore":80}],21:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var marked = require('marked');
var unmarked = require('remove-markdown');

function formatText(text, options) {
  var formatters = {
    plain: function plain(text) {
      return unmarked(text).replace(' How did we get this?', '');
    },
    html: function html(text) {
      return marked(text);
    },
    markdown: function markdown(text) {
      return text;
    }
  };

  var format = formatters[options.format];
  return format(text);
}

module.exports = formatText;
},{"marked":7,"remove-markdown":79}],22:[function(require,module,exports){
module.exports={
  "Openness": "Openness to experience. Higher: Intellectually curious, emotionally-aware, sensitive to beauty and willing to try new things.\nLower: Preferring the plain, straightforward, and obvious over the complex, ambiguous, and subtle.",
  "Conscientiousness": "Higher: More self-disciplined, dutiful, or aiming for achievement against measures or outside expectations.\nLower: More likely to prefer the spontaneous over the planned.",
  "Extraversion": "Higher: More energetic and pronounced engagement with the external world. Likes high group visibility, talking, and asserting themselves.\nLower: Needs less stimulation and are more independent of their social world. It does not mean they are shy, un-friendly, or antisocial.",
  "Agreeableness": "Higher: Value getting along with others. They have a more optimistic view of human nature.\nLower: Value self interests over others. They are more skeptical of others' motives.",
  "Neuroticism": "**This demo cannot diagnose a mental illness.** Higher: More likely to have negative emotions or get upset. It could mean they are going through a tough time.\nLower: More calm and less likely to get upset. It does not mean they are positive, or happy people.",
  "Adventurousness": "Eagerness to trying new activities and experiencing new things.",
  "Artistic interests": "Appreciation for art and beauty, both man-made and in nature.",
  "Emotionality": "Emotional availability; awareness of own feelings.",
  "Imagination": "Openness to creating an inner world of fantasy.",
  "Intellect": "Intellectual curiosity; openness to new ideas.",
  "Liberalism": "Openness to re-examine own values and traditions; readiness to challenge authority.",
  "Achievement striving": "The need for personal achievement and sense of direction.",
  "Cautiousness": "Tendency to think things through before acting or speaking.",
  "Dutifulness": "Sense of duty; amount of emphasis placed on fulfilling obligations.",
  "Orderliness": "Personal organization, tidiness, neatness.",
  "Self-discipline": "Will-power; the capacity to begin tasks and follow through to completion in spite of boredom or distractions.",
  "Self-efficacy": "Belief in one's own competence.",
  "Activity level": "Pace of living; level of busyness.",
  "Assertiveness": "Forcefulness of expression; pursuit of leadership and social ascendancy; desire to direct the activities of others.",
  "Cheerfulness": "Tendency to experience or express positive emotions.",
  "Excitement-seeking": "A need for environmental stimulation.",
  "Friendliness": "Interest in and friendliness towards others; socially confident.",
  "Gregariousness": "Fondness for the company of others; sociability.",
  "Altruism": "Active and genuine concern for the welfare of others.",
  "Cooperation": "Dislike of confrontations. Responding to interpersonal conflict with a willingness to compromise.",
  "Modesty": "Tendency to be unassuming and play down own achievements; humility.",
  "Morality": "Frank and genuine in expression; candid, blunt.",
  "Sympathy": "Attitude of compassion for others; kindness.",
  "Trust": "Level of belief in the sincerity and good intentions of others.",
  "Anger": "Tendency to experience–but not necessarily express–anger or frustration.",
  "Anxiety": "Tendency to dwell on difficulty or troubles; easily experience unease or concern.",
  "Depression": "Normal tendency to experience feelings of guilt, sadness, hopelessness, or loneliness. **This demo cannot diagnose a mental illness.**",
  "Immoderation": "Tendency to act on cravings and urges rather over resisting them or delaying gratification.",
  "Self-consciousness": "Concern with rejection, embarrassment; shyness.",
  "Vulnerability": "Difficulty in coping with stress or pressure in difficult situations.",
  "Structure": "A need for organization, planning, and things that have a clear purpose.",
  "Stability": "A need for the sensible, tried and tested, with a good track record and a known history.",
  "Self-expression": "A desire to discover and assert one's identity.",
  "Practicality": "A desire for getting the job done, skill, and efficiency.",
  "Love": "Social contact, whether one-to-one or one-to-many.",
  "Liberty": "A need to escape, a desire for new experiences, new things.",
  "Ideal": "A desire to satisfy one's idea of perfection in a lifestyle or experience, oftentimes seen as pursuing a sense of community.",
  "Harmony": "A need to appreciate or please other people, their viewpoints, and feelings.",
  "Excitement": "A need to pursue experiences or lead a lifestyle that arouses enthusiasm and eagerness.",
  "Curiosity": "A need to pursue experiences that foster learning, exploration, and growth.",
  "Closeness": "A need to nurture or be nurtured; a feeling of belonging.",
  "Challenge": "A desire to achieve, succeed, compete, or pursue experiences that test one's abilities.",
  "Conservation": "Respect, commitment, and acceptance of the customs and ideas that one's culture and/or religion provides.",
  "Openness to change": "Excitement, novelty, and challenge in life.",
  "Hedonism": "Pleasure or sensuous gratification for oneself.",
  "Self-enhancement": "Personal success through demonstrating competence according to social standards.",
  "Self-transcendence": "Preserving and enhancing the welfare of those with whom one is in frequent personal contact."
}

},{}],23:[function(require,module,exports){
module.exports={
  "Openness": "Apertura a las experiencias. Más alto: Intelectualmente curiosos, emocionalmente conscientes, sensibles a la belleza, y deseosos por probar cosas nuevas. \nMás bajo: Prefieren lo común, directo, y obvio, frente a lo complicado, ambiguo y sutil.",
  "Conscientiousness": "Más alto: Auto-disciplinados, conscientes de sus deberes, o tendientes a querer alcanzar logros por encima de las medidas o expectativas externas. \nMás bajo: Más propensos a preferir lo espontáneo por sobre lo planificado.",
  "Extraversion": "Más alto: Más enérgico y marcado compromiso con el mundo externo. Les gusta la alta visibilidad en grupos, hablar y demostrarse a si mismos. \nMás bajo: Necesitan menos estimulación y son más independientes de su mundo social. No significa que sean tímidos, no amistosos, o antisociales.",
  "Agreeableness": "Más alto: Valoran llevarse bien con otros. Tienen una visión más optimista de la naturaleza humana. \nMás bajo: Valoran sus propios intereses por sobre los de otros. Son más escépticos de los motivos de los demás.",
  "Neuroticism": "**Esta demo no puede diagnosticar una enfermedad mental.** Más alto: Más promensos a tener emociones negativas o disgustarse. Puede significar que estén pasando por un mañ momento. \nMás bajo: Más calmos y menos probables a disgustarse o alterarse. Esto no significa que sean gente positiva o feliz.",
  "Adventurousness": "Entusiasmo por probar nuevas actividades y experimentar nuevas cosas.",
  "Artistic interests": "Apreciación por el arte y la belleza, tanto humana como de la naturaleza.",
  "Emotionality": "Disponibilidad emocional; conciencia de los sentimientos propios.",
  "Imagination": "Apertira a crear un mundo interior de fantasía.",
  "Intellect": "Curiosidad intelectual; apertura a nuevas ideas.",
  "Liberalism": "Apertura a re-examinar los valores propios y tradiciones; disposición para desafiar la autoridad.",
  "Achievement striving": "Necesidad de realizar logros personales y sentido de la dirección.",
  "Cautiousness": "Tendencia a pensar las cosas antes de actuar o hablar.",
  "Dutifulness": "Sentido del deber; gran énfasis puesto en cumplir con las obligaciones.",
  "Orderliness": "Organización personal; prolijidad y pulcritud.",
  "Self-discipline": "Fuerza de voluntad; la capacidad de empezar tareas y seguirlas hasta el final, a pesar del aburrimiento o distracciones.",
  "Self-efficacy": "Creencia en la capacidad propia.",
  "Activity level": "Ritmo de vida; nivel de ocupación.",
  "Assertiveness": "Fuerza de expresión; búsqueda del liderazgo y ascendencia social; deseo por dirigir las actividades de otros.",
  "Cheerfulness": "Tendencia a experimentar o expresar emociones positivas.",
  "Excitement-seeking": "Necesidad por estimulación del entorno.",
  "Friendliness": "Interés y amistad hacia otros; confiado socialmente.",
  "Gregariousness": "Gusto por la compañía de otros; sociabilidad.",
  "Altruism": "Preocupación activa y genuina por el bienestar de los demás.",
  "Cooperation": "Disgusto por las confrontaciones; responde a los conflictos interpersonales con el deseo de compromiso.",
  "Modesty": "Tendencia a la sencillez, pocas pretensiones, sin alarde de los logros propios; humildad. ",
  "Morality": "Franqueza y expresión genuina; cándido, franco.",
  "Sympathy": "Actitud de compasión hacia los demás; amabilidad.",
  "Trust": "Nivel de creencia en la sinceridad y buenas intenciones de los demás.",
  "Anger": "Tendencia a experimentar –pero no necesariamente expresar– ira o frustración.",
  "Anxiety": "Tendencia a vivir enfocado en las dificultades y problemas; experimenta inquietud y problemas con facilidad. ",
  "Depression": "Tendencia normal a experimental sentimientos de culpa, tristeza, desesperanza, o soledad. **Esta demo no puede diagnosticar una enfermedad mental.**",
  "Immoderation": "Tendencia a actuar con ansiedad y urgencia. Tienden a los placeres y recompensas de corto plazo en lugar de consecuencias a largo plazo.",
  "Self-consciousness": "Temor al rechazo o vergüenza; timidez.",
  "Vulnerability": "Dificultad a lidiar con el estrés o la presión en situaciones complicadas.",
  "Structure": "Necesidad de organización, planificación, y cosas que tengan un propósito claro.",
  "Stability": "Necesidad por lo tangible, probado y experimentado, con un buen prontuario e historial.",
  "Self-expression": "Deseo por descubrir y plasmar la identidad propia.",
  "Practicality": "Deseo por completar una tarea, con habilidad y eficiencia.",
  "Love": "Contacto social, tanto uno-a-uno como uno-a-muchos..",
  "Liberty": "Necesidad de escapar, deseo por nuevas experiencias y cosas nuevas.",
  "Ideal": "Deseo de satisfacer las ideas propias de perfección en el estilo de vida o experiencias; generalmente visto como perseguir un deseo de comunidad.",
  "Harmony": "Necesidad de complacer a otras personas, sus puntos de vista y sentimientos.",
  "Excitement": "Necesidad de perseguir experiencias o llevar un estilo de vida que muestre entusiasmo y deseo.",
  "Curiosity": "Necesidad de perseguir experiencias que fomenten el aprendizaje, la exploración y el crecimiento.",
  "Closeness": "Necesidad de cuidar y ser cuidado; sentido de pertenencia.",
  "Challenge": "Deseo de alcanzar, lograr, competir, o perseguir experiencias que ponen a prueba las propias habilidades.",
  "Conservation": "Respeto, compromiso, y aceptación de las costumbres e ideas que proveen la propia cultura y/o religión.",
  "Openness to change": "Independencia en las acciones, los pensamientos, sentimientos y disposición a nuevas experiencias.",
  "Hedonism": "Búsqueda del placer y de la gratificación de los sentidos.",
  "Self-enhancement": "Éxito personal a través de la demostración de competencia de acuerdo a estándares sociales.",
  "Self-transcendence": "Preservación y mejora del bienestar de aquellos con los que se contacta frecuentemente."
}

},{}],24:[function(require,module,exports){
module.exports={
	"Openness": "経験への開放性。高い人： 知的好奇心があり、落ち着きがあり、美に敏感で、新しいことを試そうとするタイプです。\n低い人： 平穏を好み、率直で、複雑なものや曖昧なもの、取るに足らないものに対して関心を持たないタイプです。",
	"Conscientiousness": "高い人： 自己統制をし、誠実、あるいは外部の期待や評価に応えようとするタイプです。\n低い人： 計画に従うより、自発的に物事を行うことを好むタイプです。",
	"Extraversion": "高い人： よりエネルギッシュで、社交的なタイプです。グループ内で目立つこと、話しをすること、自分を主張することが好きです。\n低い人： 刺激をあまり求めず、人とのかかわりを避けるタイプです。但しそれは、臆病、非友好的、反社会的であるということではありません。",
	"Agreeableness": "高い人： 他人とうまくやっていくことを重要視するタイプです。人間の本性に関して楽観的な見方をしています。\n低い人： 他人より自分の興味を優先するタイプです。 他人の言葉の裏を考えてしまう傾向があります。",
	"Neuroticism": "**このデモシステムでは、精神病の診断はできません。** 高い人： 否定的な感情を抱いたり、取り乱したりするタイプです。それは、苦労が多いことを意味しているのかも知れません。\n低い人： 穏やかで、あまり怒らないタイプです。 但し、それは、自信に満ちていたり幸せな人だというわけではありません。",
	"Adventurousness": "新しい活動に挑戦し、新しいことを経験しようとする意欲。",
	"Artistic interests": "人工物か自然物かにかかわらない、芸術と美の評価。",
	"Emotionality": "情緒的応答性;自分の感情についての認識。",
	"Imagination": "内面で空想の世界を作り出すことへの寛容性。",
	"Intellect": "知的好奇心;新しいアイディアへの寛容さ。",
	"Liberalism": "自分の価値観と慣習を再検討する寛容さ;権威に挑戦する覚悟。",
	"Achievement striving": "個人的な成功の必要性と方向感。",
	"Cautiousness": "行動したり話したりする前に物事を考える傾向。",
	"Dutifulness": "義務感;義務を果たすことを重要視する度合い。",
	"Orderliness": "個人的秩序、整理、整頓。",
	"Self-discipline": "自制心;いったん仕事を始めると退屈だったり気が散ったりするのを我慢して最後までやり遂げる能力。",
	"Self-efficacy": "自分の能力への信念。",
	"Activity level": "生活のペース;忙しさのレベル。",
	"Assertiveness": "主張の力強さ;リーダーシップと社会的支配への志向性;他人の活動を指示したいという願望。",
	"Cheerfulness": "ポジティブな気持ちを感じたり、表現したりする傾向。",
	"Excitement-seeking": "環境的刺激への欲求。",
	"Friendliness": "他人に対する興味と友情;人付き合いへの自信。",
	"Gregariousness": "他の仲間に対する好意;社交性の高さ。",
	"Altruism": "他人の福利に純粋な関心を抱きそのために活動しようという気持ち。",
	"Cooperation": "対立への嫌悪。対人関係での争いに対して妥協して解決しようとする姿勢。",
	"Modesty": "控えめで成果を前面に出さない傾向;謙遜。",
	"Morality": "表現における率直さと純粋さ; 遠慮がなく、ぶっきらぼう。",
	"Sympathy": "他人への思いやりの態度。親切さ。",
	"Trust": "他人から誠実さと善意に対して信頼されている度合い。",
	"Anger": "怒りや不満を表現しないまでも経験する傾向。",
	"Anxiety": "困難なことやトラブルにこだわる傾向;不安や懸念を抱えやすい。",
	"Depression": "罪悪感、悲しみ、絶望、または孤独の感情を抱きやすい傾向。 **このデモでは、精神病を診断することはできません。 **",
	"Immoderation": "欲望と衝動を抑えたり遅らせたりするよりも、それらのままに行動する傾向。",
	"Self-consciousness": "拒絶と当惑に関する関心;内気。",
	"Vulnerability": "困難な状況でのストレスや圧力への対処の困難さ。",
	"Structure": "明確な目的を持っている組織、計画、および物事の必要性。",
	"Stability": "優れた実績と知られた経歴を持つ、思慮、実証、及び検査の必要性",
	"Self-expression": "自分のアイデンティティを発見し、主張する欲望。",
	"Practicality": "仕事をこなし、技量、効率を求める欲望。",
	"Love": "一対一、一体多かによらない、社会との接触。",
	"Liberty": "逃亡の必要性、新しい経験や新しいものに対する欲望。",
	"Ideal": "しばしば共同体意識の追求として見られる、生活や経験における完全性のアイディアに対する欲求。",
	"Harmony": "他人、彼らの見解、及びおよび感覚を高く評価したり喜ばせる必要性。",
	"Excitement": "熱意と意欲をそそる経験を追求したり生活を送る必要性。",
	"Curiosity": "学習、探求心、および成長を促進する経験を追求する必要性。",
	"Closeness": "はぐくみ、はぐくまれる必要性;所属感。",
	"Challenge": "達成、成功、競争、または自分の能力を試す経験を追求する欲望。",
	"Conservation": "文化や宗教の違いによる習慣やアイディアに対する尊敬、約束、および受け入れ。",
	"Openness to change": "生活における興奮、新規性、および挑戦。",
	"Hedonism": "自分自身のための喜びや感覚的な満足感。",
	"Self-enhancement": "社会的な基準に基づいて能力を実証することによる個人的な成功。",
	"Self-transcendence": "頻繁に接触を行っている人の幸せを維持し向上すること。"
}

},{}],25:[function(require,module,exports){
module.exports={
"Openness" : "경험에 대한 개방성. 높은 사람: 지적으로 호기심이 있고, 감정적으로 인식하며, 심미적인 것에 대한 감성이 풍부하고 새로운 것을 시도 할 의향이 있습니다. 낮은 사람: 단조롭고 간단한 것을 선호하고, 복잡하고 모호하며 미묘한 것보다 분명한 것을 선호합니다.",
"Conscientiousness" : "높은 사람: 보다 자기훈련이 되었고 충실함. 혹은 예상 밖이거나 척도에 거스르는 것에 반한 성취를 목표로 합니다. 낮은 사람: 계획적인 것보다 즉흥적으로 선호하는 경향이 있습니다.",
"Extraversion" : "높은 사람: 보다 활기차고 확연한 외부세계와의 관계. 상위그룹의 가시성, 대화하는 것 그리고 자기주장을 하는 것과 같이. 낮은 사람: 사회세계에서 더 독립적인 것과 덜 자극적인 것이 필요합니다. 그것은 그들이 부끄럼을 탄다거나, 친화적이지 않다거나, 반사회적이라는 것을 의미하지는 않습니다.",
"Agreeableness" : "높은 사람: 다른사람들과 함께하는 가치. 그들은 인간 본성에 대해 보다 낙관적인 견해를 가지고 있습니다. 낮은 사람: 다른 사람들보다 자기 이익을 중시합니다. 그들은 다른 사람들의 동기유발에 회의적입니다.",
"Neuroticism" : "**이 데모는 정신질환을 진단 할 수 없습니다.** Higher: 부정적인 감정을 갖거나 화를 낼 가능성이 더 큽니다. 그것은 그들이 힘든 시기를 겪고 있음을 의미 할 수 있습니다. 낮은 사람: 더 평온하고, 화를 낼 가능성이 더 적습니다. 그렇다고 그들이 긍정적이거나 행복한 사람들이라는 의미는 아닙니다.",
"Adventurousness" : "새로운 활동들을 시도하고 새로운 것들을 경험하는 것을 열망합니다.",
"Artistic interests" : "인공적인 것과 자연적인 것 둘 다의 예술성과 아름다움을 높히 평가함.",
"Emotionality" : "정서적인 가용성; 자신의 감정에 대한 인식.",
"Imagination" : "판타지의 내면 세계를 창조하는 개방성.",
"Intellect" : "지적 호기심; 새로운 아이디어에 대한 개방성.",
"Liberalism" : "자신의 가치와 전통을 재검토하려는 개방성; 권위에 도전할 준비가 되어있음.",
"Achievement striving" : "개인적 성취와 목적을 향한 방향 감각의 필요성.",
"Cautiousness" : "행동을 취하거나 말하기 전에 생각하는 경향.",
"Dutifulness" : "의무감; 의무 이행에 많은 중점을 둡니다.",
"Orderliness" : "개인적인 체계성, 청결함, 정돈됨.",
"Self-discipline" : "의지력; 업무를 시작하고 지루함이나 산만함에도 불구하고 완료할 수있는 역량.",
"Self-efficacy" : "자신의 능력에 대한 믿음.",
"Activity level" : "생활의 속도; 바쁨의 레벨.",
"Assertiveness" : "표현의 강압; 리더십과 사회적 우위 추구; 타인의 활동을 지도하고자하는 열망.",
"Cheerfulness" : "긍정적인 감정을 경험하거나 표현하려는 경향.",
"Excitement-seeking" : "환경적인 자극의 필요성.",
"Friendliness" : "다른 사람들에 대한 우정과 관심, 사회적으로 자신감이 있는.",
"Gregariousness" : "다른 사람들에 대한 단체를 좋아함; 사교성.",
"Altruism" : "다른 사람들의 복지에 대한 적극적이고 진정한 관심.",
"Cooperation" : "대립을 싫어합니다. 대인 갈등에서 타협하려는 의지에 대한 반응.",
"Modesty" : "자신의 성취를 겸손하게 대하는 경향. 겸손.",
"Morality" : "솔직하고 진정한 표현; 솔직하고 직설적인.",
"Sympathy" : "다른 사람들을 위한 연민의 자세; 친절.",
"Trust" : "타인의 성의와 선의에 대한 믿음.",
"Anger" : "경험에 대한 성향 - 분노 또는 좌절감의 표현이 필수는 아니지만.",
"Anxiety" : "어려움이나 곤경에 빠지려는 경향; 불안감이나 걱정을 쉽게 경험합니다.",
"Depression" : "죄책감, 슬픔, 절망, 또는 외로움의 감정을 경험하는 일반적인 성향. **이 데모는 정신질환을 진단 할 수 없습니다.",
"Immoderation" : "열망에 영향을 주는 성향. 그리고 그들에게 저항하거나 만족시키는것이 지연되도록 자극합니다.",
"Self-consciousness" : "거절, 당황에 대한 우려; 수줍음.",
"Vulnerability" : "힘든 상황에서 스트레스나 압박에 대처하는 것이 어려움.",
"Structure" : "명확한 목적을 가진 조직, 계획 및 사물에 대한 필요성.",
"Stability" : "좋은 실적과 알려진 역사를 지닌 현명하고 믿을만 하며 경험이 풍부한 사람의 필요성.",
"Self-expression" : "자신의 정체성을 발견하고 주장하려는 열망.",
"Practicality" : "기술과 효율성을 가지고 일을 완수 하려는 열망.",
"Love" : "일대일 또는 일대다의 사회적 접촉.",
"Liberty" : "탈출의 필요성, 새로운 것들과 경험에 대한 갈망.",
"Ideal" : "생활방식이나 경험에서 완벽을 충족하고자 하는 열망, 종종 공동체 의식을 추구하는 것처럼 보여진다.",
"Harmony" : "다른 사람들, 그들의 견해 그리고 감정에 감사하거나 기뻐 할 필요성.",
"Excitement" : "열정과 열의를 자극하는 생활 방식을 이끌거나 그러한 경험을 추구할 필요성.",
"Curiosity" : "학습, 탐험 및 성장을 촉진시키는 경험을 추구할 필요성.",
"Closeness" : "양육하거나 양육될 필요성; 소속감.",
"Challenge" : "자신의 능력을 시험하는 경험을 성취하고, 성공하고, 경쟁하거나, 추구하는 욕망.",
"Conservation" : "문화 그리고/또는 종교가 제공하는 관습 및 아이디어에 대한 존중, 헌신 및 수용",
"Openness to change" : "인생의 흥분, 참신함 및 도전.",
"Hedonism" : "자신을 위한 쾌락 또는 감각적으로 만족시키는 것.",
"Self-enhancement" : "사회적 기준에 따른 능력의 입증을 통한 개인적인 성공.",
"Self-transcendence" : "개인적인 접촉이 빈번한 사람들의 복지를 증진시키고 개선하는 것."
}

},{}],26:[function(require,module,exports){
module.exports={
  "big5_openness": "Openness to experience. Higher: Intellectually curious, emotionally-aware, sensitive to beauty and willing to try new things.\nLower: Preferring the plain, straightforward, and obvious over the complex, ambiguous, and subtle.",
  "big5_conscientiousness": "Higher: More self-disciplined, dutiful, or aiming for achievement against measures or outside expectations.\nLower: More likely to prefer the spontaneous over the planned.",
  "big5_extraversion": "Higher: More energetic and pronounced engagement with the external world. Likes high group visibility, talking, and asserting themselves.\nLower: Needs less stimulation and are more independent of their social world. It does not mean they are shy, un-friendly, or antisocial.",
  "big5_agreeableness": "Higher: Value getting along with others. They have a more optimistic view of human nature.\nLower: Value self interests over others. They are more skeptical of others' motives.",
  "big5_neuroticism": "**This demo cannot diagnose a mental illness.** Higher: More likely to have negative emotions or get upset. It could mean they are going through a tough time.\nLower: More calm and less likely to get upset. It does not mean they are positive, or happy people.",
  "facet_adventurousness": "Eagerness to trying new activities and experiencing new things.",
  "facet_artistic_interests": "Appreciation for art and beauty, both man-made and in nature.",
  "facet_emotionality": "Emotional availability; awareness of own feelings.",
  "facet_imagination": "Openness to creating an inner world of fantasy.",
  "facet_intellect": "Intellectual curiosity; openness to new ideas.",
  "facet_liberalism": "Openness to re-examine own values and traditions; readiness to challenge authority.",
  "facet_achievement_striving": "The need for personal achievement and sense of direction.",
  "facet_cautiousness": "Tendency to think things through before acting or speaking.",
  "facet_dutifulness": "Sense of duty; amount of emphasis placed on fulfilling obligations.",
  "facet_orderliness": "Personal organization, tidiness, neatness.",
  "facet_self_discipline": "Will-power; the capacity to begin tasks and follow through to completion in spite of boredom or distractions.",
  "facet_self_efficacy": "Belief in one's own competence.",
  "facet_activity_level": "Pace of living; level of busyness.",
  "facet_assertiveness": "Forcefulness of expression; pursuit of leadership and social ascendancy; desire to direct the activities of others.",
  "facet_cheerfulness": "Tendency to experience or express positive emotions.",
  "facet_excitement_seeking": "A need for environmental stimulation.",
  "facet_friendliness": "Interest in and friendliness towards others; socially confident.",
  "facet_gregariousness": "Fondness for the company of others; sociability.",
  "facet_altruism": "Active and genuine concern for the welfare of others.",
  "facet_cooperation": "Dislike of confrontations. Responding to interpersonal conflict with a willingness to compromise.",
  "facet_modesty": "Tendency to be unassuming and play down own achievements; humility.",
  "facet_morality": "Frank and genuine in expression; candid, blunt.",
  "facet_sympathy": "Attitude of compassion for others; kindness.",
  "facet_trust": "Level of belief in the sincerity and good intentions of others.",
  "facet_anger": "Tendency to experience–but not necessarily express–anger or frustration.",
  "facet_anxiety": "Tendency to dwell on difficulty or troubles; easily experience unease or concern.",
  "facet_depression": "Normal tendency to experience feelings of guilt, sadness, hopelessness, or loneliness. **This demo cannot diagnose a mental illness.**",
  "facet_immoderation": "Tendency to act on cravings and urges rather over resisting them or delaying gratification.",
  "facet_self_consciousness": "Concern with rejection, embarrassment; shyness.",
  "facet_vulnerability": "Difficulty in coping with stress or pressure in difficult situations.",
  "need_structure": "A need for organization, planning, and things that have a clear purpose.",
  "need_stability": "A need for the sensible, tried and tested, with a good track record and a known history.",
  "need_self_expression": "A desire to discover and assert one's identity.",
  "need_practicality": "A desire for getting the job done, skill, and efficiency.",
  "need_love": "Social contact, whether one-to-one or one-to-many.",
  "need_liberty": "A need to escape, a desire for new experiences, new things.",
  "need_ideal": "A desire to satisfy one's idea of perfection in a lifestyle or experience, oftentimes seen as pursuing a sense of community.",
  "need_harmony": "A need to appreciate or please other people, their viewpoints, and feelings.",
  "need_excitement": "A need to pursue experiences or lead a lifestyle that arouses enthusiasm and eagerness.",
  "need_curiosity": "A need to pursue experiences that foster learning, exploration, and growth.",
  "need_closeness": "A need to nurture or be nurtured; a feeling of belonging.",
  "need_challenge": "A desire to achieve, succeed, compete, or pursue experiences that test one's abilities.",
  "value_conservation": "Respect, commitment, and acceptance of the customs and ideas that one's culture and/or religion provides.",
  "value_openness_to_change": "Excitement, novelty, and challenge in life.",
  "value_hedonism": "Pleasure or sensuous gratification for oneself.",
  "value_self_enhancement": "Personal success through demonstrating competence according to social standards.",
  "value_self_transcendence": "Preserving and enhancing the welfare of those with whom one is in frequent personal contact."
}

},{}],27:[function(require,module,exports){
module.exports={
  "big5_openness": "Apertura a las experiencias. Más alto: Intelectualmente curiosos, emocionalmente conscientes, sensibles a la belleza, y deseosos por probar cosas nuevas. \nMás bajo: Prefieren lo común, directo, y obvio, frente a lo complicado, ambiguo y sutil.",
  "big5_conscientiousness": "Más alto: Auto-disciplinados, conscientes de sus deberes, o tendientes a querer alcanzar logros por encima de las medidas o expectativas externas. \nMás bajo: Más propensos a preferir lo espontáneo por sobre lo planificado.",
  "big5_extraversion": "Más alto: Más enérgico y marcado compromiso con el mundo externo. Les gusta la alta visibilidad en grupos, hablar y demostrarse a si mismos. \nMás bajo: Necesitan menos estimulación y son más independientes de su mundo social. No significa que sean tímidos, no amistosos, o antisociales.",
  "big5_agreeableness": "Más alto: Valoran llevarse bien con otros. Tienen una visión más optimista de la naturaleza humana. \nMás bajo: Valoran sus propios intereses por sobre los de otros. Son más escépticos de los motivos de los demás.",
  "big5_neuroticism": "**Esta demo no puede diagnosticar una enfermedad mental.** Más alto: Más promensos a tener emociones negativas o disgustarse. Puede significar que estén pasando por un mañ momento. \nMás bajo: Más calmos y menos probables a disgustarse o alterarse. Esto no significa que sean gente positiva o feliz.",
  "facet_adventurousness": "Entusiasmo por probar nuevas actividades y experimentar nuevas cosas.",
  "facet_artistic_interests": "Apreciación por el arte y la belleza, tanto humana como de la naturaleza.",
  "facet_emotionality": "Disponibilidad emocional; conciencia de los sentimientos propios.",
  "facet_imagination": "Apertira a crear un mundo interior de fantasía.",
  "facet_intellect": "Curiosidad intelectual; apertura a nuevas ideas.",
  "facet_liberalism": "Apertura a re-examinar los valores propios y tradiciones; disposición para desafiar la autoridad.",
  "facet_achievement_striving": "Necesidad de realizar logros personales y sentido de la dirección.",
  "facet_cautiousness": "Tendencia a pensar las cosas antes de actuar o hablar.",
  "facet_dutifulness": "Sentido del deber; gran énfasis puesto en cumplir con las obligaciones.",
  "facet_orderliness": "Organización personal; prolijidad y pulcritud.",
  "facet_self_discipline": "Fuerza de voluntad; la capacidad de empezar tareas y seguirlas hasta el final, a pesar del aburrimiento o distracciones.",
  "facet_self_efficacy": "Creencia en la capacidad propia.",
  "facet_activity_level": "Ritmo de vida; nivel de ocupación.",
  "facet_assertiveness": "Fuerza de expresión; búsqueda del liderazgo y ascendencia social; deseo por dirigir las actividades de otros.",
  "facet_cheerfulness": "Tendencia a experimentar o expresar emociones positivas.",
  "facet_excitement_seeking": "Necesidad por estimulación del entorno.",
  "facet_friendliness": "Interés y amistad hacia otros; confiado socialmente.",
  "facet_gregariousness": "Gusto por la compañía de otros; sociabilidad.",
  "facet_altruism": "Preocupación activa y genuina por el bienestar de los demás.",
  "facet_cooperation": "Disgusto por las confrontaciones; responde a los conflictos interpersonales con el deseo de compromiso.",
  "facet_modesty": "Tendencia a la sencillez, pocas pretensiones, sin alarde de los logros propios; humildad. ",
  "facet_morality": "Franqueza y expresión genuina; cándido, franco.",
  "facet_sympathy": "Actitud de compasión hacia los demás; amabilidad.",
  "facet_trust": "Nivel de creencia en la sinceridad y buenas intenciones de los demás.",
  "facet_anger": "Tendencia a experimentar –pero no necesariamente expresar– ira o frustración.",
  "facet_anxiety": "Tendencia a vivir enfocado en las dificultades y problemas; experimenta inquietud y problemas con facilidad. ",
  "facet_depression": "Tendencia normal a experimental sentimientos de culpa, tristeza, desesperanza, o soledad. **Esta demo no puede diagnosticar una enfermedad mental.**",
  "facet_immoderation": "Tendencia a actuar con ansiedad y urgencia. Tienden a los placeres y recompensas de corto plazo en lugar de consecuencias a largo plazo.",
  "facet_self_consciousness": "Temor al rechazo o vergüenza; timidez.",
  "facet_vulnerability": "Dificultad a lidiar con el estrés o la presión en situaciones complicadas.",
  "need_structure": "Necesidad de organización, planificación, y cosas que tengan un propósito claro.",
  "need_stability": "Necesidad por lo tangible, probado y experimentado, con un buen prontuario e historial.",
  "need_self_expression": "Deseo por descubrir y plasmar la identidad propia.",
  "need_practicality": "Deseo por completar una tarea, con habilidad y eficiencia.",
  "need_love": "Contacto social, tanto uno-a-uno como uno-a-muchos..",
  "need_liberty": "Necesidad de escapar, deseo por nuevas experiencias y cosas nuevas.",
  "need_ideal": "Deseo de satisfacer las ideas propias de perfección en el estilo de vida o experiencias; generalmente visto como perseguir un deseo de comunidad.",
  "need_harmony": "Necesidad de complacer a otras personas, sus puntos de vista y sentimientos.",
  "need_excitement": "Necesidad de perseguir experiencias o llevar un estilo de vida que muestre entusiasmo y deseo.",
  "need_curiosity": "Necesidad de perseguir experiencias que fomenten el aprendizaje, la exploración y el crecimiento.",
  "need_closeness": "Necesidad de cuidar y ser cuidado; sentido de pertenencia.",
  "need_challenge": "Deseo de alcanzar, lograr, competir, o perseguir experiencias que ponen a prueba las propias habilidades.",
  "value_conservation": "Respeto, compromiso, y aceptación de las costumbres e ideas que proveen la propia cultura y/o religión.",
  "value_openness_to_change": "Independencia en las acciones, los pensamientos, sentimientos y disposición a nuevas experiencias.",
  "value_hedonism": "Búsqueda del placer y de la gratificación de los sentidos.",
  "value_self_enhancement": "Éxito personal a través de la demostración de competencia de acuerdo a estándares sociales.",
  "value_self_transcendence": "Preservación y mejora del bienestar de aquellos con los que se contacta frecuentemente."
}

},{}],28:[function(require,module,exports){
module.exports={
	"big5_openness": "経験への開放性。高い人： 知的好奇心があり、落ち着きがあり、美に敏感で、新しいことを試そうとするタイプです。\n低い人： 平穏を好み、率直で、複雑なものや曖昧なもの、取るに足らないものに対して関心を持たないタイプです。",
	"big5_conscientiousness": "高い人： 自己統制をし、誠実、あるいは外部の期待や評価に応えようとするタイプです。\n低い人： 計画に従うより、自発的に物事を行うことを好むタイプです。",
	"big5_extraversion": "高い人： よりエネルギッシュで、社交的なタイプです。グループ内で目立つこと、話しをすること、自分を主張することが好きです。\n低い人： 刺激をあまり求めず、人とのかかわりを避けるタイプです。但しそれは、臆病、非友好的、反社会的であるということではありません。",
	"big5_agreeableness": "高い人： 他人とうまくやっていくことを重要視するタイプです。人間の本性に関して楽観的な見方をしています。\n低い人： 他人より自分の興味を優先するタイプです。 他人の言葉の裏を考えてしまう傾向があります。",
	"big5_neuroticism": "**このデモシステムでは、精神病の診断はできません。** 高い人： 否定的な感情を抱いたり、取り乱したりするタイプです。それは、苦労が多いことを意味しているのかも知れません。\n低い人： 穏やかで、あまり怒らないタイプです。 但し、それは、自信に満ちていたり幸せな人だというわけではありません。",
	"facet_adventurousness": "新しい活動に挑戦し、新しいことを経験しようとする意欲。",
	"facet_artistic_interests": "人工物か自然物かにかかわらない、芸術と美の評価。",
	"facet_emotionality": "情緒的応答性;自分の感情についての認識。",
	"facet_imagination": "内面で空想の世界を作り出すことへの寛容性。",
	"facet_intellect": "知的好奇心;新しいアイディアへの寛容さ。",
	"facet_liberalism": "自分の価値観と慣習を再検討する寛容さ;権威に挑戦する覚悟。",
	"facet_achievement_striving": "個人的な成功の必要性と方向感。",
	"facet_cautiousness": "行動したり話したりする前に物事を考える傾向。",
	"facet_dutifulness": "義務感;義務を果たすことを重要視する度合い。",
	"facet_orderliness": "個人的秩序、整理、整頓。",
	"facet_self_discipline": "自制心;いったん仕事を始めると退屈だったり気が散ったりするのを我慢して最後までやり遂げる能力。",
	"facet_self_efficacy": "自分の能力への信念。",
	"facet_activity_level": "生活のペース;忙しさのレベル。",
	"facet_assertiveness": "主張の力強さ;リーダーシップと社会的支配への志向性;他人の活動を指示したいという願望。",
	"facet_cheerfulness": "ポジティブな気持ちを感じたり、表現したりする傾向。",
	"facet_excitement_seeking": "環境的刺激への欲求。",
	"facet_friendliness": "他人に対する興味と友情;人付き合いへの自信。",
	"facet_gregariousness": "他の仲間に対する好意;社交性の高さ。",
	"facet_altruism": "他人の福利に純粋な関心を抱きそのために活動しようという気持ち。",
	"facet_cooperation": "対立への嫌悪。対人関係での争いに対して妥協して解決しようとする姿勢。",
	"facet_modesty": "控えめで成果を前面に出さない傾向;謙遜。",
	"facet_morality": "表現における率直さと純粋さ; 遠慮がなく、ぶっきらぼう。",
	"facet_sympathy": "他人への思いやりの態度。親切さ。",
	"facet_trust": "他人から誠実さと善意に対して信頼されている度合い。",
	"facet_anger": "怒りや不満を表現しないまでも経験する傾向。",
	"facet_anxiety": "困難なことやトラブルにこだわる傾向;不安や懸念を抱えやすい。",
	"facet_depression": "罪悪感、悲しみ、絶望、または孤独の感情を抱きやすい傾向。 **このデモでは、精神病を診断することはできません。 **",
	"facet_immoderation": "欲望と衝動を抑えたり遅らせたりするよりも、それらのままに行動する傾向。",
	"facet_self_consciousness": "拒絶と当惑に関する関心;内気。",
	"facet_vulnerability": "困難な状況でのストレスや圧力への対処の困難さ。",
	"need_structure": "明確な目的を持っている組織、計画、および物事の必要性。",
	"need_stability": "優れた実績と知られた経歴を持つ、思慮、実証、及び検査の必要性",
	"need_self_expression": "自分のアイデンティティを発見し、主張する欲望。",
	"need_practicality": "仕事をこなし、技量、効率を求める欲望。",
	"need_love": "一対一、一体多かによらない、社会との接触。",
	"need_liberty": "逃亡の必要性、新しい経験や新しいものに対する欲望。",
	"need_ideal": "しばしば共同体意識の追求として見られる、生活や経験における完全性のアイディアに対する欲求。",
	"need_harmony": "他人、彼らの見解、及びおよび感覚を高く評価したり喜ばせる必要性。",
	"need_excitement": "熱意と意欲をそそる経験を追求したり生活を送る必要性。",
	"need_curiosity": "学習、探求心、および成長を促進する経験を追求する必要性。",
	"need_closeness": "はぐくみ、はぐくまれる必要性;所属感。",
	"need_challenge": "達成、成功、競争、または自分の能力を試す経験を追求する欲望。",
	"value_conservation": "文化や宗教の違いによる習慣やアイディアに対する尊敬、約束、および受け入れ。",
	"value_openness_to_change": "生活における興奮、新規性、および挑戦。",
	"value_hedonism": "自分自身のための喜びや感覚的な満足感。",
	"value_self_enhancement": "社会的な基準に基づいて能力を実証することによる個人的な成功。",
	"value_self_transcendence": "頻繁に接触を行っている人の幸せを維持し向上すること。"
}

},{}],29:[function(require,module,exports){
module.exports={
	"big5_openness": "경험에 대한 개방성. 높은 사람: 지적으로 호기심이 있고, 감정적으로 인식하며, 심미적인 것에 대한 감성이 풍부하고 새로운 것을 시도 할 의향이 있습니다. \n낮은 사람: 단조롭고 간단한 것을 선호하고, 복잡하고 모호하며 미묘한 것보다 분명한 것을 선호합니다.",
  "big5_conscientiousness": "높은 사람: 보다 자기훈련이 되었고 충실함. 혹은 예상 밖이거나 척도에 거스르는 것에 반한 성취를 목표로 합니다. \n낮은 사람: 계획적인 것보다 즉흥적으로 선호하는 경향이 있습니다.",
  "big5_extraversion": "높은 사람: 보다 활기차고 확연한 외부세계와의 관계. 상위그룹의 가시성, 대화하는 것 그리고 자기주장을 하는 것과 같이. \n낮은 사람: 사회세계에서 더 독립적인 것과 덜 자극적인 것이 필요합니다. 그것은 그들이 부끄럼을 탄다거나, 친화적이지 않다거나, 반사회적이라는 것을 의미하지는 않습니다.",
  "big5_agreeableness": "높은 사람: 다른사람들과 함께하는 가치. 그들은 인간 본성에 대해 보다 낙관적인 견해를 가지고 있습니다. \n낮은 사람: 다른 사람들보다 자기 이익을 중시합니다. 그들은 다른 사람들의 동기유발에 회의적입니다.",
  "big5_neuroticism": "**이 데모는 정신질환을 진단 할 수 없습니다.** 높은 사람: 부정적인 감정을 갖거나 화를 낼 가능성이 더 큽니다. 그것은 그들이 힘든 시기를 겪고 있음을 의미 할 수 있습니다. \n낮은 사람: 더 평온하고, 화를 낼 가능성이 더 적습니다. 그렇다고 그들이 긍정적이거나 행복한 사람들이라는 의미는 아닙니다.",
  "facet_adventurousness": "새로운 활동들을 시도하고 새로운 것들을 경험하는 것을 열망합니다.",
  "facet_artistic_interests": "인공적인 것과 자연적인 것 둘 다의 예술성과 아름다움을 높히 평가함.",
  "facet_emotionality": "정서적인 가용성; 자신의 감정에 대한 인식.",
  "facet_imagination": "판타지의 내면 세계를 창조하는 개방성.",
  "facet_intellect": "지적 호기심; 새로운 아이디어에 대한 개방성.",
  "facet_liberalism": "자신의 가치와 전통을 재검토하려는 개방성; 권위에 도전할 준비가 되어있음.",
  "facet_achievement_striving": "개인적 성취와 목적을 향한 방향 감각의 필요성.",
  "facet_cautiousness": "행동을 취하거나 말하기 전에 생각하는 경향.",
  "facet_dutifulness": "의무감; 의무 이행에 많은 중점을 둡니다.",
  "facet_orderliness": "개인적인 체계성, 청결함, 정돈됨.",
  "facet_self_discipline": "의지력; 업무를 시작하고 지루함이나 산만함에도 불구하고 완료할 수있는 역량.",
  "facet_self_efficacy": "자신의 능력에 대한 믿음.",
  "facet_activity_level": "생활의 속도; 바쁨의 레벨.",
  "facet_assertiveness": "표현의 강압; 리더십과 사회적 우위 추구; 타인의 활동을 지도하고자하는 열망.",
  "facet_cheerfulness": "긍정적인 감정을 경험하거나 표현하려는 경향.",
  "facet_excitement_seeking": "환경적인 자극의 필요성.",
  "facet_friendliness": "다른 사람들에 대한 우정과 관심, 사회적으로 자신감이 있는.",
  "facet_gregariousness": "다른 사람들에 대한 단체를 좋아함; 사교성.",
  "facet_altruism": "다른 사람들의 복지에 대한 적극적이고 진정한 관심.",
  "facet_cooperation": "대립을 싫어합니다. 대인 갈등에서 타협하려는 의지에 대한 반응.",
  "facet_modesty": "자신의 성취를 겸손하게 대하는 경향. 겸손.",
  "facet_morality": "솔직하고 진정한 표현; 솔직하고 직설적인.",
  "facet_sympathy": "다른 사람들을 위한 연민의 자세; 친절.",
  "facet_trust": "타인의 성의와 선의에 대한 믿음.",
  "facet_anger": "경험에 대한 성향 - 분노 또는 좌절감의 표현이 필수는 아니지만.",
  "facet_anxiety": "어려움이나 곤경에 빠지려는 경향; 불안감이나 걱정을 쉽게 경험합니다.",
  "facet_depression": "죄책감, 슬픔, 절망, 또는 외로움의 감정을 경험하는 일반적인 성향. **이 데모는 정신질환을 진단 할 수 없습니다.",
  "facet_immoderation": "열망에 영향을 주는 성향. 그리고 그들에게 저항하거나 만족시키는것이 지연되도록 자극합니다.",
  "facet_self_consciousness": "거절, 당황에 대한 우려; 수줍음.",
  "facet_vulnerability": "힘든 상황에서 스트레스나 압박에 대처하는 것이 어려움.",
  "need_structure": "명확한 목적을 가진 조직, 계획 및 사물에 대한 필요성.",
  "need_stability": "좋은 실적과 알려진 역사를 지닌 현명하고 믿을만 하며 경험이 풍부한 사람의 필요성.",
  "need_self_expression": "자신의 정체성을 발견하고 주장하려는 열망.",
  "need_practicality": "기술과 효율성을 가지고 일을 완수 하려는 열망.",
  "need_love": "일대일 또는 일대다의 사회적 접촉.",
  "need_liberty": "탈출의 필요성, 새로운 것들과 경험에 대한 갈망.",
  "need_ideal": "생활방식이나 경험에서 완벽을 충족하고자 하는 열망, 종종 공동체 의식을 추구하는 것처럼 보여진다.",
  "need_harmony": "다른 사람들, 그들의 견해 그리고 감정에 감사하거나 기뻐 할 필요성.",
  "need_excitement": "열정과 열의를 자극하는 생활 방식을 이끌거나 그러한 경험을 추구할 필요성.",
  "need_curiosity": "학습, 탐험 및 성장을 촉진시키는 경험을 추구할 필요성.",
  "need_closeness": "양육하거나 양육될 필요성; 소속감.",
  "need_challenge": "자신의 능력을 시험하는 경험을 성취하고, 성공하고, 경쟁하거나, 추구하는 욕망.",
  "value_conservation": "문화 그리고/또는 종교가 제공하는 관습 및 아이디어에 대한 존중, 헌신 및 수용",
  "value_openness_to_change": "인생의 흥분, 참신함 및 도전.",
  "value_hedonism": "자신을 위한 쾌락 또는 감각적으로 만족시키는 것.",
  "value_self_enhancement": "사회적 기준에 따른 능력의 입증을 통한 개인적인 성공.",
  "value_self_transcendence": "개인적인 접촉이 빈번한 사람들의 복지를 증진시키고 개선하는 것."
}

},{}],30:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/ar.json');

},{"../../locales/v2/ar.json":57}],31:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/de.json');

},{"../../locales/v2/de.json":58}],32:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = {
  'en' : require('./en'),
  'es' : require('./es'),
  'ja' : require('./ja'),
  'ar' : require('./ar'),
  'it' : require('./it'),
  'de' : require('./de'),
  'ko' : require('./ko'),
  'zh' : require('./zh'),
  'zh-tw' : require('./zh-tw'),
  'fr' : require('./fr'),
  'pt-br' : require('./pt-br'),
};

},{"./ar":30,"./de":31,"./en":33,"./es":34,"./fr":35,"./it":37,"./ja":38,"./ko":39,"./pt-br":40,"./zh":42,"./zh-tw":41}],33:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/en.json');

},{"../../locales/v2/en.json":59}],34:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/es.json');

},{"../../locales/v2/es.json":60}],35:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/fr.json');

},{"../../locales/v2/fr.json":61}],36:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const contains = (map, element) => Object.keys(map || {}).indexOf(element) !== -1;
const dictionaries = require('./dictionaries');


class I18nData {

  constructor(locale) {
    this._locale = contains(dictionaries, locale) ? locale : 'en';
    this._dictionary = dictionaries[this._locale];
  }

  data() {
    return Object.assign({}, this._dictionary);
  }
}


module.exports = I18nData;

},{"./dictionaries":32}],37:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/it.json');

},{"../../locales/v2/it.json":62}],38:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/ja.json');

},{"../../locales/v2/ja.json":63}],39:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/ko.json');

},{"../../locales/v2/ko.json":64}],40:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/pt-br.json');

},{"../../locales/v2/pt-br.json":65}],41:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/zh-tw.json');

},{"../../locales/v2/zh-tw.json":66}],42:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v2/zh.json');

},{"../../locales/v2/zh.json":67}],43:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/ar.json');

},{"../../locales/v3/ar.json":68}],44:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/de.json');

},{"../../locales/v3/de.json":69}],45:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./ar":43,"./de":44,"./en":46,"./es":47,"./fr":48,"./it":50,"./ja":51,"./ko":52,"./pt-br":53,"./zh":55,"./zh-tw":54,"dup":32}],46:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/en.json');

},{"../../locales/v3/en.json":70}],47:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/es.json');

},{"../../locales/v3/es.json":71}],48:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/fr.json');

},{"../../locales/v3/fr.json":72}],49:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const contains = (map, element) => Object.keys(map || {}).indexOf(element) !== -1;

const dictionaries = require('./dictionaries');


class I18nData {
  constructor(locale) {
    this._locale = contains(dictionaries, locale) ? locale : 'en';
    this._dictionary = dictionaries[this._locale];
  }

  data() {
    return Object.assign({}, this._dictionary);
  }
}


module.exports = I18nData;

},{"./dictionaries":45}],50:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/it.json');

},{"../../locales/v3/it.json":73}],51:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/ja.json');

},{"../../locales/v3/ja.json":74}],52:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/ko.json');

},{"../../locales/v3/ko.json":75}],53:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/pt-br.json');

},{"../../locales/v3/pt-br.json":76}],54:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/zh-tw.json');

},{"../../locales/v3/zh-tw.json":77}],55:[function(require,module,exports){
/*
 * Copyright 2015-2016 IBM Corp. All Rights Reserved.
#
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
#
 *      http://www.apache.org/licenses/LICENSE-2.0
#
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use static';

module.exports = require('../../locales/v3/zh.json');

},{"../../locales/v3/zh.json":78}],56:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const pick = require('lodash.pick');
const pairs = require('lodash.pairs');

const I18nDataV2 = require('./i18n/v2');
const I18nDataV3 = require('./i18n/v3');
const defaultVersion = 'v2';

class PersonalityTraitNames {

  constructor(options) {
    //parameters - locale and version
    this._options = Object.assign(this.defaultOptions(), pick(options, ['locale', 'version']));
    this._version = this._options.version || defaultVersion;

    if (this._version === 'v3') {
      this._i18n = new I18nDataV3(this._options.locale);
    } else {
      this._i18n = new I18nDataV2(this._options.locale);
    }
    this._data = this._i18n.data();
  }

  defaultOptions() {
    return { locale: 'en' };
  }

  name(traitId) {
    return this._data[traitId];
  }

  names() {
    return pairs(this._data).map(function(p) { return p[1]; });
  }
}

module.exports = PersonalityTraitNames;

},{"./i18n/v2":36,"./i18n/v3":49,"lodash.pairs":5,"lodash.pick":6}],57:[function(require,module,exports){
module.exports={
  "Agreeableness" : "الوئام",
  "Conscientiousness" : "الاجتهاد",
  "Extraversion" : "الانبساط",
  "Neuroticism" : "مدى العاطفية",
  "Openness" : "الانفتاح",
  "Achievement striving" : "السعي للانجاز",
  "Activity level" : "مستوى النشاط",
  "Adventurousness" : "المغامرة",
  "Altruism" : "الايثار",
  "Anger" : "متقد",
  "Anxiety" : "عرضة للقلق",
  "Artistic interests" : "الهوايات  الفنية",
  "Assertiveness" : "الاصرار",
  "Cautiousness" : "الحذر",
  "Cheerfulness" : "البهجة",
  "Cooperation" : "التعاون",
  "Depression" : "كئيب",
  "Dutifulness" : "الطاعة",
  "Emotionality" : "الانفعال",
  "Excitement-seeking" : "البحث عن الاثارة",
  "Friendliness" : "غير متحفظ",
  "Gregariousness" : "الألفة",
  "Imagination" : "الخيال",
  "Immoderation" : "الغلو",
  "Intellect" : "الذكاء",
  "Liberalism" : "تحدي-السلطة",
  "Modesty" : "التواضع",
  "Morality" : "العند",
  "Orderliness" : "النظام",
  "Self-consciousness" : "الوعي الذاتي",
  "Self-discipline" : "الانضباط الذاتي",
  "Self-efficacy" : "كفاءة الذات",
  "Sympathy" : "التعاطف",
  "Trust" : "الثقة",
  "Vulnerability" : "عرضة للتوتر",
  "Challenge" : "التحدي",
  "Closeness" : "التقارب",
  "Curiosity" : "الفضول",
  "Excitement" : "الاثارة",
  "Harmony" : "الانسجام",
  "Ideal" : "المثالية",
  "Liberty" : "الحرية",
  "Love" : "الحب",
  "Practicality" : "العملية",
  "Self-expression" : "التعبير عن الذات",
  "Stability" : "الثبات",
  "Structure" : "الانتظام",
  "Conservation" : "المحافظة",
  "Hedonism" : "التلذذ",
  "Openness to change" : "الانفتاح  على  التغيير",
  "Self-enhancement" : "تعزيز الذات",
  "Self-transcendence" : "تنزيه الذات"
}
},{}],58:[function(require,module,exports){
module.exports={
  "Agreeableness" : "Angenehme Wesenszüge",
  "Conscientiousness" : "Pflichtbewusstsein",
  "Extraversion" : "Extraversion",
  "Neuroticism" : "Emotionaler Bereich",
  "Openness" : "Offen",
  "Achievement striving" : "Nach Zielen strebend",
  "Activity level" : "Aktivitätsstufe",
  "Adventurousness" : "Abenteuerlustig",
  "Altruism" : "Altruistisch",
  "Anger" : "Hitzig",
  "Anxiety" : "macht sich leicht Sorgen",
  "Artistic interests" : "Künstlerische Interessen",
  "Assertiveness" : "Durchsetzungsvermögen",
  "Cautiousness" : "Vorsichtig",
  "Cheerfulness" : "Fröhlich",
  "Cooperation" : "Kooperativ",
  "Depression" : "Melancholisch",
  "Dutifulness" : "Pflichtbewusst",
  "Emotionality" : "Emotionalität",
  "Excitement-seeking" : "Nach Aufregungen suchend",
  "Friendliness" : "Gerne ausgehend",
  "Gregariousness" : "Gesellig",
  "Imagination" : "Phantasie",
  "Immoderation" : "Maßlos",
  "Intellect" : "Intellekt",
  "Liberalism" : "Aufmüpfig",
  "Modesty" : "Bescheiden",
  "Morality" : "Kompromisslos",
  "Orderliness" : "Ordnungsliebend",
  "Self-consciousness" : "Selbstbewusst",
  "Self-discipline" : "Selbstdiszipliniert",
  "Self-efficacy" : "Selbsteffizient",
  "Sympathy" : "Sympathisch",
  "Trust" : "Vertrauenswürdig",
  "Vulnerability" : "Anfällig für Stress",
  "Challenge" : "Herausforderung",
  "Closeness" : "Verschwiegenheit",
  "Curiosity" : "Neugier",
  "Excitement" : "Aufregung",
  "Harmony" : "Harmonie",
  "Ideal" : "Ideal",
  "Liberty" : "Freiheit",
  "Love" : "Liebe",
  "Practicality" : "Zweckmäßigkeit",
  "Self-expression" : "Selbstdarstellung",
  "Stability" : "Stabilität",
  "Structure" : "Struktur",
  "Conservation" : "Konservierung",
  "Hedonism" : "Hedonismus",
  "Openness to change" : "Offen für Veränderungen",
  "Self-enhancement" : "Selbstverbesserung",
  "Self-transcendence" : "Selbsttranszendenz"
}
},{}],59:[function(require,module,exports){
module.exports={
  "Agreeableness" : "Agreeableness",
  "Altruism" : "Altruism",
  "Cooperation" : "Cooperation",
  "Modesty" : "Modesty",
  "Morality" : "Uncompromising",
  "Sympathy" : "Sympathy",
  "Trust" : "Trust",
  "Conscientiousness" : "Conscientiousness",
  "Achievement striving" : "Achievement striving",
  "Cautiousness" : "Cautiousness",
  "Dutifulness" : "Dutifulness",
  "Orderliness" : "Orderliness",
  "Self-discipline" : "Self-discipline",
  "Self-efficacy" : "Self-efficacy",
  "Extraversion" : "Extraversion",
  "Activity level" : "Activity level",
  "Assertiveness" : "Assertiveness",
  "Cheerfulness" : "Cheerfulness",
  "Excitement-seeking" : "Excitement-seeking",
  "Friendliness" : "Outgoing",
  "Gregariousness" : "Gregariousness",
  "Neuroticism" : "Emotional range",
  "Anger" : "Fiery",
  "Anxiety" : "Prone to worry",
  "Depression" : "Melancholy",
  "Immoderation" : "Immoderation",
  "Self-consciousness" : "Self-consciousness",
  "Vulnerability" : "Susceptible to stress",
  "Openness" : "Openness",
  "Adventurousness" : "Adventurousness",
  "Artistic interests" : "Artistic interests",
  "Emotionality" : "Emotionality",
  "Imagination" : "Imagination",
  "Intellect" : "Intellect",
  "Liberalism" : "Authority-challenging",
  "Liberty" : "Liberty",
  "Ideal" : "Ideal",
  "Love" : "Love",
  "Practicality" : "Practicality",
  "Self-expression" : "Self-expression",
  "Stability" : "Stability",
  "Structure" : "Structure",
  "Challenge" : "Challenge",
  "Closeness" : "Closeness",
  "Curiosity" : "Curiosity",
  "Excitement" : "Excitement",
  "Harmony" : "Harmony",
  "Conservation" : "Conservation",
  "Hedonism" : "Hedonism",
  "Openness to change" : "Openness to change",
  "Self-enhancement" : "Self-enhancement",
  "Self-transcendence" : "Self-transcendence"
}
},{}],60:[function(require,module,exports){
module.exports={
  "Agreeableness" : "Amabilidad",
  "Conscientiousness" : "Responsabilidad",
  "Extraversion" : "Extroversión",
  "Neuroticism" : "Rango emocional",
  "Openness" : "Apertura a experiencias",
  "Achievement striving" : "Necesidad de éxito",
  "Activity level" : "Nivel de actividad",
  "Adventurousness" : "Audacia",
  "Altruism" : "Altruismo",
  "Anger" : "Vehemencia",
  "Anxiety" : "Tendencia a la preocupación",
  "Artistic interests" : "Intereses artísticos",
  "Assertiveness" : "Seguridad en uno mismo",
  "Cautiousness" : "Cautela",
  "Cheerfulness" : "Alegría",
  "Cooperation" : "Cooperación",
  "Depression" : "Melancolía",
  "Dutifulness" : "Obediencia",
  "Emotionality" : "Emocionalidad",
  "Excitement-seeking" : "Búsqueda de emociones",
  "Friendliness" : "Simpatía",
  "Gregariousness" : "Sociabilidad",
  "Imagination" : "Imaginación",
  "Immoderation" : "Desmesura",
  "Intellect" : "Intelecto",
  "Liberalism" : "Desafío a la autoridad",
  "Modesty" : "Modestia",
  "Morality" : "Intransigencia",
  "Orderliness" : "Disciplina",
  "Self-consciousness" : "Timidez",
  "Self-discipline" : "Autodisciplina",
  "Self-efficacy" : "Autoeficacia",
  "Sympathy" : "Compasión",
  "Trust" : "Confianza",
  "Vulnerability" : "Susceptibilidad a la tensión",
  "Challenge" : "Desafío",
  "Closeness" : "Familiaridad",
  "Curiosity" : "Curiosidad",
  "Excitement" : "Entusiasmo",
  "Harmony" : "Armonía",
  "Ideal" : "Ideal",
  "Liberty" : "Libertad",
  "Love" : "Amor",
  "Practicality" : "Practicidad",
  "Self-expression" : "Autoexpresión",
  "Stability" : "Estabilidad",
  "Structure" : "Estructura",
  "Conservation" : "Conservación",
  "Hedonism" : "Hedonismo",
  "Openness to change" : "Apertura al cambio",
  "Self-enhancement" : "Superación personal",
  "Self-transcendence" : "Autotranscendencia"
}
},{}],61:[function(require,module,exports){
module.exports={
  "Agreeableness" : "Amabilité",
  "Conscientiousness" : "Tempérament consciencieux",
  "Extraversion" : "Extraversion",
  "Neuroticism" : "Portée émotionnelle",
  "Openness" : "Ouverture",
  "Achievement striving" : "Persévérance",
  "Activity level" : "Niveau d'activité",
  "Adventurousness" : "Intrépidité",
  "Altruism" : "Altruisme",
  "Anger" : "Passion",
  "Anxiety" : "Prompt à s'inquiéter",
  "Artistic interests" : "Intérêt pour l'art",
  "Assertiveness" : "Assertivité",
  "Cautiousness" : "Circonspection",
  "Cheerfulness" : "Gaieté",
  "Cooperation" : "Coopération",
  "Depression" : "Mélancolie",
  "Dutifulness" : "Sens du devoir",
  "Emotionality" : "Emotionnalité",
  "Excitement-seeking" : "Recherche de sensations",
  "Friendliness" : "Extraversion",
  "Gregariousness" : "Convivialité",
  "Imagination" : "Imagination",
  "Immoderation" : "Immodération",
  "Intellect" : "Intellect",
  "Liberalism" : "Rebelle",
  "Modesty" : "Modestie",
  "Morality" : "Intransigeance",
  "Orderliness" : "Ordre",
  "Self-consciousness" : "Susceptibilité",
  "Self-discipline" : "Autodiscipline",
  "Self-efficacy" : "Efficacité personnelle",
  "Sympathy" : "Empathie",
  "Trust" : "Confiance",
  "Vulnerability" : "Sujet au stress",
  "Challenge" : "Combativité",
  "Closeness" : "Comportement clanique",
  "Curiosity" : "Curiosité",
  "Excitement" : "Enthousiasme",
  "Harmony" : "Harmonie",
  "Ideal" : "Idéal",
  "Liberty" : "Liberté",
  "Love" : "Amour",
  "Practicality" : "Pragmatisme",
  "Self-expression" : "Extériorisation",
  "Stability" : "Stabilité",
  "Structure" : "Structure",
  "Conservation" : "Conservatisme",
  "Hedonism" : "Hédonisme",
  "Openness to change" : "Ouverture au changement",
  "Self-enhancement" : "Ambition personnelle",
  "Self-transcendence" : "Dépassement de soi"
}
},{}],62:[function(require,module,exports){
module.exports={
  "Agreeableness" : "Disponibilità",
  "Conscientiousness" : "Scrupolosità",
  "Extraversion" : "Estroversione",
  "Neuroticism" : "Gamma emotiva",
  "Openness" : "Apertura",
  "Achievement striving" : "Propensione al raggiungimento dello scopo",
  "Activity level" : "Livello di attività",
  "Adventurousness" : "Spirito d'avventura",
  "Altruism" : "Altruismo",
  "Anger" : "Irascibile",
  "Anxiety" : "Incline alla preoccupazione",
  "Artistic interests" : "Interessi artistici",
  "Assertiveness" : "Assertività",
  "Cautiousness" : "Prudenza",
  "Cheerfulness" : "Positività",
  "Cooperation" : "Cooperazione",
  "Depression" : "Malinconico",
  "Dutifulness" : "Responsabilità",
  "Emotionality" : "Emotività",
  "Excitement-seeking" : "Desiderio di stimoli",
  "Friendliness" : "Cordialità",
  "Gregariousness" : "Socialità",
  "Imagination" : "Immaginazione",
  "Immoderation" : "Smodato",
  "Intellect" : "Curiosità intellettuale",
  "Liberalism" : "Anticonvenzionale",
  "Modesty" : "Modestia",
  "Morality" : "Irremovibilità",
  "Orderliness" : "Accuratezza",
  "Self-consciousness" : "Autocosciente",
  "Self-discipline" : "Autodisciplina",
  "Self-efficacy" : "Sicurezza di sé",
  "Sympathy" : "Compartecipazione",
  "Trust" : "Fiducia",
  "Vulnerability" : "Suscettibile allo stress",
  "Challenge" : "Stimolo",
  "Closeness" : "Vicinanza",
  "Curiosity" : "Curiosità",
  "Excitement" : "Eccitazione",
  "Harmony" : "Armonia",
  "Ideal" : "Ideale",
  "Liberty" : "Libertà",
  "Love" : "Amore",
  "Practicality" : "Pragmatismo",
  "Self-expression" : "Espressione della personalità",
  "Stability" : "Stabilità",
  "Structure" : "Struttura",
  "Conservation" : "Tradizionalismo",
  "Hedonism" : "Edonismo",
  "Openness to change" : "Apertura al cambiamento",
  "Self-enhancement" : "Successo personale",
  "Self-transcendence" : "Impegno sociale"
}
},{}],63:[function(require,module,exports){
module.exports={
  "Agreeableness" : "協調性",
  "Conscientiousness" : "誠実性",
  "Extraversion" : "外向性",
  "Neuroticism" : "感情起伏",
  "Openness" : "知的好奇心",
  "Achievement striving" : "達成努力",
  "Activity level" : "活発度",
  "Adventurousness" : "大胆性",
  "Altruism" : "利他主義",
  "Anger" : "激情的",
  "Anxiety" : "心配性",
  "Artistic interests" : "芸術的関心度",
  "Assertiveness" : "自己主張",
  "Cautiousness" : "注意深さ",
  "Cheerfulness" : "明朗性",
  "Cooperation" : "協同性",
  "Depression" : "悲観的",
  "Dutifulness" : "忠実さ",
  "Emotionality" : "情動性",
  "Excitement-seeking" : "刺激希求性",
  "Friendliness" : "友好性",
  "Gregariousness" : "社交性",
  "Imagination" : "想像力",
  "Immoderation" : "利己的",
  "Intellect" : "思考力",
  "Liberalism" : "現状打破",
  "Modesty" : "謙虚さ",
  "Morality" : "強硬さ",
  "Orderliness" : "秩序性",
  "Self-consciousness" : "自意識過剰",
  "Self-discipline" : "自制力",
  "Self-efficacy" : "自己効力感",
  "Sympathy" : "共感度",
  "Trust" : "信用度",
  "Vulnerability" : "低ストレス耐性",
  "Challenge" : "挑戦",
  "Closeness" : "親密",
  "Curiosity" : "好奇心",
  "Excitement" : "興奮",
  "Harmony" : "調和",
  "Ideal" : "理想",
  "Liberty" : "自由主義",
  "Love" : "社会性",
  "Practicality" : "実用主義",
  "Self-expression" : "自己表現",
  "Stability" : "安定性",
  "Structure" : "仕組",
  "Conservation" : "現状維持",
  "Hedonism" : "快楽主義",
  "Openness to change" : "変化許容性",
  "Self-enhancement" : "自己増進",
  "Self-transcendence" : "自己超越"
}

},{}],64:[function(require,module,exports){
module.exports={
  "Agreeableness": "친화성",
  "Conscientiousness": "성실성",
  "Extraversion": "외향성",
  "Neuroticism": "감정의 기복",
  "Openness": "개방성",
  "Achievement striving": "성취 추구",
  "Activity level": "활동 레벨",
  "Adventurousness": "모험성",
  "Altruism": "이타성",
  "Anger": "급한",
  "Anxiety": "걱정이 많은",
  "Artistic interests": "예술적 흥미",
  "Assertiveness": "자신만만함",
  "Cautiousness": "신중함",
  "Cheerfulness": "쾌활",
  "Cooperation": "협동성",
  "Depression": "우울한",
  "Dutifulness": "순종성",
  "Emotionality": "정서성",
  "Excitement-seeking": "자극 탐색",
  "Friendliness": "외향적",
  "Gregariousness": "사교적",
  "Imagination": "상상력",
  "Immoderation": "극단적인",
  "Intellect": "지력",
  "Liberalism": "권력에 저항",
  "Modesty": "겸손함",
  "Morality": "비타협성",
  "Orderliness": "질서 정연함",
  "Self-consciousness": "자의식이 강한",
  "Self-discipline": "자기 훈련",
  "Self-efficacy": "자기 효능감",
  "Sympathy": "동정",
  "Trust": "신뢰",
  "Vulnerability": "스트레스에 민감한",
  "Challenge": "도전",
  "Closeness": "친밀감",
  "Curiosity": "호기심",
  "Excitement": "흥미",
  "Harmony": "조화",
  "Ideal": "이상",
  "Liberty": "자유",
  "Love": "사랑",
  "Practicality": "실용성",
  "Self-expression": "자기 표현",
  "Stability": "안정",
  "Structure": "구조",
  "Conservation": "보수성",
  "Hedonism": "쾌락주의",
  "Openness to change": "변화에 대한 개방성",
  "Self-enhancement": "자기고양",
  "Self-transcendence": "자기초월"
}
},{}],65:[function(require,module,exports){
module.exports={
  "Agreeableness" : "Amabilidade",
  "Conscientiousness" : "Escrupulosidade",
  "Extraversion" : "Extroversão",
  "Neuroticism" : "Faixa emocional",
  "Openness" : "Abertura",
  "Achievement striving" : "Esforço para realização",
  "Activity level" : "Nível de atividade",
  "Adventurousness" : "Desejo de aventura",
  "Altruism" : "Altruísmo",
  "Anger" : "Furioso",
  "Anxiety" : "Propenso a se preocupar",
  "Artistic interests" : "Interesses artísticos",
  "Assertiveness" : "Assertividade",
  "Cautiousness" : "Cautela",
  "Cheerfulness" : "Bom Humor",
  "Cooperation" : "Cooperação",
  "Depression" : "Melancolia",
  "Dutifulness" : "Respeito",
  "Emotionality" : "Emotividade",
  "Excitement-seeking" : "Busca de Empolgação",
  "Friendliness" : "Extrovertido",
  "Gregariousness" : "Gregarismo",
  "Imagination" : "Imaginação",
  "Immoderation" : "Imoderação",
  "Intellect" : "Intelecto",
  "Liberalism" : "Desafio à autoridade",
  "Modesty" : "Modéstia",
  "Morality" : "Determinação",
  "Orderliness" : "Regularidade",
  "Self-consciousness" : "Autoconsciência",
  "Self-discipline" : "Autodisciplina",
  "Self-efficacy" : "Autoeficiência",
  "Sympathy" : "Simpatia",
  "Trust" : "Confiança",
  "Vulnerability" : "Suscetível ao stress",
  "Challenge" : "Desafio",
  "Closeness" : "Retraimento",
  "Curiosity" : "Curiosidade",
  "Excitement" : "Empolgação",
  "Harmony" : "Harmonia",
  "Ideal" : "Ideal",
  "Liberty" : "Liberdade",
  "Love" : "Amor",
  "Practicality" : "Natureza prática",
  "Self-expression" : "Expressão da própria personalidade",
  "Stability" : "Estabilidade",
  "Structure" : "Estrutura",
  "Conservation" : "Conservação",
  "Hedonism" : "Hedonismo",
  "Openness to change" : "Abertura à mudança",
  "Self-enhancement" : "Autocrescimento",
  "Self-transcendence" : "Autotranscendência"
}
},{}],66:[function(require,module,exports){
module.exports={
  "Agreeableness" : "親和性",
  "Conscientiousness" : "盡責性",
  "Extraversion" : "外向性",
  "Neuroticism" : "情緒範圍",
  "Openness" : "開放性",
  "Achievement striving" : "成就驅力",
  "Activity level" : "活動水準",
  "Adventurousness" : "冒險",
  "Altruism" : "利他",
  "Anger" : "暴躁",
  "Anxiety" : "容易煩惱",
  "Artistic interests" : "審美",
  "Assertiveness" : "獨斷",
  "Cautiousness" : "謹慎",
  "Cheerfulness" : "快樂",
  "Cooperation" : "合作",
  "Depression" : "憂鬱",
  "Dutifulness" : "守分",
  "Emotionality" : "情緒豐富",
  "Excitement-seeking" : "追求刺激",
  "Friendliness" : "外向",
  "Gregariousness" : "合群",
  "Imagination" : "想像",
  "Immoderation" : "不知節制",
  "Intellect" : "智能",
  "Liberalism" : "挑戰權威",
  "Modesty" : "謙遜",
  "Morality" : "不妥協",
  "Orderliness" : "規律",
  "Self-consciousness" : "自我意識",
  "Self-discipline" : "自律",
  "Self-efficacy" : "自我效能",
  "Sympathy" : "同情心",
  "Trust" : "信任",
  "Vulnerability" : "抗壓性低",
  "Challenge" : "挑戰",
  "Closeness" : "封閉",
  "Curiosity" : "好奇心",
  "Excitement" : "興奮",
  "Harmony" : "和諧",
  "Ideal" : "理想",
  "Liberty" : "自由",
  "Love" : "愛",
  "Practicality" : "務實",
  "Self-expression" : "自我表達",
  "Stability" : "穩定性",
  "Structure" : "結構",
  "Conservation" : "保守",
  "Hedonism" : "享樂主義",
  "Openness to change" : "接受改變的開放態度",
  "Self-enhancement" : "自我提升",
  "Self-transcendence" : "自我超越"
}
},{}],67:[function(require,module,exports){
module.exports={
  "Agreeableness" : "宜人性",
  "Conscientiousness" : "尽责性",
  "Extraversion" : "外向性",
  "Neuroticism" : "情感范围",
  "Openness" : "开放性",
  "Achievement striving" : "追求成就",
  "Activity level" : "活力程度",
  "Adventurousness" : "冒险",
  "Altruism" : "利他",
  "Anger" : "暴躁",
  "Anxiety" : "易焦虑",
  "Artistic interests" : "审美",
  "Assertiveness" : "独断性",
  "Cautiousness" : "审慎",
  "Cheerfulness" : "热情",
  "Cooperation" : "合作",
  "Depression" : "忧郁",
  "Dutifulness" : "责任感",
  "Emotionality" : "情感丰富",
  "Excitement-seeking" : "寻求刺激",
  "Friendliness" : "开朗",
  "Gregariousness" : "合群性",
  "Imagination" : "想象力",
  "Immoderation" : "无节制",
  "Intellect" : "智力",
  "Liberalism" : "挑战权威",
  "Modesty" : "谦逊",
  "Morality" : "坚定",
  "Orderliness" : "条理性",
  "Self-consciousness" : "自我意识",
  "Self-discipline" : "自律",
  "Self-efficacy" : "自我效能",
  "Sympathy" : "同情心",
  "Trust" : "信任",
  "Vulnerability" : "易受压力",
  "Challenge" : "挑战",
  "Closeness" : "亲密",
  "Curiosity" : "好奇心",
  "Excitement" : "刺激",
  "Harmony" : "和谐",
  "Ideal" : "理想",
  "Liberty" : "自由",
  "Love" : "爱",
  "Practicality" : "实用",
  "Self-expression" : "自我表现",
  "Stability" : "稳定性",
  "Structure" : "结构",
  "Conservation" : "保守",
  "Hedonism" : "享乐主义",
  "Openness to change" : "对改变持开放态度",
  "Self-enhancement" : "自我提高",
  "Self-transcendence" : "自我超越"
}
},{}],68:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "الوئام",
  "big5_conscientiousness": "الاجتهاد",
  "big5_extraversion": "الانبساط",
  "big5_neuroticism": "مدى العاطفية",
  "big5_openness": "الانفتاح",
  "facet_achievement_striving": "السعي للانجاز",
  "facet_activity_level": "مستوى النشاط",
  "facet_adventurousness": "المغامرة",
  "facet_altruism": "الايثار",
  "facet_anger": "متقد",
  "facet_anxiety": "عرضة للقلق",
  "facet_artistic_interests": "الهوايات  الفنية",
  "facet_assertiveness": "الاصرار",
  "facet_cautiousness": "الحذر",
  "facet_cheerfulness": "البهجة",
  "facet_cooperation": "التعاون",
  "facet_depression": "كئيب",
  "facet_dutifulness": "الطاعة",
  "facet_emotionality": "الانفعال",
  "facet_excitement_seeking": "البحث عن الاثارة",
  "facet_friendliness": "غير متحفظ",
  "facet_gregariousness": "الألفة",
  "facet_imagination": "الخيال",
  "facet_immoderation": "الغلو",
  "facet_intellect": "الذكاء",
  "facet_liberalism": "تحدي-السلطة",
  "facet_modesty": "التواضع",
  "facet_morality": "العند",
  "facet_orderliness": "النظام",
  "facet_self_consciousness": "الوعي الذاتي",
  "facet_self_discipline": "الانضباط الذاتي",
  "facet_self_efficacy": "كفاءة الذات",
  "facet_sympathy": "التعاطف",
  "facet_trust": "الثقة",
  "facet_vulnerability": "عرضة للتوتر",
  "need_challenge": "التحدي",
  "need_closeness": "التقارب",
  "need_curiosity": "الفضول",
  "need_excitement": "الاثارة",
  "need_harmony": "الانسجام",
  "need_ideal": "المثالية",
  "need_liberty": "الحرية",
  "need_love": "الحب",
  "need_practicality": "العملية",
  "need_self_expression": "التعبير عن الذات",
  "need_stability": "الثبات",
  "need_structure": "الانتظام",
  "value_conservation": "المحافظة",
  "value_hedonism": "التلذذ",
  "value_openness_to_change": "الانفتاح  على  التغيير",
  "value_self_enhancement": "تعزيز الذات",
  "value_self_transcendence": "تنزيه الذات"
}

},{}],69:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "Angenehme Wesenszüge",
  "big5_conscientiousness": "Pflichtbewusstsein",
  "big5_extraversion": "Extraversion",
  "big5_neuroticism": "Emotionaler Bereich",
  "big5_openness": "Offen",
  "facet_achievement_striving": "Nach Zielen strebend",
  "facet_activity_level": "Aktivitätsstufe",
  "facet_adventurousness": "Abenteuerlustig",
  "facet_altruism": "Altruistisch",
  "facet_anger": "Hitzig",
  "facet_anxiety": "macht sich leicht Sorgen",
  "facet_artistic_interests": "Künstlerische Interessen",
  "facet_assertiveness": "Durchsetzungsvermögen",
  "facet_cautiousness": "Vorsichtig",
  "facet_cheerfulness": "Fröhlich",
  "facet_cooperation": "Kooperativ",
  "facet_depression": "Melancholisch",
  "facet_dutifulness": "Pflichtbewusst",
  "facet_emotionality": "Emotionalität",
  "facet_excitement_seeking": "Nach Aufregungen suchend",
  "facet_friendliness": "Gerne ausgehend",
  "facet_gregariousness": "Gesellig",
  "facet_imagination": "Phantasie",
  "facet_immoderation": "Maßlos",
  "facet_intellect": "Intellekt",
  "facet_liberalism": "Aufmüpfig",
  "facet_modesty": "Bescheiden",
  "facet_morality": "Kompromisslos",
  "facet_orderliness": "Ordnungsliebend",
  "facet_self_consciousness": "Selbstbewusst",
  "facet_self_discipline": "Selbstdiszipliniert",
  "facet_self_efficacy": "Selbsteffizient",
  "facet_sympathy": "Sympathisch",
  "facet_trust": "Vertrauenswürdig",
  "facet_vulnerability": "Anfällig für Stress",
  "need_challenge": "Herausforderung",
  "need_closeness": "Verschwiegenheit",
  "need_curiosity": "Neugier",
  "need_excitement": "Aufregung",
  "need_harmony": "Harmonie",
  "need_ideal": "Ideal",
  "need_liberty": "Freiheit",
  "need_love": "Liebe",
  "need_practicality": "Zweckmäßigkeit",
  "need_self_expression": "Selbstdarstellung",
  "need_stability": "Stabilität",
  "need_structure": "Struktur",
  "value_conservation": "Konservierung",
  "value_hedonism": "Hedonismus",
  "value_openness_to_change": "Offen für Veränderungen",
  "value_self_enhancement": "Selbstverbesserung",
  "value_self_transcendence": "Selbsttranszendenz"
}

},{}],70:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "Agreeableness",
  "facet_altruism": "Altruism",
  "facet_cooperation": "Cooperation",
  "facet_modesty": "Modesty",
  "facet_morality": "Uncompromising",
  "facet_sympathy": "Sympathy",
  "facet_trust": "Trust",
  "big5_conscientiousness": "Conscientiousness",
  "facet_achievement_striving": "Achievement striving",
  "facet_cautiousness": "Cautiousness",
  "facet_dutifulness": "Dutifulness",
  "facet_orderliness": "Orderliness",
  "facet_self_discipline": "Self-discipline",
  "facet_self_efficacy": "Self-efficacy",
  "big5_extraversion": "Extraversion",
  "facet_activity_level": "Activity level",
  "facet_assertiveness": "Assertiveness",
  "facet_cheerfulness": "Cheerfulness",
  "facet_excitement_seeking": "Excitement-seeking",
  "facet_friendliness": "Outgoing",
  "facet_gregariousness": "Gregariousness",
  "big5_neuroticism": "Emotional range",
  "facet_anger": "Fiery",
  "facet_anxiety": "Prone to worry",
  "facet_depression": "Melancholy",
  "facet_immoderation": "Immoderation",
  "facet_self_consciousness": "Self-consciousness",
  "facet_vulnerability": "Susceptible to stress",
  "big5_openness": "Openness",
  "facet_adventurousness": "Adventurousness",
  "facet_artistic_interests": "Artistic interests",
  "facet_emotionality": "Emotionality",
  "facet_imagination": "Imagination",
  "facet_intellect": "Intellect",
  "facet_liberalism": "Authority-challenging",
  "need_liberty": "Liberty",
  "need_ideal": "Ideal",
  "need_love": "Love",
  "need_practicality": "Practicality",
  "need_self_expression": "Self-expression",
  "need_stability": "Stability",
  "need_structure": "Structure",
  "need_challenge": "Challenge",
  "need_closeness": "Closeness",
  "need_curiosity": "Curiosity",
  "need_excitement": "Excitement",
  "need_harmony": "Harmony",
  "value_conservation": "Conservation",
  "value_hedonism": "Hedonism",
  "value_openness_to_change": "Openness to change",
  "value_self_enhancement": "Self-enhancement",
  "value_self_transcendence": "Self-transcendence"
}

},{}],71:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "Amabilidad",
  "big5_conscientiousness": "Responsabilidad",
  "big5_extraversion": "Extroversión",
  "big5_neuroticism": "Rango emocional",
  "big5_openness": "Apertura a experiencias",
  "facet_achievement_striving": "Necesidad de éxito",
  "facet_activity_level": "Nivel de actividad",
  "facet_adventurousness": "Audacia",
  "facet_altruism": "Altruismo",
  "facet_anger": "Vehemencia",
  "facet_anxiety": "Tendencia a la preocupación",
  "facet_artistic_interests": "Intereses artísticos",
  "facet_assertiveness": "Seguridad en uno mismo",
  "facet_cautiousness": "Cautela",
  "facet_cheerfulness": "Alegría",
  "facet_cooperation": "Cooperación",
  "facet_depression": "Melancolía",
  "facet_dutifulness": "Obediencia",
  "facet_emotionality": "Emocionalidad",
  "facet_excitement_seeking": "Búsqueda de emociones",
  "facet_friendliness": "Simpatía",
  "facet_gregariousness": "Sociabilidad",
  "facet_imagination": "Imaginación",
  "facet_immoderation": "Desmesura",
  "facet_intellect": "Intelecto",
  "facet_liberalism": "Desafío a la autoridad",
  "facet_modesty": "Modestia",
  "facet_morality": "Intransigencia",
  "facet_orderliness": "Disciplina",
  "facet_self_consciousness": "Timidez",
  "facet_self_discipline": "Autodisciplina",
  "facet_self_efficacy": "Autoeficacia",
  "facet_sympathy": "Compasión",
  "facet_trust": "Confianza",
  "facet_vulnerability": "Susceptibilidad a la tensión",
  "need_challenge": "Desafío",
  "need_closeness": "Familiaridad",
  "need_curiosity": "Curiosidad",
  "need_excitement": "Entusiasmo",
  "need_harmony": "Armonía",
  "need_ideal": "Ideal",
  "need_liberty": "Libertad",
  "need_love": "Amor",
  "need_practicality": "Practicidad",
  "need_self_expression": "Autoexpresión",
  "need_stability": "Estabilidad",
  "need_structure": "Estructura",
  "value_conservation": "Conservación",
  "value_hedonism": "Hedonismo",
  "value_openness_to_change": "Apertura al cambio",
  "value_self_enhancement": "Superación personal",
  "value_self_transcendence": "Autotranscendencia"
}

},{}],72:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "Amabilité",
  "big5_conscientiousness": "Tempérament consciencieux",
  "big5_extraversion": "Extraversion",
  "big5_neuroticism": "Portée émotionnelle",
  "big5_openness": "Ouverture",
  "facet_achievement_striving": "Persévérance",
  "facet_activity_level": "Niveau d'activité",
  "facet_adventurousness": "Intrépidité",
  "facet_altruism": "Altruisme",
  "facet_anger": "Passion",
  "facet_anxiety": "Prompt à s'inquiéter",
  "facet_artistic_interests": "Intérêt pour l'art",
  "facet_assertiveness": "Assertivité",
  "facet_cautiousness": "Circonspection",
  "facet_cheerfulness": "Gaieté",
  "facet_cooperation": "Coopération",
  "facet_depression": "Mélancolie",
  "facet_dutifulness": "Sens du devoir",
  "facet_emotionality": "Emotionnalité",
  "facet_excitement_seeking": "Recherche de sensations",
  "facet_friendliness": "Extraversion",
  "facet_gregariousness": "Convivialité",
  "facet_imagination": "Imagination",
  "facet_immoderation": "Immodération",
  "facet_intellect": "Intellect",
  "facet_liberalism": "Rebelle",
  "facet_modesty": "Modestie",
  "facet_morality": "Intransigeance",
  "facet_orderliness": "Ordre",
  "facet_self_consciousness": "Susceptibilité",
  "facet_self_discipline": "Autodiscipline",
  "facet_self_efficacy": "Efficacité personnelle",
  "facet_sympathy": "Empathie",
  "facet_trust": "Confiance",
  "facet_vulnerability": "Sujet au stress",
  "need_challenge": "Combativité",
  "need_closeness": "Comportement clanique",
  "need_curiosity": "Curiosité",
  "need_excitement": "Enthousiasme",
  "need_harmony": "Harmonie",
  "need_ideal": "Idéal",
  "need_liberty": "Liberté",
  "need_love": "Amour",
  "need_practicality": "Pragmatisme",
  "need_self_expression": "Extériorisation",
  "need_stability": "Stabilité",
  "need_structure": "Structure",
  "value_conservation": "Conservatisme",
  "value_hedonism": "Hédonisme",
  "value_openness_to_change": "Ouverture au changement",
  "value_self_enhancement": "Ambition personnelle",
  "value_self_transcendence": "Dépassement de soi"
}

},{}],73:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "Disponibilità",
  "big5_conscientiousness": "Scrupolosità",
  "big5_extraversion": "Estroversione",
  "big5_neuroticism": "Gamma emotiva",
  "big5_openness": "Apertura",
  "facet_achievement_striving": "Propensione al raggiungimento dello scopo",
  "facet_activity_level": "Livello di attività",
  "facet_adventurousness": "Spirito d'avventura",
  "facet_altruism": "Altruismo",
  "facet_anger": "Irascibile",
  "facet_anxiety": "Incline alla preoccupazione",
  "facet_artistic_interests": "Interessi artistici",
  "facet_assertiveness": "Assertività",
  "facet_cautiousness": "Prudenza",
  "facet_cheerfulness": "Positività",
  "facet_cooperation": "Cooperazione",
  "facet_depression": "Malinconico",
  "facet_dutifulness": "Responsabilità",
  "facet_emotionality": "Emotività",
  "facet_excitement_seeking": "Desiderio di stimoli",
  "facet_friendliness": "Cordialità",
  "facet_gregariousness": "Socialità",
  "facet_imagination": "Immaginazione",
  "facet_immoderation": "Smodato",
  "facet_intellect": "Curiosità intellettuale",
  "facet_liberalism": "Anticonvenzionale",
  "facet_modesty": "Modestia",
  "facet_morality": "Irremovibilità",
  "facet_orderliness": "Accuratezza",
  "facet_self_consciousness": "Autocosciente",
  "facet_self_discipline": "Autodisciplina",
  "facet_self_efficacy": "Sicurezza di sé",
  "facet_sympathy": "Compartecipazione",
  "facet_trust": "Fiducia",
  "facet_vulnerability": "Suscettibile allo stress",
  "need_challenge": "Stimolo",
  "need_closeness": "Vicinanza",
  "need_curiosity": "Curiosità",
  "need_excitement": "Eccitazione",
  "need_harmony": "Armonia",
  "need_ideal": "Ideale",
  "need_liberty": "Libertà",
  "need_love": "Amore",
  "need_practicality": "Pragmatismo",
  "need_self_expression": "Espressione della personalità",
  "need_stability": "Stabilità",
  "need_structure": "Struttura",
  "value_conservation": "Tradizionalismo",
  "value_hedonism": "Edonismo",
  "value_openness_to_change": "Apertura al cambiamento",
  "value_self_enhancement": "Successo personale",
  "value_self_transcendence": "Impegno sociale"
}

},{}],74:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "協調性",
  "big5_conscientiousness": "誠実性",
  "big5_extraversion": "外向性",
  "big5_neuroticism": "感情起伏",
  "big5_openness": "知的好奇心",
  "facet_achievement_striving": "達成努力",
  "facet_activity_level": "活発度",
  "facet_adventurousness": "大胆性",
  "facet_altruism": "利他主義",
  "facet_anger": "激情的",
  "facet_anxiety": "心配性",
  "facet_artistic_interests": "芸術的関心度",
  "facet_assertiveness": "自己主張",
  "facet_cautiousness": "注意深さ",
  "facet_cheerfulness": "明朗性",
  "facet_cooperation": "協同性",
  "facet_depression": "悲観的",
  "facet_dutifulness": "忠実さ",
  "facet_emotionality": "情動性",
  "facet_excitement_seeking": "刺激希求性",
  "facet_friendliness": "友好性",
  "facet_gregariousness": "社交性",
  "facet_imagination": "想像力",
  "facet_immoderation": "利己的",
  "facet_intellect": "思考力",
  "facet_liberalism": "現状打破",
  "facet_modesty": "謙虚さ",
  "facet_morality": "強硬さ",
  "facet_orderliness": "秩序性",
  "facet_self_consciousness": "自意識過剰",
  "facet_self_discipline": "自制力",
  "facet_self_efficacy": "自己効力感",
  "facet_sympathy": "共感度",
  "facet_trust": "信用度",
  "facet_vulnerability": "低ストレス耐性",
  "need_challenge": "挑戦",
  "need_closeness": "親密",
  "need_curiosity": "好奇心",
  "need_excitement": "興奮",
  "need_harmony": "調和",
  "need_ideal": "理想",
  "need_liberty": "自由主義",
  "need_love": "社会性",
  "need_practicality": "実用主義",
  "need_self_expression": "自己表現",
  "need_stability": "安定性",
  "need_structure": "仕組",
  "value_conservation": "現状維持",
  "value_hedonism": "快楽主義",
  "value_openness_to_change": "変化許容性",
  "value_self_enhancement": "自己増進",
  "value_self_transcendence": "自己超越"
}

},{}],75:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "친화성",
  "big5_conscientiousness": "성실성",
  "big5_extraversion": "외향성",
  "big5_neuroticism": "감정의 기복",
  "big5_openness": "개방성",
  "facet_achievement_striving": "성취 추구",
  "facet_activity_level": "활동 레벨",
  "facet_adventurousness": "모험성",
  "facet_altruism": "이타성",
  "facet_anger": "급한",
  "facet_anxiety": "걱정이 많은",
  "facet_artistic_interests": "예술적 흥미",
  "facet_assertiveness": "자신만만함",
  "facet_cautiousness": "신중함",
  "facet_cheerfulness": "쾌활",
  "facet_cooperation": "협동성",
  "facet_depression": "우울한",
  "facet_dutifulness": "순종성",
  "facet_emotionality": "정서성",
  "facet_excitement_seeking": "자극 탐색",
  "facet_friendliness": "외향적",
  "facet_gregariousness": "사교적",
  "facet_imagination": "상상력",
  "facet_immoderation": "극단적인",
  "facet_intellect": "지력",
  "facet_liberalism": "권력에 저항",
  "facet_modesty": "겸손함",
  "facet_morality": "비타협성",
  "facet_orderliness": "질서 정연함",
  "facet_self_consciousness": "자의식이 강한",
  "facet_self_discipline": "자기 훈련",
  "facet_self_efficacy": "자기 효능감",
  "facet_sympathy": "동정",
  "facet_trust": "신뢰",
  "facet_vulnerability": "스트레스에 민감한",
  "need_challenge": "도전",
  "need_closeness": "친밀감",
  "need_curiosity": "호기심",
  "need_excitement": "흥미",
  "need_harmony": "조화",
  "need_ideal": "이상",
  "need_liberty": "자유",
  "need_love": "사랑",
  "need_practicality": "실용성",
  "need_self_expression": "자기 표현",
  "need_stability": "안정",
  "need_structure": "구조",
  "value_conservation": "보수성",
  "value_hedonism": "쾌락주의",
  "value_openness_to_change": "변화에 대한 개방성",
  "value_self_enhancement": "자기고양",
  "value_self_transcendence": "자기초월"
}

},{}],76:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "Amabilidade",
  "big5_conscientiousness": "Escrupulosidade",
  "big5_extraversion": "Extroversão",
  "big5_neuroticism": "Faixa emocional",
  "big5_openness": "Abertura",
  "facet_achievement_striving": "Esforço para realização",
  "facet_activity_level": "Nível de atividade",
  "facet_adventurousness": "Desejo de aventura",
  "facet_altruism": "Altruísmo",
  "facet_anger": "Furioso",
  "facet_anxiety": "Propenso a se preocupar",
  "facet_artistic_interests": "Interesses artísticos",
  "facet_assertiveness": "Assertividade",
  "facet_cautiousness": "Cautela",
  "facet_cheerfulness": "Bom Humor",
  "facet_cooperation": "Cooperação",
  "facet_depression": "Melancolia",
  "facet_dutifulness": "Respeito",
  "facet_emotionality": "Emotividade",
  "facet_excitement_seeking": "Busca de Empolgação",
  "facet_friendliness": "Extrovertido",
  "facet_gregariousness": "Gregarismo",
  "facet_imagination": "Imaginação",
  "facet_immoderation": "Imoderação",
  "facet_intellect": "Intelecto",
  "facet_liberalism": "Desafio à autoridade",
  "facet_modesty": "Modéstia",
  "facet_morality": "Determinação",
  "facet_orderliness": "Regularidade",
  "facet_self_consciousness": "Autoconsciência",
  "facet_self_discipline": "Autodisciplina",
  "facet_self_efficacy": "Autoeficiência",
  "facet_sympathy": "Simpatia",
  "facet_trust": "Confiança",
  "facet_vulnerability": "Suscetível ao stress",
  "need_challenge": "Desafio",
  "need_closeness": "Retraimento",
  "need_curiosity": "Curiosidade",
  "need_excitement": "Empolgação",
  "need_harmony": "Harmonia",
  "need_ideal": "Ideal",
  "need_liberty": "Liberdade",
  "need_love": "Amor",
  "need_practicality": "Natureza prática",
  "need_self_expression": "Expressão da própria personalidade",
  "need_stability": "Estabilidade",
  "need_structure": "Estrutura",
  "value_conservation": "Conservação",
  "value_hedonism": "Hedonismo",
  "value_openness_to_change": "Abertura à mudança",
  "value_self_enhancement": "Autocrescimento",
  "value_self_transcendence": "Autotranscendência"
}

},{}],77:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "親和性",
  "big5_conscientiousness": "盡責性",
  "big5_extraversion": "外向性",
  "big5_neuroticism": "情緒範圍",
  "big5_openness": "開放性",
  "facet_achievement_striving": "成就驅力",
  "facet_activity_level": "活動水準",
  "facet_adventurousness": "冒險",
  "facet_altruism": "利他",
  "facet_anger": "暴躁",
  "facet_anxiety": "容易煩惱",
  "facet_artistic_interests": "審美",
  "facet_assertiveness": "獨斷",
  "facet_cautiousness": "謹慎",
  "facet_cheerfulness": "快樂",
  "facet_cooperation": "合作",
  "facet_depression": "憂鬱",
  "facet_dutifulness": "守分",
  "facet_emotionality": "情緒豐富",
  "facet_excitement_seeking": "追求刺激",
  "facet_friendliness": "外向",
  "facet_gregariousness": "合群",
  "facet_imagination": "想像",
  "facet_immoderation": "不知節制",
  "facet_intellect": "智能",
  "facet_liberalism": "挑戰權威",
  "facet_modesty": "謙遜",
  "facet_morality": "不妥協",
  "facet_orderliness": "規律",
  "facet_self_consciousness": "自我意識",
  "facet_self_discipline": "自律",
  "facet_self_efficacy": "自我效能",
  "facet_sympathy": "同情心",
  "facet_trust": "信任",
  "facet_vulnerability": "抗壓性低",
  "need_challenge": "挑戰",
  "need_closeness": "封閉",
  "need_curiosity": "好奇心",
  "need_excitement": "興奮",
  "need_harmony": "和諧",
  "need_ideal": "理想",
  "need_liberty": "自由",
  "need_love": "愛",
  "need_practicality": "務實",
  "need_self_expression": "自我表達",
  "need_stability": "穩定性",
  "need_structure": "結構",
  "value_conservation": "保守",
  "value_hedonism": "享樂主義",
  "value_openness_to_change": "接受改變的開放態度",
  "value_self_enhancement": "自我提升",
  "value_self_transcendence": "自我超越"
}

},{}],78:[function(require,module,exports){
module.exports={
  "big5_agreeableness": "宜人性",
  "big5_conscientiousness": "尽责性",
  "big5_extraversion": "外向性",
  "big5_neuroticism": "情感范围",
  "big5_openness": "开放性",
  "facet_achievement_striving": "追求成就",
  "facet_activity_level": "活力程度",
  "facet_adventurousness": "冒险",
  "facet_altruism": "利他",
  "facet_anger": "暴躁",
  "facet_anxiety": "易焦虑",
  "facet_artistic_interests": "审美",
  "facet_assertiveness": "独断性",
  "facet_cautiousness": "审慎",
  "facet_cheerfulness": "热情",
  "facet_cooperation": "合作",
  "facet_depression": "忧郁",
  "facet_dutifulness": "责任感",
  "facet_emotionality": "情感丰富",
  "facet_excitement_seeking": "寻求刺激",
  "facet_friendliness": "开朗",
  "facet_gregariousness": "合群性",
  "facet_imagination": "想象力",
  "facet_immoderation": "无节制",
  "facet_intellect": "智力",
  "facet_liberalism": "挑战权威",
  "facet_modesty": "谦逊",
  "facet_morality": "坚定",
  "facet_orderliness": "条理性",
  "facet_self_consciousness": "自我意识",
  "facet_self_discipline": "自律",
  "facet_self_efficacy": "自我效能",
  "facet_sympathy": "同情心",
  "facet_trust": "信任",
  "facet_vulnerability": "易受压力",
  "need_challenge": "挑战",
  "need_closeness": "亲密",
  "need_curiosity": "好奇心",
  "need_excitement": "刺激",
  "need_harmony": "和谐",
  "need_ideal": "理想",
  "need_liberty": "自由",
  "need_love": "爱",
  "need_practicality": "实用",
  "need_self_expression": "自我表现",
  "need_stability": "稳定性",
  "need_structure": "结构",
  "value_conservation": "保守",
  "value_hedonism": "享乐主义",
  "value_openness_to_change": "对改变持开放态度",
  "value_self_enhancement": "自我提高",
  "value_self_transcendence": "自我超越"
}

},{}],79:[function(require,module,exports){
module.exports = function(md, options) {
  options = options || {};
  options.stripListLeaders = options.hasOwnProperty('stripListLeaders') ? options.stripListLeaders : true;
  options.gfm = options.hasOwnProperty('gfm') ? options.gfm : true;

  var output = md;
  try {
    if (options.stripListLeaders) {
      output = output.replace(/^([\s\t]*)([\*\-\+]|\d\.)\s+/gm, '$1');
    }
    if (options.gfm){
      output = output
        // Header
        .replace(/\n={2,}/g, '\n')
        // Strikethrough
        .replace(/~~/g, '')
        // Fenced codeblocks
        .replace(/`{3}.*\n/g, '');
    }
    output = output
      // Remove HTML tags
      .replace(/<(.*?)>/g, '$1')
      // Remove setext-style headers
      .replace(/^[=\-]{2,}\s*$/g, '')
      // Remove footnotes?
      .replace(/\[\^.+?\](\: .*?$)?/g, '')
      .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
      // Remove images
      .replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
      // Remove inline links
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
      // Remove Blockquotes
      .replace(/>/g, '')
      // Remove reference-style links?
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
      // Remove atx-style headers
      .replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
      .replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
      .replace(/(`{3,})(.*?)\1/gm, '$2')
      .replace(/^-{3,}\s*$/g, '')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\n{2,}/g, '\n\n');
  } catch(e) {
    console.error(e);
    return md;
  }
  return output;
};

},{}],80:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],81:[function(require,module,exports){
/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Names = require('personality-trait-names');
var Descriptions = require('personality-trait-descriptions');

var PersonalityTraitInfo = function () {
  function PersonalityTraitInfo(options) {
    _classCallCheck(this, PersonalityTraitInfo);

    this._names = new Names(options);
    this._descriptions = new Descriptions(options);
  }

  _createClass(PersonalityTraitInfo, [{
    key: 'description',
    value: function description(traitId) {
      return this._descriptions.description(traitId);
    }
  }, {
    key: 'descriptions',
    value: function descriptions() {
      return this._descriptions.descriptions();
    }
  }, {
    key: 'name',
    value: function name(traitId) {
      return this._names.name(traitId);
    }
  }, {
    key: 'names',
    value: function names() {
      return this._names.names();
    }
  }, {
    key: 'info',
    value: function info(traitId) {
      return {
        id: traitId,
        name: this.name(traitId),
        description: this.description(traitId)
      };
    }
  }]);

  return PersonalityTraitInfo;
}();

module.exports = PersonalityTraitInfo;

},{"personality-trait-descriptions":20,"personality-trait-names":56}]},{},[81])(81)
});
