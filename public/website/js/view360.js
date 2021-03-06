/*
Copyright (c) 2017 NAVER Corp.
@egjs/view360 project is licensed under the MIT license
@egjs/view360 JavaScript library
https://github.com/naver/egjs-view360
@version 3.3.0-snapshot
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@egjs/axes'), require('@egjs/component')) :
  typeof define === 'function' && define.amd ? define(['exports', '@egjs/axes', '@egjs/component'], factory) :
  (factory((global.eg = global.eg || {}, global.eg.view360 = {}),global.eg.Axes,global.eg.Component));
}(this, (function (exports,Axes,Component) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var es6Promise = createCommonjsModule(function (module, exports) {
  /*!
   * @overview es6-promise - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
   * @version   v4.2.8+1e68dce6
   */
  (function (global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {

    function objectOrFunction(x) {
      var type = typeof x;
      return x !== null && (type === 'object' || type === 'function');
    }

    function isFunction(x) {
      return typeof x === 'function';
    }

    var _isArray = void 0;

    if (Array.isArray) {
      _isArray = Array.isArray;
    } else {
      _isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    }

    var isArray = _isArray;
    var len = 0;
    var vertxNext = void 0;
    var customSchedulerFn = void 0;

    var asap = function asap(callback, arg) {
      queue[len] = callback;
      queue[len + 1] = arg;
      len += 2;

      if (len === 2) {
        // If len is 2, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        if (customSchedulerFn) {
          customSchedulerFn(flush);
        } else {
          scheduleFlush();
        }
      }
    };

    function setScheduler(scheduleFn) {
      customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
      asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]'; // test for web worker but not in IE10

    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined'; // node

    function useNextTick() {
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // see https://github.com/cujojs/when/issues/410 for details
      return function () {
        return process.nextTick(flush);
      };
    } // vertx


    function useVertxTimer() {
      if (typeof vertxNext !== 'undefined') {
        return function () {
          vertxNext(flush);
        };
      }

      return useSetTimeout();
    }

    function useMutationObserver() {
      var iterations = 0;
      var observer = new BrowserMutationObserver(flush);
      var node = document.createTextNode('');
      observer.observe(node, {
        characterData: true
      });
      return function () {
        node.data = iterations = ++iterations % 2;
      };
    } // web worker


    function useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = flush;
      return function () {
        return channel.port2.postMessage(0);
      };
    }

    function useSetTimeout() {
      // Store setTimeout reference so es6-promise will be unaffected by
      // other code modifying setTimeout (like sinon.useFakeTimers())
      var globalSetTimeout = setTimeout;
      return function () {
        return globalSetTimeout(flush, 1);
      };
    }

    var queue = new Array(1000);

    function flush() {
      for (var i = 0; i < len; i += 2) {
        var callback = queue[i];
        var arg = queue[i + 1];
        callback(arg);
        queue[i] = undefined;
        queue[i + 1] = undefined;
      }

      len = 0;
    }

    function attemptVertx() {
      try {
        var vertx = Function('return this')().require('vertx');

        vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return useVertxTimer();
      } catch (e) {
        return useSetTimeout();
      }
    }

    var scheduleFlush = void 0; // Decide what async method to use to triggering processing of queued callbacks:

    if (isNode) {
      scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
      scheduleFlush = useMutationObserver();
    } else if (isWorker) {
      scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
      scheduleFlush = attemptVertx();
    } else {
      scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
      var parent = this;
      var child = new this.constructor(noop);

      if (child[PROMISE_ID] === undefined) {
        makePromise(child);
      }

      var _state = parent._state;

      if (_state) {
        var callback = arguments[_state - 1];
        asap(function () {
          return invokeCallback(_state, child, callback, parent._result);
        });
      } else {
        subscribe(parent, child, onFulfillment, onRejection);
      }

      return child;
    }
    /**
      `Promise.resolve` returns a promise that will become resolved with the
      passed `value`. It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        resolve(1);
      });
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.resolve(1);
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      @method resolve
      @static
      @param {Any} value value that the returned promise will be resolved with
      Useful for tooling.
      @return {Promise} a promise that will become fulfilled with the given
      `value`
    */


    function resolve$1(object) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(noop);
      resolve(promise, object);
      return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(2);

    function noop() {}

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    function selfFulfillment() {
      return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
      try {
        then$$1.call(value, fulfillmentHandler, rejectionHandler);
      } catch (e) {
        return e;
      }
    }

    function handleForeignThenable(promise, thenable, then$$1) {
      asap(function (promise) {
        var sealed = false;
        var error = tryThen(then$$1, thenable, function (value) {
          if (sealed) {
            return;
          }

          sealed = true;

          if (thenable !== value) {
            resolve(promise, value);
          } else {
            fulfill(promise, value);
          }
        }, function (reason) {
          if (sealed) {
            return;
          }

          sealed = true;
          reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          reject(promise, error);
        }
      }, promise);
    }

    function handleOwnThenable(promise, thenable) {
      if (thenable._state === FULFILLED) {
        fulfill(promise, thenable._result);
      } else if (thenable._state === REJECTED) {
        reject(promise, thenable._result);
      } else {
        subscribe(thenable, undefined, function (value) {
          return resolve(promise, value);
        }, function (reason) {
          return reject(promise, reason);
        });
      }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$1) {
      if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
        handleOwnThenable(promise, maybeThenable);
      } else {
        if (then$$1 === undefined) {
          fulfill(promise, maybeThenable);
        } else if (isFunction(then$$1)) {
          handleForeignThenable(promise, maybeThenable, then$$1);
        } else {
          fulfill(promise, maybeThenable);
        }
      }
    }

    function resolve(promise, value) {
      if (promise === value) {
        reject(promise, selfFulfillment());
      } else if (objectOrFunction(value)) {
        var then$$1 = void 0;

        try {
          then$$1 = value.then;
        } catch (error) {
          reject(promise, error);
          return;
        }

        handleMaybeThenable(promise, value, then$$1);
      } else {
        fulfill(promise, value);
      }
    }

    function publishRejection(promise) {
      if (promise._onerror) {
        promise._onerror(promise._result);
      }

      publish(promise);
    }

    function fulfill(promise, value) {
      if (promise._state !== PENDING) {
        return;
      }

      promise._result = value;
      promise._state = FULFILLED;

      if (promise._subscribers.length !== 0) {
        asap(publish, promise);
      }
    }

    function reject(promise, reason) {
      if (promise._state !== PENDING) {
        return;
      }

      promise._state = REJECTED;
      promise._result = reason;
      asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
      var _subscribers = parent._subscribers;
      var length = _subscribers.length;
      parent._onerror = null;
      _subscribers[length] = child;
      _subscribers[length + FULFILLED] = onFulfillment;
      _subscribers[length + REJECTED] = onRejection;

      if (length === 0 && parent._state) {
        asap(publish, parent);
      }
    }

    function publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (subscribers.length === 0) {
        return;
      }

      var child = void 0,
          callback = void 0,
          detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function invokeCallback(settled, promise, callback, detail) {
      var hasCallback = isFunction(callback),
          value = void 0,
          error = void 0,
          succeeded = true;

      if (hasCallback) {
        try {
          value = callback(detail);
        } catch (e) {
          succeeded = false;
          error = e;
        }

        if (promise === value) {
          reject(promise, cannotReturnOwn());
          return;
        }
      } else {
        value = detail;
      }

      if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
        resolve(promise, value);
      } else if (succeeded === false) {
        reject(promise, error);
      } else if (settled === FULFILLED) {
        fulfill(promise, value);
      } else if (settled === REJECTED) {
        reject(promise, value);
      }
    }

    function initializePromise(promise, resolver) {
      try {
        resolver(function resolvePromise(value) {
          resolve(promise, value);
        }, function rejectPromise(reason) {
          reject(promise, reason);
        });
      } catch (e) {
        reject(promise, e);
      }
    }

    var id = 0;

    function nextId() {
      return id++;
    }

    function makePromise(promise) {
      promise[PROMISE_ID] = id++;
      promise._state = undefined;
      promise._result = undefined;
      promise._subscribers = [];
    }

    function validationError() {
      return new Error('Array Methods must be provided an Array');
    }

    var Enumerator = function () {
      function Enumerator(Constructor, input) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor(noop);

        if (!this.promise[PROMISE_ID]) {
          makePromise(this.promise);
        }

        if (isArray(input)) {
          this.length = input.length;
          this._remaining = input.length;
          this._result = new Array(this.length);

          if (this.length === 0) {
            fulfill(this.promise, this._result);
          } else {
            this.length = this.length || 0;

            this._enumerate(input);

            if (this._remaining === 0) {
              fulfill(this.promise, this._result);
            }
          }
        } else {
          reject(this.promise, validationError());
        }
      }

      Enumerator.prototype._enumerate = function _enumerate(input) {
        for (var i = 0; this._state === PENDING && i < input.length; i++) {
          this._eachEntry(input[i], i);
        }
      };

      Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
        var c = this._instanceConstructor;
        var resolve$$1 = c.resolve;

        if (resolve$$1 === resolve$1) {
          var _then = void 0;

          var error = void 0;
          var didError = false;

          try {
            _then = entry.then;
          } catch (e) {
            didError = true;
            error = e;
          }

          if (_then === then && entry._state !== PENDING) {
            this._settledAt(entry._state, i, entry._result);
          } else if (typeof _then !== 'function') {
            this._remaining--;
            this._result[i] = entry;
          } else if (c === Promise$1) {
            var promise = new c(noop);

            if (didError) {
              reject(promise, error);
            } else {
              handleMaybeThenable(promise, entry, _then);
            }

            this._willSettleAt(promise, i);
          } else {
            this._willSettleAt(new c(function (resolve$$1) {
              return resolve$$1(entry);
            }), i);
          }
        } else {
          this._willSettleAt(resolve$$1(entry), i);
        }
      };

      Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
        var promise = this.promise;

        if (promise._state === PENDING) {
          this._remaining--;

          if (state === REJECTED) {
            reject(promise, value);
          } else {
            this._result[i] = value;
          }
        }

        if (this._remaining === 0) {
          fulfill(promise, this._result);
        }
      };

      Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
        var enumerator = this;
        subscribe(promise, undefined, function (value) {
          return enumerator._settledAt(FULFILLED, i, value);
        }, function (reason) {
          return enumerator._settledAt(REJECTED, i, reason);
        });
      };

      return Enumerator;
    }();
    /**
      `Promise.all` accepts an array of promises, and returns a new promise which
      is fulfilled with an array of fulfillment values for the passed promises, or
      rejected with the reason of the first passed promise to be rejected. It casts all
      elements of the passed iterable to promises as it runs this algorithm.
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = resolve(2);
      let promise3 = resolve(3);
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```
    
      If any of the `promises` given to `all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = reject(new Error("2"));
      let promise3 = reject(new Error("3"));
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```
    
      @method all
      @static
      @param {Array} entries array of promises
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
      @static
    */


    function all(entries) {
      return new Enumerator(this, entries).promise;
    }
    /**
      `Promise.race` returns a new promise which is settled in the same way as the
      first passed promise to settle.
    
      Example:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 2');
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // result === 'promise 2' because it was resolved before promise1
        // was resolved.
      });
      ```
    
      `Promise.race` is deterministic in that only the state of the first
      settled promise matters. For example, even if other promises given to the
      `promises` array argument are resolved, but the first settled promise has
      become rejected before the other promises became fulfilled, the returned
      promise will become rejected:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error('promise 2'));
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // Code here never runs
      }, function(reason){
        // reason.message === 'promise 2' because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```
    
      An example real-world use case is implementing timeouts:
    
      ```javascript
      Promise.race([ajax('foo.json'), timeout(5000)])
      ```
    
      @method race
      @static
      @param {Array} promises array of promises to observe
      Useful for tooling.
      @return {Promise} a promise which settles in the same way as the first passed
      promise to settle.
    */


    function race(entries) {
      /*jshint validthis:true */
      var Constructor = this;

      if (!isArray(entries)) {
        return new Constructor(function (_, reject) {
          return reject(new TypeError('You must pass an array to race.'));
        });
      } else {
        return new Constructor(function (resolve, reject) {
          var length = entries.length;

          for (var i = 0; i < length; i++) {
            Constructor.resolve(entries[i]).then(resolve, reject);
          }
        });
      }
    }
    /**
      `Promise.reject` returns a promise rejected with the passed `reason`.
      It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.reject(new Error('WHOOPS'));
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      @method reject
      @static
      @param {Any} reason value that the returned promise will be rejected with.
      Useful for tooling.
      @return {Promise} a promise rejected with the given `reason`.
    */


    function reject$1(reason) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(noop);
      reject(promise, reason);
      return promise;
    }

    function needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.
    
      Terminology
      -----------
    
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.
    
      A promise can be in one of three states: pending, fulfilled, or rejected.
    
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.
    
      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.
    
    
      Basic Usage:
      ------------
    
      ```js
      let promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);
    
        // on failure
        reject(reason);
      });
    
      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Advanced Usage:
      ---------------
    
      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.
    
      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
    
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }
    
      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Unlike callbacks, promises are great composable primitives.
    
      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON
    
        return values;
      });
      ```
    
      @class Promise
      @param {Function} resolver
      Useful for tooling.
      @constructor
    */


    var Promise$1 = function () {
      function Promise(resolver) {
        this[PROMISE_ID] = nextId();
        this._result = this._state = undefined;
        this._subscribers = [];

        if (noop !== resolver) {
          typeof resolver !== 'function' && needsResolver();
          this instanceof Promise ? initializePromise(this, resolver) : needsNew();
        }
      }
      /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.
       ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```
       Chaining
      --------
       The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.
       ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });
       findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
       ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```
       Assimilation
      ------------
       Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.
       ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```
       If the assimliated promise rejects, then the downstream promise will also reject.
       ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```
       Simple Example
      --------------
       Synchronous Example
       ```javascript
      let result;
       try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```
       Errback Example
       ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```
       Promise Example;
       ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```
       Advanced Example
      --------------
       Synchronous Example
       ```javascript
      let author, books;
       try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```
       Errback Example
       ```js
       function foundBooks(books) {
       }
       function failure(reason) {
       }
       findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```
       Promise Example;
       ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```
       @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      Useful for tooling.
      @return {Promise}
      */

      /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
      ```js
      function findAuthor(){
      throw new Error('couldn't find that author');
      }
      // synchronous
      try {
      findAuthor();
      } catch(reason) {
      // something went wrong
      }
      // async with promises
      findAuthor().catch(function(reason){
      // something went wrong
      });
      ```
      @method catch
      @param {Function} onRejection
      Useful for tooling.
      @return {Promise}
      */


      Promise.prototype.catch = function _catch(onRejection) {
        return this.then(null, onRejection);
      };
      /**
        `finally` will be invoked regardless of the promise's fate just as native
        try/catch/finally behaves
      
        Synchronous example:
      
        ```js
        findAuthor() {
          if (Math.random() > 0.5) {
            throw new Error();
          }
          return new Author();
        }
      
        try {
          return findAuthor(); // succeed or fail
        } catch(error) {
          return findOtherAuther();
        } finally {
          // always runs
          // doesn't affect the return value
        }
        ```
      
        Asynchronous example:
      
        ```js
        findAuthor().catch(function(reason){
          return findOtherAuther();
        }).finally(function(){
          // author was either found, or not
        });
        ```
      
        @method finally
        @param {Function} callback
        @return {Promise}
      */


      Promise.prototype.finally = function _finally(callback) {
        var promise = this;
        var constructor = promise.constructor;

        if (isFunction(callback)) {
          return promise.then(function (value) {
            return constructor.resolve(callback()).then(function () {
              return value;
            });
          }, function (reason) {
            return constructor.resolve(callback()).then(function () {
              throw reason;
            });
          });
        }

        return promise.then(callback, callback);
      };

      return Promise;
    }();

    Promise$1.prototype.then = then;
    Promise$1.all = all;
    Promise$1.race = race;
    Promise$1.resolve = resolve$1;
    Promise$1.reject = reject$1;
    Promise$1._setScheduler = setScheduler;
    Promise$1._setAsap = setAsap;
    Promise$1._asap = asap;
    /*global self*/

    function polyfill() {
      var local = void 0;

      if (typeof commonjsGlobal !== 'undefined') {
        local = commonjsGlobal;
      } else if (typeof self !== 'undefined') {
        local = self;
      } else {
        try {
          local = Function('return this')();
        } catch (e) {
          throw new Error('polyfill failed because global object is unavailable in this environment');
        }
      }

      var P = local.Promise;

      if (P) {
        var promiseToString = null;

        try {
          promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {// silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
          return;
        }
      }

      local.Promise = Promise$1;
    } // Strange compat..


    Promise$1.polyfill = polyfill;
    Promise$1.Promise = Promise$1;
    return Promise$1;
  });
  });

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  var degree = Math.PI / 180;
  /**
   * Convert Degree To Radian
   *
   * @param {Number} a Angle in Degrees
   */

  function toRadian(a) {
    return a * degree;
  }
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create$2() {
    var out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {mat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */

  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */

  function invert$2(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$3() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */

  function fromQuat$1(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$4() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues$4(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function add$4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function subtract$4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */

  function scale$4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */

  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Transforms the vec3 with a mat3.
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat3} m the 3x3 matrix to transform with
   * @returns {vec3} out
   */

  function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */

  function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    var x = a[0],
        y = a[1],
        z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);

    var uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

    var uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  /**
   * Alias for {@link vec3.subtract}
   * @function
   */

  var sub$4 = subtract$4;
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  var len = length;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = function () {
    var vec = create$4();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$5() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {vec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */

  function clone$5(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */

  function copy$5(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */

  function normalize$1(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function exactEquals$5(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$1 = function () {
    var vec = create$5();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  function create$6() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/

  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */

  function multiply$6(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate conjugate of
   * @returns {quat} out
   */

  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */

  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      var i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */

  var clone$6 = clone$5;
  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the source quaternion
   * @returns {quat} out
   * @function
   */

  var copy$6 = copy$5;
  /**
   * Alias for {@link quat.multiply}
   * @function
   */

  var mul$6 = multiply$6;
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  var normalize$2 = normalize$1;
  /**
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat} a The first quaternion.
   * @param {quat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  var exactEquals$6 = exactEquals$5;
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {vec3} a the initial vector
   * @param {vec3} b the destination vector
   * @returns {quat} out
   */

  var rotationTo = function () {
    var tmpvec3 = create$4();
    var xUnitVec3 = fromValues$4(1, 0, 0);
    var yUnitVec3 = fromValues$4(0, 1, 0);
    return function (out, a, b) {
      var dot$$1 = dot(a, b);

      if (dot$$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$$1;
        return normalize$2(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {quat} c the third operand
   * @param {quat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  var sqlerp = function () {
    var temp1 = create$6();
    var temp2 = create$6();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */

  var setAxes = function () {
    var matr = create$2();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create$8() {
    var out = new ARRAY_TYPE(2);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */

  function fromValues$8(x, y) {
    var out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the source vector
   * @returns {vec2} out
   */

  function copy$8(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to normalize
   * @returns {vec2} out
   */

  function normalize$4(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot$4(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$2 = function () {
    var vec = create$8();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  /**
   * Copyright (c) 2015 NAVER Corp.
   * egjs projects are licensed under the MIT license
   */

  /* eslint-disable no-new-func, no-nested-ternary */
  var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
  /* eslint-enable no-new-func, no-nested-ternary */

  var doc = win.document;
  var userAgent = win.navigator && win.navigator.userAgent || "";
  var IS_IOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  var IS_SAFARI_ON_DESKTOP = userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1 && userAgent.indexOf("Mac OS X") !== -1 && !IS_IOS;
  var IS_SAMSUNG_BROWSER = /SamsungBrowser/i.test(userAgent);

  /**
   * Copyright (c) 2015 NAVER Corp.
   * egjs projects are licensed under the MIT license
   */
  win.Float32Array = typeof win.Float32Array !== "undefined" ? win.Float32Array : win.Array;
  var Float32Array$1 = win.Float32Array;
  var getComputedStyle = win.getComputedStyle;
  var userAgent$1 = win.navigator.userAgent;
  var SUPPORT_TOUCH = "ontouchstart" in win;
  var SUPPORT_DEVICEMOTION = "ondevicemotion" in win;
  var DeviceMotionEvent$1 = win.DeviceMotionEvent;
  var devicePixelRatio = win.devicePixelRatio;

  var TRANSFORM = function () {
    var docStyle = doc.documentElement.style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

    for (var i = 0, len = target.length; i < len; i++) {
      if (target[i] in docStyle) {
        return target[i];
      }
    }

    return "";
  }(); // check for will-change support


  var SUPPORT_WILLCHANGE = win.CSS && win.CSS.supports && win.CSS.supports("will-change", "transform");
  var WEBXR_SUPPORTED = false;

  var checkXRSupport = function checkXRSupport() {
    if (!navigator.xr) {
      return;
    }

    if (navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported("immersive-vr").then(function (res) {
        WEBXR_SUPPORTED = res;
      })["catch"](function () {});
    } else if (navigator.xr.supportsSession) {
      navigator.xr.supportsSession("immersive-vr").then(function (res) {
        WEBXR_SUPPORTED = res;
      })["catch"](function () {});
    }
  };

  /**
   * Original Code
   * https://github.com/toji/gl-matrix/blob/v2.3.2/src/gl-matrix.js
   * Math Util
   * modified by egjs
   */

  function quatToVec3(quaternion) {
    var baseV = fromValues$4(0, 0, 1);
    transformQuat(baseV, baseV, quaternion);
    return baseV;
  }

  function toDegree(a) {
    return a * 180 / Math.PI;
  }

  var util = {};

  util.isPowerOfTwo = function (n) {
    return n && (n & n - 1) === 0;
  };

  util.extractPitchFromQuat = function (quaternion) {
    var baseV = quatToVec3(quaternion);
    return -1 * Math.atan2(baseV[1], Math.sqrt(Math.pow(baseV[0], 2) + Math.pow(baseV[2], 2)));
  };

  util.hypot = Math.hypot || function (x, y) {
    return Math.sqrt(x * x + y * y);
  }; // implement reference
  // the general equation of a plane : http://www.gisdeveloper.co.kr/entry/평면의-공식
  // calculating angle between two vectors : http://darkpgmr.tistory.com/121


  var ROTATE_CONSTANT = {
    PITCH_DELTA: 1,
    YAW_DELTA_BY_ROLL: 2,
    YAW_DELTA_BY_YAW: 3
  };
  ROTATE_CONSTANT[ROTATE_CONSTANT.PITCH_DELTA] = {
    targetAxis: [0, 1, 0],
    meshPoint: [0, 0, 1]
  };
  ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_ROLL] = {
    targetAxis: [0, 1, 0],
    meshPoint: [1, 0, 0]
  };
  ROTATE_CONSTANT[ROTATE_CONSTANT.YAW_DELTA_BY_YAW] = {
    targetAxis: [1, 0, 0],
    meshPoint: [0, 0, 1]
  };

  function getRotationDelta(prevQ, curQ, rotateKind) {
    var targetAxis = fromValues$4(ROTATE_CONSTANT[rotateKind].targetAxis[0], ROTATE_CONSTANT[rotateKind].targetAxis[1], ROTATE_CONSTANT[rotateKind].targetAxis[2]);
    var meshPoint = ROTATE_CONSTANT[rotateKind].meshPoint;
    var prevQuaternion = clone$6(prevQ);
    var curQuaternion = clone$6(curQ);
    normalize$2(prevQuaternion, prevQuaternion);
    normalize$2(curQuaternion, curQuaternion);
    var prevPoint = fromValues$4(0, 0, 1);
    var curPoint = fromValues$4(0, 0, 1);
    transformQuat(prevPoint, prevPoint, prevQuaternion);
    transformQuat(curPoint, curPoint, curQuaternion);
    transformQuat(targetAxis, targetAxis, curQuaternion);
    var rotateDistance = dot(targetAxis, cross(create$4(), prevPoint, curPoint));
    var rotateDirection = rotateDistance > 0 ? 1 : -1; // when counter clock wise, use vec3.fromValues(0,1,0)
    // when clock wise, use vec3.fromValues(0,-1,0)
    // const meshPoint1 = vec3.fromValues(0, 0, 0);

    var meshPoint2 = fromValues$4(meshPoint[0], meshPoint[1], meshPoint[2]);
    var meshPoint3;

    if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
      meshPoint3 = fromValues$4(0, rotateDirection, 0);
    } else {
      meshPoint3 = fromValues$4(rotateDirection, 0, 0);
    }

    transformQuat(meshPoint2, meshPoint2, curQuaternion);
    transformQuat(meshPoint3, meshPoint3, curQuaternion);
    var vecU = meshPoint2;
    var vecV = meshPoint3;
    var vecN = create$4();
    cross(vecN, vecU, vecV);
    normalize(vecN, vecN);
    var coefficientA = vecN[0];
    var coefficientB = vecN[1];
    var coefficientC = vecN[2]; //	const coefficientD = -1 * vec3.dot(vecN, meshPoint1);
    // a point on the plane

    curPoint = fromValues$4(meshPoint[0], meshPoint[1], meshPoint[2]);
    transformQuat(curPoint, curPoint, curQuaternion); // a point should project on the plane

    prevPoint = fromValues$4(meshPoint[0], meshPoint[1], meshPoint[2]);
    transformQuat(prevPoint, prevPoint, prevQuaternion); // distance between prevPoint and the plane

    var distance$$1 = Math.abs(prevPoint[0] * coefficientA + prevPoint[1] * coefficientB + prevPoint[2] * coefficientC);
    var projectedPrevPoint = create$4();
    subtract$4(projectedPrevPoint, prevPoint, scale$4(create$4(), vecN, distance$$1));
    var trigonometricRatio = (projectedPrevPoint[0] * curPoint[0] + projectedPrevPoint[1] * curPoint[1] + projectedPrevPoint[2] * curPoint[2]) / (length(projectedPrevPoint) * length(curPoint)); // defensive block

    trigonometricRatio > 1 && (trigonometricRatio = 1);
    var theta = Math.acos(trigonometricRatio);
    var crossVec = cross(create$4(), curPoint, projectedPrevPoint);
    distance$$1 = coefficientA * crossVec[0] + coefficientB * crossVec[1] + coefficientC * crossVec[2];
    var thetaDirection;

    if (rotateKind !== ROTATE_CONSTANT.YAW_DELTA_BY_YAW) {
      thetaDirection = distance$$1 > 0 ? 1 : -1;
    } else {
      thetaDirection = distance$$1 < 0 ? 1 : -1;
    }

    var deltaRadian = theta * thetaDirection * rotateDirection;
    return toDegree(deltaRadian);
  }

  function angleBetweenVec2(v1, v2) {
    var det = v1[0] * v2[1] - v2[0] * v1[1];
    var theta = -Math.atan2(det, dot$4(v1, v2));
    return theta;
  }

  util.yawOffsetBetween = function (viewDir, targetDir) {
    var viewDirXZ = fromValues$8(viewDir[0], viewDir[2]);
    var targetDirXZ = fromValues$8(targetDir[0], targetDir[2]);
    normalize$4(viewDirXZ, viewDirXZ);
    normalize$4(targetDirXZ, targetDirXZ);
    var theta = -angleBetweenVec2(viewDirXZ, targetDirXZ);
    return theta;
  };

  util.toDegree = toDegree;
  util.getRotationDelta = getRotationDelta;
  util.angleBetweenVec2 = angleBetweenVec2;

  /**
   * RotationPanInput is extension of PanInput to compensate coordinates by screen rotation angle.
   *
   * The reason for using this function is that in VR mode,
   * the roll angle is adjusted in the direction opposite to the screen rotation angle.
   *
   * Therefore, the angle that the user touches and moves does not match the angle at which the actual object should move.
   * @extends PanInput
   */

  var RotationPanInput =
  /*#__PURE__*/
  function (_PanInput) {
    _inheritsLoose(RotationPanInput, _PanInput);

    /**
     * Constructor
     *
     * @private
     * @param {HTMLElement} el target element
     * @param {Object} [options] The option object
     * @param {Boolean} [options.useRotation]  Whether to use rotation(or VR)
     */
    function RotationPanInput(el, options, deviceSensor) {
      var _this;

      _this = _PanInput.call(this, el, options) || this;
      _this._useRotation = false;
      _this._deviceSensor = deviceSensor;

      _this.setUseRotation(!!(options && options.useRotation));

      _this._userDirection = Axes.DIRECTION_ALL;
      return _this;
    }

    var _proto = RotationPanInput.prototype;

    _proto.setUseRotation = function setUseRotation(useRotation) {
      this._useRotation = useRotation;
    };

    _proto.connect = function connect(observer) {
      // User intetened direction
      this._userDirection = this._direction; // In VR Mode, Use ALL direction if direction is not none
      // Because horizontal and vertical is changed dynamically by screen rotation.
      // this._direction is used to initialize hammerjs

      if (this._useRotation && this._direction & Axes.DIRECTION_ALL) {
        this._direction = Axes.DIRECTION_HORIZONTAL;
      }

      _PanInput.prototype.connect.call(this, observer);
    };

    _proto.getOffset = function getOffset(properties, useDirection) {
      if (this._useRotation === false) {
        return _PanInput.prototype.getOffset.call(this, properties, useDirection);
      }

      var offset = _PanInput.prototype.getOffset.call(this, properties, [true, true]);

      var newOffset = [0, 0];

      var rightAxis = this._deviceSensor.getDeviceHorizontalRight();

      var rightAxisVec2 = fromValues$8(rightAxis[0], rightAxis[1]);
      var xAxis = fromValues$8(1, 0);
      var theta = util.angleBetweenVec2(rightAxisVec2, xAxis);
      var cosTheta = Math.cos(theta);
      var sinTheta = Math.sin(theta); // RotateZ

      newOffset[0] = offset[0] * cosTheta - offset[1] * sinTheta;
      newOffset[1] = offset[1] * cosTheta + offset[0] * sinTheta; // Use only user allowed direction.

      if (!(this._userDirection & Axes.DIRECTION_HORIZONTAL)) {
        newOffset[0] = 0;
      } else if (!(this._userDirection & Axes.DIRECTION_VERTICAL)) {
        newOffset[1] = 0;
      }

      return newOffset;
    };

    _proto.destroy = function destroy() {
      _PanInput.prototype.destroy.call(this);
    };

    return RotationPanInput;
  }(Axes.PanInput);

  // @ts-check
  const __sensor__ = Symbol("__sensor__");
  const slot = __sensor__;

  function defineProperties(target, descriptions) {
    for (const property in descriptions) {
      Object.defineProperty(target, property, {
        configurable: true,
        value: descriptions[property]
      });
    }
  }

  const EventTargetMixin = (superclass, ...eventNames) => class extends superclass {
    constructor(...args) {
      // @ts-ignore
      super(args);
      const eventTarget = document.createDocumentFragment();

      this.addEventListener = (type, ...args) => {
        return eventTarget.addEventListener(type, ...args);
      };

      this.removeEventListener = (...args) => {
        // @ts-ignore
        return eventTarget.removeEventListener(...args);
      };

      this.dispatchEvent = event => {
        defineProperties(event, {
          currentTarget: this
        });

        if (!event.target) {
          defineProperties(event, {
            target: this
          });
        }

        const methodName = `on${event.type}`;

        if (typeof this[methodName] == "function") {
          this[methodName](event);
        }

        const retValue = eventTarget.dispatchEvent(event);

        if (retValue && this.parentNode) {
          this.parentNode.dispatchEvent(event);
        }

        defineProperties(event, {
          currentTarget: null,
          target: null
        });
        return retValue;
      };
    }

  };
  class EventTarget extends EventTargetMixin(Object) {}
  function defineReadonlyProperties(target, slot, descriptions) {
    const propertyBag = target[slot];

    for (const property in descriptions) {
      propertyBag[property] = descriptions[property];
      Object.defineProperty(target, property, {
        get: () => propertyBag[property]
      });
    }
  }

  class SensorErrorEvent extends Event {
    constructor(type, errorEventInitDict) {
      super(type, errorEventInitDict);

      if (!errorEventInitDict || !(errorEventInitDict.error instanceof DOMException)) {
        throw TypeError("Failed to construct 'SensorErrorEvent':" + "2nd argument much contain 'error' property");
      }

      Object.defineProperty(this, "error", {
        configurable: false,
        writable: false,
        value: errorEventInitDict.error
      });
    }

  }

  function defineOnEventListener(target, name) {
    Object.defineProperty(target, `on${name}`, {
      enumerable: true,
      configurable: false,
      writable: true,
      value: null
    });
  }

  const SensorState = {
    IDLE: 1,
    ACTIVATING: 2,
    ACTIVE: 3
  };
  class Sensor extends EventTarget {
    constructor(options) {
      super();
      this[slot] = new WeakMap();
      defineOnEventListener(this, "reading");
      defineOnEventListener(this, "activate");
      defineOnEventListener(this, "error");
      defineReadonlyProperties(this, slot, {
        activated: false,
        hasReading: false,
        timestamp: null
      });
      this[slot].state = SensorState.IDLE;

      this[slot].notifyError = (message, name) => {
        let error = new SensorErrorEvent("error", {
          error: new DOMException(message, name)
        });
        this.dispatchEvent(error);
        this.stop();
      };

      this[slot].notifyActivatedState = () => {
        let activate = new Event("activate");
        this[slot].activated = true;
        this.dispatchEvent(activate);
        this[slot].state = SensorState.ACTIVE;
      };

      this[slot].activateCallback = () => {};

      this[slot].deactivateCallback = () => {};

      this[slot].frequency = null;

      if (window && window.parent != window.top) {
        throw new DOMException("Only instantiable in a top-level browsing context", "SecurityError");
      }

      if (options && typeof options.frequency == "number") {
        if (options.frequency > 60) {
          this.frequency = options.frequency;
        }
      }
    }

    start() {
      if (this[slot].state === SensorState.ACTIVATING || this[slot].state === SensorState.ACTIVE) {
        return;
      }

      this[slot].state = SensorState.ACTIVATING;
      this[slot].activateCallback();
    }

    stop() {
      if (this[slot].state === SensorState.IDLE) {
        return;
      }

      this[slot].activated = false;
      this[slot].hasReading = false;
      this[slot].timestamp = null;
      this[slot].deactivateCallback();
      this[slot].state = SensorState.IDLE;
    }

  }

  // @ts-check
  const slot$1 = __sensor__;
  let orientation; // @ts-ignore

  if (screen.orientation) {
    // @ts-ignore
    orientation = screen.orientation;
  } else if (screen.msOrientation) {
    orientation = screen.msOrientation;
  } else {
    orientation = {};
    Object.defineProperty(orientation, "angle", {
      get: () => {
        return window.orientation || 0;
      }
    });
  }

  const DeviceOrientationMixin = (superclass, ...eventNames) => class extends superclass {
    constructor(...args) {
      // @ts-ignore
      super(args);

      for (const eventName of eventNames) {
        if (`on${eventName}` in window) {
          this[slot$1].eventName = eventName;
          break;
        }
      }

      this[slot$1].activateCallback = () => {
        window.addEventListener(this[slot$1].eventName, this[slot$1].handleEvent, {
          capture: true
        });
      };

      this[slot$1].deactivateCallback = () => {
        window.removeEventListener(this[slot$1].eventName, this[slot$1].handleEvent, {
          capture: true
        });
      };
    }

  };

  function toQuaternionFromEuler(alpha, beta, gamma) {
    const degToRad = Math.PI / 180;
    const x = (beta || 0) * degToRad;
    const y = (gamma || 0) * degToRad;
    const z = (alpha || 0) * degToRad;
    const cZ = Math.cos(z * 0.5);
    const sZ = Math.sin(z * 0.5);
    const cY = Math.cos(y * 0.5);
    const sY = Math.sin(y * 0.5);
    const cX = Math.cos(x * 0.5);
    const sX = Math.sin(x * 0.5);
    const qx = sX * cY * cZ - cX * sY * sZ;
    const qy = cX * sY * cZ + sX * cY * sZ;
    const qz = cX * cY * sZ + sX * sY * cZ;
    const qw = cX * cY * cZ - sX * sY * sZ;
    return [qx, qy, qz, qw];
  }

  function rotateQuaternionByAxisAngle(quat, axis, angle) {
    const sHalfAngle = Math.sin(angle / 2);
    const cHalfAngle = Math.cos(angle / 2);
    const transformQuat = [axis[0] * sHalfAngle, axis[1] * sHalfAngle, axis[2] * sHalfAngle, cHalfAngle];

    function multiplyQuaternion(a, b) {
      const qx = a[0] * b[3] + a[3] * b[0] + a[1] * b[2] - a[2] * b[1];
      const qy = a[1] * b[3] + a[3] * b[1] + a[2] * b[0] - a[0] * b[2];
      const qz = a[2] * b[3] + a[3] * b[2] + a[0] * b[1] - a[1] * b[0];
      const qw = a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2];
      return [qx, qy, qz, qw];
    }

    function normalizeQuaternion(quat) {
      const length = Math.sqrt(quat[0] ** 2 + quat[1] ** 2 + quat[2] ** 2 + quat[3] ** 2);

      if (length === 0) {
        return [0, 0, 0, 1];
      }

      return quat.map(v => v / length);
    }

    return normalizeQuaternion(multiplyQuaternion(quat, transformQuat));
  }

  function toMat4FromQuat(mat, q) {
    const typed = mat instanceof Float32Array || mat instanceof Float64Array;

    if (typed && mat.length >= 16) {
      mat[0] = 1 - 2 * (q[1] ** 2 + q[2] ** 2);
      mat[1] = 2 * (q[0] * q[1] - q[2] * q[3]);
      mat[2] = 2 * (q[0] * q[2] + q[1] * q[3]);
      mat[3] = 0;
      mat[4] = 2 * (q[0] * q[1] + q[2] * q[3]);
      mat[5] = 1 - 2 * (q[0] ** 2 + q[2] ** 2);
      mat[6] = 2 * (q[1] * q[2] - q[0] * q[3]);
      mat[7] = 0;
      mat[8] = 2 * (q[0] * q[2] - q[1] * q[3]);
      mat[9] = 2 * (q[1] * q[2] + q[0] * q[3]);
      mat[10] = 1 - 2 * (q[0] ** 2 + q[1] ** 2);
      mat[11] = 0;
      mat[12] = 0;
      mat[13] = 0;
      mat[14] = 0;
      mat[15] = 1;
    }

    return mat;
  }

  function worldToScreen(quaternion) {
    return !quaternion ? null : rotateQuaternionByAxisAngle(quaternion, [0, 0, 1], -orientation.angle * Math.PI / 180);
  } // @ts-ignore


  const RelativeOrientationSensor = window.RelativeOrientationSensor || class RelativeOrientationSensor extends DeviceOrientationMixin(Sensor, "deviceorientation") {
    constructor(options = {}) {
      super(options);

      switch (options.coordinateSystem || 'world') {
        case 'screen':
          Object.defineProperty(this, "quaternion", {
            get: () => worldToScreen(this[slot$1].quaternion)
          });
          break;

        case 'world':
        default:
          Object.defineProperty(this, "quaternion", {
            get: () => this[slot$1].quaternion
          });
      }

      this[slot$1].handleEvent = event => {
        // If there is no sensor we will get values equal to null.
        if (event.absolute || event.alpha === null) {
          // Spec: The implementation can still decide to provide
          // absolute orientation if relative is not available or
          // the resulting data is more accurate. In either case,
          // the absolute property must be set accordingly to reflect
          // the choice.
          this[slot$1].notifyError("Could not connect to a sensor", "NotReadableError");
          return;
        }

        if (!this[slot$1].activated) {
          this[slot$1].notifyActivatedState();
        }

        this[slot$1].timestamp = performance.now();
        this[slot$1].quaternion = toQuaternionFromEuler(event.alpha, event.beta, event.gamma);
        this[slot$1].hasReading = true;
        this.dispatchEvent(new Event("reading"));
      };

      this[slot$1].deactivateCallback = () => {
        this[slot$1].quaternion = null;
      };
    }

    populateMatrix(mat) {
      toMat4FromQuat(mat, this.quaternion);
    }

  }; // @ts-ignore

  const AbsoluteOrientationSensor = window.AbsoluteOrientationSensor || class AbsoluteOrientationSensor extends DeviceOrientationMixin(Sensor, "deviceorientationabsolute", "deviceorientation") {
    constructor(options = {}) {
      super(options);

      switch (options.coordinateSystem || 'world') {
        case 'screen':
          Object.defineProperty(this, "quaternion", {
            get: () => worldToScreen(this[slot$1].quaternion)
          });
          break;

        case 'world':
        default:
          Object.defineProperty(this, "quaternion", {
            get: () => this[slot$1].quaternion
          });
      }

      this[slot$1].handleEvent = event => {
        // If absolute is set, or webkitCompassHeading exists,
        // absolute values should be available.
        const isAbsolute = event.absolute === true || "webkitCompassHeading" in event;
        const hasValue = event.alpha !== null || event.webkitCompassHeading !== undefined;

        if (!isAbsolute || !hasValue) {
          // Spec: If an implementation can never provide absolute
          // orientation information, the event should be fired with
          // the alpha, beta and gamma attributes set to null.
          this[slot$1].notifyError("Could not connect to a sensor", "NotReadableError");
          return;
        }

        if (!this[slot$1].activated) {
          this[slot$1].notifyActivatedState();
        }

        this[slot$1].hasReading = true;
        this[slot$1].timestamp = performance.now();
        const heading = event.webkitCompassHeading != null ? 360 - event.webkitCompassHeading : event.alpha;
        this[slot$1].quaternion = toQuaternionFromEuler(heading, event.beta, event.gamma);
        this.dispatchEvent(new Event("reading"));
      };

      this[slot$1].deactivateCallback = () => {
        this[slot$1].quaternion = null;
      };
    }

    populateMatrix(mat) {
      toMat4FromQuat(mat, this.quaternion);
    }

  }; // @ts-ignore

  const Gyroscope = window.Gyroscope || class Gyroscope extends DeviceOrientationMixin(Sensor, "devicemotion") {
    constructor(options) {
      super(options);

      this[slot$1].handleEvent = event => {
        // If there is no sensor we will get values equal to null.
        if (event.rotationRate.alpha === null) {
          this[slot$1].notifyError("Could not connect to a sensor", "NotReadableError");
          return;
        }

        if (!this[slot$1].activated) {
          this[slot$1].notifyActivatedState();
        }

        this[slot$1].timestamp = performance.now();
        this[slot$1].x = event.rotationRate.alpha;
        this[slot$1].y = event.rotationRate.beta;
        this[slot$1].z = event.rotationRate.gamma;
        this[slot$1].hasReading = true;
        this.dispatchEvent(new Event("reading"));
      };

      defineReadonlyProperties(this, slot$1, {
        x: null,
        y: null,
        z: null
      });

      this[slot$1].deactivateCallback = () => {
        this[slot$1].x = null;
        this[slot$1].y = null;
        this[slot$1].z = null;
      };
    }

  }; // @ts-ignore

  const Accelerometer = window.Accelerometer || class Accelerometer extends DeviceOrientationMixin(Sensor, "devicemotion") {
    constructor(options) {
      super(options);

      this[slot$1].handleEvent = event => {
        // If there is no sensor we will get values equal to null.
        if (event.accelerationIncludingGravity.x === null) {
          this[slot$1].notifyError("Could not connect to a sensor", "NotReadableError");
          return;
        }

        if (!this[slot$1].activated) {
          this[slot$1].notifyActivatedState();
        }

        this[slot$1].timestamp = performance.now();
        this[slot$1].x = event.accelerationIncludingGravity.x;
        this[slot$1].y = event.accelerationIncludingGravity.y;
        this[slot$1].z = event.accelerationIncludingGravity.z;
        this[slot$1].hasReading = true;
        this.dispatchEvent(new Event("reading"));
      };

      defineReadonlyProperties(this, slot$1, {
        x: null,
        y: null,
        z: null
      });

      this[slot$1].deactivateCallback = () => {
        this[slot$1].x = null;
        this[slot$1].y = null;
        this[slot$1].z = null;
      };
    }

  }; // @ts-ignore

  const LinearAccelerationSensor = window.LinearAccelerationSensor || class LinearAccelerationSensor extends DeviceOrientationMixin(Sensor, "devicemotion") {
    constructor(options) {
      super(options);

      this[slot$1].handleEvent = event => {
        // If there is no sensor we will get values equal to null.
        if (event.acceleration.x === null) {
          this[slot$1].notifyError("Could not connect to a sensor", "NotReadableError");
          return;
        }

        if (!this[slot$1].activated) {
          this[slot$1].notifyActivatedState();
        }

        this[slot$1].timestamp = performance.now();
        this[slot$1].x = event.acceleration.x;
        this[slot$1].y = event.acceleration.y;
        this[slot$1].z = event.acceleration.z;
        this[slot$1].hasReading = true;
        this.dispatchEvent(new Event("reading"));
      };

      defineReadonlyProperties(this, slot$1, {
        x: null,
        y: null,
        z: null
      });

      this[slot$1].deactivateCallback = () => {
        this[slot$1].x = null;
        this[slot$1].y = null;
        this[slot$1].z = null;
      };
    }

  }; // @ts-ignore

  const GravitySensor = window.GravitySensor || class GravitySensor extends DeviceOrientationMixin(Sensor, "devicemotion") {
    constructor(options) {
      super(options);

      this[slot$1].handleEvent = event => {
        // If there is no sensor we will get values equal to null.
        if (event.acceleration.x === null || event.accelerationIncludingGravity.x === null) {
          this[slot$1].notifyError("Could not connect to a sensor", "NotReadableError");
          return;
        }

        if (!this[slot$1].activated) {
          this[slot$1].notifyActivatedState();
        }

        this[slot$1].timestamp = performance.now();
        this[slot$1].x = event.accelerationIncludingGravity.x - event.acceleration.x;
        this[slot$1].y = event.accelerationIncludingGravity.y - event.acceleration.y;
        this[slot$1].z = event.accelerationIncludingGravity.z - event.acceleration.z;
        this[slot$1].hasReading = true;
        this.dispatchEvent(new Event("reading"));
      };

      defineReadonlyProperties(this, slot$1, {
        x: null,
        y: null,
        z: null
      });

      this[slot$1].deactivateCallback = () => {
        this[slot$1].x = null;
        this[slot$1].y = null;
        this[slot$1].z = null;
      };
    }

  };

  function getDeltaYaw(prvQ, curQ) {
    var yawDeltaByYaw = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_YAW);
    var yawDeltaByRoll = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.YAW_DELTA_BY_ROLL) * Math.sin(util.extractPitchFromQuat(curQ));
    return yawDeltaByRoll + yawDeltaByYaw;
  }
  function getDeltaPitch(prvQ, curQ) {
    var pitchDelta = util.getRotationDelta(prvQ, curQ, ROTATE_CONSTANT.PITCH_DELTA);
    return pitchDelta;
  }

  /**
   * Returns a number value indiciating the version of Chrome being used,
   * or otherwise `null` if not on Chrome.
   *
   * Ref: https://github.com/immersive-web/cardboard-vr-display/pull/19
   */

  /**
   * In Chrome m65, `devicemotion` events are broken but subsequently fixed
   * in 65.0.3325.148. Since many browsers use Chromium, ensure that
   * we scope this detection by branch and build numbers to provide
   * a proper fallback.
   * https://github.com/immersive-web/webvr-polyfill/issues/307
   */

  var version = -1; // It should not be null because it will be compared with number

  var branch = null;
  var build = null;
  var match = /Chrome\/([0-9]+)\.(?:[0-9]*)\.([0-9]*)\.([0-9]*)/i.exec(userAgent$1);

  if (match) {
    version = parseInt(match[1], 10);
    branch = match[2];
    build = match[3];
  }
  var IS_ANDROID = /Android/i.test(userAgent$1);
  var CONTROL_MODE_VR = 1;
  var CONTROL_MODE_YAWPITCH = 2;
  var TOUCH_DIRECTION_NONE = 1;
  var TOUCH_DIRECTION_YAW = 2;
  var TOUCH_DIRECTION_PITCH = 4;
  var TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_YAW | TOUCH_DIRECTION_PITCH;
  /* Const for MovableCoord */

  var MC_DECELERATION = 0.0014;
  var MC_MAXIMUM_DURATION = 1000;
  var MC_BIND_SCALE = [0.20, 0.20];
  var MAX_FIELD_OF_VIEW = 110;
  var PAN_SCALE = 320; // const DELTA_THRESHOLD = 0.015;

  var YAW_RANGE_HALF = 180;
  var PITCH_RANGE_HALF = 90;
  var CIRCULAR_PITCH_RANGE_HALF = 180;
  var GYRO_MODE = {
    NONE: "none",
    YAWPITCH: "yawPitch",
    VR: "VR"
  };

  var _Promise = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;
  var X_AXIS_VECTOR = fromValues$4(1, 0, 0);
  var Y_AXIS_VECTOR = fromValues$4(0, 1, 0); // Quaternion to rotate from sensor coordinates to WebVR coordinates

  var SENSOR_TO_VR = setAxisAngle(create$6(), X_AXIS_VECTOR, -Math.PI / 2);

  var DeviceSensorInput =
  /*#__PURE__*/
  function () {
    var DeviceSensorInput =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(DeviceSensorInput, _Component);

      function DeviceSensorInput(gyroMode) {
        var _this;

        _this = _Component.call(this) || this;

        _this._onFirstRead = function () {
          var sensor = _this._sensor;

          var quaternion = _this._getOrientation();

          var minusZDir = fromValues$4(0, 0, -1);
          var firstViewDir = transformQuat(create$4(), minusZDir, quaternion);
          var yawOffset = util.yawOffsetBetween(firstViewDir, minusZDir);

          if (yawOffset === 0) {
            // If the yawOffset is exactly 0, then device sensor is not ready
            // So read it again until it has any value in it
            return;
          }

          var modifyQuat = setAxisAngle(create$6(), Y_AXIS_VECTOR, -yawOffset);
          mul$6(SENSOR_TO_VR, modifyQuat, SENSOR_TO_VR);
          _this._calibrated = true;
          sensor.removeEventListener("reading", _this._onFirstRead);
          sensor.addEventListener("reading", _this._onSensorRead);
        };

        _this._onSensorRead = function () {
          if (_this._observer && _this._gyroMode === GYRO_MODE.YAWPITCH) {
            var delta = _this.getYawPitchDelta();

            _this._observer.change(_assertThisInitialized(_this), {}, {
              yaw: delta.yaw,
              pitch: delta.pitch
            });
          }

          _this.trigger("change", {
            isTrusted: true
          });
        };

        _this._enabled = false;
        _this._calibrated = false;
        _this._sensor = new RelativeOrientationSensor({
          frequency: 60,
          coordinateSystem: "screen",
          // for polyfill
          referenceFrame: "screen"
        });
        _this._prevQuaternion = null;
        _this._gyroMode = gyroMode; // @egjs/axes related

        _this._observer = null;
        _this.axes = null;
        return _this;
      }

      var _proto = DeviceSensorInput.prototype;

      _proto.mapAxes = function mapAxes(axes) {
        this.axes = axes;
      };

      _proto.connect = function connect(observer) {
        if (this._observer) {
          return this;
        }

        this._observer = observer;
        return this;
      };

      _proto.disconnect = function disconnect() {
        if (!this._observer) {
          return this;
        }

        this._observer = null;
        return this;
      };

      _proto.setGyroMode = function setGyroMode(gyroMode) {
        this._gyroMode = gyroMode;
      };

      _proto.enable = function enable() {
        var _this2 = this;

        if (this._enabled) {
          return _Promise.resolve("Sensor already enabled");
        }

        if (!navigator || !navigator.permissions) {
          // iOS
          this._startSensor();

          return _Promise.resolve();
        }

        return _Promise.all([navigator.permissions.query({
          name: "accelerometer"
        }), navigator.permissions.query({
          name: "gyroscope"
        })]).then(function (results) {
          if (results.every(function (result) {
            return result.state === "granted";
          })) {
            _this2._startSensor();
          }
        })["catch"](function () {
          // Start it anyway, workaround for Firefox
          _this2._startSensor();
        });
      };

      _proto.disable = function disable() {
        if (!this._enabled) {
          return;
        }

        this._prevQuaternion = null;

        this._sensor.removeEventListener("read", this._onSensorRead);

        this._sensor.stop();
      };

      _proto.isEnabled = function isEnabled() {
        return this._enabled;
      };

      _proto.getYawPitchDelta = function getYawPitchDelta() {
        var prevQuat = this._prevQuaternion;

        var currentQuat = this._getOrientation();

        if (!prevQuat) {
          this._prevQuaternion = currentQuat;
          return {
            yaw: 0,
            pitch: 0
          };
        }

        var result = {
          yaw: getDeltaYaw(prevQuat, currentQuat),
          pitch: getDeltaPitch(prevQuat, currentQuat)
        };
        copy$6(prevQuat, currentQuat);
        return result;
      };

      _proto.getCombinedQuaternion = function getCombinedQuaternion(yaw) {
        var currentQuat = this._getOrientation();

        if (!this._prevQuaternion) {
          this._prevQuaternion = copy$6(create$6(), currentQuat);
        }

        var yawQ = setAxisAngle(create$6(), Y_AXIS_VECTOR, toRadian(yaw));
        var outQ = multiply$6(create$6(), yawQ, currentQuat);
        conjugate(outQ, outQ);
        copy$6(this._prevQuaternion, currentQuat);
        return outQ;
      };

      _proto.getDeviceHorizontalRight = function getDeviceHorizontalRight(quaternion) {
        var currentQuat = quaternion || this._getOrientation();

        var unrotateQuat = conjugate(create$6(), currentQuat); // Assume that unrotated device center pos is at (0, 0, -1)

        var origViewDir = fromValues$4(0, 0, -1);
        var viewDir = transformQuat(create$4(), origViewDir, currentQuat); // Where is the right, in current view direction

        var viewXAxis = cross(create$4(), viewDir, Y_AXIS_VECTOR);
        var deviceHorizontalDir = add$4(create$4(), viewDir, viewXAxis);
        var unrotatedHorizontalDir = create$4();
        transformQuat(unrotatedHorizontalDir, deviceHorizontalDir, unrotateQuat);
        sub$4(unrotatedHorizontalDir, unrotatedHorizontalDir, origViewDir);
        unrotatedHorizontalDir[2] = 0; // Remove z element

        normalize(unrotatedHorizontalDir, unrotatedHorizontalDir);
        return unrotatedHorizontalDir;
      };

      _proto.destroy = function destroy() {
        this.disable();
      };

      _proto._getOrientation = function _getOrientation() {
        if (!this._sensor.quaternion) {
          return create$6();
        }

        return multiply$6(create$6(), SENSOR_TO_VR, this._sensor.quaternion);
      };

      _proto._startSensor = function _startSensor() {
        var sensor = this._sensor;
        sensor.start();

        if (!this._calibrated) {
          sensor.addEventListener("reading", this._onFirstRead);
        } else {
          sensor.addEventListener("reading", this._onSensorRead);
        }

        this._enabled = true;
      };

      return DeviceSensorInput;
    }(Component);

    return DeviceSensorInput;
  }();

  var VERSION = "3.3.0-snapshot";

  var _Promise$1 = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;
  var DEFAULT_YAW_RANGE = [-YAW_RANGE_HALF, YAW_RANGE_HALF];
  var DEFAULT_PITCH_RANGE = [-PITCH_RANGE_HALF, PITCH_RANGE_HALF];
  var CIRCULAR_PITCH_RANGE = [-CIRCULAR_PITCH_RANGE_HALF, CIRCULAR_PITCH_RANGE_HALF];
  /**
   * A module used to provide coordinate based on yaw/pitch orientation. This module receives user touch action, keyboard, mouse and device orientation(if it exists) as input, then combines them and converts it to yaw/pitch coordinates.
   *
   * @alias eg.YawPitchControl
   * @extends eg.Component
   *
   * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   */

  var YawPitchControl =
  /*#__PURE__*/
  function () {
    var YawPitchControl =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(YawPitchControl, _Component);

      // Expose DeviceOrientationControls sub module for test purpose

      /**
       * @param {Object} options The option object of the eg.YawPitch module
       * @param {Element}[options.element=null] element A base element for the eg.YawPitch module
       * @param {Number} [options.yaw=0] initial yaw (degree)
       * @param {Number} [options.pitch=0] initial pitch (degree)
       * @param {Number} [options.fov=65] initial field of view (degree)
       * @param {Boolean} [optiosn.showPolePoint=true] Indicates whether pole is shown
       * @param {Boolean} [options.useZoom=true] Indicates whether zoom is available
       * @param {Boolean} [options.useKeyboard=true] Indicates whether keyboard is enabled
       * @param {String} [config.gyroMode=yawPitch] Enables control through device motion.
       * @param {Number} [options.touchDirection=TOUCH_DIRECTION_ALL] Direction of the touch movement (TOUCH_DIRECTION_ALL: all,  TOUCH_DIRECTION_YAW: horizontal, TOUCH_DIRECTION_PITCH: vertical, TOUCH_DIRECTION_NONE: no move)
       * @param {Array} [options.yawRange=[-180, 180] Range of visible yaw
       * @param {Array} [options.pitchRange=[-90, 90] Range of visible pitch
       * @param {Array} [options.fovRange=[30, 110] Range of FOV
       * @param {Number} [options.aspectRatio=1] Aspect Ratio
       */
      function YawPitchControl(options) {
        var _this;

        _this = _Component.call(this) || this;

        var opt = _extends({
          element: null,
          yaw: 0,
          pitch: 0,
          fov: 65,
          showPolePoint: false,
          useZoom: true,
          useKeyboard: true,
          gyroMode: GYRO_MODE.YAWPITCH,
          touchDirection: TOUCH_DIRECTION_ALL,
          yawRange: DEFAULT_YAW_RANGE,
          pitchRange: DEFAULT_PITCH_RANGE,
          fovRange: [30, 110],
          aspectRatio: 1
          /* TODO: Need Mandatory? */

        }, options);

        _this._element = opt.element;
        _this._initialFov = opt.fov;
        _this._enabled = false;
        _this._isAnimating = false;
        _this._deviceSensor = new DeviceSensorInput().on("change", function (e) {
          _this._triggerChange(e);
        });

        _this._initAxes(opt);

        _this.option(opt);

        return _this;
      }

      var _proto = YawPitchControl.prototype;

      _proto._initAxes = function _initAxes(opt) {
        var _this2 = this;

        var yRange = this._updateYawRange(opt.yawRange, opt.fov, opt.aspectRatio);

        var pRange = this._updatePitchRange(opt.pitchRange, opt.fov, opt.showPolePoint);

        var useRotation = opt.gyroMode === GYRO_MODE.VR;
        this.axesPanInput = new RotationPanInput(this._element, {
          useRotation: useRotation
        }, this._deviceSensor);
        this.axesWheelInput = new Axes.WheelInput(this._element, {
          scale: -4
        });
        this.axesPinchInput = SUPPORT_TOUCH ? new Axes.PinchInput(this._element, {
          scale: -1
        }) : null;
        this.axesMoveKeyInput = new Axes.MoveKeyInput(this._element, {
          scale: [-6, 6]
        });
        this.axes = new Axes({
          yaw: {
            range: yRange,
            circular: YawPitchControl.isCircular(yRange),
            bounce: [0, 0]
          },
          pitch: {
            range: pRange,
            circular: YawPitchControl.isCircular(pRange),
            bounce: [0, 0]
          },
          fov: {
            range: opt.fovRange,
            circular: [false, false],
            bounce: [0, 0]
          }
        }, {
          deceleration: MC_DECELERATION,
          maximumDuration: MC_MAXIMUM_DURATION
        }, {
          yaw: opt.yaw,
          pitch: opt.pitch,
          fov: opt.fov
        }).on({
          hold: function hold(evt) {
            // Restore maximumDuration not to be spin too mush.
            _this2.axes.options.maximumDuration = MC_MAXIMUM_DURATION;

            _this2.trigger("hold", {
              isTrusted: evt.isTrusted
            });
          },
          change: function change(evt) {
            if (evt.delta.fov !== 0) {
              _this2._updateControlScale(evt);

              _this2.updatePanScale();
            }

            _this2._triggerChange(evt);
          },
          release: function release(evt) {
            _this2._triggerChange(evt);
          },
          animationStart: function animationStart(evt) {},
          animationEnd: function animationEnd(evt) {
            _this2.trigger("animationEnd", {
              isTrusted: evt.isTrusted
            });
          }
        });
      }
      /**
       * Update Pan Scale
       *
       * Scale(Sensitivity) values of panning is related with fov and height.
       * If at least one of them is changed, this function need to be called.
       * @param {*} param
       */
      ;

      _proto.updatePanScale = function updatePanScale(param) {
        if (param === void 0) {
          param = {};
        }

        var fov = this.axes.get().fov;
        var areaHeight = param.height || parseInt(getComputedStyle(this._element).height, 10);
        var scale$$1 = MC_BIND_SCALE[0] * fov / this._initialFov * PAN_SCALE / areaHeight;
        this.axesPanInput.options.scale = [scale$$1, scale$$1];
        this.axes.options.deceleration = MC_DECELERATION * fov / MAX_FIELD_OF_VIEW;
        return this;
      }
      /*
       * Override component's option method
       * to call method for updating values which is affected by option change.
       *
       * @param {*} args
       */
      ;

      _proto.option = function option() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var argLen = args.length; // Getter

        if (argLen === 0) {
          return this._getOptions();
        } else if (argLen === 1 && typeof args[0] === "string") {
          return this._getOptions(args[0]);
        } // Setter


        var beforeOptions = _extends({}, this.options);

        var newOptions = {};
        var changedKeyList = []; // TODO: if value is not changed, then do not push on changedKeyList.

        if (argLen === 1) {
          changedKeyList = Object.keys(args[0]);
          newOptions = _extends({}, args[0]);
        } else if (argLen >= 2) {
          changedKeyList.push(args[0]);
          newOptions[args[0]] = args[1];
        }

        this._setOptions(this._getValidatedOptions(newOptions));

        this._applyOptions(changedKeyList, beforeOptions);

        return this;
      };

      _proto._getValidatedOptions = function _getValidatedOptions(newOptions) {
        if (newOptions.yawRange) {
          newOptions.yawRange = this._getValidYawRange(newOptions.yawRange, newOptions.fov, newOptions.aspectRatio);
        }

        if (newOptions.pitchRange) {
          newOptions.pitchRange = this._getValidPitchRange(newOptions.pitchRange, newOptions.fov);
        }

        return newOptions;
      };

      _proto._getOptions = function _getOptions(key) {
        var value;

        if (typeof key === "string") {
          value = this.options[key];
        } else if (arguments.length === 0) {
          value = this.options;
        }

        return value;
      };

      _proto._setOptions = function _setOptions(options) {
        for (var key in options) {
          this.options[key] = options[key];
        }
      };

      _proto._applyOptions = function _applyOptions(keys, prevOptions) {
        var options = this.options;
        var axes = this.axes;
        var isVR = options.gyroMode === GYRO_MODE.VR;
        var isYawPitch = options.gyroMode === GYRO_MODE.YAWPITCH; // If it's VR mode, restrict user interaction to yaw direction only

        var touchDirection = isVR ? TOUCH_DIRECTION_YAW & options.touchDirection : options.touchDirection; // If one of below is changed, call updateControlScale()

        if (keys.some(function (key) {
          return key === "showPolePoint" || key === "fov" || key === "aspectRatio" || key === "yawRange" || key === "pitchRange";
        })) {
          // If fov is changed, update pan scale
          if (keys.indexOf("fov") >= 0) {
            axes.setTo({
              "fov": options.fov
            });
            this.updatePanScale();
          }

          this._updateControlScale();
        }

        if (keys.some(function (key) {
          return key === "fovRange";
        })) {
          var fovRange = options.fovRange;
          var prevFov = axes.get().fov;
          var nextFov = axes.get().fov;
          copy$8(axes.axis.fov.range, fovRange);

          if (nextFov < fovRange[0]) {
            nextFov = fovRange[0];
          } else if (prevFov > fovRange[1]) {
            nextFov = fovRange[1];
          }

          if (prevFov !== nextFov) {
            axes.setTo({
              fov: nextFov
            }, 0);

            this._updateControlScale();

            this.updatePanScale();
          }
        }

        if (keys.some(function (key) {
          return key === "gyroMode";
        }) && SUPPORT_DEVICEMOTION) {
          if (!isVR && !isYawPitch) {
            axes.disconnect(this._deviceSensor);

            this._deviceSensor.disable();
          } else {
            axes.connect(["yaw", "pitch"], this._deviceSensor);

            this._deviceSensor.enable()["catch"](function () {}); // Device motion enabling can fail on iOS

          }

          this._deviceSensor.setGyroMode(options.gyroMode);

          if (isVR) {
            this.axesPanInput.setUseRotation(isVR);
          }
        }

        if (keys.some(function (key) {
          return key === "useKeyboard";
        })) {
          var useKeyboard = options.useKeyboard;

          if (useKeyboard) {
            axes.connect(["yaw", "pitch"], this.axesMoveKeyInput);
          } else {
            axes.disconnect(this.axesMoveKeyInput);
          }
        }

        if (keys.some(function (key) {
          return key === "useZoom";
        })) {
          var useZoom = options.useZoom; // Disconnect first

          axes.disconnect(this.axesWheelInput);

          if (useZoom) {
            axes.connect(["fov"], this.axesWheelInput);
          }
        }

        this._togglePinchInputByOption(options.touchDirection, options.useZoom);

        if (keys.some(function (key) {
          return key === "touchDirection";
        })) {
          this._enabled && this._enableTouch(touchDirection);
        }
      };

      _proto._togglePinchInputByOption = function _togglePinchInputByOption(touchDirection, useZoom) {
        if (this.axesPinchInput) {
          // disconnect first
          this.axes.disconnect(this.axesPinchInput); // If the touchDirection option is not ALL, pinchInput should be disconnected to make use of a native scroll.

          if (useZoom && touchDirection === TOUCH_DIRECTION_ALL && // TODO: Get rid of using private property of axes instance.
          this.axes._inputs.indexOf(this.axesPinchInput) === -1) {
            this.axes.connect(["fov"], this.axesPinchInput);
          }
        }
      };

      _proto._enableTouch = function _enableTouch(direction) {
        // Disconnect first
        this.axesPanInput && this.axes.disconnect(this.axesPanInput);
        var yawEnabled = direction & TOUCH_DIRECTION_YAW ? "yaw" : null;
        var pitchEnabled = direction & TOUCH_DIRECTION_PITCH ? "pitch" : null;
        this.axes.connect([yawEnabled, pitchEnabled], this.axesPanInput);
      };

      _proto._getValidYawRange = function _getValidYawRange(newYawRange, newFov, newAspectRatio) {
        var ratio = YawPitchControl.adjustAspectRatio(newAspectRatio || this.options.aspectRatio || 1);
        var fov = newFov || this.axes.get().fov;
        var horizontalFov = fov * ratio;
        var isValid = newYawRange[1] - newYawRange[0] >= horizontalFov;

        if (isValid) {
          return newYawRange;
        } else {
          return this.options.yawRange || DEFAULT_YAW_RANGE;
        }
      };

      _proto._getValidPitchRange = function _getValidPitchRange(newPitchRange, newFov) {
        var fov = newFov || this.axes.get().fov;
        var isValid = newPitchRange[1] - newPitchRange[0] >= fov;

        if (isValid) {
          return newPitchRange;
        } else {
          return this.options.pitchRange || DEFAULT_PITCH_RANGE;
        }
      };

      YawPitchControl.isCircular = function isCircular(range) {
        return range[1] - range[0] < 360 ? [false, false] : [true, true];
      }
      /**
       * Update yaw/pitch min/max by 5 factor
       *
       * 1. showPolePoint
       * 2. fov
       * 3. yawRange
       * 4. pitchRange
       * 5. aspectRatio
       *
       * If one of above is changed, call this function
       */
      ;

      _proto._updateControlScale = function _updateControlScale(changeEvt) {
        var opt = this.options;
        var fov = this.axes.get().fov;

        var pRange = this._updatePitchRange(opt.pitchRange, fov, opt.showPolePoint);

        var yRange = this._updateYawRange(opt.yawRange, fov, opt.aspectRatio); // TODO: If not changed!?


        var pos = this.axes.get();
        var y = pos.yaw;
        var p = pos.pitch;
        copy$8(this.axes.axis.yaw.range, yRange);
        copy$8(this.axes.axis.pitch.range, pRange);
        this.axes.axis.yaw.circular = YawPitchControl.isCircular(yRange);
        this.axes.axis.pitch.circular = YawPitchControl.isCircular(pRange);
        /**
         * update yaw/pitch by it's range.
         */

        if (y < yRange[0]) {
          y = yRange[0];
        } else if (y > yRange[1]) {
          y = yRange[1];
        }

        if (p < pRange[0]) {
          p = pRange[0];
        } else if (p > pRange[1]) {
          p = pRange[1];
        }

        if (changeEvt) {
          changeEvt.set({
            yaw: y,
            pitch: p
          });
        }

        this.axes.setTo({
          yaw: y,
          pitch: p
        }, 0);
        return this;
      };

      _proto._updatePitchRange = function _updatePitchRange(pitchRange, fov, showPolePoint) {
        if (this.options.gyroMode === GYRO_MODE.VR) {
          // Circular pitch on VR
          return CIRCULAR_PITCH_RANGE;
        }

        var verticalAngle = pitchRange[1] - pitchRange[0];
        var halfFov = fov / 2;
        var isPanorama = verticalAngle < 180;

        if (showPolePoint && !isPanorama) {
          // Use full pinch range
          return pitchRange.concat();
        } // Round value as movableCood do.


        return [pitchRange[0] + halfFov, pitchRange[1] - halfFov];
      };

      _proto._updateYawRange = function _updateYawRange(yawRange, fov, aspectRatio) {
        if (this.options.gyroMode === GYRO_MODE.VR) {
          return DEFAULT_YAW_RANGE;
        }

        var horizontalAngle = yawRange[1] - yawRange[0];
        /**
         * Full 360 Mode
         */

        if (horizontalAngle >= 360) {
          // Don't limit yaw range on Full 360 mode.
          return yawRange.concat();
        }
        /**
         * Panorama mode
         */
        // Ref : https://github.com/naver/egjs-view360/issues/290


        var halfHorizontalFov = util.toDegree(Math.atan2(aspectRatio, 1 / Math.tan(toRadian(fov / 2)))); // Round value as movableCood do.

        return [yawRange[0] + halfHorizontalFov, yawRange[1] - halfHorizontalFov];
      };

      _proto._triggerChange = function _triggerChange(evt) {
        var pos = this.axes.get();
        var opt = this.options;
        var event = {
          targetElement: opt.element,
          isTrusted: evt.isTrusted
        };
        event.yaw = pos.yaw;
        event.pitch = pos.pitch;
        event.fov = pos.fov;

        if (opt.gyroMode === GYRO_MODE.VR) {
          event.quaternion = this._deviceSensor.getCombinedQuaternion(pos.yaw);
        }

        this.trigger("change", event);
      } // TODO: makes constant to be logic
      ;

      YawPitchControl.adjustAspectRatio = function adjustAspectRatio(input) {
        var inputRange = [0.520, 0.540, 0.563, 0.570, 0.584, 0.590, 0.609, 0.670, 0.702, 0.720, 0.760, 0.780, 0.820, 0.920, 0.970, 1.00, 1.07, 1.14, 1.19, 1.25, 1.32, 1.38, 1.40, 1.43, 1.53, 1.62, 1.76, 1.77, 1.86, 1.96, 2.26, 2.30, 2.60, 3.00, 5.00, 6.00];
        var outputRange = [0.510, 0.540, 0.606, 0.560, 0.628, 0.630, 0.647, 0.710, 0.736, 0.757, 0.780, 0.770, 0.800, 0.890, 0.975, 1.00, 1.07, 1.10, 1.15, 1.18, 1.22, 1.27, 1.30, 1.33, 1.39, 1.45, 1.54, 1.55, 1.58, 1.62, 1.72, 1.82, 1.92, 2.00, 2.24, 2.30];
        var rangeIdx = -1;

        for (var i = 0; i < inputRange.length - 1; i++) {
          if (inputRange[i] <= input && inputRange[i + 1] >= input) {
            rangeIdx = i;
            break;
          }
        }

        if (rangeIdx === -1) {
          if (inputRange[0] > input) {
            return outputRange[0];
          } else {
            return outputRange[outputRange[0].length - 1];
          }
        }

        var inputA = inputRange[rangeIdx];
        var inputB = inputRange[rangeIdx + 1];
        var outputA = outputRange[rangeIdx];
        var outputB = outputRange[rangeIdx + 1];
        return YawPitchControl.lerp(outputA, outputB, (input - inputA) / (inputB - inputA));
      };

      YawPitchControl.lerp = function lerp$$1(a, b, fraction) {
        return a + fraction * (b - a);
      }
      /**
       * Enable YawPitch functionality
       *
       * @method eg.YawPitch#enable
       */
      ;

      _proto.enable = function enable() {
        if (this._enabled) {
          return this;
        }

        this._enabled = true; // touchDirection is decided by parameter is valid string (Ref. Axes.connect)

        this._applyOptions(Object.keys(this.options), this.options); // TODO: Is this code is needed? Check later.


        this.updatePanScale();
        this.enableSensor()["catch"](function () {// This can fail when it's not triggered by user interaction on iOS13+
          // Just ignore the rejection
        });
        return this;
      }
      /**
       * Disable YawPitch functionality
       *
       * @method eg.YawPitch#disable
       */
      ;

      _proto.disable = function disable(persistOrientation) {
        if (!this._enabled) {
          return this;
        } // TODO: Check peristOrientation is needed!


        if (!persistOrientation) {
          this._resetOrientation();
        }

        this.axes.disconnect();
        this.disableSensor();
        this._enabled = false;
        return this;
      };

      _proto._resetOrientation = function _resetOrientation() {
        var opt = this.options;
        this.axes.setTo({
          yaw: opt.yaw,
          pitch: opt.pitch,
          fov: opt.fov
        }, 0);
        return this;
      }
      /**
       * Set one or more of yaw, pitch, fov
       *
       * @param {Object} coordinate yaw, pitch, fov
       * @param {Number} duration Animation duration. if it is above 0 then it's animated.
       */
      ;

      _proto.lookAt = function lookAt$$1(_ref, duration) {
        var yaw = _ref.yaw,
            pitch = _ref.pitch,
            fov = _ref.fov;
        var pos = this.axes.get();
        var y = yaw === undefined ? 0 : yaw - pos.yaw;
        var p = pitch === undefined ? 0 : pitch - pos.pitch;
        var f = fov === undefined ? 0 : fov - pos.fov; // Allow duration of animation to have more than MC_MAXIMUM_DURATION.

        this.axes.options.maximumDuration = Infinity;
        this.axes.setBy({
          yaw: y,
          pitch: p,
          fov: f
        }, duration);
      };

      _proto.enableSensor = function enableSensor() {
        var _this3 = this;

        return new _Promise$1(function (resolve, reject) {
          var activateSensor = function activateSensor() {
            if (_this3.options.gyroMode !== GYRO_MODE.NONE) {
              _this3._deviceSensor.enable();

              resolve();
            } else {
              reject(new Error("gyroMode not set"));
            }
          };

          if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
            DeviceMotionEvent.requestPermission().then(function (permissionState) {
              if (permissionState === "granted") {
                activateSensor();
              } else {
                reject(new Error("denied"));
              }
            })["catch"](function (e) {
              // This can happen when this method was't triggered by user interaction
              reject(e);
            });
          } else {
            activateSensor();
          }
        });
      };

      _proto.disableSensor = function disableSensor() {
        this._deviceSensor.disable();
      };

      _proto.getYawPitch = function getYawPitch() {
        var yawPitch = this.axes.get();
        return {
          yaw: yawPitch.yaw,
          pitch: yawPitch.pitch
        };
      };

      _proto.getFov = function getFov() {
        return this.axes.get().fov;
      };

      _proto.getQuaternion = function getQuaternion() {
        var pos = this.axes.get();
        return this._deviceSensor.getCombinedQuaternion(pos.yaw);
      };

      _proto.shouldRenderWithQuaternion = function shouldRenderWithQuaternion() {
        return this.options.gyroMode === GYRO_MODE.VR;
      }
      /**
       * Destroys objects
       */
      ;

      _proto.destroy = function destroy() {
        this.axes && this.axes.destroy();
        this.axisPanInput && this.axisPanInput.destroy();
        this.axesWheelInput && this.axesWheelInput.destroy();
        this.axesDeviceOrientationInput && this.axesDeviceOrientationInput.destroy();
        this.axesPinchInput && this.axesPinchInput.destroy();
        this.axesMoveKeyInput && this.axesMoveKeyInput.destroy();
        this._deviceSensor && this._deviceSensor.destroy();
      };

      return YawPitchControl;
    }(Component);

    YawPitchControl.VERSION = VERSION;
    YawPitchControl.CONTROL_MODE_VR = CONTROL_MODE_VR;
    YawPitchControl.CONTROL_MODE_YAWPITCH = CONTROL_MODE_YAWPITCH;
    YawPitchControl.TOUCH_DIRECTION_ALL = TOUCH_DIRECTION_ALL;
    YawPitchControl.TOUCH_DIRECTION_YAW = TOUCH_DIRECTION_YAW;
    YawPitchControl.TOUCH_DIRECTION_PITCH = TOUCH_DIRECTION_PITCH;
    YawPitchControl.TOUCH_DIRECTION_NONE = TOUCH_DIRECTION_NONE;
    return YawPitchControl;
  }();

  var _Promise$2 = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;
  var STATUS = {
    "NONE": 0,
    "LOADING": 1,
    "LOADED": 2,
    "ERROR": 3
  };
  var EVENT = {
    "READYSTATECHANGE": "readystatechange"
  };

  var ImageLoader =
  /*#__PURE__*/
  function () {
    var ImageLoader =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(ImageLoader, _Component);

      function ImageLoader(image) {
        var _this;

        // Super constructor
        _this = _Component.call(this) || this;
        _this._image = null;
        _this._onceHandlers = [];
        _this._loadStatus = STATUS.NONE;
        image && _this.set(image);
        return _this;
      }

      var _proto = ImageLoader.prototype;

      _proto.get = function get() {
        var _this2 = this;

        return new _Promise$2(function (res, rej) {
          if (!_this2._image) {
            rej("ImageLoader: image is not defiend");
          } else if (_this2._loadStatus === STATUS.LOADED) {
            res(_this2.getElement());
          } else if (_this2._loadStatus === STATUS.LOADING) {
            /* Check isMaybeLoaded() first because there may have
            	posibilities that image already loaded before get is called.
            	for example calling get on external image onload callback.*/
            if (ImageLoader.isMaybeLoaded(_this2._image)) {
              _this2._loadStatus = STATUS.LOADED;
              res(_this2.getElement());
            } else {
              _this2.on(EVENT.READYSTATECHANGE, function (e) {
                if (e.type === STATUS.LOADED) {
                  res(_this2.getElement());
                } else {
                  rej("ImageLoader: failed to load images.");
                }
              });
            }
          } else {
            rej("ImageLoader: failed to load images");
          }
        });
      }
      /**
       * @param image img element or img url or array of img element or array of img url
       */
      ;

      _proto.set = function set(image) {
        var _this3 = this;

        this._loadStatus = STATUS.LOADING;
        this._image = ImageLoader.createElement(image);

        if (ImageLoader.isMaybeLoaded(this._image)) {
          this._loadStatus = STATUS.LOADED;
          return;
        }

        this.onceLoaded(this._image, function () {
          _this3._loadStatus = STATUS.LOADED;

          _this3.trigger(EVENT.READYSTATECHANGE, {
            type: STATUS.LOADED
          });
        }, function () {
          _this3._loadStatus = STATUS.ERROR;

          _this3.trigger(EVENT.READYSTATECHANGE, {
            type: STATUS.ERROR
          });
        });
      };

      ImageLoader.createElement = function createElement(image) {
        var images = image instanceof Array ? image : [image];
        return images.map(function (img) {
          var _img = img;

          if (typeof img === "string") {
            _img = new Image();
            _img.crossOrigin = "anonymous";
            _img.src = img;
          }

          return _img;
        });
      };

      _proto.getElement = function getElement() {
        return this._image.length === 1 ? this._image[0] : this._image;
      };

      ImageLoader.isMaybeLoaded = function isMaybeLoaded(image) {
        var result = false;

        if (image instanceof Image) {
          result = image.complete && image.naturalWidth !== 0;
        } else if (image instanceof Array) {
          result = !image.some(function (img) {
            return !img.complete || img.naturalWidth === 0;
          });
        }

        return result;
      };

      _proto.onceLoaded = function onceLoaded(target, onload, onerror) {
        var _this4 = this;

        var targets = target instanceof Array ? target : [target];
        var targetsNotLoaded = targets.filter(function (img) {
          return !ImageLoader.isMaybeLoaded(img);
        });
        var loadPromises = targetsNotLoaded.map(function (img) {
          return new _Promise$2(function (res, rej) {
            _this4._once(img, "load", function () {
              return res(img);
            });

            _this4._once(img, "error", function () {
              return rej(img);
            });
          });
        });

        _Promise$2.all(loadPromises).then(function (result) {
          return onload(targets.length === 1 ? targets[0] : targets);
        }, function (reason) {
          return onerror(reason);
        });
      };

      _proto._once = function _once(target, type, listener) {
        var fn = function fn(event) {
          target.removeEventListener(type, fn);
          listener(event);
        };

        target.addEventListener(type, fn);

        this._onceHandlers.push({
          target: target,
          type: type,
          fn: fn
        });
      };

      _proto.getStatus = function getStatus() {
        return this._loadStatus;
      };

      _proto.destroy = function destroy() {
        this._onceHandlers.forEach(function (handler) {
          handler.target.removeEventListener(handler.type, handler.fn);
        });

        this._onceHandlers = [];
        this._image.src = "";
        this._image = null;
        this._loadStatus = STATUS.NONE;
      };

      return ImageLoader;
    }(Component);

    ImageLoader.STATUS = STATUS;
    return ImageLoader;
  }();

  var _Promise$3 = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;

  // import Agent from "@egjs/agent";

  /* Ref https://www.w3schools.com/tags/av_prop_readystate.asp */
  var READY_STATUS = {
    HAVE_NOTHING: 0,
    // no information whether or not the audio/video is ready
    HAVE_METADATA: 1,
    // HAVE_METADATA - metadata for the audio/video is ready
    HAVE_CURRENT_DATA: 2,
    // data for the current playback position is available, but not enough data to play next frame/millisecond
    HAVE_FUTURE_DATA: 3,
    // data for the current and at least the next frame is available
    HAVE_ENOUGH_DATA: 4,
    // enough data available to start playing
    // below is custom status for failed to load status
    LOADING_FAILED: -1
  };
  var READYSTATECHANGE_EVENT_NAME = {};
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_METADATA] = "loadedmetadata";
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_CURRENT_DATA] = "loadeddata";
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_FUTURE_DATA] = "canplay";
  READYSTATECHANGE_EVENT_NAME[READY_STATUS.HAVE_ENOUGH_DATA] = "canplaythrough";

  var VideoLoader =
  /*#__PURE__*/
  function () {
    function VideoLoader(video) {
      this._handlers = [];
      this._sourceCount = 0; // on iOS safari, 'loadeddata' will not triggered unless the user hits play,
      // so used 'loadedmetadata' instead.

      this._thresholdReadyState = READY_STATUS.HAVE_METADATA;
      this._thresholdEventName = READYSTATECHANGE_EVENT_NAME[this._thresholdReadyState];
      this._loadStatus = video && video.readyState || READY_STATUS.HAVE_NOTHING;
      this._onerror = this._onerror.bind(this);
      video && this.set(video);
    }

    var _proto = VideoLoader.prototype;

    _proto._onerror = function _onerror() {
      this._errorCount++;

      if (this._errorCount >= this._sourceCount) {
        this._loadStatus = READY_STATUS.LOADING_FAILED;

        this._detachErrorHandler(this._onerror);
      }
    }
    /**
     *
     * @param {Object | String} video Object or String containing Video Source URL<ko>비디오 URL 정보를 담고 있는 문자열이나 객체 {type, src}</ko>
     */
    ;

    _proto._appendSourceElement = function _appendSourceElement(videoUrl) {
      var videoSrc;
      var videoType;

      if (typeof videoUrl === "object") {
        videoSrc = videoUrl.src;
        videoType = videoUrl.type;
      } else if (typeof videoUrl === "string") {
        videoSrc = videoUrl;
      }

      if (!videoSrc) {
        return false;
      }

      var sourceElement = document.createElement("source");
      sourceElement.src = videoSrc;
      videoType && (sourceElement.type = videoType);

      this._video.appendChild(sourceElement);

      return true;
    };

    _proto.set = function set(video) {
      var _this = this;

      this._reset(); // reset resources.


      if (!video) {
        return;
      }

      if (video instanceof HTMLVideoElement) {
        // video tag
        this._video = video;
      } else if (typeof video === "string" || typeof video === "object") {
        // url
        this._video = document.createElement("video");

        this._video.setAttribute("crossorigin", "anonymous");

        this._video.setAttribute("webkit-playsinline", "");

        this._video.setAttribute("playsinline", "");

        if (video instanceof Array) {
          video.forEach(function (v) {
            return _this._appendSourceElement(v);
          });
        } else {
          this._appendSourceElement(video);
        }

        this._sourceCount = this._video.querySelectorAll("source").length;

        if (this._sourceCount > 0) {
          if (this._video.readyState < this._thresholdReadyState) {
            this._video.load(); // attach loading error listener


            this._attachErrorHandler(this._onerror);
          }
        } else {
          this._video = null;
        }
      }
    };

    _proto._attachErrorHandler = function _attachErrorHandler(handler) {
      this._video.addEventListener("error", handler);

      this._sources = this._video.querySelectorAll("source");
      [].forEach.call(this._sources, function (source) {
        source.addEventListener("error", handler);
      });
    };

    _proto._detachErrorHandler = function _detachErrorHandler(handler) {
      this._video.removeEventListener("error", handler);

      [].forEach.call(this._sources, function (source) {
        source.removeEventListener("error", handler);
      });
    };

    _proto.get = function get() {
      var _this2 = this;

      return new _Promise$3(function (res, rej) {
        if (!_this2._video) {
          rej("VideoLoader: video is undefined");
        } else if (_this2._loadStatus === READY_STATUS.LOADING_FAILED) {
          rej("VideoLoader: video source is invalid");
        } else if (_this2._video.readyState >= _this2._thresholdReadyState) {
          res(_this2._video);
        } else {
          // check errorCnt and reject
          var rejector = function rejector() {
            if (_this2._loadStatus === READY_STATUS.LOADING_FAILED) {
              _this2._detachErrorHandler(rejector);

              rej("VideoLoader: video source is invalid");
            }
          };

          _this2._attachErrorHandler(rejector);

          _this2._once(_this2._thresholdEventName, function () {
            return res(_this2._video);
          });
        }
      });
    };

    _proto.getElement = function getElement() {
      return this._video;
    };

    _proto.destroy = function destroy() {
      this._reset();
    };

    _proto._reset = function _reset() {
      var _this3 = this;

      this._handlers.forEach(function (handler) {
        _this3._video.removeEventListener(handler.type, handler.fn);
      });

      this._handlers = [];
      this._video = null;
      this._sourceCount = 0;
      this._errorCount = 0;
    };

    _proto._once = function _once(type, listener) {
      var target = this._video;

      var fn = function fn(event) {
        target.removeEventListener(type, fn);
        listener(event);
      };
      /* By useCapture mode enabled, you can capture the error event being fired on source(child)*/


      target.addEventListener(type, fn, true);

      this._handlers.push({
        type: type,
        fn: fn
      });
    };

    return VideoLoader;
  }();

  /*
  Copyright (c) 2017 NAVER Corp.
  @egjs/agent project is licensed under the MIT license

  @egjs/agent JavaScript library


  @version 2.1.5
  */
  var win$1 = typeof window !== "undefined" && window || {};
  var RegExp$1 = win$1.RegExp;
  var navigator$1 = win$1.navigator;
  var parseRules = {
    browser: [{
      criteria: "PhantomJS",
      identity: "PhantomJS"
    }, {
      criteria: /Whale/,
      identity: "Whale",
      versionSearch: "Whale"
    }, {
      criteria: /Edge/,
      identity: "Edge",
      versionSearch: "Edge"
    }, {
      criteria: /MSIE|Trident|Windows Phone/,
      identity: "IE",
      versionSearch: "IEMobile|MSIE|rv"
    }, {
      criteria: /MiuiBrowser/,
      identity: "MIUI Browser",
      versionSearch: "MiuiBrowser"
    }, {
      criteria: /SamsungBrowser/,
      identity: "Samsung Internet",
      versionSearch: "SamsungBrowser"
    }, {
      criteria: /SAMSUNG /,
      identity: "Samsung Internet",
      versionSearch: "Version"
    }, {
      criteria: /Chrome|CriOS/,
      identity: "Chrome"
    }, {
      criteria: /Android/,
      identity: "Android Browser",
      versionSearch: "Version"
    }, {
      criteria: /iPhone|iPad/,
      identity: "Safari",
      versionSearch: "Version"
    }, {
      criteria: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    }, {
      criteria: "Firefox",
      identity: "Firefox"
    }],
    os: [{
      criteria: /Windows Phone/,
      identity: "Windows Phone",
      versionSearch: "Windows Phone"
    }, {
      criteria: "Windows 2000",
      identity: "Window",
      versionAlias: "5.0"
    }, {
      criteria: /Windows NT/,
      identity: "Window",
      versionSearch: "Windows NT"
    }, {
      criteria: /iPhone|iPad/,
      identity: "iOS",
      versionSearch: "iPhone OS|CPU OS"
    }, {
      criteria: "Mac",
      versionSearch: "OS X",
      identity: "MAC"
    }, {
      criteria: /Android/,
      identity: "Android"
    }, {
      criteria: /Tizen/,
      identity: "Tizen"
    }, {
      criteria: /Web0S/,
      identity: "WebOS"
    }],
    // Webview check condition
    // ios: If has no version information
    // Android 5.0 && chrome 40+: Presence of "; wv" in userAgent
    // Under android 5.0: Presence of "NAVER" or "Daum" in userAgent
    webview: [{
      criteria: /iPhone|iPad/,
      browserVersionSearch: "Version",
      webviewBrowserVersion: /-1/
    }, {
      criteria: /iPhone|iPad|Android/,
      webviewToken: /NAVER|DAUM|; wv/
    }],
    defaultString: {
      browser: {
        version: "-1",
        name: "unknown"
      },
      os: {
        version: "-1",
        name: "unknown"
      }
    }
  };

  function filter(arr, compare) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      compare(arr[i]) && result.push(arr[i]);
    }

    return result;
  }

  function some(arr, compare) {
    for (var i = 0; i < arr.length; i++) {
      if (compare(arr[i])) {
        return true;
      }
    }

    return false;
  }

  var UA = void 0;

  function setUa(ua) {
    UA = ua;
  }

  function isMatched(base, target) {
    return target && target.test ? !!target.test(base) : base.indexOf(target) > -1;
  }

  function getIdentityStringFromArray(rules, defaultStrings) {
    var matchedRule = filter(rules, function (rule) {
      return isMatched(UA, rule.criteria);
    })[0];
    return matchedRule && matchedRule.identity || defaultStrings.name;
  }

  function getRule(rules, targetIdentity) {
    return filter(rules, function (rule) {
      var criteria = rule.criteria;
      var identityMatched = new RegExp(rule.identity, "i").test(targetIdentity);

      if (criteria ? identityMatched && isMatched(UA, criteria) : identityMatched) {
        return true;
      } else {
        return false;
      }
    })[0];
  }

  function getBrowserName() {
    return getIdentityStringFromArray(parseRules.browser, parseRules.defaultString.browser);
  }

  function getBrowserRule(browserName) {
    var rule = getRule(parseRules.browser, browserName);

    if (!rule) {
      rule = {
        criteria: browserName,
        versionSearch: browserName,
        identity: browserName
      };
    }

    return rule;
  }

  function extractBrowserVersion(versionToken, ua) {
    var browserVersion = parseRules.defaultString.browser.version;
    var versionRegexResult = new RegExp("(" + versionToken + ")", "i").exec(ua);

    if (!versionRegexResult) {
      return browserVersion;
    }

    var versionTokenIndex = versionRegexResult.index;
    var verTkn = versionRegexResult[0];

    if (versionTokenIndex > -1) {
      var versionIndex = versionTokenIndex + verTkn.length + 1;
      browserVersion = ua.substring(versionIndex).split(" ")[0].replace(/_/g, ".").replace(/;|\)/g, "");
    }

    return browserVersion;
  }

  function getBrowserVersion(browserName) {
    if (!browserName) {
      return undefined;
    } // console.log(browserRule);
    // const versionToken = browserRule ? browserRule.versionSearch : browserName;


    var browserRule = getBrowserRule(browserName);
    var versionToken = browserRule.versionSearch || browserName;
    var browserVersion = extractBrowserVersion(versionToken, UA);
    return browserVersion;
  }

  function isWebview() {
    var webviewRules = parseRules.webview;
    var browserVersion = void 0;
    return some(filter(webviewRules, function (rule) {
      return isMatched(UA, rule.criteria);
    }), function (rule) {
      browserVersion = extractBrowserVersion(rule.browserVersionSearch, UA);

      if (isMatched(UA, rule.webviewToken) || isMatched(browserVersion, rule.webviewBrowserVersion)) {
        return true;
      } else {
        return false;
      }
    });
  }

  function getOSRule(osName) {
    return getRule(parseRules.os, osName);
  }

  function getOsName() {
    return getIdentityStringFromArray(parseRules.os, parseRules.defaultString.os);
  }

  function getOsVersion(osName) {
    var osRule = getOSRule(osName) || {};
    var defaultOSVersion = parseRules.defaultString.os.version;
    var osVersion = void 0;

    if (!osName) {
      return undefined;
    }

    if (osRule.versionAlias) {
      return osRule.versionAlias;
    }

    var osVersionToken = osRule.versionSearch || osName;
    var osVersionRegex = new RegExp("(" + osVersionToken + ")\\s([\\d_\\.]+|\\d_0)", "i");
    var osVersionRegexResult = osVersionRegex.exec(UA);

    if (osVersionRegexResult) {
      osVersion = osVersionRegex.exec(UA)[2].replace(/_/g, ".").replace(/;|\)/g, "");
    }

    return osVersion || defaultOSVersion;
  }

  function getOs() {
    var name = getOsName();
    var version = getOsVersion(name);
    return {
      name: name,
      version: version
    };
  }

  function getBrowser() {
    var name = getBrowserName();
    var version = getBrowserVersion(name);
    return {
      name: name,
      version: version,
      webview: isWebview()
    };
  }

  function getIsMobile() {
    return UA.indexOf("Mobi") !== -1;
  }
  /**
   * Copyright (c) NAVER Corp.
   * egjs-agent projects are licensed under the MIT license
   */

  /**
   * @namespace eg.agent
   */

  /**
   * Extracts browser and operating system information from the user agent string.
   * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
   * @function eg.agent#agent
   * @param {String} [userAgent=navigator.userAgent] user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
   * @return {Object} agentInfo
   * @return {Object} agentInfo.os os Operating system information <ko>운영체제 정보</ko>
   * @return {String} agentInfo.os.name Operating system name (android, ios, window, mac, unknown) <ko>운영체제 이름 (android, ios, window, mac, unknown)</ko>
   * @return {String} agentInfo.os.version Operating system version <ko>운영체제 버전</ko>
   * @return {String} agentInfo.browser Browser information <ko>브라우저 정보</ko>
   * @return {String} agentInfo.browser.name Browser name (safari, chrome, sbrowser, ie, firefox, unknown) <ko>브라우저 이름 (safari, chrome, sbrowser, ie, firefox, unknown)</ko>
   * @return {String} agentInfo.browser.version Browser version <ko>브라우저 버전 </ko>
   * @return {Boolean} agentInfo.browser.webview Indicates whether the browser is inapp<ko>웹뷰 브라우저 여부</ko>
   * @return {Boolean} agentInfo.isMobile Indicates whether the browser is for mobile<ko>모바일 브라우저 여부</ko>
   * @example
  import agent from "@egjs/agent";

  const {os, browser, isMobile} = agent();
   */


  function agent() {
    var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator$1.userAgent;
    setUa(ua);
    var agentInfo = {
      os: getOs(),
      browser: getBrowser(),
      isMobile: getIsMobile()
    };
    agentInfo.browser.name = agentInfo.browser.name.toLowerCase();
    agentInfo.os.name = agentInfo.os.name.toLowerCase();
    agentInfo.os.version = agentInfo.os.version.toLowerCase();

    if (agentInfo.os.name === "ios" && agentInfo.browser.webview) {
      agentInfo.browser.version = "-1";
    }

    return agentInfo;
  }
  /**
   * Version info string
   * @ko 버전정보 문자열
   * @name VERSION
   * @static
   * @type {String}
   * @example
   * eg.agent.VERSION;  // ex) 2.2.0
   * @memberof eg.agent
   */


  agent.VERSION = "2.1.5";

  var WEBGL_ERROR_CODE = {
    "0": "NO_ERROR",
    "1280": "INVALID_ENUM",
    "1281": "INVALID_VALUE",
    "1282": "INVALID_OPERATION",
    "1285": "OUT_OF_MEMORY",
    "1286": "INVALID_FRAMEBUFFER_OPERATION",
    "37442": "CONTEXT_LOST_WEBGL"
  };
  var webglAvailability = null;
  var MAX_TEXTURE_SIZE_FOR_TEST = null;

  var WebGLUtils =
  /*#__PURE__*/
  function () {
    function WebGLUtils() {}

    WebGLUtils.createShader = function createShader(gl, type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

      if (success) {
        return shader;
      } else {
        // eslint-disable-next-line
        console.error(gl.getShaderInfoLog(shader));
      }

      return null;
    };

    WebGLUtils.createProgram = function createProgram(gl, vertexShader, fragmentShader) {
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.detachShader(program, vertexShader);
      gl.detachShader(program, fragmentShader);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      var success = gl.getProgramParameter(program, gl.LINK_STATUS);

      if (success) {
        return program;
      }

      gl.deleteProgram(program);
      return null;
    };

    WebGLUtils.initBuffer = function initBuffer(gl, target
    /* bind point */
    , data, itemSize, attr) {
      var buffer = gl.createBuffer();
      gl.bindBuffer(target, buffer);
      gl.bufferData(target, data, gl.STATIC_DRAW);

      if (buffer) {
        buffer.itemSize = itemSize;
        buffer.numItems = data.length / itemSize;
      }

      if (attr !== undefined) {
        gl.enableVertexAttribArray(attr);
        gl.vertexAttribPointer(attr, buffer.itemSize, gl.FLOAT, false, 0, 0);
      }

      return buffer;
    };

    WebGLUtils.getWebglContext = function getWebglContext(canvas, userContextAttributes) {
      var webglIdentifiers = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      var context = null;

      var contextAttributes = _extends({
        preserveDrawingBuffer: false,
        antialias: false,
        xrCompatible: true
      }, userContextAttributes);

      function onWebglcontextcreationerror(e) {
        return e.statusMessage;
      }

      canvas.addEventListener("webglcontextcreationerror", onWebglcontextcreationerror);

      for (var i = 0; i < webglIdentifiers.length; i++) {
        try {
          context = canvas.getContext(webglIdentifiers[i], contextAttributes);
        } catch (t) {}

        if (context) {
          break;
        }
      }

      canvas.removeEventListener("webglcontextcreationerror", onWebglcontextcreationerror);
      return context;
    };

    WebGLUtils.createTexture = function createTexture(gl, textureTarget) {
      var texture = gl.createTexture();
      gl.bindTexture(textureTarget, texture);
      gl.texParameteri(textureTarget, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(textureTarget, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindTexture(textureTarget, null);
      return texture;
    }
    /**
     * Returns the webgl availability of the current browser.
     * @method WebGLUtils#isWebGLAvailable
     * @retuen {Boolean} isWebGLAvailable
     */
    ;

    WebGLUtils.isWebGLAvailable = function isWebGLAvailable() {
      if (webglAvailability === null) {
        var canvas = document.createElement("canvas");
        var webglContext = WebGLUtils.getWebglContext(canvas);
        webglAvailability = !!webglContext; // webglContext Resource forced collection

        if (webglContext) {
          var loseContextExtension = webglContext.getExtension("WEBGL_lose_context");
          loseContextExtension && loseContextExtension.loseContext();
        }
      }

      return webglAvailability;
    }
    /**
     * Returns whether webgl is stable in the current browser.
     * @method WebGLUtils#isStableWebGL
     * @retuen {Boolean} isStableWebGL
     */
    ;

    WebGLUtils.isStableWebGL = function isStableWebGL() {
      var agentInfo = agent();
      var isStableWebgl = true;

      if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) <= 4.3) {
        isStableWebgl = false;
      } else if (agentInfo.os.name === "android" && parseFloat(agentInfo.os.version) === 4.4) {
        if (agentInfo.browser.name !== "chrome") {
          isStableWebgl = false;
        }
      }

      return isStableWebgl;
    };

    WebGLUtils.getErrorNameFromWebGLErrorCode = function getErrorNameFromWebGLErrorCode(code) {
      if (!(code in WEBGL_ERROR_CODE)) {
        return "UNKNOWN_ERROR";
      }

      return WEBGL_ERROR_CODE[code];
    }
    /**
     * This function is wrapper for texImage2D to handle exceptions on texImage2D.
     * Purpose is to prevent service from being stopped by script error.
     *
     * @param {*} gl
     * @param {*} target
     * @param {*} pixels
     */
    ;

    WebGLUtils.texImage2D = function texImage2D(gl, target, pixels) {
      try {
        gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      } catch (error) {
        /* eslint-disable no-console */
        console.error("WebGLUtils.texImage2D error:", error);
        /* eslint-enable no-console */
      }
    };

    WebGLUtils.getMaxTextureSize = function getMaxTextureSize(gl) {
      // WARN: MAX_TEXTURE_SIZE_FOR_TEST is used for test
      return MAX_TEXTURE_SIZE_FOR_TEST || gl.getParameter(gl.MAX_TEXTURE_SIZE);
    };

    return WebGLUtils;
  }();

  var agent$1 = agent();
  var isIE11 = agent$1.browser.name === "ie" && agent$1.browser.version === "11.0";
  var EVENTS = {
    ERROR: "error"
  };
  /**
   *
   * Extends Component for firing errors occurs internally.
   */

  var Renderer =
  /*#__PURE__*/
  function () {
    var Renderer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(Renderer, _Component);

      function Renderer() {
        var _this;

        _this = _Component.call(this) || this;
        _this._forceDimension = null;
        _this._pixelCanvas = null;
        _this._pixelContext = null;
        return _this;
      }

      var _proto = Renderer.prototype;

      _proto.render = function render(_ref) {
        var gl = _ref.gl,
            shaderProgram = _ref.shaderProgram,
            indexBuffer = _ref.indexBuffer,
            mvMatrix = _ref.mvMatrix,
            pMatrix = _ref.pMatrix;
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        if (indexBuffer) {
          gl.drawElements(gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
      } // Define interface for Renderers

      /**
       * Following MUST BE DEFINED on Child of Renderer
       *
       * DATA
       *
       *  - getVertexPositionData
       *  - getIndexData
       *  - getTextureCoordData
       *
       * SOURCE
       *
       *  - getVertexShaderSource
       *  - getFragmentShaderSource
       *
       * TEXTURE
       *
       *  - bindTexture
       */
      ;

      _proto.getDimension = function getDimension(pixelSource) {
        var width = pixelSource.naturalWidth || pixelSource.videoWidth;
        var height = pixelSource.naturalHeight || pixelSource.videoHeight;
        return {
          width: width,
          height: height
        };
      }
      /**
       * Update data used by shader
       * 	-
       *
       *
       * @param {*} param
       */
      ;

      _proto.updateShaderData = function updateShaderData(param) {}
      /*
      * Update following data in implementation layer.
      * If the data is not changed, it does not need to implement this function.
      *
      * - _VERTEX_POSITION_DATA
      * - _TEXTURE_COORD_DATA
      * - _INDEX_DATA
      */

      /**
       *
       * @param {HTMLImageElement | HTMLVideoElement} image
       * @param {Object = {width, height}} forceDimension Forced dimension to resize
       */
      ;

      _proto._initPixelSource = function _initPixelSource(image, forceDimension) {
        var isIE11Video = isIE11 && image instanceof HTMLVideoElement;

        if (isIE11Video || forceDimension) {
          var _ref2 = forceDimension || this.getDimension(image),
              width = _ref2.width,
              height = _ref2.height;

          this._pixelCanvas = document.createElement("canvas");
          this._pixelCanvas.width = width;
          this._pixelCanvas.height = height;
          this._pixelContext = this._pixelCanvas.getContext("2d");
        }

        this._forceDimension = forceDimension;
      };

      _proto._getPixelSource = function _getPixelSource(image) {
        if (!this._pixelCanvas) {
          return image;
        }
        /**
         * IE11 && Video
         * or
         * Dimension is forced (Image is larger than texture size.)
         */


        var contentDimension = this.getDimension(image);
        var textureDimension = this._forceDimension || contentDimension;

        if (this._pixelCanvas.width !== textureDimension.width) {
          this._pixelCanvas.width = textureDimension.width;
        }

        if (this._pixelCanvas.height !== textureDimension.height) {
          this._pixelCanvas.height = textureDimension.height;
        }

        if (this._forceDimension) {
          this._pixelContext.drawImage(image, 0, 0, contentDimension.width, contentDimension.height, 0, 0, textureDimension.width, textureDimension.height);
        } else {
          this._pixelContext.drawImage(image, 0, 0);
        }

        return this._pixelCanvas;
      };

      _proto._extractTileConfig = function _extractTileConfig(imageConfig) {
        var tileConfig = Array.isArray(imageConfig.tileConfig) ? imageConfig.tileConfig : Array.apply(void 0, Array(6)).map(function () {
          return imageConfig.tileConfig;
        });
        tileConfig = tileConfig.map(function (config) {
          return _extends({
            flipHorizontal: false,
            rotation: 0
          }, config);
        });
        return tileConfig;
      };

      _proto._triggerError = function _triggerError(error) {
        /* eslint-disable no-console */
        console.error("Renderer Error:", error);
        /* eslint-enable no-console */

        this.trigger(EVENTS.ERROR, {
          message: typeof error === "string" ? error : error.message
        });
      };

      return Renderer;
    }(Component);

    Renderer.EVENTS = EVENTS;
    return Renderer;
  }();

  var CubeRenderer =
  /*#__PURE__*/
  function () {
    var CubeRenderer =
    /*#__PURE__*/
    function (_Renderer) {
      _inheritsLoose(CubeRenderer, _Renderer);

      function CubeRenderer() {
        return _Renderer.apply(this, arguments) || this;
      }

      var _proto = CubeRenderer.prototype;

      _proto.getVertexPositionData = function getVertexPositionData() {
        CubeRenderer._VERTEX_POSITION_DATA = CubeRenderer._VERTEX_POSITION_DATA !== null ? CubeRenderer._VERTEX_POSITION_DATA : [// back
        1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, // front
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, // top
        -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, // bottom
        1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 1, // right
        1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, // left
        -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];
        return CubeRenderer._VERTEX_POSITION_DATA;
      };

      _proto.getIndexData = function getIndexData() {
        if (CubeRenderer._INDEX_DATA) {
          return CubeRenderer._INDEX_DATA;
        }

        var indexData = [];
        var vertexPositionData = this.getVertexPositionData();

        for (var i = 0; i < vertexPositionData.length / 3; i += 4) {
          indexData.push(i, i + 2, i + 1, i, i + 3, i + 2);
        }

        CubeRenderer._INDEX_DATA = indexData;
        return indexData;
      };

      CubeRenderer.extractOrder = function extractOrder(imageConfig) {
        return imageConfig.order || "RLUDBF";
      };

      _proto.getTextureCoordData = function getTextureCoordData(imageConfig) {
        var vertexOrder = "BFUDRL";
        var order = CubeRenderer.extractOrder(imageConfig);
        var base = this.getVertexPositionData();

        var tileConfig = this._extractTileConfig(imageConfig);

        var elemSize = 3;
        var vertexPerTile = 4;
        var textureCoordData = vertexOrder.split("").map(function (face) {
          return tileConfig[order.indexOf(face)];
        }).map(function (config, i) {
          var rotation = parseInt(config.rotation / 90, 10);
          var ordermap_ = config.flipHorizontal ? [0, 1, 2, 3] : [1, 0, 3, 2];

          for (var r = 0; r < Math.abs(rotation); r++) {
            if (config.flipHorizontal && rotation > 0 || !config.flipHorizontal && rotation < 0) {
              ordermap_.push(ordermap_.shift());
            } else {
              ordermap_.unshift(ordermap_.pop());
            }
          }

          var elemPerTile = elemSize * vertexPerTile;
          var tileVertex = base.slice(i * elemPerTile, i * elemPerTile + elemPerTile);
          var tileTemp = [];

          for (var j = 0; j < vertexPerTile; j++) {
            tileTemp[ordermap_[j]] = tileVertex.splice(0, elemSize);
          }

          return tileTemp;
        }).join().split(",").map(function (v) {
          return parseInt(v, 10);
        });
        return textureCoordData;
      };

      _proto.getVertexShaderSource = function getVertexShaderSource() {
        return "\nattribute vec3 aVertexPosition;\nattribute vec3 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying highp vec3 vVertexDirectionVector;\nvoid main(void) {\n\tvVertexDirectionVector = aTextureCoord;\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      _proto.getFragmentShaderSource = function getFragmentShaderSource() {
        return "\nprecision highp float;\nuniform samplerCube uSampler;\nvarying highp vec3 vVertexDirectionVector;\nvoid main(void) {\n\tgl_FragColor = textureCube(uSampler, vVertexDirectionVector);\n}";
      };

      _proto.updateTexture = function updateTexture(gl, image, imageConfig) {
        var baseOrder = "RLUDBF";
        var order = CubeRenderer.extractOrder(imageConfig);
        var orderMap = {};
        order.split("").forEach(function (v, i) {
          orderMap[v] = i;
        });

        try {
          if (image instanceof Array) {
            for (var surfaceIdx = 0; surfaceIdx < 6; surfaceIdx++) {
              var tileIdx = orderMap[baseOrder[surfaceIdx]];
              WebGLUtils.texImage2D(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + surfaceIdx, image[tileIdx]);
            }
          } else {
            var maxCubeMapTextureSize = this.getMaxCubeMapTextureSize(gl, image);

            for (var _surfaceIdx = 0; _surfaceIdx < 6; _surfaceIdx++) {
              var _tileIdx = orderMap[baseOrder[_surfaceIdx]];
              var tile = this.extractTileFromImage(image, _tileIdx, maxCubeMapTextureSize);
              WebGLUtils.texImage2D(gl, gl.TEXTURE_CUBE_MAP_POSITIVE_X + _surfaceIdx, tile);
            }
          }
        } catch (e) {
          this._triggerError(e);
        }
      };

      _proto.bindTexture = function bindTexture(gl, texture, image, imageConfig) {
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        this.updateTexture(gl, image, imageConfig);
      };

      _proto.getSourceTileSize = function getSourceTileSize(image) {
        var _this$getDimension = this.getDimension(image),
            width = _this$getDimension.width,
            height = _this$getDimension.height;

        var aspectRatio = width / height;
        var inputTextureSize;

        if (aspectRatio === 1 / 6) {
          inputTextureSize = width;
        } else if (aspectRatio === 6) {
          inputTextureSize = height;
        } else if (aspectRatio === 2 / 3) {
          inputTextureSize = width / 2;
        } else {
          inputTextureSize = width / 3;
        }

        return inputTextureSize;
      };

      _proto.extractTileFromImage = function extractTileFromImage(image, tileIdx, outputTextureSize) {
        var _this$getDimension2 = this.getDimension(image),
            width = _this$getDimension2.width;

        var inputTextureSize = this.getSourceTileSize(image);
        var canvas = document.createElement("canvas");
        canvas.width = outputTextureSize;
        canvas.height = outputTextureSize;
        var context = canvas.getContext("2d");
        var tilePerRow = width / inputTextureSize;
        var x = inputTextureSize * tileIdx % (inputTextureSize * tilePerRow);
        var y = parseInt(tileIdx / tilePerRow, 10) * inputTextureSize;
        context.drawImage(image, x, y, inputTextureSize, inputTextureSize, 0, 0, outputTextureSize, outputTextureSize);
        return canvas;
      };

      _proto.getMaxCubeMapTextureSize = function getMaxCubeMapTextureSize(gl, image) {
        var agent$$1 = agent();
        var maxCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);

        var _imageWidth = this.getSourceTileSize(image);

        if (agent$$1.browser.name === "ie" && parseInt(agent$$1.browser.version, 10) === 11) {
          if (!util.isPowerOfTwo(_imageWidth)) {
            for (var i = 1; i < maxCubeMapTextureSize; i *= 2) {
              if (i < _imageWidth) {
                continue;
              } else {
                _imageWidth = i;
                break;
              }
            }
          }
        } // ios 9 의 경우 텍스쳐 최대사이즈는 1024 이다.


        if (agent$$1.os.name === "ios" && parseInt(agent$$1.os.version, 10) === 9) {
          _imageWidth = 1024;
        } // ios 8 의 경우 텍스쳐 최대사이즈는 512 이다.


        if (agent$$1.os.name === "ios" && parseInt(agent$$1.os.version, 10) === 8) {
          _imageWidth = 512;
        } // maxCubeMapTextureSize 보다는 작고, imageWidth 보다 큰 2의 승수 중 가장 작은 수


        return Math.min(maxCubeMapTextureSize, _imageWidth);
      };

      return CubeRenderer;
    }(Renderer);

    CubeRenderer._VERTEX_POSITION_DATA = null;
    CubeRenderer._INDEX_DATA = null;
    return CubeRenderer;
  }();

  var CubeStripRenderer =
  /*#__PURE__*/
  function (_Renderer) {
    _inheritsLoose(CubeStripRenderer, _Renderer);

    function CubeStripRenderer() {
      return _Renderer.apply(this, arguments) || this;
    }

    var _proto = CubeStripRenderer.prototype;

    _proto.getVertexShaderSource = function getVertexShaderSource() {
      return "\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n\tvTextureCoord = aTextureCoord;\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
    };

    _proto.getFragmentShaderSource = function getFragmentShaderSource() {
      return "\n#define PI 3.14159265359\nprecision highp float;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform bool uIsEAC;\nconst vec2 OPERATE_COORDS_RANGE = vec2(-1.0, 1.0);\nconst vec2 TEXTURE_COORDS_RANGE = vec2(0.0, 1.0);\n// vector type is used for initializing values instead of array.\nconst vec4 TEXTURE_DIVISION_X = vec4(0.0, 1.0 / 3.0, 2.0 / 3.0, 1.0);\nconst vec3 TEXTURE_DIVISION_Y = vec3(0.0, 1.0 / 2.0, 1.0);\nconst float EAC_CONST = 2.0 / PI;\nfloat scale(vec2 domainRange, vec2 targetRange, float val) {\n\tfloat unit = 1.0 / (domainRange[1] - domainRange[0]);\n\treturn targetRange[0] + (targetRange[1] - targetRange[0]) * (val - domainRange[0]) * unit;\n}\nvoid main(void) {\n\tfloat transformedCoordX;\n\tfloat transformedCoordY;\n\n\tif (uIsEAC) {\n\t\tvec2 orgTextureRangeX;\n\t\tvec2 orgTextureRangeY;\n\n\t\t// Apply EAC transform\n\t\tif (vTextureCoord.s >= TEXTURE_DIVISION_X[2]) {\n\t\t\torgTextureRangeX = vec2(TEXTURE_DIVISION_X[2], TEXTURE_DIVISION_X[3]);\n\t\t} else if (vTextureCoord.s >= TEXTURE_DIVISION_X[1]) {\n\t\t\torgTextureRangeX = vec2(TEXTURE_DIVISION_X[1], TEXTURE_DIVISION_X[2]);\n\t\t} else {\n\t\t\torgTextureRangeX = vec2(TEXTURE_DIVISION_X[0], TEXTURE_DIVISION_X[1]);\n\t\t}\n\n\t\tif (vTextureCoord.t >= TEXTURE_DIVISION_Y[1]) {\n\t\t\torgTextureRangeY = vec2(TEXTURE_DIVISION_Y[1], TEXTURE_DIVISION_Y[2]);\n\t\t} else {\n\t\t\torgTextureRangeY = vec2(TEXTURE_DIVISION_Y[0], TEXTURE_DIVISION_Y[1]);\n\t\t}\n\n\t\t// scaling coors by the coordinates following the range from -1.0 to 1.0.\n\t\tfloat px = scale(orgTextureRangeX, OPERATE_COORDS_RANGE, vTextureCoord.s);\n\t\tfloat py = scale(orgTextureRangeY, OPERATE_COORDS_RANGE, vTextureCoord.t);\n\n\t\tfloat qu = EAC_CONST * atan(px) + 0.5;\n\t\tfloat qv = EAC_CONST * atan(py) + 0.5;\n\n\t\t// re-scaling coors by original coordinates ranges\n\t\ttransformedCoordX = scale(TEXTURE_COORDS_RANGE, orgTextureRangeX, qu);\n\t\ttransformedCoordY = scale(TEXTURE_COORDS_RANGE, orgTextureRangeY, qv);\n\t} else {\n\t\t// normal cubemap\n\t\ttransformedCoordX = vTextureCoord.s;\n\t\ttransformedCoordY = vTextureCoord.t;\n\t}\n\n\tgl_FragColor = texture2D(uSampler, vec2(transformedCoordX, transformedCoordY));\n}";
    };

    _proto.getVertexPositionData = function getVertexPositionData() {
      if (!this._vertices) {
        this._vertices = [// back
        1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, // front
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, // up
        -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, // down
        -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1, // right
        1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, // left
        -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1];
      }

      return this._vertices;
    };

    _proto.getIndexData = function getIndexData() {
      var _this = this;

      // TODO: 한번만 계산하도록 수정하기
      var indices = function () {
        var indexData = [];

        for (var i = 0; i < _this._vertices.length / 3; i += 4) {
          indexData.push(i, i + 1, i + 2, i, i + 2, i + 3);
        }

        return indexData;
      }();

      return indices;
    };

    _proto.getTextureCoordData = function getTextureCoordData(imageConfig) {
      var _this2 = this;

      // TODO: make it cols, rows as config.
      var cols = 3;
      var rows = 2;
      var order = imageConfig.order || "RLUDFB";
      var coords = []; // 텍스쳐의 좌표는 윗쪽이 큰 값을 가지므로 row 는 역순으로 넣는다.

      for (var r = rows - 1; r >= 0; r--) {
        for (var c = 0; c < cols; c++) {
          var coord = [c / cols, r / rows, (c + 1) / cols, r / rows, (c + 1) / cols, (r + 1) / rows, c / cols, (r + 1) / rows];
          coords.push(coord);
        }
      }

      var tileConfigs = this._extractTileConfig(imageConfig); // Transform Coord By Flip & Rotation


      coords = coords // shrink coord to avoid pixel bleeding
      .map(function (coord) {
        return _this2._shrinkCoord(coord);
      }).map(function (coord, i) {
        return _this2._transformCoord(coord, tileConfigs[i]);
      }); // vertices 에서 지정된 순서대로 그대로 그리기 위해 vertex 의 순서를 BFUDRL 로 재배치

      return "BFUDRL".split("").map(function (face) {
        return order.indexOf(face);
      }).map(function (index) {
        return coords[index];
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
    };

    _proto.updateTexture = function updateTexture(gl, image) {
      WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
    };

    _proto.bindTexture = function bindTexture(gl, texture, image) {
      // Make sure image isn't too big
      var _this$getDimension = this.getDimension(image),
          width = _this$getDimension.width,
          height = _this$getDimension.height;

      var size = Math.max(width, height);
      var maxSize = WebGLUtils.getMaxTextureSize(gl);

      if (size > maxSize) {
        this._triggerError("Image width(" + width + ") exceeds device limit(" + maxSize + "))");

        return;
      } // Pixel Source for IE11 & Video


      this._initPixelSource(image);

      gl.activeTexture(gl.TEXTURE0);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      this.updateTexture(gl, image);
    };

    _proto._transformCoord = function _transformCoord(coord, tileConfig) {
      var newCoord = coord.slice();

      if (tileConfig.flipHorizontal) {
        newCoord = this._flipHorizontalCoord(newCoord);
      }

      if (tileConfig.rotation) {
        newCoord = this._rotateCoord(newCoord, tileConfig.rotation);
      }

      return newCoord;
    };

    _proto._shrinkCoord = function _shrinkCoord(coord) {
      var SHRINK_Y = 0.00;
      var SHRINK_X = 0.00;
      return [coord[0] + SHRINK_X, coord[1] + SHRINK_Y, coord[2] - SHRINK_X, coord[3] + SHRINK_Y, coord[4] - SHRINK_X, coord[5] - SHRINK_Y, coord[6] + SHRINK_X, coord[7] - SHRINK_Y];
    };

    _proto._rotateCoord = function _rotateCoord(coord, rotationAngle) {
      var SIZE = 2; // coord means x,y coordinates. Two values(x, y) makes a one coord.

      var shiftCount = parseInt(rotationAngle / 90, 10) % 4;

      if (shiftCount === 0) {
        return coord;
      }

      var moved;
      var rotatedCoord = [];

      if (shiftCount > 0) {
        moved = coord.splice(0, shiftCount * SIZE);
        rotatedCoord = coord.concat(moved);
      } else {
        moved = coord.splice((4 + shiftCount) * SIZE, -shiftCount * SIZE);
        rotatedCoord = moved.concat(coord);
      }

      return rotatedCoord;
    };

    _proto._flipHorizontalCoord = function _flipHorizontalCoord(coord) {
      return [coord[2], coord[3], coord[0], coord[1], coord[6], coord[7], coord[4], coord[5]];
    };

    return CubeStripRenderer;
  }(Renderer);

  /**
   * Constant value for gyro mode. <br>(Reference {@link https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide})
   * @ko gyro 모드 대한 상수 값. <br>({@link https://github.com/naver/egjs-view360/wiki/PanoViewer-3.0-User-Guide} 참고)
   * @namespace
   * @name GYRO_MODE
   * @memberof eg.view360.PanoViewer
   */
  /**
   * Constant value for errors
   * @ko 에러에 대한 상수 값
   * @namespace
   * @name ERROR_TYPE
   * @memberof eg.view360.PanoViewer
   */

  var ERROR_TYPE = {
    /**
     * Unsupported device
     * @ko 미지원 기기
     * @name INVALID_DEVICE
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 10
     */
    INVALID_DEVICE: 10,

    /**
     * Webgl not support
     * @ko WEBGL 미지원
     * @name NO_WEBGL
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 11
     */
    NO_WEBGL: 11,

    /**
     * Failed to load image
     * @ko 이미지 로드 실패
     * @name FAIL_IMAGE_LOAD
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 12
     */
    FAIL_IMAGE_LOAD: 12,

    /**
     * Failed to bind texture
     * @ko 텍스쳐 바인딩 실패
     * @name FAIL_BIND_TEXTURE
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 13
     */
    FAIL_BIND_TEXTURE: 13,

    /**
     * Only one resource(image or video) should be specified
     * @ko 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
     * @name INVALID_RESOURCE
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 14
     */
    INVALID_RESOURCE: 14,

    /**
     * WebGL context lost occurred
     * @ko WebGL context lost 발생
     * @name RENDERING_CONTEXT_LOST
     * @memberof eg.view360.PanoViewer.ERROR_TYPE
     * @constant
     * @type {Number}
     * @default 15
     */
    RENDERING_CONTEXT_LOST: 15
  };
  /**
   * Constant value for events
   * @ko 이벤트에 대한 상수 값
   * @namespace
   * @name EVENTS
   * @memberof eg.view360.PanoViewer
   */

  var EVENTS$1 = {
    /**
     * Events that is fired when PanoViewer is ready to show image and handle user interaction.
     * @ko PanoViewer 가 사용자의 인터렉션 및 렌더링이 준비되상태에 발생하는 이벤트
     * @name READY
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default ready
     */
    READY: "ready",

    /**
     * Events that is fired when direction or fov is changed.
     * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
     * @name VIEW_CHANGE
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default viewChange
     */
    VIEW_CHANGE: "viewChange",

    /**
     * Events that is fired when animation which is triggered by inertia is ended.
     * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
     * @name ANIMATION_END
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default animationEnd
     */
    ANIMATION_END: "animationEnd",

    /**
     * Events that is fired when error occurs
     * @ko 에러 발생 시 발생하는 이벤트
     * @name ERROR
     * @memberof eg.view360.PanoViewer.EVENTS
     * @constant
     * @type {String}
     * @default error
     */
    ERROR: "error"
  };
  /**
   * Constant value for projection type
   * @ko 프로젝션 타입 대한 상수 값
   * @namespace
   * @name PROJECTION_TYPE
   * @memberof eg.view360.PanoViewer
   */

  var PROJECTION_TYPE = {
    /**
     * Constant value for equirectangular type.
     * @ko equirectangular 에 대한 상수 값.
     * @name EQUIRECTANGULAR
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default equirectangular
     */
    EQUIRECTANGULAR: "equirectangular",

    /**
     * Constant value for cubemap type.
     * @ko cubemap 에 대한 상수 값.
     * @name CUBEMAP
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default cubemap
     */
    CUBEMAP: "cubemap",

    /**
     * Constant value for cubestrip type.
     * Cubestrip is a format for a single image with a combination of six cube faces. It is almost identical to cubemap, but it is implemented in a different way. It aims at better performance and efficiency. In addition, it automatically detects and supports EAC.
     *
     * @ko cubemap 에 대한 상수 값.Cubestrip 은 cube 면이 6개가 조합된 조합을 한장의 이미지를 위한 포맷이다. cubemap 과 사용방법이 거의 동일하지만 다른 방식으로 구현되었다. 보다 좋은 성능과 효율성을 목적으로 한다. 더불어 자동으로 EAC 를 감지하고 지원한다.
     * @name CUBESTRIP
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default cubestrip
     */
    CUBESTRIP: "cubestrip",

    /**
     * Constant value for PANORAMA type.
     *
     * PANORAMA is a format for a panorma image which is taken from smartphone.
     *
     * @ko PANORAMA 에 대한 상수값. 파노라마는 스마트 폰에서 가져온 파노라마 이미지의 형식입니다.
     *
     * @name PANORAMA
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default panorama
     */
    PANORAMA: "panorama",

    /**
     * Constant value for EQUI_STEREOSCOPY type.
     *
     * Constant value for EQUI_STEREOSCOPY. Stereoscopy image format of EQUIRECTANGULAR. It is an experimental function to show a stereoscopic type equirectangular image on a plane. It does not support stereoscopic viewing function through special visual equipment at present.
     *
     * @ko EQUI_STEREOSCOPY 에 대한 상수값. EQUIRECTANGULAR 의 Stereoscopy 이미지 형식입니다. Stereoscopic 형태의 equirectangular 이미지를 평면에 보여주기 위한 실험적인 기능으로 현재는 특수한 시각 장비를 통한 입체적인 보기 기능은 지원하지 않습니다.
     *
     * @name STEREOSCOPIC_EQUI
     * @memberof eg.view360.PanoViewer.PROJECTION_TYPE
     * @constant
     * @type {String}
     * @default stereoequi
     */
    STEREOSCOPIC_EQUI: "stereoequi"
  };
  /**
   * A constant value for the format of the stereoscopic equirectangular projection type.
   * @ko Stereoscopic equirectangular 프로젝션 타입의 포맷에 대한 상수 값
   * @namespace
   * @name STEREO_FORMAT
   * @memberof eg.view360.PanoViewer
   */

  var STEREO_FORMAT = {
    /**
     * A constant value for format of top bottom stereoscopic 360 equirectangular projection.
     * @ko top bottom stereoscopic 360 equirectangular projection 콘텐츠 포맷에 대한 상수값.
     * @name TOP_BOTTOM
     * @memberof eg.view360.PanoViewer.STEREO_FORMAT
     * @constant
     * @type {String}
     * @default "3dv"
     */
    TOP_BOTTOM: "3dv",

    /**
     * A constant value for format of left right stereoscopic 360 equirectangular projection.
     * @ko Left right stereoscopic 360 equirectangular projection 콘텐츠 포맷에 대한 상수값.
     * @name LEFT_RIGHT
     * @memberof eg.view360.PanoViewer.STEREO_FORMAT
     * @constant
     * @type {String}
     * @default "3dh"
     */
    LEFT_RIGHT: "3dh",

    /**
     * A constant value specifying media is not in stereoscopic format.
     * @ko Stereoscopic 영상이 아닐 경우에 적용하는 상수값.
     * @name NONE
     * @memberof eg.view360.PanoViewer.STEREO_FORMAT
     * @constant
     * @type {String}
     * @default ""
     */
    NONE: ""
  };

  var latitudeBands = 60;
  var longitudeBands = 60;
  var radius = 2;
  var ANGLE_CORRECTION_FOR_CENTER_ALIGN = -0.5 * Math.PI;
  var textureCoordData = [];
  var vertexPositionData = [];
  var indexData = [];
  var latIdx;
  var lngIdx;

  for (latIdx = 0; latIdx <= latitudeBands; latIdx++) {
    var theta = (latIdx / latitudeBands - 0.5) * Math.PI;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (lngIdx = 0; lngIdx <= longitudeBands; lngIdx++) {
      var phi = (lngIdx / longitudeBands - 0.5) * 2 * Math.PI + ANGLE_CORRECTION_FOR_CENTER_ALIGN;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = cosPhi * cosTheta;
      var y = sinTheta;
      var z = sinPhi * cosTheta;
      var u = lngIdx / longitudeBands;
      var v = latIdx / latitudeBands;
      textureCoordData.push(u, v);
      vertexPositionData.push(radius * x, radius * y, radius * z);

      if (lngIdx !== longitudeBands && latIdx !== latitudeBands) {
        var a = latIdx * (longitudeBands + 1) + lngIdx;
        var b = a + longitudeBands + 1;
        indexData.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
  }

  var SphereRenderer =
  /*#__PURE__*/
  function () {
    var SphereRenderer =
    /*#__PURE__*/
    function (_Renderer) {
      _inheritsLoose(SphereRenderer, _Renderer);

      function SphereRenderer(format) {
        var _this;

        _this = _Renderer.call(this) || this;
        _this._stereoFormat = format;
        return _this;
      }

      var _proto = SphereRenderer.prototype;

      _proto.render = function render(ctx) {
        var gl = ctx.gl,
            shaderProgram = ctx.shaderProgram;
        var leftEyeScaleOffset;
        var rightEyeScaleOffset;

        switch (this._stereoFormat) {
          case STEREO_FORMAT.TOP_BOTTOM:
            leftEyeScaleOffset = [1, 0.5, 0, 0];
            rightEyeScaleOffset = [1, 0.5, 0, 0.5];
            break;

          case STEREO_FORMAT.LEFT_RIGHT:
            leftEyeScaleOffset = [0.5, 1, 0, 0];
            rightEyeScaleOffset = [0.5, 1, 0.5, 0];
            break;

          default:
            leftEyeScaleOffset = [1, 1, 0, 0];
            rightEyeScaleOffset = [1, 1, 0, 0];
        }

        var uTexScaleOffset = gl.getUniformLocation(shaderProgram, "uTexScaleOffset");
        gl.uniform4fv(uTexScaleOffset, [].concat(leftEyeScaleOffset, rightEyeScaleOffset));

        _Renderer.prototype.render.call(this, ctx);
      };

      _proto.getVertexPositionData = function getVertexPositionData() {
        return SphereRenderer._VERTEX_POSITION_DATA;
      };

      _proto.getIndexData = function getIndexData() {
        return SphereRenderer._INDEX_DATA;
      };

      _proto.getTextureCoordData = function getTextureCoordData() {
        return SphereRenderer._TEXTURE_COORD_DATA;
      };

      _proto.getVertexShaderSource = function getVertexShaderSource() {
        return "\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform float uEye;\nuniform vec4 uTexScaleOffset[2];\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n\tvec4 scaleOffset = uTexScaleOffset[int(uEye)];\n\tvTextureCoord = aTextureCoord.xy * scaleOffset.xy + scaleOffset.zw;\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      _proto.getFragmentShaderSource = function getFragmentShaderSource() {
        return "\nprecision highp float;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n\tgl_FragColor = texture2D(uSampler, vTextureCoord.st);\n}";
      };

      _proto.updateTexture = function updateTexture(gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      _proto.bindTexture = function bindTexture(gl, texture, image) {
        // Make sure image isn't too big
        var _this$getDimension = this.getDimension(image),
            width = _this$getDimension.width,
            height = _this$getDimension.height;

        var size = Math.max(width, height);
        var maxSize = WebGLUtils.getMaxTextureSize(gl);

        if (size > maxSize) {
          this._triggerError("Image width(" + width + ") exceeds device limit(" + maxSize + "))");

          return;
        } // Pixel Source for IE11 & Video


        this._initPixelSource(image);

        gl.activeTexture(gl.TEXTURE0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        this.updateTexture(gl, image);
      };

      return SphereRenderer;
    }(Renderer);

    SphereRenderer._VERTEX_POSITION_DATA = vertexPositionData;
    SphereRenderer._TEXTURE_COORD_DATA = textureCoordData;
    SphereRenderer._INDEX_DATA = indexData;
    return SphereRenderer;
  }();

  var MIN_ASPECT_RATIO_FOR_FULL_PANORAMA = 6;
  var longitudeBands$1 = 60;
  var textureCoordData$1 = [];
  var vertexPositionData$1 = [];
  var indexData$1 = [];

  var CylinderRenderer =
  /*#__PURE__*/
  function () {
    var CylinderRenderer =
    /*#__PURE__*/
    function (_Renderer) {
      _inheritsLoose(CylinderRenderer, _Renderer);

      function CylinderRenderer() {
        return _Renderer.apply(this, arguments) || this;
      }

      var _proto = CylinderRenderer.prototype;

      _proto.getVertexPositionData = function getVertexPositionData() {
        return CylinderRenderer._VERTEX_POSITION_DATA;
      };

      _proto.getIndexData = function getIndexData() {
        return CylinderRenderer._INDEX_DATA;
      };

      _proto.getTextureCoordData = function getTextureCoordData() {
        return CylinderRenderer._TEXTURE_COORD_DATA;
      };

      _proto.getVertexShaderSource = function getVertexShaderSource() {
        return "\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying highp vec2 vTextureCoord;\nvoid main(void) {\n\tvTextureCoord = aTextureCoord;\n\tgl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
      };

      _proto.getFragmentShaderSource = function getFragmentShaderSource() {
        return "\nprecision highp float;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n\tgl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n}";
      };

      _proto.updateTexture = function updateTexture(gl, image) {
        WebGLUtils.texImage2D(gl, gl.TEXTURE_2D, this._getPixelSource(image));
      };

      _proto.bindTexture = function bindTexture(gl, texture, image) {
        // Make sure image isn't too big
        var _this$getDimension = this.getDimension(image),
            width = _this$getDimension.width,
            height = _this$getDimension.height;

        var size = Math.max(width, height);
        var maxSize = WebGLUtils.getMaxTextureSize(gl);
        var resizeDimension;

        if (size > maxSize) {
          this._triggerError("Image width(" + width + ") exceeds device texture limit(" + maxSize + "))"); // Request resizing texture.

          /**
           * TODO: Is it need to apply on another projection type?
           */


          resizeDimension = width > height ? {
            width: maxSize,
            height: maxSize * height / width
          } : {
            width: maxSize * width / height,
            height: maxSize
          };
        } // Pixel Source for IE11 & Video or resizing needed


        this._initPixelSource(image, resizeDimension);

        gl.activeTexture(gl.TEXTURE0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        this.updateTexture(gl, image);
      };

      _proto.updateShaderData = function updateShaderData(_ref) {
        var _ref$imageAspectRatio = _ref.imageAspectRatio,
            imageAspectRatio = _ref$imageAspectRatio === void 0 ? MIN_ASPECT_RATIO_FOR_FULL_PANORAMA : _ref$imageAspectRatio;
        var lngIdx;
        var cylinderMaxRadian;
        var halfCylinderY;
        var rotated;
        var aspectRatio; // Exception case: orientation is rotated.

        if (imageAspectRatio < 1) {
          /**
           * If rotated is true, we assume that image is rotated counter clockwise.
           * TODO: If there's other rotation, it is need to implement by each rotation.
           */
          rotated = true;
          aspectRatio = 1 / imageAspectRatio;
        } else {
          rotated = false;
          aspectRatio = imageAspectRatio;
        }

        if (aspectRatio >= MIN_ASPECT_RATIO_FOR_FULL_PANORAMA) {
          var fov = 360 / aspectRatio;
          cylinderMaxRadian = 2 * Math.PI; // 360 deg

          halfCylinderY = Math.tan(toRadian(fov / 2));
        } else {
          cylinderMaxRadian = aspectRatio;
          halfCylinderY = 0.5; // Range of cylinder is [-0.5, 0.5] to make height to 1.
        } // intialize shader data before update


        textureCoordData$1.length = 0;
        vertexPositionData$1.length = 0;
        indexData$1.length = 0;
        var CYLIDER_Y = [-halfCylinderY, halfCylinderY];
        var startAngleForCenterAlign = Math.PI / 2 + (2 * Math.PI - cylinderMaxRadian) / 2; // Math.PI / 2 start point when cylinderMaxRadian is 2 phi(360)
        // console.log("cylinderMaxRadian:", glMatrix.toDegree(cylinderMaxRadian), "CYLIDER_Y", CYLIDER_Y, "start angle", glMatrix.toDegree(startAngleForCenterAlign));

        for (var yIdx = 0, yLength = CYLIDER_Y.length; yIdx < yLength
        /* bottom & top */
        ; yIdx++) {
          for (lngIdx = 0; lngIdx <= longitudeBands$1; lngIdx++) {
            var angle$$1 = startAngleForCenterAlign + lngIdx / longitudeBands$1 * cylinderMaxRadian;
            var x = Math.cos(angle$$1);
            var y = CYLIDER_Y[yIdx];
            var z = Math.sin(angle$$1);
            var u = void 0;
            var v = void 0;

            if (rotated) {
              // Rotated 90 degree (counter clock wise)
              u = 1 - yIdx; // yLength - yIdx;

              v = lngIdx / longitudeBands$1;
            } else {
              // 	// Normal case (Not rotated)
              u = lngIdx / longitudeBands$1;
              v = yIdx;
            }

            textureCoordData$1.push(u, v);
            vertexPositionData$1.push(x, y, z);

            if (yIdx === 0 && lngIdx < longitudeBands$1) {
              var a = lngIdx;
              var b = a + longitudeBands$1 + 1;
              indexData$1.push(a, b, a + 1, b, b + 1, a + 1);
            }
          }
        }
      };

      return CylinderRenderer;
    }(Renderer);

    CylinderRenderer._VERTEX_POSITION_DATA = vertexPositionData$1;
    CylinderRenderer._TEXTURE_COORD_DATA = textureCoordData$1;
    CylinderRenderer._INDEX_DATA = indexData$1;
    return CylinderRenderer;
  }();

  var _Promise$4 = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;
  var VR_DISPLAY_PRESENT_CHANGE = "vrdisplaypresentchange";
  var DEFAULT_LEFT_BOUNDS = [0, 0, 0.5, 1];
  var DEFAULT_RIGHT_BOUNDS = [0.5, 0, 0.5, 1];
  var EYES = {
    LEFT: "left",
    RIGHT: "right"
  };

  var VRManager =
  /*#__PURE__*/
  function () {
    var VRManager =
    /*#__PURE__*/
    function () {
      _createClass(VRManager, [{
        key: "context",
        get: function get() {
          return this._vrDisplay;
        }
      }]);

      function VRManager() {
        var _this = this;

        this.destroy = function () {
          var vrDisplay = _this._vrDisplay;

          _this.removeEndCallback(_this.destroy);

          if (vrDisplay && vrDisplay.isPresenting) {
            vrDisplay.exitPresent();
          }

          _this._clear();
        };

        this._frameData = new window.VRFrameData();

        this._clear();
      }

      var _proto = VRManager.prototype;

      _proto.canRender = function canRender() {
        return Boolean(this._vrDisplay);
      };

      _proto.beforeRender = function beforeRender(gl) {
        // Render to the default backbuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      };

      _proto.afterRender = function afterRender() {
        this._vrDisplay.submitFrame();
      };

      _proto.getEyeParams = function getEyeParams(gl) {
        var display = this._vrDisplay;
        var halfWidth = gl.drawingBufferWidth * 0.5;
        var height = gl.drawingBufferHeight;
        var frameData = this._frameData;
        display.getFrameData(frameData);
        var leftMVMatrix = frameData.leftViewMatrix;
        var rightMVMatrix = frameData.rightViewMatrix;
        rotateY(leftMVMatrix, leftMVMatrix, this._yawOffset);
        rotateY(rightMVMatrix, rightMVMatrix, this._yawOffset);
        return [{
          viewport: [0, 0, halfWidth, height],
          mvMatrix: leftMVMatrix,
          pMatrix: frameData.leftProjectionMatrix
        }, {
          viewport: [halfWidth, 0, halfWidth, height],
          mvMatrix: rightMVMatrix,
          pMatrix: frameData.rightProjectionMatrix
        }];
      };

      _proto.isPresenting = function isPresenting() {
        return Boolean(this._vrDisplay && this._vrDisplay.isPresenting);
      };

      _proto.addEndCallback = function addEndCallback(callback) {
        window.addEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
      };

      _proto.removeEndCallback = function removeEndCallback(callback) {
        window.removeEventListener(VR_DISPLAY_PRESENT_CHANGE, callback);
      };

      _proto.requestPresent = function requestPresent(canvas) {
        var _this2 = this;

        return new _Promise$4(function (resolve, reject) {
          navigator.getVRDisplays().then(function (displays) {
            var vrDisplay = displays.length && displays[0];

            if (!vrDisplay) {
              reject(new Error("No displays available."));
              return;
            }

            if (!vrDisplay.capabilities.canPresent) {
              reject(new Error("Display lacking capability to present."));
              return;
            }

            vrDisplay.requestPresent([{
              source: canvas
            }]).then(function () {
              var leftEye = vrDisplay.getEyeParameters(EYES.LEFT);
              var rightEye = vrDisplay.getEyeParameters(EYES.RIGHT);
              canvas.width = Math.max(leftEye.renderWidth, rightEye.renderWidth) * 2;
              canvas.height = Math.max(leftEye.renderHeight, rightEye.renderHeight);

              _this2._setDisplay(vrDisplay);

              resolve();
            });
          });
        });
      };

      _proto.setYawOffset = function setYawOffset(offset) {
        this._yawOffset = offset;
      };

      _proto._setDisplay = function _setDisplay(vrDisplay) {
        this._vrDisplay = vrDisplay;
        var layers = vrDisplay.getLayers();

        if (layers.length) {
          var layer = layers[0];
          this._leftBounds = layer.leftBounds;
          this._rightBounds = layer.rightBounds;
        }

        this.addEndCallback(this.destroy);
      };

      _proto._clear = function _clear() {
        this._vrDisplay = null;
        this._leftBounds = DEFAULT_LEFT_BOUNDS;
        this._rightBounds = DEFAULT_RIGHT_BOUNDS;
        this._yawOffset = 0;
      };

      return VRManager;
    }();

    return VRManager;
  }();

  var XR_REFERENCE_SPACE = "local";

  var XRManager =
  /*#__PURE__*/
  function () {
    var XRManager =
    /*#__PURE__*/
    function () {
      _createClass(XRManager, [{
        key: "context",
        get: function get() {
          return this._xrSession;
        }
      }]);

      function XRManager() {
        var _this = this;

        this.destroy = function () {
          var xrSession = _this._xrSession;

          _this.removeEndCallback(_this.destroy);

          if (xrSession) {
            // Capture to avoid errors
            xrSession.end().then(function () {}, function () {});
          }

          _this._clear();
        };

        this._clear();
      }

      var _proto = XRManager.prototype;

      _proto.canRender = function canRender(frame) {
        var pose = frame.getViewerPose(this._xrRefSpace);
        return Boolean(pose);
      };

      _proto.beforeRender = function beforeRender(gl, frame) {
        var session = frame.session;
        var baseLayer = session.renderState.baseLayer;
        gl.bindFramebuffer(gl.FRAMEBUFFER, baseLayer.framebuffer);
      };

      _proto.afterRender = function afterRender() {};

      _proto.getEyeParams = function getEyeParams(gl, frame) {
        var _this2 = this;

        var session = frame.session;
        var pose = frame.getViewerPose(this._xrRefSpace);

        if (!pose) {
          // Can't render
          return null;
        }

        var glLayer = session.renderState.baseLayer;
        return pose.views.map(function (view) {
          var viewport = glLayer.getViewport(view);
          var mvMatrix = view.transform.inverse.matrix;

          if (IS_SAFARI_ON_DESKTOP) {
            rotateX(mvMatrix, mvMatrix, toRadian(180));
          }

          rotateY(mvMatrix, mvMatrix, _this2._yawOffset);
          return {
            viewport: [viewport.x, viewport.y, viewport.width, viewport.height],
            mvMatrix: mvMatrix,
            pMatrix: view.projectionMatrix
          };
        });
      };

      _proto.isPresenting = function isPresenting() {
        return this._presenting;
      };

      _proto.addEndCallback = function addEndCallback(callback) {
        var session = this._xrSession;
        if (!session) return;
        session.addEventListener("end", callback);
      };

      _proto.removeEndCallback = function removeEndCallback(callback) {
        var session = this._xrSession;
        if (!session) return;
        session.removeEventListener("end", callback);
      };

      _proto.requestPresent = function requestPresent(canvas, gl) {
        var _this3 = this;

        return navigator.xr.requestSession("immersive-vr", {
          requiredFeatures: [XR_REFERENCE_SPACE]
        }).then(function (session) {
          var xrLayer = new window.XRWebGLLayer(session, gl);
          session.updateRenderState({
            baseLayer: xrLayer
          });
          return session.requestReferenceSpace(XR_REFERENCE_SPACE).then(function (refSpace) {
            _this3._setSession(session, xrLayer, refSpace);
          });
        });
      };

      _proto.setYawOffset = function setYawOffset(offset) {
        this._yawOffset = offset;
      };

      _proto._setSession = function _setSession(session, xrLayer, refSpace) {
        this._xrSession = session;
        this._xrLayer = xrLayer;
        this._xrRefSpace = refSpace;
        this._presenting = true;
        this.addEndCallback(this.destroy);
      };

      _proto._clear = function _clear() {
        this._xrSession = null;
        this._xrLayer = null;
        this._xrRefSpace = null;
        this._presenting = false;
        this._yawOffset = 0;
      };

      return XRManager;
    }();

    return XRManager;
  }();

  var WebGLAnimator =
  /*#__PURE__*/
  function () {
    var WebGLAnimator =
    /*#__PURE__*/
    function () {
      function WebGLAnimator() {
        var _this = this;

        this._onLoop = function () {
          _this._callback.apply(_this, arguments);

          _this._rafId = _this._context.requestAnimationFrame(_this._onLoop);
        };

        this._onLoopNextTick = function () {
          var before = performance.now();

          _this._callback.apply(_this, arguments);

          var diff = performance.now() - before;

          if (_this._rafTimer >= 0) {
            clearTimeout(_this._rafTimer);
            _this._rafTimer = -1;
          }
          /** Use requestAnimationFrame only if current rendering could be possible over 60fps (1000/60) */


          if (diff < 16) {
            _this._rafId = _this._context.requestAnimationFrame(_this._onLoop);
          } else {
            /** Otherwise, Call setTimeout instead of requestAnimationFrame to gaurantee renering should be occurred*/
            _this._rafTimer = setTimeout(_this._onLoop, 0);
          }
        };

        this._callback = null;
        this._context = window;
        this._rafId = -1;
        this._rafTimer = -1;
      }

      var _proto = WebGLAnimator.prototype;

      _proto.setCallback = function setCallback(callback) {
        this._callback = callback;
      };

      _proto.setContext = function setContext(context) {
        this._context = context;
      };

      _proto.start = function start() {
        var context = this._context;
        var callback = this._callback; // No context / callback set

        if (!context || !callback) return; // Animation already started

        if (this._rafId >= 0 || this._rafTimer >= 0) return;

        if (IS_SAFARI_ON_DESKTOP) {
          this._rafId = context.requestAnimationFrame(this._onLoopNextTick);
        } else {
          this._rafId = context.requestAnimationFrame(this._onLoop);
        }
      };

      _proto.stop = function stop() {
        if (this._rafId >= 0) {
          this._context.cancelAnimationFrame(this._rafId);
        }

        if (this._rafTimer >= 0) {
          clearTimeout(this._rafTimer);
        }

        this._rafId = -1;
        this._rafTimer = -1;
      }
      /**
       * There can be more than 1 argument when we use XRSession's raf
       */
      ;

      return WebGLAnimator;
    }();

    return WebGLAnimator;
  }();

  var _Promise$5 = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;
  var ImageType = PROJECTION_TYPE;
  var DEVICE_PIXEL_RATIO = devicePixelRatio || 1; // DEVICE_PIXEL_RATIO 가 2를 초과하는 경우는 리소스 낭비이므로 2로 맞춘다.

  if (DEVICE_PIXEL_RATIO > 2) {
    DEVICE_PIXEL_RATIO = 2;
  } // define custom events name

  /**
   * TODO: how to manage events/errortype with PanoViewer
   *
   * I think renderer events should be seperated from viewer events although it has same name.
   */


  var EVENTS$2 = {
    BIND_TEXTURE: "bindTexture",
    IMAGE_LOADED: "imageLoaded",
    ERROR: "error",
    RENDERING_CONTEXT_LOST: "renderingContextLost",
    RENDERING_CONTEXT_RESTORE: "renderingContextRestore"
  };
  var ERROR_TYPE$1 = {
    INVALID_DEVICE: 10,
    NO_WEBGL: 11,
    FAIL_IMAGE_LOAD: 12,
    RENDERER_ERROR: 13
  };

  var PanoImageRenderer =
  /*#__PURE__*/
  function () {
    var PanoImageRenderer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(PanoImageRenderer, _Component);

      function PanoImageRenderer(image, width, height, isVideo, sphericalConfig, renderingContextAttributes) {
        var _this;

        // Super constructor
        _this = _Component.call(this) || this;

        _this._renderStereo = function (time, frame) {
          var vr = _this._vr;
          var gl = _this.context;
          var eyeParams = vr.getEyeParams(gl, frame);
          if (!eyeParams) return;
          vr.beforeRender(gl, frame); // Render both eyes

          for (var _i = 0, _arr = [0, 1]; _i < _arr.length; _i++) {
            var eyeIndex = _arr[_i];
            var eyeParam = eyeParams[eyeIndex];
            _this.mvMatrix = eyeParam.mvMatrix;
            _this.pMatrix = eyeParam.pMatrix;
            gl.viewport.apply(gl, eyeParam.viewport);
            gl.uniform1f(_this.shaderProgram.uEye, eyeIndex);

            _this._bindBuffers();

            _this._draw();
          }

          vr.afterRender();
        };

        _this.exitVR = function () {
          var vr = _this._vr;
          var gl = _this.context;
          var animator = _this._animator;
          if (!vr) return;
          vr.removeEndCallback(_this.exitVR);
          vr.destroy();
          _this._vr = null; // Restore canvas & context on iOS

          if (IS_IOS) {
            _this._restoreStyle();
          }

          _this.updateViewportDimensions(_this.width, _this.height);

          _this._updateViewport();

          gl.bindFramebuffer(gl.FRAMEBUFFER, null);

          _this._bindBuffers();

          _this._shouldForceDraw = true;
          animator.stop();
          animator.setContext(window);
          animator.setCallback(_this._render.bind(_assertThisInitialized(_this)));
          animator.start();
        };

        _this._onFirstVRFrame = function (time, frame) {
          var vr = _this._vr;
          var gl = _this.context;
          var animator = _this._animator; // If rendering is not ready, wait for next frame

          if (!vr.canRender(frame)) return;
          var minusZDir = fromValues$4(0, 0, -1);
          var eyeParam = vr.getEyeParams(gl, frame)[0]; // Extract only rotation

          var mvMatrix = fromMat4(create$2(), eyeParam.mvMatrix);
          var pMatrix = fromMat4(create$2(), eyeParam.pMatrix);
          var mvInv = invert$2(create$2(), mvMatrix);
          var pInv = invert$2(create$2(), pMatrix);
          var viewDir = transformMat3(create$4(), minusZDir, pInv);
          transformMat3(viewDir, viewDir, mvInv);
          var yawOffset = util.yawOffsetBetween(viewDir, fromValues$4(0, 0, 1));

          if (yawOffset === 0) {
            // If the yawOffset is exactly 0, then device sensor is not ready
            // So read it again until it has any value in it
            return;
          }

          vr.setYawOffset(yawOffset);
          animator.setCallback(_this._renderStereo);
        };

        _this.sphericalConfig = sphericalConfig;
        _this.fieldOfView = sphericalConfig.fieldOfView;
        _this.width = width;
        _this.height = height;
        _this._lastQuaternion = null;
        _this._lastYaw = null;
        _this._lastPitch = null;
        _this._lastFieldOfView = null;
        _this.pMatrix = create$3();
        _this.mvMatrix = create$3(); // initialzie pMatrix

        perspective(_this.pMatrix, toRadian(_this.fieldOfView), width / height, 0.1, 100);
        _this.textureCoordBuffer = null;
        _this.vertexBuffer = null;
        _this.indexBuffer = null;
        _this.canvas = _this._initCanvas(width, height);

        _this._setDefaultCanvasStyle();

        _this._wrapper = null; // canvas wrapper

        _this._wrapperOrigStyle = null;
        _this._renderingContextAttributes = renderingContextAttributes;
        _this._image = null;
        _this._imageConfig = null;
        _this._imageIsReady = false;
        _this._shouldForceDraw = false;
        _this._keepUpdate = false; // Flag to specify 'continuous update' on video even when still.

        _this._onContentLoad = _this._onContentLoad.bind(_assertThisInitialized(_this));
        _this._onContentError = _this._onContentError.bind(_assertThisInitialized(_this));
        _this._animator = new WebGLAnimator(); // VR/XR manager

        _this._vr = null;

        if (image) {
          _this.setImage({
            image: image,
            imageType: sphericalConfig.imageType,
            isVideo: isVideo,
            cubemapConfig: sphericalConfig.cubemapConfig
          });
        }

        return _this;
      } // FIXME: Please refactor me to have more loose connection to yawpitchcontrol


      var _proto = PanoImageRenderer.prototype;

      _proto.setYawPitchControl = function setYawPitchControl(yawPitchControl) {
        this._yawPitchControl = yawPitchControl;
      };

      _proto.getContent = function getContent() {
        return this._image;
      };

      _proto.setImage = function setImage(_ref) {
        var image = _ref.image,
            imageType = _ref.imageType,
            _ref$isVideo = _ref.isVideo,
            isVideo = _ref$isVideo === void 0 ? false : _ref$isVideo,
            cubemapConfig = _ref.cubemapConfig;
        this._imageIsReady = false;
        this._isVideo = isVideo;
        this._imageConfig = _extends({
          /* RLUDBF is abnormal, we use it on CUBEMAP only */
          order: imageType === ImageType.CUBEMAP ? "RLUDBF" : "RLUDFB",
          tileConfig: {
            flipHorizontal: false,
            rotation: 0
          }
        }, cubemapConfig);

        this._setImageType(imageType);

        if (this._contentLoader) {
          this._contentLoader.destroy();
        }

        if (isVideo) {
          this._contentLoader = new VideoLoader();
          this._keepUpdate = true;
        } else {
          this._contentLoader = new ImageLoader();
          this._keepUpdate = false;
        } // img element or img url


        this._contentLoader.set(image); // 이미지의 사이즈를 캐시한다.
        // image is reference for content in contentLoader, so it may be not valid if contentLoader is destroyed.


        this._image = this._contentLoader.getElement();
        return this._contentLoader.get().then(this._onContentLoad, this._onContentError)["catch"](function (e) {
          return setTimeout(function () {
            throw e;
          });
        }); // Prevent exceptions from being isolated in promise chain.
      };

      _proto._setImageType = function _setImageType(imageType) {
        var _this2 = this;

        if (!imageType || this._imageType === imageType) {
          return;
        }

        this._imageType = imageType;
        this._isCubeMap = imageType === ImageType.CUBEMAP;

        if (this._renderer) {
          this._renderer.off();
        }

        switch (imageType) {
          case ImageType.CUBEMAP:
            this._renderer = new CubeRenderer();
            break;

          case ImageType.CUBESTRIP:
            this._renderer = new CubeStripRenderer();
            break;

          case ImageType.PANORAMA:
            this._renderer = new CylinderRenderer();
            break;

          case ImageType.STEREOSCOPIC_EQUI:
            this._renderer = new SphereRenderer(this.sphericalConfig.stereoFormat);
            break;

          default:
            this._renderer = new SphereRenderer(STEREO_FORMAT.NONE);
            break;
        }

        this._renderer.on(Renderer.EVENTS.ERROR, function (e) {
          _this2.trigger(EVENTS$2.ERROR, {
            type: ERROR_TYPE$1.RENDERER_ERROR,
            message: e.message
          });
        });

        this._initWebGL();
      };

      _proto._initCanvas = function _initCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        this._onWebglcontextlost = this._onWebglcontextlost.bind(this);
        this._onWebglcontextrestored = this._onWebglcontextrestored.bind(this);
        canvas.addEventListener("webglcontextlost", this._onWebglcontextlost);
        canvas.addEventListener("webglcontextrestored", this._onWebglcontextrestored);
        return canvas;
      };

      _proto._setDefaultCanvasStyle = function _setDefaultCanvasStyle() {
        var canvas = this.canvas;
        canvas.style.bottom = 0;
        canvas.style.left = 0;
        canvas.style.right = 0;
        canvas.style.top = 0;
        canvas.style.margin = "auto";
        canvas.style.maxHeight = "100%";
        canvas.style.maxWidth = "100%";
        canvas.style.outline = "none";
        canvas.style.position = "absolute";
      };

      _proto._onContentError = function _onContentError(error) {
        this._imageIsReady = false;
        this._image = null;
        this.trigger(EVENTS$2.ERROR, {
          type: ERROR_TYPE$1.FAIL_IMAGE_LOAD,
          message: "failed to load image"
        });
        return false;
      };

      _proto._triggerContentLoad = function _triggerContentLoad() {
        this.trigger(EVENTS$2.IMAGE_LOADED, {
          content: this._image,
          isVideo: this._isVideo,
          projectionType: this._imageType
        });
      };

      _proto._onContentLoad = function _onContentLoad(image) {
        this._imageIsReady = true;

        this._triggerContentLoad();

        return true;
      };

      _proto.isImageLoaded = function isImageLoaded() {
        return !!this._image && this._imageIsReady && (!this._isVideo || this._image.readyState >= 2
        /* HAVE_CURRENT_DATA */
        );
      };

      _proto.bindTexture = function bindTexture() {
        var _this3 = this;

        return new _Promise$5(function (res, rej) {
          if (!_this3._contentLoader) {
            rej("ImageLoader is not initialized");
            return;
          }

          _this3._contentLoader.get().then(function () {
            _this3._bindTexture();
          }, rej).then(res);
        });
      } // 부모 엘리먼트에 canvas 를 붙임
      ;

      _proto.attachTo = function attachTo(parentElement) {
        this.detach();
        parentElement.appendChild(this.canvas);
        this._wrapper = parentElement;
      };

      _proto.forceContextLoss = function forceContextLoss() {
        if (this.hasRenderingContext()) {
          var loseContextExtension = this.context.getExtension("WEBGL_lose_context");

          if (loseContextExtension) {
            loseContextExtension.loseContext();
          }
        }
      } // 부모 엘리먼트에서 canvas 를 제거
      ;

      _proto.detach = function detach() {
        if (this.canvas.parentElement) {
          this.canvas.parentElement.removeChild(this.canvas);
        }
      };

      _proto.destroy = function destroy() {
        if (this._contentLoader) {
          this._contentLoader.destroy();
        }

        this._animator.stop();

        this.detach();
        this.forceContextLoss();
        this.off();
        this.canvas.removeEventListener("webglcontextlost", this._onWebglcontextlost);
        this.canvas.removeEventListener("webglcontextrestored", this._onWebglcontextrestored);
      };

      _proto.hasRenderingContext = function hasRenderingContext() {
        if (!(this.context && !this.context.isContextLost())) {
          return false;
        } else if (this.context && !this.context.getProgramParameter(this.shaderProgram, this.context.LINK_STATUS)) {
          return false;
        }

        return true;
      };

      _proto._initShaderProgram = function _initShaderProgram() {
        var gl = this.context;

        if (this.shaderProgram) {
          gl.deleteProgram(this.shaderProgram);
          this.shaderProgram = null;
        }

        var renderer = this._renderer;
        var vsSource = renderer.getVertexShaderSource();
        var fsSource = renderer.getFragmentShaderSource();
        var vertexShader = WebGLUtils.createShader(gl, gl.VERTEX_SHADER, vsSource);
        var fragmentShader = WebGLUtils.createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        var shaderProgram = WebGLUtils.createProgram(gl, vertexShader, fragmentShader);

        if (!shaderProgram) {
          throw new Error("Failed to intialize shaders: " + WebGLUtils.getErrorNameFromWebGLErrorCode(gl.getError()));
        }

        gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        shaderProgram.uEye = gl.getUniformLocation(shaderProgram, "uEye");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute); // clear buffer

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT); // Use TEXTURE0

        gl.uniform1i(shaderProgram.samplerUniform, 0);
        this.shaderProgram = shaderProgram;
      };

      _proto._onWebglcontextlost = function _onWebglcontextlost(e) {
        e.preventDefault();
        this.trigger(EVENTS$2.RENDERING_CONTEXT_LOST);
      };

      _proto._onWebglcontextrestored = function _onWebglcontextrestored(e) {
        this._initWebGL();

        this.trigger(EVENTS$2.RENDERING_CONTEXT_RESTORE);
      };

      _proto.updateFieldOfView = function updateFieldOfView(fieldOfView) {
        this.fieldOfView = fieldOfView;

        this._updateViewport();
      };

      _proto.updateViewportDimensions = function updateViewportDimensions(width, height) {
        var viewPortChanged = false;
        this.width = width;
        this.height = height;
        var w = width * DEVICE_PIXEL_RATIO;
        var h = height * DEVICE_PIXEL_RATIO;

        if (w !== this.canvas.width) {
          this.canvas.width = w;
          viewPortChanged = true;
        }

        if (h !== this.canvas.height) {
          this.canvas.height = h;
          viewPortChanged = true;
        }

        if (!viewPortChanged) {
          return;
        }

        this._updateViewport();

        this._shouldForceDraw = true;
      };

      _proto._updateViewport = function _updateViewport() {
        perspective(this.pMatrix, toRadian(this.fieldOfView), this.canvas.width / this.canvas.height, 0.1, 100);
        this.context.viewport(0, 0, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
      };

      _proto._initWebGL = function _initWebGL() {
        var gl; // TODO: Following code does need to be executed only if width/height, cubicStrip property is changed.

        try {
          this._initRenderingContext();

          gl = this.context;
          this.updateViewportDimensions(this.width, this.height);

          this._initShaderProgram();
        } catch (e) {
          this.trigger(EVENTS$2.ERROR, {
            type: ERROR_TYPE$1.NO_WEBGL,
            message: "no webgl support"
          });
          this.destroy();
          console.error(e); // eslint-disable-line no-console

          return;
        } // 캔버스를 투명으로 채운다.


        gl.clearColor(0, 0, 0, 0);
        var textureTarget = this._isCubeMap ? gl.TEXTURE_CUBE_MAP : gl.TEXTURE_2D;

        if (this.texture) {
          gl.deleteTexture(this.texture);
        }

        this.texture = WebGLUtils.createTexture(gl, textureTarget);

        if (this._imageType === ImageType.CUBESTRIP) {
          // TODO: Apply following options on other projection type.
          gl.enable(gl.CULL_FACE); // gl.enable(gl.DEPTH_TEST);
        }
      };

      _proto._initRenderingContext = function _initRenderingContext() {
        if (this.hasRenderingContext()) {
          return;
        }

        if (!window.WebGLRenderingContext) {
          throw new Error("WebGLRenderingContext not available.");
        }

        this.context = WebGLUtils.getWebglContext(this.canvas, this._renderingContextAttributes);

        if (!this.context) {
          throw new Error("Failed to acquire 3D rendering context");
        }
      };

      _proto._initBuffers = function _initBuffers() {
        var vertexPositionData = this._renderer.getVertexPositionData();

        var indexData = this._renderer.getIndexData();

        var textureCoordData = this._renderer.getTextureCoordData(this._imageConfig);

        var gl = this.context;
        this.vertexBuffer = WebGLUtils.initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), 3, this.shaderProgram.vertexPositionAttribute);
        this.indexBuffer = WebGLUtils.initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), 1);
        this.textureCoordBuffer = WebGLUtils.initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(textureCoordData), this._isCubeMap ? 3 : 2, this.shaderProgram.textureCoordAttribute);

        this._bindBuffers();
      };

      _proto._bindTexture = function _bindTexture() {
        // Detect if it is EAC Format while CUBESTRIP mode.
        // We assume it is EAC if image is not 3/2 ratio.
        if (this._imageType === ImageType.CUBESTRIP) {
          var _this$_renderer$getDi = this._renderer.getDimension(this._image),
              width = _this$_renderer$getDi.width,
              height = _this$_renderer$getDi.height;

          var isEAC = width && height && width / height !== 1.5;
          this.context.uniform1f(this.context.getUniformLocation(this.shaderProgram, "uIsEAC"), isEAC);
        } else if (this._imageType === ImageType.PANORAMA) {
          var _this$_renderer$getDi2 = this._renderer.getDimension(this._image),
              _width = _this$_renderer$getDi2.width,
              _height = _this$_renderer$getDi2.height;

          var imageAspectRatio = _width && _height && _width / _height;

          this._renderer.updateShaderData({
            imageAspectRatio: imageAspectRatio
          });
        } // intialize shader buffers after image is loaded.(by updateShaderData)
        // because buffer may be differ by image size.(eg. CylinderRenderer)


        this._initBuffers();

        this._renderer.bindTexture(this.context, this.texture, this._image, this._imageConfig);

        this._shouldForceDraw = true;
        this.trigger(EVENTS$2.BIND_TEXTURE);
      };

      _proto._updateTexture = function _updateTexture() {
        this._renderer.updateTexture(this.context, this._image, this._imageConfig);
      };

      _proto.keepUpdate = function keepUpdate(doUpdate) {
        if (doUpdate && this.isImageLoaded() === false) {
          // Force to draw a frame after image is loaded on render()
          this._shouldForceDraw = true;
        }

        this._keepUpdate = doUpdate;
      };

      _proto.startRender = function startRender() {
        this._animator.setCallback(this._render.bind(this));

        this._animator.start();
      };

      _proto.stopRender = function stopRender() {
        this._animator.stop();
      };

      _proto.renderWithQuaternion = function renderWithQuaternion(quaternion, fieldOfView) {
        if (!this.isImageLoaded()) {
          return;
        }

        if (this._keepUpdate === false && this._lastQuaternion && exactEquals$6(this._lastQuaternion, quaternion) && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
          return;
        } // updatefieldOfView only if fieldOfView is changed.


        if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
          this.updateFieldOfView(fieldOfView);
        }

        this.mvMatrix = fromQuat$1(create$3(), quaternion);

        this._draw();

        this._lastQuaternion = clone$6(quaternion);

        if (this._shouldForceDraw) {
          this._shouldForceDraw = false;
        }
      };

      _proto.renderWithYawPitch = function renderWithYawPitch(yaw, pitch, fieldOfView) {
        if (!this.isImageLoaded()) {
          return;
        }

        if (this._keepUpdate === false && this._lastYaw !== null && this._lastYaw === yaw && this._lastPitch !== null && this._lastPitch === pitch && this.fieldOfView && this.fieldOfView === fieldOfView && this._shouldForceDraw === false) {
          return;
        } // fieldOfView 가 존재하면서 기존의 값과 다를 경우에만 업데이트 호출


        if (fieldOfView !== undefined && fieldOfView !== this.fieldOfView) {
          this.updateFieldOfView(fieldOfView);
        }

        identity$3(this.mvMatrix);
        rotateX(this.mvMatrix, this.mvMatrix, -toRadian(pitch));
        rotateY(this.mvMatrix, this.mvMatrix, -toRadian(yaw));

        this._draw();

        this._lastYaw = yaw;
        this._lastPitch = pitch;

        if (this._shouldForceDraw) {
          this._shouldForceDraw = false;
        }
      };

      _proto._render = function _render() {
        var yawPitchControl = this._yawPitchControl;
        var fov = yawPitchControl.getFov();

        if (yawPitchControl.shouldRenderWithQuaternion()) {
          var quaternion = yawPitchControl.getQuaternion();
          this.renderWithQuaternion(quaternion, fov);
        } else {
          var yawPitch = yawPitchControl.getYawPitch();
          this.renderWithYawPitch(yawPitch.yaw, yawPitch.pitch, fov);
        }
      };

      _proto._bindBuffers = function _bindBuffers() {
        var gl = this.context;
        var program = this.shaderProgram;
        var vertexBuffer = this.vertexBuffer;
        var textureCoordBuffer = this.textureCoordBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.enableVertexAttribArray(program.vertexPositionAttribute);
        gl.vertexAttribPointer(program.vertexPositionAttribute, vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.enableVertexAttribArray(program.textureCoordAttribute);
        gl.vertexAttribPointer(program.textureCoordAttribute, textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
      };

      _proto._draw = function _draw() {
        if (this._isVideo && this._keepUpdate) {
          this._updateTexture();
        }

        this._renderer.render({
          gl: this.context,
          shaderProgram: this.shaderProgram,
          indexBuffer: this.indexBuffer,
          mvMatrix: this.mvMatrix,
          pMatrix: this.pMatrix
        });
      }
      /**
       * Returns projection renderer by each type
       */
      ;

      _proto.getProjectionRenderer = function getProjectionRenderer() {
        return this._renderer;
      }
      /**
       * @return Promise
       */
      ;

      _proto.enterVR = function enterVR() {
        var vr = this._vr;

        if (!WEBXR_SUPPORTED && !navigator.getVRDisplays) {
          return _Promise$5.reject("VR is not available on this browser.");
        }

        if (vr && vr.isPresenting()) {
          return _Promise$5.resolve("VR already enabled.");
        }

        return this._requestPresent();
      };

      _proto._requestPresent = function _requestPresent() {
        var _this4 = this;

        var gl = this.context;
        var canvas = this.canvas;
        var animator = this._animator;
        this._vr = WEBXR_SUPPORTED ? new XRManager() : new VRManager();
        var vr = this._vr;
        animator.stop();
        return new _Promise$5(function (resolve, reject) {
          vr.requestPresent(canvas, gl).then(function () {
            vr.addEndCallback(_this4.exitVR);
            animator.setContext(vr.context);
            animator.setCallback(_this4._onFirstVRFrame);

            if (IS_IOS) {
              _this4._setWrapperFullscreen();
            }

            _this4._shouldForceDraw = true;
            animator.start();
            resolve("success");
          })["catch"](function (e) {
            vr.destroy();
            _this4._vr = null;
            animator.start();
            reject(e);
          });
        });
      };

      _proto._setWrapperFullscreen = function _setWrapperFullscreen() {
        var wrapper = this._wrapper;
        if (!wrapper) return;
        this._wrapperOrigStyle = wrapper.getAttribute("style");
        var wrapperStyle = wrapper.style;
        wrapperStyle.width = "100vw";
        wrapperStyle.height = "100vh";
        wrapperStyle.position = "fixed";
        wrapperStyle.left = "0";
        wrapperStyle.top = "0";
        wrapperStyle.zIndex = "9999";
      };

      _proto._restoreStyle = function _restoreStyle() {
        var wrapper = this._wrapper;
        var canvas = this.canvas;
        if (!wrapper) return;

        if (this._wrapperOrigStyle) {
          wrapper.setAttribute("style", this._wrapperOrigStyle);
        } else {
          wrapper.removeAttribute("style");
        }

        this._wrapperOrigStyle = null; // Restore canvas style

        canvas.removeAttribute("style");

        this._setDefaultCanvasStyle();
      };

      return PanoImageRenderer;
    }(Component);

    PanoImageRenderer.EVENTS = EVENTS$2;
    PanoImageRenderer.ERROR_TYPE = ERROR_TYPE$1;
    return PanoImageRenderer;
  }();

  var _Promise$6 = typeof Promise === 'undefined' ? es6Promise.Promise : Promise;

  var PanoViewer =
  /*#__PURE__*/
  function () {
    var PanoViewer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(PanoViewer, _Component);

      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.view360.PanoViewer.VERSION;  // ex) 3.0.1
       * @memberof eg.view360.PanoViewer
       */
      // It should be deprecated!

      /**
       * Constant value for touch directions
       * @ko 터치 방향에 대한 상수 값.
       * @namespace
       * @name TOUCH_DIRECTION
       * @memberof eg.view360.PanoViewer
       */

      /**
       * @classdesc 360 media viewer
       * @ko 360 미디어 뷰어
       * @class
       * @name eg.view360.PanoViewer
       * @extends eg.Component
       *
       * @param {HTMLElement} container The container element for the renderer. <ko>렌더러의 컨테이너 엘리먼트</ko>
       * @param {Object} config
       *
       * @param {String|Image} config.image Input image url or element (Use only image property or video property)<ko>입력 이미지 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
       * @param {String|HTMLVideoElement} config.video Input video url or element(Use only image property or video property)<ko>입력 비디오 URL 혹은 엘리먼트(image 와 video 둘 중 하나만 설정)</ko>
       * @param {String} [config.projectionType=equirectangular] The type of projection: equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}<ko>Projection 유형 : equirectangular, cubemap <br/>{@link eg.view360.PanoViewer.PROJECTION_TYPE}</ko>
       * @param {Object} config.cubemapConfig config cubemap projection layout. It is applied when projectionType is {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} or {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP}<ko>cubemap projection type 의 레이아웃을 설정한다. 이 설정은 ProjectionType이 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP} 혹은 {@link eg.view360.PanoViewer.PROJECTION_TYPE.CUBESTRIP} 인 경우에만 적용된다.</ko>
       * @param {Object} [config.cubemapConfig.order = "RLUDBF"(ProjectionType === CUBEMAP) | "RLUDFB" (ProjectionType === CUBESTRIP)] Order of cubemap faces <ko>Cubemap 형태의 이미지가 배치된 순서</ko>
       * @param {Object} [config.cubemapConfig.tileConfig = {flipHorizontal:false, rotation: 0}] Setting about rotation angle(degree) and whether to flip horizontal for each cubemap faces, if you put this object as a array, you can set each faces with different setting. For example, [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]<ko>각 Cubemap 면에 대한 회전 각도/좌우반전 여부 설정, 객체를 배열 형태로 지정하여 각 면에 대한 설정을 다르게 지정할 수도 있다. 예를 들어 [{flipHorizontal:false, rotation:90}, {flipHorizontal: true, rotation: 180}, ...]과 같이 지정할 수 있다.</ko>
       * @param {String} [config.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection.<br/>See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다.<br/>{@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
       * @param {Number} [config.width=width of container] the viewer's width. (in px) <ko>뷰어의 너비 (px 단위)</ko>
       * @param {Number} [config.height=height of container] the viewer's height.(in px) <ko>뷰어의 높이 (px 단위)</ko>
       *
       * @param {Number} [config.yaw=0] Initial Yaw of camera (in degree) <ko>카메라의 초기 Yaw (degree 단위)</ko>
       * @param {Number} [config.pitch=0] Initial Pitch of camera (in degree) <ko>카메라의 초기 Pitch (degree 단위)</ko>
       * @param {Number} [config.fov=65] Initial vertical field of view of camera (in degree) <ko>카메라의 초기 수직 field of view (degree 단위)</ko>
       * @param {Boolean} [config.showPolePoint=false] If false, the pole is not displayed inside the viewport <ko>false 인 경우, 극점은 뷰포트 내부에 표시되지 않습니다</ko>
       * @param {Boolean} [config.useZoom=true] When true, enables zoom with the wheel and Pinch gesture <ko>true 일 때 휠 및 집기 제스춰로 확대 / 축소 할 수 있습니다.</ko>
       * @param {Boolean} [config.useKeyboard=true] When true, enables the keyboard move key control: awsd, arrow keys <ko>true 이면 키보드 이동 키 컨트롤을 활성화합니다: awsd, 화살표 키</ko>
       * @param {String} [config.gyroMode=yawPitch] Enables control through device motion. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} <ko>디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR") <br/>{@link eg.view360.PanoViewer.GYRO_MODE} </ko>
       * @param {Array} [config.yawRange=[-180, 180]] Range of controllable Yaw values <ko>제어 가능한 Yaw 값의 범위</ko>
       * @param {Array} [config.pitchRange=[-90, 90]] Range of controllable Pitch values <ko>제어 가능한 Pitch 값의 범위</ko>
       * @param {Array} [config.fovRange=[30, 110]] Range of controllable vertical field of view values <ko>제어 가능한 수직 field of view 값의 범위</ko>
       * @param {Number} [config.touchDirection= {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}(6)] Direction of touch that can be controlled by user <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>사용자가 터치로 조작 가능한 방향 <br/>{@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       *
       * @example
       * // PanoViewer Creation
       * // create PanoViewer with option
       * var PanoViewer = eg.view360.PanoViewer;
       * // Area where the image will be displayed(HTMLElement)
       * var container = document.getElementById("myPanoViewer");
       *
       * var panoViewer = new PanoViewer(container, {
       *     // If projectionType is not specified, the default is "equirectangular".
       *     // Specifies an image of the "equirectangular" type.
       *     image: "/path/to/image/image.jpg"
       *});
       *
       * @example
       * // Cubemap Config Setting Example
       * // For support Youtube EAC projection, You should set cubemapConfig as follows.
       * cubemapConfig: {
       * 	order: "LFRDBU",
       * 	tileConfig: [
       * 		tileConfig: [{rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: 0}, {rotation: -90}, {rotation: 180}]
       * 	]
       * }
       */
      function PanoViewer(container, options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _Component.call(this) || this; // Raises the error event if webgl is not supported.

        if (!WebGLUtils.isWebGLAvailable()) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.NO_WEBGL,
              message: "no webgl support"
            });
          }, 0);
          return _assertThisInitialized(_this) || _assertThisInitialized(_this);
        }

        if (!WebGLUtils.isStableWebGL()) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.INVALID_DEVICE,
              message: "blacklisted browser"
            });
          }, 0);
          return _assertThisInitialized(_this) || _assertThisInitialized(_this);
        }

        if (!!options.image && !!options.video) {
          setTimeout(function () {
            _this.trigger(EVENTS$1.ERROR, {
              type: ERROR_TYPE.INVALID_RESOURCE,
              message: "Specifying multi resouces(both image and video) is not valid."
            });
          }, 0);
          return _assertThisInitialized(_this) || _assertThisInitialized(_this);
        } // Check XR support at not when imported, but when created.
        // This is intended to make polyfills easier to use.


        checkXRSupport();
        _this._container = container;
        _this._image = options.image || options.video;
        _this._isVideo = !!options.video;
        _this._projectionType = options.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
        _this._cubemapConfig = _extends({
          /* RLUDBF is abnormal, we use it on CUBEMAP only for backward compatibility*/
          order: _this._projectionType === PROJECTION_TYPE.CUBEMAP ? "RLUDBF" : "RLUDFB",
          tileConfig: {
            flipHorizontal: false,
            rotation: 0
          }
        }, options.cubemapConfig);
        _this._stereoFormat = options.stereoFormat || STEREO_FORMAT.TOP_BOTTOM; // If the width and height are not provided, will use the size of the container.

        _this._width = options.width || parseInt(window.getComputedStyle(container).width, 10);
        _this._height = options.height || parseInt(window.getComputedStyle(container).height, 10);
        /**
         * Cache the direction for the performance in renderLoop
         *
         * This value should be updated by "change" event of YawPitchControl.
         */

        _this._yaw = options.yaw || 0;
        _this._pitch = options.pitch || 0;
        _this._fov = options.fov || 65;
        _this._gyroMode = options.gyroMode || GYRO_MODE.YAWPITCH;
        _this._quaternion = null;
        _this._aspectRatio = _this._height !== 0 ? _this._width / _this._height : 1;
        var fovRange = options.fovRange || [30, 110];
        var touchDirection = PanoViewer._isValidTouchDirection(options.touchDirection) ? options.touchDirection : YawPitchControl.TOUCH_DIRECTION_ALL;

        var yawPitchConfig = _extends(options, {
          element: container,
          yaw: _this._yaw,
          pitch: _this._pitch,
          fov: _this._fov,
          gyroMode: _this._gyroMode,
          fovRange: fovRange,
          aspectRatio: _this._aspectRatio,
          touchDirection: touchDirection
        });

        _this._isReady = false;

        _this._initYawPitchControl(yawPitchConfig);

        _this._initRenderer(_this._yaw, _this._pitch, _this._fov, _this._projectionType, _this._cubemapConfig);

        return _this;
      }
      /**
       * Get the video element that the viewer is currently playing. You can use this for playback.
       * @ko 뷰어가 현재 사용 중인 비디오 요소를 얻습니다. 이 요소를 이용해 비디오의 컨트롤을 할 수 있습니다.
       * @method eg.view360.PanoViewer#getVideo
       * @return {HTMLVideoElement} HTMLVideoElement<ko>HTMLVideoElement</ko>
       * @example
       * var videoTag = panoViewer.getVideo();
       * videoTag.play(); // play video!
       */


      var _proto = PanoViewer.prototype;

      _proto.getVideo = function getVideo() {
        if (!this._isVideo) {
          return null;
        }

        return this._photoSphereRenderer.getContent();
      }
      /**
       * Set the video information to be used by the viewer.
       * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
       * @method eg.view360.PanoViewer#setVideo
       * @param {String|HTMLVideoElement|Object} video Input video url or element or config object<ko>입력 비디오 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정)</ko>
       * @param {Object} param
       * @param {String} [param.projectionType={@link eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR}("equirectangular")] Projection Type<ko>프로젝션 타입</ko>
       * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 의 레이아웃 설정</ko>
       * @param {String} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
       *
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setVideo("/path/to/video/video.mp4", {
       *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR
       * });
       */
      ;

      _proto.setVideo = function setVideo(video, param) {
        if (param === void 0) {
          param = {};
        }

        if (video) {
          this.setImage(video, {
            projectionType: param.projectionType,
            isVideo: true,
            cubemapConfig: param.cubemapConfig,
            stereoFormat: param.stereoFormat
          });
        }

        return this;
      }
      /**
       * Get the image information that the viewer is currently using.
       * @ko 뷰어가 현재 사용하고있는 이미지 정보를 얻습니다.
       * @method eg.view360.PanoViewer#getImage
       * @return {Image} Image Object<ko>이미지 객체</ko>
       * @example
       * var imageObj = panoViewer.getImage();
       */
      ;

      _proto.getImage = function getImage() {
        if (this._isVideo) {
          return null;
        }

        return this._photoSphereRenderer.getContent();
      }
      /**
       * Set the image information to be used by the viewer.
       * @ko 뷰어가 사용할 이미지 정보를 설정합니다.
       * @method eg.view360.PanoViewer#setImage
       * @param {String|Image|Object} image Input image url or element or config object<ko>입력 이미지 URL 혹은 엘리먼트 혹은 설정객체를 활용(image 와 video 둘 중 하나만 설정한다.)</ko>
       * @param {Object} param Additional information<ko>이미지 추가 정보</ko>
       * @param {String} [param.projectionType="equirectangular"] Projection Type<ko>프로젝션 타입</ko>
       * @param {Object} param.cubemapConfig config cubemap projection layout. <ko>cubemap projection type 레이아웃</ko>
       * @param {String} [param.stereoFormat="3dv"] Contents format of the stereoscopic equirectangular projection. See {@link eg.view360.PanoViewer.STEREO_FORMAT}.<ko>Stereoscopic equirectangular projection type의 콘텐츠 포맷을 설정한다. {@link eg.view360.PanoViewer.STEREO_FORMAT} 참조.</ko>
       *
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setImage("/path/to/image/image.png", {
       *     projectionType: eg.view360.PanoViewer.PROJECTION_TYPE.CUBEMAP
       * });
       */
      ;

      _proto.setImage = function setImage(image, param) {
        if (param === void 0) {
          param = {};
        }

        var cubemapConfig = _extends({
          order: "RLUDBF",
          tileConfig: {
            flipHorizontal: false,
            rotation: 0
          }
        }, param.cubemapConfig);

        var stereoFormat = param.stereoFormat || STEREO_FORMAT.TOP_BOTTOM;
        var isVideo = !!param.isVideo;

        if (this._image && this._isVideo !== isVideo) {
          /* eslint-disable no-console */
          console.warn("Currently not supporting to change content type(Image <--> Video)");
          /* eslint-enable no-console */

          return this;
        }

        if (image) {
          this._image = image;
          this._isVideo = isVideo;
          this._projectionType = param.projectionType || PROJECTION_TYPE.EQUIRECTANGULAR;
          this._cubemapConfig = cubemapConfig;
          this._stereoFormat = stereoFormat;

          this._deactivate();

          this._initRenderer(this._yaw, this._pitch, this._fov, this._projectionType, this._cubemapConfig);
        }

        return this;
      }
      /**
       * Set whether the renderer always updates the texture and renders.
       * @ko 렌더러가 항상 텍스쳐를 갱신하고 화면을 렌더링 할지 여부를 설정할 수 있습니다.
       *
       * @method eg.view360.PanoViewer#keepUpdate
       * @param {Boolean} doUpdate When true viewer will always update texture and render, when false viewer will not update texture and render only camera config is changed.<ko>true면 항상 텍스쳐를 갱신하고 화면을 그리는 반면, false면 텍스쳐 갱신은 하지 않으며, 카메라 요소에 변화가 있을 때에만 화면을 그립니다.</ko>
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.keepUpdate = function keepUpdate(doUpdate) {
        this._photoSphereRenderer.keepUpdate(doUpdate);

        return this;
      }
      /**
       * Get projection type (equirectangular/cube)
       * @ko 프로젝션 타입(Equirectangular 혹은 Cube)을 반환합니다.
       *
       * @method eg.view360.PanoViewer#getProjectionType
       * @return {String} {@link eg.view360.PanoViewer.PROJECTION_TYPE}
       */
      ;

      _proto.getProjectionType = function getProjectionType() {
        return this._projectionType;
      }
      /**
       * Reactivate the device's motion sensor. Motion sensor will work only if you enabled `gyroMode` option.
       * If it's iOS13+, this method must be used in the context of user interaction, like onclick callback on the button element.
       * @ko 디바이스의 모션 센서를 재활성화합니다. 모션 센서는 `gyroMode` 옵션을 활성화해야만 사용할 수 있습니다.
       * iOS13+일 경우, 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
       * @see {@link eg.view360.PanoViewer#setGyroMode}
       * @method eg.view360.PanoViewer#enableSensor
       * @return {Promise<string>} Promise containing nothing when resolved, or string of the rejected reason when rejected.<ko>Promise. resolve되었을 경우 아무것도 반환하지 않고, reject되었을 경우 그 이유를 담고있는 string을 반환한다.</ko>
       */
      ;

      _proto.enableSensor = function enableSensor() {
        return this._yawPitchControl.enableSensor();
      }
      /**
       * Disable the device's motion sensor.
       * @ko 디바이스의 모션 센서를 비활성화합니다.
       * @see {@link eg.view360.PanoViewer#setGyroMode}
       * @method eg.view360.PanoViewer#disableSensor
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.disableSensor = function disableSensor() {
        this._yawPitchControl.disableSensor();

        return this;
      }
      /**
       * Switch to VR stereo rendering mode which uses WebXR / WebVR API (WebXR is preferred).
       * This method must be used in the context of user interaction, like onclick callback on the button element.
       * It can be rejected when an enabling device sensor fails or image/video is still loading("ready" event not triggered).
       * @ko WebXR / WebVR API를 사용하는 VR 스테레오 렌더링 모드로 전환합니다. (WebXR을 더 선호합니다)
       * 이 메소드는 사용자 인터렉션에 의해서 호출되어야 합니다. 예로, 버튼의 onclick 콜백과 같은 콘텍스트에서 호출되어야 합니다.
       * 디바이스 센서 활성화에 실패시 혹은 아직 이미지/비디오가 로딩중인 경우("ready"이벤트가 아직 트리거되지 않은 경우)에는 Promise가 reject됩니다.
       * @method eg.view360.PanoViewer#enterVR
       * @return {Promise<string>} Promise containing either a string of resolved reason or an Error instance of rejected reason.<ko>Promise가 resolve된 이유(string) 혹은 reject된 이유(Error)</ko>
       */
      ;

      _proto.enterVR = function enterVR() {
        var _this2 = this;

        if (!this._isReady) {
          return _Promise$6.reject(new Error("PanoViewer is not ready to show image."));
        }

        return new _Promise$6(function (resolve, reject) {
          _this2.enableSensor().then(function () {
            return _this2._photoSphereRenderer.enterVR();
          }).then(function (res) {
            return resolve(res);
          })["catch"](function (e) {
            return reject(e);
          });
        });
      }
      /**
       * Exit VR stereo rendering mode.
       * @ko VR 스테레오 렌더링 모드에서 일반 렌더링 모드로 전환합니다.
       *
       * @method eg.view360.PanoViewer#exitVR
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.exitVR = function exitVR() {
        this._photoSphereRenderer.exitVR();

        return this;
      } // TODO: Remove parameters as they're just using private values
      ;

      _proto._initRenderer = function _initRenderer(yaw, pitch, fov, projectionType, cubemapConfig) {
        var _this3 = this;

        this._photoSphereRenderer = new PanoImageRenderer(this._image, this._width, this._height, this._isVideo, {
          initialYaw: yaw,
          initialPitch: pitch,
          fieldOfView: fov,
          imageType: projectionType,
          cubemapConfig: cubemapConfig,
          stereoFormat: this._stereoFormat
        });

        this._photoSphereRenderer.setYawPitchControl(this._yawPitchControl);

        this._bindRendererHandler();

        this._photoSphereRenderer.bindTexture().then(function () {
          return _this3._activate();
        })["catch"](function () {
          _this3._triggerEvent(EVENTS$1.ERROR, {
            type: ERROR_TYPE.FAIL_BIND_TEXTURE,
            message: "failed to bind texture"
          });
        });
      }
      /**
       * update values of YawPitchControl if needed.
       * For example, In Panorama mode, initial fov and pitchRange is changed by aspect ratio of image.
       *
       * This function should be called after isReady status is true.
       */
      ;

      _proto._updateYawPitchIfNeeded = function _updateYawPitchIfNeeded() {
        if (this._projectionType === PanoViewer.ProjectionType.PANORAMA) {
          // update fov by aspect ratio
          var image = this._photoSphereRenderer.getContent();

          var imageAspectRatio = image.naturalWidth / image.naturalHeight;
          var isCircular;
          var yawSize;
          var maxFov; // If height is larger than width, then we assume it's rotated by 90 degree.

          if (imageAspectRatio < 1) {
            // So inverse the aspect ratio.
            imageAspectRatio = 1 / imageAspectRatio;
          }

          if (imageAspectRatio < 6) {
            yawSize = util.toDegree(imageAspectRatio);
            isCircular = false; // 0.5 means ratio of half height of cylinder(0.5) and radius of cylider(1). 0.5/1 = 0.5

            maxFov = util.toDegree(Math.atan(0.5)) * 2;
          } else {
            yawSize = 360;
            isCircular = true;
            maxFov = 360 / imageAspectRatio; // Make it 5 fixed as axes does.
          } // console.log("_updateYawPitchIfNeeded", maxFov, "aspectRatio", image.naturalWidth, image.naturalHeight, "yawSize", yawSize);


          var minFov = this._yawPitchControl.option("fovRange")[0]; // this option should be called after fov is set.


          this._yawPitchControl.option({
            "fov": maxFov,

            /* parameter for internal validation for pitchrange */
            "yawRange": [-yawSize / 2, yawSize / 2],
            isCircular: isCircular,
            "pitchRange": [-maxFov / 2, maxFov / 2],
            "fovRange": [minFov, maxFov]
          });

          this.lookAt({
            fov: maxFov
          });
        }
      };

      _proto._bindRendererHandler = function _bindRendererHandler() {
        var _this4 = this;

        this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.ERROR, function (e) {
          _this4.trigger(EVENTS$1.ERROR, e);
        });

        this._photoSphereRenderer.on(PanoImageRenderer.EVENTS.RENDERING_CONTEXT_LOST, function (e) {
          _this4._deactivate();

          _this4.trigger(EVENTS$1.ERROR, {
            type: ERROR_TYPE.RENDERING_CONTEXT_LOST,
            message: "webgl rendering context lost"
          });
        });
      };

      _proto._initYawPitchControl = function _initYawPitchControl(yawPitchConfig) {
        var _this5 = this;

        this._yawPitchControl = new YawPitchControl(yawPitchConfig);

        this._yawPitchControl.on(EVENTS$1.ANIMATION_END, function (e) {
          _this5._triggerEvent(EVENTS$1.ANIMATION_END, e);
        });

        this._yawPitchControl.on("change", function (e) {
          _this5._yaw = e.yaw;
          _this5._pitch = e.pitch;
          _this5._fov = e.fov;
          _this5._quaternion = e.quaternion;

          _this5._triggerEvent(EVENTS$1.VIEW_CHANGE, e);
        });
      };

      _proto._triggerEvent = function _triggerEvent(name, param) {
        var evt = param || {};
        /**
         * Events that is fired when error occurs
         * @ko 에러 발생 시 발생하는 이벤트
         * @name eg.view360.PanoViewer#error
         * @event
         * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {Number} param.type Error type
         * 		10: INVALID_DEVICE: Unsupported device
         * 		11: NO_WEBGL: Webgl not support
         * 		12, FAIL_IMAGE_LOAD: Failed to load image
         * 		13: FAIL_BIND_TEXTURE: Failed to bind texture
         * 		14: INVALID_RESOURCE: Only one resource(image or video) should be specified
         * 		15: RENDERING_CONTEXT_LOST: WebGL context lost occurred
         * <ko>에러 종류
         * 		10: INVALID_DEVICE: 미지원 기기
         * 		11: NO_WEBGL: WEBGL 미지원
         * 		12, FAIL_IMAGE_LOAD: 이미지 로드 실패
         * 		13: FAIL_BIND_TEXTURE: 텍스쳐 바인딩 실패
         * 		14: INVALID_RESOURCE: 리소스 지정 오류 (image 혹은 video 중 하나만 지정되어야 함)
         * 		15: RENDERING_CONTEXT_LOST: WebGL context lost 발생
         * </ko>
         * @param {String} param.message Error message <ko>에러 메시지</ko>
         * @see {@link eg.view360.PanoViewer.ERROR_TYPE}
         * @example
         *
         * viwer.on({
         *	"error" : function(evt) {
         *		// evt.type === 13
         *		// evt.message === "failed to bind texture"
         * });
         *
         * // constant can be used
         * viwer.on({
         *	eg.view360.PanoViewer.EVENTS.ERROR : function(evt) {
         *		// evt.type === eg.view360.PanoViewer.ERROR_TYPE.FAIL_BIND_TEXTURE
         *		// evt.message === "failed to bind texture"
         * });
         */

        /**
         * Events that is fired when PanoViewer is ready to go.
         * @ko PanoViewer 가 준비된 상태에 발생하는 이벤트
         * @name eg.view360.PanoViewer#ready
         * @event
         *
         * @example
         *
         * viwer.on({
         *	"ready" : function(evt) {
         *		// PanoViewer is ready to show image and handle user interaction.
         * });
         */

        /**
         * Events that is fired when direction or fov is changed.
         * @ko PanoViewer 에서 바라보고 있는 방향이나 FOV(화각)가 변경되었을때 발생하는 이벤트
         * @name eg.view360.PanoViewer#viewChange
         * @event
         * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {Number} param.yaw yaw<ko>yaw</ko>
         * @param {Number} param.pitch pitch <ko>pitch</ko>
         * @param {Number} param.fov Field of view (fov) <ko>화각</ko>
         * @example
         *
         * viwer.on({
         *	"viewChange" : function(evt) {
         *		//evt.yaw, evt.pitch, evt.fov is available.
         * });
         */

        /**
         * Events that is fired when animation which is triggered by inertia is ended.
         * @ko 관성에 의한 애니메이션 동작이 완료되었을때 발생하는 이벤트
         * @name eg.view360.PanoViewer#animationEnd
         * @event
         * @example
         *
         * viwer.on({
         *	"animationEnd" : function(evt) {
         *		// animation is ended.
         * });
         */

        return this.trigger(name, evt);
      }
      /**
       * When set true, enables zoom with the wheel or pinch gesture. However, in the case of touch, pinch works only when the touchDirection setting is {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL}.
       * @ko true 로 설정 시 휠 혹은 집기 동작으로 확대/축소 할 수 있습니다. false 설정 시 확대/축소 기능을 비활성화 합니다. 단, 터치인 경우 touchDirection 설정이 {@link eg.view360.PanoViewer.TOUCH_DIRECTION.ALL} 인 경우에만 pinch 가 동작합니다.
       * @method eg.view360.PanoViewer#setUseZoom
       * @param {Boolean} useZoom
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.setUseZoom = function setUseZoom(useZoom) {
        typeof useZoom === "boolean" && this._yawPitchControl.option("useZoom", useZoom);
        return this;
      }
      /**
       * When true, enables the keyboard move key control: awsd, arrow keys
       * @ko true이면 키보드 이동 키 컨트롤을 활성화합니다. (awsd, 화살표 키)
       * @method eg.view360.PanoViewer#setUseKeyboard
       * @param {Boolean} useKeyboard
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.setUseKeyboard = function setUseKeyboard(useKeyboard) {
        this._yawPitchControl.option("useKeyboard", useKeyboard);

        return this;
      }
      /**
       * Enables control through device motion. ("none", "yawPitch", "VR")
       * @ko 디바이스 움직임을 통한 컨트롤을 활성화 합니다. ("none", "yawPitch", "VR")
       * @method eg.view360.PanoViewer#setGyroMode
       * @param {String} gyroMode {@link eg.view360.PanoViewer.GYRO_MODE}
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setGyroMode("yawPitch");
       * //equivalent
       * panoViewer.setGyroMode(eg.view360.PanoViewer.GYRO_MODE.YAWPITCH);
       */
      ;

      _proto.setGyroMode = function setGyroMode(gyroMode) {
        this._yawPitchControl.option("gyroMode", gyroMode);

        return this;
      }
      /**
       * Set the range of controllable FOV values
       * @ko 제어 가능한 FOV 구간을 설정합니다.
       * @method eg.view360.PanoViewer#setFovRange
       * @param {Array} range
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setFovRange([50, 90]);
       */
      ;

      _proto.setFovRange = function setFovRange(range) {
        this._yawPitchControl.option("fovRange", range);

        return this;
      }
      /**
       * Getting the range of controllable FOV values
       * @ko 제어 가능한 FOV 구간을 반환합니다.
       * @method eg.view360.PanoViewer#getFovRange
       * @return {Array}
       * @example
       * var range = panoViewer.getFovRange(); //[50, 90]
       */
      ;

      _proto.getFovRange = function getFovRange() {
        return this._yawPitchControl.option("fovRange");
      }
      /**
       * Update size of canvas element by it's container element's or specified size. If size is not specified, the size of the container area is obtained and updated to that size.
       * @ko 캔버스 엘리먼트의 크기를 컨테이너 엘리먼트의 크기나 지정된 크기로 업데이트합니다. 만약 size 가 지정되지 않으면 컨테이너 영역의 크기를 얻어와 해당 크기로 갱신합니다.
       * @method eg.view360.PanoViewer#updateViewportDimensions
       * @param {Object} [size]
       * @param {Number} [size.width=width of container]
       * @param {Number} [size.height=height of container]
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.updateViewportDimensions = function updateViewportDimensions(size) {
        if (size === void 0) {
          size = {
            width: undefined,
            height: undefined
          };
        }

        if (!this._isReady) {
          return this;
        }

        var containerSize;

        if (size.width === undefined || size.height === undefined) {
          containerSize = window.getComputedStyle(this._container);
        }

        var width = size.width || parseInt(containerSize.width, 10);
        var height = size.height || parseInt(containerSize.height, 10); // Skip if viewport is not changed.

        if (width === this._width && height === this._height) {
          return this;
        }

        this._width = width;
        this._height = height;
        this._aspectRatio = width / height;

        this._photoSphereRenderer.updateViewportDimensions(width, height);

        this._yawPitchControl.option("aspectRatio", this._aspectRatio);

        this._yawPitchControl.updatePanScale({
          height: height
        });

        this.lookAt({}, 0);
        return this;
      }
      /**
       * Get the current field of view(FOV)
       * @ko 현재 field of view(FOV) 값을 반환합니다.
       * @method eg.view360.PanoViewer#getFov
       * @return {Number}
       */
      ;

      _proto.getFov = function getFov() {
        return this._fov;
      }
      /**
       * Get the horizontal field of view in degree
       */
      ;

      _proto._getHFov = function _getHFov() {
        return util.toDegree(2 * Math.atan(this._aspectRatio * Math.tan(toRadian(this._fov) / 2)));
      }
      /**
       * Get current yaw value
       * @ko 현재 yaw 값을 반환합니다.
       * @method eg.view360.PanoViewer#getYaw
       * @return {Number}
       */
      ;

      _proto.getYaw = function getYaw() {
        return this._yaw;
      }
      /**
       * Get current pitch value
       * @ko 현재 pitch 값을 반환합니다.
       * @method eg.view360.PanoViewer#getPitch
       * @return {Number}
       */
      ;

      _proto.getPitch = function getPitch() {
        return this._pitch;
      }
      /**
       * Get the range of controllable Yaw values
       * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
       * @method eg.view360.PanoViewer#getYawRange
       * @return {Array}
       */
      ;

      _proto.getYawRange = function getYawRange() {
        return this._yawPitchControl.option("yawRange");
      }
      /**
       * Get the range of controllable Pitch values
       * @ko 컨트롤 가능한 Pitch 구간을 가져옵니다.
       * @method eg.view360.PanoViewer#getPitchRange
       * @return {Array}
       */
      ;

      _proto.getPitchRange = function getPitchRange() {
        return this._yawPitchControl.option("pitchRange");
      }
      /**
       * Set the range of controllable yaw
       * @ko 컨트롤 가능한 Yaw 구간을 반환합니다.
       * @method eg.view360.PanoViewer#setYawRange
       * @param {Array} range
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setYawRange([-90, 90]);
       */
      ;

      _proto.setYawRange = function setYawRange(yawRange) {
        this._yawPitchControl.option("yawRange", yawRange);

        return this;
      }
      /**
       * Set the range of controllable Pitch values
       * @ko 컨트롤 가능한 Pitch 구간을 설정합니다.
       * @method eg.view360.PanoViewer#setPitchRange
       * @param {Array} range
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * panoViewer.setPitchRange([-40, 40]);
       */
      ;

      _proto.setPitchRange = function setPitchRange(pitchRange) {
        this._yawPitchControl.option("pitchRange", pitchRange);

        return this;
      }
      /**
       * Specifies whether to display the pole by limiting the pitch range. If it is true, pole point can be displayed. If it is false, it is not displayed.
       * @ko pitch 범위를 제한하여 극점을 표시할지를 지정합니다. true 인 경우 극점까지 표현할 수 있으며 false 인 경우 극점까지 표시하지 않습니다.
       * @method eg.view360.PanoViewer#setShowPolePoint
       * @param {Boolean} showPolePoint
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.setShowPolePoint = function setShowPolePoint(showPolePoint) {
        this._yawPitchControl.option("showPolePoint", showPolePoint);

        return this;
      }
      /**
       * Set a new view by setting camera configuration. Any parameters not specified remain the same.
       * @ko 카메라 설정을 지정하여 화면을 갱신합니다. 지정되지 않은 매개 변수는 동일하게 유지됩니다.
       * @method eg.view360.PanoViewer#lookAt
       * @param {Object} orientation
       * @param {Number} orientation.yaw Target yaw in degree <ko>목표 yaw (degree 단위)</ko>
       * @param {Number} orientation.pitch Target pitch in degree <ko>목표 pitch (degree 단위)</ko>
       * @param {Number} orientation.fov Target vertical fov in degree <ko>목표 수직 fov (degree 단위)</ko>
       * @param {Number} duration Animation duration in milliseconds <ko>애니메이션 시간 (밀리 초)</ko>
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       * @example
       * // Change the yaw angle (absolute angle) to 30 degrees for one second.
       * panoViewer.lookAt({yaw: 30}, 1000);
       */
      ;

      _proto.lookAt = function lookAt$$1(orientation, duration) {
        if (!this._isReady) {
          return this;
        }

        var yaw = orientation.yaw !== undefined ? orientation.yaw : this._yaw;
        var pitch = orientation.pitch !== undefined ? orientation.pitch : this._pitch;

        var pitchRange = this._yawPitchControl.option("pitchRange");

        var verticalAngleOfImage = pitchRange[1] - pitchRange[0];
        var fov = orientation.fov !== undefined ? orientation.fov : this._fov;

        if (verticalAngleOfImage < fov) {
          fov = verticalAngleOfImage;
        }

        this._yawPitchControl.lookAt({
          yaw: yaw,
          pitch: pitch,
          fov: fov
        }, duration);

        if (duration === 0) {
          this._photoSphereRenderer.renderWithYawPitch(yaw, pitch, fov);
        }

        return this;
      };

      _proto._activate = function _activate() {
        this._photoSphereRenderer.attachTo(this._container);

        this._yawPitchControl.enable();

        this.updateViewportDimensions();
        this._isReady = true; // update yawPitchControl after isReady status is true.

        this._updateYawPitchIfNeeded();

        this._triggerEvent(EVENTS$1.READY);

        this._photoSphereRenderer.startRender();
      }
      /**
       * Destroy webgl context and block user interaction and stop rendering
       */
      ;

      _proto._deactivate = function _deactivate() {
        if (this._isReady) {
          this._photoSphereRenderer.stopRender();

          this._yawPitchControl.disable();

          this._isReady = false;
        }

        if (this._photoSphereRenderer) {
          this._photoSphereRenderer.destroy();

          this._photoSphereRenderer = null;
        }
      };

      PanoViewer._isValidTouchDirection = function _isValidTouchDirection(direction) {
        return direction === PanoViewer.TOUCH_DIRECTION.NONE || direction === PanoViewer.TOUCH_DIRECTION.YAW || direction === PanoViewer.TOUCH_DIRECTION.PITCH || direction === PanoViewer.TOUCH_DIRECTION.ALL;
      }
      /**
       * Set touch direction by which user can control.
       * @ko 사용자가 조작가능한 터치 방향을 지정합니다.
       * @method eg.view360.PanoViewer#setTouchDirection
       * @param {Number} direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       * @return {eg.view360.PanoViewer} PanoViewer instance
       * @example
       *
       * panoViewer = new PanoViewer(el);
       * // Limit the touch direction to the yaw direction only.
       * panoViewer.setTouchDirection(eg.view360.PanoViewer.TOUCH_DIRECTION.YAW);
       */
      ;

      _proto.setTouchDirection = function setTouchDirection(direction) {
        if (PanoViewer._isValidTouchDirection(direction)) {
          this._yawPitchControl.option("touchDirection", direction);
        }

        return this;
      }
      /**
       * Returns touch direction by which user can control
       * @ko 사용자가 조작가능한 터치 방향을 반환한다.
       * @method eg.view360.PanoViewer#getTouchDirection
       * @return {Number} direction of the touch. {@link eg.view360.PanoViewer.TOUCH_DIRECTION}<ko>컨트롤 가능한 방향 {@link eg.view360.PanoViewer.TOUCH_DIRECTION}</ko>
       * @example
       *
       * panoViewer = new PanoViewer(el);
       * // Returns the current touch direction.
       * var dir = panoViewer.getTouchDirection();
       */
      ;

      _proto.getTouchDirection = function getTouchDirection() {
        return this._yawPitchControl.option("touchDirection");
      }
      /**
       * Destroy viewer. Remove all registered event listeners and remove viewer canvas.
       * @ko 뷰어 인스턴스를 해제합니다. 모든 등록된 이벤트리스너를 제거하고 뷰어 캔버스를 삭제합니다.
       * @method eg.view360.PanoViewer#destroy
       * @return {eg.view360.PanoViewer} PanoViewer instance<ko>PanoViewer 인스턴스</ko>
       */
      ;

      _proto.destroy = function destroy() {
        this._deactivate();

        if (this._yawPitchControl) {
          this._yawPitchControl.destroy();

          this._yawPitchControl = null;
        }

        return this;
      }
      /**
       * Check whether the current environment can execute PanoViewer
       * @ko 현재 브라우저 환경에서 PanoViewer 실행이 가능한지 여부를 반환합니다.
       * @function isSupported
       * @memberof eg.view360.PanoViewer
       * @return {Boolean} PanoViewer executable <ko>PanoViewer 실행가능 여부</ko>
       * @static
       */
      ;

      PanoViewer.isSupported = function isSupported() {
        return WebGLUtils.isWebGLAvailable() && WebGLUtils.isStableWebGL();
      }
      /**
       * Check whether the current environment supports the WebGL
       * @ko 현재 브라우저 환경이 WebGL 을 지원하는지 여부를 확인합니다.
       * @function isWebGLAvailable
       * @memberof eg.view360.PanoViewer
       * @return {Boolean} WebGL support <ko>WebGL 지원여부</ko>
       * @static
       */
      ;

      PanoViewer.isWebGLAvailable = function isWebGLAvailable() {
        return WebGLUtils.isWebGLAvailable();
      }
      /**
       * Check whether the current environment supports the gyro sensor.
       * @ko 현재 브라우저 환경이 자이로 센서를 지원하는지 여부를 확인합니다.
       * @function isGyroSensorAvailable
       * @memberof eg.view360.PanoViewer
       * @param {Function} callback Function to take the gyro sensor availability as argument <ko>자이로 센서를 지원하는지 여부를 인자로 받는 함수</ko>
       * @static
       */
      ;

      PanoViewer.isGyroSensorAvailable = function isGyroSensorAvailable(callback) {
        if (!DeviceMotionEvent$1) {
          callback && callback(false);
          return;
        }

        var onDeviceMotionChange;

        function checkGyro() {
          return new _Promise$6(function (res, rej) {
            onDeviceMotionChange = function onDeviceMotionChange(deviceMotion) {
              var isGyroSensorAvailable = !(deviceMotion.rotationRate.alpha == null);
              res(isGyroSensorAvailable);
            };

            window.addEventListener("devicemotion", onDeviceMotionChange);
          });
        }

        function timeout() {
          return new _Promise$6(function (res, rej) {
            setTimeout(function () {
              return res(false);
            }, 1000);
          });
        }

        _Promise$6.race([checkGyro(), timeout()]).then(function (isGyroSensorAvailable) {
          window.removeEventListener("devicemotion", onDeviceMotionChange);
          callback && callback(isGyroSensorAvailable);

          PanoViewer.isGyroSensorAvailable = function (fb) {
            fb && fb(isGyroSensorAvailable);
            return isGyroSensorAvailable;
          };
        });
      };

      return PanoViewer;
    }(Component);

    PanoViewer.VERSION = VERSION;
    PanoViewer.ERROR_TYPE = ERROR_TYPE;
    PanoViewer.EVENTS = EVENTS$1;
    PanoViewer.PROJECTION_TYPE = PROJECTION_TYPE;
    PanoViewer.GYRO_MODE = GYRO_MODE;
    PanoViewer.ProjectionType = PROJECTION_TYPE;
    PanoViewer.STEREO_FORMAT = STEREO_FORMAT;
    PanoViewer.TOUCH_DIRECTION = {
      /**
       * Constant value for none direction.
       * @ko none 방향에 대한 상수 값.
       * @name NONE
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 1
       */
      NONE: YawPitchControl.TOUCH_DIRECTION_NONE,

      /**
       * Constant value for horizontal(yaw) direction.
       * @ko horizontal(yaw) 방향에 대한 상수 값.
       * @name YAW
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 6
       */
      YAW: YawPitchControl.TOUCH_DIRECTION_YAW,

      /**
       * Constant value for vertical direction.
       * @ko vertical(pitch) 방향에 대한 상수 값.
       * @name PITCH
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 24
       */
      PITCH: YawPitchControl.TOUCH_DIRECTION_PITCH,

      /**
       * Constant value for all direction.
       * @ko all 방향에 대한 상수 값.
       * @name ALL
       * @memberof eg.view360.PanoViewer.TOUCH_DIRECTION
       * @constant
       * @type {Number}
       * @default 30
       */
      ALL: YawPitchControl.TOUCH_DIRECTION_ALL
    };
    return PanoViewer;
  }();

  /**
   * @class eg.view360.SpriteImage
   * @classdesc A module that displays a single or continuous image of any one of the "sprite images". SpinViewer internally uses SpriteImage to show each frame of the sprite image.
   * @ko 스프라이트 이미지 중 임의의 한 프레임을 단발성 혹은 연속적으로 보여주는 컴포넌트입니다. SpinViewer 는 내부적으로 SpriteImage 를 사용하여 스프라이트 이미지의 각 프레임을 보여줍니다.
   * @extends eg.Component
   *
   * @param {HTMLElement} element The element to show the image <ko>이미지를 보여줄 대상 요소</ko>
   * @param {Object} options The option object<ko>파라미터 객체</ko>
   * @param {String} options.imageUrl The url of the sprite image <ko>스프라이트 이미지의 url</ko>
   * @param {Number} [options.rowCount=1] Number of horizontal frames in the sprite image <ko>스프라이트 이미지의 가로 프레임 갯수</ko>
   * @param {Number} [options.colCount=1] Number of vertical frames in the sprite image <ko>스프라이트 이미지의 세로 프레임 갯수</ko>
   * @param {Number|String} [options.width="auto"] The width of the target element to show the image <ko>이미지를 보여줄 대상 요소의 너비</ko>
   * @param {Number|String} [options.height="auto"] The height of the target element to show the image <ko>이미지를 보여줄 대상 요소의 높이</ko>
   * @param {Boolean} [options.autoHeight=true] Whether to automatically set the height of the image area to match the original image's proportion <ko>원본 이미지 비율에 맞게 이미지 영역의 높이를 자동으로 설정할지 여부</ko>
   * @param {Number[]} [options.colRow=[0, 0]] The column, row coordinates of the first frame of the sprite image (based on 0 index) <ko> 스프라이트 이미지 중 처음 보여줄 프레임의 (column, row) 좌표 (0 index 기반)</ko>
   * @param {Number} [options.frameIndex=0] frameIndex specifies the index of the frame to be displayed in the "Sprite image". The frameIndex order is zero-based and indexed in Z form (left-to-right, top-to-bottom, and newline again from left to right).<br>- colRow is equivalent to frameIndex. However, if colRow is specified at the same time, colRow takes precedence.<ko>스프라이트 이미지 중에서 보여질 프레임의 인덱스를 지정합니다. frameIndex 순서는 0부터 시작하며 Z 형태(왼쪽에서 오른쪽, 위에서 아래, 개행 시 다시 왼쪽 부터)로 인덱싱합니다.<br>- colRow 는 frameIndex 와 동일한 기능을 합니다. 단, colRow 가 동시에 지정된 경우 colRow 가 우선합니다.</ko>
   * @param {Number} [options.scale=1] Spin scale (The larger the spin, the more).<ko>Spin 배율 (클 수록 더 많이 움직임)</ko>
   *
   * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   * @example
   *
   * // Initialize SpriteImage
   *
   * var el = document.getElementById("image-div");
   * var sprites = new eg.view360.SpriteImage(el, {
   * 	imageUrl: "/img/bag360.jpg", // required
   * 	rowCount: 24
   * });
   */

  var SpriteImage =
  /*#__PURE__*/
  function () {
    var SpriteImage =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SpriteImage, _Component);

      function SpriteImage(element, options) {
        var _this;

        _this = _Component.call(this) || this;
        var opt = options || {};
        _this._el = element;
        _this._rowCount = opt.rowCount || 1;
        _this._colCount = opt.colCount || 1;
        _this._totalCount = _this._rowCount * _this._colCount; // total frames

        _this._width = opt.width || "auto";
        _this._height = opt.height || "auto";
        _this._autoHeight = opt.autoHeight != null ? opt.autoHeight : "true"; // If autoHeight is specified, _height will be overwritten.

        _this._colRow = [0, 0];

        if (opt.colRow) {
          _this._colRow = opt.colRow;
        } else if (opt.frameIndex) {
          _this.setFrameIndex(opt.frameIndex);
        }

        _this._el.style.width = SpriteImage._getSizeString(_this._width);
        _this._el.style.height = SpriteImage._getSizeString(_this._height);

        if (!opt.imageUrl) {
          setTimeout(function () {
            _this.trigger("imageError", {
              imageUrl: opt.imageUrl
            });
          }, 0);
          return _assertThisInitialized(_this);
        }

        _this._image = new Image();
        /**
         * Event
         */

        _this._image.onload = function () {
          _this._bg = SpriteImage._createBgDiv(_this._image, _this._rowCount, _this._colCount, _this._autoHeight);

          _this._el.appendChild(_this._bg);

          _this.setColRow(_this._colRow[0], _this._colRow[1]);
          /**
           * Events that occur when component loading is complete
           * @ko 컴포넌트 로딩이 완료되면 발생하는 이벤트
           * @name eg.view360.SpriteImage#load
           * @event
           * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
           * @param {HTMLElement} param.target The target element for which to display the image <ko>이미지를 보여줄 대상 엘리먼트</ko>
           * @param {HTMLElement} param.bgElement Generated background image element <ko>생성된 background 이미지 엘리먼트</ko>
           *
           * @example
           *
           * sprites.on({
           *	"load" : function(evt) {
           *		console.log("load event fired - e.target", e.target, "e.bgElement", e.bgElement);
           *	}
           * });
           */


          _this.trigger("load", {
            target: _this._el,
            bgElement: _this._bg
          });

          if (_this._autoPlayReservedInfo) {
            _this.play(_this._autoPlayReservedInfo);

            _this._autoPlayReservedInfo = null;
          }
        };

        _this._image.onerror = function (e) {
          /**
           * An event that occurs when the image index is changed by the user's left / right panning
           * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
           * @name eg.view360.SpriteImage#imageError
           * @event
           * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
           * @param {String} param.imageUrl User-specified image URL <ko>사용자가 지정한 이미지 URL</ko>
           *
           * @example
           *
           * sprites.on({
           *	"imageError" : function(evt) {
           *		// Error handling
           *		console.log(e.imageUrl);
           *	}
           * });
           */
          _this.trigger("imageError", {
            imageUrl: opt.imageUrl
          });
        };

        _this._image.src = opt.imageUrl;
        return _this;
      }

      SpriteImage._createBgDiv = function _createBgDiv(img, rowCount, colCount, autoHeight) {
        var el = document.createElement("div");
        el.style.position = "relative";
        el.style.overflow = "hidden";
        img.style.position = "absolute";
        img.style.width = colCount * 100 + "%";
        img.style.height = rowCount * 100 + "%";
        /** Prevent image from being dragged on IE10, IE11, Safari especially */

        img.ondragstart = function () {
          return false;
        }; // img.style.pointerEvents = "none";
        // Use hardware accelerator if available


        SUPPORT_WILLCHANGE && (img.style.willChange = "transform");
        el.appendChild(img);
        var unitWidth = img.width / colCount;
        var unitHeight = img.height / rowCount;

        if (autoHeight) {
          var r = unitHeight / unitWidth;
          el.style.paddingBottom = r * 100 + "%";
        } else {
          el.style.height = "100%";
        }

        return el;
      }
      /**
       * Specifies the frameIndex of the frame to be shown in the sprite image.
       * @ko 스프라이트 이미지 중 보여질 프레임의 frameIndex 값을 지정
       * @method eg.view360.SpriteImage#setFrameIndex
       * @param {Number} frameIndex frame index of a frame<ko>프레임의 인덱스</ko>
       *
       * @example
       *
       * sprites.setFrameIndex(0, 1);// col = 0, row = 1
       */
      ;

      var _proto = SpriteImage.prototype;

      _proto.setFrameIndex = function setFrameIndex(index) {
        var colRow = this.toColRow(index);
        this.setColRow(colRow[0], colRow[1]);
      }
      /**
       * Returns the frameIndex of the frame to be shown in the sprite image.
       * @ko 스프라이트 이미지 중 보여지는 프레임의 index 값을 반환
       * @method eg.view360.SpriteImage#getFrameIndex
       * @return {Number} frame index <ko>frame 인덱스</ko>
       *
       * @example
       *
       * var frameIndex = sprites.getFrameIndex(); // eg. frameIndex = 1
       *
       */
      ;

      _proto.getFrameIndex = function getFrameIndex() {
        return this._colRow[1] * this._colCount + this._colRow[0];
      }
      /**
       * Specifies the col and row values of the frame to be shown in the sprite image.
       * @ko 스프라이트 이미지 중 보여질 프레임의 col, row 값을 지정
       * @method eg.view360.SpriteImage#setColRow
       * @param {Number} col Column number of a frame<ko>프레임의 행값</ko>
       * @param {Number} row Row number of a frame<ko>프레임의 열값</ko>
       *
       * @example
       *
       * sprites.setlColRow(1, 2); // col = 1, row = 2
       */
      ;

      _proto.setColRow = function setColRow(col, row) {
        if (row > this._rowCount - 1 || col > this._colCount - 1) {
          return;
        }

        if (this._image && TRANSFORM) {
          // NOTE: Currently, do not apply translate3D for using layer hack. Do we need layer hack for old browser?
          this._image.style[TRANSFORM] = "translate(" + -(col / this._colCount * 100) + "%, " + -(row / this._rowCount * 100) + "%)";
        }

        this._colRow = [col, row];
      }
      /**
       * Returns the col and row values of the frame to be shown in the sprite image.
       * @ko 스프라이트 이미지 중 보여지는 프레임의 col, row 값을환반환
       * @method eg.view360.SpriteImage#gelColRow
       * @return {Number[]} Array containing col, row<ko>col, row 정보를 담는 배열</ko>
       *
       * @example
       *
       * var colRow = sprites.getlColRow();
       * // colRow = [1, 2] - index of col is 1, index of row is 2
       *
       */
      ;

      _proto.getColRow = function getColRow() {
        return this._colRow;
      };

      SpriteImage._getSizeString = function _getSizeString(size) {
        if (typeof size === "number") {
          return size + "px";
        }

        return size;
      }
      /**
       * Stop playing
       * @ko play 되고 있던 프레임 재생을 중지합니다.
       * @method eg.view360.SpriteImage#stop
       *
       * @example
       *
       * viewer.stop();
       *
       */
      ;

      _proto.stop = function stop() {
        if (this._autoPlayTimer) {
          clearInterval(this._autoPlayTimer);
          this._autoPlayTimer = null;
        }
      }
      /**
       * Switches frames sequentially in the 'interval' starting from the currently displayed frame and plays all frames by 'playCount'.
       * @ko 현재 보여지고 있는 프레임을 시작으로 'interval' 간격으로 순차적으로 프레임을 전환하며 모든 프레임을 'playCount' 만큼 재생한다.
       * @method eg.view360.SpriteImage#play
       * @param {Object} param The parameter object<ko>파라미터 객체</ko>
       * @param {Number} [param.interval=1000 / totalFrameCount] Interframe Interval - in milliseconds<ko>프레임간 간격 - 밀리세컨드 단위</ko>
       * @param {Number} [param.playCount=0] PlayCount = 1 in which all frames are reproduced once, and playCount = n in which all frames are repeated n times. playCount = 0 in which all frames are repeated infinitely<ko>모든 프레임을 1회씩 재생한 것이 playCount = 1, 모든 프레임을 n 회 재상한 것이 playCount = n 이 된다. 0 dms 무한반복</ko>
       *
       * @example
       *
       * viewer.play({angle: 16, playCount: 1});
       *
       */
      ;

      _proto.play = function play(_temp) {
        var _this2 = this;

        var _ref = _temp === void 0 ? {
          interval: 1000 / this._totalCount,
          playCount: 0
        } : _temp,
            interval = _ref.interval,
            playCount = _ref.playCount;

        if (!this._bg) {
          this._autoPlayReservedInfo = {
            interval: interval,
            playCount: playCount
          };
          return;
        }

        if (this._autoPlayTimer) {
          clearInterval(this._autoPlayTimer);
          this._autoPlayTimer = null;
        }

        var frameIndex = this.getFrameIndex();
        var count = 0;
        var frameCount = 0; // for checking 1 cycle

        this._autoPlayTimer = setInterval(function () {
          frameIndex %= _this2._totalCount;

          var colRow = _this2.toColRow(frameIndex);

          _this2.setColRow(colRow[0], colRow[1]);

          frameIndex++; // Done 1 Cycle?

          if (++frameCount === _this2._totalCount) {
            frameCount = 0;
            count++;
          }

          if (playCount > 0 && count === playCount) {
            clearInterval(_this2._autoPlayTimer);
          }
        }, interval);
      };

      _proto.toColRow = function toColRow(frameIndex) {
        var colCount = this._colCount;
        var rowCount = this._rowCount;

        if (frameIndex < 0) {
          return [0, 0];
        } else if (frameIndex >= this._totalCount) {
          return [colCount - 1, rowCount - 1];
        }

        var col = frameIndex % colCount;
        var row = Math.floor(frameIndex / colCount); // console.log(frameIndex, col, row);

        return [col, row];
      };

      return SpriteImage;
    }(Component);

    SpriteImage.VERSION = VERSION;
    return SpriteImage;
  }();

  var DEFAULT_PAN_SCALE = 0.21;
  /**
   * @class eg.view360.SpinViewer
   * @classdesc A module used to displays each image sequentially according to the direction of the user's touch movement (left / right) of the sprite image that is collected by rotating the object.
   * @ko 물체 주위를 회전하여 촬영한 이미지들을 모은 스프라이트 이미지를 사용자의 터치 이동 방향(좌 / 우) 에 따라 각 이미지들을 순차적으로 보여주는 컴포넌트입니다.
   * @extends eg.Component
   *
   * @param {HTMLElement} element The element to show the image <ko>이미지를 보여줄 대상 요소</ko>
   * @param {Object} options The option object<ko>파라미터 객체</ko>
   * @param {String} options.imageUrl The url of the sprite image <ko>스프라이트 이미지의 url</ko>
   * @param {Number} [options.rowCount=1] Number of horizontal frames in the sprite image <ko>스프라이트 이미지의 가로 프레임 갯수</ko>
   * @param {Number} [options.colCount=1] Number of vertical frames in the sprite image <ko>스프라이트 이미지의 세로 프레임 갯수</ko>
   * @param {Number|String} [options.width="auto"] The width of the target element to show the image <ko>이미지를 보여줄 대상 요소의 너비</ko>
   * @param {Number|String} [options.height="auto"] The height of the target element to show the image <ko>이미지를 보여줄 대상 요소의 높이</ko>
   * @param {Boolean} [options.autoHeight=true] Whether to automatically set the height of the image area to match the original image's proportion <ko>원본 이미지 비율에 맞게 이미지 영역의 높이를 자동으로 설정할지 여부</ko>
   * @param {Number[]} [options.colRow=[0, 0]] The column, row coordinates of the first frame of the sprite image (based on 0 index) <ko> 스프라이트 이미지 중 처음 보여줄 프레임의 (column, row) 좌표 (0 index 기반)</ko>
   * @param {Number} [options.scale=1] Spin scale (The larger the spin, the more).<ko>Spin 배율 (클 수록 더 많이 움직임)</ko>
   * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
   * @example
   *
   * // Initialize SpinViewer
   * var el = document.getElementById("product-360");
   * var viewer = new eg.view360.SpinViewer(el, {
   * 	imageUrl: "/img/bag360.jpg", // required
   * 	rowCount: 24 //required
   * });
   */

  var SpinViewer =
  /*#__PURE__*/
  function () {
    var SpinViewer =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SpinViewer, _Component);

      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.view360.SpinViewer.VERSION;  // ex) 3.0.1
       * @memberof eg.view360.SpinViewer
       */
      function SpinViewer(element, options) {
        var _this;

        _this = _Component.call(this) || this;
        _this._el = element;

        var opt = _extends({}, options);

        var colCount = opt.colCount || 1;
        var rowCount = opt.rowCount || 1;
        _this._scale = opt.scale || 1;
        _this._panScale = _this._scale * DEFAULT_PAN_SCALE;
        _this._frameCount = colCount * rowCount; // Init SpriteImage

        _this._sprites = new SpriteImage(element, opt).on({
          "load": function load(evt) {
            /**
             * Events that occur when component loading is complete
             * @ko 컴포넌트 로딩이 완료되면 발생하는 이벤트
             * @name eg.view360.SpinViewer#load
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {HTMLElement} param.target The target element for which to display the image <ko>이미지를 보여줄 대상 엘리먼트</ko>
             * @param {HTMLElement} param.bgElement Generated background image element <ko>생성된 background 이미지 엘리먼트</ko>
             *
             * @example
             *
             * viwer.on({
             *	"load" : function(evt) {
             *		this.spinBy(360, {duration: 300});
             *	}
             * });
             */
            _this.trigger("load", evt);
          },
          "imageError": function imageError(evt) {
            /**
             * An event that occurs when the image index is changed by the user's left / right panning
             * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
             * @name eg.view360.SpinViewer#imageError
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {String} param.imageUrl User-specified image URL <ko>사용자가 지정한 이미지 URL</ko>
             *
             * @example
             *
             * viewer.on({
             *	"imageError" : function(evt) {
             *		// Error handling
             *		console.log(e.imageUrl);
             *	}
             * });
             */
            _this.trigger("imageError", {
              imageUrl: evt.imageUrl
            });
          }
        }); // Init Axes

        _this._panInput = new Axes.PanInput(_this._el, {
          scale: [_this._panScale, _this._panScale]
        });
        _this._axes = new Axes({
          angle: {
            range: [0, 359],
            circular: true
          }
        }).on({
          "change": function change(evt) {
            var curr = Math.floor(evt.pos.angle / (360 / _this._frameCount));
            var frameIndex = _this._frameCount - curr - 1;

            _this._sprites.setFrameIndex(frameIndex);
            /**
             * An event that occurs when the image index is changed by the user's left / right panning
             * @ko 사용자의 좌우 Panning 에 의해 이미지 인덱스가 변경되었을때 발생하는 이벤트
             * @name eg.view360.SpinViewer#change
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {Number[]} param.colRow Column, row of the frame in the sprite image <ko>스프라이트 이미지 내 프레임의 column, row</ko>
             * @param {Number} param.frameIndex Index value that is sequentially appended in Z direction based on col and row.<ko>col, row 를 기반으로 Z 방향으로 순차적으로 붙여지는 index 값</ko>
             * @param {Number} param.angle The angle that is currently internally held at an angle between 0 and 359. (not a real product angle) <ko>0 ~ 359 범위의 각도로 현재 내부적으로 유지하고 있는 각도 (실제 이미지의 각도가 아님)</ko>
             *
             * @example
             *
             * viwer.on({
             *	"change" : function(evt) {
             *		console.log(event.frameIndex, event.colRow, event.angle);   // event.colRow = [0, 4] event.frameIndex = 4, event = 30
             *	}
             * });
             */


            _this.trigger("change", {
              frameIndex: frameIndex,
              colRow: _this._sprites.getColRow(),
              angle: evt.pos.angle
            });
          },
          "animationEnd": function animationEnd(evt) {
            /**
             * This event is fired when animation ends.
             * @ko 에니메이션이 끝났을 때 발생하는 이벤트
             * @name eg.view360.SpinViewer#animationEnd
             * @event
             * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {Boolean} param.isTrusted true if an event was generated by the user action, or false if it was caused by a script or API call<ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
             *
             * @example
             *
             * viwer.on({
             *	"animationEnd" : function(evt) {
             *		// evt.isTrusted === true or false
             *	}
             * });
             */
            _this.trigger("animationEnd", {
              isTrusted: evt.isTrusted
            });
          }
        });

        _this._axes.connect("angle", _this._panInput);

        return _this;
      }
      /**
       * Set spin scale
       * @ko scale 을 조정할 수 있는 함수
       * @method eg.view360.SpinViewer#setScale
       * @param {Number} scale Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
       *
       * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
       *
       * @example
       *
       * viewer.setScale(2);// It moves twice as much.
       */


      var _proto = SpinViewer.prototype;

      _proto.setScale = function setScale(scale) {
        if (isNaN(scale) || scale < 0) {
          return this;
        }

        this._scale = scale;
        this._panScale = scale * DEFAULT_PAN_SCALE;
        this._panInput.options.scale = [this._panScale, this._panScale];
        return this;
      }
      /**
       * Get spin scale
       * @ko scale 값을 반환한다.
       * @method eg.view360.SpinViewer#getScale
       *
       * @return {Number} Rotation multiples at spin, the larger the rotation<ko>Spin 시 회전 배수값, 커질 수록 더 많이 회전</ko>
       *
       * @example
       *
       * viewer.getScale();// It returns number
       */
      ;

      _proto.getScale = function getScale() {
        return this._scale;
      }
      /**
       * It gives the effect of rotating for a certain duration by the specified angle based on the current rotation angle.
       * @ko 현재 회전 각도를 기준으로 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
       * @method eg.view360.SpinViewer#spinBy
       *
       * @param {Number} [angle = 0] angle<ko>상대적 회전 각도</ko>
       * @param {Object} param The parameter object<ko>파라미터 객체</ko>
       * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
       *
       * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
       *
       * @example
       *
       * viewer.spinBy(720, {duration: 500});
       */
      ;

      _proto.spinBy = function spinBy(angle, param) {
        if (angle === void 0) {
          angle = 0;
        }

        if (param === void 0) {
          param = {
            duration: 0
          };
        }

        this._axes.setBy({
          angle: angle
        }, param.duration);

        return this;
      }
      /**
       * It gives the effect of rotating for a certain duration (duration) by the specified angle (angle).
       * @ko 지정된 각도(angle)만큼 일정 시간동안(duration) 회전하는 효과를 준다.
       * @method eg.view360.SpinViewer#spinTo
       *
       * @param {Number} [angle = 0] angle<ko>회전 각도</ko>
       * @param {Object} param The parameter object<ko>파라미터 객체</ko>
       * @param {Number} [param.duration = 0] duration<ko>회전할 시간 - 밀리세컨드 단위</ko>
       *
       * @return {Object} Instance of SpinViewer <ko>SpinViewer 인스턴스</ko>
       *
       * @example
       *
       * viewer.spinTo(30, {duration:100});
       */
      ;

      _proto.spinTo = function spinTo(angle, param) {
        if (angle === void 0) {
          angle = 0;
        }

        if (param === void 0) {
          param = {
            duration: 0
          };
        }

        this._axes.setTo({
          angle: angle
        }, param.duration);

        return this;
      }
      /**
       * Returns current angles
       * @ko 현재 각도를 반환한다.
       *
       * @return {Number} Current angle <ko>현재 각도</ko>
       */
      ;

      _proto.getAngle = function getAngle() {
        return this._axes.get().angle || 0;
      };

      return SpinViewer;
    }(Component);

    SpinViewer.VERSION = VERSION;
    return SpinViewer;
  }();

  exports.PanoViewer = PanoViewer;
  exports.SpinViewer = SpinViewer;
  exports.SpriteImage = SpriteImage;
  exports.VERSION = VERSION;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=view360.js.map
