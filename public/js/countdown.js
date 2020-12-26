var module, countdown = function(e) {
    "use strict";

    function s(e, s) {
        var t = e.getTime();
        return e.setMonth(e.getMonth() + s), Math.round((e.getTime() - t) / R)
    }

    function t(e) {
        var s = e.getTime(),
            t = new Date(s);
        return t.setMonth(e.getMonth() + 1), Math.round((t.getTime() - s) / R)
    }

    function n(e) {
        var s = e.getTime(),
            t = new Date(s);
        return t.setFullYear(e.getFullYear() + 1), Math.round((t.getTime() - s) / R)
    }

    function i(e, s) {
        if (s = s instanceof Date || null !== s && isFinite(s) ? new Date(+s) : new Date, !e) return s;
        var t = +e.value || 0;
        return t ? (s.setTime(s.getTime() + t), s) : (t = +e.milliseconds || 0, t && s.setMilliseconds(s.getMilliseconds() + t), t = +e.seconds || 0, t && s.setSeconds(s.getSeconds() + t), t = +e.minutes || 0, t && s.setMinutes(s.getMinutes() + t), t = +e.hours || 0, t && s.setHours(s.getHours() + t), t = +e.weeks || 0, t && (t *= K), t += +e.days || 0, t && s.setDate(s.getDate() + t), t = +e.months || 0, t && s.setMonth(s.getMonth() + t), t = +e.millennia || 0, t && (t *= B), t += +e.centuries || 0, t && (t *= z), t += +e.decades || 0, t && (t *= q), t += +e.years || 0, t && s.setFullYear(s.getFullYear() + t), s)
    }

    function r(e, s) {
        return N(e) + (1 === e ? y[s] : p[s])
    }

    function o() {}

    function u(e, s) {
        switch (s) {
            case "seconds":
                if (e.seconds !== O || isNaN(e.minutes)) return;
                e.minutes++, e.seconds = 0;
            case "minutes":
                if (e.minutes !== U || isNaN(e.hours)) return;
                e.hours++, e.minutes = 0;
            case "hours":
                if (e.hours !== x || isNaN(e.days)) return;
                e.days++, e.hours = 0;
            case "days":
                if (e.days !== K || isNaN(e.weeks)) return;
                e.weeks++, e.days = 0;
            case "weeks":
                if (e.weeks !== t(e.refMonth) / K || isNaN(e.months)) return;
                e.months++, e.weeks = 0;
            case "months":
                if (e.months !== W || isNaN(e.years)) return;
                e.years++, e.months = 0;
            case "years":
                if (e.years !== q || isNaN(e.decades)) return;
                e.decades++, e.years = 0;
            case "decades":
                if (e.decades !== z || isNaN(e.centuries)) return;
                e.centuries++, e.decades = 0;
            case "centuries":
                if (e.centuries !== B || isNaN(e.millennia)) return;
                e.millennia++, e.centuries = 0
        }
    }

    function a(e, s, t, n, i, r) {
        return e[t] >= 0 && (s += e[t], delete e[t]), s /= i, 1 >= s + 1 ? 0 : e[n] >= 0 ? (e[n] = +(e[n] + s).toFixed(r), u(e, n), 0) : s
    }

    function d(e, s) {
        var i = a(e, 0, "milliseconds", "seconds", C, s);
        if (i && (i = a(e, i, "seconds", "minutes", O, s), i && (i = a(e, i, "minutes", "hours", U, s), i && (i = a(e, i, "hours", "days", x, s), i && (i = a(e, i, "days", "weeks", K, s), i && (i = a(e, i, "weeks", "months", t(e.refMonth) / K, s), i && (i = a(e, i, "months", "years", n(e.refMonth) / t(e.refMonth), s), i && (i = a(e, i, "years", "decades", q, s), i && (i = a(e, i, "decades", "centuries", z, s), i && (i = a(e, i, "centuries", "millennia", B, s))))))))))) throw new Error("Fractional unit overflow")
    }

    function l(e) {
        var t;
        for (e.milliseconds < 0 ? (t = G(-e.milliseconds / C), e.seconds -= t, e.milliseconds += t * C) : e.milliseconds >= C && (e.seconds += J(e.milliseconds / C), e.milliseconds %= C), e.seconds < 0 ? (t = G(-e.seconds / O), e.minutes -= t, e.seconds += t * O) : e.seconds >= O && (e.minutes += J(e.seconds / O), e.seconds %= O), e.minutes < 0 ? (t = G(-e.minutes / U), e.hours -= t, e.minutes += t * U) : e.minutes >= U && (e.hours += J(e.minutes / U), e.minutes %= U), e.hours < 0 ? (t = G(-e.hours / x), e.days -= t, e.hours += t * x) : e.hours >= x && (e.days += J(e.hours / x), e.hours %= x); e.days < 0;) e.months--, e.days += s(e.refMonth, 1);
        e.days >= K && (e.weeks += J(e.days / K), e.days %= K), e.months < 0 ? (t = G(-e.months / W), e.years -= t, e.months += t * W) : e.months >= W && (e.years += J(e.months / W), e.months %= W), e.years >= q && (e.decades += J(e.years / q), e.years %= q, e.decades >= z && (e.centuries += J(e.decades / z), e.decades %= z, e.centuries >= B && (e.millennia += J(e.centuries / B), e.centuries %= B)))
    }

    function c(e, t, n, i) {
        var r = 0;
        !(t & A) || r >= n ? (e.centuries += e.millennia * B, delete e.millennia) : e.millennia && r++, !(t & I) || r >= n ? (e.decades += e.centuries * z, delete e.centuries) : e.centuries && r++, !(t & b) || r >= n ? (e.years += e.decades * q, delete e.decades) : e.decades && r++, !(t & H) || r >= n ? (e.months += e.years * W, delete e.years) : e.years && r++, !(t & Y) || r >= n ? (e.months && (e.days += s(e.refMonth, e.months)), delete e.months, e.days >= K && (e.weeks += J(e.days / K), e.days %= K)) : e.months && r++, !(t & L) || r >= n ? (e.days += e.weeks * K, delete e.weeks) : e.weeks && r++, !(t & E) || r >= n ? (e.hours += e.days * x, delete e.days) : e.days && r++, !(t & F) || r >= n ? (e.minutes += e.hours * U, delete e.hours) : e.hours && r++, !(t & T) || r >= n ? (e.seconds += e.minutes * O, delete e.minutes) : e.minutes && r++, !(t & k) || r >= n ? (e.milliseconds += e.seconds * C, delete e.seconds) : e.seconds && r++, (!(t & S) || r >= n) && d(e, i)
    }

    function m(e, s, t, n, i, r) {
        var o = new Date;
        if (e.start = s = s || o, e.end = t = t || o, e.units = n, e.value = t.getTime() - s.getTime(), e.value < 0) {
            var u = t;
            t = s, s = u
        }
        e.refMonth = new Date(s.getFullYear(), s.getMonth(), 15, 12, 0, 0);
        try {
            e.millennia = 0, e.centuries = 0, e.decades = 0, e.years = t.getFullYear() - s.getFullYear(), e.months = t.getMonth() - s.getMonth(), e.weeks = 0, e.days = t.getDate() - s.getDate(), e.hours = t.getHours() - s.getHours(), e.minutes = t.getMinutes() - s.getMinutes(), e.seconds = t.getSeconds() - s.getSeconds(), e.milliseconds = t.getMilliseconds() - s.getMilliseconds(), l(e), c(e, n, i, r)
        } finally {
            delete e.refMonth
        }
        return e
    }

    function h(e) {
        return e & S ? C / 30 : e & k ? C : e & T ? C * O : e & F ? C * O * U : e & E ? C * O * U * x : C * O * U * x * K
    }

    function f(e, s, t, n, r) {
        var u;
        t = +t || j, n = n > 0 ? n : NaN, r = r > 0 ? 20 > r ? Math.round(r) : 20 : 0;
        var a = null;
        "function" == typeof e ? (u = e, e = null) : e instanceof Date || (null !== e && isFinite(e) ? e = new Date(+e) : ("object" == typeof a && (a = e), e = null));
        var d = null;
        if ("function" == typeof s ? (u = s, s = null) : s instanceof Date || (null !== s && isFinite(s) ? s = new Date(+s) : ("object" == typeof s && (d = s), s = null)), a && (e = i(a, s)), d && (s = i(d, e)), !e && !s) return new o;
        if (!u) return m(new o, e, s, t, n, r);
        var l, c = h(t),
            f = function() {
                u(m(new o, e, s, t, n, r), l)
            };
        return f(), l = setInterval(f, c)
    }
    var y, p, g, w, M, v, N, D, S = 1,
        k = 2,
        T = 4,
        F = 8,
        E = 16,
        L = 32,
        Y = 64,
        H = 128,
        b = 256,
        I = 512,
        A = 1024,
        j = H | Y | E | F | T | k,
        C = 1e3,
        O = 60,
        U = 60,
        x = 24,
        R = x * U * O * C,
        K = 7,
        W = 12,
        q = 10,
        z = 10,
        B = 10,
        G = Math.ceil,
        J = Math.floor,
        P = 0,
        Q = 1,
        V = 2,
        X = 3,
        Z = 4,
        $ = 5,
        _ = 6,
        ee = 7,
        se = 8,
        te = 9,
        ne = 10;
    o.prototype.toString = function(e) {
        var s = D(this),
            t = s.length;
        if (!t) return e ? "" + e : M;
        if (1 === t) return s[0];
        var n = g + s.pop();
        return s.join(w) + n
    }, o.prototype.toHTML = function(e, s) {
        e = e || "span";
        var t = D(this),
            n = t.length;
        if (!n) return s = s || M, s ? "<" + e + ">" + s + "</" + e + ">" : s;
        for (var i = 0; n > i; i++) t[i] = "<" + e + ">" + t[i] + "</" + e + ">";
        if (1 === n) return t[0];
        var r = g + t.pop();
        return t.join(w) + r
    }, o.prototype.addTo = function(e) {
        return i(this, e)
    }, D = function(e) {
        var s = [],
            t = e.millennia;
        return t && s.push(v(t, ne)), t = e.centuries, t && s.push(v(t, te)), t = e.decades, t && s.push(v(t, se)), t = e.years, t && s.push(v(t, ee)), t = e.months, t && s.push(v(t, _)), t = e.weeks, t && s.push(v(t, $)), t = e.days, t && s.push(v(t, Z)), t = e.hours, t && s.push(v(t, X)), t = e.minutes, t && s.push(v(t, V)), t = e.seconds, t && s.push(v(t, Q)), t = e.milliseconds, t && s.push(v(t, P)), s
    }, f.MILLISECONDS = S, f.SECONDS = k, f.MINUTES = T, f.HOURS = F, f.DAYS = E, f.WEEKS = L, f.MONTHS = Y, f.YEARS = H, f.DECADES = b, f.CENTURIES = I, f.MILLENNIA = A, f.DEFAULTS = j, f.ALL = A | I | b | H | Y | L | E | F | T | k | S;
    var ie = f.setFormat = function(e) {
            if (e) {
                if ("singular" in e || "plural" in e) {
                    var s = e.singular || [];
                    s.split && (s = s.split("|"));
                    var t = e.plural || [];
                    t.split && (t = t.split("|"));
                    for (var n = P; ne >= n; n++) y[n] = s[n] || y[n], p[n] = t[n] || p[n]
                }
                "string" == typeof e.last && (g = e.last), "string" == typeof e.delim && (w = e.delim), "string" == typeof e.empty && (M = e.empty), "function" == typeof e.formatNumber && (N = e.formatNumber), "function" == typeof e.formatter && (v = e.formatter)
            }
        },
        re = f.resetFormat = function() {
            y = " millisecond| second| minute| hour| day| week| month| year| decade| century| millennium".split("|"), p = " milliseconds| seconds| minutes| Hours| days| weeks| months| years| decades| centuries| millennia".split("|"), y[4] = tday, y[2] = tminute, p[2] = tminute, p[4] = tday, p[3] = thour, y[3] = thour, g = "", w = "", M = "", N = function(e) {
                return e
            }, v = r
        };
    return f.setLabels = function(e, s, t, n, i, r, o) {
        ie({
            singular: e,
            plural: s,
            last: t,
            delim: n,
            empty: i,
            formatNumber: r,
            formatter: o
        })
    }, f.resetLabels = re, re(), e && e.exports ? e.exports = f : "function" == typeof window.define && "undefined" != typeof window.define.amd && window.define("countdown", [], function() {
        return f
    }), f
}(module);