/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */ ! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = "1.11.3",
        m = function(a, b) {
            return new m.fn.init(a, b)
        },
        n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        o = /^-ms-/,
        p = /-([\da-z])/gi,
        q = function(a, b) {
            return b.toUpperCase()
        };
    m.fn = m.prototype = {
        jquery: l,
        constructor: m,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = m.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return m.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(m.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, m.extend = m.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (e = arguments[h]))
                for (d in e) a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, m.extend({
        expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === m.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === m.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !m.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (c) {
                return !1
            }
            if (k.ownLast)
                for (b in a) return j.call(a, b);
            for (b in a);
            return void 0 === b || j.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && m.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(o, "ms-").replace(p, q)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = r(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1) break
                } else
                    for (e in a)
                        if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++)
                    if (d = b.call(a[e], e, a[e]), d === !1) break
            } else
                for (e in a)
                    if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(n, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (g) return g.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function(a, b) {
            var c = +b.length,
                d = 0,
                e = a.length;
            while (c > d) a[e++] = b[d++];
            if (c !== c)
                while (void 0 !== b[d]) a[e++] = b[d++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = r(a),
                i = [];
            if (h)
                for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
                return a.apply(b || this, c.concat(d.call(arguments)))
            }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
        },
        now: function() {
            return +new Date
        },
        support: k
    }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function r(a) {
        var b = "length" in a && a.length,
            c = m.type(a);
        return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var s = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = ha(),
            z = ha(),
            A = ha(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = M.replace("w", "w#"),
            O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
            P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
            Q = new RegExp(L + "+", "g"),
            R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            S = new RegExp("^" + L + "*," + L + "*"),
            T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            V = new RegExp(P),
            W = new RegExp("^" + N + "$"),
            X = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + O),
                PSEUDO: new RegExp("^" + P),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            aa = /[+~]/,
            ba = /'|\\/g,
            ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
            da = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            ea = function() {
                m()
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
        } catch (fa) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }

        function ga(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
            if (!e && p) {
                if (11 !== k && (f = _.exec(a)))
                    if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode) return d;
                            if (h.id === j) return d.push(h), d
                        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                    } else {
                        if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                        if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d
                    }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + ra(o[l]);
                        w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return H.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function ha() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }

        function ia(a) {
            return a[u] = !0, a
        }

        function ja(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function ka(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function la(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function ma(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function na(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function oa(a) {
            return ia(function(b) {
                return b = +b, ia(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function pa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        c = ga.support = {}, f = ga.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = ga.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ja(function(a) {
                return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function(a) {
                return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(ca, da);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(ca, da);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), ja(function(a) {
                var b = g.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a) return !0;
                return !1
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return la(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, g) : n
        }, ga.matches = function(a, b) {
            return ga(a, null, null, b)
        }, ga.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return ga(b, n, null, [a]).length > 0
        }, ga.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, ga.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, ga.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, ga.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = ga.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else
                while (b = a[d++]) c += e(b);
            return c
        }, d = ga.selectors = {
            cacheLength: 50,
            createPseudo: ia,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ca, da).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = ga.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p])
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ia(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? ia(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: ia(function(a) {
                    return function(b) {
                        return ga(a, b).length > 0
                    }
                }),
                contains: ia(function(a) {
                    return a = a.replace(ca, da),
                        function(b) {
                            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                        }
                }),
                lang: ia(function(a) {
                    return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Z.test(a.nodeName)
                },
                input: function(a) {
                    return Y.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: oa(function() {
                    return [0]
                }),
                last: oa(function(a, b) {
                    return [b - 1]
                }),
                eq: oa(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: oa(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: oa(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: oa(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: oa(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) d.pseudos[b] = ma(b);
        for (b in {
                submit: !0,
                reset: !0
            }) d.pseudos[b] = na(b);

        function qa() {}
        qa.prototype = d.filters = d.pseudos, d.setFilters = new qa, g = ga.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
        };

        function ra(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function sa(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function ta(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ua(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) ga(a, b[d], c);
            return c
        }

        function va(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function wa(a, b, c, d, e, f) {
            return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || ua(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : va(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = va(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
            })
        }

        function xa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function(a) {
                    return a === b
                }, h, !0), l = sa(function(a) {
                    return J(b, a) > -1
                }, h, !0), m = [function(a, c, d) {
                    var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                    return b = null, e
                }]; f > i; i++)
                if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
                            value: " " === a[i - 2].type ? "*" : ""
                        })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a))
                    }
                    m.push(c)
                }
            return ta(m)
        }

        function ya(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function(f, g, h, i, k) {
                    var l, m, o, p = 0,
                        q = "0",
                        r = f && [],
                        s = [],
                        t = j,
                        u = f || e && d.find.TAG("*", k),
                        v = w += null == t ? 1 : Math.random() || .1,
                        x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])
                                if (o(l, g, h)) {
                                    i.push(l);
                                    break
                                }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++]) o(r, s, g, h);
                        if (f) {
                            if (p > 0)
                                while (q--) r[q] || s[q] || (s[q] = F.call(i));
                            s = va(s)
                        }
                        H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
            return c ? ia(f) : f
        }
        return h = ga.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, ya(e, d)), f.selector = a
            }
            return f
        }, i = ga.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ja(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || ka("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ja(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || ka("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ja(function(a) {
            return null == a.getAttribute("disabled")
        }) || ka(K, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), ga
    }(a);
    m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
    var t = m.expr.match.needsContext,
        u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        v = /^.[^:#\[\.,]*$/;

    function w(a, b, c) {
        if (m.isFunction(b)) return m.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return m.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (v.test(b)) return m.filter(b, a, c);
            b = m.filter(b, a)
        }
        return m.grep(a, function(a) {
            return m.inArray(a, b) >= 0 !== c
        })
    }
    m.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, m.fn.extend({
        find: function(a) {
            var b, c = [],
                d = this,
                e = d.length;
            if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
                for (b = 0; e > b; b++)
                    if (m.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) m.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        },
        filter: function(a) {
            return this.pushStack(w(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(w(this, a || [], !0))
        },
        is: function(a) {
            return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
        }
    });
    var x, y = a.document,
        z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = m.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
                        for (c in b) m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                if (d = y.getElementById(c[2]), d && d.parentNode) {
                    if (d.id !== c[2]) return x.find(a);
                    this.length = 1, this[0] = d
                }
                return this.context = y, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
        };
    A.prototype = m.fn, x = m(y);
    var B = /^(?:parents|prev(?:Until|All))/,
        C = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    m.extend({
        dir: function(a, b, c) {
            var d = [],
                e = a[b];
            while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), m.fn.extend({
        has: function(a) {
            var b, c = m(a, this),
                d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (m.contains(this, c[b])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? m.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function D(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }
    m.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return m.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return m.dir(a, "parentNode", c)
        },
        next: function(a) {
            return D(a, "nextSibling")
        },
        prev: function(a) {
            return D(a, "previousSibling")
        },
        nextAll: function(a) {
            return m.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return m.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return m.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return m.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return m.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return m.sibling(a.firstChild)
        },
        contents: function(a) {
            return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
        }
    }, function(a, b) {
        m.fn[a] = function(c, d) {
            var e = m.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return m.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    m.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
                    if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        c = !1;
                        break
                    }
                b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
            },
            k = {
                add: function() {
                    if (h) {
                        var d = h.length;
                        ! function f(b) {
                            m.each(b, function(b, c) {
                                var d = m.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                            })
                        }(arguments), b ? e = h.length : c && (g = d, j(c))
                    }
                    return this
                },
                remove: function() {
                    return h && m.each(arguments, function(a, c) {
                        var d;
                        while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                    }), this
                },
                has: function(a) {
                    return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], e = 0, this
                },
                disable: function() {
                    return h = i = c = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, c || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, c) {
                    return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return k
    }, m.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", m.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", m.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", m.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return m.Deferred(function(c) {
                            m.each(b, function(b, f) {
                                var g = m.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? m.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, m.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b = 0,
                c = d.call(arguments),
                e = c.length,
                f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : m.Deferred(),
                h = function(a, b, c) {
                    return function(e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                i, j, k;
            if (e > 1)
                for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var H;
    m.fn.ready = function(a) {
        return m.ready.promise().done(a), this
    }, m.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? m.readyWait++ : m.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? !--m.readyWait : !m.isReady) {
                if (!y.body) return setTimeout(m.ready);
                m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
            }
        }
    });

    function I() {
        y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
    }

    function J() {
        (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
    }
    m.ready.promise = function(b) {
        if (!H)
            if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
            else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
        else {
            y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
            var c = !1;
            try {
                c = null == a.frameElement && y.documentElement
            } catch (d) {}
            c && c.doScroll && ! function e() {
                if (!m.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    I(), m.ready()
                }
            }()
        }
        return H.promise(b)
    };
    var K = "undefined",
        L;
    for (L in m(k)) break;
    k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function() {
            var a, b, c, d;
            c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
        }),
        function() {
            var a = y.createElement("div");
            if (null == k.deleteExpando) {
                k.deleteExpando = !0;
                try {
                    delete a.test
                } catch (b) {
                    k.deleteExpando = !1
                }
            }
            a = null
        }(), m.acceptData = function(a) {
            var b = m.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
        };
    var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        N = /([A-Z])/g;

    function O(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(N, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
                } catch (e) {}
                m.data(a, b, c)
            } else c = void 0
        }
        return c
    }

    function P(a) {
        var b;
        for (b in a)
            if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;

        return !0
    }

    function Q(a, b, d, e) {
        if (m.acceptData(a)) {
            var f, g, h = m.expando,
                i = a.nodeType,
                j = i ? m.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                toJSON: m.noop
            }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
        }
    }

    function R(a, b, c) {
        if (m.acceptData(a)) {
            var d, e, f = a.nodeType,
                g = f ? m.cache : a,
                h = f ? a[m.expando] : m.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    while (e--) delete d[b[e]];
                    if (c ? !P(d) : !m.isEmptyObject(d)) return
                }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
            }
        }
    }
    m.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
        },
        data: function(a, b, c) {
            return Q(a, b, c)
        },
        removeData: function(a, b) {
            return R(a, b)
        },
        _data: function(a, b, c) {
            return Q(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return R(a, b, !0)
        }
    }), m.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                    m._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                m.data(this, a)
            }) : arguments.length > 1 ? this.each(function() {
                m.data(this, a, b)
            }) : f ? O(f, a, m.data(f, a)) : void 0
        },
        removeData: function(a) {
            return this.each(function() {
                m.removeData(this, a)
            })
        }
    }), m.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = m.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = m._queueHooks(a, b),
                g = function() {
                    m.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return m._data(a, c) || m._data(a, c, {
                empty: m.Callbacks("once memory").add(function() {
                    m._removeData(a, b + "queue"), m._removeData(a, c)
                })
            })
        }
    }), m.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = m.queue(this, a, b);
                m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                m.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = m.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        T = ["Top", "Right", "Bottom", "Left"],
        U = function(a, b) {
            return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
        },
        V = m.access = function(a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === m.type(c)) {
                e = !0;
                for (h in c) m.access(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                    return j.call(m(a), c)
                })), b))
                for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        },
        W = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = y.createElement("input"),
            b = y.createElement("div"),
            c = y.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
                k.noCloneEvent = !1
            }), b.cloneNode(!0).click()), null == k.deleteExpando) {
            k.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                k.deleteExpando = !1
            }
        }
    }(),
    function() {
        var b, c, d = y.createElement("div");
        for (b in {
                submit: !0,
                change: !0,
                focusin: !0
            }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }();
    var X = /^(?:input|select|textarea)$/i,
        Y = /^key/,
        Z = /^(?:mouse|pointer|contextmenu)|click/,
        $ = /^(?:focusinfocus|focusoutblur)$/,
        _ = /^([^.]*)(?:\.(.+)|)$/;

    function aa() {
        return !0
    }

    function ba() {
        return !1
    }

    function ca() {
        try {
            return y.activeElement
        } catch (a) {}
    }
    m.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
            if (r) {
                c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
                    return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
                }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
                while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && m.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
            if (r && (k = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                        while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
                    } else
                        for (o in k) m.event.remove(a, o + b[j], c, d, !0);
                m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, l, n, o = [d || y],
                p = j.call(b, "type") ? b.type : b,
                q = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !m.isWindow(d)) {
                    for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
                    l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                }
                n = 0;
                while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                    l = d[g], l && (d[g] = null), m.event.triggered = p;
                    try {
                        d[p]()
                    } catch (r) {}
                    m.event.triggered = void 0, l && (d[g] = l)
                }
                return b.result
            }
        },
        dispatch: function(a) {
            a = m.event.fix(a);
            var b, c, e, f, g, h = [],
                i = d.call(arguments),
                j = (m._data(this, "events") || {})[a.type] || [],
                k = m.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = m.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, g = 0;
                    while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
                        e.length && g.push({
                            elem: i,
                            handlers: e
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        fix: function(a) {
            if (a[m.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button,
                    g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== ca() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === ca() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return m.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = m.extend(new m.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, m.removeEvent = y.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
    }, m.Event = function(a, b) {
        return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? aa : ba) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
    }, m.Event.prototype = {
        isDefaultPrevented: ba,
        isPropagationStopped: ba,
        isImmediatePropagationStopped: ba,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = aa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = aa, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = aa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, m.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        m.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), k.submitBubbles || (m.event.special.submit = {
        setup: function() {
            return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target,
                    c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
                c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), m._data(c, "submitBubbles", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
        }
    }), k.changeBubbles || (m.event.special.change = {
        setup: function() {
            return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), m.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
            })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
                }), m._data(b, "changeBubbles", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return m.event.remove(this, "._change"), !X.test(this.nodeName)
        }
    }), k.focusinBubbles || m.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            m.event.simulate(b, a.target, m.event.fix(a), !0)
        };
        m.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = m._data(d, b);
                e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = m._data(d, b) - 1;
                e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
            }
        }
    }), m.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (f in a) this.on(f, b, c, a[f], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = ba;
            else if (!d) return this;
            return 1 === e && (g = d, d = function(a) {
                return m().off(a), g.apply(this, arguments)
            }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
                m.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = ba), this.each(function() {
                m.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                m.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? m.event.trigger(a, b, c, !0) : void 0
        }
    });

    function da(a) {
        var b = ea.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }
    var ea = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        fa = / jQuery\d+="(?:null|\d+)"/g,
        ga = new RegExp("<(?:" + ea + ")[\\s/>]", "i"),
        ha = /^\s+/,
        ia = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ja = /<([\w:]+)/,
        ka = /<tbody/i,
        la = /<|&#?\w+;/,
        ma = /<(?:script|style|link)/i,
        na = /checked\s*(?:[^=]|=\s*.checked.)/i,
        oa = /^$|\/(?:java|ecma)script/i,
        pa = /^true\/(.*)/,
        qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ra = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        sa = da(y),
        ta = sa.appendChild(y.createElement("div"));
    ra.optgroup = ra.option, ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead, ra.th = ra.td;

    function ua(a, b) {
        var c, d, e = 0,
            f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
        if (!f)
            for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ua(d, b));
        return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
    }

    function va(a) {
        W.test(a.type) && (a.defaultChecked = a.checked)
    }

    function wa(a, b) {
        return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function xa(a) {
        return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
    }

    function ya(a) {
        var b = pa.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function za(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
    }

    function Aa(a, b) {
        if (1 === b.nodeType && m.hasData(a)) {
            var c, d, e, f = m._data(a),
                g = m._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
            }
            g.data && (g.data = m.extend({}, g.data))
        }
    }

    function Ba(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
                e = m._data(b);
                for (d in e.events) m.removeEvent(b, d, e.handle);
                b.removeAttribute(m.expando)
            }
            "script" === c && b.text !== a.text ? (xa(b).text = a.text, ya(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }
    m.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
            if (k.html5Clone || m.isXMLDoc(a) || !ga.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ta.innerHTML = a.outerHTML, ta.removeChild(f = ta.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
                for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g) d[g] && Ba(e, d[g]);
            if (b)
                if (c)
                    for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++) Aa(e, d[g]);
                else Aa(a, f);
            return d = ua(f, "script"), d.length > 0 && za(d, !i && ua(a, "script")), d = h = e = null, f
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [], q = 0; n > q; q++)
                if (f = a[q], f || 0 === f)
                    if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
                    else if (la.test(f)) {
                h = h || o.appendChild(b.createElement("div")), i = (ja.exec(f) || ["", ""])[1].toLowerCase(), l = ra[i] || ra._default, h.innerHTML = l[1] + f.replace(ia, "<$1></$2>") + l[2], e = l[0];
                while (e--) h = h.lastChild;
                if (!k.leadingWhitespace && ha.test(f) && p.push(b.createTextNode(ha.exec(f)[0])), !k.tbody) {
                    f = "table" !== i || ka.test(f) ? "<table>" !== l[1] || ka.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                    while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
                }
                m.merge(p, h.childNodes), h.textContent = "";
                while (h.firstChild) h.removeChild(h.firstChild);
                h = o.lastChild
            } else p.push(b.createTextNode(f));
            h && o.removeChild(h), k.appendChecked || m.grep(ua(p, "input"), va), q = 0;
            while (f = p[q++])
                if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ua(o.appendChild(f), "script"), g && za(h), c)) {
                    e = 0;
                    while (f = h[e++]) oa.test(f.type || "") && c.push(f)
                }
            return h = null, o
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
                if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                    if (g.events)
                        for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                    j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
                }
        }
    }), m.fn.extend({
        text: function(a) {
            return V(this, function(a) {
                return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = wa(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = wa(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ua(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && za(ua(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                1 === a.nodeType && m.cleanData(ua(a, !1));
                while (a.firstChild) a.removeChild(a.firstChild);
                a.options && m.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return m.clone(this, a, b)
            })
        },
        html: function(a) {
            return V(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fa, "") : void 0;
                if (!("string" != typeof a || ma.test(a) || !k.htmlSerialize && ga.test(a) || !k.leadingWhitespace && ha.test(a) || ra[(ja.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(ia, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ua(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, m.cleanData(ua(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0,
                l = this.length,
                n = this,
                o = l - 1,
                p = a[0],
                q = m.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && na.test(p)) return this.each(function(c) {
                var d = n.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
                for (g = m.map(ua(i, "script"), xa), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ua(d, "script"))), b.call(this[j], d, j);
                if (f)
                    for (h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0; f > j; j++) d = g[j], oa.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qa, "")));
                i = c = null
            }
            return this
        }
    }), m.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        m.fn[a] = function(a) {
            for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var Ca, Da = {};

    function Ea(b, c) {
        var d, e = m(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
        return e.detach(), f
    }

    function Fa(a) {
        var b = y,
            c = Da[a];
        return c || (c = Ea(a, b), "none" !== c && c || (Ca = (Ca || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ca[0].contentWindow || Ca[0].contentDocument).document, b.write(), b.close(), c = Ea(a, b), Ca.detach()), Da[a] = c), c
    }! function() {
        var a;
        k.shrinkWrapBlocks = function() {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
        }
    }();
    var Ga = /^margin/,
        Ha = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
        Ia, Ja, Ka = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ia = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
    }, Ja = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ia(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Ha.test(g) && Ga.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
    }) : y.documentElement.currentStyle && (Ia = function(a) {
        return a.currentStyle
    }, Ja = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ia(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ha.test(g) && !Ka.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    });

    function La(a, b) {
        return {
            get: function() {
                var c = a();
                if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }! function() {
        var b, c, d, e, f, g, h;
        if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
            c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
                reliableHiddenOffsets: function() {
                    return null == g && i(), g
                },
                boxSizingReliable: function() {
                    return null == f && i(), f
                },
                pixelPosition: function() {
                    return null == e && i(), e
                },
                reliableMarginRight: function() {
                    return null == h && i(), h
                }
            });

            function i() {
                var b, c, d, i;
                c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
                    width: "4px"
                }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight), b.removeChild(i)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
            }
        }
    }(), m.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Ma = /alpha\([^)]*\)/i,
        Na = /opacity\s*=\s*([^)]*)/,
        Oa = /^(none|table(?!-c[ea]).+)/,
        Pa = new RegExp("^(" + S + ")(.*)$", "i"),
        Qa = new RegExp("^([+-])=(" + S + ")", "i"),
        Ra = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Sa = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ta = ["Webkit", "O", "Moz", "ms"];

    function Ua(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1),
            d = b,
            e = Ta.length;
        while (e--)
            if (b = Ta[e] + c, b in a) return b;
        return d
    }

    function Va(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fa(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function Wa(a, b, c) {
        var d = Pa.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Xa(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
        return g
    }

    function Ya(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ia(a),
            g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Ja(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ha.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Xa(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }
    m.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Ja(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": k.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = m.camelCase(b),
                    i = a.style;
                if (b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = Qa.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = m.camelCase(b);
            return b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Ja(a, b, d)), "normal" === f && b in Sa && (f = Sa[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
        }
    }), m.each(["height", "width"], function(a, b) {
        m.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Oa.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Ra, function() {
                    return Ya(a, b, d)
                }) : Ya(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Ia(a);
                return Wa(a, c, d ? Xa(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), k.opacity || (m.cssHooks.opacity = {
        get: function(a, b) {
            return Na.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Ma, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Ma.test(f) ? f.replace(Ma, e) : f + " " + e)
        }
    }), m.cssHooks.marginRight = La(k.reliableMarginRight, function(a, b) {
        return b ? m.swap(a, {
            display: "inline-block"
        }, Ja, [a, "marginRight"]) : void 0
    }), m.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        m.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Ga.test(a) || (m.cssHooks[a + b].set = Wa)
    }), m.fn.extend({
        css: function(a, b) {
            return V(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (m.isArray(b)) {
                    for (d = Ia(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Va(this, !0)
        },
        hide: function() {
            return Va(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                U(this) ? m(this).show() : m(this).hide()
            })
        }
    });

    function Za(a, b, c, d, e) {
        return new Za.prototype.init(a, b, c, d, e)
    }
    m.Tween = Za, Za.prototype = {
        constructor: Za,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Za.propHooks[this.prop];
            return a && a.get ? a.get(this) : Za.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Za.propHooks[this.prop];
            return this.options.duration ? this.pos = b = m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Za.propHooks._default.set(this), this
        }
    }, Za.prototype.init.prototype = Za.prototype, Za.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Za.propHooks.scrollTop = Za.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, m.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, m.fx = Za.prototype.init, m.fx.step = {};
    var $a, _a, ab = /^(?:toggle|show|hide)$/,
        bb = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
        cb = /queueHooks$/,
        db = [ib],
        eb = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = bb.exec(b),
                    f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
                    g = (m.cssNumber[a] || "px" !== f && +d) && bb.exec(m.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

    function fb() {
        return setTimeout(function() {
            $a = void 0
        }), $a = m.now()
    }

    function gb(a, b) {
        var c, d = {
                height: a
            },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function hb(a, b, c) {
        for (var d, e = (eb[b] || []).concat(eb["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function ib(a, b, c) {
        var d, e, f, g, h, i, j, l, n = this,
            o = {},
            p = a.style,
            q = a.nodeType && U(a),
            r = m._data(a, "fxshow");
        c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, n.always(function() {
            n.always(function() {
                h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fa(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fa(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
            p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], ab.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d]) continue;
                    q = !0
                }
                o[d] = r && r[d] || m.style(a, d)
            } else j = void 0;
        if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fa(a.nodeName) : j) && (p.display = j);
        else {
            r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() {
                m(a).hide()
            }), n.done(function() {
                var b;
                m._removeData(a, "fxshow");
                for (b in o) m.style(a, b, o[b])
            });
            for (d in o) g = hb(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function jb(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function kb(a, b, c) {
        var d, e, f = 0,
            g = db.length,
            h = m.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = $a || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: m.extend({}, b),
                opts: m.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: $a || fb(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (jb(k, j.opts.specialEasing); g > f; f++)
            if (d = db[f].call(j, a, k, j.opts)) return d;
        return m.map(k, hb, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    m.Animation = m.extend(kb, {
            tweener: function(a, b) {
                m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], eb[c] = eb[c] || [], eb[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? db.unshift(a) : db.push(a)
            }
        }), m.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? m.extend({}, a) : {
                complete: c || !c && b || m.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !m.isFunction(b) && b
            };
            return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
            }, d
        }, m.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(U).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = m.isEmptyObject(a),
                    f = m.speed(b, c, d),
                    g = function() {
                        var b = kb(this, m.extend({}, a), f);
                        (e || m._data(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = m.timers,
                        g = m._data(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && cb.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && m.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = m._data(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = m.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), m.each(["toggle", "show", "hide"], function(a, b) {
            var c = m.fn[b];
            m.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
            }
        }), m.each({
            slideDown: gb("show"),
            slideUp: gb("hide"),
            slideToggle: gb("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            m.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), m.timers = [], m.fx.tick = function() {
            var a, b = m.timers,
                c = 0;
            for ($a = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || m.fx.stop(), $a = void 0
        }, m.fx.timer = function(a) {
            m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
        }, m.fx.interval = 13, m.fx.start = function() {
            _a || (_a = setInterval(m.fx.tick, m.fx.interval))
        }, m.fx.stop = function() {
            clearInterval(_a), _a = null
        }, m.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, m.fn.delay = function(a, b) {
            return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        function() {
            var a, b, c, d, e;
            b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
        }();
    var lb = /\r/g;
    m.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = m.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lb, "") : null == c ? "" : c)
            }
        }
    }), m.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = m.find.attr(a, "value");
                    return null != b ? b : m.trim(m.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                            if (b = m(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c, d, e = a.options,
                        f = m.makeArray(b),
                        g = e.length;
                    while (g--)
                        if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
                            d.selected = c = !0
                        } catch (h) {
                            d.scrollHeight
                        } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e
                }
            }
        }
    }), m.each(["radio", "checkbox"], function() {
        m.valHooks[this] = {
            set: function(a, b) {
                return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
            }
        }, k.checkOn || (m.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var mb, nb, ob = m.expr.attrHandle,
        pb = /^(?:checked|selected)$/i,
        qb = k.getSetAttribute,
        rb = k.input;
    m.fn.extend({
        attr: function(a, b) {
            return V(this, m.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                m.removeAttr(this, a)
            })
        }
    }), m.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb : mb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(E);
            if (f && 1 === a.nodeType)
                while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rb && qb || !pb.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qb ? c : d)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), nb = {
        set: function(a, b, c) {
            return b === !1 ? m.removeAttr(a, c) : rb && qb || !pb.test(c) ? a.setAttribute(!qb && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = ob[b] || m.find.attr;
        ob[b] = rb && qb || !pb.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = ob[b], ob[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, ob[b] = f), e
        } : function(a, b, c) {
            return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), rb && qb || (m.attrHooks.value = {
        set: function(a, b, c) {
            return m.nodeName(a, "input") ? void(a.defaultValue = b) : mb && mb.set(a, b, c)
        }
    }), qb || (mb = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    }, ob.id = ob.name = ob.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, m.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: mb.set
    }, m.attrHooks.contenteditable = {
        set: function(a, b, c) {
            mb.set(a, "" === b ? !1 : b, c)
        }
    }, m.each(["width", "height"], function(a, b) {
        m.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), k.style || (m.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    var sb = /^(?:input|select|textarea|button|object)$/i,
        tb = /^(?:a|area)$/i;
    m.fn.extend({
        prop: function(a, b) {
            return V(this, m.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = m.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a]
                } catch (b) {}
            })
        }
    }), m.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = m.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), k.hrefNormalized || m.each(["href", "src"], function(a, b) {
        m.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }), k.optSelected || (m.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        m.propFix[this.toLowerCase()] = this
    }), k.enctype || (m.propFix.enctype = "encoding");
    var ub = /[\t\r\n\f]/g;
    m.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0,
                i = this.length,
                j = "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).addClass(a.call(this, b, this.className))
            });
            if (j)
                for (b = (a || "").match(E) || []; i > h; h++)
                    if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : " ")) {
                        f = 0;
                        while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = m.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0,
                i = this.length,
                j = 0 === arguments.length || "string" == typeof a && a;
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).removeClass(a.call(this, b, this.className))
            });
            if (j)
                for (b = (a || "").match(E) || []; i > h; h++)
                    if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : "")) {
                        f = 0;
                        while (e = b[f++])
                            while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                        g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) {
                m(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0,
                        e = m(this),
                        f = a.match(E) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        m.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), m.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var vb = m.now(),
        wb = /\?/,
        xb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    m.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null,
            e = m.trim(b + "");
        return e && !m.trim(e.replace(xb, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
    }, m.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
    };
    var yb, zb, Ab = /#.*$/,
        Bb = /([?&])_=[^&]*/,
        Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Eb = /^(?:GET|HEAD)$/,
        Fb = /^\/\//,
        Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Hb = {},
        Ib = {},
        Jb = "*/".concat("*");
    try {
        zb = location.href
    } catch (Kb) {
        zb = y.createElement("a"), zb.href = "", zb = zb.href
    }
    yb = Gb.exec(zb.toLowerCase()) || [];

    function Lb(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(E) || [];
            if (m.isFunction(c))
                while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function Mb(a, b, c, d) {
        var e = {},
            f = a === Ib;

        function g(h) {
            var i;
            return e[h] = !0, m.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function Nb(a, b) {
        var c, d, e = m.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && m.extend(!0, a, c), a
    }

    function Ob(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function Pb(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }
    m.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: zb,
            type: "GET",
            isLocal: Db.test(yb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Jb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": m.parseJSON,
                "text xml": m.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Nb(Nb(a, m.ajaxSettings), b) : Nb(m.ajaxSettings, a)
        },
        ajaxPrefilter: Lb(Hb),
        ajaxTransport: Lb(Ib),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
                l = k.context || k,
                n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
                o = m.Deferred(),
                p = m.Callbacks("once memory"),
                q = k.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!j) {
                                j = {};
                                while (b = Cb.exec(f)) j[b[1].toLowerCase()] = b[2]
                            }
                            b = j[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return i && i.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zb) + "").replace(Ab, "").replace(Fb, yb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yb[1] && c[2] === yb[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yb[3] || ("http:" === yb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mb(Hb, k, b, v), 2 === t) return v;
            h = m.event && k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Eb.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wb.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bb.test(e) ? e.replace(Bb, "$1_=" + vb++) : e + (wb.test(e) ? "&" : "?") + "_=" + vb++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jb + "; q=0.01" : "") : k.accepts["*"]);
            for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (d in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[d](k[d]);
            if (i = Mb(Ib, k, b, v)) {
                v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, i.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, c, d) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Ob(k, v, c)), u = Pb(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return m.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return m.get(a, void 0, b, "script")
        }
    }), m.each(["get", "post"], function(a, b) {
        m[b] = function(a, c, d, e) {
            return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), m._evalUrl = function(a) {
        return m.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, m.fn.extend({
        wrapAll: function(a) {
            if (m.isFunction(a)) return this.each(function(b) {
                m(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(m.isFunction(a) ? function(b) {
                m(this).wrapInner(a.call(this, b))
            } : function() {
                var b = m(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = m.isFunction(a);
            return this.each(function(c) {
                m(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
            }).end()
        }
    }), m.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
    }, m.expr.filters.visible = function(a) {
        return !m.expr.filters.hidden(a)
    };
    var Qb = /%20/g,
        Rb = /\[\]$/,
        Sb = /\r?\n/g,
        Tb = /^(?:submit|button|image|reset|file)$/i,
        Ub = /^(?:input|select|textarea|keygen)/i;

    function Vb(a, b, c, d) {
        var e;
        if (m.isArray(b)) m.each(b, function(b, e) {
            c || Rb.test(a) ? d(a, e) : Vb(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== m.type(b)) d(a, b);
        else
            for (e in b) Vb(a + "[" + e + "]", b[e], c, d)
    }
    m.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) Vb(c, a[c], b, e);
        return d.join("&").replace(Qb, "+")
    }, m.fn.extend({
        serialize: function() {
            return m.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = m.prop(this, "elements");
                return a ? m.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !m(this).is(":disabled") && Ub.test(this.nodeName) && !Tb.test(a) && (this.checked || !W.test(a))
            }).map(function(a, b) {
                var c = m(this).val();
                return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Sb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Sb, "\r\n")
                }
            }).get()
        }
    }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zb() || $b()
    } : Zb;
    var Wb = 0,
        Xb = {},
        Yb = m.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Xb) Xb[a](void 0, !0)
    }), k.cors = !!Yb && "withCredentials" in Yb, Yb = k.ajax = !!Yb, Yb && m.ajaxTransport(function(a) {
        if (!a.crossDomain || k.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(),
                        g = ++Wb;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                        for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState))
                            if (delete Xb[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
                            else {
                                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                try {
                                    i = f.statusText
                                } catch (k) {
                                    i = ""
                                }
                                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                            }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xb[g] = b : b()
                },
                abort: function() {
                    b && b(void 0, !0)
                }
            }
        }
    });

    function Zb() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function $b() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    m.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return m.globalEval(a), a
            }
        }
    }), m.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), m.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = y.head || m("head")[0] || y.documentElement;
            return {
                send: function(d, e) {
                    b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var _b = [],
        ac = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = _b.pop() || m.expando + "_" + vb++;
            return this[a] = !0, a
        }
    }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (ac.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ac.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ac, "$1" + e) : b.jsonp !== !1 && (b.url += (wb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || m.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), m.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || y;
        var d = u.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
    };
    var bc = m.fn.load;
    m.fn.load = function(a, b, c) {
        if ("string" != typeof a && bc) return bc.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, e || [a.responseText, b, a])
        }), this
    }, m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        m.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), m.expr.filters.animated = function(a) {
        return m.grep(m.timers, function(b) {
            return a === b.elem
        }).length
    };
    var cc = a.document.documentElement;

    function dc(a) {
        return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    m.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = m.css(a, "position"),
                l = m(a),
                n = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
        }
    }, m.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                m.offset.setOffset(this, a, b)
            });
            var b, c, d = {
                    top: 0,
                    left: 0
                },
                e = this[0],
                f = e && e.ownerDocument;
            if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dc(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                        top: 0,
                        left: 0
                    },
                    d = this[0];
                return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - m.css(d, "marginTop", !0),
                    left: b.left - c.left - m.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || cc;
                while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
                return a || cc
            })
        }
    }), m.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        m.fn[a] = function(d) {
            return V(this, function(a, d, e) {
                var f = dc(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), m.each(["top", "left"], function(a, b) {
        m.cssHooks[b] = La(k.pixelPosition, function(a, c) {
            return c ? (c = Ja(a, b), Ha.test(c) ? m(a).position()[b] + "px" : c) : void 0
        })
    }), m.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        m.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            m.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return V(this, function(b, c, d) {
                    var e;
                    return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), m.fn.size = function() {
        return this.length
    }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return m
    });
    var ec = a.jQuery,
        fc = a.$;
    return m.noConflict = function(b) {
        return a.$ === m && (a.$ = fc), b && a.jQuery === m && (a.jQuery = ec), m
    }, typeof b === K && (a.jQuery = a.$ = m), m
});


