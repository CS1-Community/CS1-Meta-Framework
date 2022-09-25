(function () {
    'use strict';

    const CS1Slug = {
        cam: {},
        rig: {},
        scene: {},
        renderer: {},
        ecs: {},
        utils: {},
        run: () => { },
        config: () => { },
        state: {},
        app: {}
    };

    function die(error) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      throw new Error(typeof error === "number" ? "[MobX] minified error nr: " + error + (args.length ? " " + args.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + error);
    }

    var mockGlobal = {};
    function getGlobal() {
      if (typeof globalThis !== "undefined") {
        return globalThis;
      }

      if (typeof window !== "undefined") {
        return window;
      }

      if (typeof global !== "undefined") {
        return global;
      }

      if (typeof self !== "undefined") {
        return self;
      }

      return mockGlobal;
    }

    var assign = Object.assign;
    var getDescriptor = Object.getOwnPropertyDescriptor;
    var defineProperty$1 = Object.defineProperty;
    var objectPrototype = Object.prototype;
    var EMPTY_ARRAY$1 = [];
    Object.freeze(EMPTY_ARRAY$1);
    var EMPTY_OBJECT$1 = {};
    Object.freeze(EMPTY_OBJECT$1);
    var hasProxy = typeof Proxy !== "undefined";
    var plainObjectString$1 = /*#__PURE__*/Object.toString();
    function assertProxies() {
      if (!hasProxy) {
        die("Proxy not available");
      }
    }
    /**
     * Makes sure that the provided function is invoked at most once.
     */

    function once(func) {
      var invoked = false;
      return function () {
        if (invoked) {
          return;
        }

        invoked = true;
        return func.apply(this, arguments);
      };
    }
    var noop = function noop() {};
    function isFunction(fn) {
      return typeof fn === "function";
    }
    function isStringish(value) {
      var t = typeof value;

      switch (t) {
        case "string":
        case "symbol":
        case "number":
          return true;
      }

      return false;
    }
    function isObject(value) {
      return value !== null && typeof value === "object";
    }
    function isPlainObject$1(value) {
      if (!isObject(value)) {
        return false;
      }

      var proto = Object.getPrototypeOf(value);

      if (proto == null) {
        return true;
      }

      var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString$1;
    } // https://stackoverflow.com/a/37865170

    function isGenerator(obj) {
      var constructor = obj == null ? void 0 : obj.constructor;

      if (!constructor) {
        return false;
      }

      if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) {
        return true;
      }

      return false;
    }
    function addHiddenProp(object, propName, value) {
      defineProperty$1(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
      });
    }
    function addHiddenFinalProp$1(object, propName, value) {
      defineProperty$1(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
      });
    }
    function createInstanceofPredicate(name, theClass) {
      var propName = "isMobX" + name;
      theClass.prototype[propName] = true;
      return function (x) {
        return isObject(x) && x[propName] === true;
      };
    }
    function isES6Map(thing) {
      return thing instanceof Map;
    }
    function isES6Set(thing) {
      return thing instanceof Set;
    }
    var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
    /**
     * Returns the following: own enumerable keys and symbols.
     */

    function getPlainObjectKeys(object) {
      var keys = Object.keys(object); // Not supported in IE, so there are not going to be symbol props anyway...

      if (!hasGetOwnPropertySymbols) {
        return keys;
      }

      var symbols = Object.getOwnPropertySymbols(object);

      if (!symbols.length) {
        return keys;
      }

      return [].concat(keys, symbols.filter(function (s) {
        return objectPrototype.propertyIsEnumerable.call(object, s);
      }));
    } // From Immer utils
    // Returns all own keys, including non-enumerable and symbolic

    var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function (obj) {
      return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
    } :
    /* istanbul ignore next */
    Object.getOwnPropertyNames;
    function toPrimitive(value) {
      return value === null ? null : typeof value === "object" ? "" + value : value;
    }
    function hasProp(target, prop) {
      return objectPrototype.hasOwnProperty.call(target, prop);
    } // From Immer utils

    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(target) {
      // Polyfill needed for Hermes and IE, see https://github.com/facebook/hermes/issues/274
      var res = {}; // Note: without polyfill for ownKeys, symbols won't be picked up

      ownKeys(target).forEach(function (key) {
        res[key] = getDescriptor(target, key);
      });
      return res;
    };

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
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
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

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (it) return (it = it.call(o)).next.bind(it);

      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var storedAnnotationsSymbol = /*#__PURE__*/Symbol("mobx-stored-annotations");
    /**
     * Creates a function that acts as
     * - decorator
     * - annotation object
     */

    function createDecoratorAnnotation(annotation) {
      function decorator(target, property) {
        storeAnnotation(target, property, annotation);
      }

      return Object.assign(decorator, annotation);
    }
    /**
     * Stores annotation to prototype,
     * so it can be inspected later by `makeObservable` called from constructor
     */

    function storeAnnotation(prototype, key, annotation) {
      if (!hasProp(prototype, storedAnnotationsSymbol)) {
        addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
      } // @override must override something

      if (!isOverride(annotation)) {
        prototype[storedAnnotationsSymbol][key] = annotation;
      }
    }
    /**
     * Collects annotations from prototypes and stores them on target (instance)
     */


    function collectStoredAnnotations(target) {
      if (!hasProp(target, storedAnnotationsSymbol)) {


        addHiddenProp(target, storedAnnotationsSymbol, _extends({}, target[storedAnnotationsSymbol]));
      }

      return target[storedAnnotationsSymbol];
    }

    var $mobx = /*#__PURE__*/Symbol("mobx administration");
    var Atom = /*#__PURE__*/function () {
      // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

      /**
       * Create a new atom. For debugging purposes it is recommended to give it a name.
       * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
       */
      function Atom(name_) {
        if (name_ === void 0) {
          name_ = "Atom";
        }

        this.name_ = void 0;
        this.isPendingUnobservation_ = false;
        this.isBeingObserved_ = false;
        this.observers_ = new Set();
        this.diffValue_ = 0;
        this.lastAccessedBy_ = 0;
        this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
        this.onBOL = void 0;
        this.onBUOL = void 0;
        this.name_ = name_;
      } // onBecomeObservedListeners


      var _proto = Atom.prototype;

      _proto.onBO = function onBO() {
        if (this.onBOL) {
          this.onBOL.forEach(function (listener) {
            return listener();
          });
        }
      };

      _proto.onBUO = function onBUO() {
        if (this.onBUOL) {
          this.onBUOL.forEach(function (listener) {
            return listener();
          });
        }
      }
      /**
       * Invoke this method to notify mobx that your atom has been used somehow.
       * Returns true if there is currently a reactive context.
       */
      ;

      _proto.reportObserved = function reportObserved$1() {
        return reportObserved(this);
      }
      /**
       * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
       */
      ;

      _proto.reportChanged = function reportChanged() {
        startBatch();
        propagateChanged(this);
        endBatch();
      };

      _proto.toString = function toString() {
        return this.name_;
      };

      return Atom;
    }();
    var isAtom = /*#__PURE__*/createInstanceofPredicate("Atom", Atom);
    function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
      if (onBecomeObservedHandler === void 0) {
        onBecomeObservedHandler = noop;
      }

      if (onBecomeUnobservedHandler === void 0) {
        onBecomeUnobservedHandler = noop;
      }

      var atom = new Atom(name); // default `noop` listener will not initialize the hook Set

      if (onBecomeObservedHandler !== noop) {
        onBecomeObserved(atom, onBecomeObservedHandler);
      }

      if (onBecomeUnobservedHandler !== noop) {
        onBecomeUnobserved(atom, onBecomeUnobservedHandler);
      }

      return atom;
    }

    function identityComparer(a, b) {
      return a === b;
    }

    function structuralComparer(a, b) {
      return deepEqual(a, b);
    }

    function shallowComparer(a, b) {
      return deepEqual(a, b, 1);
    }

    function defaultComparer(a, b) {
      if (Object.is) {
        return Object.is(a, b);
      }

      return a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
    }

    var comparer = {
      identity: identityComparer,
      structural: structuralComparer,
      "default": defaultComparer,
      shallow: shallowComparer
    };

    function deepEnhancer(v, _, name) {
      // it is an observable already, done
      if (isObservable(v)) {
        return v;
      } // something that can be converted and mutated?


      if (Array.isArray(v)) {
        return observable.array(v, {
          name: name
        });
      }

      if (isPlainObject$1(v)) {
        return observable.object(v, undefined, {
          name: name
        });
      }

      if (isES6Map(v)) {
        return observable.map(v, {
          name: name
        });
      }

      if (isES6Set(v)) {
        return observable.set(v, {
          name: name
        });
      }

      if (typeof v === "function" && !isAction(v) && !isFlow(v)) {
        if (isGenerator(v)) {
          return flow(v);
        } else {
          return autoAction(name, v);
        }
      }

      return v;
    }
    function shallowEnhancer(v, _, name) {
      if (v === undefined || v === null) {
        return v;
      }

      if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) {
        return v;
      }

      if (Array.isArray(v)) {
        return observable.array(v, {
          name: name,
          deep: false
        });
      }

      if (isPlainObject$1(v)) {
        return observable.object(v, undefined, {
          name: name,
          deep: false
        });
      }

      if (isES6Map(v)) {
        return observable.map(v, {
          name: name,
          deep: false
        });
      }

      if (isES6Set(v)) {
        return observable.set(v, {
          name: name,
          deep: false
        });
      }
    }
    function referenceEnhancer(newValue) {
      // never turn into an observable
      return newValue;
    }
    function refStructEnhancer(v, oldValue) {

      if (deepEqual(v, oldValue)) {
        return oldValue;
      }

      return v;
    }

    var OVERRIDE = "override";
    function isOverride(annotation) {
      return annotation.annotationType_ === OVERRIDE;
    }

    function createActionAnnotation(name, options) {
      return {
        annotationType_: name,
        options_: options,
        make_: make_$1,
        extend_: extend_$1
      };
    }

    function make_$1(adm, key, descriptor, source) {
      var _this$options_;

      // bound
      if ((_this$options_ = this.options_) != null && _this$options_.bound) {
        return this.extend_(adm, key, descriptor, false) === null ? 0
        /* Cancel */
        : 1
        /* Break */
        ;
      } // own


      if (source === adm.target_) {
        return this.extend_(adm, key, descriptor, false) === null ? 0
        /* Cancel */
        : 2
        /* Continue */
        ;
      } // prototype


      if (isAction(descriptor.value)) {
        // A prototype could have been annotated already by other constructor,
        // rest of the proto chain must be annotated already
        return 1
        /* Break */
        ;
      }

      var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
      defineProperty$1(source, key, actionDescriptor);
      return 2
      /* Continue */
      ;
    }

    function extend_$1(adm, key, descriptor, proxyTrap) {
      var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
      return adm.defineProperty_(key, actionDescriptor, proxyTrap);
    }

    function assertActionDescriptor(adm, _ref, key, _ref2) {
      _ref.annotationType_;
      _ref2.value;
    }

    function createActionDescriptor(adm, annotation, key, descriptor, // provides ability to disable safeDescriptors for prototypes
    safeDescriptors) {
      var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;

      if (safeDescriptors === void 0) {
        safeDescriptors = globalState.safeDescriptors;
      }

      assertActionDescriptor(adm, annotation, key, descriptor);
      var value = descriptor.value;

      if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
        var _adm$proxy_;

        value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
      }

      return {
        value: createAction((_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(), value, (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false, // https://github.com/mobxjs/mobx/discussions/3140
        (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : undefined),
        // Non-configurable for classes
        // prevents accidental field redefinition in subclass
        configurable: safeDescriptors ? adm.isPlainObject_ : true,
        // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
        enumerable: false,
        // Non-obsevable, therefore non-writable
        // Also prevents rewriting in subclass constructor
        writable: safeDescriptors ? false : true
      };
    }

    function createFlowAnnotation(name, options) {
      return {
        annotationType_: name,
        options_: options,
        make_: make_$2,
        extend_: extend_$2
      };
    }

    function make_$2(adm, key, descriptor, source) {
      var _this$options_;

      // own
      if (source === adm.target_) {
        return this.extend_(adm, key, descriptor, false) === null ? 0
        /* Cancel */
        : 2
        /* Continue */
        ;
      } // prototype
      // bound - must annotate protos to support super.flow()


      if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
        if (this.extend_(adm, key, descriptor, false) === null) {
          return 0
          /* Cancel */
          ;
        }
      }

      if (isFlow(descriptor.value)) {
        // A prototype could have been annotated already by other constructor,
        // rest of the proto chain must be annotated already
        return 1
        /* Break */
        ;
      }

      var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
      defineProperty$1(source, key, flowDescriptor);
      return 2
      /* Continue */
      ;
    }

    function extend_$2(adm, key, descriptor, proxyTrap) {
      var _this$options_2;

      var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
      return adm.defineProperty_(key, flowDescriptor, proxyTrap);
    }

    function assertFlowDescriptor(adm, _ref, key, _ref2) {
      _ref.annotationType_;
      _ref2.value;
    }

    function createFlowDescriptor(adm, annotation, key, descriptor, bound, // provides ability to disable safeDescriptors for prototypes
    safeDescriptors) {
      if (safeDescriptors === void 0) {
        safeDescriptors = globalState.safeDescriptors;
      }

      assertFlowDescriptor(adm, annotation, key, descriptor);
      var value = descriptor.value; // In case of flow.bound, the descriptor can be from already annotated prototype

      if (!isFlow(value)) {
        value = flow(value);
      }

      if (bound) {
        var _adm$proxy_;

        // We do not keep original function around, so we bind the existing flow
        value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_); // This is normally set by `flow`, but `bind` returns new function...

        value.isMobXFlow = true;
      }

      return {
        value: value,
        // Non-configurable for classes
        // prevents accidental field redefinition in subclass
        configurable: safeDescriptors ? adm.isPlainObject_ : true,
        // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
        enumerable: false,
        // Non-obsevable, therefore non-writable
        // Also prevents rewriting in subclass constructor
        writable: safeDescriptors ? false : true
      };
    }

    function createComputedAnnotation(name, options) {
      return {
        annotationType_: name,
        options_: options,
        make_: make_$3,
        extend_: extend_$3
      };
    }

    function make_$3(adm, key, descriptor) {
      return this.extend_(adm, key, descriptor, false) === null ? 0
      /* Cancel */
      : 1
      /* Break */
      ;
    }

    function extend_$3(adm, key, descriptor, proxyTrap) {
      assertComputedDescriptor(adm, this, key, descriptor);
      return adm.defineComputedProperty_(key, _extends({}, this.options_, {
        get: descriptor.get,
        set: descriptor.set
      }), proxyTrap);
    }

    function assertComputedDescriptor(adm, _ref, key, _ref2) {
      _ref.annotationType_;
      _ref2.get;
    }

    function createObservableAnnotation(name, options) {
      return {
        annotationType_: name,
        options_: options,
        make_: make_$4,
        extend_: extend_$4
      };
    }

    function make_$4(adm, key, descriptor) {
      return this.extend_(adm, key, descriptor, false) === null ? 0
      /* Cancel */
      : 1
      /* Break */
      ;
    }

    function extend_$4(adm, key, descriptor, proxyTrap) {
      var _this$options_$enhanc, _this$options_;

      assertObservableDescriptor(adm, this);
      return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
    }

    function assertObservableDescriptor(adm, _ref, key, descriptor) {
      _ref.annotationType_;
    }

    var AUTO = "true";
    var autoAnnotation = /*#__PURE__*/createAutoAnnotation();
    function createAutoAnnotation(options) {
      return {
        annotationType_: AUTO,
        options_: options,
        make_: make_$5,
        extend_: extend_$5
      };
    }

    function make_$5(adm, key, descriptor, source) {
      var _this$options_3, _this$options_4;

      // getter -> computed
      if (descriptor.get) {
        return computed.make_(adm, key, descriptor, source);
      } // lone setter -> action setter


      if (descriptor.set) {
        // TODO make action applicable to setter and delegate to action.make_
        var set = createAction(key.toString(), descriptor.set); // own

        if (source === adm.target_) {
          return adm.defineProperty_(key, {
            configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
            set: set
          }) === null ? 0
          /* Cancel */
          : 2
          /* Continue */
          ;
        } // proto


        defineProperty$1(source, key, {
          configurable: true,
          set: set
        });
        return 2
        /* Continue */
        ;
      } // function on proto -> autoAction/flow


      if (source !== adm.target_ && typeof descriptor.value === "function") {
        var _this$options_2;

        if (isGenerator(descriptor.value)) {
          var _this$options_;

          var flowAnnotation = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
          return flowAnnotation.make_(adm, key, descriptor, source);
        }

        var actionAnnotation = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
        return actionAnnotation.make_(adm, key, descriptor, source);
      } // other -> observable
      // Copy props from proto as well, see test:
      // "decorate should work with Object.create"


      var observableAnnotation = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable; // if function respect autoBind option

      if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
        var _adm$proxy_;

        descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
      }

      return observableAnnotation.make_(adm, key, descriptor, source);
    }

    function extend_$5(adm, key, descriptor, proxyTrap) {
      var _this$options_5, _this$options_6;

      // getter -> computed
      if (descriptor.get) {
        return computed.extend_(adm, key, descriptor, proxyTrap);
      } // lone setter -> action setter


      if (descriptor.set) {
        // TODO make action applicable to setter and delegate to action.extend_
        return adm.defineProperty_(key, {
          configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
          set: createAction(key.toString(), descriptor.set)
        }, proxyTrap);
      } // other -> observable
      // if function respect autoBind option


      if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
        var _adm$proxy_2;

        descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
      }

      var observableAnnotation = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
      return observableAnnotation.extend_(adm, key, descriptor, proxyTrap);
    }

    var OBSERVABLE = "observable";
    var OBSERVABLE_REF = "observable.ref";
    var OBSERVABLE_SHALLOW = "observable.shallow";
    var OBSERVABLE_STRUCT = "observable.struct"; // Predefined bags of create observable options, to avoid allocating temporarily option objects
    // in the majority of cases

    var defaultCreateObservableOptions = {
      deep: true,
      name: undefined,
      defaultDecorator: undefined,
      proxy: true
    };
    Object.freeze(defaultCreateObservableOptions);
    function asCreateObservableOptions(thing) {
      return thing || defaultCreateObservableOptions;
    }
    var observableAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE);
    var observableRefAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE_REF, {
      enhancer: referenceEnhancer
    });
    var observableShallowAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE_SHALLOW, {
      enhancer: shallowEnhancer
    });
    var observableStructAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE_STRUCT, {
      enhancer: refStructEnhancer
    });
    var observableDecoratorAnnotation = /*#__PURE__*/createDecoratorAnnotation(observableAnnotation);
    function getEnhancerFromOptions(options) {
      return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
    }
    function getAnnotationFromOptions(options) {
      var _options$defaultDecor;

      return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : undefined;
    }
    function getEnhancerFromAnnotation(annotation) {
      var _annotation$options_$, _annotation$options_;

      return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
    }
    /**
     * Turns an object, array or function into a reactive structure.
     * @param v the value which should become observable.
     */

    function createObservable(v, arg2, arg3) {
      // @observable someProp;
      if (isStringish(arg2)) {
        storeAnnotation(v, arg2, observableAnnotation);
        return;
      } // already observable - ignore


      if (isObservable(v)) {
        return v;
      } // plain object


      if (isPlainObject$1(v)) {
        return observable.object(v, arg2, arg3);
      } // Array


      if (Array.isArray(v)) {
        return observable.array(v, arg2);
      } // Map


      if (isES6Map(v)) {
        return observable.map(v, arg2);
      } // Set


      if (isES6Set(v)) {
        return observable.set(v, arg2);
      } // other object - ignore


      if (typeof v === "object" && v !== null) {
        return v;
      } // anything else


      return observable.box(v, arg2);
    }

    Object.assign(createObservable, observableDecoratorAnnotation);
    var observableFactories = {
      box: function box(value, options) {
        var o = asCreateObservableOptions(options);
        return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
      },
      array: function array(initialValues, options) {
        var o = asCreateObservableOptions(options);
        return (globalState.useProxies === false || o.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o), o.name);
      },
      map: function map(initialValues, options) {
        var o = asCreateObservableOptions(options);
        return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
      },
      set: function set(initialValues, options) {
        var o = asCreateObservableOptions(options);
        return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
      },
      object: function object(props, decorators, options) {
        return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
      },
      ref: /*#__PURE__*/createDecoratorAnnotation(observableRefAnnotation),
      shallow: /*#__PURE__*/createDecoratorAnnotation(observableShallowAnnotation),
      deep: observableDecoratorAnnotation,
      struct: /*#__PURE__*/createDecoratorAnnotation(observableStructAnnotation)
    }; // eslint-disable-next-line

    var observable = /*#__PURE__*/assign(createObservable, observableFactories);

    var COMPUTED = "computed";
    var COMPUTED_STRUCT = "computed.struct";
    var computedAnnotation = /*#__PURE__*/createComputedAnnotation(COMPUTED);
    var computedStructAnnotation = /*#__PURE__*/createComputedAnnotation(COMPUTED_STRUCT, {
      equals: comparer.structural
    });
    /**
     * Decorator for class properties: @computed get value() { return expr; }.
     * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
     */

    var computed = function computed(arg1, arg2) {
      if (isStringish(arg2)) {
        // @computed
        return storeAnnotation(arg1, arg2, computedAnnotation);
      }

      if (isPlainObject$1(arg1)) {
        // @computed({ options })
        return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
      } // computed(expr, options?)

      var opts = isPlainObject$1(arg2) ? arg2 : {};
      opts.get = arg1;
      opts.name || (opts.name = arg1.name || "");
      /* for generated name */

      return new ComputedValue(opts);
    };
    Object.assign(computed, computedAnnotation);
    computed.struct = /*#__PURE__*/createDecoratorAnnotation(computedStructAnnotation);

    var _getDescriptor$config, _getDescriptor;
    // mobx versions

    var currentActionId = 0;
    var nextActionId$1 = 1;
    var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /*#__PURE__*/getDescriptor(function () {}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false; // we can safely recycle this object

    var tmpNameDescriptor = {
      value: "action",
      configurable: true,
      writable: false,
      enumerable: false
    };
    function createAction(actionName, fn, autoAction, ref) {
      if (autoAction === void 0) {
        autoAction = false;
      }

      function res() {
        return executeAction(actionName, autoAction, fn, ref || this, arguments);
      }

      res.isMobxAction = true;

      if (isFunctionNameConfigurable) {
        tmpNameDescriptor.value = actionName;
        Object.defineProperty(res, "name", tmpNameDescriptor);
      }

      return res;
    }
    function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
      var runInfo = _startAction(actionName, canRunAsDerivation);

      try {
        return fn.apply(scope, args);
      } catch (err) {
        runInfo.error_ = err;
        throw err;
      } finally {
        _endAction(runInfo);
      }
    }
    function _startAction(actionName, canRunAsDerivation, // true for autoAction
    scope, args) {
      var notifySpy_ = "production" !== "production"  ;
      var startTime_ = 0;

      var prevDerivation_ = globalState.trackingDerivation;
      var runAsAction = !canRunAsDerivation || !prevDerivation_;
      startBatch();
      var prevAllowStateChanges_ = globalState.allowStateChanges; // by default preserve previous allow

      if (runAsAction) {
        untrackedStart();
        prevAllowStateChanges_ = allowStateChangesStart(true);
      }

      var prevAllowStateReads_ = allowStateReadsStart(true);
      var runInfo = {
        runAsAction_: runAsAction,
        prevDerivation_: prevDerivation_,
        prevAllowStateChanges_: prevAllowStateChanges_,
        prevAllowStateReads_: prevAllowStateReads_,
        notifySpy_: notifySpy_,
        startTime_: startTime_,
        actionId_: nextActionId$1++,
        parentActionId_: currentActionId
      };
      currentActionId = runInfo.actionId_;
      return runInfo;
    }
    function _endAction(runInfo) {
      if (currentActionId !== runInfo.actionId_) {
        die(30);
      }

      currentActionId = runInfo.parentActionId_;

      if (runInfo.error_ !== undefined) {
        globalState.suppressReactionErrors = true;
      }

      allowStateChangesEnd(runInfo.prevAllowStateChanges_);
      allowStateReadsEnd(runInfo.prevAllowStateReads_);
      endBatch();

      if (runInfo.runAsAction_) {
        untrackedEnd(runInfo.prevDerivation_);
      }

      globalState.suppressReactionErrors = false;
    }
    function allowStateChanges(allowStateChanges, func) {
      var prev = allowStateChangesStart(allowStateChanges);

      try {
        return func();
      } finally {
        allowStateChangesEnd(prev);
      }
    }
    function allowStateChangesStart(allowStateChanges) {
      var prev = globalState.allowStateChanges;
      globalState.allowStateChanges = allowStateChanges;
      return prev;
    }
    function allowStateChangesEnd(prev) {
      globalState.allowStateChanges = prev;
    }

    var _Symbol$toPrimitive;
    _Symbol$toPrimitive = Symbol.toPrimitive;
    var ObservableValue = /*#__PURE__*/function (_Atom, _Symbol$toPrimitive2) {
      _inheritsLoose(ObservableValue, _Atom);

      function ObservableValue(value, enhancer, name_, notifySpy, equals) {
        var _this;

        if (name_ === void 0) {
          name_ = "ObservableValue";
        }

        if (equals === void 0) {
          equals = comparer["default"];
        }

        _this = _Atom.call(this, name_) || this;
        _this.enhancer = void 0;
        _this.name_ = void 0;
        _this.equals = void 0;
        _this.hasUnreportedChange_ = false;
        _this.interceptors_ = void 0;
        _this.changeListeners_ = void 0;
        _this.value_ = void 0;
        _this.dehancer = void 0;
        _this.enhancer = enhancer;
        _this.name_ = name_;
        _this.equals = equals;
        _this.value_ = enhancer(value, undefined, name_);

        return _this;
      }

      var _proto = ObservableValue.prototype;

      _proto.dehanceValue = function dehanceValue(value) {
        if (this.dehancer !== undefined) {
          return this.dehancer(value);
        }

        return value;
      };

      _proto.set = function set(newValue) {
        this.value_;
        newValue = this.prepareNewValue_(newValue);

        if (newValue !== globalState.UNCHANGED) {

          this.setNewValue_(newValue);
        }
      };

      _proto.prepareNewValue_ = function prepareNewValue_(newValue) {

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this,
            type: UPDATE,
            newValue: newValue
          });

          if (!change) {
            return globalState.UNCHANGED;
          }

          newValue = change.newValue;
        } // apply modifier


        newValue = this.enhancer(newValue, this.value_, this.name_);
        return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
      };

      _proto.setNewValue_ = function setNewValue_(newValue) {
        var oldValue = this.value_;
        this.value_ = newValue;
        this.reportChanged();

        if (hasListeners(this)) {
          notifyListeners(this, {
            type: UPDATE,
            object: this,
            newValue: newValue,
            oldValue: oldValue
          });
        }
      };

      _proto.get = function get() {
        this.reportObserved();
        return this.dehanceValue(this.value_);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        if (fireImmediately) {
          listener({
            observableKind: "value",
            debugObjectName: this.name_,
            object: this,
            type: UPDATE,
            newValue: this.value_,
            oldValue: undefined
          });
        }

        return registerListener(this, listener);
      };

      _proto.raw = function raw() {
        // used by MST ot get undehanced value
        return this.value_;
      };

      _proto.toJSON = function toJSON() {
        return this.get();
      };

      _proto.toString = function toString() {
        return this.name_ + "[" + this.value_ + "]";
      };

      _proto.valueOf = function valueOf() {
        return toPrimitive(this.get());
      };

      _proto[_Symbol$toPrimitive2] = function () {
        return this.valueOf();
      };

      return ObservableValue;
    }(Atom, _Symbol$toPrimitive);
    var isObservableValue = /*#__PURE__*/createInstanceofPredicate("ObservableValue", ObservableValue);

    var _Symbol$toPrimitive$1;
    /**
     * A node in the state dependency root that observes other nodes, and can be observed itself.
     *
     * ComputedValue will remember the result of the computation for the duration of the batch, or
     * while being observed.
     *
     * During this time it will recompute only when one of its direct dependencies changed,
     * but only when it is being accessed with `ComputedValue.get()`.
     *
     * Implementation description:
     * 1. First time it's being accessed it will compute and remember result
     *    give back remembered result until 2. happens
     * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
     * 3. When it's being accessed, recompute if any shallow dependency changed.
     *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
     *    go to step 2. either way
     *
     * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
     */

    _Symbol$toPrimitive$1 = Symbol.toPrimitive;
    var ComputedValue = /*#__PURE__*/function (_Symbol$toPrimitive2) {
      // nodes we are looking at. Our value depends on these nodes
      // during tracking it's an array with new observed observers
      // to check for cycles
      // N.B: unminified as it is used by MST

      /**
       * Create a new computed value based on a function expression.
       *
       * The `name` property is for debug purposes only.
       *
       * The `equals` property specifies the comparer function to use to determine if a newly produced
       * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
       * compares based on identity comparison (===), and `structuralComparer` deeply compares the structure.
       * Structural comparison can be convenient if you always produce a new aggregated object and
       * don't want to notify observers if it is structurally the same.
       * This is useful for working with vectors, mouse coordinates etc.
       */
      function ComputedValue(options) {
        this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
        this.observing_ = [];
        this.newObserving_ = null;
        this.isBeingObserved_ = false;
        this.isPendingUnobservation_ = false;
        this.observers_ = new Set();
        this.diffValue_ = 0;
        this.runId_ = 0;
        this.lastAccessedBy_ = 0;
        this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
        this.unboundDepsCount_ = 0;
        this.value_ = new CaughtException(null);
        this.name_ = void 0;
        this.triggeredBy_ = void 0;
        this.isComputing_ = false;
        this.isRunningSetter_ = false;
        this.derivation = void 0;
        this.setter_ = void 0;
        this.isTracing_ = TraceMode.NONE;
        this.scope_ = void 0;
        this.equals_ = void 0;
        this.requiresReaction_ = void 0;
        this.keepAlive_ = void 0;
        this.onBOL = void 0;
        this.onBUOL = void 0;

        if (!options.get) {
          die(31);
        }

        this.derivation = options.get;
        this.name_ = options.name || ("ComputedValue");

        if (options.set) {
          this.setter_ = createAction("ComputedValue-setter", options.set);
        }

        this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
        this.scope_ = options.context;
        this.requiresReaction_ = options.requiresReaction;
        this.keepAlive_ = !!options.keepAlive;
      }

      var _proto = ComputedValue.prototype;

      _proto.onBecomeStale_ = function onBecomeStale_() {
        propagateMaybeChanged(this);
      };

      _proto.onBO = function onBO() {
        if (this.onBOL) {
          this.onBOL.forEach(function (listener) {
            return listener();
          });
        }
      };

      _proto.onBUO = function onBUO() {
        if (this.onBUOL) {
          this.onBUOL.forEach(function (listener) {
            return listener();
          });
        }
      }
      /**
       * Returns the current value of this computed value.
       * Will evaluate its computation first if needed.
       */
      ;

      _proto.get = function get() {
        if (this.isComputing_) {
          die(32, this.name_, this.derivation);
        }

        if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
        this.observers_.size === 0 && !this.keepAlive_) {
          if (shouldCompute(this)) {
            this.warnAboutUntrackedRead_();
            startBatch(); // See perf test 'computed memoization'

            this.value_ = this.computeValue_(false);
            endBatch();
          }
        } else {
          reportObserved(this);

          if (shouldCompute(this)) {
            var prevTrackingContext = globalState.trackingContext;

            if (this.keepAlive_ && !prevTrackingContext) {
              globalState.trackingContext = this;
            }

            if (this.trackAndCompute()) {
              propagateChangeConfirmed(this);
            }

            globalState.trackingContext = prevTrackingContext;
          }
        }

        var result = this.value_;

        if (isCaughtException(result)) {
          throw result.cause;
        }

        return result;
      };

      _proto.set = function set(value) {
        if (this.setter_) {
          if (this.isRunningSetter_) {
            die(33, this.name_);
          }

          this.isRunningSetter_ = true;

          try {
            this.setter_.call(this.scope_, value);
          } finally {
            this.isRunningSetter_ = false;
          }
        } else {
          die(34, this.name_);
        }
      };

      _proto.trackAndCompute = function trackAndCompute() {
        // N.B: unminified as it is used by MST
        var oldValue = this.value_;
        var wasSuspended =
        /* see #1208 */
        this.dependenciesState_ === IDerivationState_.NOT_TRACKING_;
        var newValue = this.computeValue_(true);
        var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);

        if (changed) {
          this.value_ = newValue;
        }

        return changed;
      };

      _proto.computeValue_ = function computeValue_(track) {
        this.isComputing_ = true; // don't allow state changes during computation

        var prev = allowStateChangesStart(false);
        var res;

        if (track) {
          res = trackDerivedFunction(this, this.derivation, this.scope_);
        } else {
          if (globalState.disableErrorBoundaries === true) {
            res = this.derivation.call(this.scope_);
          } else {
            try {
              res = this.derivation.call(this.scope_);
            } catch (e) {
              res = new CaughtException(e);
            }
          }
        }

        allowStateChangesEnd(prev);
        this.isComputing_ = false;
        return res;
      };

      _proto.suspend_ = function suspend_() {
        if (!this.keepAlive_) {
          clearObserving(this);
          this.value_ = undefined; // don't hold on to computed value!
        }
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        var _this = this;

        var firstTime = true;
        var prevValue = undefined;
        return autorun(function () {
          // TODO: why is this in a different place than the spyReport() function? in all other observables it's called in the same place
          var newValue = _this.get();

          if (!firstTime || fireImmediately) {
            var prevU = untrackedStart();
            listener({
              observableKind: "computed",
              debugObjectName: _this.name_,
              type: UPDATE,
              object: _this,
              newValue: newValue,
              oldValue: prevValue
            });
            untrackedEnd(prevU);
          }

          firstTime = false;
          prevValue = newValue;
        });
      };

      _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
        {
          return;
        }
      };

      _proto.toString = function toString() {
        return this.name_ + "[" + this.derivation.toString() + "]";
      };

      _proto.valueOf = function valueOf() {
        return toPrimitive(this.get());
      };

      _proto[_Symbol$toPrimitive2] = function () {
        return this.valueOf();
      };

      return ComputedValue;
    }(_Symbol$toPrimitive$1);
    var isComputedValue = /*#__PURE__*/createInstanceofPredicate("ComputedValue", ComputedValue);

    var IDerivationState_;

    (function (IDerivationState_) {
      // before being run or (outside batch and not being observed)
      // at this point derivation is not holding any data about dependency tree
      IDerivationState_[IDerivationState_["NOT_TRACKING_"] = -1] = "NOT_TRACKING_"; // no shallow dependency changed since last computation
      // won't recalculate derivation
      // this is what makes mobx fast

      IDerivationState_[IDerivationState_["UP_TO_DATE_"] = 0] = "UP_TO_DATE_"; // some deep dependency changed, but don't know if shallow dependency changed
      // will require to check first if UP_TO_DATE or POSSIBLY_STALE
      // currently only ComputedValue will propagate POSSIBLY_STALE
      //
      // having this state is second big optimization:
      // don't have to recompute on every dependency change, but only when it's needed

      IDerivationState_[IDerivationState_["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_"; // A shallow dependency has changed since last computation and the derivation
      // will need to recompute when it's needed next.

      IDerivationState_[IDerivationState_["STALE_"] = 2] = "STALE_";
    })(IDerivationState_ || (IDerivationState_ = {}));

    var TraceMode;

    (function (TraceMode) {
      TraceMode[TraceMode["NONE"] = 0] = "NONE";
      TraceMode[TraceMode["LOG"] = 1] = "LOG";
      TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
    })(TraceMode || (TraceMode = {}));

    var CaughtException = function CaughtException(cause) {
      this.cause = void 0;
      this.cause = cause; // Empty
    };
    function isCaughtException(e) {
      return e instanceof CaughtException;
    }
    /**
     * Finds out whether any dependency of the derivation has actually changed.
     * If dependenciesState is 1 then it will recalculate dependencies,
     * if any dependency changed it will propagate it by changing dependenciesState to 2.
     *
     * By iterating over the dependencies in the same order that they were reported and
     * stopping on the first change, all the recalculations are only called for ComputedValues
     * that will be tracked by derivation. That is because we assume that if the first x
     * dependencies of the derivation doesn't change then the derivation should run the same way
     * up until accessing x-th dependency.
     */

    function shouldCompute(derivation) {
      switch (derivation.dependenciesState_) {
        case IDerivationState_.UP_TO_DATE_:
          return false;

        case IDerivationState_.NOT_TRACKING_:
        case IDerivationState_.STALE_:
          return true;

        case IDerivationState_.POSSIBLY_STALE_:
          {
            // state propagation can occur outside of action/reactive context #2195
            var prevAllowStateReads = allowStateReadsStart(true);
            var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.

            var obs = derivation.observing_,
                l = obs.length;

            for (var i = 0; i < l; i++) {
              var obj = obs[i];

              if (isComputedValue(obj)) {
                if (globalState.disableErrorBoundaries) {
                  obj.get();
                } else {
                  try {
                    obj.get();
                  } catch (e) {
                    // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                    untrackedEnd(prevUntracked);
                    allowStateReadsEnd(prevAllowStateReads);
                    return true;
                  }
                } // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                // and `derivation` is an observer of `obj`
                // invariantShouldCompute(derivation)


                if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
                  untrackedEnd(prevUntracked);
                  allowStateReadsEnd(prevAllowStateReads);
                  return true;
                }
              }
            }

            changeDependenciesStateTo0(derivation);
            untrackedEnd(prevUntracked);
            allowStateReadsEnd(prevAllowStateReads);
            return false;
          }
      }
    }
    function checkIfStateModificationsAreAllowed(atom) {
      {
        return;
      }
    }
    /**
     * Executes the provided function `f` and tracks which observables are being accessed.
     * The tracking information is stored on the `derivation` object and the derivation is registered
     * as observer of any of the accessed observables.
     */

    function trackDerivedFunction(derivation, f, context) {
      var prevAllowStateReads = allowStateReadsStart(true); // pre allocate array allocation + room for variation in deps
      // array will be trimmed by bindDependencies

      changeDependenciesStateTo0(derivation);
      derivation.newObserving_ = new Array(derivation.observing_.length + 100);
      derivation.unboundDepsCount_ = 0;
      derivation.runId_ = ++globalState.runId;
      var prevTracking = globalState.trackingDerivation;
      globalState.trackingDerivation = derivation;
      globalState.inBatch++;
      var result;

      if (globalState.disableErrorBoundaries === true) {
        result = f.call(context);
      } else {
        try {
          result = f.call(context);
        } catch (e) {
          result = new CaughtException(e);
        }
      }

      globalState.inBatch--;
      globalState.trackingDerivation = prevTracking;
      bindDependencies(derivation);
      allowStateReadsEnd(prevAllowStateReads);
      return result;
    }
    /**
     * diffs newObserving with observing.
     * update observing to be newObserving with unique observables
     * notify observers that become observed/unobserved
     */


    function bindDependencies(derivation) {
      // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
      var prevObserving = derivation.observing_;
      var observing = derivation.observing_ = derivation.newObserving_;
      var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_; // Go through all new observables and check diffValue: (this list can contain duplicates):
      //   0: first occurrence, change to 1 and keep it
      //   1: extra occurrence, drop it

      var i0 = 0,
          l = derivation.unboundDepsCount_;

      for (var i = 0; i < l; i++) {
        var dep = observing[i];

        if (dep.diffValue_ === 0) {
          dep.diffValue_ = 1;

          if (i0 !== i) {
            observing[i0] = dep;
          }

          i0++;
        } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition


        if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
          lowestNewObservingDerivationState = dep.dependenciesState_;
        }
      }

      observing.length = i0;
      derivation.newObserving_ = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
      // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
      //   0: it's not in new observables, unobserve it
      //   1: it keeps being observed, don't want to notify it. change to 0

      l = prevObserving.length;

      while (l--) {
        var _dep = prevObserving[l];

        if (_dep.diffValue_ === 0) {
          removeObserver(_dep, derivation);
        }

        _dep.diffValue_ = 0;
      } // Go through all new observables and check diffValue: (now it should be unique)
      //   0: it was set to 0 in last loop. don't need to do anything.
      //   1: it wasn't observed, let's observe it. set back to 0


      while (i0--) {
        var _dep2 = observing[i0];

        if (_dep2.diffValue_ === 1) {
          _dep2.diffValue_ = 0;
          addObserver(_dep2, derivation);
        }
      } // Some new observed derivations may become stale during this derivation computation
      // so they have had no chance to propagate staleness (#916)


      if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
        derivation.dependenciesState_ = lowestNewObservingDerivationState;
        derivation.onBecomeStale_();
      }
    }

    function clearObserving(derivation) {
      // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
      var obs = derivation.observing_;
      derivation.observing_ = [];
      var i = obs.length;

      while (i--) {
        removeObserver(obs[i], derivation);
      }

      derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    }
    function untracked(action) {
      var prev = untrackedStart();

      try {
        return action();
      } finally {
        untrackedEnd(prev);
      }
    }
    function untrackedStart() {
      var prev = globalState.trackingDerivation;
      globalState.trackingDerivation = null;
      return prev;
    }
    function untrackedEnd(prev) {
      globalState.trackingDerivation = prev;
    }
    function allowStateReadsStart(allowStateReads) {
      var prev = globalState.allowStateReads;
      globalState.allowStateReads = allowStateReads;
      return prev;
    }
    function allowStateReadsEnd(prev) {
      globalState.allowStateReads = prev;
    }
    /**
     * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
     *
     */

    function changeDependenciesStateTo0(derivation) {
      if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        return;
      }

      derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
      var obs = derivation.observing_;
      var i = obs.length;

      while (i--) {
        obs[i].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      }
    }
    var MobXGlobals = function MobXGlobals() {
      this.version = 6;
      this.UNCHANGED = {};
      this.trackingDerivation = null;
      this.trackingContext = null;
      this.runId = 0;
      this.mobxGuid = 0;
      this.inBatch = 0;
      this.pendingUnobservations = [];
      this.pendingReactions = [];
      this.isRunningReactions = false;
      this.allowStateChanges = false;
      this.allowStateReads = true;
      this.enforceActions = true;
      this.spyListeners = [];
      this.globalReactionErrorHandlers = [];
      this.computedRequiresReaction = false;
      this.reactionRequiresObservable = false;
      this.observableRequiresReaction = false;
      this.disableErrorBoundaries = false;
      this.suppressReactionErrors = false;
      this.useProxies = true;
      this.verifyProxies = false;
      this.safeDescriptors = true;
    };
    var canMergeGlobalState = true;
    var globalState = /*#__PURE__*/function () {
      var global = /*#__PURE__*/getGlobal();

      if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals) {
        canMergeGlobalState = false;
      }

      if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version) {
        canMergeGlobalState = false;
      }

      if (!canMergeGlobalState) {
        // Because this is a IIFE we need to let isolateCalled a chance to change
        // so we run it after the event loop completed at least 1 iteration
        setTimeout(function () {
          {
            die(35);
          }
        }, 1);
        return new MobXGlobals();
      } else if (global.__mobxGlobals) {
        global.__mobxInstanceCount += 1;

        if (!global.__mobxGlobals.UNCHANGED) {
          global.__mobxGlobals.UNCHANGED = {};
        } // make merge backward compatible


        return global.__mobxGlobals;
      } else {
        global.__mobxInstanceCount = 1;
        return global.__mobxGlobals = /*#__PURE__*/new MobXGlobals();
      }
    }();
    function getGlobalState() {
      return globalState;
    }
    //     const list = observable.observers
    //     const map = observable.observersIndexes
    //     const l = list.length
    //     for (let i = 0; i < l; i++) {
    //         const id = list[i].__mapid
    //         if (i) {
    //             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
    //         } else {
    //             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
    //         }
    //     }
    //     invariant(
    //         list.length === 0 || Object.keys(map).length === list.length - 1,
    //         "INTERNAL ERROR there is no junk in map"
    //     )
    // }

    function addObserver(observable, node) {
      // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
      // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
      // invariantObservers(observable);
      observable.observers_.add(node);

      if (observable.lowestObserverState_ > node.dependenciesState_) {
        observable.lowestObserverState_ = node.dependenciesState_;
      } // invariantObservers(observable);
      // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");

    }
    function removeObserver(observable, node) {
      // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
      // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
      // invariantObservers(observable);
      observable.observers_["delete"](node);

      if (observable.observers_.size === 0) {
        // deleting last observer
        queueForUnobservation(observable);
      } // invariantObservers(observable);
      // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");

    }
    function queueForUnobservation(observable) {
      if (observable.isPendingUnobservation_ === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable.isPendingUnobservation_ = true;
        globalState.pendingUnobservations.push(observable);
      }
    }
    /**
     * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
     * During a batch `onBecomeUnobserved` will be called at most once per observable.
     * Avoids unnecessary recalculations.
     */

    function startBatch() {
      globalState.inBatch++;
    }
    function endBatch() {
      if (--globalState.inBatch === 0) {
        runReactions(); // the batch is actually about to finish, all unobserving should happen here.

        var list = globalState.pendingUnobservations;

        for (var i = 0; i < list.length; i++) {
          var observable = list[i];
          observable.isPendingUnobservation_ = false;

          if (observable.observers_.size === 0) {
            if (observable.isBeingObserved_) {
              // if this observable had reactive observers, trigger the hooks
              observable.isBeingObserved_ = false;
              observable.onBUO();
            }

            if (observable instanceof ComputedValue) {
              // computed values are automatically teared down when the last observer leaves
              // this process happens recursively, this computed might be the last observabe of another, etc..
              observable.suspend_();
            }
          }
        }

        globalState.pendingUnobservations = [];
      }
    }
    function reportObserved(observable) {
      var derivation = globalState.trackingDerivation;

      if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId_ !== observable.lastAccessedBy_) {
          observable.lastAccessedBy_ = derivation.runId_; // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...

          derivation.newObserving_[derivation.unboundDepsCount_++] = observable;

          if (!observable.isBeingObserved_ && globalState.trackingContext) {
            observable.isBeingObserved_ = true;
            observable.onBO();
          }
        }

        return true;
      } else if (observable.observers_.size === 0 && globalState.inBatch > 0) {
        queueForUnobservation(observable);
      }

      return false;
    } // function invariantLOS(observable: IObservable, msg: string) {
    //     // it's expensive so better not run it in produciton. but temporarily helpful for testing
    //     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
    //     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
    //     throw new Error(
    //         "lowestObserverState is wrong for " +
    //             msg +
    //             " because " +
    //             min +
    //             " < " +
    //             observable.lowestObserverState
    //     )
    // }

    /**
     * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
     * It will propagate changes to observers from previous run
     * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
     * Hopefully self reruning autoruns aren't a feature people should depend on
     * Also most basic use cases should be ok
     */
    // Called by Atom when its value changes

    function propagateChanged(observable) {
      // invariantLOS(observable, "changed start");
      if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
        return;
      }

      observable.lowestObserverState_ = IDerivationState_.STALE_; // Ideally we use for..of here, but the downcompiled version is really slow...

      observable.observers_.forEach(function (d) {
        if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {

          d.onBecomeStale_();
        }

        d.dependenciesState_ = IDerivationState_.STALE_;
      }); // invariantLOS(observable, "changed end");
    } // Called by ComputedValue when it recalculate and its value changed

    function propagateChangeConfirmed(observable) {
      // invariantLOS(observable, "confirmed start");
      if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
        return;
      }

      observable.lowestObserverState_ = IDerivationState_.STALE_;
      observable.observers_.forEach(function (d) {
        if (d.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
          d.dependenciesState_ = IDerivationState_.STALE_;
        } else if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_ // this happens during computing of `d`, just keep lowestObserverState up to date.
        ) {
          observable.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
        }
      }); // invariantLOS(observable, "confirmed end");
    } // Used by computed when its dependency changed, but we don't wan't to immediately recompute.

    function propagateMaybeChanged(observable) {
      // invariantLOS(observable, "maybe start");
      if (observable.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
        return;
      }

      observable.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
      observable.observers_.forEach(function (d) {
        if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
          d.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
          d.onBecomeStale_();
        }
      }); // invariantLOS(observable, "maybe end");
    }

    var Reaction = /*#__PURE__*/function () {
      // nodes we are looking at. Our value depends on these nodes
      function Reaction(name_, onInvalidate_, errorHandler_, requiresObservable_) {
        if (name_ === void 0) {
          name_ = "Reaction";
        }

        this.name_ = void 0;
        this.onInvalidate_ = void 0;
        this.errorHandler_ = void 0;
        this.requiresObservable_ = void 0;
        this.observing_ = [];
        this.newObserving_ = [];
        this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
        this.diffValue_ = 0;
        this.runId_ = 0;
        this.unboundDepsCount_ = 0;
        this.isDisposed_ = false;
        this.isScheduled_ = false;
        this.isTrackPending_ = false;
        this.isRunning_ = false;
        this.isTracing_ = TraceMode.NONE;
        this.name_ = name_;
        this.onInvalidate_ = onInvalidate_;
        this.errorHandler_ = errorHandler_;
        this.requiresObservable_ = requiresObservable_;
      }

      var _proto = Reaction.prototype;

      _proto.onBecomeStale_ = function onBecomeStale_() {
        this.schedule_();
      };

      _proto.schedule_ = function schedule_() {
        if (!this.isScheduled_) {
          this.isScheduled_ = true;
          globalState.pendingReactions.push(this);
          runReactions();
        }
      };

      _proto.isScheduled = function isScheduled() {
        return this.isScheduled_;
      }
      /**
       * internal, use schedule() if you intend to kick off a reaction
       */
      ;

      _proto.runReaction_ = function runReaction_() {
        if (!this.isDisposed_) {
          startBatch();
          this.isScheduled_ = false;
          var prev = globalState.trackingContext;
          globalState.trackingContext = this;

          if (shouldCompute(this)) {
            this.isTrackPending_ = true;

            try {
              this.onInvalidate_();

              if ("production" !== "production" && this.isTrackPending_ && isSpyEnabled()) ;
            } catch (e) {
              this.reportExceptionInDerivation_(e);
            }
          }

          globalState.trackingContext = prev;
          endBatch();
        }
      };

      _proto.track = function track(fn) {
        if (this.isDisposed_) {
          return; // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
        }

        startBatch();

        this.isRunning_ = true;
        var prevReaction = globalState.trackingContext; // reactions could create reactions...

        globalState.trackingContext = this;
        var result = trackDerivedFunction(this, fn, undefined);
        globalState.trackingContext = prevReaction;
        this.isRunning_ = false;
        this.isTrackPending_ = false;

        if (this.isDisposed_) {
          // disposed during last run. Clean up everything that was bound after the dispose call.
          clearObserving(this);
        }

        if (isCaughtException(result)) {
          this.reportExceptionInDerivation_(result.cause);
        }

        endBatch();
      };

      _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
        var _this = this;

        if (this.errorHandler_) {
          this.errorHandler_(error, this);
          return;
        }

        if (globalState.disableErrorBoundaries) {
          throw error;
        }

        var message = "[mobx] uncaught error in '" + this + "'";

        if (!globalState.suppressReactionErrors) {
          console.error(message, error);
          /** If debugging brought you here, please, read the above message :-). Tnx! */
        } // prettier-ignore

        globalState.globalReactionErrorHandlers.forEach(function (f) {
          return f(error, _this);
        });
      };

      _proto.dispose = function dispose() {
        if (!this.isDisposed_) {
          this.isDisposed_ = true;

          if (!this.isRunning_) {
            // if disposed while running, clean up later. Maybe not optimal, but rare case
            startBatch();
            clearObserving(this);
            endBatch();
          }
        }
      };

      _proto.getDisposer_ = function getDisposer_() {
        var r = this.dispose.bind(this);
        r[$mobx] = this;
        return r;
      };

      _proto.toString = function toString() {
        return "Reaction[" + this.name_ + "]";
      };

      _proto.trace = function trace$1(enterBreakPoint) {
        if (enterBreakPoint === void 0) {
          enterBreakPoint = false;
        }

        trace(this, enterBreakPoint);
      };

      return Reaction;
    }();
    /**
     * Magic number alert!
     * Defines within how many times a reaction is allowed to re-trigger itself
     * until it is assumed that this is gonna be a never ending loop...
     */

    var MAX_REACTION_ITERATIONS = 100;

    var reactionScheduler = function reactionScheduler(f) {
      return f();
    };

    function runReactions() {
      // Trampolining, if runReactions are already running, new reactions will be picked up
      if (globalState.inBatch > 0 || globalState.isRunningReactions) {
        return;
      }

      reactionScheduler(runReactionsHelper);
    }

    function runReactionsHelper() {
      globalState.isRunningReactions = true;
      var allReactions = globalState.pendingReactions;
      var iterations = 0; // While running reactions, new reactions might be triggered.
      // Hence we work with two variables and check whether
      // we converge to no remaining reactions after a while.

      while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
          console.error("[mobx] cycle in reaction: " + allReactions[0]);
          allReactions.splice(0); // clear reactions
        }

        var remainingReactions = allReactions.splice(0);

        for (var i = 0, l = remainingReactions.length; i < l; i++) {
          remainingReactions[i].runReaction_();
        }
      }

      globalState.isRunningReactions = false;
    }

    var isReaction = /*#__PURE__*/createInstanceofPredicate("Reaction", Reaction);

    function isSpyEnabled() {
      return "production" !== "production" ;
    }
    function spyReport(event) {
      {
        return;
      } // dead code elimination can do the rest
    }
    function spyReportStart(event) {
      {
        return;
      }
    }
    function spyReportEnd(change) {
      {
        return;
      }
    }
    function spy(listener) {
      {
        console.warn("[mobx.spy] Is a no-op in production builds");
        return function () {};
      }
    }

    var ACTION = "action";
    var ACTION_BOUND = "action.bound";
    var AUTOACTION = "autoAction";
    var AUTOACTION_BOUND = "autoAction.bound";
    var DEFAULT_ACTION_NAME = "<unnamed action>";
    var actionAnnotation = /*#__PURE__*/createActionAnnotation(ACTION);
    var actionBoundAnnotation = /*#__PURE__*/createActionAnnotation(ACTION_BOUND, {
      bound: true
    });
    var autoActionAnnotation = /*#__PURE__*/createActionAnnotation(AUTOACTION, {
      autoAction: true
    });
    var autoActionBoundAnnotation = /*#__PURE__*/createActionAnnotation(AUTOACTION_BOUND, {
      autoAction: true,
      bound: true
    });

    function createActionFactory(autoAction) {
      var res = function action(arg1, arg2) {
        // action(fn() {})
        if (isFunction(arg1)) {
          return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction);
        } // action("name", fn() {})


        if (isFunction(arg2)) {
          return createAction(arg1, arg2, autoAction);
        } // @action


        if (isStringish(arg2)) {
          return storeAnnotation(arg1, arg2, autoAction ? autoActionAnnotation : actionAnnotation);
        } // action("name") & @action("name")


        if (isStringish(arg1)) {
          return createDecoratorAnnotation(createActionAnnotation(autoAction ? AUTOACTION : ACTION, {
            name: arg1,
            autoAction: autoAction
          }));
        }
      };

      return res;
    }

    var action = /*#__PURE__*/createActionFactory(false);
    Object.assign(action, actionAnnotation);
    var autoAction = /*#__PURE__*/createActionFactory(true);
    Object.assign(autoAction, autoActionAnnotation);
    action.bound = /*#__PURE__*/createDecoratorAnnotation(actionBoundAnnotation);
    autoAction.bound = /*#__PURE__*/createDecoratorAnnotation(autoActionBoundAnnotation);
    function runInAction(fn) {
      return executeAction(fn.name || DEFAULT_ACTION_NAME, false, fn, this, undefined);
    }
    function isAction(thing) {
      return isFunction(thing) && thing.isMobxAction === true;
    }

    /**
     * Creates a named reactive view and keeps it alive, so that the view is always
     * updated if one of the dependencies changes, even when the view is not further used by something else.
     * @param view The reactive view
     * @returns disposer function, which can be used to stop the view from being updated in the future.
     */

    function autorun(view, opts) {
      var _opts$name, _opts;

      if (opts === void 0) {
        opts = EMPTY_OBJECT$1;
      }

      var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : "Autorun";
      var runSync = !opts.scheduler && !opts.delay;
      var reaction;

      if (runSync) {
        // normal autorun
        reaction = new Reaction(name, function () {
          this.track(reactionRunner);
        }, opts.onError, opts.requiresObservable);
      } else {
        var scheduler = createSchedulerFromOptions(opts); // debounced autorun

        var isScheduled = false;
        reaction = new Reaction(name, function () {
          if (!isScheduled) {
            isScheduled = true;
            scheduler(function () {
              isScheduled = false;

              if (!reaction.isDisposed_) {
                reaction.track(reactionRunner);
              }
            });
          }
        }, opts.onError, opts.requiresObservable);
      }

      function reactionRunner() {
        view(reaction);
      }

      reaction.schedule_();
      return reaction.getDisposer_();
    }

    var run = function run(f) {
      return f();
    };

    function createSchedulerFromOptions(opts) {
      return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
        return setTimeout(f, opts.delay);
      } : run;
    }

    function reaction(expression, effect, opts) {
      var _opts$name2;

      if (opts === void 0) {
        opts = EMPTY_OBJECT$1;
      }

      var name = (_opts$name2 = opts.name) != null ? _opts$name2 : "Reaction";
      var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
      var runSync = !opts.scheduler && !opts.delay;
      var scheduler = createSchedulerFromOptions(opts);
      var firstTime = true;
      var isScheduled = false;
      var value;
      var oldValue;
      var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer["default"];
      var r = new Reaction(name, function () {
        if (firstTime || runSync) {
          reactionRunner();
        } else if (!isScheduled) {
          isScheduled = true;
          scheduler(reactionRunner);
        }
      }, opts.onError, opts.requiresObservable);

      function reactionRunner() {
        isScheduled = false;

        if (r.isDisposed_) {
          return;
        }

        var changed = false;
        r.track(function () {
          var nextValue = allowStateChanges(false, function () {
            return expression(r);
          });
          changed = firstTime || !equals(value, nextValue);
          oldValue = value;
          value = nextValue;
        });

        if (firstTime && opts.fireImmediately) {
          effectAction(value, oldValue, r);
        } else if (!firstTime && changed) {
          effectAction(value, oldValue, r);
        }

        firstTime = false;
      }

      r.schedule_();
      return r.getDisposer_();
    }

    function wrapErrorHandler(errorHandler, baseFn) {
      return function () {
        try {
          return baseFn.apply(this, arguments);
        } catch (e) {
          errorHandler.call(this, e);
        }
      };
    }

    var ON_BECOME_OBSERVED = "onBO";
    var ON_BECOME_UNOBSERVED = "onBUO";
    function onBecomeObserved(thing, arg2, arg3) {
      return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
    }
    function onBecomeUnobserved(thing, arg2, arg3) {
      return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
    }

    function interceptHook(hook, thing, arg2, arg3) {
      var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
      var cb = isFunction(arg3) ? arg3 : arg2;
      var listenersKey = hook + "L";

      if (atom[listenersKey]) {
        atom[listenersKey].add(cb);
      } else {
        atom[listenersKey] = new Set([cb]);
      }

      return function () {
        var hookListeners = atom[listenersKey];

        if (hookListeners) {
          hookListeners["delete"](cb);

          if (hookListeners.size === 0) {
            delete atom[listenersKey];
          }
        }
      };
    }

    function extendObservable(target, properties, annotations, options) {


      var descriptors = getOwnPropertyDescriptors(properties);
      var adm = asObservableObject(target, options)[$mobx];
      startBatch();

      try {
        ownKeys(descriptors).forEach(function (key) {
          adm.extend_(key, descriptors[key], // must pass "undefined" for { key: undefined }
          !annotations ? true : key in annotations ? annotations[key] : true);
        });
      } finally {
        endBatch();
      }

      return target;
    }

    var generatorId = 0;
    function FlowCancellationError() {
      this.message = "FLOW_CANCELLED";
    }
    FlowCancellationError.prototype = /*#__PURE__*/Object.create(Error.prototype);
    var flowAnnotation = /*#__PURE__*/createFlowAnnotation("flow");
    var flowBoundAnnotation = /*#__PURE__*/createFlowAnnotation("flow.bound", {
      bound: true
    });
    var flow = /*#__PURE__*/Object.assign(function flow(arg1, arg2) {
      // @flow
      if (isStringish(arg2)) {
        return storeAnnotation(arg1, arg2, flowAnnotation);
      } // flow(fn)

      var generator = arg1;
      var name = generator.name || "<unnamed flow>"; // Implementation based on https://github.com/tj/co/blob/master/index.js

      var res = function res() {
        var ctx = this;
        var args = arguments;
        var runId = ++generatorId;
        var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
        var rejector;
        var pendingPromise = undefined;
        var promise = new Promise(function (resolve, reject) {
          var stepId = 0;
          rejector = reject;

          function onFulfilled(res) {
            pendingPromise = undefined;
            var ret;

            try {
              ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
            } catch (e) {
              return reject(e);
            }

            next(ret);
          }

          function onRejected(err) {
            pendingPromise = undefined;
            var ret;

            try {
              ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
            } catch (e) {
              return reject(e);
            }

            next(ret);
          }

          function next(ret) {
            if (isFunction(ret == null ? void 0 : ret.then)) {
              // an async iterator
              ret.then(next, reject);
              return;
            }

            if (ret.done) {
              return resolve(ret.value);
            }

            pendingPromise = Promise.resolve(ret.value);
            return pendingPromise.then(onFulfilled, onRejected);
          }

          onFulfilled(undefined); // kick off the process
        });
        promise.cancel = action(name + " - runid: " + runId + " - cancel", function () {
          try {
            if (pendingPromise) {
              cancelPromise(pendingPromise);
            } // Finally block can return (or yield) stuff..


            var _res = gen["return"](undefined); // eat anything that promise would do, it's cancelled!


            var yieldedPromise = Promise.resolve(_res.value);
            yieldedPromise.then(noop, noop);
            cancelPromise(yieldedPromise); // maybe it can be cancelled :)
            // reject our original promise

            rejector(new FlowCancellationError());
          } catch (e) {
            rejector(e); // there could be a throwing finally block
          }
        });
        return promise;
      };

      res.isMobXFlow = true;
      return res;
    }, flowAnnotation);
    flow.bound = /*#__PURE__*/createDecoratorAnnotation(flowBoundAnnotation);

    function cancelPromise(promise) {
      if (isFunction(promise.cancel)) {
        promise.cancel();
      }
    }
    function isFlow(fn) {
      return (fn == null ? void 0 : fn.isMobXFlow) === true;
    }

    function interceptReads(thing, propOrHandler, handler) {
      var target;

      if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing);
      } else if (isObservableObject(thing)) {

        target = getAdministration(thing, propOrHandler);
      } else ;

      target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
      return function () {
        target.dehancer = undefined;
      };
    }

    function intercept(thing, propOrHandler, handler) {
      if (isFunction(handler)) {
        return interceptProperty(thing, propOrHandler, handler);
      } else {
        return interceptInterceptable(thing, propOrHandler);
      }
    }

    function interceptInterceptable(thing, handler) {
      return getAdministration(thing).intercept_(handler);
    }

    function interceptProperty(thing, property, handler) {
      return getAdministration(thing, property).intercept_(handler);
    }

    function _isObservable(value, property) {
      if (!value) {
        return false;
      }

      if (property !== undefined) {

        if (isObservableObject(value)) {
          return value[$mobx].values_.has(property);
        }

        return false;
      } // For first check, see #701


      return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
    }

    function isObservable(value) {

      return _isObservable(value);
    }

    function keys(obj) {
      if (isObservableObject(obj)) {
        return obj[$mobx].keys_();
      }

      if (isObservableMap(obj) || isObservableSet(obj)) {
        return Array.from(obj.keys());
      }

      if (isObservableArray(obj)) {
        return obj.map(function (_, index) {
          return index;
        });
      }

      die(5);
    }
    function values(obj) {
      if (isObservableObject(obj)) {
        return keys(obj).map(function (key) {
          return obj[key];
        });
      }

      if (isObservableMap(obj)) {
        return keys(obj).map(function (key) {
          return obj.get(key);
        });
      }

      if (isObservableSet(obj)) {
        return Array.from(obj.values());
      }

      if (isObservableArray(obj)) {
        return obj.slice();
      }

      die(6);
    }
    function entries(obj) {
      if (isObservableObject(obj)) {
        return keys(obj).map(function (key) {
          return [key, obj[key]];
        });
      }

      if (isObservableMap(obj)) {
        return keys(obj).map(function (key) {
          return [key, obj.get(key)];
        });
      }

      if (isObservableSet(obj)) {
        return Array.from(obj.entries());
      }

      if (isObservableArray(obj)) {
        return obj.map(function (key, index) {
          return [index, key];
        });
      }

      die(7);
    }
    function set(obj, key, value) {
      if (arguments.length === 2 && !isObservableSet(obj)) {
        startBatch();
        var _values = key;

        try {
          for (var _key in _values) {
            set(obj, _key, _values[_key]);
          }
        } finally {
          endBatch();
        }

        return;
      }

      if (isObservableObject(obj)) {
        obj[$mobx].set_(key, value);
      } else if (isObservableMap(obj)) {
        obj.set(key, value);
      } else if (isObservableSet(obj)) {
        obj.add(key);
      } else if (isObservableArray(obj)) {
        if (typeof key !== "number") {
          key = parseInt(key, 10);
        }

        if (key < 0) {
          die("Invalid index: '" + key + "'");
        }

        startBatch();

        if (key >= obj.length) {
          obj.length = key + 1;
        }

        obj[key] = value;
        endBatch();
      } else {
        die(8);
      }
    }
    function apiDefineProperty(obj, key, descriptor) {
      if (isObservableObject(obj)) {
        return obj[$mobx].defineProperty_(key, descriptor);
      }

      die(39);
    }

    function observe(thing, propOrCb, cbOrFire, fireImmediately) {
      if (isFunction(cbOrFire)) {
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
      } else {
        return observeObservable(thing, propOrCb, cbOrFire);
      }
    }

    function observeObservable(thing, listener, fireImmediately) {
      return getAdministration(thing).observe_(listener, fireImmediately);
    }

    function observeObservableProperty(thing, property, listener, fireImmediately) {
      return getAdministration(thing, property).observe_(listener, fireImmediately);
    }

    function trace() {
      {
        die("trace() is not available in production builds");
      }

      var enterBreakPoint = false;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof args[args.length - 1] === "boolean") {
        enterBreakPoint = args.pop();
      }

      var derivation = getAtomFromArgs(args);

      if (!derivation) {
        return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
      }

      if (derivation.isTracing_ === TraceMode.NONE) {
        console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
      }

      derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
    }

    function getAtomFromArgs(args) {
      switch (args.length) {
        case 0:
          return globalState.trackingDerivation;

        case 1:
          return getAtom(args[0]);

        case 2:
          return getAtom(args[0], args[1]);
      }
    }

    /**
     * During a transaction no views are updated until the end of the transaction.
     * The transaction will be run synchronously nonetheless.
     *
     * @param action a function that updates some reactive state
     * @returns any value that was returned by the 'action' parameter.
     */

    function transaction(action, thisArg) {
      if (thisArg === void 0) {
        thisArg = undefined;
      }

      startBatch();

      try {
        return action.apply(thisArg);
      } finally {
        endBatch();
      }
    }

    function getAdm(target) {
      return target[$mobx];
    } // Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
    // and skip either the internal values map, or the base object with its property descriptors!


    var objectProxyTraps = {
      has: function has(target, name) {

        return getAdm(target).has_(name);
      },
      get: function get(target, name) {
        return getAdm(target).get_(name);
      },
      set: function set(target, name, value) {
        var _getAdm$set_;

        if (!isStringish(name)) {
          return false;
        }


        return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
      },
      deleteProperty: function deleteProperty(target, name) {
        var _getAdm$delete_;

        if (!isStringish(name)) {
          return false;
        } // null (intercepted) -> true (success)


        return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
      },
      defineProperty: function defineProperty(target, name, descriptor) {
        var _getAdm$definePropert;


        return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
      },
      ownKeys: function ownKeys(target) {

        return getAdm(target).ownKeys_();
      },
      preventExtensions: function preventExtensions(target) {
        die(13);
      }
    };
    function asDynamicObservableObject(target, options) {
      var _target$$mobx, _target$$mobx$proxy_;

      assertProxies();
      target = asObservableObject(target, options);
      return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
    }

    function hasInterceptors(interceptable) {
      return interceptable.interceptors_ !== undefined && interceptable.interceptors_.length > 0;
    }
    function registerInterceptor(interceptable, handler) {
      var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
      interceptors.push(handler);
      return once(function () {
        var idx = interceptors.indexOf(handler);

        if (idx !== -1) {
          interceptors.splice(idx, 1);
        }
      });
    }
    function interceptChange(interceptable, change) {
      var prevU = untrackedStart();

      try {
        // Interceptor can modify the array, copy it to avoid concurrent modification, see #1950
        var interceptors = [].concat(interceptable.interceptors_ || []);

        for (var i = 0, l = interceptors.length; i < l; i++) {
          change = interceptors[i](change);

          if (change && !change.type) {
            die(14);
          }

          if (!change) {
            break;
          }
        }

        return change;
      } finally {
        untrackedEnd(prevU);
      }
    }

    function hasListeners(listenable) {
      return listenable.changeListeners_ !== undefined && listenable.changeListeners_.length > 0;
    }
    function registerListener(listenable, handler) {
      var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
      listeners.push(handler);
      return once(function () {
        var idx = listeners.indexOf(handler);

        if (idx !== -1) {
          listeners.splice(idx, 1);
        }
      });
    }
    function notifyListeners(listenable, change) {
      var prevU = untrackedStart();
      var listeners = listenable.changeListeners_;

      if (!listeners) {
        return;
      }

      listeners = listeners.slice();

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
      }

      untrackedEnd(prevU);
    }

    function makeObservable(target, annotations, options) {
      var adm = asObservableObject(target, options)[$mobx];
      startBatch();

      try {
        var _annotations;

        if ("production" !== "production" && annotations && target[storedAnnotationsSymbol]) ; // Default to decorators


        (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target); // Annotate

        ownKeys(annotations).forEach(function (key) {
          return adm.make_(key, annotations[key]);
        });
      } finally {
        endBatch();
      }

      return target;
    } // proto[keysSymbol] = new Set<PropertyKey>()

    var SPLICE = "splice";
    var UPDATE = "update";
    var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859

    var arrayTraps = {
      get: function get(target, name) {
        var adm = target[$mobx];

        if (name === $mobx) {
          return adm;
        }

        if (name === "length") {
          return adm.getArrayLength_();
        }

        if (typeof name === "string" && !isNaN(name)) {
          return adm.get_(parseInt(name));
        }

        if (hasProp(arrayExtensions, name)) {
          return arrayExtensions[name];
        }

        return target[name];
      },
      set: function set(target, name, value) {
        var adm = target[$mobx];

        if (name === "length") {
          adm.setArrayLength_(value);
        }

        if (typeof name === "symbol" || isNaN(name)) {
          target[name] = value;
        } else {
          // numeric string
          adm.set_(parseInt(name), value);
        }

        return true;
      },
      preventExtensions: function preventExtensions() {
        die(15);
      }
    };
    var ObservableArrayAdministration = /*#__PURE__*/function () {
      // this is the prop that gets proxied, so can't replace it!
      function ObservableArrayAdministration(name, enhancer, owned_, legacyMode_) {
        if (name === void 0) {
          name = "ObservableArray";
        }

        this.owned_ = void 0;
        this.legacyMode_ = void 0;
        this.atom_ = void 0;
        this.values_ = [];
        this.interceptors_ = void 0;
        this.changeListeners_ = void 0;
        this.enhancer_ = void 0;
        this.dehancer = void 0;
        this.proxy_ = void 0;
        this.lastKnownLength_ = 0;
        this.owned_ = owned_;
        this.legacyMode_ = legacyMode_;
        this.atom_ = new Atom(name);

        this.enhancer_ = function (newV, oldV) {
          return enhancer(newV, oldV, "ObservableArray[..]");
        };
      }

      var _proto = ObservableArrayAdministration.prototype;

      _proto.dehanceValue_ = function dehanceValue_(value) {
        if (this.dehancer !== undefined) {
          return this.dehancer(value);
        }

        return value;
      };

      _proto.dehanceValues_ = function dehanceValues_(values) {
        if (this.dehancer !== undefined && values.length > 0) {
          return values.map(this.dehancer);
        }

        return values;
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {
        if (fireImmediately === void 0) {
          fireImmediately = false;
        }

        if (fireImmediately) {
          listener({
            observableKind: "array",
            object: this.proxy_,
            debugObjectName: this.atom_.name_,
            type: "splice",
            index: 0,
            added: this.values_.slice(),
            addedCount: this.values_.length,
            removed: [],
            removedCount: 0
          });
        }

        return registerListener(this, listener);
      };

      _proto.getArrayLength_ = function getArrayLength_() {
        this.atom_.reportObserved();
        return this.values_.length;
      };

      _proto.setArrayLength_ = function setArrayLength_(newLength) {
        if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
          die("Out of range: " + newLength);
        }

        var currentLength = this.values_.length;

        if (newLength === currentLength) {
          return;
        } else if (newLength > currentLength) {
          var newItems = new Array(newLength - currentLength);

          for (var i = 0; i < newLength - currentLength; i++) {
            newItems[i] = undefined;
          } // No Array.fill everywhere...


          this.spliceWithArray_(currentLength, 0, newItems);
        } else {
          this.spliceWithArray_(newLength, currentLength - newLength);
        }
      };

      _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
        if (oldLength !== this.lastKnownLength_) {
          die(16);
        }

        this.lastKnownLength_ += delta;

        if (this.legacyMode_ && delta > 0) {
          reserveArrayBuffer(oldLength + delta + 1);
        }
      };

      _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
        var _this = this;

        checkIfStateModificationsAreAllowed(this.atom_);
        var length = this.values_.length;

        if (index === undefined) {
          index = 0;
        } else if (index > length) {
          index = length;
        } else if (index < 0) {
          index = Math.max(0, length + index);
        }

        if (arguments.length === 1) {
          deleteCount = length - index;
        } else if (deleteCount === undefined || deleteCount === null) {
          deleteCount = 0;
        } else {
          deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        }

        if (newItems === undefined) {
          newItems = EMPTY_ARRAY$1;
        }

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_,
            type: SPLICE,
            index: index,
            removedCount: deleteCount,
            added: newItems
          });

          if (!change) {
            return EMPTY_ARRAY$1;
          }

          deleteCount = change.removedCount;
          newItems = change.added;
        }

        newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
          return _this.enhancer_(v, undefined);
        });

        if (this.legacyMode_ || "production" !== "production") {
          var lengthDelta = newItems.length - deleteCount;
          this.updateArrayLength_(length, lengthDelta); // checks if internal array wasn't modified
        }

        var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);

        if (deleteCount !== 0 || newItems.length !== 0) {
          this.notifyArraySplice_(index, newItems, res);
        }

        return this.dehanceValues_(res);
      };

      _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
        if (newItems.length < MAX_SPLICE_SIZE) {
          var _this$values_;

          return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
        } else {
          // The items removed by the splice
          var res = this.values_.slice(index, index + deleteCount); // The items that that should remain at the end of the array

          var oldItems = this.values_.slice(index + deleteCount); // New length is the previous length + addition count - deletion count

          this.values_.length += newItems.length - deleteCount;

          for (var i = 0; i < newItems.length; i++) {
            this.values_[index + i] = newItems[i];
          }

          for (var _i = 0; _i < oldItems.length; _i++) {
            this.values_[index + newItems.length + _i] = oldItems[_i];
          }

          return res;
        }
      };

      _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
        var notifySpy = !this.owned_ && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "array",
          object: this.proxy_,
          type: UPDATE,
          debugObjectName: this.atom_.name_,
          index: index,
          newValue: newValue,
          oldValue: oldValue
        } : null; // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't

        this.atom_.reportChanged();

        if (notify) {
          notifyListeners(this, change);
        }
      };

      _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
        var notifySpy = !this.owned_ && isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: SPLICE,
          index: index,
          removed: removed,
          added: added,
          removedCount: removed.length,
          addedCount: added.length
        } : null;

        this.atom_.reportChanged(); // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe

        if (notify) {
          notifyListeners(this, change);
        }
      };

      _proto.get_ = function get_(index) {
        if (index < this.values_.length) {
          this.atom_.reportObserved();
          return this.dehanceValue_(this.values_[index]);
        }

        console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
      };

      _proto.set_ = function set_(index, newValue) {
        var values = this.values_;

        if (index < values.length) {
          // update at index in range
          checkIfStateModificationsAreAllowed(this.atom_);
          var oldValue = values[index];

          if (hasInterceptors(this)) {
            var change = interceptChange(this, {
              type: UPDATE,
              object: this.proxy_,
              index: index,
              newValue: newValue
            });

            if (!change) {
              return;
            }

            newValue = change.newValue;
          }

          newValue = this.enhancer_(newValue, oldValue);
          var changed = newValue !== oldValue;

          if (changed) {
            values[index] = newValue;
            this.notifyArrayChildUpdate_(index, newValue, oldValue);
          }
        } else if (index === values.length) {
          // add a new item
          this.spliceWithArray_(index, 0, [newValue]);
        } else {
          // out of bounds
          die(17, index, values.length);
        }
      };

      return ObservableArrayAdministration;
    }();
    function createObservableArray(initialValues, enhancer, name, owned) {
      if (name === void 0) {
        name = "ObservableArray";
      }

      if (owned === void 0) {
        owned = false;
      }

      assertProxies();
      var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
      addHiddenFinalProp$1(adm.values_, $mobx, adm);
      var proxy = new Proxy(adm.values_, arrayTraps);
      adm.proxy_ = proxy;

      if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart(true);
        adm.spliceWithArray_(0, 0, initialValues);
        allowStateChangesEnd(prev);
      }

      return proxy;
    } // eslint-disable-next-line

    var arrayExtensions = {
      clear: function clear() {
        return this.splice(0);
      },
      replace: function replace(newItems) {
        var adm = this[$mobx];
        return adm.spliceWithArray_(0, adm.values_.length, newItems);
      },
      // Used by JSON.stringify
      toJSON: function toJSON() {
        return this.slice();
      },

      /*
       * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
       * since these functions alter the inner structure of the array, the have side effects.
       * Because the have side effects, they should not be used in computed function,
       * and for that reason the do not call dependencyState.notifyObserved
       */
      splice: function splice(index, deleteCount) {
        for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          newItems[_key - 2] = arguments[_key];
        }

        var adm = this[$mobx];

        switch (arguments.length) {
          case 0:
            return [];

          case 1:
            return adm.spliceWithArray_(index);

          case 2:
            return adm.spliceWithArray_(index, deleteCount);
        }

        return adm.spliceWithArray_(index, deleteCount, newItems);
      },
      spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
        return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
      },
      push: function push() {
        var adm = this[$mobx];

        for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        adm.spliceWithArray_(adm.values_.length, 0, items);
        return adm.values_.length;
      },
      pop: function pop() {
        return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
      },
      shift: function shift() {
        return this.splice(0, 1)[0];
      },
      unshift: function unshift() {
        var adm = this[$mobx];

        for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          items[_key3] = arguments[_key3];
        }

        adm.spliceWithArray_(0, 0, items);
        return adm.values_.length;
      },
      reverse: function reverse() {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        if (globalState.trackingDerivation) {
          die(37, "reverse");
        }

        this.replace(this.slice().reverse());
        return this;
      },
      sort: function sort() {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        if (globalState.trackingDerivation) {
          die(37, "sort");
        }

        var copy = this.slice();
        copy.sort.apply(copy, arguments);
        this.replace(copy);
        return this;
      },
      remove: function remove(value) {
        var adm = this[$mobx];
        var idx = adm.dehanceValues_(adm.values_).indexOf(value);

        if (idx > -1) {
          this.splice(idx, 1);
          return true;
        }

        return false;
      }
    };
    /**
     * Wrap function from prototype
     * Without this, everything works as well, but this works
     * faster as everything works on unproxied values
     */

    addArrayExtension("concat", simpleFunc);
    addArrayExtension("flat", simpleFunc);
    addArrayExtension("includes", simpleFunc);
    addArrayExtension("indexOf", simpleFunc);
    addArrayExtension("join", simpleFunc);
    addArrayExtension("lastIndexOf", simpleFunc);
    addArrayExtension("slice", simpleFunc);
    addArrayExtension("toString", simpleFunc);
    addArrayExtension("toLocaleString", simpleFunc); // map

    addArrayExtension("every", mapLikeFunc);
    addArrayExtension("filter", mapLikeFunc);
    addArrayExtension("find", mapLikeFunc);
    addArrayExtension("findIndex", mapLikeFunc);
    addArrayExtension("flatMap", mapLikeFunc);
    addArrayExtension("forEach", mapLikeFunc);
    addArrayExtension("map", mapLikeFunc);
    addArrayExtension("some", mapLikeFunc); // reduce

    addArrayExtension("reduce", reduceLikeFunc);
    addArrayExtension("reduceRight", reduceLikeFunc);

    function addArrayExtension(funcName, funcFactory) {
      if (typeof Array.prototype[funcName] === "function") {
        arrayExtensions[funcName] = funcFactory(funcName);
      }
    } // Report and delegate to dehanced array


    function simpleFunc(funcName) {
      return function () {
        var adm = this[$mobx];
        adm.atom_.reportObserved();
        var dehancedValues = adm.dehanceValues_(adm.values_);
        return dehancedValues[funcName].apply(dehancedValues, arguments);
      };
    } // Make sure callbacks recieve correct array arg #2326


    function mapLikeFunc(funcName) {
      return function (callback, thisArg) {
        var _this2 = this;

        var adm = this[$mobx];
        adm.atom_.reportObserved();
        var dehancedValues = adm.dehanceValues_(adm.values_);
        return dehancedValues[funcName](function (element, index) {
          return callback.call(thisArg, element, index, _this2);
        });
      };
    } // Make sure callbacks recieve correct array arg #2326


    function reduceLikeFunc(funcName) {
      return function () {
        var _this3 = this;

        var adm = this[$mobx];
        adm.atom_.reportObserved();
        var dehancedValues = adm.dehanceValues_(adm.values_); // #2432 - reduce behavior depends on arguments.length

        var callback = arguments[0];

        arguments[0] = function (accumulator, currentValue, index) {
          return callback(accumulator, currentValue, index, _this3);
        };

        return dehancedValues[funcName].apply(dehancedValues, arguments);
      };
    }

    var isObservableArrayAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
    function isObservableArray(thing) {
      return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
    }

    var _Symbol$iterator, _Symbol$toStringTag;
    var ObservableMapMarker = {};
    var ADD = "add";
    var DELETE = "delete"; // just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
    // But: https://github.com/mobxjs/mobx/issues/1556

    _Symbol$iterator = Symbol.iterator;
    _Symbol$toStringTag = Symbol.toStringTag;
    var ObservableMap = /*#__PURE__*/function (_Symbol$iterator2, _Symbol$toStringTag2) {
      // hasMap, not hashMap >-).
      function ObservableMap(initialData, enhancer_, name_) {
        var _this = this;

        if (enhancer_ === void 0) {
          enhancer_ = deepEnhancer;
        }

        if (name_ === void 0) {
          name_ = "ObservableMap";
        }

        this.enhancer_ = void 0;
        this.name_ = void 0;
        this[$mobx] = ObservableMapMarker;
        this.data_ = void 0;
        this.hasMap_ = void 0;
        this.keysAtom_ = void 0;
        this.interceptors_ = void 0;
        this.changeListeners_ = void 0;
        this.dehancer = void 0;
        this.enhancer_ = enhancer_;
        this.name_ = name_;

        if (!isFunction(Map)) {
          die(18);
        }

        this.keysAtom_ = createAtom("ObservableMap.keys()");
        this.data_ = new Map();
        this.hasMap_ = new Map();
        allowStateChanges(true, function () {
          _this.merge(initialData);
        });
      }

      var _proto = ObservableMap.prototype;

      _proto.has_ = function has_(key) {
        return this.data_.has(key);
      };

      _proto.has = function has(key) {
        var _this2 = this;

        if (!globalState.trackingDerivation) {
          return this.has_(key);
        }

        var entry = this.hasMap_.get(key);

        if (!entry) {
          var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, "ObservableMap.key?", false);
          this.hasMap_.set(key, newEntry);
          onBecomeUnobserved(newEntry, function () {
            return _this2.hasMap_["delete"](key);
          });
        }

        return entry.get();
      };

      _proto.set = function set(key, value) {
        var hasKey = this.has_(key);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: hasKey ? UPDATE : ADD,
            object: this,
            newValue: value,
            name: key
          });

          if (!change) {
            return this;
          }

          value = change.newValue;
        }

        if (hasKey) {
          this.updateValue_(key, value);
        } else {
          this.addValue_(key, value);
        }

        return this;
      };

      _proto["delete"] = function _delete(key) {
        var _this3 = this;

        checkIfStateModificationsAreAllowed(this.keysAtom_);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: DELETE,
            object: this,
            name: key
          });

          if (!change) {
            return false;
          }
        }

        if (this.has_(key)) {
          var notifySpy = isSpyEnabled();
          var notify = hasListeners(this);

          var _change = notify || notifySpy ? {
            observableKind: "map",
            debugObjectName: this.name_,
            type: DELETE,
            object: this,
            oldValue: this.data_.get(key).value_,
            name: key
          } : null;


          transaction(function () {
            var _this3$hasMap_$get;

            _this3.keysAtom_.reportChanged();

            (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null ? void 0 : _this3$hasMap_$get.setNewValue_(false);

            var observable = _this3.data_.get(key);

            observable.setNewValue_(undefined);

            _this3.data_["delete"](key);
          });

          if (notify) {
            notifyListeners(this, _change);
          }

          return true;
        }

        return false;
      };

      _proto.updateValue_ = function updateValue_(key, newValue) {
        var observable = this.data_.get(key);
        newValue = observable.prepareNewValue_(newValue);

        if (newValue !== globalState.UNCHANGED) {
          var notifySpy = isSpyEnabled();
          var notify = hasListeners(this);
          var change = notify || notifySpy ? {
            observableKind: "map",
            debugObjectName: this.name_,
            type: UPDATE,
            object: this,
            oldValue: observable.value_,
            name: key,
            newValue: newValue
          } : null;


          observable.setNewValue_(newValue);

          if (notify) {
            notifyListeners(this, change);
          }
        }
      };

      _proto.addValue_ = function addValue_(key, newValue) {
        var _this4 = this;

        checkIfStateModificationsAreAllowed(this.keysAtom_);
        transaction(function () {
          var _this4$hasMap_$get;

          var observable = new ObservableValue(newValue, _this4.enhancer_, "ObservableMap.key", false);

          _this4.data_.set(key, observable);

          newValue = observable.value_; // value might have been changed

          (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null ? void 0 : _this4$hasMap_$get.setNewValue_(true);

          _this4.keysAtom_.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          name: key,
          newValue: newValue
        } : null;


        if (notify) {
          notifyListeners(this, change);
        }
      };

      _proto.get = function get(key) {
        if (this.has(key)) {
          return this.dehanceValue_(this.data_.get(key).get());
        }

        return this.dehanceValue_(undefined);
      };

      _proto.dehanceValue_ = function dehanceValue_(value) {
        if (this.dehancer !== undefined) {
          return this.dehancer(value);
        }

        return value;
      };

      _proto.keys = function keys() {
        this.keysAtom_.reportObserved();
        return this.data_.keys();
      };

      _proto.values = function values() {
        var self = this;
        var keys = this.keys();
        return makeIterable({
          next: function next() {
            var _keys$next = keys.next(),
                done = _keys$next.done,
                value = _keys$next.value;

            return {
              done: done,
              value: done ? undefined : self.get(value)
            };
          }
        });
      };

      _proto.entries = function entries() {
        var self = this;
        var keys = this.keys();
        return makeIterable({
          next: function next() {
            var _keys$next2 = keys.next(),
                done = _keys$next2.done,
                value = _keys$next2.value;

            return {
              done: done,
              value: done ? undefined : [value, self.get(value)]
            };
          }
        });
      };

      _proto[_Symbol$iterator2] = function () {
        return this.entries();
      };

      _proto.forEach = function forEach(callback, thisArg) {
        for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
              key = _step$value[0],
              value = _step$value[1];
          callback.call(thisArg, value, key, this);
        }
      }
      /** Merge another object into this object, returns this. */
      ;

      _proto.merge = function merge(other) {
        var _this5 = this;

        if (isObservableMap(other)) {
          other = new Map(other);
        }

        transaction(function () {
          if (isPlainObject$1(other)) {
            getPlainObjectKeys(other).forEach(function (key) {
              return _this5.set(key, other[key]);
            });
          } else if (Array.isArray(other)) {
            other.forEach(function (_ref) {
              var key = _ref[0],
                  value = _ref[1];
              return _this5.set(key, value);
            });
          } else if (isES6Map(other)) {
            if (other.constructor !== Map) {
              die(19, other);
            }

            other.forEach(function (value, key) {
              return _this5.set(key, value);
            });
          } else if (other !== null && other !== undefined) {
            die(20, other);
          }
        });
        return this;
      };

      _proto.clear = function clear() {
        var _this6 = this;

        transaction(function () {
          untracked(function () {
            for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done;) {
              var key = _step2.value;

              _this6["delete"](key);
            }
          });
        });
      };

      _proto.replace = function replace(values) {
        var _this7 = this;

        // Implementation requirements:
        // - respect ordering of replacement map
        // - allow interceptors to run and potentially prevent individual operations
        // - don't recreate observables that already exist in original map (so we don't destroy existing subscriptions)
        // - don't _keysAtom.reportChanged if the keys of resulting map are indentical (order matters!)
        // - note that result map may differ from replacement map due to the interceptors
        transaction(function () {
          // Convert to map so we can do quick key lookups
          var replacementMap = convertToMap(values);
          var orderedData = new Map(); // Used for optimization

          var keysReportChangedCalled = false; // Delete keys that don't exist in replacement map
          // if the key deletion is prevented by interceptor
          // add entry at the beginning of the result map

          for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done;) {
            var key = _step3.value;

            // Concurrently iterating/deleting keys
            // iterator should handle this correctly
            if (!replacementMap.has(key)) {
              var deleted = _this7["delete"](key); // Was the key removed?


              if (deleted) {
                // _keysAtom.reportChanged() was already called
                keysReportChangedCalled = true;
              } else {
                // Delete prevented by interceptor
                var value = _this7.data_.get(key);

                orderedData.set(key, value);
              }
            }
          } // Merge entries


          for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done;) {
            var _step4$value = _step4.value,
                _key = _step4$value[0],
                _value = _step4$value[1];

            // We will want to know whether a new key is added
            var keyExisted = _this7.data_.has(_key); // Add or update value


            _this7.set(_key, _value); // The addition could have been prevent by interceptor


            if (_this7.data_.has(_key)) {
              // The update could have been prevented by interceptor
              // and also we want to preserve existing values
              // so use value from _data map (instead of replacement map)
              var _value2 = _this7.data_.get(_key);

              orderedData.set(_key, _value2); // Was a new key added?

              if (!keyExisted) {
                // _keysAtom.reportChanged() was already called
                keysReportChangedCalled = true;
              }
            }
          } // Check for possible key order change


          if (!keysReportChangedCalled) {
            if (_this7.data_.size !== orderedData.size) {
              // If size differs, keys are definitely modified
              _this7.keysAtom_.reportChanged();
            } else {
              var iter1 = _this7.data_.keys();

              var iter2 = orderedData.keys();
              var next1 = iter1.next();
              var next2 = iter2.next();

              while (!next1.done) {
                if (next1.value !== next2.value) {
                  _this7.keysAtom_.reportChanged();

                  break;
                }

                next1 = iter1.next();
                next2 = iter2.next();
              }
            }
          } // Use correctly ordered map


          _this7.data_ = orderedData;
        });
        return this;
      };

      _proto.toString = function toString() {
        return "[object ObservableMap]";
      };

      _proto.toJSON = function toJSON() {
        return Array.from(this);
      };

      /**
       * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
       * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
       * for callback details
       */
      _proto.observe_ = function observe_(listener, fireImmediately) {

        return registerListener(this, listener);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _createClass(ObservableMap, [{
        key: "size",
        get: function get() {
          this.keysAtom_.reportObserved();
          return this.data_.size;
        }
      }, {
        key: _Symbol$toStringTag2,
        get: function get() {
          return "Map";
        }
      }]);

      return ObservableMap;
    }(_Symbol$iterator, _Symbol$toStringTag); // eslint-disable-next-line

    var isObservableMap = /*#__PURE__*/createInstanceofPredicate("ObservableMap", ObservableMap);

    function convertToMap(dataStructure) {
      if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
        return dataStructure;
      } else if (Array.isArray(dataStructure)) {
        return new Map(dataStructure);
      } else if (isPlainObject$1(dataStructure)) {
        var map = new Map();

        for (var key in dataStructure) {
          map.set(key, dataStructure[key]);
        }

        return map;
      } else {
        return die(21, dataStructure);
      }
    }

    var _Symbol$iterator$1, _Symbol$toStringTag$1;
    var ObservableSetMarker = {};
    _Symbol$iterator$1 = Symbol.iterator;
    _Symbol$toStringTag$1 = Symbol.toStringTag;
    var ObservableSet = /*#__PURE__*/function (_Symbol$iterator2, _Symbol$toStringTag2) {
      function ObservableSet(initialData, enhancer, name_) {
        if (enhancer === void 0) {
          enhancer = deepEnhancer;
        }

        if (name_ === void 0) {
          name_ = "ObservableSet";
        }

        this.name_ = void 0;
        this[$mobx] = ObservableSetMarker;
        this.data_ = new Set();
        this.atom_ = void 0;
        this.changeListeners_ = void 0;
        this.interceptors_ = void 0;
        this.dehancer = void 0;
        this.enhancer_ = void 0;
        this.name_ = name_;

        if (!isFunction(Set)) {
          die(22);
        }

        this.atom_ = createAtom(this.name_);

        this.enhancer_ = function (newV, oldV) {
          return enhancer(newV, oldV, name_);
        };

        if (initialData) {
          this.replace(initialData);
        }
      }

      var _proto = ObservableSet.prototype;

      _proto.dehanceValue_ = function dehanceValue_(value) {
        if (this.dehancer !== undefined) {
          return this.dehancer(value);
        }

        return value;
      };

      _proto.clear = function clear() {
        var _this = this;

        transaction(function () {
          untracked(function () {
            for (var _iterator = _createForOfIteratorHelperLoose(_this.data_.values()), _step; !(_step = _iterator()).done;) {
              var value = _step.value;

              _this["delete"](value);
            }
          });
        });
      };

      _proto.forEach = function forEach(callbackFn, thisArg) {
        for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done;) {
          var value = _step2.value;
          callbackFn.call(thisArg, value, value, this);
        }
      };

      _proto.add = function add(value) {
        var _this2 = this;

        checkIfStateModificationsAreAllowed(this.atom_);

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: ADD,
            object: this,
            newValue: value
          });

          if (!change) {
            return this;
          } // ideally, value = change.value would be done here, so that values can be
          // changed by interceptor. Same applies for other Set and Map api's.

        }

        if (!this.has(value)) {
          transaction(function () {
            _this2.data_.add(_this2.enhancer_(value, undefined));

            _this2.atom_.reportChanged();
          });
          var notifySpy = "production" !== "production" ;
          var notify = hasListeners(this);

          var _change = notify || notifySpy ? {
            observableKind: "set",
            debugObjectName: this.name_,
            type: ADD,
            object: this,
            newValue: value
          } : null;

          if (notify) {
            notifyListeners(this, _change);
          }
        }

        return this;
      };

      _proto["delete"] = function _delete(value) {
        var _this3 = this;

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: DELETE,
            object: this,
            oldValue: value
          });

          if (!change) {
            return false;
          }
        }

        if (this.has(value)) {
          var notifySpy = "production" !== "production" ;
          var notify = hasListeners(this);

          var _change2 = notify || notifySpy ? {
            observableKind: "set",
            debugObjectName: this.name_,
            type: DELETE,
            object: this,
            oldValue: value
          } : null;

          transaction(function () {
            _this3.atom_.reportChanged();

            _this3.data_["delete"](value);
          });

          if (notify) {
            notifyListeners(this, _change2);
          }

          return true;
        }

        return false;
      };

      _proto.has = function has(value) {
        this.atom_.reportObserved();
        return this.data_.has(this.dehanceValue_(value));
      };

      _proto.entries = function entries() {
        var nextIndex = 0;
        var keys = Array.from(this.keys());
        var values = Array.from(this.values());
        return makeIterable({
          next: function next() {
            var index = nextIndex;
            nextIndex += 1;
            return index < values.length ? {
              value: [keys[index], values[index]],
              done: false
            } : {
              done: true
            };
          }
        });
      };

      _proto.keys = function keys() {
        return this.values();
      };

      _proto.values = function values() {
        this.atom_.reportObserved();
        var self = this;
        var nextIndex = 0;
        var observableValues = Array.from(this.data_.values());
        return makeIterable({
          next: function next() {
            return nextIndex < observableValues.length ? {
              value: self.dehanceValue_(observableValues[nextIndex++]),
              done: false
            } : {
              done: true
            };
          }
        });
      };

      _proto.replace = function replace(other) {
        var _this4 = this;

        if (isObservableSet(other)) {
          other = new Set(other);
        }

        transaction(function () {
          if (Array.isArray(other)) {
            _this4.clear();

            other.forEach(function (value) {
              return _this4.add(value);
            });
          } else if (isES6Set(other)) {
            _this4.clear();

            other.forEach(function (value) {
              return _this4.add(value);
            });
          } else if (other !== null && other !== undefined) {
            die("Cannot initialize set from " + other);
          }
        });
        return this;
      };

      _proto.observe_ = function observe_(listener, fireImmediately) {

        return registerListener(this, listener);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.toJSON = function toJSON() {
        return Array.from(this);
      };

      _proto.toString = function toString() {
        return "[object ObservableSet]";
      };

      _proto[_Symbol$iterator2] = function () {
        return this.values();
      };

      _createClass(ObservableSet, [{
        key: "size",
        get: function get() {
          this.atom_.reportObserved();
          return this.data_.size;
        }
      }, {
        key: _Symbol$toStringTag2,
        get: function get() {
          return "Set";
        }
      }]);

      return ObservableSet;
    }(_Symbol$iterator$1, _Symbol$toStringTag$1); // eslint-disable-next-line

    var isObservableSet = /*#__PURE__*/createInstanceofPredicate("ObservableSet", ObservableSet);

    var descriptorCache = /*#__PURE__*/Object.create(null);
    var REMOVE = "remove";
    var ObservableObjectAdministration = /*#__PURE__*/function () {
      function ObservableObjectAdministration(target_, values_, name_, // Used anytime annotation is not explicitely provided
      defaultAnnotation_) {
        if (values_ === void 0) {
          values_ = new Map();
        }

        if (defaultAnnotation_ === void 0) {
          defaultAnnotation_ = autoAnnotation;
        }

        this.target_ = void 0;
        this.values_ = void 0;
        this.name_ = void 0;
        this.defaultAnnotation_ = void 0;
        this.keysAtom_ = void 0;
        this.changeListeners_ = void 0;
        this.interceptors_ = void 0;
        this.proxy_ = void 0;
        this.isPlainObject_ = void 0;
        this.appliedAnnotations_ = void 0;
        this.pendingKeys_ = void 0;
        this.target_ = target_;
        this.values_ = values_;
        this.name_ = name_;
        this.defaultAnnotation_ = defaultAnnotation_;
        this.keysAtom_ = new Atom("ObservableObject.keys"); // Optimization: we use this frequently

        this.isPlainObject_ = isPlainObject$1(this.target_);
      }

      var _proto = ObservableObjectAdministration.prototype;

      _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
        return this.values_.get(key).get();
      };

      _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
        var observable = this.values_.get(key);

        if (observable instanceof ComputedValue) {
          observable.set(newValue);
          return true;
        } // intercept


        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_ || this.target_,
            name: key,
            newValue: newValue
          });

          if (!change) {
            return null;
          }

          newValue = change.newValue;
        }

        newValue = observable.prepareNewValue_(newValue); // notify spy & observers

        if (newValue !== globalState.UNCHANGED) {
          var notify = hasListeners(this);
          var notifySpy = "production" !== "production" ;

          var _change = notify || notifySpy ? {
            type: UPDATE,
            observableKind: "object",
            debugObjectName: this.name_,
            object: this.proxy_ || this.target_,
            oldValue: observable.value_,
            name: key,
            newValue: newValue
          } : null;
          observable.setNewValue_(newValue);

          if (notify) {
            notifyListeners(this, _change);
          }
        }

        return true;
      };

      _proto.get_ = function get_(key) {
        if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
          // Key doesn't exist yet, subscribe for it in case it's added later
          this.has_(key);
        }

        return this.target_[key];
      }
      /**
       * @param {PropertyKey} key
       * @param {any} value
       * @param {Annotation|boolean} annotation true - use default annotation, false - copy as is
       * @param {boolean} proxyTrap whether it's called from proxy trap
       * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
       */
      ;

      _proto.set_ = function set_(key, value, proxyTrap) {
        if (proxyTrap === void 0) {
          proxyTrap = false;
        }

        // Don't use .has(key) - we care about own
        if (hasProp(this.target_, key)) {
          // Existing prop
          if (this.values_.has(key)) {
            // Observable (can be intercepted)
            return this.setObservablePropValue_(key, value);
          } else if (proxyTrap) {
            // Non-observable - proxy
            return Reflect.set(this.target_, key, value);
          } else {
            // Non-observable
            this.target_[key] = value;
            return true;
          }
        } else {
          // New prop
          return this.extend_(key, {
            value: value,
            enumerable: true,
            writable: true,
            configurable: true
          }, this.defaultAnnotation_, proxyTrap);
        }
      } // Trap for "in"
      ;

      _proto.has_ = function has_(key) {
        if (!globalState.trackingDerivation) {
          // Skip key subscription outside derivation
          return key in this.target_;
        }

        this.pendingKeys_ || (this.pendingKeys_ = new Map());
        var entry = this.pendingKeys_.get(key);

        if (!entry) {
          entry = new ObservableValue(key in this.target_, referenceEnhancer, "ObservableObject.key?", false);
          this.pendingKeys_.set(key, entry);
        }

        return entry.get();
      }
      /**
       * @param {PropertyKey} key
       * @param {Annotation|boolean} annotation true - use default annotation, false - ignore prop
       */
      ;

      _proto.make_ = function make_(key, annotation) {
        if (annotation === true) {
          annotation = this.defaultAnnotation_;
        }

        if (annotation === false) {
          return;
        }

        if (!(key in this.target_)) {
          var _this$target_$storedA;

          // Throw on missing key, except for decorators:
          // Decorator annotations are collected from whole prototype chain.
          // When called from super() some props may not exist yet.
          // However we don't have to worry about missing prop,
          // because the decorator must have been applied to something.
          if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
            return; // will be annotated by subclass constructor
          } else {
            die(1, annotation.annotationType_, this.name_ + "." + key.toString());
          }
        }

        var source = this.target_;

        while (source && source !== objectPrototype) {
          var descriptor = getDescriptor(source, key);

          if (descriptor) {
            var outcome = annotation.make_(this, key, descriptor, source);

            if (outcome === 0
            /* Cancel */
            ) {
              return;
            }

            if (outcome === 1
            /* Break */
            ) {
              break;
            }
          }

          source = Object.getPrototypeOf(source);
        }

        recordAnnotationApplied(this, annotation, key);
      }
      /**
       * @param {PropertyKey} key
       * @param {PropertyDescriptor} descriptor
       * @param {Annotation|boolean} annotation true - use default annotation, false - copy as is
       * @param {boolean} proxyTrap whether it's called from proxy trap
       * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
       */
      ;

      _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
        if (proxyTrap === void 0) {
          proxyTrap = false;
        }

        if (annotation === true) {
          annotation = this.defaultAnnotation_;
        }

        if (annotation === false) {
          return this.defineProperty_(key, descriptor, proxyTrap);
        }
        var outcome = annotation.extend_(this, key, descriptor, proxyTrap);

        if (outcome) {
          recordAnnotationApplied(this, annotation, key);
        }

        return outcome;
      }
      /**
       * @param {PropertyKey} key
       * @param {PropertyDescriptor} descriptor
       * @param {boolean} proxyTrap whether it's called from proxy trap
       * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
       */
      ;

      _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
        if (proxyTrap === void 0) {
          proxyTrap = false;
        }

        try {
          startBatch(); // Delete

          var deleteOutcome = this.delete_(key);

          if (!deleteOutcome) {
            // Failure or intercepted
            return deleteOutcome;
          } // ADD interceptor


          if (hasInterceptors(this)) {
            var change = interceptChange(this, {
              object: this.proxy_ || this.target_,
              name: key,
              type: ADD,
              newValue: descriptor.value
            });

            if (!change) {
              return null;
            }

            var newValue = change.newValue;

            if (descriptor.value !== newValue) {
              descriptor = _extends({}, descriptor, {
                value: newValue
              });
            }
          } // Define


          if (proxyTrap) {
            if (!Reflect.defineProperty(this.target_, key, descriptor)) {
              return false;
            }
          } else {
            defineProperty$1(this.target_, key, descriptor);
          } // Notify


          this.notifyPropertyAddition_(key, descriptor.value);
        } finally {
          endBatch();
        }

        return true;
      } // If original descriptor becomes relevant, move this to annotation directly
      ;

      _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
        if (proxyTrap === void 0) {
          proxyTrap = false;
        }

        try {
          startBatch(); // Delete

          var deleteOutcome = this.delete_(key);

          if (!deleteOutcome) {
            // Failure or intercepted
            return deleteOutcome;
          } // ADD interceptor


          if (hasInterceptors(this)) {
            var change = interceptChange(this, {
              object: this.proxy_ || this.target_,
              name: key,
              type: ADD,
              newValue: value
            });

            if (!change) {
              return null;
            }

            value = change.newValue;
          }

          var cachedDescriptor = getCachedObservablePropDescriptor(key);
          var descriptor = {
            configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
            enumerable: true,
            get: cachedDescriptor.get,
            set: cachedDescriptor.set
          }; // Define

          if (proxyTrap) {
            if (!Reflect.defineProperty(this.target_, key, descriptor)) {
              return false;
            }
          } else {
            defineProperty$1(this.target_, key, descriptor);
          }

          var observable = new ObservableValue(value, enhancer, "production" !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
          this.values_.set(key, observable); // Notify (value possibly changed by ObservableValue)

          this.notifyPropertyAddition_(key, observable.value_);
        } finally {
          endBatch();
        }

        return true;
      } // If original descriptor becomes relevant, move this to annotation directly
      ;

      _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
        if (proxyTrap === void 0) {
          proxyTrap = false;
        }

        try {
          startBatch(); // Delete

          var deleteOutcome = this.delete_(key);

          if (!deleteOutcome) {
            // Failure or intercepted
            return deleteOutcome;
          } // ADD interceptor


          if (hasInterceptors(this)) {
            var change = interceptChange(this, {
              object: this.proxy_ || this.target_,
              name: key,
              type: ADD,
              newValue: undefined
            });

            if (!change) {
              return null;
            }
          }

          options.name || (options.name = "production" !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key");
          options.context = this.proxy_ || this.target_;
          var cachedDescriptor = getCachedObservablePropDescriptor(key);
          var descriptor = {
            configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
            enumerable: false,
            get: cachedDescriptor.get,
            set: cachedDescriptor.set
          }; // Define

          if (proxyTrap) {
            if (!Reflect.defineProperty(this.target_, key, descriptor)) {
              return false;
            }
          } else {
            defineProperty$1(this.target_, key, descriptor);
          }

          this.values_.set(key, new ComputedValue(options)); // Notify

          this.notifyPropertyAddition_(key, undefined);
        } finally {
          endBatch();
        }

        return true;
      }
      /**
       * @param {PropertyKey} key
       * @param {PropertyDescriptor} descriptor
       * @param {boolean} proxyTrap whether it's called from proxy trap
       * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
       */
      ;

      _proto.delete_ = function delete_(key, proxyTrap) {
        if (proxyTrap === void 0) {
          proxyTrap = false;
        }

        // No such prop
        if (!hasProp(this.target_, key)) {
          return true;
        } // Intercept


        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: REMOVE
          }); // Cancelled

          if (!change) {
            return null;
          }
        } // Delete


        try {
          var _this$pendingKeys_, _this$pendingKeys_$ge;

          startBatch();
          var notify = hasListeners(this);
          var notifySpy = "production" !== "production" && isSpyEnabled();
          var observable = this.values_.get(key); // Value needed for spies/listeners

          var value = undefined; // Optimization: don't pull the value unless we will need it

          if (!observable && (notify || notifySpy)) {
            var _getDescriptor;

            value = (_getDescriptor = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor.value;
          } // delete prop (do first, may fail)


          if (proxyTrap) {
            if (!Reflect.deleteProperty(this.target_, key)) {
              return false;
            }
          } else {
            delete this.target_[key];
          } // Allow re-annotating this field


          if ("production" !== "production") ; // Clear observable


          if (observable) {
            this.values_["delete"](key); // for computed, value is undefined

            if (observable instanceof ObservableValue) {
              value = observable.value_;
            } // Notify: autorun(() => obj[key]), see #1796


            propagateChanged(observable);
          } // Notify "keys/entries/values" observers


          this.keysAtom_.reportChanged(); // Notify "has" observers
          // "in" as it may still exist in proto

          (_this$pendingKeys_ = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? void 0 : _this$pendingKeys_$ge.set(key in this.target_); // Notify spies/listeners

          if (notify || notifySpy) {
            var _change2 = {
              type: REMOVE,
              observableKind: "object",
              object: this.proxy_ || this.target_,
              debugObjectName: this.name_,
              oldValue: value,
              name: key
            };

            if ("production" !== "production" && notifySpy) ;

            if (notify) {
              notifyListeners(this, _change2);
            }

            if ("production" !== "production" && notifySpy) ;
          }
        } finally {
          endBatch();
        }

        return true;
      }
      /**
       * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
       * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
       * for callback details
       */
      ;

      _proto.observe_ = function observe_(callback, fireImmediately) {

        return registerListener(this, callback);
      };

      _proto.intercept_ = function intercept_(handler) {
        return registerInterceptor(this, handler);
      };

      _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
        var _this$pendingKeys_2, _this$pendingKeys_2$g;

        var notify = hasListeners(this);
        var notifySpy = "production" !== "production" ;

        if (notify || notifySpy) {
          var change = notify || notifySpy ? {
            type: ADD,
            observableKind: "object",
            debugObjectName: this.name_,
            object: this.proxy_ || this.target_,
            name: key,
            newValue: value
          } : null;

          if (notify) {
            notifyListeners(this, change);
          }
        }

        (_this$pendingKeys_2 = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? void 0 : _this$pendingKeys_2$g.set(true); // Notify "keys/entries/values" observers

        this.keysAtom_.reportChanged();
      };

      _proto.ownKeys_ = function ownKeys_() {
        this.keysAtom_.reportObserved();
        return ownKeys(this.target_);
      };

      _proto.keys_ = function keys_() {
        // Returns enumerable && own, but unfortunately keysAtom will report on ANY key change.
        // There is no way to distinguish between Object.keys(object) and Reflect.ownKeys(object) - both are handled by ownKeys trap.
        // We can either over-report in Object.keys(object) or under-report in Reflect.ownKeys(object)
        // We choose to over-report in Object.keys(object), because:
        // - typically it's used with simple data objects
        // - when symbolic/non-enumerable keys are relevant Reflect.ownKeys works as expected
        this.keysAtom_.reportObserved();
        return Object.keys(this.target_);
      };

      return ObservableObjectAdministration;
    }();
    function asObservableObject(target, options) {
      var _options$name;

      if (hasProp(target, $mobx)) {

        return target;
      }

      var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : "ObservableObject";
      var adm = new ObservableObjectAdministration(target, new Map(), String(name), getAnnotationFromOptions(options));
      addHiddenProp(target, $mobx, adm);
      return target;
    }
    var isObservableObjectAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);

    function getCachedObservablePropDescriptor(key) {
      return descriptorCache[key] || (descriptorCache[key] = {
        get: function get() {
          return this[$mobx].getObservablePropValue_(key);
        },
        set: function set(value) {
          return this[$mobx].setObservablePropValue_(key, value);
        }
      });
    }

    function isObservableObject(thing) {
      if (isObject(thing)) {
        return isObservableObjectAdministration(thing[$mobx]);
      }

      return false;
    }
    function recordAnnotationApplied(adm, annotation, key) {
      var _adm$target_$storedAn;


      (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
    }

    /**
     * This array buffer contains two lists of properties, so that all arrays
     * can recycle their property definitions, which significantly improves performance of creating
     * properties on the fly.
     */

    var OBSERVABLE_ARRAY_BUFFER_SIZE = 0; // Typescript workaround to make sure ObservableArray extends Array

    var StubArray = function StubArray() {};

    function inherit(ctor, proto) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ctor.prototype, proto);
      } else if (ctor.prototype.__proto__ !== undefined) {
        ctor.prototype.__proto__ = proto;
      } else {
        ctor.prototype = proto;
      }
    }

    inherit(StubArray, Array.prototype); // Weex proto freeze protection was here,
    // but it is unclear why the hack is need as MobX never changed the prototype
    // anyway, so removed it in V6

    var LegacyObservableArray = /*#__PURE__*/function (_StubArray, _Symbol$toStringTag, _Symbol$iterator) {
      _inheritsLoose(LegacyObservableArray, _StubArray);

      function LegacyObservableArray(initialValues, enhancer, name, owned) {
        var _this;

        if (name === void 0) {
          name = "ObservableArray";
        }

        if (owned === void 0) {
          owned = false;
        }

        _this = _StubArray.call(this) || this;
        var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
        adm.proxy_ = _assertThisInitialized(_this);
        addHiddenFinalProp$1(_assertThisInitialized(_this), $mobx, adm);

        if (initialValues && initialValues.length) {
          var prev = allowStateChangesStart(true); // @ts-ignore

          _this.spliceWithArray(0, 0, initialValues);

          allowStateChangesEnd(prev);
        }

        return _this;
      }

      var _proto = LegacyObservableArray.prototype;

      _proto.concat = function concat() {
        this[$mobx].atom_.reportObserved();

        for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
          arrays[_key] = arguments[_key];
        }

        return Array.prototype.concat.apply(this.slice(), //@ts-ignore
        arrays.map(function (a) {
          return isObservableArray(a) ? a.slice() : a;
        }));
      };

      _proto[_Symbol$iterator] = function () {
        var self = this;
        var nextIndex = 0;
        return makeIterable({
          next: function next() {
            return nextIndex < self.length ? {
              value: self[nextIndex++],
              done: false
            } : {
              done: true,
              value: undefined
            };
          }
        });
      };

      _createClass(LegacyObservableArray, [{
        key: "length",
        get: function get() {
          return this[$mobx].getArrayLength_();
        },
        set: function set(newLength) {
          this[$mobx].setArrayLength_(newLength);
        }
      }, {
        key: _Symbol$toStringTag,
        get: function get() {
          return "Array";
        }
      }]);

      return LegacyObservableArray;
    }(StubArray, Symbol.toStringTag, Symbol.iterator);

    Object.entries(arrayExtensions).forEach(function (_ref) {
      var prop = _ref[0],
          fn = _ref[1];

      if (prop !== "concat") {
        addHiddenProp(LegacyObservableArray.prototype, prop, fn);
      }
    });

    function createArrayEntryDescriptor(index) {
      return {
        enumerable: false,
        configurable: true,
        get: function get() {
          return this[$mobx].get_(index);
        },
        set: function set(value) {
          this[$mobx].set_(index, value);
        }
      };
    }

    function createArrayBufferItem(index) {
      defineProperty$1(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
    }

    function reserveArrayBuffer(max) {
      if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
        for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
          createArrayBufferItem(index);
        }

        OBSERVABLE_ARRAY_BUFFER_SIZE = max;
      }
    }
    reserveArrayBuffer(1000);
    function createLegacyArray(initialValues, enhancer, name) {
      return new LegacyObservableArray(initialValues, enhancer, name);
    }

    function getAtom(thing, property) {
      if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
          if (property !== undefined) {
            die(23);
          }

          return thing[$mobx].atom_;
        }

        if (isObservableSet(thing)) {
          return thing[$mobx];
        }

        if (isObservableMap(thing)) {
          if (property === undefined) {
            return thing.keysAtom_;
          }

          var observable = thing.data_.get(property) || thing.hasMap_.get(property);

          if (!observable) {
            die(25, property, getDebugName(thing));
          }

          return observable;
        }


        if (isObservableObject(thing)) {
          if (!property) {
            return die(26);
          }

          var _observable = thing[$mobx].values_.get(property);

          if (!_observable) {
            die(27, property, getDebugName(thing));
          }

          return _observable;
        }

        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
          return thing;
        }
      } else if (isFunction(thing)) {
        if (isReaction(thing[$mobx])) {
          // disposer function
          return thing[$mobx];
        }
      }

      die(28);
    }
    function getAdministration(thing, property) {
      if (!thing) {
        die(29);
      }

      if (property !== undefined) {
        return getAdministration(getAtom(thing, property));
      }

      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
      }

      if (isObservableMap(thing) || isObservableSet(thing)) {
        return thing;
      }

      if (thing[$mobx]) {
        return thing[$mobx];
      }

      die(24, thing);
    }
    function getDebugName(thing, property) {
      var named;

      if (property !== undefined) {
        named = getAtom(thing, property);
      } else if (isAction(thing)) {
        return thing.name;
      } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
        named = getAdministration(thing);
      } else {
        // valid for arrays as well
        named = getAtom(thing);
      }

      return named.name_;
    }

    var toString = objectPrototype.toString;
    function deepEqual(a, b, depth) {
      if (depth === void 0) {
        depth = -1;
      }

      return eq(a, b, depth);
    } // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
    // Internal recursive comparison function for `isEqual`.

    function eq(a, b, depth, aStack, bStack) {
      // Identical objects are equal. `0 === -0`, but they aren't identical.
      // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
      if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
      } // `null` or `undefined` only equal to itself (strict comparison).


      if (a == null || b == null) {
        return false;
      } // `NaN`s are equivalent, but non-reflexive.


      if (a !== a) {
        return b !== b;
      } // Exhaust primitive checks


      var type = typeof a;

      if (type !== "function" && type !== "object" && typeof b != "object") {
        return false;
      } // Compare `[[Class]]` names.


      var className = toString.call(a);

      if (className !== toString.call(b)) {
        return false;
      }

      switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case "[object RegExp]": // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

        case "[object String]":
          // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
          // equivalent to `new String("5")`.
          return "" + a === "" + b;

        case "[object Number]":
          // `NaN`s are equivalent, but non-reflexive.
          // Object(NaN) is equivalent to NaN.
          if (+a !== +a) {
            return +b !== +b;
          } // An `egal` comparison is performed for other numeric values.


          return +a === 0 ? 1 / +a === 1 / b : +a === +b;

        case "[object Date]":
        case "[object Boolean]":
          // Coerce dates and booleans to numeric primitive values. Dates are compared by their
          // millisecond representations. Note that invalid dates with millisecond representations
          // of `NaN` are not equivalent.
          return +a === +b;

        case "[object Symbol]":
          return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);

        case "[object Map]":
        case "[object Set]":
          // Maps and Sets are unwrapped to arrays of entry-pairs, adding an incidental level.
          // Hide this extra level by increasing the depth.
          if (depth >= 0) {
            depth++;
          }

          break;
      } // Unwrap any wrapped objects.


      a = unwrap(a);
      b = unwrap(b);
      var areArrays = className === "[object Array]";

      if (!areArrays) {
        if (typeof a != "object" || typeof b != "object") {
          return false;
        } // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.


        var aCtor = a.constructor,
            bCtor = b.constructor;

        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
          return false;
        }
      }

      if (depth === 0) {
        return false;
      } else if (depth < 0) {
        depth = -1;
      } // Assume equality for cyclic structures. The algorithm for detecting cyclic
      // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
      // Initializing stack of traversed objects.
      // It's done here since we only need them for objects and arrays comparison.


      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;

      while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a) {
          return bStack[length] === b;
        }
      } // Add the first object to the stack of traversed objects.


      aStack.push(a);
      bStack.push(b); // Recursively compare objects and arrays.

      if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;

        if (length !== b.length) {
          return false;
        } // Deep compare the contents, ignoring non-numeric properties.


        while (length--) {
          if (!eq(a[length], b[length], depth - 1, aStack, bStack)) {
            return false;
          }
        }
      } else {
        // Deep compare objects.
        var keys = Object.keys(a);
        var key;
        length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

        if (Object.keys(b).length !== length) {
          return false;
        }

        while (length--) {
          // Deep compare each member
          key = keys[length];

          if (!(hasProp(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) {
            return false;
          }
        }
      } // Remove the first object from the stack of traversed objects.


      aStack.pop();
      bStack.pop();
      return true;
    }

    function unwrap(a) {
      if (isObservableArray(a)) {
        return a.slice();
      }

      if (isES6Map(a) || isObservableMap(a)) {
        return Array.from(a.entries());
      }

      if (isES6Set(a) || isObservableSet(a)) {
        return Array.from(a.entries());
      }

      return a;
    }

    function makeIterable(iterator) {
      iterator[Symbol.iterator] = getSelf;
      return iterator;
    }

    function getSelf() {
      return this;
    }

    /**
     * (c) Michel Weststrate 2015 - 2020
     * MIT Licensed
     *
     * Welcome to the mobx sources! To get an global overview of how MobX internally works,
     * this is a good place to start:
     * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
     *
     * Source folders:
     * ===============
     *
     * - api/     Most of the public static methods exposed by the module can be found here.
     * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
     * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
     * - utils/   Utility stuff.
     *
     */
    ["Symbol", "Map", "Set"].forEach(function (m) {
      var g = getGlobal();

      if (typeof g[m] === "undefined") {
        die("MobX requires global '" + m + "' to be available or polyfilled");
      }
    });

    if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
      // See: https://github.com/andykog/mobx-devtools/
      __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy,
        extras: {
          getDebugName: getDebugName
        },
        $mobx: $mobx
      });
    }

    var livelinessChecking = "warn";
    /**
     * Returns the current liveliness checking mode.
     *
     * @returns `"warn"`, `"error"` or `"ignore"`
     */
    function getLivelinessChecking() {
        return livelinessChecking;
    }

    /**
     * @hidden
     */
    var Hook;
    (function (Hook) {
        Hook["afterCreate"] = "afterCreate";
        Hook["afterAttach"] = "afterAttach";
        Hook["afterCreationFinalization"] = "afterCreationFinalization";
        Hook["beforeDetach"] = "beforeDetach";
        Hook["beforeDestroy"] = "beforeDestroy";
    })(Hook || (Hook = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * Returns the _actual_ type of the given tree node. (Or throws)
     *
     * @param object
     * @returns
     */
    function getType(object) {
        return getStateTreeNode(object).type;
    }
    /**
     * Registers a function that is invoked whenever a new snapshot for the given model instance is available.
     * The listener will only be fire at the end of the current MobX (trans)action.
     * See [snapshots](https://github.com/mobxjs/mobx-state-tree#snapshots) for more details.
     *
     * @param target
     * @param callback
     * @returns
     */
    function onSnapshot(target, callback) {
        return getStateTreeNode(target).onSnapshot(callback);
    }
    /**
     * Applies a JSON-patch to the given model instance or bails out if the patch couldn't be applied
     * See [patches](https://github.com/mobxjs/mobx-state-tree#patches) for more details.
     *
     * Can apply a single past, or an array of patches.
     *
     * @param target
     * @param patch
     * @returns
     */
    function applyPatch(target, patch) {
        getStateTreeNode(target).applyPatches(asArray(patch));
    }
    /**
     * Calculates a snapshot from the given model instance. The snapshot will always reflect the latest state but use
     * structural sharing where possible. Doesn't require MobX transactions to be completed.
     *
     * @param target
     * @param applyPostProcess If true (the default) then postProcessSnapshot gets applied.
     * @returns
     */
    function getSnapshot(target, applyPostProcess) {
        if (applyPostProcess === void 0) { applyPostProcess = true; }
        var node = getStateTreeNode(target);
        if (applyPostProcess)
            return node.snapshot;
        return freeze(node.type.getSnapshot(node, false));
    }
    /**
     * Given an object in a model tree, returns the root object of that tree.
     *
     * Please note that in child nodes access to the root is only possible
     * once the `afterAttach` hook has fired.
     *
     * @param target
     * @returns
     */
    function getRoot(target) {
        return getStateTreeNode(target).root.storedValue;
    }
    /**
     * Returns the path of the given object in the model tree
     *
     * @param target
     * @returns
     */
    function getPath(target) {
        return getStateTreeNode(target).path;
    }
    /**
     * Returns the identifier of the target node.
     * This is the *string normalized* identifier, which might not match the type of the identifier attribute
     *
     * @param target
     * @returns
     */
    function getIdentifier(target) {
        return getStateTreeNode(target).identifier;
    }

    /**
     * @internal
     * @hidden
     */
    var BaseNode = /** @class */ (function () {
        function BaseNode(type, parent, subpath, environment) {
            Object.defineProperty(this, "type", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: type
            });
            Object.defineProperty(this, "environment", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: environment
            });
            Object.defineProperty(this, "_escapedSubpath", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_subpath", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_subpathUponDeath", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_pathUponDeath", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "storedValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // usually the same type as the value, but not always (such as with references)
            Object.defineProperty(this, "aliveAtom", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_state", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: NodeLifeCycle.INITIALIZING
            });
            Object.defineProperty(this, "_hookSubscribers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "_parent", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "pathAtom", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.environment = environment;
            this.baseSetParent(parent, subpath);
        }
        Object.defineProperty(BaseNode.prototype, "subpath", {
            get: function () {
                return this._subpath;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "subpathUponDeath", {
            get: function () {
                return this._subpathUponDeath;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "pathUponDeath", {
            get: function () {
                return this._pathUponDeath;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "value", {
            get: function () {
                return this.type.getValue(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "state", {
            get: function () {
                return this._state;
            },
            set: function (val) {
                var wasAlive = this.isAlive;
                this._state = val;
                var isAlive = this.isAlive;
                if (this.aliveAtom && wasAlive !== isAlive) {
                    this.aliveAtom.reportChanged();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "fireInternalHook", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (name) {
                if (this._hookSubscribers) {
                    this._hookSubscribers.emit(name, this, name);
                }
            }
        });
        Object.defineProperty(BaseNode.prototype, "registerHook", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (hook, hookHandler) {
                if (!this._hookSubscribers) {
                    this._hookSubscribers = new EventHandlers();
                }
                return this._hookSubscribers.register(hook, hookHandler);
            }
        });
        Object.defineProperty(BaseNode.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "getReconciliationType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.type;
            }
        });
        Object.defineProperty(BaseNode.prototype, "baseSetParent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath) {
                this._parent = parent;
                this._subpath = subpath;
                this._escapedSubpath = undefined; // regenerate when needed
                if (this.pathAtom) {
                    this.pathAtom.reportChanged();
                }
            }
        });
        Object.defineProperty(BaseNode.prototype, "path", {
            /*
             * Returns (escaped) path representation as string
             */
            get: function () {
                return this.getEscapedPath(true);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "getEscapedPath", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (reportObserved) {
                if (reportObserved) {
                    if (!this.pathAtom) {
                        this.pathAtom = createAtom("path");
                    }
                    this.pathAtom.reportObserved();
                }
                if (!this.parent)
                    return "";
                // regenerate escaped subpath if needed
                if (this._escapedSubpath === undefined) {
                    this._escapedSubpath = !this._subpath ? "" : escapeJsonPath(this._subpath);
                }
                return this.parent.getEscapedPath(reportObserved) + "/" + this._escapedSubpath;
            }
        });
        Object.defineProperty(BaseNode.prototype, "isRoot", {
            get: function () {
                return this.parent === null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "isAlive", {
            get: function () {
                return this.state !== NodeLifeCycle.DEAD;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "isDetaching", {
            get: function () {
                return this.state === NodeLifeCycle.DETACHING;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "observableIsAlive", {
            get: function () {
                if (!this.aliveAtom) {
                    this.aliveAtom = createAtom("alive");
                }
                this.aliveAtom.reportObserved();
                return this.isAlive;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseNode.prototype, "baseFinalizeCreation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (whenFinalized) {
                // goal: afterCreate hooks runs depth-first. After attach runs parent first, so on afterAttach the parent has completed already
                if (this.state === NodeLifeCycle.CREATED) {
                    if (this.parent) {
                        if (this.parent.state !== NodeLifeCycle.FINALIZED) {
                            // parent not ready yet, postpone
                            return;
                        }
                        this.fireHook(Hook.afterAttach);
                    }
                    this.state = NodeLifeCycle.FINALIZED;
                    if (whenFinalized) {
                        whenFinalized();
                    }
                }
            }
        });
        Object.defineProperty(BaseNode.prototype, "baseFinalizeDeath", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this._hookSubscribers) {
                    this._hookSubscribers.clearAll();
                }
                this._subpathUponDeath = this._subpath;
                this._pathUponDeath = this.getEscapedPath(false);
                this.baseSetParent(null, "");
                this.state = NodeLifeCycle.DEAD;
            }
        });
        Object.defineProperty(BaseNode.prototype, "baseAboutToDie", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.fireHook(Hook.beforeDestroy);
            }
        });
        return BaseNode;
    }());

    /**
     * @internal
     * @hidden
     */
    var ScalarNode = /** @class */ (function (_super) {
        __extends(ScalarNode, _super);
        function ScalarNode(simpleType, parent, subpath, environment, initialSnapshot) {
            var _this = _super.call(this, simpleType, parent, subpath, environment) || this;
            try {
                _this.storedValue = simpleType.createNewInstance(initialSnapshot);
            }
            catch (e) {
                // short-cut to die the instance, to avoid the snapshot computed starting to throw...
                _this.state = NodeLifeCycle.DEAD;
                throw e;
            }
            _this.state = NodeLifeCycle.CREATED;
            // for scalar nodes there's no point in firing this event since it would fire on the constructor, before
            // anybody can actually register for/listen to it
            // this.fireHook(Hook.AfterCreate)
            _this.finalizeCreation();
            return _this;
        }
        Object.defineProperty(ScalarNode.prototype, "root", {
            get: function () {
                // future optimization: store root ref in the node and maintain it
                if (!this.parent)
                    throw fail$1("This scalar node is not part of a tree");
                return this.parent.root;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScalarNode.prototype, "setParent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (newParent, subpath) {
                var parentChanged = this.parent !== newParent;
                var subpathChanged = this.subpath !== subpath;
                if (!parentChanged && !subpathChanged) {
                    return;
                }
                this.environment = undefined; // use parent's
                this.baseSetParent(this.parent, subpath);
            }
        });
        Object.defineProperty(ScalarNode.prototype, "snapshot", {
            get: function () {
                return freeze(this.getSnapshot());
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScalarNode.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.type.getSnapshot(this);
            }
        });
        Object.defineProperty(ScalarNode.prototype, "toString", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var path = (this.isAlive ? this.path : this.pathUponDeath) || "<root>";
                return this.type.name + "@" + path + (this.isAlive ? "" : " [dead]");
            }
        });
        Object.defineProperty(ScalarNode.prototype, "die", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.isAlive || this.state === NodeLifeCycle.DETACHING)
                    return;
                this.aboutToDie();
                this.finalizeDeath();
            }
        });
        Object.defineProperty(ScalarNode.prototype, "finalizeCreation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.baseFinalizeCreation();
            }
        });
        Object.defineProperty(ScalarNode.prototype, "aboutToDie", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.baseAboutToDie();
            }
        });
        Object.defineProperty(ScalarNode.prototype, "finalizeDeath", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.baseFinalizeDeath();
            }
        });
        Object.defineProperty(ScalarNode.prototype, "fireHook", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (name) {
                this.fireInternalHook(name);
            }
        });
        return ScalarNode;
    }(BaseNode));
    ScalarNode.prototype.die = action(ScalarNode.prototype.die);

    var nextNodeId = 1;
    var snapshotReactionOptions = {
        onError: function (e) {
            throw e;
        }
    };
    /**
     * @internal
     * @hidden
     */
    var ObjectNode = /** @class */ (function (_super) {
        __extends(ObjectNode, _super);
        function ObjectNode(complexType, parent, subpath, environment, initialValue) {
            var _this = _super.call(this, complexType, parent, subpath, environment) || this;
            Object.defineProperty(_this, "nodeId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: ++nextNodeId
            });
            Object.defineProperty(_this, "identifierAttribute", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "identifier", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            }); // Identifier is always normalized to string, even if the identifier property isn't
            Object.defineProperty(_this, "unnormalizedIdentifier", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "identifierCache", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "isProtectionEnabled", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            });
            Object.defineProperty(_this, "middlewares", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_applyPatches", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_applySnapshot", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_autoUnbox", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            }); // unboxing is disabled when reading child nodes
            Object.defineProperty(_this, "_isRunningAction", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            }); // only relevant for root
            Object.defineProperty(_this, "_hasSnapshotReaction", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(_this, "_observableInstanceState", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0 /* UNINITIALIZED */
            });
            Object.defineProperty(_this, "_childNodes", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_initialSnapshot", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_cachedInitialSnapshot", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_cachedInitialSnapshotCreated", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(_this, "_snapshotComputed", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_snapshotUponDeath", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            // #region internal event handling
            Object.defineProperty(_this, "_internalEvents", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            _this._snapshotComputed = computed(function () { return freeze(_this.getSnapshot()); });
            _this.unbox = _this.unbox.bind(_this);
            _this._initialSnapshot = freeze(initialValue);
            _this.identifierAttribute = complexType.identifierAttribute;
            if (!parent) {
                _this.identifierCache = new IdentifierCache();
            }
            _this._childNodes = complexType.initializeChildNodes(_this, _this._initialSnapshot);
            // identifier can not be changed during lifecycle of a node
            // so we safely can read it from initial snapshot
            _this.identifier = null;
            _this.unnormalizedIdentifier = null;
            if (_this.identifierAttribute && _this._initialSnapshot) {
                var id = _this._initialSnapshot[_this.identifierAttribute];
                if (id === undefined) {
                    // try with the actual node if not (for optional identifiers)
                    var childNode = _this._childNodes[_this.identifierAttribute];
                    if (childNode) {
                        id = childNode.value;
                    }
                }
                if (typeof id !== "string" && typeof id !== "number") {
                    throw fail$1("Instance identifier '" + _this.identifierAttribute + "' for type '" + _this.type.name + "' must be a string or a number");
                }
                // normalize internal identifier to string
                _this.identifier = normalizeIdentifier(id);
                _this.unnormalizedIdentifier = id;
            }
            if (!parent) {
                _this.identifierCache.addNodeToCache(_this);
            }
            else {
                parent.root.identifierCache.addNodeToCache(_this);
            }
            return _this;
        }
        Object.defineProperty(ObjectNode.prototype, "applyPatches", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (patches) {
                this.createObservableInstanceIfNeeded();
                this._applyPatches(patches);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "applySnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot) {
                this.createObservableInstanceIfNeeded();
                this._applySnapshot(snapshot);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "createObservableInstanceIfNeeded", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this._observableInstanceState === 0 /* UNINITIALIZED */) {
                    this.createObservableInstance();
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "createObservableInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var e_1, _a;
                this._observableInstanceState = 1 /* CREATING */;
                // make sure the parent chain is created as well
                // array with parent chain from parent to child
                var parentChain = [];
                var parent = this.parent;
                // for performance reasons we never go back further than the most direct
                // uninitialized parent
                // this is done to avoid traversing the whole tree to the root when using
                // the same reference again
                while (parent &&
                    parent._observableInstanceState === 0 /* UNINITIALIZED */) {
                    parentChain.unshift(parent);
                    parent = parent.parent;
                }
                try {
                    // initialize the uninitialized parent chain from parent to child
                    for (var parentChain_1 = __values(parentChain), parentChain_1_1 = parentChain_1.next(); !parentChain_1_1.done; parentChain_1_1 = parentChain_1.next()) {
                        var p = parentChain_1_1.value;
                        p.createObservableInstanceIfNeeded();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (parentChain_1_1 && !parentChain_1_1.done && (_a = parentChain_1.return)) _a.call(parentChain_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var type = this.type;
                try {
                    this.storedValue = type.createNewInstance(this._childNodes);
                    this.preboot();
                    this._isRunningAction = true;
                    type.finalizeNewInstance(this, this.storedValue);
                }
                catch (e) {
                    // short-cut to die the instance, to avoid the snapshot computed starting to throw...
                    this.state = NodeLifeCycle.DEAD;
                    throw e;
                }
                finally {
                    this._isRunningAction = false;
                }
                this._observableInstanceState = 2 /* CREATED */;
                this._snapshotComputed.trackAndCompute();
                if (this.isRoot)
                    this._addSnapshotReaction();
                this._childNodes = EMPTY_OBJECT;
                this.state = NodeLifeCycle.CREATED;
                this.fireHook(Hook.afterCreate);
                this.finalizeCreation();
            }
        });
        Object.defineProperty(ObjectNode.prototype, "root", {
            get: function () {
                var parent = this.parent;
                return parent ? parent.root : this;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ObjectNode.prototype, "clearParent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.parent)
                    return;
                // detach if attached
                this.fireHook(Hook.beforeDetach);
                var previousState = this.state;
                this.state = NodeLifeCycle.DETACHING;
                var root = this.root;
                var newEnv = root.environment;
                var newIdCache = root.identifierCache.splitCache(this);
                try {
                    this.parent.removeChild(this.subpath);
                    this.baseSetParent(null, "");
                    this.environment = newEnv;
                    this.identifierCache = newIdCache;
                }
                finally {
                    this.state = previousState;
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "setParent", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (newParent, subpath) {
                var parentChanged = newParent !== this.parent;
                var subpathChanged = subpath !== this.subpath;
                if (!parentChanged && !subpathChanged) {
                    return;
                }
                if (parentChanged) {
                    // attach to new parent
                    this.environment = undefined; // will use root's
                    newParent.root.identifierCache.mergeCache(this);
                    this.baseSetParent(newParent, subpath);
                    this.fireHook(Hook.afterAttach);
                }
                else if (subpathChanged) {
                    // moving to a new subpath on the same parent
                    this.baseSetParent(this.parent, subpath);
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "fireHook", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (name) {
                var _this = this;
                this.fireInternalHook(name);
                var fn = this.storedValue &&
                    typeof this.storedValue === "object" &&
                    this.storedValue[name];
                if (typeof fn === "function") {
                    // we check for it to allow old mobx peer dependencies that don't have the method to work (even when still bugged)
                    if (runInAction) {
                        runInAction(function () {
                            fn.apply(_this.storedValue);
                        });
                    }
                    else {
                        fn.apply(this.storedValue);
                    }
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "snapshot", {
            // advantage of using computed for a snapshot is that nicely respects transactions etc.
            get: function () {
                return this._snapshotComputed.get();
            },
            enumerable: false,
            configurable: true
        });
        // NOTE: we use this method to get snapshot without creating @computed overhead
        Object.defineProperty(ObjectNode.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.isAlive)
                    return this._snapshotUponDeath;
                return this._observableInstanceState === 2 /* CREATED */
                    ? this._getActualSnapshot()
                    : this._getCachedInitialSnapshot();
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_getActualSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.type.getSnapshot(this);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_getCachedInitialSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this._cachedInitialSnapshotCreated) {
                    var type = this.type;
                    var childNodes = this._childNodes;
                    var snapshot = this._initialSnapshot;
                    this._cachedInitialSnapshot = type.processInitialSnapshot(childNodes, snapshot);
                    this._cachedInitialSnapshotCreated = true;
                }
                return this._cachedInitialSnapshot;
            }
        });
        Object.defineProperty(ObjectNode.prototype, "isRunningAction", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this._isRunningAction)
                    return true;
                if (this.isRoot)
                    return false;
                return this.parent.isRunningAction();
            }
        });
        Object.defineProperty(ObjectNode.prototype, "assertAlive", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (context) {
                var livelinessChecking = getLivelinessChecking();
                if (!this.isAlive && livelinessChecking !== "ignore") {
                    var error = this._getAssertAliveError(context);
                    switch (livelinessChecking) {
                        case "error":
                            throw fail$1(error);
                        case "warn":
                            warnError(error);
                    }
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_getAssertAliveError", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (context) {
                var escapedPath = this.getEscapedPath(false) || this.pathUponDeath || "";
                var subpath = (context.subpath && escapeJsonPath(context.subpath)) || "";
                var actionContext = context.actionContext || getCurrentActionContext();
                // try to use a real action context if possible since it includes the action name
                if (actionContext && actionContext.type !== "action" && actionContext.parentActionEvent) {
                    actionContext = actionContext.parentActionEvent;
                }
                var actionFullPath = "";
                if (actionContext && actionContext.name != null) {
                    // try to use the context, and if it not available use the node one
                    var actionPath = (actionContext && actionContext.context && getPath(actionContext.context)) ||
                        escapedPath;
                    actionFullPath = actionPath + "." + actionContext.name + "()";
                }
                return "You are trying to read or write to an object that is no longer part of a state tree. (Object type: '" + this.type.name + "', Path upon death: '" + escapedPath + "', Subpath: '" + subpath + "', Action: '" + actionFullPath + "'). Either detach nodes first, or don't use objects after removing / replacing them in the tree.";
            }
        });
        Object.defineProperty(ObjectNode.prototype, "getChildNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (subpath) {
                this.assertAlive({
                    subpath: subpath
                });
                this._autoUnbox = false;
                try {
                    return this._observableInstanceState === 2 /* CREATED */
                        ? this.type.getChildNode(this, subpath)
                        : this._childNodes[subpath];
                }
                finally {
                    this._autoUnbox = true;
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "getChildren", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.assertAlive(EMPTY_OBJECT);
                this._autoUnbox = false;
                try {
                    return this._observableInstanceState === 2 /* CREATED */
                        ? this.type.getChildren(this)
                        : convertChildNodesToArray(this._childNodes);
                }
                finally {
                    this._autoUnbox = true;
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "getChildType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (propertyName) {
                return this.type.getChildType(propertyName);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "isProtected", {
            get: function () {
                return this.root.isProtectionEnabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ObjectNode.prototype, "assertWritable", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (context) {
                this.assertAlive(context);
                if (!this.isRunningAction() && this.isProtected) {
                    throw fail$1("Cannot modify '" + this + "', the object is protected and can only be modified by using an action.");
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "removeChild", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (subpath) {
                this.type.removeChild(this, subpath);
            }
        });
        // bound on the constructor
        Object.defineProperty(ObjectNode.prototype, "unbox", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNode) {
                if (!childNode)
                    return childNode;
                this.assertAlive({
                    subpath: childNode.subpath || childNode.subpathUponDeath
                });
                return this._autoUnbox ? childNode.value : childNode;
            }
        });
        Object.defineProperty(ObjectNode.prototype, "toString", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var path = (this.isAlive ? this.path : this.pathUponDeath) || "<root>";
                var identifier = this.identifier ? "(id: " + this.identifier + ")" : "";
                return this.type.name + "@" + path + identifier + (this.isAlive ? "" : " [dead]");
            }
        });
        Object.defineProperty(ObjectNode.prototype, "finalizeCreation", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                this.baseFinalizeCreation(function () {
                    var e_2, _a;
                    try {
                        for (var _b = __values(_this.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var child = _c.value;
                            child.finalizeCreation();
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    _this.fireInternalHook(Hook.afterCreationFinalization);
                });
            }
        });
        Object.defineProperty(ObjectNode.prototype, "detach", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.isAlive)
                    throw fail$1("Error while detaching, node is not alive.");
                this.clearParent();
            }
        });
        Object.defineProperty(ObjectNode.prototype, "preboot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var self = this;
                this._applyPatches = createActionInvoker(this.storedValue, "@APPLY_PATCHES", function (patches) {
                    patches.forEach(function (patch) {
                        if (!patch.path) {
                            self.type.applySnapshot(self, patch.value);
                            return;
                        }
                        var parts = splitJsonPath(patch.path);
                        var node = resolveNodeByPathParts(self, parts.slice(0, -1));
                        node.applyPatchLocally(parts[parts.length - 1], patch);
                    });
                });
                this._applySnapshot = createActionInvoker(this.storedValue, "@APPLY_SNAPSHOT", function (snapshot) {
                    // if the snapshot is the same as the current one, avoid performing a reconcile
                    if (snapshot === self.snapshot)
                        return;
                    // else, apply it by calling the type logic
                    return self.type.applySnapshot(self, snapshot);
                });
                addHiddenFinalProp(this.storedValue, "$treenode", this);
                addHiddenFinalProp(this.storedValue, "toJSON", toJSON);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "die", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (!this.isAlive || this.state === NodeLifeCycle.DETACHING)
                    return;
                this.aboutToDie();
                this.finalizeDeath();
            }
        });
        Object.defineProperty(ObjectNode.prototype, "aboutToDie", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this._observableInstanceState === 0 /* UNINITIALIZED */) {
                    return;
                }
                this.getChildren().forEach(function (node) {
                    node.aboutToDie();
                });
                // beforeDestroy should run before the disposers since else we could end up in a situation where
                // a disposer added with addDisposer at this stage (beforeDestroy) is actually never released
                this.baseAboutToDie();
                this._internalEventsEmit("dispose" /* Dispose */);
                this._internalEventsClear("dispose" /* Dispose */);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "finalizeDeath", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                // invariant: not called directly but from "die"
                this.getChildren().forEach(function (node) {
                    node.finalizeDeath();
                });
                this.root.identifierCache.notifyDied(this);
                // "kill" the computed prop and just store the last snapshot
                var snapshot = this.snapshot;
                this._snapshotUponDeath = snapshot;
                this._internalEventsClearAll();
                this.baseFinalizeDeath();
            }
        });
        Object.defineProperty(ObjectNode.prototype, "onSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (onChange) {
                this._addSnapshotReaction();
                return this._internalEventsRegister("snapshot" /* Snapshot */, onChange);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "emitSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot) {
                this._internalEventsEmit("snapshot" /* Snapshot */, snapshot);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "onPatch", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (handler) {
                return this._internalEventsRegister("patch" /* Patch */, handler);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "emitPatch", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (basePatch, source) {
                if (this._internalEventsHasSubscribers("patch" /* Patch */)) {
                    var localizedPatch = extend({}, basePatch, {
                        path: source.path.substr(this.path.length) + "/" + basePatch.path // calculate the relative path of the patch
                    });
                    var _a = __read(splitPatch(localizedPatch), 2), patch = _a[0], reversePatch = _a[1];
                    this._internalEventsEmit("patch" /* Patch */, patch, reversePatch);
                }
                if (this.parent)
                    this.parent.emitPatch(basePatch, source);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "hasDisposer", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (disposer) {
                return this._internalEventsHas("dispose" /* Dispose */, disposer);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "addDisposer", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (disposer) {
                if (!this.hasDisposer(disposer)) {
                    this._internalEventsRegister("dispose" /* Dispose */, disposer, true);
                    return;
                }
                throw fail$1("cannot add a disposer when it is already registered for execution");
            }
        });
        Object.defineProperty(ObjectNode.prototype, "removeDisposer", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (disposer) {
                if (!this._internalEventsHas("dispose" /* Dispose */, disposer)) {
                    throw fail$1("cannot remove a disposer which was never registered for execution");
                }
                this._internalEventsUnregister("dispose" /* Dispose */, disposer);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "removeMiddleware", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (middleware) {
                if (this.middlewares) {
                    var index = this.middlewares.indexOf(middleware);
                    if (index >= 0) {
                        this.middlewares.splice(index, 1);
                    }
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "addMiddleWare", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (handler, includeHooks) {
                var _this = this;
                if (includeHooks === void 0) { includeHooks = true; }
                var middleware = { handler: handler, includeHooks: includeHooks };
                if (!this.middlewares)
                    this.middlewares = [middleware];
                else
                    this.middlewares.push(middleware);
                return function () {
                    _this.removeMiddleware(middleware);
                };
            }
        });
        Object.defineProperty(ObjectNode.prototype, "applyPatchLocally", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (subpath, patch) {
                this.assertWritable({
                    subpath: subpath
                });
                this.createObservableInstanceIfNeeded();
                this.type.applyPatchLocally(this, subpath, patch);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_addSnapshotReaction", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                if (!this._hasSnapshotReaction) {
                    var snapshotDisposer = reaction(function () { return _this.snapshot; }, function (snapshot) { return _this.emitSnapshot(snapshot); }, snapshotReactionOptions);
                    this.addDisposer(snapshotDisposer);
                    this._hasSnapshotReaction = true;
                }
            }
        });
        // we proxy the methods to avoid creating an EventHandlers instance when it is not needed
        Object.defineProperty(ObjectNode.prototype, "_internalEventsHasSubscribers", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                return !!this._internalEvents && this._internalEvents.hasSubscribers(event);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_internalEventsRegister", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, eventHandler, atTheBeginning) {
                if (atTheBeginning === void 0) { atTheBeginning = false; }
                if (!this._internalEvents) {
                    this._internalEvents = new EventHandlers();
                }
                return this._internalEvents.register(event, eventHandler, atTheBeginning);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_internalEventsHas", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, eventHandler) {
                return !!this._internalEvents && this._internalEvents.has(event, eventHandler);
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_internalEventsUnregister", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, eventHandler) {
                if (this._internalEvents) {
                    this._internalEvents.unregister(event, eventHandler);
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_internalEventsEmit", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                var _a;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (this._internalEvents) {
                    (_a = this._internalEvents).emit.apply(_a, __spread([event], args));
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_internalEventsClear", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                if (this._internalEvents) {
                    this._internalEvents.clear(event);
                }
            }
        });
        Object.defineProperty(ObjectNode.prototype, "_internalEventsClearAll", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this._internalEvents) {
                    this._internalEvents.clearAll();
                }
            }
        });
        return ObjectNode;
    }(BaseNode));
    ObjectNode.prototype.createObservableInstance = action(ObjectNode.prototype.createObservableInstance);
    ObjectNode.prototype.detach = action(ObjectNode.prototype.detach);
    ObjectNode.prototype.die = action(ObjectNode.prototype.die);

    var _a;
    /**
     * @internal
     * @hidden
     */
    var TypeFlags;
    (function (TypeFlags) {
        TypeFlags[TypeFlags["String"] = 1] = "String";
        TypeFlags[TypeFlags["Number"] = 2] = "Number";
        TypeFlags[TypeFlags["Boolean"] = 4] = "Boolean";
        TypeFlags[TypeFlags["Date"] = 8] = "Date";
        TypeFlags[TypeFlags["Literal"] = 16] = "Literal";
        TypeFlags[TypeFlags["Array"] = 32] = "Array";
        TypeFlags[TypeFlags["Map"] = 64] = "Map";
        TypeFlags[TypeFlags["Object"] = 128] = "Object";
        TypeFlags[TypeFlags["Frozen"] = 256] = "Frozen";
        TypeFlags[TypeFlags["Optional"] = 512] = "Optional";
        TypeFlags[TypeFlags["Reference"] = 1024] = "Reference";
        TypeFlags[TypeFlags["Identifier"] = 2048] = "Identifier";
        TypeFlags[TypeFlags["Late"] = 4096] = "Late";
        TypeFlags[TypeFlags["Refinement"] = 8192] = "Refinement";
        TypeFlags[TypeFlags["Union"] = 16384] = "Union";
        TypeFlags[TypeFlags["Null"] = 32768] = "Null";
        TypeFlags[TypeFlags["Undefined"] = 65536] = "Undefined";
        TypeFlags[TypeFlags["Integer"] = 131072] = "Integer";
        TypeFlags[TypeFlags["Custom"] = 262144] = "Custom";
        TypeFlags[TypeFlags["SnapshotProcessor"] = 524288] = "SnapshotProcessor";
    })(TypeFlags || (TypeFlags = {}));
    /**
     * @internal
     * @hidden
     */
    var cannotDetermineSubtype = "cannotDetermine";
    /** @hidden */
    var $type = Symbol("$type");
    /**
     * A base type produces a MST node (Node in the state tree)
     *
     * @internal
     * @hidden
     */
    var BaseType = /** @class */ (function () {
        function BaseType(name) {
            Object.defineProperty(this, _a, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            // these are just to make inner types avaialable to inherited classes
            Object.defineProperty(this, "C", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "S", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "T", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "N", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "isType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            });
            Object.defineProperty(this, "name", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.name = name;
        }
        Object.defineProperty(BaseType.prototype, "create", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot, environment) {
                typecheckInternal(this, snapshot);
                return this.instantiate(null, "", environment, snapshot).value;
            }
        });
        Object.defineProperty(BaseType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, applyPostProcess) {
                // istanbul ignore next
                throw fail$1("unimplemented method");
            }
        });
        Object.defineProperty(BaseType.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                return type === this;
            }
        });
        Object.defineProperty(BaseType.prototype, "validate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var node = getStateTreeNodeSafe(value);
                if (node) {
                    var valueType = getType(value);
                    return this.isAssignableFrom(valueType)
                        ? typeCheckSuccess()
                        : typeCheckFailure(context, value);
                    // it is tempting to compare snapshots, but in that case we should always clone on assignments...
                }
                return this.isValidSnapshot(value, context);
            }
        });
        Object.defineProperty(BaseType.prototype, "is", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (thing) {
                return this.validate(thing, [{ path: "", type: this }]).length === 0;
            }
        });
        Object.defineProperty(BaseType.prototype, "Type", {
            get: function () {
                // istanbul ignore next
                throw fail$1("Factory.Type should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.Type`");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseType.prototype, "TypeWithoutSTN", {
            get: function () {
                // istanbul ignore next
                throw fail$1("Factory.TypeWithoutSTN should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.TypeWithoutSTN`");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseType.prototype, "SnapshotType", {
            get: function () {
                // istanbul ignore next
                throw fail$1("Factory.SnapshotType should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.SnapshotType`");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseType.prototype, "CreationType", {
            get: function () {
                // istanbul ignore next
                throw fail$1("Factory.CreationType should not be actually called. It is just a Type signature that can be used at compile time with Typescript, by using `typeof type.CreationType`");
            },
            enumerable: false,
            configurable: true
        });
        return BaseType;
    }());
    _a = $type;
    BaseType.prototype.create = action(BaseType.prototype.create);
    /**
     * A complex type produces a MST node (Node in the state tree)
     *
     * @internal
     * @hidden
     */
    var ComplexType = /** @class */ (function (_super) {
        __extends(ComplexType, _super);
        function ComplexType(name) {
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "identifierAttribute", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            return _this;
        }
        Object.defineProperty(ComplexType.prototype, "create", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot, environment) {
                if (snapshot === void 0) { snapshot = this.getDefaultSnapshot(); }
                return _super.prototype.create.call(this, snapshot, environment);
            }
        });
        Object.defineProperty(ComplexType.prototype, "getValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                node.createObservableInstanceIfNeeded();
                return node.storedValue;
            }
        });
        Object.defineProperty(ComplexType.prototype, "isMatchingSnapshotId", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, snapshot) {
                return (!current.identifierAttribute ||
                    current.identifier ===
                        normalizeIdentifier(snapshot[current.identifierAttribute]));
            }
        });
        Object.defineProperty(ComplexType.prototype, "tryToReconcileNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue) {
                if (current.isDetaching)
                    return false;
                if (current.snapshot === newValue) {
                    // newValue is the current snapshot of the node, noop
                    return true;
                }
                if (isStateTreeNode(newValue) && getStateTreeNode(newValue) === current) {
                    // the current node is the same as the new one
                    return true;
                }
                if (current.type === this &&
                    isMutable(newValue) &&
                    !isStateTreeNode(newValue) &&
                    this.isMatchingSnapshotId(current, newValue)) {
                    // the newValue has no node, so can be treated like a snapshot
                    // we can reconcile
                    current.applySnapshot(newValue);
                    return true;
                }
                return false;
            }
        });
        Object.defineProperty(ComplexType.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                var nodeReconciled = this.tryToReconcileNode(current, newValue);
                if (nodeReconciled) {
                    current.setParent(parent, subpath);
                    return current;
                }
                // current node cannot be recycled in any way
                current.die(); // noop if detaching
                // attempt to reuse the new one
                if (isStateTreeNode(newValue) && this.isAssignableFrom(getType(newValue))) {
                    // newValue is a Node as well, move it here..
                    var newNode = getStateTreeNode(newValue);
                    newNode.setParent(parent, subpath);
                    return newNode;
                }
                // nothing to do, we have to create a new node
                return this.instantiate(parent, subpath, undefined, newValue);
            }
        });
        Object.defineProperty(ComplexType.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return null;
            }
        });
        return ComplexType;
    }(BaseType));
    ComplexType.prototype.create = action(ComplexType.prototype.create);
    /**
     * @internal
     * @hidden
     */
    var SimpleType = /** @class */ (function (_super) {
        __extends(SimpleType, _super);
        function SimpleType() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SimpleType.prototype, "createNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot) {
                return snapshot;
            }
        });
        Object.defineProperty(SimpleType.prototype, "getValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                // if we ever find a case where scalar nodes can be accessed without iterating through its parent
                // uncomment this to make sure the parent chain is created when this is accessed
                // if (node.parent) {
                //     node.parent.createObservableInstanceIfNeeded()
                // }
                return node.storedValue;
            }
        });
        Object.defineProperty(SimpleType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                return node.storedValue;
            }
        });
        Object.defineProperty(SimpleType.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                // reconcile only if type and value are still the same, and only if the node is not detaching
                if (!current.isDetaching && current.type === this && current.storedValue === newValue) {
                    return current;
                }
                var res = this.instantiate(parent, subpath, undefined, newValue);
                current.die(); // noop if detaching
                return res;
            }
        });
        Object.defineProperty(SimpleType.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return null;
            }
        });
        return SimpleType;
    }(BaseType));
    /**
     * Returns if a given value represents a type.
     *
     * @param value Value to check.
     * @returns `true` if the value is a type.
     */
    function isType(value) {
        return typeof value === "object" && value && value.isType === true;
    }

    /** @class */ ((function () {
        function RunningAction(hooks, call) {
            Object.defineProperty(this, "hooks", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: hooks
            });
            Object.defineProperty(this, "call", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: call
            });
            Object.defineProperty(this, "flowsPending", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0
            });
            Object.defineProperty(this, "running", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            });
            if (hooks) {
                hooks.onStart(call);
            }
        }
        Object.defineProperty(RunningAction.prototype, "finish", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (error) {
                if (this.running) {
                    this.running = false;
                    if (this.hooks) {
                        this.hooks.onFinish(this.call, error);
                    }
                }
            }
        });
        Object.defineProperty(RunningAction.prototype, "incFlowsPending", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.flowsPending++;
            }
        });
        Object.defineProperty(RunningAction.prototype, "decFlowsPending", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.flowsPending--;
            }
        });
        Object.defineProperty(RunningAction.prototype, "hasFlowsPending", {
            get: function () {
                return this.flowsPending > 0;
            },
            enumerable: false,
            configurable: true
        });
        return RunningAction;
    })());

    var nextActionId = 1;
    var currentActionContext;
    /**
     * @internal
     * @hidden
     */
    function getCurrentActionContext() {
        return currentActionContext;
    }
    /**
     * @internal
     * @hidden
     */
    function getNextActionId() {
        return nextActionId++;
    }
    // TODO: optimize away entire action context if there is no middleware in tree?
    /**
     * @internal
     * @hidden
     */
    function runWithActionContext(context, fn) {
        var node = getStateTreeNode(context.context);
        if (context.type === "action") {
            node.assertAlive({
                actionContext: context
            });
        }
        var baseIsRunningAction = node._isRunningAction;
        node._isRunningAction = true;
        var previousContext = currentActionContext;
        currentActionContext = context;
        try {
            return runMiddleWares(node, context, fn);
        }
        finally {
            currentActionContext = previousContext;
            node._isRunningAction = baseIsRunningAction;
        }
    }
    /**
     * @internal
     * @hidden
     */
    function getParentActionContext(parentContext) {
        if (!parentContext)
            return undefined;
        if (parentContext.type === "action")
            return parentContext;
        return parentContext.parentActionEvent;
    }
    /**
     * @internal
     * @hidden
     */
    function createActionInvoker(target, name, fn) {
        var res = function () {
            var id = getNextActionId();
            var parentContext = currentActionContext;
            var parentActionContext = getParentActionContext(parentContext);
            return runWithActionContext({
                type: "action",
                name: name,
                id: id,
                args: argsToArray(arguments),
                context: target,
                tree: getRoot(target),
                rootId: parentContext ? parentContext.rootId : id,
                parentId: parentContext ? parentContext.id : 0,
                allParentIds: parentContext
                    ? __spread(parentContext.allParentIds, [parentContext.id]) : [],
                parentEvent: parentContext,
                parentActionEvent: parentActionContext
            }, fn);
        };
        res._isMSTAction = true;
        return res;
    }
    var CollectedMiddlewares = /** @class */ (function () {
        function CollectedMiddlewares(node, fn) {
            Object.defineProperty(this, "arrayIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0
            });
            Object.defineProperty(this, "inArrayIndex", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0
            });
            Object.defineProperty(this, "middlewares", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            // we just push middleware arrays into an array of arrays to avoid making copies
            if (fn.$mst_middleware) {
                this.middlewares.push(fn.$mst_middleware);
            }
            var n = node;
            // Find all middlewares. Optimization: cache this?
            while (n) {
                if (n.middlewares)
                    this.middlewares.push(n.middlewares);
                n = n.parent;
            }
        }
        Object.defineProperty(CollectedMiddlewares.prototype, "isEmpty", {
            get: function () {
                return this.middlewares.length <= 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CollectedMiddlewares.prototype, "getNextMiddleware", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var array = this.middlewares[this.arrayIndex];
                if (!array)
                    return undefined;
                var item = array[this.inArrayIndex++];
                if (!item) {
                    this.arrayIndex++;
                    this.inArrayIndex = 0;
                    return this.getNextMiddleware();
                }
                return item;
            }
        });
        return CollectedMiddlewares;
    }());
    function runMiddleWares(node, baseCall, originalFn) {
        var middlewares = new CollectedMiddlewares(node, originalFn);
        // Short circuit
        if (middlewares.isEmpty)
            return action(originalFn).apply(null, baseCall.args);
        var result = null;
        function runNextMiddleware(call) {
            var middleware = middlewares.getNextMiddleware();
            var handler = middleware && middleware.handler;
            if (!handler) {
                return action(originalFn).apply(null, call.args);
            }
            // skip hooks if asked to
            if (!middleware.includeHooks && Hook[call.name]) {
                return runNextMiddleware(call);
            }
            function next(call2, callback) {
                // the result can contain
                // - the non manipulated return value from an action
                // - the non manipulated abort value
                // - one of the above but manipulated through the callback function
                result = runNextMiddleware(call2);
                if (callback) {
                    result = callback(result);
                }
            }
            function abort(value) {
                // overwrite the result
                // can be manipulated through middlewares earlier in the queue using the callback fn
                result = value;
            }
            handler(call, next, abort);
            return result;
        }
        return runNextMiddleware(baseCall);
    }

    function safeStringify(value) {
        try {
            return JSON.stringify(value);
        }
        catch (e) {
            // istanbul ignore next
            return "<Unserializable: " + e + ">";
        }
    }
    /**
     * @internal
     * @hidden
     */
    function prettyPrintValue(value) {
        return typeof value === "function"
            ? "<function" + (value.name ? " " + value.name : "") + ">"
            : isStateTreeNode(value)
                ? "<" + value + ">"
                : "`" + safeStringify(value) + "`";
    }
    function shortenPrintValue(valueInString) {
        return valueInString.length < 280
            ? valueInString
            : valueInString.substring(0, 272) + "......" + valueInString.substring(valueInString.length - 8);
    }
    function toErrorString(error) {
        var value = error.value;
        var type = error.context[error.context.length - 1].type;
        var fullPath = error.context
            .map(function (_a) {
            var path = _a.path;
            return path;
        })
            .filter(function (path) { return path.length > 0; })
            .join("/");
        var pathPrefix = fullPath.length > 0 ? "at path \"/" + fullPath + "\" " : "";
        var currentTypename = isStateTreeNode(value)
            ? "value of type " + getStateTreeNode(value).type.name + ":"
            : isPrimitive(value)
                ? "value"
                : "snapshot";
        var isSnapshotCompatible = type && isStateTreeNode(value) && type.is(getStateTreeNode(value).snapshot);
        return ("" + pathPrefix + currentTypename + " " + prettyPrintValue(value) + " is not assignable " + (type ? "to type: `" + type.name + "`" : "") +
            (error.message ? " (" + error.message + ")" : "") +
            (type
                ? isPrimitiveType(type) || isPrimitive(value)
                    ? "."
                    : ", expected an instance of `" + type.name + "` or a snapshot like `" + type.describe() + "` instead." +
                        (isSnapshotCompatible
                            ? " (Note that a snapshot of the provided value is compatible with the targeted type)"
                            : "")
                : "."));
    }
    /**
     * @internal
     * @hidden
     */
    function getContextForPath(context, path, type) {
        return context.concat([{ path: path, type: type }]);
    }
    /**
     * @internal
     * @hidden
     */
    function typeCheckSuccess() {
        return EMPTY_ARRAY;
    }
    /**
     * @internal
     * @hidden
     */
    function typeCheckFailure(context, value, message) {
        return [{ context: context, value: value, message: message }];
    }
    /**
     * @internal
     * @hidden
     */
    function flattenTypeErrors(errors) {
        return errors.reduce(function (a, i) { return a.concat(i); }, []);
    }
    // TODO; doublecheck: typecheck should only needed to be invoked from: type.create and array / map / value.property will change
    /**
     * @internal
     * @hidden
     */
    function typecheckInternal(type, value) {
        // runs typeChecking if it is in dev-mode or through a process.env.ENABLE_TYPE_CHECK flag
        if (isTypeCheckingEnabled()) {
            typecheck(type, value);
        }
    }
    /**
     * Run's the typechecker for the given type on the given value, which can be a snapshot or an instance.
     * Throws if the given value is not according the provided type specification.
     * Use this if you need typechecks even in a production build (by default all automatic runtime type checks will be skipped in production builds)
     *
     * @param type Type to check against.
     * @param value Value to be checked, either a snapshot or an instance.
     */
    function typecheck(type, value) {
        var errors = type.validate(value, [{ path: "", type: type }]);
        if (errors.length > 0) {
            throw fail$1(validationErrorsToString(type, value, errors));
        }
    }
    function validationErrorsToString(type, value, errors) {
        if (errors.length === 0) {
            return undefined;
        }
        return ("Error while converting " + shortenPrintValue(prettyPrintValue(value)) + " to `" + type.name + "`:\n\n    " + errors.map(toErrorString).join("\n    "));
    }

    var identifierCacheId = 0;
    /**
     * @internal
     * @hidden
     */
    var IdentifierCache = /** @class */ (function () {
        function IdentifierCache() {
            Object.defineProperty(this, "cacheId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: identifierCacheId++
            });
            // n.b. in cache all identifiers are normalized to strings
            Object.defineProperty(this, "cache", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: observable.map()
            });
            // last time the cache (array) for a given time changed
            // n.b. it is not really the time, but just an integer that gets increased after each modification to the array
            Object.defineProperty(this, "lastCacheModificationPerId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: observable.map()
            });
        }
        Object.defineProperty(IdentifierCache.prototype, "updateLastCacheModificationPerId", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (identifier) {
                var lcm = this.lastCacheModificationPerId.get(identifier);
                // we start at 1 since 0 means no update since cache creation
                this.lastCacheModificationPerId.set(identifier, lcm === undefined ? 1 : lcm + 1);
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "getLastCacheModificationPerId", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (identifier) {
                var modificationId = this.lastCacheModificationPerId.get(identifier) || 0;
                return this.cacheId + "-" + modificationId;
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "addNodeToCache", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, lastCacheUpdate) {
                if (lastCacheUpdate === void 0) { lastCacheUpdate = true; }
                if (node.identifierAttribute) {
                    var identifier = node.identifier;
                    if (!this.cache.has(identifier)) {
                        this.cache.set(identifier, observable.array([], mobxShallow));
                    }
                    var set = this.cache.get(identifier);
                    if (set.indexOf(node) !== -1)
                        throw fail$1("Already registered");
                    set.push(node);
                    if (lastCacheUpdate) {
                        this.updateLastCacheModificationPerId(identifier);
                    }
                }
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "mergeCache", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                var _this = this;
                values(node.identifierCache.cache).forEach(function (nodes) {
                    return nodes.forEach(function (child) {
                        _this.addNodeToCache(child);
                    });
                });
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "notifyDied", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                if (node.identifierAttribute) {
                    var id = node.identifier;
                    var set = this.cache.get(id);
                    if (set) {
                        set.remove(node);
                        // remove empty sets from cache
                        if (!set.length) {
                            this.cache.delete(id);
                        }
                        this.updateLastCacheModificationPerId(node.identifier);
                    }
                }
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "splitCache", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                var _this = this;
                var res = new IdentifierCache();
                var basePath = node.path;
                entries(this.cache).forEach(function (_a) {
                    var _b = __read(_a, 2), id = _b[0], nodes = _b[1];
                    var modified = false;
                    for (var i = nodes.length - 1; i >= 0; i--) {
                        if (nodes[i].path.indexOf(basePath) === 0) {
                            res.addNodeToCache(nodes[i], false); // no need to update lastUpdated since it is a whole new cache
                            nodes.splice(i, 1);
                            modified = true;
                        }
                    }
                    if (modified) {
                        _this.updateLastCacheModificationPerId(id);
                    }
                });
                return res;
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "has", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type, identifier) {
                var set = this.cache.get(identifier);
                if (!set)
                    return false;
                return set.some(function (candidate) { return type.isAssignableFrom(candidate.type); });
            }
        });
        Object.defineProperty(IdentifierCache.prototype, "resolve", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type, identifier) {
                var set = this.cache.get(identifier);
                if (!set)
                    return null;
                var matches = set.filter(function (candidate) { return type.isAssignableFrom(candidate.type); });
                switch (matches.length) {
                    case 0:
                        return null;
                    case 1:
                        return matches[0];
                    default:
                        throw fail$1("Cannot resolve a reference to type '" + type.name + "' with id: '" + identifier + "' unambigously, there are multiple candidates: " + matches
                            .map(function (n) { return n.path; })
                            .join(", "));
                }
            }
        });
        return IdentifierCache;
    }());

    /**
     * @internal
     * @hidden
     */
    function createObjectNode(type, parent, subpath, environment, initialValue) {
        var existingNode = getStateTreeNodeSafe(initialValue);
        if (existingNode) {
            if (existingNode.parent) {
                // istanbul ignore next
                throw fail$1("Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" + (parent ? parent.path : "") + "/" + subpath + "', but it lives already at '" + existingNode.path + "'");
            }
            if (parent) {
                existingNode.setParent(parent, subpath);
            }
            // else it already has no parent since it is a pre-requisite
            return existingNode;
        }
        // not a node, a snapshot
        return new ObjectNode(type, parent, subpath, environment, initialValue);
    }
    /**
     * @internal
     * @hidden
     */
    function createScalarNode(type, parent, subpath, environment, initialValue) {
        return new ScalarNode(type, parent, subpath, environment, initialValue);
    }
    /**
     * @internal
     * @hidden
     */
    function isNode(value) {
        return value instanceof ScalarNode || value instanceof ObjectNode;
    }

    /**
     * @internal
     * @hidden
     */
    var NodeLifeCycle;
    (function (NodeLifeCycle) {
        NodeLifeCycle[NodeLifeCycle["INITIALIZING"] = 0] = "INITIALIZING";
        NodeLifeCycle[NodeLifeCycle["CREATED"] = 1] = "CREATED";
        NodeLifeCycle[NodeLifeCycle["FINALIZED"] = 2] = "FINALIZED";
        NodeLifeCycle[NodeLifeCycle["DETACHING"] = 3] = "DETACHING";
        NodeLifeCycle[NodeLifeCycle["DEAD"] = 4] = "DEAD"; // no coming back from this one
    })(NodeLifeCycle || (NodeLifeCycle = {}));
    /**
     * Returns true if the given value is a node in a state tree.
     * More precisely, that is, if the value is an instance of a
     * `types.model`, `types.array` or `types.map`.
     *
     * @param value
     * @returns true if the value is a state tree node.
     */
    function isStateTreeNode(value) {
        return !!(value && value.$treenode);
    }
    /**
     * @internal
     * @hidden
     */
    function getStateTreeNode(value) {
        if (!isStateTreeNode(value)) {
            // istanbul ignore next
            throw fail$1("Value " + value + " is no MST Node");
        }
        return value.$treenode;
    }
    /**
     * @internal
     * @hidden
     */
    function getStateTreeNodeSafe(value) {
        return (value && value.$treenode) || null;
    }
    /**
     * @internal
     * @hidden
     */
    function toJSON() {
        return getStateTreeNode(this).snapshot;
    }
    /**
     * @internal
     * @hidden
     */
    function resolveNodeByPathParts(base, pathParts, failIfResolveFails) {
        if (failIfResolveFails === void 0) { failIfResolveFails = true; }
        var current = base;
        for (var i = 0; i < pathParts.length; i++) {
            var part = pathParts[i];
            if (part === "..") {
                current = current.parent;
                if (current)
                    continue; // not everything has a parent
            }
            else if (part === ".") {
                continue;
            }
            else if (current) {
                if (current instanceof ScalarNode) {
                    // check if the value of a scalar resolves to a state tree node (e.g. references)
                    // then we can continue resolving...
                    try {
                        var value = current.value;
                        if (isStateTreeNode(value)) {
                            current = getStateTreeNode(value);
                            // fall through
                        }
                    }
                    catch (e) {
                        if (!failIfResolveFails) {
                            return undefined;
                        }
                        throw e;
                    }
                }
                if (current instanceof ObjectNode) {
                    var subType = current.getChildType(part);
                    if (subType) {
                        current = current.getChildNode(part);
                        if (current)
                            continue;
                    }
                }
            }
            if (failIfResolveFails)
                throw fail$1("Could not resolve '" + part + "' in path '" + (joinJsonPath(pathParts.slice(0, i)) || "/") + "' while resolving '" + joinJsonPath(pathParts) + "'");
            else
                return undefined;
        }
        return current;
    }
    /**
     * @internal
     * @hidden
     */
    function convertChildNodesToArray(childNodes) {
        if (!childNodes)
            return EMPTY_ARRAY;
        var keys = Object.keys(childNodes);
        if (!keys.length)
            return EMPTY_ARRAY;
        var result = new Array(keys.length);
        keys.forEach(function (key, index) {
            result[index] = childNodes[key];
        });
        return result;
    }

    var plainObjectString = Object.toString();
    /**
     * @internal
     * @hidden
     */
    var EMPTY_ARRAY = Object.freeze([]);
    /**
     * @internal
     * @hidden
     */
    var EMPTY_OBJECT = Object.freeze({});
    /**
     * @internal
     * @hidden
     */
    var mobxShallow = getGlobalState().useProxies
        ? { deep: false }
        : { deep: false, proxy: false };
    Object.freeze(mobxShallow);
    /**
     * @internal
     * @hidden
     */
    function fail$1(message) {
        if (message === void 0) { message = "Illegal state"; }
        return new Error("[mobx-state-tree] " + message);
    }
    /**
     * @internal
     * @hidden
     */
    function identity(_) {
        return _;
    }
    /**
     * pollyfill (for IE) suggested in MDN:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
     * @internal
     * @hidden
     */
    var isInteger = Number.isInteger ||
        function (value) {
            return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
        };
    /**
     * @internal
     * @hidden
     */
    function isArray(val) {
        return Array.isArray(val) || isObservableArray(val);
    }
    /**
     * @internal
     * @hidden
     */
    function asArray(val) {
        if (!val)
            return EMPTY_ARRAY;
        if (isArray(val))
            return val;
        return [val];
    }
    /**
     * @internal
     * @hidden
     */
    function extend(a) {
        var b = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            b[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < b.length; i++) {
            var current = b[i];
            for (var key in current)
                a[key] = current[key];
        }
        return a;
    }
    /**
     * @internal
     * @hidden
     */
    function isPlainObject(value) {
        var _a;
        if (value === null || typeof value !== "object")
            return false;
        var proto = Object.getPrototypeOf(value);
        if (proto == null)
            return true;
        return ((_a = proto.constructor) === null || _a === void 0 ? void 0 : _a.toString()) === plainObjectString;
    }
    /**
     * @internal
     * @hidden
     */
    function isMutable(value) {
        return (value !== null &&
            typeof value === "object" &&
            !(value instanceof Date) &&
            !(value instanceof RegExp));
    }
    /**
     * @internal
     * @hidden
     */
    function isPrimitive(value, includeDate) {
        if (includeDate === void 0) { includeDate = true; }
        return (value === null ||
            value === undefined ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            (includeDate && value instanceof Date));
    }
    /**
     * @internal
     * @hidden
     * Freeze a value and return it (if not in production)
     */
    function freeze(value) {
        return value;
    }
    /**
     * @internal
     * @hidden
     * Recursively freeze a value (if not in production)
     */
    function deepFreeze(value) {
        return value;
    }
    /**
     * @internal
     * @hidden
     */
    function isSerializable(value) {
        return typeof value !== "function";
    }
    /**
     * @internal
     * @hidden
     */
    function defineProperty(object, key, descriptor) {
        isObservableObject(object)
            ? apiDefineProperty(object, key, descriptor)
            : Object.defineProperty(object, key, descriptor);
    }
    /**
     * @internal
     * @hidden
     */
    function addHiddenFinalProp(object, propName, value) {
        defineProperty(object, propName, {
            enumerable: false,
            writable: false,
            configurable: true,
            value: value
        });
    }
    /**
     * @internal
     * @hidden
     */
    var EventHandler = /** @class */ (function () {
        function EventHandler() {
            Object.defineProperty(this, "handlers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
        }
        Object.defineProperty(EventHandler.prototype, "hasSubscribers", {
            get: function () {
                return this.handlers.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EventHandler.prototype, "register", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn, atTheBeginning) {
                var _this = this;
                if (atTheBeginning === void 0) { atTheBeginning = false; }
                if (atTheBeginning) {
                    this.handlers.unshift(fn);
                }
                else {
                    this.handlers.push(fn);
                }
                return function () {
                    _this.unregister(fn);
                };
            }
        });
        Object.defineProperty(EventHandler.prototype, "has", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                return this.handlers.indexOf(fn) >= 0;
            }
        });
        Object.defineProperty(EventHandler.prototype, "unregister", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                var index = this.handlers.indexOf(fn);
                if (index >= 0) {
                    this.handlers.splice(index, 1);
                }
            }
        });
        Object.defineProperty(EventHandler.prototype, "clear", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.handlers.length = 0;
            }
        });
        Object.defineProperty(EventHandler.prototype, "emit", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // make a copy just in case it changes
                var handlers = this.handlers.slice();
                handlers.forEach(function (f) { return f.apply(void 0, __spread(args)); });
            }
        });
        return EventHandler;
    }());
    /**
     * @internal
     * @hidden
     */
    var EventHandlers = /** @class */ (function () {
        function EventHandlers() {
            Object.defineProperty(this, "eventHandlers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(EventHandlers.prototype, "hasSubscribers", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                var handler = this.eventHandlers && this.eventHandlers[event];
                return !!handler && handler.hasSubscribers;
            }
        });
        Object.defineProperty(EventHandlers.prototype, "register", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, fn, atTheBeginning) {
                if (atTheBeginning === void 0) { atTheBeginning = false; }
                if (!this.eventHandlers) {
                    this.eventHandlers = {};
                }
                var handler = this.eventHandlers[event];
                if (!handler) {
                    handler = this.eventHandlers[event] = new EventHandler();
                }
                return handler.register(fn, atTheBeginning);
            }
        });
        Object.defineProperty(EventHandlers.prototype, "has", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, fn) {
                var handler = this.eventHandlers && this.eventHandlers[event];
                return !!handler && handler.has(fn);
            }
        });
        Object.defineProperty(EventHandlers.prototype, "unregister", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event, fn) {
                var handler = this.eventHandlers && this.eventHandlers[event];
                if (handler) {
                    handler.unregister(fn);
                }
            }
        });
        Object.defineProperty(EventHandlers.prototype, "clear", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                if (this.eventHandlers) {
                    delete this.eventHandlers[event];
                }
            }
        });
        Object.defineProperty(EventHandlers.prototype, "clearAll", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                this.eventHandlers = undefined;
            }
        });
        Object.defineProperty(EventHandlers.prototype, "emit", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (event) {
                var _a;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var handler = this.eventHandlers && this.eventHandlers[event];
                if (handler) {
                    (_a = handler).emit.apply(_a, __spread(args));
                }
            }
        });
        return EventHandlers;
    }());
    /**
     * @internal
     * @hidden
     */
    function argsToArray(args) {
        var res = new Array(args.length);
        for (var i = 0; i < args.length; i++)
            res[i] = args[i];
        return res;
    }
    /**
     * @internal
     * @hidden
     */
    function stringStartsWith(str, beginning) {
        return str.indexOf(beginning) === 0;
    }
    /**
     * @internal
     * @hidden
     */
    function warnError(msg) {
        console.warn(new Error("[mobx-state-tree] " + msg));
    }
    /**
     * @internal
     * @hidden
     */
    function isTypeCheckingEnabled() {
        return ((typeof process !== "undefined" && process.env && process.env.ENABLE_TYPE_CHECK === "true"));
    }

    /**
     * @internal
     * @hidden
     */
    function splitPatch(patch) {
        if (!("oldValue" in patch))
            throw fail$1("Patches without `oldValue` field cannot be inversed");
        return [stripPatch(patch), invertPatch(patch)];
    }
    /**
     * @internal
     * @hidden
     */
    function stripPatch(patch) {
        // strips `oldvalue` information from the patch, so that it becomes a patch conform the json-patch spec
        // this removes the ability to undo the patch
        switch (patch.op) {
            case "add":
                return { op: "add", path: patch.path, value: patch.value };
            case "remove":
                return { op: "remove", path: patch.path };
            case "replace":
                return { op: "replace", path: patch.path, value: patch.value };
        }
    }
    function invertPatch(patch) {
        switch (patch.op) {
            case "add":
                return {
                    op: "remove",
                    path: patch.path
                };
            case "remove":
                return {
                    op: "add",
                    path: patch.path,
                    value: patch.oldValue
                };
            case "replace":
                return {
                    op: "replace",
                    path: patch.path,
                    value: patch.oldValue
                };
        }
    }
    /**
     * Simple simple check to check it is a number.
     */
    function isNumber(x) {
        return typeof x === "number";
    }
    /**
     * Escape slashes and backslashes.
     *
     * http://tools.ietf.org/html/rfc6901
     */
    function escapeJsonPath(path) {
        if (isNumber(path) === true) {
            return "" + path;
        }
        if (path.indexOf("/") === -1 && path.indexOf("~") === -1)
            return path;
        return path.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    /**
     * Unescape slashes and backslashes.
     */
    function unescapeJsonPath(path) {
        return path.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    /**
     * Generates a json-path compliant json path from path parts.
     *
     * @param path
     * @returns
     */
    function joinJsonPath(path) {
        // `/` refers to property with an empty name, while `` refers to root itself!
        if (path.length === 0)
            return "";
        var getPathStr = function (p) { return p.map(escapeJsonPath).join("/"); };
        if (path[0] === "." || path[0] === "..") {
            // relative
            return getPathStr(path);
        }
        else {
            // absolute
            return "/" + getPathStr(path);
        }
    }
    /**
     * Splits and decodes a json path into several parts.
     *
     * @param path
     * @returns
     */
    function splitJsonPath(path) {
        // `/` refers to property with an empty name, while `` refers to root itself!
        var parts = path.split("/").map(unescapeJsonPath);
        var valid = path === "" ||
            path === "." ||
            path === ".." ||
            stringStartsWith(path, "/") ||
            stringStartsWith(path, "./") ||
            stringStartsWith(path, "../");
        if (!valid) {
            throw fail$1("a json path must be either rooted, empty or relative, but got '" + path + "'");
        }
        // '/a/b/c' -> ["a", "b", "c"]
        // '../../b/c' -> ["..", "..", "b", "c"]
        // '' -> []
        // '/' -> ['']
        // './a' -> [".", "a"]
        // /./a' -> [".", "a"] equivalent to './a'
        if (parts[0] === "") {
            parts.shift();
        }
        return parts;
    }

    /** @hidden */
    var $preProcessorFailed = Symbol("$preProcessorFailed");
    var SnapshotProcessor = /** @class */ (function (_super) {
        __extends(SnapshotProcessor, _super);
        function SnapshotProcessor(_subtype, _processors, name) {
            var _this = _super.call(this, name || _subtype.name) || this;
            Object.defineProperty(_this, "_subtype", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _subtype
            });
            Object.defineProperty(_this, "_processors", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _processors
            });
            return _this;
        }
        Object.defineProperty(SnapshotProcessor.prototype, "flags", {
            get: function () {
                return this._subtype.flags | TypeFlags.SnapshotProcessor;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SnapshotProcessor.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "snapshotProcessor(" + this._subtype.describe() + ")";
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "preProcessSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (sn) {
                if (this._processors.preProcessor) {
                    return this._processors.preProcessor.call(null, sn);
                }
                return sn;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "preProcessSnapshotSafe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (sn) {
                try {
                    return this.preProcessSnapshot(sn);
                }
                catch (e) {
                    return $preProcessorFailed;
                }
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "postProcessSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (sn) {
                if (this._processors.postProcessor) {
                    return this._processors.postProcessor.call(null, sn);
                }
                return sn;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "_fixNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                var _this = this;
                // the node has to use these methods rather than the original type ones
                proxyNodeTypeMethods(node.type, this, "create");
                var oldGetSnapshot = node.getSnapshot;
                node.getSnapshot = function () {
                    return _this.postProcessSnapshot(oldGetSnapshot.call(node));
                };
                node.getReconciliationType = function () {
                    return _this;
                };
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                var processedInitialValue = isStateTreeNode(initialValue)
                    ? initialValue
                    : this.preProcessSnapshot(initialValue);
                var node = this._subtype.instantiate(parent, subpath, environment, processedInitialValue);
                this._fixNode(node);
                return node;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                var node = this._subtype.reconcile(current, isStateTreeNode(newValue) ? newValue : this.preProcessSnapshot(newValue), parent, subpath);
                if (node !== current) {
                    this._fixNode(node);
                }
                return node;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, applyPostProcess) {
                if (applyPostProcess === void 0) { applyPostProcess = true; }
                var sn = this._subtype.getSnapshot(node);
                return applyPostProcess ? this.postProcessSnapshot(sn) : sn;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var processedSn = this.preProcessSnapshotSafe(value);
                if (processedSn === $preProcessorFailed) {
                    return typeCheckFailure(context, value, "Failed to preprocess value");
                }
                return this._subtype.validate(processedSn, context);
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subtype;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "is", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (thing) {
                var value = isType(thing)
                    ? this._subtype
                    : isStateTreeNode(thing)
                        ? getSnapshot(thing, false)
                        : this.preProcessSnapshotSafe(thing);
                if (value === $preProcessorFailed) {
                    return false;
                }
                return this._subtype.validate(value, [{ path: "", type: this._subtype }]).length === 0;
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                return this._subtype.isAssignableFrom(type);
            }
        });
        Object.defineProperty(SnapshotProcessor.prototype, "isMatchingSnapshotId", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, snapshot) {
                if (!(this._subtype instanceof ComplexType)) {
                    return false;
                }
                var processedSn = this.preProcessSnapshot(snapshot);
                return this._subtype.isMatchingSnapshotId(current, processedSn);
            }
        });
        return SnapshotProcessor;
    }(BaseType));
    function proxyNodeTypeMethods(nodeType, snapshotProcessorType) {
        var e_1, _a;
        var methods = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            methods[_i - 2] = arguments[_i];
        }
        try {
            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                var method = methods_1_1.value;
                nodeType[method] = snapshotProcessorType[method].bind(snapshotProcessorType);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (methods_1_1 && !methods_1_1.done && (_a = methods_1.return)) _a.call(methods_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    /**
     * `types.snapshotProcessor` - Runs a pre/post snapshot processor before/after serializing a given type.
     *
     * Example:
     * ```ts
     * const Todo1 = types.model({ text: types.string })
     * // in the backend the text type must be null when empty
     * interface BackendTodo {
     *     text: string | null
     * }
     * const Todo2 = types.snapshotProcessor(Todo1, {
     *     // from snapshot to instance
     *     preProcessor(sn: BackendTodo) {
     *         return {
     *             text: sn.text || "";
     *         }
     *     },
     *     // from instance to snapshot
     *     postProcessor(sn): BackendTodo {
     *         return {
     *             text: !sn.text ? null : sn.text
     *         }
     *     }
     * })
     * ```
     *
     * @param type Type to run the processors over.
     * @param processors Processors to run.
     * @param name Type name, or undefined to inherit the inner type one.
     * @returns
     */
    function snapshotProcessor(type, processors, name) {
        return new SnapshotProcessor(type, processors, name);
    }

    var needsIdentifierError = "Map.put can only be used to store complex values that have an identifier type attribute";
    function tryCollectModelTypes(type, modelTypes) {
        var e_1, _a;
        var subtypes = type.getSubTypes();
        if (subtypes === cannotDetermineSubtype) {
            return false;
        }
        if (subtypes) {
            var subtypesArray = asArray(subtypes);
            try {
                for (var subtypesArray_1 = __values(subtypesArray), subtypesArray_1_1 = subtypesArray_1.next(); !subtypesArray_1_1.done; subtypesArray_1_1 = subtypesArray_1.next()) {
                    var subtype = subtypesArray_1_1.value;
                    if (!tryCollectModelTypes(subtype, modelTypes))
                        return false;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (subtypesArray_1_1 && !subtypesArray_1_1.done && (_a = subtypesArray_1.return)) _a.call(subtypesArray_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (type instanceof ModelType) {
            modelTypes.push(type);
        }
        return true;
    }
    /**
     * @internal
     * @hidden
     */
    var MapIdentifierMode;
    (function (MapIdentifierMode) {
        MapIdentifierMode[MapIdentifierMode["UNKNOWN"] = 0] = "UNKNOWN";
        MapIdentifierMode[MapIdentifierMode["YES"] = 1] = "YES";
        MapIdentifierMode[MapIdentifierMode["NO"] = 2] = "NO";
    })(MapIdentifierMode || (MapIdentifierMode = {}));
    var MSTMap = /** @class */ (function (_super) {
        __extends(MSTMap, _super);
        function MSTMap(initialData) {
            return _super.call(this, initialData, observable.ref.enhancer) || this;
        }
        Object.defineProperty(MSTMap.prototype, "get", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key) {
                // maybe this is over-enthousiastic? normalize numeric keys to strings
                return _super.prototype.get.call(this, "" + key);
            }
        });
        Object.defineProperty(MSTMap.prototype, "has", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key) {
                return _super.prototype.has.call(this, "" + key);
            }
        });
        Object.defineProperty(MSTMap.prototype, "delete", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key) {
                return _super.prototype.delete.call(this, "" + key);
            }
        });
        Object.defineProperty(MSTMap.prototype, "set", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (key, value) {
                return _super.prototype.set.call(this, "" + key, value);
            }
        });
        Object.defineProperty(MSTMap.prototype, "put", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value) {
                if (!value)
                    throw fail$1("Map.put cannot be used to set empty values");
                if (isStateTreeNode(value)) {
                    var node = getStateTreeNode(value);
                    if (node.identifier === null) {
                        throw fail$1(needsIdentifierError);
                    }
                    this.set(node.identifier, value);
                    return value;
                }
                else if (!isMutable(value)) {
                    throw fail$1("Map.put can only be used to store complex values");
                }
                else {
                    var mapNode = getStateTreeNode(this);
                    var mapType = mapNode.type;
                    if (mapType.identifierMode !== MapIdentifierMode.YES) {
                        throw fail$1(needsIdentifierError);
                    }
                    var idAttr = mapType.mapIdentifierAttribute;
                    var id = value[idAttr];
                    if (!isValidIdentifier(id)) {
                        // try again but this time after creating a node for the value
                        // since it might be an optional identifier
                        var newNode = this.put(mapType.getChildType().create(value, mapNode.environment));
                        return this.put(getSnapshot(newNode));
                    }
                    var key = normalizeIdentifier(id);
                    this.set(key, value);
                    return this.get(key);
                }
            }
        });
        return MSTMap;
    }(ObservableMap));
    /**
     * @internal
     * @hidden
     */
    var MapType = /** @class */ (function (_super) {
        __extends(MapType, _super);
        function MapType(name, _subType, hookInitializers) {
            if (hookInitializers === void 0) { hookInitializers = []; }
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "_subType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _subType
            });
            Object.defineProperty(_this, "identifierMode", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: MapIdentifierMode.UNKNOWN
            });
            Object.defineProperty(_this, "mapIdentifierAttribute", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: undefined
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Map
            });
            Object.defineProperty(_this, "hookInitializers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            _this._determineIdentifierMode();
            _this.hookInitializers = hookInitializers;
            return _this;
        }
        Object.defineProperty(MapType.prototype, "hooks", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (hooks) {
                var hookInitializers = this.hookInitializers.length > 0 ? this.hookInitializers.concat(hooks) : [hooks];
                return new MapType(this.name, this._subType, hookInitializers);
            }
        });
        Object.defineProperty(MapType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                this._determineIdentifierMode();
                return createObjectNode(this, parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(MapType.prototype, "_determineIdentifierMode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                if (this.identifierMode !== MapIdentifierMode.UNKNOWN) {
                    return;
                }
                var modelTypes = [];
                if (tryCollectModelTypes(this._subType, modelTypes)) {
                    var identifierAttribute = modelTypes.reduce(function (current, type) {
                        if (!type.identifierAttribute)
                            return current;
                        if (current && current !== type.identifierAttribute) {
                            throw fail$1("The objects in a map should all have the same identifier attribute, expected '" + current + "', but child of type '" + type.name + "' declared attribute '" + type.identifierAttribute + "' as identifier");
                        }
                        return type.identifierAttribute;
                    }, undefined);
                    if (identifierAttribute) {
                        this.identifierMode = MapIdentifierMode.YES;
                        this.mapIdentifierAttribute = identifierAttribute;
                    }
                    else {
                        this.identifierMode = MapIdentifierMode.NO;
                    }
                }
            }
        });
        Object.defineProperty(MapType.prototype, "initializeChildNodes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (objNode, initialSnapshot) {
                if (initialSnapshot === void 0) { initialSnapshot = {}; }
                var subType = objNode.type._subType;
                var result = {};
                Object.keys(initialSnapshot).forEach(function (name) {
                    result[name] = subType.instantiate(objNode, name, undefined, initialSnapshot[name]);
                });
                return result;
            }
        });
        Object.defineProperty(MapType.prototype, "createNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNodes) {
                return new MSTMap(childNodes);
            }
        });
        Object.defineProperty(MapType.prototype, "finalizeNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, instance) {
                interceptReads(instance, node.unbox);
                var type = node.type;
                type.hookInitializers.forEach(function (initializer) {
                    var hooks = initializer(instance);
                    Object.keys(hooks).forEach(function (name) {
                        var hook = hooks[name];
                        var actionInvoker = createActionInvoker(instance, name, hook);
                        (addHiddenFinalProp )(instance, name, actionInvoker);
                    });
                });
                intercept(instance, this.willChange);
                observe(instance, this.didChange);
            }
        });
        Object.defineProperty(MapType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "Map<string, " + this._subType.describe() + ">";
            }
        });
        Object.defineProperty(MapType.prototype, "getChildren", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                // return (node.storedValue as ObservableMap<any>).values()
                return values(node.storedValue);
            }
        });
        Object.defineProperty(MapType.prototype, "getChildNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, key) {
                var childNode = node.storedValue.get("" + key);
                if (!childNode)
                    throw fail$1("Not a child " + key);
                return childNode;
            }
        });
        Object.defineProperty(MapType.prototype, "willChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (change) {
                var node = getStateTreeNode(change.object);
                var key = change.name;
                node.assertWritable({ subpath: key });
                var mapType = node.type;
                var subType = mapType._subType;
                switch (change.type) {
                    case "update":
                        {
                            var newValue = change.newValue;
                            var oldValue = change.object.get(key);
                            if (newValue === oldValue)
                                return null;
                            typecheckInternal(subType, newValue);
                            change.newValue = subType.reconcile(node.getChildNode(key), change.newValue, node, key);
                            mapType.processIdentifier(key, change.newValue);
                        }
                        break;
                    case "add":
                        {
                            typecheckInternal(subType, change.newValue);
                            change.newValue = subType.instantiate(node, key, undefined, change.newValue);
                            mapType.processIdentifier(key, change.newValue);
                        }
                        break;
                }
                return change;
            }
        });
        Object.defineProperty(MapType.prototype, "processIdentifier", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (expected, node) {
                if (this.identifierMode === MapIdentifierMode.YES && node instanceof ObjectNode) {
                    var identifier = node.identifier;
                    if (identifier !== expected)
                        throw fail$1("A map of objects containing an identifier should always store the object under their own identifier. Trying to store key '" + identifier + "', but expected: '" + expected + "'");
                }
            }
        });
        Object.defineProperty(MapType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                var res = {};
                node.getChildren().forEach(function (childNode) {
                    res[childNode.subpath] = childNode.snapshot;
                });
                return res;
            }
        });
        Object.defineProperty(MapType.prototype, "processInitialSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNodes) {
                var processed = {};
                Object.keys(childNodes).forEach(function (key) {
                    processed[key] = childNodes[key].getSnapshot();
                });
                return processed;
            }
        });
        Object.defineProperty(MapType.prototype, "didChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (change) {
                var node = getStateTreeNode(change.object);
                switch (change.type) {
                    case "update":
                        return void node.emitPatch({
                            op: "replace",
                            path: escapeJsonPath(change.name),
                            value: change.newValue.snapshot,
                            oldValue: change.oldValue ? change.oldValue.snapshot : undefined
                        }, node);
                    case "add":
                        return void node.emitPatch({
                            op: "add",
                            path: escapeJsonPath(change.name),
                            value: change.newValue.snapshot,
                            oldValue: undefined
                        }, node);
                    case "delete":
                        // a node got deleted, get the old snapshot and make the node die
                        var oldSnapshot = change.oldValue.snapshot;
                        change.oldValue.die();
                        // emit the patch
                        return void node.emitPatch({
                            op: "remove",
                            path: escapeJsonPath(change.name),
                            oldValue: oldSnapshot
                        }, node);
                }
            }
        });
        Object.defineProperty(MapType.prototype, "applyPatchLocally", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, subpath, patch) {
                var target = node.storedValue;
                switch (patch.op) {
                    case "add":
                    case "replace":
                        target.set(subpath, patch.value);
                        break;
                    case "remove":
                        target.delete(subpath);
                        break;
                }
            }
        });
        Object.defineProperty(MapType.prototype, "applySnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, snapshot) {
                typecheckInternal(this, snapshot);
                var target = node.storedValue;
                var currentKeys = {};
                Array.from(target.keys()).forEach(function (key) {
                    currentKeys[key] = false;
                });
                if (snapshot) {
                    // Don't use target.replace, as it will throw away all existing items first
                    for (var key in snapshot) {
                        target.set(key, snapshot[key]);
                        currentKeys["" + key] = true;
                    }
                }
                Object.keys(currentKeys).forEach(function (key) {
                    if (currentKeys[key] === false)
                        target.delete(key);
                });
            }
        });
        Object.defineProperty(MapType.prototype, "getChildType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subType;
            }
        });
        Object.defineProperty(MapType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var _this = this;
                if (!isPlainObject(value)) {
                    return typeCheckFailure(context, value, "Value is not a plain object");
                }
                return flattenTypeErrors(Object.keys(value).map(function (path) {
                    return _this._subType.validate(value[path], getContextForPath(context, path, _this._subType));
                }));
            }
        });
        Object.defineProperty(MapType.prototype, "getDefaultSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return EMPTY_OBJECT;
            }
        });
        Object.defineProperty(MapType.prototype, "removeChild", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, subpath) {
                node.storedValue.delete(subpath);
            }
        });
        return MapType;
    }(ComplexType));
    MapType.prototype.applySnapshot = action(MapType.prototype.applySnapshot);
    /**
     * `types.map` - Creates a key based collection type who's children are all of a uniform declared type.
     * If the type stored in a map has an identifier, it is mandatory to store the child under that identifier in the map.
     *
     * This type will always produce [observable maps](https://mobx.js.org/api.html#observablemap)
     *
     * Example:
     * ```ts
     * const Todo = types.model({
     *   id: types.identifier,
     *   task: types.string
     * })
     *
     * const TodoStore = types.model({
     *   todos: types.map(Todo)
     * })
     *
     * const s = TodoStore.create({ todos: {} })
     * unprotect(s)
     * s.todos.set(17, { task: "Grab coffee", id: 17 })
     * s.todos.put({ task: "Grab cookie", id: 18 }) // put will infer key from the identifier
     * console.log(s.todos.get(17).task) // prints: "Grab coffee"
     * ```
     *
     * @param subtype
     * @returns
     */
    function map(subtype) {
        return new MapType("map<string, " + subtype.name + ">", subtype);
    }

    /**
     * @internal
     * @hidden
     */
    var ArrayType = /** @class */ (function (_super) {
        __extends(ArrayType, _super);
        function ArrayType(name, _subType, hookInitializers) {
            if (hookInitializers === void 0) { hookInitializers = []; }
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "_subType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _subType
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Array
            });
            Object.defineProperty(_this, "hookInitializers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            _this.hookInitializers = hookInitializers;
            return _this;
        }
        Object.defineProperty(ArrayType.prototype, "hooks", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (hooks) {
                var hookInitializers = this.hookInitializers.length > 0 ? this.hookInitializers.concat(hooks) : [hooks];
                return new ArrayType(this.name, this._subType, hookInitializers);
            }
        });
        Object.defineProperty(ArrayType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                return createObjectNode(this, parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(ArrayType.prototype, "initializeChildNodes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (objNode, snapshot) {
                if (snapshot === void 0) { snapshot = []; }
                var subType = objNode.type._subType;
                var result = {};
                snapshot.forEach(function (item, index) {
                    var subpath = "" + index;
                    result[subpath] = subType.instantiate(objNode, subpath, undefined, item);
                });
                return result;
            }
        });
        Object.defineProperty(ArrayType.prototype, "createNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNodes) {
                return observable.array(convertChildNodesToArray(childNodes), mobxShallow);
            }
        });
        Object.defineProperty(ArrayType.prototype, "finalizeNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, instance) {
                getAdministration(instance).dehancer = node.unbox;
                var type = node.type;
                type.hookInitializers.forEach(function (initializer) {
                    var hooks = initializer(instance);
                    Object.keys(hooks).forEach(function (name) {
                        var hook = hooks[name];
                        var actionInvoker = createActionInvoker(instance, name, hook);
                        (addHiddenFinalProp )(instance, name, actionInvoker);
                    });
                });
                intercept(instance, this.willChange);
                observe(instance, this.didChange);
            }
        });
        Object.defineProperty(ArrayType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subType.describe() + "[]";
            }
        });
        Object.defineProperty(ArrayType.prototype, "getChildren", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                return node.storedValue.slice();
            }
        });
        Object.defineProperty(ArrayType.prototype, "getChildNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, key) {
                var index = Number(key);
                if (index < node.storedValue.length)
                    return node.storedValue[index];
                throw fail$1("Not a child: " + key);
            }
        });
        Object.defineProperty(ArrayType.prototype, "willChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (change) {
                var node = getStateTreeNode(change.object);
                node.assertWritable({ subpath: "" + change.index });
                var subType = node.type._subType;
                var childNodes = node.getChildren();
                switch (change.type) {
                    case "update":
                        {
                            if (change.newValue === change.object[change.index])
                                return null;
                            var updatedNodes = reconcileArrayChildren(node, subType, [childNodes[change.index]], [change.newValue], [change.index]);
                            if (!updatedNodes) {
                                return null;
                            }
                            change.newValue = updatedNodes[0];
                        }
                        break;
                    case "splice":
                        {
                            var index_1 = change.index, removedCount = change.removedCount, added = change.added;
                            var addedNodes = reconcileArrayChildren(node, subType, childNodes.slice(index_1, index_1 + removedCount), added, added.map(function (_, i) { return index_1 + i; }));
                            if (!addedNodes) {
                                return null;
                            }
                            change.added = addedNodes;
                            // update paths of remaining items
                            for (var i = index_1 + removedCount; i < childNodes.length; i++) {
                                childNodes[i].setParent(node, "" + (i + added.length - removedCount));
                            }
                        }
                        break;
                }
                return change;
            }
        });
        Object.defineProperty(ArrayType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                return node.getChildren().map(function (childNode) { return childNode.snapshot; });
            }
        });
        Object.defineProperty(ArrayType.prototype, "processInitialSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNodes) {
                var processed = [];
                Object.keys(childNodes).forEach(function (key) {
                    processed.push(childNodes[key].getSnapshot());
                });
                return processed;
            }
        });
        Object.defineProperty(ArrayType.prototype, "didChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (change) {
                var node = getStateTreeNode(change.object);
                switch (change.type) {
                    case "update":
                        return void node.emitPatch({
                            op: "replace",
                            path: "" + change.index,
                            value: change.newValue.snapshot,
                            oldValue: change.oldValue ? change.oldValue.snapshot : undefined
                        }, node);
                    case "splice":
                        for (var i = change.removedCount - 1; i >= 0; i--)
                            node.emitPatch({
                                op: "remove",
                                path: "" + (change.index + i),
                                oldValue: change.removed[i].snapshot
                            }, node);
                        for (var i = 0; i < change.addedCount; i++)
                            node.emitPatch({
                                op: "add",
                                path: "" + (change.index + i),
                                value: node.getChildNode("" + (change.index + i)).snapshot,
                                oldValue: undefined
                            }, node);
                        return;
                }
            }
        });
        Object.defineProperty(ArrayType.prototype, "applyPatchLocally", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, subpath, patch) {
                var target = node.storedValue;
                var index = subpath === "-" ? target.length : Number(subpath);
                switch (patch.op) {
                    case "replace":
                        target[index] = patch.value;
                        break;
                    case "add":
                        target.splice(index, 0, patch.value);
                        break;
                    case "remove":
                        target.splice(index, 1);
                        break;
                }
            }
        });
        Object.defineProperty(ArrayType.prototype, "applySnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, snapshot) {
                typecheckInternal(this, snapshot);
                var target = node.storedValue;
                target.replace(snapshot);
            }
        });
        Object.defineProperty(ArrayType.prototype, "getChildType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subType;
            }
        });
        Object.defineProperty(ArrayType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var _this = this;
                if (!isArray(value)) {
                    return typeCheckFailure(context, value, "Value is not an array");
                }
                return flattenTypeErrors(value.map(function (item, index) {
                    return _this._subType.validate(item, getContextForPath(context, "" + index, _this._subType));
                }));
            }
        });
        Object.defineProperty(ArrayType.prototype, "getDefaultSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return EMPTY_ARRAY;
            }
        });
        Object.defineProperty(ArrayType.prototype, "removeChild", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, subpath) {
                node.storedValue.splice(Number(subpath), 1);
            }
        });
        return ArrayType;
    }(ComplexType));
    ArrayType.prototype.applySnapshot = action(ArrayType.prototype.applySnapshot);
    /**
     * `types.array` - Creates an index based collection type who's children are all of a uniform declared type.
     *
     * This type will always produce [observable arrays](https://mobx.js.org/api.html#observablearray)
     *
     * Example:
     * ```ts
     * const Todo = types.model({
     *   task: types.string
     * })
     *
     * const TodoStore = types.model({
     *   todos: types.array(Todo)
     * })
     *
     * const s = TodoStore.create({ todos: [] })
     * unprotect(s) // needed to allow modifying outside of an action
     * s.todos.push({ task: "Grab coffee" })
     * console.log(s.todos[0]) // prints: "Grab coffee"
     * ```
     *
     * @param subtype
     * @returns
     */
    function array(subtype) {
        return new ArrayType(subtype.name + "[]", subtype);
    }
    function reconcileArrayChildren(parent, childType, oldNodes, newValues, newPaths) {
        var nothingChanged = true;
        for (var i = 0;; i++) {
            var hasNewNode = i <= newValues.length - 1;
            var oldNode = oldNodes[i];
            var newValue = hasNewNode ? newValues[i] : undefined;
            var newPath = "" + newPaths[i];
            // for some reason, instead of newValue we got a node, fallback to the storedValue
            // TODO: https://github.com/mobxjs/mobx-state-tree/issues/340#issuecomment-325581681
            if (isNode(newValue))
                newValue = newValue.storedValue;
            if (!oldNode && !hasNewNode) {
                // both are empty, end
                break;
            }
            else if (!hasNewNode) {
                // new one does not exists
                nothingChanged = false;
                oldNodes.splice(i, 1);
                if (oldNode instanceof ObjectNode) {
                    // since it is going to be returned by pop/splice/shift better create it before killing it
                    // so it doesn't end up in an undead state
                    oldNode.createObservableInstanceIfNeeded();
                }
                oldNode.die();
                i--;
            }
            else if (!oldNode) {
                // there is no old node, create it
                // check if already belongs to the same parent. if so, avoid pushing item in. only swapping can occur.
                if (isStateTreeNode(newValue) && getStateTreeNode(newValue).parent === parent) {
                    // this node is owned by this parent, but not in the reconcilable set, so it must be double
                    throw fail$1("Cannot add an object to a state tree if it is already part of the same or another state tree. Tried to assign an object to '" + parent.path + "/" + newPath + "', but it lives already at '" + getStateTreeNode(newValue).path + "'");
                }
                nothingChanged = false;
                var newNode = valueAsNode(childType, parent, newPath, newValue);
                oldNodes.splice(i, 0, newNode);
            }
            else if (areSame(oldNode, newValue)) {
                // both are the same, reconcile
                oldNodes[i] = valueAsNode(childType, parent, newPath, newValue, oldNode);
            }
            else {
                // nothing to do, try to reorder
                var oldMatch = undefined;
                // find a possible candidate to reuse
                for (var j = i; j < oldNodes.length; j++) {
                    if (areSame(oldNodes[j], newValue)) {
                        oldMatch = oldNodes.splice(j, 1)[0];
                        break;
                    }
                }
                nothingChanged = false;
                var newNode = valueAsNode(childType, parent, newPath, newValue, oldMatch);
                oldNodes.splice(i, 0, newNode);
            }
        }
        return nothingChanged ? null : oldNodes;
    }
    /**
     * Convert a value to a node at given parent and subpath. Attempts to reuse old node if possible and given.
     */
    function valueAsNode(childType, parent, subpath, newValue, oldNode) {
        // ensure the value is valid-ish
        typecheckInternal(childType, newValue);
        function getNewNode() {
            // the new value has a MST node
            if (isStateTreeNode(newValue)) {
                var childNode = getStateTreeNode(newValue);
                childNode.assertAlive(EMPTY_OBJECT);
                // the node lives here
                if (childNode.parent !== null && childNode.parent === parent) {
                    childNode.setParent(parent, subpath);
                    return childNode;
                }
            }
            // there is old node and new one is a value/snapshot
            if (oldNode) {
                return childType.reconcile(oldNode, newValue, parent, subpath);
            }
            // nothing to do, create from scratch
            return childType.instantiate(parent, subpath, undefined, newValue);
        }
        var newNode = getNewNode();
        if (oldNode && oldNode !== newNode) {
            if (oldNode instanceof ObjectNode) {
                // since it is going to be returned by pop/splice/shift better create it before killing it
                // so it doesn't end up in an undead state
                oldNode.createObservableInstanceIfNeeded();
            }
            oldNode.die();
        }
        return newNode;
    }
    /**
     * Check if a node holds a value.
     */
    function areSame(oldNode, newValue) {
        // never consider dead old nodes for reconciliation
        if (!oldNode.isAlive) {
            return false;
        }
        // the new value has the same node
        if (isStateTreeNode(newValue)) {
            var newNode = getStateTreeNode(newValue);
            return newNode.isAlive && newNode === oldNode;
        }
        // the provided value is the snapshot of the old node
        if (oldNode.snapshot === newValue) {
            return true;
        }
        // Non object nodes don't get reconciled
        if (!(oldNode instanceof ObjectNode)) {
            return false;
        }
        var oldNodeType = oldNode.getReconciliationType();
        // new value is a snapshot with the correct identifier
        return (oldNode.identifier !== null &&
            oldNode.identifierAttribute &&
            isPlainObject(newValue) &&
            oldNodeType.is(newValue) &&
            oldNodeType.isMatchingSnapshotId(oldNode, newValue));
    }

    var PRE_PROCESS_SNAPSHOT = "preProcessSnapshot";
    var POST_PROCESS_SNAPSHOT = "postProcessSnapshot";
    function objectTypeToString() {
        return getStateTreeNode(this).toString();
    }
    var defaultObjectOptions = {
        name: "AnonymousModel",
        properties: {},
        initializers: EMPTY_ARRAY
    };
    function toPropertiesObject(declaredProps) {
        // loop through properties and ensures that all items are types
        return Object.keys(declaredProps).reduce(function (props, key) {
            var _a, _b, _c;
            // warn if user intended a HOOK
            if (key in Hook)
                throw fail$1("Hook '" + key + "' was defined as property. Hooks should be defined as part of the actions");
            // the user intended to use a view
            var descriptor = Object.getOwnPropertyDescriptor(props, key);
            if ("get" in descriptor) {
                throw fail$1("Getters are not supported as properties. Please use views instead");
            }
            // undefined and null are not valid
            var value = descriptor.value;
            if (value === null || value === undefined) {
                throw fail$1("The default value of an attribute cannot be null or undefined as the type cannot be inferred. Did you mean `types.maybe(someType)`?");
                // its a primitive, convert to its type
            }
            else if (isPrimitive(value)) {
                return Object.assign({}, props, (_a = {},
                    _a[key] = optional(getPrimitiveFactoryFromValue(value), value),
                    _a));
                // map defaults to empty object automatically for models
            }
            else if (value instanceof MapType) {
                return Object.assign({}, props, (_b = {},
                    _b[key] = optional(value, {}),
                    _b));
            }
            else if (value instanceof ArrayType) {
                return Object.assign({}, props, (_c = {}, _c[key] = optional(value, []), _c));
                // its already a type
            }
            else if (isType(value)) {
                return props;
                // its a function, maybe the user wanted a view?
            }
            else {
                throw fail$1("Invalid type definition for property '" + key + "', cannot infer a type from a value like '" + value + "' (" + typeof value + ")");
            }
        }, declaredProps);
    }
    /**
     * @internal
     * @hidden
     */
    var ModelType = /** @class */ (function (_super) {
        __extends(ModelType, _super);
        function ModelType(opts) {
            var _this = _super.call(this, opts.name || defaultObjectOptions.name) || this;
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Object
            });
            /*
             * The original object definition
             */
            Object.defineProperty(_this, "initializers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "properties", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "preProcessor", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "postProcessor", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "propertyNames", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "named", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (name) {
                    return _this.cloneAndEnhance({ name: name });
                }
            });
            Object.defineProperty(_this, "props", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (properties) {
                    return _this.cloneAndEnhance({ properties: properties });
                }
            });
            Object.defineProperty(_this, "preProcessSnapshot", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (preProcessor) {
                    var currentPreprocessor = _this.preProcessor;
                    if (!currentPreprocessor)
                        return _this.cloneAndEnhance({ preProcessor: preProcessor });
                    else
                        return _this.cloneAndEnhance({
                            preProcessor: function (snapshot) { return currentPreprocessor(preProcessor(snapshot)); }
                        });
                }
            });
            Object.defineProperty(_this, "postProcessSnapshot", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: function (postProcessor) {
                    var currentPostprocessor = _this.postProcessor;
                    if (!currentPostprocessor)
                        return _this.cloneAndEnhance({ postProcessor: postProcessor });
                    else
                        return _this.cloneAndEnhance({
                            postProcessor: function (snapshot) { return postProcessor(currentPostprocessor(snapshot)); }
                        });
                }
            });
            Object.assign(_this, defaultObjectOptions, opts);
            // ensures that any default value gets converted to its related type
            _this.properties = toPropertiesObject(_this.properties);
            freeze(_this.properties); // make sure nobody messes with it
            _this.propertyNames = Object.keys(_this.properties);
            _this.identifierAttribute = _this._getIdentifierAttribute();
            return _this;
        }
        Object.defineProperty(ModelType.prototype, "_getIdentifierAttribute", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var identifierAttribute = undefined;
                this.forAllProps(function (propName, propType) {
                    if (propType.flags & TypeFlags.Identifier) {
                        if (identifierAttribute)
                            throw fail$1("Cannot define property '" + propName + "' as object identifier, property '" + identifierAttribute + "' is already defined as identifier property");
                        identifierAttribute = propName;
                    }
                });
                return identifierAttribute;
            }
        });
        Object.defineProperty(ModelType.prototype, "cloneAndEnhance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (opts) {
                return new ModelType({
                    name: opts.name || this.name,
                    properties: Object.assign({}, this.properties, opts.properties),
                    initializers: this.initializers.concat(opts.initializers || []),
                    preProcessor: opts.preProcessor || this.preProcessor,
                    postProcessor: opts.postProcessor || this.postProcessor
                });
            }
        });
        Object.defineProperty(ModelType.prototype, "actions", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                var _this = this;
                var actionInitializer = function (self) {
                    _this.instantiateActions(self, fn(self));
                    return self;
                };
                return this.cloneAndEnhance({ initializers: [actionInitializer] });
            }
        });
        Object.defineProperty(ModelType.prototype, "instantiateActions", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (self, actions) {
                // check if return is correct
                if (!isPlainObject(actions))
                    throw fail$1("actions initializer should return a plain object containing actions");
                // bind actions to the object created
                Object.keys(actions).forEach(function (name) {
                    // warn if preprocessor was given
                    if (name === PRE_PROCESS_SNAPSHOT)
                        throw fail$1("Cannot define action '" + PRE_PROCESS_SNAPSHOT + "', it should be defined using 'type.preProcessSnapshot(fn)' instead");
                    // warn if postprocessor was given
                    if (name === POST_PROCESS_SNAPSHOT)
                        throw fail$1("Cannot define action '" + POST_PROCESS_SNAPSHOT + "', it should be defined using 'type.postProcessSnapshot(fn)' instead");
                    var action2 = actions[name];
                    // apply hook composition
                    var baseAction = self[name];
                    if (name in Hook && baseAction) {
                        var specializedAction_1 = action2;
                        action2 = function () {
                            baseAction.apply(null, arguments);
                            specializedAction_1.apply(null, arguments);
                        };
                    }
                    // the goal of this is to make sure actions using "this" can call themselves,
                    // while still allowing the middlewares to register them
                    var middlewares = action2.$mst_middleware; // make sure middlewares are not lost
                    var boundAction = action2.bind(actions);
                    boundAction.$mst_middleware = middlewares;
                    var actionInvoker = createActionInvoker(self, name, boundAction);
                    actions[name] = actionInvoker;
                    (addHiddenFinalProp )(self, name, actionInvoker);
                });
            }
        });
        Object.defineProperty(ModelType.prototype, "volatile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                var _this = this;
                if (typeof fn !== "function") {
                    throw fail$1("You passed an " + typeof fn + " to volatile state as an argument, when function is expected");
                }
                var stateInitializer = function (self) {
                    _this.instantiateVolatileState(self, fn(self));
                    return self;
                };
                return this.cloneAndEnhance({ initializers: [stateInitializer] });
            }
        });
        Object.defineProperty(ModelType.prototype, "instantiateVolatileState", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (self, state) {
                // check views return
                if (!isPlainObject(state))
                    throw fail$1("volatile state initializer should return a plain object containing state");
                set(self, state);
            }
        });
        Object.defineProperty(ModelType.prototype, "extend", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                var _this = this;
                var initializer = function (self) {
                    var _a = fn(self), actions = _a.actions, views = _a.views, state = _a.state, rest = __rest(_a, ["actions", "views", "state"]);
                    for (var key in rest)
                        throw fail$1("The `extend` function should return an object with a subset of the fields 'actions', 'views' and 'state'. Found invalid key '" + key + "'");
                    if (state)
                        _this.instantiateVolatileState(self, state);
                    if (views)
                        _this.instantiateViews(self, views);
                    if (actions)
                        _this.instantiateActions(self, actions);
                    return self;
                };
                return this.cloneAndEnhance({ initializers: [initializer] });
            }
        });
        Object.defineProperty(ModelType.prototype, "views", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                var _this = this;
                var viewInitializer = function (self) {
                    _this.instantiateViews(self, fn(self));
                    return self;
                };
                return this.cloneAndEnhance({ initializers: [viewInitializer] });
            }
        });
        Object.defineProperty(ModelType.prototype, "instantiateViews", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (self, views) {
                // check views return
                if (!isPlainObject(views))
                    throw fail$1("views initializer should return a plain object containing views");
                Object.keys(views).forEach(function (key) {
                    var _a;
                    // is this a computed property?
                    var descriptor = Object.getOwnPropertyDescriptor(views, key);
                    if ("get" in descriptor) {
                        apiDefineProperty(self, key, descriptor);
                        makeObservable(self, (_a = {}, _a[key] = computed, _a));
                    }
                    else if (typeof descriptor.value === "function") {
                        (addHiddenFinalProp )(self, key, descriptor.value);
                    }
                    else {
                        throw fail$1("A view member should either be a function or getter based property");
                    }
                });
            }
        });
        Object.defineProperty(ModelType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                var value = isStateTreeNode(initialValue)
                    ? initialValue
                    : this.applySnapshotPreProcessor(initialValue);
                return createObjectNode(this, parent, subpath, environment, value);
                // Optimization: record all prop- view- and action names after first construction, and generate an optimal base class
                // that pre-reserves all these fields for fast object-member lookups
            }
        });
        Object.defineProperty(ModelType.prototype, "initializeChildNodes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (objNode, initialSnapshot) {
                if (initialSnapshot === void 0) { initialSnapshot = {}; }
                var type = objNode.type;
                var result = {};
                type.forAllProps(function (name, childType) {
                    result[name] = childType.instantiate(objNode, name, undefined, initialSnapshot[name]);
                });
                return result;
            }
        });
        Object.defineProperty(ModelType.prototype, "createNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNodes) {
                return observable.object(childNodes, EMPTY_OBJECT, mobxShallow);
            }
        });
        Object.defineProperty(ModelType.prototype, "finalizeNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, instance) {
                addHiddenFinalProp(instance, "toString", objectTypeToString);
                this.forAllProps(function (name) {
                    interceptReads(instance, name, node.unbox);
                });
                this.initializers.reduce(function (self, fn) { return fn(self); }, instance);
                intercept(instance, this.willChange);
                observe(instance, this.didChange);
            }
        });
        Object.defineProperty(ModelType.prototype, "willChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (chg) {
                // TODO: mobx typings don't seem to take into account that newValue can be set even when removing a prop
                var change = chg;
                var node = getStateTreeNode(change.object);
                var subpath = change.name;
                node.assertWritable({ subpath: subpath });
                var childType = node.type.properties[subpath];
                // only properties are typed, state are stored as-is references
                if (childType) {
                    typecheckInternal(childType, change.newValue);
                    change.newValue = childType.reconcile(node.getChildNode(subpath), change.newValue, node, subpath);
                }
                return change;
            }
        });
        Object.defineProperty(ModelType.prototype, "didChange", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (chg) {
                // TODO: mobx typings don't seem to take into account that newValue can be set even when removing a prop
                var change = chg;
                var childNode = getStateTreeNode(change.object);
                var childType = childNode.type.properties[change.name];
                if (!childType) {
                    // don't emit patches for volatile state
                    return;
                }
                var oldChildValue = change.oldValue ? change.oldValue.snapshot : undefined;
                childNode.emitPatch({
                    op: "replace",
                    path: escapeJsonPath(change.name),
                    value: change.newValue.snapshot,
                    oldValue: oldChildValue
                }, childNode);
            }
        });
        Object.defineProperty(ModelType.prototype, "getChildren", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                var _this = this;
                var res = [];
                this.forAllProps(function (name) {
                    res.push(_this.getChildNode(node, name));
                });
                return res;
            }
        });
        Object.defineProperty(ModelType.prototype, "getChildNode", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, key) {
                if (!(key in this.properties))
                    throw fail$1("Not a value property: " + key);
                var adm = getAdministration(node.storedValue, key);
                var childNode = adm.raw();
                if (!childNode)
                    throw fail$1("Node not available for property " + key);
                return childNode;
            }
        });
        Object.defineProperty(ModelType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, applyPostProcess) {
                var _this = this;
                if (applyPostProcess === void 0) { applyPostProcess = true; }
                var res = {};
                this.forAllProps(function (name, type) {
                    getAtom(node.storedValue, name).reportObserved();
                    res[name] = _this.getChildNode(node, name).snapshot;
                });
                if (applyPostProcess) {
                    return this.applySnapshotPostProcessor(res);
                }
                return res;
            }
        });
        Object.defineProperty(ModelType.prototype, "processInitialSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (childNodes) {
                var processed = {};
                Object.keys(childNodes).forEach(function (key) {
                    processed[key] = childNodes[key].getSnapshot();
                });
                return this.applySnapshotPostProcessor(processed);
            }
        });
        Object.defineProperty(ModelType.prototype, "applyPatchLocally", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, subpath, patch) {
                if (!(patch.op === "replace" || patch.op === "add")) {
                    throw fail$1("object does not support operation " + patch.op);
                }
                node.storedValue[subpath] = patch.value;
            }
        });
        Object.defineProperty(ModelType.prototype, "applySnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, snapshot) {
                var preProcessedSnapshot = this.applySnapshotPreProcessor(snapshot);
                typecheckInternal(this, preProcessedSnapshot);
                this.forAllProps(function (name) {
                    node.storedValue[name] = preProcessedSnapshot[name];
                });
            }
        });
        Object.defineProperty(ModelType.prototype, "applySnapshotPreProcessor", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot) {
                var processor = this.preProcessor;
                return processor ? processor.call(null, snapshot) : snapshot;
            }
        });
        Object.defineProperty(ModelType.prototype, "applySnapshotPostProcessor", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot) {
                var postProcessor = this.postProcessor;
                if (postProcessor)
                    return postProcessor.call(null, snapshot);
                return snapshot;
            }
        });
        Object.defineProperty(ModelType.prototype, "getChildType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (propertyName) {
                return this.properties[propertyName];
            }
        });
        Object.defineProperty(ModelType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var _this = this;
                var snapshot = this.applySnapshotPreProcessor(value);
                if (!isPlainObject(snapshot)) {
                    return typeCheckFailure(context, snapshot, "Value is not a plain object");
                }
                return flattenTypeErrors(this.propertyNames.map(function (key) {
                    return _this.properties[key].validate(snapshot[key], getContextForPath(context, key, _this.properties[key]));
                }));
            }
        });
        Object.defineProperty(ModelType.prototype, "forAllProps", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (fn) {
                var _this = this;
                this.propertyNames.forEach(function (key) { return fn(key, _this.properties[key]); });
            }
        });
        Object.defineProperty(ModelType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var _this = this;
                // optimization: cache
                return ("{ " +
                    this.propertyNames
                        .map(function (key) { return key + ": " + _this.properties[key].describe(); })
                        .join("; ") +
                    " }");
            }
        });
        Object.defineProperty(ModelType.prototype, "getDefaultSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return EMPTY_OBJECT;
            }
        });
        Object.defineProperty(ModelType.prototype, "removeChild", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node, subpath) {
                node.storedValue[subpath] = undefined;
            }
        });
        return ModelType;
    }(ComplexType));
    ModelType.prototype.applySnapshot = action(ModelType.prototype.applySnapshot);
    /**
     * `types.model` - Creates a new model type by providing a name, properties, volatile state and actions.
     *
     * See the [model type](/concepts/trees#creating-models) description or the [getting started](intro/getting-started.md#getting-started-1) tutorial.
     */
    function model() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var name = typeof args[0] === "string" ? args.shift() : "AnonymousModel";
        var properties = args.shift() || {};
        return new ModelType({ name: name, properties: properties });
    }
    /**
     * `types.compose` - Composes a new model from one or more existing model types.
     * This method can be invoked in two forms:
     * Given 2 or more model types, the types are composed into a new Type.
     * Given first parameter as a string and 2 or more model types,
     * the types are composed into a new Type with the given name
     */
    function compose() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // TODO: just join the base type names if no name is provided
        var hasTypename = typeof args[0] === "string";
        var typeName = hasTypename ? args[0] : "AnonymousModel";
        if (hasTypename) {
            args.shift();
        }
        return args
            .reduce(function (prev, cur) {
            return prev.cloneAndEnhance({
                name: prev.name + "_" + cur.name,
                properties: cur.properties,
                initializers: cur.initializers,
                preProcessor: function (snapshot) {
                    return cur.applySnapshotPreProcessor(prev.applySnapshotPreProcessor(snapshot));
                },
                postProcessor: function (snapshot) {
                    return cur.applySnapshotPostProcessor(prev.applySnapshotPostProcessor(snapshot));
                }
            });
        })
            .named(typeName);
    }
    /**
     * Returns if a given value represents a model type.
     *
     * @param type
     * @returns
     */
    function isModelType(type) {
        return isType(type) && (type.flags & TypeFlags.Object) > 0;
    }

    // TODO: implement CoreType using types.custom ?
    /**
     * @internal
     * @hidden
     */
    var CoreType = /** @class */ (function (_super) {
        __extends(CoreType, _super);
        function CoreType(name, flags, checker, initializer) {
            if (initializer === void 0) { initializer = identity; }
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: flags
            });
            Object.defineProperty(_this, "checker", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: checker
            });
            Object.defineProperty(_this, "initializer", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: initializer
            });
            _this.flags = flags;
            return _this;
        }
        Object.defineProperty(CoreType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.name;
            }
        });
        Object.defineProperty(CoreType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                return createScalarNode(this, parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(CoreType.prototype, "createNewInstance", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (snapshot) {
                return this.initializer(snapshot);
            }
        });
        Object.defineProperty(CoreType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                if (isPrimitive(value) && this.checker(value)) {
                    return typeCheckSuccess();
                }
                var typeName = this.name === "Date" ? "Date or a unix milliseconds timestamp" : this.name;
                return typeCheckFailure(context, value, "Value is not a " + typeName);
            }
        });
        return CoreType;
    }(SimpleType));
    /**
     * `types.string` - Creates a type that can only contain a string value.
     * This type is used for string values by default
     *
     * Example:
     * ```ts
     * const Person = types.model({
     *   firstName: types.string,
     *   lastName: "Doe"
     * })
     * ```
     */
    // tslint:disable-next-line:variable-name
    var string = new CoreType("string", TypeFlags.String, function (v) { return typeof v === "string"; });
    /**
     * `types.number` - Creates a type that can only contain a numeric value.
     * This type is used for numeric values by default
     *
     * Example:
     * ```ts
     * const Vector = types.model({
     *   x: types.number,
     *   y: 1.5
     * })
     * ```
     */
    // tslint:disable-next-line:variable-name
    var number = new CoreType("number", TypeFlags.Number, function (v) { return typeof v === "number"; });
    /**
     * `types.integer` - Creates a type that can only contain an integer value.
     * This type is used for integer values by default
     *
     * Example:
     * ```ts
     * const Size = types.model({
     *   width: types.integer,
     *   height: 10
     * })
     * ```
     */
    // tslint:disable-next-line:variable-name
    var integer = new CoreType("integer", TypeFlags.Integer, function (v) { return isInteger(v); });
    /**
     * `types.boolean` - Creates a type that can only contain a boolean value.
     * This type is used for boolean values by default
     *
     * Example:
     * ```ts
     * const Thing = types.model({
     *   isCool: types.boolean,
     *   isAwesome: false
     * })
     * ```
     */
    // tslint:disable-next-line:variable-name
    var boolean = new CoreType("boolean", TypeFlags.Boolean, function (v) { return typeof v === "boolean"; });
    /**
     * `types.null` - The type of the value `null`
     */
    var nullType = new CoreType("null", TypeFlags.Null, function (v) { return v === null; });
    /**
     * `types.undefined` - The type of the value `undefined`
     */
    var undefinedType = new CoreType("undefined", TypeFlags.Undefined, function (v) { return v === undefined; });
    var _DatePrimitive = new CoreType("Date", TypeFlags.Date, function (v) { return typeof v === "number" || v instanceof Date; }, function (v) { return (v instanceof Date ? v : new Date(v)); });
    _DatePrimitive.getSnapshot = function (node) {
        return node.storedValue.getTime();
    };
    /**
     * `types.Date` - Creates a type that can only contain a javascript Date value.
     *
     * Example:
     * ```ts
     * const LogLine = types.model({
     *   timestamp: types.Date,
     * })
     *
     * LogLine.create({ timestamp: new Date() })
     * ```
     */
    var DatePrimitive = _DatePrimitive;
    /**
     * @internal
     * @hidden
     */
    function getPrimitiveFactoryFromValue(value) {
        switch (typeof value) {
            case "string":
                return string;
            case "number":
                return number; // In the future, isInteger(value) ? integer : number would be interesting, but would be too breaking for now
            case "boolean":
                return boolean;
            case "object":
                if (value instanceof Date)
                    return DatePrimitive;
        }
        throw fail$1("Cannot determine primitive type from value " + value);
    }
    /**
     * Returns if a given value represents a primitive type.
     *
     * @param type
     * @returns
     */
    function isPrimitiveType(type) {
        return (isType(type) &&
            (type.flags &
                (TypeFlags.String |
                    TypeFlags.Number |
                    TypeFlags.Integer |
                    TypeFlags.Boolean |
                    TypeFlags.Date)) >
                0);
    }

    /**
     * @internal
     * @hidden
     */
    var Literal = /** @class */ (function (_super) {
        __extends(Literal, _super);
        function Literal(value) {
            var _this = _super.call(this, JSON.stringify(value)) || this;
            Object.defineProperty(_this, "value", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Literal
            });
            _this.value = value;
            return _this;
        }
        Object.defineProperty(Literal.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                return createScalarNode(this, parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(Literal.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return JSON.stringify(this.value);
            }
        });
        Object.defineProperty(Literal.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                if (isPrimitive(value) && value === this.value) {
                    return typeCheckSuccess();
                }
                return typeCheckFailure(context, value, "Value is not a literal " + JSON.stringify(this.value));
            }
        });
        return Literal;
    }(SimpleType));
    /**
     * `types.literal` - The literal type will return a type that will match only the exact given type.
     * The given value must be a primitive, in order to be serialized to a snapshot correctly.
     * You can use literal to match exact strings for example the exact male or female string.
     *
     * Example:
     * ```ts
     * const Person = types.model({
     *     name: types.string,
     *     gender: types.union(types.literal('male'), types.literal('female'))
     * })
     * ```
     *
     * @param value The value to use in the strict equal check
     * @returns
     */
    function literal(value) {
        return new Literal(value);
    }

    var Refinement = /** @class */ (function (_super) {
        __extends(Refinement, _super);
        function Refinement(name, _subtype, _predicate, _message) {
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "_subtype", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _subtype
            });
            Object.defineProperty(_this, "_predicate", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _predicate
            });
            Object.defineProperty(_this, "_message", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _message
            });
            return _this;
        }
        Object.defineProperty(Refinement.prototype, "flags", {
            get: function () {
                return this._subtype.flags | TypeFlags.Refinement;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Refinement.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.name;
            }
        });
        Object.defineProperty(Refinement.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                // create the child type
                return this._subtype.instantiate(parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(Refinement.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                return this._subtype.isAssignableFrom(type);
            }
        });
        Object.defineProperty(Refinement.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var subtypeErrors = this._subtype.validate(value, context);
                if (subtypeErrors.length > 0)
                    return subtypeErrors;
                var snapshot = isStateTreeNode(value) ? getStateTreeNode(value).snapshot : value;
                if (!this._predicate(snapshot)) {
                    return typeCheckFailure(context, value, this._message(value));
                }
                return typeCheckSuccess();
            }
        });
        Object.defineProperty(Refinement.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                return this._subtype.reconcile(current, newValue, parent, subpath);
            }
        });
        Object.defineProperty(Refinement.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subtype;
            }
        });
        return Refinement;
    }(BaseType));
    /**
     * `types.refinement` - Creates a type that is more specific than the base type, e.g. `types.refinement(types.string, value => value.length > 5)` to create a type of strings that can only be longer then 5.
     *
     * @param name
     * @param type
     * @param predicate
     * @returns
     */
    function refinement() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var name = typeof args[0] === "string" ? args.shift() : isType(args[0]) ? args[0].name : null;
        var type = args[0];
        var predicate = args[1];
        var message = args[2]
            ? args[2]
            : function (v) { return "Value does not respect the refinement predicate"; };
        return new Refinement(name, type, predicate, message);
    }

    /**
     * `types.enumeration` - Can be used to create an string based enumeration.
     * (note: this methods is just sugar for a union of string literals)
     *
     * Example:
     * ```ts
     * const TrafficLight = types.model({
     *   color: types.enumeration("Color", ["Red", "Orange", "Green"])
     * })
     * ```
     *
     * @param name descriptive name of the enumeration (optional)
     * @param options possible values this enumeration can have
     * @returns
     */
    function enumeration(name, options) {
        var realOptions = typeof name === "string" ? options : name;
        var type = union.apply(void 0, __spread(realOptions.map(function (option) { return literal("" + option); })));
        if (typeof name === "string")
            type.name = name;
        return type;
    }

    /**
     * @internal
     * @hidden
     */
    var Union = /** @class */ (function (_super) {
        __extends(Union, _super);
        function Union(name, _types, options) {
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "_types", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _types
            });
            Object.defineProperty(_this, "_dispatcher", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(_this, "_eager", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            });
            options = __assign({ eager: true, dispatcher: undefined }, options);
            _this._dispatcher = options.dispatcher;
            if (!options.eager)
                _this._eager = false;
            return _this;
        }
        Object.defineProperty(Union.prototype, "flags", {
            get: function () {
                var result = TypeFlags.Union;
                this._types.forEach(function (type) {
                    result |= type.flags;
                });
                return result;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Union.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                return this._types.some(function (subType) { return subType.isAssignableFrom(type); });
            }
        });
        Object.defineProperty(Union.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "(" + this._types.map(function (factory) { return factory.describe(); }).join(" | ") + ")";
            }
        });
        Object.defineProperty(Union.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                var type = this.determineType(initialValue, undefined);
                if (!type)
                    throw fail$1("No matching type for union " + this.describe()); // can happen in prod builds
                return type.instantiate(parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(Union.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                var type = this.determineType(newValue, current.getReconciliationType());
                if (!type)
                    throw fail$1("No matching type for union " + this.describe()); // can happen in prod builds
                return type.reconcile(current, newValue, parent, subpath);
            }
        });
        Object.defineProperty(Union.prototype, "determineType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, reconcileCurrentType) {
                // try the dispatcher, if defined
                if (this._dispatcher) {
                    return this._dispatcher(value);
                }
                // find the most accomodating type
                // if we are using reconciliation try the current node type first (fix for #1045)
                if (reconcileCurrentType) {
                    if (reconcileCurrentType.is(value)) {
                        return reconcileCurrentType;
                    }
                    return this._types
                        .filter(function (t) { return t !== reconcileCurrentType; })
                        .find(function (type) { return type.is(value); });
                }
                else {
                    return this._types.find(function (type) { return type.is(value); });
                }
            }
        });
        Object.defineProperty(Union.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                if (this._dispatcher) {
                    return this._dispatcher(value).validate(value, context);
                }
                var allErrors = [];
                var applicableTypes = 0;
                for (var i = 0; i < this._types.length; i++) {
                    var type = this._types[i];
                    var errors = type.validate(value, context);
                    if (errors.length === 0) {
                        if (this._eager)
                            return typeCheckSuccess();
                        else
                            applicableTypes++;
                    }
                    else {
                        allErrors.push(errors);
                    }
                }
                if (applicableTypes === 1)
                    return typeCheckSuccess();
                return typeCheckFailure(context, value, "No type is applicable for the union").concat(flattenTypeErrors(allErrors));
            }
        });
        Object.defineProperty(Union.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._types;
            }
        });
        return Union;
    }(BaseType));
    /**
     * `types.union` - Create a union of multiple types. If the correct type cannot be inferred unambiguously from a snapshot, provide a dispatcher function of the form `(snapshot) => Type`.
     *
     * @param optionsOrType
     * @param otherTypes
     * @returns
     */
    function union(optionsOrType) {
        var otherTypes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            otherTypes[_i - 1] = arguments[_i];
        }
        var options = isType(optionsOrType) ? undefined : optionsOrType;
        var types = isType(optionsOrType) ? __spread([optionsOrType], otherTypes) : otherTypes;
        var name = "(" + types.map(function (type) { return type.name; }).join(" | ") + ")";
        return new Union(name, types, options);
    }

    /**
     * @hidden
     * @internal
     */
    var OptionalValue = /** @class */ (function (_super) {
        __extends(OptionalValue, _super);
        function OptionalValue(_subtype, _defaultValue, optionalValues) {
            var _this = _super.call(this, _subtype.name) || this;
            Object.defineProperty(_this, "_subtype", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _subtype
            });
            Object.defineProperty(_this, "_defaultValue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _defaultValue
            });
            Object.defineProperty(_this, "optionalValues", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: optionalValues
            });
            return _this;
        }
        Object.defineProperty(OptionalValue.prototype, "flags", {
            get: function () {
                return this._subtype.flags | TypeFlags.Optional;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OptionalValue.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subtype.describe() + "?";
            }
        });
        Object.defineProperty(OptionalValue.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                if (this.optionalValues.indexOf(initialValue) >= 0) {
                    var defaultInstanceOrSnapshot = this.getDefaultInstanceOrSnapshot();
                    return this._subtype.instantiate(parent, subpath, environment, defaultInstanceOrSnapshot);
                }
                return this._subtype.instantiate(parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(OptionalValue.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                return this._subtype.reconcile(current, this.optionalValues.indexOf(newValue) < 0 && this._subtype.is(newValue)
                    ? newValue
                    : this.getDefaultInstanceOrSnapshot(), parent, subpath);
            }
        });
        Object.defineProperty(OptionalValue.prototype, "getDefaultInstanceOrSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var defaultInstanceOrSnapshot = typeof this._defaultValue === "function"
                    ? this._defaultValue()
                    : this._defaultValue;
                // while static values are already snapshots and checked on types.optional
                // generator functions must always be rechecked just in case
                if (typeof this._defaultValue === "function") {
                    typecheckInternal(this, defaultInstanceOrSnapshot);
                }
                return defaultInstanceOrSnapshot;
            }
        });
        Object.defineProperty(OptionalValue.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                // defaulted values can be skipped
                if (this.optionalValues.indexOf(value) >= 0) {
                    return typeCheckSuccess();
                }
                // bounce validation to the sub-type
                return this._subtype.validate(value, context);
            }
        });
        Object.defineProperty(OptionalValue.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                return this._subtype.isAssignableFrom(type);
            }
        });
        Object.defineProperty(OptionalValue.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this._subtype;
            }
        });
        return OptionalValue;
    }(BaseType));
    function checkOptionalPreconditions(type, defaultValueOrFunction) {
        // make sure we never pass direct instances
        if (typeof defaultValueOrFunction !== "function" && isStateTreeNode(defaultValueOrFunction)) {
            throw fail$1("default value cannot be an instance, pass a snapshot or a function that creates an instance/snapshot instead");
        }
    }
    /**
     * `types.optional` - Can be used to create a property with a default value.
     *
     * Depending on the third argument (`optionalValues`) there are two ways of operation:
     * - If the argument is not provided, then if a value is not provided in the snapshot (`undefined` or missing),
     *   it will default to the provided `defaultValue`
     * - If the argument is provided, then if the value in the snapshot matches one of the optional values inside the array then it will
     *   default to the provided `defaultValue`. Additionally, if one of the optional values inside the array is `undefined` then a missing
     *   property is also valid.
     *
     *   Note that it is also possible to include values of the same type as the intended subtype as optional values,
     *   in this case the optional value will be transformed into the `defaultValue` (e.g. `types.optional(types.string, "unnamed", [undefined, ""])`
     *   will transform the snapshot values `undefined` (and therefore missing) and empty strings into the string `"unnamed"` when it gets
     *   instantiated).
     *
     * If `defaultValue` is a function, the function will be invoked for every new instance.
     * Applying a snapshot in which the optional value is one of the optional values (or `undefined`/_not_ present if none are provided) causes the
     * value to be reset.
     *
     * Example:
     * ```ts
     * const Todo = types.model({
     *   title: types.string,
     *   subtitle1: types.optional(types.string, "", [null]),
     *   subtitle2: types.optional(types.string, "", [null, undefined]),
     *   done: types.optional(types.boolean, false),
     *   created: types.optional(types.Date, () => new Date()),
     * })
     *
     * // if done is missing / undefined it will become false
     * // if created is missing / undefined it will get a freshly generated timestamp
     * // if subtitle1 is null it will default to "", but it cannot be missing or undefined
     * // if subtitle2 is null or undefined it will default to ""; since it can be undefined it can also be missing
     * const todo = Todo.create({ title: "Get coffee", subtitle1: null })
     * ```
     *
     * @param type
     * @param defaultValueOrFunction
     * @param optionalValues an optional array with zero or more primitive values (string, number, boolean, null or undefined)
     *                       that will be converted into the default. `[ undefined ]` is assumed when none is provided
     * @returns
     */
    function optional(type, defaultValueOrFunction, optionalValues) {
        checkOptionalPreconditions(type, defaultValueOrFunction);
        return new OptionalValue(type, defaultValueOrFunction, optionalValues ? optionalValues : undefinedAsOptionalValues);
    }
    var undefinedAsOptionalValues = [undefined];

    var optionalUndefinedType = optional(undefinedType, undefined);
    var optionalNullType = optional(nullType, null);
    /**
     * `types.maybe` - Maybe will make a type nullable, and also optional.
     * The value `undefined` will be used to represent nullability.
     *
     * @param type
     * @returns
     */
    function maybe(type) {
        return union(type, optionalUndefinedType);
    }
    /**
     * `types.maybeNull` - Maybe will make a type nullable, and also optional.
     * The value `null` will be used to represent no value.
     *
     * @param type
     * @returns
     */
    function maybeNull(type) {
        return union(type, optionalNullType);
    }

    var Late = /** @class */ (function (_super) {
        __extends(Late, _super);
        function Late(name, _definition) {
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "_definition", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: _definition
            });
            Object.defineProperty(_this, "_subType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            return _this;
        }
        Object.defineProperty(Late.prototype, "flags", {
            get: function () {
                return (this._subType ? this._subType.flags : 0) | TypeFlags.Late;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Late.prototype, "getSubType", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (mustSucceed) {
                if (!this._subType) {
                    var t = undefined;
                    try {
                        t = this._definition();
                    }
                    catch (e) {
                        if (e instanceof ReferenceError)
                            // can happen in strict ES5 code when a definition is self refering
                            t = undefined;
                        else
                            throw e;
                    }
                    if (mustSucceed && t === undefined)
                        throw fail$1("Late type seems to be used too early, the definition (still) returns undefined");
                    if (t) {
                        this._subType = t;
                    }
                }
                return this._subType;
            }
        });
        Object.defineProperty(Late.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                return this.getSubType(true).instantiate(parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(Late.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                return this.getSubType(true).reconcile(current, newValue, parent, subpath);
            }
        });
        Object.defineProperty(Late.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var t = this.getSubType(false);
                return t ? t.name : "<uknown late type>";
            }
        });
        Object.defineProperty(Late.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                var t = this.getSubType(false);
                if (!t) {
                    // See #916; the variable the definition closure is pointing to wasn't defined yet, so can't be evaluted yet here
                    return typeCheckSuccess();
                }
                return t.validate(value, context);
            }
        });
        Object.defineProperty(Late.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                var t = this.getSubType(false);
                return t ? t.isAssignableFrom(type) : false;
            }
        });
        Object.defineProperty(Late.prototype, "getSubTypes", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var subtype = this.getSubType(false);
                return subtype ? subtype : cannotDetermineSubtype;
            }
        });
        return Late;
    }(BaseType));
    /**
     * `types.late` - Defines a type that gets implemented later. This is useful when you have to deal with circular dependencies.
     * Please notice that when defining circular dependencies TypeScript isn't smart enough to inference them.
     *
     * Example:
     * ```ts
     *   // TypeScript isn't smart enough to infer self referencing types.
     *  const Node = types.model({
     *       children: types.array(types.late((): IAnyModelType => Node)) // then typecast each array element to Instance<typeof Node>
     *  })
     * ```
     *
     * @param name The name to use for the type that will be returned.
     * @param type A function that returns the type that will be defined.
     * @returns
     */
    function late(nameOrType, maybeType) {
        var name = typeof nameOrType === "string" ? nameOrType : "late(" + nameOrType.toString() + ")";
        var type = typeof nameOrType === "string" ? maybeType : nameOrType;
        return new Late(name, type);
    }

    /**
     * @internal
     * @hidden
     */
    var Frozen = /** @class */ (function (_super) {
        __extends(Frozen, _super);
        function Frozen(subType) {
            var _this = _super.call(this, subType ? "frozen(" + subType.name + ")" : "frozen") || this;
            Object.defineProperty(_this, "subType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: subType
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Frozen
            });
            return _this;
        }
        Object.defineProperty(Frozen.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "<any immutable value>";
            }
        });
        Object.defineProperty(Frozen.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, value) {
                // create the node
                return createScalarNode(this, parent, subpath, environment, deepFreeze(value));
            }
        });
        Object.defineProperty(Frozen.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                if (!isSerializable(value)) {
                    return typeCheckFailure(context, value, "Value is not serializable and cannot be frozen");
                }
                if (this.subType)
                    return this.subType.validate(value, context);
                return typeCheckSuccess();
            }
        });
        return Frozen;
    }(SimpleType));
    var untypedFrozenInstance = new Frozen();
    /**
     * `types.frozen` - Frozen can be used to store any value that is serializable in itself (that is valid JSON).
     * Frozen values need to be immutable or treated as if immutable. They need be serializable as well.
     * Values stored in frozen will snapshotted as-is by MST, and internal changes will not be tracked.
     *
     * This is useful to store complex, but immutable values like vectors etc. It can form a powerful bridge to parts of your application that should be immutable, or that assume data to be immutable.
     *
     * Note: if you want to store free-form state that is mutable, or not serializeable, consider using volatile state instead.
     *
     * Frozen properties can be defined in three different ways
     * 1. `types.frozen(SubType)` - provide a valid MST type and frozen will check if the provided data conforms the snapshot for that type
     * 2. `types.frozen({ someDefaultValue: true})` - provide a primitive value, object or array, and MST will infer the type from that object, and also make it the default value for the field
     * 3. `types.frozen<TypeScriptType>()` - provide a typescript type, to help in strongly typing the field (design time only)
     *
     * Example:
     * ```ts
     * const GameCharacter = types.model({
     *   name: string,
     *   location: types.frozen({ x: 0, y: 0})
     * })
     *
     * const hero = GameCharacter.create({
     *   name: "Mario",
     *   location: { x: 7, y: 4 }
     * })
     *
     * hero.location = { x: 10, y: 2 } // OK
     * hero.location.x = 7 // Not ok!
     * ```
     *
     * ```ts
     * type Point = { x: number, y: number }
     *    const Mouse = types.model({
     *         loc: types.frozen<Point>()
     *    })
     * ```
     *
     * @param defaultValueOrType
     * @returns
     */
    function frozen(arg) {
        if (arguments.length === 0)
            return untypedFrozenInstance;
        else if (isType(arg))
            return new Frozen(arg);
        else
            return optional(untypedFrozenInstance, arg);
    }

    function getInvalidationCause(hook) {
        switch (hook) {
            case Hook.beforeDestroy:
                return "destroy";
            case Hook.beforeDetach:
                return "detach";
            default:
                return undefined;
        }
    }
    var StoredReference = /** @class */ (function () {
        function StoredReference(value, targetType) {
            Object.defineProperty(this, "targetType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: targetType
            });
            Object.defineProperty(this, "identifier", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "node", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "resolvedReference", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            if (isValidIdentifier(value)) {
                this.identifier = value;
            }
            else if (isStateTreeNode(value)) {
                var targetNode = getStateTreeNode(value);
                if (!targetNode.identifierAttribute)
                    throw fail$1("Can only store references with a defined identifier attribute.");
                var id = targetNode.unnormalizedIdentifier;
                if (id === null || id === undefined) {
                    throw fail$1("Can only store references to tree nodes with a defined identifier.");
                }
                this.identifier = id;
            }
            else {
                throw fail$1("Can only store references to tree nodes or identifiers, got: '" + value + "'");
            }
        }
        Object.defineProperty(StoredReference.prototype, "updateResolvedReference", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                var normalizedId = normalizeIdentifier(this.identifier);
                var root = node.root;
                var lastCacheModification = root.identifierCache.getLastCacheModificationPerId(normalizedId);
                if (!this.resolvedReference ||
                    this.resolvedReference.lastCacheModification !== lastCacheModification) {
                    var targetType = this.targetType;
                    // reference was initialized with the identifier of the target
                    var target = root.identifierCache.resolve(targetType, normalizedId);
                    if (!target) {
                        throw new InvalidReferenceError("[mobx-state-tree] Failed to resolve reference '" + this.identifier + "' to type '" + this.targetType.name + "' (from node: " + node.path + ")");
                    }
                    this.resolvedReference = {
                        node: target,
                        lastCacheModification: lastCacheModification
                    };
                }
            }
        });
        Object.defineProperty(StoredReference.prototype, "resolvedValue", {
            get: function () {
                this.updateResolvedReference(this.node);
                return this.resolvedReference.node.value;
            },
            enumerable: false,
            configurable: true
        });
        return StoredReference;
    }());
    /**
     * @internal
     * @hidden
     */
    var InvalidReferenceError = /** @class */ (function (_super) {
        __extends(InvalidReferenceError, _super);
        function InvalidReferenceError(m) {
            var _this = _super.call(this, m) || this;
            Object.setPrototypeOf(_this, InvalidReferenceError.prototype);
            return _this;
        }
        return InvalidReferenceError;
    }(Error));
    /**
     * @internal
     * @hidden
     */
    var BaseReferenceType = /** @class */ (function (_super) {
        __extends(BaseReferenceType, _super);
        function BaseReferenceType(targetType, onInvalidated) {
            var _this = _super.call(this, "reference(" + targetType.name + ")") || this;
            Object.defineProperty(_this, "targetType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: targetType
            });
            Object.defineProperty(_this, "onInvalidated", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: onInvalidated
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Reference
            });
            return _this;
        }
        Object.defineProperty(BaseReferenceType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.name;
            }
        });
        Object.defineProperty(BaseReferenceType.prototype, "isAssignableFrom", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (type) {
                return this.targetType.isAssignableFrom(type);
            }
        });
        Object.defineProperty(BaseReferenceType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                return isValidIdentifier(value)
                    ? typeCheckSuccess()
                    : typeCheckFailure(context, value, "Value is not a valid identifier, which is a string or a number");
            }
        });
        Object.defineProperty(BaseReferenceType.prototype, "fireInvalidated", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (cause, storedRefNode, referenceId, refTargetNode) {
                // to actually invalidate a reference we need an alive parent,
                // since it is a scalar value (immutable-ish) and we need to change it
                // from the parent
                var storedRefParentNode = storedRefNode.parent;
                if (!storedRefParentNode || !storedRefParentNode.isAlive) {
                    return;
                }
                var storedRefParentValue = storedRefParentNode.storedValue;
                if (!storedRefParentValue) {
                    return;
                }
                this.onInvalidated({
                    cause: cause,
                    parent: storedRefParentValue,
                    invalidTarget: refTargetNode ? refTargetNode.storedValue : undefined,
                    invalidId: referenceId,
                    replaceRef: function (newRef) {
                        applyPatch(storedRefNode.root.storedValue, {
                            op: "replace",
                            value: newRef,
                            path: storedRefNode.path
                        });
                    },
                    removeRef: function () {
                        if (isModelType(storedRefParentNode.type)) {
                            this.replaceRef(undefined);
                        }
                        else {
                            applyPatch(storedRefNode.root.storedValue, {
                                op: "remove",
                                path: storedRefNode.path
                            });
                        }
                    }
                });
            }
        });
        Object.defineProperty(BaseReferenceType.prototype, "addTargetNodeWatcher", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (storedRefNode, referenceId) {
                var _this = this;
                // this will make sure the target node becomes created
                var refTargetValue = this.getValue(storedRefNode);
                if (!refTargetValue) {
                    return undefined;
                }
                var refTargetNode = getStateTreeNode(refTargetValue);
                var hookHandler = function (_, refTargetNodeHook) {
                    var cause = getInvalidationCause(refTargetNodeHook);
                    if (!cause) {
                        return;
                    }
                    _this.fireInvalidated(cause, storedRefNode, referenceId, refTargetNode);
                };
                var refTargetDetachHookDisposer = refTargetNode.registerHook(Hook.beforeDetach, hookHandler);
                var refTargetDestroyHookDisposer = refTargetNode.registerHook(Hook.beforeDestroy, hookHandler);
                return function () {
                    refTargetDetachHookDisposer();
                    refTargetDestroyHookDisposer();
                };
            }
        });
        Object.defineProperty(BaseReferenceType.prototype, "watchTargetNodeForInvalidations", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (storedRefNode, identifier, customGetSet) {
                var _this = this;
                if (!this.onInvalidated) {
                    return;
                }
                var onRefTargetDestroyedHookDisposer;
                // get rid of the watcher hook when the stored ref node is destroyed
                // detached is ignored since scalar nodes (where the reference resides) cannot be detached
                storedRefNode.registerHook(Hook.beforeDestroy, function () {
                    if (onRefTargetDestroyedHookDisposer) {
                        onRefTargetDestroyedHookDisposer();
                    }
                });
                var startWatching = function (sync) {
                    // re-create hook in case the stored ref gets reattached
                    if (onRefTargetDestroyedHookDisposer) {
                        onRefTargetDestroyedHookDisposer();
                    }
                    // make sure the target node is actually there and initialized
                    var storedRefParentNode = storedRefNode.parent;
                    var storedRefParentValue = storedRefParentNode && storedRefParentNode.storedValue;
                    if (storedRefParentNode && storedRefParentNode.isAlive && storedRefParentValue) {
                        var refTargetNodeExists = void 0;
                        if (customGetSet) {
                            refTargetNodeExists = !!customGetSet.get(identifier, storedRefParentValue);
                        }
                        else {
                            refTargetNodeExists = storedRefNode.root.identifierCache.has(_this.targetType, normalizeIdentifier(identifier));
                        }
                        if (!refTargetNodeExists) {
                            // we cannot change the reference in sync mode
                            // since we are in the middle of a reconciliation/instantiation and the change would be overwritten
                            // for those cases just let the wrong reference be assigned and fail upon usage
                            // (like current references do)
                            // this means that effectively this code will only run when it is created from a snapshot
                            if (!sync) {
                                _this.fireInvalidated("invalidSnapshotReference", storedRefNode, identifier, null);
                            }
                        }
                        else {
                            onRefTargetDestroyedHookDisposer = _this.addTargetNodeWatcher(storedRefNode, identifier);
                        }
                    }
                };
                if (storedRefNode.state === NodeLifeCycle.FINALIZED) {
                    // already attached, so the whole tree is ready
                    startWatching(true);
                }
                else {
                    if (!storedRefNode.isRoot) {
                        // start watching once the whole tree is ready
                        storedRefNode.root.registerHook(Hook.afterCreationFinalization, function () {
                            // make sure to attach it so it can start listening
                            if (storedRefNode.parent) {
                                storedRefNode.parent.createObservableInstanceIfNeeded();
                            }
                        });
                    }
                    // start watching once the node is attached somewhere / parent changes
                    storedRefNode.registerHook(Hook.afterAttach, function () {
                        startWatching(false);
                    });
                }
            }
        });
        return BaseReferenceType;
    }(SimpleType));
    /**
     * @internal
     * @hidden
     */
    var IdentifierReferenceType = /** @class */ (function (_super) {
        __extends(IdentifierReferenceType, _super);
        function IdentifierReferenceType(targetType, onInvalidated) {
            return _super.call(this, targetType, onInvalidated) || this;
        }
        Object.defineProperty(IdentifierReferenceType.prototype, "getValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (storedRefNode) {
                if (!storedRefNode.isAlive)
                    return undefined;
                var storedRef = storedRefNode.storedValue;
                return storedRef.resolvedValue;
            }
        });
        Object.defineProperty(IdentifierReferenceType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (storedRefNode) {
                var ref = storedRefNode.storedValue;
                return ref.identifier;
            }
        });
        Object.defineProperty(IdentifierReferenceType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                var identifier = isStateTreeNode(initialValue)
                    ? getIdentifier(initialValue)
                    : initialValue;
                var storedRef = new StoredReference(initialValue, this.targetType);
                var storedRefNode = createScalarNode(this, parent, subpath, environment, storedRef);
                storedRef.node = storedRefNode;
                this.watchTargetNodeForInvalidations(storedRefNode, identifier, undefined);
                return storedRefNode;
            }
        });
        Object.defineProperty(IdentifierReferenceType.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                if (!current.isDetaching && current.type === this) {
                    var compareByValue = isStateTreeNode(newValue);
                    var ref = current.storedValue;
                    if ((!compareByValue && ref.identifier === newValue) ||
                        (compareByValue && ref.resolvedValue === newValue)) {
                        current.setParent(parent, subpath);
                        return current;
                    }
                }
                var newNode = this.instantiate(parent, subpath, undefined, newValue);
                current.die(); // noop if detaching
                return newNode;
            }
        });
        return IdentifierReferenceType;
    }(BaseReferenceType));
    /**
     * @internal
     * @hidden
     */
    var CustomReferenceType = /** @class */ (function (_super) {
        __extends(CustomReferenceType, _super);
        function CustomReferenceType(targetType, options, onInvalidated) {
            var _this = _super.call(this, targetType, onInvalidated) || this;
            Object.defineProperty(_this, "options", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: options
            });
            return _this;
        }
        Object.defineProperty(CustomReferenceType.prototype, "getValue", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (storedRefNode) {
                if (!storedRefNode.isAlive)
                    return undefined;
                var referencedNode = this.options.get(storedRefNode.storedValue, storedRefNode.parent ? storedRefNode.parent.storedValue : null);
                return referencedNode;
            }
        });
        Object.defineProperty(CustomReferenceType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (storedRefNode) {
                return storedRefNode.storedValue;
            }
        });
        Object.defineProperty(CustomReferenceType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, newValue) {
                var identifier = isStateTreeNode(newValue)
                    ? this.options.set(newValue, parent ? parent.storedValue : null)
                    : newValue;
                var storedRefNode = createScalarNode(this, parent, subpath, environment, identifier);
                this.watchTargetNodeForInvalidations(storedRefNode, identifier, this.options);
                return storedRefNode;
            }
        });
        Object.defineProperty(CustomReferenceType.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                var newIdentifier = isStateTreeNode(newValue)
                    ? this.options.set(newValue, current ? current.storedValue : null)
                    : newValue;
                if (!current.isDetaching &&
                    current.type === this &&
                    current.storedValue === newIdentifier) {
                    current.setParent(parent, subpath);
                    return current;
                }
                var newNode = this.instantiate(parent, subpath, undefined, newIdentifier);
                current.die(); // noop if detaching
                return newNode;
            }
        });
        return CustomReferenceType;
    }(BaseReferenceType));
    /**
     * `types.reference` - Creates a reference to another type, which should have defined an identifier.
     * See also the [reference and identifiers](https://github.com/mobxjs/mobx-state-tree#references-and-identifiers) section.
     */
    function reference(subType, options) {
        var getSetOptions = options ? options : undefined;
        var onInvalidated = options
            ? options.onInvalidated
            : undefined;
        if (getSetOptions && (getSetOptions.get || getSetOptions.set)) {
            return new CustomReferenceType(subType, {
                get: getSetOptions.get,
                set: getSetOptions.set
            }, onInvalidated);
        }
        else {
            return new IdentifierReferenceType(subType, onInvalidated);
        }
    }
    /**
     * `types.safeReference` - A safe reference is like a standard reference, except that it accepts the undefined value by default
     * and automatically sets itself to undefined (when the parent is a model) / removes itself from arrays and maps
     * when the reference it is pointing to gets detached/destroyed.
     *
     * The optional options parameter object accepts a parameter named `acceptsUndefined`, which is set to true by default, so it is suitable
     * for model properties.
     * When used inside collections (arrays/maps), it is recommended to set this option to false so it can't take undefined as value,
     * which is usually the desired in those cases.
     * Additionally, the optional options parameter object accepts a parameter named `onInvalidated`, which will be called when the reference target node that the reference is pointing to is about to be detached/destroyed
     *
     * Strictly speaking it is a `types.maybe(types.reference(X))` (when `acceptsUndefined` is set to true, the default) and
     * `types.reference(X)` (when `acceptsUndefined` is set to false), both of them with a customized `onInvalidated` option.
     *
     * @param subType
     * @param options
     * @returns
     */
    function safeReference(subType, options) {
        var refType = reference(subType, __assign(__assign({}, options), { onInvalidated: function (ev) {
                if (options && options.onInvalidated) {
                    options.onInvalidated(ev);
                }
                ev.removeRef();
            } }));
        if (options && options.acceptsUndefined === false) {
            return refType;
        }
        else {
            return maybe(refType);
        }
    }

    var BaseIdentifierType = /** @class */ (function (_super) {
        __extends(BaseIdentifierType, _super);
        function BaseIdentifierType(name, validType) {
            var _this = _super.call(this, name) || this;
            Object.defineProperty(_this, "validType", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: validType
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Identifier
            });
            return _this;
        }
        Object.defineProperty(BaseIdentifierType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                if (!parent || !(parent.type instanceof ModelType))
                    throw fail$1("Identifier types can only be instantiated as direct child of a model type");
                return createScalarNode(this, parent, subpath, environment, initialValue);
            }
        });
        Object.defineProperty(BaseIdentifierType.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, newValue, parent, subpath) {
                // we don't consider detaching here since identifier are scalar nodes, and scalar nodes cannot be detached
                if (current.storedValue !== newValue)
                    throw fail$1("Tried to change identifier from '" + current.storedValue + "' to '" + newValue + "'. Changing identifiers is not allowed.");
                current.setParent(parent, subpath);
                return current;
            }
        });
        Object.defineProperty(BaseIdentifierType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                if (typeof value !== this.validType) {
                    return typeCheckFailure(context, value, "Value is not a valid " + this.describe() + ", expected a " + this.validType);
                }
                return typeCheckSuccess();
            }
        });
        return BaseIdentifierType;
    }(SimpleType));
    /**
     * @internal
     * @hidden
     */
    var IdentifierType = /** @class */ (function (_super) {
        __extends(IdentifierType, _super);
        function IdentifierType() {
            var _this = _super.call(this, "identifier", "string") || this;
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Identifier
            });
            return _this;
        }
        Object.defineProperty(IdentifierType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "identifier";
            }
        });
        return IdentifierType;
    }(BaseIdentifierType));
    /**
     * @internal
     * @hidden
     */
    var IdentifierNumberType = /** @class */ (function (_super) {
        __extends(IdentifierNumberType, _super);
        function IdentifierNumberType() {
            return _super.call(this, "identifierNumber", "number") || this;
        }
        Object.defineProperty(IdentifierNumberType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                return node.storedValue;
            }
        });
        Object.defineProperty(IdentifierNumberType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return "identifierNumber";
            }
        });
        return IdentifierNumberType;
    }(BaseIdentifierType));
    /**
     * `types.identifier` - Identifiers are used to make references, lifecycle events and reconciling works.
     * Inside a state tree, for each type can exist only one instance for each given identifier.
     * For example there couldn't be 2 instances of user with id 1. If you need more, consider using references.
     * Identifier can be used only as type property of a model.
     * This type accepts as parameter the value type of the identifier field that can be either string or number.
     *
     * Example:
     * ```ts
     *  const Todo = types.model("Todo", {
     *      id: types.identifier,
     *      title: types.string
     *  })
     * ```
     *
     * @returns
     */
    var identifier = new IdentifierType();
    /**
     * `types.identifierNumber` - Similar to `types.identifier`. This one will serialize from / to a number when applying snapshots
     *
     * Example:
     * ```ts
     *  const Todo = types.model("Todo", {
     *      id: types.identifierNumber,
     *      title: types.string
     *  })
     * ```
     *
     * @returns
     */
    var identifierNumber = new IdentifierNumberType();
    /**
     * @internal
     * @hidden
     */
    function normalizeIdentifier(id) {
        return "" + id;
    }
    /**
     * @internal
     * @hidden
     */
    function isValidIdentifier(id) {
        return typeof id === "string" || typeof id === "number";
    }

    /**
     * `types.custom` - Creates a custom type. Custom types can be used for arbitrary immutable values, that have a serializable representation. For example, to create your own Date representation, Decimal type etc.
     *
     * The signature of the options is:
     * ```ts
     * export interface CustomTypeOptions<S, T> {
     *     // Friendly name
     *     name: string
     *     // given a serialized value and environment, how to turn it into the target type
     *     fromSnapshot(snapshot: S, env: any): T
     *     // return the serialization of the current value
     *     toSnapshot(value: T): S
     *     // if true, this is a converted value, if false, it's a snapshot
     *     isTargetType(value: T | S): value is T
     *     // a non empty string is assumed to be a validation error
     *     getValidationMessage?(snapshot: S): string
     * }
     * ```
     *
     * Example:
     * ```ts
     * const DecimalPrimitive = types.custom<string, Decimal>({
     *     name: "Decimal",
     *     fromSnapshot(value: string) {
     *         return new Decimal(value)
     *     },
     *     toSnapshot(value: Decimal) {
     *         return value.toString()
     *     },
     *     isTargetType(value: string | Decimal): boolean {
     *         return value instanceof Decimal
     *     },
     *     getValidationMessage(value: string): string {
     *         if (/^-?\d+\.\d+$/.test(value)) return "" // OK
     *         return `'${value}' doesn't look like a valid decimal number`
     *     }
     * })
     *
     * const Wallet = types.model({
     *     balance: DecimalPrimitive
     * })
     * ```
     *
     * @param options
     * @returns
     */
    function custom(options) {
        return new CustomType(options);
    }
    /**
     * @internal
     * @hidden
     */
    var CustomType = /** @class */ (function (_super) {
        __extends(CustomType, _super);
        function CustomType(options) {
            var _this = _super.call(this, options.name) || this;
            Object.defineProperty(_this, "options", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: options
            });
            Object.defineProperty(_this, "flags", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: TypeFlags.Custom
            });
            return _this;
        }
        Object.defineProperty(CustomType.prototype, "describe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return this.name;
            }
        });
        Object.defineProperty(CustomType.prototype, "isValidSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (value, context) {
                if (this.options.isTargetType(value))
                    return typeCheckSuccess();
                var typeError = this.options.getValidationMessage(value);
                if (typeError) {
                    return typeCheckFailure(context, value, "Invalid value for type '" + this.name + "': " + typeError);
                }
                return typeCheckSuccess();
            }
        });
        Object.defineProperty(CustomType.prototype, "getSnapshot", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (node) {
                return this.options.toSnapshot(node.storedValue);
            }
        });
        Object.defineProperty(CustomType.prototype, "instantiate", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (parent, subpath, environment, initialValue) {
                var valueToStore = this.options.isTargetType(initialValue)
                    ? initialValue
                    : this.options.fromSnapshot(initialValue, parent && parent.root.environment);
                return createScalarNode(this, parent, subpath, environment, valueToStore);
            }
        });
        Object.defineProperty(CustomType.prototype, "reconcile", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (current, value, parent, subpath) {
                var isSnapshot = !this.options.isTargetType(value);
                // in theory customs use scalar nodes which cannot be detached, but still...
                if (!current.isDetaching) {
                    var unchanged = current.type === this &&
                        (isSnapshot ? value === current.snapshot : value === current.storedValue);
                    if (unchanged) {
                        current.setParent(parent, subpath);
                        return current;
                    }
                }
                var valueToStore = isSnapshot
                    ? this.options.fromSnapshot(value, parent.root.environment)
                    : value;
                var newNode = this.instantiate(parent, subpath, undefined, valueToStore);
                current.die(); // noop if detaching
                return newNode;
            }
        });
        return CustomType;
    }(SimpleType));

    // we import the types to re-export them inside types.
    var types = {
        enumeration: enumeration,
        model: model,
        compose: compose,
        custom: custom,
        reference: reference,
        safeReference: safeReference,
        union: union,
        optional: optional,
        literal: literal,
        maybe: maybe,
        maybeNull: maybeNull,
        refinement: refinement,
        string: string,
        boolean: boolean,
        number: number,
        integer: integer,
        Date: DatePrimitive,
        map: map,
        array: array,
        frozen: frozen,
        identifier: identifier,
        identifierNumber: identifierNumber,
        late: late,
        undefined: undefinedType,
        null: nullType,
        snapshotProcessor: snapshotProcessor
    };

    let CS1;
    const RendererStateModel = types
        .model("RendererStateModel", {
        ready: false,
    })
        .actions((renderer) => ({
        setReady(cs1, resolve) {
            renderer.ready = true;
            console.log("RENDERER READY!");
            console.log(renderer);
            CS1.cam.setup(cs1, resolve);
        },
    }));
    const CamStateModel = types
        .model("CamStateModel", {
        ready: false,
    })
        .actions((cam) => ({
        setReady(cs1, resolve) {
            cam.ready = true;
            console.log("CAM READY!");
            CS1.rig.setup(cs1, resolve);
        },
    }));
    const RigStateModel = types
        .model("RigStateModel", {
        ready: false,
    })
        .actions((rig) => ({
        setReady(cs1, resolve) {
            rig.ready = true;
            console.log("RIG READY!");
            CS1.scene.setup(cs1, resolve);
        },
    }));
    const SceneStateModel = types
        .model("SceneStateModel", {
        ready: false,
    })
        .actions((scene) => ({
        setReady(cs1, resolve) {
            scene.ready = true;
            console.log("SCENE READY!");
            EngineStateStore.setReady(cs1, resolve);
        },
    }));
    const EngineStateModel = types
        .model("EngineStateModel", {
        renderer: RendererStateModel,
        cam: CamStateModel,
        rig: RigStateModel,
        scene: SceneStateModel,
        ready: false
    })
        .actions((engine) => ({
        setReady(cs1, resolve) {
            engine.ready = true;
            console.log("CS1 Engine is READY!");
            delete (CS1.config);
            resolve(cs1);
        },
        setEngine(cs1) {
            CS1 = cs1;
        }
    }));
    const EngineStateStore = EngineStateModel.create();
    // Listen to new snapshots, which are created anytime something changes
    onSnapshot(EngineStateStore, (snapshot) => {
        console.log("SNAPSHOT");
        console.log(snapshot);
    });

    class AframeCam {
        entity;
        type;
        lookAt;
        setActive;
        constructor(type) {
            this.type = type;
        }
        setup(cs1, resolve) {
            console.log("Setting up cam.");
            this.entity = document.createElement("a-entity");
            this.entity.setAttribute("camera", "active:true");
            this.entity.setAttribute("position", "0 1.65 0");
            this.entity.setAttribute("look-controls", "pointerLockEnabled: true");
            EngineStateStore.cam.setReady(cs1, resolve);
        }
    }

    class AframeRig {
        entity;
        type;
        constructor(type) {
            this.type = type;
        }
        setup(cs1, resolve) {
            console.log("Setting up rig.");
            this.entity = document.createElement("a-entity");
            this.entity.name = "CS1 Rig Entity";
            console.log("SETTING UP RIG WITH CS1.cam.entity");
            console.log(cs1.cam.entity);
            this.entity.appendChild(cs1.cam.entity);
            this.entity.setAttribute("rig-wasd-controls", "");
            EngineStateStore.rig.setReady(cs1, resolve);
        }
    }

    let temp = {
        cs1: {},
        resolve: {}
    };
    class AframeScene {
        entity;
        cameras;
        activeCamera;
        add;
        constructor() {
            this.add = async (arg) => {
                return new Promise((resolve, reject) => {
                    console.log("INSIDE SCENE ADD PROMISE ...");
                    console.log("this.entity");
                    console.log(this.entity);
                    console.log("this.entity.hasLoaded");
                    console.log(this.entity.hasLoaded);
                    console.log("arg");
                    console.log(arg);
                    console.log("typeof arg");
                    console.log(typeof arg);
                    switch (typeof arg) {
                        case "string":
                            const entity = document.createElement(arg);
                            if (this.entity.hasLoaded) {
                                this.entity.appendChild(entity);
                                resolve(entity);
                                return;
                            }
                            else {
                                this.entity.addEventListener("loaded", () => {
                                    this.entity.hasLoaded = true;
                                    console.log("SCENE LOADED STRING ARG");
                                    this.entity.appendChild(entity);
                                    resolve(entity);
                                    return;
                                });
                            }
                            break;
                        default:
                            const errorBox = document.createElement("a-box");
                            errorBox.setAttribute("color", "red");
                            errorBox.setAttribute("position", "0 0 -4");
                            if (this.entity.hasLoaded) {
                                this.entity.appendChild(errorBox);
                                reject(errorBox);
                                return;
                            }
                            else {
                                this.entity.addEventListener("loaded", () => {
                                    this.entity.hasLoaded = true;
                                    this.entity.appendChild(entity);
                                    reject(errorBox);
                                    return;
                                });
                            }
                    }
                });
            };
        }
        setup(cs1, resolve) {
            if (cs1.ecs?.scenes && cs1.ecs?.scenes[0]) {
                this.entity = cs1.ecs?.scenes[0];
                const cam = document.querySelector("[camera]");
                cam?.parentNode?.removeChild(cam);
            }
            else {
                this.entity = document.createElement("a-scene");
            }
            if (!window.CS1.ecs?.scenes || !window.CS1.ecs?.scenes[0])
                document.body.appendChild(this.entity);
            temp.cs1 = cs1;
            temp.resolve = resolve;
            this.entity.addEventListener('loaded', this.addRig.bind(this));
        }
        addRig() {
            console.log("ADDING CS1.rig.entity to CS1.scene");
            console.log(temp.cs1.rig);
            this.entity.appendChild(temp.cs1.rig.entity);
            EngineStateStore.scene.setReady(temp.cs1, temp.resolve);
        }
    }

    const utils = {
      loadScript: function (url, test) {
        return new Promise(function (resolve, reject) {
          var head = document.getElementsByTagName("head")[0];
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.addEventListener("load", function () {
            this.removeEventListener("load", this);
            if (test) {
              utils.resolveWhenTrue(resolve, reject, test);
            } else {
              console.log("Resolving loadScript in utils!");
              resolve();
            }
          });
          script.src = url;
          head.appendChild(script);
        });
      },

      resolveWhenTrue: function (resolve, reject, test) {
        let count = 0;
        setTimeout(() => {
          if (test) {
            resolve();
          } else if (count < 1000) {
            utils.resolveWhenTrue(resolve, test);
            count++;
          } else {
            reject(test);
          }
        }, 200);
      },

      uuid: function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      },

      equals: function (a, b) {
        var typeofa, typeofb, i, len, key;

        // If a and b refer to the same object then they are equal.
        if (a === b) return true;

        // Get the native type of both a and b. Use the built-in valueOf()
        // function to get the native object of each variable.
        typeofa = a === null ? "null" : typeof (a = a ? a.valueOf() : a);
        typeofb = b === null ? "null" : typeof (b = b ? b.valueOf() : b);

        // If a and b are not the same native type.
        if (typeofa !== typeofb) return false;

        switch (typeofa) {
          case "string":
          case "boolean":
          case "number":
          case "functon":
          case "undefined":
          case "null":
            return a === b;
        }

        // Convert the native type to a string. This allows us to test
        // if either a or b are Arrays and then handle accordingly.
        typeofa = {}.toString.call(a);
        typeofb = {}.toString.call(b);

        if (typeofa === typeofb) {
          // Compare the items of two arrays
          if (typeofa === "[object Array]") {
            if (a.length !== b.length) return false;

            len = a.length;
            for (i = 0; i < len; i++) {
              if (!utils.equals(a[i], b[i])) return false;
            }
            // Compare the keys of two objects
          } else {
            for (key in a) {
              if (!(key in b)) return false;

              if (!utils.equals(a[key], b[key])) return false;
            }
          }
        } else {
          return false;
        }

        return true;
      },

      deepCopy: (inObject) => {
        let outObject, value, key;

        if (typeof inObject !== "object" || inObject === null) {
          return inObject; // Return the value if inObject is not an object
        }

        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {};

        for (key in inObject) {
          value = inObject[key];

          // Recursively (deep) copy for nested objects, including arrays
          outObject[key] = utils.deepCopy(value);
        }

        return outObject;
      },

      getDecendantProp: function (obj, desc) {
        var arr = desc.split(".");
        while (arr.length) {
          obj = obj[arr.shift()];
        }
        return obj;
      },

      setDecendantProp: function (obj, desc, value) {
        var arr = desc.split(".");
        while (arr.length > 1) {
          obj = obj[arr.shift()];
        }
        return (obj[arr[0]] = value);
      },
    };
    const loadScript = utils.loadScript;

    const registry = {
      npm : {},
      cdn : {
        AFRAME : "https://cdn.jsdelivr.net/npm/aframe@1.3.0/dist/aframe-master.min.js",
        AFRAME_LATEST: "https://cdn.jsdelivr.net/gh/aframevr/aframe@090b5f8f0abe949ddcfdbbc14c75822322a2dd53/dist/aframe-master.min.js",
        simpleNavmeshConstraint : "https://cdn.jsdelivr.net/gh/rchovatiya88/simpleNavmeshConstraint/simpleNavmeshConstraint.js",
        rigWASDControls: "https://cdn.jsdelivr.net/gh/EricEisaman/rigWASDControls@v0.0.03/rigWASDControls.js"
      }
    };

    /*
    Note: the methods within this object perform mutations on the global
    CS1 object which is dependency injected in hydrate.
    */
    const Config = {
        hydrate: function (cs1) {
            Config.CS1 = cs1;
        },
        config: function (settings) {
            return new Promise(async (resolve, reject) => {
                // switch on settings
                // spread settings over defaults
                settings = {
                    ...Config.defaults,
                    ...settings
                };
                console.log("Running config with settings : ", settings);
                let renderer, ecs;
                switch (settings.ecs) {
                    case "CS1":
                        break;
                    default:
                        //AFRAME
                        console.log("LOADING AFRAME ...");
                        await loadScript(registry.cdn.AFRAME_LATEST);
                        await loadScript(registry.cdn.rigWASDControls);
                        await loadScript(registry.cdn.simpleNavmeshConstraint);
                        ecs = window.AFRAME;
                        console.log("ecs : ", ecs);
                        //delete(window.AFRAME);
                        renderer = window.THREE;
                        //delete(window.THREE);
                        console.log("Instantiating CS1 Cam, Rig, and Scene");
                        // Replace with instantiations of:
                        // AframeCam, AframeRig, and AframeScene
                        Config.CS1.cam = new AframeCam('player-cam');
                        Config.CS1.rig = new AframeRig('player-rig');
                        Config.CS1.scene = new AframeScene();
                }
                Config.CS1.ecs = ecs;
                Config.CS1.renderer = renderer;
                /*
                 NEXT STEPS:
                   Set the cam, rig, and scene
                   based upon the configuration.
                */
                if (Config.CS1.ecs && Config.CS1.renderer) {
                    Config.CS1.state.renderer.setReady(Config.CS1, resolve);
                }
                else {
                    console.error("REJECTING CONFIG PROMISE!!!");
                    reject(Config.CS1);
                }
            });
        },
        defaults: {
            renderer: "THREE",
            ecs: "AFRAME"
        },
        CS1: {}
    };

    (async () => {
        const CS1 = (window.CS1) = CS1Slug;
        EngineStateStore.setEngine(CS1);
        CS1.state = EngineStateStore;
        /*
          The user may either first call await CS1.config(settings) followed by CS1.run(main),
          or only call CS1.run(main) whereupon CS1.config({}) will be calleed internally
          prior to running the user's main application entry point.
          
          Note that at the CS1.config() function bootstraps the underlying ECS, renderer, ...
        */
        CS1.config = Config.config;
        Config.hydrate(CS1);
        CS1.run = async (main) => {
            if (!EngineStateStore.ready) {
                console.log("Calling CS1.config with defaults ...");
                await CS1.config({});
            }
            const ready = CS1.state.ready;
            console.log(`engine.ready state in CS1.run is ${ready}!`);
            if (ready) {
                console.log("Calling app main() from CS1!");
                // Check if main is async, if not throw exception.
                main();
                delete CS1.config;
            }
            else {
                console.error("ERROR HYDRATING FRAMEWORK.");
            }
        };
    })();

})();
//# sourceMappingURL=cs1-engine.js.map
