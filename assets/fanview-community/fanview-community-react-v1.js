var im = Object.defineProperty;
var cm = (g, O, T) => O in g ? im(g, O, { enumerable: !0, configurable: !0, writable: !0, value: T }) : g[O] = T;
var Ta = (g, O, T) => cm(g, typeof O != "symbol" ? O + "" : O, T);
var ff = { exports: {} }, Eu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b1;
function fm() {
  if (b1) return Eu;
  b1 = 1;
  var g = Symbol.for("react.transitional.element"), O = Symbol.for("react.fragment");
  function T(r, $, el) {
    var L = null;
    if (el !== void 0 && (L = "" + el), $.key !== void 0 && (L = "" + $.key), "key" in $) {
      el = {};
      for (var Sl in $)
        Sl !== "key" && (el[Sl] = $[Sl]);
    } else el = $;
    return $ = el.ref, {
      $$typeof: g,
      type: r,
      key: L,
      ref: $ !== void 0 ? $ : null,
      props: el
    };
  }
  return Eu.Fragment = O, Eu.jsx = T, Eu.jsxs = T, Eu;
}
var S1;
function om() {
  return S1 || (S1 = 1, ff.exports = fm()), ff.exports;
}
var R = om(), of = { exports: {} }, zu = {}, sf = { exports: {} }, df = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var E1;
function sm() {
  return E1 || (E1 = 1, (function(g) {
    function O(b, _) {
      var Z = b.length;
      b.push(_);
      l: for (; 0 < Z; ) {
        var ml = Z - 1 >>> 1, pl = b[ml];
        if (0 < $(pl, _))
          b[ml] = _, b[Z] = pl, Z = ml;
        else break l;
      }
    }
    function T(b) {
      return b.length === 0 ? null : b[0];
    }
    function r(b) {
      if (b.length === 0) return null;
      var _ = b[0], Z = b.pop();
      if (Z !== _) {
        b[0] = Z;
        l: for (var ml = 0, pl = b.length, s = pl >>> 1; ml < s; ) {
          var z = 2 * (ml + 1) - 1, M = b[z], N = z + 1, K = b[N];
          if (0 > $(M, Z))
            N < pl && 0 > $(K, M) ? (b[ml] = K, b[N] = Z, ml = N) : (b[ml] = M, b[z] = Z, ml = z);
          else if (N < pl && 0 > $(K, Z))
            b[ml] = K, b[N] = Z, ml = N;
          else break l;
        }
      }
      return _;
    }
    function $(b, _) {
      var Z = b.sortIndex - _.sortIndex;
      return Z !== 0 ? Z : b.id - _.id;
    }
    if (g.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var el = performance;
      g.unstable_now = function() {
        return el.now();
      };
    } else {
      var L = Date, Sl = L.now();
      g.unstable_now = function() {
        return L.now() - Sl;
      };
    }
    var D = [], A = [], w = 1, j = null, il = 3, q = !1, U = !1, V = !1, ol = !1, sl = typeof setTimeout == "function" ? setTimeout : null, xl = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function Ul(b) {
      for (var _ = T(A); _ !== null; ) {
        if (_.callback === null) r(A);
        else if (_.startTime <= b)
          r(A), _.sortIndex = _.expirationTime, O(D, _);
        else break;
        _ = T(A);
      }
    }
    function El(b) {
      if (V = !1, Ul(b), !U)
        if (T(D) !== null)
          U = !0, _l || (_l = !0, Y());
        else {
          var _ = T(A);
          _ !== null && Xl(El, _.startTime - b);
        }
    }
    var _l = !1, k = -1, Ml = 5, Fl = -1;
    function Ut() {
      return ol ? !0 : !(g.unstable_now() - Fl < Ml);
    }
    function nt() {
      if (ol = !1, _l) {
        var b = g.unstable_now();
        Fl = b;
        var _ = !0;
        try {
          l: {
            U = !1, V && (V = !1, xl(k), k = -1), q = !0;
            var Z = il;
            try {
              t: {
                for (Ul(b), j = T(D); j !== null && !(j.expirationTime > b && Ut()); ) {
                  var ml = j.callback;
                  if (typeof ml == "function") {
                    j.callback = null, il = j.priorityLevel;
                    var pl = ml(
                      j.expirationTime <= b
                    );
                    if (b = g.unstable_now(), typeof pl == "function") {
                      j.callback = pl, Ul(b), _ = !0;
                      break t;
                    }
                    j === T(D) && r(D), Ul(b);
                  } else r(D);
                  j = T(D);
                }
                if (j !== null) _ = !0;
                else {
                  var s = T(A);
                  s !== null && Xl(
                    El,
                    s.startTime - b
                  ), _ = !1;
                }
              }
              break l;
            } finally {
              j = null, il = Z, q = !1;
            }
            _ = void 0;
          }
        } finally {
          _ ? Y() : _l = !1;
        }
      }
    }
    var Y;
    if (typeof X == "function")
      Y = function() {
        X(nt);
      };
    else if (typeof MessageChannel < "u") {
      var gl = new MessageChannel(), Jl = gl.port2;
      gl.port1.onmessage = nt, Y = function() {
        Jl.postMessage(null);
      };
    } else
      Y = function() {
        sl(nt, 0);
      };
    function Xl(b, _) {
      k = sl(function() {
        b(g.unstable_now());
      }, _);
    }
    g.unstable_IdlePriority = 5, g.unstable_ImmediatePriority = 1, g.unstable_LowPriority = 4, g.unstable_NormalPriority = 3, g.unstable_Profiling = null, g.unstable_UserBlockingPriority = 2, g.unstable_cancelCallback = function(b) {
      b.callback = null;
    }, g.unstable_forceFrameRate = function(b) {
      0 > b || 125 < b ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ml = 0 < b ? Math.floor(1e3 / b) : 5;
    }, g.unstable_getCurrentPriorityLevel = function() {
      return il;
    }, g.unstable_next = function(b) {
      switch (il) {
        case 1:
        case 2:
        case 3:
          var _ = 3;
          break;
        default:
          _ = il;
      }
      var Z = il;
      il = _;
      try {
        return b();
      } finally {
        il = Z;
      }
    }, g.unstable_requestPaint = function() {
      ol = !0;
    }, g.unstable_runWithPriority = function(b, _) {
      switch (b) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          b = 3;
      }
      var Z = il;
      il = b;
      try {
        return _();
      } finally {
        il = Z;
      }
    }, g.unstable_scheduleCallback = function(b, _, Z) {
      var ml = g.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ml + Z : ml) : Z = ml, b) {
        case 1:
          var pl = -1;
          break;
        case 2:
          pl = 250;
          break;
        case 5:
          pl = 1073741823;
          break;
        case 4:
          pl = 1e4;
          break;
        default:
          pl = 5e3;
      }
      return pl = Z + pl, b = {
        id: w++,
        callback: _,
        priorityLevel: b,
        startTime: Z,
        expirationTime: pl,
        sortIndex: -1
      }, Z > ml ? (b.sortIndex = Z, O(A, b), T(D) === null && b === T(A) && (V ? (xl(k), k = -1) : V = !0, Xl(El, Z - ml))) : (b.sortIndex = pl, O(D, b), U || q || (U = !0, _l || (_l = !0, Y()))), b;
    }, g.unstable_shouldYield = Ut, g.unstable_wrapCallback = function(b) {
      var _ = il;
      return function() {
        var Z = il;
        il = _;
        try {
          return b.apply(this, arguments);
        } finally {
          il = Z;
        }
      };
    };
  })(df)), df;
}
var z1;
function dm() {
  return z1 || (z1 = 1, sf.exports = sm()), sf.exports;
}
var rf = { exports: {} }, Q = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var A1;
function rm() {
  if (A1) return Q;
  A1 = 1;
  var g = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), el = Symbol.for("react.consumer"), L = Symbol.for("react.context"), Sl = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), A = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), il = Symbol.iterator;
  function q(s) {
    return s === null || typeof s != "object" ? null : (s = il && s[il] || s["@@iterator"], typeof s == "function" ? s : null);
  }
  var U = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, V = Object.assign, ol = {};
  function sl(s, z, M) {
    this.props = s, this.context = z, this.refs = ol, this.updater = M || U;
  }
  sl.prototype.isReactComponent = {}, sl.prototype.setState = function(s, z) {
    if (typeof s != "object" && typeof s != "function" && s != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, s, z, "setState");
  }, sl.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function xl() {
  }
  xl.prototype = sl.prototype;
  function X(s, z, M) {
    this.props = s, this.context = z, this.refs = ol, this.updater = M || U;
  }
  var Ul = X.prototype = new xl();
  Ul.constructor = X, V(Ul, sl.prototype), Ul.isPureReactComponent = !0;
  var El = Array.isArray;
  function _l() {
  }
  var k = { H: null, A: null, T: null, S: null }, Ml = Object.prototype.hasOwnProperty;
  function Fl(s, z, M) {
    var N = M.ref;
    return {
      $$typeof: g,
      type: s,
      key: z,
      ref: N !== void 0 ? N : null,
      props: M
    };
  }
  function Ut(s, z) {
    return Fl(s.type, z, s.props);
  }
  function nt(s) {
    return typeof s == "object" && s !== null && s.$$typeof === g;
  }
  function Y(s) {
    var z = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(M) {
      return z[M];
    });
  }
  var gl = /\/+/g;
  function Jl(s, z) {
    return typeof s == "object" && s !== null && s.key != null ? Y("" + s.key) : z.toString(36);
  }
  function Xl(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (typeof s.status == "string" ? s.then(_l, _l) : (s.status = "pending", s.then(
          function(z) {
            s.status === "pending" && (s.status = "fulfilled", s.value = z);
          },
          function(z) {
            s.status === "pending" && (s.status = "rejected", s.reason = z);
          }
        )), s.status) {
          case "fulfilled":
            return s.value;
          case "rejected":
            throw s.reason;
        }
    }
    throw s;
  }
  function b(s, z, M, N, K) {
    var F = typeof s;
    (F === "undefined" || F === "boolean") && (s = null);
    var fl = !1;
    if (s === null) fl = !0;
    else
      switch (F) {
        case "bigint":
        case "string":
        case "number":
          fl = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case g:
            case O:
              fl = !0;
              break;
            case w:
              return fl = s._init, b(
                fl(s._payload),
                z,
                M,
                N,
                K
              );
          }
      }
    if (fl)
      return K = K(s), fl = N === "" ? "." + Jl(s, 0) : N, El(K) ? (M = "", fl != null && (M = fl.replace(gl, "$&/") + "/"), b(K, z, M, "", function(Oe) {
        return Oe;
      })) : K != null && (nt(K) && (K = Ut(
        K,
        M + (K.key == null || s && s.key === K.key ? "" : ("" + K.key).replace(
          gl,
          "$&/"
        ) + "/") + fl
      )), z.push(K)), 1;
    fl = 0;
    var $l = N === "" ? "." : N + ":";
    if (El(s))
      for (var Cl = 0; Cl < s.length; Cl++)
        N = s[Cl], F = $l + Jl(N, Cl), fl += b(
          N,
          z,
          M,
          F,
          K
        );
    else if (Cl = q(s), typeof Cl == "function")
      for (s = Cl.call(s), Cl = 0; !(N = s.next()).done; )
        N = N.value, F = $l + Jl(N, Cl++), fl += b(
          N,
          z,
          M,
          F,
          K
        );
    else if (F === "object") {
      if (typeof s.then == "function")
        return b(
          Xl(s),
          z,
          M,
          N,
          K
        );
      throw z = String(s), Error(
        "Objects are not valid as a React child (found: " + (z === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return fl;
  }
  function _(s, z, M) {
    if (s == null) return s;
    var N = [], K = 0;
    return b(s, N, "", "", function(F) {
      return z.call(M, F, K++);
    }), N;
  }
  function Z(s) {
    if (s._status === -1) {
      var z = s._result;
      z = z(), z.then(
        function(M) {
          (s._status === 0 || s._status === -1) && (s._status = 1, s._result = M);
        },
        function(M) {
          (s._status === 0 || s._status === -1) && (s._status = 2, s._result = M);
        }
      ), s._status === -1 && (s._status = 0, s._result = z);
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var ml = typeof reportError == "function" ? reportError : function(s) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof s == "object" && s !== null && typeof s.message == "string" ? String(s.message) : String(s),
        error: s
      });
      if (!window.dispatchEvent(z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", s);
      return;
    }
    console.error(s);
  }, pl = {
    map: _,
    forEach: function(s, z, M) {
      _(
        s,
        function() {
          z.apply(this, arguments);
        },
        M
      );
    },
    count: function(s) {
      var z = 0;
      return _(s, function() {
        z++;
      }), z;
    },
    toArray: function(s) {
      return _(s, function(z) {
        return z;
      }) || [];
    },
    only: function(s) {
      if (!nt(s))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return s;
    }
  };
  return Q.Activity = j, Q.Children = pl, Q.Component = sl, Q.Fragment = T, Q.Profiler = $, Q.PureComponent = X, Q.StrictMode = r, Q.Suspense = D, Q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = k, Q.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(s) {
      return k.H.useMemoCache(s);
    }
  }, Q.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, Q.cacheSignal = function() {
    return null;
  }, Q.cloneElement = function(s, z, M) {
    if (s == null)
      throw Error(
        "The argument must be a React element, but you passed " + s + "."
      );
    var N = V({}, s.props), K = s.key;
    if (z != null)
      for (F in z.key !== void 0 && (K = "" + z.key), z)
        !Ml.call(z, F) || F === "key" || F === "__self" || F === "__source" || F === "ref" && z.ref === void 0 || (N[F] = z[F]);
    var F = arguments.length - 2;
    if (F === 1) N.children = M;
    else if (1 < F) {
      for (var fl = Array(F), $l = 0; $l < F; $l++)
        fl[$l] = arguments[$l + 2];
      N.children = fl;
    }
    return Fl(s.type, K, N);
  }, Q.createContext = function(s) {
    return s = {
      $$typeof: L,
      _currentValue: s,
      _currentValue2: s,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, s.Provider = s, s.Consumer = {
      $$typeof: el,
      _context: s
    }, s;
  }, Q.createElement = function(s, z, M) {
    var N, K = {}, F = null;
    if (z != null)
      for (N in z.key !== void 0 && (F = "" + z.key), z)
        Ml.call(z, N) && N !== "key" && N !== "__self" && N !== "__source" && (K[N] = z[N]);
    var fl = arguments.length - 2;
    if (fl === 1) K.children = M;
    else if (1 < fl) {
      for (var $l = Array(fl), Cl = 0; Cl < fl; Cl++)
        $l[Cl] = arguments[Cl + 2];
      K.children = $l;
    }
    if (s && s.defaultProps)
      for (N in fl = s.defaultProps, fl)
        K[N] === void 0 && (K[N] = fl[N]);
    return Fl(s, F, K);
  }, Q.createRef = function() {
    return { current: null };
  }, Q.forwardRef = function(s) {
    return { $$typeof: Sl, render: s };
  }, Q.isValidElement = nt, Q.lazy = function(s) {
    return {
      $$typeof: w,
      _payload: { _status: -1, _result: s },
      _init: Z
    };
  }, Q.memo = function(s, z) {
    return {
      $$typeof: A,
      type: s,
      compare: z === void 0 ? null : z
    };
  }, Q.startTransition = function(s) {
    var z = k.T, M = {};
    k.T = M;
    try {
      var N = s(), K = k.S;
      K !== null && K(M, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(_l, ml);
    } catch (F) {
      ml(F);
    } finally {
      z !== null && M.types !== null && (z.types = M.types), k.T = z;
    }
  }, Q.unstable_useCacheRefresh = function() {
    return k.H.useCacheRefresh();
  }, Q.use = function(s) {
    return k.H.use(s);
  }, Q.useActionState = function(s, z, M) {
    return k.H.useActionState(s, z, M);
  }, Q.useCallback = function(s, z) {
    return k.H.useCallback(s, z);
  }, Q.useContext = function(s) {
    return k.H.useContext(s);
  }, Q.useDebugValue = function() {
  }, Q.useDeferredValue = function(s, z) {
    return k.H.useDeferredValue(s, z);
  }, Q.useEffect = function(s, z) {
    return k.H.useEffect(s, z);
  }, Q.useEffectEvent = function(s) {
    return k.H.useEffectEvent(s);
  }, Q.useId = function() {
    return k.H.useId();
  }, Q.useImperativeHandle = function(s, z, M) {
    return k.H.useImperativeHandle(s, z, M);
  }, Q.useInsertionEffect = function(s, z) {
    return k.H.useInsertionEffect(s, z);
  }, Q.useLayoutEffect = function(s, z) {
    return k.H.useLayoutEffect(s, z);
  }, Q.useMemo = function(s, z) {
    return k.H.useMemo(s, z);
  }, Q.useOptimistic = function(s, z) {
    return k.H.useOptimistic(s, z);
  }, Q.useReducer = function(s, z, M) {
    return k.H.useReducer(s, z, M);
  }, Q.useRef = function(s) {
    return k.H.useRef(s);
  }, Q.useState = function(s) {
    return k.H.useState(s);
  }, Q.useSyncExternalStore = function(s, z, M) {
    return k.H.useSyncExternalStore(
      s,
      z,
      M
    );
  }, Q.useTransition = function() {
    return k.H.useTransition();
  }, Q.version = "19.2.0", Q;
}
var T1;
function vf() {
  return T1 || (T1 = 1, rf.exports = rm()), rf.exports;
}
var mf = { exports: {} }, Wl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var x1;
function mm() {
  if (x1) return Wl;
  x1 = 1;
  var g = vf();
  function O(D) {
    var A = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        A += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return "Minified React error #" + D + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function T() {
  }
  var r = {
    d: {
      f: T,
      r: function() {
        throw Error(O(522));
      },
      D: T,
      C: T,
      L: T,
      m: T,
      X: T,
      S: T,
      M: T
    },
    p: 0,
    findDOMNode: null
  }, $ = Symbol.for("react.portal");
  function el(D, A, w) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: $,
      key: j == null ? null : "" + j,
      children: D,
      containerInfo: A,
      implementation: w
    };
  }
  var L = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Sl(D, A) {
    if (D === "font") return "";
    if (typeof A == "string")
      return A === "use-credentials" ? A : "";
  }
  return Wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Wl.createPortal = function(D, A) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11)
      throw Error(O(299));
    return el(D, A, null, w);
  }, Wl.flushSync = function(D) {
    var A = L.T, w = r.p;
    try {
      if (L.T = null, r.p = 2, D) return D();
    } finally {
      L.T = A, r.p = w, r.d.f();
    }
  }, Wl.preconnect = function(D, A) {
    typeof D == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, r.d.C(D, A));
  }, Wl.prefetchDNS = function(D) {
    typeof D == "string" && r.d.D(D);
  }, Wl.preinit = function(D, A) {
    if (typeof D == "string" && A && typeof A.as == "string") {
      var w = A.as, j = Sl(w, A.crossOrigin), il = typeof A.integrity == "string" ? A.integrity : void 0, q = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      w === "style" ? r.d.S(
        D,
        typeof A.precedence == "string" ? A.precedence : void 0,
        {
          crossOrigin: j,
          integrity: il,
          fetchPriority: q
        }
      ) : w === "script" && r.d.X(D, {
        crossOrigin: j,
        integrity: il,
        fetchPriority: q,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0
      });
    }
  }, Wl.preinitModule = function(D, A) {
    if (typeof D == "string")
      if (typeof A == "object" && A !== null) {
        if (A.as == null || A.as === "script") {
          var w = Sl(
            A.as,
            A.crossOrigin
          );
          r.d.M(D, {
            crossOrigin: w,
            integrity: typeof A.integrity == "string" ? A.integrity : void 0,
            nonce: typeof A.nonce == "string" ? A.nonce : void 0
          });
        }
      } else A == null && r.d.M(D);
  }, Wl.preload = function(D, A) {
    if (typeof D == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var w = A.as, j = Sl(w, A.crossOrigin);
      r.d.L(D, w, {
        crossOrigin: j,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0,
        type: typeof A.type == "string" ? A.type : void 0,
        fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0,
        referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0,
        imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0,
        imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0,
        media: typeof A.media == "string" ? A.media : void 0
      });
    }
  }, Wl.preloadModule = function(D, A) {
    if (typeof D == "string")
      if (A) {
        var w = Sl(A.as, A.crossOrigin);
        r.d.m(D, {
          as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0,
          crossOrigin: w,
          integrity: typeof A.integrity == "string" ? A.integrity : void 0
        });
      } else r.d.m(D);
  }, Wl.requestFormReset = function(D) {
    r.d.r(D);
  }, Wl.unstable_batchedUpdates = function(D, A) {
    return D(A);
  }, Wl.useFormState = function(D, A, w) {
    return L.H.useFormState(D, A, w);
  }, Wl.useFormStatus = function() {
    return L.H.useHostTransitionStatus();
  }, Wl.version = "19.2.0", Wl;
}
var _1;
function hm() {
  if (_1) return mf.exports;
  _1 = 1;
  function g() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (O) {
        console.error(O);
      }
  }
  return g(), mf.exports = mm(), mf.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var M1;
