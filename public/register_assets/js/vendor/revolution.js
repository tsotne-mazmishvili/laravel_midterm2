(function(b) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], b)
    } else {
        b(jQuery)
    }
}(function(ac) {
    var S = "left",
        T = "right",
        ad = "up",
        G = "down",
        af = "in",
        E = "out",
        V = "none",
        L = "auto",
        W = "swipe",
        K = "pinch",
        R = "tap",
        Y = "doubletap",
        ag = "longtap",
        F = "hold",
        M = "horizontal",
        J = "vertical",
        Z = "all",
        O = 10,
        ab = "start",
        X = "move",
        aa = "end",
        Q = "cancel",
        ah = "ontouchstart" in window,
        I = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        ae = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        P = "TouchSwipe";
    var U = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe"
    };
    ac.fn.swipe = function(a) {
        var b = ac(this),
            c = b.data(P);
        if (c && typeof a === "string") {
            if (c[a]) {
                return c[a].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                ac.error("Method " + a + " does not exist on jQuery.swipe")
            }
        } else {
            if (!c && (typeof a === "object" || !a)) {
                return H.apply(this, arguments)
            }
        }
        return b
    };
    ac.fn.swipe.defaults = U;
    ac.fn.swipe.phases = {
        PHASE_START: ab,
        PHASE_MOVE: X,
        PHASE_END: aa,
        PHASE_CANCEL: Q
    };
    ac.fn.swipe.directions = {
        LEFT: S,
        RIGHT: T,
        UP: ad,
        DOWN: G,
        IN: af,
        OUT: E
    };
    ac.fn.swipe.pageScroll = {
        NONE: V,
        HORIZONTAL: M,
        VERTICAL: J,
        AUTO: L
    };
    ac.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: Z
    };

    function H(a) {
        if (a && (a.allowPageScroll === undefined && (a.swipe !== undefined || a.swipeStatus !== undefined))) {
            a.allowPageScroll = V
        }
        if (a.click !== undefined && a.tap === undefined) {
            a.tap = a.click
        }
        if (!a) {
            a = {}
        }
        a = ac.extend({}, ac.fn.swipe.defaults, a);
        return this.each(function() {
            var b = ac(this);
            var c = b.data(P);
            if (!c) {
                c = new N(this, a);
                b.data(P, c)
            }
        })
    }

    function N(bT, D) {
        var v = (ah || ae || !D.fallbackToMouseEvents),
            t = v ? (ae ? (I ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
            x = v ? (ae ? (I ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
            h = v ? (ae ? (I ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
            j = v ? null : "mouseleave",
            bK = (ae ? (I ? "MSPointerCancel" : "pointercancel") : "touchcancel");
        var bh = 0,
            by = null,
            bm = 0,
            bW = 0,
            bo = 0,
            y = 1,
            ay = 0,
            bE = 0,
            q = null;
        var bw = ac(bT);
        var b = "start";
        var f = 0;
        var bx = null;
        var i = 0,
            bV = 0,
            bS = 0,
            bk = 0,
            p = 0;
        var br = null,
            bi = null;
        try {
            bw.bind(t, bA);
            bw.bind(bK, bO)
        } catch (bd) {
            ac.error("events not supported " + t + "," + bK + " on jQuery.swipe")
        }
        this.enable = function() {
            bw.bind(t, bA);
            bw.bind(bK, bO);
            return bw
        };
        this.disable = function() {
            bD();
            return bw
        };
        this.destroy = function() {
            bD();
            bw.data(P, null);
            return bw
        };
        this.option = function(ai, aj) {
            if (D[ai] !== undefined) {
                if (aj === undefined) {
                    return D[ai]
                } else {
                    D[ai] = aj
                }
            } else {
                ac.error("Option " + ai + " does not exist on jQuery.swipe.options")
            }
            return null
        };

        function bA(aj) {
            if (bM()) {
                return
            }
            if (ac(aj.target).closest(D.excludedElements, bw).length > 0) {
                return
            }
            var ai = aj.originalEvent ? aj.originalEvent : aj;
            var ak, al = ah ? ai.touches[0] : ai;
            b = ab;
            if (ah) {
                f = ai.touches.length
            } else {
                aj.preventDefault()
            }
            bh = 0;
            by = null;
            bE = null;
            bm = 0;
            bW = 0;
            bo = 0;
            y = 1;
            ay = 0;
            bx = be();
            q = bn();
            k();
            if (!ah || (f === D.fingers || D.fingers === Z) || bq()) {
                bf(0, al);
                i = aw();
                if (f == 2) {
                    bf(1, ai.touches[1]);
                    bW = bo = av(bx[0].start, bx[1].start)
                }
                if (D.swipeStatus || D.pinchStatus) {
                    ak = o(ai, b)
                }
            } else {
                ak = false
            }
            if (ak === false) {
                b = Q;
                o(ai, b);
                return ak
            } else {
                if (D.hold) {
                    bi = setTimeout(ac.proxy(function() {
                        bw.trigger("hold", [ai.target]);
                        if (D.hold) {
                            ak = D.hold.call(bw, ai, ai.target)
                        }
                    }, this), D.longTapThreshold)
                }
                a0(true)
            }
            return null
        }

        function bU(al) {
            var ai = al.originalEvent ? al.originalEvent : al;
            if (b === aa || b === Q || bb()) {
                return
            }
            var am, an = ah ? ai.touches[0] : ai;
            var ak = bG(an);
            bV = aw();
            if (ah) {
                f = ai.touches.length
            }
            if (D.hold) {
                clearTimeout(bi)
            }
            b = X;
            if (f == 2) {
                if (bW == 0) {
                    bf(1, ai.touches[1]);
                    bW = bo = av(bx[0].start, bx[1].start)
                } else {
                    bG(ai.touches[1]);
                    bo = av(bx[0].end, bx[1].end);
                    bE = ax(bx[0].end, bx[1].end)
                }
                y = bQ(bW, bo);
                ay = Math.abs(bW - bo)
            }
            if ((f === D.fingers || D.fingers === Z) || !ah || bq()) {
                by = bC(ak.start, ak.end);
                bc(al, by);
                bh = bv(ak.start, ak.end);
                bm = bB();
                bF(by, bh);
                if (D.swipeStatus || D.pinchStatus) {
                    am = o(ai, b)
                }
                if (!D.triggerOnTouchEnd || D.triggerOnTouchLeave) {
                    var ao = true;
                    if (D.triggerOnTouchLeave) {
                        var aj = bp(this);
                        ao = C(ak.end, aj)
                    }
                    if (!D.triggerOnTouchEnd && ao) {
                        b = bL(X)
                    } else {
                        if (D.triggerOnTouchLeave && !ao) {
                            b = bL(aa)
                        }
                    }
                    if (b == Q || b == aa) {
                        o(ai, b)
                    }
                }
            } else {
                b = Q;
                o(ai, b)
            }
            if (am === false) {
                b = Q;
                o(ai, b)
            }
        }

        function r(aj) {
            var ai = aj.originalEvent;
            if (ah) {
                if (ai.touches.length > 0) {
                    B();
                    return true
                }
            }
            if (bb()) {
                f = bk
            }
            bV = aw();
            bm = bB();
            if (n() || !ba()) {
                b = Q;
                o(ai, b)
            } else {
                if (D.triggerOnTouchEnd || (D.triggerOnTouchEnd == false && b === X)) {
                    aj.preventDefault();
                    b = aa;
                    o(ai, b)
                } else {
                    if (!D.triggerOnTouchEnd && bR()) {
                        b = aa;
                        bI(ai, b, R)
                    } else {
                        if (b === X) {
                            b = Q;
                            o(ai, b)
                        }
                    }
                }
            }
            a0(false);
            return null
        }

        function bO() {
            f = 0;
            bV = 0;
            i = 0;
            bW = 0;
            bo = 0;
            y = 1;
            k();
            a0(false)
        }

        function s(aj) {
            var ai = aj.originalEvent;
            if (D.triggerOnTouchLeave) {
                b = bL(aa);
                o(ai, b)
            }
        }

        function bD() {
            bw.unbind(t, bA);
            bw.unbind(bK, bO);
            bw.unbind(x, bU);
            bw.unbind(h, r);
            if (j) {
                bw.unbind(j, s)
            }
            a0(false)
        }

        function bL(ai) {
            var aj = ai;
            var ak = bN();
            var al = ba();
            var am = n();
            if (!ak || am) {
                aj = Q
            } else {
                if (al && ai == X && (!D.triggerOnTouchEnd || D.triggerOnTouchLeave)) {
                    aj = aa
                } else {
                    if (!al && ai == aa && D.triggerOnTouchLeave) {
                        aj = Q
                    }
                }
            }
            return aj
        }

        function o(ai, ak) {
            var aj = undefined;
            if (u() || g()) {
                aj = bI(ai, ak, W)
            } else {
                if ((m() || bq()) && aj !== false) {
                    aj = bI(ai, ak, K)
                }
            }
            if (bH() && aj !== false) {
                aj = bI(ai, ak, Y)
            } else {
                if (az() && aj !== false) {
                    aj = bI(ai, ak, ag)
                } else {
                    if (bg() && aj !== false) {
                        aj = bI(ai, ak, R)
                    }
                }
            }
            if (ak === Q) {
                bO(ai)
            }
            if (ak === aa) {
                if (ah) {
                    if (ai.touches.length == 0) {
                        bO(ai)
                    }
                } else {
                    bO(ai)
                }
            }
            return aj
        }

        function bI(ai, al, aj) {
            var ak = undefined;
            if (aj == W) {
                bw.trigger("swipeStatus", [al, by || null, bh || 0, bm || 0, f, bx]);
                if (D.swipeStatus) {
                    ak = D.swipeStatus.call(bw, ai, al, by || null, bh || 0, bm || 0, f, bx);
                    if (ak === false) {
                        return false
                    }
                }
                if (al == aa && bs()) {
                    bw.trigger("swipe", [by, bh, bm, f, bx]);
                    if (D.swipe) {
                        ak = D.swipe.call(bw, ai, by, bh, bm, f, bx);
                        if (ak === false) {
                            return false
                        }
                    }
                    switch (by) {
                        case S:
                            bw.trigger("swipeLeft", [by, bh, bm, f, bx]);
                            if (D.swipeLeft) {
                                ak = D.swipeLeft.call(bw, ai, by, bh, bm, f, bx)
                            }
                            break;
                        case T:
                            bw.trigger("swipeRight", [by, bh, bm, f, bx]);
                            if (D.swipeRight) {
                                ak = D.swipeRight.call(bw, ai, by, bh, bm, f, bx)
                            }
                            break;
                        case ad:
                            bw.trigger("swipeUp", [by, bh, bm, f, bx]);
                            if (D.swipeUp) {
                                ak = D.swipeUp.call(bw, ai, by, bh, bm, f, bx)
                            }
                            break;
                        case G:
                            bw.trigger("swipeDown", [by, bh, bm, f, bx]);
                            if (D.swipeDown) {
                                ak = D.swipeDown.call(bw, ai, by, bh, bm, f, bx)
                            }
                            break
                    }
                }
            }
            if (aj == K) {
                bw.trigger("pinchStatus", [al, bE || null, ay || 0, bm || 0, f, y, bx]);
                if (D.pinchStatus) {
                    ak = D.pinchStatus.call(bw, ai, al, bE || null, ay || 0, bm || 0, f, y, bx);
                    if (ak === false) {
                        return false
                    }
                }
                if (al == aa && bP()) {
                    switch (bE) {
                        case af:
                            bw.trigger("pinchIn", [bE || null, ay || 0, bm || 0, f, y, bx]);
                            if (D.pinchIn) {
                                ak = D.pinchIn.call(bw, ai, bE || null, ay || 0, bm || 0, f, y, bx)
                            }
                            break;
                        case E:
                            bw.trigger("pinchOut", [bE || null, ay || 0, bm || 0, f, y, bx]);
                            if (D.pinchOut) {
                                ak = D.pinchOut.call(bw, ai, bE || null, ay || 0, bm || 0, f, y, bx)
                            }
                            break
                    }
                }
            }
            if (aj == R) {
                if (al === Q || al === aa) {
                    clearTimeout(br);
                    clearTimeout(bi);
                    if (c() && !w()) {
                        p = aw();
                        br = setTimeout(ac.proxy(function() {
                            p = null;
                            bw.trigger("tap", [ai.target]);
                            if (D.tap) {
                                ak = D.tap.call(bw, ai, ai.target)
                            }
                        }, this), D.doubleTapThreshold)
                    } else {
                        p = null;
                        bw.trigger("tap", [ai.target]);
                        if (D.tap) {
                            ak = D.tap.call(bw, ai, ai.target)
                        }
                    }
                }
            } else {
                if (aj == Y) {
                    if (al === Q || al === aa) {
                        clearTimeout(br);
                        p = null;
                        bw.trigger("doubletap", [ai.target]);
                        if (D.doubleTap) {
                            ak = D.doubleTap.call(bw, ai, ai.target)
                        }
                    }
                } else {
                    if (aj == ag) {
                        if (al === Q || al === aa) {
                            clearTimeout(br);
                            p = null;
                            bw.trigger("longtap", [ai.target]);
                            if (D.longTap) {
                                ak = D.longTap.call(bw, ai, ai.target)
                            }
                        }
                    }
                }
            }
            return ak
        }

        function ba() {
            var ai = true;
            if (D.threshold !== null) {
                ai = bh >= D.threshold
            }
            return ai
        }

        function n() {
            var ai = false;
            if (D.cancelThreshold !== null && by !== null) {
                ai = (bu(by) - bh) >= D.cancelThreshold
            }
            return ai
        }

        function bj() {
            if (D.pinchThreshold !== null) {
                return ay >= D.pinchThreshold
            }
            return true
        }

        function bN() {
            var ai;
            if (D.maxTimeThreshold) {
                if (bm >= D.maxTimeThreshold) {
                    ai = false
                } else {
                    ai = true
                }
            } else {
                ai = true
            }
            return ai
        }

        function bc(ak, aj) {
            if (D.allowPageScroll === V || bq()) {
                ak.preventDefault()
            } else {
                var ai = D.allowPageScroll === L;
                switch (aj) {
                    case S:
                        if ((D.swipeLeft && ai) || (!ai && D.allowPageScroll != M)) {
                            ak.preventDefault()
                        }
                        break;
                    case T:
                        if ((D.swipeRight && ai) || (!ai && D.allowPageScroll != M)) {
                            ak.preventDefault()
                        }
                        break;
                    case ad:
                        if ((D.swipeUp && ai) || (!ai && D.allowPageScroll != J)) {
                            ak.preventDefault()
                        }
                        break;
                    case G:
                        if ((D.swipeDown && ai) || (!ai && D.allowPageScroll != J)) {
                            ak.preventDefault()
                        }
                        break
                }
            }
        }

        function bP() {
            var aj = bz();
            var ak = d();
            var ai = bj();
            return aj && ak && ai
        }

        function bq() {
            return !!(D.pinchStatus || D.pinchIn || D.pinchOut)
        }

        function m() {
            return !!(bP() && bq())
        }

        function bs() {
            var ak = bN();
            var ai = ba();
            var al = bz();
            var an = d();
            var am = n();
            var aj = !am && an && al && ai && ak;
            return aj
        }

        function g() {
            return !!(D.swipe || D.swipeStatus || D.swipeLeft || D.swipeRight || D.swipeUp || D.swipeDown)
        }

        function u() {
            return !!(bs() && g())
        }

        function bz() {
            return ((f === D.fingers || D.fingers === Z) || !ah)
        }

        function d() {
            return bx[0].end.x !== 0
        }

        function bR() {
            return !!(D.tap)
        }

        function c() {
            return !!(D.doubleTap)
        }

        function bt() {
            return !!(D.longTap)
        }

        function l() {
            if (p == null) {
                return false
            }
            var ai = aw();
            return (c() && ((ai - p) <= D.doubleTapThreshold))
        }

        function w() {
            return l()
        }

        function z() {
            return ((f === 1 || !ah) && (isNaN(bh) || bh < D.threshold))
        }

        function a() {
            return ((bm > D.longTapThreshold) && (bh < O))
        }

        function bg() {
            return !!(z() && bR())
        }

        function bH() {
            return !!(l() && c())
        }

        function az() {
            return !!(a() && bt())
        }

        function B() {
            bS = aw();
            bk = event.touches.length + 1
        }

        function k() {
            bS = 0;
            bk = 0
        }

        function bb() {
            var aj = false;
            if (bS) {
                var ai = aw() - bS;
                if (ai <= D.fingerReleaseThreshold) {
                    aj = true
                }
            }
            return aj
        }

        function bM() {
            return !!(bw.data(P + "_intouch") === true)
        }

        function a0(ai) {
            if (ai === true) {
                bw.bind(x, bU);
                bw.bind(h, r);
                if (j) {
                    bw.bind(j, s)
                }
            } else {
                bw.unbind(x, bU, false);
                bw.unbind(h, r, false);
                if (j) {
                    bw.unbind(j, s, false)
                }
            }
            bw.data(P + "_intouch", ai === true)
        }

        function bf(aj, ak) {
            var ai = ak.identifier !== undefined ? ak.identifier : 0;
            bx[aj].identifier = ai;
            bx[aj].start.x = bx[aj].end.x = ak.pageX || ak.clientX;
            bx[aj].start.y = bx[aj].end.y = ak.pageY || ak.clientY;
            return bx[aj]
        }

        function bG(ak) {
            var ai = ak.identifier !== undefined ? ak.identifier : 0;
            var aj = bl(ai);
            aj.end.x = ak.pageX || ak.clientX;
            aj.end.y = ak.pageY || ak.clientY;
            return aj
        }

        function bl(ai) {
            for (var aj = 0; aj < bx.length; aj++) {
                if (bx[aj].identifier == ai) {
                    return bx[aj]
                }
            }
        }

        function be() {
            var aj = [];
            for (var ai = 0; ai <= 5; ai++) {
                aj.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return aj
        }

        function bF(aj, ai) {
            ai = Math.max(ai, bu(aj));
            q[aj].distance = ai
        }

        function bu(ai) {
            if (q[ai]) {
                return q[ai].distance
            }
            return undefined
        }

        function bn() {
            var ai = {};
            ai[S] = A(S);
            ai[T] = A(T);
            ai[ad] = A(ad);
            ai[G] = A(G);
            return ai
        }

        function A(ai) {
            return {
                direction: ai,
                distance: 0
            }
        }

        function bB() {
            return bV - i
        }

        function av(ai, aj) {
            var ak = Math.abs(ai.x - aj.x);
            var al = Math.abs(ai.y - aj.y);
            return Math.round(Math.sqrt(ak * ak + al * al))
        }

        function bQ(ak, aj) {
            var ai = (aj / ak) * 1;
            return ai.toFixed(2)
        }

        function ax() {
            if (y < 1) {
                return E
            } else {
                return af
            }
        }

        function bv(ai, aj) {
            return Math.round(Math.sqrt(Math.pow(aj.x - ai.x, 2) + Math.pow(aj.y - ai.y, 2)))
        }

        function bJ(ak, am) {
            var an = ak.x - am.x;
            var ai = am.y - ak.y;
            var al = Math.atan2(ai, an);
            var aj = Math.round(al * 180 / Math.PI);
            if (aj < 0) {
                aj = 360 - Math.abs(aj)
            }
            return aj
        }

        function bC(aj, ak) {
            var ai = bJ(aj, ak);
            if ((ai <= 45) && (ai >= 0)) {
                return S
            } else {
                if ((ai <= 360) && (ai >= 315)) {
                    return S
                } else {
                    if ((ai >= 135) && (ai <= 225)) {
                        return T
                    } else {
                        if ((ai > 45) && (ai < 135)) {
                            return G
                        } else {
                            return ad
                        }
                    }
                }
            }
        }

        function aw() {
            var ai = new Date();
            return ai.getTime()
        }

        function bp(ak) {
            ak = ac(ak);
            var ai = ak.offset();
            var aj = {
                left: ai.left,
                right: ai.left + ak.outerWidth(),
                top: ai.top,
                bottom: ai.top + ak.outerHeight()
            };
            return aj
        }

        function C(aj, ai) {
            return (aj.x > ai.left && aj.x < ai.right && aj.y > ai.top && aj.y < ai.bottom)
        }
    }
}));
if (typeof(console) === "undefined") {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function() {}
}
if (window.tplogs == true) {
    try {
        console.groupCollapsed("ThemePunch GreenSocks Logs")
    } catch (e) {}
}
var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;
var punchgs = window.GreenSockGlobals = {};
if (window.tplogs == true) {
    try {
        console.info("Build GreenSock SandBox for ThemePunch Plugins");
        console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin")
    } catch (e) {}
    /*!
     * VERSION: 1.14.2
     * DATE: 2014-10-28
     * UPDATES AND DOCS AT: http://www.greensock.com
     *
     * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
     * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
     * Club GreenSock members, the software agreement that was issued with your membership.
     *
     * @author: Jack Doyle, jack@greensock.com
     */
}(function(aA, aP) {
    var aL = aA.GreenSockGlobals = aA.GreenSockGlobals || aA;
    if (!aL.TweenLite) {
        var aB, aC, aG, aT, aF, aI = function(a) {
                var d, b = a.split("."),
                    c = aL;
                for (d = 0; b.length > d; d++) {
                    c[b[d]] = c = c[b[d]] || {}
                }
                return c
            },
            aM = aI("com.greensock"),
            aU = 1e-10,
            az = function(b) {
                var d, a = [],
                    c = b.length;
                for (d = 0; d !== c; a.push(b[d++])) {}
                return a
            },
            aH = function() {},
            aO = function() {
                var a = Object.prototype.toString,
                    b = a.call([]);
                return function(c) {
                    return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                }
            }(),
            aR = {},
            aE = function(c, d, g, b) {
                this.sc = aR[c] ? aR[c].sc : [], aR[c] = this, this.gsClass = null, this.func = g;
                var f = [];
                this.check = function(l) {
                    for (var k, j, a, n, o = d.length, i = o; --o > -1;) {
                        (k = aR[d[o]] || new aE(d[o], [])).gsClass ? (f[o] = k.gsClass, i--) : l && k.sc.push(this)
                    }
                    if (0 === i && g) {
                        for (j = ("com.greensock." + c).split("."), a = j.pop(), n = aI(j.join("."))[a] = this.gsClass = g.apply(g, f), b && (aL[a] = n, "function" == typeof define && define.amd ? define((aA.GreenSockAMDPath ? aA.GreenSockAMDPath + "/" : "") + c.split(".").pop(), [], function() {
                                return n
                            }) : c === aP && "undefined" != typeof module && module.exports && (module.exports = n)), o = 0; this.sc.length > o; o++) {
                            this.sc[o].check()
                        }
                    }
                }, this.check(!0)
            },
            aQ = aA._gsDefine = function(b, d, a, c) {
                return new aE(b, d, a, c)
            },
            ay = aM._class = function(b, c, a) {
                return c = c || function() {}, aQ(b, [], function() {
                    return c
                }, a), c
            };
        aQ.globals = aL;
        var aN = [0, 0, 1, 1],
            Y = [],
            av = ay("easing.Ease", function(b, d, a, c) {
                this._func = b, this._type = a || 0, this._power = c || 0, this._params = d ? aN.concat(d) : aN
            }, !0),
            ax = av.map = {},
            ac = av.register = function(p, h, g, q) {
                for (var b, d, j, c, f = h.split(","), k = f.length, m = (g || "easeIn,easeOut,easeInOut").split(","); --k > -1;) {
                    for (d = f[k], b = q ? ay("easing." + d, null, !0) : aM.easing[d] || {}, j = m.length; --j > -1;) {
                        c = m[j], ax[d + "." + c] = ax[c + d] = b[c] = p.getRatio ? p : p[c] || new p
                    }
                }
            };
        for (aG = av.prototype, aG._calcEnd = !1, aG.getRatio = function(b) {
                if (this._func) {
                    return this._params[0] = b, this._func.apply(null, this._params)
                }
                var d = this._type,
                    a = this._power,
                    c = 1 === d ? 1 - b : 2 === d ? b : 0.5 > b ? 2 * b : 2 * (1 - b);
                return 1 === a ? c *= c : 2 === a ? c *= c * c : 3 === a ? c *= c * c * c : 4 === a && (c *= c * c * c * c), 1 === d ? 1 - c : 2 === d ? c : 0.5 > b ? c / 2 : 1 - c / 2
            }, aB = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], aC = aB.length; --aC > -1;) {
            aG = aB[aC] + ",Power" + aC, ac(new av(null, null, 1, aC), aG, "easeOut", !0), ac(new av(null, null, 2, aC), aG, "easeIn" + (0 === aC ? ",easeNone" : "")), ac(new av(null, null, 3, aC), aG, "easeInOut")
        }
        ax.linear = aM.easing.Linear.easeIn, ax.swing = aM.easing.Quad.easeInOut;
        var aS = ay("events.EventDispatcher", function(a) {
            this._listeners = {}, this._eventTarget = a || this
        });
        aG = aS.prototype, aG.addEventListener = function(k, g, d, m, a) {
            a = a || 0;
            var b, c, f = this._listeners[k],
                j = 0;
            for (null == f && (this._listeners[k] = f = []), c = f.length; --c > -1;) {
                b = f[c], b.c === g && b.s === d ? f.splice(c, 1) : 0 === j && a > b.pr && (j = c + 1)
            }
            f.splice(j, 0, {
                c: g,
                s: d,
                up: m,
                pr: a
            }), this !== aT || aF || aT.wake()
        }, aG.removeEventListener = function(b, d) {
            var a, c = this._listeners[b];
            if (c) {
                for (a = c.length; --a > -1;) {
                    if (c[a].c === d) {
                        return c.splice(a, 1), void 0
                    }
                }
            }
        }, aG.dispatchEvent = function(b) {
            var f, a, c, d = this._listeners[b];
            if (d) {
                for (f = d.length, a = this._eventTarget; --f > -1;) {
                    c = d[f], c && (c.up ? c.c.call(c.s || a, {
                        type: b,
                        target: a
                    }) : c.c.call(c.s || a))
                }
            }
        };
        var aJ = aA.requestAnimationFrame,
            ar = aA.cancelAnimationFrame,
            Z = Date.now || function() {
                return (new Date).getTime()
            },
            aw = Z();
        for (aB = ["ms", "moz", "webkit", "o"], aC = aB.length; --aC > -1 && !aJ;) {
            aJ = aA[aB[aC] + "RequestAnimationFrame"], ar = aA[aB[aC] + "CancelAnimationFrame"] || aA[aB[aC] + "CancelRequestAnimationFrame"]
        }
        ay("Ticker", function(y, q) {
            var k, z, a, g, j, m = this,
                x = Z(),
                o = q !== !1 && aJ,
                w = 500,
                b = 33,
                v = function(d) {
                    var f, c, h = Z() - aw;
                    h > w && (x += h - b), aw += h, m.time = (aw - x) / 1000, f = m.time - j, (!k || f > 0 || d === !0) && (m.frame++, j += f + (f >= g ? 0.004 : g - f), c = !0), d !== !0 && (a = z(v)), c && m.dispatchEvent("tick")
                };
            aS.call(m), m.time = m.frame = 0, m.tick = function() {
                v(!0)
            }, m.lagSmoothing = function(c, d) {
                w = c || 1 / aU, b = Math.min(d, w, 0)
            }, m.sleep = function() {
                null != a && (o && ar ? ar(a) : clearTimeout(a), z = aH, a = null, m === aT && (aF = !1))
            }, m.wake = function() {
                null !== a ? m.sleep() : m.frame > 10 && (aw = Z() - w + 5), z = 0 === k ? aH : o && aJ ? aJ : function(c) {
                    return setTimeout(c, 0 | 1000 * (j - m.time) + 1)
                }, m === aT && (aF = !0), v(2)
            }, m.fps = function(c) {
                return arguments.length ? (k = c, g = 1 / (k || 60), j = this.time + g, m.wake(), void 0) : k
            }, m.useRAF = function(c) {
                return arguments.length ? (m.sleep(), o = c, m.fps(k), void 0) : o
            }, m.fps(y), setTimeout(function() {
                o && (!a || 5 > m.frame) && m.useRAF(!1)
            }, 1500)
        }), aG = aM.Ticker.prototype = new aM.events.EventDispatcher, aG.constructor = aM.Ticker;
        var aa = ay("core.Animation", function(b, c) {
            if (this.vars = c = c || {}, this._duration = this._totalDuration = b || 0, this._delay = Number(c.delay) || 0, this._timeScale = 1, this._active = c.immediateRender === !0, this.data = c.data, this._reversed = c.reversed === !0, aq) {
                aF || aT.wake();
                var a = this.vars.useFrames ? aD : aq;
                a.add(this, a._time), this.vars.paused && this.paused(!0)
            }
        });
        aT = aa.ticker = new aM.Ticker, aG = aa.prototype, aG._dirty = aG._gc = aG._initted = aG._paused = !1, aG._totalTime = aG._time = 0, aG._rawPrevTime = -1, aG._next = aG._last = aG._onUpdate = aG._timeline = aG.timeline = null, aG._paused = !1;
        var ap = function() {
            aF && Z() - aw > 2000 && aT.wake(), setTimeout(ap, 2000)
        };
        ap(), aG.play = function(a, b) {
            return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
        }, aG.pause = function(a, b) {
            return null != a && this.seek(a, b), this.paused(!0)
        }, aG.resume = function(a, b) {
            return null != a && this.seek(a, b), this.paused(!1)
        }, aG.seek = function(a, b) {
            return this.totalTime(Number(a), b !== !1)
        }, aG.restart = function(a, b) {
            return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
        }, aG.reverse = function(a, b) {
            return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
        }, aG.render = function() {}, aG.invalidate = function() {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, aG.isActive = function() {
            var b, c = this._timeline,
                a = this._startTime;
            return !c || !this._gc && !this._paused && c.isActive() && (b = c.rawTime()) >= a && a + this.totalDuration() / this._timeScale > b
        }, aG._enabled = function(a, b) {
            return aF || aT.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
        }, aG._kill = function() {
            return this._enabled(!1, !1)
        }, aG.kill = function(a, b) {
            return this._kill(a, b), this
        }, aG._uncache = function(a) {
            for (var b = a ? this : this.timeline; b;) {
                b._dirty = !0, b = b.timeline
            }
            return this
        }, aG._swapSelfInParams = function(b) {
            for (var c = b.length, a = b.concat(); --c > -1;) {
                "{self}" === b[c] && (a[c] = this)
            }
            return a
        }, aG.eventCallback = function(b, f, a, c) {
            if ("on" === (b || "").substr(0, 2)) {
                var d = this.vars;
                if (1 === arguments.length) {
                    return d[b]
                }
                null == f ? delete d[b] : (d[b] = f, d[b + "Params"] = aO(a) && -1 !== a.join("").indexOf("{self}") ? this._swapSelfInParams(a) : a, d[b + "Scope"] = c), "onUpdate" === b && (this._onUpdate = f)
            }
            return this
        }, aG.delay = function(a) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
        }, aG.duration = function(a) {
            return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, aG.totalDuration = function(a) {
            return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
        }, aG.time = function(a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
        }, aG.totalTime = function(b, f, a) {
            if (aF || aT.wake(), !arguments.length) {
                return this._totalTime
            }
            if (this._timeline) {
                if (0 > b && !a && (b += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var c = this._totalDuration,
                        d = this._timeline;
                    if (b > c && !a && (b = c), this._startTime = (this._paused ? this._pauseTime : d._time) - (this._reversed ? c - b : b) / this._timeScale, d._dirty || this._uncache(!1), d._timeline) {
                        for (; d._timeline;) {
                            d._timeline._time !== (d._startTime + d._totalTime) / d._timeScale && d.totalTime(d._totalTime, !0), d = d._timeline
                        }
                    }
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== b || 0 === this._duration) && (this.render(b, f, !1), au.length && af())
            }
            return this
        }, aG.progress = aG.totalProgress = function(a, b) {
            return arguments.length ? this.totalTime(this.duration() * a, b) : this._time / this.duration()
        }, aG.startTime = function(a) {
            return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
        }, aG.endTime = function(a) {
            return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        }, aG.timeScale = function(b) {
            if (!arguments.length) {
                return this._timeScale
            }
            if (b = b || aU, this._timeline && this._timeline.smoothChildTiming) {
                var c = this._pauseTime,
                    a = c || 0 === c ? c : this._timeline.totalTime();
                this._startTime = a - (a - this._startTime) * this._timeScale / b
            }
            return this._timeScale = b, this._uncache(!1)
        }, aG.reversed = function(a) {
            return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, aG.paused = function(b) {
            if (!arguments.length) {
                return this._paused
            }
            if (b != this._paused && this._timeline) {
                aF || b || aT.wake();
                var d = this._timeline,
                    a = d.rawTime(),
                    c = a - this._pauseTime;
                !b && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = b ? a : null, this._paused = b, this._active = this.isActive(), !b && 0 !== c && this._initted && this.duration() && this.render(d.smoothChildTiming ? this._totalTime : (a - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !b && this._enabled(!0, !1), this
        };
        var ao = ay("core.SimpleTimeline", function(a) {
            aa.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        aG = ao.prototype = new aa, aG.constructor = ao, aG.kill()._gc = !1, aG._first = aG._last = aG._recent = null, aG._sortChildren = !1, aG.add = aG.insert = function(b, d) {
            var a, c;
            if (b._startTime = Number(d || 0) + b._delay, b._paused && this !== b._timeline && (b._pauseTime = b._startTime + (this.rawTime() - b._startTime) / b._timeScale), b.timeline && b.timeline._remove(b, !0), b.timeline = b._timeline = this, b._gc && b._enabled(!0, !0), a = this._last, this._sortChildren) {
                for (c = b._startTime; a && a._startTime > c;) {
                    a = a._prev
                }
            }
            return a ? (b._next = a._next, a._next = b) : (b._next = this._first, this._first = b), b._next ? b._next._prev = b : this._last = b, b._prev = a, this._recent = b, this._timeline && this._uncache(!0), this
        }, aG._remove = function(a, b) {
            return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, aG.render = function(b, f, a) {
            var c, d = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = b; d;) {
                c = d._next, (d._active || b >= d._startTime && !d._paused) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (b - d._startTime) * d._timeScale, f, a) : d.render((b - d._startTime) * d._timeScale, f, a)), d = c
            }
        }, aG.rawTime = function() {
            return aF || aT.wake(), this._totalTime
        };
        var aj = ay("TweenLite", function(h, d, f) {
                if (aa.call(this, d, f), this.render = aj.prototype.render, null == h) {
                    throw "Cannot tween a null target."
                }
                this.target = h = "string" != typeof h ? h : aj.selector(h) || h;
                var g, k, c, j = h.jquery || h.length && h !== aA && h[0] && (h[0] === aA || h[0].nodeType && h[0].style && !h.nodeType),
                    b = this.vars.overwrite;
                if (this._overwrite = b = null == b ? ab[aj.defaultOverwrite] : "number" == typeof b ? b >> 0 : ab[b], (j || h instanceof Array || h.push && aO(h)) && "number" != typeof h[0]) {
                    for (this._targets = c = az(h), this._propLookup = [], this._siblings = [], g = 0; c.length > g; g++) {
                        k = c[g], k ? "string" != typeof k ? k.length && k !== aA && k[0] && (k[0] === aA || k[0].nodeType && k[0].style && !k.nodeType) ? (c.splice(g--, 1), this._targets = c = c.concat(az(k))) : (this._siblings[g] = at(k, this, !1), 1 === b && this._siblings[g].length > 1 && ak(k, this, null, 1, this._siblings[g])) : (k = c[g--] = aj.selector(k), "string" == typeof k && c.splice(g + 1, 1)) : c.splice(g--, 1)
                    }
                } else {
                    this._propLookup = {}, this._siblings = at(h, this, !1), 1 === b && this._siblings.length > 1 && ak(h, this, null, 1, this._siblings)
                }(this.vars.immediateRender || 0 === d && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -aU, this.render(-this._delay))
            }, !0),
            an = function(a) {
                return a && a.length && a !== aA && a[0] && (a[0] === aA || a[0].nodeType && a[0].style && !a.nodeType)
            },
            ad = function(b, d) {
                var a, c = {};
                for (a in b) {
                    al[a] || a in d && "transform" !== a && "x" !== a && "y" !== a && "width" !== a && "height" !== a && "className" !== a && "border" !== a || !(!X[a] || X[a] && X[a]._autoCSS) || (c[a] = b[a], delete b[a])
                }
                b.css = c
            };
        aG = aj.prototype = new aa, aG.constructor = aj, aG.kill()._gc = !1, aG.ratio = 0, aG._firstPT = aG._targets = aG._overwrittenProps = aG._startAt = null, aG._notifyPluginsOfEnabled = aG._lazy = !1, aj.version = "1.14.2", aj.defaultEase = aG._ease = new av(null, null, 1, 1), aj.defaultOverwrite = "auto", aj.ticker = aT, aj.autoSleep = !0, aj.lagSmoothing = function(a, b) {
            aT.lagSmoothing(a, b)
        }, aj.selector = aA.$ || aA.jQuery || function(b) {
            var a = aA.$ || aA.jQuery;
            return a ? (aj.selector = a, a(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
        };
        var au = [],
            ag = {},
            ae = aj._internals = {
                isArray: aO,
                isSelector: an,
                lazyTweens: au
            },
            X = aj._plugins = {},
            am = ae.tweenLookup = {},
            aK = 0,
            al = ae.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1
            },
            ab = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            aD = aa._rootFramesTimeline = new ao,
            aq = aa._rootTimeline = new ao,
            af = ae.lazyRender = function() {
                var a, b = au.length;
                for (ag = {}; --b > -1;) {
                    a = au[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1)
                }
                au.length = 0
            };
        aq._startTime = aT.time, aD._startTime = aT.frame, aq._active = aD._active = !0, setTimeout(af, 1), aa._updateRoot = aj.render = function() {
            var b, c, a;
            if (au.length && af(), aq.render((aT.time - aq._startTime) * aq._timeScale, !1, !1), aD.render((aT.frame - aD._startTime) * aD._timeScale, !1, !1), au.length && af(), !(aT.frame % 120)) {
                for (a in am) {
                    for (c = am[a].tweens, b = c.length; --b > -1;) {
                        c[b]._gc && c.splice(b, 1)
                    }
                    0 === c.length && delete am[a]
                }
                if (a = aq._first, (!a || a._paused) && aj.autoSleep && !aD._first && 1 === aT._listeners.tick.length) {
                    for (; a && a._paused;) {
                        a = a._next
                    }
                    a || aT.sleep()
                }
            }
        }, aT.addEventListener("tick", aa._updateRoot);
        var at = function(b, f, a) {
                var c, d, g = b._gsTweenID;
                if (am[g || (b._gsTweenID = g = "t" + aK++)] || (am[g] = {
                        target: b,
                        tweens: []
                    }), f && (c = am[g].tweens, c[d = c.length] = f, a)) {
                    for (; --d > -1;) {
                        c[d] === f && c.splice(d, 1)
                    }
                }
                return am[g].tweens
            },
            ah = function(d, h, c, f) {
                var g, j, b = d.vars.onOverwrite;
                return b && (g = b(d, h, c, f)), b = aj.onOverwrite, b && (j = b(d, h, c, f)), g !== !1 && j !== !1
            },
            ak = function(A, w, p, B, b) {
                var g, y, d, k;
                if (1 === B || B >= 4) {
                    for (k = b.length, g = 0; k > g; g++) {
                        if ((d = b[g]) !== w) {
                            d._gc || ah(d, w) && d._enabled(!1, !1) && (y = !0)
                        } else {
                            if (5 === B) {
                                break
                            }
                        }
                    }
                    return y
                }
                var q, z = w._startTime + aU,
                    j = [],
                    v = 0,
                    x = 0 === w._duration;
                for (g = b.length; --g > -1;) {
                    (d = b[g]) === w || d._gc || d._paused || (d._timeline !== w._timeline ? (q = q || ai(w, 0, x), 0 === ai(d, q, x) && (j[v++] = d)) : z >= d._startTime && d._startTime + d.totalDuration() / d._timeScale > z && ((x || !d._initted) && 2e-10 >= z - d._startTime || (j[v++] = d)))
                }
                for (g = v; --g > -1;) {
                    if (d = j[g], 2 === B && d._kill(p, A, w) && (y = !0), 2 !== B || !d._firstPT && d._initted) {
                        if (2 !== B && !ah(d, w)) {
                            continue
                        }
                        d._enabled(!1, !1) && (y = !0)
                    }
                }
                return y
            },
            ai = function(b, f, a) {
                for (var c = b._timeline, d = c._timeScale, g = b._startTime; c._timeline;) {
                    if (g += c._startTime, d *= c._timeScale, c._paused) {
                        return -100
                    }
                    c = c._timeline
                }
                return g /= d, g > f ? g - f : a && g === f || !b._initted && 2 * aU > g - f ? aU : (g += b.totalDuration() / b._timeScale / d) > f + aU ? 0 : g - f - aU
            };
        aG._init = function() {
            var p, k, g, q, b, d = this.vars,
                m = this._overwrittenProps,
                c = this._duration,
                f = !!d.immediateRender,
                j = d.ease;
            if (d.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), b = {};
                for (q in d.startAt) {
                    b[q] = d.startAt[q]
                }
                if (b.overwrite = !1, b.immediateRender = !0, b.lazy = f && d.lazy !== !1, b.startAt = b.delay = null, this._startAt = aj.to(this.target, 0, b), f) {
                    if (this._time > 0) {
                        this._startAt = null
                    } else {
                        if (0 !== c) {
                            return
                        }
                    }
                }
            } else {
                if (d.runBackwards && 0 !== c) {
                    if (this._startAt) {
                        this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null
                    } else {
                        0 !== this._time && (f = !1), g = {};
                        for (q in d) {
                            al[q] && "autoCSS" !== q || (g[q] = d[q])
                        }
                        if (g.overwrite = 0, g.data = "isFromStart", g.lazy = f && d.lazy !== !1, g.immediateRender = f, this._startAt = aj.to(this.target, 0, g), f) {
                            if (0 === this._time) {
                                return
                            }
                        } else {
                            this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                        }
                    }
                }
            }
            if (this._ease = j = j ? j instanceof av ? j : "function" == typeof j ? new av(j, d.easeParams) : ax[j] || aj.defaultEase : aj.defaultEase, d.easeParams instanceof Array && j.config && (this._ease = j.config.apply(j, d.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) {
                for (p = this._targets.length; --p > -1;) {
                    this._initProps(this._targets[p], this._propLookup[p] = {}, this._siblings[p], m ? m[p] : null) && (k = !0)
                }
            } else {
                k = this._initProps(this.target, this._propLookup, this._siblings, m)
            }
            if (k && aj._onPluginEvent("_onInitAllProps", this), m && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), d.runBackwards) {
                for (g = this._firstPT; g;) {
                    g.s += g.c, g.c = -g.c, g = g._next
                }
            }
            this._onUpdate = d.onUpdate, this._initted = !0
        }, aG._initProps = function(k, g, q, b) {
            var d, m, c, f, j, p;
            if (null == k) {
                return !1
            }
            ag[k._gsTweenID] && af(), this.vars.css || k.style && k !== aA && k.nodeType && X.css && this.vars.autoCSS !== !1 && ad(this.vars, k);
            for (d in this.vars) {
                if (p = this.vars[d], al[d]) {
                    p && (p instanceof Array || p.push && aO(p)) && -1 !== p.join("").indexOf("{self}") && (this.vars[d] = p = this._swapSelfInParams(p, this))
                } else {
                    if (X[d] && (f = new X[d])._onInitTween(k, this.vars[d], this)) {
                        for (this._firstPT = j = {
                                _next: this._firstPT,
                                t: f,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: !0,
                                n: d,
                                pg: !0,
                                pr: f._priority
                            }, m = f._overwriteProps.length; --m > -1;) {
                            g[f._overwriteProps[m]] = this._firstPT
                        }(f._priority || f._onInitAllProps) && (c = !0), (f._onDisable || f._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else {
                        this._firstPT = g[d] = j = {
                            _next: this._firstPT,
                            t: k,
                            p: d,
                            f: "function" == typeof k[d],
                            n: d,
                            pg: !1,
                            pr: 0
                        }, j.s = j.f ? k[d.indexOf("set") || "function" != typeof k["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(k[d]), j.c = "string" == typeof p && "=" === p.charAt(1) ? parseInt(p.charAt(0) + "1", 10) * Number(p.substr(2)) : Number(p) - j.s || 0
                    }
                }
                j && j._next && (j._next._prev = j)
            }
            return b && this._kill(b, k) ? this._initProps(k, g, q, b) : this._overwrite > 1 && this._firstPT && q.length > 1 && ak(k, this, g, this._overwrite, q) ? (this._kill(g, k), this._initProps(k, g, q, b)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (ag[k._gsTweenID] = !0), c)
        }, aG.render = function(y, v, k) {
            var z, b, d, w, c = this._time,
                j = this._duration,
                p = this._rawPrevTime;
            if (y >= j) {
                this._totalTime = this._time = j, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (z = !0, b = "onComplete"), 0 === j && (this._initted || !this.vars.lazy || k) && (this._startTime === this._timeline._duration && (y = 0), (0 === y || 0 > p || p === aU) && p !== y && (k = !0, p > aU && (b = "onReverseComplete")), this._rawPrevTime = w = !v || y || p === y ? y : aU)
            } else {
                if (1e-7 > y) {
                    this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== c || 0 === j && p > 0 && p !== aU) && (b = "onReverseComplete", z = this._reversed), 0 > y && (this._active = !1, 0 === j && (this._initted || !this.vars.lazy || k) && (p >= 0 && (k = !0), this._rawPrevTime = w = !v || y || p === y ? y : aU)), this._initted || (k = !0)
                } else {
                    if (this._totalTime = this._time = y, this._easeType) {
                        var x = y / j,
                            g = this._easeType,
                            q = this._easePower;
                        (1 === g || 3 === g && x >= 0.5) && (x = 1 - x), 3 === g && (x *= 2), 1 === q ? x *= x : 2 === q ? x *= x * x : 3 === q ? x *= x * x * x : 4 === q && (x *= x * x * x * x), this.ratio = 1 === g ? 1 - x : 2 === g ? x : 0.5 > y / j ? x / 2 : 1 - x / 2
                    } else {
                        this.ratio = this._ease.getRatio(y / j)
                    }
                }
            }
            if (this._time !== c || k) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) {
                        return
                    }
                    if (!k && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) {
                        return this._time = this._totalTime = c, this._rawPrevTime = p, au.push(this), this._lazy = [y, v], void 0
                    }
                    this._time && !z ? this.ratio = this._ease.getRatio(this._time / j) : z && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== c && y >= 0 && (this._active = !0), 0 === c && (this._startAt && (y >= 0 ? this._startAt.render(y, v, k) : b || (b = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === j) && (v || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || Y))), d = this._firstPT; d;) {
                    d.f ? d.t[d.p](d.c * this.ratio + d.s) : d.t[d.p] = d.c * this.ratio + d.s, d = d._next
                }
                this._onUpdate && (0 > y && this._startAt && y !== -0.0001 && this._startAt.render(y, v, k), v || (this._time !== c || z) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || Y)), b && (!this._gc || k) && (0 > y && this._startAt && !this._onUpdate && y !== -0.0001 && this._startAt.render(y, v, k), z && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !v && this.vars[b] && this.vars[b].apply(this.vars[b + "Scope"] || this, this.vars[b + "Params"] || Y), 0 === j && this._rawPrevTime === aU && w !== aU && (this._rawPrevTime = 0))
            }
        }, aG._kill = function(v, k, g) {
            if ("all" === v && (v = null), null == v && (null == k || k === this.target)) {
                return this._lazy = !1, this._enabled(!1, !1)
            }
            k = "string" != typeof k ? k || this._targets || this.target : aj.selector(k) || k;
            var w, b, d, m, c, f, j, p, q;
            if ((aO(k) || an(k)) && "number" != typeof k[0]) {
                for (w = k.length; --w > -1;) {
                    this._kill(v, k[w]) && (f = !0)
                }
            } else {
                if (this._targets) {
                    for (w = this._targets.length; --w > -1;) {
                        if (k === this._targets[w]) {
                            c = this._propLookup[w] || {}, this._overwrittenProps = this._overwrittenProps || [], b = this._overwrittenProps[w] = v ? this._overwrittenProps[w] || {} : "all";
                            break
                        }
                    }
                } else {
                    if (k !== this.target) {
                        return !1
                    }
                    c = this._propLookup, b = this._overwrittenProps = v ? this._overwrittenProps || {} : "all"
                }
                if (c) {
                    if (j = v || c, p = v !== b && "all" !== b && v !== c && ("object" != typeof v || !v._tempKill), g && (aj.onOverwrite || this.vars.onOverwrite)) {
                        for (d in j) {
                            c[d] && (q || (q = []), q.push(d))
                        }
                        if (!ah(this, g, k, q)) {
                            return !1
                        }
                    }
                    for (d in j) {
                        (m = c[d]) && (m.pg && m.t._kill(j) && (f = !0), m.pg && 0 !== m.t._overwriteProps.length || (m._prev ? m._prev._next = m._next : m === this._firstPT && (this._firstPT = m._next), m._next && (m._next._prev = m._prev), m._next = m._prev = null), delete c[d]), p && (b[d] = 1)
                    }!this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return f
        }, aG.invalidate = function() {
            return this._notifyPluginsOfEnabled && aj._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], aa.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -aU, this.render(-this._delay)), this
        }, aG._enabled = function(b, d) {
            if (aF || aT.wake(), b && this._gc) {
                var a, c = this._targets;
                if (c) {
                    for (a = c.length; --a > -1;) {
                        this._siblings[a] = at(c[a], this, !0)
                    }
                } else {
                    this._siblings = at(this.target, this, !0)
                }
            }
            return aa.prototype._enabled.call(this, b, d), this._notifyPluginsOfEnabled && this._firstPT ? aj._onPluginEvent(b ? "_onEnable" : "_onDisable", this) : !1
        }, aj.to = function(b, c, a) {
            return new aj(b, c, a)
        }, aj.from = function(b, c, a) {
            return a.runBackwards = !0, a.immediateRender = 0 != a.immediateRender, new aj(b, c, a)
        }, aj.fromTo = function(b, d, a, c) {
            return c.startAt = a, c.immediateRender = 0 != c.immediateRender && 0 != a.immediateRender, new aj(b, d, c)
        }, aj.delayedCall = function(b, f, a, c, d) {
            return new aj(f, 0, {
                delay: b,
                onComplete: f,
                onCompleteParams: a,
                onCompleteScope: c,
                onReverseComplete: f,
                onReverseCompleteParams: a,
                onReverseCompleteScope: c,
                immediateRender: !1,
                useFrames: d,
                overwrite: 0
            })
        }, aj.set = function(a, b) {
            return new aj(a, 0, b)
        }, aj.getTweensOf = function(b, f) {
            if (null == b) {
                return []
            }
            b = "string" != typeof b ? b : aj.selector(b) || b;
            var a, c, d, g;
            if ((aO(b) || an(b)) && "number" != typeof b[0]) {
                for (a = b.length, c = []; --a > -1;) {
                    c = c.concat(aj.getTweensOf(b[a], f))
                }
                for (a = c.length; --a > -1;) {
                    for (g = c[a], d = a; --d > -1;) {
                        g === c[d] && c.splice(a, 1)
                    }
                }
            } else {
                for (c = at(b).concat(), a = c.length; --a > -1;) {
                    (c[a]._gc || f && !c[a].isActive()) && c.splice(a, 1)
                }
            }
            return c
        }, aj.killTweensOf = aj.killDelayedCallsTo = function(b, f, a) {
            "object" == typeof f && (a = f, f = !1);
            for (var c = aj.getTweensOf(b, f), d = c.length; --d > -1;) {
                c[d]._kill(a, b)
            }
        };
        var W = ay("plugins.TweenPlugin", function(a, b) {
            this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = W.prototype
        }, !0);
        if (aG = W.prototype, W.version = "1.10.1", W.API = 2, aG._firstPT = null, aG._addTween = function(d, h, c, f, g, k) {
                var b, j;
                return null != f && (b = "number" == typeof f || "=" !== f.charAt(1) ? Number(f) - c : parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2))) ? (this._firstPT = j = {
                    _next: this._firstPT,
                    t: d,
                    p: h,
                    s: c,
                    c: b,
                    f: "function" == typeof d[h],
                    n: g || h,
                    r: k
                }, j._next && (j._next._prev = j), j) : void 0
            }, aG.setRatio = function(b) {
                for (var d, a = this._firstPT, c = 0.000001; a;) {
                    d = a.c * b + a.s, a.r ? d = Math.round(d) : c > d && d > -c && (d = 0), a.f ? a.t[a.p](d) : a.t[a.p] = d, a = a._next
                }
            }, aG._kill = function(b) {
                var d, a = this._overwriteProps,
                    c = this._firstPT;
                if (null != b[this._propName]) {
                    this._overwriteProps = []
                } else {
                    for (d = a.length; --d > -1;) {
                        null != b[a[d]] && a.splice(d, 1)
                    }
                }
                for (; c;) {
                    null != b[c.n] && (c._next && (c._next._prev = c._prev), c._prev ? (c._prev._next = c._next, c._prev = null) : this._firstPT === c && (this._firstPT = c._next)), c = c._next
                }
                return !1
            }, aG._roundProps = function(b, c) {
                for (var a = this._firstPT; a;) {
                    (b[this._propName] || null != a.n && b[a.n.split(this._propName + "_").join("")]) && (a.r = c), a = a._next
                }
            }, aj._onPluginEvent = function(d, h) {
                var c, f, g, k, b, j = h._firstPT;
                if ("_onInitAllProps" === d) {
                    for (; j;) {
                        for (b = j._next, f = g; f && f.pr > j.pr;) {
                            f = f._next
                        }(j._prev = f ? f._prev : k) ? j._prev._next = j: g = j, (j._next = f) ? f._prev = j : k = j, j = b
                    }
                    j = h._firstPT = g
                }
                for (; j;) {
                    j.pg && "function" == typeof j.t[d] && j.t[d]() && (c = !0), j = j._next
                }
                return c
            }, W.activate = function(a) {
                for (var b = a.length; --b > -1;) {
                    a[b].API === W.API && (X[(new a[b])._propName] = a[b])
                }
                return !0
            }, aQ.plugin = function(d) {
                if (!(d && d.propName && d.init && d.API)) {
                    throw "illegal plugin definition."
                }
                var h, c = d.propName,
                    f = d.priority || 0,
                    g = d.overwriteProps,
                    k = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    b = ay("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
                        W.call(this, c, f), this._overwriteProps = g || []
                    }, d.global === !0),
                    j = b.prototype = new W(c);
                j.constructor = b, b.API = d.API;
                for (h in k) {
                    "function" == typeof d[h] && (j[k[h]] = d[h])
                }
                return b.version = d.version, W.activate([b]), b
            }, aB = aA._gsQueue) {
            for (aC = 0; aB.length > aC; aC++) {
                aB[aC]()
            }
            for (aG in aR) {
                aR[aG].func || aA.console.log("GSAP encountered missing dependency: com.greensock." + aG)
            }
        }
        aF = !1
    }
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
/*!
 * VERSION: 1.14.2
 * DATE: 2014-10-18
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(D, y, v) {
            var E = function(c) {
                    y.call(this, c), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var a, f, h = this.vars;
                    for (f in h) {
                        a = h[f], g(a) && -1 !== a.join("").indexOf("{self}") && (h[f] = this._swapSelfInParams(a))
                    }
                    g(h.tweens) && this.add(h.tweens, 0, h.align, h.stagger)
                },
                b = 1e-10,
                j = v._internals,
                A = j.isSelector,
                g = j.isArray,
                w = j.lazyTweens,
                q = j.lazyRender,
                B = [],
                C = _gsScope._gsDefine.globals,
                z = function(c) {
                    var f, a = {};
                    for (f in c) {
                        a[f] = c[f]
                    }
                    return a
                },
                d = function(c, l, a, f) {
                    var h = c._timeline._totalTime;
                    (l || !this._forcingPlayhead) && (c._timeline.pause(c._startTime), l && l.apply(f || c._timeline, a || B), this._forcingPlayhead && c._timeline.seek(h))
                },
                x = function(c) {
                    var h, a = [],
                        f = c.length;
                    for (h = 0; h !== f; a.push(c[h++])) {}
                    return a
                },
                k = E.prototype = new y;
            return E.version = "1.14.2", k.constructor = E, k.kill()._gc = k._forcingPlayhead = !1, k.to = function(a, h, c, f) {
                var i = c.repeat && C.TweenMax || v;
                return h ? this.add(new i(a, h, c), f) : this.set(a, c, f)
            }, k.from = function(a, h, c, f) {
                return this.add((c.repeat && C.TweenMax || v).from(a, h, c), f)
            }, k.fromTo = function(f, l, h, i, m) {
                var c = i.repeat && C.TweenMax || v;
                return l ? this.add(c.fromTo(f, l, h, i), m) : this.set(f, i, m)
            }, k.staggerTo = function(I, F, a, i, f, s, m, G) {
                var H, c = new E({
                    onComplete: s,
                    onCompleteParams: m,
                    onCompleteScope: G,
                    smoothChildTiming: this.smoothChildTiming
                });
                for ("string" == typeof I && (I = v.selector(I) || I), I = I || [], A(I) && (I = x(I)), i = i || 0, 0 > i && (I = x(I), I.reverse(), i *= -1), H = 0; I.length > H; H++) {
                    a.startAt && (a.startAt = z(a.startAt)), c.to(I[H], F, z(a), H * i)
                }
                return this.add(c, f)
            }, k.staggerFrom = function(h, p, f, l, m, F, c, u) {
                return f.immediateRender = 0 != f.immediateRender, f.runBackwards = !0, this.staggerTo(h, p, f, l, m, F, c, u)
            }, k.staggerFromTo = function(G, u, m, H, c, l, F, f, p) {
                return H.startAt = m, H.immediateRender = 0 != H.immediateRender && 0 != m.immediateRender, this.staggerTo(G, u, H, c, l, F, f, p)
            }, k.call = function(a, h, c, f) {
                return this.add(v.delayedCall(0, a, h, c), f)
            }, k.set = function(a, f, c) {
                return c = this._parseTimeOrLabel(c, 0, !0), null == f.immediateRender && (f.immediateRender = c === this._time && !this._paused), this.add(new v(a, 0, f), c)
            }, E.exportRoot = function(f, i) {
                f = f || {}, null == f.smoothChildTiming && (f.smoothChildTiming = !0);
                var h, m, c = new E(f),
                    l = c._timeline;
                for (null == i && (i = !0), l._remove(c, !0), c._startTime = 0, c._rawPrevTime = c._time = c._totalTime = l._time, h = l._first; h;) {
                    m = h._next, i && h instanceof v && h.target === h.vars.onComplete || c.add(h, h._startTime - h._delay), h = m
                }
                return l.add(c, 0), c
            }, k.add = function(i, o, H, t) {
                var s, I, J, G, m, F;
                if ("number" != typeof o && (o = this._parseTimeOrLabel(o, 0, !0, i)), !(i instanceof D)) {
                    if (i instanceof Array || i && i.push && g(i)) {
                        for (H = H || "normal", t = t || 0, s = o, I = i.length, J = 0; I > J; J++) {
                            g(G = i[J]) && (G = new E({
                                tweens: G
                            })), this.add(G, s), "string" != typeof G && "function" != typeof G && ("sequence" === H ? s = G._startTime + G.totalDuration() / G._timeScale : "start" === H && (G._startTime -= G.delay())), s += t
                        }
                        return this._uncache(!0)
                    }
                    if ("string" == typeof i) {
                        return this.addLabel(i, o)
                    }
                    if ("function" != typeof i) {
                        throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string."
                    }
                    i = v.delayedCall(0, i)
                }
                if (y.prototype.add.call(this, i, o), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) {
                    for (m = this, F = m.rawTime() > i._startTime; m._timeline;) {
                        F && m._timeline.smoothChildTiming ? m.totalTime(m._totalTime, !0) : m._gc && m._enabled(!0, !1), m = m._timeline
                    }
                }
                return this
            }, k.remove = function(c) {
                if (c instanceof D) {
                    return this._remove(c, !1)
                }
                if (c instanceof Array || c && c.push && g(c)) {
                    for (var a = c.length; --a > -1;) {
                        this.remove(c[a])
                    }
                    return this
                }
                return "string" == typeof c ? this.removeLabel(c) : this.kill(null, c)
            }, k._remove = function(c, a) {
                y.prototype._remove.call(this, c, a);
                var f = this._last;
                return f ? this._time > f._startTime + f._totalDuration / f._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, k.append = function(a, c) {
                return this.add(a, this._parseTimeOrLabel(null, c, !0, a))
            }, k.insert = k.insertMultiple = function(c, h, a, f) {
                return this.add(c, h || 0, a, f)
            }, k.appendMultiple = function(c, h, a, f) {
                return this.add(c, this._parseTimeOrLabel(null, h, !0, c), a, f)
            }, k.addLabel = function(a, c) {
                return this._labels[a] = this._parseTimeOrLabel(c), this
            }, k.addPause = function(c, h, a, f) {
                return this.call(d, ["{self}", h, a, f], this, c)
            }, k.removeLabel = function(a) {
                return delete this._labels[a], this
            }, k.getLabelTime = function(a) {
                return null != this._labels[a] ? this._labels[a] : -1
            }, k._parseTimeOrLabel = function(h, a, c, f) {
                var l;
                if (f instanceof D && f.timeline === this) {
                    this.remove(f)
                } else {
                    if (f && (f instanceof Array || f.push && g(f))) {
                        for (l = f.length; --l > -1;) {
                            f[l] instanceof D && f[l].timeline === this && this.remove(f[l])
                        }
                    }
                }
                if ("string" == typeof a) {
                    return this._parseTimeOrLabel(a, c && "number" == typeof h && null == this._labels[a] ? h - this.duration() : 0, c)
                }
                if (a = a || 0, "string" != typeof h || !isNaN(h) && null == this._labels[h]) {
                    null == h && (h = this.duration())
                } else {
                    if (l = h.indexOf("="), -1 === l) {
                        return null == this._labels[h] ? c ? this._labels[h] = this.duration() + a : a : this._labels[h] + a
                    }
                    a = parseInt(h.charAt(l - 1) + "1", 10) * Number(h.substr(l + 1)), h = l > 1 ? this._parseTimeOrLabel(h.substr(0, l - 1), 0, c) : this.duration()
                }
                return Number(h) + a
            }, k.seek = function(a, c) {
                return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), c !== !1)
            }, k.stop = function() {
                return this.paused(!0)
            }, k.gotoAndPlay = function(a, c) {
                return this.play(a, c)
            }, k.gotoAndStop = function(a, c) {
                return this.pause(a, c)
            }, k.render = function(N, I, G) {
                this._gc && this._enabled(!0, !1);
                var O, r, L, l, M, K = this._dirty ? this.totalDuration() : this._totalDuration,
                    h = this._time,
                    H = this._startTime,
                    F = this._timeScale,
                    J = this._paused;
                if (N >= K ? (this._totalTime = this._time = K, this._reversed || this._hasPausedChild() || (r = !0, l = "onComplete", 0 === this._duration && (0 === N || 0 > this._rawPrevTime || this._rawPrevTime === b) && this._rawPrevTime !== N && this._first && (M = !0, this._rawPrevTime > b && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !I || N || this._rawPrevTime === N ? N : b, N = K + 0.0001) : 1e-7 > N ? (this._totalTime = this._time = 0, (0 !== h || 0 === this._duration && this._rawPrevTime !== b && (this._rawPrevTime > 0 || 0 > N && this._rawPrevTime >= 0)) && (l = "onReverseComplete", r = this._reversed), 0 > N ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (M = !0), this._rawPrevTime = N) : (this._rawPrevTime = this._duration || !I || N || this._rawPrevTime === N ? N : b, N = 0, this._initted || (M = !0))) : this._totalTime = this._time = this._rawPrevTime = N, this._time !== h && this._first || G || M) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== h && N > 0 && (this._active = !0), 0 === h && this.vars.onStart && 0 !== this._time && (I || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || B)), this._time >= h) {
                        for (O = this._first; O && (L = O._next, !this._paused || J);) {
                            (O._active || O._startTime <= this._time && !O._paused && !O._gc) && (O._reversed ? O.render((O._dirty ? O.totalDuration() : O._totalDuration) - (N - O._startTime) * O._timeScale, I, G) : O.render((N - O._startTime) * O._timeScale, I, G)), O = L
                        }
                    } else {
                        for (O = this._last; O && (L = O._prev, !this._paused || J);) {
                            (O._active || h >= O._startTime && !O._paused && !O._gc) && (O._reversed ? O.render((O._dirty ? O.totalDuration() : O._totalDuration) - (N - O._startTime) * O._timeScale, I, G) : O.render((N - O._startTime) * O._timeScale, I, G)), O = L
                        }
                    }
                    this._onUpdate && (I || (w.length && q(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || B))), l && (this._gc || (H === this._startTime || F !== this._timeScale) && (0 === this._time || K >= this.totalDuration()) && (r && (w.length && q(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !I && this.vars[l] && this.vars[l].apply(this.vars[l + "Scope"] || this, this.vars[l + "Params"] || B)))
                }
            }, k._hasPausedChild = function() {
                for (var a = this._first; a;) {
                    if (a._paused || a instanceof E && a._hasPausedChild()) {
                        return !0
                    }
                    a = a._next
                }
                return !1
            }, k.getChildren = function(f, l, h, i) {
                i = i || -9999999999;
                for (var p = [], c = this._first, m = 0; c;) {
                    i > c._startTime || (c instanceof v ? l !== !1 && (p[m++] = c) : (h !== !1 && (p[m++] = c), f !== !1 && (p = p.concat(c.getChildren(!0, l, h)), m = p.length))), c = c._next
                }
                return p
            }, k.getTweensOf = function(f, l) {
                var h, i, p = this._gc,
                    c = [],
                    m = 0;
                for (p && this._enabled(!0, !0), h = v.getTweensOf(f), i = h.length; --i > -1;) {
                    (h[i].timeline === this || l && this._contains(h[i])) && (c[m++] = h[i])
                }
                return p && this._enabled(!1, !0), c
            }, k.recent = function() {
                return this._recent
            }, k._contains = function(a) {
                for (var c = a.timeline; c;) {
                    if (c === this) {
                        return !0
                    }
                    c = c.timeline
                }
                return !1
            }, k.shiftChildren = function(c, l, a) {
                a = a || 0;
                for (var f, h = this._first, m = this._labels; h;) {
                    h._startTime >= a && (h._startTime += c), h = h._next
                }
                if (l) {
                    for (f in m) {
                        m[f] >= a && (m[f] += c)
                    }
                }
                return this._uncache(!0)
            }, k._kill = function(c, l) {
                if (!c && !l) {
                    return this._enabled(!1, !1)
                }
                for (var a = l ? this.getTweensOf(l) : this.getChildren(!0, !0, !1), f = a.length, h = !1; --f > -1;) {
                    a[f]._kill(c, l) && (h = !0)
                }
                return h
            }, k.clear = function(c) {
                var f = this.getChildren(!1, !0, !0),
                    a = f.length;
                for (this._time = this._totalTime = 0; --a > -1;) {
                    f[a]._enabled(!1, !1)
                }
                return c !== !1 && (this._labels = {}), this._uncache(!0)
            }, k.invalidate = function() {
                for (var a = this._first; a;) {
                    a.invalidate(), a = a._next
                }
                return D.prototype.invalidate.call(this)
            }, k._enabled = function(c, a) {
                if (c === this._gc) {
                    for (var f = this._first; f;) {
                        f._enabled(c, !0), f = f._next
                    }
                }
                return y.prototype._enabled.call(this, c, a)
            }, k.totalTime = function() {
                this._forcingPlayhead = !0;
                var a = D.prototype.totalTime.apply(this, arguments);
                return this._forcingPlayhead = !1, a
            }, k.duration = function(a) {
                return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
            }, k.totalDuration = function(c) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var l, a, f = 0, h = this._last, m = 999999999999; h;) {
                            l = h._prev, h._dirty && h.totalDuration(), h._startTime > m && this._sortChildren && !h._paused ? this.add(h, h._startTime - h._delay) : m = h._startTime, 0 > h._startTime && !h._paused && (f -= h._startTime, this._timeline.smoothChildTiming && (this._startTime += h._startTime / this._timeScale), this.shiftChildren(-h._startTime, !1, -9999999999), m = 0), a = h._startTime + h._totalDuration / h._timeScale, a > f && (f = a), h = l
                        }
                        this._duration = this._totalDuration = f, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return 0 !== this.totalDuration() && 0 !== c && this.timeScale(this._totalDuration / c), this
            }, k.usesFrames = function() {
                for (var a = this._timeline; a._timeline;) {
                    a = a._timeline
                }
                return a === D._rootFramesTimeline
            }, k.rawTime = function() {
                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
            }, E
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(a) {
        var b = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[a]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = b())
    }("TimelineLite");
/*!
 * VERSION: beta 1.9.4
 * DATE: 2014-07-17
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(F) {
        var z, w, G, b = _gsScope.GreenSockGlobals || _gsScope,
            k = b.com.greensock,
            C = 2 * Math.PI,
            j = Math.PI / 2,
            x = k._class,
            v = function(f, a) {
                var c = x("easing." + f, function() {}, !0),
                    d = c.prototype = new F;
                return d.constructor = c, d.getRatio = a, c
            },
            D = F.register || function() {},
            E = function(c, h, a, d) {
                var f = x("easing." + c, {
                    easeOut: new h,
                    easeIn: new a,
                    easeInOut: new d
                }, !0);
                return D(f, c), f
            },
            B = function(c, d, a) {
                this.t = c, this.v = d, a && (this.next = a, a.prev = this, this.c = a.v - d, this.gap = a.t - c)
            },
            g = function(f, a) {
                var c = x("easing." + f, function(h) {
                        this._p1 = h || 0 === h ? h : 1.70158, this._p2 = 1.525 * this._p1
                    }, !0),
                    d = c.prototype = new F;
                return d.constructor = c, d.getRatio = a, d.config = function(h) {
                    return new c(h)
                }, c
            },
            y = E("Back", g("BackOut", function(a) {
                return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
            }), g("BackIn", function(a) {
                return a * a * ((this._p1 + 1) * a - this._p1)
            }), g("BackInOut", function(a) {
                return 1 > (a *= 2) ? 0.5 * a * a * ((this._p2 + 1) * a - this._p2) : 0.5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
            })),
            q = x("easing.SlowMo", function(c, d, a) {
                d = d || 0 === d ? d : 0.7, null == c ? c = 0.7 : c > 1 && (c = 1), this._p = 1 !== c ? d : 0, this._p1 = (1 - c) / 2, this._p2 = c, this._p3 = this._p1 + this._p2, this._calcEnd = a === !0
            }, !0),
            A = q.prototype = new F;
        return A.constructor = q, A.getRatio = function(a) {
            var c = a + (0.5 - a) * this._p;
            return this._p1 > a ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : c - (a = 1 - a / this._p1) * a * a * a * c : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : c + (a - c) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : c
        }, q.ease = new q(0.7, 0.7), A.config = q.config = function(c, d, a) {
            return new q(c, d, a)
        }, z = x("easing.SteppedEase", function(a) {
            a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
        }, !0), A = z.prototype = new F, A.constructor = z, A.getRatio = function(a) {
            return 0 > a ? a = 0 : a >= 1 && (a = 0.999999999), (this._p2 * a >> 0) * this._p1
        }, A.config = z.config = function(a) {
            return new z(a)
        }, w = x("easing.RoughEase", function(P) {
            P = P || {};
            for (var L, U, c, I, R, H, M = P.taper || "none", K = [], S = 0, T = 0 | (P.points || 20), t = T, O = P.randomize !== !1, J = P.clamp === !0, Q = P.template instanceof F ? P.template : null, N = "number" == typeof P.strength ? 0.4 * P.strength : 0.4; --t > -1;) {
                L = O ? Math.random() : 1 / T * t, U = Q ? Q.getRatio(L) : L, "none" === M ? c = N : "out" === M ? (I = 1 - L, c = I * I * N) : "in" === M ? c = L * L * N : 0.5 > L ? (I = 2 * L, c = 0.5 * I * I * N) : (I = 2 * (1 - L), c = 0.5 * I * I * N), O ? U += Math.random() * c - 0.5 * c : t % 2 ? U += 0.5 * c : U -= 0.5 * c, J && (U > 1 ? U = 1 : 0 > U && (U = 0)), K[S++] = {
                    x: L,
                    y: U
                }
            }
            for (K.sort(function(a, d) {
                    return a.x - d.x
                }), H = new B(1, 1, null), t = T; --t > -1;) {
                R = K[t], H = new B(R.x, R.y, H)
            }
            this._prev = new B(0, 0, 0 !== H.t ? H : H.next)
        }, !0), A = w.prototype = new F, A.constructor = w, A.getRatio = function(a) {
            var c = this._prev;
            if (a > c.t) {
                for (; c.next && a >= c.t;) {
                    c = c.next
                }
                c = c.prev
            } else {
                for (; c.prev && c.t >= a;) {
                    c = c.prev
                }
            }
            return this._prev = c, c.v + (a - c.t) / c.gap * c.c
        }, A.config = function(a) {
            return new w(a)
        }, w.ease = new w, E("Bounce", v("BounceOut", function(a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
        }), v("BounceIn", function(a) {
            return 1 / 2.75 > (a = 1 - a) ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375)
        }), v("BounceInOut", function(a) {
            var c = 0.5 > a;
            return a = c ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375, c ? 0.5 * (1 - a) : 0.5 * a + 0.5
        })), E("Circ", v("CircOut", function(a) {
            return Math.sqrt(1 - (a -= 1) * a)
        }), v("CircIn", function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), v("CircInOut", function(a) {
            return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })), G = function(f, a, c) {
            var d = x("easing." + f, function(i, l) {
                    this._p1 = i || 1, this._p2 = l || c, this._p3 = this._p2 / C * (Math.asin(1 / this._p1) || 0)
                }, !0),
                h = d.prototype = new F;
            return h.constructor = d, h.getRatio = a, h.config = function(i, l) {
                return new d(i, l)
            }, d
        }, E("Elastic", G("ElasticOut", function(a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * C / this._p2) + 1
        }, 0.3), G("ElasticIn", function(a) {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * C / this._p2))
        }, 0.3), G("ElasticInOut", function(a) {
            return 1 > (a *= 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * C / this._p2) : 0.5 * this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * C / this._p2) + 1
        }, 0.45)), E("Expo", v("ExpoOut", function(a) {
            return 1 - Math.pow(2, -10 * a)
        }), v("ExpoIn", function(a) {
            return Math.pow(2, 10 * (a - 1)) - 0.001
        }), v("ExpoInOut", function(a) {
            return 1 > (a *= 2) ? 0.5 * Math.pow(2, 10 * (a - 1)) : 0.5 * (2 - Math.pow(2, -10 * (a - 1)))
        })), E("Sine", v("SineOut", function(a) {
            return Math.sin(a * j)
        }), v("SineIn", function(a) {
            return -Math.cos(a * j) + 1
        }), v("SineInOut", function(a) {
            return -0.5 * (Math.cos(Math.PI * a) - 1)
        })), x("easing.EaseLookup", {
            find: function(a) {
                return F.map[a]
            }
        }, !0), D(b.SlowMo, "SlowMo", "ease,"), D(w, "RoughEase", "ease,"), D(z, "SteppedEase", "ease,"), y
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();
/*!
 * VERSION: 1.14.2
 * DATE: 2014-10-28
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(au, aN) {
            var aI, aw, av, aB, aT = function() {
                    au.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = aT.prototype.setRatio
                },
                aA = {},
                aF = aT.prototype = new au("css");
            aF.constructor = aT, aT.version = "1.14.2", aT.API = 2, aT.defaultTransformPerspective = 0, aT.defaultSkewType = "compensated", aF = "px", aT.suffixMap = {
                top: aF,
                right: aF,
                bottom: aF,
                left: aF,
                width: aF,
                height: aF,
                fontSize: aF,
                padding: aF,
                margin: aF,
                perspective: aF,
                lineHeight: ""
            };
            var aJ, at, aM, az, aU, aP, aO = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                aC = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                aL = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                ar = /(?![+-]?\d*\.?\d+|e[+-]\d+)[^0-9]/g,
                ao = /(?:\d|\-|\+|=|#|\.)*/g,
                ap = /opacity *= *([^)]*)/i,
                a1 = /opacity:([^;]*)/i,
                aq = /alpha\(opacity *=.+?\)/i,
                aS = /^(rgb|hsl)/,
                a6 = /([A-Z])/g,
                a3 = /-([a-z])/gi,
                a4 = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                bq = function(a, b) {
                    return b.toUpperCase()
                },
                aG = /(?:Left|Right|Width)/i,
                a7 = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                bs = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                bn = /,(?=[^\)]*(?:\(|$))/gi,
                bb = Math.PI / 180,
                bc = 180 / Math.PI,
                a9 = {},
                an = document,
                aX = an.createElement("div"),
                bg = an.createElement("img"),
                bm = aT._internals = {
                    _specialProps: aA
                },
                bl = navigator.userAgent,
                aW = function() {
                    var b, c = bl.indexOf("Android"),
                        a = an.createElement("div");
                    return aM = -1 !== bl.indexOf("Safari") && -1 === bl.indexOf("Chrome") && (-1 === c || Number(bl.substr(c + 8, 1)) > 3), aU = aM && 6 > Number(bl.substr(bl.indexOf("Version/") + 8, 1)), az = -1 !== bl.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(bl) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(bl)) && (aP = parseFloat(RegExp.$1)), a.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", b = a.getElementsByTagName("a")[0], b ? /^0.55/.test(b.style.opacity) : !1
                }(),
                br = function(a) {
                    return ap.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                a0 = function(a) {
                    window.console
                },
                aH = "",
                aY = "",
                aZ = function(b, f) {
                    f = f || aX;
                    var a, d, c = f.style;
                    if (void 0 !== c[b]) {
                        return b
                    }
                    for (b = b.charAt(0).toUpperCase() + b.substr(1), a = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === c[a[d] + b];) {}
                    return d >= 0 ? (aY = 3 === d ? "ms" : a[d], aH = "-" + aY.toLowerCase() + "-", aY + b) : null
                },
                ay = an.defaultView ? an.defaultView.getComputedStyle : function() {},
                bj = aT.getStyle = function(b, f, a, d, c) {
                    var g;
                    return aW || "opacity" !== f ? (!d && b.style[f] ? g = b.style[f] : (a = a || ay(b)) ? g = a[f] || a.getPropertyValue(f) || a.getPropertyValue(f.replace(a6, "-$1").toLowerCase()) : b.currentStyle && (g = b.currentStyle[f]), null == c || g && "none" !== g && "auto" !== g && "auto auto" !== g ? g : c) : br(b)
                },
                bk = bm.convertToPixels = function(w, j, a, x, d) {
                    if ("px" === x || !x) {
                        return a
                    }
                    if ("auto" === x || !a) {
                        return 0
                    }
                    var c, g, k, v = aG.test(j),
                        m = w,
                        b = aX.style,
                        q = 0 > a;
                    if (q && (a = -a), "%" === x && -1 !== j.indexOf("border")) {
                        c = a / 100 * (v ? w.clientWidth : w.clientHeight)
                    } else {
                        if (b.cssText = "border:0 solid red;position:" + bj(w, "position") + ";line-height:0;", "%" !== x && m.appendChild) {
                            b[v ? "borderLeftWidth" : "borderTopWidth"] = a + x
                        } else {
                            if (m = w.parentNode || an.body, g = m._gsCache, k = aN.ticker.frame, g && v && g.time === k) {
                                return g.width * a / 100
                            }
                            b[v ? "width" : "height"] = a + x
                        }
                        m.appendChild(aX), c = parseFloat(aX[v ? "offsetWidth" : "offsetHeight"]), m.removeChild(aX), v && "%" === x && aT.cacheWidths !== !1 && (g = m._gsCache = m._gsCache || {}, g.time = k, g.width = 100 * (c / a)), 0 !== c || d || (c = bk(w, j, a, x, !0))
                    }
                    return q ? -c : c
                },
                a5 = bm.calculateOffset = function(b, f, a) {
                    if ("absolute" !== bj(b, "position", a)) {
                        return 0
                    }
                    var d = "left" === f ? "Left" : "Top",
                        c = bj(b, "margin" + d, a);
                    return b["offset" + d] - (bk(b, f, parseFloat(c), c.replace(ao, "")) || 0)
                },
                aV = function(b, f) {
                    var a, d, c = {};
                    if (f = f || ay(b, null)) {
                        if (a = f.length) {
                            for (; --a > -1;) {
                                c[f[a].replace(a3, bq)] = f.getPropertyValue(f[a])
                            }
                        } else {
                            for (a in f) {
                                c[a] = f[a]
                            }
                        }
                    } else {
                        if (f = b.currentStyle || b.style) {
                            for (a in f) {
                                "string" == typeof a && void 0 === c[a] && (c[a.replace(a3, bq)] = f[a])
                            }
                        }
                    }
                    return aW || (c.opacity = br(b)), d = bD(b, f, !1), c.rotation = d.rotation, c.skewX = d.skewX, c.scaleX = d.scaleX, c.scaleY = d.scaleY, c.x = d.x, c.y = d.y, a2 && (c.z = d.z, c.rotationX = d.rotationX, c.rotationY = d.rotationY, c.scaleZ = d.scaleZ), c.filters && delete c.filters, c
                },
                bz = function(p, k, g, b, q) {
                    var d, m, c, f = {},
                        j = p.style;
                    for (m in g) {
                        "cssText" !== m && "length" !== m && isNaN(m) && (k[m] !== (d = g[m]) || q && q[m]) && -1 === m.indexOf("Origin") && ("number" == typeof d || "string" == typeof d) && (f[m] = "auto" !== d || "left" !== m && "top" !== m ? "" !== d && "auto" !== d && "none" !== d || "string" != typeof k[m] || "" === k[m].replace(ar, "") ? d : 0 : a5(p, m), void 0 !== j[m] && (c = new bC(j, m, j[m], c)))
                    }
                    if (b) {
                        for (m in b) {
                            "className" !== m && (f[m] = b[m])
                        }
                    }
                    return {
                        difs: f,
                        firstMPT: c
                    }
                },
                bd = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                bf = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                bo = function(b, f, a) {
                    var d = parseFloat("width" === f ? b.offsetWidth : b.offsetHeight),
                        c = bd[f],
                        g = c.length;
                    for (a = a || ay(b, null); --g > -1;) {
                        d -= parseFloat(bj(b, "padding" + c[g], a, !0)) || 0, d -= parseFloat(bj(b, "border" + c[g] + "Width", a, !0)) || 0
                    }
                    return d
                },
                ab = function(b, f) {
                    (null == b || "" === b || "auto" === b || "auto auto" === b) && (b = "0 0");
                    var a = b.split(" "),
                        d = -1 !== b.indexOf("left") ? "0%" : -1 !== b.indexOf("right") ? "100%" : a[0],
                        c = -1 !== b.indexOf("top") ? "0%" : -1 !== b.indexOf("bottom") ? "100%" : a[1];
                    return null == c ? c = "0" : "center" === c && (c = "50%"), ("center" === d || isNaN(parseFloat(d)) && -1 === (d + "").indexOf("=")) && (d = "50%"), f && (f.oxp = -1 !== d.indexOf("%"), f.oyp = -1 !== c.indexOf("%"), f.oxr = "=" === d.charAt(1), f.oyr = "=" === c.charAt(1), f.ox = parseFloat(d.replace(ar, "")), f.oy = parseFloat(c.replace(ar, ""))), d + " " + c + (a.length > 2 ? " " + a[2] : "")
                },
                aD = function(a, b) {
                    return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
                },
                bF = function(a, b) {
                    return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a)
                },
                bx = function(k, h, g, b) {
                    var m, d, j, c, f = 0.000001;
                    return null == k ? c = h : "number" == typeof k ? c = k : (m = 360, d = k.split("_"), j = Number(d[0].replace(ar, "")) * (-1 === k.indexOf("rad") ? 1 : bc) - ("=" === k.charAt(1) ? 0 : h), d.length && (b && (b[g] = h + j), -1 !== k.indexOf("short") && (j %= m, j !== j % (m / 2) && (j = 0 > j ? j + m : j - m)), -1 !== k.indexOf("_cw") && 0 > j ? j = (j + 9999999999 * m) % m - (0 | j / m) * m : -1 !== k.indexOf("ccw") && j > 0 && (j = (j - 9999999999 * m) % m - (0 | j / m) * m)), c = h + j), f > c && c > -f && (c = 0), c
                },
                bh = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                bu = function(b, c, a) {
                    return b = 0 > b ? b + 1 : b > 1 ? b - 1 : b, 0 | 255 * (1 > 6 * b ? c + 6 * (a - c) * b : 0.5 > b ? a : 2 > 3 * b ? c + 6 * (a - c) * (2 / 3 - b) : c) + 0.5
                },
                aK = aT.parseColor = function(d) {
                    var h, c, g, f, j, b;
                    return d && "" !== d ? "number" == typeof d ? [d >> 16, 255 & d >> 8, 255 & d] : ("," === d.charAt(d.length - 1) && (d = d.substr(0, d.length - 1)), bh[d] ? bh[d] : "#" === d.charAt(0) ? (4 === d.length && (h = d.charAt(1), c = d.charAt(2), g = d.charAt(3), d = "#" + h + h + c + c + g + g), d = parseInt(d.substr(1), 16), [d >> 16, 255 & d >> 8, 255 & d]) : "hsl" === d.substr(0, 3) ? (d = d.match(aO), f = Number(d[0]) % 360 / 360, j = Number(d[1]) / 100, b = Number(d[2]) / 100, c = 0.5 >= b ? b * (j + 1) : b + j - b * j, h = 2 * b - c, d.length > 3 && (d[3] = Number(d[3])), d[0] = bu(f + 1 / 3, h, c), d[1] = bu(f, h, c), d[2] = bu(f - 1 / 3, h, c), d) : (d = d.match(aO) || bh.transparent, d[0] = Number(d[0]), d[1] = Number(d[1]), d[2] = Number(d[2]), d.length > 3 && (d[3] = Number(d[3])), d)) : bh.black
                },
                bE = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
            for (aF in bh) {
                bE += "|" + aF + "\\b"
            }
            bE = RegExp(bE + ")", "gi");
            var a8 = function(w, p, j, b) {
                    if (null == w) {
                        return function(a) {
                            return a
                        }
                    }
                    var x, d = p ? (w.match(bE) || [""])[0] : "",
                        q = w.split(d).join("").match(aL) || [],
                        c = w.substr(0, w.indexOf(q[0])),
                        g = ")" === w.charAt(w.length - 1) ? ")" : "",
                        k = -1 !== w.indexOf(" ") ? " " : ",",
                        v = q.length,
                        m = v > 0 ? q[0].replace(aO, "") : "";
                    return v ? x = p ? function(f) {
                        var i, h, a, l;
                        if ("number" == typeof f) {
                            f += m
                        } else {
                            if (b && bn.test(f)) {
                                for (l = f.replace(bn, "|").split("|"), a = 0; l.length > a; a++) {
                                    l[a] = x(l[a])
                                }
                                return l.join(",")
                            }
                        }
                        if (i = (f.match(bE) || [d])[0], h = f.split(i).join("").match(aL) || [], a = h.length, v > a--) {
                            for (; v > ++a;) {
                                h[a] = j ? h[0 | (a - 1) / 2] : q[a]
                            }
                        }
                        return c + h.join(k) + k + i + g + (-1 !== f.indexOf("inset") ? " inset" : "")
                    } : function(a) {
                        var h, i, f;
                        if ("number" == typeof a) {
                            a += m
                        } else {
                            if (b && bn.test(a)) {
                                for (i = a.replace(bn, "|").split("|"), f = 0; i.length > f; f++) {
                                    i[f] = x(i[f])
                                }
                                return i.join(",")
                            }
                        }
                        if (h = a.match(aL) || [], f = h.length, v > f--) {
                            for (; v > ++f;) {
                                h[f] = j ? h[0 | (f - 1) / 2] : q[f]
                            }
                        }
                        return c + h.join(k) + g
                    } : function(a) {
                        return a
                    }
                },
                aQ = function(a) {
                    return a = a.split(","),
                        function(k, g, b, p, d, m, c) {
                            var f, j = (g + "").split(" ");
                            for (c = {}, f = 0; 4 > f; f++) {
                                c[a[f]] = j[f] = j[f] || j[(f - 1) / 2 >> 0]
                            }
                            return p.parse(k, c, d, m)
                        }
                },
                bC = (bm._setPluginRatio = function(k) {
                    this.plugin.setRatio(k);
                    for (var h, g, b, m, d = this.data, j = d.proxy, c = d.firstMPT, f = 0.000001; c;) {
                        h = j[c.v], c.r ? h = Math.round(h) : f > h && h > -f && (h = 0), c.t[c.p] = h, c = c._next
                    }
                    if (d.autoRotate && (d.autoRotate.rotation = j.rotation), 1 === k) {
                        for (c = d.firstMPT; c;) {
                            if (g = c.t, g.type) {
                                if (1 === g.type) {
                                    for (m = g.xs0 + g.s + g.xs1, b = 1; g.l > b; b++) {
                                        m += g["xn" + b] + g["xs" + (b + 1)]
                                    }
                                    g.e = m
                                }
                            } else {
                                g.e = g.s + g.xs0
                            }
                            c = c._next
                        }
                    }
                }, function(b, f, a, d, c) {
                    this.t = b, this.p = f, this.v = a, this.r = c, d && (d._prev = this, this._next = d)
                }),
                al = (bm._parseToProxy = function(D, x, q, b, E, k) {
                    var A, j, m, v, C, w = b,
                        g = {},
                        B = {},
                        z = q._transform,
                        y = a9;
                    for (q._transform = null, a9 = x, b = C = q.parse(D, x, b, E), a9 = y, k && (q._transform = z, w && (w._prev = null, w._prev && (w._prev._next = null))); b && b !== w;) {
                        if (1 >= b.type && (j = b.p, B[j] = b.s + b.c, g[j] = b.s, k || (v = new bC(b, "s", j, v, b.r), b.c = 0), 1 === b.type)) {
                            for (A = b.l; --A > 0;) {
                                m = "xn" + A, j = b.p + "_" + m, B[j] = b.data[m], g[j] = b[m], k || (v = new bC(b, m, j, v, b.rxp[m]))
                            }
                        }
                        b = b._next
                    }
                    return {
                        proxy: g,
                        end: B,
                        firstMPT: v,
                        pt: C
                    }
                }, bm.CSSPropTween = function(q, k, b, v, m, d, g, i, n, j, c) {
                    this.t = q, this.p = k, this.s = b, this.c = v, this.n = g || k, q instanceof al || aB.push(this.n), this.r = i, this.type = d || 0, n && (this.pr = n, aI = !0), this.b = void 0 === j ? b : j, this.e = void 0 === c ? b + v : c, m && (this._next = m, m._prev = this)
                }),
                aa = aT.parseComplex = function(E, V, N, H, F, K, X, J, L, D) {
                    N = N || K || "", X = new al(E, V, 0, 0, X, D ? 2 : 1, null, !1, J, N, H), H += "";
                    var U, I, Y, W, Q, B, q, z, b, A, j, d, h = N.split(", ").join(",").split(" "),
                        G = H.split(", ").join(",").split(" "),
                        M = h.length,
                        m = aJ !== !1;
                    for ((-1 !== H.indexOf(",") || -1 !== N.indexOf(",")) && (h = h.join(" ").replace(bn, ", ").split(" "), G = G.join(" ").replace(bn, ", ").split(" "), M = h.length), M !== G.length && (h = (K || "").split(" "), M = h.length), X.plugin = L, X.setRatio = D, U = 0; M > U; U++) {
                        if (W = h[U], Q = G[U], z = parseFloat(W), z || 0 === z) {
                            X.appendXtra("", z, aD(Q, z), Q.replace(aC, ""), m && -1 !== Q.indexOf("px"), !0)
                        } else {
                            if (F && ("#" === W.charAt(0) || bh[W] || aS.test(W))) {
                                d = "," === Q.charAt(Q.length - 1) ? ")," : ")", W = aK(W), Q = aK(Q), b = W.length + Q.length > 6, b && !aW && 0 === Q[3] ? (X["xs" + X.l] += X.l ? " transparent" : "transparent", X.e = X.e.split(G[U]).join("transparent")) : (aW || (b = !1), X.appendXtra(b ? "rgba(" : "rgb(", W[0], Q[0] - W[0], ",", !0, !0).appendXtra("", W[1], Q[1] - W[1], ",", !0).appendXtra("", W[2], Q[2] - W[2], b ? "," : d, !0), b && (W = 4 > W.length ? 1 : W[3], X.appendXtra("", W, (4 > Q.length ? 1 : Q[3]) - W, d, !1)))
                            } else {
                                if (B = W.match(aO)) {
                                    if (q = Q.match(aC), !q || q.length !== B.length) {
                                        return X
                                    }
                                    for (Y = 0, I = 0; B.length > I; I++) {
                                        j = B[I], A = W.indexOf(j, Y), X.appendXtra(W.substr(Y, A - Y), Number(j), aD(q[I], j), "", m && "px" === W.substr(A + j.length, 2), 0 === I), Y = A + j.length
                                    }
                                    X["xs" + X.l] += W.substr(Y)
                                } else {
                                    X["xs" + X.l] += X.l ? " " + W : W
                                }
                            }
                        }
                    }
                    if (-1 !== H.indexOf("=") && X.data) {
                        for (d = X.xs0 + X.data.s, U = 1; X.l > U; U++) {
                            d += X["xs" + U] + X.data["xn" + U]
                        }
                        X.e = d + X["xs" + U]
                    }
                    return X.l || (X.type = -1, X.xs0 = X.e), X.xfirst || X
                },
                ax = 9;
            for (aF = al.prototype, aF.l = aF.pr = 0; --ax > 0;) {
                aF["xn" + ax] = 0, aF["xs" + ax] = ""
            }
            aF.xs0 = "", aF._next = aF._prev = aF.xfirst = aF.data = aF.plugin = aF.setRatio = aF.rxp = null, aF.appendXtra = function(d, h, c, g, f, k) {
                var b = this,
                    j = b.l;
                return b["xs" + j] += k && j ? " " + d : d || "", c || 0 === j || b.plugin ? (b.l++, b.type = b.setRatio ? 2 : 1, b["xs" + b.l] = g || "", j > 0 ? (b.data["xn" + j] = h + c, b.rxp["xn" + j] = f, b["xn" + j] = h, b.plugin || (b.xfirst = new al(b, "xn" + j, h, c, b.xfirst || b, 0, b.n, f, b.pr), b.xfirst.xs0 = 0), b) : (b.data = {
                    s: h + c
                }, b.rxp = {}, b.s = h, b.c = c, b.r = f, b)) : (b["xs" + j] += h + (g || ""), b)
            };
            var aj = function(a, b) {
                    b = b || {}, this.p = b.prefix ? aZ(a) || a : a, aA[a] = aA[this.p] = this, this.format = b.formatter || a8(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
                },
                bw = bm._registerComplexSpecialProp = function(d, h, c) {
                    "object" != typeof h && (h = {
                        parser: c
                    });
                    var g, f, j = d.split(","),
                        b = h.defaultValue;
                    for (c = c || [b], g = 0; j.length > g; g++) {
                        h.prefix = 0 === g && h.prefix, h.defaultValue = c[g] || b, f = new aj(j[g], h)
                    }
                },
                bv = function(a) {
                    if (!aA[a]) {
                        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                        bw(a, {
                            parser: function(g, f, m, k, o, d, c) {
                                var j = (_gsScope.GreenSockGlobals || _gsScope).com.greensock.plugins[b];
                                return j ? (j._cssRegister(), aA[m].parse(g, f, m, k, o, d, c)) : (a0("Error: " + b + " js file not loaded."), o)
                            }
                        })
                    }
                };
            aF = aj.prototype, aF.parseComplex = function(y, v, k, b, z, g) {
                var w, d, j, m, x, q, c = this.keyword;
                if (this.multi && (bn.test(k) || bn.test(v) ? (d = v.replace(bn, "|").split("|"), j = k.replace(bn, "|").split("|")) : c && (d = [v], j = [k])), j) {
                    for (m = j.length > d.length ? j.length : d.length, w = 0; m > w; w++) {
                        v = d[w] = d[w] || this.dflt, k = j[w] = j[w] || this.dflt, c && (x = v.indexOf(c), q = k.indexOf(c), x !== q && (k = -1 === q ? j : d, k[w] += " " + c))
                    }
                    v = d.join(", "), k = j.join(", ")
                }
                return aa(y, this.p, v, k, this.clrs, this.dflt, b, this.pr, z, g)
            }, aF.parse = function(d, g, c, f, h, b) {
                return this.parseComplex(d.style, this.format(bj(d, this.p, av, !1, this.dflt)), this.format(g), h, b)
            }, aT.registerSpecialProp = function(b, c, a) {
                bw(b, {
                    parser: function(g, i, h, k, f, j) {
                        var d = new al(g, h, 0, 0, f, 2, h, !1, a);
                        return d.plugin = j, d.setRatio = c(g, i, k._tween, h), d
                    },
                    priority: a
                })
            };
            var am, bA = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                bH = aZ("transform"),
                bB = aH + "transform",
                ag = aZ("transformOrigin"),
                a2 = null !== aZ("perspective"),
                aR = bm.Transform = function() {
                    this.skewY = 0
                },
                bI = window.SVGElement,
                ah = function(b, f, a) {
                    var d, c = an.createElementNS("http://www.w3.org/2000/svg", b),
                        g = /([a-z])([A-Z])/g;
                    for (d in a) {
                        c.setAttributeNS(null, d.replace(g, "$1-$2").toLowerCase(), a[d])
                    }
                    return f.appendChild(c), c
                },
                ba = document.documentElement,
                ac = function() {
                    var b, d, a, c = aP || /Android/i.test(bl) && !window.chrome;
                    return an.createElementNS && !c && (b = ah("svg", ba), d = ah("rect", b, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), a = d.getBoundingClientRect().left, d.style[ag] = "50% 50%", d.style[bH] = "scale(0.5,0.5)", c = a === d.getBoundingClientRect().left, ba.removeChild(b)), c
                }(),
                bp = function(b, d, a) {
                    var c = b.getBBox();
                    d = ab(d).split(" "), a.xOrigin = (-1 !== d[0].indexOf("%") ? parseFloat(d[0]) / 100 * c.width : parseFloat(d[0])) + c.x, a.yOrigin = (-1 !== d[1].indexOf("%") ? parseFloat(d[1]) / 100 * c.height : parseFloat(d[1])) + c.y
                },
                bD = bm.getTransform = function(b9, cn, cj, ca) {
                    if (b9._gsTransform && cj && !ca) {
                        return b9._gsTransform
                    }
                    var ce, cd, cg, ck, b8, cm, cc, cs, cp, co, cf, cl, b7, b3 = cj ? b9._gsTransform || new aR : new aR,
                        b5 = 0 > b3.scaleX,
                        bJ = 0.00002,
                        b6 = 100000,
                        cq = 179.99,
                        bN = cq * bb,
                        bK = a2 ? parseFloat(bj(b9, ag, cn, !1, "0 0 0").split(" ")[2]) || b3.zOrigin || 0 : 0,
                        bL = parseFloat(aT.defaultTransformPerspective) || 0;
                    if (bH ? ce = bj(b9, bB, cn, !0) : b9.currentStyle && (ce = b9.currentStyle.filter.match(a7), ce = ce && 4 === ce.length ? [ce[0].substr(4), Number(ce[2].substr(4)), Number(ce[1].substr(4)), ce[3].substr(4), b3.x || 0, b3.y || 0].join(",") : ""), ce && "none" !== ce && "matrix(1, 0, 0, 1, 0, 0)" !== ce) {
                        for (cd = (ce || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], cg = cd.length; --cg > -1;) {
                            ck = Number(cd[cg]), cd[cg] = (b8 = ck - (ck |= 0)) ? (0 | b8 * b6 + (0 > b8 ? -0.5 : 0.5)) / b6 + ck : ck
                        }
                        if (16 === cd.length) {
                            var bW = cd[8],
                                ch = cd[9],
                                bY = cd[10],
                                bV = cd[12],
                                bO = cd[13],
                                b2 = cd[14];
                            if (b3.zOrigin && (b2 = -b3.zOrigin, bV = bW * b2 - cd[12], bO = ch * b2 - cd[13], b2 = bY * b2 + b3.zOrigin - cd[14]), !cj || ca || null == b3.rotationX) {
                                var L, bR, bU, bT, H, bX, be, ci = cd[0],
                                    O = cd[1],
                                    ae = cd[2],
                                    cb = cd[3],
                                    bS = cd[4],
                                    bM = cd[5],
                                    s = cd[6],
                                    b0 = cd[7],
                                    bP = cd[11],
                                    bQ = Math.atan2(s, bY),
                                    M = -bN > bQ || bQ > bN;
                                b3.rotationX = bQ * bc, bQ && (bT = Math.cos(-bQ), H = Math.sin(-bQ), L = bS * bT + bW * H, bR = bM * bT + ch * H, bU = s * bT + bY * H, bW = bS * -H + bW * bT, ch = bM * -H + ch * bT, bY = s * -H + bY * bT, bP = b0 * -H + bP * bT, bS = L, bM = bR, s = bU), bQ = Math.atan2(bW, ci), b3.rotationY = bQ * bc, bQ && (bX = -bN > bQ || bQ > bN, bT = Math.cos(-bQ), H = Math.sin(-bQ), L = ci * bT - bW * H, bR = O * bT - ch * H, bU = ae * bT - bY * H, ch = O * H + ch * bT, bY = ae * H + bY * bT, bP = cb * H + bP * bT, ci = L, O = bR, ae = bU), bQ = Math.atan2(O, bM), b3.rotation = bQ * bc, bQ && (be = -bN > bQ || bQ > bN, bT = Math.cos(-bQ), H = Math.sin(-bQ), ci = ci * bT + bS * H, bR = O * bT + bM * H, bM = O * -H + bM * bT, s = ae * -H + s * bT, O = bR), be && M ? b3.rotation = b3.rotationX = 0 : be && bX ? b3.rotation = b3.rotationY = 0 : bX && M && (b3.rotationY = b3.rotationX = 0), b3.scaleX = (0 | Math.sqrt(ci * ci + O * O) * b6 + 0.5) / b6, b3.scaleY = (0 | Math.sqrt(bM * bM + ch * ch) * b6 + 0.5) / b6, b3.scaleZ = (0 | Math.sqrt(s * s + bY * bY) * b6 + 0.5) / b6, b3.skewX = 0, b3.perspective = bP ? 1 / (0 > bP ? -bP : bP) : 0, b3.x = bV, b3.y = bO, b3.z = b2
                            }
                        } else {
                            if (!(a2 && !ca && cd.length && b3.x === cd[4] && b3.y === cd[5] && (b3.rotationX || b3.rotationY) || void 0 !== b3.x && "none" === bj(b9, "display", cn))) {
                                var cr = cd.length >= 6,
                                    b1 = cr ? cd[0] : 1,
                                    b4 = cd[1] || 0,
                                    bZ = cd[2] || 0,
                                    a = cr ? cd[3] : 1;
                                b3.x = cd[4] || 0, b3.y = cd[5] || 0, cm = Math.sqrt(b1 * b1 + b4 * b4), cc = Math.sqrt(a * a + bZ * bZ), cs = b1 || b4 ? Math.atan2(b4, b1) * bc : b3.rotation || 0, cp = bZ || a ? Math.atan2(bZ, a) * bc + cs : b3.skewX || 0, co = cm - Math.abs(b3.scaleX || 0), cf = cc - Math.abs(b3.scaleY || 0), Math.abs(cp) > 90 && 270 > Math.abs(cp) && (b5 ? (cm *= -1, cp += 0 >= cs ? 180 : -180, cs += 0 >= cs ? 180 : -180) : (cc *= -1, cp += 0 >= cp ? 180 : -180)), cl = (cs - b3.rotation) % 180, b7 = (cp - b3.skewX) % 180, (void 0 === b3.skewX || co > bJ || -bJ > co || cf > bJ || -bJ > cf || cl > -cq && cq > cl && false | cl * b6 || b7 > -cq && cq > b7 && false | b7 * b6) && (b3.scaleX = cm, b3.scaleY = cc, b3.rotation = cs, b3.skewX = cp), a2 && (b3.rotationX = b3.rotationY = b3.z = 0, b3.perspective = bL, b3.scaleZ = 1)
                            }
                        }
                        b3.zOrigin = bK;
                        for (cg in b3) {
                            bJ > b3[cg] && b3[cg] > -bJ && (b3[cg] = 0)
                        }
                    } else {
                        b3 = {
                            x: 0,
                            y: 0,
                            z: 0,
                            scaleX: 1,
                            scaleY: 1,
                            scaleZ: 1,
                            skewX: 0,
                            skewY: 0,
                            perspective: bL,
                            rotation: 0,
                            rotationX: 0,
                            rotationY: 0,
                            zOrigin: 0
                        }
                    }
                    return cj && (b9._gsTransform = b3), b3.svg = bI && b9 instanceof bI && b9.parentNode instanceof bI, b3.svg && (bp(b9, bj(b9, ag, av, !1, "50% 50%") + "", b3), am = aT.useSVGTransformAttr || ac), b3.xPercent = b3.yPercent = 0, b3
                },
                aE = function(A) {
                    var O, K, E = this.data,
                        B = -E.rotation * bb,
                        H = B + E.skewX * bb,
                        V = 100000,
                        G = (0 | Math.cos(B) * E.scaleX * V) / V,
                        J = (0 | Math.sin(B) * E.scaleX * V) / V,
                        L = (0 | Math.sin(H) * -E.scaleY * V) / V,
                        z = (0 | Math.cos(H) * E.scaleY * V) / V,
                        N = this.t.style,
                        F = this.t.currentStyle;
                    if (F) {
                        K = J, J = -L, L = -K, O = F.filter, N.filter = "";
                        var W, Q, I = this.t.offsetWidth,
                            M = this.t.offsetHeight,
                            y = "absolute" !== F.position,
                            c = "progid:DXImageTransform.Microsoft.Matrix(M11=" + G + ", M12=" + J + ", M21=" + L + ", M22=" + z,
                            x = E.x + I * E.xPercent / 100,
                            U = E.y + M * E.yPercent / 100;
                        if (null != E.ox && (W = (E.oxp ? 0.01 * I * E.ox : E.ox) - I / 2, Q = (E.oyp ? 0.01 * M * E.oy : E.oy) - M / 2, x += W - (W * G + Q * J), U += Q - (W * L + Q * z)), y ? (W = I / 2, Q = M / 2, c += ", Dx=" + (W - (W * G + Q * J) + x) + ", Dy=" + (Q - (W * L + Q * z) + U) + ")") : c += ", sizingMethod='auto expand')", N.filter = -1 !== O.indexOf("DXImageTransform.Microsoft.Matrix(") ? O.replace(bs, c) : c + " " + O, (0 === A || 1 === A) && 1 === G && 0 === J && 0 === L && 1 === z && (y && -1 === c.indexOf("Dx=0, Dy=0") || ap.test(O) && 100 !== parseFloat(RegExp.$1) || -1 === O.indexOf("gradient(" && O.indexOf("Alpha")) && N.removeAttribute("filter")), !y) {
                            var q, j, k, D = 8 > aP ? 1 : -1;
                            for (W = E.ieOffsetX || 0, Q = E.ieOffsetY || 0, E.ieOffsetX = Math.round((I - ((0 > G ? -G : G) * I + (0 > J ? -J : J) * M)) / 2 + x), E.ieOffsetY = Math.round((M - ((0 > z ? -z : z) * M + (0 > L ? -L : L) * I)) / 2 + U), ax = 0; 4 > ax; ax++) {
                                j = bf[ax], q = F[j], K = -1 !== q.indexOf("px") ? parseFloat(q) : bk(this.t, j, parseFloat(q), q.replace(ao, "")) || 0, k = K !== E[j] ? 2 > ax ? -E.ieOffsetX : -E.ieOffsetY : 2 > ax ? W - E.ieOffsetX : Q - E.ieOffsetY, N[j] = (E[j] = Math.round(K - k * (0 === ax || 2 === ax ? 1 : D))) + "px"
                            }
                        }
                    }
                },
                bG = bm.set3DTransformRatio = function(V) {
                    var bS, bO, ae, Y, bK, bW, bJ, bM, bP, U, bR, bX, bU, bT, bL, bQ, Q, J, K, p, M, bV, E, q = this.data,
                        B = this.t.style,
                        Z = q.rotation * bb,
                        bN = q.scaleX,
                        F = q.scaleY,
                        be = q.scaleZ,
                        W = q.x,
                        H = q.y,
                        G = q.z,
                        I = q.perspective;
                    if (!(1 !== V && 0 !== V || "auto" !== q.force3D || q.rotationY || q.rotationX || 1 !== be || I || G)) {
                        return af.call(this, V), void 0
                    }
                    if (az) {
                        var j = 0.0001;
                        j > bN && bN > -j && (bN = be = 0.00002), j > F && F > -j && (F = be = 0.00002), !I || q.z || q.rotationX || q.rotationY || (I = 0)
                    }
                    if (Z || q.skewX) {
                        J = Math.cos(Z), K = Math.sin(Z), bS = J, bK = K, q.skewX && (Z -= q.skewX * bb, J = Math.cos(Z), K = Math.sin(Z), "simple" === q.skewType && (p = Math.tan(q.skewX * bb), p = Math.sqrt(1 + p * p), J *= p, K *= p)), bO = -K, bW = J
                    } else {
                        if (!(q.rotationY || q.rotationX || 1 !== be || I || q.svg)) {
                            return B[bH] = (q.xPercent || q.yPercent ? "translate(" + q.xPercent + "%," + q.yPercent + "%) translate3d(" : "translate3d(") + W + "px," + H + "px," + G + "px)" + (1 !== bN || 1 !== F ? " scale(" + bN + "," + F + ")" : ""), void 0
                        }
                        bS = bW = 1, bO = bK = 0
                    }
                    bR = 1, ae = Y = bJ = bM = bP = U = bX = bU = bT = 0, bL = I ? -1 / I : 0, bQ = q.zOrigin, Q = 100000, Z = q.rotationY * bb, Z && (J = Math.cos(Z), K = Math.sin(Z), bP = bR * -K, bU = bL * -K, ae = bS * K, bJ = bK * K, bR *= J, bL *= J, bS *= J, bK *= J), Z = q.rotationX * bb, Z && (J = Math.cos(Z), K = Math.sin(Z), p = bO * J + ae * K, M = bW * J + bJ * K, bV = U * J + bR * K, E = bT * J + bL * K, ae = bO * -K + ae * J, bJ = bW * -K + bJ * J, bR = U * -K + bR * J, bL = bT * -K + bL * J, bO = p, bW = M, U = bV, bT = E), 1 !== be && (ae *= be, bJ *= be, bR *= be, bL *= be), 1 !== F && (bO *= F, bW *= F, U *= F, bT *= F), 1 !== bN && (bS *= bN, bK *= bN, bP *= bN, bU *= bN), bQ && (bX -= bQ, Y = ae * bX, bM = bJ * bX, bX = bR * bX + bQ), q.svg && (Y += q.xOrigin - (q.xOrigin * bS + q.yOrigin * bO), bM += q.yOrigin - (q.xOrigin * bK + q.yOrigin * bW)), Y = (p = (Y += W) - (Y |= 0)) ? (0 | p * Q + (0 > p ? -0.5 : 0.5)) / Q + Y : Y, bM = (p = (bM += H) - (bM |= 0)) ? (0 | p * Q + (0 > p ? -0.5 : 0.5)) / Q + bM : bM, bX = (p = (bX += G) - (bX |= 0)) ? (0 | p * Q + (0 > p ? -0.5 : 0.5)) / Q + bX : bX, B[bH] = (q.xPercent || q.yPercent ? "translate(" + q.xPercent + "%," + q.yPercent + "%) matrix3d(" : "matrix3d(") + [(0 | bS * Q) / Q, (0 | bK * Q) / Q, (0 | bP * Q) / Q, (0 | bU * Q) / Q, (0 | bO * Q) / Q, (0 | bW * Q) / Q, (0 | U * Q) / Q, (0 | bT * Q) / Q, (0 | ae * Q) / Q, (0 | bJ * Q) / Q, (0 | bR * Q) / Q, (0 | bL * Q) / Q, Y, bM, bX, I ? 1 + -bX / I : 1].join(",") + ")"
                },
                af = bm.set2DTransformRatio = function(F) {
                    var z, w, b, G, k, C, j, v, x, E, y, g = this.data,
                        D = this.t,
                        B = D.style,
                        A = g.x,
                        q = g.y;
                    return !(g.rotationX || g.rotationY || g.z || g.force3D === !0 || "auto" === g.force3D && 1 !== F && 0 !== F) || g.svg && am || !a2 ? (G = g.scaleX, k = g.scaleY, g.rotation || g.skewX || g.svg ? (z = g.rotation * bb, w = z - g.skewX * bb, b = 100000, C = Math.cos(z) * G, j = Math.sin(z) * G, v = Math.sin(w) * -k, x = Math.cos(w) * k, g.svg && (A += g.xOrigin - (g.xOrigin * C + g.yOrigin * v), q += g.yOrigin - (g.xOrigin * j + g.yOrigin * x), y = 0.000001, y > A && A > -y && (A = 0), y > q && q > -y && (q = 0)), E = (0 | C * b) / b + "," + (0 | j * b) / b + "," + (0 | v * b) / b + "," + (0 | x * b) / b + "," + A + "," + q + ")", g.svg && am ? D.setAttribute("transform", "matrix(" + E) : B[bH] = (g.xPercent || g.yPercent ? "translate(" + g.xPercent + "%," + g.yPercent + "%) matrix(" : "matrix(") + E) : B[bH] = (g.xPercent || g.yPercent ? "translate(" + g.xPercent + "%," + g.yPercent + "%) matrix(" : "matrix(") + G + ",0,0," + k + "," + A + "," + q + ")", void 0) : (this.setRatio = bG, bG.call(this, F), void 0)
                };
            bw("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                parser: function(s, I, E, w, B, A, D) {
                    if (w._transform) {
                        return B
                    }
                    var F, q, H, z, L, K, J, C = w._transform = bD(s, av, !0, D.parseTransform),
                        G = s.style,
                        k = 0.000001,
                        b = bA.length,
                        j = D,
                        a = {};
                    if ("string" == typeof j.transform && bH) {
                        H = aX.style, H[bH] = j.transform, H.display = "block", H.position = "absolute", an.body.appendChild(aX), F = bD(aX, null, !1), an.body.removeChild(aX)
                    } else {
                        if ("object" == typeof j) {
                            if (F = {
                                    scaleX: bF(null != j.scaleX ? j.scaleX : j.scale, C.scaleX),
                                    scaleY: bF(null != j.scaleY ? j.scaleY : j.scale, C.scaleY),
                                    scaleZ: bF(j.scaleZ, C.scaleZ),
                                    x: bF(j.x, C.x),
                                    y: bF(j.y, C.y),
                                    z: bF(j.z, C.z),
                                    xPercent: bF(j.xPercent, C.xPercent),
                                    yPercent: bF(j.yPercent, C.yPercent),
                                    perspective: bF(j.transformPerspective, C.perspective)
                                }, J = j.directionalRotation, null != J) {
                                if ("object" == typeof J) {
                                    for (H in J) {
                                        j[H] = J[H]
                                    }
                                } else {
                                    j.rotation = J
                                }
                            }
                            "string" == typeof j.x && -1 !== j.x.indexOf("%") && (F.x = 0, F.xPercent = bF(j.x, C.xPercent)), "string" == typeof j.y && -1 !== j.y.indexOf("%") && (F.y = 0, F.yPercent = bF(j.y, C.yPercent)), F.rotation = bx("rotation" in j ? j.rotation : "shortRotation" in j ? j.shortRotation + "_short" : "rotationZ" in j ? j.rotationZ : C.rotation, C.rotation, "rotation", a), a2 && (F.rotationX = bx("rotationX" in j ? j.rotationX : "shortRotationX" in j ? j.shortRotationX + "_short" : C.rotationX || 0, C.rotationX, "rotationX", a), F.rotationY = bx("rotationY" in j ? j.rotationY : "shortRotationY" in j ? j.shortRotationY + "_short" : C.rotationY || 0, C.rotationY, "rotationY", a)), F.skewX = null == j.skewX ? C.skewX : bx(j.skewX, C.skewX), F.skewY = null == j.skewY ? C.skewY : bx(j.skewY, C.skewY), (q = F.skewY - C.skewY) && (F.skewX += q, F.rotation += q)
                        }
                    }
                    for (a2 && null != j.force3D && (C.force3D = j.force3D, K = !0), C.skewType = j.skewType || C.skewType || aT.defaultSkewType, L = C.force3D || C.z || C.rotationX || C.rotationY || F.z || F.rotationX || F.rotationY || F.perspective, L || null == j.scale || (F.scaleZ = 1); --b > -1;) {
                        E = bA[b], z = F[E] - C[E], (z > k || -k > z || null != j[E] || null != a9[E]) && (K = !0, B = new al(C, E, C[E], z, B), E in a && (B.e = a[E]), B.xs0 = 0, B.plugin = A, w._overwriteProps.push(B.n))
                    }
                    return z = j.transformOrigin, z && C.svg && (bp(s, z, F), B = new al(C, "xOrigin", C.xOrigin, F.xOrigin - C.xOrigin, B, -1, "transformOrigin"), B.b = C.xOrigin, B.e = B.xs0 = F.xOrigin, B = new al(C, "yOrigin", C.yOrigin, F.yOrigin - C.yOrigin, B, -1, "transformOrigin"), B.b = C.yOrigin, B.e = B.xs0 = F.yOrigin, z = "0px 0px"), (z || a2 && L && C.zOrigin) && (bH ? (K = !0, E = ag, z = (z || bj(s, E, av, !1, "50% 50%")) + "", B = new al(G, E, 0, 0, B, -1, "transformOrigin"), B.b = G[E], B.plugin = A, a2 ? (H = C.zOrigin, z = z.split(" "), C.zOrigin = (z.length > 2 && (0 === H || "0px" !== z[2]) ? parseFloat(z[2]) : H) || 0, B.xs0 = B.e = z[0] + " " + (z[1] || "50%") + " 0px", B = new al(C, "zOrigin", 0, 0, B, -1, B.n), B.b = H, B.xs0 = B.e = C.zOrigin) : B.xs0 = B.e = z) : ab(z + "", C)), K && (w._transformType = C.svg && am || !L && 3 !== this._transformType ? 2 : 3), B
                },
                prefix: !0
            }), bw("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), bw("borderRadius", {
                defaultValue: "0px",
                parser: function(B, L, H, E, Q) {
                    L = this.format(L);
                    var D, G, I, A, K, C, R, N, M, F, J, z, q, r, j, s, O = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        k = B.style;
                    for (M = parseFloat(B.offsetWidth), F = parseFloat(B.offsetHeight), D = L.split(" "), G = 0; O.length > G; G++) {
                        this.p.indexOf("border") && (O[G] = aZ(O[G])), K = A = bj(B, O[G], av, !1, "0px"), -1 !== K.indexOf(" ") && (A = K.split(" "), K = A[0], A = A[1]), C = I = D[G], R = parseFloat(K), z = K.substr((R + "").length), q = "=" === C.charAt(1), q ? (N = parseInt(C.charAt(0) + "1", 10), C = C.substr(2), N *= parseFloat(C), J = C.substr((N + "").length - (0 > N ? 1 : 0)) || "") : (N = parseFloat(C), J = C.substr((N + "").length)), "" === J && (J = aw[H] || z), J !== z && (r = bk(B, "borderLeft", R, z), j = bk(B, "borderTop", R, z), "%" === J ? (K = 100 * (r / M) + "%", A = 100 * (j / F) + "%") : "em" === J ? (s = bk(B, "borderLeft", 1, "em"), K = r / s + "em", A = j / s + "em") : (K = r + "px", A = j + "px"), q && (C = parseFloat(K) + N + J, I = parseFloat(A) + N + J)), Q = aa(k, O[G], K + " " + A, C + " " + I, !1, "0px", Q)
                    }
                    return Q
                },
                prefix: !0,
                formatter: a8("0px 0px 0px 0px", !1, !0)
            }), bw("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(E, z, v, b, k, B) {
                    var j, s, w, D, y, c, C = "background-position",
                        A = av || ay(E, null),
                        q = this.format((A ? aP ? A.getPropertyValue(C + "-x") + " " + A.getPropertyValue(C + "-y") : A.getPropertyValue(C) : E.currentStyle.backgroundPositionX + " " + E.currentStyle.backgroundPositionY) || "0 0"),
                        x = this.format(z);
                    if (-1 !== q.indexOf("%") != (-1 !== x.indexOf("%")) && (c = bj(E, "backgroundImage").replace(a4, ""), c && "none" !== c)) {
                        for (j = q.split(" "), s = x.split(" "), bg.setAttribute("src", c), w = 2; --w > -1;) {
                            q = j[w], D = -1 !== q.indexOf("%"), D !== (-1 !== s[w].indexOf("%")) && (y = 0 === w ? E.offsetWidth - bg.width : E.offsetHeight - bg.height, j[w] = D ? parseFloat(q) / 100 * y + "px" : 100 * (parseFloat(q) / y) + "%")
                        }
                        q = j.join(" ")
                    }
                    return this.parseComplex(E.style, q, x, k, B)
                },
                formatter: ab
            }), bw("backgroundSize", {
                defaultValue: "0 0",
                formatter: ab
            }), bw("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), bw("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), bw("transformStyle", {
                prefix: !0
            }), bw("backfaceVisibility", {
                prefix: !0
            }), bw("userSelect", {
                prefix: !0
            }), bw("margin", {
                parser: aQ("marginTop,marginRight,marginBottom,marginLeft")
            }), bw("padding", {
                parser: aQ("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), bw("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(p, k, g, b, d, m) {
                    var c, f, j;
                    return 9 > aP ? (f = p.currentStyle, j = 8 > aP ? " " : ",", c = "rect(" + f.clipTop + j + f.clipRight + j + f.clipBottom + j + f.clipLeft + ")", k = this.format(k).split(",").join(j)) : (c = this.format(bj(p, this.p, av, !1, this.dflt)), k = this.format(k)), this.parseComplex(p.style, c, k, d, m)
                }
            }), bw("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), bw("autoRound,strictUnits", {
                parser: function(b, f, a, d, c) {
                    return c
                }
            }), bw("border", {
                defaultValue: "0px solid #000",
                parser: function(d, g, c, f, h, b) {
                    return this.parseComplex(d.style, this.format(bj(d, "borderTopWidth", av, !1, "0px") + " " + bj(d, "borderTopStyle", av, !1, "solid") + " " + bj(d, "borderTopColor", av, !1, "#000")), this.format(g), h, b)
                },
                color: !0,
                formatter: function(a) {
                    var b = a.split(" ");
                    return b[0] + " " + (b[1] || "solid") + " " + (a.match(bE) || ["#000"])[0]
                }
            }), bw("borderWidth", {
                parser: aQ("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), bw("float,cssFloat,styleFloat", {
                parser: function(d, h, c, g, f) {
                    var j = d.style,
                        b = "cssFloat" in j ? "cssFloat" : "styleFloat";
                    return new al(j, b, 0, 0, f, -1, c, !1, 0, j[b], h)
                }
            });
            var by = function(b) {
                var f, a = this.t,
                    d = a.filter || bj(this.data, "filter") || "",
                    c = 0 | this.s + this.c * b;
                100 === c && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (a.removeAttribute("filter"), f = !bj(this.data, "filter")) : (a.filter = d.replace(aq, ""), f = !0)), f || (this.xn1 && (a.filter = d = d || "alpha(opacity=" + c + ")"), -1 === d.indexOf("pacity") ? 0 === c && this.xn1 || (a.filter = d + " alpha(opacity=" + c + ")") : a.filter = d.replace(ap, "opacity=" + c))
            };
            bw("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(p, k, g, b, d, m) {
                    var c = parseFloat(bj(p, "opacity", av, !1, "1")),
                        f = p.style,
                        j = "autoAlpha" === g;
                    return "string" == typeof k && "=" === k.charAt(1) && (k = ("-" === k.charAt(0) ? -1 : 1) * parseFloat(k.substr(2)) + c), j && 1 === c && "hidden" === bj(p, "visibility", av) && 0 !== k && (c = 0), aW ? d = new al(f, "opacity", c, k - c, d) : (d = new al(f, "opacity", 100 * c, 100 * (k - c), d), d.xn1 = j ? 1 : 0, f.zoom = 1, d.type = 2, d.b = "alpha(opacity=" + d.s + ")", d.e = "alpha(opacity=" + (d.s + d.c) + ")", d.data = p, d.plugin = m, d.setRatio = by), j && (d = new al(f, "visibility", 0, 0, d, -1, null, !1, 0, 0 !== c ? "inherit" : "hidden", 0 === k ? "hidden" : "inherit"), d.xs0 = "inherit", b._overwriteProps.push(d.n), b._overwriteProps.push(g)), d
                }
            });
            var bt = function(a, b) {
                    b && (a.removeProperty ? ("ms" === b.substr(0, 2) && (b = "M" + b.substr(1)), a.removeProperty(b.replace(a6, "-$1").toLowerCase())) : a.removeAttribute(b))
                },
                ai = function(b) {
                    if (this.t._gsClassPT = this, 1 === b || 0 === b) {
                        this.t.setAttribute("class", 0 === b ? this.b : this.e);
                        for (var c = this.data, a = this.t.style; c;) {
                            c.v ? a[c.p] = c.v : bt(a, c.p), c = c._next
                        }
                        1 === b && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else {
                        this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    }
                };
            bw("className", {
                parser: function(A, s, b, j, x, i, k) {
                    var m, z, q, g, y, w = A.getAttribute("class") || "",
                        v = A.style.cssText;
                    if (x = j._classNamePT = new al(A, b, 0, 0, x, 2), x.setRatio = ai, x.pr = -11, aI = !0, x.b = w, z = aV(A, av), q = A._gsClassPT) {
                        for (g = {}, y = q.data; y;) {
                            g[y.p] = 1, y = y._next
                        }
                        q.setRatio(1)
                    }
                    return A._gsClassPT = x, x.e = "=" !== s.charAt(1) ? s : w.replace(RegExp("\\s*\\b" + s.substr(2) + "\\b"), "") + ("+" === s.charAt(0) ? " " + s.substr(2) : ""), j._tween._duration && (A.setAttribute("class", x.e), m = bz(A, z, aV(A), k, g), A.setAttribute("class", w), x.data = m.firstMPT, A.style.cssText = v, x = x.xfirst = j.parse(A, m.difs, x, i)), x
                }
            });
            var bi = function(d) {
                if ((1 === d || 0 === d) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var h, c, g, f, j = this.t.style,
                        b = aA.transform.parse;
                    if ("all" === this.e) {
                        j.cssText = "", f = !0
                    } else {
                        for (h = this.e.split(" ").join("").split(","), g = h.length; --g > -1;) {
                            c = h[g], aA[c] && (aA[c].parse === b ? f = !0 : c = "transformOrigin" === c ? ag : aA[c].p), bt(j, c)
                        }
                    }
                    f && (bt(j, bH), this.t._gsTransform && delete this.t._gsTransform)
                }
            };
            for (bw("clearProps", {
                    parser: function(a, d, c, b, f) {
                        return f = new al(a, c, 0, 0, f, 2), f.setRatio = bi, f.e = d, f.pr = -10, f.data = b._tween, aI = !0, f
                    }
                }), aF = "bezier,throwProps,physicsProps,physics2D".split(","), ax = aF.length; ax--;) {
                bv(aF[ax])
            }
            aF = aT.prototype, aF._firstPT = null, aF._onInitTween = function(z, j, b) {
                if (!z.nodeType) {
                    return !1
                }
                this._target = z, this._tween = b, this._vars = j, aJ = j.autoRound, aI = !1, aw = j.suffixMap || aT.suffixMap, av = ay(z, ""), aB = this._overwriteProps;
                var h, a, n, k, f, i, u, q, r, s = z.style;
                if (at && "" === s.zIndex && (h = bj(z, "zIndex", av), ("auto" === h || "" === h) && this._addLazySet(s, "zIndex", 0)), "string" == typeof j && (k = s.cssText, h = aV(z, av), s.cssText = k + ";" + j, h = bz(z, h, aV(z)).difs, !aW && a1.test(j) && (h.opacity = parseFloat(RegExp.$1)), j = h, s.cssText = k), this._firstPT = a = this.parse(z, j, null), this._transformType) {
                    for (r = 3 === this._transformType, bH ? aM && (at = !0, "" === s.zIndex && (u = bj(z, "zIndex", av), ("auto" === u || "" === u) && this._addLazySet(s, "zIndex", 0)), aU && this._addLazySet(s, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (r ? "visible" : "hidden"))) : s.zoom = 1, n = a; n && n._next;) {
                        n = n._next
                    }
                    q = new al(z, "transform", 0, 0, null, 2), this._linkCSSP(q, null, n), q.setRatio = r && a2 ? bG : bH ? af : aE, q.data = this._transform || bD(z, av, !0), aB.pop()
                }
                if (aI) {
                    for (; a;) {
                        for (i = a._next, n = k; n && n.pr > a.pr;) {
                            n = n._next
                        }(a._prev = n ? n._prev : f) ? a._prev._next = a: k = a, (a._next = n) ? n._prev = a : f = a, a = i
                    }
                    this._firstPT = k
                }
                return !0
            }, aF.parse = function(C, s, o, h) {
                var y, k, B, r, b, A, x, w, j, q, z = C.style;
                for (y in s) {
                    A = s[y], k = aA[y], k ? o = k.parse(C, A, y, this, o, h, s) : (b = bj(C, y, av) + "", j = "string" == typeof A, "color" === y || "fill" === y || "stroke" === y || -1 !== y.indexOf("Color") || j && aS.test(A) ? (j || (A = aK(A), A = (A.length > 3 ? "rgba(" : "rgb(") + A.join(",") + ")"), o = aa(z, y, b, A, !0, "transparent", o, 0, h)) : !j || -1 === A.indexOf(" ") && -1 === A.indexOf(",") ? (B = parseFloat(b), x = B || 0 === B ? b.substr((B + "").length) : "", ("" === b || "auto" === b) && ("width" === y || "height" === y ? (B = bo(C, y, av), x = "px") : "left" === y || "top" === y ? (B = a5(C, y, av), x = "px") : (B = "opacity" !== y ? 0 : 1, x = "")), q = j && "=" === A.charAt(1), q ? (r = parseInt(A.charAt(0) + "1", 10), A = A.substr(2), r *= parseFloat(A), w = A.replace(ao, "")) : (r = parseFloat(A), w = j ? A.substr((r + "").length) || "" : ""), "" === w && (w = y in aw ? aw[y] : x), A = r || 0 === r ? (q ? r + B : r) + w : s[y], x !== w && "" !== w && (r || 0 === r) && B && (B = bk(C, y, B, x), "%" === w ? (B /= bk(C, y, 100, "%") / 100, s.strictUnits !== !0 && (b = B + "%")) : "em" === w ? B /= bk(C, y, 1, "em") : "px" !== w && (r = bk(C, y, r, w), w = "px"), q && (r || 0 === r) && (A = r + B + w)), q && (r += B), !B && 0 !== B || !r && 0 !== r ? void 0 !== z[y] && (A || "NaN" != A + "" && null != A) ? (o = new al(z, y, r || B || 0, 0, o, -1, y, !1, 0, b, A), o.xs0 = "none" !== A || "display" !== y && -1 === y.indexOf("Style") ? A : b) : a0("invalid " + y + " tween value: " + s[y]) : (o = new al(z, y, B, r - B, o, 0, y, aJ !== !1 && ("px" === w || "zIndex" === y), 0, b, A), o.xs0 = w)) : o = aa(z, y, b, A, !0, null, o, 0, h)), h && o && !o.plugin && (o.plugin = h)
                }
                return o
            }, aF.setRatio = function(b) {
                var f, a, d, c = this._firstPT,
                    g = 0.000001;
                if (1 !== b || this._tween._time !== this._tween._duration && 0 !== this._tween._time) {
                    if (b || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001) {
                        for (; c;) {
                            if (f = c.c * b + c.s, c.r ? f = Math.round(f) : g > f && f > -g && (f = 0), c.type) {
                                if (1 === c.type) {
                                    if (d = c.l, 2 === d) {
                                        c.t[c.p] = c.xs0 + f + c.xs1 + c.xn1 + c.xs2
                                    } else {
                                        if (3 === d) {
                                            c.t[c.p] = c.xs0 + f + c.xs1 + c.xn1 + c.xs2 + c.xn2 + c.xs3
                                        } else {
                                            if (4 === d) {
                                                c.t[c.p] = c.xs0 + f + c.xs1 + c.xn1 + c.xs2 + c.xn2 + c.xs3 + c.xn3 + c.xs4
                                            } else {
                                                if (5 === d) {
                                                    c.t[c.p] = c.xs0 + f + c.xs1 + c.xn1 + c.xs2 + c.xn2 + c.xs3 + c.xn3 + c.xs4 + c.xn4 + c.xs5
                                                } else {
                                                    for (a = c.xs0 + f + c.xs1, d = 1; c.l > d; d++) {
                                                        a += c["xn" + d] + c["xs" + (d + 1)]
                                                    }
                                                    c.t[c.p] = a
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    -1 === c.type ? c.t[c.p] = c.xs0 : c.setRatio && c.setRatio(b)
                                }
                            } else {
                                c.t[c.p] = f + c.xs0
                            }
                            c = c._next
                        }
                    } else {
                        for (; c;) {
                            2 !== c.type ? c.t[c.p] = c.b : c.setRatio(b), c = c._next
                        }
                    }
                } else {
                    for (; c;) {
                        2 !== c.type ? c.t[c.p] = c.e : c.setRatio(b), c = c._next
                    }
                }
            }, aF._enableTransforms = function(a) {
                this._transform = this._transform || bD(this._target, av, !0), this._transformType = this._transform.svg && am || !a && 3 !== this._transformType ? 2 : 3
            };
            var ak = function() {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            aF._addLazySet = function(b, d, a) {
                var c = this._firstPT = new al(b, d, 0, 0, this._firstPT, 2);
                c.e = a, c.setRatio = ak, c.data = this
            }, aF._linkCSSP = function(b, d, a, c) {
                return b && (d && (d._prev = b), b._next && (b._next._prev = b._prev), b._prev ? b._prev._next = b._next : this._firstPT === b && (this._firstPT = b._next, c = !0), a ? a._next = b : c || null !== this._firstPT || (this._firstPT = b), b._next = d, b._prev = a), b
            }, aF._kill = function(d) {
                var a, c, b, f = d;
                if (d.autoAlpha || d.alpha) {
                    f = {};
                    for (c in d) {
                        f[c] = d[c]
                    }
                    f.opacity = 1, f.autoAlpha && (f.visibility = 1)
                }
                return d.className && (a = this._classNamePT) && (b = a.xfirst, b && b._prev ? this._linkCSSP(b._prev, a._next, b._prev._prev) : b === this._firstPT && (this._firstPT = a._next), a._next && this._linkCSSP(a._next, a._next._next, b._prev), this._classNamePT = null), au.prototype._kill.call(this, f)
            };
            var ad = function(d, h, c) {
                var g, f, j, b;
                if (d.slice) {
                    for (f = d.length; --f > -1;) {
                        ad(d[f], h, c)
                    }
                } else {
                    for (g = d.childNodes, f = g.length; --f > -1;) {
                        j = g[f], b = j.type, j.style && (h.push(aV(j)), c && c.push(j)), 1 !== b && 9 !== b && 11 !== b || !j.childNodes.length || ad(j, h, c)
                    }
                }
            };
            return aT.cascadeTo = function(x, k, b) {
                var y, g, v, d = aN.to(x, k, b),
                    j = [d],
                    m = [],
                    w = [],
                    q = [],
                    c = aN._internals.reservedProps;
                for (x = d._targets || d.target, ad(x, m, q), d.render(k, !0), ad(x, w), d.render(0, !0), d._enabled(!0), y = q.length; --y > -1;) {
                    if (g = bz(q[y], m[y], w[y]), g.firstMPT) {
                        g = g.difs;
                        for (v in b) {
                            c[v] && (g[v] = b[v])
                        }
                        j.push(aN.to(q[y], k, g))
                    }
                }
                return j
            }, au.activate([aT]), aT
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(a) {
        var b = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[a]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = b())
    }("CSSPlugin");
/*!
 * VERSION: beta 0.3.3
 * DATE: 2014-10-29
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2014, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(function(w) {
    var J = w.GreenSockGlobals || w,
        F = function(c) {
            var a, d = c.split("."),
                f = J;
            for (a = 0; d.length > a; a++) {
                f[d[a]] = f = f[d[a]] || {}
            }
            return f
        },
        x = F("com.greensock.utils"),
        z = function(c) {
            var d = c.nodeType,
                a = "";
            if (1 === d || 9 === d || 11 === d) {
                if ("string" == typeof c.textContent) {
                    return c.textContent
                }
                for (c = c.firstChild; c; c = c.nextSibling) {
                    a += z(c)
                }
            } else {
                if (3 === d || 4 === d) {
                    return c.nodeValue
                }
            }
            return a
        },
        C = document,
        M = C.defaultView ? C.defaultView.getComputedStyle : function() {},
        B = /([A-Z])/g,
        G = function(c, g, a, d) {
            var f;
            return (a = a || M(c, null)) ? (c = a.getPropertyValue(g.replace(B, "-$1").toLowerCase()), f = c || a.length ? c : a[g]) : c.currentStyle && (a = c.currentStyle, f = a[g]), d ? f : parseInt(f, 10) || 0
        },
        E = function(a) {
            return a.length && a[0] && (a[0].nodeType && a[0].style && !a.nodeType || a[0].length && a[0][0]) ? !0 : !1
        },
        N = function(c) {
            var g, a, d, f = [],
                h = c.length;
            for (g = 0; h > g; g++) {
                if (a = c[g], E(a)) {
                    for (d = a.length, d = 0; a.length > d; d++) {
                        f.push(a[d])
                    }
                } else {
                    f.push(a)
                }
            }
            return f
        },
        q = ")eefec303079ad17405c",
        L = /(?:<br>|<br\/>|<br \/>)/gi,
        A = C.all && !C.addEventListener,
        I = "<div style='position:relative;display:inline-block;" + (A ? "*display:inline;*zoom:1;'" : "'"),
        D = function(c) {
            c = c || "";
            var d = -1 !== c.indexOf("++"),
                a = 1;
            return d && (c = c.split("++").join("")),
                function() {
                    return I + (c ? " class='" + c + (d ? a++ : "") + "'>" : ">")
                }
        },
        K = x.SplitText = J.SplitText = function(a, c) {
            if ("string" == typeof a && (a = K.selector(a)), !a) {
                throw "cannot split a null element."
            }
            this.elements = E(a) ? N(a) : [a], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = c || {}, this.split(c)
        },
        H = function(c, f, a) {
            var d = c.nodeType;
            if (1 === d || 9 === d || 11 === d) {
                for (c = c.firstChild; c; c = c.nextSibling) {
                    H(c, f, a)
                }
            } else {
                (3 === d || 4 === d) && (c.nodeValue = c.nodeValue.split(f).join(a))
            }
        },
        k = function(c, d) {
            for (var a = d.length; --a > -1;) {
                c.push(d[a])
            }
        },
        j = function(ay, aI, aG, az, aC) {
            L.test(ay.innerHTML) && (ay.innerHTML = ay.innerHTML.replace(L, q));
            var aD, aL, aB, aH, aJ, av, u, ax, aK, aw, ac, v, ap, aE, aa = z(ay),
                ar = aI.type || aI.split || "chars,words,lines",
                ad = -1 !== ar.indexOf("lines") ? [] : null,
                ao = -1 !== ar.indexOf("words"),
                af = -1 !== ar.indexOf("chars"),
                ag = "absolute" === aI.position || aI.absolute === !0,
                au = ag ? "&#173; " : " ",
                aj = -999,
                an = M(ay),
                ae = G(ay, "paddingLeft", an),
                am = G(ay, "borderBottomWidth", an) + G(ay, "borderTopWidth", an),
                g = G(ay, "borderLeftWidth", an) + G(ay, "borderRightWidth", an),
                r = G(ay, "paddingTop", an) + G(ay, "paddingBottom", an),
                aq = G(ay, "paddingLeft", an) + G(ay, "paddingRight", an),
                aF = G(ay, "textAlign", an, !0),
                c = ay.clientHeight,
                aA = ay.clientWidth,
                al = "</div>",
                n = D(aI.wordsClass),
                ab = D(aI.charsClass),
                m = -1 !== (aI.linesClass || "").indexOf("++"),
                ak = aI.linesClass,
                a = -1 !== aa.indexOf("<"),
                at = !0,
                ah = [],
                ai = [],
                h = [];
            for (m && (ak = ak.split("++").join("")), a && (aa = aa.split("<").join("{{LT}}")), aD = aa.length, aH = n(), aJ = 0; aD > aJ; aJ++) {
                if (u = aa.charAt(aJ), ")" === u && aa.substr(aJ, 20) === q) {
                    aH += (at ? al : "") + "<BR/>", at = !1, aJ !== aD - 20 && aa.substr(aJ + 20, 20) !== q && (aH += " " + n(), at = !0), aJ += 19
                } else {
                    if (" " === u && " " !== aa.charAt(aJ - 1) && aJ !== aD - 1 && aa.substr(aJ - 20, 20) !== q) {
                        for (aH += at ? al : "", at = !1;
                            " " === aa.charAt(aJ + 1);) {
                            aH += au, aJ++
                        }(")" !== aa.charAt(aJ + 1) || aa.substr(aJ + 1, 20) !== q) && (aH += au + n(), at = !0)
                    } else {
                        aH += af && " " !== u ? ab() + u + "</div>" : u
                    }
                }
            }
            for (ay.innerHTML = aH + (at ? al : ""), a && H(ay, "{{LT}}", "<"), av = ay.getElementsByTagName("*"), aD = av.length, ax = [], aJ = 0; aD > aJ; aJ++) {
                ax[aJ] = av[aJ]
            }
            if (ad || ag) {
                for (aJ = 0; aD > aJ; aJ++) {
                    aK = ax[aJ], aB = aK.parentNode === ay, (aB || ag || af && !ao) && (aw = aK.offsetTop, ad && aB && aw !== aj && "BR" !== aK.nodeName && (aL = [], ad.push(aL), aj = aw), ag && (aK._x = aK.offsetLeft, aK._y = aw, aK._w = aK.offsetWidth, aK._h = aK.offsetHeight), ad && (ao !== aB && af || (aL.push(aK), aK._x -= ae), aB && aJ && (ax[aJ - 1]._wordEnd = !0), "BR" === aK.nodeName && aK.nextSibling && "BR" === aK.nextSibling.nodeName && ad.push([])))
                }
            }
            for (aJ = 0; aD > aJ; aJ++) {
                aK = ax[aJ], aB = aK.parentNode === ay, "BR" !== aK.nodeName ? (ag && (v = aK.style, ao || aB || (aK._x += aK.parentNode._x, aK._y += aK.parentNode._y), v.left = aK._x + "px", v.top = aK._y + "px", v.position = "absolute", v.display = "block", v.width = aK._w + 1 + "px", v.height = aK._h + "px"), ao ? aB && "" !== aK.innerHTML ? ai.push(aK) : af && ah.push(aK) : aB ? (ay.removeChild(aK), ax.splice(aJ--, 1), aD--) : !aB && af && (aw = !ad && !ag && aK.nextSibling, ay.appendChild(aK), aw || ay.appendChild(C.createTextNode(" ")), ah.push(aK))) : ad || ag ? (ay.removeChild(aK), ax.splice(aJ--, 1), aD--) : ao || ay.appendChild(aK)
            }
            if (ad) {
                for (ag && (ac = C.createElement("div"), ay.appendChild(ac), ap = ac.offsetWidth + "px", aw = ac.offsetParent === ay ? 0 : ay.offsetLeft, ay.removeChild(ac)), v = ay.style.cssText, ay.style.cssText = "display:none;"; ay.firstChild;) {
                    ay.removeChild(ay.firstChild)
                }
                for (aE = !ag || !ao && !af, aJ = 0; ad.length > aJ; aJ++) {
                    for (aL = ad[aJ], ac = C.createElement("div"), ac.style.cssText = "display:block;text-align:" + aF + ";position:" + (ag ? "absolute;" : "relative;"), ak && (ac.className = ak + (m ? aJ + 1 : "")), h.push(ac), aD = aL.length, av = 0; aD > av; av++) {
                        "BR" !== aL[av].nodeName && (aK = aL[av], ac.appendChild(aK), aE && (aK._wordEnd || ao) && ac.appendChild(C.createTextNode(" ")), ag && (0 === av && (ac.style.top = aK._y + "px", ac.style.left = ae + aw + "px"), aK.style.top = "0px", aw && (aK.style.left = aK._x - aw + "px")))
                    }
                    0 === aD && (ac.innerHTML = "&nbsp;"), ao || af || (ac.innerHTML = z(ac).split(String.fromCharCode(160)).join(" ")), ag && (ac.style.width = ap, ac.style.height = aK._h + "px"), ay.appendChild(ac)
                }
                ay.style.cssText = v
            }
            ag && (c > ay.clientHeight && (ay.style.height = c - r + "px", c > ay.clientHeight && (ay.style.height = c + am + "px")), aA > ay.clientWidth && (ay.style.width = aA - aq + "px", aA > ay.clientWidth && (ay.style.width = aA + g + "px"))), k(aG, ah), k(az, ai), k(aC, h)
        },
        b = K.prototype;
    b.split = function(a) {
        this.isSplit && this.revert(), this.vars = a || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var c = this.elements.length; --c > -1;) {
            this._originals[c] = this.elements[c].innerHTML, j(this.elements[c], this.vars, this.chars, this.words, this.lines)
        }
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, b.revert = function() {
        if (!this._originals) {
            throw "revert() call wasn't scoped properly."
        }
        for (var a = this._originals.length; --a > -1;) {
            this.elements[a].innerHTML = this._originals[a]
        }
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, K.selector = w.$ || w.jQuery || function(c) {
        var a = w.$ || w.jQuery;
        return a ? (K.selector = a, a(c)) : "undefined" == typeof document ? c : document.querySelectorAll ? document.querySelectorAll(c) : document.getElementById("#" === c.charAt(0) ? c.substr(1) : c)
    }, K.version = "0.3.3"
})(_gsScope),
function(a) {
    var b = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[a]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (module.exports = b())
}("SplitText");
try {
    window.GreenSockGlobals = null;
    window._gsQueue = null;
    window._gsDefine = null;
    delete(window.GreenSockGlobals);
    delete(window._gsQueue);
    delete(window._gsDefine)
} catch (e) {}
try {
    window.GreenSockGlobals = oldgs;
    window._gsQueue = oldgs_queue
} catch (e) {}
if (window.tplogs == true) {
    try {
        console.groupEnd()
    } catch (e) {}
}(function(b, a) {
    b.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
    };
    b.expr[":"].uncached = function(c) {
        var d = document.createElement("img");
        d.src = c.src;
        return b(c).is('img[src!=""]') && !d.complete
    };
    b.fn.waitForImages = function(c, f, d) {
        if (b.isPlainObject(arguments[0])) {
            f = c.each;
            d = c.waitForAll;
            c = c.finished
        }
        c = c || b.noop;
        f = f || b.noop;
        d = !!d;
        if (!b.isFunction(c) || !b.isFunction(f)) {
            throw new TypeError("An invalid callback was supplied.")
        }
        return this.each(function() {
            var j = b(this),
                k = [];
            if (d) {
                var n = b.waitForImages.hasImageProperties || [],
                    h = /url\((['"]?)(.*?)\1\)/g;
                j.find("*").each(function() {
                    var i = b(this);
                    if (i.is("img:uncached")) {
                        k.push({
                            src: i.attr("src"),
                            element: i[0]
                        })
                    }
                    b.each(n, function(p, q) {
                        var o = i.css(q);
                        if (!o) {
                            return true
                        }
                        var l;
                        while (l = h.exec(o)) {
                            k.push({
                                src: l[2],
                                element: i[0]
                            })
                        }
                    })
                })
            } else {
                j.find("img:uncached").each(function() {
                    k.push({
                        src: this.src,
                        element: this
                    })
                })
            }
            var m = k.length,
                g = 0;
            if (m == 0) {
                c.call(j[0])
            }
            b.each(k, function(l, i) {
                var p = new Image;
                b(p).bind("load error", function(o) {
                    g++;
                    f.call(i.element, g, m, o.type == "load");
                    if (g == m) {
                        c.call(j[0]);
                        return false
                    }
                });
                p.src = i.src
            })
        })
    }
})(jQuery);

function revslider_showDoubleJqueryError(b) {
    var a = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
    a += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
    a += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
    a += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
    a = "<span style='font-size:16px;color:#BC0C06;'>" + a + "</span>";
    jQuery(b).show().html(a)
}(function(a2, aK) {
    function aR() {
        var a = false;
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
            if (navigator.userAgent.match(/OS 4_\d like Mac OS X/i)) {
                a = true
            }
        } else {
            a = false
        }
        return a
    }

    function aM(G, R) {
        if (G == aK) {
            return false
        }
        if (G.data("aimg") != aK) {
            if (G.data("aie8") == "enabled" && a6(8) || G.data("amobile") == "enabled" && aq()) {
                G.html('<img class="tp-slider-alternative-image" src="' + G.data("aimg") + '">')
            }
        }
        if (R.navigationStyle == "preview1" || R.navigationStyle == "preview3" || R.navigationStyle == "preview4") {
            R.soloArrowLeftHalign = "left";
            R.soloArrowLeftValign = "center";
            R.soloArrowLeftHOffset = 0;
            R.soloArrowLeftVOffset = 0;
            R.soloArrowRightHalign = "right";
            R.soloArrowRightValign = "center";
            R.soloArrowRightHOffset = 0;
            R.soloArrowRightVOffset = 0;
            R.navigationArrows = "solo"
        }
        if (R.simplifyAll == "on" && (a6(8) || aR())) {
            G.find(".tp-caption").each(function() {
                var b = a2(this);
                b.removeClass("customin").removeClass("customout").addClass("fadein").addClass("fadeout");
                b.data("splitin", "");
                b.data("speed", 400)
            });
            G.find(">ul>li").each(function() {
                var b = a2(this);
                b.data("transition", "fade");
                b.data("masterspeed", 500);
                b.data("slotamount", 1);
                var f = b.find(">img").first();
                f.data("kenburns", "off")
            })
        }
        R.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
        if (R.fullWidth != "on" && R.fullScreen != "on") {
            R.autoHeight = "off"
        }
        if (R.fullScreen == "on") {
            R.autoHeight = "on"
        }
        if (R.fullWidth != "on" && R.fullScreen != "on") {
            forceFulWidth = "off"
        }
        if (R.fullWidth == "on" && R.autoHeight == "off") {
            G.css({
                maxHeight: R.startheight + "px"
            })
        }
        if (aq() && R.hideThumbsOnMobile == "on" && R.navigationType == "thumb") {
            R.navigationType = "none"
        }
        if (aq() && R.hideBulletsOnMobile == "on" && R.navigationType == "bullet") {
            R.navigationType = "none"
        }
        if (aq() && R.hideBulletsOnMobile == "on" && R.navigationType == "both") {
            R.navigationType = "none"
        }
        if (aq() && R.hideArrowsOnMobile == "on") {
            R.navigationArrows = "none"
        }
        if (R.forceFullWidth == "on" && G.closest(".forcefullwidth_wrapper_tp_banner").length == 0) {
            var V = G.parent().offset().left;
            var s = G.parent().css("marginBottom");
            var K = G.parent().css("marginTop");
            if (s == aK) {
                s = 0
            }
            if (K == aK) {
                K = 0
            }
            G.parent().wrap('<div style="position:relative;width:100%;height:auto;margin-top:' + K + ";margin-bottom:" + s + '" class="forcefullwidth_wrapper_tp_banner"></div>');
            G.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:' + G.height() + 'px"></div>');
            G.css({
                backgroundColor: G.parent().css("backgroundColor"),
                backgroundImage: G.parent().css("backgroundImage")
            });
            G.parent().css({
                left: 0 - V + "px",
                position: "absolute",
                width: a2(window).width()
            });
            R.width = a2(window).width()
        }
        try {
            if (R.hideThumbsUnderResolution > a2(window).width() && R.hideThumbsUnderResolution != 0) {
                G.parent().find(".tp-bullets.tp-thumbs").css({
                    display: "none"
                })
            } else {
                G.parent().find(".tp-bullets.tp-thumbs").css({
                    display: "block"
                })
            }
        } catch (U) {}
        if (!G.hasClass("revslider-initialised")) {
            G.addClass("revslider-initialised");
            if (G.attr("id") == aK) {
                G.attr("id", "revslider-" + Math.round(Math.random() * 1000 + 5))
            }
            R.firefox13 = false;
            R.ie = !a2.support.opacity;
            R.ie9 = document.documentMode == 9;
            R.origcd = R.delay;
            var W = a2.fn.jquery.split("."),
                q = parseFloat(W[0]),
                u = parseFloat(W[1]),
                c = parseFloat(W[2] || "0");
            if (q == 1 && u < 7) {
                G.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + W + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>")
            }
            if (q > 1) {
                R.ie = false
            }
            if (!a2.support.transition) {
                a2.fn.transition = a2.fn.animate
            }
            G.find(".caption").each(function() {
                a2(this).addClass("tp-caption")
            });
            if (aq()) {
                G.find(".tp-caption").each(function() {
                    var b = a2(this);
                    if (b.data("autoplayonlyfirsttime") == true || b.data("autoplayonlyfirsttime") == "true") {
                        b.data("autoplayonlyfirsttime", "false")
                    }
                    if (b.data("autoplay") == true || b.data("autoplay") == "true") {
                        b.data("autoplay", false)
                    }
                })
            }
            var o = 0;
            var a = 0;
            var z = 0;
            var N = "http";
            if (location.protocol === "https:") {
                N = "https"
            }
            G.find(".tp-caption").each(function(v) {
                try {
                    if ((a2(this).data("ytid") != aK || a2(this).find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && o == 0) {
                        o = 1;
                        var k = document.createElement("script");
                        var g = "https";
                        k.src = g + "://www.youtube.com/iframe_api";
                        var j = document.getElementsByTagName("script")[0];
                        var m = true;
                        a2("head").find("*").each(function() {
                            if (a2(this).attr("src") == g + "://www.youtube.com/iframe_api") {
                                m = false
                            }
                        });
                        if (m) {
                            j.parentNode.insertBefore(k, j)
                        }
                    }
                } catch (f) {}
                try {
                    if ((a2(this).data("vimeoid") != aK || a2(this).find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && a == 0) {
                        a = 1;
                        var b = document.createElement("script");
                        b.src = N + "://a.vimeocdn.com/js/froogaloop2.min.js";
                        var j = document.getElementsByTagName("script")[0];
                        var m = true;
                        a2("head").find("*").each(function() {
                            if (a2(this).attr("src") == N + "://a.vimeocdn.com/js/froogaloop2.min.js") {
                                m = false
                            }
                        });
                        if (m) {
                            j.parentNode.insertBefore(b, j)
                        }
                    }
                } catch (f) {}
                try {
                    if (a2(this).data("videomp4") != aK || a2(this).data("videowebm") != aK) {}
                } catch (f) {}
            });
            G.find(".tp-caption video").each(function(b) {
                a2(this).removeClass("video-js").removeClass("vjs-default-skin");
                a2(this).attr("preload", "");
                a2(this).css({
                    display: "none"
                })
            });
            G.find(">ul:first-child >li").each(function() {
                var b = a2(this);
                b.data("origindex", b.index())
            });
            if (R.shuffle == "on") {
                var n = new Object,
                    J = G.find(">ul:first-child >li:first-child");
                n.fstransition = J.data("fstransition");
                n.fsmasterspeed = J.data("fsmasterspeed");
                n.fsslotamount = J.data("fsslotamount");
                for (var h = 0; h < G.find(">ul:first-child >li").length; h++) {
                    var l = Math.round(Math.random() * G.find(">ul:first-child >li").length);
                    G.find(">ul:first-child >li:eq(" + l + ")").prependTo(G.find(">ul:first-child"))
                }
                var X = G.find(">ul:first-child >li:first-child");
                X.data("fstransition", n.fstransition);
                X.data("fsmasterspeed", n.fsmasterspeed);
                X.data("fsslotamount", n.fsslotamount)
            }
            R.slots = 4;
            R.act = -1;
            R.next = 0;
            if (R.startWithSlide != aK) {
                R.next = R.startWithSlide
            }
            var y = aQ("#")[0];
            if (y.length < 9) {
                if (y.split("slide").length > 1) {
                    var d = parseInt(y.split("slide")[1], 0);
                    if (d < 1) {
                        d = 1
                    }
                    if (d > G.find(">ul:first >li").length) {
                        d = G.find(">ul:first >li").length
                    }
                    R.next = d - 1
                }
            }
            R.firststart = 1;
            if (R.navigationHOffset == aK) {
                R.navOffsetHorizontal = 0
            }
            if (R.navigationVOffset == aK) {
                R.navOffsetVertical = 0
            }
            G.append('<div class="tp-loader ' + R.spinner + '"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
            if (G.find(".tp-bannertimer").length == 0) {
                G.append('<div class="tp-bannertimer" style="visibility:hidden"></div>')
            }
            var p = G.find(".tp-bannertimer");
            if (p.length > 0) {
                p.css({
                    width: "0%"
                })
            }
            G.addClass("tp-simpleresponsive");
            R.container = G;
            R.slideamount = G.find(">ul:first >li").length;
            if (G.height() == 0) {
                G.height(R.startheight)
            }
            if (R.startwidth == aK || R.startwidth == 0) {
                R.startwidth = G.width()
            }
            if (R.startheight == aK || R.startheight == 0) {
                R.startheight = G.height()
            }
            R.width = G.width();
            R.height = G.height();
            R.bw = R.startwidth / G.width();
            R.bh = R.startheight / G.height();
            if (R.width != R.startwidth) {
                R.height = Math.round(R.startheight * (R.width / R.startwidth));
                G.height(R.height)
            }
            if (R.shadow != 0) {
                G.parent().append('<div class="tp-bannershadow tp-shadow' + R.shadow + '"></div>');
                var V = 0;
                if (R.forceFullWidth == "on") {
                    V = 0 - R.container.parent().offset().left
                }
                G.parent().find(".tp-bannershadow").css({
                    width: R.width,
                    left: V
                })
            }
            G.find("ul").css({
                display: "none"
            });
            var I = G;
            G.find("ul").css({
                display: "block"
            });
            aF(G, R);
            if (R.parallax != "off") {
                aO(G, R)
            }
            if (R.slideamount > 1) {
                aT(G, R)
            }
            if (R.slideamount > 1 && R.navigationType == "thumb") {
                aV(G, R)
            }
            if (R.slideamount > 1) {
                a4(G, R)
            }
            if (R.keyboardNavigation == "on") {
                aY(G, R)
            }
            aP(G, R);
            if (R.hideThumbs > 0) {
                a3(G, R)
            }
            setTimeout(function() {
                am(G, R)
            }, R.startDelay);
            R.startDelay = 0;
            if (R.slideamount > 1) {
                aD(G, R)
            }
            setTimeout(function() {
                G.trigger("revolution.slide.onloaded")
            }, 500);
            a2("body").data("rs-fullScreenMode", false);
            a2(window).on("mozfullscreenchange webkitfullscreenchange fullscreenchange", function() {
                a2("body").data("rs-fullScreenMode", !a2("body").data("rs-fullScreenMode"));
                if (a2("body").data("rs-fullScreenMode")) {
                    setTimeout(function() {
                        a2(window).trigger("resize")
                    }, 200)
                }
            });
            var Q = "resize.revslider-" + G.attr("id");
            a2(window).on(Q, function() {
                if (G == aK) {
                    return false
                }
                if (a2("body").find(G) != 0) {
                    if (R.forceFullWidth == "on") {
                        var b = R.container.closest(".forcefullwidth_wrapper_tp_banner").offset().left;
                        R.container.parent().css({
                            left: 0 - b + "px",
                            width: a2(window).width()
                        })
                    }
                }
                if (G.outerWidth(true) != R.width || G.is(":hidden")) {
                    aJ(G, R)
                }
            });
            try {
                if (R.hideThumbsUnderResoluition != 0 && R.navigationType == "thumb") {
                    if (R.hideThumbsUnderResoluition > a2(window).width()) {
                        a2(".tp-bullets").css({
                            display: "none"
                        })
                    } else {
                        a2(".tp-bullets").css({
                            display: "block"
                        })
                    }
                }
            } catch (U) {}
            G.find(".tp-scrollbelowslider").on("click", function() {
                var b = 0;
                try {
                    b = a2("body").find(R.fullScreenOffsetContainer).height()
                } catch (f) {}
                try {
                    b = b - parseInt(a2(this).data("scrolloffset"), 0)
                } catch (f) {}
                a2("body,html").animate({
                    scrollTop: G.offset().top + G.find(">ul >li").height() - b + "px"
                }, {
                    duration: 400
                })
            });
            var t = G.parent();
            if (a2(window).width() < R.hideSliderAtLimit) {
                G.trigger("stoptimer");
                if (t.css("display") != "none") {
                    t.data("olddisplay", t.css("display"))
                }
                t.css({
                    display: "none"
                })
            }
            aL(G, R)
        }
    }
    a2.fn.extend({
        revolution: function(b) {
            var a = {
                delay: 9000,
                startheight: 500,
                startwidth: 960,
                fullScreenAlignForce: "off",
                autoHeight: "off",
                hideTimerBar: "off",
                hideThumbs: 200,
                hideNavDelayOnMobile: 1500,
                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 3,
                navigationType: "bullet",
                navigationArrows: "solo",
                navigationInGrid: "off",
                hideThumbsOnMobile: "off",
                hideBulletsOnMobile: "off",
                hideArrowsOnMobile: "off",
                hideThumbsUnderResoluition: 0,
                navigationStyle: "round",
                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,
                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,
                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,
                keyboardNavigation: "on",
                touchenabled: "on",
                onHoverStop: "on",
                stopAtSlide: -1,
                stopAfterLoops: -1,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLimit: 0,
                hideSliderAtLimit: 0,
                shadow: 0,
                fullWidth: "off",
                fullScreen: "off",
                minFullScreenHeight: 0,
                fullScreenOffsetContainer: "",
                fullScreenOffset: "0",
                dottedOverlay: "none",
                forceFullWidth: "off",
                spinner: "spinner0",
                swipe_treshold: 75,
                swipe_min_touches: 1,
                drag_block_vertical: false,
                isJoomla: false,
                parallax: "off",
                parallaxLevels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
                parallaxBgFreeze: "off",
                parallaxOpacity: "on",
                parallaxDisableOnMobile: "off",
                panZoomDisableOnMobile: "off",
                simplifyAll: "on",
                minHeight: 0,
                nextSlideOnWindowFocus: "off",
                startDelay: 0
            };
            b = a2.extend({}, a, b);
            return this.each(function() {
                if (window.tplogs == true) {
                    try {
                        console.groupCollapsed("Slider Revolution 4.6.3 Initialisation on " + a2(this).attr("id"));
                        console.groupCollapsed("Used Options:");
                        console.info(b);
                        console.groupEnd();
                        console.groupCollapsed("Tween Engine:")
                    } catch (c) {}
                }
                if (punchgs.TweenLite == aK) {
                    if (window.tplogs == true) {
                        try {
                            console.error("GreenSock Engine Does not Exist!")
                        } catch (c) {}
                    }
                    return false
                }
                punchgs.force3D = true;
                if (window.tplogs == true) {
                    try {
                        console.info("GreenSock Engine Version in Slider Revolution:" + punchgs.TweenLite.version)
                    } catch (c) {}
                }
                if (b.simplifyAll == "on") {} else {
                    punchgs.TweenLite.lagSmoothing(1000, 16);
                    punchgs.force3D = "true"
                }
                if (window.tplogs == true) {
                    try {
                        console.groupEnd();
                        console.groupEnd()
                    } catch (c) {}
                }
                aM(a2(this), b)
            })
        },
        revscroll: function(a) {
            return this.each(function() {
                var b = a2(this);
                if (b != aK && b.length > 0 && a2("body").find("#" + b.attr("id")).length > 0) {
                    a2("body,html").animate({
                        scrollTop: b.offset().top + b.find(">ul >li").height() - a + "px"
                    }, {
                        duration: 400
                    })
                }
            })
        },
        revredraw: function(a) {
            return this.each(function() {
                var d = a2(this);
                if (d != aK && d.length > 0 && a2("body").find("#" + d.attr("id")).length > 0) {
                    var c = d.parent().find(".tp-bannertimer");
                    var b = c.data("opt");
                    aJ(d, b)
                }
            })
        },
        revkill: function(j) {
            var g = this,
                d = a2(this);
            if (d != aK && d.length > 0 && a2("body").find("#" + d.attr("id")).length > 0) {
                d.data("conthover", 1);
                d.data("conthover-changed", 1);
                d.trigger("revolution.slide.onpause");
                var f = d.parent().find(".tp-bannertimer");
                var h = f.data("opt");
                h.bannertimeronpause = true;
                d.trigger("stoptimer");
                punchgs.TweenLite.killTweensOf(d.find("*"), false);
                punchgs.TweenLite.killTweensOf(d, false);
                d.unbind("hover, mouseover, mouseenter,mouseleave, resize");
                var c = "resize.revslider-" + d.attr("id");
                a2(window).off(c);
                d.find("*").each(function() {
                    var a = a2(this);
                    a.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer");
                    a.off("on, hover, mouseenter,mouseleave,mouseover, resize");
                    a.data("mySplitText", null);
                    a.data("ctl", null);
                    if (a.data("tween") != aK) {
                        a.data("tween").kill()
                    }
                    if (a.data("kenburn") != aK) {
                        a.data("kenburn").kill()
                    }
                    a.remove();
                    a.empty();
                    a = null
                });
                punchgs.TweenLite.killTweensOf(d.find("*"), false);
                punchgs.TweenLite.killTweensOf(d, false);
                f.remove();
                try {
                    d.closest(".forcefullwidth_wrapper_tp_banner").remove()
                } catch (b) {}
                try {
                    d.closest(".rev_slider_wrapper").remove()
                } catch (b) {}
                try {
                    d.remove()
                } catch (b) {}
                d.empty();
                d.html();
                d = null;
                h = null;
                delete g.container;
                delete g.opt;
                return true
            } else {
                return false
            }
        },
        revpause: function(a) {
            return this.each(function() {
                var d = a2(this);
                if (d != aK && d.length > 0 && a2("body").find("#" + d.attr("id")).length > 0) {
                    d.data("conthover", 1);
                    d.data("conthover-changed", 1);
                    d.trigger("revolution.slide.onpause");
                    var c = d.parent().find(".tp-bannertimer");
                    var b = c.data("opt");
                    b.bannertimeronpause = true;
                    d.trigger("stoptimer")
                }
            })
        },
        revresume: function(a) {
            return this.each(function() {
                var d = a2(this);
                if (d != aK && d.length > 0 && a2("body").find("#" + d.attr("id")).length > 0) {
                    d.data("conthover", 0);
                    d.data("conthover-changed", 1);
                    d.trigger("revolution.slide.onresume");
                    var c = d.parent().find(".tp-bannertimer");
                    var b = c.data("opt");
                    b.bannertimeronpause = false;
                    d.trigger("starttimer")
                }
            })
        },
        revnext: function(a) {
            return this.each(function() {
                var b = a2(this);
                if (b != aK && b.length > 0 && a2("body").find("#" + b.attr("id")).length > 0) {
                    b.parent().find(".tp-rightarrow").click()
                }
            })
        },
        revprev: function(a) {
            return this.each(function() {
                var b = a2(this);
                if (b != aK && b.length > 0 && a2("body").find("#" + b.attr("id")).length > 0) {
                    b.parent().find(".tp-leftarrow").click()
                }
            })
        },
        revmaxslide: function(a) {
            return a2(this).find(">ul:first-child >li").length
        },
        revcurrentslide: function(d) {
            var c = a2(this);
            if (c != aK && c.length > 0 && a2("body").find("#" + c.attr("id")).length > 0) {
                var a = c.parent().find(".tp-bannertimer");
                var b = a.data("opt");
                return b.act
            }
        },
        revlastslide: function(d) {
            var c = a2(this);
            if (c != aK && c.length > 0 && a2("body").find("#" + c.attr("id")).length > 0) {
                var a = c.parent().find(".tp-bannertimer");
                var b = a.data("opt");
                return b.lastslide
            }
        },
        revshowslide: function(a) {
            return this.each(function() {
                var b = a2(this);
                if (b != aK && b.length > 0 && a2("body").find("#" + b.attr("id")).length > 0) {
                    b.data("showus", a);
                    b.parent().find(".tp-rightarrow").click()
                }
            })
        }
    });
    var aX = function() {
        var b, a, c = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        for (b in c) {
            if (b in document) {
                a = c[b];
                break
            }
        }
        return function(d) {
            if (d) {
                document.addEventListener(a, d)
            }
            return !document[b]
        }
    }();
    var aL = function(d, c) {
        var a = document.documentMode === aK,
            b = window.chrome;
        if (a && !b) {
            a2(window).on("focusin", function() {
                if (d == aK) {
                    return false
                }
                setTimeout(function() {
                    if (c.nextSlideOnWindowFocus == "on") {
                        d.revnext()
                    }
                    d.revredraw()
                }, 300)
            }).on("focusout", function() {})
        } else {
            if (window.addEventListener) {
                window.addEventListener("focus", function(f) {
                    if (d == aK) {
                        return false
                    }
                    setTimeout(function() {
                        if (c.nextSlideOnWindowFocus == "on") {
                            d.revnext()
                        }
                        d.revredraw()
                    }, 300)
                }, false);
                window.addEventListener("blur", function(f) {}, false)
            } else {
                window.attachEvent("focus", function(f) {
                    setTimeout(function() {
                        if (d == aK) {
                            return false
                        }
                        if (c.nextSlideOnWindowFocus == "on") {
                            d.revnext()
                        }
                        d.revredraw()
                    }, 300)
                });
                window.attachEvent("blur", function(f) {})
            }
        }
    };
    var aQ = function(d) {
        var b = [],
            f;
        var c = window.location.href.slice(window.location.href.indexOf(d) + 1).split("_");
        for (var a = 0; a < c.length; a++) {
            c[a] = c[a].replace("%3D", "=");
            f = c[a].split("=");
            b.push(f[0]);
            b[f[0]] = f[1]
        }
        return b
    };
    var aJ = function(g, b) {
        if (g == aK) {
            return false
        }
        try {
            if (b.hideThumbsUnderResoluition != 0 && b.navigationType == "thumb") {
                if (b.hideThumbsUnderResoluition > a2(window).width()) {
                    a2(".tp-bullets").css({
                        display: "none"
                    })
                } else {
                    a2(".tp-bullets").css({
                        display: "block"
                    })
                }
            }
        } catch (j) {}
        g.find(".defaultimg").each(function(a) {
            aZ(a2(this), b)
        });
        var q = g.parent();
        if (a2(window).width() < b.hideSliderAtLimit) {
            g.trigger("stoptimer");
            if (q.css("display") != "none") {
                q.data("olddisplay", q.css("display"))
            }
            q.css({
                display: "none"
            })
        } else {
            if (g.is(":hidden")) {
                if (q.data("olddisplay") != aK && q.data("olddisplay") != "undefined" && q.data("olddisplay") != "none") {
                    q.css({
                        display: q.data("olddisplay")
                    })
                } else {
                    q.css({
                        display: "block"
                    })
                }
                g.trigger("restarttimer");
                setTimeout(function() {
                    aJ(g, b)
                }, 150)
            }
        }
        var d = 0;
        if (b.forceFullWidth == "on") {
            d = 0 - b.container.parent().offset().left
        }
        try {
            g.parent().find(".tp-bannershadow").css({
                width: b.width,
                left: d
            })
        } catch (j) {}
        var p = g.find(">ul >li:eq(" + b.act + ") .slotholder");
        var k = g.find(">ul >li:eq(" + b.next + ") .slotholder");
        aw(g, b, g);
        punchgs.TweenLite.set(k.find(".defaultimg"), {
            opacity: 0
        });
        p.find(".defaultimg").css({
            opacity: 1
        });
        k.find(".defaultimg").each(function() {
            var a = a2(this);
            if (b.panZoomDisableOnMobile == "on") {} else {
                if (a.data("kenburn") != aK) {
                    a.data("kenburn").restart();
                    aj(g, b, true)
                }
            }
        });
        var h = g.find(">ul >li:eq(" + b.next + ")");
        var m = g.parent().find(".tparrows");
        if (m.hasClass("preview2")) {
            m.css({
                width: parseInt(m.css("minWidth"), 0)
            })
        }
        aW(h, b, true);
        aI(g, b)
    };
    var a6 = function(b, d) {
        var c = a2('<div style="display:none;"/>').appendTo(a2("body"));
        c.html("<!--[if " + (d || "") + " IE " + (b || "") + "]><a>&nbsp;</a><![endif]-->");
        var a = c.find("a").length;
        c.remove();
        return a
    };
    var a1 = function(b, a) {
        if (b.next == a.find(">ul >li").length - 1) {
            b.looptogo = b.looptogo - 1;
            if (b.looptogo <= 0) {
                b.stopLoop = "on"
            }
        }
        am(a, b)
    };
    var aT = function(b, d) {
        var c = "hidebullets";
        if (d.hideThumbs == 0) {
            c = ""
        }
        if (d.navigationType == "bullet" || d.navigationType == "both") {
            b.parent().append('<div id="bullets-container" class="site-container"><div class="tp-bullets ' + c + " simplebullets " + d.navigationStyle + '"></div></div>')
        }
        var a = b.parent().find(".tp-bullets");
        b.find(">ul:first >li").each(function(g) {
            var h = b.find(">ul:first >li:eq(" + g + ") img:first").attr("src");
            a.append('<div class="bullet"></div>');
            var f = a.find(".bullet:first")
        });
        a.find(".bullet").each(function(g) {
            var f = a2(this);
            if (g == d.slideamount - 1) {
                f.addClass("last")
            }
            if (g == 0) {
                f.addClass("first")
            }
            f.click(function() {
                var i = false,
                    h = f.index();
                if (d.navigationArrows == "withbullet" || d.navigationArrows == "nexttobullets") {
                    h = f.index() - 1
                }
                if (h == d.act) {
                    i = true
                }
                if (d.transition == 0 && !i) {
                    d.next = h;
                    a1(d, b)
                }
            })
        });
        a.append('<div class="tpclear"></div>');
        aI(b, d)
    };
    var a4 = function(f, h) {
        function a(i) {
            f.parent().append('<div style="' + b + '" class="tp-' + i + "arrow " + c + " tparrows " + g + '"><div class="tp-arr-allwrapper"><div class="tp-arr-iwrapper"><div class="tp-arr-imgholder"></div><div class="tp-arr-imgholder2"></div><div class="tp-arr-titleholder"></div><div class="tp-arr-subtitleholder"></div></div></div></div>')
        }
        var d = f.find(".tp-bullets"),
            b = "",
            c = "hidearrows",
            g = h.navigationStyle;
        if (h.hideThumbs == 0) {
            c = ""
        }
        if (h.navigationArrows == "none") {
            b = "visibility:hidden;display:none"
        }
        h.soloArrowStyle = "default " + h.navigationStyle;
        if (h.navigationArrows != "none" && h.navigationArrows != "nexttobullets") {
            g = h.soloArrowStyle
        }
        a("left");
        a("right");
        f.parent().find(".tp-rightarrow").click(function() {
            if (h.transition == 0) {
                if (f.data("showus") != aK && f.data("showus") != -1) {
                    h.next = f.data("showus") - 1
                } else {
                    h.next = h.next + 1
                }
                f.data("showus", -1);
                if (h.next >= h.slideamount) {
                    h.next = 0
                }
                if (h.next < 0) {
                    h.next = 0
                }
                if (h.act != h.next) {
                    a1(h, f)
                }
            }
        });
        f.parent().find(".tp-leftarrow").click(function() {
            if (h.transition == 0) {
                h.next = h.next - 1;
                h.leftarrowpressed = 1;
                if (h.next < 0) {
                    h.next = h.slideamount - 1
                }
                a1(h, f)
            }
        });
        aI(f, h)
    };
    var aY = function(b, a) {
        a2(document).keydown(function(c) {
            if (a.transition == 0 && c.keyCode == 39) {
                if (b.data("showus") != aK && b.data("showus") != -1) {
                    a.next = b.data("showus") - 1
                } else {
                    a.next = a.next + 1
                }
                b.data("showus", -1);
                if (a.next >= a.slideamount) {
                    a.next = 0
                }
                if (a.next < 0) {
                    a.next = 0
                }
                if (a.act != a.next) {
                    a1(a, b)
                }
            }
            if (a.transition == 0 && c.keyCode == 37) {
                a.next = a.next - 1;
                a.leftarrowpressed = 1;
                if (a.next < 0) {
                    a.next = a.slideamount - 1
                }
                a1(a, b)
            }
        });
        aI(b, a)
    };
    var aP = function(a, c) {
        var b = "vertical";
        if (c.touchenabled == "on") {
            if (c.drag_block_vertical == true) {
                b = "none"
            }
            a.swipe({
                allowPageScroll: b,
                fingers: c.swipe_min_touches,
                treshold: c.swipe_treshold,
                swipe: function(h, j, k, g, f, d) {
                    switch (j) {
                        case "left":
                            if (c.transition == 0) {
                                c.next = c.next + 1;
                                if (c.next == c.slideamount) {
                                    c.next = 0
                                }
                                a1(c, a)
                            }
                            break;
                        case "right":
                            if (c.transition == 0) {
                                c.next = c.next - 1;
                                c.leftarrowpressed = 1;
                                if (c.next < 0) {
                                    c.next = c.slideamount - 1
                                }
                                a1(c, a)
                            }
                            break;
                        case "up":
                            if (b == "none") {
                                a2("html, body").animate({
                                    scrollTop: a.offset().top + a.height() + "px"
                                })
                            }
                            break;
                        case "down":
                            if (b == "none") {
                                a2("html, body").animate({
                                    scrollTop: a.offset().top - a2(window).height() + "px"
                                })
                            }
                            break
                    }
                }
            })
        }
    };
    var a3 = function(d, b) {
        var f = d.parent().find(".tp-bullets"),
            c = d.parent().find(".tparrows");
        if (f == null) {
            d.append('<div class=".tp-bullets"></div>');
            var f = d.parent().find(".tp-bullets")
        }
        if (c == null) {
            d.append('<div class=".tparrows"></div>');
            var c = d.parent().find(".tparrows")
        }
        d.data("hideThumbs", b.hideThumbs);
        f.addClass("hidebullets");
        c.addClass("hidearrows");
        if (aq()) {
            try {
                d.hammer().on("touch", function() {
                    d.addClass("hovered");
                    if (b.onHoverStop == "on") {
                        d.trigger("stoptimer")
                    }
                    clearTimeout(d.data("hideThumbs"));
                    f.removeClass("hidebullets");
                    c.removeClass("hidearrows")
                });
                d.hammer().on("release", function() {
                    d.removeClass("hovered");
                    d.trigger("starttimer");
                    if (!d.hasClass("hovered") && !f.hasClass("hovered")) {
                        d.data("hideThumbs", setTimeout(function() {
                            f.addClass("hidebullets");
                            c.addClass("hidearrows");
                            d.trigger("starttimer")
                        }, b.hideNavDelayOnMobile))
                    }
                })
            } catch (a) {}
        } else {
            f.hover(function() {
                b.overnav = true;
                if (b.onHoverStop == "on") {
                    d.trigger("stoptimer")
                }
                f.addClass("hovered");
                clearTimeout(d.data("hideThumbs"));
                f.removeClass("hidebullets");
                c.removeClass("hidearrows")
            }, function() {
                b.overnav = false;
                d.trigger("starttimer");
                f.removeClass("hovered");
                if (!d.hasClass("hovered") && !f.hasClass("hovered")) {
                    d.data("hideThumbs", setTimeout(function() {
                        f.addClass("hidebullets");
                        c.addClass("hidearrows")
                    }, b.hideThumbs))
                }
            });
            c.hover(function() {
                b.overnav = true;
                if (b.onHoverStop == "on") {
                    d.trigger("stoptimer")
                }
                f.addClass("hovered");
                clearTimeout(d.data("hideThumbs"));
                f.removeClass("hidebullets");
                c.removeClass("hidearrows")
            }, function() {
                b.overnav = false;
                d.trigger("starttimer");
                f.removeClass("hovered")
            });
            d.on("mouseenter", function() {
                d.addClass("hovered");
                if (b.onHoverStop == "on") {
                    d.trigger("stoptimer")
                }
                clearTimeout(d.data("hideThumbs"));
                f.removeClass("hidebullets");
                c.removeClass("hidearrows")
            });
            d.on("mouseleave", function() {
                d.removeClass("hovered");
                d.trigger("starttimer");
                if (!d.hasClass("hovered") && !f.hasClass("hovered")) {
                    d.data("hideThumbs", setTimeout(function() {
                        f.addClass("hidebullets");
                        c.addClass("hidearrows")
                    }, b.hideThumbs))
                }
            })
        }
    };
    var aI = function(B, H) {
        var D = B.parent();
        var K = D.find(".tp-bullets");
        if (H.navigationType == "thumb") {
            K.find(".thumb").each(function(a) {
                var b = a2(this);
                b.css({
                    width: H.thumbWidth * H.bw + "px",
                    height: H.thumbHeight * H.bh + "px"
                })
            });
            var C = K.find(".tp-mask");
            C.width(H.thumbWidth * H.thumbAmount * H.bw);
            C.height(H.thumbHeight * H.bh);
            C.parent().width(H.thumbWidth * H.thumbAmount * H.bw);
            C.parent().height(H.thumbHeight * H.bh)
        }
        var G = D.find(".tp-leftarrow");
        var z = D.find(".tp-rightarrow");
        if (H.navigationType == "thumb" && H.navigationArrows == "nexttobullets") {
            H.navigationArrows = "solo"
        }
        if (H.navigationArrows == "nexttobullets") {
            G.prependTo(K).css({
                "float": "left"
            });
            z.insertBefore(K.find(".tpclear")).css({
                "float": "left"
            })
        }
        var R = 0;
        if (H.forceFullWidth == "on") {
            R = 0 - H.container.parent().offset().left
        }
        var N = 0,
            J = 0;
        if (H.navigationInGrid == "on") {
            N = B.width() > H.startwidth ? (B.width() - H.startwidth) / 2 : 0, J = B.height() > H.startheight ? (B.height() - H.startheight) / 2 : 0
        }
        if (H.navigationArrows != "none" && H.navigationArrows != "nexttobullets") {
            var P = H.soloArrowLeftValign,
                L = H.soloArrowLeftHalign,
                F = H.soloArrowRightValign,
                O = H.soloArrowRightHalign,
                x = H.soloArrowLeftVOffset,
                I = H.soloArrowLeftHOffset,
                M = H.soloArrowRightVOffset,
                k = H.soloArrowRightHOffset;
            G.css({
                position: "absolute"
            });
            z.css({
                position: "absolute"
            });
            if (P == "center") {
                G.css({
                    top: "50%",
                    marginTop: x - Math.round(G.innerHeight() / 2) + "px"
                })
            } else {
                if (P == "bottom") {
                    G.css({
                        top: "auto",
                        bottom: 0 + x + "px"
                    })
                } else {
                    if (P == "top") {
                        G.css({
                            bottom: "auto",
                            top: 0 + x + "px"
                        })
                    }
                }
            }
            if (L == "center") {
                G.css({
                    left: "50%",
                    marginLeft: R + I - Math.round(G.innerWidth() / 2) + "px"
                })
            } else {
                if (L == "left") {
                    G.css({
                        left: N + I + R + "px"
                    })
                } else {
                    if (L == "right") {
                        G.css({
                            right: N + I - R + "px"
                        })
                    }
                }
            }
            if (F == "center") {
                z.css({
                    top: "50%",
                    marginTop: M - Math.round(z.innerHeight() / 2) + "px"
                })
            } else {
                if (F == "bottom") {
                    z.css({
                        top: "auto",
                        bottom: 0 + M + "px"
                    })
                } else {
                    if (F == "top") {
                        z.css({
                            bottom: "auto",
                            top: 0 + M + "px"
                        })
                    }
                }
            }
            if (O == "center") {
                z.css({
                    left: "50%",
                    marginLeft: R + k - Math.round(z.innerWidth() / 2) + "px"
                })
            } else {
                if (O == "left") {
                    z.css({
                        left: N + k + R + "px"
                    })
                } else {
                    if (O == "right") {
                        z.css({
                            right: N + k - R + "px"
                        })
                    }
                }
            }
            if (G.position() != null) {
                G.css({
                    top: Math.round(parseInt(G.position().top, 0)) + "px"
                })
            }
            if (z.position() != null) {
                z.css({
                    top: Math.round(parseInt(z.position().top, 0)) + "px"
                })
            }
        }
        if (H.navigationArrows == "none") {
            G.css({
                visibility: "hidden"
            });
            z.css({
                visibility: "hidden"
            })
        }
        var Q = H.navigationVAlign,
            q = H.navigationHAlign,
            A = H.navigationVOffset * H.bh,
            j = H.navigationHOffset * H.bw;
        if (Q == "center") {
            K.css({
                top: "50%",
                marginTop: A - Math.round(K.innerHeight() / 2) + "px"
            })
        }
        if (Q == "bottom") {
            K.css({
                bottom: 0 + A + "px"
            })
        }
        if (Q == "top") {
            K.css({
                top: 0 + A + "px"
            })
        }
        if (q == "center") {
            K.css({
                left: "50%",
                marginLeft: R + j - Math.round(K.innerWidth() / 2) + "px"
            })
        }
        if (q == "left") {
            K.css({
                left: 0 + j + R + "px"
            })
        }
        if (q == "right") {
            K.css({
                right: 0 + j - R + "px"
            })
        }
    };
    var aS = function(q) {
        var b = q.container;
        q.beforli = q.next - 1;
        q.comingli = q.next + 1;
        if (q.beforli < 0) {
            q.beforli = q.slideamount - 1
        }
        if (q.comingli >= q.slideamount) {
            q.comingli = 0
        }
        var x = b.find(">ul:first-child >li:eq(" + q.comingli + ")"),
            G = b.find(">ul:first-child >li:eq(" + q.beforli + ")"),
            k = G.find(".defaultimg").attr("src"),
            F = x.find(".defaultimg").attr("src");
        if (q.arr == aK) {
            q.arr = b.parent().find(".tparrows"), q.rar = b.parent().find(".tp-rightarrow"), q.lar = b.parent().find(".tp-leftarrow"), q.raimg = q.rar.find(".tp-arr-imgholder"), q.laimg = q.lar.find(".tp-arr-imgholder"), q.raimg_b = q.rar.find(".tp-arr-imgholder2"), q.laimg_b = q.lar.find(".tp-arr-imgholder2"), q.ratit = q.rar.find(".tp-arr-titleholder"), q.latit = q.lar.find(".tp-arr-titleholder")
        }
        var D = q.arr,
            A = q.rar,
            w = q.lar,
            C = q.raimg,
            y = q.laimg,
            j = q.raimg_b,
            B = q.laimg_b,
            E = q.ratit,
            t = q.latit;
        if (x.data("title") != aK) {
            E.html(x.data("title"))
        }
        if (G.data("title") != aK) {
            t.html(G.data("title"))
        }
        if (A.hasClass("itishovered")) {
            A.width(E.outerWidth(true) + parseInt(A.css("minWidth"), 0))
        }
        if (w.hasClass("itishovered")) {
            w.width(t.outerWidth(true) + parseInt(w.css("minWidth"), 0))
        }
        if (D.hasClass("preview2") && !D.hasClass("hashoveralready")) {
            D.addClass("hashoveralready");
            if (!aq()) {
                D.hover(function() {
                    var a = a2(this),
                        c = a.find(".tp-arr-titleholder");
                    if (a2(window).width() > 767) {
                        a.width(c.outerWidth(true) + parseInt(a.css("minWidth"), 0))
                    }
                    a.addClass("itishovered")
                }, function() {
                    var a = a2(this),
                        c = a.find(".tp-arr-titleholder");
                    a.css({
                        width: parseInt(a.css("minWidth"), 0)
                    });
                    a.removeClass("itishovered")
                })
            } else {
                var D = a2(this),
                    z = D.find(".tp-arr-titleholder");
                z.addClass("alwayshidden");
                punchgs.TweenLite.set(z, {
                    autoAlpha: 0
                })
            }
        }
        if (G.data("thumb") != aK) {
            k = G.data("thumb")
        }
        if (x.data("thumb") != aK) {
            F = x.data("thumb")
        }
        if (!D.hasClass("preview4")) {
            punchgs.TweenLite.to(C, 0.5, {
                autoAlpha: 0,
                onComplete: function() {
                    C.css({
                        backgroundImage: "url(" + F + ")"
                    });
                    y.css({
                        backgroundImage: "url(" + k + ")"
                    })
                }
            });
            punchgs.TweenLite.to(y, 0.5, {
                autoAlpha: 0,
                onComplete: function() {
                    punchgs.TweenLite.to(C, 0.5, {
                        autoAlpha: 1,
                        delay: 0.2
                    });
                    punchgs.TweenLite.to(y, 0.5, {
                        autoAlpha: 1,
                        delay: 0.2
                    })
                }
            })
        } else {
            j.css({
                backgroundImage: "url(" + F + ")"
            });
            B.css({
                backgroundImage: "url(" + k + ")"
            });
            punchgs.TweenLite.fromTo(j, 0.8, {
                force3D: punchgs.force3d,
                x: 0
            }, {
                x: -C.width(),
                ease: punchgs.Power3.easeOut,
                delay: 1,
                onComplete: function() {
                    C.css({
                        backgroundImage: "url(" + F + ")"
                    });
                    punchgs.TweenLite.set(j, {
                        x: 0
                    })
                }
            });
            punchgs.TweenLite.fromTo(B, 0.8, {
                force3D: punchgs.force3d,
                x: 0
            }, {
                x: C.width(),
                ease: punchgs.Power3.easeOut,
                delay: 1,
                onComplete: function() {
                    y.css({
                        backgroundImage: "url(" + k + ")"
                    });
                    punchgs.TweenLite.set(B, {
                        x: 0
                    })
                }
            });
            punchgs.TweenLite.fromTo(C, 0.8, {
                x: 0
            }, {
                force3D: punchgs.force3d,
                x: -C.width(),
                ease: punchgs.Power3.easeOut,
                delay: 1,
                onComplete: function() {
                    punchgs.TweenLite.set(C, {
                        x: 0
                    })
                }
            });
            punchgs.TweenLite.fromTo(y, 0.8, {
                x: 0
            }, {
                force3D: punchgs.force3d,
                x: C.width(),
                ease: punchgs.Power3.easeOut,
                delay: 1,
                onComplete: function() {
                    punchgs.TweenLite.set(y, {
                        x: 0
                    })
                }
            })
        }
        if (A.hasClass("preview4") && !A.hasClass("hashoveralready")) {
            A.addClass("hashoveralready");
            A.hover(function() {
                var a = a2(this).find(".tp-arr-iwrapper");
                var c = a2(this).find(".tp-arr-allwrapper");
                punchgs.TweenLite.fromTo(a, 0.4, {
                    x: a.width()
                }, {
                    x: 0,
                    delay: 0.3,
                    ease: punchgs.Power3.easeOut,
                    overwrite: "all"
                });
                punchgs.TweenLite.to(c, 0.2, {
                    autoAlpha: 1,
                    overwrite: "all"
                })
            }, function() {
                var a = a2(this).find(".tp-arr-iwrapper");
                var c = a2(this).find(".tp-arr-allwrapper");
                punchgs.TweenLite.to(a, 0.4, {
                    x: a.width(),
                    ease: punchgs.Power3.easeOut,
                    delay: 0.2,
                    overwrite: "all"
                });
                punchgs.TweenLite.to(c, 0.2, {
                    delay: 0.6,
                    autoAlpha: 0,
                    overwrite: "all"
                })
            });
            w.hover(function() {
                var a = a2(this).find(".tp-arr-iwrapper");
                var c = a2(this).find(".tp-arr-allwrapper");
                punchgs.TweenLite.fromTo(a, 0.4, {
                    x: 0 - a.width()
                }, {
                    x: 0,
                    delay: 0.3,
                    ease: punchgs.Power3.easeOut,
                    overwrite: "all"
                });
                punchgs.TweenLite.to(c, 0.2, {
                    autoAlpha: 1,
                    overwrite: "all"
                })
            }, function() {
                var a = a2(this).find(".tp-arr-iwrapper");
                var c = a2(this).find(".tp-arr-allwrapper");
                punchgs.TweenLite.to(a, 0.4, {
                    x: 0 - a.width(),
                    ease: punchgs.Power3.easeOut,
                    delay: 0.2,
                    overwrite: "all"
                });
                punchgs.TweenLite.to(c, 0.2, {
                    delay: 0.6,
                    autoAlpha: 0,
                    overwrite: "all"
                })
            })
        }
    };
    var aZ = function(g, d) {
        d.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css({
            height: d.container.height()
        });
        d.container.closest(".rev_slider_wrapper").css({
            height: d.container.height()
        });
        d.width = parseInt(d.container.width(), 0);
        d.height = parseInt(d.container.height(), 0);
        d.bw = d.width / d.startwidth;
        d.bh = d.height / d.startheight;
        if (d.bh > d.bw) {
            d.bh = d.bw
        }
        if (d.bh < d.bw) {
            d.bw = d.bh
        }
        if (d.bw < d.bh) {
            d.bh = d.bw
        }
        if (d.bh > 1) {
            d.bw = 1;
            d.bh = 1
        }
        if (d.bw > 1) {
            d.bw = 1;
            d.bh = 1
        }
        d.height = Math.round(d.startheight * (d.width / d.startwidth));
        if (d.height > d.startheight && d.autoHeight != "on") {
            d.height = d.startheight
        }
        if (d.fullScreen == "on") {
            d.height = d.bw * d.startheight;
            var b = d.container.parent().width();
            var c = a2(window).height();
            if (d.fullScreenOffsetContainer != aK) {
                try {
                    var f = d.fullScreenOffsetContainer.split(",");
                    a2.each(f, function(h, i) {
                        c = c - a2(i).outerHeight(true);
                        if (c < d.minFullScreenHeight) {
                            c = d.minFullScreenHeight
                        }
                    })
                } catch (a) {}
                try {
                    if (d.fullScreenOffset.split("%").length > 1 && d.fullScreenOffset != aK && d.fullScreenOffset.length > 0) {
                        c = c - a2(window).height() * parseInt(d.fullScreenOffset, 0) / 100
                    } else {
                        if (d.fullScreenOffset != aK && d.fullScreenOffset.length > 0) {
                            c = c - parseInt(d.fullScreenOffset, 0)
                        }
                    }
                    if (c < d.minFullScreenHeight) {
                        c = d.minFullScreenHeight
                    }
                } catch (a) {}
            }
            d.container.parent().height(c);
            d.container.closest(".rev_slider_wrapper").height(c);
            d.container.css({
                height: "100%"
            });
            d.height = c;
            if (d.minHeight != aK && d.height < d.minHeight) {
                d.height = d.minHeight
            }
        } else {
            if (d.minHeight != aK && d.height < d.minHeight) {
                d.height = d.minHeight
            }
            d.container.height(d.height)
        }
        d.slotw = Math.ceil(d.width / d.slots);
        if (d.fullScreen == "on") {
            d.sloth = Math.ceil(a2(window).height() / d.slots)
        } else {
            d.sloth = Math.ceil(d.height / d.slots)
        }
        if (d.autoHeight == "on") {
            d.sloth = Math.ceil(g.height() / d.slots)
        }
    };
    var aF = function(b, a) {
        b.find(".tp-caption").each(function() {
            a2(this).addClass(a2(this).data("transition"));
            a2(this).addClass("start")
        });
        b.find(">ul:first").css({
            overflow: "hidden",
            width: "100%",
            height: "100%",
            maxHeight: b.parent().css("maxHeight")
        }).addClass("tp-revslider-mainul");
        if (a.autoHeight == "on") {
            b.find(">ul:first").css({
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxHeight: "none"
            });
            b.css({
                maxHeight: "none"
            });
            b.parent().css({
                maxHeight: "none"
            })
        }
        b.find(">ul:first >li").each(function(j) {
            var g = a2(this);
            g.addClass("tp-revslider-slidesli");
            g.css({
                width: "100%",
                height: "100%",
                overflow: "hidden"
            });
            if (g.data("link") != aK) {
                var h = g.data("link");
                var l = "_self";
                var d = 60;
                if (g.data("slideindex") == "back") {
                    d = 0
                }
                var c = checksl = g.data("linktoslide");
                if (c != aK) {
                    if (c != "next" && c != "prev") {
                        b.find(">ul:first-child >li").each(function() {
                            var f = a2(this);
                            if (f.data("origindex") + 1 == checksl) {
                                c = f.index() + 1
                            }
                        })
                    }
                }
                if (g.data("target") != aK) {
                    l = g.data("target")
                }
                if (h != "slide") {
                    c = "no"
                }
                var k = '<div class="tp-caption sft slidelink" style="width:100%;height:100%;z-index:' + d + ';" data-x="center" data-y="center" data-linktoslide="' + c + '" data-start="0"><a style="width:100%;height:100%;display:block"';
                if (h != "slide") {
                    k = k + ' target="' + l + '" href="' + h + '"'
                }
                k = k + '><span style="width:100%;height:100%;display:block"></span></a></div>';
                g.append(k)
            }
        });
        b.parent().css({
            overflow: "visible"
        });
        b.find(">ul:first >li >img").each(function(q) {
            var h = a2(this);
            h.addClass("defaultimg");
            if (h.data("lazyload") != aK && h.data("lazydone") != 1) {} else {
                aZ(h, a)
            }
            if (a6(8)) {
                h.data("kenburns", "off")
            }
            if (a.panZoomDisableOnMobile == "on" && aq()) {
                h.data("kenburns", "off");
                h.data("bgfit", "cover")
            }
            h.wrap('<div class="slotholder" style="width:100%;height:100%;"data-duration="' + h.data("duration") + '"data-zoomstart="' + h.data("zoomstart") + '"data-zoomend="' + h.data("zoomend") + '"data-rotationstart="' + h.data("rotationstart") + '"data-rotationend="' + h.data("rotationend") + '"data-ease="' + h.data("ease") + '"data-duration="' + h.data("duration") + '"data-bgpositionend="' + h.data("bgpositionend") + '"data-bgposition="' + h.data("bgposition") + '"data-duration="' + h.data("duration") + '"data-kenburns="' + h.data("kenburns") + '"data-easeme="' + h.data("ease") + '"data-bgfit="' + h.data("bgfit") + '"data-bgfitend="' + h.data("bgfitend") + '"data-owidth="' + h.data("owidth") + '"data-oheight="' + h.data("oheight") + '"></div>');
            if (a.dottedOverlay != "none" && a.dottedOverlay != aK) {
                h.closest(".slotholder").append('<div class="tp-dottedoverlay ' + a.dottedOverlay + '"></div>')
            }
            var j = h.attr("src"),
                m = h.data("lazyload"),
                g = h.data("bgfit"),
                k = h.data("bgrepeat"),
                d = h.data("bgposition");
            if (g == aK) {
                g = "cover"
            }
            if (k == aK) {
                k = "no-repeat"
            }
            if (d == aK) {
                d = "center center"
            }
            var p = h.closest(".slotholder");
            h.replaceWith('<div class="tp-bgimg defaultimg" data-lazyload="' + h.data("lazyload") + '" data-bgfit="' + g + '"data-bgposition="' + d + '" data-bgrepeat="' + k + '" data-lazydone="' + h.data("lazydone") + '" src="' + j + '" data-src="' + j + '" style="background-color:' + h.css("backgroundColor") + ";background-repeat:" + k + ";background-image:url(" + j + ");background-size:" + g + ";background-position:" + d + ';width:100%;height:100%;"></div>');
            if (a6(8)) {
                p.find(".tp-bgimg").css({
                    backgroundImage: "none",
                    "background-image": "none"
                });
                p.find(".tp-bgimg").append('<img class="ieeightfallbackimage defaultimg" src="' + j + '" style="width:100%">')
            }
            h.css({
                opacity: 0
            });
            h.data("li-id", q)
        })
    };
    var a5 = function(Q, I, F, M) {
        var B = Q,
            H = B.find(".defaultimg"),
            z = B.data("zoomstart"),
            P = B.data("rotationstart");
        if (H.data("currotate") != aK) {
            P = H.data("currotate")
        }
        if (H.data("curscale") != aK && M == "box") {
            z = H.data("curscale") * 100
        } else {
            if (H.data("curscale") != aK) {
                z = H.data("curscale")
            }
        }
        aZ(H, I);
        var K = H.data("src"),
            U = H.css("backgroundColor"),
            O = I.width,
            G = I.height,
            R = H.data("fxof"),
            w = 0;
        if (I.autoHeight == "on") {
            G = I.container.height()
        }
        if (R == aK) {
            R = 0
        }
        var J = 0,
            q = H.data("bgfit"),
            V = H.data("bgrepeat"),
            A = H.data("bgposition");
        if (q == aK) {
            q = "cover"
        }
        if (V == aK) {
            V = "no-repeat"
        }
        if (A == aK) {
            A = "center center"
        }
        if (a6(8)) {
            B.data("kenburns", "off");
            var g = K;
            K = ""
        }
        switch (M) {
            case "box":
                var t = 0,
                    a = 0,
                    j = 0;
                if (I.sloth > I.slotw) {
                    t = I.sloth
                } else {
                    t = I.slotw
                }
                if (!F) {
                    var J = 0 - t
                }
                I.slotw = t;
                I.sloth = t;
                var a = 0;
                var j = 0;
                if (B.data("kenburns") == "on") {
                    q = z;
                    if (q.toString().length < 4) {
                        q = ap(q, B, I)
                    }
                }
                for (var D = 0; D < I.slots; D++) {
                    j = 0;
                    for (var L = 0; L < I.slots; L++) {
                        B.append('<div class="slot" style="position:absolute;top:' + (w + j) + "px;left:" + (R + a) + "px;width:" + t + "px;height:" + t + 'px;overflow:hidden;"><div class="slotslide" data-x="' + a + '" data-y="' + j + '" style="position:absolute;top:' + 0 + "px;left:" + 0 + "px;width:" + t + "px;height:" + t + 'px;overflow:hidden;"><div style="position:absolute;top:' + (0 - j) + "px;left:" + (0 - a) + "px;width:" + O + "px;height:" + G + "px;background-color:" + U + ";background-image:url(" + K + ");background-repeat:" + V + ";background-size:" + q + ";background-position:" + A + ';"></div></div></div>');
                        j = j + t;
                        if (a6(8)) {
                            B.find(".slot ").last().find(".slotslide").append('<img src="' + g + '">');
                            aH(B, I)
                        }
                        if (z != aK && P != aK) {
                            punchgs.TweenLite.set(B.find(".slot").last(), {
                                rotationZ: P
                            })
                        }
                    }
                    a = a + t
                }
                break;
            case "vertical":
            case "horizontal":
                if (B.data("kenburns") == "on") {
                    q = z;
                    if (q.toString().length < 4) {
                        q = ap(q, B, I)
                    }
                }
                if (M == "horizontal") {
                    if (!F) {
                        var J = 0 - I.slotw
                    }
                    for (var L = 0; L < I.slots; L++) {
                        B.append('<div class="slot" style="position:absolute;top:' + (0 + w) + "px;left:" + (R + L * I.slotw) + "px;overflow:hidden;width:" + (I.slotw + 0.6) + "px;height:" + G + 'px"><div class="slotslide" style="position:absolute;top:0px;left:' + J + "px;width:" + (I.slotw + 0.6) + "px;height:" + G + 'px;overflow:hidden;"><div style="background-color:' + U + ";position:absolute;top:0px;left:" + (0 - L * I.slotw) + "px;width:" + O + "px;height:" + G + "px;background-image:url(" + K + ");background-repeat:" + V + ";background-size:" + q + ";background-position:" + A + ';"></div></div></div>');
                        if (z != aK && P != aK) {
                            punchgs.TweenLite.set(B.find(".slot").last(), {
                                rotationZ: P
                            })
                        }
                        if (a6(8)) {
                            B.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="' + g + '" style="width:100%;height:auto">');
                            aH(B, I)
                        }
                    }
                } else {
                    if (!F) {
                        var J = 0 - I.sloth
                    }
                    for (var L = 0; L < I.slots + 2; L++) {
                        B.append('<div class="slot" style="position:absolute;top:' + (w + L * I.sloth) + "px;left:" + R + "px;overflow:hidden;width:" + O + "px;height:" + I.sloth + 'px"><div class="slotslide" style="position:absolute;top:' + J + "px;left:0px;width:" + O + "px;height:" + I.sloth + 'px;overflow:hidden;"><div style="background-color:' + U + ";position:absolute;top:" + (0 - L * I.sloth) + "px;left:0px;width:" + O + "px;height:" + G + "px;background-image:url(" + K + ");background-repeat:" + V + ";background-size:" + q + ";background-position:" + A + ';"></div></div></div>');
                        if (z != aK && P != aK) {
                            punchgs.TweenLite.set(B.find(".slot").last(), {
                                rotationZ: P
                            })
                        }
                        if (a6(8)) {
                            B.find(".slot ").last().find(".slotslide").append('<img class="ieeightfallbackimage" src="' + g + '" style="width:100%;height:auto;">');
                            aH(B, I)
                        }
                    }
                }
                break
        }
    };
    var aH = function(d, b) {
        if (a6(8)) {
            var f = d.find(".ieeightfallbackimage");
            var c = f.width(),
                a = f.height();
            if (b.startwidth / b.startheight < d.data("owidth") / d.data("oheight")) {
                f.css({
                    width: "auto",
                    height: "100%"
                })
            } else {
                f.css({
                    width: "100%",
                    height: "auto"
                })
            }
            setTimeout(function() {
                var j = f.width(),
                    g = f.height(),
                    h = d.data("bgposition");
                if (h == "center center") {
                    f.css({
                        position: "absolute",
                        top: b.height / 2 - g / 2 + "px",
                        left: b.width / 2 - j / 2 + "px"
                    })
                }
                if (h == "center top" || h == "top center") {
                    f.css({
                        position: "absolute",
                        top: "0px",
                        left: b.width / 2 - j / 2 + "px"
                    })
                }
                if (h == "center bottom" || h == "bottom center") {
                    f.css({
                        position: "absolute",
                        bottom: "0px",
                        left: b.width / 2 - j / 2 + "px"
                    })
                }
                if (h == "right top" || h == "top right") {
                    f.css({
                        position: "absolute",
                        top: "0px",
                        right: "0px"
                    })
                }
                if (h == "right bottom" || h == "bottom right") {
                    f.css({
                        position: "absolute",
                        bottom: "0px",
                        right: "0px"
                    })
                }
                if (h == "right center" || h == "center right") {
                    f.css({
                        position: "absolute",
                        top: b.height / 2 - g / 2 + "px",
                        right: "0px"
                    })
                }
                if (h == "left bottom" || h == "bottom left") {
                    f.css({
                        position: "absolute",
                        bottom: "0px",
                        left: "0px"
                    })
                }
                if (h == "left center" || h == "center left") {
                    f.css({
                        position: "absolute",
                        top: b.height / 2 - g / 2 + "px",
                        left: "0px"
                    })
                }
            }, 20)
        }
    };
    var aw = function(a, c, b) {
        b.find(".slot").each(function() {
            a2(this).remove()
        });
        c.transition = 0
    };
    var ah = function(b, a) {
        b.find("img, .defaultimg").each(function(g) {
            var c = a2(this),
                d = c.data("lazyload");
            if (d != c.attr("src") && a < 3 && d != aK && d != "undefined") {
                if (d != aK && d != "undefined") {
                    c.attr("src", d);
                    var f = new Image;
                    f.onload = function(h) {
                        c.data("lazydone", 1);
                        if (c.hasClass("defaultimg")) {
                            aG(c, f)
                        }
                    };
                    f.error = function() {
                        c.data("lazydone", 1)
                    };
                    f.src = c.attr("src");
                    if (f.complete) {
                        if (c.hasClass("defaultimg")) {
                            aG(c, f)
                        }
                        c.data("lazydone", 1)
                    }
                }
            } else {
                if ((d === aK || d === "undefined") && c.data("lazydone") != 1) {
                    var f = new Image;
                    f.onload = function() {
                        if (c.hasClass("defaultimg")) {
                            aG(c, f)
                        }
                        c.data("lazydone", 1)
                    };
                    f.error = function() {
                        c.data("lazydone", 1)
                    };
                    if (c.attr("src") != aK && c.attr("src") != "undefined") {
                        f.src = c.attr("src")
                    } else {
                        f.src = c.data("src")
                    }
                    if (f.complete) {
                        if (c.hasClass("defaultimg")) {
                            aG(c, f)
                        }
                        c.data("lazydone", 1)
                    }
                }
            }
        })
    };
    var aG = function(d, b) {
        var f = d.closest("li"),
            c = b.width,
            a = b.height;
        f.data("owidth", c);
        f.data("oheight", a);
        f.find(".slotholder").data("owidth", c);
        f.find(".slotholder").data("oheight", a);
        f.data("loadeddone", 1)
    };
    var ag = function(d, c, a) {
        ah(d, 0);
        var b = setInterval(function() {
            a.bannertimeronpause = true;
            a.container.trigger("stoptimer");
            a.cd = 0;
            var f = 0;
            d.find("img, .defaultimg").each(function(g) {
                if (a2(this).data("lazydone") != 1) {
                    f++
                }
            });
            if (f > 0) {
                ah(d, f)
            } else {
                clearInterval(b);
                if (c != aK) {
                    c()
                }
            }
        }, 100)
    };
    var am = function(d, g) {
        try {
            var c = d.find(">ul:first-child >li:eq(" + g.act + ")")
        } catch (a) {
            var c = d.find(">ul:first-child >li:eq(1)")
        }
        g.lastslide = g.act;
        var b = d.find(">ul:first-child >li:eq(" + g.next + ")");
        var f = b.find(".defaultimg");
        g.bannertimeronpause = true;
        d.trigger("stoptimer");
        g.cd = 0;
        if (f.data("lazyload") != aK && f.data("lazyload") != "undefined" && f.data("lazydone") != 1) {
            if (!a6(8)) {
                f.css({
                    backgroundImage: 'url("' + b.find(".defaultimg").data("lazyload") + '")'
                })
            } else {
                f.attr("src", b.find(".defaultimg").data("lazyload"))
            }
            f.data("src", b.find(".defaultimg").data("lazyload"));
            f.data("lazydone", 1);
            f.data("orgw", 0);
            b.data("loadeddone", 1);
            d.find(".tp-loader").css({
                display: "block"
            });
            ag(d.find(".tp-static-layers"), function() {
                ag(b, function() {
                    var h = b.find(".slotholder");
                    if (h.data("kenburns") == "on") {
                        var i = setInterval(function() {
                            var j = h.data("owidth");
                            if (j >= 0) {
                                clearInterval(i);
                                ay(g, f, d)
                            }
                        }, 10)
                    } else {
                        ay(g, f, d)
                    }
                }, g)
            }, g)
        } else {
            if (b.data("loadeddone") === aK) {
                b.data("loadeddone", 1);
                ag(b, function() {
                    ay(g, f, d)
                }, g)
            } else {
                ay(g, f, d)
            }
        }
    };
    var ay = function(b, a, c) {
        b.bannertimeronpause = false;
        b.cd = 0;
        c.trigger("nulltimer");
        c.find(".tp-loader").css({
            display: "none"
        });
        aZ(a, b);
        aI(c, b);
        aZ(a, b);
        aU(c, b)
    };
    var aU = function(h, k) {
        h.trigger("revolution.slide.onbeforeswap");
        k.transition = 1;
        k.videoplaying = false;
        try {
            var g = h.find(">ul:first-child >li:eq(" + k.act + ")")
        } catch (d) {
            var g = h.find(">ul:first-child >li:eq(1)")
        }
        k.lastslide = k.act;
        var f = h.find(">ul:first-child >li:eq(" + k.next + ")");
        setTimeout(function() {
            aS(k)
        }, 200);
        var j = g.find(".slotholder"),
            c = f.find(".slotholder");
        if (c.data("kenburns") == "on" || j.data("kenburns") == "on") {
            aa(h, k);
            h.find(".kenburnimg").remove()
        }
        if (f.data("delay") != aK) {
            k.cd = 0;
            k.delay = f.data("delay")
        } else {
            k.delay = k.origcd
        }
        if (k.firststart == 1) {
            punchgs.TweenLite.set(g, {
                autoAlpha: 0
            })
        }
        punchgs.TweenLite.set(g, {
            zIndex: 18
        });
        punchgs.TweenLite.set(f, {
            autoAlpha: 0,
            zIndex: 20
        });
        var b = 0;
        if (g.index() != f.index() && k.firststart != 1) {
            b = aE(g, k)
        }
        if (g.data("saveperformance") != "on") {
            b = 0
        }
        setTimeout(function() {
            h.trigger("restarttimer");
            ao(h, k, f, g, j, c)
        }, b)
    };
    var ao = function(bQ, bK, bV, bJ, bO, bI) {
        function bF() {
            a2.each(bZ, function(d, c) {
                if (c[0] == bW || c[8] == bW) {
                    bY = c[1];
                    bN = c[2];
                    bX = bE
                }
                bE = bE + 1
            })
        }
        if (bV.data("differentissplayed") == "prepared") {
            bV.data("differentissplayed", "done");
            bV.data("transition", bV.data("savedtransition"));
            bV.data("slotamount", bV.data("savedslotamount"));
            bV.data("masterspeed", bV.data("savedmasterspeed"))
        }
        if (bV.data("fstransition") != aK && bV.data("differentissplayed") != "done") {
            bV.data("savedtransition", bV.data("transition"));
            bV.data("savedslotamount", bV.data("slotamount"));
            bV.data("savedmasterspeed", bV.data("masterspeed"));
            bV.data("transition", bV.data("fstransition"));
            bV.data("slotamount", bV.data("fsslotamount"));
            bV.data("masterspeed", bV.data("fsmasterspeed"));
            bV.data("differentissplayed", "prepared")
        }
        bQ.find(".active-revslide").removeClass(".active-revslide");
        bV.addClass("active-revslide");
        if (bV.data("transition") == aK) {
            bV.data("transition", "random")
        }
        var bY = 0,
            bS = bV.data("transition").split(","),
            b0 = bV.data("nexttransid") == aK ? -1 : bV.data("nexttransid");
        if (bV.data("randomtransition") == "on") {
            b0 = Math.round(Math.random() * bS.length)
        } else {
            b0 = b0 + 1
        }
        if (b0 == bS.length) {
            b0 = 0
        }
        bV.data("nexttransid", b0);
        var bW = bS[b0];
        if (bK.ie) {
            if (bW == "boxfade") {
                bW = "boxslide"
            }
            if (bW == "slotfade-vertical") {
                bW = "slotzoom-vertical"
            }
            if (bW == "slotfade-horizontal") {
                bW = "slotzoom-horizontal"
            }
        }
        if (a6(8)) {
            bW = 11
        }
        var bN = 0;
        if (bK.parallax == "scroll" && bK.parallaxFirstGo == aK) {
            bK.parallaxFirstGo = true;
            a0(bQ, bK);
            setTimeout(function() {
                a0(bQ, bK)
            }, 210);
            setTimeout(function() {
                a0(bQ, bK)
            }, 420)
        }
        if (bW == "slidehorizontal") {
            bW = "slideleft";
            if (bK.leftarrowpressed == 1) {
                bW = "slideright"
            }
        }
        if (bW == "slidevertical") {
            bW = "slideup";
            if (bK.leftarrowpressed == 1) {
                bW = "slidedown"
            }
        }
        if (bW == "parallaxhorizontal") {
            bW = "parallaxtoleft";
            if (bK.leftarrowpressed == 1) {
                bW = "parallaxtoright"
            }
        }
        if (bW == "parallaxvertical") {
            bW = "parallaxtotop";
            if (bK.leftarrowpressed == 1) {
                bW = "parallaxtobottom"
            }
        }
        var bZ = [
            ["boxslide", 0, 1, 10, 0, "box", false, null, 0],
            ["boxfade", 1, 0, 10, 0, "box", false, null, 1],
            ["slotslide-horizontal", 2, 0, 0, 200, "horizontal", true, false, 2],
            ["slotslide-vertical", 3, 0, 0, 200, "vertical", true, false, 3],
            ["curtain-1", 4, 3, 0, 0, "horizontal", true, true, 4],
            ["curtain-2", 5, 3, 0, 0, "horizontal", true, true, 5],
            ["curtain-3", 6, 3, 25, 0, "horizontal", true, true, 6],
            ["slotzoom-horizontal", 7, 0, 0, 400, "horizontal", true, true, 7],
            ["slotzoom-vertical", 8, 0, 0, 0, "vertical", true, true, 8],
            ["slotfade-horizontal", 9, 0, 0, 500, "horizontal", true, null, 9],
            ["slotfade-vertical", 10, 0, 0, 500, "vertical", true, null, 10],
            ["fade", 11, 0, 1, 300, "horizontal", true, null, 11],
            ["slideleft", 12, 0, 1, 0, "horizontal", true, true, 12],
            ["slideup", 13, 0, 1, 0, "horizontal", true, true, 13],
            ["slidedown", 14, 0, 1, 0, "horizontal", true, true, 14],
            ["slideright", 15, 0, 1, 0, "horizontal", true, true, 15],
            ["papercut", 16, 0, 0, 600, "", null, null, 16],
            ["3dcurtain-horizontal", 17, 0, 20, 100, "vertical", false, true, 17],
            ["3dcurtain-vertical", 18, 0, 10, 100, "horizontal", false, true, 18],
            ["cubic", 19, 0, 20, 600, "horizontal", false, true, 19],
            ["cube", 19, 0, 20, 600, "horizontal", false, true, 20],
            ["flyin", 20, 0, 4, 600, "vertical", false, true, 21],
            ["turnoff", 21, 0, 1, 1600, "horizontal", false, true, 22],
            ["incube", 22, 0, 20, 200, "horizontal", false, true, 23],
            ["cubic-horizontal", 23, 0, 20, 500, "vertical", false, true, 24],
            ["cube-horizontal", 23, 0, 20, 500, "vertical", false, true, 25],
            ["incube-horizontal", 24, 0, 20, 500, "vertical", false, true, 26],
            ["turnoff-vertical", 25, 0, 1, 200, "horizontal", false, true, 27],
            ["fadefromright", 12, 1, 1, 0, "horizontal", true, true, 28],
            ["fadefromleft", 15, 1, 1, 0, "horizontal", true, true, 29],
            ["fadefromtop", 14, 1, 1, 0, "horizontal", true, true, 30],
            ["fadefrombottom", 13, 1, 1, 0, "horizontal", true, true, 31],
            ["fadetoleftfadefromright", 12, 2, 1, 0, "horizontal", true, true, 32],
            ["fadetorightfadetoleft", 15, 2, 1, 0, "horizontal", true, true, 33],
            ["fadetobottomfadefromtop", 14, 2, 1, 0, "horizontal", true, true, 34],
            ["fadetotopfadefrombottom", 13, 2, 1, 0, "horizontal", true, true, 35],
            ["parallaxtoright", 12, 3, 1, 0, "horizontal", true, true, 36],
            ["parallaxtoleft", 15, 3, 1, 0, "horizontal", true, true, 37],
            ["parallaxtotop", 14, 3, 1, 0, "horizontal", true, true, 38],
            ["parallaxtobottom", 13, 3, 1, 0, "horizontal", true, true, 39],
            ["scaledownfromright", 12, 4, 1, 0, "horizontal", true, true, 40],
            ["scaledownfromleft", 15, 4, 1, 0, "horizontal", true, true, 41],
            ["scaledownfromtop", 14, 4, 1, 0, "horizontal", true, true, 42],
            ["scaledownfrombottom", 13, 4, 1, 0, "horizontal", true, true, 43],
            ["zoomout", 13, 5, 1, 0, "horizontal", true, true, 44],
            ["zoomin", 13, 6, 1, 0, "horizontal", true, true, 45],
            ["notransition", 26, 0, 1, 0, "horizontal", true, null, 46]
        ];
        var bH = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
        var bR = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
        var bY = 0;
        var bN = 1;
        var bX = 0;
        var bE = 0;
        var bG = new Array;
        if (bI.data("kenburns") == "on") {
            if (bW == "boxslide" || bW == 0 || bW == "boxfade" || bW == 1 || bW == "papercut" || bW == 16) {
                bW = 11
            }
            aj(bQ, bK, true, true)
        }
        if (bW == "random") {
            bW = Math.round(Math.random() * bZ.length - 1);
            if (bW > bZ.length - 1) {
                bW = bZ.length - 1
            }
        }
        if (bW == "random-static") {
            bW = Math.round(Math.random() * bH.length - 1);
            if (bW > bH.length - 1) {
                bW = bH.length - 1
            }
            bW = bH[bW]
        }
        if (bW == "random-premium") {
            bW = Math.round(Math.random() * bR.length - 1);
            if (bW > bR.length - 1) {
                bW = bR.length - 1
            }
            bW = bR[bW]
        }
        var br = [12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
        if (bK.isJoomla == true && window.MooTools != aK && br.indexOf(bW) != -1) {
            var ba = Math.round(Math.random() * (bR.length - 2)) + 1;
            if (ba > bR.length - 1) {
                ba = bR.length - 1
            }
            if (ba == 0) {
                ba = 1
            }
            bW = bR[ba]
        }
        bF();
        if (a6(8) && bY > 15 && bY < 28) {
            bW = Math.round(Math.random() * bH.length - 1);
            if (bW > bH.length - 1) {
                bW = bH.length - 1
            }
            bW = bH[bW];
            bE = 0;
            bF()
        }
        var a8 = -1;
        if (bK.leftarrowpressed == 1 || bK.act > bK.next) {
            a8 = 1
        }
        bK.leftarrowpressed = 0;
        if (bY > 26) {
            bY = 26
        }
        if (bY < 0) {
            bY = 0
        }
        var bf = 300;
        if (bV.data("masterspeed") != aK && bV.data("masterspeed") > 99 && bV.data("masterspeed") < bK.delay) {
            bf = bV.data("masterspeed")
        }
        if (bV.data("masterspeed") != aK && bV.data("masterspeed") > bK.delay) {
            bf = bK.delay
        }
        bG = bZ[bX];
        bQ.parent().find(".bullet").each(function() {
            var c = a2(this),
                d = c.index();
            c.removeClass("selected");
            if (bK.navigationArrows == "withbullet" || bK.navigationArrows == "nexttobullets") {
                d = c.index() - 1
            }
            if (d == bK.next) {
                c.addClass("selected")
            }
        });
        var bt = new punchgs.TimelineLite({
            onComplete: function() {
                aA(bQ, bK, bI, bO, bV, bJ, bt)
            }
        });
        bt.add(punchgs.TweenLite.set(bI.find(".defaultimg"), {
            opacity: 0
        }));
        bt.pause();
        if (bV.data("slotamount") == aK || bV.data("slotamount") < 1) {
            bK.slots = Math.round(Math.random() * 12 + 4);
            if (bW == "boxslide") {
                bK.slots = Math.round(Math.random() * 6 + 3)
            } else {
                if (bW == "flyin") {
                    bK.slots = Math.round(Math.random() * 4 + 1)
                }
            }
        } else {
            bK.slots = bV.data("slotamount")
        }
        if (bV.data("rotate") == aK) {
            bK.rotate = 0
        } else {
            if (bV.data("rotate") == 999) {
                bK.rotate = Math.round(Math.random() * 360)
            } else {
                bK.rotate = bV.data("rotate")
            }
        }
        if (!a2.support.transition || bK.ie || bK.ie9) {
            bK.rotate = 0
        }
        if (bK.firststart == 1) {
            bK.firststart = 0
        }
        bf = bf + bG[4];
        if ((bY == 4 || bY == 5 || bY == 6) && bK.slots < 3) {
            bK.slots = 3
        }
        if (bG[3] != 0) {
            bK.slots = Math.min(bK.slots, bG[3])
        }
        if (bY == 9) {
            bK.slots = bK.width / 20
        }
        if (bY == 10) {
            bK.slots = bK.height / 20
        }
        if (bG[7] != null) {
            a5(bO, bK, bG[7], bG[5])
        }
        if (bG[6] != null) {
            a5(bI, bK, bG[6], bG[5])
        }
        if (bY == 0) {
            var bT = Math.ceil(bK.height / bK.sloth);
            var bh = 0;
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bh = bh + 1;
                if (bh == bT) {
                    bh = 0
                }
                bt.add(punchgs.TweenLite.from(d, bf / 600, {
                    opacity: 0,
                    top: 0 - bK.sloth,
                    left: 0 - bK.slotw,
                    rotation: bK.rotate,
                    force3D: "auto",
                    ease: punchgs.Power2.easeOut
                }), (c * 15 + bh * 30) / 1500)
            })
        }
        if (bY == 1) {
            var be, bg = 0;
            bI.find(".slotslide").each(function(d) {
                var g = a2(this),
                    c = Math.random() * bf + 300,
                    f = Math.random() * 500 + 200;
                if (c + f > be) {
                    be = f + f;
                    bg = d
                }
                bt.add(punchgs.TweenLite.from(g, c / 1000, {
                    autoAlpha: 0,
                    force3D: "auto",
                    rotation: bK.rotate,
                    ease: punchgs.Power2.easeInOut
                }), f / 1000)
            })
        }
        if (bY == 2) {
            var b1 = new punchgs.TimelineLite;
            bO.find(".slotslide").each(function() {
                var c = a2(this);
                b1.add(punchgs.TweenLite.to(c, bf / 1000, {
                    left: bK.slotw,
                    force3D: "auto",
                    rotation: 0 - bK.rotate
                }), 0);
                bt.add(b1, 0)
            });
            bI.find(".slotslide").each(function() {
                var c = a2(this);
                b1.add(punchgs.TweenLite.from(c, bf / 1000, {
                    left: 0 - bK.slotw,
                    force3D: "auto",
                    rotation: bK.rotate
                }), 0);
                bt.add(b1, 0)
            })
        }
        if (bY == 3) {
            var b1 = new punchgs.TimelineLite;
            bO.find(".slotslide").each(function() {
                var c = a2(this);
                b1.add(punchgs.TweenLite.to(c, bf / 1000, {
                    top: bK.sloth,
                    rotation: bK.rotate,
                    force3D: "auto",
                    transformPerspective: 600
                }), 0);
                bt.add(b1, 0)
            });
            bI.find(".slotslide").each(function() {
                var c = a2(this);
                b1.add(punchgs.TweenLite.from(c, bf / 1000, {
                    top: 0 - bK.sloth,
                    rotation: bK.rotate,
                    ease: punchgs.Power2.easeOut,
                    force3D: "auto",
                    transformPerspective: 600
                }), 0);
                bt.add(b1, 0)
            })
        }
        if (bY == 4 || bY == 5) {
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            var bs = bf / 1000,
                bd = bs,
                b1 = new punchgs.TimelineLite;
            bO.find(".slotslide").each(function(d) {
                var f = a2(this);
                var c = d * bs / bK.slots;
                if (bY == 5) {
                    c = (bK.slots - d - 1) * bs / bK.slots / 1.5
                }
                b1.add(punchgs.TweenLite.to(f, bs * 3, {
                    transformPerspective: 600,
                    force3D: "auto",
                    top: 0 + bK.height,
                    opacity: 0.5,
                    rotation: bK.rotate,
                    ease: punchgs.Power2.easeInOut,
                    delay: c
                }), 0);
                bt.add(b1, 0)
            });
            bI.find(".slotslide").each(function(d) {
                var f = a2(this);
                var c = d * bs / bK.slots;
                if (bY == 5) {
                    c = (bK.slots - d - 1) * bs / bK.slots / 1.5
                }
                b1.add(punchgs.TweenLite.from(f, bs * 3, {
                    top: 0 - bK.height,
                    opacity: 0.5,
                    rotation: bK.rotate,
                    force3D: "auto",
                    ease: punchgs.Power2.easeInOut,
                    delay: c
                }), 0);
                bt.add(b1, 0)
            })
        }
        if (bY == 6) {
            if (bK.slots < 2) {
                bK.slots = 2
            }
            if (bK.slots % 2) {
                bK.slots = bK.slots + 1
            }
            var b1 = new punchgs.TimelineLite;
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            bO.find(".slotslide").each(function(d) {
                var f = a2(this);
                if (d + 1 < bK.slots / 2) {
                    var c = (d + 2) * 90
                } else {
                    var c = (2 + bK.slots - d) * 90
                }
                b1.add(punchgs.TweenLite.to(f, (bf + c) / 1000, {
                    top: 0 + bK.height,
                    opacity: 1,
                    force3D: "auto",
                    rotation: bK.rotate,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                bt.add(b1, 0)
            });
            bI.find(".slotslide").each(function(d) {
                var f = a2(this);
                if (d + 1 < bK.slots / 2) {
                    var c = (d + 2) * 90
                } else {
                    var c = (2 + bK.slots - d) * 90
                }
                b1.add(punchgs.TweenLite.from(f, (bf + c) / 1000, {
                    top: 0 - bK.height,
                    opacity: 1,
                    force3D: "auto",
                    rotation: bK.rotate,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                bt.add(b1, 0)
            })
        }
        if (bY == 7) {
            bf = bf * 2;
            if (bf > bK.delay) {
                bf = bK.delay
            }
            var b1 = new punchgs.TimelineLite;
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            bO.find(".slotslide").each(function() {
                var c = a2(this).find("div");
                b1.add(punchgs.TweenLite.to(c, bf / 1000, {
                    left: 0 - bK.slotw / 2 + "px",
                    top: 0 - bK.height / 2 + "px",
                    width: bK.slotw * 2 + "px",
                    height: bK.height * 2 + "px",
                    opacity: 0,
                    rotation: bK.rotate,
                    force3D: "auto",
                    ease: punchgs.Power2.easeOut
                }), 0);
                bt.add(b1, 0)
            });
            bI.find(".slotslide").each(function(c) {
                var d = a2(this).find("div");
                b1.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    left: 0,
                    top: 0,
                    opacity: 0,
                    transformPerspective: 600
                }, {
                    left: 0 - c * bK.slotw + "px",
                    ease: punchgs.Power2.easeOut,
                    force3D: "auto",
                    top: 0 + "px",
                    width: bK.width,
                    height: bK.height,
                    opacity: 1,
                    rotation: 0,
                    delay: 0.1
                }), 0);
                bt.add(b1, 0)
            })
        }
        if (bY == 8) {
            bf = bf * 3;
            if (bf > bK.delay) {
                bf = bK.delay
            }
            var b1 = new punchgs.TimelineLite;
            bO.find(".slotslide").each(function() {
                var c = a2(this).find("div");
                b1.add(punchgs.TweenLite.to(c, bf / 1000, {
                    left: 0 - bK.width / 2 + "px",
                    top: 0 - bK.sloth / 2 + "px",
                    width: bK.width * 2 + "px",
                    height: bK.sloth * 2 + "px",
                    force3D: "auto",
                    opacity: 0,
                    rotation: bK.rotate
                }), 0);
                bt.add(b1, 0)
            });
            bI.find(".slotslide").each(function(c) {
                var d = a2(this).find("div");
                b1.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    left: 0,
                    top: 0,
                    opacity: 0,
                    force3D: "auto"
                }, {
                    left: 0 + "px",
                    top: 0 - c * bK.sloth + "px",
                    width: bI.find(".defaultimg").data("neww") + "px",
                    height: bI.find(".defaultimg").data("newh") + "px",
                    opacity: 1,
                    rotation: 0
                }), 0);
                bt.add(b1, 0)
            })
        }
        if (bY == 9 || bY == 10) {
            var bm = 0;
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bm++;
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    autoAlpha: 0,
                    force3D: "auto",
                    transformPerspective: 600
                }, {
                    autoAlpha: 1,
                    ease: punchgs.Power2.easeInOut,
                    delay: c * 5 / 1000
                }), 0)
            })
        }
        if (bY == 11 || bY == 26) {
            var bm = 0;
            if (bY == 26) {
                bf = 0
            }
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.from(d, bf / 1000, {
                    autoAlpha: 0,
                    force3D: "auto",
                    ease: punchgs.Power2.easeInOut
                }), 0)
            })
        }
        if (bY == 12 || bY == 13 || bY == 14 || bY == 15) {
            bf = bf;
            if (bf > bK.delay) {
                bf = bK.delay
            }
            setTimeout(function() {
                punchgs.TweenLite.set(bO.find(".defaultimg"), {
                    autoAlpha: 0
                })
            }, 100);
            var bu = bK.width,
                bp = bK.height,
                bl = bI.find(".slotslide"),
                bL = 0,
                bb = 0,
                Q = 1,
                bD = 1,
                t = 1,
                j = punchgs.Power2.easeInOut,
                A = punchgs.Power2.easeInOut,
                bC = bf / 1000,
                bj = bC;
            if (bK.fullWidth == "on" || bK.fullScreen == "on") {
                bu = bl.width();
                bp = bl.height()
            }
            if (bY == 12) {
                bL = bu
            } else {
                if (bY == 15) {
                    bL = 0 - bu
                } else {
                    if (bY == 13) {
                        bb = bp
                    } else {
                        if (bY == 14) {
                            bb = 0 - bp
                        }
                    }
                }
            }
            if (bN == 1) {
                Q = 0
            }
            if (bN == 2) {
                Q = 0
            }
            if (bN == 3) {
                j = punchgs.Power2.easeInOut;
                A = punchgs.Power1.easeInOut;
                bC = bf / 1200
            }
            if (bN == 4 || bN == 5) {
                bD = 0.6
            }
            if (bN == 6) {
                bD = 1.4
            }
            if (bN == 5 || bN == 6) {
                t = 1.4;
                Q = 0;
                bu = 0;
                bp = 0;
                bL = 0;
                bb = 0
            }
            if (bN == 6) {
                t = 0.6
            }
            var bi = 0;
            bt.add(punchgs.TweenLite.from(bl, bC, {
                left: bL,
                top: bb,
                scale: t,
                opacity: Q,
                rotation: bK.rotate,
                ease: A,
                force3D: "auto"
            }), 0);
            var bo = bO.find(".slotslide");
            if (bN == 4 || bN == 5) {
                bu = 0;
                bp = 0
            }
            if (bN != 1) {
                switch (bY) {
                    case 12:
                        bt.add(punchgs.TweenLite.to(bo, bj, {
                            left: 0 - bu + "px",
                            force3D: "auto",
                            scale: bD,
                            opacity: Q,
                            rotation: bK.rotate,
                            ease: j
                        }), 0);
                        break;
                    case 15:
                        bt.add(punchgs.TweenLite.to(bo, bj, {
                            left: bu + "px",
                            force3D: "auto",
                            scale: bD,
                            opacity: Q,
                            rotation: bK.rotate,
                            ease: j
                        }), 0);
                        break;
                    case 13:
                        bt.add(punchgs.TweenLite.to(bo, bj, {
                            top: 0 - bp + "px",
                            force3D: "auto",
                            scale: bD,
                            opacity: Q,
                            rotation: bK.rotate,
                            ease: j
                        }), 0);
                        break;
                    case 14:
                        bt.add(punchgs.TweenLite.to(bo, bj, {
                            top: bp + "px",
                            force3D: "auto",
                            scale: bD,
                            opacity: Q,
                            rotation: bK.rotate,
                            ease: j
                        }), 0);
                        break
                }
            }
        }
        if (bY == 16) {
            var b1 = new punchgs.TimelineLite;
            bt.add(punchgs.TweenLite.set(bJ, {
                position: "absolute",
                "z-index": 20
            }), 0);
            bt.add(punchgs.TweenLite.set(bV, {
                position: "absolute",
                "z-index": 15
            }), 0);
            bJ.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>');
            bJ.find(".tp-half-one").clone(true).appendTo(bJ).addClass("tp-half-two");
            bJ.find(".tp-half-two").removeClass("tp-half-one");
            var bu = bK.width,
                bp = bK.height;
            if (bK.autoHeight == "on") {
                bp = bQ.height()
            }
            bJ.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:' + bu + "px;height:" + bp + 'px;"></div>');
            bJ.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:' + bu + "px;height:" + bp + 'px;"></div>');
            bJ.find(".tp-half-two .defaultimg").css({
                position: "absolute",
                top: "-50%"
            });
            bJ.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>');
            bt.add(punchgs.TweenLite.set(bJ.find(".tp-half-two"), {
                width: bu,
                height: bp,
                overflow: "hidden",
                zIndex: 15,
                position: "absolute",
                top: bp / 2,
                left: "0px",
                transformPerspective: 600,
                transformOrigin: "center bottom"
            }), 0);
            bt.add(punchgs.TweenLite.set(bJ.find(".tp-half-one"), {
                width: bu,
                height: bp / 2,
                overflow: "visible",
                zIndex: 10,
                position: "absolute",
                top: "0px",
                left: "0px",
                transformPerspective: 600,
                transformOrigin: "center top"
            }), 0);
            var b = bJ.find(".defaultimg"),
                a = Math.round(Math.random() * 20 - 10),
                bM = Math.round(Math.random() * 20 - 10),
                bU = Math.round(Math.random() * 20 - 10),
                bA = Math.random() * 0.4 - 0.2,
                bx = Math.random() * 0.4 - 0.2,
                bn = Math.random() * 1 + 1,
                bz = Math.random() * 1 + 1,
                bB = Math.random() * 0.3 + 0.3;
            bt.add(punchgs.TweenLite.set(bJ.find(".tp-half-one"), {
                overflow: "hidden"
            }), 0);
            bt.add(punchgs.TweenLite.fromTo(bJ.find(".tp-half-one"), bf / 800, {
                width: bu,
                height: bp / 2,
                position: "absolute",
                top: "0px",
                left: "0px",
                force3D: "auto",
                transformOrigin: "center top"
            }, {
                scale: bn,
                rotation: a,
                y: 0 - bp - bp / 4,
                autoAlpha: 0,
                ease: punchgs.Power2.easeInOut
            }), 0);
            bt.add(punchgs.TweenLite.fromTo(bJ.find(".tp-half-two"), bf / 800, {
                width: bu,
                height: bp,
                overflow: "hidden",
                position: "absolute",
                top: bp / 2,
                left: "0px",
                force3D: "auto",
                transformOrigin: "center bottom"
            }, {
                scale: bz,
                rotation: bM,
                y: bp + bp / 4,
                ease: punchgs.Power2.easeInOut,
                autoAlpha: 0,
                onComplete: function() {
                    punchgs.TweenLite.set(bJ, {
                        position: "absolute",
                        "z-index": 15
                    });
                    punchgs.TweenLite.set(bV, {
                        position: "absolute",
                        "z-index": 20
                    });
                    if (bJ.find(".tp-half-one").length > 0) {
                        bJ.find(".tp-half-one .defaultimg").unwrap();
                        bJ.find(".tp-half-one .slotholder").unwrap()
                    }
                    bJ.find(".tp-half-two").remove()
                }
            }), 0);
            b1.add(punchgs.TweenLite.set(bI.find(".defaultimg"), {
                autoAlpha: 1
            }), 0);
            if (bJ.html() != null) {
                bt.add(punchgs.TweenLite.fromTo(bV, (bf - 200) / 1000, {
                    scale: bB,
                    x: bK.width / 4 * bA,
                    y: bp / 4 * bx,
                    rotation: bU,
                    force3D: "auto",
                    transformOrigin: "center center",
                    ease: punchgs.Power2.easeOut
                }, {
                    autoAlpha: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0
                }), 0)
            }
            bt.add(b1, 0)
        }
        if (bY == 17) {
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 800, {
                    opacity: 0,
                    rotationY: 0,
                    scale: 0.9,
                    rotationX: -110,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: "center center"
                }, {
                    opacity: 1,
                    top: 0,
                    left: 0,
                    scale: 1,
                    rotation: 0,
                    rotationX: 0,
                    force3D: "auto",
                    rotationY: 0,
                    ease: punchgs.Power3.easeOut,
                    delay: c * 0.06
                }), 0)
            })
        }
        if (bY == 18) {
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 500, {
                    autoAlpha: 0,
                    rotationY: 310,
                    scale: 0.9,
                    rotationX: 10,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: "center center"
                }, {
                    autoAlpha: 1,
                    top: 0,
                    left: 0,
                    scale: 1,
                    rotation: 0,
                    rotationX: 0,
                    force3D: "auto",
                    rotationY: 0,
                    ease: punchgs.Power3.easeOut,
                    delay: c * 0.06
                }), 0)
            })
        }
        if (bY == 19 || bY == 22) {
            var b1 = new punchgs.TimelineLite;
            bt.add(punchgs.TweenLite.set(bJ, {
                zIndex: 20
            }), 0);
            bt.add(punchgs.TweenLite.set(bV, {
                zIndex: 20
            }), 0);
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            var a9 = bV.css("z-index"),
                bw = bJ.css("z-index"),
                by = 90,
                Q = 1,
                bv = "center center ";
            if (a8 == 1) {
                by = -90
            }
            if (bY == 19) {
                bv = bv + "-" + bK.height / 2;
                Q = 0
            } else {
                bv = bv + bK.height / 2
            }
            punchgs.TweenLite.set(bQ, {
                transformStyle: "flat",
                backfaceVisibility: "hidden",
                transformPerspective: 600
            });
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                b1.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    left: 0,
                    rotationY: bK.rotate,
                    z: 10,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationX: by
                }, {
                    left: 0,
                    rotationY: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    rotationX: 0,
                    delay: c * 50 / 1000,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                b1.add(punchgs.TweenLite.to(d, 0.1, {
                    autoAlpha: 1,
                    delay: c * 50 / 1000
                }), 0);
                bt.add(b1)
            });
            bO.find(".slotslide").each(function(d) {
                var f = a2(this);
                var c = -90;
                if (a8 == 1) {
                    c = 90
                }
                b1.add(punchgs.TweenLite.fromTo(f, bf / 1000, {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    autoAlpha: 1,
                    rotationY: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationX: 0
                }, {
                    autoAlpha: 1,
                    rotationY: bK.rotate,
                    top: 0,
                    z: 10,
                    scale: 1,
                    rotationX: c,
                    delay: d * 50 / 1000,
                    force3D: "auto",
                    ease: punchgs.Power2.easeInOut
                }), 0);
                bt.add(b1)
            })
        }
        if (bY == 20) {
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            var a9 = bV.css("z-index"),
                bw = bJ.css("z-index");
            if (a8 == 1) {
                var bP = -bK.width;
                var by = 70;
                var bv = "left center -" + bK.height / 2
            } else {
                var bP = bK.width;
                var by = -70;
                var bv = "right center -" + bK.height / 2
            }
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1500, {
                    left: bP,
                    rotationX: 40,
                    z: -600,
                    opacity: Q,
                    top: 0,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationY: by
                }, {
                    left: 0,
                    delay: c * 50 / 1000,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    rotationX: 40,
                    z: -600,
                    opacity: Q,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationY: by
                }, {
                    rotationX: 0,
                    opacity: 1,
                    top: 0,
                    z: 0,
                    scale: 1,
                    rotationY: 0,
                    delay: c * 50 / 1000,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                bt.add(punchgs.TweenLite.to(d, 0.1, {
                    opacity: 1,
                    force3D: "auto",
                    delay: c * 50 / 1000 + bf / 2000
                }), 0)
            });
            bO.find(".slotslide").each(function(d) {
                var h = a2(this);
                if (a8 != 1) {
                    var c = -bK.width;
                    var f = 70;
                    var g = "left center -" + bK.height / 2
                } else {
                    var c = bK.width;
                    var f = -70;
                    var g = "right center -" + bK.height / 2
                }
                bt.add(punchgs.TweenLite.fromTo(h, bf / 1000, {
                    opacity: 1,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    left: 0,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: g,
                    rotationY: 0
                }, {
                    opacity: 1,
                    rotationX: 40,
                    top: 0,
                    z: -600,
                    left: c,
                    force3D: "auto",
                    scale: 0.8,
                    rotationY: f,
                    delay: d * 50 / 1000,
                    ease: punchgs.Power2.easeInOut
                }), 0);
                bt.add(punchgs.TweenLite.to(h, 0.1, {
                    force3D: "auto",
                    opacity: 0,
                    delay: d * 50 / 1000 + (bf / 1000 - bf / 10000)
                }), 0)
            })
        }
        if (bY == 21 || bY == 25) {
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            var a9 = bV.css("z-index"),
                bw = bJ.css("z-index"),
                by = 90,
                bP = -bK.width,
                bk = -by;
            if (a8 == 1) {
                if (bY == 25) {
                    var bv = "center top 0";
                    by = bK.rotate
                } else {
                    var bv = "left center 0";
                    bk = bK.rotate
                }
            } else {
                bP = bK.width;
                by = -90;
                if (bY == 25) {
                    var bv = "center bottom 0";
                    bk = -by;
                    by = bK.rotate
                } else {
                    var bv = "right center 0";
                    bk = bK.rotate
                }
            }
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    left: 0,
                    transformStyle: "flat",
                    rotationX: bk,
                    z: 0,
                    autoAlpha: 0,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationY: by
                }, {
                    left: 0,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    autoAlpha: 1,
                    scale: 1,
                    rotationY: 0,
                    force3D: "auto",
                    ease: punchgs.Power3.easeInOut
                }), 0)
            });
            if (a8 != 1) {
                bP = -bK.width;
                by = 90;
                if (bY == 25) {
                    bv = "center top 0";
                    bk = -by;
                    by = bK.rotate
                } else {
                    bv = "left center 0";
                    bk = bK.rotate
                }
            } else {
                bP = bK.width;
                by = -90;
                if (bY == 25) {
                    bv = "center bottom 0";
                    bk = -by;
                    by = bK.rotate
                } else {
                    bv = "right center 0";
                    bk = bK.rotate
                }
            }
            bO.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    left: 0,
                    transformStyle: "flat",
                    rotationX: 0,
                    z: 0,
                    autoAlpha: 1,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationY: 0
                }, {
                    left: 0,
                    rotationX: bk,
                    top: 0,
                    z: 0,
                    autoAlpha: 1,
                    force3D: "auto",
                    scale: 1,
                    rotationY: by,
                    ease: punchgs.Power1.easeInOut
                }), 0)
            })
        }
        if (bY == 23 || bY == 24) {
            setTimeout(function() {
                bO.find(".defaultimg").css({
                    opacity: 0
                })
            }, 100);
            var a9 = bV.css("z-index"),
                bw = bJ.css("z-index"),
                by = -90,
                Q = 1,
                bc = 0;
            if (a8 == 1) {
                by = 90
            }
            if (bY == 23) {
                var bv = "center center -" + bK.width / 2;
                Q = 0
            } else {
                var bv = "center center " + bK.width / 2
            }
            punchgs.TweenLite.set(bQ, {
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                perspective: 2500
            });
            bI.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    left: bc,
                    rotationX: bK.rotate,
                    force3D: "auto",
                    opacity: Q,
                    top: 0,
                    scale: 1,
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationY: by
                }, {
                    left: 0,
                    rotationX: 0,
                    autoAlpha: 1,
                    top: 0,
                    z: 0,
                    scale: 1,
                    rotationY: 0,
                    delay: c * 50 / 500,
                    ease: punchgs.Power2.easeInOut
                }), 0)
            });
            by = 90;
            if (a8 == 1) {
                by = -90
            }
            bO.find(".slotslide").each(function(c) {
                var d = a2(this);
                bt.add(punchgs.TweenLite.fromTo(d, bf / 1000, {
                    left: 0,
                    autoAlpha: 1,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: bv,
                    rotationY: 0
                }, {
                    left: bc,
                    autoAlpha: 1,
                    rotationX: bK.rotate,
                    top: 0,
                    scale: 1,
                    rotationY: by,
                    delay: c * 50 / 500,
                    ease: punchgs.Power2.easeInOut
                }), 0)
            })
        }
        bt.pause();
        aW(bV, bK, null, bt);
        punchgs.TweenLite.to(bV, 0.001, {
            autoAlpha: 1
        });
        var bq = {};
        bq.slideIndex = bK.next + 1;
        bq.slide = bV;
        bQ.trigger("revolution.slide.onchange", bq);
        setTimeout(function() {
            bQ.trigger("revolution.slide.onafterswap")
        }, bf);
        bQ.trigger("revolution.slide.onvideostop")
    };
    var aA = function(f, b, h, d, a, c, g) {
        punchgs.TweenLite.to(h.find(".defaultimg"), 0.001, {
            autoAlpha: 1,
            onComplete: function() {
                aw(f, b, a)
            }
        });
        if (a.index() != c.index()) {
            punchgs.TweenLite.to(c, 0.2, {
                autoAlpha: 0,
                onComplete: function() {
                    aw(f, b, c)
                }
            })
        }
        b.act = b.next;
        if (b.navigationType == "thumb") {
            aC(f)
        }
        if (h.data("kenburns") == "on") {
            aj(f, b)
        }
        f.find(".current-sr-slide-visible").removeClass("current-sr-slide-visible");
        a.addClass("current-sr-slide-visible");
        if (b.parallax == "scroll" || b.parallax == "scroll+mouse" || b.parallax == "mouse+scroll") {
            a0(f, b)
        }
        g.clear()
    };
    var al = function(c) {
        var h = c.target.getVideoEmbedCode();
        var f = a2("#" + h.split('id="')[1].split('"')[0]);
        var b = f.closest(".tp-simpleresponsive");
        var d = f.parent().data("player");
        if (c.data == YT.PlayerState.PLAYING) {
            var g = b.find(".tp-bannertimer");
            var a = g.data("opt");
            if (f.closest(".tp-caption").data("volume") == "mute") {
                d.mute()
            }
            a.videoplaying = true;
            b.trigger("stoptimer");
            b.trigger("revolution.slide.onvideoplay")
        } else {
            var g = b.find(".tp-bannertimer");
            var a = g.data("opt");
            if (c.data != -1 && c.data != 3) {
                a.videoplaying = false;
                b.trigger("starttimer");
                b.trigger("revolution.slide.onvideostop")
            }
            if (c.data == 0 && a.nextslideatend == true) {
                a.container.revnext()
            } else {
                a.videoplaying = false;
                b.trigger("starttimer");
                b.trigger("revolution.slide.onvideostop")
            }
        }
    };
    var an = function(b, a, c) {
        if (b.addEventListener) {
            b.addEventListener(a, c, false)
        } else {
            b.attachEvent(a, c, false)
        }
    };
    var a7 = function(b, g) {
        var d = $f(b),
            a = a2("#" + b),
            c = a.closest(".tp-simpleresponsive"),
            f = a.closest(".tp-caption");
        setTimeout(function() {
            d.addEvent("ready", function(h) {
                if (g) {
                    d.api("play")
                }
                d.addEvent("play", function(j) {
                    var i = c.find(".tp-bannertimer");
                    var k = i.data("opt");
                    k.videoplaying = true;
                    c.trigger("stoptimer");
                    if (f.data("volume") == "mute") {
                        d.api("setVolume", "0")
                    }
                });
                d.addEvent("finish", function(j) {
                    var i = c.find(".tp-bannertimer");
                    var k = i.data("opt");
                    k.videoplaying = false;
                    c.trigger("starttimer");
                    c.trigger("revolution.slide.onvideoplay");
                    if (k.nextslideatend == true) {
                        k.container.revnext()
                    }
                });
                d.addEvent("pause", function(j) {
                    var i = c.find(".tp-bannertimer");
                    var k = i.data("opt");
                    k.videoplaying = false;
                    c.trigger("starttimer");
                    c.trigger("revolution.slide.onvideostop")
                });
                f.find(".tp-thumb-image").click(function() {
                    punchgs.TweenLite.to(a2(this), 0.3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: punchgs.Power3.easeInOut
                    });
                    d.api("play")
                })
            })
        }, 150)
    };
    var ax = function(f, h) {
        var d = h.width();
        var b = h.height();
        var c = f.data("mediaAspect");
        if (c == aK) {
            c = 1
        }
        var g = d / b;
        f.css({
            position: "absolute"
        });
        var a = f.find("video");
        if (g < c) {
            punchgs.TweenLite.to(f, 0.0001, {
                width: b * c,
                force3D: "auto",
                top: 0,
                left: 0 - (b * c - d) / 2,
                height: b
            })
        } else {
            punchgs.TweenLite.to(f, 0.0001, {
                width: d,
                force3D: "auto",
                top: 0 - (d / c - b) / 2,
                left: 0,
                height: d / c
            })
        }
    };
    var ak = function() {
        var a = new Object;
        a.x = 0;
        a.y = 0;
        a.rotationX = 0;
        a.rotationY = 0;
        a.rotationZ = 0;
        a.scale = 1;
        a.scaleX = 1;
        a.scaleY = 1;
        a.skewX = 0;
        a.skewY = 0;
        a.opacity = 0;
        a.transformOrigin = "center, center";
        a.transformPerspective = 400;
        a.rotation = 0;
        return a
    };
    var at = function(a, c) {
        var b = c.split(";");
        a2.each(b, function(g, h) {
            h = h.split(":");
            var f = h[0],
                d = h[1];
            if (f == "rotationX") {
                a.rotationX = parseInt(d, 0)
            }
            if (f == "rotationY") {
                a.rotationY = parseInt(d, 0)
            }
            if (f == "rotationZ") {
                a.rotationZ = parseInt(d, 0)
            }
            if (f == "rotationZ") {
                a.rotation = parseInt(d, 0)
            }
            if (f == "scaleX") {
                a.scaleX = parseFloat(d)
            }
            if (f == "scaleY") {
                a.scaleY = parseFloat(d)
            }
            if (f == "opacity") {
                a.opacity = parseFloat(d)
            }
            if (f == "skewX") {
                a.skewX = parseInt(d, 0)
            }
            if (f == "skewY") {
                a.skewY = parseInt(d, 0)
            }
            if (f == "x") {
                a.x = parseInt(d, 0)
            }
            if (f == "y") {
                a.y = parseInt(d, 0)
            }
            if (f == "z") {
                a.z = parseInt(d, 0)
            }
            if (f == "transformOrigin") {
                a.transformOrigin = d.toString()
            }
            if (f == "transformPerspective") {
                a.transformPerspective = parseInt(d, 0)
            }
        });
        return a
    };
    var az = function(b) {
        var d = b.split("animation:");
        var c = new Object;
        c.animation = at(ak(), d[1]);
        var a = d[0].split(";");
        a2.each(a, function(h, g) {
            g = g.split(":");
            var j = g[0],
                f = g[1];
            if (j == "typ") {
                c.typ = f
            }
            if (j == "speed") {
                c.speed = parseInt(f, 0) / 1000
            }
            if (j == "start") {
                c.start = parseInt(f, 0) / 1000
            }
            if (j == "elementdelay") {
                c.elementdelay = parseFloat(f)
            }
            if (j == "ease") {
                c.ease = f
            }
        });
        return c
    };
    var aW = function(j, a, m, y) {
        function g() {}

        function x() {}
        if (j.data("ctl") == aK) {
            j.data("ctl", new punchgs.TimelineLite)
        }
        var t = j.data("ctl"),
            k = 0,
            w = 0,
            q = j.find(".tp-caption"),
            b = a.container.find(".tp-static-layers").find(".tp-caption");
        t.pause();
        a2.each(b, function(d, c) {
            q.push(c)
        });
        q.each(function(bA) {
            var bv = m,
                bI = -1,
                bF = a2(this);
            if (bF.hasClass("tp-static-layer")) {
                var by = bF.data("startslide"),
                    bL = bF.data("endslide");
                if (by == -1 || by == "-1") {
                    bF.data("startslide", 0)
                }
                if (bL == -1 || bL == "-1") {
                    bF.data("endslide", a.slideamount)
                }
                if (by == 0 && bL == a.slideamount - 1) {
                    bF.data("endslide", a.slideamount + 1)
                }
                by = bF.data("startslide"), bL = bF.data("endslide");
                if (!bF.hasClass("tp-is-shown")) {
                    if (by <= a.next && bL >= a.next || by == a.next || bL == a.next) {
                        bF.addClass("tp-is-shown");
                        bI = 1
                    } else {
                        bI = 0
                    }
                } else {
                    if (bL == a.next || by > a.next || bL < a.next) {
                        bI = 2
                    } else {
                        bI = 0
                    }
                }
            }
            k = a.width / 2 - a.startwidth * a.bw / 2;
            var bu = a.bw;
            var bB = a.bh;
            if (a.fullScreen == "on") {
                w = a.height / 2 - a.startheight * a.bh / 2
            }
            if (a.autoHeight == "on" || a.minHeight != aK && a.minHeight > 0) {
                w = a.container.height() / 2 - a.startheight * a.bh / 2
            }
            if (w < 0) {
                w = 0
            }
            var bH = 0;
            if (a.width < a.hideCaptionAtLimit && bF.data("captionhidden") == "on") {
                bF.addClass("tp-hidden-caption");
                bH = 1
            } else {
                if (a.width < a.hideAllCaptionAtLimit || a.width < a.hideAllCaptionAtLilmit) {
                    bF.addClass("tp-hidden-caption");
                    bH = 1
                } else {
                    bF.removeClass("tp-hidden-caption")
                }
            }
            if (bH == 0) {
                if (bF.data("linktoslide") != aK && !bF.hasClass("hasclicklistener")) {
                    bF.addClass("hasclicklistener");
                    bF.css({
                        cursor: "pointer"
                    });
                    if (bF.data("linktoslide") != "no") {
                        bF.click(function() {
                            var d = a2(this);
                            var f = d.data("linktoslide");
                            if (f != "next" && f != "prev") {
                                a.container.data("showus", f);
                                a.container.parent().find(".tp-rightarrow").click()
                            } else {
                                if (f == "next") {
                                    a.container.parent().find(".tp-rightarrow").click()
                                } else {
                                    if (f == "prev") {
                                        a.container.parent().find(".tp-leftarrow").click()
                                    }
                                }
                            }
                        })
                    }
                }
                if (k < 0) {
                    k = 0
                }
                if (bF.hasClass("tp-videolayer") || bF.find("iframe").length > 0 || bF.find("video").length > 0) {
                    var bq = "iframe" + Math.round(Math.random() * 100000 + 1),
                        bM = bF.data("videowidth"),
                        bs = bF.data("videoheight"),
                        a9 = bF.data("videoattributes"),
                        u = bF.data("ytid"),
                        br = bF.data("vimeoid"),
                        o = bF.data("videpreload"),
                        H = bF.data("videomp4"),
                        bb = bF.data("videowebm"),
                        bC = bF.data("videoogv"),
                        J = bF.data("videocontrols"),
                        bc = "http",
                        bE = bF.data("videoloop") == "loop" ? "loop" : bF.data("videoloop") == "loopandnoslidestop" ? "loop" : "";
                    if (bF.data("thumbimage") != aK && bF.data("videoposter") == aK) {
                        bF.data("videoposter", bF.data("thumbimage"))
                    }
                    if (u != aK && String(u).length > 1 && bF.find("iframe").length == 0) {
                        bc = "https";
                        if (J == "none") {
                            a9 = a9.replace("controls=1", "controls=0");
                            if (a9.toLowerCase().indexOf("controls") == -1) {
                                a9 = a9 + "&controls=0"
                            }
                        }
                        bF.append('<iframe style="visible:hidden" src="' + bc + "://www.youtube.com/embed/" + u + "?" + a9 + '" width="' + bM + '" height="' + bs + '" style="width:' + bM + "px;height:" + bs + 'px"></iframe>')
                    }
                    if (br != aK && String(br).length > 1 && bF.find("iframe").length == 0) {
                        if (location.protocol === "https:") {
                            bc = "https"
                        }
                        bF.append('<iframe style="visible:hidden" src="' + bc + "://player.vimeo.com/video/" + br + "?" + a9 + '" width="' + bM + '" height="' + bs + '" style="width:' + bM + "px;height:" + bs + 'px"></iframe>')
                    }
                    if ((H != aK || bb != aK) && bF.find("video").length == 0) {
                        if (J != "controls") {
                            J = ""
                        }
                        var R = '<video style="visible:hidden" class="" ' + bE + ' preload="' + o + '" width="' + bM + '" height="' + bs + '"';
                        if (bF.data("videoposter") != aK) {
                            if (bF.data("videoposter") != aK) {
                                R = R + 'poster="' + bF.data("videoposter") + '">'
                            }
                        }
                        if (bb != aK && av().toLowerCase() == "firefox") {
                            R = R + '<source src="' + bb + '" type="video/webm" />'
                        }
                        if (H != aK) {
                            R = R + '<source src="' + H + '" type="video/mp4" />'
                        }
                        if (bC != aK) {
                            R = R + '<source src="' + bC + '" type="video/ogg" />'
                        }
                        R = R + "</video>";
                        bF.append(R);
                        if (J == "controls") {
                            bF.append('<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div></div>')
                        }
                    }
                    var bp = false;
                    if (bF.data("autoplayonlyfirsttime") == true || bF.data("autoplayonlyfirsttime") == "true" || bF.data("autoplay") == true) {
                        bF.data("autoplay", true);
                        bp = true
                    }
                    bF.find("iframe").each(function() {
                        var z = a2(this);
                        punchgs.TweenLite.to(z, 0.1, {
                            autoAlpha: 1,
                            zIndex: 0,
                            transformStyle: "preserve-3d",
                            z: 0,
                            rotationX: 0,
                            force3D: "auto"
                        });
                        if (aq()) {
                            var s = z.attr("src");
                            z.attr("src", "");
                            z.attr("src", s)
                        }
                        a.nextslideatend = bF.data("nextslideatend");
                        if (bF.data("videoposter") != aK && bF.data("videoposter").length > 2 && bF.data("autoplay") != true && !bv) {
                            if (bF.find(".tp-thumb-image").length == 0) {
                                bF.append('<div class="tp-thumb-image" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url(' + bF.data("videoposter") + '); background-size:cover"></div>')
                            } else {
                                punchgs.TweenLite.set(bF.find(".tp-thumb-image"), {
                                    autoAlpha: 1
                                })
                            }
                        }
                        if (z.attr("src").toLowerCase().indexOf("youtube") >= 0) {
                            if (!z.hasClass("HasListener")) {
                                try {
                                    z.attr("id", bq);
                                    var S;
                                    var N = setInterval(function() {
                                        if (YT != aK) {
                                            if (typeof YT.Player != aK && typeof YT.Player != "undefined") {
                                                S = new YT.Player(bq, {
                                                    events: {
                                                        onStateChange: al,
                                                        onReady: function(Y) {
                                                            var T = Y.target.getVideoEmbedCode(),
                                                                f = a2("#" + T.split('id="')[1].split('"')[0]),
                                                                p = f.closest(".tp-caption"),
                                                                V = p.data("videorate"),
                                                                d = p.data("videostart");
                                                            if (V != aK) {
                                                                Y.target.setPlaybackRate(parseFloat(V))
                                                            }
                                                            if (!aq() && p.data("autoplay") == true || bp) {
                                                                p.data("timerplay", setTimeout(function() {
                                                                    Y.target.playVideo()
                                                                }, p.data("start")))
                                                            }
                                                            p.find(".tp-thumb-image").click(function() {
                                                                punchgs.TweenLite.to(a2(this), 0.3, {
                                                                    autoAlpha: 0,
                                                                    force3D: "auto",
                                                                    ease: punchgs.Power3.easeInOut
                                                                });
                                                                if (!aq()) {
                                                                    S.playVideo()
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                        z.addClass("HasListener");
                                        bF.data("player", S);
                                        clearInterval(N)
                                    }, 100)
                                } catch (G) {}
                            } else {
                                if (!m) {
                                    var S = bF.data("player");
                                    if (bF.data("forcerewind") == "on" && !aq()) {
                                        S.seekTo(0)
                                    }
                                    if (!aq() && bF.data("autoplay") == true || bp) {
                                        bF.data("timerplay", setTimeout(function() {
                                            S.playVideo()
                                        }, bF.data("start")))
                                    }
                                }
                            }
                        } else {
                            if (z.attr("src").toLowerCase().indexOf("vimeo") >= 0) {
                                if (!z.hasClass("HasListener")) {
                                    z.addClass("HasListener");
                                    z.attr("id", bq);
                                    var C = z.attr("src");
                                    var K = {},
                                        h = C,
                                        I = /([^&=]+)=([^&]*)/g,
                                        Q;
                                    while (Q = I.exec(h)) {
                                        K[decodeURIComponent(Q[1])] = decodeURIComponent(Q[2])
                                    }
                                    if (K.player_id != aK) {
                                        C = C.replace(K.player_id, bq)
                                    } else {
                                        C = C + "&player_id=" + bq
                                    }
                                    try {
                                        C = C.replace("api=0", "api=1")
                                    } catch (G) {}
                                    C = C + "&api=1";
                                    z.attr("src", C);
                                    var S = bF.find("iframe")[0];
                                    var A = setInterval(function() {
                                        if ($f != aK) {
                                            if (typeof $f(bq).api != aK && typeof $f(bq).api != "undefined") {
                                                $f(S).addEvent("ready", function() {
                                                    a7(bq, bp)
                                                });
                                                clearInterval(A)
                                            }
                                        }
                                    }, 100)
                                } else {
                                    if (!m) {
                                        if (!aq() && (bF.data("autoplay") == true || bF.data("forcerewind") == "on")) {
                                            var z = bF.find("iframe");
                                            var E = z.attr("id");
                                            var L = $f(E);
                                            if (bF.data("forcerewind") == "on") {
                                                L.api("seekTo", 0)
                                            }
                                            bF.data("timerplay", setTimeout(function() {
                                                if (bF.data("autoplay") == true) {
                                                    L.api("play")
                                                }
                                            }, bF.data("start")))
                                        }
                                    }
                                }
                            }
                        }
                    });
                    if (aq() && bF.data("disablevideoonmobile") == 1 || a6(8)) {
                        bF.find("video").remove()
                    }
                    if (bF.find("video").length > 0) {
                        bF.find("video").each(function(p) {
                            var d = this,
                                f = a2(this);
                            if (!f.parent().hasClass("html5vid")) {
                                f.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:auto;height:auto"></div>')
                            }
                            var h = f.parent();
                            an(d, "loadedmetadata", function(n) {
                                n.data("metaloaded", 1)
                            }(h));
                            clearInterval(h.data("interval"));
                            h.data("interval", setInterval(function() {
                                if (h.data("metaloaded") == 1 || d.duration != NaN) {
                                    clearInterval(h.data("interval"));
                                    if (!h.hasClass("HasListener")) {
                                        h.addClass("HasListener");
                                        if (bF.data("dottedoverlay") != "none" && bF.data("dottedoverlay") != aK) {
                                            if (bF.find(".tp-dottedoverlay").length != 1) {
                                                h.append('<div class="tp-dottedoverlay ' + bF.data("dottedoverlay") + '"></div>')
                                            }
                                        }
                                        if (f.attr("control") == aK) {
                                            if (h.find(".tp-video-play-button").length == 0) {
                                                h.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><div class="tp-revstop"></div></div>')
                                            }
                                            h.find("video, .tp-poster, .tp-video-play-button").click(function() {
                                                if (h.hasClass("videoisplaying")) {
                                                    d.pause()
                                                } else {
                                                    d.play()
                                                }
                                            })
                                        }
                                        if (bF.data("forcecover") == 1 || bF.hasClass("fullscreenvideo")) {
                                            if (bF.data("forcecover") == 1) {
                                                ax(h, a.container);
                                                h.addClass("fullcoveredvideo");
                                                bF.addClass("fullcoveredvideo")
                                            }
                                            h.css({
                                                width: "100%",
                                                height: "100%"
                                            })
                                        }
                                        var G = bF.find(".tp-vid-play-pause")[0],
                                            K = bF.find(".tp-vid-mute")[0],
                                            A = bF.find(".tp-vid-full-screen")[0],
                                            z = bF.find(".tp-seek-bar")[0],
                                            C = bF.find(".tp-volume-bar")[0];
                                        if (G != aK) {
                                            an(G, "click", function() {
                                                if (d.paused == true) {
                                                    d.play()
                                                } else {
                                                    d.pause()
                                                }
                                            });
                                            an(K, "click", function() {
                                                if (d.muted == false) {
                                                    d.muted = true;
                                                    K.innerHTML = "Unmute"
                                                } else {
                                                    d.muted = false;
                                                    K.innerHTML = "Mute"
                                                }
                                            });
                                            an(A, "click", function() {
                                                if (d.requestFullscreen) {
                                                    d.requestFullscreen()
                                                } else {
                                                    if (d.mozRequestFullScreen) {
                                                        d.mozRequestFullScreen()
                                                    } else {
                                                        if (d.webkitRequestFullscreen) {
                                                            d.webkitRequestFullscreen()
                                                        }
                                                    }
                                                }
                                            });
                                            an(z, "change", function() {
                                                var n = d.duration * (z.value / 100);
                                                d.currentTime = n
                                            });
                                            an(d, "timeupdate", function() {
                                                var n = 100 / d.duration * d.currentTime;
                                                z.value = n
                                            });
                                            an(z, "mousedown", function() {
                                                d.pause()
                                            });
                                            an(z, "mouseup", function() {
                                                d.play()
                                            });
                                            an(C, "change", function() {
                                                d.volume = C.value
                                            })
                                        }
                                        an(d, "play", function() {
                                            if (bF.data("volume") == "mute") {
                                                d.muted = true
                                            }
                                            h.addClass("videoisplaying");
                                            if (bF.data("videoloop") == "loopandnoslidestop") {
                                                a.videoplaying = false;
                                                a.container.trigger("starttimer");
                                                a.container.trigger("revolution.slide.onvideostop")
                                            } else {
                                                a.videoplaying = true;
                                                a.container.trigger("stoptimer");
                                                a.container.trigger("revolution.slide.onvideoplay")
                                            }
                                            var L = bF.find(".tp-vid-play-pause")[0],
                                                N = bF.find(".tp-vid-mute")[0];
                                            if (L != aK) {
                                                L.innerHTML = "Pause"
                                            }
                                            if (N != aK && d.muted) {
                                                N.innerHTML = "Unmute"
                                            }
                                        });
                                        an(d, "pause", function() {
                                            h.removeClass("videoisplaying");
                                            a.videoplaying = false;
                                            a.container.trigger("starttimer");
                                            a.container.trigger("revolution.slide.onvideostop");
                                            var n = bF.find(".tp-vid-play-pause")[0];
                                            if (n != aK) {
                                                n.innerHTML = "Play"
                                            }
                                        });
                                        an(d, "ended", function() {
                                            h.removeClass("videoisplaying");
                                            a.videoplaying = false;
                                            a.container.trigger("starttimer");
                                            a.container.trigger("revolution.slide.onvideostop");
                                            if (a.nextslideatend == true) {
                                                a.container.revnext()
                                            }
                                        })
                                    }
                                    var s = false;
                                    if (bF.data("autoplayonlyfirsttime") == true || bF.data("autoplayonlyfirsttime") == "true") {
                                        s = true
                                    }
                                    var I = 16 / 9;
                                    if (bF.data("aspectratio") == "4:3") {
                                        I = 4 / 3
                                    }
                                    h.data("mediaAspect", I);
                                    if (h.closest(".tp-caption").data("forcecover") == 1) {
                                        ax(h, a.container);
                                        h.addClass("fullcoveredvideo")
                                    }
                                    f.css({
                                        display: "block"
                                    });
                                    a.nextslideatend = bF.data("nextslideatend");
                                    if (bF.data("autoplay") == true || s == true) {
                                        if (bF.data("videoloop") == "loopandnoslidestop") {
                                            a.videoplaying = false;
                                            a.container.trigger("starttimer");
                                            a.container.trigger("revolution.slide.onvideostop")
                                        } else {
                                            a.videoplaying = true;
                                            a.container.trigger("stoptimer");
                                            a.container.trigger("revolution.slide.onvideoplay")
                                        }
                                        if (bF.data("forcerewind") == "on" && !h.hasClass("videoisplaying")) {
                                            if (d.currentTime > 0) {
                                                d.currentTime = 0
                                            }
                                        }
                                        if (bF.data("volume") == "mute") {
                                            d.muted = true
                                        }
                                        h.data("timerplay", setTimeout(function() {
                                            if (bF.data("forcerewind") == "on" && !h.hasClass("videoisplaying")) {
                                                if (d.currentTime > 0) {
                                                    d.currentTime = 0
                                                }
                                            }
                                            if (bF.data("volume") == "mute") {
                                                d.muted = true
                                            }
                                            d.play()
                                        }, 10 + bF.data("start")))
                                    }
                                    if (h.data("ww") == aK) {
                                        h.data("ww", f.attr("width"))
                                    }
                                    if (h.data("hh") == aK) {
                                        h.data("hh", f.attr("height"))
                                    }
                                    if (!bF.hasClass("fullscreenvideo") && bF.data("forcecover") == 1) {
                                        try {
                                            h.width(h.data("ww") * a.bw);
                                            h.height(h.data("hh") * a.bh)
                                        } catch (E) {}
                                    }
                                    clearInterval(h.data("interval"))
                                }
                            }), 100)
                        })
                    }
                    if (bF.data("autoplay") == true) {
                        setTimeout(function() {
                            if (bF.data("videoloop") != "loopandnoslidestop") {
                                a.videoplaying = true;
                                a.container.trigger("stoptimer")
                            }
                        }, 200);
                        if (bF.data("videoloop") != "loopandnoslidestop") {
                            a.videoplaying = true;
                            a.container.trigger("stoptimer")
                        }
                        if (bF.data("autoplayonlyfirsttime") == true || bF.data("autoplayonlyfirsttime") == "true") {
                            bF.data("autoplay", false);
                            bF.data("autoplayonlyfirsttime", false)
                        }
                    }
                }
                var l = 0;
                var bn = 0;
                if (bF.find("img").length > 0) {
                    var O = bF.find("img");
                    if (O.width() == 0) {
                        O.css({
                            width: "auto"
                        })
                    }
                    if (O.height() == 0) {
                        O.css({
                            height: "auto"
                        })
                    }
                    if (O.data("ww") == aK && O.width() > 0) {
                        O.data("ww", O.width())
                    }
                    if (O.data("hh") == aK && O.height() > 0) {
                        O.data("hh", O.height())
                    }
                    var D = O.data("ww");
                    var W = O.data("hh");
                    if (D == aK) {
                        D = 0
                    }
                    if (W == aK) {
                        W = 0
                    }
                    O.width(D * a.bw);
                    O.height(W * a.bh);
                    l = O.width();
                    bn = O.height()
                } else {
                    if (bF.find("iframe").length > 0 || bF.find("video").length > 0) {
                        var i = false,
                            O = bF.find("iframe");
                        if (O.length == 0) {
                            O = bF.find("video");
                            i = true
                        }
                        O.css({
                            display: "block"
                        });
                        if (bF.data("ww") == aK) {
                            bF.data("ww", O.width())
                        }
                        if (bF.data("hh") == aK) {
                            bF.data("hh", O.height())
                        }
                        var D = bF.data("ww"),
                            W = bF.data("hh");
                        var c = bF;
                        if (c.data("fsize") == aK) {
                            c.data("fsize", parseInt(c.css("font-size"), 0) || 0)
                        }
                        if (c.data("pt") == aK) {
                            c.data("pt", parseInt(c.css("paddingTop"), 0) || 0)
                        }
                        if (c.data("pb") == aK) {
                            c.data("pb", parseInt(c.css("paddingBottom"), 0) || 0)
                        }
                        if (c.data("pl") == aK) {
                            c.data("pl", parseInt(c.css("paddingLeft"), 0) || 0)
                        }
                        if (c.data("pr") == aK) {
                            c.data("pr", parseInt(c.css("paddingRight"), 0) || 0)
                        }
                        if (c.data("mt") == aK) {
                            c.data("mt", parseInt(c.css("marginTop"), 0) || 0)
                        }
                        if (c.data("mb") == aK) {
                            c.data("mb", parseInt(c.css("marginBottom"), 0) || 0)
                        }
                        if (c.data("ml") == aK) {
                            c.data("ml", parseInt(c.css("marginLeft"), 0) || 0)
                        }
                        if (c.data("mr") == aK) {
                            c.data("mr", parseInt(c.css("marginRight"), 0) || 0)
                        }
                        if (c.data("bt") == aK) {
                            c.data("bt", parseInt(c.css("borderTop"), 0) || 0)
                        }
                        if (c.data("bb") == aK) {
                            c.data("bb", parseInt(c.css("borderBottom"), 0) || 0)
                        }
                        if (c.data("bl") == aK) {
                            c.data("bl", parseInt(c.css("borderLeft"), 0) || 0)
                        }
                        if (c.data("br") == aK) {
                            c.data("br", parseInt(c.css("borderRight"), 0) || 0)
                        }
                        if (c.data("lh") == aK) {
                            c.data("lh", parseInt(c.css("lineHeight"), 0) || 0)
                        }
                        if (c.data("lh") == "auto") {
                            c.data("lh", c.data("fsize") + 4)
                        }
                        var bx = a.width,
                            bJ = a.height;
                        if (bx > a.startwidth) {
                            bx = a.startwidth
                        }
                        if (bJ > a.startheight) {
                            bJ = a.startheight
                        }
                        if (!bF.hasClass("fullscreenvideo")) {
                            bF.css({
                                "font-size": c.data("fsize") * a.bw + "px",
                                "padding-top": c.data("pt") * a.bh + "px",
                                "padding-bottom": c.data("pb") * a.bh + "px",
                                "padding-left": c.data("pl") * a.bw + "px",
                                "padding-right": c.data("pr") * a.bw + "px",
                                "margin-top": c.data("mt") * a.bh + "px",
                                "margin-bottom": c.data("mb") * a.bh + "px",
                                "margin-left": c.data("ml") * a.bw + "px",
                                "margin-right": c.data("mr") * a.bw + "px",
                                "border-top": c.data("bt") * a.bh + "px",
                                "border-bottom": c.data("bb") * a.bh + "px",
                                "border-left": c.data("bl") * a.bw + "px",
                                "border-right": c.data("br") * a.bw + "px",
                                "line-height": c.data("lh") * a.bh + "px",
                                height: W * a.bh + "px"
                            })
                        } else {
                            k = 0;
                            w = 0;
                            bF.data("x", 0);
                            bF.data("y", 0);
                            var bD = a.height;
                            if (a.autoHeight == "on") {
                                bD = a.container.height()
                            }
                            bF.css({
                                width: a.width,
                                height: bD
                            })
                        }
                        if (i == false) {
                            O.width(D * a.bw);
                            O.height(W * a.bh)
                        } else {
                            if (bF.data("forcecover") != 1 && !bF.hasClass("fullscreenvideo")) {
                                O.width(D * a.bw);
                                O.height(W * a.bh)
                            }
                        }
                        l = O.width();
                        bn = O.height()
                    } else {
                        bF.find(".tp-resizeme, .tp-resizeme *").each(function() {
                            aN(a2(this), a)
                        });
                        if (bF.hasClass("tp-resizeme")) {
                            bF.find("*").each(function() {
                                aN(a2(this), a)
                            })
                        }
                        aN(bF, a);
                        bn = bF.outerHeight(true);
                        l = bF.outerWidth(true);
                        var bk = bF.outerHeight();
                        var bh = bF.css("backgroundColor");
                        bF.find(".frontcorner").css({
                            borderWidth: bk + "px",
                            left: 0 - bk + "px",
                            borderRight: "0px solid transparent",
                            borderTopColor: bh
                        });
                        bF.find(".frontcornertop").css({
                            borderWidth: bk + "px",
                            left: 0 - bk + "px",
                            borderRight: "0px solid transparent",
                            borderBottomColor: bh
                        });
                        bF.find(".backcorner").css({
                            borderWidth: bk + "px",
                            right: 0 - bk + "px",
                            borderLeft: "0px solid transparent",
                            borderBottomColor: bh
                        });
                        bF.find(".backcornertop").css({
                            borderWidth: bk + "px",
                            right: 0 - bk + "px",
                            borderLeft: "0px solid transparent",
                            borderTopColor: bh
                        })
                    }
                }
                if (a.fullScreenAlignForce == "on") {
                    k = 0;
                    w = 0
                }
                if (bF.data("voffset") == aK) {
                    bF.data("voffset", 0)
                }
                if (bF.data("hoffset") == aK) {
                    bF.data("hoffset", 0)
                }
                var U = bF.data("voffset") * bu;
                var bj = bF.data("hoffset") * bu;
                var bl = a.startwidth * bu;
                var r = a.startheight * bu;
                if (a.fullScreenAlignForce == "on") {
                    bl = a.container.width();
                    r = a.container.height()
                }
                if (bF.data("x") == "center" || bF.data("xcenter") == "center") {
                    bF.data("xcenter", "center");
                    bF.data("x", bl / 2 - bF.outerWidth(true) / 2 + bj)
                }
                if (bF.data("x") == "left" || bF.data("xleft") == "left") {
                    bF.data("xleft", "left");
                    bF.data("x", 0 / bu + bj)
                }
                if (bF.data("x") == "right" || bF.data("xright") == "right") {
                    bF.data("xright", "right");
                    bF.data("x", (bl - bF.outerWidth(true) + bj) / bu)
                }
                if (bF.data("y") == "center" || bF.data("ycenter") == "center") {
                    bF.data("ycenter", "center");
                    bF.data("y", r / 2 - bF.outerHeight(true) / 2 + U)
                }
                if (bF.data("y") == "top" || bF.data("ytop") == "top") {
                    bF.data("ytop", "top");
                    bF.data("y", 0 / a.bh + U)
                }
                if (bF.data("y") == "bottom" || bF.data("ybottom") == "bottom") {
                    bF.data("ybottom", "bottom");
                    bF.data("y", (r - bF.outerHeight(true) + U) / bu)
                }
                if (bF.data("start") == aK) {
                    bF.data("start", 1000)
                }
                var bg = bF.data("easing");
                if (bg == aK) {
                    bg = "punchgs.Power1.easeOut"
                }
                var bi = bF.data("start") / 1000,
                    bf = bF.data("speed") / 1000;
                if (bF.data("x") == "center" || bF.data("xcenter") == "center") {
                    var bz = bF.data("x") + k
                } else {
                    var bz = bu * bF.data("x") + k
                }
                if (bF.data("y") == "center" || bF.data("ycenter") == "center") {
                    var P = bF.data("y") + w
                } else {
                    var P = a.bh * bF.data("y") + w
                }
                punchgs.TweenLite.set(bF, {
                    top: P,
                    left: bz,
                    overwrite: "auto"
                });
                if (bI == 0) {
                    bv = true
                }
                if (bF.data("timeline") != aK && !bv) {
                    if (bI != 2) {
                        bF.data("timeline").gotoAndPlay(0)
                    }
                    bv = true
                }
                if (!bv) {
                    if (bF.data("timeline") != aK) {}
                    var B = new punchgs.TimelineLite({
                        smoothChildTiming: true,
                        onStart: x
                    });
                    B.pause();
                    if (a.fullScreenAlignForce == "on") {}
                    var a8 = bF;
                    if (bF.data("mySplitText") != aK) {
                        bF.data("mySplitText").revert()
                    }
                    if (bF.data("splitin") == "chars" || bF.data("splitin") == "words" || bF.data("splitin") == "lines" || bF.data("splitout") == "chars" || bF.data("splitout") == "words" || bF.data("splitout") == "lines") {
                        if (bF.find("a").length > 0) {
                            bF.data("mySplitText", new punchgs.SplitText(bF.find("a"), {
                                type: "lines,words,chars",
                                charsClass: "tp-splitted",
                                wordsClass: "tp-splitted",
                                linesClass: "tp-splitted"
                            }))
                        } else {
                            if (bF.find(".tp-layer-inner-rotation").length > 0) {
                                bF.data("mySplitText", new punchgs.SplitText(bF.find(".tp-layer-inner-rotation"), {
                                    type: "lines,words,chars",
                                    charsClass: "tp-splitted",
                                    wordsClass: "tp-splitted",
                                    linesClass: "tp-splitted"
                                }))
                            } else {
                                bF.data("mySplitText", new punchgs.SplitText(bF, {
                                    type: "lines,words,chars",
                                    charsClass: "tp-splitted",
                                    wordsClass: "tp-splitted",
                                    linesClass: "tp-splitted"
                                }))
                            }
                        }
                        bF.addClass("splitted")
                    }
                    if (bF.data("splitin") == "chars") {
                        a8 = bF.data("mySplitText").chars
                    }
                    if (bF.data("splitin") == "words") {
                        a8 = bF.data("mySplitText").words
                    }
                    if (bF.data("splitin") == "lines") {
                        a8 = bF.data("mySplitText").lines
                    }
                    var M = ak();
                    var F = ak();
                    if (bF.data("repeat") != aK) {
                        repeatV = bF.data("repeat")
                    }
                    if (bF.data("yoyo") != aK) {
                        yoyoV = bF.data("yoyo")
                    }
                    if (bF.data("repeatdelay") != aK) {
                        repeatdelayV = bF.data("repeatdelay")
                    }
                    var ba = bF.attr("class");
                    if (ba.match("customin")) {
                        M = at(M, bF.data("customin"))
                    } else {
                        if (ba.match("randomrotate")) {
                            M.scale = Math.random() * 3 + 1;
                            M.rotation = Math.round(Math.random() * 200 - 100);
                            M.x = Math.round(Math.random() * 200 - 100);
                            M.y = Math.round(Math.random() * 200 - 100)
                        } else {
                            if (ba.match("lfr") || ba.match("skewfromright")) {
                                M.x = 15 + a.width
                            } else {
                                if (ba.match("lfl") || ba.match("skewfromleft")) {
                                    M.x = -15 - l
                                } else {
                                    if (ba.match("sfl") || ba.match("skewfromleftshort")) {
                                        M.x = -50
                                    } else {
                                        if (ba.match("sfr") || ba.match("skewfromrightshort")) {
                                            M.x = 50
                                        } else {
                                            if (ba.match("lft")) {
                                                M.y = -25 - bn
                                            } else {
                                                if (ba.match("lfb")) {
                                                    M.y = 25 + a.height
                                                } else {
                                                    if (ba.match("sft")) {
                                                        M.y = -50
                                                    } else {
                                                        if (ba.match("sfb")) {
                                                            M.y = 50
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (ba.match("skewfromright") || bF.hasClass("skewfromrightshort")) {
                        M.skewX = -85
                    } else {
                        if (ba.match("skewfromleft") || bF.hasClass("skewfromleftshort")) {
                            M.skewX = 85
                        }
                    }
                    if (ba.match("fade") || ba.match("sft") || ba.match("sfl") || ba.match("sfb") || ba.match("skewfromleftshort") || ba.match("sfr") || ba.match("skewfromrightshort")) {
                        M.opacity = 0
                    }
                    if (av().toLowerCase() == "safari") {}
                    var bw = bF.data("elementdelay") == aK ? 0 : bF.data("elementdelay");
                    F.ease = M.ease = bF.data("easing") == aK ? punchgs.Power1.easeInOut : bF.data("easing");
                    M.data = new Object;
                    M.data.oldx = M.x;
                    M.data.oldy = M.y;
                    F.data = new Object;
                    F.data.oldx = F.x;
                    F.data.oldy = F.y;
                    M.x = M.x * bu;
                    M.y = M.y * bu;
                    var bK = new punchgs.TimelineLite;
                    if (bI != 2) {
                        if (ba.match("customin")) {
                            if (a8 != bF) {
                                B.add(punchgs.TweenLite.set(bF, {
                                    force3D: "auto",
                                    opacity: 1,
                                    scaleX: 1,
                                    scaleY: 1,
                                    rotationX: 0,
                                    rotationY: 0,
                                    rotationZ: 0,
                                    skewX: 0,
                                    skewY: 0,
                                    z: 0,
                                    x: 0,
                                    y: 0,
                                    visibility: "visible",
                                    delay: 0,
                                    overwrite: "all"
                                }))
                            }
                            M.visibility = "hidden";
                            F.visibility = "visible";
                            F.overwrite = "all";
                            F.opacity = 1;
                            F.onComplete = g();
                            F.delay = bi;
                            F.force3D = "auto";
                            B.add(bK.staggerFromTo(a8, bf, M, F, bw), "frame0")
                        } else {
                            M.visibility = "visible";
                            M.transformPerspective = 600;
                            if (a8 != bF) {
                                B.add(punchgs.TweenLite.set(bF, {
                                    force3D: "auto",
                                    opacity: 1,
                                    scaleX: 1,
                                    scaleY: 1,
                                    rotationX: 0,
                                    rotationY: 0,
                                    rotationZ: 0,
                                    skewX: 0,
                                    skewY: 0,
                                    z: 0,
                                    x: 0,
                                    y: 0,
                                    visibility: "visible",
                                    delay: 0,
                                    overwrite: "all"
                                }))
                            }
                            F.visibility = "visible";
                            F.delay = bi;
                            F.onComplete = g();
                            F.opacity = 1;
                            F.force3D = "auto";
                            if (ba.match("randomrotate") && a8 != bF) {
                                for (var bA = 0; bA < a8.length; bA++) {
                                    var X = new Object;
                                    var bo = new Object;
                                    a2.extend(X, M);
                                    a2.extend(bo, F);
                                    M.scale = Math.random() * 3 + 1;
                                    M.rotation = Math.round(Math.random() * 200 - 100);
                                    M.x = Math.round(Math.random() * 200 - 100);
                                    M.y = Math.round(Math.random() * 200 - 100);
                                    if (bA != 0) {
                                        bo.delay = bi + bA * bw
                                    }
                                    B.append(punchgs.TweenLite.fromTo(a8[bA], bf, X, bo), "frame0")
                                }
                            } else {
                                B.add(bK.staggerFromTo(a8, bf, M, F, bw), "frame0")
                            }
                        }
                    }
                    bF.data("timeline", B);
                    var bm = new Array;
                    if (bF.data("frames") != aK) {
                        var be = bF.data("frames");
                        be = be.replace(/\s+/g, "");
                        be = be.replace("{", "");
                        var bd = be.split("}");
                        a2.each(bd, function(f, d) {
                            if (d.length > 0) {
                                var h = az(d);
                                ad(bF, a, h, "frame" + (f + 10), bu)
                            }
                        })
                    }
                    B = bF.data("timeline");
                    if (bF.data("end") != aK && (bI == -1 || bI == 2)) {
                        ac(bF, a, bF.data("end") / 1000, M, "frame99", bu)
                    } else {
                        if (bI == -1 || bI == 2) {
                            ac(bF, a, 999999, M, "frame99", bu)
                        } else {
                            ac(bF, a, 200, M, "frame99", bu)
                        }
                    }
                    B = bF.data("timeline");
                    bF.data("timeline", B);
                    ai(bF, bu);
                    B.resume()
                }
            }
            if (bv) {
                af(bF);
                ai(bF, bu);
                if (bF.data("timeline") != aK) {
                    var bG = bF.data("timeline").getTweensOf();
                    a2.each(bG, function(p, z) {
                        if (z.vars.data != aK) {
                            var h = z.vars.data.oldx * bu;
                            var d = z.vars.data.oldy * bu;
                            if (z.progress() != 1 && z.progress() != 0) {
                                try {
                                    z.vars.x = h;
                                    z.vary.y = d
                                } catch (f) {}
                            } else {
                                if (z.progress() == 1) {
                                    punchgs.TweenLite.set(z.target, {
                                        x: h,
                                        y: d
                                    })
                                }
                            }
                        }
                    })
                }
            }
        });
        var v = a2("body").find("#" + a.container.attr("id")).find(".tp-bannertimer");
        v.data("opt", a);
        if (y != aK) {
            setTimeout(function() {
                y.resume()
            }, 30)
        }
    };
    var av = function() {
        var c = navigator.appName,
            a = navigator.userAgent,
            d;
        var b = a.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (b && (d = a.match(/version\/([\.\d]+)/i)) != null) {
            b[2] = d[1]
        }
        b = b ? [b[1], b[2]] : [c, navigator.appVersion, "-?"];
        return b[0]
    };
    var ar = function() {
        var c = navigator.appName,
            a = navigator.userAgent,
            d;
        var b = a.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (b && (d = a.match(/version\/([\.\d]+)/i)) != null) {
            b[2] = d[1]
        }
        b = b ? [b[1], b[2]] : [c, navigator.appVersion, "-?"];
        return b[1]
    };
    var aN = function(a, b) {
        if (a.data("fsize") == aK) {
            a.data("fsize", parseInt(a.css("font-size"), 0) || 0)
        }
        if (a.data("pt") == aK) {
            a.data("pt", parseInt(a.css("paddingTop"), 0) || 0)
        }
        if (a.data("pb") == aK) {
            a.data("pb", parseInt(a.css("paddingBottom"), 0) || 0)
        }
        if (a.data("pl") == aK) {
            a.data("pl", parseInt(a.css("paddingLeft"), 0) || 0)
        }
        if (a.data("pr") == aK) {
            a.data("pr", parseInt(a.css("paddingRight"), 0) || 0)
        }
        if (a.data("mt") == aK) {
            a.data("mt", parseInt(a.css("marginTop"), 0) || 0)
        }
        if (a.data("mb") == aK) {
            a.data("mb", parseInt(a.css("marginBottom"), 0) || 0)
        }
        if (a.data("ml") == aK) {
            a.data("ml", parseInt(a.css("marginLeft"), 0) || 0)
        }
        if (a.data("mr") == aK) {
            a.data("mr", parseInt(a.css("marginRight"), 0) || 0)
        }
        if (a.data("bt") == aK) {
            a.data("bt", parseInt(a.css("borderTopWidth"), 0) || 0)
        }
        if (a.data("bb") == aK) {
            a.data("bb", parseInt(a.css("borderBottomWidth"), 0) || 0)
        }
        if (a.data("bl") == aK) {
            a.data("bl", parseInt(a.css("borderLeftWidth"), 0) || 0)
        }
        if (a.data("br") == aK) {
            a.data("br", parseInt(a.css("borderRightWidth"), 0) || 0)
        }
        if (a.data("ls") == aK) {
            a.data("ls", parseInt(a.css("letterSpacing"), 0) || 0)
        }
        if (a.data("lh") == aK) {
            a.data("lh", parseInt(a.css("lineHeight"), 0) || "auto")
        }
        if (a.data("minwidth") == aK) {
            a.data("minwidth", parseInt(a.css("minWidth"), 0) || 0)
        }
        if (a.data("minheight") == aK) {
            a.data("minheight", parseInt(a.css("minHeight"), 0) || 0)
        }
        if (a.data("maxwidth") == aK) {
            a.data("maxwidth", parseInt(a.css("maxWidth"), 0) || "none")
        }
        if (a.data("maxheight") == aK) {
            a.data("maxheight", parseInt(a.css("maxHeight"), 0) || "none")
        }
        if (a.data("wii") == aK) {
            a.data("wii", parseInt(a.css("width"), 0) || 0)
        }
        if (a.data("hii") == aK) {
            a.data("hii", parseInt(a.css("height"), 0) || 0)
        }
        if (a.data("wan") == aK) {
            a.data("wan", a.css("-webkit-transition"))
        }
        if (a.data("moan") == aK) {
            a.data("moan", a.css("-moz-animation-transition"))
        }
        if (a.data("man") == aK) {
            a.data("man", a.css("-ms-animation-transition"))
        }
        if (a.data("ani") == aK) {
            a.data("ani", a.css("transition"))
        }
        if (a.data("lh") == "auto") {
            a.data("lh", a.data("fsize") + 4)
        }
        if (!a.hasClass("tp-splitted")) {
            a.css("-webkit-transition", "none");
            a.css("-moz-transition", "none");
            a.css("-ms-transition", "none");
            a.css("transition", "none");
            punchgs.TweenLite.set(a, {
                fontSize: Math.round(a.data("fsize") * b.bw) + "px",
                letterSpacing: Math.floor(a.data("ls") * b.bw) + "px",
                paddingTop: Math.round(a.data("pt") * b.bh) + "px",
                paddingBottom: Math.round(a.data("pb") * b.bh) + "px",
                paddingLeft: Math.round(a.data("pl") * b.bw) + "px",
                paddingRight: Math.round(a.data("pr") * b.bw) + "px",
                marginTop: a.data("mt") * b.bh + "px",
                marginBottom: a.data("mb") * b.bh + "px",
                marginLeft: a.data("ml") * b.bw + "px",
                marginRight: a.data("mr") * b.bw + "px",
                borderTopWidth: Math.round(a.data("bt") * b.bh) + "px",
                borderBottomWidth: Math.round(a.data("bb") * b.bh) + "px",
                borderLeftWidth: Math.round(a.data("bl") * b.bw) + "px",
                borderRightWidth: Math.round(a.data("br") * b.bw) + "px",
                lineHeight: Math.round(a.data("lh") * b.bh) + "px",
                minWidth: a.data("minwidth") * b.bw + "px",
                minHeight: a.data("minheight") * b.bh + "px",
                overwrite: "auto"
            });
            setTimeout(function() {
                a.css("-webkit-transition", a.data("wan"));
                a.css("-moz-transition", a.data("moan"));
                a.css("-ms-transition", a.data("man"));
                a.css("transition", a.data("ani"))
            }, 30);
            if (a.data("maxheight") != "none") {
                a.css({
                    maxHeight: a.data("maxheight") * b.bh + "px"
                })
            }
            if (a.data("maxwidth") != "none") {
                a.css({
                    maxWidth: a.data("maxwidth") * b.bw + "px"
                })
            }
        }
    };
    var ai = function(b, a) {
        b.find(".rs-pendulum").each(function() {
            var j = a2(this);
            if (j.data("timeline") == aK) {
                j.data("timeline", new punchgs.TimelineLite);
                var f = j.data("startdeg") == aK ? -20 : j.data("startdeg"),
                    g = j.data("enddeg") == aK ? 20 : j.data("enddeg"),
                    h = j.data("speed") == aK ? 2 : j.data("speed"),
                    d = j.data("origin") == aK ? "50% 50%" : j.data("origin"),
                    c = j.data("easing") == aK ? punchgs.Power2.easeInOut : j.data("ease");
                f = f * a;
                g = g * a;
                j.data("timeline").append(new punchgs.TweenLite.fromTo(j, h, {
                    force3D: "auto",
                    rotation: f,
                    transformOrigin: d
                }, {
                    rotation: g,
                    ease: c
                }));
                j.data("timeline").append(new punchgs.TweenLite.fromTo(j, h, {
                    force3D: "auto",
                    rotation: g,
                    transformOrigin: d
                }, {
                    rotation: f,
                    ease: c,
                    onComplete: function() {
                        j.data("timeline").restart()
                    }
                }))
            }
        });
        b.find(".rs-rotate").each(function() {
            var f = a2(this);
            if (f.data("timeline") == aK) {
                f.data("timeline", new punchgs.TimelineLite);
                var c = f.data("startdeg") == aK ? 0 : f.data("startdeg"),
                    d = f.data("enddeg") == aK ? 360 : f.data("enddeg");
                speed = f.data("speed") == aK ? 2 : f.data("speed"), origin = f.data("origin") == aK ? "50% 50%" : f.data("origin"), easing = f.data("easing") == aK ? punchgs.Power2.easeInOut : f.data("easing");
                c = c * a;
                d = d * a;
                f.data("timeline").append(new punchgs.TweenLite.fromTo(f, speed, {
                    force3D: "auto",
                    rotation: c,
                    transformOrigin: origin
                }, {
                    rotation: d,
                    ease: easing,
                    onComplete: function() {
                        f.data("timeline").restart()
                    }
                }))
            }
        });
        b.find(".rs-slideloop").each(function() {
            var l = a2(this);
            if (l.data("timeline") == aK) {
                l.data("timeline", new punchgs.TimelineLite);
                var g = l.data("xs") == aK ? 0 : l.data("xs"),
                    h = l.data("ys") == aK ? 0 : l.data("ys"),
                    k = l.data("xe") == aK ? 0 : l.data("xe"),
                    d = l.data("ye") == aK ? 0 : l.data("ye"),
                    c = l.data("speed") == aK ? 2 : l.data("speed"),
                    j = l.data("easing") == aK ? punchgs.Power2.easeInOut : l.data("easing");
                g = g * a;
                h = h * a;
                k = k * a;
                d = d * a;
                l.data("timeline").append(new punchgs.TweenLite.fromTo(l, c, {
                    force3D: "auto",
                    x: g,
                    y: h
                }, {
                    x: k,
                    y: d,
                    ease: j
                }));
                l.data("timeline").append(new punchgs.TweenLite.fromTo(l, c, {
                    force3D: "auto",
                    x: k,
                    y: d
                }, {
                    x: g,
                    y: h,
                    onComplete: function() {
                        l.data("timeline").restart()
                    }
                }))
            }
        });
        b.find(".rs-pulse").each(function() {
            var h = a2(this);
            if (h.data("timeline") == aK) {
                h.data("timeline", new punchgs.TimelineLite);
                var f = h.data("zoomstart") == aK ? 0 : h.data("zoomstart"),
                    c = h.data("zoomend") == aK ? 0 : h.data("zoomend"),
                    d = h.data("speed") == aK ? 2 : h.data("speed"),
                    g = h.data("easing") == aK ? punchgs.Power2.easeInOut : h.data("easing");
                h.data("timeline").append(new punchgs.TweenLite.fromTo(h, d, {
                    force3D: "auto",
                    scale: f
                }, {
                    scale: c,
                    ease: g
                }));
                h.data("timeline").append(new punchgs.TweenLite.fromTo(h, d, {
                    force3D: "auto",
                    scale: c
                }, {
                    scale: f,
                    onComplete: function() {
                        h.data("timeline").restart()
                    }
                }))
            }
        });
        b.find(".rs-wave").each(function() {
            var j = a2(this);
            if (j.data("timeline") == aK) {
                j.data("timeline", new punchgs.TimelineLite);
                var f = j.data("angle") == aK ? 10 : j.data("angle"),
                    g = j.data("radius") == aK ? 10 : j.data("radius"),
                    h = j.data("speed") == aK ? -20 : j.data("speed"),
                    d = j.data("origin") == aK ? -20 : j.data("origin");
                f = f * a;
                g = g * a;
                var c = {
                    a: 0,
                    ang: f,
                    element: j,
                    unit: g
                };
                j.data("timeline").append(new punchgs.TweenLite.fromTo(c, h, {
                    a: 360
                }, {
                    a: 0,
                    force3D: "auto",
                    ease: punchgs.Linear.easeNone,
                    onUpdate: function() {
                        var i = c.a * (Math.PI / 180);
                        punchgs.TweenLite.to(c.element, 0.1, {
                            force3D: "auto",
                            x: Math.cos(i) * c.unit,
                            y: c.unit * (1 - Math.sin(i))
                        })
                    },
                    onComplete: function() {
                        j.data("timeline").restart()
                    }
                }))
            }
        })
    };
    var af = function(a) {
        a.find(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function() {
            var b = a2(this);
            if (b.data("timeline") != aK) {
                b.data("timeline").pause();
                b.data("timeline", null)
            }
        })
    };
    var aE = function(f, c) {
        var a = 0;
        var b = f.find(".tp-caption"),
            d = c.container.find(".tp-static-layers").find(".tp-caption");
        a2.each(d, function(h, g) {
            b.push(g)
        });
        b.each(function(j) {
            var B = -1;
            var i = a2(this);
            if (i.hasClass("tp-static-layer")) {
                if (i.data("startslide") == -1 || i.data("startslide") == "-1") {
                    i.data("startslide", 0)
                }
                if (i.data("endslide") == -1 || i.data("endslide") == "-1") {
                    i.data("endslide", c.slideamount)
                }
                if (i.hasClass("tp-is-shown")) {
                    if (i.data("startslide") > c.next || i.data("endslide") < c.next) {
                        B = 2;
                        i.removeClass("tp-is-shown")
                    } else {
                        B = 0
                    }
                } else {
                    B = 2
                }
            }
            if (B != 0) {
                af(i);
                if (i.find("iframe").length > 0) {
                    punchgs.TweenLite.to(i.find("iframe"), 0.2, {
                        autoAlpha: 0
                    });
                    if (aq()) {
                        i.find("iframe").remove()
                    }
                    try {
                        var A = i.find("iframe");
                        var y = A.attr("id");
                        var t = $f(y);
                        t.api("pause");
                        clearTimeout(i.data("timerplay"))
                    } catch (q) {}
                    try {
                        var x = i.data("player");
                        x.stopVideo();
                        clearTimeout(i.data("timerplay"))
                    } catch (q) {}
                }
                if (i.find("video").length > 0) {
                    try {
                        i.find("video").each(function(l) {
                            var o = a2(this).parent();
                            var m = o.attr("id");
                            clearTimeout(o.data("timerplay"));
                            var h = this;
                            h.pause()
                        })
                    } catch (q) {}
                }
                try {
                    var r = i.data("timeline");
                    var g = r.getLabelTime("frame99");
                    var w = r.time();
                    if (g > w) {
                        var z = r.getTweensOf(i);
                        a2.each(z, function(l, h) {
                            if (l != 0) {
                                h.pause()
                            }
                        });
                        if (i.css("opacity") != 0) {
                            var k = i.data("endspeed") == aK ? i.data("speed") : i.data("endspeed");
                            if (k > a) {
                                a = k
                            }
                            r.play("frame99")
                        } else {
                            r.progress(1, false)
                        }
                    }
                } catch (q) {}
            }
        });
        return a
    };
    var ad = function(h, k, g, d, f) {
        var j = h.data("timeline");
        var c = new punchgs.TimelineLite;
        var b = h;
        if (g.typ == "chars") {
            b = h.data("mySplitText").chars
        } else {
            if (g.typ == "words") {
                b = h.data("mySplitText").words
            } else {
                if (g.typ == "lines") {
                    b = h.data("mySplitText").lines
                }
            }
        }
        g.animation.ease = g.ease;
        if (g.animation.rotationZ != aK) {
            g.animation.rotation = g.animation.rotationZ
        }
        g.animation.data = new Object;
        g.animation.data.oldx = g.animation.x;
        g.animation.data.oldy = g.animation.y;
        g.animation.x = g.animation.x * f;
        g.animation.y = g.animation.y * f;
        j.add(c.staggerTo(b, g.speed, g.animation, g.elementdelay), g.start);
        j.addLabel(d, g.start);
        h.data("timeline", j)
    };
    var ac = function(v, j, b, m, z, g) {
        var y = v.data("timeline"),
            x = new punchgs.TimelineLite;
        var t = ak(),
            k = v.data("endspeed") == aK ? v.data("speed") : v.data("endspeed"),
            w = v.attr("class");
        t.ease = v.data("endeasing") == aK ? punchgs.Power1.easeInOut : v.data("endeasing");
        k = k / 1000;
        if (w.match("ltr") || w.match("ltl") || w.match("str") || w.match("stl") || w.match("ltt") || w.match("ltb") || w.match("stt") || w.match("stb") || w.match("skewtoright") || w.match("skewtorightshort") || w.match("skewtoleft") || w.match("skewtoleftshort") || w.match("fadeout") || w.match("randomrotateout")) {
            if (w.match("skewtoright") || w.match("skewtorightshort")) {
                t.skewX = 35
            } else {
                if (w.match("skewtoleft") || w.match("skewtoleftshort")) {
                    t.skewX = -35
                }
            }
            if (w.match("ltr") || w.match("skewtoright")) {
                t.x = j.width + 60
            } else {
                if (w.match("ltl") || w.match("skewtoleft")) {
                    t.x = 0 - (j.width + 60)
                } else {
                    if (w.match("ltt")) {
                        t.y = 0 - (j.height + 60)
                    } else {
                        if (w.match("ltb")) {
                            t.y = j.height + 60
                        } else {
                            if (w.match("str") || w.match("skewtorightshort")) {
                                t.x = 50;
                                t.opacity = 0
                            } else {
                                if (w.match("stl") || w.match("skewtoleftshort")) {
                                    t.x = -50;
                                    t.opacity = 0
                                } else {
                                    if (w.match("stt")) {
                                        t.y = -50;
                                        t.opacity = 0
                                    } else {
                                        if (w.match("stb")) {
                                            t.y = 50;
                                            t.opacity = 0
                                        } else {
                                            if (w.match("randomrotateout")) {
                                                t.x = Math.random() * j.width;
                                                t.y = Math.random() * j.height;
                                                t.scale = Math.random() * 2 + 0.3;
                                                t.rotation = Math.random() * 360 - 180;
                                                t.opacity = 0
                                            } else {
                                                if (w.match("fadeout")) {
                                                    t.opacity = 0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (w.match("skewtorightshort")) {
                t.x = 270
            } else {
                if (w.match("skewtoleftshort")) {
                    t.x = -270
                }
            }
            t.data = new Object;
            t.data.oldx = t.x;
            t.data.oldy = t.y;
            t.x = t.x * g;
            t.y = t.y * g;
            t.overwrite = "auto";
            var q = v;
            var q = v;
            if (v.data("splitout") == "chars") {
                q = v.data("mySplitText").chars
            } else {
                if (v.data("splitout") == "words") {
                    q = v.data("mySplitText").words
                } else {
                    if (v.data("splitout") == "lines") {
                        q = v.data("mySplitText").lines
                    }
                }
            }
            var d = v.data("endelementdelay") == aK ? 0 : v.data("endelementdelay");
            y.add(x.staggerTo(q, k, t, d), b)
        } else {
            if (v.hasClass("customout")) {
                t = at(t, v.data("customout"));
                var q = v;
                if (v.data("splitout") == "chars") {
                    q = v.data("mySplitText").chars
                } else {
                    if (v.data("splitout") == "words") {
                        q = v.data("mySplitText").words
                    } else {
                        if (v.data("splitout") == "lines") {
                            q = v.data("mySplitText").lines
                        }
                    }
                }
                var d = v.data("endelementdelay") == aK ? 0 : v.data("endelementdelay");
                t.onStart = function() {
                    punchgs.TweenLite.set(v, {
                        transformPerspective: t.transformPerspective,
                        transformOrigin: t.transformOrigin,
                        overwrite: "auto"
                    })
                };
                t.data = new Object;
                t.data.oldx = t.x;
                t.data.oldy = t.y;
                t.x = t.x * g;
                t.y = t.y * g;
                y.add(x.staggerTo(q, k, t, d), b)
            } else {
                m.delay = 0;
                y.add(punchgs.TweenLite.to(v, k, m), b)
            }
        }
        y.addLabel(z, b);
        v.data("timeline", y)
    };
    var ae = function(a, c) {
        a.children().each(function() {
            try {
                a2(this).die("click")
            } catch (d) {}
            try {
                a2(this).die("mouseenter")
            } catch (d) {}
            try {
                a2(this).die("mouseleave")
            } catch (d) {}
            try {
                a2(this).unbind("hover")
            } catch (d) {}
        });
        try {
            a.die("click", "mouseenter", "mouseleave")
        } catch (b) {}
        clearInterval(c.cdint);
        a = null
    };
    var aD = function(d, c) {
        c.cd = 0;
        c.loop = 0;
        if (c.stopAfterLoops != aK && c.stopAfterLoops > -1) {
            c.looptogo = c.stopAfterLoops
        } else {
            c.looptogo = 9999999
        }
        if (c.stopAtSlide != aK && c.stopAtSlide > -1) {
            c.lastslidetoshow = c.stopAtSlide
        } else {
            c.lastslidetoshow = 999
        }
        c.stopLoop = "off";
        if (c.looptogo == 0) {
            c.stopLoop = "on"
        }
        if (c.slideamount > 1 && !(c.stopAfterLoops == 0 && c.stopAtSlide == 1)) {
            var a = d.find(".tp-bannertimer");
            d.on("stoptimer", function() {
                var f = a2(this).find(".tp-bannertimer");
                f.data("tween").pause();
                if (c.hideTimerBar == "on") {
                    f.css({
                        visibility: "hidden"
                    })
                }
            });
            d.on("starttimer", function() {
                if (c.conthover != 1 && c.videoplaying != true && c.width > c.hideSliderAtLimit && c.bannertimeronpause != true && c.overnav != true) {
                    if (c.stopLoop == "on" && c.next == c.lastslidetoshow - 1 || c.noloopanymore == 1) {
                        c.noloopanymore = 1
                    } else {
                        a.css({
                            visibility: "visible"
                        });
                        a.data("tween").resume()
                    }
                }
                if (c.hideTimerBar == "on") {
                    a.css({
                        visibility: "hidden"
                    })
                }
            });
            d.on("restarttimer", function() {
                var f = a2(this).find(".tp-bannertimer");
                if (c.stopLoop == "on" && c.next == c.lastslidetoshow - 1 || c.noloopanymore == 1) {
                    c.noloopanymore = 1
                } else {
                    f.css({
                        visibility: "visible"
                    });
                    f.data("tween").kill();
                    f.data("tween", punchgs.TweenLite.fromTo(f, c.delay / 1000, {
                        width: "0%"
                    }, {
                        force3D: "auto",
                        width: "100%",
                        ease: punchgs.Linear.easeNone,
                        onComplete: b,
                        delay: 1
                    }))
                }
                if (c.hideTimerBar == "on") {
                    f.css({
                        visibility: "hidden"
                    })
                }
            });
            d.on("nulltimer", function() {
                a.data("tween").pause(0);
                if (c.hideTimerBar == "on") {
                    a.css({
                        visibility: "hidden"
                    })
                }
            });
            var b = function() {
                if (a2("body").find(d).length == 0) {
                    ae(d, c);
                    clearInterval(c.cdint)
                }
                d.trigger("revolution.slide.slideatend");
                if (d.data("conthover-changed") == 1) {
                    c.conthover = d.data("conthover");
                    d.data("conthover-changed", 0)
                }
                c.act = c.next;
                c.next = c.next + 1;
                if (c.next > d.find(">ul >li").length - 1) {
                    c.next = 0;
                    c.looptogo = c.looptogo - 1;
                    if (c.looptogo <= 0) {
                        c.stopLoop = "on"
                    }
                }
                if (c.stopLoop == "on" && c.next == c.lastslidetoshow - 1) {
                    d.find(".tp-bannertimer").css({
                        visibility: "hidden"
                    });
                    d.trigger("revolution.slide.onstop");
                    c.noloopanymore = 1
                } else {
                    a.data("tween").restart()
                }
                am(d, c)
            };
            a.data("tween", punchgs.TweenLite.fromTo(a, c.delay / 1000, {
                width: "0%"
            }, {
                force3D: "auto",
                width: "100%",
                ease: punchgs.Linear.easeNone,
                onComplete: b,
                delay: 1
            }));
            a.data("opt", c);
            d.hover(function() {
                if (c.onHoverStop == "on" && !aq()) {
                    d.trigger("stoptimer");
                    d.trigger("revolution.slide.onpause");
                    var f = d.find(">ul >li:eq(" + c.next + ") .slotholder");
                    f.find(".defaultimg").each(function() {
                        var g = a2(this);
                        if (g.data("kenburn") != aK) {
                            g.data("kenburn").pause()
                        }
                    })
                }
            }, function() {
                if (d.data("conthover") != 1) {
                    d.trigger("revolution.slide.onresume");
                    d.trigger("starttimer");
                    var f = d.find(">ul >li:eq(" + c.next + ") .slotholder");
                    f.find(".defaultimg").each(function() {
                        var g = a2(this);
                        if (g.data("kenburn") != aK) {
                            g.data("kenburn").play()
                        }
                    })
                }
            })
        }
    };
    var aq = function() {
        var b = ["android", "webos", "iphone", "ipad", "blackberry", "Android", "webos", , "iPod", "iPhone", "iPad", "Blackberry", "BlackBerry"];
        var a = false;
        for (var c in b) {
            if (navigator.userAgent.split(b[c]).length > 1) {
                a = true
            }
        }
        return a
    };
    var ap = function(g, c, j) {
        var f = c.data("owidth");
        var b = c.data("oheight");
        if (f / b > j.width / j.height) {
            var d = j.container.width() / f;
            var h = b * d;
            var a = h / j.container.height() * g;
            g = g * (100 / a);
            a = 100;
            g = g;
            return g + "% " + a + "% 1"
        } else {
            var d = j.container.width() / f;
            var h = b * d;
            var a = h / j.container.height() * g;
            return g + "% " + a + "%"
        }
    };
    var aj = function(I, F, L, D) {
        try {
            var H = I.find(">ul:first-child >li:eq(" + F.act + ")")
        } catch (B) {
            var H = I.find(">ul:first-child >li:eq(1)")
        }
        F.lastslide = F.act;
        var P = I.find(">ul:first-child >li:eq(" + F.next + ")"),
            K = P.find(".slotholder"),
            R = K.data("bgposition"),
            M = K.data("bgpositionend"),
            G = K.data("zoomstart") / 100,
            Q = K.data("zoomend") / 100,
            A = K.data("rotationstart"),
            J = K.data("rotationend"),
            O = K.data("bgfit"),
            q = K.data("bgfitend"),
            U = K.data("easeme"),
            z = K.data("duration") / 1000,
            C = 100;
        if (O == aK) {
            O = 100
        }
        if (q == aK) {
            q = 100
        }
        var j = O,
            t = q;
        O = ap(O, K, F);
        q = ap(q, K, F);
        C = ap(100, K, F);
        if (G == aK) {
            G = 1
        }
        if (Q == aK) {
            Q = 1
        }
        if (A == aK) {
            A = 0
        }
        if (J == aK) {
            J = 0
        }
        if (G < 1) {
            G = 1
        }
        if (Q < 1) {
            Q = 1
        }
        var a = new Object;
        a.w = parseInt(C.split(" ")[0], 0), a.h = parseInt(C.split(" ")[1], 0);
        var k = false;
        if (C.split(" ")[2] == "1") {
            k = true
        }
        K.find(".defaultimg").each(function() {
            var w = a2(this);
            if (K.find(".kenburnimg").length == 0) {
                K.append('<div class="kenburnimg" style="position:absolute;z-index:1;width:100%;height:100%;top:0px;left:0px;"><img src="' + w.attr("src") + '" style="-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;position:absolute;width:' + a.w + "%;height:" + a.h + '%;"></div>')
            } else {
                K.find(".kenburnimg img").css({
                    width: a.w + "%",
                    height: a.h + "%"
                })
            }
            var g = K.find(".kenburnimg img");
            var h = au(F, R, O, g, k),
                c = au(F, M, q, g, k);
            if (k) {
                h.w = j / 100;
                c.w = t / 100
            }
            if (D) {
                punchgs.TweenLite.set(g, {
                    autoAlpha: 0,
                    transformPerspective: 1200,
                    transformOrigin: "0% 0%",
                    top: 0,
                    left: 0,
                    scale: h.w,
                    x: h.x,
                    y: h.y
                });
                var s = h.w,
                    l = s * g.width() - F.width,
                    b = s * g.height() - F.height,
                    m = Math.abs(h.x / l * 100),
                    r = Math.abs(h.y / b * 100);
                if (b == 0) {
                    r = 0
                }
                if (l == 0) {
                    m = 0
                }
                w.data("bgposition", m + "% " + r + "%");
                if (!a6(8)) {
                    w.data("currotate", ab(g))
                }
                if (!a6(8)) {
                    w.data("curscale", a.w * s + "%  " + (a.h * s + "%"))
                }
                K.find(".kenburnimg").remove()
            } else {
                w.data("kenburn", punchgs.TweenLite.fromTo(g, z, {
                    autoAlpha: 1,
                    force3D: punchgs.force3d,
                    transformOrigin: "0% 0%",
                    top: 0,
                    left: 0,
                    scale: h.w,
                    x: h.x,
                    y: h.y
                }, {
                    autoAlpha: 1,
                    rotationZ: J,
                    ease: U,
                    x: c.x,
                    y: c.y,
                    scale: c.w,
                    onUpdate: function() {
                        var p = g[0]._gsTransform.scaleX;
                        var f = p * g.width() - F.width,
                            n = p * g.height() - F.height,
                            v = Math.abs(g[0]._gsTransform.x / f * 100),
                            d = Math.abs(g[0]._gsTransform.y / n * 100);
                        if (n == 0) {
                            d = 0
                        }
                        if (f == 0) {
                            v = 0
                        }
                        w.data("bgposition", v + "% " + d + "%");
                        if (!a6(8)) {
                            w.data("currotate", ab(g))
                        }
                        if (!a6(8)) {
                            w.data("curscale", a.w * p + "%  " + (a.h * p + "%"))
                        }
                    }
                }))
            }
        })
    };
    var au = function(f, b, g, d, a) {
        var c = new Object;
        if (!a) {
            c.w = parseInt(g.split(" ")[0], 0) / 100
        } else {
            c.w = parseInt(g.split(" ")[1], 0) / 100
        }
        switch (b) {
            case "left top":
            case "top left":
                c.x = 0;
                c.y = 0;
                break;
            case "center top":
            case "top center":
                c.x = ((0 - d.width()) * c.w + parseInt(f.width, 0)) / 2;
                c.y = 0;
                break;
            case "top right":
            case "right top":
                c.x = (0 - d.width()) * c.w + parseInt(f.width, 0);
                c.y = 0;
                break;
            case "center left":
            case "left center":
                c.x = 0;
                c.y = ((0 - d.height()) * c.w + parseInt(f.height, 0)) / 2;
                break;
            case "center center":
                c.x = ((0 - d.width()) * c.w + parseInt(f.width, 0)) / 2;
                c.y = ((0 - d.height()) * c.w + parseInt(f.height, 0)) / 2;
                break;
            case "center right":
            case "right center":
                c.x = (0 - d.width()) * c.w + parseInt(f.width, 0);
                c.y = ((0 - d.height()) * c.w + parseInt(f.height, 0)) / 2;
                break;
            case "bottom left":
            case "left bottom":
                c.x = 0;
                c.y = (0 - d.height()) * c.w + parseInt(f.height, 0);
                break;
            case "bottom center":
            case "center bottom":
                c.x = ((0 - d.width()) * c.w + parseInt(f.width, 0)) / 2;
                c.y = (0 - d.height()) * c.w + parseInt(f.height, 0);
                break;
            case "bottom right":
            case "right bottom":
                c.x = (0 - d.width()) * c.w + parseInt(f.width, 0);
                c.y = (0 - d.height()) * c.w + parseInt(f.height, 0);
                break
        }
        return c
    };
    var ab = function(f) {
        var b = f.css("-webkit-transform") || f.css("-moz-transform") || f.css("-ms-transform") || f.css("-o-transform") || f.css("transform");
        if (b !== "none") {
            var g = b.split("(")[1].split(")")[0].split(",");
            var d = g[0];
            var a = g[1];
            var c = Math.round(Math.atan2(a, d) * (180 / Math.PI))
        } else {
            var c = 0
        }
        return c < 0 ? c += 360 : c
    };
    var aa = function(j, g) {
        try {
            var d = j.find(">ul:first-child >li:eq(" + g.act + ")")
        } catch (f) {
            var d = j.find(">ul:first-child >li:eq(1)")
        }
        g.lastslide = g.act;
        var h = j.find(">ul:first-child >li:eq(" + g.next + ")");
        var c = d.find(".slotholder");
        var b = h.find(".slotholder");
        j.find(".defaultimg").each(function() {
            var a = a2(this);
            punchgs.TweenLite.killTweensOf(a, false);
            punchgs.TweenLite.set(a, {
                scale: 1,
                rotationZ: 0
            });
            punchgs.TweenLite.killTweensOf(a.data("kenburn img"), false);
            if (a.data("kenburn") != aK) {
                a.data("kenburn").pause()
            }
            if (a.data("currotate") != aK && a.data("bgposition") != aK && a.data("curscale") != aK) {
                punchgs.TweenLite.set(a, {
                    rotation: a.data("currotate"),
                    backgroundPosition: a.data("bgposition"),
                    backgroundSize: a.data("curscale")
                })
            }
            if (a != aK && a.data("kenburn img") != aK && a.data("kenburn img").length > 0) {
                punchgs.TweenLite.set(a.data("kenburn img"), {
                    autoAlpha: 0
                })
            }
        })
    };
    var aO = function(a, b) {
        if (aq() && b.parallaxDisableOnMobile == "on") {
            return false
        }
        a.find(">ul:first-child >li").each(function() {
            var c = a2(this);
            for (var d = 1; d <= 10; d++) {
                c.find(".rs-parallaxlevel-" + d).each(function() {
                    var f = a2(this);
                    f.wrap('<div style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:' + f.css("zIndex") + '" class="tp-parallax-container" data-parallaxlevel="' + b.parallaxLevels[d - 1] + '"></div>')
                })
            }
        });
        if (b.parallax == "mouse" || b.parallax == "scroll+mouse" || b.parallax == "mouse+scroll") {
            a.mouseenter(function(g) {
                var j = a.find(".current-sr-slide-visible");
                var f = a.offset().top,
                    c = a.offset().left,
                    d = g.pageX - c,
                    h = g.pageY - f;
                j.data("enterx", d);
                j.data("entery", h)
            });
            a.on("mousemove.hoverdir, mouseleave.hoverdir", function(k) {
                var h = a.find(".current-sr-slide-visible");
                switch (k.type) {
                    case "mousemove":
                        var j = a.offset().top,
                            n = a.offset().left,
                            g = h.data("enterx"),
                            d = h.data("entery"),
                            m = g - (k.pageX - n),
                            c = d - (k.pageY - j);
                        h.find(".tp-parallax-container").each(function() {
                            var l = a2(this),
                                p = parseInt(l.data("parallaxlevel"), 0) / 100,
                                f = m * p,
                                o = c * p;
                            if (b.parallax == "scroll+mouse" || b.parallax == "mouse+scroll") {
                                punchgs.TweenLite.to(l, 0.4, {
                                    force3D: "auto",
                                    x: f,
                                    ease: punchgs.Power3.easeOut,
                                    overwrite: "all"
                                })
                            } else {
                                punchgs.TweenLite.to(l, 0.4, {
                                    force3D: "auto",
                                    x: f,
                                    y: o,
                                    ease: punchgs.Power3.easeOut,
                                    overwrite: "all"
                                })
                            }
                        });
                        break;
                    case "mouseleave":
                        h.find(".tp-parallax-container").each(function() {
                            var f = a2(this);
                            if (b.parallax == "scroll+mouse" || b.parallax == "mouse+scroll") {
                                punchgs.TweenLite.to(f, 1.5, {
                                    force3D: "auto",
                                    x: 0,
                                    ease: punchgs.Power3.easeOut
                                })
                            } else {
                                punchgs.TweenLite.to(f, 1.5, {
                                    force3D: "auto",
                                    x: 0,
                                    y: 0,
                                    ease: punchgs.Power3.easeOut
                                })
                            }
                        });
                        break
                }
            });
            if (aq()) {
                window.ondeviceorientation = function(k) {
                    var h = Math.round(k.beta || 0),
                        f = Math.round(k.gamma || 0);
                    var g = a.find(".current-sr-slide-visible");
                    if (a2(window).width() > a2(window).height()) {
                        var j = f;
                        f = h;
                        h = j
                    }
                    var d = 360 / a.width() * f,
                        c = 180 / a.height() * h;
                    g.find(".tp-parallax-container").each(function() {
                        var m = a2(this),
                            p = parseInt(m.data("parallaxlevel"), 0) / 100,
                            o = d * p,
                            l = c * p;
                        punchgs.TweenLite.to(m, 0.2, {
                            force3D: "auto",
                            x: o,
                            y: l,
                            ease: punchgs.Power3.easeOut
                        })
                    })
                }
            }
        }
        if (b.parallax == "scroll" || b.parallax == "scroll+mouse" || b.parallax == "mouse+scroll") {
            a2(window).on("scroll", function(c) {
                a0(a, b)
            })
        }
    };
    var a0 = function(v, g) {
        if (aq() && g.parallaxDisableOnMobile == "on") {
            return false
        }
        var b = v.offset().top,
            j = a2(window).scrollTop(),
            w = b + v.height() / 2,
            d = b + v.height() / 2 - j,
            q = a2(window).height() / 2,
            p = q - d;
        if (w < q) {
            p = p - (q - w)
        }
        var k = v.find(".current-sr-slide-visible");
        v.find(".tp-parallax-container").each(function(c) {
            var l = a2(this),
                f = parseInt(l.data("parallaxlevel"), 0) / 100,
                a = p * f;
            l.data("parallaxoffset", a);
            punchgs.TweenLite.to(l, 0.2, {
                force3D: "auto",
                y: a,
                ease: punchgs.Power3.easeOut
            })
        });
        if (g.parallaxBgFreeze != "on") {
            var h = g.parallaxLevels[0] / 100,
                m = p * h;
            punchgs.TweenLite.to(v, 0.2, {
                force3D: "auto",
                y: m,
                ease: punchgs.Power3.easeOut
            })
        }
    };
    var aV = function(k, h) {
        var f = k.parent();
        if (h.navigationType == "thumb" || h.navsecond == "both") {
            f.append('<div class="tp-bullets tp-thumbs ' + h.navigationStyle + '"><div class="tp-mask"><div class="tp-thumbcontainer"></div></div></div>')
        }
        var g = f.find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer");
        var j = g.parent();
        j.width(h.thumbWidth * h.thumbAmount);
        j.height(h.thumbHeight);
        j.parent().width(h.thumbWidth * h.thumbAmount);
        j.parent().height(h.thumbHeight);
        k.find(">ul:first >li").each(function(p) {
            var n = k.find(">ul:first >li:eq(" + p + ")");
            var q = n.find(".defaultimg").css("backgroundColor");
            if (n.data("thumb") != aK) {
                var m = n.data("thumb")
            } else {
                var m = n.find("img:first").attr("src")
            }
            g.append('<div class="bullet thumb" style="background-color:' + q + ";position:relative;width:" + h.thumbWidth + "px;height:" + h.thumbHeight + "px;background-image:url(" + m + ') !important;background-size:cover;background-position:center center;"></div>');
            var l = g.find(".bullet:first")
        });
        var d = 10;
        g.find(".bullet").each(function(l) {
            var a = a2(this);
            if (l == h.slideamount - 1) {
                a.addClass("last")
            }
            if (l == 0) {
                a.addClass("first")
            }
            a.width(h.thumbWidth);
            a.height(h.thumbHeight);
            if (d < a.outerWidth(true)) {
                d = a.outerWidth(true)
            }
            a.click(function() {
                if (h.transition == 0 && a.index() != h.act) {
                    h.next = a.index();
                    a1(h, k)
                }
            })
        });
        var c = d * k.find(">ul:first >li").length;
        var b = g.parent().width();
        h.thumbWidth = d;
        if (b < c) {
            a2(document).mousemove(function(a) {
                a2("body").data("mousex", a.pageX)
            });
            g.parent().mouseenter(function() {
                var y = a2(this);
                var m = y.offset(),
                    q = a2("body").data("mousex") - m.left,
                    z = y.width(),
                    n = y.find(".bullet:first").outerWidth(true),
                    x = n * k.find(">ul:first >li").length,
                    w = x - z + 15,
                    v = w / z;
                y.addClass("over");
                q = q - 30;
                var p = 0 - q * v;
                if (p > 0) {
                    p = 0
                }
                if (p < 0 - x + z) {
                    p = 0 - x + z
                }
                aB(y, p, 200)
            });
            g.parent().mousemove(function() {
                var y = a2(this),
                    m = y.offset(),
                    q = a2("body").data("mousex") - m.left,
                    z = y.width(),
                    n = y.find(".bullet:first").outerWidth(true),
                    x = n * k.find(">ul:first >li").length - 1,
                    w = x - z + 15,
                    v = w / z;
                q = q - 3;
                if (q < 6) {
                    q = 0
                }
                if (q + 3 > z - 6) {
                    q = z
                }
                var p = 0 - q * v;
                if (p > 0) {
                    p = 0
                }
                if (p < 0 - x + z) {
                    p = 0 - x + z
                }
                aB(y, p, 0)
            });
            g.parent().mouseleave(function() {
                var a = a2(this);
                a.removeClass("over");
                aC(k)
            })
        }
    };
    var aC = function(k) {
        var q = k.parent().find(".tp-bullets.tp-thumbs .tp-mask .tp-thumbcontainer"),
            d = q.parent(),
            b = d.offset(),
            h = d.find(".bullet:first").outerWidth(true),
            v = d.find(".bullet.selected").index() * h,
            c = d.width(),
            h = d.find(".bullet:first").outerWidth(true),
            p = h * k.find(">ul:first >li").length,
            m = p - c,
            j = m / c,
            g = 0 - v;
        if (g > 0) {
            g = 0
        }
        if (g < 0 - p + c) {
            g = 0 - p + c
        }
        if (!d.hasClass("over")) {
            aB(d, g, 200)
        }
    };
    var aB = function(b, a, c) {
        punchgs.TweenLite.to(b.find(".tp-thumbcontainer"), 0.2, {
            force3D: "auto",
            left: a,
            ease: punchgs.Power3.easeOut,
            overwrite: "auto"
        })
    }
})(jQuery);