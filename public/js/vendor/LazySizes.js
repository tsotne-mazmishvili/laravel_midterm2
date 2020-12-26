window.lazySizesConfig = {
    lazyClass: 'sp-lazyload',
    loadingClass: 'sp-lazyloading',
    loadedClass: 'sp-lazyloaded',
    rias: {
        widths: [240, 320, 480, 624, 800, 976],
        hidpi: ''
    }
};

/*! lazysizes - v1.3.2 */
! function(a, b, c) {
    "use strict";

    function d(a, b) {
        var c, d, e, f;
        d = a.parentNode, f = {
            isPicture: !(!d || !m.test(d.nodeName || ""))
        }, e = function(b, c) {
            var d = a.getAttribute("data-" + b);
            if (null != d) {
                if ("true" == d) d = !0;
                else if ("false" == d) d = !1;
                else if (l.test(d)) d = parseFloat(d);
                else if ("function" == typeof j[b]) d = j[b](a, d);
                else if (p.test(d)) try {
                    d = JSON.parse(d)
                } catch (e) {}
                f[b] = d
            } else b in j && "function" != typeof j[b] ? f[b] = j[b] : c && "function" == typeof j[b] && (f[b] = j[b](a, d))
        };
        for (c in j) e(c);
        return b.replace(o, function(a, b) {
            b in f || e(b, !0)
        }), f
    }

    function e(a, b) {
        var c = [],
            d = function(a, c) {
                return k[typeof b[c]] ? b[c] : a
            };
        return c.srcset = [], b.absUrl && (r.setAttribute("href", a), a = r.href), a = ((b.prefix || "") + a + (b.postfix || "")).replace(o, d), b.widths.forEach(function(d) {
            var e = {
                u: a.replace(n, b.widthmap[d] || d),
                w: d
            };
            c.push(e), c.srcset.push(e.c = e.u + " " + d + "w")
        }), c
    }

    function f(a, b, c) {
        a && (a = e(a, b), a.isPicture = b.isPicture, t && "IMG" == c.nodeName.toUpperCase() ? c.removeAttribute(i.srcsetAttr) : c.setAttribute(i.srcsetAttr, a.srcset.join(", ")), Object.defineProperty(c, "_lazyrias", {
            value: a,
            writable: !0
        }))
    }

    function g(a, b) {
        var c = d(a, b);
        return j.modifyOptions.call(a, {
            target: a,
            details: c,
            detail: c
        }), lazySizes.fire(a, "lazyriasmodifyoptions", c), c
    }

    function h(a) {
        return a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) || a.getAttribute(i.srcsetAttr) || a.getAttribute(i.srcAttr) || a.getAttribute("data-pfsrcset") || ""
    }
    if (b.addEventListener) {
        var i, j, k = {
                string: 1,
                number: 1
            },
            l = /^\-*\+*\d+\.*\d*$/,
            m = /^picture$/i,
            n = /\s*\{\s*width\s*\}\s*/i,
            o = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
            p = /^\[.*\]|\{.*\}$/,
            q = /^(?:auto|\d+(px)?)$/,
            r = b.createElement("a"),
            s = b.createElement("img"),
            t = "srcset" in s && !("sizes" in s),
            u = !!a.HTMLPictureElement && "sizes" in b.createElement("img");
        ! function() {
            var b, c = function() {},
                d = {
                    prefix: "",
                    postfix: "",
                    srcAttr: "data-src",
                    absUrl: !1,
                    modifyOptions: c,
                    widthmap: {}
                };
            i = a.lazySizes && lazySizes.cfg || a.lazySizesConfig, i || (i = {}, a.lazySizesConfig = i), i.supportsType || (i.supportsType = function(a) {
                return !a
            }), i.rias || (i.rias = {}), j = i.rias, "widths" in j || (j.widths = [], function(a) {
                for (var b, c = 0; !b || 3e3 > b;) c += 5, c > 30 && (c += 1), b = 36 * c, a.push(b)
            }(j.widths));
            for (b in d) b in j || (j[b] = d[b])
        }(), addEventListener("lazybeforeunveil", function(a) {
            var b, c, d, e, k, l, m, o, p, r, s, t, w;
            if (b = a.target, !a.defaultPrevented && !j.disabled && (p = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) && q.test(p)) {
                if (c = h(b), d = g(b, c), s = n.test(d.prefix) || n.test(d.postfix), d.isPicture && (e = b.parentNode))
                    for (k = e.getElementsByTagName("source"), l = 0, m = k.length; m > l; l++)(s || n.test(o = h(k[l]))) && (f(o, d, k[l]), t = !0);
                s || n.test(c) ? (f(c, d, b), t = !0) : t && (w = [], w.srcset = [], w.isPicture = !0, Object.defineProperty(b, "_lazyrias", {
                    value: w,
                    writable: !0
                })), t && (u ? b.removeAttribute(i.srcAttr) : "auto" != p && (r = {
                    width: parseInt(p, 10)
                }, v({
                    target: b,
                    detail: r,
                    details: r
                })))
            }
        });
        var v = function() {
            var c = function(a, b) {
                    return a.w - b.w
                },
                d = function(a) {
                    var b, c, d = a.length,
                        e = a[d - 1],
                        f = 0;
                    for (f; d > f; f++)
                        if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
                            !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
                            break
                        }
                    return e
                },
                e = function(a, b) {
                    var c;
                    return !a._lazyrias && lazySizes.pWS && (c = lazySizes.pWS(a.getAttribute(i.srcsetAttr || ""))).length && (Object.defineProperty(a, "_lazyrias", {
                        value: c,
                        writable: !0
                    }), b && a.parentNode && (c.isPicture = "PICTURE" == a.parentNode.nodeName.toUpperCase())), a._lazyrias
                },
                f = function(b) {
                    var c = a.devicePixelRatio || 1,
                        d = lazySizes.getX && lazySizes.getX(b);
                    return Math.min(d || c, 2.5, c)
                },
                g = function(b, g) {
                    var h, i, j, k, l, m;
                    if (l = b._lazyrias, l.isPicture && a.matchMedia)
                        for (i = 0, h = b.parentNode.getElementsByTagName("source"), j = h.length; j > i; i++)
                            if (e(h[i]) && !h[i].getAttribute("type") && (!(k = h[i].getAttribute("media")) || (matchMedia(k) || {}).matches)) {
                                l = h[i]._lazyrias;
                                break
                            }
                    return (!l.w || l.w < g) && (l.w = g, l.d = f(b), m = d(l.sort(c))), m
                },
                h = function(c) {
                    var d, f = c.target;
                    return !t && (a.respimage || a.picturefill || lazySizesConfig.pf) ? void b.removeEventListener("lazybeforesizes", h) : void(("_lazyrias" in f || c.detail.dataAttr && e(f, !0)) && (d = g(f, c.detail.width), d && d.u && f._lazyrias.cur != d.u && (f._lazyrias.cur = d.u, d.cached = !0, f.setAttribute(i.srcAttr, d.u), f.setAttribute("src", d.u))))
                };
            return u ? h = function() {} : b.addEventListener("lazybeforesizes", h), h
        }()
    }
}(window, document);