function ym() {
  if (M1) return zu;
  M1 = 1;
  var g = dm(), O = vf(), T = hm();
  function r(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function $(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function el(l) {
    var t = l, a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (a = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function L(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Sl(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (el(l) !== l)
      throw Error(r(188));
  }
  function A(l) {
    var t = l.alternate;
    if (!t) {
      if (t = el(l), t === null) throw Error(r(188));
      return t !== l ? null : l;
    }
    for (var a = l, e = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (e = u.return, e !== null) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return D(u), l;
          if (n === e) return D(u), t;
          n = n.sibling;
        }
        throw Error(r(188));
      }
      if (a.return !== e.return) a = u, e = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (a.alternate !== e) throw Error(r(190));
    }
    if (a.tag !== 3) throw Error(r(188));
    return a.stateNode.current === a ? l : t;
  }
  function w(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = w(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var j = Object.assign, il = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), U = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), ol = Symbol.for("react.strict_mode"), sl = Symbol.for("react.profiler"), xl = Symbol.for("react.consumer"), X = Symbol.for("react.context"), Ul = Symbol.for("react.forward_ref"), El = Symbol.for("react.suspense"), _l = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), Ml = Symbol.for("react.lazy"), Fl = Symbol.for("react.activity"), Ut = Symbol.for("react.memo_cache_sentinel"), nt = Symbol.iterator;
  function Y(l) {
    return l === null || typeof l != "object" ? null : (l = nt && l[nt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var gl = Symbol.for("react.client.reference");
  function Jl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === gl ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case V:
        return "Fragment";
      case sl:
        return "Profiler";
      case ol:
        return "StrictMode";
      case El:
        return "Suspense";
      case _l:
        return "SuspenseList";
      case Fl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case U:
          return "Portal";
        case X:
          return l.displayName || "Context";
        case xl:
          return (l._context.displayName || "Context") + ".Consumer";
        case Ul:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case k:
          return t = l.displayName || null, t !== null ? t : Jl(l.type) || "Memo";
        case Ml:
          t = l._payload, l = l._init;
          try {
            return Jl(l(t));
          } catch {
          }
      }
    return null;
  }
  var Xl = Array.isArray, b = O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _ = T.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ml = [], pl = -1;
  function s(l) {
    return { current: l };
  }
  function z(l) {
    0 > pl || (l.current = ml[pl], ml[pl] = null, pl--);
  }
  function M(l, t) {
    pl++, ml[pl] = l.current, l.current = t;
  }
  var N = s(null), K = s(null), F = s(null), fl = s(null);
  function $l(l, t) {
    switch (M(F, t), M(K, l), M(N, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Qs(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Qs(t), l = Ls(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    z(N), M(N, l);
  }
  function Cl() {
    z(N), z(K), z(F);
  }
  function Oe(l) {
    l.memoizedState !== null && M(fl, l);
    var t = N.current, a = Ls(t, l.type);
    t !== a && (M(K, l), M(N, a));
  }
  function Au(l) {
    K.current === l && (z(N), z(K)), fl.current === l && (z(fl), gu._currentValue = Z);
  }
  var Ln, gf;
  function xa(l) {
    if (Ln === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Ln = t && t[1] || "", gf = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ln + l + gf;
  }
  var wn = !1;
  function Vn(l, t) {
    if (!l || wn) return "";
    wn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var E = function() {
                throw Error();
              };
              if (Object.defineProperty(E.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(E, []);
                } catch (v) {
                  var y = v;
                }
                Reflect.construct(l, [], E);
              } else {
                try {
                  E.call();
                } catch (v) {
                  y = v;
                }
                l.call(E.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (v) {
                y = v;
              }
              (E = l()) && typeof E.catch == "function" && E.catch(function() {
              });
            }
          } catch (v) {
            if (v && y && typeof v.stack == "string")
              return [v.stack, y.stack];
          }
          return [null, null];
        }
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        e.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = e.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var f = i.split(`
`), h = c.split(`
`);
        for (u = e = 0; e < f.length && !f[e].includes("DetermineComponentFrameRoot"); )
          e++;
        for (; u < h.length && !h[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (e === f.length || u === h.length)
          for (e = f.length - 1, u = h.length - 1; 1 <= e && 0 <= u && f[e] !== h[u]; )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== h[u]) {
            if (e !== 1 || u !== 1)
              do
                if (e--, u--, 0 > u || f[e] !== h[u]) {
                  var p = `
` + f[e].replace(" at new ", " at ");
                  return l.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", l.displayName)), p;
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      wn = !1, Error.prepareStackTrace = a;
    }
    return (a = l ? l.displayName || l.name : "") ? xa(a) : "";
  }
  function Y1(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return xa(l.type);
      case 16:
        return xa("Lazy");
      case 13:
        return l.child !== t && t !== null ? xa("Suspense Fallback") : xa("Suspense");
      case 19:
        return xa("SuspenseList");
      case 0:
      case 15:
        return Vn(l.type, !1);
      case 11:
        return Vn(l.type.render, !1);
      case 1:
        return Vn(l.type, !0);
      case 31:
        return xa("Activity");
      default:
        return "";
    }
  }
  function pf(l) {
    try {
      var t = "", a = null;
      do
        t += Y1(l, a), a = l, l = l.return;
      while (l);
      return t;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  var Kn = Object.prototype.hasOwnProperty, Jn = g.unstable_scheduleCallback, Wn = g.unstable_cancelCallback, B1 = g.unstable_shouldYield, G1 = g.unstable_requestPaint, it = g.unstable_now, Z1 = g.unstable_getCurrentPriorityLevel, bf = g.unstable_ImmediatePriority, Sf = g.unstable_UserBlockingPriority, Tu = g.unstable_NormalPriority, X1 = g.unstable_LowPriority, Ef = g.unstable_IdlePriority, Q1 = g.log, L1 = g.unstable_setDisableYieldValue, De = null, ct = null;
  function Pt(l) {
    if (typeof Q1 == "function" && L1(l), ct && typeof ct.setStrictMode == "function")
      try {
        ct.setStrictMode(De, l);
      } catch {
      }
  }
  var ft = Math.clz32 ? Math.clz32 : K1, w1 = Math.log, V1 = Math.LN2;
  function K1(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (w1(l) / V1 | 0) | 0;
  }
  var xu = 256, _u = 262144, Mu = 4194304;
  function _a(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Ou(l, t, a) {
    var e = l.pendingLanes;
    if (e === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = e & 134217727;
    return c !== 0 ? (e = c & ~n, e !== 0 ? u = _a(e) : (i &= c, i !== 0 ? u = _a(i) : a || (a = c & ~l, a !== 0 && (u = _a(a))))) : (c = e & ~n, c !== 0 ? u = _a(c) : i !== 0 ? u = _a(i) : a || (a = e & ~l, a !== 0 && (u = _a(a)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : u;
  }
  function Ue(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function J1(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function zf() {
    var l = Mu;
    return Mu <<= 1, (Mu & 62914560) === 0 && (Mu = 4194304), l;
  }
  function $n(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Ce(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function W1(l, t, a, e, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = a, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= a, l.entangledLanes &= a, l.errorRecoveryDisabledLanes &= a, l.shellSuspendCounter = 0;
    var c = l.entanglements, f = l.expirationTimes, h = l.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var p = 31 - ft(a), E = 1 << p;
      c[p] = 0, f[p] = -1;
      var y = h[p];
      if (y !== null)
        for (h[p] = null, p = 0; p < y.length; p++) {
          var v = y[p];
          v !== null && (v.lane &= -536870913);
        }
      a &= ~E;
    }
    e !== 0 && Af(l, e, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function Af(l, t, a) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var e = 31 - ft(t);
    l.entangledLanes |= t, l.entanglements[e] = l.entanglements[e] | 1073741824 | a & 261930;
  }
  function Tf(l, t) {
    var a = l.entangledLanes |= t;
    for (l = l.entanglements; a; ) {
      var e = 31 - ft(a), u = 1 << e;
      u & t | l[e] & t && (l[e] |= t), a &= ~u;
    }
  }
  function xf(l, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : kn(a), (a & (l.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function kn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Fn(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function _f() {
    var l = _.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : r1(l.type));
  }
  function Mf(l, t) {
    var a = _.p;
    try {
      return _.p = l, t();
    } finally {
      _.p = a;
    }
  }
  var la = Math.random().toString(36).slice(2), Ql = "__reactFiber$" + la, Il = "__reactProps$" + la, wa = "__reactContainer$" + la, In = "__reactEvents$" + la, $1 = "__reactListeners$" + la, k1 = "__reactHandles$" + la, Of = "__reactResources$" + la, Ne = "__reactMarker$" + la;
  function Pn(l) {
    delete l[Ql], delete l[Il], delete l[In], delete l[$1], delete l[k1];
  }
  function Va(l) {
    var t = l[Ql];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if (t = a[wa] || a[Ql]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (l = ks(l); l !== null; ) {
            if (a = l[Ql]) return a;
            l = ks(l);
          }
        return t;
      }
      l = a, a = l.parentNode;
    }
    return null;
  }
  function Ka(l) {
    if (l = l[Ql] || l[wa]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function He(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(r(33));
  }
  function Ja(l) {
    var t = l[Of];
    return t || (t = l[Of] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Gl(l) {
    l[Ne] = !0;
  }
  var Df = /* @__PURE__ */ new Set(), Uf = {};
  function Ma(l, t) {
    Wa(l, t), Wa(l + "Capture", t);
  }
  function Wa(l, t) {
    for (Uf[l] = t, l = 0; l < t.length; l++)
      Df.add(t[l]);
  }
  var F1 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Cf = {}, Nf = {};
  function I1(l) {
    return Kn.call(Nf, l) ? !0 : Kn.call(Cf, l) ? !1 : F1.test(l) ? Nf[l] = !0 : (Cf[l] = !0, !1);
  }
  function Du(l, t, a) {
    if (I1(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var e = t.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function Uu(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function jt(l, t, a, e) {
    if (e === null) l.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + e);
    }
  }
  function gt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Hf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function P1(l, t, a) {
    var e = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
      var u = e.get, n = e.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          a = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: e.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(i) {
          a = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function li(l) {
    if (!l._valueTracker) {
      var t = Hf(l) ? "checked" : "value";
      l._valueTracker = P1(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Rf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), e = "";
    return l && (e = Hf(l) ? l.checked ? "true" : "false" : l.value), l = e, l !== a ? (t.setValue(l), !0) : !1;
  }
  function Cu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var ld = /[\n"\\]/g;
  function pt(l) {
    return l.replace(
      ld,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ti(l, t, a, e, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + gt(t)) : l.value !== "" + gt(t) && (l.value = "" + gt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? ai(l, i, gt(t)) : a != null ? ai(l, i, gt(a)) : e != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + gt(c) : l.removeAttribute("name");
  }
  function jf(l, t, a, e, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || a != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        li(l);
        return;
      }
      a = a != null ? "" + gt(a) : "", t = t != null ? "" + gt(t) : a, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    e = e ?? u, e = typeof e != "function" && typeof e != "symbol" && !!e, l.checked = c ? l.checked : !!e, l.defaultChecked = !!e, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), li(l);
  }
  function ai(l, t, a) {
    t === "number" && Cu(l.ownerDocument) === l || l.defaultValue === "" + a || (l.defaultValue = "" + a);
  }
  function $a(l, t, a, e) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < a.length; u++)
        t["$" + a[u]] = !0;
      for (a = 0; a < l.length; a++)
        u = t.hasOwnProperty("$" + l[a].value), l[a].selected !== u && (l[a].selected = u), u && e && (l[a].defaultSelected = !0);
    } else {
      for (a = "" + gt(a), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === a) {
          l[u].selected = !0, e && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function qf(l, t, a) {
    if (t != null && (t = "" + gt(t), t !== l.value && (l.value = t), a == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + gt(a) : "";
  }
  function Yf(l, t, a, e) {
    if (t == null) {
      if (e != null) {
        if (a != null) throw Error(r(92));
        if (Xl(e)) {
          if (1 < e.length) throw Error(r(93));
          e = e[0];
        }
        a = e;
      }
      a == null && (a = ""), t = a;
    }
    a = gt(t), l.defaultValue = a, e = l.textContent, e === a && e !== "" && e !== null && (l.value = e), li(l);
  }
  function ka(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var td = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bf(l, t, a) {
    var e = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? e ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : e ? l.setProperty(t, a) : typeof a != "number" || a === 0 || td.has(t) ? t === "float" ? l.cssFloat = a : l[t] = ("" + a).trim() : l[t] = a + "px";
  }
  function Gf(l, t, a) {
    if (t != null && typeof t != "object")
      throw Error(r(62));
    if (l = l.style, a != null) {
      for (var e in a)
        !a.hasOwnProperty(e) || t != null && t.hasOwnProperty(e) || (e.indexOf("--") === 0 ? l.setProperty(e, "") : e === "float" ? l.cssFloat = "" : l[e] = "");
      for (var u in t)
        e = t[u], t.hasOwnProperty(u) && a[u] !== e && Bf(l, u, e);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Bf(l, n, t[n]);
  }
  function ei(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var ad = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ed = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Nu(l) {
    return ed.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function qt() {
  }
  var ui = null;
  function ni(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Fa = null, Ia = null;
  function Zf(l) {
    var t = Ka(l);
    if (t && (l = t.stateNode)) {
      var a = l[Il] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (ti(
            l,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + pt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var e = a[t];
              if (e !== l && e.form === l.form) {
                var u = e[Il] || null;
                if (!u) throw Error(r(90));
                ti(
                  e,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < a.length; t++)
              e = a[t], e.form === l.form && Rf(e);
          }
          break l;
        case "textarea":
          qf(l, a.value, a.defaultValue);
          break l;
        case "select":
          t = a.value, t != null && $a(l, !!a.multiple, t, !1);
      }
    }
  }
  var ii = !1;
  function Xf(l, t, a) {
    if (ii) return l(t, a);
    ii = !0;
    try {
      var e = l(t);
      return e;
    } finally {
      if (ii = !1, (Fa !== null || Ia !== null) && (Sn(), Fa && (t = Fa, l = Ia, Ia = Fa = null, Zf(t), l)))
        for (t = 0; t < l.length; t++) Zf(l[t]);
    }
  }
  function Re(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var e = a[Il] || null;
    if (e === null) return null;
    a = e[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (e = !e.disabled) || (l = l.type, e = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !e;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function")
      throw Error(
        r(231, t, typeof a)
      );
    return a;
  }
  var Yt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ci = !1;
  if (Yt)
    try {
      var je = {};
      Object.defineProperty(je, "passive", {
        get: function() {
          ci = !0;
        }
      }), window.addEventListener("test", je, je), window.removeEventListener("test", je, je);
    } catch {
      ci = !1;
    }
  var ta = null, fi = null, Hu = null;
  function Qf() {
    if (Hu) return Hu;
    var l, t = fi, a = t.length, e, u = "value" in ta ? ta.value : ta.textContent, n = u.length;
    for (l = 0; l < a && t[l] === u[l]; l++) ;
    var i = a - l;
    for (e = 1; e <= i && t[a - e] === u[n - e]; e++) ;
    return Hu = u.slice(l, 1 < e ? 1 - e : void 0);
  }
  function Ru(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function ju() {
    return !0;
  }
  function Lf() {
    return !1;
  }
  function Pl(l) {
    function t(a, e, u, n, i) {
      this._reactName = a, this._targetInst = u, this.type = e, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (a = l[c], this[c] = a ? a(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? ju : Lf, this.isPropagationStopped = Lf, this;
    }
    return j(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = ju);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = ju);
      },
      persist: function() {
      },
      isPersistent: ju
    }), t;
  }
  var Oa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, qu = Pl(Oa), qe = j({}, Oa, { view: 0, detail: 0 }), ud = Pl(qe), oi, si, Ye, Yu = j({}, qe, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ri,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Ye && (Ye && l.type === "mousemove" ? (oi = l.screenX - Ye.screenX, si = l.screenY - Ye.screenY) : si = oi = 0, Ye = l), oi);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : si;
    }
  }), wf = Pl(Yu), nd = j({}, Yu, { dataTransfer: 0 }), id = Pl(nd), cd = j({}, qe, { relatedTarget: 0 }), di = Pl(cd), fd = j({}, Oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), od = Pl(fd), sd = j({}, Oa, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), dd = Pl(sd), rd = j({}, Oa, { data: 0 }), Vf = Pl(rd), md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, hd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, yd = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function vd(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = yd[l]) ? !!t[l] : !1;
  }
  function ri() {
    return vd;
  }
  var gd = j({}, qe, {
    key: function(l) {
      if (l.key) {
        var t = md[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Ru(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? hd[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ri,
    charCode: function(l) {
      return l.type === "keypress" ? Ru(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Ru(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), pd = Pl(gd), bd = j({}, Yu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Kf = Pl(bd), Sd = j({}, qe, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ri
  }), Ed = Pl(Sd), zd = j({}, Oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ad = Pl(zd), Td = j({}, Yu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xd = Pl(Td), _d = j({}, Oa, {
    newState: 0,
    oldState: 0
  }), Md = Pl(_d), Od = [9, 13, 27, 32], mi = Yt && "CompositionEvent" in window, Be = null;
  Yt && "documentMode" in document && (Be = document.documentMode);
  var Dd = Yt && "TextEvent" in window && !Be, Jf = Yt && (!mi || Be && 8 < Be && 11 >= Be), Wf = " ", $f = !1;
  function kf(l, t) {
    switch (l) {
      case "keyup":
        return Od.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ff(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Pa = !1;
  function Ud(l, t) {
    switch (l) {
      case "compositionend":
        return Ff(t);
      case "keypress":
        return t.which !== 32 ? null : ($f = !0, Wf);
      case "textInput":
        return l = t.data, l === Wf && $f ? null : l;
      default:
        return null;
    }
  }
  function Cd(l, t) {
    if (Pa)
      return l === "compositionend" || !mi && kf(l, t) ? (l = Qf(), Hu = fi = ta = null, Pa = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Jf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Nd = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function If(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Nd[l.type] : t === "textarea";
  }
  function Pf(l, t, a, e) {
    Fa ? Ia ? Ia.push(e) : Ia = [e] : Fa = e, t = Mn(t, "onChange"), 0 < t.length && (a = new qu(
      "onChange",
      "change",
      null,
      a,
      e
    ), l.push({ event: a, listeners: t }));
  }
  var Ge = null, Ze = null;
  function Hd(l) {
    qs(l, 0);
  }
  function Bu(l) {
    var t = He(l);
    if (Rf(t)) return l;
  }
  function lo(l, t) {
    if (l === "change") return t;
  }
  var to = !1;
  if (Yt) {
    var hi;
    if (Yt) {
      var yi = "oninput" in document;
      if (!yi) {
        var ao = document.createElement("div");
        ao.setAttribute("oninput", "return;"), yi = typeof ao.oninput == "function";
      }
      hi = yi;
    } else hi = !1;
    to = hi && (!document.documentMode || 9 < document.documentMode);
  }
  function eo() {
    Ge && (Ge.detachEvent("onpropertychange", uo), Ze = Ge = null);
  }
  function uo(l) {
    if (l.propertyName === "value" && Bu(Ze)) {
      var t = [];
      Pf(
        t,
        Ze,
        l,
        ni(l)
      ), Xf(Hd, t);
    }
  }
  function Rd(l, t, a) {
    l === "focusin" ? (eo(), Ge = t, Ze = a, Ge.attachEvent("onpropertychange", uo)) : l === "focusout" && eo();
  }
  function jd(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Bu(Ze);
  }
  function qd(l, t) {
    if (l === "click") return Bu(t);
  }
  function Yd(l, t) {
    if (l === "input" || l === "change")
      return Bu(t);
  }
  function Bd(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var ot = typeof Object.is == "function" ? Object.is : Bd;
  function Xe(l, t) {
    if (ot(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(l), e = Object.keys(t);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Kn.call(t, u) || !ot(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function no(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function io(l, t) {
    var a = no(l);
    l = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (e = l + a.textContent.length, l <= t && e >= t)
          return { node: a, offset: t - l };
        l = e;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = no(a);
    }
  }
  function co(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? co(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function fo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Cu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = Cu(l.document);
    }
    return t;
  }
  function vi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Gd = Yt && "documentMode" in document && 11 >= document.documentMode, le = null, gi = null, Qe = null, pi = !1;
  function oo(l, t, a) {
    var e = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    pi || le == null || le !== Cu(e) || (e = le, "selectionStart" in e && vi(e) ? e = { start: e.selectionStart, end: e.selectionEnd } : (e = (e.ownerDocument && e.ownerDocument.defaultView || window).getSelection(), e = {
      anchorNode: e.anchorNode,
      anchorOffset: e.anchorOffset,
      focusNode: e.focusNode,
      focusOffset: e.focusOffset
    }), Qe && Xe(Qe, e) || (Qe = e, e = Mn(gi, "onSelect"), 0 < e.length && (t = new qu(
      "onSelect",
      "select",
      null,
      t,
      a
    ), l.push({ event: t, listeners: e }), t.target = le)));
  }
  function Da(l, t) {
    var a = {};
    return a[l.toLowerCase()] = t.toLowerCase(), a["Webkit" + l] = "webkit" + t, a["Moz" + l] = "moz" + t, a;
  }
  var te = {
    animationend: Da("Animation", "AnimationEnd"),
    animationiteration: Da("Animation", "AnimationIteration"),
    animationstart: Da("Animation", "AnimationStart"),
    transitionrun: Da("Transition", "TransitionRun"),
    transitionstart: Da("Transition", "TransitionStart"),
    transitioncancel: Da("Transition", "TransitionCancel"),
    transitionend: Da("Transition", "TransitionEnd")
  }, bi = {}, so = {};
  Yt && (so = document.createElement("div").style, "AnimationEvent" in window || (delete te.animationend.animation, delete te.animationiteration.animation, delete te.animationstart.animation), "TransitionEvent" in window || delete te.transitionend.transition);
  function Ua(l) {
    if (bi[l]) return bi[l];
    if (!te[l]) return l;
    var t = te[l], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in so)
        return bi[l] = t[a];
    return l;
  }
  var ro = Ua("animationend"), mo = Ua("animationiteration"), ho = Ua("animationstart"), Zd = Ua("transitionrun"), Xd = Ua("transitionstart"), Qd = Ua("transitioncancel"), yo = Ua("transitionend"), vo = /* @__PURE__ */ new Map(), Si = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Si.push("scrollEnd");
  function Mt(l, t) {
    vo.set(l, t), Ma(t, [l]);
  }
  var Gu = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, bt = [], ae = 0, Ei = 0;
  function Zu() {
    for (var l = ae, t = Ei = ae = 0; t < l; ) {
      var a = bt[t];
      bt[t++] = null;
      var e = bt[t];
      bt[t++] = null;
      var u = bt[t];
      bt[t++] = null;
      var n = bt[t];
      if (bt[t++] = null, e !== null && u !== null) {
        var i = e.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), e.pending = u;
      }
      n !== 0 && go(a, u, n);
    }
  }
  function Xu(l, t, a, e) {
    bt[ae++] = l, bt[ae++] = t, bt[ae++] = a, bt[ae++] = e, Ei |= e, l.lanes |= e, l = l.alternate, l !== null && (l.lanes |= e);
  }
  function zi(l, t, a, e) {
    return Xu(l, t, a, e), Qu(l);
  }
  function Ca(l, t) {
    return Xu(l, null, null, t), Qu(l);
  }
  function go(l, t, a) {
    l.lanes |= a;
    var e = l.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= a, e = n.alternate, e !== null && (e.childLanes |= a), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - ft(a), l = n.hiddenUpdates, e = l[u], e === null ? l[u] = [t] : e.push(t), t.lane = a | 536870912), n) : null;
  }
  function Qu(l) {
    if (50 < su)
      throw su = 0, Cc = null, Error(r(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ee = {};
  function Ld(l, t, a, e) {
    this.tag = l, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = e, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function st(l, t, a, e) {
    return new Ld(l, t, a, e);
  }
  function Ai(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Bt(l, t) {
    var a = l.alternate;
    return a === null ? (a = st(
      l.tag,
      t,
      l.key,
      l.mode
    ), a.elementType = l.elementType, a.type = l.type, a.stateNode = l.stateNode, a.alternate = l, l.alternate = a) : (a.pendingProps = t, a.type = l.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = l.flags & 65011712, a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = l.sibling, a.index = l.index, a.ref = l.ref, a.refCleanup = l.refCleanup, a;
  }
  function po(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return a === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, t = a.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Lu(l, t, a, e, u, n) {
    var i = 0;
    if (e = l, typeof l == "function") Ai(l) && (i = 1);
    else if (typeof l == "string")
      i = Wr(
        l,
        a,
        N.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Fl:
          return l = st(31, a, t, u), l.elementType = Fl, l.lanes = n, l;
        case V:
          return Na(a.children, u, n, t);
        case ol:
          i = 8, u |= 24;
          break;
        case sl:
          return l = st(12, a, t, u | 2), l.elementType = sl, l.lanes = n, l;
        case El:
          return l = st(13, a, t, u), l.elementType = El, l.lanes = n, l;
        case _l:
          return l = st(19, a, t, u), l.elementType = _l, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case X:
                i = 10;
                break l;
              case xl:
                i = 9;
                break l;
              case Ul:
                i = 11;
                break l;
              case k:
                i = 14;
                break l;
              case Ml:
                i = 16, e = null;
                break l;
            }
          i = 29, a = Error(
            r(130, l === null ? "null" : typeof l, "")
          ), e = null;
      }
    return t = st(i, a, t, u), t.elementType = l, t.type = e, t.lanes = n, t;
  }
  function Na(l, t, a, e) {
    return l = st(7, l, e, t), l.lanes = a, l;
  }
  function Ti(l, t, a) {
    return l = st(6, l, null, t), l.lanes = a, l;
  }
  function bo(l) {
    var t = st(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function xi(l, t, a) {
    return t = st(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var So = /* @__PURE__ */ new WeakMap();
  function St(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = So.get(l);
      return a !== void 0 ? a : (t = {
        value: l,
        source: t,
        stack: pf(t)
      }, So.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: pf(t)
    };
  }
  var ue = [], ne = 0, wu = null, Le = 0, Et = [], zt = 0, aa = null, Ct = 1, Nt = "";
  function Gt(l, t) {
    ue[ne++] = Le, ue[ne++] = wu, wu = l, Le = t;
  }
  function Eo(l, t, a) {
    Et[zt++] = Ct, Et[zt++] = Nt, Et[zt++] = aa, aa = l;
    var e = Ct;
    l = Nt;
    var u = 32 - ft(e) - 1;
    e &= ~(1 << u), a += 1;
    var n = 32 - ft(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (e & (1 << i) - 1).toString(32), e >>= i, u -= i, Ct = 1 << 32 - ft(t) + u | a << u | e, Nt = n + l;
    } else
      Ct = 1 << n | a << u | e, Nt = l;
  }
  function _i(l) {
    l.return !== null && (Gt(l, 1), Eo(l, 1, 0));
  }
  function Mi(l) {
    for (; l === wu; )
      wu = ue[--ne], ue[ne] = null, Le = ue[--ne], ue[ne] = null;
    for (; l === aa; )
      aa = Et[--zt], Et[zt] = null, Nt = Et[--zt], Et[zt] = null, Ct = Et[--zt], Et[zt] = null;
  }
  function zo(l, t) {
    Et[zt++] = Ct, Et[zt++] = Nt, Et[zt++] = aa, Ct = t.id, Nt = t.overflow, aa = l;
  }
  var Ll = null, zl = null, al = !1, ea = null, At = !1, Oi = Error(r(519));
  function ua(l) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw we(St(t, l)), Oi;
  }
  function Ao(l) {
    var t = l.stateNode, a = l.type, e = l.memoizedProps;
    switch (t[Ql] = l, t[Il] = e, a) {
      case "dialog":
        P("cancel", t), P("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        P("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ru.length; a++)
          P(ru[a], t);
        break;
      case "source":
        P("error", t);
        break;
      case "img":
      case "image":
      case "link":
        P("error", t), P("load", t);
        break;
      case "details":
        P("toggle", t);
        break;
      case "input":
        P("invalid", t), jf(
          t,
          e.value,
          e.defaultValue,
          e.checked,
          e.defaultChecked,
          e.type,
          e.name,
          !0
        );
        break;
      case "select":
        P("invalid", t);
        break;
      case "textarea":
        P("invalid", t), Yf(t, e.value, e.defaultValue, e.children);
    }
    a = e.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || e.suppressHydrationWarning === !0 || Zs(t.textContent, a) ? (e.popover != null && (P("beforetoggle", t), P("toggle", t)), e.onScroll != null && P("scroll", t), e.onScrollEnd != null && P("scrollend", t), e.onClick != null && (t.onclick = qt), t = !0) : t = !1, t || ua(l, !0);
  }
  function To(l) {
    for (Ll = l.return; Ll; )
      switch (Ll.tag) {
        case 5:
        case 31:
        case 13:
          At = !1;
          return;
        case 27:
        case 3:
          At = !0;
          return;
        default:
          Ll = Ll.return;
      }
  }
  function ie(l) {
    if (l !== Ll) return !1;
    if (!al) return To(l), al = !0, !1;
    var t = l.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = l.type, a = !(a !== "form" && a !== "button") || Kc(l.type, l.memoizedProps)), a = !a), a && zl && ua(l), To(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(r(317));
      zl = $s(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(r(317));
      zl = $s(l);
    } else
      t === 27 ? (t = zl, pa(l.type) ? (l = Fc, Fc = null, zl = l) : zl = t) : zl = Ll ? xt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ha() {
    zl = Ll = null, al = !1;
  }
  function Di() {
    var l = ea;
    return l !== null && (et === null ? et = l : et.push.apply(
      et,
      l
    ), ea = null), l;
  }
  function we(l) {
    ea === null ? ea = [l] : ea.push(l);
  }
  var Ui = s(null), Ra = null, Zt = null;
  function na(l, t, a) {
    M(Ui, t._currentValue), t._currentValue = a;
  }
  function Xt(l) {
    l._currentValue = Ui.current, z(Ui);
  }
  function Ci(l, t, a) {
    for (; l !== null; ) {
      var e = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, e !== null && (e.childLanes |= t)) : e !== null && (e.childLanes & t) !== t && (e.childLanes |= t), l === a) break;
      l = l.return;
    }
  }
  function Ni(l, t, a, e) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (c.context === t[f]) {
              n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Ci(
                n.return,
                a,
                l
              ), e || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(r(341));
        i.lanes |= a, n = i.alternate, n !== null && (n.lanes |= a), Ci(i, a, l), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function ce(l, t, a, e) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(r(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          ot(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === fl.current) {
        if (i = u.alternate, i === null) throw Error(r(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(gu) : l = [gu]);
      }
      u = u.return;
    }
    l !== null && Ni(
      t,
      l,
      a,
      e
    ), t.flags |= 262144;
  }
  function Vu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ot(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function ja(l) {
    Ra = l, Zt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function wl(l) {
    return xo(Ra, l);
  }
  function Ku(l, t) {
    return Ra === null && ja(l), xo(l, t);
  }
  function xo(l, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Zt === null) {
      if (l === null) throw Error(r(308));
      Zt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Zt = Zt.next = t;
    return a;
  }
  var wd = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, e) {
        l.push(e);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(a) {
        return a();
      });
    };
  }, Vd = g.unstable_scheduleCallback, Kd = g.unstable_NormalPriority, Rl = {
    $$typeof: X,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Hi() {
    return {
      controller: new wd(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ve(l) {
    l.refCount--, l.refCount === 0 && Vd(Kd, function() {
      l.controller.abort();
    });
  }
  var Ke = null, Ri = 0, fe = 0, oe = null;
  function Jd(l, t) {
    if (Ke === null) {
      var a = Ke = [];
      Ri = 0, fe = Yc(), oe = {
        status: "pending",
        value: void 0,
        then: function(e) {
          a.push(e);
        }
      };
    }
    return Ri++, t.then(_o, _o), t;
  }
  function _o() {
    if (--Ri === 0 && Ke !== null) {
      oe !== null && (oe.status = "fulfilled");
      var l = Ke;
      Ke = null, fe = 0, oe = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Wd(l, t) {
    var a = [], e = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return l.then(
      function() {
        e.status = "fulfilled", e.value = t;
        for (var u = 0; u < a.length; u++) (0, a[u])(t);
      },
      function(u) {
        for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), e;
  }
  var Mo = b.S;
  b.S = function(l, t) {
    ss = it(), typeof t == "object" && t !== null && typeof t.then == "function" && Jd(l, t), Mo !== null && Mo(l, t);
  };
  var qa = s(null);
  function ji() {
    var l = qa.current;
    return l !== null ? l : bl.pooledCache;
  }
  function Ju(l, t) {
    t === null ? M(qa, qa.current) : M(qa, t.pool);
  }
  function Oo() {
    var l = ji();
    return l === null ? null : { parent: Rl._currentValue, pool: l };
  }
  var se = Error(r(460)), qi = Error(r(474)), Wu = Error(r(542)), $u = { then: function() {
  } };
  function Do(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Uo(l, t, a) {
    switch (a = l[a], a === void 0 ? l.push(t) : a !== t && (t.then(qt, qt), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, No(l), l;
      default:
        if (typeof t.status == "string") t.then(qt, qt);
        else {
          if (l = bl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(r(482));
          l = t, l.status = "pending", l.then(
            function(e) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = e;
              }
            },
            function(e) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = e;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, No(l), l;
        }
        throw Ba = t, se;
    }
  }
  function Ya(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ba = a, se) : a;
    }
  }
  var Ba = null;
  function Co() {
    if (Ba === null) throw Error(r(459));
    var l = Ba;
    return Ba = null, l;
  }
  function No(l) {
    if (l === se || l === Wu)
      throw Error(r(483));
  }
  var de = null, Je = 0;
  function ku(l) {
    var t = Je;
    return Je += 1, de === null && (de = []), Uo(de, l, t);
  }
  function We(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function Fu(l, t) {
    throw t.$$typeof === il ? Error(r(525)) : (l = Object.prototype.toString.call(t), Error(
      r(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Ho(l) {
    function t(d, o) {
      if (l) {
        var m = d.deletions;
        m === null ? (d.deletions = [o], d.flags |= 16) : m.push(o);
      }
    }
    function a(d, o) {
      if (!l) return null;
      for (; o !== null; )
        t(d, o), o = o.sibling;
      return null;
    }
    function e(d) {
      for (var o = /* @__PURE__ */ new Map(); d !== null; )
        d.key !== null ? o.set(d.key, d) : o.set(d.index, d), d = d.sibling;
      return o;
    }
    function u(d, o) {
      return d = Bt(d, o), d.index = 0, d.sibling = null, d;
    }
    function n(d, o, m) {
      return d.index = m, l ? (m = d.alternate, m !== null ? (m = m.index, m < o ? (d.flags |= 67108866, o) : m) : (d.flags |= 67108866, o)) : (d.flags |= 1048576, o);
    }
    function i(d) {
      return l && d.alternate === null && (d.flags |= 67108866), d;
    }
    function c(d, o, m, S) {
      return o === null || o.tag !== 6 ? (o = Ti(m, d.mode, S), o.return = d, o) : (o = u(o, m), o.return = d, o);
    }
    function f(d, o, m, S) {
      var B = m.type;
      return B === V ? p(
        d,
        o,
        m.props.children,
        S,
        m.key
      ) : o !== null && (o.elementType === B || typeof B == "object" && B !== null && B.$$typeof === Ml && Ya(B) === o.type) ? (o = u(o, m.props), We(o, m), o.return = d, o) : (o = Lu(
        m.type,
        m.key,
        m.props,
        null,
        d.mode,
        S
      ), We(o, m), o.return = d, o);
    }
    function h(d, o, m, S) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== m.containerInfo || o.stateNode.implementation !== m.implementation ? (o = xi(m, d.mode, S), o.return = d, o) : (o = u(o, m.children || []), o.return = d, o);
    }
    function p(d, o, m, S, B) {
      return o === null || o.tag !== 7 ? (o = Na(
        m,
        d.mode,
        S,
        B
      ), o.return = d, o) : (o = u(o, m), o.return = d, o);
    }
    function E(d, o, m) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = Ti(
          "" + o,
          d.mode,
          m
        ), o.return = d, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case q:
            return m = Lu(
              o.type,
              o.key,
              o.props,
              null,
              d.mode,
              m
            ), We(m, o), m.return = d, m;
          case U:
            return o = xi(
              o,
              d.mode,
              m
            ), o.return = d, o;
          case Ml:
            return o = Ya(o), E(d, o, m);
        }
        if (Xl(o) || Y(o))
          return o = Na(
            o,
            d.mode,
            m,
            null
          ), o.return = d, o;
        if (typeof o.then == "function")
          return E(d, ku(o), m);
        if (o.$$typeof === X)
          return E(
            d,
            Ku(d, o),
            m
          );
        Fu(d, o);
      }
      return null;
    }
    function y(d, o, m, S) {
      var B = o !== null ? o.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return B !== null ? null : c(d, o, "" + m, S);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case q:
            return m.key === B ? f(d, o, m, S) : null;
          case U:
            return m.key === B ? h(d, o, m, S) : null;
          case Ml:
            return m = Ya(m), y(d, o, m, S);
        }
        if (Xl(m) || Y(m))
          return B !== null ? null : p(d, o, m, S, null);
        if (typeof m.then == "function")
          return y(
            d,
            o,
            ku(m),
            S
          );
        if (m.$$typeof === X)
          return y(
            d,
            o,
            Ku(d, m),
            S
          );
        Fu(d, m);
      }
      return null;
    }
    function v(d, o, m, S, B) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return d = d.get(m) || null, c(o, d, "" + S, B);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case q:
            return d = d.get(
              S.key === null ? m : S.key
            ) || null, f(o, d, S, B);
          case U:
            return d = d.get(
              S.key === null ? m : S.key
            ) || null, h(o, d, S, B);
          case Ml:
            return S = Ya(S), v(
              d,
              o,
              m,
              S,
              B
            );
        }
        if (Xl(S) || Y(S))
          return d = d.get(m) || null, p(o, d, S, B, null);
        if (typeof S.then == "function")
          return v(
            d,
            o,
            m,
            ku(S),
            B
          );
        if (S.$$typeof === X)
          return v(
            d,
            o,
            m,
            Ku(o, S),
            B
          );
        Fu(o, S);
      }
      return null;
    }
    function C(d, o, m, S) {
      for (var B = null, ul = null, H = o, W = o = 0, tl = null; H !== null && W < m.length; W++) {
        H.index > W ? (tl = H, H = null) : tl = H.sibling;
        var nl = y(
          d,
          H,
          m[W],
          S
        );
        if (nl === null) {
          H === null && (H = tl);
          break;
        }
        l && H && nl.alternate === null && t(d, H), o = n(nl, o, W), ul === null ? B = nl : ul.sibling = nl, ul = nl, H = tl;
      }
      if (W === m.length)
        return a(d, H), al && Gt(d, W), B;
      if (H === null) {
        for (; W < m.length; W++)
          H = E(d, m[W], S), H !== null && (o = n(
            H,
            o,
            W
          ), ul === null ? B = H : ul.sibling = H, ul = H);
        return al && Gt(d, W), B;
      }
      for (H = e(H); W < m.length; W++)
        tl = v(
          H,
          d,
          W,
          m[W],
          S
        ), tl !== null && (l && tl.alternate !== null && H.delete(
          tl.key === null ? W : tl.key
        ), o = n(
          tl,
          o,
          W
        ), ul === null ? B = tl : ul.sibling = tl, ul = tl);
      return l && H.forEach(function(Aa) {
        return t(d, Aa);
      }), al && Gt(d, W), B;
    }
    function G(d, o, m, S) {
      if (m == null) throw Error(r(151));
      for (var B = null, ul = null, H = o, W = o = 0, tl = null, nl = m.next(); H !== null && !nl.done; W++, nl = m.next()) {
        H.index > W ? (tl = H, H = null) : tl = H.sibling;
        var Aa = y(d, H, nl.value, S);
        if (Aa === null) {
          H === null && (H = tl);
          break;
        }
        l && H && Aa.alternate === null && t(d, H), o = n(Aa, o, W), ul === null ? B = Aa : ul.sibling = Aa, ul = Aa, H = tl;
      }
      if (nl.done)
        return a(d, H), al && Gt(d, W), B;
      if (H === null) {
        for (; !nl.done; W++, nl = m.next())
          nl = E(d, nl.value, S), nl !== null && (o = n(nl, o, W), ul === null ? B = nl : ul.sibling = nl, ul = nl);
        return al && Gt(d, W), B;
      }
      for (H = e(H); !nl.done; W++, nl = m.next())
        nl = v(H, d, W, nl.value, S), nl !== null && (l && nl.alternate !== null && H.delete(nl.key === null ? W : nl.key), o = n(nl, o, W), ul === null ? B = nl : ul.sibling = nl, ul = nl);
      return l && H.forEach(function(nm) {
        return t(d, nm);
      }), al && Gt(d, W), B;
    }
    function vl(d, o, m, S) {
      if (typeof m == "object" && m !== null && m.type === V && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case q:
            l: {
              for (var B = m.key; o !== null; ) {
                if (o.key === B) {
                  if (B = m.type, B === V) {
                    if (o.tag === 7) {
                      a(
                        d,
                        o.sibling
                      ), S = u(
                        o,
                        m.props.children
                      ), S.return = d, d = S;
                      break l;
                    }
                  } else if (o.elementType === B || typeof B == "object" && B !== null && B.$$typeof === Ml && Ya(B) === o.type) {
                    a(
                      d,
                      o.sibling
                    ), S = u(o, m.props), We(S, m), S.return = d, d = S;
                    break l;
                  }
                  a(d, o);
                  break;
                } else t(d, o);
                o = o.sibling;
              }
              m.type === V ? (S = Na(
                m.props.children,
                d.mode,
                S,
                m.key
              ), S.return = d, d = S) : (S = Lu(
                m.type,
                m.key,
                m.props,
                null,
                d.mode,
                S
              ), We(S, m), S.return = d, d = S);
            }
            return i(d);
          case U:
            l: {
              for (B = m.key; o !== null; ) {
                if (o.key === B)
                  if (o.tag === 4 && o.stateNode.containerInfo === m.containerInfo && o.stateNode.implementation === m.implementation) {
                    a(
                      d,
                      o.sibling
                    ), S = u(o, m.children || []), S.return = d, d = S;
                    break l;
                  } else {
                    a(d, o);
                    break;
                  }
                else t(d, o);
                o = o.sibling;
              }
              S = xi(m, d.mode, S), S.return = d, d = S;
            }
            return i(d);
          case Ml:
            return m = Ya(m), vl(
              d,
              o,
              m,
              S
            );
        }
        if (Xl(m))
          return C(
            d,
            o,
            m,
            S
          );
        if (Y(m)) {
          if (B = Y(m), typeof B != "function") throw Error(r(150));
          return m = B.call(m), G(
            d,
            o,
            m,
            S
          );
        }
        if (typeof m.then == "function")
          return vl(
            d,
            o,
            ku(m),
            S
          );
        if (m.$$typeof === X)
          return vl(
            d,
            o,
            Ku(d, m),
            S
          );
        Fu(d, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, o !== null && o.tag === 6 ? (a(d, o.sibling), S = u(o, m), S.return = d, d = S) : (a(d, o), S = Ti(m, d.mode, S), S.return = d, d = S), i(d)) : a(d, o);
    }
    return function(d, o, m, S) {
      try {
        Je = 0;
        var B = vl(
          d,
          o,
          m,
          S
        );
        return de = null, B;
      } catch (H) {
        if (H === se || H === Wu) throw H;
        var ul = st(29, H, null, d.mode);
        return ul.lanes = S, ul.return = d, ul;
      } finally {
      }
    };
  }
  var Ga = Ho(!0), Ro = Ho(!1), ia = !1;
  function Yi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bi(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ca(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function fa(l, t, a) {
    var e = l.updateQueue;
    if (e === null) return null;
    if (e = e.shared, (cl & 2) !== 0) {
      var u = e.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), e.pending = t, t = Qu(l), go(l, null, a), t;
    }
    return Xu(l, e, t, a), Qu(l);
  }
  function $e(l, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var e = t.lanes;
      e &= l.pendingLanes, a |= e, t.lanes = a, Tf(l, a);
    }
  }
  function Gi(l, t) {
    var a = l.updateQueue, e = l.alternate;
    if (e !== null && (e = e.updateQueue, a === e)) {
      var u = null, n = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var i = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, a = a.next;
        } while (a !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks
      }, l.updateQueue = a;
      return;
    }
    l = a.lastBaseUpdate, l === null ? a.firstBaseUpdate = t : l.next = t, a.lastBaseUpdate = t;
  }
  var Zi = !1;
  function ke() {
    if (Zi) {
      var l = oe;
      if (l !== null) throw l;
    }
  }
  function Fe(l, t, a, e) {
    Zi = !1;
    var u = l.updateQueue;
    ia = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c, h = f.next;
      f.next = null, i === null ? n = h : i.next = h, i = f;
      var p = l.alternate;
      p !== null && (p = p.updateQueue, c = p.lastBaseUpdate, c !== i && (c === null ? p.firstBaseUpdate = h : c.next = h, p.lastBaseUpdate = f));
    }
    if (n !== null) {
      var E = u.baseState;
      i = 0, p = h = f = null, c = n;
      do {
        var y = c.lane & -536870913, v = y !== c.lane;
        if (v ? (ll & y) === y : (e & y) === y) {
          y !== 0 && y === fe && (Zi = !0), p !== null && (p = p.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var C = l, G = c;
            y = t;
            var vl = a;
            switch (G.tag) {
              case 1:
                if (C = G.payload, typeof C == "function") {
                  E = C.call(vl, E, y);
                  break l;
                }
                E = C;
                break l;
              case 3:
                C.flags = C.flags & -65537 | 128;
              case 0:
                if (C = G.payload, y = typeof C == "function" ? C.call(vl, E, y) : C, y == null) break l;
                E = j({}, E, y);
                break l;
              case 2:
                ia = !0;
            }
          }
          y = c.callback, y !== null && (l.flags |= 64, v && (l.flags |= 8192), v = u.callbacks, v === null ? u.callbacks = [y] : v.push(y));
        } else
          v = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, p === null ? (h = p = v, f = E) : p = p.next = v, i |= y;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          v = c, c = v.next, v.next = null, u.lastBaseUpdate = v, u.shared.pending = null;
        }
      } while (!0);
      p === null && (f = E), u.baseState = f, u.firstBaseUpdate = h, u.lastBaseUpdate = p, n === null && (u.shared.lanes = 0), ma |= i, l.lanes = i, l.memoizedState = E;
    }
  }
  function jo(l, t) {
    if (typeof l != "function")
      throw Error(r(191, l));
    l.call(t);
  }
  function qo(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++)
        jo(a[l], t);
  }
  var re = s(null), Iu = s(0);
  function Yo(l, t) {
    l = kt, M(Iu, l), M(re, t), kt = l | t.baseLanes;
  }
  function Xi() {
    M(Iu, kt), M(re, re.current);
  }
  function Qi() {
    kt = Iu.current, z(re), z(Iu);
  }
  var dt = s(null), Tt = null;
  function oa(l) {
    var t = l.alternate;
    M(Nl, Nl.current & 1), M(dt, l), Tt === null && (t === null || re.current !== null || t.memoizedState !== null) && (Tt = l);
  }
  function Li(l) {
    M(Nl, Nl.current), M(dt, l), Tt === null && (Tt = l);
  }
  function Bo(l) {
    l.tag === 22 ? (M(Nl, Nl.current), M(dt, l), Tt === null && (Tt = l)) : sa();
  }
  function sa() {
    M(Nl, Nl.current), M(dt, dt.current);
  }
  function rt(l) {
    z(dt), Tt === l && (Tt = null), z(Nl);
  }
  var Nl = s(0);
  function Pu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || $c(a) || kc(a)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Qt = 0, J = null, hl = null, jl = null, ln = !1, me = !1, Za = !1, tn = 0, Ie = 0, he = null, $d = 0;
  function Ol() {
    throw Error(r(321));
  }
  function wi(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!ot(l[a], t[a])) return !1;
    return !0;
  }
  function Vi(l, t, a, e, u, n) {
    return Qt = n, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, b.H = l === null || l.memoizedState === null ? E0 : ic, Za = !1, n = a(e, u), Za = !1, me && (n = Zo(
      t,
      a,
      e,
      u
    )), Go(l), n;
  }
  function Go(l) {
    b.H = tu;
    var t = hl !== null && hl.next !== null;
    if (Qt = 0, jl = hl = J = null, ln = !1, Ie = 0, he = null, t) throw Error(r(300));
    l === null || ql || (l = l.dependencies, l !== null && Vu(l) && (ql = !0));
  }
  function Zo(l, t, a, e) {
    J = l;
    var u = 0;
    do {
      if (me && (he = null), Ie = 0, me = !1, 25 <= u) throw Error(r(301));
      if (u += 1, jl = hl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      b.H = z0, n = t(a, e);
    } while (me);
    return n;
  }
  function kd() {
    var l = b.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Pe(t) : t, l = l.useState()[0], (hl !== null ? hl.memoizedState : null) !== l && (J.flags |= 1024), t;
  }
  function Ki() {
    var l = tn !== 0;
    return tn = 0, l;
  }
  function Ji(l, t, a) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~a;
  }
  function Wi(l) {
    if (ln) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      ln = !1;
    }
    Qt = 0, jl = hl = J = null, me = !1, Ie = tn = 0, he = null;
  }
  function kl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return jl === null ? J.memoizedState = jl = l : jl = jl.next = l, jl;
  }
  function Hl() {
    if (hl === null) {
      var l = J.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = hl.next;
    var t = jl === null ? J.memoizedState : jl.next;
    if (t !== null)
      jl = t, hl = l;
    else {
      if (l === null)
        throw J.alternate === null ? Error(r(467)) : Error(r(310));
      hl = l, l = {
        memoizedState: hl.memoizedState,
        baseState: hl.baseState,
        baseQueue: hl.baseQueue,
        queue: hl.queue,
        next: null
      }, jl === null ? J.memoizedState = jl = l : jl = jl.next = l;
    }
    return jl;
  }
  function an() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pe(l) {
    var t = Ie;
    return Ie += 1, he === null && (he = []), l = Uo(he, l, t), t = J, (jl === null ? t.memoizedState : jl.next) === null && (t = t.alternate, b.H = t === null || t.memoizedState === null ? E0 : ic), l;
  }
  function en(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Pe(l);
      if (l.$$typeof === X) return wl(l);
    }
    throw Error(r(438, String(l)));
  }
  function $i(l) {
    var t = null, a = J.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var e = J.alternate;
      e !== null && (e = e.updateQueue, e !== null && (e = e.memoCache, e != null && (t = {
        data: e.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = an(), J.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(l), e = 0; e < l; e++)
        a[e] = Ut;
    return t.index++, a;
  }
  function Lt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function un(l) {
    var t = Hl();
    return ki(t, hl, l);
  }
  function ki(l, t, a) {
    var e = l.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = a;
    var u = l.baseQueue, n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, e.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, f = null, h = t, p = !1;
      do {
        var E = h.lane & -536870913;
        if (E !== h.lane ? (ll & E) === E : (Qt & E) === E) {
          var y = h.revertLane;
          if (y === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), E === fe && (p = !0);
          else if ((Qt & y) === y) {
            h = h.next, y === fe && (p = !0);
            continue;
          } else
            E = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, f === null ? (c = f = E, i = n) : f = f.next = E, J.lanes |= y, ma |= y;
          E = h.action, Za && a(n, E), n = h.hasEagerState ? h.eagerState : a(n, E);
        } else
          y = {
            lane: E,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, f === null ? (c = f = y, i = n) : f = f.next = y, J.lanes |= E, ma |= E;
        h = h.next;
      } while (h !== null && h !== t);
      if (f === null ? i = n : f.next = c, !ot(n, l.memoizedState) && (ql = !0, p && (a = oe, a !== null)))
        throw a;
      l.memoizedState = n, l.baseState = i, l.baseQueue = f, e.lastRenderedState = n;
    }
    return u === null && (e.lanes = 0), [l.memoizedState, e.dispatch];
  }
  function Fi(l) {
    var t = Hl(), a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = l;
    var e = a.dispatch, u = a.pending, n = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      ot(n, t.memoizedState) || (ql = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
    }
    return [n, e];
  }
  function Xo(l, t, a) {
    var e = J, u = Hl(), n = al;
    if (n) {
      if (a === void 0) throw Error(r(407));
      a = a();
    } else a = t();
    var i = !ot(
      (hl || u).memoizedState,
      a
    );
    if (i && (u.memoizedState = a, ql = !0), u = u.queue, lc(wo.bind(null, e, u, l), [
      l
    ]), u.getSnapshot !== t || i || jl !== null && jl.memoizedState.tag & 1) {
      if (e.flags |= 2048, ye(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          e,
          u,
          a,
          t
        ),
        null
      ), bl === null) throw Error(r(349));
      n || (Qt & 127) !== 0 || Qo(e, t, a);
    }
    return a;
  }
  function Qo(l, t, a) {
    l.flags |= 16384, l = { getSnapshot: t, value: a }, t = J.updateQueue, t === null ? (t = an(), J.updateQueue = t, t.stores = [l]) : (a = t.stores, a === null ? t.stores = [l] : a.push(l));
  }
  function Lo(l, t, a, e) {
    t.value = a, t.getSnapshot = e, Vo(t) && Ko(l);
  }
  function wo(l, t, a) {
    return a(function() {
      Vo(t) && Ko(l);
    });
  }
  function Vo(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !ot(l, a);
    } catch {
      return !0;
    }
  }
  function Ko(l) {
    var t = Ca(l, 2);
    t !== null && ut(t, l, 2);
  }
  function Ii(l) {
    var t = kl();
    if (typeof l == "function") {
      var a = l;
      if (l = a(), Za) {
        Pt(!0);
        try {
          a();
        } finally {
          Pt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Lt,
      lastRenderedState: l
    }, t;
  }
  function Jo(l, t, a, e) {
    return l.baseState = a, ki(
      l,
      hl,
      typeof e == "function" ? e : Lt
    );
  }
  function Fd(l, t, a, e, u) {
    if (fn(l)) throw Error(r(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      b.T !== null ? a(!0) : n.isTransition = !1, e(n), a = t.pending, a === null ? (n.next = t.pending = n, Wo(t, n)) : (n.next = a.next, t.pending = a.next = n);
    }
  }
  function Wo(l, t) {
    var a = t.action, e = t.payload, u = l.state;
    if (t.isTransition) {
      var n = b.T, i = {};
      b.T = i;
      try {
        var c = a(u, e), f = b.S;
        f !== null && f(i, c), $o(l, t, c);
      } catch (h) {
        Pi(l, t, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), b.T = n;
      }
    } else
      try {
        n = a(u, e), $o(l, t, n);
      } catch (h) {
        Pi(l, t, h);
      }
  }
  function $o(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(e) {
        ko(l, t, e);
      },
      function(e) {
        return Pi(l, t, e);
      }
    ) : ko(l, t, a);
  }
  function ko(l, t, a) {
    t.status = "fulfilled", t.value = a, Fo(t), l.state = a, t = l.pending, t !== null && (a = t.next, a === t ? l.pending = null : (a = a.next, t.next = a, Wo(l, a)));
  }
  function Pi(l, t, a) {
    var e = l.pending;
    if (l.pending = null, e !== null) {
      e = e.next;
      do
        t.status = "rejected", t.reason = a, Fo(t), t = t.next;
      while (t !== e);
    }
    l.action = null;
  }
  function Fo(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Io(l, t) {
    return t;
  }
  function Po(l, t) {
    if (al) {
      var a = bl.formState;
      if (a !== null) {
        l: {
          var e = J;
          if (al) {
            if (zl) {
              t: {
                for (var u = zl, n = At; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = xt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                zl = xt(
                  u.nextSibling
                ), e = u.data === "F!";
                break l;
              }
            }
            ua(e);
          }
          e = !1;
        }
        e && (t = a[0]);
      }
    }
    return a = kl(), a.memoizedState = a.baseState = t, e = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Io,
      lastRenderedState: t
    }, a.queue = e, a = p0.bind(
      null,
      J,
      e
    ), e.dispatch = a, e = Ii(!1), n = nc.bind(
      null,
      J,
      !1,
      e.queue
    ), e = kl(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, e.queue = u, a = Fd.bind(
      null,
      J,
      u,
      n,
      a
    ), u.dispatch = a, e.memoizedState = l, [t, a, !1];
  }
  function l0(l) {
    var t = Hl();
    return t0(t, hl, l);
  }
  function t0(l, t, a) {
    if (t = ki(
      l,
      t,
      Io
    )[0], l = un(Lt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var e = Pe(t);
      } catch (i) {
        throw i === se ? Wu : i;
      }
    else e = t;
    t = Hl();
    var u = t.queue, n = u.dispatch;
    return a !== t.memoizedState && (J.flags |= 2048, ye(
      9,
      { destroy: void 0 },
      Id.bind(null, u, a),
      null
    )), [e, n, l];
  }
  function Id(l, t) {
    l.action = t;
  }
  function a0(l) {
    var t = Hl(), a = hl;
    if (a !== null)
      return t0(t, a, l);
    Hl(), t = t.memoizedState, a = Hl();
    var e = a.queue.dispatch;
    return a.memoizedState = l, [t, e, !1];
  }
  function ye(l, t, a, e) {
    return l = { tag: l, create: a, deps: e, inst: t, next: null }, t = J.updateQueue, t === null && (t = an(), J.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = l.next = l : (e = a.next, a.next = l, l.next = e, t.lastEffect = l), l;
  }
  function e0() {
    return Hl().memoizedState;
  }
  function nn(l, t, a, e) {
    var u = kl();
    J.flags |= l, u.memoizedState = ye(
      1 | t,
      { destroy: void 0 },
      a,
      e === void 0 ? null : e
    );
  }
  function cn(l, t, a, e) {
    var u = Hl();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    hl !== null && e !== null && wi(e, hl.memoizedState.deps) ? u.memoizedState = ye(t, n, a, e) : (J.flags |= l, u.memoizedState = ye(
      1 | t,
      n,
      a,
      e
    ));
  }
  function u0(l, t) {
    nn(8390656, 8, l, t);
  }
  function lc(l, t) {
    cn(2048, 8, l, t);
  }
  function Pd(l) {
    J.flags |= 4;
    var t = J.updateQueue;
    if (t === null)
      t = an(), J.updateQueue = t, t.events = [l];
    else {
      var a = t.events;
      a === null ? t.events = [l] : a.push(l);
    }
  }
  function n0(l) {
    var t = Hl().memoizedState;
    return Pd({ ref: t, nextImpl: l }), function() {
      if ((cl & 2) !== 0) throw Error(r(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function i0(l, t) {
    return cn(4, 2, l, t);
  }
  function c0(l, t) {
    return cn(4, 4, l, t);
  }
  function f0(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function o0(l, t, a) {
    a = a != null ? a.concat([l]) : null, cn(4, 4, f0.bind(null, t, l), a);
  }
  function tc() {
  }
  function s0(l, t) {
    var a = Hl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    return t !== null && wi(t, e[1]) ? e[0] : (a.memoizedState = [l, t], l);
  }
  function d0(l, t) {
    var a = Hl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    if (t !== null && wi(t, e[1]))
      return e[0];
    if (e = l(), Za) {
      Pt(!0);
      try {
        l();
      } finally {
        Pt(!1);
      }
    }
    return a.memoizedState = [e, t], e;
  }
  function ac(l, t, a) {
    return a === void 0 || (Qt & 1073741824) !== 0 && (ll & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = a, l = rs(), J.lanes |= l, ma |= l, a);
  }
  function r0(l, t, a, e) {
    return ot(a, t) ? a : re.current !== null ? (l = ac(l, a, e), ot(l, t) || (ql = !0), l) : (Qt & 42) === 0 || (Qt & 1073741824) !== 0 && (ll & 261930) === 0 ? (ql = !0, l.memoizedState = a) : (l = rs(), J.lanes |= l, ma |= l, t);
  }
  function m0(l, t, a, e, u) {
    var n = _.p;
    _.p = n !== 0 && 8 > n ? n : 8;
    var i = b.T, c = {};
    b.T = c, nc(l, !1, t, a);
    try {
      var f = u(), h = b.S;
      if (h !== null && h(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var p = Wd(
          f,
          e
        );
        lu(
          l,
          t,
          p,
          yt(l)
        );
      } else
        lu(
          l,
          t,
          e,
          yt(l)
        );
    } catch (E) {
      lu(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: E },
        yt()
      );
    } finally {
      _.p = n, i !== null && c.types !== null && (i.types = c.types), b.T = i;
    }
  }
  function lr() {
  }
  function ec(l, t, a, e) {
    if (l.tag !== 5) throw Error(r(476));
    var u = h0(l).queue;
    m0(
      l,
      u,
      t,
      Z,
      a === null ? lr : function() {
        return y0(l), a(e);
      }
    );
  }
  function h0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: Z
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: a
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function y0(l) {
    var t = h0(l);
    t.next === null && (t = l.alternate.memoizedState), lu(
      l,
      t.next.queue,
      {},
      yt()
    );
  }
  function uc() {
    return wl(gu);
  }
  function v0() {
    return Hl().memoizedState;
  }
  function g0() {
    return Hl().memoizedState;
  }
  function tr(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = yt();
          l = ca(a);
          var e = fa(t, l, a);
          e !== null && (ut(e, t, a), $e(e, t, a)), t = { cache: Hi() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ar(l, t, a) {
    var e = yt();
    a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fn(l) ? b0(t, a) : (a = zi(l, t, a, e), a !== null && (ut(a, l, e), S0(a, t, e)));
  }
  function p0(l, t, a) {
    var e = yt();
    lu(l, t, a, e);
  }
  function lu(l, t, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (fn(l)) b0(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, a);
          if (u.hasEagerState = !0, u.eagerState = c, ot(c, i))
            return Xu(l, t, u, 0), bl === null && Zu(), !1;
        } catch {
        } finally {
        }
      if (a = zi(l, t, u, e), a !== null)
        return ut(a, l, e), S0(a, t, e), !0;
    }
    return !1;
  }
  function nc(l, t, a, e) {
    if (e = {
      lane: 2,
      revertLane: Yc(),
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fn(l)) {
      if (t) throw Error(r(479));
    } else
      t = zi(
        l,
        a,
        e,
        2
      ), t !== null && ut(t, l, 2);
  }
  function fn(l) {
    var t = l.alternate;
    return l === J || t !== null && t === J;
  }
  function b0(l, t) {
    me = ln = !0;
    var a = l.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t;
  }
  function S0(l, t, a) {
    if ((a & 4194048) !== 0) {
      var e = t.lanes;
      e &= l.pendingLanes, a |= e, t.lanes = a, Tf(l, a);
    }
  }
  var tu = {
    readContext: wl,
    use: en,
    useCallback: Ol,
    useContext: Ol,
    useEffect: Ol,
    useImperativeHandle: Ol,
    useLayoutEffect: Ol,
    useInsertionEffect: Ol,
    useMemo: Ol,
    useReducer: Ol,
    useRef: Ol,
    useState: Ol,
    useDebugValue: Ol,
    useDeferredValue: Ol,
    useTransition: Ol,
    useSyncExternalStore: Ol,
    useId: Ol,
    useHostTransitionStatus: Ol,
    useFormState: Ol,
    useActionState: Ol,
    useOptimistic: Ol,
    useMemoCache: Ol,
    useCacheRefresh: Ol
  };
  tu.useEffectEvent = Ol;
  var E0 = {
    readContext: wl,
    use: en,
    useCallback: function(l, t) {
      return kl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: wl,
    useEffect: u0,
    useImperativeHandle: function(l, t, a) {
      a = a != null ? a.concat([l]) : null, nn(
        4194308,
        4,
        f0.bind(null, t, l),
        a
      );
    },
    useLayoutEffect: function(l, t) {
      return nn(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      nn(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var a = kl();
      t = t === void 0 ? null : t;
      var e = l();
      if (Za) {
        Pt(!0);
        try {
          l();
        } finally {
          Pt(!1);
        }
      }
      return a.memoizedState = [e, t], e;
    },
    useReducer: function(l, t, a) {
      var e = kl();
      if (a !== void 0) {
        var u = a(t);
        if (Za) {
          Pt(!0);
          try {
            a(t);
          } finally {
            Pt(!1);
          }
        }
      } else u = t;
      return e.memoizedState = e.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, e.queue = l, l = l.dispatch = ar.bind(
        null,
        J,
        l
      ), [e.memoizedState, l];
    },
    useRef: function(l) {
      var t = kl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = Ii(l);
      var t = l.queue, a = p0.bind(null, J, t);
      return t.dispatch = a, [l.memoizedState, a];
    },
    useDebugValue: tc,
    useDeferredValue: function(l, t) {
      var a = kl();
      return ac(a, l, t);
    },
    useTransition: function() {
      var l = Ii(!1);
      return l = m0.bind(
        null,
        J,
        l.queue,
        !0,
        !1
      ), kl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, a) {
      var e = J, u = kl();
      if (al) {
        if (a === void 0)
          throw Error(r(407));
        a = a();
      } else {
        if (a = t(), bl === null)
          throw Error(r(349));
        (ll & 127) !== 0 || Qo(e, t, a);
      }
      u.memoizedState = a;
      var n = { value: a, getSnapshot: t };
      return u.queue = n, u0(wo.bind(null, e, n, l), [
        l
      ]), e.flags |= 2048, ye(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          e,
          n,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var l = kl(), t = bl.identifierPrefix;
      if (al) {
        var a = Nt, e = Ct;
        a = (e & ~(1 << 32 - ft(e) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = tn++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = $d++, t = "_" + t + "r_" + a.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: uc,
    useFormState: Po,
    useActionState: Po,
    useOptimistic: function(l) {
      var t = kl();
      t.memoizedState = t.baseState = l;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = nc.bind(
        null,
        J,
        !0,
        a
      ), a.dispatch = t, [l, t];
    },
    useMemoCache: $i,
    useCacheRefresh: function() {
      return kl().memoizedState = tr.bind(
        null,
        J
      );
    },
    useEffectEvent: function(l) {
      var t = kl(), a = { impl: l };
      return t.memoizedState = a, function() {
        if ((cl & 2) !== 0)
          throw Error(r(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, ic = {
    readContext: wl,
    use: en,
    useCallback: s0,
    useContext: wl,
    useEffect: lc,
    useImperativeHandle: o0,
    useInsertionEffect: i0,
    useLayoutEffect: c0,
    useMemo: d0,
    useReducer: un,
    useRef: e0,
    useState: function() {
      return un(Lt);
    },
    useDebugValue: tc,
    useDeferredValue: function(l, t) {
      var a = Hl();
      return r0(
        a,
        hl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = un(Lt)[0], t = Hl().memoizedState;
      return [
        typeof l == "boolean" ? l : Pe(l),
        t
      ];
    },
    useSyncExternalStore: Xo,
    useId: v0,
    useHostTransitionStatus: uc,
    useFormState: l0,
    useActionState: l0,
    useOptimistic: function(l, t) {
      var a = Hl();
      return Jo(a, hl, l, t);
    },
    useMemoCache: $i,
    useCacheRefresh: g0
  };
  ic.useEffectEvent = n0;
  var z0 = {
    readContext: wl,
    use: en,
    useCallback: s0,
    useContext: wl,
    useEffect: lc,
    useImperativeHandle: o0,
    useInsertionEffect: i0,
    useLayoutEffect: c0,
    useMemo: d0,
    useReducer: Fi,
    useRef: e0,
    useState: function() {
      return Fi(Lt);
    },
    useDebugValue: tc,
    useDeferredValue: function(l, t) {
      var a = Hl();
      return hl === null ? ac(a, l, t) : r0(
        a,
        hl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Fi(Lt)[0], t = Hl().memoizedState;
      return [
        typeof l == "boolean" ? l : Pe(l),
        t
      ];
    },
    useSyncExternalStore: Xo,
    useId: v0,
    useHostTransitionStatus: uc,
    useFormState: a0,
    useActionState: a0,
    useOptimistic: function(l, t) {
      var a = Hl();
      return hl !== null ? Jo(a, hl, l, t) : (a.baseState = l, [l, a.queue.dispatch]);
    },
    useMemoCache: $i,
    useCacheRefresh: g0
  };
  z0.useEffectEvent = n0;
  function cc(l, t, a, e) {
    t = l.memoizedState, a = a(e, t), a = a == null ? t : j({}, t, a), l.memoizedState = a, l.lanes === 0 && (l.updateQueue.baseState = a);
  }
  var fc = {
    enqueueSetState: function(l, t, a) {
      l = l._reactInternals;
      var e = yt(), u = ca(e);
      u.payload = t, a != null && (u.callback = a), t = fa(l, u, e), t !== null && (ut(t, l, e), $e(t, l, e));
    },
    enqueueReplaceState: function(l, t, a) {
      l = l._reactInternals;
      var e = yt(), u = ca(e);
      u.tag = 1, u.payload = t, a != null && (u.callback = a), t = fa(l, u, e), t !== null && (ut(t, l, e), $e(t, l, e));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var a = yt(), e = ca(a);
      e.tag = 2, t != null && (e.callback = t), t = fa(l, e, a), t !== null && (ut(t, l, a), $e(t, l, a));
    }
  };
  function A0(l, t, a, e, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(e, n, i) : t.prototype && t.prototype.isPureReactComponent ? !Xe(a, e) || !Xe(u, n) : !0;
  }
  function T0(l, t, a, e) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, e), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, e), t.state !== l && fc.enqueueReplaceState(t, t.state, null);
  }
  function Xa(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var e in t)
        e !== "ref" && (a[e] = t[e]);
    }
    if (l = l.defaultProps) {
      a === t && (a = j({}, a));
      for (var u in l)
        a[u] === void 0 && (a[u] = l[u]);
    }
    return a;
  }
  function x0(l) {
    Gu(l);
  }
  function _0(l) {
    console.error(l);
  }
  function M0(l) {
    Gu(l);
  }
  function on(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function O0(l, t, a) {
    try {
      var e = l.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function oc(l, t, a) {
    return a = ca(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      on(l, t);
    }, a;
  }
  function D0(l) {
    return l = ca(l), l.tag = 3, l;
  }
  function U0(l, t, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        O0(t, a, e);
      };
    }
    var i = a.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      O0(t, a, e), typeof u != "function" && (ha === null ? ha = /* @__PURE__ */ new Set([this]) : ha.add(this));
      var c = e.stack;
      this.componentDidCatch(e.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function er(l, t, a, e, u) {
    if (a.flags |= 32768, e !== null && typeof e == "object" && typeof e.then == "function") {
      if (t = a.alternate, t !== null && ce(
        t,
        a,
        u,
        !0
      ), a = dt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return Tt === null ? En() : a.alternate === null && Dl === 0 && (Dl = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, e === $u ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([e]) : t.add(e), Rc(l, e, u)), !1;
          case 22:
            return a.flags |= 65536, e === $u ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([e])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([e]) : a.add(e)), Rc(l, e, u)), !1;
        }
        throw Error(r(435, a.tag));
      }
      return Rc(l, e, u), En(), !1;
    }
    if (al)
      return t = dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, e !== Oi && (l = Error(r(422), { cause: e }), we(St(l, a)))) : (e !== Oi && (t = Error(r(423), {
        cause: e
      }), we(
        St(t, a)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, e = St(e, a), u = oc(
        l.stateNode,
        e,
        u
      ), Gi(l, u), Dl !== 4 && (Dl = 2)), !1;
    var n = Error(r(520), { cause: e });
    if (n = St(n, a), ou === null ? ou = [n] : ou.push(n), Dl !== 4 && (Dl = 2), t === null) return !0;
    e = St(e, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, l = u & -u, a.lanes |= l, l = oc(a.stateNode, e, l), Gi(a, l), !1;
        case 1:
          if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ha === null || !ha.has(n))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = D0(u), U0(
              u,
              l,
              a,
              e
            ), Gi(a, u), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var sc = Error(r(461)), ql = !1;
  function Vl(l, t, a, e) {
    t.child = l === null ? Ro(t, null, a, e) : Ga(
      t,
      l.child,
      a,
      e
    );
  }
  function C0(l, t, a, e, u) {
    a = a.render;
    var n = t.ref;
    if ("ref" in e) {
      var i = {};
      for (var c in e)
        c !== "ref" && (i[c] = e[c]);
    } else i = e;
    return ja(t), e = Vi(
      l,
      t,
      a,
      i,
      n,
      u
    ), c = Ki(), l !== null && !ql ? (Ji(l, t, u), wt(l, t, u)) : (al && c && _i(t), t.flags |= 1, Vl(l, t, e, u), t.child);
  }
  function N0(l, t, a, e, u) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" && !Ai(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, H0(
        l,
        t,
        n,
        e,
        u
      )) : (l = Lu(
        a.type,
        null,
        e,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !pc(l, u)) {
      var i = n.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Xe, a(i, e) && l.ref === t.ref)
        return wt(l, t, u);
    }
    return t.flags |= 1, l = Bt(n, e), l.ref = t.ref, l.return = t, t.child = l;
  }
  function H0(l, t, a, e, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Xe(n, e) && l.ref === t.ref)
        if (ql = !1, t.pendingProps = e = n, pc(l, u))
          (l.flags & 131072) !== 0 && (ql = !0);
        else
          return t.lanes = l.lanes, wt(l, t, u);
    }
    return dc(
      l,
      t,
      a,
      e,
      u
    );
  }
  function R0(l, t, a, e) {
    var u = e.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | a : a, l !== null) {
          for (e = t.child = l.child, u = 0; e !== null; )
            u = u | e.lanes | e.childLanes, e = e.sibling;
          e = u & ~n;
        } else e = 0, t.child = null;
        return j0(
          l,
          t,
          n,
          a,
          e
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ju(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Yo(t, n) : Xi(), Bo(t);
      else
        return e = t.lanes = 536870912, j0(
          l,
          t,
          n !== null ? n.baseLanes | a : a,
          a,
          e
        );
    } else
      n !== null ? (Ju(t, n.cachePool), Yo(t, n), sa(), t.memoizedState = null) : (l !== null && Ju(t, null), Xi(), sa());
    return Vl(l, t, u, a), t.child;
  }
  function au(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function j0(l, t, a, e, u) {
    var n = ji();
    return n = n === null ? null : { parent: Rl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, l !== null && Ju(t, null), Xi(), Bo(t), l !== null && ce(l, t, e, !0), t.childLanes = u, null;
  }
  function sn(l, t) {
    return t = rn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function q0(l, t, a) {
    return Ga(t, l.child, null, a), l = sn(t, t.pendingProps), l.flags |= 2, rt(t), t.memoizedState = null, l;
  }
  function ur(l, t, a) {
    var e = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (al) {
        if (e.mode === "hidden")
          return l = sn(t, e), t.lanes = 536870912, au(null, l);
        if (Li(t), (l = zl) ? (l = Ws(
          l,
          At
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: aa !== null ? { id: Ct, overflow: Nt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = bo(l), a.return = t, t.child = a, Ll = t, zl = null)) : l = null, l === null) throw ua(t);
        return t.lanes = 536870912, null;
      }
      return sn(t, e);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Li(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = q0(
            l,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(r(558));
      else if (ql || ce(l, t, a, !1), u = (a & l.childLanes) !== 0, ql || u) {
        if (e = bl, e !== null && (i = xf(e, a), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Ca(l, i), ut(e, l, i), sc;
        En(), t = q0(
          l,
          t,
          a
        );
      } else
        l = n.treeContext, zl = xt(i.nextSibling), Ll = t, al = !0, ea = null, At = !1, l !== null && zo(t, l), t = sn(t, e), t.flags |= 4096;
      return t;
    }
    return l = Bt(l.child, {
      mode: e.mode,
      children: e.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function dn(l, t) {
    var a = t.ref;
    if (a === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(r(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function dc(l, t, a, e, u) {
    return ja(t), a = Vi(
      l,
      t,
      a,
      e,
      void 0,
      u
    ), e = Ki(), l !== null && !ql ? (Ji(l, t, u), wt(l, t, u)) : (al && e && _i(t), t.flags |= 1, Vl(l, t, a, u), t.child);
  }
  function Y0(l, t, a, e, u, n) {
    return ja(t), t.updateQueue = null, a = Zo(
      t,
      e,
      a,
      u
    ), Go(l), e = Ki(), l !== null && !ql ? (Ji(l, t, n), wt(l, t, n)) : (al && e && _i(t), t.flags |= 1, Vl(l, t, a, n), t.child);
  }
  function B0(l, t, a, e, u) {
    if (ja(t), t.stateNode === null) {
      var n = ee, i = a.contextType;
      typeof i == "object" && i !== null && (n = wl(i)), n = new a(e, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = fc, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = e, n.state = t.memoizedState, n.refs = {}, Yi(t), i = a.contextType, n.context = typeof i == "object" && i !== null ? wl(i) : ee, n.state = t.memoizedState, i = a.getDerivedStateFromProps, typeof i == "function" && (cc(
        t,
        a,
        i,
        e
      ), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && fc.enqueueReplaceState(n, n.state, null), Fe(t, e, n, u), ke(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), e = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, f = Xa(a, c);
      n.props = f;
      var h = n.context, p = a.contextType;
      i = ee, typeof p == "object" && p !== null && (i = wl(p));
      var E = a.getDerivedStateFromProps;
      p = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, p || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && T0(
        t,
        n,
        e,
        i
      ), ia = !1;
      var y = t.memoizedState;
      n.state = y, Fe(t, e, n, u), ke(), h = t.memoizedState, c || y !== h || ia ? (typeof E == "function" && (cc(
        t,
        a,
        E,
        e
      ), h = t.memoizedState), (f = ia || A0(
        t,
        a,
        f,
        e,
        y,
        h,
        i
      )) ? (p || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = e, t.memoizedState = h), n.props = e, n.state = h, n.context = i, e = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), e = !1);
    } else {
      n = t.stateNode, Bi(l, t), i = t.memoizedProps, p = Xa(a, i), n.props = p, E = t.pendingProps, y = n.context, h = a.contextType, f = ee, typeof h == "object" && h !== null && (f = wl(h)), c = a.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== E || y !== f) && T0(
        t,
        n,
        e,
        f
      ), ia = !1, y = t.memoizedState, n.state = y, Fe(t, e, n, u), ke();
      var v = t.memoizedState;
      i !== E || y !== v || ia || l !== null && l.dependencies !== null && Vu(l.dependencies) ? (typeof c == "function" && (cc(
        t,
        a,
        c,
        e
      ), v = t.memoizedState), (p = ia || A0(
        t,
        a,
        p,
        e,
        y,
        v,
        f
      ) || l !== null && l.dependencies !== null && Vu(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(e, v, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        e,
        v,
        f
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), t.memoizedProps = e, t.memoizedState = v), n.props = e, n.state = v, n.context = f, e = p) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && y === l.memoizedState || (t.flags |= 1024), e = !1);
    }
    return n = e, dn(l, t), e = (t.flags & 128) !== 0, n || e ? (n = t.stateNode, a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && e ? (t.child = Ga(
      t,
      l.child,
      null,
      u
    ), t.child = Ga(
      t,
      null,
      a,
      u
    )) : Vl(l, t, a, u), t.memoizedState = n.state, l = t.child) : l = wt(
      l,
      t,
      u
    ), l;
  }
  function G0(l, t, a, e) {
    return Ha(), t.flags |= 256, Vl(l, t, a, e), t.child;
  }
  var rc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mc(l) {
    return { baseLanes: l, cachePool: Oo() };
  }
  function hc(l, t, a) {
    return l = l !== null ? l.childLanes & ~a : 0, t && (l |= ht), l;
  }
  function Z0(l, t, a) {
    var e = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Nl.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (al) {
        if (u ? oa(t) : sa(), (l = zl) ? (l = Ws(
          l,
          At
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: aa !== null ? { id: Ct, overflow: Nt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = bo(l), a.return = t, t.child = a, Ll = t, zl = null)) : l = null, l === null) throw ua(t);
        return kc(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = e.children;
      return e = e.fallback, u ? (sa(), u = t.mode, c = rn(
        { mode: "hidden", children: c },
        u
      ), e = Na(
        e,
        u,
        a,
        null
      ), c.return = t, e.return = t, c.sibling = e, t.child = c, e = t.child, e.memoizedState = mc(a), e.childLanes = hc(
        l,
        i,
        a
      ), t.memoizedState = rc, au(null, e)) : (oa(t), yc(t, c));
    }
    var f = l.memoizedState;
    if (f !== null && (c = f.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (oa(t), t.flags &= -257, t = vc(
          l,
          t,
          a
        )) : t.memoizedState !== null ? (sa(), t.child = l.child, t.flags |= 128, t = null) : (sa(), c = e.fallback, u = t.mode, e = rn(
          { mode: "visible", children: e.children },
          u
        ), c = Na(
          c,
          u,
          a,
          null
        ), c.flags |= 2, e.return = t, c.return = t, e.sibling = c, t.child = e, Ga(
          t,
          l.child,
          null,
          a
        ), e = t.child, e.memoizedState = mc(a), e.childLanes = hc(
          l,
          i,
          a
        ), t.memoizedState = rc, t = au(null, e));
      else if (oa(t), kc(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, e = Error(r(419)), e.stack = "", e.digest = i, we({ value: e, source: null, stack: null }), t = vc(
          l,
          t,
          a
        );
      } else if (ql || ce(l, t, a, !1), i = (a & l.childLanes) !== 0, ql || i) {
        if (i = bl, i !== null && (e = xf(i, a), e !== 0 && e !== f.retryLane))
          throw f.retryLane = e, Ca(l, e), ut(i, l, e), sc;
        $c(c) || En(), t = vc(
          l,
          t,
          a
        );
      } else
        $c(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, zl = xt(
          c.nextSibling
        ), Ll = t, al = !0, ea = null, At = !1, l !== null && zo(t, l), t = yc(
          t,
          e.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (sa(), c = e.fallback, u = t.mode, f = l.child, h = f.sibling, e = Bt(f, {
      mode: "hidden",
      children: e.children
    }), e.subtreeFlags = f.subtreeFlags & 65011712, h !== null ? c = Bt(
      h,
      c
    ) : (c = Na(
      c,
      u,
      a,
      null
    ), c.flags |= 2), c.return = t, e.return = t, e.sibling = c, t.child = e, au(null, e), e = t.child, c = l.child.memoizedState, c === null ? c = mc(a) : (u = c.cachePool, u !== null ? (f = Rl._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Oo(), c = {
      baseLanes: c.baseLanes | a,
      cachePool: u
    }), e.memoizedState = c, e.childLanes = hc(
      l,
      i,
      a
    ), t.memoizedState = rc, au(l.child, e)) : (oa(t), a = l.child, l = a.sibling, a = Bt(a, {
      mode: "visible",
      children: e.children
    }), a.return = t, a.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = a, t.memoizedState = null, a);
  }
  function yc(l, t) {
    return t = rn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function rn(l, t) {
    return l = st(22, l, null, t), l.lanes = 0, l;
  }
  function vc(l, t, a) {
    return Ga(t, l.child, null, a), l = yc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function X0(l, t, a) {
    l.lanes |= t;
    var e = l.alternate;
    e !== null && (e.lanes |= t), Ci(l.return, t, a);
  }
  function gc(l, t, a, e, u, n) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: e,
      tail: a,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = e, i.tail = a, i.tailMode = u, i.treeForkCount = n);
  }
  function Q0(l, t, a) {
    var e = t.pendingProps, u = e.revealOrder, n = e.tail;
    e = e.children;
    var i = Nl.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, M(Nl, i), Vl(l, t, e, a), e = al ? Le : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && X0(l, a, t);
        else if (l.tag === 19)
          X0(l, a, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (u) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          l = a.alternate, l !== null && Pu(l) === null && (u = a), a = a.sibling;
        a = u, a === null ? (u = t.child, t.child = null) : (u = a.sibling, a.sibling = null), gc(
          t,
          !1,
          u,
          a,
          n,
          e
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Pu(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = a, a = u, u = l;
        }
        gc(
          t,
          !0,
          a,
          null,
          n,
          e
        );
        break;
      case "together":
        gc(
          t,
          !1,
          null,
          null,
          void 0,
          e
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function wt(l, t, a) {
    if (l !== null && (t.dependencies = l.dependencies), ma |= t.lanes, (a & t.childLanes) === 0)
      if (l !== null) {
        if (ce(
          l,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(r(153));
    if (t.child !== null) {
      for (l = t.child, a = Bt(l, l.pendingProps), t.child = a, a.return = t; l.sibling !== null; )
        l = l.sibling, a = a.sibling = Bt(l, l.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function pc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Vu(l)));
  }
  function nr(l, t, a) {
    switch (t.tag) {
      case 3:
        $l(t, t.stateNode.containerInfo), na(t, Rl, l.memoizedState.cache), Ha();
        break;
      case 27:
      case 5:
        Oe(t);
        break;
      case 4:
        $l(t, t.stateNode.containerInfo);
        break;
      case 10:
        na(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Li(t), null;
        break;
      case 13:
        var e = t.memoizedState;
        if (e !== null)
          return e.dehydrated !== null ? (oa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Z0(l, t, a) : (oa(t), l = wt(
            l,
            t,
            a
          ), l !== null ? l.sibling : null);
        oa(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (e = (a & t.childLanes) !== 0, e || (ce(
          l,
          t,
          a,
          !1
        ), e = (a & t.childLanes) !== 0), u) {
          if (e)
            return Q0(
              l,
              t,
              a
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), M(Nl, Nl.current), e) break;
        return null;
      case 22:
        return t.lanes = 0, R0(
          l,
          t,
          a,
          t.pendingProps
        );
      case 24:
        na(t, Rl, l.memoizedState.cache);
    }
    return wt(l, t, a);
  }
  function L0(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        ql = !0;
      else {
        if (!pc(l, a) && (t.flags & 128) === 0)
          return ql = !1, nr(
            l,
            t,
            a
          );
        ql = (l.flags & 131072) !== 0;
      }
    else
      ql = !1, al && (t.flags & 1048576) !== 0 && Eo(t, Le, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var e = t.pendingProps;
          if (l = Ya(t.elementType), t.type = l, typeof l == "function")
            Ai(l) ? (e = Xa(l, e), t.tag = 1, t = B0(
              null,
              t,
              l,
              e,
              a
            )) : (t.tag = 0, t = dc(
              null,
              t,
              l,
              e,
              a
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Ul) {
                t.tag = 11, t = C0(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break l;
              } else if (u === k) {
                t.tag = 14, t = N0(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break l;
              }
            }
            throw t = Jl(l) || l, Error(r(306, t, ""));
          }
        }
        return t;
      case 0:
        return dc(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return e = t.type, u = Xa(
          e,
          t.pendingProps
        ), B0(
          l,
          t,
          e,
          u,
          a
        );
      case 3:
        l: {
          if ($l(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(r(387));
          e = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, Bi(l, t), Fe(t, e, null, a);
          var i = t.memoizedState;
          if (e = i.cache, na(t, Rl, e), e !== n.cache && Ni(
            t,
            [Rl],
            a,
            !0
          ), ke(), e = i.element, n.isDehydrated)
            if (n = {
              element: e,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = G0(
                l,
                t,
                e,
                a
              );
              break l;
            } else if (e !== u) {
              u = St(
                Error(r(424)),
                t
              ), we(u), t = G0(
                l,
                t,
                e,
                a
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (zl = xt(l.firstChild), Ll = t, al = !0, ea = null, At = !0, a = Ro(
                t,
                null,
                e,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (Ha(), e === u) {
              t = wt(
                l,
                t,
                a
              );
              break l;
            }
            Vl(l, t, e, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return dn(l, t), l === null ? (a = l1(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : al || (a = t.type, l = t.pendingProps, e = On(
          F.current
        ).createElement(a), e[Ql] = t, e[Il] = l, Kl(e, a, l), Gl(e), t.stateNode = e) : t.memoizedState = l1(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Oe(t), l === null && al && (e = t.stateNode = Fs(
          t.type,
          t.pendingProps,
          F.current
        ), Ll = t, At = !0, u = zl, pa(t.type) ? (Fc = u, zl = xt(e.firstChild)) : zl = u), Vl(
          l,
          t,
          t.pendingProps.children,
          a
        ), dn(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && al && ((u = e = zl) && (e = jr(
          e,
          t.type,
          t.pendingProps,
          At
        ), e !== null ? (t.stateNode = e, Ll = t, zl = xt(e.firstChild), At = !1, u = !0) : u = !1), u || ua(t)), Oe(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, e = n.children, Kc(u, n) ? e = null : i !== null && Kc(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Vi(
          l,
          t,
          kd,
          null,
          null,
          a
        ), gu._currentValue = u), dn(l, t), Vl(l, t, e, a), t.child;
      case 6:
        return l === null && al && ((l = a = zl) && (a = qr(
          a,
          t.pendingProps,
          At
        ), a !== null ? (t.stateNode = a, Ll = t, zl = null, l = !0) : l = !1), l || ua(t)), null;
      case 13:
        return Z0(l, t, a);
      case 4:
        return $l(
          t,
          t.stateNode.containerInfo
        ), e = t.pendingProps, l === null ? t.child = Ga(
          t,
          null,
          e,
          a
        ) : Vl(l, t, e, a), t.child;
      case 11:
        return C0(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return Vl(
          l,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return Vl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Vl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return e = t.pendingProps, na(t, t.type, e.value), Vl(l, t, e.children, a), t.child;
      case 9:
        return u = t.type._context, e = t.pendingProps.children, ja(t), u = wl(u), e = e(u), t.flags |= 1, Vl(l, t, e, a), t.child;
      case 14:
        return N0(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return H0(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Q0(l, t, a);
      case 31:
        return ur(l, t, a);
      case 22:
        return R0(
          l,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return ja(t), e = wl(Rl), l === null ? (u = ji(), u === null && (u = bl, n = Hi(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= a), u = n), t.memoizedState = { parent: e, cache: u }, Yi(t), na(t, Rl, u)) : ((l.lanes & a) !== 0 && (Bi(l, t), Fe(t, null, null, a), ke()), u = l.memoizedState, n = t.memoizedState, u.parent !== e ? (u = { parent: e, cache: e }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), na(t, Rl, e)) : (e = n.cache, na(t, Rl, e), e !== u.cache && Ni(
          t,
          [Rl],
          a,
          !0
        ))), Vl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Vt(l) {
    l.flags |= 4;
  }
  function bc(l, t, a, e, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (vs()) l.flags |= 8192;
        else
          throw Ba = $u, qi;
    } else l.flags &= -16777217;
  }
  function w0(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !n1(t))
      if (vs()) l.flags |= 8192;
      else
        throw Ba = $u, qi;
  }
  function mn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? zf() : 536870912, l.lanes |= t, be |= t);
  }
  function eu(l, t) {
    if (!al)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? l.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = l.tail;
          for (var e = null; a !== null; )
            a.alternate !== null && (e = a), a = a.sibling;
          e === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : e.sibling = null;
      }
  }
  function Al(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, a = 0, e = 0;
    if (t)
      for (var u = l.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags & 65011712, e |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags, e |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= e, l.childLanes = a, t;
  }
  function ir(l, t, a) {
    var e = t.pendingProps;
    switch (Mi(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Al(t), null;
      case 1:
        return Al(t), null;
      case 3:
        return a = t.stateNode, e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Xt(Rl), Cl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (l === null || l.child === null) && (ie(t) ? Vt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Di())), Al(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (Vt(t), n !== null ? (Al(t), w0(t, n)) : (Al(t), bc(
          t,
          u,
          null,
          e,
          a
        ))) : n ? n !== l.memoizedState ? (Vt(t), Al(t), w0(t, n)) : (Al(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== e && Vt(t), Al(t), bc(
          t,
          u,
          l,
          e,
          a
        )), null;
      case 27:
        if (Au(t), a = F.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== e && Vt(t);
        else {
          if (!e) {
            if (t.stateNode === null)
              throw Error(r(166));
            return Al(t), null;
          }
          l = N.current, ie(t) ? Ao(t) : (l = Fs(u, e, a), t.stateNode = l, Vt(t));
        }
        return Al(t), null;
      case 5:
        if (Au(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== e && Vt(t);
        else {
          if (!e) {
            if (t.stateNode === null)
              throw Error(r(166));
            return Al(t), null;
          }
          if (n = N.current, ie(t))
            Ao(t);
          else {
            var i = On(
              F.current
            );
            switch (n) {
              case 1:
                n = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof e.is == "string" ? i.createElement("select", {
                      is: e.is
                    }) : i.createElement("select"), e.multiple ? n.multiple = !0 : e.size && (n.size = e.size);
                    break;
                  default:
                    n = typeof e.is == "string" ? i.createElement(u, { is: e.is }) : i.createElement(u);
                }
            }
            n[Ql] = t, n[Il] = e;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = n;
            l: switch (Kl(n, u, e), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break l;
              case "img":
                e = !0;
                break l;
              default:
                e = !1;
            }
            e && Vt(t);
          }
        }
        return Al(t), bc(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== e && Vt(t);
        else {
          if (typeof e != "string" && t.stateNode === null)
            throw Error(r(166));
          if (l = F.current, ie(t)) {
            if (l = t.stateNode, a = t.memoizedProps, e = null, u = Ll, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            l[Ql] = t, l = !!(l.nodeValue === a || e !== null && e.suppressHydrationWarning === !0 || Zs(l.nodeValue, a)), l || ua(t, !0);
          } else
            l = On(l).createTextNode(
              e
            ), l[Ql] = t, t.stateNode = l;
        }
        return Al(t), null;
      case 31:
        if (a = t.memoizedState, l === null || l.memoizedState !== null) {
          if (e = ie(t), a !== null) {
            if (l === null) {
              if (!e) throw Error(r(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(r(557));
              l[Ql] = t;
            } else
              Ha(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Al(t), l = !1;
          } else
            a = Di(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = a), l = !0;
          if (!l)
            return t.flags & 256 ? (rt(t), t) : (rt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Al(t), null;
      case 13:
        if (e = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = ie(t), e !== null && e.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(r(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[Ql] = t;
            } else
              Ha(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Al(t), u = !1;
          } else
            u = Di(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (rt(t), t) : (rt(t), null);
        }
        return rt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = e !== null, l = l !== null && l.memoizedState !== null, a && (e = t.child, u = null, e.alternate !== null && e.alternate.memoizedState !== null && e.alternate.memoizedState.cachePool !== null && (u = e.alternate.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== u && (e.flags |= 2048)), a !== l && a && (t.child.flags |= 8192), mn(t, t.updateQueue), Al(t), null);
      case 4:
        return Cl(), l === null && Xc(t.stateNode.containerInfo), Al(t), null;
      case 10:
        return Xt(t.type), Al(t), null;
      case 19:
        if (z(Nl), e = t.memoizedState, e === null) return Al(t), null;
        if (u = (t.flags & 128) !== 0, n = e.rendering, n === null)
          if (u) eu(e, !1);
          else {
            if (Dl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Pu(l), n !== null) {
                  for (t.flags |= 128, eu(e, !1), l = n.updateQueue, t.updateQueue = l, mn(t, l), t.subtreeFlags = 0, l = a, a = t.child; a !== null; )
                    po(a, l), a = a.sibling;
                  return M(
                    Nl,
                    Nl.current & 1 | 2
                  ), al && Gt(t, e.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            e.tail !== null && it() > pn && (t.flags |= 128, u = !0, eu(e, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Pu(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, mn(t, l), eu(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !al)
                return Al(t), null;
            } else
              2 * it() - e.renderingStartTime > pn && a !== 536870912 && (t.flags |= 128, u = !0, eu(e, !1), t.lanes = 4194304);
          e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
        }
        return e.tail !== null ? (l = e.tail, e.rendering = l, e.tail = l.sibling, e.renderingStartTime = it(), l.sibling = null, a = Nl.current, M(
          Nl,
          u ? a & 1 | 2 : a & 1
        ), al && Gt(t, e.treeForkCount), l) : (Al(t), null);
      case 22:
      case 23:
        return rt(t), Qi(), e = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== e && (t.flags |= 8192) : e && (t.flags |= 8192), e ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Al(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Al(t), a = t.updateQueue, a !== null && mn(t, a.retryQueue), a = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (t.flags |= 2048), l !== null && z(qa), null;
      case 24:
        return a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Xt(Rl), Al(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function cr(l, t) {
    switch (Mi(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Xt(Rl), Cl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Au(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (rt(t), t.alternate === null)
            throw Error(r(340));
          Ha();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (rt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(r(340));
          Ha();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return z(Nl), null;
      case 4:
        return Cl(), null;
      case 10:
        return Xt(t.type), null;
      case 22:
      case 23:
        return rt(t), Qi(), l !== null && z(qa), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Xt(Rl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function V0(l, t) {
    switch (Mi(t), t.tag) {
      case 3:
        Xt(Rl), Cl();
        break;
      case 26:
      case 27:
      case 5:
        Au(t);
        break;
      case 4:
        Cl();
        break;
      case 31:
        t.memoizedState !== null && rt(t);
        break;
      case 13:
        rt(t);
        break;
      case 19:
        z(Nl);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        rt(t), Qi(), l !== null && z(qa);
        break;
      case 24:
        Xt(Rl);
    }
  }
  function uu(l, t) {
    try {
      var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            e = void 0;
            var n = a.create, i = a.inst;
            e = n(), i.destroy = e;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (c) {
      rl(t, t.return, c);
    }
  }
  function da(l, t, a) {
    try {
      var e = t.updateQueue, u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            var i = e.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var f = a, h = c;
              try {
                h();
              } catch (p) {
                rl(
                  u,
                  f,
                  p
                );
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (p) {
      rl(t, t.return, p);
    }
  }
  function K0(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        qo(t, a);
      } catch (e) {
        rl(l, l.return, e);
      }
    }
  }
  function J0(l, t, a) {
    a.props = Xa(
      l.type,
      l.memoizedProps
    ), a.state = l.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (e) {
      rl(l, t, e);
    }
  }
  function nu(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var e = l.stateNode;
            break;
          case 30:
            e = l.stateNode;
            break;
          default:
            e = l.stateNode;
        }
        typeof a == "function" ? l.refCleanup = a(e) : a.current = e;
      }
    } catch (u) {
      rl(l, t, u);
    }
  }
  function Ht(l, t) {
    var a = l.ref, e = l.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          rl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          rl(l, t, u);
        }
      else a.current = null;
  }
  function W0(l) {
    var t = l.type, a = l.memoizedProps, e = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break l;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function Sc(l, t, a) {
    try {
      var e = l.stateNode;
      Dr(e, l.type, a, t), e[Il] = t;
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function $0(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && pa(l.type) || l.tag === 4;
  }
  function Ec(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || $0(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && pa(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function zc(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      l = l.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(l), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = qt));
    else if (e !== 4 && (e === 27 && pa(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null))
      for (zc(l, t, a), l = l.sibling; l !== null; )
        zc(l, t, a), l = l.sibling;
  }
  function hn(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      l = l.stateNode, t ? a.insertBefore(l, t) : a.appendChild(l);
    else if (e !== 4 && (e === 27 && pa(l.type) && (a = l.stateNode), l = l.child, l !== null))
      for (hn(l, t, a), l = l.sibling; l !== null; )
        hn(l, t, a), l = l.sibling;
  }
  function k0(l) {
    var t = l.stateNode, a = l.memoizedProps;
    try {
      for (var e = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Kl(t, e, a), t[Ql] = l, t[Il] = a;
    } catch (n) {
      rl(l, l.return, n);
    }
  }
  var Kt = !1, Yl = !1, Ac = !1, F0 = typeof WeakSet == "function" ? WeakSet : Set, Zl = null;
  function fr(l, t) {
    if (l = l.containerInfo, wc = jn, l = fo(l), vi(l)) {
      if ("selectionStart" in l)
        var a = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          a = (a = l.ownerDocument) && a.defaultView || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset, n = e.focusNode;
            e = e.focusOffset;
            try {
              a.nodeType, n.nodeType;
            } catch {
              a = null;
              break l;
            }
            var i = 0, c = -1, f = -1, h = 0, p = 0, E = l, y = null;
            t: for (; ; ) {
              for (var v; E !== a || u !== 0 && E.nodeType !== 3 || (c = i + u), E !== n || e !== 0 && E.nodeType !== 3 || (f = i + e), E.nodeType === 3 && (i += E.nodeValue.length), (v = E.firstChild) !== null; )
                y = E, E = v;
              for (; ; ) {
                if (E === l) break t;
                if (y === a && ++h === u && (c = i), y === n && ++p === e && (f = i), (v = E.nextSibling) !== null) break;
                E = y, y = E.parentNode;
              }
              E = v;
            }
            a = c === -1 || f === -1 ? null : { start: c, end: f };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Vc = { focusedElem: l, selectionRange: a }, jn = !1, Zl = t; Zl !== null; )
      if (t = Zl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Zl = l;
      else
        for (; Zl !== null; ) {
          switch (t = Zl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (a = 0; a < l.length; a++)
                  u = l[a], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, a = t, u = n.memoizedProps, n = n.memoizedState, e = a.stateNode;
                try {
                  var C = Xa(
                    a.type,
                    u
                  );
                  l = e.getSnapshotBeforeUpdate(
                    C,
                    n
                  ), e.__reactInternalSnapshotBeforeUpdate = l;
                } catch (G) {
                  rl(
                    a,
                    a.return,
                    G
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
                  Wc(l);
                else if (a === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wc(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(r(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Zl = l;
            break;
          }
          Zl = t.return;
        }
  }
  function I0(l, t, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Wt(l, a), e & 4 && uu(5, a);
        break;
      case 1:
        if (Wt(l, a), e & 4)
          if (l = a.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              rl(a, a.return, i);
            }
          else {
            var u = Xa(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              rl(
                a,
                a.return,
                i
              );
            }
          }
        e & 64 && K0(a), e & 512 && nu(a, a.return);
        break;
      case 3:
        if (Wt(l, a), e & 64 && (l = a.updateQueue, l !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            qo(l, t);
          } catch (i) {
            rl(a, a.return, i);
          }
        }
        break;
      case 27:
        t === null && e & 4 && k0(a);
      case 26:
      case 5:
        Wt(l, a), t === null && e & 4 && W0(a), e & 512 && nu(a, a.return);
        break;
      case 12:
        Wt(l, a);
        break;
      case 31:
        Wt(l, a), e & 4 && ts(l, a);
        break;
      case 13:
        Wt(l, a), e & 4 && as(l, a), e & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = gr.bind(
          null,
          a
        ), Yr(l, a))));
        break;
      case 22:
        if (e = a.memoizedState !== null || Kt, !e) {
          t = t !== null && t.memoizedState !== null || Yl, u = Kt;
          var n = Yl;
          Kt = e, (Yl = t) && !n ? $t(
            l,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Wt(l, a), Kt = u, Yl = n;
        }
        break;
      case 30:
        break;
      default:
        Wt(l, a);
    }
  }
  function P0(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, P0(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Pn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Tl = null, lt = !1;
  function Jt(l, t, a) {
    for (a = a.child; a !== null; )
      ls(l, t, a), a = a.sibling;
  }
  function ls(l, t, a) {
    if (ct && typeof ct.onCommitFiberUnmount == "function")
      try {
        ct.onCommitFiberUnmount(De, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Yl || Ht(a, t), Jt(
          l,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Yl || Ht(a, t);
        var e = Tl, u = lt;
        pa(a.type) && (Tl = a.stateNode, lt = !1), Jt(
          l,
          t,
          a
        ), hu(a.stateNode), Tl = e, lt = u;
        break;
      case 5:
        Yl || Ht(a, t);
      case 6:
        if (e = Tl, u = lt, Tl = null, Jt(
          l,
          t,
          a
        ), Tl = e, lt = u, Tl !== null)
          if (lt)
            try {
              (Tl.nodeType === 9 ? Tl.body : Tl.nodeName === "HTML" ? Tl.ownerDocument.body : Tl).removeChild(a.stateNode);
            } catch (n) {
              rl(
                a,
                t,
                n
              );
            }
          else
            try {
              Tl.removeChild(a.stateNode);
            } catch (n) {
              rl(
                a,
                t,
                n
              );
            }
        break;
      case 18:
        Tl !== null && (lt ? (l = Tl, Ks(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          a.stateNode
        ), Me(l)) : Ks(Tl, a.stateNode));
        break;
      case 4:
        e = Tl, u = lt, Tl = a.stateNode.containerInfo, lt = !0, Jt(
          l,
          t,
          a
        ), Tl = e, lt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        da(2, a, t), Yl || da(4, a, t), Jt(
          l,
          t,
          a
        );
        break;
      case 1:
        Yl || (Ht(a, t), e = a.stateNode, typeof e.componentWillUnmount == "function" && J0(
          a,
          t,
          e
        )), Jt(
          l,
          t,
          a
        );
        break;
      case 21:
        Jt(
          l,
          t,
          a
        );
        break;
      case 22:
        Yl = (e = Yl) || a.memoizedState !== null, Jt(
          l,
          t,
          a
        ), Yl = e;
        break;
      default:
        Jt(
          l,
          t,
          a
        );
    }
  }
  function ts(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Me(l);
      } catch (a) {
        rl(t, t.return, a);
      }
    }
  }
  function as(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Me(l);
      } catch (a) {
        rl(t, t.return, a);
      }
  }
  function or(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new F0()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new F0()), t;
      default:
        throw Error(r(435, l.tag));
    }
  }
  function yn(l, t) {
    var a = or(l);
    t.forEach(function(e) {
      if (!a.has(e)) {
        a.add(e);
        var u = pr.bind(null, l, e);
        e.then(u, u);
      }
    });
  }
  function tt(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (pa(c.type)) {
                Tl = c.stateNode, lt = !1;
                break l;
              }
              break;
            case 5:
              Tl = c.stateNode, lt = !1;
              break l;
            case 3:
            case 4:
              Tl = c.stateNode.containerInfo, lt = !0;
              break l;
          }
          c = c.return;
        }
        if (Tl === null) throw Error(r(160));
        ls(n, i, u), Tl = null, lt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        es(t, l), t = t.sibling;
  }
  var Ot = null;
  function es(l, t) {
    var a = l.alternate, e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        tt(t, l), at(l), e & 4 && (da(3, l, l.return), uu(3, l), da(5, l, l.return));
        break;
      case 1:
        tt(t, l), at(l), e & 512 && (Yl || a === null || Ht(a, a.return)), e & 64 && Kt && (l = l.updateQueue, l !== null && (e = l.callbacks, e !== null && (a = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = a === null ? e : a.concat(e))));
        break;
      case 26:
        var u = Ot;
        if (tt(t, l), at(l), e & 512 && (Yl || a === null || Ht(a, a.return)), e & 4) {
          var n = a !== null ? a.memoizedState : null;
          if (e = l.memoizedState, a === null)
            if (e === null)
              if (l.stateNode === null) {
                l: {
                  e = l.type, a = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (e) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Ne] || n[Ql] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(e), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), Kl(n, e, a), n[Ql] = l, Gl(n), e = n;
                      break l;
                    case "link":
                      var i = e1(
                        "link",
                        "href",
                        u
                      ).get(e + (a.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(e), Kl(n, e, a), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = e1(
                        "meta",
                        "content",
                        u
                      ).get(e + (a.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(e), Kl(n, e, a), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(r(468, e));
                  }
                  n[Ql] = l, Gl(n), e = n;
                }
                l.stateNode = e;
              } else
                u1(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = a1(
                u,
                e,
                l.memoizedProps
              );
          else
            n !== e ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, e === null ? u1(
              u,
              l.type,
              l.stateNode
            ) : a1(
              u,
              e,
              l.memoizedProps
            )) : e === null && l.stateNode !== null && Sc(
              l,
              l.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        tt(t, l), at(l), e & 512 && (Yl || a === null || Ht(a, a.return)), a !== null && e & 4 && Sc(
          l,
          l.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (tt(t, l), at(l), e & 512 && (Yl || a === null || Ht(a, a.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            ka(u, "");
          } catch (C) {
            rl(l, l.return, C);
          }
        }
        e & 4 && l.stateNode != null && (u = l.memoizedProps, Sc(
          l,
          u,
          a !== null ? a.memoizedProps : u
        )), e & 1024 && (Ac = !0);
        break;
      case 6:
        if (tt(t, l), at(l), e & 4) {
          if (l.stateNode === null)
            throw Error(r(162));
          e = l.memoizedProps, a = l.stateNode;
          try {
            a.nodeValue = e;
          } catch (C) {
            rl(l, l.return, C);
          }
        }
        break;
      case 3:
        if (Cn = null, u = Ot, Ot = Dn(t.containerInfo), tt(t, l), Ot = u, at(l), e & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Me(t.containerInfo);
          } catch (C) {
            rl(l, l.return, C);
          }
        Ac && (Ac = !1, us(l));
        break;
      case 4:
        e = Ot, Ot = Dn(
          l.stateNode.containerInfo
        ), tt(t, l), at(l), Ot = e;
        break;
      case 12:
        tt(t, l), at(l);
        break;
      case 31:
        tt(t, l), at(l), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, yn(l, e)));
        break;
      case 13:
        tt(t, l), at(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (gn = it()), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, yn(l, e)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = a !== null && a.memoizedState !== null, h = Kt, p = Yl;
        if (Kt = h || u, Yl = p || f, tt(t, l), Yl = p, Kt = h, at(l), e & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (a === null || f || Kt || Yl || Qa(l)), a = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                f = a = t;
                try {
                  if (n = f.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = f.stateNode;
                    var E = f.memoizedProps.style, y = E != null && E.hasOwnProperty("display") ? E.display : null;
                    c.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (C) {
                  rl(f, f.return, C);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (C) {
                  rl(f, f.return, C);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                f = t;
                try {
                  var v = f.stateNode;
                  u ? Js(v, !0) : Js(f.stateNode, !1);
                } catch (C) {
                  rl(f, f.return, C);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        e & 4 && (e = l.updateQueue, e !== null && (a = e.retryQueue, a !== null && (e.retryQueue = null, yn(l, a))));
        break;
      case 19:
        tt(t, l), at(l), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, yn(l, e)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        tt(t, l), at(l);
    }
  }
  function at(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, e = l.return; e !== null; ) {
          if ($0(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(r(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode, n = Ec(l);
            hn(l, n, u);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && (ka(i, ""), a.flags &= -33);
            var c = Ec(l);
            hn(l, c, i);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo, h = Ec(l);
            zc(
              l,
              h,
              f
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (p) {
        rl(l, l.return, p);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function us(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        us(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function Wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        I0(l, t.alternate, t), t = t.sibling;
  }
  function Qa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          da(4, t, t.return), Qa(t);
          break;
        case 1:
          Ht(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && J0(
            t,
            t.return,
            a
          ), Qa(t);
          break;
        case 27:
          hu(t.stateNode);
        case 26:
        case 5:
          Ht(t, t.return), Qa(t);
          break;
        case 22:
          t.memoizedState === null && Qa(t);
          break;
        case 30:
          Qa(t);
          break;
        default:
          Qa(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var e = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          $t(
            u,
            n,
            a
          ), uu(4, n);
          break;
        case 1:
          if ($t(
            u,
            n,
            a
          ), e = n, u = e.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (h) {
              rl(e, e.return, h);
            }
          if (e = n, u = e.updateQueue, u !== null) {
            var c = e.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  jo(f[u], c);
            } catch (h) {
              rl(e, e.return, h);
            }
          }
          a && i & 64 && K0(n), nu(n, n.return);
          break;
        case 27:
          k0(n);
        case 26:
        case 5:
          $t(
            u,
            n,
            a
          ), a && e === null && i & 4 && W0(n), nu(n, n.return);
          break;
        case 12:
          $t(
            u,
            n,
            a
          );
          break;
        case 31:
          $t(
            u,
            n,
            a
          ), a && i & 4 && ts(u, n);
          break;
        case 13:
          $t(
            u,
            n,
            a
          ), a && i & 4 && as(u, n);
          break;
        case 22:
          n.memoizedState === null && $t(
            u,
            n,
            a
          ), nu(n, n.return);
          break;
        case 30:
          break;
        default:
          $t(
            u,
            n,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Tc(l, t) {
    var a = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (l != null && l.refCount++, a != null && Ve(a));
  }
  function xc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ve(l));
  }
  function Dt(l, t, a, e) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ns(
          l,
          t,
          a,
          e
        ), t = t.sibling;
  }
  function ns(l, t, a, e) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(
          l,
          t,
          a,
          e
        ), u & 2048 && uu(9, t);
        break;
      case 1:
        Dt(
          l,
          t,
          a,
          e
        );
        break;
      case 3:
        Dt(
          l,
          t,
          a,
          e
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Ve(l)));
        break;
      case 12:
        if (u & 2048) {
          Dt(
            l,
            t,
            a,
            e
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (f) {
            rl(t, t.return, f);
          }
        } else
          Dt(
            l,
            t,
            a,
            e
          );
        break;
      case 31:
        Dt(
          l,
          t,
          a,
          e
        );
        break;
      case 13:
        Dt(
          l,
          t,
          a,
          e
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Dt(
          l,
          t,
          a,
          e
        ) : iu(l, t) : n._visibility & 2 ? Dt(
          l,
          t,
          a,
          e
        ) : (n._visibility |= 2, ve(
          l,
          t,
          a,
          e,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Tc(i, t);
        break;
      case 24:
        Dt(
          l,
          t,
          a,
          e
        ), u & 2048 && xc(t.alternate, t);
        break;
      default:
        Dt(
          l,
          t,
          a,
          e
        );
    }
  }
  function ve(l, t, a, e, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = a, f = e, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ve(
            n,
            i,
            c,
            f,
            u
          ), uu(8, i);
          break;
        case 23:
          break;
        case 22:
          var p = i.stateNode;
          i.memoizedState !== null ? p._visibility & 2 ? ve(
            n,
            i,
            c,
            f,
            u
          ) : iu(
            n,
            i
          ) : (p._visibility |= 2, ve(
            n,
            i,
            c,
            f,
            u
          )), u && h & 2048 && Tc(
            i.alternate,
            i
          );
          break;
        case 24:
          ve(
            n,
            i,
            c,
            f,
            u
          ), u && h & 2048 && xc(i.alternate, i);
          break;
        default:
          ve(
            n,
            i,
            c,
            f,
            u
          );
      }
      t = t.sibling;
    }
  }
  function iu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = l, e = t, u = e.flags;
        switch (e.tag) {
          case 22:
            iu(a, e), u & 2048 && Tc(
              e.alternate,
              e
            );
            break;
          case 24:
            iu(a, e), u & 2048 && xc(e.alternate, e);
            break;
          default:
            iu(a, e);
        }
        t = t.sibling;
      }
  }
  var cu = 8192;
  function ge(l, t, a) {
    if (l.subtreeFlags & cu)
      for (l = l.child; l !== null; )
        is(
          l,
          t,
          a
        ), l = l.sibling;
  }
  function is(l, t, a) {
    switch (l.tag) {
      case 26:
        ge(
          l,
          t,
          a
        ), l.flags & cu && l.memoizedState !== null && $r(
          a,
          Ot,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ge(
          l,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var e = Ot;
        Ot = Dn(l.stateNode.containerInfo), ge(
          l,
          t,
          a
        ), Ot = e;
        break;
      case 22:
        l.memoizedState === null && (e = l.alternate, e !== null && e.memoizedState !== null ? (e = cu, cu = 16777216, ge(
          l,
          t,
          a
        ), cu = e) : ge(
          l,
          t,
          a
        ));
        break;
      default:
        ge(
          l,
          t,
          a
        );
    }
  }
  function cs(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function fu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          Zl = e, os(
            e,
            l
          );
        }
      cs(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        fs(l), l = l.sibling;
  }
  function fs(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        fu(l), l.flags & 2048 && da(9, l, l.return);
        break;
      case 3:
        fu(l);
        break;
      case 12:
        fu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, vn(l)) : fu(l);
        break;
      default:
        fu(l);
    }
  }
  function vn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          Zl = e, os(
            e,
            l
          );
        }
      cs(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          da(8, t, t.return), vn(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, vn(t));
          break;
        default:
          vn(t);
      }
      l = l.sibling;
    }
  }
  function os(l, t) {
    for (; Zl !== null; ) {
      var a = Zl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          da(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Ve(a.memoizedState.cache);
      }
      if (e = a.child, e !== null) e.return = a, Zl = e;
      else
        l: for (a = l; Zl !== null; ) {
          e = Zl;
          var u = e.sibling, n = e.return;
          if (P0(e), e === a) {
            Zl = null;
            break l;
          }
          if (u !== null) {
            u.return = n, Zl = u;
            break l;
          }
          Zl = n;
        }
    }
  }
  var sr = {
    getCacheForType: function(l) {
      var t = wl(Rl), a = t.data.get(l);
      return a === void 0 && (a = l(), t.data.set(l, a)), a;
    },
    cacheSignal: function() {
      return wl(Rl).controller.signal;
    }
  }, dr = typeof WeakMap == "function" ? WeakMap : Map, cl = 0, bl = null, I = null, ll = 0, dl = 0, mt = null, ra = !1, pe = !1, _c = !1, kt = 0, Dl = 0, ma = 0, La = 0, Mc = 0, ht = 0, be = 0, ou = null, et = null, Oc = !1, gn = 0, ss = 0, pn = 1 / 0, bn = null, ha = null, Bl = 0, ya = null, Se = null, Ft = 0, Dc = 0, Uc = null, ds = null, su = 0, Cc = null;
  function yt() {
    return (cl & 2) !== 0 && ll !== 0 ? ll & -ll : b.T !== null ? Yc() : _f();
  }
  function rs() {
    if (ht === 0)
      if ((ll & 536870912) === 0 || al) {
        var l = _u;
        _u <<= 1, (_u & 3932160) === 0 && (_u = 262144), ht = l;
      } else ht = 536870912;
    return l = dt.current, l !== null && (l.flags |= 32), ht;
  }
  function ut(l, t, a) {
    (l === bl && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null) && (Ee(l, 0), va(
      l,
      ll,
      ht,
      !1
    )), Ce(l, a), ((cl & 2) === 0 || l !== bl) && (l === bl && ((cl & 2) === 0 && (La |= a), Dl === 4 && va(
      l,
      ll,
      ht,
      !1
    )), Rt(l));
  }
  function ms(l, t, a) {
    if ((cl & 6) !== 0) throw Error(r(327));
    var e = !a && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Ue(l, t), u = e ? hr(l, t) : Hc(l, t, !0), n = e;
    do {
      if (u === 0) {
        pe && !e && va(l, t, 0, !1);
        break;
      } else {
        if (a = l.current.alternate, n && !rr(a)) {
          u = Hc(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = ou;
              var f = c.current.memoizedState.isDehydrated;
              if (f && (Ee(c, i).flags |= 256), i = Hc(
                c,
                i,
                !1
              ), i !== 2) {
                if (_c && !f) {
                  c.errorRecoveryDisabledLanes |= n, La |= n, u = 4;
                  break l;
                }
                n = et, et = u, n !== null && (et === null ? et = n : et.push.apply(
                  et,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ee(l, 0), va(l, t, 0, !0);
          break;
        }
        l: {
          switch (e = l, n = u, n) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              va(
                e,
                t,
                ht,
                !ra
              );
              break l;
            case 2:
              et = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && (u = gn + 300 - it(), 10 < u)) {
            if (va(
              e,
              t,
              ht,
              !ra
            ), Ou(e, 0, !0) !== 0) break l;
            Ft = t, e.timeoutHandle = ws(
              hs.bind(
                null,
                e,
                a,
                et,
                bn,
                Oc,
                t,
                ht,
                La,
                be,
                ra,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          hs(
            e,
            a,
            et,
            bn,
            Oc,
            t,
            ht,
            La,
            be,
            ra,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Rt(l);
  }
  function hs(l, t, a, e, u, n, i, c, f, h, p, E, y, v) {
    if (l.timeoutHandle = -1, E = t.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qt
      }, is(
        t,
        n,
        E
      );
      var C = (n & 62914560) === n ? gn - it() : (n & 4194048) === n ? ss - it() : 0;
      if (C = kr(
        E,
        C
      ), C !== null) {
        Ft = n, l.cancelPendingCommit = C(
          zs.bind(
            null,
            l,
            t,
            n,
            a,
            e,
            u,
            i,
            c,
            f,
            p,
            E,
            null,
            y,
            v
          )
        ), va(l, n, i, !h);
        return;
      }
    }
    zs(
      l,
      t,
      n,
      a,
      e,
      u,
      i,
      c,
      f
    );
  }
  function rr(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var e = 0; e < a.length; e++) {
          var u = a[e], n = u.getSnapshot;
          u = u.value;
          try {
            if (!ot(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function va(l, t, a, e) {
    t &= ~Mc, t &= ~La, l.suspendedLanes |= t, l.pingedLanes &= ~t, e && (l.warmLanes |= t), e = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - ft(u), i = 1 << n;
      e[n] = -1, u &= ~i;
    }
    a !== 0 && Af(l, a, t);
  }
  function Sn() {
    return (cl & 6) === 0 ? (du(0), !1) : !0;
  }
  function Nc() {
    if (I !== null) {
      if (dl === 0)
        var l = I.return;
      else
        l = I, Zt = Ra = null, Wi(l), de = null, Je = 0, l = I;
      for (; l !== null; )
        V0(l.alternate, l), l = l.return;
      I = null;
    }
  }
  function Ee(l, t) {
    var a = l.timeoutHandle;
    a !== -1 && (l.timeoutHandle = -1, Nr(a)), a = l.cancelPendingCommit, a !== null && (l.cancelPendingCommit = null, a()), Ft = 0, Nc(), bl = l, I = a = Bt(l.current, null), ll = t, dl = 0, mt = null, ra = !1, pe = Ue(l, t), _c = !1, be = ht = Mc = La = ma = Dl = 0, et = ou = null, Oc = !1, (t & 8) !== 0 && (t |= t & 32);
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var u = 31 - ft(e), n = 1 << u;
        t |= l[u], e &= ~n;
      }
    return kt = t, Zu(), a;
  }
  function ys(l, t) {
    J = null, b.H = tu, t === se || t === Wu ? (t = Co(), dl = 3) : t === qi ? (t = Co(), dl = 4) : dl = t === sc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, mt = t, I === null && (Dl = 1, on(
      l,
      St(t, l.current)
    ));
  }
  function vs() {
    var l = dt.current;
    return l === null ? !0 : (ll & 4194048) === ll ? Tt === null : (ll & 62914560) === ll || (ll & 536870912) !== 0 ? l === Tt : !1;
  }
  function gs() {
    var l = b.H;
    return b.H = tu, l === null ? tu : l;
  }
  function ps() {
    var l = b.A;
    return b.A = sr, l;
  }
  function En() {
    Dl = 4, ra || (ll & 4194048) !== ll && dt.current !== null || (pe = !0), (ma & 134217727) === 0 && (La & 134217727) === 0 || bl === null || va(
      bl,
      ll,
      ht,
      !1
    );
  }
  function Hc(l, t, a) {
    var e = cl;
    cl |= 2;
    var u = gs(), n = ps();
    (bl !== l || ll !== t) && (bn = null, Ee(l, t)), t = !1;
    var i = Dl;
    l: do
      try {
        if (dl !== 0 && I !== null) {
          var c = I, f = mt;
          switch (dl) {
            case 8:
              Nc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              dt.current === null && (t = !0);
              var h = dl;
              if (dl = 0, mt = null, ze(l, c, f, h), a && pe) {
                i = 0;
                break l;
              }
              break;
            default:
              h = dl, dl = 0, mt = null, ze(l, c, f, h);
          }
        }
        mr(), i = Dl;
        break;
      } catch (p) {
        ys(l, p);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Zt = Ra = null, cl = e, b.H = u, b.A = n, I === null && (bl = null, ll = 0, Zu()), i;
  }
  function mr() {
    for (; I !== null; ) bs(I);
  }
  function hr(l, t) {
    var a = cl;
    cl |= 2;
    var e = gs(), u = ps();
    bl !== l || ll !== t ? (bn = null, pn = it() + 500, Ee(l, t)) : pe = Ue(
      l,
      t
    );
    l: do
      try {
        if (dl !== 0 && I !== null) {
          t = I;
          var n = mt;
          t: switch (dl) {
            case 1:
              dl = 0, mt = null, ze(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Do(n)) {
                dl = 0, mt = null, Ss(t);
                break;
              }
              t = function() {
                dl !== 2 && dl !== 9 || bl !== l || (dl = 7), Rt(l);
              }, n.then(t, t);
              break l;
            case 3:
              dl = 7;
              break l;
            case 4:
              dl = 5;
              break l;
            case 7:
              Do(n) ? (dl = 0, mt = null, Ss(t)) : (dl = 0, mt = null, ze(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (I.tag) {
                case 26:
                  i = I.memoizedState;
                case 5:
                case 27:
                  var c = I;
                  if (i ? n1(i) : c.stateNode.complete) {
                    dl = 0, mt = null;
                    var f = c.sibling;
                    if (f !== null) I = f;
                    else {
                      var h = c.return;
                      h !== null ? (I = h, zn(h)) : I = null;
                    }
                    break t;
                  }
              }
              dl = 0, mt = null, ze(l, t, n, 5);
              break;
            case 6:
              dl = 0, mt = null, ze(l, t, n, 6);
              break;
            case 8:
              Nc(), Dl = 6;
              break l;
            default:
              throw Error(r(462));
          }
        }
        yr();
        break;
      } catch (p) {
        ys(l, p);
      }
    while (!0);
    return Zt = Ra = null, b.H = e, b.A = u, cl = a, I !== null ? 0 : (bl = null, ll = 0, Zu(), Dl);
  }
  function yr() {
    for (; I !== null && !B1(); )
      bs(I);
  }
  function bs(l) {
    var t = L0(l.alternate, l, kt);
    l.memoizedProps = l.pendingProps, t === null ? zn(l) : I = t;
  }
  function Ss(l) {
    var t = l, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Y0(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ll
        );
        break;
      case 11:
        t = Y0(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ll
        );
        break;
      case 5:
        Wi(t);
      default:
        V0(a, t), t = I = po(t, kt), t = L0(a, t, kt);
    }
    l.memoizedProps = l.pendingProps, t === null ? zn(l) : I = t;
  }
  function ze(l, t, a, e) {
    Zt = Ra = null, Wi(t), de = null, Je = 0;
    var u = t.return;
    try {
      if (er(
        l,
        u,
        t,
        a,
        ll
      )) {
        Dl = 1, on(
          l,
          St(a, l.current)
        ), I = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw I = u, n;
      Dl = 1, on(
        l,
        St(a, l.current)
      ), I = null;
      return;
    }
    t.flags & 32768 ? (al || e === 1 ? l = !0 : pe || (ll & 536870912) !== 0 ? l = !1 : (ra = l = !0, (e === 2 || e === 9 || e === 3 || e === 6) && (e = dt.current, e !== null && e.tag === 13 && (e.flags |= 16384))), Es(t, l)) : zn(t);
  }
  function zn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Es(
          t,
          ra
        );
        return;
      }
      l = t.return;
      var a = ir(
        t.alternate,
        t,
        kt
      );
      if (a !== null) {
        I = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        I = t;
        return;
      }
      I = t = l;
    } while (t !== null);
    Dl === 0 && (Dl = 5);
  }
  function Es(l, t) {
    do {
      var a = cr(l.alternate, l);
      if (a !== null) {
        a.flags &= 32767, I = a;
        return;
      }
      if (a = l.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (l = l.sibling, l !== null)) {
        I = l;
        return;
      }
      I = l = a;
    } while (l !== null);
    Dl = 6, I = null;
  }
  function zs(l, t, a, e, u, n, i, c, f) {
    l.cancelPendingCommit = null;
    do
      An();
    while (Bl !== 0);
    if ((cl & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === l.current) throw Error(r(177));
      if (n = t.lanes | t.childLanes, n |= Ei, W1(
        l,
        a,
        n,
        i,
        c,
        f
      ), l === bl && (I = bl = null, ll = 0), Se = t, ya = l, Ft = a, Dc = n, Uc = u, ds = e, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, br(Tu, function() {
        return Ms(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), e = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || e) {
        e = b.T, b.T = null, u = _.p, _.p = 2, i = cl, cl |= 4;
        try {
          fr(l, t, a);
        } finally {
          cl = i, _.p = u, b.T = e;
        }
      }
      Bl = 1, As(), Ts(), xs();
    }
  }
  function As() {
    if (Bl === 1) {
      Bl = 0;
      var l = ya, t = Se, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = b.T, b.T = null;
        var e = _.p;
        _.p = 2;
        var u = cl;
        cl |= 4;
        try {
          es(t, l);
          var n = Vc, i = fo(l.containerInfo), c = n.focusedElem, f = n.selectionRange;
          if (i !== c && c && c.ownerDocument && co(
            c.ownerDocument.documentElement,
            c
          )) {
            if (f !== null && vi(c)) {
              var h = f.start, p = f.end;
              if (p === void 0 && (p = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  p,
                  c.value.length
                );
              else {
                var E = c.ownerDocument || document, y = E && E.defaultView || window;
                if (y.getSelection) {
                  var v = y.getSelection(), C = c.textContent.length, G = Math.min(f.start, C), vl = f.end === void 0 ? G : Math.min(f.end, C);
                  !v.extend && G > vl && (i = vl, vl = G, G = i);
                  var d = io(
                    c,
                    G
                  ), o = io(
                    c,
                    vl
                  );
                  if (d && o && (v.rangeCount !== 1 || v.anchorNode !== d.node || v.anchorOffset !== d.offset || v.focusNode !== o.node || v.focusOffset !== o.offset)) {
                    var m = E.createRange();
                    m.setStart(d.node, d.offset), v.removeAllRanges(), G > vl ? (v.addRange(m), v.extend(o.node, o.offset)) : (m.setEnd(o.node, o.offset), v.addRange(m));
                  }
                }
              }
            }
            for (E = [], v = c; v = v.parentNode; )
              v.nodeType === 1 && E.push({
                element: v,
                left: v.scrollLeft,
                top: v.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < E.length; c++) {
              var S = E[c];
              S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
            }
          }
          jn = !!wc, Vc = wc = null;
        } finally {
          cl = u, _.p = e, b.T = a;
        }
      }
      l.current = t, Bl = 2;
    }
  }
  function Ts() {
    if (Bl === 2) {
      Bl = 0;
      var l = ya, t = Se, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = b.T, b.T = null;
        var e = _.p;
        _.p = 2;
        var u = cl;
        cl |= 4;
        try {
          I0(l, t.alternate, t);
        } finally {
          cl = u, _.p = e, b.T = a;
        }
      }
      Bl = 3;
    }
  }
  function xs() {
    if (Bl === 4 || Bl === 3) {
      Bl = 0, G1();
      var l = ya, t = Se, a = Ft, e = ds;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Bl = 5 : (Bl = 0, Se = ya = null, _s(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (ha = null), Fn(a), t = t.stateNode, ct && typeof ct.onCommitFiberRoot == "function")
        try {
          ct.onCommitFiberRoot(
            De,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (e !== null) {
        t = b.T, u = _.p, _.p = 2, b.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < e.length; i++) {
            var c = e[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          b.T = t, _.p = u;
        }
      }
      (Ft & 3) !== 0 && An(), Rt(l), u = l.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? l === Cc ? su++ : (su = 0, Cc = l) : su = 0, du(0);
    }
  }
  function _s(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Ve(t)));
  }
  function An() {
    return As(), Ts(), xs(), Ms();
  }
  function Ms() {
    if (Bl !== 5) return !1;
    var l = ya, t = Dc;
    Dc = 0;
    var a = Fn(Ft), e = b.T, u = _.p;
    try {
      _.p = 32 > a ? 32 : a, b.T = null, a = Uc, Uc = null;
      var n = ya, i = Ft;
      if (Bl = 0, Se = ya = null, Ft = 0, (cl & 6) !== 0) throw Error(r(331));
      var c = cl;
      if (cl |= 4, fs(n.current), ns(
        n,
        n.current,
        i,
        a
      ), cl = c, du(0, !1), ct && typeof ct.onPostCommitFiberRoot == "function")
        try {
          ct.onPostCommitFiberRoot(De, n);
        } catch {
        }
      return !0;
    } finally {
      _.p = u, b.T = e, _s(l, t);
    }
  }
  function Os(l, t, a) {
    t = St(a, t), t = oc(l.stateNode, t, 2), l = fa(l, t, 2), l !== null && (Ce(l, 2), Rt(l));
  }
  function rl(l, t, a) {
    if (l.tag === 3)
      Os(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Os(
            t,
            l,
            a
          );
          break;
        } else if (t.tag === 1) {
          var e = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof e.componentDidCatch == "function" && (ha === null || !ha.has(e))) {
            l = St(a, l), a = D0(2), e = fa(t, a, 2), e !== null && (U0(
              a,
              e,
              t,
              l
            ), Ce(e, 2), Rt(e));
            break;
          }
        }
        t = t.return;
      }
  }
  function Rc(l, t, a) {
    var e = l.pingCache;
    if (e === null) {
      e = l.pingCache = new dr();
      var u = /* @__PURE__ */ new Set();
      e.set(t, u);
    } else
      u = e.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), e.set(t, u));
    u.has(a) || (_c = !0, u.add(a), l = vr.bind(null, l, t, a), t.then(l, l));
  }
  function vr(l, t, a) {
    var e = l.pingCache;
    e !== null && e.delete(t), l.pingedLanes |= l.suspendedLanes & a, l.warmLanes &= ~a, bl === l && (ll & a) === a && (Dl === 4 || Dl === 3 && (ll & 62914560) === ll && 300 > it() - gn ? (cl & 2) === 0 && Ee(l, 0) : Mc |= a, be === ll && (be = 0)), Rt(l);
  }
  function Ds(l, t) {
    t === 0 && (t = zf()), l = Ca(l, t), l !== null && (Ce(l, t), Rt(l));
  }
  function gr(l) {
    var t = l.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Ds(l, a);
  }
  function pr(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var e = l.stateNode, u = l.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = l.stateNode;
        break;
      case 22:
        e = l.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    e !== null && e.delete(t), Ds(l, a);
  }
  function br(l, t) {
    return Jn(l, t);
  }
  var Tn = null, Ae = null, jc = !1, xn = !1, qc = !1, ga = 0;
  function Rt(l) {
    l !== Ae && l.next === null && (Ae === null ? Tn = Ae = l : Ae = Ae.next = l), xn = !0, jc || (jc = !0, Er());
  }
  function du(l, t) {
    if (!qc && xn) {
      qc = !0;
      do
        for (var a = !1, e = Tn; e !== null; ) {
          if (l !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = e.suspendedLanes, c = e.pingedLanes;
              n = (1 << 31 - ft(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (a = !0, Hs(e, n));
          } else
            n = ll, n = Ou(
              e,
              e === bl ? n : 0,
              e.cancelPendingCommit !== null || e.timeoutHandle !== -1
            ), (n & 3) === 0 || Ue(e, n) || (a = !0, Hs(e, n));
          e = e.next;
        }
      while (a);
      qc = !1;
    }
  }
  function Sr() {
    Us();
  }
  function Us() {
    xn = jc = !1;
    var l = 0;
    ga !== 0 && Cr() && (l = ga);
    for (var t = it(), a = null, e = Tn; e !== null; ) {
      var u = e.next, n = Cs(e, t);
      n === 0 ? (e.next = null, a === null ? Tn = u : a.next = u, u === null && (Ae = a)) : (a = e, (l !== 0 || (n & 3) !== 0) && (xn = !0)), e = u;
    }
    Bl !== 0 && Bl !== 5 || du(l), ga !== 0 && (ga = 0);
  }
  function Cs(l, t) {
    for (var a = l.suspendedLanes, e = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - ft(n), c = 1 << i, f = u[i];
      f === -1 ? ((c & a) === 0 || (c & e) !== 0) && (u[i] = J1(c, t)) : f <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = bl, a = ll, a = Ou(
      l,
      l === t ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), e = l.callbackNode, a === 0 || l === t && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null)
      return e !== null && e !== null && Wn(e), l.callbackNode = null, l.callbackPriority = 0;
    if ((a & 3) === 0 || Ue(l, a)) {
      if (t = a & -a, t === l.callbackPriority) return t;
      switch (e !== null && Wn(e), Fn(a)) {
        case 2:
        case 8:
          a = Sf;
          break;
        case 32:
          a = Tu;
          break;
        case 268435456:
          a = Ef;
          break;
        default:
          a = Tu;
      }
      return e = Ns.bind(null, l), a = Jn(a, e), l.callbackPriority = t, l.callbackNode = a, t;
    }
    return e !== null && e !== null && Wn(e), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Ns(l, t) {
    if (Bl !== 0 && Bl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var a = l.callbackNode;
    if (An() && l.callbackNode !== a)
      return null;
    var e = ll;
    return e = Ou(
      l,
      l === bl ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), e === 0 ? null : (ms(l, e, t), Cs(l, it()), l.callbackNode != null && l.callbackNode === a ? Ns.bind(null, l) : null);
  }
  function Hs(l, t) {
    if (An()) return null;
    ms(l, t, !0);
  }
  function Er() {
    Hr(function() {
      (cl & 6) !== 0 ? Jn(
        bf,
        Sr
      ) : Us();
    });
  }
  function Yc() {
    if (ga === 0) {
      var l = fe;
      l === 0 && (l = xu, xu <<= 1, (xu & 261888) === 0 && (xu = 256)), ga = l;
    }
    return ga;
  }
  function Rs(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Nu("" + l);
  }
  function js(l, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, l.id && a.setAttribute("form", l.id), t.parentNode.insertBefore(a, t), l = new FormData(l), a.parentNode.removeChild(a), l;
  }
  function zr(l, t, a, e, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var n = Rs(
        (u[Il] || null).action
      ), i = e.submitter;
      i && (t = (t = i[Il] || null) ? Rs(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new qu(
        "action",
        "action",
        null,
        e,
        u
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (e.defaultPrevented) {
                if (ga !== 0) {
                  var f = i ? js(u, i) : new FormData(u);
                  ec(
                    a,
                    {
                      pending: !0,
                      data: f,
                      method: u.method,
                      action: n
                    },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), f = i ? js(u, i) : new FormData(u), ec(
                  a,
                  {
                    pending: !0,
                    data: f,
                    method: u.method,
                    action: n
                  },
                  n,
                  f
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Bc = 0; Bc < Si.length; Bc++) {
    var Gc = Si[Bc], Ar = Gc.toLowerCase(), Tr = Gc[0].toUpperCase() + Gc.slice(1);
    Mt(
      Ar,
      "on" + Tr
    );
  }
  Mt(ro, "onAnimationEnd"), Mt(mo, "onAnimationIteration"), Mt(ho, "onAnimationStart"), Mt("dblclick", "onDoubleClick"), Mt("focusin", "onFocus"), Mt("focusout", "onBlur"), Mt(Zd, "onTransitionRun"), Mt(Xd, "onTransitionStart"), Mt(Qd, "onTransitionCancel"), Mt(yo, "onTransitionEnd"), Wa("onMouseEnter", ["mouseout", "mouseover"]), Wa("onMouseLeave", ["mouseout", "mouseover"]), Wa("onPointerEnter", ["pointerout", "pointerover"]), Wa("onPointerLeave", ["pointerout", "pointerover"]), Ma(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ma(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ma("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ma(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ma(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ma(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ru = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xr = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ru)
  );
  function qs(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var e = l[a], u = e.event;
      e = e.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = e.length - 1; 0 <= i; i--) {
            var c = e[i], f = c.instance, h = c.currentTarget;
            if (c = c.listener, f !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (p) {
              Gu(p);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (i = 0; i < e.length; i++) {
            if (c = e[i], f = c.instance, h = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (p) {
              Gu(p);
            }
            u.currentTarget = null, n = f;
          }
      }
    }
  }
  function P(l, t) {
    var a = t[In];
    a === void 0 && (a = t[In] = /* @__PURE__ */ new Set());
    var e = l + "__bubble";
    a.has(e) || (Ys(t, l, 2, !1), a.add(e));
  }
  function Zc(l, t, a) {
    var e = 0;
    t && (e |= 4), Ys(
      a,
      l,
      e,
      t
    );
  }
  var _n = "_reactListening" + Math.random().toString(36).slice(2);
  function Xc(l) {
    if (!l[_n]) {
      l[_n] = !0, Df.forEach(function(a) {
        a !== "selectionchange" && (xr.has(a) || Zc(a, !1, l), Zc(a, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[_n] || (t[_n] = !0, Zc("selectionchange", !1, t));
    }
  }
  function Ys(l, t, a, e) {
    switch (r1(t)) {
      case 2:
        var u = Pr;
        break;
      case 8:
        u = lm;
        break;
      default:
        u = af;
    }
    a = u.bind(
      null,
      t,
      a,
      l
    ), u = void 0, !ci || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), e ? u !== void 0 ? l.addEventListener(t, a, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, a, !0) : u !== void 0 ? l.addEventListener(t, a, {
      passive: u
    }) : l.addEventListener(t, a, !1);
  }
  function Qc(l, t, a, e, u) {
    var n = e;
    if ((t & 1) === 0 && (t & 2) === 0 && e !== null)
      l: for (; ; ) {
        if (e === null) return;
        var i = e.tag;
        if (i === 3 || i === 4) {
          var c = e.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = e.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = Va(c), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              e = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        e = e.return;
      }
    Xf(function() {
      var h = n, p = ni(a), E = [];
      l: {
        var y = vo.get(l);
        if (y !== void 0) {
          var v = qu, C = l;
          switch (l) {
            case "keypress":
              if (Ru(a) === 0) break l;
            case "keydown":
            case "keyup":
              v = pd;
              break;
            case "focusin":
              C = "focus", v = di;
              break;
            case "focusout":
              C = "blur", v = di;
              break;
            case "beforeblur":
            case "afterblur":
              v = di;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              v = wf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              v = id;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              v = Ed;
              break;
            case ro:
            case mo:
            case ho:
              v = od;
              break;
            case yo:
              v = Ad;
              break;
            case "scroll":
            case "scrollend":
              v = ud;
              break;
            case "wheel":
              v = xd;
              break;
            case "copy":
            case "cut":
            case "paste":
              v = dd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              v = Kf;
              break;
            case "toggle":
            case "beforetoggle":
              v = Md;
          }
          var G = (t & 4) !== 0, vl = !G && (l === "scroll" || l === "scrollend"), d = G ? y !== null ? y + "Capture" : null : y;
          G = [];
          for (var o = h, m; o !== null; ) {
            var S = o;
            if (m = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || m === null || d === null || (S = Re(o, d), S != null && G.push(
              mu(o, S, m)
            )), vl) break;
            o = o.return;
          }
          0 < G.length && (y = new v(
            y,
            C,
            null,
            a,
            p
          ), E.push({ event: y, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (y = l === "mouseover" || l === "pointerover", v = l === "mouseout" || l === "pointerout", y && a !== ui && (C = a.relatedTarget || a.fromElement) && (Va(C) || C[wa]))
            break l;
          if ((v || y) && (y = p.window === p ? p : (y = p.ownerDocument) ? y.defaultView || y.parentWindow : window, v ? (C = a.relatedTarget || a.toElement, v = h, C = C ? Va(C) : null, C !== null && (vl = el(C), G = C.tag, C !== vl || G !== 5 && G !== 27 && G !== 6) && (C = null)) : (v = null, C = h), v !== C)) {
            if (G = wf, S = "onMouseLeave", d = "onMouseEnter", o = "mouse", (l === "pointerout" || l === "pointerover") && (G = Kf, S = "onPointerLeave", d = "onPointerEnter", o = "pointer"), vl = v == null ? y : He(v), m = C == null ? y : He(C), y = new G(
              S,
              o + "leave",
              v,
              a,
              p
            ), y.target = vl, y.relatedTarget = m, S = null, Va(p) === h && (G = new G(
              d,
              o + "enter",
              C,
              a,
              p
            ), G.target = m, G.relatedTarget = vl, S = G), vl = S, v && C)
              t: {
                for (G = _r, d = v, o = C, m = 0, S = d; S; S = G(S))
                  m++;
                S = 0;
                for (var B = o; B; B = G(B))
                  S++;
                for (; 0 < m - S; )
                  d = G(d), m--;
                for (; 0 < S - m; )
                  o = G(o), S--;
                for (; m--; ) {
                  if (d === o || o !== null && d === o.alternate) {
                    G = d;
                    break t;
                  }
                  d = G(d), o = G(o);
                }
                G = null;
              }
            else G = null;
            v !== null && Bs(
              E,
              y,
              v,
              G,
              !1
            ), C !== null && vl !== null && Bs(
              E,
              vl,
              C,
              G,
              !0
            );
          }
        }
        l: {
          if (y = h ? He(h) : window, v = y.nodeName && y.nodeName.toLowerCase(), v === "select" || v === "input" && y.type === "file")
            var ul = lo;
          else if (If(y))
            if (to)
              ul = Yd;
            else {
              ul = jd;
              var H = Rd;
            }
          else
            v = y.nodeName, !v || v.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? h && ei(h.elementType) && (ul = lo) : ul = qd;
          if (ul && (ul = ul(l, h))) {
            Pf(
              E,
              ul,
              a,
              p
            );
            break l;
          }
          H && H(l, y, h), l === "focusout" && h && y.type === "number" && h.memoizedProps.value != null && ai(y, "number", y.value);
        }
        switch (H = h ? He(h) : window, l) {
          case "focusin":
            (If(H) || H.contentEditable === "true") && (le = H, gi = h, Qe = null);
            break;
          case "focusout":
            Qe = gi = le = null;
            break;
          case "mousedown":
            pi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pi = !1, oo(E, a, p);
            break;
          case "selectionchange":
            if (Gd) break;
          case "keydown":
          case "keyup":
            oo(E, a, p);
        }
        var W;
        if (mi)
          l: {
            switch (l) {
              case "compositionstart":
                var tl = "onCompositionStart";
                break l;
              case "compositionend":
                tl = "onCompositionEnd";
                break l;
              case "compositionupdate":
                tl = "onCompositionUpdate";
                break l;
            }
            tl = void 0;
          }
        else
          Pa ? kf(l, a) && (tl = "onCompositionEnd") : l === "keydown" && a.keyCode === 229 && (tl = "onCompositionStart");
        tl && (Jf && a.locale !== "ko" && (Pa || tl !== "onCompositionStart" ? tl === "onCompositionEnd" && Pa && (W = Qf()) : (ta = p, fi = "value" in ta ? ta.value : ta.textContent, Pa = !0)), H = Mn(h, tl), 0 < H.length && (tl = new Vf(
          tl,
          l,
          null,
          a,
          p
        ), E.push({ event: tl, listeners: H }), W ? tl.data = W : (W = Ff(a), W !== null && (tl.data = W)))), (W = Dd ? Ud(l, a) : Cd(l, a)) && (tl = Mn(h, "onBeforeInput"), 0 < tl.length && (H = new Vf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          p
        ), E.push({
          event: H,
          listeners: tl
        }), H.data = W)), zr(
          E,
          l,
          h,
          a,
          p
        );
      }
      qs(E, t);
    });
  }
  function mu(l, t, a) {
    return {
      instance: l,
      listener: t,
      currentTarget: a
    };
  }
  function Mn(l, t) {
    for (var a = t + "Capture", e = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Re(l, a), u != null && e.unshift(
        mu(l, u, n)
      ), u = Re(l, t), u != null && e.push(
        mu(l, u, n)
      )), l.tag === 3) return e;
      l = l.return;
    }
    return [];
  }
  function _r(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Bs(l, t, a, e, u) {
    for (var n = t._reactName, i = []; a !== null && a !== e; ) {
      var c = a, f = c.alternate, h = c.stateNode;
      if (c = c.tag, f !== null && f === e) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (f = h, u ? (h = Re(a, n), h != null && i.unshift(
        mu(a, h, f)
      )) : u || (h = Re(a, n), h != null && i.push(
        mu(a, h, f)
      ))), a = a.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Mr = /\r\n?/g, Or = /\u0000|\uFFFD/g;
  function Gs(l) {
    return (typeof l == "string" ? l : "" + l).replace(Mr, `
`).replace(Or, "");
  }
  function Zs(l, t) {
    return t = Gs(t), Gs(l) === t;
  }
  function yl(l, t, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string" ? t === "body" || t === "textarea" && e === "" || ka(l, e) : (typeof e == "number" || typeof e == "bigint") && t !== "body" && ka(l, "" + e);
        break;
      case "className":
        Uu(l, "class", e);
        break;
      case "tabIndex":
        Uu(l, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Uu(l, a, e);
        break;
      case "style":
        Gf(l, e, n);
        break;
      case "data":
        if (t !== "object") {
          Uu(l, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (e == null || typeof e == "function" || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        e = Nu("" + e), l.setAttribute(a, e);
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (a === "formAction" ? (t !== "input" && yl(l, t, "name", u.name, u, null), yl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), yl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), yl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (yl(l, t, "encType", u.encType, u, null), yl(l, t, "method", u.method, u, null), yl(l, t, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        e = Nu("" + e), l.setAttribute(a, e);
        break;
      case "onClick":
        e != null && (l.onclick = qt);
        break;
      case "onScroll":
        e != null && P("scroll", l);
        break;
      case "onScrollEnd":
        e != null && P("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(r(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(r(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        l.muted = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (e == null || typeof e == "function" || typeof e == "boolean" || typeof e == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        a = Nu("" + e), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        e != null && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, "" + e) : l.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        e && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, "") : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0 ? l.setAttribute(a, "") : e !== !1 && e != null && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, e) : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null && typeof e != "function" && typeof e != "symbol" && !isNaN(e) && 1 <= e ? l.setAttribute(a, e) : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e) ? l.removeAttribute(a) : l.setAttribute(a, e);
        break;
      case "popover":
        P("beforetoggle", l), P("toggle", l), Du(l, "popover", e);
        break;
      case "xlinkActuate":
        jt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          e
        );
        break;
      case "xlinkArcrole":
        jt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          e
        );
        break;
      case "xlinkRole":
        jt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          e
        );
        break;
      case "xlinkShow":
        jt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          e
        );
        break;
      case "xlinkTitle":
        jt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          e
        );
        break;
      case "xlinkType":
        jt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          e
        );
        break;
      case "xmlBase":
        jt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          e
        );
        break;
      case "xmlLang":
        jt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          e
        );
        break;
      case "xmlSpace":
        jt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          e
        );
        break;
      case "is":
        Du(l, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = ad.get(a) || a, Du(l, a, e));
    }
  }
  function Lc(l, t, a, e, u, n) {
    switch (a) {
      case "style":
        Gf(l, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(r(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(r(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string" ? ka(l, e) : (typeof e == "number" || typeof e == "bigint") && ka(l, "" + e);
        break;
      case "onScroll":
        e != null && P("scroll", l);
        break;
      case "onScrollEnd":
        e != null && P("scrollend", l);
        break;
      case "onClick":
        e != null && (l.onclick = qt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Uf.hasOwnProperty(a))
          l: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), t = a.slice(2, u ? a.length - 7 : void 0), n = l[Il] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof e == "function")) {
              typeof n != "function" && n !== null && (a in l ? l[a] = null : l.hasAttribute(a) && l.removeAttribute(a)), l.addEventListener(t, e, u);
              break l;
            }
            a in l ? l[a] = e : e === !0 ? l.setAttribute(a, "") : Du(l, a, e);
          }
    }
  }
  function Kl(l, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        P("error", l), P("load", l);
        var e = !1, u = !1, n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var i = a[n];
            if (i != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  yl(l, t, n, i, a, null);
              }
          }
        u && yl(l, t, "srcSet", a.srcSet, a, null), e && yl(l, t, "src", a.src, a, null);
        return;
      case "input":
        P("invalid", l);
        var c = n = i = u = null, f = null, h = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var p = a[e];
            if (p != null)
              switch (e) {
                case "name":
                  u = p;
                  break;
                case "type":
                  i = p;
                  break;
                case "checked":
                  f = p;
                  break;
                case "defaultChecked":
                  h = p;
                  break;
                case "value":
                  n = p;
                  break;
                case "defaultValue":
                  c = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p != null)
                    throw Error(r(137, t));
                  break;
                default:
                  yl(l, t, e, p, a, null);
              }
          }
        jf(
          l,
          n,
          c,
          f,
          h,
          i,
          u,
          !1
        );
        return;
      case "select":
        P("invalid", l), e = i = n = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (c = a[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                e = c;
              default:
                yl(l, t, u, c, a, null);
            }
        t = n, a = i, l.multiple = !!e, t != null ? $a(l, !!e, t, !1) : a != null && $a(l, !!e, a, !0);
        return;
      case "textarea":
        P("invalid", l), n = u = e = null;
        for (i in a)
          if (a.hasOwnProperty(i) && (c = a[i], c != null))
            switch (i) {
              case "value":
                e = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(r(91));
                break;
              default:
                yl(l, t, i, c, a, null);
            }
        Yf(l, e, u, n);
        return;
      case "option":
        for (f in a)
          if (a.hasOwnProperty(f) && (e = a[f], e != null))
            switch (f) {
              case "selected":
                l.selected = e && typeof e != "function" && typeof e != "symbol";
                break;
              default:
                yl(l, t, f, e, a, null);
            }
        return;
      case "dialog":
        P("beforetoggle", l), P("toggle", l), P("cancel", l), P("close", l);
        break;
      case "iframe":
      case "object":
        P("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < ru.length; e++)
          P(ru[e], l);
        break;
      case "image":
        P("error", l), P("load", l);
        break;
      case "details":
        P("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        P("error", l), P("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in a)
          if (a.hasOwnProperty(h) && (e = a[h], e != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                yl(l, t, h, e, a, null);
            }
        return;
      default:
        if (ei(t)) {
          for (p in a)
            a.hasOwnProperty(p) && (e = a[p], e !== void 0 && Lc(
              l,
              t,
              p,
              e,
              a,
              void 0
            ));
          return;
        }
    }
    for (c in a)
      a.hasOwnProperty(c) && (e = a[c], e != null && yl(l, t, c, e, a, null));
  }
  function Dr(l, t, a, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, n = null, i = null, c = null, f = null, h = null, p = null;
        for (v in a) {
          var E = a[v];
          if (a.hasOwnProperty(v) && E != null)
            switch (v) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = E;
              default:
                e.hasOwnProperty(v) || yl(l, t, v, null, e, E);
            }
        }
        for (var y in e) {
          var v = e[y];
          if (E = a[y], e.hasOwnProperty(y) && (v != null || E != null))
            switch (y) {
              case "type":
                n = v;
                break;
              case "name":
                u = v;
                break;
              case "checked":
                h = v;
                break;
              case "defaultChecked":
                p = v;
                break;
              case "value":
                i = v;
                break;
              case "defaultValue":
                c = v;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null)
                  throw Error(r(137, t));
                break;
              default:
                v !== E && yl(
                  l,
                  t,
                  y,
                  v,
                  e,
                  E
                );
            }
        }
        ti(
          l,
          i,
          c,
          f,
          h,
          p,
          n,
          u
        );
        return;
      case "select":
        v = i = c = y = null;
        for (n in a)
          if (f = a[n], a.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                v = f;
              default:
                e.hasOwnProperty(n) || yl(
                  l,
                  t,
                  n,
                  null,
                  e,
                  f
                );
            }
        for (u in e)
          if (n = e[u], f = a[u], e.hasOwnProperty(u) && (n != null || f != null))
            switch (u) {
              case "value":
                y = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== f && yl(
                  l,
                  t,
                  u,
                  n,
                  e,
                  f
                );
            }
        t = c, a = i, e = v, y != null ? $a(l, !!a, y, !1) : !!e != !!a && (t != null ? $a(l, !!a, t, !0) : $a(l, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        v = y = null;
        for (c in a)
          if (u = a[c], a.hasOwnProperty(c) && u != null && !e.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                yl(l, t, c, null, e, u);
            }
        for (i in e)
          if (u = e[i], n = a[i], e.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                v = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== n && yl(l, t, i, u, e, n);
            }
        qf(l, y, v);
        return;
      case "option":
        for (var C in a)
          if (y = a[C], a.hasOwnProperty(C) && y != null && !e.hasOwnProperty(C))
            switch (C) {
              case "selected":
                l.selected = !1;
                break;
              default:
                yl(
                  l,
                  t,
                  C,
                  null,
                  e,
                  y
                );
            }
        for (f in e)
          if (y = e[f], v = a[f], e.hasOwnProperty(f) && y !== v && (y != null || v != null))
            switch (f) {
              case "selected":
                l.selected = y && typeof y != "function" && typeof y != "symbol";
                break;
              default:
                yl(
                  l,
                  t,
                  f,
                  y,
                  e,
                  v
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var G in a)
          y = a[G], a.hasOwnProperty(G) && y != null && !e.hasOwnProperty(G) && yl(l, t, G, null, e, y);
        for (h in e)
          if (y = e[h], v = a[h], e.hasOwnProperty(h) && y !== v && (y != null || v != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(r(137, t));
                break;
              default:
                yl(
                  l,
                  t,
                  h,
                  y,
                  e,
                  v
                );
            }
        return;
      default:
        if (ei(t)) {
          for (var vl in a)
            y = a[vl], a.hasOwnProperty(vl) && y !== void 0 && !e.hasOwnProperty(vl) && Lc(
              l,
              t,
              vl,
              void 0,
              e,
              y
            );
          for (p in e)
            y = e[p], v = a[p], !e.hasOwnProperty(p) || y === v || y === void 0 && v === void 0 || Lc(
              l,
              t,
              p,
              y,
              e,
              v
            );
          return;
        }
    }
    for (var d in a)
      y = a[d], a.hasOwnProperty(d) && y != null && !e.hasOwnProperty(d) && yl(l, t, d, null, e, y);
    for (E in e)
      y = e[E], v = a[E], !e.hasOwnProperty(E) || y === v || y == null && v == null || yl(l, t, E, y, e, v);
  }
  function Xs(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Ur() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, a = performance.getEntriesByType("resource"), e = 0; e < a.length; e++) {
        var u = a[e], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Xs(i)) {
          for (i = 0, c = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e], h = f.startTime;
            if (h > c) break;
            var p = f.transferSize, E = f.initiatorType;
            p && Xs(E) && (f = f.responseEnd, i += p * (f < c ? 1 : (c - h) / (f - h)));
          }
          if (--e, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var wc = null, Vc = null;
  function On(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Qs(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ls(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Kc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Jc = null;
  function Cr() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Jc ? !1 : (Jc = l, !0) : (Jc = null, !1);
  }
  var ws = typeof setTimeout == "function" ? setTimeout : void 0, Nr = typeof clearTimeout == "function" ? clearTimeout : void 0, Vs = typeof Promise == "function" ? Promise : void 0, Hr = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vs < "u" ? function(l) {
    return Vs.resolve(null).then(l).catch(Rr);
  } : ws;
  function Rr(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function pa(l) {
    return l === "head";
  }
  function Ks(l, t) {
    var a = t, e = 0;
    do {
      var u = a.nextSibling;
      if (l.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$" || a === "/&") {
          if (e === 0) {
            l.removeChild(u), Me(t);
            return;
          }
          e--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          e++;
        else if (a === "html")
          hu(l.ownerDocument.documentElement);
        else if (a === "head") {
          a = l.ownerDocument.head, hu(a);
          for (var n = a.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Ne] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || a.removeChild(n), n = i;
          }
        } else
          a === "body" && hu(l.ownerDocument.body);
      a = u;
    } while (a);
    Me(t);
  }
  function Js(l, t) {
    var a = l;
    l = 0;
    do {
      var e = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), e && e.nodeType === 8)
        if (a = e.data, a === "/$") {
          if (l === 0) break;
          l--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || l++;
      a = e;
    } while (a);
  }
  function Wc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wc(a), Pn(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function jr(l, t, a, e) {
    for (; l.nodeType === 1; ) {
      var u = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!e && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (e) {
        if (!l[Ne])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = xt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function qr(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function Ws(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function $c(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function kc(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Yr(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var e = function() {
        t(), a.removeEventListener("DOMContentLoaded", e);
      };
      a.addEventListener("DOMContentLoaded", e), l._reactRetry = e;
    }
  }
  function xt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Fc = null;
  function $s(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return xt(l.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function ks(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Fs(l, t, a) {
    switch (t = On(a), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(r(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(r(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(r(454));
        return l;
      default:
        throw Error(r(451));
    }
  }
  function hu(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Pn(l);
  }
  var _t = /* @__PURE__ */ new Map(), Is = /* @__PURE__ */ new Set();
  function Dn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var It = _.d;
  _.d = {
    f: Br,
    r: Gr,
    D: Zr,
    C: Xr,
    L: Qr,
    m: Lr,
    X: Vr,
    S: wr,
    M: Kr
  };
  function Br() {
    var l = It.f(), t = Sn();
    return l || t;
  }
  function Gr(l) {
    var t = Ka(l);
    t !== null && t.tag === 5 && t.type === "form" ? y0(t) : It.r(l);
  }
  var Te = typeof document > "u" ? null : document;
  function Ps(l, t, a) {
    var e = Te;
    if (e && typeof t == "string" && t) {
      var u = pt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), Is.has(u) || (Is.add(u), l = { rel: l, crossOrigin: a, href: t }, e.querySelector(u) === null && (t = e.createElement("link"), Kl(t, "link", l), Gl(t), e.head.appendChild(t)));
    }
  }
  function Zr(l) {
    It.D(l), Ps("dns-prefetch", l, null);
  }
  function Xr(l, t) {
    It.C(l, t), Ps("preconnect", l, t);
  }
  function Qr(l, t, a) {
    It.L(l, t, a);
    var e = Te;
    if (e && l && t) {
      var u = 'link[rel="preload"][as="' + pt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + pt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + pt(
        a.imageSizes
      ) + '"]')) : u += '[href="' + pt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = xe(l);
          break;
        case "script":
          n = _e(l);
      }
      _t.has(n) || (l = j(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : l,
          as: t
        },
        a
      ), _t.set(n, l), e.querySelector(u) !== null || t === "style" && e.querySelector(yu(n)) || t === "script" && e.querySelector(vu(n)) || (t = e.createElement("link"), Kl(t, "link", l), Gl(t), e.head.appendChild(t)));
    }
  }
  function Lr(l, t) {
    It.m(l, t);
    var a = Te;
    if (a && l) {
      var e = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + pt(e) + '"][href="' + pt(l) + '"]', n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = _e(l);
      }
      if (!_t.has(n) && (l = j({ rel: "modulepreload", href: l }, t), _t.set(n, l), a.querySelector(u) === null)) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(vu(n)))
              return;
        }
        e = a.createElement("link"), Kl(e, "link", l), Gl(e), a.head.appendChild(e);
      }
    }
  }
  function wr(l, t, a) {
    It.S(l, t, a);
    var e = Te;
    if (e && l) {
      var u = Ja(e).hoistableStyles, n = xe(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = e.querySelector(
          yu(n)
        ))
          c.loading = 5;
        else {
          l = j(
            { rel: "stylesheet", href: l, "data-precedence": t },
            a
          ), (a = _t.get(n)) && Ic(l, a);
          var f = i = e.createElement("link");
          Gl(f), Kl(f, "link", l), f._p = new Promise(function(h, p) {
            f.onload = h, f.onerror = p;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Un(i, t, e);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function Vr(l, t) {
    It.X(l, t);
    var a = Te;
    if (a && l) {
      var e = Ja(a).hoistableScripts, u = _e(l), n = e.get(u);
      n || (n = a.querySelector(vu(u)), n || (l = j({ src: l, async: !0 }, t), (t = _t.get(u)) && Pc(l, t), n = a.createElement("script"), Gl(n), Kl(n, "link", l), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function Kr(l, t) {
    It.M(l, t);
    var a = Te;
    if (a && l) {
      var e = Ja(a).hoistableScripts, u = _e(l), n = e.get(u);
      n || (n = a.querySelector(vu(u)), n || (l = j({ src: l, async: !0, type: "module" }, t), (t = _t.get(u)) && Pc(l, t), n = a.createElement("script"), Gl(n), Kl(n, "link", l), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function l1(l, t, a, e) {
    var u = (u = F.current) ? Dn(u) : null;
    if (!u) throw Error(r(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = xe(a.href), a = Ja(
          u
        ).hoistableStyles, e = a.get(t), e || (e = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, e)), e) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          l = xe(a.href);
          var n = Ja(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            yu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), _t.has(l) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, _t.set(l, a), n || Jr(
            u,
            l,
            a,
            i.state
          ))), t && e === null)
            throw Error(r(528, ""));
          return i;
        }
        if (t && e !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = _e(a), a = Ja(
          u
        ).hoistableScripts, e = a.get(t), e || (e = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, e)), e) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, l));
    }
  }
  function xe(l) {
    return 'href="' + pt(l) + '"';
  }
  function yu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function t1(l) {
    return j({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Jr(l, t, a, e) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? e.loading = 1 : (t = l.createElement("link"), e.preload = t, t.addEventListener("load", function() {
      return e.loading |= 1;
    }), t.addEventListener("error", function() {
      return e.loading |= 2;
    }), Kl(t, "link", a), Gl(t), l.head.appendChild(t));
  }
  function _e(l) {
    return '[src="' + pt(l) + '"]';
  }
  function vu(l) {
    return "script[async]" + l;
  }
  function a1(l, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var e = l.querySelector(
            'style[data-href~="' + pt(a.href) + '"]'
          );
          if (e)
            return t.instance = e, Gl(e), e;
          var u = j({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return e = (l.ownerDocument || l).createElement(
            "style"
          ), Gl(e), Kl(e, "style", u), Un(e, a.precedence, l), t.instance = e;
        case "stylesheet":
          u = xe(a.href);
          var n = l.querySelector(
            yu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Gl(n), n;
          e = t1(a), (u = _t.get(u)) && Ic(e, u), n = (l.ownerDocument || l).createElement("link"), Gl(n);
          var i = n;
          return i._p = new Promise(function(c, f) {
            i.onload = c, i.onerror = f;
          }), Kl(n, "link", e), t.state.loading |= 4, Un(n, a.precedence, l), t.instance = n;
        case "script":
          return n = _e(a.src), (u = l.querySelector(
            vu(n)
          )) ? (t.instance = u, Gl(u), u) : (e = a, (u = _t.get(n)) && (e = j({}, a), Pc(e, u)), l = l.ownerDocument || l, u = l.createElement("script"), Gl(u), Kl(u, "link", e), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (e = t.instance, t.state.loading |= 4, Un(e, a.precedence, l));
    return t.instance;
  }
  function Un(l, t, a) {
    for (var e = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = e.length ? e[e.length - 1] : null, n = u, i = 0; i < e.length; i++) {
      var c = e[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(l, t.firstChild));
  }
  function Ic(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Pc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Cn = null;
  function e1(l, t, a) {
    if (Cn === null) {
      var e = /* @__PURE__ */ new Map(), u = Cn = /* @__PURE__ */ new Map();
      u.set(a, e);
    } else
      u = Cn, e = u.get(a), e || (e = /* @__PURE__ */ new Map(), u.set(a, e));
    if (e.has(l)) return e;
    for (e.set(l, null), a = a.getElementsByTagName(l), u = 0; u < a.length; u++) {
      var n = a[u];
      if (!(n[Ne] || n[Ql] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = e.get(i);
        c ? c.push(n) : e.set(i, [n]);
      }
    }
    return e;
  }
  function u1(l, t, a) {
    l = l.ownerDocument || l, l.head.insertBefore(
      a,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Wr(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function n1(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function $r(l, t, a, e) {
    if (a.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = xe(e.href), n = t.querySelector(
          yu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Nn.bind(l), t.then(l, l)), a.state.loading |= 4, a.instance = n, Gl(n);
          return;
        }
        n = t.ownerDocument || t, e = t1(e), (u = _t.get(u)) && Ic(e, u), n = n.createElement("link"), Gl(n);
        var i = n;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), Kl(n, "link", e), a.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = Nn.bind(l), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var lf = 0;
  function kr(l, t) {
    return l.stylesheets && l.count === 0 && Rn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(a) {
      var e = setTimeout(function() {
        if (l.stylesheets && Rn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && lf === 0 && (lf = 62500 * Ur());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Rn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > lf ? 50 : 800) + t
      );
      return l.unsuspend = a, function() {
        l.unsuspend = null, clearTimeout(e), clearTimeout(u);
      };
    } : null;
  }
  function Nn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Rn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Hn = null;
  function Rn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Hn = /* @__PURE__ */ new Map(), t.forEach(Fr, l), Hn = null, Nn.call(l));
  }
  function Fr(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Hn.get(l);
      if (a) var e = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Hn.set(l, a);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (a.set(i.dataset.precedence, i), e = i);
        }
        e && a.set(null, e);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = a.get(i) || e, n === e && a.set(null, u), a.set(i, u), this.count++, e = Nn.bind(this), u.addEventListener("load", e), u.addEventListener("error", e), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var gu = {
    $$typeof: X,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function Ir(l, t, a, e, u, n, i, c, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $n(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $n(0), this.hiddenUpdates = $n(null), this.identifierPrefix = e, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function i1(l, t, a, e, u, n, i, c, f, h, p, E) {
    return l = new Ir(
      l,
      t,
      a,
      i,
      f,
      h,
      p,
      E,
      c
    ), t = 1, n === !0 && (t |= 24), n = st(3, null, null, t), l.current = n, n.stateNode = l, t = Hi(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: e,
      isDehydrated: a,
      cache: t
    }, Yi(n), l;
  }
  function c1(l) {
    return l ? (l = ee, l) : ee;
  }
  function f1(l, t, a, e, u, n) {
    u = c1(u), e.context === null ? e.context = u : e.pendingContext = u, e = ca(t), e.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (e.callback = n), a = fa(l, e, t), a !== null && (ut(a, l, t), $e(a, l, t));
  }
  function o1(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function tf(l, t) {
    o1(l, t), (l = l.alternate) && o1(l, t);
  }
  function s1(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ca(l, 67108864);
      t !== null && ut(t, l, 67108864), tf(l, 67108864);
    }
  }
  function d1(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = yt();
      t = kn(t);
      var a = Ca(l, t);
      a !== null && ut(a, l, t), tf(l, t);
    }
  }
  var jn = !0;
  function Pr(l, t, a, e) {
    var u = b.T;
    b.T = null;
    var n = _.p;
    try {
      _.p = 2, af(l, t, a, e);
    } finally {
      _.p = n, b.T = u;
    }
  }
  function lm(l, t, a, e) {
    var u = b.T;
    b.T = null;
    var n = _.p;
    try {
      _.p = 8, af(l, t, a, e);
    } finally {
      _.p = n, b.T = u;
    }
  }
  function af(l, t, a, e) {
    if (jn) {
      var u = ef(e);
      if (u === null)
        Qc(
          l,
          t,
          e,
          qn,
          a
        ), m1(l, e);
      else if (am(
        u,
        l,
        t,
        a,
        e
      ))
        e.stopPropagation();
      else if (m1(l, e), t & 4 && -1 < tm.indexOf(l)) {
        for (; u !== null; ) {
          var n = Ka(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = _a(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - ft(i);
                      c.entanglements[1] |= f, i &= ~f;
                    }
                    Rt(n), (cl & 6) === 0 && (pn = it() + 500, du(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ca(n, 2), c !== null && ut(c, n, 2), Sn(), tf(n, 2);
            }
          if (n = ef(e), n === null && Qc(
            l,
            t,
            e,
            qn,
            a
          ), n === u) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else
        Qc(
          l,
          t,
          e,
          null,
          a
        );
    }
  }
  function ef(l) {
    return l = ni(l), uf(l);
  }
  var qn = null;
  function uf(l) {
    if (qn = null, l = Va(l), l !== null) {
      var t = el(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (l = L(t), l !== null) return l;
          l = null;
        } else if (a === 31) {
          if (l = Sl(t), l !== null) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return qn = l, null;
  }
  function r1(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Z1()) {
          case bf:
            return 2;
          case Sf:
            return 8;
          case Tu:
          case X1:
            return 32;
          case Ef:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var nf = !1, ba = null, Sa = null, Ea = null, pu = /* @__PURE__ */ new Map(), bu = /* @__PURE__ */ new Map(), za = [], tm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function m1(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        ba = null;
        break;
      case "dragenter":
      case "dragleave":
        Sa = null;
        break;
      case "mouseover":
      case "mouseout":
        Ea = null;
        break;
      case "pointerover":
      case "pointerout":
        pu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bu.delete(t.pointerId);
    }
  }
  function Su(l, t, a, e, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: e,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = Ka(t), t !== null && s1(t)), l) : (l.eventSystemFlags |= e, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function am(l, t, a, e, u) {
    switch (t) {
      case "focusin":
        return ba = Su(
          ba,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "dragenter":
        return Sa = Su(
          Sa,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "mouseover":
        return Ea = Su(
          Ea,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return pu.set(
          n,
          Su(
            pu.get(n) || null,
            l,
            t,
            a,
            e,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, bu.set(
          n,
          Su(
            bu.get(n) || null,
            l,
            t,
            a,
            e,
            u
          )
        ), !0;
    }
    return !1;
  }
  function h1(l) {
    var t = Va(l.target);
    if (t !== null) {
      var a = el(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = L(a), t !== null) {
            l.blockedOn = t, Mf(l.priority, function() {
              d1(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = Sl(a), t !== null) {
            l.blockedOn = t, Mf(l.priority, function() {
              d1(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Yn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = ef(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var e = new a.constructor(
          a.type,
          a
        );
        ui = e, a.target.dispatchEvent(e), ui = null;
      } else
        return t = Ka(a), t !== null && s1(t), l.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function y1(l, t, a) {
    Yn(l) && a.delete(t);
  }
  function em() {
    nf = !1, ba !== null && Yn(ba) && (ba = null), Sa !== null && Yn(Sa) && (Sa = null), Ea !== null && Yn(Ea) && (Ea = null), pu.forEach(y1), bu.forEach(y1);
  }
  function Bn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, nf || (nf = !0, g.unstable_scheduleCallback(
      g.unstable_NormalPriority,
      em
    )));
  }
  var Gn = null;
  function v1(l) {
    Gn !== l && (Gn = l, g.unstable_scheduleCallback(
      g.unstable_NormalPriority,
      function() {
        Gn === l && (Gn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t], e = l[t + 1], u = l[t + 2];
          if (typeof e != "function") {
            if (uf(e || a) === null)
              continue;
            break;
          }
          var n = Ka(a);
          n !== null && (l.splice(t, 3), t -= 3, ec(
            n,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: e
            },
            e,
            u
          ));
        }
      }
    ));
  }
  function Me(l) {
    function t(f) {
      return Bn(f, l);
    }
    ba !== null && Bn(ba, l), Sa !== null && Bn(Sa, l), Ea !== null && Bn(Ea, l), pu.forEach(t), bu.forEach(t);
    for (var a = 0; a < za.length; a++) {
      var e = za[a];
      e.blockedOn === l && (e.blockedOn = null);
    }
    for (; 0 < za.length && (a = za[0], a.blockedOn === null); )
      h1(a), a.blockedOn === null && za.shift();
    if (a = (l.ownerDocument || l).$$reactFormReplay, a != null)
      for (e = 0; e < a.length; e += 3) {
        var u = a[e], n = a[e + 1], i = u[Il] || null;
        if (typeof n == "function")
          i || v1(a);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[Il] || null)
              c = i.formAction;
            else if (uf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? a[e + 1] = c : (a.splice(e, 3), e -= 3), v1(a);
        }
      }
  }
  function g1() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(i) {
            return u = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), e || setTimeout(a, 20);
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var e = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        e = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function cf(l) {
    this._internalRoot = l;
  }
  Zn.prototype.render = cf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(r(409));
    var a = t.current, e = yt();
    f1(a, e, l, t, null, null);
  }, Zn.prototype.unmount = cf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      f1(l.current, 2, null, l, null, null), Sn(), t[wa] = null;
    }
  };
  function Zn(l) {
    this._internalRoot = l;
  }
  Zn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = _f();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < za.length && t !== 0 && t < za[a].priority; a++) ;
      za.splice(a, 0, l), a === 0 && h1(l);
    }
  };
  var p1 = O.version;
  if (p1 !== "19.2.0")
    throw Error(
      r(
        527,
        p1,
        "19.2.0"
      )
    );
  _.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(r(188)) : (l = Object.keys(l).join(","), Error(r(268, l)));
    return l = A(t), l = l !== null ? w(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var um = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: b,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        De = Xn.inject(
          um
        ), ct = Xn;
      } catch {
      }
  }
  return zu.createRoot = function(l, t) {
    if (!$(l)) throw Error(r(299));
    var a = !1, e = "", u = x0, n = _0, i = M0;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (e = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = i1(
      l,
      1,
      !1,
      null,
      null,
      a,
      e,
      null,
      u,
      n,
      i,
      g1
    ), l[wa] = t.current, Xc(l), new cf(t);
  }, zu.hydrateRoot = function(l, t, a) {
    if (!$(l)) throw Error(r(299));
    var e = !1, u = "", n = x0, i = _0, c = M0, f = null;
    return a != null && (a.unstable_strictMode === !0 && (e = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (i = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.formState !== void 0 && (f = a.formState)), t = i1(
      l,
      1,
      !0,
      t,
      a ?? null,
      e,
      u,
      f,
      n,
      i,
      c,
      g1
    ), t.context = c1(null), a = t.current, e = yt(), e = kn(e), u = ca(e), u.callback = null, fa(a, u, e), a = e, t.current.lanes = a, Ce(t, a), Rt(t), l[wa] = t.current, Xc(l), new Zn(t);
  }, zu.version = "19.2.0", zu;
}
var O1;
function vm() {
  if (O1) return of.exports;
  O1 = 1;
  function g() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (O) {
        console.error(O);
      }
  }
  return g(), of.exports = ym(), of.exports;
}
var gm = vm();
const N1 = {
  "👏": "clap",
  "💗": "heart",
  "🔥": "fire",
  "🙌": "celebrate",
  "🏐": "volleyball",
  "💪": "strong"
}, pm = Object.fromEntries(
  Object.entries(N1).map(([g, O]) => [O, g])
), D1 = ["lavender", "blue", "green", "gold"], yf = (g) => g !== null && typeof g == "object" && !Array.isArray(g) ? g : {}, vt = (g) => typeof g == "string" ? g : "", bm = (g) => {
  const O = yf(g);
  return yf(O.data);
}, Sm = (g) => {
  const O = vt(g);
  return O === "host" || O === "moderator" ? "Coach" : O === "teammate" ? "Teammate" : "Fan";
}, Em = (g) => {
  const O = Array.from(g).reduce(
    (T, r) => T + r.charCodeAt(0),
    0
  ) % D1.length;
  return D1[O] ?? "lavender";
}, zm = (g) => g.trim().split(/\s+/).slice(0, 2).map((O) => O.charAt(0).toUpperCase()).join("") || "FV", H1 = (g) => {
  const O = yf(g), T = vt(O.type);
  if (T !== "text" && T !== "cheer") return null;
  const r = vt(O.id), $ = vt(O.display_name) || "Fan", el = vt(O.body), L = T === "cheer" ? `Cheered ${pm[el] ?? "👏"}` : el;
  return !r || !L ? null : {
    id: r,
    author: $,
    initials: zm($),
    role: Sm(O.role),
    body: L,
    avatarTone: Em($),
    reactions: [],
    moderated: vt(O.moderation_status) !== "visible",
    own: O.is_own === !0
  };
}, Am = (g) => Array.isArray(g) ? g.map(H1).filter((O) => O !== null) : [], hf = (g) => ({
  connection: g.connection,
  participantCount: g.participantCount,
  // Public FanView rooms use the lightweight cheers mode for both curated
  // reactions and short friendly messages. Verified text remains reserved for
  // future private team/coach communities with a separate admission flow.
  canWriteText: g.status === "open" && (g.mode === "cheers" || g.mode === "verified_text"),
  messages: g.messages
});
class Tm extends Error {
  constructor(T, r) {
    super(T);
    Ta(this, "code");
    Ta(this, "retryable");
    Ta(this, "status");
    this.name = "FanViewCommunityGatewayError", this.code = r.code ?? "community_unavailable", this.retryable = r.retryable ?? !1, this.status = r.status;
  }
}
function xm(g) {
  var il;
  const O = g.fetch ?? globalThis.fetch.bind(globalThis), T = ((il = g.displayName) == null ? void 0 : il.trim().replace(/\s+/g, " ").slice(0, 24)) || "Fan", r = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map(), el = (q) => {
    for (const U of $.get(q.shareId) ?? [])
      U(hf(q));
  }, L = async () => {
    const q = await g.client.auth.getSession();
    if (q.error) throw new Error(q.error.message);
    if (q.data.session) return q.data.session;
    const U = await g.client.auth.signInAnonymously();
    if (U.error) throw new Error(U.error.message);
    if (!U.data.session)
      throw new Error("FanView Community could not establish a session.");
    return U.data.session;
  }, Sl = async (q, U, V, ol) => {
    var Ul, El, _l;
    const sl = {
      apikey: g.publishableKey,
      Authorization: `Bearer ${q.access_token}`,
      "Content-Type": "application/json"
    };
    ol && (sl["Idempotency-Key"] = ol);
    const xl = await O(g.gatewayUrl, {
      method: "POST",
      headers: sl,
      body: JSON.stringify({ operation: U, input: V })
    }), X = await xl.json().catch(() => ({}));
    if (!xl.ok)
      throw new Tm(
        ((Ul = X.error) == null ? void 0 : Ul.message) || "FanView Community is unavailable.",
        {
          code: (El = X.error) == null ? void 0 : El.code,
          retryable: (_l = X.error) == null ? void 0 : _l.retryable,
          status: xl.status
        }
      );
    return bm(X);
  }, D = async (q, U) => {
    const V = await Sl(q, "list_messages", {
      roomId: U.roomId
    });
    U.mode = vt(V.mode) || U.mode, U.status = vt(V.status) || U.status, U.inaccessibleAt = vt(V.inaccessible_at) || null, U.messages = Am(V.messages), U.connection = U.status === "closed" ? "closed" : "connected";
  }, A = async (q) => {
    const U = await L(), V = await Sl(U, "join_room", {
      shareId: q,
      displayName: T,
      adultAttested: !1
    }), ol = vt(V.room_id);
    if (!ol) throw new Error("FanView Community returned no room.");
    return {
      shareId: q,
      roomId: ol,
      userId: U.user.id,
      mode: vt(V.mode),
      status: vt(V.status),
      inaccessibleAt: null,
      participantCount: 0,
      messages: [],
      channel: null,
      connection: "connecting"
    };
  }, w = (q) => {
    const U = r.get(q);
    if (U) return U;
    const V = A(q).catch((ol) => {
      throw r.delete(q), ol;
    });
    return r.set(q, V), V;
  }, j = async (q) => {
    const U = await L();
    await D(U, q), el(q);
  };
  return {
    async loadRoom(q, U) {
      if (U.aborted) throw new DOMException("Aborted", "AbortError");
      const V = await w(q);
      if (U.aborted) throw new DOMException("Aborted", "AbortError");
      return hf(V);
    },
    subscribe(q, U, V) {
      const ol = $.get(q) ?? /* @__PURE__ */ new Set();
      ol.add(U), $.set(q, ol);
      let sl = !0, xl = null;
      return w(q).then(async (X) => {
        if (!sl || (U(hf(X)), X.channel)) return;
        const Ul = await L();
        await g.client.realtime.setAuth(Ul.access_token);
        const El = g.client.channel(
          `fanview-community:${X.roomId}`,
          {
            config: {
              private: !0,
              presence: { key: X.userId }
            }
          }
        );
        X.channel = El, xl = El;
        const _l = () => {
          sl && j(X).catch(V);
        }, k = () => {
          const Ml = El.presenceState();
          X.participantCount = Math.max(
            1,
            Object.values(Ml).reduce(
              (Fl, Ut) => Fl + Ut.length,
              0
            )
          ), el(X);
        };
        El.on("broadcast", { event: "message.created" }, _l).on("broadcast", { event: "message.updated" }, _l).on("broadcast", { event: "room.updated" }, _l).on("presence", { event: "sync" }, k).subscribe((Ml) => {
          if (sl) {
            if (Ml === "SUBSCRIBED") {
              X.connection = "connected", X.participantCount = Math.max(
                1,
                X.participantCount
              ), el(X), El.track({
                online_at: (/* @__PURE__ */ new Date()).toISOString()
              }), j(X).catch(V);
              return;
            }
            Ml === "CLOSED" ? X.connection = "closed" : (Ml === "CHANNEL_ERROR" || Ml === "TIMED_OUT") && (X.connection = "reconnecting"), el(X);
          }
        });
      }).catch((X) => {
        sl && V(X);
      }), () => {
        sl = !1, ol.delete(U), ol.size === 0 && $.delete(q), xl && (g.client.removeChannel(xl), w(q).then((X) => {
          X.channel === xl && (X.channel = null);
        }));
      };
    },
    async sendCheer(q, U) {
      const V = await w(q), ol = await L();
      await Sl(
        ol,
        "send_message",
        {
          roomId: V.roomId,
          messageType: "cheer",
          body: N1[U]
        },
        crypto.randomUUID()
      );
    },
    async sendMessage(q, U) {
      const V = await w(q), ol = await L(), sl = await Sl(
        ol,
        "send_message",
        {
          roomId: V.roomId,
          messageType: "text",
          body: U
        },
        crypto.randomUUID()
      ), xl = H1({
        ...sl,
        type: "text",
        display_name: vt(sl.display_name) || T,
        role: "participant",
        moderation_status: "visible",
        is_own: !0
      });
      if (!xl) throw new Error("FanView Community returned no message.");
      return xl;
    }
  };
}
const _m = [
  {
    id: "maya",
    author: "Maya’s Mom",
    initials: "MM",
    role: "Family",
    body: "Let’s go 14s Blue! Great energy to start this set 💗",
    avatarTone: "lavender",
    reactions: [
      { emoji: "👏", count: 6 },
      { emoji: "💗", count: 12 },
      { emoji: "🔥", count: 5 }
    ]
  },
  {
    id: "coach-t",
    author: "Coach T",
    initials: "CT",
    role: "Coach",
    body: "Love the communication after that long rally. Keep talking!",
    avatarTone: "blue",
    reactions: [
      { emoji: "👏", count: 4 },
      { emoji: "💗", count: 7 },
      { emoji: "🔥", count: 3 }
    ]
  },
  {
    id: "uncle-jay",
    author: "Uncle Jay",
    initials: "UJ",
    role: "Family",
    body: "Watching from Ohio — that block was huge! 🔥",
    avatarTone: "green",
    reactions: [
      { emoji: "👏", count: 3 },
      { emoji: "💗", count: 6 },
      { emoji: "🔥", count: 9 }
    ]
  },
  {
    id: "liv",
    author: "Liv",
    initials: "L",
    role: "Teammate",
    body: "ACE!! 🏐",
    avatarTone: "gold",
    reactions: [
      { emoji: "👏", count: 10 },
      { emoji: "💗", count: 8 },
      { emoji: "🔥", count: 4 }
    ]
  }
];
function Mm() {
  const g = [..._m];
  return {
    async loadRoom(O, T) {
      if (T.aborted) throw new DOMException("Aborted", "AbortError");
      return {
        connection: "connected",
        participantCount: 18,
        canWriteText: !0,
        messages: [...g]
      };
    },
    async sendCheer(O, T) {
      return Promise.resolve();
    },
    async sendMessage(O, T) {
      const r = T.trim().replace(/\s+/g, " ").slice(0, 240);
      if (!r) throw new Error("Message is empty.");
      const $ = {
        id: `fixture-${g.length + 1}`,
        author: "You",
        initials: "Y",
        role: "Family",
        body: r,
        avatarTone: "lavender",
        reactions: [],
        own: !0
      };
      return g.push($), $;
    }
  };
}
const Om = Mm();
var x = vf();
class Dm extends x.Component {
  constructor() {
    super(...arguments);
    Ta(this, "state", { failed: !1 });
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  componentDidCatch(T, r) {
    console.warn("[FanView SPA] Community isolated after a render failure.", {
      error: T,
      componentStack: r.componentStack
    });
  }
  render() {
    return this.state.failed ? /* @__PURE__ */ R.jsx(
      "aside",
      {
        "aria-label": "Live community unavailable",
        className: "community-panel community-panel--failed",
        "data-testid": "community-error-boundary",
        children: /* @__PURE__ */ R.jsxs("div", { className: "community-failure-copy", role: "status", children: [
          /* @__PURE__ */ R.jsx("strong", { children: "Cheering is temporarily unavailable." }),
          /* @__PURE__ */ R.jsx("span", { children: "The live match, score, and viewer experience are still running." })
        ] })
      }
    ) : this.props.children;
  }
}
const Um = x.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), Qn = x.forwardRef(
  (g, O) => {
    const {
      alt: T,
      color: r,
      size: $,
      weight: el,
      mirrored: L,
      children: Sl,
      weights: D,
      ...A
    } = g, {
      color: w = "currentColor",
      size: j,
      weight: il = "regular",
      mirrored: q = !1,
      ...U
    } = x.useContext(Um);
    return /* @__PURE__ */ x.createElement(
      "svg",
      {
        ref: O,
        xmlns: "http://www.w3.org/2000/svg",
        width: $ ?? j,
        height: $ ?? j,
        fill: r ?? w,
        viewBox: "0 0 256 256",
        transform: L || q ? "scale(-1, 1)" : void 0,
        ...U,
        ...A
      },
      !!T && /* @__PURE__ */ x.createElement("title", null, T),
      Sl,
      D.get(el ?? il)
    );
  }
);
Qn.displayName = "IconBase";
const Cm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(
      "path",
      {
        d: "M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ x.createElement("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42ZM128,217.11C111.59,207.64,30,157.72,30,102A48.05,48.05,0,0,1,78,54c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,64.83,157.72,54,178,54a48.05,48.05,0,0,1,48,48C226,157.72,144.41,207.64,128,217.11Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M178,44c-21.44,0-39.92,10.19-50,27.07C117.92,54.19,99.44,44,78,44a58.07,58.07,0,0,0-58,58c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,160.47,236,130.59,236,102A58.07,58.07,0,0,0,178,44ZM128,219.42c-14-8-100-59.35-100-117.42A50.06,50.06,0,0,1,78,52c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,63.31,156.89,52,178,52a50.06,50.06,0,0,1,50,50C228,160,142,211.46,128,219.42Z" }))
  ]
]), R1 = x.forwardRef((g, O) => /* @__PURE__ */ x.createElement(Qn, { ref: O, ...g, weights: Cm }));
R1.displayName = "HeartIcon";
const U1 = R1, Nm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(
      "path",
      {
        d: "M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L108,148,20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ x.createElement("path", { d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.85l85.56,41.64L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a2,2,0,0,1-3.76.26l-40.68-83.58,49-49a6,6,0,1,0-8.49-8.49l-49,49L23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M224.47,31.52a11.87,11.87,0,0,0-11.82-3L20.74,86.67a12,12,0,0,0-1.91,22.38L105,151l41.92,86.15A11.88,11.88,0,0,0,157.74,244c.34,0,.69,0,1,0a11.89,11.89,0,0,0,10.52-8.63l58.21-192,0-.08A11.85,11.85,0,0,0,224.47,31.52Zm-4.62,9.54-58.23,192a4,4,0,0,1-7.48.59l-41.3-84.86,50-50a4,4,0,1,0-5.66-5.66l-50,50-84.9-41.31a3.88,3.88,0,0,1-2.27-4,3.93,3.93,0,0,1,3-3.54L214.9,36.16A3.93,3.93,0,0,1,216,36a4,4,0,0,1,2.79,1.19A3.93,3.93,0,0,1,219.85,41.06Z" }))
  ]
]), j1 = x.forwardRef((g, O) => /* @__PURE__ */ x.createElement(Qn, { ref: O, ...g, weights: Nm }));
j1.displayName = "PaperPlaneTiltIcon";
const Hm = j1, Rm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ x.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))
  ]
]), q1 = x.forwardRef((g, O) => /* @__PURE__ */ x.createElement(Qn, { ref: O, ...g, weights: Rm }));
q1.displayName = "XIcon";
const jm = q1, qm = ["👏", "💗", "🔥", "🙌", "🏐", "💪"], C1 = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: !1,
  messages: []
};
function Ym({
  adapter: g,
  hideWhenUnavailable: O = !1,
  matchComplete: T,
  shareId: r,
  startOpen: $ = !0,
  teamName: el
}) {
  const [L, Sl] = x.useState($), [D, A] = x.useState(C1), [w, j] = x.useState(""), [il, q] = x.useState(""), [U, V] = x.useState(!1), [ol, sl] = x.useState(!1), xl = x.useRef(null), X = x.useRef(null), Ul = x.useRef(null);
  x.useEffect(() => {
    const Y = new AbortController();
    let gl = () => {
    };
    return A(C1), V(!1), g.loadRoom(r, Y.signal).then((Jl) => {
      Y.signal.aborted || A(Jl);
    }).catch(() => {
      Y.signal.aborted || V(!0);
    }), g.subscribe && (gl = g.subscribe(
      r,
      A,
      () => V(!0)
    )), () => {
      Y.abort(), gl();
    };
  }, [g, r]), x.useEffect(() => {
    var Y, gl;
    L ? (Y = X.current) == null || Y.focus({ preventScroll: !0 }) : (gl = xl.current) == null || gl.focus({ preventScroll: !0 });
  }, [L]), x.useEffect(() => {
    if (!L) return;
    const Y = (gl) => {
      gl.key === "Escape" && (gl.preventDefault(), El());
    };
    return document.addEventListener("keydown", Y), () => document.removeEventListener("keydown", Y);
  }, [L]);
  function El() {
    Sl(!1), q("");
  }
  function _l(Y) {
    if (Y.key === "Escape") {
      Y.preventDefault(), El();
      return;
    }
    if (Y.key !== "Tab") return;
    const gl = Array.from(
      Y.currentTarget.querySelectorAll(
        "button:not([disabled]), input:not([disabled])"
      )
    );
    if (!gl.length) return;
    const Jl = gl[0], Xl = gl[gl.length - 1];
    Y.shiftKey && document.activeElement === Jl ? (Y.preventDefault(), Xl.focus()) : !Y.shiftKey && document.activeElement === Xl && (Y.preventDefault(), Jl.focus());
  }
  function k(Y) {
    Ul.current = Y.clientY, Y.currentTarget.setPointerCapture(Y.pointerId);
  }
  function Ml(Y) {
    const gl = Ul.current;
    Ul.current = null, gl !== null && Y.clientY - gl > 64 && El();
  }
  async function Fl(Y) {
    if (!(U || T))
      try {
        await g.sendCheer(r, Y), q(`${Y} sent to everyone cheering`);
      } catch {
        q("That cheer did not send. The live match is unaffected.");
      }
  }
  async function Ut(Y) {
    Y.preventDefault();
    const gl = w.trim().replace(/\s+/g, " ").slice(0, 240);
    if (!(!gl || U || T || !D.canWriteText || ol)) {
      sl(!0);
      try {
        const Jl = await g.sendMessage(r, gl);
        A((Xl) => ({
          ...Xl,
          messages: [...Xl.messages, Jl]
        })), j(""), q("Cheer sent.");
      } catch {
        q("Your message did not send. The live match is unaffected.");
      } finally {
        sl(!1);
      }
    }
  }
  const nt = U || T || !D.canWriteText || D.connection === "closed";
  return U && O ? null : /* @__PURE__ */ R.jsxs(R.Fragment, { children: [
    L ? null : /* @__PURE__ */ R.jsxs(
      "button",
      {
        "aria-expanded": "false",
        className: "community-launcher",
        onClick: () => Sl(!0),
        ref: xl,
        type: "button",
        children: [
          /* @__PURE__ */ R.jsx(U1, { "aria-hidden": "true", size: 20, weight: "fill" }),
          "Cheer together",
          /* @__PURE__ */ R.jsx("span", { children: D.participantCount })
        ]
      }
    ),
    /* @__PURE__ */ R.jsx(
      "button",
      {
        "aria-hidden": !L,
        "aria-label": "Close Cheering Section",
        className: "community-scrim",
        "data-open": L,
        disabled: !L,
        hidden: !L,
        onClick: El,
        tabIndex: L ? 0 : -1,
        type: "button"
      }
    ),
    /* @__PURE__ */ R.jsxs(
      "aside",
      {
        "aria-hidden": !L,
        "aria-label": `${el} Cheering Section`,
        "aria-modal": "true",
        className: "community-panel",
        "data-open": L,
        hidden: !L,
        inert: !L,
        onKeyDown: _l,
        ref: X,
        role: "dialog",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ R.jsx(
            "div",
            {
              "aria-label": "Drag down to close Cheering Section",
              className: "community-handle",
              onPointerDown: k,
              onPointerUp: Ml,
              role: "button",
              tabIndex: -1
            }
          ),
          /* @__PURE__ */ R.jsxs("header", { className: "community-header", children: [
            /* @__PURE__ */ R.jsxs("div", { className: "community-header__copy", children: [
              /* @__PURE__ */ R.jsx("div", { className: "community-eyebrow", children: "LIVE COMMUNITY" }),
              /* @__PURE__ */ R.jsxs("h1", { title: `${el} Cheering Section`, children: [
                el,
                " Cheering Section"
              ] }),
              /* @__PURE__ */ R.jsxs("p", { children: [
                /* @__PURE__ */ R.jsx("span", { className: "presence-dot", "aria-hidden": "true" }),
                D.participantCount,
                " cheering together"
              ] })
            ] }),
            /* @__PURE__ */ R.jsx(
              "button",
              {
                "aria-label": "Close Cheering Section",
                className: "icon-button",
                onClick: El,
                type: "button",
                children: /* @__PURE__ */ R.jsx(jm, { "aria-hidden": "true", size: 22, weight: "bold" })
              }
            )
          ] }),
          /* @__PURE__ */ R.jsxs("div", { className: "safety-notice", children: [
            /* @__PURE__ */ R.jsx(U1, { "aria-hidden": "true", size: 23, weight: "regular" }),
            /* @__PURE__ */ R.jsx("span", { children: "Cheer kindly. No player criticism or personal information." })
          ] }),
          /* @__PURE__ */ R.jsxs(
            "section",
            {
              "aria-label": "Live match chat",
              "aria-live": "polite",
              className: "community-feed",
              role: "log",
              children: [
                /* @__PURE__ */ R.jsx("h2", { children: "LIVE MATCH CHAT" }),
                D.connection === "connecting" && !U ? /* @__PURE__ */ R.jsxs("div", { "aria-label": "Loading community", className: "message-skeletons", children: [
                  /* @__PURE__ */ R.jsx("span", {}),
                  /* @__PURE__ */ R.jsx("span", {}),
                  /* @__PURE__ */ R.jsx("span", {})
                ] }) : null,
                U ? /* @__PURE__ */ R.jsxs("div", { className: "community-inline-status", role: "status", children: [
                  /* @__PURE__ */ R.jsx("strong", { children: "Cheering is temporarily unavailable." }),
                  /* @__PURE__ */ R.jsx("span", { children: "Video and live scoring will continue normally." })
                ] }) : null,
                !U && D.connection === "reconnecting" ? /* @__PURE__ */ R.jsx("div", { className: "community-inline-status", role: "status", children: "Reconnecting the Cheering Section…" }) : null,
                !U && D.messages.length === 0 && D.connection !== "connecting" ? /* @__PURE__ */ R.jsx("div", { className: "community-inline-status", children: "Be the first to send a positive cheer for the team." }) : null,
                U ? null : D.messages.map((Y) => /* @__PURE__ */ R.jsx(Bm, { message: Y }, Y.id))
              ]
            }
          ),
          /* @__PURE__ */ R.jsxs("form", { className: "community-composer", onSubmit: Ut, children: [
            /* @__PURE__ */ R.jsx("div", { "aria-label": "Quick cheers", className: "quick-cheers", children: qm.map((Y) => /* @__PURE__ */ R.jsx(
              "button",
              {
                "aria-label": `Send ${Y} cheer`,
                disabled: U || T,
                onClick: () => void Fl(Y),
                type: "button",
                children: /* @__PURE__ */ R.jsx("span", { "aria-hidden": "true", children: Y })
              },
              Y
            )) }),
            /* @__PURE__ */ R.jsxs("div", { className: "composer-row", children: [
              /* @__PURE__ */ R.jsx(
                "input",
                {
                  "aria-label": "Add a positive cheer",
                  disabled: nt,
                  maxLength: 240,
                  onChange: (Y) => j(Y.target.value),
                  placeholder: T ? "Chat closed after the match" : "Add a positive cheer…",
                  value: w
                }
              ),
              /* @__PURE__ */ R.jsx(
                "button",
                {
                  "aria-label": "Send cheer",
                  className: "send-button",
                  disabled: nt || ol || w.trim().length === 0,
                  type: "submit",
                  children: /* @__PURE__ */ R.jsx(Hm, { "aria-hidden": "true", size: 21, weight: "fill" })
                }
              )
            ] }),
            /* @__PURE__ */ R.jsxs("div", { className: "composer-meta", children: [
              /* @__PURE__ */ R.jsx("span", { className: "sr-only", "aria-live": "polite", children: il }),
              /* @__PURE__ */ R.jsxs("span", { "aria-hidden": "true", children: [
                w.length,
                " / 240"
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function Bm({ message: g }) {
  return /* @__PURE__ */ R.jsxs("article", { className: "community-message", "data-own": g.own ?? !1, children: [
    /* @__PURE__ */ R.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "community-avatar",
        "data-tone": g.avatarTone,
        children: g.initials
      }
    ),
    /* @__PURE__ */ R.jsxs("div", { className: "community-message__content", children: [
      /* @__PURE__ */ R.jsxs("div", { className: "community-message__header", children: [
        /* @__PURE__ */ R.jsx("strong", { children: g.author }),
        /* @__PURE__ */ R.jsx("span", { "data-role": g.role, children: g.role })
      ] }),
      /* @__PURE__ */ R.jsx("p", { children: g.moderated ? "Message removed to keep chat safe." : g.body }),
      /* @__PURE__ */ R.jsx("div", { className: "reaction-row", children: g.reactions.map((O) => /* @__PURE__ */ R.jsxs(
        "button",
        {
          "aria-label": `${O.count} ${O.emoji} reactions`,
          type: "button",
          children: [
            /* @__PURE__ */ R.jsx("span", { "aria-hidden": "true", children: O.emoji }),
            O.count
          ]
        },
        O.emoji
      )) })
    ] })
  ] });
}
const Gm = ':root{color:#111827;background:#050a13;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-synthesis:none;text-rendering:optimizeLegibility;--fanview-navy-950: #111827;--fanview-pink-500: #f22b78;--fanview-pink-700: #ce155f;--fanview-paper: #fffdfb;--fanview-blush: #fff2f7;--fanview-muted: #697386;--fanview-live-red: #e53935;--fanview-live-green: #39d98a;--fanview-line: rgba(15, 23, 42, .1)}*{box-sizing:border-box}html,body,#root{width:100%;min-width:320px;min-height:100%;margin:0}body{min-height:100dvh;overflow:hidden;-webkit-font-smoothing:antialiased}button,input{font:inherit}button{-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible,[role=button]:focus-visible{outline:3px solid rgba(242,43,120,.35);outline-offset:2px}.fanview-app,.match-stage{position:relative;width:100vw;height:100dvh;min-height:460px;overflow:hidden;background:#050a13}.match-stage__media{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center}.match-stage__shade{position:absolute;top:0;right:0;bottom:0;left:0;background:#02060c2e;pointer-events:none}.match-stage__empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;background:#0d131d}.court-outline{position:relative;width:min(760px,82vw);aspect-ratio:2.25 / 1;border:2px solid rgba(255,255,255,.12);transform:perspective(480px) rotateX(58deg)}.court-outline__net{position:absolute;top:50%;right:-4%;left:-4%;border-top:2px solid rgba(255,255,255,.18)}.live-pill,.viewer-pill{position:absolute;z-index:3;top:max(28px,env(safe-area-inset-top));display:inline-flex;min-height:38px;align-items:center;justify-content:center;border-radius:8px;color:#fff;box-shadow:0 8px 22px #00000040;font-size:15px;font-weight:900}.live-pill{left:max(28px,env(safe-area-inset-left));gap:8px;padding:0 14px;background:var(--fanview-live-red)}.live-pill__dot{width:9px;height:9px;border-radius:999px;background:#fff}.viewer-pill{right:max(28px,env(safe-area-inset-right));gap:8px;min-width:74px;border:1px solid rgba(255,255,255,.55);padding:0 12px;background:#03080fb8;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-community-enabled=true] .viewer-pill{right:418px}.score-bug{position:absolute;z-index:3;bottom:36px;left:28px;width:min(276px,calc(100vw - 470px));min-width:246px;overflow:hidden;border-radius:12px;padding:13px;color:#fff;background:#071222f5;box-shadow:0 16px 38px #00000059}.score-bug__set{height:26px;padding-left:2px;font-size:12px;font-weight:900;letter-spacing:.09em}.score-bug__row{display:grid;min-height:47px;grid-template-columns:0 minmax(0,1fr) 52px;margin-top:7px;overflow:hidden;border-radius:4px}.score-bug__color{width:0}.score-bug__team{overflow:hidden;display:flex;align-items:center;padding:0 12px;font-size:18px;font-weight:900;letter-spacing:-.015em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__score{display:grid;place-items:center;border:1px solid rgba(255,255,255,.28);border-left:0;background:#101b2b;font-size:23px;font-weight:900}.match-status{position:absolute;z-index:4;top:78px;left:50%;border-radius:999px;padding:8px 12px;color:#fff;background:#111827e6;font-size:12px;font-weight:750;transform:translate(-50%)}.community-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;display:none;border:0;background:transparent}.community-panel{position:fixed;z-index:10;top:14px;right:14px;bottom:14px;display:grid;width:min(390px,calc(100vw - 28px));grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.8);border-radius:26px;color:var(--fanview-navy-950);background:var(--fanview-paper);box-shadow:0 28px 70px #00000047;transform:translate(calc(100% + 32px));transition:transform .18s ease}.community-panel[data-open=true]{transform:translate(0)}.community-scrim[hidden],.community-panel[hidden]{display:none!important}.community-panel:focus{outline:none}.community-handle{display:none}.community-header{display:grid;min-width:0;grid-template-columns:minmax(0,1fr) 42px;align-items:center;gap:12px;padding:26px 22px 12px}.community-header__copy{min-width:0}.community-eyebrow{margin-bottom:6px;color:var(--fanview-pink-500);font-size:11px;font-weight:900;letter-spacing:.04em}.community-header h1{overflow:hidden;margin:0;font-size:clamp(20px,1.65vw,23px);font-weight:900;letter-spacing:-.035em;line-height:1.12;text-overflow:ellipsis;white-space:nowrap}.community-header p{display:flex;align-items:center;gap:8px;margin:7px 0 0;color:var(--fanview-muted);font-size:13px;font-weight:650}.presence-dot{width:9px;height:9px;border-radius:999px;background:#42a767}.icon-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;color:var(--fanview-navy-950);background:#fff;cursor:pointer}.safety-notice{display:flex;min-height:39px;align-items:center;gap:9px;margin:0 20px;border:1px solid rgba(242,43,120,.18);border-radius:7px;padding:8px 10px;color:#3f3542;background:var(--fanview-blush);font-size:10px;font-weight:650;line-height:1.25}.safety-notice svg{flex:0 0 auto;color:var(--fanview-pink-500)}.community-feed{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:19px 20px 16px;scrollbar-width:thin}.community-feed h2{margin:0 0 19px;color:#7b7e89;font-size:11px;font-weight:750;letter-spacing:.055em}.community-message{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;margin-bottom:16px}.community-avatar{display:grid;width:42px;height:42px;place-items:center;border-radius:999px;color:#292543;font-size:15px;font-weight:650}.community-avatar[data-tone=lavender]{background:#eee8ff}.community-avatar[data-tone=blue]{background:#dfebff}.community-avatar[data-tone=green]{background:#dff3e5}.community-avatar[data-tone=gold]{background:#ffe6a1}.community-message__content{min-width:0}.community-message__header{display:flex;min-width:0;align-items:center;gap:7px;min-height:22px}.community-message__header strong{overflow:hidden;font-size:14px;font-weight:850;text-overflow:ellipsis;white-space:nowrap}.community-message__header span{flex:0 0 auto;border-radius:999px;padding:3px 7px;color:#644cdb;background:#efebff;font-size:10px;font-weight:650}.community-message__header span[data-role=Coach]{color:#2765cf;background:#e3edff}.community-message__header span[data-role=Teammate]{color:#af6d00;background:#fff0c8}.community-message p{margin:2px 0 0;color:#242834;font-size:14px;font-weight:600;line-height:1.36;overflow-wrap:anywhere}.community-message[data-own=true] p{border-radius:12px;padding:8px 10px;color:#fff;background:var(--fanview-navy-950)}.reaction-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.reaction-row button{display:inline-flex;min-width:45px;min-height:27px;align-items:center;justify-content:center;gap:5px;border:1px solid var(--fanview-line);border-radius:999px;padding:3px 8px;color:#5f6370;background:#fff;font-size:11px;cursor:pointer}.community-composer{display:grid;gap:10px;border-top:1px solid var(--fanview-line);padding:12px 16px max(13px,env(safe-area-inset-bottom));background:#fffdfbfa}.quick-cheers{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.quick-cheers button{display:grid;min-width:44px;height:44px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;background:#fff;font-size:20px;cursor:pointer}.quick-cheers button:hover:not(:disabled){border-color:#f22b7861;background:#fff7fa}.composer-row{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:10px}.composer-row input{min-width:0;height:46px;border:1px solid rgba(15,23,42,.14);border-radius:999px;padding:0 17px;color:var(--fanview-navy-950);background:#fff;font-size:13px;font-weight:600}.composer-row input::placeholder{color:#9da2ae}.send-button{display:grid;width:46px;height:46px;place-items:center;border:0;border-radius:999px;color:#fff;background:var(--fanview-pink-500);cursor:pointer}.send-button:disabled,.quick-cheers button:disabled{cursor:not-allowed;opacity:.48}.composer-meta{display:flex;min-height:10px;justify-content:flex-end;color:#8f95a2;font-size:10px;font-weight:600}.message-skeletons{display:grid;gap:14px}.message-skeletons span{display:block;width:100%;height:48px;border-radius:12px;background:#f0f1f4}.community-inline-status,.community-failure-copy{display:grid;gap:6px;border:1px solid var(--fanview-line);border-radius:13px;padding:14px;color:var(--fanview-muted);background:#f8f8f9;font-size:12px;line-height:1.4}.community-inline-status strong,.community-failure-copy strong{color:var(--fanview-navy-950);font-size:14px}.community-panel--failed{place-items:center;padding:24px;transform:none}.community-launcher{position:fixed;z-index:12;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:inline-flex;min-height:50px;align-items:center;gap:9px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:0 16px;color:#fff;background:var(--fanview-pink-500);box-shadow:0 14px 34px #1118274d;font-size:13px;font-weight:850;cursor:pointer}.community-launcher span{display:grid;min-width:22px;height:22px;place-items:center;border-radius:999px;padding:0 5px;background:#11182738;font-size:10px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}@media(max-width:720px){.fanview-app,.match-stage{min-height:560px}.match-stage__media{height:42dvh;min-height:240px;object-position:51% center}.match-stage__shade{bottom:auto;height:42dvh;min-height:240px}.live-pill,.viewer-pill{top:max(13px,env(safe-area-inset-top));min-height:29px;border-radius:6px;font-size:11px}.live-pill{left:max(13px,env(safe-area-inset-left));gap:6px;padding:0 10px}.live-pill__dot{width:7px;height:7px}.viewer-pill,.fanview-app[data-community-enabled=true] .viewer-pill{right:max(13px,env(safe-area-inset-right));gap:6px;min-width:58px;padding:0 8px}.viewer-pill svg{width:15px;height:15px}.score-bug{display:none}.community-scrim{display:block;opacity:0;pointer-events:none;background:#02070e6b;transition:opacity .18s ease}.community-scrim[data-open=true]{opacity:1;pointer-events:auto}.community-panel,.community-panel--failed{top:auto;right:0;bottom:0;left:0;width:100%;height:min(72dvh,680px);border-right:0;border-bottom:0;border-left:0;border-radius:24px 24px 0 0;transform:translateY(calc(100% + 24px))}.community-panel[data-open=true],.community-panel--failed{transform:translateY(0)}.community-handle{position:absolute;z-index:2;top:7px;left:50%;display:block;width:72px;height:18px;cursor:grab;transform:translate(-50%);touch-action:none}.community-handle:after{position:absolute;top:0;left:16px;width:40px;height:4px;border-radius:999px;background:#1118272e;content:""}.community-header{gap:7px;padding:26px 14px 10px}.community-header h1{font-size:18px}.safety-notice{margin:0 15px}.community-feed{padding:16px 16px 10px}.community-message{grid-template-columns:34px minmax(0,1fr);gap:10px;margin-bottom:14px}.community-avatar{width:34px;height:34px;font-size:12px}.community-message__header strong{font-size:12px}.community-message p{font-size:12px;line-height:1.32}.reaction-row{gap:6px;margin-top:6px}.reaction-row button{min-width:40px;min-height:24px;font-size:10px}.community-composer{gap:9px;padding:10px 13px max(10px,env(safe-area-inset-bottom))}.quick-cheers{gap:7px}.quick-cheers button{min-width:44px;height:44px;font-size:18px}.composer-row{grid-template-columns:minmax(0,1fr) 44px;gap:8px}.composer-row input,.send-button{height:44px}.send-button{width:44px}}@media(max-width:380px){.quick-cheers button{min-width:40px;width:40px;height:40px}.quick-cheers{grid-template-columns:repeat(6,40px);justify-content:space-between}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}}@media(forced-colors:active){.live-pill,.viewer-pill,.community-panel,.community-launcher,.send-button{border:1px solid CanvasText}}', Zm = `
  :host {
    --fanview-navy-950: #111827;
    --fanview-pink-500: #f22b78;
    --fanview-pink-700: #ce155f;
    --fanview-paper: #fffdfb;
    --fanview-blush: #fff2f7;
    --fanview-muted: #697386;
    --fanview-live-red: #e53935;
    --fanview-live-green: #39d98a;
    --fanview-line: rgba(15, 23, 42, 0.1);
    color: #111827;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system,
      BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; }
  button, input { font: inherit; }
`;
class Xm extends HTMLElement {
  constructor() {
    super();
    Ta(this, "config", null);
    Ta(this, "root", null);
    Ta(this, "mountPoint");
    const T = this.attachShadow({ mode: "open" }), r = document.createElement("style");
    r.textContent = `${Zm}
${Gm}`, this.mountPoint = document.createElement("div"), T.append(r, this.mountPoint);
  }
  connectedCallback() {
    this.renderWidget();
  }
  disconnectedCallback() {
    var T;
    (T = this.root) == null || T.unmount(), this.root = null;
  }
  configure(T) {
    this.config = { ...T }, this.renderWidget();
  }
  setMatchComplete(T) {
    !this.config || this.config.matchComplete === T || (this.config = { ...this.config, matchComplete: T }, this.renderWidget());
  }
  renderWidget() {
    if (!this.isConnected || !this.config) return;
    const T = this.config, r = T.adapter ?? (T.demo ? Om : T.client && T.gatewayUrl && T.publishableKey ? xm({
      client: T.client,
      gatewayUrl: T.gatewayUrl,
      publishableKey: T.publishableKey,
      displayName: T.displayName
    }) : null);
    r && (this.root ?? (this.root = gm.createRoot(this.mountPoint)), this.root.render(
      /* @__PURE__ */ R.jsx(Dm, { children: /* @__PURE__ */ R.jsx(
        Ym,
        {
          adapter: r,
          hideWhenUnavailable: !T.demo,
          matchComplete: !!T.matchComplete,
          shareId: T.shareId,
          startOpen: T.startOpen ?? !0,
          teamName: T.teamName
        }
      ) })
    ));
  }
}
customElements.get("fanview-community-widget") || customElements.define(
  "fanview-community-widget",
  Xm
);
export {
  Xm as FanViewCommunityWidgetElement,
  xm as createSupabaseCommunityAdapter
};
