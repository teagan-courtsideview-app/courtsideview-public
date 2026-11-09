var uu = { exports: {} }, wl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _d;
function cm() {
  if (_d) return wl;
  _d = 1;
  var c = Symbol.for("react.transitional.element"), v = Symbol.for("react.fragment");
  function E(f, C, R) {
    var H = null;
    if (R !== void 0 && (H = "" + R), C.key !== void 0 && (H = "" + C.key), "key" in C) {
      R = {};
      for (var te in C)
        te !== "key" && (R[te] = C[te]);
    } else R = C;
    return C = R.ref, {
      $$typeof: c,
      type: f,
      key: H,
      ref: C !== void 0 ? C : null,
      props: R
    };
  }
  return wl.Fragment = v, wl.jsx = E, wl.jsxs = E, wl;
}
var wd;
function sm() {
  return wd || (wd = 1, uu.exports = cm()), uu.exports;
}
var A = sm(), cu = { exports: {} }, zl = {}, su = { exports: {} }, fu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zd;
function fm() {
  return zd || (zd = 1, (function(c) {
    function v(y, M) {
      var Y = y.length;
      y.push(M);
      e: for (; 0 < Y; ) {
        var ce = Y - 1 >>> 1, pe = y[ce];
        if (0 < C(pe, M))
          y[ce] = M, y[Y] = pe, Y = ce;
        else break e;
      }
    }
    function E(y) {
      return y.length === 0 ? null : y[0];
    }
    function f(y) {
      if (y.length === 0) return null;
      var M = y[0], Y = y.pop();
      if (Y !== M) {
        y[0] = Y;
        e: for (var ce = 0, pe = y.length, d = pe >>> 1; ce < d; ) {
          var S = 2 * (ce + 1) - 1, O = y[S], U = S + 1, X = y[U];
          if (0 > C(O, Y))
            U < pe && 0 > C(X, O) ? (y[ce] = X, y[U] = Y, ce = U) : (y[ce] = O, y[S] = Y, ce = S);
          else if (U < pe && 0 > C(X, Y))
            y[ce] = X, y[U] = Y, ce = U;
          else break e;
        }
      }
      return M;
    }
    function C(y, M) {
      var Y = y.sortIndex - M.sortIndex;
      return Y !== 0 ? Y : y.id - M.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var R = performance;
      c.unstable_now = function() {
        return R.now();
      };
    } else {
      var H = Date, te = H.now();
      c.unstable_now = function() {
        return H.now() - te;
      };
    }
    var T = [], w = [], L = 1, N = null, K = 3, xe = !1, Q = !1, ge = !1, Me = !1, _e = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, Z = typeof setImmediate < "u" ? setImmediate : null;
    function ve(y) {
      for (var M = E(w); M !== null; ) {
        if (M.callback === null) f(w);
        else if (M.startTime <= y)
          f(w), M.sortIndex = M.expirationTime, v(T, M);
        else break;
        M = E(w);
      }
    }
    function je(y) {
      if (ge = !1, ve(y), !Q)
        if (E(T) !== null)
          Q = !0, Oe || (Oe = !0, We());
        else {
          var M = E(w);
          M !== null && Sa(je, M.startTime - y);
        }
    }
    var Oe = !1, W = -1, qe = 5, ia = -1;
    function Lt() {
      return Me ? !0 : !(c.unstable_now() - ia < qe);
    }
    function Ma() {
      if (Me = !1, Oe) {
        var y = c.unstable_now();
        ia = y;
        var M = !0;
        try {
          e: {
            Q = !1, ge && (ge = !1, Je(W), W = -1), xe = !0;
            var Y = K;
            try {
              a: {
                for (ve(y), N = E(T); N !== null && !(N.expirationTime > y && Lt()); ) {
                  var ce = N.callback;
                  if (typeof ce == "function") {
                    N.callback = null, K = N.priorityLevel;
                    var pe = ce(
                      N.expirationTime <= y
                    );
                    if (y = c.unstable_now(), typeof pe == "function") {
                      N.callback = pe, ve(y), M = !0;
                      break a;
                    }
                    N === E(T) && f(T), ve(y);
                  } else f(T);
                  N = E(T);
                }
                if (N !== null) M = !0;
                else {
                  var d = E(w);
                  d !== null && Sa(
                    je,
                    d.startTime - y
                  ), M = !1;
                }
              }
              break e;
            } finally {
              N = null, K = Y, xe = !1;
            }
            M = void 0;
          }
        } finally {
          M ? We() : Oe = !1;
        }
      }
    }
    var We;
    if (typeof Z == "function")
      We = function() {
        Z(Ma);
      };
    else if (typeof MessageChannel < "u") {
      var St = new MessageChannel(), Ua = St.port2;
      St.port1.onmessage = Ma, We = function() {
        Ua.postMessage(null);
      };
    } else
      We = function() {
        _e(Ma, 0);
      };
    function Sa(y, M) {
      W = _e(function() {
        y(c.unstable_now());
      }, M);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(y) {
      y.callback = null;
    }, c.unstable_forceFrameRate = function(y) {
      0 > y || 125 < y ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : qe = 0 < y ? Math.floor(1e3 / y) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return K;
    }, c.unstable_next = function(y) {
      switch (K) {
        case 1:
        case 2:
        case 3:
          var M = 3;
          break;
        default:
          M = K;
      }
      var Y = K;
      K = M;
      try {
        return y();
      } finally {
        K = Y;
      }
    }, c.unstable_requestPaint = function() {
      Me = !0;
    }, c.unstable_runWithPriority = function(y, M) {
      switch (y) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          y = 3;
      }
      var Y = K;
      K = y;
      try {
        return M();
      } finally {
        K = Y;
      }
    }, c.unstable_scheduleCallback = function(y, M, Y) {
      var ce = c.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? ce + Y : ce) : Y = ce, y) {
        case 1:
          var pe = -1;
          break;
        case 2:
          pe = 250;
          break;
        case 5:
          pe = 1073741823;
          break;
        case 4:
          pe = 1e4;
          break;
        default:
          pe = 5e3;
      }
      return pe = Y + pe, y = {
        id: L++,
        callback: M,
        priorityLevel: y,
        startTime: Y,
        expirationTime: pe,
        sortIndex: -1
      }, Y > ce ? (y.sortIndex = Y, v(w, y), E(T) === null && y === E(w) && (ge ? (Je(W), W = -1) : ge = !0, Sa(je, Y - ce))) : (y.sortIndex = pe, v(T, y), Q || xe || (Q = !0, Oe || (Oe = !0, We()))), y;
    }, c.unstable_shouldYield = Lt, c.unstable_wrapCallback = function(y) {
      var M = K;
      return function() {
        var Y = K;
        K = M;
        try {
          return y.apply(this, arguments);
        } finally {
          K = Y;
        }
      };
    };
  })(fu)), fu;
}
var Sd;
function dm() {
  return Sd || (Sd = 1, su.exports = fm()), su.exports;
}
var du = { exports: {} }, G = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ad;
function pm() {
  if (Ad) return G;
  Ad = 1;
  var c = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), H = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), w = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), K = Symbol.iterator;
  function xe(d) {
    return d === null || typeof d != "object" ? null : (d = K && d[K] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var Q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ge = Object.assign, Me = {};
  function _e(d, S, O) {
    this.props = d, this.context = S, this.refs = Me, this.updater = O || Q;
  }
  _e.prototype.isReactComponent = {}, _e.prototype.setState = function(d, S) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, S, "setState");
  }, _e.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Je() {
  }
  Je.prototype = _e.prototype;
  function Z(d, S, O) {
    this.props = d, this.context = S, this.refs = Me, this.updater = O || Q;
  }
  var ve = Z.prototype = new Je();
  ve.constructor = Z, ge(ve, _e.prototype), ve.isPureReactComponent = !0;
  var je = Array.isArray;
  function Oe() {
  }
  var W = { H: null, A: null, T: null, S: null }, qe = Object.prototype.hasOwnProperty;
  function ia(d, S, O) {
    var U = O.ref;
    return {
      $$typeof: c,
      type: d,
      key: S,
      ref: U !== void 0 ? U : null,
      props: O
    };
  }
  function Lt(d, S) {
    return ia(d.type, S, d.props);
  }
  function Ma(d) {
    return typeof d == "object" && d !== null && d.$$typeof === c;
  }
  function We(d) {
    var S = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(O) {
      return S[O];
    });
  }
  var St = /\/+/g;
  function Ua(d, S) {
    return typeof d == "object" && d !== null && d.key != null ? We("" + d.key) : S.toString(36);
  }
  function Sa(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Oe, Oe) : (d.status = "pending", d.then(
          function(S) {
            d.status === "pending" && (d.status = "fulfilled", d.value = S);
          },
          function(S) {
            d.status === "pending" && (d.status = "rejected", d.reason = S);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function y(d, S, O, U, X) {
    var $ = typeof d;
    ($ === "undefined" || $ === "boolean") && (d = null);
    var oe = !1;
    if (d === null) oe = !0;
    else
      switch ($) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case c:
            case v:
              oe = !0;
              break;
            case L:
              return oe = d._init, y(
                oe(d._payload),
                S,
                O,
                U,
                X
              );
          }
      }
    if (oe)
      return X = X(d), oe = U === "" ? "." + Ua(d, 0) : U, je(X) ? (O = "", oe != null && (O = oe.replace(St, "$&/") + "/"), y(X, S, O, "", function(Oi) {
        return Oi;
      })) : X != null && (Ma(X) && (X = Lt(
        X,
        O + (X.key == null || d && d.key === X.key ? "" : ("" + X.key).replace(
          St,
          "$&/"
        ) + "/") + oe
      )), S.push(X)), 1;
    oe = 0;
    var Ve = U === "" ? "." : U + ":";
    if (je(d))
      for (var Ae = 0; Ae < d.length; Ae++)
        U = d[Ae], $ = Ve + Ua(U, Ae), oe += y(
          U,
          S,
          O,
          $,
          X
        );
    else if (Ae = xe(d), typeof Ae == "function")
      for (d = Ae.call(d), Ae = 0; !(U = d.next()).done; )
        U = U.value, $ = Ve + Ua(U, Ae++), oe += y(
          U,
          S,
          O,
          $,
          X
        );
    else if ($ === "object") {
      if (typeof d.then == "function")
        return y(
          Sa(d),
          S,
          O,
          U,
          X
        );
      throw S = String(d), Error(
        "Objects are not valid as a React child (found: " + (S === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : S) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return oe;
  }
  function M(d, S, O) {
    if (d == null) return d;
    var U = [], X = 0;
    return y(d, U, "", "", function($) {
      return S.call(O, $, X++);
    }), U;
  }
  function Y(d) {
    if (d._status === -1) {
      var S = d._result;
      S = S(), S.then(
        function(O) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = O);
        },
        function(O) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = O);
        }
      ), d._status === -1 && (d._status = 0, d._result = S);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var ce = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var S = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(S)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, pe = {
    map: M,
    forEach: function(d, S, O) {
      M(
        d,
        function() {
          S.apply(this, arguments);
        },
        O
      );
    },
    count: function(d) {
      var S = 0;
      return M(d, function() {
        S++;
      }), S;
    },
    toArray: function(d) {
      return M(d, function(S) {
        return S;
      }) || [];
    },
    only: function(d) {
      if (!Ma(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return G.Activity = N, G.Children = pe, G.Component = _e, G.Fragment = E, G.Profiler = C, G.PureComponent = Z, G.StrictMode = f, G.Suspense = T, G.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, G.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return W.H.useMemoCache(d);
    }
  }, G.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, G.cacheSignal = function() {
    return null;
  }, G.cloneElement = function(d, S, O) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var U = ge({}, d.props), X = d.key;
    if (S != null)
      for ($ in S.key !== void 0 && (X = "" + S.key), S)
        !qe.call(S, $) || $ === "key" || $ === "__self" || $ === "__source" || $ === "ref" && S.ref === void 0 || (U[$] = S[$]);
    var $ = arguments.length - 2;
    if ($ === 1) U.children = O;
    else if (1 < $) {
      for (var oe = Array($), Ve = 0; Ve < $; Ve++)
        oe[Ve] = arguments[Ve + 2];
      U.children = oe;
    }
    return ia(d.type, X, U);
  }, G.createContext = function(d) {
    return d = {
      $$typeof: H,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: R,
      _context: d
    }, d;
  }, G.createElement = function(d, S, O) {
    var U, X = {}, $ = null;
    if (S != null)
      for (U in S.key !== void 0 && ($ = "" + S.key), S)
        qe.call(S, U) && U !== "key" && U !== "__self" && U !== "__source" && (X[U] = S[U]);
    var oe = arguments.length - 2;
    if (oe === 1) X.children = O;
    else if (1 < oe) {
      for (var Ve = Array(oe), Ae = 0; Ae < oe; Ae++)
        Ve[Ae] = arguments[Ae + 2];
      X.children = Ve;
    }
    if (d && d.defaultProps)
      for (U in oe = d.defaultProps, oe)
        X[U] === void 0 && (X[U] = oe[U]);
    return ia(d, $, X);
  }, G.createRef = function() {
    return { current: null };
  }, G.forwardRef = function(d) {
    return { $$typeof: te, render: d };
  }, G.isValidElement = Ma, G.lazy = function(d) {
    return {
      $$typeof: L,
      _payload: { _status: -1, _result: d },
      _init: Y
    };
  }, G.memo = function(d, S) {
    return {
      $$typeof: w,
      type: d,
      compare: S === void 0 ? null : S
    };
  }, G.startTransition = function(d) {
    var S = W.T, O = {};
    W.T = O;
    try {
      var U = d(), X = W.S;
      X !== null && X(O, U), typeof U == "object" && U !== null && typeof U.then == "function" && U.then(Oe, ce);
    } catch ($) {
      ce($);
    } finally {
      S !== null && O.types !== null && (S.types = O.types), W.T = S;
    }
  }, G.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, G.use = function(d) {
    return W.H.use(d);
  }, G.useActionState = function(d, S, O) {
    return W.H.useActionState(d, S, O);
  }, G.useCallback = function(d, S) {
    return W.H.useCallback(d, S);
  }, G.useContext = function(d) {
    return W.H.useContext(d);
  }, G.useDebugValue = function() {
  }, G.useDeferredValue = function(d, S) {
    return W.H.useDeferredValue(d, S);
  }, G.useEffect = function(d, S) {
    return W.H.useEffect(d, S);
  }, G.useEffectEvent = function(d) {
    return W.H.useEffectEvent(d);
  }, G.useId = function() {
    return W.H.useId();
  }, G.useImperativeHandle = function(d, S, O) {
    return W.H.useImperativeHandle(d, S, O);
  }, G.useInsertionEffect = function(d, S) {
    return W.H.useInsertionEffect(d, S);
  }, G.useLayoutEffect = function(d, S) {
    return W.H.useLayoutEffect(d, S);
  }, G.useMemo = function(d, S) {
    return W.H.useMemo(d, S);
  }, G.useOptimistic = function(d, S) {
    return W.H.useOptimistic(d, S);
  }, G.useReducer = function(d, S, O) {
    return W.H.useReducer(d, S, O);
  }, G.useRef = function(d) {
    return W.H.useRef(d);
  }, G.useState = function(d) {
    return W.H.useState(d);
  }, G.useSyncExternalStore = function(d, S, O) {
    return W.H.useSyncExternalStore(
      d,
      S,
      O
    );
  }, G.useTransition = function() {
    return W.H.useTransition();
  }, G.version = "19.2.0", G;
}
var Ed;
function hu() {
  return Ed || (Ed = 1, du.exports = pm()), du.exports;
}
var pu = { exports: {} }, Xe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td;
function mm() {
  if (Td) return Xe;
  Td = 1;
  var c = hu();
  function v(T) {
    var w = "https://react.dev/errors/" + T;
    if (1 < arguments.length) {
      w += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var L = 2; L < arguments.length; L++)
        w += "&args[]=" + encodeURIComponent(arguments[L]);
    }
    return "Minified React error #" + T + "; visit " + w + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function E() {
  }
  var f = {
    d: {
      f: E,
      r: function() {
        throw Error(v(522));
      },
      D: E,
      C: E,
      L: E,
      m: E,
      X: E,
      S: E,
      M: E
    },
    p: 0,
    findDOMNode: null
  }, C = Symbol.for("react.portal");
  function R(T, w, L) {
    var N = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: C,
      key: N == null ? null : "" + N,
      children: T,
      containerInfo: w,
      implementation: L
    };
  }
  var H = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function te(T, w) {
    if (T === "font") return "";
    if (typeof w == "string")
      return w === "use-credentials" ? w : "";
  }
  return Xe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, Xe.createPortal = function(T, w) {
    var L = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!w || w.nodeType !== 1 && w.nodeType !== 9 && w.nodeType !== 11)
      throw Error(v(299));
    return R(T, w, null, L);
  }, Xe.flushSync = function(T) {
    var w = H.T, L = f.p;
    try {
      if (H.T = null, f.p = 2, T) return T();
    } finally {
      H.T = w, f.p = L, f.d.f();
    }
  }, Xe.preconnect = function(T, w) {
    typeof T == "string" && (w ? (w = w.crossOrigin, w = typeof w == "string" ? w === "use-credentials" ? w : "" : void 0) : w = null, f.d.C(T, w));
  }, Xe.prefetchDNS = function(T) {
    typeof T == "string" && f.d.D(T);
  }, Xe.preinit = function(T, w) {
    if (typeof T == "string" && w && typeof w.as == "string") {
      var L = w.as, N = te(L, w.crossOrigin), K = typeof w.integrity == "string" ? w.integrity : void 0, xe = typeof w.fetchPriority == "string" ? w.fetchPriority : void 0;
      L === "style" ? f.d.S(
        T,
        typeof w.precedence == "string" ? w.precedence : void 0,
        {
          crossOrigin: N,
          integrity: K,
          fetchPriority: xe
        }
      ) : L === "script" && f.d.X(T, {
        crossOrigin: N,
        integrity: K,
        fetchPriority: xe,
        nonce: typeof w.nonce == "string" ? w.nonce : void 0
      });
    }
  }, Xe.preinitModule = function(T, w) {
    if (typeof T == "string")
      if (typeof w == "object" && w !== null) {
        if (w.as == null || w.as === "script") {
          var L = te(
            w.as,
            w.crossOrigin
          );
          f.d.M(T, {
            crossOrigin: L,
            integrity: typeof w.integrity == "string" ? w.integrity : void 0,
            nonce: typeof w.nonce == "string" ? w.nonce : void 0
          });
        }
      } else w == null && f.d.M(T);
  }, Xe.preload = function(T, w) {
    if (typeof T == "string" && typeof w == "object" && w !== null && typeof w.as == "string") {
      var L = w.as, N = te(L, w.crossOrigin);
      f.d.L(T, L, {
        crossOrigin: N,
        integrity: typeof w.integrity == "string" ? w.integrity : void 0,
        nonce: typeof w.nonce == "string" ? w.nonce : void 0,
        type: typeof w.type == "string" ? w.type : void 0,
        fetchPriority: typeof w.fetchPriority == "string" ? w.fetchPriority : void 0,
        referrerPolicy: typeof w.referrerPolicy == "string" ? w.referrerPolicy : void 0,
        imageSrcSet: typeof w.imageSrcSet == "string" ? w.imageSrcSet : void 0,
        imageSizes: typeof w.imageSizes == "string" ? w.imageSizes : void 0,
        media: typeof w.media == "string" ? w.media : void 0
      });
    }
  }, Xe.preloadModule = function(T, w) {
    if (typeof T == "string")
      if (w) {
        var L = te(w.as, w.crossOrigin);
        f.d.m(T, {
          as: typeof w.as == "string" && w.as !== "script" ? w.as : void 0,
          crossOrigin: L,
          integrity: typeof w.integrity == "string" ? w.integrity : void 0
        });
      } else f.d.m(T);
  }, Xe.requestFormReset = function(T) {
    f.d.r(T);
  }, Xe.unstable_batchedUpdates = function(T, w) {
    return T(w);
  }, Xe.useFormState = function(T, w, L) {
    return H.H.useFormState(T, w, L);
  }, Xe.useFormStatus = function() {
    return H.H.useHostTransitionStatus();
  }, Xe.version = "19.2.0", Xe;
}
var Md;
function gm() {
  if (Md) return pu.exports;
  Md = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (v) {
        console.error(v);
      }
  }
  return c(), pu.exports = mm(), pu.exports;
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
var Od;
function bm() {
  if (Od) return zl;
  Od = 1;
  var c = dm(), v = hu(), E = gm();
  function f(e) {
    var a = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var t = 2; t < arguments.length; t++)
        a += "&args[]=" + encodeURIComponent(arguments[t]);
    }
    return "Minified React error #" + e + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function C(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function R(e) {
    var a = e, t = e;
    if (e.alternate) for (; a.return; ) a = a.return;
    else {
      e = a;
      do
        a = e, (a.flags & 4098) !== 0 && (t = a.return), e = a.return;
      while (e);
    }
    return a.tag === 3 ? t : null;
  }
  function H(e) {
    if (e.tag === 13) {
      var a = e.memoizedState;
      if (a === null && (e = e.alternate, e !== null && (a = e.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function te(e) {
    if (e.tag === 31) {
      var a = e.memoizedState;
      if (a === null && (e = e.alternate, e !== null && (a = e.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function T(e) {
    if (R(e) !== e)
      throw Error(f(188));
  }
  function w(e) {
    var a = e.alternate;
    if (!a) {
      if (a = R(e), a === null) throw Error(f(188));
      return a !== e ? null : e;
    }
    for (var t = e, i = a; ; ) {
      var l = t.return;
      if (l === null) break;
      var n = l.alternate;
      if (n === null) {
        if (i = l.return, i !== null) {
          t = i;
          continue;
        }
        break;
      }
      if (l.child === n.child) {
        for (n = l.child; n; ) {
          if (n === t) return T(l), e;
          if (n === i) return T(l), a;
          n = n.sibling;
        }
        throw Error(f(188));
      }
      if (t.return !== i.return) t = l, i = n;
      else {
        for (var o = !1, r = l.child; r; ) {
          if (r === t) {
            o = !0, t = l, i = n;
            break;
          }
          if (r === i) {
            o = !0, i = l, t = n;
            break;
          }
          r = r.sibling;
        }
        if (!o) {
          for (r = n.child; r; ) {
            if (r === t) {
              o = !0, t = n, i = l;
              break;
            }
            if (r === i) {
              o = !0, i = n, t = l;
              break;
            }
            r = r.sibling;
          }
          if (!o) throw Error(f(189));
        }
      }
      if (t.alternate !== i) throw Error(f(190));
    }
    if (t.tag !== 3) throw Error(f(188));
    return t.stateNode.current === t ? e : a;
  }
  function L(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e;
    for (e = e.child; e !== null; ) {
      if (a = L(e), a !== null) return a;
      e = e.sibling;
    }
    return null;
  }
  var N = Object.assign, K = Symbol.for("react.element"), xe = Symbol.for("react.transitional.element"), Q = Symbol.for("react.portal"), ge = Symbol.for("react.fragment"), Me = Symbol.for("react.strict_mode"), _e = Symbol.for("react.profiler"), Je = Symbol.for("react.consumer"), Z = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), je = Symbol.for("react.suspense"), Oe = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), qe = Symbol.for("react.lazy"), ia = Symbol.for("react.activity"), Lt = Symbol.for("react.memo_cache_sentinel"), Ma = Symbol.iterator;
  function We(e) {
    return e === null || typeof e != "object" ? null : (e = Ma && e[Ma] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var St = Symbol.for("react.client.reference");
  function Ua(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === St ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ge:
        return "Fragment";
      case _e:
        return "Profiler";
      case Me:
        return "StrictMode";
      case je:
        return "Suspense";
      case Oe:
        return "SuspenseList";
      case ia:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Q:
          return "Portal";
        case Z:
          return e.displayName || "Context";
        case Je:
          return (e._context.displayName || "Context") + ".Consumer";
        case ve:
          var a = e.render;
          return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case W:
          return a = e.displayName || null, a !== null ? a : Ua(e.type) || "Memo";
        case qe:
          a = e._payload, e = e._init;
          try {
            return Ua(e(a));
          } catch {
          }
      }
    return null;
  }
  var Sa = Array.isArray, y = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = E.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ce = [], pe = -1;
  function d(e) {
    return { current: e };
  }
  function S(e) {
    0 > pe || (e.current = ce[pe], ce[pe] = null, pe--);
  }
  function O(e, a) {
    pe++, ce[pe] = e.current, e.current = a;
  }
  var U = d(null), X = d(null), $ = d(null), oe = d(null);
  function Ve(e, a) {
    switch (O($, a), O(X, e), O(U, null), a.nodeType) {
      case 9:
      case 11:
        e = (e = a.documentElement) && (e = e.namespaceURI) ? Lf(e) : 0;
        break;
      default:
        if (e = a.tagName, a = a.namespaceURI)
          a = Lf(a), e = Xf(a, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    S(U), O(U, e);
  }
  function Ae() {
    S(U), S(X), S($);
  }
  function Oi(e) {
    e.memoizedState !== null && O(oe, e);
    var a = U.current, t = Xf(a, e.type);
    a !== t && (O(X, e), O(U, t));
  }
  function Sl(e) {
    X.current === e && (S(U), S(X)), oe.current === e && (S(oe), xl._currentValue = Y);
  }
  var Gn, vu;
  function At(e) {
    if (Gn === void 0)
      try {
        throw Error();
      } catch (t) {
        var a = t.stack.trim().match(/\n( *(at )?)/);
        Gn = a && a[1] || "", vu = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Gn + e + vu;
  }
  var Ln = !1;
  function Xn(e, a) {
    if (!e || Ln) return "";
    Ln = !0;
    var t = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (a) {
              var z = function() {
                throw Error();
              };
              if (Object.defineProperty(z.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(z, []);
                } catch (h) {
                  var b = h;
                }
                Reflect.construct(e, [], z);
              } else {
                try {
                  z.call();
                } catch (h) {
                  b = h;
                }
                e.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (h) {
                b = h;
              }
              (z = e()) && typeof z.catch == "function" && z.catch(function() {
              });
            }
          } catch (h) {
            if (h && b && typeof h.stack == "string")
              return [h.stack, b.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      l && l.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = i.DetermineComponentFrameRoot(), o = n[0], r = n[1];
      if (o && r) {
        var u = o.split(`
`), g = r.split(`
`);
        for (l = i = 0; i < u.length && !u[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; l < g.length && !g[l].includes(
          "DetermineComponentFrameRoot"
        ); )
          l++;
        if (i === u.length || l === g.length)
          for (i = u.length - 1, l = g.length - 1; 1 <= i && 0 <= l && u[i] !== g[l]; )
            l--;
        for (; 1 <= i && 0 <= l; i--, l--)
          if (u[i] !== g[l]) {
            if (i !== 1 || l !== 1)
              do
                if (i--, l--, 0 > l || u[i] !== g[l]) {
                  var x = `
` + u[i].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), x;
                }
              while (1 <= i && 0 <= l);
            break;
          }
      }
    } finally {
      Ln = !1, Error.prepareStackTrace = t;
    }
    return (t = e ? e.displayName || e.name : "") ? At(t) : "";
  }
  function Zd(e, a) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return At(e.type);
      case 16:
        return At("Lazy");
      case 13:
        return e.child !== a && a !== null ? At("Suspense Fallback") : At("Suspense");
      case 19:
        return At("SuspenseList");
      case 0:
      case 15:
        return Xn(e.type, !1);
      case 11:
        return Xn(e.type.render, !1);
      case 1:
        return Xn(e.type, !0);
      case 31:
        return At("Activity");
      default:
        return "";
    }
  }
  function yu(e) {
    try {
      var a = "", t = null;
      do
        a += Zd(e, t), t = e, e = e.return;
      while (e);
      return a;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Vn = Object.prototype.hasOwnProperty, Kn = c.unstable_scheduleCallback, Jn = c.unstable_cancelCallback, Yd = c.unstable_shouldYield, Qd = c.unstable_requestPaint, la = c.unstable_now, Gd = c.unstable_getCurrentPriorityLevel, _u = c.unstable_ImmediatePriority, wu = c.unstable_UserBlockingPriority, Al = c.unstable_NormalPriority, Ld = c.unstable_LowPriority, zu = c.unstable_IdlePriority, Xd = c.log, Vd = c.unstable_setDisableYieldValue, Ci = null, na = null;
  function Pa(e) {
    if (typeof Xd == "function" && Vd(e), na && typeof na.setStrictMode == "function")
      try {
        na.setStrictMode(Ci, e);
      } catch {
      }
  }
  var oa = Math.clz32 ? Math.clz32 : Wd, Kd = Math.log, Jd = Math.LN2;
  function Wd(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Kd(e) / Jd | 0) | 0;
  }
  var El = 256, Tl = 262144, Ml = 4194304;
  function Et(e) {
    var a = e & 42;
    if (a !== 0) return a;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function Ol(e, a, t) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var l = 0, n = e.suspendedLanes, o = e.pingedLanes;
    e = e.warmLanes;
    var r = i & 134217727;
    return r !== 0 ? (i = r & ~n, i !== 0 ? l = Et(i) : (o &= r, o !== 0 ? l = Et(o) : t || (t = r & ~e, t !== 0 && (l = Et(t))))) : (r = i & ~n, r !== 0 ? l = Et(r) : o !== 0 ? l = Et(o) : t || (t = i & ~e, t !== 0 && (l = Et(t)))), l === 0 ? 0 : a !== 0 && a !== l && (a & n) === 0 && (n = l & -l, t = a & -a, n >= t || n === 32 && (t & 4194048) !== 0) ? a : l;
  }
  function Di(e, a) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
  }
  function $d(e, a) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
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
        return a + 5e3;
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
  function Su() {
    var e = Ml;
    return Ml <<= 1, (Ml & 62914560) === 0 && (Ml = 4194304), e;
  }
  function Wn(e) {
    for (var a = [], t = 0; 31 > t; t++) a.push(e);
    return a;
  }
  function Ni(e, a) {
    e.pendingLanes |= a, a !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Fd(e, a, t, i, l, n) {
    var o = e.pendingLanes;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= t, e.entangledLanes &= t, e.errorRecoveryDisabledLanes &= t, e.shellSuspendCounter = 0;
    var r = e.entanglements, u = e.expirationTimes, g = e.hiddenUpdates;
    for (t = o & ~t; 0 < t; ) {
      var x = 31 - oa(t), z = 1 << x;
      r[x] = 0, u[x] = -1;
      var b = g[x];
      if (b !== null)
        for (g[x] = null, x = 0; x < b.length; x++) {
          var h = b[x];
          h !== null && (h.lane &= -536870913);
        }
      t &= ~z;
    }
    i !== 0 && Au(e, i, 0), n !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= n & ~(o & ~a));
  }
  function Au(e, a, t) {
    e.pendingLanes |= a, e.suspendedLanes &= ~a;
    var i = 31 - oa(a);
    e.entangledLanes |= a, e.entanglements[i] = e.entanglements[i] | 1073741824 | t & 261930;
  }
  function Eu(e, a) {
    var t = e.entangledLanes |= a;
    for (e = e.entanglements; t; ) {
      var i = 31 - oa(t), l = 1 << i;
      l & a | e[i] & a && (e[i] |= a), t &= ~l;
    }
  }
  function Tu(e, a) {
    var t = a & -a;
    return t = (t & 42) !== 0 ? 1 : $n(t), (t & (e.suspendedLanes | a)) !== 0 ? 0 : t;
  }
  function $n(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Fn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Mu() {
    var e = M.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : md(e.type));
  }
  function Ou(e, a) {
    var t = M.p;
    try {
      return M.p = e, a();
    } finally {
      M.p = t;
    }
  }
  var et = Math.random().toString(36).slice(2), ke = "__reactFiber$" + et, $e = "__reactProps$" + et, Xt = "__reactContainer$" + et, In = "__reactEvents$" + et, Id = "__reactListeners$" + et, Pd = "__reactHandles$" + et, Cu = "__reactResources$" + et, Ui = "__reactMarker$" + et;
  function Pn(e) {
    delete e[ke], delete e[$e], delete e[In], delete e[Id], delete e[Pd];
  }
  function Vt(e) {
    var a = e[ke];
    if (a) return a;
    for (var t = e.parentNode; t; ) {
      if (a = t[Xt] || t[ke]) {
        if (t = a.alternate, a.child !== null || t !== null && t.child !== null)
          for (e = If(e); e !== null; ) {
            if (t = e[ke]) return t;
            e = If(e);
          }
        return a;
      }
      e = t, t = e.parentNode;
    }
    return null;
  }
  function Kt(e) {
    if (e = e[ke] || e[Xt]) {
      var a = e.tag;
      if (a === 5 || a === 6 || a === 13 || a === 31 || a === 26 || a === 27 || a === 3)
        return e;
    }
    return null;
  }
  function ji(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e.stateNode;
    throw Error(f(33));
  }
  function Jt(e) {
    var a = e[Cu];
    return a || (a = e[Cu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function Re(e) {
    e[Ui] = !0;
  }
  var Du = /* @__PURE__ */ new Set(), Nu = {};
  function Tt(e, a) {
    Wt(e, a), Wt(e + "Capture", a);
  }
  function Wt(e, a) {
    for (Nu[e] = a, e = 0; e < a.length; e++)
      Du.add(a[e]);
  }
  var e0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uu = {}, ju = {};
  function a0(e) {
    return Vn.call(ju, e) ? !0 : Vn.call(Uu, e) ? !1 : e0.test(e) ? ju[e] = !0 : (Uu[e] = !0, !1);
  }
  function Cl(e, a, t) {
    if (a0(a))
      if (t === null) e.removeAttribute(a);
      else {
        switch (typeof t) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(a);
            return;
          case "boolean":
            var i = a.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(a);
              return;
            }
        }
        e.setAttribute(a, "" + t);
      }
  }
  function Dl(e, a, t) {
    if (t === null) e.removeAttribute(a);
    else {
      switch (typeof t) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttribute(a, "" + t);
    }
  }
  function ja(e, a, t, i) {
    if (i === null) e.removeAttribute(t);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttributeNS(a, t, "" + i);
    }
  }
  function ma(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Hu(e) {
    var a = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function t0(e, a, t) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      a
    );
    if (!e.hasOwnProperty(a) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var l = i.get, n = i.set;
      return Object.defineProperty(e, a, {
        configurable: !0,
        get: function() {
          return l.call(this);
        },
        set: function(o) {
          t = "" + o, n.call(this, o);
        }
      }), Object.defineProperty(e, a, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return t;
        },
        setValue: function(o) {
          t = "" + o;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[a];
        }
      };
    }
  }
  function eo(e) {
    if (!e._valueTracker) {
      var a = Hu(e) ? "checked" : "value";
      e._valueTracker = t0(
        e,
        a,
        "" + e[a]
      );
    }
  }
  function Ru(e) {
    if (!e) return !1;
    var a = e._valueTracker;
    if (!a) return !0;
    var t = a.getValue(), i = "";
    return e && (i = Hu(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== t ? (a.setValue(e), !0) : !1;
  }
  function Nl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var i0 = /[\n"\\]/g;
  function ga(e) {
    return e.replace(
      i0,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ao(e, a, t, i, l, n, o, r) {
    e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), a != null ? o === "number" ? (a === 0 && e.value === "" || e.value != a) && (e.value = "" + ma(a)) : e.value !== "" + ma(a) && (e.value = "" + ma(a)) : o !== "submit" && o !== "reset" || e.removeAttribute("value"), a != null ? to(e, o, ma(a)) : t != null ? to(e, o, ma(t)) : i != null && e.removeAttribute("value"), l == null && n != null && (e.defaultChecked = !!n), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.name = "" + ma(r) : e.removeAttribute("name");
  }
  function Bu(e, a, t, i, l, n, o, r) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (e.type = n), a != null || t != null) {
      if (!(n !== "submit" && n !== "reset" || a != null)) {
        eo(e);
        return;
      }
      t = t != null ? "" + ma(t) : "", a = a != null ? "" + ma(a) : t, r || a === e.value || (e.value = a), e.defaultValue = a;
    }
    i = i ?? l, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = r ? e.checked : !!i, e.defaultChecked = !!i, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), eo(e);
  }
  function to(e, a, t) {
    a === "number" && Nl(e.ownerDocument) === e || e.defaultValue === "" + t || (e.defaultValue = "" + t);
  }
  function $t(e, a, t, i) {
    if (e = e.options, a) {
      a = {};
      for (var l = 0; l < t.length; l++)
        a["$" + t[l]] = !0;
      for (t = 0; t < e.length; t++)
        l = a.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && i && (e[t].defaultSelected = !0);
    } else {
      for (t = "" + ma(t), a = null, l = 0; l < e.length; l++) {
        if (e[l].value === t) {
          e[l].selected = !0, i && (e[l].defaultSelected = !0);
          return;
        }
        a !== null || e[l].disabled || (a = e[l]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function qu(e, a, t) {
    if (a != null && (a = "" + ma(a), a !== e.value && (e.value = a), t == null)) {
      e.defaultValue !== a && (e.defaultValue = a);
      return;
    }
    e.defaultValue = t != null ? "" + ma(t) : "";
  }
  function ku(e, a, t, i) {
    if (a == null) {
      if (i != null) {
        if (t != null) throw Error(f(92));
        if (Sa(i)) {
          if (1 < i.length) throw Error(f(93));
          i = i[0];
        }
        t = i;
      }
      t == null && (t = ""), a = t;
    }
    t = ma(a), e.defaultValue = t, i = e.textContent, i === t && i !== "" && i !== null && (e.value = i), eo(e);
  }
  function Ft(e, a) {
    if (a) {
      var t = e.firstChild;
      if (t && t === e.lastChild && t.nodeType === 3) {
        t.nodeValue = a;
        return;
      }
    }
    e.textContent = a;
  }
  var l0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Zu(e, a, t) {
    var i = a.indexOf("--") === 0;
    t == null || typeof t == "boolean" || t === "" ? i ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "" : i ? e.setProperty(a, t) : typeof t != "number" || t === 0 || l0.has(a) ? a === "float" ? e.cssFloat = t : e[a] = ("" + t).trim() : e[a] = t + "px";
  }
  function Yu(e, a, t) {
    if (a != null && typeof a != "object")
      throw Error(f(62));
    if (e = e.style, t != null) {
      for (var i in t)
        !t.hasOwnProperty(i) || a != null && a.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var l in a)
        i = a[l], a.hasOwnProperty(l) && t[l] !== i && Zu(e, l, i);
    } else
      for (var n in a)
        a.hasOwnProperty(n) && Zu(e, n, a[n]);
  }
  function io(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  var n0 = /* @__PURE__ */ new Map([
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
  ]), o0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ul(e) {
    return o0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Ha() {
  }
  var lo = null;
  function no(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var It = null, Pt = null;
  function Qu(e) {
    var a = Kt(e);
    if (a && (e = a.stateNode)) {
      var t = e[$e] || null;
      e: switch (e = a.stateNode, a.type) {
        case "input":
          if (ao(
            e,
            t.value,
            t.defaultValue,
            t.defaultValue,
            t.checked,
            t.defaultChecked,
            t.type,
            t.name
          ), a = t.name, t.type === "radio" && a != null) {
            for (t = e; t.parentNode; ) t = t.parentNode;
            for (t = t.querySelectorAll(
              'input[name="' + ga(
                "" + a
              ) + '"][type="radio"]'
            ), a = 0; a < t.length; a++) {
              var i = t[a];
              if (i !== e && i.form === e.form) {
                var l = i[$e] || null;
                if (!l) throw Error(f(90));
                ao(
                  i,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (a = 0; a < t.length; a++)
              i = t[a], i.form === e.form && Ru(i);
          }
          break e;
        case "textarea":
          qu(e, t.value, t.defaultValue);
          break e;
        case "select":
          a = t.value, a != null && $t(e, !!t.multiple, a, !1);
      }
    }
  }
  var oo = !1;
  function Gu(e, a, t) {
    if (oo) return e(a, t);
    oo = !0;
    try {
      var i = e(a);
      return i;
    } finally {
      if (oo = !1, (It !== null || Pt !== null) && (_n(), It && (a = It, e = Pt, Pt = It = null, Qu(a), e)))
        for (a = 0; a < e.length; a++) Qu(e[a]);
    }
  }
  function Hi(e, a) {
    var t = e.stateNode;
    if (t === null) return null;
    var i = t[$e] || null;
    if (i === null) return null;
    t = i[a];
    e: switch (a) {
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
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (t && typeof t != "function")
      throw Error(
        f(231, a, typeof t)
      );
    return t;
  }
  var Ra = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ro = !1;
  if (Ra)
    try {
      var Ri = {};
      Object.defineProperty(Ri, "passive", {
        get: function() {
          ro = !0;
        }
      }), window.addEventListener("test", Ri, Ri), window.removeEventListener("test", Ri, Ri);
    } catch {
      ro = !1;
    }
  var at = null, uo = null, jl = null;
  function Lu() {
    if (jl) return jl;
    var e, a = uo, t = a.length, i, l = "value" in at ? at.value : at.textContent, n = l.length;
    for (e = 0; e < t && a[e] === l[e]; e++) ;
    var o = t - e;
    for (i = 1; i <= o && a[t - i] === l[n - i]; i++) ;
    return jl = l.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Hl(e) {
    var a = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && a === 13 && (e = 13)) : e = a, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Rl() {
    return !0;
  }
  function Xu() {
    return !1;
  }
  function Fe(e) {
    function a(t, i, l, n, o) {
      this._reactName = t, this._targetInst = l, this.type = i, this.nativeEvent = n, this.target = o, this.currentTarget = null;
      for (var r in e)
        e.hasOwnProperty(r) && (t = e[r], this[r] = t ? t(n) : n[r]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Rl : Xu, this.isPropagationStopped = Xu, this;
    }
    return N(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var t = this.nativeEvent;
        t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = Rl);
      },
      stopPropagation: function() {
        var t = this.nativeEvent;
        t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = Rl);
      },
      persist: function() {
      },
      isPersistent: Rl
    }), a;
  }
  var Mt = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bl = Fe(Mt), Bi = N({}, Mt, { view: 0, detail: 0 }), r0 = Fe(Bi), co, so, qi, ql = N({}, Bi, {
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
    getModifierState: po,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== qi && (qi && e.type === "mousemove" ? (co = e.screenX - qi.screenX, so = e.screenY - qi.screenY) : so = co = 0, qi = e), co);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : so;
    }
  }), Vu = Fe(ql), u0 = N({}, ql, { dataTransfer: 0 }), c0 = Fe(u0), s0 = N({}, Bi, { relatedTarget: 0 }), fo = Fe(s0), f0 = N({}, Mt, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), d0 = Fe(f0), p0 = N({}, Mt, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), m0 = Fe(p0), g0 = N({}, Mt, { data: 0 }), Ku = Fe(g0), b0 = {
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
  }, h0 = {
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
  }, x0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function v0(e) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(e) : (e = x0[e]) ? !!a[e] : !1;
  }
  function po() {
    return v0;
  }
  var y0 = N({}, Bi, {
    key: function(e) {
      if (e.key) {
        var a = b0[e.key] || e.key;
        if (a !== "Unidentified") return a;
      }
      return e.type === "keypress" ? (e = Hl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? h0[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: po,
    charCode: function(e) {
      return e.type === "keypress" ? Hl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Hl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _0 = Fe(y0), w0 = N({}, ql, {
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
  }), Ju = Fe(w0), z0 = N({}, Bi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: po
  }), S0 = Fe(z0), A0 = N({}, Mt, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), E0 = Fe(A0), T0 = N({}, ql, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), M0 = Fe(T0), O0 = N({}, Mt, {
    newState: 0,
    oldState: 0
  }), C0 = Fe(O0), D0 = [9, 13, 27, 32], mo = Ra && "CompositionEvent" in window, ki = null;
  Ra && "documentMode" in document && (ki = document.documentMode);
  var N0 = Ra && "TextEvent" in window && !ki, Wu = Ra && (!mo || ki && 8 < ki && 11 >= ki), $u = " ", Fu = !1;
  function Iu(e, a) {
    switch (e) {
      case "keyup":
        return D0.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Pu(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ei = !1;
  function U0(e, a) {
    switch (e) {
      case "compositionend":
        return Pu(a);
      case "keypress":
        return a.which !== 32 ? null : (Fu = !0, $u);
      case "textInput":
        return e = a.data, e === $u && Fu ? null : e;
      default:
        return null;
    }
  }
  function j0(e, a) {
    if (ei)
      return e === "compositionend" || !mo && Iu(e, a) ? (e = Lu(), jl = uo = at = null, ei = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
          if (a.char && 1 < a.char.length)
            return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return Wu && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var H0 = {
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
  function ec(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a === "input" ? !!H0[e.type] : a === "textarea";
  }
  function ac(e, a, t, i) {
    It ? Pt ? Pt.push(i) : Pt = [i] : It = i, a = Mn(a, "onChange"), 0 < a.length && (t = new Bl(
      "onChange",
      "change",
      null,
      t,
      i
    ), e.push({ event: t, listeners: a }));
  }
  var Zi = null, Yi = null;
  function R0(e) {
    qf(e, 0);
  }
  function kl(e) {
    var a = ji(e);
    if (Ru(a)) return e;
  }
  function tc(e, a) {
    if (e === "change") return a;
  }
  var ic = !1;
  if (Ra) {
    var go;
    if (Ra) {
      var bo = "oninput" in document;
      if (!bo) {
        var lc = document.createElement("div");
        lc.setAttribute("oninput", "return;"), bo = typeof lc.oninput == "function";
      }
      go = bo;
    } else go = !1;
    ic = go && (!document.documentMode || 9 < document.documentMode);
  }
  function nc() {
    Zi && (Zi.detachEvent("onpropertychange", oc), Yi = Zi = null);
  }
  function oc(e) {
    if (e.propertyName === "value" && kl(Yi)) {
      var a = [];
      ac(
        a,
        Yi,
        e,
        no(e)
      ), Gu(R0, a);
    }
  }
  function B0(e, a, t) {
    e === "focusin" ? (nc(), Zi = a, Yi = t, Zi.attachEvent("onpropertychange", oc)) : e === "focusout" && nc();
  }
  function q0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return kl(Yi);
  }
  function k0(e, a) {
    if (e === "click") return kl(a);
  }
  function Z0(e, a) {
    if (e === "input" || e === "change")
      return kl(a);
  }
  function Y0(e, a) {
    return e === a && (e !== 0 || 1 / e === 1 / a) || e !== e && a !== a;
  }
  var ra = typeof Object.is == "function" ? Object.is : Y0;
  function Qi(e, a) {
    if (ra(e, a)) return !0;
    if (typeof e != "object" || e === null || typeof a != "object" || a === null)
      return !1;
    var t = Object.keys(e), i = Object.keys(a);
    if (t.length !== i.length) return !1;
    for (i = 0; i < t.length; i++) {
      var l = t[i];
      if (!Vn.call(a, l) || !ra(e[l], a[l]))
        return !1;
    }
    return !0;
  }
  function rc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function uc(e, a) {
    var t = rc(e);
    e = 0;
    for (var i; t; ) {
      if (t.nodeType === 3) {
        if (i = e + t.textContent.length, e <= a && i >= a)
          return { node: t, offset: a - e };
        e = i;
      }
      e: {
        for (; t; ) {
          if (t.nextSibling) {
            t = t.nextSibling;
            break e;
          }
          t = t.parentNode;
        }
        t = void 0;
      }
      t = rc(t);
    }
  }
  function cc(e, a) {
    return e && a ? e === a ? !0 : e && e.nodeType === 3 ? !1 : a && a.nodeType === 3 ? cc(e, a.parentNode) : "contains" in e ? e.contains(a) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function sc(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var a = Nl(e.document); a instanceof e.HTMLIFrameElement; ) {
      try {
        var t = typeof a.contentWindow.location.href == "string";
      } catch {
        t = !1;
      }
      if (t) e = a.contentWindow;
      else break;
      a = Nl(e.document);
    }
    return a;
  }
  function ho(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a && (a === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || a === "textarea" || e.contentEditable === "true");
  }
  var Q0 = Ra && "documentMode" in document && 11 >= document.documentMode, ai = null, xo = null, Gi = null, vo = !1;
  function fc(e, a, t) {
    var i = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
    vo || ai == null || ai !== Nl(i) || (i = ai, "selectionStart" in i && ho(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Gi && Qi(Gi, i) || (Gi = i, i = Mn(xo, "onSelect"), 0 < i.length && (a = new Bl(
      "onSelect",
      "select",
      null,
      a,
      t
    ), e.push({ event: a, listeners: i }), a.target = ai)));
  }
  function Ot(e, a) {
    var t = {};
    return t[e.toLowerCase()] = a.toLowerCase(), t["Webkit" + e] = "webkit" + a, t["Moz" + e] = "moz" + a, t;
  }
  var ti = {
    animationend: Ot("Animation", "AnimationEnd"),
    animationiteration: Ot("Animation", "AnimationIteration"),
    animationstart: Ot("Animation", "AnimationStart"),
    transitionrun: Ot("Transition", "TransitionRun"),
    transitionstart: Ot("Transition", "TransitionStart"),
    transitioncancel: Ot("Transition", "TransitionCancel"),
    transitionend: Ot("Transition", "TransitionEnd")
  }, yo = {}, dc = {};
  Ra && (dc = document.createElement("div").style, "AnimationEvent" in window || (delete ti.animationend.animation, delete ti.animationiteration.animation, delete ti.animationstart.animation), "TransitionEvent" in window || delete ti.transitionend.transition);
  function Ct(e) {
    if (yo[e]) return yo[e];
    if (!ti[e]) return e;
    var a = ti[e], t;
    for (t in a)
      if (a.hasOwnProperty(t) && t in dc)
        return yo[e] = a[t];
    return e;
  }
  var pc = Ct("animationend"), mc = Ct("animationiteration"), gc = Ct("animationstart"), G0 = Ct("transitionrun"), L0 = Ct("transitionstart"), X0 = Ct("transitioncancel"), bc = Ct("transitionend"), hc = /* @__PURE__ */ new Map(), _o = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  _o.push("scrollEnd");
  function Aa(e, a) {
    hc.set(e, a), Tt(a, [e]);
  }
  var Zl = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var a = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(a)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, ba = [], ii = 0, wo = 0;
  function Yl() {
    for (var e = ii, a = wo = ii = 0; a < e; ) {
      var t = ba[a];
      ba[a++] = null;
      var i = ba[a];
      ba[a++] = null;
      var l = ba[a];
      ba[a++] = null;
      var n = ba[a];
      if (ba[a++] = null, i !== null && l !== null) {
        var o = i.pending;
        o === null ? l.next = l : (l.next = o.next, o.next = l), i.pending = l;
      }
      n !== 0 && xc(t, l, n);
    }
  }
  function Ql(e, a, t, i) {
    ba[ii++] = e, ba[ii++] = a, ba[ii++] = t, ba[ii++] = i, wo |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function zo(e, a, t, i) {
    return Ql(e, a, t, i), Gl(e);
  }
  function Dt(e, a) {
    return Ql(e, null, null, a), Gl(e);
  }
  function xc(e, a, t) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t);
    for (var l = !1, n = e.return; n !== null; )
      n.childLanes |= t, i = n.alternate, i !== null && (i.childLanes |= t), n.tag === 22 && (e = n.stateNode, e === null || e._visibility & 1 || (l = !0)), e = n, n = n.return;
    return e.tag === 3 ? (n = e.stateNode, l && a !== null && (l = 31 - oa(t), e = n.hiddenUpdates, i = e[l], i === null ? e[l] = [a] : i.push(a), a.lane = t | 536870912), n) : null;
  }
  function Gl(e) {
    if (50 < fl)
      throw fl = 0, Nr = null, Error(f(185));
    for (var a = e.return; a !== null; )
      e = a, a = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var li = {};
  function V0(e, a, t, i) {
    this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ua(e, a, t, i) {
    return new V0(e, a, t, i);
  }
  function So(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ba(e, a) {
    var t = e.alternate;
    return t === null ? (t = ua(
      e.tag,
      a,
      e.key,
      e.mode
    ), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = a, t.type = e.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = e.flags & 65011712, t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, a = e.dependencies, t.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t.refCleanup = e.refCleanup, t;
  }
  function vc(e, a) {
    e.flags &= 65011714;
    var t = e.alternate;
    return t === null ? (e.childLanes = 0, e.lanes = a, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, e.type = t.type, a = t.dependencies, e.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), e;
  }
  function Ll(e, a, t, i, l, n) {
    var o = 0;
    if (i = e, typeof e == "function") So(e) && (o = 1);
    else if (typeof e == "string")
      o = Fp(
        e,
        t,
        U.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ia:
          return e = ua(31, t, a, l), e.elementType = ia, e.lanes = n, e;
        case ge:
          return Nt(t.children, l, n, a);
        case Me:
          o = 8, l |= 24;
          break;
        case _e:
          return e = ua(12, t, a, l | 2), e.elementType = _e, e.lanes = n, e;
        case je:
          return e = ua(13, t, a, l), e.elementType = je, e.lanes = n, e;
        case Oe:
          return e = ua(19, t, a, l), e.elementType = Oe, e.lanes = n, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Z:
                o = 10;
                break e;
              case Je:
                o = 9;
                break e;
              case ve:
                o = 11;
                break e;
              case W:
                o = 14;
                break e;
              case qe:
                o = 16, i = null;
                break e;
            }
          o = 29, t = Error(
            f(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return a = ua(o, t, a, l), a.elementType = e, a.type = i, a.lanes = n, a;
  }
  function Nt(e, a, t, i) {
    return e = ua(7, e, i, a), e.lanes = t, e;
  }
  function Ao(e, a, t) {
    return e = ua(6, e, null, a), e.lanes = t, e;
  }
  function yc(e) {
    var a = ua(18, null, null, 0);
    return a.stateNode = e, a;
  }
  function Eo(e, a, t) {
    return a = ua(
      4,
      e.children !== null ? e.children : [],
      e.key,
      a
    ), a.lanes = t, a.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, a;
  }
  var _c = /* @__PURE__ */ new WeakMap();
  function ha(e, a) {
    if (typeof e == "object" && e !== null) {
      var t = _c.get(e);
      return t !== void 0 ? t : (a = {
        value: e,
        source: a,
        stack: yu(a)
      }, _c.set(e, a), a);
    }
    return {
      value: e,
      source: a,
      stack: yu(a)
    };
  }
  var ni = [], oi = 0, Xl = null, Li = 0, xa = [], va = 0, tt = null, Oa = 1, Ca = "";
  function qa(e, a) {
    ni[oi++] = Li, ni[oi++] = Xl, Xl = e, Li = a;
  }
  function wc(e, a, t) {
    xa[va++] = Oa, xa[va++] = Ca, xa[va++] = tt, tt = e;
    var i = Oa;
    e = Ca;
    var l = 32 - oa(i) - 1;
    i &= ~(1 << l), t += 1;
    var n = 32 - oa(a) + l;
    if (30 < n) {
      var o = l - l % 5;
      n = (i & (1 << o) - 1).toString(32), i >>= o, l -= o, Oa = 1 << 32 - oa(a) + l | t << l | i, Ca = n + e;
    } else
      Oa = 1 << n | t << l | i, Ca = e;
  }
  function To(e) {
    e.return !== null && (qa(e, 1), wc(e, 1, 0));
  }
  function Mo(e) {
    for (; e === Xl; )
      Xl = ni[--oi], ni[oi] = null, Li = ni[--oi], ni[oi] = null;
    for (; e === tt; )
      tt = xa[--va], xa[va] = null, Ca = xa[--va], xa[va] = null, Oa = xa[--va], xa[va] = null;
  }
  function zc(e, a) {
    xa[va++] = Oa, xa[va++] = Ca, xa[va++] = tt, Oa = a.id, Ca = a.overflow, tt = e;
  }
  var Ze = null, be = null, ae = !1, it = null, ya = !1, Oo = Error(f(519));
  function lt(e) {
    var a = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Xi(ha(a, e)), Oo;
  }
  function Sc(e) {
    var a = e.stateNode, t = e.type, i = e.memoizedProps;
    switch (a[ke] = e, a[$e] = i, t) {
      case "dialog":
        I("cancel", a), I("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        I("load", a);
        break;
      case "video":
      case "audio":
        for (t = 0; t < pl.length; t++)
          I(pl[t], a);
        break;
      case "source":
        I("error", a);
        break;
      case "img":
      case "image":
      case "link":
        I("error", a), I("load", a);
        break;
      case "details":
        I("toggle", a);
        break;
      case "input":
        I("invalid", a), Bu(
          a,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        I("invalid", a);
        break;
      case "textarea":
        I("invalid", a), ku(a, i.value, i.defaultValue, i.children);
    }
    t = i.children, typeof t != "string" && typeof t != "number" && typeof t != "bigint" || a.textContent === "" + t || i.suppressHydrationWarning === !0 || Qf(a.textContent, t) ? (i.popover != null && (I("beforetoggle", a), I("toggle", a)), i.onScroll != null && I("scroll", a), i.onScrollEnd != null && I("scrollend", a), i.onClick != null && (a.onclick = Ha), a = !0) : a = !1, a || lt(e, !0);
  }
  function Ac(e) {
    for (Ze = e.return; Ze; )
      switch (Ze.tag) {
        case 5:
        case 31:
        case 13:
          ya = !1;
          return;
        case 27:
        case 3:
          ya = !0;
          return;
        default:
          Ze = Ze.return;
      }
  }
  function ri(e) {
    if (e !== Ze) return !1;
    if (!ae) return Ac(e), ae = !0, !1;
    var a = e.tag, t;
    if ((t = a !== 3 && a !== 27) && ((t = a === 5) && (t = e.type, t = !(t !== "form" && t !== "button") || Kr(e.type, e.memoizedProps)), t = !t), t && be && lt(e), Ac(e), a === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      be = Ff(e);
    } else if (a === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      be = Ff(e);
    } else
      a === 27 ? (a = be, xt(e.type) ? (e = Ir, Ir = null, be = e) : be = a) : be = Ze ? wa(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ut() {
    be = Ze = null, ae = !1;
  }
  function Co() {
    var e = it;
    return e !== null && (aa === null ? aa = e : aa.push.apply(
      aa,
      e
    ), it = null), e;
  }
  function Xi(e) {
    it === null ? it = [e] : it.push(e);
  }
  var Do = d(null), jt = null, ka = null;
  function nt(e, a, t) {
    O(Do, a._currentValue), a._currentValue = t;
  }
  function Za(e) {
    e._currentValue = Do.current, S(Do);
  }
  function No(e, a, t) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & a) !== a ? (e.childLanes |= a, i !== null && (i.childLanes |= a)) : i !== null && (i.childLanes & a) !== a && (i.childLanes |= a), e === t) break;
      e = e.return;
    }
  }
  function Uo(e, a, t, i) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var n = l.dependencies;
      if (n !== null) {
        var o = l.child;
        n = n.firstContext;
        e: for (; n !== null; ) {
          var r = n;
          n = l;
          for (var u = 0; u < a.length; u++)
            if (r.context === a[u]) {
              n.lanes |= t, r = n.alternate, r !== null && (r.lanes |= t), No(
                n.return,
                t,
                e
              ), i || (o = null);
              break e;
            }
          n = r.next;
        }
      } else if (l.tag === 18) {
        if (o = l.return, o === null) throw Error(f(341));
        o.lanes |= t, n = o.alternate, n !== null && (n.lanes |= t), No(o, t, e), o = null;
      } else o = l.child;
      if (o !== null) o.return = l;
      else
        for (o = l; o !== null; ) {
          if (o === e) {
            o = null;
            break;
          }
          if (l = o.sibling, l !== null) {
            l.return = o.return, o = l;
            break;
          }
          o = o.return;
        }
      l = o;
    }
  }
  function ui(e, a, t, i) {
    e = null;
    for (var l = a, n = !1; l !== null; ) {
      if (!n) {
        if ((l.flags & 524288) !== 0) n = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var o = l.alternate;
        if (o === null) throw Error(f(387));
        if (o = o.memoizedProps, o !== null) {
          var r = l.type;
          ra(l.pendingProps.value, o.value) || (e !== null ? e.push(r) : e = [r]);
        }
      } else if (l === oe.current) {
        if (o = l.alternate, o === null) throw Error(f(387));
        o.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(xl) : e = [xl]);
      }
      l = l.return;
    }
    e !== null && Uo(
      a,
      e,
      t,
      i
    ), a.flags |= 262144;
  }
  function Vl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ra(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ht(e) {
    jt = e, ka = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ye(e) {
    return Ec(jt, e);
  }
  function Kl(e, a) {
    return jt === null && Ht(e), Ec(e, a);
  }
  function Ec(e, a) {
    var t = a._currentValue;
    if (a = { context: a, memoizedValue: t, next: null }, ka === null) {
      if (e === null) throw Error(f(308));
      ka = a, e.dependencies = { lanes: 0, firstContext: a }, e.flags |= 524288;
    } else ka = ka.next = a;
    return t;
  }
  var K0 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], a = this.signal = {
      aborted: !1,
      addEventListener: function(t, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      a.aborted = !0, e.forEach(function(t) {
        return t();
      });
    };
  }, J0 = c.unstable_scheduleCallback, W0 = c.unstable_NormalPriority, Ce = {
    $$typeof: Z,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function jo() {
    return {
      controller: new K0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Vi(e) {
    e.refCount--, e.refCount === 0 && J0(W0, function() {
      e.controller.abort();
    });
  }
  var Ki = null, Ho = 0, ci = 0, si = null;
  function $0(e, a) {
    if (Ki === null) {
      var t = Ki = [];
      Ho = 0, ci = qr(), si = {
        status: "pending",
        value: void 0,
        then: function(i) {
          t.push(i);
        }
      };
    }
    return Ho++, a.then(Tc, Tc), a;
  }
  function Tc() {
    if (--Ho === 0 && Ki !== null) {
      si !== null && (si.status = "fulfilled");
      var e = Ki;
      Ki = null, ci = 0, si = null;
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
  }
  function F0(e, a) {
    var t = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(l) {
        t.push(l);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = a;
        for (var l = 0; l < t.length; l++) (0, t[l])(a);
      },
      function(l) {
        for (i.status = "rejected", i.reason = l, l = 0; l < t.length; l++)
          (0, t[l])(void 0);
      }
    ), i;
  }
  var Mc = y.S;
  y.S = function(e, a) {
    df = la(), typeof a == "object" && a !== null && typeof a.then == "function" && $0(e, a), Mc !== null && Mc(e, a);
  };
  var Rt = d(null);
  function Ro() {
    var e = Rt.current;
    return e !== null ? e : me.pooledCache;
  }
  function Jl(e, a) {
    a === null ? O(Rt, Rt.current) : O(Rt, a.pool);
  }
  function Oc() {
    var e = Ro();
    return e === null ? null : { parent: Ce._currentValue, pool: e };
  }
  var fi = Error(f(460)), Bo = Error(f(474)), Wl = Error(f(542)), $l = { then: function() {
  } };
  function Cc(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Dc(e, a, t) {
    switch (t = e[t], t === void 0 ? e.push(a) : t !== a && (a.then(Ha, Ha), a = t), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw e = a.reason, Uc(e), e;
      default:
        if (typeof a.status == "string") a.then(Ha, Ha);
        else {
          if (e = me, e !== null && 100 < e.shellSuspendCounter)
            throw Error(f(482));
          e = a, e.status = "pending", e.then(
            function(i) {
              if (a.status === "pending") {
                var l = a;
                l.status = "fulfilled", l.value = i;
              }
            },
            function(i) {
              if (a.status === "pending") {
                var l = a;
                l.status = "rejected", l.reason = i;
              }
            }
          );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw e = a.reason, Uc(e), e;
        }
        throw qt = a, fi;
    }
  }
  function Bt(e) {
    try {
      var a = e._init;
      return a(e._payload);
    } catch (t) {
      throw t !== null && typeof t == "object" && typeof t.then == "function" ? (qt = t, fi) : t;
    }
  }
  var qt = null;
  function Nc() {
    if (qt === null) throw Error(f(459));
    var e = qt;
    return qt = null, e;
  }
  function Uc(e) {
    if (e === fi || e === Wl)
      throw Error(f(483));
  }
  var di = null, Ji = 0;
  function Fl(e) {
    var a = Ji;
    return Ji += 1, di === null && (di = []), Dc(di, e, a);
  }
  function Wi(e, a) {
    a = a.props.ref, e.ref = a !== void 0 ? a : null;
  }
  function Il(e, a) {
    throw a.$$typeof === K ? Error(f(525)) : (e = Object.prototype.toString.call(a), Error(
      f(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : e
      )
    ));
  }
  function jc(e) {
    function a(p, s) {
      if (e) {
        var m = p.deletions;
        m === null ? (p.deletions = [s], p.flags |= 16) : m.push(s);
      }
    }
    function t(p, s) {
      if (!e) return null;
      for (; s !== null; )
        a(p, s), s = s.sibling;
      return null;
    }
    function i(p) {
      for (var s = /* @__PURE__ */ new Map(); p !== null; )
        p.key !== null ? s.set(p.key, p) : s.set(p.index, p), p = p.sibling;
      return s;
    }
    function l(p, s) {
      return p = Ba(p, s), p.index = 0, p.sibling = null, p;
    }
    function n(p, s, m) {
      return p.index = m, e ? (m = p.alternate, m !== null ? (m = m.index, m < s ? (p.flags |= 67108866, s) : m) : (p.flags |= 67108866, s)) : (p.flags |= 1048576, s);
    }
    function o(p) {
      return e && p.alternate === null && (p.flags |= 67108866), p;
    }
    function r(p, s, m, _) {
      return s === null || s.tag !== 6 ? (s = Ao(m, p.mode, _), s.return = p, s) : (s = l(s, m), s.return = p, s);
    }
    function u(p, s, m, _) {
      var B = m.type;
      return B === ge ? x(
        p,
        s,
        m.props.children,
        _,
        m.key
      ) : s !== null && (s.elementType === B || typeof B == "object" && B !== null && B.$$typeof === qe && Bt(B) === s.type) ? (s = l(s, m.props), Wi(s, m), s.return = p, s) : (s = Ll(
        m.type,
        m.key,
        m.props,
        null,
        p.mode,
        _
      ), Wi(s, m), s.return = p, s);
    }
    function g(p, s, m, _) {
      return s === null || s.tag !== 4 || s.stateNode.containerInfo !== m.containerInfo || s.stateNode.implementation !== m.implementation ? (s = Eo(m, p.mode, _), s.return = p, s) : (s = l(s, m.children || []), s.return = p, s);
    }
    function x(p, s, m, _, B) {
      return s === null || s.tag !== 7 ? (s = Nt(
        m,
        p.mode,
        _,
        B
      ), s.return = p, s) : (s = l(s, m), s.return = p, s);
    }
    function z(p, s, m) {
      if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
        return s = Ao(
          "" + s,
          p.mode,
          m
        ), s.return = p, s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case xe:
            return m = Ll(
              s.type,
              s.key,
              s.props,
              null,
              p.mode,
              m
            ), Wi(m, s), m.return = p, m;
          case Q:
            return s = Eo(
              s,
              p.mode,
              m
            ), s.return = p, s;
          case qe:
            return s = Bt(s), z(p, s, m);
        }
        if (Sa(s) || We(s))
          return s = Nt(
            s,
            p.mode,
            m,
            null
          ), s.return = p, s;
        if (typeof s.then == "function")
          return z(p, Fl(s), m);
        if (s.$$typeof === Z)
          return z(
            p,
            Kl(p, s),
            m
          );
        Il(p, s);
      }
      return null;
    }
    function b(p, s, m, _) {
      var B = s !== null ? s.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return B !== null ? null : r(p, s, "" + m, _);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case xe:
            return m.key === B ? u(p, s, m, _) : null;
          case Q:
            return m.key === B ? g(p, s, m, _) : null;
          case qe:
            return m = Bt(m), b(p, s, m, _);
        }
        if (Sa(m) || We(m))
          return B !== null ? null : x(p, s, m, _, null);
        if (typeof m.then == "function")
          return b(
            p,
            s,
            Fl(m),
            _
          );
        if (m.$$typeof === Z)
          return b(
            p,
            s,
            Kl(p, m),
            _
          );
        Il(p, m);
      }
      return null;
    }
    function h(p, s, m, _, B) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return p = p.get(m) || null, r(s, p, "" + _, B);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case xe:
            return p = p.get(
              _.key === null ? m : _.key
            ) || null, u(s, p, _, B);
          case Q:
            return p = p.get(
              _.key === null ? m : _.key
            ) || null, g(s, p, _, B);
          case qe:
            return _ = Bt(_), h(
              p,
              s,
              m,
              _,
              B
            );
        }
        if (Sa(_) || We(_))
          return p = p.get(m) || null, x(s, p, _, B, null);
        if (typeof _.then == "function")
          return h(
            p,
            s,
            m,
            Fl(_),
            B
          );
        if (_.$$typeof === Z)
          return h(
            p,
            s,
            m,
            Kl(s, _),
            B
          );
        Il(s, _);
      }
      return null;
    }
    function D(p, s, m, _) {
      for (var B = null, ie = null, j = s, J = s = 0, ee = null; j !== null && J < m.length; J++) {
        j.index > J ? (ee = j, j = null) : ee = j.sibling;
        var le = b(
          p,
          j,
          m[J],
          _
        );
        if (le === null) {
          j === null && (j = ee);
          break;
        }
        e && j && le.alternate === null && a(p, j), s = n(le, s, J), ie === null ? B = le : ie.sibling = le, ie = le, j = ee;
      }
      if (J === m.length)
        return t(p, j), ae && qa(p, J), B;
      if (j === null) {
        for (; J < m.length; J++)
          j = z(p, m[J], _), j !== null && (s = n(
            j,
            s,
            J
          ), ie === null ? B = j : ie.sibling = j, ie = j);
        return ae && qa(p, J), B;
      }
      for (j = i(j); J < m.length; J++)
        ee = h(
          j,
          p,
          J,
          m[J],
          _
        ), ee !== null && (e && ee.alternate !== null && j.delete(
          ee.key === null ? J : ee.key
        ), s = n(
          ee,
          s,
          J
        ), ie === null ? B = ee : ie.sibling = ee, ie = ee);
      return e && j.forEach(function(zt) {
        return a(p, zt);
      }), ae && qa(p, J), B;
    }
    function k(p, s, m, _) {
      if (m == null) throw Error(f(151));
      for (var B = null, ie = null, j = s, J = s = 0, ee = null, le = m.next(); j !== null && !le.done; J++, le = m.next()) {
        j.index > J ? (ee = j, j = null) : ee = j.sibling;
        var zt = b(p, j, le.value, _);
        if (zt === null) {
          j === null && (j = ee);
          break;
        }
        e && j && zt.alternate === null && a(p, j), s = n(zt, s, J), ie === null ? B = zt : ie.sibling = zt, ie = zt, j = ee;
      }
      if (le.done)
        return t(p, j), ae && qa(p, J), B;
      if (j === null) {
        for (; !le.done; J++, le = m.next())
          le = z(p, le.value, _), le !== null && (s = n(le, s, J), ie === null ? B = le : ie.sibling = le, ie = le);
        return ae && qa(p, J), B;
      }
      for (j = i(j); !le.done; J++, le = m.next())
        le = h(j, p, J, le.value, _), le !== null && (e && le.alternate !== null && j.delete(le.key === null ? J : le.key), s = n(le, s, J), ie === null ? B = le : ie.sibling = le, ie = le);
      return e && j.forEach(function(um) {
        return a(p, um);
      }), ae && qa(p, J), B;
    }
    function de(p, s, m, _) {
      if (typeof m == "object" && m !== null && m.type === ge && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case xe:
            e: {
              for (var B = m.key; s !== null; ) {
                if (s.key === B) {
                  if (B = m.type, B === ge) {
                    if (s.tag === 7) {
                      t(
                        p,
                        s.sibling
                      ), _ = l(
                        s,
                        m.props.children
                      ), _.return = p, p = _;
                      break e;
                    }
                  } else if (s.elementType === B || typeof B == "object" && B !== null && B.$$typeof === qe && Bt(B) === s.type) {
                    t(
                      p,
                      s.sibling
                    ), _ = l(s, m.props), Wi(_, m), _.return = p, p = _;
                    break e;
                  }
                  t(p, s);
                  break;
                } else a(p, s);
                s = s.sibling;
              }
              m.type === ge ? (_ = Nt(
                m.props.children,
                p.mode,
                _,
                m.key
              ), _.return = p, p = _) : (_ = Ll(
                m.type,
                m.key,
                m.props,
                null,
                p.mode,
                _
              ), Wi(_, m), _.return = p, p = _);
            }
            return o(p);
          case Q:
            e: {
              for (B = m.key; s !== null; ) {
                if (s.key === B)
                  if (s.tag === 4 && s.stateNode.containerInfo === m.containerInfo && s.stateNode.implementation === m.implementation) {
                    t(
                      p,
                      s.sibling
                    ), _ = l(s, m.children || []), _.return = p, p = _;
                    break e;
                  } else {
                    t(p, s);
                    break;
                  }
                else a(p, s);
                s = s.sibling;
              }
              _ = Eo(m, p.mode, _), _.return = p, p = _;
            }
            return o(p);
          case qe:
            return m = Bt(m), de(
              p,
              s,
              m,
              _
            );
        }
        if (Sa(m))
          return D(
            p,
            s,
            m,
            _
          );
        if (We(m)) {
          if (B = We(m), typeof B != "function") throw Error(f(150));
          return m = B.call(m), k(
            p,
            s,
            m,
            _
          );
        }
        if (typeof m.then == "function")
          return de(
            p,
            s,
            Fl(m),
            _
          );
        if (m.$$typeof === Z)
          return de(
            p,
            s,
            Kl(p, m),
            _
          );
        Il(p, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, s !== null && s.tag === 6 ? (t(p, s.sibling), _ = l(s, m), _.return = p, p = _) : (t(p, s), _ = Ao(m, p.mode, _), _.return = p, p = _), o(p)) : t(p, s);
    }
    return function(p, s, m, _) {
      try {
        Ji = 0;
        var B = de(
          p,
          s,
          m,
          _
        );
        return di = null, B;
      } catch (j) {
        if (j === fi || j === Wl) throw j;
        var ie = ua(29, j, null, p.mode);
        return ie.lanes = _, ie.return = p, ie;
      } finally {
      }
    };
  }
  var kt = jc(!0), Hc = jc(!1), ot = !1;
  function qo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ko(e, a) {
    e = e.updateQueue, a.updateQueue === e && (a.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function rt(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ut(e, a, t) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (ne & 2) !== 0) {
      var l = i.pending;
      return l === null ? a.next = a : (a.next = l.next, l.next = a), i.pending = a, a = Gl(e), xc(e, null, t), a;
    }
    return Ql(e, i, a, t), Gl(e);
  }
  function $i(e, a, t) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (t & 4194048) !== 0)) {
      var i = a.lanes;
      i &= e.pendingLanes, t |= i, a.lanes = t, Eu(e, t);
    }
  }
  function Zo(e, a) {
    var t = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, t === i)) {
      var l = null, n = null;
      if (t = t.firstBaseUpdate, t !== null) {
        do {
          var o = {
            lane: t.lane,
            tag: t.tag,
            payload: t.payload,
            callback: null,
            next: null
          };
          n === null ? l = n = o : n = n.next = o, t = t.next;
        } while (t !== null);
        n === null ? l = n = a : n = n.next = a;
      } else l = n = a;
      t = {
        baseState: i.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: n,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = t;
      return;
    }
    e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = a : e.next = a, t.lastBaseUpdate = a;
  }
  var Yo = !1;
  function Fi() {
    if (Yo) {
      var e = si;
      if (e !== null) throw e;
    }
  }
  function Ii(e, a, t, i) {
    Yo = !1;
    var l = e.updateQueue;
    ot = !1;
    var n = l.firstBaseUpdate, o = l.lastBaseUpdate, r = l.shared.pending;
    if (r !== null) {
      l.shared.pending = null;
      var u = r, g = u.next;
      u.next = null, o === null ? n = g : o.next = g, o = u;
      var x = e.alternate;
      x !== null && (x = x.updateQueue, r = x.lastBaseUpdate, r !== o && (r === null ? x.firstBaseUpdate = g : r.next = g, x.lastBaseUpdate = u));
    }
    if (n !== null) {
      var z = l.baseState;
      o = 0, x = g = u = null, r = n;
      do {
        var b = r.lane & -536870913, h = b !== r.lane;
        if (h ? (P & b) === b : (i & b) === b) {
          b !== 0 && b === ci && (Yo = !0), x !== null && (x = x.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          e: {
            var D = e, k = r;
            b = a;
            var de = t;
            switch (k.tag) {
              case 1:
                if (D = k.payload, typeof D == "function") {
                  z = D.call(de, z, b);
                  break e;
                }
                z = D;
                break e;
              case 3:
                D.flags = D.flags & -65537 | 128;
              case 0:
                if (D = k.payload, b = typeof D == "function" ? D.call(de, z, b) : D, b == null) break e;
                z = N({}, z, b);
                break e;
              case 2:
                ot = !0;
            }
          }
          b = r.callback, b !== null && (e.flags |= 64, h && (e.flags |= 8192), h = l.callbacks, h === null ? l.callbacks = [b] : h.push(b));
        } else
          h = {
            lane: b,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, x === null ? (g = x = h, u = z) : x = x.next = h, o |= b;
        if (r = r.next, r === null) {
          if (r = l.shared.pending, r === null)
            break;
          h = r, r = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
        }
      } while (!0);
      x === null && (u = z), l.baseState = u, l.firstBaseUpdate = g, l.lastBaseUpdate = x, n === null && (l.shared.lanes = 0), pt |= o, e.lanes = o, e.memoizedState = z;
    }
  }
  function Rc(e, a) {
    if (typeof e != "function")
      throw Error(f(191, e));
    e.call(a);
  }
  function Bc(e, a) {
    var t = e.callbacks;
    if (t !== null)
      for (e.callbacks = null, e = 0; e < t.length; e++)
        Rc(t[e], a);
  }
  var pi = d(null), Pl = d(0);
  function qc(e, a) {
    e = Wa, O(Pl, e), O(pi, a), Wa = e | a.baseLanes;
  }
  function Qo() {
    O(Pl, Wa), O(pi, pi.current);
  }
  function Go() {
    Wa = Pl.current, S(pi), S(Pl);
  }
  var ca = d(null), _a = null;
  function ct(e) {
    var a = e.alternate;
    O(Ee, Ee.current & 1), O(ca, e), _a === null && (a === null || pi.current !== null || a.memoizedState !== null) && (_a = e);
  }
  function Lo(e) {
    O(Ee, Ee.current), O(ca, e), _a === null && (_a = e);
  }
  function kc(e) {
    e.tag === 22 ? (O(Ee, Ee.current), O(ca, e), _a === null && (_a = e)) : st();
  }
  function st() {
    O(Ee, Ee.current), O(ca, ca.current);
  }
  function sa(e) {
    S(ca), _a === e && (_a = null), S(Ee);
  }
  var Ee = d(0);
  function en(e) {
    for (var a = e; a !== null; ) {
      if (a.tag === 13) {
        var t = a.memoizedState;
        if (t !== null && (t = t.dehydrated, t === null || $r(t) || Fr(t)))
          return a;
      } else if (a.tag === 19 && (a.memoizedProps.revealOrder === "forwards" || a.memoizedProps.revealOrder === "backwards" || a.memoizedProps.revealOrder === "unstable_legacy-backwards" || a.memoizedProps.revealOrder === "together")) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  var Ya = 0, V = null, se = null, De = null, an = !1, mi = !1, Zt = !1, tn = 0, Pi = 0, gi = null, I0 = 0;
  function ze() {
    throw Error(f(321));
  }
  function Xo(e, a) {
    if (a === null) return !1;
    for (var t = 0; t < a.length && t < e.length; t++)
      if (!ra(e[t], a[t])) return !1;
    return !0;
  }
  function Vo(e, a, t, i, l, n) {
    return Ya = n, V = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, y.H = e === null || e.memoizedState === null ? ws : rr, Zt = !1, n = t(i, l), Zt = !1, mi && (n = Yc(
      a,
      t,
      i,
      l
    )), Zc(e), n;
  }
  function Zc(e) {
    y.H = tl;
    var a = se !== null && se.next !== null;
    if (Ya = 0, De = se = V = null, an = !1, Pi = 0, gi = null, a) throw Error(f(300));
    e === null || Ne || (e = e.dependencies, e !== null && Vl(e) && (Ne = !0));
  }
  function Yc(e, a, t, i) {
    V = e;
    var l = 0;
    do {
      if (mi && (gi = null), Pi = 0, mi = !1, 25 <= l) throw Error(f(301));
      if (l += 1, De = se = null, e.updateQueue != null) {
        var n = e.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      y.H = zs, n = a(t, i);
    } while (mi);
    return n;
  }
  function P0() {
    var e = y.H, a = e.useState()[0];
    return a = typeof a.then == "function" ? el(a) : a, e = e.useState()[0], (se !== null ? se.memoizedState : null) !== e && (V.flags |= 1024), a;
  }
  function Ko() {
    var e = tn !== 0;
    return tn = 0, e;
  }
  function Jo(e, a, t) {
    a.updateQueue = e.updateQueue, a.flags &= -2053, e.lanes &= ~t;
  }
  function Wo(e) {
    if (an) {
      for (e = e.memoizedState; e !== null; ) {
        var a = e.queue;
        a !== null && (a.pending = null), e = e.next;
      }
      an = !1;
    }
    Ya = 0, De = se = V = null, mi = !1, Pi = tn = 0, gi = null;
  }
  function Ke() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return De === null ? V.memoizedState = De = e : De = De.next = e, De;
  }
  function Te() {
    if (se === null) {
      var e = V.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = se.next;
    var a = De === null ? V.memoizedState : De.next;
    if (a !== null)
      De = a, se = e;
    else {
      if (e === null)
        throw V.alternate === null ? Error(f(467)) : Error(f(310));
      se = e, e = {
        memoizedState: se.memoizedState,
        baseState: se.baseState,
        baseQueue: se.baseQueue,
        queue: se.queue,
        next: null
      }, De === null ? V.memoizedState = De = e : De = De.next = e;
    }
    return De;
  }
  function ln() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function el(e) {
    var a = Pi;
    return Pi += 1, gi === null && (gi = []), e = Dc(gi, e, a), a = V, (De === null ? a.memoizedState : De.next) === null && (a = a.alternate, y.H = a === null || a.memoizedState === null ? ws : rr), e;
  }
  function nn(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return el(e);
      if (e.$$typeof === Z) return Ye(e);
    }
    throw Error(f(438, String(e)));
  }
  function $o(e) {
    var a = null, t = V.updateQueue;
    if (t !== null && (a = t.memoCache), a == null) {
      var i = V.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (a = {
        data: i.data.map(function(l) {
          return l.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), t === null && (t = ln(), V.updateQueue = t), t.memoCache = a, t = a.data[a.index], t === void 0)
      for (t = a.data[a.index] = Array(e), i = 0; i < e; i++)
        t[i] = Lt;
    return a.index++, t;
  }
  function Qa(e, a) {
    return typeof a == "function" ? a(e) : a;
  }
  function on(e) {
    var a = Te();
    return Fo(a, se, e);
  }
  function Fo(e, a, t) {
    var i = e.queue;
    if (i === null) throw Error(f(311));
    i.lastRenderedReducer = t;
    var l = e.baseQueue, n = i.pending;
    if (n !== null) {
      if (l !== null) {
        var o = l.next;
        l.next = n.next, n.next = o;
      }
      a.baseQueue = l = n, i.pending = null;
    }
    if (n = e.baseState, l === null) e.memoizedState = n;
    else {
      a = l.next;
      var r = o = null, u = null, g = a, x = !1;
      do {
        var z = g.lane & -536870913;
        if (z !== g.lane ? (P & z) === z : (Ya & z) === z) {
          var b = g.revertLane;
          if (b === 0)
            u !== null && (u = u.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }), z === ci && (x = !0);
          else if ((Ya & b) === b) {
            g = g.next, b === ci && (x = !0);
            continue;
          } else
            z = {
              lane: 0,
              revertLane: g.revertLane,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, u === null ? (r = u = z, o = n) : u = u.next = z, V.lanes |= b, pt |= b;
          z = g.action, Zt && t(n, z), n = g.hasEagerState ? g.eagerState : t(n, z);
        } else
          b = {
            lane: z,
            revertLane: g.revertLane,
            gesture: g.gesture,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          }, u === null ? (r = u = b, o = n) : u = u.next = b, V.lanes |= z, pt |= z;
        g = g.next;
      } while (g !== null && g !== a);
      if (u === null ? o = n : u.next = r, !ra(n, e.memoizedState) && (Ne = !0, x && (t = si, t !== null)))
        throw t;
      e.memoizedState = n, e.baseState = o, e.baseQueue = u, i.lastRenderedState = n;
    }
    return l === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Io(e) {
    var a = Te(), t = a.queue;
    if (t === null) throw Error(f(311));
    t.lastRenderedReducer = e;
    var i = t.dispatch, l = t.pending, n = a.memoizedState;
    if (l !== null) {
      t.pending = null;
      var o = l = l.next;
      do
        n = e(n, o.action), o = o.next;
      while (o !== l);
      ra(n, a.memoizedState) || (Ne = !0), a.memoizedState = n, a.baseQueue === null && (a.baseState = n), t.lastRenderedState = n;
    }
    return [n, i];
  }
  function Qc(e, a, t) {
    var i = V, l = Te(), n = ae;
    if (n) {
      if (t === void 0) throw Error(f(407));
      t = t();
    } else t = a();
    var o = !ra(
      (se || l).memoizedState,
      t
    );
    if (o && (l.memoizedState = t, Ne = !0), l = l.queue, ar(Xc.bind(null, i, l, e), [
      e
    ]), l.getSnapshot !== a || o || De !== null && De.memoizedState.tag & 1) {
      if (i.flags |= 2048, bi(
        9,
        { destroy: void 0 },
        Lc.bind(
          null,
          i,
          l,
          t,
          a
        ),
        null
      ), me === null) throw Error(f(349));
      n || (Ya & 127) !== 0 || Gc(i, a, t);
    }
    return t;
  }
  function Gc(e, a, t) {
    e.flags |= 16384, e = { getSnapshot: a, value: t }, a = V.updateQueue, a === null ? (a = ln(), V.updateQueue = a, a.stores = [e]) : (t = a.stores, t === null ? a.stores = [e] : t.push(e));
  }
  function Lc(e, a, t, i) {
    a.value = t, a.getSnapshot = i, Vc(a) && Kc(e);
  }
  function Xc(e, a, t) {
    return t(function() {
      Vc(a) && Kc(e);
    });
  }
  function Vc(e) {
    var a = e.getSnapshot;
    e = e.value;
    try {
      var t = a();
      return !ra(e, t);
    } catch {
      return !0;
    }
  }
  function Kc(e) {
    var a = Dt(e, 2);
    a !== null && ta(a, e, 2);
  }
  function Po(e) {
    var a = Ke();
    if (typeof e == "function") {
      var t = e;
      if (e = t(), Zt) {
        Pa(!0);
        try {
          t();
        } finally {
          Pa(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = e, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qa,
      lastRenderedState: e
    }, a;
  }
  function Jc(e, a, t, i) {
    return e.baseState = t, Fo(
      e,
      se,
      typeof i == "function" ? i : Qa
    );
  }
  function ep(e, a, t, i, l) {
    if (cn(e)) throw Error(f(485));
    if (e = a.action, e !== null) {
      var n = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(o) {
          n.listeners.push(o);
        }
      };
      y.T !== null ? t(!0) : n.isTransition = !1, i(n), t = a.pending, t === null ? (n.next = a.pending = n, Wc(a, n)) : (n.next = t.next, a.pending = t.next = n);
    }
  }
  function Wc(e, a) {
    var t = a.action, i = a.payload, l = e.state;
    if (a.isTransition) {
      var n = y.T, o = {};
      y.T = o;
      try {
        var r = t(l, i), u = y.S;
        u !== null && u(o, r), $c(e, a, r);
      } catch (g) {
        er(e, a, g);
      } finally {
        n !== null && o.types !== null && (n.types = o.types), y.T = n;
      }
    } else
      try {
        n = t(l, i), $c(e, a, n);
      } catch (g) {
        er(e, a, g);
      }
  }
  function $c(e, a, t) {
    t !== null && typeof t == "object" && typeof t.then == "function" ? t.then(
      function(i) {
        Fc(e, a, i);
      },
      function(i) {
        return er(e, a, i);
      }
    ) : Fc(e, a, t);
  }
  function Fc(e, a, t) {
    a.status = "fulfilled", a.value = t, Ic(a), e.state = t, a = e.pending, a !== null && (t = a.next, t === a ? e.pending = null : (t = t.next, a.next = t, Wc(e, t)));
  }
  function er(e, a, t) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        a.status = "rejected", a.reason = t, Ic(a), a = a.next;
      while (a !== i);
    }
    e.action = null;
  }
  function Ic(e) {
    e = e.listeners;
    for (var a = 0; a < e.length; a++) (0, e[a])();
  }
  function Pc(e, a) {
    return a;
  }
  function es(e, a) {
    if (ae) {
      var t = me.formState;
      if (t !== null) {
        e: {
          var i = V;
          if (ae) {
            if (be) {
              a: {
                for (var l = be, n = ya; l.nodeType !== 8; ) {
                  if (!n) {
                    l = null;
                    break a;
                  }
                  if (l = wa(
                    l.nextSibling
                  ), l === null) {
                    l = null;
                    break a;
                  }
                }
                n = l.data, l = n === "F!" || n === "F" ? l : null;
              }
              if (l) {
                be = wa(
                  l.nextSibling
                ), i = l.data === "F!";
                break e;
              }
            }
            lt(i);
          }
          i = !1;
        }
        i && (a = t[0]);
      }
    }
    return t = Ke(), t.memoizedState = t.baseState = a, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pc,
      lastRenderedState: a
    }, t.queue = i, t = vs.bind(
      null,
      V,
      i
    ), i.dispatch = t, i = Po(!1), n = or.bind(
      null,
      V,
      !1,
      i.queue
    ), i = Ke(), l = {
      state: a,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = l, t = ep.bind(
      null,
      V,
      l,
      n,
      t
    ), l.dispatch = t, i.memoizedState = e, [a, t, !1];
  }
  function as(e) {
    var a = Te();
    return ts(a, se, e);
  }
  function ts(e, a, t) {
    if (a = Fo(
      e,
      a,
      Pc
    )[0], e = on(Qa)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var i = el(a);
      } catch (o) {
        throw o === fi ? Wl : o;
      }
    else i = a;
    a = Te();
    var l = a.queue, n = l.dispatch;
    return t !== a.memoizedState && (V.flags |= 2048, bi(
      9,
      { destroy: void 0 },
      ap.bind(null, l, t),
      null
    )), [i, n, e];
  }
  function ap(e, a) {
    e.action = a;
  }
  function is(e) {
    var a = Te(), t = se;
    if (t !== null)
      return ts(a, t, e);
    Te(), a = a.memoizedState, t = Te();
    var i = t.queue.dispatch;
    return t.memoizedState = e, [a, i, !1];
  }
  function bi(e, a, t, i) {
    return e = { tag: e, create: t, deps: i, inst: a, next: null }, a = V.updateQueue, a === null && (a = ln(), V.updateQueue = a), t = a.lastEffect, t === null ? a.lastEffect = e.next = e : (i = t.next, t.next = e, e.next = i, a.lastEffect = e), e;
  }
  function ls() {
    return Te().memoizedState;
  }
  function rn(e, a, t, i) {
    var l = Ke();
    V.flags |= e, l.memoizedState = bi(
      1 | a,
      { destroy: void 0 },
      t,
      i === void 0 ? null : i
    );
  }
  function un(e, a, t, i) {
    var l = Te();
    i = i === void 0 ? null : i;
    var n = l.memoizedState.inst;
    se !== null && i !== null && Xo(i, se.memoizedState.deps) ? l.memoizedState = bi(a, n, t, i) : (V.flags |= e, l.memoizedState = bi(
      1 | a,
      n,
      t,
      i
    ));
  }
  function ns(e, a) {
    rn(8390656, 8, e, a);
  }
  function ar(e, a) {
    un(2048, 8, e, a);
  }
  function tp(e) {
    V.flags |= 4;
    var a = V.updateQueue;
    if (a === null)
      a = ln(), V.updateQueue = a, a.events = [e];
    else {
      var t = a.events;
      t === null ? a.events = [e] : t.push(e);
    }
  }
  function os(e) {
    var a = Te().memoizedState;
    return tp({ ref: a, nextImpl: e }), function() {
      if ((ne & 2) !== 0) throw Error(f(440));
      return a.impl.apply(void 0, arguments);
    };
  }
  function rs(e, a) {
    return un(4, 2, e, a);
  }
  function us(e, a) {
    return un(4, 4, e, a);
  }
  function cs(e, a) {
    if (typeof a == "function") {
      e = e();
      var t = a(e);
      return function() {
        typeof t == "function" ? t() : a(null);
      };
    }
    if (a != null)
      return e = e(), a.current = e, function() {
        a.current = null;
      };
  }
  function ss(e, a, t) {
    t = t != null ? t.concat([e]) : null, un(4, 4, cs.bind(null, a, e), t);
  }
  function tr() {
  }
  function fs(e, a) {
    var t = Te();
    a = a === void 0 ? null : a;
    var i = t.memoizedState;
    return a !== null && Xo(a, i[1]) ? i[0] : (t.memoizedState = [e, a], e);
  }
  function ds(e, a) {
    var t = Te();
    a = a === void 0 ? null : a;
    var i = t.memoizedState;
    if (a !== null && Xo(a, i[1]))
      return i[0];
    if (i = e(), Zt) {
      Pa(!0);
      try {
        e();
      } finally {
        Pa(!1);
      }
    }
    return t.memoizedState = [i, a], i;
  }
  function ir(e, a, t) {
    return t === void 0 || (Ya & 1073741824) !== 0 && (P & 261930) === 0 ? e.memoizedState = a : (e.memoizedState = t, e = mf(), V.lanes |= e, pt |= e, t);
  }
  function ps(e, a, t, i) {
    return ra(t, a) ? t : pi.current !== null ? (e = ir(e, t, i), ra(e, a) || (Ne = !0), e) : (Ya & 42) === 0 || (Ya & 1073741824) !== 0 && (P & 261930) === 0 ? (Ne = !0, e.memoizedState = t) : (e = mf(), V.lanes |= e, pt |= e, a);
  }
  function ms(e, a, t, i, l) {
    var n = M.p;
    M.p = n !== 0 && 8 > n ? n : 8;
    var o = y.T, r = {};
    y.T = r, or(e, !1, a, t);
    try {
      var u = l(), g = y.S;
      if (g !== null && g(r, u), u !== null && typeof u == "object" && typeof u.then == "function") {
        var x = F0(
          u,
          i
        );
        al(
          e,
          a,
          x,
          pa(e)
        );
      } else
        al(
          e,
          a,
          i,
          pa(e)
        );
    } catch (z) {
      al(
        e,
        a,
        { then: function() {
        }, status: "rejected", reason: z },
        pa()
      );
    } finally {
      M.p = n, o !== null && r.types !== null && (o.types = r.types), y.T = o;
    }
  }
  function ip() {
  }
  function lr(e, a, t, i) {
    if (e.tag !== 5) throw Error(f(476));
    var l = gs(e).queue;
    ms(
      e,
      l,
      a,
      Y,
      t === null ? ip : function() {
        return bs(e), t(i);
      }
    );
  }
  function gs(e) {
    var a = e.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qa,
        lastRenderedState: Y
      },
      next: null
    };
    var t = {};
    return a.next = {
      memoizedState: t,
      baseState: t,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Qa,
        lastRenderedState: t
      },
      next: null
    }, e.memoizedState = a, e = e.alternate, e !== null && (e.memoizedState = a), a;
  }
  function bs(e) {
    var a = gs(e);
    a.next === null && (a = e.alternate.memoizedState), al(
      e,
      a.next.queue,
      {},
      pa()
    );
  }
  function nr() {
    return Ye(xl);
  }
  function hs() {
    return Te().memoizedState;
  }
  function xs() {
    return Te().memoizedState;
  }
  function lp(e) {
    for (var a = e.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var t = pa();
          e = rt(t);
          var i = ut(a, e, t);
          i !== null && (ta(i, a, t), $i(i, a, t)), a = { cache: jo() }, e.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function np(e, a, t) {
    var i = pa();
    t = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(e) ? ys(a, t) : (t = zo(e, a, t, i), t !== null && (ta(t, e, i), _s(t, a, i)));
  }
  function vs(e, a, t) {
    var i = pa();
    al(e, a, t, i);
  }
  function al(e, a, t, i) {
    var l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cn(e)) ys(a, l);
    else {
      var n = e.alternate;
      if (e.lanes === 0 && (n === null || n.lanes === 0) && (n = a.lastRenderedReducer, n !== null))
        try {
          var o = a.lastRenderedState, r = n(o, t);
          if (l.hasEagerState = !0, l.eagerState = r, ra(r, o))
            return Ql(e, a, l, 0), me === null && Yl(), !1;
        } catch {
        } finally {
        }
      if (t = zo(e, a, l, i), t !== null)
        return ta(t, e, i), _s(t, a, i), !0;
    }
    return !1;
  }
  function or(e, a, t, i) {
    if (i = {
      lane: 2,
      revertLane: qr(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(e)) {
      if (a) throw Error(f(479));
    } else
      a = zo(
        e,
        t,
        i,
        2
      ), a !== null && ta(a, e, 2);
  }
  function cn(e) {
    var a = e.alternate;
    return e === V || a !== null && a === V;
  }
  function ys(e, a) {
    mi = an = !0;
    var t = e.pending;
    t === null ? a.next = a : (a.next = t.next, t.next = a), e.pending = a;
  }
  function _s(e, a, t) {
    if ((t & 4194048) !== 0) {
      var i = a.lanes;
      i &= e.pendingLanes, t |= i, a.lanes = t, Eu(e, t);
    }
  }
  var tl = {
    readContext: Ye,
    use: nn,
    useCallback: ze,
    useContext: ze,
    useEffect: ze,
    useImperativeHandle: ze,
    useLayoutEffect: ze,
    useInsertionEffect: ze,
    useMemo: ze,
    useReducer: ze,
    useRef: ze,
    useState: ze,
    useDebugValue: ze,
    useDeferredValue: ze,
    useTransition: ze,
    useSyncExternalStore: ze,
    useId: ze,
    useHostTransitionStatus: ze,
    useFormState: ze,
    useActionState: ze,
    useOptimistic: ze,
    useMemoCache: ze,
    useCacheRefresh: ze
  };
  tl.useEffectEvent = ze;
  var ws = {
    readContext: Ye,
    use: nn,
    useCallback: function(e, a) {
      return Ke().memoizedState = [
        e,
        a === void 0 ? null : a
      ], e;
    },
    useContext: Ye,
    useEffect: ns,
    useImperativeHandle: function(e, a, t) {
      t = t != null ? t.concat([e]) : null, rn(
        4194308,
        4,
        cs.bind(null, a, e),
        t
      );
    },
    useLayoutEffect: function(e, a) {
      return rn(4194308, 4, e, a);
    },
    useInsertionEffect: function(e, a) {
      rn(4, 2, e, a);
    },
    useMemo: function(e, a) {
      var t = Ke();
      a = a === void 0 ? null : a;
      var i = e();
      if (Zt) {
        Pa(!0);
        try {
          e();
        } finally {
          Pa(!1);
        }
      }
      return t.memoizedState = [i, a], i;
    },
    useReducer: function(e, a, t) {
      var i = Ke();
      if (t !== void 0) {
        var l = t(a);
        if (Zt) {
          Pa(!0);
          try {
            t(a);
          } finally {
            Pa(!1);
          }
        }
      } else l = a;
      return i.memoizedState = i.baseState = l, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: l
      }, i.queue = e, e = e.dispatch = np.bind(
        null,
        V,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var a = Ke();
      return e = { current: e }, a.memoizedState = e;
    },
    useState: function(e) {
      e = Po(e);
      var a = e.queue, t = vs.bind(null, V, a);
      return a.dispatch = t, [e.memoizedState, t];
    },
    useDebugValue: tr,
    useDeferredValue: function(e, a) {
      var t = Ke();
      return ir(t, e, a);
    },
    useTransition: function() {
      var e = Po(!1);
      return e = ms.bind(
        null,
        V,
        e.queue,
        !0,
        !1
      ), Ke().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, a, t) {
      var i = V, l = Ke();
      if (ae) {
        if (t === void 0)
          throw Error(f(407));
        t = t();
      } else {
        if (t = a(), me === null)
          throw Error(f(349));
        (P & 127) !== 0 || Gc(i, a, t);
      }
      l.memoizedState = t;
      var n = { value: t, getSnapshot: a };
      return l.queue = n, ns(Xc.bind(null, i, n, e), [
        e
      ]), i.flags |= 2048, bi(
        9,
        { destroy: void 0 },
        Lc.bind(
          null,
          i,
          n,
          t,
          a
        ),
        null
      ), t;
    },
    useId: function() {
      var e = Ke(), a = me.identifierPrefix;
      if (ae) {
        var t = Ca, i = Oa;
        t = (i & ~(1 << 32 - oa(i) - 1)).toString(32) + t, a = "_" + a + "R_" + t, t = tn++, 0 < t && (a += "H" + t.toString(32)), a += "_";
      } else
        t = I0++, a = "_" + a + "r_" + t.toString(32) + "_";
      return e.memoizedState = a;
    },
    useHostTransitionStatus: nr,
    useFormState: es,
    useActionState: es,
    useOptimistic: function(e) {
      var a = Ke();
      a.memoizedState = a.baseState = e;
      var t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = t, a = or.bind(
        null,
        V,
        !0,
        t
      ), t.dispatch = a, [e, a];
    },
    useMemoCache: $o,
    useCacheRefresh: function() {
      return Ke().memoizedState = lp.bind(
        null,
        V
      );
    },
    useEffectEvent: function(e) {
      var a = Ke(), t = { impl: e };
      return a.memoizedState = t, function() {
        if ((ne & 2) !== 0)
          throw Error(f(440));
        return t.impl.apply(void 0, arguments);
      };
    }
  }, rr = {
    readContext: Ye,
    use: nn,
    useCallback: fs,
    useContext: Ye,
    useEffect: ar,
    useImperativeHandle: ss,
    useInsertionEffect: rs,
    useLayoutEffect: us,
    useMemo: ds,
    useReducer: on,
    useRef: ls,
    useState: function() {
      return on(Qa);
    },
    useDebugValue: tr,
    useDeferredValue: function(e, a) {
      var t = Te();
      return ps(
        t,
        se.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = on(Qa)[0], a = Te().memoizedState;
      return [
        typeof e == "boolean" ? e : el(e),
        a
      ];
    },
    useSyncExternalStore: Qc,
    useId: hs,
    useHostTransitionStatus: nr,
    useFormState: as,
    useActionState: as,
    useOptimistic: function(e, a) {
      var t = Te();
      return Jc(t, se, e, a);
    },
    useMemoCache: $o,
    useCacheRefresh: xs
  };
  rr.useEffectEvent = os;
  var zs = {
    readContext: Ye,
    use: nn,
    useCallback: fs,
    useContext: Ye,
    useEffect: ar,
    useImperativeHandle: ss,
    useInsertionEffect: rs,
    useLayoutEffect: us,
    useMemo: ds,
    useReducer: Io,
    useRef: ls,
    useState: function() {
      return Io(Qa);
    },
    useDebugValue: tr,
    useDeferredValue: function(e, a) {
      var t = Te();
      return se === null ? ir(t, e, a) : ps(
        t,
        se.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = Io(Qa)[0], a = Te().memoizedState;
      return [
        typeof e == "boolean" ? e : el(e),
        a
      ];
    },
    useSyncExternalStore: Qc,
    useId: hs,
    useHostTransitionStatus: nr,
    useFormState: is,
    useActionState: is,
    useOptimistic: function(e, a) {
      var t = Te();
      return se !== null ? Jc(t, se, e, a) : (t.baseState = e, [e, t.queue.dispatch]);
    },
    useMemoCache: $o,
    useCacheRefresh: xs
  };
  zs.useEffectEvent = os;
  function ur(e, a, t, i) {
    a = e.memoizedState, t = t(i, a), t = t == null ? a : N({}, a, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
  }
  var cr = {
    enqueueSetState: function(e, a, t) {
      e = e._reactInternals;
      var i = pa(), l = rt(i);
      l.payload = a, t != null && (l.callback = t), a = ut(e, l, i), a !== null && (ta(a, e, i), $i(a, e, i));
    },
    enqueueReplaceState: function(e, a, t) {
      e = e._reactInternals;
      var i = pa(), l = rt(i);
      l.tag = 1, l.payload = a, t != null && (l.callback = t), a = ut(e, l, i), a !== null && (ta(a, e, i), $i(a, e, i));
    },
    enqueueForceUpdate: function(e, a) {
      e = e._reactInternals;
      var t = pa(), i = rt(t);
      i.tag = 2, a != null && (i.callback = a), a = ut(e, i, t), a !== null && (ta(a, e, t), $i(a, e, t));
    }
  };
  function Ss(e, a, t, i, l, n, o) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, n, o) : a.prototype && a.prototype.isPureReactComponent ? !Qi(t, i) || !Qi(l, n) : !0;
  }
  function As(e, a, t, i) {
    e = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(t, i), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(t, i), a.state !== e && cr.enqueueReplaceState(a, a.state, null);
  }
  function Yt(e, a) {
    var t = a;
    if ("ref" in a) {
      t = {};
      for (var i in a)
        i !== "ref" && (t[i] = a[i]);
    }
    if (e = e.defaultProps) {
      t === a && (t = N({}, t));
      for (var l in e)
        t[l] === void 0 && (t[l] = e[l]);
    }
    return t;
  }
  function Es(e) {
    Zl(e);
  }
  function Ts(e) {
    console.error(e);
  }
  function Ms(e) {
    Zl(e);
  }
  function sn(e, a) {
    try {
      var t = e.onUncaughtError;
      t(a.value, { componentStack: a.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Os(e, a, t) {
    try {
      var i = e.onCaughtError;
      i(t.value, {
        componentStack: t.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null
      });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function sr(e, a, t) {
    return t = rt(t), t.tag = 3, t.payload = { element: null }, t.callback = function() {
      sn(e, a);
    }, t;
  }
  function Cs(e) {
    return e = rt(e), e.tag = 3, e;
  }
  function Ds(e, a, t, i) {
    var l = t.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var n = i.value;
      e.payload = function() {
        return l(n);
      }, e.callback = function() {
        Os(a, t, i);
      };
    }
    var o = t.stateNode;
    o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
      Os(a, t, i), typeof l != "function" && (mt === null ? mt = /* @__PURE__ */ new Set([this]) : mt.add(this));
      var r = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function op(e, a, t, i, l) {
    if (t.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (a = t.alternate, a !== null && ui(
        a,
        t,
        l,
        !0
      ), t = ca.current, t !== null) {
        switch (t.tag) {
          case 31:
          case 13:
            return _a === null ? wn() : t.alternate === null && Se === 0 && (Se = 3), t.flags &= -257, t.flags |= 65536, t.lanes = l, i === $l ? t.flags |= 16384 : (a = t.updateQueue, a === null ? t.updateQueue = /* @__PURE__ */ new Set([i]) : a.add(i), Hr(e, i, l)), !1;
          case 22:
            return t.flags |= 65536, i === $l ? t.flags |= 16384 : (a = t.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, t.updateQueue = a) : (t = a.retryQueue, t === null ? a.retryQueue = /* @__PURE__ */ new Set([i]) : t.add(i)), Hr(e, i, l)), !1;
        }
        throw Error(f(435, t.tag));
      }
      return Hr(e, i, l), wn(), !1;
    }
    if (ae)
      return a = ca.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = l, i !== Oo && (e = Error(f(422), { cause: i }), Xi(ha(e, t)))) : (i !== Oo && (a = Error(f(423), {
        cause: i
      }), Xi(
        ha(a, t)
      )), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, i = ha(i, t), l = sr(
        e.stateNode,
        i,
        l
      ), Zo(e, l), Se !== 4 && (Se = 2)), !1;
    var n = Error(f(520), { cause: i });
    if (n = ha(n, t), sl === null ? sl = [n] : sl.push(n), Se !== 4 && (Se = 2), a === null) return !0;
    i = ha(i, t), t = a;
    do {
      switch (t.tag) {
        case 3:
          return t.flags |= 65536, e = l & -l, t.lanes |= e, e = sr(t.stateNode, i, e), Zo(t, e), !1;
        case 1:
          if (a = t.type, n = t.stateNode, (t.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (mt === null || !mt.has(n))))
            return t.flags |= 65536, l &= -l, t.lanes |= l, l = Cs(l), Ds(
              l,
              e,
              t,
              i
            ), Zo(t, l), !1;
      }
      t = t.return;
    } while (t !== null);
    return !1;
  }
  var fr = Error(f(461)), Ne = !1;
  function Qe(e, a, t, i) {
    a.child = e === null ? Hc(a, null, t, i) : kt(
      a,
      e.child,
      t,
      i
    );
  }
  function Ns(e, a, t, i, l) {
    t = t.render;
    var n = a.ref;
    if ("ref" in i) {
      var o = {};
      for (var r in i)
        r !== "ref" && (o[r] = i[r]);
    } else o = i;
    return Ht(a), i = Vo(
      e,
      a,
      t,
      o,
      n,
      l
    ), r = Ko(), e !== null && !Ne ? (Jo(e, a, l), Ga(e, a, l)) : (ae && r && To(a), a.flags |= 1, Qe(e, a, i, l), a.child);
  }
  function Us(e, a, t, i, l) {
    if (e === null) {
      var n = t.type;
      return typeof n == "function" && !So(n) && n.defaultProps === void 0 && t.compare === null ? (a.tag = 15, a.type = n, js(
        e,
        a,
        n,
        i,
        l
      )) : (e = Ll(
        t.type,
        null,
        i,
        a,
        a.mode,
        l
      ), e.ref = a.ref, e.return = a, a.child = e);
    }
    if (n = e.child, !vr(e, l)) {
      var o = n.memoizedProps;
      if (t = t.compare, t = t !== null ? t : Qi, t(o, i) && e.ref === a.ref)
        return Ga(e, a, l);
    }
    return a.flags |= 1, e = Ba(n, i), e.ref = a.ref, e.return = a, a.child = e;
  }
  function js(e, a, t, i, l) {
    if (e !== null) {
      var n = e.memoizedProps;
      if (Qi(n, i) && e.ref === a.ref)
        if (Ne = !1, a.pendingProps = i = n, vr(e, l))
          (e.flags & 131072) !== 0 && (Ne = !0);
        else
          return a.lanes = e.lanes, Ga(e, a, l);
    }
    return dr(
      e,
      a,
      t,
      i,
      l
    );
  }
  function Hs(e, a, t, i) {
    var l = i.children, n = e !== null ? e.memoizedState : null;
    if (e === null && a.stateNode === null && (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | t : t, e !== null) {
          for (i = a.child = e.child, l = 0; i !== null; )
            l = l | i.lanes | i.childLanes, i = i.sibling;
          i = l & ~n;
        } else i = 0, a.child = null;
        return Rs(
          e,
          a,
          n,
          t,
          i
        );
      }
      if ((t & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Jl(
          a,
          n !== null ? n.cachePool : null
        ), n !== null ? qc(a, n) : Qo(), kc(a);
      else
        return i = a.lanes = 536870912, Rs(
          e,
          a,
          n !== null ? n.baseLanes | t : t,
          t,
          i
        );
    } else
      n !== null ? (Jl(a, n.cachePool), qc(a, n), st(), a.memoizedState = null) : (e !== null && Jl(a, null), Qo(), st());
    return Qe(e, a, l, t), a.child;
  }
  function il(e, a) {
    return e !== null && e.tag === 22 || a.stateNode !== null || (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.sibling;
  }
  function Rs(e, a, t, i, l) {
    var n = Ro();
    return n = n === null ? null : { parent: Ce._currentValue, pool: n }, a.memoizedState = {
      baseLanes: t,
      cachePool: n
    }, e !== null && Jl(a, null), Qo(), kc(a), e !== null && ui(e, a, i, !0), a.childLanes = l, null;
  }
  function fn(e, a) {
    return a = pn(
      { mode: a.mode, children: a.children },
      e.mode
    ), a.ref = e.ref, e.child = a, a.return = e, a;
  }
  function Bs(e, a, t) {
    return kt(a, e.child, null, t), e = fn(a, a.pendingProps), e.flags |= 2, sa(a), a.memoizedState = null, e;
  }
  function rp(e, a, t) {
    var i = a.pendingProps, l = (a.flags & 128) !== 0;
    if (a.flags &= -129, e === null) {
      if (ae) {
        if (i.mode === "hidden")
          return e = fn(a, i), a.lanes = 536870912, il(null, e);
        if (Lo(a), (e = be) ? (e = $f(
          e,
          ya
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: tt !== null ? { id: Oa, overflow: Ca } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, t = yc(e), t.return = a, a.child = t, Ze = a, be = null)) : e = null, e === null) throw lt(a);
        return a.lanes = 536870912, null;
      }
      return fn(a, i);
    }
    var n = e.memoizedState;
    if (n !== null) {
      var o = n.dehydrated;
      if (Lo(a), l)
        if (a.flags & 256)
          a.flags &= -257, a = Bs(
            e,
            a,
            t
          );
        else if (a.memoizedState !== null)
          a.child = e.child, a.flags |= 128, a = null;
        else throw Error(f(558));
      else if (Ne || ui(e, a, t, !1), l = (t & e.childLanes) !== 0, Ne || l) {
        if (i = me, i !== null && (o = Tu(i, t), o !== 0 && o !== n.retryLane))
          throw n.retryLane = o, Dt(e, o), ta(i, e, o), fr;
        wn(), a = Bs(
          e,
          a,
          t
        );
      } else
        e = n.treeContext, be = wa(o.nextSibling), Ze = a, ae = !0, it = null, ya = !1, e !== null && zc(a, e), a = fn(a, i), a.flags |= 4096;
      return a;
    }
    return e = Ba(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = a.ref, a.child = e, e.return = a, e;
  }
  function dn(e, a) {
    var t = a.ref;
    if (t === null)
      e !== null && e.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof t != "function" && typeof t != "object")
        throw Error(f(284));
      (e === null || e.ref !== t) && (a.flags |= 4194816);
    }
  }
  function dr(e, a, t, i, l) {
    return Ht(a), t = Vo(
      e,
      a,
      t,
      i,
      void 0,
      l
    ), i = Ko(), e !== null && !Ne ? (Jo(e, a, l), Ga(e, a, l)) : (ae && i && To(a), a.flags |= 1, Qe(e, a, t, l), a.child);
  }
  function qs(e, a, t, i, l, n) {
    return Ht(a), a.updateQueue = null, t = Yc(
      a,
      i,
      t,
      l
    ), Zc(e), i = Ko(), e !== null && !Ne ? (Jo(e, a, n), Ga(e, a, n)) : (ae && i && To(a), a.flags |= 1, Qe(e, a, t, n), a.child);
  }
  function ks(e, a, t, i, l) {
    if (Ht(a), a.stateNode === null) {
      var n = li, o = t.contextType;
      typeof o == "object" && o !== null && (n = Ye(o)), n = new t(i, n), a.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = cr, a.stateNode = n, n._reactInternals = a, n = a.stateNode, n.props = i, n.state = a.memoizedState, n.refs = {}, qo(a), o = t.contextType, n.context = typeof o == "object" && o !== null ? Ye(o) : li, n.state = a.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (ur(
        a,
        t,
        o,
        i
      ), n.state = a.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (o = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), o !== n.state && cr.enqueueReplaceState(n, n.state, null), Ii(a, i, n, l), Fi(), n.state = a.memoizedState), typeof n.componentDidMount == "function" && (a.flags |= 4194308), i = !0;
    } else if (e === null) {
      n = a.stateNode;
      var r = a.memoizedProps, u = Yt(t, r);
      n.props = u;
      var g = n.context, x = t.contextType;
      o = li, typeof x == "object" && x !== null && (o = Ye(x));
      var z = t.getDerivedStateFromProps;
      x = typeof z == "function" || typeof n.getSnapshotBeforeUpdate == "function", r = a.pendingProps !== r, x || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (r || g !== o) && As(
        a,
        n,
        i,
        o
      ), ot = !1;
      var b = a.memoizedState;
      n.state = b, Ii(a, i, n, l), Fi(), g = a.memoizedState, r || b !== g || ot ? (typeof z == "function" && (ur(
        a,
        t,
        z,
        i
      ), g = a.memoizedState), (u = ot || Ss(
        a,
        t,
        u,
        i,
        b,
        g,
        o
      )) ? (x || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = i, a.memoizedState = g), n.props = i, n.state = g, n.context = o, i = u) : (typeof n.componentDidMount == "function" && (a.flags |= 4194308), i = !1);
    } else {
      n = a.stateNode, ko(e, a), o = a.memoizedProps, x = Yt(t, o), n.props = x, z = a.pendingProps, b = n.context, g = t.contextType, u = li, typeof g == "object" && g !== null && (u = Ye(g)), r = t.getDerivedStateFromProps, (g = typeof r == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (o !== z || b !== u) && As(
        a,
        n,
        i,
        u
      ), ot = !1, b = a.memoizedState, n.state = b, Ii(a, i, n, l), Fi();
      var h = a.memoizedState;
      o !== z || b !== h || ot || e !== null && e.dependencies !== null && Vl(e.dependencies) ? (typeof r == "function" && (ur(
        a,
        t,
        r,
        i
      ), h = a.memoizedState), (x = ot || Ss(
        a,
        t,
        x,
        i,
        b,
        h,
        u
      ) || e !== null && e.dependencies !== null && Vl(e.dependencies)) ? (g || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(i, h, u), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        i,
        h,
        u
      )), typeof n.componentDidUpdate == "function" && (a.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || o === e.memoizedProps && b === e.memoizedState || (a.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && b === e.memoizedState || (a.flags |= 1024), a.memoizedProps = i, a.memoizedState = h), n.props = i, n.state = h, n.context = u, i = x) : (typeof n.componentDidUpdate != "function" || o === e.memoizedProps && b === e.memoizedState || (a.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && b === e.memoizedState || (a.flags |= 1024), i = !1);
    }
    return n = i, dn(e, a), i = (a.flags & 128) !== 0, n || i ? (n = a.stateNode, t = i && typeof t.getDerivedStateFromError != "function" ? null : n.render(), a.flags |= 1, e !== null && i ? (a.child = kt(
      a,
      e.child,
      null,
      l
    ), a.child = kt(
      a,
      null,
      t,
      l
    )) : Qe(e, a, t, l), a.memoizedState = n.state, e = a.child) : e = Ga(
      e,
      a,
      l
    ), e;
  }
  function Zs(e, a, t, i) {
    return Ut(), a.flags |= 256, Qe(e, a, t, i), a.child;
  }
  var pr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mr(e) {
    return { baseLanes: e, cachePool: Oc() };
  }
  function gr(e, a, t) {
    return e = e !== null ? e.childLanes & ~t : 0, a && (e |= da), e;
  }
  function Ys(e, a, t) {
    var i = a.pendingProps, l = !1, n = (a.flags & 128) !== 0, o;
    if ((o = n) || (o = e !== null && e.memoizedState === null ? !1 : (Ee.current & 2) !== 0), o && (l = !0, a.flags &= -129), o = (a.flags & 32) !== 0, a.flags &= -33, e === null) {
      if (ae) {
        if (l ? ct(a) : st(), (e = be) ? (e = $f(
          e,
          ya
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: tt !== null ? { id: Oa, overflow: Ca } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, t = yc(e), t.return = a, a.child = t, Ze = a, be = null)) : e = null, e === null) throw lt(a);
        return Fr(e) ? a.lanes = 32 : a.lanes = 536870912, null;
      }
      var r = i.children;
      return i = i.fallback, l ? (st(), l = a.mode, r = pn(
        { mode: "hidden", children: r },
        l
      ), i = Nt(
        i,
        l,
        t,
        null
      ), r.return = a, i.return = a, r.sibling = i, a.child = r, i = a.child, i.memoizedState = mr(t), i.childLanes = gr(
        e,
        o,
        t
      ), a.memoizedState = pr, il(null, i)) : (ct(a), br(a, r));
    }
    var u = e.memoizedState;
    if (u !== null && (r = u.dehydrated, r !== null)) {
      if (n)
        a.flags & 256 ? (ct(a), a.flags &= -257, a = hr(
          e,
          a,
          t
        )) : a.memoizedState !== null ? (st(), a.child = e.child, a.flags |= 128, a = null) : (st(), r = i.fallback, l = a.mode, i = pn(
          { mode: "visible", children: i.children },
          l
        ), r = Nt(
          r,
          l,
          t,
          null
        ), r.flags |= 2, i.return = a, r.return = a, i.sibling = r, a.child = i, kt(
          a,
          e.child,
          null,
          t
        ), i = a.child, i.memoizedState = mr(t), i.childLanes = gr(
          e,
          o,
          t
        ), a.memoizedState = pr, a = il(null, i));
      else if (ct(a), Fr(r)) {
        if (o = r.nextSibling && r.nextSibling.dataset, o) var g = o.dgst;
        o = g, i = Error(f(419)), i.stack = "", i.digest = o, Xi({ value: i, source: null, stack: null }), a = hr(
          e,
          a,
          t
        );
      } else if (Ne || ui(e, a, t, !1), o = (t & e.childLanes) !== 0, Ne || o) {
        if (o = me, o !== null && (i = Tu(o, t), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Dt(e, i), ta(o, e, i), fr;
        $r(r) || wn(), a = hr(
          e,
          a,
          t
        );
      } else
        $r(r) ? (a.flags |= 192, a.child = e.child, a = null) : (e = u.treeContext, be = wa(
          r.nextSibling
        ), Ze = a, ae = !0, it = null, ya = !1, e !== null && zc(a, e), a = br(
          a,
          i.children
        ), a.flags |= 4096);
      return a;
    }
    return l ? (st(), r = i.fallback, l = a.mode, u = e.child, g = u.sibling, i = Ba(u, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = u.subtreeFlags & 65011712, g !== null ? r = Ba(
      g,
      r
    ) : (r = Nt(
      r,
      l,
      t,
      null
    ), r.flags |= 2), r.return = a, i.return = a, i.sibling = r, a.child = i, il(null, i), i = a.child, r = e.child.memoizedState, r === null ? r = mr(t) : (l = r.cachePool, l !== null ? (u = Ce._currentValue, l = l.parent !== u ? { parent: u, pool: u } : l) : l = Oc(), r = {
      baseLanes: r.baseLanes | t,
      cachePool: l
    }), i.memoizedState = r, i.childLanes = gr(
      e,
      o,
      t
    ), a.memoizedState = pr, il(e.child, i)) : (ct(a), t = e.child, e = t.sibling, t = Ba(t, {
      mode: "visible",
      children: i.children
    }), t.return = a, t.sibling = null, e !== null && (o = a.deletions, o === null ? (a.deletions = [e], a.flags |= 16) : o.push(e)), a.child = t, a.memoizedState = null, t);
  }
  function br(e, a) {
    return a = pn(
      { mode: "visible", children: a },
      e.mode
    ), a.return = e, e.child = a;
  }
  function pn(e, a) {
    return e = ua(22, e, null, a), e.lanes = 0, e;
  }
  function hr(e, a, t) {
    return kt(a, e.child, null, t), e = br(
      a,
      a.pendingProps.children
    ), e.flags |= 2, a.memoizedState = null, e;
  }
  function Qs(e, a, t) {
    e.lanes |= a;
    var i = e.alternate;
    i !== null && (i.lanes |= a), No(e.return, a, t);
  }
  function xr(e, a, t, i, l, n) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
      isBackwards: a,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: t,
      tailMode: l,
      treeForkCount: n
    } : (o.isBackwards = a, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = t, o.tailMode = l, o.treeForkCount = n);
  }
  function Gs(e, a, t) {
    var i = a.pendingProps, l = i.revealOrder, n = i.tail;
    i = i.children;
    var o = Ee.current, r = (o & 2) !== 0;
    if (r ? (o = o & 1 | 2, a.flags |= 128) : o &= 1, O(Ee, o), Qe(e, a, i, t), i = ae ? Li : 0, !r && e !== null && (e.flags & 128) !== 0)
      e: for (e = a.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Qs(e, t, a);
        else if (e.tag === 19)
          Qs(e, t, a);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === a) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === a)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (l) {
      case "forwards":
        for (t = a.child, l = null; t !== null; )
          e = t.alternate, e !== null && en(e) === null && (l = t), t = t.sibling;
        t = l, t === null ? (l = a.child, a.child = null) : (l = t.sibling, t.sibling = null), xr(
          a,
          !1,
          l,
          t,
          n,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (t = null, l = a.child, a.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && en(e) === null) {
            a.child = l;
            break;
          }
          e = l.sibling, l.sibling = t, t = l, l = e;
        }
        xr(
          a,
          !0,
          t,
          null,
          n,
          i
        );
        break;
      case "together":
        xr(
          a,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function Ga(e, a, t) {
    if (e !== null && (a.dependencies = e.dependencies), pt |= a.lanes, (t & a.childLanes) === 0)
      if (e !== null) {
        if (ui(
          e,
          a,
          t,
          !1
        ), (t & a.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && a.child !== e.child)
      throw Error(f(153));
    if (a.child !== null) {
      for (e = a.child, t = Ba(e, e.pendingProps), a.child = t, t.return = a; e.sibling !== null; )
        e = e.sibling, t = t.sibling = Ba(e, e.pendingProps), t.return = a;
      t.sibling = null;
    }
    return a.child;
  }
  function vr(e, a) {
    return (e.lanes & a) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Vl(e)));
  }
  function up(e, a, t) {
    switch (a.tag) {
      case 3:
        Ve(a, a.stateNode.containerInfo), nt(a, Ce, e.memoizedState.cache), Ut();
        break;
      case 27:
      case 5:
        Oi(a);
        break;
      case 4:
        Ve(a, a.stateNode.containerInfo);
        break;
      case 10:
        nt(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 31:
        if (a.memoizedState !== null)
          return a.flags |= 128, Lo(a), null;
        break;
      case 13:
        var i = a.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (ct(a), a.flags |= 128, null) : (t & a.child.childLanes) !== 0 ? Ys(e, a, t) : (ct(a), e = Ga(
            e,
            a,
            t
          ), e !== null ? e.sibling : null);
        ct(a);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (i = (t & a.childLanes) !== 0, i || (ui(
          e,
          a,
          t,
          !1
        ), i = (t & a.childLanes) !== 0), l) {
          if (i)
            return Gs(
              e,
              a,
              t
            );
          a.flags |= 128;
        }
        if (l = a.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), O(Ee, Ee.current), i) break;
        return null;
      case 22:
        return a.lanes = 0, Hs(
          e,
          a,
          t,
          a.pendingProps
        );
      case 24:
        nt(a, Ce, e.memoizedState.cache);
    }
    return Ga(e, a, t);
  }
  function Ls(e, a, t) {
    if (e !== null)
      if (e.memoizedProps !== a.pendingProps)
        Ne = !0;
      else {
        if (!vr(e, t) && (a.flags & 128) === 0)
          return Ne = !1, up(
            e,
            a,
            t
          );
        Ne = (e.flags & 131072) !== 0;
      }
    else
      Ne = !1, ae && (a.flags & 1048576) !== 0 && wc(a, Li, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        e: {
          var i = a.pendingProps;
          if (e = Bt(a.elementType), a.type = e, typeof e == "function")
            So(e) ? (i = Yt(e, i), a.tag = 1, a = ks(
              null,
              a,
              e,
              i,
              t
            )) : (a.tag = 0, a = dr(
              null,
              a,
              e,
              i,
              t
            ));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === ve) {
                a.tag = 11, a = Ns(
                  null,
                  a,
                  e,
                  i,
                  t
                );
                break e;
              } else if (l === W) {
                a.tag = 14, a = Us(
                  null,
                  a,
                  e,
                  i,
                  t
                );
                break e;
              }
            }
            throw a = Ua(e) || e, Error(f(306, a, ""));
          }
        }
        return a;
      case 0:
        return dr(
          e,
          a,
          a.type,
          a.pendingProps,
          t
        );
      case 1:
        return i = a.type, l = Yt(
          i,
          a.pendingProps
        ), ks(
          e,
          a,
          i,
          l,
          t
        );
      case 3:
        e: {
          if (Ve(
            a,
            a.stateNode.containerInfo
          ), e === null) throw Error(f(387));
          i = a.pendingProps;
          var n = a.memoizedState;
          l = n.element, ko(e, a), Ii(a, i, null, t);
          var o = a.memoizedState;
          if (i = o.cache, nt(a, Ce, i), i !== n.cache && Uo(
            a,
            [Ce],
            t,
            !0
          ), Fi(), i = o.element, n.isDehydrated)
            if (n = {
              element: i,
              isDehydrated: !1,
              cache: o.cache
            }, a.updateQueue.baseState = n, a.memoizedState = n, a.flags & 256) {
              a = Zs(
                e,
                a,
                i,
                t
              );
              break e;
            } else if (i !== l) {
              l = ha(
                Error(f(424)),
                a
              ), Xi(l), a = Zs(
                e,
                a,
                i,
                t
              );
              break e;
            } else {
              switch (e = a.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (be = wa(e.firstChild), Ze = a, ae = !0, it = null, ya = !0, t = Hc(
                a,
                null,
                i,
                t
              ), a.child = t; t; )
                t.flags = t.flags & -3 | 4096, t = t.sibling;
            }
          else {
            if (Ut(), i === l) {
              a = Ga(
                e,
                a,
                t
              );
              break e;
            }
            Qe(e, a, i, t);
          }
          a = a.child;
        }
        return a;
      case 26:
        return dn(e, a), e === null ? (t = td(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = t : ae || (t = a.type, e = a.pendingProps, i = On(
          $.current
        ).createElement(t), i[ke] = a, i[$e] = e, Ge(i, t, e), Re(i), a.stateNode = i) : a.memoizedState = td(
          a.type,
          e.memoizedProps,
          a.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Oi(a), e === null && ae && (i = a.stateNode = Pf(
          a.type,
          a.pendingProps,
          $.current
        ), Ze = a, ya = !0, l = be, xt(a.type) ? (Ir = l, be = wa(i.firstChild)) : be = l), Qe(
          e,
          a,
          a.pendingProps.children,
          t
        ), dn(e, a), e === null && (a.flags |= 4194304), a.child;
      case 5:
        return e === null && ae && ((l = i = be) && (i = qp(
          i,
          a.type,
          a.pendingProps,
          ya
        ), i !== null ? (a.stateNode = i, Ze = a, be = wa(i.firstChild), ya = !1, l = !0) : l = !1), l || lt(a)), Oi(a), l = a.type, n = a.pendingProps, o = e !== null ? e.memoizedProps : null, i = n.children, Kr(l, n) ? i = null : o !== null && Kr(l, o) && (a.flags |= 32), a.memoizedState !== null && (l = Vo(
          e,
          a,
          P0,
          null,
          null,
          t
        ), xl._currentValue = l), dn(e, a), Qe(e, a, i, t), a.child;
      case 6:
        return e === null && ae && ((e = t = be) && (t = kp(
          t,
          a.pendingProps,
          ya
        ), t !== null ? (a.stateNode = t, Ze = a, be = null, e = !0) : e = !1), e || lt(a)), null;
      case 13:
        return Ys(e, a, t);
      case 4:
        return Ve(
          a,
          a.stateNode.containerInfo
        ), i = a.pendingProps, e === null ? a.child = kt(
          a,
          null,
          i,
          t
        ) : Qe(e, a, i, t), a.child;
      case 11:
        return Ns(
          e,
          a,
          a.type,
          a.pendingProps,
          t
        );
      case 7:
        return Qe(
          e,
          a,
          a.pendingProps,
          t
        ), a.child;
      case 8:
        return Qe(
          e,
          a,
          a.pendingProps.children,
          t
        ), a.child;
      case 12:
        return Qe(
          e,
          a,
          a.pendingProps.children,
          t
        ), a.child;
      case 10:
        return i = a.pendingProps, nt(a, a.type, i.value), Qe(e, a, i.children, t), a.child;
      case 9:
        return l = a.type._context, i = a.pendingProps.children, Ht(a), l = Ye(l), i = i(l), a.flags |= 1, Qe(e, a, i, t), a.child;
      case 14:
        return Us(
          e,
          a,
          a.type,
          a.pendingProps,
          t
        );
      case 15:
        return js(
          e,
          a,
          a.type,
          a.pendingProps,
          t
        );
      case 19:
        return Gs(e, a, t);
      case 31:
        return rp(e, a, t);
      case 22:
        return Hs(
          e,
          a,
          t,
          a.pendingProps
        );
      case 24:
        return Ht(a), i = Ye(Ce), e === null ? (l = Ro(), l === null && (l = me, n = jo(), l.pooledCache = n, n.refCount++, n !== null && (l.pooledCacheLanes |= t), l = n), a.memoizedState = { parent: i, cache: l }, qo(a), nt(a, Ce, l)) : ((e.lanes & t) !== 0 && (ko(e, a), Ii(a, null, null, t), Fi()), l = e.memoizedState, n = a.memoizedState, l.parent !== i ? (l = { parent: i, cache: i }, a.memoizedState = l, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = l), nt(a, Ce, i)) : (i = n.cache, nt(a, Ce, i), i !== l.cache && Uo(
          a,
          [Ce],
          t,
          !0
        ))), Qe(
          e,
          a,
          a.pendingProps.children,
          t
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(f(156, a.tag));
  }
  function La(e) {
    e.flags |= 4;
  }
  function yr(e, a, t, i, l) {
    if ((a = (e.mode & 32) !== 0) && (a = !1), a) {
      if (e.flags |= 16777216, (l & 335544128) === l)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (xf()) e.flags |= 8192;
        else
          throw qt = $l, Bo;
    } else e.flags &= -16777217;
  }
  function Xs(e, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !rd(a))
      if (xf()) e.flags |= 8192;
      else
        throw qt = $l, Bo;
  }
  function mn(e, a) {
    a !== null && (e.flags |= 4), e.flags & 16384 && (a = e.tag !== 22 ? Su() : 536870912, e.lanes |= a, yi |= a);
  }
  function ll(e, a) {
    if (!ae)
      switch (e.tailMode) {
        case "hidden":
          a = e.tail;
          for (var t = null; a !== null; )
            a.alternate !== null && (t = a), a = a.sibling;
          t === null ? e.tail = null : t.sibling = null;
          break;
        case "collapsed":
          t = e.tail;
          for (var i = null; t !== null; )
            t.alternate !== null && (i = t), t = t.sibling;
          i === null ? a || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
  }
  function he(e) {
    var a = e.alternate !== null && e.alternate.child === e.child, t = 0, i = 0;
    if (a)
      for (var l = e.child; l !== null; )
        t |= l.lanes | l.childLanes, i |= l.subtreeFlags & 65011712, i |= l.flags & 65011712, l.return = e, l = l.sibling;
    else
      for (l = e.child; l !== null; )
        t |= l.lanes | l.childLanes, i |= l.subtreeFlags, i |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= i, e.childLanes = t, a;
  }
  function cp(e, a, t) {
    var i = a.pendingProps;
    switch (Mo(a), a.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return he(a), null;
      case 1:
        return he(a), null;
      case 3:
        return t = a.stateNode, i = null, e !== null && (i = e.memoizedState.cache), a.memoizedState.cache !== i && (a.flags |= 2048), Za(Ce), Ae(), t.pendingContext && (t.context = t.pendingContext, t.pendingContext = null), (e === null || e.child === null) && (ri(a) ? La(a) : e === null || e.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Co())), he(a), null;
      case 26:
        var l = a.type, n = a.memoizedState;
        return e === null ? (La(a), n !== null ? (he(a), Xs(a, n)) : (he(a), yr(
          a,
          l,
          null,
          i,
          t
        ))) : n ? n !== e.memoizedState ? (La(a), he(a), Xs(a, n)) : (he(a), a.flags &= -16777217) : (e = e.memoizedProps, e !== i && La(a), he(a), yr(
          a,
          l,
          e,
          i,
          t
        )), null;
      case 27:
        if (Sl(a), t = $.current, l = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== i && La(a);
        else {
          if (!i) {
            if (a.stateNode === null)
              throw Error(f(166));
            return he(a), null;
          }
          e = U.current, ri(a) ? Sc(a) : (e = Pf(l, i, t), a.stateNode = e, La(a));
        }
        return he(a), null;
      case 5:
        if (Sl(a), l = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== i && La(a);
        else {
          if (!i) {
            if (a.stateNode === null)
              throw Error(f(166));
            return he(a), null;
          }
          if (n = U.current, ri(a))
            Sc(a);
          else {
            var o = On(
              $.current
            );
            switch (n) {
              case 1:
                n = o.createElementNS(
                  "http://www.w3.org/2000/svg",
                  l
                );
                break;
              case 2:
                n = o.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  l
                );
                break;
              default:
                switch (l) {
                  case "svg":
                    n = o.createElementNS(
                      "http://www.w3.org/2000/svg",
                      l
                    );
                    break;
                  case "math":
                    n = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    n = o.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof i.is == "string" ? o.createElement("select", {
                      is: i.is
                    }) : o.createElement("select"), i.multiple ? n.multiple = !0 : i.size && (n.size = i.size);
                    break;
                  default:
                    n = typeof i.is == "string" ? o.createElement(l, { is: i.is }) : o.createElement(l);
                }
            }
            n[ke] = a, n[$e] = i;
            e: for (o = a.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6)
                n.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                o.child.return = o, o = o.child;
                continue;
              }
              if (o === a) break e;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === a)
                  break e;
                o = o.return;
              }
              o.sibling.return = o.return, o = o.sibling;
            }
            a.stateNode = n;
            e: switch (Ge(n, l, i), l) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && La(a);
          }
        }
        return he(a), yr(
          a,
          a.type,
          e === null ? null : e.memoizedProps,
          a.pendingProps,
          t
        ), null;
      case 6:
        if (e && a.stateNode != null)
          e.memoizedProps !== i && La(a);
        else {
          if (typeof i != "string" && a.stateNode === null)
            throw Error(f(166));
          if (e = $.current, ri(a)) {
            if (e = a.stateNode, t = a.memoizedProps, i = null, l = Ze, l !== null)
              switch (l.tag) {
                case 27:
                case 5:
                  i = l.memoizedProps;
              }
            e[ke] = a, e = !!(e.nodeValue === t || i !== null && i.suppressHydrationWarning === !0 || Qf(e.nodeValue, t)), e || lt(a, !0);
          } else
            e = On(e).createTextNode(
              i
            ), e[ke] = a, a.stateNode = e;
        }
        return he(a), null;
      case 31:
        if (t = a.memoizedState, e === null || e.memoizedState !== null) {
          if (i = ri(a), t !== null) {
            if (e === null) {
              if (!i) throw Error(f(318));
              if (e = a.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(557));
              e[ke] = a;
            } else
              Ut(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            he(a), e = !1;
          } else
            t = Co(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = t), e = !0;
          if (!e)
            return a.flags & 256 ? (sa(a), a) : (sa(a), null);
          if ((a.flags & 128) !== 0)
            throw Error(f(558));
        }
        return he(a), null;
      case 13:
        if (i = a.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (l = ri(a), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(f(318));
              if (l = a.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(f(317));
              l[ke] = a;
            } else
              Ut(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            he(a), l = !1;
          } else
            l = Co(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = !0;
          if (!l)
            return a.flags & 256 ? (sa(a), a) : (sa(a), null);
        }
        return sa(a), (a.flags & 128) !== 0 ? (a.lanes = t, a) : (t = i !== null, e = e !== null && e.memoizedState !== null, t && (i = a.child, l = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (l = i.alternate.memoizedState.cachePool.pool), n = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (n = i.memoizedState.cachePool.pool), n !== l && (i.flags |= 2048)), t !== e && t && (a.child.flags |= 8192), mn(a, a.updateQueue), he(a), null);
      case 4:
        return Ae(), e === null && Qr(a.stateNode.containerInfo), he(a), null;
      case 10:
        return Za(a.type), he(a), null;
      case 19:
        if (S(Ee), i = a.memoizedState, i === null) return he(a), null;
        if (l = (a.flags & 128) !== 0, n = i.rendering, n === null)
          if (l) ll(i, !1);
          else {
            if (Se !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = a.child; e !== null; ) {
                if (n = en(e), n !== null) {
                  for (a.flags |= 128, ll(i, !1), e = n.updateQueue, a.updateQueue = e, mn(a, e), a.subtreeFlags = 0, e = t, t = a.child; t !== null; )
                    vc(t, e), t = t.sibling;
                  return O(
                    Ee,
                    Ee.current & 1 | 2
                  ), ae && qa(a, i.treeForkCount), a.child;
                }
                e = e.sibling;
              }
            i.tail !== null && la() > vn && (a.flags |= 128, l = !0, ll(i, !1), a.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = en(n), e !== null) {
              if (a.flags |= 128, l = !0, e = e.updateQueue, a.updateQueue = e, mn(a, e), ll(i, !0), i.tail === null && i.tailMode === "hidden" && !n.alternate && !ae)
                return he(a), null;
            } else
              2 * la() - i.renderingStartTime > vn && t !== 536870912 && (a.flags |= 128, l = !0, ll(i, !1), a.lanes = 4194304);
          i.isBackwards ? (n.sibling = a.child, a.child = n) : (e = i.last, e !== null ? e.sibling = n : a.child = n, i.last = n);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = la(), e.sibling = null, t = Ee.current, O(
          Ee,
          l ? t & 1 | 2 : t & 1
        ), ae && qa(a, i.treeForkCount), e) : (he(a), null);
      case 22:
      case 23:
        return sa(a), Go(), i = a.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (a.flags |= 8192) : i && (a.flags |= 8192), i ? (t & 536870912) !== 0 && (a.flags & 128) === 0 && (he(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : he(a), t = a.updateQueue, t !== null && mn(a, t.retryQueue), t = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== t && (a.flags |= 2048), e !== null && S(Rt), null;
      case 24:
        return t = null, e !== null && (t = e.memoizedState.cache), a.memoizedState.cache !== t && (a.flags |= 2048), Za(Ce), he(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, a.tag));
  }
  function sp(e, a) {
    switch (Mo(a), a.tag) {
      case 1:
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 3:
        return Za(Ce), Ae(), e = a.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (a.flags = e & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return Sl(a), null;
      case 31:
        if (a.memoizedState !== null) {
          if (sa(a), a.alternate === null)
            throw Error(f(340));
          Ut();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 13:
        if (sa(a), e = a.memoizedState, e !== null && e.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(f(340));
          Ut();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 19:
        return S(Ee), null;
      case 4:
        return Ae(), null;
      case 10:
        return Za(a.type), null;
      case 22:
      case 23:
        return sa(a), Go(), e !== null && S(Rt), e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 24:
        return Za(Ce), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vs(e, a) {
    switch (Mo(a), a.tag) {
      case 3:
        Za(Ce), Ae();
        break;
      case 26:
      case 27:
      case 5:
        Sl(a);
        break;
      case 4:
        Ae();
        break;
      case 31:
        a.memoizedState !== null && sa(a);
        break;
      case 13:
        sa(a);
        break;
      case 19:
        S(Ee);
        break;
      case 10:
        Za(a.type);
        break;
      case 22:
      case 23:
        sa(a), Go(), e !== null && S(Rt);
        break;
      case 24:
        Za(Ce);
    }
  }
  function nl(e, a) {
    try {
      var t = a.updateQueue, i = t !== null ? t.lastEffect : null;
      if (i !== null) {
        var l = i.next;
        t = l;
        do {
          if ((t.tag & e) === e) {
            i = void 0;
            var n = t.create, o = t.inst;
            i = n(), o.destroy = i;
          }
          t = t.next;
        } while (t !== l);
      }
    } catch (r) {
      ue(a, a.return, r);
    }
  }
  function ft(e, a, t) {
    try {
      var i = a.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        i = n;
        do {
          if ((i.tag & e) === e) {
            var o = i.inst, r = o.destroy;
            if (r !== void 0) {
              o.destroy = void 0, l = a;
              var u = t, g = r;
              try {
                g();
              } catch (x) {
                ue(
                  l,
                  u,
                  x
                );
              }
            }
          }
          i = i.next;
        } while (i !== n);
      }
    } catch (x) {
      ue(a, a.return, x);
    }
  }
  function Ks(e) {
    var a = e.updateQueue;
    if (a !== null) {
      var t = e.stateNode;
      try {
        Bc(a, t);
      } catch (i) {
        ue(e, e.return, i);
      }
    }
  }
  function Js(e, a, t) {
    t.props = Yt(
      e.type,
      e.memoizedProps
    ), t.state = e.memoizedState;
    try {
      t.componentWillUnmount();
    } catch (i) {
      ue(e, a, i);
    }
  }
  function ol(e, a) {
    try {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof t == "function" ? e.refCleanup = t(i) : t.current = i;
      }
    } catch (l) {
      ue(e, a, l);
    }
  }
  function Da(e, a) {
    var t = e.ref, i = e.refCleanup;
    if (t !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (l) {
          ue(e, a, l);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof t == "function")
        try {
          t(null);
        } catch (l) {
          ue(e, a, l);
        }
      else t.current = null;
  }
  function Ws(e) {
    var a = e.type, t = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          t.autoFocus && i.focus();
          break e;
        case "img":
          t.src ? i.src = t.src : t.srcSet && (i.srcset = t.srcSet);
      }
    } catch (l) {
      ue(e, e.return, l);
    }
  }
  function _r(e, a, t) {
    try {
      var i = e.stateNode;
      Np(i, e.type, t, a), i[$e] = a;
    } catch (l) {
      ue(e, e.return, l);
    }
  }
  function $s(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && xt(e.type) || e.tag === 4;
  }
  function wr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || $s(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && xt(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function zr(e, a, t) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, a ? (t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t).insertBefore(e, a) : (a = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.appendChild(e), t = t._reactRootContainer, t != null || a.onclick !== null || (a.onclick = Ha));
    else if (i !== 4 && (i === 27 && xt(e.type) && (t = e.stateNode, a = null), e = e.child, e !== null))
      for (zr(e, a, t), e = e.sibling; e !== null; )
        zr(e, a, t), e = e.sibling;
  }
  function gn(e, a, t) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, a ? t.insertBefore(e, a) : t.appendChild(e);
    else if (i !== 4 && (i === 27 && xt(e.type) && (t = e.stateNode), e = e.child, e !== null))
      for (gn(e, a, t), e = e.sibling; e !== null; )
        gn(e, a, t), e = e.sibling;
  }
  function Fs(e) {
    var a = e.stateNode, t = e.memoizedProps;
    try {
      for (var i = e.type, l = a.attributes; l.length; )
        a.removeAttributeNode(l[0]);
      Ge(a, i, t), a[ke] = e, a[$e] = t;
    } catch (n) {
      ue(e, e.return, n);
    }
  }
  var Xa = !1, Ue = !1, Sr = !1, Is = typeof WeakSet == "function" ? WeakSet : Set, Be = null;
  function fp(e, a) {
    if (e = e.containerInfo, Xr = Rn, e = sc(e), ho(e)) {
      if ("selectionStart" in e)
        var t = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          t = (t = e.ownerDocument) && t.defaultView || window;
          var i = t.getSelection && t.getSelection();
          if (i && i.rangeCount !== 0) {
            t = i.anchorNode;
            var l = i.anchorOffset, n = i.focusNode;
            i = i.focusOffset;
            try {
              t.nodeType, n.nodeType;
            } catch {
              t = null;
              break e;
            }
            var o = 0, r = -1, u = -1, g = 0, x = 0, z = e, b = null;
            a: for (; ; ) {
              for (var h; z !== t || l !== 0 && z.nodeType !== 3 || (r = o + l), z !== n || i !== 0 && z.nodeType !== 3 || (u = o + i), z.nodeType === 3 && (o += z.nodeValue.length), (h = z.firstChild) !== null; )
                b = z, z = h;
              for (; ; ) {
                if (z === e) break a;
                if (b === t && ++g === l && (r = o), b === n && ++x === i && (u = o), (h = z.nextSibling) !== null) break;
                z = b, b = z.parentNode;
              }
              z = h;
            }
            t = r === -1 || u === -1 ? null : { start: r, end: u };
          } else t = null;
        }
      t = t || { start: 0, end: 0 };
    } else t = null;
    for (Vr = { focusedElem: e, selectionRange: t }, Rn = !1, Be = a; Be !== null; )
      if (a = Be, e = a.child, (a.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = a, Be = e;
      else
        for (; Be !== null; ) {
          switch (a = Be, n = a.alternate, e = a.flags, a.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = a.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (t = 0; t < e.length; t++)
                  l = e[t], l.ref.impl = l.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && n !== null) {
                e = void 0, t = a, l = n.memoizedProps, n = n.memoizedState, i = t.stateNode;
                try {
                  var D = Yt(
                    t.type,
                    l
                  );
                  e = i.getSnapshotBeforeUpdate(
                    D,
                    n
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (k) {
                  ue(
                    t,
                    t.return,
                    k
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = a.stateNode.containerInfo, t = e.nodeType, t === 9)
                  Wr(e);
                else if (t === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wr(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(f(163));
          }
          if (e = a.sibling, e !== null) {
            e.return = a.return, Be = e;
            break;
          }
          Be = a.return;
        }
  }
  function Ps(e, a, t) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ka(e, t), i & 4 && nl(5, t);
        break;
      case 1:
        if (Ka(e, t), i & 4)
          if (e = t.stateNode, a === null)
            try {
              e.componentDidMount();
            } catch (o) {
              ue(t, t.return, o);
            }
          else {
            var l = Yt(
              t.type,
              a.memoizedProps
            );
            a = a.memoizedState;
            try {
              e.componentDidUpdate(
                l,
                a,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (o) {
              ue(
                t,
                t.return,
                o
              );
            }
          }
        i & 64 && Ks(t), i & 512 && ol(t, t.return);
        break;
      case 3:
        if (Ka(e, t), i & 64 && (e = t.updateQueue, e !== null)) {
          if (a = null, t.child !== null)
            switch (t.child.tag) {
              case 27:
              case 5:
                a = t.child.stateNode;
                break;
              case 1:
                a = t.child.stateNode;
            }
          try {
            Bc(e, a);
          } catch (o) {
            ue(t, t.return, o);
          }
        }
        break;
      case 27:
        a === null && i & 4 && Fs(t);
      case 26:
      case 5:
        Ka(e, t), a === null && i & 4 && Ws(t), i & 512 && ol(t, t.return);
        break;
      case 12:
        Ka(e, t);
        break;
      case 31:
        Ka(e, t), i & 4 && tf(e, t);
        break;
      case 13:
        Ka(e, t), i & 4 && lf(e, t), i & 64 && (e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null && (t = yp.bind(
          null,
          t
        ), Zp(e, t))));
        break;
      case 22:
        if (i = t.memoizedState !== null || Xa, !i) {
          a = a !== null && a.memoizedState !== null || Ue, l = Xa;
          var n = Ue;
          Xa = i, (Ue = a) && !n ? Ja(
            e,
            t,
            (t.subtreeFlags & 8772) !== 0
          ) : Ka(e, t), Xa = l, Ue = n;
        }
        break;
      case 30:
        break;
      default:
        Ka(e, t);
    }
  }
  function ef(e) {
    var a = e.alternate;
    a !== null && (e.alternate = null, ef(a)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (a = e.stateNode, a !== null && Pn(a)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ye = null, Ie = !1;
  function Va(e, a, t) {
    for (t = t.child; t !== null; )
      af(e, a, t), t = t.sibling;
  }
  function af(e, a, t) {
    if (na && typeof na.onCommitFiberUnmount == "function")
      try {
        na.onCommitFiberUnmount(Ci, t);
      } catch {
      }
    switch (t.tag) {
      case 26:
        Ue || Da(t, a), Va(
          e,
          a,
          t
        ), t.memoizedState ? t.memoizedState.count-- : t.stateNode && (t = t.stateNode, t.parentNode.removeChild(t));
        break;
      case 27:
        Ue || Da(t, a);
        var i = ye, l = Ie;
        xt(t.type) && (ye = t.stateNode, Ie = !1), Va(
          e,
          a,
          t
        ), gl(t.stateNode), ye = i, Ie = l;
        break;
      case 5:
        Ue || Da(t, a);
      case 6:
        if (i = ye, l = Ie, ye = null, Va(
          e,
          a,
          t
        ), ye = i, Ie = l, ye !== null)
          if (Ie)
            try {
              (ye.nodeType === 9 ? ye.body : ye.nodeName === "HTML" ? ye.ownerDocument.body : ye).removeChild(t.stateNode);
            } catch (n) {
              ue(
                t,
                a,
                n
              );
            }
          else
            try {
              ye.removeChild(t.stateNode);
            } catch (n) {
              ue(
                t,
                a,
                n
              );
            }
        break;
      case 18:
        ye !== null && (Ie ? (e = ye, Jf(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          t.stateNode
        ), Mi(e)) : Jf(ye, t.stateNode));
        break;
      case 4:
        i = ye, l = Ie, ye = t.stateNode.containerInfo, Ie = !0, Va(
          e,
          a,
          t
        ), ye = i, Ie = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ft(2, t, a), Ue || ft(4, t, a), Va(
          e,
          a,
          t
        );
        break;
      case 1:
        Ue || (Da(t, a), i = t.stateNode, typeof i.componentWillUnmount == "function" && Js(
          t,
          a,
          i
        )), Va(
          e,
          a,
          t
        );
        break;
      case 21:
        Va(
          e,
          a,
          t
        );
        break;
      case 22:
        Ue = (i = Ue) || t.memoizedState !== null, Va(
          e,
          a,
          t
        ), Ue = i;
        break;
      default:
        Va(
          e,
          a,
          t
        );
    }
  }
  function tf(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Mi(e);
      } catch (t) {
        ue(a, a.return, t);
      }
    }
  }
  function lf(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Mi(e);
      } catch (t) {
        ue(a, a.return, t);
      }
  }
  function dp(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var a = e.stateNode;
        return a === null && (a = e.stateNode = new Is()), a;
      case 22:
        return e = e.stateNode, a = e._retryCache, a === null && (a = e._retryCache = new Is()), a;
      default:
        throw Error(f(435, e.tag));
    }
  }
  function bn(e, a) {
    var t = dp(e);
    a.forEach(function(i) {
      if (!t.has(i)) {
        t.add(i);
        var l = _p.bind(null, e, i);
        i.then(l, l);
      }
    });
  }
  function Pe(e, a) {
    var t = a.deletions;
    if (t !== null)
      for (var i = 0; i < t.length; i++) {
        var l = t[i], n = e, o = a, r = o;
        e: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (xt(r.type)) {
                ye = r.stateNode, Ie = !1;
                break e;
              }
              break;
            case 5:
              ye = r.stateNode, Ie = !1;
              break e;
            case 3:
            case 4:
              ye = r.stateNode.containerInfo, Ie = !0;
              break e;
          }
          r = r.return;
        }
        if (ye === null) throw Error(f(160));
        af(n, o, l), ye = null, Ie = !1, n = l.alternate, n !== null && (n.return = null), l.return = null;
      }
    if (a.subtreeFlags & 13886)
      for (a = a.child; a !== null; )
        nf(a, e), a = a.sibling;
  }
  var Ea = null;
  function nf(e, a) {
    var t = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Pe(a, e), ea(e), i & 4 && (ft(3, e, e.return), nl(3, e), ft(5, e, e.return));
        break;
      case 1:
        Pe(a, e), ea(e), i & 512 && (Ue || t === null || Da(t, t.return)), i & 64 && Xa && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (t = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = t === null ? i : t.concat(i))));
        break;
      case 26:
        var l = Ea;
        if (Pe(a, e), ea(e), i & 512 && (Ue || t === null || Da(t, t.return)), i & 4) {
          var n = t !== null ? t.memoizedState : null;
          if (i = e.memoizedState, t === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, t = e.memoizedProps, l = l.ownerDocument || l;
                  a: switch (i) {
                    case "title":
                      n = l.getElementsByTagName("title")[0], (!n || n[Ui] || n[ke] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = l.createElement(i), l.head.insertBefore(
                        n,
                        l.querySelector("head > title")
                      )), Ge(n, i, t), n[ke] = e, Re(n), i = n;
                      break e;
                    case "link":
                      var o = nd(
                        "link",
                        "href",
                        l
                      ).get(i + (t.href || ""));
                      if (o) {
                        for (var r = 0; r < o.length; r++)
                          if (n = o[r], n.getAttribute("href") === (t.href == null || t.href === "" ? null : t.href) && n.getAttribute("rel") === (t.rel == null ? null : t.rel) && n.getAttribute("title") === (t.title == null ? null : t.title) && n.getAttribute("crossorigin") === (t.crossOrigin == null ? null : t.crossOrigin)) {
                            o.splice(r, 1);
                            break a;
                          }
                      }
                      n = l.createElement(i), Ge(n, i, t), l.head.appendChild(n);
                      break;
                    case "meta":
                      if (o = nd(
                        "meta",
                        "content",
                        l
                      ).get(i + (t.content || ""))) {
                        for (r = 0; r < o.length; r++)
                          if (n = o[r], n.getAttribute("content") === (t.content == null ? null : "" + t.content) && n.getAttribute("name") === (t.name == null ? null : t.name) && n.getAttribute("property") === (t.property == null ? null : t.property) && n.getAttribute("http-equiv") === (t.httpEquiv == null ? null : t.httpEquiv) && n.getAttribute("charset") === (t.charSet == null ? null : t.charSet)) {
                            o.splice(r, 1);
                            break a;
                          }
                      }
                      n = l.createElement(i), Ge(n, i, t), l.head.appendChild(n);
                      break;
                    default:
                      throw Error(f(468, i));
                  }
                  n[ke] = e, Re(n), i = n;
                }
                e.stateNode = i;
              } else
                od(
                  l,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = ld(
                l,
                i,
                e.memoizedProps
              );
          else
            n !== i ? (n === null ? t.stateNode !== null && (t = t.stateNode, t.parentNode.removeChild(t)) : n.count--, i === null ? od(
              l,
              e.type,
              e.stateNode
            ) : ld(
              l,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && _r(
              e,
              e.memoizedProps,
              t.memoizedProps
            );
        }
        break;
      case 27:
        Pe(a, e), ea(e), i & 512 && (Ue || t === null || Da(t, t.return)), t !== null && i & 4 && _r(
          e,
          e.memoizedProps,
          t.memoizedProps
        );
        break;
      case 5:
        if (Pe(a, e), ea(e), i & 512 && (Ue || t === null || Da(t, t.return)), e.flags & 32) {
          l = e.stateNode;
          try {
            Ft(l, "");
          } catch (D) {
            ue(e, e.return, D);
          }
        }
        i & 4 && e.stateNode != null && (l = e.memoizedProps, _r(
          e,
          l,
          t !== null ? t.memoizedProps : l
        )), i & 1024 && (Sr = !0);
        break;
      case 6:
        if (Pe(a, e), ea(e), i & 4) {
          if (e.stateNode === null)
            throw Error(f(162));
          i = e.memoizedProps, t = e.stateNode;
          try {
            t.nodeValue = i;
          } catch (D) {
            ue(e, e.return, D);
          }
        }
        break;
      case 3:
        if (Nn = null, l = Ea, Ea = Cn(a.containerInfo), Pe(a, e), Ea = l, ea(e), i & 4 && t !== null && t.memoizedState.isDehydrated)
          try {
            Mi(a.containerInfo);
          } catch (D) {
            ue(e, e.return, D);
          }
        Sr && (Sr = !1, of(e));
        break;
      case 4:
        i = Ea, Ea = Cn(
          e.stateNode.containerInfo
        ), Pe(a, e), ea(e), Ea = i;
        break;
      case 12:
        Pe(a, e), ea(e);
        break;
      case 31:
        Pe(a, e), ea(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, bn(e, i)));
        break;
      case 13:
        Pe(a, e), ea(e), e.child.flags & 8192 && e.memoizedState !== null != (t !== null && t.memoizedState !== null) && (xn = la()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, bn(e, i)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var u = t !== null && t.memoizedState !== null, g = Xa, x = Ue;
        if (Xa = g || l, Ue = x || u, Pe(a, e), Ue = x, Xa = g, ea(e), i & 8192)
          e: for (a = e.stateNode, a._visibility = l ? a._visibility & -2 : a._visibility | 1, l && (t === null || u || Xa || Ue || Qt(e)), t = null, a = e; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (t === null) {
                u = t = a;
                try {
                  if (n = u.stateNode, l)
                    o = n.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    r = u.stateNode;
                    var z = u.memoizedProps.style, b = z != null && z.hasOwnProperty("display") ? z.display : null;
                    r.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (D) {
                  ue(u, u.return, D);
                }
              }
            } else if (a.tag === 6) {
              if (t === null) {
                u = a;
                try {
                  u.stateNode.nodeValue = l ? "" : u.memoizedProps;
                } catch (D) {
                  ue(u, u.return, D);
                }
              }
            } else if (a.tag === 18) {
              if (t === null) {
                u = a;
                try {
                  var h = u.stateNode;
                  l ? Wf(h, !0) : Wf(u.stateNode, !1);
                } catch (D) {
                  ue(u, u.return, D);
                }
              }
            } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === e) && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === e) break e;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === e) break e;
              t === a && (t = null), a = a.return;
            }
            t === a && (t = null), a.sibling.return = a.return, a = a.sibling;
          }
        i & 4 && (i = e.updateQueue, i !== null && (t = i.retryQueue, t !== null && (i.retryQueue = null, bn(e, t))));
        break;
      case 19:
        Pe(a, e), ea(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, bn(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Pe(a, e), ea(e);
    }
  }
  function ea(e) {
    var a = e.flags;
    if (a & 2) {
      try {
        for (var t, i = e.return; i !== null; ) {
          if ($s(i)) {
            t = i;
            break;
          }
          i = i.return;
        }
        if (t == null) throw Error(f(160));
        switch (t.tag) {
          case 27:
            var l = t.stateNode, n = wr(e);
            gn(e, n, l);
            break;
          case 5:
            var o = t.stateNode;
            t.flags & 32 && (Ft(o, ""), t.flags &= -33);
            var r = wr(e);
            gn(e, r, o);
            break;
          case 3:
          case 4:
            var u = t.stateNode.containerInfo, g = wr(e);
            zr(
              e,
              g,
              u
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (x) {
        ue(e, e.return, x);
      }
      e.flags &= -3;
    }
    a & 4096 && (e.flags &= -4097);
  }
  function of(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var a = e;
        of(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), e = e.sibling;
      }
  }
  function Ka(e, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        Ps(e, a.alternate, a), a = a.sibling;
  }
  function Qt(e) {
    for (e = e.child; e !== null; ) {
      var a = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ft(4, a, a.return), Qt(a);
          break;
        case 1:
          Da(a, a.return);
          var t = a.stateNode;
          typeof t.componentWillUnmount == "function" && Js(
            a,
            a.return,
            t
          ), Qt(a);
          break;
        case 27:
          gl(a.stateNode);
        case 26:
        case 5:
          Da(a, a.return), Qt(a);
          break;
        case 22:
          a.memoizedState === null && Qt(a);
          break;
        case 30:
          Qt(a);
          break;
        default:
          Qt(a);
      }
      e = e.sibling;
    }
  }
  function Ja(e, a, t) {
    for (t = t && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var i = a.alternate, l = e, n = a, o = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Ja(
            l,
            n,
            t
          ), nl(4, n);
          break;
        case 1:
          if (Ja(
            l,
            n,
            t
          ), i = n, l = i.stateNode, typeof l.componentDidMount == "function")
            try {
              l.componentDidMount();
            } catch (g) {
              ue(i, i.return, g);
            }
          if (i = n, l = i.updateQueue, l !== null) {
            var r = i.stateNode;
            try {
              var u = l.shared.hiddenCallbacks;
              if (u !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < u.length; l++)
                  Rc(u[l], r);
            } catch (g) {
              ue(i, i.return, g);
            }
          }
          t && o & 64 && Ks(n), ol(n, n.return);
          break;
        case 27:
          Fs(n);
        case 26:
        case 5:
          Ja(
            l,
            n,
            t
          ), t && i === null && o & 4 && Ws(n), ol(n, n.return);
          break;
        case 12:
          Ja(
            l,
            n,
            t
          );
          break;
        case 31:
          Ja(
            l,
            n,
            t
          ), t && o & 4 && tf(l, n);
          break;
        case 13:
          Ja(
            l,
            n,
            t
          ), t && o & 4 && lf(l, n);
          break;
        case 22:
          n.memoizedState === null && Ja(
            l,
            n,
            t
          ), ol(n, n.return);
          break;
        case 30:
          break;
        default:
          Ja(
            l,
            n,
            t
          );
      }
      a = a.sibling;
    }
  }
  function Ar(e, a) {
    var t = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== t && (e != null && e.refCount++, t != null && Vi(t));
  }
  function Er(e, a) {
    e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && Vi(e));
  }
  function Ta(e, a, t, i) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        rf(
          e,
          a,
          t,
          i
        ), a = a.sibling;
  }
  function rf(e, a, t, i) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Ta(
          e,
          a,
          t,
          i
        ), l & 2048 && nl(9, a);
        break;
      case 1:
        Ta(
          e,
          a,
          t,
          i
        );
        break;
      case 3:
        Ta(
          e,
          a,
          t,
          i
        ), l & 2048 && (e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && Vi(e)));
        break;
      case 12:
        if (l & 2048) {
          Ta(
            e,
            a,
            t,
            i
          ), e = a.stateNode;
          try {
            var n = a.memoizedProps, o = n.id, r = n.onPostCommit;
            typeof r == "function" && r(
              o,
              a.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (u) {
            ue(a, a.return, u);
          }
        } else
          Ta(
            e,
            a,
            t,
            i
          );
        break;
      case 31:
        Ta(
          e,
          a,
          t,
          i
        );
        break;
      case 13:
        Ta(
          e,
          a,
          t,
          i
        );
        break;
      case 23:
        break;
      case 22:
        n = a.stateNode, o = a.alternate, a.memoizedState !== null ? n._visibility & 2 ? Ta(
          e,
          a,
          t,
          i
        ) : rl(e, a) : n._visibility & 2 ? Ta(
          e,
          a,
          t,
          i
        ) : (n._visibility |= 2, hi(
          e,
          a,
          t,
          i,
          (a.subtreeFlags & 10256) !== 0 || !1
        )), l & 2048 && Ar(o, a);
        break;
      case 24:
        Ta(
          e,
          a,
          t,
          i
        ), l & 2048 && Er(a.alternate, a);
        break;
      default:
        Ta(
          e,
          a,
          t,
          i
        );
    }
  }
  function hi(e, a, t, i, l) {
    for (l = l && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child; a !== null; ) {
      var n = e, o = a, r = t, u = i, g = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          hi(
            n,
            o,
            r,
            u,
            l
          ), nl(8, o);
          break;
        case 23:
          break;
        case 22:
          var x = o.stateNode;
          o.memoizedState !== null ? x._visibility & 2 ? hi(
            n,
            o,
            r,
            u,
            l
          ) : rl(
            n,
            o
          ) : (x._visibility |= 2, hi(
            n,
            o,
            r,
            u,
            l
          )), l && g & 2048 && Ar(
            o.alternate,
            o
          );
          break;
        case 24:
          hi(
            n,
            o,
            r,
            u,
            l
          ), l && g & 2048 && Er(o.alternate, o);
          break;
        default:
          hi(
            n,
            o,
            r,
            u,
            l
          );
      }
      a = a.sibling;
    }
  }
  function rl(e, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var t = e, i = a, l = i.flags;
        switch (i.tag) {
          case 22:
            rl(t, i), l & 2048 && Ar(
              i.alternate,
              i
            );
            break;
          case 24:
            rl(t, i), l & 2048 && Er(i.alternate, i);
            break;
          default:
            rl(t, i);
        }
        a = a.sibling;
      }
  }
  var ul = 8192;
  function xi(e, a, t) {
    if (e.subtreeFlags & ul)
      for (e = e.child; e !== null; )
        uf(
          e,
          a,
          t
        ), e = e.sibling;
  }
  function uf(e, a, t) {
    switch (e.tag) {
      case 26:
        xi(
          e,
          a,
          t
        ), e.flags & ul && e.memoizedState !== null && Ip(
          t,
          Ea,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        xi(
          e,
          a,
          t
        );
        break;
      case 3:
      case 4:
        var i = Ea;
        Ea = Cn(e.stateNode.containerInfo), xi(
          e,
          a,
          t
        ), Ea = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = ul, ul = 16777216, xi(
          e,
          a,
          t
        ), ul = i) : xi(
          e,
          a,
          t
        ));
        break;
      default:
        xi(
          e,
          a,
          t
        );
    }
  }
  function cf(e) {
    var a = e.alternate;
    if (a !== null && (e = a.child, e !== null)) {
      a.child = null;
      do
        a = e.sibling, e.sibling = null, e = a;
      while (e !== null);
    }
  }
  function cl(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var t = 0; t < a.length; t++) {
          var i = a[t];
          Be = i, ff(
            i,
            e
          );
        }
      cf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        sf(e), e = e.sibling;
  }
  function sf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        cl(e), e.flags & 2048 && ft(9, e, e.return);
        break;
      case 3:
        cl(e);
        break;
      case 12:
        cl(e);
        break;
      case 22:
        var a = e.stateNode;
        e.memoizedState !== null && a._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (a._visibility &= -3, hn(e)) : cl(e);
        break;
      default:
        cl(e);
    }
  }
  function hn(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var t = 0; t < a.length; t++) {
          var i = a[t];
          Be = i, ff(
            i,
            e
          );
        }
      cf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (a = e, a.tag) {
        case 0:
        case 11:
        case 15:
          ft(8, a, a.return), hn(a);
          break;
        case 22:
          t = a.stateNode, t._visibility & 2 && (t._visibility &= -3, hn(a));
          break;
        default:
          hn(a);
      }
      e = e.sibling;
    }
  }
  function ff(e, a) {
    for (; Be !== null; ) {
      var t = Be;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          ft(8, t, a);
          break;
        case 23:
        case 22:
          if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
            var i = t.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Vi(t.memoizedState.cache);
      }
      if (i = t.child, i !== null) i.return = t, Be = i;
      else
        e: for (t = e; Be !== null; ) {
          i = Be;
          var l = i.sibling, n = i.return;
          if (ef(i), i === t) {
            Be = null;
            break e;
          }
          if (l !== null) {
            l.return = n, Be = l;
            break e;
          }
          Be = n;
        }
    }
  }
  var pp = {
    getCacheForType: function(e) {
      var a = Ye(Ce), t = a.data.get(e);
      return t === void 0 && (t = e(), a.data.set(e, t)), t;
    },
    cacheSignal: function() {
      return Ye(Ce).controller.signal;
    }
  }, mp = typeof WeakMap == "function" ? WeakMap : Map, ne = 0, me = null, F = null, P = 0, re = 0, fa = null, dt = !1, vi = !1, Tr = !1, Wa = 0, Se = 0, pt = 0, Gt = 0, Mr = 0, da = 0, yi = 0, sl = null, aa = null, Or = !1, xn = 0, df = 0, vn = 1 / 0, yn = null, mt = null, He = 0, gt = null, _i = null, $a = 0, Cr = 0, Dr = null, pf = null, fl = 0, Nr = null;
  function pa() {
    return (ne & 2) !== 0 && P !== 0 ? P & -P : y.T !== null ? qr() : Mu();
  }
  function mf() {
    if (da === 0)
      if ((P & 536870912) === 0 || ae) {
        var e = Tl;
        Tl <<= 1, (Tl & 3932160) === 0 && (Tl = 262144), da = e;
      } else da = 536870912;
    return e = ca.current, e !== null && (e.flags |= 32), da;
  }
  function ta(e, a, t) {
    (e === me && (re === 2 || re === 9) || e.cancelPendingCommit !== null) && (wi(e, 0), bt(
      e,
      P,
      da,
      !1
    )), Ni(e, t), ((ne & 2) === 0 || e !== me) && (e === me && ((ne & 2) === 0 && (Gt |= t), Se === 4 && bt(
      e,
      P,
      da,
      !1
    )), Na(e));
  }
  function gf(e, a, t) {
    if ((ne & 6) !== 0) throw Error(f(327));
    var i = !t && (a & 127) === 0 && (a & e.expiredLanes) === 0 || Di(e, a), l = i ? hp(e, a) : jr(e, a, !0), n = i;
    do {
      if (l === 0) {
        vi && !i && bt(e, a, 0, !1);
        break;
      } else {
        if (t = e.current.alternate, n && !gp(t)) {
          l = jr(e, a, !1), n = !1;
          continue;
        }
        if (l === 2) {
          if (n = a, e.errorRecoveryDisabledLanes & n)
            var o = 0;
          else
            o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
          if (o !== 0) {
            a = o;
            e: {
              var r = e;
              l = sl;
              var u = r.current.memoizedState.isDehydrated;
              if (u && (wi(r, o).flags |= 256), o = jr(
                r,
                o,
                !1
              ), o !== 2) {
                if (Tr && !u) {
                  r.errorRecoveryDisabledLanes |= n, Gt |= n, l = 4;
                  break e;
                }
                n = aa, aa = l, n !== null && (aa === null ? aa = n : aa.push.apply(
                  aa,
                  n
                ));
              }
              l = o;
            }
            if (n = !1, l !== 2) continue;
          }
        }
        if (l === 1) {
          wi(e, 0), bt(e, a, 0, !0);
          break;
        }
        e: {
          switch (i = e, n = l, n) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              bt(
                i,
                a,
                da,
                !dt
              );
              break e;
            case 2:
              aa = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((a & 62914560) === a && (l = xn + 300 - la(), 10 < l)) {
            if (bt(
              i,
              a,
              da,
              !dt
            ), Ol(i, 0, !0) !== 0) break e;
            $a = a, i.timeoutHandle = Vf(
              bf.bind(
                null,
                i,
                t,
                aa,
                yn,
                Or,
                a,
                da,
                Gt,
                yi,
                dt,
                n,
                "Throttled",
                -0,
                0
              ),
              l
            );
            break e;
          }
          bf(
            i,
            t,
            aa,
            yn,
            Or,
            a,
            da,
            Gt,
            yi,
            dt,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Na(e);
  }
  function bf(e, a, t, i, l, n, o, r, u, g, x, z, b, h) {
    if (e.timeoutHandle = -1, z = a.subtreeFlags, z & 8192 || (z & 16785408) === 16785408) {
      z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ha
      }, uf(
        a,
        n,
        z
      );
      var D = (n & 62914560) === n ? xn - la() : (n & 4194048) === n ? df - la() : 0;
      if (D = Pp(
        z,
        D
      ), D !== null) {
        $a = n, e.cancelPendingCommit = D(
          Sf.bind(
            null,
            e,
            a,
            n,
            t,
            i,
            l,
            o,
            r,
            u,
            x,
            z,
            null,
            b,
            h
          )
        ), bt(e, n, o, !g);
        return;
      }
    }
    Sf(
      e,
      a,
      n,
      t,
      i,
      l,
      o,
      r,
      u
    );
  }
  function gp(e) {
    for (var a = e; ; ) {
      var t = a.tag;
      if ((t === 0 || t === 11 || t === 15) && a.flags & 16384 && (t = a.updateQueue, t !== null && (t = t.stores, t !== null)))
        for (var i = 0; i < t.length; i++) {
          var l = t[i], n = l.getSnapshot;
          l = l.value;
          try {
            if (!ra(n(), l)) return !1;
          } catch {
            return !1;
          }
        }
      if (t = a.child, a.subtreeFlags & 16384 && t !== null)
        t.return = a, a = t;
      else {
        if (a === e) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e) return !0;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return !0;
  }
  function bt(e, a, t, i) {
    a &= ~Mr, a &= ~Gt, e.suspendedLanes |= a, e.pingedLanes &= ~a, i && (e.warmLanes |= a), i = e.expirationTimes;
    for (var l = a; 0 < l; ) {
      var n = 31 - oa(l), o = 1 << n;
      i[n] = -1, l &= ~o;
    }
    t !== 0 && Au(e, t, a);
  }
  function _n() {
    return (ne & 6) === 0 ? (dl(0), !1) : !0;
  }
  function Ur() {
    if (F !== null) {
      if (re === 0)
        var e = F.return;
      else
        e = F, ka = jt = null, Wo(e), di = null, Ji = 0, e = F;
      for (; e !== null; )
        Vs(e.alternate, e), e = e.return;
      F = null;
    }
  }
  function wi(e, a) {
    var t = e.timeoutHandle;
    t !== -1 && (e.timeoutHandle = -1, Hp(t)), t = e.cancelPendingCommit, t !== null && (e.cancelPendingCommit = null, t()), $a = 0, Ur(), me = e, F = t = Ba(e.current, null), P = a, re = 0, fa = null, dt = !1, vi = Di(e, a), Tr = !1, yi = da = Mr = Gt = pt = Se = 0, aa = sl = null, Or = !1, (a & 8) !== 0 && (a |= a & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= a; 0 < i; ) {
        var l = 31 - oa(i), n = 1 << l;
        a |= e[l], i &= ~n;
      }
    return Wa = a, Yl(), t;
  }
  function hf(e, a) {
    V = null, y.H = tl, a === fi || a === Wl ? (a = Nc(), re = 3) : a === Bo ? (a = Nc(), re = 4) : re = a === fr ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, fa = a, F === null && (Se = 1, sn(
      e,
      ha(a, e.current)
    ));
  }
  function xf() {
    var e = ca.current;
    return e === null ? !0 : (P & 4194048) === P ? _a === null : (P & 62914560) === P || (P & 536870912) !== 0 ? e === _a : !1;
  }
  function vf() {
    var e = y.H;
    return y.H = tl, e === null ? tl : e;
  }
  function yf() {
    var e = y.A;
    return y.A = pp, e;
  }
  function wn() {
    Se = 4, dt || (P & 4194048) !== P && ca.current !== null || (vi = !0), (pt & 134217727) === 0 && (Gt & 134217727) === 0 || me === null || bt(
      me,
      P,
      da,
      !1
    );
  }
  function jr(e, a, t) {
    var i = ne;
    ne |= 2;
    var l = vf(), n = yf();
    (me !== e || P !== a) && (yn = null, wi(e, a)), a = !1;
    var o = Se;
    e: do
      try {
        if (re !== 0 && F !== null) {
          var r = F, u = fa;
          switch (re) {
            case 8:
              Ur(), o = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ca.current === null && (a = !0);
              var g = re;
              if (re = 0, fa = null, zi(e, r, u, g), t && vi) {
                o = 0;
                break e;
              }
              break;
            default:
              g = re, re = 0, fa = null, zi(e, r, u, g);
          }
        }
        bp(), o = Se;
        break;
      } catch (x) {
        hf(e, x);
      }
    while (!0);
    return a && e.shellSuspendCounter++, ka = jt = null, ne = i, y.H = l, y.A = n, F === null && (me = null, P = 0, Yl()), o;
  }
  function bp() {
    for (; F !== null; ) _f(F);
  }
  function hp(e, a) {
    var t = ne;
    ne |= 2;
    var i = vf(), l = yf();
    me !== e || P !== a ? (yn = null, vn = la() + 500, wi(e, a)) : vi = Di(
      e,
      a
    );
    e: do
      try {
        if (re !== 0 && F !== null) {
          a = F;
          var n = fa;
          a: switch (re) {
            case 1:
              re = 0, fa = null, zi(e, a, n, 1);
              break;
            case 2:
            case 9:
              if (Cc(n)) {
                re = 0, fa = null, wf(a);
                break;
              }
              a = function() {
                re !== 2 && re !== 9 || me !== e || (re = 7), Na(e);
              }, n.then(a, a);
              break e;
            case 3:
              re = 7;
              break e;
            case 4:
              re = 5;
              break e;
            case 7:
              Cc(n) ? (re = 0, fa = null, wf(a)) : (re = 0, fa = null, zi(e, a, n, 7));
              break;
            case 5:
              var o = null;
              switch (F.tag) {
                case 26:
                  o = F.memoizedState;
                case 5:
                case 27:
                  var r = F;
                  if (o ? rd(o) : r.stateNode.complete) {
                    re = 0, fa = null;
                    var u = r.sibling;
                    if (u !== null) F = u;
                    else {
                      var g = r.return;
                      g !== null ? (F = g, zn(g)) : F = null;
                    }
                    break a;
                  }
              }
              re = 0, fa = null, zi(e, a, n, 5);
              break;
            case 6:
              re = 0, fa = null, zi(e, a, n, 6);
              break;
            case 8:
              Ur(), Se = 6;
              break e;
            default:
              throw Error(f(462));
          }
        }
        xp();
        break;
      } catch (x) {
        hf(e, x);
      }
    while (!0);
    return ka = jt = null, y.H = i, y.A = l, ne = t, F !== null ? 0 : (me = null, P = 0, Yl(), Se);
  }
  function xp() {
    for (; F !== null && !Yd(); )
      _f(F);
  }
  function _f(e) {
    var a = Ls(e.alternate, e, Wa);
    e.memoizedProps = e.pendingProps, a === null ? zn(e) : F = a;
  }
  function wf(e) {
    var a = e, t = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = qs(
          t,
          a,
          a.pendingProps,
          a.type,
          void 0,
          P
        );
        break;
      case 11:
        a = qs(
          t,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          P
        );
        break;
      case 5:
        Wo(a);
      default:
        Vs(t, a), a = F = vc(a, Wa), a = Ls(t, a, Wa);
    }
    e.memoizedProps = e.pendingProps, a === null ? zn(e) : F = a;
  }
  function zi(e, a, t, i) {
    ka = jt = null, Wo(a), di = null, Ji = 0;
    var l = a.return;
    try {
      if (op(
        e,
        l,
        a,
        t,
        P
      )) {
        Se = 1, sn(
          e,
          ha(t, e.current)
        ), F = null;
        return;
      }
    } catch (n) {
      if (l !== null) throw F = l, n;
      Se = 1, sn(
        e,
        ha(t, e.current)
      ), F = null;
      return;
    }
    a.flags & 32768 ? (ae || i === 1 ? e = !0 : vi || (P & 536870912) !== 0 ? e = !1 : (dt = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = ca.current, i !== null && i.tag === 13 && (i.flags |= 16384))), zf(a, e)) : zn(a);
  }
  function zn(e) {
    var a = e;
    do {
      if ((a.flags & 32768) !== 0) {
        zf(
          a,
          dt
        );
        return;
      }
      e = a.return;
      var t = cp(
        a.alternate,
        a,
        Wa
      );
      if (t !== null) {
        F = t;
        return;
      }
      if (a = a.sibling, a !== null) {
        F = a;
        return;
      }
      F = a = e;
    } while (a !== null);
    Se === 0 && (Se = 5);
  }
  function zf(e, a) {
    do {
      var t = sp(e.alternate, e);
      if (t !== null) {
        t.flags &= 32767, F = t;
        return;
      }
      if (t = e.return, t !== null && (t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null), !a && (e = e.sibling, e !== null)) {
        F = e;
        return;
      }
      F = e = t;
    } while (e !== null);
    Se = 6, F = null;
  }
  function Sf(e, a, t, i, l, n, o, r, u) {
    e.cancelPendingCommit = null;
    do
      Sn();
    while (He !== 0);
    if ((ne & 6) !== 0) throw Error(f(327));
    if (a !== null) {
      if (a === e.current) throw Error(f(177));
      if (n = a.lanes | a.childLanes, n |= wo, Fd(
        e,
        t,
        n,
        o,
        r,
        u
      ), e === me && (F = me = null, P = 0), _i = a, gt = e, $a = t, Cr = n, Dr = l, pf = i, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, wp(Al, function() {
        return Of(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || i) {
        i = y.T, y.T = null, l = M.p, M.p = 2, o = ne, ne |= 4;
        try {
          fp(e, a, t);
        } finally {
          ne = o, M.p = l, y.T = i;
        }
      }
      He = 1, Af(), Ef(), Tf();
    }
  }
  function Af() {
    if (He === 1) {
      He = 0;
      var e = gt, a = _i, t = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || t) {
        t = y.T, y.T = null;
        var i = M.p;
        M.p = 2;
        var l = ne;
        ne |= 4;
        try {
          nf(a, e);
          var n = Vr, o = sc(e.containerInfo), r = n.focusedElem, u = n.selectionRange;
          if (o !== r && r && r.ownerDocument && cc(
            r.ownerDocument.documentElement,
            r
          )) {
            if (u !== null && ho(r)) {
              var g = u.start, x = u.end;
              if (x === void 0 && (x = g), "selectionStart" in r)
                r.selectionStart = g, r.selectionEnd = Math.min(
                  x,
                  r.value.length
                );
              else {
                var z = r.ownerDocument || document, b = z && z.defaultView || window;
                if (b.getSelection) {
                  var h = b.getSelection(), D = r.textContent.length, k = Math.min(u.start, D), de = u.end === void 0 ? k : Math.min(u.end, D);
                  !h.extend && k > de && (o = de, de = k, k = o);
                  var p = uc(
                    r,
                    k
                  ), s = uc(
                    r,
                    de
                  );
                  if (p && s && (h.rangeCount !== 1 || h.anchorNode !== p.node || h.anchorOffset !== p.offset || h.focusNode !== s.node || h.focusOffset !== s.offset)) {
                    var m = z.createRange();
                    m.setStart(p.node, p.offset), h.removeAllRanges(), k > de ? (h.addRange(m), h.extend(s.node, s.offset)) : (m.setEnd(s.node, s.offset), h.addRange(m));
                  }
                }
              }
            }
            for (z = [], h = r; h = h.parentNode; )
              h.nodeType === 1 && z.push({
                element: h,
                left: h.scrollLeft,
                top: h.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < z.length; r++) {
              var _ = z[r];
              _.element.scrollLeft = _.left, _.element.scrollTop = _.top;
            }
          }
          Rn = !!Xr, Vr = Xr = null;
        } finally {
          ne = l, M.p = i, y.T = t;
        }
      }
      e.current = a, He = 2;
    }
  }
  function Ef() {
    if (He === 2) {
      He = 0;
      var e = gt, a = _i, t = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || t) {
        t = y.T, y.T = null;
        var i = M.p;
        M.p = 2;
        var l = ne;
        ne |= 4;
        try {
          Ps(e, a.alternate, a);
        } finally {
          ne = l, M.p = i, y.T = t;
        }
      }
      He = 3;
    }
  }
  function Tf() {
    if (He === 4 || He === 3) {
      He = 0, Qd();
      var e = gt, a = _i, t = $a, i = pf;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? He = 5 : (He = 0, _i = gt = null, Mf(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (l === 0 && (mt = null), Fn(t), a = a.stateNode, na && typeof na.onCommitFiberRoot == "function")
        try {
          na.onCommitFiberRoot(
            Ci,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        a = y.T, l = M.p, M.p = 2, y.T = null;
        try {
          for (var n = e.onRecoverableError, o = 0; o < i.length; o++) {
            var r = i[o];
            n(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          y.T = a, M.p = l;
        }
      }
      ($a & 3) !== 0 && Sn(), Na(e), l = e.pendingLanes, (t & 261930) !== 0 && (l & 42) !== 0 ? e === Nr ? fl++ : (fl = 0, Nr = e) : fl = 0, dl(0);
    }
  }
  function Mf(e, a) {
    (e.pooledCacheLanes &= a) === 0 && (a = e.pooledCache, a != null && (e.pooledCache = null, Vi(a)));
  }
  function Sn() {
    return Af(), Ef(), Tf(), Of();
  }
  function Of() {
    if (He !== 5) return !1;
    var e = gt, a = Cr;
    Cr = 0;
    var t = Fn($a), i = y.T, l = M.p;
    try {
      M.p = 32 > t ? 32 : t, y.T = null, t = Dr, Dr = null;
      var n = gt, o = $a;
      if (He = 0, _i = gt = null, $a = 0, (ne & 6) !== 0) throw Error(f(331));
      var r = ne;
      if (ne |= 4, sf(n.current), rf(
        n,
        n.current,
        o,
        t
      ), ne = r, dl(0, !1), na && typeof na.onPostCommitFiberRoot == "function")
        try {
          na.onPostCommitFiberRoot(Ci, n);
        } catch {
        }
      return !0;
    } finally {
      M.p = l, y.T = i, Mf(e, a);
    }
  }
  function Cf(e, a, t) {
    a = ha(t, a), a = sr(e.stateNode, a, 2), e = ut(e, a, 2), e !== null && (Ni(e, 2), Na(e));
  }
  function ue(e, a, t) {
    if (e.tag === 3)
      Cf(e, e, t);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          Cf(
            a,
            e,
            t
          );
          break;
        } else if (a.tag === 1) {
          var i = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (mt === null || !mt.has(i))) {
            e = ha(t, e), t = Cs(2), i = ut(a, t, 2), i !== null && (Ds(
              t,
              i,
              a,
              e
            ), Ni(i, 2), Na(i));
            break;
          }
        }
        a = a.return;
      }
  }
  function Hr(e, a, t) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new mp();
      var l = /* @__PURE__ */ new Set();
      i.set(a, l);
    } else
      l = i.get(a), l === void 0 && (l = /* @__PURE__ */ new Set(), i.set(a, l));
    l.has(t) || (Tr = !0, l.add(t), e = vp.bind(null, e, a, t), a.then(e, e));
  }
  function vp(e, a, t) {
    var i = e.pingCache;
    i !== null && i.delete(a), e.pingedLanes |= e.suspendedLanes & t, e.warmLanes &= ~t, me === e && (P & t) === t && (Se === 4 || Se === 3 && (P & 62914560) === P && 300 > la() - xn ? (ne & 2) === 0 && wi(e, 0) : Mr |= t, yi === P && (yi = 0)), Na(e);
  }
  function Df(e, a) {
    a === 0 && (a = Su()), e = Dt(e, a), e !== null && (Ni(e, a), Na(e));
  }
  function yp(e) {
    var a = e.memoizedState, t = 0;
    a !== null && (t = a.retryLane), Df(e, t);
  }
  function _p(e, a) {
    var t = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, l = e.memoizedState;
        l !== null && (t = l.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    i !== null && i.delete(a), Df(e, t);
  }
  function wp(e, a) {
    return Kn(e, a);
  }
  var An = null, Si = null, Rr = !1, En = !1, Br = !1, ht = 0;
  function Na(e) {
    e !== Si && e.next === null && (Si === null ? An = Si = e : Si = Si.next = e), En = !0, Rr || (Rr = !0, Sp());
  }
  function dl(e, a) {
    if (!Br && En) {
      Br = !0;
      do
        for (var t = !1, i = An; i !== null; ) {
          if (e !== 0) {
            var l = i.pendingLanes;
            if (l === 0) var n = 0;
            else {
              var o = i.suspendedLanes, r = i.pingedLanes;
              n = (1 << 31 - oa(42 | e) + 1) - 1, n &= l & ~(o & ~r), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (t = !0, Hf(i, n));
          } else
            n = P, n = Ol(
              i,
              i === me ? n : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (n & 3) === 0 || Di(i, n) || (t = !0, Hf(i, n));
          i = i.next;
        }
      while (t);
      Br = !1;
    }
  }
  function zp() {
    Nf();
  }
  function Nf() {
    En = Rr = !1;
    var e = 0;
    ht !== 0 && jp() && (e = ht);
    for (var a = la(), t = null, i = An; i !== null; ) {
      var l = i.next, n = Uf(i, a);
      n === 0 ? (i.next = null, t === null ? An = l : t.next = l, l === null && (Si = t)) : (t = i, (e !== 0 || (n & 3) !== 0) && (En = !0)), i = l;
    }
    He !== 0 && He !== 5 || dl(e), ht !== 0 && (ht = 0);
  }
  function Uf(e, a) {
    for (var t = e.suspendedLanes, i = e.pingedLanes, l = e.expirationTimes, n = e.pendingLanes & -62914561; 0 < n; ) {
      var o = 31 - oa(n), r = 1 << o, u = l[o];
      u === -1 ? ((r & t) === 0 || (r & i) !== 0) && (l[o] = $d(r, a)) : u <= a && (e.expiredLanes |= r), n &= ~r;
    }
    if (a = me, t = P, t = Ol(
      e,
      e === a ? t : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, t === 0 || e === a && (re === 2 || re === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && Jn(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((t & 3) === 0 || Di(e, t)) {
      if (a = t & -t, a === e.callbackPriority) return a;
      switch (i !== null && Jn(i), Fn(t)) {
        case 2:
        case 8:
          t = wu;
          break;
        case 32:
          t = Al;
          break;
        case 268435456:
          t = zu;
          break;
        default:
          t = Al;
      }
      return i = jf.bind(null, e), t = Kn(t, i), e.callbackPriority = a, e.callbackNode = t, a;
    }
    return i !== null && i !== null && Jn(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function jf(e, a) {
    if (He !== 0 && He !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var t = e.callbackNode;
    if (Sn() && e.callbackNode !== t)
      return null;
    var i = P;
    return i = Ol(
      e,
      e === me ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (gf(e, i, a), Uf(e, la()), e.callbackNode != null && e.callbackNode === t ? jf.bind(null, e) : null);
  }
  function Hf(e, a) {
    if (Sn()) return null;
    gf(e, a, !0);
  }
  function Sp() {
    Rp(function() {
      (ne & 6) !== 0 ? Kn(
        _u,
        zp
      ) : Nf();
    });
  }
  function qr() {
    if (ht === 0) {
      var e = ci;
      e === 0 && (e = El, El <<= 1, (El & 261888) === 0 && (El = 256)), ht = e;
    }
    return ht;
  }
  function Rf(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ul("" + e);
  }
  function Bf(e, a) {
    var t = a.ownerDocument.createElement("input");
    return t.name = a.name, t.value = a.value, e.id && t.setAttribute("form", e.id), a.parentNode.insertBefore(t, a), e = new FormData(e), t.parentNode.removeChild(t), e;
  }
  function Ap(e, a, t, i, l) {
    if (a === "submit" && t && t.stateNode === l) {
      var n = Rf(
        (l[$e] || null).action
      ), o = i.submitter;
      o && (a = (a = o[$e] || null) ? Rf(a.formAction) : o.getAttribute("formAction"), a !== null && (n = a, o = null));
      var r = new Bl(
        "action",
        "action",
        null,
        i,
        l
      );
      e.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (ht !== 0) {
                  var u = o ? Bf(l, o) : new FormData(l);
                  lr(
                    t,
                    {
                      pending: !0,
                      data: u,
                      method: l.method,
                      action: n
                    },
                    null,
                    u
                  );
                }
              } else
                typeof n == "function" && (r.preventDefault(), u = o ? Bf(l, o) : new FormData(l), lr(
                  t,
                  {
                    pending: !0,
                    data: u,
                    method: l.method,
                    action: n
                  },
                  n,
                  u
                ));
            },
            currentTarget: l
          }
        ]
      });
    }
  }
  for (var kr = 0; kr < _o.length; kr++) {
    var Zr = _o[kr], Ep = Zr.toLowerCase(), Tp = Zr[0].toUpperCase() + Zr.slice(1);
    Aa(
      Ep,
      "on" + Tp
    );
  }
  Aa(pc, "onAnimationEnd"), Aa(mc, "onAnimationIteration"), Aa(gc, "onAnimationStart"), Aa("dblclick", "onDoubleClick"), Aa("focusin", "onFocus"), Aa("focusout", "onBlur"), Aa(G0, "onTransitionRun"), Aa(L0, "onTransitionStart"), Aa(X0, "onTransitionCancel"), Aa(bc, "onTransitionEnd"), Wt("onMouseEnter", ["mouseout", "mouseover"]), Wt("onMouseLeave", ["mouseout", "mouseover"]), Wt("onPointerEnter", ["pointerout", "pointerover"]), Wt("onPointerLeave", ["pointerout", "pointerover"]), Tt(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Tt(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Tt("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Tt(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Tt(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Tt(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Mp = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(pl)
  );
  function qf(e, a) {
    a = (a & 4) !== 0;
    for (var t = 0; t < e.length; t++) {
      var i = e[t], l = i.event;
      i = i.listeners;
      e: {
        var n = void 0;
        if (a)
          for (var o = i.length - 1; 0 <= o; o--) {
            var r = i[o], u = r.instance, g = r.currentTarget;
            if (r = r.listener, u !== n && l.isPropagationStopped())
              break e;
            n = r, l.currentTarget = g;
            try {
              n(l);
            } catch (x) {
              Zl(x);
            }
            l.currentTarget = null, n = u;
          }
        else
          for (o = 0; o < i.length; o++) {
            if (r = i[o], u = r.instance, g = r.currentTarget, r = r.listener, u !== n && l.isPropagationStopped())
              break e;
            n = r, l.currentTarget = g;
            try {
              n(l);
            } catch (x) {
              Zl(x);
            }
            l.currentTarget = null, n = u;
          }
      }
    }
  }
  function I(e, a) {
    var t = a[In];
    t === void 0 && (t = a[In] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    t.has(i) || (kf(a, e, 2, !1), t.add(i));
  }
  function Yr(e, a, t) {
    var i = 0;
    a && (i |= 4), kf(
      t,
      e,
      i,
      a
    );
  }
  var Tn = "_reactListening" + Math.random().toString(36).slice(2);
  function Qr(e) {
    if (!e[Tn]) {
      e[Tn] = !0, Du.forEach(function(t) {
        t !== "selectionchange" && (Mp.has(t) || Yr(t, !1, e), Yr(t, !0, e));
      });
      var a = e.nodeType === 9 ? e : e.ownerDocument;
      a === null || a[Tn] || (a[Tn] = !0, Yr("selectionchange", !1, a));
    }
  }
  function kf(e, a, t, i) {
    switch (md(a)) {
      case 2:
        var l = tm;
        break;
      case 8:
        l = im;
        break;
      default:
        l = iu;
    }
    t = l.bind(
      null,
      a,
      t,
      e
    ), l = void 0, !ro || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (l = !0), i ? l !== void 0 ? e.addEventListener(a, t, {
      capture: !0,
      passive: l
    }) : e.addEventListener(a, t, !0) : l !== void 0 ? e.addEventListener(a, t, {
      passive: l
    }) : e.addEventListener(a, t, !1);
  }
  function Gr(e, a, t, i, l) {
    var n = i;
    if ((a & 1) === 0 && (a & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var o = i.tag;
        if (o === 3 || o === 4) {
          var r = i.stateNode.containerInfo;
          if (r === l) break;
          if (o === 4)
            for (o = i.return; o !== null; ) {
              var u = o.tag;
              if ((u === 3 || u === 4) && o.stateNode.containerInfo === l)
                return;
              o = o.return;
            }
          for (; r !== null; ) {
            if (o = Vt(r), o === null) return;
            if (u = o.tag, u === 5 || u === 6 || u === 26 || u === 27) {
              i = n = o;
              continue e;
            }
            r = r.parentNode;
          }
        }
        i = i.return;
      }
    Gu(function() {
      var g = n, x = no(t), z = [];
      e: {
        var b = hc.get(e);
        if (b !== void 0) {
          var h = Bl, D = e;
          switch (e) {
            case "keypress":
              if (Hl(t) === 0) break e;
            case "keydown":
            case "keyup":
              h = _0;
              break;
            case "focusin":
              D = "focus", h = fo;
              break;
            case "focusout":
              D = "blur", h = fo;
              break;
            case "beforeblur":
            case "afterblur":
              h = fo;
              break;
            case "click":
              if (t.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              h = Vu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              h = c0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              h = S0;
              break;
            case pc:
            case mc:
            case gc:
              h = d0;
              break;
            case bc:
              h = E0;
              break;
            case "scroll":
            case "scrollend":
              h = r0;
              break;
            case "wheel":
              h = M0;
              break;
            case "copy":
            case "cut":
            case "paste":
              h = m0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              h = Ju;
              break;
            case "toggle":
            case "beforetoggle":
              h = C0;
          }
          var k = (a & 4) !== 0, de = !k && (e === "scroll" || e === "scrollend"), p = k ? b !== null ? b + "Capture" : null : b;
          k = [];
          for (var s = g, m; s !== null; ) {
            var _ = s;
            if (m = _.stateNode, _ = _.tag, _ !== 5 && _ !== 26 && _ !== 27 || m === null || p === null || (_ = Hi(s, p), _ != null && k.push(
              ml(s, _, m)
            )), de) break;
            s = s.return;
          }
          0 < k.length && (b = new h(
            b,
            D,
            null,
            t,
            x
          ), z.push({ event: b, listeners: k }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (b = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", b && t !== lo && (D = t.relatedTarget || t.fromElement) && (Vt(D) || D[Xt]))
            break e;
          if ((h || b) && (b = x.window === x ? x : (b = x.ownerDocument) ? b.defaultView || b.parentWindow : window, h ? (D = t.relatedTarget || t.toElement, h = g, D = D ? Vt(D) : null, D !== null && (de = R(D), k = D.tag, D !== de || k !== 5 && k !== 27 && k !== 6) && (D = null)) : (h = null, D = g), h !== D)) {
            if (k = Vu, _ = "onMouseLeave", p = "onMouseEnter", s = "mouse", (e === "pointerout" || e === "pointerover") && (k = Ju, _ = "onPointerLeave", p = "onPointerEnter", s = "pointer"), de = h == null ? b : ji(h), m = D == null ? b : ji(D), b = new k(
              _,
              s + "leave",
              h,
              t,
              x
            ), b.target = de, b.relatedTarget = m, _ = null, Vt(x) === g && (k = new k(
              p,
              s + "enter",
              D,
              t,
              x
            ), k.target = m, k.relatedTarget = de, _ = k), de = _, h && D)
              a: {
                for (k = Op, p = h, s = D, m = 0, _ = p; _; _ = k(_))
                  m++;
                _ = 0;
                for (var B = s; B; B = k(B))
                  _++;
                for (; 0 < m - _; )
                  p = k(p), m--;
                for (; 0 < _ - m; )
                  s = k(s), _--;
                for (; m--; ) {
                  if (p === s || s !== null && p === s.alternate) {
                    k = p;
                    break a;
                  }
                  p = k(p), s = k(s);
                }
                k = null;
              }
            else k = null;
            h !== null && Zf(
              z,
              b,
              h,
              k,
              !1
            ), D !== null && de !== null && Zf(
              z,
              de,
              D,
              k,
              !0
            );
          }
        }
        e: {
          if (b = g ? ji(g) : window, h = b.nodeName && b.nodeName.toLowerCase(), h === "select" || h === "input" && b.type === "file")
            var ie = tc;
          else if (ec(b))
            if (ic)
              ie = Z0;
            else {
              ie = q0;
              var j = B0;
            }
          else
            h = b.nodeName, !h || h.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? g && io(g.elementType) && (ie = tc) : ie = k0;
          if (ie && (ie = ie(e, g))) {
            ac(
              z,
              ie,
              t,
              x
            );
            break e;
          }
          j && j(e, b, g), e === "focusout" && g && b.type === "number" && g.memoizedProps.value != null && to(b, "number", b.value);
        }
        switch (j = g ? ji(g) : window, e) {
          case "focusin":
            (ec(j) || j.contentEditable === "true") && (ai = j, xo = g, Gi = null);
            break;
          case "focusout":
            Gi = xo = ai = null;
            break;
          case "mousedown":
            vo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vo = !1, fc(z, t, x);
            break;
          case "selectionchange":
            if (Q0) break;
          case "keydown":
          case "keyup":
            fc(z, t, x);
        }
        var J;
        if (mo)
          e: {
            switch (e) {
              case "compositionstart":
                var ee = "onCompositionStart";
                break e;
              case "compositionend":
                ee = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ee = "onCompositionUpdate";
                break e;
            }
            ee = void 0;
          }
        else
          ei ? Iu(e, t) && (ee = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (ee = "onCompositionStart");
        ee && (Wu && t.locale !== "ko" && (ei || ee !== "onCompositionStart" ? ee === "onCompositionEnd" && ei && (J = Lu()) : (at = x, uo = "value" in at ? at.value : at.textContent, ei = !0)), j = Mn(g, ee), 0 < j.length && (ee = new Ku(
          ee,
          e,
          null,
          t,
          x
        ), z.push({ event: ee, listeners: j }), J ? ee.data = J : (J = Pu(t), J !== null && (ee.data = J)))), (J = N0 ? U0(e, t) : j0(e, t)) && (ee = Mn(g, "onBeforeInput"), 0 < ee.length && (j = new Ku(
          "onBeforeInput",
          "beforeinput",
          null,
          t,
          x
        ), z.push({
          event: j,
          listeners: ee
        }), j.data = J)), Ap(
          z,
          e,
          g,
          t,
          x
        );
      }
      qf(z, a);
    });
  }
  function ml(e, a, t) {
    return {
      instance: e,
      listener: a,
      currentTarget: t
    };
  }
  function Mn(e, a) {
    for (var t = a + "Capture", i = []; e !== null; ) {
      var l = e, n = l.stateNode;
      if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || n === null || (l = Hi(e, t), l != null && i.unshift(
        ml(e, l, n)
      ), l = Hi(e, a), l != null && i.push(
        ml(e, l, n)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function Op(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Zf(e, a, t, i, l) {
    for (var n = a._reactName, o = []; t !== null && t !== i; ) {
      var r = t, u = r.alternate, g = r.stateNode;
      if (r = r.tag, u !== null && u === i) break;
      r !== 5 && r !== 26 && r !== 27 || g === null || (u = g, l ? (g = Hi(t, n), g != null && o.unshift(
        ml(t, g, u)
      )) : l || (g = Hi(t, n), g != null && o.push(
        ml(t, g, u)
      ))), t = t.return;
    }
    o.length !== 0 && e.push({ event: a, listeners: o });
  }
  var Cp = /\r\n?/g, Dp = /\u0000|\uFFFD/g;
  function Yf(e) {
    return (typeof e == "string" ? e : "" + e).replace(Cp, `
`).replace(Dp, "");
  }
  function Qf(e, a) {
    return a = Yf(a), Yf(e) === a;
  }
  function fe(e, a, t, i, l, n) {
    switch (t) {
      case "children":
        typeof i == "string" ? a === "body" || a === "textarea" && i === "" || Ft(e, i) : (typeof i == "number" || typeof i == "bigint") && a !== "body" && Ft(e, "" + i);
        break;
      case "className":
        Dl(e, "class", i);
        break;
      case "tabIndex":
        Dl(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Dl(e, t, i);
        break;
      case "style":
        Yu(e, i, n);
        break;
      case "data":
        if (a !== "object") {
          Dl(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (a !== "a" || t !== "href")) {
          e.removeAttribute(t);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(t);
          break;
        }
        i = Ul("" + i), e.setAttribute(t, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            t,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (t === "formAction" ? (a !== "input" && fe(e, a, "name", l.name, l, null), fe(
            e,
            a,
            "formEncType",
            l.formEncType,
            l,
            null
          ), fe(
            e,
            a,
            "formMethod",
            l.formMethod,
            l,
            null
          ), fe(
            e,
            a,
            "formTarget",
            l.formTarget,
            l,
            null
          )) : (fe(e, a, "encType", l.encType, l, null), fe(e, a, "method", l.method, l, null), fe(e, a, "target", l.target, l, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(t);
          break;
        }
        i = Ul("" + i), e.setAttribute(t, i);
        break;
      case "onClick":
        i != null && (e.onclick = Ha);
        break;
      case "onScroll":
        i != null && I("scroll", e);
        break;
      case "onScrollEnd":
        i != null && I("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(f(61));
          if (t = i.__html, t != null) {
            if (l.children != null) throw Error(f(60));
            e.innerHTML = t;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
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
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        t = Ul("" + i), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          t
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
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(t, "" + i) : e.removeAttribute(t);
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
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(t, "") : e.removeAttribute(t);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(t, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(t, i) : e.removeAttribute(t);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(t, i) : e.removeAttribute(t);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(t) : e.setAttribute(t, i);
        break;
      case "popover":
        I("beforetoggle", e), I("toggle", e), Cl(e, "popover", i);
        break;
      case "xlinkActuate":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        ja(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        ja(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        ja(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        ja(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Cl(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = n0.get(t) || t, Cl(e, t, i));
    }
  }
  function Lr(e, a, t, i, l, n) {
    switch (t) {
      case "style":
        Yu(e, i, n);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(f(61));
          if (t = i.__html, t != null) {
            if (l.children != null) throw Error(f(60));
            e.innerHTML = t;
          }
        }
        break;
      case "children":
        typeof i == "string" ? Ft(e, i) : (typeof i == "number" || typeof i == "bigint") && Ft(e, "" + i);
        break;
      case "onScroll":
        i != null && I("scroll", e);
        break;
      case "onScrollEnd":
        i != null && I("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = Ha);
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
        if (!Nu.hasOwnProperty(t))
          e: {
            if (t[0] === "o" && t[1] === "n" && (l = t.endsWith("Capture"), a = t.slice(2, l ? t.length - 7 : void 0), n = e[$e] || null, n = n != null ? n[t] : null, typeof n == "function" && e.removeEventListener(a, n, l), typeof i == "function")) {
              typeof n != "function" && n !== null && (t in e ? e[t] = null : e.hasAttribute(t) && e.removeAttribute(t)), e.addEventListener(a, i, l);
              break e;
            }
            t in e ? e[t] = i : i === !0 ? e.setAttribute(t, "") : Cl(e, t, i);
          }
    }
  }
  function Ge(e, a, t) {
    switch (a) {
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
        I("error", e), I("load", e);
        var i = !1, l = !1, n;
        for (n in t)
          if (t.hasOwnProperty(n)) {
            var o = t[n];
            if (o != null)
              switch (n) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  l = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(f(137, a));
                default:
                  fe(e, a, n, o, t, null);
              }
          }
        l && fe(e, a, "srcSet", t.srcSet, t, null), i && fe(e, a, "src", t.src, t, null);
        return;
      case "input":
        I("invalid", e);
        var r = n = o = l = null, u = null, g = null;
        for (i in t)
          if (t.hasOwnProperty(i)) {
            var x = t[i];
            if (x != null)
              switch (i) {
                case "name":
                  l = x;
                  break;
                case "type":
                  o = x;
                  break;
                case "checked":
                  u = x;
                  break;
                case "defaultChecked":
                  g = x;
                  break;
                case "value":
                  n = x;
                  break;
                case "defaultValue":
                  r = x;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (x != null)
                    throw Error(f(137, a));
                  break;
                default:
                  fe(e, a, i, x, t, null);
              }
          }
        Bu(
          e,
          n,
          r,
          u,
          g,
          o,
          l,
          !1
        );
        return;
      case "select":
        I("invalid", e), i = o = n = null;
        for (l in t)
          if (t.hasOwnProperty(l) && (r = t[l], r != null))
            switch (l) {
              case "value":
                n = r;
                break;
              case "defaultValue":
                o = r;
                break;
              case "multiple":
                i = r;
              default:
                fe(e, a, l, r, t, null);
            }
        a = n, t = o, e.multiple = !!i, a != null ? $t(e, !!i, a, !1) : t != null && $t(e, !!i, t, !0);
        return;
      case "textarea":
        I("invalid", e), n = l = i = null;
        for (o in t)
          if (t.hasOwnProperty(o) && (r = t[o], r != null))
            switch (o) {
              case "value":
                i = r;
                break;
              case "defaultValue":
                l = r;
                break;
              case "children":
                n = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(f(91));
                break;
              default:
                fe(e, a, o, r, t, null);
            }
        ku(e, i, l, n);
        return;
      case "option":
        for (u in t)
          if (t.hasOwnProperty(u) && (i = t[u], i != null))
            switch (u) {
              case "selected":
                e.selected = i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                fe(e, a, u, i, t, null);
            }
        return;
      case "dialog":
        I("beforetoggle", e), I("toggle", e), I("cancel", e), I("close", e);
        break;
      case "iframe":
      case "object":
        I("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < pl.length; i++)
          I(pl[i], e);
        break;
      case "image":
        I("error", e), I("load", e);
        break;
      case "details":
        I("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        I("error", e), I("load", e);
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
        for (g in t)
          if (t.hasOwnProperty(g) && (i = t[g], i != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, a));
              default:
                fe(e, a, g, i, t, null);
            }
        return;
      default:
        if (io(a)) {
          for (x in t)
            t.hasOwnProperty(x) && (i = t[x], i !== void 0 && Lr(
              e,
              a,
              x,
              i,
              t,
              void 0
            ));
          return;
        }
    }
    for (r in t)
      t.hasOwnProperty(r) && (i = t[r], i != null && fe(e, a, r, i, t, null));
  }
  function Np(e, a, t, i) {
    switch (a) {
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
        var l = null, n = null, o = null, r = null, u = null, g = null, x = null;
        for (h in t) {
          var z = t[h];
          if (t.hasOwnProperty(h) && z != null)
            switch (h) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                u = z;
              default:
                i.hasOwnProperty(h) || fe(e, a, h, null, i, z);
            }
        }
        for (var b in i) {
          var h = i[b];
          if (z = t[b], i.hasOwnProperty(b) && (h != null || z != null))
            switch (b) {
              case "type":
                n = h;
                break;
              case "name":
                l = h;
                break;
              case "checked":
                g = h;
                break;
              case "defaultChecked":
                x = h;
                break;
              case "value":
                o = h;
                break;
              case "defaultValue":
                r = h;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(f(137, a));
                break;
              default:
                h !== z && fe(
                  e,
                  a,
                  b,
                  h,
                  i,
                  z
                );
            }
        }
        ao(
          e,
          o,
          r,
          u,
          g,
          x,
          n,
          l
        );
        return;
      case "select":
        h = o = r = b = null;
        for (n in t)
          if (u = t[n], t.hasOwnProperty(n) && u != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                h = u;
              default:
                i.hasOwnProperty(n) || fe(
                  e,
                  a,
                  n,
                  null,
                  i,
                  u
                );
            }
        for (l in i)
          if (n = i[l], u = t[l], i.hasOwnProperty(l) && (n != null || u != null))
            switch (l) {
              case "value":
                b = n;
                break;
              case "defaultValue":
                r = n;
                break;
              case "multiple":
                o = n;
              default:
                n !== u && fe(
                  e,
                  a,
                  l,
                  n,
                  i,
                  u
                );
            }
        a = r, t = o, i = h, b != null ? $t(e, !!t, b, !1) : !!i != !!t && (a != null ? $t(e, !!t, a, !0) : $t(e, !!t, t ? [] : "", !1));
        return;
      case "textarea":
        h = b = null;
        for (r in t)
          if (l = t[r], t.hasOwnProperty(r) && l != null && !i.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                fe(e, a, r, null, i, l);
            }
        for (o in i)
          if (l = i[o], n = t[o], i.hasOwnProperty(o) && (l != null || n != null))
            switch (o) {
              case "value":
                b = l;
                break;
              case "defaultValue":
                h = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(f(91));
                break;
              default:
                l !== n && fe(e, a, o, l, i, n);
            }
        qu(e, b, h);
        return;
      case "option":
        for (var D in t)
          if (b = t[D], t.hasOwnProperty(D) && b != null && !i.hasOwnProperty(D))
            switch (D) {
              case "selected":
                e.selected = !1;
                break;
              default:
                fe(
                  e,
                  a,
                  D,
                  null,
                  i,
                  b
                );
            }
        for (u in i)
          if (b = i[u], h = t[u], i.hasOwnProperty(u) && b !== h && (b != null || h != null))
            switch (u) {
              case "selected":
                e.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                fe(
                  e,
                  a,
                  u,
                  b,
                  i,
                  h
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
        for (var k in t)
          b = t[k], t.hasOwnProperty(k) && b != null && !i.hasOwnProperty(k) && fe(e, a, k, null, i, b);
        for (g in i)
          if (b = i[g], h = t[g], i.hasOwnProperty(g) && b !== h && (b != null || h != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(f(137, a));
                break;
              default:
                fe(
                  e,
                  a,
                  g,
                  b,
                  i,
                  h
                );
            }
        return;
      default:
        if (io(a)) {
          for (var de in t)
            b = t[de], t.hasOwnProperty(de) && b !== void 0 && !i.hasOwnProperty(de) && Lr(
              e,
              a,
              de,
              void 0,
              i,
              b
            );
          for (x in i)
            b = i[x], h = t[x], !i.hasOwnProperty(x) || b === h || b === void 0 && h === void 0 || Lr(
              e,
              a,
              x,
              b,
              i,
              h
            );
          return;
        }
    }
    for (var p in t)
      b = t[p], t.hasOwnProperty(p) && b != null && !i.hasOwnProperty(p) && fe(e, a, p, null, i, b);
    for (z in i)
      b = i[z], h = t[z], !i.hasOwnProperty(z) || b === h || b == null && h == null || fe(e, a, z, b, i, h);
  }
  function Gf(e) {
    switch (e) {
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
  function Up() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, a = 0, t = performance.getEntriesByType("resource"), i = 0; i < t.length; i++) {
        var l = t[i], n = l.transferSize, o = l.initiatorType, r = l.duration;
        if (n && r && Gf(o)) {
          for (o = 0, r = l.responseEnd, i += 1; i < t.length; i++) {
            var u = t[i], g = u.startTime;
            if (g > r) break;
            var x = u.transferSize, z = u.initiatorType;
            x && Gf(z) && (u = u.responseEnd, o += x * (u < r ? 1 : (r - g) / (u - g)));
          }
          if (--i, a += 8 * (n + o) / (l.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return a / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Xr = null, Vr = null;
  function On(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Lf(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Xf(e, a) {
    if (e === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && a === "foreignObject" ? 0 : e;
  }
  function Kr(e, a) {
    return e === "textarea" || e === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Jr = null;
  function jp() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Jr ? !1 : (Jr = e, !0) : (Jr = null, !1);
  }
  var Vf = typeof setTimeout == "function" ? setTimeout : void 0, Hp = typeof clearTimeout == "function" ? clearTimeout : void 0, Kf = typeof Promise == "function" ? Promise : void 0, Rp = typeof queueMicrotask == "function" ? queueMicrotask : typeof Kf < "u" ? function(e) {
    return Kf.resolve(null).then(e).catch(Bp);
  } : Vf;
  function Bp(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function xt(e) {
    return e === "head";
  }
  function Jf(e, a) {
    var t = a, i = 0;
    do {
      var l = t.nextSibling;
      if (e.removeChild(t), l && l.nodeType === 8)
        if (t = l.data, t === "/$" || t === "/&") {
          if (i === 0) {
            e.removeChild(l), Mi(a);
            return;
          }
          i--;
        } else if (t === "$" || t === "$?" || t === "$~" || t === "$!" || t === "&")
          i++;
        else if (t === "html")
          gl(e.ownerDocument.documentElement);
        else if (t === "head") {
          t = e.ownerDocument.head, gl(t);
          for (var n = t.firstChild; n; ) {
            var o = n.nextSibling, r = n.nodeName;
            n[Ui] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && n.rel.toLowerCase() === "stylesheet" || t.removeChild(n), n = o;
          }
        } else
          t === "body" && gl(e.ownerDocument.body);
      t = l;
    } while (t);
    Mi(a);
  }
  function Wf(e, a) {
    var t = e;
    e = 0;
    do {
      var i = t.nextSibling;
      if (t.nodeType === 1 ? a ? (t._stashedDisplay = t.style.display, t.style.display = "none") : (t.style.display = t._stashedDisplay || "", t.getAttribute("style") === "" && t.removeAttribute("style")) : t.nodeType === 3 && (a ? (t._stashedText = t.nodeValue, t.nodeValue = "") : t.nodeValue = t._stashedText || ""), i && i.nodeType === 8)
        if (t = i.data, t === "/$") {
          if (e === 0) break;
          e--;
        } else
          t !== "$" && t !== "$?" && t !== "$~" && t !== "$!" || e++;
      t = i;
    } while (t);
  }
  function Wr(e) {
    var a = e.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var t = a;
      switch (a = a.nextSibling, t.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wr(t), Pn(t);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (t.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(t);
    }
  }
  function qp(e, a, t, i) {
    for (; e.nodeType === 1; ) {
      var l = t;
      if (e.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[Ui])
          switch (a) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (n = e.getAttribute("rel"), n === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (n !== l.rel || e.getAttribute("href") !== (l.href == null || l.href === "" ? null : l.href) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin) || e.getAttribute("title") !== (l.title == null ? null : l.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (n = e.getAttribute("src"), (n !== (l.src == null ? null : l.src) || e.getAttribute("type") !== (l.type == null ? null : l.type) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin)) && n && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (a === "input" && e.type === "hidden") {
        var n = l.name == null ? null : "" + l.name;
        if (l.type === "hidden" && e.getAttribute("name") === n)
          return e;
      } else return e;
      if (e = wa(e.nextSibling), e === null) break;
    }
    return null;
  }
  function kp(e, a, t) {
    if (a === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = wa(e.nextSibling), e === null)) return null;
    return e;
  }
  function $f(e, a) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = wa(e.nextSibling), e === null)) return null;
    return e;
  }
  function $r(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Fr(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Zp(e, a) {
    var t = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = a;
    else if (e.data !== "$?" || t.readyState !== "loading")
      a();
    else {
      var i = function() {
        a(), t.removeEventListener("DOMContentLoaded", i);
      };
      t.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function wa(e) {
    for (; e != null; e = e.nextSibling) {
      var a = e.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (a = e.data, a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&" || a === "F!" || a === "F")
          break;
        if (a === "/$" || a === "/&") return null;
      }
    }
    return e;
  }
  var Ir = null;
  function Ff(e) {
    e = e.nextSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var t = e.data;
        if (t === "/$" || t === "/&") {
          if (a === 0)
            return wa(e.nextSibling);
          a--;
        } else
          t !== "$" && t !== "$!" && t !== "$?" && t !== "$~" && t !== "&" || a++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function If(e) {
    e = e.previousSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var t = e.data;
        if (t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&") {
          if (a === 0) return e;
          a--;
        } else t !== "/$" && t !== "/&" || a++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Pf(e, a, t) {
    switch (a = On(t), e) {
      case "html":
        if (e = a.documentElement, !e) throw Error(f(452));
        return e;
      case "head":
        if (e = a.head, !e) throw Error(f(453));
        return e;
      case "body":
        if (e = a.body, !e) throw Error(f(454));
        return e;
      default:
        throw Error(f(451));
    }
  }
  function gl(e) {
    for (var a = e.attributes; a.length; )
      e.removeAttributeNode(a[0]);
    Pn(e);
  }
  var za = /* @__PURE__ */ new Map(), ed = /* @__PURE__ */ new Set();
  function Cn(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Fa = M.d;
  M.d = {
    f: Yp,
    r: Qp,
    D: Gp,
    C: Lp,
    L: Xp,
    m: Vp,
    X: Jp,
    S: Kp,
    M: Wp
  };
  function Yp() {
    var e = Fa.f(), a = _n();
    return e || a;
  }
  function Qp(e) {
    var a = Kt(e);
    a !== null && a.tag === 5 && a.type === "form" ? bs(a) : Fa.r(e);
  }
  var Ai = typeof document > "u" ? null : document;
  function ad(e, a, t) {
    var i = Ai;
    if (i && typeof a == "string" && a) {
      var l = ga(a);
      l = 'link[rel="' + e + '"][href="' + l + '"]', typeof t == "string" && (l += '[crossorigin="' + t + '"]'), ed.has(l) || (ed.add(l), e = { rel: e, crossOrigin: t, href: a }, i.querySelector(l) === null && (a = i.createElement("link"), Ge(a, "link", e), Re(a), i.head.appendChild(a)));
    }
  }
  function Gp(e) {
    Fa.D(e), ad("dns-prefetch", e, null);
  }
  function Lp(e, a) {
    Fa.C(e, a), ad("preconnect", e, a);
  }
  function Xp(e, a, t) {
    Fa.L(e, a, t);
    var i = Ai;
    if (i && e && a) {
      var l = 'link[rel="preload"][as="' + ga(a) + '"]';
      a === "image" && t && t.imageSrcSet ? (l += '[imagesrcset="' + ga(
        t.imageSrcSet
      ) + '"]', typeof t.imageSizes == "string" && (l += '[imagesizes="' + ga(
        t.imageSizes
      ) + '"]')) : l += '[href="' + ga(e) + '"]';
      var n = l;
      switch (a) {
        case "style":
          n = Ei(e);
          break;
        case "script":
          n = Ti(e);
      }
      za.has(n) || (e = N(
        {
          rel: "preload",
          href: a === "image" && t && t.imageSrcSet ? void 0 : e,
          as: a
        },
        t
      ), za.set(n, e), i.querySelector(l) !== null || a === "style" && i.querySelector(bl(n)) || a === "script" && i.querySelector(hl(n)) || (a = i.createElement("link"), Ge(a, "link", e), Re(a), i.head.appendChild(a)));
    }
  }
  function Vp(e, a) {
    Fa.m(e, a);
    var t = Ai;
    if (t && e) {
      var i = a && typeof a.as == "string" ? a.as : "script", l = 'link[rel="modulepreload"][as="' + ga(i) + '"][href="' + ga(e) + '"]', n = l;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ti(e);
      }
      if (!za.has(n) && (e = N({ rel: "modulepreload", href: e }, a), za.set(n, e), t.querySelector(l) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (t.querySelector(hl(n)))
              return;
        }
        i = t.createElement("link"), Ge(i, "link", e), Re(i), t.head.appendChild(i);
      }
    }
  }
  function Kp(e, a, t) {
    Fa.S(e, a, t);
    var i = Ai;
    if (i && e) {
      var l = Jt(i).hoistableStyles, n = Ei(e);
      a = a || "default";
      var o = l.get(n);
      if (!o) {
        var r = { loading: 0, preload: null };
        if (o = i.querySelector(
          bl(n)
        ))
          r.loading = 5;
        else {
          e = N(
            { rel: "stylesheet", href: e, "data-precedence": a },
            t
          ), (t = za.get(n)) && Pr(e, t);
          var u = o = i.createElement("link");
          Re(u), Ge(u, "link", e), u._p = new Promise(function(g, x) {
            u.onload = g, u.onerror = x;
          }), u.addEventListener("load", function() {
            r.loading |= 1;
          }), u.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, Dn(o, a, i);
        }
        o = {
          type: "stylesheet",
          instance: o,
          count: 1,
          state: r
        }, l.set(n, o);
      }
    }
  }
  function Jp(e, a) {
    Fa.X(e, a);
    var t = Ai;
    if (t && e) {
      var i = Jt(t).hoistableScripts, l = Ti(e), n = i.get(l);
      n || (n = t.querySelector(hl(l)), n || (e = N({ src: e, async: !0 }, a), (a = za.get(l)) && eu(e, a), n = t.createElement("script"), Re(n), Ge(n, "link", e), t.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, i.set(l, n));
    }
  }
  function Wp(e, a) {
    Fa.M(e, a);
    var t = Ai;
    if (t && e) {
      var i = Jt(t).hoistableScripts, l = Ti(e), n = i.get(l);
      n || (n = t.querySelector(hl(l)), n || (e = N({ src: e, async: !0, type: "module" }, a), (a = za.get(l)) && eu(e, a), n = t.createElement("script"), Re(n), Ge(n, "link", e), t.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, i.set(l, n));
    }
  }
  function td(e, a, t, i) {
    var l = (l = $.current) ? Cn(l) : null;
    if (!l) throw Error(f(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof t.precedence == "string" && typeof t.href == "string" ? (a = Ei(t.href), t = Jt(
          l
        ).hoistableStyles, i = t.get(a), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (t.rel === "stylesheet" && typeof t.href == "string" && typeof t.precedence == "string") {
          e = Ei(t.href);
          var n = Jt(
            l
          ).hoistableStyles, o = n.get(e);
          if (o || (l = l.ownerDocument || l, o = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(e, o), (n = l.querySelector(
            bl(e)
          )) && !n._p && (o.instance = n, o.state.loading = 5), za.has(e) || (t = {
            rel: "preload",
            as: "style",
            href: t.href,
            crossOrigin: t.crossOrigin,
            integrity: t.integrity,
            media: t.media,
            hrefLang: t.hrefLang,
            referrerPolicy: t.referrerPolicy
          }, za.set(e, t), n || $p(
            l,
            e,
            t,
            o.state
          ))), a && i === null)
            throw Error(f(528, ""));
          return o;
        }
        if (a && i !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return a = t.async, t = t.src, typeof t == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = Ti(t), t = Jt(
          l
        ).hoistableScripts, i = t.get(a), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, e));
    }
  }
  function Ei(e) {
    return 'href="' + ga(e) + '"';
  }
  function bl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function id(e) {
    return N({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function $p(e, a, t, i) {
    e.querySelector('link[rel="preload"][as="style"][' + a + "]") ? i.loading = 1 : (a = e.createElement("link"), i.preload = a, a.addEventListener("load", function() {
      return i.loading |= 1;
    }), a.addEventListener("error", function() {
      return i.loading |= 2;
    }), Ge(a, "link", t), Re(a), e.head.appendChild(a));
  }
  function Ti(e) {
    return '[src="' + ga(e) + '"]';
  }
  function hl(e) {
    return "script[async]" + e;
  }
  function ld(e, a, t) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + ga(t.href) + '"]'
          );
          if (i)
            return a.instance = i, Re(i), i;
          var l = N({}, t, {
            "data-href": t.href,
            "data-precedence": t.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), Re(i), Ge(i, "style", l), Dn(i, t.precedence, e), a.instance = i;
        case "stylesheet":
          l = Ei(t.href);
          var n = e.querySelector(
            bl(l)
          );
          if (n)
            return a.state.loading |= 4, a.instance = n, Re(n), n;
          i = id(t), (l = za.get(l)) && Pr(i, l), n = (e.ownerDocument || e).createElement("link"), Re(n);
          var o = n;
          return o._p = new Promise(function(r, u) {
            o.onload = r, o.onerror = u;
          }), Ge(n, "link", i), a.state.loading |= 4, Dn(n, t.precedence, e), a.instance = n;
        case "script":
          return n = Ti(t.src), (l = e.querySelector(
            hl(n)
          )) ? (a.instance = l, Re(l), l) : (i = t, (l = za.get(n)) && (i = N({}, t), eu(i, l)), e = e.ownerDocument || e, l = e.createElement("script"), Re(l), Ge(l, "link", i), e.head.appendChild(l), a.instance = l);
        case "void":
          return null;
        default:
          throw Error(f(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (i = a.instance, a.state.loading |= 4, Dn(i, t.precedence, e));
    return a.instance;
  }
  function Dn(e, a, t) {
    for (var i = t.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), l = i.length ? i[i.length - 1] : null, n = l, o = 0; o < i.length; o++) {
      var r = i[o];
      if (r.dataset.precedence === a) n = r;
      else if (n !== l) break;
    }
    n ? n.parentNode.insertBefore(e, n.nextSibling) : (a = t.nodeType === 9 ? t.head : t, a.insertBefore(e, a.firstChild));
  }
  function Pr(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.title == null && (e.title = a.title);
  }
  function eu(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.integrity == null && (e.integrity = a.integrity);
  }
  var Nn = null;
  function nd(e, a, t) {
    if (Nn === null) {
      var i = /* @__PURE__ */ new Map(), l = Nn = /* @__PURE__ */ new Map();
      l.set(t, i);
    } else
      l = Nn, i = l.get(t), i || (i = /* @__PURE__ */ new Map(), l.set(t, i));
    if (i.has(e)) return i;
    for (i.set(e, null), t = t.getElementsByTagName(e), l = 0; l < t.length; l++) {
      var n = t[l];
      if (!(n[Ui] || n[ke] || e === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = n.getAttribute(a) || "";
        o = e + o;
        var r = i.get(o);
        r ? r.push(n) : i.set(o, [n]);
      }
    }
    return i;
  }
  function od(e, a, t) {
    e = e.ownerDocument || e, e.head.insertBefore(
      t,
      a === "title" ? e.querySelector("head > title") : null
    );
  }
  function Fp(e, a, t) {
    if (t === 1 || a.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
          break;
        return !0;
      case "link":
        if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
          break;
        switch (a.rel) {
          case "stylesheet":
            return e = a.disabled, typeof a.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
          return !0;
    }
    return !1;
  }
  function rd(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Ip(e, a, t, i) {
    if (t.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (t.state.loading & 4) === 0) {
      if (t.instance === null) {
        var l = Ei(i.href), n = a.querySelector(
          bl(l)
        );
        if (n) {
          a = n._p, a !== null && typeof a == "object" && typeof a.then == "function" && (e.count++, e = Un.bind(e), a.then(e, e)), t.state.loading |= 4, t.instance = n, Re(n);
          return;
        }
        n = a.ownerDocument || a, i = id(i), (l = za.get(l)) && Pr(i, l), n = n.createElement("link"), Re(n);
        var o = n;
        o._p = new Promise(function(r, u) {
          o.onload = r, o.onerror = u;
        }), Ge(n, "link", i), t.instance = n;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(t, a), (a = t.state.preload) && (t.state.loading & 3) === 0 && (e.count++, t = Un.bind(e), a.addEventListener("load", t), a.addEventListener("error", t));
    }
  }
  var au = 0;
  function Pp(e, a) {
    return e.stylesheets && e.count === 0 && Hn(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(t) {
      var i = setTimeout(function() {
        if (e.stylesheets && Hn(e, e.stylesheets), e.unsuspend) {
          var n = e.unsuspend;
          e.unsuspend = null, n();
        }
      }, 6e4 + a);
      0 < e.imgBytes && au === 0 && (au = 62500 * Up());
      var l = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Hn(e, e.stylesheets), e.unsuspend)) {
            var n = e.unsuspend;
            e.unsuspend = null, n();
          }
        },
        (e.imgBytes > au ? 50 : 800) + a
      );
      return e.unsuspend = t, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(l);
      };
    } : null;
  }
  function Un() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Hn(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var jn = null;
  function Hn(e, a) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, jn = /* @__PURE__ */ new Map(), a.forEach(em, e), jn = null, Un.call(e));
  }
  function em(e, a) {
    if (!(a.state.loading & 4)) {
      var t = jn.get(e);
      if (t) var i = t.get(null);
      else {
        t = /* @__PURE__ */ new Map(), jn.set(e, t);
        for (var l = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < l.length; n++) {
          var o = l[n];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (t.set(o.dataset.precedence, o), i = o);
        }
        i && t.set(null, i);
      }
      l = a.instance, o = l.getAttribute("data-precedence"), n = t.get(o) || i, n === i && t.set(null, l), t.set(o, l), this.count++, i = Un.bind(this), l.addEventListener("load", i), l.addEventListener("error", i), n ? n.parentNode.insertBefore(l, n.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), a.state.loading |= 4;
    }
  }
  var xl = {
    $$typeof: Z,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0
  };
  function am(e, a, t, i, l, n, o, r, u) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Wn(0), this.hiddenUpdates = Wn(null), this.identifierPrefix = i, this.onUncaughtError = l, this.onCaughtError = n, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = u, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ud(e, a, t, i, l, n, o, r, u, g, x, z) {
    return e = new am(
      e,
      a,
      t,
      o,
      u,
      g,
      x,
      z,
      r
    ), a = 1, n === !0 && (a |= 24), n = ua(3, null, null, a), e.current = n, n.stateNode = e, a = jo(), a.refCount++, e.pooledCache = a, a.refCount++, n.memoizedState = {
      element: i,
      isDehydrated: t,
      cache: a
    }, qo(n), e;
  }
  function cd(e) {
    return e ? (e = li, e) : li;
  }
  function sd(e, a, t, i, l, n) {
    l = cd(l), i.context === null ? i.context = l : i.pendingContext = l, i = rt(a), i.payload = { element: t }, n = n === void 0 ? null : n, n !== null && (i.callback = n), t = ut(e, i, a), t !== null && (ta(t, e, a), $i(t, e, a));
  }
  function fd(e, a) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var t = e.retryLane;
      e.retryLane = t !== 0 && t < a ? t : a;
    }
  }
  function tu(e, a) {
    fd(e, a), (e = e.alternate) && fd(e, a);
  }
  function dd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = Dt(e, 67108864);
      a !== null && ta(a, e, 67108864), tu(e, 67108864);
    }
  }
  function pd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = pa();
      a = $n(a);
      var t = Dt(e, a);
      t !== null && ta(t, e, a), tu(e, a);
    }
  }
  var Rn = !0;
  function tm(e, a, t, i) {
    var l = y.T;
    y.T = null;
    var n = M.p;
    try {
      M.p = 2, iu(e, a, t, i);
    } finally {
      M.p = n, y.T = l;
    }
  }
  function im(e, a, t, i) {
    var l = y.T;
    y.T = null;
    var n = M.p;
    try {
      M.p = 8, iu(e, a, t, i);
    } finally {
      M.p = n, y.T = l;
    }
  }
  function iu(e, a, t, i) {
    if (Rn) {
      var l = lu(i);
      if (l === null)
        Gr(
          e,
          a,
          i,
          Bn,
          t
        ), gd(e, i);
      else if (nm(
        l,
        e,
        a,
        t,
        i
      ))
        i.stopPropagation();
      else if (gd(e, i), a & 4 && -1 < lm.indexOf(e)) {
        for (; l !== null; ) {
          var n = Kt(l);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var o = Et(n.pendingLanes);
                  if (o !== 0) {
                    var r = n;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; o; ) {
                      var u = 1 << 31 - oa(o);
                      r.entanglements[1] |= u, o &= ~u;
                    }
                    Na(n), (ne & 6) === 0 && (vn = la() + 500, dl(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = Dt(n, 2), r !== null && ta(r, n, 2), _n(), tu(n, 2);
            }
          if (n = lu(i), n === null && Gr(
            e,
            a,
            i,
            Bn,
            t
          ), n === l) break;
          l = n;
        }
        l !== null && i.stopPropagation();
      } else
        Gr(
          e,
          a,
          i,
          null,
          t
        );
    }
  }
  function lu(e) {
    return e = no(e), nu(e);
  }
  var Bn = null;
  function nu(e) {
    if (Bn = null, e = Vt(e), e !== null) {
      var a = R(e);
      if (a === null) e = null;
      else {
        var t = a.tag;
        if (t === 13) {
          if (e = H(a), e !== null) return e;
          e = null;
        } else if (t === 31) {
          if (e = te(a), e !== null) return e;
          e = null;
        } else if (t === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          e = null;
        } else a !== e && (e = null);
      }
    }
    return Bn = e, null;
  }
  function md(e) {
    switch (e) {
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
        switch (Gd()) {
          case _u:
            return 2;
          case wu:
            return 8;
          case Al:
          case Ld:
            return 32;
          case zu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ou = !1, vt = null, yt = null, _t = null, vl = /* @__PURE__ */ new Map(), yl = /* @__PURE__ */ new Map(), wt = [], lm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function gd(e, a) {
    switch (e) {
      case "focusin":
      case "focusout":
        vt = null;
        break;
      case "dragenter":
      case "dragleave":
        yt = null;
        break;
      case "mouseover":
      case "mouseout":
        _t = null;
        break;
      case "pointerover":
      case "pointerout":
        vl.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yl.delete(a.pointerId);
    }
  }
  function _l(e, a, t, i, l, n) {
    return e === null || e.nativeEvent !== n ? (e = {
      blockedOn: a,
      domEventName: t,
      eventSystemFlags: i,
      nativeEvent: n,
      targetContainers: [l]
    }, a !== null && (a = Kt(a), a !== null && dd(a)), e) : (e.eventSystemFlags |= i, a = e.targetContainers, l !== null && a.indexOf(l) === -1 && a.push(l), e);
  }
  function nm(e, a, t, i, l) {
    switch (a) {
      case "focusin":
        return vt = _l(
          vt,
          e,
          a,
          t,
          i,
          l
        ), !0;
      case "dragenter":
        return yt = _l(
          yt,
          e,
          a,
          t,
          i,
          l
        ), !0;
      case "mouseover":
        return _t = _l(
          _t,
          e,
          a,
          t,
          i,
          l
        ), !0;
      case "pointerover":
        var n = l.pointerId;
        return vl.set(
          n,
          _l(
            vl.get(n) || null,
            e,
            a,
            t,
            i,
            l
          )
        ), !0;
      case "gotpointercapture":
        return n = l.pointerId, yl.set(
          n,
          _l(
            yl.get(n) || null,
            e,
            a,
            t,
            i,
            l
          )
        ), !0;
    }
    return !1;
  }
  function bd(e) {
    var a = Vt(e.target);
    if (a !== null) {
      var t = R(a);
      if (t !== null) {
        if (a = t.tag, a === 13) {
          if (a = H(t), a !== null) {
            e.blockedOn = a, Ou(e.priority, function() {
              pd(t);
            });
            return;
          }
        } else if (a === 31) {
          if (a = te(t), a !== null) {
            e.blockedOn = a, Ou(e.priority, function() {
              pd(t);
            });
            return;
          }
        } else if (a === 3 && t.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function qn(e) {
    if (e.blockedOn !== null) return !1;
    for (var a = e.targetContainers; 0 < a.length; ) {
      var t = lu(e.nativeEvent);
      if (t === null) {
        t = e.nativeEvent;
        var i = new t.constructor(
          t.type,
          t
        );
        lo = i, t.target.dispatchEvent(i), lo = null;
      } else
        return a = Kt(t), a !== null && dd(a), e.blockedOn = t, !1;
      a.shift();
    }
    return !0;
  }
  function hd(e, a, t) {
    qn(e) && t.delete(a);
  }
  function om() {
    ou = !1, vt !== null && qn(vt) && (vt = null), yt !== null && qn(yt) && (yt = null), _t !== null && qn(_t) && (_t = null), vl.forEach(hd), yl.forEach(hd);
  }
  function kn(e, a) {
    e.blockedOn === a && (e.blockedOn = null, ou || (ou = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      om
    )));
  }
  var Zn = null;
  function xd(e) {
    Zn !== e && (Zn = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Zn === e && (Zn = null);
        for (var a = 0; a < e.length; a += 3) {
          var t = e[a], i = e[a + 1], l = e[a + 2];
          if (typeof i != "function") {
            if (nu(i || t) === null)
              continue;
            break;
          }
          var n = Kt(t);
          n !== null && (e.splice(a, 3), a -= 3, lr(
            n,
            {
              pending: !0,
              data: l,
              method: t.method,
              action: i
            },
            i,
            l
          ));
        }
      }
    ));
  }
  function Mi(e) {
    function a(u) {
      return kn(u, e);
    }
    vt !== null && kn(vt, e), yt !== null && kn(yt, e), _t !== null && kn(_t, e), vl.forEach(a), yl.forEach(a);
    for (var t = 0; t < wt.length; t++) {
      var i = wt[t];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < wt.length && (t = wt[0], t.blockedOn === null); )
      bd(t), t.blockedOn === null && wt.shift();
    if (t = (e.ownerDocument || e).$$reactFormReplay, t != null)
      for (i = 0; i < t.length; i += 3) {
        var l = t[i], n = t[i + 1], o = l[$e] || null;
        if (typeof n == "function")
          o || xd(t);
        else if (o) {
          var r = null;
          if (n && n.hasAttribute("formAction")) {
            if (l = n, o = n[$e] || null)
              r = o.formAction;
            else if (nu(l) !== null) continue;
          } else r = o.action;
          typeof r == "function" ? t[i + 1] = r : (t.splice(i, 3), i -= 3), xd(t);
        }
      }
  }
  function vd() {
    function e(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(o) {
            return l = o;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function a() {
      l !== null && (l(), l = null), i || setTimeout(t, 20);
    }
    function t() {
      if (!i && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, l = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", a), navigation.addEventListener("navigateerror", a), setTimeout(t, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", a), navigation.removeEventListener("navigateerror", a), l !== null && (l(), l = null);
      };
    }
  }
  function ru(e) {
    this._internalRoot = e;
  }
  Yn.prototype.render = ru.prototype.render = function(e) {
    var a = this._internalRoot;
    if (a === null) throw Error(f(409));
    var t = a.current, i = pa();
    sd(t, i, e, a, null, null);
  }, Yn.prototype.unmount = ru.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var a = e.containerInfo;
      sd(e.current, 2, null, e, null, null), _n(), a[Xt] = null;
    }
  };
  function Yn(e) {
    this._internalRoot = e;
  }
  Yn.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var a = Mu();
      e = { blockedOn: null, target: e, priority: a };
      for (var t = 0; t < wt.length && a !== 0 && a < wt[t].priority; t++) ;
      wt.splice(t, 0, e), t === 0 && bd(e);
    }
  };
  var yd = v.version;
  if (yd !== "19.2.0")
    throw Error(
      f(
        527,
        yd,
        "19.2.0"
      )
    );
  M.findDOMNode = function(e) {
    var a = e._reactInternals;
    if (a === void 0)
      throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
    return e = w(a), e = e !== null ? L(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var rm = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: y,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qn.isDisabled && Qn.supportsFiber)
      try {
        Ci = Qn.inject(
          rm
        ), na = Qn;
      } catch {
      }
  }
  return zl.createRoot = function(e, a) {
    if (!C(e)) throw Error(f(299));
    var t = !1, i = "", l = Es, n = Ts, o = Ms;
    return a != null && (a.unstable_strictMode === !0 && (t = !0), a.identifierPrefix !== void 0 && (i = a.identifierPrefix), a.onUncaughtError !== void 0 && (l = a.onUncaughtError), a.onCaughtError !== void 0 && (n = a.onCaughtError), a.onRecoverableError !== void 0 && (o = a.onRecoverableError)), a = ud(
      e,
      1,
      !1,
      null,
      null,
      t,
      i,
      null,
      l,
      n,
      o,
      vd
    ), e[Xt] = a.current, Qr(e), new ru(a);
  }, zl.hydrateRoot = function(e, a, t) {
    if (!C(e)) throw Error(f(299));
    var i = !1, l = "", n = Es, o = Ts, r = Ms, u = null;
    return t != null && (t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (o = t.onCaughtError), t.onRecoverableError !== void 0 && (r = t.onRecoverableError), t.formState !== void 0 && (u = t.formState)), a = ud(
      e,
      1,
      !0,
      a,
      t ?? null,
      i,
      l,
      u,
      n,
      o,
      r,
      vd
    ), a.context = cd(null), t = a.current, i = pa(), i = $n(i), l = rt(i), l.callback = null, ut(t, l, i), t = i, a.current.lanes = t, Ni(a, t), Na(a), e[Xt] = a.current, Qr(e), new Yn(a);
  }, zl.version = "19.2.0", zl;
}
var Cd;
function hm() {
  if (Cd) return cu.exports;
  Cd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (v) {
        console.error(v);
      }
  }
  return c(), cu.exports = bm(), cu.exports;
}
var xm = hm(), q = hu();
const vm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement(
      "path",
      {
        d: "M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ q.createElement("path", { d: "M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" }))
  ]
]), ym = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M128,44a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,44Zm0,168a72,72,0,1,1,72-72A72.08,72.08,0,0,1,128,212ZM164.49,99.51a12,12,0,0,1,0,17l-28,28a12,12,0,0,1-17-17l28-28A12,12,0,0,1,164.49,99.51ZM92,16A12,12,0,0,1,104,4h48a12,12,0,0,1,0,24H104A12,12,0,0,1,92,16Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M216,136a88,88,0,1,1-88-88A88,88,0,0,1,216,136Z", opacity: "0.2" }), /* @__PURE__ */ q.createElement("path", { d: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm45.66,61.66-40,40a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,11.32ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M128,42a94,94,0,1,0,94,94A94.11,94.11,0,0,0,128,42Zm0,176a82,82,0,1,1,82-82A82.1,82.1,0,0,1,128,218ZM172.24,91.76a6,6,0,0,1,0,8.48l-40,40a6,6,0,1,1-8.48-8.48l40-40A6,6,0,0,1,172.24,91.76ZM98,16a6,6,0,0,1,6-6h48a6,6,0,0,1,0,12H104A6,6,0,0,1,98,16Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ q.createElement(q.Fragment, null, /* @__PURE__ */ q.createElement("path", { d: "M128,44a92,92,0,1,0,92,92A92.1,92.1,0,0,0,128,44Zm0,176a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,220ZM170.83,93.17a4,4,0,0,1,0,5.66l-40,40a4,4,0,1,1-5.66-5.66l40-40A4,4,0,0,1,170.83,93.17ZM100,16a4,4,0,0,1,4-4h48a4,4,0,0,1,0,8H104A4,4,0,0,1,100,16Z" }))
  ]
]), _m = q.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), xu = q.forwardRef(
  (c, v) => {
    const {
      alt: E,
      color: f,
      size: C,
      weight: R,
      mirrored: H,
      children: te,
      weights: T,
      ...w
    } = c, {
      color: L = "currentColor",
      size: N,
      weight: K = "regular",
      mirrored: xe = !1,
      ...Q
    } = q.useContext(_m);
    return /* @__PURE__ */ q.createElement(
      "svg",
      {
        ref: v,
        xmlns: "http://www.w3.org/2000/svg",
        width: C ?? N,
        height: C ?? N,
        fill: f ?? L,
        viewBox: "0 0 256 256",
        transform: H || xe ? "scale(-1, 1)" : void 0,
        ...Q,
        ...w
      },
      !!E && /* @__PURE__ */ q.createElement("title", null, E),
      te,
      T.get(R ?? K)
    );
  }
);
xu.displayName = "IconBase";
const Ud = q.forwardRef((c, v) => /* @__PURE__ */ q.createElement(xu, { ref: v, ...c, weights: vm }));
Ud.displayName = "CheckIcon";
const mu = Ud, jd = q.forwardRef((c, v) => /* @__PURE__ */ q.createElement(xu, { ref: v, ...c, weights: ym }));
jd.displayName = "TimerIcon";
const wm = jd, gu = (c) => {
  const v = c.length === 1 ? `${c}${c}` : c;
  return Number.parseInt(v, 16);
}, bu = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}, Dd = (c) => {
  const v = c.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!(v != null && v[1])) return null;
  const E = v[1], f = E.length === 3 ? 1 : 2, C = bu(gu(E.slice(0, f))), R = bu(gu(E.slice(f, f * 2))), H = bu(gu(E.slice(f * 2, f * 3)));
  return 0.2126 * C + 0.7152 * R + 0.0722 * H;
}, Nd = (c) => {
  const v = Dd(c), E = Dd("#03080F");
  return v === null || E === null ? "#FFFFFF" : (Math.max(v, E) + 0.05) / (Math.min(v, E) + 0.05) >= 4.5 ? c : "#FFFFFF";
}, zm = (c) => [...c.completedSets ?? []].filter((v) => c.isComplete || v.setNumber < c.setNumber).sort((v, E) => v.setNumber - E.setNumber);
function Hd({ match: c }) {
  return c.timeoutTeamName === void 0 ? null : /* @__PURE__ */ A.jsxs("div", { className: "score-bug__timeout", role: "status", children: [
    /* @__PURE__ */ A.jsx(
      wm,
      {
        "aria-hidden": "true",
        className: "score-bug__timeout-icon",
        size: 22,
        weight: "bold"
      }
    ),
    /* @__PURE__ */ A.jsxs("strong", { children: [
      "TIMEOUT — ",
      c.timeoutTeamName || "MATCH PAUSED"
    ] })
  ] });
}
function Rd({
  completedSets: c,
  homeName: v,
  awayName: E,
  mode: f
}) {
  return c.length === 0 ? null : /* @__PURE__ */ A.jsx("div", { className: `score-bug__history score-bug__history--${f}`, children: c.map((C) => {
    const R = C.homeScore > C.awayScore;
    return /* @__PURE__ */ A.jsxs("div", { className: "score-bug__history-set", children: [
      /* @__PURE__ */ A.jsxs("span", { className: "score-bug__history-label", children: [
        "S",
        C.setNumber
      ] }),
      /* @__PURE__ */ A.jsxs(
        "span",
        {
          className: R ? "score-bug__history-score is-winner" : "score-bug__history-score",
          children: [
            C.homeScore,
            R ? /* @__PURE__ */ A.jsx(
              "i",
              {
                "aria-label": `${v} won set ${C.setNumber}`,
                className: "score-bug__winner-badge",
                children: "W"
              }
            ) : null
          ]
        }
      ),
      /* @__PURE__ */ A.jsx("span", { "aria-hidden": "true", className: "score-bug__history-dash", children: "–" }),
      /* @__PURE__ */ A.jsxs(
        "span",
        {
          className: R ? "score-bug__history-score" : "score-bug__history-score is-winner",
          children: [
            C.awayScore,
            R ? null : /* @__PURE__ */ A.jsx(
              "i",
              {
                "aria-label": `${E} won set ${C.setNumber}`,
                className: "score-bug__winner-badge",
                children: "W"
              }
            )
          ]
        }
      )
    ] }, C.setNumber);
  }) });
}
function Sm({
  match: c,
  side: v
}) {
  const E = v === "home" ? c.homeSetsWon : c.awaySetsWon, f = Math.ceil(c.totalSets / 2);
  return /* @__PURE__ */ A.jsx(
    "span",
    {
      "aria-label": `${E} of ${f} sets won`,
      className: "score-bug__set-dots",
      children: Array.from({ length: f }, (C, R) => /* @__PURE__ */ A.jsx(
        "i",
        {
          className: R < E ? "is-won" : ""
        },
        `${v}-set-${R + 1}`
      ))
    }
  );
}
function Am({
  completedSets: c,
  match: v,
  teams: E
}) {
  return /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
    /* @__PURE__ */ A.jsxs("div", { className: "score-bug__full-card", children: [
      E.map((f) => /* @__PURE__ */ A.jsxs("div", { className: "score-bug__full-team", children: [
        /* @__PURE__ */ A.jsx(
          "i",
          {
            "aria-hidden": "true",
            className: "score-bug__team-accent",
            style: { backgroundColor: f.color }
          }
        ),
        /* @__PURE__ */ A.jsx("strong", { title: f.name, children: f.name }),
        /* @__PURE__ */ A.jsx(Sm, { match: v, side: f.side }),
        /* @__PURE__ */ A.jsx("b", { children: f.score })
      ] }, f.side)),
      /* @__PURE__ */ A.jsxs("div", { className: "score-bug__full-meta", children: [
        /* @__PURE__ */ A.jsxs("span", { children: [
          "SET ",
          v.setNumber
        ] }),
        /* @__PURE__ */ A.jsxs("span", { children: [
          "SETS ",
          v.homeSetsWon,
          "–",
          v.awaySetsWon
        ] })
      ] }),
      /* @__PURE__ */ A.jsx(
        Rd,
        {
          awayName: v.away.name,
          completedSets: c,
          homeName: v.home.name,
          mode: "full"
        }
      )
    ] }),
    /* @__PURE__ */ A.jsx(Hd, { match: v })
  ] });
}
function Em({
  completedSets: c,
  match: v
}) {
  return /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
    /* @__PURE__ */ A.jsx(Hd, { match: v }),
    /* @__PURE__ */ A.jsxs("div", { className: "score-bug__bar-card", children: [
      /* @__PURE__ */ A.jsxs("div", { className: "score-bug__bar-team score-bug__bar-team--home", children: [
        /* @__PURE__ */ A.jsx("i", { style: { backgroundColor: v.home.color } }),
        /* @__PURE__ */ A.jsx("span", { title: v.home.name, children: v.home.name }),
        /* @__PURE__ */ A.jsx("strong", { children: v.home.score })
      ] }),
      /* @__PURE__ */ A.jsxs("div", { className: "score-bug__bar-center", children: [
        /* @__PURE__ */ A.jsxs("span", { children: [
          "SET ",
          v.setNumber
        ] }),
        /* @__PURE__ */ A.jsx(
          Rd,
          {
            awayName: v.away.name,
            completedSets: c,
            homeName: v.home.name,
            mode: "bar"
          }
        )
      ] }),
      /* @__PURE__ */ A.jsxs("div", { className: "score-bug__bar-team score-bug__bar-team--away", children: [
        /* @__PURE__ */ A.jsx("strong", { children: v.away.score }),
        /* @__PURE__ */ A.jsx("span", { title: v.away.name, children: v.away.name }),
        /* @__PURE__ */ A.jsx("i", { style: { backgroundColor: v.away.color } })
      ] })
    ] })
  ] });
}
function Tm({ match: c }) {
  return /* @__PURE__ */ A.jsxs("div", { className: "score-bug__minimal-card", children: [
    /* @__PURE__ */ A.jsxs("span", { children: [
      "SET ",
      c.setNumber
    ] }),
    /* @__PURE__ */ A.jsx("strong", { style: { color: Nd(c.home.color) }, children: c.home.score }),
    /* @__PURE__ */ A.jsx("i", { "aria-hidden": "true", children: "–" }),
    /* @__PURE__ */ A.jsx("strong", { style: { color: Nd(c.away.color) }, children: c.away.score })
  ] });
}
function Mm({
  layout: c = "full-score",
  match: v
}) {
  const E = [
    { ...v.home, setsWon: v.homeSetsWon, side: "home" },
    { ...v.away, setsWon: v.awaySetsWon, side: "away" }
  ], f = zm(v);
  return /* @__PURE__ */ A.jsx(
    "section",
    {
      className: `score-bug score-bug--${c}`,
      "aria-label": `${v.home.name} ${v.home.score}, ${v.away.name} ${v.away.score}, set ${v.setNumber}`,
      children: c === "minimal" ? /* @__PURE__ */ A.jsx(Tm, { match: v }) : c === "score-bar" ? /* @__PURE__ */ A.jsx(Em, { completedSets: f, match: v }) : /* @__PURE__ */ A.jsx(Am, { completedSets: f, match: v, teams: E })
    }
  );
}
const Om = ["small", "standard", "large"], Cm = [
  { label: "FULL SCORE", value: "full-score" },
  { label: "SCORE BAR", value: "score-bar" },
  { label: "MINIMAL", value: "minimal" }
], Dm = [
  { label: "Top left", value: "top-left" },
  { label: "Top right", value: "top-right" },
  { label: "Bottom left", value: "bottom-left" },
  { label: "Bottom right", value: "bottom-right" },
  { label: "Bottom center", value: "bottom-center" }
];
function Nm() {
  var c;
  (c = window.document.querySelector("[data-scoreboard-display-trigger]")) == null || c.focus();
}
function Um({
  automatic: c,
  layout: v,
  onAutomaticChange: E,
  onClose: f,
  onLayoutChange: C,
  onPositionChange: R,
  onReset: H,
  onSizeChange: te,
  onRestoreFocus: T = Nm,
  children: w,
  position: L,
  size: N
}) {
  const K = q.useRef(null), xe = q.useRef(f);
  return xe.current = f, q.useEffect(() => {
    var _e, Je;
    (Je = (_e = K.current) == null ? void 0 : _e.querySelector("button")) == null || Je.focus();
    const Q = () => {
      xe.current(), window.requestAnimationFrame(T);
    }, ge = (Z) => {
      var W, qe, ia;
      if (Z.key === "Escape") {
        Q();
        return;
      }
      if (Z.key !== "Tab") return;
      const ve = Array.from(
        ((W = K.current) == null ? void 0 : W.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )) ?? []
      );
      if (ve.length === 0) return;
      const je = ve[0], Oe = ve[ve.length - 1];
      Z.shiftKey && ((qe = K.current) == null ? void 0 : qe.getRootNode()).activeElement === je ? (Z.preventDefault(), Oe.focus()) : !Z.shiftKey && ((ia = K.current) == null ? void 0 : ia.getRootNode()).activeElement === Oe && (Z.preventDefault(), je.focus());
    }, Me = (Z) => {
      var je, Oe;
      const ve = Z.target;
      Z.composedPath().includes(K.current) || (je = K.current) != null && je.contains(ve) || (Oe = document.querySelector("[data-scoreboard-display-trigger]")) != null && Oe.contains(ve) || Q();
    };
    return document.addEventListener("keydown", ge), document.addEventListener("pointerdown", Me), () => {
      document.removeEventListener("keydown", ge), document.removeEventListener("pointerdown", Me);
    };
  }, []), /* @__PURE__ */ A.jsxs(
    "div",
    {
      "aria-label": "Scoreboard display",
      "aria-modal": "true",
      className: "scoreboard-display-menu",
      ref: K,
      role: "dialog",
      children: [
        /* @__PURE__ */ A.jsx("span", { "aria-hidden": "true", className: "scoreboard-display-menu__handle" }),
        /* @__PURE__ */ A.jsx("strong", { children: "SCOREBOARD DISPLAY" }),
        /* @__PURE__ */ A.jsx("p", { children: "This changes only your display." }),
        /* @__PURE__ */ A.jsx("span", { className: "scoreboard-display-menu__label", children: "LAYOUT" }),
        /* @__PURE__ */ A.jsx("div", { className: "scoreboard-display-menu__layouts", children: Cm.map((Q) => /* @__PURE__ */ A.jsxs(
          "button",
          {
            "aria-label": `Use ${Q.label.toLowerCase()} layout`,
            "aria-pressed": v === Q.value,
            className: "scoreboard-display-menu__layout",
            onClick: () => C(Q.value),
            type: "button",
            children: [
              v === Q.value ? /* @__PURE__ */ A.jsx("span", { className: "scoreboard-display-menu__check", children: /* @__PURE__ */ A.jsx(mu, { "aria-hidden": "true", size: 16, strokeWidth: 3 }) }) : null,
              /* @__PURE__ */ A.jsxs(
                "span",
                {
                  "aria-hidden": "true",
                  className: `scoreboard-layout-preview scoreboard-layout-preview--${Q.value}`,
                  children: [
                    /* @__PURE__ */ A.jsx("i", {}),
                    /* @__PURE__ */ A.jsx("i", {}),
                    /* @__PURE__ */ A.jsx("i", {})
                  ]
                }
              ),
              Q.value === "score-bar" ? /* @__PURE__ */ A.jsx("small", { children: "COURTSIDEVIEW DEFAULT" }) : null,
              /* @__PURE__ */ A.jsx("b", { children: Q.label })
            ]
          },
          Q.value
        )) }),
        /* @__PURE__ */ A.jsx("span", { className: "scoreboard-display-menu__label", children: "SIZE" }),
        /* @__PURE__ */ A.jsx("div", { className: "scoreboard-display-menu__options", children: Om.map((Q) => /* @__PURE__ */ A.jsxs(
          "button",
          {
            "aria-pressed": N === Q,
            onClick: () => te(Q),
            type: "button",
            children: [
              Q.toUpperCase(),
              N === Q ? /* @__PURE__ */ A.jsx("span", { className: "scoreboard-display-menu__option-check", children: /* @__PURE__ */ A.jsx(mu, { "aria-hidden": "true", size: 13, strokeWidth: 3 }) }) : null
            ]
          },
          Q
        )) }),
        /* @__PURE__ */ A.jsx("span", { className: "scoreboard-display-menu__label", children: "POSITION" }),
        /* @__PURE__ */ A.jsx("div", { className: "scoreboard-display-menu__options scoreboard-display-menu__positions", children: Dm.map((Q) => /* @__PURE__ */ A.jsxs(
          "button",
          {
            "aria-pressed": L === Q.value,
            onClick: () => R(Q.value),
            type: "button",
            children: [
              /* @__PURE__ */ A.jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: `scoreboard-position-icon scoreboard-position-icon--${Q.value}`,
                  children: /* @__PURE__ */ A.jsx("i", {})
                }
              ),
              /* @__PURE__ */ A.jsx("span", { className: "scoreboard-sr-only", children: Q.label }),
              L === Q.value ? /* @__PURE__ */ A.jsx("span", { className: "scoreboard-display-menu__position-check", children: /* @__PURE__ */ A.jsx(mu, { "aria-hidden": "true", size: 12, strokeWidth: 3 }) }) : null
            ]
          },
          Q.value
        )) }),
        /* @__PURE__ */ A.jsxs(
          "button",
          {
            "aria-checked": c,
            className: "scoreboard-display-menu__automatic",
            onClick: () => E(!c),
            role: "switch",
            type: "button",
            children: [
              /* @__PURE__ */ A.jsxs("span", { children: [
                /* @__PURE__ */ A.jsx("b", { children: "AUTOMATIC" }),
                /* @__PURE__ */ A.jsx("small", { children: "Adjust by screen orientation" })
              ] }),
              /* @__PURE__ */ A.jsx("i", { className: "scoreboard-display-menu__switch", "data-on": c, children: /* @__PURE__ */ A.jsx("span", {}) })
            ]
          }
        ),
        /* @__PURE__ */ A.jsx(
          "button",
          {
            className: "scoreboard-display-menu__reset",
            onClick: H,
            type: "button",
            children: "Use CourtsideView default"
          }
        ),
        w
      ]
    }
  );
}
const jm = "cloudflare://fanview-live", Hm = 900 * 1e3, Ia = (c) => c !== null && typeof c == "object" && !Array.isArray(c) ? c : {}, we = (c, v = 0) => typeof c == "number" && Number.isFinite(c) ? c : v, Le = (c, v = "") => typeof c == "string" && c.trim() ? c.trim() : v, Rm = (c, v) => c === "bo5" && v === 5 || c !== "bo5" && v === 3 ? 15 : 25, Bm = (c) => {
  const v = we(c.homeScore, we(c.myTeamScore)), E = we(c.awayScore, we(c.opponentScore)), f = we(c.currentSet, 1), C = Array.isArray(c.feed) ? c.feed : [];
  for (const R of C) {
    const H = Ia(R);
    if (H.type !== "SCORE" || we(H.setNumber, f) !== f) continue;
    const T = we(H.myTeamScore, Number.NaN), w = we(H.opponentScore, Number.NaN);
    if (Number.isFinite(T) && Number.isFinite(w) && T + w > v + E)
      return { home: T, away: w };
  }
  return { home: v, away: E };
}, qm = (c) => (Array.isArray(c.feed) ? c.feed : []).map((E, f) => {
  const C = Ia(E), R = Le(C.message);
  return !R || /^Score corrected\b/i.test(R) ? null : {
    id: Le(C.id) || `${Le(C.timestamp, "activity")}-${f}`,
    message: R,
    team: C.team === "myTeam" ? "home" : C.team === "opponent" ? "away" : "neutral",
    timestamp: Le(C.timestamp) || void 0
  };
}).filter((E) => E !== null).slice(0, 40), km = (c, v, E) => (Array.isArray(c.completedSets) ? c.completedSets : Array.isArray(c.sets) ? c.sets : []).map((C, R) => {
  const H = Ia(C), te = we(
    H.homeScore,
    we(H.myTeamScore, we(H.us, Number.NaN))
  ), T = we(
    H.awayScore,
    we(H.opponentScore, we(H.them, Number.NaN))
  );
  return !Number.isFinite(te) || !Number.isFinite(T) ? null : {
    setNumber: we(H.setNumber, R + 1),
    homeScore: te,
    awayScore: T
  };
}).filter((C) => C !== null).filter((C) => E || C.setNumber < v).sort((C, R) => C.setNumber - R.setNumber), Zm = (c, v) => {
  var K, xe;
  const E = Ia(c.currentActivity), f = Ia(c.latestFeed), C = Le(E.type).toUpperCase(), R = Le(f.text), te = Le(E.message) || R;
  if (!(C === "TIMEOUT" || /\btimeout(?:\s+called\s+by|\s+in\s+progress)?\b/i.test(te))) return;
  const w = Le(E.team);
  if (w === "myTeam") return Le(v.home_name) || void 0;
  if (w === "opponent") return Le(v.away_name) || void 0;
  const L = (K = te.match(/timeout called by\s+([^·:]+?)(?:\s*·|$)/i)) == null ? void 0 : K[1];
  if (L != null && L.trim()) return L.trim();
  const N = (xe = te.match(/^(.+?)\s+timeout in progress\b/i)) == null ? void 0 : xe[1];
  return (N == null ? void 0 : N.trim()) || void 0;
}, Ym = (c, v) => {
  const E = Le(Ia(c.state).videoType).toLowerCase(), f = E === "fanview-live-landscape-left" ? -90 : E === "fanview-live-landscape-right" ? 90 : E === "fanview-live-portrait-down" ? 180 : void 0;
  return c.video_type === "cloudflare_realtime" && c.video_url && c.video_url !== jm || (v == null ? void 0 : v.isLive) === !0 ? {
    kind: "cloudflare-realtime",
    streamId: c.share_id,
    rotation: f,
    alt: "Live volleyball broadcast."
  } : (c.video_type === "youtube" || c.video_type === "youtube_live") && c.video_url ? {
    kind: "youtube",
    url: c.video_url,
    alt: "Live volleyball broadcast."
  } : { kind: "none", alt: "No live video is currently available." };
};
function Qm(c, v = null) {
  const E = Ia(c.state), f = Bm(E), C = we(E.currentSet, 1), R = c.updated_at || c.created_at || (/* @__PURE__ */ new Date()).toISOString(), H = Ia(E.latestFeed), te = Ia(E.currentActivity), T = c.is_complete ? Date.parse(c.ended_at || R) : Number.NaN;
  return {
    shareId: c.share_id,
    match: {
      setNumber: C,
      setTarget: we(
        E.setTarget,
        Rm(c.format, C)
      ),
      totalSets: we(E.totalSets, c.format === "bo5" ? 5 : 3),
      homeSetsWon: we(
        E.homeSetsWon,
        we(E.myTeamSetsWon)
      ),
      awaySetsWon: we(
        E.awaySetsWon,
        we(E.opponentSetsWon)
      ),
      completedSets: km(E, C, c.is_complete),
      timeoutTeamName: Zm(E, c),
      isComplete: c.is_complete,
      isLive: !c.is_complete,
      updatedAt: R,
      teamHub: c.team_slug && c.team_name ? { slug: c.team_slug, name: c.team_name } : void 0,
      home: {
        name: Le(c.home_name, "Home"),
        score: f.home,
        color: Le(c.home_color, "#1556C0")
      },
      away: {
        name: Le(c.away_name, "Away"),
        score: f.away,
        color: Le(c.away_color, "#EA2850")
      }
    },
    media: Ym(c, v),
    viewerCount: Math.max(0, we(v == null ? void 0 : v.viewerCount)),
    activity: qm(E),
    latestAction: Le(H.text) || Le(te.message) || void 0,
    connection: "connected",
    expiresAt: Number.isFinite(T) ? new Date(T + Hm).toISOString() : void 0
  };
}
const Bd = "courtsideview_fanview_broadcaster_display_v1", qd = {
  layout: "score-bar",
  size: "standard",
  position: "bottom-center",
  automatic: !1
};
function kd(c) {
  if (!c || typeof c != "object") return !1;
  const v = c;
  return ["full-score", "score-bar", "minimal"].includes(v.layout) && ["small", "standard", "large"].includes(v.size) && ["top-left", "top-right", "bottom-left", "bottom-right", "bottom-center"].includes(v.position) && typeof v.automatic == "boolean";
}
const Gm = () => {
  try {
    const c = JSON.parse(localStorage.getItem(Bd) || "null");
    if (kd(c)) return c;
  } catch {
  }
  return { ...qd };
};
function Lm(c) {
  const [v, E] = q.useState(window.innerHeight >= window.innerWidth);
  q.useEffect(() => {
    const H = () => E(window.innerHeight >= window.innerWidth);
    return window.addEventListener("resize", H), () => window.removeEventListener("resize", H);
  }, []);
  const f = c.preference, C = (H) => c.onPreference({ ...f, ...H }), R = f.automatic ? v ? "full-score" : "score-bar" : f.layout;
  return /* @__PURE__ */ A.jsx(
    "main",
    {
      className: "fanview-app broadcast-display",
      "data-scoreboard-size": f.size,
      "data-scoreboard-layout": R,
      "data-scoreboard-position": f.position,
      "data-scoreboard-automatic": f.automatic,
      children: /* @__PURE__ */ A.jsxs("section", { className: "match-stage", "aria-label": "Broadcast scoreboard", children: [
        c.match && !c.error ? /* @__PURE__ */ A.jsx(Mm, { match: c.match, layout: R }) : null,
        c.open ? /* @__PURE__ */ A.jsx(A.Fragment, { children: /* @__PURE__ */ A.jsxs(
          Um,
          {
            automatic: f.automatic,
            layout: f.layout,
            size: f.size,
            position: f.position,
            onAutomaticChange: (H) => C({ automatic: H }),
            onLayoutChange: (H) => C({ layout: H, automatic: !1 }),
            onSizeChange: (H) => C({ size: H }),
            onPositionChange: (H) => C({ position: H }),
            onReset: () => c.onPreference({ ...qd }),
            onClose: c.onClose,
            onRestoreFocus: c.restoreFocus,
            children: [
              c.error ? /* @__PURE__ */ A.jsxs("div", { className: "broadcast-display-recovery", role: "status", children: [
                /* @__PURE__ */ A.jsx("span", { children: "Scoreboard unavailable." }),
                /* @__PURE__ */ A.jsx("button", { type: "button", onClick: c.onRetry, children: "Retry" })
              ] }) : c.match ? null : /* @__PURE__ */ A.jsx("div", { className: "broadcast-display-recovery", role: "status", children: "Loading score…" }),
              /* @__PURE__ */ A.jsx("button", { type: "button", onClick: c.onClose, children: "Done" })
            ]
          }
        ) }) : null
      ] })
    }
  );
}
const Xm = `
:host { position:fixed; inset:0; z-index:9; pointer-events:none; color:#fff; background:transparent; }
.broadcast-display, .broadcast-display .match-stage { position:absolute; inset:0; width:100%; height:100%; min-height:0; background:transparent; overflow:visible; }
.broadcast-display .score-bug { pointer-events:none; }
.broadcast-display[data-scoreboard-position^="bottom"] .score-bug { bottom:var(--broadcast-dock-inset,100px); }
.broadcast-display[data-scoreboard-position^="top"] .score-bug { top:max(56px,calc(env(safe-area-inset-top) + 48px)); }
.broadcast-display .scoreboard-display-menu { pointer-events:auto; z-index:50; max-height:calc(100dvh - 32px); overflow:auto; top:16px; bottom:auto; }
.broadcast-display-recovery { padding:8px 12px; border-radius:12px; background:#101827; display:flex; gap:10px; align-items:center; pointer-events:auto; }
.broadcast-display-recovery button { min-height:44px; min-width:44px; color:#fff; background:#101827; border:1px solid #8c9caf; border-radius:8px; }
`;
function Vm(c, v) {
  var Je;
  const E = c.attachShadow({ mode: "open" }), f = document.createElement("style");
  if (f.textContent = `@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Regular-C2UfmnDu.ttf) format("truetype");font-style:normal;font-weight:400;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Medium-C2x3RLjU.ttf) format("truetype");font-style:normal;font-weight:500;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-SemiBold-BAz3r7B9.ttf) format("truetype");font-style:normal;font-weight:600;font-display:swap}:root{--cv-font: "CV Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;--font-display: var(--cv-font);--font-sans: var(--cv-font);--font-body: var(--cv-font);font-family:var(--cv-font);font-synthesis:none}body,button,input,textarea,select{font-family:var(--cv-font);font-synthesis:none}body,input,textarea,select{font-weight:400}h1,h2,h3,h4,h5,h6,strong,b,th,button{font-weight:600}:root,:host{--cv-face-light: linear-gradient(135deg, #fff 0%, #fcfdfe 42%, #f2f5f8 100%);--cv-face-dark: linear-gradient(135deg, #29353c 0%, #101b21 42%, #142127 100%);--cv-card-face: var(--cv-face-light);--cv-card-line: #e3e9ef;--cv-card-rim: #e2e8ee;--cv-card-reflection: rgba(255,255,255,.95);--cv-card-shadow: rgba(16,24,32,.12);--cv-primary-material: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20350%2056'%20preserveAspectRatio='none'%3e%3cdefs%3e%3clinearGradient%20id='home-action'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2325ED96'/%3e%3cstop%20offset='100%25'%20stop-color='%2300CFA5'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20d='M14%200H340Q350%200%20350%2010V42Q350%2044%20348%2046L340%2054Q338%2056%20335%2056H8Q0%2056%200%2048V15Q0%2012%202%2010L10%202Q12%200%2014%200Z'%20fill='url(%23home-action)'/%3e%3c/svg%3e")}.cv-dark-material{--cv-card-face: var(--cv-face-dark);--cv-card-line: #40535e;--cv-card-rim: #0b141b;--cv-card-reflection: rgba(225,240,249,.12);--cv-card-shadow: rgba(0,0,0,.28)}.cv-raised-surface{background:var(--cv-card-face);border-color:var(--cv-card-line);box-shadow:inset 0 1px 0 var(--cv-card-reflection),inset 0 -5px 0 var(--cv-card-rim),0 5px 12px var(--cv-card-shadow)}:is(a,button).cv-primary-action,[data-cv-product] .cv-primary-action,body:not(.camera-mode) [data-cv-primary-action]{display:inline-flex;min-width:0;min-height:56px;max-width:100%;align-items:center;justify-content:space-between;gap:16px;border:0;border-radius:0;padding:14px 27px;color:#061b13;background:var(--cv-primary-material) center / 100% 100% no-repeat;font-family:var(--cv-font);font-size:22px;line-height:28px;font-weight:600;letter-spacing:0;text-align:left;text-transform:none;text-decoration:none;white-space:normal;overflow-wrap:anywhere;overflow:visible;box-shadow:0 4px 12px #00a86e21}.cv-primary-action:before,body:not(.camera-mode) [data-cv-primary-action]:before{display:none!important}.cv-primary-action:after,body:not(.camera-mode) [data-cv-primary-action]:after{content:"";display:block;width:24px;height:24px;flex:0 0 24px;background:currentColor;-webkit-mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat;mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat}.cv-primary-action[data-cv-action=team]{--cv-action-glyph: url(/assets/fanview-production/assets/team-section-CMCCqbvK.svg)}.cv-primary-action[data-cv-action=fanview],[data-cv-primary-action][data-cv-action=fanview]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M35.8%2050A14.2%2014.2%200%201%200%2064.2%2050A14.2%2014.2%200%201%200%2035.8%2050ZM12.1755%2020.4482A48%2048%200%200%200%2012.1755%2079.5518L19.2676%2074.0108A39%2039%200%200%201%2019.2676%2025.9892ZM25.5717%2030.9145A31%2031%200%200%200%2025.5717%2069.0855L32.6638%2063.5446A22%2022%200%200%201%2032.6638%2036.4554ZM87.8245%2020.4482A48%2048%200%200%201%2087.8245%2079.5518L80.7324%2074.0108A39%2039%200%200%200%2080.7324%2025.9892ZM74.4283%2030.9145A31%2031%200%200%201%2074.4283%2069.0855L67.3362%2063.5446A22%2022%200%200%200%2067.3362%2036.4554Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=games]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14%2014H24V7A4%204%200%200%201%2032%207V14H68V7A4%204%200%200%201%2076%207V14H86Q98%2014%2098%2026V86Q98%2098%2086%2098H14Q2%2098%202%2086V26Q2%2014%2014%2014ZM13%2043V85Q13%2088%2016%2088H84Q87%2088%2087%2085V43ZM23%2025A5%205%200%201%200%2033%2025A5%205%200%201%200%2023%2025ZM67%2025A5%205%200%201%200%2077%2025A5%205%200%201%200%2067%2025ZM23.8%2058A5.2%205.2%200%201%200%2034.2%2058A5.2%205.2%200%201%200%2023.8%2058ZM44.8%2058A5.2%205.2%200%201%200%2055.2%2058A5.2%205.2%200%201%200%2044.8%2058ZM65.8%2058A5.2%205.2%200%201%200%2076.2%2058A5.2%205.2%200%201%200%2065.8%2058ZM23.8%2077A5.2%205.2%200%201%200%2034.2%2077A5.2%205.2%200%201%200%2023.8%2077ZM44.8%2077A5.2%205.2%200%201%200%2055.2%2077A5.2%205.2%200%201%200%2044.8%2077ZM65.8%2077A5.2%205.2%200%201%200%2076.2%2077A5.2%205.2%200%201%200%2065.8%2077Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=coach]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14.288%2045.035C13.434%2045.425%2012.955%2044.911%2012.126%2044.772C10.714%2044.535%208.152%2044.395%206.828%2044.963C4.655%2045.896%202.887%2047.492%202.124%2049.821C0.961%2053.377%202.899%2058.244%206.470%2059.570C7.926%2060.111%209.584%2060.547%2011.148%2060.189C12.092%2059.973%2013.389%2059.032%2014.331%2059.440C15.327%2060.564%2015.576%2062.640%2016.214%2063.999C17.393%2066.510%2019.174%2069.185%2021.168%2071.108C25.302%2075.095%2030.512%2077.628%2036.207%2078.036C37.298%2078.115%2038.165%2078.614%2039.312%2078.574C40.012%2078.549%2040.528%2078.217%2041.192%2078.084C43.912%2077.541%2046.503%2077.203%2049.160%2076.207C52.964%2074.780%2056.705%2071.563%2059.257%2068.456C61.510%2065.713%2063.192%2061.784%2064.060%2058.367C64.481%2056.711%2064.001%2053.475%2065.486%2052.323C66.224%2051.751%2067.505%2051.573%2068.389%2051.294C70.248%2050.706%2072.077%2050.139%2073.944%2049.622C75.202%2049.274%2076.304%2048.637%2077.516%2048.191C81.856%2046.591%2086.375%2045.467%2090.697%2043.816C92.763%2043.026%2096.195%2042.741%2097.819%2041.208C98.466%2039.690%2098.000%2037.188%2098.000%2035.543C98.000%2033.673%2098.666%2030.224%2097.778%2028.555C97.075%2027.236%2094.882%2026.364%2093.736%2025.443C92.231%2024.233%2090.186%2022.014%2088.287%2021.504C86.799%2021.105%2084.860%2021.422%2083.324%2021.422C79.714%2021.422%2076.105%2021.422%2072.496%2021.422C65.832%2021.422%2059.169%2021.422%2052.505%2021.422C48.901%2021.422%2044.833%2020.889%2041.277%2021.462C36.110%2022.293%2030.187%2024.630%2026.049%2027.933C23.240%2030.176%2019.752%2033.494%2018.091%2036.691C17.213%2038.380%2016.222%2040.103%2015.514%2041.870C15.121%2042.851%2015.033%2044.261%2014.288%2045.035Z%20M5.785%2052.240A4.041%204.041%200%201%200%2013.867%2052.240A4.041%204.041%200%201%200%205.785%2052.240Z%20M27.641%2049.881A10.760%2010.760%200%201%200%2049.162%2049.881A10.760%2010.760%200%201%200%2027.641%2049.881Z%20M90.731%2027.354C91.155%2031.660%2084.825%2029.967%2082.385%2030.337C74.035%2031.605%2065.379%2031.182%2057.034%2032.482C54.873%2032.819%2051.849%2031.490%2051.532%2029.033C51.038%2025.201%2056.604%2025.306%2058.930%2025.306C66.982%2025.306%2075.035%2025.306%2083.087%2025.306C85.159%2025.306%2089.846%2024.734%2090.731%2027.354Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=home]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M50%202L94.5%2040.5Q98%2043.5%2098%2047.5V91Q98%2098%2091%2098H65V78C65%2058%2035%2058%2035%2078V98H9Q2%2098%202%2091V47.5Q2%2043.5%205.5%2040.5Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action:disabled,.cv-primary-action[aria-disabled=true]{opacity:.5}.cv-primary-action:focus-visible{outline:3px solid #1b70db;outline-offset:4px}:root{color:#111827;background:#050a13;--fanview-font-body: var(--cv-font);--fanview-font-control: var(--cv-font);--fanview-font-display: var(--cv-font);--font-sans: var(--fanview-font-body);--font-control: var(--fanview-font-control);--font-display: var(--fanview-font-display);font-family:var(--fanview-font-body);font-synthesis:none;text-rendering:optimizeLegibility;--fanview-navy-950: #111827;--fanview-pink-500: #f22b78;--fanview-pink-700: #ce155f;--fanview-paper: #fffdfb;--fanview-blush: #fff2f7;--fanview-muted: #596273;--fanview-live-red: #e53935;--fanview-live-green: #39d98a;--fanview-line: rgba(15, 23, 42, .1)}*{box-sizing:border-box}html,body,#root{width:100%;min-height:100%;margin:0}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}body{min-height:100dvh;overflow:hidden;-webkit-font-smoothing:antialiased}input{font:inherit}button{font-family:var(--fanview-font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase;-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible,[role=button]:focus-visible{outline:3px solid rgba(242,43,120,.35);outline-offset:2px}.fanview-app,.match-stage{position:relative;width:100vw;height:100dvh;min-height:460px;overflow:hidden;background:#050a13}.match-stage__media{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center}.match-stage__shade{position:absolute;top:0;right:0;bottom:0;left:0;background:#02060c2e;pointer-events:none}.match-stage__empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;background:#0d131d}.court-outline{position:relative;width:min(760px,82vw);aspect-ratio:2.25 / 1;border:2px solid rgba(255,255,255,.12);transform:perspective(480px) rotateX(58deg)}.court-outline__net{position:absolute;top:50%;right:-4%;left:-4%;border-top:2px solid rgba(255,255,255,.18)}.live-pill,.viewer-pill{position:absolute;z-index:3;top:max(28px,env(safe-area-inset-top));display:inline-flex;min-height:38px;align-items:center;justify-content:center;border-radius:8px;color:#fff;box-shadow:0 8px 22px #00000040;font-size:15px;font-weight:600}.live-pill{left:max(28px,env(safe-area-inset-left));gap:8px;padding:0 14px;background:var(--fanview-live-red)}.live-pill__dot{width:9px;height:9px;border-radius:999px;background:#fff}.viewer-pill{right:max(28px,env(safe-area-inset-right));gap:8px;min-width:74px;border:1px solid rgba(255,255,255,.55);padding:0 12px;background:#03080fb8;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-community-enabled=true] .viewer-pill{right:418px}.score-bug{position:absolute;z-index:3;bottom:36px;left:28px;width:min(460px,calc(100vw - 470px));min-width:320px;border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:8px;color:#fff;background:#050e1af5;box-shadow:0 16px 38px #00000059;font-variant-numeric:tabular-nums}.score-bug__timeout{display:flex;min-height:48px;align-items:center;gap:9px;margin-bottom:8px;border:1px solid rgba(255,184,31,.42);border-left:5px solid #ffb81f;border-radius:8px;padding:0 12px;color:#ffb81f;background:#ffb81f0f;font-size:13px;font-weight:600;letter-spacing:.02em}.score-bug__timeout-icon{flex:0 0 auto}.score-bug__ledger{overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:11px}.score-bug__header,.score-bug__row{display:grid;width:100%}.score-bug__header{min-height:42px;border-bottom:1px solid rgba(255,255,255,.22);color:#c7cfdb}.score-bug__format,.score-bug__set-heading{display:flex;align-items:center;justify-content:center;padding:0 8px;font-size:11px;font-weight:600;letter-spacing:.09em}.score-bug__format{justify-content:flex-start;padding-left:16px}.score-bug__set-heading{gap:5px;border-left:1px solid rgba(255,255,255,.22)}.score-bug__set-heading small{display:inline-flex;align-items:center;gap:4px;color:#ff3f75;font-size:8px;letter-spacing:.03em}.score-bug__set-heading small i{width:7px;height:7px;border-radius:999px;background:#ff3f75}.score-bug__row{height:82px}.score-bug__row+.score-bug__row{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team{display:flex;min-width:0;align-items:center;gap:11px;padding:10px 14px;background:#02091261}.score-bug__team-mark{display:grid;width:46px;height:46px;flex:0 0 46px;place-items:center;border:1px solid rgba(255,255,255,.5);border-radius:11px;font-size:14px;font-weight:600;letter-spacing:-.03em}.score-bug__team-copy{display:grid;min-width:0;gap:4px}.score-bug__team-copy>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:-.015em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__team-copy>small{color:#c3cbd6;font-size:9px;font-weight:600;letter-spacing:.1em}.score-bug__team-copy>small b{color:#fff;font-size:11px}.score-bug__set-cell{position:relative;display:grid;min-width:0;place-items:center;border-left:1px solid rgba(255,255,255,.22);color:#aeb7c4}.score-bug__set-cell.is-live{color:#fff}.score-bug__set-cell.is-winner{color:#60df9d;background:#15704847;box-shadow:inset 0 3px #67e1a3}.score-bug__cell-score{font-size:25px;font-weight:600;line-height:1}.score-bug__winner-badge{position:absolute;top:7px;right:7px;display:grid;width:18px;height:18px;place-items:center;border-radius:5px;color:#fff;background:#2b8655;font-size:10px;font-weight:600}.match-status{position:absolute;z-index:4;top:78px;left:50%;border-radius:999px;padding:8px 12px;color:#fff;background:#111827e6;font-size:12px;font-weight:500;transform:translate(-50%)}.community-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;display:none;border:0;background:transparent}.community-panel{position:fixed;z-index:10;top:14px;right:14px;bottom:14px;display:grid;width:min(390px,calc(100vw - 28px));grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.8);border-radius:26px;color:var(--fanview-navy-950);background:var(--cv-face-light);box-shadow:inset 0 1px #fff,inset 0 -5px #e2e8ee,0 28px 70px #00000047;transform:translate(calc(100% + 32px));transition:transform .18s ease}.community-panel[data-open=true]{transform:translate(0)}.community-panel--broadcaster{top:52px;grid-template-rows:auto minmax(0,1fr);height:auto}.community-scrim[hidden],.community-panel[hidden]{display:none!important}.community-panel:focus{outline:none}.community-handle{display:none}.community-header{display:grid;min-width:0;grid-template-columns:minmax(0,1fr) 42px;align-items:center;gap:12px;padding:26px 22px 12px}.community-header__copy{min-width:0}.community-eyebrow{margin-bottom:6px;color:var(--fanview-pink-500);font-size:11px;font-family:var(--font-control);font-weight:500;letter-spacing:.04em}.community-header h1{display:-webkit-box;overflow:hidden;margin:0;font-size:clamp(20px,1.65vw,23px);font-family:var(--font-display);font-weight:600;letter-spacing:-.035em;line-height:1.12;white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}.community-header p{display:flex;align-items:center;gap:8px;margin:7px 0 0;color:var(--fanview-muted);font-size:13px;font-weight:500}.presence-dot{width:9px;height:9px;border-radius:999px;background:#42a767}.icon-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;color:var(--fanview-navy-950);background:#fff;cursor:pointer}.safety-notice{display:flex;min-height:39px;align-items:center;gap:9px;margin:0 20px;border:1px solid rgba(242,43,120,.18);border-radius:7px;padding:8px 10px;color:#3f3542;background:var(--fanview-blush);font-size:10px;font-weight:500;line-height:1.25}.safety-notice svg{flex:0 0 auto;color:var(--fanview-pink-500)}.community-feed{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:19px 20px 16px;scrollbar-width:thin}.community-feed h2{margin:0 0 19px;color:#626875;font-size:11px;font-weight:500;letter-spacing:.055em}.community-message{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;margin-bottom:16px}.community-avatar{display:grid;width:42px;height:42px;place-items:center;border-radius:999px;color:#292543;font-size:15px;font-weight:500}.community-avatar[data-tone=lavender]{background:#eee8ff}.community-avatar[data-tone=blue]{background:#dfebff}.community-avatar[data-tone=green]{background:#dff3e5}.community-avatar[data-tone=gold]{background:#ffe6a1}.community-message__content{min-width:0}.community-message__header{display:flex;min-width:0;align-items:center;gap:7px;min-height:22px}.community-message__header strong{overflow:hidden;font-size:14px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.community-message__header span{flex:0 0 auto;border-radius:999px;padding:3px 7px;color:#644cdb;background:#efebff;font-size:10px;font-weight:500}.community-message__header span[data-role=Coach]{color:#2765cf;background:#e3edff}.community-message__header span[data-role=Teammate]{color:#af6d00;background:#fff0c8}.community-message p{margin:2px 0 0;color:#242834;font-size:14px;font-weight:600;line-height:1.36;overflow-wrap:anywhere}.community-message[data-own=true] p{border-radius:12px;padding:8px 10px;color:#fff;background:var(--fanview-navy-950)}.reaction-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.reaction-row button{display:inline-flex;min-width:45px;min-height:27px;align-items:center;justify-content:center;gap:5px;border:1px solid var(--fanview-line);border-radius:999px;padding:3px 8px;color:#5f6370;background:#fff;font-size:11px;cursor:pointer}.community-composer{display:grid;gap:10px;border-top:1px solid var(--fanview-line);padding:12px 16px max(13px,env(safe-area-inset-bottom));background:#fffdfbfa}.quick-cheers{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.quick-cheers button{display:grid;min-width:44px;height:44px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;background:#fff;font-size:20px;cursor:pointer}.quick-cheers button:hover:not(:disabled){border-color:#f22b7861;background:#fff7fa}.composer-row{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:10px}.composer-row input{min-width:0;height:46px;border:1px solid rgba(15,23,42,.14);border-radius:999px;padding:0 17px;color:var(--fanview-navy-950);background:#fff;font-size:13px;font-weight:600}.composer-row input::placeholder{color:#596273}.send-button{display:grid;width:46px;height:46px;place-items:center;border:0;border-radius:999px;color:#fff;background:var(--fanview-pink-500);cursor:pointer}.send-button:disabled,.quick-cheers button:disabled{cursor:not-allowed;opacity:.48}.composer-meta{display:flex;min-height:10px;justify-content:flex-end;color:#596273;font-size:10px;font-weight:600}.message-skeletons{display:grid;gap:14px}.message-skeletons span{display:block;width:100%;height:48px;border-radius:12px;background:#f0f1f4}.community-inline-status,.community-failure-copy{display:grid;gap:6px;border:1px solid var(--fanview-line);border-radius:13px;padding:14px;color:var(--fanview-muted);background:#f8f8f9;font-size:12px;line-height:1.4}.community-inline-status strong,.community-failure-copy strong{color:var(--fanview-navy-950);font-size:14px}.community-panel--failed{place-items:center;padding:24px;transform:none}.community-launcher{position:fixed;z-index:12;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:inline-flex;min-height:50px;align-items:center;gap:9px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:0 16px;color:#fff;background:var(--fanview-pink-500);box-shadow:0 14px 34px #1118274d;font-size:13px;font-weight:600;cursor:pointer}.community-launcher span{display:grid;min-width:22px;height:22px;place-items:center;border-radius:999px;padding:0 5px;background:#11182738;font-size:10px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}@media(max-width:720px){.fanview-app,.match-stage{min-height:0}.match-stage__media{height:42dvh;min-height:240px;object-position:51% center}.match-stage__shade{bottom:auto;height:42dvh;min-height:240px}.live-pill,.viewer-pill{top:max(13px,env(safe-area-inset-top));min-height:29px;border-radius:6px;font-size:11px}.live-pill{left:max(13px,env(safe-area-inset-left));gap:6px;padding:0 10px}.live-pill__dot{width:7px;height:7px}.viewer-pill,.fanview-app[data-community-enabled=true] .viewer-pill{right:max(13px,env(safe-area-inset-right));gap:6px;min-width:58px;padding:0 8px}.viewer-pill svg{width:15px;height:15px}.score-bug{display:none}.community-scrim{display:block;opacity:0;pointer-events:none;background:#02070e6b;transition:opacity .18s ease}.community-scrim[data-open=true]{opacity:1;pointer-events:auto}.community-panel,.community-panel--failed{top:auto;right:0;bottom:0;left:0;width:100%;height:min(72dvh,680px);border-right:0;border-bottom:0;border-left:0;border-radius:24px 24px 0 0;transform:translateY(calc(100% + 24px))}.community-panel[data-open=true],.community-panel--failed{transform:translateY(0)}.community-panel--broadcaster{height:min(58dvh,520px)}.community-handle{position:absolute;z-index:2;top:7px;left:50%;display:block;width:72px;height:18px;cursor:grab;transform:translate(-50%);touch-action:none}.community-handle:after{position:absolute;top:0;left:16px;width:40px;height:4px;border-radius:999px;background:#1118272e;content:""}.community-header{gap:7px;padding:26px 14px 10px}.community-header h1{font-size:18px}.safety-notice{margin:0 15px}.community-feed{padding:16px 16px 10px}.community-message{grid-template-columns:34px minmax(0,1fr);gap:10px;margin-bottom:14px}.community-avatar{width:34px;height:34px;font-size:12px}.community-message__header strong{font-size:12px}.community-message p{font-size:12px;line-height:1.32}.reaction-row{gap:6px;margin-top:6px}.reaction-row button{min-width:40px;min-height:24px;font-size:10px}.community-composer{gap:9px;padding:10px 13px max(10px,env(safe-area-inset-bottom))}.quick-cheers{gap:7px}.quick-cheers button{min-width:44px;height:44px;font-size:18px}.composer-row{grid-template-columns:minmax(0,1fr) 44px;gap:8px}.composer-row input,.send-button{height:44px}.send-button{width:44px}}@media(max-width:380px){.quick-cheers button{min-width:44px;width:auto;height:44px}.quick-cheers{grid-template-columns:repeat(3,minmax(44px,1fr))}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}}@media(forced-colors:active){.live-pill,.viewer-pill,.community-panel,.community-launcher,.send-button{border:1px solid CanvasText}}.viewer-account{min-height:100dvh;display:grid;place-items:center;padding:24px 16px;background:#f5f7fa;color:#101827;font-family:var(--cv-font)}.viewer-account__card{width:min(100%,460px);box-sizing:border-box;padding:28px;border:1px solid #dbe2e9;border-radius:24px;background:linear-gradient(145deg,#fff,#f7f9fb);box-shadow:0 3px #dfe5ea,0 12px 32px #13253818,inset 0 2px #fff}.viewer-account h1{font-size:28px;line-height:1.25;font-weight:600;margin:12px 0}.viewer-account p{font-size:15px;line-height:1.6}.viewer-account__brand{font-weight:600;color:#26384a}.viewer-account button,.viewer-account input{font:inherit;min-height:46px;border-radius:12px;border:1px solid #c6d0db;padding:10px 14px;box-sizing:border-box}.viewer-account button{cursor:pointer;background:#fff;color:#101827;font-weight:600}.viewer-account button:disabled{opacity:.6;cursor:wait}.viewer-account__providers{display:grid;gap:10px;margin:22px 0}.viewer-account__modes{display:flex;gap:8px;margin:20px 0}.viewer-account__modes button{flex:1}.viewer-account__modes [aria-pressed=true]{border-color:#008954;box-shadow:inset 0 -3px #00c978}.viewer-account form,.viewer-account label{display:grid;gap:8px}.viewer-account form{gap:16px}.viewer-account input{width:100%;background:#fff;color:#101827}.viewer-account .viewer-account__primary{background:linear-gradient(135deg,#25ed96,#00cfa5);border:0;border-radius:14px;clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px)}.viewer-account a{color:#27506e;text-decoration:underline}.viewer-account__legal{font-size:12px!important}.viewer-account__home{display:inline-flex;align-items:center;min-height:44px}.viewer-account :focus-visible{outline:3px solid #1769aa;outline-offset:3px}.viewer-account,.viewer-account *{text-transform:none;letter-spacing:normal}.viewer-account__brand{display:flex;align-items:center;gap:14px;margin-bottom:24px}.viewer-account__brand img{display:block;flex-shrink:0;filter:none;opacity:1}.viewer-account__brand span{font-size:16px;font-weight:600}.viewer-account__providers button{display:flex;align-items:center;justify-content:center;gap:12px;min-height:52px;font-size:16px;line-height:24px}.viewer-account__providers img{object-fit:contain;flex-shrink:0}.viewer-account__providers .viewer-account__google{background:#fff;color:#171717;border-color:#aeb8c4}.viewer-account__providers .viewer-account__apple{background:#000;color:#fff;border-color:#000}.viewer-account .viewer-account__primary{min-height:56px;background:var(--cv-primary-material) center/100% 100% no-repeat;color:#061b13;clip-path:none;border-radius:0;padding:14px 27px;font-size:18px;line-height:28px;font-weight:600;opacity:1;box-shadow:0 4px 12px #00a86e21}.viewer-account .viewer-account__primary:disabled{opacity:.6}.viewer-account button,.viewer-account input{font-family:var(--cv-font);text-transform:none}@media(prefers-color-scheme:dark){.viewer-account{background:#070e13;color:#f5f8fb}.viewer-account__card{background:linear-gradient(145deg,#1b2931,#0e191f);border-color:#526773;box-shadow:0 4px #050a0e,0 14px 32px #0009,inset 0 2px #ffffff1c}.viewer-account__brand{color:#edf3f7}.viewer-account p{color:#cbd5df}.viewer-account h1{color:#f6f8fc}.viewer-account button,.viewer-account input{background:#14212a;color:#f5f8fb;border-color:#526773}.viewer-account__providers .viewer-account__apple{border-color:#82919d}.viewer-account__modes [aria-pressed=true]{border-color:#00c978}.viewer-account a{color:#b2d5f1}.viewer-account :focus-visible{outline-color:#72b9f4}}.live-media,.live-media__video,.live-media__iframe{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;border:0}.live-media{overflow:hidden;background:#000}.live-media__video,.live-media__iframe{object-fit:cover}.live-media__video{pointer-events:none}.live-media__video::-webkit-media-controls{display:none!important}.live-media__video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}.live-media__video[data-rotation="-90"],.live-media__video[data-rotation="90"]{inset:auto;top:50%;left:50%;width:100dvh;height:100dvw}.live-media__video[data-rotation="-90"]{transform:translate(-50%,-50%) rotate(-90deg)}.live-media__video[data-rotation="90"]{transform:translate(-50%,-50%) rotate(90deg)}.live-media__video[data-rotation="180"]{transform:rotate(180deg)}.match-stage.is-web-fullscreen{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;width:100dvw;height:100dvh}.live-media__presentation-canvas{display:none}.live-media__presentation-video{position:absolute;right:0;bottom:0;width:1px;height:1px;opacity:.001;pointer-events:none}.live-media__status{position:absolute;z-index:3;top:50%;left:50%;border-radius:999px;padding:9px 14px;color:#fff;background:#050a13d1;font-size:13px;font-weight:600;transform:translate(-50%,-50%)}.live-media__play{position:absolute;z-index:6;top:50%;left:50%;display:grid;width:56px;height:56px;place-items:center;border:0;border-radius:999px;padding:0;color:#fff;background:#050a13c2;box-shadow:0 10px 28px #00000047;transform:translate(-50%,-50%);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.live-media__play svg{transform:translate(1px)}.media-controls{position:absolute;z-index:5;right:auto;bottom:max(24px,env(safe-area-inset-bottom));left:max(24px,env(safe-area-inset-left));display:flex;max-width:calc(100% - 48px);flex-wrap:wrap;justify-content:flex-start;gap:8px}.media-control{display:flex;min-width:58px;min-height:68px;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:0;border-radius:0;padding:0;color:#fff;background:transparent;font-weight:600;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:content-box;width:22px;height:22px;border:1px solid rgba(255,255,255,.58);border-radius:11px;padding:10px;background:#03080fbd;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control__label{display:block;font-size:10px}@media(min-width:721px){.media-control__label{border-radius:4px;background:#03080fe6;box-shadow:0 0 0 2px #03080fe6;white-space:nowrap}}.media-control:disabled{cursor:not-allowed;opacity:.58}.viewer-header{position:absolute;z-index:5;top:max(28px,env(safe-area-inset-top));right:max(28px,env(safe-area-inset-right));left:max(28px,env(safe-area-inset-left));display:flex;align-items:center;justify-content:space-between;gap:12px;pointer-events:none}.viewer-header--without-team-hub{justify-content:flex-end}.viewer-header__status{display:flex;min-width:0;align-items:center;justify-content:flex-end;gap:10px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{position:relative;inset:auto;pointer-events:auto}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:48px}.match-status--action{max-width:min(440px,calc(100vw - 56px));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fanview-state-page{min-height:100dvh;display:grid;place-items:center;padding:24px;color:#fff;background:#050a13}.fanview-state-camera{position:relative;width:min(760px,100%);min-height:min(680px,calc(100dvh - 48px));overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:28px;background:#07101b;box-shadow:0 28px 80px #0000005c}.fanview-state-camera__court{position:absolute;top:0;right:0;bottom:238px;left:0;background:linear-gradient(#050a134d,#050a13a8),repeating-linear-gradient(90deg,transparent 0 15%,rgba(255,255,255,.035) 15% 15.4%),#111b27}.fanview-state-camera__court:before,.fanview-state-camera__court:after,.fanview-state-camera__court span{position:absolute;border:2px solid rgba(255,255,255,.16);content:""}.fanview-state-camera__court:before{top:20%;right:12%;bottom:13%;left:12%}.fanview-state-camera__court:after{top:52%;right:8%;left:8%;border-width:2px 0 0}.fanview-state-camera__court span{top:20%;bottom:13%;left:50%;border-width:0 0 0 2px}.fanview-state-card{position:absolute;right:18px;bottom:18px;left:18px;display:grid;gap:10px;border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:20px;text-align:left;background:#080d15f0;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.fanview-state-card strong{font-size:clamp(22px,4vw,30px)}.fanview-state-card>span{color:#c3cad4;line-height:1.45}.fanview-state-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:4px}.fanview-state-action{display:inline-flex;min-width:0;min-height:48px;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:0 13px;color:#fff;background:#ffffff14;font:inherit;font-size:13px;font-weight:600;text-align:center;text-decoration:none}.fanview-state-action--primary{border-color:#f22b78;background:#f22b78}.fanview-state-action--support{grid-column:1 / -1}.fanview-state-action:disabled{opacity:.5}.team-hub-back{position:absolute;z-index:5;top:max(82px,calc(env(safe-area-inset-top) + 58px));left:max(28px,env(safe-area-inset-left));display:inline-flex;min-height:44px;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.44);border-radius:999px;padding:0 13px;color:#fff;background:#03080fbd;font-size:13px;font-weight:600;text-decoration:none;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(340px,calc(100vw - 470px));min-width:300px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:66px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:38px;height:38px;flex-basis:38px;font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:20px}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(460px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(580px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:94px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:54px;height:54px;flex-basis:54px;font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:17px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:30px}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:auto;bottom:auto;left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:max(28px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:max(28px,env(safe-area-inset-bottom));left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(28px,env(safe-area-inset-right));bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:50%;transform:translate(-50%)}.scoreboard-display-trigger{display:inline-flex;min-width:48px;min-height:48px;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:0 12px;color:#fff;background:#03080fbd;font-weight:600;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.scoreboard-display-trigger--standalone{position:absolute;z-index:5;right:max(24px,env(safe-area-inset-right));bottom:max(24px,env(safe-area-inset-bottom))}.scoreboard-display-menu{position:absolute;z-index:9;top:max(80px,calc(env(safe-area-inset-top) + 56px));right:max(28px,env(safe-area-inset-right));display:grid;width:min(290px,calc(100vw - 32px));gap:9px;border:1px solid rgba(255,255,255,.42);border-radius:16px;padding:14px;color:#fff;background:#030a14f5;box-shadow:0 18px 48px #0000006b;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}.scoreboard-display-menu>strong{font-size:15px}.scoreboard-display-menu__label{color:#bdc7d4;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}.scoreboard-display-menu__options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.scoreboard-display-menu__positions{grid-template-columns:1fr 1fr}.scoreboard-display-menu button{min-width:0;min-height:44px;border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:0 8px;color:#fff;background:#ffffff0a;font-size:10px;font-weight:600}.scoreboard-display-menu button[aria-pressed=true]{border-color:#ff3f75;background:#ff3f752e;box-shadow:inset 0 0 0 1px #ff3f75}.scoreboard-display-menu__reset{width:100%}@media(max-width:720px){.fanview-app{--fanview-mobile-bottom-inset: max( 12px, env(safe-area-inset-bottom) );--fanview-mobile-cheer-width: min( clamp(104px, 42vw, 160px), calc(100vw - max(10px, env(safe-area-inset-left)) - max(10px, env(safe-area-inset-right)) - 186px) )}.match-status--action{display:none}.score-bug{display:block;top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));width:min(370px,calc(100vw - 20px));min-width:0;border-radius:12px;padding:6px;box-shadow:0 10px 28px #00000057}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(300px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(370px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:calc(100vw - 20px);min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:50%;transform:translate(-50%)}.score-bug__timeout{min-height:44px;margin-bottom:6px;padding:0 9px;font-size:10px}.score-bug__header{min-height:34px}.score-bug__format,.score-bug__set-heading{padding:0 5px;font-size:8px}.score-bug__format{padding-left:9px}.score-bug__set-heading{display:grid;place-items:center;gap:0}.score-bug__set-heading small{gap:3px;font-size:6px}.score-bug__set-heading small i{width:5px;height:5px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:64px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:54px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:74px}.score-bug__team{gap:7px;padding:7px 9px}.score-bug__team-mark,.fanview-app[data-scoreboard-size=standard] .score-bug__team-mark{width:34px;height:34px;flex-basis:34px;border-radius:8px;font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:28px;height:28px;flex-basis:28px;font-size:8px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:40px;height:40px;flex-basis:40px;font-size:11px}.score-bug__team-copy>strong,.fanview-app[data-scoreboard-size=standard] .score-bug__team-copy>strong{font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:9px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:11px}.score-bug__team-copy>small{font-size:7px}.score-bug__team-copy>small b{font-size:9px}.score-bug__cell-score,.fanview-app[data-scoreboard-size=standard] .score-bug__cell-score{font-size:19px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:22px}.score-bug__winner-badge{top:4px;right:4px;width:15px;height:15px;border-radius:4px;font-size:8px}.media-controls{right:calc(var(--fanview-mobile-cheer-width) + max(10px,env(safe-area-inset-right)) + 8px);bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));display:grid;max-width:none;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0;overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:22px;background:#03080fcc;box-shadow:0 8px 22px #00000040;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control{min-width:44px;min-height:58px;flex-direction:column;gap:4px;border:0;border-radius:0;padding:6px 2px 5px;background:transparent;box-shadow:none;font-size:10px;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:border-box;width:20px;height:20px;border:0;border-radius:0;padding:0;background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control+.media-control{border-left:1px solid rgba(255,255,255,.2)}.media-control__label{display:block;overflow:hidden;max-width:100%;color:#fff;font-size:8px;font-weight:500;line-height:1.15;overflow:visible;overflow-wrap:anywhere;text-overflow:clip;white-space:normal;text-align:center}.media-control svg{flex:0 0 auto;width:16px;height:16px;color:#fff}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);width:var(--fanview-mobile-cheer-width);min-height:58px;min-width:0;justify-content:center;gap:5px;overflow:hidden;padding:0 8px;font-size:10.5px;white-space:nowrap}.community-launcher svg{flex:0 0 auto;width:17px;height:17px}.community-launcher span{flex:0 0 auto;min-width:19px;height:19px;padding:0 4px}.viewer-header{top:max(13px,env(safe-area-inset-top));right:max(13px,env(safe-area-inset-right));left:max(13px,env(safe-area-inset-left));gap:8px}.viewer-header__status{gap:8px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:44px}.fanview-app .viewer-header .team-hub-back{padding:0 11px;font-size:11px}.fanview-app .viewer-header .live-pill{padding:0 10px}.scoreboard-display-trigger--standalone{right:auto;bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));min-width:44px;min-height:44px;padding:0 10px;font-size:11px}.scoreboard-display-menu{top:max(62px,calc(env(safe-area-inset-top) + 46px));right:max(10px,env(safe-area-inset-right));width:min(284px,calc(100vw - 20px))}.fanview-state-page{padding:12px}.fanview-state-camera{min-height:calc(100dvh - 24px);border-radius:22px}.fanview-state-actions{grid-template-columns:1fr 1fr}}@media(max-width:380px){.score-bug__team-copy>strong{font-size:10px}}@media(max-width:340px){.score-bug__team-mark{display:none}.score-bug__team{padding:5px 7px}}@media(max-width:300px){.viewer-header{right:max(8px,env(safe-area-inset-right));left:max(8px,env(safe-area-inset-left));gap:4px}.viewer-header__status{gap:4px}.fanview-app .viewer-header .team-hub-back{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .team-hub-back svg{width:15px;height:15px}.fanview-app .viewer-header .live-pill{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .live-pill__dot{width:6px;height:6px}.fanview-app .viewer-header .viewer-pill{min-width:0;gap:4px;padding:0 6px;font-size:9.5px}.fanview-app .viewer-header .viewer-pill svg{width:13px;height:13px}.media-controls{right:max(8px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.community-launcher{right:max(8px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);left:max(8px,env(safe-area-inset-left));width:auto}.scoreboard-display-trigger--standalone{right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.fanview-app[data-scoreboard-size] .score-bug{right:auto;width:calc(100vw - 16px);min-width:0;bottom:calc(var(--fanview-mobile-bottom-inset) + 133px);left:max(8px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-left] .score-bug,.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(8px,env(safe-area-inset-left))}.score-bug__team-mark{display:none}.score-bug__team{padding:5px 6px}.score-bug__team-copy>strong{font-size:8px}.score-bug__team-copy>small{font-size:6px}.score-bug__cell-score{font-size:15px}.score-bug__winner-badge{top:3px;right:3px;width:13px;height:13px;font-size:7px}.scoreboard-display-menu{right:max(8px,env(safe-area-inset-right));width:calc(100vw - 16px);padding:10px}.fanview-state-actions{grid-template-columns:1fr}.fanview-state-action--support{grid-column:auto}}.arena-scoreboard{min-height:100dvh;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto auto;align-items:center;justify-items:center;gap:clamp(18px,4vh,52px);padding:clamp(28px,5vh,72px) clamp(34px,5vw,96px);color:#fff;background:radial-gradient(circle at 0 50%,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent 42%),radial-gradient(circle at 100% 50%,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent 42%),#03070c}.arena-scoreboard__header{display:grid;justify-items:center;gap:18px;font-family:var(--font-sans);letter-spacing:.24em}.arena-scoreboard__header strong{font-family:var(--font-display);font-size:clamp(24px,2.2vw,42px)}.arena-scoreboard__header span{font-size:clamp(16px,1.55vw,30px);font-weight:600}.arena-scoreboard__board{width:min(100%,1500px);overflow:hidden;display:grid;grid-template-columns:1fr minmax(120px,11%) 1fr;border:2px solid rgba(255,255,255,.42);border-radius:18px;background:#03080fe6;box-shadow:0 30px 80px #00000080}.arena-scoreboard__team{min-width:0;min-height:clamp(190px,30vh,340px);display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(14px,1.6vw,30px);padding:clamp(22px,2.3vw,42px)}.arena-scoreboard__team--home{background:linear-gradient(90deg,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent)}.arena-scoreboard__team--away{background:linear-gradient(270deg,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent)}.arena-scoreboard__team i{width:16px;height:132px;border-radius:999px;background:var(--arena-home)}.arena-scoreboard__team--away i{background:var(--arena-away)}.arena-scoreboard__team span{min-width:0;display:grid;gap:18px}.arena-scoreboard__team b{overflow:hidden;color:#fff;font-family:var(--font-display);font-size:clamp(18px,1.55vw,38px);text-overflow:ellipsis;white-space:nowrap}.arena-scoreboard__team small{color:var(--arena-home);font-size:clamp(18px,2vw,34px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__team--away span{text-align:right}.arena-scoreboard__team--away small{color:var(--arena-away)}.arena-scoreboard__team>strong{font-family:var(--font-display);font-size:clamp(84px,10vw,180px);font-variant-numeric:tabular-nums;line-height:.85}.arena-scoreboard__set{display:grid;place-items:center;border-inline:1px solid rgba(255,255,255,.34);color:#c8ced6;font-size:clamp(22px,2.6vw,46px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__history{grid-column:1 / -1;min-height:92px;display:flex;justify-content:center;border-top:1px solid rgba(255,255,255,.34)}.arena-scoreboard__history>div{min-width:280px;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;border-inline:1px solid rgba(255,255,255,.24);text-align:center}.arena-scoreboard__history b,.arena-scoreboard__history span{font-size:clamp(22px,2.6vw,44px);font-variant-numeric:tabular-nums}.arena-scoreboard__history span{color:#a9b0b9}.arena-scoreboard__history span:first-of-type.is-winner{color:var(--arena-home)}.arena-scoreboard__history span:last-of-type.is-winner{color:var(--arena-away)}.arena-scoreboard__timeout{min-height:90px;display:grid;grid-auto-flow:column;place-items:center;justify-content:center;gap:22px;padding-inline:64px;border:2px solid #d99212;border-radius:16px;color:#ffb320;background:#341f04e0;font-size:clamp(22px,2.4vw,42px);font-weight:600}.arena-scoreboard footer{position:relative;width:min(100%,1500px);display:grid;place-items:center;color:#b8bec7;font-size:clamp(16px,1.55vw,28px)}.arena-scoreboard footer>div{position:absolute;right:0;bottom:-18px;display:grid;place-items:center}.arena-scoreboard footer>div b{position:absolute;font-size:9px;letter-spacing:.08em}@media(orientation:portrait),(max-width:760px){.arena-scoreboard{align-content:center;gap:22px;padding:24px 14px}.arena-scoreboard__board{grid-template-columns:1fr}.arena-scoreboard__set{min-height:70px;border:1px solid rgba(255,255,255,.34)}.arena-scoreboard__team{min-height:150px}.arena-scoreboard__history{grid-column:1;overflow-x:auto;justify-content:flex-start}.arena-scoreboard__timeout{min-height:64px;padding-inline:24px}.arena-scoreboard footer>div{display:none}}@media(max-width:980px)and (max-height:520px)and (orientation:landscape){.fanview-app,.match-stage{height:100dvh;min-height:0}.viewer-header{top:max(9px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));left:max(10px,env(safe-area-inset-left))}.media-controls{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left));display:grid;width:246px;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0}.media-control{min-width:44px;min-height:58px;padding:6px 2px 5px}.media-control__label{display:block}.fanview-app[data-scoreboard-size=small] .score-bug{width:260px;min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:330px;min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(430px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:50%;transform:translate(-50%)}.score-bug__header{min-height:30px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:52px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:46px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:58px}.score-bug__timeout{min-height:40px;font-size:9px}.score-bug__team{gap:6px;padding:5px 7px}.score-bug__team-mark{width:28px;height:28px;flex-basis:28px}.score-bug__team-copy>strong{font-size:9px}.score-bug__cell-score{font-size:17px}.scoreboard-display-trigger--standalone{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:50%;transform:translate(-50%)}.scoreboard-display-menu{top:max(58px,calc(env(safe-area-inset-top) + 44px));width:min(278px,calc(100vw - 20px));gap:6px;padding:10px}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));width:auto;min-height:58px;padding:0 12px;font-size:12px}}.score-bug{width:auto;min-width:0;border:0;border-radius:0;padding:0;background:transparent;box-shadow:none}.score-bug__full-card,.score-bug__bar-card,.score-bug__minimal-card{overflow:hidden;border:1px solid rgba(255,255,255,.34);color:#fff;background:#03080fed;box-shadow:0 14px 34px #00000057;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.score-bug__full-card{width:100%;border-radius:10px}.score-bug__full-team{display:grid;height:62px;grid-template-columns:7px minmax(0,1fr) auto 54px;align-items:center;gap:12px;padding:0 12px}.score-bug__full-team+.score-bug__full-team{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team-accent{width:7px;height:33px;border-radius:999px}.score-bug__full-team>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:.01em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__full-team>b{font-size:30px;font-variant-numeric:tabular-nums;font-weight:600;line-height:1;text-align:right}.score-bug__set-dots{display:inline-flex;gap:6px}.score-bug__set-dots i{width:9px;height:9px;border-radius:999px;background:#4a5059}.score-bug__full-team:first-child .score-bug__set-dots i.is-won{background:#23cdb5}.score-bug__full-team:nth-child(2) .score-bug__set-dots i.is-won{background:#ff7046}.score-bug__full-meta{display:flex;min-height:38px;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.22);padding:0 12px;color:#aeb7c4;font-size:12px;font-weight:600;letter-spacing:.08em}.score-bug__history{font-variant-numeric:tabular-nums}.score-bug__history--full{display:grid;min-height:42px;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.22)}.score-bug__history-set{position:relative;display:flex;min-width:0;align-items:center;justify-content:center;gap:6px;color:#929aa6;font-size:13px;font-weight:600}.score-bug__history-set+.score-bug__history-set{border-left:1px solid rgba(255,255,255,.22)}.score-bug__history-label{margin-right:7px;color:#aeb7c4;font-size:11px}.score-bug__history-score{position:relative}.score-bug__history-score.is-winner{color:#fff}.score-bug__history--full .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner{color:#23cdb5}.score-bug__history--full .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner{color:#ff7046}.score-bug__history .score-bug__winner-badge,.scoreboard-sr-only{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;margin:-1px!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}.score-bug__timeout{min-height:40px;justify-content:center;margin:0 0 8px;border:1px solid rgba(255,179,32,.56);border-radius:8px;padding:0 12px;color:#ffb320;background:#362004e6;font-size:11px}.score-bug--score-bar .score-bug__timeout{width:fit-content;min-width:210px;margin-right:auto;margin-left:auto;border-radius:999px}.score-bug__bar-card{display:grid;min-height:72px;grid-template-columns:minmax(0,1fr) minmax(132px,.85fr) minmax(0,1fr);border-radius:9px}.score-bug__bar-team{display:grid;min-width:0;align-items:center;gap:12px;padding:0 14px}.score-bug__bar-team--home{grid-template-columns:7px minmax(0,1fr) auto}.score-bug__bar-team--away{grid-template-columns:auto minmax(0,1fr) 7px}.score-bug__bar-team i{width:7px;height:38px;border-radius:999px}.score-bug__bar-team span{overflow:hidden;font-size:15px;font-weight:600;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__bar-team--away span{text-align:right}.score-bug__bar-team strong{font-size:30px;font-variant-numeric:tabular-nums;line-height:1}.score-bug__bar-center{display:grid;align-content:center;border-right:1px solid rgba(255,255,255,.22);border-left:1px solid rgba(255,255,255,.22);gap:3px;text-align:center}.score-bug__bar-center>span{color:#d8dde4;font-size:11px;font-weight:600;letter-spacing:.08em}.score-bug__history--bar{display:flex;justify-content:center}.score-bug__history--bar .score-bug__history-set{gap:5px;padding:0 8px;font-size:11px}.score-bug__history--bar .score-bug__history-label{margin-right:0;font-size:8px}.score-bug__minimal-card{display:flex;min-height:54px;align-items:center;gap:13px;border-radius:999px;padding:6px 18px 6px 6px}.score-bug__minimal-card>span{display:inline-flex;min-height:40px;align-items:center;border-radius:999px;padding:0 18px;color:#07101b;background:#ff5f2d;font-size:14px;font-weight:600}.score-bug__minimal-card>strong{font-size:20px;font-variant-numeric:tabular-nums;font-weight:600}.score-bug__minimal-card>i{color:#969eaa;font-style:normal;font-weight:600}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=small] .score-bug{width:min(285px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=standard] .score-bug{width:min(344px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=large] .score-bug{width:min(408px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=small] .score-bug{width:min(570px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=standard] .score-bug{width:min(720px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=large] .score-bug{width:min(880px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=small] .score-bug{width:auto;transform:scale(.86);transform-origin:bottom center}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=large] .score-bug{width:auto;transform:scale(1.16);transform-origin:bottom center}.scoreboard-display-menu{position:fixed;top:auto;right:auto;bottom:0;left:50%;width:min(680px,100vw);max-height:min(830px,calc(100dvh - 76px));grid-auto-rows:max-content;align-content:start;overflow-y:auto;gap:14px;border-radius:24px 24px 0 0;padding:14px 28px max(24px,env(safe-area-inset-bottom));transform:translate(-50%)}.scoreboard-display-menu__handle{width:46px;height:5px;justify-self:center;border-radius:999px;background:#65717c}.scoreboard-display-menu>strong{font-size:24px;line-height:1.1;text-align:center}.scoreboard-display-menu>p{margin:-3px 0 4px;color:#aab2bf;font-size:14px;text-align:center}.scoreboard-display-menu__label{color:#fff;font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__layouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.scoreboard-display-menu button.scoreboard-display-menu__layout{position:relative;display:grid;min-height:178px;grid-template-rows:minmax(98px,1fr) minmax(20px,auto) minmax(42px,auto);align-items:center;border-radius:12px;padding:10px 7px 0}.scoreboard-display-menu__layout>b{grid-row:3;min-width:0;overflow-wrap:anywhere;align-self:stretch;display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22);font-size:13px;letter-spacing:.06em}.scoreboard-display-menu__layout>small{grid-row:2;min-width:0;line-height:1.25;overflow-wrap:anywhere;color:#ff3f75;font-size:8px;font-weight:600}.scoreboard-display-menu__check,.scoreboard-display-menu__option-check,.scoreboard-display-menu__position-check{position:absolute;display:grid;place-items:center;border-radius:999px;color:#fff;background:#ef3d68}.scoreboard-display-menu__check{top:10px;right:10px;width:30px;height:30px}.scoreboard-layout-preview{position:relative;display:block;justify-self:center;border:1px solid rgba(255,255,255,.34);background:#050a11}.scoreboard-layout-preview--full-score{width:122px;height:65px;border-radius:6px}.scoreboard-layout-preview--full-score i{display:block;height:21px;border-bottom:1px solid rgba(255,255,255,.22)}.scoreboard-layout-preview--full-score i:first-child{border-left:4px solid #20cdb4}.scoreboard-layout-preview--full-score i:nth-child(2){border-left:4px solid #ff7046}.scoreboard-layout-preview--score-bar{width:142px;height:35px;border-radius:5px}.scoreboard-layout-preview--score-bar i:first-child,.scoreboard-layout-preview--score-bar i:nth-child(2){position:absolute;top:6px;bottom:6px;width:5px;border-radius:99px}.scoreboard-layout-preview--score-bar i:first-child{left:6px;background:#20cdb4}.scoreboard-layout-preview--score-bar i:nth-child(2){right:6px;background:#ff7046}.scoreboard-layout-preview--minimal{width:100px;height:32px;border-radius:999px}.scoreboard-layout-preview--minimal i:first-child{position:absolute;top:5px;bottom:5px;left:5px;width:42px;border-radius:999px;background:#ff5f2d}.scoreboard-display-menu__options{gap:0}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions){overflow:hidden;border:1px solid rgba(255,255,255,.22);border-radius:12px}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;min-height:52px;padding:8px;border:0;border-radius:0;font-size:13px;letter-spacing:.05em}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button+button{border-left:1px solid rgba(255,255,255,.22)}.scoreboard-display-menu__option-check{position:static;flex:0 0 18px;width:18px;height:18px}.scoreboard-display-menu__positions{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.scoreboard-display-menu__positions button{position:relative;box-sizing:border-box;width:100%;min-width:0;display:grid;aspect-ratio:1.15;min-height:64px;padding:8px}.scoreboard-position-icon{position:relative;box-sizing:border-box;display:block;min-width:0;min-height:28px;width:100%;height:100%;border:1px solid #5d6671}.scoreboard-position-icon i{position:absolute;width:22%;height:8%;border-radius:999px;background:#ff3f75}.scoreboard-position-icon--top-left i{top:8%;left:7%}.scoreboard-position-icon--top-right i{top:8%;right:7%}.scoreboard-position-icon--bottom-left i{bottom:8%;left:7%}.scoreboard-position-icon--bottom-right i{right:7%;bottom:8%}.scoreboard-position-icon--bottom-center i{bottom:8%;left:39%}.scoreboard-display-menu__position-check{top:4px;right:4px;width:24px;height:24px}.scoreboard-display-menu__automatic{display:flex;min-height:72px;align-items:center;justify-content:space-between;border-width:1px 0;border-radius:0;padding:0;text-align:left}.scoreboard-display-menu__automatic>span{min-width:0;overflow-wrap:anywhere;display:grid;gap:4px}.scoreboard-display-menu__automatic b{font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__automatic small{color:#aab2bf;font-size:12px}.scoreboard-display-menu__switch{flex:0 0 54px;position:relative;width:54px;height:32px;border:1px solid #606a75;border-radius:999px;background:#1e2731}.scoreboard-display-menu__switch span{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:999px;background:#fff;transition:transform .14s ease}.scoreboard-display-menu__switch[data-on=true]{border-color:#20a66b;background:#20a66b}.scoreboard-display-menu__switch[data-on=true] span{transform:translate(22px)}.scoreboard-display-menu button.scoreboard-display-menu__reset{min-height:44px;border:0;color:#ff3f75;background:transparent;font-size:13px}.fanview-app button,.fanview-state-page button,.scoreboard-display-menu button{font-family:var(--font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase}@media(max-width:720px){.viewer-header{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.score-bug__bar-card{min-height:58px;grid-template-columns:minmax(0,1fr) minmax(104px,.8fr) minmax(0,1fr)}.score-bug__bar-team{gap:6px;padding:0 8px}.score-bug__bar-team span{font-size:10px}.score-bug__bar-team strong{font-size:22px}.score-bug__bar-team i{width:5px;height:31px}.score-bug__history--bar .score-bug__history-set{padding:0 4px;font-size:9px}.score-bug__full-team{height:54px;grid-template-columns:6px minmax(0,1fr) auto 45px;gap:8px;padding:0 10px}.score-bug__full-team>strong{font-size:13px}.score-bug__full-team>b{font-size:26px}.scoreboard-display-menu{width:100vw;max-height:calc(100dvh - 56px);gap:11px;border-radius:22px 22px 0 0;padding:12px 16px max(18px,env(safe-area-inset-bottom))}.scoreboard-display-menu>strong{font-size:20px}.scoreboard-display-menu__layouts{gap:8px}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:146px;grid-template-rows:minmax(78px,1fr) minmax(16px,auto) minmax(37px,auto);padding:7px 4px 0}.scoreboard-display-menu__layout>b{font-size:11px}.scoreboard-layout-preview--full-score{width:min(92px,90%)}.scoreboard-layout-preview--score-bar{width:min(100px,92%)}.scoreboard-layout-preview--minimal{width:min(82px,90%)}.scoreboard-display-menu__positions{gap:6px}.scoreboard-display-menu__positions button{min-height:56px;padding:6px}}@media(max-width:300px){.scoreboard-display-menu__layouts{grid-template-columns:1fr}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:102px;grid-template-columns:1fr 1fr;grid-template-rows:1fr 24px}.scoreboard-display-menu__layout>b{grid-row:1 / 3;border-top:0;border-left:1px solid rgba(255,255,255,.22)}}.fanview-state-card,.scoreboard-display-menu{border-color:#40535e;background:var(--cv-face-dark);box-shadow:inset 0 1px #e1f0f91f,inset 0 -5px #0b141b,0 18px 48px #0000006b}.fanview-state-action--primary.cv-primary-action{grid-column:1 / -1}
/* Bounded QA corrections; approved baseline CSS remains byte-identical. */
@media (max-width: 340px) {
  .scoreboard-display-menu__positions { grid-template-columns: repeat(auto-fit, minmax(44px, 1fr)); }
  .scoreboard-display-menu__positions button { min-width: 44px; min-height: 44px; }
  .score-bug__timeout, .score-bug--score-bar .score-bug__timeout {
    box-sizing: border-box; min-width: 0; max-width: 100%; padding: 4px 8px;
  }
  .score-bug__timeout strong { min-width: 0; overflow-wrap: anywhere; }
  .score-bug__bar-card { grid-template-columns: minmax(0, 1fr); }
  .score-bug__bar-team { min-height: 38px; }
  .score-bug__bar-team span, .score-bug__full-team > strong { white-space: normal; overflow-wrap: anywhere; }
  .score-bug__bar-center { grid-row: 3; border: 0; border-top: 1px solid rgba(255,255,255,.22); padding: 4px; }
  .score-bug__history--bar { flex-wrap: wrap; gap: 4px 0; }
  .score-bug__full-team {
    height: auto; min-height: 54px; grid-template-columns: 6px minmax(0, 1fr) auto;
    gap: 4px 6px; padding: 6px;
  }
  .score-bug__full-team > b { grid-column: 3; grid-row: 1; }
  .score-bug__full-team .score-bug__set-dots { grid-column: 2; }
  .score-bug__history--full { grid-template-columns: repeat(auto-fit, minmax(82px, 1fr)); }
  .score-bug__history--full .score-bug__history-set { min-height: 28px; gap: 4px; }
  .score-bug__history--full .score-bug__history-label { margin-right: 0; }
}
/* Preserve Full Score content within its anchor between header and control dock. */
@media (orientation: landscape) and (max-height: 360px) {
  .score-bug__full-team { height: 38px; }
  .score-bug__full-meta { min-height: 28px; }
  .score-bug__history--full { min-height: 28px; }
  .score-bug--full-score .score-bug__timeout { min-height: 32px; margin-bottom: 4px; }
}
/* At 200% phone reflow, prevent transformed overflow and reserve the dock. */
@media (max-width: 240px) {
  .fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"] .score-bug {
    max-width: calc(100vw - 20px);
    transform: none;
  }
  .fanview-app[data-scoreboard-layout="full-score"][data-scoreboard-position="top-left"] .score-bug,
  .fanview-app[data-scoreboard-layout="full-score"][data-scoreboard-position="top-right"] .score-bug {
    top: max(64px, calc(env(safe-area-inset-top) + 60px));
  }
}
/* Large Minimal grows inward from the selected corner, not past its safe inset. */
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="top-left"] .score-bug { transform-origin: top left; }
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="top-right"] .score-bug { transform-origin: top right; }
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="bottom-left"] .score-bug { transform-origin: bottom left; }
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="bottom-right"] .score-bug { transform-origin: bottom right; }
/* Small white labels require >=4.5:1; retain red LIVE and pink Chat semantics. */
.fanview-app .viewer-header .live-pill { background-color: #d32f2f; }
.fanview-app .community-launcher { background-color: #d6296b; }
/* Preserve Community styling while meeting contrast and touch-target minimums. */
.fanview-app .community-message__header span[data-role="Teammate"] { color: #8a5600; }
.fanview-app .community-panel .icon-button { width: 44px; height: 44px; min-width: 44px; min-height: 44px; flex-shrink: 0; }
.fanview-app .community-panel .reaction-row button { min-width: 44px; min-height: 44px; }
/* Short screens must retain a readable feed and reachable composer. */
@media (max-width: 720px) and (max-height: 500px) {
  .fanview-app .community-panel:not(.community-panel--broadcaster) {
    height: calc(100dvh - max(16px, env(safe-area-inset-top)));
    grid-template-rows: auto auto minmax(96px, 1fr) auto;
    overflow-y: auto;
  }
}
`.replaceAll(":root", ":host") + Xm, E.appendChild(f), !document.getElementById("broadcast-display-fonts")) {
    const Z = document.createElement("style");
    Z.id = "broadcast-display-fonts", Z.textContent = (`@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Regular-C2UfmnDu.ttf) format("truetype");font-style:normal;font-weight:400;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Medium-C2x3RLjU.ttf) format("truetype");font-style:normal;font-weight:500;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-SemiBold-BAz3r7B9.ttf) format("truetype");font-style:normal;font-weight:600;font-display:swap}:root{--cv-font: "CV Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;--font-display: var(--cv-font);--font-sans: var(--cv-font);--font-body: var(--cv-font);font-family:var(--cv-font);font-synthesis:none}body,button,input,textarea,select{font-family:var(--cv-font);font-synthesis:none}body,input,textarea,select{font-weight:400}h1,h2,h3,h4,h5,h6,strong,b,th,button{font-weight:600}:root,:host{--cv-face-light: linear-gradient(135deg, #fff 0%, #fcfdfe 42%, #f2f5f8 100%);--cv-face-dark: linear-gradient(135deg, #29353c 0%, #101b21 42%, #142127 100%);--cv-card-face: var(--cv-face-light);--cv-card-line: #e3e9ef;--cv-card-rim: #e2e8ee;--cv-card-reflection: rgba(255,255,255,.95);--cv-card-shadow: rgba(16,24,32,.12);--cv-primary-material: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20350%2056'%20preserveAspectRatio='none'%3e%3cdefs%3e%3clinearGradient%20id='home-action'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2325ED96'/%3e%3cstop%20offset='100%25'%20stop-color='%2300CFA5'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20d='M14%200H340Q350%200%20350%2010V42Q350%2044%20348%2046L340%2054Q338%2056%20335%2056H8Q0%2056%200%2048V15Q0%2012%202%2010L10%202Q12%200%2014%200Z'%20fill='url(%23home-action)'/%3e%3c/svg%3e")}.cv-dark-material{--cv-card-face: var(--cv-face-dark);--cv-card-line: #40535e;--cv-card-rim: #0b141b;--cv-card-reflection: rgba(225,240,249,.12);--cv-card-shadow: rgba(0,0,0,.28)}.cv-raised-surface{background:var(--cv-card-face);border-color:var(--cv-card-line);box-shadow:inset 0 1px 0 var(--cv-card-reflection),inset 0 -5px 0 var(--cv-card-rim),0 5px 12px var(--cv-card-shadow)}:is(a,button).cv-primary-action,[data-cv-product] .cv-primary-action,body:not(.camera-mode) [data-cv-primary-action]{display:inline-flex;min-width:0;min-height:56px;max-width:100%;align-items:center;justify-content:space-between;gap:16px;border:0;border-radius:0;padding:14px 27px;color:#061b13;background:var(--cv-primary-material) center / 100% 100% no-repeat;font-family:var(--cv-font);font-size:22px;line-height:28px;font-weight:600;letter-spacing:0;text-align:left;text-transform:none;text-decoration:none;white-space:normal;overflow-wrap:anywhere;overflow:visible;box-shadow:0 4px 12px #00a86e21}.cv-primary-action:before,body:not(.camera-mode) [data-cv-primary-action]:before{display:none!important}.cv-primary-action:after,body:not(.camera-mode) [data-cv-primary-action]:after{content:"";display:block;width:24px;height:24px;flex:0 0 24px;background:currentColor;-webkit-mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat;mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat}.cv-primary-action[data-cv-action=team]{--cv-action-glyph: url(/assets/fanview-production/assets/team-section-CMCCqbvK.svg)}.cv-primary-action[data-cv-action=fanview],[data-cv-primary-action][data-cv-action=fanview]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M35.8%2050A14.2%2014.2%200%201%200%2064.2%2050A14.2%2014.2%200%201%200%2035.8%2050ZM12.1755%2020.4482A48%2048%200%200%200%2012.1755%2079.5518L19.2676%2074.0108A39%2039%200%200%201%2019.2676%2025.9892ZM25.5717%2030.9145A31%2031%200%200%200%2025.5717%2069.0855L32.6638%2063.5446A22%2022%200%200%201%2032.6638%2036.4554ZM87.8245%2020.4482A48%2048%200%200%201%2087.8245%2079.5518L80.7324%2074.0108A39%2039%200%200%200%2080.7324%2025.9892ZM74.4283%2030.9145A31%2031%200%200%201%2074.4283%2069.0855L67.3362%2063.5446A22%2022%200%200%200%2067.3362%2036.4554Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=games]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14%2014H24V7A4%204%200%200%201%2032%207V14H68V7A4%204%200%200%201%2076%207V14H86Q98%2014%2098%2026V86Q98%2098%2086%2098H14Q2%2098%202%2086V26Q2%2014%2014%2014ZM13%2043V85Q13%2088%2016%2088H84Q87%2088%2087%2085V43ZM23%2025A5%205%200%201%200%2033%2025A5%205%200%201%200%2023%2025ZM67%2025A5%205%200%201%200%2077%2025A5%205%200%201%200%2067%2025ZM23.8%2058A5.2%205.2%200%201%200%2034.2%2058A5.2%205.2%200%201%200%2023.8%2058ZM44.8%2058A5.2%205.2%200%201%200%2055.2%2058A5.2%205.2%200%201%200%2044.8%2058ZM65.8%2058A5.2%205.2%200%201%200%2076.2%2058A5.2%205.2%200%201%200%2065.8%2058ZM23.8%2077A5.2%205.2%200%201%200%2034.2%2077A5.2%205.2%200%201%200%2023.8%2077ZM44.8%2077A5.2%205.2%200%201%200%2055.2%2077A5.2%205.2%200%201%200%2044.8%2077ZM65.8%2077A5.2%205.2%200%201%200%2076.2%2077A5.2%205.2%200%201%200%2065.8%2077Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=coach]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14.288%2045.035C13.434%2045.425%2012.955%2044.911%2012.126%2044.772C10.714%2044.535%208.152%2044.395%206.828%2044.963C4.655%2045.896%202.887%2047.492%202.124%2049.821C0.961%2053.377%202.899%2058.244%206.470%2059.570C7.926%2060.111%209.584%2060.547%2011.148%2060.189C12.092%2059.973%2013.389%2059.032%2014.331%2059.440C15.327%2060.564%2015.576%2062.640%2016.214%2063.999C17.393%2066.510%2019.174%2069.185%2021.168%2071.108C25.302%2075.095%2030.512%2077.628%2036.207%2078.036C37.298%2078.115%2038.165%2078.614%2039.312%2078.574C40.012%2078.549%2040.528%2078.217%2041.192%2078.084C43.912%2077.541%2046.503%2077.203%2049.160%2076.207C52.964%2074.780%2056.705%2071.563%2059.257%2068.456C61.510%2065.713%2063.192%2061.784%2064.060%2058.367C64.481%2056.711%2064.001%2053.475%2065.486%2052.323C66.224%2051.751%2067.505%2051.573%2068.389%2051.294C70.248%2050.706%2072.077%2050.139%2073.944%2049.622C75.202%2049.274%2076.304%2048.637%2077.516%2048.191C81.856%2046.591%2086.375%2045.467%2090.697%2043.816C92.763%2043.026%2096.195%2042.741%2097.819%2041.208C98.466%2039.690%2098.000%2037.188%2098.000%2035.543C98.000%2033.673%2098.666%2030.224%2097.778%2028.555C97.075%2027.236%2094.882%2026.364%2093.736%2025.443C92.231%2024.233%2090.186%2022.014%2088.287%2021.504C86.799%2021.105%2084.860%2021.422%2083.324%2021.422C79.714%2021.422%2076.105%2021.422%2072.496%2021.422C65.832%2021.422%2059.169%2021.422%2052.505%2021.422C48.901%2021.422%2044.833%2020.889%2041.277%2021.462C36.110%2022.293%2030.187%2024.630%2026.049%2027.933C23.240%2030.176%2019.752%2033.494%2018.091%2036.691C17.213%2038.380%2016.222%2040.103%2015.514%2041.870C15.121%2042.851%2015.033%2044.261%2014.288%2045.035Z%20M5.785%2052.240A4.041%204.041%200%201%200%2013.867%2052.240A4.041%204.041%200%201%200%205.785%2052.240Z%20M27.641%2049.881A10.760%2010.760%200%201%200%2049.162%2049.881A10.760%2010.760%200%201%200%2027.641%2049.881Z%20M90.731%2027.354C91.155%2031.660%2084.825%2029.967%2082.385%2030.337C74.035%2031.605%2065.379%2031.182%2057.034%2032.482C54.873%2032.819%2051.849%2031.490%2051.532%2029.033C51.038%2025.201%2056.604%2025.306%2058.930%2025.306C66.982%2025.306%2075.035%2025.306%2083.087%2025.306C85.159%2025.306%2089.846%2024.734%2090.731%2027.354Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=home]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M50%202L94.5%2040.5Q98%2043.5%2098%2047.5V91Q98%2098%2091%2098H65V78C65%2058%2035%2058%2035%2078V98H9Q2%2098%202%2091V47.5Q2%2043.5%205.5%2040.5Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action:disabled,.cv-primary-action[aria-disabled=true]{opacity:.5}.cv-primary-action:focus-visible{outline:3px solid #1b70db;outline-offset:4px}:root{color:#111827;background:#050a13;--fanview-font-body: var(--cv-font);--fanview-font-control: var(--cv-font);--fanview-font-display: var(--cv-font);--font-sans: var(--fanview-font-body);--font-control: var(--fanview-font-control);--font-display: var(--fanview-font-display);font-family:var(--fanview-font-body);font-synthesis:none;text-rendering:optimizeLegibility;--fanview-navy-950: #111827;--fanview-pink-500: #f22b78;--fanview-pink-700: #ce155f;--fanview-paper: #fffdfb;--fanview-blush: #fff2f7;--fanview-muted: #596273;--fanview-live-red: #e53935;--fanview-live-green: #39d98a;--fanview-line: rgba(15, 23, 42, .1)}*{box-sizing:border-box}html,body,#root{width:100%;min-height:100%;margin:0}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}body{min-height:100dvh;overflow:hidden;-webkit-font-smoothing:antialiased}input{font:inherit}button{font-family:var(--fanview-font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase;-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible,[role=button]:focus-visible{outline:3px solid rgba(242,43,120,.35);outline-offset:2px}.fanview-app,.match-stage{position:relative;width:100vw;height:100dvh;min-height:460px;overflow:hidden;background:#050a13}.match-stage__media{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center}.match-stage__shade{position:absolute;top:0;right:0;bottom:0;left:0;background:#02060c2e;pointer-events:none}.match-stage__empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;background:#0d131d}.court-outline{position:relative;width:min(760px,82vw);aspect-ratio:2.25 / 1;border:2px solid rgba(255,255,255,.12);transform:perspective(480px) rotateX(58deg)}.court-outline__net{position:absolute;top:50%;right:-4%;left:-4%;border-top:2px solid rgba(255,255,255,.18)}.live-pill,.viewer-pill{position:absolute;z-index:3;top:max(28px,env(safe-area-inset-top));display:inline-flex;min-height:38px;align-items:center;justify-content:center;border-radius:8px;color:#fff;box-shadow:0 8px 22px #00000040;font-size:15px;font-weight:600}.live-pill{left:max(28px,env(safe-area-inset-left));gap:8px;padding:0 14px;background:var(--fanview-live-red)}.live-pill__dot{width:9px;height:9px;border-radius:999px;background:#fff}.viewer-pill{right:max(28px,env(safe-area-inset-right));gap:8px;min-width:74px;border:1px solid rgba(255,255,255,.55);padding:0 12px;background:#03080fb8;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-community-enabled=true] .viewer-pill{right:418px}.score-bug{position:absolute;z-index:3;bottom:36px;left:28px;width:min(460px,calc(100vw - 470px));min-width:320px;border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:8px;color:#fff;background:#050e1af5;box-shadow:0 16px 38px #00000059;font-variant-numeric:tabular-nums}.score-bug__timeout{display:flex;min-height:48px;align-items:center;gap:9px;margin-bottom:8px;border:1px solid rgba(255,184,31,.42);border-left:5px solid #ffb81f;border-radius:8px;padding:0 12px;color:#ffb81f;background:#ffb81f0f;font-size:13px;font-weight:600;letter-spacing:.02em}.score-bug__timeout-icon{flex:0 0 auto}.score-bug__ledger{overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:11px}.score-bug__header,.score-bug__row{display:grid;width:100%}.score-bug__header{min-height:42px;border-bottom:1px solid rgba(255,255,255,.22);color:#c7cfdb}.score-bug__format,.score-bug__set-heading{display:flex;align-items:center;justify-content:center;padding:0 8px;font-size:11px;font-weight:600;letter-spacing:.09em}.score-bug__format{justify-content:flex-start;padding-left:16px}.score-bug__set-heading{gap:5px;border-left:1px solid rgba(255,255,255,.22)}.score-bug__set-heading small{display:inline-flex;align-items:center;gap:4px;color:#ff3f75;font-size:8px;letter-spacing:.03em}.score-bug__set-heading small i{width:7px;height:7px;border-radius:999px;background:#ff3f75}.score-bug__row{height:82px}.score-bug__row+.score-bug__row{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team{display:flex;min-width:0;align-items:center;gap:11px;padding:10px 14px;background:#02091261}.score-bug__team-mark{display:grid;width:46px;height:46px;flex:0 0 46px;place-items:center;border:1px solid rgba(255,255,255,.5);border-radius:11px;font-size:14px;font-weight:600;letter-spacing:-.03em}.score-bug__team-copy{display:grid;min-width:0;gap:4px}.score-bug__team-copy>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:-.015em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__team-copy>small{color:#c3cbd6;font-size:9px;font-weight:600;letter-spacing:.1em}.score-bug__team-copy>small b{color:#fff;font-size:11px}.score-bug__set-cell{position:relative;display:grid;min-width:0;place-items:center;border-left:1px solid rgba(255,255,255,.22);color:#aeb7c4}.score-bug__set-cell.is-live{color:#fff}.score-bug__set-cell.is-winner{color:#60df9d;background:#15704847;box-shadow:inset 0 3px #67e1a3}.score-bug__cell-score{font-size:25px;font-weight:600;line-height:1}.score-bug__winner-badge{position:absolute;top:7px;right:7px;display:grid;width:18px;height:18px;place-items:center;border-radius:5px;color:#fff;background:#2b8655;font-size:10px;font-weight:600}.match-status{position:absolute;z-index:4;top:78px;left:50%;border-radius:999px;padding:8px 12px;color:#fff;background:#111827e6;font-size:12px;font-weight:500;transform:translate(-50%)}.community-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;display:none;border:0;background:transparent}.community-panel{position:fixed;z-index:10;top:14px;right:14px;bottom:14px;display:grid;width:min(390px,calc(100vw - 28px));grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.8);border-radius:26px;color:var(--fanview-navy-950);background:var(--cv-face-light);box-shadow:inset 0 1px #fff,inset 0 -5px #e2e8ee,0 28px 70px #00000047;transform:translate(calc(100% + 32px));transition:transform .18s ease}.community-panel[data-open=true]{transform:translate(0)}.community-panel--broadcaster{top:52px;grid-template-rows:auto minmax(0,1fr);height:auto}.community-scrim[hidden],.community-panel[hidden]{display:none!important}.community-panel:focus{outline:none}.community-handle{display:none}.community-header{display:grid;min-width:0;grid-template-columns:minmax(0,1fr) 42px;align-items:center;gap:12px;padding:26px 22px 12px}.community-header__copy{min-width:0}.community-eyebrow{margin-bottom:6px;color:var(--fanview-pink-500);font-size:11px;font-family:var(--font-control);font-weight:500;letter-spacing:.04em}.community-header h1{display:-webkit-box;overflow:hidden;margin:0;font-size:clamp(20px,1.65vw,23px);font-family:var(--font-display);font-weight:600;letter-spacing:-.035em;line-height:1.12;white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}.community-header p{display:flex;align-items:center;gap:8px;margin:7px 0 0;color:var(--fanview-muted);font-size:13px;font-weight:500}.presence-dot{width:9px;height:9px;border-radius:999px;background:#42a767}.icon-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;color:var(--fanview-navy-950);background:#fff;cursor:pointer}.safety-notice{display:flex;min-height:39px;align-items:center;gap:9px;margin:0 20px;border:1px solid rgba(242,43,120,.18);border-radius:7px;padding:8px 10px;color:#3f3542;background:var(--fanview-blush);font-size:10px;font-weight:500;line-height:1.25}.safety-notice svg{flex:0 0 auto;color:var(--fanview-pink-500)}.community-feed{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:19px 20px 16px;scrollbar-width:thin}.community-feed h2{margin:0 0 19px;color:#626875;font-size:11px;font-weight:500;letter-spacing:.055em}.community-message{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;margin-bottom:16px}.community-avatar{display:grid;width:42px;height:42px;place-items:center;border-radius:999px;color:#292543;font-size:15px;font-weight:500}.community-avatar[data-tone=lavender]{background:#eee8ff}.community-avatar[data-tone=blue]{background:#dfebff}.community-avatar[data-tone=green]{background:#dff3e5}.community-avatar[data-tone=gold]{background:#ffe6a1}.community-message__content{min-width:0}.community-message__header{display:flex;min-width:0;align-items:center;gap:7px;min-height:22px}.community-message__header strong{overflow:hidden;font-size:14px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.community-message__header span{flex:0 0 auto;border-radius:999px;padding:3px 7px;color:#644cdb;background:#efebff;font-size:10px;font-weight:500}.community-message__header span[data-role=Coach]{color:#2765cf;background:#e3edff}.community-message__header span[data-role=Teammate]{color:#af6d00;background:#fff0c8}.community-message p{margin:2px 0 0;color:#242834;font-size:14px;font-weight:600;line-height:1.36;overflow-wrap:anywhere}.community-message[data-own=true] p{border-radius:12px;padding:8px 10px;color:#fff;background:var(--fanview-navy-950)}.reaction-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.reaction-row button{display:inline-flex;min-width:45px;min-height:27px;align-items:center;justify-content:center;gap:5px;border:1px solid var(--fanview-line);border-radius:999px;padding:3px 8px;color:#5f6370;background:#fff;font-size:11px;cursor:pointer}.community-composer{display:grid;gap:10px;border-top:1px solid var(--fanview-line);padding:12px 16px max(13px,env(safe-area-inset-bottom));background:#fffdfbfa}.quick-cheers{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.quick-cheers button{display:grid;min-width:44px;height:44px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;background:#fff;font-size:20px;cursor:pointer}.quick-cheers button:hover:not(:disabled){border-color:#f22b7861;background:#fff7fa}.composer-row{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:10px}.composer-row input{min-width:0;height:46px;border:1px solid rgba(15,23,42,.14);border-radius:999px;padding:0 17px;color:var(--fanview-navy-950);background:#fff;font-size:13px;font-weight:600}.composer-row input::placeholder{color:#596273}.send-button{display:grid;width:46px;height:46px;place-items:center;border:0;border-radius:999px;color:#fff;background:var(--fanview-pink-500);cursor:pointer}.send-button:disabled,.quick-cheers button:disabled{cursor:not-allowed;opacity:.48}.composer-meta{display:flex;min-height:10px;justify-content:flex-end;color:#596273;font-size:10px;font-weight:600}.message-skeletons{display:grid;gap:14px}.message-skeletons span{display:block;width:100%;height:48px;border-radius:12px;background:#f0f1f4}.community-inline-status,.community-failure-copy{display:grid;gap:6px;border:1px solid var(--fanview-line);border-radius:13px;padding:14px;color:var(--fanview-muted);background:#f8f8f9;font-size:12px;line-height:1.4}.community-inline-status strong,.community-failure-copy strong{color:var(--fanview-navy-950);font-size:14px}.community-panel--failed{place-items:center;padding:24px;transform:none}.community-launcher{position:fixed;z-index:12;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:inline-flex;min-height:50px;align-items:center;gap:9px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:0 16px;color:#fff;background:var(--fanview-pink-500);box-shadow:0 14px 34px #1118274d;font-size:13px;font-weight:600;cursor:pointer}.community-launcher span{display:grid;min-width:22px;height:22px;place-items:center;border-radius:999px;padding:0 5px;background:#11182738;font-size:10px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}@media(max-width:720px){.fanview-app,.match-stage{min-height:0}.match-stage__media{height:42dvh;min-height:240px;object-position:51% center}.match-stage__shade{bottom:auto;height:42dvh;min-height:240px}.live-pill,.viewer-pill{top:max(13px,env(safe-area-inset-top));min-height:29px;border-radius:6px;font-size:11px}.live-pill{left:max(13px,env(safe-area-inset-left));gap:6px;padding:0 10px}.live-pill__dot{width:7px;height:7px}.viewer-pill,.fanview-app[data-community-enabled=true] .viewer-pill{right:max(13px,env(safe-area-inset-right));gap:6px;min-width:58px;padding:0 8px}.viewer-pill svg{width:15px;height:15px}.score-bug{display:none}.community-scrim{display:block;opacity:0;pointer-events:none;background:#02070e6b;transition:opacity .18s ease}.community-scrim[data-open=true]{opacity:1;pointer-events:auto}.community-panel,.community-panel--failed{top:auto;right:0;bottom:0;left:0;width:100%;height:min(72dvh,680px);border-right:0;border-bottom:0;border-left:0;border-radius:24px 24px 0 0;transform:translateY(calc(100% + 24px))}.community-panel[data-open=true],.community-panel--failed{transform:translateY(0)}.community-panel--broadcaster{height:min(58dvh,520px)}.community-handle{position:absolute;z-index:2;top:7px;left:50%;display:block;width:72px;height:18px;cursor:grab;transform:translate(-50%);touch-action:none}.community-handle:after{position:absolute;top:0;left:16px;width:40px;height:4px;border-radius:999px;background:#1118272e;content:""}.community-header{gap:7px;padding:26px 14px 10px}.community-header h1{font-size:18px}.safety-notice{margin:0 15px}.community-feed{padding:16px 16px 10px}.community-message{grid-template-columns:34px minmax(0,1fr);gap:10px;margin-bottom:14px}.community-avatar{width:34px;height:34px;font-size:12px}.community-message__header strong{font-size:12px}.community-message p{font-size:12px;line-height:1.32}.reaction-row{gap:6px;margin-top:6px}.reaction-row button{min-width:40px;min-height:24px;font-size:10px}.community-composer{gap:9px;padding:10px 13px max(10px,env(safe-area-inset-bottom))}.quick-cheers{gap:7px}.quick-cheers button{min-width:44px;height:44px;font-size:18px}.composer-row{grid-template-columns:minmax(0,1fr) 44px;gap:8px}.composer-row input,.send-button{height:44px}.send-button{width:44px}}@media(max-width:380px){.quick-cheers button{min-width:44px;width:auto;height:44px}.quick-cheers{grid-template-columns:repeat(3,minmax(44px,1fr))}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}}@media(forced-colors:active){.live-pill,.viewer-pill,.community-panel,.community-launcher,.send-button{border:1px solid CanvasText}}.viewer-account{min-height:100dvh;display:grid;place-items:center;padding:24px 16px;background:#f5f7fa;color:#101827;font-family:var(--cv-font)}.viewer-account__card{width:min(100%,460px);box-sizing:border-box;padding:28px;border:1px solid #dbe2e9;border-radius:24px;background:linear-gradient(145deg,#fff,#f7f9fb);box-shadow:0 3px #dfe5ea,0 12px 32px #13253818,inset 0 2px #fff}.viewer-account h1{font-size:28px;line-height:1.25;font-weight:600;margin:12px 0}.viewer-account p{font-size:15px;line-height:1.6}.viewer-account__brand{font-weight:600;color:#26384a}.viewer-account button,.viewer-account input{font:inherit;min-height:46px;border-radius:12px;border:1px solid #c6d0db;padding:10px 14px;box-sizing:border-box}.viewer-account button{cursor:pointer;background:#fff;color:#101827;font-weight:600}.viewer-account button:disabled{opacity:.6;cursor:wait}.viewer-account__providers{display:grid;gap:10px;margin:22px 0}.viewer-account__modes{display:flex;gap:8px;margin:20px 0}.viewer-account__modes button{flex:1}.viewer-account__modes [aria-pressed=true]{border-color:#008954;box-shadow:inset 0 -3px #00c978}.viewer-account form,.viewer-account label{display:grid;gap:8px}.viewer-account form{gap:16px}.viewer-account input{width:100%;background:#fff;color:#101827}.viewer-account .viewer-account__primary{background:linear-gradient(135deg,#25ed96,#00cfa5);border:0;border-radius:14px;clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px)}.viewer-account a{color:#27506e;text-decoration:underline}.viewer-account__legal{font-size:12px!important}.viewer-account__home{display:inline-flex;align-items:center;min-height:44px}.viewer-account :focus-visible{outline:3px solid #1769aa;outline-offset:3px}.viewer-account,.viewer-account *{text-transform:none;letter-spacing:normal}.viewer-account__brand{display:flex;align-items:center;gap:14px;margin-bottom:24px}.viewer-account__brand img{display:block;flex-shrink:0;filter:none;opacity:1}.viewer-account__brand span{font-size:16px;font-weight:600}.viewer-account__providers button{display:flex;align-items:center;justify-content:center;gap:12px;min-height:52px;font-size:16px;line-height:24px}.viewer-account__providers img{object-fit:contain;flex-shrink:0}.viewer-account__providers .viewer-account__google{background:#fff;color:#171717;border-color:#aeb8c4}.viewer-account__providers .viewer-account__apple{background:#000;color:#fff;border-color:#000}.viewer-account .viewer-account__primary{min-height:56px;background:var(--cv-primary-material) center/100% 100% no-repeat;color:#061b13;clip-path:none;border-radius:0;padding:14px 27px;font-size:18px;line-height:28px;font-weight:600;opacity:1;box-shadow:0 4px 12px #00a86e21}.viewer-account .viewer-account__primary:disabled{opacity:.6}.viewer-account button,.viewer-account input{font-family:var(--cv-font);text-transform:none}@media(prefers-color-scheme:dark){.viewer-account{background:#070e13;color:#f5f8fb}.viewer-account__card{background:linear-gradient(145deg,#1b2931,#0e191f);border-color:#526773;box-shadow:0 4px #050a0e,0 14px 32px #0009,inset 0 2px #ffffff1c}.viewer-account__brand{color:#edf3f7}.viewer-account p{color:#cbd5df}.viewer-account h1{color:#f6f8fc}.viewer-account button,.viewer-account input{background:#14212a;color:#f5f8fb;border-color:#526773}.viewer-account__providers .viewer-account__apple{border-color:#82919d}.viewer-account__modes [aria-pressed=true]{border-color:#00c978}.viewer-account a{color:#b2d5f1}.viewer-account :focus-visible{outline-color:#72b9f4}}.live-media,.live-media__video,.live-media__iframe{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;border:0}.live-media{overflow:hidden;background:#000}.live-media__video,.live-media__iframe{object-fit:cover}.live-media__video{pointer-events:none}.live-media__video::-webkit-media-controls{display:none!important}.live-media__video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}.live-media__video[data-rotation="-90"],.live-media__video[data-rotation="90"]{inset:auto;top:50%;left:50%;width:100dvh;height:100dvw}.live-media__video[data-rotation="-90"]{transform:translate(-50%,-50%) rotate(-90deg)}.live-media__video[data-rotation="90"]{transform:translate(-50%,-50%) rotate(90deg)}.live-media__video[data-rotation="180"]{transform:rotate(180deg)}.match-stage.is-web-fullscreen{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;width:100dvw;height:100dvh}.live-media__presentation-canvas{display:none}.live-media__presentation-video{position:absolute;right:0;bottom:0;width:1px;height:1px;opacity:.001;pointer-events:none}.live-media__status{position:absolute;z-index:3;top:50%;left:50%;border-radius:999px;padding:9px 14px;color:#fff;background:#050a13d1;font-size:13px;font-weight:600;transform:translate(-50%,-50%)}.live-media__play{position:absolute;z-index:6;top:50%;left:50%;display:grid;width:56px;height:56px;place-items:center;border:0;border-radius:999px;padding:0;color:#fff;background:#050a13c2;box-shadow:0 10px 28px #00000047;transform:translate(-50%,-50%);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.live-media__play svg{transform:translate(1px)}.media-controls{position:absolute;z-index:5;right:auto;bottom:max(24px,env(safe-area-inset-bottom));left:max(24px,env(safe-area-inset-left));display:flex;max-width:calc(100% - 48px);flex-wrap:wrap;justify-content:flex-start;gap:8px}.media-control{display:flex;min-width:58px;min-height:68px;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:0;border-radius:0;padding:0;color:#fff;background:transparent;font-weight:600;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:content-box;width:22px;height:22px;border:1px solid rgba(255,255,255,.58);border-radius:11px;padding:10px;background:#03080fbd;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control__label{display:block;font-size:10px}@media(min-width:721px){.media-control__label{border-radius:4px;background:#03080fe6;box-shadow:0 0 0 2px #03080fe6;white-space:nowrap}}.media-control:disabled{cursor:not-allowed;opacity:.58}.viewer-header{position:absolute;z-index:5;top:max(28px,env(safe-area-inset-top));right:max(28px,env(safe-area-inset-right));left:max(28px,env(safe-area-inset-left));display:flex;align-items:center;justify-content:space-between;gap:12px;pointer-events:none}.viewer-header--without-team-hub{justify-content:flex-end}.viewer-header__status{display:flex;min-width:0;align-items:center;justify-content:flex-end;gap:10px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{position:relative;inset:auto;pointer-events:auto}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:48px}.match-status--action{max-width:min(440px,calc(100vw - 56px));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fanview-state-page{min-height:100dvh;display:grid;place-items:center;padding:24px;color:#fff;background:#050a13}.fanview-state-camera{position:relative;width:min(760px,100%);min-height:min(680px,calc(100dvh - 48px));overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:28px;background:#07101b;box-shadow:0 28px 80px #0000005c}.fanview-state-camera__court{position:absolute;top:0;right:0;bottom:238px;left:0;background:linear-gradient(#050a134d,#050a13a8),repeating-linear-gradient(90deg,transparent 0 15%,rgba(255,255,255,.035) 15% 15.4%),#111b27}.fanview-state-camera__court:before,.fanview-state-camera__court:after,.fanview-state-camera__court span{position:absolute;border:2px solid rgba(255,255,255,.16);content:""}.fanview-state-camera__court:before{top:20%;right:12%;bottom:13%;left:12%}.fanview-state-camera__court:after{top:52%;right:8%;left:8%;border-width:2px 0 0}.fanview-state-camera__court span{top:20%;bottom:13%;left:50%;border-width:0 0 0 2px}.fanview-state-card{position:absolute;right:18px;bottom:18px;left:18px;display:grid;gap:10px;border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:20px;text-align:left;background:#080d15f0;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.fanview-state-card strong{font-size:clamp(22px,4vw,30px)}.fanview-state-card>span{color:#c3cad4;line-height:1.45}.fanview-state-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:4px}.fanview-state-action{display:inline-flex;min-width:0;min-height:48px;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:0 13px;color:#fff;background:#ffffff14;font:inherit;font-size:13px;font-weight:600;text-align:center;text-decoration:none}.fanview-state-action--primary{border-color:#f22b78;background:#f22b78}.fanview-state-action--support{grid-column:1 / -1}.fanview-state-action:disabled{opacity:.5}.team-hub-back{position:absolute;z-index:5;top:max(82px,calc(env(safe-area-inset-top) + 58px));left:max(28px,env(safe-area-inset-left));display:inline-flex;min-height:44px;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.44);border-radius:999px;padding:0 13px;color:#fff;background:#03080fbd;font-size:13px;font-weight:600;text-decoration:none;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(340px,calc(100vw - 470px));min-width:300px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:66px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:38px;height:38px;flex-basis:38px;font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:20px}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(460px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(580px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:94px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:54px;height:54px;flex-basis:54px;font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:17px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:30px}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:auto;bottom:auto;left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:max(28px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:max(28px,env(safe-area-inset-bottom));left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(28px,env(safe-area-inset-right));bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:50%;transform:translate(-50%)}.scoreboard-display-trigger{display:inline-flex;min-width:48px;min-height:48px;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:0 12px;color:#fff;background:#03080fbd;font-weight:600;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.scoreboard-display-trigger--standalone{position:absolute;z-index:5;right:max(24px,env(safe-area-inset-right));bottom:max(24px,env(safe-area-inset-bottom))}.scoreboard-display-menu{position:absolute;z-index:9;top:max(80px,calc(env(safe-area-inset-top) + 56px));right:max(28px,env(safe-area-inset-right));display:grid;width:min(290px,calc(100vw - 32px));gap:9px;border:1px solid rgba(255,255,255,.42);border-radius:16px;padding:14px;color:#fff;background:#030a14f5;box-shadow:0 18px 48px #0000006b;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}.scoreboard-display-menu>strong{font-size:15px}.scoreboard-display-menu__label{color:#bdc7d4;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}.scoreboard-display-menu__options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.scoreboard-display-menu__positions{grid-template-columns:1fr 1fr}.scoreboard-display-menu button{min-width:0;min-height:44px;border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:0 8px;color:#fff;background:#ffffff0a;font-size:10px;font-weight:600}.scoreboard-display-menu button[aria-pressed=true]{border-color:#ff3f75;background:#ff3f752e;box-shadow:inset 0 0 0 1px #ff3f75}.scoreboard-display-menu__reset{width:100%}@media(max-width:720px){.fanview-app{--fanview-mobile-bottom-inset: max( 12px, env(safe-area-inset-bottom) );--fanview-mobile-cheer-width: min( clamp(104px, 42vw, 160px), calc(100vw - max(10px, env(safe-area-inset-left)) - max(10px, env(safe-area-inset-right)) - 186px) )}.match-status--action{display:none}.score-bug{display:block;top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));width:min(370px,calc(100vw - 20px));min-width:0;border-radius:12px;padding:6px;box-shadow:0 10px 28px #00000057}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(300px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(370px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:calc(100vw - 20px);min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:50%;transform:translate(-50%)}.score-bug__timeout{min-height:44px;margin-bottom:6px;padding:0 9px;font-size:10px}.score-bug__header{min-height:34px}.score-bug__format,.score-bug__set-heading{padding:0 5px;font-size:8px}.score-bug__format{padding-left:9px}.score-bug__set-heading{display:grid;place-items:center;gap:0}.score-bug__set-heading small{gap:3px;font-size:6px}.score-bug__set-heading small i{width:5px;height:5px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:64px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:54px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:74px}.score-bug__team{gap:7px;padding:7px 9px}.score-bug__team-mark,.fanview-app[data-scoreboard-size=standard] .score-bug__team-mark{width:34px;height:34px;flex-basis:34px;border-radius:8px;font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:28px;height:28px;flex-basis:28px;font-size:8px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:40px;height:40px;flex-basis:40px;font-size:11px}.score-bug__team-copy>strong,.fanview-app[data-scoreboard-size=standard] .score-bug__team-copy>strong{font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:9px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:11px}.score-bug__team-copy>small{font-size:7px}.score-bug__team-copy>small b{font-size:9px}.score-bug__cell-score,.fanview-app[data-scoreboard-size=standard] .score-bug__cell-score{font-size:19px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:22px}.score-bug__winner-badge{top:4px;right:4px;width:15px;height:15px;border-radius:4px;font-size:8px}.media-controls{right:calc(var(--fanview-mobile-cheer-width) + max(10px,env(safe-area-inset-right)) + 8px);bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));display:grid;max-width:none;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0;overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:22px;background:#03080fcc;box-shadow:0 8px 22px #00000040;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control{min-width:44px;min-height:58px;flex-direction:column;gap:4px;border:0;border-radius:0;padding:6px 2px 5px;background:transparent;box-shadow:none;font-size:10px;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:border-box;width:20px;height:20px;border:0;border-radius:0;padding:0;background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control+.media-control{border-left:1px solid rgba(255,255,255,.2)}.media-control__label{display:block;overflow:hidden;max-width:100%;color:#fff;font-size:8px;font-weight:500;line-height:1.15;overflow:visible;overflow-wrap:anywhere;text-overflow:clip;white-space:normal;text-align:center}.media-control svg{flex:0 0 auto;width:16px;height:16px;color:#fff}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);width:var(--fanview-mobile-cheer-width);min-height:58px;min-width:0;justify-content:center;gap:5px;overflow:hidden;padding:0 8px;font-size:10.5px;white-space:nowrap}.community-launcher svg{flex:0 0 auto;width:17px;height:17px}.community-launcher span{flex:0 0 auto;min-width:19px;height:19px;padding:0 4px}.viewer-header{top:max(13px,env(safe-area-inset-top));right:max(13px,env(safe-area-inset-right));left:max(13px,env(safe-area-inset-left));gap:8px}.viewer-header__status{gap:8px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:44px}.fanview-app .viewer-header .team-hub-back{padding:0 11px;font-size:11px}.fanview-app .viewer-header .live-pill{padding:0 10px}.scoreboard-display-trigger--standalone{right:auto;bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));min-width:44px;min-height:44px;padding:0 10px;font-size:11px}.scoreboard-display-menu{top:max(62px,calc(env(safe-area-inset-top) + 46px));right:max(10px,env(safe-area-inset-right));width:min(284px,calc(100vw - 20px))}.fanview-state-page{padding:12px}.fanview-state-camera{min-height:calc(100dvh - 24px);border-radius:22px}.fanview-state-actions{grid-template-columns:1fr 1fr}}@media(max-width:380px){.score-bug__team-copy>strong{font-size:10px}}@media(max-width:340px){.score-bug__team-mark{display:none}.score-bug__team{padding:5px 7px}}@media(max-width:300px){.viewer-header{right:max(8px,env(safe-area-inset-right));left:max(8px,env(safe-area-inset-left));gap:4px}.viewer-header__status{gap:4px}.fanview-app .viewer-header .team-hub-back{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .team-hub-back svg{width:15px;height:15px}.fanview-app .viewer-header .live-pill{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .live-pill__dot{width:6px;height:6px}.fanview-app .viewer-header .viewer-pill{min-width:0;gap:4px;padding:0 6px;font-size:9.5px}.fanview-app .viewer-header .viewer-pill svg{width:13px;height:13px}.media-controls{right:max(8px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.community-launcher{right:max(8px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);left:max(8px,env(safe-area-inset-left));width:auto}.scoreboard-display-trigger--standalone{right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.fanview-app[data-scoreboard-size] .score-bug{right:auto;width:calc(100vw - 16px);min-width:0;bottom:calc(var(--fanview-mobile-bottom-inset) + 133px);left:max(8px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-left] .score-bug,.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(8px,env(safe-area-inset-left))}.score-bug__team-mark{display:none}.score-bug__team{padding:5px 6px}.score-bug__team-copy>strong{font-size:8px}.score-bug__team-copy>small{font-size:6px}.score-bug__cell-score{font-size:15px}.score-bug__winner-badge{top:3px;right:3px;width:13px;height:13px;font-size:7px}.scoreboard-display-menu{right:max(8px,env(safe-area-inset-right));width:calc(100vw - 16px);padding:10px}.fanview-state-actions{grid-template-columns:1fr}.fanview-state-action--support{grid-column:auto}}.arena-scoreboard{min-height:100dvh;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto auto;align-items:center;justify-items:center;gap:clamp(18px,4vh,52px);padding:clamp(28px,5vh,72px) clamp(34px,5vw,96px);color:#fff;background:radial-gradient(circle at 0 50%,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent 42%),radial-gradient(circle at 100% 50%,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent 42%),#03070c}.arena-scoreboard__header{display:grid;justify-items:center;gap:18px;font-family:var(--font-sans);letter-spacing:.24em}.arena-scoreboard__header strong{font-family:var(--font-display);font-size:clamp(24px,2.2vw,42px)}.arena-scoreboard__header span{font-size:clamp(16px,1.55vw,30px);font-weight:600}.arena-scoreboard__board{width:min(100%,1500px);overflow:hidden;display:grid;grid-template-columns:1fr minmax(120px,11%) 1fr;border:2px solid rgba(255,255,255,.42);border-radius:18px;background:#03080fe6;box-shadow:0 30px 80px #00000080}.arena-scoreboard__team{min-width:0;min-height:clamp(190px,30vh,340px);display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(14px,1.6vw,30px);padding:clamp(22px,2.3vw,42px)}.arena-scoreboard__team--home{background:linear-gradient(90deg,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent)}.arena-scoreboard__team--away{background:linear-gradient(270deg,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent)}.arena-scoreboard__team i{width:16px;height:132px;border-radius:999px;background:var(--arena-home)}.arena-scoreboard__team--away i{background:var(--arena-away)}.arena-scoreboard__team span{min-width:0;display:grid;gap:18px}.arena-scoreboard__team b{overflow:hidden;color:#fff;font-family:var(--font-display);font-size:clamp(18px,1.55vw,38px);text-overflow:ellipsis;white-space:nowrap}.arena-scoreboard__team small{color:var(--arena-home);font-size:clamp(18px,2vw,34px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__team--away span{text-align:right}.arena-scoreboard__team--away small{color:var(--arena-away)}.arena-scoreboard__team>strong{font-family:var(--font-display);font-size:clamp(84px,10vw,180px);font-variant-numeric:tabular-nums;line-height:.85}.arena-scoreboard__set{display:grid;place-items:center;border-inline:1px solid rgba(255,255,255,.34);color:#c8ced6;font-size:clamp(22px,2.6vw,46px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__history{grid-column:1 / -1;min-height:92px;display:flex;justify-content:center;border-top:1px solid rgba(255,255,255,.34)}.arena-scoreboard__history>div{min-width:280px;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;border-inline:1px solid rgba(255,255,255,.24);text-align:center}.arena-scoreboard__history b,.arena-scoreboard__history span{font-size:clamp(22px,2.6vw,44px);font-variant-numeric:tabular-nums}.arena-scoreboard__history span{color:#a9b0b9}.arena-scoreboard__history span:first-of-type.is-winner{color:var(--arena-home)}.arena-scoreboard__history span:last-of-type.is-winner{color:var(--arena-away)}.arena-scoreboard__timeout{min-height:90px;display:grid;grid-auto-flow:column;place-items:center;justify-content:center;gap:22px;padding-inline:64px;border:2px solid #d99212;border-radius:16px;color:#ffb320;background:#341f04e0;font-size:clamp(22px,2.4vw,42px);font-weight:600}.arena-scoreboard footer{position:relative;width:min(100%,1500px);display:grid;place-items:center;color:#b8bec7;font-size:clamp(16px,1.55vw,28px)}.arena-scoreboard footer>div{position:absolute;right:0;bottom:-18px;display:grid;place-items:center}.arena-scoreboard footer>div b{position:absolute;font-size:9px;letter-spacing:.08em}@media(orientation:portrait),(max-width:760px){.arena-scoreboard{align-content:center;gap:22px;padding:24px 14px}.arena-scoreboard__board{grid-template-columns:1fr}.arena-scoreboard__set{min-height:70px;border:1px solid rgba(255,255,255,.34)}.arena-scoreboard__team{min-height:150px}.arena-scoreboard__history{grid-column:1;overflow-x:auto;justify-content:flex-start}.arena-scoreboard__timeout{min-height:64px;padding-inline:24px}.arena-scoreboard footer>div{display:none}}@media(max-width:980px)and (max-height:520px)and (orientation:landscape){.fanview-app,.match-stage{height:100dvh;min-height:0}.viewer-header{top:max(9px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));left:max(10px,env(safe-area-inset-left))}.media-controls{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left));display:grid;width:246px;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0}.media-control{min-width:44px;min-height:58px;padding:6px 2px 5px}.media-control__label{display:block}.fanview-app[data-scoreboard-size=small] .score-bug{width:260px;min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:330px;min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(430px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:50%;transform:translate(-50%)}.score-bug__header{min-height:30px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:52px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:46px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:58px}.score-bug__timeout{min-height:40px;font-size:9px}.score-bug__team{gap:6px;padding:5px 7px}.score-bug__team-mark{width:28px;height:28px;flex-basis:28px}.score-bug__team-copy>strong{font-size:9px}.score-bug__cell-score{font-size:17px}.scoreboard-display-trigger--standalone{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:50%;transform:translate(-50%)}.scoreboard-display-menu{top:max(58px,calc(env(safe-area-inset-top) + 44px));width:min(278px,calc(100vw - 20px));gap:6px;padding:10px}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));width:auto;min-height:58px;padding:0 12px;font-size:12px}}.score-bug{width:auto;min-width:0;border:0;border-radius:0;padding:0;background:transparent;box-shadow:none}.score-bug__full-card,.score-bug__bar-card,.score-bug__minimal-card{overflow:hidden;border:1px solid rgba(255,255,255,.34);color:#fff;background:#03080fed;box-shadow:0 14px 34px #00000057;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.score-bug__full-card{width:100%;border-radius:10px}.score-bug__full-team{display:grid;height:62px;grid-template-columns:7px minmax(0,1fr) auto 54px;align-items:center;gap:12px;padding:0 12px}.score-bug__full-team+.score-bug__full-team{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team-accent{width:7px;height:33px;border-radius:999px}.score-bug__full-team>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:.01em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__full-team>b{font-size:30px;font-variant-numeric:tabular-nums;font-weight:600;line-height:1;text-align:right}.score-bug__set-dots{display:inline-flex;gap:6px}.score-bug__set-dots i{width:9px;height:9px;border-radius:999px;background:#4a5059}.score-bug__full-team:first-child .score-bug__set-dots i.is-won{background:#23cdb5}.score-bug__full-team:nth-child(2) .score-bug__set-dots i.is-won{background:#ff7046}.score-bug__full-meta{display:flex;min-height:38px;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.22);padding:0 12px;color:#aeb7c4;font-size:12px;font-weight:600;letter-spacing:.08em}.score-bug__history{font-variant-numeric:tabular-nums}.score-bug__history--full{display:grid;min-height:42px;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.22)}.score-bug__history-set{position:relative;display:flex;min-width:0;align-items:center;justify-content:center;gap:6px;color:#929aa6;font-size:13px;font-weight:600}.score-bug__history-set+.score-bug__history-set{border-left:1px solid rgba(255,255,255,.22)}.score-bug__history-label{margin-right:7px;color:#aeb7c4;font-size:11px}.score-bug__history-score{position:relative}.score-bug__history-score.is-winner{color:#fff}.score-bug__history--full .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner{color:#23cdb5}.score-bug__history--full .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner{color:#ff7046}.score-bug__history .score-bug__winner-badge,.scoreboard-sr-only{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;margin:-1px!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}.score-bug__timeout{min-height:40px;justify-content:center;margin:0 0 8px;border:1px solid rgba(255,179,32,.56);border-radius:8px;padding:0 12px;color:#ffb320;background:#362004e6;font-size:11px}.score-bug--score-bar .score-bug__timeout{width:fit-content;min-width:210px;margin-right:auto;margin-left:auto;border-radius:999px}.score-bug__bar-card{display:grid;min-height:72px;grid-template-columns:minmax(0,1fr) minmax(132px,.85fr) minmax(0,1fr);border-radius:9px}.score-bug__bar-team{display:grid;min-width:0;align-items:center;gap:12px;padding:0 14px}.score-bug__bar-team--home{grid-template-columns:7px minmax(0,1fr) auto}.score-bug__bar-team--away{grid-template-columns:auto minmax(0,1fr) 7px}.score-bug__bar-team i{width:7px;height:38px;border-radius:999px}.score-bug__bar-team span{overflow:hidden;font-size:15px;font-weight:600;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__bar-team--away span{text-align:right}.score-bug__bar-team strong{font-size:30px;font-variant-numeric:tabular-nums;line-height:1}.score-bug__bar-center{display:grid;align-content:center;border-right:1px solid rgba(255,255,255,.22);border-left:1px solid rgba(255,255,255,.22);gap:3px;text-align:center}.score-bug__bar-center>span{color:#d8dde4;font-size:11px;font-weight:600;letter-spacing:.08em}.score-bug__history--bar{display:flex;justify-content:center}.score-bug__history--bar .score-bug__history-set{gap:5px;padding:0 8px;font-size:11px}.score-bug__history--bar .score-bug__history-label{margin-right:0;font-size:8px}.score-bug__minimal-card{display:flex;min-height:54px;align-items:center;gap:13px;border-radius:999px;padding:6px 18px 6px 6px}.score-bug__minimal-card>span{display:inline-flex;min-height:40px;align-items:center;border-radius:999px;padding:0 18px;color:#07101b;background:#ff5f2d;font-size:14px;font-weight:600}.score-bug__minimal-card>strong{font-size:20px;font-variant-numeric:tabular-nums;font-weight:600}.score-bug__minimal-card>i{color:#969eaa;font-style:normal;font-weight:600}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=small] .score-bug{width:min(285px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=standard] .score-bug{width:min(344px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=large] .score-bug{width:min(408px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=small] .score-bug{width:min(570px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=standard] .score-bug{width:min(720px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=large] .score-bug{width:min(880px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=small] .score-bug{width:auto;transform:scale(.86);transform-origin:bottom center}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=large] .score-bug{width:auto;transform:scale(1.16);transform-origin:bottom center}.scoreboard-display-menu{position:fixed;top:auto;right:auto;bottom:0;left:50%;width:min(680px,100vw);max-height:min(830px,calc(100dvh - 76px));grid-auto-rows:max-content;align-content:start;overflow-y:auto;gap:14px;border-radius:24px 24px 0 0;padding:14px 28px max(24px,env(safe-area-inset-bottom));transform:translate(-50%)}.scoreboard-display-menu__handle{width:46px;height:5px;justify-self:center;border-radius:999px;background:#65717c}.scoreboard-display-menu>strong{font-size:24px;line-height:1.1;text-align:center}.scoreboard-display-menu>p{margin:-3px 0 4px;color:#aab2bf;font-size:14px;text-align:center}.scoreboard-display-menu__label{color:#fff;font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__layouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.scoreboard-display-menu button.scoreboard-display-menu__layout{position:relative;display:grid;min-height:178px;grid-template-rows:minmax(98px,1fr) minmax(20px,auto) minmax(42px,auto);align-items:center;border-radius:12px;padding:10px 7px 0}.scoreboard-display-menu__layout>b{grid-row:3;min-width:0;overflow-wrap:anywhere;align-self:stretch;display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22);font-size:13px;letter-spacing:.06em}.scoreboard-display-menu__layout>small{grid-row:2;min-width:0;line-height:1.25;overflow-wrap:anywhere;color:#ff3f75;font-size:8px;font-weight:600}.scoreboard-display-menu__check,.scoreboard-display-menu__option-check,.scoreboard-display-menu__position-check{position:absolute;display:grid;place-items:center;border-radius:999px;color:#fff;background:#ef3d68}.scoreboard-display-menu__check{top:10px;right:10px;width:30px;height:30px}.scoreboard-layout-preview{position:relative;display:block;justify-self:center;border:1px solid rgba(255,255,255,.34);background:#050a11}.scoreboard-layout-preview--full-score{width:122px;height:65px;border-radius:6px}.scoreboard-layout-preview--full-score i{display:block;height:21px;border-bottom:1px solid rgba(255,255,255,.22)}.scoreboard-layout-preview--full-score i:first-child{border-left:4px solid #20cdb4}.scoreboard-layout-preview--full-score i:nth-child(2){border-left:4px solid #ff7046}.scoreboard-layout-preview--score-bar{width:142px;height:35px;border-radius:5px}.scoreboard-layout-preview--score-bar i:first-child,.scoreboard-layout-preview--score-bar i:nth-child(2){position:absolute;top:6px;bottom:6px;width:5px;border-radius:99px}.scoreboard-layout-preview--score-bar i:first-child{left:6px;background:#20cdb4}.scoreboard-layout-preview--score-bar i:nth-child(2){right:6px;background:#ff7046}.scoreboard-layout-preview--minimal{width:100px;height:32px;border-radius:999px}.scoreboard-layout-preview--minimal i:first-child{position:absolute;top:5px;bottom:5px;left:5px;width:42px;border-radius:999px;background:#ff5f2d}.scoreboard-display-menu__options{gap:0}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions){overflow:hidden;border:1px solid rgba(255,255,255,.22);border-radius:12px}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;min-height:52px;padding:8px;border:0;border-radius:0;font-size:13px;letter-spacing:.05em}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button+button{border-left:1px solid rgba(255,255,255,.22)}.scoreboard-display-menu__option-check{position:static;flex:0 0 18px;width:18px;height:18px}.scoreboard-display-menu__positions{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.scoreboard-display-menu__positions button{position:relative;box-sizing:border-box;width:100%;min-width:0;display:grid;aspect-ratio:1.15;min-height:64px;padding:8px}.scoreboard-position-icon{position:relative;box-sizing:border-box;display:block;min-width:0;min-height:28px;width:100%;height:100%;border:1px solid #5d6671}.scoreboard-position-icon i{position:absolute;width:22%;height:8%;border-radius:999px;background:#ff3f75}.scoreboard-position-icon--top-left i{top:8%;left:7%}.scoreboard-position-icon--top-right i{top:8%;right:7%}.scoreboard-position-icon--bottom-left i{bottom:8%;left:7%}.scoreboard-position-icon--bottom-right i{right:7%;bottom:8%}.scoreboard-position-icon--bottom-center i{bottom:8%;left:39%}.scoreboard-display-menu__position-check{top:4px;right:4px;width:24px;height:24px}.scoreboard-display-menu__automatic{display:flex;min-height:72px;align-items:center;justify-content:space-between;border-width:1px 0;border-radius:0;padding:0;text-align:left}.scoreboard-display-menu__automatic>span{min-width:0;overflow-wrap:anywhere;display:grid;gap:4px}.scoreboard-display-menu__automatic b{font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__automatic small{color:#aab2bf;font-size:12px}.scoreboard-display-menu__switch{flex:0 0 54px;position:relative;width:54px;height:32px;border:1px solid #606a75;border-radius:999px;background:#1e2731}.scoreboard-display-menu__switch span{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:999px;background:#fff;transition:transform .14s ease}.scoreboard-display-menu__switch[data-on=true]{border-color:#20a66b;background:#20a66b}.scoreboard-display-menu__switch[data-on=true] span{transform:translate(22px)}.scoreboard-display-menu button.scoreboard-display-menu__reset{min-height:44px;border:0;color:#ff3f75;background:transparent;font-size:13px}.fanview-app button,.fanview-state-page button,.scoreboard-display-menu button{font-family:var(--font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase}@media(max-width:720px){.viewer-header{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.score-bug__bar-card{min-height:58px;grid-template-columns:minmax(0,1fr) minmax(104px,.8fr) minmax(0,1fr)}.score-bug__bar-team{gap:6px;padding:0 8px}.score-bug__bar-team span{font-size:10px}.score-bug__bar-team strong{font-size:22px}.score-bug__bar-team i{width:5px;height:31px}.score-bug__history--bar .score-bug__history-set{padding:0 4px;font-size:9px}.score-bug__full-team{height:54px;grid-template-columns:6px minmax(0,1fr) auto 45px;gap:8px;padding:0 10px}.score-bug__full-team>strong{font-size:13px}.score-bug__full-team>b{font-size:26px}.scoreboard-display-menu{width:100vw;max-height:calc(100dvh - 56px);gap:11px;border-radius:22px 22px 0 0;padding:12px 16px max(18px,env(safe-area-inset-bottom))}.scoreboard-display-menu>strong{font-size:20px}.scoreboard-display-menu__layouts{gap:8px}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:146px;grid-template-rows:minmax(78px,1fr) minmax(16px,auto) minmax(37px,auto);padding:7px 4px 0}.scoreboard-display-menu__layout>b{font-size:11px}.scoreboard-layout-preview--full-score{width:min(92px,90%)}.scoreboard-layout-preview--score-bar{width:min(100px,92%)}.scoreboard-layout-preview--minimal{width:min(82px,90%)}.scoreboard-display-menu__positions{gap:6px}.scoreboard-display-menu__positions button{min-height:56px;padding:6px}}@media(max-width:300px){.scoreboard-display-menu__layouts{grid-template-columns:1fr}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:102px;grid-template-columns:1fr 1fr;grid-template-rows:1fr 24px}.scoreboard-display-menu__layout>b{grid-row:1 / 3;border-top:0;border-left:1px solid rgba(255,255,255,.22)}}.fanview-state-card,.scoreboard-display-menu{border-color:#40535e;background:var(--cv-face-dark);box-shadow:inset 0 1px #e1f0f91f,inset 0 -5px #0b141b,0 18px 48px #0000006b}.fanview-state-action--primary.cv-primary-action{grid-column:1 / -1}
/* Bounded QA corrections; approved baseline CSS remains byte-identical. */
@media (max-width: 340px) {
  .scoreboard-display-menu__positions { grid-template-columns: repeat(auto-fit, minmax(44px, 1fr)); }
  .scoreboard-display-menu__positions button { min-width: 44px; min-height: 44px; }
  .score-bug__timeout, .score-bug--score-bar .score-bug__timeout {
    box-sizing: border-box; min-width: 0; max-width: 100%; padding: 4px 8px;
  }
  .score-bug__timeout strong { min-width: 0; overflow-wrap: anywhere; }
  .score-bug__bar-card { grid-template-columns: minmax(0, 1fr); }
  .score-bug__bar-team { min-height: 38px; }
  .score-bug__bar-team span, .score-bug__full-team > strong { white-space: normal; overflow-wrap: anywhere; }
  .score-bug__bar-center { grid-row: 3; border: 0; border-top: 1px solid rgba(255,255,255,.22); padding: 4px; }
  .score-bug__history--bar { flex-wrap: wrap; gap: 4px 0; }
  .score-bug__full-team {
    height: auto; min-height: 54px; grid-template-columns: 6px minmax(0, 1fr) auto;
    gap: 4px 6px; padding: 6px;
  }
  .score-bug__full-team > b { grid-column: 3; grid-row: 1; }
  .score-bug__full-team .score-bug__set-dots { grid-column: 2; }
  .score-bug__history--full { grid-template-columns: repeat(auto-fit, minmax(82px, 1fr)); }
  .score-bug__history--full .score-bug__history-set { min-height: 28px; gap: 4px; }
  .score-bug__history--full .score-bug__history-label { margin-right: 0; }
}
/* Preserve Full Score content within its anchor between header and control dock. */
@media (orientation: landscape) and (max-height: 360px) {
  .score-bug__full-team { height: 38px; }
  .score-bug__full-meta { min-height: 28px; }
  .score-bug__history--full { min-height: 28px; }
  .score-bug--full-score .score-bug__timeout { min-height: 32px; margin-bottom: 4px; }
}
/* At 200% phone reflow, prevent transformed overflow and reserve the dock. */
@media (max-width: 240px) {
  .fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"] .score-bug {
    max-width: calc(100vw - 20px);
    transform: none;
  }
  .fanview-app[data-scoreboard-layout="full-score"][data-scoreboard-position="top-left"] .score-bug,
  .fanview-app[data-scoreboard-layout="full-score"][data-scoreboard-position="top-right"] .score-bug {
    top: max(64px, calc(env(safe-area-inset-top) + 60px));
  }
}
/* Large Minimal grows inward from the selected corner, not past its safe inset. */
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="top-left"] .score-bug { transform-origin: top left; }
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="top-right"] .score-bug { transform-origin: top right; }
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="bottom-left"] .score-bug { transform-origin: bottom left; }
.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="bottom-right"] .score-bug { transform-origin: bottom right; }
/* Small white labels require >=4.5:1; retain red LIVE and pink Chat semantics. */
.fanview-app .viewer-header .live-pill { background-color: #d32f2f; }
.fanview-app .community-launcher { background-color: #d6296b; }
/* Preserve Community styling while meeting contrast and touch-target minimums. */
.fanview-app .community-message__header span[data-role="Teammate"] { color: #8a5600; }
.fanview-app .community-panel .icon-button { width: 44px; height: 44px; min-width: 44px; min-height: 44px; flex-shrink: 0; }
.fanview-app .community-panel .reaction-row button { min-width: 44px; min-height: 44px; }
/* Short screens must retain a readable feed and reachable composer. */
@media (max-width: 720px) and (max-height: 500px) {
  .fanview-app .community-panel:not(.community-panel--broadcaster) {
    height: calc(100dvh - max(16px, env(safe-area-inset-top)));
    grid-template-rows: auto auto minmax(96px, 1fr) auto;
    overflow-y: auto;
  }
}
`.match(/@font-face\s*\{[^}]+\}/g) || []).join(`
`), document.head.appendChild(Z);
  }
  const C = document.createElement("div");
  E.appendChild(C);
  const R = xm.createRoot(C);
  let H = null, te = Gm(), T = !1, w = !1, L = !1, N, K = !1;
  const xe = () => v.trigger.focus(), Q = (Z = !0) => {
    const ve = T;
    T = !1, ge(), ve && Z && xe();
  }, ge = () => {
    K || (v.trigger.setAttribute("aria-expanded", String(T)), c.style.zIndex = T ? "30" : "9", R.render(/* @__PURE__ */ A.jsx(
      Lm,
      {
        match: H,
        error: w,
        open: T,
        preference: te,
        onClose: () => Q(),
        restoreFocus: xe,
        onRetry: v.retry,
        onPreference: (Z) => {
          L = !0, te = Z;
          try {
            localStorage.setItem(Bd, JSON.stringify(Z));
          } catch {
          }
          clearTimeout(N), v.save && (N = setTimeout(() => {
            v.save(Z).catch(() => {
            });
          }, 800)), ge();
        }
      }
    )));
  }, Me = () => {
    var je;
    const Z = v.controls.getBoundingClientRect(), ve = ((je = window.visualViewport) == null ? void 0 : je.height) || window.innerHeight;
    c.style.setProperty("--broadcast-dock-inset", `${Math.max(12, ve - Z.top + 12)}px`);
  }, _e = typeof ResizeObserver < "u" ? new ResizeObserver(Me) : null;
  return _e == null || _e.observe(v.controls), window.addEventListener("resize", Me), (Je = window.visualViewport) == null || Je.addEventListener("resize", Me), Me(), ge(), {
    toggle() {
      if (T) {
        Q(!0);
        return;
      }
      T = !0, Me(), ge();
    },
    close: Q,
    setRow(Z) {
      H = Z ? Qm(Z, null).match : null, w = !Z, ge();
    },
    setUnavailable() {
      H = null, w = !0, ge();
    },
    hydrate(Z) {
      !L && kd(Z) && (te = Z, ge());
    },
    destroy() {
      var Z;
      K || (K = !0, clearTimeout(N), _e == null || _e.disconnect(), window.removeEventListener("resize", Me), (Z = window.visualViewport) == null || Z.removeEventListener("resize", Me), R.unmount());
    }
  };
}
export {
  qd as BROADCAST_DISPLAY_DEFAULT,
  Bd as BROADCAST_DISPLAY_KEY,
  Lm as BroadcasterDisplayView,
  kd as isBroadcastPreference,
  Vm as mountBroadcasterDisplay
};