/*! lazysizes - v1.3.2 */
! function(a, b) {
    var c = b(a, a.document);
    a.lazySizes = c, "object" == typeof module && module.exports ? module.exports = c : "function" == typeof define && define.amd && define(c)
}(window, function(a, b) {
    "use strict";
    if (b.getElementsByClassName) {
        var c, d = b.documentElement,
            e = a.HTMLPictureElement && "sizes" in b.createElement("img"),
            f = "addEventListener",
            g = a[f],
            h = a.setTimeout,
            i = a.requestAnimationFrame || h,
            j = /^picture$/i,
            k = ["load", "error", "lazyincluded", "_lazyloaded"],
            l = {},
            m = Array.prototype.forEach,
            n = function(a, b) {
                return l[b] || (l[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), l[b].test(a.className) && l[b]
            },
            o = function(a, b) {
                n(a, b) || (a.className = a.className.trim() + " " + b)
            },
            p = function(a, b) {
                var c;
                (c = n(a, b)) && (a.className = a.className.replace(c, " "))
            },
            q = function(a, b, c) {
                var d = c ? f : "removeEventListener";
                c && q(a, b), k.forEach(function(c) {
                    a[d](c, b)
                })
            },
            r = function(a, c, d, e, f) {
                var g = b.createEvent("CustomEvent");
                return g.initCustomEvent(c, !e, !f, d || {}), a.dispatchEvent(g), g
            },
            s = function(b, d) {
                var f;
                !e && (f = a.picturefill || c.pf) ? f({
                    reevaluate: !0,
                    elements: [b]
                }) : d && d.src && (b.src = d.src)
            },
            t = function(a, b) {
                return (getComputedStyle(a, null) || {})[b]
            },
            u = function(a, b, d) {
                for (d = d || a.offsetWidth; d < c.minSize && b && !a._lazysizesWidth;) d = b.offsetWidth, b = b.parentNode;
                return d
            },
            v = function(b) {
                var c, d = 0,
                    e = a.Date,
                    f = function() {
                        c = !1, d = e.now(), b()
                    },
                    g = function() {
                        h(f)
                    },
                    j = function() {
                        i(g)
                    };
                return function() {
                    if (!c) {
                        var a = 125 - (e.now() - d);
                        c = !0, 6 > a && (a = 6), h(j, a)
                    }
                }
            },
            w = function() {
                var e, k, l, u, w, y, z, A, B, C, D, E, F, G, H, I = /^img$/i,
                    J = /^iframe$/i,
                    K = "onscroll" in a && !/glebot/.test(navigator.userAgent),
                    L = 0,
                    M = 0,
                    N = 0,
                    O = 0,
                    P = function(a) {
                        N--, a && a.target && q(a.target, P), (!a || 0 > N || !a.target) && (N = 0)
                    },
                    Q = function(a, b) {
                        var c, d = a,
                            e = "hidden" != t(a, "visibility");
                        for (B -= b, E += b, C -= b, D += b; e && (d = d.offsetParent);) e = (t(d, "opacity") || 1) > 0, e && "visible" != t(d, "overflow") && (c = d.getBoundingClientRect(), e = D > c.left && C < c.right && E > c.top - 1 && B < c.bottom + 1);
                        return e
                    },
                    R = function() {
                        var a, b, d, f, g, h, i, j, m;
                        if ((w = c.loadMode) && 8 > N && (a = e.length)) {
                            for (b = 0, O++, G > M && 1 > N && O > 3 && w > 2 ? (M = G, O = 0) : M = w > 1 && O > 2 && 6 > N ? F : L; a > b; b++)
                                if (e[b] && !e[b]._lazyRace)
                                    if (K)
                                        if ((j = e[b].getAttribute("data-expand")) && (h = 1 * j) || (h = M), m !== h && (z = innerWidth + h * H, A = innerHeight + h, i = -1 * h, m = h), d = e[b].getBoundingClientRect(), (E = d.bottom) >= i && (B = d.top) <= A && (D = d.right) >= i * H && (C = d.left) <= z && (E || D || C || B) && (l && 3 > N && !j && (3 > w || 4 > O) || Q(e[b], h))) {
                                            if (X(e[b]), g = !0, N > 9) break
                                        } else !g && l && !f && 4 > N && 4 > O && w > 2 && (k[0] || c.preloadAfterLoad) && (k[0] || !j && (E || D || C || B || "auto" != e[b].getAttribute(c.sizesAttr))) && (f = k[0] || e[b]);
                            else X(e[b]);
                            f && !g && X(f)
                        }
                    },
                    S = v(R),
                    T = function(a) {
                        o(a.target, c.loadedClass), p(a.target, c.loadingClass), q(a.target, T)
                    },
                    U = function(a, b) {
                        try {
                            a.contentWindow.location.replace(b)
                        } catch (c) {
                            a.src = b
                        }
                    },
                    V = function(a) {
                        var b, d, e = a.getAttribute(c.srcsetAttr);
                        (b = c.customMedia[a.getAttribute("data-media") || a.getAttribute("media")]) && a.setAttribute("media", b), e && a.setAttribute("srcset", e), b && (d = a.parentNode, d.insertBefore(a.cloneNode(), a), d.removeChild(a))
                    },
                    W = function() {
                        var a, b = [],
                            c = function() {
                                for (; b.length;) b.shift()();
                                a = !1
                            };
                        return function(d) {
                            b.push(d), a || (a = !0, i(c))
                        }
                    }(),
                    X = function(a) {
                        var b, d, e, f, g, i, k, t = I.test(a.nodeName),
                            v = t && (a.getAttribute(c.sizesAttr) || a.getAttribute("sizes")),
                            w = "auto" == v;
                        (!w && l || !t || !a.src && !a.srcset || a.complete || n(a, c.errorClass)) && (w && (k = a.offsetWidth), a._lazyRace = !0, N++, W(function() {
                            a._lazyRace && delete a._lazyRace, p(a, c.lazyClass), (g = r(a, "lazybeforeunveil")).defaultPrevented || (v && (w ? (o(a, c.autosizesClass), x.updateElem(a, !0, k)) : a.setAttribute("sizes", v)), d = a.getAttribute(c.srcsetAttr), b = a.getAttribute(c.srcAttr), t && (e = a.parentNode, f = e && j.test(e.nodeName || "")), i = g.detail.firesLoad || "src" in a && (d || b || f), g = {
                                target: a
                            }, i && (q(a, P, !0), clearTimeout(u), u = h(P, 2500), o(a, c.loadingClass), q(a, T, !0)), f && m.call(e.getElementsByTagName("source"), V), d ? a.setAttribute("srcset", d) : b && !f && (J.test(a.nodeName) ? U(a, b) : a.src = b), (d || f) && s(a, {
                                src: b
                            })), (!i || a.complete) && (i ? P(g) : N--, T(g))
                        }))
                    },
                    Y = function() {
                        if (!l) {
                            if (Date.now() - y < 999) return void h(Y, 999);
                            var a, b = function() {
                                c.loadMode = 3, S()
                            };
                            l = !0, c.loadMode = 3, N || S(), g("scroll", function() {
                                3 == c.loadMode && (c.loadMode = 2), clearTimeout(a), a = h(b, 99)
                            }, !0)
                        }
                    };
                return {
                    _: function() {
                        y = Date.now(), e = b.getElementsByClassName(c.lazyClass), k = b.getElementsByClassName(c.lazyClass + " " + c.preloadClass), H = c.hFac, F = c.expand, G = F * c.expFactor, g("scroll", S, !0), g("resize", S, !0), a.MutationObserver ? new MutationObserver(S).observe(d, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (d[f]("DOMNodeInserted", S, !0), d[f]("DOMAttrModified", S, !0), setInterval(S, 999)), g("hashchange", S, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(a) {
                            b[f](a, S, !0)
                        }), /d$|^c/.test(b.readyState) ? Y() : (g("load", Y), b[f]("DOMContentLoaded", S), h(Y, 2e4)), S(e.length > 0)
                    },
                    checkElems: S,
                    unveil: X
                }
            }(),
            x = function() {
                var a, d = function(a, b, c) {
                        var d, e, f, g, h = a.parentNode;
                        if (h && (c = u(a, h, c), g = r(a, "lazybeforesizes", {
                                width: c,
                                dataAttr: !!b
                            }), !g.defaultPrevented && (c = g.detail.width, c && c !== a._lazysizesWidth))) {
                            if (a._lazysizesWidth = c, c += "px", a.setAttribute("sizes", c), j.test(h.nodeName || ""))
                                for (d = h.getElementsByTagName("source"), e = 0, f = d.length; f > e; e++) d[e].setAttribute("sizes", c);
                            g.detail.dataAttr || s(a, g.detail)
                        }
                    },
                    e = function() {
                        var b, c = a.length;
                        if (c)
                            for (b = 0; c > b; b++) d(a[b])
                    },
                    f = v(e);
                return {
                    _: function() {
                        a = b.getElementsByClassName(c.autosizesClass), g("resize", f)
                    },
                    checkElems: f,
                    updateElem: d
                }
            }(),
            y = function() {
                y.i || (y.i = !0, x._(), w._())
            };
        return function() {
            var b, e = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.7,
                hFac: .8,
                expand: d.clientHeight > 600 ? d.clientWidth > 860 ? 500 : 410 : 359,
                loadMode: 2
            };
            c = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in e) b in c || (c[b] = e[b]);
            a.lazySizesConfig = c, h(function() {
                c.init && y()
            })
        }(), {
            cfg: c,
            autoSizer: x,
            loader: w,
            init: y,
            uP: s,
            aC: o,
            rC: p,
            hC: n,
            fire: r,
            gW: u
        }
    }
});