;
(function(window, document, undefined) {
    var h = void 0,
        i = !0,
        l = null,
        n = !1;

    function p(a) {
        return function() {
            return this[a]
        }
    }
    var q;

    function r(a, c, b) {
        var d = 2 < arguments.length ? Array.prototype.slice.call(arguments, 2) : [];
        return function() {
            d.push.apply(d, arguments);
            return c.apply(a, d)
        }
    };

    function s(a) {
        this.G = a;
        this.V = h
    }
    s.prototype.createElement = function(a, c, b) {
        a = this.G.createElement(a);
        if (c)
            for (var d in c) c.hasOwnProperty(d) && ("style" == d ? v(this, a, c[d]) : a.setAttribute(d, c[d]));
        b && a.appendChild(this.G.createTextNode(b));
        return a
    };

    function w(a, c, b) {
        a = a.G.getElementsByTagName(c)[0];
        a || (a = document.documentElement);
        a && a.lastChild && a.insertBefore(b, a.lastChild)
    }

    function aa(a) {
        function c() {
            document.body ? a() : setTimeout(c, 0)
        }
        c()
    }

    function x(a) {
        a.parentNode && a.parentNode.removeChild(a)
    }

    function y(a, c) {
        return a.createElement("link", {
            rel: "stylesheet",
            href: c
        })
    }

    function z(a, c) {
        return a.createElement("script", {
            src: c
        })
    }

    function A(a, c) {
        for (var b = a.className.split(/\s+/), d = 0, e = b.length; d < e; d++)
            if (b[d] == c) return;
        b.push(c);
        a.className = b.join(" ").replace(/^\s+/, "")
    }

    function B(a, c) {
        for (var b = a.className.split(/\s+/), d = [], e = 0, g = b.length; e < g; e++) b[e] != c && d.push(b[e]);
        a.className = d.join(" ").replace(/^\s+/, "").replace(/\s+$/, "")
    }

    function ba(a, c) {
        for (var b = a.className.split(/\s+/), d = 0, e = b.length; d < e; d++)
            if (b[d] == c) return i;
        return n
    }

    function v(a, c, b) {
        if (a.V === h) {
            var d = a.G.createElement("p");
            d.innerHTML = '<a style="top:1px;">w</a>';
            a.V = /top/.test(d.getElementsByTagName("a")[0].getAttribute("style"))
        }
        a.V ? c.setAttribute("style", b) : c.style.cssText = b
    };

    function C(a, c, b, d, e, g, f, j) {
        this.Aa = a;
        this.Ga = c;
        this.oa = b;
        this.na = d;
        this.Da = e;
        this.Ca = g;
        this.ma = f;
        this.Ha = j
    }
    q = C.prototype;
    q.getName = p("Aa");
    q.wa = p("Ga");
    q.Y = p("oa");
    q.ta = p("na");
    q.ua = p("Da");
    q.va = p("Ca");
    q.sa = p("ma");
    q.z = p("Ha");

    function D(a, c) {
        this.a = a;
        this.j = c
    }
    var ca = new C("Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", h, n);
    D.prototype.parse = function() {
        var a;
        if (-1 != this.a.indexOf("MSIE")) {
            a = E(this);
            var c = F(this),
                b = G(this.a, /(MSIE [\d\w\.]+)/, 1);
            if ("" != b) {
                var d = b.split(" "),
                    b = d[0],
                    d = d[1],
                    e = H(d),
                    g = H(c);
                a = new C(b, d, b, d, a, c, I(this.j), "Windows" == a && 6 <= e || "Windows Phone" == a && 8 <= g)
            } else a = new C("MSIE", "Unknown", "MSIE", "Unknown", a, c, I(this.j), n)
        } else if (-1 != this.a.indexOf("Opera")) a: if (c = a = "Unknown", b = G(this.a, /(Presto\/[\d\w\.]+)/, 1), "" != b ? (c = b.split("/"), a = c[0], c = c[1]) : (-1 != this.a.indexOf("Gecko") && (a = "Gecko"), b = G(this.a,
                    /rv:([^\)]+)/, 1), "" != b && (c = b)), -1 != this.a.indexOf("Opera Mini/")) b = G(this.a, /Opera Mini\/([\d\.]+)/, 1), "" == b && (b = "Unknown"), a = new C("OperaMini", b, a, c, E(this), F(this), I(this.j), n);
            else {
                if (-1 != this.a.indexOf("Version/") && (b = G(this.a, /Version\/([\d\.]+)/, 1), "" != b)) {
                    a = new C("Opera", b, a, c, E(this), F(this), I(this.j), 10 <= H(b));
                    break a
                }
                b = G(this.a, /Opera[\/ ]([\d\.]+)/, 1);
                a = "" != b ? new C("Opera", b, a, c, E(this), F(this), I(this.j), 10 <= H(b)) : new C("Opera", "Unknown", a, c, E(this), F(this), I(this.j), n)
            }
        else -1 != this.a.indexOf("AppleWebKit") ?
            (a = E(this), c = F(this), b = G(this.a, /AppleWebKit\/([\d\.\+]+)/, 1), "" == b && (b = "Unknown"), d = "Unknown", -1 != this.a.indexOf("Chrome") || -1 != this.a.indexOf("CrMo") || -1 != this.a.indexOf("CriOS") ? d = "Chrome" : -1 != this.a.indexOf("Safari") ? d = "Safari" : -1 != this.a.indexOf("AdobeAIR") && (d = "AdobeAIR"), e = "Unknown", -1 != this.a.indexOf("Version/") ? e = G(this.a, /Version\/([\d\.\w]+)/, 1) : "Chrome" == d ? e = G(this.a, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2) : "AdobeAIR" == d && (e = G(this.a, /AdobeAIR\/([\d\.]+)/, 1)), g = n, "AdobeAIR" == d ? (g = G(e, /\d+\.(\d+)/,
                1), g = 2 < H(e) || 2 == H(e) && 5 <= parseInt(g, 10)) : (g = G(b, /\d+\.(\d+)/, 1), g = 526 <= H(b) || 525 <= H(b) && 13 <= parseInt(g, 10)), a = new C(d, e, "AppleWebKit", b, a, c, I(this.j), g)) : -1 != this.a.indexOf("Gecko") ? (c = a = "Unknown", d = n, -1 != this.a.indexOf("Firefox") ? (a = "Firefox", b = G(this.a, /Firefox\/([\d\w\.]+)/, 1), "" != b && (d = G(b, /\d+\.(\d+)/, 1), c = b, d = "" != b && 3 <= H(b) && 5 <= parseInt(d, 10))) : -1 != this.a.indexOf("Mozilla") && (a = "Mozilla"), b = G(this.a, /rv:([^\)]+)/, 1), "" == b ? b = "Unknown" : d || (d = H(b), e = parseInt(G(b, /\d+\.(\d+)/, 1), 10), g = parseInt(G(b,
                /\d+\.\d+\.(\d+)/, 1), 10), d = 1 < d || 1 == d && 9 < e || 1 == d && 9 == e && 2 <= g || b.match(/1\.9\.1b[123]/) != l || b.match(/1\.9\.1\.[\d\.]+/) != l), a = new C(a, c, "Gecko", b, E(this), F(this), I(this.j), d)) : a = ca;
        return a
    };

    function E(a) {
        var c = G(a.a, /(iPod|iPad|iPhone|Android|Windows Phone)/, 1);
        if ("" != c) return c;
        a = G(a.a, /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS)/, 1);
        return "" != a ? ("Mac_PowerPC" == a && (a = "Macintosh"), a) : "Unknown"
    }

    function F(a) {
        var c = G(a.a, /(OS X|Windows NT|Android|CrOS) ([^;)]+)/, 2);
        if (c || (c = G(a.a, /Windows Phone( OS)? ([^;)]+)/, 2))) return c;
        if (c = G(a.a, /(iPhone )?OS ([\d_]+)/, 2)) return c;
        return (a = G(a.a, /Linux ([i\d]+)/, 1)) ? a : "Unknown"
    }

    function H(a) {
        a = G(a, /(\d+)/, 1);
        return "" != a ? parseInt(a, 10) : -1
    }

    function G(a, c, b) {
        return (a = a.match(c)) && a[b] ? a[b] : ""
    }

    function I(a) {
        if (a.documentMode) return a.documentMode
    };

    function da(a, c, b) {
        this.c = a;
        this.g = c;
        this.W = b;
        this.k = "wf";
        this.h = new fa("-")
    }

    function ga(a) {
        A(a.g, a.h.e(a.k, "loading"));
        J(a, "loading")
    }

    function K(a) {
        B(a.g, a.h.e(a.k, "loading"));
        ba(a.g, a.h.e(a.k, "active")) || A(a.g, a.h.e(a.k, "inactive"));
        J(a, "inactive")
    }

    function J(a, c, b, d) {
        if (a.W[c]) a.W[c](b, d)
    };

    function ha() {
        this.fa = {}
    }

    function ia(a, c) {
        var b = [],
            d;
        for (d in c)
            if (c.hasOwnProperty(d)) {
                var e = a.fa[d];
                e && b.push(e(c[d]))
            }
        return b
    };

    function L(a, c, b, d, e) {
        this.c = a;
        this.B = c;
        this.o = b;
        this.v = d;
        this.F = e;
        this.M = 0;
        this.ja = this.ea = n
    }
    L.prototype.watch = function(a, c, b, d, e) {
        for (var g = a.length, f = 0; f < g; f++) {
            var j = a[f];
            c[j] || (c[j] = ["n4"]);
            this.M += c[j].length
        }
        e && (this.ea = e);
        for (f = 0; f < g; f++)
            for (var j = a[f], e = c[j], m = b[j], k = 0, o = e.length; k < o; k++) {
                var t = e[k],
                    u = this.B,
                    P = j,
                    ea = t;
                A(u.g, u.h.e(u.k, P, ea, "loading"));
                J(u, "fontloading", P, ea);
                u = r(this, this.pa);
                P = r(this, this.qa);
                (new d(u, P, this.c, this.o, this.v, this.F, j, t, m)).start()
            }
    };
    L.prototype.pa = function(a, c) {
        var b = this.B;
        B(b.g, b.h.e(b.k, a, c, "loading"));
        B(b.g, b.h.e(b.k, a, c, "inactive"));
        A(b.g, b.h.e(b.k, a, c, "active"));
        J(b, "fontactive", a, c);
        this.ja = i;
        ja(this)
    };
    L.prototype.qa = function(a, c) {
        var b = this.B;
        B(b.g, b.h.e(b.k, a, c, "loading"));
        ba(b.g, b.h.e(b.k, a, c, "active")) || A(b.g, b.h.e(b.k, a, c, "inactive"));
        J(b, "fontinactive", a, c);
        ja(this)
    };

    function ja(a) {
        0 == --a.M && a.ea && (a.ja ? (a = a.B, B(a.g, a.h.e(a.k, "loading")), B(a.g, a.h.e(a.k, "inactive")), A(a.g, a.h.e(a.k, "active")), J(a, "active")) : K(a.B))
    };

    function M(a, c, b, d, e, g, f, j, m) {
        this.J = a;
        this.$ = c;
        this.c = b;
        this.o = d;
        this.v = e;
        this.F = g;
        this.za = new ka;
        this.w = new N;
        this.N = f;
        this.C = j;
        this.ra = m || "BESbswy";
        this.Q = la(this, "arial,'URW Gothic L',sans-serif");
        this.R = la(this, "Georgia,'Century Schoolbook L',serif");
        this.ca = this.Q;
        this.da = this.R;
        this.S = O(this, "arial,'URW Gothic L',sans-serif");
        this.T = O(this, "Georgia,'Century Schoolbook L',serif")
    }
    M.prototype.start = function() {
        this.ia = this.F();
        this.L()
    };
    M.prototype.L = function() {
        var a = this.o.q(this.S),
            c = this.o.q(this.T);
        (this.Q != a || this.R != c) && this.ca == a && this.da == c ? Q(this, this.J) : 5E3 <= this.F() - this.ia ? Q(this, this.$) : (this.ca = a, this.da = c, ma(this))
    };

    function ma(a) {
        a.v(function(a, b) {
            return function() {
                b.call(a)
            }
        }(a, a.L), 25)
    }

    function Q(a, c) {
        x(a.S);
        x(a.T);
        c(a.N, a.C)
    }

    function la(a, c) {
        var b = O(a, c, i),
            d = a.o.q(b);
        x(b);
        return d
    }

    function O(a, c, b) {
        c = a.c.createElement("span", {
            style: R(a, c, a.C, b)
        }, a.ra);
        w(a.c, "body", c);
        return c
    }

    function R(a, c, b, d) {
        b = a.w.expand(b);
        return "position:absolute;top:-999px;left:-999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;font-family:" + (d ? "" : a.za.quote(a.N) + ",") + c + ";" + b
    };

    function S(a, c, b, d, e) {
        this.c = a;
        this.X = c;
        this.g = b;
        this.v = d;
        this.a = e;
        this.O = this.P = 0
    }
    S.prototype.s = function(a, c) {
        this.X.fa[a] = c
    };
    S.prototype.load = function(a) {
        var c = new da(this.c, this.g, a);
        this.a.z() ? na(this, c, a) : K(c)
    };
    S.prototype.xa = function(a, c, b, d) {
        var e = a.Z ? a.Z() : M;
        d ? a.load(r(this, this.Ba, c, b, e)) : (a = 0 == --this.P, this.O--, a && (0 == this.O ? K(c) : ga(c)), b.watch([], {}, {}, e, a))
    };
    S.prototype.Ba = function(a, c, b, d, e, g) {
        var f = 0 == --this.P;
        f && ga(a);
        this.v(r(this, function(a, b, c, d, e, g) {
            a.watch(b, c || {}, d || {}, e, g)
        }, c, d, e, g, b, f))
    };

    function na(a, c, b) {
        b = ia(a.X, b);
        a.O = a.P = b.length;
        for (var d = new L(a.c, c, {
                q: function(a) {
                    return a.offsetWidth
                }
            }, a.v, function() {
                return (new Date).getTime()
            }), e = 0, g = b.length; e < g; e++) {
            var f = b[e];
            f.A(a.a, r(a, a.xa, f, c, d))
        }
    };

    function fa(a) {
        this.ya = a || "-"
    }
    fa.prototype.e = function(a) {
        for (var c = [], b = 0; b < arguments.length; b++) c.push(arguments[b].replace(/[\W_]+/g, "").toLowerCase());
        return c.join(this.ya)
    };

    function ka() {
        this.ha = "'"
    }
    ka.prototype.quote = function(a) {
        for (var c = [], a = a.split(/,\s*/), b = 0; b < a.length; b++) {
            var d = a[b].replace(/['"]/g, ""); - 1 == d.indexOf(" ") ? c.push(d) : c.push(this.ha + d + this.ha)
        }
        return c.join(",")
    };

    function N() {
        this.I = oa;
        this.p = pa
    }
    var oa = ["font-style", "font-weight"],
        pa = {
            "font-style": [
                ["n", "normal"],
                ["i", "italic"],
                ["o", "oblique"]
            ],
            "font-weight": [
                ["1", "100"],
                ["2", "200"],
                ["3", "300"],
                ["4", "400"],
                ["5", "500"],
                ["6", "600"],
                ["7", "700"],
                ["8", "800"],
                ["9", "900"],
                ["4", "normal"],
                ["7", "bold"]
            ]
        };

    function T(a, c, b) {
        this.aa = a;
        this.Ea = c;
        this.p = b
    }
    T.prototype.compact = function(a, c) {
        for (var b = 0; b < this.p.length; b++)
            if (c == this.p[b][1]) {
                a[this.aa] = this.p[b][0];
                break
            }
    };
    T.prototype.expand = function(a, c) {
        for (var b = 0; b < this.p.length; b++)
            if (c == this.p[b][0]) {
                a[this.aa] = this.Ea + ":" + this.p[b][1];
                break
            }
    };
    N.prototype.compact = function(a) {
        for (var c = ["n", "4"], a = a.split(";"), b = 0, d = a.length; b < d; b++) {
            var e = a[b].replace(/\s+/g, "").split(":");
            if (2 == e.length) {
                var g = e[1];
                a: {
                    for (var e = e[0], f = 0; f < this.I.length; f++)
                        if (e == this.I[f]) {
                            e = new T(f, e, this.p[e]);
                            break a
                        }
                    e = l
                }
                e && e.compact(c, g)
            }
        }
        return c.join("")
    };
    N.prototype.expand = function(a) {
        if (2 != a.length) return l;
        for (var c = [l, l], b = 0, d = this.I.length; b < d; b++) {
            var e = this.I[b];
            (new T(b, e, this.p[e])).expand(c, a.substr(b, 1))
        }
        return c[0] && c[1] ? c.join(";") + ";" : l
    };
    var U = window.WebFont = function() {
        var a = (new D(navigator.userAgent, document)).parse();
        return new S(new s(document), new ha, document.documentElement, function(a, b) {
            setTimeout(a, b)
        }, a)
    }();
    U.load = U.load;
    U.addModule = U.s;
    C.prototype.getName = C.prototype.getName;
    C.prototype.getVersion = C.prototype.wa;
    C.prototype.getEngine = C.prototype.Y;
    C.prototype.getEngineVersion = C.prototype.ta;
    C.prototype.getPlatform = C.prototype.ua;
    C.prototype.getPlatformVersion = C.prototype.va;
    C.prototype.getDocumentMode = C.prototype.sa;
    C.prototype.isSupportingWebFont = C.prototype.z;

    function V(a, c) {
        this.c = a;
        this.d = c
    }
    V.prototype.load = function(a) {
        for (var c = this.d.urls || [], b = this.d.families || [], d = 0, e = c.length; d < e; d++) w(this.c, "head", y(this.c, c[d]));
        a(b)
    };
    V.prototype.A = function(a, c) {
        return c(a.z())
    };
    U.s("custom", function(a) {
        return new V(new s(document), a)
    });

    function W(a, c, b, d, e) {
        this.m = a;
        this.a = c;
        this.c = b;
        this.j = d;
        this.d = e;
        this.f = [];
        this.t = {}
    }
    W.prototype.A = function(a, c) {
        var b = this,
            d = b.d.projectId;
        if (d) {
            var e = z(b.c, b.D(d));
            e.id = "__MonotypeAPIScript__" + d;
            e.onreadystatechange = function(a) {
                if ("loaded" === e.readyState || "complete" === e.readyState) e.onreadystatechange = l, e.onload(a)
            };
            e.onload = function() {
                if (b.m["__mti_fntLst" + d]) {
                    var e = b.m["__mti_fntLst" + d]();
                    if (e && e.length) {
                        var f;
                        for (f = 0; f < e.length; f++) b.f.push(e[f].fontfamily)
                    }
                }
                c(a.z())
            };
            w(this.c, "head", e)
        } else c(i)
    };
    W.prototype.D = function(a) {
        var c = this.protocol(),
            b = (this.d.api || "fast.fonts.com/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return c + "//" + b + "/" + a + ".js"
    };
    W.prototype.load = function(a) {
        a(this.f, this.t)
    };
    W.prototype.protocol = function() {
        var a = ["http:", "https:"],
            c = a[0];
        if (this.j && this.j.location && this.j.location.protocol)
            for (var b = 0, b = 0; b < a.length; b++)
                if (this.j.location.protocol === a[b]) return this.j.location.protocol;
        return c
    };
    U.s("monotype", function(a) {
        var c = (new D(navigator.userAgent, document)).parse();
        return new W(window, c, new s(document), document, a)
    });

    function X(a, c, b) {
        this.m = a;
        this.c = c;
        this.d = b;
        this.f = [];
        this.t = {}
    }
    X.prototype.D = function(a) {
        var c = "https:" == window.location.protocol ? "https:" : "http:";
        return (this.d.api || c + "//use.typekit.com") + "/" + a + ".js"
    };
    X.prototype.A = function(a, c) {
        var b = this.d.id,
            d = this.d,
            e = this;
        b ? (this.m.__webfonttypekitmodule__ || (this.m.__webfonttypekitmodule__ = {}), this.m.__webfonttypekitmodule__[b] = function(b) {
            b(a, d, function(a, b, d) {
                e.f = b;
                e.t = d;
                c(a)
            })
        }, w(this.c, "head", z(this.c, this.D(b)))) : c(i)
    };
    X.prototype.load = function(a) {
        a(this.f, this.t)
    };
    U.s("typekit", function(a) {
        return new X(window, new s(document), a)
    });

    function Y(a, c, b, d, e, g, f, j, m) {
        Y.Fa.call(this, a, c, b, d, e, g, f, j, m);
        a = ["Times New Roman", "Arial", "Times", "Sans", "Serif"];
        c = a.length;
        b = {};
        d = O(this, a[0], i);
        b[this.o.q(d)] = i;
        for (e = 1; e < c; e++) g = a[e], v(this.c, d, R(this, g, this.C, i)), b[this.o.q(d)] = i, "4" != this.C[1] && (v(this.c, d, R(this, g, this.C[0] + "4", i)), b[this.o.q(d)] = i);
        x(d);
        this.u = b;
        this.la = n
    }(function(a, c) {
        function b() {}
        b.prototype = a.prototype;
        c.prototype = new b;
        c.Fa = a;
        c.Ia = a.prototype
    })(M, Y);
    var qa = {
        Arimo: i,
        Cousine: i,
        Tinos: i
    };
    Y.prototype.L = function() {
        var a = this.o.q(this.S),
            c = this.o.q(this.T);
        !this.la && a == c && this.u[a] && (this.u = {}, this.la = this.u[a] = i);
        (this.Q != a || this.R != c) && !this.u[a] && !this.u[c] ? Q(this, this.J) : 5E3 <= this.F() - this.ia ? this.u[a] && this.u[c] && qa[this.N] ? Q(this, this.J) : Q(this, this.$) : ma(this)
    };

    function ra(a) {
        this.K = a ? a : ("https:" == window.location.protocol ? "https:" : "http:") + sa;
        this.f = [];
        this.U = []
    }
    var sa = "//fonts.googleapis.com/css";
    ra.prototype.e = function() {
        if (0 == this.f.length) throw Error("No fonts to load !");
        if (-1 != this.K.indexOf("kit=")) return this.K;
        for (var a = this.f.length, c = [], b = 0; b < a; b++) c.push(this.f[b].replace(/ /g, "+"));
        a = this.K + "?family=" + c.join("%7C");
        0 < this.U.length && (a += "&subset=" + this.U.join(","));
        return a
    };

    function ta(a) {
        this.f = a;
        this.ga = [];
        this.ka = {};
        this.H = {};
        this.w = new N
    }
    var ua = {
            latin: "BESbswy",
            cyrillic: "&#1081;&#1103;&#1046;",
            greek: "&#945;&#946;&#931;",
            khmer: "&#x1780;&#x1781;&#x1782;",
            Hanuman: "&#x1780;&#x1781;&#x1782;"
        },
        va = {
            thin: "1",
            extralight: "2",
            "extra-light": "2",
            ultralight: "2",
            "ultra-light": "2",
            light: "3",
            regular: "4",
            book: "4",
            medium: "5",
            "semi-bold": "6",
            semibold: "6",
            "demi-bold": "6",
            demibold: "6",
            bold: "7",
            "extra-bold": "8",
            extrabold: "8",
            "ultra-bold": "8",
            ultrabold: "8",
            black: "9",
            heavy: "9",
            l: "3",
            r: "4",
            b: "7"
        },
        wa = {
            i: "i",
            italic: "i",
            n: "n",
            normal: "n"
        },
        xa = RegExp("^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$");
    ta.prototype.parse = function() {
        for (var a = this.f.length, c = 0; c < a; c++) {
            var b = this.f[c].split(":"),
                d = b[0].replace(/\+/g, " "),
                e = ["n4"];
            if (2 <= b.length) {
                var g;
                var f = b[1];
                g = [];
                if (f)
                    for (var f = f.split(","), j = f.length, m = 0; m < j; m++) {
                        var k;
                        k = f[m];
                        if (k.match(/^[\w]+$/))
                            if (k = xa.exec(k.toLowerCase()), k == l) k = "";
                            else {
                                var o = h;
                                o = k[1];
                                if (o == l) o = "4";
                                else var t = va[o],
                                    o = t ? t : isNaN(o) ? "4" : o.substr(0, 1);
                                k = (k = this.w.expand([k[2] == l ? "n" : wa[k[2]], o].join(""))) ? this.w.compact(k) : l
                            }
                        else k = "";
                        k && g.push(k)
                    }
                0 < g.length && (e = g);
                3 == b.length &&
                    (b = b[2], g = [], b = !b ? g : b.split(","), 0 < b.length && (b = ua[b[0]]) && (this.H[d] = b))
            }
            this.H[d] || (b = ua[d]) && (this.H[d] = b);
            this.ga.push(d);
            this.ka[d] = e
        }
    };

    function Z(a, c, b) {
        this.a = a;
        this.c = c;
        this.d = b
    }
    Z.prototype.A = function(a, c) {
        c(a.z())
    };
    Z.prototype.Z = function() {
        return "AppleWebKit" == this.a.Y() ? Y : M
    };
    Z.prototype.load = function(a) {
        "MSIE" == this.a.getName() && this.d.blocking != i ? aa(r(this, this.ba, a)) : this.ba(a)
    };
    Z.prototype.ba = function(a) {
        for (var c = this.c, b = new ra(this.d.api), d = this.d.families, e = d.length, g = 0; g < e; g++) {
            var f = d[g].split(":");
            3 == f.length && b.U.push(f.pop());
            var j = "";
            2 == f.length && "" != f[1] && (j = ":");
            b.f.push(f.join(j))
        }
        d = new ta(d);
        d.parse();
        w(c, "head", y(c, b.e()));
        a(d.ga, d.ka, d.H)
    };
    U.s("google", function(a) {
        var c = (new D(navigator.userAgent, document)).parse();
        return new Z(c, new s(document), a)
    });

    function ya(a, c) {
        this.c = a;
        this.d = c
    }
    var za = {
        regular: "n4",
        bold: "n7",
        italic: "i4",
        bolditalic: "i7",
        r: "n4",
        b: "n7",
        i: "i4",
        bi: "i7"
    };
    ya.prototype.A = function(a, c) {
        return c(a.z())
    };
    ya.prototype.load = function(a) {
        var c, b;
        w(this.c, "head", y(this.c, ("https:" == document.location.protocol ? "https:" : "http:") + "//webfonts.fontslive.com/css/" + this.d.key + ".css"));
        var d = this.d.families,
            e, g;
        e = [];
        g = {};
        for (var f = 0, j = d.length; f < j; f++) {
            b = b = c = h;
            b = d[f].split(":");
            c = b[0];
            if (b[1]) {
                b = b[1].split(",");
                for (var m = [], k = 0, o = b.length; k < o; k++) {
                    var t = b[k];
                    if (t) {
                        var u = za[t];
                        m.push(u ? u : t)
                    }
                }
                b = m
            } else b = ["n4"];
            e.push(c);
            g[c] = b
        }
        a(e, g)
    };
    U.s("ascender", function(a) {
        return new ya(new s(document), a)
    });

    function $(a, c, b) {
        this.m = a;
        this.c = c;
        this.d = b;
        this.f = [];
        this.t = {};
        this.w = new N
    }
    $.prototype.D = function(a) {
        return ("https:" == this.m.location.protocol ? "https:" : "http:") + (this.d.api || "//f.fontdeck.com/s/css/js/") + this.m.document.location.hostname + "/" + a + ".js"
    };
    $.prototype.A = function(a, c) {
        var b = this.d.id,
            d = this;
        b ? (this.m.__webfontfontdeckmodule__ || (this.m.__webfontfontdeckmodule__ = {}), this.m.__webfontfontdeckmodule__[b] = function(a, b) {
            for (var f = 0, j = b.fonts.length; f < j; ++f) {
                var m = b.fonts[f];
                d.f.push(m.name);
                d.t[m.name] = [d.w.compact("font-weight:" + m.weight + ";font-style:" + m.style)]
            }
            c(a)
        }, w(this.c, "head", z(this.c, this.D(b)))) : c(i)
    };
    $.prototype.load = function(a) {
        a(this.f, this.t)
    };
    U.s("fontdeck", function(a) {
        return new $(window, new s(document), a)
    });
    window.WebFontConfig && U.load(window.WebFontConfig);
})(this, document);

(function() {
    function p(a) {
        var b = a.cjIsNull = T(a);
        this.length = "undefined" !== typeof a.length ? a.length : !b ? 1 : 0;
        this.element = a;
        a.cjMigrate = this
    }

    function Z(a, b, c) {
        switch (a) {
            case "append":
                b.appendChild(c);
                break;
            case "appendTo":
                c.appendChild(b);
                break;
            case "prepend":
                b.insertBefore(c, b.firstChild);
                break;
            case "prependTo":
                c.insertBefore(b, c.firstChild);
                break;
            case "insertBefore":
                c.parentNode.insertBefore(b, c);
                break;
            case "insertAfter":
                c.parentNode.insertBefore(b, c.nextSibling)
        }
    }

    function $(a) {
        return !a ? [] : a.length ? $(a[0]) : a
    }

    function g(a, b, c, d) {
        var e = this.cjMigrate;
        return !e ? n(this)[a](b, c, d) : e[a](b, c, d)
    }

    function w(a) {
        var b = a.cjMigrate;
        return !b ? new p(a) : b
    }

    function T(a) {
        if (E(a)) return !1;
        if (a && a.item && a.length) {
            if (!a.item(0)) return !0
        } else if (Array.isArray(a) && !a.length) return !0;
        return !1
    }

    function F(a, b) {
        if (null === a) return [];
        var c, d;
        if ("string" === typeof a) {
            if (-1 !== a.search("</")) {
                c = a.indexOf(">") + 1;
                d = a.substring(0, c);
                var e = d.split(" ")[0];
                return aa(d.substring(0, d.length - 1) + " />", a.substring(c, a.lastIndexOf("</" + e.substring(1, e.length))))
            }
            if (-1 !== a.search("/>")) return !/'|"/.test(a) ? r.createElement(B(a.split("<").join("").split("/>").join(""))) : aa(a);
            c = a.split(",");
            d = c.length
        } else d = 1;
        if (1 === d) return ba(a, b);
        for (var e = [], f = -1; ++f < d;) e[f] = ba(c[f], b);
        return e
    }

    function aa(a, b) {
        " " !== a.charAt(a.length - 3) && (a = a.substring(0, a.length - 2) + " />");
        var c = a.split(" "),
            d = c[0],
            e, f, k, d = r.createElement(d.substring(1, d.length));
        c.pop();
        c.shift();
        if (c = c.join().split(",").join(" ")) {
            f = c;
            c = [];
            e = 0;
            var h = /'|"/,
                g = f.length,
                l = 0;
            for (k = -1; ++k < g;) f.charAt(k).match(h) && (0 === e ? e = 1 : (c[c.length] = B(f.substring(l, k + 1)), e = 0, l = k + 1))
        }
        for (k = c.length; k--;) e = c[k].split("="), f = e[1], d.setAttribute(e[0], f.substring(1, f.length - 1));
        b && (d.innerHTML = b);
        return d
    }

    function ba(a, b) {
        b || (b = r);
        return "string" === typeof a ? (a = B(a), /\[|:|>|\s/.test(a) ? b.querySelectorAll(a) : /\./.test(a) ? ra ? b.getElementsByClassName(a.substr(1, a.length - 1)) : b.querySelectorAll(a) : -1 !== a.search("#") ? b.getElementById(a.substr(1, a.length - 1)) : b.getElementsByTagName(a)) : E(a) ? a : []
    }

    function ca(a, b) {
        return parseInt(a["inner" + b] || a["client" + b] || a["natural" + b] || a[b], 10) || 0
    }

    function U(a) {
        return a.charAt(0).toUpperCase() + a.substr(1, a.length - 1)
    }

    function da(a, b, c, d) {
        var e = a.cjEvents,
            f = b.split("."),
            k, h;
        b = f[0];
        z && ("mouseenter" === b ? (h = !0, b = "mouseover") : "mouseleave" === b && (h = !0, b = "mouseout"));
        d = [b, c, d];
        if (e) {
            for (var g = e.length, l = [], m; g--;) m = e[g], m[1] !== c ? l[l.length] = m : k = !0;
            e = l.length ? l : null
        }
        1 < f.length && (d.namespace = f[1]);
        z || (d.callback = function() {
            G.call(a, q.event)
        });
        h && (d.matchTarget = a);
        e ? e[e.length] = d : e = [d];
        a.cjEvents = e;
        z ? a.addEventListener && a.addEventListener(b, G, !1) : !k && a.attachEvent && a.attachEvent("on" + b, d.callback)
    }

    function ea(a, b, c) {
        a.removeSwipe();
        var d = b.cjEvents;
        if (d) {
            for (var e, f = d.length; f--;) e = d[f], c && e.namespace !== c || a.off(e[0]);
            v(b, "cjEvents");
            v(b, "cjEntered")
        }
    }

    function E(a) {
        return a ? a === q || a === r || 1 === a.nodeType : !1
    }

    function J(a, b, c, d) {
        var e;
        switch (d) {
            case "closest":
                e = a.parentNode;
                break;
            case "prev":
                e = a.previousSibling;
                break;
            case "next":
                e = a.nextSibling
        }
        if (!e) return null;
        if (!E(e)) return J(e, b, c, d);
        if (!b) return e;
        switch (c) {
            case "tag":
                return e.tagName.toLowerCase() === b ? e : J(e, b, c, d);
            case "id":
                return e.id === b ? e : J(e, b, c, d);
            default:
                a = e.className;
                var f;
                if (a) {
                    a = a.split(" ");
                    for (var k = a.length; k--;)
                        if (a[k] === b) {
                            f = !0;
                            break
                        }
                }
                return f ? e : J(e, b, c, d)
        }
    }

    function fa(a, b) {
        var c;
        if (a.cjDisplay) c = a.cjDisplay, v(a, "cjDisplay");
        else if (c = m ? m(b, null).display : b.currentStyle.display, "none" === c) {
            L || (L = r.body);
            for (var d = b.tagName.toLowerCase(), e = M.length, f, k; e--;)
                if (f = M[e], -1 !== f.search(d)) {
                    c = f.split(".")[1];
                    k = !0;
                    break
                }
            k || (e = r.createElement(d), L.appendChild(e), c = m ? m(e, null).display : e.currentStyle.display, L.removeChild(e), M[M.length] = d + "." + c)
        }
        return c
    }

    function v(a, b) {
        x ? a[b] = null : delete a[b]
    }

    function sa(a) {
        a[a.length] = w(this)
    }

    function G(a) {
        var b = this.cjMigrate,
            c = this.cjEvents,
            d = a.type;
        if (c) {
            for (var e = c.length, f, k; e--;)
                if (f = c[e], f[0] === d)
                    if (f.matchTarget) {
                        var h = b,
                            g = f.matchTarget,
                            l = d,
                            q = f[1],
                            m = a;
                        f = f[0] === d && f[2];
                        if ("mouseover" === l) g.cjEntered || q.call(h, m), f ? h.off(l, G) : g.cjEntered = !0;
                        else {
                            var j = h.offset(),
                                n = m.pageX,
                                p = m.pageY,
                                r = j.left,
                                j = j.top;
                            if (n <= r || n >= r + h.width() || p <= j || p >= j + h.height()) f && h.off(l, G), g.cjEntered = !1, q.call(h, m)
                        }
                    } else f[2] && b.off(d, G), b.googleFonts ? k = f[1] : f[1].call(b, a);
            k && (WebFont.load({
                google: {
                    families: b.googleFonts
                },
                active: function() {
                    k.call(b, a)
                }
            }), v(b, "googleFonts"))
        }
    }

    function ga(a, b, c) {
        if (!isNaN(c))
            if ("opacity" !== b) {
                if ("zIndex" !== b) return [!0, c + "px"]
            } else if (x) return a.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + 100 * c + ")", [!1];
        return [!0, c]
    }

    function V(a, b) {
        if (z) {
            var c = r.createEvent("Event");
            c.initEvent(b, !0, !0);
            a.dispatchEvent(c)
        } else a.fireEvent("on" + b, r.createEventObject())
    }

    function ha(a) {
        a = a.touches ? a.touches[0] : a;
        var b = this.cjSwipe;
        b.newPageX = null;
        b.pageX = a.pageX
    }

    function ia(a) {
        var b = this.cjSwipe,
            c;
        c = b.newPageX = (a.touches ? a.touches[0] : a).pageX;
        10 < Math.abs(b.pageX - c) && a.preventDefault()
    }

    function ja() {
        var a = this.cjSwipe,
            b = a.newPageX,
            c = a.pageX;
        null === b || Math.abs(c - b) < ta || (c > b ? a.callback.call(this.cjMigrate, "right") : a.callback.call(this.cjMigrate, "left"))
    }

    function C() {
        for (var a = !1, b = A, c; b--;) {
            c = u[b];
            if (!c) break;
            c.cycle() ? a = !0 : c.stop(!1, c.onComplete, !1, !0)
        }
        N ? a ? N(C) : K(C) : a ? H || (W = setInterval(C, ka)) : clearInterval(W);
        H = a
    }

    function la(a, b, c) {
        c.fadeOut ? this.fadeOut = !0 : c.fadeIn && (this.fadeIn = !0);
        this.obj = a;
        this.onComplete = c.onComplete;
        this.onCompleteParams = c.onCompleteParams;
        A = u.length;
        a.cjTween = u[A++] = this;
        if (0 === c.duration) this.stop();
        else if (c.delay) {
            var d = this;
            this.delayed = setTimeout(function() {
                ma(d, a, b, c)
            }, c.delay)
        } else ma(this, a, b, c)
    }

    function na(a, b) {
        if (b && b.onUpdate) {
            A = u.length;
            u[A++] = a.cjTween = this;
            this.onCompleteParams = b.onCompleteParams;
            var c = this.onComplete = b.onUpdate,
                d = b.ease || X,
                d = d.toLowerCase().split("."),
                d = O[d[0]][d[1]];
            this.obj = a;
            var e = b.duration || Y,
                f = d,
                k, h = 0,
                g = Date.now(),
                l;
            this.transitions = function() {
                l = Date.now();
                h += l - g;
                g = l;
                k = f(h, 0, 1, e);
                return 0.98 > k ? (c.call(a, k), !0) : !1
            };
            H ? setTimeout(oa, 10) : C()
        }
    }

    function ma(a, b, c, d) {
        var e, f = 0,
            k = [],
            h = b.style,
            g = d.duration || Y,
            l = (d.ease || X).toLowerCase().split("."),
            l = O[l[0]][l[1]];
        h.visibility = "visible";
        d.fadeIn && (h.display = d.display || "block", h.opacity = 0);
        if (x) {
            var m = null;
            if ("opacity" in c) {
                if (b.filters.length) try {
                    m = b.filters.item("DXImageTransform.Microsoft.Alpha").Opacity
                } catch (q) {}
                null === m && (h.filter = P + (d.fadeIn ? 0 : 98) + ")")
            }
        }
        for (e in c) c.hasOwnProperty(e) && (k[f++] = ua(b, e, c[e], g, l));
        a.transitions = k;
        H ? setTimeout(oa, 10) : C()
    }

    function ua(a, b, c, d, e) {
        function f() {
            v = Date.now();
            g += v - s;
            t = e(g, u, q, d);
            s = v;
            t = !k || x ? n ? t + 0.5 | 0 : t - 0.5 | 0 : t.toFixed(2);
            if (t === p) return !0;
            if (n) {
                if (t >= c) return l ? a.style.filter = P + j + ")" : r[b] = j, !1
            } else if (t <= c) return l ? a.style.filter = P + j + ")" : r[b] = j, !1;
            p = t;
            l ? a.style.filter = P + t + ")" : r[b] = t + h;
            return !0
        }
        var k = "opacity" === b,
            h = !k ? "px" : 0,
            g = 0,
            l, q, j, n, p, r, u, s, t, v, w;
        !k || !x ? (r = a.style, w = r[b], t = "" !== w ? w : m ? m(a, null)[b] : a.currentStyle[b]) : (t = a.filters.item("DXImageTransform.Microsoft.Alpha").Opacity, l = !0, c *= 100);
        t = parseFloat(t);
        q = c - t;
        n = t < c;
        j = c + h;
        s = Date.now();
        u = t;
        !k || x ? n ? c -= 1 : c += 1 : n ? c -= 0.1 : c += 0.1;
        f.stored = [b, j];
        return f
    }

    function oa() {
        H || C()
    }

    function pa(a, b) {
        return q["webkit" + a + b] || q["moz" + a + b] || q["o" + a + b] || q[a + b] || null
    }
    if (!window.jQuick) {
        var D, y, q = window,
            r = document,
            qa = navigator,
            z = "addEventListener" in q,
            j = qa.userAgent.toLowerCase(),
            ra = "getElementsByClassName" in r,
            K = pa("Cancel", "AnimationFrame"),
            N = pa("Request", "AnimationFrame"),
            m = q.getComputedStyle ? q.getComputedStyle : null,
            P = "progid:DXImageTransform.Microsoft.Alpha(opacity=",
            ta = 30,
            u = [],
            M = [],
            H, A = 0,
            Q, R, S, L, W, I, s;
        "ontouchend" in q ? (I = !0, Q = "touchstart", R = "touchmove", S = "touchend") : qa.msMaxTouchPoints && (I = !0, Q = "MSPointerDown", R = "MSPointerMove", S = "MSPointerUp");
        if (!N || !K) N = K = null;
        var n = q.jQuick = function(a, b) {
            return w(!E(a) ? F(a, b || r) || [] : a)
        };
        n.fn = function(a, b) {
            p.prototype[a] = b
        };
        n.extend = function(a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        };
        n.stopAll = function(a) {
            A = 0;
            K ? K(C) : clearInterval(W);
            for (var b = u.length; b--;) u[b].stop(a, !1, !0, !0);
            u = [];
            H = !1
        };
        n.setEase = function(a) {
            var b = a.toLowerCase().split(".");
            2 > b.length || O[b[0]] && O[b[0]][b[1]] && (X = a)
        };
        n.setDuration = function(a) {
            Y = a
        };
        n.touchEnabled = I;
        n.transitions = function() {
            s || (s = r.createElement("span").style);
            return "WebkitTransition" in s ? {
                property: "-webkit-transition",
                end: "webkitTransitionEnd"
            } : "MozTransition" in s ? {
                property: "-moz-transition",
                end: "transitionend"
            } : "MSTransition" in s ? {
                property: "-ms-transition",
                end: "transitionend"
            } : "OTransition" in s ? {
                property: "-o-transition",
                end: "otransitionend"
            } : "transition" in s ? {
                property: "transition",
                end: "transitionend"
            } : null
        };
        n.transforms = function() {
            s || (s = r.createElement("span").style);
            return "WebkitTransform" in s ? "WebkitTransform" : "MozTransform" in s ? "MozTransform" : "msTransform" in s ? "msTransform" : "OTransform" in s ? "OTransform" : "transform" in s ? "transform" : null
        };
        n.browser = function() {
            D || (D = -1 !== j.search("firefox") ? "firefox" : -1 !== j.search("webkit") ? "webkit" : -1 !== j.search("opera") ? "opera" : -1 !== j.search("msie") ? "msie" : null, "webkit" === D && (D = -1 !== j.search("chrome") ? "chrome" : "safari"));
            return D
        };
        n.version = function() {
            if ("undefined" === typeof y) {
                var a;
                switch (D) {
                    case "msie":
                        y = parseInt(j.substr(j.indexOf("msie") + 4), 10);
                        break;
                    case "safari":
                        a = j.indexOf("version") + 8;
                        y = parseInt(j.substr(a, a + 4), 10);
                        break;
                    case "opera":
                        a = j.indexOf("version") + 8;
                        y = parseInt(j.substr(a, a + 4), 10);
                        break;
                    case "chrome":
                        a = j.indexOf("chrome") + 7;
                        y = parseInt(j.substr(a, a + 4), 10);
                        break;
                    case "firefox":
                        y = parseInt(j.substr(j.indexOf("firefox") + 8), 10)
                }
            }
            return y
        };
        n.mobile = function() {
            if (I) {
                if (-1 !== j.search("iphone") || -1 !== j.search("ipad") || -1 !== j.search("ipod")) return "ios";
                if (-1 !== j.search("android") || -1 !== j.search("applewebkit")) return "android"
            }
            return null
        };
        var B = n.trim = function(a) {
                return !a ? "" : a.replace(/^\s+|\s+$/g, "")
            },
            X = n.defaultEase = "Quint.easeOut",
            Y = n.defaultDuration = 500,
            ka;
        ka = "msie" !== n.browser() ? 33.3 : 9 <= n.version() ? 16.6 : 33.3;
        var x = n.ie8 = "msie" === D && 9 > y;
        if (!(x && 8 > y)) {
            p.prototype = {
                ready: function(a, b) {
                    if (this.element === r) {
                        b && b.length && (this.googleFonts = b);
                        if (z) this.one("DOMContentLoaded", a);
                        else this.element = q, r.cjMigrate = null, q.cjMigrate = this, this.one("load", a);
                        return this
                    }
                },
                each: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    var d = c.length || 0,
                        e = typeof b,
                        f = "undefined" !== e,
                        g = [],
                        h = -1;
                    d || (c = [c], d = 1);
                    for (; ++h < d;) g[h] = c[h];
                    for (h = -1; ++h < d;) f ? "string" !== e ? a.apply(g[h], b) : a.call(g[h], b) : a.call(g[h], h);
                    return this
                },
                domElement: function(a) {
                    if (this.length) {
                        var b = this.element;
                        return b.length ? b[a || 0] : b
                    }
                    return null
                },
                on: function(a, b, c) {
                    var d = this.element;
                    if (d.cjIsNull) return this;
                    if (d.length && d !== q) return this.each(g, ["on", a, b, c]);
                    var e = a.split(" "),
                        f = e.length;
                    if (2 > f) da(d, a, b, c);
                    else
                        for (; f--;) da(d, e[f], b, c);
                    return this
                },
                off: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    if (c.length && c !== q) return this.each(g, ["off", a, b]);
                    var d;
                    a && (d = "." === a.charAt(0));
                    if (a && !d) {
                        var e = c.cjEvents;
                        if (!e) return this;
                        var f = a.split(" "),
                            k = f.length,
                            h = e.length;
                        d = [];
                        for (var j, l, m = [], n = h, r, p, s; n--;) m[n] = e[n];
                        for (n = h; n--;) {
                            p = e[n];
                            r = p[0];
                            for (s = k; s--;) {
                                h = f[s];
                                j = h.split(".");
                                if (1 < j.length) {
                                    if (j[1] !== p.namespace) continue;
                                    h = j[0]
                                }
                                if (h === r && (j = m.indexOf(p), -1 !== j && (!b || b === p[1]))) m.splice(j, 1), d[d.length] = z ? h : [h, p.callback]
                            }
                        }
                        if (d.length)
                            for (; d.length;) h = d[0], d.shift(), z || (l = h[1], h = h[0]), -1 === d.indexOf(h) && (e = c, f = h, k = l, z ? e.removeEventListener && e.removeEventListener(f, G, !1) : e.detachEvent && e.detachEvent("on" + f, k));
                        m.length ? c.cjEvents = m : v(c, "cjEvents")
                    } else d && (d = a.substring(1, a.length)), ea(this, c, d);
                    return this
                },
                one: function(a, b) {
                    var c = this.element;
                    return c.cjIsNull ? this : c.length && c !== q ? this.each(g, ["one", a, b]) : this.on(a, b, !0)
                },
                trigger: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length && b !== q) return this.each(g, ["trigger", a]);
                    a = a.split(" ");
                    for (var c = a.length; c--;) {
                        var d = b,
                            e = a[c];
                        if (/\./.test(e)) {
                            var f = d.cjEvents,
                                k = f.length,
                                h = void 0,
                                j = void 0,
                                l = h = void 0;
                            "." !== e.charAt(0) ? (h = e.split("."), j = h[0], l = h[1]) : l = e;
                            for (; k--;) h = f[k], j ? (e = h[0], h.namespace === l && j === e && V(d, e)) : h.namespace === l && V(d, h[0])
                        } else V(d, e)
                    }
                    return this
                },
                hasEventListener: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return !1;
                    if (1 !== b.nodeType && b.length && b !== q) return g.apply(b[0], ["hasEventListener", a]);
                    var c = "." === a.charAt(0),
                        b = b.cjEvents;
                    if (!b) return !1;
                    var d = b.length,
                        e;
                    c ? (e = a.substring(1, a.length), a = null) : (c = a.split("."), 1 < c.length && (a = c[0], e = c[1]));
                    for (; d--;)
                        if (c = b[d], e)
                            if (e && a) {
                                if (c[0] === a && c.namespace === e) return !0
                            } else {
                                if (c.namespace === e) return !0
                            }
                    else if (c[0] === a) return !0;
                    return !1
                },
                children: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return new p([]);
                    if (1 !== b.nodeType && b.length) return g.apply(b[0], ["children", a]);
                    if (!b.hasChildNodes || !b.hasChildNodes()) return new p([]);
                    if (a) a = F(a, b);
                    else {
                        a = b.childNodes;
                        var c = [];
                        if (a && a.length)
                            for (var d = a.length, e, f = -1; ++f < d;) e = a[f], E(e) && (c[c.length] = e);
                        a = c
                    }
                    c = a.length;
                    d = [];
                    for (e = -1; ++e < c;) f = a[e], f.parentNode === b && (d[d.length] = f);
                    return new p(d)
                },
                getChildAt: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return new p([]);
                    if (1 !== b.nodeType && b.length) return g.apply(b[0], ["getChildAt", a]);
                    if (!b.hasChildNodes || !b.hasChildNodes()) return new p([]);
                    for (var b = b.childNodes, c = [], d = b.length, e, f = -1; ++f < d;) e = b[f], T(e) || (c[c.length] = e);
                    return a < c.length ? w(c[a]) : new p([])
                },
                eq: function(a) {
                    var b = this.element;
                    return b.cjIsNull || "undefined" === typeof a ? new p([]) : b.length ? w(b[a]) : this
                },
                toArray: function() {
                    var a = this.element,
                        b = [];
                    if (a.cjIsNull || !a.length) return b;
                    this.each(sa, [b]);
                    return b
                },
                parent: function() {
                    var a = this.element;
                    if (a.cjIsNull) return new p([]);
                    if (1 !== a.nodeType && a.length) return g.call(a[0], "parent");
                    a = a.parentNode;
                    return !a ? new p([]) : w(a)
                },
                parents: function() {
                    var a = this.element;
                    if (a.cjIsNull) return new p([]);
                    if (1 !== a.nodeType && a.length) return g.call(a[0], "parents");
                    for (var b = []; a = a.parentNode;) 1 === a.nodeType && (b[b.length] = a);
                    return new p(b)
                },
                find: function(a) {
                    var b = this.element;
                    return b.cjIsNull || !a ? new p([]) : 1 !== b.nodeType && b.length ? g.apply(b[0], ["find", a]) : !b.hasChildNodes || !b.hasChildNodes() ? new p([]) : w(F(a, b))
                },
                closest: function(a) {
                    return !a ? this.parent() : this.travel(a, "closest")
                },
                prev: function(a) {
                    return this.travel(a, "prev")
                },
                next: function(a) {
                    return this.travel(a, "next")
                },
                append: function(a) {
                    return this.changeDom(a, "append")
                },
                appendTo: function(a) {
                    return this.changeDom(a, "appendTo")
                },
                prepend: function(a) {
                    return this.changeDom(a, "prepend")
                },
                prependTo: function(a) {
                    return this.changeDom(a, "prependTo")
                },
                insertBefore: function(a) {
                    return this.changeDom(a, "insertBefore")
                },
                insertAfter: function(a) {
                    return this.changeDom(a, "insertAfter")
                },
                wrap: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["wrap", a]);
                    a = w(F(a));
                    if (!a.length) return this;
                    a = a.element;
                    b.parentNode.insertBefore(a, b);
                    a.appendChild(b)
                },
                text: function(a) {
                    var b = this.element;
                    if ("undefined" === typeof a) return b.cjIsNull ? "" : 1 !== b.nodeType && b.length ? g.apply(b[0], ["text", a]) : B(b.innerHTML.replace(/(<([^>]+)>)/ig, ""));
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["text", a]);
                    b.innerHTML = a ? B(a.toString().replace(/(<([^>]+)>)/ig, "")) : "";
                    return this
                },
                html: function(a) {
                    var b = this.element;
                    if ("undefined" === typeof a) return b.cjIsNull ? "" : 1 !== b.nodeType && b.length ? g.apply(b[0], ["html", a]) : B(b.innerHTML).replace(/\s+/g, " ");
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["html", a]);
                    a || (a = "");
                    b.innerHTML = a;
                    return this
                },
                width: function(a) {
                    return this.getSize(a, "width")
                },
                height: function(a) {
                    return this.getSize(a, "height")
                },
                outerWidth: function(a) {
                    return this.getFullSize(a, "width")
                },
                outerHeight: function(a) {
                    return this.getFullSize(a, "height")
                },
                scrollTop: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return 0;
                    if (1 !== b.nodeType && b.length && b !== q) return g.apply(b[0], ["scrollTop", a]);
                    if (b === q) {
                        if ("undefined" === typeof a) return !x ? pageYOffset : r.documentElement.scrollTop;
                        b.scrollTo(0, a)
                    } else {
                        if ("undefined" === typeof a) return b.scrollTop;
                        b.scrollTop = a
                    }
                },
                css: function(a, b) {
                    var c = this.element;
                    if ("object" === typeof a) {
                        if (c.cjIsNull) return this;
                        if (c.length) return this.each(g, ["css", a, b]);
                        var d, e;
                        for (e in a) a.hasOwnProperty(e) && (b = ga(c, e, a[e]), d = b[1], b[0] && (!isNaN(d) || d) && (c.style[e] = d));
                        return this
                    }
                    if ("undefined" !== typeof b) {
                        if (c.cjIsNull) return this;
                        if (c.length) return this.each(g, ["css", a, b]);
                        var f = a;
                        d = f.split("-");
                        e = d.length;
                        if (1 < e)
                            for (var f = "", k, h = -1; ++h < e;) k = d[h], 0 !== h ? f += U(k) : f += k;
                        a = f;
                        b = ga(c, a, b);
                        d = b[1];
                        if (isNaN(d) && !d) return this;
                        b[0] && (c.style[a] = d);
                        return this
                    }
                    return c.cjIsNull ? 0 : 1 !== c.nodeType && c.length ? g.apply(c[0], ["css", a, b]) : m ? m(c, null).getPropertyValue(a) : c.currentStyle[a]
                },
                addClass: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["addClass", a]);
                    for (var c = a.split(" "), d = c.length, e; d--;) a = c[d], (e = b.className) ? -1 === e.search(a) && (b.className = e + " " + a) : b.className = a;
                    return this
                },
                removeClass: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["removeClass", a]);
                    var c = b.className;
                    if (c)
                        for (var d = a.split(" ").length; d--;) - 1 !== c.search(a) && (b.className = B(c.split(a).join("")));
                    return this
                },
                hasClass: function(a) {
                    var b = this.element;
                    return b.cjIsNull ? !1 : 1 !== b.nodeType && b.length ? g.apply(b[0], ["hasClass", a]) : (b = b.className) ? -1 !== b.search(a) : !1
                },
                show: function() {
                    return this.showHide("show")
                },
                hide: function() {
                    return this.showHide("hide")
                },
                data: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return !1;
                    if (1 !== c.nodeType && c.length) return g.apply(c[0], ["data", a, b]);
                    var d = c.cjStorage || {};
                    if (a) {
                        if ("object" === typeof a) {
                            for (var e in a) a.hasOwnProperty(e) && (d[e] = a[e]);
                            c.cjStorage = d;
                            return this
                        }
                        return "undefined" !== typeof b ? (d[a] = b, c.cjStorage = d, this) : d[a]
                    }
                    return d
                },
                removeData: function(a) {
                    a ? this.data && delete this.storage[a] : delete this.storage;
                    return this
                },
                remove: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, "remove");
                    a || this.empty();
                    n.transform && this.transform("stop");
                    this.stop();
                    ea(this, b);
                    this.removeSwipe();
                    v(b, "cjMigrate");
                    v(b, "cjDisplay");
                    v(b, "cjStorage");
                    v(b, "cjIsNull");
                    b.parentNode.removeChild(b)
                },
                empty: function() {
                    var a = this.element;
                    if (a.cjIsNull) return this;
                    if (a.length) return this.each(g, "empty");
                    for (var b = a.getElementsByTagName("*"), c = b.length; c--;) g.apply(b[c], ["remove", !0]);
                    a.innerHTML = "";
                    return this
                },
                clone: function() {
                    var a = this.element;
                    if (a.cjIsNull) return this;
                    if (1 !== a.nodeType && a.length) return g.call(a[0], "clone");
                    var b = r.createElement(a.tagName),
                        c = new p(b),
                        d = a.cjEvents,
                        e = a.attributes,
                        f = this.data,
                        k = e.length,
                        h, j;
                    for (j = 0; j < k; j++) h = e[j], b.setAttribute(h.name, h.value);
                    if (d) {
                        e = d.length;
                        for (j = -1; ++j < e;) k = d[j], c.on(k[0], k[1])
                    }
                    if (f) {
                        var d = {},
                            l;
                        for (l in f) f.hasOwnProperty(l) && (d[l] = f[l]);
                        c.storage = d
                    }
                    b.innerHTML = a.innerHTML;
                    b.cjDisplay = a.cjDisplay;
                    return c
                },
                offset: function() {
                    var a = this.element;
                    if (a.cjIsNull) return {
                        left: 0,
                        top: 0
                    };
                    if (1 !== a.nodeType && a.length) return g.call(a[0], "offset");
                    var b = 0,
                        c = 0;
                    if (a.offsetParent) {
                        b = a.offsetLeft;
                        for (c = a.offsetTop; a = a.offsetParent;) b += a.offsetLeft, c += a.offsetTop
                    }
                    return {
                        left: b,
                        top: c
                    }
                },
                attr: function(a, b) {
                    var c = this.element;
                    if ("object" === typeof a) {
                        if (c.cjIsNull) return this;
                        if (c.length) return this.each(g, ["attr", a, b]);
                        for (var d in a) a.hasOwnProperty(d) && c.setAttribute(d, a[d]);
                        return this
                    }
                    if ("undefined" !== typeof b) {
                        if (c.cjIsNull) return this;
                        if (c.length) return this.each(g, ["attr", a, b]);
                        c.setAttribute(a, b);
                        return this
                    }
                    return c.cjIsNull ? null : 1 !== c.nodeType && c.length ? g.apply(c[0], ["attr", a, b]) : c.getAttribute(a)
                },
                removeAttr: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["removeAttr", a]);
                    b.removeAttribute(a);
                    return this
                },
                val: function(a) {
                    return this.getProp("val", a)
                },
                is: function(a) {
                    return this.getProp("is", a)
                },
                innerCSS: function(a) {
                    var b = this.element;
                    return b.cjIsNull || "style" !== b.nodeName.toLowerCase() ? this : 1 !== b.nodeType && b.length ? g.apply(b[0], ["innerCSS", a]) : a ? (x ? (b = b.styleSheet, b.cssText += a) : b.innerHTML += a, this) : x ? b.styleSheet.cssText : b.innerHTML
                },
                animate: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    if (c.length) return this.each(g, ["animate", a, b]);
                    c.cjTween && c.cjTween.stop();
                    new la(c, a, b || {});
                    return this
                },
                tick: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (1 !== b.nodeType && b.length) return g.apply(b[0], ["tick", a]);
                    b.cjTween && b.cjTween.stop();
                    new na(b, a);
                    return this
                },
                fadeIn: function(a) {
                    return this.fadeIt("fadeIn", a)
                },
                fadeOut: function(a) {
                    return this.fadeIt("fadeOut", a)
                },
                stop: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    if (c.length) return this.each(g, ["stop", a, b]);
                    c = c.cjTween;
                    if (!c) return this;
                    c.stop(a, b);
                    return this
                },
                stopAll: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    if (c.length) return this.each(g, ["stopAll", a, b]);
                    if (!c.hasChildNodes || !c.hasChildNodes()) return this;
                    c.stop(a, b);
                    for (var c = c.getElementsByTagName("*"), d = c.length; d--;) w(c[d]).stop(a, b);
                    return this
                },
                swipe: function(a) {
                    if (!I || !a) return this;
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["swipe", a]);
                    b.cjSwipe = {
                        callback: a
                    };
                    b.addEventListener(Q, ha, !1);
                    b.addEventListener(R, ia, !1);
                    b.addEventListener(S, ja, !1);
                    return this
                },
                removeSwipe: function() {
                    if (!I) return this;
                    var a = this.element;
                    if (a.cjIsNull) return this;
                    if (a.length) return this.each(g, "removeSwipe");
                    a.removeEventListener(Q, ha, !1);
                    a.removeEventListener(R, ia, !1);
                    a.removeEventListener(S, ja, !1);
                    delete a.cjSwipe;
                    return this
                },
                travel: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return new p([]);
                    if (1 !== c.nodeType && c.length) return g.apply(c[0], ["travel", a, b]);
                    var d;
                    d = a;
                    var e;
                    d && (/\./.test(d) ? (e = "class", d = d.substr(1, d.length - 1)) : -1 !== d.search("#") ? (e = "id", d = d.substr(1, d.length - 1)) : e = "tag");
                    d = J(c, d, e, b);
                    return w(F(d, c))
                },
                changeDom: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    if (1 !== c.nodeType && c.length) return g.apply(c[0], ["changeDom", a, b]);
                    E(a) || (a.cjMigrate ? a = $(a.element) : a.element || (a = w(F(a)).domElement()));
                    if (T(a)) return this;
                    var d = a.length;
                    if (d) {
                        for (var e = [], f = -1; ++f < d;) e[f] = a.eq(f).domElement();
                        for (f = -1; ++f < d;) Z(b, c, e[f])
                    } else Z(b, c, a);
                    return this
                },
                getSize: function(a, b) {
                    var c = this.element;
                    if (c.length && c !== q) {
                        if (a) return c.cjIsNull ? this : this.each(g, ["getSize", a, b]);
                        if (c.cjIsNull) return 0;
                        if (1 !== c.nodeType) return g.apply(c[0], ["getSize", a, b])
                    }
                    var d = b;
                    if ("undefined" === typeof a || !0 === a) {
                        d = U(d);
                        x && c === q && (c = r.documentElement);
                        var e = ca(c, d);
                        if (!(c === q || c === r) && !a) {
                            if (!e) {
                                var f = m ? m(c, null).display : c.currentStyle.display;
                                if ("inline" === f || "hidden" === f) c.style.display = "block", e = ca(c, d), c.style.display = f
                            }
                            "Width" === d ? (d = "Left", f = "Right") : (d = "Top", f = "Bottom");
                            m ? (e -= parseInt(m(c, null)["padding" + d], 10), e -= parseInt(m(c, null)["padding" + f], 10)) : (e -= parseInt(c.currentStyle["padding" + d], 10) || 0, e -= parseInt(c.currentStyle["padding" + f], 10) || 0)
                        }
                        c = e
                    } else c.style[d] = parseInt(a, 10) + "px", c = this;
                    return c
                },
                getFullSize: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return 0;
                    if (1 !== c.nodeType && c.length && c !== q) return g.apply(c[0], ["getFullSize", a, b]);
                    var d, e, f, k, h;
                    "width" === b ? (d = "Left", e = "Right") : (d = "Top", e = "Bottom");
                    f = this[b](!0);
                    U(b);
                    var j = "border" + d + "Width",
                        l = "border" + e + "Width";
                    a && (k = "margin" + d, h = "margin" + e);
                    m ? (f += parseInt(m(c, null)[j], 10) + parseInt(m(c, null)[l], 10), a && (f += parseInt(m(c, null)[k], 10) + parseInt(m(c, null)[h], 10))) : (f += parseInt(c.currentStyle[j], 10) || 0 + parseInt(c.currentStyle[l], 10) || 0, a && (f += parseInt(c.currentStyle[k], 10) || 0 + parseInt(c.currentStyle[h], 10) || 0));
                    return f
                },
                getProp: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return null;
                    if (1 !== c.nodeType && c.length) return g.apply(c[0], ["getProp", a, b]);
                    if ("val" === a) {
                        if ("undefined" === typeof b) return c.value;
                        c.value = b;
                        return this
                    }
                    return c.tagName.toLowerCase() === b.toLowerCase()
                },
                fadeIt: function(a, b) {
                    var c = this.element;
                    if (c.cjIsNull) return this;
                    if (1 !== c.nodeType && c.length) return g.apply(c[0], ["fadeIt", a, b]);
                    b || (b = {});
                    var d;
                    b[a] = !0;
                    "fadeIn" === a ? (d = 1, b.display = fa(this, c)) : d = 0;
                    return this.animate({
                        opacity: d
                    }, b)
                },
                showHide: function(a) {
                    var b = this.element;
                    if (b.cjIsNull) return this;
                    if (b.length) return this.each(g, ["showHide", a]);
                    "show" === a ? b.style.display = fa(this, b) : (a = m ? m(b, null).display : b.currentStyle.display, "none" !== a && (this.cjDisplay = a), b.style.display = "none");
                    return this
                }
            };
            la.prototype = {
                cycle: function() {
                    var a = this.transitions;
                    if (!a) return !0;
                    for (var b = a.length, c; b--;) a[b]() && (c = !0);
                    return c
                },
                stop: function(a, b, c) {
                    var d = this.obj;
                    v(d, "cjTween");
                    if (a) {
                        a = this.transitions;
                        var e, f, g;
                        if (a)
                            for (e = a.length; e--;) f = a[e].stored, g = f[0], x ? "Opacity" !== g ? d.style[g] = f[1] : d.filters.item("DXImageTransform.Microsoft.Alpha").Opacity = 100 * f[1] : d.style[g] = f[1]
                    }
                    this.fadeIn ? (d.style.opacity = 1, d.style.visibility = "visible") : this.fadeOut && (d.style.display = "none");
                    b && (b = this.onComplete);
                    c || (c = this.onCompleteParams, u.splice(u.indexOf(this), 1), A = u.length, b && b.apply(d, [c]))
                }
            };
            na.prototype = {
                cycle: function() {
                    return this.transitions()
                },
                stop: function(a, b, c, d) {
                    if (b = this.obj) v(b, "cjTween"), c || (u.splice(u.indexOf(this), 1), A = u.length), (a || d) && this.onComplete.apply(b, [1, this.onCompleteParams])
                }
            };
            Array.indexOf || (Array.prototype.indexOf = function(a) {
                for (var b = this.length; b--;)
                    if (this[b] === a) return b;
                return -1
            });
            Array.isArray || (Array.isArray = function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            });
            Date.now || (Date.now = function() {
                return +new Date
            });
            x && (Event.prototype.preventDefault = function() {
                this.returnValue = !1
            }, Event.prototype.stopPropagation = function() {
                this.cancelBubble = !0
            });
            var O = {
                linear: {
                    easenone: function(a, b, c, d) {
                        return c * a / d + b
                    },
                    easein: function(a, b, c, d) {
                        return c * a / d + b
                    },
                    easeout: function(a, b, c, d) {
                        return c * a / d + b
                    },
                    easeinout: function(a, b, c, d) {
                        return c * a / d + b
                    }
                },
                quint: {
                    easeout: function(a, b, c, d) {
                        return c * ((a = a / d - 1) * a * a * a * a + 1) + b
                    },
                    easein: function(a, b, c, d) {
                        return c * (a /= d) * a * a * a * a + b
                    },
                    easeinout: function(a, b, c, d) {
                        return 1 > (a /= d / 2) ? c / 2 * a * a * a * a * a + b : c / 2 * ((a -= 2) * a * a * a * a + 2) + b
                    }
                },
                quad: {
                    easein: function(a, b, c, d) {
                        return c * (a /= d) * a + b
                    },
                    easeout: function(a, b, c, d) {
                        return -c * (a /= d) * (a - 2) + b
                    },
                    easeinout: function(a, b, c, d) {
                        return 1 > (a /= d / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
                    }
                },
                quart: {
                    easein: function(a, b, c, d) {
                        return c * (a /= d) * a * a * a + b
                    },
                    easeout: function(a, b, c, d) {
                        return -c * ((a = a / d - 1) * a * a * a - 1) + b
                    },
                    easeinout: function(a, b, c, d) {
                        return 1 > (a /= d / 2) ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
                    }
                },
                cubic: {
                    easein: function(a, b, c, d) {
                        return c * (a /= d) * a * a + b
                    },
                    easeout: function(a, b, c, d) {
                        return c * ((a = a / d - 1) * a * a + 1) + b
                    },
                    easeinout: function(a, b, c, d) {
                        return 1 > (a /= d / 2) ? c / 2 * a * a * a + b : c / 2 * ((a -= 2) * a * a + 2) + b
                    }
                },
                circ: {
                    easein: function(a, b, c, d) {
                        return -c * (Math.sqrt(1 - (a /= d) * a) - 1) + b
                    },
                    easeout: function(a, b, c, d) {
                        return c * Math.sqrt(1 - (a = a / d - 1) * a) + b
                    },
                    easeinout: function(a, b, c, d) {
                        return 1 > (a /= d / 2) ? -c / 2 * (Math.sqrt(1 - a * a) - 1) + b : c / 2 * (Math.sqrt(1 - (a -= 2) * a) + 1) + b
                    }
                },
                sine: {
                    easein: function(a, b, c, d) {
                        return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
                    },
                    easeout: function(a, b, c, d) {
                        return c * Math.sin(a / d * (Math.PI / 2)) + b
                    },
                    easeinout: function(a, b, c, d) {
                        return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
                    }
                },
                expo: {
                    easein: function(a, b, c, d) {
                        return 0 === a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b
                    },
                    easeout: function(a, b, c, d) {
                        return a === d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
                    },
                    easeinout: function(a, b, c, d) {
                        return 0 === a ? b : a === d ? b + c : 1 > (a /= d / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
                    }
                }
            }
        }
    }
})();
(function(h) {
    function r(b, a, e) {
        this.onComplete = e.onComplete;
        this.onCompleteParams = e.onCompleteParams;
        if (0 === e.duration) this.stop();
        else {
            var m = this,
                h = function() {
                    m.obj = b;
                    var d, j, g, c, f, h = 0,
                        k;
                    k = [];
                    var p = [],
                        l = b.getAttribute("style"),
                        r = e.duration || jQuick.defaultDuration,
                        t = (e.ease || jQuick.defaultEase).toLowerCase().split(".");
                    for (j in a)
                        if (a.hasOwnProperty(j)) {
                            g = j;
                            if (f = g.match(y)) {
                                for (d = f.length; d--;) c = f[d], g = g.replace(RegExp(c, "g"), "-" + c.toLowerCase());
                                "ms-transform" === g && (g = "-ms-transform")
                            }
                            c = d = a[j];
                            f = "backgroundPosition" === j;
                            if (!z.test(c) && "opacity" !== j && -1 === j.search(s) && !f) c += "px;";
                            else if (f) {
                                c = d.x;
                                d = d.y;
                                f = isNaN(c);
                                var u = isNaN(d);
                                if (!f && !u) c += "px", d += "px";
                                else {
                                    var q = b.style.backgroundPosition,
                                        q = "" !== q ? q.split(" ") : window.getComputedStyle(b, null).backgroundPosition.split(" ");
                                    !f ? c += "px" : c = q[0];
                                    !u ? d += "px" : d = q[1]
                                }
                                c = c + " " + d + ";"
                            } else c += ";";
                            k[h] = g + ":" + c.replace(v, "{}");
                            p[h++] = g;
                            if (l && (f = l.search(g), -1 !== f)) {
                                g = l.length - 1;
                                for (d = f - 1; ++d < g && ";" !== l[d];);
                                l = l.split(l.substring(f, d + 1)).join("")
                            }
                        }
                    m.moves = j = w.replace(A, p.toString()).replace(B, (0.001 * r).toFixed(2)).replace(C, D[t[0]][t[1]]);
                    k = k.toString();
                    k = k.replace(v, "");
                    k = k.replace(E, ",");
                    b.className = b.className.replace(F, "");
                    b.addEventListener(n, x, !1);
                    b.setAttribute("style", l.replace(G, "") + j + k)
                };
            b.style.visibility = "visible";
            b.cjTransform = this;
            this.delayed = e.delay ? setTimeout(h, 30 < e.delay ? e.delay : 30) : setTimeout(h, 30)
        }
    }

    function x(b) {
        var a = this.cjTransform;
        a && b.target === b.currentTarget && a.stop(a.onComplete)
    }

    function H(b, a, e) {
        "animate" === b ? (this.cjTransform && this.cjTransform.stop(), e || (e = {}), "transform" in a && (a[s] = a.transform, delete a.transform), new r(this, a, e)) : "stop" === b && this.cjTransform && this.cjTransform.stop(a)
    }
    var n = h.transitions(),
        s, w, v = /,/g,
        E = /{}/g,
        y = /[A-Z]/g,
        F = / cj-tween/g,
        G = /^\s+|\s+$/g,
        A = /{props}/,
        C = /{easing}/,
        B = /{duration}/,
        z = /(auto|inherit|rgb|%|#)/,
        D = {
            linear: {
                easenone: "0.250, 0.250, 0.750, 0.750",
                easein: "0.420, 0.000, 1.000, 1.000",
                easeout: "0.000, 0.000, 0.580, 1.000",
                easeinout: "0.420, 0.000, 0.580, 1.000"
            },
            quint: {
                easein: "0.755, 0.050, 0.855, 0.060",
                easeout: "0.230, 1.000, 0.320, 1.000",
                easeinout: "0.860, 0.000, 0.070, 1.000"
            },
            quad: {
                easein: "0.550, 0.085, 0.680, 0.530",
                easeout: "0.250, 0.460, 0.450, 0.940",
                easeinout: "0.455, 0.030, 0.515, 0.955"
            },
            quart: {
                easein: "0.895, 0.030, 0.685, 0.220",
                easeout: "0.165, 0.840, 0.440, 1.000",
                easeinout: "0.770, 0.000, 0.175, 1.000"
            },
            cubic: {
                easein: "0.550, 0.055, 0.675, 0.190",
                easeout: "0.215, 0.610, 0.355, 1.000",
                easeinout: "0.645, 0.045, 0.355, 1.000"
            },
            circ: {
                easein: "0.600, 0.040, 0.980, 0.335",
                easeout: "0.075, 0.820, 0.165, 1.000",
                easeinout: "0.785, 0.135, 0.150, 0.860"
            },
            sine: {
                easein: "0.470, 0.000, 0.745, 0.715",
                easeout: "0.390, 0.575, 0.565, 1.000",
                easeinout: "0.445, 0.050, 0.550, 0.950"
            },
            expo: {
                easein: "0.950, 0.050, 0.795, 0.035",
                easeout: "0.190, 1.000, 0.220, 1.000",
                easeinout: "1.000, 0.000, 0.000, 1.000"
            }
        };
    if (n) {
        var m = n.property,
            p = document.createElement("style");
        s = h.transforms();
        n = n.end;
        p.type = "text/css";
        p.innerHTML = ".cj-tween{" + m + "-property:none !important;}";
        document.getElementsByTagName("head")[0].appendChild(p);
        w = m + "-property:{props};" + m + "-duration:{duration}s;" + m + "-timing-function:cubic-bezier({easing});"
    }
    r.prototype.stop = function(b) {
        var a = this.obj;
        a ? (delete a.cjTransform, a.removeEventListener(n, x, !1), a.className += " cj-tween", a.setAttribute("style", a.getAttribute("style").split(this.moves).join(";").split(";;").join(";")), b && this.onComplete.call(a, this.onCompleteParams)) : (clearTimeout(this.delayed), b && this.onComplete.apply(a, [this.onCompleteParams]))
    };
    h.fn("transform", function(b, a, e) {
        return s ? this.each(H, [b, a, e]) : this
    })
})(jQuick);
(function(w) {
    function ia(b, c, a, e) {
        ja[b](w(this), c, a, e)
    }

    function E(b) {
        var c = {},
            a;
        for (a in b) b.hasOwnProperty(a) && (c[a.split("-").join("")] = b[a]);
        return c
    }

    function N(b, c) {
        var a = parseInt(c.data("startdelay"), 10);
        b.tween = this;
        this.settings = b;
        a ? this.delay = this.timeout(a, c) : this.animate()
    }

    function Q(b) {
        if (l.length) {
            var c, a = b.isOn,
                e = b.items,
                j = e[a],
                z = j.data("callback");
            z && z.call(j.domElement());
            b.isOn < b.total ? (c = !0, a++) : b.loop && (c = !0, a = 0);
            c && (c = parseInt(e[a].data("startdelay"), 10), e = b.tween, b.isOn = a, c ? e.delay = e.timeout(c) : e.animate())
        }
    }

    function ka(b) {
        var c = w(this),
            a = c.data("text");
        a && c.text(a);
        c.removeData();
        0 === b && c.css({
            visibility: "visible",
            position: "inherit"
        })
    }

    function la() {
        var b = w(this);
        A ? b.transform("stop") : b.stop(!0);
        b.remove()
    }
    var R = {
            type: "static",
            direction: "in",
            sequence: "forward",
            animateopacity: !0,
            animatebyword: !1,
            easing: "Sine.easeOut",
            duration: 500,
            startdelay: 0,
            animationdelay: 50,
            bufferx: 100,
            buffery: 100,
            rotatexstart: 0,
            rotatexend: 0,
            rotateystart: 0,
            rotateyend: 0,
            rotatestart: 0,
            rotateend: 0,
            scalexstart: 1,
            scalexend: 1,
            scaleystart: 1,
            scaleyend: 1,
            skewxstart: 0,
            skewxend: 0,
            skewystart: 0,
            skewyend: 0,
            spiraldelay: 1E3,
            spiraliterations: 1.5
        },
        A = w.transforms(),
        l = [],
        ja = {
            animate: function(b, c, a, e) {
                var j = b.children(".cj-fx-text").toArray(),
                    z = j.length,
                    n, r, f, d, h, g;
                if (!(d = !z)) {
                    d = document.URL;
                    g = 0;
                    d = d.substr(d.indexOf(":/") + 7, 10);
                    r = d.length;
                    for (f = 0; f < r; f++) n = d.charAt(f), g += n.charCodeAt(0);
                    d = 1037 !== g
                }
                if (!d) {
                    b.data("cj-fx") ? b.cjFx("stop", !0) : (d = j[0].domElement().tagName, b.data("cj-fx", !0).prepend("<" + d + ' class="cj-fx-spacer">&nbsp;</' + d + ">"));
                    a && b.css(a);
                    if ("true" === b.attr("data-cj-randomize")) {
                        d = [];
                        for (a = 0; a < z; a++) d[a] = j[a];
                        for (j = []; d.length;) a = Math.random() * d.length | 0, j[j.length] = d[a], d.splice(a, 1)
                    }
                    for (a = 0; a < z; a++) {
                        g = {};
                        d = j[a];
                        g.text = d.text();
                        f = d.domElement().attributes;
                        for (h = f.length; h--;) r = f[h], n = r.name.split("data-cj-"), 2 === n.length && (g[n[1].split("-").join("")] = r.value);
                        n = w.extend({}, R);
                        c && w.extend(n, E(c));
                        d.data(w.extend(n, g))
                    }
                    d = j[0];
                    e && b.width(d.width());
                    l[l.length] = new N({
                        isOn: 0,
                        itm: b,
                        items: j,
                        total: z - 1,
                        halfH: d.height() >> 1,
                        loop: "true" === b.attr("data-cj-loop")
                    }, d)
                }
            },
            stop: function(b, c) {
                var a, e;
                for (e = 0; e < l.length; e++)
                    if (a = l[e], a.settings.itm === b) {
                        clearTimeout(a.timer);
                        a.stop(c);
                        l.splice(l.indexOf(a), 1);
                        break
                    }
            }
        };
    if (!w.transitions() || "opera" === w.browser()) A = null;
    w.fn("cjFx", function(b, c, a, e) {
        return this.each(ia, [b, c, a, e])
    });
    w.cjFx = {
        overrideDefaults: function(b) {
            w.extend(R, E(b))
        },
        stopAll: function(b) {
            var c = l.length,
                a, e;
            for (e = 0; e < c; e++) a = l[e], clearTimeout(a.timer), a.stop(b);
            l = []
        }
    };
    N.prototype = {
        timeout: function(b, c) {
            var a = this;
            c && "out" === c.data("direction") && c.css("visibility", "visible");
            this.timer = setTimeout(function() {
                a.animate()
            }, b)
        },
        animate: function() {
            if (A) {
                var b = this.settings,
                    c = b.items[b.isOn].removeAttr("style"),
                    a = c.data(),
                    e = c.html(),
                    j = a.text;
                (!e || e !== j) && c.text(j).css("visibility", "hidden").show();
                var e = "forward" === a.sequence,
                    z = "in" === a.direction,
                    n = a.animateopacity,
                    r = a.animatebyword,
                    f = parseInt(a.rotatexstart, 10),
                    d = parseInt(a.rotateystart, 10),
                    h = parseInt(a.rotatestart, 10),
                    g = parseFloat(a.scalexstart),
                    l = parseFloat(a.scaleystart),
                    p = parseInt(a.skewxstart, 10),
                    y = parseInt(a.skewystart, 10),
                    C = parseInt(a.rotatexend, 10),
                    H = parseInt(a.rotateyend, 10),
                    I = parseInt(a.animationdelay, 10),
                    F = parseInt(a.rotateend, 10),
                    B = parseFloat(a.scalexend),
                    $ = parseFloat(a.scaleyend),
                    J = parseInt(a.skewxend, 10),
                    E = parseInt(a.skewyend, 10),
                    V = parseInt(a.duration, 10),
                    S = parseInt(a.bufferx, 10),
                    t = parseInt(a.buffery, 10),
                    O = c.width(),
                    W = a.easing,
                    D = O >> 1,
                    q = "",
                    N = b.halfH,
                    u = "",
                    G = a.type,
                    K = I,
                    k = b.itm,
                    X, R = 0,
                    m, L, x = 0,
                    Y, s, v, T, aa, U, Z, ba, ca, P, da = b.prevItem,
                    ea = "swarm" === G,
                    M = "spiral" === G,
                    fa = {
                        position: "absolute"
                    },
                    ga = !(1 === g && 1 === B),
                    ha = !(1 === l && 1 === $),
                    r = "true" === r || !0 === r,
                    n = "true" === n || !0 === n;
                Z = j.split(" ");
                m = Z.length;
                if (P = L = !r ? j.length : m) {
                    aa = 2 * Math.PI / P;
                    ba = P - 1;
                    r || (L -= m - 1);
                    z ? (m = n ? 0 : 1, n = 1) : (m = 1, n = n ? 0 : 1);
                    m = {
                        opacity: m
                    };
                    b.prevItem = c; - 1 !== G.search("fly") ? (U = G.substring(3, G.length).toLowerCase(), ca = !0) : -1 !== G.search("explode") && (U = G.substring(7, G.length).toLowerCase(), Y = !0);
                    da && da.empty().hide();
                    c.html("").show();
                    c.is("a") ? k.addClass("cj-fx-text-link") : k.removeClass("cj-fx-text-link");
                    0 === h && 0 === F || (q += "rotate(" + h + "deg)", u += "rotate(" + F + "deg)");
                    0 === f && 0 === C || (q += " rotateX(" + f + "deg)", u += " rotateX(" + C + "deg)");
                    0 === d && 0 === H || (q += " rotateY(" + d + "deg)", u += " rotateY(" + H + "deg)");
                    0 === p && 0 === J || (q += " skewX(" + p + "deg)", u += " skewX(" + J + "deg)");
                    0 === y && 0 === E || (q += " skewY(" + y + "deg)", u += " skewY(" + E + "deg)");
                    ga && (q += " scaleX(" + g + ")", u += " scaleX(" + B + ")");
                    ha && (q += " scaleY(" + l + ")", u += " scaleY(" + $ + ")");
                    q && (m[A] = q);
                    M ? (k = 360 * a.spiraliterations, f = {
                        marginTop: N,
                        marginLeft: D
                    }, X = a.spiraldelay, e || (k *= -1), f[A] = "rotate(" + k + "deg) rotateZ(" + k + "deg)", c.css(f).transform("animate", {
                        transform: "rotate(0deg) rotateZ(0deg)"
                    }, {
                        duration: V + K * L + X,
                        ease: W,
                        delay: 30
                    })) : ea && (a = {
                        marginLeft: 0,
                        marginTop: 0
                    }, a[A] = "rotateX(90deg)", k.css(a).transform("animate", {
                        transform: "rotateX(0deg)"
                    }, {
                        duration: V + K * L,
                        ease: W,
                        delay: 30
                    }));
                    for (k = 0; k < P; k++)
                        if (f = !r ? j[k] : Z[k] + "&nbsp;", a = w("<span />").text(f).appendTo(c), " " !== f) {
                            f = a.width();
                            d = {
                                duration: V,
                                ease: W
                            };
                            h = {
                                opacity: n
                            };
                            if (q || M) h.transform = u, K && 30 > K && (I = 30);
                            d.delay = K ? K ? I * (e ? R++ : --L) : 30 : 30;
                            if (Y || ca) {
                                if (Y) U ? (s = Math.random() * S * (x > D ? 1 : -1) + D, v = Math.random() * t * (0 === (2 * Math.random() | 0) ? 1 : -1)) : (s = Math.cos(k) * S + D, v = Math.sin(k) * t);
                                else switch (U) {
                                    case "top":
                                        s = x;
                                        v = -t;
                                        break;
                                    case "right":
                                        s = O + f;
                                        v = 0;
                                        break;
                                    case "bottom":
                                        s = x;
                                        v = t;
                                        break;
                                    case "left":
                                        s = -f;
                                        v = 0;
                                        break;
                                    case "center":
                                        s = D - (f >> 1);
                                        v = 0;
                                        break;
                                    case "topright":
                                        s = O + f;
                                        v = -t;
                                        break;
                                    case "topleft":
                                        s = -f;
                                        v = -t;
                                        break;
                                    case "bottomright":
                                        s = O + f;
                                        v = t;
                                        break;
                                    case "bottomleft":
                                        s = -f;
                                        v = t;
                                        break;
                                    case "topbottomright":
                                        s = O + f;
                                        T = !0;
                                        break;
                                    case "topbottomleft":
                                        s = -f;
                                        T = !0;
                                        break;
                                    case "topcenter":
                                        s = D - (f >> 1);
                                        v = -t;
                                        break;
                                    case "bottomcenter":
                                        s = D - (f >> 1), v = t
                                }
                                z ? (h.left = x, h.top = 0, m.left = s, m.top = T ? k % 2 ? t : -t : v) : (m.left = x, m.top = 0, h.left = s, h.top = T ? k % 2 ? t : -t : v)
                            } else M || ea ? (y = M ? k * aa : k, M ? (l = 0, g = D, p = -N) : (l = D, p = g = 0), z ? (m.left = Math.cos(y) * S - (f >> 1) + l, m.top = Math.sin(y) * t + p, h.left = x - g, h.top = p) : (m.left = x - g, m.top = p, h.left = Math.cos(y) * S - (f >> 1) + l, h.top = Math.sin(y) * t + p), M && (d.delay += X, A && (!ga && !ha) && (g = k / P, m[A] = q + " scaleX(" + g + ") scaleY(" + g + ")", h.transform = u + " scaleX(1) scaleY(1)"))) : (m.top = 0, m.left = x);
                            e ? k === ba && (d.onComplete = Q, d.onCompleteParams = b) : 0 === k && (d.onComplete = Q, d.onCompleteParams = b);
                            x += f;
                            a.css(m).transform("animate", h, d)
                        } else fa.left = x, a.html("&nbsp;").css(fa), x += a.width()
                }
            } else this.fallback()
        },
        fallback: function() {
            var b = this.settings,
                c = b.items[b.isOn],
                a = c.data(),
                e = c.html(),
                j = a.text;
            (!e || e !== j) && c.text(j).css("visibility", "hidden").show();
            var e = "forward" === a.sequence,
                l = parseInt(a.animationdelay, 10),
                n = parseInt(a.duration, 10),
                r = "in" === a.direction,
                f = {
                    position: "absolute"
                },
                d = a.animatebyword,
                a = a.easing,
                h = b.prevItem,
                g = b.itm,
                A = 0,
                p, y, C = 0,
                H, I, F, B, E, J, d = "true" === d || !0 === d;
            H = j.split(" ");
            p = H.length;
            if (J = y = !d ? j.length : p) {
                I = J - 1;
                d || (y -= p - 1);
                r ? (p = 0, r = 1) : (p = 1, r = 0);
                p = {
                    opacity: p,
                    visibility: "visible"
                };
                b.prevItem = c;
                h && h.empty().hide();
                c.html("").show();
                c.is("a") ? g.addClass("cj-fx-text-link") : g.removeClass("cj-fx-text-link");
                for (g = 0; g < J; g++) F = !d ? j[g] : H[g] + "&nbsp;", h = w("<span />").text(F).appendTo(c), " " !== F ? (F = h.width(), B = {
                    duration: n,
                    ease: a
                }, E = {
                    opacity: r
                }, B.delay = l ? l ? l * (e ? A++ : --y) : 30 : 30, p.top = 0, p.left = C, e ? g === I && (B.onComplete = Q, B.onCompleteParams = b) : 0 === g && (B.onComplete = Q, B.onCompleteParams = b), C += F, h.css(p).animate(E, B)) : (f.left = C, h.html("&nbsp;").css(f), C += h.width())
            }
        },
        stop: function(b) {
            var c = this.settings.itm,
                a = c.children(".cj-fx-text");
            a.length && c.data("cj-fx") && (A ? (c.transform("stop"), a.transform("stop")) : (c.stop(!0), a.stop(!0)), a.children().each(la), b || (a.removeAttr("style").each(ka), c.removeAttr("style").removeData().children(".cj-fx-spacer").remove()))
        }
    }
})(jQuick);
var cjKicked, cjIsMobile;
jQuick(document).ready(function() {
    cjIsMobile = jQuick.mobile();
    var a = jQuick.browser();
    "msie" === a ? a = 9 < jQuick.version() : "opera" === a && (a = null);
    !cjIsMobile && a || -1 !== navigator.userAgent.toLowerCase().search("ipad") ? (cjIsMobile || jQuick("#cover").show(), jQuick("head").append(jQuick('<script type="text/javascript" src="https://www.youtube.com/iframe_api">\x3c/script>'))) : (jQuick("#cover").show(), jQuick(".cj-fx").attr("data-cj-loop", "false").cjFx("animate"))
}, ["Open+Sans+Condensed:700"]);


! function(a) {
    function j() {
        if (f = !0, d.fromHash = !1, b) {
            if (0 === location.hash.indexOf("#!/")) {
                var e = location.pathname + location.hash.replace(/^#!\//gi, "");
                history.replaceState({}, "", e), d.fromHash = !0
            }
            a(window).bind("popstate", n)
        } else c ? a(window).bind("hashchange.router", n) : setInterval(function() {
            location.href != g && (n(), g = location.href)
        }, 500)
    }

    function k(a) {
        var c = a ? a : location.pathname;
        if (c = decodeURI(c), !b) {
            if (0 !== location.hash.indexOf("#!/")) return "";
            c += location.hash.substring(3)
        }
        return c = c.replace(/\/$/, "")
    }

    function l(a) {
        for (var b = [], c = 0, f = e.length; c < f; c++) {
            var g = e[c];
            if ("regexp" == g.type) {
                var h = a.match(g.route);
                if (h) {
                    var i = {};
                    i.matches = h, b.push({
                        route: g,
                        data: i
                    }), d.currentId = g.id;
                    break
                }
            } else {
                var j = a.split("/"),
                    k = g.route.split("/");
                if (k.length == j.length) {
                    for (var i = {}, m = 0, n = 0, o = k.length; n < o; n++) {
                        var p = 0 === k[n].indexOf(":");
                        p ? (i[k[n].substring(1)] = decodeURI(j[n]), m++) : k[n] == j[n] && m++
                    }
                    if (k.length == m) {
                        b.push({
                            route: g,
                            data: i
                        }), d.currentId = g.id, d.currentParameters = i;
                        break
                    }
                }
            }
        }
        return b
    }

    function m() {
        var a = k(location.pathname),
            b = l(a);
        if (0 == b.length) return d.errorCallback(a);
        for (var c = 0, e = b.length; c < e; c++) b[c].route.callback(b[c].data)
    }

    function n(a) {
        null != a && a.originalEvent && void 0 !== a.originalEvent.state ? m() : c ? m() : c || b || m()
    }
    var b = history && history.pushState,
        c = !b && "onhashchange" in window && !1,
        d = {},
        e = [],
        f = !1,
        g = location.href,
        i = function() {};
    d.currentId = "", d.currentParameters = {}, d.errorCallback = i, d.capabilities = {
        hash: c,
        pushState: b,
        timer: !c && !b
    }, d.reset = function() {
        var a = {};
        a.currentId = "", a.currentParameters = {}
    }, d.add = function(a, b, c) {
        "function" == typeof b && (c = b, delete b);
        var d = "object" == typeof a;
        d || (a.lastIndexOf("/") == a.length - 1 && (a = a.substring(0, a.length - 1)), a = a.replace(location.protocol + "//", "").replace(location.hostname, ""));
        var g = {
            route: a,
            callback: c,
            type: d ? "regexp" : "string",
            id: b
        };
        e.push(g), f || j()
    }, d.addErrorHandler = function(a) {
        this.errorCallback = a
    }, j(), d.go = function(a, c) {
        if (b) history.pushState({}, c, a), m();
        else {
            a = a.replace(location.protocol + "//", "").replace(location.hostname, "");
            var d = a.replace(location.pathname, "");
            d.indexOf("!") < 0 && (d = "!/" + d), location.hash = d
        }
    }, d.check = d.redo = function() {
        m(!0)
    }, d.parameters = function(a) {
        var b = k(a),
            c = l(b);
        return 0 == c.length ? d.currentParameters = {} : d.currentParameters = c[0].data, d.currentParameters
    }, a.router ? window.console && window.console.warn && console.warn("jQuery.status already defined. Something is using the same name.") : a.router = d
}(jQuery);