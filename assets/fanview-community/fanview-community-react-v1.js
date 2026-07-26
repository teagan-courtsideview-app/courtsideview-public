var om = Object.defineProperty;
var sm = (v, M, T) => M in v ? om(v, M, { enumerable: !0, configurable: !0, writable: !0, value: T }) : v[M] = T;
var Pl = (v, M, T) => sm(v, typeof M != "symbol" ? M + "" : M, T);
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
function rm() {
  if (b1) return Eu;
  b1 = 1;
  var v = Symbol.for("react.transitional.element"), M = Symbol.for("react.fragment");
  function T(d, Q, B) {
    var ut = null;
    if (B !== void 0 && (ut = "" + B), Q.key !== void 0 && (ut = "" + Q.key), "key" in Q) {
      B = {};
      for (var F in Q)
        F !== "key" && (B[F] = Q[F]);
    } else B = Q;
    return Q = B.ref, {
      $$typeof: v,
      type: d,
      key: ut,
      ref: Q !== void 0 ? Q : null,
      props: B
    };
  }
  return Eu.Fragment = M, Eu.jsx = T, Eu.jsxs = T, Eu;
}
var S1;
function dm() {
  return S1 || (S1 = 1, ff.exports = rm()), ff.exports;
}
var _ = dm(), of = { exports: {} }, zu = {}, sf = { exports: {} }, rf = {};
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
      var L = b.length;
      b.push(O);
      t: for (; 0 < L; ) {
        var yt = L - 1 >>> 1, bt = b[yt];
        if (0 < Q(bt, O))
          b[yt] = O, b[L] = bt, L = yt;
        else break t;
      }
    }
    function T(b) {
      return b.length === 0 ? null : b[0];
    }
    function d(b) {
      if (b.length === 0) return null;
      var O = b[0], L = b.pop();
      if (L !== O) {
        b[0] = L;
        t: for (var yt = 0, bt = b.length, s = bt >>> 1; yt < s; ) {
          var x = 2 * (yt + 1) - 1, D = b[x], N = x + 1, J = b[N];
          if (0 > Q(D, L))
            N < bt && 0 > Q(J, D) ? (b[yt] = J, b[N] = L, yt = N) : (b[yt] = D, b[x] = L, yt = x);
          else if (N < bt && 0 > Q(J, L))
            b[yt] = J, b[N] = L, yt = N;
          else break t;
        }
      }
      return O;
    }
    function Q(b, O) {
      var L = b.sortIndex - O.sortIndex;
      return L !== 0 ? L : b.id - O.id;
    }
    if (v.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var B = performance;
      v.unstable_now = function() {
        return B.now();
      };
    } else {
      var ut = Date, F = ut.now();
      v.unstable_now = function() {
        return ut.now() - F;
      };
    }
    var C = [], z = [], G = 1, R = null, I = 3, j = !1, q = !1, K = !1, rt = !1, dt = typeof setTimeout == "function" ? setTimeout : null, Tt = typeof clearTimeout == "function" ? clearTimeout : null, w = typeof setImmediate < "u" ? setImmediate : null;
    function At(b) {
      for (var O = T(z); O !== null; ) {
        if (O.callback === null) d(z);
        else if (O.startTime <= b)
          d(z), O.sortIndex = O.expirationTime, M(C, O);
        else break;
        O = T(z);
      }
    }
    function Ct(b) {
      if (K = !1, At(b), !q)
        if (T(C) !== null)
          q = !0, _t || (_t = !0, it());
        else {
          var O = T(z);
          O !== null && Ml(Ct, O.startTime - b);
        }
    }
    var _t = !1, $ = -1, Mt = 5, $t = -1;
    function _l() {
      return rt ? !0 : !(v.unstable_now() - $t < Mt);
    }
    function Z() {
      if (rt = !1, _t) {
        var b = v.unstable_now();
        $t = b;
        var O = !0;
        try {
          t: {
            q = !1, K && (K = !1, Tt($), $ = -1), j = !0;
            var L = I;
            try {
              l: {
                for (At(b), R = T(C); R !== null && !(R.expirationTime > b && _l()); ) {
                  var yt = R.callback;
                  if (typeof yt == "function") {
                    R.callback = null, I = R.priorityLevel;
                    var bt = yt(
                      R.expirationTime <= b
                    );
                    if (b = v.unstable_now(), typeof bt == "function") {
                      R.callback = bt, At(b), O = !0;
                      break l;
                    }
                    R === T(C) && d(C), At(b);
                  } else d(C);
                  R = T(C);
                }
                if (R !== null) O = !0;
                else {
                  var s = T(z);
                  s !== null && Ml(
                    Ct,
                    s.startTime - b
                  ), O = !1;
                }
              }
              break t;
            } finally {
              R = null, I = L, j = !1;
            }
            O = void 0;
          }
        } finally {
          O ? it() : _t = !1;
        }
      }
    }
    var it;
    if (typeof w == "function")
      it = function() {
        w(Z);
      };
    else if (typeof MessageChannel < "u") {
      var Ft = new MessageChannel(), Jt = Ft.port2;
      Ft.port1.onmessage = Z, it = function() {
        Jt.postMessage(null);
      };
    } else
      it = function() {
        dt(Z, 0);
      };
    function Ml(b, O) {
      $ = dt(function() {
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
      var L = I;
      I = O;
      try {
        return b();
      } finally {
        I = L;
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
      var L = I;
      I = b;
      try {
        return O();
      } finally {
        I = L;
      }
    }, v.unstable_scheduleCallback = function(b, O, L) {
      var yt = v.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? yt + L : yt) : L = yt, b) {
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
      return bt = L + bt, b = {
        id: G++,
        callback: O,
        priorityLevel: b,
        startTime: L,
        expirationTime: bt,
        sortIndex: -1
      }, L > yt ? (b.sortIndex = L, M(z, b), T(C) === null && b === T(z) && (K ? (Tt($), $ = -1) : K = !0, Ml(Ct, L - yt))) : (b.sortIndex = bt, M(C, b), q || j || (q = !0, _t || (_t = !0, it()))), b;
    }, v.unstable_shouldYield = _l, v.unstable_wrapCallback = function(b) {
      var O = I;
      return function() {
        var L = I;
        I = O;
        try {
          return b.apply(this, arguments);
        } finally {
          I = L;
        }
      };
    };
  })(rf)), rf;
}
var z1;
function hm() {
  return z1 || (z1 = 1, sf.exports = mm()), sf.exports;
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
  var v = Symbol.for("react.transitional.element"), M = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), Q = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), ut = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), z = Symbol.for("react.memo"), G = Symbol.for("react.lazy"), R = Symbol.for("react.activity"), I = Symbol.iterator;
  function j(s) {
    return s === null || typeof s != "object" ? null : (s = I && s[I] || s["@@iterator"], typeof s == "function" ? s : null);
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
  }, K = Object.assign, rt = {};
  function dt(s, x, D) {
    this.props = s, this.context = x, this.refs = rt, this.updater = D || q;
  }
  dt.prototype.isReactComponent = {}, dt.prototype.setState = function(s, x) {
    if (typeof s != "object" && typeof s != "function" && s != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, s, x, "setState");
  }, dt.prototype.forceUpdate = function(s) {
    this.updater.enqueueForceUpdate(this, s, "forceUpdate");
  };
  function Tt() {
  }
  Tt.prototype = dt.prototype;
  function w(s, x, D) {
    this.props = s, this.context = x, this.refs = rt, this.updater = D || q;
  }
  var At = w.prototype = new Tt();
  At.constructor = w, K(At, dt.prototype), At.isPureReactComponent = !0;
  var Ct = Array.isArray;
  function _t() {
  }
  var $ = { H: null, A: null, T: null, S: null }, Mt = Object.prototype.hasOwnProperty;
  function $t(s, x, D) {
    var N = D.ref;
    return {
      $$typeof: v,
      type: s,
      key: x,
      ref: N !== void 0 ? N : null,
      props: D
    };
  }
  function _l(s, x) {
    return $t(s.type, x, s.props);
  }
  function Z(s) {
    return typeof s == "object" && s !== null && s.$$typeof === v;
  }
  function it(s) {
    var x = { "=": "=0", ":": "=2" };
    return "$" + s.replace(/[=:]/g, function(D) {
      return x[D];
    });
  }
  var Ft = /\/+/g;
  function Jt(s, x) {
    return typeof s == "object" && s !== null && s.key != null ? it("" + s.key) : x.toString(36);
  }
  function Ml(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (typeof s.status == "string" ? s.then(_t, _t) : (s.status = "pending", s.then(
          function(x) {
            s.status === "pending" && (s.status = "fulfilled", s.value = x);
          },
          function(x) {
            s.status === "pending" && (s.status = "rejected", s.reason = x);
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
  function b(s, x, D, N, J) {
    var P = typeof s;
    (P === "undefined" || P === "boolean") && (s = null);
    var st = !1;
    if (s === null) st = !0;
    else
      switch (P) {
        case "bigint":
        case "string":
        case "number":
          st = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case v:
            case M:
              st = !0;
              break;
            case G:
              return st = s._init, b(
                st(s._payload),
                x,
                D,
                N,
                J
              );
          }
      }
    if (st)
      return J = J(s), st = N === "" ? "." + Jt(s, 0) : N, Ct(J) ? (D = "", st != null && (D = st.replace(Ft, "$&/") + "/"), b(J, x, D, "", function(Oa) {
        return Oa;
      })) : J != null && (Z(J) && (J = _l(
        J,
        D + (J.key == null || s && s.key === J.key ? "" : ("" + J.key).replace(
          Ft,
          "$&/"
        ) + "/") + st
      )), x.push(J)), 1;
    st = 0;
    var Wt = N === "" ? "." : N + ":";
    if (Ct(s))
      for (var Ut = 0; Ut < s.length; Ut++)
        N = s[Ut], P = Wt + Jt(N, Ut), st += b(
          N,
          x,
          D,
          P,
          J
        );
    else if (Ut = j(s), typeof Ut == "function")
      for (s = Ut.call(s), Ut = 0; !(N = s.next()).done; )
        N = N.value, P = Wt + Jt(N, Ut++), st += b(
          N,
          x,
          D,
          P,
          J
        );
    else if (P === "object") {
      if (typeof s.then == "function")
        return b(
          Ml(s),
          x,
          D,
          N,
          J
        );
      throw x = String(s), Error(
        "Objects are not valid as a React child (found: " + (x === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : x) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return st;
  }
  function O(s, x, D) {
    if (s == null) return s;
    var N = [], J = 0;
    return b(s, N, "", "", function(P) {
      return x.call(D, P, J++);
    }), N;
  }
  function L(s) {
    if (s._status === -1) {
      var x = s._result;
      x = x(), x.then(
        function(D) {
          (s._status === 0 || s._status === -1) && (s._status = 1, s._result = D);
        },
        function(D) {
          (s._status === 0 || s._status === -1) && (s._status = 2, s._result = D);
        }
      ), s._status === -1 && (s._status = 0, s._result = x);
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var yt = typeof reportError == "function" ? reportError : function(s) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var x = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof s == "object" && s !== null && typeof s.message == "string" ? String(s.message) : String(s),
        error: s
      });
      if (!window.dispatchEvent(x)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", s);
      return;
    }
    console.error(s);
  }, bt = {
    map: O,
    forEach: function(s, x, D) {
      O(
        s,
        function() {
          x.apply(this, arguments);
        },
        D
      );
    },
    count: function(s) {
      var x = 0;
      return O(s, function() {
        x++;
      }), x;
    },
    toArray: function(s) {
      return O(s, function(x) {
        return x;
      }) || [];
    },
    only: function(s) {
      if (!Z(s))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return s;
    }
  };
  return V.Activity = R, V.Children = bt, V.Component = dt, V.Fragment = T, V.Profiler = Q, V.PureComponent = w, V.StrictMode = d, V.Suspense = C, V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, V.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(s) {
      return $.H.useMemoCache(s);
    }
  }, V.cache = function(s) {
    return function() {
      return s.apply(null, arguments);
    };
  }, V.cacheSignal = function() {
    return null;
  }, V.cloneElement = function(s, x, D) {
    if (s == null)
      throw Error(
        "The argument must be a React element, but you passed " + s + "."
      );
    var N = K({}, s.props), J = s.key;
    if (x != null)
      for (P in x.key !== void 0 && (J = "" + x.key), x)
        !Mt.call(x, P) || P === "key" || P === "__self" || P === "__source" || P === "ref" && x.ref === void 0 || (N[P] = x[P]);
    var P = arguments.length - 2;
    if (P === 1) N.children = D;
    else if (1 < P) {
      for (var st = Array(P), Wt = 0; Wt < P; Wt++)
        st[Wt] = arguments[Wt + 2];
      N.children = st;
    }
    return $t(s.type, J, N);
  }, V.createContext = function(s) {
    return s = {
      $$typeof: ut,
      _currentValue: s,
      _currentValue2: s,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, s.Provider = s, s.Consumer = {
      $$typeof: B,
      _context: s
    }, s;
  }, V.createElement = function(s, x, D) {
    var N, J = {}, P = null;
    if (x != null)
      for (N in x.key !== void 0 && (P = "" + x.key), x)
        Mt.call(x, N) && N !== "key" && N !== "__self" && N !== "__source" && (J[N] = x[N]);
    var st = arguments.length - 2;
    if (st === 1) J.children = D;
    else if (1 < st) {
      for (var Wt = Array(st), Ut = 0; Ut < st; Ut++)
        Wt[Ut] = arguments[Ut + 2];
      J.children = Wt;
    }
    if (s && s.defaultProps)
      for (N in st = s.defaultProps, st)
        J[N] === void 0 && (J[N] = st[N]);
    return $t(s, P, J);
  }, V.createRef = function() {
    return { current: null };
  }, V.forwardRef = function(s) {
    return { $$typeof: F, render: s };
  }, V.isValidElement = Z, V.lazy = function(s) {
    return {
      $$typeof: G,
      _payload: { _status: -1, _result: s },
      _init: L
    };
  }, V.memo = function(s, x) {
    return {
      $$typeof: z,
      type: s,
      compare: x === void 0 ? null : x
    };
  }, V.startTransition = function(s) {
    var x = $.T, D = {};
    $.T = D;
    try {
      var N = s(), J = $.S;
      J !== null && J(D, N), typeof N == "object" && N !== null && typeof N.then == "function" && N.then(_t, yt);
    } catch (P) {
      yt(P);
    } finally {
      x !== null && D.types !== null && (x.types = D.types), $.T = x;
    }
  }, V.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, V.use = function(s) {
    return $.H.use(s);
  }, V.useActionState = function(s, x, D) {
    return $.H.useActionState(s, x, D);
  }, V.useCallback = function(s, x) {
    return $.H.useCallback(s, x);
  }, V.useContext = function(s) {
    return $.H.useContext(s);
  }, V.useDebugValue = function() {
  }, V.useDeferredValue = function(s, x) {
    return $.H.useDeferredValue(s, x);
  }, V.useEffect = function(s, x) {
    return $.H.useEffect(s, x);
  }, V.useEffectEvent = function(s) {
    return $.H.useEffectEvent(s);
  }, V.useId = function() {
    return $.H.useId();
  }, V.useImperativeHandle = function(s, x, D) {
    return $.H.useImperativeHandle(s, x, D);
  }, V.useInsertionEffect = function(s, x) {
    return $.H.useInsertionEffect(s, x);
  }, V.useLayoutEffect = function(s, x) {
    return $.H.useLayoutEffect(s, x);
  }, V.useMemo = function(s, x) {
    return $.H.useMemo(s, x);
  }, V.useOptimistic = function(s, x) {
    return $.H.useOptimistic(s, x);
  }, V.useReducer = function(s, x, D) {
    return $.H.useReducer(s, x, D);
  }, V.useRef = function(s) {
    return $.H.useRef(s);
  }, V.useState = function(s) {
    return $.H.useState(s);
  }, V.useSyncExternalStore = function(s, x, D) {
    return $.H.useSyncExternalStore(
      s,
      x,
      D
    );
  }, V.useTransition = function() {
    return $.H.useTransition();
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
  function M(C) {
    var z = "https://react.dev/errors/" + C;
    if (1 < arguments.length) {
      z += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var G = 2; G < arguments.length; G++)
        z += "&args[]=" + encodeURIComponent(arguments[G]);
    }
    return "Minified React error #" + C + "; visit " + z + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function T() {
  }
  var d = {
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
  }, Q = Symbol.for("react.portal");
  function B(C, z, G) {
    var R = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Q,
      key: R == null ? null : "" + R,
      children: C,
      containerInfo: z,
      implementation: G
    };
  }
  var ut = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function F(C, z) {
    if (C === "font") return "";
    if (typeof z == "string")
      return z === "use-credentials" ? z : "";
  }
  return Kt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = d, Kt.createPortal = function(C, z) {
    var G = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!z || z.nodeType !== 1 && z.nodeType !== 9 && z.nodeType !== 11)
      throw Error(M(299));
    return B(C, z, null, G);
  }, Kt.flushSync = function(C) {
    var z = ut.T, G = d.p;
    try {
      if (ut.T = null, d.p = 2, C) return C();
    } finally {
      ut.T = z, d.p = G, d.d.f();
    }
  }, Kt.preconnect = function(C, z) {
    typeof C == "string" && (z ? (z = z.crossOrigin, z = typeof z == "string" ? z === "use-credentials" ? z : "" : void 0) : z = null, d.d.C(C, z));
  }, Kt.prefetchDNS = function(C) {
    typeof C == "string" && d.d.D(C);
  }, Kt.preinit = function(C, z) {
    if (typeof C == "string" && z && typeof z.as == "string") {
      var G = z.as, R = F(G, z.crossOrigin), I = typeof z.integrity == "string" ? z.integrity : void 0, j = typeof z.fetchPriority == "string" ? z.fetchPriority : void 0;
      G === "style" ? d.d.S(
        C,
        typeof z.precedence == "string" ? z.precedence : void 0,
        {
          crossOrigin: R,
          integrity: I,
          fetchPriority: j
        }
      ) : G === "script" && d.d.X(C, {
        crossOrigin: R,
        integrity: I,
        fetchPriority: j,
        nonce: typeof z.nonce == "string" ? z.nonce : void 0
      });
    }
  }, Kt.preinitModule = function(C, z) {
    if (typeof C == "string")
      if (typeof z == "object" && z !== null) {
        if (z.as == null || z.as === "script") {
          var G = F(
            z.as,
            z.crossOrigin
          );
          d.d.M(C, {
            crossOrigin: G,
            integrity: typeof z.integrity == "string" ? z.integrity : void 0,
            nonce: typeof z.nonce == "string" ? z.nonce : void 0
          });
        }
      } else z == null && d.d.M(C);
  }, Kt.preload = function(C, z) {
    if (typeof C == "string" && typeof z == "object" && z !== null && typeof z.as == "string") {
      var G = z.as, R = F(G, z.crossOrigin);
      d.d.L(C, G, {
        crossOrigin: R,
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
  }, Kt.preloadModule = function(C, z) {
    if (typeof C == "string")
      if (z) {
        var G = F(z.as, z.crossOrigin);
        d.d.m(C, {
          as: typeof z.as == "string" && z.as !== "script" ? z.as : void 0,
          crossOrigin: G,
          integrity: typeof z.integrity == "string" ? z.integrity : void 0
        });
      } else d.d.m(C);
  }, Kt.requestFormReset = function(C) {
    d.d.r(C);
  }, Kt.unstable_batchedUpdates = function(C, z) {
    return C(z);
  }, Kt.useFormState = function(C, z, G) {
    return ut.H.useFormState(C, z, G);
  }, Kt.useFormStatus = function() {
    return ut.H.useHostTransitionStatus();
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
  if (M1) return zu;
  M1 = 1;
  var v = hm(), M = vf(), T = gm();
  function d(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Q(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function B(t) {
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
  function ut(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function F(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (B(t) !== t)
      throw Error(d(188));
  }
  function z(t) {
    var l = t.alternate;
    if (!l) {
      if (l = B(t), l === null) throw Error(d(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return C(u), t;
          if (n === a) return C(u), l;
          n = n.sibling;
        }
        throw Error(d(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
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
        if (!i) {
          for (c = n.child; c; ) {
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
          if (!i) throw Error(d(189));
        }
      }
      if (e.alternate !== a) throw Error(d(190));
    }
    if (e.tag !== 3) throw Error(d(188));
    return e.stateNode.current === e ? t : l;
  }
  function G(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = G(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var R = Object.assign, I = Symbol.for("react.element"), j = Symbol.for("react.transitional.element"), q = Symbol.for("react.portal"), K = Symbol.for("react.fragment"), rt = Symbol.for("react.strict_mode"), dt = Symbol.for("react.profiler"), Tt = Symbol.for("react.consumer"), w = Symbol.for("react.context"), At = Symbol.for("react.forward_ref"), Ct = Symbol.for("react.suspense"), _t = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), Mt = Symbol.for("react.lazy"), $t = Symbol.for("react.activity"), _l = Symbol.for("react.memo_cache_sentinel"), Z = Symbol.iterator;
  function it(t) {
    return t === null || typeof t != "object" ? null : (t = Z && t[Z] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Ft = Symbol.for("react.client.reference");
  function Jt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Ft ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case K:
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
        case w:
          return t.displayName || "Context";
        case Tt:
          return (t._context.displayName || "Context") + ".Consumer";
        case At:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case $:
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
  var Ml = Array.isArray, b = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = T.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, yt = [], bt = -1;
  function s(t) {
    return { current: t };
  }
  function x(t) {
    0 > bt || (t.current = yt[bt], yt[bt] = null, bt--);
  }
  function D(t, l) {
    bt++, yt[bt] = t.current, t.current = l;
  }
  var N = s(null), J = s(null), P = s(null), st = s(null);
  function Wt(t, l) {
    switch (D(P, l), D(J, t), D(N, null), l.nodeType) {
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
    x(N), D(N, t);
  }
  function Ut() {
    x(N), x(J), x(P);
  }
  function Oa(t) {
    t.memoizedState !== null && D(st, t);
    var l = N.current, e = L0(l, t.type);
    l !== e && (D(J, t), D(N, e));
  }
  function xu(t) {
    J.current === t && (x(N), x(J)), st.current === t && (x(st), gu._currentValue = L);
  }
  var Ln, gf;
  function Ae(t) {
    if (Ln === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Ln = l && l[1] || "", gf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ln + t + gf;
  }
  var wn = !1;
  function Vn(t, l) {
    if (!t || wn) return "";
    wn = !0;
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
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var f = i.split(`
`), h = c.split(`
`);
        for (u = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < h.length && !h[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === f.length || u === h.length)
          for (a = f.length - 1, u = h.length - 1; 1 <= a && 0 <= u && f[a] !== h[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (f[a] !== h[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || f[a] !== h[u]) {
                  var p = `
` + f[a].replace(" at new ", " at ");
                  return t.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", t.displayName)), p;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      wn = !1, Error.prepareStackTrace = e;
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
        return Vn(t.type, !1);
      case 11:
        return Vn(t.type.render, !1);
      case 1:
        return Vn(t.type, !0);
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
  var Kn = Object.prototype.hasOwnProperty, Jn = v.unstable_scheduleCallback, Wn = v.unstable_cancelCallback, X1 = v.unstable_shouldYield, Q1 = v.unstable_requestPaint, nl = v.unstable_now, L1 = v.unstable_getCurrentPriorityLevel, bf = v.unstable_ImmediatePriority, Sf = v.unstable_UserBlockingPriority, Tu = v.unstable_NormalPriority, w1 = v.unstable_LowPriority, Ef = v.unstable_IdlePriority, V1 = v.log, K1 = v.unstable_setDisableYieldValue, Da = null, il = null;
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
  var Au = 256, _u = 262144, Mu = 4194304;
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
  function Ou(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = _e(a) : (i &= c, i !== 0 ? u = _e(i) : e || (e = c & ~t, e !== 0 && (u = _e(e))))) : (c = a & ~n, c !== 0 ? u = _e(c) : i !== 0 ? u = _e(i) : e || (e = a & ~t, e !== 0 && (u = _e(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
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
    var t = Mu;
    return Mu <<= 1, (Mu & 62914560) === 0 && (Mu = 4194304), t;
  }
  function kn(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Ua(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function F1(t, l, e, a, u, n) {
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
    a !== 0 && xf(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function xf(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - cl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Tf(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - cl(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function Af(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : $n(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function $n(t) {
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
  function Fn(t) {
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
  var le = Math.random().toString(36).slice(2), Xt = "__reactFiber$" + le, It = "__reactProps$" + le, we = "__reactContainer$" + le, In = "__reactEvents$" + le, I1 = "__reactListeners$" + le, P1 = "__reactHandles$" + le, Of = "__reactResources$" + le, Na = "__reactMarker$" + le;
  function Pn(t) {
    delete t[Xt], delete t[It], delete t[In], delete t[I1], delete t[P1];
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
    throw Error(d(33));
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
    return Kn.call(Nf, t) ? !0 : Kn.call(Uf, t) ? !1 : tr.test(t) ? Nf[t] = !0 : (Uf[t] = !0, !1);
  }
  function Du(t, l, e) {
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
  function Cu(t, l, e) {
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
  function Rl(t, l, e, a) {
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
      var u = a.get, n = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
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
  function Uu(t) {
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
  function li(t, l, e, a, u, n, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + vl(l)) : t.value !== "" + vl(l) && (t.value = "" + vl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? ei(t, i, vl(l)) : e != null ? ei(t, i, vl(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + vl(c) : t.removeAttribute("name");
  }
  function Rf(t, l, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        ti(t);
        return;
      }
      e = e != null ? "" + vl(e) : "", l = l != null ? "" + vl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), ti(t);
  }
  function ei(t, l, e) {
    l === "number" && Uu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function ke(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < e.length; u++)
        l["$" + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        u = l.hasOwnProperty("$" + t[e].value), t[e].selected !== u && (t[e].selected = u), u && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + vl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
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
  function Yf(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(d(92));
        if (Ml(a)) {
          if (1 < a.length) throw Error(d(93));
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
  var ur = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Bf(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || ur.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Gf(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(d(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && Bf(t, u, a);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && Bf(t, n, l[n]);
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
  var nr = /* @__PURE__ */ new Map([
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
  function Nu(t) {
    return ir.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ql() {
  }
  var ui = null;
  function ni(t) {
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
                var u = a[It] || null;
                if (!u) throw Error(d(90));
                li(
                  a,
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
      if (ii = !1, (Fe !== null || Ie !== null) && (Sn(), Fe && (l = Fe, t = Ie, Ie = Fe = null, Zf(l), t)))
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
        d(231, l, typeof e)
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
  var ee = null, fi = null, Hu = null;
  function Qf() {
    if (Hu) return Hu;
    var t, l = fi, e = l.length, a, u = "value" in ee ? ee.value : ee.textContent, n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === u[n - a]; a++) ;
    return Hu = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ju(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Ru() {
    return !0;
  }
  function Lf() {
    return !1;
  }
  function Pt(t) {
    function l(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Ru : Lf, this.isPropagationStopped = Lf, this;
    }
    return R(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Ru);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Ru);
      },
      persist: function() {
      },
      isPersistent: Ru
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
  }, qu = Pt(Oe), qa = R({}, Oe, { view: 0, detail: 0 }), cr = Pt(qa), oi, si, Ya, Yu = R({}, qa, {
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
      return "movementX" in t ? t.movementX : (t !== Ya && (Ya && t.type === "mousemove" ? (oi = t.screenX - Ya.screenX, si = t.screenY - Ya.screenY) : si = oi = 0, Ya = t), oi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : si;
    }
  }), wf = Pt(Yu), fr = R({}, Yu, { dataTransfer: 0 }), or = Pt(fr), sr = R({}, qa, { relatedTarget: 0 }), ri = Pt(sr), rr = R({}, Oe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), dr = Pt(rr), mr = R({}, Oe, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), hr = Pt(mr), yr = R({}, Oe, { data: 0 }), Vf = Pt(yr), vr = {
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
  var Sr = R({}, qa, {
    key: function(t) {
      if (t.key) {
        var l = vr[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = ju(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? gr[t.keyCode] || "Unidentified" : "";
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
      return t.type === "keypress" ? ju(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ju(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Er = Pt(Sr), zr = R({}, Yu, {
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
  }), Kf = Pt(zr), xr = R({}, qa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: di
  }), Tr = Pt(xr), Ar = R({}, Oe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _r = Pt(Ar), Mr = R({}, Yu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Or = Pt(Mr), Dr = R({}, Oe, {
    newState: 0,
    oldState: 0
  }), Cr = Pt(Dr), Ur = [9, 13, 27, 32], mi = Yl && "CompositionEvent" in window, Ba = null;
  Yl && "documentMode" in document && (Ba = document.documentMode);
  var Nr = Yl && "TextEvent" in window && !Ba, Jf = Yl && (!mi || Ba && 8 < Ba && 11 >= Ba), Wf = " ", kf = !1;
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
      return t === "compositionend" || !mi && $f(t, l) ? (t = Qf(), Hu = fi = ee = null, Pe = !1, t) : null;
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
    Fe ? Ie ? Ie.push(a) : Ie = [a] : Fe = a, l = Mn(l, "onChange"), 0 < l.length && (e = new qu(
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
  function Bu(t) {
    var l = Ha(t);
    if (jf(l)) return t;
  }
  function to(t, l) {
    if (t === "change") return l;
  }
  var lo = !1;
  if (Yl) {
    var hi;
    if (Yl) {
      var yi = "oninput" in document;
      if (!yi) {
        var eo = document.createElement("div");
        eo.setAttribute("oninput", "return;"), yi = typeof eo.oninput == "function";
      }
      hi = yi;
    } else hi = !1;
    lo = hi && (!document.documentMode || 9 < document.documentMode);
  }
  function ao() {
    Ga && (Ga.detachEvent("onpropertychange", uo), Za = Ga = null);
  }
  function uo(t) {
    if (t.propertyName === "value" && Bu(Za)) {
      var l = [];
      Pf(
        l,
        Za,
        t,
        ni(t)
      ), Xf(qr, l);
    }
  }
  function Yr(t, l, e) {
    t === "focusin" ? (ao(), Ga = l, Za = e, Ga.attachEvent("onpropertychange", uo)) : t === "focusout" && ao();
  }
  function Br(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Bu(Za);
  }
  function Gr(t, l) {
    if (t === "click") return Bu(l);
  }
  function Zr(t, l) {
    if (t === "input" || t === "change")
      return Bu(l);
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
      var u = e[a];
      if (!Kn.call(l, u) || !fl(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function no(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function io(t, l) {
    var e = no(t);
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
      e = no(e);
    }
  }
  function co(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? co(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function fo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Uu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Uu(t.document);
    }
    return l;
  }
  function vi(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Qr = Yl && "documentMode" in document && 11 >= document.documentMode, ta = null, gi = null, Qa = null, pi = !1;
  function oo(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    pi || ta == null || ta !== Uu(a) || (a = ta, "selectionStart" in a && vi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Qa && Xa(Qa, a) || (Qa = a, a = Mn(gi, "onSelect"), 0 < a.length && (l = new qu(
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
  }, bi = {}, so = {};
  Yl && (so = document.createElement("div").style, "AnimationEvent" in window || (delete la.animationend.animation, delete la.animationiteration.animation, delete la.animationstart.animation), "TransitionEvent" in window || delete la.transitionend.transition);
  function Ce(t) {
    if (bi[t]) return bi[t];
    if (!la[t]) return t;
    var l = la[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in so)
        return bi[t] = l[e];
    return t;
  }
  var ro = Ce("animationend"), mo = Ce("animationiteration"), ho = Ce("animationstart"), Lr = Ce("transitionrun"), wr = Ce("transitionstart"), Vr = Ce("transitioncancel"), yo = Ce("transitionend"), vo = /* @__PURE__ */ new Map(), Si = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Si.push("scrollEnd");
  function Ol(t, l) {
    vo.set(t, l), Me(l, [t]);
  }
  var Gu = typeof reportError == "function" ? reportError : function(t) {
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
  function Zu() {
    for (var t = ea, l = Ei = ea = 0; l < t; ) {
      var e = pl[l];
      pl[l++] = null;
      var a = pl[l];
      pl[l++] = null;
      var u = pl[l];
      pl[l++] = null;
      var n = pl[l];
      if (pl[l++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && go(e, u, n);
    }
  }
  function Xu(t, l, e, a) {
    pl[ea++] = t, pl[ea++] = l, pl[ea++] = e, pl[ea++] = a, Ei |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function zi(t, l, e, a) {
    return Xu(t, l, e, a), Qu(t);
  }
  function Ue(t, l) {
    return Xu(t, null, null, l), Qu(t);
  }
  function go(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - cl(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function Qu(t) {
    if (50 < su)
      throw su = 0, Uc = null, Error(d(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var aa = {};
  function Kr(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ol(t, l, e, a) {
    return new Kr(t, l, e, a);
  }
  function xi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Bl(t, l) {
    var e = t.alternate;
    return e === null ? (e = ol(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function po(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Lu(t, l, e, a, u, n) {
    var i = 0;
    if (a = t, typeof t == "function") xi(t) && (i = 1);
    else if (typeof t == "string")
      i = Fd(
        t,
        e,
        N.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case $t:
          return t = ol(31, e, l, u), t.elementType = $t, t.lanes = n, t;
        case K:
          return Ne(e.children, u, n, l);
        case rt:
          i = 8, u |= 24;
          break;
        case dt:
          return t = ol(12, e, l, u | 2), t.elementType = dt, t.lanes = n, t;
        case Ct:
          return t = ol(13, e, l, u), t.elementType = Ct, t.lanes = n, t;
        case _t:
          return t = ol(19, e, l, u), t.elementType = _t, t.lanes = n, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case w:
                i = 10;
                break t;
              case Tt:
                i = 9;
                break t;
              case At:
                i = 11;
                break t;
              case $:
                i = 14;
                break t;
              case Mt:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            d(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = ol(i, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function Ne(t, l, e, a) {
    return t = ol(7, t, a, l), t.lanes = e, t;
  }
  function Ti(t, l, e) {
    return t = ol(6, t, null, l), t.lanes = e, t;
  }
  function bo(t) {
    var l = ol(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Ai(t, l, e) {
    return l = ol(
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
  var So = /* @__PURE__ */ new WeakMap();
  function bl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = So.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: pf(l)
      }, So.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: pf(l)
    };
  }
  var ua = [], na = 0, wu = null, La = 0, Sl = [], El = 0, ae = null, Ul = 1, Nl = "";
  function Gl(t, l) {
    ua[na++] = La, ua[na++] = wu, wu = t, La = l;
  }
  function Eo(t, l, e) {
    Sl[El++] = Ul, Sl[El++] = Nl, Sl[El++] = ae, ae = t;
    var a = Ul;
    t = Nl;
    var u = 32 - cl(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - cl(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Ul = 1 << 32 - cl(l) + u | e << u | a, Nl = n + t;
    } else
      Ul = 1 << n | e << u | a, Nl = t;
  }
  function _i(t) {
    t.return !== null && (Gl(t, 1), Eo(t, 1, 0));
  }
  function Mi(t) {
    for (; t === wu; )
      wu = ua[--na], ua[na] = null, La = ua[--na], ua[na] = null;
    for (; t === ae; )
      ae = Sl[--El], Sl[El] = null, Nl = Sl[--El], Sl[El] = null, Ul = Sl[--El], Sl[El] = null;
  }
  function zo(t, l) {
    Sl[El++] = Ul, Sl[El++] = Nl, Sl[El++] = ae, Ul = l.id, Nl = l.overflow, ae = t;
  }
  var Qt = null, Et = null, nt = !1, ue = null, zl = !1, Oi = Error(d(519));
  function ne(t) {
    var l = Error(
      d(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw wa(bl(l, t)), Oi;
  }
  function xo(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[Xt] = t, l[It] = a, e) {
      case "dialog":
        lt("cancel", l), lt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        lt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < du.length; e++)
          lt(du[e], l);
        break;
      case "source":
        lt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        lt("error", l), lt("load", l);
        break;
      case "details":
        lt("toggle", l);
        break;
      case "input":
        lt("invalid", l), Rf(
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
        lt("invalid", l);
        break;
      case "textarea":
        lt("invalid", l), Yf(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Z0(l.textContent, e) ? (a.popover != null && (lt("beforetoggle", l), lt("toggle", l)), a.onScroll != null && lt("scroll", l), a.onScrollEnd != null && lt("scrollend", l), a.onClick != null && (l.onclick = ql), l = !0) : l = !1, l || ne(t, !0);
  }
  function To(t) {
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
    if (!nt) return To(t), nt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Kc(t.type, t.memoizedProps)), e = !e), e && Et && ne(t), To(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(d(317));
      Et = k0(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(d(317));
      Et = k0(t);
    } else
      l === 27 ? (l = Et, be(t.type) ? (t = Fc, Fc = null, Et = t) : Et = l) : Et = Qt ? Tl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function He() {
    Et = Qt = null, nt = !1;
  }
  function Di() {
    var t = ue;
    return t !== null && (al === null ? al = t : al.push.apply(
      al,
      t
    ), ue = null), t;
  }
  function wa(t) {
    ue === null ? ue = [t] : ue.push(t);
  }
  var Ci = s(null), je = null, Zl = null;
  function ie(t, l, e) {
    D(Ci, l._currentValue), l._currentValue = e;
  }
  function Xl(t) {
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
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < l.length; f++)
            if (c.context === l[f]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), Ui(
                n.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(d(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), Ui(i, e, t), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
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
  function ca(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(d(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          fl(u.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (u === st.current) {
        if (i = u.alternate, i === null) throw Error(d(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(gu) : t = [gu]);
      }
      u = u.return;
    }
    t !== null && Ni(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function Vu(t) {
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
    je = t, Zl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Lt(t) {
    return Ao(je, t);
  }
  function Ku(t, l) {
    return je === null && Re(t), Ao(t, l);
  }
  function Ao(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Zl === null) {
      if (t === null) throw Error(d(308));
      Zl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Zl = Zl.next = l;
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
    $$typeof: w,
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
  var Ka = null, ji = 0, fa = 0, oa = null;
  function $r(t, l) {
    if (Ka === null) {
      var e = Ka = [];
      ji = 0, fa = Yc(), oa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return ji++, l.then(_o, _o), l;
  }
  function _o() {
    if (--ji === 0 && Ka !== null) {
      oa !== null && (oa.status = "fulfilled");
      var t = Ka;
      Ka = null, fa = 0, oa = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Fr(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var u = 0; u < e.length; u++) (0, e[u])(l);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var Mo = b.S;
  b.S = function(t, l) {
    s0 = nl(), typeof l == "object" && l !== null && typeof l.then == "function" && $r(t, l), Mo !== null && Mo(t, l);
  };
  var qe = s(null);
  function Ri() {
    var t = qe.current;
    return t !== null ? t : St.pooledCache;
  }
  function Ju(t, l) {
    l === null ? D(qe, qe.current) : D(qe, l.pool);
  }
  function Oo() {
    var t = Ri();
    return t === null ? null : { parent: jt._currentValue, pool: t };
  }
  var sa = Error(d(460)), qi = Error(d(474)), Wu = Error(d(542)), ku = { then: function() {
  } };
  function Do(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Co(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(ql, ql), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, No(t), t;
      default:
        if (typeof l.status == "string") l.then(ql, ql);
        else {
          if (t = St, t !== null && 100 < t.shellSuspendCounter)
            throw Error(d(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, No(t), t;
        }
        throw Be = l, sa;
    }
  }
  function Ye(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Be = e, sa) : e;
    }
  }
  var Be = null;
  function Uo() {
    if (Be === null) throw Error(d(459));
    var t = Be;
    return Be = null, t;
  }
  function No(t) {
    if (t === sa || t === Wu)
      throw Error(d(483));
  }
  var ra = null, Ja = 0;
  function $u(t) {
    var l = Ja;
    return Ja += 1, ra === null && (ra = []), Co(ra, t, l);
  }
  function Wa(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function Fu(t, l) {
    throw l.$$typeof === I ? Error(d(525)) : (t = Object.prototype.toString.call(l), Error(
      d(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Ho(t) {
    function l(r, o) {
      if (t) {
        var m = r.deletions;
        m === null ? (r.deletions = [o], r.flags |= 16) : m.push(o);
      }
    }
    function e(r, o) {
      if (!t) return null;
      for (; o !== null; )
        l(r, o), o = o.sibling;
      return null;
    }
    function a(r) {
      for (var o = /* @__PURE__ */ new Map(); r !== null; )
        r.key !== null ? o.set(r.key, r) : o.set(r.index, r), r = r.sibling;
      return o;
    }
    function u(r, o) {
      return r = Bl(r, o), r.index = 0, r.sibling = null, r;
    }
    function n(r, o, m) {
      return r.index = m, t ? (m = r.alternate, m !== null ? (m = m.index, m < o ? (r.flags |= 67108866, o) : m) : (r.flags |= 67108866, o)) : (r.flags |= 1048576, o);
    }
    function i(r) {
      return t && r.alternate === null && (r.flags |= 67108866), r;
    }
    function c(r, o, m, S) {
      return o === null || o.tag !== 6 ? (o = Ti(m, r.mode, S), o.return = r, o) : (o = u(o, m), o.return = r, o);
    }
    function f(r, o, m, S) {
      var Y = m.type;
      return Y === K ? p(
        r,
        o,
        m.props.children,
        S,
        m.key
      ) : o !== null && (o.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Mt && Ye(Y) === o.type) ? (o = u(o, m.props), Wa(o, m), o.return = r, o) : (o = Lu(
        m.type,
        m.key,
        m.props,
        null,
        r.mode,
        S
      ), Wa(o, m), o.return = r, o);
    }
    function h(r, o, m, S) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== m.containerInfo || o.stateNode.implementation !== m.implementation ? (o = Ai(m, r.mode, S), o.return = r, o) : (o = u(o, m.children || []), o.return = r, o);
    }
    function p(r, o, m, S, Y) {
      return o === null || o.tag !== 7 ? (o = Ne(
        m,
        r.mode,
        S,
        Y
      ), o.return = r, o) : (o = u(o, m), o.return = r, o);
    }
    function E(r, o, m) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = Ti(
          "" + o,
          r.mode,
          m
        ), o.return = r, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case j:
            return m = Lu(
              o.type,
              o.key,
              o.props,
              null,
              r.mode,
              m
            ), Wa(m, o), m.return = r, m;
          case q:
            return o = Ai(
              o,
              r.mode,
              m
            ), o.return = r, o;
          case Mt:
            return o = Ye(o), E(r, o, m);
        }
        if (Ml(o) || it(o))
          return o = Ne(
            o,
            r.mode,
            m,
            null
          ), o.return = r, o;
        if (typeof o.then == "function")
          return E(r, $u(o), m);
        if (o.$$typeof === w)
          return E(
            r,
            Ku(r, o),
            m
          );
        Fu(r, o);
      }
      return null;
    }
    function y(r, o, m, S) {
      var Y = o !== null ? o.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return Y !== null ? null : c(r, o, "" + m, S);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case j:
            return m.key === Y ? f(r, o, m, S) : null;
          case q:
            return m.key === Y ? h(r, o, m, S) : null;
          case Mt:
            return m = Ye(m), y(r, o, m, S);
        }
        if (Ml(m) || it(m))
          return Y !== null ? null : p(r, o, m, S, null);
        if (typeof m.then == "function")
          return y(
            r,
            o,
            $u(m),
            S
          );
        if (m.$$typeof === w)
          return y(
            r,
            o,
            Ku(r, m),
            S
          );
        Fu(r, m);
      }
      return null;
    }
    function g(r, o, m, S, Y) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return r = r.get(m) || null, c(o, r, "" + S, Y);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case j:
            return r = r.get(
              S.key === null ? m : S.key
            ) || null, f(o, r, S, Y);
          case q:
            return r = r.get(
              S.key === null ? m : S.key
            ) || null, h(o, r, S, Y);
          case Mt:
            return S = Ye(S), g(
              r,
              o,
              m,
              S,
              Y
            );
        }
        if (Ml(S) || it(S))
          return r = r.get(m) || null, p(o, r, S, Y, null);
        if (typeof S.then == "function")
          return g(
            r,
            o,
            m,
            $u(S),
            Y
          );
        if (S.$$typeof === w)
          return g(
            r,
            o,
            m,
            Ku(o, S),
            Y
          );
        Fu(o, S);
      }
      return null;
    }
    function U(r, o, m, S) {
      for (var Y = null, ct = null, H = o, k = o = 0, at = null; H !== null && k < m.length; k++) {
        H.index > k ? (at = H, H = null) : at = H.sibling;
        var ft = y(
          r,
          H,
          m[k],
          S
        );
        if (ft === null) {
          H === null && (H = at);
          break;
        }
        t && H && ft.alternate === null && l(r, H), o = n(ft, o, k), ct === null ? Y = ft : ct.sibling = ft, ct = ft, H = at;
      }
      if (k === m.length)
        return e(r, H), nt && Gl(r, k), Y;
      if (H === null) {
        for (; k < m.length; k++)
          H = E(r, m[k], S), H !== null && (o = n(
            H,
            o,
            k
          ), ct === null ? Y = H : ct.sibling = H, ct = H);
        return nt && Gl(r, k), Y;
      }
      for (H = a(H); k < m.length; k++)
        at = g(
          H,
          r,
          k,
          m[k],
          S
        ), at !== null && (t && at.alternate !== null && H.delete(
          at.key === null ? k : at.key
        ), o = n(
          at,
          o,
          k
        ), ct === null ? Y = at : ct.sibling = at, ct = at);
      return t && H.forEach(function(Te) {
        return l(r, Te);
      }), nt && Gl(r, k), Y;
    }
    function X(r, o, m, S) {
      if (m == null) throw Error(d(151));
      for (var Y = null, ct = null, H = o, k = o = 0, at = null, ft = m.next(); H !== null && !ft.done; k++, ft = m.next()) {
        H.index > k ? (at = H, H = null) : at = H.sibling;
        var Te = y(r, H, ft.value, S);
        if (Te === null) {
          H === null && (H = at);
          break;
        }
        t && H && Te.alternate === null && l(r, H), o = n(Te, o, k), ct === null ? Y = Te : ct.sibling = Te, ct = Te, H = at;
      }
      if (ft.done)
        return e(r, H), nt && Gl(r, k), Y;
      if (H === null) {
        for (; !ft.done; k++, ft = m.next())
          ft = E(r, ft.value, S), ft !== null && (o = n(ft, o, k), ct === null ? Y = ft : ct.sibling = ft, ct = ft);
        return nt && Gl(r, k), Y;
      }
      for (H = a(H); !ft.done; k++, ft = m.next())
        ft = g(H, r, k, ft.value, S), ft !== null && (t && ft.alternate !== null && H.delete(ft.key === null ? k : ft.key), o = n(ft, o, k), ct === null ? Y = ft : ct.sibling = ft, ct = ft);
      return t && H.forEach(function(fm) {
        return l(r, fm);
      }), nt && Gl(r, k), Y;
    }
    function pt(r, o, m, S) {
      if (typeof m == "object" && m !== null && m.type === K && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case j:
            t: {
              for (var Y = m.key; o !== null; ) {
                if (o.key === Y) {
                  if (Y = m.type, Y === K) {
                    if (o.tag === 7) {
                      e(
                        r,
                        o.sibling
                      ), S = u(
                        o,
                        m.props.children
                      ), S.return = r, r = S;
                      break t;
                    }
                  } else if (o.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === Mt && Ye(Y) === o.type) {
                    e(
                      r,
                      o.sibling
                    ), S = u(o, m.props), Wa(S, m), S.return = r, r = S;
                    break t;
                  }
                  e(r, o);
                  break;
                } else l(r, o);
                o = o.sibling;
              }
              m.type === K ? (S = Ne(
                m.props.children,
                r.mode,
                S,
                m.key
              ), S.return = r, r = S) : (S = Lu(
                m.type,
                m.key,
                m.props,
                null,
                r.mode,
                S
              ), Wa(S, m), S.return = r, r = S);
            }
            return i(r);
          case q:
            t: {
              for (Y = m.key; o !== null; ) {
                if (o.key === Y)
                  if (o.tag === 4 && o.stateNode.containerInfo === m.containerInfo && o.stateNode.implementation === m.implementation) {
                    e(
                      r,
                      o.sibling
                    ), S = u(o, m.children || []), S.return = r, r = S;
                    break t;
                  } else {
                    e(r, o);
                    break;
                  }
                else l(r, o);
                o = o.sibling;
              }
              S = Ai(m, r.mode, S), S.return = r, r = S;
            }
            return i(r);
          case Mt:
            return m = Ye(m), pt(
              r,
              o,
              m,
              S
            );
        }
        if (Ml(m))
          return U(
            r,
            o,
            m,
            S
          );
        if (it(m)) {
          if (Y = it(m), typeof Y != "function") throw Error(d(150));
          return m = Y.call(m), X(
            r,
            o,
            m,
            S
          );
        }
        if (typeof m.then == "function")
          return pt(
            r,
            o,
            $u(m),
            S
          );
        if (m.$$typeof === w)
          return pt(
            r,
            o,
            Ku(r, m),
            S
          );
        Fu(r, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, o !== null && o.tag === 6 ? (e(r, o.sibling), S = u(o, m), S.return = r, r = S) : (e(r, o), S = Ti(m, r.mode, S), S.return = r, r = S), i(r)) : e(r, o);
    }
    return function(r, o, m, S) {
      try {
        Ja = 0;
        var Y = pt(
          r,
          o,
          m,
          S
        );
        return ra = null, Y;
      } catch (H) {
        if (H === sa || H === Wu) throw H;
        var ct = ol(29, H, null, r.mode);
        return ct.lanes = S, ct.return = r, ct;
      } finally {
      }
    };
  }
  var Ge = Ho(!0), jo = Ho(!1), ce = !1;
  function Yi(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bi(t, l) {
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
  function oe(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ot & 2) !== 0) {
      var u = a.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = Qu(t), go(t, null, e), l;
    }
    return Xu(t, a, l, e), Qu(t);
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
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = l : n = n.next = l;
      } else u = n = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
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
      var t = oa;
      if (t !== null) throw t;
    }
  }
  function Fa(t, l, e, a) {
    Zi = !1;
    var u = t.updateQueue;
    ce = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c, h = f.next;
      f.next = null, i === null ? n = h : i.next = h, i = f;
      var p = t.alternate;
      p !== null && (p = p.updateQueue, c = p.lastBaseUpdate, c !== i && (c === null ? p.firstBaseUpdate = h : c.next = h, p.lastBaseUpdate = f));
    }
    if (n !== null) {
      var E = u.baseState;
      i = 0, p = h = f = null, c = n;
      do {
        var y = c.lane & -536870913, g = y !== c.lane;
        if (g ? (et & y) === y : (a & y) === y) {
          y !== 0 && y === fa && (Zi = !0), p !== null && (p = p.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var U = t, X = c;
            y = l;
            var pt = e;
            switch (X.tag) {
              case 1:
                if (U = X.payload, typeof U == "function") {
                  E = U.call(pt, E, y);
                  break t;
                }
                E = U;
                break t;
              case 3:
                U.flags = U.flags & -65537 | 128;
              case 0:
                if (U = X.payload, y = typeof U == "function" ? U.call(pt, E, y) : U, y == null) break t;
                E = R({}, E, y);
                break t;
              case 2:
                ce = !0;
            }
          }
          y = c.callback, y !== null && (t.flags |= 64, g && (t.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [y] : g.push(y));
        } else
          g = {
            lane: y,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, p === null ? (h = p = g, f = E) : p = p.next = g, i |= y;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          g = c, c = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      p === null && (f = E), u.baseState = f, u.firstBaseUpdate = h, u.lastBaseUpdate = p, n === null && (u.shared.lanes = 0), he |= i, t.lanes = i, t.memoizedState = E;
    }
  }
  function Ro(t, l) {
    if (typeof t != "function")
      throw Error(d(191, t));
    t.call(l);
  }
  function qo(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Ro(e[t], l);
  }
  var da = s(null), Iu = s(0);
  function Yo(t, l) {
    t = $l, D(Iu, t), D(da, l), $l = t | l.baseLanes;
  }
  function Xi() {
    D(Iu, $l), D(da, da.current);
  }
  function Qi() {
    $l = Iu.current, x(da), x(Iu);
  }
  var sl = s(null), xl = null;
  function se(t) {
    var l = t.alternate;
    D(Nt, Nt.current & 1), D(sl, t), xl === null && (l === null || da.current !== null || l.memoizedState !== null) && (xl = t);
  }
  function Li(t) {
    D(Nt, Nt.current), D(sl, t), xl === null && (xl = t);
  }
  function Bo(t) {
    t.tag === 22 ? (D(Nt, Nt.current), D(sl, t), xl === null && (xl = t)) : re();
  }
  function re() {
    D(Nt, Nt.current), D(sl, sl.current);
  }
  function rl(t) {
    x(sl), xl === t && (xl = null), x(Nt);
  }
  var Nt = s(0);
  function Pu(t) {
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
  var Ql = 0, W = null, vt = null, Rt = null, tn = !1, ma = !1, Ze = !1, ln = 0, Ia = 0, ha = null, Ir = 0;
  function Ot() {
    throw Error(d(321));
  }
  function wi(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!fl(t[e], l[e])) return !1;
    return !0;
  }
  function Vi(t, l, e, a, u, n) {
    return Ql = n, W = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, b.H = t === null || t.memoizedState === null ? Es : ic, Ze = !1, n = e(a, u), Ze = !1, ma && (n = Zo(
      l,
      e,
      a,
      u
    )), Go(t), n;
  }
  function Go(t) {
    b.H = lu;
    var l = vt !== null && vt.next !== null;
    if (Ql = 0, Rt = vt = W = null, tn = !1, Ia = 0, ha = null, l) throw Error(d(300));
    t === null || qt || (t = t.dependencies, t !== null && Vu(t) && (qt = !0));
  }
  function Zo(t, l, e, a) {
    W = t;
    var u = 0;
    do {
      if (ma && (ha = null), Ia = 0, ma = !1, 25 <= u) throw Error(d(301));
      if (u += 1, Rt = vt = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      b.H = zs, n = l(e, a);
    } while (ma);
    return n;
  }
  function Pr() {
    var t = b.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Pa(l) : l, t = t.useState()[0], (vt !== null ? vt.memoizedState : null) !== t && (W.flags |= 1024), l;
  }
  function Ki() {
    var t = ln !== 0;
    return ln = 0, t;
  }
  function Ji(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Wi(t) {
    if (tn) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      tn = !1;
    }
    Ql = 0, Rt = vt = W = null, ma = !1, Ia = ln = 0, ha = null;
  }
  function kt() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Rt === null ? W.memoizedState = Rt = t : Rt = Rt.next = t, Rt;
  }
  function Ht() {
    if (vt === null) {
      var t = W.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = vt.next;
    var l = Rt === null ? W.memoizedState : Rt.next;
    if (l !== null)
      Rt = l, vt = t;
    else {
      if (t === null)
        throw W.alternate === null ? Error(d(467)) : Error(d(310));
      vt = t, t = {
        memoizedState: vt.memoizedState,
        baseState: vt.baseState,
        baseQueue: vt.baseQueue,
        queue: vt.queue,
        next: null
      }, Rt === null ? W.memoizedState = Rt = t : Rt = Rt.next = t;
    }
    return Rt;
  }
  function en() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pa(t) {
    var l = Ia;
    return Ia += 1, ha === null && (ha = []), t = Co(ha, t, l), l = W, (Rt === null ? l.memoizedState : Rt.next) === null && (l = l.alternate, b.H = l === null || l.memoizedState === null ? Es : ic), t;
  }
  function an(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Pa(t);
      if (t.$$typeof === w) return Lt(t);
    }
    throw Error(d(438, String(t)));
  }
  function ki(t) {
    var l = null, e = W.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = W.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = en(), W.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = _l;
    return l.index++, e;
  }
  function Ll(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function un(t) {
    var l = Ht();
    return $i(l, vt, t);
  }
  function $i(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(d(311));
    a.lastRenderedReducer = e;
    var u = t.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      l.baseQueue = u = n, a.pending = null;
    }
    if (n = t.baseState, u === null) t.memoizedState = n;
    else {
      l = u.next;
      var c = i = null, f = null, h = l, p = !1;
      do {
        var E = h.lane & -536870913;
        if (E !== h.lane ? (et & E) === E : (Ql & E) === E) {
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
          else if ((Ql & y) === y) {
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
            }, f === null ? (c = f = E, i = n) : f = f.next = E, W.lanes |= y, he |= y;
          E = h.action, Ze && e(n, E), n = h.hasEagerState ? h.eagerState : e(n, E);
        } else
          y = {
            lane: E,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, f === null ? (c = f = y, i = n) : f = f.next = y, W.lanes |= E, he |= E;
        h = h.next;
      } while (h !== null && h !== l);
      if (f === null ? i = n : f.next = c, !fl(n, t.memoizedState) && (qt = !0, p && (e = oa, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = i, t.baseQueue = f, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Fi(t) {
    var l = Ht(), e = l.queue;
    if (e === null) throw Error(d(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      fl(n, l.memoizedState) || (qt = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Xo(t, l, e) {
    var a = W, u = Ht(), n = nt;
    if (n) {
      if (e === void 0) throw Error(d(407));
      e = e();
    } else e = l();
    var i = !fl(
      (vt || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, qt = !0), u = u.queue, tc(wo.bind(null, a, u, t), [
      t
    ]), u.getSnapshot !== l || i || Rt !== null && Rt.memoizedState.tag & 1) {
      if (a.flags |= 2048, ya(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), St === null) throw Error(d(349));
      n || (Ql & 127) !== 0 || Qo(a, l, e);
    }
    return e;
  }
  function Qo(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = W.updateQueue, l === null ? (l = en(), W.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Lo(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Vo(l) && Ko(t);
  }
  function wo(t, l, e) {
    return e(function() {
      Vo(l) && Ko(t);
    });
  }
  function Vo(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !fl(t, e);
    } catch {
      return !0;
    }
  }
  function Ko(t) {
    var l = Ue(t, 2);
    l !== null && ul(l, t, 2);
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
      lastRenderedReducer: Ll,
      lastRenderedState: t
    }, l;
  }
  function Jo(t, l, e, a) {
    return t.baseState = e, $i(
      t,
      vt,
      typeof a == "function" ? a : Ll
    );
  }
  function td(t, l, e, a, u) {
    if (fn(t)) throw Error(d(485));
    if (t = l.action, t !== null) {
      var n = {
        payload: u,
        action: t,
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
      b.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, Wo(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function Wo(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = b.T, i = {};
      b.T = i;
      try {
        var c = e(u, a), f = b.S;
        f !== null && f(i, c), ko(t, l, c);
      } catch (h) {
        Pi(t, l, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), b.T = n;
      }
    } else
      try {
        n = e(u, a), ko(t, l, n);
      } catch (h) {
        Pi(t, l, h);
      }
  }
  function ko(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        $o(t, l, a);
      },
      function(a) {
        return Pi(t, l, a);
      }
    ) : $o(t, l, e);
  }
  function $o(t, l, e) {
    l.status = "fulfilled", l.value = e, Fo(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Wo(t, e)));
  }
  function Pi(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Fo(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Fo(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Io(t, l) {
    return l;
  }
  function Po(t, l) {
    if (nt) {
      var e = St.formState;
      if (e !== null) {
        t: {
          var a = W;
          if (nt) {
            if (Et) {
              l: {
                for (var u = Et, n = zl; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = Tl(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Et = Tl(
                  u.nextSibling
                ), a = u.data === "F!";
                break t;
              }
            }
            ne(a);
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
      lastRenderedReducer: Io,
      lastRenderedState: l
    }, e.queue = a, e = ps.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = Ii(!1), n = nc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = kt(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = td.bind(
      null,
      W,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function ts(t) {
    var l = Ht();
    return ls(l, vt, t);
  }
  function ls(t, l, e) {
    if (l = $i(
      t,
      l,
      Io
    )[0], t = un(Ll)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Pa(l);
      } catch (i) {
        throw i === sa ? Wu : i;
      }
    else a = l;
    l = Ht();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && (W.flags |= 2048, ya(
      9,
      { destroy: void 0 },
      ld.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function ld(t, l) {
    t.action = l;
  }
  function es(t) {
    var l = Ht(), e = vt;
    if (e !== null)
      return ls(l, e, t);
    Ht(), l = l.memoizedState, e = Ht();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function ya(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = W.updateQueue, l === null && (l = en(), W.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function as() {
    return Ht().memoizedState;
  }
  function nn(t, l, e, a) {
    var u = kt();
    W.flags |= t, u.memoizedState = ya(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function cn(t, l, e, a) {
    var u = Ht();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    vt !== null && a !== null && wi(a, vt.memoizedState.deps) ? u.memoizedState = ya(l, n, e, a) : (W.flags |= t, u.memoizedState = ya(
      1 | l,
      n,
      e,
      a
    ));
  }
  function us(t, l) {
    nn(8390656, 8, t, l);
  }
  function tc(t, l) {
    cn(2048, 8, t, l);
  }
  function ed(t) {
    W.flags |= 4;
    var l = W.updateQueue;
    if (l === null)
      l = en(), W.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function ns(t) {
    var l = Ht().memoizedState;
    return ed({ ref: l, nextImpl: t }), function() {
      if ((ot & 2) !== 0) throw Error(d(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function is(t, l) {
    return cn(4, 2, t, l);
  }
  function cs(t, l) {
    return cn(4, 4, t, l);
  }
  function fs(t, l) {
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
  function os(t, l, e) {
    e = e != null ? e.concat([t]) : null, cn(4, 4, fs.bind(null, l, t), e);
  }
  function lc() {
  }
  function ss(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && wi(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function rs(t, l) {
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
    return e === void 0 || (Ql & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = d0(), W.lanes |= t, he |= t, e);
  }
  function ds(t, l, e, a) {
    return fl(e, l) ? e : da.current !== null ? (t = ec(t, e, a), fl(t, l) || (qt = !0), t) : (Ql & 42) === 0 || (Ql & 1073741824) !== 0 && (et & 261930) === 0 ? (qt = !0, t.memoizedState = e) : (t = d0(), W.lanes |= t, he |= t, l);
  }
  function ms(t, l, e, a, u) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var i = b.T, c = {};
    b.T = c, nc(t, !1, l, e);
    try {
      var f = u(), h = b.S;
      if (h !== null && h(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var p = Fr(
          f,
          a
        );
        tu(
          t,
          l,
          p,
          hl(t)
        );
      } else
        tu(
          t,
          l,
          a,
          hl(t)
        );
    } catch (E) {
      tu(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: E },
        hl()
      );
    } finally {
      O.p = n, i !== null && c.types !== null && (i.types = c.types), b.T = i;
    }
  }
  function ad() {
  }
  function ac(t, l, e, a) {
    if (t.tag !== 5) throw Error(d(476));
    var u = hs(t).queue;
    ms(
      t,
      u,
      l,
      L,
      e === null ? ad : function() {
        return ys(t), e(a);
      }
    );
  }
  function hs(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: L,
      baseState: L,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: L
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
        lastRenderedReducer: Ll,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function ys(t) {
    var l = hs(t);
    l.next === null && (l = t.alternate.memoizedState), tu(
      t,
      l.next.queue,
      {},
      hl()
    );
  }
  function uc() {
    return Lt(gu);
  }
  function vs() {
    return Ht().memoizedState;
  }
  function gs() {
    return Ht().memoizedState;
  }
  function ud(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = hl();
          t = fe(e);
          var a = oe(l, t, e);
          a !== null && (ul(a, l, e), ka(a, l, e)), l = { cache: Hi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function nd(t, l, e) {
    var a = hl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fn(t) ? bs(l, e) : (e = zi(t, l, e, a), e !== null && (ul(e, t, a), Ss(e, l, a)));
  }
  function ps(t, l, e) {
    var a = hl();
    tu(t, l, e, a);
  }
  function tu(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (fn(t)) bs(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, fl(c, i))
            return Xu(t, l, u, 0), St === null && Zu(), !1;
        } catch {
        } finally {
        }
      if (e = zi(t, l, u, a), e !== null)
        return ul(e, t, a), Ss(e, l, a), !0;
    }
    return !1;
  }
  function nc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: Yc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fn(t)) {
      if (l) throw Error(d(479));
    } else
      l = zi(
        t,
        e,
        a,
        2
      ), l !== null && ul(l, t, 2);
  }
  function fn(t) {
    var l = t.alternate;
    return t === W || l !== null && l === W;
  }
  function bs(t, l) {
    ma = tn = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Ss(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Tf(t, e);
    }
  }
  var lu = {
    readContext: Lt,
    use: an,
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
  lu.useEffectEvent = Ot;
  var Es = {
    readContext: Lt,
    use: an,
    useCallback: function(t, l) {
      return kt().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: Lt,
    useEffect: us,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, nn(
        4194308,
        4,
        fs.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return nn(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      nn(4, 2, t, l);
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
        var u = e(l);
        if (Ze) {
          te(!0);
          try {
            e(l);
          } finally {
            te(!1);
          }
        }
      } else u = l;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = nd.bind(
        null,
        W,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = kt();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = Ii(t);
      var l = t.queue, e = ps.bind(null, W, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: lc,
    useDeferredValue: function(t, l) {
      var e = kt();
      return ec(e, t, l);
    },
    useTransition: function() {
      var t = Ii(!1);
      return t = ms.bind(
        null,
        W,
        t.queue,
        !0,
        !1
      ), kt().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = W, u = kt();
      if (nt) {
        if (e === void 0)
          throw Error(d(407));
        e = e();
      } else {
        if (e = l(), St === null)
          throw Error(d(349));
        (et & 127) !== 0 || Qo(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, us(wo.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, ya(
        9,
        { destroy: void 0 },
        Lo.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = kt(), l = St.identifierPrefix;
      if (nt) {
        var e = Nl, a = Ul;
        e = (a & ~(1 << 32 - cl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ln++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Ir++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: uc,
    useFormState: Po,
    useActionState: Po,
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
      return l.queue = e, l = nc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: ki,
    useCacheRefresh: function() {
      return kt().memoizedState = ud.bind(
        null,
        W
      );
    },
    useEffectEvent: function(t) {
      var l = kt(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((ot & 2) !== 0)
          throw Error(d(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, ic = {
    readContext: Lt,
    use: an,
    useCallback: ss,
    useContext: Lt,
    useEffect: tc,
    useImperativeHandle: os,
    useInsertionEffect: is,
    useLayoutEffect: cs,
    useMemo: rs,
    useReducer: un,
    useRef: as,
    useState: function() {
      return un(Ll);
    },
    useDebugValue: lc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return ds(
        e,
        vt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = un(Ll)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Pa(t),
        l
      ];
    },
    useSyncExternalStore: Xo,
    useId: vs,
    useHostTransitionStatus: uc,
    useFormState: ts,
    useActionState: ts,
    useOptimistic: function(t, l) {
      var e = Ht();
      return Jo(e, vt, t, l);
    },
    useMemoCache: ki,
    useCacheRefresh: gs
  };
  ic.useEffectEvent = ns;
  var zs = {
    readContext: Lt,
    use: an,
    useCallback: ss,
    useContext: Lt,
    useEffect: tc,
    useImperativeHandle: os,
    useInsertionEffect: is,
    useLayoutEffect: cs,
    useMemo: rs,
    useReducer: Fi,
    useRef: as,
    useState: function() {
      return Fi(Ll);
    },
    useDebugValue: lc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return vt === null ? ec(e, t, l) : ds(
        e,
        vt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Fi(Ll)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Pa(t),
        l
      ];
    },
    useSyncExternalStore: Xo,
    useId: vs,
    useHostTransitionStatus: uc,
    useFormState: es,
    useActionState: es,
    useOptimistic: function(t, l) {
      var e = Ht();
      return vt !== null ? Jo(e, vt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: ki,
    useCacheRefresh: gs
  };
  zs.useEffectEvent = ns;
  function cc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : R({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var fc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = hl(), u = fe(a);
      u.payload = l, e != null && (u.callback = e), l = oe(t, u, a), l !== null && (ul(l, t, a), ka(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = hl(), u = fe(a);
      u.tag = 1, u.payload = l, e != null && (u.callback = e), l = oe(t, u, a), l !== null && (ul(l, t, a), ka(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = hl(), a = fe(e);
      a.tag = 2, l != null && (a.callback = l), l = oe(t, a, e), l !== null && (ul(l, t, e), ka(l, t, e));
    }
  };
  function xs(t, l, e, a, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, i) : l.prototype && l.prototype.isPureReactComponent ? !Xa(e, a) || !Xa(u, n) : !0;
  }
  function Ts(t, l, e, a) {
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
      e === l && (e = R({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function As(t) {
    Gu(t);
  }
  function _s(t) {
    console.error(t);
  }
  function Ms(t) {
    Gu(t);
  }
  function on(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Os(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function oc(t, l, e) {
    return e = fe(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      on(t, l);
    }, e;
  }
  function Ds(t) {
    return t = fe(t), t.tag = 3, t;
  }
  function Cs(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        Os(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Os(l, e, a), typeof u != "function" && (ye === null ? ye = /* @__PURE__ */ new Set([this]) : ye.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function id(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && ca(
        l,
        e,
        u,
        !0
      ), e = sl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return xl === null ? En() : e.alternate === null && Dt === 0 && (Dt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === ku ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), jc(t, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === ku ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), jc(t, a, u)), !1;
        }
        throw Error(d(435, e.tag));
      }
      return jc(t, a, u), En(), !1;
    }
    if (nt)
      return l = sl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== Oi && (t = Error(d(422), { cause: a }), wa(bl(t, e)))) : (a !== Oi && (l = Error(d(423), {
        cause: a
      }), wa(
        bl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = bl(a, e), u = oc(
        t.stateNode,
        a,
        u
      ), Gi(t, u), Dt !== 4 && (Dt = 2)), !1;
    var n = Error(d(520), { cause: a });
    if (n = bl(n, e), ou === null ? ou = [n] : ou.push(n), Dt !== 4 && (Dt = 2), l === null) return !0;
    a = bl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = oc(e.stateNode, a, t), Gi(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ye === null || !ye.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Ds(u), Cs(
              u,
              t,
              e,
              a
            ), Gi(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var sc = Error(d(461)), qt = !1;
  function wt(t, l, e, a) {
    l.child = t === null ? jo(l, null, e, a) : Ge(
      l,
      t.child,
      e,
      a
    );
  }
  function Us(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
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
      n,
      u
    ), c = Ki(), t !== null && !qt ? (Ji(t, l, u), wl(t, l, u)) : (nt && c && _i(l), l.flags |= 1, wt(t, l, a, u), l.child);
  }
  function Ns(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !xi(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, Hs(
        t,
        l,
        n,
        a,
        u
      )) : (t = Lu(
        e.type,
        null,
        a,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !pc(t, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Xa, e(i, a) && t.ref === l.ref)
        return wl(t, l, u);
    }
    return l.flags |= 1, t = Bl(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Hs(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Xa(n, a) && t.ref === l.ref)
        if (qt = !1, l.pendingProps = a = n, pc(t, u))
          (t.flags & 131072) !== 0 && (qt = !0);
        else
          return l.lanes = t.lanes, wl(t, l, u);
    }
    return rc(
      t,
      l,
      e,
      a,
      u
    );
  }
  function js(t, l, e, a) {
    var u = a.children, n = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, l.child = null;
        return Rs(
          t,
          l,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ju(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? Yo(l, n) : Xi(), Bo(l);
      else
        return a = l.lanes = 536870912, Rs(
          t,
          l,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Ju(l, n.cachePool), Yo(l, n), re(), l.memoizedState = null) : (t !== null && Ju(l, null), Xi(), re());
    return wt(t, l, u, e), l.child;
  }
  function eu(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Rs(t, l, e, a, u) {
    var n = Ri();
    return n = n === null ? null : { parent: jt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && Ju(l, null), Xi(), Bo(l), t !== null && ca(t, l, a, !0), l.childLanes = u, null;
  }
  function sn(t, l) {
    return l = dn(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function qs(t, l, e) {
    return Ge(l, t.child, null, e), t = sn(l, l.pendingProps), t.flags |= 2, rl(l), l.memoizedState = null, t;
  }
  function cd(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (nt) {
        if (a.mode === "hidden")
          return t = sn(l, a), l.lanes = 536870912, eu(null, t);
        if (Li(l), (t = Et) ? (t = W0(
          t,
          zl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ae !== null ? { id: Ul, overflow: Nl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bo(t), e.return = l, l.child = e, Qt = l, Et = null)) : t = null, t === null) throw ne(l);
        return l.lanes = 536870912, null;
      }
      return sn(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Li(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = qs(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(d(558));
      else if (qt || ca(t, l, e, !1), u = (e & t.childLanes) !== 0, qt || u) {
        if (a = St, a !== null && (i = Af(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Ue(t, i), ul(a, t, i), sc;
        En(), l = qs(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, Et = Tl(i.nextSibling), Qt = l, nt = !0, ue = null, zl = !1, t !== null && zo(l, t), l = sn(l, a), l.flags |= 4096;
      return l;
    }
    return t = Bl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function rn(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(d(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function rc(t, l, e, a, u) {
    return Re(l), e = Vi(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = Ki(), t !== null && !qt ? (Ji(t, l, u), wl(t, l, u)) : (nt && a && _i(l), l.flags |= 1, wt(t, l, e, u), l.child);
  }
  function Ys(t, l, e, a, u, n) {
    return Re(l), l.updateQueue = null, e = Zo(
      l,
      a,
      e,
      u
    ), Go(t), a = Ki(), t !== null && !qt ? (Ji(t, l, n), wl(t, l, n)) : (nt && a && _i(l), l.flags |= 1, wt(t, l, e, n), l.child);
  }
  function Bs(t, l, e, a, u) {
    if (Re(l), l.stateNode === null) {
      var n = aa, i = e.contextType;
      typeof i == "object" && i !== null && (n = Lt(i)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = fc, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, Yi(l), i = e.contextType, n.context = typeof i == "object" && i !== null ? Lt(i) : aa, n.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (cc(
        l,
        e,
        i,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && fc.enqueueReplaceState(n, n.state, null), Fa(l, a, n, u), $a(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var c = l.memoizedProps, f = Xe(e, c);
      n.props = f;
      var h = n.context, p = e.contextType;
      i = aa, typeof p == "object" && p !== null && (i = Lt(p));
      var E = e.getDerivedStateFromProps;
      p = typeof E == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, p || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && Ts(
        l,
        n,
        a,
        i
      ), ce = !1;
      var y = l.memoizedState;
      n.state = y, Fa(l, a, n, u), $a(), h = l.memoizedState, c || y !== h || ce ? (typeof E == "function" && (cc(
        l,
        e,
        E,
        a
      ), h = l.memoizedState), (f = ce || xs(
        l,
        e,
        f,
        a,
        y,
        h,
        i
      )) ? (p || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = h), n.props = a, n.state = h, n.context = i, a = f) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, Bi(t, l), i = l.memoizedProps, p = Xe(e, i), n.props = p, E = l.pendingProps, y = n.context, h = e.contextType, f = aa, typeof h == "object" && h !== null && (f = Lt(h)), c = e.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== E || y !== f) && Ts(
        l,
        n,
        a,
        f
      ), ce = !1, y = l.memoizedState, n.state = y, Fa(l, a, n, u), $a();
      var g = l.memoizedState;
      i !== E || y !== g || ce || t !== null && t.dependencies !== null && Vu(t.dependencies) ? (typeof c == "function" && (cc(
        l,
        e,
        c,
        a
      ), g = l.memoizedState), (p = ce || xs(
        l,
        e,
        p,
        a,
        y,
        g,
        f
      ) || t !== null && t.dependencies !== null && Vu(t.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, g, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        g,
        f
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = g), n.props = a, n.state = g, n.context = f, a = p) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && y === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, rn(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = Ge(
      l,
      t.child,
      null,
      u
    ), l.child = Ge(
      l,
      null,
      e,
      u
    )) : wt(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = wl(
      t,
      l,
      u
    ), t;
  }
  function Gs(t, l, e, a) {
    return He(), l.flags |= 256, wt(t, l, e, a), l.child;
  }
  var dc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function mc(t) {
    return { baseLanes: t, cachePool: Oo() };
  }
  function hc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= ml), t;
  }
  function Zs(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Nt.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (nt) {
        if (u ? se(l) : re(), (t = Et) ? (t = W0(
          t,
          zl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: ae !== null ? { id: Ul, overflow: Nl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bo(t), e.return = l, l.child = e, Qt = l, Et = null)) : t = null, t === null) throw ne(l);
        return $c(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (re(), u = l.mode, c = dn(
        { mode: "hidden", children: c },
        u
      ), a = Ne(
        a,
        u,
        e,
        null
      ), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = mc(e), a.childLanes = hc(
        t,
        i,
        e
      ), l.memoizedState = dc, eu(null, a)) : (se(l), yc(l, c));
    }
    var f = t.memoizedState;
    if (f !== null && (c = f.dehydrated, c !== null)) {
      if (n)
        l.flags & 256 ? (se(l), l.flags &= -257, l = vc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (re(), l.child = t.child, l.flags |= 128, l = null) : (re(), c = a.fallback, u = l.mode, a = dn(
          { mode: "visible", children: a.children },
          u
        ), c = Ne(
          c,
          u,
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
        ), l.memoizedState = dc, l = eu(null, a));
      else if (se(l), $c(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, a = Error(d(419)), a.stack = "", a.digest = i, wa({ value: a, source: null, stack: null }), l = vc(
          t,
          l,
          e
        );
      } else if (qt || ca(t, l, e, !1), i = (e & t.childLanes) !== 0, qt || i) {
        if (i = St, i !== null && (a = Af(i, e), a !== 0 && a !== f.retryLane))
          throw f.retryLane = a, Ue(t, a), ul(i, t, a), sc;
        kc(c) || En(), l = vc(
          t,
          l,
          e
        );
      } else
        kc(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = f.treeContext, Et = Tl(
          c.nextSibling
        ), Qt = l, nt = !0, ue = null, zl = !1, t !== null && zo(l, t), l = yc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return u ? (re(), c = a.fallback, u = l.mode, f = t.child, h = f.sibling, a = Bl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 65011712, h !== null ? c = Bl(
      h,
      c
    ) : (c = Ne(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, eu(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = mc(e) : (u = c.cachePool, u !== null ? (f = jt._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = Oo(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = hc(
      t,
      i,
      e
    ), l.memoizedState = dc, eu(t.child, a)) : (se(l), e = t.child, t = e.sibling, e = Bl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function yc(t, l) {
    return l = dn(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function dn(t, l) {
    return t = ol(22, t, null, l), t.lanes = 0, t;
  }
  function vc(t, l, e) {
    return Ge(l, t.child, null, e), t = yc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Xs(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Ui(t.return, l, e);
  }
  function gc(t, l, e, a, u, n) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function Qs(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Nt.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, D(Nt, i), wt(t, l, a, e), a = nt ? La : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Xs(t, e, l);
        else if (t.tag === 19)
          Xs(t, e, l);
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
    switch (u) {
      case "forwards":
        for (e = l.child, u = null; e !== null; )
          t = e.alternate, t !== null && Pu(t) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), gc(
          l,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = l.child, l.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Pu(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = e, e = u, u = t;
        }
        gc(
          l,
          !0,
          e,
          null,
          n,
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
  function wl(t, l, e) {
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
      throw Error(d(153));
    if (l.child !== null) {
      for (t = l.child, e = Bl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Bl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function pc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Vu(t)));
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
          return a.dehydrated !== null ? (se(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Zs(t, l, e) : (se(l), t = wl(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        se(l);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (ca(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return Qs(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), D(Nt, Nt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, js(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        ie(l, jt, t.memoizedState.cache);
    }
    return wl(t, l, e);
  }
  function Ls(t, l, e) {
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
      qt = !1, nt && (l.flags & 1048576) !== 0 && Eo(l, La, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Ye(l.elementType), l.type = t, typeof t == "function")
            xi(t) ? (a = Xe(t, a), l.tag = 1, l = Bs(
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
              var u = t.$$typeof;
              if (u === At) {
                l.tag = 11, l = Us(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === $) {
                l.tag = 14, l = Ns(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Jt(t) || t, Error(d(306, l, ""));
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
        return a = l.type, u = Xe(
          a,
          l.pendingProps
        ), Bs(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (Wt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(d(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, Bi(t, l), Fa(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, ie(l, jt, a), a !== n.cache && Ni(
            l,
            [jt],
            e,
            !0
          ), $a(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = Gs(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== u) {
              u = bl(
                Error(d(424)),
                l
              ), wa(u), l = Gs(
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
              for (Et = Tl(t.firstChild), Qt = l, nt = !0, ue = null, zl = !0, e = jo(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (He(), a === u) {
              l = wl(
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
        return rn(t, l), t === null ? (e = t1(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : nt || (e = l.type, t = l.pendingProps, a = On(
          P.current
        ).createElement(e), a[Xt] = l, a[It] = t, Vt(a, e, t), Gt(a), l.stateNode = a) : l.memoizedState = t1(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Oa(l), t === null && nt && (a = l.stateNode = F0(
          l.type,
          l.pendingProps,
          P.current
        ), Qt = l, zl = !0, u = Et, be(l.type) ? (Fc = u, Et = Tl(a.firstChild)) : Et = u), wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), rn(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && nt && ((u = a = Et) && (a = Bd(
          a,
          l.type,
          l.pendingProps,
          zl
        ), a !== null ? (l.stateNode = a, Qt = l, Et = Tl(a.firstChild), zl = !1, u = !0) : u = !1), u || ne(l)), Oa(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = n.children, Kc(u, n) ? a = null : i !== null && Kc(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = Vi(
          t,
          l,
          Pr,
          null,
          null,
          e
        ), gu._currentValue = u), rn(t, l), wt(t, l, a, e), l.child;
      case 6:
        return t === null && nt && ((t = e = Et) && (e = Gd(
          e,
          l.pendingProps,
          zl
        ), e !== null ? (l.stateNode = e, Qt = l, Et = null, t = !0) : t = !1), t || ne(l)), null;
      case 13:
        return Zs(t, l, e);
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
        return Us(
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
        return u = l.type._context, a = l.pendingProps.children, Re(l), u = Lt(u), a = a(u), l.flags |= 1, wt(t, l, a, e), l.child;
      case 14:
        return Ns(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Hs(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Qs(t, l, e);
      case 31:
        return cd(t, l, e);
      case 22:
        return js(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Re(l), a = Lt(jt), t === null ? (u = Ri(), u === null && (u = St, n = Hi(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, Yi(l), ie(l, jt, u)) : ((t.lanes & e) !== 0 && (Bi(t, l), Fa(l, null, null, e), $a()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), ie(l, jt, a)) : (a = n.cache, ie(l, jt, a), a !== u.cache && Ni(
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
    throw Error(d(156, l.tag));
  }
  function Vl(t) {
    t.flags |= 4;
  }
  function bc(t, l, e, a, u) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (v0()) t.flags |= 8192;
        else
          throw Be = ku, qi;
    } else t.flags &= -16777217;
  }
  function ws(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !n1(l))
      if (v0()) t.flags |= 8192;
      else
        throw Be = ku, qi;
  }
  function mn(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? zf() : 536870912, t.lanes |= l, ba |= l);
  }
  function au(t, l) {
    if (!nt)
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
      for (var u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function od(t, l, e) {
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
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Xl(jt), Ut(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (ia(l) ? Vl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Di())), zt(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (Vl(l), n !== null ? (zt(l), ws(l, n)) : (zt(l), bc(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (Vl(l), zt(l), ws(l, n)) : (zt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Vl(l), zt(l), bc(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (xu(l), e = P.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Vl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(d(166));
            return zt(l), null;
          }
          t = N.current, ia(l) ? xo(l) : (t = F0(u, a, e), l.stateNode = t, Vl(l));
        }
        return zt(l), null;
      case 5:
        if (xu(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Vl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(d(166));
            return zt(l), null;
          }
          if (n = N.current, ia(l))
            xo(l);
          else {
            var i = On(
              P.current
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
                    n = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[Xt] = l, n[It] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
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
            l.stateNode = n;
            t: switch (Vt(n, u, a), u) {
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
            a && Vl(l);
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
          t.memoizedProps !== a && Vl(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(d(166));
          if (t = P.current, ia(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = Qt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[Xt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Z0(t.nodeValue, e)), t || ne(l, !0);
          } else
            t = On(t).createTextNode(
              a
            ), t[Xt] = l, l.stateNode = t;
        }
        return zt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = ia(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(d(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(d(557));
              t[Xt] = l;
            } else
              He(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            zt(l), t = !1;
          } else
            e = Di(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (rl(l), l) : (rl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(d(558));
        }
        return zt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = ia(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(d(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(d(317));
              u[Xt] = l;
            } else
              He(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            zt(l), u = !1;
          } else
            u = Di(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (rl(l), l) : (rl(l), null);
        }
        return rl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), mn(l, l.updateQueue), zt(l), null);
      case 4:
        return Ut(), t === null && Xc(l.stateNode.containerInfo), zt(l), null;
      case 10:
        return Xl(l.type), zt(l), null;
      case 19:
        if (x(Nt), a = l.memoizedState, a === null) return zt(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) au(a, !1);
          else {
            if (Dt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = Pu(t), n !== null) {
                  for (l.flags |= 128, au(a, !1), t = n.updateQueue, l.updateQueue = t, mn(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    po(e, t), e = e.sibling;
                  return D(
                    Nt,
                    Nt.current & 1 | 2
                  ), nt && Gl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && nl() > pn && (l.flags |= 128, u = !0, au(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Pu(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, mn(l, t), au(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !nt)
                return zt(l), null;
            } else
              2 * nl() - a.renderingStartTime > pn && e !== 536870912 && (l.flags |= 128, u = !0, au(a, !1), l.lanes = 4194304);
          a.isBackwards ? (n.sibling = l.child, l.child = n) : (t = a.last, t !== null ? t.sibling = n : l.child = n, a.last = n);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = nl(), t.sibling = null, e = Nt.current, D(
          Nt,
          u ? e & 1 | 2 : e & 1
        ), nt && Gl(l, a.treeForkCount), t) : (zt(l), null);
      case 22:
      case 23:
        return rl(l), Qi(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (zt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : zt(l), e = l.updateQueue, e !== null && mn(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && x(qe), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Xl(jt), zt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(d(156, l.tag));
  }
  function sd(t, l) {
    switch (Mi(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Xl(jt), Ut(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return xu(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (rl(l), l.alternate === null)
            throw Error(d(340));
          He();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (rl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(d(340));
          He();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return x(Nt), null;
      case 4:
        return Ut(), null;
      case 10:
        return Xl(l.type), null;
      case 22:
      case 23:
        return rl(l), Qi(), t !== null && x(qe), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Xl(jt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vs(t, l) {
    switch (Mi(l), l.tag) {
      case 3:
        Xl(jt), Ut();
        break;
      case 26:
      case 27:
      case 5:
        xu(l);
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
        Xl(l.type);
        break;
      case 22:
      case 23:
        rl(l), Qi(), t !== null && x(qe);
        break;
      case 24:
        Xl(jt);
    }
  }
  function uu(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      ht(l, l.return, c);
    }
  }
  function de(t, l, e) {
    try {
      var a = l.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = l;
              var f = e, h = c;
              try {
                h();
              } catch (p) {
                ht(
                  u,
                  f,
                  p
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (p) {
      ht(l, l.return, p);
    }
  }
  function Ks(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        qo(l, e);
      } catch (a) {
        ht(t, t.return, a);
      }
    }
  }
  function Js(t, l, e) {
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
  function nu(t, l) {
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
    } catch (u) {
      ht(t, l, u);
    }
  }
  function Hl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          ht(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          ht(t, l, u);
        }
      else e.current = null;
  }
  function Ws(t) {
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
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  function Sc(t, l, e) {
    try {
      var a = t.stateNode;
      Nd(a, t.type, e, l), a[It] = l;
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  function ks(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && be(t.type) || t.tag === 4;
  }
  function Ec(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || ks(t.return)) return null;
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
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ql));
    else if (a !== 4 && (a === 27 && be(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (zc(t, l, e), t = t.sibling; t !== null; )
        zc(t, l, e), t = t.sibling;
  }
  function hn(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && be(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (hn(t, l, e), t = t.sibling; t !== null; )
        hn(t, l, e), t = t.sibling;
  }
  function $s(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      Vt(l, a, e), l[Xt] = t, l[It] = e;
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  var Kl = !1, Yt = !1, xc = !1, Fs = typeof WeakSet == "function" ? WeakSet : Set, Zt = null;
  function rd(t, l) {
    if (t = t.containerInfo, wc = Rn, t = fo(t), vi(t)) {
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
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, c = -1, f = -1, h = 0, p = 0, E = t, y = null;
            l: for (; ; ) {
              for (var g; E !== e || u !== 0 && E.nodeType !== 3 || (c = i + u), E !== n || a !== 0 && E.nodeType !== 3 || (f = i + a), E.nodeType === 3 && (i += E.nodeValue.length), (g = E.firstChild) !== null; )
                y = E, E = g;
              for (; ; ) {
                if (E === t) break l;
                if (y === e && ++h === u && (c = i), y === n && ++p === a && (f = i), (g = E.nextSibling) !== null) break;
                E = y, y = E.parentNode;
              }
              E = g;
            }
            e = c === -1 || f === -1 ? null : { start: c, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Vc = { focusedElem: t, selectionRange: e }, Rn = !1, Zt = l; Zt !== null; )
      if (l = Zt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Zt = t;
      else
        for (; Zt !== null; ) {
          switch (l = Zt, n = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  u = t[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && n !== null) {
                t = void 0, e = l, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var U = Xe(
                    e.type,
                    u
                  );
                  t = a.getSnapshotBeforeUpdate(
                    U,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (X) {
                  ht(
                    e,
                    e.return,
                    X
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
              if ((t & 1024) !== 0) throw Error(d(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Zt = t;
            break;
          }
          Zt = l.return;
        }
  }
  function Is(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Wl(t, e), a & 4 && uu(5, e);
        break;
      case 1:
        if (Wl(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              ht(e, e.return, i);
            }
          else {
            var u = Xe(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                u,
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
        a & 64 && Ks(e), a & 512 && nu(e, e.return);
        break;
      case 3:
        if (Wl(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
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
            qo(t, l);
          } catch (i) {
            ht(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && $s(e);
      case 26:
      case 5:
        Wl(t, e), l === null && a & 4 && Ws(e), a & 512 && nu(e, e.return);
        break;
      case 12:
        Wl(t, e);
        break;
      case 31:
        Wl(t, e), a & 4 && l0(t, e);
        break;
      case 13:
        Wl(t, e), a & 4 && e0(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Sd.bind(
          null,
          e
        ), Zd(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Kl, !a) {
          l = l !== null && l.memoizedState !== null || Yt, u = Kl;
          var n = Yt;
          Kl = a, (Yt = l) && !n ? kl(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : Wl(t, e), Kl = u, Yt = n;
        }
        break;
      case 30:
        break;
      default:
        Wl(t, e);
    }
  }
  function Ps(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Ps(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && Pn(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var xt = null, tl = !1;
  function Jl(t, l, e) {
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
        Yt || Hl(e, l), Jl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Yt || Hl(e, l);
        var a = xt, u = tl;
        be(e.type) && (xt = e.stateNode, tl = !1), Jl(
          t,
          l,
          e
        ), hu(e.stateNode), xt = a, tl = u;
        break;
      case 5:
        Yt || Hl(e, l);
      case 6:
        if (a = xt, u = tl, xt = null, Jl(
          t,
          l,
          e
        ), xt = a, tl = u, xt !== null)
          if (tl)
            try {
              (xt.nodeType === 9 ? xt.body : xt.nodeName === "HTML" ? xt.ownerDocument.body : xt).removeChild(e.stateNode);
            } catch (n) {
              ht(
                e,
                l,
                n
              );
            }
          else
            try {
              xt.removeChild(e.stateNode);
            } catch (n) {
              ht(
                e,
                l,
                n
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
        a = xt, u = tl, xt = e.stateNode.containerInfo, tl = !0, Jl(
          t,
          l,
          e
        ), xt = a, tl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        de(2, e, l), Yt || de(4, e, l), Jl(
          t,
          l,
          e
        );
        break;
      case 1:
        Yt || (Hl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Js(
          e,
          l,
          a
        )), Jl(
          t,
          l,
          e
        );
        break;
      case 21:
        Jl(
          t,
          l,
          e
        );
        break;
      case 22:
        Yt = (a = Yt) || e.memoizedState !== null, Jl(
          t,
          l,
          e
        ), Yt = a;
        break;
      default:
        Jl(
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
        return l === null && (l = t.stateNode = new Fs()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Fs()), l;
      default:
        throw Error(d(435, t.tag));
    }
  }
  function yn(t, l) {
    var e = dd(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Ed.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function ll(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = t, i = l, c = i;
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
        if (xt === null) throw Error(d(160));
        t0(n, i, u), xt = null, tl = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
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
        ll(l, t), el(t), a & 4 && (de(3, t, t.return), uu(3, t), de(5, t, t.return));
        break;
      case 1:
        ll(l, t), el(t), a & 512 && (Yt || e === null || Hl(e, e.return)), a & 64 && Kl && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Dl;
        if (ll(l, t), el(t), a & 512 && (Yt || e === null || Hl(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, u = u.ownerDocument || u;
                  l: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Na] || n[Xt] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), Vt(n, a, e), n[Xt] = t, Gt(n), a = n;
                      break t;
                    case "link":
                      var i = a1(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), Vt(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = a1(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      n = u.createElement(a), Vt(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(d(468, a));
                  }
                  n[Xt] = t, Gt(n), a = n;
                }
                t.stateNode = a;
              } else
                u1(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = e1(
                u,
                a,
                t.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? u1(
              u,
              t.type,
              t.stateNode
            ) : e1(
              u,
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
        ll(l, t), el(t), a & 512 && (Yt || e === null || Hl(e, e.return)), e !== null && a & 4 && Sc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ll(l, t), el(t), a & 512 && (Yt || e === null || Hl(e, e.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            $e(u, "");
          } catch (U) {
            ht(t, t.return, U);
          }
        }
        a & 4 && t.stateNode != null && (u = t.memoizedProps, Sc(
          t,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (xc = !0);
        break;
      case 6:
        if (ll(l, t), el(t), a & 4) {
          if (t.stateNode === null)
            throw Error(d(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (U) {
            ht(t, t.return, U);
          }
        }
        break;
      case 3:
        if (Un = null, u = Dl, Dl = Dn(l.containerInfo), ll(l, t), Dl = u, el(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ma(l.containerInfo);
          } catch (U) {
            ht(t, t.return, U);
          }
        xc && (xc = !1, u0(t));
        break;
      case 4:
        a = Dl, Dl = Dn(
          t.stateNode.containerInfo
        ), ll(l, t), el(t), Dl = a;
        break;
      case 12:
        ll(l, t), el(t);
        break;
      case 31:
        ll(l, t), el(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yn(t, a)));
        break;
      case 13:
        ll(l, t), el(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (gn = nl()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yn(t, a)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, h = Kl, p = Yt;
        if (Kl = h || u, Yt = p || f, ll(l, t), Yt = p, Kl = h, el(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = u ? l._visibility & -2 : l._visibility | 1, u && (e === null || f || Kl || Yt || Qe(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                f = e = l;
                try {
                  if (n = f.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = f.stateNode;
                    var E = f.memoizedProps.style, y = E != null && E.hasOwnProperty("display") ? E.display : null;
                    c.style.display = y == null || typeof y == "boolean" ? "" : ("" + y).trim();
                  }
                } catch (U) {
                  ht(f, f.return, U);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                f = l;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (U) {
                  ht(f, f.return, U);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                f = l;
                try {
                  var g = f.stateNode;
                  u ? J0(g, !0) : J0(f.stateNode, !1);
                } catch (U) {
                  ht(f, f.return, U);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, yn(t, e))));
        break;
      case 19:
        ll(l, t), el(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, yn(t, a)));
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
          if (ks(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(d(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Ec(t);
            hn(t, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && ($e(i, ""), e.flags &= -33);
            var c = Ec(t);
            hn(t, c, i);
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
            throw Error(d(161));
        }
      } catch (p) {
        ht(t, t.return, p);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function u0(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        u0(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function Wl(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Is(t, l.alternate, l), l = l.sibling;
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
          typeof e.componentWillUnmount == "function" && Js(
            l,
            l.return,
            e
          ), Qe(l);
          break;
        case 27:
          hu(l.stateNode);
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
  function kl(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, u = t, n = l, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          kl(
            u,
            n,
            e
          ), uu(4, n);
          break;
        case 1:
          if (kl(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (h) {
              ht(a, a.return, h);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Ro(f[u], c);
            } catch (h) {
              ht(a, a.return, h);
            }
          }
          e && i & 64 && Ks(n), nu(n, n.return);
          break;
        case 27:
          $s(n);
        case 26:
        case 5:
          kl(
            u,
            n,
            e
          ), e && a === null && i & 4 && Ws(n), nu(n, n.return);
          break;
        case 12:
          kl(
            u,
            n,
            e
          );
          break;
        case 31:
          kl(
            u,
            n,
            e
          ), e && i & 4 && l0(u, n);
          break;
        case 13:
          kl(
            u,
            n,
            e
          ), e && i & 4 && e0(u, n);
          break;
        case 22:
          n.memoizedState === null && kl(
            u,
            n,
            e
          ), nu(n, n.return);
          break;
        case 30:
          break;
        default:
          kl(
            u,
            n,
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
        n0(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function n0(t, l, e, a) {
    var u = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Cl(
          t,
          l,
          e,
          a
        ), u & 2048 && uu(9, l);
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
        ), u & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Va(t)));
        break;
      case 12:
        if (u & 2048) {
          Cl(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var n = l.memoizedProps, i = n.id, c = n.onPostCommit;
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
        n = l.stateNode, i = l.alternate, l.memoizedState !== null ? n._visibility & 2 ? Cl(
          t,
          l,
          e,
          a
        ) : iu(t, l) : n._visibility & 2 ? Cl(
          t,
          l,
          e,
          a
        ) : (n._visibility |= 2, va(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Tc(i, l);
        break;
      case 24:
        Cl(
          t,
          l,
          e,
          a
        ), u & 2048 && Ac(l.alternate, l);
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
  function va(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, c = e, f = a, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          va(
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
          i.memoizedState !== null ? p._visibility & 2 ? va(
            n,
            i,
            c,
            f,
            u
          ) : iu(
            n,
            i
          ) : (p._visibility |= 2, va(
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
          va(
            n,
            i,
            c,
            f,
            u
          ), u && h & 2048 && Ac(i.alternate, i);
          break;
        default:
          va(
            n,
            i,
            c,
            f,
            u
          );
      }
      l = l.sibling;
    }
  }
  function iu(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            iu(e, a), u & 2048 && Tc(
              a.alternate,
              a
            );
            break;
          case 24:
            iu(e, a), u & 2048 && Ac(a.alternate, a);
            break;
          default:
            iu(e, a);
        }
        l = l.sibling;
      }
  }
  var cu = 8192;
  function ga(t, l, e) {
    if (t.subtreeFlags & cu)
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
        ), t.flags & cu && t.memoizedState !== null && Id(
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
        Dl = Dn(t.stateNode.containerInfo), ga(
          t,
          l,
          e
        ), Dl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = cu, cu = 16777216, ga(
          t,
          l,
          e
        ), cu = a) : ga(
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
  function fu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Zt = a, o0(
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
        fu(t), t.flags & 2048 && de(9, t, t.return);
        break;
      case 3:
        fu(t);
        break;
      case 12:
        fu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, vn(t)) : fu(t);
        break;
      default:
        fu(t);
    }
  }
  function vn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Zt = a, o0(
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
          de(8, l, l.return), vn(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, vn(l));
          break;
        default:
          vn(l);
      }
      t = t.sibling;
    }
  }
  function o0(t, l) {
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
          var u = a.sibling, n = a.return;
          if (Ps(a), a === e) {
            Zt = null;
            break t;
          }
          if (u !== null) {
            u.return = n, Zt = u;
            break t;
          }
          Zt = n;
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
  }, hd = typeof WeakMap == "function" ? WeakMap : Map, ot = 0, St = null, tt = null, et = 0, mt = 0, dl = null, me = !1, pa = !1, _c = !1, $l = 0, Dt = 0, he = 0, Le = 0, Mc = 0, ml = 0, ba = 0, ou = null, al = null, Oc = !1, gn = 0, s0 = 0, pn = 1 / 0, bn = null, ye = null, Bt = 0, ve = null, Sa = null, Fl = 0, Dc = 0, Cc = null, r0 = null, su = 0, Uc = null;
  function hl() {
    return (ot & 2) !== 0 && et !== 0 ? et & -et : b.T !== null ? Yc() : _f();
  }
  function d0() {
    if (ml === 0)
      if ((et & 536870912) === 0 || nt) {
        var t = _u;
        _u <<= 1, (_u & 3932160) === 0 && (_u = 262144), ml = t;
      } else ml = 536870912;
    return t = sl.current, t !== null && (t.flags |= 32), ml;
  }
  function ul(t, l, e) {
    (t === St && (mt === 2 || mt === 9) || t.cancelPendingCommit !== null) && (Ea(t, 0), ge(
      t,
      et,
      ml,
      !1
    )), Ua(t, e), ((ot & 2) === 0 || t !== St) && (t === St && ((ot & 2) === 0 && (Le |= e), Dt === 4 && ge(
      t,
      et,
      ml,
      !1
    )), jl(t));
  }
  function m0(t, l, e) {
    if ((ot & 6) !== 0) throw Error(d(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ca(t, l), u = a ? gd(t, l) : Hc(t, l, !0), n = a;
    do {
      if (u === 0) {
        pa && !a && ge(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !yd(e)) {
          u = Hc(t, l, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = l, t.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var c = t;
              u = ou;
              var f = c.current.memoizedState.isDehydrated;
              if (f && (Ea(c, i).flags |= 256), i = Hc(
                c,
                i,
                !1
              ), i !== 2) {
                if (_c && !f) {
                  c.errorRecoveryDisabledLanes |= n, Le |= n, u = 4;
                  break t;
                }
                n = al, al = u, n !== null && (al === null ? al = n : al.push.apply(
                  al,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Ea(t, 0), ge(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, n = u, n) {
            case 0:
            case 1:
              throw Error(d(345));
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
              throw Error(d(329));
          }
          if ((l & 62914560) === l && (u = gn + 300 - nl(), 10 < u)) {
            if (ge(
              a,
              l,
              ml,
              !me
            ), Ou(a, 0, !0) !== 0) break t;
            Fl = l, a.timeoutHandle = w0(
              h0.bind(
                null,
                a,
                e,
                al,
                bn,
                Oc,
                l,
                ml,
                Le,
                ba,
                me,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          h0(
            a,
            e,
            al,
            bn,
            Oc,
            l,
            ml,
            Le,
            ba,
            me,
            n,
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
  function h0(t, l, e, a, u, n, i, c, f, h, p, E, y, g) {
    if (t.timeoutHandle = -1, E = l.subtreeFlags, E & 8192 || (E & 16785408) === 16785408) {
      E = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ql
      }, i0(
        l,
        n,
        E
      );
      var U = (n & 62914560) === n ? gn - nl() : (n & 4194048) === n ? s0 - nl() : 0;
      if (U = Pd(
        E,
        U
      ), U !== null) {
        Fl = n, t.cancelPendingCommit = U(
          z0.bind(
            null,
            t,
            l,
            n,
            e,
            a,
            u,
            i,
            c,
            f,
            p,
            E,
            null,
            y,
            g
          )
        ), ge(t, n, i, !h);
        return;
      }
    }
    z0(
      t,
      l,
      n,
      e,
      a,
      u,
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
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!fl(n(), u)) return !1;
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
    for (var u = l; 0 < u; ) {
      var n = 31 - cl(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && xf(t, e, l);
  }
  function Sn() {
    return (ot & 6) === 0 ? (ru(0), !1) : !0;
  }
  function Nc() {
    if (tt !== null) {
      if (mt === 0)
        var t = tt.return;
      else
        t = tt, Zl = je = null, Wi(t), ra = null, Ja = 0, t = tt;
      for (; t !== null; )
        Vs(t.alternate, t), t = t.return;
      tt = null;
    }
  }
  function Ea(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Rd(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), Fl = 0, Nc(), St = t, tt = e = Bl(t.current, null), et = l, mt = 0, dl = null, me = !1, pa = Ca(t, l), _c = !1, ba = ml = Mc = Le = he = Dt = 0, al = ou = null, Oc = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var u = 31 - cl(a), n = 1 << u;
        l |= t[u], a &= ~n;
      }
    return $l = l, Zu(), e;
  }
  function y0(t, l) {
    W = null, b.H = lu, l === sa || l === Wu ? (l = Uo(), mt = 3) : l === qi ? (l = Uo(), mt = 4) : mt = l === sc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, dl = l, tt === null && (Dt = 1, on(
      t,
      bl(l, t.current)
    ));
  }
  function v0() {
    var t = sl.current;
    return t === null ? !0 : (et & 4194048) === et ? xl === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === xl : !1;
  }
  function g0() {
    var t = b.H;
    return b.H = lu, t === null ? lu : t;
  }
  function p0() {
    var t = b.A;
    return b.A = md, t;
  }
  function En() {
    Dt = 4, me || (et & 4194048) !== et && sl.current !== null || (pa = !0), (he & 134217727) === 0 && (Le & 134217727) === 0 || St === null || ge(
      St,
      et,
      ml,
      !1
    );
  }
  function Hc(t, l, e) {
    var a = ot;
    ot |= 2;
    var u = g0(), n = p0();
    (St !== t || et !== l) && (bn = null, Ea(t, l)), l = !1;
    var i = Dt;
    t: do
      try {
        if (mt !== 0 && tt !== null) {
          var c = tt, f = dl;
          switch (mt) {
            case 8:
              Nc(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              sl.current === null && (l = !0);
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
    return l && t.shellSuspendCounter++, Zl = je = null, ot = a, b.H = u, b.A = n, tt === null && (St = null, et = 0, Zu()), i;
  }
  function vd() {
    for (; tt !== null; ) b0(tt);
  }
  function gd(t, l) {
    var e = ot;
    ot |= 2;
    var a = g0(), u = p0();
    St !== t || et !== l ? (bn = null, pn = nl() + 500, Ea(t, l)) : pa = Ca(
      t,
      l
    );
    t: do
      try {
        if (mt !== 0 && tt !== null) {
          l = tt;
          var n = dl;
          l: switch (mt) {
            case 1:
              mt = 0, dl = null, za(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (Do(n)) {
                mt = 0, dl = null, S0(l);
                break;
              }
              l = function() {
                mt !== 2 && mt !== 9 || St !== t || (mt = 7), jl(t);
              }, n.then(l, l);
              break t;
            case 3:
              mt = 7;
              break t;
            case 4:
              mt = 5;
              break t;
            case 7:
              Do(n) ? (mt = 0, dl = null, S0(l)) : (mt = 0, dl = null, za(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (tt.tag) {
                case 26:
                  i = tt.memoizedState;
                case 5:
                case 27:
                  var c = tt;
                  if (i ? n1(i) : c.stateNode.complete) {
                    mt = 0, dl = null;
                    var f = c.sibling;
                    if (f !== null) tt = f;
                    else {
                      var h = c.return;
                      h !== null ? (tt = h, zn(h)) : tt = null;
                    }
                    break l;
                  }
              }
              mt = 0, dl = null, za(t, l, n, 5);
              break;
            case 6:
              mt = 0, dl = null, za(t, l, n, 6);
              break;
            case 8:
              Nc(), Dt = 6;
              break t;
            default:
              throw Error(d(462));
          }
        }
        pd();
        break;
      } catch (p) {
        y0(t, p);
      }
    while (!0);
    return Zl = je = null, b.H = a, b.A = u, ot = e, tt !== null ? 0 : (St = null, et = 0, Zu(), Dt);
  }
  function pd() {
    for (; tt !== null && !X1(); )
      b0(tt);
  }
  function b0(t) {
    var l = Ls(t.alternate, t, $l);
    t.memoizedProps = t.pendingProps, l === null ? zn(t) : tt = l;
  }
  function S0(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Ys(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          et
        );
        break;
      case 11:
        l = Ys(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          et
        );
        break;
      case 5:
        Wi(l);
      default:
        Vs(e, l), l = tt = po(l, $l), l = Ls(e, l, $l);
    }
    t.memoizedProps = t.pendingProps, l === null ? zn(t) : tt = l;
  }
  function za(t, l, e, a) {
    Zl = je = null, Wi(l), ra = null, Ja = 0;
    var u = l.return;
    try {
      if (id(
        t,
        u,
        l,
        e,
        et
      )) {
        Dt = 1, on(
          t,
          bl(e, t.current)
        ), tt = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw tt = u, n;
      Dt = 1, on(
        t,
        bl(e, t.current)
      ), tt = null;
      return;
    }
    l.flags & 32768 ? (nt || a === 1 ? t = !0 : pa || (et & 536870912) !== 0 ? t = !1 : (me = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = sl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), E0(l, t)) : zn(l);
  }
  function zn(t) {
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
      var e = od(
        l.alternate,
        l,
        $l
      );
      if (e !== null) {
        tt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        tt = l;
        return;
      }
      tt = l = t;
    } while (l !== null);
    Dt === 0 && (Dt = 5);
  }
  function E0(t, l) {
    do {
      var e = sd(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, tt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        tt = t;
        return;
      }
      tt = t = e;
    } while (t !== null);
    Dt = 6, tt = null;
  }
  function z0(t, l, e, a, u, n, i, c, f) {
    t.cancelPendingCommit = null;
    do
      xn();
    while (Bt !== 0);
    if ((ot & 6) !== 0) throw Error(d(327));
    if (l !== null) {
      if (l === t.current) throw Error(d(177));
      if (n = l.lanes | l.childLanes, n |= Ei, F1(
        t,
        e,
        n,
        i,
        c,
        f
      ), t === St && (tt = St = null, et = 0), Sa = l, ve = t, Fl = e, Dc = n, Cc = u, r0 = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, zd(Tu, function() {
        return M0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = b.T, b.T = null, u = O.p, O.p = 2, i = ot, ot |= 4;
        try {
          rd(t, l, e);
        } finally {
          ot = i, O.p = u, b.T = a;
        }
      }
      Bt = 1, x0(), T0(), A0();
    }
  }
  function x0() {
    if (Bt === 1) {
      Bt = 0;
      var t = ve, l = Sa, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = b.T, b.T = null;
        var a = O.p;
        O.p = 2;
        var u = ot;
        ot |= 4;
        try {
          a0(l, t);
          var n = Vc, i = fo(t.containerInfo), c = n.focusedElem, f = n.selectionRange;
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
                  var g = y.getSelection(), U = c.textContent.length, X = Math.min(f.start, U), pt = f.end === void 0 ? X : Math.min(f.end, U);
                  !g.extend && X > pt && (i = pt, pt = X, X = i);
                  var r = io(
                    c,
                    X
                  ), o = io(
                    c,
                    pt
                  );
                  if (r && o && (g.rangeCount !== 1 || g.anchorNode !== r.node || g.anchorOffset !== r.offset || g.focusNode !== o.node || g.focusOffset !== o.offset)) {
                    var m = E.createRange();
                    m.setStart(r.node, r.offset), g.removeAllRanges(), X > pt ? (g.addRange(m), g.extend(o.node, o.offset)) : (m.setEnd(o.node, o.offset), g.addRange(m));
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
          Rn = !!wc, Vc = wc = null;
        } finally {
          ot = u, O.p = a, b.T = e;
        }
      }
      t.current = l, Bt = 2;
    }
  }
  function T0() {
    if (Bt === 2) {
      Bt = 0;
      var t = ve, l = Sa, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = b.T, b.T = null;
        var a = O.p;
        O.p = 2;
        var u = ot;
        ot |= 4;
        try {
          Is(t, l.alternate, l);
        } finally {
          ot = u, O.p = a, b.T = e;
        }
      }
      Bt = 3;
    }
  }
  function A0() {
    if (Bt === 4 || Bt === 3) {
      Bt = 0, Q1();
      var t = ve, l = Sa, e = Fl, a = r0;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Bt = 5 : (Bt = 0, Sa = ve = null, _0(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (ye = null), Fn(e), l = l.stateNode, il && typeof il.onCommitFiberRoot == "function")
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
        l = b.T, u = O.p, O.p = 2, b.T = null;
        try {
          for (var n = t.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          b.T = l, O.p = u;
        }
      }
      (Fl & 3) !== 0 && xn(), jl(t), u = t.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? t === Uc ? su++ : (su = 0, Uc = t) : su = 0, ru(0);
    }
  }
  function _0(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Va(l)));
  }
  function xn() {
    return x0(), T0(), A0(), M0();
  }
  function M0() {
    if (Bt !== 5) return !1;
    var t = ve, l = Dc;
    Dc = 0;
    var e = Fn(Fl), a = b.T, u = O.p;
    try {
      O.p = 32 > e ? 32 : e, b.T = null, e = Cc, Cc = null;
      var n = ve, i = Fl;
      if (Bt = 0, Sa = ve = null, Fl = 0, (ot & 6) !== 0) throw Error(d(331));
      var c = ot;
      if (ot |= 4, f0(n.current), n0(
        n,
        n.current,
        i,
        e
      ), ot = c, ru(0, !1), il && typeof il.onPostCommitFiberRoot == "function")
        try {
          il.onPostCommitFiberRoot(Da, n);
        } catch {
        }
      return !0;
    } finally {
      O.p = u, b.T = a, _0(t, l);
    }
  }
  function O0(t, l, e) {
    l = bl(e, l), l = oc(t.stateNode, l, 2), t = oe(t, l, 2), t !== null && (Ua(t, 2), jl(t));
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
            t = bl(e, t), e = Ds(2), a = oe(l, e, 2), a !== null && (Cs(
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
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (_c = !0, u.add(e), t = bd.bind(null, t, l, e), l.then(t, t));
  }
  function bd(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, St === t && (et & e) === e && (Dt === 4 || Dt === 3 && (et & 62914560) === et && 300 > nl() - gn ? (ot & 2) === 0 && Ea(t, 0) : Mc |= e, ba === et && (ba = 0)), jl(t);
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
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(d(314));
    }
    a !== null && a.delete(l), D0(t, e);
  }
  function zd(t, l) {
    return Jn(t, l);
  }
  var Tn = null, xa = null, Rc = !1, An = !1, qc = !1, pe = 0;
  function jl(t) {
    t !== xa && t.next === null && (xa === null ? Tn = xa = t : xa = xa.next = t), An = !0, Rc || (Rc = !0, Td());
  }
  function ru(t, l) {
    if (!qc && An) {
      qc = !0;
      do
        for (var e = !1, a = Tn; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - cl(42 | t) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, H0(a, n));
          } else
            n = et, n = Ou(
              a,
              a === St ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Ca(a, n) || (e = !0, H0(a, n));
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
    An = Rc = !1;
    var t = 0;
    pe !== 0 && jd() && (t = pe);
    for (var l = nl(), e = null, a = Tn; a !== null; ) {
      var u = a.next, n = U0(a, l);
      n === 0 ? (a.next = null, e === null ? Tn = u : e.next = u, u === null && (xa = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (An = !0)), a = u;
    }
    Bt !== 0 && Bt !== 5 || ru(t), pe !== 0 && (pe = 0);
  }
  function U0(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - cl(n), c = 1 << i, f = u[i];
      f === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = $1(c, l)) : f <= l && (t.expiredLanes |= c), n &= ~c;
    }
    if (l = St, e = et, e = Ou(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (mt === 2 || mt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Wn(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ca(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Wn(a), Fn(e)) {
        case 2:
        case 8:
          e = Sf;
          break;
        case 32:
          e = Tu;
          break;
        case 268435456:
          e = Ef;
          break;
        default:
          e = Tu;
      }
      return a = N0.bind(null, t), e = Jn(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Wn(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function N0(t, l) {
    if (Bt !== 0 && Bt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (xn() && t.callbackNode !== e)
      return null;
    var a = et;
    return a = Ou(
      t,
      t === St ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (m0(t, a, l), U0(t, nl()), t.callbackNode != null && t.callbackNode === e ? N0.bind(null, t) : null);
  }
  function H0(t, l) {
    if (xn()) return null;
    m0(t, l, !0);
  }
  function Td() {
    qd(function() {
      (ot & 6) !== 0 ? Jn(
        bf,
        xd
      ) : C0();
    });
  }
  function Yc() {
    if (pe === 0) {
      var t = fa;
      t === 0 && (t = Au, Au <<= 1, (Au & 261888) === 0 && (Au = 256)), pe = t;
    }
    return pe;
  }
  function j0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Nu("" + t);
  }
  function R0(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Ad(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = j0(
        (u[It] || null).action
      ), i = a.submitter;
      i && (l = (l = i[It] || null) ? j0(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
      var c = new qu(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (pe !== 0) {
                  var f = i ? R0(u, i) : new FormData(u);
                  ac(
                    e,
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
                typeof n == "function" && (c.preventDefault(), f = i ? R0(u, i) : new FormData(u), ac(
                  e,
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
    var Gc = Si[Bc], _d = Gc.toLowerCase(), Md = Gc[0].toUpperCase() + Gc.slice(1);
    Ol(
      _d,
      "on" + Md
    );
  }
  Ol(ro, "onAnimationEnd"), Ol(mo, "onAnimationIteration"), Ol(ho, "onAnimationStart"), Ol("dblclick", "onDoubleClick"), Ol("focusin", "onFocus"), Ol("focusout", "onBlur"), Ol(Lr, "onTransitionRun"), Ol(wr, "onTransitionStart"), Ol(Vr, "onTransitionCancel"), Ol(yo, "onTransitionEnd"), We("onMouseEnter", ["mouseout", "mouseover"]), We("onMouseLeave", ["mouseout", "mouseover"]), We("onPointerEnter", ["pointerout", "pointerover"]), We("onPointerLeave", ["pointerout", "pointerover"]), Me(
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
  var du = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Od = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(du)
  );
  function q0(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], f = c.instance, h = c.currentTarget;
            if (c = c.listener, f !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (p) {
              Gu(p);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], f = c.instance, h = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped())
              break t;
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
  function lt(t, l) {
    var e = l[In];
    e === void 0 && (e = l[In] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Y0(l, t, 2, !1), e.add(a));
  }
  function Zc(t, l, e) {
    var a = 0;
    l && (a |= 4), Y0(
      e,
      t,
      a,
      l
    );
  }
  var _n = "_reactListening" + Math.random().toString(36).slice(2);
  function Xc(t) {
    if (!t[_n]) {
      t[_n] = !0, Df.forEach(function(e) {
        e !== "selectionchange" && (Od.has(e) || Zc(e, !1, t), Zc(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[_n] || (l[_n] = !0, Zc("selectionchange", !1, l));
    }
  }
  function Y0(t, l, e, a) {
    switch (d1(l)) {
      case 2:
        var u = em;
        break;
      case 8:
        u = am;
        break;
      default:
        u = ef;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !ci || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function Qc(t, l, e, a, u) {
    var n = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = Ve(c), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              a = n = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Xf(function() {
      var h = n, p = ni(e), E = [];
      t: {
        var y = vo.get(t);
        if (y !== void 0) {
          var g = qu, U = t;
          switch (t) {
            case "keypress":
              if (ju(e) === 0) break t;
            case "keydown":
            case "keyup":
              g = Er;
              break;
            case "focusin":
              U = "focus", g = ri;
              break;
            case "focusout":
              U = "blur", g = ri;
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
              g = or;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Tr;
              break;
            case ro:
            case mo:
            case ho:
              g = dr;
              break;
            case yo:
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
          var X = (l & 4) !== 0, pt = !X && (t === "scroll" || t === "scrollend"), r = X ? y !== null ? y + "Capture" : null : y;
          X = [];
          for (var o = h, m; o !== null; ) {
            var S = o;
            if (m = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || m === null || r === null || (S = ja(o, r), S != null && X.push(
              mu(o, S, m)
            )), pt) break;
            o = o.return;
          }
          0 < X.length && (y = new g(
            y,
            U,
            null,
            e,
            p
          ), E.push({ event: y, listeners: X }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (y = t === "mouseover" || t === "pointerover", g = t === "mouseout" || t === "pointerout", y && e !== ui && (U = e.relatedTarget || e.fromElement) && (Ve(U) || U[we]))
            break t;
          if ((g || y) && (y = p.window === p ? p : (y = p.ownerDocument) ? y.defaultView || y.parentWindow : window, g ? (U = e.relatedTarget || e.toElement, g = h, U = U ? Ve(U) : null, U !== null && (pt = B(U), X = U.tag, U !== pt || X !== 5 && X !== 27 && X !== 6) && (U = null)) : (g = null, U = h), g !== U)) {
            if (X = wf, S = "onMouseLeave", r = "onMouseEnter", o = "mouse", (t === "pointerout" || t === "pointerover") && (X = Kf, S = "onPointerLeave", r = "onPointerEnter", o = "pointer"), pt = g == null ? y : Ha(g), m = U == null ? y : Ha(U), y = new X(
              S,
              o + "leave",
              g,
              e,
              p
            ), y.target = pt, y.relatedTarget = m, S = null, Ve(p) === h && (X = new X(
              r,
              o + "enter",
              U,
              e,
              p
            ), X.target = m, X.relatedTarget = pt, S = X), pt = S, g && U)
              l: {
                for (X = Dd, r = g, o = U, m = 0, S = r; S; S = X(S))
                  m++;
                S = 0;
                for (var Y = o; Y; Y = X(Y))
                  S++;
                for (; 0 < m - S; )
                  r = X(r), m--;
                for (; 0 < S - m; )
                  o = X(o), S--;
                for (; m--; ) {
                  if (r === o || o !== null && r === o.alternate) {
                    X = r;
                    break l;
                  }
                  r = X(r), o = X(o);
                }
                X = null;
              }
            else X = null;
            g !== null && B0(
              E,
              y,
              g,
              X,
              !1
            ), U !== null && pt !== null && B0(
              E,
              pt,
              U,
              X,
              !0
            );
          }
        }
        t: {
          if (y = h ? Ha(h) : window, g = y.nodeName && y.nodeName.toLowerCase(), g === "select" || g === "input" && y.type === "file")
            var ct = to;
          else if (If(y))
            if (lo)
              ct = Zr;
            else {
              ct = Br;
              var H = Yr;
            }
          else
            g = y.nodeName, !g || g.toLowerCase() !== "input" || y.type !== "checkbox" && y.type !== "radio" ? h && ai(h.elementType) && (ct = to) : ct = Gr;
          if (ct && (ct = ct(t, h))) {
            Pf(
              E,
              ct,
              e,
              p
            );
            break t;
          }
          H && H(t, y, h), t === "focusout" && h && y.type === "number" && h.memoizedProps.value != null && ei(y, "number", y.value);
        }
        switch (H = h ? Ha(h) : window, t) {
          case "focusin":
            (If(H) || H.contentEditable === "true") && (ta = H, gi = h, Qa = null);
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
            pi = !1, oo(E, e, p);
            break;
          case "selectionchange":
            if (Qr) break;
          case "keydown":
          case "keyup":
            oo(E, e, p);
        }
        var k;
        if (mi)
          t: {
            switch (t) {
              case "compositionstart":
                var at = "onCompositionStart";
                break t;
              case "compositionend":
                at = "onCompositionEnd";
                break t;
              case "compositionupdate":
                at = "onCompositionUpdate";
                break t;
            }
            at = void 0;
          }
        else
          Pe ? $f(t, e) && (at = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (at = "onCompositionStart");
        at && (Jf && e.locale !== "ko" && (Pe || at !== "onCompositionStart" ? at === "onCompositionEnd" && Pe && (k = Qf()) : (ee = p, fi = "value" in ee ? ee.value : ee.textContent, Pe = !0)), H = Mn(h, at), 0 < H.length && (at = new Vf(
          at,
          t,
          null,
          e,
          p
        ), E.push({ event: at, listeners: H }), k ? at.data = k : (k = Ff(e), k !== null && (at.data = k)))), (k = Nr ? Hr(t, e) : jr(t, e)) && (at = Mn(h, "onBeforeInput"), 0 < at.length && (H = new Vf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          p
        ), E.push({
          event: H,
          listeners: at
        }), H.data = k)), Ad(
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
  function mu(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Mn(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = ja(t, e), u != null && a.unshift(
        mu(t, u, n)
      ), u = ja(t, l), u != null && a.push(
        mu(t, u, n)
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
  function B0(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, f = c.alternate, h = c.stateNode;
      if (c = c.tag, f !== null && f === a) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (f = h, u ? (h = ja(e, n), h != null && i.unshift(
        mu(e, h, f)
      )) : u || (h = ja(e, n), h != null && i.push(
        mu(e, h, f)
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
  function gt(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || $e(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && $e(t, "" + a);
        break;
      case "className":
        Cu(t, "class", a);
        break;
      case "tabIndex":
        Cu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Cu(t, e, a);
        break;
      case "style":
        Gf(t, a, n);
        break;
      case "data":
        if (l !== "object") {
          Cu(t, "data", a);
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
        a = Nu("" + a), t.setAttribute(e, a);
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
          typeof n == "function" && (e === "formAction" ? (l !== "input" && gt(t, l, "name", u.name, u, null), gt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), gt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), gt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (gt(t, l, "encType", u.encType, u, null), gt(t, l, "method", u.method, u, null), gt(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Nu("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = ql);
        break;
      case "onScroll":
        a != null && lt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && lt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(d(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(d(60));
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
        e = Nu("" + a), t.setAttributeNS(
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
        lt("beforetoggle", t), lt("toggle", t), Du(t, "popover", a);
        break;
      case "xlinkActuate":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Rl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Rl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Rl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Du(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = nr.get(e) || e, Du(t, e, a));
    }
  }
  function Lc(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        Gf(t, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(d(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(d(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? $e(t, a) : (typeof a == "number" || typeof a == "bigint") && $e(t, "" + a);
        break;
      case "onScroll":
        a != null && lt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && lt("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = ql);
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
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), l = e.slice(2, u ? e.length - 7 : void 0), n = t[It] || null, n = n != null ? n[e] : null, typeof n == "function" && t.removeEventListener(l, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, u);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Du(t, e, a);
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
        lt("error", t), lt("load", t);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(d(137, l));
                default:
                  gt(t, l, n, i, e, null);
              }
          }
        u && gt(t, l, "srcSet", e.srcSet, e, null), a && gt(t, l, "src", e.src, e, null);
        return;
      case "input":
        lt("invalid", t);
        var c = n = i = u = null, f = null, h = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var p = e[a];
            if (p != null)
              switch (a) {
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
                    throw Error(d(137, l));
                  break;
                default:
                  gt(t, l, a, p, e, null);
              }
          }
        Rf(
          t,
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
        lt("invalid", t), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                gt(t, l, u, c, e, null);
            }
        l = n, e = i, t.multiple = !!a, l != null ? ke(t, !!a, l, !1) : e != null && ke(t, !!a, e, !0);
        return;
      case "textarea":
        lt("invalid", t), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(d(91));
                break;
              default:
                gt(t, l, i, c, e, null);
            }
        Yf(t, a, u, n);
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
        lt("beforetoggle", t), lt("toggle", t), lt("cancel", t), lt("close", t);
        break;
      case "iframe":
      case "object":
        lt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < du.length; a++)
          lt(du[a], t);
        break;
      case "image":
        lt("error", t), lt("load", t);
        break;
      case "details":
        lt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        lt("error", t), lt("load", t);
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
                throw Error(d(137, l));
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
        var u = null, n = null, i = null, c = null, f = null, h = null, p = null;
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
                n = g;
                break;
              case "name":
                u = g;
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
                  throw Error(d(137, l));
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
          n,
          u
        );
        return;
      case "select":
        g = i = c = y = null;
        for (n in e)
          if (f = e[n], e.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = f;
              default:
                a.hasOwnProperty(n) || gt(
                  t,
                  l,
                  n,
                  null,
                  a,
                  f
                );
            }
        for (u in a)
          if (n = a[u], f = e[u], a.hasOwnProperty(u) && (n != null || f != null))
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
                n !== f && gt(
                  t,
                  l,
                  u,
                  n,
                  a,
                  f
                );
            }
        l = c, e = i, a = g, y != null ? ke(t, !!e, y, !1) : !!a != !!e && (l != null ? ke(t, !!e, l, !0) : ke(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        g = y = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                gt(t, l, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                y = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(d(91));
                break;
              default:
                u !== n && gt(t, l, i, u, a, n);
            }
        qf(t, y, g);
        return;
      case "option":
        for (var U in e)
          if (y = e[U], e.hasOwnProperty(U) && y != null && !a.hasOwnProperty(U))
            switch (U) {
              case "selected":
                t.selected = !1;
                break;
              default:
                gt(
                  t,
                  l,
                  U,
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
        for (var X in e)
          y = e[X], e.hasOwnProperty(X) && y != null && !a.hasOwnProperty(X) && gt(t, l, X, null, a, y);
        for (h in a)
          if (y = a[h], g = e[h], a.hasOwnProperty(h) && y !== g && (y != null || g != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (y != null)
                  throw Error(d(137, l));
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
    for (var r in e)
      y = e[r], e.hasOwnProperty(r) && y != null && !a.hasOwnProperty(r) && gt(t, l, r, null, a, y);
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
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && X0(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], h = f.startTime;
            if (h > c) break;
            var p = f.transferSize, E = f.initiatorType;
            p && X0(E) && (f = f.responseEnd, i += p * (f < c ? 1 : (c - h) / (f - h)));
          }
          if (--a, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var wc = null, Vc = null;
  function On(t) {
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
    return V0.resolve(null).then(t).catch(Yd);
  } : w0;
  function Yd(t) {
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
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), Ma(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          hu(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, hu(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Na] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && hu(t.ownerDocument.body);
      e = u;
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
          Wc(e), Pn(e);
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
  function Bd(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
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
              if (n = t.getAttribute("rel"), n === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (n = t.getAttribute("src"), (n !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n)
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
    switch (l = On(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(d(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(d(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(d(454));
        return t;
      default:
        throw Error(d(451));
    }
  }
  function hu(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    Pn(t);
  }
  var Al = /* @__PURE__ */ new Map(), I0 = /* @__PURE__ */ new Set();
  function Dn(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Il = O.d;
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
    var t = Il.f(), l = Sn();
    return t || l;
  }
  function Qd(t) {
    var l = Ke(t);
    l !== null && l.tag === 5 && l.type === "form" ? ys(l) : Il.r(t);
  }
  var Ta = typeof document > "u" ? null : document;
  function P0(t, l, e) {
    var a = Ta;
    if (a && typeof l == "string" && l) {
      var u = gl(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), I0.has(u) || (I0.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), Vt(l, "link", t), Gt(l), a.head.appendChild(l)));
    }
  }
  function Ld(t) {
    Il.D(t), P0("dns-prefetch", t, null);
  }
  function wd(t, l) {
    Il.C(t, l), P0("preconnect", t, l);
  }
  function Vd(t, l, e) {
    Il.L(t, l, e);
    var a = Ta;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + gl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + gl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + gl(
        e.imageSizes
      ) + '"]')) : u += '[href="' + gl(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = Aa(t);
          break;
        case "script":
          n = _a(t);
      }
      Al.has(n) || (t = R(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Al.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector(yu(n)) || l === "script" && a.querySelector(vu(n)) || (l = a.createElement("link"), Vt(l, "link", t), Gt(l), a.head.appendChild(l)));
    }
  }
  function Kd(t, l) {
    Il.m(t, l);
    var e = Ta;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + gl(a) + '"][href="' + gl(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = _a(t);
      }
      if (!Al.has(n) && (t = R({ rel: "modulepreload", href: t }, l), Al.set(n, t), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(vu(n)))
              return;
        }
        a = e.createElement("link"), Vt(a, "link", t), Gt(a), e.head.appendChild(a);
      }
    }
  }
  function Jd(t, l, e) {
    Il.S(t, l, e);
    var a = Ta;
    if (a && t) {
      var u = Je(a).hoistableStyles, n = Aa(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          yu(n)
        ))
          c.loading = 5;
        else {
          t = R(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Al.get(n)) && Ic(t, e);
          var f = i = a.createElement("link");
          Gt(f), Vt(f, "link", t), f._p = new Promise(function(h, p) {
            f.onload = h, f.onerror = p;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Cn(i, l, a);
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
  function Wd(t, l) {
    Il.X(t, l);
    var e = Ta;
    if (e && t) {
      var a = Je(e).hoistableScripts, u = _a(t), n = a.get(u);
      n || (n = e.querySelector(vu(u)), n || (t = R({ src: t, async: !0 }, l), (l = Al.get(u)) && Pc(t, l), n = e.createElement("script"), Gt(n), Vt(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function kd(t, l) {
    Il.M(t, l);
    var e = Ta;
    if (e && t) {
      var a = Je(e).hoistableScripts, u = _a(t), n = a.get(u);
      n || (n = e.querySelector(vu(u)), n || (t = R({ src: t, async: !0, type: "module" }, l), (l = Al.get(u)) && Pc(t, l), n = e.createElement("script"), Gt(n), Vt(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function t1(t, l, e, a) {
    var u = (u = P.current) ? Dn(u) : null;
    if (!u) throw Error(d(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Aa(e.href), e = Je(
          u
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Aa(e.href);
          var n = Je(
            u
          ).hoistableStyles, i = n.get(t);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, i), (n = u.querySelector(
            yu(t)
          )) && !n._p && (i.instance = n, i.state.loading = 5), Al.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Al.set(t, e), n || $d(
            u,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(d(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(d(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = _a(e), e = Je(
          u
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(d(444, t));
    }
  }
  function Aa(t) {
    return 'href="' + gl(t) + '"';
  }
  function yu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function l1(t) {
    return R({}, t, {
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
  function vu(t) {
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
          var u = R({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Gt(a), Vt(a, "style", u), Cn(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = Aa(e.href);
          var n = t.querySelector(
            yu(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, Gt(n), n;
          a = l1(e), (u = Al.get(u)) && Ic(a, u), n = (t.ownerDocument || t).createElement("link"), Gt(n);
          var i = n;
          return i._p = new Promise(function(c, f) {
            i.onload = c, i.onerror = f;
          }), Vt(n, "link", a), l.state.loading |= 4, Cn(n, e.precedence, t), l.instance = n;
        case "script":
          return n = _a(e.src), (u = t.querySelector(
            vu(n)
          )) ? (l.instance = u, Gt(u), u) : (a = e, (u = Al.get(n)) && (a = R({}, e), Pc(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), Gt(u), Vt(u, "link", a), t.head.appendChild(u), l.instance = u);
        case "void":
          return null;
        default:
          throw Error(d(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Cn(a, e.precedence, t));
    return l.instance;
  }
  function Cn(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function Ic(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Pc(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Un = null;
  function a1(t, l, e) {
    if (Un === null) {
      var a = /* @__PURE__ */ new Map(), u = Un = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Un, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Na] || n[Xt] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function u1(t, l, e) {
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
  function n1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Id(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Aa(a.href), n = l.querySelector(
          yu(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Nn.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, Gt(n);
          return;
        }
        n = l.ownerDocument || l, a = l1(a), (u = Al.get(u)) && Ic(a, u), n = n.createElement("link"), Gt(n);
        var i = n;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), Vt(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Nn.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var tf = 0;
  function Pd(t, l) {
    return t.stylesheets && t.count === 0 && jn(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && jn(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && tf === 0 && (tf = 62500 * Hd());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && jn(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > tf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Nn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) jn(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Hn = null;
  function jn(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Hn = /* @__PURE__ */ new Map(), l.forEach(tm, t), Hn = null, Nn.call(t));
  }
  function tm(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Hn.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Hn.set(t, e);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = l.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = Nn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var gu = {
    $$typeof: w,
    Provider: null,
    Consumer: null,
    _currentValue: L,
    _currentValue2: L,
    _threadCount: 0
  };
  function lm(t, l, e, a, u, n, i, c, f) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = kn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = kn(0), this.hiddenUpdates = kn(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function i1(t, l, e, a, u, n, i, c, f, h, p, E) {
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
    ), l = 1, n === !0 && (l |= 24), n = ol(3, null, null, l), t.current = n, n.stateNode = t, l = Hi(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Yi(n), t;
  }
  function c1(t) {
    return t ? (t = aa, t) : aa;
  }
  function f1(t, l, e, a, u, n) {
    u = c1(u), a.context === null ? a.context = u : a.pendingContext = u, a = fe(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = oe(t, a, l), e !== null && (ul(e, t, l), ka(e, t, l));
  }
  function o1(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function lf(t, l) {
    o1(t, l), (t = t.alternate) && o1(t, l);
  }
  function s1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ue(t, 67108864);
      l !== null && ul(l, t, 67108864), lf(t, 67108864);
    }
  }
  function r1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = hl();
      l = $n(l);
      var e = Ue(t, l);
      e !== null && ul(e, t, l), lf(t, l);
    }
  }
  var Rn = !0;
  function em(t, l, e, a) {
    var u = b.T;
    b.T = null;
    var n = O.p;
    try {
      O.p = 2, ef(t, l, e, a);
    } finally {
      O.p = n, b.T = u;
    }
  }
  function am(t, l, e, a) {
    var u = b.T;
    b.T = null;
    var n = O.p;
    try {
      O.p = 8, ef(t, l, e, a);
    } finally {
      O.p = n, b.T = u;
    }
  }
  function ef(t, l, e, a) {
    if (Rn) {
      var u = af(a);
      if (u === null)
        Qc(
          t,
          l,
          a,
          qn,
          e
        ), m1(t, a);
      else if (nm(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (m1(t, a), l & 4 && -1 < um.indexOf(t)) {
        for (; u !== null; ) {
          var n = Ke(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = _e(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - cl(i);
                      c.entanglements[1] |= f, i &= ~f;
                    }
                    jl(n), (ot & 6) === 0 && (pn = nl() + 500, ru(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ue(n, 2), c !== null && ul(c, n, 2), Sn(), lf(n, 2);
            }
          if (n = af(a), n === null && Qc(
            t,
            l,
            a,
            qn,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
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
    return t = ni(t), uf(t);
  }
  var qn = null;
  function uf(t) {
    if (qn = null, t = Ve(t), t !== null) {
      var l = B(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = ut(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = F(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return qn = t, null;
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
          case Tu:
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
  var nf = !1, Se = null, Ee = null, ze = null, pu = /* @__PURE__ */ new Map(), bu = /* @__PURE__ */ new Map(), xe = [], um = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
        pu.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bu.delete(l.pointerId);
    }
  }
  function Su(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = Ke(l), l !== null && s1(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function nm(t, l, e, a, u) {
    switch (l) {
      case "focusin":
        return Se = Su(
          Se,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Ee = Su(
          Ee,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return ze = Su(
          ze,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return pu.set(
          n,
          Su(
            pu.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, bu.set(
          n,
          Su(
            bu.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function h1(t) {
    var l = Ve(t.target);
    if (l !== null) {
      var e = B(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = ut(e), l !== null) {
            t.blockedOn = l, Mf(t.priority, function() {
              r1(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = F(e), l !== null) {
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
  function Yn(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = af(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        ui = a, e.target.dispatchEvent(a), ui = null;
      } else
        return l = Ke(e), l !== null && s1(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function y1(t, l, e) {
    Yn(t) && e.delete(l);
  }
  function im() {
    nf = !1, Se !== null && Yn(Se) && (Se = null), Ee !== null && Yn(Ee) && (Ee = null), ze !== null && Yn(ze) && (ze = null), pu.forEach(y1), bu.forEach(y1);
  }
  function Bn(t, l) {
    t.blockedOn === l && (t.blockedOn = null, nf || (nf = !0, v.unstable_scheduleCallback(
      v.unstable_NormalPriority,
      im
    )));
  }
  var Gn = null;
  function v1(t) {
    Gn !== t && (Gn = t, v.unstable_scheduleCallback(
      v.unstable_NormalPriority,
      function() {
        Gn === t && (Gn = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], u = t[l + 2];
          if (typeof a != "function") {
            if (uf(a || e) === null)
              continue;
            break;
          }
          var n = Ke(e);
          n !== null && (t.splice(l, 3), l -= 3, ac(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function Ma(t) {
    function l(f) {
      return Bn(f, t);
    }
    Se !== null && Bn(Se, t), Ee !== null && Bn(Ee, t), ze !== null && Bn(ze, t), pu.forEach(l), bu.forEach(l);
    for (var e = 0; e < xe.length; e++) {
      var a = xe[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < xe.length && (e = xe[0], e.blockedOn === null); )
      h1(e), e.blockedOn === null && xe.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[It] || null;
        if (typeof n == "function")
          i || v1(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[It] || null)
              c = i.formAction;
            else if (uf(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), v1(e);
        }
      }
  }
  function g1() {
    function t(n) {
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
    function l() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), u !== null && (u(), u = null);
      };
    }
  }
  function cf(t) {
    this._internalRoot = t;
  }
  Zn.prototype.render = cf.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(d(409));
    var e = l.current, a = hl();
    f1(e, a, t, l, null, null);
  }, Zn.prototype.unmount = cf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      f1(t.current, 2, null, t, null, null), Sn(), l[we] = null;
    }
  };
  function Zn(t) {
    this._internalRoot = t;
  }
  Zn.prototype.unstable_scheduleHydration = function(t) {
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
      d(
        527,
        p1,
        "19.2.0"
      )
    );
  O.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(d(188)) : (t = Object.keys(t).join(","), Error(d(268, t)));
    return t = z(l), t = t !== null ? G(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var cm = {
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
        Da = Xn.inject(
          cm
        ), il = Xn;
      } catch {
      }
  }
  return zu.createRoot = function(t, l) {
    if (!Q(t)) throw Error(d(299));
    var e = !1, a = "", u = As, n = _s, i = Ms;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = i1(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      i,
      g1
    ), t[we] = l.current, Xc(t), new cf(l);
  }, zu.hydrateRoot = function(t, l, e) {
    if (!Q(t)) throw Error(d(299));
    var a = !1, u = "", n = As, i = _s, c = Ms, f = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), l = i1(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      u,
      f,
      n,
      i,
      c,
      g1
    ), l.context = c1(null), e = l.current, a = hl(), a = $n(a), u = fe(a), u.callback = null, oe(e, u, a), e = a, l.current.lanes = e, Ua(l, e), jl(l), t[we] = l.current, Xc(t), new Zn(l);
  }, zu.version = "19.2.0", zu;
}
var O1;
function bm() {
  if (O1) return of.exports;
  O1 = 1;
  function v() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v);
      } catch (M) {
        console.error(M);
      }
  }
  return v(), of.exports = pm(), of.exports;
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
    (T, d) => T + d.charCodeAt(0),
    0
  ) % D1.length;
  return D1[M] ?? "lavender";
}, Am = (v) => v.trim().split(/\s+/).slice(0, 2).map((M) => M.charAt(0).toUpperCase()).join("") || "FV", R1 = (v) => {
  const M = yf(v), T = yl(M.type);
  if (T !== "text" && T !== "cheer") return null;
  const d = yl(M.id), Q = yl(M.display_name) || "Fan", B = yl(M.body), ut = T === "cheer" ? `Cheered ${Em[B] ?? "👏"}` : B;
  return !d || !ut ? null : {
    id: d,
    author: Q,
    initials: Am(Q),
    role: xm(M.role),
    body: ut,
    avatarTone: Tm(Q),
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
  constructor(T, d) {
    super(T);
    Pl(this, "code");
    Pl(this, "retryable");
    Pl(this, "status");
    this.name = "FanViewCommunityGatewayError", this.code = d.code ?? "community_unavailable", this.retryable = d.retryable ?? !1, this.status = d.status;
  }
}
function Om(v) {
  var I;
  const M = v.fetch ?? globalThis.fetch.bind(globalThis), T = ((I = v.displayName) == null ? void 0 : I.trim().replace(/\s+/g, " ").slice(0, 24)) || "Fan", d = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Map(), B = (j) => {
    for (const q of Q.get(j.shareId) ?? [])
      q(hf(j));
  }, ut = async () => {
    const j = await v.client.auth.getSession();
    if (j.error) throw new Error(j.error.message);
    if (j.data.session) return j.data.session;
    const q = await v.client.auth.signInAnonymously();
    if (q.error) throw new Error(q.error.message);
    if (!q.data.session)
      throw new Error("FanView Community could not establish a session.");
    return q.data.session;
  }, F = async (j, q, K, rt) => {
    var At, Ct, _t;
    const dt = {
      apikey: v.publishableKey,
      Authorization: `Bearer ${j.access_token}`,
      "Content-Type": "application/json"
    };
    rt && (dt["Idempotency-Key"] = rt);
    const Tt = await M(v.gatewayUrl, {
      method: "POST",
      headers: dt,
      body: JSON.stringify({ operation: q, input: K })
    }), w = await Tt.json().catch(() => ({}));
    if (!Tt.ok)
      throw new Mm(
        ((At = w.error) == null ? void 0 : At.message) || "FanView Community is unavailable.",
        {
          code: (Ct = w.error) == null ? void 0 : Ct.code,
          retryable: (_t = w.error) == null ? void 0 : _t.retryable,
          status: Tt.status
        }
      );
    return zm(w);
  }, C = async (j, q) => {
    const K = await F(j, "list_messages", {
      roomId: q.roomId
    });
    q.mode = yl(K.mode) || q.mode, q.status = yl(K.status) || q.status, q.inaccessibleAt = yl(K.inaccessible_at) || null, q.messages = _m(K.messages), q.connection = q.status === "closed" ? "closed" : "connected";
  }, z = async (j) => {
    const q = await ut(), K = await F(q, "join_room", {
      shareId: j,
      displayName: T,
      adultAttested: !1
    }), rt = yl(K.room_id);
    if (!rt) throw new Error("FanView Community returned no room.");
    return {
      shareId: j,
      roomId: rt,
      userId: q.user.id,
      mode: yl(K.mode),
      status: yl(K.status),
      inaccessibleAt: null,
      participantCount: 0,
      messages: [],
      channel: null,
      connection: "connecting"
    };
  }, G = (j) => {
    const q = d.get(j);
    if (q) return q;
    const K = z(j).catch((rt) => {
      throw d.delete(j), rt;
    });
    return d.set(j, K), K;
  }, R = async (j) => {
    const q = await ut();
    await C(q, j), B(j);
  };
  return {
    async loadRoom(j, q) {
      if (q.aborted) throw new DOMException("Aborted", "AbortError");
      const K = await G(j);
      if (q.aborted) throw new DOMException("Aborted", "AbortError");
      return hf(K);
    },
    subscribe(j, q, K) {
      const rt = Q.get(j) ?? /* @__PURE__ */ new Set();
      rt.add(q), Q.set(j, rt);
      let dt = !0, Tt = null;
      return G(j).then(async (w) => {
        if (!dt || (q(hf(w)), w.channel)) return;
        const At = await ut();
        await v.client.realtime.setAuth(At.access_token);
        const Ct = v.client.channel(
          `fanview-community:${w.roomId}`,
          {
            config: {
              private: !0,
              presence: { key: w.userId }
            }
          }
        );
        w.channel = Ct, Tt = Ct;
        const _t = () => {
          dt && R(w).catch(K);
        }, $ = () => {
          const Mt = Ct.presenceState();
          w.participantCount = Math.max(
            1,
            Object.values(Mt).reduce(
              ($t, _l) => $t + _l.length,
              0
            )
          ), B(w);
        };
        Ct.on("broadcast", { event: "message.created" }, _t).on("broadcast", { event: "message.updated" }, _t).on("broadcast", { event: "room.updated" }, _t).on("presence", { event: "sync" }, $).subscribe((Mt) => {
          if (dt) {
            if (Mt === "SUBSCRIBED") {
              w.connection = "connected", w.participantCount = Math.max(
                1,
                w.participantCount
              ), B(w), Ct.track({
                online_at: (/* @__PURE__ */ new Date()).toISOString()
              }), R(w).catch(K);
              return;
            }
            Mt === "CLOSED" ? w.connection = "closed" : (Mt === "CHANNEL_ERROR" || Mt === "TIMED_OUT") && (w.connection = "reconnecting"), B(w);
          }
        });
      }).catch((w) => {
        dt && K(w);
      }), () => {
        dt = !1, rt.delete(q), rt.size === 0 && Q.delete(j), Tt && (v.client.removeChannel(Tt), G(j).then((w) => {
          w.channel === Tt && (w.channel = null);
        }));
      };
    },
    async sendCheer(j, q) {
      const K = await G(j), rt = await ut();
      await F(
        rt,
        "send_message",
        {
          roomId: K.roomId,
          messageType: "cheer",
          body: j1[q]
        },
        crypto.randomUUID()
      );
    },
    async sendMessage(j, q) {
      const K = await G(j), rt = await ut(), dt = await F(
        rt,
        "send_message",
        {
          roomId: K.roomId,
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
      const d = T.trim().replace(/\s+/g, " ").slice(0, 240);
      if (!d) throw new Error("Message is empty.");
      const Q = {
        id: `fixture-${v.length + 1}`,
        author: "You",
        initials: "Y",
        role: "Family",
        body: d,
        avatarTone: "lavender",
        reactions: [],
        own: !0
      };
      return v.push(Q), Q;
    }
  };
}
const Um = Cm();
var A = vf();
class C1 extends A.Component {
  constructor() {
    super(...arguments);
    Pl(this, "state", { failed: !1 });
  }
  static getDerivedStateFromError() {
    return { failed: !0 };
  }
  componentDidCatch(T, d) {
    console.warn("[FanView SPA] Community isolated after a render failure.", {
      error: T,
      componentStack: d.componentStack
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
}), Qn = A.forwardRef(
  (v, M) => {
    const {
      alt: T,
      color: d,
      size: Q,
      weight: B,
      mirrored: ut,
      children: F,
      weights: C,
      ...z
    } = v, {
      color: G = "currentColor",
      size: R,
      weight: I = "regular",
      mirrored: j = !1,
      ...q
    } = A.useContext(Nm);
    return /* @__PURE__ */ A.createElement(
      "svg",
      {
        ref: M,
        xmlns: "http://www.w3.org/2000/svg",
        width: Q ?? R,
        height: Q ?? R,
        fill: d ?? G,
        viewBox: "0 0 256 256",
        transform: ut || j ? "scale(-1, 1)" : void 0,
        ...q,
        ...z
      },
      !!T && /* @__PURE__ */ A.createElement("title", null, T),
      F,
      C.get(B ?? I)
    );
  }
);
Qn.displayName = "IconBase";
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
]), q1 = A.forwardRef((v, M) => /* @__PURE__ */ A.createElement(Qn, { ref: M, ...v, weights: Hm }));
q1.displayName = "XIcon";
const Y1 = q1, U1 = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: !1,
  messages: []
};
function jm({
  adapter: v,
  onOpenChange: M,
  open: T,
  shareId: d,
  teamName: Q
}) {
  const [B, ut] = A.useState(U1), [F, C] = A.useState(!1), z = A.useRef(null);
  return A.useEffect(() => {
    const G = new AbortController();
    let R = () => {
    };
    return ut(U1), C(!1), v.loadRoom(d, G.signal).then((I) => {
      G.signal.aborted || ut(I);
    }).catch(() => {
      G.signal.aborted || C(!0);
    }), v.subscribe && (R = v.subscribe(
      d,
      ut,
      () => C(!0)
    )), () => {
      G.abort(), R();
    };
  }, [v, d]), A.useEffect(() => {
    if (!T) return;
    const G = z.current;
    G && (G.scrollTop = G.scrollHeight);
  }, [T, B.messages.length]), /* @__PURE__ */ _.jsxs(
    "aside",
    {
      "aria-hidden": !T,
      "aria-label": `${Q} broadcaster chat`,
      className: "community-panel community-panel--broadcaster",
      "data-open": T,
      hidden: !T,
      inert: !T,
      children: [
        /* @__PURE__ */ _.jsxs("header", { className: "community-header", children: [
          /* @__PURE__ */ _.jsxs("div", { className: "community-header__copy", children: [
            /* @__PURE__ */ _.jsx("div", { className: "community-eyebrow", children: "LIVE COMMUNITY" }),
            /* @__PURE__ */ _.jsxs("h1", { title: `${Q} Cheering Section`, children: [
              Q,
              " Cheering Section"
            ] }),
            /* @__PURE__ */ _.jsxs("p", { children: [
              /* @__PURE__ */ _.jsx("span", { className: "presence-dot", "aria-hidden": "true" }),
              B.participantCount,
              " cheering together"
            ] })
          ] }),
          /* @__PURE__ */ _.jsx(
            "button",
            {
              "aria-label": "Hide Fan chat",
              className: "icon-button",
              onClick: () => M(!1),
              type: "button",
              children: /* @__PURE__ */ _.jsx(Y1, { "aria-hidden": "true", size: 22, weight: "bold" })
            }
          )
        ] }),
        /* @__PURE__ */ _.jsxs(
          "section",
          {
            "aria-label": "Live match chat",
            "aria-live": "polite",
            className: "community-feed",
            ref: z,
            role: "log",
            children: [
              /* @__PURE__ */ _.jsx("h2", { children: "LIVE MATCH CHAT" }),
              F ? /* @__PURE__ */ _.jsxs("div", { className: "community-inline-status", role: "status", children: [
                /* @__PURE__ */ _.jsx("strong", { children: "Chat is temporarily unavailable." }),
                /* @__PURE__ */ _.jsx("span", { children: "Your Broadcast is still live." })
              ] }) : null,
              !F && (B.connection === "connecting" || B.connection === "reconnecting") && B.messages.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", role: "status", children: "Connecting to Fan chat…" }) : null,
              !F && B.connection !== "connecting" && B.messages.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", children: "Fan messages and cheers will appear here." }) : null,
              F ? null : B.messages.map((G) => /* @__PURE__ */ _.jsx(Rm, { message: G }, G.id))
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
]), B1 = A.forwardRef((v, M) => /* @__PURE__ */ A.createElement(Qn, { ref: M, ...v, weights: qm }));
B1.displayName = "HeartIcon";
const N1 = B1, Ym = /* @__PURE__ */ new Map([
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
]), G1 = A.forwardRef((v, M) => /* @__PURE__ */ A.createElement(Qn, { ref: M, ...v, weights: Ym }));
G1.displayName = "PaperPlaneTiltIcon";
const Bm = G1, Gm = ["👏", "💗", "🔥", "🙌", "🏐", "💪"], H1 = {
  connection: "connecting",
  participantCount: 0,
  canWriteText: !1,
  messages: []
};
function Zm({
  adapter: v,
  matchComplete: M,
  shareId: T,
  startOpen: d = !0,
  teamName: Q
}) {
  const [B, ut] = A.useState(d), [F, C] = A.useState(H1), [z, G] = A.useState(""), [R, I] = A.useState(""), [j, q] = A.useState(!1), [K, rt] = A.useState(!1), dt = A.useRef(null), Tt = A.useRef(null), w = A.useRef(null);
  A.useEffect(() => {
    const Z = new AbortController();
    let it = () => {
    };
    return C(H1), q(!1), v.loadRoom(T, Z.signal).then((Ft) => {
      Z.signal.aborted || C(Ft);
    }).catch(() => {
      Z.signal.aborted || q(!0);
    }), v.subscribe && (it = v.subscribe(
      T,
      C,
      () => q(!0)
    )), () => {
      Z.abort(), it();
    };
  }, [v, T]), A.useEffect(() => {
    var Z, it;
    B ? (Z = Tt.current) == null || Z.focus({ preventScroll: !0 }) : (it = dt.current) == null || it.focus({ preventScroll: !0 });
  }, [B]), A.useEffect(() => {
    if (!B) return;
    const Z = (it) => {
      it.key === "Escape" && (it.preventDefault(), At());
    };
    return document.addEventListener("keydown", Z), () => document.removeEventListener("keydown", Z);
  }, [B]);
  function At() {
    ut(!1), I("");
  }
  function Ct(Z) {
    if (Z.key === "Escape") {
      Z.preventDefault(), At();
      return;
    }
    if (Z.key !== "Tab") return;
    const it = Array.from(
      Z.currentTarget.querySelectorAll(
        "button:not([disabled]), input:not([disabled])"
      )
    );
    if (!it.length) return;
    const Ft = it[0], Jt = it[it.length - 1];
    Z.shiftKey && document.activeElement === Ft ? (Z.preventDefault(), Jt.focus()) : !Z.shiftKey && document.activeElement === Jt && (Z.preventDefault(), Ft.focus());
  }
  function _t(Z) {
    w.current = Z.clientY, Z.currentTarget.setPointerCapture(Z.pointerId);
  }
  function $(Z) {
    const it = w.current;
    w.current = null, it !== null && Z.clientY - it > 64 && At();
  }
  async function Mt(Z) {
    if (!(j || M))
      try {
        await v.sendCheer(T, Z), I(`${Z} sent to everyone cheering`);
      } catch {
        I("That cheer did not send. The live match is unaffected.");
      }
  }
  async function $t(Z) {
    Z.preventDefault();
    const it = z.trim().replace(/\s+/g, " ").slice(0, 240);
    if (!(!it || j || M || !F.canWriteText || K)) {
      rt(!0);
      try {
        const Ft = await v.sendMessage(T, it);
        C((Jt) => ({
          ...Jt,
          messages: [...Jt.messages, Ft]
        })), G(""), I("Cheer sent.");
      } catch {
        I("Your message did not send. The live match is unaffected.");
      } finally {
        rt(!1);
      }
    }
  }
  const _l = j || M || !F.canWriteText || F.connection === "closed";
  return /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    B ? null : /* @__PURE__ */ _.jsxs(
      "button",
      {
        "aria-expanded": "false",
        className: "community-launcher",
        onClick: () => ut(!0),
        ref: dt,
        type: "button",
        children: [
          /* @__PURE__ */ _.jsx(N1, { "aria-hidden": "true", size: 20, weight: "fill" }),
          "Cheer together",
          /* @__PURE__ */ _.jsx("span", { children: F.participantCount })
        ]
      }
    ),
    /* @__PURE__ */ _.jsx(
      "button",
      {
        "aria-hidden": !B,
        "aria-label": "Close Cheering Section",
        className: "community-scrim",
        "data-open": B,
        disabled: !B,
        hidden: !B,
        onClick: At,
        tabIndex: B ? 0 : -1,
        type: "button"
      }
    ),
    /* @__PURE__ */ _.jsxs(
      "aside",
      {
        "aria-hidden": !B,
        "aria-label": `${Q} Cheering Section`,
        "aria-modal": "true",
        className: "community-panel",
        "data-open": B,
        hidden: !B,
        inert: !B,
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
              onPointerUp: $,
              role: "button",
              tabIndex: -1
            }
          ),
          /* @__PURE__ */ _.jsxs("header", { className: "community-header", children: [
            /* @__PURE__ */ _.jsxs("div", { className: "community-header__copy", children: [
              /* @__PURE__ */ _.jsx("div", { className: "community-eyebrow", children: "LIVE COMMUNITY" }),
              /* @__PURE__ */ _.jsxs("h1", { title: `${Q} Cheering Section`, children: [
                Q,
                " Cheering Section"
              ] }),
              /* @__PURE__ */ _.jsxs("p", { children: [
                /* @__PURE__ */ _.jsx("span", { className: "presence-dot", "aria-hidden": "true" }),
                F.participantCount,
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
                children: /* @__PURE__ */ _.jsx(Y1, { "aria-hidden": "true", size: 22, weight: "bold" })
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
                F.connection === "connecting" && !j ? /* @__PURE__ */ _.jsxs("div", { "aria-label": "Loading community", className: "message-skeletons", children: [
                  /* @__PURE__ */ _.jsx("span", {}),
                  /* @__PURE__ */ _.jsx("span", {}),
                  /* @__PURE__ */ _.jsx("span", {})
                ] }) : null,
                j ? /* @__PURE__ */ _.jsxs("div", { className: "community-inline-status", role: "status", children: [
                  /* @__PURE__ */ _.jsx("strong", { children: "Cheering is temporarily unavailable." }),
                  /* @__PURE__ */ _.jsx("span", { children: "Video and live scoring will continue normally." })
                ] }) : null,
                !j && F.connection === "reconnecting" ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", role: "status", children: "Reconnecting the Cheering Section…" }) : null,
                !j && F.messages.length === 0 && F.connection !== "connecting" ? /* @__PURE__ */ _.jsx("div", { className: "community-inline-status", children: "Be the first to send a positive cheer for the team." }) : null,
                j ? null : F.messages.map((Z) => /* @__PURE__ */ _.jsx(Xm, { message: Z }, Z.id))
              ]
            }
          ),
          /* @__PURE__ */ _.jsxs("form", { className: "community-composer", onSubmit: $t, children: [
            /* @__PURE__ */ _.jsx("div", { "aria-label": "Quick cheers", className: "quick-cheers", children: Gm.map((Z) => /* @__PURE__ */ _.jsx(
              "button",
              {
                "aria-label": `Send ${Z} cheer`,
                disabled: j || M,
                onClick: () => void Mt(Z),
                type: "button",
                children: /* @__PURE__ */ _.jsx("span", { "aria-hidden": "true", children: Z })
              },
              Z
            )) }),
            /* @__PURE__ */ _.jsxs("div", { className: "composer-row", children: [
              /* @__PURE__ */ _.jsx(
                "input",
                {
                  "aria-label": "Add a positive cheer",
                  disabled: _l,
                  maxLength: 240,
                  onChange: (Z) => G(Z.target.value),
                  placeholder: M ? "Chat closed after the match" : "Add a positive cheer…",
                  value: z
                }
              ),
              /* @__PURE__ */ _.jsx(
                "button",
                {
                  "aria-label": "Send cheer",
                  className: "send-button",
                  disabled: _l || K || z.trim().length === 0,
                  type: "submit",
                  children: /* @__PURE__ */ _.jsx(Bm, { "aria-hidden": "true", size: 21, weight: "fill" })
                }
              )
            ] }),
            /* @__PURE__ */ _.jsxs("div", { className: "composer-meta", children: [
              /* @__PURE__ */ _.jsx("span", { className: "sr-only", "aria-live": "polite", children: R }),
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
    Pl(this, "adapter", null);
    Pl(this, "config", null);
    Pl(this, "root", null);
    Pl(this, "mountPoint");
    const T = this.attachShadow({ mode: "open" }), d = document.createElement("style");
    d.textContent = `${Lm}
${Qm}`, this.mountPoint = document.createElement("div"), T.append(d, this.mountPoint);
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
    const T = this.config, d = T.adapter ?? this.adapter ?? (T.demo ? Um : T.client && T.gatewayUrl && T.publishableKey ? Om({
      client: T.client,
      gatewayUrl: T.gatewayUrl,
      publishableKey: T.publishableKey,
      displayName: T.displayName
    }) : null);
    if (d) {
      if (T.adapter || (this.adapter = d), this.root ?? (this.root = Sm.createRoot(this.mountPoint)), T.surface === "broadcaster") {
        this.root.render(
          /* @__PURE__ */ _.jsx(C1, { children: /* @__PURE__ */ _.jsx(
            jm,
            {
              adapter: d,
              onOpenChange: (Q) => this.setCommunityOpen(Q),
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
            adapter: d,
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
