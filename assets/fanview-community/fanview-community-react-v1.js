var sm = Object.defineProperty;
var om = (v, M, T) => M in v ? sm(v, M, { enumerable: !0, configurable: !0, writable: !0, value: T }) : v[M] = T;
var Rl = (v, M, T) => om(v, typeof M != "symbol" ? M + "" : M, T);
var ff = { exports: {} }, zn = {};
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
function rm() {
  if (b1) return zn;
  b1 = 1;
  var v = Symbol.for("react.transitional.element"), M = Symbol.for("react.fragment");
  function T(r, X, Z) {
    var K = null;
    if (Z !== void 0 && (K = "" + Z), X.key !== void 0 && (K = "" + X.key), "key" in X) {
      Z = {};
      for (var P in X)
        P !== "key" && (Z[P] = X[P]);
    } else Z = X;
    return X = Z.ref, {
      $$typeof: v,
      type: r,
      key: K,
      ref: X !== void 0 ? X : null,
      props: Z
    };
  }
  return zn.Fragment = M, zn.jsx = T, zn.jsxs = T, zn;
}
var S1;
function dm() {
  return S1 || (S1 = 1, ff.exports = rm()), ff.exports;
}
var _ = dm(), sf = { exports: {} }, xn = {}, of = { exports: {} }, rf = {};
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
function mm() {
  return E1 || (E1 = 1, (function(v) {
    function M(b, O) {
      var Q = b.length;
      b.push(O);
      t: for (; 0 < Q; ) {
        var yt = Q - 1 >>> 1, bt = b[yt];
        if (0 < X(bt, O))
          b[yt] = O, b[Q] = bt, Q = yt;
        else break t;
      }
    }
    function T(b) {
      return b.length === 0 ? null : b[0];
    }
    function r(b) {
      if (b.length === 0) return null;
      var O = b[0], Q = b.pop();
      if (Q !== O) {
        b[0] = Q;
        t: for (var yt = 0, bt = b.length, o = bt >>> 1; yt < o; ) {
          var x = 2 * (yt + 1) - 1, D = b[x], j = x + 1, W = b[j];
          if (0 > X(D, Q))
            j < bt && 0 > X(W, D) ? (b[yt] = W, b[j] = Q, yt = j) : (b[yt] = D, b[x] = Q, yt = x);
          else if (j < bt && 0 > X(W, Q))
            b[yt] = W, b[j] = Q, yt = j;
          else break t;
        }
      }
      return O;
    }
    function X(b, O) {
      var Q = b.sortIndex - O.sortIndex;
      return Q !== 0 ? Q : b.id - O.id;
    }
    if (v.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var Z = performance;
      v.unstable_now = function() {
        return Z.now();
      };
    } else {
      var K = Date, P = K.now();
      v.unstable_now = function() {
        return K.now() - P;
      };
    }
    var U = [], z = [], w = 1, C = null, I = 3, H = !1, q = !1, J = !1, rt = !1, dt = typeof setTimeout == "function" ? setTimeout : null, Tt = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function At(b) {
      for (var O = T(z); O !== null; ) {
        if (O.callback === null) r(z);
        else if (O.startTime <= b)
          r(z), O.sortIndex = O.expirationTime, M(U, O);
        else break;
        O = T(z);
      }
    }
    function Ct(b) {
      if (J = !1, At(b), !q)
        if (T(U) !== null)
          q = !0, _t || (_t = !0, it());
        else {
          var O = T(z);
          O !== null && Ml(Ct, O.startTime - b);
        }
    }
    var _t = !1, F = -1, Mt = 5, $t = -1;
    function _l() {
      return rt ? !0 : !(v.unstable_now() - $t < Mt);
    }
    function Y() {
      if (rt = !1, _t) {
        var b = v.unstable_now();
        $t = b;
        var O = !0;
        try {
          t: {
            q = !1, J && (J = !1, Tt(F), F = -1), H = !0;
            var Q = I;
            try {
              l: {
                for (At(b), C = T(U); C !== null && !(C.expirationTime > b && _l()); ) {
                  var yt = C.callback;
                  if (typeof yt == "function") {
                    C.callback = null, I = C.priorityLevel;
                    var bt = yt(
                      C.expirationTime <= b
                    );
                    if (b = v.unstable_now(), typeof bt == "function") {
                      C.callback = bt, At(b), O = !0;
                      break l;
                    }
                    C === T(U) && r(U), At(b);
                  } else r(U);
                  C = T(U);
                }
                if (C !== null) O = !0;
                else {
                  var o = T(z);
                  o !== null && Ml(
                    Ct,
                    o.startTime - b
                  ), O = !1;
                }
              }
              break t;
            } finally {
              C = null, I = Q, H = !1;
            }
            O = void 0;
          }
        } finally {
          O ? it() : _t = !1;
        }
      }
    }
    var it;
    if (typeof L == "function")
      it = function() {
        L(Y);
      };
    else if (typeof MessageChannel < "u") {
      var Ft = new MessageChannel(), Jt = Ft.port2;
      Ft.port1.onmessage = Y, it = function() {
        Jt.postMessage(null);
      };
    } else
      it = function() {
        dt(Y, 0);
      };
    function Ml(b, O) {
      F = dt(function() {
        b(v.unstable_now());
      }, O);
    }
    v.unstable_IdlePriority = 5, v.unstable_ImmediatePriority = 1, v.unstable_LowPriority = 4, v.unstable_NormalPriority = 3, v.unstable_Profiling = null, v.unstable_UserBlockingPriority = 2, v.unstable_cancelCallback = function(b) {
      b.callback = null;
    }, v.unstable_forceFrameRate = function(b) {
      0 > b || 125 < b ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Mt = 0 < b ? Math.floor(1e3 / b) : 5;
    }, v.unstable_getCurrentPriorityLevel = function() {
      return I;
    }, v.unstable_next = function(b) {
      switch (I) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = I;
      }
      var Q = I;
      I = O;
      try {
        return b();
      } finally {
        I = Q;
      }
    }, v.unstable_requestPaint = function() {
      rt = !0;
    }, v.unstable_runWithPriority = function(b, O) {
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
      var Q = I;
      I = b;
      try {
        return O();
      } finally {
        I = Q;
      }
    }, v.unstable_scheduleCallback = function(b, O, Q) {
      var yt = v.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? yt + Q : yt) : Q = yt, b) {
        case 1:
          var bt = -1;
          break;
        case 2:
          bt = 250;
          break;
        case 5:
          bt = 1073741823;
          break;
        case 4:
          bt = 1e4;
          break;
        default:
          bt = 5e3;
      }
      return bt = Q + bt, b = {
        id: w++,
        callback: O,
        priorityLevel: b,
        startTime: Q,
        expirationTime: bt,
        sortIndex: -1
      }, Q > yt ? (b.sortIndex = Q, M(z, b), T(U) === null && b === T(z) && (J ? (Tt(F), F = -1) : J = !0, Ml(Ct, Q - yt))) : (b.sortIndex = bt, M(U, b), q || H || (q = !0, _t || (_t = !0, it()))), b;
    }, v.unstable_shouldYield = _l, v.unstable_wrapCallback = function(b) {
      var O = I;
      return function() {
        var Q = I;
        I = O;
        try {
          return b.apply(this, arguments);
        } finally {
          I = Q;
        }
      };
    };
  })(rf)), rf;
}
var z1;
function hm() {
  return z1 || (z1 = 1, of.exports = mm()), of.exports;
}
var df = { exports: {} }, V = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var x1;
function ym() {
  if (x1) return V;
  x1 = 1;
  var v = Symbol.for("react.transitional.element"), M = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), X = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), K = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), U = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), I = Symbol.iterator;
  function H(o) {
    return o === null || typeof o != "object" ? null : (o = I && o[I] || o["@@iterator"], typeof o == "function" ? o : null);
  }
  var q = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, J = Object.assign, rt = {};
  function dt(o, x, D) {
    this.props = o, this.context = x, this.refs = rt, this.updater = D || q;
  }
  dt.prototype.isReactComponent = {}, dt.prototype.setState = function(o, x) {
    if (typeof o != "object" && typeof o != "function" && o != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, o, x, "setState");
  }, dt.prototype.forceUpdate = function(o) {
    this.updater.enqueueForceUpdate(this, o, "forceUpdate");
  };
  function Tt() {
  }
  Tt.prototype = dt.prototype;
  function L(o, x, D) {
    this.props = o, this.context = x, this.refs = rt, this.updater = D || q;
  }
  var At = L.prototype = new Tt();
  At.constructor = L, J(At, dt.prototype), At.isPureReactComponent = !0;
  var Ct = Array.isArray;
  function _t() {
  }
  var F = { H: null, A: null, T: null, S: null }, Mt = Object.prototype.hasOwnProperty;
  function $t(o, x, D) {
    var j = D.ref;
    return {
      $$typeof: v,
      type: o,
      key: x,
      ref: j !== void 0 ? j : null,
      props: D
    };
  }
  function _l(o, x) {
    return $t(o.type, x, o.props);
  }
  function Y(o) {
    return typeof o == "object" && o !== null && o.$$typeof === v;
  }
  function it(o) {
    var x = { "=": "=0", ":": "=2" };
    return "$" + o.replace(/[=:]/g, function(D) {
      return x[D];
    });
  }
  var Ft = /\/+/g;
  function Jt(o, x) {
    return typeof o == "object" && o !== null && o.key != null ? it("" + o.key) : x.toString(36);
  }
  function Ml(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (typeof o.status == "string" ? o.then(_t, _t) : (o.status = "pending", o.then(
          function(x) {
            o.status === "pending" && (o.status = "fulfilled", o.value = x);
          },
          function(x) {
            o.status === "pending" && (o.status = "rejected", o.reason = x);
          }
        )), o.status) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function b(o, x, D, j, W) {
    var tt = typeof o;
    (tt === "undefined" || tt === "boolean") && (o = null);
    var ot = !1;
    if (o === null) ot = !0;
    else
      switch (tt) {
        case "bigint":
        case "string":
        case "number":
          ot = !0;
          break;
        case "object":
          switch (o.$$typeof) {
            case v:
            case M:
              ot = !0;
              break;
            case w:
              return ot = o._init, b(
                ot(o._payload),
                x,
                D,
                j,
                W
              );
          }
      }
    if (ot)
      return W = W(o), ot = j === "" ? "." + Jt(o, 0) : j, Ct(W) ? (D = "", ot != null && (D = ot.replace(Ft, "$&/") + "/"), b(W, x, D, "", function(Oa) {
        return Oa;
      })) : W != null && (Y(W) && (W = _l(
        W,
        D + (W.key == null || o && o.key === W.key ? "" : ("" + W.key).replace(
          Ft,
          "$&/"
        ) + "/") + ot
      )), x.push(W)), 1;
    ot = 0;
    var Wt = j === "" ? "." : j + ":";
    if (Ct(o))
      for (var Ut = 0; Ut < o.length; Ut++)
        j = o[Ut], tt = Wt + Jt(j, Ut), ot += b(
          j,
          x,
          D,
          tt,
          W
        );
    else if (Ut = H(o), typeof Ut == "function")
      for (o = Ut.call(o), Ut = 0; !(j = o.next()).done; )
        j = j.value, tt = Wt + Jt(j, Ut++), ot += b(
          j,
          x,
          D,
          tt,
          W
        );
    else if (tt === "object") {
      if (typeof o.then == "function")
        return b(
          Ml(o),
          x,
          D,
          j,
          W
        );
      throw x = String(o), Error(
        "Objects are not valid as a React child (found: " + (x === "[object Object]" ? "object with keys {" + Object.keys(o).join(", ") + "}" : x) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ot;
  }
  function O(o, x, D) {
    if (o == null) return o;
    var j = [], W = 0;
    return b(o, j, "", "", function(tt) {
      return x.call(D, tt, W++);
    }), j;
  }
  function Q(o) {
    if (o._status === -1) {
      var x = o._result;
      x = x(), x.then(
        function(D) {
          (o._status === 0 || o._status === -1) && (o._status = 1, o._result = D);
        },
        function(D) {
          (o._status === 0 || o._status === -1) && (o._status = 2, o._result = D);
        }
      ), o._status === -1 && (o._status = 0, o._result = x);
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var yt = typeof reportError == "function" ? reportError : function(o) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var x = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof o == "object" && o !== null && typeof o.message == "string" ? String(o.message) : String(o),
        error: o
      });
      if (!window.dispatchEvent(x)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", o);
      return;
    }
    console.error(o);
  }, bt = {
    map: O,
    forEach: function(o, x, D) {
      O(
        o,
        function() {
          x.apply(this, arguments);
        },
        D
      );
    },
    count: function(o) {
      var x = 0;
      return O(o, function() {
        x++;
      }), x;
    },
    toArray: function(o) {
      return O(o, function(x) {
        return x;
      }) || [];
    },
    only: function(o) {
      if (!Y(o))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return o;
    }
  };
  return V.Activity = C, V.Children = bt, V.Component = dt, V.Fragment = T, V.Profiler = X, V.PureComponent = L, V.StrictMode = r, V.Suspense = U, V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, V.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(o) {
      return F.H.useMemoCache(o);
    }
  }, V.cache = function(o) {
    return function() {
      return o.apply(null, arguments);
    };
  }, V.cacheSignal = function() {
    return null;
  }, V.cloneElement = function(o, x, D) {
    if (o == null)
      throw Error(
        "The argument must be a React element, but you passed " + o + "."
      );
    var j = J({}, o.props), W = o.key;
    if (x != null)
      for (tt in x.key !== void 0 && (W = "" + x.key), x)
        !Mt.call(x, tt) || tt === "key" || tt === "__self" || tt === "__source" || tt === "ref" && x.ref === void 0 || (j[tt] = x[tt]);
    var tt = arguments.length - 2;
    if (tt === 1) j.children = D;
    else if (1 < tt) {
      for (var ot = Array(tt), Wt = 0; Wt < tt; Wt++)
        ot[Wt] = arguments[Wt + 2];
      j.children = ot;
    }
    return $t(o.type, W, j);
  }, V.createContext = function(o) {
    return o = {
      $$typeof: K,
      _currentValue: o,
      _currentValue2: o,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, o.Provider = o, o.Consumer = {
      $$typeof: Z,
      _context: o
    }, o;
  }, V.createElement = function(o, x, D) {
    var j, W = {}, tt = null;
    if (x != null)
      for (j in x.key !== void 0 && (tt = "" + x.key), x)
        Mt.call(x, j) && j !== "key" && j !== "__self" && j !== "__source" && (W[j] = x[j]);
    var ot = arguments.length - 2;
    if (ot === 1) W.children = D;
    else if (1 < ot) {
      for (var Wt = Array(ot), Ut = 0; Ut < ot; Ut++)
        Wt[Ut] = arguments[Ut + 2];
      W.children = Wt;
    }
    if (o && o.defaultProps)
      for (j in ot = o.defaultProps, ot)
        W[j] === void 0 && (W[j] = ot[j]);
    return $t(o, tt, W);
  }, V.createRef = function() {
    return { current: null };
  }, V.forwardRef = function(o) {
    return { $$typeof: P, render: o };
  }, V.isValidElement = Y, V.lazy = function(o) {
    return {
      $$typeof: w,
      _payload: { _status: -1, _result: o },
      _init: Q
    };
  }, V.memo = function(o, x) {
    return {
      $$typeof: z,
      type: o,
      compare: x === void 0 ? null : x
    };
  }, V.startTransition = function(o) {
    var x = F.T, D = {};
    F.T = D;
    try {
      var j = o(), W = F.S;
      W !== null && W(D, j), typeof j == "object" && j !== null && typeof j.then == "function" && j.then(_t, yt);
    } catch (tt) {
      yt(tt);
    } finally {
      x !== null && D.types !== null && (x.types = D.types), F.T = x;
    }
  }, V.unstable_useCacheRefresh = function() {
    return F.H.useCacheRefresh();
  }, V.use = function(o) {
    return F.H.use(o);
  }, V.useActionState = function(o, x, D) {
    return F.H.useActionState(o, x, D);
  }, V.useCallback = function(o, x) {
    return F.H.useCallback(o, x);
  }, V.useContext = function(o) {
    return F.H.useContext(o);
  }, V.useDebugValue = function() {
  }, V.useDeferredValue = function(o, x) {
    return F.H.useDeferredValue(o, x);
  }, V.useEffect = function(o, x) {
    return F.H.useEffect(o, x);
  }, V.useEffectEvent = function(o) {
    return F.H.useEffectEvent(o);
  }, V.useId = function() {
    return F.H.useId();
  }, V.useImperativeHandle = function(o, x, D) {
    return F.H.useImperativeHandle(o, x, D);
  }, V.useInsertionEffect = function(o, x) {
    return F.H.useInsertionEffect(o, x);
  }, V.useLayoutEffect = function(o, x) {
    return F.H.useLayoutEffect(o, x);
  }, V.useMemo = function(o, x) {
    return F.H.useMemo(o, x);
  }, V.useOptimistic = function(o, x) {
    return F.H.useOptimistic(o, x);
  }, V.useReducer = function(o, x, D) {
    return F.H.useReducer(o, x, D);
  }, V.useRef = function(o) {
    return F.H.useRef(o);
  }, V.useState = function(o) {
    return F.H.useState(o);
  }, V.useSyncExternalStore = function(o, x, D) {
    return F.H.useSyncExternalStore(
      o,
      x,
      D
    );
  }, V.useTransition = function() {
    return F.H.useTransition();
  }, V.version = "19.2.0", V;
}
var T1;
function vf() {
  return T1 || (T1 = 1, df.exports = ym()), df.exports;
}
var mf = { exports: {} }, Kt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var A1;
function vm() {
  if (A1) return Kt;
  A1 = 1;
  var v = vf();
  function M(U) {
    var z = "https://react.dev/errors/" + U;
    if (1 < arguments.length) {
      z += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        z += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return "Minified React error #" + U + "; visit " + z + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function T() {
  }
  var r = {
    d: {
      f: T,
      r: function() {
        throw Error(M(522));
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
  }, X = Symbol.for("react.portal");
  function Z(U, z, w) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: X,
      key: C == null ? null : "" + C,
      children: U,
      containerInfo: z,
      implementation: w
    };
  }
  var K = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function P(U, z) {
    if (U === "font") return "";
    if (typeof z == "string")
      return z === "use-credentials" ? z : "";
  }
  return Kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Kt.createPortal = function(U, z) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!z || z.nodeType !== 1 && z.nodeType !== 9 && z.nodeType !== 11)
      throw Error(M(299));
    return Z(U, z, null, w);
  }, Kt.flushSync = function(U) {
    var z = K.T, w = r.p;
    try {
      if (K.T = null, r.p = 2, U) return U();
    } finally {
      K.T = z, r.p = w, r.d.f();
    }
  }, Kt.preconnect = function(U, z) {
    typeof U == "string" && (z ? (z = z.crossOrigin, z = typeof z == "string" ? z === "use-credentials" ? z : "" : void 0) : z = null, r.d.C(U, z));
  }, Kt.prefetchDNS = function(U) {
    typeof U == "string" && r.d.D(U);
  }, Kt.preinit = function(U, z) {
    if (typeof U == "string" && z && typeof z.as == "string") {
      var w = z.as, C = P(w, z.crossOrigin), I = typeof z.integrity == "string" ? z.integrity : void 0, H = typeof z.fetchPriority == "string" ? z.fetchPriority : void 0;
      w === "style" ? r.d.S(
        U,
        typeof z.precedence == "string" ? z.precedence : void 0,
        {
          crossOrigin: C,
          integrity: I,
          fetchPriority: H
        }
      ) : w === "script" && r.d.X(U, {
        crossOrigin: C,
        integrity: I,
        fetchPriority: H,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0
      });
    }
  }, Kt.preinitModule = function(U, z) {
    if (typeof U == "string")
      if (typeof z == "object" && z !== null) {
        if (z.as == null || z.as === "script") {
          var w = P(
            z.as,
            z.crossOrigin
          );
          r.d.M(U, {
            crossOrigin: w,
            integrity: typeof z.integrity == "string" ? z.integrity : void 0,
            nonce: typeof z.nonce == "string" ? z.nonce : void 0
          });
        }
      } else z == null && r.d.M(U);
  }, Kt.preload = function(U, z) {
    if (typeof U == "string" && typeof z == "object" && z !== null && typeof z.as == "string") {
      var w = z.as, C = P(w, z.crossOrigin);
      r.d.L(U, w, {
        crossOrigin: C,
        integrity: typeof z.integrity == "string" ? z.integrity : void 0,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0,
        type: typeof z.type == "string" ? z.type : void 0,
        fetchPriority: typeof z.fetchPriority == "string" ? z.fetchPriority : void 0,
        referrerPolicy: typeof z.referrerPolicy == "string" ? z.referrerPolicy : void 0,
        imageSrcSet: typeof z.imageSrcSet == "string" ? z.imageSrcSet : void 0,
        imageSizes: typeof z.imageSizes == "string" ? z.imageSizes : void 0,
        media: typeof z.media == "string" ? z.media : void 0
      });
    }
  }, Kt.preloadModule = function(U, z) {
    if (typeof U == "string")
      if (z) {
        var w = P(z.as, z.crossOrigin);
        r.d.m(U, {
          as: typeof z.as == "string" && z.as !== "script" ? z.as : void 0,
          crossOrigin: w,
          integrity: typeof z.integrity == "string" ? z.integrity : void 0
        });
      } else r.d.m(U);
  }, Kt.requestFormReset = function(U) {
    r.d.r(U);
  }, Kt.unstable_batchedUpdates = function(U, z) {
    return U(z);
  }, Kt.useFormState = function(U, z, w) {
    return K.H.useFormState(U, z, w);
  }, Kt.useFormStatus = function() {
    return K.H.useHostTransitionStatus();
  }, Kt.version = "19.2.0", Kt;
}
var _1;
function gm() {
  if (_1) return mf.exports;
  _1 = 1;
  function v() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v);
      } catch (M) {
        console.error(M);
      }
  }
  return v(), mf.exports = vm(), mf.exports;
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
function pm() {
  if (M1) return xn;
  M1 = 1;
  var v = hm(), M = vf(), T = gm();
  function r(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function X(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function Z(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function K(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function P(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function U(t) {
    if (Z(t) !== t)
      throw Error(r(188));
  }
  function z(t) {
    var l = t.alternate;
    if (!l) {
      if (l = Z(t), l === null) throw Error(r(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return U(n), t;
          if (u === a) return U(n), l;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var i = !1, c = n.child; c; ) {
          if (c === e) {
            i = !0, e = n, a = u;
            break;
          }
          if (c === a) {
            i = !0, a = n, e = u;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = u.child; c; ) {
            if (c === e) {
              i = !0, e = u, a = n;
              break;
            }
            if (c === a) {
              i = !0, a = u, e = n;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (e.alternate !== a) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? t : l;
  }
  function w(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = w(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var C = Object.assign, I = Symbol.for("react.element"), H = Symbol.for("react.transitional.element"), q = Symbol.for("react.portal"), J = Symbol.for("react.fragment"), rt = Symbol.for("react.strict_mode"), dt = Symbol.for("react.profiler"), Tt = Symbol.for("react.consumer"), L = Symbol.for("react.context"), At = Symbol.for("react.forward_ref"), Ct = Symbol.for("react.suspense"), _t = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), Mt = Symbol.for("react.lazy"), $t = Symbol.for("react.activity"), _l = Symbol.for("react.memo_cache_sentinel"), Y = Symbol.iterator;
  function it(t) {
    return t === null || typeof t != "object" ? null : (t = Y && t[Y] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Ft = Symbol.for("react.client.reference");
  function Jt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Ft ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case J:
        return "Fragment";
      case dt:
        return "Profiler";
      case rt:
        return "StrictMode";
      case Ct:
        return "Suspense";
      case _t:
        return "SuspenseList";
      case $t:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case q:
          return "Portal";
        case L:
          return t.displayName || "Context";
        case Tt:
          return (t._context.displayName || "Context") + ".Consumer";
        case At:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case F:
          return l = t.displayName || null, l !== null ? l : Jt(t.type) || "Memo";
        case Mt:
          l = t._payload, t = t._init;
          try {
            return Jt(t(l));
          } catch {
          }
      }
    return null;
  }
  var Ml = Array.isArray, b = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = T.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, yt = [], bt = -1;
  function o(t) {
    return { current: t };
  }
  function x(t) {
    0 > bt || (t.current = yt[bt], yt[bt] = null, bt--);
  }
  function D(t, l) {
    bt++, yt[bt] = t.current, t.current = l;
  }
  var j = o(null), W = o(null), tt = o(null), ot = o(null);
  function Wt(t, l) {
    switch (D(tt, l), D(W, t), D(j, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Q0(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Q0(l), t = L0(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    x(j), D(j, t);
  }
  function Ut() {
    x(j), x(W), x(tt);
  }
  function Oa(t) {
    t.memoizedState !== null && D(ot, t);
    var l = j.current, e = L0(l, t.type);
    l !== e && (D(W, t), D(j, e));
  }
  function Tn(t) {
    W.current === t && (x(j), x(W)), ot.current === t && (x(ot), pn._currentValue = Q);
  }
  var Lu, gf;
  function Ae(t) {
    if (Lu === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Lu = l && l[1] || "", gf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Lu + t + gf;
  }
  var wu = !1;
  function Vu(t, l) {
    if (!t || wu) return "";
    wu = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
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
                } catch (g) {
                  var y = g;
                }
                Reflect.construct(t, [], E);
              } else {
                try {
                  E.call();
                } catch (g) {
                  y = g;
                }
                t.call(E.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                y = g;
              }
              (E = t()) && typeof E.catch == "function" && E.catch(function() {
              });
            }
          } catch (g) {
            if (g && y && typeof g.stack == "string")
              return [g.stack, y.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], c = u[1];
      if (i && c) {
        var f = i.split(`
`), h = c.split(`
`);
        for (n = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < h.length && !h[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === f.length || n === h.length)
          for (a = f.length - 1, n = h.length - 1; 1 <= a && 0 <= n && f[a] !== h[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (f[a] !== h[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || f[a] !== h[n]) {
                  var p = `
` + f[a].replace(" at new ", " at ");
                  return t.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", t.displayName)), p;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      wu = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Ae(e) : "";
  }
  function Z1(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(t.type);
      case 16:
        return Ae("Lazy");
      case 13:
        return t.child !== l && l !== null ? Ae("Suspense Fallback") : Ae("Suspense");
      case 19:
        return Ae("SuspenseList");
      case 0:
      case 15:
        return Vu(t.type, !1);
      case 11:
        return Vu(t.type.render, !1);
      case 1:
        return Vu(t.type, !0);
      case 31:
        return Ae("Activity");
      default:
        return "";
    }
  }
  function pf(t) {
    try {
      var l = "", e = null;
      do
        l += Z1(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ku = Object.prototype.hasOwnProperty, Ju = v.unstable_scheduleCallback, Wu = v.unstable_cancelCallback, X1 = v.unstable_shouldYield, Q1 = v.unstable_requestPaint, ul = v.unstable_now, L1 = v.unstable_getCurrentPriorityLevel, bf = v.unstable_ImmediatePriority, Sf = v.unstable_UserBlockingPriority, An = v.unstable_NormalPriority, w1 = v.unstable_LowPriority, Ef = v.unstable_IdlePriority, V1 = v.log, K1 = v.unstable_setDisableYieldValue, Da = null, il = null;
  function te(t) {
    if (typeof V1 == "function" && K1(t), il && typeof il.setStrictMode == "function")
      try {
        il.setStrictMode(Da, t);
      } catch {
      }
  }
  var cl = Math.clz32 ? Math.clz32 : k1, J1 = Math.log, W1 = Math.LN2;
  function k1(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (J1(t) / W1 | 0) | 0;
  }
  var _n = 256, Mn = 262144, On = 4194304;
  function _e(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Dn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~u, a !== 0 ? n = _e(a) : (i &= c, i !== 0 ? n = _e(i) : e || (e = c & ~t, e !== 0 && (n = _e(e))))) : (c = a & ~u, c !== 0 ? n = _e(c) : i !== 0 ? n = _e(i) : e || (e = a & ~t, e !== 0 && (n = _e(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function Ca(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function $1(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
    var t = On;
    return On <<= 1, (On & 62914560) === 0 && (On = 4194304), t;
  }
  function ku(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Ua(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function F1(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, f = t.expirationTimes, h = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var p = 31 - cl(e), E = 1 << p;
      c[p] = 0, f[p] = -1;
      var y = h[p];
      if (y !== null)
        for (h[p] = null, p = 0; p < y.length; p++) {
          var g = y[p];
          g !== null && (g.lane &= -536870913);
        }
      e &= ~E;
    }
    a !== 0 && xf(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function xf(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - cl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Tf(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - cl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Af(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : $u(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function $u(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Fu(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function _f() {
    var t = O.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : d1(t.type));
  }
  function Mf(t, l) {
    var e = O.p;
    try {
      return O.p = t, l();
    } finally {
      O.p = e;
    }
  }
  var le = Math.random().toString(36).slice(2), Xt = "__reactFiber$" + le, It = "__reactProps$" + le, we = "__reactContainer$" + le, Iu = "__reactEvents$" + le, I1 = "__reactListeners$" + le, P1 = "__reactHandles$" + le, Of = "__reactResources$" + le, Na = "__reactMarker$" + le;
  function Pu(t) {
    delete t[Xt], delete t[It], delete t[Iu], delete t[I1], delete t[P1];
  }
  function Ve(t) {
    var l = t[Xt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[we] || e[Xt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = $0(t); t !== null; ) {
            if (e = t[Xt]) return e;
            t = $0(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ke(t) {
    if (t = t[Xt] || t[we]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Ha(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Je(t) {
    var l = t[Of];
    return l || (l = t[Of] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Gt(t) {
    t[Na] = !0;
  }
  var Df = /* @__PURE__ */ new Set(), Cf = {};
  function Me(t, l) {
    We(t, l), We(t + "Capture", l);
  }
  function We(t, l) {
    for (Cf[t] = l, t = 0; t < l.length; t++)
      Df.add(l[t]);
  }
  var tr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uf = {}, Nf = {};
  function lr(t) {
    return Ku.call(Nf, t) ? !0 : Ku.call(Uf, t) ? !1 : tr.test(t) ? Nf[t] = !0 : (Uf[t] = !0, !1);
  }
  function Cn(t, l, e) {
    if (lr(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function Un(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function ql(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function vl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Hf(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function er(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function ti(t) {
    if (!t._valueTracker) {
      var l = Hf(t) ? "checked" : "value";
      t._valueTracker = er(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function jf(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Hf(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Nn(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var ar = /[\n"\\]/g;
  function gl(t) {
    return t.replace(
      ar,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function li(t, l, e, a, n, u, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + vl(l)) : t.value !== "" + vl(l) && (t.value = "" + vl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? ei(t, i, vl(l)) : e != null ? ei(t, i, vl(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + vl(c) : t.removeAttribute("name");
  }
  function Rf(t, l, e, a, n, u, i, c) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        ti(t);
        return;
      }
      e = e != null ? "" + vl(e) : "", l = l != null ? "" + vl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), ti(t);
  }
  function ei(t, l, e) {
    l === "number" && Nn(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function ke(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + vl(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function qf(t, l, e) {
    if (l != null && (l = "" + vl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + vl(e) : "";
  }
  function Bf(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(r(92));
        if (Ml(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = vl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), ti(t);
  }
  function $e(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var nr = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Yf(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || nr.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Gf(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(r(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Yf(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Yf(t, u, l[u]);
  }
  function ai(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var ur = /* @__PURE__ */ new Map([
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
  ]), ir = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hn(t) {
    return ir.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Bl() {
  }
  var ni = null;
  function ui(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Fe = null, Ie = null;
  function Zf(t) {
    var l = Ke(t);
    if (l && (t = l.stateNode)) {
      var e = t[It] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (li(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + gl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[It] || null;
                if (!n) throw Error(r(90));
                li(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && jf(a);
          }
          break t;
        case "textarea":
          qf(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && ke(t, !!e.multiple, l, !1);
      }
    }
  }
  var ii = !1;
  function Xf(t, l, e) {
    if (ii) return t(l, e);
    ii = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (ii = !1, (Fe !== null || Ie !== null) && (Su(), Fe && (l = Fe, t = Ie, Ie = Fe = null, Zf(l), t)))
        for (l = 0; l < t.length; l++) Zf(t[l]);
    }
  }
  function ja(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[It] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
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
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        r(231, l, typeof e)
      );
    return e;
  }
  var Yl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ci = !1;
  if (Yl)
    try {
      var Ra = {};
      Object.defineProperty(Ra, "passive", {
        get: function() {
          ci = !0;
        }
      }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
    } catch {
      ci = !1;
    }
  var ee = null, fi = null, jn = null;
  function Qf() {
    if (jn) return jn;
    var t, l = fi, e = l.length, a, n = "value" in ee ? ee.value : ee.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return jn = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Rn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function qn() {
    return !0;
  }
  function Lf() {
    return !1;
  }
  function Pt(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(u) : u[c]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? qn : Lf, this.isPropagationStopped = Lf, this;
    }
    return C(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = qn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = qn);
      },
      persist: function() {
      },
      isPersistent: qn
    }), l;
  }
  var Oe = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bn = Pt(Oe), qa = C({}, Oe, { view: 0, detail: 0 }), cr = Pt(qa), si, oi, Ba, Yn = C({}, qa, {
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
    getModifierState: di,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ba && (Ba && t.type === "mousemove" ? (si = t.screenX - Ba.screenX, oi = t.screenY - Ba.screenY) : oi = si = 0, Ba = t), si);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : oi;
    }
  }), wf = Pt(Yn), fr = C({}, Yn, { dataTransfer: 0 }), sr = Pt(fr), or = C({}, qa, { relatedTarget: 0 }), ri = Pt(or), rr = C({}, Oe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), dr = Pt(rr), mr = C({}, Oe, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), hr = Pt(mr), yr = C({}, Oe, { data: 0 }), Vf = Pt(yr), vr = {
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
  }, gr = {
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
  }, pr = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function br(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = pr[t]) ? !!l[t] : !1;
  }
  function di() {
    return br;
  }
  var Sr = C({}, qa, {
    key: function(t) {
      if (t.key) {
        var l = vr[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Rn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? gr[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: di,
    charCode: function(t) {
      return t.type === "keypress" ? Rn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Rn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Er = Pt(Sr), zr = C({}, Yn, {
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
  }), Kf = Pt(zr), xr = C({}, qa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: di
  }), Tr = Pt(xr), Ar = C({}, Oe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _r = Pt(Ar), Mr = C({}, Yn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Or = Pt(Mr), Dr = C({}, Oe, {
    newState: 0,
    oldState: 0
  }), Cr = Pt(Dr), Ur = [9, 13, 27, 32], mi = Yl && "CompositionEvent" in window, Ya = null;
  Yl && "documentMode" in document && (Ya = document.documentMode);
  var Nr = Yl && "TextEvent" in window && !Ya, Jf = Yl && (!mi || Ya && 8 < Ya && 11 >= Ya), Wf = " ", kf = !1;
  function $f(t, l) {
    switch (t) {
      case "keyup":
        return Ur.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ff(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Pe = !1;
  function Hr(t, l) {
    switch (t) {
      case "compositionend":
        return Ff(l);
      case "keypress":
        return l.which !== 32 ? null : (kf = !0, Wf);
      case "textInput":
        return t = l.data, t === Wf && kf ? null : t;
      default:
        return null;
    }
  }
  function jr(t, l) {
    if (Pe)
      return t === "compositionend" || !mi && $f(t, l) ? (t = Qf(), jn = fi = ee = null, Pe = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Jf && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Rr = {
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
  function If(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Rr[t.type] : l === "textarea";
  }
  function Pf(t, l, e, a) {
    Fe ? Ie ? Ie.push(a) : Ie = [a] : Fe = a, l = Mu(l, "onChange"), 0 < l.length && (e = new Bn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Ga = null, Za = null;
  function qr(t) {
    q0(t, 0);
  }
  function Gn(t) {
    var l = Ha(t);
    if (jf(l)) return t;
  }
  function ts(t, l) {
    if (t === "change") return l;
  }
  var ls = !1;
  if (Yl) {
    var hi;
    if (Yl) {
      var yi = "oninput" in document;
      if (!yi) {
        var es = document.createElement("div");
        es.setAttribute("oninput", "return;"), yi = typeof es.oninput == "function";
      }
      hi = yi;
    } else hi = !1;
    ls = hi && (!document.documentMode || 9 < document.documentMode);
  }
  function as() {
    Ga && (Ga.detachEvent("onpropertychange", ns), Za = Ga = null);
  }
  function ns(t) {
    if (t.propertyName === "value" && Gn(Za)) {
      var l = [];
      Pf(
        l,
        Za,
        t,
        ui(t)
      ), Xf(qr, l);
    }
  }
  function Br(t, l, e) {
    t === "focusin" ? (as(), Ga = l, Za = e, Ga.attachEvent("onpropertychange", ns)) : t === "focusout" && as();
  }
  function Yr(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Gn(Za);
  }
  function Gr(t, l) {
    if (t === "click") return Gn(l);
  }
  function Zr(t, l) {
    if (t === "input" || t === "change")
      return Gn(l);
  }
  function Xr(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var fl = typeof Object.is == "function" ? Object.is : Xr;
  function Xa(t, l) {
    if (fl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Ku.call(l, n) || !fl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function us(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function is(t, l) {
    var e = us(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = us(e);
    }
  }
  function cs(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? cs(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function fs(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Nn(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Nn(t.document);
    }
    return l;
  }
  function vi(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Qr = Yl && "documentMode" in document && 11 >= document.documentMode, ta = null, gi = null, Qa = null, pi = !1;
  function ss(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    pi || ta == null || ta !== Nn(a) || (a = ta, "selectionStart" in a && vi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Qa && Xa(Qa, a) || (Qa = a, a = Mu(gi, "onSelect"), 0 < a.length && (l = new Bn(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ta)));
  }
  function De(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var la = {
    animationend: De("Animation", "AnimationEnd"),
    animationiteration: De("Animation", "AnimationIteration"),
    animationstart: De("Animation", "AnimationStart"),
    transitionrun: De("Transition", "TransitionRun"),
    transitionstart: De("Transition", "TransitionStart"),
    transitioncancel: De("Transition", "TransitionCancel"),
    transitionend: De("Transition", "TransitionEnd")
  }, bi = {}, os = {};
  Yl && (os = document.createElement("div").style, "AnimationEvent" in window || (delete la.animationend.animation, delete la.animationiteration.animation, delete la.animationstart.animation), "TransitionEvent" in window || delete la.transitionend.transition);
  function Ce(t) {
    if (bi[t]) return bi[t];
    if (!la[t]) return t;
    var l = la[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in os)
        return bi[t] = l[e];
    return t;
  }
  var rs = Ce("animationend"), ds = Ce("animationiteration"), ms = Ce("animationstart"), Lr = Ce("transitionrun"), wr = Ce("transitionstart"), Vr = Ce("transitioncancel"), hs = Ce("transitionend"), ys = /* @__PURE__ */ new Map(), Si = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Si.push("scrollEnd");
  function Ol(t, l) {
    ys.set(t, l), Me(l, [t]);
  }
  var Zn = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, pl = [], ea = 0, Ei = 0;
  function Xn() {
    for (var t = ea, l = Ei = ea = 0; l < t; ) {
      var e = pl[l];
      pl[l++] = null;
      var a = pl[l];
      pl[l++] = null;
      var n = pl[l];
      pl[l++] = null;
      var u = pl[l];
      if (pl[l++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && vs(e, n, u);
    }
  }
  function Qn(t, l, e, a) {
    pl[ea++] = t, pl[ea++] = l, pl[ea++] = e, pl[ea++] = a, Ei |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function zi(t, l, e, a) {
    return Qn(t, l, e, a), Ln(t);
  }
  function Ue(t, l) {
    return Qn(t, null, null, l), Ln(t);
  }
  function vs(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - cl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function Ln(t) {
    if (50 < rn)
      throw rn = 0, Uc = null, Error(r(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var aa = {};
  function Kr(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function sl(t, l, e, a) {
    return new Kr(t, l, e, a);
  }
  function xi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Gl(t, l) {
    var e = t.alternate;
    return e === null ? (e = sl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function gs(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function wn(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") xi(t) && (i = 1);
    else if (typeof t == "string")
      i = Fd(
        t,
        e,
        j.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case $t:
          return t = sl(31, e, l, n), t.elementType = $t, t.lanes = u, t;
        case J:
          return Ne(e.children, n, u, l);
        case rt:
          i = 8, n |= 24;
          break;
        case dt:
          return t = sl(12, e, l, n | 2), t.elementType = dt, t.lanes = u, t;
        case Ct:
          return t = sl(13, e, l, n), t.elementType = Ct, t.lanes = u, t;
        case _t:
          return t = sl(19, e, l, n), t.elementType = _t, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case L:
                i = 10;
                break t;
              case Tt:
                i = 9;
                break t;
              case At:
                i = 11;
                break t;
              case F:
                i = 14;
                break t;
              case Mt:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = sl(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function Ne(t, l, e, a) {
    return t = sl(7, t, a, l), t.lanes = e, t;
  }
  function Ti(t, l, e) {
    return t = sl(6, t, null, l), t.lanes = e, t;
  }
  function ps(t) {
    var l = sl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Ai(t, l, e) {
    return l = sl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var bs = /* @__PURE__ */ new WeakMap();
  function bl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = bs.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: pf(l)
      }, bs.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: pf(l)
    };
  }
  var na = [], ua = 0, Vn = null, La = 0, Sl = [], El = 0, ae = null, Ul = 1, Nl = "";
  function Zl(t, l) {
    na[ua++] = La, na[ua++] = Vn, Vn = t, La = l;
  }
  function Ss(t, l, e) {
    Sl[El++] = Ul, Sl[El++] = Nl, Sl[El++] = ae, ae = t;
    var a = Ul;
    t = Nl;
    var n = 32 - cl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - cl(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Ul = 1 << 32 - cl(l) + n | e << n | a, Nl = u + t;
    } else
      Ul = 1 << u | e << n | a, Nl = t;
  }
  function _i(t) {
    t.return !== null && (Zl(t, 1), Ss(t, 1, 0));
  }
  function Mi(t) {
    for (; t === Vn; )
      Vn = na[--ua], na[ua] = null, La = na[--ua], na[ua] = null;
    for (; t === ae; )
      ae = Sl[--El], Sl[El] = null, Nl = Sl[--El], Sl[El] = null, Ul = Sl[--El], Sl[El] = null;
  }
  function Es(t, l) {
    Sl[El++] = Ul, Sl[El++] = Nl, Sl[El++] = ae, Ul = l.id, Nl = l.overflow, ae = t;
  }
  var Qt = null, Et = null, ut = !1, ne = null, zl = !1, Oi = Error(r(519));
  function ue(t) {
    var l = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw wa(bl(l, t)), Oi;
  }
  function zs(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Xt] = t, l[It] = a, e) {
      case "dialog":
        et("cancel", l), et("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        et("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < mn.length; e++)
          et(mn[e], l);
        break;
      case "source":
        et("error", l);
        break;
      case "img":
      case "image":
      case "link":
        et("error", l), et("load", l);
        break;
      case "details":
        et("toggle", l);
        break;
      case "input":
        et("invalid", l), Rf(
          l,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        et("invalid", l);
        break;
      case "textarea":
        et("invalid", l), Bf(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Z0(l.textContent, e) ? (a.popover != null && (et("beforetoggle", l), et("toggle", l)), a.onScroll != null && et("scroll", l), a.onScrollEnd != null && et("scrollend", l), a.onClick != null && (l.onclick = Bl), l = !0) : l = !1, l || ue(t, !0);
  }
  function xs(t) {
    for (Qt = t.return; Qt; )
      switch (Qt.tag) {
        case 5:
        case 31:
        case 13:
          zl = !1;
          return;
        case 27:
        case 3:
          zl = !0;
          return;
        default:
          Qt = Qt.return;
      }
  }
  function ia(t) {
    if (t !== Qt) return !1;
    if (!ut) return xs(t), ut = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Kc(t.type, t.memoizedProps)), e = !e), e && Et && ue(t), xs(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Et = k0(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Et = k0(t);
    } else
      l === 27 ? (l = Et, be(t.type) ? (t = Fc, Fc = null, Et = t) : Et = l) : Et = Qt ? Tl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function He() {
    Et = Qt = null, ut = !1;
  }
  function Di() {
    var t = ne;
    return t !== null && (al === null ? al = t : al.push.apply(
      al,
      t
    ), ne = null), t;
  }
  function wa(t) {
    ne === null ? ne = [t] : ne.push(t);
  }
  var Ci = o(null), je = null, Xl = null;
  function ie(t, l, e) {
    D(Ci, l._currentValue), l._currentValue = e;
  }
  function Ql(t) {
    t._currentValue = Ci.current, x(Ci);
  }
  function Ui(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Ni(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var c = u;
          u = n;
          for (var f = 0; f < l.length; f++)
            if (c.context === l[f]) {
              u.lanes |= e, c = u.alternate, c !== null && (c.lanes |= e), Ui(
                u.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          u = c.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(r(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), Ui(i, e, t), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function ca(t, l, e, a) {
    t = null;
    for (var n = l, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(r(387));
        if (i = i.memoizedProps, i !== null) {
          var c = n.type;
          fl(n.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (n === ot.current) {
        if (i = n.alternate, i === null) throw Error(r(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(pn) : t = [pn]);
      }
      n = n.return;
    }
    t !== null && Ni(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Kn(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!fl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Re(t) {
    je = t, Xl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Lt(t) {
    return Ts(je, t);
  }
  function Jn(t, l) {
    return je === null && Re(t), Ts(t, l);
  }
  function Ts(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Xl === null) {
      if (t === null) throw Error(r(308));
      Xl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Xl = Xl.next = l;
    return e;
  }
  var Jr = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, Wr = v.unstable_scheduleCallback, kr = v.unstable_NormalPriority, jt = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Hi() {
    return {
      controller: new Jr(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Va(t) {
    t.refCount--, t.refCount === 0 && Wr(kr, function() {
      t.controller.abort();
    });
  }
  var Ka = null, ji = 0, fa = 0, sa = null;
  function $r(t, l) {
    if (Ka === null) {
      var e = Ka = [];
      ji = 0, fa = Bc(), sa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return ji++, l.then(As, As), l;
  }
  function As() {
    if (--ji === 0 && Ka !== null) {
      sa !== null && (sa.status = "fulfilled");
      var t = Ka;
      Ka = null, fa = 0, sa = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Fr(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var n = 0; n < e.length; n++) (0, e[n])(l);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var _s = b.S;
  b.S = function(t, l) {
    o0 = ul(), typeof l == "object" && l !== null && typeof l.then == "function" && $r(t, l), _s !== null && _s(t, l);
  };
  var qe = o(null);
  function Ri() {
    var t = qe.current;
    return t !== null ? t : St.pooledCache;
  }
  function Wn(t, l) {
    l === null ? D(qe, qe.current) : D(qe, l.pool);
  }
  function Ms() {
    var t = Ri();
    return t === null ? null : { parent: jt._currentValue, pool: t };
  }
  var oa = Error(r(460)), qi = Error(r(474)), kn = Error(r(542)), $n = { then: function() {
  } };
  function Os(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ds(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Bl, Bl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Us(t), t;
      default:
        if (typeof l.status == "string") l.then(Bl, Bl);
        else {
          if (t = St, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, Us(t), t;
        }
        throw Ye = l, oa;
    }
  }
  function Be(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ye = e, oa) : e;
    }
  }
  var Ye = null;
  function Cs() {
    if (Ye === null) throw Error(r(459));
    var t = Ye;
    return Ye = null, t;
  }
  function Us(t) {
    if (t === oa || t === kn)
      throw Error(r(483));
  }
  var ra = null, Ja = 0;
  function Fn(t) {
    var l = Ja;
    return Ja += 1, ra === null && (ra = []), Ds(ra, t, l);
  }
  function Wa(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function In(t, l) {
    throw l.$$typeof === I ? Error(r(525)) : (t = Object.prototype.toString.call(l), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Ns(t) {
    function l(d, s) {
      if (t) {
        var m = d.deletions;
        m === null ? (d.deletions = [s], d.flags |= 16) : m.push(s);
      }
    }
    function e(d, s) {
      if (!t) return null;
      for (; s !== null; )
        l(d, s), s = s.sibling;
      return null;
    }
    function a(d) {
      for (var s = /* @__PURE__ */ new Map(); d !== null; )
        d.key !== null ? s.set(d.key, d) : s.set(d.index, d), d = d.sibling;
      return s;
    }
    function n(d, s) {
      return d = Gl(d, s), d.index = 0, d.sibling = null, d;
    }
    function u(d, s, m) {
      return d.index = m, t ? (m = d.alternate, m !== null ? (m = m.index, m < s ? (d.flags |= 67108866, s) : m) : (d.flags |= 67108866, s)) : (d.flags |= 1048576, s);
    }
    function i(d) {
      return t && d.alternate === null && (d.flags |= 67108866), d;
    }
    function c(d, s, m, S) {
      return s === null || s.tag !== 6 ? (s = Ti(m, d.mode, S), s.return = d, s) : (s = n(s, m), s.return = d, s);
    }
    function f(d, s, m, S) {
      var B = m.type;
      return B === J ? p(
        d,
        s,
        m.props.children,
        S,
        m.key
      ) : s !== null && (s.elementType === B || typeof B == "object" && B !== null && B.$$typeof === Mt && Be(B) === s.type) ? (s = n(s, m.props), Wa(s, m), s.return = d, s) : (s = wn(
        m.type,
        m.key,
        m.props,
        null,
        d.mode,
        S
      ), Wa(s, m), s.return = d, s);
    }
    function h(d, s, m, S) {
      return s === null || s.tag !== 4 || s.stateNode.containerInfo !== m.containerInfo || s.stateNode.implementation !== m.implementation ? (s = Ai(m, d.mode, S), s.return = d, s) : (s = n(s, m.children || []), s.return = d, s);
    }
    function p(d, s, m, S, B) {
      return s === null || s.tag !== 7 ? (s = Ne(
        m,
        d.mode,
        S,
        B
      ), s.return = d, s) : (s = n(s, m), s.return = d, s);
    }
    function E(d, s, m) {
      if (typeof s == "string" && s !== "" || typeof s == "number" || typeof s == "bigint")
        return s = Ti(
          "" + s,
          d.mode,
          m
        ), s.return = d, s;
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case H:
            return m = wn(
              s.type,
              s.key,
              s.props,
              null,
              d.mode,
              m
            ), Wa(m, s), m.return = d, m;
          case q:
            return s = Ai(
              s,
              d.mode,
              m
            ), s.return = d, s;
          case Mt:
            return s = Be(s), E(d, s, m);
        }
        if (Ml(s) || it(s))
          return s = Ne(
            s,
            d.mode,
            m,
            null
          ), s.return = d, s;
        if (typeof s.then == "function")
          return E(d, Fn(s), m);
        if (s.$$typeof === L)
          return E(
            d,
            Jn(d, s),
            m
          );
        In(d, s);
      }
      return null;
    }
    function y(d, s, m, S) {
      var B = s !== null ? s.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return B !== null ? null : c(d, s, "" + m, S);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case H:
            return m.key === B ? f(d, s, m, S) : null;
          case q:
            return m.key === B ? h(d, s, m, S) : null;
          case Mt:
            return m = Be(m), y(d, s, m, S);
        }
        if (Ml(m) || it(m))
          return B !== null ? null : p(d, s, m, S, null);
        if (typeof m.then == "function")
          return y(
            d,
            s,
            Fn(m),
            S
          );
        if (m.$$typeof === L)
          return y(
            d,
            s,
            Jn(d, m),
            S
          );
        In(d, m);
      }
      return null;
    }
    function g(d, s, m, S, B) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return d = d.get(m) || null, c(s, d, "" + S, B);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case H:
            return d = d.get(
              S.key === null ? m : S.key
            ) || null, f(s, d, S, B);
          case q:
            return d = d.get(
              S.key === null ? m : S.key
            ) || null, h(s, d, S, B);
          case Mt:
            return S = Be(S), g(
              d,
              s,
              m,
              S,
              B
            );
        }
        if (Ml(S) || it(S))
          return d = d.get(m) || null, p(s, d, S, B, null);
        if (typeof S.then == "function")
          return g(
            d,
            s,
            m,
            Fn(S),
            B
          );
        if (S.$$typeof === L)
          return g(
            d,
            s,
            m,
            Jn(s, S),
            B
          );
        In(s, S);
      }
      return null;
    }
    function N(d, s, m, S) {
      for (var B = null, ct = null, R = s, $ = s = 0, nt = null; R !== null && $ < m.length; $++) {
        R.index > $ ? (nt = R, R = null) : nt = R.sibling;
        var ft = y(
          d,
          R,
          m[$],
          S
        );
        if (ft === null) {
          R === null && (R = nt);
          break;
        }
        t && R && ft.alternate === null && l(d, R), s = u(ft, s, $), ct === null ? B = ft : ct.sibling = ft, ct = ft, R = nt;
      }
      if ($ === m.length)
        return e(d, R), ut && Zl(d, $), B;
      if (R === null) {
        for (; $ < m.length; $++)
          R = E(d, m[$], S), R !== null && (s = u(
            R,
            s,
            $
          ), ct === null ? B = R : ct.sibling = R, ct = R);
        return ut && Zl(d, $), B;
      }
      for (R = a(R); $ < m.length; $++)
        nt = g(
          R,
          d,
          $,
          m[$],
          S
        ), nt !== null && (t && nt.alternate !== null && R.delete(
          nt.key === null ? $ : nt.key
        ), s = u(
          nt,
          s,
          $
        ), ct === null ? B = nt : ct.sibling = nt, ct = nt);
      return t && R.forEach(function(Te) {
        return l(d, Te);
      }), ut && Zl(d, $), B;
    }
    function G(d, s, m, S) {
      if (m == null) throw Error(r(151));
      for (var B = null, ct = null, R = s, $ = s = 0, nt = null, ft = m.next(); R !== null && !ft.done; $++, ft = m.next()) {
        R.index > $ ? (nt = R, R = null) : nt = R.sibling;
        var Te = y(d, R, ft.value, S);
        if (Te === null) {
          R === null && (R = nt);
          break;
        }
        t && R && Te.alternate === null && l(d, R), s = u(Te, s, $), ct === null ? B = Te : ct.sibling = Te, ct = Te, R = nt;
      }
      if (ft.done)
        return e(d, R), ut && Zl(d, $), B;
      if (R === null) {
        for (; !ft.done; $++, ft = m.next())
          ft = E(d, ft.value, S), ft !== null && (s = u(ft, s, $), ct === null ? B = ft : ct.sibling = ft, ct = ft);
        return ut && Zl(d, $), B;
      }
      for (R = a(R); !ft.done; $++, ft = m.next())
        ft = g(R, d, $, ft.value, S), ft !== null && (t && ft.alternate !== null && R.delete(ft.key === null ? $ : ft.key), s = u(ft, s, $), ct === null ? B = ft : ct.sibling = ft, ct = ft);
      return t && R.forEach(function(fm) {
        return l(d, fm);
      }), ut && Zl(d, $), B;
    }
    function pt(d, s, m, S) {
      if (typeof m == "object" && m !== null && m.type === J && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case H:
            t: {
              for (var B = m.key; s !== null; ) {
                if (s.key === B) {
                  if (B = m.type, B === J) {
                    if (s.tag === 7) {
                      e(
                        d,
                        s.sibling
                      ), S = n(
                        s,
                        m.props.children
                      ), S.return = d, d = S;
                      break t;
                    }
                  } else if (s.elementType === B || typeof B == "object" && B !== null && B.$$typeof === Mt && Be(B) === s.type) {
                    e(
                      d,
                      s.sibling
                    ), S = n(s, m.props), Wa(S, m), S.return = d, d = S;
                    break t;
                  }
                  e(d, s);
                  break;
                } else l(d, s);
                s = s.sibling;
              }
              m.type === J ? (S = Ne(
                m.props.children,
                d.mode,
                S,
                m.key
              ), S.return = d, d = S) : (S = wn(
                m.type,
                m.key,
                m.props,
                null,
                d.mode,
                S
              ), Wa(S, m), S.return = d, d = S);
            }
            return i(d);
          case q:
            t: {
              for (B = m.key; s !== null; ) {
                if (s.key === B)
                  if (s.tag === 4 && s.stateNode.containerInfo === m.containerInfo && s.stateNode.implementation === m.implementation) {
                    e(
                      d,
                      s.sibling
                    ), S = n(s, m.children || []), S.return = d, d = S;
                    break t;
                  } else {
                    e(d, s);
                    break;
                  }
                else l(d, s);
                s = s.sibling;
              }
              S = Ai(m, d.mode, S), S.return = d, d = S;
            }
            return i(d);
          case Mt:
            return m = Be(m), pt(
              d,
              s,
              m,
              S
            );
        }
        if (Ml(m))
          return N(
            d,
            s,
            m,
            S
          );
        if (it(m)) {
          if (B = it(m), typeof B != "function") throw Error(r(150));
          return m = B.call(m), G(
            d,
            s,
            m,
            S
          );
        }
        if (typeof m.then == "function")
          return pt(
            d,
            s,
            Fn(m),
            S
          );
        if (m.$$typeof === L)
          return pt(
            d,
            s,
            Jn(d, m),
            S
          );
        In(d, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, s !== null && s.tag === 6 ? (e(d, s.sibling), S = n(s, m), S.return = d, d = S) : (e(d, s), S = Ti(m, d.mode, S), S.return = d, d = S), i(d)) : e(d, s);
    }
    return function(d, s, m, S) {
      try {
        Ja = 0;
        var B = pt(
          d,
          s,
          m,
          S
        );
        return ra = null, B;
      } catch (R) {
        if (R === oa || R === kn) throw R;
        var ct = sl(29, R, null, d.mode);
        return ct.lanes = S, ct.return = d, ct;
      } finally {
      }
    };
  }
  var Ge = Ns(!0), Hs = Ns(!1), ce = !1;
  function Bi(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Yi(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function fe(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function se(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (st & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = Ln(t), vs(t, null, e), l;
    }
    return Qn(t, a, l, e), Ln(t);
  }
  function ka(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Tf(t, e);
    }
  }
  function Gi(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = l : u = u.next = l;
      } else n = u = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var Zi = !1;
  function $a() {
    if (Zi) {
      var t = sa;
      if (t !== null) throw t;
    }
  }
  function Fa(t, l, e, a) {
    Zi = !1;
    var n = t.updateQueue;
    ce = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var f = c, h = f.next;
      f.next = null, i === null ? u = h : i.next = h, i = f;
      var p = t.alternate;
      p !== null && (p = p.updateQueue, c = p.lastBaseUpdate, c !== i && (c === null ? p.firstBaseUpdate = h : c.next = h, p.lastBaseUpdate = f));
    }
    if (u !== null) {
      var E = n.baseState;
      i = 0, p = h = f = null, c = u;
      do {
        var y = c.lane & -536870913, g = y !== c.lane;
        if (g ? (at & y) === y : (a & y) === y) {
          y !== 0 && y === fa && (Zi = !0), p !== null && (p = p.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var N = t, G = c;
            y = l;
            var pt = e;
            switch (G.tag) {
              case 1:
                if (N = G.payload, typeof N == "function") {
                  E = N.call(pt, E, y);
                  break t;
                }
                E = N;
                break t;
              case 3:
                N.flags = N.flags & -65537 | 128;
              case 0:
                if (N = G.payload, y = typeof N == "function" ? N.call(pt, E, y) : N, y == null) break t;
                E = C({}, E, y);
                break t;
              case 2:
                ce = !0;
            }
          }
          y = c.callback, y !== null && (t.flags |= 64, g && (t.flags |= 8192), g = n.callbacks, g === null ? n.callbacks = [y] : g.push(y));
        } else
          g = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, p === null ? (h = p = g, f = E) : p = p.next = g, i |= y;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null)
            break;
          g = c, c = g.next, g.next = null, n.lastBaseUpdate = g, n.shared.pending = null;
        }
      } while (!0);
      p === null && (f = E), n.baseState = f, n.firstBaseUpdate = h, n.lastBaseUpdate = p, u === null && (n.shared.lanes = 0), he |= i, t.lanes = i, t.memoizedState = E;
    }
  }
  function js(t, l) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(l);
  }
  function Rs(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        js(e[t], l);
  }
  var da = o(null), Pn = o(0);
  function qs(t, l) {
    t = Fl, D(Pn, t), D(da, l), Fl = t | l.baseLanes;
  }
  function Xi() {
    D(Pn, Fl), D(da, da.current);
  }
  function Qi() {
    Fl = Pn.current, x(da), x(Pn);
  }
  var ol = o(null), xl = null;
  function oe(t) {
    var l = t.alternate;
    D(Nt, Nt.current & 1), D(ol, t), xl === null && (l === null || da.current !== null || l.memoizedState !== null) && (xl = t);
  }
  function Li(t) {
    D(Nt, Nt.current), D(ol, t), xl === null && (xl = t);
  }
  function Bs(t) {
    t.tag === 22 ? (D(Nt, Nt.current), D(ol, t), xl === null && (xl = t)) : re();
  }
  function re() {
    D(Nt, Nt.current), D(ol, ol.current);
  }
  function rl(t) {
    x(ol), xl === t && (xl = null), x(Nt);
  }
  var Nt = o(0);
  function tu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || kc(e) || $c(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var Ll = 0, k = null, vt = null, Rt = null, lu = !1, ma = !1, Ze = !1, eu = 0, Ia = 0, ha = null, Ir = 0;
  function Ot() {
    throw Error(r(321));
  }
  function wi(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!fl(t[e], l[e])) return !1;
    return !0;
  }
  function Vi(t, l, e, a, n, u) {
    return Ll = u, k = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, b.H = t === null || t.memoizedState === null ? Eo : ic, Ze = !1, u = e(a, n), Ze = !1, ma && (u = Gs(
      l,
      e,
      a,
      n
    )), Ys(t), u;
  }
  function Ys(t) {
    b.H = ln;
    var l = vt !== null && vt.next !== null;
    if (Ll = 0, Rt = vt = k = null, lu = !1, Ia = 0, ha = null, l) throw Error(r(300));
    t === null || qt || (t = t.dependencies, t !== null && Kn(t) && (qt = !0));
  }
  function Gs(t, l, e, a) {
    k = t;
    var n = 0;
    do {
      if (ma && (ha = null), Ia = 0, ma = !1, 25 <= n) throw Error(r(301));
      if (n += 1, Rt = vt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      b.H = zo, u = l(e, a);
    } while (ma);
    return u;
  }
  function Pr() {
    var t = b.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Pa(l) : l, t = t.useState()[0], (vt !== null ? vt.memoizedState : null) !== t && (k.flags |= 1024), l;
  }
  function Ki() {
    var t = eu !== 0;
    return eu = 0, t;
  }
  function Ji(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Wi(t) {
    if (lu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      lu = !1;
    }
    Ll = 0, Rt = vt = k = null, ma = !1, Ia = eu = 0, ha = null;
  }
  function kt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Rt === null ? k.memoizedState = Rt = t : Rt = Rt.next = t, Rt;
  }
  function Ht() {
    if (vt === null) {
      var t = k.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = vt.next;
    var l = Rt === null ? k.memoizedState : Rt.next;
    if (l !== null)
      Rt = l, vt = t;
    else {
      if (t === null)
        throw k.alternate === null ? Error(r(467)) : Error(r(310));
      vt = t, t = {
        memoizedState: vt.memoizedState,
        baseState: vt.baseState,
        baseQueue: vt.baseQueue,
        queue: vt.queue,
        next: null
      }, Rt === null ? k.memoizedState = Rt = t : Rt = Rt.next = t;
    }
    return Rt;
  }
  function au() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pa(t) {
    var l = Ia;
    return Ia += 1, ha === null && (ha = []), t = Ds(ha, t, l), l = k, (Rt === null ? l.memoizedState : Rt.next) === null && (l = l.alternate, b.H = l === null || l.memoizedState === null ? Eo : ic), t;
  }
  function nu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Pa(t);
      if (t.$$typeof === L) return Lt(t);
    }
    throw Error(r(438, String(t)));
  }
  function ki(t) {
    var l = null, e = k.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = k.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = au(), k.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = _l;
    return l.index++, e;
  }
  function wl(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function uu(t) {
    var l = Ht();
    return $i(l, vt, t);
  }
  function $i(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      l.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      l = n.next;
      var c = i = null, f = null, h = l, p = !1;
      do {
        var E = h.lane & -536870913;
        if (E !== h.lane ? (at & E) === E : (Ll & E) === E) {
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
            }), E === fa && (p = !0);
          else if ((Ll & y) === y) {
            h = h.next, y === fa && (p = !0);
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
            }, f === null ? (c = f = E, i = u) : f = f.next = E, k.lanes |= y, he |= y;
          E = h.action, Ze && e(u, E), u = h.hasEagerState ? h.eagerState : e(u, E);
        } else
          y = {
            lane: E,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, f === null ? (c = f = y, i = u) : f = f.next = y, k.lanes |= E, he |= E;
        h = h.next;
      } while (h !== null && h !== l);
      if (f === null ? i = u : f.next = c, !fl(u, t.memoizedState) && (qt = !0, p && (e = sa, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = f, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Fi(t) {
    var l = Ht(), e = l.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      fl(u, l.memoizedState) || (qt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Zs(t, l, e) {
    var a = k, n = Ht(), u = ut;
    if (u) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = l();
    var i = !fl(
      (vt || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, qt = !0), n = n.queue, tc(Ls.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || Rt !== null && Rt.memoizedState.tag & 1) {
      if (a.flags |= 2048, ya(
        9,
        { destroy: void 0 },
        Qs.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), St === null) throw Error(r(349));
      u || (Ll & 127) !== 0 || Xs(a, l, e);
    }
    return e;
  }
  function Xs(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = k.updateQueue, l === null ? (l = au(), k.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Qs(t, l, e, a) {
    l.value = e, l.getSnapshot = a, ws(l) && Vs(t);
  }
  function Ls(t, l, e) {
    return e(function() {
      ws(l) && Vs(t);
    });
  }
  function ws(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !fl(t, e);
    } catch {
      return !0;
    }
  }
  function Vs(t) {
    var l = Ue(t, 2);
    l !== null && nl(l, t, 2);
  }
  function Ii(t) {
    var l = kt();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Ze) {
        te(!0);
        try {
          e();
        } finally {
          te(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wl,
      lastRenderedState: t
    }, l;
  }
  function Ks(t, l, e, a) {
    return t.baseState = e, $i(
      t,
      vt,
      typeof a == "function" ? a : wl
    );
  }
  function td(t, l, e, a, n) {
    if (fu(t)) throw Error(r(485));
    if (t = l.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      b.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Js(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Js(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = b.T, i = {};
      b.T = i;
      try {
        var c = e(n, a), f = b.S;
        f !== null && f(i, c), Ws(t, l, c);
      } catch (h) {
        Pi(t, l, h);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), b.T = u;
      }
    } else
      try {
        u = e(n, a), Ws(t, l, u);
      } catch (h) {
        Pi(t, l, h);
      }
  }
  function Ws(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        ks(t, l, a);
      },
      function(a) {
        return Pi(t, l, a);
      }
    ) : ks(t, l, e);
  }
  function ks(t, l, e) {
    l.status = "fulfilled", l.value = e, $s(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Js(t, e)));
  }
  function Pi(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, $s(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function $s(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Fs(t, l) {
    return l;
  }
  function Is(t, l) {
    if (ut) {
      var e = St.formState;
      if (e !== null) {
        t: {
          var a = k;
          if (ut) {
            if (Et) {
              l: {
                for (var n = Et, u = zl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = Tl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Et = Tl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            ue(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = kt(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Fs,
      lastRenderedState: l
    }, e.queue = a, e = po.bind(
      null,
      k,
      a
    ), a.dispatch = e, a = Ii(!1), u = uc.bind(
      null,
      k,
      !1,
      a.queue
    ), a = kt(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = td.bind(
      null,
      k,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Ps(t) {
    var l = Ht();
    return to(l, vt, t);
  }
  function to(t, l, e) {
    if (l = $i(
      t,
      l,
      Fs
    )[0], t = uu(wl)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Pa(l);
      } catch (i) {
        throw i === oa ? kn : i;
      }
    else a = l;
    l = Ht();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (k.flags |= 2048, ya(
      9,
      { destroy: void 0 },
      ld.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function ld(t, l) {
    t.action = l;
  }
  function lo(t) {
    var l = Ht(), e = vt;
    if (e !== null)
      return to(l, e, t);
    Ht(), l = l.memoizedState, e = Ht();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function ya(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = k.updateQueue, l === null && (l = au(), k.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function eo() {
    return Ht().memoizedState;
  }
  function iu(t, l, e, a) {
    var n = kt();
    k.flags |= t, n.memoizedState = ya(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function cu(t, l, e, a) {
    var n = Ht();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    vt !== null && a !== null && wi(a, vt.memoizedState.deps) ? n.memoizedState = ya(l, u, e, a) : (k.flags |= t, n.memoizedState = ya(
      1 | l,
      u,
      e,
      a
    ));
  }
  function ao(t, l) {
    iu(8390656, 8, t, l);
  }
  function tc(t, l) {
    cu(2048, 8, t, l);
  }
  function ed(t) {
    k.flags |= 4;
    var l = k.updateQueue;
    if (l === null)
      l = au(), k.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function no(t) {
    var l = Ht().memoizedState;
    return ed({ ref: l, nextImpl: t }), function() {
      if ((st & 2) !== 0) throw Error(r(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function uo(t, l) {
    return cu(4, 2, t, l);
  }
  function io(t, l) {
    return cu(4, 4, t, l);
  }
  function co(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function fo(t, l, e) {
    e = e != null ? e.concat([t]) : null, cu(4, 4, co.bind(null, l, t), e);
  }
  function lc() {
  }
  function so(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && wi(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function oo(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && wi(l, a[1]))
      return a[0];
    if (a = t(), Ze) {
      te(!0);
      try {
        t();
      } finally {
        te(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function ec(t, l, e) {
    return e === void 0 || (Ll & 1073741824) !== 0 && (at & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = d0(), k.lanes |= t, he |= t, e);
  }
  function ro(t, l, e, a) {
    return fl(e, l) ? e : da.current !== null ? (t = ec(t, e, a), fl(t, l) || (qt = !0), t) : (Ll & 42) === 0 || (Ll & 1073741824) !== 0 && (at & 261930) === 0 ? (qt = !0, t.memoizedState = e) : (t = d0(), k.lanes |= t, he |= t, l);
  }
  function mo(t, l, e, a, n) {
    var u = O.p;
    O.p = u !== 0 && 8 > u ? u : 8;
    var i = b.T, c = {};
    b.T = c, uc(t, !1, l, e);
    try {
      var f = n(), h = b.S;
      if (h !== null && h(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var p = Fr(
          f,
          a
        );
        tn(
          t,
          l,
          p,
          hl(t)
        );
      } else
        tn(
          t,
          l,
          a,
          hl(t)
        );
    } catch (E) {
      tn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: E },
        hl()
      );
    } finally {
      O.p = u, i !== null && c.types !== null && (i.types = c.types), b.T = i;
    }
  }
  function ad() {
  }
  function ac(t, l, e, a) {
    if (t.tag !== 5) throw Error(r(476));
    var n = ho(t).queue;
    mo(
      t,
      n,
      l,
      Q,
      e === null ? ad : function() {
        return yo(t), e(a);
      }
    );
  }
  function ho(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wl,
        lastRenderedState: Q
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: wl,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function yo(t) {
    var l = ho(t);
    l.next === null && (l = t.alternate.memoizedState), tn(
      t,
      l.next.queue,
      {},
      hl()
    );
  }
  function nc() {
    return Lt(pn);
  }
  function vo() {
    return Ht().memoizedState;
  }
  function go() {
    return Ht().memoizedState;
  }
  function nd(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = hl();
          t = fe(e);
          var a = se(l, t, e);
          a !== null && (nl(a, l, e), ka(a, l, e)), l = { cache: Hi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function ud(t, l, e) {
    var a = hl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fu(t) ? bo(l, e) : (e = zi(t, l, e, a), e !== null && (nl(e, t, a), So(e, l, a)));
  }
  function po(t, l, e) {
    var a = hl();
    tn(t, l, e, a);
  }
  function tn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (fu(t)) bo(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, c = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = c, fl(c, i))
            return Qn(t, l, n, 0), St === null && Xn(), !1;
        } catch {
        } finally {
        }
      if (e = zi(t, l, n, a), e !== null)
        return nl(e, t, a), So(e, l, a), !0;
    }
    return !1;
  }
  function uc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: Bc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fu(t)) {
      if (l) throw Error(r(479));
    } else
      l = zi(
        t,
        e,
        a,
        2
      ), l !== null && nl(l, t, 2);
  }
  function fu(t) {
    var l = t.alternate;
    return t === k || l !== null && l === k;
  }
  function bo(t, l) {
    ma = lu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function So(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Tf(t, e);
    }
  }
  var ln = {
    readContext: Lt,
    use: nu,
    useCallback: Ot,
    useContext: Ot,
    useEffect: Ot,
    useImperativeHandle: Ot,
    useLayoutEffect: Ot,
    useInsertionEffect: Ot,
    useMemo: Ot,
    useReducer: Ot,
    useRef: Ot,
    useState: Ot,
    useDebugValue: Ot,
    useDeferredValue: Ot,
    useTransition: Ot,
    useSyncExternalStore: Ot,
    useId: Ot,
    useHostTransitionStatus: Ot,
    useFormState: Ot,
    useActionState: Ot,
    useOptimistic: Ot,
    useMemoCache: Ot,
    useCacheRefresh: Ot
  };
  ln.useEffectEvent = Ot;
  var Eo = {
    readContext: Lt,
    use: nu,
    useCallback: function(t, l) {
      return kt().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: Lt,
    useEffect: ao,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, iu(
        4194308,
        4,
        co.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return iu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      iu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = kt();
      l = l === void 0 ? null : l;
      var a = t();
      if (Ze) {
        te(!0);
        try {
          t();
        } finally {
          te(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = kt();
      if (e !== void 0) {
        var n = e(l);
        if (Ze) {
          te(!0);
          try {
            e(l);
          } finally {
            te(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = ud.bind(
        null,
        k,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = kt();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Ii(t);
      var l = t.queue, e = po.bind(null, k, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: lc,
    useDeferredValue: function(t, l) {
      var e = kt();
      return ec(e, t, l);
    },
    useTransition: function() {
      var t = Ii(!1);
      return t = mo.bind(
        null,
        k,
        t.queue,
        !0,
        !1
      ), kt().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = k, n = kt();
      if (ut) {
        if (e === void 0)
          throw Error(r(407));
        e = e();
      } else {
        if (e = l(), St === null)
          throw Error(r(349));
        (at & 127) !== 0 || Xs(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, ao(Ls.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, ya(
        9,
        { destroy: void 0 },
        Qs.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = kt(), l = St.identifierPrefix;
      if (ut) {
        var e = Nl, a = Ul;
        e = (a & ~(1 << 32 - cl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = eu++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Ir++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: nc,
    useFormState: Is,
    useActionState: Is,
    useOptimistic: function(t) {
      var l = kt();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = uc.bind(
        null,
        k,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: ki,
    useCacheRefresh: function() {
      return kt().memoizedState = nd.bind(
        null,
        k
      );
    },
    useEffectEvent: function(t) {
      var l = kt(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((st & 2) !== 0)
          throw Error(r(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, ic = {
    readContext: Lt,
    use: nu,
    useCallback: so,
    useContext: Lt,
    useEffect: tc,
    useImperativeHandle: fo,
    useInsertionEffect: uo,
    useLayoutEffect: io,
    useMemo: oo,
    useReducer: uu,
    useRef: eo,
    useState: function() {
      return uu(wl);
    },
    useDebugValue: lc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return ro(
        e,
        vt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = uu(wl)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Pa(t),
        l
      ];
    },
    useSyncExternalStore: Zs,
    useId: vo,
    useHostTransitionStatus: nc,
    useFormState: Ps,
    useActionState: Ps,
    useOptimistic: function(t, l) {
      var e = Ht();
      return Ks(e, vt, t, l);
    },
    useMemoCache: ki,
    useCacheRefresh: go
  };
  ic.useEffectEvent = no;
  var zo = {
    readContext: Lt,
    use: nu,
    useCallback: so,
    useContext: Lt,
    useEffect: tc,
    useImperativeHandle: fo,
    useInsertionEffect: uo,
    useLayoutEffect: io,
    useMemo: oo,
    useReducer: Fi,
    useRef: eo,
    useState: function() {
      return Fi(wl);
    },
    useDebugValue: lc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return vt === null ? ec(e, t, l) : ro(
        e,
        vt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Fi(wl)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Pa(t),
        l
      ];
    },
    useSyncExternalStore: Zs,
    useId: vo,
    useHostTransitionStatus: nc,
    useFormState: lo,
    useActionState: lo,
    useOptimistic: function(t, l) {
      var e = Ht();
      return vt !== null ? Ks(e, vt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: ki,
    useCacheRefresh: go
  };
  zo.useEffectEvent = no;
  function cc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : C({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var fc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = hl(), n = fe(a);
      n.payload = l, e != null && (n.callback = e), l = se(t, n, a), l !== null && (nl(l, t, a), ka(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = hl(), n = fe(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = se(t, n, a), l !== null && (nl(l, t, a), ka(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = hl(), a = fe(e);
      a.tag = 2, l != null && (a.callback = l), l = se(t, a, e), l !== null && (nl(l, t, e), ka(l, t, e));
    }
  };
  function xo(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !Xa(e, a) || !Xa(n, u) : !0;
  }
  function To(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && fc.enqueueReplaceState(l, l.state, null);
  }
  function Xe(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = C({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function Ao(t) {
    Zn(t);
  }
  function _o(t) {
    console.error(t);
  }
  function Mo(t) {
    Zn(t);
  }
  function su(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Oo(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function sc(t, l, e) {
    return e = fe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      su(t, l);
    }, e;
  }
  function Do(t) {
    return t = fe(t), t.tag = 3, t;
  }
  function Co(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Oo(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Oo(l, e, a), typeof n != "function" && (ye === null ? ye = /* @__PURE__ */ new Set([this]) : ye.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function id(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && ca(
        l,
        e,
        n,
        !0
      ), e = ol.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return xl === null ? Eu() : e.alternate === null && Dt === 0 && (Dt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === $n ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), jc(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === $n ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), jc(t, a, n)), !1;
        }
        throw Error(r(435, e.tag));
      }
      return jc(t, a, n), Eu(), !1;
    }
    if (ut)
      return l = ol.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== Oi && (t = Error(r(422), { cause: a }), wa(bl(t, e)))) : (a !== Oi && (l = Error(r(423), {
        cause: a
      }), wa(
        bl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = bl(a, e), n = sc(
        t.stateNode,
        a,
        n
      ), Gi(t, n), Dt !== 4 && (Dt = 2)), !1;
    var u = Error(r(520), { cause: a });
    if (u = bl(u, e), on === null ? on = [u] : on.push(u), Dt !== 4 && (Dt = 2), l === null) return !0;
    a = bl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = sc(e.stateNode, a, t), Gi(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ye === null || !ye.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Do(n), Co(
              n,
              t,
              e,
              a
            ), Gi(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var oc = Error(r(461)), qt = !1;
  function wt(t, l, e, a) {
    l.child = t === null ? Hs(l, null, e, a) : Ge(
      l,
      t.child,
      e,
      a
    );
  }
  function Uo(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Re(l), a = Vi(
      t,
      l,
      e,
      i,
      u,
      n
    ), c = Ki(), t !== null && !qt ? (Ji(t, l, n), Vl(t, l, n)) : (ut && c && _i(l), l.flags |= 1, wt(t, l, a, n), l.child);
  }
  function No(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !xi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, Ho(
        t,
        l,
        u,
        a,
        n
      )) : (t = wn(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !pc(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Xa, e(i, a) && t.ref === l.ref)
        return Vl(t, l, n);
    }
    return l.flags |= 1, t = Gl(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Ho(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Xa(u, a) && t.ref === l.ref)
        if (qt = !1, l.pendingProps = a = u, pc(t, n))
          (t.flags & 131072) !== 0 && (qt = !0);
        else
          return l.lanes = t.lanes, Vl(t, l, n);
    }
    return rc(
      t,
      l,
      e,
      a,
      n
    );
  }
  function jo(t, l, e, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, l.child = null;
        return Ro(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Wn(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? qs(l, u) : Xi(), Bs(l);
      else
        return a = l.lanes = 536870912, Ro(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (Wn(l, u.cachePool), qs(l, u), re(), l.memoizedState = null) : (t !== null && Wn(l, null), Xi(), re());
    return wt(t, l, n, e), l.child;
  }
  function en(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Ro(t, l, e, a, n) {
    var u = Ri();
    return u = u === null ? null : { parent: jt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && Wn(l, null), Xi(), Bs(l), t !== null && ca(t, l, a, !0), l.childLanes = n, null;
  }
  function ou(t, l) {
    return l = du(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function qo(t, l, e) {
    return Ge(l, t.child, null, e), t = ou(l, l.pendingProps), t.flags |= 2, rl(l), l.memoizedState = null, t;
  }
  function cd(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (ut) {
        if (a.mode === "hidden")
          return t = ou(l, a), l.lanes = 536870912, en(null, t);
        if (Li(l), (t = Et) ? (t = W0(
          t,
          zl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ae !== null ? { id: Ul, overflow: Nl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ps(t), e.return = l, l.child = e, Qt = l, Et = null)) : t = null, t === null) throw ue(l);
        return l.lanes = 536870912, null;
      }
      return ou(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Li(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = qo(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(r(558));
      else if (qt || ca(t, l, e, !1), n = (e & t.childLanes) !== 0, qt || n) {
        if (a = St, a !== null && (i = Af(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Ue(t, i), nl(a, t, i), oc;
        Eu(), l = qo(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, Et = Tl(i.nextSibling), Qt = l, ut = !0, ne = null, zl = !1, t !== null && Es(l, t), l = ou(l, a), l.flags |= 4096;
      return l;
    }
    return t = Gl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function ru(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(r(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function rc(t, l, e, a, n) {
    return Re(l), e = Vi(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = Ki(), t !== null && !qt ? (Ji(t, l, n), Vl(t, l, n)) : (ut && a && _i(l), l.flags |= 1, wt(t, l, e, n), l.child);
  }
  function Bo(t, l, e, a, n, u) {
    return Re(l), l.updateQueue = null, e = Gs(
      l,
      a,
      e,
      n
    ), Ys(t), a = Ki(), t !== null && !qt ? (Ji(t, l, u), Vl(t, l, u)) : (ut && a && _i(l), l.flags |= 1, wt(t, l, e, u), l.child);
  }
  function Yo(t, l, e, a, n) {
    if (Re(l), l.stateNode === null) {
      var u = aa, i = e.contextType;
      typeof i == "object" && i !== null && (u = Lt(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = fc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Bi(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? Lt(i) : aa, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (cc(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && fc.enqueueReplaceState(u, u.state, null), Fa(l, a, u, n), $a(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var c = l.memoizedProps, f = Xe(e, c);
      u.props = f;
      var h = u.context, p = e.contextType;
      i = aa, typeof p == "object" && p !== null && (i = Lt(p));
      var E = e.getDerivedStateFromProps;
      p = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, p || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || h !== i) && To(
        l,
        u,
        a,
        i
      ), ce = !1;
      var y = l.memoizedState;
      u.state = y, Fa(l, a, u, n), $a(), h = l.memoizedState, c || y !== h || ce ? (typeof E == "function" && (cc(
        l,
        e,
        E,
        a
      ), h = l.memoizedState), (f = ce || xo(
        l,
        e,
        f,
        a,
        y,
        h,
        i
      )) ? (p || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = h), u.props = a, u.state = h, u.context = i, a = f) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, Yi(t, l), i = l.memoizedProps, p = Xe(e, i), u.props = p, E = l.pendingProps, y = u.context, h = e.contextType, f = aa, typeof h == "object" && h !== null && (f = Lt(h)), c = e.getDerivedStateFromProps, (h = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== E || y !== f) && To(
        l,
        u,
        a,
        f
      ), ce = !1, y = l.memoizedState, u.state = y, Fa(l, a, u, n), $a();
      var g = l.memoizedState;
      i !== E || y !== g || ce || t !== null && t.dependencies !== null && Kn(t.dependencies) ? (typeof c == "function" && (cc(
        l,
        e,
        c,
        a
      ), g = l.memoizedState), (p = ce || xo(
        l,
        e,
        p,
        a,
        y,
        g,
        f
      ) || t !== null && t.dependencies !== null && Kn(t.dependencies)) ? (h || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, g, f), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        g,
        f
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = g), u.props = a, u.state = g, u.context = f, a = p) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, ru(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = Ge(
      l,
      t.child,
      null,
      n
    ), l.child = Ge(
      l,
      null,
      e,
      n
    )) : wt(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Vl(
      t,
      l,
      n
    ), t;
  }
  function Go(t, l, e, a) {
    return He(), l.flags |= 256, wt(t, l, e, a), l.child;
  }
  var dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mc(t) {
    return { baseLanes: t, cachePool: Ms() };
  }
  function hc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= ml), t;
  }
  function Zo(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Nt.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (ut) {
        if (n ? oe(l) : re(), (t = Et) ? (t = W0(
          t,
          zl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ae !== null ? { id: Ul, overflow: Nl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ps(t), e.return = l, l.child = e, Qt = l, Et = null)) : t = null, t === null) throw ue(l);
        return $c(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, n ? (re(), n = l.mode, c = du(
        { mode: "hidden", children: c },
        n
      ), a = Ne(
        a,
        n,
        e,
        null
      ), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = mc(e), a.childLanes = hc(
        t,
        i,
        e
      ), l.memoizedState = dc, en(null, a)) : (oe(l), yc(l, c));
    }
    var f = t.memoizedState;
    if (f !== null && (c = f.dehydrated, c !== null)) {
      if (u)
        l.flags & 256 ? (oe(l), l.flags &= -257, l = vc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (re(), l.child = t.child, l.flags |= 128, l = null) : (re(), c = a.fallback, n = l.mode, a = du(
          { mode: "visible", children: a.children },
          n
        ), c = Ne(
          c,
          n,
          e,
          null
        ), c.flags |= 2, a.return = l, c.return = l, a.sibling = c, l.child = a, Ge(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = mc(e), a.childLanes = hc(
          t,
          i,
          e
        ), l.memoizedState = dc, l = en(null, a));
      else if (oe(l), $c(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, a = Error(r(419)), a.stack = "", a.digest = i, wa({ value: a, source: null, stack: null }), l = vc(
          t,
          l,
          e
        );
      } else if (qt || ca(t, l, e, !1), i = (e & t.childLanes) !== 0, qt || i) {
        if (i = St, i !== null && (a = Af(i, e), a !== 0 && a !== f.retryLane))
          throw f.retryLane = a, Ue(t, a), nl(i, t, a), oc;
        kc(c) || Eu(), l = vc(
          t,
          l,
          e
        );
      } else
        kc(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = f.treeContext, Et = Tl(
          c.nextSibling
        ), Qt = l, ut = !0, ne = null, zl = !1, t !== null && Es(l, t), l = yc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (re(), c = a.fallback, n = l.mode, f = t.child, h = f.sibling, a = Gl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 65011712, h !== null ? c = Gl(
      h,
      c
    ) : (c = Ne(
      c,
      n,
      e,
      null
    ), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, en(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = mc(e) : (n = c.cachePool, n !== null ? (f = jt._currentValue, n = n.parent !== f ? { parent: f, pool: f } : n) : n = Ms(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: n
    }), a.memoizedState = c, a.childLanes = hc(
      t,
      i,
      e
    ), l.memoizedState = dc, en(t.child, a)) : (oe(l), e = t.child, t = e.sibling, e = Gl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function yc(t, l) {
    return l = du(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function du(t, l) {
    return t = sl(22, t, null, l), t.lanes = 0, t;
  }
  function vc(t, l, e) {
    return Ge(l, t.child, null, e), t = yc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Xo(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Ui(t.return, l, e);
  }
  function gc(t, l, e, a, n, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function Qo(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Nt.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, D(Nt, i), wt(t, l, a, e), a = ut ? La : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Xo(t, e, l);
        else if (t.tag === 19)
          Xo(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = l.child, n = null; e !== null; )
          t = e.alternate, t !== null && tu(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), gc(
          l,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = l.child, l.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && tu(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        gc(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        gc(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Vl(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), he |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (ca(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(r(153));
    if (l.child !== null) {
      for (t = l.child, e = Gl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Gl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function pc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Kn(t)));
  }
  function fd(t, l, e) {
    switch (l.tag) {
      case 3:
        Wt(l, l.stateNode.containerInfo), ie(l, jt, t.memoizedState.cache), He();
        break;
      case 27:
      case 5:
        Oa(l);
        break;
      case 4:
        Wt(l, l.stateNode.containerInfo);
        break;
      case 10:
        ie(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Li(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (oe(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Zo(t, l, e) : (oe(l), t = Vl(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        oe(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (ca(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Qo(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), D(Nt, Nt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, jo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        ie(l, jt, t.memoizedState.cache);
    }
    return Vl(t, l, e);
  }
  function Lo(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        qt = !0;
      else {
        if (!pc(t, e) && (l.flags & 128) === 0)
          return qt = !1, fd(
            t,
            l,
            e
          );
        qt = (t.flags & 131072) !== 0;
      }
    else
      qt = !1, ut && (l.flags & 1048576) !== 0 && Ss(l, La, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Be(l.elementType), l.type = t, typeof t == "function")
            xi(t) ? (a = Xe(t, a), l.tag = 1, l = Yo(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = rc(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === At) {
                l.tag = 11, l = Uo(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === F) {
                l.tag = 14, l = No(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Jt(t) || t, Error(r(306, l, ""));
          }
        }
        return l;
      case 0:
        return rc(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = Xe(
          a,
          l.pendingProps
        ), Yo(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (Wt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, Yi(t, l), Fa(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, ie(l, jt, a), a !== u.cache && Ni(
            l,
            [jt],
            e,
            !0
          ), $a(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = Go(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = bl(
                Error(r(424)),
                l
              ), wa(n), l = Go(
                t,
                l,
                a,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Et = Tl(t.firstChild), Qt = l, ut = !0, ne = null, zl = !0, e = Hs(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (He(), a === n) {
              l = Vl(
                t,
                l,
                e
              );
              break t;
            }
            wt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return ru(t, l), t === null ? (e = t1(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : ut || (e = l.type, t = l.pendingProps, a = Ou(
          tt.current
        ).createElement(e), a[Xt] = l, a[It] = t, Vt(a, e, t), Gt(a), l.stateNode = a) : l.memoizedState = t1(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Oa(l), t === null && ut && (a = l.stateNode = F0(
          l.type,
          l.pendingProps,
          tt.current
        ), Qt = l, zl = !0, n = Et, be(l.type) ? (Fc = n, Et = Tl(a.firstChild)) : Et = n), wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), ru(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && ut && ((n = a = Et) && (a = Yd(
          a,
          l.type,
          l.pendingProps,
          zl
        ), a !== null ? (l.stateNode = a, Qt = l, Et = Tl(a.firstChild), zl = !1, n = !0) : n = !1), n || ue(l)), Oa(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Kc(n, u) ? a = null : i !== null && Kc(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = Vi(
          t,
          l,
          Pr,
          null,
          null,
          e
        ), pn._currentValue = n), ru(t, l), wt(t, l, a, e), l.child;
      case 6:
        return t === null && ut && ((t = e = Et) && (e = Gd(
          e,
          l.pendingProps,
          zl
        ), e !== null ? (l.stateNode = e, Qt = l, Et = null, t = !0) : t = !1), t || ue(l)), null;
      case 13:
        return Zo(t, l, e);
      case 4:
        return Wt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Ge(
          l,
          null,
          a,
          e
        ) : wt(t, l, a, e), l.child;
      case 11:
        return Uo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return wt(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, ie(l, l.type, a.value), wt(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Re(l), n = Lt(n), a = a(n), l.flags |= 1, wt(t, l, a, e), l.child;
      case 14:
        return No(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Ho(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Qo(t, l, e);
      case 31:
        return cd(t, l, e);
      case 22:
        return jo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Re(l), a = Lt(jt), t === null ? (n = Ri(), n === null && (n = St, u = Hi(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Bi(l), ie(l, jt, n)) : ((t.lanes & e) !== 0 && (Yi(t, l), Fa(l, null, null, e), $a()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), ie(l, jt, a)) : (a = u.cache, ie(l, jt, a), a !== n.cache && Ni(
          l,
          [jt],
          e,
          !0
        ))), wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(r(156, l.tag));
  }
  function Kl(t) {
    t.flags |= 4;
  }
  function bc(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (v0()) t.flags |= 8192;
        else
          throw Ye = $n, qi;
    } else t.flags &= -16777217;
  }
  function wo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !u1(l))
      if (v0()) t.flags |= 8192;
      else
        throw Ye = $n, qi;
  }
  function mu(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? zf() : 536870912, t.lanes |= l, ba |= l);
  }
  function an(t, l) {
    if (!ut)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function zt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function sd(t, l, e) {
    var a = l.pendingProps;
    switch (Mi(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return zt(l), null;
      case 1:
        return zt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Ql(jt), Ut(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (ia(l) ? Kl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Di())), zt(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (Kl(l), u !== null ? (zt(l), wo(l, u)) : (zt(l), bc(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (Kl(l), zt(l), wo(l, u)) : (zt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Kl(l), zt(l), bc(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (Tn(l), e = tt.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Kl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return zt(l), null;
          }
          t = j.current, ia(l) ? zs(l) : (t = F0(n, a, e), l.stateNode = t, Kl(l));
        }
        return zt(l), null;
      case 5:
        if (Tn(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Kl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(r(166));
            return zt(l), null;
          }
          if (u = j.current, ia(l))
            zs(l);
          else {
            var i = Ou(
              tt.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[Xt] = l, u[It] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            l.stateNode = u;
            t: switch (Vt(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Kl(l);
          }
        }
        return zt(l), bc(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Kl(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(r(166));
          if (t = tt.current, ia(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = Qt, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Xt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Z0(t.nodeValue, e)), t || ue(l, !0);
          } else
            t = Ou(t).createTextNode(
              a
            ), t[Xt] = l, l.stateNode = t;
        }
        return zt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = ia(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[Xt] = l;
            } else
              He(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            zt(l), t = !1;
          } else
            e = Di(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (rl(l), l) : (rl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(r(558));
        }
        return zt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = ia(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
              n[Xt] = l;
            } else
              He(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            zt(l), n = !1;
          } else
            n = Di(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (rl(l), l) : (rl(l), null);
        }
        return rl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), mu(l, l.updateQueue), zt(l), null);
      case 4:
        return Ut(), t === null && Xc(l.stateNode.containerInfo), zt(l), null;
      case 10:
        return Ql(l.type), zt(l), null;
      case 19:
        if (x(Nt), a = l.memoizedState, a === null) return zt(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) an(a, !1);
          else {
            if (Dt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = tu(t), u !== null) {
                  for (l.flags |= 128, an(a, !1), t = u.updateQueue, l.updateQueue = t, mu(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    gs(e, t), e = e.sibling;
                  return D(
                    Nt,
                    Nt.current & 1 | 2
                  ), ut && Zl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && ul() > pu && (l.flags |= 128, n = !0, an(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = tu(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, mu(l, t), an(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !ut)
                return zt(l), null;
            } else
              2 * ul() - a.renderingStartTime > pu && e !== 536870912 && (l.flags |= 128, n = !0, an(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = ul(), t.sibling = null, e = Nt.current, D(
          Nt,
          n ? e & 1 | 2 : e & 1
        ), ut && Zl(l, a.treeForkCount), t) : (zt(l), null);
      case 22:
      case 23:
        return rl(l), Qi(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (zt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : zt(l), e = l.updateQueue, e !== null && mu(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && x(qe), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Ql(jt), zt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, l.tag));
  }
  function od(t, l) {
    switch (Mi(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Ql(jt), Ut(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Tn(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (rl(l), l.alternate === null)
            throw Error(r(340));
          He();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (rl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(r(340));
          He();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return x(Nt), null;
      case 4:
        return Ut(), null;
      case 10:
        return Ql(l.type), null;
      case 22:
      case 23:
        return rl(l), Qi(), t !== null && x(qe), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Ql(jt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vo(t, l) {
    switch (Mi(l), l.tag) {
      case 3:
        Ql(jt), Ut();
        break;
      case 26:
      case 27:
      case 5:
        Tn(l);
        break;
      case 4:
        Ut();
        break;
      case 31:
        l.memoizedState !== null && rl(l);
        break;
      case 13:
        rl(l);
        break;
      case 19:
        x(Nt);
        break;
      case 10:
        Ql(l.type);
        break;
      case 22:
      case 23:
        rl(l), Qi(), t !== null && x(qe);
        break;
      case 24:
        Ql(jt);
    }
  }
  function nn(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (c) {
      ht(l, l.return, c);
    }
  }
  function de(t, l, e) {
    try {
      var a = l.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, n = l;
              var f = e, h = c;
              try {
                h();
              } catch (p) {
                ht(
                  n,
                  f,
                  p
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (p) {
      ht(l, l.return, p);
    }
  }
  function Ko(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Rs(l, e);
      } catch (a) {
        ht(t, t.return, a);
      }
    }
  }
  function Jo(t, l, e) {
    e.props = Xe(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      ht(t, l, a);
    }
  }
  function un(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      ht(t, l, n);
    }
  }
  function Hl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ht(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          ht(t, l, n);
        }
      else e.current = null;
  }
  function Wo(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  function Sc(t, l, e) {
    try {
      var a = t.stateNode;
      Nd(a, t.type, e, l), a[It] = l;
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  function ko(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && be(t.type) || t.tag === 4;
  }
  function Ec(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || ko(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && be(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function zc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Bl));
    else if (a !== 4 && (a === 27 && be(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (zc(t, l, e), t = t.sibling; t !== null; )
        zc(t, l, e), t = t.sibling;
  }
  function hu(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && be(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (hu(t, l, e), t = t.sibling; t !== null; )
        hu(t, l, e), t = t.sibling;
  }
  function $o(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      Vt(l, a, e), l[Xt] = t, l[It] = e;
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  var Jl = !1, Bt = !1, xc = !1, Fo = typeof WeakSet == "function" ? WeakSet : Set, Zt = null;
  function rd(t, l) {
    if (t = t.containerInfo, wc = Ru, t = fs(t), vi(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, c = -1, f = -1, h = 0, p = 0, E = t, y = null;
            l: for (; ; ) {
              for (var g; E !== e || n !== 0 && E.nodeType !== 3 || (c = i + n), E !== u || a !== 0 && E.nodeType !== 3 || (f = i + a), E.nodeType === 3 && (i += E.nodeValue.length), (g = E.firstChild) !== null; )
                y = E, E = g;
              for (; ; ) {
                if (E === t) break l;
                if (y === e && ++h === n && (c = i), y === u && ++p === a && (f = i), (g = E.nextSibling) !== null) break;
                E = y, y = E.parentNode;
              }
              E = g;
            }
            e = c === -1 || f === -1 ? null : { start: c, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Vc = { focusedElem: t, selectionRange: e }, Ru = !1, Zt = l; Zt !== null; )
      if (l = Zt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Zt = t;
      else
        for (; Zt !== null; ) {
          switch (l = Zt, u = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  n = t[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = l, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var N = Xe(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    N,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (G) {
                  ht(
                    e,
                    e.return,
                    G
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Wc(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Wc(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Zt = t;
            break;
          }
          Zt = l.return;
        }
  }
  function Io(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        kl(t, e), a & 4 && nn(5, e);
        break;
      case 1:
        if (kl(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              ht(e, e.return, i);
            }
          else {
            var n = Xe(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              ht(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Ko(e), a & 512 && un(e, e.return);
        break;
      case 3:
        if (kl(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            Rs(t, l);
          } catch (i) {
            ht(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && $o(e);
      case 26:
      case 5:
        kl(t, e), l === null && a & 4 && Wo(e), a & 512 && un(e, e.return);
        break;
      case 12:
        kl(t, e);
        break;
      case 31:
        kl(t, e), a & 4 && l0(t, e);
        break;
      case 13:
        kl(t, e), a & 4 && e0(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Sd.bind(
          null,
          e
        ), Zd(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Jl, !a) {
          l = l !== null && l.memoizedState !== null || Bt, n = Jl;
          var u = Bt;
          Jl = a, (Bt = l) && !u ? $l(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : kl(t, e), Jl = n, Bt = u;
        }
        break;
      case 30:
        break;
      default:
        kl(t, e);
    }
  }
  function Po(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Po(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Pu(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var xt = null, tl = !1;
  function Wl(t, l, e) {
    for (e = e.child; e !== null; )
      t0(t, l, e), e = e.sibling;
  }
  function t0(t, l, e) {
    if (il && typeof il.onCommitFiberUnmount == "function")
      try {
        il.onCommitFiberUnmount(Da, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Bt || Hl(e, l), Wl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Bt || Hl(e, l);
        var a = xt, n = tl;
        be(e.type) && (xt = e.stateNode, tl = !1), Wl(
          t,
          l,
          e
        ), yn(e.stateNode), xt = a, tl = n;
        break;
      case 5:
        Bt || Hl(e, l);
      case 6:
        if (a = xt, n = tl, xt = null, Wl(
          t,
          l,
          e
        ), xt = a, tl = n, xt !== null)
          if (tl)
            try {
              (xt.nodeType === 9 ? xt.body : xt.nodeName === "HTML" ? xt.ownerDocument.body : xt).removeChild(e.stateNode);
            } catch (u) {
              ht(
                e,
                l,
                u
              );
            }
          else
            try {
              xt.removeChild(e.stateNode);
            } catch (u) {
              ht(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        xt !== null && (tl ? (t = xt, K0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Ma(t)) : K0(xt, e.stateNode));
        break;
      case 4:
        a = xt, n = tl, xt = e.stateNode.containerInfo, tl = !0, Wl(
          t,
          l,
          e
        ), xt = a, tl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        de(2, e, l), Bt || de(4, e, l), Wl(
          t,
          l,
          e
        );
        break;
      case 1:
        Bt || (Hl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Jo(
          e,
          l,
          a
        )), Wl(
          t,
          l,
          e
        );
        break;
      case 21:
        Wl(
          t,
          l,
          e
        );
        break;
      case 22:
        Bt = (a = Bt) || e.memoizedState !== null, Wl(
          t,
          l,
          e
        ), Bt = a;
        break;
      default:
        Wl(
          t,
          l,
          e
        );
    }
  }
  function l0(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ma(t);
      } catch (e) {
        ht(l, l.return, e);
      }
    }
  }
  function e0(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ma(t);
      } catch (e) {
        ht(l, l.return, e);
      }
  }
  function dd(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Fo()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Fo()), l;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function yu(t, l) {
    var e = dd(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Ed.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function ll(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, i = l, c = i;
        t: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (be(c.type)) {
                xt = c.stateNode, tl = !1;
                break t;
              }
              break;
            case 5:
              xt = c.stateNode, tl = !1;
              break t;
            case 3:
            case 4:
              xt = c.stateNode.containerInfo, tl = !0;
              break t;
          }
          c = c.return;
        }
        if (xt === null) throw Error(r(160));
        t0(u, i, n), xt = null, tl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        a0(l, t), l = l.sibling;
  }
  var Dl = null;
  function a0(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ll(l, t), el(t), a & 4 && (de(3, t, t.return), nn(3, t), de(5, t, t.return));
        break;
      case 1:
        ll(l, t), el(t), a & 512 && (Bt || e === null || Hl(e, e.return)), a & 64 && Jl && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Dl;
        if (ll(l, t), el(t), a & 512 && (Bt || e === null || Hl(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Na] || u[Xt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Vt(u, a, e), u[Xt] = t, Gt(u), a = u;
                      break t;
                    case "link":
                      var i = a1(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (u = i[c], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), Vt(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = a1(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (u = i[c], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), Vt(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  u[Xt] = t, Gt(u), a = u;
                }
                t.stateNode = a;
              } else
                n1(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = e1(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? n1(
              n,
              t.type,
              t.stateNode
            ) : e1(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && Sc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ll(l, t), el(t), a & 512 && (Bt || e === null || Hl(e, e.return)), e !== null && a & 4 && Sc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ll(l, t), el(t), a & 512 && (Bt || e === null || Hl(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            $e(n, "");
          } catch (N) {
            ht(t, t.return, N);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, Sc(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (xc = !0);
        break;
      case 6:
        if (ll(l, t), el(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (N) {
            ht(t, t.return, N);
          }
        }
        break;
      case 3:
        if (Uu = null, n = Dl, Dl = Du(l.containerInfo), ll(l, t), Dl = n, el(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ma(l.containerInfo);
          } catch (N) {
            ht(t, t.return, N);
          }
        xc && (xc = !1, n0(t));
        break;
      case 4:
        a = Dl, Dl = Du(
          t.stateNode.containerInfo
        ), ll(l, t), el(t), Dl = a;
        break;
      case 12:
        ll(l, t), el(t);
        break;
      case 31:
        ll(l, t), el(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yu(t, a)));
        break;
      case 13:
        ll(l, t), el(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (gu = ul()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yu(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, h = Jl, p = Bt;
        if (Jl = h || n, Bt = p || f, ll(l, t), Bt = p, Jl = h, el(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || f || Jl || Bt || Qe(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                f = e = l;
                try {
                  if (u = f.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = f.stateNode;
                    var E = f.memoizedProps.style, y = E != null && E.hasOwnProperty("display") ? E.display : null;
                    c.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (N) {
                  ht(f, f.return, N);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                f = l;
                try {
                  f.stateNode.nodeValue = n ? "" : f.memoizedProps;
                } catch (N) {
                  ht(f, f.return, N);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                f = l;
                try {
                  var g = f.stateNode;
                  n ? J0(g, !0) : J0(f.stateNode, !1);
                } catch (N) {
                  ht(f, f.return, N);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, yu(t, e))));
        break;
      case 19:
        ll(l, t), el(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yu(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ll(l, t), el(t);
    }
  }
  function el(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (ko(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Ec(t);
            hu(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && ($e(i, ""), e.flags &= -33);
            var c = Ec(t);
            hu(t, c, i);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo, h = Ec(t);
            zc(
              t,
              h,
              f
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (p) {
        ht(t, t.return, p);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function n0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        n0(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function kl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Io(t, l.alternate, l), l = l.sibling;
  }
  function Qe(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          de(4, l, l.return), Qe(l);
          break;
        case 1:
          Hl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Jo(
            l,
            l.return,
            e
          ), Qe(l);
          break;
        case 27:
          yn(l.stateNode);
        case 26:
        case 5:
          Hl(l, l.return), Qe(l);
          break;
        case 22:
          l.memoizedState === null && Qe(l);
          break;
        case 30:
          Qe(l);
          break;
        default:
          Qe(l);
      }
      t = t.sibling;
    }
  }
  function $l(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          $l(
            n,
            u,
            e
          ), nn(4, u);
          break;
        case 1:
          if ($l(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (h) {
              ht(a, a.return, h);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var c = a.stateNode;
            try {
              var f = n.shared.hiddenCallbacks;
              if (f !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++)
                  js(f[n], c);
            } catch (h) {
              ht(a, a.return, h);
            }
          }
          e && i & 64 && Ko(u), un(u, u.return);
          break;
        case 27:
          $o(u);
        case 26:
        case 5:
          $l(
            n,
            u,
            e
          ), e && a === null && i & 4 && Wo(u), un(u, u.return);
          break;
        case 12:
          $l(
            n,
            u,
            e
          );
          break;
        case 31:
          $l(
            n,
            u,
            e
          ), e && i & 4 && l0(n, u);
          break;
        case 13:
          $l(
            n,
            u,
            e
          ), e && i & 4 && e0(n, u);
          break;
        case 22:
          u.memoizedState === null && $l(
            n,
            u,
            e
          ), un(u, u.return);
          break;
        case 30:
          break;
        default:
          $l(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Tc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Va(e));
  }
  function Ac(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Va(t));
  }
  function Cl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        u0(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function u0(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Cl(
          t,
          l,
          e,
          a
        ), n & 2048 && nn(9, l);
        break;
      case 1:
        Cl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Cl(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Va(t)));
        break;
      case 12:
        if (n & 2048) {
          Cl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var u = l.memoizedProps, i = u.id, c = u.onPostCommit;
            typeof c == "function" && c(
              i,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (f) {
            ht(l, l.return, f);
          }
        } else
          Cl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Cl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Cl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Cl(
          t,
          l,
          e,
          a
        ) : cn(t, l) : u._visibility & 2 ? Cl(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, va(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Tc(i, l);
        break;
      case 24:
        Cl(
          t,
          l,
          e,
          a
        ), n & 2048 && Ac(l.alternate, l);
        break;
      default:
        Cl(
          t,
          l,
          e,
          a
        );
    }
  }
  function va(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, c = e, f = a, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          va(
            u,
            i,
            c,
            f,
            n
          ), nn(8, i);
          break;
        case 23:
          break;
        case 22:
          var p = i.stateNode;
          i.memoizedState !== null ? p._visibility & 2 ? va(
            u,
            i,
            c,
            f,
            n
          ) : cn(
            u,
            i
          ) : (p._visibility |= 2, va(
            u,
            i,
            c,
            f,
            n
          )), n && h & 2048 && Tc(
            i.alternate,
            i
          );
          break;
        case 24:
          va(
            u,
            i,
            c,
            f,
            n
          ), n && h & 2048 && Ac(i.alternate, i);
          break;
        default:
          va(
            u,
            i,
            c,
            f,
            n
          );
      }
      l = l.sibling;
    }
  }
  function cn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            cn(e, a), n & 2048 && Tc(
              a.alternate,
              a
            );
            break;
          case 24:
            cn(e, a), n & 2048 && Ac(a.alternate, a);
            break;
          default:
            cn(e, a);
        }
        l = l.sibling;
      }
  }
  var fn = 8192;
  function ga(t, l, e) {
    if (t.subtreeFlags & fn)
      for (t = t.child; t !== null; )
        i0(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function i0(t, l, e) {
    switch (t.tag) {
      case 26:
        ga(
          t,
          l,
          e
        ), t.flags & fn && t.memoizedState !== null && Id(
          e,
          Dl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ga(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Dl;
        Dl = Du(t.stateNode.containerInfo), ga(
          t,
          l,
          e
        ), Dl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = fn, fn = 16777216, ga(
          t,
          l,
          e
        ), fn = a) : ga(
          t,
          l,
          e
        ));
        break;
      default:
        ga(
          t,
          l,
          e
        );
    }
  }
  function c0(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function sn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Zt = a, s0(
            a,
            t
          );
        }
      c0(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        f0(t), t = t.sibling;
  }
  function f0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        sn(t), t.flags & 2048 && de(9, t, t.return);
        break;
      case 3:
        sn(t);
        break;
      case 12:
        sn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, vu(t)) : sn(t);
        break;
      default:
        sn(t);
    }
  }
  function vu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Zt = a, s0(
            a,
            t
          );
        }
      c0(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          de(8, l, l.return), vu(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, vu(l));
          break;
        default:
          vu(l);
      }
      t = t.sibling;
    }
  }
  function s0(t, l) {
    for (; Zt !== null; ) {
      var e = Zt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          de(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Va(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Zt = a;
      else
        t: for (e = t; Zt !== null; ) {
          a = Zt;
          var n = a.sibling, u = a.return;
          if (Po(a), a === e) {
            Zt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Zt = n;
            break t;
          }
          Zt = u;
        }
    }
  }
  var md = {
    getCacheForType: function(t) {
      var l = Lt(jt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return Lt(jt).controller.signal;
    }
  }, hd = typeof WeakMap == "function" ? WeakMap : Map, st = 0, St = null, lt = null, at = 0, mt = 0, dl = null, me = !1, pa = !1, _c = !1, Fl = 0, Dt = 0, he = 0, Le = 0, Mc = 0, ml = 0, ba = 0, on = null, al = null, Oc = !1, gu = 0, o0 = 0, pu = 1 / 0, bu = null, ye = null, Yt = 0, ve = null, Sa = null, Il = 0, Dc = 0, Cc = null, r0 = null, rn = 0, Uc = null;
  function hl() {
    return (st & 2) !== 0 && at !== 0 ? at & -at : b.T !== null ? Bc() : _f();
  }
  function d0() {
    if (ml === 0)
      if ((at & 536870912) === 0 || ut) {
        var t = Mn;
        Mn <<= 1, (Mn & 3932160) === 0 && (Mn = 262144), ml = t;
      } else ml = 536870912;
    return t = ol.current, t !== null && (t.flags |= 32), ml;
  }
  function nl(t, l, e) {
    (t === St && (mt === 2 || mt === 9) || t.cancelPendingCommit !== null) && (Ea(t, 0), ge(
      t,
      at,
      ml,
      !1
    )), Ua(t, e), ((st & 2) === 0 || t !== St) && (t === St && ((st & 2) === 0 && (Le |= e), Dt === 4 && ge(
      t,
      at,
      ml,
      !1
    )), jl(t));
  }
  function m0(t, l, e) {
    if ((st & 6) !== 0) throw Error(r(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ca(t, l), n = a ? gd(t, l) : Hc(t, l, !0), u = a;
    do {
      if (n === 0) {
        pa && !a && ge(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !yd(e)) {
          n = Hc(t, l, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = l, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var c = t;
              n = on;
              var f = c.current.memoizedState.isDehydrated;
              if (f && (Ea(c, i).flags |= 256), i = Hc(
                c,
                i,
                !1
              ), i !== 2) {
                if (_c && !f) {
                  c.errorRecoveryDisabledLanes |= u, Le |= u, n = 4;
                  break t;
                }
                u = al, al = n, u !== null && (al === null ? al = u : al.push.apply(
                  al,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Ea(t, 0), ge(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              ge(
                a,
                l,
                ml,
                !me
              );
              break t;
            case 2:
              al = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((l & 62914560) === l && (n = gu + 300 - ul(), 10 < n)) {
            if (ge(
              a,
              l,
              ml,
              !me
            ), Dn(a, 0, !0) !== 0) break t;
            Il = l, a.timeoutHandle = w0(
              h0.bind(
                null,
                a,
                e,
                al,
                bu,
                Oc,
                l,
                ml,
                Le,
                ba,
                me,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          h0(
            a,
            e,
            al,
            bu,
            Oc,
            l,
            ml,
            Le,
            ba,
            me,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    jl(t);
  }
  function h0(t, l, e, a, n, u, i, c, f, h, p, E, y, g) {
    if (t.timeoutHandle = -1, E = l.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bl
      }, i0(
        l,
        u,
        E
      );
      var N = (u & 62914560) === u ? gu - ul() : (u & 4194048) === u ? o0 - ul() : 0;
      if (N = Pd(
        E,
        N
      ), N !== null) {
        Il = u, t.cancelPendingCommit = N(
          z0.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            i,
            c,
            f,
            p,
            E,
            null,
            y,
            g
          )
        ), ge(t, u, i, !h);
        return;
      }
    }
    z0(
      t,
      l,
      u,
      e,
      a,
      n,
      i,
      c,
      f
    );
  }
  function yd(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!fl(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function ge(t, l, e, a) {
    l &= ~Mc, l &= ~Le, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - cl(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && xf(t, e, l);
  }
  function Su() {
    return (st & 6) === 0 ? (dn(0), !1) : !0;
  }
  function Nc() {
    if (lt !== null) {
      if (mt === 0)
        var t = lt.return;
      else
        t = lt, Xl = je = null, Wi(t), ra = null, Ja = 0, t = lt;
      for (; t !== null; )
        Vo(t.alternate, t), t = t.return;
      lt = null;
    }
  }
  function Ea(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Rd(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Il = 0, Nc(), St = t, lt = e = Gl(t.current, null), at = l, mt = 0, dl = null, me = !1, pa = Ca(t, l), _c = !1, ba = ml = Mc = Le = he = Dt = 0, al = on = null, Oc = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - cl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return Fl = l, Xn(), e;
  }
  function y0(t, l) {
    k = null, b.H = ln, l === oa || l === kn ? (l = Cs(), mt = 3) : l === qi ? (l = Cs(), mt = 4) : mt = l === oc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, dl = l, lt === null && (Dt = 1, su(
      t,
      bl(l, t.current)
    ));
  }
  function v0() {
    var t = ol.current;
    return t === null ? !0 : (at & 4194048) === at ? xl === null : (at & 62914560) === at || (at & 536870912) !== 0 ? t === xl : !1;
  }
  function g0() {
    var t = b.H;
    return b.H = ln, t === null ? ln : t;
  }
  function p0() {
    var t = b.A;
    return b.A = md, t;
  }
  function Eu() {
    Dt = 4, me || (at & 4194048) !== at && ol.current !== null || (pa = !0), (he & 134217727) === 0 && (Le & 134217727) === 0 || St === null || ge(
      St,
      at,
      ml,
      !1
    );
  }
  function Hc(t, l, e) {
    var a = st;
    st |= 2;
    var n = g0(), u = p0();
    (St !== t || at !== l) && (bu = null, Ea(t, l)), l = !1;
    var i = Dt;
    t: do
      try {
        if (mt !== 0 && lt !== null) {
          var c = lt, f = dl;
          switch (mt) {
            case 8:
              Nc(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ol.current === null && (l = !0);
              var h = mt;
              if (mt = 0, dl = null, za(t, c, f, h), e && pa) {
                i = 0;
                break t;
              }
              break;
            default:
              h = mt, mt = 0, dl = null, za(t, c, f, h);
          }
        }
        vd(), i = Dt;
        break;
      } catch (p) {
        y0(t, p);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Xl = je = null, st = a, b.H = n, b.A = u, lt === null && (St = null, at = 0, Xn()), i;
  }
  function vd() {
    for (; lt !== null; ) b0(lt);
  }
  function gd(t, l) {
    var e = st;
    st |= 2;
    var a = g0(), n = p0();
    St !== t || at !== l ? (bu = null, pu = ul() + 500, Ea(t, l)) : pa = Ca(
      t,
      l
    );
    t: do
      try {
        if (mt !== 0 && lt !== null) {
          l = lt;
          var u = dl;
          l: switch (mt) {
            case 1:
              mt = 0, dl = null, za(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (Os(u)) {
                mt = 0, dl = null, S0(l);
                break;
              }
              l = function() {
                mt !== 2 && mt !== 9 || St !== t || (mt = 7), jl(t);
              }, u.then(l, l);
              break t;
            case 3:
              mt = 7;
              break t;
            case 4:
              mt = 5;
              break t;
            case 7:
              Os(u) ? (mt = 0, dl = null, S0(l)) : (mt = 0, dl = null, za(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (lt.tag) {
                case 26:
                  i = lt.memoizedState;
                case 5:
                case 27:
                  var c = lt;
                  if (i ? u1(i) : c.stateNode.complete) {
                    mt = 0, dl = null;
                    var f = c.sibling;
                    if (f !== null) lt = f;
                    else {
                      var h = c.return;
                      h !== null ? (lt = h, zu(h)) : lt = null;
                    }
                    break l;
                  }
              }
              mt = 0, dl = null, za(t, l, u, 5);
              break;
            case 6:
              mt = 0, dl = null, za(t, l, u, 6);
              break;
            case 8:
              Nc(), Dt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        pd();
        break;
      } catch (p) {
        y0(t, p);
      }
    while (!0);
    return Xl = je = null, b.H = a, b.A = n, st = e, lt !== null ? 0 : (St = null, at = 0, Xn(), Dt);
  }
  function pd() {
    for (; lt !== null && !X1(); )
      b0(lt);
  }
  function b0(t) {
    var l = Lo(t.alternate, t, Fl);
    t.memoizedProps = t.pendingProps, l === null ? zu(t) : lt = l;
  }
  function S0(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Bo(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          at
        );
        break;
      case 11:
        l = Bo(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          at
        );
        break;
      case 5:
        Wi(l);
      default:
        Vo(e, l), l = lt = gs(l, Fl), l = Lo(e, l, Fl);
    }
    t.memoizedProps = t.pendingProps, l === null ? zu(t) : lt = l;
  }
  function za(t, l, e, a) {
    Xl = je = null, Wi(l), ra = null, Ja = 0;
    var n = l.return;
    try {
      if (id(
        t,
        n,
        l,
        e,
        at
      )) {
        Dt = 1, su(
          t,
          bl(e, t.current)
        ), lt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw lt = n, u;
      Dt = 1, su(
        t,
        bl(e, t.current)
      ), lt = null;
      return;
    }
    l.flags & 32768 ? (ut || a === 1 ? t = !0 : pa || (at & 536870912) !== 0 ? t = !1 : (me = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ol.current, a !== null && a.tag === 13 && (a.flags |= 16384))), E0(l, t)) : zu(l);
  }
  function zu(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        E0(
          l,
          me
        );
        return;
      }
      t = l.return;
      var e = sd(
        l.alternate,
        l,
        Fl
      );
      if (e !== null) {
        lt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        lt = l;
        return;
      }
      lt = l = t;
    } while (l !== null);
    Dt === 0 && (Dt = 5);
  }
  function E0(t, l) {
    do {
      var e = od(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, lt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        lt = t;
        return;
      }
      lt = t = e;
    } while (t !== null);
    Dt = 6, lt = null;
  }
  function z0(t, l, e, a, n, u, i, c, f) {
    t.cancelPendingCommit = null;
    do
      xu();
    while (Yt !== 0);
    if ((st & 6) !== 0) throw Error(r(327));
    if (l !== null) {
      if (l === t.current) throw Error(r(177));
      if (u = l.lanes | l.childLanes, u |= Ei, F1(
        t,
        e,
        u,
        i,
        c,
        f
      ), t === St && (lt = St = null, at = 0), Sa = l, ve = t, Il = e, Dc = u, Cc = n, r0 = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, zd(An, function() {
        return M0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = b.T, b.T = null, n = O.p, O.p = 2, i = st, st |= 4;
        try {
          rd(t, l, e);
        } finally {
          st = i, O.p = n, b.T = a;
        }
      }
      Yt = 1, x0(), T0(), A0();
    }
  }
  function x0() {
    if (Yt === 1) {
      Yt = 0;
      var t = ve, l = Sa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = b.T, b.T = null;
        var a = O.p;
        O.p = 2;
        var n = st;
        st |= 4;
        try {
          a0(l, t);
          var u = Vc, i = fs(t.containerInfo), c = u.focusedElem, f = u.selectionRange;
          if (i !== c && c && c.ownerDocument && cs(
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
                  var g = y.getSelection(), N = c.textContent.length, G = Math.min(f.start, N), pt = f.end === void 0 ? G : Math.min(f.end, N);
                  !g.extend && G > pt && (i = pt, pt = G, G = i);
                  var d = is(
                    c,
                    G
                  ), s = is(
                    c,
                    pt
                  );
                  if (d && s && (g.rangeCount !== 1 || g.anchorNode !== d.node || g.anchorOffset !== d.offset || g.focusNode !== s.node || g.focusOffset !== s.offset)) {
                    var m = E.createRange();
                    m.setStart(d.node, d.offset), g.removeAllRanges(), G > pt ? (g.addRange(m), g.extend(s.node, s.offset)) : (m.setEnd(s.node, s.offset), g.addRange(m));
                  }
                }
              }
            }
            for (E = [], g = c; g = g.parentNode; )
              g.nodeType === 1 && E.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < E.length; c++) {
              var S = E[c];
              S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
            }
          }
          Ru = !!wc, Vc = wc = null;
        } finally {
          st = n, O.p = a, b.T = e;
        }
      }
      t.current = l, Yt = 2;
    }
  }
  function T0() {
    if (Yt === 2) {
      Yt = 0;
      var t = ve, l = Sa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = b.T, b.T = null;
        var a = O.p;
        O.p = 2;
        var n = st;
        st |= 4;
        try {
          Io(t, l.alternate, l);
        } finally {
          st = n, O.p = a, b.T = e;
        }
      }
      Yt = 3;
    }
  }
  function A0() {
    if (Yt === 4 || Yt === 3) {
      Yt = 0, Q1();
      var t = ve, l = Sa, e = Il, a = r0;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Yt = 5 : (Yt = 0, Sa = ve = null, _0(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (ye = null), Fu(e), l = l.stateNode, il && typeof il.onCommitFiberRoot == "function")
        try {
          il.onCommitFiberRoot(
            Da,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = b.T, n = O.p, O.p = 2, b.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            u(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          b.T = l, O.p = n;
        }
      }
      (Il & 3) !== 0 && xu(), jl(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === Uc ? rn++ : (rn = 0, Uc = t) : rn = 0, dn(0);
    }
  }
  function _0(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Va(l)));
  }
  function xu() {
    return x0(), T0(), A0(), M0();
  }
  function M0() {
    if (Yt !== 5) return !1;
    var t = ve, l = Dc;
    Dc = 0;
    var e = Fu(Il), a = b.T, n = O.p;
    try {
      O.p = 32 > e ? 32 : e, b.T = null, e = Cc, Cc = null;
      var u = ve, i = Il;
      if (Yt = 0, Sa = ve = null, Il = 0, (st & 6) !== 0) throw Error(r(331));
      var c = st;
      if (st |= 4, f0(u.current), u0(
        u,
        u.current,
        i,
        e
      ), st = c, dn(0, !1), il && typeof il.onPostCommitFiberRoot == "function")
        try {
          il.onPostCommitFiberRoot(Da, u);
        } catch {
        }
      return !0;
    } finally {
      O.p = n, b.T = a, _0(t, l);
    }
  }
  function O0(t, l, e) {
    l = bl(e, l), l = sc(t.stateNode, l, 2), t = se(t, l, 2), t !== null && (Ua(t, 2), jl(t));
  }
  function ht(t, l, e) {
    if (t.tag === 3)
      O0(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          O0(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ye === null || !ye.has(a))) {
            t = bl(e, t), e = Do(2), a = se(l, e, 2), a !== null && (Co(
              e,
              a,
              l,
              t
            ), Ua(a, 2), jl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function jc(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new hd();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (_c = !0, n.add(e), t = bd.bind(null, t, l, e), l.then(t, t));
  }
  function bd(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, St === t && (at & e) === e && (Dt === 4 || Dt === 3 && (at & 62914560) === at && 300 > ul() - gu ? (st & 2) === 0 && Ea(t, 0) : Mc |= e, ba === at && (ba = 0)), jl(t);
  }
  function D0(t, l) {
    l === 0 && (l = zf()), t = Ue(t, l), t !== null && (Ua(t, l), jl(t));
  }
  function Sd(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), D0(t, e);
  }
  function Ed(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(l), D0(t, e);
  }
  function zd(t, l) {
    return Ju(t, l);
  }
  var Tu = null, xa = null, Rc = !1, Au = !1, qc = !1, pe = 0;
  function jl(t) {
    t !== xa && t.next === null && (xa === null ? Tu = xa = t : xa = xa.next = t), Au = !0, Rc || (Rc = !0, Td());
  }
  function dn(t, l) {
    if (!qc && Au) {
      qc = !0;
      do
        for (var e = !1, a = Tu; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              u = (1 << 31 - cl(42 | t) + 1) - 1, u &= n & ~(i & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, H0(a, u));
          } else
            u = at, u = Dn(
              a,
              a === St ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Ca(a, u) || (e = !0, H0(a, u));
          a = a.next;
        }
      while (e);
      qc = !1;
    }
  }
  function xd() {
    C0();
  }
  function C0() {
    Au = Rc = !1;
    var t = 0;
    pe !== 0 && jd() && (t = pe);
    for (var l = ul(), e = null, a = Tu; a !== null; ) {
      var n = a.next, u = U0(a, l);
      u === 0 ? (a.next = null, e === null ? Tu = n : e.next = n, n === null && (xa = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (Au = !0)), a = n;
    }
    Yt !== 0 && Yt !== 5 || dn(t), pe !== 0 && (pe = 0);
  }
  function U0(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - cl(u), c = 1 << i, f = n[i];
      f === -1 ? ((c & e) === 0 || (c & a) !== 0) && (n[i] = $1(c, l)) : f <= l && (t.expiredLanes |= c), u &= ~c;
    }
    if (l = St, e = at, e = Dn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (mt === 2 || mt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Wu(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ca(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Wu(a), Fu(e)) {
        case 2:
        case 8:
          e = Sf;
          break;
        case 32:
          e = An;
          break;
        case 268435456:
          e = Ef;
          break;
        default:
          e = An;
      }
      return a = N0.bind(null, t), e = Ju(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Wu(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function N0(t, l) {
    if (Yt !== 0 && Yt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (xu() && t.callbackNode !== e)
      return null;
    var a = at;
    return a = Dn(
      t,
      t === St ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (m0(t, a, l), U0(t, ul()), t.callbackNode != null && t.callbackNode === e ? N0.bind(null, t) : null);
  }
  function H0(t, l) {
    if (xu()) return null;
    m0(t, l, !0);
  }
  function Td() {
    qd(function() {
      (st & 6) !== 0 ? Ju(
        bf,
        xd
      ) : C0();
    });
  }
  function Bc() {
    if (pe === 0) {
      var t = fa;
      t === 0 && (t = _n, _n <<= 1, (_n & 261888) === 0 && (_n = 256)), pe = t;
    }
    return pe;
  }
  function j0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Hn("" + t);
  }
  function R0(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Ad(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = j0(
        (n[It] || null).action
      ), i = a.submitter;
      i && (l = (l = i[It] || null) ? j0(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var c = new Bn(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (pe !== 0) {
                  var f = i ? R0(n, i) : new FormData(n);
                  ac(
                    e,
                    {
                      pending: !0,
                      data: f,
                      method: n.method,
                      action: u
                    },
                    null,
                    f
                  );
                }
              } else
                typeof u == "function" && (c.preventDefault(), f = i ? R0(n, i) : new FormData(n), ac(
                  e,
                  {
                    pending: !0,
                    data: f,
                    method: n.method,
                    action: u
                  },
                  u,
                  f
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Yc = 0; Yc < Si.length; Yc++) {
    var Gc = Si[Yc], _d = Gc.toLowerCase(), Md = Gc[0].toUpperCase() + Gc.slice(1);
    Ol(
      _d,
      "on" + Md
    );
  }
  Ol(rs, "onAnimationEnd"), Ol(ds, "onAnimationIteration"), Ol(ms, "onAnimationStart"), Ol("dblclick", "onDoubleClick"), Ol("focusin", "onFocus"), Ol("focusout", "onBlur"), Ol(Lr, "onTransitionRun"), Ol(wr, "onTransitionStart"), Ol(Vr, "onTransitionCancel"), Ol(hs, "onTransitionEnd"), We("onMouseEnter", ["mouseout", "mouseover"]), We("onMouseLeave", ["mouseout", "mouseover"]), We("onPointerEnter", ["pointerout", "pointerover"]), We("onPointerLeave", ["pointerout", "pointerover"]), Me(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Me(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Me("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Me(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Me(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Me(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var mn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Od = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mn)
  );
  function q0(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], f = c.instance, h = c.currentTarget;
            if (c = c.listener, f !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = h;
            try {
              u(n);
            } catch (p) {
              Zn(p);
            }
            n.currentTarget = null, u = f;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], f = c.instance, h = c.currentTarget, c = c.listener, f !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = h;
            try {
              u(n);
            } catch (p) {
              Zn(p);
            }
            n.currentTarget = null, u = f;
          }
      }
    }
  }
  function et(t, l) {
    var e = l[Iu];
    e === void 0 && (e = l[Iu] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (B0(l, t, 2, !1), e.add(a));
  }
  function Zc(t, l, e) {
    var a = 0;
    l && (a |= 4), B0(
      e,
      t,
      a,
      l
    );
  }
  var _u = "_reactListening" + Math.random().toString(36).slice(2);
  function Xc(t) {
    if (!t[_u]) {
      t[_u] = !0, Df.forEach(function(e) {
        e !== "selectionchange" && (Od.has(e) || Zc(e, !1, t), Zc(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[_u] || (l[_u] = !0, Zc("selectionchange", !1, l));
    }
  }
  function B0(t, l, e, a) {
    switch (d1(l)) {
      case 2:
        var n = em;
        break;
      case 8:
        n = am;
        break;
      default:
        n = ef;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !ci || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function Qc(t, l, e, a, n) {
    var u = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = Ve(c), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              a = u = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Xf(function() {
      var h = u, p = ui(e), E = [];
      t: {
        var y = ys.get(t);
        if (y !== void 0) {
          var g = Bn, N = t;
          switch (t) {
            case "keypress":
              if (Rn(e) === 0) break t;
            case "keydown":
            case "keyup":
              g = Er;
              break;
            case "focusin":
              N = "focus", g = ri;
              break;
            case "focusout":
              N = "blur", g = ri;
              break;
            case "beforeblur":
            case "afterblur":
              g = ri;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = wf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = sr;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Tr;
              break;
            case rs:
            case ds:
            case ms:
              g = dr;
              break;
            case hs:
              g = _r;
              break;
            case "scroll":
            case "scrollend":
              g = cr;
              break;
            case "wheel":
              g = Or;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = hr;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Kf;
              break;
            case "toggle":
            case "beforetoggle":
              g = Cr;
          }
          var G = (l & 4) !== 0, pt = !G && (t === "scroll" || t === "scrollend"), d = G ? y !== null ? y + "Capture" : null : y;
          G = [];
          for (var s = h, m; s !== null; ) {
            var S = s;
            if (m = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || m === null || d === null || (S = ja(s, d), S != null && G.push(
              hn(s, S, m)
            )), pt) break;
            s = s.return;
          }
          0 < G.length && (y = new g(
            y,
            N,
            null,
            e,
            p
          ), E.push({ event: y, listeners: G }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (y = t === "mouseover" || t === "pointerover", g = t === "mouseout" || t === "pointerout", y && e !== ni && (N = e.relatedTarget || e.fromElement) && (Ve(N) || N[we]))
            break t;
          if ((g || y) && (y = p.window === p ? p : (y = p.ownerDocument) ? y.defaultView || y.parentWindow : window, g ? (N = e.relatedTarget || e.toElement, g = h, N = N ? Ve(N) : null, N !== null && (pt = Z(N), G = N.tag, N !== pt || G !== 5 && G !== 27 && G !== 6) && (N = null)) : (g = null, N = h), g !== N)) {
            if (G = wf, S = "onMouseLeave", d = "onMouseEnter", s = "mouse", (t === "pointerout" || t === "pointerover") && (G = Kf, S = "onPointerLeave", d = "onPointerEnter", s = "pointer"), pt = g == null ? y : Ha(g), m = N == null ? y : Ha(N), y = new G(
              S,
              s + "leave",
              g,
              e,
              p
            ), y.target = pt, y.relatedTarget = m, S = null, Ve(p) === h && (G = new G(
              d,
              s + "enter",
              N,
              e,
              p
            ), G.target = m, G.relatedTarget = pt, S = G), pt = S, g && N)
              l: {
                for (G = Dd, d = g, s = N, m = 0, S = d; S; S = G(S))
                  m++;
                S = 0;
                for (var B = s; B; B = G(B))
                  S++;
                for (; 0 < m - S; )
                  d = G(d), m--;
                for (; 0 < S - m; )
                  s = G(s), S--;
                for (; m--; ) {
                  if (d === s || s !== null && d === s.alternate) {
                    G = d;
                    break l;
                  }
                  d = G(d), s = G(s);
                }
                G = null;
              }
            else G = null;
            g !== null && Y0(
              E,
              y,
              g,
              G,
              !1
            ), N !== null && pt !== null && Y0(
              E,
              pt,
              N,
              G,
              !0
            );
          }
        }
        t: {
          if (y = h ? Ha(h) : window, g = y.nodeName && y.nodeName.toLowerCase(), g === "select" || g === "input" && y.type === "file")
            var ct = ts;
          else if (If(y))
            if (ls)
              ct = Zr;
            else {
              ct = Yr;
              var R = Br;
            }
          else
            g = y.nodeName, !g || g.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? h && ai(h.elementType) && (ct = ts) : ct = Gr;
          if (ct && (ct = ct(t, h))) {
            Pf(
              E,
              ct,
              e,
              p
            );
            break t;
          }
          R && R(t, y, h), t === "focusout" && h && y.type === "number" && h.memoizedProps.value != null && ei(y, "number", y.value);
        }
        switch (R = h ? Ha(h) : window, t) {
          case "focusin":
            (If(R) || R.contentEditable === "true") && (ta = R, gi = h, Qa = null);
            break;
          case "focusout":
            Qa = gi = ta = null;
            break;
          case "mousedown":
            pi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pi = !1, ss(E, e, p);
            break;
          case "selectionchange":
            if (Qr) break;
          case "keydown":
          case "keyup":
            ss(E, e, p);
        }
        var $;
        if (mi)
          t: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break t;
              case "compositionend":
                nt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break t;
            }
            nt = void 0;
          }
        else
          Pe ? $f(t, e) && (nt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (nt = "onCompositionStart");
        nt && (Jf && e.locale !== "ko" && (Pe || nt !== "onCompositionStart" ? nt === "onCompositionEnd" && Pe && ($ = Qf()) : (ee = p, fi = "value" in ee ? ee.value : ee.textContent, Pe = !0)), R = Mu(h, nt), 0 < R.length && (nt = new Vf(
          nt,
          t,
          null,
          e,
          p
        ), E.push({ event: nt, listeners: R }), $ ? nt.data = $ : ($ = Ff(e), $ !== null && (nt.data = $)))), ($ = Nr ? Hr(t, e) : jr(t, e)) && (nt = Mu(h, "onBeforeInput"), 0 < nt.length && (R = new Vf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          p
        ), E.push({
          event: R,
          listeners: nt
        }), R.data = $)), Ad(
          E,
          t,
          h,
          e,
          p
        );
      }
      q0(E, l);
    });
  }
  function hn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Mu(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = ja(t, e), n != null && a.unshift(
        hn(t, n, u)
      ), n = ja(t, l), n != null && a.push(
        hn(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Dd(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Y0(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, f = c.alternate, h = c.stateNode;
      if (c = c.tag, f !== null && f === a) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (f = h, n ? (h = ja(e, u), h != null && i.unshift(
        hn(e, h, f)
      )) : n || (h = ja(e, u), h != null && i.push(
        hn(e, h, f)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Cd = /\r\n?/g, Ud = /\u0000|\uFFFD/g;
  function G0(t) {
    return (typeof t == "string" ? t : "" + t).replace(Cd, `
`).replace(Ud, "");
  }
  function Z0(t, l) {
    return l = G0(l), G0(t) === l;
  }
  function gt(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || $e(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && $e(t, "" + a);
        break;
      case "className":
        Un(t, "class", a);
        break;
      case "tabIndex":
        Un(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Un(t, e, a);
        break;
      case "style":
        Gf(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Un(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Hn("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (l !== "input" && gt(t, l, "name", n.name, n, null), gt(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), gt(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), gt(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (gt(t, l, "encType", n.encType, n, null), gt(t, l, "method", n.method, n, null), gt(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Hn("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Bl);
        break;
      case "onScroll":
        a != null && et("scroll", t);
        break;
      case "onScrollEnd":
        a != null && et("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = Hn("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        et("beforetoggle", t), et("toggle", t), Cn(t, "popover", a);
        break;
      case "xlinkActuate":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        ql(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        ql(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Cn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = ur.get(e) || e, Cn(t, e, a));
    }
  }
  function Lc(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        Gf(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? $e(t, a) : (typeof a == "number" || typeof a == "bigint") && $e(t, "" + a);
        break;
      case "onScroll":
        a != null && et("scroll", t);
        break;
      case "onScrollEnd":
        a != null && et("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Bl);
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
        if (!Cf.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[It] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Cn(t, e, a);
          }
    }
  }
  function Vt(t, l, e) {
    switch (l) {
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
        et("error", t), et("load", t);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, l));
                default:
                  gt(t, l, u, i, e, null);
              }
          }
        n && gt(t, l, "srcSet", e.srcSet, e, null), a && gt(t, l, "src", e.src, e, null);
        return;
      case "input":
        et("invalid", t);
        var c = u = i = n = null, f = null, h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var p = e[a];
            if (p != null)
              switch (a) {
                case "name":
                  n = p;
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
                  u = p;
                  break;
                case "defaultValue":
                  c = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p != null)
                    throw Error(r(137, l));
                  break;
                default:
                  gt(t, l, a, p, e, null);
              }
          }
        Rf(
          t,
          u,
          c,
          f,
          h,
          i,
          n,
          !1
        );
        return;
      case "select":
        et("invalid", t), a = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (c = e[n], c != null))
            switch (n) {
              case "value":
                u = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                gt(t, l, n, c, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? ke(t, !!a, l, !1) : e != null && ke(t, !!a, e, !0);
        return;
      case "textarea":
        et("invalid", t), u = n = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                n = c;
                break;
              case "children":
                u = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(r(91));
                break;
              default:
                gt(t, l, i, c, e, null);
            }
        Bf(t, a, n, u);
        return;
      case "option":
        for (f in e)
          if (e.hasOwnProperty(f) && (a = e[f], a != null))
            switch (f) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                gt(t, l, f, a, e, null);
            }
        return;
      case "dialog":
        et("beforetoggle", t), et("toggle", t), et("cancel", t), et("close", t);
        break;
      case "iframe":
      case "object":
        et("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < mn.length; a++)
          et(mn[a], t);
        break;
      case "image":
        et("error", t), et("load", t);
        break;
      case "details":
        et("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        et("error", t), et("load", t);
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
        for (h in e)
          if (e.hasOwnProperty(h) && (a = e[h], a != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, l));
              default:
                gt(t, l, h, a, e, null);
            }
        return;
      default:
        if (ai(l)) {
          for (p in e)
            e.hasOwnProperty(p) && (a = e[p], a !== void 0 && Lc(
              t,
              l,
              p,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && gt(t, l, c, a, e, null));
  }
  function Nd(t, l, e, a) {
    switch (l) {
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
        var n = null, u = null, i = null, c = null, f = null, h = null, p = null;
        for (g in e) {
          var E = e[g];
          if (e.hasOwnProperty(g) && E != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = E;
              default:
                a.hasOwnProperty(g) || gt(t, l, g, null, a, E);
            }
        }
        for (var y in a) {
          var g = a[y];
          if (E = e[y], a.hasOwnProperty(y) && (g != null || E != null))
            switch (y) {
              case "type":
                u = g;
                break;
              case "name":
                n = g;
                break;
              case "checked":
                h = g;
                break;
              case "defaultChecked":
                p = g;
                break;
              case "value":
                i = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(r(137, l));
                break;
              default:
                g !== E && gt(
                  t,
                  l,
                  y,
                  g,
                  a,
                  E
                );
            }
        }
        li(
          t,
          i,
          c,
          f,
          h,
          p,
          u,
          n
        );
        return;
      case "select":
        g = i = c = y = null;
        for (u in e)
          if (f = e[u], e.hasOwnProperty(u) && f != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                g = f;
              default:
                a.hasOwnProperty(u) || gt(
                  t,
                  l,
                  u,
                  null,
                  a,
                  f
                );
            }
        for (n in a)
          if (u = a[n], f = e[n], a.hasOwnProperty(n) && (u != null || f != null))
            switch (n) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                c = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== f && gt(
                  t,
                  l,
                  n,
                  u,
                  a,
                  f
                );
            }
        l = c, e = i, a = g, y != null ? ke(t, !!e, y, !1) : !!a != !!e && (l != null ? ke(t, !!e, l, !0) : ke(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = y = null;
        for (c in e)
          if (n = e[c], e.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                gt(t, l, c, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                y = n;
                break;
              case "defaultValue":
                g = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && gt(t, l, i, n, a, u);
            }
        qf(t, y, g);
        return;
      case "option":
        for (var N in e)
          if (y = e[N], e.hasOwnProperty(N) && y != null && !a.hasOwnProperty(N))
            switch (N) {
              case "selected":
                t.selected = !1;
                break;
              default:
                gt(
                  t,
                  l,
                  N,
                  null,
                  a,
                  y
                );
            }
        for (f in a)
          if (y = a[f], g = e[f], a.hasOwnProperty(f) && y !== g && (y != null || g != null))
            switch (f) {
              case "selected":
                t.selected = y && typeof y != "function" && typeof y != "symbol";
                break;
              default:
                gt(
                  t,
                  l,
                  f,
                  y,
                  a,
                  g
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
        for (var G in e)
          y = e[G], e.hasOwnProperty(G) && y != null && !a.hasOwnProperty(G) && gt(t, l, G, null, a, y);
        for (h in a)
          if (y = a[h], g = e[h], a.hasOwnProperty(h) && y !== g && (y != null || g != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(r(137, l));
                break;
              default:
                gt(
                  t,
                  l,
                  h,
                  y,
                  a,
                  g
                );
            }
        return;
      default:
        if (ai(l)) {
          for (var pt in e)
            y = e[pt], e.hasOwnProperty(pt) && y !== void 0 && !a.hasOwnProperty(pt) && Lc(
              t,
              l,
              pt,
              void 0,
              a,
              y
            );
          for (p in a)
            y = a[p], g = e[p], !a.hasOwnProperty(p) || y === g || y === void 0 && g === void 0 || Lc(
              t,
              l,
              p,
              y,
              a,
              g
            );
          return;
        }
    }
    for (var d in e)
      y = e[d], e.hasOwnProperty(d) && y != null && !a.hasOwnProperty(d) && gt(t, l, d, null, a, y);
    for (E in a)
      y = a[E], g = e[E], !a.hasOwnProperty(E) || y === g || y == null && g == null || gt(t, l, E, y, a, g);
  }
  function X0(t) {
    switch (t) {
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
  function Hd() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, c = n.duration;
        if (u && c && X0(i)) {
          for (i = 0, c = n.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], h = f.startTime;
            if (h > c) break;
            var p = f.transferSize, E = f.initiatorType;
            p && X0(E) && (f = f.responseEnd, i += p * (f < c ? 1 : (c - h) / (f - h)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var wc = null, Vc = null;
  function Ou(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Q0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function L0(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function Kc(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Jc = null;
  function jd() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Jc ? !1 : (Jc = t, !0) : (Jc = null, !1);
  }
  var w0 = typeof setTimeout == "function" ? setTimeout : void 0, Rd = typeof clearTimeout == "function" ? clearTimeout : void 0, V0 = typeof Promise == "function" ? Promise : void 0, qd = typeof queueMicrotask == "function" ? queueMicrotask : typeof V0 < "u" ? function(t) {
    return V0.resolve(null).then(t).catch(Bd);
  } : w0;
  function Bd(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function be(t) {
    return t === "head";
  }
  function K0(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Ma(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          yn(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, yn(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, c = u.nodeName;
            u[Na] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && yn(t.ownerDocument.body);
      e = n;
    } while (e);
    Ma(l);
  }
  function J0(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function Wc(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Wc(e), Pu(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function Yd(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Na])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Tl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Gd(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Tl(t.nextSibling), t === null)) return null;
    return t;
  }
  function W0(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Tl(t.nextSibling), t === null)) return null;
    return t;
  }
  function kc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function $c(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Zd(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Tl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var Fc = null;
  function k0(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Tl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function $0(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function F0(t, l, e) {
    switch (l = Ou(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function yn(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Pu(t);
  }
  var Al = /* @__PURE__ */ new Map(), I0 = /* @__PURE__ */ new Set();
  function Du(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Pl = O.d;
  O.d = {
    f: Xd,
    r: Qd,
    D: Ld,
    C: wd,
    L: Vd,
    m: Kd,
    X: Wd,
    S: Jd,
    M: kd
  };
  function Xd() {
    var t = Pl.f(), l = Su();
    return t || l;
  }
  function Qd(t) {
    var l = Ke(t);
    l !== null && l.tag === 5 && l.type === "form" ? yo(l) : Pl.r(t);
  }
  var Ta = typeof document > "u" ? null : document;
  function P0(t, l, e) {
    var a = Ta;
    if (a && typeof l == "string" && l) {
      var n = gl(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), I0.has(n) || (I0.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), Vt(l, "link", t), Gt(l), a.head.appendChild(l)));
    }
  }
  function Ld(t) {
    Pl.D(t), P0("dns-prefetch", t, null);
  }
  function wd(t, l) {
    Pl.C(t, l), P0("preconnect", t, l);
  }
  function Vd(t, l, e) {
    Pl.L(t, l, e);
    var a = Ta;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + gl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + gl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + gl(
        e.imageSizes
      ) + '"]')) : n += '[href="' + gl(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = Aa(t);
          break;
        case "script":
          u = _a(t);
      }
      Al.has(u) || (t = C(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Al.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(vn(u)) || l === "script" && a.querySelector(gn(u)) || (l = a.createElement("link"), Vt(l, "link", t), Gt(l), a.head.appendChild(l)));
    }
  }
  function Kd(t, l) {
    Pl.m(t, l);
    var e = Ta;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + gl(a) + '"][href="' + gl(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = _a(t);
      }
      if (!Al.has(u) && (t = C({ rel: "modulepreload", href: t }, l), Al.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(gn(u)))
              return;
        }
        a = e.createElement("link"), Vt(a, "link", t), Gt(a), e.head.appendChild(a);
      }
    }
  }
  function Jd(t, l, e) {
    Pl.S(t, l, e);
    var a = Ta;
    if (a && t) {
      var n = Je(a).hoistableStyles, u = Aa(t);
      l = l || "default";
      var i = n.get(u);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          vn(u)
        ))
          c.loading = 5;
        else {
          t = C(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Al.get(u)) && Ic(t, e);
          var f = i = a.createElement("link");
          Gt(f), Vt(f, "link", t), f._p = new Promise(function(h, p) {
            f.onload = h, f.onerror = p;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Cu(i, l, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, n.set(u, i);
      }
    }
  }
  function Wd(t, l) {
    Pl.X(t, l);
    var e = Ta;
    if (e && t) {
      var a = Je(e).hoistableScripts, n = _a(t), u = a.get(n);
      u || (u = e.querySelector(gn(n)), u || (t = C({ src: t, async: !0 }, l), (l = Al.get(n)) && Pc(t, l), u = e.createElement("script"), Gt(u), Vt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function kd(t, l) {
    Pl.M(t, l);
    var e = Ta;
    if (e && t) {
      var a = Je(e).hoistableScripts, n = _a(t), u = a.get(n);
      u || (u = e.querySelector(gn(n)), u || (t = C({ src: t, async: !0, type: "module" }, l), (l = Al.get(n)) && Pc(t, l), u = e.createElement("script"), Gt(u), Vt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function t1(t, l, e, a) {
    var n = (n = tt.current) ? Du(n) : null;
    if (!n) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Aa(e.href), e = Je(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Aa(e.href);
          var u = Je(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            vn(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Al.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Al.set(t, e), u || $d(
            n,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(r(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = _a(e), e = Je(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function Aa(t) {
    return 'href="' + gl(t) + '"';
  }
  function vn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function l1(t) {
    return C({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function $d(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), Vt(l, "link", e), Gt(l), t.head.appendChild(l));
  }
  function _a(t) {
    return '[src="' + gl(t) + '"]';
  }
  function gn(t) {
    return "script[async]" + t;
  }
  function e1(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + gl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Gt(a), a;
          var n = C({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Gt(a), Vt(a, "style", n), Cu(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = Aa(e.href);
          var u = t.querySelector(
            vn(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Gt(u), u;
          a = l1(e), (n = Al.get(n)) && Ic(a, n), u = (t.ownerDocument || t).createElement("link"), Gt(u);
          var i = u;
          return i._p = new Promise(function(c, f) {
            i.onload = c, i.onerror = f;
          }), Vt(u, "link", a), l.state.loading |= 4, Cu(u, e.precedence, t), l.instance = u;
        case "script":
          return u = _a(e.src), (n = t.querySelector(
            gn(u)
          )) ? (l.instance = n, Gt(n), n) : (a = e, (n = Al.get(u)) && (a = C({}, e), Pc(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Gt(n), Vt(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(r(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Cu(a, e.precedence, t));
    return l.instance;
  }
  function Cu(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) u = c;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function Ic(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Pc(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Uu = null;
  function a1(t, l, e) {
    if (Uu === null) {
      var a = /* @__PURE__ */ new Map(), n = Uu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Uu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Na] || u[Xt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function n1(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Fd(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function u1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Id(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Aa(a.href), u = l.querySelector(
          vn(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Nu.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Gt(u);
          return;
        }
        u = l.ownerDocument || l, a = l1(a), (n = Al.get(n)) && Ic(a, n), u = u.createElement("link"), Gt(u);
        var i = u;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), Vt(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Nu.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var tf = 0;
  function Pd(t, l) {
    return t.stylesheets && t.count === 0 && ju(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && ju(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && tf === 0 && (tf = 62500 * Hd());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ju(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > tf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Nu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ju(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Hu = null;
  function ju(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Hu = /* @__PURE__ */ new Map(), l.forEach(tm, t), Hu = null, Nu.call(t));
  }
  function tm(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Hu.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Hu.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = Nu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var pn = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function lm(t, l, e, a, n, u, i, c, f) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ku(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ku(0), this.hiddenUpdates = ku(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function i1(t, l, e, a, n, u, i, c, f, h, p, E) {
    return t = new lm(
      t,
      l,
      e,
      i,
      f,
      h,
      p,
      E,
      c
    ), l = 1, u === !0 && (l |= 24), u = sl(3, null, null, l), t.current = u, u.stateNode = t, l = Hi(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Bi(u), t;
  }
  function c1(t) {
    return t ? (t = aa, t) : aa;
  }
  function f1(t, l, e, a, n, u) {
    n = c1(n), a.context === null ? a.context = n : a.pendingContext = n, a = fe(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = se(t, a, l), e !== null && (nl(e, t, l), ka(e, t, l));
  }
  function s1(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function lf(t, l) {
    s1(t, l), (t = t.alternate) && s1(t, l);
  }
  function o1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ue(t, 67108864);
      l !== null && nl(l, t, 67108864), lf(t, 67108864);
    }
  }
  function r1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = hl();
      l = $u(l);
      var e = Ue(t, l);
      e !== null && nl(e, t, l), lf(t, l);
    }
  }
  var Ru = !0;
  function em(t, l, e, a) {
    var n = b.T;
    b.T = null;
    var u = O.p;
    try {
      O.p = 2, ef(t, l, e, a);
    } finally {
      O.p = u, b.T = n;
    }
  }
  function am(t, l, e, a) {
    var n = b.T;
    b.T = null;
    var u = O.p;
    try {
      O.p = 8, ef(t, l, e, a);
    } finally {
      O.p = u, b.T = n;
    }
  }
  function ef(t, l, e, a) {
    if (Ru) {
      var n = af(a);
      if (n === null)
        Qc(
          t,
          l,
          a,
          qu,
          e
        ), m1(t, a);
      else if (um(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (m1(t, a), l & 4 && -1 < nm.indexOf(t)) {
        for (; n !== null; ) {
          var u = Ke(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = _e(u.pendingLanes);
                  if (i !== 0) {
                    var c = u;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - cl(i);
                      c.entanglements[1] |= f, i &= ~f;
                    }
                    jl(u), (st & 6) === 0 && (pu = ul() + 500, dn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ue(u, 2), c !== null && nl(c, u, 2), Su(), lf(u, 2);
            }
          if (u = af(a), u === null && Qc(
            t,
            l,
            a,
            qu,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Qc(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function af(t) {
    return t = ui(t), nf(t);
  }
  var qu = null;
  function nf(t) {
    if (qu = null, t = Ve(t), t !== null) {
      var l = Z(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = K(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = P(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return qu = t, null;
  }
  function d1(t) {
    switch (t) {
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
        switch (L1()) {
          case bf:
            return 2;
          case Sf:
            return 8;
          case An:
          case w1:
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
  var uf = !1, Se = null, Ee = null, ze = null, bn = /* @__PURE__ */ new Map(), Sn = /* @__PURE__ */ new Map(), xe = [], nm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function m1(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Se = null;
        break;
      case "dragenter":
      case "dragleave":
        Ee = null;
        break;
      case "mouseover":
      case "mouseout":
        ze = null;
        break;
      case "pointerover":
      case "pointerout":
        bn.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Sn.delete(l.pointerId);
    }
  }
  function En(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = Ke(l), l !== null && o1(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function um(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return Se = En(
          Se,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Ee = En(
          Ee,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return ze = En(
          ze,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return bn.set(
          u,
          En(
            bn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Sn.set(
          u,
          En(
            Sn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function h1(t) {
    var l = Ve(t.target);
    if (l !== null) {
      var e = Z(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = K(e), l !== null) {
            t.blockedOn = l, Mf(t.priority, function() {
              r1(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = P(e), l !== null) {
            t.blockedOn = l, Mf(t.priority, function() {
              r1(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Bu(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = af(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        ni = a, e.target.dispatchEvent(a), ni = null;
      } else
        return l = Ke(e), l !== null && o1(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function y1(t, l, e) {
    Bu(t) && e.delete(l);
  }
  function im() {
    uf = !1, Se !== null && Bu(Se) && (Se = null), Ee !== null && Bu(Ee) && (Ee = null), ze !== null && Bu(ze) && (ze = null), bn.forEach(y1), Sn.forEach(y1);
  }
  function Yu(t, l) {
    t.blockedOn === l && (t.blockedOn = null, uf || (uf = !0, v.unstable_scheduleCallback(
      v.unstable_NormalPriority,
      im
    )));
  }
  var Gu = null;
  function v1(t) {
    Gu !== t && (Gu = t, v.unstable_scheduleCallback(
      v.unstable_NormalPriority,
      function() {
        Gu === t && (Gu = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (nf(a || e) === null)
              continue;
            break;
          }
          var u = Ke(e);
          u !== null && (t.splice(l, 3), l -= 3, ac(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Ma(t) {
    function l(f) {
      return Yu(f, t);
    }
    Se !== null && Yu(Se, t), Ee !== null && Yu(Ee, t), ze !== null && Yu(ze, t), bn.forEach(l), Sn.forEach(l);
    for (var e = 0; e < xe.length; e++) {
      var a = xe[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < xe.length && (e = xe[0], e.blockedOn === null); )
      h1(e), e.blockedOn === null && xe.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[It] || null;
        if (typeof u == "function")
          i || v1(e);
        else if (i) {
          var c = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[It] || null)
              c = i.formAction;
            else if (nf(n) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), v1(e);
        }
      }
  }
  function g1() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), n !== null && (n(), n = null);
      };
    }
  }
  function cf(t) {
    this._internalRoot = t;
  }
  Zu.prototype.render = cf.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(r(409));
    var e = l.current, a = hl();
    f1(e, a, t, l, null, null);
  }, Zu.prototype.unmount = cf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      f1(t.current, 2, null, t, null, null), Su(), l[we] = null;
    }
  };
  function Zu(t) {
    this._internalRoot = t;
  }
  Zu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = _f();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < xe.length && l !== 0 && l < xe[e].priority; e++) ;
      xe.splice(e, 0, t), e === 0 && h1(t);
    }
  };
  var p1 = M.version;
  if (p1 !== "19.2.0")
    throw Error(
      r(
        527,
        p1,
        "19.2.0"
      )
    );
  O.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = z(l), t = t !== null ? w(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var cm = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: b,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xu.isDisabled && Xu.supportsFiber)
      try {
        Da = Xu.inject(
          cm
        ), il = Xu;
      } catch {
      }
  }
  return xn.createRoot = function(t, l) {
    if (!X(t)) throw Error(r(299));
    var e = !1, a = "", n = Ao, u = _o, i = Mo;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = i1(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      i,
      g1
    ), t[we] = l.current, Xc(t), new cf(l);
  }, xn.hydrateRoot = function(t, l, e) {
    if (!X(t)) throw Error(r(299));
    var a = !1, n = "", u = Ao, i = _o, c = Mo, f = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), l = i1(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      f,
      u,
      i,
      c,
      g1
    ), l.context = c1(null), e = l.current, a = hl(), a = $u(a), n = fe(a), n.callback = null, se(e, n, a), e = a, l.current.lanes = e, Ua(l, e), jl(l), t[we] = l.current, Xc(t), new Zu(l);
  }, xn.version = "19.2.0", xn;
}
var O1;
function bm() {
  if (O1) return sf.exports;
  O1 = 1;
  function v() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v);
      } catch (M) {
        console.error(M);
      }
  }
  return v(), sf.exports = pm(), sf.exports;
}
var Sm = bm();
const j1 = {
  "👏": "clap",
  "💗": "heart",
  "🔥": "fire",
  "🙌": "celebrate",
  "🏐": "volleyball",
  "💪": "strong"
}, Em = Object.fromEntries(
  Object.entries(j1).map(([v, M]) => [M, v])
), D1 = ["lavender", "blue", "green", "gold"], yf = (v) => v !== null && typeof v == "object" && !Array.isArray(v) ? v : {}, yl = (v) => typeof v == "string" ? v : "", zm = (v) => {
  const M = yf(v);
  return yf(M.data);
}, xm = (v) => {
  const M = yl(v);
  return M === "host" || M === "moderator" ? "Coach" : M === "teammate" ? "Teammate" : "Fan";
}, Tm = (v) => {
  const M = Array.from(v).reduce(
    (T, r) => T + r.charCodeAt(0),
    0
  ) % D1.length;
  return D1[M] ?? "lavender";
}, Am = (v) => v.trim().split(/\s+/).slice(0, 2).map((M) => M.charAt(0).toUpperCase()).join("") || "FV", R1 = (v) => {
  const M = yf(v), T = yl(M.type);
  if (T !== "text" && T !== "cheer") return null;
  const r = yl(M.id), X = yl(M.display_name) || "Fan", Z = yl(M.body), K = T === "cheer" ? `Cheered ${Em[Z] ?? "👏"}` : Z;
  return !r || !K ? null : {
    id: r,
    author: X,
    initials: Am(X),
    role: xm(M.role),
    body: K,
    avatarTone: Tm(X),
    reactions: [],
    moderated: yl(M.moderation_status) !== "visible",
    own: M.is_own === !0
  };
}, _m = (v) => Array.isArray(v) ? v.map(R1).filter((M) => M !== null) : [], hf = (v) => ({
  connection: v.connection,
  participantCount: v.participantCount,
  // Public FanView rooms use the lightweight cheers mode for both curated
  // reactions and short friendly messages. Verified text remains reserved for
  // future private team/coach communities with a separate admission flow.
  canWriteText: v.status === "open" && (v.mode === "cheers" || v.mode === "verified_text"),
  messages: v.messages
});
class Mm extends Error {
  constructor(T, r) {
    super(T);
    Rl(this, "code");
    Rl(this, "retryable");
    Rl(this, "status");
    this.name = "FanViewCommunityGatewayError", this.code = r.code ?? "community_unavailable", this.retryable = r.retryable ?? !1, this.status = r.status;
  }
}
function Om(v) {
  var I;
  const M = v.fetch ?? globalThis.fetch.bind(globalThis), T = ((I = v.displayName) == null ? void 0 : I.trim().replace(/\s+/g, " ").slice(0, 24)) || "Fan", r = /* @__PURE__ */ new Map(), X = /* @__PURE__ */ new Map(), Z = (H) => {
    for (const q of X.get(H.shareId) ?? [])
      q(hf(H));
  }, K = async () => {
    const H = await v.client.auth.getSession();
    if (H.error) throw new Error(H.error.message);
    if (H.data.session) return H.data.session;
    const q = await v.client.auth.signInAnonymously();
    if (q.error) throw new Error(q.error.message);
    if (!q.data.session)
      throw new Error("FanView Community could not establish a session.");
    return q.data.session;
  }, P = async (H, q, J, rt) => {
    var At, Ct, _t;
    const dt = {
      apikey: v.publishableKey,
      Authorization: `Bearer ${H.access_token}`,
      "Content-Type": "application/json"
    };
    rt && (dt["Idempotency-Key"] = rt);
    const Tt = await M(v.gatewayUrl, {
      method: "POST",
      headers: dt,
      body: JSON.stringify({ operation: q, input: J })
    }), L = await Tt.json().catch(() => ({}));
    if (!Tt.ok)
      throw new Mm(
        ((At = L.error) == null ? void 0 : At.message) || "FanView Community is unavailable.",
        {
          code: (Ct = L.error) == null ? void 0 : Ct.code,
          retryable: (_t = L.error) == null ? void 0 : _t.retryable,
          status: Tt.status
        }
      );
    return zm(L);
  }, U = async (H, q) => {
    const J = await P(H, "list_messages", {
      roomId: q.roomId
    });
    q.mode = yl(J.mode) || q.mode, q.status = yl(J.status) || q.status, q.inaccessibleAt = yl(J.inaccessible_at) || null, q.messages = _m(J.messages), q.connection = q.status === "closed" ? "closed" : "connected";
  }, z = async (H) => {
    const q = await K(), J = await P(q, "join_room", {
      shareId: H,
      displayName: T,
      adultAttested: !1
    }), rt = yl(J.room_id);
    if (!rt) throw new Error("FanView Community returned no room.");
    return {
      shareId: H,
      roomId: rt,
      userId: q.user.id,
      mode: yl(J.mode),
      status: yl(J.status),
      inaccessibleAt: null,
      participantCount: 0,
      messages: [],
      channel: null,
      connection: "connecting"
    };
  }, w = (H) => {
    const q = r.get(H);
    if (q) return q;
    const J = z(H).catch((rt) => {
      throw r.delete(H), rt;
    });
    return r.set(H, J), J;
  }, C = async (H) => {
    const q = await K();
    await U(q, H), Z(H);
  };
  return {
    async loadRoom(H, q) {
      if (q.aborted) throw new DOMException("Aborted", "AbortError");
      const J = await w(H);
      if (q.aborted) throw new DOMException("Aborted", "AbortError");
      return hf(J);
    },
    subscribe(H, q, J) {
      const rt = X.get(H) ?? /* @__PURE__ */ new Set();
      rt.add(q), X.set(H, rt);
      let dt = !0, Tt = null;
      return w(H).then(async (L) => {
        if (!dt || (q(hf(L)), L.channel)) return;
        const At = await K();
        await v.client.realtime.setAuth(At.access_token);
        const Ct = v.client.channel(
          `fanview-community:${L.roomId}`,
          {
            config: {
              private: !0,
              presence: { key: L.userId }
            }
          }
        );
        L.channel = Ct, Tt = Ct;
        const _t = () => {
          dt && C(L).catch(J);
        }, F = () => {
          const Mt = Ct.presenceState();
          L.participantCount = Math.max(
            1,
            Object.values(Mt).reduce(
              ($t, _l) => $t + _l.length,
              0
            )
          ), Z(L);
        };
        Ct.on("broadcast", { event: "message.created" }, _t).on("broadcast", { event: "message.updated" }, _t).on("broadcast", { event: "room.updated" }, _t).on("presence", { event: "sync" }, F).subscribe((Mt) => {
          if (dt) {
            if (Mt === "SUBSCRIBED") {
              L.connection = "connected", L.participantCount = Math.max(
                1,
                L.participantCount
              ), Z(L), Ct.track({
                online_at: (/* @__PURE__ */ new Date()).toISOString()
              }), C(L).catch(J);
              return;
            }
            Mt === "CLOSED" ? L.connection = "closed" : (Mt === "CHANNEL_ERROR" || Mt === "TIMED_OUT") && (L.connection = "reconnecting"), Z(L);
          }
        });
      }).catch((L) => {
        dt && J(L);
      }), () => {
        dt = !1, rt.delete(q), rt.size === 0 && X.delete(H), Tt && (v.client.removeChannel(Tt), w(H).then((L) => {
          L.channel === Tt && (L.channel = null);
        }));
      };
    },
    async sendCheer(H, q) {
      const J = await w(H), rt = await K();
      await P(
        rt,
        "send_message",
        {
          roomId: J.roomId,
          messageType: "cheer",
          body: j1[q]
        },
        crypto.randomUUID()
      );
    },
    async sendMessage(H, q) {
      const J = await w(H), rt = await K(), dt = await P(
        rt,
        "send_message",
        {
          roomId: J.roomId,
          messageType: "text",
          body: q
        },
        crypto.randomUUID()
      ), Tt = R1({
        ...dt,
        type: "text",
        display_name: yl(dt.display_name) || T,
        role: "participant",
        moderation_status: "visible",
        is_own: !0
      });
      if (!Tt) throw new Error("FanView Community returned no message.");
      return Tt;
    }
  };
}
const Dm = [
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
function Cm() {
  const v = [...Dm];
  return {
    async loadRoom(M, T) {
      if (T.aborted) throw new DOMException("Aborted", "AbortError");
      return {
        connection: "connected",
        participantCount: 18,
        canWriteText: !0,
        messages: [...v]
      };
    },
    async sendCheer(M, T) {
      return Promise.resolve();
    },
    async sendMessage(M, T) {
      const r = T.trim().replace(/\s+/g, " ").slice(0, 240);
      if (!r) throw new Error("Message is empty.");
      const X = {
        id: `fixture-${v.length + 1}`,
        author: "You",
        initials: "Y",
        role: "Family",
        body: r,
        avatarTone: "lavender",
        reactions: [],
        own: !0
      };
      return v.push(X), X;
    }
  };
}
const Um = Cm();
var A = vf();
class C1 extends A.Component {
  constructor() {
    super(...arguments);
    Rl(this, "state", { failed: !1 });
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
    return this.state.failed ? /* @__PURE__ */ _.jsx(
      "aside",
      {
        "aria-label": "Live community unavailable",
        className: "community-panel community-panel--failed",
        "data-testid": "community-error-boundary",
        children: /* @__PURE__ */ _.jsxs("div", { className: "community-failure-copy", role: "status", children: [
          /* @__PURE__ */ _.jsx("strong", { children: "Cheering is temporarily unavailable." }),
          /* @__PURE__ */ _.jsx("span", { children: "The live match, score, and viewer experience are still running." })
        ] })
      }
    ) : this.props.children;
  }
}
const Nm = A.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), Qu = A.forwardRef(
  (v, M) => {
    const {
      alt: T,
      color: r,
      size: X,
      weight: Z,
      mirrored: K,
      children: P,
      weights: U,
      ...z
    } = v, {
      color: w = "currentColor",
      size: C,
      weight: I = "regular",
      mirrored: H = !1,
      ...q
    } = A.useContext(Nm);
    return /* @__PURE__ */ A.createElement(
      "svg",
      {
        ref: M,
        xmlns: "http://www.w3.org/2000/svg",
        width: X ?? C,
        height: X ?? C,
        fill: r ?? w,
        viewBox: "0 0 256 256",
        transform: K || H ? "scale(-1, 1)" : void 0,
        ...q,
        ...z
      },
      !!T && /* @__PURE__ */ A.createElement("title", null, T),
      P,
      U.get(Z ?? I)
    );
  }
);
Qu.displayName = "IconBase";
const Hm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement(
      "path",
      {
        d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ A.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))
  ]
]), q1 = A.forwardRef((v, M) => /* @__PURE__ */ A.createElement(Qu, { ref: M, ...v, weights: Hm }));
q1.displayName = "XIcon";
const B1 = q1, U1 = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: !1,
  messages: []
};
function jm({
  adapter: v,
  onMessageIdsChange: M,
  onOpenChange: T,
  open: r,
  shareId: X,
  teamName: Z
}) {
  const [K, P] = A.useState(U1), [U, z] = A.useState(!1), w = A.useRef(null);
  return A.useEffect(() => {
    const C = new AbortController();
    let I = () => {
    };
    return P(U1), z(!1), v.loadRoom(X, C.signal).then((H) => {
      C.signal.aborted || P(H);
    }).catch(() => {
      C.signal.aborted || z(!0);
    }), v.subscribe && (I = v.subscribe(
      X,
      P,
      () => z(!0)
    )), () => {
      C.abort(), I();
    };
  }, [v, X]), A.useEffect(() => {
    M(K.messages.map((C) => C.id));
  }, [M, K.messages]), A.useEffect(() => {
    if (!r) return;
    const C = w.current;
    C && (C.scrollTop = C.scrollHeight);
  }, [r, K.messages.length]), /* @__PURE__ */ _.jsxs(
    "aside",
    {
      "aria-hidden": !r,
      "aria-label": `${Z} broadcaster chat`,
      className: "community-panel community-panel--broadcaster",
      "data-open": r,
      hidden: !r,
      inert: !r,
      children: [
        /* @__PURE__ */ _.jsxs("header", { className: "community-header", children: [
          /* @__PURE__ */ _.jsxs("div", { className: "community-header__copy", children: [
            /* @__PURE__ */ _.jsx("div", { className: "community-eyebrow", children: "LIVE COMMUNITY" }),
            /* @__PURE__ */ _.jsxs("h1", { title: `${Z} Cheering Section`, children: [
              Z,
              " Cheering Section"
            ] }),
            /* @__PURE__ */ _.jsxs("p", { children: [
              /* @__PURE__ */ _.jsx("span", { className: "presence-dot", "aria-hidden": "true" }),
              K.participantCount,
              " cheering together"
            ] })
          ] }),
          /* @__PURE__ */ _.jsx(
            "button",
            {
              "aria-label": "Hide Fan chat",
              className: "icon-button",
              onClick: () => T(!1),
              type: "button",
              children: /* @__PURE__ */ _.jsx(B1, { "aria-hidden": "true", size: 22, weight: "bold" })
            }
          )
        ] }),
        /* @__PURE__ */ _.jsxs(
          "section",
          {
            "aria-label": "Live match chat",
            "aria-live": "polite",
            className: "community-feed",
            ref: w,
            role: "log",
            children: [
              /* @__PURE__ */ _.jsx("h2", { children: "LIVE MATCH CHAT" }),
              U ? /* @__PURE__ */ _.jsxs("div", { className: "community-inline-status", role: "status", children: [
                /* @__PURE__ */ _.jsx("strong", { children: "Chat is temporarily unavailable." }),
                /* @__PURE__ */ _.jsx("span", { children: "Your Broadcast is still live." })
              ] }) : null,
              !U && (K.connection === "connecting" || K.connection === "reconnecting") && K.messages.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", role: "status", children: "Connecting to Fan chat…" }) : null,
              !U && K.connection !== "connecting" && K.messages.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", children: "Fan messages and cheers will appear here." }) : null,
              U ? null : K.messages.map((C) => /* @__PURE__ */ _.jsx(Rm, { message: C }, C.id))
            ]
          }
        )
      ]
    }
  );
}
function Rm({ message: v }) {
  return /* @__PURE__ */ _.jsxs("article", { className: "community-message", "data-own": !1, children: [
    /* @__PURE__ */ _.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "community-avatar",
        "data-tone": v.avatarTone,
        children: v.initials
      }
    ),
    /* @__PURE__ */ _.jsxs("div", { className: "community-message__content", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "community-message__header", children: [
        /* @__PURE__ */ _.jsx("strong", { children: v.author }),
        /* @__PURE__ */ _.jsx("span", { "data-role": v.role, children: v.role })
      ] }),
      /* @__PURE__ */ _.jsx("p", { children: v.moderated ? "Message removed to keep chat safe." : v.body })
    ] })
  ] });
}
const qm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M178,36c-20.09,0-37.92,7.93-50,21.56C115.92,43.93,98.09,36,78,36a66.08,66.08,0,0,0-66,66c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,232.14,244,174.34,244,102A66.08,66.08,0,0,0,178,36Zm-5.49,142.36A328.69,328.69,0,0,1,128,210.16a328.69,328.69,0,0,1-44.51-31.8C61.82,159.77,36,131.42,36,102A42,42,0,0,1,78,60c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,69.4,160.2,60,178,60a42,42,0,0,1,42,42C220,131.42,194.18,159.77,172.51,178.36Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement(
      "path",
      {
        d: "M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ A.createElement("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M178,42c-21,0-39.26,9.47-50,25.34C117.26,51.47,99,42,78,42a60.07,60.07,0,0,0-60,60c0,29.2,18.2,59.59,54.1,90.31a334.68,334.68,0,0,0,53.06,37,6,6,0,0,0,5.68,0,334.68,334.68,0,0,0,53.06-37C219.8,161.59,238,131.2,238,102A60.07,60.07,0,0,0,178,42ZM128,217.11C111.59,207.64,30,157.72,30,102A48.05,48.05,0,0,1,78,54c20.28,0,37.31,10.83,44.45,28.27a6,6,0,0,0,11.1,0C140.69,64.83,157.72,54,178,54a48.05,48.05,0,0,1,48,48C226,157.72,144.41,207.64,128,217.11Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M178,44c-21.44,0-39.92,10.19-50,27.07C117.92,54.19,99.44,44,78,44a58.07,58.07,0,0,0-58,58c0,28.59,18,58.47,53.4,88.79a333.81,333.81,0,0,0,52.7,36.73,4,4,0,0,0,3.8,0,333.81,333.81,0,0,0,52.7-36.73C218,160.47,236,130.59,236,102A58.07,58.07,0,0,0,178,44ZM128,219.42c-14-8-100-59.35-100-117.42A50.06,50.06,0,0,1,78,52c21.11,0,38.85,11.31,46.3,29.51a4,4,0,0,0,7.4,0C139.15,63.31,156.89,52,178,52a50.06,50.06,0,0,1,50,50C228,160,142,211.46,128,219.42Z" }))
  ]
]), Y1 = A.forwardRef((v, M) => /* @__PURE__ */ A.createElement(Qu, { ref: M, ...v, weights: qm }));
Y1.displayName = "HeartIcon";
const N1 = Y1, Bm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement(
      "path",
      {
        d: "M223.69,42.18l-58.22,192a8,8,0,0,1-14.92,1.25L108,148,20.58,105.45a8,8,0,0,1,1.25-14.92l192-58.22A8,8,0,0,1,223.69,42.18Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ A.createElement("path", { d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M231.4,44.34s0,.1,0,.15l-58.2,191.94a15.88,15.88,0,0,1-14,11.51q-.69.06-1.38.06a15.86,15.86,0,0,1-14.42-9.15L107,164.15a4,4,0,0,1,.77-4.58l57.92-57.92a8,8,0,0,0-11.31-11.31L96.43,148.26a4,4,0,0,1-4.58.77L17.08,112.64a16,16,0,0,1,2.49-29.8l191.94-58.2.15,0A16,16,0,0,1,231.4,44.34Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.85l85.56,41.64L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a2,2,0,0,1-3.76.26l-40.68-83.58,49-49a6,6,0,1,0-8.49-8.49l-49,49L23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ A.createElement(A.Fragment, null, /* @__PURE__ */ A.createElement("path", { d: "M224.47,31.52a11.87,11.87,0,0,0-11.82-3L20.74,86.67a12,12,0,0,0-1.91,22.38L105,151l41.92,86.15A11.88,11.88,0,0,0,157.74,244c.34,0,.69,0,1,0a11.89,11.89,0,0,0,10.52-8.63l58.21-192,0-.08A11.85,11.85,0,0,0,224.47,31.52Zm-4.62,9.54-58.23,192a4,4,0,0,1-7.48.59l-41.3-84.86,50-50a4,4,0,1,0-5.66-5.66l-50,50-84.9-41.31a3.88,3.88,0,0,1-2.27-4,3.93,3.93,0,0,1,3-3.54L214.9,36.16A3.93,3.93,0,0,1,216,36a4,4,0,0,1,2.79,1.19A3.93,3.93,0,0,1,219.85,41.06Z" }))
  ]
]), G1 = A.forwardRef((v, M) => /* @__PURE__ */ A.createElement(Qu, { ref: M, ...v, weights: Bm }));
G1.displayName = "PaperPlaneTiltIcon";
const Ym = G1, Gm = ["👏", "💗", "🔥", "🙌", "🏐", "💪"], H1 = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: !1,
  messages: []
};
function Zm({
  adapter: v,
  matchComplete: M,
  shareId: T,
  startOpen: r = !0,
  teamName: X
}) {
  const [Z, K] = A.useState(r), [P, U] = A.useState(H1), [z, w] = A.useState(""), [C, I] = A.useState(""), [H, q] = A.useState(!1), [J, rt] = A.useState(!1), dt = A.useRef(null), Tt = A.useRef(null), L = A.useRef(null);
  A.useEffect(() => {
    const Y = new AbortController();
    let it = () => {
    };
    return U(H1), q(!1), v.loadRoom(T, Y.signal).then((Ft) => {
      Y.signal.aborted || U(Ft);
    }).catch(() => {
      Y.signal.aborted || q(!0);
    }), v.subscribe && (it = v.subscribe(
      T,
      U,
      () => q(!0)
    )), () => {
      Y.abort(), it();
    };
  }, [v, T]), A.useEffect(() => {
    var Y, it;
    Z ? (Y = Tt.current) == null || Y.focus({ preventScroll: !0 }) : (it = dt.current) == null || it.focus({ preventScroll: !0 });
  }, [Z]), A.useEffect(() => {
    if (!Z) return;
    const Y = (it) => {
      it.key === "Escape" && (it.preventDefault(), At());
    };
    return document.addEventListener("keydown", Y), () => document.removeEventListener("keydown", Y);
  }, [Z]);
  function At() {
    K(!1), I("");
  }
  function Ct(Y) {
    if (Y.key === "Escape") {
      Y.preventDefault(), At();
      return;
    }
    if (Y.key !== "Tab") return;
    const it = Array.from(
      Y.currentTarget.querySelectorAll(
        "button:not([disabled]), input:not([disabled])"
      )
    );
    if (!it.length) return;
    const Ft = it[0], Jt = it[it.length - 1];
    Y.shiftKey && document.activeElement === Ft ? (Y.preventDefault(), Jt.focus()) : !Y.shiftKey && document.activeElement === Jt && (Y.preventDefault(), Ft.focus());
  }
  function _t(Y) {
    L.current = Y.clientY, Y.currentTarget.setPointerCapture(Y.pointerId);
  }
  function F(Y) {
    const it = L.current;
    L.current = null, it !== null && Y.clientY - it > 64 && At();
  }
  async function Mt(Y) {
    if (!(H || M))
      try {
        await v.sendCheer(T, Y), I(`${Y} sent to everyone cheering`);
      } catch {
        I("That cheer did not send. The live match is unaffected.");
      }
  }
  async function $t(Y) {
    Y.preventDefault();
    const it = z.trim().replace(/\s+/g, " ").slice(0, 240);
    if (!(!it || H || M || !P.canWriteText || J)) {
      rt(!0);
      try {
        const Ft = await v.sendMessage(T, it);
        U((Jt) => ({
          ...Jt,
          messages: [...Jt.messages, Ft]
        })), w(""), I("Cheer sent.");
      } catch {
        I("Your message did not send. The live match is unaffected.");
      } finally {
        rt(!1);
      }
    }
  }
  const _l = H || M || !P.canWriteText || P.connection === "closed";
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    Z ? null : /* @__PURE__ */ _.jsxs(
      "button",
      {
        "aria-expanded": "false",
        className: "community-launcher",
        onClick: () => K(!0),
        ref: dt,
        type: "button",
        children: [
          /* @__PURE__ */ _.jsx(N1, { "aria-hidden": "true", size: 20, weight: "fill" }),
          "Cheer together",
          /* @__PURE__ */ _.jsx("span", { children: P.participantCount })
        ]
      }
    ),
    /* @__PURE__ */ _.jsx(
      "button",
      {
        "aria-hidden": !Z,
        "aria-label": "Close Cheering Section",
        className: "community-scrim",
        "data-open": Z,
        disabled: !Z,
        hidden: !Z,
        onClick: At,
        tabIndex: Z ? 0 : -1,
        type: "button"
      }
    ),
    /* @__PURE__ */ _.jsxs(
      "aside",
      {
        "aria-hidden": !Z,
        "aria-label": `${X} Cheering Section`,
        "aria-modal": "true",
        className: "community-panel",
        "data-open": Z,
        hidden: !Z,
        inert: !Z,
        onKeyDown: Ct,
        ref: Tt,
        role: "dialog",
        tabIndex: -1,
        children: [
          /* @__PURE__ */ _.jsx(
            "div",
            {
              "aria-label": "Drag down to close Cheering Section",
              className: "community-handle",
              onPointerDown: _t,
              onPointerUp: F,
              role: "button",
              tabIndex: -1
            }
          ),
          /* @__PURE__ */ _.jsxs("header", { className: "community-header", children: [
            /* @__PURE__ */ _.jsxs("div", { className: "community-header__copy", children: [
              /* @__PURE__ */ _.jsx("div", { className: "community-eyebrow", children: "LIVE COMMUNITY" }),
              /* @__PURE__ */ _.jsxs("h1", { title: `${X} Cheering Section`, children: [
                X,
                " Cheering Section"
              ] }),
              /* @__PURE__ */ _.jsxs("p", { children: [
                /* @__PURE__ */ _.jsx("span", { className: "presence-dot", "aria-hidden": "true" }),
                P.participantCount,
                " cheering together"
              ] })
            ] }),
            /* @__PURE__ */ _.jsx(
              "button",
              {
                "aria-label": "Close Cheering Section",
                className: "icon-button",
                onClick: At,
                type: "button",
                children: /* @__PURE__ */ _.jsx(B1, { "aria-hidden": "true", size: 22, weight: "bold" })
              }
            )
          ] }),
          /* @__PURE__ */ _.jsxs("div", { className: "safety-notice", children: [
            /* @__PURE__ */ _.jsx(N1, { "aria-hidden": "true", size: 23, weight: "regular" }),
            /* @__PURE__ */ _.jsx("span", { children: "Cheer kindly. No player criticism or personal information." })
          ] }),
          /* @__PURE__ */ _.jsxs(
            "section",
            {
              "aria-label": "Live match chat",
              "aria-live": "polite",
              className: "community-feed",
              role: "log",
              children: [
                /* @__PURE__ */ _.jsx("h2", { children: "LIVE MATCH CHAT" }),
                P.connection === "connecting" && !H ? /* @__PURE__ */ _.jsxs("div", { "aria-label": "Loading community", className: "message-skeletons", children: [
                  /* @__PURE__ */ _.jsx("span", {}),
                  /* @__PURE__ */ _.jsx("span", {}),
                  /* @__PURE__ */ _.jsx("span", {})
                ] }) : null,
                H ? /* @__PURE__ */ _.jsxs("div", { className: "community-inline-status", role: "status", children: [
                  /* @__PURE__ */ _.jsx("strong", { children: "Cheering is temporarily unavailable." }),
                  /* @__PURE__ */ _.jsx("span", { children: "Video and live scoring will continue normally." })
                ] }) : null,
                !H && P.connection === "reconnecting" ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", role: "status", children: "Reconnecting the Cheering Section…" }) : null,
                !H && P.messages.length === 0 && P.connection !== "connecting" ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", children: "Be the first to send a positive cheer for the team." }) : null,
                H ? null : P.messages.map((Y) => /* @__PURE__ */ _.jsx(Xm, { message: Y }, Y.id))
              ]
            }
          ),
          /* @__PURE__ */ _.jsxs("form", { className: "community-composer", onSubmit: $t, children: [
            /* @__PURE__ */ _.jsx("div", { "aria-label": "Quick cheers", className: "quick-cheers", children: Gm.map((Y) => /* @__PURE__ */ _.jsx(
              "button",
              {
                "aria-label": `Send ${Y} cheer`,
                disabled: H || M,
                onClick: () => void Mt(Y),
                type: "button",
                children: /* @__PURE__ */ _.jsx("span", { "aria-hidden": "true", children: Y })
              },
              Y
            )) }),
            /* @__PURE__ */ _.jsxs("div", { className: "composer-row", children: [
              /* @__PURE__ */ _.jsx(
                "input",
                {
                  "aria-label": "Add a positive cheer",
                  disabled: _l,
                  maxLength: 240,
                  onChange: (Y) => w(Y.target.value),
                  placeholder: M ? "Chat closed after the match" : "Add a positive cheer…",
                  value: z
                }
              ),
              /* @__PURE__ */ _.jsx(
                "button",
                {
                  "aria-label": "Send cheer",
                  className: "send-button",
                  disabled: _l || J || z.trim().length === 0,
                  type: "submit",
                  children: /* @__PURE__ */ _.jsx(Ym, { "aria-hidden": "true", size: 21, weight: "fill" })
                }
              )
            ] }),
            /* @__PURE__ */ _.jsxs("div", { className: "composer-meta", children: [
              /* @__PURE__ */ _.jsx("span", { className: "sr-only", "aria-live": "polite", children: C }),
              /* @__PURE__ */ _.jsxs("span", { "aria-hidden": "true", children: [
                z.length,
                " / 240"
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}
function Xm({ message: v }) {
  return /* @__PURE__ */ _.jsxs("article", { className: "community-message", "data-own": v.own ?? !1, children: [
    /* @__PURE__ */ _.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "community-avatar",
        "data-tone": v.avatarTone,
        children: v.initials
      }
    ),
    /* @__PURE__ */ _.jsxs("div", { className: "community-message__content", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "community-message__header", children: [
        /* @__PURE__ */ _.jsx("strong", { children: v.author }),
        /* @__PURE__ */ _.jsx("span", { "data-role": v.role, children: v.role })
      ] }),
      /* @__PURE__ */ _.jsx("p", { children: v.moderated ? "Message removed to keep chat safe." : v.body }),
      /* @__PURE__ */ _.jsx("div", { className: "reaction-row", children: v.reactions.map((M) => /* @__PURE__ */ _.jsxs(
        "button",
        {
          "aria-label": `${M.count} ${M.emoji} reactions`,
          type: "button",
          children: [
            /* @__PURE__ */ _.jsx("span", { "aria-hidden": "true", children: M.emoji }),
            M.count
          ]
        },
        M.emoji
      )) })
    ] })
  ] });
}
const Qm = ':root{color:#111827;background:#050a13;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-synthesis:none;text-rendering:optimizeLegibility;--fanview-navy-950: #111827;--fanview-pink-500: #f22b78;--fanview-pink-700: #ce155f;--fanview-paper: #fffdfb;--fanview-blush: #fff2f7;--fanview-muted: #697386;--fanview-live-red: #e53935;--fanview-live-green: #39d98a;--fanview-line: rgba(15, 23, 42, .1)}*{box-sizing:border-box}html,body,#root{width:100%;min-width:320px;min-height:100%;margin:0}body{min-height:100dvh;overflow:hidden;-webkit-font-smoothing:antialiased}button,input{font:inherit}button{-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible,[role=button]:focus-visible{outline:3px solid rgba(242,43,120,.35);outline-offset:2px}.fanview-app,.match-stage{position:relative;width:100vw;height:100dvh;min-height:460px;overflow:hidden;background:#050a13}.match-stage__media{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center}.match-stage__shade{position:absolute;top:0;right:0;bottom:0;left:0;background:#02060c2e;pointer-events:none}.match-stage__empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;background:#0d131d}.court-outline{position:relative;width:min(760px,82vw);aspect-ratio:2.25 / 1;border:2px solid rgba(255,255,255,.12);transform:perspective(480px) rotateX(58deg)}.court-outline__net{position:absolute;top:50%;right:-4%;left:-4%;border-top:2px solid rgba(255,255,255,.18)}.live-pill,.viewer-pill{position:absolute;z-index:3;top:max(28px,env(safe-area-inset-top));display:inline-flex;min-height:38px;align-items:center;justify-content:center;border-radius:8px;color:#fff;box-shadow:0 8px 22px #00000040;font-size:15px;font-weight:900}.live-pill{left:max(28px,env(safe-area-inset-left));gap:8px;padding:0 14px;background:var(--fanview-live-red)}.live-pill__dot{width:9px;height:9px;border-radius:999px;background:#fff}.viewer-pill{right:max(28px,env(safe-area-inset-right));gap:8px;min-width:74px;border:1px solid rgba(255,255,255,.55);padding:0 12px;background:#03080fb8;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-community-enabled=true] .viewer-pill{right:418px}.score-bug{position:absolute;z-index:3;bottom:36px;left:28px;width:min(276px,calc(100vw - 470px));min-width:246px;overflow:hidden;border-radius:12px;padding:13px;color:#fff;background:#071222f5;box-shadow:0 16px 38px #00000059}.score-bug__set{height:26px;padding-left:2px;font-size:12px;font-weight:900;letter-spacing:.09em}.score-bug__row{display:grid;min-height:47px;grid-template-columns:0 minmax(0,1fr) 52px;margin-top:7px;overflow:hidden;border-radius:4px}.score-bug__color{width:0}.score-bug__team{overflow:hidden;display:flex;align-items:center;padding:0 12px;font-size:18px;font-weight:900;letter-spacing:-.015em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__score{display:grid;place-items:center;border:1px solid rgba(255,255,255,.28);border-left:0;background:#101b2b;font-size:23px;font-weight:900}.match-status{position:absolute;z-index:4;top:78px;left:50%;border-radius:999px;padding:8px 12px;color:#fff;background:#111827e6;font-size:12px;font-weight:750;transform:translate(-50%)}.community-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;display:none;border:0;background:transparent}.community-panel{position:fixed;z-index:10;top:14px;right:14px;bottom:14px;display:grid;width:min(390px,calc(100vw - 28px));grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.8);border-radius:26px;color:var(--fanview-navy-950);background:var(--fanview-paper);box-shadow:0 28px 70px #00000047;transform:translate(calc(100% + 32px));transition:transform .18s ease}.community-panel[data-open=true]{transform:translate(0)}.community-panel--broadcaster{top:52px;grid-template-rows:auto minmax(0,1fr);height:auto}.community-scrim[hidden],.community-panel[hidden]{display:none!important}.community-panel:focus{outline:none}.community-handle{display:none}.community-header{display:grid;min-width:0;grid-template-columns:minmax(0,1fr) 42px;align-items:center;gap:12px;padding:26px 22px 12px}.community-header__copy{min-width:0}.community-eyebrow{margin-bottom:6px;color:var(--fanview-pink-500);font-size:11px;font-weight:900;letter-spacing:.04em}.community-header h1{display:-webkit-box;overflow:hidden;margin:0;font-size:clamp(20px,1.65vw,23px);font-weight:900;letter-spacing:-.035em;line-height:1.12;white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}.community-header p{display:flex;align-items:center;gap:8px;margin:7px 0 0;color:var(--fanview-muted);font-size:13px;font-weight:650}.presence-dot{width:9px;height:9px;border-radius:999px;background:#42a767}.icon-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;color:var(--fanview-navy-950);background:#fff;cursor:pointer}.safety-notice{display:flex;min-height:39px;align-items:center;gap:9px;margin:0 20px;border:1px solid rgba(242,43,120,.18);border-radius:7px;padding:8px 10px;color:#3f3542;background:var(--fanview-blush);font-size:10px;font-weight:650;line-height:1.25}.safety-notice svg{flex:0 0 auto;color:var(--fanview-pink-500)}.community-feed{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:19px 20px 16px;scrollbar-width:thin}.community-feed h2{margin:0 0 19px;color:#7b7e89;font-size:11px;font-weight:750;letter-spacing:.055em}.community-message{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;margin-bottom:16px}.community-avatar{display:grid;width:42px;height:42px;place-items:center;border-radius:999px;color:#292543;font-size:15px;font-weight:650}.community-avatar[data-tone=lavender]{background:#eee8ff}.community-avatar[data-tone=blue]{background:#dfebff}.community-avatar[data-tone=green]{background:#dff3e5}.community-avatar[data-tone=gold]{background:#ffe6a1}.community-message__content{min-width:0}.community-message__header{display:flex;min-width:0;align-items:center;gap:7px;min-height:22px}.community-message__header strong{overflow:hidden;font-size:14px;font-weight:850;text-overflow:ellipsis;white-space:nowrap}.community-message__header span{flex:0 0 auto;border-radius:999px;padding:3px 7px;color:#644cdb;background:#efebff;font-size:10px;font-weight:650}.community-message__header span[data-role=Coach]{color:#2765cf;background:#e3edff}.community-message__header span[data-role=Teammate]{color:#af6d00;background:#fff0c8}.community-message p{margin:2px 0 0;color:#242834;font-size:14px;font-weight:600;line-height:1.36;overflow-wrap:anywhere}.community-message[data-own=true] p{border-radius:12px;padding:8px 10px;color:#fff;background:var(--fanview-navy-950)}.reaction-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.reaction-row button{display:inline-flex;min-width:45px;min-height:27px;align-items:center;justify-content:center;gap:5px;border:1px solid var(--fanview-line);border-radius:999px;padding:3px 8px;color:#5f6370;background:#fff;font-size:11px;cursor:pointer}.community-composer{display:grid;gap:10px;border-top:1px solid var(--fanview-line);padding:12px 16px max(13px,env(safe-area-inset-bottom));background:#fffdfbfa}.quick-cheers{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.quick-cheers button{display:grid;min-width:44px;height:44px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;background:#fff;font-size:20px;cursor:pointer}.quick-cheers button:hover:not(:disabled){border-color:#f22b7861;background:#fff7fa}.composer-row{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:10px}.composer-row input{min-width:0;height:46px;border:1px solid rgba(15,23,42,.14);border-radius:999px;padding:0 17px;color:var(--fanview-navy-950);background:#fff;font-size:13px;font-weight:600}.composer-row input::placeholder{color:#9da2ae}.send-button{display:grid;width:46px;height:46px;place-items:center;border:0;border-radius:999px;color:#fff;background:var(--fanview-pink-500);cursor:pointer}.send-button:disabled,.quick-cheers button:disabled{cursor:not-allowed;opacity:.48}.composer-meta{display:flex;min-height:10px;justify-content:flex-end;color:#8f95a2;font-size:10px;font-weight:600}.message-skeletons{display:grid;gap:14px}.message-skeletons span{display:block;width:100%;height:48px;border-radius:12px;background:#f0f1f4}.community-inline-status,.community-failure-copy{display:grid;gap:6px;border:1px solid var(--fanview-line);border-radius:13px;padding:14px;color:var(--fanview-muted);background:#f8f8f9;font-size:12px;line-height:1.4}.community-inline-status strong,.community-failure-copy strong{color:var(--fanview-navy-950);font-size:14px}.community-panel--failed{place-items:center;padding:24px;transform:none}.community-launcher{position:fixed;z-index:12;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:inline-flex;min-height:50px;align-items:center;gap:9px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:0 16px;color:#fff;background:var(--fanview-pink-500);box-shadow:0 14px 34px #1118274d;font-size:13px;font-weight:850;cursor:pointer}.community-launcher span{display:grid;min-width:22px;height:22px;place-items:center;border-radius:999px;padding:0 5px;background:#11182738;font-size:10px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}@media(max-width:720px){.fanview-app,.match-stage{min-height:560px}.match-stage__media{height:42dvh;min-height:240px;object-position:51% center}.match-stage__shade{bottom:auto;height:42dvh;min-height:240px}.live-pill,.viewer-pill{top:max(13px,env(safe-area-inset-top));min-height:29px;border-radius:6px;font-size:11px}.live-pill{left:max(13px,env(safe-area-inset-left));gap:6px;padding:0 10px}.live-pill__dot{width:7px;height:7px}.viewer-pill,.fanview-app[data-community-enabled=true] .viewer-pill{right:max(13px,env(safe-area-inset-right));gap:6px;min-width:58px;padding:0 8px}.viewer-pill svg{width:15px;height:15px}.score-bug{display:none}.community-scrim{display:block;opacity:0;pointer-events:none;background:#02070e6b;transition:opacity .18s ease}.community-scrim[data-open=true]{opacity:1;pointer-events:auto}.community-panel,.community-panel--failed{top:auto;right:0;bottom:0;left:0;width:100%;height:min(72dvh,680px);border-right:0;border-bottom:0;border-left:0;border-radius:24px 24px 0 0;transform:translateY(calc(100% + 24px))}.community-panel[data-open=true],.community-panel--failed{transform:translateY(0)}.community-panel--broadcaster{height:min(58dvh,520px)}.community-handle{position:absolute;z-index:2;top:7px;left:50%;display:block;width:72px;height:18px;cursor:grab;transform:translate(-50%);touch-action:none}.community-handle:after{position:absolute;top:0;left:16px;width:40px;height:4px;border-radius:999px;background:#1118272e;content:""}.community-header{gap:7px;padding:26px 14px 10px}.community-header h1{font-size:18px}.safety-notice{margin:0 15px}.community-feed{padding:16px 16px 10px}.community-message{grid-template-columns:34px minmax(0,1fr);gap:10px;margin-bottom:14px}.community-avatar{width:34px;height:34px;font-size:12px}.community-message__header strong{font-size:12px}.community-message p{font-size:12px;line-height:1.32}.reaction-row{gap:6px;margin-top:6px}.reaction-row button{min-width:40px;min-height:24px;font-size:10px}.community-composer{gap:9px;padding:10px 13px max(10px,env(safe-area-inset-bottom))}.quick-cheers{gap:7px}.quick-cheers button{min-width:44px;height:44px;font-size:18px}.composer-row{grid-template-columns:minmax(0,1fr) 44px;gap:8px}.composer-row input,.send-button{height:44px}.send-button{width:44px}}@media(max-width:380px){.quick-cheers button{min-width:40px;width:40px;height:40px}.quick-cheers{grid-template-columns:repeat(6,40px);justify-content:space-between}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}}@media(forced-colors:active){.live-pill,.viewer-pill,.community-panel,.community-launcher,.send-button{border:1px solid CanvasText}}', Lm = `
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
class wm extends HTMLElement {
  constructor() {
    super();
    Rl(this, "adapter", null);
    Rl(this, "config", null);
    Rl(this, "root", null);
    Rl(this, "mountPoint");
    Rl(this, "reportBroadcasterMessageIds", (T) => {
      this.dispatchEvent(
        new CustomEvent("community-message-change", {
          detail: { messageIds: T }
        })
      );
    });
    const T = this.attachShadow({ mode: "open" }), r = document.createElement("style");
    r.textContent = `${Lm}
${Qm}`, this.mountPoint = document.createElement("div"), T.append(r, this.mountPoint);
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
  openCommunity() {
    this.setCommunityOpen(!0);
  }
  closeCommunity() {
    this.setCommunityOpen(!1);
  }
  toggleCommunity() {
    var T;
    this.setCommunityOpen(!(((T = this.config) == null ? void 0 : T.open) ?? !1));
  }
  setCommunityOpen(T) {
    !this.config || this.config.open === T || (this.config = { ...this.config, open: T }, this.renderWidget(), this.dispatchEvent(
      new CustomEvent("community-open-change", {
        detail: { open: T }
      })
    ));
  }
  renderWidget() {
    if (!this.isConnected || !this.config) return;
    const T = this.config, r = T.adapter ?? this.adapter ?? (T.demo ? Um : T.client && T.gatewayUrl && T.publishableKey ? Om({
      client: T.client,
      gatewayUrl: T.gatewayUrl,
      publishableKey: T.publishableKey,
      displayName: T.displayName
    }) : null);
    if (r) {
      if (T.adapter || (this.adapter = r), this.root ?? (this.root = Sm.createRoot(this.mountPoint)), T.surface === "broadcaster") {
        this.root.render(
          /* @__PURE__ */ _.jsx(C1, { children: /* @__PURE__ */ _.jsx(
            jm,
            {
              adapter: r,
              onMessageIdsChange: this.reportBroadcasterMessageIds,
              onOpenChange: (X) => this.setCommunityOpen(X),
              open: T.open ?? !1,
              shareId: T.shareId,
              teamName: T.teamName
            }
          ) })
        );
        return;
      }
      this.root.render(
        /* @__PURE__ */ _.jsx(C1, { children: /* @__PURE__ */ _.jsx(
          Zm,
          {
            adapter: r,
            matchComplete: !!T.matchComplete,
            shareId: T.shareId,
            startOpen: T.startOpen ?? !0,
            teamName: T.teamName
          }
        ) })
      );
    }
  }
}
customElements.get("fanview-community-widget") || customElements.define(
  "fanview-community-widget",
  wm
);
export {
  wm as FanViewCommunityWidgetElement,
  Om as createSupabaseCommunityAdapter
};
