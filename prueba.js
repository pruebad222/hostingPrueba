type = "module" > (() => {
    const h = document.documentElement;

    function w(t) {
        const o = t.dataset.scrollContainer,
            e = t.dataset.scrollClass || "scrolled",
            s = o ? document.querySelector(o) : h;
        if (!s) return;
        const c = s.scrollTop;
        c > 0 && !t.classList.contains(e) && t.classList.add(e), c == 0 && t.classList.contains(e) && t.classList.remove(e)
    }
    window.addEventListener("scroll", () => {
        const t = document.querySelectorAll('[data-toggle~="scroll"]');
        for (const o of t) w(o)
    }), window.addEventListener("DOMContentLoaded", () => {
        const t = document.querySelectorAll('[data-toggle~="scroll"]');
        for (const o of t) w(o)
    });

    function q(t) {
        const {
            target: o
        } = t, e = o.closest('[data-toggle~="toggle"]');
        if (!e) return;
        t.preventDefault();
        const s = e.dataset.toggleTarget || e.dataset.target,
            c = e.dataset.toggleClass || "active",
            n = s ? document.querySelector(s) : e;
        n && n.classList.toggle(c)
    }
    window.addEventListener("click", q);

    function E(t) {
        var d, f, i;
        const {
            target: o
        } = t, e = o.closest('[data-toggle~="toggle-autoclose"]'), s = !!o.closest('[data-toggle~="toggle"]'), c = !!o.closest("a");
        if (!e || s || !c) return;
        const n = e.querySelector('[data-toggle~="toggle"]'),
            a = ((d = n == null ? void 0 : n.dataset) == null ? void 0 : d.toggleTarget) || ((f = n == null ? void 0 : n.dataset) == null ? void 0 : f.target),
            b = ((i = n == null ? void 0 : n.dataset) == null ? void 0 : i.toggleClass) || "active",
            u = a ? document.querySelector(a) : e;
        u && u.classList.remove(b)
    }
    window.addEventListener("click", E);

    function T(t) {
        const {
            target: o
        } = t;
        if (!o.closest('[data-toggle~="scroll-top"]')) return;
        const s = window.location;
        history.pushState({}, "", s.pathname + s.search), t.preventDefault(), window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    window.addEventListener("click", T);

    function L(t) {
        const o = document.querySelector(".layout-header"),
            e = o && o.offsetHeight || 0;
        window.scrollTo({
            top: t.offsetTop - e,
            behavior: "smooth"
        })
    }

    function C(t) {
        const {
            target: o
        } = t, e = o.closest("a");
        if (!e || e.dataset.toggle) return;
        const s = [document.location.origin, document.location.pathname, document.location.search].join(""),
            c = [e.origin, e.pathname, e.search].join("");
        if (s != c) return;
        const n = e.hash;
        if (n === "#") return;
        const a = document.querySelector(n);
        a && (history.pushState({}, "", n), t.preventDefault(), L(a))
    }

    function p() {
        const t = window.location.hash;
        if (!t || t === "#") return;
        const o = document.querySelector(t);
        if (!o) return;
        const e = document.querySelector(".layout-header"),
            s = e && e.offsetHeight || 0;
        window.scrollTo({
            top: o.offsetTop - s,
            behavior: "instant"
        })
    }
    h.addEventListener("click", C), window.addEventListener("DOMContentLoaded", p), window.addEventListener("load", () => {
        p(), window.requestAnimationFrame(p)
    });
    const l = new Map;

    function x(t) {
        return l[t] ? Object.assign({}, l[t]) : {}
    }

    function m(t, o = {}) {
        return l[t] = Object.assign(l[t] || {}, o), Object.assign({}, l[t])
    }

    function S(t) {
        var s;
        const o = ((s = t.dataset) == null ? void 0 : s.sectionSelector) || "section",
            e = t.closest(o);
        L(e || t)
    }

    function A(t, o = !1) {
        var n;
        o && console.error("Error submitting form:", o);
        const e = ((n = t.dataset) == null ? void 0 : n.containerSelector) || ".form",
            s = t.closest(e);
        s && (s.classList.remove("form-submitting"), s.classList.add("form-error"));
        const c = t.querySelectorAll('button[type="submit"],input[type="submit"]');
        for (const a of c) a.disabled = !1;
        S(t), m(t, {
            submitting: !1
        })
    }

    function j(t) {
        var c;
        const o = ((c = t.dataset) == null ? void 0 : c.containerSelector) || ".form",
            e = t.closest(o);
        e && (e.classList.remove("form-submitting"), e.classList.add("form-success"));
        const s = t.querySelectorAll('button[type="submit"],input[type="submit"]');
        for (const n of s) n.disabled = !1;
        S(t), m(t, {
            submitting: !1
        })
    }

    function D(t, o) {
        var b, u, d, f;
        const {
            errors: e
        } = o, s = t.elements;
        for (let i = 0; i < s.length; i++) {
            const r = s[i];
            if (!r.matches("input,select,textarea")) continue;
            const v = r.name;
            if (!(v in e)) {
                r.classList.remove("invalid"), r.classList.add("valid");
                continue
            }
            const N = e[v],
                U = ((b = t.dataset) == null ? void 0 : b.fieldboxSelector) || ".form-fieldbox",
                F = ((u = t.dataset) == null ? void 0 : u.checkSelector) || ".form-check",
                H = r.matches('input[type="checkbox"],input[type="radio"]') ? F : U,
                y = r.closest(H);
            if (y) {
                const k = ((d = t.dataset) == null ? void 0 : d.feedbackClass) || "form-field-feedback";
                let g = y.querySelector(`.${k}`);
                g || (g = document.createElement("div"), g.classList.add(k), y.append(g)), g.innerText = N
            }
            r.classList.remove("valid"), r.classList.add("invalid")
        }
        const c = ((f = t.dataset) == null ? void 0 : f.containerSelector) || ".form",
            n = t.closest(c);
        n && n.classList.remove("form-submitting");
        const a = t.querySelectorAll('button[type="submit"],input[type="submit"]');
        for (const i of a) i.disabled = !1;
        S(t), m(t, {
            submitting: !1
        })
    }

    function O(t) {
        var c;
        if (x(t).submitting) return !1;
        m(t, {
            submitting: !0
        });
        const o = ((c = t.dataset) == null ? void 0 : c.containerSelector) || ".form",
            e = t.closest(o);
        e && e.classList.add("form-submitting");
        const s = t.querySelectorAll('button[type="submit"],input[type="submit"]');
        for (const n of s) n.disabled = !0;
        return !0
    }
    async function M(t) {
        const {
            target: o
        } = t, e = o.closest('[data-toggle~="ajax"]');
        if (!e || (t.preventDefault(), !O(e))) return;
        let s = !1;
        const c = new FormData(e),
            n = await fetch(e.action, {
                method: e.method,
                body: c
            }).then(a => {
                if (!a.ok) throw {
                    message: a.statusText,
                    status: a.status
                };
                return a.json()
            }).catch(a => {
                s = a
            });
        return s ? A(e, s) : n.success ? j(e) : D(e, n)
    }
    h.addEventListener("submit", M)
})();