/*
	Name: YouTubePopUp
	Description: jQuery plugin to display YouTube or Vimeo video in PopUp, responsive and retina, easy to use.
	Version: 1.0.0
    Plugin URL: http://wp-time.com/youtube-popup-jquery-plugin/
	Written By: Qassim Hassan
	Twitter: @QQQHZ
	Websites: wp-time.com | qass.im | wp-plugins.in
	Dual licensed under the MIT and GPL licenses:
		http://www.opensource.org/licenses/mit-license.php
		http://www.gnu.org/licenses/gpl.html
	Copyright (c) 2016 - Qassim Hassan
*/

(function($) {

    $.fn.YouTubePopUp = function(options) {

        var YouTubePopUpOptions = $.extend({
            autoplay: 1
        }, options);

        $(this).on('click', function(e) {

            var youtubeLink = $(this).attr("href");

            if (youtubeLink.match(/(youtube.com)/)) {
                var split_c = "v=";
                var split_n = 1;
            }

            if (youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(vimeo.com\/)+[0-9]/)) {
                var split_c = "/";
                var split_n = 3;
            }

            if (youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
                var split_c = "/";
                var split_n = 5;
            }

            var getYouTubeVideoID = youtubeLink.split(split_c)[split_n];

            var cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

            if (youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(youtube.com)/)) {
                var videoEmbedLink = "https://www.youtube.com/embed/" + cleanVideoID + "?autoplay=" + YouTubePopUpOptions.autoplay + "";
            }

            if (youtubeLink.match(/(vimeo.com\/)+[0-9]/) || youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/)) {
                var videoEmbedLink = "https://player.vimeo.com/video/" + cleanVideoID + "?autoplay=" + YouTubePopUpOptions.autoplay + "";
            }

            $("body").append('<div class="YouTubePopUp-Wrap"><div class="YouTubePopUp-Content"><span class="YouTubePopUp-Close"></span><iframe src="' + videoEmbedLink + '" allowfullscreen></iframe></div></div>');


            $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function() {
                $(".YouTubePopUp-Wrap").addClass("YouTubePopUp-Hide").delay(515).queue(function() {
                    $(this).remove();
                });
            });

            e.preventDefault();

        });

        $(document).keyup(function(e) {

            if (e.keyCode == 27) {
                $('.YouTubePopUp-Wrap, .YouTubePopUp-Close').click();
            }

        });

    };

}(jQuery));

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ('classList' in document.documentElement) {
    hasClass = function(elem, c) {
        return elem.classList.contains(c);
    };
    addClass = function(elem, c) {
        elem.classList.add(c);
    };
    removeClass = function(elem, c) {
        elem.classList.remove(c);
    };
} else {
    hasClass = function(elem, c) {
        return classReg(c).test(elem.className);
    };
    addClass = function(elem, c) {
        if (!hasClass(elem, c)) {
            elem.className = elem.className + ' ' + c;
        }
    };
    removeClass = function(elem, c) {
        elem.className = elem.className.replace(classReg(c), ' ');
    };
}

