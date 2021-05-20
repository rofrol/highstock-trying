/*
 Highstock JS v9.1.0 (2021-05-03)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (T, Q) {
  "object" === typeof module && module.exports
    ? ((Q["default"] = Q), (module.exports = T.document ? Q(T) : Q))
    : "function" === typeof define && define.amd
    ? define("highcharts/highstock", function () {
        return Q(T);
      })
    : (T.Highcharts && T.Highcharts.error(16, !0), (T.Highcharts = Q(T)));
})("undefined" !== typeof window ? window : this, function (T) {
  function Q(d, h, K, F) {
    d.hasOwnProperty(h) || (d[h] = F.apply(null, K));
  }
  var d = {};
  Q(d, "Core/Globals.js", [], function () {
    var d =
        "undefined" !== typeof T
          ? T
          : "undefined" !== typeof window
          ? window
          : {},
      h;
    (function (h) {
      h.SVG_NS = "http://www.w3.org/2000/svg";
      h.product = "Highcharts";
      h.version = "9.1.0";
      h.win = d;
      h.doc = h.win.document;
      h.svg =
        h.doc &&
        h.doc.createElementNS &&
        !!h.doc.createElementNS(h.SVG_NS, "svg").createSVGRect;
      h.userAgent = (h.win.navigator && h.win.navigator.userAgent) || "";
      h.isChrome = -1 !== h.userAgent.indexOf("Chrome");
      h.isFirefox = -1 !== h.userAgent.indexOf("Firefox");
      h.isMS = /(edge|msie|trident)/i.test(h.userAgent) && !h.win.opera;
      h.isSafari = !h.isChrome && -1 !== h.userAgent.indexOf("Safari");
      h.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(h.userAgent);
      h.isWebKit = -1 !== h.userAgent.indexOf("AppleWebKit");
      h.deg2rad = (2 * Math.PI) / 360;
      h.hasBidiBug =
        h.isFirefox && 4 > parseInt(h.userAgent.split("Firefox/")[1], 10);
      h.hasTouch = !!h.win.TouchEvent;
      h.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
      h.noop = function () {};
      h.supportsPassiveEvents = (function () {
        var d = !1;
        if (!h.isMS) {
          var N = Object.defineProperty({}, "passive", {
            get: function () {
              d = !0;
            },
          });
          h.win.addEventListener &&
            h.win.removeEventListener &&
            (h.win.addEventListener("testPassive", h.noop, N),
            h.win.removeEventListener("testPassive", h.noop, N));
        }
        return d;
      })();
      h.charts = [];
      h.dateFormats = {};
      h.seriesTypes = {};
      h.symbolSizes = {};
    })(h || (h = {}));
    return h;
  });
  Q(d, "Core/Utilities.js", [d["Core/Globals.js"]], function (d) {
    function h(g, n, e, l) {
      var b = n ? "Highcharts error" : "Highcharts warning";
      32 === g && (g = b + ": Deprecated member");
      var f = B(g),
        w = f
          ? b + " #" + g + ": www.highcharts.com/errors/" + g + "/"
          : g.toString();
      if ("undefined" !== typeof l) {
        var q = "";
        f && (w += "?");
        m(l, function (z, g) {
          q += "\n - " + g + ": " + z;
          f && (w += encodeURI(g) + "=" + encodeURI(z));
        });
        w += q;
      }
      A(
        Highcharts,
        "displayError",
        {
          chart: e,
          code: g,
          message: w,
          params: l,
        },
        function () {
          if (n) throw Error(w);
          v.console && -1 === h.messages.indexOf(w) && console.warn(w);
        }
      );
      h.messages.push(w);
    }
    function N(g, n) {
      var e = {};
      m(g, function (l, b) {
        if (G(g[b], !0) && !g.nodeType && n[b])
          (l = N(g[b], n[b])), Object.keys(l).length && (e[b] = l);
        else if (G(g[b]) || g[b] !== n[b]) e[b] = g[b];
      });
      return e;
    }
    function F(g, n) {
      return parseInt(g, n || 10);
    }
    function J(g) {
      return "string" === typeof g;
    }
    function M(g) {
      g = Object.prototype.toString.call(g);
      return "[object Array]" === g || "[object Array Iterator]" === g;
    }
    function G(g, n) {
      return !!g && "object" === typeof g && (!n || !M(g));
    }
    function I(g) {
      return G(g) && "number" === typeof g.nodeType;
    }
    function D(g) {
      var n = g && g.constructor;
      return !(!G(g, !0) || I(g) || !n || !n.name || "Object" === n.name);
    }
    function B(g) {
      return (
        "number" === typeof g && !isNaN(g) && Infinity > g && -Infinity < g
      );
    }
    function u(g) {
      return "undefined" !== typeof g && null !== g;
    }
    function c(g, n, e) {
      var l;
      J(n)
        ? u(e)
          ? g.setAttribute(n, e)
          : g &&
            g.getAttribute &&
            ((l = g.getAttribute(n)) ||
              "class" !== n ||
              (l = g.getAttribute(n + "Name")))
        : m(n, function (e, n) {
            g.setAttribute(n, e);
          });
      return l;
    }
    function a(g, n) {
      var e;
      g || (g = {});
      for (e in n) g[e] = n[e];
      return g;
    }
    function r() {
      for (var g = arguments, n = g.length, e = 0; e < n; e++) {
        var l = g[e];
        if ("undefined" !== typeof l && null !== l) return l;
      }
    }
    function y(g, n) {
      d.isMS &&
        !d.svg &&
        n &&
        "undefined" !== typeof n.opacity &&
        (n.filter = "alpha(opacity=" + 100 * n.opacity + ")");
      a(g.style, n);
    }
    function p(g, n, e, l, b) {
      g = f.createElement(g);
      n && a(g, n);
      b &&
        y(g, {
          padding: "0",
          border: "none",
          margin: "0",
        });
      e && y(g, e);
      l && l.appendChild(g);
      return g;
    }
    function O(g, n) {
      return parseFloat(g.toPrecision(n || 14));
    }
    function k(g, n, e) {
      var l = d.getStyle || k;
      if ("width" === n)
        return (
          (n = Math.min(g.offsetWidth, g.scrollWidth)),
          (e = g.getBoundingClientRect && g.getBoundingClientRect().width),
          e < n && e >= n - 1 && (n = Math.floor(e)),
          Math.max(
            0,
            n -
              (l(g, "padding-left", !0) || 0) -
              (l(g, "padding-right", !0) || 0)
          )
        );
      if ("height" === n)
        return Math.max(
          0,
          Math.min(g.offsetHeight, g.scrollHeight) -
            (l(g, "padding-top", !0) || 0) -
            (l(g, "padding-bottom", !0) || 0)
        );
      v.getComputedStyle || h(27, !0);
      if ((g = v.getComputedStyle(g, void 0))) {
        var b = g.getPropertyValue(n);
        r(e, "opacity" !== n) && (b = F(b));
      }
      return b;
    }
    function m(g, n, e) {
      for (var l in g)
        Object.hasOwnProperty.call(g, l) && n.call(e || g[l], g[l], l, g);
    }
    function L(g, n, e) {
      function l(q, z) {
        var w = g.removeEventListener || d.removeEventListenerPolyfill;
        w && w.call(g, q, z, !1);
      }
      function b(q) {
        var z;
        if (g.nodeName) {
          if (n) {
            var w = {};
            w[n] = !0;
          } else w = q;
          m(w, function (w, g) {
            if (q[g]) for (z = q[g].length; z--; ) l(g, q[g][z].fn);
          });
        }
      }
      var f = ("function" === typeof g && g.prototype) || g;
      if (Object.hasOwnProperty.call(f, "hcEvents")) {
        var w = f.hcEvents;
        n
          ? ((f = w[n] || []),
            e
              ? ((w[n] = f.filter(function (q) {
                  return e !== q.fn;
                })),
                l(n, e))
              : (b(w), (w[n] = [])))
          : (b(w), delete f.hcEvents);
      }
    }
    function A(g, n, e, l) {
      e = e || {};
      if (f.createEvent && (g.dispatchEvent || (g.fireEvent && g !== d))) {
        var b = f.createEvent("Events");
        b.initEvent(n, !0, !0);
        e = a(b, e);
        g.dispatchEvent ? g.dispatchEvent(e) : g.fireEvent(n, e);
      } else if (g.hcEvents) {
        e.target ||
          a(e, {
            preventDefault: function () {
              e.defaultPrevented = !0;
            },
            target: g,
            type: n,
          });
        b = [];
        for (var v = g, w = !1; v.hcEvents; )
          Object.hasOwnProperty.call(v, "hcEvents") &&
            v.hcEvents[n] &&
            (b.length && (w = !0), b.unshift.apply(b, v.hcEvents[n])),
            (v = Object.getPrototypeOf(v));
        w &&
          b.sort(function (q, z) {
            return q.order - z.order;
          });
        b.forEach(function (q) {
          !1 === q.fn.call(g, e) && e.preventDefault();
        });
      }
      l && !e.defaultPrevented && l.call(g, e);
    }
    var t = d.charts,
      f = d.doc,
      v = d.win;
    ("");
    (h || (h = {})).messages = [];
    var b;
    Math.easeInOutSine = function (g) {
      return -0.5 * (Math.cos(Math.PI * g) - 1);
    };
    var E = Array.prototype.find
      ? function (g, n) {
          return g.find(n);
        }
      : function (g, n) {
          var e,
            b = g.length;
          for (e = 0; e < b; e++) if (n(g[e], e)) return g[e];
        };
    m(
      {
        map: "map",
        each: "forEach",
        grep: "filter",
        reduce: "reduce",
        some: "some",
      },
      function (g, b) {
        d[b] = function (e) {
          var n;
          h(
            32,
            !1,
            void 0,
            ((n = {}), (n["Highcharts." + b] = "use Array." + g), n)
          );
          return Array.prototype[g].apply(e, [].slice.call(arguments, 1));
        };
      }
    );
    var P,
      H = (function () {
        var g = Math.random().toString(36).substring(2, 9) + "-",
          b = 0;
        return function () {
          return "highcharts-" + (P ? "" : g) + b++;
        };
      })();
    v.jQuery &&
      (v.jQuery.fn.highcharts = function () {
        var g = [].slice.call(arguments);
        if (this[0])
          return g[0]
            ? (new d[J(g[0]) ? g.shift() : "Chart"](this[0], g[0], g[1]), this)
            : t[c(this[0], "data-highcharts-chart")];
      });
    return {
      addEvent: function (g, b, e, l) {
        void 0 === l && (l = {});
        var n = ("function" === typeof g && g.prototype) || g;
        Object.hasOwnProperty.call(n, "hcEvents") || (n.hcEvents = {});
        n = n.hcEvents;
        d.Point &&
          g instanceof d.Point &&
          g.series &&
          g.series.chart &&
          (g.series.chart.runTrackerClick = !0);
        var f = g.addEventListener || d.addEventListenerPolyfill;
        f &&
          f.call(
            g,
            b,
            e,
            d.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === l.passive
                      ? -1 !== b.indexOf("touch")
                      : l.passive,
                  capture: !1,
                }
              : !1
          );
        n[b] || (n[b] = []);
        n[b].push({
          fn: e,
          order: "number" === typeof l.order ? l.order : Infinity,
        });
        n[b].sort(function (w, q) {
          return w.order - q.order;
        });
        return function () {
          L(g, b, e);
        };
      },
      arrayMax: function (g) {
        for (var b = g.length, e = g[0]; b--; ) g[b] > e && (e = g[b]);
        return e;
      },
      arrayMin: function (g) {
        for (var b = g.length, e = g[0]; b--; ) g[b] < e && (e = g[b]);
        return e;
      },
      attr: c,
      clamp: function (g, b, e) {
        return g > b ? (g < e ? g : e) : b;
      },
      cleanRecursively: N,
      clearTimeout: function (g) {
        u(g) && clearTimeout(g);
      },
      correctFloat: O,
      createElement: p,
      css: y,
      defined: u,
      destroyObjectProperties: function (g, b) {
        m(g, function (e, l) {
          e && e !== b && e.destroy && e.destroy();
          delete g[l];
        });
      },
      discardElement: function (g) {
        b || (b = p("div"));
        g && b.appendChild(g);
        b.innerHTML = "";
      },
      erase: function (g, b) {
        for (var e = g.length; e--; )
          if (g[e] === b) {
            g.splice(e, 1);
            break;
          }
      },
      error: h,
      extend: a,
      extendClass: function (g, b) {
        var e = function () {};
        e.prototype = new g();
        a(e.prototype, b);
        return e;
      },
      find: E,
      fireEvent: A,
      getMagnitude: function (g) {
        return Math.pow(10, Math.floor(Math.log(g) / Math.LN10));
      },
      getNestedProperty: function (g, b) {
        for (g = g.split("."); g.length && u(b); ) {
          var e = g.shift();
          if ("undefined" === typeof e || "__proto__" === e) return;
          b = b[e];
          if (
            !u(b) ||
            "function" === typeof b ||
            "number" === typeof b.nodeType ||
            b === v
          )
            return;
        }
        return b;
      },
      getStyle: k,
      inArray: function (g, b, e) {
        h(32, !1, void 0, {
          "Highcharts.inArray": "use Array.indexOf",
        });
        return b.indexOf(g, e);
      },
      isArray: M,
      isClass: D,
      isDOMElement: I,
      isFunction: function (g) {
        return "function" === typeof g;
      },
      isNumber: B,
      isObject: G,
      isString: J,
      keys: function (g) {
        h(32, !1, void 0, {
          "Highcharts.keys": "use Object.keys",
        });
        return Object.keys(g);
      },
      merge: function () {
        var g,
          b = arguments,
          e = {},
          l = function (b, w) {
            "object" !== typeof b && (b = {});
            m(w, function (q, z) {
              "__proto__" !== z &&
                "constructor" !== z &&
                (!G(q, !0) || D(q) || I(q)
                  ? (b[z] = w[z])
                  : (b[z] = l(b[z] || {}, q)));
            });
            return b;
          };
        !0 === b[0] && ((e = b[1]), (b = Array.prototype.slice.call(b, 2)));
        var f = b.length;
        for (g = 0; g < f; g++) e = l(e, b[g]);
        return e;
      },
      normalizeTickInterval: function (b, n, e, l, f) {
        var g = b;
        e = r(e, 1);
        var w = b / e;
        n ||
          ((n = f
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === l &&
            (1 === e
              ? (n = n.filter(function (q) {
                  return 0 === q % 1;
                }))
              : 0.1 >= e && (n = [1 / e])));
        for (
          l = 0;
          l < n.length &&
          !((g = n[l]),
          (f && g * e >= b) || (!f && w <= (n[l] + (n[l + 1] || n[l])) / 2));
          l++
        );
        return (g = O(g * e, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: m,
      offset: function (b) {
        var g = f.documentElement;
        b =
          b.parentElement || b.parentNode
            ? b.getBoundingClientRect()
            : {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
              };
        return {
          top: b.top + (v.pageYOffset || g.scrollTop) - (g.clientTop || 0),
          left: b.left + (v.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
          width: b.width,
          height: b.height,
        };
      },
      pad: function (b, n, e) {
        return (
          Array((n || 2) + 1 - String(b).replace("-", "").length).join(
            e || "0"
          ) + b
        );
      },
      pick: r,
      pInt: F,
      relativeLength: function (b, n, e) {
        return /%$/.test(b)
          ? (n * parseFloat(b)) / 100 + (e || 0)
          : parseFloat(b);
      },
      removeEvent: L,
      splat: function (b) {
        return M(b) ? b : [b];
      },
      stableSort: function (b, n) {
        var g = b.length,
          l,
          f;
        for (f = 0; f < g; f++) b[f].safeI = f;
        b.sort(function (b, w) {
          l = n(b, w);
          return 0 === l ? b.safeI - w.safeI : l;
        });
        for (f = 0; f < g; f++) delete b[f].safeI;
      },
      syncTimeout: function (b, f, e) {
        if (0 < f) return setTimeout(b, f, e);
        b.call(0, e);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: H,
      useSerialIds: function (b) {
        return (P = r(b, P));
      },
      wrap: function (b, f, e) {
        var g = b[f];
        b[f] = function () {
          var b = Array.prototype.slice.call(arguments),
            l = arguments,
            w = this;
          w.proceed = function () {
            g.apply(w, arguments.length ? arguments : l);
          };
          b.unshift(g);
          b = e.apply(this, b);
          w.proceed = null;
          return b;
        };
      },
    };
  });
  Q(
    d,
    "Core/Color/Color.js",
    [d["Core/Globals.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = h.isNumber,
        F = h.merge,
        J = h.pInt;
      ("");
      h = (function () {
        function h(G) {
          this.parsers = [
            {
              regex:
                /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
              parse: function (h) {
                return [J(h[1]), J(h[2]), J(h[3]), parseFloat(h[4], 10)];
              },
            },
            {
              regex:
                /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
              parse: function (h) {
                return [J(h[1]), J(h[2]), J(h[3]), 1];
              },
            },
          ];
          this.rgba = [];
          if (d.Color !== h) return new d.Color(G);
          if (!(this instanceof h)) return new h(G);
          this.init(G);
        }
        h.parse = function (d) {
          return new h(d);
        };
        h.prototype.init = function (d) {
          var I, D;
          if (
            (this.input = d =
              h.names[d && d.toLowerCase ? d.toLowerCase() : ""] || d) &&
            d.stops
          )
            this.stops = d.stops.map(function (c) {
              return new h(c[1]);
            });
          else {
            if (d && d.charAt && "#" === d.charAt()) {
              var B = d.length;
              d = parseInt(d.substr(1), 16);
              7 === B
                ? (I = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1])
                : 4 === B &&
                  (I = [
                    ((d & 3840) >> 4) | ((d & 3840) >> 8),
                    ((d & 240) >> 4) | (d & 240),
                    ((d & 15) << 4) | (d & 15),
                    1,
                  ]);
            }
            if (!I)
              for (D = this.parsers.length; D-- && !I; ) {
                var u = this.parsers[D];
                (B = u.regex.exec(d)) && (I = u.parse(B));
              }
          }
          this.rgba = I || [];
        };
        h.prototype.get = function (h) {
          var d = this.input,
            D = this.rgba;
          if ("undefined" !== typeof this.stops) {
            var B = F(d);
            B.stops = [].concat(B.stops);
            this.stops.forEach(function (u, c) {
              B.stops[c] = [B.stops[c][0], u.get(h)];
            });
          } else
            B =
              D && N(D[0])
                ? "rgb" === h || (!h && 1 === D[3])
                  ? "rgb(" + D[0] + "," + D[1] + "," + D[2] + ")"
                  : "a" === h
                  ? D[3]
                  : "rgba(" + D.join(",") + ")"
                : d;
          return B;
        };
        h.prototype.brighten = function (h) {
          var d,
            D = this.rgba;
          if (this.stops)
            this.stops.forEach(function (B) {
              B.brighten(h);
            });
          else if (N(h) && 0 !== h)
            for (d = 0; 3 > d; d++)
              (D[d] += J(255 * h)),
                0 > D[d] && (D[d] = 0),
                255 < D[d] && (D[d] = 255);
          return this;
        };
        h.prototype.setOpacity = function (h) {
          this.rgba[3] = h;
          return this;
        };
        h.prototype.tweenTo = function (h, d) {
          var D = this.rgba,
            B = h.rgba;
          B.length && D && D.length
            ? ((h = 1 !== B[3] || 1 !== D[3]),
              (d =
                (h ? "rgba(" : "rgb(") +
                Math.round(B[0] + (D[0] - B[0]) * (1 - d)) +
                "," +
                Math.round(B[1] + (D[1] - B[1]) * (1 - d)) +
                "," +
                Math.round(B[2] + (D[2] - B[2]) * (1 - d)) +
                (h ? "," + (B[3] + (D[3] - B[3]) * (1 - d)) : "") +
                ")"))
            : (d = h.input || "none");
          return d;
        };
        h.names = {
          white: "#ffffff",
          black: "#000000",
        };
        return h;
      })();
      d.Color = h;
      d.color = h.parse;
      return h;
    }
  );
  Q(d, "Core/Color/Palette.js", [], function () {
    return {
      colors:
        "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
          " "
        ),
      backgroundColor: "#ffffff",
      neutralColor100: "#000000",
      neutralColor80: "#333333",
      neutralColor60: "#666666",
      neutralColor40: "#999999",
      neutralColor20: "#cccccc",
      neutralColor10: "#e6e6e6",
      neutralColor5: "#f2f2f2",
      neutralColor3: "#f7f7f7",
      highlightColor100: "#003399",
      highlightColor80: "#335cad",
      highlightColor60: "#6685c2",
      highlightColor20: "#ccd6eb",
      highlightColor10: "#e6ebf5",
      positiveColor: "#06b535",
      negativeColor: "#f21313",
    };
  });
  Q(
    d,
    "Core/Time.js",
    [d["Core/Globals.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = d.win,
        F = h.defined,
        J = h.error,
        M = h.extend,
        G = h.isObject,
        I = h.merge,
        D = h.objectEach,
        B = h.pad,
        u = h.pick,
        c = h.splat,
        a = h.timeUnits;
      ("");
      h = (function () {
        function r(a) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = N.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(a);
        }
        r.prototype.get = function (a, p) {
          if (this.variableTimezone || this.timezoneOffset) {
            var y = p.getTime(),
              k = y - this.getTimezoneOffset(p);
            p.setTime(k);
            a = p["getUTC" + a]();
            p.setTime(y);
            return a;
          }
          return this.useUTC ? p["getUTC" + a]() : p["get" + a]();
        };
        r.prototype.set = function (a, p, c) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              "Milliseconds" === a ||
              "Seconds" === a ||
              ("Minutes" === a && 0 === this.getTimezoneOffset(p) % 36e5)
            )
              return p["setUTC" + a](c);
            var k = this.getTimezoneOffset(p);
            k = p.getTime() - k;
            p.setTime(k);
            p["setUTC" + a](c);
            a = this.getTimezoneOffset(p);
            k = p.getTime() + a;
            return p.setTime(k);
          }
          return this.useUTC ? p["setUTC" + a](c) : p["set" + a](c);
        };
        r.prototype.update = function (a) {
          var p = u(a && a.useUTC, !0);
          this.options = a = I(!0, this.options || {}, a);
          this.Date = a.Date || N.Date || Date;
          this.timezoneOffset = (this.useUTC = p) && a.timezoneOffset;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = p && !(!a.getTimezoneOffset && !a.timezone);
        };
        r.prototype.makeTime = function (a, p, c, k, m, L) {
          if (this.useUTC) {
            var A = this.Date.UTC.apply(0, arguments);
            var t = this.getTimezoneOffset(A);
            A += t;
            var f = this.getTimezoneOffset(A);
            t !== f
              ? (A += f - t)
              : t - 36e5 !== this.getTimezoneOffset(A - 36e5) ||
                d.isSafari ||
                (A -= 36e5);
          } else
            A = new this.Date(
              a,
              p,
              u(c, 1),
              u(k, 0),
              u(m, 0),
              u(L, 0)
            ).getTime();
          return A;
        };
        r.prototype.timezoneOffsetFunction = function () {
          var a = this,
            p = this.options,
            c = p.moment || N.moment;
          if (!this.useUTC)
            return function (a) {
              return 6e4 * new Date(a.toString()).getTimezoneOffset();
            };
          if (p.timezone) {
            if (c)
              return function (a) {
                return 6e4 * -c.tz(a, p.timezone).utcOffset();
              };
            J(25);
          }
          return this.useUTC && p.getTimezoneOffset
            ? function (a) {
                return 6e4 * p.getTimezoneOffset(a.valueOf());
              }
            : function () {
                return 6e4 * (a.timezoneOffset || 0);
              };
        };
        r.prototype.dateFormat = function (a, p, c) {
          if (!F(p) || isNaN(p))
            return (
              (d.defaultOptions.lang && d.defaultOptions.lang.invalidDate) || ""
            );
          a = u(a, "%Y-%m-%d %H:%M:%S");
          var k = this,
            m = new this.Date(p),
            L = this.get("Hours", m),
            A = this.get("Day", m),
            t = this.get("Date", m),
            f = this.get("Month", m),
            v = this.get("FullYear", m),
            b = d.defaultOptions.lang,
            E = b && b.weekdays,
            P = b && b.shortWeekdays;
          m = M(
            {
              a: P ? P[A] : E[A].substr(0, 3),
              A: E[A],
              d: B(t),
              e: B(t, 2, " "),
              w: A,
              b: b.shortMonths[f],
              B: b.months[f],
              m: B(f + 1),
              o: f + 1,
              y: v.toString().substr(2, 2),
              Y: v,
              H: B(L),
              k: L,
              I: B(L % 12 || 12),
              l: L % 12 || 12,
              M: B(this.get("Minutes", m)),
              p: 12 > L ? "AM" : "PM",
              P: 12 > L ? "am" : "pm",
              S: B(m.getSeconds()),
              L: B(Math.floor(p % 1e3), 3),
            },
            d.dateFormats
          );
          D(m, function (b, g) {
            for (; -1 !== a.indexOf("%" + g); )
              a = a.replace(
                "%" + g,
                "function" === typeof b ? b.call(k, p) : b
              );
          });
          return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
        };
        r.prototype.resolveDTLFormat = function (a) {
          return G(a, !0)
            ? a
            : ((a = c(a)),
              {
                main: a[0],
                from: a[1],
                to: a[2],
              });
        };
        r.prototype.getTimeTicks = function (c, p, r, k) {
          var m = this,
            L = [],
            A = {};
          var t = new m.Date(p);
          var f = c.unitRange,
            v = c.count || 1,
            b;
          k = u(k, 1);
          if (F(p)) {
            m.set(
              "Milliseconds",
              t,
              f >= a.second ? 0 : v * Math.floor(m.get("Milliseconds", t) / v)
            );
            f >= a.second &&
              m.set(
                "Seconds",
                t,
                f >= a.minute ? 0 : v * Math.floor(m.get("Seconds", t) / v)
              );
            f >= a.minute &&
              m.set(
                "Minutes",
                t,
                f >= a.hour ? 0 : v * Math.floor(m.get("Minutes", t) / v)
              );
            f >= a.hour &&
              m.set(
                "Hours",
                t,
                f >= a.day ? 0 : v * Math.floor(m.get("Hours", t) / v)
              );
            f >= a.day &&
              m.set(
                "Date",
                t,
                f >= a.month
                  ? 1
                  : Math.max(1, v * Math.floor(m.get("Date", t) / v))
              );
            if (f >= a.month) {
              m.set(
                "Month",
                t,
                f >= a.year ? 0 : v * Math.floor(m.get("Month", t) / v)
              );
              var E = m.get("FullYear", t);
            }
            f >= a.year && m.set("FullYear", t, E - (E % v));
            f === a.week &&
              ((E = m.get("Day", t)),
              m.set("Date", t, m.get("Date", t) - E + k + (E < k ? -7 : 0)));
            E = m.get("FullYear", t);
            k = m.get("Month", t);
            var P = m.get("Date", t),
              H = m.get("Hours", t);
            p = t.getTime();
            (!m.variableTimezone && m.useUTC) ||
              !F(r) ||
              (b =
                r - p > 4 * a.month ||
                m.getTimezoneOffset(p) !== m.getTimezoneOffset(r));
            p = t.getTime();
            for (t = 1; p < r; )
              L.push(p),
                (p =
                  f === a.year
                    ? m.makeTime(E + t * v, 0)
                    : f === a.month
                    ? m.makeTime(E, k + t * v)
                    : !b || (f !== a.day && f !== a.week)
                    ? b && f === a.hour && 1 < v
                      ? m.makeTime(E, k, P, H + t * v)
                      : p + f * v
                    : m.makeTime(E, k, P + t * v * (f === a.day ? 1 : 7))),
                t++;
            L.push(p);
            f <= a.hour &&
              1e4 > L.length &&
              L.forEach(function (b) {
                0 === b % 18e5 &&
                  "000000000" === m.dateFormat("%H%M%S%L", b) &&
                  (A[b] = "day");
              });
          }
          L.info = M(c, {
            higherRanks: A,
            totalRange: f * v,
          });
          return L;
        };
        return r;
      })();
      d.Time = h;
      return d.Time;
    }
  );
  Q(
    d,
    "Core/Options.js",
    [
      d["Core/Globals.js"],
      d["Core/Color/Color.js"],
      d["Core/Color/Palette.js"],
      d["Core/Time.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J) {
      var N = d.isTouchDevice,
        G = d.svg;
      h = h.parse;
      var I = J.merge;
      ("");
      var D = {
        colors: K.colors,
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
          loading: "Loading...",
          months:
            "January February March April May June July August September October November December".split(
              " "
            ),
          shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
            " "
          ),
          weekdays:
            "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
              " "
            ),
          decimalPoint: ".",
          numericSymbols: "kMGTPE".split(""),
          resetZoom: "Reset zoom",
          resetZoomTitle: "Reset zoom level 1:1",
          thousandsSep: " ",
        },
        global: {},
        time: {
          Date: void 0,
          getTimezoneOffset: void 0,
          timezone: void 0,
          timezoneOffset: 0,
          useUTC: !0,
        },
        chart: {
          panning: {
            enabled: !1,
            type: "x",
          },
          styledMode: !1,
          borderRadius: 0,
          colorCount: 10,
          defaultSeriesType: "line",
          ignoreHiddenSeries: !0,
          spacing: [10, 10, 15, 10],
          resetZoomButton: {
            theme: {
              zIndex: 6,
            },
            position: {
              align: "right",
              x: -10,
              y: 10,
            },
          },
          zoomBySingleTouch: !1,
          width: null,
          height: null,
          borderColor: K.highlightColor80,
          backgroundColor: K.backgroundColor,
          plotBorderColor: K.neutralColor20,
        },
        title: {
          text: "Chart title",
          align: "center",
          margin: 15,
          widthAdjust: -44,
        },
        subtitle: {
          text: "",
          align: "center",
          widthAdjust: -44,
        },
        caption: {
          margin: 15,
          text: "",
          align: "left",
          verticalAlign: "bottom",
        },
        plotOptions: {},
        labels: {
          style: {
            position: "absolute",
            color: K.neutralColor80,
          },
        },
        legend: {
          enabled: !0,
          align: "center",
          alignColumns: !0,
          layout: "horizontal",
          labelFormatter: function () {
            return this.name;
          },
          borderColor: K.neutralColor40,
          borderRadius: 0,
          navigation: {
            activeColor: K.highlightColor100,
            inactiveColor: K.neutralColor20,
          },
          itemStyle: {
            color: K.neutralColor80,
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            textOverflow: "ellipsis",
          },
          itemHoverStyle: {
            color: K.neutralColor100,
          },
          itemHiddenStyle: {
            color: K.neutralColor20,
          },
          shadow: !1,
          itemCheckboxStyle: {
            position: "absolute",
            width: "13px",
            height: "13px",
          },
          squareSymbol: !0,
          symbolPadding: 5,
          verticalAlign: "bottom",
          x: 0,
          y: 0,
          title: {
            style: {
              fontWeight: "bold",
            },
          },
        },
        loading: {
          labelStyle: {
            fontWeight: "bold",
            position: "relative",
            top: "45%",
          },
          style: {
            position: "absolute",
            backgroundColor: K.backgroundColor,
            opacity: 0.5,
            textAlign: "center",
          },
        },
        tooltip: {
          enabled: !0,
          animation: G,
          borderRadius: 3,
          dateTimeLabelFormats: {
            millisecond: "%A, %b %e, %H:%M:%S.%L",
            second: "%A, %b %e, %H:%M:%S",
            minute: "%A, %b %e, %H:%M",
            hour: "%A, %b %e, %H:%M",
            day: "%A, %b %e, %Y",
            week: "Week from %A, %b %e, %Y",
            month: "%B %Y",
            year: "%Y",
          },
          footerFormat: "",
          padding: 8,
          snap: N ? 25 : 10,
          headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
          pointFormat:
            '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
          backgroundColor: h(K.neutralColor3).setOpacity(0.85).get(),
          borderWidth: 1,
          shadow: !0,
          style: {
            color: K.neutralColor80,
            cursor: "default",
            fontSize: "12px",
            whiteSpace: "nowrap",
          },
        },
        credits: {
          enabled: !0,
          href: "https://www.highcharts.com?credits",
          position: {
            align: "right",
            x: -10,
            verticalAlign: "bottom",
            y: -5,
          },
          style: {
            cursor: "pointer",
            color: K.neutralColor40,
            fontSize: "9px",
          },
          text: "Highcharts.com",
        },
      };
      D.chart.styledMode = !1;
      ("");
      var B = new F(I(D.global, D.time));
      return {
        defaultOptions: D,
        defaultTime: B,
        getOptions: function () {
          return D;
        },
        setOptions: function (u) {
          I(!0, D, u);
          if (u.time || u.global)
            d.time
              ? d.time.update(I(D.global, D.time, u.global, u.time))
              : (d.time = B);
          return D;
        },
      };
    }
  );
  Q(
    d,
    "Core/Animation/Fx.js",
    [d["Core/Color/Color.js"], d["Core/Globals.js"], d["Core/Utilities.js"]],
    function (d, h, K) {
      var N = d.parse,
        J = h.win,
        M = K.isNumber,
        G = K.objectEach;
      return (function () {
        function h(h, B, u) {
          this.pos = NaN;
          this.options = B;
          this.elem = h;
          this.prop = u;
        }
        h.prototype.dSetter = function () {
          var h = this.paths,
            B = h && h[0];
          h = h && h[1];
          var u = this.now || 0,
            c = [];
          if (1 !== u && B && h)
            if (B.length === h.length && 1 > u)
              for (var a = 0; a < h.length; a++) {
                for (var r = B[a], y = h[a], p = [], O = 0; O < y.length; O++) {
                  var k = r[O],
                    m = y[O];
                  M(k) && M(m) && ("A" !== y[0] || (4 !== O && 5 !== O))
                    ? (p[O] = k + u * (m - k))
                    : (p[O] = m);
                }
                c.push(p);
              }
            else c = h;
          else c = this.toD || [];
          this.elem.attr("d", c, void 0, !0);
        };
        h.prototype.update = function () {
          var h = this.elem,
            B = this.prop,
            u = this.now,
            c = this.options.step;
          if (this[B + "Setter"]) this[B + "Setter"]();
          else
            h.attr
              ? h.element && h.attr(B, u, null, !0)
              : (h.style[B] = u + this.unit);
          c && c.call(h, u, this);
        };
        h.prototype.run = function (d, B, u) {
          var c = this,
            a = c.options,
            r = function (a) {
              return r.stopped ? !1 : c.step(a);
            },
            y =
              J.requestAnimationFrame ||
              function (a) {
                setTimeout(a, 13);
              },
            p = function () {
              for (var a = 0; a < h.timers.length; a++)
                h.timers[a]() || h.timers.splice(a--, 1);
              h.timers.length && y(p);
            };
          d !== B || this.elem["forceAnimate:" + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = d),
              (this.end = B),
              (this.unit = u),
              (this.now = this.start),
              (this.pos = 0),
              (r.elem = this.elem),
              (r.prop = this.prop),
              r() && 1 === h.timers.push(r) && y(p))
            : (delete a.curAnim[this.prop],
              a.complete &&
                0 === Object.keys(a.curAnim).length &&
                a.complete.call(this.elem));
        };
        h.prototype.step = function (h) {
          var B = +new Date(),
            u = this.options,
            c = this.elem,
            a = u.complete,
            r = u.duration,
            y = u.curAnim;
          if (c.attr && !c.element) h = !1;
          else if (h || B >= r + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var p = (y[this.prop] = !0);
            G(y, function (a) {
              !0 !== a && (p = !1);
            });
            p && a && a.call(c);
            h = !1;
          } else
            (this.pos = u.easing((B - this.startTime) / r)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (h = !0);
          return h;
        };
        h.prototype.initPath = function (h, B, u) {
          function c(a, k) {
            for (; a.length < L; ) {
              var f = a[0],
                v = k[L - a.length];
              v &&
                "M" === f[0] &&
                (a[0] =
                  "C" === v[0]
                    ? ["C", f[1], f[2], f[1], f[2], f[1], f[2]]
                    : ["L", f[1], f[2]]);
              a.unshift(f);
              p && ((f = a.pop()), a.push(a[a.length - 1], f));
            }
          }
          function a(a, k) {
            for (; a.length < L; )
              if (
                ((k = a[Math.floor(a.length / O) - 1].slice()),
                "C" === k[0] && ((k[1] = k[5]), (k[2] = k[6])),
                p)
              ) {
                var f = a[Math.floor(a.length / O)].slice();
                a.splice(a.length / 2, 0, k, f);
              } else a.push(k);
          }
          var r = h.startX,
            y = h.endX;
          u = u.slice();
          var p = h.isArea,
            O = p ? 2 : 1;
          B = B && B.slice();
          if (!B) return [u, u];
          if (r && y && y.length) {
            for (h = 0; h < r.length; h++)
              if (r[h] === y[0]) {
                var k = h;
                break;
              } else if (r[0] === y[y.length - r.length + h]) {
                k = h;
                var m = !0;
                break;
              } else if (r[r.length - 1] === y[y.length - r.length + h]) {
                k = r.length - h;
                break;
              }
            "undefined" === typeof k && (B = []);
          }
          if (B.length && M(k)) {
            var L = u.length + k * O;
            m ? (c(B, u), a(u, B)) : (c(u, B), a(B, u));
          }
          return [B, u];
        };
        h.prototype.fillSetter = function () {
          h.prototype.strokeSetter.apply(this, arguments);
        };
        h.prototype.strokeSetter = function () {
          this.elem.attr(
            this.prop,
            N(this.start).tweenTo(N(this.end), this.pos),
            null,
            !0
          );
        };
        h.timers = [];
        return h;
      })();
    }
  );
  Q(
    d,
    "Core/Animation/AnimationUtilities.js",
    [d["Core/Animation/Fx.js"], d["Core/Utilities.js"]],
    function (d, h) {
      function N(a) {
        return D(a)
          ? B(
              {
                duration: 500,
                defer: 0,
              },
              a
            )
          : {
              duration: a ? 500 : 0,
              defer: 0,
            };
      }
      function F(a, c) {
        for (var r = d.timers.length; r--; )
          d.timers[r].elem !== a ||
            (c && c !== d.timers[r].prop) ||
            (d.timers[r].stopped = !0);
      }
      var J = h.defined,
        M = h.getStyle,
        G = h.isArray,
        I = h.isNumber,
        D = h.isObject,
        B = h.merge,
        u = h.objectEach,
        c = h.pick;
      return {
        animate: function (a, c, y) {
          var p,
            r = "",
            k,
            m;
          if (!D(y)) {
            var L = arguments;
            y = {
              duration: L[2],
              easing: L[3],
              complete: L[4],
            };
          }
          I(y.duration) || (y.duration = 400);
          y.easing =
            "function" === typeof y.easing
              ? y.easing
              : Math[y.easing] || Math.easeInOutSine;
          y.curAnim = B(c);
          u(c, function (A, t) {
            F(a, t);
            m = new d(a, y, t);
            k = void 0;
            "d" === t && G(c.d)
              ? ((m.paths = m.initPath(a, a.pathArray, c.d)),
                (m.toD = c.d),
                (p = 0),
                (k = 1))
              : a.attr
              ? (p = a.attr(t))
              : ((p = parseFloat(M(a, t)) || 0), "opacity" !== t && (r = "px"));
            k || (k = A);
            "string" === typeof k &&
              k.match("px") &&
              (k = k.replace(/px/g, ""));
            m.run(p, k, r);
          });
        },
        animObject: N,
        getDeferredAnimation: function (a, c, y) {
          var p = N(c),
            r = 0,
            k = 0;
          (y ? [y] : a.series).forEach(function (a) {
            a = N(a.options.animation);
            r = c && J(c.defer) ? p.defer : Math.max(r, a.duration + a.defer);
            k = Math.min(p.duration, a.duration);
          });
          a.renderer.forExport && (r = 0);
          return {
            defer: Math.max(0, r - k),
            duration: Math.min(r, k),
          };
        },
        setAnimation: function (a, r) {
          r.renderer.globalAnimation = c(a, r.options.chart.animation, !0);
        },
        stop: F,
      };
    }
  );
  Q(
    d,
    "Core/Renderer/HTML/AST.js",
    [d["Core/Globals.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = d.SVG_NS,
        F = h.attr,
        J = h.createElement,
        M = h.discardElement,
        G = h.error,
        I = h.isString,
        D = h.objectEach,
        B = h.splat;
      ("");
      var u = !1;
      try {
        u = !!new DOMParser().parseFromString("", "text/html");
      } catch (c) {}
      return (function () {
        function c(a) {
          this.nodes = "string" === typeof a ? this.parseMarkup(a) : a;
        }
        c.filterUserAttributes = function (a) {
          D(a, function (r, y) {
            var p = !0;
            -1 === c.allowedAttributes.indexOf(y) && (p = !1);
            -1 !==
              ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(y) &&
              (p =
                I(r) &&
                c.allowedReferences.some(function (a) {
                  return 0 === r.indexOf(a);
                }));
            p ||
              (G("Highcharts warning: Invalid attribute '" + y + "' in config"),
              delete a[y]);
          });
          return a;
        };
        c.setElementHTML = function (a, r) {
          a.innerHTML = "";
          r && new c(r).addToDOM(a);
        };
        c.prototype.addToDOM = function (a) {
          function r(a, p) {
            var y;
            B(a).forEach(function (a) {
              var k = a.tagName,
                L = a.textContent
                  ? d.doc.createTextNode(a.textContent)
                  : void 0;
              if (k)
                if ("#text" === k) var A = L;
                else if (-1 !== c.allowedTags.indexOf(k)) {
                  k = d.doc.createElementNS(
                    "svg" === k ? N : p.namespaceURI || N,
                    k
                  );
                  var t = a.attributes || {};
                  D(a, function (f, a) {
                    "tagName" !== a &&
                      "attributes" !== a &&
                      "children" !== a &&
                      "textContent" !== a &&
                      (t[a] = f);
                  });
                  F(k, c.filterUserAttributes(t));
                  L && k.appendChild(L);
                  r(a.children || [], k);
                  A = k;
                } else
                  G(
                    "Highcharts warning: Invalid tagName '" + k + "' in config"
                  );
              A && p.appendChild(A);
              y = A;
            });
            return y;
          }
          return r(this.nodes, a);
        };
        c.prototype.parseMarkup = function (a) {
          var c = [];
          if (u) a = new DOMParser().parseFromString(a, "text/html");
          else {
            var y = J("div");
            y.innerHTML = a;
            a = {
              body: y,
            };
          }
          var p = function (a, k) {
            var m = a.nodeName.toLowerCase(),
              c = {
                tagName: m,
              };
            if ("#text" === m) {
              m = a.textContent || "";
              if (/^[\s]*$/.test(m)) return;
              c.textContent = m;
            }
            if ((m = a.attributes)) {
              var A = {};
              [].forEach.call(m, function (a) {
                A[a.name] = a.value;
              });
              c.attributes = A;
            }
            if (a.childNodes.length) {
              var t = [];
              [].forEach.call(a.childNodes, function (a) {
                p(a, t);
              });
              t.length && (c.children = t);
            }
            k.push(c);
          };
          [].forEach.call(a.body.childNodes, function (a) {
            return p(a, c);
          });
          y && M(y);
          return c;
        };
        c.allowedTags =
          "a b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(
            " "
          );
        c.allowedAttributes =
          "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style result rowspan summary target tabindex text-align textAnchor textLength type valign width x x1 x2 y y1 y2 zIndex".split(
            " "
          );
        c.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
        return c;
      })();
    }
  );
  Q(
    d,
    "Core/FormatUtilities.js",
    [d["Core/Options.js"], d["Core/Utilities.js"]],
    function (d, h) {
      function N(B, u, c, a) {
        B = +B || 0;
        u = +u;
        var r = F.lang,
          y = (B.toString().split(".")[1] || "").split("e")[0].length,
          p = B.toString().split("e"),
          O = u;
        if (-1 === u) u = Math.min(y, 20);
        else if (!G(u)) u = 2;
        else if (u && p[1] && 0 > p[1]) {
          var k = u + +p[1];
          0 <= k
            ? ((p[0] = (+p[0]).toExponential(k).split("e")[0]), (u = k))
            : ((p[0] = p[0].split(".")[0] || 0),
              (B = 20 > u ? (p[0] * Math.pow(10, p[1])).toFixed(u) : 0),
              (p[1] = 0));
        }
        k = (
          Math.abs(p[1] ? p[0] : B) + Math.pow(10, -Math.max(u, y) - 1)
        ).toFixed(u);
        y = String(D(k));
        var m = 3 < y.length ? y.length % 3 : 0;
        c = I(c, r.decimalPoint);
        a = I(a, r.thousandsSep);
        B = (0 > B ? "-" : "") + (m ? y.substr(0, m) + a : "");
        B =
          0 > +p[1] && !O
            ? "0"
            : B + y.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + a);
        u && (B += c + k.slice(-u));
        p[1] && 0 !== +B && (B += "e" + p[1]);
        return B;
      }
      var F = d.defaultOptions,
        J = d.defaultTime,
        M = h.getNestedProperty,
        G = h.isNumber,
        I = h.pick,
        D = h.pInt;
      return {
        dateFormat: function (B, u, c) {
          return J.dateFormat(B, u, c);
        },
        format: function (B, u, c) {
          var a = "{",
            r = !1,
            y = /f$/,
            p = /\.([0-9])/,
            O = F.lang,
            k = (c && c.time) || J;
          c = (c && c.numberFormatter) || N;
          for (var m = []; B; ) {
            var L = B.indexOf(a);
            if (-1 === L) break;
            var A = B.slice(0, L);
            if (r) {
              A = A.split(":");
              a = M(A.shift() || "", u);
              if (A.length && "number" === typeof a)
                if (((A = A.join(":")), y.test(A))) {
                  var t = parseInt((A.match(p) || ["", "-1"])[1], 10);
                  null !== a &&
                    (a = c(
                      a,
                      t,
                      O.decimalPoint,
                      -1 < A.indexOf(",") ? O.thousandsSep : ""
                    ));
                } else a = k.dateFormat(A, a);
              m.push(a);
            } else m.push(A);
            B = B.slice(L + 1);
            a = (r = !r) ? "}" : "{";
          }
          m.push(B);
          return m.join("");
        },
        numberFormat: N,
      };
    }
  );
  Q(
    d,
    "Core/Renderer/SVG/SVGElement.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Renderer/HTML/AST.js"],
      d["Core/Color/Color.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M) {
      var G = d.animate,
        I = d.animObject,
        D = d.stop,
        B = F.deg2rad,
        u = F.doc,
        c = F.noop,
        a = F.svg,
        r = F.SVG_NS,
        y = F.win,
        p = M.addEvent,
        O = M.attr,
        k = M.createElement,
        m = M.css,
        L = M.defined,
        A = M.erase,
        t = M.extend,
        f = M.fireEvent,
        v = M.isArray,
        b = M.isFunction,
        E = M.isNumber,
        P = M.isString,
        H = M.merge,
        g = M.objectEach,
        n = M.pick,
        e = M.pInt,
        l = M.syncTimeout,
        C = M.uniqueKey;
      d = (function () {
        function x() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = r;
          this.symbolCustomAttribs =
            "x y width height r start end innerR anchorX anchorY rounded".split(
              " "
            );
        }
        x.prototype._defaultGetter = function (b) {
          b = n(
            this[b + "Value"],
            this[b],
            this.element ? this.element.getAttribute(b) : null,
            0
          );
          /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
          return b;
        };
        x.prototype._defaultSetter = function (b, q, z) {
          z.setAttribute(q, b);
        };
        x.prototype.add = function (b) {
          var q = this.renderer,
            z = this.element;
          b && (this.parentGroup = b);
          this.parentInverted = b && b.inverted;
          "undefined" !== typeof this.textStr &&
            "text" === this.element.nodeName &&
            q.buildText(this);
          this.added = !0;
          if (!b || b.handleZ || this.zIndex) var w = this.zIndexSetter();
          w || (b ? b.element : q.box).appendChild(z);
          if (this.onAdd) this.onAdd();
          return this;
        };
        x.prototype.addClass = function (b, q) {
          var z = q ? "" : this.attr("class") || "";
          b = (b || "")
            .split(/ /g)
            .reduce(
              function (q, b) {
                -1 === z.indexOf(b) && q.push(b);
                return q;
              },
              z ? [z] : []
            )
            .join(" ");
          b !== z && this.attr("class", b);
          return this;
        };
        x.prototype.afterSetters = function () {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        };
        x.prototype.align = function (b, q, z) {
          var g = {},
            w = this.renderer,
            e = w.alignedObjects,
            l,
            a,
            f;
          if (b) {
            if (
              ((this.alignOptions = b), (this.alignByTranslate = q), !z || P(z))
            )
              (this.alignTo = l = z || "renderer"),
                A(e, this),
                e.push(this),
                (z = void 0);
          } else
            (b = this.alignOptions),
              (q = this.alignByTranslate),
              (l = this.alignTo);
          z = n(z, w[l], "scrollablePlotBox" === l ? w.plotBox : void 0, w);
          l = b.align;
          var v = b.verticalAlign;
          w = (z.x || 0) + (b.x || 0);
          e = (z.y || 0) + (b.y || 0);
          "right" === l ? (a = 1) : "center" === l && (a = 2);
          a && (w += (z.width - (b.width || 0)) / a);
          g[q ? "translateX" : "x"] = Math.round(w);
          "bottom" === v ? (f = 1) : "middle" === v && (f = 2);
          f && (e += (z.height - (b.height || 0)) / f);
          g[q ? "translateY" : "y"] = Math.round(e);
          this[this.placed ? "animate" : "attr"](g);
          this.placed = !0;
          this.alignAttr = g;
          return this;
        };
        x.prototype.alignSetter = function (b) {
          var q = {
            left: "start",
            center: "middle",
            right: "end",
          };
          q[b] &&
            ((this.alignValue = b),
            this.element.setAttribute("text-anchor", q[b]));
        };
        x.prototype.animate = function (b, q, z) {
          var e = this,
            w = I(n(q, this.renderer.globalAnimation, !0));
          q = w.defer;
          n(u.hidden, u.msHidden, u.webkitHidden, !1) && (w.duration = 0);
          0 !== w.duration
            ? (z && (w.complete = z),
              l(function () {
                e.element && G(e, b, w);
              }, q))
            : (this.attr(b, void 0, z),
              g(
                b,
                function (q, z) {
                  w.step &&
                    w.step.call(this, q, {
                      prop: z,
                      pos: 1,
                      elem: this,
                    });
                },
                this
              ));
          return this;
        };
        x.prototype.applyTextOutline = function (b) {
          var q = this.element;
          -1 !== b.indexOf("contrast") &&
            (b = b.replace(
              /contrast/g,
              this.renderer.getContrast(q.style.fill)
            ));
          var z = b.split(" ");
          b = z[z.length - 1];
          if ((z = z[0]) && "none" !== z && F.svg) {
            this.fakeTS = !0;
            this.ySetter = this.xSetter;
            z = z.replace(/(^[\d\.]+)(.*?)$/g, function (q, z, b) {
              return 2 * Number(z) + b;
            });
            this.removeTextOutline();
            var g = u.createElementNS(r, "tspan");
            O(g, {
              class: "highcharts-text-outline",
              fill: b,
              stroke: b,
              "stroke-width": z,
              "stroke-linejoin": "round",
            });
            [].forEach.call(q.childNodes, function (q) {
              var z = q.cloneNode(!0);
              z.removeAttribute &&
                ["fill", "stroke", "stroke-width", "stroke"].forEach(function (
                  q
                ) {
                  return z.removeAttribute(q);
                });
              g.appendChild(z);
            });
            var e = u.createElementNS(r, "tspan");
            e.textContent = "\u200b";
            ["x", "y"].forEach(function (z) {
              var b = q.getAttribute(z);
              b && e.setAttribute(z, b);
            });
            g.appendChild(e);
            q.insertBefore(g, q.firstChild);
          }
        };
        x.prototype.attr = function (b, q, z, e) {
          var w = this.element,
            l = this.symbolCustomAttribs,
            a,
            f = this,
            n,
            v;
          if ("string" === typeof b && "undefined" !== typeof q) {
            var C = b;
            b = {};
            b[C] = q;
          }
          "string" === typeof b
            ? (f = (this[b + "Getter"] || this._defaultGetter).call(this, b, w))
            : (g(
                b,
                function (q, z) {
                  n = !1;
                  e || D(this, z);
                  this.symbolName &&
                    -1 !== l.indexOf(z) &&
                    (a || (this.symbolAttr(b), (a = !0)), (n = !0));
                  !this.rotation ||
                    ("x" !== z && "y" !== z) ||
                    (this.doTransform = !0);
                  n ||
                    ((v = this[z + "Setter"] || this._defaultSetter),
                    v.call(this, q, z, w),
                    !this.styledMode &&
                      this.shadows &&
                      /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                        z
                      ) &&
                      this.updateShadows(z, q, v));
                },
                this
              ),
              this.afterSetters());
          z && z.call(this);
          return f;
        };
        x.prototype.clip = function (b) {
          return this.attr(
            "clip-path",
            b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none"
          );
        };
        x.prototype.crisp = function (b, q) {
          q = q || b.strokeWidth || 0;
          var z = (Math.round(q) % 2) / 2;
          b.x = Math.floor(b.x || this.x || 0) + z;
          b.y = Math.floor(b.y || this.y || 0) + z;
          b.width = Math.floor((b.width || this.width || 0) - 2 * z);
          b.height = Math.floor((b.height || this.height || 0) - 2 * z);
          L(b.strokeWidth) && (b.strokeWidth = q);
          return b;
        };
        x.prototype.complexColor = function (b, q, z) {
          var e = this.renderer,
            l,
            a,
            w,
            n,
            x,
            E,
            k,
            t,
            P,
            m,
            p = [],
            c;
          f(
            this.renderer,
            "complexColor",
            {
              args: arguments,
            },
            function () {
              b.radialGradient
                ? (a = "radialGradient")
                : b.linearGradient && (a = "linearGradient");
              if (a) {
                w = b[a];
                x = e.gradients;
                E = b.stops;
                P = z.radialReference;
                v(w) &&
                  (b[a] = w =
                    {
                      x1: w[0],
                      y1: w[1],
                      x2: w[2],
                      y2: w[3],
                      gradientUnits: "userSpaceOnUse",
                    });
                "radialGradient" === a &&
                  P &&
                  !L(w.gradientUnits) &&
                  ((n = w),
                  (w = H(w, e.getRadialAttr(P, n), {
                    gradientUnits: "userSpaceOnUse",
                  })));
                g(w, function (q, b) {
                  "id" !== b && p.push(b, q);
                });
                g(E, function (q) {
                  p.push(q);
                });
                p = p.join(",");
                if (x[p]) m = x[p].attr("id");
                else {
                  w.id = m = C();
                  var f = (x[p] = e.createElement(a).attr(w).add(e.defs));
                  f.radAttr = n;
                  f.stops = [];
                  E.forEach(function (q) {
                    0 === q[1].indexOf("rgba")
                      ? ((l = K.parse(q[1])),
                        (k = l.get("rgb")),
                        (t = l.get("a")))
                      : ((k = q[1]), (t = 1));
                    q = e
                      .createElement("stop")
                      .attr({
                        offset: q[0],
                        "stop-color": k,
                        "stop-opacity": t,
                      })
                      .add(f);
                    f.stops.push(q);
                  });
                }
                c = "url(" + e.url + "#" + m + ")";
                z.setAttribute(q, c);
                z.gradient = p;
                b.toString = function () {
                  return c;
                };
              }
            }
          );
        };
        x.prototype.css = function (b) {
          var q = this.styles,
            z = {},
            l = this.element,
            f = ["textOutline", "textOverflow", "width"],
            w = "",
            n = !q;
          b && b.color && (b.fill = b.color);
          q &&
            g(b, function (b, g) {
              q && q[g] !== b && ((z[g] = b), (n = !0));
            });
          if (n) {
            q && (b = t(q, z));
            if (b)
              if (null === b.width || "auto" === b.width) delete this.textWidth;
              else if ("text" === l.nodeName.toLowerCase() && b.width)
                var v = (this.textWidth = e(b.width));
            this.styles = b;
            v && !a && this.renderer.forExport && delete b.width;
            if (l.namespaceURI === this.SVG_NS) {
              var C = function (b, q) {
                return "-" + q.toLowerCase();
              };
              g(b, function (b, q) {
                -1 === f.indexOf(q) &&
                  (w += q.replace(/([A-Z])/g, C) + ":" + b + ";");
              });
              w && O(l, "style", w);
            } else m(l, b);
            this.added &&
              ("text" === this.element.nodeName &&
                this.renderer.buildText(this),
              b && b.textOutline && this.applyTextOutline(b.textOutline));
          }
          return this;
        };
        x.prototype.dashstyleSetter = function (b) {
          var q = this["stroke-width"];
          "inherit" === q && (q = 1);
          if ((b = b && b.toLowerCase())) {
            var z = b
              .replace("shortdashdotdot", "3,1,1,1,1,1,")
              .replace("shortdashdot", "3,1,1,1")
              .replace("shortdot", "1,1,")
              .replace("shortdash", "3,1,")
              .replace("longdash", "8,3,")
              .replace(/dot/g, "1,3,")
              .replace("dash", "4,3,")
              .replace(/,$/, "")
              .split(",");
            for (b = z.length; b--; ) z[b] = "" + e(z[b]) * n(q, NaN);
            b = z.join(",").replace(/NaN/g, "none");
            this.element.setAttribute("stroke-dasharray", b);
          }
        };
        x.prototype.destroy = function () {
          var b = this,
            q = b.element || {},
            z = b.renderer,
            e = q.ownerSVGElement,
            l = (z.isSVG && "SPAN" === q.nodeName && b.parentGroup) || void 0;
          q.onclick =
            q.onmouseout =
            q.onmouseover =
            q.onmousemove =
            q.point =
              null;
          D(b);
          if (b.clipPath && e) {
            var a = b.clipPath;
            [].forEach.call(
              e.querySelectorAll("[clip-path],[CLIP-PATH]"),
              function (b) {
                -1 < b.getAttribute("clip-path").indexOf(a.element.id) &&
                  b.removeAttribute("clip-path");
              }
            );
            b.clipPath = a.destroy();
          }
          if (b.stops) {
            for (e = 0; e < b.stops.length; e++) b.stops[e].destroy();
            b.stops.length = 0;
            b.stops = void 0;
          }
          b.safeRemoveChild(q);
          for (
            z.styledMode || b.destroyShadows();
            l && l.div && 0 === l.div.childNodes.length;

          )
            (q = l.parentGroup),
              b.safeRemoveChild(l.div),
              delete l.div,
              (l = q);
          b.alignTo && A(z.alignedObjects, b);
          g(b, function (q, z) {
            b[z] && b[z].parentGroup === b && b[z].destroy && b[z].destroy();
            delete b[z];
          });
        };
        x.prototype.destroyShadows = function () {
          (this.shadows || []).forEach(function (b) {
            this.safeRemoveChild(b);
          }, this);
          this.shadows = void 0;
        };
        x.prototype.destroyTextPath = function (b, q) {
          var z = b.getElementsByTagName("text")[0];
          if (z) {
            if (
              (z.removeAttribute("dx"),
              z.removeAttribute("dy"),
              q.element.setAttribute("id", ""),
              this.textPathWrapper && z.getElementsByTagName("textPath").length)
            ) {
              for (b = this.textPathWrapper.element.childNodes; b.length; )
                z.appendChild(b[0]);
              z.removeChild(this.textPathWrapper.element);
            }
          } else if (b.getAttribute("dx") || b.getAttribute("dy"))
            b.removeAttribute("dx"), b.removeAttribute("dy");
          this.textPathWrapper &&
            (this.textPathWrapper = this.textPathWrapper.destroy());
        };
        x.prototype.dSetter = function (b, q, z) {
          v(b) &&
            ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)),
            (this.pathArray = b),
            (b = b.reduce(function (b, q, z) {
              return q && q.join
                ? (z ? b + " " : "") + q.join(" ")
                : (q || "").toString();
            }, "")));
          /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
          this[q] !== b && (z.setAttribute(q, b), (this[q] = b));
        };
        x.prototype.fadeOut = function (b) {
          var q = this;
          q.animate(
            {
              opacity: 0,
            },
            {
              duration: n(b, 150),
              complete: function () {
                q.attr({
                  y: -9999,
                }).hide();
              },
            }
          );
        };
        x.prototype.fillSetter = function (b, q, z) {
          "string" === typeof b
            ? z.setAttribute(q, b)
            : b && this.complexColor(b, q, z);
        };
        x.prototype.getBBox = function (e, q) {
          var z = this.renderer,
            g = this.element,
            l = this.styles,
            a = this.textStr,
            f = z.cache,
            w = z.cacheKeys,
            v = g.namespaceURI === this.SVG_NS;
          q = n(q, this.rotation, 0);
          var C = z.styledMode
              ? g && x.prototype.getStyle.call(g, "font-size")
              : l && l.fontSize,
            E;
          if (L(a)) {
            var k = a.toString();
            -1 === k.indexOf("<") && (k = k.replace(/[0-9]/g, "0"));
            k += [
              "",
              q,
              C,
              this.textWidth,
              l && l.textOverflow,
              l && l.fontWeight,
            ].join();
          }
          k && !e && (E = f[k]);
          if (!E) {
            if (v || z.forExport) {
              try {
                var H =
                  this.fakeTS &&
                  function (b) {
                    var q = g.querySelector(".highcharts-text-outline");
                    q &&
                      m(q, {
                        display: b,
                      });
                  };
                b(H) && H("none");
                E = g.getBBox
                  ? t({}, g.getBBox())
                  : {
                      width: g.offsetWidth,
                      height: g.offsetHeight,
                    };
                b(H) && H("");
              } catch (Z) {
                ("");
              }
              if (!E || 0 > E.width)
                E = {
                  width: 0,
                  height: 0,
                };
            } else E = this.htmlGetBBox();
            z.isSVG &&
              ((e = E.width),
              (z = E.height),
              v &&
                (E.height = z =
                  {
                    "11px,17": 14,
                    "13px,20": 16,
                  }[l && l.fontSize + "," + Math.round(z)] || z),
              q &&
                ((l = q * B),
                (E.width =
                  Math.abs(z * Math.sin(l)) + Math.abs(e * Math.cos(l))),
                (E.height =
                  Math.abs(z * Math.cos(l)) + Math.abs(e * Math.sin(l)))));
            if (k && 0 < E.height) {
              for (; 250 < w.length; ) delete f[w.shift()];
              f[k] || w.push(k);
              f[k] = E;
            }
          }
          return E;
        };
        x.prototype.getStyle = function (b) {
          return y
            .getComputedStyle(this.element || this, "")
            .getPropertyValue(b);
        };
        x.prototype.hasClass = function (b) {
          return -1 !== ("" + this.attr("class")).split(" ").indexOf(b);
        };
        x.prototype.hide = function (b) {
          b
            ? this.attr({
                y: -9999,
              })
            : this.attr({
                visibility: "hidden",
              });
          return this;
        };
        x.prototype.htmlGetBBox = function () {
          return {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
          };
        };
        x.prototype.init = function (b, q) {
          this.element =
            "span" === q ? k(q) : u.createElementNS(this.SVG_NS, q);
          this.renderer = b;
          f(this, "afterInit");
        };
        x.prototype.invert = function (b) {
          this.inverted = b;
          this.updateTransform();
          return this;
        };
        x.prototype.on = function (b, q) {
          var z = this.onEvents;
          if (z[b]) z[b]();
          z[b] = p(this.element, b, q);
          return this;
        };
        x.prototype.opacitySetter = function (b, q, z) {
          this.opacity = b = Number(Number(b).toFixed(3));
          z.setAttribute(q, b);
        };
        x.prototype.removeClass = function (b) {
          return this.attr(
            "class",
            ("" + this.attr("class"))
              .replace(P(b) ? new RegExp("(^| )" + b + "( |$)") : b, " ")
              .replace(/ +/g, " ")
              .trim()
          );
        };
        x.prototype.removeTextOutline = function () {
          var b = this.element.querySelector("tspan.highcharts-text-outline");
          b && this.safeRemoveChild(b);
        };
        x.prototype.safeRemoveChild = function (b) {
          var q = b.parentNode;
          q && q.removeChild(b);
        };
        x.prototype.setRadialReference = function (b) {
          var q =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = b;
          q &&
            q.radAttr &&
            q.animate(this.renderer.getRadialAttr(b, q.radAttr));
          return this;
        };
        x.prototype.setTextPath = function (b, q) {
          var z = this.element,
            e = this.text ? this.text.element : z,
            l = {
              textAnchor: "text-anchor",
            },
            a = !1,
            f = this.textPathWrapper,
            n = !f;
          q = H(
            !0,
            {
              enabled: !0,
              attributes: {
                dy: -5,
                startOffset: "50%",
                textAnchor: "middle",
              },
            },
            q
          );
          var v = h.filterUserAttributes(q.attributes);
          if (b && q && q.enabled) {
            f && null === f.element.parentNode
              ? ((n = !0), (f = f.destroy()))
              : f && this.removeTextOutline.call(f.parentGroup);
            this.options &&
              this.options.padding &&
              (v.dx = -this.options.padding);
            f ||
              ((this.textPathWrapper = f =
                this.renderer.createElement("textPath")),
              (a = !0));
            var w = f.element;
            (q = b.element.getAttribute("id")) ||
              b.element.setAttribute("id", (q = C()));
            if (n)
              for (
                e.setAttribute("y", 0),
                  E(v.dx) && e.setAttribute("x", -v.dx),
                  b = [].slice.call(e.childNodes),
                  n = 0;
                n < b.length;
                n++
              ) {
                var k = b[n];
                (k.nodeType !== Node.TEXT_NODE && "tspan" !== k.nodeName) ||
                  w.appendChild(k);
              }
            a &&
              f &&
              f.add({
                element: e,
              });
            w.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "href",
              this.renderer.url + "#" + q
            );
            L(v.dy) && (w.parentNode.setAttribute("dy", v.dy), delete v.dy);
            L(v.dx) && (w.parentNode.setAttribute("dx", v.dx), delete v.dx);
            g(v, function (b, q) {
              w.setAttribute(l[q] || q, b);
            });
            z.removeAttribute("transform");
            this.removeTextOutline.call(f);
            this.text &&
              !this.renderer.styledMode &&
              this.attr({
                fill: "none",
                "stroke-width": 0,
              });
            this.applyTextOutline = this.updateTransform = c;
          } else
            f &&
              (delete this.updateTransform,
              delete this.applyTextOutline,
              this.destroyTextPath(z, b),
              this.updateTransform(),
              this.options &&
                this.options.rotation &&
                this.applyTextOutline(this.options.style.textOutline));
          return this;
        };
        x.prototype.shadow = function (b, q, z) {
          var e = [],
            l = this.element,
            a = this.oldShadowOptions,
            f = {
              color: J.neutralColor100,
              offsetX: 1,
              offsetY: 1,
              opacity: 0.15,
              width: 3,
            },
            n = !1,
            v;
          !0 === b ? (v = f) : "object" === typeof b && (v = t(f, b));
          v &&
            (v &&
              a &&
              g(v, function (b, q) {
                b !== a[q] && (n = !0);
              }),
            n && this.destroyShadows(),
            (this.oldShadowOptions = v));
          if (!v) this.destroyShadows();
          else if (!this.shadows) {
            var w = v.opacity / v.width;
            var E = this.parentInverted
              ? "translate(-1,-1)"
              : "translate(" + v.offsetX + ", " + v.offsetY + ")";
            for (f = 1; f <= v.width; f++) {
              var k = l.cloneNode(!1);
              var C = 2 * v.width + 1 - 2 * f;
              O(k, {
                stroke: b.color || J.neutralColor100,
                "stroke-opacity": w * f,
                "stroke-width": C,
                transform: E,
                fill: "none",
              });
              k.setAttribute(
                "class",
                (k.getAttribute("class") || "") + " highcharts-shadow"
              );
              z &&
                (O(k, "height", Math.max(O(k, "height") - C, 0)),
                (k.cutHeight = C));
              q
                ? q.element.appendChild(k)
                : l.parentNode && l.parentNode.insertBefore(k, l);
              e.push(k);
            }
            this.shadows = e;
          }
          return this;
        };
        x.prototype.show = function (b) {
          return this.attr({
            visibility: b ? "inherit" : "visible",
          });
        };
        x.prototype.strokeSetter = function (b, q, z) {
          this[q] = b;
          this.stroke && this["stroke-width"]
            ? (x.prototype.fillSetter.call(this, this.stroke, "stroke", z),
              z.setAttribute("stroke-width", this["stroke-width"]),
              (this.hasStroke = !0))
            : "stroke-width" === q && 0 === b && this.hasStroke
            ? (z.removeAttribute("stroke"), (this.hasStroke = !1))
            : this.renderer.styledMode &&
              this["stroke-width"] &&
              (z.setAttribute("stroke-width", this["stroke-width"]),
              (this.hasStroke = !0));
        };
        x.prototype.strokeWidth = function () {
          if (!this.renderer.styledMode) return this["stroke-width"] || 0;
          var b = this.getStyle("stroke-width"),
            q = 0;
          if (b.indexOf("px") === b.length - 2) q = e(b);
          else if ("" !== b) {
            var z = u.createElementNS(r, "rect");
            O(z, {
              width: b,
              "stroke-width": 0,
            });
            this.element.parentNode.appendChild(z);
            q = z.getBBox().width;
            z.parentNode.removeChild(z);
          }
          return q;
        };
        x.prototype.symbolAttr = function (b) {
          var q = this;
          "x y r start end width height innerR anchorX anchorY clockwise"
            .split(" ")
            .forEach(function (z) {
              q[z] = n(b[z], q[z]);
            });
          q.attr({
            d: q.renderer.symbols[q.symbolName](q.x, q.y, q.width, q.height, q),
          });
        };
        x.prototype.textSetter = function (b) {
          b !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = b),
            this.added && this.renderer.buildText(this));
        };
        x.prototype.titleSetter = function (b) {
          var q = this.element,
            z =
              q.getElementsByTagName("title")[0] ||
              u.createElementNS(this.SVG_NS, "title");
          q.insertBefore ? q.insertBefore(z, q.firstChild) : q.appendChild(z);
          z.textContent = String(n(b, ""))
            .replace(/<[^>]*>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        };
        x.prototype.toFront = function () {
          var b = this.element;
          b.parentNode.appendChild(b);
          return this;
        };
        x.prototype.translate = function (b, q) {
          return this.attr({
            translateX: b,
            translateY: q,
          });
        };
        x.prototype.updateShadows = function (b, q, z) {
          var e = this.shadows;
          if (e)
            for (var g = e.length; g--; )
              z.call(
                e[g],
                "height" === b
                  ? Math.max(q - (e[g].cutHeight || 0), 0)
                  : "d" === b
                  ? this.d
                  : q,
                b,
                e[g]
              );
        };
        x.prototype.updateTransform = function () {
          var b = this.scaleX,
            q = this.scaleY,
            z = this.inverted,
            e = this.rotation,
            g = this.matrix,
            l = this.element,
            a = this.translateX || 0,
            f = this.translateY || 0;
          z && ((a += this.width), (f += this.height));
          a = ["translate(" + a + "," + f + ")"];
          L(g) && a.push("matrix(" + g.join(",") + ")");
          z
            ? a.push("rotate(90) scale(-1,1)")
            : e &&
              a.push(
                "rotate(" +
                  e +
                  " " +
                  n(this.rotationOriginX, l.getAttribute("x"), 0) +
                  " " +
                  n(this.rotationOriginY, l.getAttribute("y") || 0) +
                  ")"
              );
          (L(b) || L(q)) && a.push("scale(" + n(b, 1) + " " + n(q, 1) + ")");
          a.length && l.setAttribute("transform", a.join(" "));
        };
        x.prototype.visibilitySetter = function (b, q, z) {
          "inherit" === b
            ? z.removeAttribute(q)
            : this[q] !== b && z.setAttribute(q, b);
          this[q] = b;
        };
        x.prototype.xGetter = function (b) {
          "circle" === this.element.nodeName &&
            ("x" === b ? (b = "cx") : "y" === b && (b = "cy"));
          return this._defaultGetter(b);
        };
        x.prototype.zIndexSetter = function (b, q) {
          var z = this.renderer,
            g = this.parentGroup,
            l = (g || z).element || z.box,
            a = this.element;
          z = l === z.box;
          var f = !1;
          var n = this.added;
          var v;
          L(b)
            ? (a.setAttribute("data-z-index", b),
              (b = +b),
              this[q] === b && (n = !1))
            : L(this[q]) && a.removeAttribute("data-z-index");
          this[q] = b;
          if (n) {
            (b = this.zIndex) && g && (g.handleZ = !0);
            q = l.childNodes;
            for (v = q.length - 1; 0 <= v && !f; v--) {
              g = q[v];
              n = g.getAttribute("data-z-index");
              var k = !L(n);
              if (g !== a)
                if (0 > b && k && !z && !v) l.insertBefore(a, q[v]), (f = !0);
                else if (e(n) <= b || (k && (!L(b) || 0 <= b)))
                  l.insertBefore(a, q[v + 1] || null), (f = !0);
            }
            f || (l.insertBefore(a, q[z ? 3 : 0] || null), (f = !0));
          }
          return f;
        };
        return x;
      })();
      d.prototype["stroke-widthSetter"] = d.prototype.strokeSetter;
      d.prototype.yGetter = d.prototype.xGetter;
      d.prototype.matrixSetter =
        d.prototype.rotationOriginXSetter =
        d.prototype.rotationOriginYSetter =
        d.prototype.rotationSetter =
        d.prototype.scaleXSetter =
        d.prototype.scaleYSetter =
        d.prototype.translateXSetter =
        d.prototype.translateYSetter =
        d.prototype.verticalAlignSetter =
          function (b, e) {
            this[e] = b;
            this.doTransform = !0;
          };
      ("");
      return d;
    }
  );
  Q(
    d,
    "Core/Renderer/SVG/SVGLabel.js",
    [d["Core/Renderer/SVG/SVGElement.js"], d["Core/Utilities.js"]],
    function (d, h) {
      function N(u, c) {
        G(u)
          ? u !== this[c] && ((this[c] = u), this.updateTextPadding())
          : (this[c] = void 0);
      }
      var F =
          (this && this.__extends) ||
          (function () {
            var u = function (c, a) {
              u =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var p in c) c.hasOwnProperty(p) && (a[p] = c[p]);
                };
              return u(c, a);
            };
            return function (c, a) {
              function r() {
                this.constructor = c;
              }
              u(c, a);
              c.prototype =
                null === a
                  ? Object.create(a)
                  : ((r.prototype = a.prototype), new r());
            };
          })(),
        J = h.defined,
        M = h.extend,
        G = h.isNumber,
        I = h.merge,
        D = h.pick,
        B = h.removeEvent;
      return (function (u) {
        function c(a, r, y, p, O, k, m, L, A, t) {
          var f = u.call(this) || this;
          f.paddingSetter = N;
          f.paddingLeftSetter = N;
          f.paddingRightSetter = N;
          f.init(a, "g");
          f.textStr = r;
          f.x = y;
          f.y = p;
          f.anchorX = k;
          f.anchorY = m;
          f.baseline = A;
          f.className = t;
          "button" !== t && f.addClass("highcharts-label");
          t && f.addClass("highcharts-" + t);
          f.text = a.text("", 0, 0, L).attr({
            zIndex: 1,
          });
          if ("string" === typeof O) {
            var v = /^url\((.*?)\)$/.test(O);
            if (f.renderer.symbols[O] || v) f.symbolKey = O;
          }
          f.bBox = c.emptyBBox;
          f.padding = 3;
          f.baselineOffset = 0;
          f.needsBox = a.styledMode || v;
          f.deferredAttr = {};
          f.alignFactor = 0;
          return f;
        }
        F(c, u);
        c.prototype.alignSetter = function (a) {
          a = {
            left: 0,
            center: 0.5,
            right: 1,
          }[a];
          a !== this.alignFactor &&
            ((this.alignFactor = a),
            this.bBox &&
              G(this.xSetting) &&
              this.attr({
                x: this.xSetting,
              }));
        };
        c.prototype.anchorXSetter = function (a, c) {
          this.anchorX = a;
          this.boxAttr(
            c,
            Math.round(a) - this.getCrispAdjust() - this.xSetting
          );
        };
        c.prototype.anchorYSetter = function (a, c) {
          this.anchorY = a;
          this.boxAttr(c, a - this.ySetting);
        };
        c.prototype.boxAttr = function (a, c) {
          this.box ? this.box.attr(a, c) : (this.deferredAttr[a] = c);
        };
        c.prototype.css = function (a) {
          if (a) {
            var r = {},
              y = void 0;
            a = I(a);
            c.textProps.forEach(function (c) {
              "undefined" !== typeof a[c] && ((r[c] = a[c]), delete a[c]);
            });
            this.text.css(r);
            y = "width" in r;
            "fontSize" in r || "fontWeight" in r
              ? this.updateTextPadding()
              : y && this.updateBoxSize();
          }
          return d.prototype.css.call(this, a);
        };
        c.prototype.destroy = function () {
          B(this.element, "mouseenter");
          B(this.element, "mouseleave");
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          d.prototype.destroy.call(this);
        };
        c.prototype.fillSetter = function (a, c) {
          a && (this.needsBox = !0);
          this.fill = a;
          this.boxAttr(c, a);
        };
        c.prototype.getBBox = function () {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          var a = this.padding,
            c = D(this.paddingLeft, a);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - c,
            y: this.bBox.y - a,
          };
        };
        c.prototype.getCrispAdjust = function () {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                2) /
                2;
        };
        c.prototype.heightSetter = function (a) {
          this.heightSetting = a;
        };
        c.prototype.on = function (a, c) {
          var r = this,
            p = r.text,
            O = p && "SPAN" === p.element.tagName ? p : void 0;
          if (O) {
            var k = function (k) {
              (("mouseenter" === a || "mouseleave" === a) &&
                k.relatedTarget instanceof Element &&
                (r.element.compareDocumentPosition(k.relatedTarget) &
                  Node.DOCUMENT_POSITION_CONTAINED_BY ||
                  O.element.compareDocumentPosition(k.relatedTarget) &
                    Node.DOCUMENT_POSITION_CONTAINED_BY)) ||
                c.call(r.element, k);
            };
            O.on(a, k);
          }
          d.prototype.on.call(r, a, k || c);
          return r;
        };
        c.prototype.onAdd = function () {
          var a = this.textStr;
          this.text.add(this);
          this.attr({
            text: J(a) ? a : "",
            x: this.x,
            y: this.y,
          });
          this.box &&
            J(this.anchorX) &&
            this.attr({
              anchorX: this.anchorX,
              anchorY: this.anchorY,
            });
        };
        c.prototype.rSetter = function (a, c) {
          this.boxAttr(c, a);
        };
        c.prototype.shadow = function (a) {
          a &&
            !this.renderer.styledMode &&
            (this.updateBoxSize(), this.box && this.box.shadow(a));
          return this;
        };
        c.prototype.strokeSetter = function (a, c) {
          this.stroke = a;
          this.boxAttr(c, a);
        };
        c.prototype["stroke-widthSetter"] = function (a, c) {
          a && (this.needsBox = !0);
          this["stroke-width"] = a;
          this.boxAttr(c, a);
        };
        c.prototype["text-alignSetter"] = function (a) {
          this.textAlign = a;
        };
        c.prototype.textSetter = function (a) {
          "undefined" !== typeof a &&
            this.text.attr({
              text: a,
            });
          this.updateTextPadding();
        };
        c.prototype.updateBoxSize = function () {
          var a = this.text.element.style,
            r = {},
            y = this.padding,
            p = (this.bBox =
              (G(this.widthSetting) &&
                G(this.heightSetting) &&
                !this.textAlign) ||
              !J(this.text.textStr)
                ? c.emptyBBox
                : this.text.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || p.height || 0) + 2 * y;
          this.baselineOffset =
            y +
            Math.min(
              this.renderer.fontMetrics(a && a.fontSize, this.text).b,
              p.height || Infinity
            );
          this.needsBox &&
            (this.box ||
              ((a = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              a.addClass(
                ("button" === this.className ? "" : "highcharts-label-box") +
                  (this.className
                    ? " highcharts-" + this.className + "-box"
                    : "")
              ),
              a.add(this)),
            (a = this.getCrispAdjust()),
            (r.x = a),
            (r.y = (this.baseline ? -this.baselineOffset : 0) + a),
            (r.width = Math.round(this.width)),
            (r.height = Math.round(this.height)),
            this.box.attr(M(r, this.deferredAttr)),
            (this.deferredAttr = {}));
        };
        c.prototype.updateTextPadding = function () {
          var a = this.text;
          this.updateBoxSize();
          var c = this.baseline ? 0 : this.baselineOffset,
            y = D(this.paddingLeft, this.padding);
          J(this.widthSetting) &&
            this.bBox &&
            ("center" === this.textAlign || "right" === this.textAlign) &&
            (y +=
              {
                center: 0.5,
                right: 1,
              }[this.textAlign] *
              (this.widthSetting - this.bBox.width));
          if (y !== a.x || c !== a.y)
            a.attr("x", y),
              a.hasBoxWidthChanged && (this.bBox = a.getBBox(!0)),
              "undefined" !== typeof c && a.attr("y", c);
          a.x = y;
          a.y = c;
        };
        c.prototype.widthSetter = function (a) {
          this.widthSetting = G(a) ? a : void 0;
        };
        c.prototype.getPaddedWidth = function () {
          var a = this.padding,
            c = D(this.paddingLeft, a);
          a = D(this.paddingRight, a);
          return (this.widthSetting || this.bBox.width || 0) + c + a;
        };
        c.prototype.xSetter = function (a) {
          this.x = a;
          this.alignFactor &&
            ((a -= this.alignFactor * this.getPaddedWidth()),
            (this["forceAnimate:x"] = !0));
          this.xSetting = Math.round(a);
          this.attr("translateX", this.xSetting);
        };
        c.prototype.ySetter = function (a) {
          this.ySetting = this.y = Math.round(a);
          this.attr("translateY", this.ySetting);
        };
        c.emptyBBox = {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
        };
        c.textProps =
          "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(
            " "
          );
        return c;
      })(d);
    }
  );
  Q(
    d,
    "Core/Renderer/SVG/TextBuilder.js",
    [
      d["Core/Globals.js"],
      d["Core/Utilities.js"],
      d["Core/Renderer/HTML/AST.js"],
    ],
    function (d, h, K) {
      var N = d.doc,
        J = d.SVG_NS,
        M = h.attr,
        G = h.isString,
        I = h.objectEach,
        D = h.pick;
      return (function () {
        function B(u) {
          var c = u.styles;
          this.renderer = u.renderer;
          this.svgElement = u;
          this.width = u.textWidth;
          this.textLineHeight = c && c.lineHeight;
          this.textOutline = c && c.textOutline;
          this.ellipsis = !(!c || "ellipsis" !== c.textOverflow);
          this.noWrap = !(!c || "nowrap" !== c.whiteSpace);
          this.fontSize = c && c.fontSize;
        }
        B.prototype.buildSVG = function () {
          var u = this.svgElement,
            c = u.element,
            a = u.renderer,
            r = D(u.textStr, "").toString(),
            y = -1 !== r.indexOf("<"),
            p = c.childNodes,
            O = p.length;
          a = this.width && !u.added && a.box;
          var k = /<br.*?>/g;
          var m = [
            r,
            this.ellipsis,
            this.noWrap,
            this.textLineHeight,
            this.textOutline,
            this.fontSize,
            this.width,
          ].join();
          if (m !== u.textCache) {
            u.textCache = m;
            for (delete u.actualWidth; O--; ) c.removeChild(p[O]);
            y ||
            this.ellipsis ||
            this.width ||
            (-1 !== r.indexOf(" ") && (!this.noWrap || k.test(r)))
              ? "" !== r &&
                (a && a.appendChild(c),
                (r = new K(r)),
                this.modifyTree(r.nodes),
                r.addToDOM(u.element),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (c.textContent || "").indexOf("\u2026") &&
                  u.attr(
                    "title",
                    this.unescapeEntities(u.textStr || "", ["&lt;", "&gt;"])
                  ),
                a && a.removeChild(c))
              : c.appendChild(N.createTextNode(this.unescapeEntities(r)));
            G(this.textOutline) &&
              u.applyTextOutline &&
              u.applyTextOutline(this.textOutline);
          }
        };
        B.prototype.modifyDOM = function () {
          var u = this,
            c = this.svgElement,
            a = M(c.element, "x");
          [].forEach.call(
            c.element.querySelectorAll("tspan.highcharts-br"),
            function (c) {
              c.nextSibling &&
                c.previousSibling &&
                M(c, {
                  dy: u.getLineHeight(c.nextSibling),
                  x: a,
                });
            }
          );
          var r = this.width || 0;
          if (r) {
            var y = function (p, k) {
                var m = p.textContent || "",
                  L = m.replace(/([^\^])-/g, "$1- ").split(" "),
                  A =
                    !u.noWrap &&
                    (1 < L.length || 1 < c.element.childNodes.length),
                  t = u.getLineHeight(k),
                  f = 0,
                  v = c.actualWidth;
                if (u.ellipsis)
                  m &&
                    u.truncate(
                      p,
                      m,
                      void 0,
                      0,
                      Math.max(0, r - parseInt(u.fontSize || 12, 10)),
                      function (b, a) {
                        return b.substring(0, a) + "\u2026";
                      }
                    );
                else if (A) {
                  m = [];
                  for (A = []; k.firstChild && k.firstChild !== p; )
                    A.push(k.firstChild), k.removeChild(k.firstChild);
                  for (; L.length; )
                    L.length &&
                      !u.noWrap &&
                      0 < f &&
                      (m.push(p.textContent || ""),
                      (p.textContent = L.join(" ").replace(/- /g, "-"))),
                      u.truncate(
                        p,
                        void 0,
                        L,
                        0 === f ? v || 0 : 0,
                        r,
                        function (b, a) {
                          return L.slice(0, a).join(" ").replace(/- /g, "-");
                        }
                      ),
                      (v = c.actualWidth),
                      f++;
                  A.forEach(function (b) {
                    k.insertBefore(b, p);
                  });
                  m.forEach(function (b) {
                    k.insertBefore(N.createTextNode(b), p);
                    b = N.createElementNS(J, "tspan");
                    b.textContent = "\u200b";
                    M(b, {
                      dy: t,
                      x: a,
                    });
                    k.insertBefore(b, p);
                  });
                }
              },
              p = function (a) {
                [].slice.call(a.childNodes).forEach(function (k) {
                  k.nodeType === Node.TEXT_NODE
                    ? y(k, a)
                    : (-1 !== k.className.baseVal.indexOf("highcharts-br") &&
                        (c.actualWidth = 0),
                      p(k));
                });
              };
            p(c.element);
          }
        };
        B.prototype.getLineHeight = function (u) {
          var c;
          u = u.nodeType === Node.TEXT_NODE ? u.parentElement : u;
          this.renderer.styledMode ||
            (c =
              u && /(px|em)$/.test(u.style.fontSize)
                ? u.style.fontSize
                : this.fontSize || this.renderer.style.fontSize || 12);
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(c, u || this.svgElement.element).h;
        };
        B.prototype.modifyTree = function (u) {
          var c = this,
            a = function (r, y) {
              var p = r.tagName,
                O = c.renderer.styledMode,
                k = r.attributes || {};
              if ("b" === p || "strong" === p)
                O
                  ? (k["class"] = "highcharts-strong")
                  : (k.style = "font-weight:bold;" + (k.style || ""));
              else if ("i" === p || "em" === p)
                O
                  ? (k["class"] = "highcharts-emphasized")
                  : (k.style = "font-style:italic;" + (k.style || ""));
              G(k.style) &&
                (k.style = k.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
              "br" === p &&
                ((k["class"] = "highcharts-br"),
                (r.textContent = "\u200b"),
                (y = u[y + 1]) &&
                  y.textContent &&
                  (y.textContent = y.textContent.replace(/^ +/gm, "")));
              "#text" !== p && "a" !== p && (r.tagName = "tspan");
              r.attributes = k;
              r.children &&
                r.children
                  .filter(function (a) {
                    return "#text" !== a.tagName;
                  })
                  .forEach(a);
            };
          for (
            u.forEach(a);
            u[0] && "tspan" === u[0].tagName && !u[0].children;

          )
            u.splice(0, 1);
        };
        B.prototype.truncate = function (u, c, a, r, y, p) {
          var O = this.svgElement,
            k = O.renderer,
            m = O.rotation,
            L = [],
            A = a ? 1 : 0,
            t = (c || a || "").length,
            f = t,
            v,
            b = function (b, f) {
              f = f || b;
              var g = u.parentNode;
              if (g && "undefined" === typeof L[f])
                if (g.getSubStringLength)
                  try {
                    L[f] = r + g.getSubStringLength(0, a ? f + 1 : f);
                  } catch (n) {
                    ("");
                  }
                else
                  k.getSpanWidth &&
                    ((u.textContent = p(c || a, b)),
                    (L[f] = r + k.getSpanWidth(O, u)));
              return L[f];
            };
          O.rotation = 0;
          var E = b(u.textContent.length);
          if (r + E > y) {
            for (; A <= t; )
              (f = Math.ceil((A + t) / 2)),
                a && (v = p(a, f)),
                (E = b(f, v && v.length - 1)),
                A === t ? (A = t + 1) : E > y ? (t = f - 1) : (A = f);
            0 === t
              ? (u.textContent = "")
              : (c && t === c.length - 1) ||
                (u.textContent = v || p(c || a, f));
          }
          a && a.splice(0, f);
          O.actualWidth = E;
          O.rotation = m;
        };
        B.prototype.unescapeEntities = function (u, c) {
          I(this.renderer.escapes, function (a, r) {
            (c && -1 !== c.indexOf(a)) ||
              (u = u.toString().replace(new RegExp(a, "g"), r));
          });
          return u;
        };
        return B;
      })();
    }
  );
  Q(
    d,
    "Core/Renderer/SVG/SVGRenderer.js",
    [
      d["Core/Color/Color.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Renderer/SVG/SVGLabel.js"],
      d["Core/Renderer/HTML/AST.js"],
      d["Core/Renderer/SVG/TextBuilder.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I) {
      var D = I.addEvent,
        B = I.attr,
        u = I.createElement,
        c = I.css,
        a = I.defined,
        r = I.destroyObjectProperties,
        y = I.extend,
        p = I.isArray,
        O = I.isNumber,
        k = I.isObject,
        m = I.isString,
        L = I.merge,
        A = I.pick,
        t = I.pInt,
        f = I.uniqueKey,
        v = h.charts,
        b = h.deg2rad,
        E = h.doc,
        P = h.isFirefox,
        H = h.isMS,
        g = h.isWebKit,
        n = h.noop,
        e = h.SVG_NS,
        l = h.symbolSizes,
        C = h.win,
        x;
      I = (function () {
        function q(b, q, e, g, l, a, f) {
          this.width =
            this.url =
            this.style =
            this.isSVG =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(b, q, e, g, l, a, f);
        }
        q.prototype.init = function (b, q, e, g, l, a, f) {
          var z = this.createElement("svg").attr({
            version: "1.1",
            class: "highcharts-root",
          });
          f || z.css(this.getStyle(g));
          g = z.element;
          b.appendChild(g);
          B(b, "dir", "ltr");
          -1 === b.innerHTML.indexOf("xmlns") && B(g, "xmlns", this.SVG_NS);
          this.isSVG = !0;
          this.box = g;
          this.boxWrapper = z;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement("desc")
            .add()
            .element.appendChild(
              E.createTextNode("Created with Highcharts 9.1.0")
            );
          this.defs = this.createElement("defs").add();
          this.allowHTML = a;
          this.forExport = l;
          this.styledMode = f;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(q, e, !1);
          var n;
          P &&
            b.getBoundingClientRect &&
            ((q = function () {
              c(b, {
                left: 0,
                top: 0,
              });
              n = b.getBoundingClientRect();
              c(b, {
                left: Math.ceil(n.left) - n.left + "px",
                top: Math.ceil(n.top) - n.top + "px",
              });
            }),
            q(),
            (this.unSubPixelFix = D(C, "resize", q)));
        };
        q.prototype.definition = function (b) {
          return new M([b]).addToDOM(this.defs.element);
        };
        q.prototype.getReferenceURL = function () {
          if ((P || g) && E.getElementsByTagName("base").length) {
            if (!a(x)) {
              var b = f();
              b = new M([
                {
                  tagName: "svg",
                  attributes: {
                    width: 8,
                    height: 8,
                  },
                  children: [
                    {
                      tagName: "defs",
                      children: [
                        {
                          tagName: "clipPath",
                          attributes: {
                            id: b,
                          },
                          children: [
                            {
                              tagName: "rect",
                              attributes: {
                                width: 4,
                                height: 4,
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: "rect",
                      attributes: {
                        id: "hitme",
                        width: 8,
                        height: 8,
                        "clip-path": "url(#" + b + ")",
                        fill: "rgba(0,0,0,0.001)",
                      },
                    },
                  ],
                },
              ]).addToDOM(E.body);
              c(b, {
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9e5,
              });
              var q = E.elementFromPoint(6, 6);
              x = "hitme" === (q && q.id);
              E.body.removeChild(b);
            }
            if (x)
              return C.location.href
                .split("#")[0]
                .replace(/<[^>]*>/g, "")
                .replace(/([\('\)])/g, "\\$1")
                .replace(/ /g, "%20");
          }
          return "";
        };
        q.prototype.getStyle = function (b) {
          return (this.style = y(
            {
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              fontSize: "12px",
            },
            b
          ));
        };
        q.prototype.setStyle = function (b) {
          this.boxWrapper.css(this.getStyle(b));
        };
        q.prototype.isHidden = function () {
          return !this.boxWrapper.getBBox().width;
        };
        q.prototype.destroy = function () {
          var b = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          r(this.gradients || {});
          this.gradients = null;
          b && (this.defs = b.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        };
        q.prototype.createElement = function (b) {
          var q = new this.Element();
          q.init(this, b);
          return q;
        };
        q.prototype.getRadialAttr = function (b, q) {
          return {
            cx: b[0] - b[2] / 2 + (q.cx || 0) * b[2],
            cy: b[1] - b[2] / 2 + (q.cy || 0) * b[2],
            r: (q.r || 0) * b[2],
          };
        };
        q.prototype.buildText = function (b) {
          new G(b).buildSVG();
        };
        q.prototype.getContrast = function (b) {
          b = d.parse(b).rgba;
          b[0] *= 1;
          b[1] *= 1.2;
          b[2] *= 0.5;
          return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF";
        };
        q.prototype.button = function (b, q, g, e, l, a, f, n, v, k) {
          var z = this.label(b, q, g, v, void 0, void 0, k, void 0, "button"),
            E = 0,
            C = this.styledMode,
            x = l ? L(l) : {};
          b = (x && x.style) || {};
          x = M.filterUserAttributes(x);
          z.attr(
            L(
              {
                padding: 8,
                r: 2,
              },
              x
            )
          );
          if (!C) {
            x = L(
              {
                fill: K.neutralColor3,
                stroke: K.neutralColor20,
                "stroke-width": 1,
                style: {
                  color: K.neutralColor80,
                  cursor: "pointer",
                  fontWeight: "normal",
                },
              },
              {
                style: b,
              },
              x
            );
            var R = x.style;
            delete x.style;
            a = L(
              x,
              {
                fill: K.neutralColor10,
              },
              M.filterUserAttributes(a || {})
            );
            var w = a.style;
            delete a.style;
            f = L(
              x,
              {
                fill: K.highlightColor10,
                style: {
                  color: K.neutralColor100,
                  fontWeight: "bold",
                },
              },
              M.filterUserAttributes(f || {})
            );
            var c = f.style;
            delete f.style;
            n = L(
              x,
              {
                style: {
                  color: K.neutralColor20,
                },
              },
              M.filterUserAttributes(n || {})
            );
            var t = n.style;
            delete n.style;
          }
          D(z.element, H ? "mouseover" : "mouseenter", function () {
            3 !== E && z.setState(1);
          });
          D(z.element, H ? "mouseout" : "mouseleave", function () {
            3 !== E && z.setState(E);
          });
          z.setState = function (b) {
            1 !== b && (z.state = E = b);
            z.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              "highcharts-button-" +
                ["normal", "hover", "pressed", "disabled"][b || 0]
            );
            C || z.attr([x, a, f, n][b || 0]).css([R, w, c, t][b || 0]);
          };
          C ||
            z.attr(x).css(
              y(
                {
                  cursor: "default",
                },
                R
              )
            );
          return z
            .on("touchstart", function (b) {
              return b.stopPropagation();
            })
            .on("click", function (b) {
              3 !== E && e.call(z, b);
            });
        };
        q.prototype.crispLine = function (b, q, g) {
          void 0 === g && (g = "round");
          var z = b[0],
            e = b[1];
          z[1] === e[1] && (z[1] = e[1] = Math[g](z[1]) - (q % 2) / 2);
          z[2] === e[2] && (z[2] = e[2] = Math[g](z[2]) + (q % 2) / 2);
          return b;
        };
        q.prototype.path = function (b) {
          var q = this.styledMode
            ? {}
            : {
                fill: "none",
              };
          p(b) ? (q.d = b) : k(b) && y(q, b);
          return this.createElement("path").attr(q);
        };
        q.prototype.circle = function (b, q, g) {
          b = k(b)
            ? b
            : "undefined" === typeof b
            ? {}
            : {
                x: b,
                y: q,
                r: g,
              };
          q = this.createElement("circle");
          q.xSetter = q.ySetter = function (b, q, z) {
            z.setAttribute("c" + q, b);
          };
          return q.attr(b);
        };
        q.prototype.arc = function (b, q, g, e, a, l) {
          k(b)
            ? ((e = b), (q = e.y), (g = e.r), (b = e.x))
            : (e = {
                innerR: e,
                start: a,
                end: l,
              });
          b = this.symbol("arc", b, q, g, g, e);
          b.r = g;
          return b;
        };
        q.prototype.rect = function (b, q, g, e, a, l) {
          a = k(b) ? b.r : a;
          var z = this.createElement("rect");
          b = k(b)
            ? b
            : "undefined" === typeof b
            ? {}
            : {
                x: b,
                y: q,
                width: Math.max(g, 0),
                height: Math.max(e, 0),
              };
          this.styledMode ||
            ("undefined" !== typeof l &&
              ((b["stroke-width"] = l), (b = z.crisp(b))),
            (b.fill = "none"));
          a && (b.r = a);
          z.rSetter = function (b, q, g) {
            z.r = b;
            B(g, {
              rx: b,
              ry: b,
            });
          };
          z.rGetter = function () {
            return z.r || 0;
          };
          return z.attr(b);
        };
        q.prototype.setSize = function (b, q, g) {
          this.width = b;
          this.height = q;
          this.boxWrapper.animate(
            {
              width: b,
              height: q,
            },
            {
              step: function () {
                this.attr({
                  viewBox:
                    "0 0 " + this.attr("width") + " " + this.attr("height"),
                });
              },
              duration: A(g, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        };
        q.prototype.g = function (b) {
          var q = this.createElement("g");
          return b
            ? q.attr({
                class: "highcharts-" + b,
              })
            : q;
        };
        q.prototype.image = function (b, q, g, e, a, l) {
          var z = {
              preserveAspectRatio: "none",
            },
            f = function (b, q) {
              b.setAttributeNS
                ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", q)
                : b.setAttribute("hc-svg-href", q);
            },
            n = function (q) {
              f(v.element, b);
              l.call(v, q);
            };
          1 < arguments.length &&
            y(z, {
              x: q,
              y: g,
              width: e,
              height: a,
            });
          var v = this.createElement("image").attr(z);
          l
            ? (f(
                v.element,
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              ),
              (z = new C.Image()),
              D(z, "load", n),
              (z.src = b),
              z.complete && n({}))
            : f(v.element, b);
          return v;
        };
        q.prototype.symbol = function (b, q, g, e, f, n) {
          var z = this,
            k = /^url\((.*?)\)$/,
            C = k.test(b),
            x = !C && (this.symbols[b] ? b : "circle"),
            R = x && this.symbols[x],
            w;
          if (R) {
            "number" === typeof q &&
              (w = R.call(
                this.symbols,
                Math.round(q || 0),
                Math.round(g || 0),
                e || 0,
                f || 0,
                n
              ));
            var t = this.path(w);
            z.styledMode || t.attr("fill", "none");
            y(t, {
              symbolName: x,
              x: q,
              y: g,
              width: e,
              height: f,
            });
            n && y(t, n);
          } else if (C) {
            var H = b.match(k)[1];
            t = this.image(H);
            t.imgwidth = A(l[H] && l[H].width, n && n.width);
            t.imgheight = A(l[H] && l[H].height, n && n.height);
            var p = function () {
              t.attr({
                width: t.width,
                height: t.height,
              });
            };
            ["width", "height"].forEach(function (b) {
              t[b + "Setter"] = function (b, q) {
                var z = this["img" + q];
                this[q] = b;
                a(z) &&
                  (n &&
                    "within" === n.backgroundSize &&
                    this.width &&
                    this.height &&
                    (z = Math.round(
                      z *
                        Math.min(
                          this.width / this.imgwidth,
                          this.height / this.imgheight
                        )
                    )),
                  this.element && this.element.setAttribute(q, z),
                  this.alignByTranslate ||
                    ((b = ((this[q] || 0) - z) / 2),
                    this.attr(
                      "width" === q
                        ? {
                            translateX: b,
                          }
                        : {
                            translateY: b,
                          }
                    )));
              };
            });
            a(q) &&
              t.attr({
                x: q,
                y: g,
              });
            t.isImg = !0;
            a(t.imgwidth) && a(t.imgheight)
              ? p()
              : (t.attr({
                  width: 0,
                  height: 0,
                }),
                u("img", {
                  onload: function () {
                    var b = v[z.chartIndex];
                    0 === this.width &&
                      (c(this, {
                        position: "absolute",
                        top: "-999em",
                      }),
                      E.body.appendChild(this));
                    l[H] = {
                      width: this.width,
                      height: this.height,
                    };
                    t.imgwidth = this.width;
                    t.imgheight = this.height;
                    t.element && p();
                    this.parentNode && this.parentNode.removeChild(this);
                    z.imgCount--;
                    if (!z.imgCount && b && !b.hasLoaded) b.onload();
                  },
                  src: H,
                }),
                this.imgCount++);
          }
          return t;
        };
        q.prototype.clipRect = function (b, q, g, e) {
          var z = f() + "-",
            a = this.createElement("clipPath")
              .attr({
                id: z,
              })
              .add(this.defs);
          b = this.rect(b, q, g, e, 0).add(a);
          b.id = z;
          b.clipPath = a;
          b.count = 0;
          return b;
        };
        q.prototype.text = function (b, q, g, e) {
          var z = {};
          if (e && (this.allowHTML || !this.forExport))
            return this.html(b, q, g);
          z.x = Math.round(q || 0);
          g && (z.y = Math.round(g));
          a(b) && (z.text = b);
          b = this.createElement("text").attr(z);
          e ||
            (b.xSetter = function (b, q, z) {
              var g = z.getElementsByTagName("tspan"),
                e = z.getAttribute(q),
                a;
              for (a = 0; a < g.length; a++) {
                var l = g[a];
                l.getAttribute(q) === e && l.setAttribute(q, b);
              }
              z.setAttribute(q, b);
            });
          return b;
        };
        q.prototype.fontMetrics = function (b, q) {
          b =
            (!this.styledMode && /px/.test(b)) || !C.getComputedStyle
              ? b ||
                (q && q.style && q.style.fontSize) ||
                (this.style && this.style.fontSize)
              : q && F.prototype.getStyle.call(q, "font-size");
          b = /px/.test(b) ? t(b) : 12;
          q = 24 > b ? b + 3 : Math.round(1.2 * b);
          return {
            h: q,
            b: Math.round(0.8 * q),
            f: b,
          };
        };
        q.prototype.rotCorr = function (q, g, e) {
          var z = q;
          g && e && (z = Math.max(z * Math.cos(g * b), 4));
          return {
            x: (-q / 3) * Math.sin(g * b),
            y: z,
          };
        };
        q.prototype.pathToSegments = function (b) {
          for (
            var q = [],
              z = [],
              g = {
                A: 8,
                C: 7,
                H: 2,
                L: 3,
                M: 3,
                Q: 5,
                S: 5,
                T: 3,
                V: 2,
              },
              e = 0;
            e < b.length;
            e++
          )
            m(z[0]) &&
              O(b[e]) &&
              z.length === g[z[0].toUpperCase()] &&
              b.splice(e, 0, z[0].replace("M", "L").replace("m", "l")),
              "string" === typeof b[e] &&
                (z.length && q.push(z.slice(0)), (z.length = 0)),
              z.push(b[e]);
          q.push(z.slice(0));
          return q;
        };
        q.prototype.label = function (b, q, g, e, a, l, f, n, v) {
          return new J(this, b, q, g, e, a, l, f, n, v);
        };
        q.prototype.alignElements = function () {
          this.alignedObjects.forEach(function (b) {
            return b.align();
          });
        };
        return q;
      })();
      I.prototype.Element = F;
      I.prototype.SVG_NS = e;
      I.prototype.draw = n;
      I.prototype.escapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      };
      var w = function (b, z, g, e, a) {
        a = (a && a.r) || 0;
        return [
          ["M", b + a, z],
          ["L", b + g - a, z],
          ["C", b + g, z, b + g, z, b + g, z + a],
          ["L", b + g, z + e - a],
          ["C", b + g, z + e, b + g, z + e, b + g - a, z + e],
          ["L", b + a, z + e],
          ["C", b, z + e, b, z + e, b, z + e - a],
          ["L", b, z + a],
          ["C", b, z, b, z, b + a, z],
        ];
      };
      n = function (b, z, g, e, a) {
        return a && a.r
          ? w(b, z, g, e, a)
          : [
              ["M", b, z],
              ["L", b + g, z],
              ["L", b + g, z + e],
              ["L", b, z + e],
              ["Z"],
            ];
      };
      I.prototype.symbols = {
        circle: function (b, z, g, e) {
          return this.arc(b + g / 2, z + e / 2, g / 2, e / 2, {
            start: 0.5 * Math.PI,
            end: 2.5 * Math.PI,
            open: !1,
          });
        },
        rect: n,
        square: n,
        triangle: function (b, z, g, e) {
          return [
            ["M", b + g / 2, z],
            ["L", b + g, z + e],
            ["L", b, z + e],
            ["Z"],
          ];
        },
        "triangle-down": function (b, z, g, e) {
          return [["M", b, z], ["L", b + g, z], ["L", b + g / 2, z + e], ["Z"]];
        },
        diamond: function (b, z, g, e) {
          return [
            ["M", b + g / 2, z],
            ["L", b + g, z + e / 2],
            ["L", b + g / 2, z + e],
            ["L", b, z + e / 2],
            ["Z"],
          ];
        },
        arc: function (b, z, g, e, l) {
          var q = [];
          if (l) {
            var f = l.start || 0,
              n = A(l.r, g);
            g = A(l.r, e || g);
            var v = (l.end || 0) - 0.001;
            e = l.innerR;
            var k = A(l.open, 0.001 > Math.abs((l.end || 0) - f - 2 * Math.PI)),
              E = Math.cos(f),
              x = Math.sin(f),
              C = Math.cos(v),
              t = Math.sin(v);
            f = A(l.longArc, 0.001 > v - f - Math.PI ? 0 : 1);
            q.push(
              ["M", b + n * E, z + g * x],
              ["A", n, g, 0, f, A(l.clockwise, 1), b + n * C, z + g * t]
            );
            a(e) &&
              q.push(
                k ? ["M", b + e * C, z + e * t] : ["L", b + e * C, z + e * t],
                [
                  "A",
                  e,
                  e,
                  0,
                  f,
                  a(l.clockwise) ? 1 - l.clockwise : 0,
                  b + e * E,
                  z + e * x,
                ]
              );
            k || q.push(["Z"]);
          }
          return q;
        },
        callout: function (b, g, e, a, l) {
          var q = Math.min((l && l.r) || 0, e, a),
            z = q + 6,
            f = l && l.anchorX;
          l = (l && l.anchorY) || 0;
          var n = w(b, g, e, a, {
            r: q,
          });
          if (!O(f)) return n;
          b + f >= e
            ? l > g + z && l < g + a - z
              ? n.splice(
                  3,
                  1,
                  ["L", b + e, l - 6],
                  ["L", b + e + 6, l],
                  ["L", b + e, l + 6],
                  ["L", b + e, g + a - q]
                )
              : n.splice(
                  3,
                  1,
                  ["L", b + e, a / 2],
                  ["L", f, l],
                  ["L", b + e, a / 2],
                  ["L", b + e, g + a - q]
                )
            : 0 >= b + f
            ? l > g + z && l < g + a - z
              ? n.splice(
                  7,
                  1,
                  ["L", b, l + 6],
                  ["L", b - 6, l],
                  ["L", b, l - 6],
                  ["L", b, g + q]
                )
              : n.splice(
                  7,
                  1,
                  ["L", b, a / 2],
                  ["L", f, l],
                  ["L", b, a / 2],
                  ["L", b, g + q]
                )
            : l && l > a && f > b + z && f < b + e - z
            ? n.splice(
                5,
                1,
                ["L", f + 6, g + a],
                ["L", f, g + a + 6],
                ["L", f - 6, g + a],
                ["L", b + q, g + a]
              )
            : l &&
              0 > l &&
              f > b + z &&
              f < b + e - z &&
              n.splice(
                1,
                1,
                ["L", f - 6, g],
                ["L", f, g - 6],
                ["L", f + 6, g],
                ["L", e - q, g]
              );
          return n;
        },
      };
      h.SVGRenderer = I;
      h.Renderer = h.SVGRenderer;
      return h.Renderer;
    }
  );
  Q(
    d,
    "Core/Renderer/HTML/HTMLElement.js",
    [
      d["Core/Globals.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K) {
      var N = d.isFirefox,
        J = d.isMS,
        M = d.isWebKit,
        G = d.win,
        I = K.css,
        D = K.defined,
        B = K.extend,
        u = K.pick,
        c = K.pInt;
      B(h.prototype, {
        htmlCss: function (a) {
          var c = "SPAN" === this.element.tagName && a && "width" in a,
            y = u(c && a.width, void 0);
          if (c) {
            delete a.width;
            this.textWidth = y;
            var p = !0;
          }
          a &&
            "ellipsis" === a.textOverflow &&
            ((a.whiteSpace = "nowrap"), (a.overflow = "hidden"));
          this.styles = B(this.styles, a);
          I(this.element, a);
          p && this.htmlUpdateTransform();
          return this;
        },
        htmlGetBBox: function () {
          var a = this.element;
          return {
            x: a.offsetLeft,
            y: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        },
        htmlUpdateTransform: function () {
          if (this.added) {
            var a = this.renderer,
              r = this.element,
              y = this.translateX || 0,
              p = this.translateY || 0,
              u = this.x || 0,
              k = this.y || 0,
              m = this.textAlign || "left",
              L = {
                left: 0,
                center: 0.5,
                right: 1,
              }[m],
              A = this.styles;
            A = A && A.whiteSpace;
            I(r, {
              marginLeft: y,
              marginTop: p,
            });
            !a.styledMode &&
              this.shadows &&
              this.shadows.forEach(function (b) {
                I(b, {
                  marginLeft: y + 1,
                  marginTop: p + 1,
                });
              });
            this.inverted &&
              [].forEach.call(r.childNodes, function (b) {
                a.invertChild(b, r);
              });
            if ("SPAN" === r.tagName) {
              var t = this.rotation,
                f = void 0;
              f = this.textWidth && c(this.textWidth);
              var v = [
                  t,
                  m,
                  r.innerHTML,
                  this.textWidth,
                  this.textAlign,
                ].join(),
                b;
              (b = f !== this.oldTextWidth) &&
                !(b = f > this.oldTextWidth) &&
                ((b = this.textPxLength) ||
                  (I(r, {
                    width: "",
                    whiteSpace: A || "nowrap",
                  }),
                  (b = r.offsetWidth)),
                (b = b > f));
              b &&
              (/[ \-]/.test(r.textContent || r.innerText) ||
                "ellipsis" === r.style.textOverflow)
                ? (I(r, {
                    width: f + "px",
                    display: "block",
                    whiteSpace: A || "normal",
                  }),
                  (this.oldTextWidth = f),
                  (this.hasBoxWidthChanged = !0))
                : (this.hasBoxWidthChanged = !1);
              v !== this.cTT &&
                ((f = a.fontMetrics(r.style.fontSize, r).b),
                !D(t) ||
                  (t === (this.oldRotation || 0) && m === this.oldAlign) ||
                  this.setSpanRotation(t, L, f),
                this.getSpanCorrection(
                  (!D(t) && this.textPxLength) || r.offsetWidth,
                  f,
                  L,
                  t,
                  m
                ));
              I(r, {
                left: u + (this.xCorr || 0) + "px",
                top: k + (this.yCorr || 0) + "px",
              });
              this.cTT = v;
              this.oldRotation = t;
              this.oldAlign = m;
            }
          } else this.alignOnAdd = !0;
        },
        setSpanRotation: function (a, c, y) {
          var p = {},
            r =
              J && !/Edge/.test(G.navigator.userAgent)
                ? "-ms-transform"
                : M
                ? "-webkit-transform"
                : N
                ? "MozTransform"
                : G.opera
                ? "-o-transform"
                : void 0;
          r &&
            ((p[r] = p.transform = "rotate(" + a + "deg)"),
            (p[r + (N ? "Origin" : "-origin")] = p.transformOrigin =
              100 * c + "% " + y + "px"),
            I(this.element, p));
        },
        getSpanCorrection: function (a, c, y) {
          this.xCorr = -a * y;
          this.yCorr = -c;
        },
      });
      return h;
    }
  );
  Q(
    d,
    "Core/Renderer/HTML/HTMLRenderer.js",
    [
      d["Core/Renderer/HTML/AST.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Renderer/SVG/SVGRenderer.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var N = F.attr,
        M = F.createElement,
        G = F.extend,
        I = F.pick;
      G(K.prototype, {
        html: function (D, B, u) {
          var c = this.createElement("span"),
            a = c.element,
            r = c.renderer,
            y = r.isSVG,
            p = function (a, k) {
              ["opacity", "visibility"].forEach(function (c) {
                a[c + "Setter"] = function (p, m, t) {
                  var f = a.div ? a.div.style : k;
                  h.prototype[c + "Setter"].call(this, p, m, t);
                  f && (f[m] = p);
                };
              });
              a.addedSetters = !0;
            };
          c.textSetter = function (a) {
            a !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              d.setElementHTML(this.element, I(a, "")),
              (this.textStr = a),
              (c.doTransform = !0));
          };
          y && p(c, c.element.style);
          c.xSetter =
            c.ySetter =
            c.alignSetter =
            c.rotationSetter =
              function (a, k) {
                "align" === k ? (c.alignValue = c.textAlign = a) : (c[k] = a);
                c.doTransform = !0;
              };
          c.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          c.attr({
            text: D,
            x: Math.round(B),
            y: Math.round(u),
          }).css({
            position: "absolute",
          });
          r.styledMode ||
            c.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          a.style.whiteSpace = "nowrap";
          c.css = c.htmlCss;
          y &&
            (c.add = function (y) {
              var k = r.box.parentNode,
                m = [];
              if ((this.parentGroup = y)) {
                var L = y.div;
                if (!L) {
                  for (; y; ) m.push(y), (y = y.parentGroup);
                  m.reverse().forEach(function (a) {
                    function t(f, v) {
                      a[v] = f;
                      "translateX" === v
                        ? (b.left = f + "px")
                        : (b.top = f + "px");
                      a.doTransform = !0;
                    }
                    var f = N(a.element, "class"),
                      v = a.styles || {};
                    L = a.div =
                      a.div ||
                      M(
                        "div",
                        f
                          ? {
                              className: f,
                            }
                          : void 0,
                        {
                          position: "absolute",
                          left: (a.translateX || 0) + "px",
                          top: (a.translateY || 0) + "px",
                          display: a.display,
                          opacity: a.opacity,
                          cursor: v.cursor,
                          pointerEvents: v.pointerEvents,
                        },
                        L || k
                      );
                    var b = L.style;
                    G(a, {
                      classSetter: (function (b) {
                        return function (a) {
                          this.element.setAttribute("class", a);
                          b.className = a;
                        };
                      })(L),
                      on: function () {
                        m[0].div &&
                          c.on.apply(
                            {
                              element: m[0].div,
                              onEvents: c.onEvents,
                            },
                            arguments
                          );
                        return a;
                      },
                      translateXSetter: t,
                      translateYSetter: t,
                    });
                    a.addedSetters || p(a);
                  });
                }
              } else L = k;
              L.appendChild(a);
              c.added = !0;
              c.alignOnAdd && c.htmlUpdateTransform();
              return c;
            });
          return c;
        },
      });
      return K;
    }
  );
  Q(
    d,
    "Core/Axis/Tick.js",
    [
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K) {
      var N = h.deg2rad,
        J = K.clamp,
        M = K.correctFloat,
        G = K.defined,
        I = K.destroyObjectProperties,
        D = K.extend,
        B = K.fireEvent,
        u = K.isNumber,
        c = K.merge,
        a = K.objectEach,
        r = K.pick;
      ("");
      K = (function () {
        function y(a, c, k, m, L) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = c;
          this.type = k || "";
          this.parameters = L || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          B(this, "init");
          k || m || this.addLabel();
        }
        y.prototype.addLabel = function () {
          var a = this,
            c = a.axis,
            k = c.options,
            m = c.chart,
            L = c.categories,
            A = c.logarithmic,
            t = c.names,
            f = a.pos,
            v = r(a.options && a.options.labels, k.labels),
            b = c.tickPositions,
            E = f === b[0],
            P = f === b[b.length - 1],
            H = a.label,
            g = (!v.step || 1 === v.step) && 1 === c.tickInterval;
          b = b.info;
          var n, e;
          L = this.parameters.category || (L ? r(L[f], t[f], f) : f);
          A && u(L) && (L = M(A.lin2log(L)));
          if (c.dateTime && b) {
            var l = m.time.resolveDTLFormat(
              k.dateTimeLabelFormats[
                (!k.grid && b.higherRanks[f]) || b.unitName
              ]
            );
            var C = l.main;
          }
          a.isFirst = E;
          a.isLast = P;
          var x = {
            axis: c,
            chart: m,
            dateTimeLabelFormat: C,
            isFirst: E,
            isLast: P,
            pos: f,
            tick: a,
            tickPositionInfo: b,
            value: L,
          };
          B(this, "labelFormat", x);
          var w = function (b) {
            return v.formatter
              ? v.formatter.call(b, b)
              : v.format
              ? ((b.text = c.defaultLabelFormatter.call(b)),
                d.format(v.format, b, m))
              : c.defaultLabelFormatter.call(b, b);
          };
          k = w.call(x, x);
          if ((e = l && l.list))
            a.shortenLabel = function () {
              for (n = 0; n < e.length; n++)
                if (
                  (D(x, {
                    dateTimeLabelFormat: e[n],
                  }),
                  H.attr({
                    text: w.call(x, x),
                  }),
                  H.getBBox().width < c.getSlotWidth(a) - 2 * v.padding)
                )
                  return;
              H.attr({
                text: "",
              });
            };
          g && c._addedPlotLB && a.moveLabel(k, v);
          G(H) || a.movedLabel
            ? H &&
              H.textStr !== k &&
              !g &&
              (!H.textWidth ||
                v.style.width ||
                H.styles.width ||
                H.css({
                  width: null,
                }),
              H.attr({
                text: k,
              }),
              (H.textPxLength = H.getBBox().width))
            : ((a.label = H =
                a.createLabel(
                  {
                    x: 0,
                    y: 0,
                  },
                  k,
                  v
                )),
              (a.rotation = 0));
        };
        y.prototype.createLabel = function (a, y, k) {
          var m = this.axis,
            p = m.chart;
          if (
            (a =
              G(y) && k.enabled
                ? p.renderer.text(y, a.x, a.y, k.useHTML).add(m.labelGroup)
                : null)
          )
            p.styledMode || a.css(c(k.style)),
              (a.textPxLength = a.getBBox().width);
          return a;
        };
        y.prototype.destroy = function () {
          I(this, this.axis);
        };
        y.prototype.getPosition = function (a, c, k, m) {
          var p = this.axis,
            A = p.chart,
            t = (m && A.oldChartHeight) || A.chartHeight;
          a = {
            x: a
              ? M(p.translate(c + k, null, null, m) + p.transB)
              : p.left +
                p.offset +
                (p.opposite
                  ? ((m && A.oldChartWidth) || A.chartWidth) - p.right - p.left
                  : 0),
            y: a
              ? t - p.bottom + p.offset - (p.opposite ? p.height : 0)
              : M(t - p.translate(c + k, null, null, m) - p.transB),
          };
          a.y = J(a.y, -1e5, 1e5);
          B(this, "afterGetPosition", {
            pos: a,
          });
          return a;
        };
        y.prototype.getLabelPosition = function (a, c, k, m, L, A, t, f) {
          var v = this.axis,
            b = v.transA,
            E =
              v.isLinked && v.linkedParent
                ? v.linkedParent.reversed
                : v.reversed,
            P = v.staggerLines,
            H = v.tickRotCorr || {
              x: 0,
              y: 0,
            },
            g = L.y,
            n =
              m || v.reserveSpaceDefault
                ? 0
                : -v.labelOffset * ("center" === v.labelAlign ? 0.5 : 1),
            e = {};
          G(g) ||
            (g =
              0 === v.side
                ? k.rotation
                  ? -8
                  : -k.getBBox().height
                : 2 === v.side
                ? H.y + 8
                : Math.cos(k.rotation * N) *
                  (H.y - k.getBBox(!1, 0).height / 2));
          a = a + L.x + n + H.x - (A && m ? A * b * (E ? -1 : 1) : 0);
          c = c + g - (A && !m ? A * b * (E ? 1 : -1) : 0);
          P &&
            ((k = (t / (f || 1)) % P),
            v.opposite && (k = P - k - 1),
            (c += (v.labelOffset / P) * k));
          e.x = a;
          e.y = Math.round(c);
          B(this, "afterGetLabelPosition", {
            pos: e,
            tickmarkOffset: A,
            index: t,
          });
          return e;
        };
        y.prototype.getLabelSize = function () {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? "height" : "width"]
            : 0;
        };
        y.prototype.getMarkPath = function (a, c, k, m, L, A) {
          return A.crispLine(
            [
              ["M", a, c],
              ["L", a + (L ? 0 : -k), c + (L ? k : 0)],
            ],
            m
          );
        };
        y.prototype.handleOverflow = function (a) {
          var c = this.axis,
            k = c.options.labels,
            m = a.x,
            p = c.chart.chartWidth,
            A = c.chart.spacing,
            t = r(c.labelLeft, Math.min(c.pos, A[3]));
          A = r(
            c.labelRight,
            Math.max(c.isRadial ? 0 : c.pos + c.len, p - A[1])
          );
          var f = this.label,
            v = this.rotation,
            b = {
              left: 0,
              center: 0.5,
              right: 1,
            }[c.labelAlign || f.attr("align")],
            E = f.getBBox().width,
            P = c.getSlotWidth(this),
            H = P,
            g = 1,
            n,
            e = {};
          if (v || "justify" !== k.overflow)
            0 > v && m - b * E < t
              ? (n = Math.round(m / Math.cos(v * N) - t))
              : 0 < v &&
                m + b * E > A &&
                (n = Math.round((p - m) / Math.cos(v * N)));
          else if (
            ((p = m + (1 - b) * E),
            m - b * E < t
              ? (H = a.x + H * (1 - b) - t)
              : p > A && ((H = A - a.x + H * b), (g = -1)),
            (H = Math.min(P, H)),
            H < P &&
              "center" === c.labelAlign &&
              (a.x += g * (P - H - b * (P - Math.min(E, H)))),
            E > H || (c.autoRotation && (f.styles || {}).width))
          )
            n = H;
          n &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((e.width = Math.floor(n) + "px"),
                (k.style || {}).textOverflow || (e.textOverflow = "ellipsis"),
                f.css(e)));
        };
        y.prototype.moveLabel = function (c, y) {
          var k = this,
            m = k.label,
            p = !1,
            A = k.axis,
            t = A.reversed;
          m && m.textStr === c
            ? ((k.movedLabel = m), (p = !0), delete k.label)
            : a(A.ticks, function (a) {
                p ||
                  a.isNew ||
                  a === k ||
                  !a.label ||
                  a.label.textStr !== c ||
                  ((k.movedLabel = a.label),
                  (p = !0),
                  (a.labelPos = k.movedLabel.xy),
                  delete a.label);
              });
          if (!p && (k.labelPos || m)) {
            var f = k.labelPos || m.xy;
            m = A.horiz ? (t ? 0 : A.width + A.left) : f.x;
            A = A.horiz ? f.y : t ? A.width + A.left : 0;
            k.movedLabel = k.createLabel(
              {
                x: m,
                y: A,
              },
              c,
              y
            );
            k.movedLabel &&
              k.movedLabel.attr({
                opacity: 0,
              });
          }
        };
        y.prototype.render = function (a, c, k) {
          var m = this.axis,
            p = m.horiz,
            A = this.pos,
            t = r(this.tickmarkOffset, m.tickmarkOffset);
          A = this.getPosition(p, A, t, c);
          t = A.x;
          var f = A.y;
          m = (p && t === m.pos + m.len) || (!p && f === m.pos) ? -1 : 1;
          p = r(k, this.label && this.label.newOpacity, 1);
          k = r(k, 1);
          this.isActive = !0;
          this.renderGridLine(c, k, m);
          this.renderMark(A, k, m);
          this.renderLabel(A, c, p, a);
          this.isNew = !1;
          B(this, "afterRender");
        };
        y.prototype.renderGridLine = function (a, c, k) {
          var m = this.axis,
            p = m.options,
            A = this.gridLine,
            t = {},
            f = this.pos,
            v = this.type,
            b = r(this.tickmarkOffset, m.tickmarkOffset),
            E = m.chart.renderer,
            P = p.gridLineWidth,
            H = p.gridLineColor,
            g = p.gridLineDashStyle;
          "minor" === this.type &&
            ((P = p.minorGridLineWidth),
            (H = p.minorGridLineColor),
            (g = p.minorGridLineDashStyle));
          A ||
            (m.chart.styledMode ||
              ((t.stroke = H), (t["stroke-width"] = P || 0), (t.dashstyle = g)),
            v || (t.zIndex = 1),
            a && (c = 0),
            (this.gridLine = A =
              E.path()
                .attr(t)
                .addClass("highcharts-" + (v ? v + "-" : "") + "grid-line")
                .add(m.gridGroup)));
          if (
            A &&
            (k = m.getPlotLinePath({
              value: f + b,
              lineWidth: A.strokeWidth() * k,
              force: "pass",
              old: a,
            }))
          )
            A[a || this.isNew ? "attr" : "animate"]({
              d: k,
              opacity: c,
            });
        };
        y.prototype.renderMark = function (a, c, k) {
          var m = this.axis,
            p = m.options,
            A = m.chart.renderer,
            t = this.type,
            f = m.tickSize(t ? t + "Tick" : "tick"),
            v = this.mark,
            b = !v,
            E = a.x;
          a = a.y;
          var P = r(
            p["minor" !== t ? "tickWidth" : "minorTickWidth"],
            !t && m.isXAxis ? 1 : 0
          );
          p = p["minor" !== t ? "tickColor" : "minorTickColor"];
          f &&
            (m.opposite && (f[0] = -f[0]),
            b &&
              ((this.mark = v =
                A.path()
                  .addClass("highcharts-" + (t ? t + "-" : "") + "tick")
                  .add(m.axisGroup)),
              m.chart.styledMode ||
                v.attr({
                  stroke: p,
                  "stroke-width": P,
                })),
            v[b ? "attr" : "animate"]({
              d: this.getMarkPath(E, a, f[0], v.strokeWidth() * k, m.horiz, A),
              opacity: c,
            }));
        };
        y.prototype.renderLabel = function (a, c, k, m) {
          var p = this.axis,
            A = p.horiz,
            t = p.options,
            f = this.label,
            v = t.labels,
            b = v.step;
          p = r(this.tickmarkOffset, p.tickmarkOffset);
          var E = !0,
            P = a.x;
          a = a.y;
          f &&
            u(P) &&
            ((f.xy = a = this.getLabelPosition(P, a, f, A, v, p, m, b)),
            (this.isFirst && !this.isLast && !t.showFirstLabel) ||
            (this.isLast && !this.isFirst && !t.showLastLabel)
              ? (E = !1)
              : !A ||
                v.step ||
                v.rotation ||
                c ||
                0 === k ||
                this.handleOverflow(a),
            b && m % b && (E = !1),
            E && u(a.y)
              ? ((a.opacity = k),
                f[this.isNewLabel ? "attr" : "animate"](a),
                (this.isNewLabel = !1))
              : (f.attr("y", -9999), (this.isNewLabel = !0)));
        };
        y.prototype.replaceMovedLabel = function () {
          var a = this.label,
            c = this.axis,
            k = c.reversed;
          if (a && !this.isNew) {
            var m = c.horiz ? (k ? c.left : c.width + c.left) : a.xy.x;
            k = c.horiz ? a.xy.y : k ? c.width + c.top : c.top;
            a.animate(
              {
                x: m,
                y: k,
                opacity: 0,
              },
              void 0,
              a.destroy
            );
            delete this.label;
          }
          c.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return y;
      })();
      h.Tick = K;
      return h.Tick;
    }
  );
  Q(
    d,
    "Core/Axis/Axis.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Color/Color.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Options.js"],
      d["Core/Axis/Tick.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G) {
      var I = d.animObject,
        D = J.defaultOptions,
        B = G.addEvent,
        u = G.arrayMax,
        c = G.arrayMin,
        a = G.clamp,
        r = G.correctFloat,
        y = G.defined,
        p = G.destroyObjectProperties,
        O = G.erase,
        k = G.error,
        m = G.extend,
        L = G.fireEvent,
        A = G.getMagnitude,
        t = G.isArray,
        f = G.isFunction,
        v = G.isNumber,
        b = G.isString,
        E = G.merge,
        P = G.normalizeTickInterval,
        H = G.objectEach,
        g = G.pick,
        n = G.relativeLength,
        e = G.removeEvent,
        l = G.splat,
        C = G.syncTimeout;
      ("");
      var x = K.deg2rad;
      d = (function () {
        function w(b, a) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.categories =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(b, a);
        }
        w.prototype.init = function (b, a) {
          var q = a.isX,
            e = this;
          e.chart = b;
          e.horiz = b.inverted && !e.isZAxis ? !q : q;
          e.isXAxis = q;
          e.coll = e.coll || (q ? "xAxis" : "yAxis");
          L(this, "init", {
            userOptions: a,
          });
          e.opposite = g(a.opposite, e.opposite);
          e.side = g(
            a.side,
            e.side,
            e.horiz ? (e.opposite ? 0 : 2) : e.opposite ? 1 : 3
          );
          e.setOptions(a);
          var z = this.options,
            n = z.labels,
            c = z.type;
          e.userOptions = a;
          e.minPixelPadding = 0;
          e.reversed = g(z.reversed, e.reversed);
          e.visible = z.visible;
          e.zoomEnabled = z.zoomEnabled;
          e.hasNames = "category" === c || !0 === z.categories;
          e.categories = z.categories || e.hasNames;
          e.names || ((e.names = []), (e.names.keys = {}));
          e.plotLinesAndBandsGroups = {};
          e.positiveValuesOnly = !!e.logarithmic;
          e.isLinked = y(z.linkedTo);
          e.ticks = {};
          e.labelEdge = [];
          e.minorTicks = {};
          e.plotLinesAndBands = [];
          e.alternateBands = {};
          e.len = 0;
          e.minRange = e.userMinRange = z.minRange || z.maxZoom;
          e.range = z.range;
          e.offset = z.offset || 0;
          e.max = null;
          e.min = null;
          a = g(z.crosshair, l(b.options.tooltip.crosshairs)[q ? 0 : 1]);
          e.crosshair = !0 === a ? {} : a;
          a = e.options.events;
          -1 === b.axes.indexOf(e) &&
            (q ? b.axes.splice(b.xAxis.length, 0, e) : b.axes.push(e),
            b[e.coll].push(e));
          e.series = e.series || [];
          b.inverted &&
            !e.isZAxis &&
            q &&
            "undefined" === typeof e.reversed &&
            (e.reversed = !0);
          e.labelRotation = v(n.rotation) ? n.rotation : void 0;
          H(a, function (b, q) {
            f(b) && B(e, q, b);
          });
          L(this, "afterInit");
        };
        w.prototype.setOptions = function (b) {
          this.options = E(
            w.defaultOptions,
            "yAxis" === this.coll && w.defaultYAxisOptions,
            [
              w.defaultTopAxisOptions,
              w.defaultRightAxisOptions,
              w.defaultBottomAxisOptions,
              w.defaultLeftAxisOptions,
            ][this.side],
            E(D[this.coll], b)
          );
          L(this, "afterSetOptions", {
            userOptions: b,
          });
        };
        w.prototype.defaultLabelFormatter = function () {
          var b = this.axis,
            a = v(this.value) ? this.value : NaN,
            e = b.chart.time,
            g = this.dateTimeLabelFormat,
            l = D.lang,
            f = l.numericSymbols;
          l = l.numericSymbolMagnitude || 1e3;
          var n = f && f.length,
            c = b.logarithmic ? Math.abs(a) : b.tickInterval,
            k = this.chart.numberFormatter;
          if (b.categories) var C = "" + this.value;
          else if (g) C = e.dateFormat(g, a);
          else if (n && 1e3 <= c)
            for (; n-- && "undefined" === typeof C; )
              (b = Math.pow(l, n + 1)),
                c >= b &&
                  0 === (10 * a) % b &&
                  null !== f[n] &&
                  0 !== a &&
                  (C = k(a / b, -1) + f[n]);
          "undefined" === typeof C &&
            (C = 1e4 <= Math.abs(a) ? k(a, -1) : k(a, -1, void 0, ""));
          return C;
        };
        w.prototype.getSeriesExtremes = function () {
          var b = this,
            a = b.chart,
            e;
          L(this, "getSeriesExtremes", null, function () {
            b.hasVisibleSeries = !1;
            b.dataMin = b.dataMax = b.threshold = null;
            b.softThreshold = !b.isXAxis;
            b.stacking && b.stacking.buildStacks();
            b.series.forEach(function (q) {
              if (q.visible || !a.options.chart.ignoreHiddenSeries) {
                var z = q.options,
                  l = z.threshold;
                b.hasVisibleSeries = !0;
                b.positiveValuesOnly && 0 >= l && (l = null);
                if (b.isXAxis) {
                  if (((z = q.xData), z.length)) {
                    z = b.logarithmic ? z.filter(b.validatePositiveValue) : z;
                    e = q.getXExtremes(z);
                    var f = e.min;
                    var n = e.max;
                    v(f) ||
                      f instanceof Date ||
                      ((z = z.filter(v)),
                      (e = q.getXExtremes(z)),
                      (f = e.min),
                      (n = e.max));
                    z.length &&
                      ((b.dataMin = Math.min(g(b.dataMin, f), f)),
                      (b.dataMax = Math.max(g(b.dataMax, n), n)));
                  }
                } else if (
                  ((q = q.applyExtremes()),
                  v(q.dataMin) &&
                    ((f = q.dataMin),
                    (b.dataMin = Math.min(g(b.dataMin, f), f))),
                  v(q.dataMax) &&
                    ((n = q.dataMax),
                    (b.dataMax = Math.max(g(b.dataMax, n), n))),
                  y(l) && (b.threshold = l),
                  !z.softThreshold || b.positiveValuesOnly)
                )
                  b.softThreshold = !1;
              }
            });
          });
          L(this, "afterGetSeriesExtremes");
        };
        w.prototype.translate = function (b, a, e, g, l, f) {
          var q = this.linkedParent || this,
            z = 1,
            n = 0,
            c = g && q.old ? q.old.transA : q.transA;
          g = g && q.old ? q.old.min : q.min;
          var k = q.minPixelPadding;
          l =
            (q.isOrdinal ||
              (q.brokenAxis && q.brokenAxis.hasBreaks) ||
              (q.logarithmic && l)) &&
            q.lin2val;
          c || (c = q.transA);
          e && ((z *= -1), (n = q.len));
          q.reversed && ((z *= -1), (n -= z * (q.sector || q.len)));
          a
            ? ((b = (b * z + n - k) / c + g), l && (b = q.lin2val(b)))
            : (l && (b = q.val2lin(b)),
              (b = v(g)
                ? z * (b - g) * c + n + z * k + (v(f) ? c * f : 0)
                : void 0));
          return b;
        };
        w.prototype.toPixels = function (b, a) {
          return (
            this.translate(b, !1, !this.horiz, null, !0) + (a ? 0 : this.pos)
          );
        };
        w.prototype.toValue = function (b, a) {
          return this.translate(
            b - (a ? 0 : this.pos),
            !0,
            !this.horiz,
            null,
            !0
          );
        };
        w.prototype.getPlotLinePath = function (b) {
          function q(b, q, e) {
            if (("pass" !== E && b < q) || b > e)
              E ? (b = a(b, q, e)) : (A = !0);
            return b;
          }
          var e = this,
            l = e.chart,
            f = e.left,
            n = e.top,
            c = b.old,
            k = b.value,
            C = b.translatedValue,
            x = b.lineWidth,
            E = b.force,
            t,
            w,
            H,
            m,
            P = (c && l.oldChartHeight) || l.chartHeight,
            p = (c && l.oldChartWidth) || l.chartWidth,
            A,
            y = e.transB;
          b = {
            value: k,
            lineWidth: x,
            old: c,
            force: E,
            acrossPanes: b.acrossPanes,
            translatedValue: C,
          };
          L(this, "getPlotLinePath", b, function (b) {
            C = g(C, e.translate(k, null, null, c));
            C = a(C, -1e5, 1e5);
            t = H = Math.round(C + y);
            w = m = Math.round(P - C - y);
            v(C)
              ? e.horiz
                ? ((w = n), (m = P - e.bottom), (t = H = q(t, f, f + e.width)))
                : ((t = f), (H = p - e.right), (w = m = q(w, n, n + e.height)))
              : ((A = !0), (E = !1));
            b.path =
              A && !E
                ? null
                : l.renderer.crispLine(
                    [
                      ["M", t, w],
                      ["L", H, m],
                    ],
                    x || 1
                  );
          });
          return b.path;
        };
        w.prototype.getLinearTickPositions = function (b, a, e) {
          var q = r(Math.floor(a / b) * b);
          e = r(Math.ceil(e / b) * b);
          var g = [],
            l;
          r(q + b) === q && (l = 20);
          if (this.single) return [a];
          for (a = q; a <= e; ) {
            g.push(a);
            a = r(a + b, l);
            if (a === z) break;
            var z = a;
          }
          return g;
        };
        w.prototype.getMinorTickInterval = function () {
          var b = this.options;
          return !0 === b.minorTicks
            ? g(b.minorTickInterval, "auto")
            : !1 === b.minorTicks
            ? null
            : b.minorTickInterval;
        };
        w.prototype.getMinorTickPositions = function () {
          var b = this.options,
            a = this.tickPositions,
            e = this.minorTickInterval,
            g = [],
            l = this.pointRangePadding || 0,
            f = this.min - l;
          l = this.max + l;
          var n = l - f;
          if (n && n / e < this.len / 3) {
            var v = this.logarithmic;
            if (v)
              this.paddedTicks.forEach(function (b, a, q) {
                a &&
                  g.push.apply(g, v.getLogTickPositions(e, q[a - 1], q[a], !0));
              });
            else if (this.dateTime && "auto" === this.getMinorTickInterval())
              g = g.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(e),
                  f,
                  l,
                  b.startOfWeek
                )
              );
            else
              for (b = f + ((a[0] - f) % e); b <= l && b !== g[0]; b += e)
                g.push(b);
          }
          0 !== g.length && this.trimTicks(g);
          return g;
        };
        w.prototype.adjustForMinRange = function () {
          var b = this.options,
            a = this.min,
            e = this.max,
            l = this.logarithmic,
            f = 0,
            n,
            v,
            k,
            C;
          this.isXAxis &&
            "undefined" === typeof this.minRange &&
            !l &&
            (y(b.min) || y(b.max)
              ? (this.minRange = null)
              : (this.series.forEach(function (b) {
                  k = b.xData;
                  C = b.xIncrement ? 1 : k.length - 1;
                  if (1 < k.length)
                    for (n = C; 0 < n; n--)
                      if (((v = k[n] - k[n - 1]), !f || v < f)) f = v;
                }),
                (this.minRange = Math.min(
                  5 * f,
                  this.dataMax - this.dataMin
                ))));
          if (e - a < this.minRange) {
            var x = this.dataMax - this.dataMin >= this.minRange;
            var E = this.minRange;
            var t = (E - e + a) / 2;
            t = [a - t, g(b.min, a - t)];
            x &&
              (t[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            a = u(t);
            e = [a + E, g(b.max, a + E)];
            x && (e[2] = l ? l.log2lin(this.dataMax) : this.dataMax);
            e = c(e);
            e - a < E && ((t[0] = e - E), (t[1] = g(b.min, e - E)), (a = u(t)));
          }
          this.min = a;
          this.max = e;
        };
        w.prototype.getClosest = function () {
          var b;
          this.categories
            ? (b = 1)
            : this.series.forEach(function (a) {
                var e = a.closestPointRange,
                  q = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                !a.noSharedTooltip &&
                  y(e) &&
                  q &&
                  (b = y(b) ? Math.min(b, e) : e);
              });
          return b;
        };
        w.prototype.nameToX = function (b) {
          var a = t(this.categories),
            e = a ? this.categories : this.names,
            q = b.options.x;
          b.series.requireSorting = !1;
          y(q) ||
            (q = this.options.uniqueNames
              ? a
                ? e.indexOf(b.name)
                : g(e.keys[b.name], -1)
              : b.series.autoIncrement());
          if (-1 === q) {
            if (!a) var l = e.length;
          } else l = q;
          "undefined" !== typeof l &&
            ((this.names[l] = b.name), (this.names.keys[b.name] = l));
          return l;
        };
        w.prototype.updateNames = function () {
          var b = this,
            a = this.names;
          0 < a.length &&
            (Object.keys(a.keys).forEach(function (b) {
              delete a.keys[b];
            }),
            (a.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (a) {
              a.xIncrement = null;
              if (!a.points || a.isDirtyData)
                (b.max = Math.max(b.max, a.xData.length - 1)),
                  a.processData(),
                  a.generatePoints();
              a.data.forEach(function (e, q) {
                if (e && e.options && "undefined" !== typeof e.name) {
                  var g = b.nameToX(e);
                  "undefined" !== typeof g &&
                    g !== e.x &&
                    ((e.x = g), (a.xData[q] = g));
                }
              });
            }));
        };
        w.prototype.setAxisTranslation = function () {
          var a = this,
            e = a.max - a.min,
            l = a.axisPointRange || 0,
            f = 0,
            n = 0,
            v = a.linkedParent,
            c = !!a.categories,
            k = a.transA,
            C = a.isXAxis;
          if (C || c || l) {
            var x = a.getClosest();
            v
              ? ((f = v.minPointOffset), (n = v.pointRangePadding))
              : a.series.forEach(function (e) {
                  var q = c
                      ? 1
                      : C
                      ? g(e.options.pointRange, x, 0)
                      : a.axisPointRange || 0,
                    z = e.options.pointPlacement;
                  l = Math.max(l, q);
                  if (!a.single || c)
                    (e = e.is("xrange") ? !C : C),
                      (f = Math.max(f, e && b(z) ? 0 : q / 2)),
                      (n = Math.max(n, e && "on" === z ? 0 : q));
                });
            v = a.ordinal && a.ordinal.slope && x ? a.ordinal.slope / x : 1;
            a.minPointOffset = f *= v;
            a.pointRangePadding = n *= v;
            a.pointRange = Math.min(l, a.single && c ? 1 : e);
            C && (a.closestPointRange = x);
          }
          a.translationSlope =
            a.transA =
            k =
              a.staticScale || a.len / (e + n || 1);
          a.transB = a.horiz ? a.left : a.bottom;
          a.minPixelPadding = k * f;
          L(this, "afterSetAxisTranslation");
        };
        w.prototype.minFromRange = function () {
          return this.max - this.range;
        };
        w.prototype.setTickInterval = function (b) {
          var a = this,
            e = a.chart,
            q = a.logarithmic,
            l = a.options,
            f = a.isXAxis,
            n = a.isLinked,
            c = l.maxPadding,
            C = l.minPadding,
            x = l.tickInterval,
            E = l.tickPixelInterval,
            t = a.categories,
            w = v(a.threshold) ? a.threshold : null,
            H = a.softThreshold;
          a.dateTime || t || n || this.getTickAmount();
          var m = g(a.userMin, l.min);
          var p = g(a.userMax, l.max);
          if (n) {
            a.linkedParent = e[a.coll][l.linkedTo];
            var u = a.linkedParent.getExtremes();
            a.min = g(u.min, u.dataMin);
            a.max = g(u.max, u.dataMax);
            l.type !== a.linkedParent.options.type && k(11, 1, e);
          } else {
            if (H && y(w))
              if (a.dataMin >= w) (u = w), (C = 0);
              else if (a.dataMax <= w) {
                var B = w;
                c = 0;
              }
            a.min = g(m, u, a.dataMin);
            a.max = g(p, B, a.dataMax);
          }
          q &&
            (a.positiveValuesOnly &&
              !b &&
              0 >= Math.min(a.min, g(a.dataMin, a.min)) &&
              k(10, 1, e),
            (a.min = r(q.log2lin(a.min), 16)),
            (a.max = r(q.log2lin(a.max), 16)));
          a.range &&
            y(a.max) &&
            ((a.userMin = a.min = m = Math.max(a.dataMin, a.minFromRange())),
            (a.userMax = p = a.max),
            (a.range = null));
          L(a, "foundExtremes");
          a.beforePadding && a.beforePadding();
          a.adjustForMinRange();
          !(
            t ||
            a.axisPointRange ||
            (a.stacking && a.stacking.usePercentage) ||
            n
          ) &&
            y(a.min) &&
            y(a.max) &&
            (e = a.max - a.min) &&
            (!y(m) && C && (a.min -= e * C), !y(p) && c && (a.max += e * c));
          v(a.userMin) ||
            (v(l.softMin) && l.softMin < a.min && (a.min = m = l.softMin),
            v(l.floor) && (a.min = Math.max(a.min, l.floor)));
          v(a.userMax) ||
            (v(l.softMax) && l.softMax > a.max && (a.max = p = l.softMax),
            v(l.ceiling) && (a.max = Math.min(a.max, l.ceiling)));
          H &&
            y(a.dataMin) &&
            ((w = w || 0),
            !y(m) && a.min < w && a.dataMin >= w
              ? (a.min = a.options.minRange
                  ? Math.min(w, a.max - a.minRange)
                  : w)
              : !y(p) &&
                a.max > w &&
                a.dataMax <= w &&
                (a.max = a.options.minRange
                  ? Math.max(w, a.min + a.minRange)
                  : w));
          v(a.min) &&
            v(a.max) &&
            !this.chart.polar &&
            a.min > a.max &&
            (y(a.options.min)
              ? (a.max = a.min)
              : y(a.options.max) && (a.min = a.max));
          a.tickInterval =
            a.min === a.max ||
            "undefined" === typeof a.min ||
            "undefined" === typeof a.max
              ? 1
              : n &&
                a.linkedParent &&
                !x &&
                E === a.linkedParent.options.tickPixelInterval
              ? (x = a.linkedParent.tickInterval)
              : g(
                  x,
                  this.tickAmount
                    ? (a.max - a.min) / Math.max(this.tickAmount - 1, 1)
                    : void 0,
                  t ? 1 : ((a.max - a.min) * E) / Math.max(a.len, E)
                );
          f &&
            !b &&
            a.series.forEach(function (b) {
              b.processData(
                a.min !== (a.old && a.old.min) || a.max !== (a.old && a.old.max)
              );
            });
          a.setAxisTranslation();
          L(this, "initialAxisTranslation");
          a.pointRange &&
            !x &&
            (a.tickInterval = Math.max(a.pointRange, a.tickInterval));
          b = g(
            l.minTickInterval,
            a.dateTime &&
              !a.series.some(function (b) {
                return b.noSharedTooltip;
              })
              ? a.closestPointRange
              : 0
          );
          !x && a.tickInterval < b && (a.tickInterval = b);
          a.dateTime ||
            a.logarithmic ||
            x ||
            (a.tickInterval = P(
              a.tickInterval,
              void 0,
              A(a.tickInterval),
              g(
                l.allowDecimals,
                0.5 > a.tickInterval || void 0 !== this.tickAmount
              ),
              !!this.tickAmount
            ));
          this.tickAmount || (a.tickInterval = a.unsquish());
          this.setTickPositions();
        };
        w.prototype.setTickPositions = function () {
          var b = this.options,
            a = b.tickPositions;
          var e = this.getMinorTickInterval();
          var g = b.tickPositioner,
            l = this.hasVerticalPanning(),
            f = "colorAxis" === this.coll,
            n = (f || !l) && b.startOnTick;
          l = (f || !l) && b.endOnTick;
          this.tickmarkOffset =
            this.categories &&
            "between" === b.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            "auto" === e && this.tickInterval ? this.tickInterval / 5 : e;
          this.single =
            this.min === this.max &&
            y(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
          this.tickPositions = e = a && a.slice();
          !e &&
            ((this.ordinal && this.ordinal.positions) ||
            !(
              (this.max - this.min) / this.tickInterval >
              Math.max(2 * this.len, 200)
            )
              ? (e = this.dateTime
                  ? this.getTimeTicks(
                      this.dateTime.normalizeTimeTickInterval(
                        this.tickInterval,
                        b.units
                      ),
                      this.min,
                      this.max,
                      b.startOfWeek,
                      this.ordinal && this.ordinal.positions,
                      this.closestPointRange,
                      !0
                    )
                  : this.logarithmic
                  ? this.logarithmic.getLogTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    )
                  : this.getLinearTickPositions(
                      this.tickInterval,
                      this.min,
                      this.max
                    ))
              : ((e = [this.min, this.max]), k(19, !1, this.chart)),
            e.length > this.len &&
              ((e = [e[0], e.pop()]), e[0] === e[1] && (e.length = 1)),
            (this.tickPositions = e),
            g && (g = g.apply(this, [this.min, this.max]))) &&
            (this.tickPositions = e = g);
          this.paddedTicks = e.slice(0);
          this.trimTicks(e, n, l);
          this.isLinked ||
            (this.single &&
              2 > e.length &&
              !this.categories &&
              !this.series.some(function (b) {
                return (
                  b.is("heatmap") && "between" === b.options.pointPlacement
                );
              }) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            a || g || this.adjustTickAmount());
          L(this, "afterSetTickPositions");
        };
        w.prototype.trimTicks = function (b, a, e) {
          var g = b[0],
            l = b[b.length - 1],
            q = (!this.isOrdinal && this.minPointOffset) || 0;
          L(this, "trimTicks");
          if (!this.isLinked) {
            if (a && -Infinity !== g) this.min = g;
            else for (; this.min - q > b[0]; ) b.shift();
            if (e) this.max = l;
            else for (; this.max + q < b[b.length - 1]; ) b.pop();
            0 === b.length &&
              y(g) &&
              !this.options.tickPositions &&
              b.push((l + g) / 2);
          }
        };
        w.prototype.alignToOthers = function () {
          var b = {},
            a,
            e = this.options;
          !1 !== this.chart.options.chart.alignTicks &&
            e.alignTicks &&
            !1 !== e.startOnTick &&
            !1 !== e.endOnTick &&
            !this.logarithmic &&
            this.chart[this.coll].forEach(function (e) {
              var g = e.options;
              g = [e.horiz ? g.left : g.top, g.width, g.height, g.pane].join();
              e.series.length && (b[g] ? (a = !0) : (b[g] = 1));
            });
          return a;
        };
        w.prototype.getTickAmount = function () {
          var b = this.options,
            a = b.tickAmount,
            e = b.tickPixelInterval;
          !y(b.tickInterval) &&
            !a &&
            this.len < e &&
            !this.isRadial &&
            !this.logarithmic &&
            b.startOnTick &&
            b.endOnTick &&
            (a = 2);
          !a && this.alignToOthers() && (a = Math.ceil(this.len / e) + 1);
          4 > a && ((this.finalTickAmt = a), (a = 5));
          this.tickAmount = a;
        };
        w.prototype.adjustTickAmount = function () {
          var b = this.options,
            a = this.tickInterval,
            e = this.tickPositions,
            l = this.tickAmount,
            f = this.finalTickAmt,
            n = e && e.length,
            c = g(this.threshold, this.softThreshold ? 0 : null);
          if (this.hasData() && v(this.min) && v(this.max)) {
            if (n < l) {
              for (; e.length < l; )
                e.length % 2 || this.min === c
                  ? e.push(r(e[e.length - 1] + a))
                  : e.unshift(r(e[0] - a));
              this.transA *= (n - 1) / (l - 1);
              this.min = b.startOnTick ? e[0] : Math.min(this.min, e[0]);
              this.max = b.endOnTick
                ? e[e.length - 1]
                : Math.max(this.max, e[e.length - 1]);
            } else n > l && ((this.tickInterval *= 2), this.setTickPositions());
            if (y(f)) {
              for (a = b = e.length; a--; )
                ((3 === f && 1 === a % 2) || (2 >= f && 0 < a && a < b - 1)) &&
                  e.splice(a, 1);
              this.finalTickAmt = void 0;
            }
          }
        };
        w.prototype.setScale = function () {
          var b,
            a = !1,
            e = !1;
          this.series.forEach(function (b) {
            a = a || b.isDirtyData || b.isDirty;
            e = e || (b.xAxis && b.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          (b = this.len !== (this.old && this.old.len)) ||
          a ||
          e ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking && this.stacking.resetStacks(),
              (this.forceRedraw = !1),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  b ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          a && this.panningState && (this.panningState.isDirty = !0);
          L(this, "afterSetScale");
        };
        w.prototype.setExtremes = function (b, a, e, l, f) {
          var q = this,
            n = q.chart;
          e = g(e, !0);
          q.series.forEach(function (b) {
            delete b.kdTree;
          });
          f = m(f, {
            min: b,
            max: a,
          });
          L(q, "setExtremes", f, function () {
            q.userMin = b;
            q.userMax = a;
            q.eventArgs = f;
            e && n.redraw(l);
          });
        };
        w.prototype.zoom = function (b, a) {
          var e = this,
            l = this.dataMin,
            q = this.dataMax,
            f = this.options,
            n = Math.min(l, g(f.min, l)),
            v = Math.max(q, g(f.max, q));
          b = {
            newMin: b,
            newMax: a,
          };
          L(this, "zoom", b, function (b) {
            var a = b.newMin,
              g = b.newMax;
            if (a !== e.min || g !== e.max)
              e.allowZoomOutside ||
                (y(l) && (a < n && (a = n), a > v && (a = v)),
                y(q) && (g < n && (g = n), g > v && (g = v))),
                (e.displayBtn =
                  "undefined" !== typeof a || "undefined" !== typeof g),
                e.setExtremes(a, g, !1, void 0, {
                  trigger: "zoom",
                });
            b.zoomed = !0;
          });
          return b.zoomed;
        };
        w.prototype.setAxisSize = function () {
          var b = this.chart,
            a = this.options,
            e = a.offsets || [0, 0, 0, 0],
            l = this.horiz,
            f = (this.width = Math.round(
              n(g(a.width, b.plotWidth - e[3] + e[1]), b.plotWidth)
            )),
            v = (this.height = Math.round(
              n(g(a.height, b.plotHeight - e[0] + e[2]), b.plotHeight)
            )),
            c = (this.top = Math.round(
              n(g(a.top, b.plotTop + e[0]), b.plotHeight, b.plotTop)
            ));
          a = this.left = Math.round(
            n(g(a.left, b.plotLeft + e[3]), b.plotWidth, b.plotLeft)
          );
          this.bottom = b.chartHeight - v - c;
          this.right = b.chartWidth - f - a;
          this.len = Math.max(l ? f : v, 0);
          this.pos = l ? a : c;
        };
        w.prototype.getExtremes = function () {
          var b = this.logarithmic;
          return {
            min: b ? r(b.lin2log(this.min)) : this.min,
            max: b ? r(b.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        };
        w.prototype.getThreshold = function (b) {
          var a = this.logarithmic,
            e = a ? a.lin2log(this.min) : this.min;
          a = a ? a.lin2log(this.max) : this.max;
          null === b || -Infinity === b
            ? (b = e)
            : Infinity === b
            ? (b = a)
            : e > b
            ? (b = e)
            : a < b && (b = a);
          return this.translate(b, 0, 1, 0, 1);
        };
        w.prototype.autoLabelAlign = function (b) {
          var a = (g(b, 0) - 90 * this.side + 720) % 360;
          b = {
            align: "center",
          };
          L(this, "autoLabelAlign", b, function (b) {
            15 < a && 165 > a
              ? (b.align = "right")
              : 195 < a && 345 > a && (b.align = "left");
          });
          return b.align;
        };
        w.prototype.tickSize = function (b) {
          var a = this.options,
            e = a["tick" === b ? "tickLength" : "minorTickLength"],
            l = g(
              a["tick" === b ? "tickWidth" : "minorTickWidth"],
              "tick" === b && this.isXAxis && !this.categories ? 1 : 0
            );
          if (l && e) {
            "inside" === a[b + "Position"] && (e = -e);
            var f = [e, l];
          }
          b = {
            tickSize: f,
          };
          L(this, "afterTickSize", b);
          return b.tickSize;
        };
        w.prototype.labelMetrics = function () {
          var b = (this.tickPositions && this.tickPositions[0]) || 0;
          return this.chart.renderer.fontMetrics(
            this.options.labels.style.fontSize,
            this.ticks[b] && this.ticks[b].label
          );
        };
        w.prototype.unsquish = function () {
          var b = this.options.labels,
            a = this.horiz,
            e = this.tickInterval,
            l = e,
            f =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / e),
            n,
            c = b.rotation,
            k = this.labelMetrics(),
            C,
            E = Number.MAX_VALUE,
            t = Math.max(this.max - this.min, 0),
            w = function (b) {
              var a = b / (f || 1);
              a = 1 < a ? Math.ceil(a) : 1;
              a * e > t &&
                Infinity !== b &&
                Infinity !== f &&
                t &&
                (a = Math.ceil(t / e));
              return r(a * e);
            };
          if (a) {
            if (!b.staggerLines && !b.step)
              if (v(c)) var H = [c];
              else f < b.autoRotationLimit && (H = b.autoRotation);
            H &&
              H.forEach(function (b) {
                if (b === c || (b && -90 <= b && 90 >= b)) {
                  C = w(Math.abs(k.h / Math.sin(x * b)));
                  var a = C + Math.abs(b / 360);
                  a < E && ((E = a), (n = b), (l = C));
                }
              });
          } else b.step || (l = w(k.h));
          this.autoRotation = H;
          this.labelRotation = g(n, v(c) ? c : 0);
          return l;
        };
        w.prototype.getSlotWidth = function (b) {
          var a = this.chart,
            e = this.horiz,
            g = this.options.labels,
            l = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            f = a.margin[3];
          if (b && v(b.slotWidth)) return b.slotWidth;
          if (e && 2 > g.step)
            return g.rotation ? 0 : ((this.staggerLines || 1) * this.len) / l;
          if (!e) {
            b = g.style.width;
            if (void 0 !== b) return parseInt(String(b), 10);
            if (f) return f - a.spacing[3];
          }
          return 0.33 * a.chartWidth;
        };
        w.prototype.renderUnsquish = function () {
          var a = this.chart,
            e = a.renderer,
            g = this.tickPositions,
            l = this.ticks,
            f = this.options.labels,
            n = f.style,
            v = this.horiz,
            c = this.getSlotWidth(),
            k = Math.max(1, Math.round(c - 2 * f.padding)),
            C = {},
            x = this.labelMetrics(),
            E = n.textOverflow,
            t = 0;
          b(f.rotation) || (C.rotation = f.rotation || 0);
          g.forEach(function (b) {
            b = l[b];
            b.movedLabel && b.replaceMovedLabel();
            b &&
              b.label &&
              b.label.textPxLength > t &&
              (t = b.label.textPxLength);
          });
          this.maxLabelLength = t;
          if (this.autoRotation)
            t > k && t > x.h
              ? (C.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (c) {
            var w = k;
            if (!E) {
              var H = "clip";
              for (k = g.length; !v && k--; ) {
                var m = g[k];
                if ((m = l[m].label))
                  m.styles && "ellipsis" === m.styles.textOverflow
                    ? m.css({
                        textOverflow: "clip",
                      })
                    : m.textPxLength > c &&
                      m.css({
                        width: c + "px",
                      }),
                    m.getBBox().height > this.len / g.length - (x.h - x.f) &&
                      (m.specificTextOverflow = "ellipsis");
              }
            }
          }
          C.rotation &&
            ((w = t > 0.5 * a.chartHeight ? 0.33 * a.chartHeight : t),
            E || (H = "ellipsis"));
          if (
            (this.labelAlign =
              f.align || this.autoLabelAlign(this.labelRotation))
          )
            C.align = this.labelAlign;
          g.forEach(function (b) {
            var a = (b = l[b]) && b.label,
              e = n.width,
              g = {};
            a &&
              (a.attr(C),
              b.shortenLabel
                ? b.shortenLabel()
                : w &&
                  !e &&
                  "nowrap" !== n.whiteSpace &&
                  (w < a.textPxLength || "SPAN" === a.element.tagName)
                ? ((g.width = w + "px"),
                  E || (g.textOverflow = a.specificTextOverflow || H),
                  a.css(g))
                : a.styles &&
                  a.styles.width &&
                  !g.width &&
                  !e &&
                  a.css({
                    width: null,
                  }),
              delete a.specificTextOverflow,
              (b.rotation = C.rotation));
          }, this);
          this.tickRotCorr = e.rotCorr(
            x.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        };
        w.prototype.hasData = function () {
          return (
            this.series.some(function (b) {
              return b.hasData();
            }) ||
            (this.options.showEmpty && y(this.min) && y(this.max))
          );
        };
        w.prototype.addTitle = function (b) {
          var a = this.chart.renderer,
            e = this.horiz,
            g = this.opposite,
            l = this.options.title,
            f,
            n = this.chart.styledMode;
          this.axisTitle ||
            ((f = l.textAlign) ||
              (f = (
                e
                  ? {
                      low: "left",
                      middle: "center",
                      high: "right",
                    }
                  : {
                      low: g ? "right" : "left",
                      middle: "center",
                      high: g ? "left" : "right",
                    }
              )[l.align]),
            (this.axisTitle = a
              .text(l.text || "", 0, 0, l.useHTML)
              .attr({
                zIndex: 7,
                rotation: l.rotation,
                align: f,
              })
              .addClass("highcharts-axis-title")),
            n || this.axisTitle.css(E(l.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          n ||
            l.style.width ||
            this.isRadial ||
            this.axisTitle.css({
              width: this.len + "px",
            });
          this.axisTitle[b ? "show" : "hide"](b);
        };
        w.prototype.generateTick = function (b) {
          var a = this.ticks;
          a[b] ? a[b].addLabel() : (a[b] = new M(this, b));
        };
        w.prototype.getOffset = function () {
          var b = this,
            a = this,
            e = a.chart,
            l = e.renderer,
            f = a.options,
            n = a.tickPositions,
            v = a.ticks,
            c = a.horiz,
            k = a.side,
            C = e.inverted && !a.isZAxis ? [1, 0, 3, 2][k] : k,
            x,
            E = 0,
            t = 0,
            w = f.title,
            m = f.labels,
            P = 0,
            p = e.axisOffset;
          e = e.clipOffset;
          var A = [-1, 1, 1, -1][k],
            r = f.className,
            u = a.axisParent;
          var B = a.hasData();
          a.showAxis = x = B || f.showEmpty;
          a.staggerLines = (a.horiz && m.staggerLines) || void 0;
          if (!a.axisGroup) {
            var h = function (a, e, g) {
              return l
                .g(a)
                .attr({
                  zIndex: g,
                })
                .addClass(
                  "highcharts-" +
                    b.coll.toLowerCase() +
                    e +
                    " " +
                    (b.isRadial ? "highcharts-radial-axis" + e + " " : "") +
                    (r || "")
                )
                .add(u);
            };
            a.gridGroup = h("grid", "-grid", f.gridZIndex);
            a.axisGroup = h("axis", "", f.zIndex);
            a.labelGroup = h("axis-labels", "-labels", m.zIndex);
          }
          B || a.isLinked
            ? (n.forEach(function (b, e) {
                a.generateTick(b, e);
              }),
              a.renderUnsquish(),
              (a.reserveSpaceDefault =
                0 === k ||
                2 === k ||
                {
                  1: "left",
                  3: "right",
                }[k] === a.labelAlign),
              g(
                m.reserveSpace,
                "center" === a.labelAlign ? !0 : null,
                a.reserveSpaceDefault
              ) &&
                n.forEach(function (b) {
                  P = Math.max(v[b].getLabelSize(), P);
                }),
              a.staggerLines && (P *= a.staggerLines),
              (a.labelOffset = P * (a.opposite ? -1 : 1)))
            : H(v, function (b, a) {
                b.destroy();
                delete v[a];
              });
          if (
            w &&
            w.text &&
            !1 !== w.enabled &&
            (a.addTitle(x), x && !1 !== w.reserveSpace)
          ) {
            a.titleOffset = E = a.axisTitle.getBBox()[c ? "height" : "width"];
            var d = w.offset;
            t = y(d) ? 0 : g(w.margin, c ? 5 : 10);
          }
          a.renderLine();
          a.offset = A * g(f.offset, p[k] ? p[k] + (f.margin || 0) : 0);
          a.tickRotCorr = a.tickRotCorr || {
            x: 0,
            y: 0,
          };
          w = 0 === k ? -a.labelMetrics().h : 2 === k ? a.tickRotCorr.y : 0;
          t = Math.abs(P) + t;
          P && (t = t - w + A * (c ? g(m.y, a.tickRotCorr.y + 8 * A) : m.x));
          a.axisTitleMargin = g(d, t);
          a.getMaxLabelDimensions &&
            (a.maxLabelDimensions = a.getMaxLabelDimensions(v, n));
          c = this.tickSize("tick");
          p[k] = Math.max(
            p[k],
            (a.axisTitleMargin || 0) + E + A * a.offset,
            t,
            n && n.length && c ? c[0] + A * a.offset : 0
          );
          f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
          e[C] = Math.max(e[C], f);
          L(this, "afterGetOffset");
        };
        w.prototype.getLinePath = function (b) {
          var a = this.chart,
            e = this.opposite,
            g = this.offset,
            l = this.horiz,
            f = this.left + (e ? this.width : 0) + g;
          g = a.chartHeight - this.bottom - (e ? this.height : 0) + g;
          e && (b *= -1);
          return a.renderer.crispLine(
            [
              ["M", l ? this.left : f, l ? g : this.top],
              [
                "L",
                l ? a.chartWidth - this.right : f,
                l ? g : a.chartHeight - this.bottom,
              ],
            ],
            b
          );
        };
        w.prototype.renderLine = function () {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass("highcharts-axis-line")
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                "stroke-width": this.options.lineWidth,
                zIndex: 7,
              }));
        };
        w.prototype.getTitlePosition = function () {
          var b = this.horiz,
            a = this.left,
            e = this.top,
            g = this.len,
            l = this.options.title,
            f = b ? a : e,
            n = this.opposite,
            v = this.offset,
            c = l.x,
            k = l.y,
            C = this.axisTitle,
            x = this.chart.renderer.fontMetrics(l.style.fontSize, C);
          C = Math.max(C.getBBox(null, 0).height - x.h - 1, 0);
          g = {
            low: f + (b ? 0 : g),
            middle: f + g / 2,
            high: f + (b ? g : 0),
          }[l.align];
          a =
            (b ? e + this.height : a) +
            (b ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin +
            [-C, C, x.f, -C][this.side];
          b = {
            x: b ? g + c : a + (n ? this.width : 0) + v + c,
            y: b ? a + k - (n ? this.height : 0) + v : g + k,
          };
          L(this, "afterGetTitlePosition", {
            titlePosition: b,
          });
          return b;
        };
        w.prototype.renderMinorTick = function (b) {
          var a = this.chart.hasRendered && this.old,
            e = this.minorTicks;
          e[b] || (e[b] = new M(this, b, "minor"));
          a && e[b].isNew && e[b].render(null, !0);
          e[b].render(null, !1, 1);
        };
        w.prototype.renderTick = function (b, a) {
          var e = this.ticks,
            g = this.chart.hasRendered && this.old;
          if (
            !this.isLinked ||
            (b >= this.min && b <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            e[b] || (e[b] = new M(this, b)),
              g && e[b].isNew && e[b].render(a, !0, -1),
              e[b].render(a);
        };
        w.prototype.render = function () {
          var b = this,
            a = b.chart,
            e = b.logarithmic,
            g = b.options,
            l = b.isLinked,
            f = b.tickPositions,
            n = b.axisTitle,
            c = b.ticks,
            k = b.minorTicks,
            x = b.alternateBands,
            E = g.stackLabels,
            t = g.alternateGridColor,
            w = b.tickmarkOffset,
            m = b.axisLine,
            P = b.showAxis,
            p = I(a.renderer.globalAnimation),
            A,
            y;
          b.labelEdge.length = 0;
          b.overlap = !1;
          [c, k, x].forEach(function (b) {
            H(b, function (b) {
              b.isActive = !1;
            });
          });
          if (b.hasData() || l)
            b.minorTickInterval &&
              !b.categories &&
              b.getMinorTickPositions().forEach(function (a) {
                b.renderMinorTick(a);
              }),
              f.length &&
                (f.forEach(function (a, e) {
                  b.renderTick(a, e);
                }),
                w &&
                  (0 === b.min || b.single) &&
                  (c[-1] || (c[-1] = new M(b, -1, null, !0)),
                  c[-1].render(-1))),
              t &&
                f.forEach(function (g, l) {
                  y =
                    "undefined" !== typeof f[l + 1] ? f[l + 1] + w : b.max - w;
                  0 === l % 2 &&
                    g < b.max &&
                    y <= b.max + (a.polar ? -w : w) &&
                    (x[g] || (x[g] = new K.PlotLineOrBand(b)),
                    (A = g + w),
                    (x[g].options = {
                      from: e ? e.lin2log(A) : A,
                      to: e ? e.lin2log(y) : y,
                      color: t,
                      className: "highcharts-alternate-grid",
                    }),
                    x[g].render(),
                    (x[g].isActive = !0));
                }),
              b._addedPlotLB ||
                ((b._addedPlotLB = !0),
                (g.plotLines || [])
                  .concat(g.plotBands || [])
                  .forEach(function (a) {
                    b.addPlotBandOrLine(a);
                  }));
          [c, k, x].forEach(function (b) {
            var e,
              g = [],
              l = p.duration;
            H(b, function (b, a) {
              b.isActive || (b.render(a, !1, 0), (b.isActive = !1), g.push(a));
            });
            C(
              function () {
                for (e = g.length; e--; )
                  b[g[e]] &&
                    !b[g[e]].isActive &&
                    (b[g[e]].destroy(), delete b[g[e]]);
              },
              b !== x && a.hasRendered && l ? l : 0
            );
          });
          m &&
            (m[m.isPlaced ? "animate" : "attr"]({
              d: this.getLinePath(m.strokeWidth()),
            }),
            (m.isPlaced = !0),
            m[P ? "show" : "hide"](P));
          n &&
            P &&
            ((g = b.getTitlePosition()),
            v(g.y)
              ? (n[n.isNew ? "attr" : "animate"](g), (n.isNew = !1))
              : (n.attr("y", -9999), (n.isNew = !0)));
          E && E.enabled && b.stacking && b.stacking.renderStackTotals();
          b.old = {
            len: b.len,
            max: b.max,
            min: b.min,
            transA: b.transA,
            userMax: b.userMax,
            userMin: b.userMin,
          };
          b.isDirty = !1;
          L(this, "afterRender");
        };
        w.prototype.redraw = function () {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (b) {
              b.render();
            }));
          this.series.forEach(function (b) {
            b.isDirty = !0;
          });
        };
        w.prototype.getKeepProps = function () {
          return this.keepProps || w.keepProps;
        };
        w.prototype.destroy = function (b) {
          var a = this,
            g = a.plotLinesAndBands,
            l;
          L(this, "destroy", {
            keepEvents: b,
          });
          b || e(a);
          [a.ticks, a.minorTicks, a.alternateBands].forEach(function (b) {
            p(b);
          });
          if (g) for (b = g.length; b--; ) g[b].destroy();
          "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
            .split(" ")
            .forEach(function (b) {
              a[b] && (a[b] = a[b].destroy());
            });
          for (l in a.plotLinesAndBandsGroups)
            a.plotLinesAndBandsGroups[l] =
              a.plotLinesAndBandsGroups[l].destroy();
          H(a, function (b, e) {
            -1 === a.getKeepProps().indexOf(e) && delete a[e];
          });
        };
        w.prototype.drawCrosshair = function (b, a) {
          var e = this.crosshair,
            l = g(e && e.snap, !0),
            f,
            n = this.cross,
            q = this.chart;
          L(this, "drawCrosshair", {
            e: b,
            point: a,
          });
          b || (b = this.cross && this.cross.e);
          if (e && !1 !== (y(a) || !l)) {
            l
              ? y(a) &&
                (f = g(
                  "colorAxis" !== this.coll ? a.crosshairPos : null,
                  this.isXAxis ? a.plotX : this.len - a.plotY
                ))
              : (f =
                  b &&
                  (this.horiz
                    ? b.chartX - this.pos
                    : this.len - b.chartY + this.pos));
            if (y(f)) {
              var v = {
                value: a && (this.isXAxis ? a.x : g(a.stackY, a.y)),
                translatedValue: f,
              };
              q.polar &&
                m(v, {
                  isCrosshair: !0,
                  chartX: b && b.chartX,
                  chartY: b && b.chartY,
                  point: a,
                });
              v = this.getPlotLinePath(v) || null;
            }
            if (!y(v)) {
              this.hideCrosshair();
              return;
            }
            l = this.categories && !this.isRadial;
            n ||
              ((this.cross = n =
                q.renderer
                  .path()
                  .addClass(
                    "highcharts-crosshair highcharts-crosshair-" +
                      (l ? "category " : "thin ") +
                      (e.className || "")
                  )
                  .attr({
                    zIndex: g(e.zIndex, 2),
                  })
                  .add()),
              q.styledMode ||
                (n
                  .attr({
                    stroke:
                      e.color ||
                      (l
                        ? h.parse(F.highlightColor20).setOpacity(0.25).get()
                        : F.neutralColor20),
                    "stroke-width": g(e.width, 1),
                  })
                  .css({
                    "pointer-events": "none",
                  }),
                e.dashStyle &&
                  n.attr({
                    dashstyle: e.dashStyle,
                  })));
            n.show().attr({
              d: v,
            });
            l &&
              !e.width &&
              n.attr({
                "stroke-width": this.transA,
              });
            this.cross.e = b;
          } else this.hideCrosshair();
          L(this, "afterDrawCrosshair", {
            e: b,
            point: a,
          });
        };
        w.prototype.hideCrosshair = function () {
          this.cross && this.cross.hide();
          L(this, "afterHideCrosshair");
        };
        w.prototype.hasVerticalPanning = function () {
          var b = this.chart.options.chart.panning;
          return !!(b && b.enabled && /y/.test(b.type));
        };
        w.prototype.validatePositiveValue = function (b) {
          return v(b) && 0 < b;
        };
        w.prototype.update = function (b, a) {
          var e = this.chart,
            l = (b && b.events) || {};
          b = E(this.userOptions, b);
          H(e.options[this.coll].events, function (b, a) {
            "undefined" === typeof l[a] && (l[a] = void 0);
          });
          this.destroy(!0);
          this.init(
            e,
            m(b, {
              events: l,
            })
          );
          e.isDirtyBox = !0;
          g(a, !0) && e.redraw();
        };
        w.prototype.remove = function (b) {
          for (
            var a = this.chart, e = this.coll, l = this.series, f = l.length;
            f--;

          )
            l[f] && l[f].remove(!1);
          O(a.axes, this);
          O(a[e], this);
          a[e].forEach(function (b, a) {
            b.options.index = b.userOptions.index = a;
          });
          this.destroy();
          a.isDirtyBox = !0;
          g(b, !0) && a.redraw();
        };
        w.prototype.setTitle = function (b, a) {
          this.update(
            {
              title: b,
            },
            a
          );
        };
        w.prototype.setCategories = function (b, a) {
          this.update(
            {
              categories: b,
            },
            a
          );
        };
        w.defaultOptions = {
          alignTicks: !0,
          allowDecimals: void 0,
          zIndex: 2,
          zoomEnabled: !0,
          dateTimeLabelFormats: {
            millisecond: {
              main: "%H:%M:%S.%L",
              range: !1,
            },
            second: {
              main: "%H:%M:%S",
              range: !1,
            },
            minute: {
              main: "%H:%M",
              range: !1,
            },
            hour: {
              main: "%H:%M",
              range: !1,
            },
            day: {
              main: "%e. %b",
            },
            week: {
              main: "%e. %b",
            },
            month: {
              main: "%b '%y",
            },
            year: {
              main: "%Y",
            },
          },
          endOnTick: !1,
          gridLineDashStyle: "Solid",
          gridZIndex: 1,
          labels: {
            autoRotation: void 0,
            autoRotationLimit: 80,
            distance: void 0,
            enabled: !0,
            indentation: 10,
            overflow: "justify",
            padding: 5,
            reserveSpace: void 0,
            rotation: void 0,
            staggerLines: 0,
            step: 0,
            useHTML: !1,
            x: 0,
            zIndex: 7,
            style: {
              color: F.neutralColor60,
              cursor: "default",
              fontSize: "11px",
            },
          },
          maxPadding: 0.01,
          minorGridLineDashStyle: "Solid",
          minorTickLength: 2,
          minorTickPosition: "outside",
          minPadding: 0.01,
          offset: void 0,
          opposite: !1,
          reversed: void 0,
          reversedStacks: !1,
          showEmpty: !0,
          showFirstLabel: !0,
          showLastLabel: !0,
          startOfWeek: 1,
          startOnTick: !1,
          tickLength: 10,
          tickPixelInterval: 100,
          tickmarkPlacement: "between",
          tickPosition: "outside",
          title: {
            align: "middle",
            rotation: 0,
            useHTML: !1,
            x: 0,
            y: 0,
            style: {
              color: F.neutralColor60,
            },
          },
          type: "linear",
          uniqueNames: !0,
          visible: !0,
          minorGridLineColor: F.neutralColor5,
          minorGridLineWidth: 1,
          minorTickColor: F.neutralColor40,
          lineColor: F.highlightColor20,
          lineWidth: 1,
          gridLineColor: F.neutralColor10,
          gridLineWidth: void 0,
          tickColor: F.highlightColor20,
        };
        w.defaultYAxisOptions = {
          reversedStacks: !0,
          endOnTick: !0,
          maxPadding: 0.05,
          minPadding: 0.05,
          tickPixelInterval: 72,
          showLastLabel: !0,
          labels: {
            x: -8,
          },
          startOnTick: !0,
          title: {
            rotation: 270,
            text: "Values",
          },
          stackLabels: {
            animation: {},
            allowOverlap: !1,
            enabled: !1,
            crop: !0,
            overflow: "justify",
            formatter: function () {
              var b = this.axis.chart.numberFormatter;
              return b(this.total, -1);
            },
            style: {
              color: F.neutralColor100,
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
          gridLineWidth: 1,
          lineWidth: 0,
        };
        w.defaultLeftAxisOptions = {
          labels: {
            x: -15,
          },
          title: {
            rotation: 270,
          },
        };
        w.defaultRightAxisOptions = {
          labels: {
            x: 15,
          },
          title: {
            rotation: 90,
          },
        };
        w.defaultBottomAxisOptions = {
          labels: {
            autoRotation: [-45],
            x: 0,
          },
          margin: 15,
          title: {
            rotation: 0,
          },
        };
        w.defaultTopAxisOptions = {
          labels: {
            autoRotation: [-45],
            x: 0,
          },
          margin: 15,
          title: {
            rotation: 0,
          },
        };
        w.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
        return w;
      })();
      K.Axis = d;
      return K.Axis;
    }
  );
  Q(
    d,
    "Core/Axis/DateTimeAxis.js",
    [d["Core/Axis/Axis.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = h.addEvent,
        F = h.getMagnitude,
        J = h.normalizeTickInterval,
        M = h.timeUnits,
        G = (function () {
          function h(h) {
            this.axis = h;
          }
          h.prototype.normalizeTimeTickInterval = function (h, B) {
            var u = B || [
              ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
              ["second", [1, 2, 5, 10, 15, 30]],
              ["minute", [1, 2, 5, 10, 15, 30]],
              ["hour", [1, 2, 3, 4, 6, 8, 12]],
              ["day", [1, 2]],
              ["week", [1, 2]],
              ["month", [1, 2, 3, 4, 6]],
              ["year", null],
            ];
            B = u[u.length - 1];
            var c = M[B[0]],
              a = B[1],
              r;
            for (
              r = 0;
              r < u.length &&
              !((B = u[r]),
              (c = M[B[0]]),
              (a = B[1]),
              u[r + 1] && h <= (c * a[a.length - 1] + M[u[r + 1][0]]) / 2);
              r++
            );
            c === M.year && h < 5 * c && (a = [1, 2, 5]);
            h = J(h / c, a, "year" === B[0] ? Math.max(F(h / c), 1) : 1);
            return {
              unitRange: c,
              count: h,
              unitName: B[0],
            };
          };
          return h;
        })();
      h = (function () {
        function h() {}
        h.compose = function (h) {
          h.keepProps.push("dateTime");
          h.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(
              this.chart.time,
              arguments
            );
          };
          N(h, "init", function (h) {
            "datetime" !== h.userOptions.type
              ? (this.dateTime = void 0)
              : this.dateTime || (this.dateTime = new G(this));
          });
        };
        h.AdditionsClass = G;
        return h;
      })();
      h.compose(d);
      return h;
    }
  );
  Q(
    d,
    "Core/Axis/LogarithmicAxis.js",
    [d["Core/Axis/Axis.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = h.addEvent,
        F = h.getMagnitude,
        J = h.normalizeTickInterval,
        M = h.pick,
        G = (function () {
          function h(h) {
            this.axis = h;
          }
          h.prototype.getLogTickPositions = function (h, d, u, c) {
            var a = this.axis,
              r = a.len,
              y = a.options,
              p = [];
            c || (this.minorAutoInterval = void 0);
            if (0.5 <= h)
              (h = Math.round(h)), (p = a.getLinearTickPositions(h, d, u));
            else if (0.08 <= h) {
              var B = Math.floor(d),
                k,
                m = (y = void 0);
              for (
                r =
                  0.3 < h
                    ? [1, 2, 4]
                    : 0.15 < h
                    ? [1, 2, 4, 6, 8]
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9];
                B < u + 1 && !m;
                B++
              ) {
                var L = r.length;
                for (k = 0; k < L && !m; k++) {
                  var A = this.log2lin(this.lin2log(B) * r[k]);
                  A > d &&
                    (!c || y <= u) &&
                    "undefined" !== typeof y &&
                    p.push(y);
                  y > u && (m = !0);
                  y = A;
                }
              }
            } else
              (d = this.lin2log(d)),
                (u = this.lin2log(u)),
                (h = c ? a.getMinorTickInterval() : y.tickInterval),
                (h = M(
                  "auto" === h ? null : h,
                  this.minorAutoInterval,
                  ((y.tickPixelInterval / (c ? 5 : 1)) * (u - d)) /
                    ((c ? r / a.tickPositions.length : r) || 1)
                )),
                (h = J(h, void 0, F(h))),
                (p = a.getLinearTickPositions(h, d, u).map(this.log2lin)),
                c || (this.minorAutoInterval = h / 5);
            c || (a.tickInterval = h);
            return p;
          };
          h.prototype.lin2log = function (h) {
            return Math.pow(10, h);
          };
          h.prototype.log2lin = function (h) {
            return Math.log(h) / Math.LN10;
          };
          return h;
        })();
      h = (function () {
        function h() {}
        h.compose = function (h) {
          h.keepProps.push("logarithmic");
          N(h, "init", function (h) {
            var u = this.logarithmic;
            "logarithmic" !== h.userOptions.type
              ? (this.logarithmic = void 0)
              : u || (this.logarithmic = new G(this));
          });
          N(h, "afterInit", function () {
            var h = this.logarithmic;
            h &&
              ((this.lin2val = function (u) {
                return h.lin2log(u);
              }),
              (this.val2lin = function (u) {
                return h.log2lin(u);
              }));
          });
        };
        return h;
      })();
      h.compose(d);
      return h;
    }
  );
  Q(
    d,
    "Core/Axis/PlotLineOrBand.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var N = F.arrayMax,
        M = F.arrayMin,
        G = F.defined,
        I = F.destroyObjectProperties,
        D = F.erase,
        B = F.extend,
        u = F.fireEvent,
        c = F.isNumber,
        a = F.merge,
        r = F.objectEach,
        y = F.pick;
      F = (function () {
        function c(a, c) {
          this.axis = a;
          c && ((this.options = c), (this.id = c.id));
        }
        c.prototype.render = function () {
          u(this, "render");
          var c = this,
            k = c.axis,
            m = k.horiz,
            p = k.logarithmic,
            A = c.options,
            t = A.label,
            f = c.label,
            v = A.to,
            b = A.from,
            E = A.value,
            P = G(b) && G(v),
            H = G(E),
            g = c.svgElem,
            n = !g,
            e = [],
            l = A.color,
            C = y(A.zIndex, 0),
            x = A.events;
          e = {
            class:
              "highcharts-plot-" +
              (P ? "band " : "line ") +
              (A.className || ""),
          };
          var w = {},
            q = k.chart.renderer,
            z = P ? "bands" : "lines";
          p && ((b = p.log2lin(b)), (v = p.log2lin(v)), (E = p.log2lin(E)));
          k.chart.styledMode ||
            (H
              ? ((e.stroke = l || K.neutralColor40),
                (e["stroke-width"] = y(A.width, 1)),
                A.dashStyle && (e.dashstyle = A.dashStyle))
              : P &&
                ((e.fill = l || K.highlightColor10),
                A.borderWidth &&
                  ((e.stroke = A.borderColor),
                  (e["stroke-width"] = A.borderWidth))));
          w.zIndex = C;
          z += "-" + C;
          (p = k.plotLinesAndBandsGroups[z]) ||
            (k.plotLinesAndBandsGroups[z] = p =
              q
                .g("plot-" + z)
                .attr(w)
                .add());
          n && (c.svgElem = g = q.path().attr(e).add(p));
          if (H)
            e = k.getPlotLinePath({
              value: E,
              lineWidth: g.strokeWidth(),
              acrossPanes: A.acrossPanes,
            });
          else if (P) e = k.getPlotBandPath(b, v, A);
          else return;
          !c.eventsAdded &&
            x &&
            (r(x, function (b, a) {
              g.on(a, function (b) {
                x[a].apply(c, [b]);
              });
            }),
            (c.eventsAdded = !0));
          (n || !g.d) && e && e.length
            ? g.attr({
                d: e,
              })
            : g &&
              (e
                ? (g.show(!0),
                  g.animate({
                    d: e,
                  }))
                : g.d && (g.hide(), f && (c.label = f = f.destroy())));
          t &&
          (G(t.text) || G(t.formatter)) &&
          e &&
          e.length &&
          0 < k.width &&
          0 < k.height &&
          !e.isFlat
            ? ((t = a(
                {
                  align: m && P && "center",
                  x: m ? !P && 4 : 10,
                  verticalAlign: !m && P && "middle",
                  y: m ? (P ? 16 : 10) : P ? 6 : -4,
                  rotation: m && !P && 90,
                },
                t
              )),
              this.renderLabel(t, e, P, C))
            : f && f.hide();
          return c;
        };
        c.prototype.renderLabel = function (a, c, m, p) {
          var k = this.label,
            t = this.axis.chart.renderer;
          k ||
            ((k = {
              align: a.textAlign || a.align,
              rotation: a.rotation,
              class:
                "highcharts-plot-" +
                (m ? "band" : "line") +
                "-label " +
                (a.className || ""),
            }),
            (k.zIndex = p),
            (p = this.getLabelText(a)),
            (this.label = k = t.text(p, 0, 0, a.useHTML).attr(k).add()),
            this.axis.chart.styledMode || k.css(a.style));
          t = c.xBounds || [c[0][1], c[1][1], m ? c[2][1] : c[0][1]];
          c = c.yBounds || [c[0][2], c[1][2], m ? c[2][2] : c[0][2]];
          m = M(t);
          p = M(c);
          k.align(a, !1, {
            x: m,
            y: p,
            width: N(t) - m,
            height: N(c) - p,
          });
          k.show(!0);
        };
        c.prototype.getLabelText = function (a) {
          return G(a.formatter) ? a.formatter.call(this) : a.text;
        };
        c.prototype.destroy = function () {
          D(this.axis.plotLinesAndBands, this);
          delete this.axis;
          I(this);
        };
        return c;
      })();
      B(d.prototype, {
        getPlotBandPath: function (a, h, k) {
          void 0 === k && (k = this.options);
          var m = this.getPlotLinePath({
            value: h,
            force: !0,
            acrossPanes: k.acrossPanes,
          });
          k = this.getPlotLinePath({
            value: a,
            force: !0,
            acrossPanes: k.acrossPanes,
          });
          var p = [],
            A = this.horiz,
            t = 1;
          a =
            !c(this.min) ||
            !c(this.max) ||
            (a < this.min && h < this.min) ||
            (a > this.max && h > this.max);
          if (k && m) {
            if (a) {
              var f = k.toString() === m.toString();
              t = 0;
            }
            for (a = 0; a < k.length; a += 2) {
              h = k[a];
              var v = k[a + 1],
                b = m[a],
                E = m[a + 1];
              ("M" !== h[0] && "L" !== h[0]) ||
                ("M" !== v[0] && "L" !== v[0]) ||
                ("M" !== b[0] && "L" !== b[0]) ||
                ("M" !== E[0] && "L" !== E[0]) ||
                (A && b[1] === h[1]
                  ? ((b[1] += t), (E[1] += t))
                  : A || b[2] !== h[2] || ((b[2] += t), (E[2] += t)),
                p.push(
                  ["M", h[1], h[2]],
                  ["L", v[1], v[2]],
                  ["L", E[1], E[2]],
                  ["L", b[1], b[2]],
                  ["Z"]
                ));
              p.isFlat = f;
            }
          }
          return p;
        },
        addPlotBand: function (a) {
          return this.addPlotBandOrLine(a, "plotBands");
        },
        addPlotLine: function (a) {
          return this.addPlotBandOrLine(a, "plotLines");
        },
        addPlotBandOrLine: function (a, c) {
          var k = this,
            m = new h.PlotLineOrBand(this, a),
            p = this.userOptions;
          this.visible && (m = m.render());
          if (m) {
            this._addedPlotLB ||
              ((this._addedPlotLB = !0),
              (p.plotLines || [])
                .concat(p.plotBands || [])
                .forEach(function (a) {
                  k.addPlotBandOrLine(a);
                }));
            if (c) {
              var A = p[c] || [];
              A.push(a);
              p[c] = A;
            }
            this.plotLinesAndBands.push(m);
          }
          return m;
        },
        removePlotBandOrLine: function (a) {
          for (
            var c = this.plotLinesAndBands,
              k = this.options,
              m = this.userOptions,
              p = c.length;
            p--;

          )
            c[p].id === a && c[p].destroy();
          [
            k.plotLines || [],
            m.plotLines || [],
            k.plotBands || [],
            m.plotBands || [],
          ].forEach(function (c) {
            for (p = c.length; p--; ) (c[p] || {}).id === a && D(c, c[p]);
          });
        },
        removePlotBand: function (a) {
          this.removePlotBandOrLine(a);
        },
        removePlotLine: function (a) {
          this.removePlotBandOrLine(a);
        },
      });
      h.PlotLineOrBand = F;
      return h.PlotLineOrBand;
    }
  );
  Q(
    d,
    "Core/Tooltip.js",
    [
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var N = d.format,
        M = h.doc,
        G = F.clamp,
        I = F.css,
        D = F.defined,
        B = F.discardElement,
        u = F.extend,
        c = F.fireEvent,
        a = F.isArray,
        r = F.isNumber,
        y = F.isString,
        p = F.merge,
        O = F.pick,
        k = F.splat,
        m = F.syncTimeout,
        L = F.timeUnits;
      ("");
      d = (function () {
        function A(a, f) {
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = a;
          this.init(a, f);
        }
        A.prototype.applyFilter = function () {
          var a = this.chart;
          a.renderer.definition({
            tagName: "filter",
            attributes: {
              id: "drop-shadow-" + a.index,
              opacity: 0.5,
            },
            children: [
              {
                tagName: "feGaussianBlur",
                attributes: {
                  in: "SourceAlpha",
                  stdDeviation: 1,
                },
              },
              {
                tagName: "feOffset",
                attributes: {
                  dx: 1,
                  dy: 1,
                },
              },
              {
                tagName: "feComponentTransfer",
                children: [
                  {
                    tagName: "feFuncA",
                    attributes: {
                      type: "linear",
                      slope: 0.3,
                    },
                  },
                ],
              },
              {
                tagName: "feMerge",
                children: [
                  {
                    tagName: "feMergeNode",
                  },
                  {
                    tagName: "feMergeNode",
                    attributes: {
                      in: "SourceGraphic",
                    },
                  },
                ],
              },
            ],
          });
          a.renderer.definition({
            tagName: "style",
            textContent:
              ".highcharts-tooltip-" +
              a.index +
              "{filter:url(#drop-shadow-" +
              a.index +
              ")}",
          });
        };
        A.prototype.bodyFormatter = function (a) {
          return a.map(function (a) {
            var f = a.series.tooltipOptions;
            return (
              f[(a.point.formatPrefix || "point") + "Formatter"] ||
              a.point.tooltipFormatter
            ).call(
              a.point,
              f[(a.point.formatPrefix || "point") + "Format"] || ""
            );
          });
        };
        A.prototype.cleanSplit = function (a) {
          this.chart.series.forEach(function (f) {
            var c = f && f.tt;
            c && (!c.isActive || a ? (f.tt = c.destroy()) : (c.isActive = !1));
          });
        };
        A.prototype.defaultFormatter = function (a) {
          var f = this.points || k(this);
          var c = [a.tooltipFooterHeaderFormatter(f[0])];
          c = c.concat(a.bodyFormatter(f));
          c.push(a.tooltipFooterHeaderFormatter(f[0], !0));
          return c;
        };
        A.prototype.destroy = function () {
          this.label && (this.label = this.label.destroy());
          this.split &&
            this.tt &&
            (this.cleanSplit(this.chart, !0), (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), B(this.container));
          F.clearTimeout(this.hideTimer);
          F.clearTimeout(this.tooltipTimeout);
        };
        A.prototype.getAnchor = function (a, f) {
          var c = this.chart;
          var b = c.pointer;
          var E = c.inverted,
            t = c.plotTop,
            H = c.plotLeft,
            g = 0,
            n = 0,
            e,
            l;
          a = k(a);
          this.followPointer && f
            ? ("undefined" === typeof f.chartX && (f = b.normalize(f)),
              (b = [f.chartX - H, f.chartY - t]))
            : a[0].tooltipPos
            ? (b = a[0].tooltipPos)
            : (a.forEach(function (b) {
                e = b.series.yAxis;
                l = b.series.xAxis;
                g += b.plotX || 0;
                n += b.plotLow
                  ? (b.plotLow + (b.plotHigh || 0)) / 2
                  : b.plotY || 0;
                l &&
                  e &&
                  (E
                    ? ((g += t + c.plotHeight - l.len - l.pos),
                      (n += H + c.plotWidth - e.len - e.pos))
                    : ((g += l.pos - H), (n += e.pos - t)));
              }),
              (g /= a.length),
              (n /= a.length),
              (b = [E ? c.plotWidth - n : g, E ? c.plotHeight - g : n]),
              this.shared &&
                1 < a.length &&
                f &&
                (E ? (b[0] = f.chartX - H) : (b[1] = f.chartY - t)));
          return b.map(Math.round);
        };
        A.prototype.getDateFormat = function (a, f, c, b) {
          var v = this.chart.time,
            k = v.dateFormat("%m-%d %H:%M:%S.%L", f),
            t = {
              millisecond: 15,
              second: 12,
              minute: 9,
              hour: 6,
              day: 3,
            },
            g = "millisecond";
          for (n in L) {
            if (
              a === L.week &&
              +v.dateFormat("%w", f) === c &&
              "00:00:00.000" === k.substr(6)
            ) {
              var n = "week";
              break;
            }
            if (L[n] > a) {
              n = g;
              break;
            }
            if (t[n] && k.substr(t[n]) !== "01-01 00:00:00.000".substr(t[n]))
              break;
            "week" !== n && (g = n);
          }
          if (n) var e = v.resolveDTLFormat(b[n]).main;
          return e;
        };
        A.prototype.getLabel = function () {
          var a = this,
            f = this.chart.renderer,
            c = this.chart.styledMode,
            b = this.options,
            k = "tooltip" + (D(b.className) ? " " + b.className : ""),
            m =
              (b.style && b.style.pointerEvents) ||
              (!this.followPointer && b.stickOnContact ? "auto" : "none"),
            H,
            g = function () {
              a.inContact = !0;
            },
            n = function () {
              var b = a.chart.hoverSeries;
              a.inContact = !1;
              if (b && b.onMouseOut) b.onMouseOut();
            };
          if (!this.label) {
            if (this.outside) {
              var e = this.chart.options.chart.style;
              this.container = H = h.doc.createElement("div");
              H.className = "highcharts-tooltip-container";
              I(H, {
                position: "absolute",
                top: "1px",
                pointerEvents: m,
                zIndex: Math.max(
                  (this.options.style && this.options.style.zIndex) || 0,
                  ((e && e.zIndex) || 0) + 3
                ),
              });
              h.doc.body.appendChild(H);
              this.renderer = f = new h.Renderer(
                H,
                0,
                0,
                e,
                void 0,
                void 0,
                f.styledMode
              );
            }
            this.split
              ? (this.label = f.g(k))
              : ((this.label = f
                  .label(
                    "",
                    0,
                    0,
                    b.shape || "callout",
                    null,
                    null,
                    b.useHTML,
                    null,
                    k
                  )
                  .attr({
                    padding: b.padding,
                    r: b.borderRadius,
                  })),
                c ||
                  this.label
                    .attr({
                      fill: b.backgroundColor,
                      "stroke-width": b.borderWidth,
                    })
                    .css(b.style)
                    .css({
                      pointerEvents: m,
                    })
                    .shadow(b.shadow));
            c &&
              (this.applyFilter(),
              this.label.addClass("highcharts-tooltip-" + this.chart.index));
            if (a.outside && !a.split) {
              var l = this.label,
                C = l.xSetter,
                x = l.ySetter;
              l.xSetter = function (b) {
                C.call(l, a.distance);
                H.style.left = b + "px";
              };
              l.ySetter = function (b) {
                x.call(l, a.distance);
                H.style.top = b + "px";
              };
            }
            this.label
              .on("mouseenter", g)
              .on("mouseleave", n)
              .attr({
                zIndex: 8,
              })
              .add();
          }
          return this.label;
        };
        A.prototype.getPosition = function (a, f, c) {
          var b = this.chart,
            v = this.distance,
            k = {},
            t = (b.inverted && c.h) || 0,
            g,
            n = this.outside,
            e = n ? M.documentElement.clientWidth - 2 * v : b.chartWidth,
            l = n
              ? Math.max(
                  M.body.scrollHeight,
                  M.documentElement.scrollHeight,
                  M.body.offsetHeight,
                  M.documentElement.offsetHeight,
                  M.documentElement.clientHeight
                )
              : b.chartHeight,
            C = b.pointer.getChartPosition(),
            x = function (g) {
              var q = "x" === g;
              return [g, q ? e : l, q ? a : f].concat(
                n
                  ? [
                      q ? a * C.scaleX : f * C.scaleY,
                      q
                        ? C.left - v + (c.plotX + b.plotLeft) * C.scaleX
                        : C.top - v + (c.plotY + b.plotTop) * C.scaleY,
                      0,
                      q ? e : l,
                    ]
                  : [
                      q ? a : f,
                      q ? c.plotX + b.plotLeft : c.plotY + b.plotTop,
                      q ? b.plotLeft : b.plotTop,
                      q ? b.plotLeft + b.plotWidth : b.plotTop + b.plotHeight,
                    ]
              );
            },
            w = x("y"),
            q = x("x"),
            m =
              !this.followPointer && O(c.ttBelow, !b.inverted === !!c.negative),
            p = function (b, a, e, g, l, f, c) {
              var q = n ? ("y" === b ? v * C.scaleY : v * C.scaleX) : v,
                x = (e - g) / 2,
                E = g < l - v,
                w = l + v + g < a,
                H = l - q - e + x;
              l = l + q - x;
              if (m && w) k[b] = l;
              else if (!m && E) k[b] = H;
              else if (E) k[b] = Math.min(c - g, 0 > H - t ? H : H - t);
              else if (w) k[b] = Math.max(f, l + t + e > a ? l : l + t);
              else return !1;
            },
            h = function (b, a, e, g, l) {
              var f;
              l < v || l > a - v
                ? (f = !1)
                : (k[b] =
                    l < e / 2 ? 1 : l > a - g / 2 ? a - g - 2 : l - e / 2);
              return f;
            },
            A = function (b) {
              var a = w;
              w = q;
              q = a;
              g = b;
            },
            y = function () {
              !1 !== p.apply(0, w)
                ? !1 !== h.apply(0, q) || g || (A(!0), y())
                : g
                ? (k.x = k.y = 0)
                : (A(!0), y());
            };
          (b.inverted || 1 < this.len) && A();
          y();
          return k;
        };
        A.prototype.getXDateFormat = function (a, f, c) {
          f = f.dateTimeLabelFormats;
          var b = c && c.closestPointRange;
          return (
            (b
              ? this.getDateFormat(b, a.x, c.options.startOfWeek, f)
              : f.day) || f.year
          );
        };
        A.prototype.hide = function (a) {
          var f = this;
          F.clearTimeout(this.hideTimer);
          a = O(a, this.options.hideDelay, 500);
          this.isHidden ||
            (this.hideTimer = m(function () {
              f.getLabel().fadeOut(a ? void 0 : a);
              f.isHidden = !0;
            }, a));
        };
        A.prototype.init = function (a, f) {
          this.chart = a;
          this.options = f;
          this.crosshairs = [];
          this.now = {
            x: 0,
            y: 0,
          };
          this.isHidden = !0;
          this.split = f.split && !a.inverted && !a.polar;
          this.shared = f.shared || this.split;
          this.outside = O(
            f.outside,
            !(!a.scrollablePixelsX && !a.scrollablePixelsY)
          );
        };
        A.prototype.isStickyOnContact = function () {
          return !(
            this.followPointer ||
            !this.options.stickOnContact ||
            !this.inContact
          );
        };
        A.prototype.move = function (a, f, c, b) {
          var v = this,
            k = v.now,
            t =
              !1 !== v.options.animation &&
              !v.isHidden &&
              (1 < Math.abs(a - k.x) || 1 < Math.abs(f - k.y)),
            g = v.followPointer || 1 < v.len;
          u(k, {
            x: t ? (2 * k.x + a) / 3 : a,
            y: t ? (k.y + f) / 2 : f,
            anchorX: g ? void 0 : t ? (2 * k.anchorX + c) / 3 : c,
            anchorY: g ? void 0 : t ? (k.anchorY + b) / 2 : b,
          });
          v.getLabel().attr(k);
          v.drawTracker();
          t &&
            (F.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              v && v.move(a, f, c, b);
            }, 32)));
        };
        A.prototype.refresh = function (t, f) {
          var v = this.chart,
            b = this.options,
            E = k(t),
            m = E[0],
            H = {},
            g = [],
            n = b.formatter || this.defaultFormatter;
          H = this.shared;
          var e = v.styledMode;
          if (b.enabled) {
            F.clearTimeout(this.hideTimer);
            this.followPointer =
              !this.split && m.series.tooltipOptions.followPointer;
            var l = this.getAnchor(t, f);
            var C = l[0];
            var x = l[1];
            !H || (!a(t) && t.series && t.series.noSharedTooltip)
              ? (H = m.getLabelConfig())
              : (v.pointer.applyInactiveState(E),
                E.forEach(function (b) {
                  b.setState("hover");
                  g.push(b.getLabelConfig());
                }),
                (H = {
                  x: m.category,
                  y: m.y,
                }),
                (H.points = g));
            this.len = g.length;
            t = n.call(H, this);
            n = m.series;
            this.distance = O(n.tooltipOptions.distance, 16);
            if (!1 === t) this.hide();
            else {
              if (this.split) this.renderSplit(t, E);
              else if (
                ((E = C),
                (H = x),
                f &&
                  v.pointer.isDirectTouch &&
                  ((E = f.chartX - v.plotLeft), (H = f.chartY - v.plotTop)),
                v.polar || !1 === n.options.clip || n.shouldShowTooltip(E, H))
              )
                (f = this.getLabel()),
                  (b.style.width && !e) ||
                    f.css({
                      width: this.chart.spacingBox.width + "px",
                    }),
                  f.attr({
                    text: t && t.join ? t.join("") : t,
                  }),
                  f
                    .removeClass(/highcharts-color-[\d]+/g)
                    .addClass(
                      "highcharts-color-" + O(m.colorIndex, n.colorIndex)
                    ),
                  e ||
                    f.attr({
                      stroke:
                        b.borderColor || m.color || n.color || K.neutralColor60,
                    }),
                  this.updatePosition({
                    plotX: C,
                    plotY: x,
                    negative: m.negative,
                    ttBelow: m.ttBelow,
                    h: l[2] || 0,
                  });
              else {
                this.hide();
                return;
              }
              this.isHidden &&
                this.label &&
                this.label
                  .attr({
                    opacity: 1,
                  })
                  .show();
              this.isHidden = !1;
            }
            c(this, "refresh");
          }
        };
        A.prototype.renderSplit = function (a, f) {
          function c(a, e, g, l, f) {
            void 0 === f && (f = !0);
            g
              ? ((e = B ? 0 : F),
                (a = G(a - l / 2, d.left, d.right - l - (b.outside ? D : 0))))
              : ((e -= I),
                (a = f ? a - l - A : a + A),
                (a = G(a, f ? a : d.left, d.right)));
            return {
              x: a,
              y: e,
            };
          }
          var b = this,
            k = b.chart,
            m = b.chart,
            H = m.chartWidth,
            g = m.chartHeight,
            n = m.plotHeight,
            e = m.plotLeft,
            l = m.plotTop,
            C = m.pointer,
            x = m.scrollablePixelsY;
          x = void 0 === x ? 0 : x;
          var w = m.scrollablePixelsX,
            q = m.scrollingContainer;
          q =
            void 0 === q
              ? {
                  scrollLeft: 0,
                  scrollTop: 0,
                }
              : q;
          var t = q.scrollLeft;
          q = q.scrollTop;
          var p = m.styledMode,
            A = b.distance,
            r = b.options,
            R = b.options.positioner,
            d =
              b.outside && "number" !== typeof w
                ? M.documentElement.getBoundingClientRect()
                : {
                    left: t,
                    right: t + H,
                    top: q,
                    bottom: q + g,
                  },
            W = b.getLabel(),
            L = this.renderer || k.renderer,
            B = !(!k.xAxis[0] || !k.xAxis[0].opposite);
          k = C.getChartPosition();
          var D = k.left;
          k = k.top;
          var I = l + q,
            N = 0,
            F = n - x;
          y(a) && (a = [!1, a]);
          a = a.slice(0, f.length + 1).reduce(function (a, g, q) {
            if (!1 !== g && "" !== g) {
              q = f[q - 1] || {
                isHeader: !0,
                plotX: f[0].plotX,
                plotY: n,
                series: {},
              };
              var v = q.isHeader,
                k = v ? b : q.series;
              g = g.toString();
              var C = k.tt,
                x = q.isHeader;
              var w = q.series;
              var E =
                "highcharts-color-" + O(q.colorIndex, w.colorIndex, "none");
              C ||
                ((C = {
                  padding: r.padding,
                  r: r.borderRadius,
                }),
                p ||
                  ((C.fill = r.backgroundColor),
                  (C["stroke-width"] = r.borderWidth)),
                (C = L.label(
                  "",
                  0,
                  0,
                  r[x ? "headerShape" : "shape"] || "callout",
                  void 0,
                  void 0,
                  r.useHTML
                )
                  .addClass(
                    (x ? "highcharts-tooltip-header " : "") +
                      "highcharts-tooltip-box " +
                      E
                  )
                  .attr(C)
                  .add(W)));
              C.isActive = !0;
              C.attr({
                text: g,
              });
              p ||
                C.css(r.style)
                  .shadow(r.shadow)
                  .attr({
                    stroke:
                      r.borderColor || q.color || w.color || K.neutralColor80,
                  });
              k = k.tt = C;
              x = k.getBBox();
              g = x.width + k.strokeWidth();
              v && ((N = x.height), (F += N), B && (I -= N));
              w = q.plotX;
              w = void 0 === w ? 0 : w;
              E = q.plotY;
              E = void 0 === E ? 0 : E;
              C = q.series;
              if (q.isHeader) {
                w = e + w;
                var m = l + n / 2;
              } else {
                var t = C.xAxis,
                  H = C.yAxis;
                w = t.pos + G(w, -A, t.len + A);
                C.shouldShowTooltip(0, H.pos - l + E, {
                  ignoreX: !0,
                }) && (m = H.pos + E);
              }
              w = G(w, d.left - A, d.right + A);
              "number" === typeof m
                ? ((x = x.height + 1),
                  (E = R ? R.call(b, g, x, q) : c(w, m, v, g)),
                  a.push({
                    align: R ? 0 : void 0,
                    anchorX: w,
                    anchorY: m,
                    boxWidth: g,
                    point: q,
                    rank: O(E.rank, v ? 1 : 0),
                    size: x,
                    target: E.y,
                    tt: k,
                    x: E.x,
                  }))
                : (k.isActive = !1);
            }
            return a;
          }, []);
          !R &&
            a.some(function (a) {
              var e = (b.outside ? D : 0) + a.anchorX;
              return e < d.left && e + a.boxWidth < d.right
                ? !0
                : e < D - d.left + a.boxWidth && d.right - e > e;
            }) &&
            (a = a.map(function (b) {
              var a = c(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
              return u(b, {
                target: a.y,
                x: a.x,
              });
            }));
          b.cleanSplit();
          h.distribute(a, F);
          var J = D,
            Y = D;
          a.forEach(function (a) {
            var e = a.x,
              g = a.boxWidth;
            a = a.isHeader;
            a ||
              (b.outside && D + e < J && (J = D + e),
              !a && b.outside && J + g > Y && (Y = D + e));
          });
          a.forEach(function (a) {
            var e = a.x,
              g = a.anchorX,
              l = a.pos,
              f = a.point.isHeader;
            l = {
              visibility: "undefined" === typeof l ? "hidden" : "inherit",
              x: e,
              y: l + I,
              anchorX: g,
              anchorY: a.anchorY,
            };
            if (b.outside && e < g) {
              var n = D - J;
              0 < n &&
                (f || ((l.x = e + n), (l.anchorX = g + n)),
                f && ((l.x = (Y - J) / 2), (l.anchorX = g + n)));
            }
            a.tt.attr(l);
          });
          a = b.container;
          x = b.renderer;
          b.outside &&
            a &&
            x &&
            ((m = W.getBBox()),
            x.setSize(m.width + m.x, m.height + m.y, !1),
            (a.style.left = J + "px"),
            (a.style.top = k + "px"));
        };
        A.prototype.drawTracker = function () {
          if (this.followPointer || !this.options.stickOnContact)
            this.tracker && this.tracker.destroy();
          else {
            var a = this.chart,
              f = this.label,
              c = a.hoverPoint;
            if (f && c) {
              var b = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
              };
              c = this.getAnchor(c);
              var k = f.getBBox();
              c[0] += a.plotLeft - f.translateX;
              c[1] += a.plotTop - f.translateY;
              b.x = Math.min(0, c[0]);
              b.y = Math.min(0, c[1]);
              b.width =
                0 > c[0]
                  ? Math.max(Math.abs(c[0]), k.width - c[0])
                  : Math.max(Math.abs(c[0]), k.width);
              b.height =
                0 > c[1]
                  ? Math.max(Math.abs(c[1]), k.height - Math.abs(c[1]))
                  : Math.max(Math.abs(c[1]), k.height);
              this.tracker
                ? this.tracker.attr(b)
                : ((this.tracker = f.renderer
                    .rect(b)
                    .addClass("highcharts-tracker")
                    .add(f)),
                  a.styledMode ||
                    this.tracker.attr({
                      fill: "rgba(0,0,0,0)",
                    }));
            }
          }
        };
        A.prototype.styledModeFormat = function (a) {
          return a
            .replace('style="font-size: 10px"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex}"'
            );
        };
        A.prototype.tooltipFooterHeaderFormatter = function (a, f) {
          var k = f ? "footer" : "header",
            b = a.series,
            E = b.tooltipOptions,
            m = E.xDateFormat,
            H = b.xAxis,
            g = H && "datetime" === H.options.type && r(a.key),
            n = E[k + "Format"];
          f = {
            isFooter: f,
            labelConfig: a,
          };
          c(this, "headerFormatter", f, function (e) {
            g && !m && (m = this.getXDateFormat(a, E, H));
            g &&
              m &&
              ((a.point && a.point.tooltipDateKeys) || ["key"]).forEach(
                function (b) {
                  n = n.replace(
                    "{point." + b + "}",
                    "{point." + b + ":" + m + "}"
                  );
                }
              );
            b.chart.styledMode && (n = this.styledModeFormat(n));
            e.text = N(
              n,
              {
                point: a,
                series: b,
              },
              this.chart
            );
          });
          return f.text;
        };
        A.prototype.update = function (a) {
          this.destroy();
          p(!0, this.chart.options.tooltip.userOptions, a);
          this.init(this.chart, p(!0, this.options, a));
        };
        A.prototype.updatePosition = function (a) {
          var f = this.chart,
            c = f.pointer,
            b = this.getLabel(),
            k = a.plotX + f.plotLeft;
          f = a.plotY + f.plotTop;
          c = c.getChartPosition();
          a = (this.options.positioner || this.getPosition).call(
            this,
            b.width,
            b.height,
            a
          );
          if (this.outside) {
            var m = (this.options.borderWidth || 0) + 2 * this.distance;
            this.renderer.setSize(b.width + m, b.height + m, !1);
            if (1 !== c.scaleX || 1 !== c.scaleY)
              I(this.container, {
                transform: "scale(" + c.scaleX + ", " + c.scaleY + ")",
              }),
                (k *= c.scaleX),
                (f *= c.scaleY);
            k += c.left - a.x;
            f += c.top - a.y;
          }
          this.move(Math.round(a.x), Math.round(a.y || 0), k, f);
        };
        return A;
      })();
      h.Tooltip = d;
      return h.Tooltip;
    }
  );
  Q(
    d,
    "Core/Pointer.js",
    [
      d["Core/Color/Color.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Tooltip.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J) {
      var N = d.parse,
        G = h.charts,
        I = h.noop,
        D = J.addEvent,
        B = J.attr,
        u = J.css,
        c = J.defined,
        a = J.extend,
        r = J.find,
        y = J.fireEvent,
        p = J.isNumber,
        O = J.isObject,
        k = J.objectEach,
        m = J.offset,
        L = J.pick,
        A = J.splat;
      ("");
      d = (function () {
        function t(a, c) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = c;
          this.init(a, c);
        }
        t.prototype.applyInactiveState = function (a) {
          var f = [],
            b;
          (a || []).forEach(function (a) {
            b = a.series;
            f.push(b);
            b.linkedParent && f.push(b.linkedParent);
            b.linkedSeries && (f = f.concat(b.linkedSeries));
            b.navigatorSeries && f.push(b.navigatorSeries);
          });
          this.chart.series.forEach(function (b) {
            -1 === f.indexOf(b)
              ? b.setState("inactive", !0)
              : b.options.inactiveOtherPoints &&
                b.setAllPointsToState("inactive");
          });
        };
        t.prototype.destroy = function () {
          var a = this;
          this.eventsToUnbind.forEach(function (a) {
            return a();
          });
          this.eventsToUnbind = [];
          h.chartCount ||
            (h.unbindDocumentMouseUp &&
              (h.unbindDocumentMouseUp = h.unbindDocumentMouseUp()),
            h.unbindDocumentTouchEnd &&
              (h.unbindDocumentTouchEnd = h.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          k(a, function (f, b) {
            a[b] = void 0;
          });
        };
        t.prototype.drag = function (a) {
          var f = this.chart,
            b = f.options.chart,
            c = a.chartX,
            k = a.chartY,
            m = this.zoomHor,
            g = this.zoomVert,
            n = f.plotLeft,
            e = f.plotTop,
            l = f.plotWidth,
            C = f.plotHeight,
            x = this.selectionMarker,
            w = this.mouseDownX || 0,
            q = this.mouseDownY || 0,
            t = O(b.panning) ? b.panning && b.panning.enabled : b.panning,
            p = b.panKey && a[b.panKey + "Key"];
          if (!x || !x.touch)
            if (
              (c < n ? (c = n) : c > n + l && (c = n + l),
              k < e ? (k = e) : k > e + C && (k = e + C),
              (this.hasDragged = Math.sqrt(
                Math.pow(w - c, 2) + Math.pow(q - k, 2)
              )),
              10 < this.hasDragged)
            ) {
              var A = f.isInsidePlot(w - n, q - e, {
                visiblePlotOnly: !0,
              });
              f.hasCartesianSeries &&
                (this.zoomX || this.zoomY) &&
                A &&
                !p &&
                !x &&
                ((this.selectionMarker = x =
                  f.renderer
                    .rect(n, e, m ? 1 : l, g ? 1 : C, 0)
                    .attr({
                      class: "highcharts-selection-marker",
                      zIndex: 7,
                    })
                    .add()),
                f.styledMode ||
                  x.attr({
                    fill:
                      b.selectionMarkerFill ||
                      N(K.highlightColor80).setOpacity(0.25).get(),
                  }));
              x &&
                m &&
                ((c -= w),
                x.attr({
                  width: Math.abs(c),
                  x: (0 < c ? 0 : c) + w,
                }));
              x &&
                g &&
                ((c = k - q),
                x.attr({
                  height: Math.abs(c),
                  y: (0 < c ? 0 : c) + q,
                }));
              A && !x && t && f.pan(a, b.panning);
            }
        };
        t.prototype.dragStart = function (a) {
          var f = this.chart;
          f.mouseIsDown = a.type;
          f.cancelClick = !1;
          f.mouseDownX = this.mouseDownX = a.chartX;
          f.mouseDownY = this.mouseDownY = a.chartY;
        };
        t.prototype.drop = function (f) {
          var k = this,
            b = this.chart,
            m = this.hasPinched;
          if (this.selectionMarker) {
            var t = {
                originalEvent: f,
                xAxis: [],
                yAxis: [],
              },
              H = this.selectionMarker,
              g = H.attr ? H.attr("x") : H.x,
              n = H.attr ? H.attr("y") : H.y,
              e = H.attr ? H.attr("width") : H.width,
              l = H.attr ? H.attr("height") : H.height,
              C;
            if (this.hasDragged || m)
              b.axes.forEach(function (b) {
                if (
                  b.zoomEnabled &&
                  c(b.min) &&
                  (m ||
                    k[
                      {
                        xAxis: "zoomX",
                        yAxis: "zoomY",
                      }[b.coll]
                    ]) &&
                  p(g) &&
                  p(n)
                ) {
                  var a = b.horiz,
                    q = "touchend" === f.type ? b.minPixelPadding : 0,
                    x = b.toValue((a ? g : n) + q);
                  a = b.toValue((a ? g + e : n + l) - q);
                  t[b.coll].push({
                    axis: b,
                    min: Math.min(x, a),
                    max: Math.max(x, a),
                  });
                  C = !0;
                }
              }),
                C &&
                  y(b, "selection", t, function (e) {
                    b.zoom(
                      a(
                        e,
                        m
                          ? {
                              animation: !1,
                            }
                          : null
                      )
                    );
                  });
            p(b.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            m && this.scaleGroups();
          }
          b &&
            p(b.index) &&
            (u(b.container, {
              cursor: b._cursor,
            }),
            (b.cancelClick = 10 < this.hasDragged),
            (b.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        };
        t.prototype.findNearestKDPoint = function (a, c, b) {
          var f = this.chart,
            k = f.hoverPoint;
          f = f.tooltip;
          if (k && f && f.isStickyOnContact()) return k;
          var v;
          a.forEach(function (a) {
            var g =
              !(a.noSharedTooltip && c) &&
              0 > a.options.findNearestPointBy.indexOf("y");
            a = a.searchPoint(b, g);
            if ((g = O(a, !0) && a.series) && !(g = !O(v, !0))) {
              g = v.distX - a.distX;
              var e = v.dist - a.dist,
                l =
                  (a.series.group && a.series.group.zIndex) -
                  (v.series.group && v.series.group.zIndex);
              g =
                0 <
                (0 !== g && c
                  ? g
                  : 0 !== e
                  ? e
                  : 0 !== l
                  ? l
                  : v.series.index > a.series.index
                  ? -1
                  : 1);
            }
            g && (v = a);
          });
          return v;
        };
        t.prototype.getChartCoordinatesFromPoint = function (a, c) {
          var b = a.series,
            f = b.xAxis;
          b = b.yAxis;
          var k = a.shapeArgs;
          if (f && b) {
            var v = L(a.clientX, a.plotX),
              g = a.plotY || 0;
            a.isNode && k && p(k.x) && p(k.y) && ((v = k.x), (g = k.y));
            return c
              ? {
                  chartX: b.len + b.pos - g,
                  chartY: f.len + f.pos - v,
                }
              : {
                  chartX: v + f.pos,
                  chartY: g + b.pos,
                };
          }
          if (k && k.x && k.y)
            return {
              chartX: k.x,
              chartY: k.y,
            };
        };
        t.prototype.getChartPosition = function () {
          if (this.chartPosition) return this.chartPosition;
          var a = this.chart.container,
            c = m(a);
          this.chartPosition = {
            left: c.left,
            top: c.top,
            scaleX: 1,
            scaleY: 1,
          };
          var b = a.offsetWidth;
          a = a.offsetHeight;
          2 < b &&
            2 < a &&
            ((this.chartPosition.scaleX = c.width / b),
            (this.chartPosition.scaleY = c.height / a));
          return this.chartPosition;
        };
        t.prototype.getCoordinates = function (a) {
          var f = {
            xAxis: [],
            yAxis: [],
          };
          this.chart.axes.forEach(function (b) {
            f[b.isXAxis ? "xAxis" : "yAxis"].push({
              axis: b,
              value: b.toValue(a[b.horiz ? "chartX" : "chartY"]),
            });
          });
          return f;
        };
        t.prototype.getHoverData = function (a, c, b, k, m, H) {
          var g,
            f = [];
          k = !(!k || !a);
          var e = c && !c.stickyTracking,
            l = {
              chartX: H ? H.chartX : void 0,
              chartY: H ? H.chartY : void 0,
              shared: m,
            };
          y(this, "beforeGetHoverData", l);
          e = e
            ? [c]
            : b.filter(function (b) {
                return l.filter
                  ? l.filter(b)
                  : b.visible &&
                      !(!m && b.directTouch) &&
                      L(b.options.enableMouseTracking, !0) &&
                      b.stickyTracking;
              });
          c = (g = k || !H ? a : this.findNearestKDPoint(e, m, H)) && g.series;
          g &&
            (m && !c.noSharedTooltip
              ? ((e = b.filter(function (b) {
                  return l.filter
                    ? l.filter(b)
                    : b.visible &&
                        !(!m && b.directTouch) &&
                        L(b.options.enableMouseTracking, !0) &&
                        !b.noSharedTooltip;
                })),
                e.forEach(function (b) {
                  var a = r(b.points, function (b) {
                    return b.x === g.x && !b.isNull;
                  });
                  O(a) &&
                    (b.chart.isBoosting && (a = b.getPoint(a)), f.push(a));
                }))
              : f.push(g));
          l = {
            hoverPoint: g,
          };
          y(this, "afterGetHoverData", l);
          return {
            hoverPoint: l.hoverPoint,
            hoverSeries: c,
            hoverPoints: f,
          };
        };
        t.prototype.getPointFromEvent = function (a) {
          a = a.target;
          for (var f; a && !f; ) (f = a.point), (a = a.parentNode);
          return f;
        };
        t.prototype.onTrackerMouseOut = function (a) {
          a = a.relatedTarget || a.toElement;
          var f = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !f ||
              !a ||
              f.stickyTracking ||
              this.inClass(a, "highcharts-tooltip") ||
              (this.inClass(a, "highcharts-series-" + f.index) &&
                this.inClass(a, "highcharts-tracker"))
            )
          )
            f.onMouseOut();
        };
        t.prototype.inClass = function (a, c) {
          for (var b; a; ) {
            if ((b = B(a, "class"))) {
              if (-1 !== b.indexOf(c)) return !0;
              if (-1 !== b.indexOf("highcharts-container")) return !1;
            }
            a = a.parentNode;
          }
        };
        t.prototype.init = function (a, c) {
          this.options = c;
          this.chart = a;
          this.runChartClick = !(!c.chart.events || !c.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          F &&
            ((a.tooltip = new F(a, c.tooltip)),
            (this.followTouchMove = L(c.tooltip.followTouchMove, !0)));
          this.setDOMEvents();
        };
        t.prototype.normalize = function (f, c) {
          var b = f.touches,
            k = b
              ? b.length
                ? b.item(0)
                : L(b.changedTouches, f.changedTouches)[0]
              : f;
          c || (c = this.getChartPosition());
          b = k.pageX - c.left;
          k = k.pageY - c.top;
          b /= c.scaleX;
          k /= c.scaleY;
          return a(f, {
            chartX: Math.round(b),
            chartY: Math.round(k),
          });
        };
        t.prototype.onContainerClick = function (f) {
          var c = this.chart,
            b = c.hoverPoint;
          f = this.normalize(f);
          var k = c.plotLeft,
            m = c.plotTop;
          c.cancelClick ||
            (b && this.inClass(f.target, "highcharts-tracker")
              ? (y(
                  b.series,
                  "click",
                  a(f, {
                    point: b,
                  })
                ),
                c.hoverPoint && b.firePointEvent("click", f))
              : (a(f, this.getCoordinates(f)),
                c.isInsidePlot(f.chartX - k, f.chartY - m, {
                  visiblePlotOnly: !0,
                }) && y(c, "click", f)));
        };
        t.prototype.onContainerMouseDown = function (a) {
          var f = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (h.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ("undefined" === typeof a.button || f)
            this.zoomOption(a),
              f && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        };
        t.prototype.onContainerMouseLeave = function (a) {
          var f = G[L(h.hoverChartIndex, -1)],
            b = this.chart.tooltip;
          a = this.normalize(a);
          f &&
            (a.relatedTarget || a.toElement) &&
            (f.pointer.reset(), (f.pointer.chartPosition = void 0));
          b && !b.isHidden && this.reset();
        };
        t.prototype.onContainerMouseEnter = function (a) {
          delete this.chartPosition;
        };
        t.prototype.onContainerMouseMove = function (a) {
          var f = this.chart;
          a = this.normalize(a);
          this.setHoverChartIndex();
          a.preventDefault || (a.returnValue = !1);
          ("mousedown" === f.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          f.openMenu ||
            (!this.inClass(a.target, "highcharts-tracker") &&
              !f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            this.runPointActions(a);
        };
        t.prototype.onDocumentTouchEnd = function (a) {
          G[h.hoverChartIndex] && G[h.hoverChartIndex].pointer.drop(a);
        };
        t.prototype.onContainerTouchMove = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        };
        t.prototype.onContainerTouchStart = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        };
        t.prototype.onDocumentMouseMove = function (a) {
          var f = this.chart,
            b = this.chartPosition;
          a = this.normalize(a, b);
          var c = f.tooltip;
          !b ||
            (c && c.isStickyOnContact()) ||
            f.isInsidePlot(a.chartX - f.plotLeft, a.chartY - f.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            this.inClass(a.target, "highcharts-tracker") ||
            this.reset();
        };
        t.prototype.onDocumentMouseUp = function (a) {
          var f = G[L(h.hoverChartIndex, -1)];
          f && f.pointer.drop(a);
        };
        t.prototype.pinch = function (f) {
          var c = this,
            b = c.chart,
            k = c.pinchDown,
            m = f.touches || [],
            H = m.length,
            g = c.lastValidTouch,
            n = c.hasZoom,
            e = c.selectionMarker,
            l = {},
            C =
              1 === H &&
              ((c.inClass(f.target, "highcharts-tracker") &&
                b.runTrackerClick) ||
                c.runChartClick),
            x = {};
          1 < H && (c.initiated = !0);
          n && c.initiated && !C && !1 !== f.cancelable && f.preventDefault();
          [].map.call(m, function (b) {
            return c.normalize(b);
          });
          "touchstart" === f.type
            ? ([].forEach.call(m, function (b, a) {
                k[a] = {
                  chartX: b.chartX,
                  chartY: b.chartY,
                };
              }),
              (g.x = [k[0].chartX, k[1] && k[1].chartX]),
              (g.y = [k[0].chartY, k[1] && k[1].chartY]),
              b.axes.forEach(function (a) {
                if (a.zoomEnabled) {
                  var e = b.bounds[a.horiz ? "h" : "v"],
                    g = a.minPixelPadding,
                    l = a.toPixels(
                      Math.min(L(a.options.min, a.dataMin), a.dataMin)
                    ),
                    f = a.toPixels(
                      Math.max(L(a.options.max, a.dataMax), a.dataMax)
                    ),
                    c = Math.max(l, f);
                  e.min = Math.min(a.pos, Math.min(l, f) - g);
                  e.max = Math.max(a.pos + a.len, c + g);
                }
              }),
              (c.res = !0))
            : c.followTouchMove && 1 === H
            ? this.runPointActions(c.normalize(f))
            : k.length &&
              (e ||
                (c.selectionMarker = e =
                  a(
                    {
                      destroy: I,
                      touch: !0,
                    },
                    b.plotBox
                  )),
              c.pinchTranslate(k, m, l, e, x, g),
              (c.hasPinched = n),
              c.scaleGroups(l, x),
              c.res && ((c.res = !1), this.reset(!1, 0)));
        };
        t.prototype.pinchTranslate = function (a, c, b, k, m, H) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, c, b, k, m, H);
          this.zoomVert && this.pinchTranslateDirection(!1, a, c, b, k, m, H);
        };
        t.prototype.pinchTranslateDirection = function (
          a,
          c,
          b,
          k,
          m,
          H,
          g,
          n
        ) {
          var e = this.chart,
            l = a ? "x" : "y",
            f = a ? "X" : "Y",
            x = "chart" + f,
            w = a ? "width" : "height",
            q = e["plot" + (a ? "Left" : "Top")],
            t,
            v,
            E = n || 1,
            p = e.inverted,
            A = e.bounds[a ? "h" : "v"],
            h = 1 === c.length,
            y = c[0][x],
            r = b[0][x],
            P = !h && c[1][x],
            d = !h && b[1][x];
          b = function () {
            "number" === typeof d &&
              20 < Math.abs(y - P) &&
              (E = n || Math.abs(r - d) / Math.abs(y - P));
            v = (q - r) / E + y;
            t = e["plot" + (a ? "Width" : "Height")] / E;
          };
          b();
          c = v;
          if (c < A.min) {
            c = A.min;
            var u = !0;
          } else c + t > A.max && ((c = A.max - t), (u = !0));
          u
            ? ((r -= 0.8 * (r - g[l][0])),
              "number" === typeof d && (d -= 0.8 * (d - g[l][1])),
              b())
            : (g[l] = [r, d]);
          p || ((H[l] = v - q), (H[w] = t));
          H = p ? 1 / E : E;
          m[w] = t;
          m[l] = c;
          k[p ? (a ? "scaleY" : "scaleX") : "scale" + f] = E;
          k["translate" + f] = H * q + (r - H * y);
        };
        t.prototype.reset = function (a, c) {
          var b = this.chart,
            f = b.hoverSeries,
            k = b.hoverPoint,
            m = b.hoverPoints,
            g = b.tooltip,
            n = g && g.shared ? m : k;
          a &&
            n &&
            A(n).forEach(function (b) {
              b.series.isCartesian &&
                "undefined" === typeof b.plotX &&
                (a = !1);
            });
          if (a)
            g &&
              n &&
              A(n).length &&
              (g.refresh(n),
              g.shared && m
                ? m.forEach(function (b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian &&
                      (b.series.xAxis.crosshair &&
                        b.series.xAxis.drawCrosshair(null, b),
                      b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b));
                  })
                : k &&
                  (k.setState(k.state, !0),
                  b.axes.forEach(function (b) {
                    b.crosshair &&
                      k.series[b.coll] === b &&
                      b.drawCrosshair(null, k);
                  })));
          else {
            if (k) k.onMouseOut();
            m &&
              m.forEach(function (b) {
                b.setState();
              });
            if (f) f.onMouseOut();
            g && g.hide(c);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            b.axes.forEach(function (b) {
              b.hideCrosshair();
            });
            this.hoverX = b.hoverPoints = b.hoverPoint = null;
          }
        };
        t.prototype.runPointActions = function (a, c) {
          var b = this.chart,
            f = b.tooltip && b.tooltip.options.enabled ? b.tooltip : void 0,
            k = f ? f.shared : !1,
            m = c || b.hoverPoint,
            g = (m && m.series) || b.hoverSeries;
          g = this.getHoverData(
            m,
            g,
            b.series,
            (!a || "touchmove" !== a.type) &&
              (!!c || (g && g.directTouch && this.isDirectTouch)),
            k,
            a
          );
          m = g.hoverPoint;
          var n = g.hoverPoints;
          c =
            (g = g.hoverSeries) &&
            g.tooltipOptions.followPointer &&
            !g.tooltipOptions.split;
          k = k && g && !g.noSharedTooltip;
          if (m && (m !== b.hoverPoint || (f && f.isHidden))) {
            (b.hoverPoints || []).forEach(function (b) {
              -1 === n.indexOf(b) && b.setState();
            });
            if (b.hoverSeries !== g) g.onMouseOver();
            this.applyInactiveState(n);
            (n || []).forEach(function (b) {
              b.setState("hover");
            });
            b.hoverPoint && b.hoverPoint.firePointEvent("mouseOut");
            if (!m.series) return;
            b.hoverPoints = n;
            b.hoverPoint = m;
            m.firePointEvent("mouseOver");
            f && f.refresh(k ? n : m, a);
          } else
            c &&
              f &&
              !f.isHidden &&
              ((m = f.getAnchor([{}], a)),
              b.isInsidePlot(m[0], m[1], {
                visiblePlotOnly: !0,
              }) &&
                f.updatePosition({
                  plotX: m[0],
                  plotY: m[1],
                }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = D(
              b.container.ownerDocument,
              "mousemove",
              function (b) {
                var a = G[h.hoverChartIndex];
                if (a) a.pointer.onDocumentMouseMove(b);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          b.axes.forEach(function (e) {
            var g = L((e.crosshair || {}).snap, !0),
              c;
            g &&
              (((c = b.hoverPoint) && c.series[e.coll] === e) ||
                (c = r(n, function (b) {
                  return b.series[e.coll] === e;
                })));
            c || !g ? e.drawCrosshair(a, c) : e.hideCrosshair();
          });
        };
        t.prototype.scaleGroups = function (a, c) {
          var b = this.chart,
            f;
          b.series.forEach(function (k) {
            f = a || k.getPlotBox();
            k.xAxis &&
              k.xAxis.zoomEnabled &&
              k.group &&
              (k.group.attr(f),
              k.markerGroup &&
                (k.markerGroup.attr(f),
                k.markerGroup.clip(c ? b.clipRect : null)),
              k.dataLabelsGroup && k.dataLabelsGroup.attr(f));
          });
          b.clipRect.attr(c || b.clipBox);
        };
        t.prototype.setDOMEvents = function () {
          var a = this,
            c = this.chart.container,
            b = c.ownerDocument;
          c.onmousedown = this.onContainerMouseDown.bind(this);
          c.onmousemove = this.onContainerMouseMove.bind(this);
          c.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            D(c, "mouseenter", this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            D(c, "mouseleave", this.onContainerMouseLeave.bind(this))
          );
          h.unbindDocumentMouseUp ||
            (h.unbindDocumentMouseUp = D(
              b,
              "mouseup",
              this.onDocumentMouseUp.bind(this)
            ));
          for (
            var k = this.chart.renderTo.parentElement;
            k && "BODY" !== k.tagName;

          )
            this.eventsToUnbind.push(
              D(k, "scroll", function () {
                delete a.chartPosition;
              })
            ),
              (k = k.parentElement);
          h.hasTouch &&
            (this.eventsToUnbind.push(
              D(c, "touchstart", this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              D(c, "touchmove", this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            h.unbindDocumentTouchEnd ||
              (h.unbindDocumentTouchEnd = D(
                b,
                "touchend",
                this.onDocumentTouchEnd.bind(this),
                {
                  passive: !1,
                }
              )));
        };
        t.prototype.setHoverChartIndex = function () {
          var a = this.chart,
            c = h.charts[L(h.hoverChartIndex, -1)];
          if (c && c !== a)
            c.pointer.onContainerMouseLeave({
              relatedTarget: !0,
            });
          (c && c.mouseIsDown) || (h.hoverChartIndex = a.index);
        };
        t.prototype.touch = function (a, c) {
          var b = this.chart,
            f;
          this.setHoverChartIndex();
          if (1 === a.touches.length)
            if (
              ((a = this.normalize(a)),
              (f = b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop, {
                visiblePlotOnly: !0,
              })) && !b.openMenu)
            ) {
              c && this.runPointActions(a);
              if ("touchmove" === a.type) {
                c = this.pinchDown;
                var k = c[0]
                  ? 4 <=
                    Math.sqrt(
                      Math.pow(c[0].chartX - a.chartX, 2) +
                        Math.pow(c[0].chartY - a.chartY, 2)
                    )
                  : !1;
              }
              L(k, !0) && this.pinch(a);
            } else c && this.reset();
          else 2 === a.touches.length && this.pinch(a);
        };
        t.prototype.touchSelect = function (a) {
          return !(
            !this.chart.options.chart.zoomBySingleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        };
        t.prototype.zoomOption = function (a) {
          var c = this.chart,
            b = c.options.chart,
            f = b.zoomType || "";
          c = c.inverted;
          /touch/.test(a.type) && (f = L(b.pinchType, f));
          this.zoomX = a = /x/.test(f);
          this.zoomY = f = /y/.test(f);
          this.zoomHor = (a && !c) || (f && c);
          this.zoomVert = (f && !c) || (a && c);
          this.hasZoom = a || f;
        };
        return t;
      })();
      return (h.Pointer = d);
    }
  );
  Q(
    d,
    "Core/MSPointer.js",
    [d["Core/Globals.js"], d["Core/Pointer.js"], d["Core/Utilities.js"]],
    function (d, h, K) {
      function N() {
        var a = [];
        a.item = function (a) {
          return this[a];
        };
        c(r, function (c) {
          a.push({
            pageX: c.pageX,
            pageY: c.pageY,
            target: c.target,
          });
        });
        return a;
      }
      function J(a, c, k, m) {
        ("touch" !== a.pointerType &&
          a.pointerType !== a.MSPOINTER_TYPE_TOUCH) ||
          !G[d.hoverChartIndex] ||
          (m(a),
          (m = G[d.hoverChartIndex].pointer),
          m[c]({
            type: k,
            target: a.currentTarget,
            preventDefault: D,
            touches: N(),
          }));
      }
      var M =
          (this && this.__extends) ||
          (function () {
            var a = function (c, k) {
              a =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var k in c) c.hasOwnProperty(k) && (a[k] = c[k]);
                };
              return a(c, k);
            };
            return function (c, k) {
              function m() {
                this.constructor = c;
              }
              a(c, k);
              c.prototype =
                null === k
                  ? Object.create(k)
                  : ((m.prototype = k.prototype), new m());
            };
          })(),
        G = d.charts,
        I = d.doc,
        D = d.noop,
        B = K.addEvent,
        u = K.css,
        c = K.objectEach,
        a = K.removeEvent,
        r = {},
        y = !!d.win.PointerEvent;
      return (function (c) {
        function p() {
          return (null !== c && c.apply(this, arguments)) || this;
        }
        M(p, c);
        p.prototype.batchMSEvents = function (a) {
          a(
            this.chart.container,
            y ? "pointerdown" : "MSPointerDown",
            this.onContainerPointerDown
          );
          a(
            this.chart.container,
            y ? "pointermove" : "MSPointerMove",
            this.onContainerPointerMove
          );
          a(I, y ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
        };
        p.prototype.destroy = function () {
          this.batchMSEvents(a);
          c.prototype.destroy.call(this);
        };
        p.prototype.init = function (a, m) {
          c.prototype.init.call(this, a, m);
          this.hasZoom &&
            u(a.container, {
              "-ms-touch-action": "none",
              "touch-action": "none",
            });
        };
        p.prototype.onContainerPointerDown = function (a) {
          J(a, "onContainerTouchStart", "touchstart", function (a) {
            r[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget,
            };
          });
        };
        p.prototype.onContainerPointerMove = function (a) {
          J(a, "onContainerTouchMove", "touchmove", function (a) {
            r[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
            };
            r[a.pointerId].target || (r[a.pointerId].target = a.currentTarget);
          });
        };
        p.prototype.onDocumentPointerUp = function (a) {
          J(a, "onDocumentTouchEnd", "touchend", function (a) {
            delete r[a.pointerId];
          });
        };
        p.prototype.setDOMEvents = function () {
          c.prototype.setDOMEvents.call(this);
          (this.hasZoom || this.followTouchMove) && this.batchMSEvents(B);
        };
        return p;
      })(h);
    }
  );
  Q(
    d,
    "Core/Series/Point.js",
    [
      d["Core/Renderer/HTML/AST.js"],
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Options.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M) {
      var G = h.animObject,
        I = K.format,
        D = J.defaultOptions,
        B = M.addEvent,
        u = M.defined,
        c = M.erase,
        a = M.extend,
        r = M.fireEvent,
        y = M.getNestedProperty,
        p = M.isArray,
        O = M.isFunction,
        k = M.isNumber,
        m = M.isObject,
        L = M.merge,
        A = M.objectEach,
        t = M.pick,
        f = M.syncTimeout,
        v = M.removeEvent,
        b = M.uniqueKey;
      ("");
      h = (function () {
        function E() {
          this.colorIndex = this.category = void 0;
          this.formatPrefix = "point";
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        E.prototype.animateBeforeDestroy = function () {
          var b = this,
            c = {
              x: b.startXPos,
              opacity: 0,
            },
            g,
            f = b.getGraphicalProps();
          f.singular.forEach(function (a) {
            g = "dataLabel" === a;
            b[a] = b[a].animate(
              g
                ? {
                    x: b[a].startXPos,
                    y: b[a].startYPos,
                    opacity: 0,
                  }
                : c
            );
          });
          f.plural.forEach(function (e) {
            b[e].forEach(function (e) {
              e.element &&
                e.animate(
                  a(
                    {
                      x: b.startXPos,
                    },
                    e.startYPos
                      ? {
                          x: e.startXPos,
                          y: e.startYPos,
                        }
                      : {}
                  )
                );
            });
          });
        };
        E.prototype.applyOptions = function (b, c) {
          var g = this.series,
            f = g.options.pointValKey || g.pointValKey;
          b = E.prototype.optionsToObject.call(this, b);
          a(this, b);
          this.options = this.options ? a(this.options, b) : b;
          b.group && delete this.group;
          b.dataLabels && delete this.dataLabels;
          f && (this.y = E.prototype.getNestedProperty.call(this, f));
          this.formatPrefix = (this.isNull = t(
            this.isValid && !this.isValid(),
            null === this.x || !k(this.y)
          ))
            ? "null"
            : "point";
          this.selected && (this.state = "select");
          "name" in this &&
            "undefined" === typeof c &&
            g.xAxis &&
            g.xAxis.hasNames &&
            (this.x = g.xAxis.nameToX(this));
          "undefined" === typeof this.x &&
            g &&
            (this.x = "undefined" === typeof c ? g.autoIncrement(this) : c);
          return this;
        };
        E.prototype.destroy = function () {
          function b() {
            if (a.graphic || a.dataLabel || a.dataLabels)
              v(a), a.destroyElements();
            for (k in a) a[k] = null;
          }
          var a = this,
            g = a.series,
            n = g.chart;
          g = g.options.dataSorting;
          var e = n.hoverPoints,
            l = G(a.series.chart.renderer.globalAnimation),
            k;
          a.legendItem && n.legend.destroyItem(a);
          e && (a.setState(), c(e, a), e.length || (n.hoverPoints = null));
          if (a === n.hoverPoint) a.onMouseOut();
          g && g.enabled
            ? (this.animateBeforeDestroy(), f(b, l.duration))
            : b();
          n.pointCount--;
        };
        E.prototype.destroyElements = function (b) {
          var a = this;
          b = a.getGraphicalProps(b);
          b.singular.forEach(function (b) {
            a[b] = a[b].destroy();
          });
          b.plural.forEach(function (b) {
            a[b].forEach(function (b) {
              b.element && b.destroy();
            });
            delete a[b];
          });
        };
        E.prototype.firePointEvent = function (b, a, g) {
          var c = this,
            e = this.series.options;
          (e.point.events[b] ||
            (c.options && c.options.events && c.options.events[b])) &&
            c.importEvents();
          "click" === b &&
            e.allowPointSelect &&
            (g = function (b) {
              c.select && c.select(null, b.ctrlKey || b.metaKey || b.shiftKey);
            });
          r(c, b, a, g);
        };
        E.prototype.getClassName = function () {
          return (
            "highcharts-point" +
            (this.selected ? " highcharts-point-select" : "") +
            (this.negative ? " highcharts-negative" : "") +
            (this.isNull ? " highcharts-null-point" : "") +
            ("undefined" !== typeof this.colorIndex
              ? " highcharts-color-" + this.colorIndex
              : "") +
            (this.options.className ? " " + this.options.className : "") +
            (this.zone && this.zone.className
              ? " " + this.zone.className.replace("highcharts-negative", "")
              : "")
          );
        };
        E.prototype.getGraphicalProps = function (b) {
          var a = this,
            g = [],
            c,
            e = {
              singular: [],
              plural: [],
            };
          b = b || {
            graphic: 1,
            dataLabel: 1,
          };
          b.graphic && g.push("graphic", "upperGraphic", "shadowGroup");
          b.dataLabel && g.push("dataLabel", "dataLabelUpper", "connector");
          for (c = g.length; c--; ) {
            var l = g[c];
            a[l] && e.singular.push(l);
          }
          ["dataLabel", "connector"].forEach(function (g) {
            var l = g + "s";
            b[g] && a[l] && e.plural.push(l);
          });
          return e;
        };
        E.prototype.getLabelConfig = function () {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        };
        E.prototype.getNestedProperty = function (b) {
          if (b)
            return 0 === b.indexOf("custom.") ? y(b, this.options) : this[b];
        };
        E.prototype.getZone = function () {
          var b = this.series,
            a = b.zones;
          b = b.zoneAxis || "y";
          var g = 0,
            c;
          for (c = a[g]; this[b] >= c.value; ) c = a[++g];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            c && c.color && !this.options.color ? c.color : this.nonZonedColor;
          return c;
        };
        E.prototype.hasNewShapeType = function () {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        };
        E.prototype.init = function (a, c, g) {
          this.series = a;
          this.applyOptions(c, g);
          this.id = u(this.id) ? this.id : b();
          this.resolveColor();
          a.chart.pointCount++;
          r(this, "afterInit");
          return this;
        };
        E.prototype.optionsToObject = function (b) {
          var a = {},
            g = this.series,
            c = g.options.keys,
            e = c || g.pointArrayMap || ["y"],
            l = e.length,
            f = 0,
            x = 0;
          if (k(b) || null === b) a[e[0]] = b;
          else if (p(b))
            for (
              !c &&
              b.length > l &&
              ((g = typeof b[0]),
              "string" === g ? (a.name = b[0]) : "number" === g && (a.x = b[0]),
              f++);
              x < l;

            )
              (c && "undefined" === typeof b[f]) ||
                (0 < e[x].indexOf(".")
                  ? E.prototype.setNestedProperty(a, b[f], e[x])
                  : (a[e[x]] = b[f])),
                f++,
                x++;
          else
            "object" === typeof b &&
              ((a = b),
              b.dataLabels && (g._hasPointLabels = !0),
              b.marker && (g._hasPointMarkers = !0));
          return a;
        };
        E.prototype.resolveColor = function () {
          var b = this.series;
          var a = b.chart.options.chart.colorCount;
          var g = b.chart.styledMode;
          delete this.nonZonedColor;
          if (b.options.colorByPoint) {
            if (!g) {
              a = b.options.colors || b.chart.options.colors;
              var c = a[b.colorCounter];
              a = a.length;
            }
            g = b.colorCounter;
            b.colorCounter++;
            b.colorCounter === a && (b.colorCounter = 0);
          } else g || (c = b.color), (g = b.colorIndex);
          this.colorIndex = t(this.options.colorIndex, g);
          this.color = t(this.options.color, c);
        };
        E.prototype.setNestedProperty = function (b, a, g) {
          g.split(".").reduce(function (b, e, g, c) {
            b[e] = c.length - 1 === g ? a : m(b[e], !0) ? b[e] : {};
            return b[e];
          }, b);
          return b;
        };
        E.prototype.tooltipFormatter = function (b) {
          var a = this.series,
            g = a.tooltipOptions,
            c = t(g.valueDecimals, ""),
            e = g.valuePrefix || "",
            l = g.valueSuffix || "";
          a.chart.styledMode && (b = a.chart.tooltip.styledModeFormat(b));
          (a.pointArrayMap || ["y"]).forEach(function (a) {
            a = "{point." + a;
            if (e || l) b = b.replace(RegExp(a + "}", "g"), e + a + "}" + l);
            b = b.replace(RegExp(a + "}", "g"), a + ":,." + c + "f}");
          });
          return I(
            b,
            {
              point: this,
              series: this.series,
            },
            a.chart
          );
        };
        E.prototype.update = function (b, a, g, c) {
          function e() {
            l.applyOptions(b);
            var e = n && l.hasDummyGraphic;
            e = null === l.y ? !e : e;
            n && e && ((l.graphic = n.destroy()), delete l.hasDummyGraphic);
            m(b, !0) &&
              (n &&
                n.element &&
                b &&
                b.marker &&
                "undefined" !== typeof b.marker.symbol &&
                (l.graphic = n.destroy()),
              b &&
                b.dataLabels &&
                l.dataLabel &&
                (l.dataLabel = l.dataLabel.destroy()),
              l.connector && (l.connector = l.connector.destroy()));
            k = l.index;
            f.updateParallelArrays(l, k);
            p.data[k] =
              m(p.data[k], !0) || m(b, !0) ? l.options : t(b, p.data[k]);
            f.isDirty = f.isDirtyData = !0;
            !f.fixedBox && f.hasCartesianSeries && (q.isDirtyBox = !0);
            "point" === p.legendType && (q.isDirtyLegend = !0);
            a && q.redraw(g);
          }
          var l = this,
            f = l.series,
            n = l.graphic,
            k,
            q = f.chart,
            p = f.options;
          a = t(a, !0);
          !1 === c
            ? e()
            : l.firePointEvent(
                "update",
                {
                  options: b,
                },
                e
              );
        };
        E.prototype.remove = function (b, a) {
          this.series.removePoint(this.series.data.indexOf(this), b, a);
        };
        E.prototype.select = function (b, a) {
          var g = this,
            c = g.series,
            e = c.chart;
          this.selectedStaging = b = t(b, !g.selected);
          g.firePointEvent(
            b ? "select" : "unselect",
            {
              accumulate: a,
            },
            function () {
              g.selected = g.options.selected = b;
              c.options.data[c.data.indexOf(g)] = g.options;
              g.setState(b && "select");
              a ||
                e.getSelectedPoints().forEach(function (b) {
                  var a = b.series;
                  b.selected &&
                    b !== g &&
                    ((b.selected = b.options.selected = !1),
                    (a.options.data[a.data.indexOf(b)] = b.options),
                    b.setState(
                      e.hoverPoints && a.options.inactiveOtherPoints
                        ? "inactive"
                        : ""
                    ),
                    b.firePointEvent("unselect"));
                });
            }
          );
          delete this.selectedStaging;
        };
        E.prototype.onMouseOver = function (b) {
          var a = this.series.chart,
            g = a.pointer;
          b = b
            ? g.normalize(b)
            : g.getChartCoordinatesFromPoint(this, a.inverted);
          g.runPointActions(b, this);
        };
        E.prototype.onMouseOut = function () {
          var b = this.series.chart;
          this.firePointEvent("mouseOut");
          this.series.options.inactiveOtherPoints ||
            (b.hoverPoints || []).forEach(function (b) {
              b.setState();
            });
          b.hoverPoints = b.hoverPoint = null;
        };
        E.prototype.importEvents = function () {
          if (!this.hasImportedEvents) {
            var b = this,
              a = L(b.series.options.point, b.options).events;
            b.events = a;
            A(a, function (a, c) {
              O(a) && B(b, c, a);
            });
            this.hasImportedEvents = !0;
          }
        };
        E.prototype.setState = function (b, c) {
          var g = this.series,
            f = this.state,
            e = g.options.states[b || "normal"] || {},
            l = D.plotOptions[g.type].marker && g.options.marker,
            m = l && !1 === l.enabled,
            x = (l && l.states && l.states[b || "normal"]) || {},
            w = !1 === x.enabled,
            q = g.stateMarkerGraphic,
            p = this.marker || {},
            v = g.chart,
            E = g.halo,
            A,
            h = l && g.markerAttribs;
          b = b || "";
          if (
            !(
              (b === this.state && !c) ||
              (this.selected && "select" !== b) ||
              !1 === e.enabled ||
              (b && (w || (m && !1 === x.enabled))) ||
              (b && p.states && p.states[b] && !1 === p.states[b].enabled)
            )
          ) {
            this.state = b;
            h && (A = g.markerAttribs(this, b));
            if (this.graphic && !this.hasDummyGraphic) {
              f && this.graphic.removeClass("highcharts-point-" + f);
              b && this.graphic.addClass("highcharts-point-" + b);
              if (!v.styledMode) {
                var y = g.pointAttribs(this, b);
                var H = t(v.options.chart.animation, e.animation);
                g.options.inactiveOtherPoints &&
                  k(y.opacity) &&
                  ((this.dataLabels || []).forEach(function (b) {
                    b &&
                      b.animate(
                        {
                          opacity: y.opacity,
                        },
                        H
                      );
                  }),
                  this.connector &&
                    this.connector.animate(
                      {
                        opacity: y.opacity,
                      },
                      H
                    ));
                this.graphic.animate(y, H);
              }
              A &&
                this.graphic.animate(
                  A,
                  t(v.options.chart.animation, x.animation, l.animation)
                );
              q && q.hide();
            } else {
              if (b && x) {
                f = p.symbol || g.symbol;
                q && q.currentSymbol !== f && (q = q.destroy());
                if (A)
                  if (q)
                    q[c ? "animate" : "attr"]({
                      x: A.x,
                      y: A.y,
                    });
                  else
                    f &&
                      ((g.stateMarkerGraphic = q =
                        v.renderer
                          .symbol(f, A.x, A.y, A.width, A.height)
                          .add(g.markerGroup)),
                      (q.currentSymbol = f));
                !v.styledMode && q && q.attr(g.pointAttribs(this, b));
              }
              q &&
                (q[b && this.isInside ? "show" : "hide"](),
                (q.element.point = this));
            }
            e = e.halo;
            A = ((q = this.graphic || q) && q.visibility) || "inherit";
            e && e.size && q && "hidden" !== A && !this.isCluster
              ? (E || (g.halo = E = v.renderer.path().add(q.parentGroup)),
                E.show()[c ? "animate" : "attr"]({
                  d: this.haloPath(e.size),
                }),
                E.attr({
                  class:
                    "highcharts-halo highcharts-color-" +
                    t(this.colorIndex, g.colorIndex) +
                    (this.className ? " " + this.className : ""),
                  visibility: A,
                  zIndex: -1,
                }),
                (E.point = this),
                v.styledMode ||
                  E.attr(
                    a(
                      {
                        fill: this.color || g.color,
                        "fill-opacity": e.opacity,
                      },
                      d.filterUserAttributes(e.attributes || {})
                    )
                  ))
              : E &&
                E.point &&
                E.point.haloPath &&
                E.animate(
                  {
                    d: E.point.haloPath(0),
                  },
                  null,
                  E.hide
                );
            r(this, "afterSetState", {
              state: b,
            });
          }
        };
        E.prototype.haloPath = function (b) {
          return this.series.chart.renderer.symbols.circle(
            Math.floor(this.plotX) - b,
            this.plotY - b,
            2 * b,
            2 * b
          );
        };
        return E;
      })();
      return (F.Point = h);
    }
  );
  Q(
    d,
    "Core/Legend.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Series/Point.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J) {
      var N = d.animObject,
        G = d.setAnimation,
        I = h.format;
      d = K.isFirefox;
      var D = K.marginNames;
      h = K.win;
      var B = J.addEvent,
        u = J.createElement,
        c = J.css,
        a = J.defined,
        r = J.discardElement,
        y = J.find,
        p = J.fireEvent,
        O = J.isNumber,
        k = J.merge,
        m = J.pick,
        L = J.relativeLength,
        A = J.stableSort,
        t = J.syncTimeout;
      J = J.wrap;
      var f = (function () {
        function f(b, a) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = {};
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = b;
          this.init(b, a);
        }
        f.prototype.init = function (b, a) {
          this.chart = b;
          this.setOptions(a);
          a.enabled &&
            (this.render(),
            B(this.chart, "endResize", function () {
              this.legend.positionCheckboxes();
            }),
            this.proximate
              ? (this.unchartrender = B(this.chart, "render", function () {
                  this.legend.proximatePositions();
                  this.legend.positionItems();
                }))
              : this.unchartrender && this.unchartrender());
        };
        f.prototype.setOptions = function (b) {
          var a = m(b.padding, 8);
          this.options = b;
          this.chart.styledMode ||
            ((this.itemStyle = b.itemStyle),
            (this.itemHiddenStyle = k(this.itemStyle, b.itemHiddenStyle)));
          this.itemMarginTop = b.itemMarginTop || 0;
          this.itemMarginBottom = b.itemMarginBottom || 0;
          this.padding = a;
          this.initialItemY = a - 5;
          this.symbolWidth = m(b.symbolWidth, 16);
          this.pages = [];
          this.proximate = "proximate" === b.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        f.prototype.update = function (b, a) {
          var c = this.chart;
          this.setOptions(k(!0, this.options, b));
          this.destroy();
          c.isDirtyLegend = c.isDirtyBox = !0;
          m(a, !0) && c.redraw();
          p(this, "afterUpdate");
        };
        f.prototype.colorizeItem = function (b, a) {
          b.legendGroup[a ? "removeClass" : "addClass"](
            "highcharts-legend-item-hidden"
          );
          if (!this.chart.styledMode) {
            var c = this.options,
              f = b.legendItem,
              g = b.legendLine,
              k = b.legendSymbol,
              e = this.itemHiddenStyle.color;
            c = a ? c.itemStyle.color : e;
            var l = a ? b.color || e : e,
              m = b.options && b.options.marker,
              x = {
                fill: l,
              };
            f &&
              f.css({
                fill: c,
                color: c,
              });
            g &&
              g.attr({
                stroke: l,
              });
            k &&
              (m &&
                k.isMarker &&
                ((x = b.pointAttribs()), a || (x.stroke = x.fill = e)),
              k.attr(x));
          }
          p(this, "afterColorizeItem", {
            item: b,
            visible: a,
          });
        };
        f.prototype.positionItems = function () {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        f.prototype.positionItem = function (b) {
          var c = this,
            f = this.options,
            k = f.symbolPadding,
            g = !f.rtl,
            n = b._legendItemPos;
          f = n[0];
          n = n[1];
          var e = b.checkbox,
            l = b.legendGroup;
          l &&
            l.element &&
            ((k = {
              translateX: g ? f : this.legendWidth - f - 2 * k - 4,
              translateY: n,
            }),
            (g = function () {
              p(c, "afterPositionItem", {
                item: b,
              });
            }),
            a(l.translateY) ? l.animate(k, void 0, g) : (l.attr(k), g()));
          e && ((e.x = f), (e.y = n));
        };
        f.prototype.destroyItem = function (b) {
          var a = b.checkbox;
          ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(
            function (a) {
              b[a] && (b[a] = b[a].destroy());
            }
          );
          a && r(b.checkbox);
        };
        f.prototype.destroy = function () {
          function b(b) {
            this[b] && (this[b] = this[b].destroy());
          }
          this.getAllItems().forEach(function (a) {
            ["legendItem", "legendGroup"].forEach(b, a);
          });
          "clipRect up down pager nav box title group"
            .split(" ")
            .forEach(b, this);
          this.display = null;
        };
        f.prototype.positionCheckboxes = function () {
          var b = this.group && this.group.alignAttr,
            a = this.clipHeight || this.legendHeight,
            f = this.titleHeight;
          if (b) {
            var k = b.translateY;
            this.allItems.forEach(function (g) {
              var n = g.checkbox;
              if (n) {
                var e = k + f + n.y + (this.scrollOffset || 0) + 3;
                c(n, {
                  left: b.translateX + g.checkboxOffset + n.x - 20 + "px",
                  top: e + "px",
                  display:
                    this.proximate || (e > k - 6 && e < k + a - 6)
                      ? ""
                      : "none",
                });
              }
            }, this);
          }
        };
        f.prototype.renderTitle = function () {
          var b = this.options,
            a = this.padding,
            c = b.title,
            f = 0;
          c.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  c.text,
                  a - 3,
                  a - 4,
                  null,
                  null,
                  null,
                  b.useHTML,
                  null,
                  "legend-title"
                )
                .attr({
                  zIndex: 1,
                })),
              this.chart.styledMode || this.title.css(c.style),
              this.title.add(this.group)),
            c.width ||
              this.title.css({
                width: this.maxLegendWidth + "px",
              }),
            (b = this.title.getBBox()),
            (f = b.height),
            (this.offsetWidth = b.width),
            this.contentGroup.attr({
              translateY: f,
            }));
          this.titleHeight = f;
        };
        f.prototype.setText = function (b) {
          var a = this.options;
          b.legendItem.attr({
            text: a.labelFormat
              ? I(a.labelFormat, b, this.chart)
              : a.labelFormatter.call(b),
          });
        };
        f.prototype.renderItem = function (b) {
          var a = this.chart,
            c = a.renderer,
            f = this.options,
            g = this.symbolWidth,
            n = f.symbolPadding || 0,
            e = this.itemStyle,
            l = this.itemHiddenStyle,
            C = "horizontal" === f.layout ? m(f.itemDistance, 20) : 0,
            x = !f.rtl,
            w = b.legendItem,
            q = !b.series,
            t = !q && b.series.drawLegendSymbol ? b.series : b,
            p = t.options,
            v = this.createCheckboxForItem && p && p.showCheckbox;
          p = g + n + C + (v ? 20 : 0);
          var A = f.useHTML,
            h = b.options.className;
          w ||
            ((b.legendGroup = c
              .g("legend-item")
              .addClass(
                "highcharts-" +
                  t.type +
                  "-series highcharts-color-" +
                  b.colorIndex +
                  (h ? " " + h : "") +
                  (q ? " highcharts-series-" + b.index : "")
              )
              .attr({
                zIndex: 1,
              })
              .add(this.scrollGroup)),
            (b.legendItem = w =
              c.text("", x ? g + n : -n, this.baseline || 0, A)),
            a.styledMode || w.css(k(b.visible ? e : l)),
            w
              .attr({
                align: x ? "left" : "right",
                zIndex: 2,
              })
              .add(b.legendGroup),
            this.baseline ||
              ((this.fontMetrics = c.fontMetrics(
                a.styledMode ? 12 : e.fontSize,
                w
              )),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              w.attr("y", this.baseline),
              (this.symbolHeight = f.symbolHeight || this.fontMetrics.f),
              f.squareSymbol &&
                ((this.symbolWidth = m(
                  f.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (p = this.symbolWidth + n + C + (v ? 20 : 0)),
                x && w.attr("x", this.symbolWidth + n))),
            t.drawLegendSymbol(this, b),
            this.setItemEvents && this.setItemEvents(b, w, A));
          v &&
            !b.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(b);
          this.colorizeItem(b, b.visible);
          (!a.styledMode && e.width) ||
            w.css({
              width:
                (f.itemWidth || this.widthOption || a.spacingBox.width) -
                p +
                "px",
            });
          this.setText(b);
          a = w.getBBox();
          b.itemWidth = b.checkboxOffset =
            f.itemWidth || b.legendItemWidth || a.width + p;
          this.maxItemWidth = Math.max(this.maxItemWidth, b.itemWidth);
          this.totalItemWidth += b.itemWidth;
          this.itemHeight = b.itemHeight = Math.round(
            b.legendItemHeight || a.height || this.symbolHeight
          );
        };
        f.prototype.layoutItem = function (b) {
          var a = this.options,
            c = this.padding,
            f = "horizontal" === a.layout,
            g = b.itemHeight,
            k = this.itemMarginBottom,
            e = this.itemMarginTop,
            l = f ? m(a.itemDistance, 20) : 0,
            C = this.maxLegendWidth;
          a =
            a.alignColumns && this.totalItemWidth > C
              ? this.maxItemWidth
              : b.itemWidth;
          f &&
            this.itemX - c + a > C &&
            ((this.itemX = c),
            this.lastLineHeight && (this.itemY += e + this.lastLineHeight + k),
            (this.lastLineHeight = 0));
          this.lastItemY = e + this.itemY + k;
          this.lastLineHeight = Math.max(g, this.lastLineHeight);
          b._legendItemPos = [this.itemX, this.itemY];
          f
            ? (this.itemX += a)
            : ((this.itemY += e + g + k), (this.lastLineHeight = g));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (f ? this.itemX - c - (b.checkbox ? 0 : l) : a) + c,
              this.offsetWidth
            );
        };
        f.prototype.getAllItems = function () {
          var b = [];
          this.chart.series.forEach(function (c) {
            var f = c && c.options;
            c &&
              m(f.showInLegend, a(f.linkedTo) ? !1 : void 0, !0) &&
              (b = b.concat(
                c.legendItems || ("point" === f.legendType ? c.data : c)
              ));
          });
          p(this, "afterGetAllItems", {
            allItems: b,
          });
          return b;
        };
        f.prototype.getAlignment = function () {
          var b = this.options;
          return this.proximate
            ? b.align.charAt(0) + "tv"
            : b.floating
            ? ""
            : b.align.charAt(0) +
              b.verticalAlign.charAt(0) +
              b.layout.charAt(0);
        };
        f.prototype.adjustMargins = function (b, c) {
          var f = this.chart,
            k = this.options,
            g = this.getAlignment();
          g &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (n, e) {
              n.test(g) &&
                !a(b[e]) &&
                (f[D[e]] = Math.max(
                  f[D[e]],
                  f.legend[(e + 1) % 2 ? "legendHeight" : "legendWidth"] +
                    [1, -1, -1, 1][e] * k[e % 2 ? "x" : "y"] +
                    m(k.margin, 12) +
                    c[e] +
                    (f.titleOffset[e] || 0)
                ));
            });
        };
        f.prototype.proximatePositions = function () {
          var b = this.chart,
            a = [],
            c = "left" === this.options.align;
          this.allItems.forEach(function (f) {
            var g;
            var k = c;
            if (f.yAxis) {
              f.xAxis.options.reversed && (k = !k);
              f.points &&
                (g = y(
                  k ? f.points : f.points.slice(0).reverse(),
                  function (b) {
                    return O(b.plotY);
                  }
                ));
              k =
                this.itemMarginTop +
                f.legendItem.getBBox().height +
                this.itemMarginBottom;
              var e = f.yAxis.top - b.plotTop;
              f.visible
                ? ((g = g ? g.plotY : f.yAxis.height), (g += e - 0.3 * k))
                : (g = e + f.yAxis.height);
              a.push({
                target: g,
                size: k,
                item: f,
              });
            }
          }, this);
          K.distribute(a, b.plotHeight);
          a.forEach(function (a) {
            a.item._legendItemPos[1] = b.plotTop - b.spacing[0] + a.pos;
          });
        };
        f.prototype.render = function () {
          var b = this.chart,
            a = b.renderer,
            c = this.group,
            f = this.box,
            g = this.options,
            k = this.padding;
          this.itemX = k;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = L(g.width, b.spacingBox.width - k);
          var e = b.spacingBox.width - 2 * k - g.x;
          -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
            (e /= 2);
          this.maxLegendWidth = this.widthOption || e;
          c ||
            ((this.group = c =
              a
                .g("legend")
                .attr({
                  zIndex: 7,
                })
                .add()),
            (this.contentGroup = a
              .g()
              .attr({
                zIndex: 1,
              })
              .add(c)),
            (this.scrollGroup = a.g().add(this.contentGroup)));
          this.renderTitle();
          var l = this.getAllItems();
          A(l, function (b, a) {
            return (
              ((b.options && b.options.legendIndex) || 0) -
              ((a.options && a.options.legendIndex) || 0)
            );
          });
          g.reversed && l.reverse();
          this.allItems = l;
          this.display = e = !!l.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          l.forEach(this.renderItem, this);
          l.forEach(this.layoutItem, this);
          l = (this.widthOption || this.offsetWidth) + k;
          var m = this.lastItemY + this.lastLineHeight + this.titleHeight;
          m = this.handleOverflow(m);
          m += k;
          f ||
            ((this.box = f =
              a
                .rect()
                .addClass("highcharts-legend-box")
                .attr({
                  r: g.borderRadius,
                })
                .add(c)),
            (f.isNew = !0));
          b.styledMode ||
            f
              .attr({
                stroke: g.borderColor,
                "stroke-width": g.borderWidth || 0,
                fill: g.backgroundColor || "none",
              })
              .shadow(g.shadow);
          0 < l &&
            0 < m &&
            (f[f.isNew ? "attr" : "animate"](
              f.crisp.call(
                {},
                {
                  x: 0,
                  y: 0,
                  width: l,
                  height: m,
                },
                f.strokeWidth()
              )
            ),
            (f.isNew = !1));
          f[e ? "show" : "hide"]();
          b.styledMode && "none" === c.getStyle("display") && (l = m = 0);
          this.legendWidth = l;
          this.legendHeight = m;
          e && this.align();
          this.proximate || this.positionItems();
          p(this, "afterRender");
        };
        f.prototype.align = function (b) {
          void 0 === b && (b = this.chart.spacingBox);
          var a = this.chart,
            c = this.options,
            f = b.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0]
            ? (f += a.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < a.titleOffset[2] &&
              (f -= a.titleOffset[2]);
          f !== b.y &&
            (b = k(b, {
              y: f,
            }));
          this.group.align(
            k(c, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? "top" : c.verticalAlign,
            }),
            !0,
            b
          );
        };
        f.prototype.handleOverflow = function (b) {
          var a = this,
            c = this.chart,
            f = c.renderer,
            g = this.options,
            k = g.y,
            e = this.padding;
          k = c.spacingBox.height + ("top" === g.verticalAlign ? -k : k) - e;
          var l = g.maxHeight,
            C,
            x = this.clipRect,
            w = g.navigation,
            q = m(w.animation, !0),
            t = w.arrowSize || 12,
            p = this.nav,
            v = this.pages,
            A,
            h = this.allItems,
            y = function (b) {
              "number" === typeof b
                ? x.attr({
                    height: b,
                  })
                : x && ((a.clipRect = x.destroy()), a.contentGroup.clip());
              a.contentGroup.div &&
                (a.contentGroup.div.style.clip = b
                  ? "rect(" + e + "px,9999px," + (e + b) + "px,0)"
                  : "auto");
            },
            r = function (b) {
              a[b] = f
                .circle(0, 0, 1.3 * t)
                .translate(t / 2, t / 2)
                .add(p);
              c.styledMode || a[b].attr("fill", "rgba(0,0,0,0.0001)");
              return a[b];
            };
          "horizontal" !== g.layout ||
            "middle" === g.verticalAlign ||
            g.floating ||
            (k /= 2);
          l && (k = Math.min(k, l));
          v.length = 0;
          b && 0 < k && b > k && !1 !== w.enabled
            ? ((this.clipHeight = C =
                Math.max(k - 20 - this.titleHeight - e, 0)),
              (this.currentPage = m(this.currentPage, 1)),
              (this.fullHeight = b),
              h.forEach(function (b, a) {
                var e = b._legendItemPos[1],
                  c = Math.round(b.legendItem.getBBox().height),
                  g = v.length;
                if (!g || (e - v[g - 1] > C && (A || e) !== v[g - 1]))
                  v.push(A || e), g++;
                b.pageIx = g - 1;
                A && (h[a - 1].pageIx = g - 1);
                a === h.length - 1 &&
                  e + c - v[g - 1] > C &&
                  e !== A &&
                  (v.push(e), (b.pageIx = g));
                e !== A && (A = e);
              }),
              x ||
                ((x = a.clipRect = f.clipRect(0, e, 9999, 0)),
                a.contentGroup.clip(x)),
              y(C),
              p ||
                ((this.nav = p =
                  f
                    .g()
                    .attr({
                      zIndex: 1,
                    })
                    .add(this.group)),
                (this.up = f.symbol("triangle", 0, 0, t, t).add(p)),
                r("upTracker").on("click", function () {
                  a.scroll(-1, q);
                }),
                (this.pager = f
                  .text("", 15, 10)
                  .addClass("highcharts-legend-navigation")),
                c.styledMode || this.pager.css(w.style),
                this.pager.add(p),
                (this.down = f.symbol("triangle-down", 0, 0, t, t).add(p)),
                r("downTracker").on("click", function () {
                  a.scroll(1, q);
                })),
              a.scroll(0),
              (b = k))
            : p &&
              (y(),
              (this.nav = p.destroy()),
              this.scrollGroup.attr({
                translateY: 1,
              }),
              (this.clipHeight = 0));
          return b;
        };
        f.prototype.scroll = function (b, a) {
          var c = this,
            f = this.chart,
            g = this.pages,
            k = g.length,
            e = this.currentPage + b;
          b = this.clipHeight;
          var l = this.options.navigation,
            C = this.pager,
            x = this.padding;
          e > k && (e = k);
          0 < e &&
            ("undefined" !== typeof a && G(a, f),
            this.nav.attr({
              translateX: x,
              translateY: b + this.padding + 7 + this.titleHeight,
              visibility: "visible",
            }),
            [this.up, this.upTracker].forEach(function (b) {
              b.attr({
                class:
                  1 === e
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }),
            C.attr({
              text: e + "/" + k,
            }),
            [this.down, this.downTracker].forEach(function (b) {
              b.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  e === k
                    ? "highcharts-legend-nav-inactive"
                    : "highcharts-legend-nav-active",
              });
            }, this),
            f.styledMode ||
              (this.up.attr({
                fill: 1 === e ? l.inactiveColor : l.activeColor,
              }),
              this.upTracker.css({
                cursor: 1 === e ? "default" : "pointer",
              }),
              this.down.attr({
                fill: e === k ? l.inactiveColor : l.activeColor,
              }),
              this.downTracker.css({
                cursor: e === k ? "default" : "pointer",
              })),
            (this.scrollOffset = -g[e - 1] + this.initialItemY),
            this.scrollGroup.animate({
              translateY: this.scrollOffset,
            }),
            (this.currentPage = e),
            this.positionCheckboxes(),
            (a = N(m(a, f.renderer.globalAnimation, !0))),
            t(function () {
              p(c, "afterScroll", {
                currentPage: e,
              });
            }, a.duration));
        };
        f.prototype.setItemEvents = function (b, a, c) {
          var f = this,
            g = f.chart.renderer.boxWrapper,
            n = b instanceof F,
            e = "highcharts-legend-" + (n ? "point" : "series") + "-active",
            l = f.chart.styledMode;
          (c ? [a, b.legendSymbol] : [b.legendGroup]).forEach(function (c) {
            if (c)
              c.on("mouseover", function () {
                b.visible &&
                  f.allItems.forEach(function (a) {
                    b !== a && a.setState("inactive", !n);
                  });
                b.setState("hover");
                b.visible && g.addClass(e);
                l || a.css(f.options.itemHoverStyle);
              })
                .on("mouseout", function () {
                  f.chart.styledMode ||
                    a.css(k(b.visible ? f.itemStyle : f.itemHiddenStyle));
                  f.allItems.forEach(function (a) {
                    b !== a && a.setState("", !n);
                  });
                  g.removeClass(e);
                  b.setState();
                })
                .on("click", function (a) {
                  var c = function () {
                    b.setVisible && b.setVisible();
                    f.allItems.forEach(function (a) {
                      b !== a && a.setState(b.visible ? "inactive" : "", !n);
                    });
                  };
                  g.removeClass(e);
                  a = {
                    browserEvent: a,
                  };
                  b.firePointEvent
                    ? b.firePointEvent("legendItemClick", a, c)
                    : p(b, "legendItemClick", a, c);
                });
          });
        };
        f.prototype.createCheckboxForItem = function (b) {
          b.checkbox = u(
            "input",
            {
              type: "checkbox",
              className: "highcharts-legend-checkbox",
              checked: b.selected,
              defaultChecked: b.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          B(b.checkbox, "click", function (a) {
            p(
              b.series || b,
              "checkboxClick",
              {
                checked: a.target.checked,
                item: b,
              },
              function () {
                b.select();
              }
            );
          });
        };
        return f;
      })();
      (/Trident\/7\.0/.test(h.navigator && h.navigator.userAgent) || d) &&
        J(f.prototype, "positionItem", function (a, b) {
          var c = this,
            f = function () {
              b._legendItemPos && a.call(c, b);
            };
          f();
          c.bubbleLegend || setTimeout(f);
        });
      K.Legend = f;
      return K.Legend;
    }
  );
  Q(
    d,
    "Core/Series/SeriesRegistry.js",
    [
      d["Core/Globals.js"],
      d["Core/Options.js"],
      d["Core/Series/Point.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var J = h.defaultOptions,
        N = F.error,
        G = F.extendClass,
        I = F.merge,
        D;
      (function (h) {
        function u(c, a) {
          var r = J.plotOptions || {},
            y = a.defaultOptions;
          a.prototype.pointClass || (a.prototype.pointClass = K);
          a.prototype.type = c;
          y && (r[c] = y);
          h.seriesTypes[c] = a;
        }
        h.seriesTypes = d.seriesTypes;
        h.getSeries = function (c, a) {
          void 0 === a && (a = {});
          var r = c.options.chart;
          r = a.type || r.type || r.defaultSeriesType || "";
          var y = h.seriesTypes[r];
          h ||
            N(17, !0, c, {
              missingModuleFor: r,
            });
          r = new y();
          "function" === typeof r.init && r.init(c, a);
          return r;
        };
        h.registerSeriesType = u;
        h.seriesType = function (c, a, r, y, p) {
          var d = J.plotOptions || {};
          a = a || "";
          d[c] = I(d[a], r);
          u(c, G(h.seriesTypes[a] || function () {}, y));
          h.seriesTypes[c].prototype.type = c;
          p && (h.seriesTypes[c].prototype.pointClass = G(K, p));
          return h.seriesTypes[c];
        };
      })(D || (D = {}));
      d.seriesType = D.seriesType;
      return D;
    }
  );
  Q(
    d,
    "Core/Chart/Chart.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Axis/Axis.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Legend.js"],
      d["Core/MSPointer.js"],
      d["Core/Options.js"],
      d["Core/Color/Palette.js"],
      d["Core/Pointer.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Time.js"],
      d["Core/Utilities.js"],
      d["Core/Renderer/HTML/AST.js"],
    ],
    function (d, h, K, F, J, M, G, I, D, B, u, c, a) {
      var r = d.animate,
        y = d.animObject,
        p = d.setAnimation,
        O = K.numberFormat,
        k = F.charts,
        m = F.doc,
        L = F.win,
        A = G.defaultOptions,
        t = G.defaultTime,
        f = B.seriesTypes,
        v = c.addEvent,
        b = c.attr,
        E = c.cleanRecursively,
        P = c.createElement,
        H = c.css,
        g = c.defined,
        n = c.discardElement,
        e = c.erase,
        l = c.error,
        C = c.extend,
        x = c.find,
        w = c.fireEvent,
        q = c.getStyle,
        z = c.isArray,
        N = c.isFunction,
        V = c.isNumber,
        aa = c.isObject,
        R = c.isString,
        U = c.merge,
        W = c.objectEach,
        S = c.pick,
        ba = c.pInt,
        ca = c.relativeLength,
        da = c.removeEvent,
        Z = c.splat,
        ea = c.syncTimeout,
        fa = c.uniqueKey,
        Y = F.marginNames,
        X = (function () {
          function d(b, a, e) {
            this.series =
              this.renderTo =
              this.renderer =
              this.pointer =
              this.pointCount =
              this.plotWidth =
              this.plotTop =
              this.plotLeft =
              this.plotHeight =
              this.plotBox =
              this.options =
              this.numberFormatter =
              this.margin =
              this.legend =
              this.labelCollectors =
              this.isResizing =
              this.index =
              this.container =
              this.colorCounter =
              this.clipBox =
              this.chartWidth =
              this.chartHeight =
              this.bounds =
              this.axisOffset =
              this.axes =
                void 0;
            this.sharedClips = {};
            this.yAxis =
              this.xAxis =
              this.userOptions =
              this.titleOffset =
              this.time =
              this.symbolCounter =
              this.spacingBox =
              this.spacing =
                void 0;
            this.getArgs(b, a, e);
          }
          d.prototype.getArgs = function (b, a, e) {
            R(b) || b.nodeName
              ? ((this.renderTo = b), this.init(a, e))
              : this.init(b, a);
          };
          d.prototype.init = function (b, a) {
            var e = b.plotOptions || {};
            w(
              this,
              "init",
              {
                args: arguments,
              },
              function () {
                var c = U(A, b),
                  g = c.chart;
                W(c.plotOptions, function (b, a) {
                  aa(b) && (b.tooltip = (e[a] && U(e[a].tooltip)) || void 0);
                });
                c.tooltip.userOptions =
                  (b.chart && b.chart.forExport && b.tooltip.userOptions) ||
                  b.tooltip;
                this.userOptions = b;
                var f = g.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                  h: {},
                  v: {},
                };
                this.labelCollectors = [];
                this.callback = a;
                this.isResizing = 0;
                this.options = c;
                this.axes = [];
                this.series = [];
                this.time =
                  b.time && Object.keys(b.time).length ? new u(b.time) : F.time;
                this.numberFormatter = g.numberFormatter || O;
                this.styledMode = g.styledMode;
                this.hasCartesianSeries = g.showAxes;
                var l = this;
                l.index = k.length;
                k.push(l);
                F.chartCount++;
                f &&
                  W(f, function (b, a) {
                    N(b) && v(l, a, b);
                  });
                l.xAxis = [];
                l.yAxis = [];
                l.pointCount = l.colorCounter = l.symbolCounter = 0;
                w(l, "afterInit");
                l.firstRender();
              }
            );
          };
          d.prototype.initSeries = function (b) {
            var a = this.options.chart;
            a = b.type || a.type || a.defaultSeriesType;
            var e = f[a];
            e ||
              l(17, !0, this, {
                missingModuleFor: a,
              });
            a = new e();
            "function" === typeof a.init && a.init(this, b);
            return a;
          };
          d.prototype.setSeriesData = function () {
            this.getSeriesOrderByLinks().forEach(function (b) {
              b.points ||
                b.data ||
                !b.enabledDataSorting ||
                b.setData(b.options.data, !1);
            });
          };
          d.prototype.getSeriesOrderByLinks = function () {
            return this.series.concat().sort(function (b, a) {
              return b.linkedSeries.length || a.linkedSeries.length
                ? a.linkedSeries.length - b.linkedSeries.length
                : 0;
            });
          };
          d.prototype.orderSeries = function (b) {
            var a = this.series;
            for (b = b || 0; b < a.length; b++)
              a[b] && ((a[b].index = b), (a[b].name = a[b].getName()));
          };
          d.prototype.isInsidePlot = function (b, a, e) {
            void 0 === e && (e = {});
            var c = this.inverted,
              g = this.plotBox,
              f = this.plotLeft,
              l = this.plotTop,
              k = this.scrollablePlotBox,
              n = this.scrollingContainer;
            n =
              void 0 === n
                ? {
                    scrollLeft: 0,
                    scrollTop: 0,
                  }
                : n;
            var q = n.scrollLeft;
            n = n.scrollTop;
            var m = e.series;
            g = (e.visiblePlotOnly && k) || g;
            k = e.inverted ? a : b;
            a = e.inverted ? b : a;
            b = {
              x: k,
              y: a,
              isInsidePlot: !0,
            };
            if (!e.ignoreX) {
              var x = (m && (c ? m.yAxis : m.xAxis)) || {
                pos: f,
                len: Infinity,
              };
              k = e.paneCoordinates ? x.pos + k : f + k;
              (k >= Math.max(q + f, x.pos) &&
                k <= Math.min(q + f + g.width, x.pos + x.len)) ||
                (b.isInsidePlot = !1);
            }
            !e.ignoreY &&
              b.isInsidePlot &&
              ((c = (m && (c ? m.xAxis : m.yAxis)) || {
                pos: l,
                len: Infinity,
              }),
              (e = e.paneCoordinates ? c.pos + a : l + a),
              (e >= Math.max(n + l, c.pos) &&
                e <= Math.min(n + l + g.height, c.pos + c.len)) ||
                (b.isInsidePlot = !1));
            w(this, "afterIsInsidePlot", b);
            return b.isInsidePlot;
          };
          d.prototype.redraw = function (b) {
            w(this, "beforeRedraw");
            var a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
              e = this.series,
              c = this.pointer,
              g = this.legend,
              f = this.userOptions.legend,
              l = this.isDirtyLegend,
              k = this.isDirtyBox,
              n = this.renderer,
              q = n.isHidden(),
              m = [];
            this.setResponsive && this.setResponsive(!1);
            p(this.hasRendered ? b : !1, this);
            q && this.temporaryDisplay();
            this.layOutTitles();
            for (b = e.length; b--; ) {
              var x = e[b];
              if (x.options.stacking || x.options.centerInCategory) {
                var t = !0;
                if (x.isDirty) {
                  var v = !0;
                  break;
                }
              }
            }
            if (v)
              for (b = e.length; b--; )
                (x = e[b]), x.options.stacking && (x.isDirty = !0);
            e.forEach(function (b) {
              b.isDirty &&
                ("point" === b.options.legendType
                  ? ("function" === typeof b.updateTotals && b.updateTotals(),
                    (l = !0))
                  : f && (f.labelFormatter || f.labelFormat) && (l = !0));
              b.isDirtyData && w(b, "updatedData");
            });
            l &&
              g &&
              g.options.enabled &&
              (g.render(), (this.isDirtyLegend = !1));
            t && this.getStacks();
            a.forEach(function (b) {
              b.updateNames();
              b.setScale();
            });
            this.getMargins();
            a.forEach(function (b) {
              b.isDirty && (k = !0);
            });
            a.forEach(function (b) {
              var a = b.min + "," + b.max;
              b.extKey !== a &&
                ((b.extKey = a),
                m.push(function () {
                  w(b, "afterSetExtremes", C(b.eventArgs, b.getExtremes()));
                  delete b.eventArgs;
                }));
              (k || t) && b.redraw();
            });
            k && this.drawChartBox();
            w(this, "predraw");
            e.forEach(function (b) {
              (k || b.isDirty) && b.visible && b.redraw();
              b.isDirtyData = !1;
            });
            c && c.reset(!0);
            n.draw();
            w(this, "redraw");
            w(this, "render");
            q && this.temporaryDisplay(!0);
            m.forEach(function (b) {
              b.call();
            });
          };
          d.prototype.get = function (b) {
            function a(a) {
              return a.id === b || (a.options && a.options.id === b);
            }
            var e = this.series,
              c;
            var g = x(this.axes, a) || x(this.series, a);
            for (c = 0; !g && c < e.length; c++) g = x(e[c].points || [], a);
            return g;
          };
          d.prototype.getAxes = function () {
            var b = this,
              a = this.options,
              e = (a.xAxis = Z(a.xAxis || {}));
            a = a.yAxis = Z(a.yAxis || {});
            w(this, "getAxes");
            e.forEach(function (b, a) {
              b.index = a;
              b.isX = !0;
            });
            a.forEach(function (b, a) {
              b.index = a;
            });
            e.concat(a).forEach(function (a) {
              new h(b, a);
            });
            w(this, "afterGetAxes");
          };
          d.prototype.getSelectedPoints = function () {
            var b = [];
            this.series.forEach(function (a) {
              b = b.concat(
                a.getPointsCollection().filter(function (b) {
                  return S(b.selectedStaging, b.selected);
                })
              );
            });
            return b;
          };
          d.prototype.getSelectedSeries = function () {
            return this.series.filter(function (b) {
              return b.selected;
            });
          };
          d.prototype.setTitle = function (b, a, e) {
            this.applyDescription("title", b);
            this.applyDescription("subtitle", a);
            this.applyDescription("caption", void 0);
            this.layOutTitles(e);
          };
          d.prototype.applyDescription = function (b, a) {
            var e = this,
              c =
                "title" === b
                  ? {
                      color: I.neutralColor80,
                      fontSize: this.options.isStock ? "16px" : "18px",
                    }
                  : {
                      color: I.neutralColor60,
                    };
            c = this.options[b] = U(
              !this.styledMode && {
                style: c,
              },
              this.options[b],
              a
            );
            var g = this[b];
            g && a && (this[b] = g = g.destroy());
            c &&
              !g &&
              ((g = this.renderer
                .text(c.text, 0, 0, c.useHTML)
                .attr({
                  align: c.align,
                  class: "highcharts-" + b,
                  zIndex: c.zIndex || 4,
                })
                .add()),
              (g.update = function (a) {
                e[
                  {
                    title: "setTitle",
                    subtitle: "setSubtitle",
                    caption: "setCaption",
                  }[b]
                ](a);
              }),
              this.styledMode || g.css(c.style),
              (this[b] = g));
          };
          d.prototype.layOutTitles = function (b) {
            var a = [0, 0, 0],
              e = this.renderer,
              c = this.spacingBox;
            ["title", "subtitle", "caption"].forEach(function (b) {
              var g = this[b],
                f = this.options[b],
                l = f.verticalAlign || "top";
              b = "title" === b ? -3 : "top" === l ? a[0] + 2 : 0;
              if (g) {
                if (!this.styledMode) var k = f.style.fontSize;
                k = e.fontMetrics(k, g).b;
                g.css({
                  width: (f.width || c.width + (f.widthAdjust || 0)) + "px",
                });
                var n = Math.round(g.getBBox(f.useHTML).height);
                g.align(
                  C(
                    {
                      y: "bottom" === l ? k : b + k,
                      height: n,
                    },
                    f
                  ),
                  !1,
                  "spacingBox"
                );
                f.floating ||
                  ("top" === l
                    ? (a[0] = Math.ceil(a[0] + n))
                    : "bottom" === l && (a[2] = Math.ceil(a[2] + n)));
              }
            }, this);
            a[0] &&
              "top" === (this.options.title.verticalAlign || "top") &&
              (a[0] += this.options.title.margin);
            a[2] &&
              "bottom" === this.options.caption.verticalAlign &&
              (a[2] += this.options.caption.margin);
            var g =
              !this.titleOffset || this.titleOffset.join(",") !== a.join(",");
            this.titleOffset = a;
            w(this, "afterLayOutTitles");
            !this.isDirtyBox &&
              g &&
              ((this.isDirtyBox = this.isDirtyLegend = g),
              this.hasRendered && S(b, !0) && this.isDirtyBox && this.redraw());
          };
          d.prototype.getChartSize = function () {
            var b = this.options.chart,
              a = b.width;
            b = b.height;
            var e = this.renderTo;
            g(a) || (this.containerWidth = q(e, "width"));
            g(b) || (this.containerHeight = q(e, "height"));
            this.chartWidth = Math.max(0, a || this.containerWidth || 600);
            this.chartHeight = Math.max(
              0,
              ca(b, this.chartWidth) ||
                (1 < this.containerHeight ? this.containerHeight : 400)
            );
          };
          d.prototype.temporaryDisplay = function (b) {
            var a = this.renderTo;
            if (b)
              for (; a && a.style; )
                a.hcOrigStyle && (H(a, a.hcOrigStyle), delete a.hcOrigStyle),
                  a.hcOrigDetached &&
                    (m.body.removeChild(a), (a.hcOrigDetached = !1)),
                  (a = a.parentNode);
            else
              for (; a && a.style; ) {
                m.body.contains(a) ||
                  a.parentNode ||
                  ((a.hcOrigDetached = !0), m.body.appendChild(a));
                if ("none" === q(a, "display", !1) || a.hcOricDetached)
                  (a.hcOrigStyle = {
                    display: a.style.display,
                    height: a.style.height,
                    overflow: a.style.overflow,
                  }),
                    (b = {
                      display: "block",
                      overflow: "hidden",
                    }),
                    a !== this.renderTo && (b.height = 0),
                    H(a, b),
                    a.offsetWidth ||
                      a.style.setProperty("display", "block", "important");
                a = a.parentNode;
                if (a === m.body) break;
              }
          };
          d.prototype.setClassName = function (b) {
            this.container.className = "highcharts-container " + (b || "");
          };
          d.prototype.getContainer = function () {
            var a = this.options,
              e = a.chart;
            var c = this.renderTo;
            var g = fa(),
              f,
              n;
            c || (this.renderTo = c = e.renderTo);
            R(c) && (this.renderTo = c = m.getElementById(c));
            c || l(13, !0, this);
            var q = ba(b(c, "data-highcharts-chart"));
            V(q) && k[q] && k[q].hasRendered && k[q].destroy();
            b(c, "data-highcharts-chart", this.index);
            c.innerHTML = "";
            e.skipClone || c.offsetWidth || this.temporaryDisplay();
            this.getChartSize();
            q = this.chartWidth;
            var x = this.chartHeight;
            H(c, {
              overflow: "hidden",
            });
            this.styledMode ||
              (f = C(
                {
                  position: "relative",
                  overflow: "hidden",
                  width: q + "px",
                  height: x + "px",
                  textAlign: "left",
                  lineHeight: "normal",
                  zIndex: 0,
                  "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                  userSelect: "none",
                  "touch-action": "manipulation",
                  outline: "none",
                },
                e.style || {}
              ));
            this.container = c = P(
              "div",
              {
                id: g,
              },
              f,
              c
            );
            this._cursor = c.style.cursor;
            this.renderer = new (F[e.renderer] || F.Renderer)(
              c,
              q,
              x,
              null,
              e.forExport,
              a.exporting && a.exporting.allowHTML,
              this.styledMode
            );
            p(void 0, this);
            this.setClassName(e.className);
            if (this.styledMode)
              for (n in a.defs) this.renderer.definition(a.defs[n]);
            else this.renderer.setStyle(e.style);
            this.renderer.chartIndex = this.index;
            w(this, "afterGetContainer");
          };
          d.prototype.getMargins = function (b) {
            var a = this.spacing,
              e = this.margin,
              c = this.titleOffset;
            this.resetMargins();
            c[0] &&
              !g(e[0]) &&
              (this.plotTop = Math.max(this.plotTop, c[0] + a[0]));
            c[2] &&
              !g(e[2]) &&
              (this.marginBottom = Math.max(this.marginBottom, c[2] + a[2]));
            this.legend &&
              this.legend.display &&
              this.legend.adjustMargins(e, a);
            w(this, "getMargins");
            b || this.getAxisMargins();
          };
          d.prototype.getAxisMargins = function () {
            var b = this,
              a = (b.axisOffset = [0, 0, 0, 0]),
              e = b.colorAxis,
              c = b.margin,
              f = function (b) {
                b.forEach(function (b) {
                  b.visible && b.getOffset();
                });
              };
            b.hasCartesianSeries ? f(b.axes) : e && e.length && f(e);
            Y.forEach(function (e, f) {
              g(c[f]) || (b[e] += a[f]);
            });
            b.setChartSize();
          };
          d.prototype.reflow = function (b) {
            var a = this,
              e = a.options.chart,
              f = a.renderTo,
              l = g(e.width) && g(e.height),
              k = e.width || q(f, "width");
            e = e.height || q(f, "height");
            f = b ? b.target : L;
            delete a.pointer.chartPosition;
            if (!l && !a.isPrinting && k && e && (f === L || f === m)) {
              if (k !== a.containerWidth || e !== a.containerHeight)
                c.clearTimeout(a.reflowTimeout),
                  (a.reflowTimeout = ea(
                    function () {
                      a.container && a.setSize(void 0, void 0, !1);
                    },
                    b ? 100 : 0
                  ));
              a.containerWidth = k;
              a.containerHeight = e;
            }
          };
          d.prototype.setReflow = function (b) {
            var a = this;
            !1 === b || this.unbindReflow
              ? !1 === b &&
                this.unbindReflow &&
                (this.unbindReflow = this.unbindReflow())
              : ((this.unbindReflow = v(L, "resize", function (b) {
                  a.options && a.reflow(b);
                })),
                v(this, "destroy", this.unbindReflow));
          };
          d.prototype.setSize = function (b, a, e) {
            var c = this,
              g = c.renderer;
            c.isResizing += 1;
            p(e, c);
            e = g.globalAnimation;
            c.oldChartHeight = c.chartHeight;
            c.oldChartWidth = c.chartWidth;
            "undefined" !== typeof b && (c.options.chart.width = b);
            "undefined" !== typeof a && (c.options.chart.height = a);
            c.getChartSize();
            c.styledMode ||
              (e ? r : H)(
                c.container,
                {
                  width: c.chartWidth + "px",
                  height: c.chartHeight + "px",
                },
                e
              );
            c.setChartSize(!0);
            g.setSize(c.chartWidth, c.chartHeight, e);
            c.axes.forEach(function (b) {
              b.isDirty = !0;
              b.setScale();
            });
            c.isDirtyLegend = !0;
            c.isDirtyBox = !0;
            c.layOutTitles();
            c.getMargins();
            c.redraw(e);
            c.oldChartHeight = null;
            w(c, "resize");
            ea(function () {
              c &&
                w(c, "endResize", null, function () {
                  --c.isResizing;
                });
            }, y(e).duration);
          };
          d.prototype.setChartSize = function (b) {
            var a = this.inverted,
              e = this.renderer,
              c = this.chartWidth,
              g = this.chartHeight,
              f = this.options.chart,
              l = this.spacing,
              k = this.clipOffset,
              n,
              q,
              m,
              x;
            this.plotLeft = n = Math.round(this.plotLeft);
            this.plotTop = q = Math.round(this.plotTop);
            this.plotWidth = m = Math.max(
              0,
              Math.round(c - n - this.marginRight)
            );
            this.plotHeight = x = Math.max(
              0,
              Math.round(g - q - this.marginBottom)
            );
            this.plotSizeX = a ? x : m;
            this.plotSizeY = a ? m : x;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = e.spacingBox = {
              x: l[3],
              y: l[0],
              width: c - l[3] - l[1],
              height: g - l[0] - l[2],
            };
            this.plotBox = e.plotBox = {
              x: n,
              y: q,
              width: m,
              height: x,
            };
            g = 2 * Math.floor(this.plotBorderWidth / 2);
            a = Math.ceil(Math.max(g, k[3]) / 2);
            c = Math.ceil(Math.max(g, k[0]) / 2);
            this.clipBox = {
              x: a,
              y: c,
              width: Math.floor(this.plotSizeX - Math.max(g, k[1]) / 2 - a),
              height: Math.max(
                0,
                Math.floor(this.plotSizeY - Math.max(g, k[2]) / 2 - c)
              ),
            };
            b ||
              (this.axes.forEach(function (b) {
                b.setAxisSize();
                b.setAxisTranslation();
              }),
              e.alignElements());
            w(this, "afterSetChartSize", {
              skipAxes: b,
            });
          };
          d.prototype.resetMargins = function () {
            w(this, "resetMargins");
            var b = this,
              a = b.options.chart;
            ["margin", "spacing"].forEach(function (e) {
              var c = a[e],
                g = aa(c) ? c : [c, c, c, c];
              ["Top", "Right", "Bottom", "Left"].forEach(function (c, f) {
                b[e][f] = S(a[e + c], g[f]);
              });
            });
            Y.forEach(function (a, e) {
              b[a] = S(b.margin[e], b.spacing[e]);
            });
            b.axisOffset = [0, 0, 0, 0];
            b.clipOffset = [0, 0, 0, 0];
          };
          d.prototype.drawChartBox = function () {
            var b = this.options.chart,
              a = this.renderer,
              e = this.chartWidth,
              c = this.chartHeight,
              g = this.chartBackground,
              f = this.plotBackground,
              l = this.plotBorder,
              k = this.styledMode,
              n = this.plotBGImage,
              q = b.backgroundColor,
              m = b.plotBackgroundColor,
              x = b.plotBackgroundImage,
              C,
              t = this.plotLeft,
              p = this.plotTop,
              v = this.plotWidth,
              d = this.plotHeight,
              A = this.plotBox,
              h = this.clipRect,
              z = this.clipBox,
              y = "animate";
            g ||
              ((this.chartBackground = g =
                a.rect().addClass("highcharts-background").add()),
              (y = "attr"));
            if (k) var r = (C = g.strokeWidth());
            else {
              r = b.borderWidth || 0;
              C = r + (b.shadow ? 8 : 0);
              q = {
                fill: q || "none",
              };
              if (r || g["stroke-width"])
                (q.stroke = b.borderColor), (q["stroke-width"] = r);
              g.attr(q).shadow(b.shadow);
            }
            g[y]({
              x: C / 2,
              y: C / 2,
              width: e - C - (r % 2),
              height: c - C - (r % 2),
              r: b.borderRadius,
            });
            y = "animate";
            f ||
              ((y = "attr"),
              (this.plotBackground = f =
                a.rect().addClass("highcharts-plot-background").add()));
            f[y](A);
            k ||
              (f
                .attr({
                  fill: m || "none",
                })
                .shadow(b.plotShadow),
              x &&
                (n
                  ? (x !== n.attr("href") && n.attr("href", x), n.animate(A))
                  : (this.plotBGImage = a.image(x, t, p, v, d).add())));
            h
              ? h.animate({
                  width: z.width,
                  height: z.height,
                })
              : (this.clipRect = a.clipRect(z));
            y = "animate";
            l ||
              ((y = "attr"),
              (this.plotBorder = l =
                a
                  .rect()
                  .addClass("highcharts-plot-border")
                  .attr({
                    zIndex: 1,
                  })
                  .add()));
            k ||
              l.attr({
                stroke: b.plotBorderColor,
                "stroke-width": b.plotBorderWidth || 0,
                fill: "none",
              });
            l[y](
              l.crisp(
                {
                  x: t,
                  y: p,
                  width: v,
                  height: d,
                },
                -l.strokeWidth()
              )
            );
            this.isDirtyBox = !1;
            w(this, "afterDrawChartBox");
          };
          d.prototype.propFromSeries = function () {
            var b = this,
              a = b.options.chart,
              e,
              c = b.options.series,
              g,
              l;
            ["inverted", "angular", "polar"].forEach(function (k) {
              e = f[a.type || a.defaultSeriesType];
              l = a[k] || (e && e.prototype[k]);
              for (g = c && c.length; !l && g--; )
                (e = f[c[g].type]) && e.prototype[k] && (l = !0);
              b[k] = l;
            });
          };
          d.prototype.linkSeries = function () {
            var b = this,
              a = b.series;
            a.forEach(function (b) {
              b.linkedSeries.length = 0;
            });
            a.forEach(function (a) {
              var e = a.options.linkedTo;
              R(e) &&
                (e = ":previous" === e ? b.series[a.index - 1] : b.get(e)) &&
                e.linkedParent !== a &&
                (e.linkedSeries.push(a),
                (a.linkedParent = e),
                e.enabledDataSorting && a.setDataSortingOptions(),
                (a.visible = S(
                  a.options.visible,
                  e.options.visible,
                  a.visible
                )));
            });
            w(this, "afterLinkSeries");
          };
          d.prototype.renderSeries = function () {
            this.series.forEach(function (b) {
              b.translate();
              b.render();
            });
          };
          d.prototype.renderLabels = function () {
            var b = this,
              a = b.options.labels;
            a.items &&
              a.items.forEach(function (e) {
                var c = C(a.style, e.style),
                  g = ba(c.left) + b.plotLeft,
                  f = ba(c.top) + b.plotTop + 12;
                delete c.left;
                delete c.top;
                b.renderer
                  .text(e.html, g, f)
                  .attr({
                    zIndex: 2,
                  })
                  .css(c)
                  .add();
              });
          };
          d.prototype.render = function () {
            var b = this.axes,
              a = this.colorAxis,
              e = this.renderer,
              c = this.options,
              g = 0,
              f = function (b) {
                b.forEach(function (b) {
                  b.visible && b.render();
                });
              };
            this.setTitle();
            this.legend = new J(this, c.legend);
            this.getStacks && this.getStacks();
            this.getMargins(!0);
            this.setChartSize();
            c = this.plotWidth;
            b.some(function (b) {
              if (
                b.horiz &&
                b.visible &&
                b.options.labels.enabled &&
                b.series.length
              )
                return (g = 21), !0;
            });
            var l = (this.plotHeight = Math.max(this.plotHeight - g, 0));
            b.forEach(function (b) {
              b.setScale();
            });
            this.getAxisMargins();
            var k = 1.1 < c / this.plotWidth;
            var n = 1.05 < l / this.plotHeight;
            if (k || n)
              b.forEach(function (b) {
                ((b.horiz && k) || (!b.horiz && n)) && b.setTickInterval(!0);
              }),
                this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries ? f(b) : a && a.length && f(a);
            this.seriesGroup ||
              (this.seriesGroup = e
                .g("series-group")
                .attr({
                  zIndex: 3,
                })
                .add());
            this.renderSeries();
            this.renderLabels();
            this.addCredits();
            this.setResponsive && this.setResponsive();
            this.hasRendered = !0;
          };
          d.prototype.addCredits = function (b) {
            var a = this,
              e = U(!0, this.options.credits, b);
            e.enabled &&
              !this.credits &&
              ((this.credits = this.renderer
                .text(e.text + (this.mapCredits || ""), 0, 0)
                .addClass("highcharts-credits")
                .on("click", function () {
                  e.href && (L.location.href = e.href);
                })
                .attr({
                  align: e.position.align,
                  zIndex: 8,
                })),
              a.styledMode || this.credits.css(e.style),
              this.credits.add().align(e.position),
              (this.credits.update = function (b) {
                a.credits = a.credits.destroy();
                a.addCredits(b);
              }));
          };
          d.prototype.destroy = function () {
            var b = this,
              a = b.axes,
              c = b.series,
              g = b.container,
              f,
              l = g && g.parentNode;
            w(b, "destroy");
            b.renderer.forExport ? e(k, b) : (k[b.index] = void 0);
            F.chartCount--;
            b.renderTo.removeAttribute("data-highcharts-chart");
            da(b);
            for (f = a.length; f--; ) a[f] = a[f].destroy();
            this.scroller && this.scroller.destroy && this.scroller.destroy();
            for (f = c.length; f--; ) c[f] = c[f].destroy();
            "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
              .split(" ")
              .forEach(function (a) {
                var e = b[a];
                e && e.destroy && (b[a] = e.destroy());
              });
            g && ((g.innerHTML = ""), da(g), l && n(g));
            W(b, function (a, e) {
              delete b[e];
            });
          };
          d.prototype.firstRender = function () {
            var b = this,
              a = b.options;
            if (!b.isReadyToRender || b.isReadyToRender()) {
              b.getContainer();
              b.resetMargins();
              b.setChartSize();
              b.propFromSeries();
              b.getAxes();
              (z(a.series) ? a.series : []).forEach(function (a) {
                b.initSeries(a);
              });
              b.linkSeries();
              b.setSeriesData();
              w(b, "beforeRender");
              D &&
                (b.pointer =
                  F.hasTouch || (!L.PointerEvent && !L.MSPointerEvent)
                    ? new D(b, a)
                    : new M(b, a));
              b.render();
              b.pointer.getChartPosition();
              if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
              b.temporaryDisplay(!0);
            }
          };
          d.prototype.onload = function () {
            this.callbacks.concat([this.callback]).forEach(function (b) {
              b && "undefined" !== typeof this.index && b.apply(this, [this]);
            }, this);
            w(this, "load");
            w(this, "render");
            g(this.index) && this.setReflow(this.options.chart.reflow);
            this.hasLoaded = !0;
          };
          d.prototype.addSeries = function (b, a, e) {
            var c,
              g = this;
            b &&
              ((a = S(a, !0)),
              w(
                g,
                "addSeries",
                {
                  options: b,
                },
                function () {
                  c = g.initSeries(b);
                  g.isDirtyLegend = !0;
                  g.linkSeries();
                  c.enabledDataSorting && c.setData(b.data, !1);
                  w(g, "afterAddSeries", {
                    series: c,
                  });
                  a && g.redraw(e);
                }
              ));
            return c;
          };
          d.prototype.addAxis = function (b, a, e, c) {
            return this.createAxis(a ? "xAxis" : "yAxis", {
              axis: b,
              redraw: e,
              animation: c,
            });
          };
          d.prototype.addColorAxis = function (b, a, e) {
            return this.createAxis("colorAxis", {
              axis: b,
              redraw: a,
              animation: e,
            });
          };
          d.prototype.createAxis = function (b, a) {
            var e = "colorAxis" === b,
              c = a.redraw,
              g = a.animation;
            b = U(a.axis, {
              index: this[b].length,
              isX: "xAxis" === b,
            });
            b = e ? new F.ColorAxis(this, b) : new h(this, b);
            e &&
              ((this.isDirtyLegend = !0),
              this.axes.forEach(function (b) {
                b.series = [];
              }),
              this.series.forEach(function (b) {
                b.bindAxes();
                b.isDirtyData = !0;
              }));
            S(c, !0) && this.redraw(g);
            return b;
          };
          d.prototype.showLoading = function (b) {
            var e = this,
              c = e.options,
              g = e.loadingDiv,
              f = e.loadingSpan,
              l = c.loading,
              k = function () {
                g &&
                  H(g, {
                    left: e.plotLeft + "px",
                    top: e.plotTop + "px",
                    width: e.plotWidth + "px",
                    height: e.plotHeight + "px",
                  });
              };
            g ||
              (e.loadingDiv = g =
                P(
                  "div",
                  {
                    className: "highcharts-loading highcharts-loading-hidden",
                  },
                  null,
                  e.container
                ));
            f ||
              ((e.loadingSpan = f =
                P(
                  "span",
                  {
                    className: "highcharts-loading-inner",
                  },
                  null,
                  g
                )),
              v(e, "redraw", k));
            g.className = "highcharts-loading";
            a.setElementHTML(f, S(b, c.lang.loading, ""));
            e.styledMode ||
              (H(
                g,
                C(l.style, {
                  zIndex: 10,
                })
              ),
              H(f, l.labelStyle),
              e.loadingShown ||
                (H(g, {
                  opacity: 0,
                  display: "",
                }),
                r(
                  g,
                  {
                    opacity: l.style.opacity || 0.5,
                  },
                  {
                    duration: l.showDuration || 0,
                  }
                )));
            e.loadingShown = !0;
            k();
          };
          d.prototype.hideLoading = function () {
            var b = this.options,
              a = this.loadingDiv;
            a &&
              ((a.className = "highcharts-loading highcharts-loading-hidden"),
              this.styledMode ||
                r(
                  a,
                  {
                    opacity: 0,
                  },
                  {
                    duration: b.loading.hideDuration || 100,
                    complete: function () {
                      H(a, {
                        display: "none",
                      });
                    },
                  }
                ));
            this.loadingShown = !1;
          };
          d.prototype.update = function (b, a, e, c) {
            var f = this,
              l = {
                credits: "addCredits",
                title: "setTitle",
                subtitle: "setSubtitle",
                caption: "setCaption",
              },
              k,
              n,
              q,
              m = b.isResponsiveOptions,
              x = [];
            w(f, "update", {
              options: b,
            });
            m || f.setResponsive(!1, !0);
            b = E(b, f.options);
            f.userOptions = U(f.userOptions, b);
            if ((k = b.chart)) {
              U(!0, f.options.chart, k);
              "className" in k && f.setClassName(k.className);
              "reflow" in k && f.setReflow(k.reflow);
              if ("inverted" in k || "polar" in k || "type" in k) {
                f.propFromSeries();
                var C = !0;
              }
              "alignTicks" in k && (C = !0);
              W(k, function (b, a) {
                -1 !== f.propsRequireUpdateSeries.indexOf("chart." + a) &&
                  (n = !0);
                -1 !== f.propsRequireDirtyBox.indexOf(a) && (f.isDirtyBox = !0);
                -1 !== f.propsRequireReflow.indexOf(a) &&
                  (m ? (f.isDirtyBox = !0) : (q = !0));
              });
              !f.styledMode && "style" in k && f.renderer.setStyle(k.style);
            }
            !f.styledMode && b.colors && (this.options.colors = b.colors);
            b.time &&
              (this.time === t && (this.time = new u(b.time)),
              U(!0, f.options.time, b.time));
            W(b, function (a, e) {
              if (f[e] && "function" === typeof f[e].update) f[e].update(a, !1);
              else if ("function" === typeof f[l[e]]) f[l[e]](a);
              else
                "colors" !== e &&
                  -1 === f.collectionsWithUpdate.indexOf(e) &&
                  U(!0, f.options[e], b[e]);
              "chart" !== e &&
                -1 !== f.propsRequireUpdateSeries.indexOf(e) &&
                (n = !0);
            });
            this.collectionsWithUpdate.forEach(function (a) {
              if (b[a]) {
                var c = [];
                f[a].forEach(function (b, a) {
                  b.options.isInternal || c.push(S(b.options.index, a));
                });
                Z(b[a]).forEach(function (b, l) {
                  var k = g(b.id),
                    n;
                  k && (n = f.get(b.id));
                  !n &&
                    f[a] &&
                    (n = f[a][c ? c[l] : l]) &&
                    k &&
                    g(n.options.id) &&
                    (n = void 0);
                  n && n.coll === a && (n.update(b, !1), e && (n.touched = !0));
                  !n &&
                    e &&
                    f.collectionsWithInit[a] &&
                    (f.collectionsWithInit[a][0].apply(
                      f,
                      [b].concat(f.collectionsWithInit[a][1] || []).concat([!1])
                    ).touched = !0);
                });
                e &&
                  f[a].forEach(function (b) {
                    b.touched || b.options.isInternal
                      ? delete b.touched
                      : x.push(b);
                  });
              }
            });
            x.forEach(function (b) {
              b.chart && b.remove(!1);
            });
            C &&
              f.axes.forEach(function (b) {
                b.update({}, !1);
              });
            n &&
              f.getSeriesOrderByLinks().forEach(function (b) {
                b.chart && b.update({}, !1);
              }, this);
            C = k && k.width;
            k = k && k.height;
            R(k) && (k = ca(k, C || f.chartWidth));
            q || (V(C) && C !== f.chartWidth) || (V(k) && k !== f.chartHeight)
              ? f.setSize(C, k, c)
              : S(a, !0) && f.redraw(c);
            w(f, "afterUpdate", {
              options: b,
              redraw: a,
              animation: c,
            });
          };
          d.prototype.setSubtitle = function (b, a) {
            this.applyDescription("subtitle", b);
            this.layOutTitles(a);
          };
          d.prototype.setCaption = function (b, a) {
            this.applyDescription("caption", b);
            this.layOutTitles(a);
          };
          d.prototype.showResetZoom = function () {
            function b() {
              a.zoomOut();
            }
            var a = this,
              e = A.lang,
              c = a.options.chart.resetZoomButton,
              g = c.theme,
              f = g.states,
              l =
                "chart" === c.relativeTo || "spacingBox" === c.relativeTo
                  ? null
                  : "scrollablePlotBox";
            w(this, "beforeShowResetZoom", null, function () {
              a.resetZoomButton = a.renderer
                .button(e.resetZoom, null, null, b, g, f && f.hover)
                .attr({
                  align: c.position.align,
                  title: e.resetZoomTitle,
                })
                .addClass("highcharts-reset-zoom")
                .add()
                .align(c.position, !1, l);
            });
            w(this, "afterShowResetZoom");
          };
          d.prototype.zoomOut = function () {
            w(
              this,
              "selection",
              {
                resetSelection: !0,
              },
              this.zoom
            );
          };
          d.prototype.zoom = function (b) {
            var a = this,
              e,
              c = a.pointer,
              f = !1,
              l = a.inverted ? c.mouseDownX : c.mouseDownY;
            !b || b.resetSelection
              ? (a.axes.forEach(function (b) {
                  e = b.zoom();
                }),
                (c.initiated = !1))
              : b.xAxis.concat(b.yAxis).forEach(function (b) {
                  var k = b.axis,
                    n = a.inverted ? k.left : k.top,
                    q = a.inverted ? n + k.width : n + k.height,
                    m = k.isXAxis,
                    x = !1;
                  if ((!m && l >= n && l <= q) || m || !g(l)) x = !0;
                  c[m ? "zoomX" : "zoomY"] &&
                    x &&
                    ((e = k.zoom(b.min, b.max)), k.displayBtn && (f = !0));
                });
            var k = a.resetZoomButton;
            f && !k
              ? a.showResetZoom()
              : !f && aa(k) && (a.resetZoomButton = k.destroy());
            e &&
              a.redraw(
                S(
                  a.options.chart.animation,
                  b && b.animation,
                  100 > a.pointCount
                )
              );
          };
          d.prototype.pan = function (b, a) {
            var e = this,
              c = e.hoverPoints,
              g = e.options.chart,
              f = e.options.mapNavigation && e.options.mapNavigation.enabled,
              l;
            a =
              "object" === typeof a
                ? a
                : {
                    enabled: a,
                    type: "x",
                  };
            g && g.panning && (g.panning = a);
            var k = a.type;
            w(
              this,
              "pan",
              {
                originalEvent: b,
              },
              function () {
                c &&
                  c.forEach(function (b) {
                    b.setState();
                  });
                var a = [1];
                "xy" === k ? (a = [1, 0]) : "y" === k && (a = [0]);
                a.forEach(function (a) {
                  var c = e[a ? "xAxis" : "yAxis"][0],
                    g = c.horiz,
                    n = b[g ? "chartX" : "chartY"];
                  g = g ? "mouseDownX" : "mouseDownY";
                  var q = e[g],
                    m = (c.pointRange || 0) / 2,
                    x =
                      (c.reversed && !e.inverted) || (!c.reversed && e.inverted)
                        ? -1
                        : 1,
                    C = c.getExtremes(),
                    w = c.toValue(q - n, !0) + m * x;
                  x = c.toValue(q + c.len - n, !0) - m * x;
                  var t = x < w;
                  q = t ? x : w;
                  w = t ? w : x;
                  x = c.hasVerticalPanning();
                  var p = c.panningState;
                  !x ||
                    a ||
                    (p && !p.isDirty) ||
                    c.series.forEach(function (b) {
                      var a = b.getProcessedData(!0);
                      a = b.getExtremes(a.yData, !0);
                      p ||
                        (p = {
                          startMin: Number.MAX_VALUE,
                          startMax: -Number.MAX_VALUE,
                        });
                      V(a.dataMin) &&
                        V(a.dataMax) &&
                        ((p.startMin = Math.min(
                          S(b.options.threshold, Infinity),
                          a.dataMin,
                          p.startMin
                        )),
                        (p.startMax = Math.max(
                          S(b.options.threshold, -Infinity),
                          a.dataMax,
                          p.startMax
                        )));
                    });
                  a = Math.min(
                    S(p && p.startMin, C.dataMin),
                    m ? C.min : c.toValue(c.toPixels(C.min) - c.minPixelPadding)
                  );
                  m = Math.max(
                    S(p && p.startMax, C.dataMax),
                    m ? C.max : c.toValue(c.toPixels(C.max) + c.minPixelPadding)
                  );
                  c.panningState = p;
                  c.isOrdinal ||
                    ((x = a - q),
                    0 < x && ((w += x), (q = a)),
                    (x = w - m),
                    0 < x && ((w = m), (q -= x)),
                    c.series.length &&
                      q !== C.min &&
                      w !== C.max &&
                      q >= a &&
                      w <= m &&
                      (c.setExtremes(q, w, !1, !1, {
                        trigger: "pan",
                      }),
                      e.resetZoomButton ||
                        f ||
                        q === a ||
                        w === m ||
                        !k.match("y") ||
                        (e.showResetZoom(), (c.displayBtn = !1)),
                      (l = !0)),
                    (e[g] = n));
                });
                l && e.redraw(!1);
                H(e.container, {
                  cursor: "move",
                });
              }
            );
          };
          return d;
        })();
      C(X.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [X.prototype.addAxis, [!0]],
          yAxis: [X.prototype.addAxis, [!1]],
          series: [X.prototype.addSeries],
        },
        collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
        propsRequireDirtyBox:
          "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
            " "
          ),
        propsRequireReflow:
          "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
            " "
          ),
        propsRequireUpdateSeries:
          "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
            " "
          ),
      });
      F.chart = function (b, a, e) {
        return new X(b, a, e);
      };
      F.Chart = X;
      ("");
      return X;
    }
  );
  Q(
    d,
    "Mixins/LegendSymbol.js",
    [d["Core/Globals.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = h.merge,
        F = h.pick;
      return (d.LegendSymbolMixin = {
        drawRectangle: function (d, h) {
          var G = d.symbolHeight,
            I = d.options.squareSymbol;
          h.legendSymbol = this.chart.renderer
            .rect(
              I ? (d.symbolWidth - G) / 2 : 0,
              d.baseline - G + 1,
              I ? G : d.symbolWidth,
              G,
              F(d.options.symbolRadius, G / 2)
            )
            .addClass("highcharts-point")
            .attr({
              zIndex: 3,
            })
            .add(h.legendGroup);
        },
        drawLineMarker: function (d) {
          var h = this.options,
            G = h.marker,
            I = d.symbolWidth,
            D = d.symbolHeight,
            B = D / 2,
            u = this.chart.renderer,
            c = this.legendGroup;
          d = d.baseline - Math.round(0.3 * d.fontMetrics.b);
          var a = {};
          this.chart.styledMode ||
            ((a = {
              "stroke-width": h.lineWidth || 0,
            }),
            h.dashStyle && (a.dashstyle = h.dashStyle));
          this.legendLine = u
            .path([
              ["M", 0, d],
              ["L", I, d],
            ])
            .addClass("highcharts-graph")
            .attr(a)
            .add(c);
          G &&
            !1 !== G.enabled &&
            I &&
            ((h = Math.min(F(G.radius, B), B)),
            0 === this.symbol.indexOf("url") &&
              ((G = N(G, {
                width: D,
                height: D,
              })),
              (h = 0)),
            (this.legendSymbol = G =
              u
                .symbol(this.symbol, I / 2 - h, d - h, 2 * h, 2 * h, G)
                .addClass("highcharts-point")
                .add(c)),
            (G.isMarker = !0));
        },
      });
    }
  );
  Q(
    d,
    "Core/Series/Series.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Globals.js"],
      d["Mixins/LegendSymbol.js"],
      d["Core/Options.js"],
      d["Core/Color/Palette.js"],
      d["Core/Series/Point.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I, D) {
      var B = d.animObject,
        u = d.setAnimation,
        c = h.hasTouch,
        a = h.svg,
        r = h.win,
        y = F.defaultOptions,
        p = G.seriesTypes,
        O = D.addEvent,
        k = D.arrayMax,
        m = D.arrayMin,
        L = D.clamp,
        A = D.cleanRecursively,
        t = D.correctFloat,
        f = D.defined,
        v = D.erase,
        b = D.error,
        E = D.extend,
        P = D.find,
        H = D.fireEvent,
        g = D.getNestedProperty,
        n = D.isArray,
        e = D.isFunction,
        l = D.isNumber,
        C = D.isString,
        x = D.merge,
        w = D.objectEach,
        q = D.pick,
        z = D.removeEvent,
        N = D.splat,
        V = D.syncTimeout;
      d = (function () {
        function d() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        d.prototype.init = function (b, a) {
          H(this, "init", {
            options: a,
          });
          var c = this,
            g = b.series,
            f;
          this.eventOptions = this.eventOptions || {};
          this.eventsToUnbind = [];
          c.chart = b;
          c.options = c.setOptions(a);
          var l = c.options;
          c.linkedSeries = [];
          c.bindAxes();
          E(c, {
            name: l.name,
            state: "",
            visible: !1 !== l.visible,
            selected: !0 === l.selected,
          });
          a = l.events;
          w(a, function (b, a) {
            e(b) &&
              c.eventOptions[a] !== b &&
              (e(c.eventOptions[a]) && z(c, a, c.eventOptions[a]),
              (c.eventOptions[a] = b),
              O(c, a, b));
          });
          if (
            (a && a.click) ||
            (l.point && l.point.events && l.point.events.click) ||
            l.allowPointSelect
          )
            b.runTrackerClick = !0;
          c.getColor();
          c.getSymbol();
          c.parallelArrays.forEach(function (b) {
            c[b + "Data"] || (c[b + "Data"] = []);
          });
          c.isCartesian && (b.hasCartesianSeries = !0);
          g.length && (f = g[g.length - 1]);
          c._i = q(f && f._i, -1) + 1;
          c.opacity = c.options.opacity;
          b.orderSeries(this.insert(g));
          l.dataSorting && l.dataSorting.enabled
            ? c.setDataSortingOptions()
            : c.points || c.data || c.setData(l.data, !1);
          H(this, "afterInit");
        };
        d.prototype.is = function (b) {
          return p[b] && this instanceof p[b];
        };
        d.prototype.insert = function (b) {
          var a = this.options.index,
            e;
          if (l(a)) {
            for (e = b.length; e--; )
              if (a >= q(b[e].options.index, b[e]._i)) {
                b.splice(e + 1, 0, this);
                break;
              }
            -1 === e && b.unshift(this);
            e += 1;
          } else b.push(this);
          return q(e, b.length - 1);
        };
        d.prototype.bindAxes = function () {
          var a = this,
            e = a.options,
            c = a.chart,
            g;
          H(this, "bindAxes", null, function () {
            (a.axisTypes || []).forEach(function (f) {
              var l = 0;
              c[f].forEach(function (b) {
                g = b.options;
                if (
                  (e[f] === l && !g.isInternal) ||
                  ("undefined" !== typeof e[f] && e[f] === g.id) ||
                  ("undefined" === typeof e[f] && 0 === g.index)
                )
                  a.insert(b.series), (a[f] = b), (b.isDirty = !0);
                g.isInternal || l++;
              });
              a[f] || a.optionalAxis === f || b(18, !0, c);
            });
          });
          H(this, "afterBindAxes");
        };
        d.prototype.updateParallelArrays = function (b, a) {
          var e = b.series,
            c = arguments,
            g = l(a)
              ? function (c) {
                  var g = "y" === c && e.toYData ? e.toYData(b) : b[c];
                  e[c + "Data"][a] = g;
                }
              : function (b) {
                  Array.prototype[a].apply(
                    e[b + "Data"],
                    Array.prototype.slice.call(c, 2)
                  );
                };
          e.parallelArrays.forEach(g);
        };
        d.prototype.hasData = function () {
          return (
            (this.visible &&
              "undefined" !== typeof this.dataMax &&
              "undefined" !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        };
        d.prototype.autoIncrement = function () {
          var b = this.options,
            a = this.xIncrement,
            e,
            c = b.pointIntervalUnit,
            g = this.chart.time;
          a = q(a, b.pointStart, 0);
          this.pointInterval = e = q(this.pointInterval, b.pointInterval, 1);
          c &&
            ((b = new g.Date(a)),
            "day" === c
              ? g.set("Date", b, g.get("Date", b) + e)
              : "month" === c
              ? g.set("Month", b, g.get("Month", b) + e)
              : "year" === c && g.set("FullYear", b, g.get("FullYear", b) + e),
            (e = b.getTime() - a));
          this.xIncrement = a + e;
          return a;
        };
        d.prototype.setDataSortingOptions = function () {
          var b = this.options;
          E(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          f(b.pointRange) || (b.pointRange = 1);
        };
        d.prototype.setOptions = function (b) {
          var a = this.chart,
            e = a.options,
            c = e.plotOptions,
            g = a.userOptions || {};
          b = x(b);
          a = a.styledMode;
          var l = {
            plotOptions: c,
            userOptions: b,
          };
          H(this, "setOptions", l);
          var k = l.plotOptions[this.type],
            n = g.plotOptions || {};
          this.userOptions = l.userOptions;
          g = x(k, c.series, g.plotOptions && g.plotOptions[this.type], b);
          this.tooltipOptions = x(
            y.tooltip,
            y.plotOptions.series && y.plotOptions.series.tooltip,
            y.plotOptions[this.type].tooltip,
            e.tooltip.userOptions,
            c.series && c.series.tooltip,
            c[this.type].tooltip,
            b.tooltip
          );
          this.stickyTracking = q(
            b.stickyTracking,
            n[this.type] && n[this.type].stickyTracking,
            n.series && n.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : g.stickyTracking
          );
          null === k.marker && delete g.marker;
          this.zoneAxis = g.zoneAxis;
          e = this.zones = (g.zones || []).slice();
          (!g.negativeColor && !g.negativeFillColor) ||
            g.zones ||
            ((c = {
              value: g[this.zoneAxis + "Threshold"] || g.threshold || 0,
              className: "highcharts-negative",
            }),
            a ||
              ((c.color = g.negativeColor),
              (c.fillColor = g.negativeFillColor)),
            e.push(c));
          e.length &&
            f(e[e.length - 1].value) &&
            e.push(
              a
                ? {}
                : {
                    color: this.color,
                    fillColor: this.fillColor,
                  }
            );
          H(this, "afterSetOptions", {
            options: g,
          });
          return g;
        };
        d.prototype.getName = function () {
          return q(this.options.name, "Series " + (this.index + 1));
        };
        d.prototype.getCyclic = function (b, a, e) {
          var c = this.chart,
            g = this.userOptions,
            l = b + "Index",
            k = b + "Counter",
            n = e ? e.length : q(c.options.chart[b + "Count"], c[b + "Count"]);
          if (!a) {
            var m = q(g[l], g["_" + l]);
            f(m) ||
              (c.series.length || (c[k] = 0),
              (g["_" + l] = m = c[k] % n),
              (c[k] += 1));
            e && (a = e[m]);
          }
          "undefined" !== typeof m && (this[l] = m);
          this[b] = a;
        };
        d.prototype.getColor = function () {
          this.chart.styledMode
            ? this.getCyclic("color")
            : this.options.colorByPoint
            ? (this.color = J.neutralColor20)
            : this.getCyclic(
                "color",
                this.options.color || y.plotOptions[this.type].color,
                this.chart.options.colors
              );
        };
        d.prototype.getPointsCollection = function () {
          return (this.hasGroupedData ? this.points : this.data) || [];
        };
        d.prototype.getSymbol = function () {
          this.getCyclic(
            "symbol",
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        };
        d.prototype.findPointIndex = function (b, a) {
          var e = b.id,
            c = b.x,
            g = this.points,
            f,
            k = this.options.dataSorting;
          if (e) var n = this.chart.get(e);
          else if (this.linkedParent || this.enabledDataSorting) {
            var q = k && k.matchByName ? "name" : "index";
            n = P(g, function (a) {
              return !a.touched && a[q] === b[q];
            });
            if (!n) return;
          }
          if (n) {
            var m = n && n.index;
            "undefined" !== typeof m && (f = !0);
          }
          "undefined" === typeof m && l(c) && (m = this.xData.indexOf(c, a));
          -1 !== m &&
            "undefined" !== typeof m &&
            this.cropped &&
            (m = m >= this.cropStart ? m - this.cropStart : m);
          !f && g[m] && g[m].touched && (m = void 0);
          return m;
        };
        d.prototype.updateData = function (b, a) {
          var e = this.options,
            c = e.dataSorting,
            g = this.points,
            n = [],
            q,
            m,
            x,
            C = this.requireSorting,
            d = b.length === g.length,
            w = !0;
          this.xIncrement = null;
          b.forEach(function (b, a) {
            var k =
              (f(b) &&
                this.pointClass.prototype.optionsToObject.call(
                  {
                    series: this,
                  },
                  b
                )) ||
              {};
            var m = k.x;
            if (k.id || l(m)) {
              if (
                ((m = this.findPointIndex(k, x)),
                -1 === m || "undefined" === typeof m
                  ? n.push(b)
                  : g[m] && b !== e.data[m]
                  ? (g[m].update(b, !1, null, !1),
                    (g[m].touched = !0),
                    C && (x = m + 1))
                  : g[m] && (g[m].touched = !0),
                !d || a !== m || (c && c.enabled) || this.hasDerivedData)
              )
                q = !0;
            } else n.push(b);
          }, this);
          if (q)
            for (b = g.length; b--; )
              (m = g[b]) && !m.touched && m.remove && m.remove(!1, a);
          else
            !d || (c && c.enabled)
              ? (w = !1)
              : (b.forEach(function (b, a) {
                  g[a].update && b !== g[a].y && g[a].update(b, !1, null, !1);
                }),
                (n.length = 0));
          g.forEach(function (b) {
            b && (b.touched = !1);
          });
          if (!w) return !1;
          n.forEach(function (b) {
            this.addPoint(b, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = k(this.xData)), this.autoIncrement());
          return !0;
        };
        d.prototype.setData = function (a, e, c, g) {
          var f = this,
            k = f.points,
            m = (k && k.length) || 0,
            x,
            d = f.options,
            w = f.chart,
            t = d.dataSorting,
            p = null,
            v = f.xAxis;
          p = d.turboThreshold;
          var h = this.xData,
            A = this.yData,
            z = (x = f.pointArrayMap) && x.length,
            y = d.keys,
            r = 0,
            u = 1,
            E;
          a = a || [];
          x = a.length;
          e = q(e, !0);
          t && t.enabled && (a = this.sortData(a));
          !1 !== g &&
            x &&
            m &&
            !f.cropped &&
            !f.hasGroupedData &&
            f.visible &&
            !f.isSeriesBoosting &&
            (E = this.updateData(a, c));
          if (!E) {
            f.xIncrement = null;
            f.colorCounter = 0;
            this.parallelArrays.forEach(function (b) {
              f[b + "Data"].length = 0;
            });
            if (p && x > p)
              if (((p = f.getFirstValidPoint(a)), l(p)))
                for (c = 0; c < x; c++)
                  (h[c] = this.autoIncrement()), (A[c] = a[c]);
              else if (n(p))
                if (z)
                  for (c = 0; c < x; c++)
                    (g = a[c]), (h[c] = g[0]), (A[c] = g.slice(1, z + 1));
                else
                  for (
                    y &&
                      ((r = y.indexOf("x")),
                      (u = y.indexOf("y")),
                      (r = 0 <= r ? r : 0),
                      (u = 0 <= u ? u : 1)),
                      c = 0;
                    c < x;
                    c++
                  )
                    (g = a[c]), (h[c] = g[r]), (A[c] = g[u]);
              else b(12, !1, w);
            else
              for (c = 0; c < x; c++)
                "undefined" !== typeof a[c] &&
                  ((g = {
                    series: f,
                  }),
                  f.pointClass.prototype.applyOptions.apply(g, [a[c]]),
                  f.updateParallelArrays(g, c));
            A && C(A[0]) && b(14, !0, w);
            f.data = [];
            f.options.data = f.userOptions.data = a;
            for (c = m; c--; ) k[c] && k[c].destroy && k[c].destroy();
            v && (v.minRange = v.userMinRange);
            f.isDirty = w.isDirtyBox = !0;
            f.isDirtyData = !!k;
            c = !1;
          }
          "point" === d.legendType &&
            (this.processData(), this.generatePoints());
          e && w.redraw(c);
        };
        d.prototype.sortData = function (b) {
          var a = this,
            e = a.options.dataSorting.sortKey || "y",
            c = function (b, a) {
              return (
                (f(a) &&
                  b.pointClass.prototype.optionsToObject.call(
                    {
                      series: b,
                    },
                    a
                  )) ||
                {}
              );
            };
          b.forEach(function (e, g) {
            b[g] = c(a, e);
            b[g].index = g;
          }, this);
          b.concat()
            .sort(function (b, a) {
              b = g(e, b);
              a = g(e, a);
              return a < b ? -1 : a > b ? 1 : 0;
            })
            .forEach(function (b, a) {
              b.x = a;
            }, this);
          a.linkedSeries &&
            a.linkedSeries.forEach(function (a) {
              var e = a.options,
                g = e.data;
              (e.dataSorting && e.dataSorting.enabled) ||
                !g ||
                (g.forEach(function (e, f) {
                  g[f] = c(a, e);
                  b[f] && ((g[f].x = b[f].x), (g[f].index = f));
                }),
                a.setData(g, !1));
            });
          return b;
        };
        d.prototype.getProcessedData = function (a) {
          var e = this.xData,
            c = this.yData,
            g = e.length;
          var f = 0;
          var l = this.xAxis,
            k = this.options;
          var n = k.cropThreshold;
          var q = a || this.getExtremesFromAll || k.getExtremesFromAll,
            m = this.isCartesian;
          a = l && l.val2lin;
          k = !(!l || !l.logarithmic);
          var x = this.requireSorting;
          if (l) {
            l = l.getExtremes();
            var C = l.min;
            var d = l.max;
          }
          if (m && this.sorted && !q && (!n || g > n || this.forceCrop))
            if (e[g - 1] < C || e[0] > d) (e = []), (c = []);
            else if (this.yData && (e[0] < C || e[g - 1] > d)) {
              f = this.cropData(this.xData, this.yData, C, d);
              e = f.xData;
              c = f.yData;
              f = f.start;
              var w = !0;
            }
          for (n = e.length || 1; --n; )
            if (
              ((g = k ? a(e[n]) - a(e[n - 1]) : e[n] - e[n - 1]),
              0 < g && ("undefined" === typeof t || g < t))
            )
              var t = g;
            else 0 > g && x && (b(15, !1, this.chart), (x = !1));
          return {
            xData: e,
            yData: c,
            cropped: w,
            cropStart: f,
            closestPointRange: t,
          };
        };
        d.prototype.processData = function (b) {
          var a = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !a.isDirty &&
            !this.yAxis.isDirty &&
            !b
          )
            return !1;
          b = this.getProcessedData();
          this.cropped = b.cropped;
          this.cropStart = b.cropStart;
          this.processedXData = b.xData;
          this.processedYData = b.yData;
          this.closestPointRange = this.basePointRange = b.closestPointRange;
        };
        d.prototype.cropData = function (b, a, e, c, g) {
          var f = b.length,
            l = 0,
            k = f,
            n;
          g = q(g, this.cropShoulder);
          for (n = 0; n < f; n++)
            if (b[n] >= e) {
              l = Math.max(0, n - g);
              break;
            }
          for (e = n; e < f; e++)
            if (b[e] > c) {
              k = e + g;
              break;
            }
          return {
            xData: b.slice(l, k),
            yData: a.slice(l, k),
            start: l,
            end: k,
          };
        };
        d.prototype.generatePoints = function () {
          var b = this.options,
            a = b.data,
            e = this.data,
            c,
            g = this.processedXData,
            f = this.processedYData,
            l = this.pointClass,
            k = g.length,
            n = this.cropStart || 0,
            q = this.hasGroupedData,
            m = b.keys,
            x = [],
            C;
          b = b.dataGrouping && b.dataGrouping.groupAll ? n : 0;
          e || q || ((e = []), (e.length = a.length), (e = this.data = e));
          m && q && (this.options.keys = !1);
          for (C = 0; C < k; C++) {
            var d = n + C;
            if (q) {
              var w = new l().init(this, [g[C]].concat(N(f[C])));
              w.dataGroup = this.groupMap[b + C];
              w.dataGroup.options &&
                ((w.options = w.dataGroup.options),
                E(w, w.dataGroup.options),
                delete w.dataLabels);
            } else
              (w = e[d]) ||
                "undefined" === typeof a[d] ||
                (e[d] = w = new l().init(this, a[d], g[C]));
            w && ((w.index = q ? b + C : d), (x[C] = w));
          }
          this.options.keys = m;
          if (e && (k !== (c = e.length) || q))
            for (C = 0; C < c; C++)
              C !== n || q || (C += k),
                e[C] && (e[C].destroyElements(), (e[C].plotX = void 0));
          this.data = e;
          this.points = x;
          H(this, "afterGeneratePoints");
        };
        d.prototype.getXExtremes = function (b) {
          return {
            min: m(b),
            max: k(b),
          };
        };
        d.prototype.getExtremes = function (b, a) {
          var e = this.xAxis,
            c = this.yAxis,
            g = this.processedXData || this.xData,
            f = [],
            q = 0,
            x = 0;
          var C = 0;
          var d = this.requireSorting ? this.cropShoulder : 0,
            w = c ? c.positiveValuesOnly : !1,
            t;
          b = b || this.stackedYData || this.processedYData || [];
          c = b.length;
          e && ((C = e.getExtremes()), (x = C.min), (C = C.max));
          for (t = 0; t < c; t++) {
            var p = g[t];
            var v = b[t];
            var h = (l(v) || n(v)) && (v.length || 0 < v || !w);
            p =
              a ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !e ||
              ((g[t + d] || p) >= x && (g[t - d] || p) <= C);
            if (h && p)
              if ((h = v.length)) for (; h--; ) l(v[h]) && (f[q++] = v[h]);
              else f[q++] = v;
          }
          b = {
            dataMin: m(f),
            dataMax: k(f),
          };
          H(this, "afterGetExtremes", {
            dataExtremes: b,
          });
          return b;
        };
        d.prototype.applyExtremes = function () {
          var b = this.getExtremes();
          this.dataMin = b.dataMin;
          this.dataMax = b.dataMax;
          return b;
        };
        d.prototype.getFirstValidPoint = function (b) {
          for (var a = null, e = b.length, c = 0; null === a && c < e; )
            (a = b[c]), c++;
          return a;
        };
        d.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var b = this.options,
            a = b.stacking,
            e = this.xAxis,
            c = e.categories,
            g = this.enabledDataSorting,
            k = this.yAxis,
            m = this.points,
            x = m.length,
            C = !!this.modifyValue,
            d,
            w = this.pointPlacementToXValue(),
            p = !!w,
            v = b.threshold,
            h = b.startFromThreshold ? v : 0,
            A,
            z = this.zoneAxis || "y",
            y = Number.MAX_VALUE;
          for (d = 0; d < x; d++) {
            var r = m[d],
              u = r.x,
              E = r.y,
              B = r.low,
              D =
                a &&
                k.stacking &&
                k.stacking.stacks[
                  (this.negStacks && E < (h ? 0 : v) ? "-" : "") + this.stackKey
                ],
              O = void 0,
              P = void 0;
            if (
              (k.positiveValuesOnly && !k.validatePositiveValue(E)) ||
              (e.positiveValuesOnly && !e.validatePositiveValue(u))
            )
              r.isNull = !0;
            r.plotX = A = t(
              L(e.translate(u, 0, 0, 0, 1, w, "flags" === this.type), -1e5, 1e5)
            );
            if (a && this.visible && D && D[u]) {
              var I = this.getStackIndicator(I, u, this.index);
              r.isNull || ((O = D[u]), (P = O.points[I.key]));
            }
            n(P) &&
              ((B = P[0]),
              (E = P[1]),
              B === h && I.key === D[u].base && (B = q(l(v) && v, k.min)),
              k.positiveValuesOnly && 0 >= B && (B = null),
              (r.total = r.stackTotal = O.total),
              (r.percentage = O.total && (r.y / O.total) * 100),
              (r.stackY = E),
              this.irregularWidths ||
                O.setOffset(this.pointXOffset || 0, this.barW || 0));
            r.yBottom = f(B) ? L(k.translate(B, 0, 1, 0, 1), -1e5, 1e5) : null;
            C && (E = this.modifyValue(E, r));
            r.plotY = void 0;
            l(E) &&
              ((E = k.translate(E, !1, !0, !1, !0)),
              "undefined" !== typeof E && (r.plotY = L(E, -1e5, 1e5)));
            r.isInside = this.isPointInside(r);
            r.clientX = p ? t(e.translate(u, 0, 0, 0, 1, w)) : A;
            r.negative = r[z] < (b[z + "Threshold"] || v || 0);
            r.category = c && "undefined" !== typeof c[r.x] ? c[r.x] : r.x;
            if (!r.isNull && !1 !== r.visible) {
              "undefined" !== typeof G && (y = Math.min(y, Math.abs(A - G)));
              var G = A;
            }
            r.zone = this.zones.length && r.getZone();
            !r.graphic && this.group && g && (r.isNew = !0);
          }
          this.closestPointRangePx = y;
          H(this, "afterTranslate");
        };
        d.prototype.getValidPoints = function (b, a, e) {
          var c = this.chart;
          return (b || this.points || []).filter(function (b) {
            return a &&
              !c.isInsidePlot(b.plotX, b.plotY, {
                inverted: c.inverted,
              })
              ? !1
              : !1 !== b.visible && (e || !b.isNull);
          });
        };
        d.prototype.getClipBox = function (b, a) {
          var e = this.options,
            c = this.chart,
            g = c.inverted,
            f = this.xAxis,
            l = f && this.yAxis,
            k = c.options.chart.scrollablePlotArea || {};
          b && !1 === e.clip && l
            ? (b = g
                ? {
                    y: -c.chartWidth + l.len + l.pos,
                    height: c.chartWidth,
                    width: c.chartHeight,
                    x: -c.chartHeight + f.len + f.pos,
                  }
                : {
                    y: -l.pos,
                    height: c.chartHeight,
                    width: c.chartWidth,
                    x: -f.pos,
                  })
            : ((b = this.clipBox || c.clipBox),
              a &&
                ((b.width = c.plotSizeX),
                (b.x = (c.scrollablePixelsX || 0) * (k.scrollPositionX || 0))));
          return a
            ? {
                width: b.width,
                x: b.x,
              }
            : b;
        };
        d.prototype.getSharedClipKey = function (b) {
          if (this.sharedClipKey) return this.sharedClipKey;
          var a = [
            b && b.duration,
            b && b.easing,
            b && b.defer,
            this.getClipBox(b).height,
            this.options.xAxis,
            this.options.yAxis,
          ].join();
          if (!1 !== this.options.clip || b) this.sharedClipKey = a;
          return a;
        };
        d.prototype.setClip = function (b) {
          var a = this.chart,
            e = this.options,
            c = a.renderer,
            g = a.inverted,
            f = this.clipBox,
            l = this.getClipBox(b),
            k = this.getSharedClipKey(b),
            n = a.sharedClips[k],
            q = a.sharedClips[k + "m"];
          b &&
            ((l.width = 0),
            g && (l.x = a.plotHeight + (!1 !== e.clip ? 0 : a.plotTop)));
          n
            ? a.hasLoaded || n.attr(l)
            : (b &&
                (a.sharedClips[k + "m"] = q =
                  c.clipRect(
                    g ? (a.plotSizeX || 0) + 99 : -99,
                    g ? -a.plotLeft : -a.plotTop,
                    99,
                    g ? a.chartWidth : a.chartHeight
                  )),
              (a.sharedClips[k] = n = c.clipRect(l)),
              (n.count = {
                length: 0,
              }));
          b &&
            !n.count[this.index] &&
            ((n.count[this.index] = !0), (n.count.length += 1));
          if (!1 !== e.clip || b)
            this.group.clip(b || f ? n : a.clipRect), this.markerGroup.clip(q);
          b ||
            (n.count[this.index] &&
              (delete n.count[this.index], --n.count.length),
            0 === n.count.length &&
              (f || (a.sharedClips[k] = n.destroy()),
              q && (a.sharedClips[k + "m"] = q.destroy())));
        };
        d.prototype.animate = function (b) {
          var a = this.chart,
            e = B(this.options.animation),
            c = this.sharedClipKey;
          if (b) this.setClip(e);
          else if (c) {
            b = a.sharedClips[c];
            c = a.sharedClips[c + "m"];
            var g = this.getClipBox(e, !0);
            b && b.animate(g, e);
            c &&
              c.animate(
                {
                  width: g.width + 99,
                  x: g.x - (a.inverted ? 0 : 99),
                },
                e
              );
          }
        };
        d.prototype.afterAnimate = function () {
          this.setClip();
          H(this, "afterAnimate");
          this.finishedAnimating = !0;
        };
        d.prototype.drawPoints = function () {
          var b = this.points,
            a = this.chart,
            e,
            c,
            g = this.options.marker,
            f = this[this.specialGroup] || this.markerGroup,
            l = this.xAxis,
            k = q(
              g.enabled,
              !l || l.isRadial ? !0 : null,
              this.closestPointRangePx >= g.enabledThreshold * g.radius
            );
          if (!1 !== g.enabled || this._hasPointMarkers)
            for (e = 0; e < b.length; e++) {
              var n = b[e];
              var m = (c = n.graphic) ? "animate" : "attr";
              var x = n.marker || {};
              var C = !!n.marker;
              if (
                ((k && "undefined" === typeof x.enabled) || x.enabled) &&
                !n.isNull &&
                !1 !== n.visible
              ) {
                var d = q(x.symbol, this.symbol);
                var w = this.markerAttribs(n, n.selected && "select");
                this.enabledDataSorting &&
                  (n.startXPos = l.reversed ? -(w.width || 0) : l.width);
                var t = !1 !== n.isInside;
                c
                  ? c[t ? "show" : "hide"](t).animate(w)
                  : t &&
                    (0 < (w.width || 0) || n.hasImage) &&
                    ((n.graphic = c =
                      a.renderer
                        .symbol(d, w.x, w.y, w.width, w.height, C ? x : g)
                        .add(f)),
                    this.enabledDataSorting &&
                      a.hasRendered &&
                      (c.attr({
                        x: n.startXPos,
                      }),
                      (m = "animate")));
                c && "animate" === m && c[t ? "show" : "hide"](t).animate(w);
                if (c && !a.styledMode)
                  c[m](this.pointAttribs(n, n.selected && "select"));
                c && c.addClass(n.getClassName(), !0);
              } else c && (n.graphic = c.destroy());
            }
        };
        d.prototype.markerAttribs = function (b, a) {
          var e = this.options,
            c = e.marker,
            g = b.marker || {},
            f = g.symbol || c.symbol,
            l = q(g.radius, c.radius);
          a &&
            ((c = c.states[a]),
            (a = g.states && g.states[a]),
            (l = q(
              a && a.radius,
              c && c.radius,
              l + ((c && c.radiusPlus) || 0)
            )));
          b.hasImage = f && 0 === f.indexOf("url");
          b.hasImage && (l = 0);
          b = {
            x: e.crisp ? Math.floor(b.plotX - l) : b.plotX - l,
            y: b.plotY - l,
          };
          l && (b.width = b.height = 2 * l);
          return b;
        };
        d.prototype.pointAttribs = function (b, a) {
          var e = this.options.marker,
            c = b && b.options,
            g = (c && c.marker) || {},
            f = this.color,
            l = c && c.color,
            k = b && b.color;
          c = q(g.lineWidth, e.lineWidth);
          var n = b && b.zone && b.zone.color;
          b = 1;
          f = l || n || k || f;
          l = g.fillColor || e.fillColor || f;
          f = g.lineColor || e.lineColor || f;
          a = a || "normal";
          e = e.states[a];
          a = (g.states && g.states[a]) || {};
          c = q(
            a.lineWidth,
            e.lineWidth,
            c + q(a.lineWidthPlus, e.lineWidthPlus, 0)
          );
          l = a.fillColor || e.fillColor || l;
          f = a.lineColor || e.lineColor || f;
          b = q(a.opacity, e.opacity, b);
          return {
            stroke: f,
            "stroke-width": c,
            fill: l,
            opacity: b,
          };
        };
        d.prototype.destroy = function (b) {
          var a = this,
            e = a.chart,
            c = /AppleWebKit\/533/.test(r.navigator.userAgent),
            g,
            f,
            l = a.data || [],
            k,
            n;
          H(a, "destroy");
          this.removeEvents(b);
          (a.axisTypes || []).forEach(function (b) {
            (n = a[b]) &&
              n.series &&
              (v(n.series, a), (n.isDirty = n.forceRedraw = !0));
          });
          a.legendItem && a.chart.legend.destroyItem(a);
          for (f = l.length; f--; ) (k = l[f]) && k.destroy && k.destroy();
          a.clips &&
            a.clips.forEach(function (b) {
              return b.destroy();
            });
          D.clearTimeout(a.animationTimeout);
          w(a, function (b, a) {
            b instanceof I &&
              !b.survive &&
              ((g = c && "group" === a ? "hide" : "destroy"), b[g]());
          });
          e.hoverSeries === a && (e.hoverSeries = void 0);
          v(e.series, a);
          e.orderSeries();
          w(a, function (e, c) {
            (b && "hcEvents" === c) || delete a[c];
          });
        };
        d.prototype.applyZones = function () {
          var b = this,
            a = this.chart,
            e = a.renderer,
            c = this.zones,
            g,
            f,
            l = this.clips || [],
            k,
            n = this.graph,
            m = this.area,
            x = Math.max(a.chartWidth, a.chartHeight),
            C = this[(this.zoneAxis || "y") + "Axis"],
            w = a.inverted,
            d,
            t,
            p,
            v = !1,
            h,
            A;
          if (c.length && (n || m) && C && "undefined" !== typeof C.min) {
            var r = C.reversed;
            var z = C.horiz;
            n && !this.showLine && n.hide();
            m && m.hide();
            var y = C.getExtremes();
            c.forEach(function (c, E) {
              g = r ? (z ? a.plotWidth : 0) : z ? 0 : C.toPixels(y.min) || 0;
              g = L(q(f, g), 0, x);
              f = L(Math.round(C.toPixels(q(c.value, y.max), !0) || 0), 0, x);
              v && (g = f = C.toPixels(y.max));
              d = Math.abs(g - f);
              t = Math.min(g, f);
              p = Math.max(g, f);
              C.isXAxis
                ? ((k = {
                    x: w ? p : t,
                    y: 0,
                    width: d,
                    height: x,
                  }),
                  z || (k.x = a.plotHeight - k.x))
                : ((k = {
                    x: 0,
                    y: w ? p : t,
                    width: x,
                    height: d,
                  }),
                  z && (k.y = a.plotWidth - k.y));
              w &&
                e.isVML &&
                (k = C.isXAxis
                  ? {
                      x: 0,
                      y: r ? t : p,
                      height: k.width,
                      width: a.chartWidth,
                    }
                  : {
                      x: k.y - a.plotLeft - a.spacingBox.x,
                      y: 0,
                      width: k.height,
                      height: a.chartHeight,
                    });
              l[E] ? l[E].animate(k) : (l[E] = e.clipRect(k));
              h = b["zone-area-" + E];
              A = b["zone-graph-" + E];
              n && A && A.clip(l[E]);
              m && h && h.clip(l[E]);
              v = c.value > y.max;
              b.resetZones && 0 === f && (f = void 0);
            });
            this.clips = l;
          } else b.visible && (n && n.show(!0), m && m.show(!0));
        };
        d.prototype.invertGroups = function (b) {
          function a() {
            ["group", "markerGroup"].forEach(function (a) {
              e[a] &&
                (c.renderer.isVML &&
                  e[a].attr({
                    width: e.yAxis.len,
                    height: e.xAxis.len,
                  }),
                (e[a].width = e.yAxis.len),
                (e[a].height = e.xAxis.len),
                e[a].invert(e.isRadialSeries ? !1 : b));
            });
          }
          var e = this,
            c = e.chart;
          e.xAxis &&
            (e.eventsToUnbind.push(O(c, "resize", a)),
            a(),
            (e.invertGroups = a));
        };
        d.prototype.plotGroup = function (b, a, e, c, g) {
          var l = this[b],
            k = !l;
          e = {
            visibility: e,
            zIndex: c || 0.1,
          };
          "undefined" === typeof this.opacity ||
            this.chart.styledMode ||
            "inactive" === this.state ||
            (e.opacity = this.opacity);
          k && (this[b] = l = this.chart.renderer.g().add(g));
          l.addClass(
            "highcharts-" +
              a +
              " highcharts-series-" +
              this.index +
              " highcharts-" +
              this.type +
              "-series " +
              (f(this.colorIndex)
                ? "highcharts-color-" + this.colorIndex + " "
                : "") +
              (this.options.className || "") +
              (l.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""),
            !0
          );
          l.attr(e)[k ? "attr" : "animate"](this.getPlotBox());
          return l;
        };
        d.prototype.getPlotBox = function () {
          var b = this.chart,
            a = this.xAxis,
            e = this.yAxis;
          b.inverted && ((a = e), (e = this.xAxis));
          return {
            translateX: a ? a.left : b.plotLeft,
            translateY: e ? e.top : b.plotTop,
            scaleX: 1,
            scaleY: 1,
          };
        };
        d.prototype.removeEvents = function (b) {
          b || z(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (b) {
              b();
            }),
            (this.eventsToUnbind.length = 0));
        };
        d.prototype.render = function () {
          var b = this,
            a = b.chart,
            e = b.options,
            c = B(e.animation),
            g = !b.finishedAnimating && a.renderer.isSVG && c.duration,
            f = b.visible ? "inherit" : "hidden",
            l = e.zIndex,
            k = b.hasRendered,
            n = a.seriesGroup,
            m = a.inverted;
          H(this, "render");
          var x = b.plotGroup("group", "series", f, l, n);
          b.markerGroup = b.plotGroup("markerGroup", "markers", f, l, n);
          g && b.animate && b.animate(!0);
          x.inverted = q(b.invertible, b.isCartesian) ? m : !1;
          b.drawGraph && (b.drawGraph(), b.applyZones());
          b.visible && b.drawPoints();
          b.drawDataLabels && b.drawDataLabels();
          b.redrawPoints && b.redrawPoints();
          b.drawTracker &&
            !1 !== b.options.enableMouseTracking &&
            b.drawTracker();
          b.invertGroups(m);
          !1 === e.clip || b.sharedClipKey || k || x.clip(a.clipRect);
          g && b.animate && b.animate();
          k ||
            (g && c.defer && (g += c.defer),
            (b.animationTimeout = V(function () {
              b.afterAnimate();
            }, g || 0)));
          b.isDirty = !1;
          b.hasRendered = !0;
          H(b, "afterRender");
        };
        d.prototype.redraw = function () {
          var b = this.chart,
            a = this.isDirty || this.isDirtyData,
            e = this.group,
            c = this.xAxis,
            g = this.yAxis;
          e &&
            (b.inverted &&
              e.attr({
                width: b.plotWidth,
                height: b.plotHeight,
              }),
            e.animate({
              translateX: q(c && c.left, b.plotLeft),
              translateY: q(g && g.top, b.plotTop),
            }));
          this.translate();
          this.render();
          a && delete this.kdTree;
        };
        d.prototype.searchPoint = function (b, a) {
          var e = this.xAxis,
            c = this.yAxis,
            g = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: g ? e.len - b.chartY + e.pos : b.chartX - e.pos,
              plotY: g ? c.len - b.chartX + c.pos : b.chartY - c.pos,
            },
            a,
            b
          );
        };
        d.prototype.buildKDTree = function (b) {
          function a(b, c, g) {
            var f;
            if ((f = b && b.length)) {
              var l = e.kdAxisArray[c % g];
              b.sort(function (b, a) {
                return b[l] - a[l];
              });
              f = Math.floor(f / 2);
              return {
                point: b[f],
                left: a(b.slice(0, f), c + 1, g),
                right: a(b.slice(f + 1), c + 1, g),
              };
            }
          }
          this.buildingKdTree = !0;
          var e = this,
            c = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          delete e.kdTree;
          V(
            function () {
              e.kdTree = a(e.getValidPoints(null, !e.directTouch), c, c);
              e.buildingKdTree = !1;
            },
            e.options.kdNow || (b && "touchstart" === b.type) ? 0 : 1
          );
        };
        d.prototype.searchKDTree = function (b, a, e) {
          function c(b, a, e, q) {
            var m = a.point,
              x = g.kdAxisArray[e % q],
              C = m;
            var w = f(b[l]) && f(m[l]) ? Math.pow(b[l] - m[l], 2) : null;
            var d = f(b[k]) && f(m[k]) ? Math.pow(b[k] - m[k], 2) : null;
            d = (w || 0) + (d || 0);
            m.dist = f(d) ? Math.sqrt(d) : Number.MAX_VALUE;
            m.distX = f(w) ? Math.sqrt(w) : Number.MAX_VALUE;
            x = b[x] - m[x];
            d = 0 > x ? "left" : "right";
            w = 0 > x ? "right" : "left";
            a[d] && ((d = c(b, a[d], e + 1, q)), (C = d[n] < C[n] ? d : m));
            a[w] &&
              Math.sqrt(x * x) < C[n] &&
              ((b = c(b, a[w], e + 1, q)), (C = b[n] < C[n] ? b : C));
            return C;
          }
          var g = this,
            l = this.kdAxisArray[0],
            k = this.kdAxisArray[1],
            n = a ? "distX" : "dist";
          a = -1 < g.options.findNearestPointBy.indexOf("y") ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(e);
          if (this.kdTree) return c(b, this.kdTree, a, a);
        };
        d.prototype.pointPlacementToXValue = function () {
          var b = this.options,
            a = b.pointRange,
            e = this.xAxis;
          b = b.pointPlacement;
          "between" === b && (b = e.reversed ? -0.5 : 0.5);
          return l(b) ? b * (a || e.pointRange) : 0;
        };
        d.prototype.isPointInside = function (b) {
          return (
            "undefined" !== typeof b.plotY &&
            "undefined" !== typeof b.plotX &&
            0 <= b.plotY &&
            b.plotY <= this.yAxis.len &&
            0 <= b.plotX &&
            b.plotX <= this.xAxis.len
          );
        };
        d.prototype.drawTracker = function () {
          var b = this,
            e = b.options,
            g = e.trackByArea,
            f = [].concat(g ? b.areaPath : b.graphPath),
            l = b.chart,
            k = l.pointer,
            n = l.renderer,
            q = l.options.tooltip.snap,
            m = b.tracker,
            x = function (a) {
              if (l.hoverSeries !== b) b.onMouseOver();
            },
            C = "rgba(192,192,192," + (a ? 0.0001 : 0.002) + ")";
          m
            ? m.attr({
                d: f,
              })
            : b.graph &&
              ((b.tracker = n
                .path(f)
                .attr({
                  visibility: b.visible ? "visible" : "hidden",
                  zIndex: 2,
                })
                .addClass(
                  g ? "highcharts-tracker-area" : "highcharts-tracker-line"
                )
                .add(b.group)),
              l.styledMode ||
                b.tracker.attr({
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  stroke: C,
                  fill: g ? C : "none",
                  "stroke-width": b.graph.strokeWidth() + (g ? 0 : 2 * q),
                }),
              [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (
                b
              ) {
                if (
                  b &&
                  (b
                    .addClass("highcharts-tracker")
                    .on("mouseover", x)
                    .on("mouseout", function (b) {
                      k.onTrackerMouseOut(b);
                    }),
                  e.cursor &&
                    !l.styledMode &&
                    b.css({
                      cursor: e.cursor,
                    }),
                  c)
                )
                  b.on("touchstart", x);
              }));
          H(this, "afterDrawTracker");
        };
        d.prototype.addPoint = function (b, a, e, c, g) {
          var f = this.options,
            l = this.data,
            k = this.chart,
            n = this.xAxis;
          n = n && n.hasNames && n.names;
          var m = f.data,
            x = this.xData,
            C;
          a = q(a, !0);
          var d = {
            series: this,
          };
          this.pointClass.prototype.applyOptions.apply(d, [b]);
          var w = d.x;
          var t = x.length;
          if (this.requireSorting && w < x[t - 1])
            for (C = !0; t && x[t - 1] > w; ) t--;
          this.updateParallelArrays(d, "splice", t, 0, 0);
          this.updateParallelArrays(d, t);
          n && d.name && (n[w] = d.name);
          m.splice(t, 0, b);
          C && (this.data.splice(t, 0, null), this.processData());
          "point" === f.legendType && this.generatePoints();
          e &&
            (l[0] && l[0].remove
              ? l[0].remove(!1)
              : (l.shift(), this.updateParallelArrays(d, "shift"), m.shift()));
          !1 !== g &&
            H(this, "addPoint", {
              point: d,
            });
          this.isDirtyData = this.isDirty = !0;
          a && k.redraw(c);
        };
        d.prototype.removePoint = function (b, a, e) {
          var c = this,
            g = c.data,
            f = g[b],
            l = c.points,
            k = c.chart,
            n = function () {
              l && l.length === g.length && l.splice(b, 1);
              g.splice(b, 1);
              c.options.data.splice(b, 1);
              c.updateParallelArrays(
                f || {
                  series: c,
                },
                "splice",
                b,
                1
              );
              f && f.destroy();
              c.isDirty = !0;
              c.isDirtyData = !0;
              a && k.redraw();
            };
          u(e, k);
          a = q(a, !0);
          f ? f.firePointEvent("remove", null, n) : n();
        };
        d.prototype.remove = function (b, a, e, c) {
          function g() {
            f.destroy(c);
            l.isDirtyLegend = l.isDirtyBox = !0;
            l.linkSeries();
            q(b, !0) && l.redraw(a);
          }
          var f = this,
            l = f.chart;
          !1 !== e ? H(f, "remove", null, g) : g();
        };
        d.prototype.update = function (a, e) {
          a = A(a, this.userOptions);
          H(this, "update", {
            options: a,
          });
          var c = this,
            g = c.chart,
            f = c.userOptions,
            l = c.initialType || c.type,
            k = g.options.plotOptions,
            n = a.type || f.type || g.options.chart.type,
            m = !(
              this.hasDerivedData ||
              (n && n !== this.type) ||
              "undefined" !== typeof a.pointStart ||
              "undefined" !== typeof a.pointInterval ||
              c.hasOptionChanged("dataGrouping") ||
              c.hasOptionChanged("pointStart") ||
              c.hasOptionChanged("pointInterval") ||
              c.hasOptionChanged("pointIntervalUnit") ||
              c.hasOptionChanged("keys")
            ),
            C = p[l].prototype,
            d,
            w = ["eventOptions", "navigatorSeries", "baseSeries"],
            t = c.finishedAnimating && {
              animation: !1,
            },
            v = {};
          n = n || l;
          m &&
            (w.push(
              "data",
              "isDirtyData",
              "points",
              "processedXData",
              "processedYData",
              "xIncrement",
              "cropped",
              "_hasPointMarkers",
              "_hasPointLabels",
              "clips",
              "nodes",
              "layout",
              "mapMap",
              "mapData",
              "minY",
              "maxY",
              "minX",
              "maxX"
            ),
            !1 !== a.visible && w.push("area", "graph"),
            c.parallelArrays.forEach(function (b) {
              w.push(b + "Data");
            }),
            a.data &&
              (a.dataSorting && E(c.options.dataSorting, a.dataSorting),
              this.setData(a.data, !1)));
          a = x(
            f,
            t,
            {
              index: "undefined" === typeof f.index ? c.index : f.index,
              pointStart: q(
                k && k.series && k.series.pointStart,
                f.pointStart,
                c.xData[0]
              ),
            },
            !m && {
              data: c.options.data,
            },
            a
          );
          m && a.data && (a.data = c.options.data);
          w = [
            "group",
            "markerGroup",
            "dataLabelsGroup",
            "transformGroup",
          ].concat(w);
          w.forEach(function (b) {
            w[b] = c[b];
            delete c[b];
          });
          f = !1;
          if (p[n]) {
            if (((f = n !== c.type), c.remove(!1, !1, !1, !0), f))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(c, p[n].prototype);
              else {
                k = Object.hasOwnProperty.call(c, "hcEvents") && c.hcEvents;
                for (d in C) c[d] = void 0;
                E(c, p[n].prototype);
                k ? (c.hcEvents = k) : delete c.hcEvents;
              }
          } else
            b(17, !0, g, {
              missingModuleFor: n,
            });
          w.forEach(function (b) {
            c[b] = w[b];
          });
          c.init(g, a);
          if (m && this.points) {
            var h = c.options;
            !1 === h.visible
              ? ((v.graphic = 1), (v.dataLabel = 1))
              : c._hasPointLabels ||
                ((a = h.marker),
                (n = h.dataLabels),
                a && (!1 === a.enabled || "symbol" in a) && (v.graphic = 1),
                n && !1 === n.enabled && (v.dataLabel = 1));
            this.points.forEach(function (b) {
              b &&
                b.series &&
                (b.resolveColor(),
                Object.keys(v).length && b.destroyElements(v),
                !1 === h.showInLegend &&
                  b.legendItem &&
                  g.legend.destroyItem(b));
            }, this);
          }
          c.initialType = l;
          g.linkSeries();
          f && c.linkedSeries.length && (c.isDirtyData = !0);
          H(this, "afterUpdate");
          q(e, !0) && g.redraw(m ? void 0 : !1);
        };
        d.prototype.setName = function (b) {
          this.name = this.options.name = this.userOptions.name = b;
          this.chart.isDirtyLegend = !0;
        };
        d.prototype.hasOptionChanged = function (b) {
          var a = this.options[b],
            e = this.chart.options.plotOptions,
            c = this.userOptions[b];
          return c
            ? a !== c
            : a !==
                q(
                  e && e[this.type] && e[this.type][b],
                  e && e.series && e.series[b],
                  a
                );
        };
        d.prototype.onMouseOver = function () {
          var b = this.chart,
            a = b.hoverSeries;
          b.pointer.setHoverChartIndex();
          if (a && a !== this) a.onMouseOut();
          this.options.events.mouseOver && H(this, "mouseOver");
          this.setState("hover");
          b.hoverSeries = this;
        };
        d.prototype.onMouseOut = function () {
          var b = this.options,
            a = this.chart,
            e = a.tooltip,
            c = a.hoverPoint;
          a.hoverSeries = null;
          if (c) c.onMouseOut();
          this && b.events.mouseOut && H(this, "mouseOut");
          !e ||
            this.stickyTracking ||
            (e.shared && !this.noSharedTooltip) ||
            e.hide();
          a.series.forEach(function (b) {
            b.setState("", !0);
          });
        };
        d.prototype.setState = function (b, a) {
          var e = this,
            c = e.options,
            g = e.graph,
            f = c.inactiveOtherPoints,
            l = c.states,
            k = c.lineWidth,
            n = c.opacity,
            m = q(
              l[b || "normal"] && l[b || "normal"].animation,
              e.chart.options.chart.animation
            );
          c = 0;
          b = b || "";
          if (
            e.state !== b &&
            ([e.group, e.markerGroup, e.dataLabelsGroup].forEach(function (a) {
              a &&
                (e.state && a.removeClass("highcharts-series-" + e.state),
                b && a.addClass("highcharts-series-" + b));
            }),
            (e.state = b),
            !e.chart.styledMode)
          ) {
            if (l[b] && !1 === l[b].enabled) return;
            b &&
              ((k = l[b].lineWidth || k + (l[b].lineWidthPlus || 0)),
              (n = q(l[b].opacity, n)));
            if (g && !g.dashstyle)
              for (
                l = {
                  "stroke-width": k,
                },
                  g.animate(l, m);
                e["zone-graph-" + c];

              )
                e["zone-graph-" + c].animate(l, m), (c += 1);
            f ||
              [
                e.group,
                e.markerGroup,
                e.dataLabelsGroup,
                e.labelBySeries,
              ].forEach(function (b) {
                b &&
                  b.animate(
                    {
                      opacity: n,
                    },
                    m
                  );
              });
          }
          a && f && e.points && e.setAllPointsToState(b || void 0);
        };
        d.prototype.setAllPointsToState = function (b) {
          this.points.forEach(function (a) {
            a.setState && a.setState(b);
          });
        };
        d.prototype.setVisible = function (b, a) {
          var e = this,
            c = e.chart,
            g = e.legendItem,
            f = c.options.chart.ignoreHiddenSeries,
            l = e.visible;
          var k = (e.visible =
            b =
            e.options.visible =
            e.userOptions.visible =
              "undefined" === typeof b ? !l : b)
            ? "show"
            : "hide";
          ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
            function (b) {
              if (e[b]) e[b][k]();
            }
          );
          if (
            c.hoverSeries === e ||
            (c.hoverPoint && c.hoverPoint.series) === e
          )
            e.onMouseOut();
          g && c.legend.colorizeItem(e, b);
          e.isDirty = !0;
          e.options.stacking &&
            c.series.forEach(function (b) {
              b.options.stacking && b.visible && (b.isDirty = !0);
            });
          e.linkedSeries.forEach(function (a) {
            a.setVisible(b, !1);
          });
          f && (c.isDirtyBox = !0);
          H(e, k);
          !1 !== a && c.redraw();
        };
        d.prototype.show = function () {
          this.setVisible(!0);
        };
        d.prototype.hide = function () {
          this.setVisible(!1);
        };
        d.prototype.select = function (b) {
          this.selected =
            b =
            this.options.selected =
              "undefined" === typeof b ? !this.selected : b;
          this.checkbox && (this.checkbox.checked = b);
          H(this, b ? "select" : "unselect");
        };
        d.prototype.shouldShowTooltip = function (b, a, e) {
          void 0 === e && (e = {});
          e.series = this;
          e.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(b, a, e);
        };
        d.defaultOptions = {
          lineWidth: 2,
          allowPointSelect: !1,
          crisp: !0,
          showCheckbox: !1,
          animation: {
            duration: 1e3,
          },
          events: {},
          marker: {
            enabledThreshold: 2,
            lineColor: J.backgroundColor,
            lineWidth: 0,
            radius: 4,
            states: {
              normal: {
                animation: !0,
              },
              hover: {
                animation: {
                  duration: 50,
                },
                enabled: !0,
                radiusPlus: 2,
                lineWidthPlus: 1,
              },
              select: {
                fillColor: J.neutralColor20,
                lineColor: J.neutralColor100,
                lineWidth: 2,
              },
            },
          },
          point: {
            events: {},
          },
          dataLabels: {
            animation: {},
            align: "center",
            defer: !0,
            formatter: function () {
              var b = this.series.chart.numberFormatter;
              return "number" !== typeof this.y ? "" : b(this.y, -1);
            },
            padding: 5,
            style: {
              fontSize: "11px",
              fontWeight: "bold",
              color: "contrast",
              textOutline: "1px contrast",
            },
            verticalAlign: "bottom",
            x: 0,
            y: 0,
          },
          cropThreshold: 300,
          opacity: 1,
          pointRange: 0,
          softThreshold: !0,
          states: {
            normal: {
              animation: !0,
            },
            hover: {
              animation: {
                duration: 50,
              },
              lineWidthPlus: 1,
              marker: {},
              halo: {
                size: 10,
                opacity: 0.25,
              },
            },
            select: {
              animation: {
                duration: 0,
              },
            },
            inactive: {
              animation: {
                duration: 50,
              },
              opacity: 0.2,
            },
          },
          stickyTracking: !0,
          turboThreshold: 1e3,
          findNearestPointBy: "x",
        };
        return d;
      })();
      E(d.prototype, {
        axisTypes: ["xAxis", "yAxis"],
        coll: "series",
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: K.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ["clientX", "plotY"],
        parallelArrays: ["x", "y"],
        pointClass: M,
        requireSorting: !0,
        sorted: !0,
      });
      G.series = d;
      ("");
      ("");
      return d;
    }
  );
  Q(
    d,
    "Extensions/ScrollablePlotArea.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Axis/Axis.js"],
      d["Core/Chart/Chart.js"],
      d["Core/Series/Series.js"],
      d["Core/Globals.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M) {
      var G = d.stop,
        I = M.addEvent,
        D = M.createElement,
        B = M.merge,
        u = M.pick;
      ("");
      I(K, "afterSetChartSize", function (c) {
        var a = this.options.chart.scrollablePlotArea,
          d = a && a.minWidth;
        a = a && a.minHeight;
        if (!this.renderer.forExport) {
          if (d) {
            if (
              (this.scrollablePixelsX = d = Math.max(0, d - this.chartWidth))
            ) {
              this.scrollablePlotBox = this.renderer.scrollablePlotBox = B(
                this.plotBox
              );
              this.plotBox.width = this.plotWidth += d;
              this.inverted
                ? (this.clipBox.height += d)
                : (this.clipBox.width += d);
              var h = {
                1: {
                  name: "right",
                  value: d,
                },
              };
            }
          } else
            a &&
              (this.scrollablePixelsY = d =
                Math.max(0, a - this.chartHeight)) &&
              ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                B(this.plotBox)),
              (this.plotBox.height = this.plotHeight += d),
              this.inverted
                ? (this.clipBox.width += d)
                : (this.clipBox.height += d),
              (h = {
                2: {
                  name: "bottom",
                  value: d,
                },
              }));
          h &&
            !c.skipAxes &&
            this.axes.forEach(function (a) {
              h[a.side]
                ? (a.getPlotLinePath = function () {
                    var c = h[a.side].name,
                      k = this[c];
                    this[c] = k - h[a.side].value;
                    var m = J.Axis.prototype.getPlotLinePath.apply(
                      this,
                      arguments
                    );
                    this[c] = k;
                    return m;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      I(K, "render", function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      K.prototype.setUpScrolling = function () {
        var c = this,
          a = {
            WebkitOverflowScrolling: "touch",
            overflowX: "hidden",
            overflowY: "hidden",
          };
        this.scrollablePixelsX && (a.overflowX = "auto");
        this.scrollablePixelsY && (a.overflowY = "auto");
        this.scrollingParent = D(
          "div",
          {
            className: "highcharts-scrolling-parent",
          },
          {
            position: "relative",
          },
          this.renderTo
        );
        this.scrollingContainer = D(
          "div",
          {
            className: "highcharts-scrolling",
          },
          a,
          this.scrollingParent
        );
        I(this.scrollingContainer, "scroll", function () {
          c.pointer && delete c.pointer.chartPosition;
        });
        this.innerContainer = D(
          "div",
          {
            className: "highcharts-inner-container",
          },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      K.prototype.moveFixedElements = function () {
        var c = this.container,
          a = this.fixedRenderer,
          d =
            ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
              " "
            ),
          h;
        this.scrollablePixelsX && !this.inverted
          ? (h = ".highcharts-yaxis")
          : this.scrollablePixelsX && this.inverted
          ? (h = ".highcharts-xaxis")
          : this.scrollablePixelsY && !this.inverted
          ? (h = ".highcharts-xaxis")
          : this.scrollablePixelsY &&
            this.inverted &&
            (h = ".highcharts-yaxis");
        h &&
          d.push(
            h + ":not(.highcharts-radial-axis)",
            h + "-labels:not(.highcharts-radial-axis-labels)"
          );
        d.forEach(function (d) {
          [].forEach.call(c.querySelectorAll(d), function (c) {
            (c.namespaceURI === a.SVG_NS
              ? a.box
              : a.box.parentNode
            ).appendChild(c);
            c.style.pointerEvents = "auto";
          });
        });
      };
      K.prototype.applyFixed = function () {
        var c = !this.fixedDiv;
        var a = this.options.chart;
        var d = a.scrollablePlotArea;
        c
          ? ((this.fixedDiv = D(
              "div",
              {
                className: "highcharts-fixed",
              },
              {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: ((a.style && a.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = "visible"),
            (this.fixedRenderer = a =
              new J.Renderer(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = a
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": u(d.opacity, 0.85),
                zIndex: -1,
              })
              .addClass("highcharts-scrollable-mask")
              .add()),
            I(this, "afterShowResetZoom", this.moveFixedElements),
            I(this, "afterDrilldown", this.moveFixedElements),
            I(this, "afterLayOutTitles", this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || c)
          (this.scrollableDirty = !1), this.moveFixedElements();
        a = this.chartWidth + (this.scrollablePixelsX || 0);
        var h = this.chartHeight + (this.scrollablePixelsY || 0);
        G(this.container);
        this.container.style.width = a + "px";
        this.container.style.height = h + "px";
        this.renderer.boxWrapper.attr({
          width: a,
          height: h,
          viewBox: [0, 0, a, h].join(" "),
        });
        this.chartBackground.attr({
          width: a,
          height: h,
        });
        this.scrollingContainer.style.height = this.chartHeight + "px";
        c &&
          (d.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * d.scrollPositionX),
          d.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * d.scrollPositionY));
        h = this.axisOffset;
        c = this.plotTop - h[0] - 1;
        d = this.plotLeft - h[3] - 1;
        a = this.plotTop + this.plotHeight + h[2] + 1;
        h = this.plotLeft + this.plotWidth + h[1] + 1;
        var p = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          B = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        c = this.scrollablePixelsX
          ? [
              ["M", 0, c],
              ["L", this.plotLeft - 1, c],
              ["L", this.plotLeft - 1, a],
              ["L", 0, a],
              ["Z"],
              ["M", p, c],
              ["L", this.chartWidth, c],
              ["L", this.chartWidth, a],
              ["L", p, a],
              ["Z"],
            ]
          : this.scrollablePixelsY
          ? [
              ["M", d, 0],
              ["L", d, this.plotTop - 1],
              ["L", h, this.plotTop - 1],
              ["L", h, 0],
              ["Z"],
              ["M", d, B],
              ["L", d, this.chartHeight],
              ["L", h, this.chartHeight],
              ["L", h, B],
              ["Z"],
            ]
          : [["M", 0, 0]];
        "adjustHeight" !== this.redrawTrigger &&
          this.scrollableMask.attr({
            d: c,
          });
      };
      I(h, "afterInit", function () {
        this.chart.scrollableDirty = !0;
      });
      I(F, "show", function () {
        this.chart.scrollableDirty = !0;
      });
    }
  );
  Q(
    d,
    "Core/Axis/StackingAxis.js",
    [d["Core/Animation/AnimationUtilities.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = d.getDeferredAnimation,
        F = h.addEvent,
        J = h.destroyObjectProperties,
        M = h.fireEvent,
        G = h.isNumber,
        I = h.objectEach,
        D = (function () {
          function d(d) {
            this.oldStacks = {};
            this.stacks = {};
            this.stacksTouched = 0;
            this.axis = d;
          }
          d.prototype.buildStacks = function () {
            var d = this.axis,
              c = d.series,
              a = d.options.reversedStacks,
              h = c.length,
              y;
            if (!d.isXAxis) {
              this.usePercentage = !1;
              for (y = h; y--; ) {
                var p = c[a ? y : h - y - 1];
                p.setStackedPoints();
                p.setGroupedPoints();
              }
              for (y = 0; y < h; y++) c[y].modifyStacks();
              M(d, "afterBuildStacks");
            }
          };
          d.prototype.cleanStacks = function () {
            if (!this.axis.isXAxis) {
              if (this.oldStacks) var d = (this.stacks = this.oldStacks);
              I(d, function (c) {
                I(c, function (a) {
                  a.cumulative = a.total;
                });
              });
            }
          };
          d.prototype.resetStacks = function () {
            var d = this,
              c = this.stacks;
            this.axis.isXAxis ||
              I(c, function (a) {
                I(a, function (c, h) {
                  G(c.touched) && c.touched < d.stacksTouched
                    ? (c.destroy(), delete a[h])
                    : ((c.total = null), (c.cumulative = null));
                });
              });
          };
          d.prototype.renderStackTotals = function () {
            var d = this.axis,
              c = d.chart,
              a = c.renderer,
              h = this.stacks;
            d = N(
              c,
              (d.options.stackLabels && d.options.stackLabels.animation) || !1
            );
            var y = (this.stackTotalGroup =
              this.stackTotalGroup ||
              a
                .g("stack-labels")
                .attr({
                  visibility: "visible",
                  zIndex: 6,
                  opacity: 0,
                })
                .add());
            y.translate(c.plotLeft, c.plotTop);
            I(h, function (a) {
              I(a, function (a) {
                a.render(y);
              });
            });
            y.animate(
              {
                opacity: 1,
              },
              d
            );
          };
          return d;
        })();
      return (function () {
        function d() {}
        d.compose = function (h) {
          F(h, "init", d.onInit);
          F(h, "destroy", d.onDestroy);
        };
        d.onDestroy = function () {
          var d = this.stacking;
          if (d) {
            var c = d.stacks;
            I(c, function (a, d) {
              J(a);
              c[d] = null;
            });
            d && d.stackTotalGroup && d.stackTotalGroup.destroy();
          }
        };
        d.onInit = function () {
          this.stacking || (this.stacking = new D(this));
        };
        return d;
      })();
    }
  );
  Q(
    d,
    "Extensions/Stacking.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Chart/Chart.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Series/Series.js"],
      d["Core/Axis/StackingAxis.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G) {
      var I = K.format,
        D = G.correctFloat,
        B = G.defined,
        u = G.destroyObjectProperties,
        c = G.isArray,
        a = G.isNumber,
        r = G.objectEach,
        y = G.pick;
      ("");
      var p = (function () {
        function c(a, c, d, p, t) {
          var f = a.chart.inverted;
          this.axis = a;
          this.isNegative = d;
          this.options = c = c || {};
          this.x = p;
          this.total = null;
          this.points = {};
          this.hasValidPoints = !1;
          this.stack = t;
          this.rightCliff = this.leftCliff = 0;
          this.alignOptions = {
            align: c.align || (f ? (d ? "left" : "right") : "center"),
            verticalAlign:
              c.verticalAlign || (f ? "middle" : d ? "bottom" : "top"),
            y: c.y,
            x: c.x,
          };
          this.textAlign =
            c.textAlign || (f ? (d ? "right" : "left") : "center");
        }
        c.prototype.destroy = function () {
          u(this, this.axis);
        };
        c.prototype.render = function (a) {
          var c = this.axis.chart,
            k = this.options,
            d = k.format;
          d = d ? I(d, this, c) : k.formatter.call(this);
          this.label
            ? this.label.attr({
                text: d,
                visibility: "hidden",
              })
            : ((this.label = c.renderer.label(
                d,
                null,
                null,
                k.shape,
                null,
                null,
                k.useHTML,
                !1,
                "stack-labels"
              )),
              (d = {
                r: k.borderRadius || 0,
                text: d,
                rotation: k.rotation,
                padding: y(k.padding, 5),
                visibility: "hidden",
              }),
              c.styledMode ||
                ((d.fill = k.backgroundColor),
                (d.stroke = k.borderColor),
                (d["stroke-width"] = k.borderWidth),
                this.label.css(k.style)),
              this.label.attr(d),
              this.label.added || this.label.add(a));
          this.label.labelrank = c.plotSizeY;
        };
        c.prototype.setOffset = function (c, m, d, p, t) {
          var f = this.axis,
            k = f.chart;
          p = f.translate(
            f.stacking.usePercentage ? 100 : p ? p : this.total,
            0,
            0,
            0,
            1
          );
          d = f.translate(d ? d : 0);
          d = B(p) && Math.abs(p - d);
          c = y(t, k.xAxis[0].translate(this.x)) + c;
          f = B(p) && this.getStackBox(k, this, c, p, m, d, f);
          m = this.label;
          d = this.isNegative;
          c = "justify" === y(this.options.overflow, "justify");
          var b = this.textAlign;
          m &&
            f &&
            ((t = m.getBBox()),
            (p = m.padding),
            (b =
              "left" === b
                ? k.inverted
                  ? -p
                  : p
                : "right" === b
                ? t.width
                : k.inverted && "center" === b
                ? t.width / 2
                : k.inverted
                ? d
                  ? t.width + p
                  : -p
                : t.width / 2),
            (d = k.inverted ? t.height / 2 : d ? -p : t.height),
            (this.alignOptions.x = y(this.options.x, 0)),
            (this.alignOptions.y = y(this.options.y, 0)),
            (f.x -= b),
            (f.y -= d),
            m.align(this.alignOptions, null, f),
            k.isInsidePlot(
              m.alignAttr.x + b - this.alignOptions.x,
              m.alignAttr.y + d - this.alignOptions.y
            )
              ? m.show()
              : ((m.alignAttr.y = -9999), (c = !1)),
            c &&
              J.prototype.justifyDataLabel.call(
                this.axis,
                m,
                this.alignOptions,
                m.alignAttr,
                t,
                f
              ),
            m.attr({
              x: m.alignAttr.x,
              y: m.alignAttr.y,
            }),
            y(!c && this.options.crop, !0) &&
              ((k =
                a(m.x) &&
                a(m.y) &&
                k.isInsidePlot(m.x - p + m.width, m.y) &&
                k.isInsidePlot(m.x + p, m.y)) ||
                m.hide()));
        };
        c.prototype.getStackBox = function (a, c, d, p, t, f, h) {
          var b = c.axis.reversed,
            k = a.inverted,
            m = h.height + h.pos - (k ? a.plotLeft : a.plotTop);
          c = (c.isNegative && !b) || (!c.isNegative && b);
          return {
            x: k
              ? c
                ? p - h.right
                : p - f + h.pos - a.plotLeft
              : d + a.xAxis[0].transB - a.plotLeft,
            y: k ? h.height - d - t : c ? m - p - f : m - p,
            width: k ? f : t,
            height: k ? t : f,
          };
        };
        return c;
      })();
      h.prototype.getStacks = function () {
        var a = this,
          c = a.inverted;
        a.yAxis.forEach(function (a) {
          a.stacking &&
            a.stacking.stacks &&
            a.hasVisibleSeries &&
            (a.stacking.oldStacks = a.stacking.stacks);
        });
        a.series.forEach(function (k) {
          var d = (k.xAxis && k.xAxis.options) || {};
          !k.options.stacking ||
            (!0 !== k.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
            (k.stackKey = [
              k.type,
              y(k.options.stack, ""),
              c ? d.top : d.left,
              c ? d.height : d.width,
            ].join());
        });
      };
      M.compose(d);
      J.prototype.setGroupedPoints = function () {
        var a = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is("column") || this.is("columnrange")) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? J.prototype.setStackedPoints.call(this, "group")
          : a &&
            r(a.stacks, function (c, d) {
              "group" === d.slice(-5) &&
                (r(c, function (a) {
                  return a.destroy();
                }),
                delete a.stacks[d]);
            });
      };
      J.prototype.setStackedPoints = function (a) {
        var k = a || this.options.stacking;
        if (
          k &&
          (!0 === this.visible ||
            !1 === this.chart.options.chart.ignoreHiddenSeries)
        ) {
          var d = this.processedXData,
            h = this.processedYData,
            A = [],
            t = h.length,
            f = this.options,
            v = f.threshold,
            b = y(f.startFromThreshold && v, 0);
          f = f.stack;
          a = a ? this.type + "," + k : this.stackKey;
          var r = "-" + a,
            u = this.negStacks,
            H = this.yAxis,
            g = H.stacking.stacks,
            n = H.stacking.oldStacks,
            e,
            l;
          H.stacking.stacksTouched += 1;
          for (l = 0; l < t; l++) {
            var C = d[l];
            var x = h[l];
            var w = this.getStackIndicator(w, C, this.index);
            var q = w.key;
            var z = (e = u && x < (b ? 0 : v)) ? r : a;
            g[z] || (g[z] = {});
            g[z][C] ||
              (n[z] && n[z][C]
                ? ((g[z][C] = n[z][C]), (g[z][C].total = null))
                : (g[z][C] = new p(H, H.options.stackLabels, e, C, f)));
            z = g[z][C];
            null !== x
              ? ((z.points[q] = z.points[this.index] = [y(z.cumulative, b)]),
                B(z.cumulative) || (z.base = q),
                (z.touched = H.stacking.stacksTouched),
                0 < w.index &&
                  !1 === this.singleStacks &&
                  (z.points[q][0] = z.points[this.index + "," + C + ",0"][0]))
              : (z.points[q] = z.points[this.index] = null);
            "percent" === k
              ? ((e = e ? a : r),
                u && g[e] && g[e][C]
                  ? ((e = g[e][C]),
                    (z.total = e.total =
                      Math.max(e.total, z.total) + Math.abs(x) || 0))
                  : (z.total = D(z.total + (Math.abs(x) || 0))))
              : "group" === k
              ? (c(x) && (x = x[0]),
                null !== x && (z.total = (z.total || 0) + 1))
              : (z.total = D(z.total + (x || 0)));
            z.cumulative =
              "group" === k
                ? (z.total || 1) - 1
                : y(z.cumulative, b) + (x || 0);
            null !== x &&
              (z.points[q].push(z.cumulative),
              (A[l] = z.cumulative),
              (z.hasValidPoints = !0));
          }
          "percent" === k && (H.stacking.usePercentage = !0);
          "group" !== k && (this.stackedYData = A);
          H.stacking.oldStacks = {};
        }
      };
      J.prototype.modifyStacks = function () {
        var a = this,
          c = a.stackKey,
          d = a.yAxis.stacking.stacks,
          p = a.processedXData,
          h,
          t = a.options.stacking;
        a[t + "Stacker"] &&
          [c, "-" + c].forEach(function (c) {
            for (var f = p.length, b, k; f--; )
              if (
                ((b = p[f]),
                (h = a.getStackIndicator(h, b, a.index, c)),
                (k = (b = d[c] && d[c][b]) && b.points[h.key]))
              )
                a[t + "Stacker"](k, b, f);
          });
      };
      J.prototype.percentStacker = function (a, c, d) {
        c = c.total ? 100 / c.total : 0;
        a[0] = D(a[0] * c);
        a[1] = D(a[1] * c);
        this.stackedYData[d] = a[1];
      };
      J.prototype.getStackIndicator = function (a, c, d, p) {
        !B(a) || a.x !== c || (p && a.key !== p)
          ? (a = {
              x: c,
              index: 0,
              key: p,
            })
          : a.index++;
        a.key = [d, c, a.index].join();
        return a;
      };
      F.StackItem = p;
      return F.StackItem;
    }
  );
  Q(
    d,
    "Series/Line/LineSeries.js",
    [
      d["Core/Color/Palette.js"],
      d["Core/Series/Series.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var N =
          (this && this.__extends) ||
          (function () {
            var d = function (h, B) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (d, c) {
                    d.__proto__ = c;
                  }) ||
                function (d, c) {
                  for (var a in c) c.hasOwnProperty(a) && (d[a] = c[a]);
                };
              return d(h, B);
            };
            return function (h, B) {
              function u() {
                this.constructor = h;
              }
              d(h, B);
              h.prototype =
                null === B
                  ? Object.create(B)
                  : ((u.prototype = B.prototype), new u());
            };
          })(),
        M = F.defined,
        G = F.merge;
      F = (function (I) {
        function D() {
          var d = (null !== I && I.apply(this, arguments)) || this;
          d.data = void 0;
          d.options = void 0;
          d.points = void 0;
          return d;
        }
        N(D, I);
        D.prototype.drawGraph = function () {
          var h = this,
            u = this.options,
            c = (this.gappedPath || this.getGraphPath).call(this),
            a = this.chart.styledMode,
            r = [["graph", "highcharts-graph"]];
          a ||
            r[0].push(
              u.lineColor || this.color || d.neutralColor20,
              u.dashStyle
            );
          r = h.getZonesGraphs(r);
          r.forEach(function (d, p) {
            var r = d[0],
              k = h[r],
              m = k ? "animate" : "attr";
            k
              ? ((k.endX = h.preventGraphAnimation ? null : c.xMap),
                k.animate({
                  d: c,
                }))
              : c.length &&
                (h[r] = k =
                  h.chart.renderer
                    .path(c)
                    .addClass(d[1])
                    .attr({
                      zIndex: 1,
                    })
                    .add(h.group));
            k &&
              !a &&
              ((r = {
                stroke: d[2],
                "stroke-width": u.lineWidth,
                fill: (h.fillGraph && h.color) || "none",
              }),
              d[3]
                ? (r.dashstyle = d[3])
                : "square" !== u.linecap &&
                  (r["stroke-linecap"] = r["stroke-linejoin"] = "round"),
              k[m](r).shadow(2 > p && u.shadow));
            k && ((k.startX = c.xMap), (k.isArea = c.isArea));
          });
        };
        D.prototype.getGraphPath = function (d, h, c) {
          var a = this,
            r = a.options,
            y = r.step,
            p,
            u = [],
            k = [],
            m;
          d = d || a.points;
          (p = d.reversed) && d.reverse();
          (y =
            {
              right: 1,
              center: 2,
            }[y] ||
            (y && 3)) &&
            p &&
            (y = 4 - y);
          d = this.getValidPoints(d, !1, !(r.connectNulls && !h && !c));
          d.forEach(function (p, A) {
            var t = p.plotX,
              f = p.plotY,
              v = d[A - 1];
            (p.leftCliff || (v && v.rightCliff)) && !c && (m = !0);
            p.isNull && !M(h) && 0 < A
              ? (m = !r.connectNulls)
              : p.isNull && !h
              ? (m = !0)
              : (0 === A || m
                  ? (A = [["M", p.plotX, p.plotY]])
                  : a.getPointSpline
                  ? (A = [a.getPointSpline(d, p, A)])
                  : y
                  ? ((A =
                      1 === y
                        ? [["L", v.plotX, f]]
                        : 2 === y
                        ? [
                            ["L", (v.plotX + t) / 2, v.plotY],
                            ["L", (v.plotX + t) / 2, f],
                          ]
                        : [["L", t, v.plotY]]),
                    A.push(["L", t, f]))
                  : (A = [["L", t, f]]),
                k.push(p.x),
                y && (k.push(p.x), 2 === y && k.push(p.x)),
                u.push.apply(u, A),
                (m = !1));
          });
          u.xMap = k;
          return (a.graphPath = u);
        };
        D.prototype.getZonesGraphs = function (d) {
          this.zones.forEach(function (h, c) {
            c = [
              "zone-graph-" + c,
              "highcharts-graph highcharts-zone-graph-" +
                c +
                " " +
                (h.className || ""),
            ];
            this.chart.styledMode ||
              c.push(
                h.color || this.color,
                h.dashStyle || this.options.dashStyle
              );
            d.push(c);
          }, this);
          return d;
        };
        D.defaultOptions = G(h.defaultOptions, {});
        return D;
      })(h);
      K.registerSeriesType("line", F);
      ("");
      return F;
    }
  );
  Q(
    d,
    "Series/Area/AreaSeries.js",
    [
      d["Core/Color/Color.js"],
      d["Mixins/LegendSymbol.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var N =
          (this && this.__extends) ||
          (function () {
            var d = function (c, a) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                };
              return d(c, a);
            };
            return function (c, a) {
              function h() {
                this.constructor = c;
              }
              d(c, a);
              c.prototype =
                null === a
                  ? Object.create(a)
                  : ((h.prototype = a.prototype), new h());
            };
          })(),
        M = d.parse,
        G = K.seriesTypes.line;
      d = F.extend;
      var I = F.merge,
        D = F.objectEach,
        B = F.pick;
      F = (function (d) {
        function c() {
          var a = (null !== d && d.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        N(c, d);
        c.prototype.drawGraph = function () {
          this.areaPath = [];
          d.prototype.drawGraph.apply(this);
          var a = this,
            c = this.areaPath,
            h = this.options,
            p = [["area", "highcharts-area", this.color, h.fillColor]];
          this.zones.forEach(function (c, k) {
            p.push([
              "zone-area-" + k,
              "highcharts-area highcharts-zone-area-" + k + " " + c.className,
              c.color || a.color,
              c.fillColor || h.fillColor,
            ]);
          });
          p.forEach(function (d) {
            var k = d[0],
              m = a[k],
              p = m ? "animate" : "attr",
              A = {};
            m
              ? ((m.endX = a.preventGraphAnimation ? null : c.xMap),
                m.animate({
                  d: c,
                }))
              : ((A.zIndex = 0),
                (m = a[k] =
                  a.chart.renderer.path(c).addClass(d[1]).add(a.group)),
                (m.isArea = !0));
            a.chart.styledMode ||
              (A.fill = B(
                d[3],
                M(d[2]).setOpacity(B(h.fillOpacity, 0.75)).get()
              ));
            m[p](A);
            m.startX = c.xMap;
            m.shiftUnit = h.step ? 2 : 1;
          });
        };
        c.prototype.getGraphPath = function (a) {
          var c = G.prototype.getGraphPath,
            d = this.options,
            p = d.stacking,
            h = this.yAxis,
            k,
            m = [],
            u = [],
            A = this.index,
            t = h.stacking.stacks[this.stackKey],
            f = d.threshold,
            v = Math.round(h.getThreshold(d.threshold));
          d = B(d.connectNulls, "percent" === p);
          var b = function (b, c, e) {
            var g = a[b];
            b = p && t[g.x].points[A];
            var k = g[e + "Null"] || 0;
            e = g[e + "Cliff"] || 0;
            g = !0;
            if (e || k) {
              var n = (k ? b[0] : b[1]) + e;
              var d = b[0] + e;
              g = !!k;
            } else !p && a[c] && a[c].isNull && (n = d = f);
            "undefined" !== typeof n &&
              (u.push({
                plotX: D,
                plotY: null === n ? v : h.getThreshold(n),
                isNull: g,
                isCliff: !0,
              }),
              m.push({
                plotX: D,
                plotY: null === d ? v : h.getThreshold(d),
                doCurve: !1,
              }));
          };
          a = a || this.points;
          p && (a = this.getStackPoints(a));
          for (k = 0; k < a.length; k++) {
            p ||
              (a[k].leftCliff =
                a[k].rightCliff =
                a[k].leftNull =
                a[k].rightNull =
                  void 0);
            var E = a[k].isNull;
            var D = B(a[k].rectPlotX, a[k].plotX);
            var H = p ? B(a[k].yBottom, v) : v;
            if (!E || d)
              d || b(k, k - 1, "left"),
                (E && !p && d) ||
                  (u.push(a[k]),
                  m.push({
                    x: k,
                    plotX: D,
                    plotY: H,
                  })),
                d || b(k, k + 1, "right");
          }
          k = c.call(this, u, !0, !0);
          m.reversed = !0;
          E = c.call(this, m, !0, !0);
          (H = E[0]) && "M" === H[0] && (E[0] = ["L", H[1], H[2]]);
          E = k.concat(E);
          E.length && E.push(["Z"]);
          c = c.call(this, u, !1, d);
          E.xMap = k.xMap;
          this.areaPath = E;
          return c;
        };
        c.prototype.getStackPoints = function (a) {
          var c = this,
            d = [],
            h = [],
            u = this.xAxis,
            k = this.yAxis,
            m = k.stacking.stacks[this.stackKey],
            L = {},
            A = k.series,
            t = A.length,
            f = k.options.reversedStacks ? 1 : -1,
            v = A.indexOf(c);
          a = a || this.points;
          if (this.options.stacking) {
            for (var b = 0; b < a.length; b++)
              (a[b].leftNull = a[b].rightNull = void 0), (L[a[b].x] = a[b]);
            D(m, function (b, a) {
              null !== b.total && h.push(a);
            });
            h.sort(function (b, a) {
              return b - a;
            });
            var E = A.map(function (b) {
              return b.visible;
            });
            h.forEach(function (b, a) {
              var g = 0,
                n,
                e;
              if (L[b] && !L[b].isNull)
                d.push(L[b]),
                  [-1, 1].forEach(function (g) {
                    var l = 1 === g ? "rightNull" : "leftNull",
                      k = 0,
                      d = m[h[a + g]];
                    if (d)
                      for (var C = v; 0 <= C && C < t; ) {
                        var p = A[C].index;
                        n = d.points[p];
                        n ||
                          (p === c.index
                            ? (L[b][l] = !0)
                            : E[C] &&
                              (e = m[b].points[p]) &&
                              (k -= e[1] - e[0]));
                        C += f;
                      }
                    L[b][1 === g ? "rightCliff" : "leftCliff"] = k;
                  });
              else {
                for (var l = v; 0 <= l && l < t; ) {
                  if ((n = m[b].points[A[l].index])) {
                    g = n[1];
                    break;
                  }
                  l += f;
                }
                g = B(g, 0);
                g = k.translate(g, 0, 1, 0, 1);
                d.push({
                  isNull: !0,
                  plotX: u.translate(b, 0, 0, 0, 1),
                  x: b,
                  plotY: g,
                  yBottom: g,
                });
              }
            });
          }
          return d;
        };
        c.defaultOptions = I(G.defaultOptions, {
          threshold: 0,
        });
        return c;
      })(G);
      d(F.prototype, {
        singleStacks: !1,
        drawLegendSymbol: h.drawRectangle,
      });
      K.registerSeriesType("area", F);
      ("");
      return F;
    }
  );
  Q(
    d,
    "Series/Spline/SplineSeries.js",
    [d["Core/Series/SeriesRegistry.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N =
          (this && this.__extends) ||
          (function () {
            var d = function (h, D) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (d, h) {
                    d.__proto__ = h;
                  }) ||
                function (d, h) {
                  for (var c in h) h.hasOwnProperty(c) && (d[c] = h[c]);
                };
              return d(h, D);
            };
            return function (h, D) {
              function B() {
                this.constructor = h;
              }
              d(h, D);
              h.prototype =
                null === D
                  ? Object.create(D)
                  : ((B.prototype = D.prototype), new B());
            };
          })(),
        F = d.seriesTypes.line,
        J = h.merge,
        M = h.pick;
      h = (function (d) {
        function h() {
          var h = (null !== d && d.apply(this, arguments)) || this;
          h.data = void 0;
          h.options = void 0;
          h.points = void 0;
          return h;
        }
        N(h, d);
        h.prototype.getPointSpline = function (d, h, u) {
          var c = h.plotX || 0,
            a = h.plotY || 0,
            r = d[u - 1];
          u = d[u + 1];
          if (
            r &&
            !r.isNull &&
            !1 !== r.doCurve &&
            !h.isCliff &&
            u &&
            !u.isNull &&
            !1 !== u.doCurve &&
            !h.isCliff
          ) {
            d = r.plotY || 0;
            var y = u.plotX || 0;
            u = u.plotY || 0;
            var p = 0;
            var B = (1.5 * c + (r.plotX || 0)) / 2.5;
            var k = (1.5 * a + d) / 2.5;
            y = (1.5 * c + y) / 2.5;
            var m = (1.5 * a + u) / 2.5;
            y !== B && (p = ((m - k) * (y - c)) / (y - B) + a - m);
            k += p;
            m += p;
            k > d && k > a
              ? ((k = Math.max(d, a)), (m = 2 * a - k))
              : k < d && k < a && ((k = Math.min(d, a)), (m = 2 * a - k));
            m > u && m > a
              ? ((m = Math.max(u, a)), (k = 2 * a - m))
              : m < u && m < a && ((m = Math.min(u, a)), (k = 2 * a - m));
            h.rightContX = y;
            h.rightContY = m;
          }
          h = [
            "C",
            M(r.rightContX, r.plotX, 0),
            M(r.rightContY, r.plotY, 0),
            M(B, c, 0),
            M(k, a, 0),
            c,
            a,
          ];
          r.rightContX = r.rightContY = void 0;
          return h;
        };
        h.defaultOptions = J(F.defaultOptions);
        return h;
      })(F);
      d.registerSeriesType("spline", h);
      ("");
      return h;
    }
  );
  Q(
    d,
    "Series/AreaSpline/AreaSplineSeries.js",
    [
      d["Series/Area/AreaSeries.js"],
      d["Series/Spline/SplineSeries.js"],
      d["Mixins/LegendSymbol.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J) {
      var N =
          (this && this.__extends) ||
          (function () {
            var d = function (h, c) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                };
              return d(h, c);
            };
            return function (h, c) {
              function a() {
                this.constructor = h;
              }
              d(h, c);
              h.prototype =
                null === c
                  ? Object.create(c)
                  : ((a.prototype = c.prototype), new a());
            };
          })(),
        G = d.prototype,
        I = J.extend,
        D = J.merge;
      J = (function (B) {
        function u() {
          var c = (null !== B && B.apply(this, arguments)) || this;
          c.data = void 0;
          c.points = void 0;
          c.options = void 0;
          return c;
        }
        N(u, B);
        u.defaultOptions = D(h.defaultOptions, d.defaultOptions);
        return u;
      })(h);
      I(J.prototype, {
        getGraphPath: G.getGraphPath,
        getStackPoints: G.getStackPoints,
        drawGraph: G.drawGraph,
        drawLegendSymbol: K.drawRectangle,
      });
      F.registerSeriesType("areaspline", J);
      ("");
      return J;
    }
  );
  Q(
    d,
    "Series/Column/ColumnSeries.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Color/Color.js"],
      d["Core/Globals.js"],
      d["Mixins/LegendSymbol.js"],
      d["Core/Color/Palette.js"],
      d["Core/Series/Series.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I) {
      var D =
          (this && this.__extends) ||
          (function () {
            var a = function (c, b) {
              a =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (b, a) {
                    b.__proto__ = a;
                  }) ||
                function (b, a) {
                  for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                };
              return a(c, b);
            };
            return function (c, b) {
              function f() {
                this.constructor = c;
              }
              a(c, b);
              c.prototype =
                null === b
                  ? Object.create(b)
                  : ((f.prototype = b.prototype), new f());
            };
          })(),
        B = d.animObject,
        u = h.parse,
        c = K.hasTouch;
      d = K.noop;
      var a = I.clamp,
        r = I.css,
        y = I.defined,
        p = I.extend,
        O = I.fireEvent,
        k = I.isArray,
        m = I.isNumber,
        L = I.merge,
        A = I.pick,
        t = I.objectEach;
      I = (function (f) {
        function d() {
          var b = (null !== f && f.apply(this, arguments)) || this;
          b.borderWidth = void 0;
          b.data = void 0;
          b.group = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        D(d, f);
        d.prototype.animate = function (b) {
          var c = this,
            f = this.yAxis,
            k = c.options,
            g = this.chart.inverted,
            n = {},
            e = g ? "translateX" : "translateY";
          if (b)
            (n.scaleY = 0.001),
              (b = a(f.toPixels(k.threshold), f.pos, f.pos + f.len)),
              g ? (n.translateX = b - f.len) : (n.translateY = b),
              c.clipBox && c.setClip(),
              c.group.attr(n);
          else {
            var l = Number(c.group.attr(e));
            c.group.animate(
              {
                scaleY: 1,
              },
              p(B(c.options.animation), {
                step: function (b, a) {
                  c.group &&
                    ((n[e] = l + a.pos * (f.pos - l)), c.group.attr(n));
                },
              })
            );
          }
        };
        d.prototype.init = function (b, a) {
          f.prototype.init.apply(this, arguments);
          var c = this;
          b = c.chart;
          b.hasRendered &&
            b.series.forEach(function (b) {
              b.type === c.type && (b.isDirty = !0);
            });
        };
        d.prototype.getColumnMetrics = function () {
          var b = this,
            a = b.options,
            c = b.xAxis,
            f = b.yAxis,
            g = c.options.reversedStacks;
          g = (c.reversed && !g) || (!c.reversed && g);
          var k,
            e = {},
            l = 0;
          !1 === a.grouping
            ? (l = 1)
            : b.chart.series.forEach(function (a) {
                var c = a.yAxis,
                  g = a.options;
                if (
                  a.type === b.type &&
                  (a.visible || !b.chart.options.chart.ignoreHiddenSeries) &&
                  f.len === c.len &&
                  f.pos === c.pos
                ) {
                  if (g.stacking && "group" !== g.stacking) {
                    k = a.stackKey;
                    "undefined" === typeof e[k] && (e[k] = l++);
                    var n = e[k];
                  } else !1 !== g.grouping && (n = l++);
                  a.columnIndex = n;
                }
              });
          var d = Math.min(
              Math.abs(c.transA) *
                ((c.ordinal && c.ordinal.slope) ||
                  a.pointRange ||
                  c.closestPointRange ||
                  c.tickInterval ||
                  1),
              c.len
            ),
            m = d * a.groupPadding,
            h = (d - 2 * m) / (l || 1);
          a = Math.min(
            a.maxPointWidth || c.len,
            A(a.pointWidth, h * (1 - 2 * a.pointPadding))
          );
          b.columnMetrics = {
            width: a,
            offset:
              (h - a) / 2 +
              (m + ((b.columnIndex || 0) + (g ? 1 : 0)) * h - d / 2) *
                (g ? -1 : 1),
            paddedWidth: h,
            columnCount: l,
          };
          return b.columnMetrics;
        };
        d.prototype.crispCol = function (b, a, c, f) {
          var g = this.chart,
            k = this.borderWidth,
            e = -(k % 2 ? 0.5 : 0);
          k = k % 2 ? 0.5 : 1;
          g.inverted && g.renderer.isVML && (k += 1);
          this.options.crisp &&
            ((c = Math.round(b + c) + e), (b = Math.round(b) + e), (c -= b));
          f = Math.round(a + f) + k;
          e = 0.5 >= Math.abs(a) && 0.5 < f;
          a = Math.round(a) + k;
          f -= a;
          e && f && (--a, (f += 1));
          return {
            x: b,
            y: a,
            width: c,
            height: f,
          };
        };
        d.prototype.adjustForMissingColumns = function (b, a, c, f) {
          var g = this,
            n = this.options.stacking;
          if (!c.isNull && 1 < f.columnCount) {
            var e = 0,
              l = 0;
            t(this.yAxis.stacking && this.yAxis.stacking.stacks, function (b) {
              if ("number" === typeof c.x && (b = b[c.x.toString()])) {
                var a = b.points[g.index],
                  f = b.total;
                n
                  ? (a && (e = l), b.hasValidPoints && l++)
                  : k(a) && ((e = a[1]), (l = f || 0));
              }
            });
            b =
              (c.plotX || 0) +
              ((l - 1) * f.paddedWidth + a) / 2 -
              a -
              e * f.paddedWidth;
          }
          return b;
        };
        d.prototype.translate = function () {
          var b = this,
            c = b.chart,
            f = b.options,
            k = (b.dense = 2 > b.closestPointRange * b.xAxis.transA);
          k = b.borderWidth = A(f.borderWidth, k ? 0 : 1);
          var g = b.xAxis,
            n = b.yAxis,
            e = f.threshold,
            l = (b.translatedThreshold = n.getThreshold(e)),
            d = A(f.minPointLength, 5),
            x = b.getColumnMetrics(),
            h = x.width,
            q = (b.barW = Math.max(h, 1 + 2 * k)),
            p = (b.pointXOffset = x.offset),
            t = b.dataMin,
            v = b.dataMax;
          c.inverted && (l -= 0.5);
          f.pointPadding && (q = Math.ceil(q));
          M.prototype.translate.apply(b);
          b.points.forEach(function (k) {
            var C = A(k.yBottom, l),
              w = 999 + Math.abs(C),
              z = h,
              r = k.plotX || 0;
            w = a(k.plotY, -w, n.len + w);
            r += p;
            var u = q,
              E = Math.min(w, C),
              H = Math.max(w, C) - E;
            if (d && Math.abs(H) < d) {
              H = d;
              var B =
                (!n.reversed && !k.negative) || (n.reversed && k.negative);
              m(e) &&
                m(v) &&
                k.y === e &&
                v <= e &&
                (n.min || 0) < e &&
                (t !== v || (n.max || 0) <= e) &&
                (B = !B);
              E = Math.abs(E - l) > d ? C - d : l - (B ? d : 0);
            }
            y(k.options.pointWidth) &&
              ((z = u = Math.ceil(k.options.pointWidth)),
              (r -= Math.round((z - h) / 2)));
            f.centerInCategory && (r = b.adjustForMissingColumns(r, z, k, x));
            k.barX = r;
            k.pointWidth = z;
            k.tooltipPos = c.inverted
              ? [
                  a(
                    n.len + n.pos - c.plotLeft - w,
                    n.pos - c.plotLeft,
                    n.len + n.pos - c.plotLeft
                  ),
                  g.len + g.pos - c.plotTop - r - u / 2,
                  H,
                ]
              : [
                  g.left - c.plotLeft + r + u / 2,
                  a(
                    w + n.pos - c.plotTop,
                    n.pos - c.plotTop,
                    n.len + n.pos - c.plotTop
                  ),
                  H,
                ];
            k.shapeType = b.pointClass.prototype.shapeType || "rect";
            k.shapeArgs = b.crispCol.apply(
              b,
              k.isNull ? [r, l, u, 0] : [r, E, u, H]
            );
          });
        };
        d.prototype.drawGraph = function () {
          this.group[this.dense ? "addClass" : "removeClass"](
            "highcharts-dense-data"
          );
        };
        d.prototype.pointAttribs = function (b, a) {
          var c = this.options,
            f = this.pointAttrToOptions || {};
          var g = f.stroke || "borderColor";
          var k = f["stroke-width"] || "borderWidth",
            e = (b && b.color) || this.color,
            l = (b && b[g]) || c[g] || e,
            d = (b && b[k]) || c[k] || this[k] || 0;
          f = (b && b.options.dashStyle) || c.dashStyle;
          var m = A(b && b.opacity, c.opacity, 1);
          if (b && this.zones.length) {
            var h = b.getZone();
            e =
              b.options.color ||
              (h && (h.color || b.nonZonedColor)) ||
              this.color;
            h &&
              ((l = h.borderColor || l),
              (f = h.dashStyle || f),
              (d = h.borderWidth || d));
          }
          a &&
            b &&
            ((b = L(
              c.states[a],
              (b.options.states && b.options.states[a]) || {}
            )),
            (a = b.brightness),
            (e =
              b.color ||
              ("undefined" !== typeof a && u(e).brighten(b.brightness).get()) ||
              e),
            (l = b[g] || l),
            (d = b[k] || d),
            (f = b.dashStyle || f),
            (m = A(b.opacity, m)));
          g = {
            fill: e,
            stroke: l,
            "stroke-width": d,
            opacity: m,
          };
          f && (g.dashstyle = f);
          return g;
        };
        d.prototype.drawPoints = function () {
          var b = this,
            a = this.chart,
            c = b.options,
            f = a.renderer,
            g = c.animationLimit || 250,
            k;
          b.points.forEach(function (e) {
            var l = e.graphic,
              d = !!l,
              n = l && a.pointCount < g ? "animate" : "attr";
            if (m(e.plotY) && null !== e.y) {
              k = e.shapeArgs;
              l && e.hasNewShapeType() && (l = l.destroy());
              b.enabledDataSorting &&
                (e.startXPos = b.xAxis.reversed
                  ? -(k ? k.width || 0 : 0)
                  : b.xAxis.width);
              l ||
                ((e.graphic = l = f[e.shapeType](k).add(e.group || b.group)) &&
                  b.enabledDataSorting &&
                  a.hasRendered &&
                  a.pointCount < g &&
                  (l.attr({
                    x: e.startXPos,
                  }),
                  (d = !0),
                  (n = "animate")));
              if (l && d) l[n](L(k));
              if (c.borderRadius)
                l[n]({
                  r: c.borderRadius,
                });
              a.styledMode ||
                l[n](b.pointAttribs(e, e.selected && "select")).shadow(
                  !1 !== e.allowShadow && c.shadow,
                  null,
                  c.stacking && !c.borderRadius
                );
              l &&
                (l.addClass(e.getClassName(), !0),
                l.attr({
                  visibility: e.visible ? "inherit" : "hidden",
                }));
            } else l && (e.graphic = l.destroy());
          });
        };
        d.prototype.drawTracker = function () {
          var b = this,
            a = b.chart,
            f = a.pointer,
            d = function (b) {
              var a = f.getPointFromEvent(b);
              "undefined" !== typeof a &&
                ((f.isDirectTouch = !0), a.onMouseOver(b));
            },
            g;
          b.points.forEach(function (b) {
            g = k(b.dataLabels)
              ? b.dataLabels
              : b.dataLabel
              ? [b.dataLabel]
              : [];
            b.graphic && (b.graphic.element.point = b);
            g.forEach(function (a) {
              a.div ? (a.div.point = b) : (a.element.point = b);
            });
          });
          b._hasTracking ||
            (b.trackerGroups.forEach(function (g) {
              if (b[g]) {
                b[g]
                  .addClass("highcharts-tracker")
                  .on("mouseover", d)
                  .on("mouseout", function (b) {
                    f.onTrackerMouseOut(b);
                  });
                if (c) b[g].on("touchstart", d);
                !a.styledMode &&
                  b.options.cursor &&
                  b[g].css(r).css({
                    cursor: b.options.cursor,
                  });
              }
            }),
            (b._hasTracking = !0));
          O(this, "afterDrawTracker");
        };
        d.prototype.remove = function () {
          var b = this,
            a = b.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === b.type && (a.isDirty = !0);
            });
          M.prototype.remove.apply(b, arguments);
        };
        d.defaultOptions = L(M.defaultOptions, {
          borderRadius: 0,
          centerInCategory: !1,
          groupPadding: 0.2,
          marker: null,
          pointPadding: 0.1,
          minPointLength: 0,
          cropThreshold: 50,
          pointRange: null,
          states: {
            hover: {
              halo: !1,
              brightness: 0.1,
            },
            select: {
              color: J.neutralColor20,
              borderColor: J.neutralColor100,
            },
          },
          dataLabels: {
            align: void 0,
            verticalAlign: void 0,
            y: void 0,
          },
          startFromThreshold: !0,
          stickyTracking: !1,
          tooltip: {
            distance: 6,
          },
          threshold: 0,
          borderColor: J.backgroundColor,
        });
        return d;
      })(M);
      p(I.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: F.drawRectangle,
        getSymbol: d,
        negStacks: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      G.registerSeriesType("column", I);
      ("");
      ("");
      return I;
    }
  );
  Q(
    d,
    "Series/Bar/BarSeries.js",
    [
      d["Series/Column/ColumnSeries.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K) {
      var F =
          (this && this.__extends) ||
          (function () {
            var d = function (h, D) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (d, h) {
                    d.__proto__ = h;
                  }) ||
                function (d, h) {
                  for (var c in h) h.hasOwnProperty(c) && (d[c] = h[c]);
                };
              return d(h, D);
            };
            return function (h, D) {
              function B() {
                this.constructor = h;
              }
              d(h, D);
              h.prototype =
                null === D
                  ? Object.create(D)
                  : ((B.prototype = D.prototype), new B());
            };
          })(),
        J = K.extend,
        N = K.merge;
      K = (function (h) {
        function G() {
          var d = (null !== h && h.apply(this, arguments)) || this;
          d.data = void 0;
          d.options = void 0;
          d.points = void 0;
          return d;
        }
        F(G, h);
        G.defaultOptions = N(d.defaultOptions, {});
        return G;
      })(d);
      J(K.prototype, {
        inverted: !0,
      });
      h.registerSeriesType("bar", K);
      ("");
      return K;
    }
  );
  Q(
    d,
    "Series/Scatter/ScatterSeries.js",
    [
      d["Series/Column/ColumnSeries.js"],
      d["Series/Line/LineSeries.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var J =
          (this && this.__extends) ||
          (function () {
            var d = function (h, u) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (c, a) {
                    c.__proto__ = a;
                  }) ||
                function (c, a) {
                  for (var d in a) a.hasOwnProperty(d) && (c[d] = a[d]);
                };
              return d(h, u);
            };
            return function (h, u) {
              function c() {
                this.constructor = h;
              }
              d(h, u);
              h.prototype =
                null === u
                  ? Object.create(u)
                  : ((c.prototype = u.prototype), new c());
            };
          })(),
        N = F.addEvent,
        G = F.extend,
        I = F.merge;
      F = (function (d) {
        function B() {
          var h = (null !== d && d.apply(this, arguments)) || this;
          h.data = void 0;
          h.options = void 0;
          h.points = void 0;
          return h;
        }
        J(B, d);
        B.prototype.applyJitter = function () {
          var d = this,
            c = this.options.jitter,
            a = this.points.length;
          c &&
            this.points.forEach(function (h, y) {
              ["x", "y"].forEach(function (p, r) {
                var k = "plot" + p.toUpperCase();
                if (c[p] && !h.isNull) {
                  var m = d[p + "Axis"];
                  var u = c[p] * m.transA;
                  if (m && !m.isLog) {
                    var A = Math.max(0, h[k] - u);
                    m = Math.min(m.len, h[k] + u);
                    r = 1e4 * Math.sin(y + r * a);
                    h[k] = A + (m - A) * (r - Math.floor(r));
                    "x" === p && (h.clientX = h.plotX);
                  }
                }
              });
            });
        };
        B.prototype.drawGraph = function () {
          (this.options.lineWidth ||
            (0 === this.options.lineWidth &&
              this.graph &&
              this.graph.strokeWidth())) &&
            d.prototype.drawGraph.call(this);
        };
        B.defaultOptions = I(h.defaultOptions, {
          lineWidth: 0,
          findNearestPointBy: "xy",
          jitter: {
            x: 0,
            y: 0,
          },
          marker: {
            enabled: !0,
          },
          tooltip: {
            headerFormat:
              '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
          },
        });
        return B;
      })(h);
      G(F.prototype, {
        drawTracker: d.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
      });
      N(F, "afterTranslate", function () {
        this.applyJitter();
      });
      K.registerSeriesType("scatter", F);
      ("");
      return F;
    }
  );
  Q(
    d,
    "Mixins/CenteredSeries.js",
    [d["Core/Globals.js"], d["Core/Series/Series.js"], d["Core/Utilities.js"]],
    function (d, h, K) {
      var F = K.isNumber,
        J = K.pick,
        N = K.relativeLength,
        G = d.deg2rad;
      return (d.CenteredSeriesMixin = {
        getCenter: function () {
          var d = this.options,
            D = this.chart,
            B = 2 * (d.slicedOffset || 0),
            u = D.plotWidth - 2 * B,
            c = D.plotHeight - 2 * B,
            a = d.center,
            r = Math.min(u, c),
            y = d.size,
            p = d.innerSize || 0;
          "string" === typeof y && (y = parseFloat(y));
          "string" === typeof p && (p = parseFloat(p));
          d = [
            J(a[0], "50%"),
            J(a[1], "50%"),
            J(y && 0 > y ? void 0 : d.size, "100%"),
            J(p && 0 > p ? void 0 : d.innerSize || 0, "0%"),
          ];
          !D.angular || this instanceof h || (d[3] = 0);
          for (a = 0; 4 > a; ++a)
            (y = d[a]),
              (D = 2 > a || (2 === a && /%$/.test(y))),
              (d[a] = N(y, [u, c, r, d[2]][a]) + (D ? B : 0));
          d[3] > d[2] && (d[3] = d[2]);
          return d;
        },
        getStartAndEndRadians: function (d, h) {
          d = F(d) ? d : 0;
          h = F(h) && h > d && 360 > h - d ? h : d + 360;
          return {
            start: G * (d + -90),
            end: G * (h + -90),
          };
        },
      });
    }
  );
  Q(
    d,
    "Series/Pie/PiePoint.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Series/Point.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K) {
      var F =
          (this && this.__extends) ||
          (function () {
            var d = function (c, a) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                };
              return d(c, a);
            };
            return function (c, a) {
              function h() {
                this.constructor = c;
              }
              d(c, a);
              c.prototype =
                null === a
                  ? Object.create(a)
                  : ((h.prototype = a.prototype), new h());
            };
          })(),
        J = d.setAnimation,
        N = K.addEvent,
        G = K.defined;
      d = K.extend;
      var I = K.isNumber,
        D = K.pick,
        B = K.relativeLength;
      K = (function (d) {
        function c() {
          var a = (null !== d && d.apply(this, arguments)) || this;
          a.labelDistance = void 0;
          a.options = void 0;
          a.series = void 0;
          return a;
        }
        F(c, d);
        c.prototype.getConnectorPath = function () {
          var a = this.labelPosition,
            c = this.series.options.dataLabels,
            d = c.connectorShape,
            h = this.connectorShapes;
          h[d] && (d = h[d]);
          return d.call(
            this,
            {
              x: a.final.x,
              y: a.final.y,
              alignment: a.alignment,
            },
            a.connectorPosition,
            c
          );
        };
        c.prototype.getTranslate = function () {
          return this.sliced
            ? this.slicedTranslation
            : {
                translateX: 0,
                translateY: 0,
              };
        };
        c.prototype.haloPath = function (a) {
          var c = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                c.x,
                c.y,
                c.r + a,
                c.r + a,
                {
                  innerR: c.r - 1,
                  start: c.start,
                  end: c.end,
                }
              );
        };
        c.prototype.init = function () {
          h.prototype.init.apply(this, arguments);
          var a = this;
          a.name = D(a.name, "Slice");
          var c = function (c) {
            a.slice("select" === c.type);
          };
          N(a, "select", c);
          N(a, "unselect", c);
          return a;
        };
        c.prototype.isValid = function () {
          return I(this.y) && 0 <= this.y;
        };
        c.prototype.setVisible = function (a, c) {
          var d = this,
            h = d.series,
            r = h.chart,
            k = h.options.ignoreHiddenPoint;
          c = D(c, k);
          a !== d.visible &&
            ((d.visible =
              d.options.visible =
              a =
                "undefined" === typeof a ? !d.visible : a),
            (h.options.data[h.data.indexOf(d)] = d.options),
            ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(
              function (c) {
                if (d[c]) d[c][a ? "show" : "hide"](a);
              }
            ),
            d.legendItem && r.legend.colorizeItem(d, a),
            a || "hover" !== d.state || d.setState(""),
            k && (h.isDirty = !0),
            c && r.redraw());
        };
        c.prototype.slice = function (a, c, d) {
          var h = this.series;
          J(d, h.chart);
          D(c, !0);
          this.sliced = this.options.sliced = G(a) ? a : !this.sliced;
          h.options.data[h.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        };
        return c;
      })(h);
      d(K.prototype, {
        connectorShapes: {
          fixedOffset: function (d, c, a) {
            var h = c.breakAt;
            c = c.touchingSliceAt;
            return [
              ["M", d.x, d.y],
              a.softConnector
                ? [
                    "C",
                    d.x + ("left" === d.alignment ? -5 : 5),
                    d.y,
                    2 * h.x - c.x,
                    2 * h.y - c.y,
                    h.x,
                    h.y,
                  ]
                : ["L", h.x, h.y],
              ["L", c.x, c.y],
            ];
          },
          straight: function (d, c) {
            c = c.touchingSliceAt;
            return [
              ["M", d.x, d.y],
              ["L", c.x, c.y],
            ];
          },
          crookedLine: function (d, c, a) {
            c = c.touchingSliceAt;
            var h = this.series,
              y = h.center[0],
              p = h.chart.plotWidth,
              u = h.chart.plotLeft;
            h = d.alignment;
            var k = this.shapeArgs.r;
            a = B(a.crookDistance, 1);
            p =
              "left" === h
                ? y + k + (p + u - y - k) * (1 - a)
                : u + (y - k) * a;
            a = ["L", p, d.y];
            y = !0;
            if ("left" === h ? p > d.x || p < c.x : p < d.x || p > c.x) y = !1;
            d = [["M", d.x, d.y]];
            y && d.push(a);
            d.push(["L", c.x, c.y]);
            return d;
          },
        },
      });
      return K;
    }
  );
  Q(
    d,
    "Series/Pie/PieSeries.js",
    [
      d["Mixins/CenteredSeries.js"],
      d["Series/Column/ColumnSeries.js"],
      d["Core/Globals.js"],
      d["Mixins/LegendSymbol.js"],
      d["Core/Color/Palette.js"],
      d["Series/Pie/PiePoint.js"],
      d["Core/Series/Series.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Renderer/SVG/SVGRenderer.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I, D, B) {
      var u =
          (this && this.__extends) ||
          (function () {
            var a = function (c, k) {
              a =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var f in c) c.hasOwnProperty(f) && (a[f] = c[f]);
                };
              return a(c, k);
            };
            return function (c, k) {
              function d() {
                this.constructor = c;
              }
              a(c, k);
              c.prototype =
                null === k
                  ? Object.create(k)
                  : ((d.prototype = k.prototype), new d());
            };
          })(),
        c = d.getStartAndEndRadians;
      K = K.noop;
      var a = B.clamp,
        r = B.extend,
        y = B.fireEvent,
        p = B.merge,
        O = B.pick,
        k = B.relativeLength;
      B = (function (d) {
        function h() {
          var a = (null !== d && d.apply(this, arguments)) || this;
          a.center = void 0;
          a.data = void 0;
          a.maxLabelDistance = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        u(h, d);
        h.prototype.animate = function (a) {
          var c = this,
            f = c.points,
            k = c.startAngleRad;
          a ||
            f.forEach(function (b) {
              var a = b.graphic,
                f = b.shapeArgs;
              a &&
                f &&
                (a.attr({
                  r: O(b.startR, c.center && c.center[3] / 2),
                  start: k,
                  end: k,
                }),
                a.animate(
                  {
                    r: f.r,
                    start: f.start,
                    end: f.end,
                  },
                  c.options.animation
                ));
            });
        };
        h.prototype.drawEmpty = function () {
          var a = this.startAngleRad,
            c = this.endAngleRad,
            f = this.options;
          if (0 === this.total && this.center) {
            var k = this.center[0];
            var b = this.center[1];
            this.graph ||
              (this.graph = this.chart.renderer
                .arc(k, b, this.center[1] / 2, 0, a, c)
                .addClass("highcharts-empty-series")
                .add(this.group));
            this.graph.attr({
              d: D.prototype.symbols.arc(k, b, this.center[2] / 2, 0, {
                start: a,
                end: c,
                innerR: this.center[3] / 2,
              }),
            });
            this.chart.styledMode ||
              this.graph.attr({
                "stroke-width": f.borderWidth,
                fill: f.fillColor || "none",
                stroke: f.color || J.neutralColor20,
              });
          } else this.graph && (this.graph = this.graph.destroy());
        };
        h.prototype.drawPoints = function () {
          var a = this.chart.renderer;
          this.points.forEach(function (c) {
            c.graphic &&
              c.hasNewShapeType() &&
              (c.graphic = c.graphic.destroy());
            c.graphic ||
              ((c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group)),
              (c.delayedRendering = !0));
          });
        };
        h.prototype.generatePoints = function () {
          d.prototype.generatePoints.call(this);
          this.updateTotals();
        };
        h.prototype.getX = function (c, k, f) {
          var d = this.center,
            b = this.radii ? this.radii[f.index] || 0 : d[2] / 2;
          c = Math.asin(a((c - d[1]) / (b + f.labelDistance), -1, 1));
          return (
            d[0] +
            (k ? -1 : 1) * Math.cos(c) * (b + f.labelDistance) +
            (0 < f.labelDistance
              ? (k ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        };
        h.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        h.prototype.redrawPoints = function () {
          var a = this,
            c = a.chart,
            f = c.renderer,
            k,
            b,
            d,
            h,
            m = a.options.shadow;
          this.drawEmpty();
          !m ||
            a.shadowGroup ||
            c.styledMode ||
            (a.shadowGroup = f
              .g("shadow")
              .attr({
                zIndex: -1,
              })
              .add(a.group));
          a.points.forEach(function (g) {
            var n = {};
            b = g.graphic;
            if (!g.isNull && b) {
              var e = void 0;
              h = g.shapeArgs;
              k = g.getTranslate();
              c.styledMode ||
                ((e = g.shadowGroup),
                m &&
                  !e &&
                  (e = g.shadowGroup = f.g("shadow").add(a.shadowGroup)),
                e && e.attr(k),
                (d = a.pointAttribs(g, g.selected && "select")));
              g.delayedRendering
                ? (b.setRadialReference(a.center).attr(h).attr(k),
                  c.styledMode ||
                    b
                      .attr(d)
                      .attr({
                        "stroke-linejoin": "round",
                      })
                      .shadow(m, e),
                  (g.delayedRendering = !1))
                : (b.setRadialReference(a.center),
                  c.styledMode || p(!0, n, d),
                  p(!0, n, h, k),
                  b.animate(n));
              b.attr({
                visibility: g.visible ? "inherit" : "hidden",
              });
              b.addClass(g.getClassName(), !0);
            } else b && (g.graphic = b.destroy());
          });
        };
        h.prototype.sortByAngle = function (a, c) {
          a.sort(function (a, k) {
            return "undefined" !== typeof a.angle && (k.angle - a.angle) * c;
          });
        };
        h.prototype.translate = function (a) {
          this.generatePoints();
          var d = 0,
            f = this.options,
            h = f.slicedOffset,
            b = h + (f.borderWidth || 0),
            m = c(f.startAngle, f.endAngle),
            p = (this.startAngleRad = m.start);
          m = (this.endAngleRad = m.end) - p;
          var A = this.points,
            g = f.dataLabels.distance;
          f = f.ignoreHiddenPoint;
          var n,
            e = A.length;
          a || (this.center = a = this.getCenter());
          for (n = 0; n < e; n++) {
            var l = A[n];
            var C = p + d * m;
            !l.isValid() || (f && !l.visible) || (d += l.percentage / 100);
            var x = p + d * m;
            var w = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * C) / 1e3,
              end: Math.round(1e3 * x) / 1e3,
            };
            l.shapeType = "arc";
            l.shapeArgs = w;
            l.labelDistance = O(
              l.options.dataLabels && l.options.dataLabels.distance,
              g
            );
            l.labelDistance = k(l.labelDistance, w.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              l.labelDistance
            );
            x = (x + C) / 2;
            x > 1.5 * Math.PI
              ? (x -= 2 * Math.PI)
              : x < -Math.PI / 2 && (x += 2 * Math.PI);
            l.slicedTranslation = {
              translateX: Math.round(Math.cos(x) * h),
              translateY: Math.round(Math.sin(x) * h),
            };
            w = (Math.cos(x) * a[2]) / 2;
            var q = (Math.sin(x) * a[2]) / 2;
            l.tooltipPos = [a[0] + 0.7 * w, a[1] + 0.7 * q];
            l.half = x < -Math.PI / 2 || x > Math.PI / 2 ? 1 : 0;
            l.angle = x;
            C = Math.min(b, l.labelDistance / 5);
            l.labelPosition = {
              natural: {
                x: a[0] + w + Math.cos(x) * l.labelDistance,
                y: a[1] + q + Math.sin(x) * l.labelDistance,
              },
              final: {},
              alignment:
                0 > l.labelDistance ? "center" : l.half ? "right" : "left",
              connectorPosition: {
                breakAt: {
                  x: a[0] + w + Math.cos(x) * C,
                  y: a[1] + q + Math.sin(x) * C,
                },
                touchingSliceAt: {
                  x: a[0] + w,
                  y: a[1] + q,
                },
              },
            };
          }
          y(this, "afterTranslate");
        };
        h.prototype.updateTotals = function () {
          var a,
            c = 0,
            f = this.points,
            k = f.length,
            b = this.options.ignoreHiddenPoint;
          for (a = 0; a < k; a++) {
            var d = f[a];
            !d.isValid() || (b && !d.visible) || (c += d.y);
          }
          this.total = c;
          for (a = 0; a < k; a++)
            (d = f[a]),
              (d.percentage = 0 < c && (d.visible || !b) ? (d.y / c) * 100 : 0),
              (d.total = c);
        };
        h.defaultOptions = p(G.defaultOptions, {
          center: [null, null],
          clip: !1,
          colorByPoint: !0,
          dataLabels: {
            allowOverlap: !0,
            connectorPadding: 5,
            connectorShape: "fixedOffset",
            crookDistance: "70%",
            distance: 30,
            enabled: !0,
            formatter: function () {
              return this.point.isNull ? void 0 : this.point.name;
            },
            softConnector: !0,
            x: 0,
          },
          fillColor: void 0,
          ignoreHiddenPoint: !0,
          inactiveOtherPoints: !0,
          legendType: "point",
          marker: null,
          size: null,
          showInLegend: !1,
          slicedOffset: 10,
          stickyTracking: !1,
          tooltip: {
            followPointer: !0,
          },
          borderColor: J.backgroundColor,
          borderWidth: 1,
          lineWidth: void 0,
          states: {
            hover: {
              brightness: 0.1,
            },
          },
        });
        return h;
      })(G);
      r(B.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: F.drawRectangle,
        drawTracker: h.prototype.drawTracker,
        getCenter: d.getCenter,
        getSymbol: K,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: h.prototype.pointAttribs,
        pointClass: M,
        requireSorting: !1,
        searchPoint: K,
        trackerGroups: ["group", "dataLabelsGroup"],
      });
      I.registerSeriesType("pie", B);
      ("");
      return B;
    }
  );
  Q(
    d,
    "Core/Series/DataLabels.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Series/Series.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G) {
      var I = d.getDeferredAnimation,
        D = h.format;
      d = K.noop;
      M = M.seriesTypes;
      var B = G.arrayMax,
        u = G.clamp,
        c = G.defined,
        a = G.extend,
        r = G.fireEvent,
        y = G.isArray,
        p = G.merge,
        O = G.objectEach,
        k = G.pick,
        m = G.relativeLength,
        L = G.splat,
        A = G.stableSort;
      ("");
      K.distribute = function (a, c, d) {
        function b(b, a) {
          return b.target - a.target;
        }
        var f,
          h = !0,
          m = a,
          g = [];
        var n = 0;
        var e = m.reducedLen || c;
        for (f = a.length; f--; ) n += a[f].size;
        if (n > e) {
          A(a, function (b, a) {
            return (a.rank || 0) - (b.rank || 0);
          });
          for (n = f = 0; n <= e; ) (n += a[f].size), f++;
          g = a.splice(f - 1, a.length);
        }
        A(a, b);
        for (
          a = a.map(function (b) {
            return {
              size: b.size,
              targets: [b.target],
              align: k(b.align, 0.5),
            };
          });
          h;

        ) {
          for (f = a.length; f--; )
            (h = a[f]),
              (n =
                (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) /
                2),
              (h.pos = u(n - h.size * h.align, 0, c - h.size));
          f = a.length;
          for (h = !1; f--; )
            0 < f &&
              a[f - 1].pos + a[f - 1].size > a[f].pos &&
              ((a[f - 1].size += a[f].size),
              (a[f - 1].targets = a[f - 1].targets.concat(a[f].targets)),
              (a[f - 1].align = 0.5),
              a[f - 1].pos + a[f - 1].size > c &&
                (a[f - 1].pos = c - a[f - 1].size),
              a.splice(f, 1),
              (h = !0));
        }
        m.push.apply(m, g);
        f = 0;
        a.some(function (b) {
          var a = 0;
          if (
            b.targets.some(function () {
              m[f].pos = b.pos + a;
              if (
                "undefined" !== typeof d &&
                Math.abs(m[f].pos - m[f].target) > d
              )
                return (
                  m.slice(0, f + 1).forEach(function (b) {
                    delete b.pos;
                  }),
                  (m.reducedLen = (m.reducedLen || c) - 0.1 * c),
                  m.reducedLen > 0.1 * c && K.distribute(m, c, d),
                  !0
                );
              a += m[f].size;
              f++;
            })
          )
            return !0;
        });
        A(m, b);
      };
      J.prototype.drawDataLabels = function () {
        function a(b, a) {
          var c = a.filter;
          return c
            ? ((a = c.operator),
              (b = b[c.property]),
              (c = c.value),
              (">" === a && b > c) ||
              ("<" === a && b < c) ||
              (">=" === a && b >= c) ||
              ("<=" === a && b <= c) ||
              ("==" === a && b == c) ||
              ("===" === a && b === c)
                ? !0
                : !1)
            : !0;
        }
        function f(b, a) {
          var c = [],
            e;
          if (y(b) && !y(a))
            c = b.map(function (b) {
              return p(b, a);
            });
          else if (y(a) && !y(b))
            c = a.map(function (a) {
              return p(b, a);
            });
          else if (y(b) || y(a))
            for (e = Math.max(b.length, a.length); e--; ) c[e] = p(b[e], a[e]);
          else c = p(b, a);
          return c;
        }
        var d = this,
          b = d.chart,
          h = d.options,
          m = h.dataLabels,
          A = d.points,
          g,
          n = d.hasRendered || 0,
          e = m.animation;
        e = m.defer
          ? I(b, e, d)
          : {
              defer: 0,
              duration: 0,
            };
        var l = b.renderer;
        m = f(
          f(
            b.options.plotOptions &&
              b.options.plotOptions.series &&
              b.options.plotOptions.series.dataLabels,
            b.options.plotOptions &&
              b.options.plotOptions[d.type] &&
              b.options.plotOptions[d.type].dataLabels
          ),
          m
        );
        r(this, "drawDataLabels");
        if (y(m) || m.enabled || d._hasPointLabels) {
          var C = d.plotGroup(
            "dataLabelsGroup",
            "data-labels",
            n ? "inherit" : "hidden",
            m.zIndex || 6
          );
          C.attr({
            opacity: +n,
          });
          !n &&
            (n = d.dataLabelsGroup) &&
            (d.visible && C.show(!0),
            n[h.animation ? "animate" : "attr"](
              {
                opacity: 1,
              },
              e
            ));
          A.forEach(function (e) {
            g = L(f(m, e.dlOptions || (e.options && e.options.dataLabels)));
            g.forEach(function (g, f) {
              var n = g.enabled && (!e.isNull || e.dataLabelOnNull) && a(e, g),
                q = e.dataLabels ? e.dataLabels[f] : e.dataLabel,
                m = e.connectors ? e.connectors[f] : e.connector,
                x = k(g.distance, e.labelDistance),
                p = !q;
              if (n) {
                var w = e.getLabelConfig();
                var t = k(g[e.formatPrefix + "Format"], g.format);
                w = c(t)
                  ? D(t, w, b)
                  : (g[e.formatPrefix + "Formatter"] || g.formatter).call(w, g);
                t = g.style;
                var v = g.rotation;
                b.styledMode ||
                  ((t.color = k(g.color, t.color, d.color, F.neutralColor100)),
                  "contrast" === t.color
                    ? ((e.contrastColor = l.getContrast(e.color || d.color)),
                      (t.color =
                        (!c(x) && g.inside) || 0 > x || h.stacking
                          ? e.contrastColor
                          : F.neutralColor100))
                    : delete e.contrastColor,
                  h.cursor && (t.cursor = h.cursor));
                var A = {
                  r: g.borderRadius || 0,
                  rotation: v,
                  padding: g.padding,
                  zIndex: 1,
                };
                b.styledMode ||
                  ((A.fill = g.backgroundColor),
                  (A.stroke = g.borderColor),
                  (A["stroke-width"] = g.borderWidth));
                O(A, function (b, a) {
                  "undefined" === typeof b && delete A[a];
                });
              }
              !q || (n && c(w))
                ? n &&
                  c(w) &&
                  (q
                    ? (A.text = w)
                    : ((e.dataLabels = e.dataLabels || []),
                      (q = e.dataLabels[f] =
                        v
                          ? l
                              .text(w, 0, -9999, g.useHTML)
                              .addClass("highcharts-data-label")
                          : l.label(
                              w,
                              0,
                              -9999,
                              g.shape,
                              null,
                              null,
                              g.useHTML,
                              null,
                              "data-label"
                            )),
                      f || (e.dataLabel = q),
                      q.addClass(
                        " highcharts-data-label-color-" +
                          e.colorIndex +
                          " " +
                          (g.className || "") +
                          (g.useHTML ? " highcharts-tracker" : "")
                      )),
                  (q.options = g),
                  q.attr(A),
                  b.styledMode || q.css(t).shadow(g.shadow),
                  q.added || q.add(C),
                  g.textPath &&
                    !g.useHTML &&
                    (q.setTextPath(
                      (e.getDataLabelPath && e.getDataLabelPath(q)) ||
                        e.graphic,
                      g.textPath
                    ),
                    e.dataLabelPath &&
                      !g.textPath.enabled &&
                      (e.dataLabelPath = e.dataLabelPath.destroy())),
                  d.alignDataLabel(e, q, g, null, p))
                : ((e.dataLabel = e.dataLabel && e.dataLabel.destroy()),
                  e.dataLabels &&
                    (1 === e.dataLabels.length
                      ? delete e.dataLabels
                      : delete e.dataLabels[f]),
                  f || delete e.dataLabel,
                  m &&
                    ((e.connector = e.connector.destroy()),
                    e.connectors &&
                      (1 === e.connectors.length
                        ? delete e.connectors
                        : delete e.connectors[f])));
            });
          });
        }
        r(this, "afterDrawDataLabels");
      };
      J.prototype.alignDataLabel = function (c, f, d, b, h) {
        var m = this,
          p = this.chart,
          g = this.isCartesian && p.inverted,
          n = this.enabledDataSorting,
          e = k(c.dlBox && c.dlBox.centerX, c.plotX, -9999),
          l = k(c.plotY, -9999),
          C = f.getBBox(),
          x = d.rotation,
          w = d.align,
          q = p.isInsidePlot(e, Math.round(l), {
            inverted: g,
            paneCoordinates: !0,
            series: m,
          }),
          t = "justify" === k(d.overflow, n ? "none" : "justify"),
          v =
            this.visible &&
            !1 !== c.visible &&
            (c.series.forceDL ||
              (n && !t) ||
              q ||
              (k(d.inside, !!this.options.stacking) &&
                b &&
                p.isInsidePlot(e, g ? b.x + 1 : b.y + b.height - 1, {
                  inverted: g,
                  paneCoordinates: !0,
                  series: m,
                })));
        var A = function (b) {
          n && m.xAxis && !t && m.setDataLabelStartPos(c, f, h, q, b);
        };
        if (v) {
          var r = p.renderer.fontMetrics(
            p.styledMode ? void 0 : d.style.fontSize,
            f
          ).b;
          b = a(
            {
              x: g ? this.yAxis.len - l : e,
              y: Math.round(g ? this.xAxis.len - e : l),
              width: 0,
              height: 0,
            },
            b
          );
          a(d, {
            width: C.width,
            height: C.height,
          });
          x
            ? ((t = !1),
              (e = p.renderer.rotCorr(r, x)),
              (e = {
                x: b.x + (d.x || 0) + b.width / 2 + e.x,
                y:
                  b.y +
                  (d.y || 0) +
                  {
                    top: 0,
                    middle: 0.5,
                    bottom: 1,
                  }[d.verticalAlign] *
                    b.height,
              }),
              A(e),
              f[h ? "attr" : "animate"](e).attr({
                align: w,
              }),
              (A = (x + 720) % 360),
              (A = 180 < A && 360 > A),
              "left" === w
                ? (e.y -= A ? C.height : 0)
                : "center" === w
                ? ((e.x -= C.width / 2), (e.y -= C.height / 2))
                : "right" === w &&
                  ((e.x -= C.width), (e.y -= A ? 0 : C.height)),
              (f.placed = !0),
              (f.alignAttr = e))
            : (A(b), f.align(d, void 0, b), (e = f.alignAttr));
          t && 0 <= b.height
            ? this.justifyDataLabel(f, d, e, C, b, h)
            : k(d.crop, !0) &&
              (v =
                p.isInsidePlot(e.x, e.y, {
                  paneCoordinates: !0,
                  series: m,
                }) &&
                p.isInsidePlot(e.x + C.width, e.y + C.height, {
                  paneCoordinates: !0,
                  series: m,
                }));
          if (d.shape && !x)
            f[h ? "attr" : "animate"]({
              anchorX: g ? p.plotWidth - c.plotY : c.plotX,
              anchorY: g ? p.plotHeight - c.plotX : c.plotY,
            });
        }
        h && n && (f.placed = !1);
        v || (n && !t) || (f.hide(!0), (f.placed = !1));
      };
      J.prototype.setDataLabelStartPos = function (a, c, k, b, d) {
        var f = this.chart,
          h = f.inverted,
          g = this.xAxis,
          n = g.reversed,
          e = h ? c.height / 2 : c.width / 2;
        a = (a = a.pointWidth) ? a / 2 : 0;
        g = h ? d.x : n ? -e - a : g.width - e + a;
        d = h ? (n ? this.yAxis.height - e + a : -e - a) : d.y;
        c.startXPos = g;
        c.startYPos = d;
        b
          ? "hidden" === c.visibility &&
            (c.show(),
            c
              .attr({
                opacity: 0,
              })
              .animate({
                opacity: 1,
              }))
          : c
              .attr({
                opacity: 1,
              })
              .animate(
                {
                  opacity: 0,
                },
                void 0,
                c.hide
              );
        f.hasRendered &&
          (k &&
            c.attr({
              x: c.startXPos,
              y: c.startYPos,
            }),
          (c.placed = !0));
      };
      J.prototype.justifyDataLabel = function (a, c, k, b, d, h) {
        var f = this.chart,
          g = c.align,
          n = c.verticalAlign,
          e = a.box ? 0 : a.padding || 0,
          l = c.x;
        l = void 0 === l ? 0 : l;
        var m = c.y;
        var x = void 0 === m ? 0 : m;
        m = (k.x || 0) + e;
        if (0 > m) {
          "right" === g && 0 <= l
            ? ((c.align = "left"), (c.inside = !0))
            : (l -= m);
          var p = !0;
        }
        m = (k.x || 0) + b.width - e;
        m > f.plotWidth &&
          ("left" === g && 0 >= l
            ? ((c.align = "right"), (c.inside = !0))
            : (l += f.plotWidth - m),
          (p = !0));
        m = k.y + e;
        0 > m &&
          ("bottom" === n && 0 <= x
            ? ((c.verticalAlign = "top"), (c.inside = !0))
            : (x -= m),
          (p = !0));
        m = (k.y || 0) + b.height - e;
        m > f.plotHeight &&
          ("top" === n && 0 >= x
            ? ((c.verticalAlign = "bottom"), (c.inside = !0))
            : (x += f.plotHeight - m),
          (p = !0));
        p && ((c.x = l), (c.y = x), (a.placed = !h), a.align(c, void 0, d));
        return p;
      };
      M.pie &&
        ((M.pie.prototype.dataLabelPositioners = {
          radialDistributionY: function (a) {
            return a.top + a.distributeBox.pos;
          },
          radialDistributionX: function (a, c, k, b) {
            return a.getX(k < c.top + 2 || k > c.bottom - 2 ? b : k, c.half, c);
          },
          justify: function (a, c, k) {
            return k[0] + (a.half ? -1 : 1) * (c + a.labelDistance);
          },
          alignToPlotEdges: function (a, c, k, b) {
            a = a.getBBox().width;
            return c ? a + b : k - a - b;
          },
          alignToConnectors: function (a, c, k, b) {
            var f = 0,
              d;
            a.forEach(function (b) {
              d = b.dataLabel.getBBox().width;
              d > f && (f = d);
            });
            return c ? f + b : k - f - b;
          },
        }),
        (M.pie.prototype.drawDataLabels = function () {
          var a = this,
            f = a.data,
            d,
            b = a.chart,
            h = a.options.dataLabels || {},
            m = h.connectorPadding,
            A,
            g = b.plotWidth,
            n = b.plotHeight,
            e = b.plotLeft,
            l = Math.round(b.chartWidth / 3),
            C,
            x = a.center,
            w = x[2] / 2,
            q = x[1],
            z,
            r,
            y,
            u,
            L = [[], []],
            D,
            G,
            I,
            O,
            N = [0, 0, 0, 0],
            M = a.dataLabelPositioners,
            Q;
          a.visible &&
            (h.enabled || a._hasPointLabels) &&
            (f.forEach(function (b) {
              b.dataLabel &&
                b.visible &&
                b.dataLabel.shortened &&
                (b.dataLabel
                  .attr({
                    width: "auto",
                  })
                  .css({
                    width: "auto",
                    textOverflow: "clip",
                  }),
                (b.dataLabel.shortened = !1));
            }),
            J.prototype.drawDataLabels.apply(a),
            f.forEach(function (b) {
              b.dataLabel &&
                (b.visible
                  ? (L[b.half].push(b),
                    (b.dataLabel._pos = null),
                    !c(h.style.width) &&
                      !c(
                        b.options.dataLabels &&
                          b.options.dataLabels.style &&
                          b.options.dataLabels.style.width
                      ) &&
                      b.dataLabel.getBBox().width > l &&
                      (b.dataLabel.css({
                        width: Math.round(0.7 * l) + "px",
                      }),
                      (b.dataLabel.shortened = !0)))
                  : ((b.dataLabel = b.dataLabel.destroy()),
                    b.dataLabels &&
                      1 === b.dataLabels.length &&
                      delete b.dataLabels));
            }),
            L.forEach(function (f, l) {
              var C = f.length,
                p = [],
                t;
              if (C) {
                a.sortByAngle(f, l - 0.5);
                if (0 < a.maxLabelDistance) {
                  var A = Math.max(0, q - w - a.maxLabelDistance);
                  var v = Math.min(q + w + a.maxLabelDistance, b.plotHeight);
                  f.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, q - w - a.labelDistance)),
                      (a.bottom = Math.min(
                        q + w + a.labelDistance,
                        b.plotHeight
                      )),
                      (t = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + t / 2,
                        size: t,
                        rank: a.y,
                      }),
                      p.push(a.distributeBox));
                  });
                  A = v + t - A;
                  K.distribute(p, A, A / 5);
                }
                for (O = 0; O < C; O++) {
                  d = f[O];
                  y = d.labelPosition;
                  z = d.dataLabel;
                  I = !1 === d.visible ? "hidden" : "inherit";
                  G = A = y.natural.y;
                  p &&
                    c(d.distributeBox) &&
                    ("undefined" === typeof d.distributeBox.pos
                      ? (I = "hidden")
                      : ((u = d.distributeBox.size),
                        (G = M.radialDistributionY(d))));
                  delete d.positionIndex;
                  if (h.justify) D = M.justify(d, w, x);
                  else
                    switch (h.alignTo) {
                      case "connectors":
                        D = M.alignToConnectors(f, l, g, e);
                        break;
                      case "plotEdges":
                        D = M.alignToPlotEdges(z, l, g, e);
                        break;
                      default:
                        D = M.radialDistributionX(a, d, G, A);
                    }
                  z._attr = {
                    visibility: I,
                    align: y.alignment,
                  };
                  Q = d.options.dataLabels || {};
                  z._pos = {
                    x:
                      D +
                      k(Q.x, h.x) +
                      ({
                        left: m,
                        right: -m,
                      }[y.alignment] || 0),
                    y: G + k(Q.y, h.y) - 10,
                  };
                  y.final.x = D;
                  y.final.y = G;
                  k(h.crop, !0) &&
                    ((r = z.getBBox().width),
                    (A = null),
                    D - r < m && 1 === l
                      ? ((A = Math.round(r - D + m)),
                        (N[3] = Math.max(A, N[3])))
                      : D + r > g - m &&
                        0 === l &&
                        ((A = Math.round(D + r - g + m)),
                        (N[1] = Math.max(A, N[1]))),
                    0 > G - u / 2
                      ? (N[0] = Math.max(Math.round(-G + u / 2), N[0]))
                      : G + u / 2 > n &&
                        (N[2] = Math.max(Math.round(G + u / 2 - n), N[2])),
                    (z.sideOverflow = A));
                }
              }
            }),
            0 === B(N) || this.verifyDataLabelOverflow(N)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (c) {
              Q = p(h, c.options.dataLabels);
              if ((A = k(Q.connectorWidth, 1))) {
                var e;
                C = c.connector;
                if (
                  (z = c.dataLabel) &&
                  z._pos &&
                  c.visible &&
                  0 < c.labelDistance
                ) {
                  I = z._attr.visibility;
                  if ((e = !C))
                    (c.connector = C =
                      b.renderer
                        .path()
                        .addClass(
                          "highcharts-data-label-connector  highcharts-color-" +
                            c.colorIndex +
                            (c.className ? " " + c.className : "")
                        )
                        .add(a.dataLabelsGroup)),
                      b.styledMode ||
                        C.attr({
                          "stroke-width": A,
                          stroke:
                            Q.connectorColor || c.color || F.neutralColor60,
                        });
                  C[e ? "attr" : "animate"]({
                    d: c.getConnectorPath(),
                  });
                  C.attr("visibility", I);
                } else C && (c.connector = C.destroy());
              }
            }));
        }),
        (M.pie.prototype.placeDataLabels = function () {
          this.points.forEach(function (a) {
            var c = a.dataLabel,
              k;
            c &&
              a.visible &&
              ((k = c._pos)
                ? (c.sideOverflow &&
                    ((c._attr.width = Math.max(
                      c.getBBox().width - c.sideOverflow,
                      0
                    )),
                    c.css({
                      width: c._attr.width + "px",
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        "ellipsis",
                    }),
                    (c.shortened = !0)),
                  c.attr(c._attr),
                  c[c.moved ? "animate" : "attr"](k),
                  (c.moved = !0))
                : c &&
                  c.attr({
                    y: -9999,
                  }));
            delete a.distributeBox;
          }, this);
        }),
        (M.pie.prototype.alignDataLabel = d),
        (M.pie.prototype.verifyDataLabelOverflow = function (a) {
          var c = this.center,
            k = this.options,
            b = k.center,
            d = k.minSize || 80,
            h = null !== k.size;
          if (!h) {
            if (null !== b[0]) var p = Math.max(c[2] - Math.max(a[1], a[3]), d);
            else
              (p = Math.max(c[2] - a[1] - a[3], d)),
                (c[0] += (a[3] - a[1]) / 2);
            null !== b[1]
              ? (p = u(p, d, c[2] - Math.max(a[0], a[2])))
              : ((p = u(p, d, c[2] - a[0] - a[2])),
                (c[1] += (a[0] - a[2]) / 2));
            p < c[2]
              ? ((c[2] = p),
                (c[3] = Math.min(m(k.innerSize || 0, p), p)),
                this.translate(c),
                this.drawDataLabels && this.drawDataLabels())
              : (h = !0);
          }
          return h;
        }));
      M.column &&
        (M.column.prototype.alignDataLabel = function (a, c, d, b, h) {
          var f = this.chart.inverted,
            m = a.series,
            g = a.dlBox || a.shapeArgs,
            n = k(a.below, a.plotY > k(this.translatedThreshold, m.yAxis.len)),
            e = k(d.inside, !!this.options.stacking);
          g &&
            ((b = p(g)),
            0 > b.y && ((b.height += b.y), (b.y = 0)),
            (g = b.y + b.height - m.yAxis.len),
            0 < g && g < b.height && (b.height -= g),
            f &&
              (b = {
                x: m.yAxis.len - b.y - b.height,
                y: m.xAxis.len - b.x - b.width,
                width: b.height,
                height: b.width,
              }),
            e ||
              (f
                ? ((b.x += n ? 0 : b.width), (b.width = 0))
                : ((b.y += n ? b.height : 0), (b.height = 0))));
          d.align = k(d.align, !f || e ? "center" : n ? "right" : "left");
          d.verticalAlign = k(
            d.verticalAlign,
            f || e ? "middle" : n ? "top" : "bottom"
          );
          J.prototype.alignDataLabel.call(this, a, c, d, b, h);
          d.inside &&
            a.contrastColor &&
            c.css({
              color: a.contrastColor,
            });
        });
    }
  );
  Q(
    d,
    "Extensions/OverlappingDataLabels.js",
    [d["Core/Chart/Chart.js"], d["Core/Utilities.js"]],
    function (d, h) {
      function N(d, h) {
        var c = !1;
        if (d) {
          var a = d.newOpacity;
          d.oldOpacity !== a &&
            (d.alignAttr && d.placed
              ? (d[a ? "removeClass" : "addClass"](
                  "highcharts-data-label-hidden"
                ),
                (c = !0),
                (d.alignAttr.opacity = a),
                d[d.isOld ? "animate" : "attr"](d.alignAttr, null, function () {
                  h.styledMode ||
                    d.css({
                      pointerEvents: a ? "auto" : "none",
                    });
                  d.visibility = a ? "inherit" : "hidden";
                }),
                J(h, "afterHideOverlappingLabel"))
              : d.attr({
                  opacity: a,
                }));
          d.isOld = !0;
        }
        return c;
      }
      var F = h.addEvent,
        J = h.fireEvent,
        M = h.isArray,
        G = h.isNumber,
        I = h.objectEach,
        D = h.pick;
      F(d, "render", function () {
        var d = this,
          h = [];
        (this.labelCollectors || []).forEach(function (c) {
          h = h.concat(c());
        });
        (this.yAxis || []).forEach(function (c) {
          c.stacking &&
            c.options.stackLabels &&
            !c.options.stackLabels.allowOverlap &&
            I(c.stacking.stacks, function (a) {
              I(a, function (a) {
                h.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (c) {
          var a = c.options.dataLabels;
          c.visible &&
            (!1 !== a.enabled || c._hasPointLabels) &&
            ((a = function (a) {
              return a.forEach(function (a) {
                a.visible &&
                  (M(a.dataLabels)
                    ? a.dataLabels
                    : a.dataLabel
                    ? [a.dataLabel]
                    : []
                  ).forEach(function (c) {
                    var p = c.options;
                    c.labelrank = D(
                      p.labelrank,
                      a.labelrank,
                      a.shapeArgs && a.shapeArgs.height
                    );
                    p.allowOverlap
                      ? ((c.oldOpacity = c.opacity),
                        (c.newOpacity = 1),
                        N(c, d))
                      : h.push(c);
                  });
              });
            }),
            a(c.nodes || []),
            a(c.points));
        });
        this.hideOverlappingLabels(h);
      });
      d.prototype.hideOverlappingLabels = function (d) {
        var h = this,
          c = d.length,
          a = h.renderer,
          r,
          y,
          p,
          B = !1;
        var k = function (c) {
          var d,
            f = c.box ? 0 : c.padding || 0,
            k = (d = 0),
            b;
          if (c && (!c.alignAttr || c.placed)) {
            var h = c.alignAttr || {
              x: c.attr("x"),
              y: c.attr("y"),
            };
            var m = c.parentGroup;
            c.width ||
              ((d = c.getBBox()),
              (c.width = d.width),
              (c.height = d.height),
              (d = a.fontMetrics(null, c.element).h));
            var p = c.width - 2 * f;
            (b = {
              left: "0",
              center: "0.5",
              right: "1",
            }[c.alignValue])
              ? (k = +b * p)
              : G(c.x) &&
                Math.round(c.x) !== c.translateX &&
                (k = c.x - c.translateX);
            return {
              x: h.x + (m.translateX || 0) + f - (k || 0),
              y: h.y + (m.translateY || 0) + f - d,
              width: c.width - 2 * f,
              height: c.height - 2 * f,
            };
          }
        };
        for (y = 0; y < c; y++)
          if ((r = d[y]))
            (r.oldOpacity = r.opacity),
              (r.newOpacity = 1),
              (r.absoluteBox = k(r));
        d.sort(function (a, c) {
          return (c.labelrank || 0) - (a.labelrank || 0);
        });
        for (y = 0; y < c; y++) {
          var m = (k = d[y]) && k.absoluteBox;
          for (r = y + 1; r < c; ++r) {
            var L = (p = d[r]) && p.absoluteBox;
            !m ||
              !L ||
              k === p ||
              0 === k.newOpacity ||
              0 === p.newOpacity ||
              L.x >= m.x + m.width ||
              L.x + L.width <= m.x ||
              L.y >= m.y + m.height ||
              L.y + L.height <= m.y ||
              ((k.labelrank < p.labelrank ? k : p).newOpacity = 0);
          }
        }
        d.forEach(function (a) {
          N(a, h) && (B = !0);
        });
        B && J(h, "afterHideAllOverlappingLabels");
      };
    }
  );
  Q(
    d,
    "Core/Responsive.js",
    [d["Core/Chart/Chart.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var N = h.find,
        F = h.isArray,
        J = h.isObject,
        M = h.merge,
        G = h.objectEach,
        I = h.pick,
        D = h.splat,
        B = h.uniqueKey;
      d.prototype.setResponsive = function (d, c) {
        var a = this.options.responsive,
          h = [],
          y = this.currentResponsive;
        !c &&
          a &&
          a.rules &&
          a.rules.forEach(function (a) {
            "undefined" === typeof a._id && (a._id = B());
            this.matchResponsiveRule(a, h);
          }, this);
        c = M.apply(
          0,
          h.map(function (c) {
            return N(a.rules, function (a) {
              return a._id === c;
            }).chartOptions;
          })
        );
        c.isResponsiveOptions = !0;
        h = h.toString() || void 0;
        h !== (y && y.ruleIds) &&
          (y && this.update(y.undoOptions, d, !0),
          h
            ? ((y = this.currentOptions(c)),
              (y.isResponsiveOptions = !0),
              (this.currentResponsive = {
                ruleIds: h,
                mergedOptions: c,
                undoOptions: y,
              }),
              this.update(c, d, !0))
            : (this.currentResponsive = void 0));
      };
      d.prototype.matchResponsiveRule = function (d, c) {
        var a = d.condition;
        (
          a.callback ||
          function () {
            return (
              this.chartWidth <= I(a.maxWidth, Number.MAX_VALUE) &&
              this.chartHeight <= I(a.maxHeight, Number.MAX_VALUE) &&
              this.chartWidth >= I(a.minWidth, 0) &&
              this.chartHeight >= I(a.minHeight, 0)
            );
          }
        ).call(this) && c.push(d._id);
      };
      d.prototype.currentOptions = function (d) {
        function c(d, h, r, k) {
          var m;
          G(d, function (d, p) {
            if (!k && -1 < a.collectionsWithUpdate.indexOf(p) && h[p])
              for (
                d = D(d), r[p] = [], m = 0;
                m < Math.max(d.length, h[p].length);
                m++
              )
                h[p][m] &&
                  (void 0 === d[m]
                    ? (r[p][m] = h[p][m])
                    : ((r[p][m] = {}), c(d[m], h[p][m], r[p][m], k + 1)));
            else
              J(d)
                ? ((r[p] = F(d) ? [] : {}), c(d, h[p] || {}, r[p], k + 1))
                : (r[p] = "undefined" === typeof h[p] ? null : h[p]);
          });
        }
        var a = this,
          h = {};
        c(d, this.options, h, 0);
        return h;
      };
    }
  );
  Q(
    d,
    "masters/highcharts.src.js",
    [
      d["Core/Globals.js"],
      d["Core/Utilities.js"],
      d["Core/Options.js"],
      d["Core/Animation/Fx.js"],
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Renderer/HTML/AST.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Series/Series.js"],
    ],
    function (d, h, K, F, J, M, G, I, D) {
      d.animate = J.animate;
      d.animObject = J.animObject;
      d.getDeferredAnimation = J.getDeferredAnimation;
      d.setAnimation = J.setAnimation;
      d.stop = J.stop;
      d.timers = F.timers;
      d.AST = M;
      d.Fx = F;
      d.Series = D;
      d.SVGElement = I;
      d.dateFormat = G.dateFormat;
      d.format = G.format;
      d.numberFormat = G.numberFormat;
      d.defaultOptions = K.defaultOptions;
      d.getOptions = K.getOptions;
      d.time = K.defaultTime;
      d.setOptions = K.setOptions;
      d.addEvent = h.addEvent;
      d.arrayMax = h.arrayMax;
      d.arrayMin = h.arrayMin;
      d.attr = h.attr;
      d.clearTimeout = h.clearTimeout;
      d.correctFloat = h.correctFloat;
      d.createElement = h.createElement;
      d.css = h.css;
      d.defined = h.defined;
      d.destroyObjectProperties = h.destroyObjectProperties;
      d.discardElement = h.discardElement;
      d.erase = h.erase;
      d.error = h.error;
      d.extend = h.extend;
      d.extendClass = h.extendClass;
      d.find = h.find;
      d.fireEvent = h.fireEvent;
      d.getMagnitude = h.getMagnitude;
      d.getStyle = h.getStyle;
      d.inArray = h.inArray;
      d.isArray = h.isArray;
      d.isClass = h.isClass;
      d.isDOMElement = h.isDOMElement;
      d.isFunction = h.isFunction;
      d.isNumber = h.isNumber;
      d.isObject = h.isObject;
      d.isString = h.isString;
      d.keys = h.keys;
      d.merge = h.merge;
      d.normalizeTickInterval = h.normalizeTickInterval;
      d.objectEach = h.objectEach;
      d.offset = h.offset;
      d.pad = h.pad;
      d.pick = h.pick;
      d.pInt = h.pInt;
      d.relativeLength = h.relativeLength;
      d.removeEvent = h.removeEvent;
      d.splat = h.splat;
      d.stableSort = h.stableSort;
      d.syncTimeout = h.syncTimeout;
      d.timeUnits = h.timeUnits;
      d.uniqueKey = h.uniqueKey;
      d.useSerialIds = h.useSerialIds;
      d.wrap = h.wrap;
      return d;
    }
  );
  Q(
    d,
    "Core/Axis/NavigatorAxis.js",
    [d["Core/Globals.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var K = d.isTouchDevice,
        F = h.addEvent,
        J = h.correctFloat,
        M = h.defined,
        G = h.isNumber,
        I = h.pick,
        D = (function () {
          function d(d) {
            this.axis = d;
          }
          d.prototype.destroy = function () {
            this.axis = void 0;
          };
          d.prototype.toFixedRange = function (d, c, a, h) {
            var r = this.axis,
              p = r.chart;
            p = p && p.fixedRange;
            var u = (r.pointRange || 0) / 2;
            d = I(a, r.translate(d, !0, !r.horiz));
            c = I(h, r.translate(c, !0, !r.horiz));
            r = p && (c - d) / p;
            M(a) || (d = J(d + u));
            M(h) || (c = J(c - u));
            0.7 < r && 1.3 > r && (h ? (d = c - p) : (c = d + p));
            (G(d) && G(c)) || (d = c = void 0);
            return {
              min: d,
              max: c,
            };
          };
          return d;
        })();
      return (function () {
        function d() {}
        d.compose = function (d) {
          d.keepProps.push("navigatorAxis");
          F(d, "init", function () {
            this.navigatorAxis || (this.navigatorAxis = new D(this));
          });
          F(d, "zoom", function (c) {
            var a = this.chart.options,
              d = a.navigator,
              h = this.navigatorAxis,
              p = a.chart.pinchType,
              u = a.rangeSelector;
            a = a.chart.zoomType;
            this.isXAxis &&
              ((d && d.enabled) || (u && u.enabled)) &&
              ("y" === a
                ? (c.zoomed = !1)
                : ((!K && "xy" === a) || (K && "xy" === p)) &&
                  this.options.range &&
                  ((d = h.previousZoom),
                  M(c.newMin)
                    ? (h.previousZoom = [this.min, this.max])
                    : d &&
                      ((c.newMin = d[0]),
                      (c.newMax = d[1]),
                      (h.previousZoom = void 0))));
            "undefined" !== typeof c.zoomed && c.preventDefault();
          });
        };
        d.AdditionsClass = D;
        return d;
      })();
    }
  );
  Q(d, "Core/Axis/ScrollbarAxis.js", [d["Core/Utilities.js"]], function (d) {
    var h = d.addEvent,
      K = d.defined,
      F = d.pick;
    return (function () {
      function d() {}
      d.compose = function (d, G) {
        var I = function (d) {
          var h = F(d.options && d.options.min, d.min),
            u = F(d.options && d.options.max, d.max);
          return {
            axisMin: h,
            axisMax: u,
            scrollMin: K(d.dataMin)
              ? Math.min(h, d.min, d.dataMin, F(d.threshold, Infinity))
              : h,
            scrollMax: K(d.dataMax)
              ? Math.max(u, d.max, d.dataMax, F(d.threshold, -Infinity))
              : u,
          };
        };
        h(d, "afterInit", function () {
          var d = this;
          d.options &&
            d.options.scrollbar &&
            d.options.scrollbar.enabled &&
            ((d.options.scrollbar.vertical = !d.horiz),
            (d.options.startOnTick = d.options.endOnTick = !1),
            (d.scrollbar = new G(
              d.chart.renderer,
              d.options.scrollbar,
              d.chart
            )),
            h(d.scrollbar, "changed", function (h) {
              var u = I(d),
                c = u.axisMax,
                a = u.scrollMin,
                r = u.scrollMax - a;
              K(u.axisMin) &&
                K(c) &&
                ((d.horiz && !d.reversed) || (!d.horiz && d.reversed)
                  ? ((u = a + r * this.to), (a += r * this.from))
                  : ((u = a + r * (1 - this.from)), (a += r * (1 - this.to))),
                this.shouldUpdateExtremes(h.DOMType)
                  ? d.setExtremes(
                      a,
                      u,
                      !0,
                      "mousemove" !== h.DOMType && "touchmove" !== h.DOMType,
                      h
                    )
                  : this.setRange(this.from, this.to));
            }));
        });
        h(d, "afterRender", function () {
          var d = I(this),
            h = d.scrollMin,
            u = d.scrollMax;
          d = this.scrollbar;
          var c = this.axisTitleMargin + (this.titleOffset || 0),
            a = this.chart.scrollbarsOffsets,
            r = this.options.margin || 0;
          d &&
            (this.horiz
              ? (this.opposite || (a[1] += c),
                d.position(
                  this.left,
                  this.top + this.height + 2 + a[1] - (this.opposite ? r : 0),
                  this.width,
                  this.height
                ),
                this.opposite || (a[1] += r),
                (c = 1))
              : (this.opposite && (a[0] += c),
                d.position(
                  this.left + this.width + 2 + a[0] - (this.opposite ? 0 : r),
                  this.top,
                  this.width,
                  this.height
                ),
                this.opposite && (a[0] += r),
                (c = 0)),
            (a[c] += d.size + d.options.margin),
            isNaN(h) ||
            isNaN(u) ||
            !K(this.min) ||
            !K(this.max) ||
            this.min === this.max
              ? d.setRange(0, 1)
              : ((a = (this.min - h) / (u - h)),
                (h = (this.max - h) / (u - h)),
                (this.horiz && !this.reversed) || (!this.horiz && this.reversed)
                  ? d.setRange(a, h)
                  : d.setRange(1 - h, 1 - a)));
        });
        h(d, "afterGetOffset", function () {
          var d = this.horiz ? 2 : 1,
            h = this.scrollbar;
          h &&
            ((this.chart.scrollbarsOffsets = [0, 0]),
            (this.chart.axisOffset[d] += h.size + h.options.margin));
        });
      };
      return d;
    })();
  });
  Q(
    d,
    "Core/Scrollbar.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Globals.js"],
      d["Core/Color/Palette.js"],
      d["Core/Axis/ScrollbarAxis.js"],
      d["Core/Utilities.js"],
      d["Core/Options.js"],
    ],
    function (d, h, K, F, J, M) {
      var G = J.addEvent,
        I = J.correctFloat,
        D = J.defined,
        B = J.destroyObjectProperties,
        u = J.fireEvent,
        c = J.merge,
        a = J.pick,
        r = J.removeEvent;
      J = M.defaultOptions;
      var y = h.isTouchDevice,
        p = (h.swapXY = function (a, c) {
          c &&
            a.forEach(function (a) {
              for (var c = a.length, d, k = 0; k < c; k += 2)
                (d = a[k + 1]),
                  "number" === typeof d &&
                    ((a[k + 1] = a[k + 2]), (a[k + 2] = d));
            });
          return a;
        });
      M = (function () {
        function d(a, c, d) {
          this._events = [];
          this.from = this.chartY = this.chartX = 0;
          this.scrollbar = this.group = void 0;
          this.scrollbarButtons = [];
          this.scrollbarGroup = void 0;
          this.scrollbarLeft = 0;
          this.scrollbarRifles = void 0;
          this.scrollbarStrokeWidth = 1;
          this.to = this.size = this.scrollbarTop = 0;
          this.track = void 0;
          this.trackBorderWidth = 1;
          this.userOptions = {};
          this.y = this.x = 0;
          this.chart = d;
          this.options = c;
          this.renderer = d.renderer;
          this.init(a, c, d);
        }
        d.prototype.addEvents = function () {
          var a = this.options.inverted ? [1, 0] : [0, 1],
            c = this.scrollbarButtons,
            d = this.scrollbarGroup.element,
            p = this.track.element,
            t = this.mouseDownHandler.bind(this),
            f = this.mouseMoveHandler.bind(this),
            r = this.mouseUpHandler.bind(this);
          a = [
            [c[a[0]].element, "click", this.buttonToMinClick.bind(this)],
            [c[a[1]].element, "click", this.buttonToMaxClick.bind(this)],
            [p, "click", this.trackClick.bind(this)],
            [d, "mousedown", t],
            [d.ownerDocument, "mousemove", f],
            [d.ownerDocument, "mouseup", r],
          ];
          h.hasTouch &&
            a.push(
              [d, "touchstart", t],
              [d.ownerDocument, "touchmove", f],
              [d.ownerDocument, "touchend", r]
            );
          a.forEach(function (b) {
            G.apply(null, b);
          });
          this._events = a;
        };
        d.prototype.buttonToMaxClick = function (c) {
          var d = (this.to - this.from) * a(this.options.step, 0.2);
          this.updatePosition(this.from + d, this.to + d);
          u(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: c,
          });
        };
        d.prototype.buttonToMinClick = function (c) {
          var d = I(this.to - this.from) * a(this.options.step, 0.2);
          this.updatePosition(I(this.from - d), I(this.to - d));
          u(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: c,
          });
        };
        d.prototype.cursorToScrollbarPosition = function (a) {
          var c = this.options;
          c = c.minWidth > this.calculatedWidth ? c.minWidth : 0;
          return {
            chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - c),
            chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c),
          };
        };
        d.prototype.destroy = function () {
          var a = this.chart.scroller;
          this.removeEvents();
          [
            "track",
            "scrollbarRifles",
            "scrollbar",
            "scrollbarGroup",
            "group",
          ].forEach(function (a) {
            this[a] && this[a].destroy && (this[a] = this[a].destroy());
          }, this);
          a &&
            this === a.scrollbar &&
            ((a.scrollbar = null), B(a.scrollbarButtons));
        };
        d.prototype.drawScrollbarButton = function (a) {
          var c = this.renderer,
            d = this.scrollbarButtons,
            k = this.options,
            h = this.size;
          var f = c.g().add(this.group);
          d.push(f);
          f = c.rect().addClass("highcharts-scrollbar-button").add(f);
          this.chart.styledMode ||
            f.attr({
              stroke: k.buttonBorderColor,
              "stroke-width": k.buttonBorderWidth,
              fill: k.buttonBackgroundColor,
            });
          f.attr(
            f.crisp(
              {
                x: -0.5,
                y: -0.5,
                width: h + 1,
                height: h + 1,
                r: k.buttonBorderRadius,
              },
              f.strokeWidth()
            )
          );
          f = c
            .path(
              p(
                [
                  ["M", h / 2 + (a ? -1 : 1), h / 2 - 3],
                  ["L", h / 2 + (a ? -1 : 1), h / 2 + 3],
                  ["L", h / 2 + (a ? 2 : -2), h / 2],
                ],
                k.vertical
              )
            )
            .addClass("highcharts-scrollbar-arrow")
            .add(d[a]);
          this.chart.styledMode ||
            f.attr({
              fill: k.buttonArrowColor,
            });
        };
        d.prototype.init = function (k, h, p) {
          this.scrollbarButtons = [];
          this.renderer = k;
          this.userOptions = h;
          this.options = c(d.defaultOptions, h);
          this.chart = p;
          this.size = a(this.options.size, this.options.height);
          h.enabled && (this.render(), this.addEvents());
        };
        d.prototype.mouseDownHandler = function (a) {
          a = this.chart.pointer.normalize(a);
          a = this.cursorToScrollbarPosition(a);
          this.chartX = a.chartX;
          this.chartY = a.chartY;
          this.initPositions = [this.from, this.to];
          this.grabbedCenter = !0;
        };
        d.prototype.mouseMoveHandler = function (a) {
          var c = this.chart.pointer.normalize(a),
            d = this.options.vertical ? "chartY" : "chartX",
            k = this.initPositions || [];
          !this.grabbedCenter ||
            (a.touches && 0 === a.touches[0][d]) ||
            ((c = this.cursorToScrollbarPosition(c)[d]),
            (d = this[d]),
            (d = c - d),
            (this.hasDragged = !0),
            this.updatePosition(k[0] + d, k[1] + d),
            this.hasDragged &&
              u(this, "changed", {
                from: this.from,
                to: this.to,
                trigger: "scrollbar",
                DOMType: a.type,
                DOMEvent: a,
              }));
        };
        d.prototype.mouseUpHandler = function (a) {
          this.hasDragged &&
            u(this, "changed", {
              from: this.from,
              to: this.to,
              trigger: "scrollbar",
              DOMType: a.type,
              DOMEvent: a,
            });
          this.grabbedCenter =
            this.hasDragged =
            this.chartX =
            this.chartY =
              null;
        };
        d.prototype.position = function (a, c, d, h) {
          var k = this.options.vertical,
            f = 0,
            m = this.rendered ? "animate" : "attr";
          this.x = a;
          this.y = c + this.trackBorderWidth;
          this.width = d;
          this.xOffset = this.height = h;
          this.yOffset = f;
          k
            ? ((this.width = this.yOffset = d = f = this.size),
              (this.xOffset = c = 0),
              (this.barWidth = h - 2 * d),
              (this.x = a += this.options.margin))
            : ((this.height = this.xOffset = h = c = this.size),
              (this.barWidth = d - 2 * h),
              (this.y += this.options.margin));
          this.group[m]({
            translateX: a,
            translateY: this.y,
          });
          this.track[m]({
            width: d,
            height: h,
          });
          this.scrollbarButtons[1][m]({
            translateX: k ? 0 : d - c,
            translateY: k ? h - f : 0,
          });
        };
        d.prototype.removeEvents = function () {
          this._events.forEach(function (a) {
            r.apply(null, a);
          });
          this._events.length = 0;
        };
        d.prototype.render = function () {
          var a = this.renderer,
            c = this.options,
            d = this.size,
            h = this.chart.styledMode,
            t;
          this.group = t = a
            .g("scrollbar")
            .attr({
              zIndex: c.zIndex,
              translateY: -99999,
            })
            .add();
          this.track = a
            .rect()
            .addClass("highcharts-scrollbar-track")
            .attr({
              x: 0,
              r: c.trackBorderRadius || 0,
              height: d,
              width: d,
            })
            .add(t);
          h ||
            this.track.attr({
              fill: c.trackBackgroundColor,
              stroke: c.trackBorderColor,
              "stroke-width": c.trackBorderWidth,
            });
          this.trackBorderWidth = this.track.strokeWidth();
          this.track.attr({
            y: (-this.trackBorderWidth % 2) / 2,
          });
          this.scrollbarGroup = a.g().add(t);
          this.scrollbar = a
            .rect()
            .addClass("highcharts-scrollbar-thumb")
            .attr({
              height: d,
              width: d,
              r: c.barBorderRadius || 0,
            })
            .add(this.scrollbarGroup);
          this.scrollbarRifles = a
            .path(
              p(
                [
                  ["M", -3, d / 4],
                  ["L", -3, (2 * d) / 3],
                  ["M", 0, d / 4],
                  ["L", 0, (2 * d) / 3],
                  ["M", 3, d / 4],
                  ["L", 3, (2 * d) / 3],
                ],
                c.vertical
              )
            )
            .addClass("highcharts-scrollbar-rifles")
            .add(this.scrollbarGroup);
          h ||
            (this.scrollbar.attr({
              fill: c.barBackgroundColor,
              stroke: c.barBorderColor,
              "stroke-width": c.barBorderWidth,
            }),
            this.scrollbarRifles.attr({
              stroke: c.rifleColor,
              "stroke-width": 1,
            }));
          this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
          this.scrollbarGroup.translate(
            (-this.scrollbarStrokeWidth % 2) / 2,
            (-this.scrollbarStrokeWidth % 2) / 2
          );
          this.drawScrollbarButton(0);
          this.drawScrollbarButton(1);
        };
        d.prototype.setRange = function (a, c) {
          var d = this.options,
            k = d.vertical,
            h = d.minWidth,
            f = this.barWidth,
            m,
            b =
              !this.rendered ||
              this.hasDragged ||
              (this.chart.navigator && this.chart.navigator.hasDragged)
                ? "attr"
                : "animate";
          if (D(f)) {
            a = Math.max(a, 0);
            var p = Math.ceil(f * a);
            this.calculatedWidth = m = I(f * Math.min(c, 1) - p);
            m < h && ((p = (f - h + m) * a), (m = h));
            h = Math.floor(p + this.xOffset + this.yOffset);
            f = m / 2 - 0.5;
            this.from = a;
            this.to = c;
            k
              ? (this.scrollbarGroup[b]({
                  translateY: h,
                }),
                this.scrollbar[b]({
                  height: m,
                }),
                this.scrollbarRifles[b]({
                  translateY: f,
                }),
                (this.scrollbarTop = h),
                (this.scrollbarLeft = 0))
              : (this.scrollbarGroup[b]({
                  translateX: h,
                }),
                this.scrollbar[b]({
                  width: m,
                }),
                this.scrollbarRifles[b]({
                  translateX: f,
                }),
                (this.scrollbarLeft = h),
                (this.scrollbarTop = 0));
            12 >= m
              ? this.scrollbarRifles.hide()
              : this.scrollbarRifles.show(!0);
            !1 === d.showFull &&
              (0 >= a && 1 <= c ? this.group.hide() : this.group.show());
            this.rendered = !0;
          }
        };
        d.prototype.shouldUpdateExtremes = function (c) {
          return (
            a(
              this.options.liveRedraw,
              h.svg && !h.isTouchDevice && !this.chart.isBoosting
            ) ||
            "mouseup" === c ||
            "touchend" === c ||
            !D(c)
          );
        };
        d.prototype.trackClick = function (a) {
          var c = this.chart.pointer.normalize(a),
            d = this.to - this.from,
            k = this.y + this.scrollbarTop,
            h = this.x + this.scrollbarLeft;
          (this.options.vertical && c.chartY > k) ||
          (!this.options.vertical && c.chartX > h)
            ? this.updatePosition(this.from + d, this.to + d)
            : this.updatePosition(this.from - d, this.to - d);
          u(this, "changed", {
            from: this.from,
            to: this.to,
            trigger: "scrollbar",
            DOMEvent: a,
          });
        };
        d.prototype.update = function (a) {
          this.destroy();
          this.init(this.chart.renderer, c(!0, this.options, a), this.chart);
        };
        d.prototype.updatePosition = function (a, c) {
          1 < c && ((a = I(1 - I(c - a))), (c = 1));
          0 > a && ((c = I(c - a)), (a = 0));
          this.from = a;
          this.to = c;
        };
        d.defaultOptions = {
          height: y ? 20 : 14,
          barBorderRadius: 0,
          buttonBorderRadius: 0,
          liveRedraw: void 0,
          margin: 10,
          minWidth: 6,
          step: 0.2,
          zIndex: 3,
          barBackgroundColor: K.neutralColor20,
          barBorderWidth: 1,
          barBorderColor: K.neutralColor20,
          buttonArrowColor: K.neutralColor80,
          buttonBackgroundColor: K.neutralColor10,
          buttonBorderColor: K.neutralColor20,
          buttonBorderWidth: 1,
          rifleColor: K.neutralColor80,
          trackBackgroundColor: K.neutralColor5,
          trackBorderColor: K.neutralColor5,
          trackBorderWidth: 1,
        };
        return d;
      })();
      h.Scrollbar ||
        ((J.scrollbar = c(!0, M.defaultOptions, J.scrollbar)),
        (h.Scrollbar = M),
        F.compose(d, M));
      return h.Scrollbar;
    }
  );
  Q(
    d,
    "Core/Navigator.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Chart/Chart.js"],
      d["Core/Color/Color.js"],
      d["Core/Globals.js"],
      d["Core/Axis/NavigatorAxis.js"],
      d["Core/Options.js"],
      d["Core/Color/Palette.js"],
      d["Core/Scrollbar.js"],
      d["Core/Series/Series.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I, D, B, u) {
      K = K.parse;
      var c = F.hasTouch,
        a = F.isTouchDevice,
        r = M.defaultOptions,
        y = u.addEvent,
        p = u.clamp,
        O = u.correctFloat,
        k = u.defined,
        m = u.destroyObjectProperties,
        L = u.erase,
        A = u.extend,
        t = u.find,
        f = u.isArray,
        v = u.isNumber,
        b = u.merge,
        E = u.pick,
        N = u.removeEvent,
        H = u.splat,
        g = function (a) {
          for (var b = [], c = 1; c < arguments.length; c++)
            b[c - 1] = arguments[c];
          b = [].filter.call(b, v);
          if (b.length) return Math[a].apply(0, b);
        };
      M =
        "undefined" === typeof B.seriesTypes.areaspline ? "line" : "areaspline";
      A(r, {
        navigator: {
          height: 40,
          margin: 25,
          maskInside: !0,
          handles: {
            width: 7,
            height: 15,
            symbols: ["navigator-handle", "navigator-handle"],
            enabled: !0,
            lineWidth: 1,
            backgroundColor: G.neutralColor5,
            borderColor: G.neutralColor40,
          },
          maskFill: K(G.highlightColor60).setOpacity(0.3).get(),
          outlineColor: G.neutralColor20,
          outlineWidth: 1,
          series: {
            type: M,
            fillOpacity: 0.05,
            lineWidth: 1,
            compare: null,
            dataGrouping: {
              approximation: "average",
              enabled: !0,
              groupPixelWidth: 2,
              firstAnchor: "firstPoint",
              anchor: "middle",
              lastAnchor: "lastPoint",
              units: [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2, 3, 4]],
                ["week", [1, 2, 3]],
                ["month", [1, 3, 6]],
                ["year", null],
              ],
            },
            dataLabels: {
              enabled: !1,
              zIndex: 2,
            },
            id: "highcharts-navigator-series",
            className: "highcharts-navigator-series",
            lineColor: null,
            marker: {
              enabled: !1,
            },
            threshold: null,
          },
          xAxis: {
            overscroll: 0,
            className: "highcharts-navigator-xaxis",
            tickLength: 0,
            lineWidth: 0,
            gridLineColor: G.neutralColor10,
            gridLineWidth: 1,
            tickPixelInterval: 200,
            labels: {
              align: "left",
              style: {
                color: G.neutralColor40,
              },
              x: 3,
              y: -4,
            },
            crosshair: !1,
          },
          yAxis: {
            className: "highcharts-navigator-yaxis",
            gridLineWidth: 0,
            startOnTick: !1,
            endOnTick: !1,
            minPadding: 0.1,
            maxPadding: 0.1,
            labels: {
              enabled: !1,
            },
            crosshair: !1,
            title: {
              text: null,
            },
            tickLength: 0,
            tickWidth: 0,
          },
        },
      });
      F.Renderer.prototype.symbols["navigator-handle"] = function (
        a,
        b,
        c,
        d,
        g
      ) {
        a = ((g && g.width) || 0) / 2;
        b = Math.round(a / 3) + 0.5;
        g = (g && g.height) || 0;
        return [
          ["M", -a - 1, 0.5],
          ["L", a, 0.5],
          ["L", a, g + 0.5],
          ["L", -a - 1, g + 0.5],
          ["L", -a - 1, 0.5],
          ["M", -b, 4],
          ["L", -b, g - 3],
          ["M", b - 1, 4],
          ["L", b - 1, g - 3],
        ];
      };
      var n = (function () {
        function e(a) {
          this.zoomedMin =
            this.zoomedMax =
            this.yAxis =
            this.xAxis =
            this.top =
            this.size =
            this.shades =
            this.rendered =
            this.range =
            this.outlineHeight =
            this.outline =
            this.opposite =
            this.navigatorSize =
            this.navigatorSeries =
            this.navigatorOptions =
            this.navigatorGroup =
            this.navigatorEnabled =
            this.left =
            this.height =
            this.handles =
            this.chart =
            this.baseSeries =
              void 0;
          this.init(a);
        }
        e.prototype.drawHandle = function (a, b, c, e) {
          var d = this.navigatorOptions.handles.height;
          this.handles[b][e](
            c
              ? {
                  translateX: Math.round(this.left + this.height / 2),
                  translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - d),
                }
              : {
                  translateX: Math.round(this.left + parseInt(a, 10)),
                  translateY: Math.round(
                    this.top + this.height / 2 - d / 2 - 1
                  ),
                }
          );
        };
        e.prototype.drawOutline = function (a, b, c, e) {
          var d = this.navigatorOptions.maskInside,
            g = this.outline.strokeWidth(),
            f = g / 2,
            l = (g % 2) / 2;
          g = this.outlineHeight;
          var k = this.scrollbarHeight || 0,
            h = this.size,
            n = this.left - k,
            m = this.top;
          c
            ? ((n -= f),
              (c = m + b + l),
              (b = m + a + l),
              (l = [
                ["M", n + g, m - k - l],
                ["L", n + g, c],
                ["L", n, c],
                ["L", n, b],
                ["L", n + g, b],
                ["L", n + g, m + h + k],
              ]),
              d && l.push(["M", n + g, c - f], ["L", n + g, b + f]))
            : ((a += n + k - l),
              (b += n + k - l),
              (m += f),
              (l = [
                ["M", n, m],
                ["L", a, m],
                ["L", a, m + g],
                ["L", b, m + g],
                ["L", b, m],
                ["L", n + h + 2 * k, m],
              ]),
              d && l.push(["M", a - f, m], ["L", b + f, m]));
          this.outline[e]({
            d: l,
          });
        };
        e.prototype.drawMasks = function (a, b, c, e) {
          var d = this.left,
            g = this.top,
            f = this.height;
          if (c) {
            var l = [d, d, d];
            var k = [g, g + a, g + b];
            var n = [f, f, f];
            var h = [a, b - a, this.size - b];
          } else
            (l = [d, d + a, d + b]),
              (k = [g, g, g]),
              (n = [a, b - a, this.size - b]),
              (h = [f, f, f]);
          this.shades.forEach(function (a, b) {
            a[e]({
              x: l[b],
              y: k[b],
              width: n[b],
              height: h[b],
            });
          });
        };
        e.prototype.renderElements = function () {
          var a = this,
            b = a.navigatorOptions,
            c = b.maskInside,
            e = a.chart,
            d = e.renderer,
            g,
            f = {
              cursor: e.inverted ? "ns-resize" : "ew-resize",
            };
          a.navigatorGroup = g = d
            .g("navigator")
            .attr({
              zIndex: 8,
              visibility: "hidden",
            })
            .add();
          [!c, c, !c].forEach(function (c, l) {
            a.shades[l] = d
              .rect()
              .addClass(
                "highcharts-navigator-mask" + (1 === l ? "-inside" : "-outside")
              )
              .add(g);
            e.styledMode ||
              a.shades[l]
                .attr({
                  fill: c ? b.maskFill : "rgba(0,0,0,0)",
                })
                .css(1 === l && f);
          });
          a.outline = d.path().addClass("highcharts-navigator-outline").add(g);
          e.styledMode ||
            a.outline.attr({
              "stroke-width": b.outlineWidth,
              stroke: b.outlineColor,
            });
          b.handles.enabled &&
            [0, 1].forEach(function (c) {
              b.handles.inverted = e.inverted;
              a.handles[c] = d.symbol(
                b.handles.symbols[c],
                -b.handles.width / 2 - 1,
                0,
                b.handles.width,
                b.handles.height,
                b.handles
              );
              a.handles[c]
                .attr({
                  zIndex: 7 - c,
                })
                .addClass(
                  "highcharts-navigator-handle highcharts-navigator-handle-" +
                    ["left", "right"][c]
                )
                .add(g);
              if (!e.styledMode) {
                var l = b.handles;
                a.handles[c]
                  .attr({
                    fill: l.backgroundColor,
                    stroke: l.borderColor,
                    "stroke-width": l.lineWidth,
                  })
                  .css(f);
              }
            });
        };
        e.prototype.update = function (a) {
          (this.series || []).forEach(function (a) {
            a.baseSeries && delete a.baseSeries.navigatorSeries;
          });
          this.destroy();
          b(!0, this.chart.options.navigator, this.options, a);
          this.init(this.chart);
        };
        e.prototype.render = function (a, b, c, e) {
          var d = this.chart,
            g = this.scrollbarHeight,
            f,
            l = this.xAxis,
            n = l.pointRange || 0;
          var h = l.navigatorAxis.fake ? d.xAxis[0] : l;
          var m = this.navigatorEnabled,
            x,
            C = this.rendered;
          var w = d.inverted;
          var t = d.xAxis[0].minRange,
            r = d.xAxis[0].options.maxRange;
          if (!this.hasDragged || k(c)) {
            a = O(a - n / 2);
            b = O(b + n / 2);
            if (!v(a) || !v(b))
              if (C) (c = 0), (e = E(l.width, h.width));
              else return;
            this.left = E(l.left, d.plotLeft + g + (w ? d.plotWidth : 0));
            this.size =
              x =
              f =
                E(l.len, (w ? d.plotHeight : d.plotWidth) - 2 * g);
            d = w ? g : f + 2 * g;
            c = E(c, l.toPixels(a, !0));
            e = E(e, l.toPixels(b, !0));
            (v(c) && Infinity !== Math.abs(c)) || ((c = 0), (e = d));
            a = l.toValue(c, !0);
            b = l.toValue(e, !0);
            var y = Math.abs(O(b - a));
            y < t
              ? this.grabbedLeft
                ? (c = l.toPixels(b - t - n, !0))
                : this.grabbedRight && (e = l.toPixels(a + t + n, !0))
              : k(r) &&
                O(y - n) > r &&
                (this.grabbedLeft
                  ? (c = l.toPixels(b - r - n, !0))
                  : this.grabbedRight && (e = l.toPixels(a + r + n, !0)));
            this.zoomedMax = p(Math.max(c, e), 0, x);
            this.zoomedMin = p(
              this.fixedWidth
                ? this.zoomedMax - this.fixedWidth
                : Math.min(c, e),
              0,
              x
            );
            this.range = this.zoomedMax - this.zoomedMin;
            x = Math.round(this.zoomedMax);
            c = Math.round(this.zoomedMin);
            m &&
              (this.navigatorGroup.attr({
                visibility: "visible",
              }),
              (C = C && !this.hasDragged ? "animate" : "attr"),
              this.drawMasks(c, x, w, C),
              this.drawOutline(c, x, w, C),
              this.navigatorOptions.handles.enabled &&
                (this.drawHandle(c, 0, w, C), this.drawHandle(x, 1, w, C)));
            this.scrollbar &&
              (w
                ? ((w = this.top - g),
                  (h =
                    this.left -
                    g +
                    (m || !h.opposite
                      ? 0
                      : (h.titleOffset || 0) + h.axisTitleMargin)),
                  (g = f + 2 * g))
                : ((w = this.top + (m ? this.height : -g)),
                  (h = this.left - g)),
              this.scrollbar.position(h, w, d, g),
              this.scrollbar.setRange(
                this.zoomedMin / (f || 1),
                this.zoomedMax / (f || 1)
              ));
            this.rendered = !0;
          }
        };
        e.prototype.addMouseEvents = function () {
          var a = this,
            b = a.chart,
            e = b.container,
            d = [],
            g,
            f;
          a.mouseMoveHandler = g = function (b) {
            a.onMouseMove(b);
          };
          a.mouseUpHandler = f = function (b) {
            a.onMouseUp(b);
          };
          d = a.getPartsEvents("mousedown");
          d.push(
            y(b.renderTo, "mousemove", g),
            y(e.ownerDocument, "mouseup", f)
          );
          c &&
            (d.push(
              y(b.renderTo, "touchmove", g),
              y(e.ownerDocument, "touchend", f)
            ),
            d.concat(a.getPartsEvents("touchstart")));
          a.eventsToUnbind = d;
          a.series &&
            a.series[0] &&
            d.push(
              y(a.series[0].xAxis, "foundExtremes", function () {
                b.navigator.modifyNavigatorAxisExtremes();
              })
            );
        };
        e.prototype.getPartsEvents = function (a) {
          var b = this,
            c = [];
          ["shades", "handles"].forEach(function (e) {
            b[e].forEach(function (d, g) {
              c.push(
                y(d.element, a, function (a) {
                  b[e + "Mousedown"](a, g);
                })
              );
            });
          });
          return c;
        };
        e.prototype.shadesMousedown = function (a, b) {
          a = this.chart.pointer.normalize(a);
          var c = this.chart,
            e = this.xAxis,
            d = this.zoomedMin,
            g = this.left,
            f = this.size,
            l = this.range,
            n = a.chartX;
          c.inverted && ((n = a.chartY), (g = this.top));
          if (1 === b)
            (this.grabbedCenter = n),
              (this.fixedWidth = l),
              (this.dragOffset = n - d);
          else {
            a = n - g - l / 2;
            if (0 === b) a = Math.max(0, a);
            else if (2 === b && a + l >= f)
              if (((a = f - l), this.reversedExtremes)) {
                a -= l;
                var h = this.getUnionExtremes().dataMin;
              } else var m = this.getUnionExtremes().dataMax;
            a !== d &&
              ((this.fixedWidth = l),
              (b = e.navigatorAxis.toFixedRange(a, a + l, h, m)),
              k(b.min) &&
                c.xAxis[0].setExtremes(
                  Math.min(b.min, b.max),
                  Math.max(b.min, b.max),
                  !0,
                  null,
                  {
                    trigger: "navigator",
                  }
                ));
          }
        };
        e.prototype.handlesMousedown = function (a, b) {
          this.chart.pointer.normalize(a);
          a = this.chart;
          var c = a.xAxis[0],
            e = this.reversedExtremes;
          0 === b
            ? ((this.grabbedLeft = !0),
              (this.otherHandlePos = this.zoomedMax),
              (this.fixedExtreme = e ? c.min : c.max))
            : ((this.grabbedRight = !0),
              (this.otherHandlePos = this.zoomedMin),
              (this.fixedExtreme = e ? c.max : c.min));
          a.fixedRange = null;
        };
        e.prototype.onMouseMove = function (b) {
          var c = this,
            e = c.chart,
            d = c.left,
            g = c.navigatorSize,
            f = c.range,
            l = c.dragOffset,
            k = e.inverted;
          (b.touches && 0 === b.touches[0].pageX) ||
            ((b = e.pointer.normalize(b)),
            (e = b.chartX),
            k && ((d = c.top), (e = b.chartY)),
            c.grabbedLeft
              ? ((c.hasDragged = !0), c.render(0, 0, e - d, c.otherHandlePos))
              : c.grabbedRight
              ? ((c.hasDragged = !0), c.render(0, 0, c.otherHandlePos, e - d))
              : c.grabbedCenter &&
                ((c.hasDragged = !0),
                e < l ? (e = l) : e > g + l - f && (e = g + l - f),
                c.render(0, 0, e - l, e - l + f)),
            c.hasDragged &&
              c.scrollbar &&
              E(
                c.scrollbar.options.liveRedraw,
                F.svg && !a && !this.chart.isBoosting
              ) &&
              ((b.DOMType = b.type),
              setTimeout(function () {
                c.onMouseUp(b);
              }, 0)));
        };
        e.prototype.onMouseUp = function (a) {
          var b = this.chart,
            c = this.xAxis,
            e = this.scrollbar,
            d = a.DOMEvent || a,
            g = b.inverted,
            f = this.rendered && !this.hasDragged ? "animate" : "attr";
          if (
            (this.hasDragged && (!e || !e.hasDragged)) ||
            "scrollbar" === a.trigger
          ) {
            e = this.getUnionExtremes();
            if (this.zoomedMin === this.otherHandlePos)
              var l = this.fixedExtreme;
            else if (this.zoomedMax === this.otherHandlePos)
              var n = this.fixedExtreme;
            this.zoomedMax === this.size &&
              (n = this.reversedExtremes ? e.dataMin : e.dataMax);
            0 === this.zoomedMin &&
              (l = this.reversedExtremes ? e.dataMax : e.dataMin);
            c = c.navigatorAxis.toFixedRange(
              this.zoomedMin,
              this.zoomedMax,
              l,
              n
            );
            k(c.min) &&
              b.xAxis[0].setExtremes(
                Math.min(c.min, c.max),
                Math.max(c.min, c.max),
                !0,
                this.hasDragged ? !1 : null,
                {
                  trigger: "navigator",
                  triggerOp: "navigator-drag",
                  DOMEvent: d,
                }
              );
          }
          "mousemove" !== a.DOMType &&
            "touchmove" !== a.DOMType &&
            (this.grabbedLeft =
              this.grabbedRight =
              this.grabbedCenter =
              this.fixedWidth =
              this.fixedExtreme =
              this.otherHandlePos =
              this.hasDragged =
              this.dragOffset =
                null);
          this.navigatorEnabled &&
            v(this.zoomedMin) &&
            v(this.zoomedMax) &&
            ((b = Math.round(this.zoomedMin)),
            (a = Math.round(this.zoomedMax)),
            this.shades && this.drawMasks(b, a, g, f),
            this.outline && this.drawOutline(b, a, g, f),
            this.navigatorOptions.handles.enabled &&
              Object.keys(this.handles).length === this.handles.length &&
              (this.drawHandle(b, 0, g, f), this.drawHandle(a, 1, g, f)));
        };
        e.prototype.removeEvents = function () {
          this.eventsToUnbind &&
            (this.eventsToUnbind.forEach(function (a) {
              a();
            }),
            (this.eventsToUnbind = void 0));
          this.removeBaseSeriesEvents();
        };
        e.prototype.removeBaseSeriesEvents = function () {
          var a = this.baseSeries || [];
          this.navigatorEnabled &&
            a[0] &&
            (!1 !== this.navigatorOptions.adaptToUpdatedData &&
              a.forEach(function (a) {
                N(a, "updatedData", this.updatedDataHandler);
              }, this),
            a[0].xAxis &&
              N(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
        };
        e.prototype.init = function (a) {
          var c = a.options,
            e = c.navigator,
            f = e.enabled,
            k = c.scrollbar,
            l = k.enabled;
          c = f ? e.height : 0;
          var n = l ? k.height : 0;
          this.handles = [];
          this.shades = [];
          this.chart = a;
          this.setBaseSeries();
          this.height = c;
          this.scrollbarHeight = n;
          this.scrollbarEnabled = l;
          this.navigatorEnabled = f;
          this.navigatorOptions = e;
          this.scrollbarOptions = k;
          this.outlineHeight = c + n;
          this.opposite = E(e.opposite, !(f || !a.inverted));
          var h = this;
          f = h.baseSeries;
          k = a.xAxis.length;
          l = a.yAxis.length;
          var m = (f && f[0] && f[0].xAxis) ||
            a.xAxis[0] || {
              options: {},
            };
          a.isDirtyBox = !0;
          h.navigatorEnabled
            ? ((h.xAxis = new d(
                a,
                b(
                  {
                    breaks: m.options.breaks,
                    ordinal: m.options.ordinal,
                  },
                  e.xAxis,
                  {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: k,
                    isInternal: !0,
                    offset: 0,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1,
                  },
                  a.inverted
                    ? {
                        offsets: [n, 0, -n, 0],
                        width: c,
                      }
                    : {
                        offsets: [0, -n, 0, n],
                        height: c,
                      }
                )
              )),
              (h.yAxis = new d(
                a,
                b(
                  e.yAxis,
                  {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    offset: 0,
                    index: l,
                    isInternal: !0,
                    reversed: E(
                      e.yAxis && e.yAxis.reversed,
                      a.yAxis[0] && a.yAxis[0].reversed,
                      !1
                    ),
                    zoomEnabled: !1,
                  },
                  a.inverted
                    ? {
                        width: c,
                      }
                    : {
                        height: c,
                      }
                )
              )),
              f || e.series.data
                ? h.updateNavigatorSeries(!1)
                : 0 === a.series.length &&
                  (h.unbindRedraw = y(a, "beforeRedraw", function () {
                    0 < a.series.length &&
                      !h.series &&
                      (h.setBaseSeries(), h.unbindRedraw());
                  })),
              (h.reversedExtremes =
                (a.inverted && !h.xAxis.reversed) ||
                (!a.inverted && h.xAxis.reversed)),
              h.renderElements(),
              h.addMouseEvents())
            : ((h.xAxis = {
                chart: a,
                navigatorAxis: {
                  fake: !0,
                },
                translate: function (b, c) {
                  var e = a.xAxis[0],
                    d = e.getExtremes(),
                    f = e.len - 2 * n,
                    k = g("min", e.options.min, d.dataMin);
                  e = g("max", e.options.max, d.dataMax) - k;
                  return c ? (b * e) / f + k : (f * (b - k)) / e;
                },
                toPixels: function (a) {
                  return this.translate(a);
                },
                toValue: function (a) {
                  return this.translate(a, !0);
                },
              }),
              (h.xAxis.navigatorAxis.axis = h.xAxis),
              (h.xAxis.navigatorAxis.toFixedRange =
                J.AdditionsClass.prototype.toFixedRange.bind(
                  h.xAxis.navigatorAxis
                )));
          a.options.scrollbar.enabled &&
            ((a.scrollbar = h.scrollbar =
              new I(
                a.renderer,
                b(a.options.scrollbar, {
                  margin: h.navigatorEnabled ? 0 : 10,
                  vertical: a.inverted,
                }),
                a
              )),
            y(h.scrollbar, "changed", function (a) {
              var b = h.size,
                c = b * this.to;
              b *= this.from;
              h.hasDragged = h.scrollbar.hasDragged;
              h.render(0, 0, b, c);
              this.shouldUpdateExtremes(a.DOMType) &&
                setTimeout(function () {
                  h.onMouseUp(a);
                });
            }));
          h.addBaseSeriesEvents();
          h.addChartEvents();
        };
        e.prototype.getUnionExtremes = function (a) {
          var b = this.chart.xAxis[0],
            c = this.xAxis,
            e = c.options,
            d = b.options,
            f;
          (a && null === b.dataMin) ||
            (f = {
              dataMin: E(
                e && e.min,
                g("min", d.min, b.dataMin, c.dataMin, c.min)
              ),
              dataMax: E(
                e && e.max,
                g("max", d.max, b.dataMax, c.dataMax, c.max)
              ),
            });
          return f;
        };
        e.prototype.setBaseSeries = function (a, b) {
          var c = this.chart,
            e = (this.baseSeries = []);
          a =
            a ||
            (c.options && c.options.navigator.baseSeries) ||
            (c.series.length
              ? t(c.series, function (a) {
                  return !a.options.isInternal;
                }).index
              : 0);
          (c.series || []).forEach(function (b, c) {
            b.options.isInternal ||
              (!b.options.showInNavigator &&
                ((c !== a && b.options.id !== a) ||
                  !1 === b.options.showInNavigator)) ||
              e.push(b);
          });
          this.xAxis &&
            !this.xAxis.navigatorAxis.fake &&
            this.updateNavigatorSeries(!0, b);
        };
        e.prototype.updateNavigatorSeries = function (a, c) {
          var e = this,
            d = e.chart,
            g = e.baseSeries,
            k,
            l,
            h = e.navigatorOptions.series,
            n,
            m = {
              enableMouseTracking: !1,
              index: null,
              linkedTo: null,
              group: "nav",
              padXAxis: !1,
              xAxis: "navigator-x-axis",
              yAxis: "navigator-y-axis",
              showInLegend: !1,
              stacking: void 0,
              isInternal: !0,
              states: {
                inactive: {
                  opacity: 1,
                },
              },
            },
            p = (e.series = (e.series || []).filter(function (a) {
              var b = a.baseSeries;
              return 0 > g.indexOf(b)
                ? (b &&
                    (N(b, "updatedData", e.updatedDataHandler),
                    delete b.navigatorSeries),
                  a.chart && a.destroy(),
                  !1)
                : !0;
            }));
          g &&
            g.length &&
            g.forEach(function (a) {
              var q = a.navigatorSeries,
                x = A(
                  {
                    color: a.color,
                    visible: a.visible,
                  },
                  f(h) ? r.navigator.series : h
                );
              (q && !1 === e.navigatorOptions.adaptToUpdatedData) ||
                ((m.name = "Navigator " + g.length),
                (k = a.options || {}),
                (n = k.navigatorOptions || {}),
                (x.dataLabels = H(x.dataLabels)),
                (l = b(k, m, x, n)),
                (l.pointRange = E(
                  x.pointRange,
                  n.pointRange,
                  r.plotOptions[l.type || "line"].pointRange
                )),
                (x = n.data || x.data),
                (e.hasNavigatorData = e.hasNavigatorData || !!x),
                (l.data = x || (k.data && k.data.slice(0))),
                q && q.options
                  ? q.update(l, c)
                  : ((a.navigatorSeries = d.initSeries(l)),
                    (a.navigatorSeries.baseSeries = a),
                    p.push(a.navigatorSeries)));
            });
          if ((h.data && (!g || !g.length)) || f(h))
            (e.hasNavigatorData = !1),
              (h = H(h)),
              h.forEach(function (a, c) {
                m.name = "Navigator " + (p.length + 1);
                l = b(
                  r.navigator.series,
                  {
                    color:
                      (d.series[c] &&
                        !d.series[c].options.isInternal &&
                        d.series[c].color) ||
                      d.options.colors[c] ||
                      d.options.colors[0],
                  },
                  m,
                  a
                );
                l.data = a.data;
                l.data && ((e.hasNavigatorData = !0), p.push(d.initSeries(l)));
              });
          a && this.addBaseSeriesEvents();
        };
        e.prototype.addBaseSeriesEvents = function () {
          var a = this,
            b = a.baseSeries || [];
          b[0] &&
            b[0].xAxis &&
            b[0].eventsToUnbind.push(
              y(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)
            );
          b.forEach(function (b) {
            b.eventsToUnbind.push(
              y(b, "show", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
              })
            );
            b.eventsToUnbind.push(
              y(b, "hide", function () {
                this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
              })
            );
            !1 !== this.navigatorOptions.adaptToUpdatedData &&
              b.xAxis &&
              b.eventsToUnbind.push(
                y(b, "updatedData", this.updatedDataHandler)
              );
            b.eventsToUnbind.push(
              y(b, "remove", function () {
                this.navigatorSeries &&
                  (L(a.series, this.navigatorSeries),
                  k(this.navigatorSeries.options) &&
                    this.navigatorSeries.remove(!1),
                  delete this.navigatorSeries);
              })
            );
          }, this);
        };
        e.prototype.getBaseSeriesMin = function (a) {
          return this.baseSeries.reduce(function (a, b) {
            return Math.min(a, b.xData ? b.xData[0] : a);
          }, a);
        };
        e.prototype.modifyNavigatorAxisExtremes = function () {
          var a = this.xAxis,
            b;
          "undefined" !== typeof a.getExtremes &&
            (!(b = this.getUnionExtremes(!0)) ||
              (b.dataMin === a.min && b.dataMax === a.max) ||
              ((a.min = b.dataMin), (a.max = b.dataMax)));
        };
        e.prototype.modifyBaseAxisExtremes = function () {
          var a = this.chart.navigator,
            b = this.getExtremes(),
            c = b.dataMin,
            e = b.dataMax;
          b = b.max - b.min;
          var d = a.stickToMin,
            g = a.stickToMax,
            f = E(this.options.overscroll, 0),
            k = a.series && a.series[0],
            h = !!this.setExtremes;
          if (
            !this.eventArgs ||
            "rangeSelectorButton" !== this.eventArgs.trigger
          ) {
            if (d) {
              var n = c;
              var m = n + b;
            }
            g &&
              ((m = e + f),
              d ||
                (n = Math.max(
                  c,
                  m - b,
                  a.getBaseSeriesMin(
                    k && k.xData ? k.xData[0] : -Number.MAX_VALUE
                  )
                )));
            h &&
              (d || g) &&
              v(n) &&
              ((this.min = this.userMin = n), (this.max = this.userMax = m));
          }
          a.stickToMin = a.stickToMax = null;
        };
        e.prototype.updatedDataHandler = function () {
          var a = this.chart.navigator,
            b = this.navigatorSeries,
            c = a.getBaseSeriesMin(this.xData[0]);
          a.stickToMax = a.reversedExtremes
            ? 0 === Math.round(a.zoomedMin)
            : Math.round(a.zoomedMax) >= Math.round(a.size);
          a.stickToMin =
            v(this.xAxis.min) &&
            this.xAxis.min <= c &&
            (!this.chart.fixedRange || !a.stickToMax);
          b &&
            !a.hasNavigatorData &&
            ((b.options.pointStart = this.xData[0]),
            b.setData(this.options.data, !1, null, !1));
        };
        e.prototype.addChartEvents = function () {
          this.eventsToUnbind || (this.eventsToUnbind = []);
          this.eventsToUnbind.push(
            y(this.chart, "redraw", function () {
              var a = this.navigator,
                b =
                  a &&
                  ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) ||
                    this.xAxis[0]);
              b && a.render(b.min, b.max);
            }),
            y(this.chart, "getMargins", function () {
              var a = this.navigator,
                b = a.opposite ? "plotTop" : "marginBottom";
              this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
              this[b] =
                (this[b] || 0) +
                (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) +
                a.navigatorOptions.margin;
            })
          );
        };
        e.prototype.destroy = function () {
          this.removeEvents();
          this.xAxis &&
            (L(this.chart.xAxis, this.xAxis), L(this.chart.axes, this.xAxis));
          this.yAxis &&
            (L(this.chart.yAxis, this.yAxis), L(this.chart.axes, this.yAxis));
          (this.series || []).forEach(function (a) {
            a.destroy && a.destroy();
          });
          "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
            .split(" ")
            .forEach(function (a) {
              this[a] && this[a].destroy && this[a].destroy();
              this[a] = null;
            }, this);
          [this.handles].forEach(function (a) {
            m(a);
          }, this);
        };
        return e;
      })();
      F.Navigator ||
        ((F.Navigator = n),
        J.compose(d),
        y(h, "beforeShowResetZoom", function () {
          var b = this.options,
            c = b.navigator,
            d = b.rangeSelector;
          if (
            ((c && c.enabled) || (d && d.enabled)) &&
            ((!a && "x" === b.chart.zoomType) ||
              (a && "x" === b.chart.pinchType))
          )
            return !1;
        }),
        y(h, "beforeRender", function () {
          var a = this.options;
          if (a.navigator.enabled || a.scrollbar.enabled)
            this.scroller = this.navigator = new n(this);
        }),
        y(h, "afterSetChartSize", function () {
          var a = this.legend,
            b = this.navigator;
          if (b) {
            var c = a && a.options;
            var d = b.xAxis;
            var g = b.yAxis;
            var f = b.scrollbarHeight;
            this.inverted
              ? ((b.left = b.opposite
                  ? this.chartWidth - f - b.height
                  : this.spacing[3] + f),
                (b.top = this.plotTop + f))
              : ((b.left = this.plotLeft + f),
                (b.top =
                  b.navigatorOptions.top ||
                  this.chartHeight -
                    b.height -
                    f -
                    this.spacing[2] -
                    (this.rangeSelector && this.extraBottomMargin
                      ? this.rangeSelector.getHeight()
                      : 0) -
                    (c &&
                    "bottom" === c.verticalAlign &&
                    "proximate" !== c.layout &&
                    c.enabled &&
                    !c.floating
                      ? a.legendHeight + E(c.margin, 10)
                      : 0) -
                    (this.titleOffset ? this.titleOffset[2] : 0)));
            d &&
              g &&
              (this.inverted
                ? (d.options.left = g.options.left = b.left)
                : (d.options.top = g.options.top = b.top),
              d.setAxisSize(),
              g.setAxisSize());
          }
        }),
        y(h, "update", function (a) {
          var c = a.options.navigator || {},
            e = a.options.scrollbar || {};
          this.navigator ||
            this.scroller ||
            (!c.enabled && !e.enabled) ||
            (b(!0, this.options.navigator, c),
            b(!0, this.options.scrollbar, e),
            delete a.options.navigator,
            delete a.options.scrollbar);
        }),
        y(h, "afterUpdate", function (a) {
          this.navigator ||
            this.scroller ||
            (!this.options.navigator.enabled &&
              !this.options.scrollbar.enabled) ||
            ((this.scroller = this.navigator = new n(this)),
            E(a.redraw, !0) && this.redraw(a.animation));
        }),
        y(h, "afterAddSeries", function () {
          this.navigator && this.navigator.setBaseSeries(null, !1);
        }),
        y(D, "afterUpdate", function () {
          this.chart.navigator &&
            !this.options.isInternal &&
            this.chart.navigator.setBaseSeries(null, !1);
        }),
        h.prototype.callbacks.push(function (a) {
          var b = a.navigator;
          b &&
            a.xAxis[0] &&
            ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
        }));
      F.Navigator = n;
      return F.Navigator;
    }
  );
  Q(
    d,
    "Core/Axis/OrdinalAxis.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Globals.js"],
      d["Core/Series/Series.js"],
      d["Core/Utilities.js"],
      d["Core/Chart/Chart.js"],
    ],
    function (d, h, K, F, J) {
      var M = F.addEvent,
        G = F.css,
        I = F.defined,
        D = F.error,
        B = F.pick,
        u = F.timeUnits,
        c;
      (function (a) {
        var c = (function () {
          function a(a) {
            this.index = {};
            this.axis = a;
          }
          a.prototype.beforeSetTickPositions = function () {
            var a = this.axis,
              c = a.ordinal,
              d = [],
              h,
              r = !1,
              A = a.getExtremes(),
              t = A.min,
              f = A.max,
              v,
              b = a.isXAxis && !!a.options.breaks;
            A = a.options.ordinal;
            var y = Number.MAX_VALUE,
              u = a.chart.options.chart.ignoreHiddenSeries,
              H;
            if (A || b) {
              a.series.forEach(function (a, c) {
                h = [];
                if (
                  !(
                    (u && !1 === a.visible) ||
                    (!1 === a.takeOrdinalPosition && !b)
                  ) &&
                  ((d = d.concat(a.processedXData)),
                  (g = d.length),
                  d.sort(function (a, b) {
                    return a - b;
                  }),
                  (y = Math.min(y, B(a.closestPointRange, y))),
                  g)
                ) {
                  for (c = 0; c < g - 1; )
                    d[c] !== d[c + 1] && h.push(d[c + 1]), c++;
                  h[0] !== d[0] && h.unshift(d[0]);
                  d = h;
                }
                a.isSeriesBoosting && (H = !0);
              });
              H && (d.length = 0);
              var g = d.length;
              if (2 < g) {
                var n = d[1] - d[0];
                for (v = g - 1; v-- && !r; ) d[v + 1] - d[v] !== n && (r = !0);
                !a.options.keepOrdinalPadding &&
                  (d[0] - t > n || f - d[d.length - 1] > n) &&
                  (r = !0);
              } else
                a.options.overscroll &&
                  (2 === g
                    ? (y = d[1] - d[0])
                    : 1 === g
                    ? ((y = a.options.overscroll), (d = [d[0], d[0] + y]))
                    : (y = c.overscrollPointsRange));
              r || a.forceOrdinal
                ? (a.options.overscroll &&
                    ((c.overscrollPointsRange = y),
                    (d = d.concat(c.getOverscrollPositions()))),
                  (c.positions = d),
                  (n = a.ordinal2lin(Math.max(t, d[0]), !0)),
                  (v = Math.max(
                    a.ordinal2lin(Math.min(f, d[d.length - 1]), !0),
                    1
                  )),
                  (c.slope = f = (f - t) / (v - n)),
                  (c.offset = t - n * f))
                : ((c.overscrollPointsRange = B(
                    a.closestPointRange,
                    c.overscrollPointsRange
                  )),
                  (c.positions = a.ordinal.slope = c.offset = void 0));
            }
            a.isOrdinal = A && r;
            c.groupIntervalFactor = null;
          };
          a.prototype.getExtendedPositions = function () {
            var a = this,
              c = a.axis,
              d = c.constructor.prototype,
              m = c.chart,
              r = c.series[0].currentDataGrouping,
              y = a.index,
              t = r ? r.count + r.unitName : "raw",
              f = c.options.overscroll,
              v = c.getExtremes(),
              b;
            y || (y = a.index = {});
            if (!y[t]) {
              var u = {
                series: [],
                chart: m,
                forceOrdinal: !1,
                getExtremes: function () {
                  return {
                    min: v.dataMin,
                    max: v.dataMax + f,
                  };
                },
                getGroupPixelWidth: d.getGroupPixelWidth,
                getTimeTicks: d.getTimeTicks,
                options: {
                  ordinal: !0,
                },
                ordinal: {
                  getGroupIntervalFactor: this.getGroupIntervalFactor,
                },
                ordinal2lin: d.ordinal2lin,
                val2lin: d.val2lin,
              };
              u.ordinal.axis = u;
              c.series.forEach(function (c) {
                b = {
                  xAxis: u,
                  xData: c.xData.slice(),
                  chart: m,
                  destroyGroupedData: h.noop,
                  getProcessedData: K.prototype.getProcessedData,
                };
                b.xData = b.xData.concat(a.getOverscrollPositions());
                b.options = {
                  dataGrouping: r
                    ? {
                        enabled: !0,
                        forced: !0,
                        approximation: "open",
                        units: [[r.unitName, [r.count]]],
                      }
                    : {
                        enabled: !1,
                      },
                };
                u.series.push(b);
                c.processData.apply(b);
                b.closestPointRange !== b.basePointRange &&
                  b.currentDataGrouping &&
                  (u.forceOrdinal = !0);
              });
              c.ordinal.beforeSetTickPositions.apply({
                axis: u,
              });
              y[t] = u.ordinal.positions;
            }
            return y[t];
          };
          a.prototype.getGroupIntervalFactor = function (a, c, d) {
            d = d.processedXData;
            var k = d.length,
              h = [];
            var p = this.groupIntervalFactor;
            if (!p) {
              for (p = 0; p < k - 1; p++) h[p] = d[p + 1] - d[p];
              h.sort(function (a, c) {
                return a - c;
              });
              h = h[Math.floor(k / 2)];
              a = Math.max(a, d[0]);
              c = Math.min(c, d[k - 1]);
              this.groupIntervalFactor = p = (k * h) / (c - a);
            }
            return p;
          };
          a.prototype.getOverscrollPositions = function () {
            var a = this.axis,
              c = a.options.overscroll,
              d = this.overscrollPointsRange,
              h = [],
              r = a.dataMax;
            if (I(d)) for (h.push(r); r <= a.dataMax + c; ) (r += d), h.push(r);
            return h;
          };
          a.prototype.postProcessTickInterval = function (a) {
            var c = this.axis,
              d = this.slope;
            return d
              ? c.options.breaks
                ? c.closestPointRange || a
                : a / (d / c.closestPointRange)
              : a;
          };
          return a;
        })();
        a.Composition = c;
        a.compose = function (c, d, h) {
          c.keepProps.push("ordinal");
          var k = c.prototype;
          c.prototype.getTimeTicks = function (a, c, d, k, f, h, b) {
            void 0 === f && (f = []);
            void 0 === h && (h = 0);
            var m = 0,
              p,
              t,
              g = {},
              n = [],
              e = -Number.MAX_VALUE,
              l = this.options.tickPixelInterval,
              C = this.chart.time,
              x = [];
            if (
              (!this.options.ordinal && !this.options.breaks) ||
              !f ||
              3 > f.length ||
              "undefined" === typeof c
            )
              return C.getTimeTicks.apply(C, arguments);
            var w = f.length;
            for (p = 0; p < w; p++) {
              var q = p && f[p - 1] > d;
              f[p] < c && (m = p);
              if (p === w - 1 || f[p + 1] - f[p] > 5 * h || q) {
                if (f[p] > e) {
                  for (
                    t = C.getTimeTicks(a, f[m], f[p], k);
                    t.length && t[0] <= e;

                  )
                    t.shift();
                  t.length && (e = t[t.length - 1]);
                  x.push(n.length);
                  n = n.concat(t);
                }
                m = p + 1;
              }
              if (q) break;
            }
            if (t) {
              t = t.info;
              if (b && t.unitRange <= u.hour) {
                p = n.length - 1;
                for (m = 1; m < p; m++)
                  if (
                    C.dateFormat("%d", n[m]) !== C.dateFormat("%d", n[m - 1])
                  ) {
                    g[n[m]] = "day";
                    var r = !0;
                  }
                r && (g[n[0]] = "day");
                t.higherRanks = g;
              }
              t.segmentStarts = x;
              n.info = t;
            } else D(12, !1, this.chart);
            if (b && I(l)) {
              m = t = n.length;
              r = [];
              C = void 0;
              for (x = []; m--; )
                (p = this.translate(n[m])), C && (x[m] = C - p), (r[m] = C = p);
              x.sort();
              x = x[Math.floor(x.length / 2)];
              x < 0.6 * l && (x = null);
              m = n[t - 1] > d ? t - 1 : t;
              for (C = void 0; m--; )
                (p = r[m]),
                  (t = Math.abs(C - p)),
                  C && t < 0.8 * l && (null === x || t < 0.8 * x)
                    ? (g[n[m]] && !g[n[m + 1]]
                        ? ((t = m + 1), (C = p))
                        : (t = m),
                      n.splice(t, 1))
                    : (C = p);
            }
            return n;
          };
          k.lin2val = function (a, c) {
            var d = this.ordinal,
              k = d.positions;
            if (k) {
              var f = d.slope,
                h = d.offset;
              d = k.length - 1;
              var b = void 0;
              if (c)
                0 > a
                  ? (a = k[0])
                  : a > d
                  ? (a = k[d])
                  : ((d = Math.floor(a)), (b = a - d));
              else
                for (; d--; )
                  if (((c = f * d + h), a >= c)) {
                    f = f * (d + 1) + h;
                    b = (a - c) / (f - c);
                    break;
                  }
              return "undefined" !== typeof b && "undefined" !== typeof k[d]
                ? k[d] + (b ? b * (k[d + 1] - k[d]) : 0)
                : a;
            }
            return a;
          };
          k.val2lin = function (a, c) {
            var d = this.ordinal,
              k = d.positions;
            if (k) {
              var f = k.length,
                h,
                b = void 0;
              for (h = f; h--; )
                if (k[h] === a) {
                  b = h;
                  break;
                }
              for (h = f - 1; h--; )
                if (a > k[h] || 0 === h) {
                  a = (a - k[h]) / (k[h + 1] - k[h]);
                  b = h + a;
                  break;
                }
              c = c ? b : d.slope * (b || 0) + d.offset;
            } else c = a;
            return c;
          };
          k.ordinal2lin = k.val2lin;
          M(c, "afterInit", function () {
            this.ordinal || (this.ordinal = new a.Composition(this));
          });
          M(c, "foundExtremes", function () {
            this.isXAxis &&
              I(this.options.overscroll) &&
              this.max === this.dataMax &&
              (!this.chart.mouseIsDown || this.isInternal) &&
              (!this.eventArgs ||
                (this.eventArgs && "navigator" !== this.eventArgs.trigger)) &&
              ((this.max += this.options.overscroll),
              !this.isInternal &&
                I(this.userMin) &&
                (this.min += this.options.overscroll));
          });
          M(c, "afterSetScale", function () {
            this.horiz &&
              !this.isDirty &&
              (this.isDirty =
                this.isOrdinal &&
                this.chart.navigator &&
                !this.chart.navigator.adaptToUpdatedData);
          });
          M(c, "initialAxisTranslation", function () {
            this.ordinal &&
              (this.ordinal.beforeSetTickPositions(),
              (this.tickInterval = this.ordinal.postProcessTickInterval(
                this.tickInterval
              )));
          });
          M(d, "pan", function (a) {
            var c = this.xAxis[0],
              d = c.options.overscroll,
              k = a.originalEvent.chartX,
              f = this.options.chart.panning,
              h = !1;
            if (f && "y" !== f.type && c.options.ordinal && c.series.length) {
              var b = this.mouseDownX,
                m = c.getExtremes(),
                p = m.dataMax,
                r = m.min,
                g = m.max,
                n = void 0;
              n = this.hoverPoints;
              var e =
                c.closestPointRange ||
                (c.ordinal && c.ordinal.overscrollPointsRange);
              b = (b - k) / (c.translationSlope * (c.ordinal.slope || e));
              e = {
                ordinal: {
                  positions: c.ordinal.getExtendedPositions(),
                },
              };
              var l = void 0,
                C = void 0,
                x = c.lin2val,
                w = c.val2lin,
                q = void 0;
              e.ordinal.positions
                ? 1 < Math.abs(b) &&
                  (n &&
                    n.forEach(function (a) {
                      a.setState();
                    }),
                  0 > b
                    ? ((C = e), (q = c.ordinal.positions ? c : e))
                    : ((C = c.ordinal.positions ? c : e), (q = e)),
                  (l = q.ordinal.positions),
                  p > l[l.length - 1] && l.push(p),
                  (this.fixedRange = g - r),
                  (n = c.navigatorAxis.toFixedRange(
                    null,
                    null,
                    x.apply(C, [w.apply(C, [r, !0]) + b, !0]),
                    x.apply(q, [w.apply(q, [g, !0]) + b, !0])
                  )),
                  n.min >= Math.min(m.dataMin, r) &&
                    n.max <= Math.max(p, g) + d &&
                    c.setExtremes(n.min, n.max, !0, !1, {
                      trigger: "pan",
                    }),
                  (this.mouseDownX = k),
                  G(this.container, {
                    cursor: "move",
                  }))
                : (h = !0);
            } else h = !0;
            h || (f && /y/.test(f.type))
              ? d && (c.max = c.dataMax + d)
              : a.preventDefault();
          });
          M(h, "updatedData", function () {
            var a = this.xAxis;
            a && a.options.ordinal && delete a.ordinal.index;
          });
        };
      })(c || (c = {}));
      c.compose(d, J, K);
      return c;
    }
  );
  Q(
    d,
    "Core/Axis/BrokenAxis.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Series/Series.js"],
      d["Extensions/Stacking.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var J = F.addEvent,
        M = F.find,
        G = F.fireEvent,
        I = F.isArray,
        D = F.isNumber,
        B = F.pick,
        u = (function () {
          function c(a) {
            this.hasBreaks = !1;
            this.axis = a;
          }
          c.isInBreak = function (a, c) {
            var d = a.repeat || Infinity,
              h = a.from,
              r = a.to - a.from;
            c = c >= h ? (c - h) % d : d - ((h - c) % d);
            return a.inclusive ? c <= r : c < r && 0 !== c;
          };
          c.lin2Val = function (a) {
            var d = this.brokenAxis;
            d = d && d.breakArray;
            if (!d || !D(a)) return a;
            var h;
            for (h = 0; h < d.length; h++) {
              var p = d[h];
              if (p.from >= a) break;
              else p.to < a ? (a += p.len) : c.isInBreak(p, a) && (a += p.len);
            }
            return a;
          };
          c.val2Lin = function (a) {
            var d = this.brokenAxis;
            d = d && d.breakArray;
            if (!d || !D(a)) return a;
            var h = a,
              p;
            for (p = 0; p < d.length; p++) {
              var u = d[p];
              if (u.to <= a) h -= u.len;
              else if (u.from >= a) break;
              else if (c.isInBreak(u, a)) {
                h -= a - u.from;
                break;
              }
            }
            return h;
          };
          c.prototype.findBreakAt = function (a, c) {
            return M(c, function (c) {
              return c.from < a && a < c.to;
            });
          };
          c.prototype.isInAnyBreak = function (a, d) {
            var h = this.axis,
              p = h.options.breaks || [],
              r = p.length,
              k;
            if (r && D(a)) {
              for (; r--; )
                if (c.isInBreak(p[r], a)) {
                  var m = !0;
                  k || (k = B(p[r].showPoints, !h.isXAxis));
                }
              var u = m && d ? m && !k : m;
            }
            return u;
          };
          c.prototype.setBreaks = function (a, h) {
            var r = this,
              p = r.axis,
              u = I(a) && !!a.length;
            p.isDirty = r.hasBreaks !== u;
            r.hasBreaks = u;
            p.options.breaks = p.userOptions.breaks = a;
            p.forceRedraw = !0;
            p.series.forEach(function (a) {
              a.isDirty = !0;
            });
            u ||
              p.val2lin !== c.val2Lin ||
              (delete p.val2lin, delete p.lin2val);
            u &&
              ((p.userOptions.ordinal = !1),
              (p.lin2val = c.lin2Val),
              (p.val2lin = c.val2Lin),
              (p.setExtremes = function (a, c, h, p, t) {
                if (r.hasBreaks) {
                  for (
                    var f, k = this.options.breaks;
                    (f = r.findBreakAt(a, k));

                  )
                    a = f.to;
                  for (; (f = r.findBreakAt(c, k)); ) c = f.from;
                  c < a && (c = a);
                }
                d.prototype.setExtremes.call(this, a, c, h, p, t);
              }),
              (p.setAxisTranslation = function () {
                d.prototype.setAxisTranslation.call(this);
                r.unitLength = void 0;
                if (r.hasBreaks) {
                  var a = p.options.breaks || [],
                    h = [],
                    u = [],
                    y = 0,
                    t,
                    f = p.userMin || p.min,
                    v = p.userMax || p.max,
                    b = B(p.pointRangePadding, 0),
                    E;
                  a.forEach(function (a) {
                    t = a.repeat || Infinity;
                    D(f) &&
                      D(v) &&
                      (c.isInBreak(a, f) && (f += (a.to % t) - (f % t)),
                      c.isInBreak(a, v) && (v -= (v % t) - (a.from % t)));
                  });
                  a.forEach(function (a) {
                    H = a.from;
                    t = a.repeat || Infinity;
                    if (D(f) && D(v)) {
                      for (; H - t > f; ) H -= t;
                      for (; H < f; ) H += t;
                      for (E = H; E < v; E += t)
                        h.push({
                          value: E,
                          move: "in",
                        }),
                          h.push({
                            value: E + a.to - a.from,
                            move: "out",
                            size: a.breakSize,
                          });
                    }
                  });
                  h.sort(function (a, b) {
                    return a.value === b.value
                      ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1)
                      : a.value - b.value;
                  });
                  var F = 0;
                  var H = f;
                  h.forEach(function (a) {
                    F += "in" === a.move ? 1 : -1;
                    1 === F && "in" === a.move && (H = a.value);
                    0 === F &&
                      D(H) &&
                      (u.push({
                        from: H,
                        to: a.value,
                        len: a.value - H - (a.size || 0),
                      }),
                      (y += a.value - H - (a.size || 0)));
                  });
                  r.breakArray = u;
                  D(f) &&
                    D(v) &&
                    D(p.min) &&
                    ((r.unitLength = v - f - y + b),
                    G(p, "afterBreaks"),
                    p.staticScale
                      ? (p.transA = p.staticScale)
                      : r.unitLength &&
                        (p.transA *= (v - p.min + b) / r.unitLength),
                    b &&
                      (p.minPixelPadding = p.transA * (p.minPointOffset || 0)),
                    (p.min = f),
                    (p.max = v));
                }
              }));
            B(h, !0) && p.chart.redraw();
          };
          return c;
        })();
      F = (function () {
        function c() {}
        c.compose = function (a, c) {
          a.keepProps.push("brokenAxis");
          var d = h.prototype;
          d.drawBreaks = function (a, c) {
            var d = this,
              h = d.points,
              p,
              r,
              t,
              f;
            if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
              var u = a.brokenAxis;
              c.forEach(function (b) {
                p = (u && u.breakArray) || [];
                r = a.isXAxis ? a.min : B(d.options.threshold, a.min);
                h.forEach(function (c) {
                  f = B(c["stack" + b.toUpperCase()], c[b]);
                  p.forEach(function (b) {
                    if (D(r) && D(f)) {
                      t = !1;
                      if (
                        (r < b.from && f > b.to) ||
                        (r > b.from && f < b.from)
                      )
                        t = "pointBreak";
                      else if (
                        (r < b.from && f > b.from && f < b.to) ||
                        (r > b.from && f > b.to && f < b.from)
                      )
                        t = "pointInBreak";
                      t &&
                        G(a, t, {
                          point: c,
                          brk: b,
                        });
                    }
                  });
                });
              });
            }
          };
          d.gappedPath = function () {
            var a = this.currentDataGrouping,
              c = a && a.gapSize;
            a = this.options.gapSize;
            var d = this.points.slice(),
              h = d.length - 1,
              r = this.yAxis,
              u;
            if (a && 0 < h)
              for (
                "value" !== this.options.gapUnit && (a *= this.basePointRange),
                  c && c > a && c >= this.basePointRange && (a = c),
                  u = void 0;
                h--;

              )
                (u && !1 !== u.visible) || (u = d[h + 1]),
                  (c = d[h]),
                  !1 !== u.visible &&
                    !1 !== c.visible &&
                    (u.x - c.x > a &&
                      ((u = (c.x + u.x) / 2),
                      d.splice(h + 1, 0, {
                        isNull: !0,
                        x: u,
                      }),
                      r.stacking &&
                        this.options.stacking &&
                        ((u = r.stacking.stacks[this.stackKey][u] =
                          new K(r, r.options.stackLabels, !1, u, this.stack)),
                        (u.total = 0))),
                    (u = c));
            return this.getGraphPath(d);
          };
          J(a, "init", function () {
            this.brokenAxis || (this.brokenAxis = new u(this));
          });
          J(a, "afterInit", function () {
            "undefined" !== typeof this.brokenAxis &&
              this.brokenAxis.setBreaks(this.options.breaks, !1);
          });
          J(a, "afterSetTickPositions", function () {
            var a = this.brokenAxis;
            if (a && a.hasBreaks) {
              var c = this.tickPositions,
                d = this.tickPositions.info,
                h = [],
                r;
              for (r = 0; r < c.length; r++)
                a.isInAnyBreak(c[r]) || h.push(c[r]);
              this.tickPositions = h;
              this.tickPositions.info = d;
            }
          });
          J(a, "afterSetOptions", function () {
            this.brokenAxis &&
              this.brokenAxis.hasBreaks &&
              (this.options.ordinal = !1);
          });
          J(c, "afterGeneratePoints", function () {
            var a = this.options.connectNulls,
              c = this.points,
              d = this.xAxis,
              h = this.yAxis;
            if (this.isDirty)
              for (var r = c.length; r--; ) {
                var u = c[r],
                  t =
                    !(null === u.y && !1 === a) &&
                    ((d &&
                      d.brokenAxis &&
                      d.brokenAxis.isInAnyBreak(u.x, !0)) ||
                      (h &&
                        h.brokenAxis &&
                        h.brokenAxis.isInAnyBreak(u.y, !0)));
                u.visible = t ? !1 : !1 !== u.options.visible;
              }
          });
          J(c, "afterRender", function () {
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, B(this.pointArrayMap, ["y"]));
          });
        };
        return c;
      })();
      F.compose(d, h);
      return F;
    }
  );
  Q(d, "masters/modules/broken-axis.src.js", [], function () {});
  Q(
    d,
    "Extensions/DataGrouping.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Axis/DateTimeAxis.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Globals.js"],
      d["Core/Series/Point.js"],
      d["Core/Series/Series.js"],
      d["Core/Tooltip.js"],
      d["Core/Options.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I, D) {
      var B = K.format,
        u = M.prototype;
      K = D.addEvent;
      var c = D.arrayMax,
        a = D.arrayMin,
        r = D.correctFloat,
        y = D.defined,
        p = D.error,
        N = D.extend,
        k = D.isNumber,
        m = D.merge,
        L = D.pick;
      ("");
      var A = (F.approximations = {
        sum: function (a) {
          var b = a.length;
          if (!b && a.hasNulls) var c = null;
          else if (b) for (c = 0; b--; ) c += a[b];
          return c;
        },
        average: function (a) {
          var b = a.length;
          a = A.sum(a);
          k(a) && b && (a = r(a / b));
          return a;
        },
        averages: function () {
          var a = [];
          [].forEach.call(arguments, function (b) {
            a.push(A.average(b));
          });
          return "undefined" === typeof a[0] ? void 0 : a;
        },
        open: function (a) {
          return a.length ? a[0] : a.hasNulls ? null : void 0;
        },
        high: function (a) {
          return a.length ? c(a) : a.hasNulls ? null : void 0;
        },
        low: function (b) {
          return b.length ? a(b) : b.hasNulls ? null : void 0;
        },
        close: function (a) {
          return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
        },
        ohlc: function (a, b, c, e) {
          a = A.open(a);
          b = A.high(b);
          c = A.low(c);
          e = A.close(e);
          if (k(a) || k(b) || k(c) || k(e)) return [a, b, c, e];
        },
        range: function (a, b) {
          a = A.low(a);
          b = A.high(b);
          if (k(a) || k(b)) return [a, b];
          if (null === a && null === b) return null;
        },
      });
      D = function (a, b, c, e) {
        var d = this,
          g = d.data,
          f = d.options && d.options.data,
          h = [],
          n = [],
          p = [],
          r = a.length,
          t = !!b,
          u = [],
          v = d.pointArrayMap,
          B = v && v.length,
          E = ["x"].concat(v || ["y"]),
          D = this.options.dataGrouping && this.options.dataGrouping.groupAll,
          H = 0,
          G = 0,
          F;
        e =
          "function" === typeof e
            ? e
            : A[e]
            ? A[e]
            : A[(d.getDGApproximation && d.getDGApproximation()) || "average"];
        B
          ? v.forEach(function () {
              u.push([]);
            })
          : u.push([]);
        var L = B || 1;
        for (F = 0; F <= r && !(a[F] >= c[0]); F++);
        for (F; F <= r; F++) {
          for (
            ;
            ("undefined" !== typeof c[H + 1] && a[F] >= c[H + 1]) || F === r;

          ) {
            var I = c[H];
            d.dataGroupInfo = {
              start: D ? G : d.cropStart + G,
              length: u[0].length,
            };
            var J = e.apply(d, u);
            d.pointClass &&
              !y(d.dataGroupInfo.options) &&
              ((d.dataGroupInfo.options = m(
                d.pointClass.prototype.optionsToObject.call(
                  {
                    series: d,
                  },
                  d.options.data[d.cropStart + G]
                )
              )),
              E.forEach(function (a) {
                delete d.dataGroupInfo.options[a];
              }));
            "undefined" !== typeof J &&
              (h.push(I), n.push(J), p.push(d.dataGroupInfo));
            G = F;
            for (I = 0; I < L; I++) (u[I].length = 0), (u[I].hasNulls = !1);
            H += 1;
            if (F === r) break;
          }
          if (F === r) break;
          if (v) {
            I =
              d.options.dataGrouping && d.options.dataGrouping.groupAll
                ? F
                : d.cropStart + F;
            J =
              (g && g[I]) ||
              d.pointClass.prototype.applyOptions.apply(
                {
                  series: d,
                },
                [f[I]]
              );
            var K = void 0;
            for (I = 0; I < B; I++)
              (K = J[v[I]]),
                k(K) ? u[I].push(K) : null === K && (u[I].hasNulls = !0);
          } else
            (I = t ? b[F] : null),
              k(I) ? u[0].push(I) : null === I && (u[0].hasNulls = !0);
        }
        return {
          groupedXData: h,
          groupedYData: n,
          groupMap: p,
        };
      };
      var t = {
          approximations: A,
          groupData: D,
        },
        f = u.processData,
        v = u.generatePoints,
        b = {
          groupPixelWidth: 2,
          dateTimeLabelFormats: {
            millisecond: [
              "%A, %b %e, %H:%M:%S.%L",
              "%A, %b %e, %H:%M:%S.%L",
              "-%H:%M:%S.%L",
            ],
            second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
            minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
            hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
            day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
            week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
            month: ["%B %Y", "%B", "-%B %Y"],
            year: ["%Y", "%Y", "-%Y"],
          },
        },
        E = {
          line: {},
          spline: {},
          area: {},
          areaspline: {},
          arearange: {},
          column: {
            groupPixelWidth: 10,
          },
          columnrange: {
            groupPixelWidth: 10,
          },
          candlestick: {
            groupPixelWidth: 10,
          },
          ohlc: {
            groupPixelWidth: 5,
          },
        },
        P = (F.defaultDataGroupingUnits = [
          ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
          ["second", [1, 2, 5, 10, 15, 30]],
          ["minute", [1, 2, 5, 10, 15, 30]],
          ["hour", [1, 2, 3, 4, 6, 8, 12]],
          ["day", [1]],
          ["week", [1]],
          ["month", [1, 3, 6]],
          ["year", null],
        ]);
      u.getDGApproximation = function () {
        return this.is("arearange")
          ? "range"
          : this.is("ohlc")
          ? "ohlc"
          : this.is("column")
          ? "sum"
          : "average";
      };
      u.groupData = D;
      u.processData = function () {
        var a = this.chart,
          b = this.options.dataGrouping,
          c = !1 !== this.allowDG && b && L(b.enabled, a.options.isStock),
          e = this.visible || !a.options.chart.ignoreHiddenSeries,
          d,
          m = this.currentDataGrouping,
          x = !1;
        this.forceCrop = c;
        this.groupPixelWidth = null;
        this.hasProcessed = !0;
        c && !this.requireSorting && (this.requireSorting = x = !0);
        c = !1 === f.apply(this, arguments) || !c;
        x && (this.requireSorting = !1);
        if (!c) {
          this.destroyGroupedData();
          var w = b.groupAll ? this.xData : this.processedXData,
            q = b.groupAll ? this.yData : this.processedYData;
          c = a.plotSizeX;
          x = this.xAxis;
          var r = x.options.ordinal,
            t = (this.groupPixelWidth =
              x.getGroupPixelWidth && x.getGroupPixelWidth());
          if (t && w && w.length) {
            this.isDirty = d = !0;
            this.points = null;
            var v = x.getExtremes();
            var A = v.min;
            v = v.max;
            r =
              (r &&
                x.ordinal &&
                x.ordinal.getGroupIntervalFactor(A, v, this)) ||
              1;
            c = x.getTimeTicks(
              h.AdditionsClass.prototype.normalizeTimeTickInterval(
                ((t * (v - A)) / c) * r,
                b.units || P
              ),
              Math.min(A, w[0]),
              Math.max(v, w[w.length - 1]),
              x.options.startOfWeek,
              w,
              this.closestPointRange
            );
            t = u.groupData.apply(this, [w, q, c, b.approximation]);
            w = t.groupedXData;
            q = t.groupedYData;
            r = 0;
            b &&
              b.smoothed &&
              w.length &&
              ((b.firstAnchor = "firstPoint"),
              (b.anchor = "middle"),
              (b.lastAnchor = "lastPoint"),
              p(32, !1, a, {
                "dataGrouping.smoothed": "use dataGrouping.anchor",
              }));
            a = w;
            var B = this.options.dataGrouping;
            A = this.currentDataGrouping && this.currentDataGrouping.gapSize;
            if (B && this.xData && A && this.groupMap) {
              var E = a.length - 1;
              var D = B.anchor;
              var G = L(B.firstAnchor, D);
              B = L(B.lastAnchor, D);
              if (D && "start" !== D) {
                var F =
                  A *
                  {
                    middle: 0.5,
                    end: 1,
                  }[D];
                for (D = a.length - 1; D-- && 0 < D; ) a[D] += F;
              }
              if (G && "start" !== G && this.xData[0] >= a[0]) {
                D = this.groupMap[0].start;
                F = this.groupMap[0].length;
                var I = void 0;
                k(D) && k(F) && (I = D + (F - 1));
                a[0] = {
                  middle: a[0] + 0.5 * A,
                  end: a[0] + A,
                  firstPoint: this.xData[0],
                  lastPoint: I && this.xData[I],
                }[G];
              }
              B &&
                "start" !== B &&
                A &&
                a[E] >= v - A &&
                ((v = this.groupMap[this.groupMap.length - 1].start),
                (a[E] = {
                  middle: a[E] + 0.5 * A,
                  end: a[E] + A,
                  firstPoint: v && this.xData[v],
                  lastPoint: this.xData[this.xData.length - 1],
                }[B]));
            }
            for (v = 1; v < c.length; v++)
              (c.info.segmentStarts &&
                -1 !== c.info.segmentStarts.indexOf(v)) ||
                (r = Math.max(c[v] - c[v - 1], r));
            v = c.info;
            v.gapSize = r;
            this.closestPointRange = c.info.totalRange;
            this.groupMap = t.groupMap;
            if (e) {
              e = w;
              if (y(e[0]) && k(x.min) && k(x.dataMin) && e[0] < x.min) {
                if (
                  (!y(x.options.min) && x.min <= x.dataMin) ||
                  x.min === x.dataMin
                )
                  x.min = Math.min(e[0], x.min);
                x.dataMin = Math.min(e[0], x.dataMin);
              }
              if (
                y(e[e.length - 1]) &&
                k(x.max) &&
                k(x.dataMax) &&
                e[e.length - 1] > x.max
              ) {
                if (
                  (!y(x.options.max) && k(x.dataMax) && x.max >= x.dataMax) ||
                  x.max === x.dataMax
                )
                  x.max = Math.max(e[e.length - 1], x.max);
                x.dataMax = Math.max(e[e.length - 1], x.dataMax);
              }
            }
            b.groupAll &&
              ((b = this.cropData(w, q, x.min, x.max, 1)),
              (w = b.xData),
              (q = b.yData),
              (this.cropStart = b.start));
            this.processedXData = w;
            this.processedYData = q;
          } else this.groupMap = null;
          this.hasGroupedData = d;
          this.currentDataGrouping = v;
          this.preventGraphAnimation =
            (m && m.totalRange) !== (v && v.totalRange);
        }
      };
      u.destroyGroupedData = function () {
        this.groupedData &&
          (this.groupedData.forEach(function (a, b) {
            a && (this.groupedData[b] = a.destroy ? a.destroy() : null);
          }, this),
          (this.groupedData.length = 0));
      };
      u.generatePoints = function () {
        v.apply(this);
        this.destroyGroupedData();
        this.groupedData = this.hasGroupedData ? this.points : null;
      };
      K(J, "update", function () {
        if (this.dataGroup) return p(24, !1, this.series.chart), !1;
      });
      K(G, "headerFormatter", function (a) {
        var c = this.chart,
          d = c.time,
          e = a.labelConfig,
          f = e.series,
          h = f.tooltipOptions,
          m = f.options.dataGrouping,
          p = h.xDateFormat,
          q = f.xAxis,
          r = h[(a.isFooter ? "footer" : "header") + "Format"];
        if (q && "datetime" === q.options.type && m && k(e.key)) {
          var t = f.currentDataGrouping;
          m = m.dateTimeLabelFormats || b.dateTimeLabelFormats;
          if (t)
            if (((h = m[t.unitName]), 1 === t.count)) p = h[0];
            else {
              p = h[1];
              var u = h[2];
            }
          else !p && m && (p = this.getXDateFormat(e, h, q));
          p = d.dateFormat(p, e.key);
          u && (p += d.dateFormat(u, e.key + t.totalRange - 1));
          f.chart.styledMode && (r = this.styledModeFormat(r));
          a.text = B(
            r,
            {
              point: N(e.point, {
                key: p,
              }),
              series: f,
            },
            c
          );
          a.preventDefault();
        }
      });
      K(M, "destroy", u.destroyGroupedData);
      K(M, "afterSetOptions", function (a) {
        a = a.options;
        var c = this.type,
          d = this.chart.options.plotOptions,
          e = I.defaultOptions.plotOptions[c].dataGrouping,
          f = this.useCommonDataGrouping && b;
        if (E[c] || f) {
          e || (e = m(b, E[c]));
          var h = this.chart.rangeSelector;
          a.dataGrouping = m(
            f,
            e,
            d.series && d.series.dataGrouping,
            d[c].dataGrouping,
            this.userOptions.dataGrouping,
            !a.isInternal &&
              h &&
              k(h.selected) &&
              h.buttonOptions[h.selected].dataGrouping
          );
        }
      });
      K(d, "afterSetScale", function () {
        this.series.forEach(function (a) {
          a.hasProcessed = !1;
        });
      });
      d.prototype.getGroupPixelWidth = function () {
        var a = this.series,
          c = a.length,
          d,
          e = 0,
          f = !1,
          k;
        for (d = c; d--; )
          (k = a[d].options.dataGrouping) &&
            (e = Math.max(e, L(k.groupPixelWidth, b.groupPixelWidth)));
        for (d = c; d--; )
          (k = a[d].options.dataGrouping) &&
            a[d].hasProcessed &&
            ((c = (a[d].processedXData || a[d].data).length),
            a[d].groupPixelWidth ||
              c > this.chart.plotSizeX / e ||
              (c && k.forced)) &&
            (f = !0);
        return f ? e : 0;
      };
      d.prototype.setDataGrouping = function (a, b) {
        var c;
        b = L(b, !0);
        a ||
          (a = {
            forced: !1,
            units: null,
          });
        if (this instanceof d)
          for (c = this.series.length; c--; )
            this.series[c].update(
              {
                dataGrouping: a,
              },
              !1
            );
        else
          this.chart.options.series.forEach(function (b) {
            b.dataGrouping = a;
          }, !1);
        this.ordinal && (this.ordinal.slope = void 0);
        b && this.chart.redraw();
      };
      F.dataGrouping = t;
      ("");
      return t;
    }
  );
  Q(
    d,
    "Series/OHLC/OHLCPoint.js",
    [d["Core/Series/SeriesRegistry.js"]],
    function (d) {
      var h =
        (this && this.__extends) ||
        (function () {
          var d = function (h, J) {
            d =
              Object.setPrototypeOf ||
              ({
                __proto__: [],
              } instanceof Array &&
                function (d, h) {
                  d.__proto__ = h;
                }) ||
              function (d, h) {
                for (var G in h) h.hasOwnProperty(G) && (d[G] = h[G]);
              };
            return d(h, J);
          };
          return function (h, J) {
            function F() {
              this.constructor = h;
            }
            d(h, J);
            h.prototype =
              null === J
                ? Object.create(J)
                : ((F.prototype = J.prototype), new F());
          };
        })();
      return (function (d) {
        function F() {
          var h = (null !== d && d.apply(this, arguments)) || this;
          h.close = void 0;
          h.high = void 0;
          h.low = void 0;
          h.open = void 0;
          h.options = void 0;
          h.plotClose = void 0;
          h.plotOpen = void 0;
          h.series = void 0;
          return h;
        }
        h(F, d);
        F.prototype.getClassName = function () {
          return (
            d.prototype.getClassName.call(this) +
            (this.open < this.close
              ? " highcharts-point-up"
              : " highcharts-point-down")
          );
        };
        F.prototype.resolveUpColor = function () {
          this.open < this.close &&
            !this.options.color &&
            this.series.options.upColor &&
            (this.color = this.series.options.upColor);
        };
        F.prototype.resolveColor = function () {
          d.prototype.resolveColor.call(this);
          this.resolveUpColor();
        };
        F.prototype.getZone = function () {
          var h = d.prototype.getZone.call(this);
          this.resolveUpColor();
          return h;
        };
        return F;
      })(d.seriesTypes.column.prototype.pointClass);
    }
  );
  Q(
    d,
    "Series/OHLC/OHLCSeries.js",
    [
      d["Series/OHLC/OHLCPoint.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K) {
      var F =
          (this && this.__extends) ||
          (function () {
            var d = function (h, B) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (d, c) {
                    d.__proto__ = c;
                  }) ||
                function (d, c) {
                  for (var a in c) c.hasOwnProperty(a) && (d[a] = c[a]);
                };
              return d(h, B);
            };
            return function (h, B) {
              function u() {
                this.constructor = h;
              }
              d(h, B);
              h.prototype =
                null === B
                  ? Object.create(B)
                  : ((u.prototype = B.prototype), new u());
            };
          })(),
        J = h.seriesTypes.column,
        M = K.extend,
        G = K.merge;
      K = (function (d) {
        function h() {
          var h = (null !== d && d.apply(this, arguments)) || this;
          h.data = void 0;
          h.options = void 0;
          h.points = void 0;
          h.yData = void 0;
          return h;
        }
        F(h, d);
        h.prototype.drawPoints = function () {
          var d = this,
            h = d.chart,
            c = function (a, c, d) {
              var h = a[0];
              a = a[1];
              "number" === typeof h[2] && (h[2] = Math.max(d + c, h[2]));
              "number" === typeof a[2] && (a[2] = Math.min(d - c, a[2]));
            };
          d.points.forEach(function (a) {
            var r = a.graphic,
              u = !r;
            if ("undefined" !== typeof a.plotY) {
              r || (a.graphic = r = h.renderer.path().add(d.group));
              h.styledMode || r.attr(d.pointAttribs(a, a.selected && "select"));
              var p = r.strokeWidth();
              var B = (p % 2) / 2;
              var k = Math.round(a.plotX) - B;
              var m = Math.round(a.shapeArgs.width / 2);
              var D = [
                ["M", k, Math.round(a.yBottom)],
                ["L", k, Math.round(a.plotHigh)],
              ];
              if (null !== a.open) {
                var A = Math.round(a.plotOpen) + B;
                D.push(["M", k, A], ["L", k - m, A]);
                c(D, p / 2, A);
              }
              null !== a.close &&
                ((A = Math.round(a.plotClose) + B),
                D.push(["M", k, A], ["L", k + m, A]),
                c(D, p / 2, A));
              r[u ? "attr" : "animate"]({
                d: D,
              }).addClass(a.getClassName(), !0);
            }
          });
        };
        h.prototype.init = function () {
          d.prototype.init.apply(this, arguments);
          this.options.stacking = void 0;
        };
        h.prototype.pointAttribs = function (h, u) {
          u = d.prototype.pointAttribs.call(this, h, u);
          var c = this.options;
          delete u.fill;
          !h.options.color &&
            c.upColor &&
            h.open < h.close &&
            (u.stroke = c.upColor);
          return u;
        };
        h.prototype.toYData = function (d) {
          return [d.open, d.high, d.low, d.close];
        };
        h.prototype.translate = function () {
          var h = this,
            u = h.yAxis,
            c = !!h.modifyValue,
            a = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
          d.prototype.translate.apply(h);
          h.points.forEach(function (d) {
            [d.open, d.high, d.low, d.close, d.low].forEach(function (r, p) {
              null !== r &&
                (c && (r = h.modifyValue(r)), (d[a[p]] = u.toPixels(r, !0)));
            });
            d.tooltipPos[1] = d.plotHigh + u.pos - h.chart.plotTop;
          });
        };
        h.defaultOptions = G(J.defaultOptions, {
          lineWidth: 1,
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
          },
          threshold: null,
          states: {
            hover: {
              lineWidth: 3,
            },
          },
          stickyTracking: !0,
        });
        return h;
      })(J);
      M(K.prototype, {
        animate: null,
        directTouch: !1,
        pointArrayMap: ["open", "high", "low", "close"],
        pointAttrToOptions: {
          stroke: "color",
          "stroke-width": "lineWidth",
        },
        pointValKey: "close",
      });
      K.prototype.pointClass = d;
      h.registerSeriesType("ohlc", K);
      ("");
      return K;
    }
  );
  Q(
    d,
    "Series/Candlestick/CandlestickSeries.js",
    [
      d["Core/Options.js"],
      d["Core/Color/Palette.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F) {
      var J =
          (this && this.__extends) ||
          (function () {
            var d = function (h, c) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                };
              return d(h, c);
            };
            return function (h, c) {
              function a() {
                this.constructor = h;
              }
              d(h, c);
              h.prototype =
                null === c
                  ? Object.create(c)
                  : ((a.prototype = c.prototype), new a());
            };
          })(),
        M = d.defaultOptions;
      d = K.seriesTypes;
      var G = d.column,
        I = d.ohlc,
        D = F.merge;
      F = (function (d) {
        function u() {
          var c = (null !== d && d.apply(this, arguments)) || this;
          c.data = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        J(u, d);
        u.prototype.pointAttribs = function (c, a) {
          var d = G.prototype.pointAttribs.call(this, c, a),
            h = this.options,
            p = c.open < c.close,
            u = h.lineColor || this.color,
            k = c.color || this.color;
          d["stroke-width"] = h.lineWidth;
          d.fill = c.options.color || (p ? h.upColor || k : k);
          d.stroke = c.options.lineColor || (p ? h.upLineColor || u : u);
          a &&
            ((c = h.states[a]),
            (d.fill = c.color || d.fill),
            (d.stroke = c.lineColor || d.stroke),
            (d["stroke-width"] = c.lineWidth || d["stroke-width"]));
          return d;
        };
        u.prototype.drawPoints = function () {
          var c = this,
            a = c.chart,
            d = c.yAxis.reversed;
          c.points.forEach(function (h) {
            var p = h.graphic,
              r = !p;
            if ("undefined" !== typeof h.plotY) {
              p || (h.graphic = p = a.renderer.path().add(c.group));
              c.chart.styledMode ||
                p
                  .attr(c.pointAttribs(h, h.selected && "select"))
                  .shadow(c.options.shadow);
              var k = (p.strokeWidth() % 2) / 2;
              var m = Math.round(h.plotX) - k;
              var u = h.plotOpen;
              var A = h.plotClose;
              var t = Math.min(u, A);
              u = Math.max(u, A);
              var f = Math.round(h.shapeArgs.width / 2);
              A = d
                ? u !== h.yBottom
                : Math.round(t) !== Math.round(h.plotHigh);
              var v = d
                ? Math.round(t) !== Math.round(h.plotHigh)
                : u !== h.yBottom;
              t = Math.round(t) + k;
              u = Math.round(u) + k;
              k = [];
              k.push(
                ["M", m - f, u],
                ["L", m - f, t],
                ["L", m + f, t],
                ["L", m + f, u],
                ["Z"],
                ["M", m, t],
                ["L", m, A ? Math.round(d ? h.yBottom : h.plotHigh) : t],
                ["M", m, u],
                ["L", m, v ? Math.round(d ? h.plotHigh : h.yBottom) : u]
              );
              p[r ? "attr" : "animate"]({
                d: k,
              }).addClass(h.getClassName(), !0);
            }
          });
        };
        u.defaultOptions = D(I.defaultOptions, M.plotOptions, {
          states: {
            hover: {
              lineWidth: 2,
            },
          },
          tooltip: M.plotOptions.ohlc.tooltip,
          threshold: null,
          lineColor: h.neutralColor100,
          lineWidth: 1,
          upColor: h.backgroundColor,
          stickyTracking: !0,
        });
        return u;
      })(I);
      K.registerSeriesType("candlestick", F);
      ("");
      return F;
    }
  );
  Q(
    d,
    "Series/Flags/FlagsPoint.js",
    [d["Core/Series/SeriesRegistry.js"], d["Core/Utilities.js"]],
    function (d, h) {
      var K =
          (this && this.__extends) ||
          (function () {
            var d = function (h, G) {
              d =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (d, h) {
                    d.__proto__ = h;
                  }) ||
                function (d, h) {
                  for (var B in h) h.hasOwnProperty(B) && (d[B] = h[B]);
                };
              return d(h, G);
            };
            return function (h, G) {
              function F() {
                this.constructor = h;
              }
              d(h, G);
              h.prototype =
                null === G
                  ? Object.create(G)
                  : ((F.prototype = G.prototype), new F());
            };
          })(),
        F = h.isNumber;
      return (function (d) {
        function h() {
          var h = (null !== d && d.apply(this, arguments)) || this;
          h.options = void 0;
          h.series = void 0;
          return h;
        }
        K(h, d);
        h.prototype.isValid = function () {
          return F(this.y) || "undefined" === typeof this.y;
        };
        h.prototype.hasNewShapeType = function () {
          var d = this.options.shape || this.series.options.shape;
          return this.graphic && d && d !== this.graphic.symbolKey;
        };
        return h;
      })(d.seriesTypes.column.prototype.pointClass);
    }
  );
  Q(
    d,
    "Mixins/OnSeries.js",
    [
      d["Series/Column/ColumnSeries.js"],
      d["Core/Series/Series.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K) {
      var F = d.prototype,
        J = h.prototype,
        M = K.defined,
        G = K.stableSort;
      return {
        getPlotBox: function () {
          return J.getPlotBox.call(
            (this.options.onSeries && this.chart.get(this.options.onSeries)) ||
              this
          );
        },
        translate: function () {
          F.translate.apply(this);
          var d = this,
            h = d.options,
            B = d.chart,
            u = d.points,
            c = u.length - 1,
            a,
            r = h.onSeries;
          r = r && B.get(r);
          h = h.onKey || "y";
          var y = r && r.options.step,
            p = r && r.points,
            J = p && p.length,
            k = B.inverted,
            m = d.xAxis,
            L = d.yAxis,
            A = 0,
            t;
          if (r && r.visible && J) {
            A = (r.pointXOffset || 0) + (r.barW || 0) / 2;
            B = r.currentDataGrouping;
            var f = p[J - 1].x + (B ? B.totalRange : 0);
            G(u, function (a, b) {
              return a.x - b.x;
            });
            for (h = "plot" + h[0].toUpperCase() + h.substr(1); J-- && u[c]; ) {
              var v = p[J];
              B = u[c];
              B.y = v.y;
              if (v.x <= B.x && "undefined" !== typeof v[h]) {
                if (
                  B.x <= f &&
                  ((B.plotY = v[h]),
                  v.x < B.x &&
                    !y &&
                    (t = p[J + 1]) &&
                    "undefined" !== typeof t[h])
                ) {
                  var b = (B.x - v.x) / (t.x - v.x);
                  B.plotY += b * (t[h] - v[h]);
                  B.y += b * (t.y - v.y);
                }
                c--;
                J++;
                if (0 > c) break;
              }
            }
          }
          u.forEach(function (b, c) {
            b.plotX += A;
            if ("undefined" === typeof b.plotY || k)
              0 <= b.plotX && b.plotX <= m.len
                ? k
                  ? ((b.plotY = m.translate(b.x, 0, 1, 0, 1)),
                    (b.plotX = M(b.y) ? L.translate(b.y, 0, 0, 0, 1) : 0))
                  : (b.plotY = (m.opposite ? 0 : d.yAxis.len) + m.offset)
                : (b.shapeArgs = {});
            if ((a = u[c - 1]) && a.plotX === b.plotX) {
              "undefined" === typeof a.stackIndex && (a.stackIndex = 0);
              var f = a.stackIndex + 1;
            }
            b.stackIndex = f;
          });
          this.onSeries = r;
        },
      };
    }
  );
  Q(
    d,
    "Series/Flags/FlagsSymbols.js",
    [d["Core/Globals.js"], d["Core/Renderer/SVG/SVGRenderer.js"]],
    function (d, h) {
      function K(d) {
        M[d + "pin"] = function (h, D, B, u, c) {
          var a = c && c.anchorX;
          c = c && c.anchorY;
          "circle" === d && u > B && ((h -= Math.round((u - B) / 2)), (B = u));
          var r = M[d](h, D, B, u);
          if (a && c) {
            var y = a;
            "circle" === d
              ? (y = h + B / 2)
              : ((h = r[0]),
                (B = r[1]),
                "M" === h[0] && "L" === B[0] && (y = (h[1] + B[1]) / 2));
            r.push(["M", y, D > c ? D : D + u], ["L", a, c]);
            r = r.concat(M.circle(a - 1, c - 1, 2, 2));
          }
          return r;
        };
      }
      var F = d.Renderer,
        J = d.VMLRenderer,
        M = h.prototype.symbols;
      M.flag = function (d, h, D, B, u) {
        var c = (u && u.anchorX) || d;
        u = (u && u.anchorY) || h;
        var a = M.circle(c - 1, u - 1, 2, 2);
        a.push(
          ["M", c, u],
          ["L", d, h + B],
          ["L", d, h],
          ["L", d + D, h],
          ["L", d + D, h + B],
          ["L", d, h + B],
          ["Z"]
        );
        return a;
      };
      K("circle");
      K("square");
      F === J &&
        ["circlepin", "flag", "squarepin"].forEach(function (d) {
          J.prototype.symbols[d] = M[d];
        });
      return M;
    }
  );
  Q(
    d,
    "Series/Flags/FlagsSeries.js",
    [
      d["Series/Flags/FlagsPoint.js"],
      d["Core/Globals.js"],
      d["Mixins/OnSeries.js"],
      d["Core/Color/Palette.js"],
      d["Core/Series/SeriesRegistry.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G) {
      var I =
          (this && this.__extends) ||
          (function () {
            var a = function (c, d) {
              a =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]);
                };
              return a(c, d);
            };
            return function (c, d) {
              function h() {
                this.constructor = c;
              }
              a(c, d);
              c.prototype =
                null === d
                  ? Object.create(d)
                  : ((h.prototype = d.prototype), new h());
            };
          })(),
        D = h.noop,
        B = J.series,
        u = J.seriesTypes.column,
        c = G.addEvent,
        a = G.defined,
        r = G.extend,
        y = G.merge,
        p = G.objectEach,
        N = G.wrap;
      G = (function (d) {
        function k() {
          var a = (null !== d && d.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        I(k, d);
        k.prototype.animate = function (a) {
          a && this.setClip();
        };
        k.prototype.drawPoints = function () {
          var c = this.points,
            d = this.chart,
            k = d.renderer,
            f = d.inverted,
            m = this.options,
            b = m.y,
            r,
            u = this.yAxis,
            B = {},
            g = [];
          for (r = c.length; r--; ) {
            var n = c[r];
            var e = (f ? n.plotY : n.plotX) > this.xAxis.len;
            var l = n.plotX;
            var C = n.stackIndex;
            var x = n.options.shape || m.shape;
            var w = n.plotY;
            "undefined" !== typeof w &&
              (w =
                n.plotY +
                b -
                ("undefined" !== typeof C && C * m.stackDistance));
            n.anchorX = C ? void 0 : n.plotX;
            var q = C ? void 0 : n.plotY;
            var z = "flag" !== x;
            C = n.graphic;
            "undefined" !== typeof w && 0 <= l && !e
              ? (C && n.hasNewShapeType() && (C = C.destroy()),
                C ||
                  ((C = n.graphic =
                    k
                      .label("", null, null, x, null, null, m.useHTML)
                      .addClass("highcharts-point")
                      .add(this.markerGroup)),
                  n.graphic.div && (n.graphic.div.point = n),
                  (C.isNew = !0)),
                C.attr({
                  align: z ? "center" : "left",
                  width: m.width,
                  height: m.height,
                  "text-align": m.textAlign,
                }),
                d.styledMode ||
                  C.attr(this.pointAttribs(n))
                    .css(y(m.style, n.style))
                    .shadow(m.shadow),
                0 < l && (l -= C.strokeWidth() % 2),
                (x = {
                  y: w,
                  anchorY: q,
                }),
                m.allowOverlapX && ((x.x = l), (x.anchorX = n.anchorX)),
                C.attr({
                  text: n.options.title || m.title || "A",
                })[C.isNew ? "attr" : "animate"](x),
                m.allowOverlapX ||
                  (B[n.plotX]
                    ? (B[n.plotX].size = Math.max(B[n.plotX].size, C.width))
                    : (B[n.plotX] = {
                        align: z ? 0.5 : 0,
                        size: C.width,
                        target: l,
                        anchorX: l,
                      })),
                (n.tooltipPos = [l, w + u.pos - d.plotTop]))
              : C && (n.graphic = C.destroy());
          }
          m.allowOverlapX ||
            (p(B, function (a) {
              a.plotX = a.anchorX;
              g.push(a);
            }),
            h.distribute(g, f ? u.len : this.xAxis.len, 100),
            c.forEach(function (b) {
              var c = b.graphic && B[b.plotX];
              c &&
                (b.graphic[b.graphic.isNew ? "attr" : "animate"]({
                  x: c.pos + c.align * c.size,
                  anchorX: b.anchorX,
                }),
                a(c.pos)
                  ? (b.graphic.isNew = !1)
                  : (b.graphic.attr({
                      x: -9999,
                      anchorX: -9999,
                    }),
                    (b.graphic.isNew = !0)));
            }));
          m.useHTML &&
            N(this.markerGroup, "on", function (a) {
              return M.prototype.on.apply(
                a.apply(this, [].slice.call(arguments, 1)),
                [].slice.call(arguments, 1)
              );
            });
        };
        k.prototype.drawTracker = function () {
          var a = this.points;
          d.prototype.drawTracker.call(this);
          a.forEach(function (d) {
            var h = d.graphic;
            h &&
              (d.unbindMouseOver && d.unbindMouseOver(),
              (d.unbindMouseOver = c(h.element, "mouseover", function () {
                0 < d.stackIndex &&
                  !d.raised &&
                  ((d._y = h.y),
                  h.attr({
                    y: d._y - 8,
                  }),
                  (d.raised = !0));
                a.forEach(function (a) {
                  a !== d &&
                    a.raised &&
                    a.graphic &&
                    (a.graphic.attr({
                      y: a._y,
                    }),
                    (a.raised = !1));
                });
              })));
          });
        };
        k.prototype.pointAttribs = function (a, c) {
          var d = this.options,
            f = (a && a.color) || this.color,
            h = d.lineColor,
            b = a && a.lineWidth;
          a = (a && a.fillColor) || d.fillColor;
          c &&
            ((a = d.states[c].fillColor),
            (h = d.states[c].lineColor),
            (b = d.states[c].lineWidth));
          return {
            fill: a || f,
            stroke: h || f,
            "stroke-width": b || d.lineWidth || 0,
          };
        };
        k.prototype.setClip = function () {
          B.prototype.setClip.apply(this, arguments);
          !1 !== this.options.clip &&
            this.sharedClipKey &&
            this.markerGroup &&
            this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey]);
        };
        k.defaultOptions = y(u.defaultOptions, {
          pointRange: 0,
          allowOverlapX: !1,
          shape: "flag",
          stackDistance: 12,
          textAlign: "center",
          tooltip: {
            pointFormat: "{point.text}",
          },
          threshold: null,
          y: -30,
          fillColor: F.backgroundColor,
          lineWidth: 1,
          states: {
            hover: {
              lineColor: F.neutralColor100,
              fillColor: F.highlightColor20,
            },
          },
          style: {
            fontSize: "11px",
            fontWeight: "bold",
          },
        });
        return k;
      })(u);
      r(G.prototype, {
        allowDG: !1,
        buildKDTree: D,
        forceCrop: !0,
        getPlotBox: K.getPlotBox,
        init: B.prototype.init,
        invertGroups: D,
        invertible: !1,
        noSharedTooltip: !0,
        pointClass: d,
        sorted: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ["markerGroup"],
        translate: K.translate,
      });
      J.registerSeriesType("flags", G);
      ("");
      ("");
      return G;
    }
  );
  Q(
    d,
    "Extensions/RangeSelector.js",
    [
      d["Core/Axis/Axis.js"],
      d["Core/Chart/Chart.js"],
      d["Core/Globals.js"],
      d["Core/Options.js"],
      d["Core/Color/Palette.js"],
      d["Core/Renderer/SVG/SVGElement.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G) {
      function I(a) {
        if (-1 !== a.indexOf("%L")) return "text";
        var b = "aAdewbBmoyY".split("").some(function (b) {
            return -1 !== a.indexOf("%" + b);
          }),
          c = "HkIlMS".split("").some(function (b) {
            return -1 !== a.indexOf("%" + b);
          });
        return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text";
      }
      var D = F.defaultOptions,
        B = G.addEvent,
        u = G.createElement,
        c = G.css,
        a = G.defined,
        r = G.destroyObjectProperties,
        y = G.discardElement,
        p = G.extend,
        N = G.find,
        k = G.fireEvent,
        m = G.isNumber,
        L = G.merge,
        A = G.objectEach,
        t = G.pad,
        f = G.pick,
        v = G.pInt,
        b = G.splat;
      p(D, {
        rangeSelector: {
          allButtonsEnabled: !1,
          buttons: void 0,
          buttonSpacing: 5,
          dropdown: "responsive",
          enabled: void 0,
          verticalAlign: "top",
          buttonTheme: {
            width: 28,
            height: 18,
            padding: 2,
            zIndex: 7,
          },
          floating: !1,
          x: 0,
          y: 0,
          height: void 0,
          inputBoxBorderColor: "none",
          inputBoxHeight: 17,
          inputBoxWidth: void 0,
          inputDateFormat: "%b %e, %Y",
          inputDateParser: void 0,
          inputEditDateFormat: "%Y-%m-%d",
          inputEnabled: !0,
          inputPosition: {
            align: "right",
            x: 0,
            y: 0,
          },
          inputSpacing: 5,
          selected: void 0,
          buttonPosition: {
            align: "left",
            x: 0,
            y: 0,
          },
          inputStyle: {
            color: J.highlightColor80,
            cursor: "pointer",
          },
          labelStyle: {
            color: J.neutralColor60,
          },
        },
      });
      p(D.lang, {
        rangeSelectorZoom: "Zoom",
        rangeSelectorFrom: "",
        rangeSelectorTo: "\u2192",
      });
      var E = (function () {
        function g(a) {
          this.buttons = void 0;
          this.buttonOptions = g.prototype.defaultButtons;
          this.initialButtonGroupWidth = 0;
          this.options = void 0;
          this.chart = a;
          this.init(a);
        }
        g.prototype.clickButton = function (c, e) {
          var g = this.chart,
            h = this.buttonOptions[c],
            n = g.xAxis[0],
            p = (g.scroller && g.scroller.getUnionExtremes()) || n || {},
            q = p.dataMin,
            r = p.dataMax,
            t = n && Math.round(Math.min(n.max, f(r, n.max))),
            u = h.type;
          p = h._range;
          var v,
            y = h.dataGrouping;
          if (null !== q && null !== r) {
            g.fixedRange = p;
            this.setSelected(c);
            y &&
              ((this.forcedDataGrouping = !0),
              d.prototype.setDataGrouping.call(
                n || {
                  chart: this.chart,
                },
                y,
                !1
              ),
              (this.frozenStates = h.preserveDataGrouping));
            if ("month" === u || "year" === u)
              if (n) {
                u = {
                  range: h,
                  max: t,
                  chart: g,
                  dataMin: q,
                  dataMax: r,
                };
                var A = n.minFromRange.call(u);
                m(u.newMax) && (t = u.newMax);
              } else p = h;
            else if (p) (A = Math.max(t - p, q)), (t = Math.min(A + p, r));
            else if ("ytd" === u)
              if (n)
                "undefined" === typeof r &&
                  ((q = Number.MAX_VALUE),
                  (r = Number.MIN_VALUE),
                  g.series.forEach(function (a) {
                    a = a.xData;
                    q = Math.min(a[0], q);
                    r = Math.max(a[a.length - 1], r);
                  }),
                  (e = !1)),
                  (t = this.getYTDExtremes(r, q, g.time.useUTC)),
                  (A = v = t.min),
                  (t = t.max);
              else {
                this.deferredYTDClick = c;
                return;
              }
            else "all" === u && n && ((A = q), (t = r));
            a(A) && (A += h._offsetMin);
            a(t) && (t += h._offsetMax);
            this.dropdown && (this.dropdown.selectedIndex = c + 1);
            if (n)
              n.setExtremes(A, t, f(e, !0), void 0, {
                trigger: "rangeSelectorButton",
                rangeSelectorButton: h,
              });
            else {
              var E = b(g.options.xAxis)[0];
              var D = E.range;
              E.range = p;
              var F = E.min;
              E.min = v;
              B(g, "load", function () {
                E.range = D;
                E.min = F;
              });
            }
            k(this, "afterBtnClick");
          }
        };
        g.prototype.setSelected = function (a) {
          this.selected = this.options.selected = a;
        };
        g.prototype.init = function (a) {
          var b = this,
            c = a.options.rangeSelector,
            d = c.buttons || b.defaultButtons.slice(),
            g = c.selected,
            f = function () {
              var a = b.minInput,
                c = b.maxInput;
              a && a.blur && k(a, "blur");
              c && c.blur && k(c, "blur");
            };
          b.chart = a;
          b.options = c;
          b.buttons = [];
          b.buttonOptions = d;
          this.eventsToUnbind = [];
          this.eventsToUnbind.push(B(a.container, "mousedown", f));
          this.eventsToUnbind.push(B(a, "resize", f));
          d.forEach(b.computeButtonRange);
          "undefined" !== typeof g && d[g] && this.clickButton(g, !1);
          this.eventsToUnbind.push(
            B(a, "load", function () {
              a.xAxis &&
                a.xAxis[0] &&
                B(a.xAxis[0], "setExtremes", function (c) {
                  this.max - this.min !== a.fixedRange &&
                    "rangeSelectorButton" !== c.trigger &&
                    "updatedData" !== c.trigger &&
                    b.forcedDataGrouping &&
                    !b.frozenStates &&
                    this.setDataGrouping(!1, !1);
                });
            })
          );
        };
        g.prototype.updateButtonStates = function () {
          var a = this,
            b = this.chart,
            c = this.dropdown,
            d = b.xAxis[0],
            g = Math.round(d.max - d.min),
            f = !d.hasVisibleSeries,
            h = (b.scroller && b.scroller.getUnionExtremes()) || d,
            k = h.dataMin,
            p = h.dataMax;
          b = a.getYTDExtremes(p, k, b.time.useUTC);
          var r = b.min,
            t = b.max,
            u = a.selected,
            v = m(u),
            y = a.options.allButtonsEnabled,
            A = a.buttons;
          a.buttonOptions.forEach(function (b, e) {
            var h = b._range,
              l = b.type,
              n = b.count || 1,
              m = A[e],
              q = 0,
              x = b._offsetMax - b._offsetMin;
            b = e === u;
            var w = h > p - k,
              C = h < d.minRange,
              z = !1,
              B = !1;
            h = h === g;
            ("month" === l || "year" === l) &&
            g + 36e5 >=
              864e5 *
                {
                  month: 28,
                  year: 365,
                }[l] *
                n -
                x &&
            g - 36e5 <=
              864e5 *
                {
                  month: 31,
                  year: 366,
                }[l] *
                n +
                x
              ? (h = !0)
              : "ytd" === l
              ? ((h = t - r + x === g), (z = !b))
              : "all" === l &&
                ((h = d.max - d.min >= p - k), (B = !b && v && h));
            l = !y && (w || C || B || f);
            n = (b && h) || (h && !v && !z) || (b && a.frozenStates);
            l ? (q = 3) : n && ((v = !0), (q = 2));
            m.state !== q &&
              (m.setState(q),
              c &&
                ((c.options[e + 1].disabled = l),
                2 === q && (c.selectedIndex = e + 1)),
              0 === q && u === e && a.setSelected());
          });
        };
        g.prototype.computeButtonRange = function (a) {
          var b = a.type,
            c = a.count || 1,
            d = {
              millisecond: 1,
              second: 1e3,
              minute: 6e4,
              hour: 36e5,
              day: 864e5,
              week: 6048e5,
            };
          if (d[b]) a._range = d[b] * c;
          else if ("month" === b || "year" === b)
            a._range =
              864e5 *
              {
                month: 30,
                year: 365,
              }[b] *
              c;
          a._offsetMin = f(a.offsetMin, 0);
          a._offsetMax = f(a.offsetMax, 0);
          a._range += a._offsetMax - a._offsetMin;
        };
        g.prototype.getInputValue = function (a) {
          a = "min" === a ? this.minInput : this.maxInput;
          var b = this.chart.options.rangeSelector,
            c = this.chart.time;
          return a
            ? (
                ("text" === a.type && b.inputDateParser) ||
                this.defaultInputDateParser
              )(a.value, c.useUTC, c)
            : 0;
        };
        g.prototype.setInputValue = function (b, c) {
          var d = this.options,
            e = this.chart.time,
            g = "min" === b ? this.minInput : this.maxInput;
          b = "min" === b ? this.minDateBox : this.maxDateBox;
          if (g) {
            var f = g.getAttribute("data-hc-time");
            f = a(f) ? Number(f) : void 0;
            a(c) &&
              (a(f) && g.setAttribute("data-hc-time-previous", f),
              g.setAttribute("data-hc-time", c),
              (f = c));
            g.value = e.dateFormat(
              this.inputTypeFormats[g.type] || d.inputEditDateFormat,
              f
            );
            b &&
              b.attr({
                text: e.dateFormat(d.inputDateFormat, f),
              });
          }
        };
        g.prototype.setInputExtremes = function (a, b, c) {
          if ((a = "min" === a ? this.minInput : this.maxInput)) {
            var d = this.inputTypeFormats[a.type],
              e = this.chart.time;
            d &&
              ((b = e.dateFormat(d, b)),
              a.min !== b && (a.min = b),
              (c = e.dateFormat(d, c)),
              a.max !== c && (a.max = c));
          }
        };
        g.prototype.showInput = function (a) {
          var b = "min" === a ? this.minDateBox : this.maxDateBox;
          if (
            (a = "min" === a ? this.minInput : this.maxInput) &&
            b &&
            this.inputGroup
          ) {
            var d = "text" === a.type,
              g = this.inputGroup,
              f = g.translateX;
            g = g.translateY;
            var h = this.options.inputBoxWidth;
            c(a, {
              width: d ? b.width + (h ? -2 : 20) + "px" : "auto",
              height: d ? b.height - 2 + "px" : "auto",
              border: "2px solid silver",
            });
            d && h
              ? c(a, {
                  left: f + b.x + "px",
                  top: g + "px",
                })
              : c(a, {
                  left:
                    Math.min(
                      Math.round(b.x + f - (a.offsetWidth - b.width) / 2),
                      this.chart.chartWidth - a.offsetWidth
                    ) + "px",
                  top: g - 1 - (a.offsetHeight - b.height) / 2 + "px",
                });
          }
        };
        g.prototype.hideInput = function (a) {
          (a = "min" === a ? this.minInput : this.maxInput) &&
            c(a, {
              top: "-9999em",
              border: 0,
              width: "1px",
              height: "1px",
            });
        };
        g.prototype.defaultInputDateParser = function (a, b, c) {
          var d = a.split("/").join("-").split(" ").join("T");
          -1 === d.indexOf("T") && (d += "T00:00");
          if (b) d += "Z";
          else {
            var e;
            if ((e = K.isSafari))
              (e = d),
                (e = !(
                  6 < e.length &&
                  (e.lastIndexOf("-") === e.length - 6 ||
                    e.lastIndexOf("+") === e.length - 6)
                ));
            e &&
              ((e = new Date(d).getTimezoneOffset() / 60),
              (d += 0 >= e ? "+" + t(-e) + ":00" : "-" + t(e) + ":00"));
          }
          d = Date.parse(d);
          m(d) ||
            ((a = a.split("-")), (d = Date.UTC(v(a[0]), v(a[1]) - 1, v(a[2]))));
          c && b && m(d) && (d += c.getTimezoneOffset(d));
          return d;
        };
        g.prototype.drawInput = function (a) {
          function b() {
            var b = h.getInputValue(a),
              c = d.xAxis[0],
              e = d.scroller && d.scroller.xAxis ? d.scroller.xAxis : c,
              g = e.dataMin;
            e = e.dataMax;
            var f = h.maxInput,
              k = h.minInput;
            b !== Number(y.getAttribute("data-hc-time-previous")) &&
              m(b) &&
              (y.setAttribute("data-hc-time-previous", b),
              t && f && m(g)
                ? b > Number(f.getAttribute("data-hc-time"))
                  ? (b = void 0)
                  : b < g && (b = g)
                : k &&
                  m(e) &&
                  (b < Number(k.getAttribute("data-hc-time"))
                    ? (b = void 0)
                    : b > e && (b = e)),
              "undefined" !== typeof b &&
                c.setExtremes(t ? b : c.min, t ? c.max : b, void 0, void 0, {
                  trigger: "rangeSelectorInput",
                }));
          }
          var d = this.chart,
            g = this.div,
            f = this.inputGroup,
            h = this,
            k = d.renderer.style || {},
            n = d.renderer,
            r = d.options.rangeSelector,
            t = "min" === a,
            v = D.lang[t ? "rangeSelectorFrom" : "rangeSelectorTo"];
          v = n
            .label(v, 0)
            .addClass("highcharts-range-label")
            .attr({
              padding: v ? 2 : 0,
            })
            .add(f);
          n = n
            .label("", 0)
            .addClass("highcharts-range-input")
            .attr({
              padding: 2,
              width: r.inputBoxWidth,
              height: r.inputBoxHeight,
              "text-align": "center",
            })
            .on("click", function () {
              h.showInput(a);
              h[a + "Input"].focus();
            });
          d.styledMode ||
            n.attr({
              stroke: r.inputBoxBorderColor,
              "stroke-width": 1,
            });
          n.add(f);
          var y = u(
            "input",
            {
              name: a,
              className: "highcharts-range-selector",
            },
            void 0,
            g
          );
          y.setAttribute("type", I(r.inputDateFormat || "%b %e, %Y"));
          d.styledMode ||
            (v.css(L(k, r.labelStyle)),
            n.css(
              L(
                {
                  color: J.neutralColor80,
                },
                k,
                r.inputStyle
              )
            ),
            c(
              y,
              p(
                {
                  position: "absolute",
                  border: 0,
                  boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  textAlign: "center",
                  fontSize: k.fontSize,
                  fontFamily: k.fontFamily,
                  top: "-9999em",
                },
                r.inputStyle
              )
            ));
          y.onfocus = function () {
            h.showInput(a);
          };
          y.onblur = function () {
            y === K.doc.activeElement && b();
            h.hideInput(a);
            h.setInputValue(a);
            y.blur();
          };
          var A = !1;
          y.onchange = function () {
            A || (b(), h.hideInput(a), y.blur());
          };
          y.onkeypress = function (a) {
            13 === a.keyCode && b();
          };
          y.onkeydown = function (a) {
            A = !0;
            (38 !== a.keyCode && 40 !== a.keyCode) || b();
          };
          y.onkeyup = function () {
            A = !1;
          };
          return {
            dateBox: n,
            input: y,
            label: v,
          };
        };
        g.prototype.getPosition = function () {
          var a = this.chart,
            b = a.options.rangeSelector;
          a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
          return {
            buttonTop: a + b.buttonPosition.y,
            inputTop: a + b.inputPosition.y - 10,
          };
        };
        g.prototype.getYTDExtremes = function (a, b, c) {
          var d = this.chart.time,
            e = new d.Date(a),
            g = d.get("FullYear", e);
          c = c ? d.Date.UTC(g, 0, 1) : +new d.Date(g, 0, 1);
          b = Math.max(b, c);
          e = e.getTime();
          return {
            max: Math.min(a || e, e),
            min: b,
          };
        };
        g.prototype.render = function (b, c) {
          var d = this.chart,
            e = d.renderer,
            g = d.container,
            h = d.options,
            k = h.rangeSelector,
            n = f(h.chart.style && h.chart.style.zIndex, 0) + 1;
          h = k.inputEnabled;
          if (!1 !== k.enabled) {
            this.rendered ||
              ((this.group = e
                .g("range-selector-group")
                .attr({
                  zIndex: 7,
                })
                .add()),
              (this.div = u("div", void 0, {
                position: "relative",
                height: 0,
                zIndex: n,
              })),
              this.buttonOptions.length && this.renderButtons(),
              g.parentNode && g.parentNode.insertBefore(this.div, g),
              h &&
                ((this.inputGroup = e.g("input-group").add(this.group)),
                (e = this.drawInput("min")),
                (this.minDateBox = e.dateBox),
                (this.minLabel = e.label),
                (this.minInput = e.input),
                (e = this.drawInput("max")),
                (this.maxDateBox = e.dateBox),
                (this.maxLabel = e.label),
                (this.maxInput = e.input)));
            if (
              h &&
              (this.setInputValue("min", b),
              this.setInputValue("max", c),
              (b =
                (d.scroller && d.scroller.getUnionExtremes()) ||
                d.xAxis[0] ||
                {}),
              a(b.dataMin) &&
                a(b.dataMax) &&
                ((d = d.xAxis[0].minRange || 0),
                this.setInputExtremes(
                  "min",
                  b.dataMin,
                  Math.min(b.dataMax, this.getInputValue("max")) - d
                ),
                this.setInputExtremes(
                  "max",
                  Math.max(b.dataMin, this.getInputValue("min")) + d,
                  b.dataMax
                )),
              this.inputGroup)
            ) {
              var m = 0;
              [
                this.minLabel,
                this.minDateBox,
                this.maxLabel,
                this.maxDateBox,
              ].forEach(function (a) {
                if (a) {
                  var b = a.getBBox().width;
                  b &&
                    (a.attr({
                      x: m,
                    }),
                    (m += b + k.inputSpacing));
                }
              });
            }
            this.alignElements();
            this.rendered = !0;
          }
        };
        g.prototype.renderButtons = function () {
          var a = this,
            b = this.buttons,
            c = this.options,
            d = D.lang,
            g = this.chart.renderer,
            h = L(c.buttonTheme),
            m = h && h.states,
            p = h.width || 28;
          delete h.width;
          delete h.states;
          this.buttonGroup = g.g("range-selector-buttons").add(this.group);
          var r = (this.dropdown = u(
            "select",
            void 0,
            {
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              border: 0,
              top: "-9999em",
              cursor: "pointer",
              opacity: 0.0001,
            },
            this.div
          ));
          B(r, "touchstart", function () {
            r.style.fontSize = "16px";
          });
          [
            [K.isMS ? "mouseover" : "mouseenter"],
            [K.isMS ? "mouseout" : "mouseleave"],
            ["change", "click"],
          ].forEach(function (c) {
            var d = c[0],
              e = c[1];
            B(r, d, function () {
              var c = b[a.currentButtonIndex()];
              c && k(c.element, e || d);
            });
          });
          this.zoomText = g
            .text(d.rangeSelectorZoom, 0, 15)
            .add(this.buttonGroup);
          this.chart.styledMode ||
            (this.zoomText.css(c.labelStyle),
            (h["stroke-width"] = f(h["stroke-width"], 0)));
          u(
            "option",
            {
              textContent: this.zoomText.textStr,
              disabled: !0,
            },
            void 0,
            r
          );
          this.buttonOptions.forEach(function (c, d) {
            u(
              "option",
              {
                textContent: c.title || c.text,
              },
              void 0,
              r
            );
            b[d] = g
              .button(
                c.text,
                0,
                0,
                function (b) {
                  var e = c.events && c.events.click,
                    g;
                  e && (g = e.call(c, b));
                  !1 !== g && a.clickButton(d);
                  a.isActive = !0;
                },
                h,
                m && m.hover,
                m && m.select,
                m && m.disabled
              )
              .attr({
                "text-align": "center",
                width: p,
              })
              .add(a.buttonGroup);
            c.title && b[d].attr("title", c.title);
          });
        };
        g.prototype.alignElements = function () {
          var a = this,
            b = this.buttonGroup,
            c = this.buttons,
            d = this.chart,
            g = this.group,
            h = this.inputGroup,
            k = this.options,
            m = this.zoomText,
            p = d.options,
            r =
              p.exporting &&
              !1 !== p.exporting.enabled &&
              p.navigation &&
              p.navigation.buttonOptions;
          p = k.buttonPosition;
          var t = k.inputPosition,
            u = k.verticalAlign,
            v = function (b, c) {
              return r &&
                a.titleCollision(d) &&
                "top" === u &&
                "right" === c.align &&
                c.y - b.getBBox().height - 12 <
                  (r.y || 0) + (r.height || 0) + d.spacing[0]
                ? -40
                : 0;
            },
            y = d.plotLeft;
          if (g && p && t) {
            var A = p.x - d.spacing[3];
            if (b) {
              this.positionButtons();
              if (!this.initialButtonGroupWidth) {
                var B = 0;
                m && (B += m.getBBox().width + 5);
                c.forEach(function (a, b) {
                  B += a.width;
                  b !== c.length - 1 && (B += k.buttonSpacing);
                });
                this.initialButtonGroupWidth = B;
              }
              y -= d.spacing[3];
              this.updateButtonStates();
              m = v(b, p);
              this.alignButtonGroup(m);
              g.placed = b.placed = d.hasLoaded;
            }
            b = 0;
            h &&
              ((b = v(h, t)),
              "left" === t.align
                ? (A = y)
                : "right" === t.align && (A = -Math.max(d.axisOffset[1], -b)),
              h.align(
                {
                  y: t.y,
                  width: h.getBBox().width,
                  align: t.align,
                  x: t.x + A - 2,
                },
                !0,
                d.spacingBox
              ),
              (h.placed = d.hasLoaded));
            this.handleCollision(b);
            g.align(
              {
                verticalAlign: u,
              },
              !0,
              d.spacingBox
            );
            h = g.alignAttr.translateY;
            b = g.getBBox().height + 20;
            v = 0;
            "bottom" === u &&
              ((v =
                (v = d.legend && d.legend.options) &&
                "bottom" === v.verticalAlign &&
                v.enabled &&
                !v.floating
                  ? d.legend.legendHeight + f(v.margin, 10)
                  : 0),
              (b = b + v - 20),
              (v =
                h -
                b -
                (k.floating ? 0 : k.y) -
                (d.titleOffset ? d.titleOffset[2] : 0) -
                10));
            if ("top" === u)
              k.floating && (v = 0),
                d.titleOffset && d.titleOffset[0] && (v = d.titleOffset[0]),
                (v += d.margin[0] - d.spacing[0] || 0);
            else if ("middle" === u)
              if (t.y === p.y) v = h;
              else if (t.y || p.y)
                v = 0 > t.y || 0 > p.y ? v - Math.min(t.y, p.y) : h - b;
            g.translate(k.x, k.y + Math.floor(v));
            p = this.minInput;
            t = this.maxInput;
            h = this.dropdown;
            k.inputEnabled &&
              p &&
              t &&
              ((p.style.marginTop = g.translateY + "px"),
              (t.style.marginTop = g.translateY + "px"));
            h && (h.style.marginTop = g.translateY + "px");
          }
        };
        g.prototype.alignButtonGroup = function (a, b) {
          var c = this.chart,
            d = this.buttonGroup,
            e = this.options.buttonPosition,
            g = c.plotLeft - c.spacing[3],
            h = e.x - c.spacing[3];
          "right" === e.align
            ? (h += a - g)
            : "center" === e.align && (h -= g / 2);
          d &&
            d.align(
              {
                y: e.y,
                width: f(b, this.initialButtonGroupWidth),
                align: e.align,
                x: h,
              },
              !0,
              c.spacingBox
            );
        };
        g.prototype.positionButtons = function () {
          var a = this.buttons,
            b = this.chart,
            c = this.options,
            d = this.zoomText,
            g = b.hasLoaded ? "animate" : "attr",
            h = c.buttonPosition,
            k = b.plotLeft,
            m = k;
          d &&
            "hidden" !== d.visibility &&
            (d[g]({
              x: f(k + h.x, k),
            }),
            (m += h.x + d.getBBox().width + 5));
          this.buttonOptions.forEach(function (b, d) {
            if ("hidden" !== a[d].visibility)
              a[d][g]({
                x: m,
              }),
                (m += a[d].width + c.buttonSpacing);
            else
              a[d][g]({
                x: k,
              });
          });
        };
        g.prototype.handleCollision = function (a) {
          var b = this,
            c = this.chart,
            d = this.buttonGroup,
            g = this.inputGroup,
            f = this.options,
            h = f.buttonPosition,
            k = f.dropdown,
            n = f.inputPosition;
          f = function () {
            var a = 0;
            b.buttons.forEach(function (b) {
              b = b.getBBox();
              b.width > a && (a = b.width);
            });
            return a;
          };
          var m = function (b) {
              if (g && d) {
                var c =
                    g.alignAttr.translateX +
                    g.alignOptions.x -
                    a +
                    g.getBBox().x +
                    2,
                  e = g.alignOptions.width,
                  f = d.alignAttr.translateX + d.getBBox().x;
                return f + b > c && c + e > f && h.y < n.y + g.getBBox().height;
              }
              return !1;
            },
            p = function () {
              g &&
                d &&
                g.attr({
                  translateX:
                    g.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a),
                  translateY: g.alignAttr.translateY + d.getBBox().height + 10,
                });
            };
          if (d) {
            if ("always" === k) {
              this.collapseButtons(a);
              m(f()) && p();
              return;
            }
            "never" === k && this.expandButtons();
          }
          g && d
            ? n.align === h.align || m(this.initialButtonGroupWidth + 20)
              ? "responsive" === k
                ? (this.collapseButtons(a), m(f()) && p())
                : p()
              : "responsive" === k && this.expandButtons()
            : d &&
              "responsive" === k &&
              (this.initialButtonGroupWidth > c.plotWidth
                ? this.collapseButtons(a)
                : this.expandButtons());
        };
        g.prototype.collapseButtons = function (a) {
          var b = this.buttons,
            c = this.buttonOptions,
            d = this.dropdown,
            g = this.options,
            f = this.zoomText,
            h = function (a) {
              return {
                text: a ? a + " \u25be" : "\u25be",
                width: "auto",
                paddingLeft: 8,
                paddingRight: 8,
              };
            };
          f && f.hide();
          var k = !1;
          c.forEach(function (a, c) {
            c = b[c];
            2 !== c.state ? c.hide() : (c.show(), c.attr(h(a.text)), (k = !0));
          });
          k ||
            (d && (d.selectedIndex = 0),
            b[0].show(),
            b[0].attr(h(this.zoomText && this.zoomText.textStr)));
          c = g.buttonPosition.align;
          this.positionButtons();
          ("right" !== c && "center" !== c) ||
            this.alignButtonGroup(
              a,
              b[this.currentButtonIndex()].getBBox().width
            );
          this.showDropdown();
        };
        g.prototype.expandButtons = function () {
          var a = this.buttons,
            b = this.buttonOptions,
            c = this.options,
            d = this.zoomText;
          this.hideDropdown();
          d && d.show();
          b.forEach(function (b, d) {
            d = a[d];
            d.show();
            d.attr({
              text: b.text,
              width: c.buttonTheme.width || 28,
              paddingLeft: "unset",
              paddingRight: "unset",
            });
            2 > d.state && d.setState(0);
          });
          this.positionButtons();
        };
        g.prototype.currentButtonIndex = function () {
          var a = this.dropdown;
          return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0;
        };
        g.prototype.showDropdown = function () {
          var a = this.buttonGroup,
            b = this.buttons,
            d = this.chart,
            g = this.dropdown;
          if (a && g) {
            var f = a.translateX;
            a = a.translateY;
            b = b[this.currentButtonIndex()].getBBox();
            c(g, {
              left: d.plotLeft + f + "px",
              top: a + 0.5 + "px",
              width: b.width + "px",
              height: b.height + "px",
            });
            this.hasVisibleDropdown = !0;
          }
        };
        g.prototype.hideDropdown = function () {
          var a = this.dropdown;
          a &&
            (c(a, {
              top: "-9999em",
              width: "1px",
              height: "1px",
            }),
            (this.hasVisibleDropdown = !1));
        };
        g.prototype.getHeight = function () {
          var a = this.options,
            b = this.group,
            c = a.y,
            d = a.buttonPosition.y,
            g = a.inputPosition.y;
          if (a.height) return a.height;
          this.alignElements();
          a = b ? b.getBBox(!0).height + 13 + c : 0;
          b = Math.min(g, d);
          if ((0 > g && 0 > d) || (0 < g && 0 < d)) a += Math.abs(b);
          return a;
        };
        g.prototype.titleCollision = function (a) {
          return !(a.options.title.text || a.options.subtitle.text);
        };
        g.prototype.update = function (a) {
          var b = this.chart;
          L(!0, b.options.rangeSelector, a);
          this.destroy();
          this.init(b);
          this.render();
        };
        g.prototype.destroy = function () {
          var a = this,
            b = a.minInput,
            c = a.maxInput;
          a.eventsToUnbind &&
            (a.eventsToUnbind.forEach(function (a) {
              return a();
            }),
            (a.eventsToUnbind = void 0));
          r(a.buttons);
          b && (b.onfocus = b.onblur = b.onchange = null);
          c && (c.onfocus = c.onblur = c.onchange = null);
          A(
            a,
            function (b, c) {
              b &&
                "chart" !== c &&
                (b instanceof M
                  ? b.destroy()
                  : b instanceof window.HTMLElement && y(b));
              b !== g.prototype[c] && (a[c] = null);
            },
            this
          );
        };
        return g;
      })();
      E.prototype.defaultButtons = [
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 month",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          title: "View 3 months",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
          title: "View 6 months",
        },
        {
          type: "ytd",
          text: "YTD",
          title: "View year to date",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
          title: "View 1 year",
        },
        {
          type: "all",
          text: "All",
          title: "View all",
        },
      ];
      E.prototype.inputTypeFormats = {
        "datetime-local": "%Y-%m-%dT%H:%M:%S",
        date: "%Y-%m-%d",
        time: "%H:%M:%S",
      };
      d.prototype.minFromRange = function () {
        var a = this.range,
          b = a.type,
          c = this.max,
          d = this.chart.time,
          h = function (a, c) {
            var e = "year" === b ? "FullYear" : "Month",
              g = new d.Date(a),
              f = d.get(e, g);
            d.set(e, g, f + c);
            f === d.get(e, g) && d.set("Date", g, 0);
            return g.getTime() - a;
          };
        if (m(a)) {
          var k = c - a;
          var p = a;
        } else
          (k = c + h(c, -a.count)),
            this.chart && (this.chart.fixedRange = c - k);
        var q = f(this.dataMin, Number.MIN_VALUE);
        m(k) || (k = q);
        k <= q &&
          ((k = q),
          "undefined" === typeof p && (p = h(k, a.count)),
          (this.newMax = Math.min(k + p, this.dataMax)));
        m(c) || (k = void 0);
        return k;
      };
      if (!K.RangeSelector) {
        var P = [],
          H = function (a) {
            function b() {
              d &&
                ((c = a.xAxis[0].getExtremes()),
                (g = a.legend),
                (h = d && d.options.verticalAlign),
                m(c.min) && d.render(c.min, c.max),
                g.display &&
                  "top" === h &&
                  h === g.options.verticalAlign &&
                  ((f = L(a.spacingBox)),
                  (f.y =
                    "vertical" === g.options.layout
                      ? a.plotTop
                      : f.y + d.getHeight()),
                  (g.group.placed = !1),
                  g.align(f)));
            }
            var c,
              d = a.rangeSelector,
              g,
              f,
              h;
            d &&
              (N(P, function (b) {
                return b[0] === a;
              }) ||
                P.push([
                  a,
                  [
                    B(a.xAxis[0], "afterSetExtremes", function (a) {
                      d && d.render(a.min, a.max);
                    }),
                    B(a, "redraw", b),
                  ],
                ]),
              b());
          };
        B(h, "afterGetContainer", function () {
          this.options.rangeSelector &&
            this.options.rangeSelector.enabled &&
            (this.rangeSelector = new E(this));
        });
        B(h, "beforeRender", function () {
          var a = this.axes,
            b = this.rangeSelector;
          b &&
            (m(b.deferredYTDClick) &&
              (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick),
            a.forEach(function (a) {
              a.updateNames();
              a.setScale();
            }),
            this.getAxisMargins(),
            b.render(),
            (a = b.options.verticalAlign),
            b.options.floating ||
              ("bottom" === a
                ? (this.extraBottomMargin = !0)
                : "middle" !== a && (this.extraTopMargin = !0)));
        });
        B(h, "update", function (b) {
          var c = b.options.rangeSelector;
          b = this.rangeSelector;
          var d = this.extraBottomMargin,
            g = this.extraTopMargin;
          c &&
            c.enabled &&
            !a(b) &&
            this.options.rangeSelector &&
            ((this.options.rangeSelector.enabled = !0),
            (this.rangeSelector = b = new E(this)));
          this.extraTopMargin = this.extraBottomMargin = !1;
          b &&
            (H(this),
            (c =
              (c && c.verticalAlign) || (b.options && b.options.verticalAlign)),
            b.options.floating ||
              ("bottom" === c
                ? (this.extraBottomMargin = !0)
                : "middle" !== c && (this.extraTopMargin = !0)),
            this.extraBottomMargin !== d || this.extraTopMargin !== g) &&
            (this.isDirtyBox = !0);
        });
        B(h, "render", function () {
          var a = this.rangeSelector;
          a &&
            !a.options.floating &&
            (a.render(),
            (a = a.options.verticalAlign),
            "bottom" === a
              ? (this.extraBottomMargin = !0)
              : "middle" !== a && (this.extraTopMargin = !0));
        });
        B(h, "getMargins", function () {
          var a = this.rangeSelector;
          a &&
            ((a = a.getHeight()),
            this.extraTopMargin && (this.plotTop += a),
            this.extraBottomMargin && (this.marginBottom += a));
        });
        h.prototype.callbacks.push(H);
        B(h, "destroy", function () {
          for (var a = 0; a < P.length; a++) {
            var b = P[a];
            if (b[0] === this) {
              b[1].forEach(function (a) {
                return a();
              });
              P.splice(a, 1);
              break;
            }
          }
        });
        K.RangeSelector = E;
      }
      return K.RangeSelector;
    }
  );
  Q(
    d,
    "Core/Chart/StockChart.js",
    [
      d["Core/Animation/AnimationUtilities.js"],
      d["Core/Axis/Axis.js"],
      d["Core/Chart/Chart.js"],
      d["Core/FormatUtilities.js"],
      d["Core/Options.js"],
      d["Core/Color/Palette.js"],
      d["Core/Series/Point.js"],
      d["Core/Series/Series.js"],
      d["Core/Renderer/SVG/SVGRenderer.js"],
      d["Core/Utilities.js"],
    ],
    function (d, h, K, F, J, M, G, I, D, B) {
      function u(a, b) {
        return "xAxis" === a
          ? {
              minPadding: 0,
              maxPadding: 0,
              overscroll: 0,
              ordinal: !0,
              title: {
                text: null,
              },
              labels: {
                overflow: "justify",
              },
              showLastLabel: !0,
            }
          : "yAxis" === a
          ? {
              labels: {
                y: -2,
              },
              opposite: g(b.opposite, !0),
              showLastLabel: !(!b.categories && "category" !== b.type),
              title: {
                text: null,
              },
            }
          : {};
      }
      function c(a, b) {
        if ("xAxis" === a) {
          a = p();
          var c = {
            type: "datetime",
            categories: void 0,
          };
          g(b.navigator && b.navigator.enabled, a.navigator.enabled, !0) &&
            ((c.startOnTick = !1), (c.endOnTick = !1));
          return c;
        }
        return {};
      }
      var a =
          (this && this.__extends) ||
          (function () {
            var a = function (b, c) {
              a =
                Object.setPrototypeOf ||
                ({
                  __proto__: [],
                } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(b, c);
            };
            return function (b, c) {
              function d() {
                this.constructor = b;
              }
              a(b, c);
              b.prototype =
                null === c
                  ? Object.create(c)
                  : ((d.prototype = c.prototype), new d());
            };
          })(),
        r = d.animObject,
        y = F.format,
        p = J.getOptions,
        N = G.prototype.tooltipFormatter;
      d = I.prototype;
      var k = d.init,
        m = d.processData;
      d = B.addEvent;
      var L = B.arrayMax,
        A = B.arrayMin,
        t = B.clamp,
        f = B.defined,
        v = B.extend,
        b = B.find,
        E = B.isNumber,
        P = B.isString,
        H = B.merge,
        g = B.pick,
        n = B.splat;
      B = (function (b) {
        function d() {
          return (null !== b && b.apply(this, arguments)) || this;
        }
        a(d, b);
        d.prototype.init = function (a, d) {
          var e = p(),
            f = a.xAxis,
            h = a.yAxis,
            k = g(a.navigator && a.navigator.enabled, e.navigator.enabled, !0);
          a.xAxis = a.yAxis = void 0;
          k = H(
            {
              chart: {
                panning: {
                  enabled: !0,
                  type: "x",
                },
                pinchType: "x",
              },
              navigator: {
                enabled: k,
              },
              scrollbar: {
                enabled: g(e.scrollbar.enabled, !0),
              },
              rangeSelector: {
                enabled: g(e.rangeSelector.enabled, !0),
              },
              title: {
                text: null,
              },
              tooltip: {
                split: g(e.tooltip.split, !0),
                crosshairs: !0,
              },
              legend: {
                enabled: !1,
              },
            },
            a,
            {
              isStock: !0,
            }
          );
          a.xAxis = f;
          a.yAxis = h;
          k.xAxis = n(a.xAxis || {}).map(function (b, d) {
            return H(
              u("xAxis", b),
              e.xAxis,
              e.xAxis && e.xAxis[d],
              b,
              c("xAxis", a)
            );
          });
          k.yAxis = n(a.yAxis || {}).map(function (a, b) {
            return H(u("yAxis", a), e.yAxis, e.yAxis && e.yAxis[b], a);
          });
          b.prototype.init.call(this, k, d);
        };
        d.prototype.createAxis = function (a, d) {
          d.axis = H(u(a, d.axis), d.axis, c(a, this.userOptions));
          return b.prototype.createAxis.call(this, a, d);
        };
        return d;
      })(K);
      (function (a) {
        a.stockChart = function (b, c, d) {
          return new a(b, c, d);
        };
      })(B || (B = {}));
      d(I, "setOptions", function (a) {
        var b;
        this.chart.options.isStock &&
          (this.is("column") || this.is("columnrange")
            ? (b = {
                borderWidth: 0,
                shadow: !1,
              })
            : this.is("scatter") ||
              this.is("sma") ||
              (b = {
                marker: {
                  enabled: !1,
                  radius: 2,
                },
              }),
          b && (a.plotOptions[this.type] = H(a.plotOptions[this.type], b)));
      });
      d(h, "autoLabelAlign", function (a) {
        var b = this.chart,
          c = this.options;
        b = b._labelPanes = b._labelPanes || {};
        var d = this.options.labels;
        this.chart.options.isStock &&
          "yAxis" === this.coll &&
          ((c = c.top + "," + c.height),
          !b[c] &&
            d.enabled &&
            (15 === d.x && (d.x = 0),
            "undefined" === typeof d.align && (d.align = "right"),
            (b[c] = this),
            (a.align = "right"),
            a.preventDefault()));
      });
      d(h, "destroy", function () {
        var a = this.chart,
          b = this.options && this.options.top + "," + this.options.height;
        b &&
          a._labelPanes &&
          a._labelPanes[b] === this &&
          delete a._labelPanes[b];
      });
      d(h, "getPlotLinePath", function (a) {
        function c(a) {
          var b = "xAxis" === a ? "yAxis" : "xAxis";
          a = d.options[b];
          return E(a)
            ? [h[b][a]]
            : P(a)
            ? [h.get(a)]
            : e.map(function (a) {
                return a[b];
              });
        }
        var d = this,
          e =
            this.isLinked && !this.series
              ? this.linkedParent.series
              : this.series,
          h = d.chart,
          k = h.renderer,
          m = d.left,
          n = d.top,
          p,
          r,
          u,
          v,
          y = [],
          A = [],
          B = a.translatedValue,
          D = a.value,
          F = a.force;
        if (
          (h.options.isStock && !1 !== a.acrossPanes && "xAxis" === d.coll) ||
          "yAxis" === d.coll
        ) {
          a.preventDefault();
          A = c(d.coll);
          var G = d.isXAxis ? h.yAxis : h.xAxis;
          G.forEach(function (a) {
            if (
              f(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1
            ) {
              var b = a.isXAxis ? "yAxis" : "xAxis";
              b = f(a.options[b]) ? h[b][a.options[b]] : h[b][0];
              d === b && A.push(a);
            }
          });
          var H = A.length ? [] : [d.isXAxis ? h.yAxis[0] : h.xAxis[0]];
          A.forEach(function (a) {
            -1 !== H.indexOf(a) ||
              b(H, function (b) {
                return b.pos === a.pos && b.len === a.len;
              }) ||
              H.push(a);
          });
          var I = g(B, d.translate(D, null, null, a.old));
          E(I) &&
            (d.horiz
              ? H.forEach(function (a) {
                  var b;
                  r = a.pos;
                  v = r + a.len;
                  p = u = Math.round(I + d.transB);
                  "pass" !== F &&
                    (p < m || p > m + d.width) &&
                    (F ? (p = u = t(p, m, m + d.width)) : (b = !0));
                  b || y.push(["M", p, r], ["L", u, v]);
                })
              : H.forEach(function (a) {
                  var b;
                  p = a.pos;
                  u = p + a.len;
                  r = v = Math.round(n + d.height - I);
                  "pass" !== F &&
                    (r < n || r > n + d.height) &&
                    (F ? (r = v = t(r, n, n + d.height)) : (b = !0));
                  b || y.push(["M", p, r], ["L", u, v]);
                }));
          a.path = 0 < y.length ? k.crispPolyLine(y, a.lineWidth || 1) : null;
        }
      });
      D.prototype.crispPolyLine = function (a, b) {
        for (var c = 0; c < a.length; c += 2) {
          var d = a[c],
            e = a[c + 1];
          d[1] === e[1] && (d[1] = e[1] = Math.round(d[1]) - (b % 2) / 2);
          d[2] === e[2] && (d[2] = e[2] = Math.round(d[2]) + (b % 2) / 2);
        }
        return a;
      };
      d(h, "afterHideCrosshair", function () {
        this.crossLabel && (this.crossLabel = this.crossLabel.hide());
      });
      d(h, "afterDrawCrosshair", function (a) {
        var b, c;
        if (
          this.crosshair &&
          this.crosshair.label &&
          this.crosshair.label.enabled &&
          this.cross &&
          E(this.min) &&
          E(this.max)
        ) {
          var d = this.chart,
            e = this.logarithmic,
            f = this.crosshair.label,
            h = this.horiz,
            k = this.opposite,
            m = this.left,
            n = this.top,
            p = this.crossLabel,
            r = f.format,
            t = "",
            u = "inside" === this.options.tickPosition,
            A = !1 !== this.crosshair.snap,
            B = 0,
            D = a.e || (this.cross && this.cross.e);
          a = a.point;
          var F = this.min,
            G = this.max;
          e && ((F = e.lin2log(F)), (G = e.lin2log(G)));
          e = h
            ? "center"
            : k
            ? "right" === this.labelAlign
              ? "right"
              : "left"
            : "left" === this.labelAlign
            ? "left"
            : "center";
          p ||
            ((p = this.crossLabel =
              d.renderer
                .label("", 0, void 0, f.shape || "callout")
                .addClass(
                  "highcharts-crosshair-label" +
                    (this.series[0] &&
                      " highcharts-color-" + this.series[0].colorIndex)
                )
                .attr({
                  align: f.align || e,
                  padding: g(f.padding, 8),
                  r: g(f.borderRadius, 3),
                  zIndex: 2,
                })
                .add(this.labelGroup)),
            d.styledMode ||
              p
                .attr({
                  fill:
                    f.backgroundColor ||
                    (a && a.series && a.series.color) ||
                    M.neutralColor60,
                  stroke: f.borderColor || "",
                  "stroke-width": f.borderWidth || 0,
                })
                .css(
                  v(
                    {
                      color: M.backgroundColor,
                      fontWeight: "normal",
                      fontSize: "11px",
                      textAlign: "center",
                    },
                    f.style || {}
                  )
                ));
          h
            ? ((e = A ? (a.plotX || 0) + m : D.chartX),
              (n += k ? 0 : this.height))
            : ((e = k ? this.width + m : 0),
              (n = A ? (a.plotY || 0) + n : D.chartY));
          r ||
            f.formatter ||
            (this.dateTime && (t = "%b %d, %Y"),
            (r = "{value" + (t ? ":" + t : "") + "}"));
          t = A
            ? this.isXAxis
              ? a.x
              : a.y
            : this.toValue(h ? D.chartX : D.chartY);
          A = a ? a.series.isPointInside(a) : E(t) && t > F && t < G;
          D = "";
          r
            ? (D = y(
                r,
                {
                  value: t,
                },
                d
              ))
            : f.formatter && E(t) && (D = f.formatter.call(this, t));
          p.attr({
            text: D,
            x: e,
            y: n,
            visibility: A ? "visible" : "hidden",
          });
          f = p.getBBox();
          if (E(p.y))
            if (h) {
              if ((u && !k) || (!u && k)) n = p.y - f.height;
            } else n = p.y - f.height / 2;
          h
            ? ((b = m - f.x), (c = m + this.width - f.x))
            : ((b = "left" === this.labelAlign ? m : 0),
              (c =
                "right" === this.labelAlign ? m + this.width : d.chartWidth));
          p.translateX < b && (B = b - p.translateX);
          p.translateX + f.width >= c && (B = -(p.translateX + f.width - c));
          p.attr({
            x: e + B,
            y: n,
            anchorX: h ? e : this.opposite ? 0 : d.chartWidth,
            anchorY: h ? (this.opposite ? d.chartHeight : 0) : n + f.height / 2,
          });
        }
      });
      I.prototype.init = function () {
        k.apply(this, arguments);
        this.initCompare(this.options.compare);
      };
      I.prototype.setCompare = function (a) {
        this.initCompare(a);
        this.userOptions.compare = a;
      };
      I.prototype.initCompare = function (a) {
        this.modifyValue =
          "value" === a || "percent" === a
            ? function (b, c) {
                var d = this.compareValue;
                return "undefined" !== typeof b && "undefined" !== typeof d
                  ? ((b =
                      "value" === a
                        ? b - d
                        : (b / d) * 100 -
                          (100 === this.options.compareBase ? 0 : 100)),
                    c && (c.change = b),
                    b)
                  : 0;
              }
            : null;
        this.chart.hasRendered && (this.isDirty = !0);
      };
      I.prototype.processData = function (a) {
        var b,
          c = -1,
          d = !0 === this.options.compareStart ? 0 : 1;
        m.apply(this, arguments);
        if (this.xAxis && this.processedYData) {
          var e = this.processedXData;
          var f = this.processedYData;
          var g = f.length;
          this.pointArrayMap &&
            (c = this.pointArrayMap.indexOf(
              this.options.pointValKey || this.pointValKey || "y"
            ));
          for (b = 0; b < g - d; b++) {
            var h = f[b] && -1 < c ? f[b][c] : f[b];
            if (E(h) && e[b + d] >= this.xAxis.min && 0 !== h) {
              this.compareValue = h;
              break;
            }
          }
        }
      };
      d(I, "afterGetExtremes", function (a) {
        a = a.dataExtremes;
        if (this.modifyValue && a) {
          var b = [this.modifyValue(a.dataMin), this.modifyValue(a.dataMax)];
          a.dataMin = A(b);
          a.dataMax = L(b);
        }
      });
      h.prototype.setCompare = function (a, b) {
        this.isXAxis ||
          (this.series.forEach(function (b) {
            b.setCompare(a);
          }),
          g(b, !0) && this.chart.redraw());
      };
      G.prototype.tooltipFormatter = function (a) {
        var b = this.series.chart.numberFormatter;
        a = a.replace(
          "{point.change}",
          (0 < this.change ? "+" : "") +
            b(this.change, g(this.series.tooltipOptions.changeDecimals, 2))
        );
        return N.apply(this, [a]);
      };
      d(I, "render", function () {
        var a = this.chart;
        if (
          !((a.is3d && a.is3d()) || a.polar) &&
          this.xAxis &&
          !this.xAxis.isRadial &&
          !1 !== this.options.clip
        ) {
          var b = this.yAxis.len;
          if (this.xAxis.axisLine) {
            var c = a.plotTop + a.plotHeight - this.yAxis.pos - this.yAxis.len,
              d = Math.floor(this.xAxis.axisLine.strokeWidth() / 2);
            0 <= c && (b -= Math.max(d - c, 0));
          }
          if (
            !a.hasRendered ||
            (!this.clipBox && this.isDirty && !this.isDirtyData)
          )
            (this.clipBox = this.clipBox || H(a.clipBox)),
              (this.clipBox.width = this.xAxis.len),
              (this.clipBox.height = b);
          a.hasRendered &&
            ((c = r(this.options.animation)),
            (c = this.getSharedClipKey(c)),
            (d = a.sharedClips[c])) &&
            (d.animate({
              width: this.xAxis.len,
              height: b,
            }),
            (a = a.sharedClips[c + "m"]) &&
              a.animate({
                width: this.xAxis.len,
              }));
        }
      });
      d(K, "update", function (a) {
        a = a.options;
        "scrollbar" in a &&
          this.navigator &&
          (H(!0, this.options.scrollbar, a.scrollbar),
          this.navigator.update({}, !1),
          delete a.scrollbar);
      });
      ("");
      return B;
    }
  );
  Q(
    d,
    "masters/modules/stock.src.js",
    [d["Core/Globals.js"], d["Core/Chart/StockChart.js"]],
    function (d, h) {
      d.StockChart = d.stockChart = h.stockChart;
    }
  );
  Q(
    d,
    "masters/highstock.src.js",
    [d["masters/highcharts.src.js"]],
    function (d) {
      d.product = "Highstock";
      return d;
    }
  );
  d["masters/highstock.src.js"]._modules = d;
  return d["masters/highstock.src.js"];
});
//# sourceMappingURL=highstock.js.map
