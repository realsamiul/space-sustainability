// STANDALONE CUSTOM OMEGA SPACE SUSTAINABILITY SITE LOGIC
// Extracted from Module 849 of appv2.js (unpacked & unminified)

    849(t, e, n) {
      "use strict";

      n.d(e, {
        d: () => Xu
      });
      var r = {};
      n.r(r);
      n.d(r, {
        BackToTop: () => pu,
        Body: () => za,
        ButtonAnim: () => wa,
        Carousel: () => Fs,
        Crew: () => il,
        CrewNoLine: () => Rl,
        Cursor: () => ou,
        GlobeIntro: () => Ka,
        GlobeIntroNoLine: () => Bl,
        Header: () => Ca,
        HeaderDom: () => Vu,
        HeroAnimation: () => pa,
        NumberCount: () => Zs,
        NumberIcon: () => oa,
        Privateer: () => pl,
        ResizeMobile: () => xs,
        ScrollCta: () => Ql,
        Test: () => ds,
        ToggleAnimations: () => xu,
        ToggleContrast: () => Ru,
        Wayfinder: () => xl
      });
      var i = n(504);
      var o = n(268);
      function s() {
        s = Object.assign ? Object.assign.bind() : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n) {
              if (Object.prototype.hasOwnProperty.call(n, r)) {
                t[r] = n[r];
              }
            }
          }
          return t;
        };
        return s.apply(this, arguments);
      }
      function a(t, e) {
        let n = t % e;
        if (e > 0 && n < 0 || e < 0 && n > 0) {
          n += e;
        }
        return n;
      }
      const l = ["duration", "easing"];
      class u {
        to(t, e = {}) {
          let {
            duration: n = 1,
            easing: r = t => t
          } = e;
          let i = function (t, e) {
            if (t == null) {
              return {};
            }
            var n;
            var r;
            var i = {};
            var o = Object.keys(t);
            for (r = 0; r < o.length; r++) {
              if (!(e.indexOf(n = o[r]) >= 0)) {
                i[n] = t[n];
              }
            }
            return i;
          }(e, l);
          this.target = t;
          this.fromKeys = s({}, i);
          this.toKeys = s({}, i);
          this.keys = Object.keys(s({}, i));
          this.keys.forEach(e => {
            this.fromKeys[e] = t[e];
          });
          this.duration = n;
          this.easing = r;
          this.currentTime = 0;
          this.isRunning = true;
        }
        stop() {
          this.isRunning = false;
        }
        raf(t) {
          if (!this.isRunning) {
            return;
          }
          this.currentTime = Math.min(this.currentTime + t, this.duration);
          const e = this.progress >= 1 ? 1 : this.easing(this.progress);
          this.keys.forEach(t => {
            const n = this.fromKeys[t];
            this.target[t] = n + (this.toKeys[t] - n) * e;
          });
          if (e === 1) {
            this.stop();
          }
        }
        get progress() {
          return this.currentTime / this.duration;
        }
      }
      class c extends i.TinyEmitter {
        constructor({
          duration: t = 1.2,
          easing: e = t => Math.min(1, 1.001 - Math.pow(2, t * -10)),
          smooth: n = true,
          mouseMultiplier: r = 1,
          smoothTouch: i = false,
          touchMultiplier: s = 2,
          direction: a = "vertical",
          gestureDirection: l = "vertical",
          infinite: c = false,
          wrapper: h = window,
          content: f = document.body
        } = {}) {
          var p;
          var d;
          var m;
          super();
          this.onWindowResize = () => {
            this.wrapperWidth = window.innerWidth;
            this.wrapperHeight = window.innerHeight;
          };
          this.onWrapperResize = ([t]) => {
            if (t) {
              const e = t.contentRect;
              this.wrapperWidth = e.width;
              this.wrapperHeight = e.height;
            }
          };
          this.onContentResize = ([t]) => {
            if (t) {
              const e = t.contentRect;
              this.contentWidth = e.width;
              this.contentHeight = e.height;
            }
          };
          this.onVirtualScroll = ({
            deltaY: t,
            deltaX: e,
            originalEvent: n
          }) => {
            if (this.gestureDirection === "vertical" && t === 0 || this.gestureDirection === "horizontal" && e === 0) {
              return;
            }
            const r = !!n.composedPath().find(t => t.hasAttribute && t.hasAttribute("data-lenis-prevent"));
            if (n.ctrlKey || r) {
              return;
            }
            this.smooth = n.changedTouches ? this.smoothTouch : this.options.smooth;
            if (this.stopped) {
              n.preventDefault();
              return;
            }
            if (!this.smooth) {
              return;
            }
            if (n.buttons === 4) {
              return;
            }
            if (this.smooth) {
              n.preventDefault();
            }
            let i = 0;
            i = this.gestureDirection === "both" ? e + t : this.gestureDirection === "horizontal" ? e : t;
            this.targetScroll -= i;
            this.scrollTo(this.targetScroll);
          };
          this.onScroll = t => {
            if (!this.isScrolling || !this.smooth) {
              this.targetScroll = this.scroll = this.lastScroll = this.wrapperNode[this.scrollProperty];
              this.notify();
            }
          };
          window.lenisVersion = "0.2.28";
          this.options = {
            duration: t,
            easing: e,
            smooth: n,
            mouseMultiplier: r,
            smoothTouch: i,
            touchMultiplier: s,
            direction: a,
            gestureDirection: l,
            infinite: c,
            wrapper: h,
            content: f
          };
          this.duration = t;
          this.easing = e;
          this.smooth = n;
          this.mouseMultiplier = r;
          this.smoothTouch = i;
          this.touchMultiplier = s;
          this.direction = a;
          this.gestureDirection = l;
          this.infinite = c;
          this.wrapperNode = h;
          this.contentNode = f;
          this.wrapperNode.addEventListener("scroll", this.onScroll);
          if (this.wrapperNode === window) {
            this.wrapperNode.addEventListener("resize", this.onWindowResize);
            this.onWindowResize();
          } else {
            this.wrapperHeight = this.wrapperNode.offsetHeight;
            this.wrapperWidth = this.wrapperNode.offsetWidth;
            this.wrapperObserver = new ResizeObserver(this.onWrapperResize);
            this.wrapperObserver.observe(this.wrapperNode);
          }
          this.contentHeight = this.contentNode.offsetHeight;
          this.contentWidth = this.contentNode.offsetWidth;
          this.contentObserver = new ResizeObserver(this.onContentResize);
          this.contentObserver.observe(this.contentNode);
          this.targetScroll = this.scroll = this.lastScroll = this.wrapperNode[this.scrollProperty];
          this.animate = new u();
          const g = ((p = navigator) == null || (d = p.userAgentData) == null ? undefined : d.platform) || ((m = navigator) == null ? undefined : m.platform) || "unknown";
          this.virtualScroll = new o({
            el: this.wrapperNode,
            firefoxMultiplier: 50,
            mouseMultiplier: this.mouseMultiplier * (g.includes("Win") || g.includes("Linux") ? 0.84 : 0.4),
            touchMultiplier: this.touchMultiplier,
            passive: false,
            useKeyboard: false,
            useTouch: true
          });
          this.virtualScroll.on(this.onVirtualScroll);
        }
        get scrollProperty() {
          let t;
          t = this.wrapperNode === window ? this.direction === "horizontal" ? "scrollX" : "scrollY" : this.direction === "horizontal" ? "scrollLeft" : "scrollTop";
          return t;
        }
        start() {
          let t = this.wrapperNode;
          if (this.wrapperNode === window) {
            t = document.documentElement;
          }
          t.classList.remove("lenis-stopped");
          this.stopped = false;
        }
        stop() {
          let t = this.wrapperNode;
          if (this.wrapperNode === window) {
            t = document.documentElement;
          }
          t.classList.add("lenis-stopped");
          this.stopped = true;
          this.animate.stop();
        }
        destroy() {
          var t;
          if (this.wrapperNode === window) {
            this.wrapperNode.removeEventListener("resize", this.onWindowResize);
          }
          this.wrapperNode.removeEventListener("scroll", this.onScroll);
          this.virtualScroll.destroy();
          if ((t = this.wrapperObserver) != null) {
            t.disconnect();
          }
          this.contentObserver.disconnect();
        }
        get limit() {
          if (this.direction === "horizontal") {
            return this.contentWidth - this.wrapperWidth;
          } else {
            return this.contentHeight - this.wrapperHeight;
          }
        }
        raf(t) {
          const e = t - (this.now || 0);
          this.now = t;
          if (!this.stopped && this.smooth) {
            this.lastScroll = this.scroll;
            this.animate.raf(e * 0.001);
            if (this.scroll === this.targetScroll) {
              this.lastScroll = this.scroll;
            }
            if (this.isScrolling) {
              this.setScroll(this.scroll);
              this.notify();
            }
            this.isScrolling = this.scroll !== this.targetScroll;
          }
        }
        get velocity() {
          return this.scroll - this.lastScroll;
        }
        setScroll(t) {
          let e = this.infinite ? a(t, this.limit) : t;
          if (this.direction === "horizontal") {
            this.wrapperNode.scrollTo(e, 0);
          } else {
            this.wrapperNode.scrollTo(0, e);
          }
        }
        notify() {
          let t = this.infinite ? a(this.scroll, this.limit) : this.scroll;
          this.emit("scroll", {
            scroll: t,
            limit: this.limit,
            velocity: this.velocity,
            direction: this.velocity === 0 ? 0 : this.velocity > 0 ? 1 : -1,
            progress: t / this.limit
          });
        }
        scrollTo(t, {
          offset: e = 0,
          immediate: n = false,
          duration: r = this.duration,
          easing: i = this.easing
        } = {}) {
          if (t == null || this.stopped) {
            return;
          }
          let o;
          if (typeof t == "number") {
            o = t;
          } else if (t === "top" || t === "#top") {
            o = 0;
          } else if (t === "bottom") {
            o = this.limit;
          } else {
            let e;
            if (typeof t == "string") {
              e = document.querySelector(t);
            } else {
              if (t == null || !t.nodeType) {
                return;
              }
              e = t;
            }
            if (!e) {
              return;
            }
            let n = 0;
            if (this.wrapperNode !== window) {
              const t = this.wrapperNode.getBoundingClientRect();
              n = this.direction === "horizontal" ? t.left : t.top;
            }
            const r = e.getBoundingClientRect();
            o = (this.direction === "horizontal" ? r.left : r.top) + this.scroll - n;
          }
          o += e;
          this.targetScroll = this.infinite ? o : Math.max(0, Math.min(o, this.limit));
          if (!this.smooth || n) {
            this.animate.stop();
            this.scroll = this.lastScroll = this.targetScroll;
            this.setScroll(this.targetScroll);
          } else {
            this.animate.to(this, {
              duration: r,
              easing: i,
              scroll: this.targetScroll
            });
          }
        }
      }
      var h = new c({
        duration: 1.5,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, t * -10));
        },
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 0.5,
        smoothTouch: true,
        touchMultiplier: 9,
        infinite: false
      });
      requestAnimationFrame(function t(e) {
        h.raf(e);
        requestAnimationFrame(t);
      });
      var f = n(517);
      function p(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, r.key, r);
        }
      }
      var d;
      var m;
      var g;
      var v;
      var y;
      var b;
      var _;
      var w;
      var x;
      var S;
      var T;
      var M;
      var P;
      function E() {
        return d || typeof window != "undefined" && (d = window.gsap) && d.registerPlugin && d;
      }
      var O = 1;
      var C = [];
      var A = [];
      var R = [];
      var L = Date.now;
      function D(t, e) {
        return e;
      }
      function I(t, e) {
        return ~R.indexOf(t) && R[R.indexOf(t) + 1][e];
      }
      function k(t) {
        return !!~S.indexOf(t);
      }
      function j(t, e, n, r, i) {
        return t.addEventListener(e, n, {
          passive: r !== false,
          capture: !!i
        });
      }
      function N(t, e, n, r) {
        return t.removeEventListener(e, n, !!r);
      }
      var z = "scrollLeft";
      var U = "scrollTop";
      function F() {
        return T && T.isPressed || A.cache++;
      }
      function B(t, e) {
        var n = function n(r) {
          if (r || r === 0) {
            if (O) {
              g.history.scrollRestoration = "manual";
            }
            var i = T && T.isPressed;
            r = n.v = Math.round(r) || (T && T.iOS ? 1 : 0);
            t(r);
            n.cacheID = A.cache;
            if (i) {
              D("ss", r);
            }
          } else if (e || A.cache !== n.cacheID || D("ref")) {
            n.cacheID = A.cache;
            n.v = t();
          }
          return n.v + n.offset;
        };
        n.offset = 0;
        return t && n;
      }
      var H = {
        s: z,
        p: "left",
        p2: "Left",
        os: "right",
        os2: "Right",
        d: "width",
        d2: "Width",
        a: "x",
        sc: B(function (t) {
          if (arguments.length) {
            return g.scrollTo(t, W.sc());
          } else {
            return g.pageXOffset || v[z] || y[z] || b[z] || 0;
          }
        })
      };
      var W = {
        s: U,
        p: "top",
        p2: "Top",
        os: "bottom",
        os2: "Bottom",
        d: "height",
        d2: "Height",
        a: "y",
        op: H,
        sc: B(function (t) {
          if (arguments.length) {
            return g.scrollTo(H.sc(), t);
          } else {
            return g.pageYOffset || v[U] || y[U] || b[U] || 0;
          }
        })
      };
      function V(t, e) {
        return (e && e._ctx && e._ctx.selector || d.utils.toArray)(t)[0] || (typeof t == "string" && d.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
      }
      function G(t, e) {
        var n = e.s;
        var r = e.sc;
        if (k(t)) {
          t = v.scrollingElement || y;
        }
        var i = A.indexOf(t);
        var o = r === W.sc ? 1 : 2;
        if (!~i) {
          i = A.push(t) - 1;
        }
        if (!A[i + o]) {
          j(t, "scroll", F);
        }
        var s = A[i + o];
        var a = s || (A[i + o] = B(I(t, n), true) || (k(t) ? r : B(function (e) {
          if (arguments.length) {
            return t[n] = e;
          } else {
            return t[n];
          }
        })));
        a.target = t;
        if (!s) {
          a.smooth = d.getProperty(t, "scrollBehavior") === "smooth";
        }
        return a;
      }
      function q(t, e, n) {
        var r = t;
        var i = t;
        var o = L();
        var s = o;
        var a = e || 50;
        var l = Math.max(500, a * 3);
        function u(t, e) {
          var l = L();
          if (e || l - o > a) {
            i = r;
            r = t;
            s = o;
            o = l;
          } else if (n) {
            r += t;
          } else {
            r = i + (t - i) / (l - s) * (o - s);
          }
        }
        return {
          update: u,
          reset: function () {
            i = r = n ? 0 : r;
            s = o = 0;
          },
          getVelocity: function (t) {
            var e = s;
            var a = i;
            var c = L();
            if ((t || t === 0) && t !== r) {
              u(t);
            }
            if (o === s || c - s > l) {
              return 0;
            } else {
              return (r + (n ? a : -a)) / ((n ? c : o) - e) * 1000;
            }
          }
        };
      }
      function X(t, e) {
        if (e && !t._gsapAllow) {
          t.preventDefault();
        }
        if (t.changedTouches) {
          return t.changedTouches[0];
        } else {
          return t;
        }
      }
      function Y(t) {
        var e = Math.max.apply(Math, t);
        var n = Math.min.apply(Math, t);
        if (Math.abs(e) >= Math.abs(n)) {
          return e;
        } else {
          return n;
        }
      }
      function K() {
        if ((x = d.core.globals().ScrollTrigger) && x.core) {
          (function () {
            var t = x.core;
            var e = t.bridge || {};
            var n = t._scrollers;
            var r = t._proxies;
            n.push.apply(n, A);
            r.push.apply(r, R);
            A = n;
            R = r;
            D = function (t, n) {
              return e[t](n);
            };
          })();
        }
      }
      function Q(t) {
        d = t || E();
        if (!m && d && typeof document != "undefined" && document.body) {
          g = window;
          v = document;
          y = v.documentElement;
          b = v.body;
          S = [g, v, y, b];
          d.utils.clamp;
          P = d.core.context || function () {};
          w = "onpointerenter" in b ? "pointer" : "mouse";
          _ = Z.isTouch = g.matchMedia && g.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in g || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
          M = Z.eventTypes = ("ontouchstart" in y ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in y ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(",");
          setTimeout(function () {
            return O = 0;
          }, 500);
          K();
          m = 1;
        }
        return m;
      }
      H.op = W;
      A.cache = 0;
      var Z = function () {
        function t(t) {
          this.init(t);
        }
        var e;
        var n;
        var r;
        t.prototype.init = function (t) {
          if (!m && !Q(d)) {
            console.warn("Please gsap.registerPlugin(Observer)");
          }
          if (!x) {
            K();
          }
          var e = t.tolerance;
          var n = t.dragMinimum;
          var r = t.type;
          var i = t.target;
          var o = t.lineHeight;
          var s = t.debounce;
          var a = t.preventDefault;
          var l = t.onStop;
          var u = t.onStopDelay;
          var c = t.ignore;
          var h = t.wheelSpeed;
          var f = t.event;
          var p = t.onDragStart;
          var S = t.onDragEnd;
          var E = t.onDrag;
          var O = t.onPress;
          var A = t.onRelease;
          var R = t.onRight;
          var D = t.onLeft;
          var I = t.onUp;
          var z = t.onDown;
          var U = t.onChangeX;
          var B = t.onChangeY;
          var Z = t.onChange;
          var J = t.onToggleX;
          var $ = t.onToggleY;
          var tt = t.onHover;
          var et = t.onHoverEnd;
          var nt = t.onMove;
          var rt = t.ignoreCheck;
          var it = t.isNormalizer;
          var ot = t.onGestureStart;
          var st = t.onGestureEnd;
          var at = t.onWheel;
          var lt = t.onEnable;
          var ut = t.onDisable;
          var ct = t.onClick;
          var ht = t.scrollSpeed;
          var ft = t.capture;
          var pt = t.allowClicks;
          var dt = t.lockAxis;
          var mt = t.onLockAxis;
          this.target = i = V(i) || y;
          this.vars = t;
          c &&= d.utils.toArray(c);
          e = e || 1e-9;
          n = n || 0;
          h = h || 1;
          ht = ht || 1;
          r = r || "wheel,touch,pointer";
          s = s !== false;
          o ||= parseFloat(g.getComputedStyle(b).lineHeight) || 22;
          var gt;
          var vt;
          var yt;
          var bt;
          var _t;
          var wt;
          var xt;
          var St = this;
          var Tt = 0;
          var Mt = 0;
          var Pt = t.passive || !a && t.passive !== false;
          var Et = G(i, H);
          var Ot = G(i, W);
          var Ct = Et();
          var At = Ot();
          var Rt = ~r.indexOf("touch") && !~r.indexOf("pointer") && M[0] === "pointerdown";
          var Lt = k(i);
          var Dt = i.ownerDocument || v;
          var It = [0, 0, 0];
          var kt = [0, 0, 0];
          var jt = 0;
          function Nt() {
            return jt = L();
          }
          function zt(t, e) {
            return (St.event = t) && c && function (t, e) {
              for (var n = e.length; n--;) {
                if (e[n] === t || e[n].contains(t)) {
                  return true;
                }
              }
              return false;
            }(t.target, c) || e && Rt && t.pointerType !== "touch" || rt && rt(t, e);
          }
          function Ut() {
            var t = St.deltaX = Y(It);
            var n = St.deltaY = Y(kt);
            var r = Math.abs(t) >= e;
            var i = Math.abs(n) >= e;
            if (Z && (r || i)) {
              Z(St, t, n, It, kt);
            }
            if (r) {
              if (R && St.deltaX > 0) {
                R(St);
              }
              if (D && St.deltaX < 0) {
                D(St);
              }
              if (U) {
                U(St);
              }
              if (J && St.deltaX < 0 != Tt < 0) {
                J(St);
              }
              Tt = St.deltaX;
              It[0] = It[1] = It[2] = 0;
            }
            if (i) {
              if (z && St.deltaY > 0) {
                z(St);
              }
              if (I && St.deltaY < 0) {
                I(St);
              }
              if (B) {
                B(St);
              }
              if ($ && St.deltaY < 0 != Mt < 0) {
                $(St);
              }
              Mt = St.deltaY;
              kt[0] = kt[1] = kt[2] = 0;
            }
            if (bt || yt) {
              if (nt) {
                nt(St);
              }
              if (yt) {
                if (p && yt === 1) {
                  p(St);
                }
                if (E) {
                  E(St);
                }
                yt = 0;
              }
              bt = false;
            }
            if (wt && !(wt = false) && mt) {
              mt(St);
            }
            if (_t) {
              at(St);
              _t = false;
            }
            gt = 0;
          }
          function Ft(t, e, n) {
            It[n] += t;
            kt[n] += e;
            St._vx.update(t);
            St._vy.update(e);
            if (s) {
              gt ||= requestAnimationFrame(Ut);
            } else {
              Ut();
            }
          }
          function Bt(t, e) {
            if (dt && !xt) {
              St.axis = xt = Math.abs(t) > Math.abs(e) ? "x" : "y";
              wt = true;
            }
            if (xt !== "y") {
              It[2] += t;
              St._vx.update(t, true);
            }
            if (xt !== "x") {
              kt[2] += e;
              St._vy.update(e, true);
            }
            if (s) {
              gt ||= requestAnimationFrame(Ut);
            } else {
              Ut();
            }
          }
          function Ht(t) {
            if (!zt(t, 1)) {
              var e = (t = X(t, a)).clientX;
              var r = t.clientY;
              var i = e - St.x;
              var o = r - St.y;
              var s = St.isDragging;
              St.x = e;
              St.y = r;
              if (s || (i || o) && (Math.abs(St.startX - e) >= n || Math.abs(St.startY - r) >= n)) {
                yt ||= s ? 2 : 1;
                if (!s) {
                  St.isDragging = true;
                }
                Bt(i, o);
              }
            }
          }
          var Wt = St.onPress = function (t) {
            if (!zt(t, 1) && (!t || !t.button)) {
              St.axis = xt = null;
              vt.pause();
              St.isPressed = true;
              t = X(t);
              Tt = Mt = 0;
              St.startX = St.x = t.clientX;
              St.startY = St.y = t.clientY;
              St._vx.reset();
              St._vy.reset();
              j(it ? i : Dt, M[1], Ht, Pt, true);
              St.deltaX = St.deltaY = 0;
              if (O) {
                O(St);
              }
            }
          };
          var Vt = St.onRelease = function (t) {
            if (!zt(t, 1)) {
              N(it ? i : Dt, M[1], Ht, true);
              var e = !isNaN(St.y - St.startY);
              var n = St.isDragging;
              var r = n && (Math.abs(St.x - St.startX) > 3 || Math.abs(St.y - St.startY) > 3);
              var o = X(t);
              if (!r && e) {
                St._vx.reset();
                St._vy.reset();
                if (a && pt) {
                  d.delayedCall(0.08, function () {
                    if (L() - jt > 300 && !t.defaultPrevented) {
                      if (t.target.click) {
                        t.target.click();
                      } else if (Dt.createEvent) {
                        var e = Dt.createEvent("MouseEvents");
                        e.initMouseEvent("click", true, true, g, 1, o.screenX, o.screenY, o.clientX, o.clientY, false, false, false, false, 0, null);
                        t.target.dispatchEvent(e);
                      }
                    }
                  });
                }
              }
              St.isDragging = St.isGesturing = St.isPressed = false;
              if (l && n && !it) {
                vt.restart(true);
              }
              if (yt) {
                Ut();
              }
              if (S && n) {
                S(St);
              }
              if (A) {
                A(St, r);
              }
            }
          };
          function Gt(t) {
            return t.touches && t.touches.length > 1 && (St.isGesturing = true) && ot(t, St.isDragging);
          }
          function qt() {
            return (St.isGesturing = false) || st(St);
          }
          function Xt(t) {
            if (!zt(t)) {
              var e = Et();
              var n = Ot();
              Ft((e - Ct) * ht, (n - At) * ht, 1);
              Ct = e;
              At = n;
              if (l) {
                vt.restart(true);
              }
            }
          }
          function Yt(t) {
            if (!zt(t)) {
              t = X(t, a);
              if (at) {
                _t = true;
              }
              var e = (t.deltaMode === 1 ? o : t.deltaMode === 2 ? g.innerHeight : 1) * h;
              Ft(t.deltaX * e, t.deltaY * e, 0);
              if (l && !it) {
                vt.restart(true);
              }
            }
          }
          function Kt(t) {
            if (!zt(t)) {
              var e = t.clientX;
              var n = t.clientY;
              var r = e - St.x;
              var i = n - St.y;
              St.x = e;
              St.y = n;
              bt = true;
              if (l) {
                vt.restart(true);
              }
              if (r || i) {
                Bt(r, i);
              }
            }
          }
          function Qt(t) {
            St.event = t;
            tt(St);
          }
          function Zt(t) {
            St.event = t;
            et(St);
          }
          function Jt(t) {
            return zt(t) || X(t, a) && ct(St);
          }
          vt = St._dc = d.delayedCall(u || 0.25, function () {
            St._vx.reset();
            St._vy.reset();
            vt.pause();
            if (l) {
              l(St);
            }
          }).pause();
          St.deltaX = St.deltaY = 0;
          St._vx = q(0, 50, true);
          St._vy = q(0, 50, true);
          St.scrollX = Et;
          St.scrollY = Ot;
          St.isDragging = St.isGesturing = St.isPressed = false;
          P(this);
          St.enable = function (t) {
            if (!St.isEnabled) {
              j(Lt ? Dt : i, "scroll", F);
              if (r.indexOf("scroll") >= 0) {
                j(Lt ? Dt : i, "scroll", Xt, Pt, ft);
              }
              if (r.indexOf("wheel") >= 0) {
                j(i, "wheel", Yt, Pt, ft);
              }
              if (r.indexOf("touch") >= 0 && _ || r.indexOf("pointer") >= 0) {
                j(i, M[0], Wt, Pt, ft);
                j(Dt, M[2], Vt);
                j(Dt, M[3], Vt);
                if (pt) {
                  j(i, "click", Nt, true, true);
                }
                if (ct) {
                  j(i, "click", Jt);
                }
                if (ot) {
                  j(Dt, "gesturestart", Gt);
                }
                if (st) {
                  j(Dt, "gestureend", qt);
                }
                if (tt) {
                  j(i, w + "enter", Qt);
                }
                if (et) {
                  j(i, w + "leave", Zt);
                }
                if (nt) {
                  j(i, w + "move", Kt);
                }
              }
              St.isEnabled = true;
              St.isDragging = St.isGesturing = St.isPressed = bt = yt = false;
              St._vx.reset();
              St._vy.reset();
              Ct = Et();
              At = Ot();
              if (t && t.type) {
                Wt(t);
              }
              if (lt) {
                lt(St);
              }
            }
            return St;
          };
          St.disable = function () {
            if (St.isEnabled) {
              if (!C.filter(function (t) {
                return t !== St && k(t.target);
              }).length) {
                N(Lt ? Dt : i, "scroll", F);
              }
              if (St.isPressed) {
                St._vx.reset();
                St._vy.reset();
                N(it ? i : Dt, M[1], Ht, true);
              }
              N(Lt ? Dt : i, "scroll", Xt, ft);
              N(i, "wheel", Yt, ft);
              N(i, M[0], Wt, ft);
              N(Dt, M[2], Vt);
              N(Dt, M[3], Vt);
              N(i, "click", Nt, true);
              N(i, "click", Jt);
              N(Dt, "gesturestart", Gt);
              N(Dt, "gestureend", qt);
              N(i, w + "enter", Qt);
              N(i, w + "leave", Zt);
              N(i, w + "move", Kt);
              St.isEnabled = St.isPressed = St.isDragging = false;
              if (ut) {
                ut(St);
              }
            }
          };
          St.kill = St.revert = function () {
            St.disable();
            var t = C.indexOf(St);
            if (t >= 0) {
              C.splice(t, 1);
            }
            if (T === St) {
              T = 0;
            }
          };
          C.push(St);
          if (it && k(i)) {
            T = St;
          }
          St.enable(f);
        };
        e = t;
        if (n = [{
          key: "velocityX",
          get: function () {
            return this._vx.getVelocity();
          }
        }, {
          key: "velocityY",
          get: function () {
            return this._vy.getVelocity();
          }
        }]) {
          p(e.prototype, n);
        }
        if (r) {
          p(e, r);
        }
        return t;
      }();
      Z.version = "3.14.2";
      Z.create = function (t) {
        return new Z(t);
      };
      Z.register = Q;
      Z.getAll = function () {
        return C.slice();
      };
      Z.getById = function (t) {
        return C.filter(function (e) {
          return e.vars.id === t;
        })[0];
      };
      if (E()) {
        d.registerPlugin(Z);
      }
      var J;
      var $;
      var tt;
      var et;
      var nt;
      var rt;
      var it;
      var ot;
      var st;
      var at;
      var lt;
      var ut;
      var ct;
      var ht;
      var ft;
      var pt;
      var dt;
      var mt;
      var gt;
      var vt;
      var yt;
      var bt;
      var _t;
      var wt;
      var xt;
      var St;
      var Tt;
      var Mt;
      var Pt;
      var Et;
      var Ot;
      var Ct;
      var At;
      var Rt;
      var Lt;
      var Dt;
      var It;
      var kt;
      var jt = 1;
      var Nt = Date.now;
      var zt = Nt();
      var Ut = 0;
      var Ft = 0;
      function Bt(t, e, n) {
        var r = ee(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
        n["_" + e + "Clamp"] = r;
        if (r) {
          return t.substr(6, t.length - 7);
        } else {
          return t;
        }
      }
      function Ht(t, e) {
        if (!e || ee(t) && t.substr(0, 6) === "clamp(") {
          return t;
        } else {
          return "clamp(" + t + ")";
        }
      }
      var Wt = function t() {
        return Ft && requestAnimationFrame(t);
      };
      function Vt() {
        return ht = 1;
      }
      function Gt() {
        return ht = 0;
      }
      function qt(t) {
        return t;
      }
      function Xt(t) {
        return Math.round(t * 100000) / 100000 || 0;
      }
      function Yt() {
        return typeof window != "undefined";
      }
      function Kt() {
        return J || Yt() && (J = window.gsap) && J.registerPlugin && J;
      }
      function Qt(t) {
        return !!~it.indexOf(t);
      }
      function Zt(t) {
        return (t === "Height" ? Ot : tt["inner" + t]) || nt["client" + t] || rt["client" + t];
      }
      function Jt(t) {
        return I(t, "getBoundingClientRect") || (Qt(t) ? function () {
          pn.width = tt.innerWidth;
          pn.height = Ot;
          return pn;
        } : function () {
          return Te(t);
        });
      }
      function $t(t, e) {
        var n = e.s;
        var r = e.d2;
        var i = e.d;
        var o = e.a;
        return Math.max(0, (n = "scroll" + r) && (o = I(t, n)) ? o() - Jt(t)()[i] : Qt(t) ? (nt[n] || rt[n]) - Zt(r) : t[n] - t["offset" + r]);
      }
      function te(t, e) {
        for (var n = 0; n < gt.length; n += 3) {
          if (!e || ~e.indexOf(gt[n + 1])) {
            t(gt[n], gt[n + 1], gt[n + 2]);
          }
        }
      }
      function ee(t) {
        return typeof t == "string";
      }
      function ne(t) {
        return typeof t == "function";
      }
      function re(t) {
        return typeof t == "number";
      }
      function ie(t) {
        return typeof t == "object";
      }
      function oe(t, e, n) {
        return t && t.progress(e ? 0 : 1) && n && t.pause();
      }
      function se(t, e) {
        if (t.enabled) {
          var n = t._ctx ? t._ctx.add(function () {
            return e(t);
          }) : e(t);
          if (n && n.totalTime) {
            t.callbackAnimation = n;
          }
        }
      }
      var ae = Math.abs;
      var le = "left";
      var ue = "right";
      var ce = "bottom";
      var he = "width";
      var fe = "height";
      var pe = "Right";
      var de = "Left";
      var me = "Top";
      var ge = "Bottom";
      var ve = "padding";
      var ye = "margin";
      var be = "Width";
      var _e = "Height";
      var we = "px";
      function xe(t) {
        return tt.getComputedStyle(t);
      }
      function Se(t, e) {
        for (var n in e) {
          if (!(n in t)) {
            t[n] = e[n];
          }
        }
        return t;
      }
      function Te(t, e) {
        var n = e && xe(t)[ft] !== "matrix(1, 0, 0, 1, 0, 0)" && J.to(t, {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewX: 0,
          skewY: 0
        }).progress(1);
        var r = t.getBoundingClientRect();
        if (n) {
          n.progress(0).kill();
        }
        return r;
      }
      function Me(t, e) {
        var n = e.d2;
        return t["offset" + n] || t["client" + n] || 0;
      }
      function Pe(t) {
        var e;
        var n = [];
        var r = t.labels;
        var i = t.duration();
        for (e in r) {
          n.push(r[e] / i);
        }
        return n;
      }
      function Ee(t) {
        var e = J.utils.snap(t);
        var n = Array.isArray(t) && t.slice(0).sort(function (t, e) {
          return t - e;
        });
        if (n) {
          return function (t, r, i) {
            var o;
            if (i === undefined) {
              i = 0.001;
            }
            if (!r) {
              return e(t);
            }
            if (r > 0) {
              t -= i;
              o = 0;
              for (; o < n.length; o++) {
                if (n[o] >= t) {
                  return n[o];
                }
              }
              return n[o - 1];
            }
            o = n.length;
            t += i;
            while (o--) {
              if (n[o] <= t) {
                return n[o];
              }
            }
            return n[0];
          };
        } else {
          return function (n, r, i = 0.001) {
            var o = e(n);
            if (!r || Math.abs(o - n) < i || o - n < 0 == r < 0) {
              return o;
            } else {
              return e(r < 0 ? n - t : n + t);
            }
          };
        }
      }
      function Oe(t, e, n, r) {
        return n.split(",").forEach(function (n) {
          return t(e, n, r);
        });
      }
      function Ce(t, e, n, r, i) {
        return t.addEventListener(e, n, {
          passive: !r,
          capture: !!i
        });
      }
      function Ae(t, e, n, r) {
        return t.removeEventListener(e, n, !!r);
      }
      function Re(t, e, n) {
        if (n = n && n.wheelHandler) {
          t(e, "wheel", n);
          t(e, "touchmove", n);
        }
      }
      var Le = {
        startColor: "green",
        endColor: "red",
        indent: 0,
        fontSize: "16px",
        fontWeight: "normal"
      };
      var De = {
        toggleActions: "play",
        anticipatePin: 0
      };
      var Ie = {
        top: 0,
        left: 0,
        center: 0.5,
        bottom: 1,
        right: 1
      };
      function ke(t, e) {
        if (ee(t)) {
          var n = t.indexOf("=");
          var r = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
          if (~n) {
            if (t.indexOf("%") > n) {
              r *= e / 100;
            }
            t = t.substr(0, n - 1);
          }
          t = r + (t in Ie ? Ie[t] * e : ~t.indexOf("%") ? parseFloat(t) * e / 100 : parseFloat(t) || 0);
        }
        return t;
      }
      function je(t, e, n, r, i, o, s, a) {
        var l = i.startColor;
        var u = i.endColor;
        var c = i.fontSize;
        var h = i.indent;
        var f = i.fontWeight;
        var p = et.createElement("div");
        var d = Qt(n) || I(n, "pinType") === "fixed";
        var m = t.indexOf("scroller") !== -1;
        var g = d ? rt : n;
        var v = t.indexOf("start") !== -1;
        var y = v ? l : u;
        var b = "border-color:" + y + ";font-size:" + c + ";color:" + y + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
        b += "position:" + ((m || a) && d ? "fixed;" : "absolute;");
        if (m || a || !d) {
          b += (r === W ? ue : ce) + ":" + (o + parseFloat(h)) + "px;";
        }
        if (s) {
          b += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;";
        }
        p._isStart = v;
        p.setAttribute("class", "gsap-marker-" + t + (e ? " marker-" + e : ""));
        p.style.cssText = b;
        p.innerText = e || e === 0 ? t + "-" + e : t;
        if (g.children[0]) {
          g.insertBefore(p, g.children[0]);
        } else {
          g.appendChild(p);
        }
        p._offset = p["offset" + r.op.d2];
        Ne(p, 0, r, v);
        return p;
      }
      function Ne(t, e, n, r) {
        var i = {
          display: "block"
        };
        var o = n[r ? "os2" : "p2"];
        var s = n[r ? "p2" : "os2"];
        t._isFlipped = r;
        i[n.a + "Percent"] = r ? -100 : 0;
        i[n.a] = r ? "1px" : 0;
        i["border" + o + be] = 1;
        i["border" + s + be] = 0;
        i[n.p] = e + "px";
        J.set(t, i);
      }
      var ze = [];
      var Ue = {};
      function Fe() {
        return Nt() - Ut > 34 && (Lt ||= requestAnimationFrame(sn));
      }
      function Be() {
        if (!_t || !_t.isPressed || _t.startX > rt.clientWidth) {
          A.cache++;
          if (_t) {
            Lt ||= requestAnimationFrame(sn);
          } else {
            sn();
          }
          if (!Ut) {
            Xe("scrollStart");
          }
          Ut = Nt();
        }
      }
      function He() {
        St = tt.innerWidth;
        xt = tt.innerHeight;
      }
      function We(t) {
        A.cache++;
        if (t === true || !ct && !bt && !et.fullscreenElement && !et.webkitFullscreenElement && (!wt || St !== tt.innerWidth || Math.abs(tt.innerHeight - xt) > tt.innerHeight * 0.25)) {
          ot.restart(true);
        }
      }
      var Ve = {};
      var Ge = [];
      var qe = function t() {
        return Ae(_n, "scrollEnd", t) || nn(true);
      };
      function Xe(t) {
        return Ve[t] && Ve[t].map(function (t) {
          return t();
        }) || Ge;
      }
      var Ye = [];
      function Ke(t) {
        for (var e = 0; e < Ye.length; e += 5) {
          if (!t || Ye[e + 4] && Ye[e + 4].query === t) {
            Ye[e].style.cssText = Ye[e + 1];
            if (Ye[e].getBBox) {
              Ye[e].setAttribute("transform", Ye[e + 2] || "");
            }
            Ye[e + 3].uncache = 1;
          }
        }
      }
      function Qe() {
        return A.forEach(function (t) {
          return ne(t) && ++t.cacheID && (t.rec = t());
        });
      }
      function Ze(t, e) {
        var n;
        for (pt = 0; pt < ze.length; pt++) {
          if (!!(n = ze[pt]) && (!e || n._ctx === e)) {
            if (t) {
              n.kill(1);
            } else {
              n.revert(true, true);
            }
          }
        }
        Ct = true;
        if (e) {
          Ke(e);
        }
        if (!e) {
          Xe("revert");
        }
      }
      function Je(t, e) {
        A.cache++;
        if (e || !Dt) {
          A.forEach(function (t) {
            return ne(t) && t.cacheID++ && (t.rec = 0);
          });
        }
        if (ee(t)) {
          tt.history.scrollRestoration = Pt = t;
        }
      }
      var $e = 0;
      function tn() {
        rt.appendChild(Et);
        Ot = !_t && Et.offsetHeight || tt.innerHeight;
        rt.removeChild(Et);
      }
      function en(t) {
        return st(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function (e) {
          return e.style.display = t ? "none" : "block";
        });
      }
      function nn(t, e) {
        nt = et.documentElement;
        rt = et.body;
        it = [tt, et, nt, rt];
        if (!Ut || t || Ct) {
          tn();
          Dt = _n.isRefreshing = true;
          if (!Ct) {
            Qe();
          }
          var n = Xe("refreshInit");
          if (vt) {
            _n.sort();
          }
          if (!e) {
            Ze();
          }
          A.forEach(function (t) {
            if (ne(t)) {
              if (t.smooth) {
                t.target.style.scrollBehavior = "auto";
              }
              t(0);
            }
          });
          ze.slice(0).forEach(function (t) {
            return t.refresh();
          });
          Ct = false;
          ze.forEach(function (t) {
            if (t._subPinOffset && t.pin) {
              var e = t.vars.horizontal ? "offsetWidth" : "offsetHeight";
              var n = t.pin[e];
              t.revert(true, 1);
              t.adjustPinSpacing(t.pin[e] - n);
              t.refresh();
            }
          });
          At = 1;
          en(true);
          ze.forEach(function (t) {
            var e = $t(t.scroller, t._dir);
            var n = t.vars.end === "max" || t._endClamp && t.end > e;
            var r = t._startClamp && t.start >= e;
            if (n || r) {
              t.setPositions(r ? e - 1 : t.start, n ? Math.max(r ? e : t.start + 1, e) : t.end, true);
            }
          });
          en(false);
          At = 0;
          n.forEach(function (t) {
            return t && t.render && t.render(-1);
          });
          A.forEach(function (t) {
            if (ne(t)) {
              if (t.smooth) {
                requestAnimationFrame(function () {
                  return t.target.style.scrollBehavior = "smooth";
                });
              }
              if (t.rec) {
                t(t.rec);
              }
            }
          });
          Je(Pt, 1);
          ot.pause();
          $e++;
          Dt = 2;
          sn(2);
          ze.forEach(function (t) {
            return ne(t.vars.onRefresh) && t.vars.onRefresh(t);
          });
          Dt = _n.isRefreshing = false;
          Xe("refresh");
        } else {
          Ce(_n, "scrollEnd", qe);
        }
      }
      var rn = 0;
      var on = 1;
      function sn(t) {
        if (t === 2 || !Dt && !Ct) {
          _n.isUpdating = true;
          if (kt) {
            kt.update(0);
          }
          var e = ze.length;
          var n = Nt();
          var r = n - zt >= 50;
          var i = e && ze[0].scroll();
          on = rn > i ? -1 : 1;
          if (!Dt) {
            rn = i;
          }
          if (r) {
            if (Ut && !ht && n - Ut > 200) {
              Ut = 0;
              Xe("scrollEnd");
            }
            lt = zt;
            zt = n;
          }
          if (on < 0) {
            for (pt = e; pt-- > 0;) {
              if (ze[pt]) {
                ze[pt].update(0, r);
              }
            }
            on = 1;
          } else {
            for (pt = 0; pt < e; pt++) {
              if (ze[pt]) {
                ze[pt].update(0, r);
              }
            }
          }
          _n.isUpdating = false;
        }
        Lt = 0;
      }
      var an = [le, "top", ce, ue, ye + ge, ye + pe, ye + me, ye + de, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"];
      var ln = an.concat([he, fe, "boxSizing", "max" + be, "max" + _e, "position", ye, ve, ve + me, ve + pe, ve + ge, ve + de]);
      function un(t, e, n, r) {
        if (!t._gsap.swappedIn) {
          var i;
          for (var o = an.length, s = e.style, a = t.style; o--;) {
            s[i = an[o]] = n[i];
          }
          s.position = n.position === "absolute" ? "absolute" : "relative";
          if (n.display === "inline") {
            s.display = "inline-block";
          }
          a[ce] = a[ue] = "auto";
          s.flexBasis = n.flexBasis || "auto";
          s.overflow = "visible";
          s.boxSizing = "border-box";
          s[he] = Me(t, H) + we;
          s[fe] = Me(t, W) + we;
          s[ve] = a[ye] = a.top = a[le] = "0";
          hn(r);
          a[he] = a["max" + be] = n[he];
          a[fe] = a["max" + _e] = n[fe];
          a[ve] = n[ve];
          if (t.parentNode !== e) {
            t.parentNode.insertBefore(e, t);
            e.appendChild(t);
          }
          t._gsap.swappedIn = true;
        }
      }
      var cn = /([A-Z])/g;
      function hn(t) {
        if (t) {
          var e;
          var n;
          var r = t.t.style;
          var i = t.length;
          var o = 0;
          for ((t.t._gsap || J.core.getCache(t.t)).uncache = 1; o < i; o += 2) {
            n = t[o + 1];
            e = t[o];
            if (n) {
              r[e] = n;
            } else if (r[e]) {
              r.removeProperty(e.replace(cn, "-$1").toLowerCase());
            }
          }
        }
      }
      function fn(t) {
        for (var e = ln.length, n = t.style, r = [], i = 0; i < e; i++) {
          r.push(ln[i], n[ln[i]]);
        }
        r.t = t;
        return r;
      }
      var pn = {
        left: 0,
        top: 0
      };
      function dn(t, e, n, r, i, o, s, a, l, u, c, h, f, p) {
        if (ne(t)) {
          t = t(a);
        }
        if (ee(t) && t.substr(0, 3) === "max") {
          t = h + (t.charAt(4) === "=" ? ke("0" + t.substr(3), n) : 0);
        }
        var d;
        var m;
        var g;
        var v = f ? f.time() : 0;
        if (f) {
          f.seek(0);
        }
        if (!isNaN(t)) {
          t = +t;
        }
        if (re(t)) {
          if (f) {
            t = J.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t);
          }
          if (s) {
            Ne(s, n, r, true);
          }
        } else {
          if (ne(e)) {
            e = e(a);
          }
          var y;
          var b;
          var _;
          var w;
          var x = (t || "0").split(" ");
          g = V(e, a) || rt;
          if ((!(y = Te(g) || {}) || !y.left && !y.top) && xe(g).display === "none") {
            w = g.style.display;
            g.style.display = "block";
            y = Te(g);
            if (w) {
              g.style.display = w;
            } else {
              g.style.removeProperty("display");
            }
          }
          b = ke(x[0], y[r.d]);
          _ = ke(x[1] || "0", n);
          t = y[r.p] - l[r.p] - u + b + i - _;
          if (s) {
            Ne(s, _, r, n - _ < 20 || s._isStart && _ > 20);
          }
          n -= n - _;
        }
        if (p) {
          a[p] = t || -0.001;
          if (t < 0) {
            t = 0;
          }
        }
        if (o) {
          var S = t + n;
          var T = o._isStart;
          d = "scroll" + r.d2;
          Ne(o, S, r, T && S > 20 || !T && (c ? Math.max(rt[d], nt[d]) : o.parentNode[d]) <= S + 1);
          if (c) {
            l = Te(s);
            if (c) {
              o.style[r.op.p] = l[r.op.p] - r.op.m - o._offset + we;
            }
          }
        }
        if (f && g) {
          d = Te(g);
          f.seek(h);
          m = Te(g);
          f._caScrollDist = d[r.p] - m[r.p];
          t = t / f._caScrollDist * h;
        }
        if (f) {
          f.seek(v);
        }
        if (f) {
          return t;
        } else {
          return Math.round(t);
        }
      }
      var mn = /(webkit|moz|length|cssText|inset)/i;
      function gn(t, e, n, r) {
        if (t.parentNode !== e) {
          var i;
          var o;
          var s = t.style;
          if (e === rt) {
            t._stOrig = s.cssText;
            for (i in o = xe(t)) {
              if (!+i && !mn.test(i) && !!o[i] && typeof s[i] == "string" && i !== "0") {
                s[i] = o[i];
              }
            }
            s.top = n;
            s.left = r;
          } else {
            s.cssText = t._stOrig;
          }
          J.core.getCache(t).uncache = 1;
          e.appendChild(t);
        }
      }
      function vn(t, e, n) {
        var r = e;
        var i = r;
        return function (e) {
          var o = Math.round(t());
          if (o !== r && o !== i && Math.abs(o - r) > 3 && Math.abs(o - i) > 3) {
            e = o;
            if (n) {
              n();
            }
          }
          i = r;
          return r = Math.round(e);
        };
      }
      function yn(t, e, n) {
        var r = {
          [e.p]: "+=" + n
        };
        J.set(t, r);
      }
      function bn(t, e) {
        var n = G(t, e);
        var r = "_scroll" + e.p2;
        var i = function e(i, o, s, a, l) {
          var u = e.tween;
          var c = o.onComplete;
          var h = {};
          s = s || n();
          var f = vn(n, s, function () {
            u.kill();
            e.tween = 0;
          });
          l = a && l || 0;
          a = a || i - s;
          if (u) {
            u.kill();
          }
          o[r] = i;
          o.inherit = false;
          o.modifiers = h;
          h[r] = function () {
            return f(s + a * u.ratio + l * u.ratio * u.ratio);
          };
          o.onUpdate = function () {
            A.cache++;
            if (e.tween) {
              sn();
            }
          };
          o.onComplete = function () {
            e.tween = 0;
            if (c) {
              c.call(u);
            }
          };
          return u = e.tween = J.to(t, o);
        };
        t[r] = n;
        n.wheelHandler = function () {
          return i.tween && i.tween.kill() && (i.tween = 0);
        };
        Ce(t, "wheel", n.wheelHandler);
        if (_n.isTouch) {
          Ce(t, "touchmove", n.wheelHandler);
        }
        return i;
      }
      var _n = function () {
        function t(e, n) {
          if (!$ && !t.register(J)) {
            console.warn("Please gsap.registerPlugin(ScrollTrigger)");
          }
          Mt(this);
          this.init(e, n);
        }
        t.prototype.init = function (e, n) {
          this.progress = this.start = 0;
          if (this.vars) {
            this.kill(true, true);
          }
          if (Ft) {
            var r;
            var i;
            var o;
            var s;
            var a;
            var l;
            var u;
            var c;
            var h;
            var f;
            var p;
            var d;
            var m;
            var g;
            var v;
            var y;
            var b;
            var _;
            var w;
            var x;
            var S;
            var T;
            var M;
            var P;
            var E;
            var O;
            var C;
            var L;
            var D;
            var k;
            var j;
            var N;
            var z;
            var U;
            var F;
            var B;
            var q;
            var X;
            var Y;
            var K;
            var Q;
            var Z;
            var $ = e = Se(ee(e) || re(e) || e.nodeType ? {
              trigger: e
            } : e, De);
            var it = $.onUpdate;
            var ot = $.toggleClass;
            var ut = $.id;
            var ft = $.onToggle;
            var dt = $.onRefresh;
            var mt = $.scrub;
            var gt = $.trigger;
            var bt = $.pin;
            var _t = $.pinSpacing;
            var wt = $.invalidateOnRefresh;
            var xt = $.anticipatePin;
            var St = $.onScrubComplete;
            var Tt = $.onSnapComplete;
            var Mt = $.once;
            var Pt = $.snap;
            var Et = $.pinReparent;
            var Ot = $.pinSpacer;
            var Ct = $.containerAnimation;
            var Lt = $.fastScrollEnd;
            var zt = $.preventOverlaps;
            var Wt = e.horizontal || e.containerAnimation && e.horizontal !== false ? H : W;
            var Vt = !mt && mt !== 0;
            var Gt = V(e.scroller || tt);
            var Yt = J.core.getCache(Gt);
            var Kt = Qt(Gt);
            var te = ("pinType" in e ? e.pinType : I(Gt, "pinType") || Kt && "fixed") === "fixed";
            var le = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack];
            var ue = Vt && e.toggleActions.split(" ");
            var ce = "markers" in e ? e.markers : De.markers;
            var Oe = Kt ? 0 : parseFloat(xe(Gt)["border" + Wt.p2 + be]) || 0;
            var Re = this;
            var Ie = e.onRefreshInit && function () {
              return e.onRefreshInit(Re);
            };
            var Ne = function (t, e, n) {
              var r = n.d;
              var i = n.d2;
              var o = n.a;
              if (o = I(t, "getBoundingClientRect")) {
                return function () {
                  return o()[r];
                };
              } else {
                return function () {
                  return (e ? Zt(i) : t["client" + i]) || 0;
                };
              }
            }(Gt, Kt, Wt);
            var Fe = function (t, e) {
              if (!e || ~R.indexOf(t)) {
                return Jt(t);
              } else {
                return function () {
                  return pn;
                };
              }
            }(Gt, Kt);
            var He = 0;
            var Ve = 0;
            var Ge = 0;
            var Xe = G(Gt, Wt);
            Re._startClamp = Re._endClamp = false;
            Re._dir = Wt;
            xt *= 45;
            Re.scroller = Gt;
            Re.scroll = Ct ? Ct.time.bind(Ct) : Xe;
            s = Xe();
            Re.vars = e;
            n = n || e.animation;
            if ("refreshPriority" in e) {
              vt = 1;
              if (e.refreshPriority === -9999) {
                kt = Re;
              }
            }
            Yt.tweenScroll = Yt.tweenScroll || {
              top: bn(Gt, W),
              left: bn(Gt, H)
            };
            Re.tweenTo = r = Yt.tweenScroll[Wt.p];
            Re.scrubDuration = function (t) {
              if (z = re(t) && t) {
                if (N) {
                  N.duration(t);
                } else {
                  N = J.to(n, {
                    ease: "expo",
                    totalProgress: "+=0",
                    inherit: false,
                    duration: z,
                    paused: true,
                    onComplete: function () {
                      return St && St(Re);
                    }
                  });
                }
              } else {
                if (N) {
                  N.progress(1).kill();
                }
                N = 0;
              }
            };
            if (n) {
              n.vars.lazy = false;
              if (!n._initted || !!Re.isReverted) {
                if (n.vars.immediateRender !== false && e.immediateRender !== false && n.duration()) {
                  n.render(0, true, true);
                }
              }
              Re.animation = n.pause();
              n.scrollTrigger = Re;
              Re.scrubDuration(mt);
              k = 0;
              ut ||= n.vars.id;
            }
            if (Pt) {
              if (!ie(Pt) || !!Pt.push) {
                Pt = {
                  snapTo: Pt
                };
              }
              if ("scrollBehavior" in rt.style) {
                J.set(Kt ? [rt, nt] : Gt, {
                  scrollBehavior: "auto"
                });
              }
              A.forEach(function (t) {
                return ne(t) && t.target === (Kt ? et.scrollingElement || nt : Gt) && (t.smooth = false);
              });
              o = ne(Pt.snapTo) ? Pt.snapTo : Pt.snapTo === "labels" ? function (t) {
                return function (e) {
                  return J.utils.snap(Pe(t), e);
                };
              }(n) : Pt.snapTo === "labelsDirectional" ? (K = n, function (t, e) {
                return Ee(Pe(K))(t, e.direction);
              }) : Pt.directional !== false ? function (t, e) {
                return Ee(Pt.snapTo)(t, Nt() - Ve < 500 ? 0 : e.direction);
              } : J.utils.snap(Pt.snapTo);
              U = Pt.duration || {
                min: 0.1,
                max: 2
              };
              U = ie(U) ? at(U.min, U.max) : at(U, U);
              F = J.delayedCall(Pt.delay || z / 2 || 0.1, function () {
                var t = Xe();
                var e = Nt() - Ve < 500;
                var i = r.tween;
                if (!e && !(Math.abs(Re.getVelocity()) < 10) || i || ht || He === t) {
                  if (Re.isActive && He !== t) {
                    F.restart(true);
                  }
                } else {
                  var s;
                  var a;
                  var c = (t - l) / g;
                  var h = n && !Vt ? n.totalProgress() : c;
                  var f = e ? 0 : (h - j) / (Nt() - lt) * 1000 || 0;
                  var p = J.utils.clamp(-c, 1 - c, ae(f / 2) * f / 0.185);
                  var d = c + (Pt.inertia === false ? 0 : p);
                  var m = Pt;
                  var v = m.onStart;
                  var y = m.onInterrupt;
                  var b = m.onComplete;
                  s = o(d, Re);
                  if (!re(s)) {
                    s = d;
                  }
                  a = Math.max(0, Math.round(l + s * g));
                  if (t <= u && t >= l && a !== t) {
                    if (i && !i._initted && i.data <= ae(a - t)) {
                      return;
                    }
                    if (Pt.inertia === false) {
                      p = s - c;
                    }
                    r(a, {
                      duration: U(ae(Math.max(ae(d - h), ae(s - h)) * 0.185 / f / 0.05 || 0)),
                      ease: Pt.ease || "power3",
                      data: ae(a - t),
                      onInterrupt: function () {
                        return F.restart(true) && y && y(Re);
                      },
                      onComplete: function () {
                        Re.update();
                        He = Xe();
                        if (n && !Vt) {
                          if (N) {
                            N.resetTo("totalProgress", s, n._tTime / n._tDur);
                          } else {
                            n.progress(s);
                          }
                        }
                        k = j = n && !Vt ? n.totalProgress() : Re.progress;
                        if (Tt) {
                          Tt(Re);
                        }
                        if (b) {
                          b(Re);
                        }
                      }
                    }, t, p * g, a - t - p * g);
                    if (v) {
                      v(Re, r.tween);
                    }
                  }
                }
              }).pause();
            }
            if (ut) {
              Ue[ut] = Re;
            }
            if (Y = (gt = Re.trigger = V(gt || bt !== true && bt)) && gt._gsap && gt._gsap.stRevert) {
              Y = Y(Re);
            }
            bt = bt === true ? gt : V(bt);
            if (ee(ot)) {
              ot = {
                targets: gt,
                className: ot
              };
            }
            if (bt) {
              if (_t !== false && _t !== ye) {
                _t = (!!_t || !bt.parentNode || !bt.parentNode.style || xe(bt.parentNode).display !== "flex") && ve;
              }
              Re.pin = bt;
              if ((i = J.core.getCache(bt)).spacer) {
                v = i.pinState;
              } else {
                if (Ot) {
                  if ((Ot = V(Ot)) && !Ot.nodeType) {
                    Ot = Ot.current || Ot.nativeElement;
                  }
                  i.spacerIsNative = !!Ot;
                  if (Ot) {
                    i.spacerState = fn(Ot);
                  }
                }
                i.spacer = _ = Ot || et.createElement("div");
                _.classList.add("pin-spacer");
                if (ut) {
                  _.classList.add("pin-spacer-" + ut);
                }
                i.pinState = v = fn(bt);
              }
              if (e.force3D !== false) {
                J.set(bt, {
                  force3D: true
                });
              }
              Re.spacer = _ = i.spacer;
              D = xe(bt);
              P = D[_t + Wt.os2];
              x = J.getProperty(bt);
              S = J.quickSetter(bt, Wt.a, we);
              un(bt, _, D);
              b = fn(bt);
            }
            if (ce) {
              d = ie(ce) ? Se(ce, Le) : Le;
              f = je("scroller-start", ut, Gt, Wt, d, 0);
              p = je("scroller-end", ut, Gt, Wt, d, 0, f);
              w = f["offset" + Wt.op.d2];
              var Ye = V(I(Gt, "content") || Gt);
              c = this.markerStart = je("start", ut, Ye, Wt, d, w, 0, Ct);
              h = this.markerEnd = je("end", ut, Ye, Wt, d, w, 0, Ct);
              if (Ct) {
                X = J.quickSetter([c, h], Wt.a, we);
              }
              if (!te && (!R.length || I(Gt, "fixedMarkers") !== true)) {
                Z = xe(Q = Kt ? rt : Gt).position;
                Q.style.position = Z === "absolute" || Z === "fixed" ? Z : "relative";
                J.set([f, p], {
                  force3D: true
                });
                O = J.quickSetter(f, Wt.a, we);
                L = J.quickSetter(p, Wt.a, we);
              }
            }
            if (Ct) {
              var Ke = Ct.vars.onUpdate;
              var Qe = Ct.vars.onUpdateParams;
              Ct.eventCallback("onUpdate", function () {
                Re.update(0, 0, 1);
                if (Ke) {
                  Ke.apply(Ct, Qe || []);
                }
              });
            }
            Re.previous = function () {
              return ze[ze.indexOf(Re) - 1];
            };
            Re.next = function () {
              return ze[ze.indexOf(Re) + 1];
            };
            Re.revert = function (t, e) {
              if (!e) {
                return Re.kill(true);
              }
              var r = t !== false || !Re.enabled;
              var i = ct;
              if (r !== Re.isReverted) {
                if (r) {
                  B = Math.max(Xe(), Re.scroll.rec || 0);
                  Ge = Re.progress;
                  q = n && n.progress();
                }
                if (c) {
                  [c, h, f, p].forEach(function (t) {
                    return t.style.display = r ? "none" : "block";
                  });
                }
                if (r) {
                  ct = Re;
                  Re.update(r);
                }
                if (!!bt && (!Et || !Re.isActive)) {
                  if (r) {
                    (function (t, e, n) {
                      hn(n);
                      var r = t._gsap;
                      if (r.spacerIsNative) {
                        hn(r.spacerState);
                      } else if (t._gsap.swappedIn) {
                        var i = e.parentNode;
                        if (i) {
                          i.insertBefore(t, e);
                          i.removeChild(e);
                        }
                      }
                      t._gsap.swappedIn = false;
                    })(bt, _, v);
                  } else {
                    un(bt, _, xe(bt), E);
                  }
                }
                if (!r) {
                  Re.update(r);
                }
                ct = i;
                Re.isReverted = r;
              }
            };
            Re.refresh = function (i, o, d, w) {
              if (!ct && Re.enabled || o) {
                if (bt && i && Ut) {
                  Ce(t, "scrollEnd", qe);
                } else {
                  if (!Dt && Ie) {
                    Ie(Re);
                  }
                  ct = Re;
                  if (r.tween && !d) {
                    r.tween.kill();
                    r.tween = 0;
                  }
                  if (N) {
                    N.pause();
                  }
                  if (wt && n) {
                    n.revert({
                      kill: false
                    }).invalidate();
                    if (n.getChildren) {
                      n.getChildren(true, true, false).forEach(function (t) {
                        return t.vars.immediateRender && t.render(0, true, true);
                      });
                    } else if (n.vars.immediateRender) {
                      n.render(0, true, true);
                    }
                  }
                  if (!Re.isReverted) {
                    Re.revert(true, true);
                  }
                  Re._subPinOffset = false;
                  var S;
                  var P;
                  var O;
                  var A;
                  var R;
                  var L;
                  var D;
                  var I;
                  var k;
                  var j;
                  var z;
                  var U;
                  var X;
                  var Y = Ne();
                  var K = Fe();
                  var Q = Ct ? Ct.duration() : $t(Gt, Wt);
                  var Z = g <= 0.01 || !g;
                  var $ = 0;
                  var tt = w || 0;
                  var it = ie(d) ? d.end : e.end;
                  var ot = e.endTrigger || gt;
                  var st = ie(d) ? d.start : e.start || (e.start !== 0 && gt ? bt ? "0 0" : "0 100%" : 0);
                  var at = Re.pinnedContainer = e.pinnedContainer && V(e.pinnedContainer, Re);
                  var lt = gt && Math.max(0, ze.indexOf(Re)) || 0;
                  var ut = lt;
                  for (ce && ie(d) && (U = J.getProperty(f, Wt.p), X = J.getProperty(p, Wt.p)); ut-- > 0;) {
                    if (!(L = ze[ut]).end && !L.refresh(0, 1)) {
                      ct = Re;
                    }
                    if (!!(D = L.pin) && (D === gt || D === bt || D === at) && !L.isReverted) {
                      j ||= [];
                      j.unshift(L);
                      L.revert(true, true);
                    }
                    if (L !== ze[ut]) {
                      lt--;
                      ut--;
                    }
                  }
                  if (ne(st)) {
                    st = st(Re);
                  }
                  st = Bt(st, "start", Re);
                  l = dn(st, gt, Y, Wt, Xe(), c, f, Re, K, Oe, te, Q, Ct, Re._startClamp && "_startClamp") || (bt ? -0.001 : 0);
                  if (ne(it)) {
                    it = it(Re);
                  }
                  if (ee(it) && !it.indexOf("+=")) {
                    if (~it.indexOf(" ")) {
                      it = (ee(st) ? st.split(" ")[0] : "") + it;
                    } else {
                      $ = ke(it.substr(2), Y);
                      it = ee(st) ? st : (Ct ? J.utils.mapRange(0, Ct.duration(), Ct.scrollTrigger.start, Ct.scrollTrigger.end, l) : l) + $;
                      ot = gt;
                    }
                  }
                  it = Bt(it, "end", Re);
                  u = Math.max(l, dn(it || (ot ? "100% 0" : Q), ot, Y, Wt, Xe() + $, h, p, Re, K, Oe, te, Q, Ct, Re._endClamp && "_endClamp")) || -0.001;
                  $ = 0;
                  ut = lt;
                  while (ut--) {
                    if ((D = (L = ze[ut] || {}).pin) && L.start - L._pinPush <= l && !Ct && L.end > 0) {
                      S = L.end - (Re._startClamp ? Math.max(0, L.start) : L.start);
                      if ((D === gt && L.start - L._pinPush < l || D === at) && isNaN(st)) {
                        $ += S * (1 - L.progress);
                      }
                      if (D === bt) {
                        tt += S;
                      }
                    }
                  }
                  l += $;
                  u += $;
                  if (Re._startClamp) {
                    Re._startClamp += $;
                  }
                  if (Re._endClamp && !Dt) {
                    Re._endClamp = u || -0.001;
                    u = Math.min(u, $t(Gt, Wt));
                  }
                  g = u - l || (l -= 0.01) && 0.001;
                  if (Z) {
                    Ge = J.utils.clamp(0, 1, J.utils.normalize(l, u, B));
                  }
                  Re._pinPush = tt;
                  if (c && $) {
                    (S = {})[Wt.a] = "+=" + $;
                    if (at) {
                      S[Wt.p] = "-=" + Xe();
                    }
                    J.set([c, h], S);
                  }
                  if (!bt || At && Re.end >= $t(Gt, Wt)) {
                    if (gt && Xe() && !Ct) {
                      for (P = gt.parentNode; P && P !== rt;) {
                        if (P._pinOffset) {
                          l -= P._pinOffset;
                          u -= P._pinOffset;
                        }
                        P = P.parentNode;
                      }
                    }
                  } else {
                    S = xe(bt);
                    A = Wt === W;
                    O = Xe();
                    T = parseFloat(x(Wt.a)) + tt;
                    if (!Q && u > 1) {
                      z = {
                        style: z = (Kt ? et.scrollingElement || nt : Gt).style,
                        value: z["overflow" + Wt.a.toUpperCase()]
                      };
                      if (Kt && xe(rt)["overflow" + Wt.a.toUpperCase()] !== "scroll") {
                        z.style["overflow" + Wt.a.toUpperCase()] = "scroll";
                      }
                    }
                    un(bt, _, S);
                    b = fn(bt);
                    P = Te(bt, true);
                    I = te && G(Gt, A ? H : W)();
                    if (_t) {
                      (E = [_t + Wt.os2, g + tt + we]).t = _;
                      if (ut = _t === ve ? Me(bt, Wt) + g + tt : 0) {
                        E.push(Wt.d, ut + we);
                        if (_.style.flexBasis !== "auto") {
                          _.style.flexBasis = ut + we;
                        }
                      }
                      hn(E);
                      if (at) {
                        ze.forEach(function (t) {
                          if (t.pin === at && t.vars.pinSpacing !== false) {
                            t._subPinOffset = true;
                          }
                        });
                      }
                      if (te) {
                        Xe(B);
                      }
                    } else if ((ut = Me(bt, Wt)) && _.style.flexBasis !== "auto") {
                      _.style.flexBasis = ut + we;
                    }
                    if (te) {
                      (R = {
                        top: P.top + (A ? O - l : I) + we,
                        left: P.left + (A ? I : O - l) + we,
                        boxSizing: "border-box",
                        position: "fixed"
                      })[he] = R["max" + be] = Math.ceil(P.width) + we;
                      R[fe] = R["max" + _e] = Math.ceil(P.height) + we;
                      R[ye] = R[ye + me] = R[ye + pe] = R[ye + ge] = R[ye + de] = "0";
                      R[ve] = S[ve];
                      R[ve + me] = S[ve + me];
                      R[ve + pe] = S[ve + pe];
                      R[ve + ge] = S[ve + ge];
                      R[ve + de] = S[ve + de];
                      y = function (t, e, n) {
                        var r;
                        var i = [];
                        for (var o = t.length, s = n ? 8 : 0; s < o; s += 2) {
                          r = t[s];
                          i.push(r, r in e ? e[r] : t[s + 1]);
                        }
                        i.t = t.t;
                        return i;
                      }(v, R, Et);
                      if (Dt) {
                        Xe(0);
                      }
                    }
                    if (n) {
                      k = n._initted;
                      yt(1);
                      n.render(n.duration(), true, true);
                      M = x(Wt.a) - T + g + tt;
                      C = Math.abs(g - M) > 1;
                      if (te && C) {
                        y.splice(y.length - 2, 2);
                      }
                      n.render(0, true, true);
                      if (!k) {
                        n.invalidate(true);
                      }
                      if (!n.parent) {
                        n.totalTime(n.totalTime());
                      }
                      yt(0);
                    } else {
                      M = g;
                    }
                    if (z) {
                      if (z.value) {
                        z.style["overflow" + Wt.a.toUpperCase()] = z.value;
                      } else {
                        z.style.removeProperty("overflow-" + Wt.a);
                      }
                    }
                  }
                  if (j) {
                    j.forEach(function (t) {
                      return t.revert(false, true);
                    });
                  }
                  Re.start = l;
                  Re.end = u;
                  s = a = Dt ? B : Xe();
                  if (!Ct && !Dt) {
                    if (s < B) {
                      Xe(B);
                    }
                    Re.scroll.rec = 0;
                  }
                  Re.revert(false, true);
                  Ve = Nt();
                  if (F) {
                    He = -1;
                    F.restart(true);
                  }
                  ct = 0;
                  if (n && Vt && (n._initted || q) && n.progress() !== q) {
                    n.progress(q || 0, true).render(n.time(), true, true);
                  }
                  if (Z || Ge !== Re.progress || Ct || wt || n && !n._initted) {
                    if (n && !Vt && (n._initted || Ge || n.vars.immediateRender !== false)) {
                      n.totalProgress(Ct && l < -0.001 && !Ge ? J.utils.normalize(l, u, 0) : Ge, true);
                    }
                    Re.progress = Z || (s - l) / g === Ge ? 0 : Ge;
                  }
                  if (bt && _t) {
                    _._pinOffset = Math.round(Re.progress * M);
                  }
                  if (N) {
                    N.invalidate();
                  }
                  if (!isNaN(U)) {
                    U -= J.getProperty(f, Wt.p);
                    X -= J.getProperty(p, Wt.p);
                    yn(f, Wt, U);
                    yn(c, Wt, U - (w || 0));
                    yn(p, Wt, X);
                    yn(h, Wt, X - (w || 0));
                  }
                  if (Z && !Dt) {
                    Re.update();
                  }
                  if (!!dt && !Dt && !m) {
                    m = true;
                    dt(Re);
                    m = false;
                  }
                }
              }
            };
            Re.getVelocity = function () {
              return (Xe() - a) / (Nt() - lt) * 1000 || 0;
            };
            Re.endAnimation = function () {
              oe(Re.callbackAnimation);
              if (n) {
                if (N) {
                  N.progress(1);
                } else if (n.paused()) {
                  if (!Vt) {
                    oe(n, Re.direction < 0, 1);
                  }
                } else {
                  oe(n, n.reversed());
                }
              }
            };
            Re.labelToScroll = function (t) {
              return n && n.labels && (l || Re.refresh() || l) + n.labels[t] / n.duration() * g || 0;
            };
            Re.getTrailing = function (t) {
              var e = ze.indexOf(Re);
              var n = Re.direction > 0 ? ze.slice(0, e).reverse() : ze.slice(e + 1);
              return (ee(t) ? n.filter(function (e) {
                return e.vars.preventOverlaps === t;
              }) : n).filter(function (t) {
                if (Re.direction > 0) {
                  return t.end <= l;
                } else {
                  return t.start >= u;
                }
              });
            };
            Re.update = function (t, e, i) {
              if (!Ct || i || t) {
                var o;
                var c;
                var h;
                var p;
                var d;
                var m;
                var v;
                var w = Dt === true ? B : Re.scroll();
                var x = t ? 0 : (w - l) / g;
                var E = x < 0 ? 0 : x > 1 ? 1 : x || 0;
                var A = Re.progress;
                if (e) {
                  a = s;
                  s = Ct ? Xe() : w;
                  if (Pt) {
                    j = k;
                    k = n && !Vt ? n.totalProgress() : E;
                  }
                }
                if (xt && bt && !ct && !jt && Ut) {
                  if (!E && l < w + (w - a) / (Nt() - lt) * xt) {
                    E = 0.0001;
                  } else if (E === 1 && u > w + (w - a) / (Nt() - lt) * xt) {
                    E = 0.9999;
                  }
                }
                if (E !== A && Re.enabled) {
                  p = (d = (o = Re.isActive = !!E && E < 1) !== (!!A && A < 1)) || !!E != !!A;
                  Re.direction = E > A ? 1 : -1;
                  Re.progress = E;
                  if (p && !ct) {
                    c = E && !A ? 0 : E === 1 ? 1 : A === 1 ? 2 : 3;
                    if (Vt) {
                      h = !d && ue[c + 1] !== "none" && ue[c + 1] || ue[c];
                      v = n && (h === "complete" || h === "reset" || h in n);
                    }
                  }
                  if (zt && (d || v) && (v || mt || !n)) {
                    if (ne(zt)) {
                      zt(Re);
                    } else {
                      Re.getTrailing(zt).forEach(function (t) {
                        return t.endAnimation();
                      });
                    }
                  }
                  if (!Vt) {
                    if (!N || ct || jt) {
                      if (n) {
                        n.totalProgress(E, !!ct && (!!Ve || !!t));
                      }
                    } else {
                      if (N._dp._time - N._start !== N._time) {
                        N.render(N._dp._time - N._start);
                      }
                      if (N.resetTo) {
                        N.resetTo("totalProgress", E, n._tTime / n._tDur);
                      } else {
                        N.vars.totalProgress = E;
                        N.invalidate().restart();
                      }
                    }
                  }
                  if (bt) {
                    if (t && _t) {
                      _.style[_t + Wt.os2] = P;
                    }
                    if (te) {
                      if (p) {
                        m = !t && E > A && u + 1 > w && w + 1 >= $t(Gt, Wt);
                        if (Et) {
                          if (t || !o && !m) {
                            gn(bt, _);
                          } else {
                            var R = Te(bt, true);
                            var D = w - l;
                            gn(bt, rt, R.top + (Wt === W ? D : 0) + we, R.left + (Wt === W ? 0 : D) + we);
                          }
                        }
                        hn(o || m ? y : b);
                        if (!C || !(E < 1) || !o) {
                          S(T + (E !== 1 || m ? 0 : M));
                        }
                      }
                    } else {
                      S(Xt(T + M * E));
                    }
                  }
                  if (Pt && !r.tween && !ct && !jt) {
                    F.restart(true);
                  }
                  if (ot && (d || Mt && E && (E < 1 || !Rt))) {
                    st(ot.targets).forEach(function (t) {
                      return t.classList[o || Mt ? "add" : "remove"](ot.className);
                    });
                  }
                  if (it && !Vt && !t) {
                    it(Re);
                  }
                  if (p && !ct) {
                    if (Vt) {
                      if (v) {
                        if (h === "complete") {
                          n.pause().totalProgress(1);
                        } else if (h === "reset") {
                          n.restart(true).pause();
                        } else if (h === "restart") {
                          n.restart(true);
                        } else {
                          n[h]();
                        }
                      }
                      if (it) {
                        it(Re);
                      }
                    }
                    if (!!d || !Rt) {
                      if (ft && d) {
                        se(Re, ft);
                      }
                      if (le[c]) {
                        se(Re, le[c]);
                      }
                      if (Mt) {
                        if (E === 1) {
                          Re.kill(false, 1);
                        } else {
                          le[c] = 0;
                        }
                      }
                      if (!d) {
                        if (le[c = E === 1 ? 1 : 3]) {
                          se(Re, le[c]);
                        }
                      }
                    }
                    if (Lt && !o && Math.abs(Re.getVelocity()) > (re(Lt) ? Lt : 2500)) {
                      oe(Re.callbackAnimation);
                      if (N) {
                        N.progress(1);
                      } else {
                        oe(n, h === "reverse" ? 1 : !E, 1);
                      }
                    }
                  } else if (Vt && it && !ct) {
                    it(Re);
                  }
                }
                if (L) {
                  var I = Ct ? w / Ct.duration() * (Ct._caScrollDist || 0) : w;
                  O(I + (f._isFlipped ? 1 : 0));
                  L(I);
                }
                if (X) {
                  X(-w / Ct.duration() * (Ct._caScrollDist || 0));
                }
              }
            };
            Re.enable = function (e, n) {
              if (!Re.enabled) {
                Re.enabled = true;
                Ce(Gt, "resize", We);
                if (!Kt) {
                  Ce(Gt, "scroll", Be);
                }
                if (Ie) {
                  Ce(t, "refreshInit", Ie);
                }
                if (e !== false) {
                  Re.progress = Ge = 0;
                  s = a = He = Xe();
                }
                if (n !== false) {
                  Re.refresh();
                }
              }
            };
            Re.getTween = function (t) {
              if (t && r) {
                return r.tween;
              } else {
                return N;
              }
            };
            Re.setPositions = function (t, e, n, r) {
              if (Ct) {
                var i = Ct.scrollTrigger;
                var o = Ct.duration();
                var s = i.end - i.start;
                t = i.start + s * t / o;
                e = i.start + s * e / o;
              }
              Re.refresh(false, false, {
                start: Ht(t, n && !!Re._startClamp),
                end: Ht(e, n && !!Re._endClamp)
              }, r);
              Re.update();
            };
            Re.adjustPinSpacing = function (t) {
              if (E && t) {
                var e = E.indexOf(Wt.d) + 1;
                E[e] = parseFloat(E[e]) + t + we;
                E[1] = parseFloat(E[1]) + t + we;
                hn(E);
              }
            };
            Re.disable = function (e, n) {
              if (e !== false) {
                Re.revert(true, true);
              }
              if (Re.enabled && (Re.enabled = Re.isActive = false, n || N && N.pause(), B = 0, i && (i.uncache = 1), Ie && Ae(t, "refreshInit", Ie), F && (F.pause(), r.tween && r.tween.kill() && (r.tween = 0)), !Kt)) {
                for (var o = ze.length; o--;) {
                  if (ze[o].scroller === Gt && ze[o] !== Re) {
                    return;
                  }
                }
                Ae(Gt, "resize", We);
                if (!Kt) {
                  Ae(Gt, "scroll", Be);
                }
              }
            };
            Re.kill = function (t, r) {
              Re.disable(t, r);
              if (N && !r) {
                N.kill();
              }
              if (ut) {
                delete Ue[ut];
              }
              var o = ze.indexOf(Re);
              if (o >= 0) {
                ze.splice(o, 1);
              }
              if (o === pt && on > 0) {
                pt--;
              }
              o = 0;
              ze.forEach(function (t) {
                return t.scroller === Re.scroller && (o = 1);
              });
              if (!o && !Dt) {
                Re.scroll.rec = 0;
              }
              if (n) {
                n.scrollTrigger = null;
                if (t) {
                  n.revert({
                    kill: false
                  });
                }
                if (!r) {
                  n.kill();
                }
              }
              if (c) {
                [c, h, f, p].forEach(function (t) {
                  return t.parentNode && t.parentNode.removeChild(t);
                });
              }
              if (kt === Re) {
                kt = 0;
              }
              if (bt) {
                if (i) {
                  i.uncache = 1;
                }
                o = 0;
                ze.forEach(function (t) {
                  return t.pin === bt && o++;
                });
                if (!o) {
                  i.spacer = 0;
                }
              }
              if (e.onKill) {
                e.onKill(Re);
              }
            };
            ze.push(Re);
            Re.enable(false, false);
            if (Y) {
              Y(Re);
            }
            if (n && n.add && !g) {
              var Ze = Re.update;
              Re.update = function () {
                Re.update = Ze;
                A.cache++;
                if (!l && !u) {
                  Re.refresh();
                }
              };
              J.delayedCall(0.01, Re.update);
              g = 0.01;
              l = u = 0;
            } else {
              Re.refresh();
            }
            if (bt) {
              (function () {
                if (It !== $e) {
                  var t = It = $e;
                  requestAnimationFrame(function () {
                    return t === $e && nn(true);
                  });
                }
              })();
            }
          } else {
            this.update = this.refresh = this.kill = qt;
          }
        };
        t.register = function (e) {
          if (!$) {
            J = e || Kt();
            if (Yt() && window.document) {
              t.enable();
            }
            $ = Ft;
          }
          return $;
        };
        t.defaults = function (t) {
          if (t) {
            for (var e in t) {
              De[e] = t[e];
            }
          }
          return De;
        };
        t.disable = function (t, e) {
          Ft = 0;
          ze.forEach(function (n) {
            return n[e ? "kill" : "disable"](t);
          });
          Ae(tt, "wheel", Be);
          Ae(et, "scroll", Be);
          clearInterval(ut);
          Ae(et, "touchcancel", qt);
          Ae(rt, "touchstart", qt);
          Oe(Ae, et, "pointerdown,touchstart,mousedown", Vt);
          Oe(Ae, et, "pointerup,touchend,mouseup", Gt);
          ot.kill();
          te(Ae);
          for (var n = 0; n < A.length; n += 3) {
            Re(Ae, A[n], A[n + 1]);
            Re(Ae, A[n], A[n + 2]);
          }
        };
        t.enable = function () {
          tt = window;
          et = document;
          nt = et.documentElement;
          rt = et.body;
          if (J && (st = J.utils.toArray, at = J.utils.clamp, Mt = J.core.context || qt, yt = J.core.suppressOverwrites || qt, Pt = tt.history.scrollRestoration || "auto", rn = tt.pageYOffset || 0, J.core.globals("ScrollTrigger", t), rt)) {
            Ft = 1;
            (Et = document.createElement("div")).style.height = "100vh";
            Et.style.position = "absolute";
            tn();
            Wt();
            Z.register(J);
            t.isTouch = Z.isTouch;
            Tt = Z.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
            wt = Z.isTouch === 1;
            Ce(tt, "wheel", Be);
            it = [tt, et, nt, rt];
            if (J.matchMedia) {
              t.matchMedia = function (t) {
                var e;
                var n = J.matchMedia();
                for (e in t) {
                  n.add(e, t[e]);
                }
                return n;
              };
              J.addEventListener("matchMediaInit", function () {
                Qe();
                Ze();
              });
              J.addEventListener("matchMediaRevert", function () {
                return Ke();
              });
              J.addEventListener("matchMedia", function () {
                nn(0, 1);
                Xe("matchMedia");
              });
              J.matchMedia().add("(orientation: portrait)", function () {
                He();
                return He;
              });
            } else {
              console.warn("Requires GSAP 3.11.0 or later");
            }
            He();
            Ce(et, "scroll", Be);
            var e;
            var n;
            var r = rt.hasAttribute("style");
            var i = rt.style;
            var o = i.borderTopStyle;
            var s = J.core.Animation.prototype;
            if (!s.revert) {
              Object.defineProperty(s, "revert", {
                value: function () {
                  return this.time(-0.01, true);
                }
              });
            }
            i.borderTopStyle = "solid";
            e = Te(rt);
            W.m = Math.round(e.top + W.sc()) || 0;
            H.m = Math.round(e.left + H.sc()) || 0;
            if (o) {
              i.borderTopStyle = o;
            } else {
              i.removeProperty("border-top-style");
            }
            if (!r) {
              rt.setAttribute("style", "");
              rt.removeAttribute("style");
            }
            ut = setInterval(Fe, 250);
            J.delayedCall(0.5, function () {
              return jt = 0;
            });
            Ce(et, "touchcancel", qt);
            Ce(rt, "touchstart", qt);
            Oe(Ce, et, "pointerdown,touchstart,mousedown", Vt);
            Oe(Ce, et, "pointerup,touchend,mouseup", Gt);
            ft = J.utils.checkPrefix("transform");
            ln.push(ft);
            $ = Nt();
            ot = J.delayedCall(0.2, nn).pause();
            gt = [et, "visibilitychange", function () {
              var t = tt.innerWidth;
              var e = tt.innerHeight;
              if (et.hidden) {
                dt = t;
                mt = e;
              } else if (dt !== t || mt !== e) {
                We();
              }
            }, et, "DOMContentLoaded", nn, tt, "load", nn, tt, "resize", We];
            te(Ce);
            ze.forEach(function (t) {
              return t.enable(0, 1);
            });
            n = 0;
            for (; n < A.length; n += 3) {
              Re(Ae, A[n], A[n + 1]);
              Re(Ae, A[n], A[n + 2]);
            }
          }
        };
        t.config = function (e) {
          if ("limitCallbacks" in e) {
            Rt = !!e.limitCallbacks;
          }
          var n = e.syncInterval;
          if (!n || !clearInterval(ut)) {
            if (ut = n) {
              setInterval(Fe, n);
            }
          }
          if ("ignoreMobileResize" in e) {
            wt = t.isTouch === 1 && e.ignoreMobileResize;
          }
          if ("autoRefreshEvents" in e) {
            if (!te(Ae)) {
              te(Ce, e.autoRefreshEvents || "none");
            }
            bt = (e.autoRefreshEvents + "").indexOf("resize") === -1;
          }
        };
        t.scrollerProxy = function (t, e) {
          var n = V(t);
          var r = A.indexOf(n);
          var i = Qt(n);
          if (~r) {
            A.splice(r, i ? 6 : 2);
          }
          if (e) {
            if (i) {
              R.unshift(tt, e, rt, e, nt, e);
            } else {
              R.unshift(n, e);
            }
          }
        };
        t.clearMatchMedia = function (t) {
          ze.forEach(function (e) {
            return e._ctx && e._ctx.query === t && e._ctx.kill(true, true);
          });
        };
        t.isInViewport = function (t, e, n) {
          var r = (ee(t) ? V(t) : t).getBoundingClientRect();
          var i = r[n ? he : fe] * e || 0;
          if (n) {
            return r.right - i > 0 && r.left + i < tt.innerWidth;
          } else {
            return r.bottom - i > 0 && r.top + i < tt.innerHeight;
          }
        };
        t.positionInViewport = function (t, e, n) {
          if (ee(t)) {
            t = V(t);
          }
          var r = t.getBoundingClientRect();
          var i = r[n ? he : fe];
          var o = e == null ? i / 2 : e in Ie ? Ie[e] * i : ~e.indexOf("%") ? parseFloat(e) * i / 100 : parseFloat(e) || 0;
          if (n) {
            return (r.left + o) / tt.innerWidth;
          } else {
            return (r.top + o) / tt.innerHeight;
          }
        };
        t.killAll = function (t) {
          ze.slice(0).forEach(function (t) {
            return t.vars.id !== "ScrollSmoother" && t.kill();
          });
          if (t !== true) {
            var e = Ve.killAll || [];
            Ve = {};
            e.forEach(function (t) {
              return t();
            });
          }
        };
        return t;
      }();
      _n.version = "3.14.2";
      _n.saveStyles = function (t) {
        if (t) {
          return st(t).forEach(function (t) {
            if (t && t.style) {
              var e = Ye.indexOf(t);
              if (e >= 0) {
                Ye.splice(e, 5);
              }
              Ye.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), J.core.getCache(t), Mt());
            }
          });
        } else {
          return Ye;
        }
      };
      _n.revert = function (t, e) {
        return Ze(!t, e);
      };
      _n.create = function (t, e) {
        return new _n(t, e);
      };
      _n.refresh = function (t) {
        if (t) {
          return We(true);
        } else {
          return ($ || _n.register()) && nn(true);
        }
      };
      _n.update = function (t) {
        return ++A.cache && sn(t === true ? 2 : 0);
      };
      _n.clearScrollMemory = Je;
      _n.maxScroll = function (t, e) {
        return $t(t, e ? H : W);
      };
      _n.getScrollFunc = function (t, e) {
        return G(V(t), e ? H : W);
      };
      _n.getById = function (t) {
        return Ue[t];
      };
      _n.getAll = function () {
        return ze.filter(function (t) {
          return t.vars.id !== "ScrollSmoother";
        });
      };
      _n.isScrolling = function () {
        return !!Ut;
      };
      _n.snapDirectional = Ee;
      _n.addEventListener = function (t, e) {
        var n = Ve[t] ||= [];
        if (!~n.indexOf(e)) {
          n.push(e);
        }
      };
      _n.removeEventListener = function (t, e) {
        var n = Ve[t];
        var r = n && n.indexOf(e);
        if (r >= 0) {
          n.splice(r, 1);
        }
      };
      _n.batch = function (t, e) {
        var n;
        var r = [];
        var i = {};
        var o = e.interval || 0.016;
        var s = e.batchMax || 1000000000;
        function a(t, e) {
          var n = [];
          var r = [];
          var i = J.delayedCall(o, function () {
            e(n, r);
            n = [];
            r = [];
          }).pause();
          return function (t) {
            if (!n.length) {
              i.restart(true);
            }
            n.push(t.trigger);
            r.push(t);
            if (s <= n.length) {
              i.progress(1);
            }
          };
        }
        for (n in e) {
          i[n] = n.substr(0, 2) === "on" && ne(e[n]) && n !== "onRefreshInit" ? a(0, e[n]) : e[n];
        }
        if (ne(s)) {
          s = s();
          Ce(_n, "refresh", function () {
            return s = e.batchMax();
          });
        }
        st(t).forEach(function (t) {
          var e = {};
          for (n in i) {
            e[n] = i[n];
          }
          e.trigger = t;
          r.push(_n.create(e));
        });
        return r;
      };
      var wn;
      function xn(t, e, n, r) {
        if (e > r) {
          t(r);
        } else if (e < 0) {
          t(0);
        }
        if (n > r) {
          return (r - e) / (n - e);
        } else if (n < 0) {
          return e / (e - n);
        } else {
          return 1;
        }
      }
      var Sn = function t(e, n) {
        if (n === true) {
          e.style.removeProperty("touch-action");
        } else {
          e.style.touchAction = n === true ? "auto" : n ? "pan-" + n + (Z.isTouch ? " pinch-zoom" : "") : "none";
        }
        if (e === nt) {
          t(rt, n);
        }
      };
      var Tn = {
        auto: 1,
        scroll: 1
      };
      function Mn(t) {
        var e;
        var n = t.event;
        var r = t.target;
        var i = t.axis;
        var o = (n.changedTouches ? n.changedTouches[0] : n).target;
        var s = o._gsap || J.core.getCache(o);
        var a = Nt();
        if (!s._isScrollT || a - s._isScrollT > 2000) {
          while (o && o !== rt && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !Tn[(e = xe(o)).overflowY] && !Tn[e.overflowX])) {
            o = o.parentNode;
          }
          s._isScroll = o && o !== r && !Qt(o) && (Tn[(e = xe(o)).overflowY] || Tn[e.overflowX]);
          s._isScrollT = a;
        }
        if (s._isScroll || i === "x") {
          n.stopPropagation();
          n._gsapAllow = true;
        }
      }
      function Pn(t, e, n, r) {
        return Z.create({
          target: t,
          capture: true,
          debounce: false,
          lockAxis: true,
          type: e,
          onWheel: r = r && Mn,
          onPress: r,
          onDrag: r,
          onScroll: r,
          onEnable: function () {
            return n && Ce(et, Z.eventTypes[0], On, false, true);
          },
          onDisable: function () {
            return Ae(et, Z.eventTypes[0], On, true);
          }
        });
      }
      var En = /(input|label|select|textarea)/i;
      function On(t) {
        var e = En.test(t.target.tagName);
        if (e || wn) {
          t._gsapAllow = true;
          wn = e;
        }
      }
      function Cn(t) {
        if (!ie(t)) {
          t = {};
        }
        t.preventDefault = t.isNormalizer = t.allowClicks = true;
        t.type ||= "wheel,touch";
        t.debounce = !!t.debounce;
        t.id = t.id || "normalizer";
        var e;
        var n;
        var r;
        var i;
        var o;
        var s;
        var a;
        var l;
        var u = t;
        var c = u.normalizeScrollX;
        var h = u.momentum;
        var f = u.allowNestedScroll;
        var p = u.onRelease;
        var d = V(t.target) || nt;
        var m = J.core.globals().ScrollSmoother;
        var g = m && m.get();
        var v = Tt && (t.content && V(t.content) || g && t.content !== false && !g.smooth() && g.content());
        var y = G(d, W);
        var b = G(d, H);
        var _ = 1;
        var w = (Z.isTouch && tt.visualViewport ? tt.visualViewport.scale * tt.visualViewport.width : tt.outerWidth) / tt.innerWidth;
        var x = 0;
        var S = ne(h) ? function () {
          return h(e);
        } : function () {
          return h || 2.8;
        };
        var T = Pn(d, t.type, true, f);
        function M() {
          return i = false;
        }
        var P = qt;
        var E = qt;
        function O() {
          n = $t(d, W);
          E = at(Tt ? 1 : 0, n);
          if (c) {
            P = at(0, $t(d, H));
          }
          r = $e;
        }
        function C() {
          v._gsap.y = Xt(parseFloat(v._gsap.y) + y.offset) + "px";
          v.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(v._gsap.y) + ", 0, 1)";
          y.offset = y.cacheID = 0;
        }
        function R() {
          O();
          if (o.isActive() && o.vars.scrollY > n) {
            if (y() > n) {
              if (o.progress(1)) {
                y(n);
              }
            } else {
              o.resetTo("scrollY", n);
            }
          }
        }
        if (v) {
          J.set(v, {
            y: "+=0"
          });
        }
        t.ignoreCheck = function (t) {
          return Tt && t.type === "touchmove" && function () {
            if (i) {
              requestAnimationFrame(M);
              var t = Xt(e.deltaY / 2);
              var n = E(y.v - t);
              if (v && n !== y.v + y.offset) {
                y.offset = n - y.v;
                var r = Xt((parseFloat(v && v._gsap.y) || 0) - y.offset);
                v.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + r + ", 0, 1)";
                v._gsap.y = r + "px";
                y.cacheID = A.cache;
                sn();
              }
              return true;
            }
            if (y.offset) {
              C();
            }
            i = true;
          }() || _ > 1.05 && t.type !== "touchstart" || e.isGesturing || t.touches && t.touches.length > 1;
        };
        t.onPress = function () {
          i = false;
          var t = _;
          _ = Xt((tt.visualViewport && tt.visualViewport.scale || 1) / w);
          o.pause();
          if (t !== _) {
            Sn(d, _ > 1.01 || !c && "x");
          }
          s = b();
          a = y();
          O();
          r = $e;
        };
        t.onRelease = t.onGestureStart = function (t, e) {
          if (y.offset) {
            C();
          }
          if (e) {
            A.cache++;
            var r;
            var i;
            var s = S();
            if (c) {
              i = (r = b()) + s * 0.05 * -t.velocityX / 0.227;
              s *= xn(b, r, i, $t(d, H));
              o.vars.scrollX = P(i);
            }
            i = (r = y()) + s * 0.05 * -t.velocityY / 0.227;
            s *= xn(y, r, i, $t(d, W));
            o.vars.scrollY = E(i);
            o.invalidate().duration(s).play(0.01);
            if (Tt && o.vars.scrollY >= n || r >= n - 1) {
              J.to({}, {
                onUpdate: R,
                duration: s
              });
            }
          } else {
            l.restart(true);
          }
          if (p) {
            p(t);
          }
        };
        t.onWheel = function () {
          if (o._ts) {
            o.pause();
          }
          if (Nt() - x > 1000) {
            r = 0;
            x = Nt();
          }
        };
        t.onChange = function (t, e, n, i, o) {
          if ($e !== r) {
            O();
          }
          if (e && c) {
            b(P(i[2] === e ? s + (t.startX - t.x) : b() + e - i[1]));
          }
          if (n) {
            if (y.offset) {
              C();
            }
            var l = o[2] === n;
            var u = l ? a + t.startY - t.y : y() + n - o[1];
            var h = E(u);
            if (l && u !== h) {
              a += h - u;
            }
            y(h);
          }
          if (n || e) {
            sn();
          }
        };
        t.onEnable = function () {
          Sn(d, !c && "x");
          _n.addEventListener("refresh", R);
          Ce(tt, "resize", R);
          if (y.smooth) {
            y.target.style.scrollBehavior = "auto";
            y.smooth = b.smooth = false;
          }
          T.enable();
        };
        t.onDisable = function () {
          Sn(d, true);
          Ae(tt, "resize", R);
          _n.removeEventListener("refresh", R);
          T.kill();
        };
        t.lockAxis = t.lockAxis !== false;
        (e = new Z(t)).iOS = Tt;
        if (Tt && !y()) {
          y(1);
        }
        if (Tt) {
          J.ticker.add(qt);
        }
        l = e._dc;
        o = J.to(e, {
          ease: "power4",
          paused: true,
          inherit: false,
          scrollX: c ? "+=0.1" : "+=0",
          scrollY: "+=0.1",
          modifiers: {
            scrollY: vn(y, y(), function () {
              return o.pause();
            })
          },
          onUpdate: sn,
          onComplete: l.vars.onComplete
        });
        return e;
      }
      _n.sort = function (t) {
        if (ne(t)) {
          return ze.sort(t);
        }
        var e = tt.pageYOffset || 0;
        _n.getAll().forEach(function (t) {
          return t._sortY = t.trigger ? e + t.trigger.getBoundingClientRect().top : t.start + tt.innerHeight;
        });
        return ze.sort(t || function (t, e) {
          return (t.vars.refreshPriority || 0) * -1000000 + (t.vars.containerAnimation ? 1000000 : t._sortY) - ((e.vars.containerAnimation ? 1000000 : e._sortY) + (e.vars.refreshPriority || 0) * -1000000);
        });
      };
      _n.observe = function (t) {
        return new Z(t);
      };
      _n.normalizeScroll = function (t) {
        if (t === undefined) {
          return _t;
        }
        if (t === true && _t) {
          return _t.enable();
        }
        if (t === false) {
          if (_t) {
            _t.kill();
          }
          _t = t;
          return;
        }
        var e = t instanceof Z ? t : Cn(t);
        if (_t && _t.target === e.target) {
          _t.kill();
        }
        if (Qt(e.target)) {
          _t = e;
        }
        return e;
      };
      _n.core = {
        _getVelocityProp: q,
        _inputObserver: Pn,
        _scrollers: A,
        _proxies: R,
        bridge: {
          ss: function () {
            if (!Ut) {
              Xe("scrollStart");
            }
            Ut = Nt();
          },
          ref: function () {
            return ct;
          }
        }
      };
      if (Kt()) {
        J.registerPlugin(_n);
      }
      var An;
      var Rn;
      var Ln;
      var Dn;
      var In;
      var kn;
      var jn;
      var Nn;
      function zn() {
        return typeof window != "undefined";
      }
      function Un() {
        return An || zn() && (An = window.gsap) && An.registerPlugin && An;
      }
      function Fn(t) {
        return typeof t == "string";
      }
      function Bn(t) {
        return typeof t == "function";
      }
      function Hn(t, e) {
        var n = e === "x" ? "Width" : "Height";
        var r = "scroll" + n;
        var i = "client" + n;
        if (t === Ln || t === Dn || t === In) {
          return Math.max(Dn[r], In[r]) - (Ln["inner" + n] || Dn[i] || In[i]);
        } else {
          return t[r] - t["offset" + n];
        }
      }
      function Wn(t, e) {
        var n = "scroll" + (e === "x" ? "Left" : "Top");
        if (t === Ln) {
          if (t.pageXOffset != null) {
            n = "page" + e.toUpperCase() + "Offset";
          } else {
            t = Dn[n] != null ? Dn : In;
          }
        }
        return function () {
          return t[n];
        };
      }
      function Vn(t, e) {
        if (!(t = kn(t)[0]) || !t.getBoundingClientRect) {
          return console.warn("scrollTo target doesn't exist. Using 0") || {
            x: 0,
            y: 0
          };
        }
        var n = t.getBoundingClientRect();
        var r = !e || e === Ln || e === In;
        var i = r ? {
          top: Dn.clientTop - (Ln.pageYOffset || Dn.scrollTop || In.scrollTop || 0),
          left: Dn.clientLeft - (Ln.pageXOffset || Dn.scrollLeft || In.scrollLeft || 0)
        } : e.getBoundingClientRect();
        var o = {
          x: n.left - i.left,
          y: n.top - i.top
        };
        if (!r && e) {
          o.x += Wn(e, "x")();
          o.y += Wn(e, "y")();
        }
        return o;
      }
      function Gn(t, e, n, r, i) {
        if (isNaN(t) || typeof t == "object") {
          if (Fn(t) && t.charAt(1) === "=") {
            return parseFloat(t.substr(2)) * (t.charAt(0) === "-" ? -1 : 1) + r - i;
          } else if (t === "max") {
            return Hn(e, n) - i;
          } else {
            return Math.min(Hn(e, n), Vn(t, e)[n] - i);
          }
        } else {
          return parseFloat(t) - i;
        }
      }
      function qn() {
        An = Un();
        if (zn() && An && typeof document != "undefined" && document.body) {
          Ln = window;
          In = document.body;
          Dn = document.documentElement;
          kn = An.utils.toArray;
          An.config({
            autoKillThreshold: 7
          });
          jn = An.config();
          Rn = 1;
        }
      }
      var Xn = {
        version: "3.14.2",
        name: "scrollTo",
        rawVars: 1,
        register: function (t) {
          An = t;
          qn();
        },
        init: function (t, e, n, r, i) {
          if (!Rn) {
            qn();
          }
          var o = this;
          var s = An.getProperty(t, "scrollSnapType");
          o.isWin = t === Ln;
          o.target = t;
          o.tween = n;
          e = function (t, e, n, r) {
            if (Bn(t)) {
              t = t(e, n, r);
            }
            if (typeof t != "object") {
              if (Fn(t) && t !== "max" && t.charAt(1) !== "=") {
                return {
                  x: t,
                  y: t
                };
              } else {
                return {
                  y: t
                };
              }
            }
            if (t.nodeType) {
              return {
                y: t,
                x: t
              };
            }
            var i;
            var o = {};
            for (i in t) {
              o[i] = i !== "onAutoKill" && Bn(t[i]) ? t[i](e, n, r) : t[i];
            }
            return o;
          }(e, r, t, i);
          o.vars = e;
          o.autoKill = !!("autoKill" in e ? e : jn).autoKill;
          o.getX = Wn(t, "x");
          o.getY = Wn(t, "y");
          o.x = o.xPrev = o.getX();
          o.y = o.yPrev = o.getY();
          Nn ||= An.core.globals().ScrollTrigger;
          if (An.getProperty(t, "scrollBehavior") === "smooth") {
            An.set(t, {
              scrollBehavior: "auto"
            });
          }
          if (s && s !== "none") {
            o.snap = 1;
            o.snapInline = t.style.scrollSnapType;
            t.style.scrollSnapType = "none";
          }
          if (e.x != null) {
            o.add(o, "x", o.x, Gn(e.x, t, "x", o.x, e.offsetX || 0), r, i);
            o._props.push("scrollTo_x");
          } else {
            o.skipX = 1;
          }
          if (e.y != null) {
            o.add(o, "y", o.y, Gn(e.y, t, "y", o.y, e.offsetY || 0), r, i);
            o._props.push("scrollTo_y");
          } else {
            o.skipY = 1;
          }
        },
        render: function (t, e) {
          var n;
          var r;
          var i;
          var o;
          var s;
          for (var a = e._pt, l = e.target, u = e.tween, c = e.autoKill, h = e.xPrev, f = e.yPrev, p = e.isWin, d = e.snap, m = e.snapInline; a;) {
            a.r(t, a.d);
            a = a._next;
          }
          n = p || !e.skipX ? e.getX() : h;
          i = (r = p || !e.skipY ? e.getY() : f) - f;
          o = n - h;
          s = jn.autoKillThreshold;
          if (e.x < 0) {
            e.x = 0;
          }
          if (e.y < 0) {
            e.y = 0;
          }
          if (c) {
            if (!e.skipX && (o > s || o < -s) && n < Hn(l, "x")) {
              e.skipX = 1;
            }
            if (!e.skipY && (i > s || i < -s) && r < Hn(l, "y")) {
              e.skipY = 1;
            }
            if (e.skipX && e.skipY) {
              u.kill();
              if (e.vars.onAutoKill) {
                e.vars.onAutoKill.apply(u, e.vars.onAutoKillParams || []);
              }
            }
          }
          if (p) {
            Ln.scrollTo(e.skipX ? n : e.x, e.skipY ? r : e.y);
          } else {
            if (!e.skipY) {
              l.scrollTop = e.y;
            }
            if (!e.skipX) {
              l.scrollLeft = e.x;
            }
          }
          if (!!d && (t === 1 || t === 0)) {
            r = l.scrollTop;
            n = l.scrollLeft;
            if (m) {
              l.style.scrollSnapType = m;
            } else {
              l.style.removeProperty("scroll-snap-type");
            }
            l.scrollTop = r + 1;
            l.scrollLeft = n + 1;
            l.scrollTop = r;
            l.scrollLeft = n;
          }
          e.xPrev = e.x;
          e.yPrev = e.y;
          if (Nn) {
            Nn.update();
          }
        },
        kill: function (t) {
          var e = t === "scrollTo";
          var n = this._props.indexOf(t);
          if (e || t === "scrollTo_x") {
            this.skipX = 1;
          }
          if (e || t === "scrollTo_y") {
            this.skipY = 1;
          }
          if (n > -1) {
            this._props.splice(n, 1);
          }
          return !this._props.length;
        }
      };
      Xn.max = Hn;
      Xn.getOffset = Vn;
      Xn.buildGetter = Wn;
      Xn.config = function (t) {
        if (!jn && !qn()) {
          jn = An.config();
        }
        for (var e in t) {
          jn[e] = t[e];
        }
      };
      if (Un()) {
        An.registerPlugin(Xn);
      }
      var Yn;
      var Kn;
      var Qn;
      var Zn;
      var Jn;
      var $n;
      var tr;
      var er;
      function nr() {
        return Yn || typeof window != "undefined" && (Yn = window.gsap);
      }
      var rr = {};
      function ir(t) {
        return er(t).id;
      }
      function or(t) {
        return rr[ir(typeof t == "string" ? Qn(t)[0] : t)];
      }
      function sr(t) {
        var e;
        var n = Jn;
        if (t - tr >= 0.05) {
          for (tr = t; n;) {
            if ((e = n.g(n.t, n.p)) !== n.v1 || t - n.t1 > 0.2) {
              n.v2 = n.v1;
              n.v1 = e;
              n.t2 = n.t1;
              n.t1 = t;
            }
            n = n._next;
          }
        }
      }
      var ar = {
        deg: 360,
        rad: Math.PI * 2
      };
      function lr() {
        if (Yn = nr()) {
          Qn = Yn.utils.toArray;
          Zn = Yn.utils.getUnit;
          er = Yn.core.getCache;
          $n = Yn.ticker;
          Kn = 1;
        }
      }
      function ur(t, e, n, r) {
        this.t = t;
        this.p = e;
        this.g = t._gsap.get;
        this.rCap = ar[n || Zn(this.g(t, e))];
        this.v1 = this.v2 = this.g(t, e);
        this.t1 = this.t2 = $n.time;
        if (r) {
          this._next = r;
          r._prev = this;
        }
      }
      var cr = function () {
        function t(t, e) {
          if (!Kn) {
            lr();
          }
          this.target = Qn(t)[0];
          rr[ir(this.target)] = this;
          this._props = {};
          if (e) {
            this.add(e);
          }
        }
        t.register = function (t) {
          Yn = t;
          lr();
        };
        var e = t.prototype;
        e.get = function (t, e) {
          var n;
          var r;
          var i;
          var o = this._props[t] || console.warn("Not tracking " + t + " velocity.");
          n = parseFloat(e ? o.v1 : o.g(o.t, o.p)) - parseFloat(o.v2);
          if ((r = o.rCap) && (n %= r) !== n % (r / 2)) {
            n = n < 0 ? n + r : n - r;
          }
          i = n / ((e ? o.t1 : $n.time) - o.t2);
          return Math.round(i * 10000) / 10000;
        };
        e.getAll = function () {
          var t;
          var e = {};
          var n = this._props;
          for (t in n) {
            e[t] = this.get(t);
          }
          return e;
        };
        e.isTracking = function (t) {
          return t in this._props;
        };
        e.add = function (t, e) {
          var n = this._props[t];
          if (n) {
            n.v1 = n.v2 = n.g(n.t, n.p);
            n.t1 = n.t2 = $n.time;
          } else {
            if (!Jn) {
              $n.add(sr);
              tr = $n.time;
            }
            Jn = this._props[t] = new ur(this.target, t, e, Jn);
          }
        };
        e.remove = function (t) {
          var e;
          var n;
          var r = this._props[t];
          if (r) {
            e = r._prev;
            n = r._next;
            if (e) {
              e._next = n;
            }
            if (n) {
              n._prev = e;
            } else if (Jn === r) {
              $n.remove(sr);
              Jn = 0;
            }
            delete this._props[t];
          }
        };
        e.kill = function (t) {
          for (var e in this._props) {
            this.remove(e);
          }
          if (!t) {
            delete rr[ir(this.target)];
          }
        };
        t.track = function (e, n, r) {
          if (!Kn) {
            lr();
          }
          var i;
          var o;
          var s = [];
          var a = Qn(e);
          var l = n.split(",");
          var u = (r || "").split(",");
          for (var c = a.length; c--;) {
            i = or(a[c]) || new t(a[c]);
            o = l.length;
            while (o--) {
              i.add(l[o], u[o] || u[0]);
            }
            s.push(i);
          }
          return s;
        };
        t.untrack = function (t, e) {
          var n = e && e.split(",");
          Qn(t).forEach(function (t) {
            var e = or(t);
            if (e) {
              if (n) {
                n.forEach(function (t) {
                  return e.remove(t);
                });
              } else {
                e.kill(1);
              }
            }
          });
        };
        t.isTracking = function (t, e) {
          var n = or(t);
          return n && n.isTracking(e);
        };
        t.getVelocity = function (t, e) {
          var n = or(t);
          if (n && n.isTracking(e)) {
            return n.get(e);
          } else {
            return console.warn("Not tracking velocity of " + e);
          }
        };
        return t;
      }();
      cr.getByTarget = or;
      if (nr()) {
        Yn.registerPlugin(cr);
      }
      var hr;
      var fr;
      var pr;
      var dr;
      var mr;
      var gr;
      var vr;
      var yr;
      var br;
      var _r;
      var wr;
      var xr;
      var Sr;
      var Tr;
      var Mr = cr.getByTarget;
      function Pr() {
        return hr || typeof window != "undefined" && (hr = window.gsap) && hr.registerPlugin && hr;
      }
      function Er(t) {
        return typeof t == "number";
      }
      function Or(t) {
        return typeof t == "object";
      }
      function Cr(t) {
        return typeof t == "function";
      }
      var Ar = Array.isArray;
      function Rr(t) {
        return t;
      }
      var Lr = 10000000000;
      function Dr(t) {
        return Math.round(t * 10000) / 10000;
      }
      function Ir(t, e, n) {
        for (var r in e) {
          if (!(r in t) && r !== n) {
            t[r] = e[r];
          }
        }
        return t;
      }
      var kr = function t(e) {
        var n;
        var r;
        var i = {};
        for (n in e) {
          i[n] = Or(r = e[n]) && !Ar(r) ? t(r) : r;
        }
        return i;
      };
      function jr(t, e, n, r, i) {
        var o;
        var s;
        var a;
        var l;
        var u = e.length;
        var c = 0;
        var h = Lr;
        if (Or(t)) {
          while (u--) {
            o = e[u];
            s = 0;
            for (a in t) {
              s += (l = o[a] - t[a]) * l;
            }
            if (s < h) {
              c = u;
              h = s;
            }
          }
          if ((i || Lr) < Lr && i < Math.sqrt(h)) {
            return t;
          }
        } else {
          while (u--) {
            if ((s = (o = e[u]) - t) < 0) {
              s = -s;
            }
            if (s < h && o >= r && o <= n) {
              c = u;
              h = s;
            }
          }
        }
        return e[c];
      }
      function Nr(t, e, n, r, i, o, s) {
        if (t.end === "auto") {
          return t;
        }
        var a;
        var l;
        var u = t.end;
        n = isNaN(n) ? Lr : n;
        r = isNaN(r) ? -Lr : r;
        if (Or(e)) {
          a = e.calculated ? e : (Cr(u) ? u(e, s) : jr(e, u, n, r, o)) || e;
          if (!e.calculated) {
            for (l in a) {
              e[l] = a[l];
            }
            e.calculated = true;
          }
          a = a[i];
        } else {
          a = Cr(u) ? u(e, s) : Ar(u) ? jr(e, u, n, r, o) : parseFloat(u);
        }
        if (a > n) {
          a = n;
        } else if (a < r) {
          a = r;
        }
        return {
          max: a,
          min: a,
          unitFactor: t.unitFactor
        };
      }
      function zr(t, e, n) {
        if (isNaN(t[e])) {
          return n;
        } else {
          return +t[e];
        }
      }
      function Ur(t, e) {
        return e * 0.05 * t / _r;
      }
      function Fr(t, e, n) {
        return Math.abs((e - t) * _r / n / 0.05);
      }
      var Br = {
        resistance: 1,
        checkpoint: 1,
        preventOvershoot: 1,
        linkedProps: 1,
        radius: 1,
        duration: 1
      };
      function Hr(t, e, n, r) {
        if (e.linkedProps) {
          var i;
          var o;
          var s;
          var a;
          var l;
          var u;
          var c = e.linkedProps.split(",");
          var h = {};
          for (i = 0; i < c.length; i++) {
            if (s = e[o = c[i]]) {
              a = Er(s.velocity) ? s.velocity : (l = l || Mr(t)) && l.isTracking(o) ? l.get(o) : 0;
              u = Math.abs(a / zr(s, "resistance", r));
              h[o] = parseFloat(n(t, o)) + Ur(a, u);
            }
          }
          return h;
        }
      }
      function Wr() {
        if (hr = Pr()) {
          pr = hr.parseEase;
          dr = hr.utils.toArray;
          vr = hr.utils.getUnit;
          br = hr.core.getCache;
          wr = hr.utils.clamp;
          Sr = hr.core.getStyleSaver;
          Tr = hr.core.reverting || function () {};
          mr = pr("power3");
          _r = mr(0.05);
          yr = hr.core.PropTween;
          hr.config({
            resistance: 100,
            unitFactors: {
              time: 1000,
              totalTime: 1000,
              progress: 1000,
              totalProgress: 1000
            }
          });
          gr = hr.config();
          hr.registerPlugin(cr);
          fr = 1;
        }
      }
      var Vr = {
        version: "3.14.2",
        name: "inertia",
        register: function (t) {
          hr = t;
          Wr();
        },
        init: function (t, e, n, r, i) {
          if (!fr) {
            Wr();
          }
          var o = Mr(t);
          if (e === "auto") {
            if (!o) {
              console.warn("No inertia tracking on " + t + ". InertiaPlugin.track(target) first.");
              return;
            }
            e = o.getAll();
          }
          this.styles = Sr && typeof t.style == "object" && Sr(t);
          this.target = t;
          this.tween = n;
          xr = e;
          var s;
          var a;
          var l;
          var u;
          var c;
          var h;
          var f;
          var p;
          var d;
          var m = t._gsap;
          var g = m.get;
          var v = e.duration;
          var y = Or(v);
          var b = e.preventOvershoot || y && v.overshoot === 0;
          var _ = zr(e, "resistance", gr.resistance);
          var w = Er(v) ? v : function (t, e, n = 10, r = 0.2, i = 1, o = 0) {
            if (typeof t == "string") {
              t = dr(t)[0];
            }
            if (!t) {
              return 0;
            }
            var s;
            var a;
            var l;
            var u;
            var c;
            var h;
            var f;
            var p;
            var d;
            var m;
            var g = 0;
            var v = Lr;
            var y = e.inertia || e;
            var b = br(t).get;
            var _ = zr(y, "resistance", gr.resistance);
            m = Hr(t, y, b, _);
            for (s in y) {
              if (!Br[s]) {
                a = y[s];
                if (!Or(a)) {
                  if ((p = p || Mr(t)) && p.isTracking(s)) {
                    a = Er(a) ? {
                      velocity: a
                    } : {
                      velocity: p.get(s)
                    };
                  } else {
                    u = +a || 0;
                    l = Math.abs(u / _);
                  }
                }
                if (Or(a)) {
                  u = Er(a.velocity) ? a.velocity : (p = p || Mr(t)) && p.isTracking(s) ? p.get(s) : 0;
                  l = wr(r, n, Math.abs(u / zr(a, "resistance", _)));
                  h = (c = parseFloat(b(t, s)) || 0) + Ur(u, l);
                  if ("end" in a) {
                    a = Nr(a, m && s in m ? m : h, a.max, a.min, s, y.radius, u);
                    if (o) {
                      if (xr === e) {
                        xr = y = kr(e);
                      }
                      y[s] = Ir(a, y[s], "end");
                    }
                  }
                  if ("max" in a && h > +a.max + 1e-10) {
                    d = a.unitFactor || gr.unitFactors[s] || 1;
                    if ((f = c > a.max && a.min !== a.max || u * d > -15 && u * d < 45 ? r + (n - r) * 0.1 : Fr(c, a.max, u)) + i < v) {
                      v = f + i;
                    }
                  } else if ("min" in a && h < +a.min - 1e-10) {
                    d = a.unitFactor || gr.unitFactors[s] || 1;
                    if ((f = c < a.min && a.min !== a.max || u * d > -45 && u * d < 15 ? r + (n - r) * 0.1 : Fr(c, a.min, u)) + i < v) {
                      v = f + i;
                    }
                  }
                  if (f > g) {
                    g = f;
                  }
                }
                if (l > g) {
                  g = l;
                }
              }
            }
            if (g > v) {
              g = v;
            }
            if (g > n) {
              return n;
            } else if (g < r) {
              return r;
            } else {
              return g;
            }
          }(t, e, y && v.max || 10, y && v.min || 0.2, y && "overshoot" in v ? +v.overshoot : b ? 0 : 1, true);
          e = xr;
          xr = 0;
          d = Hr(t, e, g, _);
          for (s in e) {
            if (!Br[s]) {
              a = e[s];
              if (Cr(a)) {
                a = a(r, t, i);
              }
              if (Er(a)) {
                c = a;
              } else if (Or(a) && !isNaN(a.velocity)) {
                c = +a.velocity;
              } else if (o && o.isTracking(s)) {
                c = o.get(s);
              } else {
                console.warn("ERROR: No velocity was defined for " + t + " property: " + s);
              }
              h = Ur(c, w);
              p = 0;
              l = g(t, s);
              u = vr(l);
              l = parseFloat(l);
              if (Or(a)) {
                f = l + h;
                if ("end" in a) {
                  a = Nr(a, d && s in d ? d : f, a.max, a.min, s, e.radius, c);
                }
                if ("max" in a && +a.max < f) {
                  if (b || a.preventOvershoot) {
                    h = a.max - l;
                  } else {
                    p = a.max - l - h;
                  }
                } else if ("min" in a && +a.min > f) {
                  if (b || a.preventOvershoot) {
                    h = a.min - l;
                  } else {
                    p = a.min - l - h;
                  }
                }
              }
              this._props.push(s);
              if (this.styles) {
                this.styles.save(s);
              }
              this._pt = new yr(this._pt, t, s, l, 0, Rr, 0, m.set(t, s, this));
              this._pt.u = u || 0;
              this._pt.c1 = h;
              this._pt.c2 = p;
            }
          }
          n.duration(w);
          return 1;
        },
        render: function (t, e) {
          var n = e._pt;
          if ((t = mr(e.tween._time / e.tween._dur)) || !Tr()) {
            while (n) {
              n.set(n.t, n.p, Dr(n.s + n.c1 * t + n.c2 * t * t) + n.u, n.d, t);
              n = n._next;
            }
          } else {
            e.styles.revert();
          }
        }
      };
      "track,untrack,isTracking,getVelocity,getByTarget".split(",").forEach(function (t) {
        return Vr[t] = cr[t];
      });
      if (Pr()) {
        hr.registerPlugin(Vr);
      }
      var Gr;
      var qr;
      var Xr;
      var Yr;
      var Kr;
      var Qr;
      var Zr;
      var Jr;
      var $r;
      var ti = "transform";
      var ei = ti + "Origin";
      function ni(t) {
        var e = t.ownerDocument || t;
        if (!(ti in t.style) && "msTransform" in t.style) {
          ei = (ti = "msTransform") + "Origin";
        }
        while (e.parentNode && (e = e.parentNode));
        qr = window;
        Zr = new ci();
        if (e) {
          Gr = e;
          Xr = e.documentElement;
          Yr = e.body;
          (Jr = Gr.createElementNS("http://www.w3.org/2000/svg", "g")).style.transform = "none";
          var n = e.createElement("div");
          var r = e.createElement("div");
          var i = e && (e.body || e.firstElementChild);
          if (i && i.appendChild) {
            i.appendChild(n);
            n.appendChild(r);
            n.style.position = "static";
            n.style.transform = "translate3d(0,0,1px)";
            $r = r.offsetParent !== n;
            i.removeChild(n);
          }
        }
        return e;
      }
      var ri = [];
      var ii = [];
      function oi(t) {
        return t.ownerSVGElement || ((t.tagName + "").toLowerCase() === "svg" ? t : null);
      }
      var si = function t(e) {
        return qr.getComputedStyle(e).position === "fixed" || ((e = e.parentNode) && e.nodeType === 1 ? t(e) : undefined);
      };
      var ai = function t(e, n) {
        if (e.parentNode && (Gr || ni(e))) {
          var r = oi(e);
          var i = r ? r.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml";
          var o = r ? n ? "rect" : "g" : "div";
          var s = n !== 2 ? 0 : 100;
          var a = n === 3 ? 100 : 0;
          var l = {
            position: "absolute",
            display: "block",
            pointerEvents: "none",
            margin: "0",
            padding: "0"
          };
          var u = Gr.createElementNS ? Gr.createElementNS(i.replace(/^https/, "http"), o) : Gr.createElement(o);
          if (n) {
            if (r) {
              Qr ||= t(e);
              u.setAttribute("width", 0.01);
              u.setAttribute("height", 0.01);
              u.setAttribute("transform", "translate(" + s + "," + a + ")");
              u.setAttribute("fill", "transparent");
              Qr.appendChild(u);
            } else {
              if (!Kr) {
                Kr = t(e);
                Object.assign(Kr.style, l);
              }
              Object.assign(u.style, l, {
                width: "0.1px",
                height: "0.1px",
                top: a + "px",
                left: s + "px"
              });
              Kr.appendChild(u);
            }
          }
          return u;
        }
        throw "Need document and parent.";
      };
      function li(t, e) {
        var n;
        var r;
        var i;
        var o;
        var s;
        var a;
        var l = oi(t);
        var u = t === l;
        var c = l ? ri : ii;
        var h = t.parentNode;
        var f = h && !l && h.shadowRoot && h.shadowRoot.appendChild ? h.shadowRoot : h;
        if (t === qr) {
          return t;
        }
        if (!c.length) {
          c.push(ai(t, 1), ai(t, 2), ai(t, 3));
        }
        n = l ? Qr : Kr;
        if (l) {
          if (u) {
            i = function (t) {
              var e;
              var n = t.getCTM();
              if (!n) {
                e = t.style[ti];
                t.style[ti] = "none";
                t.appendChild(Jr);
                n = Jr.getCTM();
                t.removeChild(Jr);
                if (e) {
                  t.style[ti] = e;
                } else {
                  t.style.removeProperty(ti.replace(/([A-Z])/g, "-$1").toLowerCase());
                }
              }
              return n || Zr.clone();
            }(t);
            o = -i.e / i.a;
            s = -i.f / i.d;
            r = Zr;
          } else if (t.getBBox) {
            i = t.getBBox();
            o = (r = (r = t.transform ? t.transform.baseVal : {}).numberOfItems ? r.numberOfItems > 1 ? function (t) {
              var e = new ci();
              for (var n = 0; n < t.numberOfItems; n++) {
                e.multiply(t.getItem(n).matrix);
              }
              return e;
            }(r) : r.getItem(0).matrix : Zr).a * i.x + r.c * i.y;
            s = r.b * i.x + r.d * i.y;
          } else {
            r = new ci();
            o = s = 0;
          }
          if (e && t.tagName.toLowerCase() === "g") {
            o = s = 0;
          }
          (u || !t.getBoundingClientRect().width ? l : h).appendChild(n);
          n.setAttribute("transform", "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e + o) + "," + (r.f + s) + ")");
        } else {
          o = s = 0;
          if ($r) {
            r = t.offsetParent;
            i = t;
            while ((i &&= i.parentNode) && i !== r && i.parentNode) {
              if ((qr.getComputedStyle(i)[ti] + "").length > 4) {
                o = i.offsetLeft;
                s = i.offsetTop;
                i = 0;
              }
            }
          }
          if ((a = qr.getComputedStyle(t)).position !== "absolute" && a.position !== "fixed") {
            for (r = t.offsetParent; h && h !== r;) {
              o += h.scrollLeft || 0;
              s += h.scrollTop || 0;
              h = h.parentNode;
            }
          }
          (i = n.style).top = t.offsetTop - s + "px";
          i.left = t.offsetLeft - o + "px";
          i[ti] = a[ti];
          i[ei] = a[ei];
          i.position = a.position === "fixed" ? "fixed" : "absolute";
          f.appendChild(n);
        }
        return n;
      }
      function ui(t, e, n, r, i, o, s) {
        t.a = e;
        t.b = n;
        t.c = r;
        t.d = i;
        t.e = o;
        t.f = s;
        return t;
      }
      var ci = function () {
        function t(t = 1, e = 0, n = 0, r = 1, i = 0, o = 0) {
          ui(this, t, e, n, r, i, o);
        }
        var e = t.prototype;
        e.inverse = function () {
          var t = this.a;
          var e = this.b;
          var n = this.c;
          var r = this.d;
          var i = this.e;
          var o = this.f;
          var s = t * r - e * n || 1e-10;
          return ui(this, r / s, -e / s, -n / s, t / s, (n * o - r * i) / s, -(t * o - e * i) / s);
        };
        e.multiply = function (t) {
          var e = this.a;
          var n = this.b;
          var r = this.c;
          var i = this.d;
          var o = this.e;
          var s = this.f;
          var a = t.a;
          var l = t.c;
          var u = t.b;
          var c = t.d;
          var h = t.e;
          var f = t.f;
          return ui(this, a * e + u * r, a * n + u * i, l * e + c * r, l * n + c * i, o + h * e + f * r, s + h * n + f * i);
        };
        e.clone = function () {
          return new t(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        e.equals = function (t) {
          var e = this.a;
          var n = this.b;
          var r = this.c;
          var i = this.d;
          var o = this.e;
          var s = this.f;
          return e === t.a && n === t.b && r === t.c && i === t.d && o === t.e && s === t.f;
        };
        e.apply = function (t, e = {}) {
          var n = t.x;
          var r = t.y;
          var i = this.a;
          var o = this.b;
          var s = this.c;
          var a = this.d;
          var l = this.e;
          var u = this.f;
          e.x = n * i + r * s + l || 0;
          e.y = n * o + r * a + u || 0;
          return e;
        };
        return t;
      }();
      function hi(t, e, n, r) {
        if (!t || !t.parentNode || (Gr || ni(t)).documentElement === t) {
          return new ci();
        }
        var i = function (t) {
          for (var e, n; t && t !== Yr;) {
            if ((n = t._gsap) && n.uncache) {
              n.get(t, "x");
            }
            if (n && !n.scaleX && !n.scaleY && n.renderTransform) {
              n.scaleX = n.scaleY = 0.0001;
              n.renderTransform(1, n);
              if (e) {
                e.push(n);
              } else {
                e = [n];
              }
            }
            t = t.parentNode;
          }
          return e;
        }(t);
        var o = oi(t) ? ri : ii;
        var s = li(t, n);
        var a = o[0].getBoundingClientRect();
        var l = o[1].getBoundingClientRect();
        var u = o[2].getBoundingClientRect();
        var c = s.parentNode;
        var h = !r && si(t);
        var f = new ci((l.left - a.left) / 100, (l.top - a.top) / 100, (u.left - a.left) / 100, (u.top - a.top) / 100, a.left + (h ? 0 : qr.pageXOffset || Gr.scrollLeft || Xr.scrollLeft || Yr.scrollLeft || 0), a.top + (h ? 0 : qr.pageYOffset || Gr.scrollTop || Xr.scrollTop || Yr.scrollTop || 0));
        c.removeChild(s);
        if (i) {
          for (a = i.length; a--;) {
            (l = i[a]).scaleX = l.scaleY = 0;
            l.renderTransform(1, l);
          }
        }
        if (e) {
          return f.inverse();
        } else {
          return f;
        }
      }
      function fi(t) {
        if (t === undefined) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return t;
      }
      var pi;
      var di;
      var mi;
      var gi;
      var vi;
      var yi;
      var bi;
      var _i;
      var wi;
      var xi;
      var Si;
      var Ti;
      var Mi;
      var Pi;
      var Ei;
      var Oi;
      var Ci;
      var Ai;
      var Ri;
      var Li;
      var Di;
      var Ii;
      var ki = 0;
      function ji() {
        return typeof window != "undefined";
      }
      function Ni() {
        return pi || ji() && (pi = window.gsap) && pi.registerPlugin && pi;
      }
      function zi(t) {
        return typeof t == "function";
      }
      function Ui(t) {
        return typeof t == "object";
      }
      function Fi(t) {
        return t === undefined;
      }
      function Bi() {
        return false;
      }
      var Hi = "transform";
      var Wi = "transformOrigin";
      function Vi(t) {
        return Math.round(t * 10000) / 10000;
      }
      var Gi = Array.isArray;
      function qi(t, e) {
        var n = mi.createElementNS ? mi.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : mi.createElement(t);
        if (n.style) {
          return n;
        } else {
          return mi.createElement(t);
        }
      }
      var Xi = 180 / Math.PI;
      var Yi = 100000000000000000000;
      var Ki = new ci();
      var Qi = Date.now || function () {
        return new Date().getTime();
      };
      var Zi = [];
      var Ji = {};
      var $i = 0;
      var to = /^(?:a|input|textarea|button|select)$/i;
      var eo = 0;
      var no = {};
      var ro = {};
      function io(t, e) {
        var n;
        var r = {};
        for (n in t) {
          r[n] = e ? t[n] * e : t[n];
        }
        return r;
      }
      var oo = function t(e, n) {
        var r;
        for (var i = e.length; i--;) {
          if (n) {
            e[i].style.touchAction = n;
          } else {
            e[i].style.removeProperty("touch-action");
          }
          if ((r = e[i].children) && r.length) {
            t(r, n);
          }
        }
      };
      function so() {
        return Zi.forEach(function (t) {
          return t();
        });
      }
      function ao() {
        return !Zi.length && pi.ticker.remove(so);
      }
      function lo(t) {
        for (var e = Zi.length; e--;) {
          if (Zi[e] === t) {
            Zi.splice(e, 1);
          }
        }
        pi.to(ao, {
          overwrite: true,
          delay: 15,
          duration: 0,
          onComplete: ao,
          data: "_draggable"
        });
      }
      function uo(t, e, n, r) {
        if (t.addEventListener) {
          var i = Mi[e];
          r = r || (Si ? {
            passive: false
          } : null);
          t.addEventListener(i || e, n, r);
          if (i && e !== i) {
            t.addEventListener(e, n, r);
          }
        }
      }
      function co(t, e, n, r) {
        if (t.removeEventListener) {
          var i = Mi[e];
          t.removeEventListener(i || e, n, r);
          if (i && e !== i) {
            t.removeEventListener(e, n, r);
          }
        }
      }
      function ho(t) {
        if (t.preventDefault) {
          t.preventDefault();
        }
        if (t.preventManipulation) {
          t.preventManipulation();
        }
      }
      var fo = function t(e) {
        Pi = e.touches && ki < e.touches.length;
        co(e.target, "touchend", t);
      };
      function po(t) {
        Pi = t.touches && ki < t.touches.length;
        uo(t.target, "touchend", fo);
      }
      function mo(t) {
        return di.pageYOffset || t.scrollTop || t.documentElement.scrollTop || t.body.scrollTop || 0;
      }
      function go(t) {
        return di.pageXOffset || t.scrollLeft || t.documentElement.scrollLeft || t.body.scrollLeft || 0;
      }
      var vo = function t(e, n) {
        uo(e, "scroll", n);
        if (!bo(e.parentNode)) {
          t(e.parentNode, n);
        }
      };
      var yo = function t(e, n) {
        co(e, "scroll", n);
        if (!bo(e.parentNode)) {
          t(e.parentNode, n);
        }
      };
      function bo(t) {
        return !t || t === gi || t.nodeType === 9 || t === mi.body || t === di || !t.nodeType || !t.parentNode;
      }
      function _o(t, e) {
        var n = e === "x" ? "Width" : "Height";
        var r = "scroll" + n;
        var i = "client" + n;
        return Math.max(0, bo(t) ? Math.max(gi[r], vi[r]) - (di["inner" + n] || gi[i] || vi[i]) : t[r] - t[i]);
      }
      var wo = function t(e, n) {
        var r = _o(e, "x");
        var i = _o(e, "y");
        if (bo(e)) {
          e = ro;
        } else {
          t(e.parentNode, n);
        }
        e._gsMaxScrollX = r;
        e._gsMaxScrollY = i;
        if (!n) {
          e._gsScrollX = e.scrollLeft || 0;
          e._gsScrollY = e.scrollTop || 0;
        }
      };
      function xo(t, e, n) {
        var r = t.style;
        if (r) {
          if (Fi(r[e])) {
            e = wi(e, t) || e;
          }
          if (n == null) {
            if (r.removeProperty) {
              r.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase());
            }
          } else {
            r[e] = n;
          }
        }
      }
      function So(t) {
        return di.getComputedStyle(t instanceof Element ? t : t.host || (t.parentNode || {}).host || t);
      }
      var To = {};
      function Mo(t) {
        if (t === di) {
          To.left = To.top = 0;
          To.width = To.right = gi.clientWidth || t.innerWidth || vi.clientWidth || 0;
          To.height = To.bottom = (t.innerHeight || 0) - 20 < gi.clientHeight ? gi.clientHeight : t.innerHeight || vi.clientHeight || 0;
          return To;
        }
        var e = t.ownerDocument || mi;
        var n = Fi(t.pageX) ? t.nodeType || Fi(t.left) || Fi(t.top) ? xi(t)[0].getBoundingClientRect() : t : {
          left: t.pageX - go(e),
          top: t.pageY - mo(e),
          right: t.pageX - go(e) + 1,
          bottom: t.pageY - mo(e) + 1
        };
        if (Fi(n.right) && !Fi(n.width)) {
          n.right = n.left + n.width;
          n.bottom = n.top + n.height;
        } else if (Fi(n.width)) {
          n = {
            width: n.right - n.left,
            height: n.bottom - n.top,
            right: n.right,
            left: n.left,
            bottom: n.bottom,
            top: n.top
          };
        }
        return n;
      }
      function Po(t, e, n) {
        var r;
        var i = t.vars;
        var o = i[n];
        var s = t._listeners[e];
        if (zi(o)) {
          r = o.apply(i.callbackScope || t, i[n + "Params"] || [t.pointerEvent]);
        }
        if (s && t.dispatchEvent(e) === false) {
          r = false;
        }
        return r;
      }
      function Eo(t, e) {
        var n;
        var r;
        var i;
        var o = xi(t)[0];
        if (o.nodeType || o === di) {
          return Co(o, e);
        } else if (Fi(t.left)) {
          return {
            left: r = t.min || t.minX || t.minRotation || 0,
            top: n = t.min || t.minY || 0,
            width: (t.max || t.maxX || t.maxRotation || 0) - r,
            height: (t.max || t.maxY || 0) - n
          };
        } else {
          i = {
            x: 0,
            y: 0
          };
          return {
            left: t.left - i.x,
            top: t.top - i.y,
            width: t.width,
            height: t.height
          };
        }
      }
      var Oo = {};
      function Co(t, e) {
        e = xi(e)[0];
        var n;
        var r;
        var i;
        var o;
        var s;
        var a;
        var l;
        var u;
        var c;
        var h;
        var f;
        var p;
        var d;
        var m = t.getBBox && t.ownerSVGElement;
        var g = t.ownerDocument || mi;
        if (t === di) {
          i = mo(g);
          r = (n = go(g)) + (g.documentElement.clientWidth || t.innerWidth || g.body.clientWidth || 0);
          o = i + ((t.innerHeight || 0) - 20 < g.documentElement.clientHeight ? g.documentElement.clientHeight : t.innerHeight || g.body.clientHeight || 0);
        } else {
          if (e === di || Fi(e)) {
            return t.getBoundingClientRect();
          }
          n = i = 0;
          if (m) {
            f = (h = t.getBBox()).width;
            p = h.height;
          } else {
            if (t.viewBox && (h = t.viewBox.baseVal)) {
              n = h.x || 0;
              i = h.y || 0;
              f = h.width;
              p = h.height;
            }
            if (!f) {
              h = (d = So(t)).boxSizing === "border-box";
              f = (parseFloat(d.width) || t.clientWidth || 0) + (h ? 0 : parseFloat(d.borderLeftWidth) + parseFloat(d.borderRightWidth));
              p = (parseFloat(d.height) || t.clientHeight || 0) + (h ? 0 : parseFloat(d.borderTopWidth) + parseFloat(d.borderBottomWidth));
            }
          }
          r = f;
          o = p;
        }
        if (t === e) {
          return {
            left: n,
            top: i,
            width: r - n,
            height: o - i
          };
        } else {
          a = (s = hi(e, true).multiply(hi(t))).apply({
            x: n,
            y: i
          });
          l = s.apply({
            x: r,
            y: i
          });
          u = s.apply({
            x: r,
            y: o
          });
          c = s.apply({
            x: n,
            y: o
          });
          return {
            left: n = Math.min(a.x, l.x, u.x, c.x),
            top: i = Math.min(a.y, l.y, u.y, c.y),
            width: Math.max(a.x, l.x, u.x, c.x) - n,
            height: Math.max(a.y, l.y, u.y, c.y) - i
          };
        }
      }
      function Ao(t, e, n, r, i, o) {
        var s;
        var a;
        var l;
        var u = {};
        if (e) {
          if (i !== 1 && e instanceof Array) {
            u.end = s = [];
            l = e.length;
            if (Ui(e[0])) {
              for (a = 0; a < l; a++) {
                s[a] = io(e[a], i);
              }
            } else {
              for (a = 0; a < l; a++) {
                s[a] = e[a] * i;
              }
            }
            n += 1.1;
            r -= 1.1;
          } else if (zi(e)) {
            u.end = function (n) {
              var r;
              var o;
              var s = e.call(t, n);
              if (i !== 1) {
                if (Ui(s)) {
                  r = {};
                  for (o in s) {
                    r[o] = s[o] * i;
                  }
                  s = r;
                } else {
                  s *= i;
                }
              }
              return s;
            };
          } else {
            u.end = e;
          }
        }
        if (n || n === 0) {
          u.max = n;
        }
        if (r || r === 0) {
          u.min = r;
        }
        if (o) {
          u.velocity = 0;
        }
        return u;
      }
      var Ro = function t(e) {
        var n;
        return !!e && !!e.getAttribute && e !== vi && ((n = e.getAttribute("data-clickable")) === "true" || n !== "false" && (!!to.test(e.nodeName + "") || e.getAttribute("contentEditable") === "true") || t(e.parentNode));
      };
      function Lo(t, e) {
        var n;
        for (var r = t.length; r--;) {
          (n = t[r]).ondragstart = n.onselectstart = e ? null : Bi;
          pi.set(n, {
            lazy: true,
            userSelect: e ? "text" : "none"
          });
        }
      }
      var Do = function t(e) {
        return So(e).position === "fixed" || ((e = e.parentNode) && e.nodeType === 1 ? t(e) : undefined);
      };
      function Io(t, e) {
        t = pi.utils.toArray(t)[0];
        e = e || {};
        var n;
        var r;
        var i;
        var o;
        var s;
        var a;
        var l = document.createElement("div");
        var u = l.style;
        var c = t.firstChild;
        var h = 0;
        var f = 0;
        var p = t.scrollTop;
        var d = t.scrollLeft;
        var m = t.scrollWidth;
        var g = t.scrollHeight;
        var v = 0;
        var y = 0;
        var b = 0;
        if (Di && e.force3D !== false) {
          s = "translate3d(";
          a = "px,0px)";
        } else if (Hi) {
          s = "translate(";
          a = "px)";
        }
        this.scrollTop = function (t, e) {
          if (!arguments.length) {
            return -this.top();
          }
          this.top(-t, e);
        };
        this.scrollLeft = function (t, e) {
          if (!arguments.length) {
            return -this.left();
          }
          this.left(-t, e);
        };
        this.left = function (n, r) {
          if (!arguments.length) {
            return -(t.scrollLeft + f);
          }
          var i = t.scrollLeft - d;
          var o = f;
          if ((i > 2 || i < -2) && !r) {
            d = t.scrollLeft;
            pi.killTweensOf(this, {
              left: 1,
              scrollLeft: 1
            });
            this.left(-d);
            if (e.onKill) {
              e.onKill();
            }
            return;
          }
          if ((n = -n) < 0) {
            f = n - 0.5 | 0;
            n = 0;
          } else if (n > y) {
            f = n - y | 0;
            n = y;
          } else {
            f = 0;
          }
          if (f || o) {
            if (!this._skip) {
              u[Hi] = s + -f + "px," + -h + a;
            }
            if (f + v >= 0) {
              u.paddingRight = f + v + "px";
            }
          }
          t.scrollLeft = n | 0;
          d = t.scrollLeft;
        };
        this.top = function (n, r) {
          if (!arguments.length) {
            return -(t.scrollTop + h);
          }
          var i = t.scrollTop - p;
          var o = h;
          if ((i > 2 || i < -2) && !r) {
            p = t.scrollTop;
            pi.killTweensOf(this, {
              top: 1,
              scrollTop: 1
            });
            this.top(-p);
            if (e.onKill) {
              e.onKill();
            }
            return;
          }
          if ((n = -n) < 0) {
            h = n - 0.5 | 0;
            n = 0;
          } else if (n > b) {
            h = n - b | 0;
            n = b;
          } else {
            h = 0;
          }
          if (h || o) {
            if (!this._skip) {
              u[Hi] = s + -f + "px," + -h + a;
            }
          }
          t.scrollTop = n | 0;
          p = t.scrollTop;
        };
        this.maxScrollTop = function () {
          return b;
        };
        this.maxScrollLeft = function () {
          return y;
        };
        this.disable = function () {
          for (c = l.firstChild; c;) {
            o = c.nextSibling;
            t.appendChild(c);
            c = o;
          }
          if (t === l.parentNode) {
            t.removeChild(l);
          }
        };
        this.enable = function () {
          if ((c = t.firstChild) !== l) {
            while (c) {
              o = c.nextSibling;
              l.appendChild(c);
              c = o;
            }
            t.appendChild(l);
            this.calibrate();
          }
        };
        this.calibrate = function (e) {
          var o;
          var s;
          var a;
          var c = t.clientWidth === n;
          p = t.scrollTop;
          d = t.scrollLeft;
          if (!c || t.clientHeight !== r || l.offsetHeight !== i || m !== t.scrollWidth || g !== t.scrollHeight || !!e) {
            if (h || f) {
              s = this.left();
              a = this.top();
              this.left(-t.scrollLeft);
              this.top(-t.scrollTop);
            }
            o = So(t);
            if (!c || !!e) {
              u.display = "block";
              u.width = "auto";
              u.paddingRight = "0px";
              if (v = Math.max(0, t.scrollWidth - t.clientWidth)) {
                v += parseFloat(o.paddingLeft) + (Ii ? parseFloat(o.paddingRight) : 0);
              }
            }
            u.display = "inline-block";
            u.position = "relative";
            u.overflow = "visible";
            u.verticalAlign = "top";
            u.boxSizing = "content-box";
            u.width = "100%";
            u.paddingRight = v + "px";
            if (Ii) {
              u.paddingBottom = o.paddingBottom;
            }
            n = t.clientWidth;
            r = t.clientHeight;
            m = t.scrollWidth;
            g = t.scrollHeight;
            y = t.scrollWidth - n;
            b = t.scrollHeight - r;
            i = l.offsetHeight;
            u.display = "block";
            if (s || a) {
              this.left(s);
              this.top(a);
            }
          }
        };
        this.content = l;
        this.element = t;
        this._skip = false;
        this.enable();
      }
      function ko(t) {
        if (ji() && document.body) {
          var e = window && window.navigator;
          di = window;
          mi = document;
          gi = mi.documentElement;
          vi = mi.body;
          yi = qi("div");
          Ai = !!window.PointerEvent;
          (bi = qi("div")).style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
          Ci = bi.style.cursor === "grab" ? "grab" : "move";
          Ei = e && e.userAgent.toLowerCase().indexOf("android") !== -1;
          Ti = "ontouchstart" in gi && "orientation" in di || e && (e.MaxTouchPoints > 0 || e.msMaxTouchPoints > 0);
          r = qi("div");
          i = qi("div");
          o = i.style;
          s = vi;
          o.display = "inline-block";
          o.position = "relative";
          r.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden";
          r.appendChild(i);
          s.appendChild(r);
          n = i.offsetHeight + 18 > r.scrollHeight;
          s.removeChild(r);
          Ii = n;
          Mi = function (t) {
            var e = t.split(",");
            var n = ("onpointerdown" in yi ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in yi ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : t).split(",");
            var r = {};
            for (var i = 4; --i > -1;) {
              r[e[i]] = n[i];
              r[n[i]] = e[i];
            }
            try {
              gi.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get: function () {
                  Si = 1;
                }
              }));
            } catch (t) {}
            return r;
          }("touchstart,touchmove,touchend,touchcancel");
          uo(mi, "touchcancel", Bi);
          uo(di, "touchmove", Bi);
          if (vi) {
            vi.addEventListener("touchstart", Bi);
          }
          uo(mi, "contextmenu", function () {
            for (var t in Ji) {
              if (Ji[t].isPressed) {
                Ji[t].endDrag();
              }
            }
          });
          pi = _i = Ni();
        }
        var n;
        var r;
        var i;
        var o;
        var s;
        if (pi) {
          Oi = pi.plugins.inertia;
          Ri = pi.core.context || function () {};
          wi = pi.utils.checkPrefix;
          Hi = wi(Hi);
          Wi = wi(Wi);
          xi = pi.utils.toArray;
          Li = pi.core.getStyleSaver;
          Di = !!wi("perspective");
        } else if (t) {
          console.warn("Please gsap.registerPlugin(Draggable)");
        }
      }
      var jo = function (t) {
        var e;
        var n;
        function r(e, n) {
          var i;
          i = t.call(this) || this;
          if (!_i) {
            ko(1);
          }
          e = xi(e)[0];
          i.styles = Li && Li(e, "transform,left,top");
          Oi ||= pi.plugins.inertia;
          i.vars = n = io(n || {});
          i.target = e;
          i.x = i.y = i.rotation = 0;
          i.dragResistance = parseFloat(n.dragResistance) || 0;
          i.edgeResistance = isNaN(n.edgeResistance) ? 1 : parseFloat(n.edgeResistance) || 0;
          i.lockAxis = n.lockAxis;
          i.autoScroll = n.autoScroll || 0;
          i.lockedAxis = null;
          i.allowEventDefault = !!n.allowEventDefault;
          pi.getProperty(e, "x");
          var o;
          var s;
          var a;
          var l;
          var u;
          var c;
          var h;
          var f;
          var p;
          var d;
          var m;
          var g;
          var v;
          var y;
          var b;
          var _;
          var w;
          var x;
          var S;
          var T;
          var M;
          var P;
          var E;
          var O;
          var C;
          var A;
          var R;
          var L;
          var D;
          var I;
          var k;
          var j;
          var N;
          var z = (n.type || "x,y").toLowerCase();
          var U = ~z.indexOf("x") || ~z.indexOf("y");
          var F = z.indexOf("rotation") !== -1;
          var B = F ? "rotation" : U ? "x" : "left";
          var H = U ? "y" : "top";
          var W = !!~z.indexOf("x") || !!~z.indexOf("left") || z === "scroll";
          var V = !!~z.indexOf("y") || !!~z.indexOf("top") || z === "scroll";
          var G = n.minimumMovement || 2;
          var q = fi(i);
          var X = xi(n.trigger || n.handle || e);
          var Y = {};
          var K = 0;
          var Q = false;
          var Z = n.autoScrollMarginTop || 40;
          var J = n.autoScrollMarginRight || 40;
          var $ = n.autoScrollMarginBottom || 40;
          var tt = n.autoScrollMarginLeft || 40;
          var et = n.clickableTest || Ro;
          var nt = 0;
          var rt = e._gsap || pi.core.getCache(e);
          var it = Do(e);
          function ot(t, n) {
            return parseFloat(rt.get(e, t, n));
          }
          var st = e.ownerDocument || mi;
          function at(t) {
            ho(t);
            if (t.stopImmediatePropagation) {
              t.stopImmediatePropagation();
            }
            return false;
          }
          var lt = function t(n) {
            if (q.autoScroll && q.isDragging && (Q || w)) {
              var r;
              var i;
              var o;
              var a;
              var l;
              var u;
              var c;
              var h;
              var p = e;
              var d = q.autoScroll * 15;
              Q = false;
              ro.scrollTop = di.pageYOffset ?? st.documentElement.scrollTop ?? st.body.scrollTop;
              ro.scrollLeft = di.pageXOffset ?? st.documentElement.scrollLeft ?? st.body.scrollLeft;
              a = q.pointerX - ro.scrollLeft;
              l = q.pointerY - ro.scrollTop;
              while (p && !i) {
                r = (i = bo(p.parentNode)) ? ro : p.parentNode;
                o = i ? {
                  bottom: Math.max(gi.clientHeight, di.innerHeight || 0),
                  right: Math.max(gi.clientWidth, di.innerWidth || 0),
                  left: 0,
                  top: 0
                } : r.getBoundingClientRect();
                u = c = 0;
                if (V) {
                  if ((h = r._gsMaxScrollY - r.scrollTop) < 0) {
                    c = h;
                  } else if (l > o.bottom - $ && h) {
                    Q = true;
                    c = Math.min(h, d * (1 - Math.max(0, o.bottom - l) / $) | 0);
                  } else if (l < o.top + Z && r.scrollTop) {
                    Q = true;
                    c = -Math.min(r.scrollTop, d * (1 - Math.max(0, l - o.top) / Z) | 0);
                  }
                  if (c) {
                    r.scrollTop += c;
                  }
                }
                if (W) {
                  if ((h = r._gsMaxScrollX - r.scrollLeft) < 0) {
                    u = h;
                  } else if (a > o.right - J && h) {
                    Q = true;
                    u = Math.min(h, d * (1 - Math.max(0, o.right - a) / J) | 0);
                  } else if (a < o.left + tt && r.scrollLeft) {
                    Q = true;
                    u = -Math.min(r.scrollLeft, d * (1 - Math.max(0, a - o.left) / tt) | 0);
                  }
                  if (u) {
                    r.scrollLeft += u;
                  }
                }
                if (i && (u || c)) {
                  di.scrollTo(r.scrollLeft, r.scrollTop);
                  wt(q.pointerX + u, q.pointerY + c);
                }
                p = r;
              }
            }
            if (w) {
              var m = q.x;
              var g = q.y;
              if (F) {
                q.deltaX = m - parseFloat(rt.rotation);
                q.rotation = m;
                rt.rotation = m + "deg";
                rt.renderTransform(1, rt);
              } else if (s) {
                if (V) {
                  q.deltaY = g - s.top();
                  s.top(g);
                }
                if (W) {
                  q.deltaX = m - s.left();
                  s.left(m);
                }
              } else if (U) {
                if (V) {
                  q.deltaY = g - parseFloat(rt.y);
                  rt.y = g + "px";
                }
                if (W) {
                  q.deltaX = m - parseFloat(rt.x);
                  rt.x = m + "px";
                }
                rt.renderTransform(1, rt);
              } else {
                if (V) {
                  q.deltaY = g - parseFloat(e.style.top || 0);
                  e.style.top = g + "px";
                }
                if (W) {
                  q.deltaX = m - parseFloat(e.style.left || 0);
                  e.style.left = m + "px";
                }
              }
              if (!!f && !n && !L) {
                L = true;
                if (Po(q, "drag", "onDrag") === false) {
                  if (W) {
                    q.x -= q.deltaX;
                  }
                  if (V) {
                    q.y -= q.deltaY;
                  }
                  t(true);
                }
                L = false;
              }
            }
            w = false;
          };
          function ut(t, n) {
            var r;
            var i;
            var o = q.x;
            var a = q.y;
            if (!e._gsap) {
              rt = pi.core.getCache(e);
            }
            if (rt.uncache) {
              pi.getProperty(e, "x");
            }
            if (U) {
              q.x = parseFloat(rt.x);
              q.y = parseFloat(rt.y);
            } else if (F) {
              q.x = q.rotation = Vi(parseFloat(rt.rotation));
            } else if (s) {
              q.y = s.top();
              q.x = s.left();
            } else {
              q.y = parseFloat(e.style.top || (i = So(e)) && i.top) || 0;
              q.x = parseFloat(e.style.left || (i || {}).left) || 0;
            }
            if ((S || T || M) && !n && (q.isDragging || q.isThrowing)) {
              if (M) {
                no.x = q.x;
                no.y = q.y;
                if ((r = M(no)).x !== q.x) {
                  q.x = r.x;
                  w = true;
                }
                if (r.y !== q.y) {
                  q.y = r.y;
                  w = true;
                }
              }
              if (S && (r = S(q.x)) !== q.x) {
                q.x = r;
                if (F) {
                  q.rotation = r;
                }
                w = true;
              }
              if (T) {
                if ((r = T(q.y)) !== q.y) {
                  q.y = r;
                }
                w = true;
              }
            }
            if (w) {
              lt(true);
            }
            if (!t) {
              q.deltaX = q.x - o;
              q.deltaY = q.y - a;
              Po(q, "throwupdate", "onThrowUpdate");
            }
          }
          function ct(t, e, n, r) {
            if (e == null) {
              e = -Yi;
            }
            if (n == null) {
              n = Yi;
            }
            if (zi(t)) {
              return function (i) {
                var o = q.isPressed ? 1 - q.edgeResistance : 1;
                return t.call(q, (i > n ? n + (i - n) * o : i < e ? e + (i - e) * o : i) * r) * r;
              };
            } else if (Gi(t)) {
              return function (r) {
                var i;
                var o;
                for (var s = t.length, a = 0, l = Yi; --s > -1;) {
                  if ((o = (i = t[s]) - r) < 0) {
                    o = -o;
                  }
                  if (o < l && i >= e && i <= n) {
                    a = s;
                    l = o;
                  }
                }
                return t[a];
              };
            } else if (isNaN(t)) {
              return function (t) {
                return t;
              };
            } else {
              return function () {
                return t * r;
              };
            }
          }
          function ht() {
            var t;
            var r;
            var i;
            var o;
            h = false;
            if (s) {
              s.calibrate();
              q.minX = m = -s.maxScrollLeft();
              q.minY = v = -s.maxScrollTop();
              q.maxX = d = q.maxY = g = 0;
              h = true;
            } else if (n.bounds) {
              t = Eo(n.bounds, e.parentNode);
              if (F) {
                q.minX = m = t.left;
                q.maxX = d = t.left + t.width;
                q.minY = v = q.maxY = g = 0;
              } else if (Fi(n.bounds.maxX) && Fi(n.bounds.maxY)) {
                r = Eo(e, e.parentNode);
                q.minX = m = Math.round(ot(B, "px") + t.left - r.left);
                q.minY = v = Math.round(ot(H, "px") + t.top - r.top);
                q.maxX = d = Math.round(m + (t.width - r.width));
                q.maxY = g = Math.round(v + (t.height - r.height));
              } else {
                t = n.bounds;
                q.minX = m = t.minX;
                q.minY = v = t.minY;
                q.maxX = d = t.maxX;
                q.maxY = g = t.maxY;
              }
              if (m > d) {
                q.minX = d;
                q.maxX = d = m;
                m = q.minX;
              }
              if (v > g) {
                q.minY = g;
                q.maxY = g = v;
                v = q.minY;
              }
              if (F) {
                q.minRotation = m;
                q.maxRotation = d;
              }
              h = true;
            }
            if (n.liveSnap) {
              i = n.liveSnap === true ? n.snap || {} : n.liveSnap;
              o = Gi(i) || zi(i);
              if (F) {
                S = ct(o ? i : i.rotation, m, d, 1);
                T = null;
              } else if (i.points) {
                M = function (t, e, n, r, i, o, s) {
                  o = o && o < Yi ? o * o : Yi;
                  if (zi(t)) {
                    return function (a) {
                      var l;
                      var u;
                      var c;
                      var h = q.isPressed ? 1 - q.edgeResistance : 1;
                      var f = a.x;
                      var p = a.y;
                      a.x = f = f > n ? n + (f - n) * h : f < e ? e + (f - e) * h : f;
                      a.y = p = p > i ? i + (p - i) * h : p < r ? r + (p - r) * h : p;
                      if ((l = t.call(q, a)) !== a) {
                        a.x = l.x;
                        a.y = l.y;
                      }
                      if (s !== 1) {
                        a.x *= s;
                        a.y *= s;
                      }
                      if (o < Yi && (u = a.x - f) * u + (c = a.y - p) * c > o) {
                        a.x = f;
                        a.y = p;
                      }
                      return a;
                    };
                  } else if (Gi(t)) {
                    return function (e) {
                      var n;
                      var r;
                      var i;
                      var s;
                      for (var a = t.length, l = 0, u = Yi; --a > -1;) {
                        if ((s = (n = (i = t[a]).x - e.x) * n + (r = i.y - e.y) * r) < u) {
                          l = a;
                          u = s;
                        }
                      }
                      if (u <= o) {
                        return t[l];
                      } else {
                        return e;
                      }
                    };
                  } else {
                    return function (t) {
                      return t;
                    };
                  }
                }(o ? i : i.points, m, d, v, g, i.radius, s ? -1 : 1);
              } else {
                if (W) {
                  S = ct(o ? i : i.x || i.left || i.scrollLeft, m, d, s ? -1 : 1);
                }
                if (V) {
                  T = ct(o ? i : i.y || i.top || i.scrollTop, v, g, s ? -1 : 1);
                }
              }
            }
          }
          function ft() {
            q.isThrowing = false;
            Po(q, "throwcomplete", "onThrowComplete");
          }
          function pt() {
            q.isThrowing = false;
          }
          function dt(t, r) {
            var i;
            var o;
            var a;
            var l;
            if (t && Oi) {
              if (t === true) {
                i = n.snap || n.liveSnap || {};
                o = Gi(i) || zi(i);
                t = {
                  resistance: (n.throwResistance || n.resistance || 1000) / (F ? 10 : 1)
                };
                if (F) {
                  t.rotation = Ao(q, o ? i : i.rotation, d, m, 1, r);
                } else {
                  if (W) {
                    t[B] = Ao(q, o ? i : i.points || i.x || i.left, d, m, s ? -1 : 1, r || q.lockedAxis === "x");
                  }
                  if (V) {
                    t[H] = Ao(q, o ? i : i.points || i.y || i.top, g, v, s ? -1 : 1, r || q.lockedAxis === "y");
                  }
                  if (i.points || Gi(i) && Ui(i[0])) {
                    t.linkedProps = B + "," + H;
                    t.radius = i.radius;
                  }
                }
              }
              q.isThrowing = true;
              l = isNaN(n.overshootTolerance) ? n.edgeResistance === 1 ? 0 : 1 - q.edgeResistance + 0.2 : n.overshootTolerance;
              t.duration ||= {
                max: Math.max(n.minDuration || 0, "maxDuration" in n ? n.maxDuration : 2),
                min: isNaN(n.minDuration) ? l === 0 || Ui(t) && t.resistance > 1000 ? 0 : 0.5 : n.minDuration,
                overshoot: l
              };
              q.tween = a = pi.to(s || e, {
                inertia: t,
                data: "_draggable",
                inherit: false,
                onComplete: ft,
                onInterrupt: pt,
                onUpdate: n.fastMode ? Po : ut,
                onUpdateParams: n.fastMode ? [q, "onthrowupdate", "onThrowUpdate"] : i && i.radius ? [false, true] : []
              });
              if (!n.fastMode) {
                if (s) {
                  s._skip = true;
                }
                a.render(1000000000, true, true);
                ut(true, true);
                q.endX = q.x;
                q.endY = q.y;
                if (F) {
                  q.endRotation = q.x;
                }
                a.play(0);
                ut(true, true);
                if (s) {
                  s._skip = false;
                }
              }
            } else if (h) {
              q.applyBounds();
            }
          }
          function mt(t) {
            var n;
            var r = O;
            O = hi(e.parentNode, true);
            if (t && q.isPressed && !O.equals(r || new ci())) {
              n = r.inverse().apply({
                x: a,
                y: l
              });
              O.apply(n, n);
              a = n.x;
              l = n.y;
            }
            if (O.equals(Ki)) {
              O = null;
            }
          }
          function gt() {
            var t;
            var n;
            var r;
            var i = 1 - q.edgeResistance;
            var o = it ? go(st) : 0;
            var f = it ? mo(st) : 0;
            if (U) {
              rt.x = ot(B, "px") + "px";
              rt.y = ot(H, "px") + "px";
              rt.renderTransform();
            }
            mt(false);
            Oo.x = q.pointerX - o;
            Oo.y = q.pointerY - f;
            if (O) {
              O.apply(Oo, Oo);
            }
            a = Oo.x;
            l = Oo.y;
            if (w) {
              wt(q.pointerX, q.pointerY);
              lt(true);
            }
            j = hi(e);
            if (s) {
              ht();
              c = s.top();
              u = s.left();
            } else {
              if (vt()) {
                ut(true, true);
                ht();
              } else {
                q.applyBounds();
              }
              if (F) {
                t = e.ownerSVGElement ? [rt.xOrigin - e.getBBox().x, rt.yOrigin - e.getBBox().y] : (So(e)[Wi] || "0 0").split(" ");
                _ = q.rotationOrigin = hi(e).apply({
                  x: parseFloat(t[0]) || 0,
                  y: parseFloat(t[1]) || 0
                });
                ut(true, true);
                n = q.pointerX - _.x - o;
                r = _.y - q.pointerY + f;
                u = q.x;
                c = q.y = Math.atan2(r, n) * Xi;
              } else {
                c = ot(H, "px");
                u = ot(B, "px");
              }
            }
            if (h && i) {
              if (u > d) {
                u = d + (u - d) / i;
              } else if (u < m) {
                u = m - (m - u) / i;
              }
              if (!F) {
                if (c > g) {
                  c = g + (c - g) / i;
                } else if (c < v) {
                  c = v - (v - c) / i;
                }
              }
            }
            q.startX = u = Vi(u);
            q.startY = c = Vi(c);
          }
          function vt() {
            return q.tween && q.tween.isActive();
          }
          function yt() {
            if (!!bi.parentNode && !vt() && !q.isDragging) {
              bi.parentNode.removeChild(bi);
            }
          }
          function bt(t, i) {
            var u;
            if (!o || q.isPressed || !t || (t.type === "mousedown" || t.type === "pointerdown") && !i && Qi() - nt < 30 && Mi[q.pointerEvent.type]) {
              if (k && t && o) {
                ho(t);
              }
            } else {
              C = vt();
              N = false;
              q.pointerEvent = t;
              if (Mi[t.type]) {
                E = ~t.type.indexOf("touch") ? t.currentTarget || t.target : st;
                uo(E, "touchend", xt);
                uo(E, "touchmove", _t);
                uo(E, "touchcancel", xt);
                uo(st, "touchstart", po);
              } else {
                E = null;
                uo(st, "mousemove", _t);
              }
              R = null;
              if (!Ai || !E) {
                uo(st, "mouseup", xt);
                if (t && t.target) {
                  uo(t.target, "mouseup", xt);
                }
              }
              if (P = et.call(q, t.target) && n.dragClickables === false && !i) {
                uo(t.target, "change", xt);
                Po(q, "pressInit", "onPressInit");
                Po(q, "press", "onPress");
                Lo(X, true);
                k = false;
                return;
              }
              var c;
              A = !!E && W !== V && q.vars.allowNativeTouchScrolling !== false && (!q.vars.allowContextMenu || !t || !t.ctrlKey && !(t.which > 2)) && (W ? "y" : "x");
              if (k = !A && !q.allowEventDefault) {
                ho(t);
                uo(di, "touchforcechange", ho);
              }
              if (t.changedTouches) {
                t = y = t.changedTouches[0];
                b = t.identifier;
              } else if (t.pointerId) {
                b = t.pointerId;
              } else {
                y = b = null;
              }
              ki++;
              c = lt;
              Zi.push(c);
              if (Zi.length === 1) {
                pi.ticker.add(so);
              }
              l = q.pointerY = t.pageY;
              a = q.pointerX = t.pageX;
              Po(q, "pressInit", "onPressInit");
              if (A || q.autoScroll) {
                wo(e.parentNode);
              }
              if (!!e.parentNode && !!q.autoScroll && !s && !F && !!e.parentNode._gsMaxScrollX && !bi.parentNode && !e.getBBox) {
                bi.style.width = e.parentNode.scrollWidth + "px";
                e.parentNode.appendChild(bi);
              }
              gt();
              if (q.tween) {
                q.tween.kill();
              }
              q.isThrowing = false;
              pi.killTweensOf(s || e, Y, true);
              if (s) {
                pi.killTweensOf(e, {
                  scrollTo: 1
                }, true);
              }
              q.tween = q.lockedAxis = null;
              if (n.zIndexBoost || !F && !s && n.zIndexBoost !== false) {
                e.style.zIndex = r.zIndex++;
              }
              q.isPressed = true;
              f = !!n.onDrag || !!q._listeners.drag;
              p = !!n.onMove || !!q._listeners.move;
              if (n.cursor !== false || n.activeCursor) {
                for (u = X.length; --u > -1;) {
                  pi.set(X[u], {
                    cursor: n.activeCursor || n.cursor || (Ci === "grab" ? "grabbing" : Ci)
                  });
                }
              }
              Po(q, "press", "onPress");
              if (Oi) {
                Oi.track(s || e, U ? "x,y" : F ? "rotation" : "top,left");
              }
            }
          }
          function _t(t) {
            var n;
            var r;
            var i;
            var s;
            var u;
            var c;
            var h = t;
            if (o && !Pi && q.isPressed && t) {
              q.pointerEvent = t;
              if (n = t.changedTouches) {
                if ((t = n[0]) !== y && t.identifier !== b) {
                  for (s = n.length; --s > -1 && (t = n[s]).identifier !== b && t.target !== e;);
                  if (s < 0) {
                    return;
                  }
                }
              } else if (t.pointerId && b && t.pointerId !== b) {
                return;
              }
              if (E && A && !R && (Oo.x = t.pageX - (it ? go(st) : 0), Oo.y = t.pageY - (it ? mo(st) : 0), O && O.apply(Oo, Oo), r = Oo.x, i = Oo.y, ((u = Math.abs(r - a)) !== (c = Math.abs(i - l)) && (u > G || c > G) || Ei && A === R) && (R = u > c && W ? "x" : "y", A && R !== A && uo(di, "touchforcechange", ho), q.vars.lockAxisOnTouchScroll !== false && W && V && (q.lockedAxis = R === "x" ? "y" : "x", zi(q.vars.onLockAxis) && q.vars.onLockAxis.call(q, h)), Ei && A === R))) {
                xt(h);
              } else {
                if (q.allowEventDefault || A && (!R || A === R) || h.cancelable === false) {
                  k &&= false;
                } else {
                  ho(h);
                  k = true;
                }
                if (q.autoScroll) {
                  Q = true;
                }
                wt(t.pageX, t.pageY, p);
              }
            } else if (k && t && o) {
              ho(t);
            }
          }
          function wt(t, e, n) {
            var r;
            var i;
            var o;
            var s;
            var f;
            var p;
            var y = 1 - q.dragResistance;
            var b = 1 - q.edgeResistance;
            var x = q.pointerX;
            var P = q.pointerY;
            var E = c;
            var C = q.x;
            var A = q.y;
            var R = q.endX;
            var L = q.endY;
            var D = q.endRotation;
            var I = w;
            q.pointerX = t;
            q.pointerY = e;
            if (it) {
              t -= go(st);
              e -= mo(st);
            }
            if (F) {
              s = Vi(Math.atan2(_.y - e, t - _.x) * Xi);
              if ((f = q.y - s) > 180) {
                c -= 360;
                q.y = s;
              } else if (f < -180) {
                c += 360;
                q.y = s;
              }
              if (O) {
                p = t * O.a + e * O.c + O.e;
                e = t * O.b + e * O.d + O.f;
                t = p;
              }
              if (q.x !== u || Math.max(Math.abs(a - t), Math.abs(l - e)) > G) {
                q.y = s;
                o = Vi(u + (c - s) * y);
              } else {
                o = u;
              }
            } else {
              if (O) {
                p = t * O.a + e * O.c + O.e;
                e = t * O.b + e * O.d + O.f;
                t = p;
              }
              if ((i = e - l) < G && i > -G) {
                i = 0;
              }
              if ((r = t - a) < G && r > -G) {
                r = 0;
              }
              if ((q.lockAxis || q.lockedAxis) && (r || i)) {
                if (!(p = q.lockedAxis)) {
                  q.lockedAxis = p = W && Math.abs(r) > Math.abs(i) ? "y" : V ? "x" : null;
                  if (p && zi(q.vars.onLockAxis)) {
                    q.vars.onLockAxis.call(q, q.pointerEvent);
                  }
                }
                if (p === "y") {
                  i = 0;
                } else if (p === "x") {
                  r = 0;
                }
              }
              o = Vi(u + r * y);
              s = Vi(c + i * y);
            }
            if ((S || T || M) && (q.x !== o || q.y !== s && !F)) {
              if (M) {
                no.x = o;
                no.y = s;
                p = M(no);
                o = Vi(p.x);
                s = Vi(p.y);
              }
              if (S) {
                o = Vi(S(o));
              }
              if (T) {
                s = Vi(T(s));
              }
            }
            if (h) {
              if (o > d) {
                o = d + Math.round((o - d) * b);
              } else if (o < m) {
                o = m + Math.round((o - m) * b);
              }
              if (!F) {
                if (s > g) {
                  s = Math.round(g + (s - g) * b);
                } else if (s < v) {
                  s = Math.round(v + (s - v) * b);
                }
              }
            }
            if (q.x !== o || q.y !== s && !F) {
              if (F) {
                q.endRotation = q.x = q.endX = Vi(o);
                w = true;
              } else {
                if (V) {
                  q.y = q.endY = s;
                  w = true;
                }
                if (W) {
                  q.x = q.endX = o;
                  w = true;
                }
              }
              if (n && Po(q, "move", "onMove") === false) {
                q.pointerX = x;
                q.pointerY = P;
                c = E;
                q.x = C;
                q.y = A;
                q.endX = R;
                q.endY = L;
                q.endRotation = D;
                w = I;
              } else if (!q.isDragging && q.isPressed) {
                q.isDragging = N = true;
                Po(q, "dragstart", "onDragStart");
              }
            }
          }
          var xt = function t(r, i) {
            if (o && q.isPressed && (!r || b == null || i || (!r.pointerId || r.pointerId === b || r.target === e) && (!r.changedTouches || !!function (t, e) {
              for (var n = t.length; n--;) {
                if (t[n].identifier === e) {
                  return true;
                }
              }
            }(r.changedTouches, b)))) {
              q.isPressed = false;
              var s;
              var a;
              var l;
              var u;
              var c;
              var h = r;
              var f = q.isDragging;
              var p = q.vars.allowContextMenu && r && (r.ctrlKey || r.which > 2);
              var d = pi.delayedCall(0.001, yt);
              if (E) {
                co(E, "touchend", t);
                co(E, "touchmove", _t);
                co(E, "touchcancel", t);
                co(st, "touchstart", po);
              } else {
                co(st, "mousemove", _t);
              }
              co(di, "touchforcechange", ho);
              if (!Ai || !E) {
                co(st, "mouseup", t);
                if (r && r.target) {
                  co(r.target, "mouseup", t);
                }
              }
              w = false;
              if (f) {
                K = eo = Qi();
                q.isDragging = false;
              }
              lo(lt);
              if (P && !p) {
                if (r) {
                  co(r.target, "change", t);
                  q.pointerEvent = h;
                }
                Lo(X, false);
                Po(q, "release", "onRelease");
                Po(q, "click", "onClick");
                P = false;
                return;
              }
              for (a = X.length; --a > -1;) {
                xo(X[a], "cursor", n.cursor || (n.cursor !== false ? Ci : null));
              }
              ki--;
              if (r) {
                if ((s = r.changedTouches) && (r = s[0]) !== y && r.identifier !== b) {
                  for (a = s.length; --a > -1 && (r = s[a]).identifier !== b && r.target !== e;);
                  if (a < 0 && !i) {
                    return;
                  }
                }
                q.pointerEvent = h;
                q.pointerX = r.pageX;
                q.pointerY = r.pageY;
              }
              if (p && h) {
                ho(h);
                k = true;
                Po(q, "release", "onRelease");
              } else if (h && !f) {
                k = false;
                if (C && (n.snap || n.bounds)) {
                  dt(n.inertia || n.throwProps);
                }
                Po(q, "release", "onRelease");
                if ((!Ei || h.type !== "touchmove") && h.type.indexOf("cancel") === -1) {
                  Po(q, "click", "onClick");
                  if (Qi() - nt < 300) {
                    Po(q, "doubleclick", "onDoubleClick");
                  }
                  u = h.target || e;
                  nt = Qi();
                  c = function () {
                    if (nt !== D && !!q.enabled() && !q.isPressed && !h.defaultPrevented) {
                      if (u.click) {
                        u.click();
                      } else if (st.createEvent) {
                        (l = st.createEvent("MouseEvents")).initMouseEvent("click", true, true, di, 1, q.pointerEvent.screenX, q.pointerEvent.screenY, q.pointerX, q.pointerY, false, false, false, false, 0, null);
                        u.dispatchEvent(l);
                      }
                    }
                  };
                  if (!Ei && !h.defaultPrevented) {
                    pi.delayedCall(0.05, c);
                  }
                }
              } else {
                dt(n.inertia || n.throwProps);
                if (q.allowEventDefault || !h || n.dragClickables === false && et.call(q, h.target) || !f || A && (!R || A !== R) || h.cancelable === false) {
                  k = false;
                } else {
                  k = true;
                  ho(h);
                }
                Po(q, "release", "onRelease");
              }
              if (vt()) {
                d.duration(q.tween.duration());
              }
              if (f) {
                Po(q, "dragend", "onDragEnd");
              }
              return true;
            }
            if (k && r && o) {
              ho(r);
            }
          };
          function St(t) {
            if (t && q.isDragging && !s) {
              var n = t.target || e.parentNode;
              var r = n.scrollLeft - n._gsScrollX;
              var i = n.scrollTop - n._gsScrollY;
              if (r || i) {
                if (O) {
                  a -= r * O.a + i * O.c;
                  l -= i * O.d + r * O.b;
                } else {
                  a -= r;
                  l -= i;
                }
                n._gsScrollX += r;
                n._gsScrollY += i;
                wt(q.pointerX, q.pointerY);
              }
            }
          }
          function Tt(t) {
            var e = Qi();
            var n = e - nt < 100;
            var r = e - K < 50;
            var i = n && D === nt;
            var o = q.pointerEvent && q.pointerEvent.defaultPrevented;
            var s = n && I === nt;
            var a = t.isTrusted || t.isTrusted == null && n && i;
            if ((i || r && q.vars.suppressClickOnDrag !== false) && t.stopImmediatePropagation) {
              t.stopImmediatePropagation();
            }
            if (n && (!q.pointerEvent || !q.pointerEvent.defaultPrevented) && (!i || a && !s)) {
              if (a && i) {
                I = nt;
              }
              D = nt;
              return;
            }
            if (q.isPressed || r || n) {
              if (!a || !t.detail || !n || !!o) {
                ho(t);
              }
            }
            if (!n && !r && !N) {
              if (t && t.target) {
                q.pointerEvent = t;
              }
              Po(q, "click", "onClick");
            }
          }
          function Mt(t) {
            if (O) {
              return {
                x: t.x * O.a + t.y * O.c + O.e,
                y: t.x * O.b + t.y * O.d + O.f
              };
            } else {
              return {
                x: t.x,
                y: t.y
              };
            }
          }
          if (x = r.get(e)) {
            x.kill();
          }
          i.startDrag = function (t, n) {
            var r;
            var i;
            var o;
            var s;
            bt(t || q.pointerEvent, true);
            if (n && !q.hitTest(t || q.pointerEvent)) {
              r = Mo(t || q.pointerEvent);
              i = Mo(e);
              o = Mt({
                x: r.left + r.width / 2,
                y: r.top + r.height / 2
              });
              s = Mt({
                x: i.left + i.width / 2,
                y: i.top + i.height / 2
              });
              a -= o.x - s.x;
              l -= o.y - s.y;
            }
            if (!q.isDragging) {
              q.isDragging = N = true;
              Po(q, "dragstart", "onDragStart");
            }
          };
          i.drag = _t;
          i.endDrag = function (t) {
            return xt(t || q.pointerEvent, true);
          };
          i.timeSinceDrag = function () {
            if (q.isDragging) {
              return 0;
            } else {
              return (Qi() - K) / 1000;
            }
          };
          i.timeSinceClick = function () {
            return (Qi() - nt) / 1000;
          };
          i.hitTest = function (t, e) {
            return r.hitTest(q.target, t, e);
          };
          i.getDirection = function (t, n) {
            var r;
            var i;
            var o;
            var s;
            var a;
            var l;
            var h = t === "velocity" && Oi ? t : Ui(t) && !F ? "element" : "start";
            if (h === "element") {
              a = Mo(q.target);
              l = Mo(t);
            }
            r = h === "start" ? q.x - u : h === "velocity" ? Oi.getVelocity(e, B) : a.left + a.width / 2 - (l.left + l.width / 2);
            if (F) {
              if (r < 0) {
                return "counter-clockwise";
              } else {
                return "clockwise";
              }
            } else {
              n = n || 2;
              i = h === "start" ? q.y - c : h === "velocity" ? Oi.getVelocity(e, H) : a.top + a.height / 2 - (l.top + l.height / 2);
              s = (o = Math.abs(r / i)) < 1 / n ? "" : r < 0 ? "left" : "right";
              if (o < n) {
                if (s !== "") {
                  s += "-";
                }
                s += i < 0 ? "up" : "down";
              }
              return s;
            }
          };
          i.applyBounds = function (t, r) {
            var i;
            var o;
            var s;
            var a;
            var l;
            var u;
            if (t && n.bounds !== t) {
              n.bounds = t;
              return q.update(true, r);
            }
            ut(true);
            ht();
            if (h && !vt()) {
              i = q.x;
              o = q.y;
              if (i > d) {
                i = d;
              } else if (i < m) {
                i = m;
              }
              if (o > g) {
                o = g;
              } else if (o < v) {
                o = v;
              }
              if ((q.x !== i || q.y !== o) && (s = true, q.x = q.endX = i, F ? q.endRotation = i : q.y = q.endY = o, w = true, lt(true), q.autoScroll && !q.isDragging)) {
                wo(e.parentNode);
                a = e;
                ro.scrollTop = di.pageYOffset ?? st.documentElement.scrollTop ?? st.body.scrollTop;
                ro.scrollLeft = di.pageXOffset ?? st.documentElement.scrollLeft ?? st.body.scrollLeft;
                while (a && !u) {
                  l = (u = bo(a.parentNode)) ? ro : a.parentNode;
                  if (V && l.scrollTop > l._gsMaxScrollY) {
                    l.scrollTop = l._gsMaxScrollY;
                  }
                  if (W && l.scrollLeft > l._gsMaxScrollX) {
                    l.scrollLeft = l._gsMaxScrollX;
                  }
                  a = l;
                }
              }
              if (q.isThrowing && (s || q.endX > d || q.endX < m || q.endY > g || q.endY < v)) {
                dt(n.inertia || n.throwProps, s);
              }
            }
            return q;
          };
          i.update = function (t, n, r) {
            if (n && q.isPressed) {
              if (F) {
                q.x = q.y = Vi(parseFloat(rt.rotation));
              } else {
                var i = hi(e);
                var o = j.apply({
                  x: q.x - u,
                  y: q.y - c
                });
                var s = hi(e.parentNode, true);
                s.apply({
                  x: i.e - o.x,
                  y: i.f - o.y
                }, o);
                q.x = Vi(q.x - (o.x - s.e));
                q.y = Vi(q.y - (o.y - s.f));
              }
              lt(true);
              gt();
            }
            var a = q.x;
            var l = q.y;
            mt(!n);
            if (t) {
              q.applyBounds();
            } else {
              if (w && r) {
                lt(true);
              }
              ut(true);
            }
            if (n) {
              wt(q.pointerX, q.pointerY);
              if (w) {
                lt(true);
              }
            }
            if (q.isPressed && !n && (W && Math.abs(a - q.x) > 0.01 || V && Math.abs(l - q.y) > 0.01 && !F)) {
              gt();
            }
            if (q.autoScroll) {
              wo(e.parentNode, q.isDragging);
              Q = q.isDragging;
              lt(true);
              yo(e, St);
              vo(e, St);
            }
            return q;
          };
          i.enable = function (t) {
            var r;
            var i;
            var a;
            var l = {
              lazy: true
            };
            if (n.cursor !== false) {
              l.cursor = n.cursor || Ci;
            }
            if (pi.utils.checkPrefix("touchCallout")) {
              l.touchCallout = "none";
            }
            if (t !== "soft") {
              oo(X, W === V ? "none" : n.allowNativeTouchScrolling && e.scrollHeight === e.clientHeight == (e.scrollWidth === e.clientHeight) || n.allowEventDefault ? "manipulation" : W ? "pan-y" : "pan-x");
              i = X.length;
              while (--i > -1) {
                a = X[i];
                if (!Ai) {
                  uo(a, "mousedown", bt);
                }
                uo(a, "touchstart", bt);
                uo(a, "click", Tt, true);
                pi.set(a, l);
                if (a.getBBox && a.ownerSVGElement && W !== V) {
                  pi.set(a.ownerSVGElement, {
                    touchAction: n.allowNativeTouchScrolling || n.allowEventDefault ? "manipulation" : W ? "pan-y" : "pan-x"
                  });
                }
                if (!n.allowContextMenu) {
                  uo(a, "contextmenu", at);
                }
              }
              Lo(X, false);
            }
            vo(e, St);
            o = true;
            if (Oi && t !== "soft") {
              Oi.track(s || e, U ? "x,y" : F ? "rotation" : "top,left");
            }
            e._gsDragID = r = e._gsDragID || "d" + $i++;
            Ji[r] = q;
            if (s) {
              s.enable();
              s.element._gsDragID = r;
            }
            if (n.bounds || F) {
              gt();
            }
            if (n.bounds) {
              q.applyBounds();
            }
            return q;
          };
          i.disable = function (t) {
            var n;
            var r = q.isDragging;
            for (var i = X.length; --i > -1;) {
              xo(X[i], "cursor", null);
            }
            if (t !== "soft") {
              oo(X, null);
              i = X.length;
              while (--i > -1) {
                n = X[i];
                xo(n, "touchCallout", null);
                co(n, "mousedown", bt);
                co(n, "touchstart", bt);
                co(n, "click", Tt, true);
                co(n, "contextmenu", at);
              }
              Lo(X, true);
              if (E) {
                co(E, "touchcancel", xt);
                co(E, "touchend", xt);
                co(E, "touchmove", _t);
              }
              co(st, "mouseup", xt);
              co(st, "mousemove", _t);
            }
            yo(e, St);
            o = false;
            if (Oi && t !== "soft") {
              Oi.untrack(s || e, U ? "x,y" : F ? "rotation" : "top,left");
              if (q.tween) {
                q.tween.kill();
              }
            }
            if (s) {
              s.disable();
            }
            lo(lt);
            q.isDragging = q.isPressed = P = false;
            if (r) {
              Po(q, "dragend", "onDragEnd");
            }
            return q;
          };
          i.enabled = function (t, e) {
            if (arguments.length) {
              if (t) {
                return q.enable(e);
              } else {
                return q.disable(e);
              }
            } else {
              return o;
            }
          };
          i.kill = function () {
            q.isThrowing = false;
            if (q.tween) {
              q.tween.kill();
            }
            q.disable();
            pi.set(X, {
              clearProps: "userSelect"
            });
            delete Ji[e._gsDragID];
            return q;
          };
          i.revert = function () {
            this.kill();
            if (this.styles) {
              this.styles.revert();
            }
          };
          if (~z.indexOf("scroll")) {
            s = i.scrollProxy = new Io(e, function (t, e) {
              for (var n in e) {
                if (!(n in t)) {
                  t[n] = e[n];
                }
              }
              return t;
            }({
              onKill: function () {
                if (q.isPressed) {
                  xt(null);
                }
              }
            }, n));
            e.style.overflowY = V && !Ti ? "auto" : "hidden";
            e.style.overflowX = W && !Ti ? "auto" : "hidden";
            e = s.content;
          }
          if (F) {
            Y.rotation = 1;
          } else {
            if (W) {
              Y[B] = 1;
            }
            if (V) {
              Y[H] = 1;
            }
          }
          rt.force3D = !("force3D" in n) || n.force3D;
          Ri(fi(i));
          i.enable();
          return i;
        }
        n = t;
        (e = r).prototype = Object.create(n.prototype);
        e.prototype.constructor = e;
        e.__proto__ = n;
        r.register = function (t) {
          pi = t;
          ko();
        };
        r.create = function (t, e) {
          if (!_i) {
            ko(true);
          }
          return xi(t).map(function (t) {
            return new r(t, e);
          });
        };
        r.get = function (t) {
          return Ji[(xi(t)[0] || {})._gsDragID];
        };
        r.timeSinceDrag = function () {
          return (Qi() - eo) / 1000;
        };
        r.hitTest = function (t, e, n) {
          if (t === e) {
            return false;
          }
          var r;
          var i;
          var o;
          var s = Mo(t);
          var a = Mo(e);
          var l = s.top;
          var u = s.left;
          var c = s.right;
          var h = s.bottom;
          var f = s.width;
          var p = s.height;
          var d = a.left > c || a.right < u || a.top > h || a.bottom < l;
          if (d || !n) {
            return !d;
          } else {
            o = (n + "").indexOf("%") !== -1;
            n = parseFloat(n) || 0;
            (r = {
              left: Math.max(u, a.left),
              top: Math.max(l, a.top)
            }).width = Math.min(c, a.right) - r.left;
            r.height = Math.min(h, a.bottom) - r.top;
            return !(r.width < 0) && !(r.height < 0) && (o ? (n *= 0.01, (i = r.width * r.height) >= f * p * n || i >= a.width * a.height * n) : r.width > n && r.height > n);
          }
        };
        return r;
      }(function () {
        function t(t) {
          this._listeners = {};
          this.target = t || this;
        }
        var e = t.prototype;
        e.addEventListener = function (t, e) {
          var n = this._listeners[t] ||= [];
          if (!~n.indexOf(e)) {
            n.push(e);
          }
        };
        e.removeEventListener = function (t, e) {
          var n = this._listeners[t];
          var r = n && n.indexOf(e);
          if (r >= 0) {
            n.splice(r, 1);
          }
        };
        e.dispatchEvent = function (t) {
          var e;
          var n = this;
          (this._listeners[t] || []).forEach(function (r) {
            return r.call(n, {
              type: t,
              target: n.target
            }) === false && (e = false);
          });
          return e;
        };
        return t;
      }());
      (function (t, e) {
        for (var n in e) {
          if (!(n in t)) {
            t[n] = e[n];
          }
        }
      })(jo.prototype, {
        pointerX: 0,
        pointerY: 0,
        startX: 0,
        startY: 0,
        deltaX: 0,
        deltaY: 0,
        isDragging: false,
        isPressed: false
      });
      jo.zIndex = 1000;
      jo.version = "3.14.2";
      if (Ni()) {
        pi.registerPlugin(jo);
      }
      let No;
      let zo;
      let Uo;
      let Fo = typeof Symbol == "function" ? Symbol() : "_split";
      let Bo = typeof Intl != "undefined" && "Segmenter" in Intl ? new Intl.Segmenter() : 0;
      let Ho = t => typeof t == "string" ? Ho(document.querySelectorAll(t)) : "length" in t ? Array.from(t).reduce((t, e) => {
        if (typeof e == "string") {
          t.push(...Ho(e));
        } else {
          t.push(e);
        }
        return t;
      }, []) : [t];
      let Wo = t => Ho(t).filter(t => t instanceof HTMLElement);
      let Vo = [];
      let Go = function () {};
      let qo = {
        add: t => t()
      };
      let Xo = /\s+/g;
      let Yo = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu");
      let Ko = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
      let Qo = (t, e) => {
        while (++e < t.length && t[e] === Ko);
        return t[e] || Ko;
      };
      let Zo = ({
        element: t,
        html: e,
        ariaL: n,
        ariaH: r
      }) => {
        t.innerHTML = e;
        if (n) {
          t.setAttribute("aria-label", n);
        } else {
          t.removeAttribute("aria-label");
        }
        if (r) {
          t.setAttribute("aria-hidden", r);
        } else {
          t.removeAttribute("aria-hidden");
        }
      };
      let Jo = (t, e) => {
        if (e) {
          let n;
          let r;
          let i;
          let o;
          let s = new Set(t.join("").match(e) || Vo);
          let a = t.length;
          if (s.size) {
            while (--a > -1) {
              r = t[a];
              for (i of s) {
                if (i.startsWith(r) && i.length > r.length) {
                  n = 0;
                  o = r;
                  while (i.startsWith(o += t[a + ++n]) && o.length < i.length);
                  if (n && o.length === i.length) {
                    t[a] = i;
                    t.splice(a + 1, n);
                    break;
                  }
                }
              }
            }
          }
        }
        return t;
      };
      let $o = t => window.getComputedStyle(t).display === "inline" && (t.style.display = "inline-block");
      let ts = (t, e, n) => e.insertBefore(typeof t == "string" ? document.createTextNode(t) : t, n);
      let es = (t, e, n) => {
        let r = e[t + "sClass"] || "";
        let {
          tag: i = "div",
          aria: o = "auto",
          propIndex: s = false
        } = e;
        let a = t === "line" ? "block" : "inline-block";
        let l = r.indexOf("++") > -1;
        let u = e => {
          let u = document.createElement(i);
          let c = n.length + 1;
          if (r) {
            u.className = r + (l ? " " + r + c : "");
          }
          if (s) {
            u.style.setProperty("--" + t, c + "");
          }
          if (o !== "none") {
            u.setAttribute("aria-hidden", "true");
          }
          if (i !== "span") {
            u.style.position = "relative";
            u.style.display = a;
          }
          u.textContent = e;
          n.push(u);
          return u;
        };
        if (l) {
          r = r.replace("++", "");
        }
        u.collection = n;
        return u;
      };
      let ns = (t, e, n, r, i, o, s, a, l, u) => {
        var c;
        let h;
        let f;
        let p;
        let d;
        let m;
        let g;
        let v;
        let y;
        let b;
        let _;
        let w;
        let x;
        let S;
        let T;
        let M;
        let P;
        let E;
        let O;
        let C = Array.from(t.childNodes);
        let A = 0;
        let {
          wordDelimiter: R,
          reduceWhiteSpace: L = true,
          prepareText: D
        } = e;
        let I = t.getBoundingClientRect();
        let k = I;
        let j = !L && window.getComputedStyle(t).whiteSpace.substring(0, 3) === "pre";
        let N = 0;
        let z = n.collection;
        if (typeof R == "object") {
          p = R.delimiter || R;
          f = R.replaceWith || "";
        } else {
          f = R === "" ? "" : R || " ";
        }
        h = f !== " ";
        for (; A < C.length; A++) {
          d = C[A];
          if (d.nodeType === 3) {
            M = d.textContent || "";
            if (L) {
              M = M.replace(Xo, " ");
            } else if (j) {
              M = M.replace(/\n/g, f + "\n");
            }
            if (D) {
              M = D(M, t);
            }
            d.textContent = M;
            m = f || p ? M.split(p || f) : M.match(a) || Vo;
            E = m[m.length - 1];
            y = h ? E.slice(-1) === " " : !E;
            if (!E) {
              m.pop();
            }
            k = I;
            v = h ? m[0].charAt(0) === " " : !m[0];
            if (v) {
              ts(" ", t, d);
            }
            if (!m[0]) {
              m.shift();
            }
            Jo(m, l);
            if (!o || !u) {
              d.textContent = "";
            }
            b = 1;
            for (; b <= m.length; b++) {
              P = m[b - 1];
              if (!L && j && P.charAt(0) === "\n") {
                if ((c = d.previousSibling) != null) {
                  c.remove();
                }
                ts(document.createElement("br"), t, d);
                P = P.slice(1);
              }
              if (L || P !== "") {
                if (P === " ") {
                  t.insertBefore(document.createTextNode(" "), d);
                } else {
                  if (h && P.charAt(0) === " ") {
                    ts(" ", t, d);
                  }
                  if (N && b === 1 && !v && z.indexOf(N.parentNode) > -1) {
                    g = z[z.length - 1];
                    g.appendChild(document.createTextNode(r ? "" : P));
                  } else {
                    g = n(r ? "" : P);
                    ts(g, t, d);
                    if (N && b === 1 && !v) {
                      g.insertBefore(N, g.firstChild);
                    }
                  }
                  if (r) {
                    w = Bo ? Jo([...Bo.segment(P)].map(t => t.segment), l) : P.match(a) || Vo;
                    O = 0;
                    for (; O < w.length; O++) {
                      g.appendChild(w[O] === " " ? document.createTextNode(" ") : r(w[O]));
                    }
                  }
                  if (o && u) {
                    M = d.textContent = M.substring(P.length + 1, M.length);
                    _ = g.getBoundingClientRect();
                    if (_.top > k.top && _.left <= k.left) {
                      x = t.cloneNode();
                      S = t.childNodes[0];
                      while (S && S !== g) {
                        T = S;
                        S = S.nextSibling;
                        x.appendChild(T);
                      }
                      t.parentNode.insertBefore(x, t);
                      if (i) {
                        $o(x);
                      }
                    }
                    k = _;
                  }
                  if (b < m.length || y) {
                    ts(b >= m.length ? " " : h && P.slice(-1) === " " ? " " + f : f, t, d);
                  }
                }
              } else {
                ts(f, t, d);
              }
            }
            t.removeChild(d);
            N = 0;
          } else if (d.nodeType === 1) {
            if (s && s.indexOf(d) > -1) {
              if (z.indexOf(d.previousSibling) > -1) {
                z[z.length - 1].appendChild(d);
              }
              N = d;
            } else {
              ns(d, e, n, r, i, o, s, a, l, true);
              N = 0;
            }
            if (i) {
              $o(d);
            }
          }
        }
      };
      const rs = class t {
        constructor(t, e) {
          this.isSplit = false;
          if (!Uo) {
            is.register(window.gsap);
          }
          this.elements = Wo(t);
          this.chars = [];
          this.words = [];
          this.lines = [];
          this.masks = [];
          this.vars = e;
          this.elements.forEach(t => {
            var n;
            if (e.overwrite !== false) {
              if ((n = t[Fo]) != null) {
                n._data.orig.filter(({
                  element: e
                }) => e === t).forEach(Zo);
              }
            }
            t[Fo] = this;
          });
          this._split = () => this.isSplit && this.split(this.vars);
          let n;
          let r = [];
          let i = () => {
            let t;
            let e = r.length;
            while (e--) {
              t = r[e];
              let n = t.element.offsetWidth;
              if (n !== t.width) {
                t.width = n;
                this._split();
                return;
              }
            }
          };
          this._data = {
            orig: r,
            obs: typeof ResizeObserver != "undefined" && new ResizeObserver(() => {
              clearTimeout(n);
              n = setTimeout(i, 200);
            })
          };
          Go(this);
          this.split(e);
        }
        split(t) {
          (this._ctx || qo).add(() => {
            if (this.isSplit) {
              this.revert();
            }
            this.vars = t = t || this.vars || {};
            let e;
            let {
              type: n = "chars,words,lines",
              aria: r = "auto",
              deepSlice: i = true,
              smartWrap: o,
              onSplit: s,
              autoSplit: a = false,
              specialChars: l,
              mask: u
            } = this.vars;
            let c = n.indexOf("lines") > -1;
            let h = n.indexOf("chars") > -1;
            let f = n.indexOf("words") > -1;
            let p = h && !f && !c;
            let d = l && ("push" in l ? new RegExp("(?:" + l.join("|") + ")", "gu") : l);
            let m = d ? new RegExp(d.source + "|" + Yo.source, "gu") : Yo;
            let g = !!t.ignore && Wo(t.ignore);
            let {
              orig: v,
              animTime: y,
              obs: b
            } = this._data;
            if (h || f || c) {
              this.elements.forEach((e, n) => {
                v[n] = {
                  element: e,
                  html: e.innerHTML,
                  ariaL: e.getAttribute("aria-label"),
                  ariaH: e.getAttribute("aria-hidden")
                };
                if (r === "auto") {
                  e.setAttribute("aria-label", (e.textContent || "").trim());
                } else if (r === "hidden") {
                  e.setAttribute("aria-hidden", "true");
                }
                let s;
                let a;
                let l;
                let u;
                let y = [];
                let b = [];
                let _ = [];
                let w = h ? es("char", t, y) : null;
                let x = es("word", t, b);
                ns(e, t, x, w, p, i && (c || p), g, m, d, false);
                if (c) {
                  let n;
                  let r;
                  let i = Ho(e.childNodes);
                  let o = ((t, e, n, r) => {
                    let i = es("line", n, r);
                    let o = window.getComputedStyle(t).textAlign || "left";
                    return (n, r) => {
                      let s = i("");
                      s.style.textAlign = o;
                      t.insertBefore(s, e[n]);
                      for (; n < r; n++) {
                        s.appendChild(e[n]);
                      }
                      s.normalize();
                    };
                  })(e, i, t, _);
                  let a = [];
                  let l = 0;
                  let u = i.map(t => t.nodeType === 1 ? t.getBoundingClientRect() : Ko);
                  let c = Ko;
                  for (s = 0; s < i.length; s++) {
                    n = i[s];
                    if (n.nodeType === 1) {
                      if (n.nodeName === "BR") {
                        if (!s || i[s - 1].nodeName !== "BR") {
                          a.push(n);
                          o(l, s + 1);
                        }
                        l = s + 1;
                        c = Qo(u, s);
                      } else {
                        r = u[s];
                        if (s && r.top > c.top && r.left < c.left + c.width - 1) {
                          o(l, s);
                          l = s;
                        }
                        c = r;
                      }
                    }
                  }
                  if (l < s) {
                    o(l, s);
                  }
                  a.forEach(t => {
                    var e;
                    if ((e = t.parentNode) == null) {
                      return undefined;
                    } else {
                      return e.removeChild(t);
                    }
                  });
                }
                if (!f) {
                  for (s = 0; s < b.length; s++) {
                    a = b[s];
                    if (h || !a.nextSibling || a.nextSibling.nodeType !== 3) {
                      if (o && !c) {
                        l = document.createElement("span");
                        l.style.whiteSpace = "nowrap";
                        while (a.firstChild) {
                          l.appendChild(a.firstChild);
                        }
                        a.replaceWith(l);
                      } else {
                        a.replaceWith(...a.childNodes);
                      }
                    } else {
                      u = a.nextSibling;
                      if (u && u.nodeType === 3) {
                        u.textContent = (a.textContent || "") + (u.textContent || "");
                        a.remove();
                      }
                    }
                  }
                  b.length = 0;
                  e.normalize();
                }
                this.lines.push(..._);
                this.words.push(...b);
                this.chars.push(...y);
              });
              if (u && this[u]) {
                this.masks.push(...this[u].map(t => {
                  let e = t.cloneNode();
                  t.replaceWith(e);
                  e.appendChild(t);
                  if (t.className) {
                    e.className = t.className.trim() + "-mask";
                  }
                  e.style.overflow = "clip";
                  return e;
                }));
              }
            }
            this.isSplit = true;
            if (zo && c) {
              if (a) {
                zo.addEventListener("loadingdone", this._split);
              } else if (zo.status === "loading") {
                console.warn("SplitText called before fonts loaded");
              }
            }
            if ((e = s && s(this)) && e.totalTime) {
              this._data.anim = y ? e.totalTime(y) : e;
            }
            if (c && a) {
              this.elements.forEach((t, e) => {
                v[e].width = t.offsetWidth;
                if (b) {
                  b.observe(t);
                }
              });
            }
          });
          return this;
        }
        kill() {
          let {
            obs: t
          } = this._data;
          if (t) {
            t.disconnect();
          }
          if (zo != null) {
            zo.removeEventListener("loadingdone", this._split);
          }
        }
        revert() {
          var t;
          var e;
          if (this.isSplit) {
            let {
              orig: n,
              anim: r
            } = this._data;
            this.kill();
            n.forEach(Zo);
            this.chars.length = this.words.length = this.lines.length = n.length = this.masks.length = 0;
            this.isSplit = false;
            if (r) {
              this._data.animTime = r.totalTime();
              r.revert();
            }
            if ((e = (t = this.vars).onRevert) != null) {
              e.call(t, this);
            }
          }
          return this;
        }
        static create(e, n) {
          return new t(e, n);
        }
        static register(t) {
          No = No || t || window.gsap;
          if (No) {
            Ho = No.utils.toArray;
            Go = No.core.context || Go;
          }
          if (!Uo && window.innerWidth > 0) {
            zo = document.fonts;
            Uo = true;
          }
        }
      };
      rs.version = "3.14.2";
      let is = rs;
      var os = n(959);
      var ss = n(876);
      function as(t) {
        as = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return as(t);
      }
      function ls(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, us(r.key), r);
        }
      }
      function us(t) {
        var e = function (t, e) {
          if (as(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (as(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (as(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function cs(t, e, n) {
        e = fs(e);
        return function (t, e) {
          if (e && (as(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, hs() ? Reflect.construct(e, n || [], fs(t).constructor) : e.apply(t, n));
      }
      function hs() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (hs = function () {
          return !!t;
        })();
      }
      function fs(t) {
        fs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return fs(t);
      }
      function ps(t, e) {
        ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ps(t, e);
      }
      var ds = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          r = cs(this, e, [t, n]);
          console.log("test component");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ps(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            ls(t.prototype, e);
          }
          if (n) {
            ls(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            console.log(this.viewport);
          }
        }, {
          key: "attach",
          value: function () {
            console.log("attach");
          }
        }]);
      }(ss.p);
      function ms(t) {
        ms = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ms(t);
      }
      function gs(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ws(r.key), r);
        }
      }
      function vs(t, e, n) {
        e = bs(e);
        return function (t, e) {
          if (e && (ms(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ys() ? Reflect.construct(e, n || [], bs(t).constructor) : e.apply(t, n));
      }
      function ys() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ys = function () {
          return !!t;
        })();
      }
      function bs(t) {
        bs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return bs(t);
      }
      function _s(t, e) {
        _s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return _s(t, e);
      }
      function ws(t) {
        var e = function (t, e) {
          if (ms(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ms(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ms(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var xs = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = ws(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = vs(this, e, [t, n]), "resize", function () {
            if (r.oldWidth !== window.innerWidth) {
              if (window.innerWidth < 1024) {
                r.root.style.setProperty("--full-height-mobile", window.innerHeight + "px");
              }
              r.oldWidth = window.innerWidth;
            }
          });
          r.root = document.querySelector(":root");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            _s(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            gs(t.prototype, e);
          }
          if (n) {
            gs(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
          }
        }, {
          key: "attach",
          value: function () {
            window.addEventListener("resize", this.resize);
          }
        }, {
          key: "detach",
          value: function () {
            window.removeEventListener("resize", this.resize);
          }
        }]);
      }(ss.p);
      function Ss(t) {
        Ss = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ss(t);
      }
      function Ts(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ms(r.key), r);
        }
      }
      function Ms(t) {
        var e = function (t, e) {
          if (Ss(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ss(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ss(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Ps(t, e, n) {
        e = Cs(e);
        return function (t, e) {
          if (e && (Ss(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Es() ? Reflect.construct(e, n || [], Cs(t).constructor) : e.apply(t, n));
      }
      function Es() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Es = function () {
          return !!t;
        })();
      }
      function Os() {
        Os = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = Cs(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return Os.apply(null, arguments);
      }
      function Cs(t) {
        Cs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Cs(t);
      }
      function As(t, e) {
        As = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return As(t, e);
      }
      var Rs = function (t) {
        function e(t, n = {}) {
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          return Ps(this, e, [t, n]);
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            As(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Ts(t.prototype, e);
          }
          if (n) {
            Ts(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "slideAnimation",
          value: function (t) {
            var e = new f.os.timeline({
              paused: true
            });
            e.fromTo(t.element, {
              x: -t.width - this._scrollLeft
            }, {
              x: 0,
              ease: "none",
              duration: 1
            });
            e.fromTo(t.element, {
              x: 0
            }, {
              x: this._scrollRight,
              ease: "none",
              duration: 1
            });
            e.seek(1);
            return e;
          }
        }, {
          key: "unlayout",
          value: function () {
            (function (t, e, n, r) {
              var i = Os(Cs(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            })(e, "unlayout", this, 3)([]);
            this.slides.forEach(function (t) {
              f.os.set(t.element, {
                clearProps: "all"
              });
            });
          }
        }]);
      }(os.Rt);
      function Ls(t) {
        Ls = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ls(t);
      }
      function Ds(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Us(r.key), r);
        }
      }
      function Is(t, e, n) {
        e = js(e);
        return function (t, e) {
          if (e && (Ls(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ks() ? Reflect.construct(e, n || [], js(t).constructor) : e.apply(t, n));
      }
      function ks() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ks = function () {
          return !!t;
        })();
      }
      function js(t) {
        js = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return js(t);
      }
      function Ns(t, e) {
        Ns = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ns(t, e);
      }
      function zs(t, e, n) {
        if ((e = Us(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Us(t) {
        var e = function (t, e) {
          if (Ls(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ls(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ls(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Fs = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          zs(r = Is(this, e, [t, n]), "resize", function () {
            if (window.innerWidth > 1023) {
              if (!!r._slideshow._attached || !r.initialized) {
                r._slideshow.unlayout();
                r._slideshow.detach();
                r.initialized = true;
              }
            } else {
              if (!r._slideshow._attached) {
                r._slideshow.attach();
              }
              r._slideshow.resize();
            }
          });
          zs(r, "update", function () {
            r.carouselCounters.forEach(function (t, e) {
              if (e == r._slideshow.index) {
                t.classList.add("active");
              } else {
                t.classList.remove("active");
              }
            });
          });
          zs(r, "lockScroll", function () {
            h.stop();
          });
          zs(r, "unlockScroll", function () {
            h.start();
          });
          zs(r, "touchStart", function (t) {
            r.slides.forEach(function (e) {
              if (!e.contains(t.target)) {
                r.unlockScroll();
              }
            });
          });
          r.slides = r.element.querySelectorAll(".card");
          r.carouselW = r.element.querySelector(".cards-w");
          r.insideW = r.element.querySelector(".inside-w");
          r.oldDesktop = null;
          r.carouselCounters = r.element.querySelectorAll(".carousel-counter .circle-counter");
          r.initialized = false;
          r._slideshow = new Rs(r.insideW, {
            slides: ".card",
            snapping: true,
            reference: r.carouselW,
            inputOptions: {
              wheel: false,
              damperHeld: 0.2
            }
          });
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ns(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Ds(t.prototype, e);
          }
          if (n) {
            Ds(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
            this.carouselCounters[0].classList.add("active");
          }
        }, {
          key: "attach",
          value: function () {
            this._slideshow.attach();
            window.addEventListener("resize", this.resize);
            this._slideshow.on("change", this.update);
            this.resize();
            this._slideshow.input.on("start", this.lockScroll);
            this._slideshow.input.on("release", this.unlockScroll);
            this.element.addEventListener("touchstart", this.touchStart);
          }
        }, {
          key: "detach",
          value: function () {
            this._slideshow.detach();
            window.removeEventListener("resize", this.resize);
            this._slideshow.off("change", this.update);
            this._slideshow.input.on("start", this.lockScroll);
            this._slideshow.input.on("release", this.unlockScroll);
            this.element.removeEventListener("touchstart", this.touchStart);
          }
        }]);
      }(ss.p);
      var Bs = n(105);
      var Hs = n(348);
      function Ws(t) {
        Ws = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ws(t);
      }
      function Vs(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Qs(r.key), r);
        }
      }
      function Gs(t, e, n) {
        e = Xs(e);
        return function (t, e) {
          if (e && (Ws(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, qs() ? Reflect.construct(e, n || [], Xs(t).constructor) : e.apply(t, n));
      }
      function qs() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (qs = function () {
          return !!t;
        })();
      }
      function Xs(t) {
        Xs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Xs(t);
      }
      function Ys(t, e) {
        Ys = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ys(t, e);
      }
      function Ks(t, e, n) {
        if ((e = Qs(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Qs(t) {
        var e = function (t, e) {
          if (Ws(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ws(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ws(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Zs = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Ks(r = Gs(this, e, [t, n]), "cancelAnimations", function () {
            r.st.pause();
            r.st.progress(1);
          });
          Ks(r, "resize", function () {
            r.elementHeightPx = window.getComputedStyle(r.element).fontSize;
            r.elementHeight = parseInt(r.elementHeightPx, 10);
            r.wrappers.forEach(function (t, e) {
              t.querySelectorAll("span").forEach(function (t) {
                t.style.fontSize = r.elementHeightPx;
                t.style.lineHeight = r.elementHeightPx;
              });
              r.st.to(t, {
                y: -r.elementHeight * r.chars[e],
                duration: 4 + e * 0.9,
                ease: "power4.out"
              }, 0);
            });
          });
          r.chars = r.element.innerText.split("");
          r.element.innerHTML = null;
          r.wrappers = [];
          r.elementHeightPx = window.getComputedStyle(r.element).fontSize;
          r.elementHeight = parseInt(r.elementHeightPx, 10);
          Bs.z.on(Hs.q.TOGGLE_ANIMATIONS, function () {
            return r.cancelAnimations();
          });
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ys(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Vs(t.prototype, e);
          }
          if (n) {
            Vs(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "attach",
          value: function () {
            window.addEventListener("resize", this.resize);
          }
        }, {
          key: "init",
          value: function () {
            var t = this;
            this.element.style.display = "flex";
            this.element.style.lineHeight = "100%";
            this.element.style.overflow = "hidden";
            this.chars.forEach(function (e) {
              if (e != "," && e != "." && e != " ") {
                var n = document.createElement("div");
                for (var r = 0; r < 10; r++) {
                  var i = document.createTextNode(r);
                  var o = document.createElement("span");
                  o.style.fontSize = t.elementHeightPx;
                  o.style.lineHeight = t.elementHeightPx;
                  o.appendChild(i);
                  n.appendChild(o);
                }
                n.style.display = "flex";
                n.style.flexDirection = "column";
                t.element.appendChild(n);
                t.wrappers.push(n);
              } else {
                t.element.appendChild(document.createTextNode(e));
              }
            });
            this.chars = this.chars.filter(function (t) {
              return t !== "," && t !== "." && t !== " ";
            });
            this.st = f.os.timeline({
              scrollTrigger: {
                trigger: this.element,
                toggleActions: "play none none none"
              }
            });
            this.wrappers.forEach(function (e, n) {
              f.os.set(e, {
                y: t.elementHeight * -9
              });
              t.st.to(e, {
                y: -t.elementHeight * t.chars[n],
                duration: 4 + n * 0.9,
                ease: "power4.out"
              }, 0);
            });
          }
        }]);
      }(ss.p);
      function Js(t) {
        Js = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Js(t);
      }
      function $s(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ia(r.key), r);
        }
      }
      function ta(t, e, n) {
        e = na(e);
        return function (t, e) {
          if (e && (Js(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ea() ? Reflect.construct(e, n || [], na(t).constructor) : e.apply(t, n));
      }
      function ea() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ea = function () {
          return !!t;
        })();
      }
      function na(t) {
        na = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return na(t);
      }
      function ra(t, e) {
        ra = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ra(t, e);
      }
      function ia(t) {
        var e = function (t, e) {
          if (Js(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Js(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Js(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var oa = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = ia(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = ta(this, e, [t, n]), "cancelAnimations", function () {
            r.st.pause();
            r.st.progress(1);
          });
          r.horizontalBar = r.element.querySelector(".hor");
          r.verticalBar = r.element.querySelector(".vert");
          Bs.z.on(Hs.q.TOGGLE_ANIMATIONS, function () {
            return r.cancelAnimations();
          });
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ra(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            $s(t.prototype, e);
          }
          if (n) {
            $s(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.st = f.os.timeline({
              scrollTrigger: {
                trigger: this.element,
                toggleActions: "play none none none"
              }
            });
            f.os.set(this.horizontalBar, {
              scaleY: 0
            });
            f.os.set(this.verticalBar, {
              scaleX: 0
            });
            this.st.to(this.horizontalBar, {
              scaleY: 1,
              ease: "expo.out",
              duration: 1.6
            }, 0.2);
            this.st.to(this.verticalBar, {
              scaleX: 1,
              ease: "expo.out",
              duration: 1.6
            }, 0.2);
          }
        }]);
      }(ss.p);
      function sa(t) {
        sa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return sa(t);
      }
      function aa(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, fa(r.key), r);
        }
      }
      function la(t, e, n) {
        e = ca(e);
        return function (t, e) {
          if (e && (sa(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ua() ? Reflect.construct(e, n || [], ca(t).constructor) : e.apply(t, n));
      }
      function ua() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ua = function () {
          return !!t;
        })();
      }
      function ca(t) {
        ca = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ca(t);
      }
      function ha(t, e) {
        ha = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ha(t, e);
      }
      function fa(t) {
        var e = function (t, e) {
          if (sa(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (sa(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (sa(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var pa = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = fa(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = la(this, e, [t, n]), "playTimeline", function () {
            r.st = f.os.timeline();
            f.os.set([r.title, r.subtitle], {
              opacity: 1
            });
            r.st.to(r.titleSplit.words, {
              opacity: 1,
              stagger: 0.5,
              ease: "sine.inOut",
              duration: 4
            }, 0);
            r.st.to(r.omegaIcon, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3
            }, 0.3);
            r.st.to(r.circleIcon, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3
            }, 0.3);
            r.st.to(r.subSplit.chars, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 2.8,
              stagger: 0.02
            }, 0.3);
            r.st.add(function () {
              return r.cursor.classList.remove("loading");
            }, 2);
          });
          r.omegaIcon = r.element.querySelector(".omega-icon");
          r.circleIcon = r.element.querySelector(".circle-icon");
          r.subtitle = r.element.querySelector(".hero-sub");
          r.title = r.element.querySelector(".hero-t");
          r.cursor = document.querySelector(".cursor-w");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ha(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            aa(t.prototype, e);
          }
          if (n) {
            aa(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.titleSplit = new is(this.title, {
              type: "words",
              wordsClass: "word"
            });
            this.subSplit = new is(this.subtitle, {
              type: "chars",
              charsClass: "char"
            });
            this.subSplit.chars.forEach(function (t) {
              t.setAttribute("aria-hidden", true);
            });
          }
        }, {
          key: "attach",
          value: function () {
            window.addEventListener("DOMContentLoaded", this.playTimeline);
          }
        }, {
          key: "detach",
          value: function () {
            window.removeEventListener("DOMContentLoaded", this.playTimeline);
          }
        }]);
      }(ss.p);
      function da(t) {
        da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return da(t);
      }
      function ma(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, ga(r.key), r);
        }
      }
      function ga(t) {
        var e = function (t, e) {
          if (da(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (da(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (da(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function va(t, e, n) {
        e = ba(e);
        return function (t, e) {
          if (e && (da(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ya() ? Reflect.construct(e, n || [], ba(t).constructor) : e.apply(t, n));
      }
      function ya() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ya = function () {
          return !!t;
        })();
      }
      function ba(t) {
        ba = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ba(t);
      }
      function _a(t, e) {
        _a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return _a(t, e);
      }
      var wa = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (r = va(this, e, [t, n])).text = r.element.querySelector(".button-text");
          r.cross = r.element.querySelector(".button-icon");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            _a(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            ma(t.prototype, e);
          }
          if (n) {
            ma(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            var t = this;
            this.st = f.os.timeline({
              scrollTrigger: {
                trigger: this.element
              }
            });
            f.os.set([this.cross, this.text], {
              opacity: 0
            });
            this.st.to(this.text, {
              opacity: 1,
              duration: 0.6,
              ease: "none"
            }, 0.3);
            this.st.to(this.cross, {
              opacity: 1,
              ease: "none",
              duration: 0.5
            }, 0.8);
            this.st.call(function () {
              return t.element.classList.add("visible");
            });
          }
        }]);
      }(ss.p);
      function xa(t) {
        xa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return xa(t);
      }
      function Sa(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Oa(r.key), r);
        }
      }
      function Ta(t, e, n) {
        e = Pa(e);
        return function (t, e) {
          if (e && (xa(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Ma() ? Reflect.construct(e, n || [], Pa(t).constructor) : e.apply(t, n));
      }
      function Ma() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Ma = function () {
          return !!t;
        })();
      }
      function Pa(t) {
        Pa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Pa(t);
      }
      function Ea(t, e) {
        Ea = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ea(t, e);
      }
      function Oa(t) {
        var e = function (t, e) {
          if (xa(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (xa(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (xa(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Ca = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = Oa(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = Ta(this, e, [t, n]), "playTimeline", function () {
            r.st = f.os.timeline();
            r.st.to(r.element, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3.2
            }, 3.3);
          });
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ea(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Sa(t.prototype, e);
          }
          if (n) {
            Sa(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "attach",
          value: function () {
            window.addEventListener("DOMContentLoaded", this.playTimeline);
          }
        }, {
          key: "detach",
          value: function () {
            window.removeEventListener("DOMContentLoaded", this.playTimeline);
          }
        }]);
      }(ss.p);
      function Aa(t) {
        Aa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Aa(t);
      }
      function Ra(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Na(r.key), r);
        }
      }
      function La(t, e, n) {
        e = Ia(e);
        return function (t, e) {
          if (e && (Aa(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Da() ? Reflect.construct(e, n || [], Ia(t).constructor) : e.apply(t, n));
      }
      function Da() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Da = function () {
          return !!t;
        })();
      }
      function Ia(t) {
        Ia = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ia(t);
      }
      function ka(t, e) {
        ka = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return ka(t, e);
      }
      function ja(t, e, n) {
        if ((e = Na(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Na(t) {
        var e = function (t, e) {
          if (Aa(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Aa(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Aa(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var za = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          ja(r = La(this, e, [t, n]), "onwheel", function () {});
          ja(r, "snapTo", function () {
            if (!r.cancelSnap) {
              var t = [];
              r.snapSections.forEach(function (e) {
                t.push(Math.abs(e.getBoundingClientRect().top));
              });
              var e = t.indexOf(Math.min.apply(Math, t));
              h.scrollTo(r.snapSections[e], {
                duration: 2,
                easing: function (t) {
                  if (t < 0.5) {
                    return t * 4 * t * t;
                  } else {
                    return 1 - Math.pow(t * -2 + 2, 3) / 2;
                  }
                }
              });
            }
          });
          r.snapSections = r.element.querySelectorAll("[data-snap]");
          r.cancelSnapSections = Array.from(r.element.querySelectorAll("[data-cancel-snap]")).map(function (t, e) {
            return {
              el: t,
              id: e,
              tl: null
            };
          });
          r.cancelSnap = false;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            ka(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Ra(t.prototype, e);
          }
          if (n) {
            Ra(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            var t = this;
            this.cancelSnapSections.forEach(function (e) {
              e.tl = f.os.timeline({
                scrollTrigger: {
                  trigger: e.el,
                  start: "200px bottom",
                  end: "80% top",
                  onToggle: function () {
                    return t.cancelSnap = !t.cancelSnap;
                  }
                }
              });
            });
          }
        }, {
          key: "attach",
          value: function () {
            var t = this;
            window.addEventListener("wheel", this.onwheel);
            window.addEventListener("touchmove", this.onwheel);
            document.querySelectorAll(".lines").forEach(function (t) {
              t.setAttribute("aria-hidden", true);
            });
            document.querySelectorAll(".word").forEach(function (t) {
              t.setAttribute("aria-hidden", true);
            });
            document.querySelectorAll(".char").forEach(function (t) {
              t.setAttribute("aria-hidden", true);
            });
            setTimeout(function () {
              t.element.querySelectorAll("[aria-label]").forEach(function (t) {
                if (!t.closest(".ow_ext, #onetrust-consent-sdk")) {
                  var e = t.getAttribute("aria-label");
                  var n = document.createElement("span");
                  n.classList.add("wcag-hidden");
                  n.textContent = e;
                  t.appendChild(n);
                }
              });
            }, 500);
            this.st = f.os.timeline({
              scrollTrigger: {
                trigger: this.element.querySelector(".main-w"),
                start: "bottom bottom",
                end: "+=300",
                scrub: true
              }
            });
            this.st.to(document.querySelectorAll(".accessibility-button"), {
              y: -300,
              duration: 1,
              ease: "none"
            });
          }
        }, {
          key: "detach",
          value: function () {
            window.removeEventListener("wheel", this.onwheel);
            window.removeEventListener("touchmove", this.onwheel);
          }
        }]);
      }(ss.p);
      var Ua = n(410);
      function Fa(t) {
        Fa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Fa(t);
      }
      function Ba(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ya(r.key), r);
        }
      }
      function Ha(t, e, n) {
        e = Ga(e);
        return function (t, e) {
          if (e && (Fa(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Wa() ? Reflect.construct(e, n || [], Ga(t).constructor) : e.apply(t, n));
      }
      function Wa() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Wa = function () {
          return !!t;
        })();
      }
      function Va() {
        Va = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = Ga(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return Va.apply(null, arguments);
      }
      function Ga(t) {
        Ga = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Ga(t);
      }
      function qa(t, e) {
        qa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return qa(t, e);
      }
      function Xa(t, e, n) {
        if ((e = Ya(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Ya(t) {
        var e = function (t, e) {
          if (Fa(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Fa(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Fa(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Ka = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Xa(r = Ha(this, e, [t, n]), "mouseDown", function (t) {
            var e;
            var n;
            if ((e = r.holdTl) !== null && e !== undefined && (n = e.play) !== null && n !== undefined) {
              n.call(e);
            }
          });
          Xa(r, "mouseUp", function () {
            var t;
            var e;
            if ((t = r.holdTl) !== null && t !== undefined && (e = t.reverse) !== null && e !== undefined) {
              e.call(t);
            }
          });
          Xa(r, "cancelAnimations", function () {
            f.os.set(r.heroTSplit.lines, {
              y: 0,
              opacity: 1
            });
            f.os.set(r.subW, {
              y: 0,
              opacity: 1
            });
            f.os.set(r._p.split.lines, {
              opacity: 1
            });
            f.os.set(r._p.icon, {
              y: 0,
              opacity: 1
            });
            f.os.set(r._p.firstP, {
              y: 0,
              opacity: 1
            });
            f.os.set(r._p.secondP, {
              y: 0,
              opacity: 1
            });
            f.os.set(r._o.numberW, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r._o.statsT, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r._s.numberW, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r._s.statsT, {
              yPercent: 0,
              opacity: 1
            });
          });
          r.heroT = r.element.querySelector(".hero-t");
          r.subW = r.element.querySelector(".subtitle-w");
          r.heroTSplit = new is(r.heroT, {
            type: "lines"
          });
          r.pSection = r.element.querySelector(".protecting-section");
          r.oSection = r.element.querySelector(".objects-section");
          r.sSection = r.element.querySelector(".satellites-section");
          r._p = {
            title: r.pSection.querySelector(".protecting-t"),
            icon: r.pSection.querySelector(".protecting-icon"),
            firstP: r.pSection.querySelector(".p1"),
            secondP: r.pSection.querySelector(".p2"),
            pos: 0.29
          };
          r._p.split = new is(r._p.title, {
            type: "lines",
            linesClass: "lines"
          });
          r._o = {
            numberW: r.oSection.querySelector(".number-w"),
            statsT: r.oSection.querySelector(".stats-t"),
            pos: 0.5
          };
          r._s = {
            numberW: r.sSection.querySelector(".number-w"),
            statsT: r.sSection.querySelector(".stats-t"),
            pos: 0.75
          };
          r.holdTl = null;
          r.allCircles = document.querySelectorAll(".cursor-w circle");
          r.cursor_outerCursor = document.querySelector(".cursor.outer-circle");
          r.cursor_innerCursor = document.querySelector(".cursor.inner-circle");
          r.cursor_circles = r.cursor_outerCursor.querySelectorAll("circle");
          r.extCirclesGr = r.cursor_outerCursor.querySelector(".ext-circles");
          r.cursorEllipse = r.cursor_outerCursor.querySelector("ellipse");
          r.lpLogo = document.querySelector(".longpress-logo");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            qa(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Ba(t.prototype, e);
          }
          if (n) {
            Ba(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
            this.timeline = this.setupTimeline();
            f.os.set([this._o.numberW, this._o.statsT, this._s.numberW, this._s.statsT], {
              opacity: 0
            });
            this.holdTl = f.os.timeline({
              paused: true
            });
            this.holdTl.to([this.cursor_innerCursor, this.cursor_outerCursor], {
              scale: 0.5,
              duration: 2,
              ease: "power2.inOut"
            }, 0);
            this.holdTl.to(this.extCirclesGr, {
              scale: 0.5,
              opacity: 0,
              duration: 1.3,
              transformOrigin: "50% 50%",
              ease: "power2.inOut"
            }, 0);
            this.holdTl.to(this.cursorEllipse, {
              opacity: 0.5,
              duration: 1.5,
              ease: "none"
            }, 0);
            this.holdTl.to(this.cursorEllipse, {
              opacity: 0.1,
              duration: 0.5,
              ease: "none"
            }, 1.5);
            this.holdTl.to(this.cursor_circles, {
              opacity: 1,
              duration: 1,
              stagger: 0.1,
              ease: "none"
            }, 0);
            this.holdTl.to(this.element, {
              opacity: 0,
              duration: 2,
              ease: "expo.inOut"
            }, 0);
            this.holdTl.to(this.allCircles, {
              attr: {
                r: 1.4
              },
              duration: 1.3
            }, 0.7);
            this.holdTl.set(this.lpLogo, {
              display: "block"
            }, 0);
            this.holdTl.to(this.lpLogo, {
              opacity: 1,
              duration: 1,
              ease: "none"
            }, 1);
          }
        }, {
          key: "setupTimeline",
          value: function () {
            var t = function (t, e, n, r) {
              var i = Va(Ga(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            }(e, "setupTimeline", this, 3)([]);
            t.fromTo(this.heroTSplit.lines, {
              y: 0,
              opacity: 1
            }, {
              y: -100,
              opacity: 0,
              duration: 0.08,
              stagger: 0.02,
              ease: "none"
            }, 0);
            t.fromTo(this.subW, {
              y: 0,
              opacity: 1
            }, {
              y: -200,
              opacity: 0,
              duration: 0.08,
              ease: "none"
            }, 0);
            t.fromTo(this._p.split.lines, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.1,
              stagger: 0.01,
              ease: "none"
            }, this._p.pos - 0.1);
            t.fromTo(this._p.icon, {
              opacity: 0,
              y: 200
            }, {
              opacity: 1,
              y: 0,
              duration: 0.1
            }, this._p.pos - 0.1);
            t.fromTo(this._p.firstP, {
              y: 210,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 0.1
            }, this._p.pos - 0.1);
            t.fromTo(this._p.secondP, {
              y: 220,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 0.1
            }, this._p.pos - 0.1);
            t.fromTo(this._p.split.lines, {
              opacity: 1
            }, {
              opacity: 0,
              duration: 0.08,
              stagger: 0.005,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._p.icon, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -110,
              duration: 0.1,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._p.firstP, {
              y: 0,
              opacity: 1
            }, {
              y: -100,
              opacity: 0,
              duration: 0.1,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._p.secondP, {
              y: 0,
              opacity: 1
            }, {
              y: -90,
              opacity: 0,
              duration: 0.1,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._o.numberW, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._o.pos - 0.15);
            t.fromTo(this._o.statsT, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._o.pos - 0.15);
            t.fromTo(this._o.numberW, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.15
            }, this._o.pos + 0.035);
            t.fromTo(this._o.statsT, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.15
            }, this._o.pos + 0.035);
            t.fromTo(this._s.numberW, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._s.pos - 0.15);
            t.fromTo(this._s.statsT, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._s.pos - 0.15);
            t.fromTo(this._s.numberW, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.15
            }, this._s.pos + 0.035);
            t.fromTo(this._s.statsT, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -200,
              opacity: 0,
              duration: 0.15
            }, this._s.pos + 0.035);
            return t;
          }
        }, {
          key: "attach",
          value: function () {
            this.element.addEventListener("mousedown", this.mouseDown);
            this.element.addEventListener("mouseup", this.mouseUp);
            this.element.addEventListener("mouseleave", this.mouseUp);
          }
        }, {
          key: "detach",
          value: function () {
            this.element.removeEventListener("mousedown", this.mouseDown);
            this.element.removeEventListener("mouseup", this.mouseUp);
            this.element.addEventListener("mouseleave", this.mouseUp);
          }
        }]);
      }(Ua.n);
      function Qa(t) {
        Qa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Qa(t);
      }
      function Za(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, rl(r.key), r);
        }
      }
      function Ja(t, e, n) {
        e = el(e);
        return function (t, e) {
          if (e && (Qa(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, $a() ? Reflect.construct(e, n || [], el(t).constructor) : e.apply(t, n));
      }
      function $a() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return ($a = function () {
          return !!t;
        })();
      }
      function tl() {
        tl = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = el(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return tl.apply(null, arguments);
      }
      function el(t) {
        el = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return el(t);
      }
      function nl(t, e) {
        nl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return nl(t, e);
      }
      function rl(t) {
        var e = function (t, e) {
          if (Qa(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Qa(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Qa(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var il = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = rl(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = Ja(this, e, [t, n]), "cancelAnimations", function () {
            f.os.set(r.tSplit.lines, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r.firstPSplit.lines, {
              yPercent: 0,
              opacity: 1
            });
            if (r.secondPSplit) {
              f.os.set(r.secondPSplit.lines, {
                yPercent: 0,
                opacity: 1
              });
            }
            r.cards.forEach(function (t) {
              f.os.set(t.element, {
                yPercent: 0,
                opacity: 1
              });
              f.os.set([t.name, t.post], {
                opacity: 1,
                y: 0
              });
            });
          });
          r.t = r.element.querySelector(".crew-t");
          r.firstP = r.element.querySelector(".p1");
          r.secondP = r.element.querySelector(".p2");
          r.cards = Array.from(r.element.querySelectorAll(".card")).map(function (t, e) {
            return {
              element: t,
              name: t.querySelector(".member-name"),
              post: t.querySelector(".member-post")
            };
          });
          r.isSetup = false;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            nl(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Za(t.prototype, e);
          }
          if (n) {
            Za(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
            this.tSplit = new is(this.t, {
              type: "lines",
              linesClass: "lines"
            });
            this.firstPSplit = new is(this.firstP, {
              type: "lines",
              linesClass: "lines"
            });
            if (this.secondP) {
              this.secondPSplit = new is(this.secondP, {
                type: "lines",
                linesClass: "lines"
              });
            }
            this.timeline = this.setupTimeline();
            f.os.set([this.tSplit.lines, this.firstPSplit.lines], {
              opacity: 0
            });
            if (this.secondPSplit) {
              f.os.set(this.secondPSplit.lines, {
                opacity: 0
              });
            }
          }
        }, {
          key: "setupTimeline",
          value: function () {
            var t = this;
            var n = function (t, e, n, r) {
              var i = tl(el(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            }(e, "setupTimeline", this, 3)([]);
            n.fromTo(this.tSplit.lines, {
              yPercent: 100,
              opacity: 0
            }, {
              yPercent: 0,
              opacity: 1,
              duration: 0.2,
              stagger: 0.015,
              ease: "power3.out"
            }, this.posIn - 0.1);
            n.fromTo(this.firstPSplit.lines, {
              yPercent: 100,
              opacity: 0
            }, {
              yPercent: 0,
              opacity: 1,
              duration: 0.15,
              stagger: 0.015,
              ease: "power4.out"
            }, this.posIn);
            if (this.secondPSplit) {
              n.fromTo(this.secondPSplit.lines, {
                yPercent: 100,
                opacity: 0
              }, {
                yPercent: 0,
                opacity: 1,
                duration: 0.15,
                stagger: 0.015,
                ease: "power4.out"
              }, this.posIn + 0.05);
            }
            n.fromTo(this.tSplit.lines, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -50,
              opacity: 0,
              duration: 0.2,
              stagger: 0.02,
              ease: "power1.in"
            }, this.posOut - 0.08);
            n.fromTo(this.firstPSplit.lines, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.2,
              stagger: 0.015,
              ease: "none"
            }, this.posOut);
            if (this.secondPSplit) {
              n.fromTo(this.secondPSplit.lines, {
                yPercent: 0,
                opacity: 1
              }, {
                yPercent: -100,
                opacity: 0,
                duration: 0.2,
                stagger: 0.015,
                ease: "none"
              }, this.posOut + 0.05);
            }
            this.cards.forEach(function (e, r) {
              if (r == 0) {
                n.fromTo(e.element, {
                  yPercent: 150,
                  opacity: 0
                }, {
                  yPercent: t.firstCardOffset,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power1.out"
                }, t.posCards + r * t.posCardsMult);
                n.fromTo([e.name, e.post], {
                  opacity: 0,
                  y: 200
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45 - t.posTextMult * r
                }, t.posCards * 1.15 + r * t.posCardsMult + t.posTextMult * r);
              } else if (r == 2) {
                n.fromTo(e.element, {
                  yPercent: 150,
                  opacity: 0
                }, {
                  yPercent: t.thirdCardOffset,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power1.out"
                }, t.posCards + r * t.posCardsMult);
                n.fromTo([e.name, e.post], {
                  opacity: 0,
                  y: 200
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45 - t.posTextMult * r
                }, t.posCards * 1.15 + r * t.posCardsMult + t.posTextMult * r);
              } else {
                n.fromTo(e.element, {
                  yPercent: t.middleCardY,
                  opacity: 0
                }, {
                  yPercent: 0,
                  duration: 0.5,
                  opacity: 1,
                  ease: "power1.out"
                }, t.posCards + r * t.posCardsMult);
                n.fromTo([e.name, e.post], {
                  opacity: 0,
                  y: 200
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45 - t.posTextMult * r
                }, t.posCards * 1.15 + r * t.posCardsMult + t.posTextMult * r);
              }
            });
            this.isSetup = true;
            return n;
          }
        }, {
          key: "resize",
          value: function () {
            if (window.innerWidth > 1024) {
              this.posIn = 0.35;
              this.posOut = 0.6;
              this.posCards = 0.4;
              this.posCardsMult = 0;
              this.posTextMult = 0.1;
              this.firstCardOffset = 0;
              this.thirdCardOffset = 0;
              this.middleCardY = 110;
            } else {
              this.posIn = 0;
              this.posOut = 0.15;
              this.posCards = 0;
              this.posCardsMult = 0.12;
              this.posTextMult = 0;
              this.firstCardOffset = 0;
              this.thirdCardOffset = 0;
              this.middleCardY = 150;
            }
            if (this.isSetup) {
              this.timeline = this.setupTimeline();
            }
          }
        }]);
      }(Ua.n);
      function ol(t) {
        ol = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return ol(t);
      }
      function sl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, fl(r.key), r);
        }
      }
      function al(t, e, n) {
        e = cl(e);
        return function (t, e) {
          if (e && (ol(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, ll() ? Reflect.construct(e, n || [], cl(t).constructor) : e.apply(t, n));
      }
      function ll() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (ll = function () {
          return !!t;
        })();
      }
      function ul() {
        ul = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = cl(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return ul.apply(null, arguments);
      }
      function cl(t) {
        cl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return cl(t);
      }
      function hl(t, e) {
        hl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return hl(t, e);
      }
      function fl(t) {
        var e = function (t, e) {
          if (ol(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (ol(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (ol(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var pl = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = fl(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = al(this, e, [t, n]), "cancelAnimations", function () {
            f.os.set(r.icon, {
              y: 0,
              opacity: 1
            });
            f.os.set(r.t, {
              y: 0,
              opacity: 1
            });
            f.os.set(r.p, {
              y: 0,
              opacity: 1
            });
            r.cards.forEach(function (t) {
              if (r.isDk) {
                f.os.set(t, {
                  opacity: 1,
                  yPercent: 0
                });
              }
            });
          });
          r.icon = r.element.querySelector(".privateer-icon");
          r.t = r.element.querySelector(".privateer-title-svg");
          r.cards = r.element.querySelectorAll(".card");
          r.p = r.element.querySelector(".privateer-p");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            hl(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            sl(t.prototype, e);
          }
          if (n) {
            sl(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
            this.timeline = this.setupTimeline();
            f.os.set([this.icon, this.t, this.p], {
              opacity: 0
            });
          }
        }, {
          key: "setupTimeline",
          value: function () {
            this.isSetup = true;
            var t = function (t, e, n, r) {
              var i = ul(cl(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            }(e, "setupTimeline", this, 3)([]);
            t.fromTo(this.icon, {
              opacity: 0,
              y: 400
            }, {
              opacity: 1,
              y: 0,
              duration: 0.15,
              ease: "sine.out"
            }, 0.13);
            t.fromTo(this.t, {
              opacity: 0,
              y: 500
            }, {
              opacity: 1,
              y: 0,
              duration: 0.15,
              ease: "sine.out"
            }, 0.15);
            t.fromTo(this.p, {
              opacity: 0,
              y: 150
            }, {
              opacity: 1,
              y: 0,
              duration: 0.1,
              stagger: 0.005,
              ease: "sine.out"
            }, 0.24);
            t.fromTo(this.icon, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -100,
              duration: 0.2,
              ease: "power3.in"
            }, 0.3);
            t.fromTo(this.t, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -200,
              duration: 0.2,
              ease: "power3.in"
            }, 0.34);
            t.fromTo(this.p, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -200,
              duration: 0.2,
              stagger: 0.0025,
              ease: "power3.in"
            }, 0.34);
            if (this.isDk) {
              this.cards.forEach(function (e, n) {
                t.set(e, {
                  opacity: "0"
                }, 0.39);
                t.set(e, {
                  opacity: "1"
                }, 0.4);
                if (n == 1) {
                  t.fromTo(e, {
                    yPercent: 200
                  }, {
                    yPercent: -20,
                    duration: 0.8,
                    ease: "power4.out"
                  }, 0.32);
                } else if (n == 2) {
                  t.fromTo(e, {
                    yPercent: 100
                  }, {
                    yPercent: -10,
                    duration: 0.65,
                    ease: "power3.out"
                  }, 0.335);
                } else {
                  t.fromTo(e, {
                    yPercent: 200
                  }, {
                    yPercent: 0,
                    duration: 0.42,
                    ease: "power3.out"
                  }, 0.28);
                }
              });
            }
            return t;
          }
        }, {
          key: "resize",
          value: function () {
            if (window.innerWidth > 1024) {
              this.isDk = true;
            } else {
              this.isDk = false;
            }
            if (this.isSetup) {
              this.timeline = this.setupTimeline();
            }
          }
        }]);
      }(Ua.n);
      function dl(t) {
        dl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return dl(t);
      }
      function ml(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, wl(r.key), r);
        }
      }
      function gl(t, e, n) {
        e = bl(e);
        return function (t, e) {
          if (e && (dl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, vl() ? Reflect.construct(e, n || [], bl(t).constructor) : e.apply(t, n));
      }
      function vl() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (vl = function () {
          return !!t;
        })();
      }
      function yl() {
        yl = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = bl(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return yl.apply(null, arguments);
      }
      function bl(t) {
        bl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return bl(t);
      }
      function _l(t, e) {
        _l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return _l(t, e);
      }
      function wl(t) {
        var e = function (t, e) {
          if (dl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (dl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (dl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var xl = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = wl(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = gl(this, e, [t, n]), "cancelAnimations", function () {
            f.os.set(r.icon, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r.button, {
              y: 0,
              opacity: 1
            });
            f.os.set(r.tSplit.lines, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r.p, {
              yPercent: 0,
              opacity: 1
            });
            f.os.set(r.bottomIcon, {
              opacity: 1,
              y: 0
            });
            f.os.set(r.bottomP, {
              opacity: 1,
              y: 0
            });
          });
          r.icon = r.element.querySelector(".wayfinder-svg");
          r.t = r.element.querySelector(".wayfinder-t");
          r.p = r.element.querySelector(".wayfinder-p");
          r.button = r.element.querySelector(".button");
          r.bottomIcon = r.element.querySelector(".bottom-icon");
          r.bottomP = r.element.querySelector(".bottom-p");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            _l(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            ml(t.prototype, e);
          }
          if (n) {
            ml(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.tSplit = new is(this.t, {
              type: "lines",
              linesClass: "lines"
            });
            this.timeline = this.setupTimeline();
            f.os.set([this.tSplit.lines, this.icon, this.button, this.p, this.bottomIcon, this.bottomP], {
              opacity: 0
            });
          }
        }, {
          key: "setupTimeline",
          value: function () {
            var t = function (t, e, n, r) {
              var i = yl(bl(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            }(e, "setupTimeline", this, 3)([]);
            t.fromTo(this.icon, {
              opacity: 0,
              yPercent: 200
            }, {
              opacity: 1,
              yPercent: 0,
              duration: 0.23,
              ease: "power4.out"
            }, 0.15);
            t.fromTo(this.button, {
              opacity: 0,
              y: 180
            }, {
              opacity: 1,
              y: 0,
              duration: 0.23,
              ease: "power4.out"
            }, 0.15);
            t.fromTo(this.tSplit.lines, {
              opacity: 0,
              yPercent: 200
            }, {
              opacity: 1,
              yPercent: 0,
              duration: 0.23,
              stagger: 0.01,
              ease: "power4.out"
            }, 0.15);
            t.fromTo(this.p, {
              opacity: 0,
              yPercent: 50
            }, {
              opacity: 1,
              yPercent: 0,
              duration: 0.23,
              ease: "power4.out"
            }, 0.15);
            t.fromTo(this.icon, {
              opacity: 1,
              yPercent: 0
            }, {
              opacity: 0,
              yPercent: -500,
              duration: 0.25
            }, 0.4);
            t.fromTo(this.button, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -70,
              duration: 0.25
            }, 0.4);
            t.fromTo(this.tSplit.lines, {
              opacity: 1,
              yPercent: 0
            }, {
              opacity: 0,
              yPercent: -250,
              duration: 0.24,
              stagger: 0
            }, 0.4);
            t.fromTo(this.p, {
              opacity: 1,
              yPercent: 0
            }, {
              opacity: 0,
              yPercent: -50,
              duration: 0.25
            }, 0.4);
            t.fromTo(this.bottomIcon, {
              opacity: 0,
              y: 80
            }, {
              opacity: 1,
              y: 0,
              duration: 0.08
            }, 0.5900000000000001);
            t.fromTo(this.bottomP, {
              opacity: 0,
              y: 150
            }, {
              opacity: 1,
              y: 0,
              duration: 0.08
            }, 0.5900000000000001);
            t.fromTo(this.bottomIcon, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -170,
              duration: 0.3
            }, 0.67);
            t.fromTo(this.bottomP, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -150,
              duration: 0.3
            }, 0.67);
            return t;
          }
        }]);
      }(Ua.n);
      function Sl(t) {
        Sl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Sl(t);
      }
      function Tl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Ml(r.key), r);
        }
      }
      function Ml(t) {
        var e = function (t, e) {
          if (Sl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Sl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Sl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      function Pl(t, e, n) {
        e = Cl(e);
        return function (t, e) {
          if (e && (Sl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, El() ? Reflect.construct(e, n || [], Cl(t).constructor) : e.apply(t, n));
      }
      function El() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (El = function () {
          return !!t;
        })();
      }
      function Ol() {
        Ol = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = Cl(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return Ol.apply(null, arguments);
      }
      function Cl(t) {
        Cl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Cl(t);
      }
      function Al(t, e) {
        Al = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Al(t, e);
      }
      var Rl = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (r = Pl(this, e, [t, n])).t = r.element.querySelector(".crew-t");
          r.firstP = r.element.querySelector(".p1");
          r.secondP = r.element.querySelector(".p2");
          r.cards = Array.from(r.element.querySelectorAll(".card")).map(function (t, e) {
            return {
              element: t,
              name: t.querySelector(".member-name"),
              post: t.querySelector(".member-post")
            };
          });
          r.isSetup = false;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Al(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Tl(t.prototype, e);
          }
          if (n) {
            Tl(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
            this.timeline = this.setupTimeline();
            f.os.set([this.firstP, this.secondP, this.t], {
              opacity: 0
            });
          }
        }, {
          key: "setupTimeline",
          value: function () {
            var t = this;
            var n = function (t, e, n, r) {
              var i = Ol(Cl(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            }(e, "setupTimeline", this, 3)([]);
            n.fromTo(this.t, {
              yPercent: 20,
              opacity: 0
            }, {
              yPercent: 0,
              opacity: 1,
              duration: 0.2,
              ease: "power3.out"
            }, this.posIn - 0.1);
            n.fromTo(this.firstP, {
              yPercent: 20,
              opacity: 0
            }, {
              yPercent: 0,
              opacity: 1,
              duration: 0.2,
              ease: "power4.out"
            }, this.posIn);
            if (this.secondP) {
              n.fromTo(this.secondP, {
                yPercent: 20,
                opacity: 0
              }, {
                yPercent: 0,
                opacity: 1,
                duration: 0.2,
                ease: "power4.out"
              }, this.posIn + 0.05);
            }
            n.fromTo(this.t, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -30,
              opacity: 0,
              duration: 0.2,
              ease: "power1.in"
            }, this.posOut - 0.08);
            n.fromTo(this.firstP, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -20,
              opacity: 0,
              duration: 0.3,
              ease: "none"
            }, this.posOut);
            if (this.secondP) {
              n.fromTo(this.secondP, {
                yPercent: 0,
                opacity: 1
              }, {
                yPercent: -20,
                opacity: 0,
                duration: 0.3,
                ease: "none"
              }, this.posOut + 0.05);
            }
            this.cards.forEach(function (e, r) {
              if (r == 0) {
                n.fromTo(e.element, {
                  yPercent: 150,
                  opacity: 0
                }, {
                  yPercent: t.firstCardOffset,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power1.out"
                }, t.posCards + r * t.posCardsMult);
                n.fromTo([e.name, e.post], {
                  opacity: 0,
                  y: 200
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45 - t.posTextMult * r
                }, t.posCards * 1.15 + r * t.posCardsMult + t.posTextMult * r);
              } else if (r == 2) {
                n.fromTo(e.element, {
                  yPercent: 150,
                  opacity: 0
                }, {
                  yPercent: t.thirdCardOffset,
                  opacity: 1,
                  duration: 0.5,
                  ease: "power1.out"
                }, t.posCards + r * t.posCardsMult);
                n.fromTo([e.name, e.post], {
                  opacity: 0,
                  y: 200
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45 - t.posTextMult * r
                }, t.posCards * 1.15 + r * t.posCardsMult + t.posTextMult * r);
              } else {
                n.fromTo(e.element, {
                  yPercent: t.middleCardY,
                  opacity: 0
                }, {
                  yPercent: 0,
                  duration: 0.5,
                  opacity: 1,
                  ease: "power1.out"
                }, t.posCards + r * t.posCardsMult);
                n.fromTo([e.name, e.post], {
                  opacity: 0,
                  y: 200
                }, {
                  opacity: 1,
                  y: 0,
                  duration: 0.45 - t.posTextMult * r
                }, t.posCards * 1.15 + r * t.posCardsMult + t.posTextMult * r);
              }
            });
            this.isSetup = true;
            return n;
          }
        }, {
          key: "resize",
          value: function () {
            if (window.innerWidth > 1024) {
              this.posIn = 0.35;
              this.posOut = 0.6;
              this.posCards = 0.4;
              this.posCardsMult = 0;
              this.posTextMult = 0.1;
              this.firstCardOffset = 0;
              this.thirdCardOffset = 0;
              this.middleCardY = 110;
            } else {
              this.posIn = 0;
              this.posOut = 0.15;
              this.posCards = 0.15;
              this.posCardsMult = 0.12;
              this.posTextMult = 0;
              this.firstCardOffset = 0;
              this.thirdCardOffset = 0;
              this.middleCardY = 150;
            }
            if (this.isSetup) {
              this.timeline = this.setupTimeline();
            }
          }
        }]);
      }(Ua.n);
      function Ll(t) {
        Ll = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Ll(t);
      }
      function Dl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Fl(r.key), r);
        }
      }
      function Il(t, e, n) {
        e = Nl(e);
        return function (t, e) {
          if (e && (Ll(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, kl() ? Reflect.construct(e, n || [], Nl(t).constructor) : e.apply(t, n));
      }
      function kl() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (kl = function () {
          return !!t;
        })();
      }
      function jl() {
        jl = typeof Reflect != "undefined" && Reflect.get ? Reflect.get.bind() : function (t, e, n) {
          var r = function (t, e) {
            while (!{}.hasOwnProperty.call(t, e) && (t = Nl(t)) !== null);
            return t;
          }(t, e);
          if (r) {
            var i = Object.getOwnPropertyDescriptor(r, e);
            if (i.get) {
              return i.get.call(arguments.length < 3 ? t : n);
            } else {
              return i.value;
            }
          }
        };
        return jl.apply(null, arguments);
      }
      function Nl(t) {
        Nl = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Nl(t);
      }
      function zl(t, e) {
        zl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return zl(t, e);
      }
      function Ul(t, e, n) {
        if ((e = Fl(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Fl(t) {
        var e = function (t, e) {
          if (Ll(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Ll(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Ll(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Bl = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Ul(r = Il(this, e, [t, n]), "mouseDown", function (t) {
            var e;
            var n;
            if ((e = r.holdTl) !== null && e !== undefined && (n = e.play) !== null && n !== undefined) {
              n.call(e);
            }
          });
          Ul(r, "mouseUp", function () {
            var t;
            var e;
            if ((t = r.holdTl) !== null && t !== undefined && (e = t.reverse) !== null && e !== undefined) {
              e.call(t);
            }
          });
          r.heroT = r.element.querySelector(".hero-t");
          r.subW = r.element.querySelector(".subtitle-w");
          r.heroTSplit = new is(r.heroT, {
            type: "words"
          });
          r.pSection = r.element.querySelector(".protecting-section");
          r.oSection = r.element.querySelector(".objects-section");
          r.sSection = r.element.querySelector(".satellites-section");
          r._p = {
            title: r.pSection.querySelector(".protecting-t"),
            icon: r.pSection.querySelector(".protecting-icon"),
            firstP: r.pSection.querySelector(".p1"),
            secondP: r.pSection.querySelector(".p2"),
            pos: 0.25
          };
          r._p.split = new is(r._p.title, {
            type: "words",
            wordsClass: "words"
          });
          r._o = {
            numberW: r.oSection.querySelector(".number-w"),
            statsT: r.oSection.querySelector(".stats-t"),
            videoW: r.oSection.querySelector(".video-w"),
            video: r.oSection.querySelector("video"),
            pos: 0.5
          };
          r._s = {
            numberW: r.sSection.querySelector(".number-w"),
            statsT: r.sSection.querySelector(".stats-t"),
            pos: 0.75
          };
          r.holdTl = null;
          r.cursor_outerCursor = document.querySelector(".cursor.outer-circle");
          r.cursor_innerCursor = document.querySelector(".cursor.inner-circle");
          r.cursor_circles = r.cursor_outerCursor.querySelectorAll("circle");
          r.lpLogo = document.querySelector(".longpress-logo");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            zl(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Dl(t.prototype, e);
          }
          if (n) {
            Dl(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            this.resize();
            this.timeline = this.setupTimeline();
            f.os.set([this._o.numberW, this._o.statsT, this._s.numberW, this._s.statsT], {
              opacity: 0
            });
            this.holdTl = f.os.timeline({
              paused: true
            });
            this.holdTl.to([this.cursor_innerCursor, this.cursor_outerCursor], {
              scale: 0.7,
              duration: 2,
              ease: "power2.inOut"
            }, 0);
            this.holdTl.to(this.cursor_circles, {
              opacity: 1,
              duration: 1,
              stagger: 0.1,
              ease: "none"
            }, 0);
            this.holdTl.to(this.element, {
              opacity: 0,
              duration: 2,
              ease: "expo.inOut"
            }, 0);
            this.holdTl.set(this.lpLogo, {
              display: "block"
            }, 0);
            this.holdTl.to(this.lpLogo, {
              opacity: 1,
              duration: 1,
              ease: "none"
            }, 1);
          }
        }, {
          key: "setupTimeline",
          value: function () {
            var t = function (t, e, n, r) {
              var i = jl(Nl(r & 1 ? t.prototype : t), e, n);
              if (r & 2 && typeof i == "function") {
                return function (t) {
                  return i.apply(n, t);
                };
              } else {
                return i;
              }
            }(e, "setupTimeline", this, 3)([]);
            t.fromTo(this.heroTSplit.words, {
              y: 0,
              opacity: 1
            }, {
              y: -100,
              opacity: 0,
              duration: 0.08,
              stagger: 0.02,
              ease: "none"
            }, 0);
            t.fromTo(this.subW, {
              y: 0,
              opacity: 1
            }, {
              y: -200,
              opacity: 0,
              duration: 0.08,
              ease: "none"
            }, 0);
            t.fromTo(this._p.split.words, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.1,
              stagger: 0.01,
              ease: "none"
            }, this._p.pos - 0.1);
            t.fromTo(this._p.icon, {
              opacity: 0,
              y: 200
            }, {
              opacity: 1,
              y: 0,
              duration: 0.1
            }, this._p.pos - 0.1);
            t.fromTo(this._p.firstP, {
              y: 210,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 0.1
            }, this._p.pos - 0.1);
            t.fromTo(this._p.secondP, {
              y: 220,
              opacity: 0
            }, {
              y: 0,
              opacity: 1,
              duration: 0.1
            }, this._p.pos - 0.1);
            t.fromTo(this._p.split.words, {
              opacity: 1
            }, {
              opacity: 0,
              duration: 0.08,
              stagger: 0.005,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._p.icon, {
              opacity: 1,
              y: 0
            }, {
              opacity: 0,
              y: -110,
              duration: 0.1,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._p.firstP, {
              y: 0,
              opacity: 1
            }, {
              y: -100,
              opacity: 0,
              duration: 0.1,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._p.secondP, {
              y: 0,
              opacity: 1
            }, {
              y: -90,
              opacity: 0,
              duration: 0.1,
              ease: "none"
            }, this._p.pos);
            t.fromTo(this._o.numberW, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._o.pos - 0.15);
            t.fromTo(this._o.statsT, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._o.pos - 0.15);
            t.fromTo(this._o.videoW, {
              yPercent: -30
            }, {
              yPercent: 0,
              duration: 0.06,
              ease: "sine.out"
            }, this._o.pos - 0.12);
            t.fromTo(this._o.video, {
              yPercent: -105
            }, {
              yPercent: 0,
              duration: 0.06,
              ease: "sine.out"
            }, this._o.pos - 0.12);
            t.fromTo(this._o.numberW, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.15
            }, this._o.pos + 0.035);
            t.fromTo(this._o.statsT, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.15
            }, this._o.pos + 0.035);
            t.fromTo(this._o.videoW, {
              yPercent: 0
            }, {
              yPercent: 5,
              duration: 0.06,
              ease: "sine.in"
            }, this._o.pos + 0.008);
            t.fromTo(this._o.video, {
              yPercent: 0
            }, {
              yPercent: 120,
              duration: 0.06,
              ease: "sine.in"
            }, this._o.pos + 0.008);
            t.fromTo(this._s.numberW, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._s.pos - 0.15);
            t.fromTo(this._s.statsT, {
              opacity: 0
            }, {
              opacity: 1,
              duration: 0.15
            }, this._s.pos - 0.15);
            t.fromTo(this._s.numberW, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -100,
              opacity: 0,
              duration: 0.15
            }, this._s.pos + 0.035);
            t.fromTo(this._s.statsT, {
              yPercent: 0,
              opacity: 1
            }, {
              yPercent: -200,
              opacity: 0,
              duration: 0.15
            }, this._s.pos + 0.035);
            return t;
          }
        }, {
          key: "attach",
          value: function () {
            this.element.addEventListener("mousedown", this.mouseDown);
            this.element.addEventListener("mouseup", this.mouseUp);
          }
        }, {
          key: "detach",
          value: function () {
            this.element.removeEventListener("mousedown", this.mouseDown);
            this.element.removeEventListener("mouseup", this.mouseUp);
          }
        }]);
      }(Ua.n);
      function Hl(t) {
        Hl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Hl(t);
      }
      function Wl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Kl(r.key), r);
        }
      }
      function Vl(t, e, n) {
        e = ql(e);
        return function (t, e) {
          if (e && (Hl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Gl() ? Reflect.construct(e, n || [], ql(t).constructor) : e.apply(t, n));
      }
      function Gl() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Gl = function () {
          return !!t;
        })();
      }
      function ql(t) {
        ql = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return ql(t);
      }
      function Xl(t, e) {
        Xl = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Xl(t, e);
      }
      function Yl(t, e, n) {
        if ((e = Kl(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Kl(t) {
        var e = function (t, e) {
          if (Hl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Hl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Hl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Ql = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Yl(r = Vl(this, e, [t, n]), "playTimeline", function () {
            r.st = f.os.timeline();
            r.st.to(r.text, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3
            }, 3);
            r.st.to(r.icon, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3
            }, 3);
            r.st.set(r, {
              played: true
            });
          });
          Yl(r, "hide", function () {
            if (r.played != 0) {
              f.os.to(r.element, {
                opacity: 0,
                ease: "none",
                duration: 0.8
              });
            }
          });
          r.text = r.element.querySelector(".scroll-text");
          r.icon = r.element.querySelector(".scroll-icon");
          r.played = false;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Xl(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Wl(t.prototype, e);
          }
          if (n) {
            Wl(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {}
        }, {
          key: "attach",
          value: function () {
            window.addEventListener("DOMContentLoaded", this.playTimeline);
            window.addEventListener("scroll", this.hide);
          }
        }, {
          key: "detach",
          value: function () {
            window.removeEventListener("DOMContentLoaded", this.playTimeline);
            window.removeEventListener("scroll", this.hide);
          }
        }]);
      }(ss.p);
      function Zl(t) {
        Zl = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Zl(t);
      }
      function Jl(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, iu(r.key), r);
        }
      }
      function $l(t, e, n) {
        e = eu(e);
        return function (t, e) {
          if (e && (Zl(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, tu() ? Reflect.construct(e, n || [], eu(t).constructor) : e.apply(t, n));
      }
      function tu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (tu = function () {
          return !!t;
        })();
      }
      function eu(t) {
        eu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return eu(t);
      }
      function nu(t, e) {
        nu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return nu(t, e);
      }
      function ru(t, e, n) {
        if ((e = iu(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function iu(t) {
        var e = function (t, e) {
          if (Zl(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Zl(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Zl(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var ou = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          ru(r = $l(this, e, [t, n]), "hover", function (t) {
            if (t.currentTarget.dataset.hover) {
              r.element.classList.add(`hover-${t.currentTarget.dataset.hover}`);
            } else {
              r.element.classList.add("hover");
            }
          });
          ru(r, "mouseMove", function (t) {
            r.xToIn(t.clientX);
            r.yToIn(t.clientY);
            r.xToOut(t.clientX);
            r.yToOut(t.clientY);
          });
          ru(r, "leave", function () {
            r.hoverClasses.forEach(function (t) {
              r.element.classList.remove(`${t}`);
            });
          });
          r.hoverElements = document.querySelectorAll("[data-hover]");
          r.hoverClasses = ["hover", "hover-1", "hover-2", "hover-3"];
          r.firstMove = true;
          r.innerCircle = r.element.querySelector(".inner-circle");
          r.outerCircle = r.element.querySelector(".outer-circle");
          r.activeSections = document.querySelectorAll("[data-custom-cursor]");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            nu(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Jl(t.prototype, e);
          }
          if (n) {
            Jl(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "init",
          value: function () {
            var t = this;
            this.xToIn = f.Ay.quickTo(this.innerCircle, "x", {
              duration: 0.1,
              ease: "power3.out"
            });
            this.yToIn = f.Ay.quickTo(this.innerCircle, "y", {
              duration: 0.1,
              ease: "power3.out"
            });
            this.xToOut = f.Ay.quickTo(this.outerCircle, "x", {
              duration: 0.35,
              ease: "power3.out"
            });
            this.yToOut = f.Ay.quickTo(this.outerCircle, "y", {
              duration: 0.35,
              ease: "power3.out"
            });
            this.activeSections.forEach(function (e) {
              f.Ay.timeline({
                scrollTrigger: {
                  trigger: e,
                  start: "top 50%",
                  end: "bottom 50%",
                  toggleClass: {
                    targets: [t.element],
                    className: "visible"
                  }
                }
              });
            });
          }
        }, {
          key: "attach",
          value: function () {
            var t = this;
            window.addEventListener("mousemove", this.mouseMove);
            this.hoverElements.forEach(function (e) {
              e.addEventListener("mouseover", t.hover);
              e.addEventListener("mouseleave", t.leave);
            });
          }
        }, {
          key: "detach",
          value: function () {
            var t = this;
            window.removeEventListener("mousemove", this.mouseMove);
            this.hoverElements.forEach(function (e) {
              e.removeEventListener("mouseover", t.hover);
              e.removeEventListener("mouseleave", t.leave);
            });
          }
        }]);
      }(ss.p);
      function su(t) {
        su = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return su(t);
      }
      function au(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, fu(r.key), r);
        }
      }
      function lu(t, e, n) {
        e = cu(e);
        return function (t, e) {
          if (e && (su(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, uu() ? Reflect.construct(e, n || [], cu(t).constructor) : e.apply(t, n));
      }
      function uu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (uu = function () {
          return !!t;
        })();
      }
      function cu(t) {
        cu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return cu(t);
      }
      function hu(t, e) {
        hu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return hu(t, e);
      }
      function fu(t) {
        var e = function (t, e) {
          if (su(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (su(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (su(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var pu = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          (function (t, e, n) {
            if ((e = fu(e)) in t) {
              Object.defineProperty(t, e, {
                value: n,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              t[e] = n;
            }
          })(r = lu(this, e, [t, n]), "scrollToTop", function () {
            h.scrollTo(0, {
              duration: 2,
              easing: function (t) {
                return -(Math.cos(Math.PI * t) - 1) / 2;
              }
            });
          });
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            hu(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            au(t.prototype, e);
          }
          if (n) {
            au(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "attach",
          value: function () {
            this.element.addEventListener("click", this.scrollToTop);
          }
        }, {
          key: "detach",
          value: function () {
            this.element.removeEventListener("click", this.scrollToTop);
          }
        }]);
      }(ss.p);
      function du(t) {
        du = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return du(t);
      }
      function mu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, wu(r.key), r);
        }
      }
      function gu(t, e, n) {
        e = yu(e);
        return function (t, e) {
          if (e && (du(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, vu() ? Reflect.construct(e, n || [], yu(t).constructor) : e.apply(t, n));
      }
      function vu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (vu = function () {
          return !!t;
        })();
      }
      function yu(t) {
        yu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return yu(t);
      }
      function bu(t, e) {
        bu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return bu(t, e);
      }
      function _u(t, e, n) {
        if ((e = wu(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function wu(t) {
        var e = function (t, e) {
          if (du(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (du(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (du(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var xu = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          _u(r = gu(this, e, [t, n]), "toggleAnimations", function () {
            r.element.classList.toggle("off");
            document.body.classList.toggle("animations-off");
            Bs.z.emit(Hs.q.TOGGLE_ANIMATIONS, !document.body.classList.contains("animations-off"));
          });
          _u(r, "playTimeline", function () {
            r.st = f.os.timeline();
            r.st.to(r.element, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3
            }, 3.2);
          });
          r.cursor = document.querySelector(".cursor-w");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            bu(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            mu(t.prototype, e);
          }
          if (n) {
            mu(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "attach",
          value: function () {
            this.element.addEventListener("click", this.toggleAnimations);
            window.addEventListener("DOMContentLoaded", this.playTimeline);
          }
        }, {
          key: "detach",
          value: function () {
            this.element.removeEventListener("click", this.toggleAnimations);
            window.removeEventListener("DOMContentLoaded", this.playTimeline);
          }
        }]);
      }(ss.p);
      function Su(t) {
        Su = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Su(t);
      }
      function Tu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Au(r.key), r);
        }
      }
      function Mu(t, e, n) {
        e = Eu(e);
        return function (t, e) {
          if (e && (Su(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Pu() ? Reflect.construct(e, n || [], Eu(t).constructor) : e.apply(t, n));
      }
      function Pu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Pu = function () {
          return !!t;
        })();
      }
      function Eu(t) {
        Eu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Eu(t);
      }
      function Ou(t, e) {
        Ou = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Ou(t, e);
      }
      function Cu(t, e, n) {
        if ((e = Au(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Au(t) {
        var e = function (t, e) {
          if (Su(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Su(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Su(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Ru = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Cu(r = Mu(this, e, [t, n]), "toggleContrast", function () {
            r.element.classList.toggle("off");
            document.body.classList.toggle("contrast");
          });
          Cu(r, "playTimeline", function () {
            r.st = f.os.timeline();
            r.st.to(r.element, {
              opacity: 1,
              ease: "sine.inOut",
              duration: 3
            }, 3);
          });
          r.cursor = document.querySelector(".cursor-w");
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Ou(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Tu(t.prototype, e);
          }
          if (n) {
            Tu(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "attach",
          value: function () {
            this.element.addEventListener("click", this.toggleContrast);
            window.addEventListener("DOMContentLoaded", this.playTimeline);
          }
        }, {
          key: "detach",
          value: function () {
            this.element.removeEventListener("click", this.toggleContrast);
            window.removeEventListener("DOMContentLoaded", this.playTimeline);
          }
        }]);
      }(ss.p);
      function Lu(t) {
        Lu = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
          return typeof t;
        } : function (t) {
          if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof t;
          }
        };
        return Lu(t);
      }
      function Du() {
        var t;
        var e;
        var n = typeof Symbol == "function" ? Symbol : {};
        var r = n.iterator || "@@iterator";
        var i = n.toStringTag || "@@toStringTag";
        function o(n, r, i, o) {
          var l = r && r.prototype instanceof a ? r : a;
          var u = Object.create(l.prototype);
          Iu(u, "_invoke", function (n, r, i) {
            var o;
            var a;
            var l;
            var u = 0;
            var c = i || [];
            var h = false;
            var f = {
              p: 0,
              n: 0,
              v: t,
              a: p,
              f: p.bind(t, 4),
              d: function (e, n) {
                o = e;
                a = 0;
                l = t;
                f.n = n;
                return s;
              }
            };
            function p(n, r) {
              a = n;
              l = r;
              e = 0;
              for (; !h && u && !i && e < c.length; e++) {
                var i;
                var o = c[e];
                var p = f.p;
                var d = o[2];
                if (n > 3) {
                  if (i = d === r) {
                    l = o[(a = o[4]) ? 5 : (a = 3, 3)];
                    o[4] = o[5] = t;
                  }
                } else if (o[0] <= p) {
                  if (i = n < 2 && p < o[1]) {
                    a = 0;
                    f.v = r;
                    f.n = o[1];
                  } else if (p < d && (i = n < 3 || o[0] > r || r > d)) {
                    o[4] = n;
                    o[5] = r;
                    f.n = d;
                    a = 0;
                  }
                }
              }
              if (i || n > 1) {
                return s;
              }
              h = true;
              throw r;
            }
            return function (i, c, d) {
              if (u > 1) {
                throw TypeError("Generator is already running");
              }
              if (h && c === 1) {
                p(c, d);
              }
              a = c;
              l = d;
              while ((e = a < 2 ? t : l) || !h) {
                if (!o) {
                  if (a) {
                    if (a < 3) {
                      if (a > 1) {
                        f.n = -1;
                      }
                      p(a, l);
                    } else {
                      f.n = l;
                    }
                  } else {
                    f.v = l;
                  }
                }
                try {
                  u = 2;
                  if (o) {
                    if (!a) {
                      i = "next";
                    }
                    if (e = o[i]) {
                      if (!(e = e.call(o, l))) {
                        throw TypeError("iterator result is not an object");
                      }
                      if (!e.done) {
                        return e;
                      }
                      l = e.value;
                      if (a < 2) {
                        a = 0;
                      }
                    } else {
                      if (a === 1 && (e = o.return)) {
                        e.call(o);
                      }
                      if (a < 2) {
                        l = TypeError("The iterator does not provide a '" + i + "' method");
                        a = 1;
                      }
                    }
                    o = t;
                  } else if ((e = (h = f.n < 0) ? l : n.call(r, f)) !== s) {
                    break;
                  }
                } catch (e) {
                  o = t;
                  a = 1;
                  l = e;
                } finally {
                  u = 1;
                }
              }
              return {
                value: e,
                done: h
              };
            };
          }(n, i, o), true);
          return u;
        }
        var s = {};
        function a() {}
        function l() {}
        function u() {}
        e = Object.getPrototypeOf;
        var c = [][r] ? e(e([][r]())) : (Iu(e = {}, r, function () {
          return this;
        }), e);
        var h = u.prototype = a.prototype = Object.create(c);
        function f(t) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(t, u);
          } else {
            t.__proto__ = u;
            Iu(t, i, "GeneratorFunction");
          }
          t.prototype = Object.create(h);
          return t;
        }
        l.prototype = u;
        Iu(h, "constructor", u);
        Iu(u, "constructor", l);
        l.displayName = "GeneratorFunction";
        Iu(u, i, "GeneratorFunction");
        Iu(h);
        Iu(h, i, "Generator");
        Iu(h, r, function () {
          return this;
        });
        Iu(h, "toString", function () {
          return "[object Generator]";
        });
        return (Du = function () {
          return {
            w: o,
            m: f
          };
        })();
      }
      function Iu(t, e, n, r) {
        var i = Object.defineProperty;
        try {
          i({}, "", {});
        } catch (t) {
          i = 0;
        }
        Iu = function (t, e, n, r) {
          function o(e, n) {
            Iu(t, e, function (t) {
              return this._invoke(e, n, t);
            });
          }
          if (e) {
            if (i) {
              i(t, e, {
                value: n,
                enumerable: !r,
                configurable: !r,
                writable: !r
              });
            } else {
              t[e] = n;
            }
          } else {
            o("next", 0);
            o("throw", 1);
            o("return", 2);
          }
        };
        Iu(t, e, n, r);
      }
      function ku(t, e, n, r, i, o, s) {
        try {
          var a = t[o](s);
          var l = a.value;
        } catch (t) {
          n(t);
          return;
        }
        if (a.done) {
          e(l);
        } else {
          Promise.resolve(l).then(r, i);
        }
      }
      function ju(t) {
        return function () {
          var e = this;
          var n = arguments;
          return new Promise(function (r, i) {
            var o = t.apply(e, n);
            function s(t) {
              ku(o, r, i, s, a, "next", t);
            }
            function a(t) {
              ku(o, r, i, s, a, "throw", t);
            }
            s(undefined);
          });
        };
      }
      function Nu(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          r.enumerable = r.enumerable || false;
          r.configurable = true;
          if ("value" in r) {
            r.writable = true;
          }
          Object.defineProperty(t, Wu(r.key), r);
        }
      }
      function zu(t, e, n) {
        e = Fu(e);
        return function (t, e) {
          if (e && (Lu(e) == "object" || typeof e == "function")) {
            return e;
          }
          if (e !== undefined) {
            throw new TypeError("Derived constructors may only return object or undefined");
          }
          return function (t) {
            if (t === undefined) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return t;
          }(t);
        }(t, Uu() ? Reflect.construct(e, n || [], Fu(t).constructor) : e.apply(t, n));
      }
      function Uu() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (Uu = function () {
          return !!t;
        })();
      }
      function Fu(t) {
        Fu = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        };
        return Fu(t);
      }
      function Bu(t, e) {
        Bu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
          t.__proto__ = e;
          return t;
        };
        return Bu(t, e);
      }
      function Hu(t, e, n) {
        if ((e = Wu(e)) in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }
      function Wu(t) {
        var e = function (t, e) {
          if (Lu(t) != "object" || !t) {
            return t;
          }
          var n = t[Symbol.toPrimitive];
          if (n !== undefined) {
            var r = n.call(t, e || "default");
            if (Lu(r) != "object") {
              return r;
            }
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (e === "string" ? String : Number)(t);
        }(t, "string");
        if (Lu(e) == "symbol") {
          return e;
        } else {
          return e + "";
        }
      }
      var Vu = function (t) {
        function e(t, n) {
          var r;
          (function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError("Cannot call a class as a function");
            }
          })(this, e);
          Hu(r = zu(this, e, [t, n]), "openLegals", function () {
            r.legalsOpened = true;
            r.legals.classList.add("fps-visible");
            r.legals.addEventListener("mouseleave", r.closeLegals);
            window.addEventListener("click", r.checkClickOutsideLegals);
          });
          Hu(r, "closeLegals", function () {
            r.legalsOpened = false;
            r.updateHoverState();
            r.legals.classList.remove("fps-visible");
            r.legals.removeEventListener("mouseleave", r.closeLegals);
            window.removeEventListener("click", r.checkClickOutsideLegals);
          });
          Hu(r, "checkClickOutsideLegals", function (t) {
            if (!t.composedPath().includes(r.legals) && !t.composedPath().includes(r.legalsBtn)) {
              r.closeLegals();
            }
          });
          Hu(r, "onScroll", function (t) {
            var e;
            if (r.opened && Math.abs(t.deltaY) > 8) {
              if ((e = document.querySelector("omega-header button[data-role=\"close-main-menu\"]")) !== null && e !== undefined) {
                e.click();
              }
            }
            if (!r.headerHidden && t.deltaY > 10) {
              r.headerHidden = true;
              r.isHovered = false;
              r.closeLegals();
              r.element.classList.add("fps-header-hidden");
            } else if (r.headerHidden && t.deltaY < -10) {
              r.headerHidden = false;
              r.element.classList.remove("fps-header-hidden");
            }
          });
          Hu(r, "onMenuOpened", function () {
            r.opened = true;
          });
          Hu(r, "onMenuClosed", function () {
            r.opened = false;
          });
          Hu(r, "onHoverMenuBtn", function () {
            r.isHovered = true;
            r.updateHoverState();
          });
          Hu(r, "onBlurMenuBtn", function () {
            r.isHovered = false;
            r.updateHoverState();
          });
          Hu(r, "updateHoverState", function () {
            r.element.classList.toggle("fps-hovered", r.isHovered || r.legalsOpened);
          });
          r.headerLeft = r.element.querySelector(".fps-header-left");
          r.logoBtn = r.element.querySelector(".fps-logo-link");
          r.legals = document.querySelector("omega-legal");
          r.opened = false;
          r.headerHidden = false;
          r.isHovered = false;
          r.legalsOpened = false;
          return r;
        }
        (function (t, e) {
          if (typeof e != "function" && e !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }
          t.prototype = Object.create(e && e.prototype, {
            constructor: {
              value: t,
              writable: true,
              configurable: true
            }
          });
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          if (e) {
            Bu(t, e);
          }
        })(e, t);
        return function (t, e, n) {
          if (e) {
            Nu(t.prototype, e);
          }
          if (n) {
            Nu(t, n);
          }
          Object.defineProperty(t, "prototype", {
            writable: false
          });
          return t;
        }(e, [{
          key: "attach",
          value: (r = ju(Du().m(function t() {
            return Du().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    window.addEventListener("wheel", this.onScroll);
                    this.headerLeft.addEventListener("mouseenter", this.onHoverMenuBtn);
                    this.logoBtn.addEventListener("mouseenter", this.onHoverMenuBtn);
                    this.element.addEventListener("mouseleave", this.onBlurMenuBtn);
                    document.addEventListener("main_menu_opened", this.onMenuOpened);
                    document.addEventListener("main_menu_closed", this.onMenuClosed);
                  case 1:
                    return t.a(2);
                }
              }
            }, t, this);
          })), function () {
            return r.apply(this, arguments);
          })
        }, {
          key: "detach",
          value: (n = ju(Du().m(function t() {
            return Du().w(function (t) {
              while (true) {
                switch (t.n) {
                  case 0:
                    window.removeEventListener("wheel", this.onScroll);
                    this.headerLeft.removeEventListener("mouseenter", this.onHoverMenuBtn);
                    this.logoBtn.removeEventListener("mouseenter", this.onHoverMenuBtn);
                    this.element.removeEventListener("mouseleave", this.onBlurMenuBtn);
                    document.removeEventListener("main_menu_opened", this.onMenuOpened);
                    document.removeEventListener("main_menu_closed", this.onMenuClosed);
                  case 1:
                    return t.a(2);
                }
              }
            }, t, this);
          })), function () {
            return n.apply(this, arguments);
          })
        }]);
        var n;
        var r;
      }(ss.p);
      var Gu = n(980);
      var qu = new os.LM();
      qu.add({
        addClass: false,
        name: "mobile"
      });
      qu.add({
        addClass: false,
        name: "tablet",
        media: "(min-width: 767px)"
      });
      qu.add({
        addClass: false,
        name: "desktop",
        media: "(min-width: 1023px)"
      });
      qu.add({
        addClass: false,
        name: "large",
        media: "(min-width: 1439px)"
      });
      qu.add({
        addClass: false,
        name: "xlarge",
        media: "(min-width: 1059px)"
      });
      var Xu = new os.XF();
      var Yu = {
        viewport: qu,
        components: Xu
      };
      Xu.creator = function (t, e) {
        return new t(e, Yu);
      };
      Xu.register(r);
      Xu.setup();
      document.addEventListener("DOMContentLoaded", function () {
        return Gu.x.init(false);
      });
      f.os.registerPlugin(_n);
      f.os.registerPlugin(Xn);
      f.os.registerPlugin(is);
      f.os.registerPlugin(jo);
      f.os.registerPlugin(Vr);
      f.os.config({
        force3D: true
      });
    },
