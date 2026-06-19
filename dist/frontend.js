function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p$1 = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f = Array(g), m2 = 0; m2 < g; m2++) f[m2] = arguments[m2 + 2];
    c.children = f;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l:
        case n:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$1, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$1, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = d + Q$1(k, g);
    h += R$1(k, b, e, f, c);
  }
  else if (f = A$1(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q$1(k, g++), h += R$1(k, b, e, f, c);
  else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$1(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$1;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f in b) J.call(b, f) && !L$1.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;
  else if (1 < f) {
    g = Array(f);
    for (var m2 = 0; m2 < f; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a, b) {
  return U$1.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$1.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$1.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$1.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$1.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$1.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$1.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$1.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k(t2);
      else if (b.startTime <= a) k(t2), b.sortIndex = b.expirationTime, f(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k(r2);
          G2(b);
        } else k(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f[h]) {
              var k = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
              return k;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
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
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f, g, h, k) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f, g, h, k) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f, g, h, k) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f = e.alternate;
    if (null === f) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f.child) {
      for (f = e.child; f; ) {
        if (f === c) return Xb(e), a;
        if (f === d) return Xb(e), b;
        f = f.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f.child; h; ) {
          if (h === c) {
            g = true;
            c = f;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
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
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
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
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
    var g = 31 - oc(f), h = 1 << g, k = e[g];
    if (-1 === k) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k <= b && (a.expiredLanes |= h);
    f &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f) {
  if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f = e.pointerId;
      Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f;
  }
}
function gd(a, b, c, d) {
  var e = C, f = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f = Cb(e);
        null !== f && Ec(f);
        f = Yc(a, b, c, d);
        null === f && hd(a, b, d, id, c);
        if (f === e) break;
        e = f;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
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
      return 1;
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
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
    this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
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
}, Nd = {
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
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f = Math.min(d.start, e);
        d = void 0 === d.end ? f : Math.min(d.end, e);
        !a.extend && f > d && (e = d, d = f, f = e);
        e = Ke(c, f);
        var g = Ke(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f = k;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f = k;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k = g.tag;
        if (3 === k || 4 === k) {
          if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k = g.tag;
        if (5 === k || 6 === k) {
          d = f = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k2 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k2 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k2 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k2 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k2 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k2 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k2 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k2 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k2 = Hd;
            break;
          case cf:
            k2 = Xd;
            break;
          case "scroll":
            k2 = vd;
            break;
          case "wheel":
            k2 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k2 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k2 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k2(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k2 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k2 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k2) {
            if (n2 = c.relatedTarget || c.toElement, k2 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k2 = null, n2 = d2;
          if (k2 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k2 ? h2 : ue(k2);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k2, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k2 && n2) b: {
              t2 = k2;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k2 && wf(g2, h2, k2, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k2 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
        else if (me(h2)) if (we) na = Fe;
        else {
          na = De;
          var xa = Ce;
        }
        else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue(d2) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c, e2);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f = e.stateNode;
    5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k = h.alternate, l2 = h.stateNode;
    if (null !== k && k === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f;
  for (f in c) e[f] = b[f];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f = 32 - oc(b) + e;
  if (30 < f) {
    var g = e - e % 5;
    f = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f + a;
  } else rg = 1 << f | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f] : b2[f] = a2;
      };
      b._stringRef = f;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k(a2, b2, c2, d2) {
    var f2 = c2.type;
    if (f2 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f2) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f2 = d2._init;
          return y2(a2, b2, c2, f2(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k2) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k2);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k2), null !== u2 && (g2 = f(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k2), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k2) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k2);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k2), null !== n3 && (g2 = f(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k2), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f2, h2) {
    "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
    if ("object" === typeof f2 && null !== f2) {
      switch (f2.$$typeof) {
        case va:
          a: {
            for (var k2 = f2.key, l3 = d2; null !== l3; ) {
              if (l3.key === k2) {
                k2 = f2.type;
                if (k2 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f2.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f2.props);
                  d2.ref = Lg(a2, l3, f2);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f2.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f2.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f2, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f2._init, J2(a2, d2, l3(f2._payload), h2);
      }
      if (eb(f2)) return n2(a2, d2, f2, h2);
      if (Ka(f2)) return t2(a2, d2, f2, h2);
      Mg(a2, f2);
    }
    return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f ? e = f = g : f = f.next = g;
        c = c.next;
      } while (null !== c);
      null === f ? e = f = b : f = f.next = b;
    } else e = f = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k = h, l2 = k.next;
    k.next = null;
    null === g ? f = l2 : g.next = l2;
    g = k;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k));
  }
  if (null !== f) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k = null;
    h = f;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k = q2);
    e.baseState = k;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f) {
  Hh = f;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f) throw Error(p(301));
      f += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f = c.pending;
  if (null !== f) {
    if (null !== e) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }
    d.baseQueue = e = f;
    c.pending = null;
  }
  if (null !== e) {
    f = e.next;
    d = d.baseState;
    var h = g = null, k = null, l2 = f;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k && (k = k.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k ? (h = k = q2, g = d) : k = k.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f);
    null === k ? g = d : k.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f = e.lane, M.lanes |= f, rh |= f, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f = a(f, g.action), g = g.next;
    while (g !== e);
    He(f, b.memoizedState) || (dh = true);
    b.memoizedState = f;
    null === b.baseQueue && (b.baseState = f);
    c.lastRenderedState = f;
  }
  return [f, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
  f && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f = a.alternate;
    if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
      var g = b.lastRenderedState, h = f(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He(h, g)) {
        var k = b.interleaved;
        null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f = { value: c, getSnapshot: b };
  e.queue = f;
  mi(ai.bind(
    null,
    d,
    f,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f = mh(d, e);
  f.payload = b;
  void 0 !== c && null !== c && (f.callback = c);
  b = nh(a, f, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f = mh(d, e);
  f.tag = 1;
  f.payload = b;
  void 0 !== c && null !== c && (f.callback = c);
  b = nh(a, f, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f = b.contextType;
  "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f = b.contextType;
  "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f) {
    e = "\nError generating stack: " + f.message + "\n" + f.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f = c.type;
    if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f = a.child;
  if (0 === (a.lanes & e)) {
    var g = f.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f = a.memoizedProps;
    if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f ? f.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f = Zf(c) ? Xf : H.current;
  f = Yf(b, f);
  ch(b, e);
  c = Nh(a, b, c, d, f, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f = true;
    cg(b);
  } else f = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k = b.memoizedState;
    h !== d || r2 !== k || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k = c.contextType;
    "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k) && Hi(b, g, d, k);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f, e);
}
function jj(a, b, c, d, e, f) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f) {
    f = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
    f.return = b;
    d.return = b;
    d.sibling = f;
    b.child = d;
    d = f;
    f = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f.memoizedState = g;
    f.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f = a.child;
  a = f.sibling;
  d = Pg(f, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f = Tg(f, e, g, null);
    f.flags |= 2;
    d.return = b;
    f.return = b;
    d.sibling = f;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f = Error(p(419));
    d = Ki(f, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
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
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f = a.memoizedState;
  null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f = [];
        break;
      case "select":
        e = A({}, e, { value: void 0 });
        d = A({}, d, { value: void 0 });
        f = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f || (f = []) : (f = f || []).push(l2, null));
    for (l2 in d) {
      var k = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k !== h && (null != k || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
      } else c || (f || (f = []), f.push(
        l2,
        c
      )), c = k;
      else "dangerouslySetInnerHTML" === l2 ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l2, k)) : "children" === l2 ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l2, "" + k) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k && "onScroll" === l2 && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l2, k));
    }
    c && (f = f || []).push("style", c);
    var l2 = f;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f), D("invalid", d);
          }
          ub(c, f);
          e = null;
          for (var g in f) if (f.hasOwnProperty(g)) {
            var h = f[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f in h) if (h.hasOwnProperty(f)) {
              var k = h[f];
              "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f = d.value;
                null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
        else if (f = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f) throw Error(p(318));
            f = b.memoizedState;
            f = null !== f ? f.dehydrated : null;
            if (!f) throw Error(p(317));
            f[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f = false;
        } else null !== zg && (Fj(zg), zg = null), f = true;
        if (!f) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f = b.memoizedState;
      if (null === f) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f.rendering;
      if (null === g) if (d) Dj(f, false);
      else {
        if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
        f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
      }
      if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f || 0 !== d && 3 !== q2.nodeType || (k = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f && ++m2 === d && (k = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k ? null : { start: h, end: k };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f = e.destroy;
        e.destroy = void 0;
        void 0 !== f && Mj(b, c, f);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U || Lj(c, b);
    case 6:
      var d = X, e = Xj;
      X = null;
      Yj(a, b, c);
      X = d;
      Xj = e;
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Xj;
      X = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f = e, g = f.destroy;
          f = f.tag;
          void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      Zj(f, g, e);
      X = null;
      Xj = false;
      var k = e.alternate;
      null !== k && (k.return = null);
      e.return = null;
    } catch (l2) {
      W(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
        a.updateQueue = null;
        if (null !== k) try {
          "input" === h && "radio" === f.type && null != f.name && ab(e, f);
          vb(h, g);
          var l2 = vb(h, f);
          for (g = 0; g < k.length; g += 2) {
            var m2 = k[g], q2 = k[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f);
              break;
            case "textarea":
              ib(e, f);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f.multiple;
              var y2 = f.value;
              null != y2 ? fb(e, !!f.multiple, y2, false) : r2 !== !!f.multiple && (null != f.defaultValue ? fb(
                e,
                !!f.multiple,
                f.defaultValue,
                true
              ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
          }
          e[Pf] = f;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f = a.memoizedProps;
        try {
          e.nodeValue = f;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, ck(b, a), U = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q2.stateNode, k = q2.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f = Uj(a);
          Wj(a, f, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k) {
      W(a, a.return, k);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
        h = Jj;
        var l2 = U;
        Jj = g;
        if ((U = k) && !l2) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
        for (; null !== f; ) V = f, ik(f), f = f.sibling;
        V = e;
        Jj = h;
        U = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f = b.updateQueue;
            null !== f && sh(b, f, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k.autoFocus && c.focus();
                  break;
                case "img":
                  k.src && (c.src = k.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k) {
            W(b, c, k);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k) {
              W(b, e, k);
            }
          }
          var f = b.return;
          try {
            Rj(b);
          } catch (k) {
            W(b, f, k);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k) {
            W(b, g, k);
          }
      }
    } catch (k) {
      W(b, b.return, k);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f;
    K = e;
    null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y = a = Pg(a.current, null);
  Z = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f = c.pending;
      if (null !== f) {
        var g = f.next;
        f.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T = 1;
        pk = b;
        Y = null;
        break;
      }
      a: {
        var f = a, g = c.return, h = c, k = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k && "object" === typeof k && "function" === typeof k.then) {
          var l2 = k, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f, b);
            y2.mode & 1 && Si(f, l2, b);
            b = y2;
            k = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k);
              b.updateQueue = t2;
            } else n2.add(k);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f, l2, b);
              tj();
              break a;
            }
            k = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f, b);
            Jg(Ji(k, h));
            break a;
          }
        }
        f = k = Ji(k, h);
        4 !== T && (T = 2);
        null === sk ? sk = [f] : sk.push(f);
        f = g;
        do {
          switch (f.tag) {
            case 3:
              f.flags |= 65536;
              b &= -b;
              f.lanes |= b;
              var x2 = Ni(f, k, b);
              ph(f, x2);
              break a;
            case 1:
              h = k;
              var w2 = f.type, u2 = f.stateNode;
              if (0 === (f.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var F2 = Qi(f, h, b);
                ph(f, F2);
                break a;
              }
          }
          f = f.return;
        } while (null !== f);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y) throw Error(p(261));
  Q = null;
  Z = 0;
  return T;
}
function Tk() {
  for (; null !== Y; ) Uk(Y);
}
function Lk() {
  for (; null !== Y && !cc(); ) Uk(Y);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f = c.lanes | c.childLanes;
  Bc(a, f);
  a === Q && (Y = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f) {
    f = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f = a.pendingLanes;
  0 === f && (Ri = null);
  mc(c.stateNode);
  Dk(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f = a.pendingLanes;
  0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f = V, g = f.child;
          if (0 !== (V.flags & 16)) {
            var h = f.deletions;
            if (null !== h) {
              for (var k = 0; k < h.length; k++) {
                var l2 = h[k];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f;
            }
          }
          if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
          else b: for (; null !== V; ) {
            f = V;
            if (0 !== (f.flags & 2048)) switch (f.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f, f.return);
            }
            var x2 = f.sibling;
            if (null !== x2) {
              x2.return = f.return;
              V = x2;
              break b;
            }
            V = f.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f = b.memoizedState;
        e = f.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f) if (He(f.value, g)) {
          if (f.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
          var h = f.dependencies;
          if (null !== h) {
            g = f.child;
            for (var k = h.firstContext; null !== k; ) {
              if (k.context === d) {
                if (1 === f.tag) {
                  k = mh(-1, c & -c);
                  k.tag = 2;
                  var l2 = f.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k.next = k : (k.next = m2.next, m2.next = k);
                    l2.pending = k;
                  }
                }
                f.lanes |= c;
                k = f.alternate;
                null !== k && (k.lanes |= c);
                bh(
                  f.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k = k.next;
            }
          } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
          else if (18 === f.tag) {
            g = f.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f.sibling;
          } else g = f.child;
          if (null !== g) g.return = f;
          else for (g = f; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f = g.sibling;
            if (null !== f) {
              f.return = g.return;
              g = f;
              break;
            }
            g = g.return;
          }
          f = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
    case Ia:
      return pj(c, e, f, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f, g, h, k) {
  a = new al(a, b, c, h, k);
  1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
  f = Bg(3, null, null, b);
  a.current = f;
  f.stateNode = a;
  f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f, g, h, k) {
  a = bl(c, d, true, a, e, f, g, h, k);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f = mh(d, e);
  f.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f = d;
      d = function() {
        var a2 = gl(g);
        f.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k);
      h.call(a2);
    };
  }
  var k = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k;
  a[uf] = k.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k, c, d);
  });
  return k;
}
function rl(a, b, c, d, e) {
  var f = c._reactRootContainer;
  if (f) {
    var g = f;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var createRoot;
var m = reactDomExports;
{
  createRoot = m.createRoot;
  m.hydrateRoot;
}
var _jsxFileName$g = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/PluginContext.tsx";
const PluginContext = reactExports.createContext(null);
const PluginProvider = ({
  api,
  children
}) => {
  return /* @__PURE__ */ React.createElement(PluginContext.Provider, { value: api, __self: void 0, __source: {
    fileName: _jsxFileName$g,
    lineNumber: 7,
    columnNumber: 10
  } }, children);
};
function usePluginAPI() {
  const ctx = reactExports.useContext(PluginContext);
  if (!ctx) throw new Error("usePluginAPI must be used inside PluginProvider");
  return ctx;
}
const STATUS_LABELS = ["in-progress", "review", "blocked", "deferred", "cancelled"];
const COLUMNS = [
  { id: "todo", title: "To Do", state: "open", labels: [], accentColor: "#64748b", bgColor: "rgba(100,116,139,0.1)" },
  { id: "in-progress", title: "In Progress", state: "open", labels: ["in-progress"], accentColor: "#0ea5e9", bgColor: "rgba(14,165,233,0.08)" },
  { id: "review", title: "In Review", state: "open", labels: ["review"], accentColor: "#8b5cf6", bgColor: "rgba(139,92,246,0.08)" },
  { id: "blocked", title: "Blocked", state: "open", labels: ["blocked"], accentColor: "#ef4444", bgColor: "rgba(239,68,68,0.08)" },
  { id: "done", title: "Done", state: "closed", labels: [], accentColor: "#10b981", bgColor: "rgba(16,185,129,0.08)" }
];
function issueToColumnId(issue) {
  if (issue.state === "closed") return "done";
  const labelNames = issue.labels.map((l2) => l2.name);
  for (const col of COLUMNS) {
    if (col.labels.length > 0 && col.labels.some((l2) => labelNames.includes(l2))) {
      return col.id;
    }
  }
  return "todo";
}
function columnChangePatch(fromId, toId) {
  const toCol = COLUMNS.find((c) => c.id === toId);
  if (!toCol) return null;
  return {
    state: toCol.state,
    addLabels: toCol.labels,
    removeLabels: STATUS_LABELS.filter((l2) => !toCol.labels.includes(l2))
  };
}
const HIGH_PATTERNS = ["p0", "critical", "blocker", "urgent", "security", "vulnerability", "crash", "data-loss", "high-priority", "priority:high", "priority-high", "high"];
const MEDIUM_PATTERNS = ["p1", "medium-priority", "priority:medium", "priority-medium", "important", "medium"];
const LOW_PATTERNS = ["p2", "p3", "low-priority", "priority:low", "priority-low", "nice-to-have", "minor", "low"];
function detectPriorityFromLabels(labels) {
  const names = labels.map((l2) => l2.name.toLowerCase());
  if (names.some((n2) => HIGH_PATTERNS.some((p2) => n2 === p2 || n2.includes(p2)))) return "high";
  if (names.some((n2) => MEDIUM_PATTERNS.some((p2) => n2 === p2 || n2.includes(p2)))) return "medium";
  if (names.some((n2) => LOW_PATTERNS.some((p2) => n2 === p2 || n2.includes(p2)))) return "low";
  return null;
}
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2, unknown: 3 };
function getEffectivePriority(issue, priorityMap) {
  var _a;
  return ((_a = priorityMap.get(issue.number)) == null ? void 0 : _a.priority) ?? detectPriorityFromLabels(issue.labels);
}
function sortIssues(issues, sortBy, sortDir, priorityMap) {
  return [...issues].sort((a, b) => {
    let cmp = 0;
    switch (sortBy) {
      case "number":
        cmp = b.number - a.number;
        break;
      case "updated":
        cmp = Date.parse(b.updated_at) - Date.parse(a.updated_at);
        break;
      case "created":
        cmp = Date.parse(b.created_at) - Date.parse(a.created_at);
        break;
      case "comments":
        cmp = b.comments - a.comments;
        break;
      case "title":
        cmp = a.title.localeCompare(b.title);
        break;
      case "priority": {
        const pa2 = getEffectivePriority(a, priorityMap) ?? "unknown";
        const pb2 = getEffectivePriority(b, priorityMap) ?? "unknown";
        cmp = (PRIORITY_ORDER[pa2] ?? 3) - (PRIORITY_ORDER[pb2] ?? 3);
        break;
      }
    }
    return sortDir === "asc" ? -cmp : cmp;
  });
}
function decodeHtmlEntities(text) {
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x2F;/g, "/");
}
function extractImages(text) {
  const results = [];
  const seen = /* @__PURE__ */ new Set();
  const add = (rawUrl, alt) => {
    if (!rawUrl) return;
    const url = decodeHtmlEntities(rawUrl);
    if (seen.has(url)) return;
    seen.add(url);
    results.push({ alt, url });
  };
  const mdRe = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;
  let m2;
  while ((m2 = mdRe.exec(text)) !== null) {
    add(m2[2] ?? "", m2[1] ?? "");
  }
  const htmlRe = /<img\b([^>]*)>/gi;
  while ((m2 = htmlRe.exec(text)) !== null) {
    const attrs = m2[1] ?? "";
    const srcMatch = attrs.match(/src=["'](https?:\/\/[^"']+)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    if (srcMatch == null ? void 0 : srcMatch[1]) {
      add(srcMatch[1], (altMatch == null ? void 0 : altMatch[1]) ?? "");
    }
  }
  return results;
}
function stripImages(text) {
  return text.replace(/!\[[^\]]*\]\(https?:\/\/[^)\s]+\)/g, "").replace(/<img\b[^>]*>/gi, "").replace(/\n{3,}/g, "\n\n").trim();
}
var _jsxFileName$f = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/GithubIssueCard.tsx";
const PRIORITY_COLORS$1 = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};
function hexToRgb(hex) {
  const m2 = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m2 || !m2[1]) return null;
  const n2 = parseInt(m2[1], 16);
  return {
    r: n2 >> 16 & 255,
    g: n2 >> 8 & 255,
    b: n2 & 255
  };
}
function labelTextColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#000000";
  const lum = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return lum > 140 ? "#000000" : "#ffffff";
}
const GithubIssueCard = ({
  issue,
  priority,
  priorityReason,
  onClick
}) => {
  const visibleLabels = issue.labels.filter((l2) => !STATUS_LABELS.includes(l2.name));
  const images = issue.body ? extractImages(issue.body) : [];
  const previewImages = images.slice(0, 3);
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-card", onClick, role: "button", tabIndex: 0, onKeyDown: (e) => e.key === "Enter" && onClick(), __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 40,
    columnNumber: 5
  } }, previewImages.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "cgi-card-thumbs", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 42,
    columnNumber: 9
  } }, previewImages.map((img, i) => /* @__PURE__ */ React.createElement("img", { key: i, src: img.url, alt: img.alt || "image", className: "cgi-card-thumb", loading: "lazy", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 44,
    columnNumber: 13
  } })), images.length > 3 && /* @__PURE__ */ React.createElement("span", { className: "cgi-card-thumb-more", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 53,
    columnNumber: 13
  } }, "+", images.length - 3)), /* @__PURE__ */ React.createElement("div", { className: "cgi-card-title-row", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 57,
    columnNumber: 7
  } }, priority && /* @__PURE__ */ React.createElement("span", { className: "cgi-priority-dot", style: {
    background: PRIORITY_COLORS$1[priority]
  }, title: priorityReason ? `${priority}: ${priorityReason}` : priority, __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 59,
    columnNumber: 11
  } }), /* @__PURE__ */ React.createElement("div", { className: "cgi-card-title", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 65,
    columnNumber: 9
  } }, issue.title)), /* @__PURE__ */ React.createElement("div", { className: "cgi-card-meta", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 67,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-card-number", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 68,
    columnNumber: 9
  } }, "#", issue.number), issue.assignees.map((a) => /* @__PURE__ */ React.createElement("img", { key: a.login, src: a.avatar_url, alt: a.login, title: a.login, className: "cgi-avatar", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 70,
    columnNumber: 11
  } })), issue.comments > 0 && /* @__PURE__ */ React.createElement("span", { className: "cgi-card-comments", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 79,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 80,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("path", { d: "M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 81,
    columnNumber: 15
  } })), issue.comments)), visibleLabels.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "cgi-card-labels", __self: void 0, __source: {
    fileName: _jsxFileName$f,
    lineNumber: 88,
    columnNumber: 9
  } }, visibleLabels.map((l2) => {
    const bg2 = `#${l2.color}`;
    const color = labelTextColor(l2.color);
    return /* @__PURE__ */ React.createElement("span", { key: l2.id, className: "cgi-label-chip", style: {
      background: bg2,
      color
    }, __self: void 0, __source: {
      fileName: _jsxFileName$f,
      lineNumber: 93,
      columnNumber: 15
    } }, l2.name);
  })));
};
var _jsxFileName$e = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/GithubKanbanColumn.tsx";
const GithubKanbanColumn = ({
  column,
  issues,
  priorityMap,
  collapsed,
  onToggle,
  onOpenIssue
}) => {
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-column", style: {
    background: column.bgColor
  }, __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 17,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-column-header", style: {
    color: column.accentColor,
    borderBottom: `1px solid ${column.accentColor}30`
  }, onClick: onToggle, title: collapsed ? `Expand ${column.title}` : `Collapse ${column.title}`, __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 18,
    columnNumber: 7
  } }, !collapsed && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 26,
    columnNumber: 13
  } }, column.title), /* @__PURE__ */ React.createElement("span", { className: "cgi-column-count", __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 27,
    columnNumber: 13
  } }, issues.length), /* @__PURE__ */ React.createElement("span", { className: "cgi-column-toggle", __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 28,
    columnNumber: 13
  } }, "▲")), collapsed && /* @__PURE__ */ React.createElement("span", { className: "cgi-column-toggle", style: {
    margin: "0 auto"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 32,
    columnNumber: 11
  } }, "▼")), collapsed ? /* @__PURE__ */ React.createElement("div", { className: "cgi-column-body", style: {
    alignItems: "center",
    cursor: "pointer"
  }, onClick: onToggle, __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 37,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-column-collapsed-label", style: {
    color: column.accentColor
  }, __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 42,
    columnNumber: 11
  } }, column.title, " (", issues.length, ")")) : /* @__PURE__ */ React.createElement("div", { className: "cgi-column-body", __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 47,
    columnNumber: 9
  } }, issues.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: {
    textAlign: "center",
    padding: "20px 0",
    opacity: 0.4,
    fontSize: 12
  }, __self: void 0, __source: {
    fileName: _jsxFileName$e,
    lineNumber: 49,
    columnNumber: 13
  } }, "No issues") : issues.map((issue) => {
    var _a, _b;
    return /* @__PURE__ */ React.createElement(GithubIssueCard, { key: issue.id, issue, priority: ((_a = priorityMap.get(issue.number)) == null ? void 0 : _a.priority) ?? null, priorityReason: (_b = priorityMap.get(issue.number)) == null ? void 0 : _b.reason, onClick: () => onOpenIssue(issue), __self: void 0, __source: {
      fileName: _jsxFileName$e,
      lineNumber: 54,
      columnNumber: 15
    } });
  })));
};
var _jsxFileName$d = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/GithubBoard.tsx";
const GithubBoard = ({
  issues,
  priorityMap,
  collapsedColumns,
  onToggleColumn,
  onOpenIssue
}) => {
  const issuesByColumn = React.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const col of COLUMNS) map.set(col.id, []);
    for (const issue of issues) {
      const colId = issueToColumnId(issue);
      const arr = map.get(colId);
      if (arr) arr.push(issue);
    }
    return map;
  }, [issues]);
  const gridTemplate = COLUMNS.map((col) => collapsedColumns.has(col.id) ? "52px" : "minmax(0, 1fr)").join(" ");
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-board", style: {
    gridTemplateColumns: gridTemplate
  }, __self: void 0, __source: {
    fileName: _jsxFileName$d,
    lineNumber: 39,
    columnNumber: 5
  } }, COLUMNS.map((col) => /* @__PURE__ */ React.createElement(GithubKanbanColumn, { key: col.id, column: col, issues: issuesByColumn.get(col.id) ?? [], priorityMap, collapsed: collapsedColumns.has(col.id), onToggle: () => onToggleColumn(col.id), onOpenIssue, __self: void 0, __source: {
    fileName: _jsxFileName$d,
    lineNumber: 41,
    columnNumber: 9
  } })));
};
var _jsxFileName$c = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/ImageLightbox.tsx";
const ImageLightbox = ({
  src,
  alt,
  onClose
}) => {
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setError(false);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, src]);
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-lightbox-overlay", onClick: onClose, __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 20,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-lightbox-close", onClick: onClose, title: "Close (Esc)", __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 21,
    columnNumber: 7
  } }, "✕"), error ? /* @__PURE__ */ React.createElement("div", { className: "cgi-lightbox-error", onClick: (e) => e.stopPropagation(), __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 23,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 32,
    marginBottom: 8,
    opacity: 0.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 24,
    columnNumber: 11
  } }, "🖼"), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 13,
    opacity: 0.8
  }, __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 25,
    columnNumber: 11
  } }, "Image could not be loaded"), /* @__PURE__ */ React.createElement("a", { href: src, target: "_blank", rel: "noopener noreferrer", style: {
    fontSize: 12,
    color: "#60a5fa",
    marginTop: 8,
    display: "block"
  }, onClick: (e) => e.stopPropagation(), __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 26,
    columnNumber: 11
  } }, "Open original URL ↗")) : /* @__PURE__ */ React.createElement("img", { src, alt, className: "cgi-lightbox-img", onClick: (e) => e.stopPropagation(), onError: () => setError(true), __self: void 0, __source: {
    fileName: _jsxFileName$c,
    lineNumber: 37,
    columnNumber: 9
  } }));
};
var _jsxFileName$b = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/GithubIssueModal.tsx";
function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return isoString;
  }
}
const GithubIssueModal = ({
  issue,
  projectPath,
  onClose,
  onIssueUpdated
}) => {
  const api = usePluginAPI();
  const [comments, setComments] = reactExports.useState([]);
  const [loadingComments, setLoadingComments] = reactExports.useState(true);
  const [commentText, setCommentText] = reactExports.useState("");
  const [submittingComment, setSubmittingComment] = reactExports.useState(false);
  const [movingTo, setMovingTo] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [currentIssue, setCurrentIssue] = reactExports.useState(issue);
  const [lightbox, setLightbox] = reactExports.useState(null);
  const currentColumnId = issueToColumnId(currentIssue);
  const loadComments = reactExports.useCallback(async () => {
    setLoadingComments(true);
    try {
      const res = await api.rpc("GET", `/issues/${currentIssue.number}/comments?path=${encodeURIComponent(projectPath)}`);
      const data = res;
      setComments(data.comments ?? []);
    } catch (e) {
    } finally {
      setLoadingComments(false);
    }
  }, [api, currentIssue.number, projectPath]);
  reactExports.useEffect(() => {
    loadComments();
  }, [loadComments]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const handleMoveToColumn = async (colId) => {
    if (colId === currentColumnId || movingTo) return;
    setMovingTo(colId);
    setError(null);
    try {
      const patch = columnChangePatch(currentColumnId, colId);
      if (!patch) return;
      const res = await api.rpc("PATCH", `/issues/${currentIssue.number}?path=${encodeURIComponent(projectPath)}`, patch);
      const data = res;
      if (data.ok && data.issue) {
        setCurrentIssue(data.issue);
        onIssueUpdated(data.issue);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to move issue");
    } finally {
      setMovingTo(null);
    }
  };
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || submittingComment) return;
    setSubmittingComment(true);
    setError(null);
    try {
      await api.rpc("POST", `/issues/${currentIssue.number}/comments?path=${encodeURIComponent(projectPath)}`, {
        body: commentText.trim()
      });
      setCommentText("");
      await loadComments();
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, lightbox && /* @__PURE__ */ React.createElement(ImageLightbox, { src: lightbox.src, alt: lightbox.alt, onClose: () => setLightbox(null), __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 102,
    columnNumber: 18
  } }), /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-overlay", onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 103,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal", onClick: (e) => e.stopPropagation(), __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 104,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-header", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 106,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    flex: 1
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 107,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-title", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 108,
    columnNumber: 13
  } }, currentIssue.title), /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-subtitle", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 109,
    columnNumber: 13
  } }, "#", currentIssue.number, " · opened by ", currentIssue.user.login, " on ", formatDate(currentIssue.created_at), currentIssue.state === "closed" && /* @__PURE__ */ React.createElement("span", { style: {
    marginLeft: 8,
    color: "#10b981",
    fontWeight: 600
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 111,
    columnNumber: 51
  } }, "● Closed"))), /* @__PURE__ */ React.createElement("a", { href: currentIssue.html_url, target: "_blank", rel: "noopener noreferrer", className: "cgi-btn", title: "Open on GitHub", style: {
    textDecoration: "none",
    flexShrink: 0
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 114,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 122,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("path", { d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 123,
    columnNumber: 15
  } })), "GitHub"), /* @__PURE__ */ React.createElement("button", { className: "cgi-modal-close", onClick: onClose, title: "Close", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 127,
    columnNumber: 11
  } }, "✕")), /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-body", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 130,
    columnNumber: 9
  } }, currentIssue.labels.length > 0 && /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 133,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-section-label", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 134,
    columnNumber: 15
  } }, "Labels"), /* @__PURE__ */ React.createElement("div", { className: "cgi-card-labels", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 135,
    columnNumber: 15
  } }, currentIssue.labels.map((l2) => /* @__PURE__ */ React.createElement("span", { key: l2.id, className: "cgi-label-chip", style: {
    background: `#${l2.color}`,
    color: parseInt(l2.color, 16) > 8947848 ? "#000" : "#fff",
    fontSize: 12,
    padding: "2px 8px"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 137,
    columnNumber: 19
  } }, l2.name)))), currentIssue.body && (() => {
    const imgs = extractImages(currentIssue.body);
    const text = stripImages(currentIssue.body);
    return /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 159,
      columnNumber: 15
    } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-section-label", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 160,
      columnNumber: 17
    } }, "Description"), imgs.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "cgi-img-grid", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 162,
      columnNumber: 19
    } }, imgs.map((img, i) => /* @__PURE__ */ React.createElement("button", { key: i, className: "cgi-img-thumb-btn", onClick: () => setLightbox({
      src: img.url,
      alt: img.alt
    }), title: "Click to enlarge", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 164,
      columnNumber: 23
    } }, /* @__PURE__ */ React.createElement("img", { src: img.url, alt: img.alt || "image", className: "cgi-img-thumb", loading: "lazy", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 165,
      columnNumber: 25
    } })))), text && /* @__PURE__ */ React.createElement("pre", { className: "cgi-issue-body", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 170,
      columnNumber: 26
    } }, text));
  })(), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 176,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-section-label", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 177,
    columnNumber: 13
  } }, "Move to column"), /* @__PURE__ */ React.createElement("div", { className: "cgi-column-selector", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 178,
    columnNumber: 13
  } }, COLUMNS.map((col) => {
    const isActive = col.id === issueToColumnId(currentIssue);
    return /* @__PURE__ */ React.createElement("button", { key: col.id, className: `cgi-column-btn${isActive ? " cgi-column-btn-active" : ""}`, style: isActive ? {
      background: col.accentColor,
      borderColor: col.accentColor
    } : {}, onClick: () => handleMoveToColumn(col.id), disabled: isActive || movingTo !== null, __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 182,
      columnNumber: 19
    } }, movingTo === col.id ? "..." : col.title);
  }))), error && /* @__PURE__ */ React.createElement("div", { className: "cgi-error-text", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 197,
    columnNumber: 21
  } }, error), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 200,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-section-label", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 201,
    columnNumber: 13
  } }, "Comments ", !loadingComments && `(${comments.length})`), loadingComments ? /* @__PURE__ */ React.createElement("div", { style: {
    color: "var(--cgi-text-muted)",
    fontSize: 12
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 205,
    columnNumber: 15
  } }, "Loading comments...") : comments.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "cgi-comments-list", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 207,
    columnNumber: 15
  } }, comments.map((c) => {
    const cImgs = extractImages(c.body);
    const cText = stripImages(c.body);
    return /* @__PURE__ */ React.createElement("div", { key: c.id, className: "cgi-comment", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 212,
      columnNumber: 21
    } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-comment-header", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 213,
      columnNumber: 23
    } }, /* @__PURE__ */ React.createElement("img", { src: c.user.avatar_url, alt: c.user.login, className: "cgi-avatar", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 214,
      columnNumber: 25
    } }), /* @__PURE__ */ React.createElement("span", { className: "cgi-comment-author", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 215,
      columnNumber: 25
    } }, c.user.login), /* @__PURE__ */ React.createElement("span", { __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 216,
      columnNumber: 25
    } }, "·"), /* @__PURE__ */ React.createElement("span", { __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 217,
      columnNumber: 25
    } }, formatDate(c.created_at))), cImgs.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "cgi-img-grid", style: {
      marginBottom: cText ? 8 : 0
    }, __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 220,
      columnNumber: 25
    } }, cImgs.map((img, i) => /* @__PURE__ */ React.createElement("button", { key: i, className: "cgi-img-thumb-btn", onClick: () => setLightbox({
      src: img.url,
      alt: img.alt
    }), title: "Click to enlarge", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 222,
      columnNumber: 29
    } }, /* @__PURE__ */ React.createElement("img", { src: img.url, alt: img.alt || "image", className: "cgi-img-thumb", loading: "lazy", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 223,
      columnNumber: 31
    } })))), cText && /* @__PURE__ */ React.createElement("div", { className: "cgi-comment-body", __self: void 0, __source: {
      fileName: _jsxFileName$b,
      lineNumber: 228,
      columnNumber: 33
    } }, cText));
  })) : /* @__PURE__ */ React.createElement("div", { style: {
    color: "var(--cgi-text-muted)",
    fontSize: 12
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 234,
    columnNumber: 15
  } }, "No comments yet.")), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 239,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-section-label", __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 240,
    columnNumber: 13
  } }, "Add comment"), /* @__PURE__ */ React.createElement("form", { className: "cgi-comment-form", onSubmit: handleSubmitComment, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 241,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("textarea", { className: "cgi-textarea", placeholder: "Write a comment...", value: commentText, onChange: (e) => setCommentText(e.target.value), disabled: submittingComment, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 242,
    columnNumber: 15
  } }), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    justifyContent: "flex-end"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 249,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("button", { type: "submit", className: "cgi-btn cgi-btn-primary", disabled: !commentText.trim() || submittingComment, __self: void 0, __source: {
    fileName: _jsxFileName$b,
    lineNumber: 250,
    columnNumber: 17
  } }, submittingComment ? "Posting..." : "Post comment"))))))));
};
var _jsxFileName$a = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/NewIssueModal.tsx";
const NewIssueModal = ({
  projectPath,
  onClose,
  onCreated
}) => {
  const api = usePluginAPI();
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const titleRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = titleRef.current) == null ? void 0 : _a.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.rpc("POST", `/issues?path=${encodeURIComponent(projectPath)}`, {
        title: title.trim(),
        body: body.trim() || void 0
      });
      if (res.ok && res.issue) {
        onCreated(res.issue);
      }
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Failed to create issue");
      setSubmitting(false);
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid var(--cgi-border)",
    background: "var(--cgi-input-bg)",
    color: "var(--cgi-text)",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.55)"
  }, onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 60,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "var(--cgi-modal-bg)",
    border: "1px solid var(--cgi-border)",
    borderRadius: 12,
    padding: 24,
    width: 500,
    maxWidth: "92vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: 16
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 64,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 66,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    fontSize: 15
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 67,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 68,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("path", { d: "M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z", __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 69,
    columnNumber: 15
  } })), "New Issue"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-text)",
    opacity: 0.5,
    fontSize: 20,
    lineHeight: 1,
    padding: "2px 4px"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 73,
    columnNumber: 11
  } }, "×")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, style: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 76,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 78,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("label", { style: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.65,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 79,
    columnNumber: 13
  } }, "Title ", /* @__PURE__ */ React.createElement("span", { style: {
    color: "#ef4444"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 80,
    columnNumber: 21
  } }, "*")), /* @__PURE__ */ React.createElement("input", { ref: titleRef, type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Short, descriptive title…", style: inputStyle, autoComplete: "off", required: true, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 82,
    columnNumber: 13
  } })), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 95,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("label", { style: {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.65,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 96,
    columnNumber: 13
  } }, "Description ", /* @__PURE__ */ React.createElement("span", { style: {
    opacity: 0.5,
    fontWeight: 400,
    textTransform: "none"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 97,
    columnNumber: 27
  } }, "(optional)")), /* @__PURE__ */ React.createElement("textarea", { value: body, onChange: (e) => setBody(e.target.value), placeholder: "Describe the issue, steps to reproduce, expected vs actual behavior…", style: {
    ...inputStyle,
    minHeight: 100,
    resize: "vertical"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 99,
    columnNumber: 13
  } })), error && /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12,
    color: "#ef4444"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 108,
    columnNumber: 13
  } }, error), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    paddingTop: 2
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 113,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: onClose, className: "cgi-btn", style: {
    opacity: 0.7
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 114,
    columnNumber: 13
  } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: !title.trim() || submitting, className: "cgi-btn", style: {
    background: "var(--cgi-accent)",
    color: "#fff",
    border: "none",
    fontWeight: 600
  }, __self: void 0, __source: {
    fileName: _jsxFileName$a,
    lineNumber: 115,
    columnNumber: 13
  } }, submitting ? "Creating…" : "Create issue")))));
};
var _jsxFileName$9 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/SubscriptionPriorityModal.tsx";
function buildPrompt(issues) {
  const open = issues.filter((i) => i.state !== "closed").slice(0, 50);
  const list = open.map((i) => `#${i.number}: ${i.title}
Labels: ${i.labels.map((l2) => l2.name).join(", ") || "none"}
Comments: ${i.comments}
Created: ${i.created_at.split("T")[0]}
Description: ${(i.body ?? "").slice(0, 300)}`).join("\n\n---\n\n");
  return `You are a software project manager. Analyze these GitHub issues and assign each a priority level.

Issues:
${list}

Prioritization criteria:
- high: security vulnerabilities, crashes, data loss, critical bugs blocking users
- medium: regular bugs affecting users, important features, performance problems
- low: minor issues, nice-to-have features, documentation, minor enhancements

Return ONLY valid JSON, no explanation or markdown:
{"priorities":[{"number":<issue_number>,"priority":"high"|"medium"|"low","reason":"<one brief sentence>"}]}`;
}
function parseResponse(raw) {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const data = JSON.parse(jsonMatch[0]);
    const valid = (data.priorities ?? []).filter((p2) => p2.number && ["high", "medium", "low"].includes(p2.priority)).map((p2) => ({
      number: p2.number,
      priority: p2.priority,
      score: p2.priority === "high" ? 80 : p2.priority === "medium" ? 50 : 20,
      reason: p2.reason ?? ""
    }));
    return valid.length > 0 ? valid : null;
  } catch {
    return null;
  }
}
const SubscriptionPriorityModal = ({
  issues,
  onApply,
  onClose
}) => {
  const [step, setStep] = reactExports.useState("prompt");
  const [pasteText, setPasteText] = reactExports.useState("");
  const [parseError, setParseError] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const prompt = buildPrompt(issues);
  const promptRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  };
  const handleApply = () => {
    setParseError(null);
    const parsed = parseResponse(pasteText);
    if (!parsed) {
      setParseError("Could not parse JSON. Make sure you pasted the full response from Claude.");
      return;
    }
    onApply(parsed);
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.6)",
    padding: 16
  }, onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 82,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "var(--cgi-modal-bg)",
    border: "1px solid var(--cgi-border)",
    borderRadius: 12,
    padding: 24,
    width: 580,
    maxWidth: "96vw",
    maxHeight: "85vh",
    overflow: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    gap: 16
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 86,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 88,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    fontSize: 15
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 89,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 90,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("path", { d: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z", __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 91,
    columnNumber: 15
  } })), "AI Prioritize — Claude Subscription"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-text)",
    opacity: 0.5,
    fontSize: 20,
    lineHeight: 1,
    padding: "2px 4px"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 95,
    columnNumber: 11
  } }, "×")), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 0,
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid var(--cgi-border)"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 99,
    columnNumber: 9
  } }, ["prompt", "paste"].map((s, i) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setStep(s), style: {
    flex: 1,
    padding: "8px 0",
    border: "none",
    fontSize: 12,
    fontWeight: 600,
    background: step === s ? "var(--cgi-accent)" : "var(--cgi-btn-bg)",
    color: step === s ? "#fff" : "var(--cgi-text)",
    cursor: "pointer",
    borderRight: i === 0 ? "1px solid var(--cgi-border)" : "none"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 101,
    columnNumber: 13
  } }, i + 1, ". ", s === "prompt" ? "Copy Prompt" : "Paste Response"))), step === "prompt" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 13,
    opacity: 0.75,
    lineHeight: 1.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 118,
    columnNumber: 13
  } }, "Copy the prompt below and paste it into ", /* @__PURE__ */ React.createElement("strong", { __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 119,
    columnNumber: 55
  } }, "Claude.ai"), " or any Claude chat window. Then come back and click ", /* @__PURE__ */ React.createElement("em", { __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 120,
    columnNumber: 40
  } }, "Paste Response"), "."), /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 122,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("textarea", { ref: promptRef, readOnly: true, value: prompt, style: {
    width: "100%",
    minHeight: 240,
    padding: "10px 12px",
    boxSizing: "border-box",
    background: "var(--cgi-code-bg)",
    border: "1px solid var(--cgi-border)",
    borderRadius: 8,
    color: "var(--cgi-text)",
    fontSize: 11,
    fontFamily: "monospace",
    lineHeight: 1.5,
    resize: "vertical",
    outline: "none"
  }, onClick: () => {
    var _a;
    return (_a = promptRef.current) == null ? void 0 : _a.select();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 123,
    columnNumber: 15
  } })), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 136,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "cgi-btn", style: {
    opacity: 0.7
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 137,
    columnNumber: 15
  } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: handleCopy, className: "cgi-btn", style: {
    background: copied ? "#22c55e" : "var(--cgi-accent)",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    minWidth: 120
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 138,
    columnNumber: 15
  } }, copied ? "✓ Copied!" : "⎘ Copy Prompt"), /* @__PURE__ */ React.createElement("button", { onClick: () => setStep("paste"), className: "cgi-btn", style: {
    fontWeight: 600
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 141,
    columnNumber: 15
  } }, "Next →"))), step === "paste" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 13,
    opacity: 0.75,
    lineHeight: 1.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 150,
    columnNumber: 13
  } }, "Paste Claude's JSON response below. It should start with ", /* @__PURE__ */ React.createElement("code", { style: {
    background: "var(--cgi-code-bg)",
    padding: "1px 5px",
    borderRadius: 4
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 151,
    columnNumber: 72
  } }, `{"priorities":[`)), /* @__PURE__ */ React.createElement("textarea", { value: pasteText, onChange: (e) => {
    setPasteText(e.target.value);
    setParseError(null);
  }, placeholder: `Paste Claude's response here...

Expected format:
{"priorities":[{"number":1,"priority":"high","reason":"..."},...]}`, style: {
    width: "100%",
    minHeight: 200,
    padding: "10px 12px",
    boxSizing: "border-box",
    background: "var(--cgi-input-bg)",
    border: `1px solid ${parseError ? "#ef4444" : "var(--cgi-border)"}`,
    borderRadius: 8,
    color: "var(--cgi-text)",
    fontSize: 12,
    fontFamily: "monospace",
    lineHeight: 1.5,
    resize: "vertical",
    outline: "none"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 153,
    columnNumber: 13
  } }), parseError && /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12,
    color: "#ef4444"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 165,
    columnNumber: 15
  } }, parseError), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 10,
    justifyContent: "space-between"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 169,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep("prompt"), className: "cgi-btn", style: {
    opacity: 0.7
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 170,
    columnNumber: 15
  } }, "← Back"), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 8
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 171,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "cgi-btn", style: {
    opacity: 0.7
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 172,
    columnNumber: 17
  } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: handleApply, disabled: !pasteText.trim(), className: "cgi-btn", style: {
    background: "var(--cgi-accent)",
    color: "#fff",
    border: "none",
    fontWeight: 600
  }, __self: void 0, __source: {
    fileName: _jsxFileName$9,
    lineNumber: 173,
    columnNumber: 17
  } }, "Apply Priorities"))))));
};
var _jsxFileName$8 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/ConfigBanner.tsx";
const ConfigBanner = ({
  onOpenSettings
}) => /* @__PURE__ */ React.createElement("div", { className: "cgi-config-banner", __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 8,
  columnNumber: 3
} }, /* @__PURE__ */ React.createElement("div", { className: "cgi-config-banner-icon", __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 9,
  columnNumber: 5
} }, /* @__PURE__ */ React.createElement("svg", { width: "32", height: "32", viewBox: "0 0 16 16", fill: "currentColor", style: {
  opacity: 0.4
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 10,
  columnNumber: 7
} }, /* @__PURE__ */ React.createElement("path", { d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z", __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 11,
  columnNumber: 9
} }))), /* @__PURE__ */ React.createElement("h2", { __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 14,
  columnNumber: 5
} }, "GitHub Issues Board"), /* @__PURE__ */ React.createElement("p", { style: {
  opacity: 0.65
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 15,
  columnNumber: 5
} }, "Connect this project to a GitHub repository to start managing issues as a kanban board."), /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: onOpenSettings, style: {
  background: "var(--cgi-accent)",
  color: "#fff",
  border: "none",
  fontWeight: 600,
  padding: "9px 20px",
  fontSize: 13
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 18,
  columnNumber: 5
} }, "⚙ Configure GitHub Connection"), /* @__PURE__ */ React.createElement("p", { style: {
  fontSize: 11,
  opacity: 0.45,
  marginTop: 8
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 25,
  columnNumber: 5
} }, "You'll need a GitHub personal access token with ", /* @__PURE__ */ React.createElement("code", { style: {
  background: "rgba(0,0,0,0.1)",
  padding: "1px 4px",
  borderRadius: 3
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 26,
  columnNumber: 55
} }, "repo"), " scope.", /* @__PURE__ */ React.createElement("br", { __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 26,
  columnNumber: 158
} }), "Settings are saved to ", /* @__PURE__ */ React.createElement("code", { style: {
  background: "rgba(0,0,0,0.1)",
  padding: "1px 4px",
  borderRadius: 3
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 27,
  columnNumber: 29
} }, ".GitHubBoard/github-sync.json"), " in your project."), /* @__PURE__ */ React.createElement("p", { style: {
  fontSize: 11,
  opacity: 0.45
}, __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 29,
  columnNumber: 5
} }, "The ", /* @__PURE__ */ React.createElement("strong", { __self: void 0, __source: {
  fileName: _jsxFileName$8,
  lineNumber: 30,
  columnNumber: 11
} }, "/github-task"), " CLI skill is automatically installed when this plugin loads."));
var _jsxFileName$7 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/SettingsModal.tsx";
const SettingsModal = ({
  projectPath,
  onClose,
  onSaved,
  onManualPrioritize
}) => {
  const api = usePluginAPI();
  const [form, setForm] = reactExports.useState({
    token: "",
    owner: "",
    repo: "",
    anthropicKey: ""
  });
  const [showAnthropicKey, setShowAnthropicKey] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(false);
  const [showToken, setShowToken] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.rpc("GET", `/config?path=${encodeURIComponent(projectPath)}`).then((res) => {
      if (cancelled) return;
      const d = res;
      if (d.configured) {
        setForm((f) => ({
          ...f,
          owner: d.owner ?? "",
          repo: d.repo ?? ""
          // secrets not returned — leave blank, user must re-enter to change
        }));
      }
    }).catch(() => {
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [api, projectPath]);
  const handleSave = async () => {
    setError(null);
    if (!form.owner.trim() || !form.repo.trim()) {
      setError("Owner and repository name are required.");
      return;
    }
    if (!form.token.trim()) {
      setError("GitHub token is required. You can find it at github.com → Settings → Developer settings → Personal access tokens.");
      return;
    }
    setSaving(true);
    try {
      await api.rpc("PUT", `/config?path=${encodeURIComponent(projectPath)}`, {
        token: form.token.trim(),
        owner: form.owner.trim(),
        repo: form.repo.trim(),
        enabled: true,
        anthropicKey: form.anthropicKey.trim() || void 0
      });
      setSuccess(true);
      setTimeout(() => {
        onSaved();
        onClose();
      }, 600);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid var(--cgi-border)",
    background: "var(--cgi-input-bg)",
    color: "var(--cgi-text)",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box"
  };
  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.65,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 1e3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.55)"
  }, onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 103,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "var(--cgi-surface)",
    borderRadius: 10,
    padding: 24,
    width: 420,
    maxWidth: "90vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: 18
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 107,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 109,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    fontSize: 15
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 110,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 111,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("path", { d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 112,
    columnNumber: 15
  } })), "GitHub Issues Board — Settings"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-text)",
    opacity: 0.5,
    fontSize: 18,
    lineHeight: 1,
    padding: "2px 6px"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 116,
    columnNumber: 11
  } }, "×")), loading ? /* @__PURE__ */ React.createElement("div", { style: {
    textAlign: "center",
    padding: "20px 0",
    opacity: 0.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 120,
    columnNumber: 11
  } }, "Loading current settings…") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 124,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("label", { style: labelStyle, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 125,
    columnNumber: 15
  } }, "GitHub Personal Access Token"), /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 126,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("input", { type: showToken ? "text" : "password", value: form.token, onChange: (e) => setForm((f) => ({
    ...f,
    token: e.target.value
  })), placeholder: "ghp_xxxxxxxxxxxxxxxxxxxx", style: {
    ...inputStyle,
    paddingRight: 38
  }, autoComplete: "off", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 127,
    columnNumber: 17
  } }), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowToken((v2) => !v2), style: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-text)",
    opacity: 0.45,
    fontSize: 12
  }, title: showToken ? "Hide token" : "Show token", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 135,
    columnNumber: 17
  } }, showToken ? "hide" : "show")), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 4
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 143,
    columnNumber: 15
  } }, "Generate at github.com → Settings → Developer settings → Personal access tokens. Requires ", /* @__PURE__ */ React.createElement("code", { __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 144,
    columnNumber: 107
  } }, "repo"), " scope.")), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 149,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("label", { style: labelStyle, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 150,
    columnNumber: 15
  } }, "Repository Owner (username or org)"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.owner, onChange: (e) => setForm((f) => ({
    ...f,
    owner: e.target.value
  })), placeholder: "your-github-username", style: inputStyle, autoComplete: "off", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 151,
    columnNumber: 15
  } })), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 162,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("label", { style: labelStyle, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 163,
    columnNumber: 15
  } }, "Repository Name"), /* @__PURE__ */ React.createElement("input", { type: "text", value: form.repo, onChange: (e) => setForm((f) => ({
    ...f,
    repo: e.target.value
  })), placeholder: "your-repository-name", style: inputStyle, autoComplete: "off", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 164,
    columnNumber: 15
  } })), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 175,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("label", { style: labelStyle, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 176,
    columnNumber: 15
  } }, "Anthropic API Key ", /* @__PURE__ */ React.createElement("span", { style: {
    opacity: 0.5,
    fontWeight: 400,
    textTransform: "none",
    fontSize: 11
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 176,
    columnNumber: 59
  } }, "(optional — enables real AI prioritization)")), /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 177,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("input", { type: showAnthropicKey ? "text" : "password", value: form.anthropicKey, onChange: (e) => setForm((f) => ({
    ...f,
    anthropicKey: e.target.value
  })), placeholder: "sk-ant-api03-…", style: {
    ...inputStyle,
    paddingRight: 38
  }, autoComplete: "off", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 178,
    columnNumber: 17
  } }), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAnthropicKey((v2) => !v2), style: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-text)",
    opacity: 0.45,
    fontSize: 12
  }, title: showAnthropicKey ? "Hide key" : "Show key", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 186,
    columnNumber: 17
  } }, showAnthropicKey ? "hide" : "show")), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 194,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("span", { __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 195,
    columnNumber: 17
  } }, "Without a key, AI Prioritize uses smart heuristics. With a key, it uses Claude Haiku for deeper AI analysis."), onManualPrioritize && /* @__PURE__ */ React.createElement("button", { onClick: onManualPrioritize, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-accent)",
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 6px",
    borderRadius: 4,
    whiteSpace: "nowrap",
    flexShrink: 0
  }, title: "Use Claude.ai subscription: generate a prompt, paste back the response", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 197,
    columnNumber: 19
  } }, "Use claude.ai →"))), error && /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12,
    color: "#ef4444"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 210,
    columnNumber: 15
  } }, error), /* @__PURE__ */ React.createElement("div", { style: {
    borderTop: "1px solid var(--cgi-border)",
    paddingTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 216,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    opacity: 0.6
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 217,
    columnNumber: 15
  } }, "Use ", /* @__PURE__ */ React.createElement("code", { style: {
    background: "var(--cgi-code-bg)",
    padding: "1px 5px",
    borderRadius: 4
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 218,
    columnNumber: 21
  } }, "/github-task"), " skill in Claude chat to manage issues via AI"), /* @__PURE__ */ React.createElement("a", { href: "https://github.com/szmidtpiotr/claude-github-issue/blob/main/skill/SKILL.md", target: "_blank", rel: "noopener noreferrer", className: "cgi-btn", style: {
    textDecoration: "none",
    flexShrink: 0,
    fontSize: 11,
    gap: 4
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 220,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("svg", { width: "11", height: "11", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 227,
    columnNumber: 17
  } }, /* @__PURE__ */ React.createElement("path", { d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z", __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 228,
    columnNumber: 19
  } })), "View SKILL.md")), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 235,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "cgi-btn", style: {
    opacity: 0.7
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 236,
    columnNumber: 15
  } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { onClick: handleSave, disabled: saving || success, className: "cgi-btn", style: {
    background: success ? "#22c55e" : "var(--cgi-accent)",
    color: "#fff",
    border: "none",
    fontWeight: 600
  }, __self: void 0, __source: {
    fileName: _jsxFileName$7,
    lineNumber: 237,
    columnNumber: 15
  } }, success ? "✓ Saved!" : saving ? "Saving…" : "Save")))));
};
var _jsxFileName$6 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/PlanCard.tsx";
const PRIORITY_COLORS = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};
const PlanCard = ({
  issue,
  index,
  count,
  onOpen,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const priority = detectPriorityFromLabels(issue.labels);
  const isBug = issue.labels.some((l2) => l2.name.toLowerCase() === "bug");
  const done = issue.state === "closed";
  return /* @__PURE__ */ React.createElement("div", { className: `cgi-plan-card${done ? " done" : ""}`, draggable: true, onDragStart, onDragOver, onDrop, __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 29,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-drag", title: "Drag to reorder", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 36,
    columnNumber: 7
  } }, "⠿"), priority && /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-dot", style: {
    background: PRIORITY_COLORS[priority]
  }, __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 38,
    columnNumber: 9
  } }), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-card-main", onClick: () => onOpen(issue), __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 40,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-num", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 41,
    columnNumber: 9
  } }, "#", issue.number), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-title", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 42,
    columnNumber: 9
  } }, issue.title), isBug && /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-bug", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 43,
    columnNumber: 19
  } }, "bug")), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-reorder", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 45,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-arrow", disabled: index === 0, onClick: onMoveUp, title: "Move up", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 46,
    columnNumber: 9
  } }, "▲"), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-arrow", disabled: index === count - 1, onClick: onMoveDown, title: "Move down", __self: void 0, __source: {
    fileName: _jsxFileName$6,
    lineNumber: 47,
    columnNumber: 9
  } }, "▼")));
};
var _jsxFileName$5 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/PlanItemCard.tsx";
const PlanItemCard = ({
  item,
  index,
  count,
  onEdit,
  onDelete,
  onPromote,
  promoting,
  onMoveUp,
  onMoveDown,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-plan-card cgi-plan-item", draggable: true, onDragStart, onDragOver, onDrop, __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 24,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-drag", title: "Drag to reorder", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 31,
    columnNumber: 7
  } }, "⠿"), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-item-dot", title: "Planned (not an issue yet)", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 32,
    columnNumber: 7
  } }), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-card-main", onClick: onEdit, title: "Edit plan item", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 33,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-title", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 34,
    columnNumber: 9
  } }, item.title), item.note.trim() && /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-item-note", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 35,
    columnNumber: 30
  } }, item.note.trim()), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-item-tag", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 36,
    columnNumber: 9
  } }, "plan")), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-item-actions", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 38,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-iaction", onClick: onPromote, disabled: promoting, title: "Promote to GitHub issue", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 39,
    columnNumber: 9
  } }, promoting ? "…" : "⤴"), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-iaction", onClick: onEdit, title: "Edit", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 42,
    columnNumber: 9
  } }, "✎"), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-iaction cgi-plan-idelete", onClick: onDelete, title: "Delete", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 43,
    columnNumber: 9
  } }, "🗑")), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-reorder", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 45,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-arrow", disabled: index === 0, onClick: onMoveUp, title: "Move up", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 46,
    columnNumber: 9
  } }, "▲"), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-arrow", disabled: index === count - 1, onClick: onMoveDown, title: "Move down", __self: void 0, __source: {
    fileName: _jsxFileName$5,
    lineNumber: 47,
    columnNumber: 9
  } }, "▼")));
};
var _jsxFileName$4 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/PlanItemModal.tsx";
const PlanItemModal = ({
  projectPath,
  phaseTitle,
  existing,
  onClose,
  onSaved
}) => {
  const api = usePluginAPI();
  const [title, setTitle] = reactExports.useState((existing == null ? void 0 : existing.title) ?? "");
  const [note, setNote] = reactExports.useState((existing == null ? void 0 : existing.note) ?? "");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const titleRef = reactExports.useRef(null);
  const editing = Boolean(existing);
  reactExports.useEffect(() => {
    var _a;
    (_a = titleRef.current) == null ? void 0 : _a.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const q2 = `?path=${encodeURIComponent(projectPath)}`;
      if (editing && existing) {
        await api.rpc("PUT", `/plan/item/${encodeURIComponent(existing.id)}${q2}`, {
          title: title.trim(),
          note: note.trim()
        });
      } else {
        await api.rpc("POST", `/plan/item${q2}`, {
          phase: phaseTitle,
          title: title.trim(),
          note: note.trim()
        });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save plan item");
      setSubmitting(false);
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid var(--cgi-border)",
    background: "var(--cgi-input-bg)",
    color: "var(--cgi-text)",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s"
  };
  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.65,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };
  return /* @__PURE__ */ React.createElement("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,0,0,0.55)"
  }, onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 64,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: "var(--cgi-modal-bg)",
    border: "1px solid var(--cgi-border)",
    borderRadius: 12,
    padding: 24,
    width: 500,
    maxWidth: "92vw",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    gap: 16
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 68,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 69,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    fontSize: 15
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 70,
    columnNumber: 11
  } }, editing ? "Edit plan task" : "New plan task", /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 11,
    fontWeight: 500,
    opacity: 0.55
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 72,
    columnNumber: 13
  } }, phaseTitle ?? "No phase")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--cgi-text)",
    opacity: 0.5,
    fontSize: 20,
    lineHeight: 1,
    padding: "2px 4px"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 76,
    columnNumber: 11
  } }, "×")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, style: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 79,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 80,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("label", { style: labelStyle, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 81,
    columnNumber: 13
  } }, "Title ", /* @__PURE__ */ React.createElement("span", { style: {
    color: "#ef4444"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 81,
    columnNumber: 45
  } }, "*")), /* @__PURE__ */ React.createElement("input", { ref: titleRef, type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Planned task (e.g. G16 — multiplayer lobby)…", style: inputStyle, autoComplete: "off", required: true, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 82,
    columnNumber: 13
  } })), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 94,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("label", { style: labelStyle, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 95,
    columnNumber: 13
  } }, "Note ", /* @__PURE__ */ React.createElement("span", { style: {
    opacity: 0.5,
    fontWeight: 400,
    textTransform: "none"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 96,
    columnNumber: 20
  } }, "(optional — becomes the issue body on promote)")), /* @__PURE__ */ React.createElement("textarea", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "Context, scope, dependencies…", style: {
    ...inputStyle,
    minHeight: 100,
    resize: "vertical"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 98,
    columnNumber: 13
  } })), error && /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12,
    color: "#ef4444"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 107,
    columnNumber: 13
  } }, error), /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
    paddingTop: 2
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 112,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: onClose, className: "cgi-btn", style: {
    opacity: 0.7
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 113,
    columnNumber: 13
  } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: !title.trim() || submitting, className: "cgi-btn", style: {
    background: "var(--cgi-accent)",
    color: "#fff",
    border: "none",
    fontWeight: 600
  }, __self: void 0, __source: {
    fileName: _jsxFileName$4,
    lineNumber: 114,
    columnNumber: 13
  } }, submitting ? "Saving…" : editing ? "Save" : "Add task")))));
};
var _jsxFileName$3 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/PlanBootstrapModal.tsx";
const PlanBootstrapModal = ({
  projectPath,
  onClose,
  onDone
}) => {
  const api = usePluginAPI();
  const [text, setText] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const parse = () => {
    const phases = [];
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const colon = trimmed.indexOf(":");
      if (colon === -1) continue;
      const title = trimmed.slice(0, colon).trim();
      const issues = trimmed.slice(colon + 1).split(",").map((s) => parseInt(s.replace("#", "").trim(), 10)).filter((n2) => Number.isFinite(n2));
      if (title) phases.push({
        title,
        issues
      });
    }
    return phases;
  };
  const run = async () => {
    const phases = parse();
    if (phases.length === 0) {
      setError('Enter at least one line like "FAZA L: 12, 14"');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await api.rpc("POST", `/plan/bootstrap?path=${encodeURIComponent(projectPath)}`, {
        phases
      });
      onDone();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Bootstrap failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-overlay", onClick: onClose, __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 54,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-modal cgi-plan-bootstrap", onClick: (e) => e.stopPropagation(), __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 55,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("h3", { __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 56,
    columnNumber: 9
  } }, "Bootstrap phases (milestones)"), /* @__PURE__ */ React.createElement("p", { style: {
    fontSize: 12,
    opacity: 0.6
  }, __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 57,
    columnNumber: 9
  } }, "One phase per line: ", /* @__PURE__ */ React.createElement("code", { __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 58,
    columnNumber: 31
  } }, "FAZA L: 12, 14, 18"), ". Creates each milestone if missing and assigns the issues."), /* @__PURE__ */ React.createElement("textarea", { className: "cgi-plan-bootstrap-text", value: text, onChange: (e) => setText(e.target.value), placeholder: "FAZA A: 1, 2, 3\nFAZA L: 12, 14", rows: 8, __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 60,
    columnNumber: 9
  } }), error && /* @__PURE__ */ React.createElement("div", { className: "cgi-error-text", __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 67,
    columnNumber: 19
  } }, error), /* @__PURE__ */ React.createElement("div", { className: "cgi-modal-actions", __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 68,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: onClose, disabled: busy, __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 69,
    columnNumber: 11
  } }, "Cancel"), /* @__PURE__ */ React.createElement("button", { className: "cgi-btn cgi-btn-new-issue", onClick: run, disabled: busy, __self: void 0, __source: {
    fileName: _jsxFileName$3,
    lineNumber: 70,
    columnNumber: 11
  } }, busy ? "Running…" : "Run"))));
};
var _jsxFileName$2 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/PlanView.tsx";
const POLL_INTERVAL_MS$1 = 3e4;
const sectionPhase = (p2) => p2.milestoneNumber === null && p2.title === "No phase" ? null : p2.title;
const PlanView = ({
  projectPath,
  onOpenIssue
}) => {
  const api = usePluginAPI();
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [notConfigured, setNotConfigured] = reactExports.useState(false);
  const dragFrom = reactExports.useRef(null);
  const dragItemFrom = reactExports.useRef(null);
  const pollRef = reactExports.useRef(null);
  const dataRef = reactExports.useRef(null);
  const [showBootstrap, setShowBootstrap] = reactExports.useState(false);
  const [itemModal, setItemModal] = reactExports.useState(null);
  const [promotingId, setPromotingId] = reactExports.useState(null);
  const [hideDone, setHideDone] = reactExports.useState(() => {
    try {
      return localStorage.getItem("cgi-plan-hide-done") !== "false";
    } catch {
      return true;
    }
  });
  const hideDoneRef = reactExports.useRef(hideDone);
  reactExports.useEffect(() => {
    hideDoneRef.current = hideDone;
    try {
      localStorage.setItem("cgi-plan-hide-done", String(hideDone));
    } catch {
    }
  }, [hideDone]);
  const fetchPlan = reactExports.useCallback(async () => {
    if (!projectPath) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.rpc("GET", `/plan?path=${encodeURIComponent(projectPath)}`);
      if (res.notConfigured) {
        setNotConfigured(true);
        setData(null);
      } else if (res.error) {
        setError(res.error);
      } else {
        setNotConfigured(false);
        setData({
          phases: res.phases ?? []
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load plan");
    } finally {
      setLoading(false);
    }
  }, [api, projectPath]);
  reactExports.useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);
  reactExports.useEffect(() => {
    dataRef.current = data;
  }, [data]);
  reactExports.useEffect(() => {
    const schedule = () => {
      pollRef.current = setTimeout(() => {
        fetchPlan().then(schedule);
      }, POLL_INTERVAL_MS$1);
    };
    schedule();
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [fetchPlan]);
  const phaseKey = (p2) => p2.milestoneNumber === null ? `np:${p2.title}` : String(p2.milestoneNumber);
  const applyReorder = reactExports.useCallback((phaseId, mutate) => {
    const current = dataRef.current;
    if (!current) return;
    const target = current.phases.find((p2) => phaseKey(p2) === phaseId);
    if (!target) return;
    const isHidden = (i) => hideDoneRef.current && i.state === "closed";
    const visible = mutate(target.issues.filter((i) => !isHidden(i)));
    const hidden = target.issues.filter(isHidden);
    const issues = [...visible, ...hidden];
    const phaseTitle = target.milestoneNumber === null ? null : target.title;
    const order = issues.map((i) => i.number);
    setData({
      phases: current.phases.map((p2) => phaseKey(p2) === phaseId ? {
        ...p2,
        issues
      } : p2)
    });
    void (async () => {
      try {
        await api.rpc("PUT", `/plan/order?path=${encodeURIComponent(projectPath)}`, {
          phase: phaseTitle,
          order
        });
      } catch {
        void fetchPlan();
      }
    })();
  }, [api, projectPath, fetchPlan]);
  const reorder = (phaseId, from, to) => {
    applyReorder(phaseId, (issues) => {
      if (to < 0 || to >= issues.length) return issues;
      const next = issues.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };
  const handleDrop = (phaseId, toIndex) => {
    const src = dragFrom.current;
    dragFrom.current = null;
    if (!src || src.phase !== phaseId) return;
    const to = src.index < toIndex ? toIndex - 1 : toIndex;
    if (src.index === to) return;
    reorder(phaseId, src.index, to);
  };
  const applyItemsReorder = reactExports.useCallback((phaseId, mutate) => {
    const current = dataRef.current;
    if (!current) return;
    const target = current.phases.find((p2) => phaseKey(p2) === phaseId);
    if (!target) return;
    const items = mutate(target.items.slice());
    const phaseTitle = sectionPhase(target);
    const order = items.map((i) => i.id);
    setData({
      phases: current.phases.map((p2) => phaseKey(p2) === phaseId ? {
        ...p2,
        items
      } : p2)
    });
    void (async () => {
      try {
        await api.rpc("PUT", `/plan/items/order?path=${encodeURIComponent(projectPath)}`, {
          phase: phaseTitle,
          order
        });
      } catch {
        void fetchPlan();
      }
    })();
  }, [api, projectPath, fetchPlan]);
  const reorderItem = (phaseId, from, to) => {
    applyItemsReorder(phaseId, (items) => {
      if (to < 0 || to >= items.length) return items;
      const next = items.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };
  const handleItemDrop = (phaseId, toIndex) => {
    const src = dragItemFrom.current;
    dragItemFrom.current = null;
    if (!src || src.phase !== phaseId) return;
    const to = src.index < toIndex ? toIndex - 1 : toIndex;
    if (src.index === to) return;
    reorderItem(phaseId, src.index, to);
  };
  const deleteItem = async (item) => {
    if (item.note.trim() && !window.confirm(`Delete plan task "${item.title}"?`)) return;
    try {
      await api.rpc("DELETE", `/plan/item/${encodeURIComponent(item.id)}?path=${encodeURIComponent(projectPath)}`);
      void fetchPlan();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete plan item");
    }
  };
  const promoteItem = async (item) => {
    setPromotingId(item.id);
    try {
      const res = await api.rpc("POST", `/plan/item/${encodeURIComponent(item.id)}/promote?path=${encodeURIComponent(projectPath)}`);
      if (res.error) setError(res.error);
      await fetchPlan();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to promote plan item");
    } finally {
      setPromotingId(null);
    }
  };
  if (notConfigured) return /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 168,
    columnNumber: 29
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    opacity: 0.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 168,
    columnNumber: 57
  } }, "GitHub not configured. Open the ⚙ settings on the Issues Board tab."));
  if (error) return /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 169,
    columnNumber: 21
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-error-text", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 169,
    columnNumber: 49
  } }, error), /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: fetchPlan, __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 169,
    columnNumber: 94
  } }, "Retry"));
  if (loading && !data) return /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 170,
    columnNumber: 32
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-spinner", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 170,
    columnNumber: 60
  } }), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 170,
    columnNumber: 91
  } }, "Loading plan…"));
  if (!data) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "cgi-plan", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 174,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-plan-toolbar", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 175,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: () => setShowBootstrap(true), __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 176,
    columnNumber: 9
  } }, "Bootstrap phases"), /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: fetchPlan, disabled: loading, __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 177,
    columnNumber: 9
  } }, loading ? "↻ Refreshing…" : "↻ Refresh"), /* @__PURE__ */ React.createElement("label", { className: "cgi-plan-toggle", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 178,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: hideDone, onChange: (e) => setHideDone(e.target.checked), __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 179,
    columnNumber: 11
  } }), "Hide done")), data.phases.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 184,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    opacity: 0.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 184,
    columnNumber: 37
  } }, "No issues yet.")) : data.phases.map((phase) => {
    const pct = phase.total > 0 ? Math.round(phase.closed / phase.total * 100) : 0;
    const visibleIssues = hideDone ? phase.issues.filter((i) => i.state !== "closed") : phase.issues;
    if (hideDone && phase.total > 0 && visibleIssues.length === 0 && phase.items.length === 0) return null;
    const pid = phaseKey(phase);
    return /* @__PURE__ */ React.createElement("section", { key: pid, className: "cgi-plan-phase", __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 193,
      columnNumber: 13
    } }, /* @__PURE__ */ React.createElement("header", { className: "cgi-plan-phase-head", __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 194,
      columnNumber: 15
    } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-phase-title", __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 195,
      columnNumber: 17
    } }, phase.title), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-phase-count", __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 196,
      columnNumber: 17
    } }, phase.closed, "/", phase.total), /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-progress", __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 197,
      columnNumber: 17
    } }, /* @__PURE__ */ React.createElement("span", { className: "cgi-plan-progress-bar", style: {
      width: `${pct}%`
    }, __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 197,
      columnNumber: 53
    } })), /* @__PURE__ */ React.createElement("button", { className: "cgi-plan-add", title: "Add a planned task to this phase", onClick: () => setItemModal({
      phaseTitle: sectionPhase(phase),
      item: null
    }), __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 198,
      columnNumber: 17
    } }, "+ Add task")), /* @__PURE__ */ React.createElement("div", { className: "cgi-plan-list", __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 204,
      columnNumber: 15
    } }, visibleIssues.map((issue, idx) => /* @__PURE__ */ React.createElement(PlanCard, { key: issue.number, issue, index: idx, count: visibleIssues.length, onOpen: onOpenIssue, onMoveUp: () => reorder(pid, idx, idx - 1), onMoveDown: () => reorder(pid, idx, idx + 1), onDragStart: () => {
      dragFrom.current = {
        phase: pid,
        index: idx
      };
    }, onDragOver: (e) => e.preventDefault(), onDrop: () => handleDrop(pid, idx), __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 206,
      columnNumber: 19
    } })), phase.items.map((item, idx) => /* @__PURE__ */ React.createElement(PlanItemCard, { key: item.id, item, index: idx, count: phase.items.length, promoting: promotingId === item.id, onEdit: () => setItemModal({
      phaseTitle: sectionPhase(phase),
      item
    }), onDelete: () => void deleteItem(item), onPromote: () => void promoteItem(item), onMoveUp: () => reorderItem(pid, idx, idx - 1), onMoveDown: () => reorderItem(pid, idx, idx + 1), onDragStart: () => {
      dragItemFrom.current = {
        phase: pid,
        index: idx
      };
    }, onDragOver: (e) => e.preventDefault(), onDrop: () => handleItemDrop(pid, idx), __self: void 0, __source: {
      fileName: _jsxFileName$2,
      lineNumber: 220,
      columnNumber: 19
    } }))));
  }), itemModal && /* @__PURE__ */ React.createElement(PlanItemModal, { projectPath, phaseTitle: itemModal.phaseTitle, existing: itemModal.item, onClose: () => setItemModal(null), onSaved: () => {
    setItemModal(null);
    void fetchPlan();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 242,
    columnNumber: 9
  } }), showBootstrap && /* @__PURE__ */ React.createElement(PlanBootstrapModal, { projectPath, onClose: () => setShowBootstrap(false), onDone: () => {
    setShowBootstrap(false);
    void fetchPlan();
  }, __self: void 0, __source: {
    fileName: _jsxFileName$2,
    lineNumber: 251,
    columnNumber: 9
  } }));
};
var _jsxFileName$1 = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/App.tsx";
const POLL_INTERVAL_MS = 3e4;
const STORAGE_KEY = "cgi-collapsed-columns";
const TAB_KEY = "cgi-active-tab";
const SORT_LABELS = {
  number: "Number",
  updated: "Updated",
  created: "Created",
  comments: "Comments",
  title: "Title",
  priority: "Priority"
};
const SORT_OPTIONS = ["number", "updated", "created", "comments", "title", "priority"];
const PRIORITY_PILL_COLORS = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#6b7280"
};
function loadCollapsed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : /* @__PURE__ */ new Set();
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function saveCollapsed(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
  }
}
const App = () => {
  const api = usePluginAPI();
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [notConfigured, setNotConfigured] = reactExports.useState(false);
  const [collapsedColumns, setCollapsedColumns] = reactExports.useState(loadCollapsed);
  const [selectedIssue, setSelectedIssue] = reactExports.useState(null);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [showNewIssue, setShowNewIssue] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState(() => {
    try {
      return localStorage.getItem(TAB_KEY) || "board";
    } catch {
      return "board";
    }
  });
  const switchTab = (tab) => {
    setActiveTab(tab);
    try {
      localStorage.setItem(TAB_KEY, tab);
    } catch {
    }
  };
  const [searchText, setSearchText] = reactExports.useState("");
  const [activePriority, setActivePriority] = reactExports.useState("all");
  const [sortBy, setSortBy] = reactExports.useState("number");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [showSortMenu, setShowSortMenu] = reactExports.useState(false);
  const [priorityMap, setPriorityMap] = reactExports.useState(/* @__PURE__ */ new Map());
  const [aiPrioritizing, setAiPrioritizing] = reactExports.useState(false);
  const [aiUsed, setAiUsed] = reactExports.useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = reactExports.useState(false);
  const [hasAnthropicKey, setHasAnthropicKey] = reactExports.useState(false);
  const theme = api.context.theme;
  const project = api.context.project;
  const fetchRef = reactExports.useRef(null);
  const sortMenuRef = reactExports.useRef(null);
  const fetchIssues = reactExports.useCallback(async () => {
    var _a;
    if (!(project == null ? void 0 : project.path)) {
      setNotConfigured(false);
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.rpc("GET", `/issues?path=${encodeURIComponent(project.path)}`);
      const d = res;
      if (d.notConfigured || ((_a = d.error) == null ? void 0 : _a.includes("not configured"))) {
        setNotConfigured(true);
        setData(null);
      } else if (d.error) {
        setError(d.error);
      } else {
        setNotConfigured(false);
        setData({
          issues: d.issues ?? [],
          columns: d.columns ?? []
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load issues";
      if (msg.includes("not configured") || msg.includes("GitHub not configured")) {
        setNotConfigured(true);
        setData(null);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [api, project == null ? void 0 : project.path]);
  reactExports.useEffect(() => {
    fetchIssues();
    const unsubscribe = api.onContextChange(() => {
      fetchIssues();
    });
    return unsubscribe;
  }, [fetchIssues, api]);
  reactExports.useEffect(() => {
    if (!(project == null ? void 0 : project.path)) return;
    api.rpc("GET", `/config?path=${encodeURIComponent(project.path)}`).then((res) => {
      const d = res;
      setHasAnthropicKey(Boolean(d.hasAnthropicKey));
    }).catch(() => {
    });
  }, [api, project == null ? void 0 : project.path]);
  reactExports.useEffect(() => {
    const schedule = () => {
      fetchRef.current = setTimeout(() => {
        fetchIssues().then(schedule);
      }, POLL_INTERVAL_MS);
    };
    schedule();
    return () => {
      if (fetchRef.current !== null) clearTimeout(fetchRef.current);
    };
  }, [fetchIssues]);
  reactExports.useEffect(() => {
    if (!showSortMenu) return;
    const handler = (e) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSortMenu]);
  const handleSubscriptionPriorities = (priorities) => {
    const newMap = /* @__PURE__ */ new Map();
    for (const p2 of priorities) newMap.set(p2.number, p2);
    setPriorityMap(newMap);
    setAiUsed(true);
    setSortBy("priority");
    setShowSubscriptionModal(false);
  };
  const handleAIPrioritize = async () => {
    if (!data || aiPrioritizing || !(project == null ? void 0 : project.path)) return;
    setAiPrioritizing(true);
    try {
      const issuesForAI = data.issues.filter((i) => i.state !== "closed").map((i) => ({
        number: i.number,
        title: i.title,
        body: i.body,
        labels: i.labels,
        comments: i.comments,
        created_at: i.created_at,
        updated_at: i.updated_at,
        state: i.state
      }));
      const res = await api.rpc("POST", `/ai-prioritize?path=${encodeURIComponent(project.path)}`, {
        issues: issuesForAI
      });
      const newMap = /* @__PURE__ */ new Map();
      for (const p2 of res.priorities ?? []) newMap.set(p2.number, p2);
      setPriorityMap(newMap);
      setAiUsed(res.usingAI);
      setSortBy("priority");
    } catch (e) {
      console.error("[cgi] AI prioritize failed:", e);
    } finally {
      setAiPrioritizing(false);
    }
  };
  const handleToggleColumn = (id2) => {
    setCollapsedColumns((prev) => {
      const next = new Set(prev);
      if (next.has(id2)) next.delete(id2);
      else next.add(id2);
      saveCollapsed(next);
      return next;
    });
  };
  const handleMoveIssue = async (issueNumber, newColumnId) => {
    var _a;
    if (!(project == null ? void 0 : project.path) || !data) return;
    const issue = data.issues.find((i) => i.number === issueNumber);
    if (!issue) return;
    const patch = columnChangePatch(issue.state === "closed" ? "done" : ((_a = issue.labels.find((l2) => ["in-progress", "review", "blocked"].includes(l2.name))) == null ? void 0 : _a.name) ?? "todo", newColumnId);
    if (!patch) return;
    try {
      const res = await api.rpc("PATCH", `/issues/${issueNumber}?path=${encodeURIComponent(project.path)}`, patch);
      const d = res;
      if (d.ok && d.issue) {
        setData((prev) => prev ? {
          ...prev,
          issues: prev.issues.map((i) => i.number === issueNumber ? d.issue : i)
        } : prev);
      }
    } catch {
    }
  };
  const handleIssueUpdated = (updated) => {
    setData((prev) => prev ? {
      ...prev,
      issues: prev.issues.map((i) => i.number === updated.number ? updated : i)
    } : prev);
    setSelectedIssue(updated);
  };
  const handleIssueCreated = (issue) => {
    setData((prev) => prev ? {
      ...prev,
      issues: [issue, ...prev.issues]
    } : prev);
    setShowNewIssue(false);
    setSelectedIssue(issue);
  };
  const processedIssues = reactExports.useMemo(() => {
    if (!data) return [];
    let issues = data.issues;
    if (searchText.trim()) {
      const q2 = searchText.toLowerCase();
      issues = issues.filter((i) => {
        var _a;
        return i.title.toLowerCase().includes(q2) || String(i.number).includes(q2) || (((_a = i.body) == null ? void 0 : _a.toLowerCase().includes(q2)) ?? false);
      });
    }
    if (activePriority !== "all") {
      issues = issues.filter((i) => {
        const p2 = getEffectivePriority(i, priorityMap) ?? detectPriorityFromLabels(i.labels);
        return p2 === activePriority;
      });
    }
    return sortIssues(issues, sortBy, sortDir, priorityMap);
  }, [data, searchText, activePriority, sortBy, sortDir, priorityMap]);
  const totalCount = (data == null ? void 0 : data.issues.length) ?? 0;
  const filteredCount = processedIssues.length;
  const isFiltered = filteredCount !== totalCount;
  const projectPath = (project == null ? void 0 : project.path) ?? "";
  const repoInfo = data ?? {};
  return /* @__PURE__ */ React.createElement("div", { className: `cgi-root cgi-${theme}`, style: {
    background: "var(--cgi-bg)",
    color: "var(--cgi-text)"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 267,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-toolbar", style: {
    background: "var(--cgi-surface)"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 269,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-toolbar-title", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 270,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 271,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("path", { d: "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 272,
    columnNumber: 13
  } })), "GitHub Issues Board", repoInfo.owner && repoInfo.repo && /* @__PURE__ */ React.createElement("span", { style: {
    fontWeight: 400,
    opacity: 0.6,
    fontSize: 12
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 276,
    columnNumber: 13
  } }, repoInfo.owner, "/", repoInfo.repo), data && /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 11,
    opacity: 0.45
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 281,
    columnNumber: 13
  } }, isFiltered ? `${filteredCount}/${totalCount}` : `${totalCount}`)), /* @__PURE__ */ React.createElement("div", { className: "cgi-tabs", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 286,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("button", { className: `cgi-tab${activeTab === "board" ? " active" : ""}`, onClick: () => switchTab("board"), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 287,
    columnNumber: 11
  } }, "Issues Board"), /* @__PURE__ */ React.createElement("button", { className: `cgi-tab${activeTab === "plan" ? " active" : ""}`, onClick: () => switchTab("plan"), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 291,
    columnNumber: 11
  } }, "Plan")), /* @__PURE__ */ React.createElement("div", { className: "cgi-toolbar-actions", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 296,
    columnNumber: 9
  } }, project && !notConfigured && /* @__PURE__ */ React.createElement("button", { className: "cgi-btn cgi-btn-new-issue", onClick: () => setShowNewIssue(true), title: "Create a new issue", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 298,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 303,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("path", { d: "M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 304,
    columnNumber: 17
  } })), "New Issue"), data && project && /* @__PURE__ */ React.createElement("button", { className: `cgi-btn cgi-btn-ai${aiPrioritizing ? " cgi-btn-ai-loading" : ""}`, onClick: handleAIPrioritize, disabled: aiPrioritizing, title: hasAnthropicKey ? "AI Prioritize — using Anthropic Claude API" : "AI Prioritize — using smart heuristics (add Anthropic API key in ⚙ settings for real AI)", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 310,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 316,
    columnNumber: 15
  } }, /* @__PURE__ */ React.createElement("path", { d: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 317,
    columnNumber: 17
  } })), aiPrioritizing ? "Analyzing…" : aiUsed ? "Re-prioritize" : "AI Prioritize"), /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: fetchIssues, disabled: loading, title: "Refresh issues", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 322,
    columnNumber: 11
  } }, loading ? "↻ Refreshing…" : "↻ Refresh"), project && /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: () => setShowSettings(true), title: "Settings", style: {
    padding: "4px 8px"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 326,
    columnNumber: 13
  } }, "⚙"))), activeTab === "board" && data && /* @__PURE__ */ React.createElement("div", { className: "cgi-filterbar", style: {
    background: "var(--cgi-surface)",
    borderBottom: "1px solid var(--cgi-border)"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 335,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-search-wrap", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 337,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("svg", { className: "cgi-search-icon", width: "13", height: "13", viewBox: "0 0 16 16", fill: "currentColor", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 338,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("path", { d: "M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 339,
    columnNumber: 15
  } })), /* @__PURE__ */ React.createElement("input", { type: "text", className: "cgi-search-input", placeholder: "Search issues…", value: searchText, onChange: (e) => setSearchText(e.target.value), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 341,
    columnNumber: 13
  } }), searchText && /* @__PURE__ */ React.createElement("button", { className: "cgi-search-clear", onClick: () => setSearchText(""), title: "Clear search", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 349,
    columnNumber: 15
  } }, "✕")), /* @__PURE__ */ React.createElement("div", { className: "cgi-priority-pills", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 354,
    columnNumber: 11
  } }, ["all", "high", "medium", "low"].map((p2) => /* @__PURE__ */ React.createElement("button", { key: p2, className: `cgi-priority-pill${activePriority === p2 ? " active" : ""}`, onClick: () => setActivePriority(p2), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 356,
    columnNumber: 15
  } }, p2 !== "all" && /* @__PURE__ */ React.createElement("span", { className: "cgi-priority-pill-dot", style: {
    background: PRIORITY_PILL_COLORS[p2]
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 362,
    columnNumber: 19
  } }), p2 === "all" ? "All" : p2.charAt(0).toUpperCase() + p2.slice(1)))), /* @__PURE__ */ React.createElement("div", { className: "cgi-sort-controls", ref: sortMenuRef, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 370,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-btn cgi-sort-dir-btn", onClick: () => setSortDir((d) => d === "desc" ? "asc" : "desc"), title: sortDir === "desc" ? "Descending — click for ascending" : "Ascending — click for descending", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 371,
    columnNumber: 13
  } }, sortDir === "desc" ? "↓" : "↑"), /* @__PURE__ */ React.createElement("div", { style: {
    position: "relative"
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 378,
    columnNumber: 13
  } }, /* @__PURE__ */ React.createElement("button", { className: "cgi-btn cgi-sort-select-btn", onClick: () => setShowSortMenu((v2) => !v2), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 379,
    columnNumber: 15
  } }, "Sort: ", SORT_LABELS[sortBy], " ", /* @__PURE__ */ React.createElement("span", { style: {
    opacity: 0.5,
    marginLeft: 2
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 383,
    columnNumber: 45
  } }, "∨")), showSortMenu && /* @__PURE__ */ React.createElement("div", { className: "cgi-sort-menu", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 386,
    columnNumber: 17
  } }, SORT_OPTIONS.map((opt) => /* @__PURE__ */ React.createElement("button", { key: opt, className: `cgi-sort-menu-item${sortBy === opt ? " active" : ""}`, onClick: () => {
    setSortBy(opt);
    setShowSortMenu(false);
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 388,
    columnNumber: 21
  } }, SORT_LABELS[opt])))))), activeTab === "plan" ? project ? /* @__PURE__ */ React.createElement(PlanView, { projectPath, onOpenIssue: setSelectedIssue, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 406,
    columnNumber: 11
  } }) : /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 411,
    columnNumber: 11
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    opacity: 0.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 411,
    columnNumber: 39
  } }, "No project open.")) : !project ? /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 414,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    opacity: 0.5
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 415,
    columnNumber: 11
  } }, "No project open."), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 12,
    opacity: 0.4
  }, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 416,
    columnNumber: 11
  } }, "Open a project to view its GitHub Issues.")) : notConfigured ? /* @__PURE__ */ React.createElement(ConfigBanner, { onOpenSettings: () => setShowSettings(true), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 419,
    columnNumber: 9
  } }) : loading && !data ? /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 421,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-spinner", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 422,
    columnNumber: 11
  } }), /* @__PURE__ */ React.createElement("div", { __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 423,
    columnNumber: 11
  } }, "Loading issues…")) : error ? /* @__PURE__ */ React.createElement("div", { className: "cgi-center", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 426,
    columnNumber: 9
  } }, /* @__PURE__ */ React.createElement("div", { className: "cgi-error-text", __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 427,
    columnNumber: 11
  } }, error), /* @__PURE__ */ React.createElement("button", { className: "cgi-btn", onClick: fetchIssues, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 428,
    columnNumber: 11
  } }, "Retry")) : data ? /* @__PURE__ */ React.createElement(GithubBoard, { issues: processedIssues, priorityMap, collapsedColumns, onToggleColumn: handleToggleColumn, onMoveIssue: handleMoveIssue, onOpenIssue: setSelectedIssue, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 431,
    columnNumber: 9
  } }) : null, selectedIssue && project && /* @__PURE__ */ React.createElement(GithubIssueModal, { issue: selectedIssue, projectPath, onClose: () => setSelectedIssue(null), onIssueUpdated: handleIssueUpdated, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 442,
    columnNumber: 9
  } }), showSettings && project && /* @__PURE__ */ React.createElement(SettingsModal, { projectPath, onClose: () => setShowSettings(false), onSaved: () => {
    setNotConfigured(false);
    setShowSettings(false);
    void fetchIssues();
  }, onManualPrioritize: data ? () => {
    setShowSettings(false);
    setShowSubscriptionModal(true);
  } : void 0, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 451,
    columnNumber: 9
  } }), showSubscriptionModal && data && /* @__PURE__ */ React.createElement(SubscriptionPriorityModal, { issues: data.issues, onApply: handleSubscriptionPriorities, onClose: () => setShowSubscriptionModal(false), __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 467,
    columnNumber: 9
  } }), showNewIssue && project && /* @__PURE__ */ React.createElement(NewIssueModal, { projectPath, onClose: () => setShowNewIssue(false), onCreated: handleIssueCreated, __self: void 0, __source: {
    fileName: _jsxFileName$1,
    lineNumber: 475,
    columnNumber: 9
  } }));
};
const stylesRaw = "/* claude-github-issue plugin styles */\n\n.cgi-root {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  width: 100%;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n  font-size: 13px;\n  overflow: hidden;\n}\n\n/* Toolbar */\n.cgi-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 16px;\n  border-bottom: 1px solid var(--cgi-border);\n  flex-shrink: 0;\n  gap: 8px;\n}\n\n.cgi-toolbar-title {\n  font-weight: 600;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.cgi-toolbar-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.cgi-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 6px;\n  border: 1px solid var(--cgi-border);\n  background: var(--cgi-btn-bg);\n  color: var(--cgi-text);\n  font-size: 12px;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n  white-space: nowrap;\n}\n\n.cgi-btn:hover {\n  background: var(--cgi-btn-hover-bg);\n  border-color: var(--cgi-border-strong);\n}\n\n.cgi-btn:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.cgi-btn-primary {\n  background: var(--cgi-accent);\n  border-color: var(--cgi-accent);\n  color: #fff;\n}\n\n.cgi-btn-primary:hover {\n  background: var(--cgi-accent-hover);\n  border-color: var(--cgi-accent-hover);\n}\n\n/* Board */\n.cgi-board {\n  display: grid;\n  gap: 10px;\n  padding: 12px 16px;\n  height: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  align-items: stretch;\n}\n\n/* Column */\n.cgi-column {\n  display: flex;\n  flex-direction: column;\n  border-radius: 10px;\n  border: 1px solid var(--cgi-border);\n  overflow: hidden;\n  min-height: 0;\n  transition: width 0.2s, min-width 0.2s;\n}\n\n.cgi-column-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 10px;\n  font-weight: 600;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  gap: 6px;\n  cursor: pointer;\n  user-select: none;\n}\n\n.cgi-column-header:hover {\n  opacity: 0.85;\n}\n\n.cgi-column-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 20px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 9px;\n  font-size: 10px;\n  font-weight: 700;\n  background: rgba(0,0,0,0.15);\n}\n\n.cgi-column-toggle {\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  margin-left: auto;\n  flex-shrink: 0;\n  opacity: 0.7;\n  font-size: 10px;\n}\n\n.cgi-column-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 6px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-height: 0;\n}\n\n.cgi-column-collapsed-label {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n  transform: rotate(180deg);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  opacity: 0.8;\n  padding: 12px 0;\n  flex: 1;\n}\n\n/* Issue card */\n.cgi-card {\n  background: var(--cgi-card-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 8px;\n  padding: 8px 10px;\n  cursor: pointer;\n  transition: border-color 0.15s, box-shadow 0.15s, transform 0.1s;\n}\n\n.cgi-card:hover {\n  border-color: var(--cgi-border-strong);\n  box-shadow: 0 2px 8px rgba(0,0,0,0.12);\n  transform: translateY(-1px);\n}\n\n.cgi-card-title {\n  font-weight: 500;\n  font-size: 13px;\n  line-height: 1.4;\n  margin-bottom: 6px;\n  color: var(--cgi-text);\n  word-break: break-word;\n}\n\n.cgi-card-meta {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n\n.cgi-card-number {\n  font-size: 11px;\n  color: var(--cgi-text-muted);\n  font-weight: 500;\n}\n\n.cgi-card-labels {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 3px;\n  margin-top: 5px;\n}\n\n.cgi-label-chip {\n  display: inline-block;\n  padding: 1px 6px;\n  border-radius: 10px;\n  font-size: 10px;\n  font-weight: 600;\n  line-height: 1.6;\n}\n\n.cgi-avatar {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  object-fit: cover;\n  flex-shrink: 0;\n}\n\n.cgi-card-comments {\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  font-size: 11px;\n  color: var(--cgi-text-muted);\n  margin-left: auto;\n}\n\n/* Modal */\n.cgi-modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.55);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  z-index: 9999;\n  padding: 40px 16px;\n  overflow-y: auto;\n}\n\n.cgi-modal {\n  background: var(--cgi-modal-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 12px;\n  width: 100%;\n  max-width: 680px;\n  box-shadow: 0 20px 60px rgba(0,0,0,0.4);\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.cgi-modal-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 18px 20px 14px;\n  border-bottom: 1px solid var(--cgi-border);\n}\n\n.cgi-modal-title {\n  flex: 1;\n  font-size: 16px;\n  font-weight: 600;\n  line-height: 1.4;\n  color: var(--cgi-text);\n}\n\n.cgi-modal-subtitle {\n  font-size: 12px;\n  color: var(--cgi-text-muted);\n  margin-top: 2px;\n}\n\n.cgi-modal-close {\n  background: none;\n  border: none;\n  color: var(--cgi-text-muted);\n  font-size: 20px;\n  cursor: pointer;\n  padding: 0 4px;\n  line-height: 1;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n\n.cgi-modal-close:hover {\n  color: var(--cgi-text);\n  background: var(--cgi-btn-bg);\n}\n\n.cgi-modal-body {\n  padding: 16px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.cgi-modal-section-label {\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--cgi-text-muted);\n  margin-bottom: 6px;\n}\n\n.cgi-issue-body {\n  background: var(--cgi-code-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 8px;\n  padding: 12px;\n  font-size: 13px;\n  line-height: 1.6;\n  color: var(--cgi-text);\n  white-space: pre-wrap;\n  word-break: break-word;\n  max-height: 200px;\n  overflow-y: auto;\n}\n\n.cgi-column-selector {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n\n.cgi-column-btn {\n  padding: 4px 12px;\n  border-radius: 20px;\n  border: 1px solid var(--cgi-border);\n  background: var(--cgi-btn-bg);\n  color: var(--cgi-text);\n  font-size: 12px;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n\n.cgi-column-btn:hover {\n  border-color: var(--cgi-border-strong);\n  background: var(--cgi-btn-hover-bg);\n}\n\n.cgi-column-btn-active {\n  color: #fff;\n  border-color: transparent;\n}\n\n/* Comments */\n.cgi-comments-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  max-height: 250px;\n  overflow-y: auto;\n}\n\n.cgi-comment {\n  background: var(--cgi-code-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 8px;\n  padding: 10px 12px;\n}\n\n.cgi-comment-header {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-bottom: 6px;\n  font-size: 11px;\n  color: var(--cgi-text-muted);\n}\n\n.cgi-comment-author {\n  font-weight: 600;\n  color: var(--cgi-text);\n}\n\n.cgi-comment-body {\n  font-size: 13px;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n  color: var(--cgi-text);\n}\n\n/* Comment form */\n.cgi-comment-form {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.cgi-textarea {\n  width: 100%;\n  min-height: 72px;\n  padding: 8px 10px;\n  background: var(--cgi-input-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 8px;\n  color: var(--cgi-text);\n  font-size: 13px;\n  font-family: inherit;\n  resize: vertical;\n  box-sizing: border-box;\n  transition: border-color 0.15s;\n  outline: none;\n}\n\n.cgi-textarea:focus {\n  border-color: var(--cgi-accent);\n}\n\n/* Config banner */\n.cgi-config-banner {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 40px 20px;\n  text-align: center;\n  gap: 16px;\n  color: var(--cgi-text);\n}\n\n.cgi-config-banner-icon {\n  font-size: 48px;\n  opacity: 0.5;\n}\n\n.cgi-config-banner h2 {\n  font-size: 18px;\n  font-weight: 600;\n  margin: 0;\n}\n\n.cgi-config-banner p {\n  color: var(--cgi-text-muted);\n  max-width: 420px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.cgi-config-code {\n  background: var(--cgi-code-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 8px;\n  padding: 14px 18px;\n  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;\n  font-size: 12px;\n  text-align: left;\n  white-space: pre;\n  color: var(--cgi-text);\n  max-width: 380px;\n  width: 100%;\n}\n\n/* Loading / error states */\n.cgi-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  flex-direction: column;\n  gap: 12px;\n  color: var(--cgi-text-muted);\n}\n\n.cgi-spinner {\n  width: 28px;\n  height: 28px;\n  border: 3px solid var(--cgi-border);\n  border-top-color: var(--cgi-accent);\n  border-radius: 50%;\n  animation: cgi-spin 0.8s linear infinite;\n}\n\n@keyframes cgi-spin {\n  to { transform: rotate(360deg); }\n}\n\n.cgi-error-text {\n  color: #ef4444;\n  font-size: 13px;\n}\n\n/* Scrollbars */\n.cgi-root *::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.cgi-root *::-webkit-scrollbar-track {\n  background: transparent;\n}\n.cgi-root *::-webkit-scrollbar-thumb {\n  background: var(--cgi-scrollbar);\n  border-radius: 3px;\n}\n\n/* Dark theme variables */\n.cgi-dark {\n  --cgi-bg: #0f1117;\n  --cgi-surface: #161b22;\n  --cgi-card-bg: #1a2030;\n  --cgi-modal-bg: #161b22;\n  --cgi-code-bg: #0d1117;\n  --cgi-border: rgba(255,255,255,0.1);\n  --cgi-border-strong: rgba(255,255,255,0.2);\n  --cgi-text: #e6edf3;\n  --cgi-text-muted: #7d8590;\n  --cgi-btn-bg: rgba(255,255,255,0.06);\n  --cgi-btn-hover-bg: rgba(255,255,255,0.12);\n  --cgi-input-bg: #0d1117;\n  --cgi-accent: #2563eb;\n  --cgi-accent-hover: #1d4ed8;\n  --cgi-scrollbar: rgba(255,255,255,0.15);\n}\n\n/* New Issue button */\n.cgi-btn-new-issue {\n  background: var(--cgi-accent);\n  color: #fff;\n  border-color: var(--cgi-accent);\n  font-weight: 600;\n  gap: 5px;\n}\n.cgi-btn-new-issue:hover {\n  background: var(--cgi-accent-hover);\n  border-color: var(--cgi-accent-hover);\n}\n\n/* AI Prioritize button */\n.cgi-btn-ai {\n  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);\n  color: #fff;\n  border-color: transparent;\n  font-weight: 600;\n  gap: 5px;\n}\n.cgi-btn-ai:hover {\n  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);\n  border-color: transparent;\n}\n.cgi-btn-ai-loading {\n  opacity: 0.75;\n}\n\n/* AI button split group */\n.cgi-ai-btn-group {\n  display: flex;\n  align-items: stretch;\n}\n\n.cgi-btn-ai-sub {\n  opacity: 0.85;\n  font-size: 11px !important;\n  letter-spacing: 0.01em;\n  border-left: 1px solid rgba(255,255,255,0.2) !important;\n}\n\n.cgi-btn-ai-sub:hover {\n  opacity: 1;\n}\n\n/* Filter bar */\n.cgi-filterbar {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  flex-shrink: 0;\n  flex-wrap: wrap;\n}\n\n/* Search */\n.cgi-search-wrap {\n  position: relative;\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.cgi-search-icon {\n  position: absolute;\n  left: 8px;\n  color: var(--cgi-text-muted);\n  pointer-events: none;\n}\n\n.cgi-search-input {\n  padding: 4px 28px 4px 26px;\n  background: var(--cgi-input-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 6px;\n  color: var(--cgi-text);\n  font-size: 12px;\n  outline: none;\n  width: 160px;\n  transition: border-color 0.15s, width 0.2s;\n}\n\n.cgi-search-input:focus {\n  border-color: var(--cgi-accent);\n  width: 200px;\n}\n\n.cgi-search-input::placeholder {\n  color: var(--cgi-text-muted);\n}\n\n.cgi-search-clear {\n  position: absolute;\n  right: 6px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--cgi-text-muted);\n  font-size: 11px;\n  padding: 1px 2px;\n  line-height: 1;\n  border-radius: 3px;\n}\n.cgi-search-clear:hover {\n  color: var(--cgi-text);\n}\n\n/* Priority pills */\n.cgi-priority-pills {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n\n.cgi-priority-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 3px 10px;\n  border-radius: 20px;\n  border: 1px solid var(--cgi-border);\n  background: var(--cgi-btn-bg);\n  color: var(--cgi-text);\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  white-space: nowrap;\n}\n\n.cgi-priority-pill:hover {\n  border-color: var(--cgi-border-strong);\n  background: var(--cgi-btn-hover-bg);\n}\n\n.cgi-priority-pill.active {\n  background: var(--cgi-accent);\n  border-color: var(--cgi-accent);\n  color: #fff;\n}\n\n.cgi-priority-pill-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.cgi-priority-pill.active .cgi-priority-pill-dot {\n  background: rgba(255,255,255,0.8) !important;\n}\n\n/* Sort controls */\n.cgi-sort-controls {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-left: auto;\n  position: relative;\n}\n\n.cgi-sort-dir-btn {\n  font-size: 14px;\n  font-weight: 600;\n  padding: 3px 8px;\n  min-width: 28px;\n  justify-content: center;\n}\n\n.cgi-sort-select-btn {\n  white-space: nowrap;\n  min-width: 120px;\n  justify-content: space-between;\n}\n\n.cgi-sort-menu {\n  position: absolute;\n  top: calc(100% + 4px);\n  right: 0;\n  background: var(--cgi-modal-bg);\n  border: 1px solid var(--cgi-border);\n  border-radius: 8px;\n  box-shadow: 0 8px 24px rgba(0,0,0,0.25);\n  z-index: 100;\n  min-width: 130px;\n  overflow: hidden;\n}\n\n.cgi-sort-menu-item {\n  display: block;\n  width: 100%;\n  text-align: left;\n  padding: 7px 14px;\n  background: none;\n  border: none;\n  color: var(--cgi-text);\n  font-size: 13px;\n  cursor: pointer;\n  transition: background 0.1s;\n}\n\n.cgi-sort-menu-item:hover {\n  background: var(--cgi-btn-hover-bg);\n}\n\n.cgi-sort-menu-item.active {\n  color: var(--cgi-accent);\n  font-weight: 600;\n}\n\n/* Priority dot on card */\n.cgi-card-title-row {\n  display: flex;\n  align-items: flex-start;\n  gap: 6px;\n  margin-bottom: 6px;\n}\n\n.cgi-card-title-row .cgi-card-title {\n  margin-bottom: 0;\n  flex: 1;\n}\n\n.cgi-priority-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin-top: 4px;\n  cursor: help;\n}\n\n/* Image thumbnails on cards */\n.cgi-card-thumbs {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap;\n}\n\n.cgi-card-thumb {\n  width: 52px;\n  height: 38px;\n  object-fit: cover;\n  border-radius: 4px;\n  border: 1px solid var(--cgi-border);\n  background: var(--cgi-code-bg);\n  pointer-events: none;\n}\n\n.cgi-card-thumb-more {\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--cgi-text-muted);\n  padding: 0 4px;\n}\n\n/* Image grid in modal / comments */\n.cgi-img-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 8px;\n}\n\n.cgi-img-thumb-btn {\n  background: none;\n  border: 1px solid var(--cgi-border);\n  border-radius: 6px;\n  padding: 0;\n  cursor: zoom-in;\n  overflow: hidden;\n  transition: border-color 0.15s, box-shadow 0.15s;\n  flex-shrink: 0;\n}\n\n.cgi-img-thumb-btn:hover {\n  border-color: var(--cgi-accent);\n  box-shadow: 0 0 0 2px rgba(37,99,235,0.25);\n}\n\n.cgi-img-thumb {\n  display: block;\n  width: auto;\n  height: 80px;\n  max-width: 200px;\n  object-fit: cover;\n}\n\n/* Lightbox */\n.cgi-lightbox-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0,0,0,0.88);\n  z-index: 99999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: zoom-out;\n  padding: 24px;\n}\n\n.cgi-lightbox-img {\n  max-width: 100%;\n  max-height: 90vh;\n  object-fit: contain;\n  border-radius: 8px;\n  box-shadow: 0 8px 40px rgba(0,0,0,0.6);\n  cursor: default;\n}\n\n.cgi-lightbox-close {\n  position: fixed;\n  top: 16px;\n  right: 20px;\n  background: rgba(255,255,255,0.1);\n  border: 1px solid rgba(255,255,255,0.2);\n  color: #fff;\n  font-size: 20px;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 100000;\n  transition: background 0.15s;\n  line-height: 1;\n  padding: 0;\n}\n\n.cgi-lightbox-close:hover {\n  background: rgba(255,255,255,0.2);\n}\n\n.cgi-lightbox-error {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  color: #fff;\n  cursor: default;\n  text-align: center;\n}\n\n/* Light theme variables */\n.cgi-light {\n  --cgi-bg: #f6f8fa;\n  --cgi-surface: #ffffff;\n  --cgi-card-bg: #ffffff;\n  --cgi-modal-bg: #ffffff;\n  --cgi-code-bg: #f6f8fa;\n  --cgi-border: rgba(0,0,0,0.1);\n  --cgi-border-strong: rgba(0,0,0,0.22);\n  --cgi-text: #1f2328;\n  --cgi-text-muted: #636c76;\n  --cgi-btn-bg: rgba(0,0,0,0.04);\n  --cgi-btn-hover-bg: rgba(0,0,0,0.08);\n  --cgi-input-bg: #ffffff;\n  --cgi-accent: #2563eb;\n  --cgi-accent-hover: #1d4ed8;\n  --cgi-scrollbar: rgba(0,0,0,0.15);\n}\n\n/* Tab switcher */\n.cgi-tabs { display: flex; gap: 4px; margin-left: 12px; }\n.cgi-tab {\n  background: transparent; border: none; color: var(--cgi-text);\n  opacity: 0.55; padding: 6px 12px; font-size: 13px; cursor: pointer;\n  border-bottom: 2px solid transparent;\n}\n.cgi-tab:hover { opacity: 0.85; }\n.cgi-tab.active { opacity: 1; border-bottom-color: var(--cgi-accent, #0ea5e9); font-weight: 600; }\n\n/* Plan view */\n.cgi-plan { padding: 12px 16px; overflow-y: auto; }\n.cgi-plan-phase { margin-bottom: 20px; }\n.cgi-plan-phase-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }\n.cgi-plan-phase-title { font-weight: 600; font-size: 14px; }\n.cgi-plan-phase-count { font-size: 12px; opacity: 0.55; }\n.cgi-plan-progress { flex: 1; height: 6px; background: var(--cgi-border); border-radius: 3px; overflow: hidden; }\n.cgi-plan-progress-bar { display: block; height: 100%; background: #10b981; }\n.cgi-plan-list { display: flex; flex-direction: column; gap: 6px; }\n.cgi-plan-card {\n  display: flex; align-items: center; gap: 8px; padding: 6px 8px;\n  background: var(--cgi-surface); border: 1px solid var(--cgi-border);\n  border-radius: 6px; cursor: default;\n}\n.cgi-plan-card.done { opacity: 0.5; }\n.cgi-plan-card.done .cgi-plan-title { text-decoration: line-through; }\n.cgi-plan-drag { cursor: grab; opacity: 0.4; user-select: none; }\n.cgi-plan-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }\n.cgi-plan-card-main {\n  flex: 1; display: flex; align-items: center; gap: 8px; min-width: 0;\n  background: none; border: none; color: var(--cgi-text); cursor: pointer; text-align: left;\n}\n.cgi-plan-num { opacity: 0.5; font-size: 12px; flex: none; }\n.cgi-plan-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.cgi-plan-bug { font-size: 10px; background: #ef4444; color: #fff; padding: 1px 5px; border-radius: 4px; flex: none; }\n.cgi-plan-reorder { display: flex; flex-direction: column; flex: none; }\n.cgi-plan-arrow {\n  background: none; border: none; color: var(--cgi-text); opacity: 0.5;\n  cursor: pointer; font-size: 9px; line-height: 1; padding: 1px 4px;\n}\n.cgi-plan-arrow:disabled { opacity: 0.15; cursor: default; }\n.cgi-plan-arrow:hover:not(:disabled) { opacity: 1; }\n.cgi-plan-toolbar { display: flex; gap: 8px; margin-bottom: 12px; }\n.cgi-plan-bootstrap { max-width: 460px; }\n.cgi-plan-bootstrap-text {\n  width: 100%; box-sizing: border-box; font-family: monospace; font-size: 13px;\n  background: var(--cgi-bg); color: var(--cgi-text);\n  border: 1px solid var(--cgi-border); border-radius: 6px; padding: 8px; margin: 8px 0;\n}\n.cgi-modal-actions { display: flex; gap: 10px; justify-content: flex-end; padding-top: 4px; }\n\n.cgi-plan-toggle {\n  display: inline-flex; align-items: center; gap: 6px;\n  font-size: 12px; opacity: 0.8; cursor: pointer; user-select: none; margin-left: 4px;\n}\n.cgi-plan-toggle input { cursor: pointer; margin: 0; }\n\n/* Plan-only items */\n.cgi-plan-add {\n  margin-left: auto; background: none; border: 1px dashed var(--cgi-border);\n  color: var(--cgi-text); opacity: 0.7; cursor: pointer; font-size: 11px;\n  padding: 2px 8px; border-radius: 5px; flex: none;\n}\n.cgi-plan-add:hover { opacity: 1; border-style: solid; }\n.cgi-plan-item { border-style: dashed; }\n.cgi-plan-item-dot {\n  width: 8px; height: 8px; border-radius: 50%; flex: none;\n  background: transparent; border: 1.5px solid #8b5cf6;\n}\n.cgi-plan-item-note {\n  opacity: 0.5; font-size: 11px; white-space: nowrap; overflow: hidden;\n  text-overflow: ellipsis; min-width: 0; flex: 1;\n}\n.cgi-plan-item-tag {\n  font-size: 10px; background: rgba(139,92,246,0.18); color: #8b5cf6;\n  padding: 1px 5px; border-radius: 4px; flex: none;\n}\n.cgi-plan-item-actions { display: flex; align-items: center; gap: 2px; flex: none; }\n.cgi-plan-iaction {\n  background: none; border: none; color: var(--cgi-text); opacity: 0.5;\n  cursor: pointer; font-size: 12px; line-height: 1; padding: 2px 4px; border-radius: 4px;\n}\n.cgi-plan-iaction:hover:not(:disabled) { opacity: 1; background: var(--cgi-border); }\n.cgi-plan-iaction:disabled { opacity: 0.3; cursor: default; }\n.cgi-plan-idelete:hover { color: #ef4444; }\n";
var _jsxFileName = "/home/claude/projects/claude-github-issue/claude-github-issue/src/frontend/index.tsx";
const STYLE_ID = "cgi-plugin-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = STYLE_ID;
  styleEl.textContent = stylesRaw;
  document.head.appendChild(styleEl);
}
const roots = /* @__PURE__ */ new WeakMap();
function mount(container, api) {
  let root = roots.get(container);
  if (!root) {
    root = createRoot(container);
    roots.set(container, root);
  }
  root.render(/* @__PURE__ */ React.createElement(React.StrictMode, { __self: this, __source: {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  } }, /* @__PURE__ */ React.createElement(PluginProvider, { api, __self: this, __source: {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 7
  } }, /* @__PURE__ */ React.createElement(App, { __self: this, __source: {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 9
  } }))));
}
function unmount(container) {
  const root = roots.get(container);
  if (root) {
    root.unmount();
    roots.delete(container);
  }
}
export {
  mount,
  unmount
};
