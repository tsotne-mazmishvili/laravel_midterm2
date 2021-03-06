var requirejs, require, define;
! function(global) {
    function isFunction(a) {
        return "[object Function]" === ostring.call(a)
    }

    function isArray(a) {
        return "[object Array]" === ostring.call(a)
    }

    function each(a, b) {
        if (a) {
            var c;
            for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1);
        }
    }

    function eachReverse(a, b) {
        if (a) {
            var c;
            for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1);
        }
    }

    function hasProp(a, b) {
        return hasOwn.call(a, b)
    }

    function getOwn(a, b) {
        return hasProp(a, b) && a[b]
    }

    function eachProp(a, b) {
        var c;
        for (c in a)
            if (hasProp(a, c) && b(a[c], c)) break
    }

    function mixin(a, b, c, d) {
        return b && eachProp(b, function(b, e) {
            !c && hasProp(a, e) || (d && "string" != typeof b ? (a[e] || (a[e] = {}), mixin(a[e], b, c, d)) : a[e] = b)
        }), a
    }

    function bind(a, b) {
        return function() {
            return b.apply(a, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(a) {
        throw a
    }

    function getGlobal(a) {
        if (!a) return a;
        var b = global;
        return each(a.split("."), function(a) {
            b = b[a]
        }), b
    }

    function makeError(a, b, c, d) {
        var e = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
        return e.requireType = a, e.requireModules = d, c && (e.originalError = c), e
    }

    function newContext(a) {
        function p(a) {
            var b, c;
            for (b = 0; a[b]; b += 1)
                if ("." === (c = a[b])) a.splice(b, 1), b -= 1;
                else if (".." === c) {
                if (1 === b && (".." === a[2] || ".." === a[0])) break;
                b > 0 && (a.splice(b - 1, 2), b -= 2)
            }
        }

        function q(a, b, c) {
            var d, e, f, h, i, j, k, l, m, n, o, q = b && b.split("/"),
                r = q,
                s = g.map,
                t = s && s["*"];
            if (a && "." === a.charAt(0) && (b ? (r = getOwn(g.pkgs, b) ? q = [b] : q.slice(0, q.length - 1), a = r.concat(a.split("/")), p(a), e = getOwn(g.pkgs, d = a[0]), a = a.join("/"), e && a === d + "/" + e.main && (a = d)) : 0 === a.indexOf("./") && (a = a.substring(2))), c && s && (q || t)) {
                for (h = a.split("/"), i = h.length; i > 0; i -= 1) {
                    if (k = h.slice(0, i).join("/"), q)
                        for (j = q.length; j > 0; j -= 1)
                            if ((f = getOwn(s, q.slice(0, j).join("/"))) && (f = getOwn(f, k))) {
                                l = f, m = i;
                                break
                            }
                    if (l) break;
                    !n && t && getOwn(t, k) && (n = getOwn(t, k), o = i)
                }!l && n && (l = n, m = o), l && (h.splice(0, m, l), a = h.join("/"))
            }
            return a
        }

        function r(a) {
            isBrowser && each(scripts(), function(b) {
                if (b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === d.contextName) return b.parentNode.removeChild(b), !0
            })
        }

        function s(a) {
            var b = getOwn(g.paths, a);
            if (b && isArray(b) && b.length > 1) return b.shift(), d.require.undef(a), d.require([a]), !0
        }

        function t(a) {
            var b, c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
        }

        function u(a, b, c, e) {
            var f, g, h, i, j = null,
                k = b ? b.name : null,
                m = a,
                p = !0,
                r = "";
            return a || (p = !1, a = "_@r" + (n += 1)), i = t(a), j = i[0], a = i[1], j && (j = q(j, k, e), g = getOwn(l, j)), a && (j ? r = g && g.normalize ? g.normalize(a, function(a) {
                return q(a, k, e)
            }) : q(a, k, e) : (r = q(a, k, e), i = t(r), j = i[0], r = i[1], c = !0, f = d.nameToUrl(r))), h = !j || g || c ? "" : "_unnormalized" + (o += 1), {
                prefix: j,
                name: r,
                parentMap: b,
                unnormalized: !!h,
                url: f,
                originalName: m,
                isDefine: p,
                id: (j ? j + "!" + r : r) + h
            }
        }

        function v(a) {
            var b = a.id,
                c = getOwn(h, b);
            return c || (c = h[b] = new d.Module(a)), c
        }

        function w(a, b, c) {
            var d = a.id,
                e = getOwn(h, d);
            !hasProp(l, d) || e && !e.defineEmitComplete ? (e = v(a), e.error && "error" === b ? c(e.error) : e.on(b, c)) : "defined" === b && c(l[d])
        }

        function x(a, b) {
            var c = a.requireModules,
                d = !1;
            b ? b(a) : (each(c, function(b) {
                var c = getOwn(h, b);
                c && (c.error = a, c.events.error && (d = !0, c.emit("error", a)))
            }), d || req.onError(a))
        }

        function y() {
            globalDefQueue.length && (apsp.apply(k, [k.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function z(a) {
            delete h[a], delete i[a]
        }

        function A(a, b, c) {
            var d = a.map.id;
            a.error ? a.emit("error", a.error) : (b[d] = !0, each(a.depMaps, function(d, e) {
                var f = d.id,
                    g = getOwn(h, f);
                !g || a.depMatched[e] || c[f] || (getOwn(b, f) ? (a.defineDep(e, l[f]), a.check()) : A(g, b, c))
            }), c[d] = !0)
        }

        function B() {
            var a, c, e, h, j = 1e3 * g.waitSeconds,
                k = j && d.startTime + j < (new Date).getTime(),
                l = [],
                m = [],
                n = !1,
                o = !0;
            if (!b) {
                if (b = !0, eachProp(i, function(b) {
                        if (a = b.map, c = a.id, b.enabled && (a.isDefine || m.push(b), !b.error))
                            if (!b.inited && k) s(c) ? (h = !0, n = !0) : (l.push(c), r(c));
                            else if (!b.inited && b.fetched && a.isDefine && (n = !0, !a.prefix)) return o = !1
                    }), k && l.length) return e = makeError("timeout", "Load timeout for modules: " + l, null, l), e.contextName = d.contextName, x(e);
                o && each(m, function(a) {
                    A(a, {}, {})
                }), k && !h || !n || !isBrowser && !isWebWorker || f || (f = setTimeout(function() {
                    f = 0, B()
                }, 50)), b = !1
            }
        }

        function C(a) {
            hasProp(l, a[0]) || v(u(a[0], null, !0)).init(a[1], a[2])
        }

        function D(a, b, c, d) {
            a.detachEvent && !isOpera ? d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1)
        }

        function E(a) {
            var b = a.currentTarget || a.srcElement;
            return D(b, d.onScriptLoad, "load", "onreadystatechange"), D(b, d.onScriptError, "error"), {
                node: b,
                id: b && b.getAttribute("data-requiremodule")
            }
        }

        function F() {
            var a;
            for (y(); k.length;) {
                if (a = k.shift(), null === a[0]) C(a)
            }
        }
        var b, c, d, e, f, g = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            h = {},
            i = {},
            j = {},
            k = [],
            l = {},
            m = {},
            n = 1,
            o = 1;
        return e = {
            require: function(a) {
                return a.require ? a.require : a.require = d.makeRequire(a.map)
            },
            exports: function(a) {
                if (a.usingExports = !0, a.map.isDefine) return a.exports ? a.exports : a.exports = l[a.map.id] = {}
            },
            module: function(a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function() {
                        var c = getOwn(g.pkgs, a.map.id);
                        return (c ? getOwn(g.config, a.map.id + "/" + c.main) : getOwn(g.config, a.map.id)) || {}
                    },
                    exports: l[a.map.id]
                }
            }
        }, c = function(a) {
            this.events = getOwn(j, a.id) || {}, this.map = a, this.shim = getOwn(g.shim, a.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, c.prototype = {
            init: function(a, b, c, d) {
                d = d || {}, this.inited || (this.factory = b, c ? this.on("error", c) : this.events.error && (c = bind(this, function(a) {
                    this.emit("error", a)
                })), this.depMaps = a && a.slice(0), this.errback = c, this.inited = !0, this.ignore = d.ignore, d.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, d.startTime = (new Date).getTime();
                    var a = this.map;
                    if (!this.shim) return a.prefix ? this.callPlugin() : this.load();
                    d.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return a.prefix ? this.callPlugin() : this.load()
                    }))
                }
            },
            load: function() {
                var a = this.map.url;
                m[a] || (m[a] = !0, d.load(this.map.id, a))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id,
                        e = this.depExports,
                        f = this.exports,
                        g = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(g)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        f = d.execCb(c, g, e, f)
                                    } catch (b) {
                                        a = b
                                    } else f = d.execCb(c, g, e, f);
                                    if (this.map.isDefine && (b = this.module, b && void 0 !== b.exports && b.exports !== this.exports ? f = b.exports : void 0 === f && this.usingExports && (f = this.exports)), a) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", x(this.error = a)
                                } else f = g;
                                this.exports = f, this.map.isDefine && !this.ignore && (l[c] = f, req.onResourceLoad && req.onResourceLoad(d, this.map, this.depMaps)), z(c), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function() {
                var a = this.map,
                    b = a.id,
                    c = u(a.prefix);
                this.depMaps.push(c), w(c, "defined", bind(this, function(c) {
                    var e, f, i, j = this.map.name,
                        k = this.map.parentMap ? this.map.parentMap.name : null,
                        l = d.makeRequire(a.parentMap, {
                            enableBuildCallback: !0
                        });
                    if (this.map.unnormalized) return c.normalize && (j = c.normalize(j, function(a) {
                        return q(a, k, !0)
                    }) || ""), f = u(a.prefix + "!" + j, this.map.parentMap), w(f, "defined", bind(this, function(a) {
                        this.init([], function() {
                            return a
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), void((i = getOwn(h, f.id)) && (this.depMaps.push(f), this.events.error && i.on("error", bind(this, function(a) {
                        this.emit("error", a)
                    })), i.enable()));
                    e = bind(this, function(a) {
                        this.init([], function() {
                            return a
                        }, null, {
                            enabled: !0
                        })
                    }), e.error = bind(this, function(a) {
                        this.inited = !0, this.error = a, a.requireModules = [b], eachProp(h, function(a) {
                            0 === a.map.id.indexOf(b + "_unnormalized") && z(a.map.id)
                        }), x(a)
                    }), e.fromText = bind(this, function(c, f) {
                        var h = a.name,
                            i = u(h),
                            j = useInteractive;
                        f && (c = f), j && (useInteractive = !1), v(i), hasProp(g.config, b) && (g.config[h] = g.config[b]);
                        try {
                            req.exec(c)
                        } catch (a) {
                            return x(makeError("fromtexteval", "fromText eval for " + b + " failed: " + a, a, [b]))
                        }
                        j && (useInteractive = !0), this.depMaps.push(i), d.completeLoad(h), l([h], e)
                    }), c.load(a.name, l, e, g)
                })), d.enable(c, this), this.pluginMaps[c.id] = c
            },
            enable: function() {
                i[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(a, b) {
                    var c, f, g;
                    if ("string" == typeof a) {
                        if (a = u(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[b] = a, g = getOwn(e, a.id)) return void(this.depExports[b] = g(this));
                        this.depCount += 1, w(a, "defined", bind(this, function(a) {
                            this.defineDep(b, a), this.check()
                        })), this.errback && w(a, "error", bind(this, this.errback))
                    }
                    c = a.id, f = h[c], hasProp(e, c) || !f || f.enabled || d.enable(a, this)
                })), eachProp(this.pluginMaps, bind(this, function(a) {
                    var b = getOwn(h, a.id);
                    b && !b.enabled && d.enable(a, this)
                })), this.enabling = !1, this.check()
            },
            on: function(a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []), c.push(b)
            },
            emit: function(a, b) {
                each(this.events[a], function(a) {
                    a(b)
                }), "error" === a && delete this.events[a]
            }
        }, d = {
            config: g,
            contextName: a,
            registry: h,
            defined: l,
            urlFetched: m,
            defQueue: k,
            Module: c,
            makeModuleMap: u,
            nextTick: req.nextTick,
            onError: x,
            configure: function(a) {
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                var b = g.pkgs,
                    c = g.shim,
                    e = {
                        paths: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(a, function(a, b) {
                    e[b] ? "map" === b ? (g.map || (g.map = {}), mixin(g[b], a, !0, !0)) : mixin(g[b], a, !0) : g[b] = a
                }), a.shim && (eachProp(a.shim, function(a, b) {
                    isArray(a) && (a = {
                        deps: a
                    }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = d.makeShimExports(a)), c[b] = a
                }), g.shim = c), a.packages && (each(a.packages, function(a) {
                    var c;
                    a = "string" == typeof a ? {
                        name: a
                    } : a, c = a.location, b[a.name] = {
                        name: a.name,
                        location: c || a.name,
                        main: (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    }
                }), g.pkgs = b), eachProp(h, function(a, b) {
                    a.inited || a.map.unnormalized || (a.map = u(b))
                }), (a.deps || a.callback) && d.require(a.deps || [], a.callback)
            },
            makeShimExports: function(a) {
                function b() {
                    var b;
                    return a.init && (b = a.init.apply(global, arguments)), b || a.exports && getGlobal(a.exports)
                }
                return b
            },
            makeRequire: function(b, c) {
                function f(g, i, j) {
                    var k, m, n;
                    return c.enableBuildCallback && i && isFunction(i) && (i.__requireJsBuild = !0), "string" == typeof g ? isFunction(i) ? x(makeError("requireargs", "Invalid require call"), j) : b && hasProp(e, g) ? e[g](h[b.id]) : req.get ? req.get(d, g, b, f) : (m = u(g, b, !1, !0), k = m.id, hasProp(l, k) ? l[k] : x(makeError("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (b ? "" : ". Use require([])")))) : (F(), d.nextTick(function() {
                        F(), n = v(u(null, b)), n.skipMap = c.skipMap, n.init(g, i, j, {
                            enabled: !0
                        }), B()
                    }), f)
                }
                return c = c || {}, mixin(f, {
                    isBrowser: isBrowser,
                    toUrl: function(a) {
                        var c, e = a.lastIndexOf("."),
                            f = a.split("/")[0],
                            g = "." === f || ".." === f;
                        return -1 !== e && (!g || e > 1) && (c = a.substring(e, a.length), a = a.substring(0, e)), d.nameToUrl(q(a, b && b.id, !0), c, !0)
                    },
                    defined: function(a) {
                        return hasProp(l, u(a, b, !1, !0).id)
                    },
                    specified: function(a) {
                        return a = u(a, b, !1, !0).id, hasProp(l, a) || hasProp(h, a)
                    }
                }), b || (f.undef = function(a) {
                    y();
                    var c = u(a, b, !0),
                        d = getOwn(h, a);
                    r(a), delete l[a], delete m[c.url], delete j[a], d && (d.events.defined && (j[a] = d.events), z(a))
                }), f
            },
            enable: function(a) {
                getOwn(h, a.id) && v(a).enable()
            },
            completeLoad: function(a) {
                var b, c, d, e = getOwn(g.shim, a) || {},
                    f = e.exports;
                for (y(); k.length;) {
                    if (c = k.shift(), null === c[0]) {
                        if (c[0] = a, b) break;
                        b = !0
                    } else c[0] === a && (b = !0);
                    C(c)
                }
                if (d = getOwn(h, a), !b && !hasProp(l, a) && d && !d.inited) {
                    if (!(!g.enforceDefine || f && getGlobal(f))) return s(a) ? void 0 : x(makeError("nodefine", "No define call for " + a, null, [a]));
                    C([a, e.deps || [], e.exportsFn])
                }
                B()
            },
            nameToUrl: function(a, b, c) {
                var d, e, f, h, i, j, k, l, m;
                if (req.jsExtRegExp.test(a)) l = a + (b || "");
                else {
                    for (d = g.paths, e = g.pkgs, i = a.split("/"), j = i.length; j > 0; j -= 1) {
                        if (k = i.slice(0, j).join("/"), f = getOwn(e, k), m = getOwn(d, k)) {
                            isArray(m) && (m = m[0]), i.splice(0, j, m);
                            break
                        }
                        if (f) {
                            h = a === f.name ? f.location + "/" + f.main : f.location, i.splice(0, j, h);
                            break
                        }
                    }
                    l = i.join("/"), l += b || (/^data\:|\?/.test(l) || c ? "" : ".js"), l = ("/" === l.charAt(0) || l.match(/^[\w\+\.\-]+:/) ? "" : g.baseUrl) + l
                }
                return g.urlArgs ? l + (-1 === l.indexOf("?") ? "?" : "&") + g.urlArgs : l
            },
            load: function(a, b) {
                req.load(d, a, b)
            },
            execCb: function(a, b, c, d) {
                return b.apply(d, c)
            },
            onScriptLoad: function(a) {
                if ("load" === a.type || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
                    interactiveScript = null;
                    var b = E(a);
                    d.completeLoad(b.id)
                }
            },
            onScriptError: function(a) {
                var b = E(a);
                if (!s(b.id)) return x(makeError("scripterror", "Script error for: " + b.id, a, [b.id]))
            }
        }, d.require = d.makeRequire(), d
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(a) {
            if ("interactive" === a.readyState) return interactiveScript = a
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.9",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if (void 0 === define) {
        if (void 0 !== requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        void 0 === require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(a, b, c, d) {
            var e, f, g = defContextName;
            return isArray(a) || "string" == typeof a || (f = a, isArray(b) ? (a = b, b = c, c = d) : a = []), f && f.context && (g = f.context), e = getOwn(contexts, g), e || (e = contexts[g] = req.s.newContext(g)), f && e.configure(f), e.require(a, b, c)
        }, req.config = function(a) {
            return req(a)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(a) {
            setTimeout(a, 4)
        } : function(a) {
            a()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(a) {
            req[a] = function() {
                var b = contexts[defContextName];
                return b.require[a].apply(b, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], (baseElement = document.getElementsByTagName("base")[0]) && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(a, b, c) {
            var d = a.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return d.type = a.scriptType || "text/javascript", d.charset = "utf-8", d.async = !0, d
        }, req.load = function(a, b, c) {
            var e, d = a && a.config || {};
            if (isBrowser) return e = req.createNode(d, b, c), e.setAttribute("data-requirecontext", a.contextName), e.setAttribute("data-requiremodule", b), !e.attachEvent || e.attachEvent.toString && e.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (e.addEventListener("load", a.onScriptLoad, !1), e.addEventListener("error", a.onScriptError, !1)) : (useInteractive = !0, e.attachEvent("onreadystatechange", a.onScriptLoad)), e.src = c, currentlyAddingScript = e, baseElement ? head.insertBefore(e, baseElement) : head.appendChild(e), currentlyAddingScript = null, e;
            if (isWebWorker) try {
                importScripts(c), a.completeLoad(b)
            } catch (d) {
                a.onError(makeError("importscripts", "importScripts failed for " + b + " at " + c, d, [b]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(a) {
            if (head || (head = a.parentNode), dataMain = a.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function(a, b, c) {
            var d, e;
            "string" != typeof a && (c = b, b = a, a = null), isArray(b) || (c = b, b = null), !b && isFunction(c) && (b = [], c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
                b.push(c)
            }), b = (1 === c.length ? ["require"] : ["require", "exports", "module"]).concat(b))), useInteractive && (d = currentlyAddingScript || getInteractiveScript()) && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")]), (e ? e.defQueue : globalDefQueue).push([a, b, c])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this);