function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
}

var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
};

// transport
if (typeof define === 'function' && define.amd) {
    // AMD
    define(classie);
} else {
    // browser global
    window.classie = classie;
}

/**
 * selectFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;
(function(window) {

    'use strict';

    /**
     * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
     */
    function hasParent(e, p) {
        if (!e) return false;
        var el = e.target || e.srcElement || e || false;
        while (el && el != p) {
            el = el.parentNode || false;
        }
        return (el !== false);
    };

    /**
     * extend obj function
     */
    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    /**
     * SelectFx function
     */
    function SelectFx(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    /**
     * SelectFx options
     */
    SelectFx.prototype.options = {
        // if true all the links will open in a new tab.
        // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
        newTab: true,
        // when opening the select element, the default placeholder (if any) is shown
        stickyPlaceholder: true,
        // callback when changing the value
        onChange: function(val) {
            return false;
        }
    }

    /**
     * init function
     * initialize and cache some vars
     */
    SelectFx.prototype._init = function() {
        // check if we are using a placeholder for the native select box
        // we assume the placeholder is disabled and selected by default
        var selectedOpt = this.el.querySelector('option[selected]');
        this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

        // get selected option (either the first option with attr selected or just the first option)
        this.selectedOpt = selectedOpt || this.el.querySelector('option');

        // create structure
        this._createSelectEl();

        // all options
        this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));

        // total options
        this.selOptsCount = this.selOpts.length;

        // current index
        this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;

        // placeholder elem
        this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');

        // init events
        this._initEvents();
    }

    /**
     * creates the structure for the select element
     */
    SelectFx.prototype._createSelectEl = function() {
        var self = this,
            options = '',
            createOptionHTML = function(el) {
                var optclass = '',
                    classes = '',
                    link = '';

                if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
                    classes += 'cs-selected ';
                    this.foundSelected = true;
                }
                // extra classes
                if (el.getAttribute('data-class')) {
                    classes += el.getAttribute('data-class');
                }
                // link options
                if (el.getAttribute('data-link')) {
                    link = 'data-link=' + el.getAttribute('data-link');
                }

                if (classes !== '') {
                    optclass = 'class="' + classes + '" ';
                }

                return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
            };

        [].slice.call(this.el.children).forEach(function(el) {
            if (el.disabled) {
                return;
            }

            var tag = el.tagName.toLowerCase();

            if (tag === 'option') {
                options += createOptionHTML(el);
            } else if (tag === 'optgroup') {
                options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
                [].slice.call(el.children).forEach(function(opt) {
                    options += createOptionHTML(opt);
                })
                options += '</ul></li>';
            }
        });

        var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
        this.selEl = document.createElement('div');
        this.selEl.className = this.el.className;
        this.selEl.tabIndex = this.el.tabIndex;
        this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
        this.el.parentNode.appendChild(this.selEl);
        this.selEl.appendChild(this.el);
    }

    /**
     * initialize the events
     */
    SelectFx.prototype._initEvents = function() {
        var self = this;

        // open/close select
        this.selPlaceholder.addEventListener('click', function() {
            self._toggleSelect();
        });

        // clicking the options
        this.selOpts.forEach(function(opt, idx) {
            opt.addEventListener('click', function() {
                self.current = idx;
                self._changeOption();
                // close select elem
                self._toggleSelect();
            });
        });

        // close the select element if the target itÂ´s not the select element or one of its descendants..
        document.addEventListener('click', function(ev) {
            var target = ev.target;
            if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
                self._toggleSelect();
            }
        });

        // keyboard navigation events
        this.selEl.addEventListener('keydown', function(ev) {
            var keyCode = ev.keyCode || ev.which;

            switch (keyCode) {
                // up key
                case 38:
                    ev.preventDefault();
                    self._navigateOpts('prev');
                    break;
                    // down key
                case 40:
                    ev.preventDefault();
                    self._navigateOpts('next');
                    break;
                    // space key
                case 32:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                    }
                    self._toggleSelect();
                    break;
                    // enter key
                case 13:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                        self._toggleSelect();
                    }
                    break;
                    // esc key
                case 27:
                    ev.preventDefault();
                    if (self._isOpen()) {
                        self._toggleSelect();
                    }
                    break;
            }
        });
    }

    /**
     * navigate with up/dpwn keys
     */
    SelectFx.prototype._navigateOpts = function(dir) {
        if (!this._isOpen()) {
            this._toggleSelect();
        }

        var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;

        if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
            // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
            this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
            // remove focus class if any..
            this._removeFocus();
            // add class focus - track which option we are navigating
            classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
        }
    }

    /**
     * open/close select
     * when opened show the default placeholder if any
     */
    SelectFx.prototype._toggleSelect = function() {
        // remove focus class if any..
        this._removeFocus();

        if (this._isOpen()) {
            if (this.current !== -1) {
                // update placeholder text
                this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
            }
            classie.remove(this.selEl, 'cs-active');
        } else {
            if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
                // everytime we open we wanna see the default placeholder text
                this.selPlaceholder.textContent = this.selectedOpt.textContent;
            }
            classie.add(this.selEl, 'cs-active');
        }
    }

    /**
     * change option - the new value is set
     */
    SelectFx.prototype._changeOption = function() {
        // if pre selected current (if we navigate with the keyboard)...
        if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
            this.current = this.preSelCurrent;
            this.preSelCurrent = -1;
        }

        // current option
        var opt = this.selOpts[this.current];

        // update current selected value
        this.selPlaceholder.textContent = opt.textContent;

        // change native select elementÂ´s value
        this.el.value = opt.getAttribute('data-value');

        // remove class cs-selected from old selected option and add it to current selected option
        var oldOpt = this.selEl.querySelector('li.cs-selected');
        if (oldOpt) {
            classie.remove(oldOpt, 'cs-selected');
        }
        classie.add(opt, 'cs-selected');

        // if thereÂ´s a link defined
        if (opt.getAttribute('data-link')) {
            // open in new tab?
            if (this.options.newTab) {
                window.open(opt.getAttribute('data-link'), '_blank');
            } else {
                window.location = opt.getAttribute('data-link');
            }
        }

        // callback
        this.options.onChange(this.el.value);
    }

    /**
     * returns true if select element is opened
     */
    SelectFx.prototype._isOpen = function(opt) {
        return classie.has(this.selEl, 'cs-active');
    }

    /**
     * removes the focus class from the option
     */
    SelectFx.prototype._removeFocus = function(opt) {
        var focusEl = this.selEl.querySelector('li.cs-focus')
        if (focusEl) {
            classie.remove(focusEl, 'cs-focus');
        }
    }

    /**
     * add to global namespace
     */
    window.SelectFx = SelectFx;

})(window);