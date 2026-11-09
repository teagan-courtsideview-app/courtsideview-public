var su = { exports: {} }, Sl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sd;
function fm() {
  if (Sd) return Sl;
  Sd = 1;
  var c = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function y(u, C, N) {
    var U = null;
    if (N !== void 0 && (U = "" + N), C.key !== void 0 && (U = "" + C.key), "key" in C) {
      N = {};
      for (var V in C)
        V !== "key" && (N[V] = C[V]);
    } else N = C;
    return C = N.ref, {
      $$typeof: c,
      type: u,
      key: U,
      ref: C !== void 0 ? C : null,
      props: N
    };
  }
  return Sl.Fragment = g, Sl.jsx = y, Sl.jsxs = y, Sl;
}
var Ad;
function dm() {
  return Ad || (Ad = 1, su.exports = fm()), su.exports;
}
var E = dm(), fu = { exports: {} }, P = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td;
function pm() {
  if (Td) return P;
  Td = 1;
  var c = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), N = Symbol.for("react.consumer"), U = Symbol.for("react.context"), V = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), w = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), W = Symbol.iterator;
  function Z(f) {
    return f === null || typeof f != "object" ? null : (f = W && f[W] || f["@@iterator"], typeof f == "function" ? f : null);
  }
  var J = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, be = Object.assign, ce = {};
  function D(f, T, j) {
    this.props = f, this.context = T, this.refs = ce, this.updater = j || J;
  }
  D.prototype.isReactComponent = {}, D.prototype.setState = function(f, T) {
    if (typeof f != "object" && typeof f != "function" && f != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, f, T, "setState");
  }, D.prototype.forceUpdate = function(f) {
    this.updater.enqueueForceUpdate(this, f, "forceUpdate");
  };
  function le() {
  }
  le.prototype = D.prototype;
  function ne(f, T, j) {
    this.props = f, this.context = T, this.refs = ce, this.updater = j || J;
  }
  var G = ne.prototype = new le();
  G.constructor = ne, be(G, D.prototype), G.isPureReactComponent = !0;
  var te = Array.isArray;
  function _e() {
  }
  var $ = { H: null, A: null, T: null, S: null }, we = Object.prototype.hasOwnProperty;
  function Le(f, T, j) {
    var M = j.ref;
    return {
      $$typeof: c,
      type: f,
      key: T,
      ref: M !== void 0 ? M : null,
      props: j
    };
  }
  function Mt(f, T) {
    return Le(f.type, T, f.props);
  }
  function de(f) {
    return typeof f == "object" && f !== null && f.$$typeof === c;
  }
  function xe(f) {
    var T = { "=": "=0", ":": "=2" };
    return "$" + f.replace(/[=:]/g, function(j) {
      return T[j];
    });
  }
  var ht = /\/+/g;
  function q(f, T) {
    return typeof f == "object" && f !== null && f.key != null ? xe("" + f.key) : T.toString(36);
  }
  function I(f) {
    switch (f.status) {
      case "fulfilled":
        return f.value;
      case "rejected":
        throw f.reason;
      default:
        switch (typeof f.status == "string" ? f.then(_e, _e) : (f.status = "pending", f.then(
          function(T) {
            f.status === "pending" && (f.status = "fulfilled", f.value = T);
          },
          function(T) {
            f.status === "pending" && (f.status = "rejected", f.reason = T);
          }
        )), f.status) {
          case "fulfilled":
            return f.value;
          case "rejected":
            throw f.reason;
        }
    }
    throw f;
  }
  function _(f, T, j, M, L) {
    var F = typeof f;
    (F === "undefined" || F === "boolean") && (f = null);
    var oe = !1;
    if (f === null) oe = !0;
    else
      switch (F) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (f.$$typeof) {
            case c:
            case g:
              oe = !0;
              break;
            case B:
              return oe = f._init, _(
                oe(f._payload),
                T,
                j,
                M,
                L
              );
          }
      }
    if (oe)
      return L = L(f), oe = M === "" ? "." + q(f, 0) : M, te(L) ? (j = "", oe != null && (j = oe.replace(ht, "$&/") + "/"), _(L, T, j, "", function(kt) {
        return kt;
      })) : L != null && (de(L) && (L = Mt(
        L,
        j + (L.key == null || f && f.key === L.key ? "" : ("" + L.key).replace(
          ht,
          "$&/"
        ) + "/") + oe
      )), T.push(L)), 1;
    oe = 0;
    var Ce = M === "" ? "." : M + ":";
    if (te(f))
      for (var ye = 0; ye < f.length; ye++)
        M = f[ye], F = Ce + q(M, ye), oe += _(
          M,
          T,
          j,
          F,
          L
        );
    else if (ye = Z(f), typeof ye == "function")
      for (f = ye.call(f), ye = 0; !(M = f.next()).done; )
        M = M.value, F = Ce + q(M, ye++), oe += _(
          M,
          T,
          j,
          F,
          L
        );
    else if (F === "object") {
      if (typeof f.then == "function")
        return _(
          I(f),
          T,
          j,
          M,
          L
        );
      throw T = String(f), Error(
        "Objects are not valid as a React child (found: " + (T === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : T) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return oe;
  }
  function O(f, T, j) {
    if (f == null) return f;
    var M = [], L = 0;
    return _(f, M, "", "", function(F) {
      return T.call(j, F, L++);
    }), M;
  }
  function Y(f) {
    if (f._status === -1) {
      var T = f._result;
      T = T(), T.then(
        function(j) {
          (f._status === 0 || f._status === -1) && (f._status = 1, f._result = j);
        },
        function(j) {
          (f._status === 0 || f._status === -1) && (f._status = 2, f._result = j);
        }
      ), f._status === -1 && (f._status = 0, f._result = T);
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var ee = typeof reportError == "function" ? reportError : function(f) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var T = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof f == "object" && f !== null && typeof f.message == "string" ? String(f.message) : String(f),
        error: f
      });
      if (!window.dispatchEvent(T)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", f);
      return;
    }
    console.error(f);
  }, ve = {
    map: O,
    forEach: function(f, T, j) {
      O(
        f,
        function() {
          T.apply(this, arguments);
        },
        j
      );
    },
    count: function(f) {
      var T = 0;
      return O(f, function() {
        T++;
      }), T;
    },
    toArray: function(f) {
      return O(f, function(T) {
        return T;
      }) || [];
    },
    only: function(f) {
      if (!de(f))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return f;
    }
  };
  return P.Activity = H, P.Children = ve, P.Component = D, P.Fragment = y, P.Profiler = C, P.PureComponent = ne, P.StrictMode = u, P.Suspense = p, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(f) {
      return $.H.useMemoCache(f);
    }
  }, P.cache = function(f) {
    return function() {
      return f.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(f, T, j) {
    if (f == null)
      throw Error(
        "The argument must be a React element, but you passed " + f + "."
      );
    var M = be({}, f.props), L = f.key;
    if (T != null)
      for (F in T.key !== void 0 && (L = "" + T.key), T)
        !we.call(T, F) || F === "key" || F === "__self" || F === "__source" || F === "ref" && T.ref === void 0 || (M[F] = T[F]);
    var F = arguments.length - 2;
    if (F === 1) M.children = j;
    else if (1 < F) {
      for (var oe = Array(F), Ce = 0; Ce < F; Ce++)
        oe[Ce] = arguments[Ce + 2];
      M.children = oe;
    }
    return Le(f.type, L, M);
  }, P.createContext = function(f) {
    return f = {
      $$typeof: U,
      _currentValue: f,
      _currentValue2: f,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, f.Provider = f, f.Consumer = {
      $$typeof: N,
      _context: f
    }, f;
  }, P.createElement = function(f, T, j) {
    var M, L = {}, F = null;
    if (T != null)
      for (M in T.key !== void 0 && (F = "" + T.key), T)
        we.call(T, M) && M !== "key" && M !== "__self" && M !== "__source" && (L[M] = T[M]);
    var oe = arguments.length - 2;
    if (oe === 1) L.children = j;
    else if (1 < oe) {
      for (var Ce = Array(oe), ye = 0; ye < oe; ye++)
        Ce[ye] = arguments[ye + 2];
      L.children = Ce;
    }
    if (f && f.defaultProps)
      for (M in oe = f.defaultProps, oe)
        L[M] === void 0 && (L[M] = oe[M]);
    return Le(f, F, L);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(f) {
    return { $$typeof: V, render: f };
  }, P.isValidElement = de, P.lazy = function(f) {
    return {
      $$typeof: B,
      _payload: { _status: -1, _result: f },
      _init: Y
    };
  }, P.memo = function(f, T) {
    return {
      $$typeof: w,
      type: f,
      compare: T === void 0 ? null : T
    };
  }, P.startTransition = function(f) {
    var T = $.T, j = {};
    $.T = j;
    try {
      var M = f(), L = $.S;
      L !== null && L(j, M), typeof M == "object" && M !== null && typeof M.then == "function" && M.then(_e, ee);
    } catch (F) {
      ee(F);
    } finally {
      T !== null && j.types !== null && (T.types = j.types), $.T = T;
    }
  }, P.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, P.use = function(f) {
    return $.H.use(f);
  }, P.useActionState = function(f, T, j) {
    return $.H.useActionState(f, T, j);
  }, P.useCallback = function(f, T) {
    return $.H.useCallback(f, T);
  }, P.useContext = function(f) {
    return $.H.useContext(f);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(f, T) {
    return $.H.useDeferredValue(f, T);
  }, P.useEffect = function(f, T) {
    return $.H.useEffect(f, T);
  }, P.useEffectEvent = function(f) {
    return $.H.useEffectEvent(f);
  }, P.useId = function() {
    return $.H.useId();
  }, P.useImperativeHandle = function(f, T, j) {
    return $.H.useImperativeHandle(f, T, j);
  }, P.useInsertionEffect = function(f, T) {
    return $.H.useInsertionEffect(f, T);
  }, P.useLayoutEffect = function(f, T) {
    return $.H.useLayoutEffect(f, T);
  }, P.useMemo = function(f, T) {
    return $.H.useMemo(f, T);
  }, P.useOptimistic = function(f, T) {
    return $.H.useOptimistic(f, T);
  }, P.useReducer = function(f, T, j) {
    return $.H.useReducer(f, T, j);
  }, P.useRef = function(f) {
    return $.H.useRef(f);
  }, P.useState = function(f) {
    return $.H.useState(f);
  }, P.useSyncExternalStore = function(f, T, j) {
    return $.H.useSyncExternalStore(
      f,
      T,
      j
    );
  }, P.useTransition = function() {
    return $.H.useTransition();
  }, P.version = "19.2.0", P;
}
var Ed;
function yu() {
  return Ed || (Ed = 1, fu.exports = pm()), fu.exports;
}
var X = yu();
const mm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement(
      "path",
      {
        d: "M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ X.createElement("path", { d: "M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z" }))
  ]
]), gm = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M128,44a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,44Zm0,168a72,72,0,1,1,72-72A72.08,72.08,0,0,1,128,212ZM164.49,99.51a12,12,0,0,1,0,17l-28,28a12,12,0,0,1-17-17l28-28A12,12,0,0,1,164.49,99.51ZM92,16A12,12,0,0,1,104,4h48a12,12,0,0,1,0,24H104A12,12,0,0,1,92,16Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M216,136a88,88,0,1,1-88-88A88,88,0,0,1,216,136Z", opacity: "0.2" }), /* @__PURE__ */ X.createElement("path", { d: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm45.66,61.66-40,40a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,11.32ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M128,42a94,94,0,1,0,94,94A94.11,94.11,0,0,0,128,42Zm0,176a82,82,0,1,1,82-82A82.1,82.1,0,0,1,128,218ZM172.24,91.76a6,6,0,0,1,0,8.48l-40,40a6,6,0,1,1-8.48-8.48l40-40A6,6,0,0,1,172.24,91.76ZM98,16a6,6,0,0,1,6-6h48a6,6,0,0,1,0,12H104A6,6,0,0,1,98,16Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ X.createElement(X.Fragment, null, /* @__PURE__ */ X.createElement("path", { d: "M128,44a92,92,0,1,0,92,92A92.1,92.1,0,0,0,128,44Zm0,176a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,220ZM170.83,93.17a4,4,0,0,1,0,5.66l-40,40a4,4,0,1,1-5.66-5.66l40-40A4,4,0,0,1,170.83,93.17ZM100,16a4,4,0,0,1,4-4h48a4,4,0,0,1,0,8H104A4,4,0,0,1,100,16Z" }))
  ]
]), bm = X.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), _u = X.forwardRef(
  (c, g) => {
    const {
      alt: y,
      color: u,
      size: C,
      weight: N,
      mirrored: U,
      children: V,
      weights: p,
      ...w
    } = c, {
      color: B = "currentColor",
      size: H,
      weight: W = "regular",
      mirrored: Z = !1,
      ...J
    } = X.useContext(bm);
    return /* @__PURE__ */ X.createElement(
      "svg",
      {
        ref: g,
        xmlns: "http://www.w3.org/2000/svg",
        width: C ?? H,
        height: C ?? H,
        fill: u ?? B,
        viewBox: "0 0 256 256",
        transform: U || Z ? "scale(-1, 1)" : void 0,
        ...J,
        ...w
      },
      !!y && /* @__PURE__ */ X.createElement("title", null, y),
      V,
      p.get(N ?? W)
    );
  }
);
_u.displayName = "IconBase";
const Hd = X.forwardRef((c, g) => /* @__PURE__ */ X.createElement(_u, { ref: g, ...c, weights: mm }));
Hd.displayName = "CheckIcon";
const du = Hd, Rd = X.forwardRef((c, g) => /* @__PURE__ */ X.createElement(_u, { ref: g, ...c, weights: gm }));
Rd.displayName = "TimerIcon";
const hm = Rd, pu = (c) => {
  const g = c.length === 1 ? `${c}${c}` : c;
  return Number.parseInt(g, 16);
}, mu = (c) => {
  const g = c / 255;
  return g <= 0.04045 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
}, vu = (c) => {
  const g = c.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!(g != null && g[1])) return null;
  const y = g[1], u = y.length === 3 ? 1 : 2, C = mu(pu(y.slice(0, u))), N = mu(pu(y.slice(u, u * 2))), U = mu(pu(y.slice(u * 2, u * 3)));
  return 0.2126 * C + 0.7152 * N + 0.0722 * U;
}, xm = (c) => {
  const g = vu(c);
  if (g === null) return "#FFFFFF";
  const y = 1.05 / (g + 0.05);
  return (g + 0.05) / 0.056 > y ? "#101827" : "#FFFFFF";
}, Vn = (c) => {
  const g = vu(c), y = vu("#03080F");
  return g === null || y === null ? "#FFFFFF" : (Math.max(g, y) + 0.05) / (Math.min(g, y) + 0.05) >= 4.5 ? c : "#FFFFFF";
}, vm = (c) => [...c.completedSets ?? []].filter((g) => c.isComplete || g.setNumber < c.setNumber).sort((g, y) => g.setNumber - y.setNumber);
function kd({ match: c }) {
  return c.timeoutTeamName === void 0 ? null : /* @__PURE__ */ E.jsxs("div", { className: "score-bug__timeout", role: "status", children: [
    /* @__PURE__ */ E.jsx(
      hm,
      {
        "aria-hidden": "true",
        className: "score-bug__timeout-icon",
        size: 22,
        weight: "bold"
      }
    ),
    /* @__PURE__ */ E.jsxs("strong", { children: [
      "TIMEOUT — ",
      c.timeoutTeamName || "MATCH PAUSED"
    ] })
  ] });
}
function Bd({
  completedSets: c,
  homeName: g,
  awayName: y,
  mode: u
}) {
  return c.length === 0 ? null : /* @__PURE__ */ E.jsx("div", { className: `score-bug__history score-bug__history--${u}`, children: c.map((C) => {
    const N = C.homeScore > C.awayScore;
    return /* @__PURE__ */ E.jsxs("div", { className: "score-bug__history-set", children: [
      /* @__PURE__ */ E.jsxs("span", { className: "score-bug__history-label", children: [
        "S",
        C.setNumber
      ] }),
      /* @__PURE__ */ E.jsxs(
        "span",
        {
          className: N ? "score-bug__history-score is-winner" : "score-bug__history-score",
          children: [
            C.homeScore,
            N ? /* @__PURE__ */ E.jsx(
              "i",
              {
                "aria-label": `${g} won set ${C.setNumber}`,
                className: "score-bug__winner-badge",
                children: "W"
              }
            ) : null
          ]
        }
      ),
      /* @__PURE__ */ E.jsx("span", { "aria-hidden": "true", className: "score-bug__history-dash", children: "–" }),
      /* @__PURE__ */ E.jsxs(
        "span",
        {
          className: N ? "score-bug__history-score" : "score-bug__history-score is-winner",
          children: [
            C.awayScore,
            N ? null : /* @__PURE__ */ E.jsx(
              "i",
              {
                "aria-label": `${y} won set ${C.setNumber}`,
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
function ym({
  match: c,
  side: g
}) {
  const y = g === "home" ? c.homeSetsWon : c.awaySetsWon, u = Math.ceil(c.totalSets / 2);
  return /* @__PURE__ */ E.jsx(
    "span",
    {
      "aria-label": `${y} of ${u} sets won`,
      className: "score-bug__set-dots",
      children: Array.from({ length: u }, (C, N) => /* @__PURE__ */ E.jsx(
        "i",
        {
          className: N < y ? "is-won" : ""
        },
        `${g}-set-${N + 1}`
      ))
    }
  );
}
function _m({
  completedSets: c,
  match: g,
  teams: y
}) {
  return /* @__PURE__ */ E.jsxs(E.Fragment, { children: [
    /* @__PURE__ */ E.jsxs("div", { className: "score-bug__full-card", children: [
      y.map((u) => /* @__PURE__ */ E.jsxs("div", { className: "score-bug__full-team", children: [
        /* @__PURE__ */ E.jsx(
          "i",
          {
            "aria-hidden": "true",
            className: "score-bug__team-accent",
            style: { backgroundColor: u.color }
          }
        ),
        /* @__PURE__ */ E.jsx("strong", { title: u.name, children: u.name }),
        /* @__PURE__ */ E.jsx(ym, { match: g, side: u.side }),
        /* @__PURE__ */ E.jsx("b", { children: u.score })
      ] }, u.side)),
      /* @__PURE__ */ E.jsxs("div", { className: "score-bug__full-meta", children: [
        /* @__PURE__ */ E.jsxs("span", { children: [
          "SET ",
          g.setNumber
        ] }),
        /* @__PURE__ */ E.jsxs("span", { children: [
          "SETS ",
          g.homeSetsWon,
          "–",
          g.awaySetsWon
        ] })
      ] }),
      /* @__PURE__ */ E.jsx(
        Bd,
        {
          awayName: g.away.name,
          completedSets: c,
          homeName: g.home.name,
          mode: "full"
        }
      )
    ] }),
    /* @__PURE__ */ E.jsx(kd, { match: g })
  ] });
}
function wm({
  completedSets: c,
  match: g
}) {
  return /* @__PURE__ */ E.jsxs(E.Fragment, { children: [
    /* @__PURE__ */ E.jsx(kd, { match: g }),
    /* @__PURE__ */ E.jsxs("div", { className: "score-bug__bar-card", children: [
      /* @__PURE__ */ E.jsxs("div", { className: "score-bug__bar-team score-bug__bar-team--home", children: [
        /* @__PURE__ */ E.jsx("i", { style: { backgroundColor: g.home.color } }),
        /* @__PURE__ */ E.jsx("span", { title: g.home.name, children: g.home.name }),
        /* @__PURE__ */ E.jsx("strong", { children: g.home.score })
      ] }),
      /* @__PURE__ */ E.jsxs("div", { className: "score-bug__bar-center", children: [
        /* @__PURE__ */ E.jsxs("span", { children: [
          "SET ",
          g.setNumber
        ] }),
        /* @__PURE__ */ E.jsx(
          Bd,
          {
            awayName: g.away.name,
            completedSets: c,
            homeName: g.home.name,
            mode: "bar"
          }
        )
      ] }),
      /* @__PURE__ */ E.jsxs("div", { className: "score-bug__bar-team score-bug__bar-team--away", children: [
        /* @__PURE__ */ E.jsx("strong", { children: g.away.score }),
        /* @__PURE__ */ E.jsx("span", { title: g.away.name, children: g.away.name }),
        /* @__PURE__ */ E.jsx("i", { style: { backgroundColor: g.away.color } })
      ] })
    ] })
  ] });
}
function zm({ match: c }) {
  return /* @__PURE__ */ E.jsxs("div", { className: "score-bug__minimal-card", children: [
    /* @__PURE__ */ E.jsxs("span", { children: [
      "SET ",
      c.setNumber
    ] }),
    /* @__PURE__ */ E.jsx("strong", { style: { color: Vn(c.home.color) }, children: c.home.score }),
    /* @__PURE__ */ E.jsx("i", { "aria-hidden": "true", children: "–" }),
    /* @__PURE__ */ E.jsx("strong", { style: { color: Vn(c.away.color) }, children: c.away.score })
  ] });
}
function Sm({
  layout: c = "full-score",
  match: g
}) {
  const y = [
    { ...g.home, setsWon: g.homeSetsWon, side: "home" },
    { ...g.away, setsWon: g.awaySetsWon, side: "away" }
  ], u = vm(g);
  return /* @__PURE__ */ E.jsx(
    "section",
    {
      className: `score-bug score-bug--${c}`,
      "aria-label": `${g.home.name} ${g.home.score}, ${g.away.name} ${g.away.score}, set ${g.setNumber}`,
      children: c === "minimal" ? /* @__PURE__ */ E.jsx(zm, { match: g }) : c === "score-bar" ? /* @__PURE__ */ E.jsx(wm, { completedSets: u, match: g }) : /* @__PURE__ */ E.jsx(_m, { completedSets: u, match: g, teams: y })
    }
  );
}
const Ja = (c, g, y, u, C, N) => {
  const U = Math.min(N, u / 2, C / 2);
  c.beginPath(), c.moveTo(g + U, y), c.arcTo(g + u, y, g + u, y + C, U), c.arcTo(
    g + u,
    y + C,
    g,
    y + C,
    U
  ), c.arcTo(g, y + C, g, y, U), c.arcTo(g, y, g + u, y, U), c.closePath();
}, Md = (c, g, y) => {
  if (c.measureText(g).width <= y) return g;
  let u = g;
  for (; u.length > 1 && c.measureText(`${u}…`).width > y; )
    u = u.slice(0, -1);
  return `${u}…`;
}, Am = (c, g, y, u, C, N, U, V) => {
  const p = c.getContext("2d", { alpha: !1 });
  if (!p || g.readyState < HTMLMediaElement.HAVE_CURRENT_DATA)
    return;
  const w = c.width, B = c.height, H = g.videoWidth || 1280, W = g.videoHeight || 720, Z = H, J = W, be = Math.max(w / Z, B / J);
  p.save(), p.fillStyle = "#000000", p.fillRect(0, 0, w, B), p.translate(w / 2, B / 2), p.rotate(0 * Math.PI / 180), p.drawImage(
    g,
    -H * be / 2,
    -W * be / 2,
    H * be,
    W * be
  ), p.restore();
  const ce = B > w, D = Math.max(
    0.82,
    Math.min(1.08, Math.min(w, B) / 720)
  ), le = Math.max(14, Math.round(18 * D)), ne = Math.round(36 * D);
  p.save(), p.textBaseline = "middle", p.font = `600 ${Math.round(14 * D)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, Ja(p, le, le, 72 * D, ne, 8 * D), p.fillStyle = "#d32f2f", p.fill(), p.fillStyle = "#ffffff", p.beginPath(), p.arc(
    le + 14 * D,
    le + ne / 2,
    4 * D,
    0,
    Math.PI * 2
  ), p.fill(), p.fillText("LIVE", le + 25 * D, le + ne / 2);
  const G = 62 * D;
  Ja(
    p,
    w - le - G,
    le,
    G,
    ne,
    8 * D
  ), p.fillStyle = "rgba(3, 8, 15, 0.78)", p.fill(), p.strokeStyle = "rgba(255, 255, 255, 0.65)", p.lineWidth = Math.max(1, D), p.stroke(), p.fillStyle = "#ffffff", p.textAlign = "center", p.fillText(
    `◉ ${Math.max(0, C)}`,
    w - le - G / 2,
    le + ne / 2
  );
  const te = V === "small" ? 0.82 : V === "large" ? 1.18 : 1, _e = N === "minimal" ? 226 : N === "score-bar" ? ce ? 326 : 620 : ce ? 314 : 390, $ = [...u.completedSets ?? []].filter((M) => u.isComplete || M.setNumber < u.setNumber).sort((M, L) => M.setNumber - L.setNumber), we = Math.ceil($.length / 3), Le = N === "score-bar" ? we * 22 : N === "full-score" ? Math.max(0, we - 1) * 22 : 0, Mt = N === "minimal" ? 54 : N === "score-bar" ? u.timeoutTeamName !== void 0 ? 106 : 70 : u.timeoutTeamName !== void 0 ? 216 : 180, de = Math.min(
    w - le * 2,
    _e * D * te
  ), xe = (Mt + Le) * D * te, ht = U.endsWith("right") ? w - le - de : U === "bottom-center" ? (w - de) / 2 : le, q = U.startsWith("top") ? le + ne + 16 * D : B - le - xe, I = ht, _ = q, O = 10 * D * te;
  if (N === "minimal") {
    Ja(p, I, _, de, xe, xe / 2), p.fillStyle = "rgba(3, 8, 15, 0.92)", p.fill(), p.strokeStyle = "rgba(255, 255, 255, 0.34)", p.lineWidth = Math.max(1, D), p.stroke();
    const M = de * 0.38;
    Ja(
      p,
      I + 7 * D,
      _ + 7 * D,
      M,
      xe - 14 * D,
      (xe - 14 * D) / 2
    ), p.fillStyle = u.away.color || "#ff5f2d", p.fill(), p.textAlign = "center", p.fillStyle = xm(u.away.color || "#ff5f2d"), p.font = `600 ${Math.round(14 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.fillText(
      `SET ${u.setNumber}`,
      I + 7 * D + M / 2,
      _ + xe / 2
    ), p.fillStyle = Vn(u.home.color || "#20cdb4"), p.fillText(
      String(u.home.score),
      I + de * 0.59,
      _ + xe / 2
    ), p.fillStyle = "#9aa3ae", p.fillText("–", I + de * 0.72, _ + xe / 2), p.fillStyle = Vn(u.away.color || "#ff5f2d"), p.fillText(
      String(u.away.score),
      I + de * 0.84,
      _ + xe / 2
    ), p.restore();
    return;
  }
  const Y = u.timeoutTeamName !== void 0 ? 34 * D * te : 0, ee = _ + Y, ve = xe - Y, f = ve - Le * D * te;
  if (Ja(
    p,
    I,
    ee,
    de,
    ve,
    10 * D
  ), p.fillStyle = "rgba(3, 8, 15, 0.94)", p.fill(), p.strokeStyle = "rgba(255, 255, 255, 0.36)", p.lineWidth = Math.max(1, D), p.stroke(), p.textBaseline = "middle", N === "score-bar") {
    const M = de * 0.39, L = de - M * 2, F = 7 * D * te, oe = (Ce, ye, kt, Dt) => {
      p.fillStyle = ye.color, p.fillRect(
        Dt ? Ce + M - F : Ce,
        ee + 10 * D,
        F,
        f - 20 * D
      ), p.fillStyle = "#ffffff", p.font = `600 ${Math.round(15 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.textAlign = Dt ? "right" : "left", p.fillText(
        Md(p, ye.name.toUpperCase(), M * 0.58),
        Dt ? Ce + M - 24 * D : Ce + 22 * D,
        ee + f / 2
      ), p.font = `600 ${Math.round(25 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.textAlign = Dt ? "left" : "right", p.fillText(
        String(kt),
        Dt ? Ce + 12 * D : Ce + M - 12 * D,
        ee + f / 2
      );
    };
    oe(I, u.home, u.home.score, !1), oe(
      I + M + L,
      u.away,
      u.away.score,
      !0
    ), p.strokeStyle = "rgba(255,255,255,0.22)", p.beginPath(), p.moveTo(I + M, ee), p.lineTo(I + M, ee + f), p.moveTo(I + M + L, ee), p.lineTo(I + M + L, ee + f), p.stroke(), p.textAlign = "center", p.fillStyle = "#d6dbe2", p.font = `600 ${Math.round(11 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.fillText(
      `SET ${u.setNumber}`,
      I + M + L / 2,
      ee + f * 0.31
    ), p.font = `600 ${Math.round(9 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.fillText(
      `SETS ${u.homeSetsWon}–${u.awaySetsWon}`,
      I + M + L / 2,
      ee + f * 0.69
    );
  } else {
    const M = f * 0.31;
    [
      { ...u.home, setsWon: u.homeSetsWon },
      { ...u.away, setsWon: u.awaySetsWon }
    ].forEach((oe, Ce) => {
      const ye = ee + Ce * M;
      p.fillStyle = oe.color, Ja(
        p,
        I + O,
        ye + M * 0.35,
        6 * D,
        M * 0.48,
        3 * D
      ), p.fill(), p.textAlign = "left", p.fillStyle = "#ffffff", p.font = `600 ${Math.round(15 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.fillText(
        Md(p, oe.name.toUpperCase(), de * 0.54),
        I + O + 18 * D,
        ye + M * 0.58
      ), p.textAlign = "right", p.font = `600 ${Math.round(26 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.fillText(
        String(oe.score),
        I + de - O,
        ye + M * 0.58
      );
    });
    const F = ee + M * 2;
    p.strokeStyle = "rgba(255,255,255,0.24)", p.beginPath(), p.moveTo(I, F), p.lineTo(I + de, F), p.stroke(), p.fillStyle = "#c2c9d2", p.font = `600 ${Math.round(10 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.textAlign = "left", p.fillText(
      `SET ${u.setNumber}`,
      I + O,
      F + f * 0.13
    ), p.textAlign = "right", p.fillText(
      `SETS ${u.homeSetsWon}–${u.awaySetsWon}`,
      I + de - O,
      F + f * 0.13
    );
  }
  const T = N === "score-bar" ? ee + f : ee + f - 22 * D * te, j = (de - O * 2) / Math.min(3, Math.max(1, $.length));
  $.forEach((M, L) => {
    const F = I + O + (L % 3 + 0.5) * j, oe = T + (Math.floor(L / 3) + 0.5) * 22 * D * te, Ce = M.homeScore > M.awayScore, ye = M.awayScore > M.homeScore, kt = `S${M.setNumber} ${M.homeScore}${Ce ? " W" : ""}–${M.awayScore}${ye ? " W" : ""}`;
    p.font = `600 ${Math.round(10 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.textAlign = "center", p.fillStyle = "#d6dbe2", p.fillText(kt, F, oe, j - 4 * D);
  }), u.timeoutTeamName !== void 0 && (Ja(
    p,
    I,
    _,
    de,
    Y - 6 * D,
    8 * D
  ), p.fillStyle = "rgba(55, 32, 4, 0.9)", p.fill(), p.strokeStyle = "#ffb320", p.stroke(), p.textAlign = "center", p.fillStyle = "#ffb320", p.font = `600 ${Math.round(11 * D * te)}px "CV Plus Jakarta Sans", system-ui, sans-serif`, p.fillText(
    `TIMEOUT — ${u.timeoutTeamName || "MATCH PAUSED"}`,
    I + de / 2,
    _ + (Y - 6 * D) / 2
  )), p.restore();
};
function Tm(c) {
  var ht;
  const g = document.createElement("canvas");
  g.hidden = !0;
  const y = document.createElement("video");
  y.muted = !0, y.autoplay = !0, y.playsInline = !0, y.setAttribute("aria-hidden", "true"), y.tabIndex = -1, y.style.cssText = "position:absolute;width:1px;height:1px;right:0;bottom:0;opacity:0.001;pointer-events:none;", c.parent.append(g, y);
  let u = "idle", C = !1, N = !1, U = 0, V = null, p = null, w = null, B = null, H = 0, W = !1;
  const Z = c.source, J = () => y.getRootNode().pictureInPictureElement === y || document.pictureInPictureElement === y, be = () => J() || y.webkitPresentationMode === "picture-in-picture", ce = (q) => {
    u !== q && (u = q, c.onChange());
  }, D = () => {
    var q;
    p !== null && ((q = Z.cancelVideoFrameCallback) == null || q.call(Z, p)), p = null;
  }, le = () => {
    var q;
    if (J() && document.exitPictureInPicture)
      document.exitPictureInPicture().catch(() => {
      });
    else if (y.webkitPresentationMode === "picture-in-picture")
      try {
        (q = y.webkitSetPresentationMode) == null || q.call(y, "inline");
      } catch {
      }
  }, ne = () => {
    U += 1, W = !1, D(), le(), w !== null && clearInterval(w), w = null, B !== null && clearTimeout(B), B = null;
    const q = V;
    V = null, q == null || q.getTracks().forEach((I) => I.stop()), y.srcObject === q && (y.pause(), y.srcObject = null);
  }, G = () => {
    var Y;
    const q = Math.max(1, window.innerWidth), I = Math.max(1, ((Y = window.visualViewport) == null ? void 0 : Y.height) || window.innerHeight), _ = q >= I ? 1280 : Math.max(360, Math.round(1280 * q / I)), O = q >= I ? Math.max(360, Math.round(1280 * I / q)) : 1280;
    g.width !== _ && (g.width = _), g.height !== O && (g.height = O);
  }, te = () => {
    W = !1;
    const q = g.getContext("2d", { alpha: !1 });
    q && (q.fillStyle = "#03080f", q.fillRect(0, 0, g.width, g.height), q.fillStyle = "#ffffff", q.textAlign = "center", q.textBaseline = "middle", q.font = '600 24px "CV Plus Jakarta Sans", system-ui, sans-serif', q.fillText("Scoreboard unavailable", g.width / 2, g.height / 2));
  }, _e = () => {
    if (N || !C || !V) return;
    G();
    const q = c.snapshot();
    if (!q || Z.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      te(), ce("unavailable");
      return;
    }
    const I = q.preference.automatic ? g.height > g.width ? "full-score" : "score-bar" : q.preference.layout;
    try {
      Am(
        g,
        Z,
        void 0,
        q.match,
        q.viewerCount,
        I,
        q.preference.position,
        q.preference.size
      ), W = !0, H = performance.now();
    } catch {
      te(), ce("unavailable");
    }
  }, $ = () => {
    !C || N || !V || p !== null || !Z.requestVideoFrameCallback || !be() && u !== "preparing" || (p = Z.requestVideoFrameCallback(() => {
      p = null, _e(), $();
    }));
  }, we = () => {
    !C || N || !V || !c.snapshot() || !W || y.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && Z.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && (B !== null && clearTimeout(B), B = null, ce("ready"));
  }, Le = () => {
    if (!C || N) return !1;
    if (!c.snapshot())
      return V && te(), ce("unavailable"), !1;
    if (Z.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      if (V && te(), ce("preparing"), B === null) {
        const q = U;
        B = setTimeout(() => {
          N || !C || q !== U || (ne(), ce("unavailable"));
        }, 5e3);
      }
      return !1;
    }
    if (V && V.getVideoTracks().some((q) => q.readyState === "live"))
      return _e(), we(), $(), u === "ready";
    if (ne(), typeof g.captureStream != "function")
      return ce("unavailable"), !1;
    G();
    try {
      if (!g.getContext("2d", { alpha: !1 })) throw new Error("Presentation canvas unavailable");
      if (V = g.captureStream(30), !V.getVideoTracks().length) throw new Error("Presentation video unavailable");
      const q = U;
      return y.srcObject = V, ce("preparing"), _e(), y.play().then(() => {
        N || !C || q !== U || we();
      }).catch(() => {
        N || !C || q !== U || (ne(), ce("unavailable"));
      }), B = setTimeout(() => {
        N || !C || q !== U || u === "ready" || (ne(), ce("unavailable"));
      }, 5e3), $(), w = setInterval(() => {
        (be() || u === "preparing") && (performance.now() - H >= 220 && _e(), we());
      }, 250), u === "ready";
    } catch {
      return ne(), ce("unavailable"), !1;
    }
  }, Mt = () => {
    C && Le();
  }, de = () => {
    N || (be() ? (_e(), $()) : D(), c.onChange());
  }, xe = () => {
    C && V && (_e(), we());
  };
  return Z.addEventListener("loadeddata", Mt), y.addEventListener("loadeddata", we), y.addEventListener("playing", we), y.addEventListener("enterpictureinpicture", de), y.addEventListener("leavepictureinpicture", de), y.addEventListener("webkitpresentationmodechanged", de), window.addEventListener("resize", xe), (ht = window.visualViewport) == null || ht.addEventListener("resize", xe), {
    video: y,
    phase: () => u,
    prepare: Le,
    refresh: () => {
      C && Le();
    },
    setActive(q) {
      N || (C = q, C ? Le() : (V && te(), ne(), ce("idle")));
    },
    destroy() {
      var q;
      N || (N = !0, C = !1, ne(), Z.removeEventListener("loadeddata", Mt), y.removeEventListener("loadeddata", we), y.removeEventListener("playing", we), y.removeEventListener("enterpictureinpicture", de), y.removeEventListener("leavepictureinpicture", de), y.removeEventListener("webkitpresentationmodechanged", de), window.removeEventListener("resize", xe), (q = window.visualViewport) == null || q.removeEventListener("resize", xe), g.remove(), y.remove());
    }
  };
}
var gu = { exports: {} }, Al = {}, bu = { exports: {} }, hu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cd;
function Em() {
  return Cd || (Cd = 1, (function(c) {
    function g(_, O) {
      var Y = _.length;
      _.push(O);
      e: for (; 0 < Y; ) {
        var ee = Y - 1 >>> 1, ve = _[ee];
        if (0 < C(ve, O))
          _[ee] = O, _[Y] = ve, Y = ee;
        else break e;
      }
    }
    function y(_) {
      return _.length === 0 ? null : _[0];
    }
    function u(_) {
      if (_.length === 0) return null;
      var O = _[0], Y = _.pop();
      if (Y !== O) {
        _[0] = Y;
        e: for (var ee = 0, ve = _.length, f = ve >>> 1; ee < f; ) {
          var T = 2 * (ee + 1) - 1, j = _[T], M = T + 1, L = _[M];
          if (0 > C(j, Y))
            M < ve && 0 > C(L, j) ? (_[ee] = L, _[M] = Y, ee = M) : (_[ee] = j, _[T] = Y, ee = T);
          else if (M < ve && 0 > C(L, Y))
            _[ee] = L, _[M] = Y, ee = M;
          else break e;
        }
      }
      return O;
    }
    function C(_, O) {
      var Y = _.sortIndex - O.sortIndex;
      return Y !== 0 ? Y : _.id - O.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var N = performance;
      c.unstable_now = function() {
        return N.now();
      };
    } else {
      var U = Date, V = U.now();
      c.unstable_now = function() {
        return U.now() - V;
      };
    }
    var p = [], w = [], B = 1, H = null, W = 3, Z = !1, J = !1, be = !1, ce = !1, D = typeof setTimeout == "function" ? setTimeout : null, le = typeof clearTimeout == "function" ? clearTimeout : null, ne = typeof setImmediate < "u" ? setImmediate : null;
    function G(_) {
      for (var O = y(w); O !== null; ) {
        if (O.callback === null) u(w);
        else if (O.startTime <= _)
          u(w), O.sortIndex = O.expirationTime, g(p, O);
        else break;
        O = y(w);
      }
    }
    function te(_) {
      if (be = !1, G(_), !J)
        if (y(p) !== null)
          J = !0, _e || (_e = !0, xe());
        else {
          var O = y(w);
          O !== null && I(te, O.startTime - _);
        }
    }
    var _e = !1, $ = -1, we = 5, Le = -1;
    function Mt() {
      return ce ? !0 : !(c.unstable_now() - Le < we);
    }
    function de() {
      if (ce = !1, _e) {
        var _ = c.unstable_now();
        Le = _;
        var O = !0;
        try {
          e: {
            J = !1, be && (be = !1, le($), $ = -1), Z = !0;
            var Y = W;
            try {
              t: {
                for (G(_), H = y(p); H !== null && !(H.expirationTime > _ && Mt()); ) {
                  var ee = H.callback;
                  if (typeof ee == "function") {
                    H.callback = null, W = H.priorityLevel;
                    var ve = ee(
                      H.expirationTime <= _
                    );
                    if (_ = c.unstable_now(), typeof ve == "function") {
                      H.callback = ve, G(_), O = !0;
                      break t;
                    }
                    H === y(p) && u(p), G(_);
                  } else u(p);
                  H = y(p);
                }
                if (H !== null) O = !0;
                else {
                  var f = y(w);
                  f !== null && I(
                    te,
                    f.startTime - _
                  ), O = !1;
                }
              }
              break e;
            } finally {
              H = null, W = Y, Z = !1;
            }
            O = void 0;
          }
        } finally {
          O ? xe() : _e = !1;
        }
      }
    }
    var xe;
    if (typeof ne == "function")
      xe = function() {
        ne(de);
      };
    else if (typeof MessageChannel < "u") {
      var ht = new MessageChannel(), q = ht.port2;
      ht.port1.onmessage = de, xe = function() {
        q.postMessage(null);
      };
    } else
      xe = function() {
        D(de, 0);
      };
    function I(_, O) {
      $ = D(function() {
        _(c.unstable_now());
      }, O);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, c.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : we = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return W;
    }, c.unstable_next = function(_) {
      switch (W) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = W;
      }
      var Y = W;
      W = O;
      try {
        return _();
      } finally {
        W = Y;
      }
    }, c.unstable_requestPaint = function() {
      ce = !0;
    }, c.unstable_runWithPriority = function(_, O) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var Y = W;
      W = _;
      try {
        return O();
      } finally {
        W = Y;
      }
    }, c.unstable_scheduleCallback = function(_, O, Y) {
      var ee = c.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? ee + Y : ee) : Y = ee, _) {
        case 1:
          var ve = -1;
          break;
        case 2:
          ve = 250;
          break;
        case 5:
          ve = 1073741823;
          break;
        case 4:
          ve = 1e4;
          break;
        default:
          ve = 5e3;
      }
      return ve = Y + ve, _ = {
        id: B++,
        callback: O,
        priorityLevel: _,
        startTime: Y,
        expirationTime: ve,
        sortIndex: -1
      }, Y > ee ? (_.sortIndex = Y, g(w, _), y(p) === null && _ === y(w) && (be ? (le($), $ = -1) : be = !0, I(te, Y - ee))) : (_.sortIndex = ve, g(p, _), J || Z || (J = !0, _e || (_e = !0, xe()))), _;
    }, c.unstable_shouldYield = Mt, c.unstable_wrapCallback = function(_) {
      var O = W;
      return function() {
        var Y = W;
        W = O;
        try {
          return _.apply(this, arguments);
        } finally {
          W = Y;
        }
      };
    };
  })(hu)), hu;
}
var Od;
function Mm() {
  return Od || (Od = 1, bu.exports = Em()), bu.exports;
}
var xu = { exports: {} }, Ie = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nd;
function Cm() {
  if (Nd) return Ie;
  Nd = 1;
  var c = yu();
  function g(p) {
    var w = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      w += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var B = 2; B < arguments.length; B++)
        w += "&args[]=" + encodeURIComponent(arguments[B]);
    }
    return "Minified React error #" + p + "; visit " + w + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function y() {
  }
  var u = {
    d: {
      f: y,
      r: function() {
        throw Error(g(522));
      },
      D: y,
      C: y,
      L: y,
      m: y,
      X: y,
      S: y,
      M: y
    },
    p: 0,
    findDOMNode: null
  }, C = Symbol.for("react.portal");
  function N(p, w, B) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: C,
      key: H == null ? null : "" + H,
      children: p,
      containerInfo: w,
      implementation: B
    };
  }
  var U = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function V(p, w) {
    if (p === "font") return "";
    if (typeof w == "string")
      return w === "use-credentials" ? w : "";
  }
  return Ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u, Ie.createPortal = function(p, w) {
    var B = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!w || w.nodeType !== 1 && w.nodeType !== 9 && w.nodeType !== 11)
      throw Error(g(299));
    return N(p, w, null, B);
  }, Ie.flushSync = function(p) {
    var w = U.T, B = u.p;
    try {
      if (U.T = null, u.p = 2, p) return p();
    } finally {
      U.T = w, u.p = B, u.d.f();
    }
  }, Ie.preconnect = function(p, w) {
    typeof p == "string" && (w ? (w = w.crossOrigin, w = typeof w == "string" ? w === "use-credentials" ? w : "" : void 0) : w = null, u.d.C(p, w));
  }, Ie.prefetchDNS = function(p) {
    typeof p == "string" && u.d.D(p);
  }, Ie.preinit = function(p, w) {
    if (typeof p == "string" && w && typeof w.as == "string") {
      var B = w.as, H = V(B, w.crossOrigin), W = typeof w.integrity == "string" ? w.integrity : void 0, Z = typeof w.fetchPriority == "string" ? w.fetchPriority : void 0;
      B === "style" ? u.d.S(
        p,
        typeof w.precedence == "string" ? w.precedence : void 0,
        {
          crossOrigin: H,
          integrity: W,
          fetchPriority: Z
        }
      ) : B === "script" && u.d.X(p, {
        crossOrigin: H,
        integrity: W,
        fetchPriority: Z,
        nonce: typeof w.nonce == "string" ? w.nonce : void 0
      });
    }
  }, Ie.preinitModule = function(p, w) {
    if (typeof p == "string")
      if (typeof w == "object" && w !== null) {
        if (w.as == null || w.as === "script") {
          var B = V(
            w.as,
            w.crossOrigin
          );
          u.d.M(p, {
            crossOrigin: B,
            integrity: typeof w.integrity == "string" ? w.integrity : void 0,
            nonce: typeof w.nonce == "string" ? w.nonce : void 0
          });
        }
      } else w == null && u.d.M(p);
  }, Ie.preload = function(p, w) {
    if (typeof p == "string" && typeof w == "object" && w !== null && typeof w.as == "string") {
      var B = w.as, H = V(B, w.crossOrigin);
      u.d.L(p, B, {
        crossOrigin: H,
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
  }, Ie.preloadModule = function(p, w) {
    if (typeof p == "string")
      if (w) {
        var B = V(w.as, w.crossOrigin);
        u.d.m(p, {
          as: typeof w.as == "string" && w.as !== "script" ? w.as : void 0,
          crossOrigin: B,
          integrity: typeof w.integrity == "string" ? w.integrity : void 0
        });
      } else u.d.m(p);
  }, Ie.requestFormReset = function(p) {
    u.d.r(p);
  }, Ie.unstable_batchedUpdates = function(p, w) {
    return p(w);
  }, Ie.useFormState = function(p, w, B) {
    return U.H.useFormState(p, w, B);
  }, Ie.useFormStatus = function() {
    return U.H.useHostTransitionStatus();
  }, Ie.version = "19.2.0", Ie;
}
var Dd;
function Om() {
  if (Dd) return xu.exports;
  Dd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (g) {
        console.error(g);
      }
  }
  return c(), xu.exports = Cm(), xu.exports;
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
var Ud;
function Nm() {
  if (Ud) return Al;
  Ud = 1;
  var c = Mm(), g = yu(), y = Om();
  function u(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function C(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function N(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function U(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function V(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (N(e) !== e)
      throw Error(u(188));
  }
  function w(e) {
    var t = e.alternate;
    if (!t) {
      if (t = N(e), t === null) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var a = e, i = t; ; ) {
      var l = a.return;
      if (l === null) break;
      var n = l.alternate;
      if (n === null) {
        if (i = l.return, i !== null) {
          a = i;
          continue;
        }
        break;
      }
      if (l.child === n.child) {
        for (n = l.child; n; ) {
          if (n === a) return p(l), e;
          if (n === i) return p(l), t;
          n = n.sibling;
        }
        throw Error(u(188));
      }
      if (a.return !== i.return) a = l, i = n;
      else {
        for (var o = !1, r = l.child; r; ) {
          if (r === a) {
            o = !0, a = l, i = n;
            break;
          }
          if (r === i) {
            o = !0, i = l, a = n;
            break;
          }
          r = r.sibling;
        }
        if (!o) {
          for (r = n.child; r; ) {
            if (r === a) {
              o = !0, a = n, i = l;
              break;
            }
            if (r === i) {
              o = !0, i = n, a = l;
              break;
            }
            r = r.sibling;
          }
          if (!o) throw Error(u(189));
        }
      }
      if (a.alternate !== i) throw Error(u(190));
    }
    if (a.tag !== 3) throw Error(u(188));
    return a.stateNode.current === a ? e : t;
  }
  function B(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = B(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var H = Object.assign, W = Symbol.for("react.element"), Z = Symbol.for("react.transitional.element"), J = Symbol.for("react.portal"), be = Symbol.for("react.fragment"), ce = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), le = Symbol.for("react.consumer"), ne = Symbol.for("react.context"), G = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), _e = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), we = Symbol.for("react.lazy"), Le = Symbol.for("react.activity"), Mt = Symbol.for("react.memo_cache_sentinel"), de = Symbol.iterator;
  function xe(e) {
    return e === null || typeof e != "object" ? null : (e = de && e[de] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ht = Symbol.for("react.client.reference");
  function q(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ht ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case be:
        return "Fragment";
      case D:
        return "Profiler";
      case ce:
        return "StrictMode";
      case te:
        return "Suspense";
      case _e:
        return "SuspenseList";
      case Le:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case J:
          return "Portal";
        case ne:
          return e.displayName || "Context";
        case le:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case $:
          return t = e.displayName || null, t !== null ? t : q(e.type) || "Memo";
        case we:
          t = e._payload, e = e._init;
          try {
            return q(e(t));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, _ = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = y.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ee = [], ve = -1;
  function f(e) {
    return { current: e };
  }
  function T(e) {
    0 > ve || (e.current = ee[ve], ee[ve] = null, ve--);
  }
  function j(e, t) {
    ve++, ee[ve] = e.current, e.current = t;
  }
  var M = f(null), L = f(null), F = f(null), oe = f(null);
  function Ce(e, t) {
    switch (j(F, t), j(L, e), j(M, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Jf(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Jf(t), e = Kf(t, e);
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
    T(M), j(M, e);
  }
  function ye() {
    T(M), T(L), T(F);
  }
  function kt(e) {
    e.memoizedState !== null && j(oe, e);
    var t = M.current, a = Kf(t, e.type);
    t !== a && (j(L, e), j(M, a));
  }
  function Dt(e) {
    L.current === e && (T(M), T(L)), oe.current === e && (T(oe), yl._currentValue = Y);
  }
  var Gn, wu;
  function Ma(e) {
    if (Gn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Gn = t && t[1] || "", wu = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Gn + e + wu;
  }
  var Xn = !1;
  function Jn(e, t) {
    if (!e || Xn) return "";
    Xn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var A = function() {
                throw Error();
              };
              if (Object.defineProperty(A.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(A, []);
                } catch (v) {
                  var x = v;
                }
                Reflect.construct(e, [], A);
              } else {
                try {
                  A.call();
                } catch (v) {
                  x = v;
                }
                e.call(A.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (v) {
                x = v;
              }
              (A = e()) && typeof A.catch == "function" && A.catch(function() {
              });
            }
          } catch (v) {
            if (v && x && typeof v.stack == "string")
              return [v.stack, x.stack];
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
        var s = o.split(`
`), h = r.split(`
`);
        for (l = i = 0; i < s.length && !s[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; l < h.length && !h[l].includes(
          "DetermineComponentFrameRoot"
        ); )
          l++;
        if (i === s.length || l === h.length)
          for (i = s.length - 1, l = h.length - 1; 1 <= i && 0 <= l && s[i] !== h[l]; )
            l--;
        for (; 1 <= i && 0 <= l; i--, l--)
          if (s[i] !== h[l]) {
            if (i !== 1 || l !== 1)
              do
                if (i--, l--, 0 > l || s[i] !== h[l]) {
                  var z = `
` + s[i].replace(" at new ", " at ");
                  return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), z;
                }
              while (1 <= i && 0 <= l);
            break;
          }
      }
    } finally {
      Xn = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? Ma(a) : "";
  }
  function Qd(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ma(e.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ma("Suspense Fallback") : Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 15:
        return Jn(e.type, !1);
      case 11:
        return Jn(e.type.render, !1);
      case 1:
        return Jn(e.type, !0);
      case 31:
        return Ma("Activity");
      default:
        return "";
    }
  }
  function zu(e) {
    try {
      var t = "", a = null;
      do
        t += Qd(e, a), a = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Kn = Object.prototype.hasOwnProperty, Wn = c.unstable_scheduleCallback, $n = c.unstable_cancelCallback, Ld = c.unstable_shouldYield, Vd = c.unstable_requestPaint, rt = c.unstable_now, Gd = c.unstable_getCurrentPriorityLevel, Su = c.unstable_ImmediatePriority, Au = c.unstable_UserBlockingPriority, Tl = c.unstable_NormalPriority, Xd = c.unstable_LowPriority, Tu = c.unstable_IdlePriority, Jd = c.log, Kd = c.unstable_setDisableYieldValue, Di = null, ut = null;
  function ia(e) {
    if (typeof Jd == "function" && Kd(e), ut && typeof ut.setStrictMode == "function")
      try {
        ut.setStrictMode(Di, e);
      } catch {
      }
  }
  var ct = Math.clz32 ? Math.clz32 : Fd, Wd = Math.log, $d = Math.LN2;
  function Fd(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Wd(e) / $d | 0) | 0;
  }
  var El = 256, Ml = 262144, Cl = 4194304;
  function Ca(e) {
    var t = e & 42;
    if (t !== 0) return t;
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
  function Ol(e, t, a) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var l = 0, n = e.suspendedLanes, o = e.pingedLanes;
    e = e.warmLanes;
    var r = i & 134217727;
    return r !== 0 ? (i = r & ~n, i !== 0 ? l = Ca(i) : (o &= r, o !== 0 ? l = Ca(o) : a || (a = r & ~e, a !== 0 && (l = Ca(a))))) : (r = i & ~n, r !== 0 ? l = Ca(r) : o !== 0 ? l = Ca(o) : a || (a = i & ~e, a !== 0 && (l = Ca(a)))), l === 0 ? 0 : t !== 0 && t !== l && (t & n) === 0 && (n = l & -l, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : l;
  }
  function Ui(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Id(e, t) {
    switch (e) {
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
  function Eu() {
    var e = Cl;
    return Cl <<= 1, (Cl & 62914560) === 0 && (Cl = 4194304), e;
  }
  function Fn(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function ji(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Pd(e, t, a, i, l, n) {
    var o = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var r = e.entanglements, s = e.expirationTimes, h = e.hiddenUpdates;
    for (a = o & ~a; 0 < a; ) {
      var z = 31 - ct(a), A = 1 << z;
      r[z] = 0, s[z] = -1;
      var x = h[z];
      if (x !== null)
        for (h[z] = null, z = 0; z < x.length; z++) {
          var v = x[z];
          v !== null && (v.lane &= -536870913);
        }
      a &= ~A;
    }
    i !== 0 && Mu(e, i, 0), n !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= n & ~(o & ~t));
  }
  function Mu(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - ct(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 261930;
  }
  function Cu(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var i = 31 - ct(a), l = 1 << i;
      l & t | e[i] & t && (e[i] |= t), a &= ~l;
    }
  }
  function Ou(e, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : In(a), (a & (e.suspendedLanes | t)) !== 0 ? 0 : a;
  }
  function In(e) {
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
  function Pn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Nu() {
    var e = O.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : hd(e.type));
  }
  function Du(e, t) {
    var a = O.p;
    try {
      return O.p = e, t();
    } finally {
      O.p = a;
    }
  }
  var la = Math.random().toString(36).slice(2), Xe = "__reactFiber$" + la, et = "__reactProps$" + la, Ka = "__reactContainer$" + la, eo = "__reactEvents$" + la, e0 = "__reactListeners$" + la, t0 = "__reactHandles$" + la, Uu = "__reactResources$" + la, Hi = "__reactMarker$" + la;
  function to(e) {
    delete e[Xe], delete e[et], delete e[eo], delete e[e0], delete e[t0];
  }
  function Wa(e) {
    var t = e[Xe];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Ka] || a[Xe]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = td(e); e !== null; ) {
            if (a = e[Xe]) return a;
            e = td(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function $a(e) {
    if (e = e[Xe] || e[Ka]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ri(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(u(33));
  }
  function Fa(e) {
    var t = e[Uu];
    return t || (t = e[Uu] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ve(e) {
    e[Hi] = !0;
  }
  var ju = /* @__PURE__ */ new Set(), Hu = {};
  function Oa(e, t) {
    Ia(e, t), Ia(e + "Capture", t);
  }
  function Ia(e, t) {
    for (Hu[e] = t, e = 0; e < t.length; e++)
      ju.add(t[e]);
  }
  var a0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ru = {}, ku = {};
  function i0(e) {
    return Kn.call(ku, e) ? !0 : Kn.call(Ru, e) ? !1 : a0.test(e) ? ku[e] = !0 : (Ru[e] = !0, !1);
  }
  function Nl(e, t, a) {
    if (i0(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function Dl(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function Bt(e, t, a, i) {
    if (i === null) e.removeAttribute(a);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + i);
    }
  }
  function xt(e) {
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
  function Bu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function l0(e, t, a) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var l = i.get, n = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return l.call(this);
        },
        set: function(o) {
          a = "" + o, n.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          a = "" + o;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function ao(e) {
    if (!e._valueTracker) {
      var t = Bu(e) ? "checked" : "value";
      e._valueTracker = l0(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function qu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), i = "";
    return e && (i = Bu(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
  }
  function Ul(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var n0 = /[\n"\\]/g;
  function vt(e) {
    return e.replace(
      n0,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function io(e, t, a, i, l, n, o, r) {
    e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t != null ? o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + xt(t)) : e.value !== "" + xt(t) && (e.value = "" + xt(t)) : o !== "submit" && o !== "reset" || e.removeAttribute("value"), t != null ? lo(e, o, xt(t)) : a != null ? lo(e, o, xt(a)) : i != null && e.removeAttribute("value"), l == null && n != null && (e.defaultChecked = !!n), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.name = "" + xt(r) : e.removeAttribute("name");
  }
  function Zu(e, t, a, i, l, n, o, r) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (e.type = n), t != null || a != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        ao(e);
        return;
      }
      a = a != null ? "" + xt(a) : "", t = t != null ? "" + xt(t) : a, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? l, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = r ? e.checked : !!i, e.defaultChecked = !!i, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), ao(e);
  }
  function lo(e, t, a) {
    t === "number" && Ul(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function Pa(e, t, a, i) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < a.length; l++)
        t["$" + a[l]] = !0;
      for (a = 0; a < e.length; a++)
        l = t.hasOwnProperty("$" + e[a].value), e[a].selected !== l && (e[a].selected = l), l && i && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + xt(a), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === a) {
          e[l].selected = !0, i && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Yu(e, t, a) {
    if (t != null && (t = "" + xt(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + xt(a) : "";
  }
  function Qu(e, t, a, i) {
    if (t == null) {
      if (i != null) {
        if (a != null) throw Error(u(92));
        if (I(i)) {
          if (1 < i.length) throw Error(u(93));
          i = i[0];
        }
        a = i;
      }
      a == null && (a = ""), t = a;
    }
    a = xt(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i), ao(e);
  }
  function ei(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var o0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Lu(e, t, a) {
    var i = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || o0.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function Vu(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(u(62));
    if (e = e.style, a != null) {
      for (var i in a)
        !a.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var l in t)
        i = t[l], t.hasOwnProperty(l) && a[l] !== i && Lu(e, l, i);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && Lu(e, n, t[n]);
  }
  function no(e) {
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
  var r0 = /* @__PURE__ */ new Map([
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
  ]), u0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function jl(e) {
    return u0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function qt() {
  }
  var oo = null;
  function ro(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ti = null, ai = null;
  function Gu(e) {
    var t = $a(e);
    if (t && (e = t.stateNode)) {
      var a = e[et] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (io(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + vt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var i = a[t];
              if (i !== e && i.form === e.form) {
                var l = i[et] || null;
                if (!l) throw Error(u(90));
                io(
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
            for (t = 0; t < a.length; t++)
              i = a[t], i.form === e.form && qu(i);
          }
          break e;
        case "textarea":
          Yu(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && Pa(e, !!a.multiple, t, !1);
      }
    }
  }
  var uo = !1;
  function Xu(e, t, a) {
    if (uo) return e(t, a);
    uo = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (uo = !1, (ti !== null || ai !== null) && (wn(), ti && (t = ti, e = ai, ai = ti = null, Gu(t), e)))
        for (t = 0; t < e.length; t++) Gu(e[t]);
    }
  }
  function ki(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var i = a[et] || null;
    if (i === null) return null;
    a = i[t];
    e: switch (t) {
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
    if (a && typeof a != "function")
      throw Error(
        u(231, t, typeof a)
      );
    return a;
  }
  var Zt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), co = !1;
  if (Zt)
    try {
      var Bi = {};
      Object.defineProperty(Bi, "passive", {
        get: function() {
          co = !0;
        }
      }), window.addEventListener("test", Bi, Bi), window.removeEventListener("test", Bi, Bi);
    } catch {
      co = !1;
    }
  var na = null, so = null, Hl = null;
  function Ju() {
    if (Hl) return Hl;
    var e, t = so, a = t.length, i, l = "value" in na ? na.value : na.textContent, n = l.length;
    for (e = 0; e < a && t[e] === l[e]; e++) ;
    var o = a - e;
    for (i = 1; i <= o && t[a - i] === l[n - i]; i++) ;
    return Hl = l.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Rl(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function kl() {
    return !0;
  }
  function Ku() {
    return !1;
  }
  function tt(e) {
    function t(a, i, l, n, o) {
      this._reactName = a, this._targetInst = l, this.type = i, this.nativeEvent = n, this.target = o, this.currentTarget = null;
      for (var r in e)
        e.hasOwnProperty(r) && (a = e[r], this[r] = a ? a(n) : n[r]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? kl : Ku, this.isPropagationStopped = Ku, this;
    }
    return H(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = kl);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = kl);
      },
      persist: function() {
      },
      isPersistent: kl
    }), t;
  }
  var Na = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bl = tt(Na), qi = H({}, Na, { view: 0, detail: 0 }), c0 = tt(qi), fo, po, Zi, ql = H({}, qi, {
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
    getModifierState: go,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Zi && (Zi && e.type === "mousemove" ? (fo = e.screenX - Zi.screenX, po = e.screenY - Zi.screenY) : po = fo = 0, Zi = e), fo);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : po;
    }
  }), Wu = tt(ql), s0 = H({}, ql, { dataTransfer: 0 }), f0 = tt(s0), d0 = H({}, qi, { relatedTarget: 0 }), mo = tt(d0), p0 = H({}, Na, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), m0 = tt(p0), g0 = H({}, Na, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), b0 = tt(g0), h0 = H({}, Na, { data: 0 }), $u = tt(h0), x0 = {
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
  }, v0 = {
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
  }, y0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function _0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = y0[e]) ? !!t[e] : !1;
  }
  function go() {
    return _0;
  }
  var w0 = H({}, qi, {
    key: function(e) {
      if (e.key) {
        var t = x0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Rl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? v0[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: go,
    charCode: function(e) {
      return e.type === "keypress" ? Rl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Rl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), z0 = tt(w0), S0 = H({}, ql, {
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
  }), Fu = tt(S0), A0 = H({}, qi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: go
  }), T0 = tt(A0), E0 = H({}, Na, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), M0 = tt(E0), C0 = H({}, ql, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), O0 = tt(C0), N0 = H({}, Na, {
    newState: 0,
    oldState: 0
  }), D0 = tt(N0), U0 = [9, 13, 27, 32], bo = Zt && "CompositionEvent" in window, Yi = null;
  Zt && "documentMode" in document && (Yi = document.documentMode);
  var j0 = Zt && "TextEvent" in window && !Yi, Iu = Zt && (!bo || Yi && 8 < Yi && 11 >= Yi), Pu = " ", ec = !1;
  function tc(e, t) {
    switch (e) {
      case "keyup":
        return U0.indexOf(t.keyCode) !== -1;
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
  function ac(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ii = !1;
  function H0(e, t) {
    switch (e) {
      case "compositionend":
        return ac(t);
      case "keypress":
        return t.which !== 32 ? null : (ec = !0, Pu);
      case "textInput":
        return e = t.data, e === Pu && ec ? null : e;
      default:
        return null;
    }
  }
  function R0(e, t) {
    if (ii)
      return e === "compositionend" || !bo && tc(e, t) ? (e = Ju(), Hl = so = na = null, ii = !1, e) : null;
    switch (e) {
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
        return Iu && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var k0 = {
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
  function ic(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!k0[e.type] : t === "textarea";
  }
  function lc(e, t, a, i) {
    ti ? ai ? ai.push(i) : ai = [i] : ti = i, t = Cn(t, "onChange"), 0 < t.length && (a = new Bl(
      "onChange",
      "change",
      null,
      a,
      i
    ), e.push({ event: a, listeners: t }));
  }
  var Qi = null, Li = null;
  function B0(e) {
    Yf(e, 0);
  }
  function Zl(e) {
    var t = Ri(e);
    if (qu(t)) return e;
  }
  function nc(e, t) {
    if (e === "change") return t;
  }
  var oc = !1;
  if (Zt) {
    var ho;
    if (Zt) {
      var xo = "oninput" in document;
      if (!xo) {
        var rc = document.createElement("div");
        rc.setAttribute("oninput", "return;"), xo = typeof rc.oninput == "function";
      }
      ho = xo;
    } else ho = !1;
    oc = ho && (!document.documentMode || 9 < document.documentMode);
  }
  function uc() {
    Qi && (Qi.detachEvent("onpropertychange", cc), Li = Qi = null);
  }
  function cc(e) {
    if (e.propertyName === "value" && Zl(Li)) {
      var t = [];
      lc(
        t,
        Li,
        e,
        ro(e)
      ), Xu(B0, t);
    }
  }
  function q0(e, t, a) {
    e === "focusin" ? (uc(), Qi = t, Li = a, Qi.attachEvent("onpropertychange", cc)) : e === "focusout" && uc();
  }
  function Z0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Zl(Li);
  }
  function Y0(e, t) {
    if (e === "click") return Zl(t);
  }
  function Q0(e, t) {
    if (e === "input" || e === "change")
      return Zl(t);
  }
  function L0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var st = typeof Object.is == "function" ? Object.is : L0;
  function Vi(e, t) {
    if (st(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), i = Object.keys(t);
    if (a.length !== i.length) return !1;
    for (i = 0; i < a.length; i++) {
      var l = a[i];
      if (!Kn.call(t, l) || !st(e[l], t[l]))
        return !1;
    }
    return !0;
  }
  function sc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function fc(e, t) {
    var a = sc(e);
    e = 0;
    for (var i; a; ) {
      if (a.nodeType === 3) {
        if (i = e + a.textContent.length, e <= t && i >= t)
          return { node: a, offset: t - e };
        e = i;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = sc(a);
    }
  }
  function dc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? dc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function pc(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ul(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = Ul(e.document);
    }
    return t;
  }
  function vo(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var V0 = Zt && "documentMode" in document && 11 >= document.documentMode, li = null, yo = null, Gi = null, _o = !1;
  function mc(e, t, a) {
    var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    _o || li == null || li !== Ul(i) || (i = li, "selectionStart" in i && vo(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Gi && Vi(Gi, i) || (Gi = i, i = Cn(yo, "onSelect"), 0 < i.length && (t = new Bl(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: i }), t.target = li)));
  }
  function Da(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var ni = {
    animationend: Da("Animation", "AnimationEnd"),
    animationiteration: Da("Animation", "AnimationIteration"),
    animationstart: Da("Animation", "AnimationStart"),
    transitionrun: Da("Transition", "TransitionRun"),
    transitionstart: Da("Transition", "TransitionStart"),
    transitioncancel: Da("Transition", "TransitionCancel"),
    transitionend: Da("Transition", "TransitionEnd")
  }, wo = {}, gc = {};
  Zt && (gc = document.createElement("div").style, "AnimationEvent" in window || (delete ni.animationend.animation, delete ni.animationiteration.animation, delete ni.animationstart.animation), "TransitionEvent" in window || delete ni.transitionend.transition);
  function Ua(e) {
    if (wo[e]) return wo[e];
    if (!ni[e]) return e;
    var t = ni[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in gc)
        return wo[e] = t[a];
    return e;
  }
  var bc = Ua("animationend"), hc = Ua("animationiteration"), xc = Ua("animationstart"), G0 = Ua("transitionrun"), X0 = Ua("transitionstart"), J0 = Ua("transitioncancel"), vc = Ua("transitionend"), yc = /* @__PURE__ */ new Map(), zo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  zo.push("scrollEnd");
  function Ct(e, t) {
    yc.set(e, t), Oa(t, [e]);
  }
  var Yl = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, yt = [], oi = 0, So = 0;
  function Ql() {
    for (var e = oi, t = So = oi = 0; t < e; ) {
      var a = yt[t];
      yt[t++] = null;
      var i = yt[t];
      yt[t++] = null;
      var l = yt[t];
      yt[t++] = null;
      var n = yt[t];
      if (yt[t++] = null, i !== null && l !== null) {
        var o = i.pending;
        o === null ? l.next = l : (l.next = o.next, o.next = l), i.pending = l;
      }
      n !== 0 && _c(a, l, n);
    }
  }
  function Ll(e, t, a, i) {
    yt[oi++] = e, yt[oi++] = t, yt[oi++] = a, yt[oi++] = i, So |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Ao(e, t, a, i) {
    return Ll(e, t, a, i), Vl(e);
  }
  function ja(e, t) {
    return Ll(e, null, null, t), Vl(e);
  }
  function _c(e, t, a) {
    e.lanes |= a;
    var i = e.alternate;
    i !== null && (i.lanes |= a);
    for (var l = !1, n = e.return; n !== null; )
      n.childLanes |= a, i = n.alternate, i !== null && (i.childLanes |= a), n.tag === 22 && (e = n.stateNode, e === null || e._visibility & 1 || (l = !0)), e = n, n = n.return;
    return e.tag === 3 ? (n = e.stateNode, l && t !== null && (l = 31 - ct(a), e = n.hiddenUpdates, i = e[l], i === null ? e[l] = [t] : i.push(t), t.lane = a | 536870912), n) : null;
  }
  function Vl(e) {
    if (50 < pl)
      throw pl = 0, jr = null, Error(u(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ri = {};
  function K0(e, t, a, i) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ft(e, t, a, i) {
    return new K0(e, t, a, i);
  }
  function To(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Yt(e, t) {
    var a = e.alternate;
    return a === null ? (a = ft(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function wc(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Gl(e, t, a, i, l, n) {
    var o = 0;
    if (i = e, typeof e == "function") To(e) && (o = 1);
    else if (typeof e == "string")
      o = Pp(
        e,
        a,
        M.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Le:
          return e = ft(31, a, t, l), e.elementType = Le, e.lanes = n, e;
        case be:
          return Ha(a.children, l, n, t);
        case ce:
          o = 8, l |= 24;
          break;
        case D:
          return e = ft(12, a, t, l | 2), e.elementType = D, e.lanes = n, e;
        case te:
          return e = ft(13, a, t, l), e.elementType = te, e.lanes = n, e;
        case _e:
          return e = ft(19, a, t, l), e.elementType = _e, e.lanes = n, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ne:
                o = 10;
                break e;
              case le:
                o = 9;
                break e;
              case G:
                o = 11;
                break e;
              case $:
                o = 14;
                break e;
              case we:
                o = 16, i = null;
                break e;
            }
          o = 29, a = Error(
            u(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = ft(o, a, t, l), t.elementType = e, t.type = i, t.lanes = n, t;
  }
  function Ha(e, t, a, i) {
    return e = ft(7, e, i, t), e.lanes = a, e;
  }
  function Eo(e, t, a) {
    return e = ft(6, e, null, t), e.lanes = a, e;
  }
  function zc(e) {
    var t = ft(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Mo(e, t, a) {
    return t = ft(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Sc = /* @__PURE__ */ new WeakMap();
  function _t(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Sc.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: zu(t)
      }, Sc.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: zu(t)
    };
  }
  var ui = [], ci = 0, Xl = null, Xi = 0, wt = [], zt = 0, oa = null, Ut = 1, jt = "";
  function Qt(e, t) {
    ui[ci++] = Xi, ui[ci++] = Xl, Xl = e, Xi = t;
  }
  function Ac(e, t, a) {
    wt[zt++] = Ut, wt[zt++] = jt, wt[zt++] = oa, oa = e;
    var i = Ut;
    e = jt;
    var l = 32 - ct(i) - 1;
    i &= ~(1 << l), a += 1;
    var n = 32 - ct(t) + l;
    if (30 < n) {
      var o = l - l % 5;
      n = (i & (1 << o) - 1).toString(32), i >>= o, l -= o, Ut = 1 << 32 - ct(t) + l | a << l | i, jt = n + e;
    } else
      Ut = 1 << n | a << l | i, jt = e;
  }
  function Co(e) {
    e.return !== null && (Qt(e, 1), Ac(e, 1, 0));
  }
  function Oo(e) {
    for (; e === Xl; )
      Xl = ui[--ci], ui[ci] = null, Xi = ui[--ci], ui[ci] = null;
    for (; e === oa; )
      oa = wt[--zt], wt[zt] = null, jt = wt[--zt], wt[zt] = null, Ut = wt[--zt], wt[zt] = null;
  }
  function Tc(e, t) {
    wt[zt++] = Ut, wt[zt++] = jt, wt[zt++] = oa, Ut = t.id, jt = t.overflow, oa = e;
  }
  var Je = null, Oe = null, pe = !1, ra = null, St = !1, No = Error(u(519));
  function ua(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ji(_t(t, e)), No;
  }
  function Ec(e) {
    var t = e.stateNode, a = e.type, i = e.memoizedProps;
    switch (t[Xe] = e, t[et] = i, a) {
      case "dialog":
        ue("cancel", t), ue("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ue("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < gl.length; a++)
          ue(gl[a], t);
        break;
      case "source":
        ue("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ue("error", t), ue("load", t);
        break;
      case "details":
        ue("toggle", t);
        break;
      case "input":
        ue("invalid", t), Zu(
          t,
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
        ue("invalid", t);
        break;
      case "textarea":
        ue("invalid", t), Qu(t, i.value, i.defaultValue, i.children);
    }
    a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || Gf(t.textContent, a) ? (i.popover != null && (ue("beforetoggle", t), ue("toggle", t)), i.onScroll != null && ue("scroll", t), i.onScrollEnd != null && ue("scrollend", t), i.onClick != null && (t.onclick = qt), t = !0) : t = !1, t || ua(e, !0);
  }
  function Mc(e) {
    for (Je = e.return; Je; )
      switch (Je.tag) {
        case 5:
        case 31:
        case 13:
          St = !1;
          return;
        case 27:
        case 3:
          St = !0;
          return;
        default:
          Je = Je.return;
      }
  }
  function si(e) {
    if (e !== Je) return !1;
    if (!pe) return Mc(e), pe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Wr(e.type, e.memoizedProps)), a = !a), a && Oe && ua(e), Mc(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Oe = ed(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(317));
      Oe = ed(e);
    } else
      t === 27 ? (t = Oe, wa(e.type) ? (e = eu, eu = null, Oe = e) : Oe = t) : Oe = Je ? Tt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ra() {
    Oe = Je = null, pe = !1;
  }
  function Do() {
    var e = ra;
    return e !== null && (nt === null ? nt = e : nt.push.apply(
      nt,
      e
    ), ra = null), e;
  }
  function Ji(e) {
    ra === null ? ra = [e] : ra.push(e);
  }
  var Uo = f(null), ka = null, Lt = null;
  function ca(e, t, a) {
    j(Uo, t._currentValue), t._currentValue = a;
  }
  function Vt(e) {
    e._currentValue = Uo.current, T(Uo);
  }
  function jo(e, t, a) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function Ho(e, t, a, i) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var n = l.dependencies;
      if (n !== null) {
        var o = l.child;
        n = n.firstContext;
        e: for (; n !== null; ) {
          var r = n;
          n = l;
          for (var s = 0; s < t.length; s++)
            if (r.context === t[s]) {
              n.lanes |= a, r = n.alternate, r !== null && (r.lanes |= a), jo(
                n.return,
                a,
                e
              ), i || (o = null);
              break e;
            }
          n = r.next;
        }
      } else if (l.tag === 18) {
        if (o = l.return, o === null) throw Error(u(341));
        o.lanes |= a, n = o.alternate, n !== null && (n.lanes |= a), jo(o, a, e), o = null;
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
  function fi(e, t, a, i) {
    e = null;
    for (var l = t, n = !1; l !== null; ) {
      if (!n) {
        if ((l.flags & 524288) !== 0) n = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var o = l.alternate;
        if (o === null) throw Error(u(387));
        if (o = o.memoizedProps, o !== null) {
          var r = l.type;
          st(l.pendingProps.value, o.value) || (e !== null ? e.push(r) : e = [r]);
        }
      } else if (l === oe.current) {
        if (o = l.alternate, o === null) throw Error(u(387));
        o.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(yl) : e = [yl]);
      }
      l = l.return;
    }
    e !== null && Ho(
      t,
      e,
      a,
      i
    ), t.flags |= 262144;
  }
  function Jl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!st(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ba(e) {
    ka = e, Lt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ke(e) {
    return Cc(ka, e);
  }
  function Kl(e, t) {
    return ka === null && Ba(e), Cc(e, t);
  }
  function Cc(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Lt === null) {
      if (e === null) throw Error(u(308));
      Lt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Lt = Lt.next = t;
    return a;
  }
  var W0 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, $0 = c.unstable_scheduleCallback, F0 = c.unstable_NormalPriority, Be = {
    $$typeof: ne,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ro() {
    return {
      controller: new W0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ki(e) {
    e.refCount--, e.refCount === 0 && $0(F0, function() {
      e.controller.abort();
    });
  }
  var Wi = null, ko = 0, di = 0, pi = null;
  function I0(e, t) {
    if (Wi === null) {
      var a = Wi = [];
      ko = 0, di = Zr(), pi = {
        status: "pending",
        value: void 0,
        then: function(i) {
          a.push(i);
        }
      };
    }
    return ko++, t.then(Oc, Oc), t;
  }
  function Oc() {
    if (--ko === 0 && Wi !== null) {
      pi !== null && (pi.status = "fulfilled");
      var e = Wi;
      Wi = null, di = 0, pi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function P0(e, t) {
    var a = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(l) {
        a.push(l);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var l = 0; l < a.length; l++) (0, a[l])(t);
      },
      function(l) {
        for (i.status = "rejected", i.reason = l, l = 0; l < a.length; l++)
          (0, a[l])(void 0);
      }
    ), i;
  }
  var Nc = _.S;
  _.S = function(e, t) {
    gf = rt(), typeof t == "object" && t !== null && typeof t.then == "function" && I0(e, t), Nc !== null && Nc(e, t);
  };
  var qa = f(null);
  function Bo() {
    var e = qa.current;
    return e !== null ? e : Me.pooledCache;
  }
  function Wl(e, t) {
    t === null ? j(qa, qa.current) : j(qa, t.pool);
  }
  function Dc() {
    var e = Bo();
    return e === null ? null : { parent: Be._currentValue, pool: e };
  }
  var mi = Error(u(460)), qo = Error(u(474)), $l = Error(u(542)), Fl = { then: function() {
  } };
  function Uc(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function jc(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(qt, qt), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Rc(e), e;
      default:
        if (typeof t.status == "string") t.then(qt, qt);
        else {
          if (e = Me, e !== null && 100 < e.shellSuspendCounter)
            throw Error(u(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var l = t;
                l.status = "fulfilled", l.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var l = t;
                l.status = "rejected", l.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Rc(e), e;
        }
        throw Ya = t, mi;
    }
  }
  function Za(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ya = a, mi) : a;
    }
  }
  var Ya = null;
  function Hc() {
    if (Ya === null) throw Error(u(459));
    var e = Ya;
    return Ya = null, e;
  }
  function Rc(e) {
    if (e === mi || e === $l)
      throw Error(u(483));
  }
  var gi = null, $i = 0;
  function Il(e) {
    var t = $i;
    return $i += 1, gi === null && (gi = []), jc(gi, e, t);
  }
  function Fi(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Pl(e, t) {
    throw t.$$typeof === W ? Error(u(525)) : (e = Object.prototype.toString.call(t), Error(
      u(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function kc(e) {
    function t(m, d) {
      if (e) {
        var b = m.deletions;
        b === null ? (m.deletions = [d], m.flags |= 16) : b.push(d);
      }
    }
    function a(m, d) {
      if (!e) return null;
      for (; d !== null; )
        t(m, d), d = d.sibling;
      return null;
    }
    function i(m) {
      for (var d = /* @__PURE__ */ new Map(); m !== null; )
        m.key !== null ? d.set(m.key, m) : d.set(m.index, m), m = m.sibling;
      return d;
    }
    function l(m, d) {
      return m = Yt(m, d), m.index = 0, m.sibling = null, m;
    }
    function n(m, d, b) {
      return m.index = b, e ? (b = m.alternate, b !== null ? (b = b.index, b < d ? (m.flags |= 67108866, d) : b) : (m.flags |= 67108866, d)) : (m.flags |= 1048576, d);
    }
    function o(m) {
      return e && m.alternate === null && (m.flags |= 67108866), m;
    }
    function r(m, d, b, S) {
      return d === null || d.tag !== 6 ? (d = Eo(b, m.mode, S), d.return = m, d) : (d = l(d, b), d.return = m, d);
    }
    function s(m, d, b, S) {
      var Q = b.type;
      return Q === be ? z(
        m,
        d,
        b.props.children,
        S,
        b.key
      ) : d !== null && (d.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === we && Za(Q) === d.type) ? (d = l(d, b.props), Fi(d, b), d.return = m, d) : (d = Gl(
        b.type,
        b.key,
        b.props,
        null,
        m.mode,
        S
      ), Fi(d, b), d.return = m, d);
    }
    function h(m, d, b, S) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== b.containerInfo || d.stateNode.implementation !== b.implementation ? (d = Mo(b, m.mode, S), d.return = m, d) : (d = l(d, b.children || []), d.return = m, d);
    }
    function z(m, d, b, S, Q) {
      return d === null || d.tag !== 7 ? (d = Ha(
        b,
        m.mode,
        S,
        Q
      ), d.return = m, d) : (d = l(d, b), d.return = m, d);
    }
    function A(m, d, b) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return d = Eo(
          "" + d,
          m.mode,
          b
        ), d.return = m, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Z:
            return b = Gl(
              d.type,
              d.key,
              d.props,
              null,
              m.mode,
              b
            ), Fi(b, d), b.return = m, b;
          case J:
            return d = Mo(
              d,
              m.mode,
              b
            ), d.return = m, d;
          case we:
            return d = Za(d), A(m, d, b);
        }
        if (I(d) || xe(d))
          return d = Ha(
            d,
            m.mode,
            b,
            null
          ), d.return = m, d;
        if (typeof d.then == "function")
          return A(m, Il(d), b);
        if (d.$$typeof === ne)
          return A(
            m,
            Kl(m, d),
            b
          );
        Pl(m, d);
      }
      return null;
    }
    function x(m, d, b, S) {
      var Q = d !== null ? d.key : null;
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return Q !== null ? null : r(m, d, "" + b, S);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Z:
            return b.key === Q ? s(m, d, b, S) : null;
          case J:
            return b.key === Q ? h(m, d, b, S) : null;
          case we:
            return b = Za(b), x(m, d, b, S);
        }
        if (I(b) || xe(b))
          return Q !== null ? null : z(m, d, b, S, null);
        if (typeof b.then == "function")
          return x(
            m,
            d,
            Il(b),
            S
          );
        if (b.$$typeof === ne)
          return x(
            m,
            d,
            Kl(m, b),
            S
          );
        Pl(m, b);
      }
      return null;
    }
    function v(m, d, b, S, Q) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return m = m.get(b) || null, r(d, m, "" + S, Q);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Z:
            return m = m.get(
              S.key === null ? b : S.key
            ) || null, s(d, m, S, Q);
          case J:
            return m = m.get(
              S.key === null ? b : S.key
            ) || null, h(d, m, S, Q);
          case we:
            return S = Za(S), v(
              m,
              d,
              b,
              S,
              Q
            );
        }
        if (I(S) || xe(S))
          return m = m.get(b) || null, z(d, m, S, Q, null);
        if (typeof S.then == "function")
          return v(
            m,
            d,
            b,
            Il(S),
            Q
          );
        if (S.$$typeof === ne)
          return v(
            m,
            d,
            b,
            Kl(d, S),
            Q
          );
        Pl(d, S);
      }
      return null;
    }
    function R(m, d, b, S) {
      for (var Q = null, me = null, k = d, ie = d = 0, fe = null; k !== null && ie < b.length; ie++) {
        k.index > ie ? (fe = k, k = null) : fe = k.sibling;
        var ge = x(
          m,
          k,
          b[ie],
          S
        );
        if (ge === null) {
          k === null && (k = fe);
          break;
        }
        e && k && ge.alternate === null && t(m, k), d = n(ge, d, ie), me === null ? Q = ge : me.sibling = ge, me = ge, k = fe;
      }
      if (ie === b.length)
        return a(m, k), pe && Qt(m, ie), Q;
      if (k === null) {
        for (; ie < b.length; ie++)
          k = A(m, b[ie], S), k !== null && (d = n(
            k,
            d,
            ie
          ), me === null ? Q = k : me.sibling = k, me = k);
        return pe && Qt(m, ie), Q;
      }
      for (k = i(k); ie < b.length; ie++)
        fe = v(
          k,
          m,
          ie,
          b[ie],
          S
        ), fe !== null && (e && fe.alternate !== null && k.delete(
          fe.key === null ? ie : fe.key
        ), d = n(
          fe,
          d,
          ie
        ), me === null ? Q = fe : me.sibling = fe, me = fe);
      return e && k.forEach(function(Ea) {
        return t(m, Ea);
      }), pe && Qt(m, ie), Q;
    }
    function K(m, d, b, S) {
      if (b == null) throw Error(u(151));
      for (var Q = null, me = null, k = d, ie = d = 0, fe = null, ge = b.next(); k !== null && !ge.done; ie++, ge = b.next()) {
        k.index > ie ? (fe = k, k = null) : fe = k.sibling;
        var Ea = x(m, k, ge.value, S);
        if (Ea === null) {
          k === null && (k = fe);
          break;
        }
        e && k && Ea.alternate === null && t(m, k), d = n(Ea, d, ie), me === null ? Q = Ea : me.sibling = Ea, me = Ea, k = fe;
      }
      if (ge.done)
        return a(m, k), pe && Qt(m, ie), Q;
      if (k === null) {
        for (; !ge.done; ie++, ge = b.next())
          ge = A(m, ge.value, S), ge !== null && (d = n(ge, d, ie), me === null ? Q = ge : me.sibling = ge, me = ge);
        return pe && Qt(m, ie), Q;
      }
      for (k = i(k); !ge.done; ie++, ge = b.next())
        ge = v(k, m, ie, ge.value, S), ge !== null && (e && ge.alternate !== null && k.delete(ge.key === null ? ie : ge.key), d = n(ge, d, ie), me === null ? Q = ge : me.sibling = ge, me = ge);
      return e && k.forEach(function(sm) {
        return t(m, sm);
      }), pe && Qt(m, ie), Q;
    }
    function Ee(m, d, b, S) {
      if (typeof b == "object" && b !== null && b.type === be && b.key === null && (b = b.props.children), typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Z:
            e: {
              for (var Q = b.key; d !== null; ) {
                if (d.key === Q) {
                  if (Q = b.type, Q === be) {
                    if (d.tag === 7) {
                      a(
                        m,
                        d.sibling
                      ), S = l(
                        d,
                        b.props.children
                      ), S.return = m, m = S;
                      break e;
                    }
                  } else if (d.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === we && Za(Q) === d.type) {
                    a(
                      m,
                      d.sibling
                    ), S = l(d, b.props), Fi(S, b), S.return = m, m = S;
                    break e;
                  }
                  a(m, d);
                  break;
                } else t(m, d);
                d = d.sibling;
              }
              b.type === be ? (S = Ha(
                b.props.children,
                m.mode,
                S,
                b.key
              ), S.return = m, m = S) : (S = Gl(
                b.type,
                b.key,
                b.props,
                null,
                m.mode,
                S
              ), Fi(S, b), S.return = m, m = S);
            }
            return o(m);
          case J:
            e: {
              for (Q = b.key; d !== null; ) {
                if (d.key === Q)
                  if (d.tag === 4 && d.stateNode.containerInfo === b.containerInfo && d.stateNode.implementation === b.implementation) {
                    a(
                      m,
                      d.sibling
                    ), S = l(d, b.children || []), S.return = m, m = S;
                    break e;
                  } else {
                    a(m, d);
                    break;
                  }
                else t(m, d);
                d = d.sibling;
              }
              S = Mo(b, m.mode, S), S.return = m, m = S;
            }
            return o(m);
          case we:
            return b = Za(b), Ee(
              m,
              d,
              b,
              S
            );
        }
        if (I(b))
          return R(
            m,
            d,
            b,
            S
          );
        if (xe(b)) {
          if (Q = xe(b), typeof Q != "function") throw Error(u(150));
          return b = Q.call(b), K(
            m,
            d,
            b,
            S
          );
        }
        if (typeof b.then == "function")
          return Ee(
            m,
            d,
            Il(b),
            S
          );
        if (b.$$typeof === ne)
          return Ee(
            m,
            d,
            Kl(m, b),
            S
          );
        Pl(m, b);
      }
      return typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint" ? (b = "" + b, d !== null && d.tag === 6 ? (a(m, d.sibling), S = l(d, b), S.return = m, m = S) : (a(m, d), S = Eo(b, m.mode, S), S.return = m, m = S), o(m)) : a(m, d);
    }
    return function(m, d, b, S) {
      try {
        $i = 0;
        var Q = Ee(
          m,
          d,
          b,
          S
        );
        return gi = null, Q;
      } catch (k) {
        if (k === mi || k === $l) throw k;
        var me = ft(29, k, null, m.mode);
        return me.lanes = S, me.return = m, me;
      } finally {
      }
    };
  }
  var Qa = kc(!0), Bc = kc(!1), sa = !1;
  function Zo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Yo(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function fa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function da(e, t, a) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (he & 2) !== 0) {
      var l = i.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), i.pending = t, t = Vl(e), _c(e, null, a), t;
    }
    return Ll(e, i, t, a), Vl(e);
  }
  function Ii(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, a |= i, t.lanes = a, Cu(e, a);
    }
  }
  function Qo(e, t) {
    var a = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, a === i)) {
      var l = null, n = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var o = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          n === null ? l = n = o : n = n.next = o, a = a.next;
        } while (a !== null);
        n === null ? l = n = t : n = n.next = t;
      } else l = n = t;
      a = {
        baseState: i.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: n,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var Lo = !1;
  function Pi() {
    if (Lo) {
      var e = pi;
      if (e !== null) throw e;
    }
  }
  function el(e, t, a, i) {
    Lo = !1;
    var l = e.updateQueue;
    sa = !1;
    var n = l.firstBaseUpdate, o = l.lastBaseUpdate, r = l.shared.pending;
    if (r !== null) {
      l.shared.pending = null;
      var s = r, h = s.next;
      s.next = null, o === null ? n = h : o.next = h, o = s;
      var z = e.alternate;
      z !== null && (z = z.updateQueue, r = z.lastBaseUpdate, r !== o && (r === null ? z.firstBaseUpdate = h : r.next = h, z.lastBaseUpdate = s));
    }
    if (n !== null) {
      var A = l.baseState;
      o = 0, z = h = s = null, r = n;
      do {
        var x = r.lane & -536870913, v = x !== r.lane;
        if (v ? (se & x) === x : (i & x) === x) {
          x !== 0 && x === di && (Lo = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          e: {
            var R = e, K = r;
            x = t;
            var Ee = a;
            switch (K.tag) {
              case 1:
                if (R = K.payload, typeof R == "function") {
                  A = R.call(Ee, A, x);
                  break e;
                }
                A = R;
                break e;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = K.payload, x = typeof R == "function" ? R.call(Ee, A, x) : R, x == null) break e;
                A = H({}, A, x);
                break e;
              case 2:
                sa = !0;
            }
          }
          x = r.callback, x !== null && (e.flags |= 64, v && (e.flags |= 8192), v = l.callbacks, v === null ? l.callbacks = [x] : v.push(x));
        } else
          v = {
            lane: x,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, z === null ? (h = z = v, s = A) : z = z.next = v, o |= x;
        if (r = r.next, r === null) {
          if (r = l.shared.pending, r === null)
            break;
          v = r, r = v.next, v.next = null, l.lastBaseUpdate = v, l.shared.pending = null;
        }
      } while (!0);
      z === null && (s = A), l.baseState = s, l.firstBaseUpdate = h, l.lastBaseUpdate = z, n === null && (l.shared.lanes = 0), ha |= o, e.lanes = o, e.memoizedState = A;
    }
  }
  function qc(e, t) {
    if (typeof e != "function")
      throw Error(u(191, e));
    e.call(t);
  }
  function Zc(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        qc(a[e], t);
  }
  var bi = f(null), en = f(0);
  function Yc(e, t) {
    e = Pt, j(en, e), j(bi, t), Pt = e | t.baseLanes;
  }
  function Vo() {
    j(en, Pt), j(bi, bi.current);
  }
  function Go() {
    Pt = en.current, T(bi), T(en);
  }
  var dt = f(null), At = null;
  function pa(e) {
    var t = e.alternate;
    j(Re, Re.current & 1), j(dt, e), At === null && (t === null || bi.current !== null || t.memoizedState !== null) && (At = e);
  }
  function Xo(e) {
    j(Re, Re.current), j(dt, e), At === null && (At = e);
  }
  function Qc(e) {
    e.tag === 22 ? (j(Re, Re.current), j(dt, e), At === null && (At = e)) : ma();
  }
  function ma() {
    j(Re, Re.current), j(dt, dt.current);
  }
  function pt(e) {
    T(dt), At === e && (At = null), T(Re);
  }
  var Re = f(0);
  function tn(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Ir(a) || Pr(a)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Gt = 0, ae = null, Ae = null, qe = null, an = !1, hi = !1, La = !1, ln = 0, tl = 0, xi = null, ep = 0;
  function je() {
    throw Error(u(321));
  }
  function Jo(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!st(e[a], t[a])) return !1;
    return !0;
  }
  function Ko(e, t, a, i, l, n) {
    return Gt = n, ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = e === null || e.memoizedState === null ? As : cr, La = !1, n = a(i, l), La = !1, hi && (n = Vc(
      t,
      a,
      i,
      l
    )), Lc(e), n;
  }
  function Lc(e) {
    _.H = ll;
    var t = Ae !== null && Ae.next !== null;
    if (Gt = 0, qe = Ae = ae = null, an = !1, tl = 0, xi = null, t) throw Error(u(300));
    e === null || Ze || (e = e.dependencies, e !== null && Jl(e) && (Ze = !0));
  }
  function Vc(e, t, a, i) {
    ae = e;
    var l = 0;
    do {
      if (hi && (xi = null), tl = 0, hi = !1, 25 <= l) throw Error(u(301));
      if (l += 1, qe = Ae = null, e.updateQueue != null) {
        var n = e.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      _.H = Ts, n = t(a, i);
    } while (hi);
    return n;
  }
  function tp() {
    var e = _.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? al(t) : t, e = e.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== e && (ae.flags |= 1024), t;
  }
  function Wo() {
    var e = ln !== 0;
    return ln = 0, e;
  }
  function $o(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Fo(e) {
    if (an) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      an = !1;
    }
    Gt = 0, qe = Ae = ae = null, hi = !1, tl = ln = 0, xi = null;
  }
  function Pe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return qe === null ? ae.memoizedState = qe = e : qe = qe.next = e, qe;
  }
  function ke() {
    if (Ae === null) {
      var e = ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ae.next;
    var t = qe === null ? ae.memoizedState : qe.next;
    if (t !== null)
      qe = t, Ae = e;
    else {
      if (e === null)
        throw ae.alternate === null ? Error(u(467)) : Error(u(310));
      Ae = e, e = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, qe === null ? ae.memoizedState = qe = e : qe = qe.next = e;
    }
    return qe;
  }
  function nn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function al(e) {
    var t = tl;
    return tl += 1, xi === null && (xi = []), e = jc(xi, e, t), t = ae, (qe === null ? t.memoizedState : qe.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? As : cr), e;
  }
  function on(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return al(e);
      if (e.$$typeof === ne) return Ke(e);
    }
    throw Error(u(438, String(e)));
  }
  function Io(e) {
    var t = null, a = ae.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var i = ae.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(l) {
          return l.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = nn(), ae.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
        a[i] = Mt;
    return t.index++, a;
  }
  function Xt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function rn(e) {
    var t = ke();
    return Po(t, Ae, e);
  }
  function Po(e, t, a) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = a;
    var l = e.baseQueue, n = i.pending;
    if (n !== null) {
      if (l !== null) {
        var o = l.next;
        l.next = n.next, n.next = o;
      }
      t.baseQueue = l = n, i.pending = null;
    }
    if (n = e.baseState, l === null) e.memoizedState = n;
    else {
      t = l.next;
      var r = o = null, s = null, h = t, z = !1;
      do {
        var A = h.lane & -536870913;
        if (A !== h.lane ? (se & A) === A : (Gt & A) === A) {
          var x = h.revertLane;
          if (x === 0)
            s !== null && (s = s.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), A === di && (z = !0);
          else if ((Gt & x) === x) {
            h = h.next, x === di && (z = !0);
            continue;
          } else
            A = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, s === null ? (r = s = A, o = n) : s = s.next = A, ae.lanes |= x, ha |= x;
          A = h.action, La && a(n, A), n = h.hasEagerState ? h.eagerState : a(n, A);
        } else
          x = {
            lane: A,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, s === null ? (r = s = x, o = n) : s = s.next = x, ae.lanes |= A, ha |= A;
        h = h.next;
      } while (h !== null && h !== t);
      if (s === null ? o = n : s.next = r, !st(n, e.memoizedState) && (Ze = !0, z && (a = pi, a !== null)))
        throw a;
      e.memoizedState = n, e.baseState = o, e.baseQueue = s, i.lastRenderedState = n;
    }
    return l === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function er(e) {
    var t = ke(), a = t.queue;
    if (a === null) throw Error(u(311));
    a.lastRenderedReducer = e;
    var i = a.dispatch, l = a.pending, n = t.memoizedState;
    if (l !== null) {
      a.pending = null;
      var o = l = l.next;
      do
        n = e(n, o.action), o = o.next;
      while (o !== l);
      st(n, t.memoizedState) || (Ze = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
    }
    return [n, i];
  }
  function Gc(e, t, a) {
    var i = ae, l = ke(), n = pe;
    if (n) {
      if (a === void 0) throw Error(u(407));
      a = a();
    } else a = t();
    var o = !st(
      (Ae || l).memoizedState,
      a
    );
    if (o && (l.memoizedState = a, Ze = !0), l = l.queue, ir(Kc.bind(null, i, l, e), [
      e
    ]), l.getSnapshot !== t || o || qe !== null && qe.memoizedState.tag & 1) {
      if (i.flags |= 2048, vi(
        9,
        { destroy: void 0 },
        Jc.bind(
          null,
          i,
          l,
          a,
          t
        ),
        null
      ), Me === null) throw Error(u(349));
      n || (Gt & 127) !== 0 || Xc(i, t, a);
    }
    return a;
  }
  function Xc(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = ae.updateQueue, t === null ? (t = nn(), ae.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function Jc(e, t, a, i) {
    t.value = a, t.getSnapshot = i, Wc(t) && $c(e);
  }
  function Kc(e, t, a) {
    return a(function() {
      Wc(t) && $c(e);
    });
  }
  function Wc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !st(e, a);
    } catch {
      return !0;
    }
  }
  function $c(e) {
    var t = ja(e, 2);
    t !== null && ot(t, e, 2);
  }
  function tr(e) {
    var t = Pe();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), La) {
        ia(!0);
        try {
          a();
        } finally {
          ia(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xt,
      lastRenderedState: e
    }, t;
  }
  function Fc(e, t, a, i) {
    return e.baseState = a, Po(
      e,
      Ae,
      typeof i == "function" ? i : Xt
    );
  }
  function ap(e, t, a, i, l) {
    if (sn(e)) throw Error(u(485));
    if (e = t.action, e !== null) {
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
      _.T !== null ? a(!0) : n.isTransition = !1, i(n), a = t.pending, a === null ? (n.next = t.pending = n, Ic(t, n)) : (n.next = a.next, t.pending = a.next = n);
    }
  }
  function Ic(e, t) {
    var a = t.action, i = t.payload, l = e.state;
    if (t.isTransition) {
      var n = _.T, o = {};
      _.T = o;
      try {
        var r = a(l, i), s = _.S;
        s !== null && s(o, r), Pc(e, t, r);
      } catch (h) {
        ar(e, t, h);
      } finally {
        n !== null && o.types !== null && (n.types = o.types), _.T = n;
      }
    } else
      try {
        n = a(l, i), Pc(e, t, n);
      } catch (h) {
        ar(e, t, h);
      }
  }
  function Pc(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(i) {
        es(e, t, i);
      },
      function(i) {
        return ar(e, t, i);
      }
    ) : es(e, t, a);
  }
  function es(e, t, a) {
    t.status = "fulfilled", t.value = a, ts(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Ic(e, a)));
  }
  function ar(e, t, a) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = a, ts(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function ts(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function as(e, t) {
    return t;
  }
  function is(e, t) {
    if (pe) {
      var a = Me.formState;
      if (a !== null) {
        e: {
          var i = ae;
          if (pe) {
            if (Oe) {
              t: {
                for (var l = Oe, n = St; l.nodeType !== 8; ) {
                  if (!n) {
                    l = null;
                    break t;
                  }
                  if (l = Tt(
                    l.nextSibling
                  ), l === null) {
                    l = null;
                    break t;
                  }
                }
                n = l.data, l = n === "F!" || n === "F" ? l : null;
              }
              if (l) {
                Oe = Tt(
                  l.nextSibling
                ), i = l.data === "F!";
                break e;
              }
            }
            ua(i);
          }
          i = !1;
        }
        i && (t = a[0]);
      }
    }
    return a = Pe(), a.memoizedState = a.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: as,
      lastRenderedState: t
    }, a.queue = i, a = ws.bind(
      null,
      ae,
      i
    ), i.dispatch = a, i = tr(!1), n = ur.bind(
      null,
      ae,
      !1,
      i.queue
    ), i = Pe(), l = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = l, a = ap.bind(
      null,
      ae,
      l,
      n,
      a
    ), l.dispatch = a, i.memoizedState = e, [t, a, !1];
  }
  function ls(e) {
    var t = ke();
    return ns(t, Ae, e);
  }
  function ns(e, t, a) {
    if (t = Po(
      e,
      t,
      as
    )[0], e = rn(Xt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = al(t);
      } catch (o) {
        throw o === mi ? $l : o;
      }
    else i = t;
    t = ke();
    var l = t.queue, n = l.dispatch;
    return a !== t.memoizedState && (ae.flags |= 2048, vi(
      9,
      { destroy: void 0 },
      ip.bind(null, l, a),
      null
    )), [i, n, e];
  }
  function ip(e, t) {
    e.action = t;
  }
  function os(e) {
    var t = ke(), a = Ae;
    if (a !== null)
      return ns(t, a, e);
    ke(), t = t.memoizedState, a = ke();
    var i = a.queue.dispatch;
    return a.memoizedState = e, [t, i, !1];
  }
  function vi(e, t, a, i) {
    return e = { tag: e, create: a, deps: i, inst: t, next: null }, t = ae.updateQueue, t === null && (t = nn(), ae.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
  }
  function rs() {
    return ke().memoizedState;
  }
  function un(e, t, a, i) {
    var l = Pe();
    ae.flags |= e, l.memoizedState = vi(
      1 | t,
      { destroy: void 0 },
      a,
      i === void 0 ? null : i
    );
  }
  function cn(e, t, a, i) {
    var l = ke();
    i = i === void 0 ? null : i;
    var n = l.memoizedState.inst;
    Ae !== null && i !== null && Jo(i, Ae.memoizedState.deps) ? l.memoizedState = vi(t, n, a, i) : (ae.flags |= e, l.memoizedState = vi(
      1 | t,
      n,
      a,
      i
    ));
  }
  function us(e, t) {
    un(8390656, 8, e, t);
  }
  function ir(e, t) {
    cn(2048, 8, e, t);
  }
  function lp(e) {
    ae.flags |= 4;
    var t = ae.updateQueue;
    if (t === null)
      t = nn(), ae.updateQueue = t, t.events = [e];
    else {
      var a = t.events;
      a === null ? t.events = [e] : a.push(e);
    }
  }
  function cs(e) {
    var t = ke().memoizedState;
    return lp({ ref: t, nextImpl: e }), function() {
      if ((he & 2) !== 0) throw Error(u(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ss(e, t) {
    return cn(4, 2, e, t);
  }
  function fs(e, t) {
    return cn(4, 4, e, t);
  }
  function ds(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function ps(e, t, a) {
    a = a != null ? a.concat([e]) : null, cn(4, 4, ds.bind(null, t, e), a);
  }
  function lr() {
  }
  function ms(e, t) {
    var a = ke();
    t = t === void 0 ? null : t;
    var i = a.memoizedState;
    return t !== null && Jo(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
  }
  function gs(e, t) {
    var a = ke();
    t = t === void 0 ? null : t;
    var i = a.memoizedState;
    if (t !== null && Jo(t, i[1]))
      return i[0];
    if (i = e(), La) {
      ia(!0);
      try {
        e();
      } finally {
        ia(!1);
      }
    }
    return a.memoizedState = [i, t], i;
  }
  function nr(e, t, a) {
    return a === void 0 || (Gt & 1073741824) !== 0 && (se & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = a, e = hf(), ae.lanes |= e, ha |= e, a);
  }
  function bs(e, t, a, i) {
    return st(a, t) ? a : bi.current !== null ? (e = nr(e, a, i), st(e, t) || (Ze = !0), e) : (Gt & 42) === 0 || (Gt & 1073741824) !== 0 && (se & 261930) === 0 ? (Ze = !0, e.memoizedState = a) : (e = hf(), ae.lanes |= e, ha |= e, t);
  }
  function hs(e, t, a, i, l) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var o = _.T, r = {};
    _.T = r, ur(e, !1, t, a);
    try {
      var s = l(), h = _.S;
      if (h !== null && h(r, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var z = P0(
          s,
          i
        );
        il(
          e,
          t,
          z,
          bt(e)
        );
      } else
        il(
          e,
          t,
          i,
          bt(e)
        );
    } catch (A) {
      il(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: A },
        bt()
      );
    } finally {
      O.p = n, o !== null && r.types !== null && (o.types = r.types), _.T = o;
    }
  }
  function np() {
  }
  function or(e, t, a, i) {
    if (e.tag !== 5) throw Error(u(476));
    var l = xs(e).queue;
    hs(
      e,
      l,
      t,
      Y,
      a === null ? np : function() {
        return vs(e), a(i);
      }
    );
  }
  function xs(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xt,
        lastRenderedState: Y
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
        lastRenderedReducer: Xt,
        lastRenderedState: a
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function vs(e) {
    var t = xs(e);
    t.next === null && (t = e.alternate.memoizedState), il(
      e,
      t.next.queue,
      {},
      bt()
    );
  }
  function rr() {
    return Ke(yl);
  }
  function ys() {
    return ke().memoizedState;
  }
  function _s() {
    return ke().memoizedState;
  }
  function op(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = bt();
          e = fa(a);
          var i = da(t, e, a);
          i !== null && (ot(i, t, a), Ii(i, t, a)), t = { cache: Ro() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function rp(e, t, a) {
    var i = bt();
    a = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, sn(e) ? zs(t, a) : (a = Ao(e, t, a, i), a !== null && (ot(a, e, i), Ss(a, t, i)));
  }
  function ws(e, t, a) {
    var i = bt();
    il(e, t, a, i);
  }
  function il(e, t, a, i) {
    var l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (sn(e)) zs(t, l);
    else {
      var n = e.alternate;
      if (e.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var o = t.lastRenderedState, r = n(o, a);
          if (l.hasEagerState = !0, l.eagerState = r, st(r, o))
            return Ll(e, t, l, 0), Me === null && Ql(), !1;
        } catch {
        } finally {
        }
      if (a = Ao(e, t, l, i), a !== null)
        return ot(a, e, i), Ss(a, t, i), !0;
    }
    return !1;
  }
  function ur(e, t, a, i) {
    if (i = {
      lane: 2,
      revertLane: Zr(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, sn(e)) {
      if (t) throw Error(u(479));
    } else
      t = Ao(
        e,
        a,
        i,
        2
      ), t !== null && ot(t, e, 2);
  }
  function sn(e) {
    var t = e.alternate;
    return e === ae || t !== null && t === ae;
  }
  function zs(e, t) {
    hi = an = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function Ss(e, t, a) {
    if ((a & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, a |= i, t.lanes = a, Cu(e, a);
    }
  }
  var ll = {
    readContext: Ke,
    use: on,
    useCallback: je,
    useContext: je,
    useEffect: je,
    useImperativeHandle: je,
    useLayoutEffect: je,
    useInsertionEffect: je,
    useMemo: je,
    useReducer: je,
    useRef: je,
    useState: je,
    useDebugValue: je,
    useDeferredValue: je,
    useTransition: je,
    useSyncExternalStore: je,
    useId: je,
    useHostTransitionStatus: je,
    useFormState: je,
    useActionState: je,
    useOptimistic: je,
    useMemoCache: je,
    useCacheRefresh: je
  };
  ll.useEffectEvent = je;
  var As = {
    readContext: Ke,
    use: on,
    useCallback: function(e, t) {
      return Pe().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ke,
    useEffect: us,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, un(
        4194308,
        4,
        ds.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return un(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      un(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = Pe();
      t = t === void 0 ? null : t;
      var i = e();
      if (La) {
        ia(!0);
        try {
          e();
        } finally {
          ia(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, a) {
      var i = Pe();
      if (a !== void 0) {
        var l = a(t);
        if (La) {
          ia(!0);
          try {
            a(t);
          } finally {
            ia(!1);
          }
        }
      } else l = t;
      return i.memoizedState = i.baseState = l, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: l
      }, i.queue = e, e = e.dispatch = rp.bind(
        null,
        ae,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = Pe();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = tr(e);
      var t = e.queue, a = ws.bind(null, ae, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: lr,
    useDeferredValue: function(e, t) {
      var a = Pe();
      return nr(a, e, t);
    },
    useTransition: function() {
      var e = tr(!1);
      return e = hs.bind(
        null,
        ae,
        e.queue,
        !0,
        !1
      ), Pe().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var i = ae, l = Pe();
      if (pe) {
        if (a === void 0)
          throw Error(u(407));
        a = a();
      } else {
        if (a = t(), Me === null)
          throw Error(u(349));
        (se & 127) !== 0 || Xc(i, t, a);
      }
      l.memoizedState = a;
      var n = { value: a, getSnapshot: t };
      return l.queue = n, us(Kc.bind(null, i, n, e), [
        e
      ]), i.flags |= 2048, vi(
        9,
        { destroy: void 0 },
        Jc.bind(
          null,
          i,
          n,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = Pe(), t = Me.identifierPrefix;
      if (pe) {
        var a = jt, i = Ut;
        a = (i & ~(1 << 32 - ct(i) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = ln++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = ep++, t = "_" + t + "r_" + a.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: rr,
    useFormState: is,
    useActionState: is,
    useOptimistic: function(e) {
      var t = Pe();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = ur.bind(
        null,
        ae,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Io,
    useCacheRefresh: function() {
      return Pe().memoizedState = op.bind(
        null,
        ae
      );
    },
    useEffectEvent: function(e) {
      var t = Pe(), a = { impl: e };
      return t.memoizedState = a, function() {
        if ((he & 2) !== 0)
          throw Error(u(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, cr = {
    readContext: Ke,
    use: on,
    useCallback: ms,
    useContext: Ke,
    useEffect: ir,
    useImperativeHandle: ps,
    useInsertionEffect: ss,
    useLayoutEffect: fs,
    useMemo: gs,
    useReducer: rn,
    useRef: rs,
    useState: function() {
      return rn(Xt);
    },
    useDebugValue: lr,
    useDeferredValue: function(e, t) {
      var a = ke();
      return bs(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = rn(Xt)[0], t = ke().memoizedState;
      return [
        typeof e == "boolean" ? e : al(e),
        t
      ];
    },
    useSyncExternalStore: Gc,
    useId: ys,
    useHostTransitionStatus: rr,
    useFormState: ls,
    useActionState: ls,
    useOptimistic: function(e, t) {
      var a = ke();
      return Fc(a, Ae, e, t);
    },
    useMemoCache: Io,
    useCacheRefresh: _s
  };
  cr.useEffectEvent = cs;
  var Ts = {
    readContext: Ke,
    use: on,
    useCallback: ms,
    useContext: Ke,
    useEffect: ir,
    useImperativeHandle: ps,
    useInsertionEffect: ss,
    useLayoutEffect: fs,
    useMemo: gs,
    useReducer: er,
    useRef: rs,
    useState: function() {
      return er(Xt);
    },
    useDebugValue: lr,
    useDeferredValue: function(e, t) {
      var a = ke();
      return Ae === null ? nr(a, e, t) : bs(
        a,
        Ae.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = er(Xt)[0], t = ke().memoizedState;
      return [
        typeof e == "boolean" ? e : al(e),
        t
      ];
    },
    useSyncExternalStore: Gc,
    useId: ys,
    useHostTransitionStatus: rr,
    useFormState: os,
    useActionState: os,
    useOptimistic: function(e, t) {
      var a = ke();
      return Ae !== null ? Fc(a, Ae, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Io,
    useCacheRefresh: _s
  };
  Ts.useEffectEvent = cs;
  function sr(e, t, a, i) {
    t = e.memoizedState, a = a(i, t), a = a == null ? t : H({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var fr = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var i = bt(), l = fa(i);
      l.payload = t, a != null && (l.callback = a), t = da(e, l, i), t !== null && (ot(t, e, i), Ii(t, e, i));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var i = bt(), l = fa(i);
      l.tag = 1, l.payload = t, a != null && (l.callback = a), t = da(e, l, i), t !== null && (ot(t, e, i), Ii(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = bt(), i = fa(a);
      i.tag = 2, t != null && (i.callback = t), t = da(e, i, a), t !== null && (ot(t, e, a), Ii(t, e, a));
    }
  };
  function Es(e, t, a, i, l, n, o) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, n, o) : t.prototype && t.prototype.isPureReactComponent ? !Vi(a, i) || !Vi(l, n) : !0;
  }
  function Ms(e, t, a, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== e && fr.enqueueReplaceState(t, t.state, null);
  }
  function Va(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var i in t)
        i !== "ref" && (a[i] = t[i]);
    }
    if (e = e.defaultProps) {
      a === t && (a = H({}, a));
      for (var l in e)
        a[l] === void 0 && (a[l] = e[l]);
    }
    return a;
  }
  function Cs(e) {
    Yl(e);
  }
  function Os(e) {
    console.error(e);
  }
  function Ns(e) {
    Yl(e);
  }
  function fn(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Ds(e, t, a) {
    try {
      var i = e.onCaughtError;
      i(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function dr(e, t, a) {
    return a = fa(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      fn(e, t);
    }, a;
  }
  function Us(e) {
    return e = fa(e), e.tag = 3, e;
  }
  function js(e, t, a, i) {
    var l = a.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var n = i.value;
      e.payload = function() {
        return l(n);
      }, e.callback = function() {
        Ds(t, a, i);
      };
    }
    var o = a.stateNode;
    o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
      Ds(t, a, i), typeof l != "function" && (xa === null ? xa = /* @__PURE__ */ new Set([this]) : xa.add(this));
      var r = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function up(e, t, a, i, l) {
    if (a.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = a.alternate, t !== null && fi(
        t,
        a,
        l,
        !0
      ), a = dt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return At === null ? zn() : a.alternate === null && He === 0 && (He = 3), a.flags &= -257, a.flags |= 65536, a.lanes = l, i === Fl ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), kr(e, i, l)), !1;
          case 22:
            return a.flags |= 65536, i === Fl ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), kr(e, i, l)), !1;
        }
        throw Error(u(435, a.tag));
      }
      return kr(e, i, l), zn(), !1;
    }
    if (pe)
      return t = dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, i !== No && (e = Error(u(422), { cause: i }), Ji(_t(e, a)))) : (i !== No && (t = Error(u(423), {
        cause: i
      }), Ji(
        _t(t, a)
      )), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, i = _t(i, a), l = dr(
        e.stateNode,
        i,
        l
      ), Qo(e, l), He !== 4 && (He = 2)), !1;
    var n = Error(u(520), { cause: i });
    if (n = _t(n, a), dl === null ? dl = [n] : dl.push(n), He !== 4 && (He = 2), t === null) return !0;
    i = _t(i, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = l & -l, a.lanes |= e, e = dr(a.stateNode, i, e), Qo(a, e), !1;
        case 1:
          if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (xa === null || !xa.has(n))))
            return a.flags |= 65536, l &= -l, a.lanes |= l, l = Us(l), js(
              l,
              e,
              a,
              i
            ), Qo(a, l), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var pr = Error(u(461)), Ze = !1;
  function We(e, t, a, i) {
    t.child = e === null ? Bc(t, null, a, i) : Qa(
      t,
      e.child,
      a,
      i
    );
  }
  function Hs(e, t, a, i, l) {
    a = a.render;
    var n = t.ref;
    if ("ref" in i) {
      var o = {};
      for (var r in i)
        r !== "ref" && (o[r] = i[r]);
    } else o = i;
    return Ba(t), i = Ko(
      e,
      t,
      a,
      o,
      n,
      l
    ), r = Wo(), e !== null && !Ze ? ($o(e, t, l), Jt(e, t, l)) : (pe && r && Co(t), t.flags |= 1, We(e, t, i, l), t.child);
  }
  function Rs(e, t, a, i, l) {
    if (e === null) {
      var n = a.type;
      return typeof n == "function" && !To(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, ks(
        e,
        t,
        n,
        i,
        l
      )) : (e = Gl(
        a.type,
        null,
        i,
        t,
        t.mode,
        l
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (n = e.child, !_r(e, l)) {
      var o = n.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Vi, a(o, i) && e.ref === t.ref)
        return Jt(e, t, l);
    }
    return t.flags |= 1, e = Yt(n, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function ks(e, t, a, i, l) {
    if (e !== null) {
      var n = e.memoizedProps;
      if (Vi(n, i) && e.ref === t.ref)
        if (Ze = !1, t.pendingProps = i = n, _r(e, l))
          (e.flags & 131072) !== 0 && (Ze = !0);
        else
          return t.lanes = e.lanes, Jt(e, t, l);
    }
    return mr(
      e,
      t,
      a,
      i,
      l
    );
  }
  function Bs(e, t, a, i) {
    var l = i.children, n = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | a : a, e !== null) {
          for (i = t.child = e.child, l = 0; i !== null; )
            l = l | i.lanes | i.childLanes, i = i.sibling;
          i = l & ~n;
        } else i = 0, t.child = null;
        return qs(
          e,
          t,
          n,
          a,
          i
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Wl(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Yc(t, n) : Vo(), Qc(t);
      else
        return i = t.lanes = 536870912, qs(
          e,
          t,
          n !== null ? n.baseLanes | a : a,
          a,
          i
        );
    } else
      n !== null ? (Wl(t, n.cachePool), Yc(t, n), ma(), t.memoizedState = null) : (e !== null && Wl(t, null), Vo(), ma());
    return We(e, t, l, a), t.child;
  }
  function nl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function qs(e, t, a, i, l) {
    var n = Bo();
    return n = n === null ? null : { parent: Be._currentValue, pool: n }, t.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, e !== null && Wl(t, null), Vo(), Qc(t), e !== null && fi(e, t, i, !0), t.childLanes = l, null;
  }
  function dn(e, t) {
    return t = mn(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Zs(e, t, a) {
    return Qa(t, e.child, null, a), e = dn(t, t.pendingProps), e.flags |= 2, pt(t), t.memoizedState = null, e;
  }
  function cp(e, t, a) {
    var i = t.pendingProps, l = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (pe) {
        if (i.mode === "hidden")
          return e = dn(t, i), t.lanes = 536870912, nl(null, e);
        if (Xo(t), (e = Oe) ? (e = Pf(
          e,
          St
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: oa !== null ? { id: Ut, overflow: jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = zc(e), a.return = t, t.child = a, Je = t, Oe = null)) : e = null, e === null) throw ua(t);
        return t.lanes = 536870912, null;
      }
      return dn(t, i);
    }
    var n = e.memoizedState;
    if (n !== null) {
      var o = n.dehydrated;
      if (Xo(t), l)
        if (t.flags & 256)
          t.flags &= -257, t = Zs(
            e,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(u(558));
      else if (Ze || fi(e, t, a, !1), l = (a & e.childLanes) !== 0, Ze || l) {
        if (i = Me, i !== null && (o = Ou(i, a), o !== 0 && o !== n.retryLane))
          throw n.retryLane = o, ja(e, o), ot(i, e, o), pr;
        zn(), t = Zs(
          e,
          t,
          a
        );
      } else
        e = n.treeContext, Oe = Tt(o.nextSibling), Je = t, pe = !0, ra = null, St = !1, e !== null && Tc(t, e), t = dn(t, i), t.flags |= 4096;
      return t;
    }
    return e = Yt(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function pn(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(u(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function mr(e, t, a, i, l) {
    return Ba(t), a = Ko(
      e,
      t,
      a,
      i,
      void 0,
      l
    ), i = Wo(), e !== null && !Ze ? ($o(e, t, l), Jt(e, t, l)) : (pe && i && Co(t), t.flags |= 1, We(e, t, a, l), t.child);
  }
  function Ys(e, t, a, i, l, n) {
    return Ba(t), t.updateQueue = null, a = Vc(
      t,
      i,
      a,
      l
    ), Lc(e), i = Wo(), e !== null && !Ze ? ($o(e, t, n), Jt(e, t, n)) : (pe && i && Co(t), t.flags |= 1, We(e, t, a, n), t.child);
  }
  function Qs(e, t, a, i, l) {
    if (Ba(t), t.stateNode === null) {
      var n = ri, o = a.contextType;
      typeof o == "object" && o !== null && (n = Ke(o)), n = new a(i, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = fr, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = i, n.state = t.memoizedState, n.refs = {}, Zo(t), o = a.contextType, n.context = typeof o == "object" && o !== null ? Ke(o) : ri, n.state = t.memoizedState, o = a.getDerivedStateFromProps, typeof o == "function" && (sr(
        t,
        a,
        o,
        i
      ), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (o = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), o !== n.state && fr.enqueueReplaceState(n, n.state, null), el(t, i, n, l), Pi(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      n = t.stateNode;
      var r = t.memoizedProps, s = Va(a, r);
      n.props = s;
      var h = n.context, z = a.contextType;
      o = ri, typeof z == "object" && z !== null && (o = Ke(z));
      var A = a.getDerivedStateFromProps;
      z = typeof A == "function" || typeof n.getSnapshotBeforeUpdate == "function", r = t.pendingProps !== r, z || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (r || h !== o) && Ms(
        t,
        n,
        i,
        o
      ), sa = !1;
      var x = t.memoizedState;
      n.state = x, el(t, i, n, l), Pi(), h = t.memoizedState, r || x !== h || sa ? (typeof A == "function" && (sr(
        t,
        a,
        A,
        i
      ), h = t.memoizedState), (s = sa || Es(
        t,
        a,
        s,
        i,
        x,
        h,
        o
      )) ? (z || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = h), n.props = i, n.state = h, n.context = o, i = s) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      n = t.stateNode, Yo(e, t), o = t.memoizedProps, z = Va(a, o), n.props = z, A = t.pendingProps, x = n.context, h = a.contextType, s = ri, typeof h == "object" && h !== null && (s = Ke(h)), r = a.getDerivedStateFromProps, (h = typeof r == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (o !== A || x !== s) && Ms(
        t,
        n,
        i,
        s
      ), sa = !1, x = t.memoizedState, n.state = x, el(t, i, n, l), Pi();
      var v = t.memoizedState;
      o !== A || x !== v || sa || e !== null && e.dependencies !== null && Jl(e.dependencies) ? (typeof r == "function" && (sr(
        t,
        a,
        r,
        i
      ), v = t.memoizedState), (z = sa || Es(
        t,
        a,
        z,
        i,
        x,
        v,
        s
      ) || e !== null && e.dependencies !== null && Jl(e.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(i, v, s), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        i,
        v,
        s
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || o === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = v), n.props = i, n.state = v, n.context = s, i = z) : (typeof n.componentDidUpdate != "function" || o === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return n = i, pn(e, t), i = (t.flags & 128) !== 0, n || i ? (n = t.stateNode, a = i && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, e !== null && i ? (t.child = Qa(
      t,
      e.child,
      null,
      l
    ), t.child = Qa(
      t,
      null,
      a,
      l
    )) : We(e, t, a, l), t.memoizedState = n.state, e = t.child) : e = Jt(
      e,
      t,
      l
    ), e;
  }
  function Ls(e, t, a, i) {
    return Ra(), t.flags |= 256, We(e, t, a, i), t.child;
  }
  var gr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function br(e) {
    return { baseLanes: e, cachePool: Dc() };
  }
  function hr(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= gt), e;
  }
  function Vs(e, t, a) {
    var i = t.pendingProps, l = !1, n = (t.flags & 128) !== 0, o;
    if ((o = n) || (o = e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0), o && (l = !0, t.flags &= -129), o = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (pe) {
        if (l ? pa(t) : ma(), (e = Oe) ? (e = Pf(
          e,
          St
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: oa !== null ? { id: Ut, overflow: jt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = zc(e), a.return = t, t.child = a, Je = t, Oe = null)) : e = null, e === null) throw ua(t);
        return Pr(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var r = i.children;
      return i = i.fallback, l ? (ma(), l = t.mode, r = mn(
        { mode: "hidden", children: r },
        l
      ), i = Ha(
        i,
        l,
        a,
        null
      ), r.return = t, i.return = t, r.sibling = i, t.child = r, i = t.child, i.memoizedState = br(a), i.childLanes = hr(
        e,
        o,
        a
      ), t.memoizedState = gr, nl(null, i)) : (pa(t), xr(t, r));
    }
    var s = e.memoizedState;
    if (s !== null && (r = s.dehydrated, r !== null)) {
      if (n)
        t.flags & 256 ? (pa(t), t.flags &= -257, t = vr(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (ma(), t.child = e.child, t.flags |= 128, t = null) : (ma(), r = i.fallback, l = t.mode, i = mn(
          { mode: "visible", children: i.children },
          l
        ), r = Ha(
          r,
          l,
          a,
          null
        ), r.flags |= 2, i.return = t, r.return = t, i.sibling = r, t.child = i, Qa(
          t,
          e.child,
          null,
          a
        ), i = t.child, i.memoizedState = br(a), i.childLanes = hr(
          e,
          o,
          a
        ), t.memoizedState = gr, t = nl(null, i));
      else if (pa(t), Pr(r)) {
        if (o = r.nextSibling && r.nextSibling.dataset, o) var h = o.dgst;
        o = h, i = Error(u(419)), i.stack = "", i.digest = o, Ji({ value: i, source: null, stack: null }), t = vr(
          e,
          t,
          a
        );
      } else if (Ze || fi(e, t, a, !1), o = (a & e.childLanes) !== 0, Ze || o) {
        if (o = Me, o !== null && (i = Ou(o, a), i !== 0 && i !== s.retryLane))
          throw s.retryLane = i, ja(e, i), ot(o, e, i), pr;
        Ir(r) || zn(), t = vr(
          e,
          t,
          a
        );
      } else
        Ir(r) ? (t.flags |= 192, t.child = e.child, t = null) : (e = s.treeContext, Oe = Tt(
          r.nextSibling
        ), Je = t, pe = !0, ra = null, St = !1, e !== null && Tc(t, e), t = xr(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return l ? (ma(), r = i.fallback, l = t.mode, s = e.child, h = s.sibling, i = Yt(s, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = s.subtreeFlags & 65011712, h !== null ? r = Yt(
      h,
      r
    ) : (r = Ha(
      r,
      l,
      a,
      null
    ), r.flags |= 2), r.return = t, i.return = t, i.sibling = r, t.child = i, nl(null, i), i = t.child, r = e.child.memoizedState, r === null ? r = br(a) : (l = r.cachePool, l !== null ? (s = Be._currentValue, l = l.parent !== s ? { parent: s, pool: s } : l) : l = Dc(), r = {
      baseLanes: r.baseLanes | a,
      cachePool: l
    }), i.memoizedState = r, i.childLanes = hr(
      e,
      o,
      a
    ), t.memoizedState = gr, nl(e.child, i)) : (pa(t), a = e.child, e = a.sibling, a = Yt(a, {
      mode: "visible",
      children: i.children
    }), a.return = t, a.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function xr(e, t) {
    return t = mn(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function mn(e, t) {
    return e = ft(22, e, null, t), e.lanes = 0, e;
  }
  function vr(e, t, a) {
    return Qa(t, e.child, null, a), e = xr(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Gs(e, t, a) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), jo(e.return, t, a);
  }
  function yr(e, t, a, i, l, n) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: a,
      tailMode: l,
      treeForkCount: n
    } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = a, o.tailMode = l, o.treeForkCount = n);
  }
  function Xs(e, t, a) {
    var i = t.pendingProps, l = i.revealOrder, n = i.tail;
    i = i.children;
    var o = Re.current, r = (o & 2) !== 0;
    if (r ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, j(Re, o), We(e, t, i, a), i = pe ? Xi : 0, !r && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Gs(e, a, t);
        else if (e.tag === 19)
          Gs(e, a, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (l) {
      case "forwards":
        for (a = t.child, l = null; a !== null; )
          e = a.alternate, e !== null && tn(e) === null && (l = a), a = a.sibling;
        a = l, a === null ? (l = t.child, t.child = null) : (l = a.sibling, a.sibling = null), yr(
          t,
          !1,
          l,
          a,
          n,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && tn(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = a, a = l, l = e;
        }
        yr(
          t,
          !0,
          a,
          null,
          n,
          i
        );
        break;
      case "together":
        yr(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Jt(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), ha |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (fi(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(u(153));
    if (t.child !== null) {
      for (e = t.child, a = Yt(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Yt(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function _r(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Jl(e)));
  }
  function sp(e, t, a) {
    switch (t.tag) {
      case 3:
        Ce(t, t.stateNode.containerInfo), ca(t, Be, e.memoizedState.cache), Ra();
        break;
      case 27:
      case 5:
        kt(t);
        break;
      case 4:
        Ce(t, t.stateNode.containerInfo);
        break;
      case 10:
        ca(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Xo(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (pa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Vs(e, t, a) : (pa(t), e = Jt(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        pa(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (i = (a & t.childLanes) !== 0, i || (fi(
          e,
          t,
          a,
          !1
        ), i = (a & t.childLanes) !== 0), l) {
          if (i)
            return Xs(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), j(Re, Re.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, Bs(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ca(t, Be, e.memoizedState.cache);
    }
    return Jt(e, t, a);
  }
  function Js(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ze = !0;
      else {
        if (!_r(e, a) && (t.flags & 128) === 0)
          return Ze = !1, sp(
            e,
            t,
            a
          );
        Ze = (e.flags & 131072) !== 0;
      }
    else
      Ze = !1, pe && (t.flags & 1048576) !== 0 && Ac(t, Xi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Za(t.elementType), t.type = e, typeof e == "function")
            To(e) ? (i = Va(e, i), t.tag = 1, t = Qs(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, t = mr(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === G) {
                t.tag = 11, t = Hs(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (l === $) {
                t.tag = 14, t = Rs(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = q(e) || e, Error(u(306, t, ""));
          }
        }
        return t;
      case 0:
        return mr(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return i = t.type, l = Va(
          i,
          t.pendingProps
        ), Qs(
          e,
          t,
          i,
          l,
          a
        );
      case 3:
        e: {
          if (Ce(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(u(387));
          i = t.pendingProps;
          var n = t.memoizedState;
          l = n.element, Yo(e, t), el(t, i, null, a);
          var o = t.memoizedState;
          if (i = o.cache, ca(t, Be, i), i !== n.cache && Ho(
            t,
            [Be],
            a,
            !0
          ), Pi(), i = o.element, n.isDehydrated)
            if (n = {
              element: i,
              isDehydrated: !1,
              cache: o.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Ls(
                e,
                t,
                i,
                a
              );
              break e;
            } else if (i !== l) {
              l = _t(
                Error(u(424)),
                t
              ), Ji(l), t = Ls(
                e,
                t,
                i,
                a
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Oe = Tt(e.firstChild), Je = t, pe = !0, ra = null, St = !0, a = Bc(
                t,
                null,
                i,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (Ra(), i === l) {
              t = Jt(
                e,
                t,
                a
              );
              break e;
            }
            We(e, t, i, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return pn(e, t), e === null ? (a = nd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : pe || (a = t.type, e = t.pendingProps, i = On(
          F.current
        ).createElement(a), i[Xe] = t, i[et] = e, $e(i, a, e), Ve(i), t.stateNode = i) : t.memoizedState = nd(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return kt(t), e === null && pe && (i = t.stateNode = ad(
          t.type,
          t.pendingProps,
          F.current
        ), Je = t, St = !0, l = Oe, wa(t.type) ? (eu = l, Oe = Tt(i.firstChild)) : Oe = l), We(
          e,
          t,
          t.pendingProps.children,
          a
        ), pn(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && pe && ((l = i = Oe) && (i = Zp(
          i,
          t.type,
          t.pendingProps,
          St
        ), i !== null ? (t.stateNode = i, Je = t, Oe = Tt(i.firstChild), St = !1, l = !0) : l = !1), l || ua(t)), kt(t), l = t.type, n = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = n.children, Wr(l, n) ? i = null : o !== null && Wr(l, o) && (t.flags |= 32), t.memoizedState !== null && (l = Ko(
          e,
          t,
          tp,
          null,
          null,
          a
        ), yl._currentValue = l), pn(e, t), We(e, t, i, a), t.child;
      case 6:
        return e === null && pe && ((e = a = Oe) && (a = Yp(
          a,
          t.pendingProps,
          St
        ), a !== null ? (t.stateNode = a, Je = t, Oe = null, e = !0) : e = !1), e || ua(t)), null;
      case 13:
        return Vs(e, t, a);
      case 4:
        return Ce(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Qa(
          t,
          null,
          i,
          a
        ) : We(e, t, i, a), t.child;
      case 11:
        return Hs(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return We(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return We(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return We(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return i = t.pendingProps, ca(t, t.type, i.value), We(e, t, i.children, a), t.child;
      case 9:
        return l = t.type._context, i = t.pendingProps.children, Ba(t), l = Ke(l), i = i(l), t.flags |= 1, We(e, t, i, a), t.child;
      case 14:
        return Rs(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return ks(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Xs(e, t, a);
      case 31:
        return cp(e, t, a);
      case 22:
        return Bs(
          e,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Ba(t), i = Ke(Be), e === null ? (l = Bo(), l === null && (l = Me, n = Ro(), l.pooledCache = n, n.refCount++, n !== null && (l.pooledCacheLanes |= a), l = n), t.memoizedState = { parent: i, cache: l }, Zo(t), ca(t, Be, l)) : ((e.lanes & a) !== 0 && (Yo(e, t), el(t, null, null, a), Pi()), l = e.memoizedState, n = t.memoizedState, l.parent !== i ? (l = { parent: i, cache: i }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), ca(t, Be, i)) : (i = n.cache, ca(t, Be, i), i !== l.cache && Ho(
          t,
          [Be],
          a,
          !0
        ))), We(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function Kt(e) {
    e.flags |= 4;
  }
  function wr(e, t, a, i, l) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (l & 335544128) === l)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (_f()) e.flags |= 8192;
        else
          throw Ya = Fl, qo;
    } else e.flags &= -16777217;
  }
  function Ks(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !sd(t))
      if (_f()) e.flags |= 8192;
      else
        throw Ya = Fl, qo;
  }
  function gn(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Eu() : 536870912, e.lanes |= t, zi |= t);
  }
  function ol(e, t) {
    if (!pe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var i = null; a !== null; )
            a.alternate !== null && (i = a), a = a.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
  }
  function Ne(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
    if (t)
      for (var l = e.child; l !== null; )
        a |= l.lanes | l.childLanes, i |= l.subtreeFlags & 65011712, i |= l.flags & 65011712, l.return = e, l = l.sibling;
    else
      for (l = e.child; l !== null; )
        a |= l.lanes | l.childLanes, i |= l.subtreeFlags, i |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= i, e.childLanes = a, t;
  }
  function fp(e, t, a) {
    var i = t.pendingProps;
    switch (Oo(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ne(t), null;
      case 1:
        return Ne(t), null;
      case 3:
        return a = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Vt(Be), ye(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (si(t) ? Kt(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Do())), Ne(t), null;
      case 26:
        var l = t.type, n = t.memoizedState;
        return e === null ? (Kt(t), n !== null ? (Ne(t), Ks(t, n)) : (Ne(t), wr(
          t,
          l,
          null,
          i,
          a
        ))) : n ? n !== e.memoizedState ? (Kt(t), Ne(t), Ks(t, n)) : (Ne(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Kt(t), Ne(t), wr(
          t,
          l,
          e,
          i,
          a
        )), null;
      case 27:
        if (Dt(t), a = F.current, l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Kt(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ne(t), null;
          }
          e = M.current, si(t) ? Ec(t) : (e = ad(l, i, a), t.stateNode = e, Kt(t));
        }
        return Ne(t), null;
      case 5:
        if (Dt(t), l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Kt(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(u(166));
            return Ne(t), null;
          }
          if (n = M.current, si(t))
            Ec(t);
          else {
            var o = On(
              F.current
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
            n[Xe] = t, n[et] = i;
            e: for (o = t.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6)
                n.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                o.child.return = o, o = o.child;
                continue;
              }
              if (o === t) break e;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === t)
                  break e;
                o = o.return;
              }
              o.sibling.return = o.return, o = o.sibling;
            }
            t.stateNode = n;
            e: switch ($e(n, l, i), l) {
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
            i && Kt(t);
          }
        }
        return Ne(t), wr(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Kt(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(u(166));
          if (e = F.current, si(t)) {
            if (e = t.stateNode, a = t.memoizedProps, i = null, l = Je, l !== null)
              switch (l.tag) {
                case 27:
                case 5:
                  i = l.memoizedProps;
              }
            e[Xe] = t, e = !!(e.nodeValue === a || i !== null && i.suppressHydrationWarning === !0 || Gf(e.nodeValue, a)), e || ua(t, !0);
          } else
            e = On(e).createTextNode(
              i
            ), e[Xe] = t, t.stateNode = e;
        }
        return Ne(t), null;
      case 31:
        if (a = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = si(t), a !== null) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(u(557));
              e[Xe] = t;
            } else
              Ra(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ne(t), e = !1;
          } else
            a = Do(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), e = !0;
          if (!e)
            return t.flags & 256 ? (pt(t), t) : (pt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(u(558));
        }
        return Ne(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (l = si(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(u(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(u(317));
              l[Xe] = t;
            } else
              Ra(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ne(t), l = !1;
          } else
            l = Do(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = !0;
          if (!l)
            return t.flags & 256 ? (pt(t), t) : (pt(t), null);
        }
        return pt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = i !== null, e = e !== null && e.memoizedState !== null, a && (i = t.child, l = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (l = i.alternate.memoizedState.cachePool.pool), n = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (n = i.memoizedState.cachePool.pool), n !== l && (i.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), gn(t, t.updateQueue), Ne(t), null);
      case 4:
        return ye(), e === null && Vr(t.stateNode.containerInfo), Ne(t), null;
      case 10:
        return Vt(t.type), Ne(t), null;
      case 19:
        if (T(Re), i = t.memoizedState, i === null) return Ne(t), null;
        if (l = (t.flags & 128) !== 0, n = i.rendering, n === null)
          if (l) ol(i, !1);
          else {
            if (He !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (n = tn(e), n !== null) {
                  for (t.flags |= 128, ol(i, !1), e = n.updateQueue, t.updateQueue = e, gn(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    wc(a, e), a = a.sibling;
                  return j(
                    Re,
                    Re.current & 1 | 2
                  ), pe && Qt(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && rt() > yn && (t.flags |= 128, l = !0, ol(i, !1), t.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = tn(n), e !== null) {
              if (t.flags |= 128, l = !0, e = e.updateQueue, t.updateQueue = e, gn(t, e), ol(i, !0), i.tail === null && i.tailMode === "hidden" && !n.alternate && !pe)
                return Ne(t), null;
            } else
              2 * rt() - i.renderingStartTime > yn && a !== 536870912 && (t.flags |= 128, l = !0, ol(i, !1), t.lanes = 4194304);
          i.isBackwards ? (n.sibling = t.child, t.child = n) : (e = i.last, e !== null ? e.sibling = n : t.child = n, i.last = n);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = rt(), e.sibling = null, a = Re.current, j(
          Re,
          l ? a & 1 | 2 : a & 1
        ), pe && Qt(t, i.treeForkCount), e) : (Ne(t), null);
      case 22:
      case 23:
        return pt(t), Go(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ne(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ne(t), a = t.updateQueue, a !== null && gn(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== a && (t.flags |= 2048), e !== null && T(qa), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Vt(Be), Ne(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function dp(e, t) {
    switch (Oo(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Vt(Be), ye(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Dt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (pt(t), t.alternate === null)
            throw Error(u(340));
          Ra();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (pt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(u(340));
          Ra();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return T(Re), null;
      case 4:
        return ye(), null;
      case 10:
        return Vt(t.type), null;
      case 22:
      case 23:
        return pt(t), Go(), e !== null && T(qa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Vt(Be), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ws(e, t) {
    switch (Oo(t), t.tag) {
      case 3:
        Vt(Be), ye();
        break;
      case 26:
      case 27:
      case 5:
        Dt(t);
        break;
      case 4:
        ye();
        break;
      case 31:
        t.memoizedState !== null && pt(t);
        break;
      case 13:
        pt(t);
        break;
      case 19:
        T(Re);
        break;
      case 10:
        Vt(t.type);
        break;
      case 22:
      case 23:
        pt(t), Go(), e !== null && T(qa);
        break;
      case 24:
        Vt(Be);
    }
  }
  function rl(e, t) {
    try {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var l = i.next;
        a = l;
        do {
          if ((a.tag & e) === e) {
            i = void 0;
            var n = a.create, o = a.inst;
            i = n(), o.destroy = i;
          }
          a = a.next;
        } while (a !== l);
      }
    } catch (r) {
      Se(t, t.return, r);
    }
  }
  function ga(e, t, a) {
    try {
      var i = t.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        i = n;
        do {
          if ((i.tag & e) === e) {
            var o = i.inst, r = o.destroy;
            if (r !== void 0) {
              o.destroy = void 0, l = t;
              var s = a, h = r;
              try {
                h();
              } catch (z) {
                Se(
                  l,
                  s,
                  z
                );
              }
            }
          }
          i = i.next;
        } while (i !== n);
      }
    } catch (z) {
      Se(t, t.return, z);
    }
  }
  function $s(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        Zc(t, a);
      } catch (i) {
        Se(e, e.return, i);
      }
    }
  }
  function Fs(e, t, a) {
    a.props = Va(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (i) {
      Se(e, t, i);
    }
  }
  function ul(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
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
        typeof a == "function" ? e.refCleanup = a(i) : a.current = i;
      }
    } catch (l) {
      Se(e, t, l);
    }
  }
  function Ht(e, t) {
    var a = e.ref, i = e.refCleanup;
    if (a !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (l) {
          Se(e, t, l);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (l) {
          Se(e, t, l);
        }
      else a.current = null;
  }
  function Is(e) {
    var t = e.type, a = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && i.focus();
          break e;
        case "img":
          a.src ? i.src = a.src : a.srcSet && (i.srcset = a.srcSet);
      }
    } catch (l) {
      Se(e, e.return, l);
    }
  }
  function zr(e, t, a) {
    try {
      var i = e.stateNode;
      jp(i, e.type, a, t), i[et] = t;
    } catch (l) {
      Se(e, e.return, l);
    }
  }
  function Ps(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && wa(e.type) || e.tag === 4;
  }
  function Sr(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ps(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && wa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Ar(e, t, a) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = qt));
    else if (i !== 4 && (i === 27 && wa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Ar(e, t, a), e = e.sibling; e !== null; )
        Ar(e, t, a), e = e.sibling;
  }
  function bn(e, t, a) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (i !== 4 && (i === 27 && wa(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (bn(e, t, a), e = e.sibling; e !== null; )
        bn(e, t, a), e = e.sibling;
  }
  function ef(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var i = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      $e(t, i, a), t[Xe] = e, t[et] = a;
    } catch (n) {
      Se(e, e.return, n);
    }
  }
  var Wt = !1, Ye = !1, Tr = !1, tf = typeof WeakSet == "function" ? WeakSet : Set, Ge = null;
  function pp(e, t) {
    if (e = e.containerInfo, Jr = kn, e = pc(e), vo(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var i = a.getSelection && a.getSelection();
          if (i && i.rangeCount !== 0) {
            a = i.anchorNode;
            var l = i.anchorOffset, n = i.focusNode;
            i = i.focusOffset;
            try {
              a.nodeType, n.nodeType;
            } catch {
              a = null;
              break e;
            }
            var o = 0, r = -1, s = -1, h = 0, z = 0, A = e, x = null;
            t: for (; ; ) {
              for (var v; A !== a || l !== 0 && A.nodeType !== 3 || (r = o + l), A !== n || i !== 0 && A.nodeType !== 3 || (s = o + i), A.nodeType === 3 && (o += A.nodeValue.length), (v = A.firstChild) !== null; )
                x = A, A = v;
              for (; ; ) {
                if (A === e) break t;
                if (x === a && ++h === l && (r = o), x === n && ++z === i && (s = o), (v = A.nextSibling) !== null) break;
                A = x, x = A.parentNode;
              }
              A = v;
            }
            a = r === -1 || s === -1 ? null : { start: r, end: s };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Kr = { focusedElem: e, selectionRange: a }, kn = !1, Ge = t; Ge !== null; )
      if (t = Ge, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Ge = e;
      else
        for (; Ge !== null; ) {
          switch (t = Ge, n = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (a = 0; a < e.length; a++)
                  l = e[a], l.ref.impl = l.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && n !== null) {
                e = void 0, a = t, l = n.memoizedProps, n = n.memoizedState, i = a.stateNode;
                try {
                  var R = Va(
                    a.type,
                    l
                  );
                  e = i.getSnapshotBeforeUpdate(
                    R,
                    n
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (K) {
                  Se(
                    a,
                    a.return,
                    K
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Fr(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Fr(e);
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
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ge = e;
            break;
          }
          Ge = t.return;
        }
  }
  function af(e, t, a) {
    var i = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Ft(e, a), i & 4 && rl(5, a);
        break;
      case 1:
        if (Ft(e, a), i & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (o) {
              Se(a, a.return, o);
            }
          else {
            var l = Va(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                l,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (o) {
              Se(
                a,
                a.return,
                o
              );
            }
          }
        i & 64 && $s(a), i & 512 && ul(a, a.return);
        break;
      case 3:
        if (Ft(e, a), i & 64 && (e = a.updateQueue, e !== null)) {
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
            Zc(e, t);
          } catch (o) {
            Se(a, a.return, o);
          }
        }
        break;
      case 27:
        t === null && i & 4 && ef(a);
      case 26:
      case 5:
        Ft(e, a), t === null && i & 4 && Is(a), i & 512 && ul(a, a.return);
        break;
      case 12:
        Ft(e, a);
        break;
      case 31:
        Ft(e, a), i & 4 && of(e, a);
        break;
      case 13:
        Ft(e, a), i & 4 && rf(e, a), i & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = wp.bind(
          null,
          a
        ), Qp(e, a))));
        break;
      case 22:
        if (i = a.memoizedState !== null || Wt, !i) {
          t = t !== null && t.memoizedState !== null || Ye, l = Wt;
          var n = Ye;
          Wt = i, (Ye = t) && !n ? It(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Ft(e, a), Wt = l, Ye = n;
        }
        break;
      case 30:
        break;
      default:
        Ft(e, a);
    }
  }
  function lf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, lf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && to(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var De = null, at = !1;
  function $t(e, t, a) {
    for (a = a.child; a !== null; )
      nf(e, t, a), a = a.sibling;
  }
  function nf(e, t, a) {
    if (ut && typeof ut.onCommitFiberUnmount == "function")
      try {
        ut.onCommitFiberUnmount(Di, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Ye || Ht(a, t), $t(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Ye || Ht(a, t);
        var i = De, l = at;
        wa(a.type) && (De = a.stateNode, at = !1), $t(
          e,
          t,
          a
        ), hl(a.stateNode), De = i, at = l;
        break;
      case 5:
        Ye || Ht(a, t);
      case 6:
        if (i = De, l = at, De = null, $t(
          e,
          t,
          a
        ), De = i, at = l, De !== null)
          if (at)
            try {
              (De.nodeType === 9 ? De.body : De.nodeName === "HTML" ? De.ownerDocument.body : De).removeChild(a.stateNode);
            } catch (n) {
              Se(
                a,
                t,
                n
              );
            }
          else
            try {
              De.removeChild(a.stateNode);
            } catch (n) {
              Se(
                a,
                t,
                n
              );
            }
        break;
      case 18:
        De !== null && (at ? (e = De, Ff(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Ni(e)) : Ff(De, a.stateNode));
        break;
      case 4:
        i = De, l = at, De = a.stateNode.containerInfo, at = !0, $t(
          e,
          t,
          a
        ), De = i, at = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ga(2, a, t), Ye || ga(4, a, t), $t(
          e,
          t,
          a
        );
        break;
      case 1:
        Ye || (Ht(a, t), i = a.stateNode, typeof i.componentWillUnmount == "function" && Fs(
          a,
          t,
          i
        )), $t(
          e,
          t,
          a
        );
        break;
      case 21:
        $t(
          e,
          t,
          a
        );
        break;
      case 22:
        Ye = (i = Ye) || a.memoizedState !== null, $t(
          e,
          t,
          a
        ), Ye = i;
        break;
      default:
        $t(
          e,
          t,
          a
        );
    }
  }
  function of(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ni(e);
      } catch (a) {
        Se(t, t.return, a);
      }
    }
  }
  function rf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ni(e);
      } catch (a) {
        Se(t, t.return, a);
      }
  }
  function mp(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new tf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new tf()), t;
      default:
        throw Error(u(435, e.tag));
    }
  }
  function hn(e, t) {
    var a = mp(e);
    t.forEach(function(i) {
      if (!a.has(i)) {
        a.add(i);
        var l = zp.bind(null, e, i);
        i.then(l, l);
      }
    });
  }
  function it(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var i = 0; i < a.length; i++) {
        var l = a[i], n = e, o = t, r = o;
        e: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (wa(r.type)) {
                De = r.stateNode, at = !1;
                break e;
              }
              break;
            case 5:
              De = r.stateNode, at = !1;
              break e;
            case 3:
            case 4:
              De = r.stateNode.containerInfo, at = !0;
              break e;
          }
          r = r.return;
        }
        if (De === null) throw Error(u(160));
        nf(n, o, l), De = null, at = !1, n = l.alternate, n !== null && (n.return = null), l.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        uf(t, e), t = t.sibling;
  }
  var Ot = null;
  function uf(e, t) {
    var a = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        it(t, e), lt(e), i & 4 && (ga(3, e, e.return), rl(3, e), ga(5, e, e.return));
        break;
      case 1:
        it(t, e), lt(e), i & 512 && (Ye || a === null || Ht(a, a.return)), i & 64 && Wt && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? i : a.concat(i))));
        break;
      case 26:
        var l = Ot;
        if (it(t, e), lt(e), i & 512 && (Ye || a === null || Ht(a, a.return)), i & 4) {
          var n = a !== null ? a.memoizedState : null;
          if (i = e.memoizedState, a === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, a = e.memoizedProps, l = l.ownerDocument || l;
                  t: switch (i) {
                    case "title":
                      n = l.getElementsByTagName("title")[0], (!n || n[Hi] || n[Xe] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = l.createElement(i), l.head.insertBefore(
                        n,
                        l.querySelector("head > title")
                      )), $e(n, i, a), n[Xe] = e, Ve(n), i = n;
                      break e;
                    case "link":
                      var o = ud(
                        "link",
                        "href",
                        l
                      ).get(i + (a.href || ""));
                      if (o) {
                        for (var r = 0; r < o.length; r++)
                          if (n = o[r], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            o.splice(r, 1);
                            break t;
                          }
                      }
                      n = l.createElement(i), $e(n, i, a), l.head.appendChild(n);
                      break;
                    case "meta":
                      if (o = ud(
                        "meta",
                        "content",
                        l
                      ).get(i + (a.content || ""))) {
                        for (r = 0; r < o.length; r++)
                          if (n = o[r], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            o.splice(r, 1);
                            break t;
                          }
                      }
                      n = l.createElement(i), $e(n, i, a), l.head.appendChild(n);
                      break;
                    default:
                      throw Error(u(468, i));
                  }
                  n[Xe] = e, Ve(n), i = n;
                }
                e.stateNode = i;
              } else
                cd(
                  l,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = rd(
                l,
                i,
                e.memoizedProps
              );
          else
            n !== i ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, i === null ? cd(
              l,
              e.type,
              e.stateNode
            ) : rd(
              l,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && zr(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        it(t, e), lt(e), i & 512 && (Ye || a === null || Ht(a, a.return)), a !== null && i & 4 && zr(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (it(t, e), lt(e), i & 512 && (Ye || a === null || Ht(a, a.return)), e.flags & 32) {
          l = e.stateNode;
          try {
            ei(l, "");
          } catch (R) {
            Se(e, e.return, R);
          }
        }
        i & 4 && e.stateNode != null && (l = e.memoizedProps, zr(
          e,
          l,
          a !== null ? a.memoizedProps : l
        )), i & 1024 && (Tr = !0);
        break;
      case 6:
        if (it(t, e), lt(e), i & 4) {
          if (e.stateNode === null)
            throw Error(u(162));
          i = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = i;
          } catch (R) {
            Se(e, e.return, R);
          }
        }
        break;
      case 3:
        if (Un = null, l = Ot, Ot = Nn(t.containerInfo), it(t, e), Ot = l, lt(e), i & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Ni(t.containerInfo);
          } catch (R) {
            Se(e, e.return, R);
          }
        Tr && (Tr = !1, cf(e));
        break;
      case 4:
        i = Ot, Ot = Nn(
          e.stateNode.containerInfo
        ), it(t, e), lt(e), Ot = i;
        break;
      case 12:
        it(t, e), lt(e);
        break;
      case 31:
        it(t, e), lt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, hn(e, i)));
        break;
      case 13:
        it(t, e), lt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (vn = rt()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, hn(e, i)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var s = a !== null && a.memoizedState !== null, h = Wt, z = Ye;
        if (Wt = h || l, Ye = z || s, it(t, e), Ye = z, Wt = h, lt(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (a === null || s || Wt || Ye || Ga(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                s = a = t;
                try {
                  if (n = s.stateNode, l)
                    o = n.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none";
                  else {
                    r = s.stateNode;
                    var A = s.memoizedProps.style, x = A != null && A.hasOwnProperty("display") ? A.display : null;
                    r.style.display = x == null || typeof x == "boolean" ? "" : ("" + x).trim();
                  }
                } catch (R) {
                  Se(s, s.return, R);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = l ? "" : s.memoizedProps;
                } catch (R) {
                  Se(s, s.return, R);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                s = t;
                try {
                  var v = s.stateNode;
                  l ? If(v, !0) : If(s.stateNode, !1);
                } catch (R) {
                  Se(s, s.return, R);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        i & 4 && (i = e.updateQueue, i !== null && (a = i.retryQueue, a !== null && (i.retryQueue = null, hn(e, a))));
        break;
      case 19:
        it(t, e), lt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, hn(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        it(t, e), lt(e);
    }
  }
  function lt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, i = e.return; i !== null; ) {
          if (Ps(i)) {
            a = i;
            break;
          }
          i = i.return;
        }
        if (a == null) throw Error(u(160));
        switch (a.tag) {
          case 27:
            var l = a.stateNode, n = Sr(e);
            bn(e, n, l);
            break;
          case 5:
            var o = a.stateNode;
            a.flags & 32 && (ei(o, ""), a.flags &= -33);
            var r = Sr(e);
            bn(e, r, o);
            break;
          case 3:
          case 4:
            var s = a.stateNode.containerInfo, h = Sr(e);
            Ar(
              e,
              h,
              s
            );
            break;
          default:
            throw Error(u(161));
        }
      } catch (z) {
        Se(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function cf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        cf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Ft(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        af(e, t.alternate, t), t = t.sibling;
  }
  function Ga(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ga(4, t, t.return), Ga(t);
          break;
        case 1:
          Ht(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Fs(
            t,
            t.return,
            a
          ), Ga(t);
          break;
        case 27:
          hl(t.stateNode);
        case 26:
        case 5:
          Ht(t, t.return), Ga(t);
          break;
        case 22:
          t.memoizedState === null && Ga(t);
          break;
        case 30:
          Ga(t);
          break;
        default:
          Ga(t);
      }
      e = e.sibling;
    }
  }
  function It(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, l = e, n = t, o = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          It(
            l,
            n,
            a
          ), rl(4, n);
          break;
        case 1:
          if (It(
            l,
            n,
            a
          ), i = n, l = i.stateNode, typeof l.componentDidMount == "function")
            try {
              l.componentDidMount();
            } catch (h) {
              Se(i, i.return, h);
            }
          if (i = n, l = i.updateQueue, l !== null) {
            var r = i.stateNode;
            try {
              var s = l.shared.hiddenCallbacks;
              if (s !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < s.length; l++)
                  qc(s[l], r);
            } catch (h) {
              Se(i, i.return, h);
            }
          }
          a && o & 64 && $s(n), ul(n, n.return);
          break;
        case 27:
          ef(n);
        case 26:
        case 5:
          It(
            l,
            n,
            a
          ), a && i === null && o & 4 && Is(n), ul(n, n.return);
          break;
        case 12:
          It(
            l,
            n,
            a
          );
          break;
        case 31:
          It(
            l,
            n,
            a
          ), a && o & 4 && of(l, n);
          break;
        case 13:
          It(
            l,
            n,
            a
          ), a && o & 4 && rf(l, n);
          break;
        case 22:
          n.memoizedState === null && It(
            l,
            n,
            a
          ), ul(n, n.return);
          break;
        case 30:
          break;
        default:
          It(
            l,
            n,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Er(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && Ki(a));
  }
  function Mr(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ki(e));
  }
  function Nt(e, t, a, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        sf(
          e,
          t,
          a,
          i
        ), t = t.sibling;
  }
  function sf(e, t, a, i) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Nt(
          e,
          t,
          a,
          i
        ), l & 2048 && rl(9, t);
        break;
      case 1:
        Nt(
          e,
          t,
          a,
          i
        );
        break;
      case 3:
        Nt(
          e,
          t,
          a,
          i
        ), l & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ki(e)));
        break;
      case 12:
        if (l & 2048) {
          Nt(
            e,
            t,
            a,
            i
          ), e = t.stateNode;
          try {
            var n = t.memoizedProps, o = n.id, r = n.onPostCommit;
            typeof r == "function" && r(
              o,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (s) {
            Se(t, t.return, s);
          }
        } else
          Nt(
            e,
            t,
            a,
            i
          );
        break;
      case 31:
        Nt(
          e,
          t,
          a,
          i
        );
        break;
      case 13:
        Nt(
          e,
          t,
          a,
          i
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, o = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Nt(
          e,
          t,
          a,
          i
        ) : cl(e, t) : n._visibility & 2 ? Nt(
          e,
          t,
          a,
          i
        ) : (n._visibility |= 2, yi(
          e,
          t,
          a,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), l & 2048 && Er(o, t);
        break;
      case 24:
        Nt(
          e,
          t,
          a,
          i
        ), l & 2048 && Mr(t.alternate, t);
        break;
      default:
        Nt(
          e,
          t,
          a,
          i
        );
    }
  }
  function yi(e, t, a, i, l) {
    for (l = l && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = e, o = t, r = a, s = i, h = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          yi(
            n,
            o,
            r,
            s,
            l
          ), rl(8, o);
          break;
        case 23:
          break;
        case 22:
          var z = o.stateNode;
          o.memoizedState !== null ? z._visibility & 2 ? yi(
            n,
            o,
            r,
            s,
            l
          ) : cl(
            n,
            o
          ) : (z._visibility |= 2, yi(
            n,
            o,
            r,
            s,
            l
          )), l && h & 2048 && Er(
            o.alternate,
            o
          );
          break;
        case 24:
          yi(
            n,
            o,
            r,
            s,
            l
          ), l && h & 2048 && Mr(o.alternate, o);
          break;
        default:
          yi(
            n,
            o,
            r,
            s,
            l
          );
      }
      t = t.sibling;
    }
  }
  function cl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, i = t, l = i.flags;
        switch (i.tag) {
          case 22:
            cl(a, i), l & 2048 && Er(
              i.alternate,
              i
            );
            break;
          case 24:
            cl(a, i), l & 2048 && Mr(i.alternate, i);
            break;
          default:
            cl(a, i);
        }
        t = t.sibling;
      }
  }
  var sl = 8192;
  function _i(e, t, a) {
    if (e.subtreeFlags & sl)
      for (e = e.child; e !== null; )
        ff(
          e,
          t,
          a
        ), e = e.sibling;
  }
  function ff(e, t, a) {
    switch (e.tag) {
      case 26:
        _i(
          e,
          t,
          a
        ), e.flags & sl && e.memoizedState !== null && em(
          a,
          Ot,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        _i(
          e,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var i = Ot;
        Ot = Nn(e.stateNode.containerInfo), _i(
          e,
          t,
          a
        ), Ot = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = sl, sl = 16777216, _i(
          e,
          t,
          a
        ), sl = i) : _i(
          e,
          t,
          a
        ));
        break;
      default:
        _i(
          e,
          t,
          a
        );
    }
  }
  function df(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function fl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var i = t[a];
          Ge = i, mf(
            i,
            e
          );
        }
      df(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        pf(e), e = e.sibling;
  }
  function pf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        fl(e), e.flags & 2048 && ga(9, e, e.return);
        break;
      case 3:
        fl(e);
        break;
      case 12:
        fl(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, xn(e)) : fl(e);
        break;
      default:
        fl(e);
    }
  }
  function xn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var i = t[a];
          Ge = i, mf(
            i,
            e
          );
        }
      df(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ga(8, t, t.return), xn(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, xn(t));
          break;
        default:
          xn(t);
      }
      e = e.sibling;
    }
  }
  function mf(e, t) {
    for (; Ge !== null; ) {
      var a = Ge;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ga(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var i = a.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Ki(a.memoizedState.cache);
      }
      if (i = a.child, i !== null) i.return = a, Ge = i;
      else
        e: for (a = e; Ge !== null; ) {
          i = Ge;
          var l = i.sibling, n = i.return;
          if (lf(i), i === a) {
            Ge = null;
            break e;
          }
          if (l !== null) {
            l.return = n, Ge = l;
            break e;
          }
          Ge = n;
        }
    }
  }
  var gp = {
    getCacheForType: function(e) {
      var t = Ke(Be), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    },
    cacheSignal: function() {
      return Ke(Be).controller.signal;
    }
  }, bp = typeof WeakMap == "function" ? WeakMap : Map, he = 0, Me = null, re = null, se = 0, ze = 0, mt = null, ba = !1, wi = !1, Cr = !1, Pt = 0, He = 0, ha = 0, Xa = 0, Or = 0, gt = 0, zi = 0, dl = null, nt = null, Nr = !1, vn = 0, gf = 0, yn = 1 / 0, _n = null, xa = null, Qe = 0, va = null, Si = null, ea = 0, Dr = 0, Ur = null, bf = null, pl = 0, jr = null;
  function bt() {
    return (he & 2) !== 0 && se !== 0 ? se & -se : _.T !== null ? Zr() : Nu();
  }
  function hf() {
    if (gt === 0)
      if ((se & 536870912) === 0 || pe) {
        var e = Ml;
        Ml <<= 1, (Ml & 3932160) === 0 && (Ml = 262144), gt = e;
      } else gt = 536870912;
    return e = dt.current, e !== null && (e.flags |= 32), gt;
  }
  function ot(e, t, a) {
    (e === Me && (ze === 2 || ze === 9) || e.cancelPendingCommit !== null) && (Ai(e, 0), ya(
      e,
      se,
      gt,
      !1
    )), ji(e, a), ((he & 2) === 0 || e !== Me) && (e === Me && ((he & 2) === 0 && (Xa |= a), He === 4 && ya(
      e,
      se,
      gt,
      !1
    )), Rt(e));
  }
  function xf(e, t, a) {
    if ((he & 6) !== 0) throw Error(u(327));
    var i = !a && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ui(e, t), l = i ? vp(e, t) : Rr(e, t, !0), n = i;
    do {
      if (l === 0) {
        wi && !i && ya(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, n && !hp(a)) {
          l = Rr(e, t, !1), n = !1;
          continue;
        }
        if (l === 2) {
          if (n = t, e.errorRecoveryDisabledLanes & n)
            var o = 0;
          else
            o = e.pendingLanes & -536870913, o = o !== 0 ? o : o & 536870912 ? 536870912 : 0;
          if (o !== 0) {
            t = o;
            e: {
              var r = e;
              l = dl;
              var s = r.current.memoizedState.isDehydrated;
              if (s && (Ai(r, o).flags |= 256), o = Rr(
                r,
                o,
                !1
              ), o !== 2) {
                if (Cr && !s) {
                  r.errorRecoveryDisabledLanes |= n, Xa |= n, l = 4;
                  break e;
                }
                n = nt, nt = l, n !== null && (nt === null ? nt = n : nt.push.apply(
                  nt,
                  n
                ));
              }
              l = o;
            }
            if (n = !1, l !== 2) continue;
          }
        }
        if (l === 1) {
          Ai(e, 0), ya(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, n = l, n) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ya(
                i,
                t,
                gt,
                !ba
              );
              break e;
            case 2:
              nt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && (l = vn + 300 - rt(), 10 < l)) {
            if (ya(
              i,
              t,
              gt,
              !ba
            ), Ol(i, 0, !0) !== 0) break e;
            ea = t, i.timeoutHandle = Wf(
              vf.bind(
                null,
                i,
                a,
                nt,
                _n,
                Nr,
                t,
                gt,
                Xa,
                zi,
                ba,
                n,
                "Throttled",
                -0,
                0
              ),
              l
            );
            break e;
          }
          vf(
            i,
            a,
            nt,
            _n,
            Nr,
            t,
            gt,
            Xa,
            zi,
            ba,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Rt(e);
  }
  function vf(e, t, a, i, l, n, o, r, s, h, z, A, x, v) {
    if (e.timeoutHandle = -1, A = t.subtreeFlags, A & 8192 || (A & 16785408) === 16785408) {
      A = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qt
      }, ff(
        t,
        n,
        A
      );
      var R = (n & 62914560) === n ? vn - rt() : (n & 4194048) === n ? gf - rt() : 0;
      if (R = tm(
        A,
        R
      ), R !== null) {
        ea = n, e.cancelPendingCommit = R(
          Ef.bind(
            null,
            e,
            t,
            n,
            a,
            i,
            l,
            o,
            r,
            s,
            z,
            A,
            null,
            x,
            v
          )
        ), ya(e, n, o, !h);
        return;
      }
    }
    Ef(
      e,
      t,
      n,
      a,
      i,
      l,
      o,
      r,
      s
    );
  }
  function hp(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var i = 0; i < a.length; i++) {
          var l = a[i], n = l.getSnapshot;
          l = l.value;
          try {
            if (!st(n(), l)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function ya(e, t, a, i) {
    t &= ~Or, t &= ~Xa, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var l = t; 0 < l; ) {
      var n = 31 - ct(l), o = 1 << n;
      i[n] = -1, l &= ~o;
    }
    a !== 0 && Mu(e, a, t);
  }
  function wn() {
    return (he & 6) === 0 ? (ml(0), !1) : !0;
  }
  function Hr() {
    if (re !== null) {
      if (ze === 0)
        var e = re.return;
      else
        e = re, Lt = ka = null, Fo(e), gi = null, $i = 0, e = re;
      for (; e !== null; )
        Ws(e.alternate, e), e = e.return;
      re = null;
    }
  }
  function Ai(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, kp(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ea = 0, Hr(), Me = e, re = a = Yt(e.current, null), se = t, ze = 0, mt = null, ba = !1, wi = Ui(e, t), Cr = !1, zi = gt = Or = Xa = ha = He = 0, nt = dl = null, Nr = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var l = 31 - ct(i), n = 1 << l;
        t |= e[l], i &= ~n;
      }
    return Pt = t, Ql(), a;
  }
  function yf(e, t) {
    ae = null, _.H = ll, t === mi || t === $l ? (t = Hc(), ze = 3) : t === qo ? (t = Hc(), ze = 4) : ze = t === pr ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, mt = t, re === null && (He = 1, fn(
      e,
      _t(t, e.current)
    ));
  }
  function _f() {
    var e = dt.current;
    return e === null ? !0 : (se & 4194048) === se ? At === null : (se & 62914560) === se || (se & 536870912) !== 0 ? e === At : !1;
  }
  function wf() {
    var e = _.H;
    return _.H = ll, e === null ? ll : e;
  }
  function zf() {
    var e = _.A;
    return _.A = gp, e;
  }
  function zn() {
    He = 4, ba || (se & 4194048) !== se && dt.current !== null || (wi = !0), (ha & 134217727) === 0 && (Xa & 134217727) === 0 || Me === null || ya(
      Me,
      se,
      gt,
      !1
    );
  }
  function Rr(e, t, a) {
    var i = he;
    he |= 2;
    var l = wf(), n = zf();
    (Me !== e || se !== t) && (_n = null, Ai(e, t)), t = !1;
    var o = He;
    e: do
      try {
        if (ze !== 0 && re !== null) {
          var r = re, s = mt;
          switch (ze) {
            case 8:
              Hr(), o = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              dt.current === null && (t = !0);
              var h = ze;
              if (ze = 0, mt = null, Ti(e, r, s, h), a && wi) {
                o = 0;
                break e;
              }
              break;
            default:
              h = ze, ze = 0, mt = null, Ti(e, r, s, h);
          }
        }
        xp(), o = He;
        break;
      } catch (z) {
        yf(e, z);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Lt = ka = null, he = i, _.H = l, _.A = n, re === null && (Me = null, se = 0, Ql()), o;
  }
  function xp() {
    for (; re !== null; ) Sf(re);
  }
  function vp(e, t) {
    var a = he;
    he |= 2;
    var i = wf(), l = zf();
    Me !== e || se !== t ? (_n = null, yn = rt() + 500, Ai(e, t)) : wi = Ui(
      e,
      t
    );
    e: do
      try {
        if (ze !== 0 && re !== null) {
          t = re;
          var n = mt;
          t: switch (ze) {
            case 1:
              ze = 0, mt = null, Ti(e, t, n, 1);
              break;
            case 2:
            case 9:
              if (Uc(n)) {
                ze = 0, mt = null, Af(t);
                break;
              }
              t = function() {
                ze !== 2 && ze !== 9 || Me !== e || (ze = 7), Rt(e);
              }, n.then(t, t);
              break e;
            case 3:
              ze = 7;
              break e;
            case 4:
              ze = 5;
              break e;
            case 7:
              Uc(n) ? (ze = 0, mt = null, Af(t)) : (ze = 0, mt = null, Ti(e, t, n, 7));
              break;
            case 5:
              var o = null;
              switch (re.tag) {
                case 26:
                  o = re.memoizedState;
                case 5:
                case 27:
                  var r = re;
                  if (o ? sd(o) : r.stateNode.complete) {
                    ze = 0, mt = null;
                    var s = r.sibling;
                    if (s !== null) re = s;
                    else {
                      var h = r.return;
                      h !== null ? (re = h, Sn(h)) : re = null;
                    }
                    break t;
                  }
              }
              ze = 0, mt = null, Ti(e, t, n, 5);
              break;
            case 6:
              ze = 0, mt = null, Ti(e, t, n, 6);
              break;
            case 8:
              Hr(), He = 6;
              break e;
            default:
              throw Error(u(462));
          }
        }
        yp();
        break;
      } catch (z) {
        yf(e, z);
      }
    while (!0);
    return Lt = ka = null, _.H = i, _.A = l, he = a, re !== null ? 0 : (Me = null, se = 0, Ql(), He);
  }
  function yp() {
    for (; re !== null && !Ld(); )
      Sf(re);
  }
  function Sf(e) {
    var t = Js(e.alternate, e, Pt);
    e.memoizedProps = e.pendingProps, t === null ? Sn(e) : re = t;
  }
  function Af(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ys(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          se
        );
        break;
      case 11:
        t = Ys(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          se
        );
        break;
      case 5:
        Fo(t);
      default:
        Ws(a, t), t = re = wc(t, Pt), t = Js(a, t, Pt);
    }
    e.memoizedProps = e.pendingProps, t === null ? Sn(e) : re = t;
  }
  function Ti(e, t, a, i) {
    Lt = ka = null, Fo(t), gi = null, $i = 0;
    var l = t.return;
    try {
      if (up(
        e,
        l,
        t,
        a,
        se
      )) {
        He = 1, fn(
          e,
          _t(a, e.current)
        ), re = null;
        return;
      }
    } catch (n) {
      if (l !== null) throw re = l, n;
      He = 1, fn(
        e,
        _t(a, e.current)
      ), re = null;
      return;
    }
    t.flags & 32768 ? (pe || i === 1 ? e = !0 : wi || (se & 536870912) !== 0 ? e = !1 : (ba = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = dt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Tf(t, e)) : Sn(t);
  }
  function Sn(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Tf(
          t,
          ba
        );
        return;
      }
      e = t.return;
      var a = fp(
        t.alternate,
        t,
        Pt
      );
      if (a !== null) {
        re = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        re = t;
        return;
      }
      re = t = e;
    } while (t !== null);
    He === 0 && (He = 5);
  }
  function Tf(e, t) {
    do {
      var a = dp(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, re = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        re = e;
        return;
      }
      re = e = a;
    } while (e !== null);
    He = 6, re = null;
  }
  function Ef(e, t, a, i, l, n, o, r, s) {
    e.cancelPendingCommit = null;
    do
      An();
    while (Qe !== 0);
    if ((he & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (n = t.lanes | t.childLanes, n |= So, Pd(
        e,
        a,
        n,
        o,
        r,
        s
      ), e === Me && (re = Me = null, se = 0), Si = t, va = e, ea = a, Dr = n, Ur = l, bf = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Sp(Tl, function() {
        return Df(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = _.T, _.T = null, l = O.p, O.p = 2, o = he, he |= 4;
        try {
          pp(e, t, a);
        } finally {
          he = o, O.p = l, _.T = i;
        }
      }
      Qe = 1, Mf(), Cf(), Of();
    }
  }
  function Mf() {
    if (Qe === 1) {
      Qe = 0;
      var e = va, t = Si, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null;
        var i = O.p;
        O.p = 2;
        var l = he;
        he |= 4;
        try {
          uf(t, e);
          var n = Kr, o = pc(e.containerInfo), r = n.focusedElem, s = n.selectionRange;
          if (o !== r && r && r.ownerDocument && dc(
            r.ownerDocument.documentElement,
            r
          )) {
            if (s !== null && vo(r)) {
              var h = s.start, z = s.end;
              if (z === void 0 && (z = h), "selectionStart" in r)
                r.selectionStart = h, r.selectionEnd = Math.min(
                  z,
                  r.value.length
                );
              else {
                var A = r.ownerDocument || document, x = A && A.defaultView || window;
                if (x.getSelection) {
                  var v = x.getSelection(), R = r.textContent.length, K = Math.min(s.start, R), Ee = s.end === void 0 ? K : Math.min(s.end, R);
                  !v.extend && K > Ee && (o = Ee, Ee = K, K = o);
                  var m = fc(
                    r,
                    K
                  ), d = fc(
                    r,
                    Ee
                  );
                  if (m && d && (v.rangeCount !== 1 || v.anchorNode !== m.node || v.anchorOffset !== m.offset || v.focusNode !== d.node || v.focusOffset !== d.offset)) {
                    var b = A.createRange();
                    b.setStart(m.node, m.offset), v.removeAllRanges(), K > Ee ? (v.addRange(b), v.extend(d.node, d.offset)) : (b.setEnd(d.node, d.offset), v.addRange(b));
                  }
                }
              }
            }
            for (A = [], v = r; v = v.parentNode; )
              v.nodeType === 1 && A.push({
                element: v,
                left: v.scrollLeft,
                top: v.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < A.length; r++) {
              var S = A[r];
              S.element.scrollLeft = S.left, S.element.scrollTop = S.top;
            }
          }
          kn = !!Jr, Kr = Jr = null;
        } finally {
          he = l, O.p = i, _.T = a;
        }
      }
      e.current = t, Qe = 2;
    }
  }
  function Cf() {
    if (Qe === 2) {
      Qe = 0;
      var e = va, t = Si, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = _.T, _.T = null;
        var i = O.p;
        O.p = 2;
        var l = he;
        he |= 4;
        try {
          af(e, t.alternate, t);
        } finally {
          he = l, O.p = i, _.T = a;
        }
      }
      Qe = 3;
    }
  }
  function Of() {
    if (Qe === 4 || Qe === 3) {
      Qe = 0, Vd();
      var e = va, t = Si, a = ea, i = bf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Qe = 5 : (Qe = 0, Si = va = null, Nf(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (l === 0 && (xa = null), Pn(a), t = t.stateNode, ut && typeof ut.onCommitFiberRoot == "function")
        try {
          ut.onCommitFiberRoot(
            Di,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = _.T, l = O.p, O.p = 2, _.T = null;
        try {
          for (var n = e.onRecoverableError, o = 0; o < i.length; o++) {
            var r = i[o];
            n(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          _.T = t, O.p = l;
        }
      }
      (ea & 3) !== 0 && An(), Rt(e), l = e.pendingLanes, (a & 261930) !== 0 && (l & 42) !== 0 ? e === jr ? pl++ : (pl = 0, jr = e) : pl = 0, ml(0);
    }
  }
  function Nf(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ki(t)));
  }
  function An() {
    return Mf(), Cf(), Of(), Df();
  }
  function Df() {
    if (Qe !== 5) return !1;
    var e = va, t = Dr;
    Dr = 0;
    var a = Pn(ea), i = _.T, l = O.p;
    try {
      O.p = 32 > a ? 32 : a, _.T = null, a = Ur, Ur = null;
      var n = va, o = ea;
      if (Qe = 0, Si = va = null, ea = 0, (he & 6) !== 0) throw Error(u(331));
      var r = he;
      if (he |= 4, pf(n.current), sf(
        n,
        n.current,
        o,
        a
      ), he = r, ml(0, !1), ut && typeof ut.onPostCommitFiberRoot == "function")
        try {
          ut.onPostCommitFiberRoot(Di, n);
        } catch {
        }
      return !0;
    } finally {
      O.p = l, _.T = i, Nf(e, t);
    }
  }
  function Uf(e, t, a) {
    t = _t(a, t), t = dr(e.stateNode, t, 2), e = da(e, t, 2), e !== null && (ji(e, 2), Rt(e));
  }
  function Se(e, t, a) {
    if (e.tag === 3)
      Uf(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Uf(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (xa === null || !xa.has(i))) {
            e = _t(a, e), a = Us(2), i = da(t, a, 2), i !== null && (js(
              a,
              i,
              t,
              e
            ), ji(i, 2), Rt(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function kr(e, t, a) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new bp();
      var l = /* @__PURE__ */ new Set();
      i.set(t, l);
    } else
      l = i.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), i.set(t, l));
    l.has(a) || (Cr = !0, l.add(a), e = _p.bind(null, e, t, a), t.then(e, e));
  }
  function _p(e, t, a) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Me === e && (se & a) === a && (He === 4 || He === 3 && (se & 62914560) === se && 300 > rt() - vn ? (he & 2) === 0 && Ai(e, 0) : Or |= a, zi === se && (zi = 0)), Rt(e);
  }
  function jf(e, t) {
    t === 0 && (t = Eu()), e = ja(e, t), e !== null && (ji(e, t), Rt(e));
  }
  function wp(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), jf(e, a);
  }
  function zp(e, t) {
    var a = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, l = e.memoizedState;
        l !== null && (a = l.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    i !== null && i.delete(t), jf(e, a);
  }
  function Sp(e, t) {
    return Wn(e, t);
  }
  var Tn = null, Ei = null, Br = !1, En = !1, qr = !1, _a = 0;
  function Rt(e) {
    e !== Ei && e.next === null && (Ei === null ? Tn = Ei = e : Ei = Ei.next = e), En = !0, Br || (Br = !0, Tp());
  }
  function ml(e, t) {
    if (!qr && En) {
      qr = !0;
      do
        for (var a = !1, i = Tn; i !== null; ) {
          if (e !== 0) {
            var l = i.pendingLanes;
            if (l === 0) var n = 0;
            else {
              var o = i.suspendedLanes, r = i.pingedLanes;
              n = (1 << 31 - ct(42 | e) + 1) - 1, n &= l & ~(o & ~r), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (a = !0, Bf(i, n));
          } else
            n = se, n = Ol(
              i,
              i === Me ? n : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (n & 3) === 0 || Ui(i, n) || (a = !0, Bf(i, n));
          i = i.next;
        }
      while (a);
      qr = !1;
    }
  }
  function Ap() {
    Hf();
  }
  function Hf() {
    En = Br = !1;
    var e = 0;
    _a !== 0 && Rp() && (e = _a);
    for (var t = rt(), a = null, i = Tn; i !== null; ) {
      var l = i.next, n = Rf(i, t);
      n === 0 ? (i.next = null, a === null ? Tn = l : a.next = l, l === null && (Ei = a)) : (a = i, (e !== 0 || (n & 3) !== 0) && (En = !0)), i = l;
    }
    Qe !== 0 && Qe !== 5 || ml(e), _a !== 0 && (_a = 0);
  }
  function Rf(e, t) {
    for (var a = e.suspendedLanes, i = e.pingedLanes, l = e.expirationTimes, n = e.pendingLanes & -62914561; 0 < n; ) {
      var o = 31 - ct(n), r = 1 << o, s = l[o];
      s === -1 ? ((r & a) === 0 || (r & i) !== 0) && (l[o] = Id(r, t)) : s <= t && (e.expiredLanes |= r), n &= ~r;
    }
    if (t = Me, a = se, a = Ol(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, a === 0 || e === t && (ze === 2 || ze === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && $n(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || Ui(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
      switch (i !== null && $n(i), Pn(a)) {
        case 2:
        case 8:
          a = Au;
          break;
        case 32:
          a = Tl;
          break;
        case 268435456:
          a = Tu;
          break;
        default:
          a = Tl;
      }
      return i = kf.bind(null, e), a = Wn(a, i), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return i !== null && i !== null && $n(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function kf(e, t) {
    if (Qe !== 0 && Qe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (An() && e.callbackNode !== a)
      return null;
    var i = se;
    return i = Ol(
      e,
      e === Me ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (xf(e, i, t), Rf(e, rt()), e.callbackNode != null && e.callbackNode === a ? kf.bind(null, e) : null);
  }
  function Bf(e, t) {
    if (An()) return null;
    xf(e, t, !0);
  }
  function Tp() {
    Bp(function() {
      (he & 6) !== 0 ? Wn(
        Su,
        Ap
      ) : Hf();
    });
  }
  function Zr() {
    if (_a === 0) {
      var e = di;
      e === 0 && (e = El, El <<= 1, (El & 261888) === 0 && (El = 256)), _a = e;
    }
    return _a;
  }
  function qf(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : jl("" + e);
  }
  function Zf(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function Ep(e, t, a, i, l) {
    if (t === "submit" && a && a.stateNode === l) {
      var n = qf(
        (l[et] || null).action
      ), o = i.submitter;
      o && (t = (t = o[et] || null) ? qf(t.formAction) : o.getAttribute("formAction"), t !== null && (n = t, o = null));
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
                if (_a !== 0) {
                  var s = o ? Zf(l, o) : new FormData(l);
                  or(
                    a,
                    {
                      pending: !0,
                      data: s,
                      method: l.method,
                      action: n
                    },
                    null,
                    s
                  );
                }
              } else
                typeof n == "function" && (r.preventDefault(), s = o ? Zf(l, o) : new FormData(l), or(
                  a,
                  {
                    pending: !0,
                    data: s,
                    method: l.method,
                    action: n
                  },
                  n,
                  s
                ));
            },
            currentTarget: l
          }
        ]
      });
    }
  }
  for (var Yr = 0; Yr < zo.length; Yr++) {
    var Qr = zo[Yr], Mp = Qr.toLowerCase(), Cp = Qr[0].toUpperCase() + Qr.slice(1);
    Ct(
      Mp,
      "on" + Cp
    );
  }
  Ct(bc, "onAnimationEnd"), Ct(hc, "onAnimationIteration"), Ct(xc, "onAnimationStart"), Ct("dblclick", "onDoubleClick"), Ct("focusin", "onFocus"), Ct("focusout", "onBlur"), Ct(G0, "onTransitionRun"), Ct(X0, "onTransitionStart"), Ct(J0, "onTransitionCancel"), Ct(vc, "onTransitionEnd"), Ia("onMouseEnter", ["mouseout", "mouseover"]), Ia("onMouseLeave", ["mouseout", "mouseover"]), Ia("onPointerEnter", ["pointerout", "pointerover"]), Ia("onPointerLeave", ["pointerout", "pointerover"]), Oa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Oa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Oa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Oa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Oa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Oa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var gl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Op = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gl)
  );
  function Yf(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var i = e[a], l = i.event;
      i = i.listeners;
      e: {
        var n = void 0;
        if (t)
          for (var o = i.length - 1; 0 <= o; o--) {
            var r = i[o], s = r.instance, h = r.currentTarget;
            if (r = r.listener, s !== n && l.isPropagationStopped())
              break e;
            n = r, l.currentTarget = h;
            try {
              n(l);
            } catch (z) {
              Yl(z);
            }
            l.currentTarget = null, n = s;
          }
        else
          for (o = 0; o < i.length; o++) {
            if (r = i[o], s = r.instance, h = r.currentTarget, r = r.listener, s !== n && l.isPropagationStopped())
              break e;
            n = r, l.currentTarget = h;
            try {
              n(l);
            } catch (z) {
              Yl(z);
            }
            l.currentTarget = null, n = s;
          }
      }
    }
  }
  function ue(e, t) {
    var a = t[eo];
    a === void 0 && (a = t[eo] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    a.has(i) || (Qf(t, e, 2, !1), a.add(i));
  }
  function Lr(e, t, a) {
    var i = 0;
    t && (i |= 4), Qf(
      a,
      e,
      i,
      t
    );
  }
  var Mn = "_reactListening" + Math.random().toString(36).slice(2);
  function Vr(e) {
    if (!e[Mn]) {
      e[Mn] = !0, ju.forEach(function(a) {
        a !== "selectionchange" && (Op.has(a) || Lr(a, !1, e), Lr(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Mn] || (t[Mn] = !0, Lr("selectionchange", !1, t));
    }
  }
  function Qf(e, t, a, i) {
    switch (hd(t)) {
      case 2:
        var l = lm;
        break;
      case 8:
        l = nm;
        break;
      default:
        l = nu;
    }
    a = l.bind(
      null,
      t,
      a,
      e
    ), l = void 0, !co || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), i ? l !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: l
    }) : e.addEventListener(t, a, !0) : l !== void 0 ? e.addEventListener(t, a, {
      passive: l
    }) : e.addEventListener(t, a, !1);
  }
  function Gr(e, t, a, i, l) {
    var n = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var o = i.tag;
        if (o === 3 || o === 4) {
          var r = i.stateNode.containerInfo;
          if (r === l) break;
          if (o === 4)
            for (o = i.return; o !== null; ) {
              var s = o.tag;
              if ((s === 3 || s === 4) && o.stateNode.containerInfo === l)
                return;
              o = o.return;
            }
          for (; r !== null; ) {
            if (o = Wa(r), o === null) return;
            if (s = o.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              i = n = o;
              continue e;
            }
            r = r.parentNode;
          }
        }
        i = i.return;
      }
    Xu(function() {
      var h = n, z = ro(a), A = [];
      e: {
        var x = yc.get(e);
        if (x !== void 0) {
          var v = Bl, R = e;
          switch (e) {
            case "keypress":
              if (Rl(a) === 0) break e;
            case "keydown":
            case "keyup":
              v = z0;
              break;
            case "focusin":
              R = "focus", v = mo;
              break;
            case "focusout":
              R = "blur", v = mo;
              break;
            case "beforeblur":
            case "afterblur":
              v = mo;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              v = Wu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              v = f0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              v = T0;
              break;
            case bc:
            case hc:
            case xc:
              v = m0;
              break;
            case vc:
              v = M0;
              break;
            case "scroll":
            case "scrollend":
              v = c0;
              break;
            case "wheel":
              v = O0;
              break;
            case "copy":
            case "cut":
            case "paste":
              v = b0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              v = Fu;
              break;
            case "toggle":
            case "beforetoggle":
              v = D0;
          }
          var K = (t & 4) !== 0, Ee = !K && (e === "scroll" || e === "scrollend"), m = K ? x !== null ? x + "Capture" : null : x;
          K = [];
          for (var d = h, b; d !== null; ) {
            var S = d;
            if (b = S.stateNode, S = S.tag, S !== 5 && S !== 26 && S !== 27 || b === null || m === null || (S = ki(d, m), S != null && K.push(
              bl(d, S, b)
            )), Ee) break;
            d = d.return;
          }
          0 < K.length && (x = new v(
            x,
            R,
            null,
            a,
            z
          ), A.push({ event: x, listeners: K }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (x = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", x && a !== oo && (R = a.relatedTarget || a.fromElement) && (Wa(R) || R[Ka]))
            break e;
          if ((v || x) && (x = z.window === z ? z : (x = z.ownerDocument) ? x.defaultView || x.parentWindow : window, v ? (R = a.relatedTarget || a.toElement, v = h, R = R ? Wa(R) : null, R !== null && (Ee = N(R), K = R.tag, R !== Ee || K !== 5 && K !== 27 && K !== 6) && (R = null)) : (v = null, R = h), v !== R)) {
            if (K = Wu, S = "onMouseLeave", m = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (K = Fu, S = "onPointerLeave", m = "onPointerEnter", d = "pointer"), Ee = v == null ? x : Ri(v), b = R == null ? x : Ri(R), x = new K(
              S,
              d + "leave",
              v,
              a,
              z
            ), x.target = Ee, x.relatedTarget = b, S = null, Wa(z) === h && (K = new K(
              m,
              d + "enter",
              R,
              a,
              z
            ), K.target = b, K.relatedTarget = Ee, S = K), Ee = S, v && R)
              t: {
                for (K = Np, m = v, d = R, b = 0, S = m; S; S = K(S))
                  b++;
                S = 0;
                for (var Q = d; Q; Q = K(Q))
                  S++;
                for (; 0 < b - S; )
                  m = K(m), b--;
                for (; 0 < S - b; )
                  d = K(d), S--;
                for (; b--; ) {
                  if (m === d || d !== null && m === d.alternate) {
                    K = m;
                    break t;
                  }
                  m = K(m), d = K(d);
                }
                K = null;
              }
            else K = null;
            v !== null && Lf(
              A,
              x,
              v,
              K,
              !1
            ), R !== null && Ee !== null && Lf(
              A,
              Ee,
              R,
              K,
              !0
            );
          }
        }
        e: {
          if (x = h ? Ri(h) : window, v = x.nodeName && x.nodeName.toLowerCase(), v === "select" || v === "input" && x.type === "file")
            var me = nc;
          else if (ic(x))
            if (oc)
              me = Q0;
            else {
              me = Z0;
              var k = q0;
            }
          else
            v = x.nodeName, !v || v.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? h && no(h.elementType) && (me = nc) : me = Y0;
          if (me && (me = me(e, h))) {
            lc(
              A,
              me,
              a,
              z
            );
            break e;
          }
          k && k(e, x, h), e === "focusout" && h && x.type === "number" && h.memoizedProps.value != null && lo(x, "number", x.value);
        }
        switch (k = h ? Ri(h) : window, e) {
          case "focusin":
            (ic(k) || k.contentEditable === "true") && (li = k, yo = h, Gi = null);
            break;
          case "focusout":
            Gi = yo = li = null;
            break;
          case "mousedown":
            _o = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            _o = !1, mc(A, a, z);
            break;
          case "selectionchange":
            if (V0) break;
          case "keydown":
          case "keyup":
            mc(A, a, z);
        }
        var ie;
        if (bo)
          e: {
            switch (e) {
              case "compositionstart":
                var fe = "onCompositionStart";
                break e;
              case "compositionend":
                fe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                fe = "onCompositionUpdate";
                break e;
            }
            fe = void 0;
          }
        else
          ii ? tc(e, a) && (fe = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (fe = "onCompositionStart");
        fe && (Iu && a.locale !== "ko" && (ii || fe !== "onCompositionStart" ? fe === "onCompositionEnd" && ii && (ie = Ju()) : (na = z, so = "value" in na ? na.value : na.textContent, ii = !0)), k = Cn(h, fe), 0 < k.length && (fe = new $u(
          fe,
          e,
          null,
          a,
          z
        ), A.push({ event: fe, listeners: k }), ie ? fe.data = ie : (ie = ac(a), ie !== null && (fe.data = ie)))), (ie = j0 ? H0(e, a) : R0(e, a)) && (fe = Cn(h, "onBeforeInput"), 0 < fe.length && (k = new $u(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          z
        ), A.push({
          event: k,
          listeners: fe
        }), k.data = ie)), Ep(
          A,
          e,
          h,
          a,
          z
        );
      }
      Yf(A, t);
    });
  }
  function bl(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function Cn(e, t) {
    for (var a = t + "Capture", i = []; e !== null; ) {
      var l = e, n = l.stateNode;
      if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || n === null || (l = ki(e, a), l != null && i.unshift(
        bl(e, l, n)
      ), l = ki(e, t), l != null && i.push(
        bl(e, l, n)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function Np(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Lf(e, t, a, i, l) {
    for (var n = t._reactName, o = []; a !== null && a !== i; ) {
      var r = a, s = r.alternate, h = r.stateNode;
      if (r = r.tag, s !== null && s === i) break;
      r !== 5 && r !== 26 && r !== 27 || h === null || (s = h, l ? (h = ki(a, n), h != null && o.unshift(
        bl(a, h, s)
      )) : l || (h = ki(a, n), h != null && o.push(
        bl(a, h, s)
      ))), a = a.return;
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
  }
  var Dp = /\r\n?/g, Up = /\u0000|\uFFFD/g;
  function Vf(e) {
    return (typeof e == "string" ? e : "" + e).replace(Dp, `
`).replace(Up, "");
  }
  function Gf(e, t) {
    return t = Vf(t), Vf(e) === t;
  }
  function Te(e, t, a, i, l, n) {
    switch (a) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || ei(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && ei(e, "" + i);
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
        Dl(e, a, i);
        break;
      case "style":
        Vu(e, i, n);
        break;
      case "data":
        if (t !== "object") {
          Dl(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(a);
          break;
        }
        i = jl("" + i), e.setAttribute(a, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (a === "formAction" ? (t !== "input" && Te(e, t, "name", l.name, l, null), Te(
            e,
            t,
            "formEncType",
            l.formEncType,
            l,
            null
          ), Te(
            e,
            t,
            "formMethod",
            l.formMethod,
            l,
            null
          ), Te(
            e,
            t,
            "formTarget",
            l.formTarget,
            l,
            null
          )) : (Te(e, t, "encType", l.encType, l, null), Te(e, t, "method", l.method, l, null), Te(e, t, "target", l.target, l, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(a);
          break;
        }
        i = jl("" + i), e.setAttribute(a, i);
        break;
      case "onClick":
        i != null && (e.onclick = qt);
        break;
      case "onScroll":
        i != null && ue("scroll", e);
        break;
      case "onScrollEnd":
        i != null && ue("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(u(61));
          if (a = i.__html, a != null) {
            if (l.children != null) throw Error(u(60));
            e.innerHTML = a;
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
        a = jl("" + i), e.setAttributeNS(
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
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "" + i) : e.removeAttribute(a);
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
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, i) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(a, i) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : e.setAttribute(a, i);
        break;
      case "popover":
        ue("beforetoggle", e), ue("toggle", e), Nl(e, "popover", i);
        break;
      case "xlinkActuate":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Bt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Bt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Bt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Bt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Nl(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = r0.get(a) || a, Nl(e, a, i));
    }
  }
  function Xr(e, t, a, i, l, n) {
    switch (a) {
      case "style":
        Vu(e, i, n);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(u(61));
          if (a = i.__html, a != null) {
            if (l.children != null) throw Error(u(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof i == "string" ? ei(e, i) : (typeof i == "number" || typeof i == "bigint") && ei(e, "" + i);
        break;
      case "onScroll":
        i != null && ue("scroll", e);
        break;
      case "onScrollEnd":
        i != null && ue("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = qt);
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
        if (!Hu.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (l = a.endsWith("Capture"), t = a.slice(2, l ? a.length - 7 : void 0), n = e[et] || null, n = n != null ? n[a] : null, typeof n == "function" && e.removeEventListener(t, n, l), typeof i == "function")) {
              typeof n != "function" && n !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, l);
              break e;
            }
            a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : Nl(e, a, i);
          }
    }
  }
  function $e(e, t, a) {
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
        ue("error", e), ue("load", e);
        var i = !1, l = !1, n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var o = a[n];
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
                  throw Error(u(137, t));
                default:
                  Te(e, t, n, o, a, null);
              }
          }
        l && Te(e, t, "srcSet", a.srcSet, a, null), i && Te(e, t, "src", a.src, a, null);
        return;
      case "input":
        ue("invalid", e);
        var r = n = o = l = null, s = null, h = null;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var z = a[i];
            if (z != null)
              switch (i) {
                case "name":
                  l = z;
                  break;
                case "type":
                  o = z;
                  break;
                case "checked":
                  s = z;
                  break;
                case "defaultChecked":
                  h = z;
                  break;
                case "value":
                  n = z;
                  break;
                case "defaultValue":
                  r = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(u(137, t));
                  break;
                default:
                  Te(e, t, i, z, a, null);
              }
          }
        Zu(
          e,
          n,
          r,
          s,
          h,
          o,
          l,
          !1
        );
        return;
      case "select":
        ue("invalid", e), i = o = n = null;
        for (l in a)
          if (a.hasOwnProperty(l) && (r = a[l], r != null))
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
                Te(e, t, l, r, a, null);
            }
        t = n, a = o, e.multiple = !!i, t != null ? Pa(e, !!i, t, !1) : a != null && Pa(e, !!i, a, !0);
        return;
      case "textarea":
        ue("invalid", e), n = l = i = null;
        for (o in a)
          if (a.hasOwnProperty(o) && (r = a[o], r != null))
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
                if (r != null) throw Error(u(91));
                break;
              default:
                Te(e, t, o, r, a, null);
            }
        Qu(e, i, l, n);
        return;
      case "option":
        for (s in a)
          if (a.hasOwnProperty(s) && (i = a[s], i != null))
            switch (s) {
              case "selected":
                e.selected = i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                Te(e, t, s, i, a, null);
            }
        return;
      case "dialog":
        ue("beforetoggle", e), ue("toggle", e), ue("cancel", e), ue("close", e);
        break;
      case "iframe":
      case "object":
        ue("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < gl.length; i++)
          ue(gl[i], e);
        break;
      case "image":
        ue("error", e), ue("load", e);
        break;
      case "details":
        ue("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ue("error", e), ue("load", e);
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
          if (a.hasOwnProperty(h) && (i = a[h], i != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                Te(e, t, h, i, a, null);
            }
        return;
      default:
        if (no(t)) {
          for (z in a)
            a.hasOwnProperty(z) && (i = a[z], i !== void 0 && Xr(
              e,
              t,
              z,
              i,
              a,
              void 0
            ));
          return;
        }
    }
    for (r in a)
      a.hasOwnProperty(r) && (i = a[r], i != null && Te(e, t, r, i, a, null));
  }
  function jp(e, t, a, i) {
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
        var l = null, n = null, o = null, r = null, s = null, h = null, z = null;
        for (v in a) {
          var A = a[v];
          if (a.hasOwnProperty(v) && A != null)
            switch (v) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = A;
              default:
                i.hasOwnProperty(v) || Te(e, t, v, null, i, A);
            }
        }
        for (var x in i) {
          var v = i[x];
          if (A = a[x], i.hasOwnProperty(x) && (v != null || A != null))
            switch (x) {
              case "type":
                n = v;
                break;
              case "name":
                l = v;
                break;
              case "checked":
                h = v;
                break;
              case "defaultChecked":
                z = v;
                break;
              case "value":
                o = v;
                break;
              case "defaultValue":
                r = v;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null)
                  throw Error(u(137, t));
                break;
              default:
                v !== A && Te(
                  e,
                  t,
                  x,
                  v,
                  i,
                  A
                );
            }
        }
        io(
          e,
          o,
          r,
          s,
          h,
          z,
          n,
          l
        );
        return;
      case "select":
        v = o = r = x = null;
        for (n in a)
          if (s = a[n], a.hasOwnProperty(n) && s != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                v = s;
              default:
                i.hasOwnProperty(n) || Te(
                  e,
                  t,
                  n,
                  null,
                  i,
                  s
                );
            }
        for (l in i)
          if (n = i[l], s = a[l], i.hasOwnProperty(l) && (n != null || s != null))
            switch (l) {
              case "value":
                x = n;
                break;
              case "defaultValue":
                r = n;
                break;
              case "multiple":
                o = n;
              default:
                n !== s && Te(
                  e,
                  t,
                  l,
                  n,
                  i,
                  s
                );
            }
        t = r, a = o, i = v, x != null ? Pa(e, !!a, x, !1) : !!i != !!a && (t != null ? Pa(e, !!a, t, !0) : Pa(e, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        v = x = null;
        for (r in a)
          if (l = a[r], a.hasOwnProperty(r) && l != null && !i.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                Te(e, t, r, null, i, l);
            }
        for (o in i)
          if (l = i[o], n = a[o], i.hasOwnProperty(o) && (l != null || n != null))
            switch (o) {
              case "value":
                x = l;
                break;
              case "defaultValue":
                v = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(u(91));
                break;
              default:
                l !== n && Te(e, t, o, l, i, n);
            }
        Yu(e, x, v);
        return;
      case "option":
        for (var R in a)
          if (x = a[R], a.hasOwnProperty(R) && x != null && !i.hasOwnProperty(R))
            switch (R) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Te(
                  e,
                  t,
                  R,
                  null,
                  i,
                  x
                );
            }
        for (s in i)
          if (x = i[s], v = a[s], i.hasOwnProperty(s) && x !== v && (x != null || v != null))
            switch (s) {
              case "selected":
                e.selected = x && typeof x != "function" && typeof x != "symbol";
                break;
              default:
                Te(
                  e,
                  t,
                  s,
                  x,
                  i,
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
        for (var K in a)
          x = a[K], a.hasOwnProperty(K) && x != null && !i.hasOwnProperty(K) && Te(e, t, K, null, i, x);
        for (h in i)
          if (x = i[h], v = a[h], i.hasOwnProperty(h) && x !== v && (x != null || v != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(u(137, t));
                break;
              default:
                Te(
                  e,
                  t,
                  h,
                  x,
                  i,
                  v
                );
            }
        return;
      default:
        if (no(t)) {
          for (var Ee in a)
            x = a[Ee], a.hasOwnProperty(Ee) && x !== void 0 && !i.hasOwnProperty(Ee) && Xr(
              e,
              t,
              Ee,
              void 0,
              i,
              x
            );
          for (z in i)
            x = i[z], v = a[z], !i.hasOwnProperty(z) || x === v || x === void 0 && v === void 0 || Xr(
              e,
              t,
              z,
              x,
              i,
              v
            );
          return;
        }
    }
    for (var m in a)
      x = a[m], a.hasOwnProperty(m) && x != null && !i.hasOwnProperty(m) && Te(e, t, m, null, i, x);
    for (A in i)
      x = i[A], v = a[A], !i.hasOwnProperty(A) || x === v || x == null && v == null || Te(e, t, A, x, i, v);
  }
  function Xf(e) {
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
  function Hp() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, a = performance.getEntriesByType("resource"), i = 0; i < a.length; i++) {
        var l = a[i], n = l.transferSize, o = l.initiatorType, r = l.duration;
        if (n && r && Xf(o)) {
          for (o = 0, r = l.responseEnd, i += 1; i < a.length; i++) {
            var s = a[i], h = s.startTime;
            if (h > r) break;
            var z = s.transferSize, A = s.initiatorType;
            z && Xf(A) && (s = s.responseEnd, o += z * (s < r ? 1 : (r - h) / (s - h)));
          }
          if (--i, t += 8 * (n + o) / (l.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Jr = null, Kr = null;
  function On(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Jf(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kf(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Wr(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var $r = null;
  function Rp() {
    var e = window.event;
    return e && e.type === "popstate" ? e === $r ? !1 : ($r = e, !0) : ($r = null, !1);
  }
  var Wf = typeof setTimeout == "function" ? setTimeout : void 0, kp = typeof clearTimeout == "function" ? clearTimeout : void 0, $f = typeof Promise == "function" ? Promise : void 0, Bp = typeof queueMicrotask == "function" ? queueMicrotask : typeof $f < "u" ? function(e) {
    return $f.resolve(null).then(e).catch(qp);
  } : Wf;
  function qp(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function wa(e) {
    return e === "head";
  }
  function Ff(e, t) {
    var a = t, i = 0;
    do {
      var l = a.nextSibling;
      if (e.removeChild(a), l && l.nodeType === 8)
        if (a = l.data, a === "/$" || a === "/&") {
          if (i === 0) {
            e.removeChild(l), Ni(t);
            return;
          }
          i--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          i++;
        else if (a === "html")
          hl(e.ownerDocument.documentElement);
        else if (a === "head") {
          a = e.ownerDocument.head, hl(a);
          for (var n = a.firstChild; n; ) {
            var o = n.nextSibling, r = n.nodeName;
            n[Hi] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && n.rel.toLowerCase() === "stylesheet" || a.removeChild(n), n = o;
          }
        } else
          a === "body" && hl(e.ownerDocument.body);
      a = l;
    } while (a);
    Ni(t);
  }
  function If(e, t) {
    var a = e;
    e = 0;
    do {
      var i = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), i && i.nodeType === 8)
        if (a = i.data, a === "/$") {
          if (e === 0) break;
          e--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || e++;
      a = i;
    } while (a);
  }
  function Fr(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Fr(a), to(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(a);
    }
  }
  function Zp(e, t, a, i) {
    for (; e.nodeType === 1; ) {
      var l = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[Hi])
          switch (t) {
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
      } else if (t === "input" && e.type === "hidden") {
        var n = l.name == null ? null : "" + l.name;
        if (l.type === "hidden" && e.getAttribute("name") === n)
          return e;
      } else return e;
      if (e = Tt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Yp(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Tt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Pf(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Tt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ir(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Pr(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Qp(e, t) {
    var a = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), a.removeEventListener("DOMContentLoaded", i);
      };
      a.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function Tt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var eu = null;
  function ed(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return Tt(e.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function td(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return e;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ad(e, t, a) {
    switch (t = On(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(u(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(u(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function hl(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    to(e);
  }
  var Et = /* @__PURE__ */ new Map(), id = /* @__PURE__ */ new Set();
  function Nn(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var ta = O.d;
  O.d = {
    f: Lp,
    r: Vp,
    D: Gp,
    C: Xp,
    L: Jp,
    m: Kp,
    X: $p,
    S: Wp,
    M: Fp
  };
  function Lp() {
    var e = ta.f(), t = wn();
    return e || t;
  }
  function Vp(e) {
    var t = $a(e);
    t !== null && t.tag === 5 && t.type === "form" ? vs(t) : ta.r(e);
  }
  var Mi = typeof document > "u" ? null : document;
  function ld(e, t, a) {
    var i = Mi;
    if (i && typeof t == "string" && t) {
      var l = vt(t);
      l = 'link[rel="' + e + '"][href="' + l + '"]', typeof a == "string" && (l += '[crossorigin="' + a + '"]'), id.has(l) || (id.add(l), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(l) === null && (t = i.createElement("link"), $e(t, "link", e), Ve(t), i.head.appendChild(t)));
    }
  }
  function Gp(e) {
    ta.D(e), ld("dns-prefetch", e, null);
  }
  function Xp(e, t) {
    ta.C(e, t), ld("preconnect", e, t);
  }
  function Jp(e, t, a) {
    ta.L(e, t, a);
    var i = Mi;
    if (i && e && t) {
      var l = 'link[rel="preload"][as="' + vt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (l += '[imagesrcset="' + vt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (l += '[imagesizes="' + vt(
        a.imageSizes
      ) + '"]')) : l += '[href="' + vt(e) + '"]';
      var n = l;
      switch (t) {
        case "style":
          n = Ci(e);
          break;
        case "script":
          n = Oi(e);
      }
      Et.has(n) || (e = H(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Et.set(n, e), i.querySelector(l) !== null || t === "style" && i.querySelector(xl(n)) || t === "script" && i.querySelector(vl(n)) || (t = i.createElement("link"), $e(t, "link", e), Ve(t), i.head.appendChild(t)));
    }
  }
  function Kp(e, t) {
    ta.m(e, t);
    var a = Mi;
    if (a && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", l = 'link[rel="modulepreload"][as="' + vt(i) + '"][href="' + vt(e) + '"]', n = l;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Oi(e);
      }
      if (!Et.has(n) && (e = H({ rel: "modulepreload", href: e }, t), Et.set(n, e), a.querySelector(l) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(vl(n)))
              return;
        }
        i = a.createElement("link"), $e(i, "link", e), Ve(i), a.head.appendChild(i);
      }
    }
  }
  function Wp(e, t, a) {
    ta.S(e, t, a);
    var i = Mi;
    if (i && e) {
      var l = Fa(i).hoistableStyles, n = Ci(e);
      t = t || "default";
      var o = l.get(n);
      if (!o) {
        var r = { loading: 0, preload: null };
        if (o = i.querySelector(
          xl(n)
        ))
          r.loading = 5;
        else {
          e = H(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Et.get(n)) && tu(e, a);
          var s = o = i.createElement("link");
          Ve(s), $e(s, "link", e), s._p = new Promise(function(h, z) {
            s.onload = h, s.onerror = z;
          }), s.addEventListener("load", function() {
            r.loading |= 1;
          }), s.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, Dn(o, t, i);
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
  function $p(e, t) {
    ta.X(e, t);
    var a = Mi;
    if (a && e) {
      var i = Fa(a).hoistableScripts, l = Oi(e), n = i.get(l);
      n || (n = a.querySelector(vl(l)), n || (e = H({ src: e, async: !0 }, t), (t = Et.get(l)) && au(e, t), n = a.createElement("script"), Ve(n), $e(n, "link", e), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, i.set(l, n));
    }
  }
  function Fp(e, t) {
    ta.M(e, t);
    var a = Mi;
    if (a && e) {
      var i = Fa(a).hoistableScripts, l = Oi(e), n = i.get(l);
      n || (n = a.querySelector(vl(l)), n || (e = H({ src: e, async: !0, type: "module" }, t), (t = Et.get(l)) && au(e, t), n = a.createElement("script"), Ve(n), $e(n, "link", e), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, i.set(l, n));
    }
  }
  function nd(e, t, a, i) {
    var l = (l = F.current) ? Nn(l) : null;
    if (!l) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Ci(a.href), a = Fa(
          l
        ).hoistableStyles, i = a.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Ci(a.href);
          var n = Fa(
            l
          ).hoistableStyles, o = n.get(e);
          if (o || (l = l.ownerDocument || l, o = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(e, o), (n = l.querySelector(
            xl(e)
          )) && !n._p && (o.instance = n, o.state.loading = 5), Et.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Et.set(e, a), n || Ip(
            l,
            e,
            a,
            o.state
          ))), t && i === null)
            throw Error(u(528, ""));
          return o;
        }
        if (t && i !== null)
          throw Error(u(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Oi(a), a = Fa(
          l
        ).hoistableScripts, i = a.get(t), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(u(444, e));
    }
  }
  function Ci(e) {
    return 'href="' + vt(e) + '"';
  }
  function xl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function od(e) {
    return H({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Ip(e, t, a, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), $e(t, "link", a), Ve(t), e.head.appendChild(t));
  }
  function Oi(e) {
    return '[src="' + vt(e) + '"]';
  }
  function vl(e) {
    return "script[async]" + e;
  }
  function rd(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + vt(a.href) + '"]'
          );
          if (i)
            return t.instance = i, Ve(i), i;
          var l = H({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), Ve(i), $e(i, "style", l), Dn(i, a.precedence, e), t.instance = i;
        case "stylesheet":
          l = Ci(a.href);
          var n = e.querySelector(
            xl(l)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Ve(n), n;
          i = od(a), (l = Et.get(l)) && tu(i, l), n = (e.ownerDocument || e).createElement("link"), Ve(n);
          var o = n;
          return o._p = new Promise(function(r, s) {
            o.onload = r, o.onerror = s;
          }), $e(n, "link", i), t.state.loading |= 4, Dn(n, a.precedence, e), t.instance = n;
        case "script":
          return n = Oi(a.src), (l = e.querySelector(
            vl(n)
          )) ? (t.instance = l, Ve(l), l) : (i = a, (l = Et.get(n)) && (i = H({}, a), au(i, l)), e = e.ownerDocument || e, l = e.createElement("script"), Ve(l), $e(l, "link", i), e.head.appendChild(l), t.instance = l);
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Dn(i, a.precedence, e));
    return t.instance;
  }
  function Dn(e, t, a) {
    for (var i = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), l = i.length ? i[i.length - 1] : null, n = l, o = 0; o < i.length; o++) {
      var r = i[o];
      if (r.dataset.precedence === t) n = r;
      else if (n !== l) break;
    }
    n ? n.parentNode.insertBefore(e, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function tu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function au(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Un = null;
  function ud(e, t, a) {
    if (Un === null) {
      var i = /* @__PURE__ */ new Map(), l = Un = /* @__PURE__ */ new Map();
      l.set(a, i);
    } else
      l = Un, i = l.get(a), i || (i = /* @__PURE__ */ new Map(), l.set(a, i));
    if (i.has(e)) return i;
    for (i.set(e, null), a = a.getElementsByTagName(e), l = 0; l < a.length; l++) {
      var n = a[l];
      if (!(n[Hi] || n[Xe] || e === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var o = n.getAttribute(t) || "";
        o = e + o;
        var r = i.get(o);
        r ? r.push(n) : i.set(o, [n]);
      }
    }
    return i;
  }
  function cd(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Pp(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
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
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function sd(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function em(e, t, a, i) {
    if (a.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var l = Ci(i.href), n = t.querySelector(
          xl(l)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = jn.bind(e), t.then(e, e)), a.state.loading |= 4, a.instance = n, Ve(n);
          return;
        }
        n = t.ownerDocument || t, i = od(i), (l = Et.get(l)) && tu(i, l), n = n.createElement("link"), Ve(n);
        var o = n;
        o._p = new Promise(function(r, s) {
          o.onload = r, o.onerror = s;
        }), $e(n, "link", i), a.instance = n;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (e.count++, a = jn.bind(e), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var iu = 0;
  function tm(e, t) {
    return e.stylesheets && e.count === 0 && Rn(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(a) {
      var i = setTimeout(function() {
        if (e.stylesheets && Rn(e, e.stylesheets), e.unsuspend) {
          var n = e.unsuspend;
          e.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < e.imgBytes && iu === 0 && (iu = 62500 * Hp());
      var l = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Rn(e, e.stylesheets), e.unsuspend)) {
            var n = e.unsuspend;
            e.unsuspend = null, n();
          }
        },
        (e.imgBytes > iu ? 50 : 800) + t
      );
      return e.unsuspend = a, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(l);
      };
    } : null;
  }
  function jn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Rn(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Hn = null;
  function Rn(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Hn = /* @__PURE__ */ new Map(), t.forEach(am, e), Hn = null, jn.call(e));
  }
  function am(e, t) {
    if (!(t.state.loading & 4)) {
      var a = Hn.get(e);
      if (a) var i = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Hn.set(e, a);
        for (var l = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < l.length; n++) {
          var o = l[n];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (a.set(o.dataset.precedence, o), i = o);
        }
        i && a.set(null, i);
      }
      l = t.instance, o = l.getAttribute("data-precedence"), n = a.get(o) || i, n === i && a.set(null, l), a.set(o, l), this.count++, i = jn.bind(this), l.addEventListener("load", i), l.addEventListener("error", i), n ? n.parentNode.insertBefore(l, n.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), t.state.loading |= 4;
    }
  }
  var yl = {
    $$typeof: ne,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0
  };
  function im(e, t, a, i, l, n, o, r, s) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fn(0), this.hiddenUpdates = Fn(null), this.identifierPrefix = i, this.onUncaughtError = l, this.onCaughtError = n, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function fd(e, t, a, i, l, n, o, r, s, h, z, A) {
    return e = new im(
      e,
      t,
      a,
      o,
      s,
      h,
      z,
      A,
      r
    ), t = 1, n === !0 && (t |= 24), n = ft(3, null, null, t), e.current = n, n.stateNode = e, t = Ro(), t.refCount++, e.pooledCache = t, t.refCount++, n.memoizedState = {
      element: i,
      isDehydrated: a,
      cache: t
    }, Zo(n), e;
  }
  function dd(e) {
    return e ? (e = ri, e) : ri;
  }
  function pd(e, t, a, i, l, n) {
    l = dd(l), i.context === null ? i.context = l : i.pendingContext = l, i = fa(t), i.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (i.callback = n), a = da(e, i, t), a !== null && (ot(a, e, t), Ii(a, e, t));
  }
  function md(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function lu(e, t) {
    md(e, t), (e = e.alternate) && md(e, t);
  }
  function gd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ja(e, 67108864);
      t !== null && ot(t, e, 67108864), lu(e, 67108864);
    }
  }
  function bd(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = bt();
      t = In(t);
      var a = ja(e, t);
      a !== null && ot(a, e, t), lu(e, t);
    }
  }
  var kn = !0;
  function lm(e, t, a, i) {
    var l = _.T;
    _.T = null;
    var n = O.p;
    try {
      O.p = 2, nu(e, t, a, i);
    } finally {
      O.p = n, _.T = l;
    }
  }
  function nm(e, t, a, i) {
    var l = _.T;
    _.T = null;
    var n = O.p;
    try {
      O.p = 8, nu(e, t, a, i);
    } finally {
      O.p = n, _.T = l;
    }
  }
  function nu(e, t, a, i) {
    if (kn) {
      var l = ou(i);
      if (l === null)
        Gr(
          e,
          t,
          i,
          Bn,
          a
        ), xd(e, i);
      else if (rm(
        l,
        e,
        t,
        a,
        i
      ))
        i.stopPropagation();
      else if (xd(e, i), t & 4 && -1 < om.indexOf(e)) {
        for (; l !== null; ) {
          var n = $a(l);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var o = Ca(n.pendingLanes);
                  if (o !== 0) {
                    var r = n;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; o; ) {
                      var s = 1 << 31 - ct(o);
                      r.entanglements[1] |= s, o &= ~s;
                    }
                    Rt(n), (he & 6) === 0 && (yn = rt() + 500, ml(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = ja(n, 2), r !== null && ot(r, n, 2), wn(), lu(n, 2);
            }
          if (n = ou(i), n === null && Gr(
            e,
            t,
            i,
            Bn,
            a
          ), n === l) break;
          l = n;
        }
        l !== null && i.stopPropagation();
      } else
        Gr(
          e,
          t,
          i,
          null,
          a
        );
    }
  }
  function ou(e) {
    return e = ro(e), ru(e);
  }
  var Bn = null;
  function ru(e) {
    if (Bn = null, e = Wa(e), e !== null) {
      var t = N(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = U(t), e !== null) return e;
          e = null;
        } else if (a === 31) {
          if (e = V(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Bn = e, null;
  }
  function hd(e) {
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
          case Su:
            return 2;
          case Au:
            return 8;
          case Tl:
          case Xd:
            return 32;
          case Tu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var uu = !1, za = null, Sa = null, Aa = null, _l = /* @__PURE__ */ new Map(), wl = /* @__PURE__ */ new Map(), Ta = [], om = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function xd(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        za = null;
        break;
      case "dragenter":
      case "dragleave":
        Sa = null;
        break;
      case "mouseover":
      case "mouseout":
        Aa = null;
        break;
      case "pointerover":
      case "pointerout":
        _l.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wl.delete(t.pointerId);
    }
  }
  function zl(e, t, a, i, l, n) {
    return e === null || e.nativeEvent !== n ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: i,
      nativeEvent: n,
      targetContainers: [l]
    }, t !== null && (t = $a(t), t !== null && gd(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function rm(e, t, a, i, l) {
    switch (t) {
      case "focusin":
        return za = zl(
          za,
          e,
          t,
          a,
          i,
          l
        ), !0;
      case "dragenter":
        return Sa = zl(
          Sa,
          e,
          t,
          a,
          i,
          l
        ), !0;
      case "mouseover":
        return Aa = zl(
          Aa,
          e,
          t,
          a,
          i,
          l
        ), !0;
      case "pointerover":
        var n = l.pointerId;
        return _l.set(
          n,
          zl(
            _l.get(n) || null,
            e,
            t,
            a,
            i,
            l
          )
        ), !0;
      case "gotpointercapture":
        return n = l.pointerId, wl.set(
          n,
          zl(
            wl.get(n) || null,
            e,
            t,
            a,
            i,
            l
          )
        ), !0;
    }
    return !1;
  }
  function vd(e) {
    var t = Wa(e.target);
    if (t !== null) {
      var a = N(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = U(a), t !== null) {
            e.blockedOn = t, Du(e.priority, function() {
              bd(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = V(a), t !== null) {
            e.blockedOn = t, Du(e.priority, function() {
              bd(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function qn(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = ou(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var i = new a.constructor(
          a.type,
          a
        );
        oo = i, a.target.dispatchEvent(i), oo = null;
      } else
        return t = $a(a), t !== null && gd(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function yd(e, t, a) {
    qn(e) && a.delete(t);
  }
  function um() {
    uu = !1, za !== null && qn(za) && (za = null), Sa !== null && qn(Sa) && (Sa = null), Aa !== null && qn(Aa) && (Aa = null), _l.forEach(yd), wl.forEach(yd);
  }
  function Zn(e, t) {
    e.blockedOn === t && (e.blockedOn = null, uu || (uu = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      um
    )));
  }
  var Yn = null;
  function _d(e) {
    Yn !== e && (Yn = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Yn === e && (Yn = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], i = e[t + 1], l = e[t + 2];
          if (typeof i != "function") {
            if (ru(i || a) === null)
              continue;
            break;
          }
          var n = $a(a);
          n !== null && (e.splice(t, 3), t -= 3, or(
            n,
            {
              pending: !0,
              data: l,
              method: a.method,
              action: i
            },
            i,
            l
          ));
        }
      }
    ));
  }
  function Ni(e) {
    function t(s) {
      return Zn(s, e);
    }
    za !== null && Zn(za, e), Sa !== null && Zn(Sa, e), Aa !== null && Zn(Aa, e), _l.forEach(t), wl.forEach(t);
    for (var a = 0; a < Ta.length; a++) {
      var i = Ta[a];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ta.length && (a = Ta[0], a.blockedOn === null); )
      vd(a), a.blockedOn === null && Ta.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (i = 0; i < a.length; i += 3) {
        var l = a[i], n = a[i + 1], o = l[et] || null;
        if (typeof n == "function")
          o || _d(a);
        else if (o) {
          var r = null;
          if (n && n.hasAttribute("formAction")) {
            if (l = n, o = n[et] || null)
              r = o.formAction;
            else if (ru(l) !== null) continue;
          } else r = o.action;
          typeof r == "function" ? a[i + 1] = r : (a.splice(i, 3), i -= 3), _d(a);
        }
      }
  }
  function wd() {
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
    function t() {
      l !== null && (l(), l = null), i || setTimeout(a, 20);
    }
    function a() {
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
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), l !== null && (l(), l = null);
      };
    }
  }
  function cu(e) {
    this._internalRoot = e;
  }
  Qn.prototype.render = cu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(u(409));
    var a = t.current, i = bt();
    pd(a, i, e, t, null, null);
  }, Qn.prototype.unmount = cu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      pd(e.current, 2, null, e, null, null), wn(), t[Ka] = null;
    }
  };
  function Qn(e) {
    this._internalRoot = e;
  }
  Qn.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Nu();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < Ta.length && t !== 0 && t < Ta[a].priority; a++) ;
      Ta.splice(a, 0, e), a === 0 && vd(e);
    }
  };
  var zd = g.version;
  if (zd !== "19.2.0")
    throw Error(
      u(
        527,
        zd,
        "19.2.0"
      )
    );
  O.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(u(188)) : (e = Object.keys(e).join(","), Error(u(268, e)));
    return e = w(t), e = e !== null ? B(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var cm = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ln = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ln.isDisabled && Ln.supportsFiber)
      try {
        Di = Ln.inject(
          cm
        ), ut = Ln;
      } catch {
      }
  }
  return Al.createRoot = function(e, t) {
    if (!C(e)) throw Error(u(299));
    var a = !1, i = "", l = Cs, n = Os, o = Ns;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = fd(
      e,
      1,
      !1,
      null,
      null,
      a,
      i,
      null,
      l,
      n,
      o,
      wd
    ), e[Ka] = t.current, Vr(e), new cu(t);
  }, Al.hydrateRoot = function(e, t, a) {
    if (!C(e)) throw Error(u(299));
    var i = !1, l = "", n = Cs, o = Os, r = Ns, s = null;
    return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (o = a.onCaughtError), a.onRecoverableError !== void 0 && (r = a.onRecoverableError), a.formState !== void 0 && (s = a.formState)), t = fd(
      e,
      1,
      !0,
      t,
      a ?? null,
      i,
      l,
      s,
      n,
      o,
      r,
      wd
    ), t.context = dd(null), a = t.current, i = bt(), i = In(i), l = fa(i), l.callback = null, da(a, l, i), a = i, t.current.lanes = a, ji(t, a), Rt(t), e[Ka] = t.current, Vr(e), new Qn(t);
  }, Al.version = "19.2.0", Al;
}
var jd;
function Dm() {
  if (jd) return gu.exports;
  jd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (g) {
        console.error(g);
      }
  }
  return c(), gu.exports = Nm(), gu.exports;
}
var Um = Dm();
const jm = ["small", "standard", "large"], Hm = [
  { label: "FULL SCORE", value: "full-score" },
  { label: "SCORE BAR", value: "score-bar" },
  { label: "MINIMAL", value: "minimal" }
], Rm = [
  { label: "Top left", value: "top-left" },
  { label: "Top right", value: "top-right" },
  { label: "Bottom left", value: "bottom-left" },
  { label: "Bottom right", value: "bottom-right" },
  { label: "Bottom center", value: "bottom-center" }
];
function km() {
  var c;
  (c = window.document.querySelector("[data-scoreboard-display-trigger]")) == null || c.focus();
}
function Bm({
  automatic: c,
  layout: g,
  onAutomaticChange: y,
  onClose: u,
  onLayoutChange: C,
  onPositionChange: N,
  onReset: U,
  onSizeChange: V,
  onRestoreFocus: p = km,
  children: w,
  position: B,
  size: H
}) {
  const W = X.useRef(null), Z = X.useRef(u);
  return Z.current = u, X.useEffect(() => {
    var ce, D;
    (D = (ce = W.current) == null ? void 0 : ce.querySelector("button")) == null || D.focus();
    const J = () => {
      Z.current(), window.requestAnimationFrame(p);
    }, be = (le) => {
      var _e, $, we;
      if (le.key === "Escape") {
        J();
        return;
      }
      if (le.key !== "Tab") return;
      const ne = Array.from(
        ((_e = W.current) == null ? void 0 : _e.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )) ?? []
      );
      if (ne.length === 0) return;
      const G = ne[0], te = ne[ne.length - 1];
      le.shiftKey && (($ = W.current) == null ? void 0 : $.getRootNode()).activeElement === G ? (le.preventDefault(), te.focus()) : !le.shiftKey && ((we = W.current) == null ? void 0 : we.getRootNode()).activeElement === te && (le.preventDefault(), G.focus());
    };
    return document.addEventListener("keydown", be), () => {
      document.removeEventListener("keydown", be);
    };
  }, []), /* @__PURE__ */ E.jsx(
    "div",
    {
      "data-scoreboard-display-backdrop": !0,
      style: { position: "fixed", inset: 0, zIndex: 9, pointerEvents: "auto" },
      onClick: (J) => {
        J.target === J.currentTarget && (Z.current(), window.requestAnimationFrame(p));
      },
      children: /* @__PURE__ */ E.jsxs(
        "div",
        {
          "aria-label": "Scoreboard display",
          "aria-modal": "true",
          className: "scoreboard-display-menu",
          ref: W,
          role: "dialog",
          children: [
            /* @__PURE__ */ E.jsx("span", { "aria-hidden": "true", className: "scoreboard-display-menu__handle" }),
            /* @__PURE__ */ E.jsx("strong", { children: "SCOREBOARD DISPLAY" }),
            /* @__PURE__ */ E.jsx("p", { children: "This changes only your display." }),
            /* @__PURE__ */ E.jsx("span", { className: "scoreboard-display-menu__label", children: "LAYOUT" }),
            /* @__PURE__ */ E.jsx("div", { className: "scoreboard-display-menu__layouts", children: Hm.map((J) => /* @__PURE__ */ E.jsxs(
              "button",
              {
                "aria-label": `Use ${J.label.toLowerCase()} layout`,
                "aria-pressed": g === J.value,
                className: "scoreboard-display-menu__layout",
                onClick: () => C(J.value),
                type: "button",
                children: [
                  g === J.value ? /* @__PURE__ */ E.jsx("span", { className: "scoreboard-display-menu__check", children: /* @__PURE__ */ E.jsx(du, { "aria-hidden": "true", size: 16, strokeWidth: 3 }) }) : null,
                  /* @__PURE__ */ E.jsxs(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: `scoreboard-layout-preview scoreboard-layout-preview--${J.value}`,
                      children: [
                        /* @__PURE__ */ E.jsx("i", {}),
                        /* @__PURE__ */ E.jsx("i", {}),
                        /* @__PURE__ */ E.jsx("i", {})
                      ]
                    }
                  ),
                  J.value === "score-bar" ? /* @__PURE__ */ E.jsx("small", { children: "COURTSIDEVIEW DEFAULT" }) : null,
                  /* @__PURE__ */ E.jsx("b", { children: J.label })
                ]
              },
              J.value
            )) }),
            /* @__PURE__ */ E.jsx("span", { className: "scoreboard-display-menu__label", children: "SIZE" }),
            /* @__PURE__ */ E.jsx("div", { className: "scoreboard-display-menu__options", children: jm.map((J) => /* @__PURE__ */ E.jsxs(
              "button",
              {
                "aria-pressed": H === J,
                onClick: () => V(J),
                type: "button",
                children: [
                  J.toUpperCase(),
                  H === J ? /* @__PURE__ */ E.jsx("span", { className: "scoreboard-display-menu__option-check", children: /* @__PURE__ */ E.jsx(du, { "aria-hidden": "true", size: 13, strokeWidth: 3 }) }) : null
                ]
              },
              J
            )) }),
            /* @__PURE__ */ E.jsx("span", { className: "scoreboard-display-menu__label", children: "POSITION" }),
            /* @__PURE__ */ E.jsx("div", { className: "scoreboard-display-menu__options scoreboard-display-menu__positions", children: Rm.map((J) => /* @__PURE__ */ E.jsxs(
              "button",
              {
                "aria-pressed": B === J.value,
                onClick: () => N(J.value),
                type: "button",
                children: [
                  /* @__PURE__ */ E.jsx(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: `scoreboard-position-icon scoreboard-position-icon--${J.value}`,
                      children: /* @__PURE__ */ E.jsx("i", {})
                    }
                  ),
                  /* @__PURE__ */ E.jsx("span", { className: "scoreboard-sr-only", children: J.label }),
                  B === J.value ? /* @__PURE__ */ E.jsx("span", { className: "scoreboard-display-menu__position-check", children: /* @__PURE__ */ E.jsx(du, { "aria-hidden": "true", size: 12, strokeWidth: 3 }) }) : null
                ]
              },
              J.value
            )) }),
            /* @__PURE__ */ E.jsxs(
              "button",
              {
                "aria-checked": c,
                className: "scoreboard-display-menu__automatic",
                onClick: () => y(!c),
                role: "switch",
                type: "button",
                children: [
                  /* @__PURE__ */ E.jsxs("span", { children: [
                    /* @__PURE__ */ E.jsx("b", { children: "AUTOMATIC" }),
                    /* @__PURE__ */ E.jsx("small", { children: "Adjust by screen orientation" })
                  ] }),
                  /* @__PURE__ */ E.jsx("i", { className: "scoreboard-display-menu__switch", "data-on": c, children: /* @__PURE__ */ E.jsx("span", {}) })
                ]
              }
            ),
            /* @__PURE__ */ E.jsx(
              "button",
              {
                className: "scoreboard-display-menu__reset",
                onClick: U,
                type: "button",
                children: "Use CourtsideView default"
              }
            ),
            w
          ]
        }
      )
    }
  );
}
const qm = "cloudflare://fanview-live", Zm = 900 * 1e3, aa = (c) => c !== null && typeof c == "object" && !Array.isArray(c) ? c : {}, Ue = (c, g = 0) => typeof c == "number" && Number.isFinite(c) ? c : g, Fe = (c, g = "") => typeof c == "string" && c.trim() ? c.trim() : g, Ym = (c, g) => c === "bo5" && g === 5 || c !== "bo5" && g === 3 ? 15 : 25, Qm = (c) => {
  const g = Ue(c.homeScore, Ue(c.myTeamScore)), y = Ue(c.awayScore, Ue(c.opponentScore)), u = Ue(c.currentSet, 1), C = Array.isArray(c.feed) ? c.feed : [];
  for (const N of C) {
    const U = aa(N);
    if (U.type !== "SCORE" || Ue(U.setNumber, u) !== u) continue;
    const p = Ue(U.myTeamScore, Number.NaN), w = Ue(U.opponentScore, Number.NaN);
    if (Number.isFinite(p) && Number.isFinite(w) && p + w > g + y)
      return { home: p, away: w };
  }
  return { home: g, away: y };
}, Lm = (c) => (Array.isArray(c.feed) ? c.feed : []).map((y, u) => {
  const C = aa(y), N = Fe(C.message);
  return !N || /^Score corrected\b/i.test(N) ? null : {
    id: Fe(C.id) || `${Fe(C.timestamp, "activity")}-${u}`,
    message: N,
    team: C.team === "myTeam" ? "home" : C.team === "opponent" ? "away" : "neutral",
    timestamp: Fe(C.timestamp) || void 0
  };
}).filter((y) => y !== null).slice(0, 40), Vm = (c, g, y) => (Array.isArray(c.completedSets) ? c.completedSets : Array.isArray(c.sets) ? c.sets : []).map((C, N) => {
  const U = aa(C), V = Ue(
    U.homeScore,
    Ue(U.myTeamScore, Ue(U.us, Number.NaN))
  ), p = Ue(
    U.awayScore,
    Ue(U.opponentScore, Ue(U.them, Number.NaN))
  );
  return !Number.isFinite(V) || !Number.isFinite(p) ? null : {
    setNumber: Ue(U.setNumber, N + 1),
    homeScore: V,
    awayScore: p
  };
}).filter((C) => C !== null).filter((C) => y || C.setNumber < g).sort((C, N) => C.setNumber - N.setNumber), Gm = (c, g) => {
  var W, Z;
  const y = aa(c.currentActivity), u = aa(c.latestFeed), C = Fe(y.type).toUpperCase(), N = Fe(u.text), V = Fe(y.message) || N;
  if (!(C === "TIMEOUT" || /\btimeout(?:\s+called\s+by|\s+in\s+progress)?\b/i.test(V))) return;
  const w = Fe(y.team);
  if (w === "myTeam") return Fe(g.home_name) || void 0;
  if (w === "opponent") return Fe(g.away_name) || void 0;
  const B = (W = V.match(/timeout called by\s+([^·:]+?)(?:\s*·|$)/i)) == null ? void 0 : W[1];
  if (B != null && B.trim()) return B.trim();
  const H = (Z = V.match(/^(.+?)\s+timeout in progress\b/i)) == null ? void 0 : Z[1];
  return (H == null ? void 0 : H.trim()) || void 0;
}, Xm = (c, g) => {
  const y = Fe(aa(c.state).videoType).toLowerCase(), u = y === "fanview-live-landscape-left" ? -90 : y === "fanview-live-landscape-right" ? 90 : y === "fanview-live-portrait-down" ? 180 : void 0;
  return c.video_type === "cloudflare_realtime" && c.video_url && c.video_url !== qm || (g == null ? void 0 : g.isLive) === !0 ? {
    kind: "cloudflare-realtime",
    streamId: c.share_id,
    rotation: u,
    alt: "Live volleyball broadcast."
  } : (c.video_type === "youtube" || c.video_type === "youtube_live") && c.video_url ? {
    kind: "youtube",
    url: c.video_url,
    alt: "Live volleyball broadcast."
  } : { kind: "none", alt: "No live video is currently available." };
};
function Jm(c, g = null) {
  const y = aa(c.state), u = Qm(y), C = Ue(y.currentSet, 1), N = c.updated_at || c.created_at || (/* @__PURE__ */ new Date()).toISOString(), U = aa(y.latestFeed), V = aa(y.currentActivity), p = c.is_complete ? Date.parse(c.ended_at || N) : Number.NaN;
  return {
    shareId: c.share_id,
    match: {
      setNumber: C,
      setTarget: Ue(
        y.setTarget,
        Ym(c.format, C)
      ),
      totalSets: Ue(y.totalSets, c.format === "bo5" ? 5 : 3),
      homeSetsWon: Ue(
        y.homeSetsWon,
        Ue(y.myTeamSetsWon)
      ),
      awaySetsWon: Ue(
        y.awaySetsWon,
        Ue(y.opponentSetsWon)
      ),
      completedSets: Vm(y, C, c.is_complete),
      timeoutTeamName: Gm(y, c),
      isComplete: c.is_complete,
      isLive: !c.is_complete,
      updatedAt: N,
      teamHub: c.team_slug && c.team_name ? { slug: c.team_slug, name: c.team_name } : void 0,
      home: {
        name: Fe(c.home_name, "Home"),
        score: u.home,
        color: Fe(c.home_color, "#1556C0")
      },
      away: {
        name: Fe(c.away_name, "Away"),
        score: u.away,
        color: Fe(c.away_color, "#EA2850")
      }
    },
    media: Xm(c, g),
    viewerCount: Math.max(0, Ue(g == null ? void 0 : g.viewerCount)),
    activity: Lm(y),
    latestAction: Fe(U.text) || Fe(V.message) || void 0,
    connection: "connected",
    expiresAt: Number.isFinite(p) ? new Date(p + Zm).toISOString() : void 0
  };
}
const qd = "courtsideview_fanview_broadcaster_display_v1", Zd = {
  layout: "score-bar",
  size: "standard",
  position: "bottom-center",
  automatic: !1
};
function Yd(c) {
  if (!c || typeof c != "object") return !1;
  const g = c;
  return ["full-score", "score-bar", "minimal"].includes(g.layout) && ["small", "standard", "large"].includes(g.size) && ["top-left", "top-right", "bottom-left", "bottom-right", "bottom-center"].includes(g.position) && typeof g.automatic == "boolean";
}
const Km = () => {
  try {
    const c = JSON.parse(localStorage.getItem(qd) || "null");
    if (Yd(c)) return c;
  } catch {
  }
  return { ...Zd };
};
function Wm(c) {
  const [g, y] = X.useState(window.innerHeight >= window.innerWidth);
  X.useEffect(() => {
    const U = () => y(window.innerHeight >= window.innerWidth);
    return window.addEventListener("resize", U), () => window.removeEventListener("resize", U);
  }, []);
  const u = c.preference, C = (U) => c.onPreference({ ...u, ...U }), N = u.automatic ? g ? "full-score" : "score-bar" : u.layout;
  return /* @__PURE__ */ E.jsx(
    "main",
    {
      className: "fanview-app broadcast-display",
      "data-scoreboard-size": u.size,
      "data-scoreboard-layout": N,
      "data-scoreboard-position": u.position,
      "data-scoreboard-automatic": u.automatic,
      children: /* @__PURE__ */ E.jsxs("section", { className: "match-stage", "aria-label": "Broadcast scoreboard", children: [
        c.match && !c.error ? /* @__PURE__ */ E.jsx(Sm, { match: c.match, layout: N }) : null,
        c.open ? /* @__PURE__ */ E.jsx(E.Fragment, { children: /* @__PURE__ */ E.jsxs(
          Bm,
          {
            automatic: u.automatic,
            layout: u.layout,
            size: u.size,
            position: u.position,
            onAutomaticChange: (U) => C({ automatic: U }),
            onLayoutChange: (U) => C({ layout: U, automatic: !1 }),
            onSizeChange: (U) => C({ size: U }),
            onPositionChange: (U) => C({ position: U }),
            onReset: () => c.onPreference({ ...Zd }),
            onClose: c.onClose,
            onRestoreFocus: c.restoreFocus,
            children: [
              c.error ? /* @__PURE__ */ E.jsxs("div", { className: "broadcast-display-recovery", role: "status", children: [
                /* @__PURE__ */ E.jsx("span", { children: "Scoreboard unavailable." }),
                /* @__PURE__ */ E.jsx("button", { type: "button", onClick: c.onRetry, children: "Retry" })
              ] }) : c.match ? null : /* @__PURE__ */ E.jsx("div", { className: "broadcast-display-recovery", role: "status", children: "Loading score…" }),
              /* @__PURE__ */ E.jsx("button", { type: "button", onClick: c.onClose, children: "Done" })
            ]
          }
        ) }) : null
      ] })
    }
  );
}
const $m = `
:host { position:fixed; inset:0; z-index:9; pointer-events:none; color:#fff; background:transparent; }
.broadcast-display, .broadcast-display .match-stage { position:absolute; inset:0; width:100%; height:100%; min-height:0; background:transparent; overflow:visible; }
.broadcast-display .score-bug { pointer-events:none; }
.broadcast-display[data-scoreboard-position^="bottom"] .score-bug { bottom:var(--broadcast-dock-inset,100px); }
.broadcast-display[data-scoreboard-position^="top"] .score-bug { top:max(56px,calc(env(safe-area-inset-top) + 48px)); }
.broadcast-display .scoreboard-display-menu { pointer-events:auto; z-index:50; max-height:calc(100dvh - 32px); overflow:auto; top:16px; bottom:auto; }
.broadcast-display-recovery { padding:8px 12px; border-radius:12px; background:#101827; display:flex; gap:10px; align-items:center; pointer-events:auto; }
.broadcast-display-recovery button { min-height:44px; min-width:44px; color:#fff; background:#101827; border:1px solid #8c9caf; border-radius:8px; }
`;
function Fm(c, g) {
  var ne;
  const y = c.attachShadow({ mode: "open" }), u = document.createElement("style");
  if (u.textContent = `@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Regular-C2UfmnDu.ttf) format("truetype");font-style:normal;font-weight:400;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Medium-C2x3RLjU.ttf) format("truetype");font-style:normal;font-weight:500;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-SemiBold-BAz3r7B9.ttf) format("truetype");font-style:normal;font-weight:600;font-display:swap}:root{--cv-font: "CV Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;--font-display: var(--cv-font);--font-sans: var(--cv-font);--font-body: var(--cv-font);font-family:var(--cv-font);font-synthesis:none}body,button,input,textarea,select{font-family:var(--cv-font);font-synthesis:none}body,input,textarea,select{font-weight:400}h1,h2,h3,h4,h5,h6,strong,b,th,button{font-weight:600}:root,:host{--cv-face-light: linear-gradient(135deg, #fff 0%, #fcfdfe 42%, #f2f5f8 100%);--cv-face-dark: linear-gradient(135deg, #29353c 0%, #101b21 42%, #142127 100%);--cv-card-face: var(--cv-face-light);--cv-card-line: #e3e9ef;--cv-card-rim: #e2e8ee;--cv-card-reflection: rgba(255,255,255,.95);--cv-card-shadow: rgba(16,24,32,.12);--cv-primary-material: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20350%2056'%20preserveAspectRatio='none'%3e%3cdefs%3e%3clinearGradient%20id='home-action'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2325ED96'/%3e%3cstop%20offset='100%25'%20stop-color='%2300CFA5'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20d='M14%200H340Q350%200%20350%2010V42Q350%2044%20348%2046L340%2054Q338%2056%20335%2056H8Q0%2056%200%2048V15Q0%2012%202%2010L10%202Q12%200%2014%200Z'%20fill='url(%23home-action)'/%3e%3c/svg%3e")}.cv-dark-material{--cv-card-face: var(--cv-face-dark);--cv-card-line: #40535e;--cv-card-rim: #0b141b;--cv-card-reflection: rgba(225,240,249,.12);--cv-card-shadow: rgba(0,0,0,.28)}.cv-raised-surface{background:var(--cv-card-face);border-color:var(--cv-card-line);box-shadow:inset 0 1px 0 var(--cv-card-reflection),inset 0 -5px 0 var(--cv-card-rim),0 5px 12px var(--cv-card-shadow)}:is(a,button).cv-primary-action,[data-cv-product] .cv-primary-action,body:not(.camera-mode) [data-cv-primary-action]{display:inline-flex;min-width:0;min-height:56px;max-width:100%;align-items:center;justify-content:space-between;gap:16px;border:0;border-radius:0;padding:14px 27px;color:#061b13;background:var(--cv-primary-material) center / 100% 100% no-repeat;font-family:var(--cv-font);font-size:22px;line-height:28px;font-weight:600;letter-spacing:0;text-align:left;text-transform:none;text-decoration:none;white-space:normal;overflow-wrap:anywhere;overflow:visible;box-shadow:0 4px 12px #00a86e21}.cv-primary-action:before,body:not(.camera-mode) [data-cv-primary-action]:before{display:none!important}.cv-primary-action:after,body:not(.camera-mode) [data-cv-primary-action]:after{content:"";display:block;width:24px;height:24px;flex:0 0 24px;background:currentColor;-webkit-mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat;mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat}.cv-primary-action[data-cv-action=team]{--cv-action-glyph: url(/assets/fanview-production/assets/team-section-CMCCqbvK.svg)}.cv-primary-action[data-cv-action=fanview],[data-cv-primary-action][data-cv-action=fanview]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M35.8%2050A14.2%2014.2%200%201%200%2064.2%2050A14.2%2014.2%200%201%200%2035.8%2050ZM12.1755%2020.4482A48%2048%200%200%200%2012.1755%2079.5518L19.2676%2074.0108A39%2039%200%200%201%2019.2676%2025.9892ZM25.5717%2030.9145A31%2031%200%200%200%2025.5717%2069.0855L32.6638%2063.5446A22%2022%200%200%201%2032.6638%2036.4554ZM87.8245%2020.4482A48%2048%200%200%201%2087.8245%2079.5518L80.7324%2074.0108A39%2039%200%200%200%2080.7324%2025.9892ZM74.4283%2030.9145A31%2031%200%200%201%2074.4283%2069.0855L67.3362%2063.5446A22%2022%200%200%200%2067.3362%2036.4554Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=games]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14%2014H24V7A4%204%200%200%201%2032%207V14H68V7A4%204%200%200%201%2076%207V14H86Q98%2014%2098%2026V86Q98%2098%2086%2098H14Q2%2098%202%2086V26Q2%2014%2014%2014ZM13%2043V85Q13%2088%2016%2088H84Q87%2088%2087%2085V43ZM23%2025A5%205%200%201%200%2033%2025A5%205%200%201%200%2023%2025ZM67%2025A5%205%200%201%200%2077%2025A5%205%200%201%200%2067%2025ZM23.8%2058A5.2%205.2%200%201%200%2034.2%2058A5.2%205.2%200%201%200%2023.8%2058ZM44.8%2058A5.2%205.2%200%201%200%2055.2%2058A5.2%205.2%200%201%200%2044.8%2058ZM65.8%2058A5.2%205.2%200%201%200%2076.2%2058A5.2%205.2%200%201%200%2065.8%2058ZM23.8%2077A5.2%205.2%200%201%200%2034.2%2077A5.2%205.2%200%201%200%2023.8%2077ZM44.8%2077A5.2%205.2%200%201%200%2055.2%2077A5.2%205.2%200%201%200%2044.8%2077ZM65.8%2077A5.2%205.2%200%201%200%2076.2%2077A5.2%205.2%200%201%200%2065.8%2077Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=coach]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14.288%2045.035C13.434%2045.425%2012.955%2044.911%2012.126%2044.772C10.714%2044.535%208.152%2044.395%206.828%2044.963C4.655%2045.896%202.887%2047.492%202.124%2049.821C0.961%2053.377%202.899%2058.244%206.470%2059.570C7.926%2060.111%209.584%2060.547%2011.148%2060.189C12.092%2059.973%2013.389%2059.032%2014.331%2059.440C15.327%2060.564%2015.576%2062.640%2016.214%2063.999C17.393%2066.510%2019.174%2069.185%2021.168%2071.108C25.302%2075.095%2030.512%2077.628%2036.207%2078.036C37.298%2078.115%2038.165%2078.614%2039.312%2078.574C40.012%2078.549%2040.528%2078.217%2041.192%2078.084C43.912%2077.541%2046.503%2077.203%2049.160%2076.207C52.964%2074.780%2056.705%2071.563%2059.257%2068.456C61.510%2065.713%2063.192%2061.784%2064.060%2058.367C64.481%2056.711%2064.001%2053.475%2065.486%2052.323C66.224%2051.751%2067.505%2051.573%2068.389%2051.294C70.248%2050.706%2072.077%2050.139%2073.944%2049.622C75.202%2049.274%2076.304%2048.637%2077.516%2048.191C81.856%2046.591%2086.375%2045.467%2090.697%2043.816C92.763%2043.026%2096.195%2042.741%2097.819%2041.208C98.466%2039.690%2098.000%2037.188%2098.000%2035.543C98.000%2033.673%2098.666%2030.224%2097.778%2028.555C97.075%2027.236%2094.882%2026.364%2093.736%2025.443C92.231%2024.233%2090.186%2022.014%2088.287%2021.504C86.799%2021.105%2084.860%2021.422%2083.324%2021.422C79.714%2021.422%2076.105%2021.422%2072.496%2021.422C65.832%2021.422%2059.169%2021.422%2052.505%2021.422C48.901%2021.422%2044.833%2020.889%2041.277%2021.462C36.110%2022.293%2030.187%2024.630%2026.049%2027.933C23.240%2030.176%2019.752%2033.494%2018.091%2036.691C17.213%2038.380%2016.222%2040.103%2015.514%2041.870C15.121%2042.851%2015.033%2044.261%2014.288%2045.035Z%20M5.785%2052.240A4.041%204.041%200%201%200%2013.867%2052.240A4.041%204.041%200%201%200%205.785%2052.240Z%20M27.641%2049.881A10.760%2010.760%200%201%200%2049.162%2049.881A10.760%2010.760%200%201%200%2027.641%2049.881Z%20M90.731%2027.354C91.155%2031.660%2084.825%2029.967%2082.385%2030.337C74.035%2031.605%2065.379%2031.182%2057.034%2032.482C54.873%2032.819%2051.849%2031.490%2051.532%2029.033C51.038%2025.201%2056.604%2025.306%2058.930%2025.306C66.982%2025.306%2075.035%2025.306%2083.087%2025.306C85.159%2025.306%2089.846%2024.734%2090.731%2027.354Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=home]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M50%202L94.5%2040.5Q98%2043.5%2098%2047.5V91Q98%2098%2091%2098H65V78C65%2058%2035%2058%2035%2078V98H9Q2%2098%202%2091V47.5Q2%2043.5%205.5%2040.5Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action:disabled,.cv-primary-action[aria-disabled=true]{opacity:.5}.cv-primary-action:focus-visible{outline:3px solid #1b70db;outline-offset:4px}:root{color:#111827;background:#050a13;--fanview-font-body: var(--cv-font);--fanview-font-control: var(--cv-font);--fanview-font-display: var(--cv-font);--font-sans: var(--fanview-font-body);--font-control: var(--fanview-font-control);--font-display: var(--fanview-font-display);font-family:var(--fanview-font-body);font-synthesis:none;text-rendering:optimizeLegibility;--fanview-navy-950: #111827;--fanview-pink-500: #f22b78;--fanview-pink-700: #ce155f;--fanview-paper: #fffdfb;--fanview-blush: #fff2f7;--fanview-muted: #596273;--fanview-live-red: #e53935;--fanview-live-green: #39d98a;--fanview-line: rgba(15, 23, 42, .1)}*{box-sizing:border-box}html,body,#root{width:100%;min-height:100%;margin:0}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}body{min-height:100dvh;overflow:hidden;-webkit-font-smoothing:antialiased}input{font:inherit}button{font-family:var(--fanview-font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase;-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible,[role=button]:focus-visible{outline:3px solid rgba(242,43,120,.35);outline-offset:2px}.fanview-app,.match-stage{position:relative;width:100vw;height:100dvh;min-height:460px;overflow:hidden;background:#050a13}.match-stage__media{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center}.match-stage__shade{position:absolute;top:0;right:0;bottom:0;left:0;background:#02060c2e;pointer-events:none}.match-stage__empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;background:#0d131d}.court-outline{position:relative;width:min(760px,82vw);aspect-ratio:2.25 / 1;border:2px solid rgba(255,255,255,.12);transform:perspective(480px) rotateX(58deg)}.court-outline__net{position:absolute;top:50%;right:-4%;left:-4%;border-top:2px solid rgba(255,255,255,.18)}.live-pill,.viewer-pill{position:absolute;z-index:3;top:max(28px,env(safe-area-inset-top));display:inline-flex;min-height:38px;align-items:center;justify-content:center;border-radius:8px;color:#fff;box-shadow:0 8px 22px #00000040;font-size:15px;font-weight:600}.live-pill{left:max(28px,env(safe-area-inset-left));gap:8px;padding:0 14px;background:var(--fanview-live-red)}.live-pill__dot{width:9px;height:9px;border-radius:999px;background:#fff}.viewer-pill{right:max(28px,env(safe-area-inset-right));gap:8px;min-width:74px;border:1px solid rgba(255,255,255,.55);padding:0 12px;background:#03080fb8;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-community-enabled=true] .viewer-pill{right:418px}.score-bug{position:absolute;z-index:3;bottom:36px;left:28px;width:min(460px,calc(100vw - 470px));min-width:320px;border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:8px;color:#fff;background:#050e1af5;box-shadow:0 16px 38px #00000059;font-variant-numeric:tabular-nums}.score-bug__timeout{display:flex;min-height:48px;align-items:center;gap:9px;margin-bottom:8px;border:1px solid rgba(255,184,31,.42);border-left:5px solid #ffb81f;border-radius:8px;padding:0 12px;color:#ffb81f;background:#ffb81f0f;font-size:13px;font-weight:600;letter-spacing:.02em}.score-bug__timeout-icon{flex:0 0 auto}.score-bug__ledger{overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:11px}.score-bug__header,.score-bug__row{display:grid;width:100%}.score-bug__header{min-height:42px;border-bottom:1px solid rgba(255,255,255,.22);color:#c7cfdb}.score-bug__format,.score-bug__set-heading{display:flex;align-items:center;justify-content:center;padding:0 8px;font-size:11px;font-weight:600;letter-spacing:.09em}.score-bug__format{justify-content:flex-start;padding-left:16px}.score-bug__set-heading{gap:5px;border-left:1px solid rgba(255,255,255,.22)}.score-bug__set-heading small{display:inline-flex;align-items:center;gap:4px;color:#ff3f75;font-size:8px;letter-spacing:.03em}.score-bug__set-heading small i{width:7px;height:7px;border-radius:999px;background:#ff3f75}.score-bug__row{height:82px}.score-bug__row+.score-bug__row{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team{display:flex;min-width:0;align-items:center;gap:11px;padding:10px 14px;background:#02091261}.score-bug__team-mark{display:grid;width:46px;height:46px;flex:0 0 46px;place-items:center;border:1px solid rgba(255,255,255,.5);border-radius:11px;font-size:14px;font-weight:600;letter-spacing:-.03em}.score-bug__team-copy{display:grid;min-width:0;gap:4px}.score-bug__team-copy>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:-.015em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__team-copy>small{color:#c3cbd6;font-size:9px;font-weight:600;letter-spacing:.1em}.score-bug__team-copy>small b{color:#fff;font-size:11px}.score-bug__set-cell{position:relative;display:grid;min-width:0;place-items:center;border-left:1px solid rgba(255,255,255,.22);color:#aeb7c4}.score-bug__set-cell.is-live{color:#fff}.score-bug__set-cell.is-winner{color:#60df9d;background:#15704847;box-shadow:inset 0 3px #67e1a3}.score-bug__cell-score{font-size:25px;font-weight:600;line-height:1}.score-bug__winner-badge{position:absolute;top:7px;right:7px;display:grid;width:18px;height:18px;place-items:center;border-radius:5px;color:#fff;background:#2b8655;font-size:10px;font-weight:600}.match-status{position:absolute;z-index:4;top:78px;left:50%;border-radius:999px;padding:8px 12px;color:#fff;background:#111827e6;font-size:12px;font-weight:500;transform:translate(-50%)}.community-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;display:none;border:0;background:transparent}.community-panel{position:fixed;z-index:10;top:14px;right:14px;bottom:14px;display:grid;width:min(390px,calc(100vw - 28px));grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.8);border-radius:26px;color:var(--fanview-navy-950);background:var(--cv-face-light);box-shadow:inset 0 1px #fff,inset 0 -5px #e2e8ee,0 28px 70px #00000047;transform:translate(calc(100% + 32px));transition:transform .18s ease}.community-panel[data-open=true]{transform:translate(0)}.community-panel--broadcaster{top:52px;grid-template-rows:auto minmax(0,1fr);height:auto}.community-scrim[hidden],.community-panel[hidden]{display:none!important}.community-panel:focus{outline:none}.community-handle{display:none}.community-header{display:grid;min-width:0;grid-template-columns:minmax(0,1fr) 42px;align-items:center;gap:12px;padding:26px 22px 12px}.community-header__copy{min-width:0}.community-eyebrow{margin-bottom:6px;color:var(--fanview-pink-500);font-size:11px;font-family:var(--font-control);font-weight:500;letter-spacing:.04em}.community-header h1{display:-webkit-box;overflow:hidden;margin:0;font-size:clamp(20px,1.65vw,23px);font-family:var(--font-display);font-weight:600;letter-spacing:-.035em;line-height:1.12;white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}.community-header p{display:flex;align-items:center;gap:8px;margin:7px 0 0;color:var(--fanview-muted);font-size:13px;font-weight:500}.presence-dot{width:9px;height:9px;border-radius:999px;background:#42a767}.icon-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;color:var(--fanview-navy-950);background:#fff;cursor:pointer}.safety-notice{display:flex;min-height:39px;align-items:center;gap:9px;margin:0 20px;border:1px solid rgba(242,43,120,.18);border-radius:7px;padding:8px 10px;color:#3f3542;background:var(--fanview-blush);font-size:10px;font-weight:500;line-height:1.25}.safety-notice svg{flex:0 0 auto;color:var(--fanview-pink-500)}.community-feed{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:19px 20px 16px;scrollbar-width:thin}.community-feed h2{margin:0 0 19px;color:#626875;font-size:11px;font-weight:500;letter-spacing:.055em}.community-message{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;margin-bottom:16px}.community-avatar{display:grid;width:42px;height:42px;place-items:center;border-radius:999px;color:#292543;font-size:15px;font-weight:500}.community-avatar[data-tone=lavender]{background:#eee8ff}.community-avatar[data-tone=blue]{background:#dfebff}.community-avatar[data-tone=green]{background:#dff3e5}.community-avatar[data-tone=gold]{background:#ffe6a1}.community-message__content{min-width:0}.community-message__header{display:flex;min-width:0;align-items:center;gap:7px;min-height:22px}.community-message__header strong{overflow:hidden;font-size:14px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.community-message__header span{flex:0 0 auto;border-radius:999px;padding:3px 7px;color:#644cdb;background:#efebff;font-size:10px;font-weight:500}.community-message__header span[data-role=Coach]{color:#2765cf;background:#e3edff}.community-message__header span[data-role=Teammate]{color:#af6d00;background:#fff0c8}.community-message p{margin:2px 0 0;color:#242834;font-size:14px;font-weight:600;line-height:1.36;overflow-wrap:anywhere}.community-message[data-own=true] p{border-radius:12px;padding:8px 10px;color:#fff;background:var(--fanview-navy-950)}.reaction-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.reaction-row button{display:inline-flex;min-width:45px;min-height:27px;align-items:center;justify-content:center;gap:5px;border:1px solid var(--fanview-line);border-radius:999px;padding:3px 8px;color:#5f6370;background:#fff;font-size:11px;cursor:pointer}.community-composer{display:grid;gap:10px;border-top:1px solid var(--fanview-line);padding:12px 16px max(13px,env(safe-area-inset-bottom));background:#fffdfbfa}.quick-cheers{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.quick-cheers button{display:grid;min-width:44px;height:44px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;background:#fff;font-size:20px;cursor:pointer}.quick-cheers button:hover:not(:disabled){border-color:#f22b7861;background:#fff7fa}.composer-row{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:10px}.composer-row input{min-width:0;height:46px;border:1px solid rgba(15,23,42,.14);border-radius:999px;padding:0 17px;color:var(--fanview-navy-950);background:#fff;font-size:13px;font-weight:600}.composer-row input::placeholder{color:#596273}.send-button{display:grid;width:46px;height:46px;place-items:center;border:0;border-radius:999px;color:#fff;background:var(--fanview-pink-500);cursor:pointer}.send-button:disabled,.quick-cheers button:disabled{cursor:not-allowed;opacity:.48}.composer-meta{display:flex;min-height:10px;justify-content:flex-end;color:#596273;font-size:10px;font-weight:600}.message-skeletons{display:grid;gap:14px}.message-skeletons span{display:block;width:100%;height:48px;border-radius:12px;background:#f0f1f4}.community-inline-status,.community-failure-copy{display:grid;gap:6px;border:1px solid var(--fanview-line);border-radius:13px;padding:14px;color:var(--fanview-muted);background:#f8f8f9;font-size:12px;line-height:1.4}.community-inline-status strong,.community-failure-copy strong{color:var(--fanview-navy-950);font-size:14px}.community-panel--failed{place-items:center;padding:24px;transform:none}.community-launcher{position:fixed;z-index:12;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:inline-flex;min-height:50px;align-items:center;gap:9px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:0 16px;color:#fff;background:var(--fanview-pink-500);box-shadow:0 14px 34px #1118274d;font-size:13px;font-weight:600;cursor:pointer}.community-launcher span{display:grid;min-width:22px;height:22px;place-items:center;border-radius:999px;padding:0 5px;background:#11182738;font-size:10px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}@media(max-width:720px){.fanview-app,.match-stage{min-height:0}.match-stage__media{height:42dvh;min-height:240px;object-position:51% center}.match-stage__shade{bottom:auto;height:42dvh;min-height:240px}.live-pill,.viewer-pill{top:max(13px,env(safe-area-inset-top));min-height:29px;border-radius:6px;font-size:11px}.live-pill{left:max(13px,env(safe-area-inset-left));gap:6px;padding:0 10px}.live-pill__dot{width:7px;height:7px}.viewer-pill,.fanview-app[data-community-enabled=true] .viewer-pill{right:max(13px,env(safe-area-inset-right));gap:6px;min-width:58px;padding:0 8px}.viewer-pill svg{width:15px;height:15px}.score-bug{display:none}.community-scrim{display:block;opacity:0;pointer-events:none;background:#02070e6b;transition:opacity .18s ease}.community-scrim[data-open=true]{opacity:1;pointer-events:auto}.community-panel,.community-panel--failed{top:auto;right:0;bottom:0;left:0;width:100%;height:min(72dvh,680px);border-right:0;border-bottom:0;border-left:0;border-radius:24px 24px 0 0;transform:translateY(calc(100% + 24px))}.community-panel[data-open=true],.community-panel--failed{transform:translateY(0)}.community-panel--broadcaster{height:min(58dvh,520px)}.community-handle{position:absolute;z-index:2;top:7px;left:50%;display:block;width:72px;height:18px;cursor:grab;transform:translate(-50%);touch-action:none}.community-handle:after{position:absolute;top:0;left:16px;width:40px;height:4px;border-radius:999px;background:#1118272e;content:""}.community-header{gap:7px;padding:26px 14px 10px}.community-header h1{font-size:18px}.safety-notice{margin:0 15px}.community-feed{padding:16px 16px 10px}.community-message{grid-template-columns:34px minmax(0,1fr);gap:10px;margin-bottom:14px}.community-avatar{width:34px;height:34px;font-size:12px}.community-message__header strong{font-size:12px}.community-message p{font-size:12px;line-height:1.32}.reaction-row{gap:6px;margin-top:6px}.reaction-row button{min-width:40px;min-height:24px;font-size:10px}.community-composer{gap:9px;padding:10px 13px max(10px,env(safe-area-inset-bottom))}.quick-cheers{gap:7px}.quick-cheers button{min-width:44px;height:44px;font-size:18px}.composer-row{grid-template-columns:minmax(0,1fr) 44px;gap:8px}.composer-row input,.send-button{height:44px}.send-button{width:44px}}@media(max-width:380px){.quick-cheers button{min-width:44px;width:auto;height:44px}.quick-cheers{grid-template-columns:repeat(3,minmax(44px,1fr))}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}}@media(forced-colors:active){.live-pill,.viewer-pill,.community-panel,.community-launcher,.send-button{border:1px solid CanvasText}}.viewer-account{min-height:100dvh;display:grid;place-items:center;padding:24px 16px;background:#f5f7fa;color:#101827;font-family:var(--cv-font)}.viewer-account__card{width:min(100%,460px);box-sizing:border-box;padding:28px;border:1px solid #dbe2e9;border-radius:24px;background:linear-gradient(145deg,#fff,#f7f9fb);box-shadow:0 3px #dfe5ea,0 12px 32px #13253818,inset 0 2px #fff}.viewer-account h1{font-size:28px;line-height:1.25;font-weight:600;margin:12px 0}.viewer-account p{font-size:15px;line-height:1.6}.viewer-account__brand{font-weight:600;color:#26384a}.viewer-account button,.viewer-account input{font:inherit;min-height:46px;border-radius:12px;border:1px solid #c6d0db;padding:10px 14px;box-sizing:border-box}.viewer-account button{cursor:pointer;background:#fff;color:#101827;font-weight:600}.viewer-account button:disabled{opacity:.6;cursor:wait}.viewer-account__providers{display:grid;gap:10px;margin:22px 0}.viewer-account__modes{display:flex;gap:8px;margin:20px 0}.viewer-account__modes button{flex:1}.viewer-account__modes [aria-pressed=true]{border-color:#008954;box-shadow:inset 0 -3px #00c978}.viewer-account form,.viewer-account label{display:grid;gap:8px}.viewer-account form{gap:16px}.viewer-account input{width:100%;background:#fff;color:#101827}.viewer-account .viewer-account__primary{background:linear-gradient(135deg,#25ed96,#00cfa5);border:0;border-radius:14px;clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px)}.viewer-account a{color:#27506e;text-decoration:underline}.viewer-account__legal{font-size:12px!important}.viewer-account__home{display:inline-flex;align-items:center;min-height:44px}.viewer-account :focus-visible{outline:3px solid #1769aa;outline-offset:3px}.viewer-account,.viewer-account *{text-transform:none;letter-spacing:normal}.viewer-account__brand{display:flex;align-items:center;gap:14px;margin-bottom:24px}.viewer-account__brand img{display:block;flex-shrink:0;filter:none;opacity:1}.viewer-account__brand span{font-size:16px;font-weight:600}.viewer-account__providers button{display:flex;align-items:center;justify-content:center;gap:12px;min-height:52px;font-size:16px;line-height:24px}.viewer-account__providers img{object-fit:contain;flex-shrink:0}.viewer-account__providers .viewer-account__google{background:#fff;color:#171717;border-color:#aeb8c4}.viewer-account__providers .viewer-account__apple{background:#000;color:#fff;border-color:#000}.viewer-account .viewer-account__primary{min-height:56px;background:var(--cv-primary-material) center/100% 100% no-repeat;color:#061b13;clip-path:none;border-radius:0;padding:14px 27px;font-size:18px;line-height:28px;font-weight:600;opacity:1;box-shadow:0 4px 12px #00a86e21}.viewer-account .viewer-account__primary:disabled{opacity:.6}.viewer-account button,.viewer-account input{font-family:var(--cv-font);text-transform:none}@media(prefers-color-scheme:dark){.viewer-account{background:#070e13;color:#f5f8fb}.viewer-account__card{background:linear-gradient(145deg,#1b2931,#0e191f);border-color:#526773;box-shadow:0 4px #050a0e,0 14px 32px #0009,inset 0 2px #ffffff1c}.viewer-account__brand{color:#edf3f7}.viewer-account p{color:#cbd5df}.viewer-account h1{color:#f6f8fc}.viewer-account button,.viewer-account input{background:#14212a;color:#f5f8fb;border-color:#526773}.viewer-account__providers .viewer-account__apple{border-color:#82919d}.viewer-account__modes [aria-pressed=true]{border-color:#00c978}.viewer-account a{color:#b2d5f1}.viewer-account :focus-visible{outline-color:#72b9f4}}.live-media,.live-media__video,.live-media__iframe{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;border:0}.live-media{overflow:hidden;background:#000}.live-media__video,.live-media__iframe{object-fit:cover}.live-media__video{pointer-events:none}.live-media__video::-webkit-media-controls{display:none!important}.live-media__video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}.live-media__video[data-rotation="-90"],.live-media__video[data-rotation="90"]{inset:auto;top:50%;left:50%;width:100dvh;height:100dvw}.live-media__video[data-rotation="-90"]{transform:translate(-50%,-50%) rotate(-90deg)}.live-media__video[data-rotation="90"]{transform:translate(-50%,-50%) rotate(90deg)}.live-media__video[data-rotation="180"]{transform:rotate(180deg)}.match-stage.is-web-fullscreen{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;width:100dvw;height:100dvh}.live-media__presentation-canvas{display:none}.live-media__presentation-video{position:absolute;right:0;bottom:0;width:1px;height:1px;opacity:.001;pointer-events:none}.live-media__status{position:absolute;z-index:3;top:50%;left:50%;border-radius:999px;padding:9px 14px;color:#fff;background:#050a13d1;font-size:13px;font-weight:600;transform:translate(-50%,-50%)}.live-media__play{position:absolute;z-index:6;top:50%;left:50%;display:grid;width:56px;height:56px;place-items:center;border:0;border-radius:999px;padding:0;color:#fff;background:#050a13c2;box-shadow:0 10px 28px #00000047;transform:translate(-50%,-50%);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.live-media__play svg{transform:translate(1px)}.media-controls{position:absolute;z-index:5;right:auto;bottom:max(24px,env(safe-area-inset-bottom));left:max(24px,env(safe-area-inset-left));display:flex;max-width:calc(100% - 48px);flex-wrap:wrap;justify-content:flex-start;gap:8px}.media-control{display:flex;min-width:58px;min-height:68px;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:0;border-radius:0;padding:0;color:#fff;background:transparent;font-weight:600;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:content-box;width:22px;height:22px;border:1px solid rgba(255,255,255,.58);border-radius:11px;padding:10px;background:#03080fbd;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control__label{display:block;font-size:10px}@media(min-width:721px){.media-control__label{border-radius:4px;background:#03080fe6;box-shadow:0 0 0 2px #03080fe6;white-space:nowrap}}.media-control:disabled{cursor:not-allowed;opacity:.58}.viewer-header{position:absolute;z-index:5;top:max(28px,env(safe-area-inset-top));right:max(28px,env(safe-area-inset-right));left:max(28px,env(safe-area-inset-left));display:flex;align-items:center;justify-content:space-between;gap:12px;pointer-events:none}.viewer-header--without-team-hub{justify-content:flex-end}.viewer-header__status{display:flex;min-width:0;align-items:center;justify-content:flex-end;gap:10px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{position:relative;inset:auto;pointer-events:auto}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:48px}.match-status--action{max-width:min(440px,calc(100vw - 56px));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fanview-state-page{min-height:100dvh;display:grid;place-items:center;padding:24px;color:#fff;background:#050a13}.fanview-state-camera{position:relative;width:min(760px,100%);min-height:min(680px,calc(100dvh - 48px));overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:28px;background:#07101b;box-shadow:0 28px 80px #0000005c}.fanview-state-camera__court{position:absolute;top:0;right:0;bottom:238px;left:0;background:linear-gradient(#050a134d,#050a13a8),repeating-linear-gradient(90deg,transparent 0 15%,rgba(255,255,255,.035) 15% 15.4%),#111b27}.fanview-state-camera__court:before,.fanview-state-camera__court:after,.fanview-state-camera__court span{position:absolute;border:2px solid rgba(255,255,255,.16);content:""}.fanview-state-camera__court:before{top:20%;right:12%;bottom:13%;left:12%}.fanview-state-camera__court:after{top:52%;right:8%;left:8%;border-width:2px 0 0}.fanview-state-camera__court span{top:20%;bottom:13%;left:50%;border-width:0 0 0 2px}.fanview-state-card{position:absolute;right:18px;bottom:18px;left:18px;display:grid;gap:10px;border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:20px;text-align:left;background:#080d15f0;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.fanview-state-card strong{font-size:clamp(22px,4vw,30px)}.fanview-state-card>span{color:#c3cad4;line-height:1.45}.fanview-state-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:4px}.fanview-state-action{display:inline-flex;min-width:0;min-height:48px;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:0 13px;color:#fff;background:#ffffff14;font:inherit;font-size:13px;font-weight:600;text-align:center;text-decoration:none}.fanview-state-action--primary{border-color:#f22b78;background:#f22b78}.fanview-state-action--support{grid-column:1 / -1}.fanview-state-action:disabled{opacity:.5}.team-hub-back{position:absolute;z-index:5;top:max(82px,calc(env(safe-area-inset-top) + 58px));left:max(28px,env(safe-area-inset-left));display:inline-flex;min-height:44px;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.44);border-radius:999px;padding:0 13px;color:#fff;background:#03080fbd;font-size:13px;font-weight:600;text-decoration:none;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(340px,calc(100vw - 470px));min-width:300px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:66px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:38px;height:38px;flex-basis:38px;font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:20px}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(460px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(580px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:94px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:54px;height:54px;flex-basis:54px;font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:17px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:30px}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:auto;bottom:auto;left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:max(28px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:max(28px,env(safe-area-inset-bottom));left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(28px,env(safe-area-inset-right));bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:50%;transform:translate(-50%)}.scoreboard-display-trigger{display:inline-flex;min-width:48px;min-height:48px;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:0 12px;color:#fff;background:#03080fbd;font-weight:600;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.scoreboard-display-trigger--standalone{position:absolute;z-index:5;right:max(24px,env(safe-area-inset-right));bottom:max(24px,env(safe-area-inset-bottom))}.scoreboard-display-menu{position:absolute;z-index:9;top:max(80px,calc(env(safe-area-inset-top) + 56px));right:max(28px,env(safe-area-inset-right));display:grid;width:min(290px,calc(100vw - 32px));gap:9px;border:1px solid rgba(255,255,255,.42);border-radius:16px;padding:14px;color:#fff;background:#030a14f5;box-shadow:0 18px 48px #0000006b;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}.scoreboard-display-menu>strong{font-size:15px}.scoreboard-display-menu__label{color:#bdc7d4;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}.scoreboard-display-menu__options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.scoreboard-display-menu__positions{grid-template-columns:1fr 1fr}.scoreboard-display-menu button{min-width:0;min-height:44px;border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:0 8px;color:#fff;background:#ffffff0a;font-size:10px;font-weight:600}.scoreboard-display-menu button[aria-pressed=true]{border-color:#ff3f75;background:#ff3f752e;box-shadow:inset 0 0 0 1px #ff3f75}.scoreboard-display-menu__reset{width:100%}@media(max-width:720px){.fanview-app{--fanview-mobile-bottom-inset: max( 12px, env(safe-area-inset-bottom) );--fanview-mobile-cheer-width: min( clamp(104px, 42vw, 160px), calc(100vw - max(10px, env(safe-area-inset-left)) - max(10px, env(safe-area-inset-right)) - 186px) )}.match-status--action{display:none}.score-bug{display:block;top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));width:min(370px,calc(100vw - 20px));min-width:0;border-radius:12px;padding:6px;box-shadow:0 10px 28px #00000057}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(300px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(370px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:calc(100vw - 20px);min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:50%;transform:translate(-50%)}.score-bug__timeout{min-height:44px;margin-bottom:6px;padding:0 9px;font-size:10px}.score-bug__header{min-height:34px}.score-bug__format,.score-bug__set-heading{padding:0 5px;font-size:8px}.score-bug__format{padding-left:9px}.score-bug__set-heading{display:grid;place-items:center;gap:0}.score-bug__set-heading small{gap:3px;font-size:6px}.score-bug__set-heading small i{width:5px;height:5px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:64px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:54px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:74px}.score-bug__team{gap:7px;padding:7px 9px}.score-bug__team-mark,.fanview-app[data-scoreboard-size=standard] .score-bug__team-mark{width:34px;height:34px;flex-basis:34px;border-radius:8px;font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:28px;height:28px;flex-basis:28px;font-size:8px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:40px;height:40px;flex-basis:40px;font-size:11px}.score-bug__team-copy>strong,.fanview-app[data-scoreboard-size=standard] .score-bug__team-copy>strong{font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:9px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:11px}.score-bug__team-copy>small{font-size:7px}.score-bug__team-copy>small b{font-size:9px}.score-bug__cell-score,.fanview-app[data-scoreboard-size=standard] .score-bug__cell-score{font-size:19px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:22px}.score-bug__winner-badge{top:4px;right:4px;width:15px;height:15px;border-radius:4px;font-size:8px}.media-controls{right:calc(var(--fanview-mobile-cheer-width) + max(10px,env(safe-area-inset-right)) + 8px);bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));display:grid;max-width:none;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0;overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:22px;background:#03080fcc;box-shadow:0 8px 22px #00000040;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control{min-width:44px;min-height:58px;flex-direction:column;gap:4px;border:0;border-radius:0;padding:6px 2px 5px;background:transparent;box-shadow:none;font-size:10px;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:border-box;width:20px;height:20px;border:0;border-radius:0;padding:0;background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control+.media-control{border-left:1px solid rgba(255,255,255,.2)}.media-control__label{display:block;overflow:hidden;max-width:100%;color:#fff;font-size:8px;font-weight:500;line-height:1.15;overflow:visible;overflow-wrap:anywhere;text-overflow:clip;white-space:normal;text-align:center}.media-control svg{flex:0 0 auto;width:16px;height:16px;color:#fff}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);width:var(--fanview-mobile-cheer-width);min-height:58px;min-width:0;justify-content:center;gap:5px;overflow:hidden;padding:0 8px;font-size:10.5px;white-space:nowrap}.community-launcher svg{flex:0 0 auto;width:17px;height:17px}.community-launcher span{flex:0 0 auto;min-width:19px;height:19px;padding:0 4px}.viewer-header{top:max(13px,env(safe-area-inset-top));right:max(13px,env(safe-area-inset-right));left:max(13px,env(safe-area-inset-left));gap:8px}.viewer-header__status{gap:8px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:44px}.fanview-app .viewer-header .team-hub-back{padding:0 11px;font-size:11px}.fanview-app .viewer-header .live-pill{padding:0 10px}.scoreboard-display-trigger--standalone{right:auto;bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));min-width:44px;min-height:44px;padding:0 10px;font-size:11px}.scoreboard-display-menu{top:max(62px,calc(env(safe-area-inset-top) + 46px));right:max(10px,env(safe-area-inset-right));width:min(284px,calc(100vw - 20px))}.fanview-state-page{padding:12px}.fanview-state-camera{min-height:calc(100dvh - 24px);border-radius:22px}.fanview-state-actions{grid-template-columns:1fr 1fr}}@media(max-width:380px){.score-bug__team-copy>strong{font-size:10px}}@media(max-width:340px){.score-bug__team-mark{display:none}.score-bug__team{padding:5px 7px}}@media(max-width:300px){.viewer-header{right:max(8px,env(safe-area-inset-right));left:max(8px,env(safe-area-inset-left));gap:4px}.viewer-header__status{gap:4px}.fanview-app .viewer-header .team-hub-back{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .team-hub-back svg{width:15px;height:15px}.fanview-app .viewer-header .live-pill{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .live-pill__dot{width:6px;height:6px}.fanview-app .viewer-header .viewer-pill{min-width:0;gap:4px;padding:0 6px;font-size:9.5px}.fanview-app .viewer-header .viewer-pill svg{width:13px;height:13px}.media-controls{right:max(8px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.community-launcher{right:max(8px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);left:max(8px,env(safe-area-inset-left));width:auto}.scoreboard-display-trigger--standalone{right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.fanview-app[data-scoreboard-size] .score-bug{right:auto;width:calc(100vw - 16px);min-width:0;bottom:calc(var(--fanview-mobile-bottom-inset) + 133px);left:max(8px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-left] .score-bug,.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(8px,env(safe-area-inset-left))}.score-bug__team-mark{display:none}.score-bug__team{padding:5px 6px}.score-bug__team-copy>strong{font-size:8px}.score-bug__team-copy>small{font-size:6px}.score-bug__cell-score{font-size:15px}.score-bug__winner-badge{top:3px;right:3px;width:13px;height:13px;font-size:7px}.scoreboard-display-menu{right:max(8px,env(safe-area-inset-right));width:calc(100vw - 16px);padding:10px}.fanview-state-actions{grid-template-columns:1fr}.fanview-state-action--support{grid-column:auto}}.arena-scoreboard{min-height:100dvh;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto auto;align-items:center;justify-items:center;gap:clamp(18px,4vh,52px);padding:clamp(28px,5vh,72px) clamp(34px,5vw,96px);color:#fff;background:radial-gradient(circle at 0 50%,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent 42%),radial-gradient(circle at 100% 50%,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent 42%),#03070c}.arena-scoreboard__header{display:grid;justify-items:center;gap:18px;font-family:var(--font-sans);letter-spacing:.24em}.arena-scoreboard__header strong{font-family:var(--font-display);font-size:clamp(24px,2.2vw,42px)}.arena-scoreboard__header span{font-size:clamp(16px,1.55vw,30px);font-weight:600}.arena-scoreboard__board{width:min(100%,1500px);overflow:hidden;display:grid;grid-template-columns:1fr minmax(120px,11%) 1fr;border:2px solid rgba(255,255,255,.42);border-radius:18px;background:#03080fe6;box-shadow:0 30px 80px #00000080}.arena-scoreboard__team{min-width:0;min-height:clamp(190px,30vh,340px);display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(14px,1.6vw,30px);padding:clamp(22px,2.3vw,42px)}.arena-scoreboard__team--home{background:linear-gradient(90deg,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent)}.arena-scoreboard__team--away{background:linear-gradient(270deg,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent)}.arena-scoreboard__team i{width:16px;height:132px;border-radius:999px;background:var(--arena-home)}.arena-scoreboard__team--away i{background:var(--arena-away)}.arena-scoreboard__team span{min-width:0;display:grid;gap:18px}.arena-scoreboard__team b{overflow:hidden;color:#fff;font-family:var(--font-display);font-size:clamp(18px,1.55vw,38px);text-overflow:ellipsis;white-space:nowrap}.arena-scoreboard__team small{color:var(--arena-home);font-size:clamp(18px,2vw,34px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__team--away span{text-align:right}.arena-scoreboard__team--away small{color:var(--arena-away)}.arena-scoreboard__team>strong{font-family:var(--font-display);font-size:clamp(84px,10vw,180px);font-variant-numeric:tabular-nums;line-height:.85}.arena-scoreboard__set{display:grid;place-items:center;border-inline:1px solid rgba(255,255,255,.34);color:#c8ced6;font-size:clamp(22px,2.6vw,46px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__history{grid-column:1 / -1;min-height:92px;display:flex;justify-content:center;border-top:1px solid rgba(255,255,255,.34)}.arena-scoreboard__history>div{min-width:280px;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;border-inline:1px solid rgba(255,255,255,.24);text-align:center}.arena-scoreboard__history b,.arena-scoreboard__history span{font-size:clamp(22px,2.6vw,44px);font-variant-numeric:tabular-nums}.arena-scoreboard__history span{color:#a9b0b9}.arena-scoreboard__history span:first-of-type.is-winner{color:var(--arena-home)}.arena-scoreboard__history span:last-of-type.is-winner{color:var(--arena-away)}.arena-scoreboard__timeout{min-height:90px;display:grid;grid-auto-flow:column;place-items:center;justify-content:center;gap:22px;padding-inline:64px;border:2px solid #d99212;border-radius:16px;color:#ffb320;background:#341f04e0;font-size:clamp(22px,2.4vw,42px);font-weight:600}.arena-scoreboard footer{position:relative;width:min(100%,1500px);display:grid;place-items:center;color:#b8bec7;font-size:clamp(16px,1.55vw,28px)}.arena-scoreboard footer>div{position:absolute;right:0;bottom:-18px;display:grid;place-items:center}.arena-scoreboard footer>div b{position:absolute;font-size:9px;letter-spacing:.08em}@media(orientation:portrait),(max-width:760px){.arena-scoreboard{align-content:center;gap:22px;padding:24px 14px}.arena-scoreboard__board{grid-template-columns:1fr}.arena-scoreboard__set{min-height:70px;border:1px solid rgba(255,255,255,.34)}.arena-scoreboard__team{min-height:150px}.arena-scoreboard__history{grid-column:1;overflow-x:auto;justify-content:flex-start}.arena-scoreboard__timeout{min-height:64px;padding-inline:24px}.arena-scoreboard footer>div{display:none}}@media(max-width:980px)and (max-height:520px)and (orientation:landscape){.fanview-app,.match-stage{height:100dvh;min-height:0}.viewer-header{top:max(9px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));left:max(10px,env(safe-area-inset-left))}.media-controls{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left));display:grid;width:246px;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0}.media-control{min-width:44px;min-height:58px;padding:6px 2px 5px}.media-control__label{display:block}.fanview-app[data-scoreboard-size=small] .score-bug{width:260px;min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:330px;min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(430px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:50%;transform:translate(-50%)}.score-bug__header{min-height:30px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:52px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:46px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:58px}.score-bug__timeout{min-height:40px;font-size:9px}.score-bug__team{gap:6px;padding:5px 7px}.score-bug__team-mark{width:28px;height:28px;flex-basis:28px}.score-bug__team-copy>strong{font-size:9px}.score-bug__cell-score{font-size:17px}.scoreboard-display-trigger--standalone{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:50%;transform:translate(-50%)}.scoreboard-display-menu{top:max(58px,calc(env(safe-area-inset-top) + 44px));width:min(278px,calc(100vw - 20px));gap:6px;padding:10px}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));width:auto;min-height:58px;padding:0 12px;font-size:12px}}.score-bug{width:auto;min-width:0;border:0;border-radius:0;padding:0;background:transparent;box-shadow:none}.score-bug__full-card,.score-bug__bar-card,.score-bug__minimal-card{overflow:hidden;border:1px solid rgba(255,255,255,.34);color:#fff;background:#03080fed;box-shadow:0 14px 34px #00000057;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.score-bug__full-card{width:100%;border-radius:10px}.score-bug__full-team{display:grid;height:62px;grid-template-columns:7px minmax(0,1fr) auto 54px;align-items:center;gap:12px;padding:0 12px}.score-bug__full-team+.score-bug__full-team{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team-accent{width:7px;height:33px;border-radius:999px}.score-bug__full-team>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:.01em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__full-team>b{font-size:30px;font-variant-numeric:tabular-nums;font-weight:600;line-height:1;text-align:right}.score-bug__set-dots{display:inline-flex;gap:6px}.score-bug__set-dots i{width:9px;height:9px;border-radius:999px;background:#4a5059}.score-bug__full-team:first-child .score-bug__set-dots i.is-won{background:#23cdb5}.score-bug__full-team:nth-child(2) .score-bug__set-dots i.is-won{background:#ff7046}.score-bug__full-meta{display:flex;min-height:38px;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.22);padding:0 12px;color:#aeb7c4;font-size:12px;font-weight:600;letter-spacing:.08em}.score-bug__history{font-variant-numeric:tabular-nums}.score-bug__history--full{display:grid;min-height:42px;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.22)}.score-bug__history-set{position:relative;display:flex;min-width:0;align-items:center;justify-content:center;gap:6px;color:#929aa6;font-size:13px;font-weight:600}.score-bug__history-set+.score-bug__history-set{border-left:1px solid rgba(255,255,255,.22)}.score-bug__history-label{margin-right:7px;color:#aeb7c4;font-size:11px}.score-bug__history-score{position:relative}.score-bug__history-score.is-winner{color:#fff}.score-bug__history--full .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner{color:#23cdb5}.score-bug__history--full .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner{color:#ff7046}.score-bug__history .score-bug__winner-badge,.scoreboard-sr-only{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;margin:-1px!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}.score-bug__timeout{min-height:40px;justify-content:center;margin:0 0 8px;border:1px solid rgba(255,179,32,.56);border-radius:8px;padding:0 12px;color:#ffb320;background:#362004e6;font-size:11px}.score-bug--score-bar .score-bug__timeout{width:fit-content;min-width:210px;margin-right:auto;margin-left:auto;border-radius:999px}.score-bug__bar-card{display:grid;min-height:72px;grid-template-columns:minmax(0,1fr) minmax(132px,.85fr) minmax(0,1fr);border-radius:9px}.score-bug__bar-team{display:grid;min-width:0;align-items:center;gap:12px;padding:0 14px}.score-bug__bar-team--home{grid-template-columns:7px minmax(0,1fr) auto}.score-bug__bar-team--away{grid-template-columns:auto minmax(0,1fr) 7px}.score-bug__bar-team i{width:7px;height:38px;border-radius:999px}.score-bug__bar-team span{overflow:hidden;font-size:15px;font-weight:600;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__bar-team--away span{text-align:right}.score-bug__bar-team strong{font-size:30px;font-variant-numeric:tabular-nums;line-height:1}.score-bug__bar-center{display:grid;align-content:center;border-right:1px solid rgba(255,255,255,.22);border-left:1px solid rgba(255,255,255,.22);gap:3px;text-align:center}.score-bug__bar-center>span{color:#d8dde4;font-size:11px;font-weight:600;letter-spacing:.08em}.score-bug__history--bar{display:flex;justify-content:center}.score-bug__history--bar .score-bug__history-set{gap:5px;padding:0 8px;font-size:11px}.score-bug__history--bar .score-bug__history-label{margin-right:0;font-size:8px}.score-bug__minimal-card{display:flex;min-height:54px;align-items:center;gap:13px;border-radius:999px;padding:6px 18px 6px 6px}.score-bug__minimal-card>span{display:inline-flex;min-height:40px;align-items:center;border-radius:999px;padding:0 18px;color:#07101b;background:#ff5f2d;font-size:14px;font-weight:600}.score-bug__minimal-card>strong{font-size:20px;font-variant-numeric:tabular-nums;font-weight:600}.score-bug__minimal-card>i{color:#969eaa;font-style:normal;font-weight:600}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=small] .score-bug{width:min(285px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=standard] .score-bug{width:min(344px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=large] .score-bug{width:min(408px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=small] .score-bug{width:min(570px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=standard] .score-bug{width:min(720px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=large] .score-bug{width:min(880px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=small] .score-bug{width:auto;transform:scale(.86);transform-origin:bottom center}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=large] .score-bug{width:auto;transform:scale(1.16);transform-origin:bottom center}.scoreboard-display-menu{position:fixed;top:auto;right:auto;bottom:0;left:50%;width:min(680px,100vw);max-height:min(830px,calc(100dvh - 76px));grid-auto-rows:max-content;align-content:start;overflow-y:auto;gap:14px;border-radius:24px 24px 0 0;padding:14px 28px max(24px,env(safe-area-inset-bottom));transform:translate(-50%)}.scoreboard-display-menu__handle{width:46px;height:5px;justify-self:center;border-radius:999px;background:#65717c}.scoreboard-display-menu>strong{font-size:24px;line-height:1.1;text-align:center}.scoreboard-display-menu>p{margin:-3px 0 4px;color:#aab2bf;font-size:14px;text-align:center}.scoreboard-display-menu__label{color:#fff;font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__layouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.scoreboard-display-menu button.scoreboard-display-menu__layout{position:relative;display:grid;min-height:178px;grid-template-rows:minmax(98px,1fr) minmax(20px,auto) minmax(42px,auto);align-items:center;border-radius:12px;padding:10px 7px 0}.scoreboard-display-menu__layout>b{grid-row:3;min-width:0;overflow-wrap:anywhere;align-self:stretch;display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22);font-size:13px;letter-spacing:.06em}.scoreboard-display-menu__layout>small{grid-row:2;min-width:0;line-height:1.25;overflow-wrap:anywhere;color:#ff3f75;font-size:8px;font-weight:600}.scoreboard-display-menu__check,.scoreboard-display-menu__option-check,.scoreboard-display-menu__position-check{position:absolute;display:grid;place-items:center;border-radius:999px;color:#fff;background:#ef3d68}.scoreboard-display-menu__check{top:10px;right:10px;width:30px;height:30px}.scoreboard-layout-preview{position:relative;display:block;justify-self:center;border:1px solid rgba(255,255,255,.34);background:#050a11}.scoreboard-layout-preview--full-score{width:122px;height:65px;border-radius:6px}.scoreboard-layout-preview--full-score i{display:block;height:21px;border-bottom:1px solid rgba(255,255,255,.22)}.scoreboard-layout-preview--full-score i:first-child{border-left:4px solid #20cdb4}.scoreboard-layout-preview--full-score i:nth-child(2){border-left:4px solid #ff7046}.scoreboard-layout-preview--score-bar{width:142px;height:35px;border-radius:5px}.scoreboard-layout-preview--score-bar i:first-child,.scoreboard-layout-preview--score-bar i:nth-child(2){position:absolute;top:6px;bottom:6px;width:5px;border-radius:99px}.scoreboard-layout-preview--score-bar i:first-child{left:6px;background:#20cdb4}.scoreboard-layout-preview--score-bar i:nth-child(2){right:6px;background:#ff7046}.scoreboard-layout-preview--minimal{width:100px;height:32px;border-radius:999px}.scoreboard-layout-preview--minimal i:first-child{position:absolute;top:5px;bottom:5px;left:5px;width:42px;border-radius:999px;background:#ff5f2d}.scoreboard-display-menu__options{gap:0}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions){overflow:hidden;border:1px solid rgba(255,255,255,.22);border-radius:12px}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;min-height:52px;padding:8px;border:0;border-radius:0;font-size:13px;letter-spacing:.05em}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button+button{border-left:1px solid rgba(255,255,255,.22)}.scoreboard-display-menu__option-check{position:static;flex:0 0 18px;width:18px;height:18px}.scoreboard-display-menu__positions{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.scoreboard-display-menu__positions button{position:relative;box-sizing:border-box;width:100%;min-width:0;display:grid;aspect-ratio:1.15;min-height:64px;padding:8px}.scoreboard-position-icon{position:relative;box-sizing:border-box;display:block;min-width:0;min-height:28px;width:100%;height:100%;border:1px solid #5d6671}.scoreboard-position-icon i{position:absolute;width:22%;height:8%;border-radius:999px;background:#ff3f75}.scoreboard-position-icon--top-left i{top:8%;left:7%}.scoreboard-position-icon--top-right i{top:8%;right:7%}.scoreboard-position-icon--bottom-left i{bottom:8%;left:7%}.scoreboard-position-icon--bottom-right i{right:7%;bottom:8%}.scoreboard-position-icon--bottom-center i{bottom:8%;left:39%}.scoreboard-display-menu__position-check{top:4px;right:4px;width:24px;height:24px}.scoreboard-display-menu__automatic{display:flex;min-height:72px;align-items:center;justify-content:space-between;border-width:1px 0;border-radius:0;padding:0;text-align:left}.scoreboard-display-menu__automatic>span{min-width:0;overflow-wrap:anywhere;display:grid;gap:4px}.scoreboard-display-menu__automatic b{font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__automatic small{color:#aab2bf;font-size:12px}.scoreboard-display-menu__switch{flex:0 0 54px;position:relative;width:54px;height:32px;border:1px solid #606a75;border-radius:999px;background:#1e2731}.scoreboard-display-menu__switch span{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:999px;background:#fff;transition:transform .14s ease}.scoreboard-display-menu__switch[data-on=true]{border-color:#20a66b;background:#20a66b}.scoreboard-display-menu__switch[data-on=true] span{transform:translate(22px)}.scoreboard-display-menu button.scoreboard-display-menu__reset{min-height:44px;border:0;color:#ff3f75;background:transparent;font-size:13px}.fanview-app button,.fanview-state-page button,.scoreboard-display-menu button{font-family:var(--font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase}@media(max-width:720px){.viewer-header{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.score-bug__bar-card{min-height:58px;grid-template-columns:minmax(0,1fr) minmax(104px,.8fr) minmax(0,1fr)}.score-bug__bar-team{gap:6px;padding:0 8px}.score-bug__bar-team span{font-size:10px}.score-bug__bar-team strong{font-size:22px}.score-bug__bar-team i{width:5px;height:31px}.score-bug__history--bar .score-bug__history-set{padding:0 4px;font-size:9px}.score-bug__full-team{height:54px;grid-template-columns:6px minmax(0,1fr) auto 45px;gap:8px;padding:0 10px}.score-bug__full-team>strong{font-size:13px}.score-bug__full-team>b{font-size:26px}.scoreboard-display-menu{width:100vw;max-height:calc(100dvh - 56px);gap:11px;border-radius:22px 22px 0 0;padding:12px 16px max(18px,env(safe-area-inset-bottom))}.scoreboard-display-menu>strong{font-size:20px}.scoreboard-display-menu__layouts{gap:8px}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:146px;grid-template-rows:minmax(78px,1fr) minmax(16px,auto) minmax(37px,auto);padding:7px 4px 0}.scoreboard-display-menu__layout>b{font-size:11px}.scoreboard-layout-preview--full-score{width:min(92px,90%)}.scoreboard-layout-preview--score-bar{width:min(100px,92%)}.scoreboard-layout-preview--minimal{width:min(82px,90%)}.scoreboard-display-menu__positions{gap:6px}.scoreboard-display-menu__positions button{min-height:56px;padding:6px}}@media(max-width:300px){.scoreboard-display-menu__layouts{grid-template-columns:1fr}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:102px;grid-template-columns:1fr 1fr;grid-template-rows:1fr 24px}.scoreboard-display-menu__layout>b{grid-row:1 / 3;border-top:0;border-left:1px solid rgba(255,255,255,.22)}}.fanview-state-card,.scoreboard-display-menu{border-color:#40535e;background:var(--cv-face-dark);box-shadow:inset 0 1px #e1f0f91f,inset 0 -5px #0b141b,0 18px 48px #0000006b}.fanview-state-action--primary.cv-primary-action{grid-column:1 / -1}
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

/* Action wording stays complete at compact widths and text zoom. Preserve the
   approved control shapes/icons; only labels wrap and controls grow as needed. */
.fanview-app button,
.fanview-state-page button,
.fanview-state-action,
.scoreboard-display-menu button,
.team-hub-back {
  white-space: normal;
  overflow-wrap: normal;
  word-break: normal;
  text-overflow: clip;
  min-height: 44px;
}
.fanview-app .media-control__label,
.scoreboard-display-menu__layout > b,
.scoreboard-display-menu__layout > small {
  white-space: normal;
  overflow: visible;
  overflow-wrap: normal;
  word-break: normal;
  text-overflow: clip;
}
.fanview-app .community-launcher { white-space: normal; overflow: visible; height: auto; }
.fanview-state-action, .team-hub-back { padding-top: 8px; padding-bottom: 8px; }
@media (max-width: 240px) {
  .scoreboard-display-menu__layouts { grid-template-columns: minmax(0, 1fr); }
  .scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Recovery and live activity are instructions/status, never truncated previews. */
.fanview-app .match-status,
.fanview-app .match-status--action {
  max-width: min(440px, calc(100vw - 32px));
  white-space: normal;
  overflow: visible;
  overflow-wrap: normal;
  word-break: normal;
  text-overflow: clip;
  line-height: 1.4;
}
`.replaceAll(":root", ":host") + $m, y.appendChild(u), !document.getElementById("broadcast-display-fonts")) {
    const G = document.createElement("style");
    G.id = "broadcast-display-fonts", G.textContent = (`@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Regular-C2UfmnDu.ttf) format("truetype");font-style:normal;font-weight:400;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-Medium-C2x3RLjU.ttf) format("truetype");font-style:normal;font-weight:500;font-display:swap}@font-face{font-family:CV Plus Jakarta Sans;src:url(/assets/fanview-production/assets/PlusJakartaSans-SemiBold-BAz3r7B9.ttf) format("truetype");font-style:normal;font-weight:600;font-display:swap}:root{--cv-font: "CV Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;--font-display: var(--cv-font);--font-sans: var(--cv-font);--font-body: var(--cv-font);font-family:var(--cv-font);font-synthesis:none}body,button,input,textarea,select{font-family:var(--cv-font);font-synthesis:none}body,input,textarea,select{font-weight:400}h1,h2,h3,h4,h5,h6,strong,b,th,button{font-weight:600}:root,:host{--cv-face-light: linear-gradient(135deg, #fff 0%, #fcfdfe 42%, #f2f5f8 100%);--cv-face-dark: linear-gradient(135deg, #29353c 0%, #101b21 42%, #142127 100%);--cv-card-face: var(--cv-face-light);--cv-card-line: #e3e9ef;--cv-card-rim: #e2e8ee;--cv-card-reflection: rgba(255,255,255,.95);--cv-card-shadow: rgba(16,24,32,.12);--cv-primary-material: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20350%2056'%20preserveAspectRatio='none'%3e%3cdefs%3e%3clinearGradient%20id='home-action'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20stop-color='%2325ED96'/%3e%3cstop%20offset='100%25'%20stop-color='%2300CFA5'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20d='M14%200H340Q350%200%20350%2010V42Q350%2044%20348%2046L340%2054Q338%2056%20335%2056H8Q0%2056%200%2048V15Q0%2012%202%2010L10%202Q12%200%2014%200Z'%20fill='url(%23home-action)'/%3e%3c/svg%3e")}.cv-dark-material{--cv-card-face: var(--cv-face-dark);--cv-card-line: #40535e;--cv-card-rim: #0b141b;--cv-card-reflection: rgba(225,240,249,.12);--cv-card-shadow: rgba(0,0,0,.28)}.cv-raised-surface{background:var(--cv-card-face);border-color:var(--cv-card-line);box-shadow:inset 0 1px 0 var(--cv-card-reflection),inset 0 -5px 0 var(--cv-card-rim),0 5px 12px var(--cv-card-shadow)}:is(a,button).cv-primary-action,[data-cv-product] .cv-primary-action,body:not(.camera-mode) [data-cv-primary-action]{display:inline-flex;min-width:0;min-height:56px;max-width:100%;align-items:center;justify-content:space-between;gap:16px;border:0;border-radius:0;padding:14px 27px;color:#061b13;background:var(--cv-primary-material) center / 100% 100% no-repeat;font-family:var(--cv-font);font-size:22px;line-height:28px;font-weight:600;letter-spacing:0;text-align:left;text-transform:none;text-decoration:none;white-space:normal;overflow-wrap:anywhere;overflow:visible;box-shadow:0 4px 12px #00a86e21}.cv-primary-action:before,body:not(.camera-mode) [data-cv-primary-action]:before{display:none!important}.cv-primary-action:after,body:not(.camera-mode) [data-cv-primary-action]:after{content:"";display:block;width:24px;height:24px;flex:0 0 24px;background:currentColor;-webkit-mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat;mask:var(--cv-action-glyph, url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M26.828%202.000L23.517%2011.931L63.241%2051.655L23.517%2091.379L30.138%2098.000L76.483%2051.655Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")) center / contain no-repeat}.cv-primary-action[data-cv-action=team]{--cv-action-glyph: url(/assets/fanview-production/assets/team-section-CMCCqbvK.svg)}.cv-primary-action[data-cv-action=fanview],[data-cv-primary-action][data-cv-action=fanview]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M35.8%2050A14.2%2014.2%200%201%200%2064.2%2050A14.2%2014.2%200%201%200%2035.8%2050ZM12.1755%2020.4482A48%2048%200%200%200%2012.1755%2079.5518L19.2676%2074.0108A39%2039%200%200%201%2019.2676%2025.9892ZM25.5717%2030.9145A31%2031%200%200%200%2025.5717%2069.0855L32.6638%2063.5446A22%2022%200%200%201%2032.6638%2036.4554ZM87.8245%2020.4482A48%2048%200%200%201%2087.8245%2079.5518L80.7324%2074.0108A39%2039%200%200%200%2080.7324%2025.9892ZM74.4283%2030.9145A31%2031%200%200%201%2074.4283%2069.0855L67.3362%2063.5446A22%2022%200%200%200%2067.3362%2036.4554Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=games]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14%2014H24V7A4%204%200%200%201%2032%207V14H68V7A4%204%200%200%201%2076%207V14H86Q98%2014%2098%2026V86Q98%2098%2086%2098H14Q2%2098%202%2086V26Q2%2014%2014%2014ZM13%2043V85Q13%2088%2016%2088H84Q87%2088%2087%2085V43ZM23%2025A5%205%200%201%200%2033%2025A5%205%200%201%200%2023%2025ZM67%2025A5%205%200%201%200%2077%2025A5%205%200%201%200%2067%2025ZM23.8%2058A5.2%205.2%200%201%200%2034.2%2058A5.2%205.2%200%201%200%2023.8%2058ZM44.8%2058A5.2%205.2%200%201%200%2055.2%2058A5.2%205.2%200%201%200%2044.8%2058ZM65.8%2058A5.2%205.2%200%201%200%2076.2%2058A5.2%205.2%200%201%200%2065.8%2058ZM23.8%2077A5.2%205.2%200%201%200%2034.2%2077A5.2%205.2%200%201%200%2023.8%2077ZM44.8%2077A5.2%205.2%200%201%200%2055.2%2077A5.2%205.2%200%201%200%2044.8%2077ZM65.8%2077A5.2%205.2%200%201%200%2076.2%2077A5.2%205.2%200%201%200%2065.8%2077Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=coach]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M14.288%2045.035C13.434%2045.425%2012.955%2044.911%2012.126%2044.772C10.714%2044.535%208.152%2044.395%206.828%2044.963C4.655%2045.896%202.887%2047.492%202.124%2049.821C0.961%2053.377%202.899%2058.244%206.470%2059.570C7.926%2060.111%209.584%2060.547%2011.148%2060.189C12.092%2059.973%2013.389%2059.032%2014.331%2059.440C15.327%2060.564%2015.576%2062.640%2016.214%2063.999C17.393%2066.510%2019.174%2069.185%2021.168%2071.108C25.302%2075.095%2030.512%2077.628%2036.207%2078.036C37.298%2078.115%2038.165%2078.614%2039.312%2078.574C40.012%2078.549%2040.528%2078.217%2041.192%2078.084C43.912%2077.541%2046.503%2077.203%2049.160%2076.207C52.964%2074.780%2056.705%2071.563%2059.257%2068.456C61.510%2065.713%2063.192%2061.784%2064.060%2058.367C64.481%2056.711%2064.001%2053.475%2065.486%2052.323C66.224%2051.751%2067.505%2051.573%2068.389%2051.294C70.248%2050.706%2072.077%2050.139%2073.944%2049.622C75.202%2049.274%2076.304%2048.637%2077.516%2048.191C81.856%2046.591%2086.375%2045.467%2090.697%2043.816C92.763%2043.026%2096.195%2042.741%2097.819%2041.208C98.466%2039.690%2098.000%2037.188%2098.000%2035.543C98.000%2033.673%2098.666%2030.224%2097.778%2028.555C97.075%2027.236%2094.882%2026.364%2093.736%2025.443C92.231%2024.233%2090.186%2022.014%2088.287%2021.504C86.799%2021.105%2084.860%2021.422%2083.324%2021.422C79.714%2021.422%2076.105%2021.422%2072.496%2021.422C65.832%2021.422%2059.169%2021.422%2052.505%2021.422C48.901%2021.422%2044.833%2020.889%2041.277%2021.462C36.110%2022.293%2030.187%2024.630%2026.049%2027.933C23.240%2030.176%2019.752%2033.494%2018.091%2036.691C17.213%2038.380%2016.222%2040.103%2015.514%2041.870C15.121%2042.851%2015.033%2044.261%2014.288%2045.035Z%20M5.785%2052.240A4.041%204.041%200%201%200%2013.867%2052.240A4.041%204.041%200%201%200%205.785%2052.240Z%20M27.641%2049.881A10.760%2010.760%200%201%200%2049.162%2049.881A10.760%2010.760%200%201%200%2027.641%2049.881Z%20M90.731%2027.354C91.155%2031.660%2084.825%2029.967%2082.385%2030.337C74.035%2031.605%2065.379%2031.182%2057.034%2032.482C54.873%2032.819%2051.849%2031.490%2051.532%2029.033C51.038%2025.201%2056.604%2025.306%2058.930%2025.306C66.982%2025.306%2075.035%2025.306%2083.087%2025.306C85.159%2025.306%2089.846%2024.734%2090.731%2027.354Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action[data-cv-action=home]{--cv-action-glyph: url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20fill='currentColor'%20aria-hidden='true'%3e%3cpath%20d='M50%202L94.5%2040.5Q98%2043.5%2098%2047.5V91Q98%2098%2091%2098H65V78C65%2058%2035%2058%2035%2078V98H9Q2%2098%202%2091V47.5Q2%2043.5%205.5%2040.5Z'%20fill-rule='evenodd'%20clip-rule='evenodd'%20/%3e%3c/svg%3e")}.cv-primary-action:disabled,.cv-primary-action[aria-disabled=true]{opacity:.5}.cv-primary-action:focus-visible{outline:3px solid #1b70db;outline-offset:4px}:root{color:#111827;background:#050a13;--fanview-font-body: var(--cv-font);--fanview-font-control: var(--cv-font);--fanview-font-display: var(--cv-font);--font-sans: var(--fanview-font-body);--font-control: var(--fanview-font-control);--font-display: var(--fanview-font-display);font-family:var(--fanview-font-body);font-synthesis:none;text-rendering:optimizeLegibility;--fanview-navy-950: #111827;--fanview-pink-500: #f22b78;--fanview-pink-700: #ce155f;--fanview-paper: #fffdfb;--fanview-blush: #fff2f7;--fanview-muted: #596273;--fanview-live-red: #e53935;--fanview-live-green: #39d98a;--fanview-line: rgba(15, 23, 42, .1)}*{box-sizing:border-box}html,body,#root{width:100%;min-height:100%;margin:0}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}body{min-height:100dvh;overflow:hidden;-webkit-font-smoothing:antialiased}input{font:inherit}button{font-family:var(--fanview-font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase;-webkit-tap-highlight-color:transparent}button:focus-visible,input:focus-visible,[role=button]:focus-visible{outline:3px solid rgba(242,43,120,.35);outline-offset:2px}.fanview-app,.match-stage{position:relative;width:100vw;height:100dvh;min-height:460px;overflow:hidden;background:#050a13}.match-stage__media{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center}.match-stage__shade{position:absolute;top:0;right:0;bottom:0;left:0;background:#02060c2e;pointer-events:none}.match-stage__empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;background:#0d131d}.court-outline{position:relative;width:min(760px,82vw);aspect-ratio:2.25 / 1;border:2px solid rgba(255,255,255,.12);transform:perspective(480px) rotateX(58deg)}.court-outline__net{position:absolute;top:50%;right:-4%;left:-4%;border-top:2px solid rgba(255,255,255,.18)}.live-pill,.viewer-pill{position:absolute;z-index:3;top:max(28px,env(safe-area-inset-top));display:inline-flex;min-height:38px;align-items:center;justify-content:center;border-radius:8px;color:#fff;box-shadow:0 8px 22px #00000040;font-size:15px;font-weight:600}.live-pill{left:max(28px,env(safe-area-inset-left));gap:8px;padding:0 14px;background:var(--fanview-live-red)}.live-pill__dot{width:9px;height:9px;border-radius:999px;background:#fff}.viewer-pill{right:max(28px,env(safe-area-inset-right));gap:8px;min-width:74px;border:1px solid rgba(255,255,255,.55);padding:0 12px;background:#03080fb8;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-community-enabled=true] .viewer-pill{right:418px}.score-bug{position:absolute;z-index:3;bottom:36px;left:28px;width:min(460px,calc(100vw - 470px));min-width:320px;border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:8px;color:#fff;background:#050e1af5;box-shadow:0 16px 38px #00000059;font-variant-numeric:tabular-nums}.score-bug__timeout{display:flex;min-height:48px;align-items:center;gap:9px;margin-bottom:8px;border:1px solid rgba(255,184,31,.42);border-left:5px solid #ffb81f;border-radius:8px;padding:0 12px;color:#ffb81f;background:#ffb81f0f;font-size:13px;font-weight:600;letter-spacing:.02em}.score-bug__timeout-icon{flex:0 0 auto}.score-bug__ledger{overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:11px}.score-bug__header,.score-bug__row{display:grid;width:100%}.score-bug__header{min-height:42px;border-bottom:1px solid rgba(255,255,255,.22);color:#c7cfdb}.score-bug__format,.score-bug__set-heading{display:flex;align-items:center;justify-content:center;padding:0 8px;font-size:11px;font-weight:600;letter-spacing:.09em}.score-bug__format{justify-content:flex-start;padding-left:16px}.score-bug__set-heading{gap:5px;border-left:1px solid rgba(255,255,255,.22)}.score-bug__set-heading small{display:inline-flex;align-items:center;gap:4px;color:#ff3f75;font-size:8px;letter-spacing:.03em}.score-bug__set-heading small i{width:7px;height:7px;border-radius:999px;background:#ff3f75}.score-bug__row{height:82px}.score-bug__row+.score-bug__row{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team{display:flex;min-width:0;align-items:center;gap:11px;padding:10px 14px;background:#02091261}.score-bug__team-mark{display:grid;width:46px;height:46px;flex:0 0 46px;place-items:center;border:1px solid rgba(255,255,255,.5);border-radius:11px;font-size:14px;font-weight:600;letter-spacing:-.03em}.score-bug__team-copy{display:grid;min-width:0;gap:4px}.score-bug__team-copy>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:-.015em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__team-copy>small{color:#c3cbd6;font-size:9px;font-weight:600;letter-spacing:.1em}.score-bug__team-copy>small b{color:#fff;font-size:11px}.score-bug__set-cell{position:relative;display:grid;min-width:0;place-items:center;border-left:1px solid rgba(255,255,255,.22);color:#aeb7c4}.score-bug__set-cell.is-live{color:#fff}.score-bug__set-cell.is-winner{color:#60df9d;background:#15704847;box-shadow:inset 0 3px #67e1a3}.score-bug__cell-score{font-size:25px;font-weight:600;line-height:1}.score-bug__winner-badge{position:absolute;top:7px;right:7px;display:grid;width:18px;height:18px;place-items:center;border-radius:5px;color:#fff;background:#2b8655;font-size:10px;font-weight:600}.match-status{position:absolute;z-index:4;top:78px;left:50%;border-radius:999px;padding:8px 12px;color:#fff;background:#111827e6;font-size:12px;font-weight:500;transform:translate(-50%)}.community-scrim{position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;display:none;border:0;background:transparent}.community-panel{position:fixed;z-index:10;top:14px;right:14px;bottom:14px;display:grid;width:min(390px,calc(100vw - 28px));grid-template-rows:auto auto minmax(0,1fr) auto;overflow:hidden;border:1px solid rgba(255,255,255,.8);border-radius:26px;color:var(--fanview-navy-950);background:var(--cv-face-light);box-shadow:inset 0 1px #fff,inset 0 -5px #e2e8ee,0 28px 70px #00000047;transform:translate(calc(100% + 32px));transition:transform .18s ease}.community-panel[data-open=true]{transform:translate(0)}.community-panel--broadcaster{top:52px;grid-template-rows:auto minmax(0,1fr);height:auto}.community-scrim[hidden],.community-panel[hidden]{display:none!important}.community-panel:focus{outline:none}.community-handle{display:none}.community-header{display:grid;min-width:0;grid-template-columns:minmax(0,1fr) 42px;align-items:center;gap:12px;padding:26px 22px 12px}.community-header__copy{min-width:0}.community-eyebrow{margin-bottom:6px;color:var(--fanview-pink-500);font-size:11px;font-family:var(--font-control);font-weight:500;letter-spacing:.04em}.community-header h1{display:-webkit-box;overflow:hidden;margin:0;font-size:clamp(20px,1.65vw,23px);font-family:var(--font-display);font-weight:600;letter-spacing:-.035em;line-height:1.12;white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}.community-header p{display:flex;align-items:center;gap:8px;margin:7px 0 0;color:var(--fanview-muted);font-size:13px;font-weight:500}.presence-dot{width:9px;height:9px;border-radius:999px;background:#42a767}.icon-button{display:grid;width:42px;height:42px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;color:var(--fanview-navy-950);background:#fff;cursor:pointer}.safety-notice{display:flex;min-height:39px;align-items:center;gap:9px;margin:0 20px;border:1px solid rgba(242,43,120,.18);border-radius:7px;padding:8px 10px;color:#3f3542;background:var(--fanview-blush);font-size:10px;font-weight:500;line-height:1.25}.safety-notice svg{flex:0 0 auto;color:var(--fanview-pink-500)}.community-feed{min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:19px 20px 16px;scrollbar-width:thin}.community-feed h2{margin:0 0 19px;color:#626875;font-size:11px;font-weight:500;letter-spacing:.055em}.community-message{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;margin-bottom:16px}.community-avatar{display:grid;width:42px;height:42px;place-items:center;border-radius:999px;color:#292543;font-size:15px;font-weight:500}.community-avatar[data-tone=lavender]{background:#eee8ff}.community-avatar[data-tone=blue]{background:#dfebff}.community-avatar[data-tone=green]{background:#dff3e5}.community-avatar[data-tone=gold]{background:#ffe6a1}.community-message__content{min-width:0}.community-message__header{display:flex;min-width:0;align-items:center;gap:7px;min-height:22px}.community-message__header strong{overflow:hidden;font-size:14px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}.community-message__header span{flex:0 0 auto;border-radius:999px;padding:3px 7px;color:#644cdb;background:#efebff;font-size:10px;font-weight:500}.community-message__header span[data-role=Coach]{color:#2765cf;background:#e3edff}.community-message__header span[data-role=Teammate]{color:#af6d00;background:#fff0c8}.community-message p{margin:2px 0 0;color:#242834;font-size:14px;font-weight:600;line-height:1.36;overflow-wrap:anywhere}.community-message[data-own=true] p{border-radius:12px;padding:8px 10px;color:#fff;background:var(--fanview-navy-950)}.reaction-row{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}.reaction-row button{display:inline-flex;min-width:45px;min-height:27px;align-items:center;justify-content:center;gap:5px;border:1px solid var(--fanview-line);border-radius:999px;padding:3px 8px;color:#5f6370;background:#fff;font-size:11px;cursor:pointer}.community-composer{display:grid;gap:10px;border-top:1px solid var(--fanview-line);padding:12px 16px max(13px,env(safe-area-inset-bottom));background:#fffdfbfa}.quick-cheers{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.quick-cheers button{display:grid;min-width:44px;height:44px;place-items:center;border:1px solid var(--fanview-line);border-radius:999px;background:#fff;font-size:20px;cursor:pointer}.quick-cheers button:hover:not(:disabled){border-color:#f22b7861;background:#fff7fa}.composer-row{display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:10px}.composer-row input{min-width:0;height:46px;border:1px solid rgba(15,23,42,.14);border-radius:999px;padding:0 17px;color:var(--fanview-navy-950);background:#fff;font-size:13px;font-weight:600}.composer-row input::placeholder{color:#596273}.send-button{display:grid;width:46px;height:46px;place-items:center;border:0;border-radius:999px;color:#fff;background:var(--fanview-pink-500);cursor:pointer}.send-button:disabled,.quick-cheers button:disabled{cursor:not-allowed;opacity:.48}.composer-meta{display:flex;min-height:10px;justify-content:flex-end;color:#596273;font-size:10px;font-weight:600}.message-skeletons{display:grid;gap:14px}.message-skeletons span{display:block;width:100%;height:48px;border-radius:12px;background:#f0f1f4}.community-inline-status,.community-failure-copy{display:grid;gap:6px;border:1px solid var(--fanview-line);border-radius:13px;padding:14px;color:var(--fanview-muted);background:#f8f8f9;font-size:12px;line-height:1.4}.community-inline-status strong,.community-failure-copy strong{color:var(--fanview-navy-950);font-size:14px}.community-panel--failed{place-items:center;padding:24px;transform:none}.community-launcher{position:fixed;z-index:12;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));display:inline-flex;min-height:50px;align-items:center;gap:9px;border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:0 16px;color:#fff;background:var(--fanview-pink-500);box-shadow:0 14px 34px #1118274d;font-size:13px;font-weight:600;cursor:pointer}.community-launcher span{display:grid;min-width:22px;height:22px;place-items:center;border-radius:999px;padding:0 5px;background:#11182738;font-size:10px}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;clip-path:inset(50%)}@media(max-width:720px){.fanview-app,.match-stage{min-height:0}.match-stage__media{height:42dvh;min-height:240px;object-position:51% center}.match-stage__shade{bottom:auto;height:42dvh;min-height:240px}.live-pill,.viewer-pill{top:max(13px,env(safe-area-inset-top));min-height:29px;border-radius:6px;font-size:11px}.live-pill{left:max(13px,env(safe-area-inset-left));gap:6px;padding:0 10px}.live-pill__dot{width:7px;height:7px}.viewer-pill,.fanview-app[data-community-enabled=true] .viewer-pill{right:max(13px,env(safe-area-inset-right));gap:6px;min-width:58px;padding:0 8px}.viewer-pill svg{width:15px;height:15px}.score-bug{display:none}.community-scrim{display:block;opacity:0;pointer-events:none;background:#02070e6b;transition:opacity .18s ease}.community-scrim[data-open=true]{opacity:1;pointer-events:auto}.community-panel,.community-panel--failed{top:auto;right:0;bottom:0;left:0;width:100%;height:min(72dvh,680px);border-right:0;border-bottom:0;border-left:0;border-radius:24px 24px 0 0;transform:translateY(calc(100% + 24px))}.community-panel[data-open=true],.community-panel--failed{transform:translateY(0)}.community-panel--broadcaster{height:min(58dvh,520px)}.community-handle{position:absolute;z-index:2;top:7px;left:50%;display:block;width:72px;height:18px;cursor:grab;transform:translate(-50%);touch-action:none}.community-handle:after{position:absolute;top:0;left:16px;width:40px;height:4px;border-radius:999px;background:#1118272e;content:""}.community-header{gap:7px;padding:26px 14px 10px}.community-header h1{font-size:18px}.safety-notice{margin:0 15px}.community-feed{padding:16px 16px 10px}.community-message{grid-template-columns:34px minmax(0,1fr);gap:10px;margin-bottom:14px}.community-avatar{width:34px;height:34px;font-size:12px}.community-message__header strong{font-size:12px}.community-message p{font-size:12px;line-height:1.32}.reaction-row{gap:6px;margin-top:6px}.reaction-row button{min-width:40px;min-height:24px;font-size:10px}.community-composer{gap:9px;padding:10px 13px max(10px,env(safe-area-inset-bottom))}.quick-cheers{gap:7px}.quick-cheers button{min-width:44px;height:44px;font-size:18px}.composer-row{grid-template-columns:minmax(0,1fr) 44px;gap:8px}.composer-row input,.send-button{height:44px}.send-button{width:44px}}@media(max-width:380px){.quick-cheers button{min-width:44px;width:auto;height:44px}.quick-cheers{grid-template-columns:repeat(3,minmax(44px,1fr))}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition-duration:.01ms!important}}@media(forced-colors:active){.live-pill,.viewer-pill,.community-panel,.community-launcher,.send-button{border:1px solid CanvasText}}.viewer-account{min-height:100dvh;display:grid;place-items:center;padding:24px 16px;background:#f5f7fa;color:#101827;font-family:var(--cv-font)}.viewer-account__card{width:min(100%,460px);box-sizing:border-box;padding:28px;border:1px solid #dbe2e9;border-radius:24px;background:linear-gradient(145deg,#fff,#f7f9fb);box-shadow:0 3px #dfe5ea,0 12px 32px #13253818,inset 0 2px #fff}.viewer-account h1{font-size:28px;line-height:1.25;font-weight:600;margin:12px 0}.viewer-account p{font-size:15px;line-height:1.6}.viewer-account__brand{font-weight:600;color:#26384a}.viewer-account button,.viewer-account input{font:inherit;min-height:46px;border-radius:12px;border:1px solid #c6d0db;padding:10px 14px;box-sizing:border-box}.viewer-account button{cursor:pointer;background:#fff;color:#101827;font-weight:600}.viewer-account button:disabled{opacity:.6;cursor:wait}.viewer-account__providers{display:grid;gap:10px;margin:22px 0}.viewer-account__modes{display:flex;gap:8px;margin:20px 0}.viewer-account__modes button{flex:1}.viewer-account__modes [aria-pressed=true]{border-color:#008954;box-shadow:inset 0 -3px #00c978}.viewer-account form,.viewer-account label{display:grid;gap:8px}.viewer-account form{gap:16px}.viewer-account input{width:100%;background:#fff;color:#101827}.viewer-account .viewer-account__primary{background:linear-gradient(135deg,#25ed96,#00cfa5);border:0;border-radius:14px;clip-path:polygon(16px 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%,0 16px)}.viewer-account a{color:#27506e;text-decoration:underline}.viewer-account__legal{font-size:12px!important}.viewer-account__home{display:inline-flex;align-items:center;min-height:44px}.viewer-account :focus-visible{outline:3px solid #1769aa;outline-offset:3px}.viewer-account,.viewer-account *{text-transform:none;letter-spacing:normal}.viewer-account__brand{display:flex;align-items:center;gap:14px;margin-bottom:24px}.viewer-account__brand img{display:block;flex-shrink:0;filter:none;opacity:1}.viewer-account__brand span{font-size:16px;font-weight:600}.viewer-account__providers button{display:flex;align-items:center;justify-content:center;gap:12px;min-height:52px;font-size:16px;line-height:24px}.viewer-account__providers img{object-fit:contain;flex-shrink:0}.viewer-account__providers .viewer-account__google{background:#fff;color:#171717;border-color:#aeb8c4}.viewer-account__providers .viewer-account__apple{background:#000;color:#fff;border-color:#000}.viewer-account .viewer-account__primary{min-height:56px;background:var(--cv-primary-material) center/100% 100% no-repeat;color:#061b13;clip-path:none;border-radius:0;padding:14px 27px;font-size:18px;line-height:28px;font-weight:600;opacity:1;box-shadow:0 4px 12px #00a86e21}.viewer-account .viewer-account__primary:disabled{opacity:.6}.viewer-account button,.viewer-account input{font-family:var(--cv-font);text-transform:none}@media(prefers-color-scheme:dark){.viewer-account{background:#070e13;color:#f5f8fb}.viewer-account__card{background:linear-gradient(145deg,#1b2931,#0e191f);border-color:#526773;box-shadow:0 4px #050a0e,0 14px 32px #0009,inset 0 2px #ffffff1c}.viewer-account__brand{color:#edf3f7}.viewer-account p{color:#cbd5df}.viewer-account h1{color:#f6f8fc}.viewer-account button,.viewer-account input{background:#14212a;color:#f5f8fb;border-color:#526773}.viewer-account__providers .viewer-account__apple{border-color:#82919d}.viewer-account__modes [aria-pressed=true]{border-color:#00c978}.viewer-account a{color:#b2d5f1}.viewer-account :focus-visible{outline-color:#72b9f4}}.live-media,.live-media__video,.live-media__iframe{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;border:0}.live-media{overflow:hidden;background:#000}.live-media__video,.live-media__iframe{object-fit:cover}.live-media__video{pointer-events:none}.live-media__video::-webkit-media-controls{display:none!important}.live-media__video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}.live-media__video[data-rotation="-90"],.live-media__video[data-rotation="90"]{inset:auto;top:50%;left:50%;width:100dvh;height:100dvw}.live-media__video[data-rotation="-90"]{transform:translate(-50%,-50%) rotate(-90deg)}.live-media__video[data-rotation="90"]{transform:translate(-50%,-50%) rotate(90deg)}.live-media__video[data-rotation="180"]{transform:rotate(180deg)}.match-stage.is-web-fullscreen{position:fixed;z-index:1000;top:0;right:0;bottom:0;left:0;width:100dvw;height:100dvh}.live-media__presentation-canvas{display:none}.live-media__presentation-video{position:absolute;right:0;bottom:0;width:1px;height:1px;opacity:.001;pointer-events:none}.live-media__status{position:absolute;z-index:3;top:50%;left:50%;border-radius:999px;padding:9px 14px;color:#fff;background:#050a13d1;font-size:13px;font-weight:600;transform:translate(-50%,-50%)}.live-media__play{position:absolute;z-index:6;top:50%;left:50%;display:grid;width:56px;height:56px;place-items:center;border:0;border-radius:999px;padding:0;color:#fff;background:#050a13c2;box-shadow:0 10px 28px #00000047;transform:translate(-50%,-50%);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.live-media__play svg{transform:translate(1px)}.media-controls{position:absolute;z-index:5;right:auto;bottom:max(24px,env(safe-area-inset-bottom));left:max(24px,env(safe-area-inset-left));display:flex;max-width:calc(100% - 48px);flex-wrap:wrap;justify-content:flex-start;gap:8px}.media-control{display:flex;min-width:58px;min-height:68px;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:0;border-radius:0;padding:0;color:#fff;background:transparent;font-weight:600;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:content-box;width:22px;height:22px;border:1px solid rgba(255,255,255,.58);border-radius:11px;padding:10px;background:#03080fbd;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control__label{display:block;font-size:10px}@media(min-width:721px){.media-control__label{border-radius:4px;background:#03080fe6;box-shadow:0 0 0 2px #03080fe6;white-space:nowrap}}.media-control:disabled{cursor:not-allowed;opacity:.58}.viewer-header{position:absolute;z-index:5;top:max(28px,env(safe-area-inset-top));right:max(28px,env(safe-area-inset-right));left:max(28px,env(safe-area-inset-left));display:flex;align-items:center;justify-content:space-between;gap:12px;pointer-events:none}.viewer-header--without-team-hub{justify-content:flex-end}.viewer-header__status{display:flex;min-width:0;align-items:center;justify-content:flex-end;gap:10px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{position:relative;inset:auto;pointer-events:auto}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:48px}.match-status--action{max-width:min(440px,calc(100vw - 56px));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.fanview-state-page{min-height:100dvh;display:grid;place-items:center;padding:24px;color:#fff;background:#050a13}.fanview-state-camera{position:relative;width:min(760px,100%);min-height:min(680px,calc(100dvh - 48px));overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:28px;background:#07101b;box-shadow:0 28px 80px #0000005c}.fanview-state-camera__court{position:absolute;top:0;right:0;bottom:238px;left:0;background:linear-gradient(#050a134d,#050a13a8),repeating-linear-gradient(90deg,transparent 0 15%,rgba(255,255,255,.035) 15% 15.4%),#111b27}.fanview-state-camera__court:before,.fanview-state-camera__court:after,.fanview-state-camera__court span{position:absolute;border:2px solid rgba(255,255,255,.16);content:""}.fanview-state-camera__court:before{top:20%;right:12%;bottom:13%;left:12%}.fanview-state-camera__court:after{top:52%;right:8%;left:8%;border-width:2px 0 0}.fanview-state-camera__court span{top:20%;bottom:13%;left:50%;border-width:0 0 0 2px}.fanview-state-card{position:absolute;right:18px;bottom:18px;left:18px;display:grid;gap:10px;border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:20px;text-align:left;background:#080d15f0;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.fanview-state-card strong{font-size:clamp(22px,4vw,30px)}.fanview-state-card>span{color:#c3cad4;line-height:1.45}.fanview-state-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:4px}.fanview-state-action{display:inline-flex;min-width:0;min-height:48px;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:0 13px;color:#fff;background:#ffffff14;font:inherit;font-size:13px;font-weight:600;text-align:center;text-decoration:none}.fanview-state-action--primary{border-color:#f22b78;background:#f22b78}.fanview-state-action--support{grid-column:1 / -1}.fanview-state-action:disabled{opacity:.5}.team-hub-back{position:absolute;z-index:5;top:max(82px,calc(env(safe-area-inset-top) + 58px));left:max(28px,env(safe-area-inset-left));display:inline-flex;min-height:44px;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.44);border-radius:999px;padding:0 13px;color:#fff;background:#03080fbd;font-size:13px;font-weight:600;text-decoration:none;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(340px,calc(100vw - 470px));min-width:300px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:66px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:38px;height:38px;flex-basis:38px;font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:12px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:20px}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(460px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(580px,calc(100vw - 470px))}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:94px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:54px;height:54px;flex-basis:54px;font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:17px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:30px}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:auto;bottom:auto;left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(88px,calc(env(safe-area-inset-top) + 64px));right:max(28px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:max(28px,env(safe-area-inset-bottom));left:max(28px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(28px,env(safe-area-inset-right));bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:max(84px,calc(env(safe-area-inset-bottom) + 64px));left:50%;transform:translate(-50%)}.scoreboard-display-trigger{display:inline-flex;min-width:48px;min-height:48px;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:0 12px;color:#fff;background:#03080fbd;font-weight:600;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.scoreboard-display-trigger--standalone{position:absolute;z-index:5;right:max(24px,env(safe-area-inset-right));bottom:max(24px,env(safe-area-inset-bottom))}.scoreboard-display-menu{position:absolute;z-index:9;top:max(80px,calc(env(safe-area-inset-top) + 56px));right:max(28px,env(safe-area-inset-right));display:grid;width:min(290px,calc(100vw - 32px));gap:9px;border:1px solid rgba(255,255,255,.42);border-radius:16px;padding:14px;color:#fff;background:#030a14f5;box-shadow:0 18px 48px #0000006b;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}.scoreboard-display-menu>strong{font-size:15px}.scoreboard-display-menu__label{color:#bdc7d4;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase}.scoreboard-display-menu__options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.scoreboard-display-menu__positions{grid-template-columns:1fr 1fr}.scoreboard-display-menu button{min-width:0;min-height:44px;border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:0 8px;color:#fff;background:#ffffff0a;font-size:10px;font-weight:600}.scoreboard-display-menu button[aria-pressed=true]{border-color:#ff3f75;background:#ff3f752e;box-shadow:inset 0 0 0 1px #ff3f75}.scoreboard-display-menu__reset{width:100%}@media(max-width:720px){.fanview-app{--fanview-mobile-bottom-inset: max( 12px, env(safe-area-inset-bottom) );--fanview-mobile-cheer-width: min( clamp(104px, 42vw, 160px), calc(100vw - max(10px, env(safe-area-inset-left)) - max(10px, env(safe-area-inset-right)) - 186px) )}.match-status--action{display:none}.score-bug{display:block;top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));width:min(370px,calc(100vw - 20px));min-width:0;border-radius:12px;padding:6px;box-shadow:0 10px 28px #00000057}.fanview-app[data-scoreboard-size=small] .score-bug{width:min(300px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:min(370px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:calc(100vw - 20px);min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:50%;transform:translate(-50%)}.score-bug__timeout{min-height:44px;margin-bottom:6px;padding:0 9px;font-size:10px}.score-bug__header{min-height:34px}.score-bug__format,.score-bug__set-heading{padding:0 5px;font-size:8px}.score-bug__format{padding-left:9px}.score-bug__set-heading{display:grid;place-items:center;gap:0}.score-bug__set-heading small{gap:3px;font-size:6px}.score-bug__set-heading small i{width:5px;height:5px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:64px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:54px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:74px}.score-bug__team{gap:7px;padding:7px 9px}.score-bug__team-mark,.fanview-app[data-scoreboard-size=standard] .score-bug__team-mark{width:34px;height:34px;flex-basis:34px;border-radius:8px;font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-mark{width:28px;height:28px;flex-basis:28px;font-size:8px}.fanview-app[data-scoreboard-size=large] .score-bug__team-mark{width:40px;height:40px;flex-basis:40px;font-size:11px}.score-bug__team-copy>strong,.fanview-app[data-scoreboard-size=standard] .score-bug__team-copy>strong{font-size:10px}.fanview-app[data-scoreboard-size=small] .score-bug__team-copy>strong{font-size:9px}.fanview-app[data-scoreboard-size=large] .score-bug__team-copy>strong{font-size:11px}.score-bug__team-copy>small{font-size:7px}.score-bug__team-copy>small b{font-size:9px}.score-bug__cell-score,.fanview-app[data-scoreboard-size=standard] .score-bug__cell-score{font-size:19px}.fanview-app[data-scoreboard-size=small] .score-bug__cell-score{font-size:16px}.fanview-app[data-scoreboard-size=large] .score-bug__cell-score{font-size:22px}.score-bug__winner-badge{top:4px;right:4px;width:15px;height:15px;border-radius:4px;font-size:8px}.media-controls{right:calc(var(--fanview-mobile-cheer-width) + max(10px,env(safe-area-inset-right)) + 8px);bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));display:grid;max-width:none;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0;overflow:hidden;border:1px solid rgba(255,255,255,.26);border-radius:22px;background:#03080fcc;box-shadow:0 8px 22px #00000040;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.media-control{min-width:44px;min-height:58px;flex-direction:column;gap:4px;border:0;border-radius:0;padding:6px 2px 5px;background:transparent;box-shadow:none;font-size:10px;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control svg{box-sizing:border-box;width:20px;height:20px;border:0;border-radius:0;padding:0;background:transparent;-webkit-backdrop-filter:none;backdrop-filter:none}.media-control+.media-control{border-left:1px solid rgba(255,255,255,.2)}.media-control__label{display:block;overflow:hidden;max-width:100%;color:#fff;font-size:8px;font-weight:500;line-height:1.15;overflow:visible;overflow-wrap:anywhere;text-overflow:clip;white-space:normal;text-align:center}.media-control svg{flex:0 0 auto;width:16px;height:16px;color:#fff}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);width:var(--fanview-mobile-cheer-width);min-height:58px;min-width:0;justify-content:center;gap:5px;overflow:hidden;padding:0 8px;font-size:10.5px;white-space:nowrap}.community-launcher svg{flex:0 0 auto;width:17px;height:17px}.community-launcher span{flex:0 0 auto;min-width:19px;height:19px;padding:0 4px}.viewer-header{top:max(13px,env(safe-area-inset-top));right:max(13px,env(safe-area-inset-right));left:max(13px,env(safe-area-inset-left));gap:8px}.viewer-header__status{gap:8px}.fanview-app .viewer-header .team-hub-back,.fanview-app .viewer-header .live-pill,.fanview-app .viewer-header .viewer-pill{min-height:44px}.fanview-app .viewer-header .team-hub-back{padding:0 11px;font-size:11px}.fanview-app .viewer-header .live-pill{padding:0 10px}.scoreboard-display-trigger--standalone{right:auto;bottom:var(--fanview-mobile-bottom-inset);left:max(10px,env(safe-area-inset-left));min-width:44px;min-height:44px;padding:0 10px;font-size:11px}.scoreboard-display-menu{top:max(62px,calc(env(safe-area-inset-top) + 46px));right:max(10px,env(safe-area-inset-right));width:min(284px,calc(100vw - 20px))}.fanview-state-page{padding:12px}.fanview-state-camera{min-height:calc(100dvh - 24px);border-radius:22px}.fanview-state-actions{grid-template-columns:1fr 1fr}}@media(max-width:380px){.score-bug__team-copy>strong{font-size:10px}}@media(max-width:340px){.score-bug__team-mark{display:none}.score-bug__team{padding:5px 7px}}@media(max-width:300px){.viewer-header{right:max(8px,env(safe-area-inset-right));left:max(8px,env(safe-area-inset-left));gap:4px}.viewer-header__status{gap:4px}.fanview-app .viewer-header .team-hub-back{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .team-hub-back svg{width:15px;height:15px}.fanview-app .viewer-header .live-pill{gap:4px;padding:0 7px;font-size:9.5px}.fanview-app .viewer-header .live-pill__dot{width:6px;height:6px}.fanview-app .viewer-header .viewer-pill{min-width:0;gap:4px;padding:0 6px;font-size:9.5px}.fanview-app .viewer-header .viewer-pill svg{width:13px;height:13px}.media-controls{right:max(8px,env(safe-area-inset-right));bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.community-launcher{right:max(8px,env(safe-area-inset-right));bottom:var(--fanview-mobile-bottom-inset);left:max(8px,env(safe-area-inset-left));width:auto}.scoreboard-display-trigger--standalone{right:auto;bottom:calc(var(--fanview-mobile-bottom-inset) + 66px);left:max(8px,env(safe-area-inset-left))}.fanview-app[data-scoreboard-size] .score-bug{right:auto;width:calc(100vw - 16px);min-width:0;bottom:calc(var(--fanview-mobile-bottom-inset) + 133px);left:max(8px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-left] .score-bug,.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(104px,calc(env(safe-area-inset-top) + 80px));right:auto;bottom:auto;left:max(8px,env(safe-area-inset-left))}.score-bug__team-mark{display:none}.score-bug__team{padding:5px 6px}.score-bug__team-copy>strong{font-size:8px}.score-bug__team-copy>small{font-size:6px}.score-bug__cell-score{font-size:15px}.score-bug__winner-badge{top:3px;right:3px;width:13px;height:13px;font-size:7px}.scoreboard-display-menu{right:max(8px,env(safe-area-inset-right));width:calc(100vw - 16px);padding:10px}.fanview-state-actions{grid-template-columns:1fr}.fanview-state-action--support{grid-column:auto}}.arena-scoreboard{min-height:100dvh;overflow:hidden;display:grid;grid-template-rows:auto 1fr auto auto;align-items:center;justify-items:center;gap:clamp(18px,4vh,52px);padding:clamp(28px,5vh,72px) clamp(34px,5vw,96px);color:#fff;background:radial-gradient(circle at 0 50%,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent 42%),radial-gradient(circle at 100% 50%,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent 42%),#03070c}.arena-scoreboard__header{display:grid;justify-items:center;gap:18px;font-family:var(--font-sans);letter-spacing:.24em}.arena-scoreboard__header strong{font-family:var(--font-display);font-size:clamp(24px,2.2vw,42px)}.arena-scoreboard__header span{font-size:clamp(16px,1.55vw,30px);font-weight:600}.arena-scoreboard__board{width:min(100%,1500px);overflow:hidden;display:grid;grid-template-columns:1fr minmax(120px,11%) 1fr;border:2px solid rgba(255,255,255,.42);border-radius:18px;background:#03080fe6;box-shadow:0 30px 80px #00000080}.arena-scoreboard__team{min-width:0;min-height:clamp(190px,30vh,340px);display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:clamp(14px,1.6vw,30px);padding:clamp(22px,2.3vw,42px)}.arena-scoreboard__team--home{background:linear-gradient(90deg,color-mix(in srgb,var(--arena-home) 34%,transparent),transparent)}.arena-scoreboard__team--away{background:linear-gradient(270deg,color-mix(in srgb,var(--arena-away) 34%,transparent),transparent)}.arena-scoreboard__team i{width:16px;height:132px;border-radius:999px;background:var(--arena-home)}.arena-scoreboard__team--away i{background:var(--arena-away)}.arena-scoreboard__team span{min-width:0;display:grid;gap:18px}.arena-scoreboard__team b{overflow:hidden;color:#fff;font-family:var(--font-display);font-size:clamp(18px,1.55vw,38px);text-overflow:ellipsis;white-space:nowrap}.arena-scoreboard__team small{color:var(--arena-home);font-size:clamp(18px,2vw,34px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__team--away span{text-align:right}.arena-scoreboard__team--away small{color:var(--arena-away)}.arena-scoreboard__team>strong{font-family:var(--font-display);font-size:clamp(84px,10vw,180px);font-variant-numeric:tabular-nums;line-height:.85}.arena-scoreboard__set{display:grid;place-items:center;border-inline:1px solid rgba(255,255,255,.34);color:#c8ced6;font-size:clamp(22px,2.6vw,46px);font-weight:600;letter-spacing:.08em}.arena-scoreboard__history{grid-column:1 / -1;min-height:92px;display:flex;justify-content:center;border-top:1px solid rgba(255,255,255,.34)}.arena-scoreboard__history>div{min-width:280px;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;border-inline:1px solid rgba(255,255,255,.24);text-align:center}.arena-scoreboard__history b,.arena-scoreboard__history span{font-size:clamp(22px,2.6vw,44px);font-variant-numeric:tabular-nums}.arena-scoreboard__history span{color:#a9b0b9}.arena-scoreboard__history span:first-of-type.is-winner{color:var(--arena-home)}.arena-scoreboard__history span:last-of-type.is-winner{color:var(--arena-away)}.arena-scoreboard__timeout{min-height:90px;display:grid;grid-auto-flow:column;place-items:center;justify-content:center;gap:22px;padding-inline:64px;border:2px solid #d99212;border-radius:16px;color:#ffb320;background:#341f04e0;font-size:clamp(22px,2.4vw,42px);font-weight:600}.arena-scoreboard footer{position:relative;width:min(100%,1500px);display:grid;place-items:center;color:#b8bec7;font-size:clamp(16px,1.55vw,28px)}.arena-scoreboard footer>div{position:absolute;right:0;bottom:-18px;display:grid;place-items:center}.arena-scoreboard footer>div b{position:absolute;font-size:9px;letter-spacing:.08em}@media(orientation:portrait),(max-width:760px){.arena-scoreboard{align-content:center;gap:22px;padding:24px 14px}.arena-scoreboard__board{grid-template-columns:1fr}.arena-scoreboard__set{min-height:70px;border:1px solid rgba(255,255,255,.34)}.arena-scoreboard__team{min-height:150px}.arena-scoreboard__history{grid-column:1;overflow-x:auto;justify-content:flex-start}.arena-scoreboard__timeout{min-height:64px;padding-inline:24px}.arena-scoreboard footer>div{display:none}}@media(max-width:980px)and (max-height:520px)and (orientation:landscape){.fanview-app,.match-stage{height:100dvh;min-height:0}.viewer-header{top:max(9px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));left:max(10px,env(safe-area-inset-left))}.media-controls{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:max(10px,env(safe-area-inset-left));display:grid;width:246px;grid-template-columns:minmax(44px,.9fr) minmax(44px,.9fr) minmax(44px,1fr) minmax(44px,1.2fr);gap:0}.media-control{min-width:44px;min-height:58px;padding:6px 2px 5px}.media-control__label{display:block}.fanview-app[data-scoreboard-size=small] .score-bug{width:260px;min-width:0}.fanview-app[data-scoreboard-size=standard] .score-bug{width:330px;min-width:0}.fanview-app[data-scoreboard-size=large] .score-bug{width:min(430px,calc(100vw - 20px));min-width:0}.fanview-app[data-scoreboard-position=top-left] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:auto;bottom:auto;left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=top-right] .score-bug{top:max(62px,calc(env(safe-area-inset-top) + 48px));right:max(10px,env(safe-area-inset-right));bottom:auto;left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-left] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:max(10px,env(safe-area-inset-left));transform:none}.fanview-app[data-scoreboard-position=bottom-right] .score-bug{top:auto;right:max(10px,env(safe-area-inset-right));bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:auto;transform:none}.fanview-app[data-scoreboard-position=bottom-center] .score-bug{top:auto;right:auto;bottom:calc(max(10px,env(safe-area-inset-bottom)) + 80px);left:50%;transform:translate(-50%)}.score-bug__header{min-height:30px}.score-bug__row,.fanview-app[data-scoreboard-size=standard] .score-bug__row{height:52px}.fanview-app[data-scoreboard-size=small] .score-bug__row{height:46px}.fanview-app[data-scoreboard-size=large] .score-bug__row{height:58px}.score-bug__timeout{min-height:40px;font-size:9px}.score-bug__team{gap:6px;padding:5px 7px}.score-bug__team-mark{width:28px;height:28px;flex-basis:28px}.score-bug__team-copy>strong{font-size:9px}.score-bug__cell-score{font-size:17px}.scoreboard-display-trigger--standalone{right:auto;bottom:max(10px,env(safe-area-inset-bottom));left:50%;transform:translate(-50%)}.scoreboard-display-menu{top:max(58px,calc(env(safe-area-inset-top) + 44px));width:min(278px,calc(100vw - 20px));gap:6px;padding:10px}.community-launcher{right:max(10px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));width:auto;min-height:58px;padding:0 12px;font-size:12px}}.score-bug{width:auto;min-width:0;border:0;border-radius:0;padding:0;background:transparent;box-shadow:none}.score-bug__full-card,.score-bug__bar-card,.score-bug__minimal-card{overflow:hidden;border:1px solid rgba(255,255,255,.34);color:#fff;background:#03080fed;box-shadow:0 14px 34px #00000057;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.score-bug__full-card{width:100%;border-radius:10px}.score-bug__full-team{display:grid;height:62px;grid-template-columns:7px minmax(0,1fr) auto 54px;align-items:center;gap:12px;padding:0 12px}.score-bug__full-team+.score-bug__full-team{border-top:1px solid rgba(255,255,255,.22)}.score-bug__team-accent{width:7px;height:33px;border-radius:999px}.score-bug__full-team>strong{overflow:hidden;font-size:15px;font-weight:600;letter-spacing:.01em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__full-team>b{font-size:30px;font-variant-numeric:tabular-nums;font-weight:600;line-height:1;text-align:right}.score-bug__set-dots{display:inline-flex;gap:6px}.score-bug__set-dots i{width:9px;height:9px;border-radius:999px;background:#4a5059}.score-bug__full-team:first-child .score-bug__set-dots i.is-won{background:#23cdb5}.score-bug__full-team:nth-child(2) .score-bug__set-dots i.is-won{background:#ff7046}.score-bug__full-meta{display:flex;min-height:38px;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.22);padding:0 12px;color:#aeb7c4;font-size:12px;font-weight:600;letter-spacing:.08em}.score-bug__history{font-variant-numeric:tabular-nums}.score-bug__history--full{display:grid;min-height:42px;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.22)}.score-bug__history-set{position:relative;display:flex;min-width:0;align-items:center;justify-content:center;gap:6px;color:#929aa6;font-size:13px;font-weight:600}.score-bug__history-set+.score-bug__history-set{border-left:1px solid rgba(255,255,255,.22)}.score-bug__history-label{margin-right:7px;color:#aeb7c4;font-size:11px}.score-bug__history-score{position:relative}.score-bug__history-score.is-winner{color:#fff}.score-bug__history--full .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(odd) .score-bug__history-score.is-winner{color:#23cdb5}.score-bug__history--full .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner,.score-bug__history--bar .score-bug__history-set:nth-child(2n) .score-bug__history-score.is-winner{color:#ff7046}.score-bug__history .score-bug__winner-badge,.scoreboard-sr-only{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;margin:-1px!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}.score-bug__timeout{min-height:40px;justify-content:center;margin:0 0 8px;border:1px solid rgba(255,179,32,.56);border-radius:8px;padding:0 12px;color:#ffb320;background:#362004e6;font-size:11px}.score-bug--score-bar .score-bug__timeout{width:fit-content;min-width:210px;margin-right:auto;margin-left:auto;border-radius:999px}.score-bug__bar-card{display:grid;min-height:72px;grid-template-columns:minmax(0,1fr) minmax(132px,.85fr) minmax(0,1fr);border-radius:9px}.score-bug__bar-team{display:grid;min-width:0;align-items:center;gap:12px;padding:0 14px}.score-bug__bar-team--home{grid-template-columns:7px minmax(0,1fr) auto}.score-bug__bar-team--away{grid-template-columns:auto minmax(0,1fr) 7px}.score-bug__bar-team i{width:7px;height:38px;border-radius:999px}.score-bug__bar-team span{overflow:hidden;font-size:15px;font-weight:600;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.score-bug__bar-team--away span{text-align:right}.score-bug__bar-team strong{font-size:30px;font-variant-numeric:tabular-nums;line-height:1}.score-bug__bar-center{display:grid;align-content:center;border-right:1px solid rgba(255,255,255,.22);border-left:1px solid rgba(255,255,255,.22);gap:3px;text-align:center}.score-bug__bar-center>span{color:#d8dde4;font-size:11px;font-weight:600;letter-spacing:.08em}.score-bug__history--bar{display:flex;justify-content:center}.score-bug__history--bar .score-bug__history-set{gap:5px;padding:0 8px;font-size:11px}.score-bug__history--bar .score-bug__history-label{margin-right:0;font-size:8px}.score-bug__minimal-card{display:flex;min-height:54px;align-items:center;gap:13px;border-radius:999px;padding:6px 18px 6px 6px}.score-bug__minimal-card>span{display:inline-flex;min-height:40px;align-items:center;border-radius:999px;padding:0 18px;color:#07101b;background:#ff5f2d;font-size:14px;font-weight:600}.score-bug__minimal-card>strong{font-size:20px;font-variant-numeric:tabular-nums;font-weight:600}.score-bug__minimal-card>i{color:#969eaa;font-style:normal;font-weight:600}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=small] .score-bug{width:min(285px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=standard] .score-bug{width:min(344px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=full-score][data-scoreboard-size=large] .score-bug{width:min(408px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=small] .score-bug{width:min(570px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=standard] .score-bug{width:min(720px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=score-bar][data-scoreboard-size=large] .score-bug{width:min(880px,calc(100vw - 20px))}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=small] .score-bug{width:auto;transform:scale(.86);transform-origin:bottom center}.fanview-app[data-scoreboard-layout=minimal][data-scoreboard-size=large] .score-bug{width:auto;transform:scale(1.16);transform-origin:bottom center}.scoreboard-display-menu{position:fixed;top:auto;right:auto;bottom:0;left:50%;width:min(680px,100vw);max-height:min(830px,calc(100dvh - 76px));grid-auto-rows:max-content;align-content:start;overflow-y:auto;gap:14px;border-radius:24px 24px 0 0;padding:14px 28px max(24px,env(safe-area-inset-bottom));transform:translate(-50%)}.scoreboard-display-menu__handle{width:46px;height:5px;justify-self:center;border-radius:999px;background:#65717c}.scoreboard-display-menu>strong{font-size:24px;line-height:1.1;text-align:center}.scoreboard-display-menu>p{margin:-3px 0 4px;color:#aab2bf;font-size:14px;text-align:center}.scoreboard-display-menu__label{color:#fff;font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__layouts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.scoreboard-display-menu button.scoreboard-display-menu__layout{position:relative;display:grid;min-height:178px;grid-template-rows:minmax(98px,1fr) minmax(20px,auto) minmax(42px,auto);align-items:center;border-radius:12px;padding:10px 7px 0}.scoreboard-display-menu__layout>b{grid-row:3;min-width:0;overflow-wrap:anywhere;align-self:stretch;display:grid;place-items:center;border-top:1px solid rgba(255,255,255,.22);font-size:13px;letter-spacing:.06em}.scoreboard-display-menu__layout>small{grid-row:2;min-width:0;line-height:1.25;overflow-wrap:anywhere;color:#ff3f75;font-size:8px;font-weight:600}.scoreboard-display-menu__check,.scoreboard-display-menu__option-check,.scoreboard-display-menu__position-check{position:absolute;display:grid;place-items:center;border-radius:999px;color:#fff;background:#ef3d68}.scoreboard-display-menu__check{top:10px;right:10px;width:30px;height:30px}.scoreboard-layout-preview{position:relative;display:block;justify-self:center;border:1px solid rgba(255,255,255,.34);background:#050a11}.scoreboard-layout-preview--full-score{width:122px;height:65px;border-radius:6px}.scoreboard-layout-preview--full-score i{display:block;height:21px;border-bottom:1px solid rgba(255,255,255,.22)}.scoreboard-layout-preview--full-score i:first-child{border-left:4px solid #20cdb4}.scoreboard-layout-preview--full-score i:nth-child(2){border-left:4px solid #ff7046}.scoreboard-layout-preview--score-bar{width:142px;height:35px;border-radius:5px}.scoreboard-layout-preview--score-bar i:first-child,.scoreboard-layout-preview--score-bar i:nth-child(2){position:absolute;top:6px;bottom:6px;width:5px;border-radius:99px}.scoreboard-layout-preview--score-bar i:first-child{left:6px;background:#20cdb4}.scoreboard-layout-preview--score-bar i:nth-child(2){right:6px;background:#ff7046}.scoreboard-layout-preview--minimal{width:100px;height:32px;border-radius:999px}.scoreboard-layout-preview--minimal i:first-child{position:absolute;top:5px;bottom:5px;left:5px;width:42px;border-radius:999px;background:#ff5f2d}.scoreboard-display-menu__options{gap:0}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions){overflow:hidden;border:1px solid rgba(255,255,255,.22);border-radius:12px}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px;min-height:52px;padding:8px;border:0;border-radius:0;font-size:13px;letter-spacing:.05em}.scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) button+button{border-left:1px solid rgba(255,255,255,.22)}.scoreboard-display-menu__option-check{position:static;flex:0 0 18px;width:18px;height:18px}.scoreboard-display-menu__positions{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.scoreboard-display-menu__positions button{position:relative;box-sizing:border-box;width:100%;min-width:0;display:grid;aspect-ratio:1.15;min-height:64px;padding:8px}.scoreboard-position-icon{position:relative;box-sizing:border-box;display:block;min-width:0;min-height:28px;width:100%;height:100%;border:1px solid #5d6671}.scoreboard-position-icon i{position:absolute;width:22%;height:8%;border-radius:999px;background:#ff3f75}.scoreboard-position-icon--top-left i{top:8%;left:7%}.scoreboard-position-icon--top-right i{top:8%;right:7%}.scoreboard-position-icon--bottom-left i{bottom:8%;left:7%}.scoreboard-position-icon--bottom-right i{right:7%;bottom:8%}.scoreboard-position-icon--bottom-center i{bottom:8%;left:39%}.scoreboard-display-menu__position-check{top:4px;right:4px;width:24px;height:24px}.scoreboard-display-menu__automatic{display:flex;min-height:72px;align-items:center;justify-content:space-between;border-width:1px 0;border-radius:0;padding:0;text-align:left}.scoreboard-display-menu__automatic>span{min-width:0;overflow-wrap:anywhere;display:grid;gap:4px}.scoreboard-display-menu__automatic b{font-size:13px;letter-spacing:.12em}.scoreboard-display-menu__automatic small{color:#aab2bf;font-size:12px}.scoreboard-display-menu__switch{flex:0 0 54px;position:relative;width:54px;height:32px;border:1px solid #606a75;border-radius:999px;background:#1e2731}.scoreboard-display-menu__switch span{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:999px;background:#fff;transition:transform .14s ease}.scoreboard-display-menu__switch[data-on=true]{border-color:#20a66b;background:#20a66b}.scoreboard-display-menu__switch[data-on=true] span{transform:translate(22px)}.scoreboard-display-menu button.scoreboard-display-menu__reset{min-height:44px;border:0;color:#ff3f75;background:transparent;font-size:13px}.fanview-app button,.fanview-state-page button,.scoreboard-display-menu button{font-family:var(--font-control);font-weight:500;letter-spacing:.02em;text-transform:uppercase}@media(max-width:720px){.viewer-header{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.score-bug__bar-card{min-height:58px;grid-template-columns:minmax(0,1fr) minmax(104px,.8fr) minmax(0,1fr)}.score-bug__bar-team{gap:6px;padding:0 8px}.score-bug__bar-team span{font-size:10px}.score-bug__bar-team strong{font-size:22px}.score-bug__bar-team i{width:5px;height:31px}.score-bug__history--bar .score-bug__history-set{padding:0 4px;font-size:9px}.score-bug__full-team{height:54px;grid-template-columns:6px minmax(0,1fr) auto 45px;gap:8px;padding:0 10px}.score-bug__full-team>strong{font-size:13px}.score-bug__full-team>b{font-size:26px}.scoreboard-display-menu{width:100vw;max-height:calc(100dvh - 56px);gap:11px;border-radius:22px 22px 0 0;padding:12px 16px max(18px,env(safe-area-inset-bottom))}.scoreboard-display-menu>strong{font-size:20px}.scoreboard-display-menu__layouts{gap:8px}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:146px;grid-template-rows:minmax(78px,1fr) minmax(16px,auto) minmax(37px,auto);padding:7px 4px 0}.scoreboard-display-menu__layout>b{font-size:11px}.scoreboard-layout-preview--full-score{width:min(92px,90%)}.scoreboard-layout-preview--score-bar{width:min(100px,92%)}.scoreboard-layout-preview--minimal{width:min(82px,90%)}.scoreboard-display-menu__positions{gap:6px}.scoreboard-display-menu__positions button{min-height:56px;padding:6px}}@media(max-width:300px){.scoreboard-display-menu__layouts{grid-template-columns:1fr}.scoreboard-display-menu button.scoreboard-display-menu__layout{min-height:102px;grid-template-columns:1fr 1fr;grid-template-rows:1fr 24px}.scoreboard-display-menu__layout>b{grid-row:1 / 3;border-top:0;border-left:1px solid rgba(255,255,255,.22)}}.fanview-state-card,.scoreboard-display-menu{border-color:#40535e;background:var(--cv-face-dark);box-shadow:inset 0 1px #e1f0f91f,inset 0 -5px #0b141b,0 18px 48px #0000006b}.fanview-state-action--primary.cv-primary-action{grid-column:1 / -1}
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

/* Action wording stays complete at compact widths and text zoom. Preserve the
   approved control shapes/icons; only labels wrap and controls grow as needed. */
.fanview-app button,
.fanview-state-page button,
.fanview-state-action,
.scoreboard-display-menu button,
.team-hub-back {
  white-space: normal;
  overflow-wrap: normal;
  word-break: normal;
  text-overflow: clip;
  min-height: 44px;
}
.fanview-app .media-control__label,
.scoreboard-display-menu__layout > b,
.scoreboard-display-menu__layout > small {
  white-space: normal;
  overflow: visible;
  overflow-wrap: normal;
  word-break: normal;
  text-overflow: clip;
}
.fanview-app .community-launcher { white-space: normal; overflow: visible; height: auto; }
.fanview-state-action, .team-hub-back { padding-top: 8px; padding-bottom: 8px; }
@media (max-width: 240px) {
  .scoreboard-display-menu__layouts { grid-template-columns: minmax(0, 1fr); }
  .scoreboard-display-menu__options:not(.scoreboard-display-menu__positions) {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Recovery and live activity are instructions/status, never truncated previews. */
.fanview-app .match-status,
.fanview-app .match-status--action {
  max-width: min(440px, calc(100vw - 32px));
  white-space: normal;
  overflow: visible;
  overflow-wrap: normal;
  word-break: normal;
  text-overflow: clip;
  line-height: 1.4;
}
`.match(/@font-face\s*\{[^}]+\}/g) || []).join(`
`), document.head.appendChild(G);
  }
  const C = document.createElement("div");
  y.appendChild(C);
  const N = Um.createRoot(C);
  let U = null, V = Km(), p = !1, w = !1, B = !1, H, W = !1;
  const Z = g.source ? Tm({
    source: g.source,
    parent: y,
    snapshot: () => {
      var G;
      return U && !w ? { match: U, preference: V, viewerCount: ((G = g.viewerCount) == null ? void 0 : G.call(g)) || 0 } : null;
    },
    onChange: () => {
      var G;
      return (G = g.onPresentationChange) == null ? void 0 : G.call(g);
    }
  }) : null, J = () => g.trigger.focus(), be = (G = !0) => {
    const te = p;
    p = !1, ce(), te && G && J();
  }, ce = () => {
    W || (Z == null || Z.refresh(), g.trigger.setAttribute("aria-expanded", String(p)), c.style.zIndex = p ? "30" : "9", N.render(/* @__PURE__ */ E.jsx(
      Wm,
      {
        match: U,
        error: w,
        open: p,
        preference: V,
        onClose: () => be(),
        restoreFocus: J,
        onRetry: g.retry,
        onPreference: (G) => {
          B = !0, V = G;
          try {
            localStorage.setItem(qd, JSON.stringify(G));
          } catch {
          }
          clearTimeout(H), g.save && (H = setTimeout(() => {
            g.save(G).catch(() => {
            });
          }, 800)), ce();
        }
      }
    )));
  }, D = () => {
    var _e;
    const G = g.controls.getBoundingClientRect(), te = ((_e = window.visualViewport) == null ? void 0 : _e.height) || window.innerHeight;
    c.style.setProperty("--broadcast-dock-inset", `${Math.max(12, te - G.top + 12)}px`);
  }, le = typeof ResizeObserver < "u" ? new ResizeObserver(D) : null;
  return le == null || le.observe(g.controls), window.addEventListener("resize", D), (ne = window.visualViewport) == null || ne.addEventListener("resize", D), D(), ce(), {
    presentationVideo: () => (Z == null ? void 0 : Z.video) || null,
    presentationPhase: () => (Z == null ? void 0 : Z.phase()) || "unavailable",
    preparePictureInPicture: () => (Z == null ? void 0 : Z.prepare()) || !1,
    refreshPresentation: () => Z == null ? void 0 : Z.refresh(),
    setPresentationActive: (G) => Z == null ? void 0 : Z.setActive(G),
    toggle() {
      if (p) {
        be(!0);
        return;
      }
      p = !0, D(), ce();
    },
    close: be,
    setRow(G) {
      U = G ? Jm(G, null).match : null, w = !G, ce();
    },
    setUnavailable() {
      U = null, w = !0, ce();
    },
    hydrate(G) {
      !B && Yd(G) && (V = G, ce());
    },
    destroy() {
      var G;
      W || (W = !0, Z == null || Z.destroy(), clearTimeout(H), le == null || le.disconnect(), window.removeEventListener("resize", D), (G = window.visualViewport) == null || G.removeEventListener("resize", D), N.unmount());
    }
  };
}
export {
  Zd as BROADCAST_DISPLAY_DEFAULT,
  qd as BROADCAST_DISPLAY_KEY,
  Wm as BroadcasterDisplayView,
  Yd as isBroadcastPreference,
  Fm as mountBroadcasterDisplay
};
